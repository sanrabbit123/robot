const ReceiptRouter = function (MONGOC, MONGOLOCALC, kakaoInstance, humanInstance) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/receiptObserver";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.bill = new BillMaker();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.kakao = kakaoInstance;
  this.human = humanInstance;
}

ReceiptRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_Ssl = function () {
  const instance = this;
  let obj = {};
  obj.link = '/ssl';
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("hi");
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_bluePrint = function () {
  const instance = this;
  let obj = {};
  obj.link = '/bluePrint';
  obj.func = async function (req, res) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #00ff00;}</style></head><body></body></html>`;
      res.set({
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(html);
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_generalMongo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalMongo";
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      if (req.body.collection === undefined) {
        throw new Error("must be collection name");
      }
      if (req.body.db === undefined) {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, python ] => instance.mongolocal )");
      }
      const { mode, db, collection } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;

      if (db === "core" || db === "back" || db === "mongo") {
        selfMongo = instance.mongo;
      } else if (db === "sub" || db === "local" || db === "python") {
        selfMongo = instance.mongolocal;
      } else {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
      } else if (mode === "update") {
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery and updateQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
        if (result.length !== 0) {
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        }
        result = { message: "done" };
      } else if (mode === "create") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        await back.mongoCreate(collection, updateQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "delete") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "sse") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
        if (result.length === 0) {
          await back.mongoCreate(collection, { id: "sse", order: [ updateQuery ] }, { selfMongo });
        } else {
          result[0].order.push(updateQuery);
          await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
        }
        await fileSystem(`write`, [ instance.dir + "/log/" + collection + "_latest.json", JSON.stringify([ 0 ]) ]);
        result = { message: "done" };
      } else {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_cashReceipt = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/cashReceipt";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "cashReceipt";
      const selfMongo = instance.mongolocal;
      let rows;

      rows = [];
      if (json.cashOut !== undefined) {
        const { cashOut: cashOut_raw } = json;
        for (let arr of cashOut_raw) {
          for (let obj of arr) {
            rows.push(obj);
          }
        }
      } else if (json.cashIn !== undefined) {
        const { cashIn: cashIn_raw } = json;
        for (let arr of cashIn_raw) {
          for (let obj of arr) {
            rows.push(obj);
          }
        }
      }

      bill.createBill(collection, rows, { selfMongo: instance.mongolocal }).catch((err) => {
        console.log(err);
      });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createStylingContract = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = "/createStylingContract";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined || req.body.contractName === undefined || req.body.contractAddress === undefined) {
        throw new Error("invaild post");
      }
      const { proid, contractName, contractAddress } = req.body;

      const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });

      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const project = await back.getProjectById(proid, { selfMongo });
        const client = await back.getClientById(project.cliid, { selfMongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo });
        let url, requestNumber, proposalDate;

        proposalDate = project.proposal.date.valueOf();

        requestNumber = 0;
        for (let i = 0; i < client.requests.length; i++) {
          if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
            requestNumber = i;
            break;
          }
        }

        url = "https://" + address.homeinfo.ghost.host + ":" + String(address.homeinfo.ghost.graphic.port[0]) + "/form";

        await requestSystem(url, { requestNumber, client: client.toNormal(), designer: designer.toNormal(), project: project.toNormal(), contractName, contractAddress }, { headers: { "Content-type": "application/json" } });
      } else {
        console.log("styling form cancel : " + proid);
        instance.mother.slack_bot.chat.postMessage({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer" });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_receiveStylingContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, fileSystem, slack_bot, dateToString, autoComma, ghostRequest } = this.mother;
  let obj = {};
  obj.link = "/receiveStylingContract";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "stylingForm";
      const selfMongo = instance.mongolocal;
      let client;

      await bill.createBill(collection, [ json ], { selfMongo: instance.mongolocal });
      client = await back.getClientById(json.cliid, { selfMongo: instance.mongo });
      if (client !== null) {
        await kakao.sendTalk(collection, client.name, client.phone, { client: client.name });
        instance.mother.slack_bot.chat.postMessage({ text: "계약서 작성 및 알림톡 전송 완료 : " + client.name, channel: "#400_customer" });
        ghostRequest("voice", { text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!" }).catch((err) => {
          console.log(err);
        });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createStylingBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  let obj = {};
  obj.link = "/createStylingBill";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post, must be { proid }");
      }
      const { proid } = req.body;
      const bilidArr = await bill.createStylingBill(proid, { selfCoreMongo: instance.mongo, selfMongo: instance.mongolocal });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(bilidArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 (rou_post_createStylingBill) : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_generalBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalBill";
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      const collection = "generalBill";
      const { mode } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;

      selfMongo = instance.mongolocal;

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        result = await bill.getBillsByQuery(whereQuery, { selfMongo });
      } else {
        throw new Error("must be mode => [ read ]");
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 (rou_post_generalBill): " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_ghostClientBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/ghostClientBill";
  obj.func = async function (req, res) {
    try {
      if (req.body.bill === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, requestNumber, data } = equalJson(req.body);
      const oid = data.MOID;
      let whereQuery, updateQuery, method;
      let thisBill;
      let oidArr, infoArr;
      let index;

      thisBill = await bill.getBillById(bilid, { selfMongo });
      if (thisBill === null) {
        throw new Error("there is no bill");
      }
      thisBill = thisBill.toNormal();

      if (Array.isArray(thisBill.links.oid)) {
        oidArr = JSON.parse(JSON.stringify(thisBill.links.oid));
        oidArr.push(oid);
      } else {
        oidArr = [ oid ];
      }

      infoArr = JSON.parse(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
      index = -1;
      for (let i = 0; i < infoArr.length; i++) {
        if (infoArr[i].oid !== undefined && typeof infoArr[i].oid === "string") {
          index = i;
        }
      }
      if (index !== -1) {
        infoArr.splice(index, 1);
      }
      infoArr.push({ oid });

      index = -1;
      for (let i = 0; i < infoArr.length; i++) {
        if (infoArr[i].data !== undefined && typeof infoArr[i].data === "string") {
          index = i;
        }
      }
      if (index !== -1) {
        infoArr.splice(index, 1);
      }
      infoArr.push({ data });

      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["links.oid"] = oidArr;
      updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

      if (data.CARD_BankCode !== undefined) {
        //card

        /*
        {
          "CARD_Quota": "00",
          "CARD_ClEvent": "",
          "CARD_CorpFlag": "0",
          "buyerTel": "010-2747-3403",
          "parentEmail": "",
          "applDate": "20210817",
          "buyerEmail": "uragenbooks@gmail.com",
          "p_Sub": "",
          "resultCode": "0000",
          "mid": "MOIhomeli1",
          "CARD_UsePoint": "",
          "CARD_Num": "91002001****",
          "authSignature": "a98c4d9991e30b43ada7ff0064d403cb941b721380e4cfada8ec68152a29d3b0",
          "ISP_CardCode": "000100202266221",
          "tid": "StdpayISP_MOIhomeli120210817205753658566",
          "EventCode": "",
          "goodName": "홈리에종 계약금",
          "TotPrice": "1001",
          "payMethod": "VCard",
          "CARD_MemberNum": "",
          "MOID": "merchant_1629201365161",
          "CARD_Point": "",
          "currency": "WON",
          "CARD_PurchaseCode": "",
          "CARD_PrtcCode": "1",
          "applTime": "205753",
          "goodsName": "홈리에종 계약금",
          "CARD_CheckFlag": "0",
          "FlgNotiSendChk": "",
          "CARD_Code": "11",
          "CARD_BankCode": "00",
          "CARD_TerminalNum": "0208937000",
          "ISP_RetrievalNum": "",
          "P_FN_NM": "BC카드",
          "buyerName": "배창규",
          "p_SubCnt": "",
          "applNum": "36775268",
          "resultMsg": "정상완료",
          "CARD_Interest": "0",
          "CARD_SrcCode": "",
          "CARD_ApplPrice": "1001",
          "CARD_GWCode": "G",
          "custEmail": "uragenbooks@gmail.com",
          "CARD_PurchaseName": "",
          "CARD_PRTC_CODE": "1",
          "payDevice": "PC"
        }
        */



      } else {
        //bank

        /*

        {
          "buyerTel": "010-2747-3403",
          "parentEmail": "",
          "applDate": "20210817",
          "buyerEmail": "uragenbooks@gmail.com",
          "p_Sub": "",
          "resultCode": "0000",
          "mid": "MOIhomeli1",
          "VACT_Date": "20210916",
          "authSignature": "8755e7a17d2859e719fc2ae821ff2e9d85515e441e2608bf322c6e3a31fc1ddb",
          "tid": "StdpayVBNKMOIhomeli120210817210301095424",
          "EventCode": "",
          "VACT_Name": "（주）  홈리에종",
          "VACT_InputName": "배창규",
          "goodName": "홈리에종 계약금",
          "VACT_Time": "235959",
          "TotPrice": "1001",
          "payMethod": "VBank",
          "VACT_BankCode": "20",
          "MOID": "merchant_1629201641177",
          "vactBankName": "우리은행",
          "currency": "WON",
          "applTime": "210301",
          "goodsName": "홈리에종 계약금",
          "FlgNotiSendChk": "",
          "buyerName": "배창규",
          "p_SubCnt": "",
          "resultMsg": "정상처리되었습니다.",
          "custEmail": "uragenbooks@gmail.com",
          "VACT_Num": "27489473818806",
          "payDevice": "PC"
        }

        */


      }


      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo })

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 (rou_post_generalBill): " + e.message, channel: "#error_log" });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_webHookVAccount = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { requestSystem } = this.mother;
  const ParsingHangul = require(`${process.cwd()}/parsingHangul/parsingHangul.js`);
  let obj = {};
  obj.link = "/webHookVAccount";
  obj.public = true;
  obj.func = async function (req, res) {
    try {
      if (req.body.no_oid === undefined || req.body.id_merchant === undefined || req.body.no_tid === undefined) {
        throw new Error("invaild post");
      }
      if (req.body.id_merchant !== instance.address.officeinfo.inicis.mid) {
        throw new Error("invaild post");
      }
      const oid = req.body.no_oid;
      const bankFrom = ParsingHangul.decodeURI(req.body.nm_inputbank);
      const nameFrom = ParsingHangul.decodeURI(req.body.nm_input);

      instance.mother.slack_bot.chat.postMessage({ text: oid, channel: "#error_log" });
      instance.mother.slack_bot.chat.postMessage({ text: bankFrom, channel: "#error_log" });
      instance.mother.slack_bot.chat.postMessage({ text: nameFrom, channel: "#error_log" });



      // no_tid: 'ININPGVBNKMOIhomeli120210818104550283225',
      // no_oid: 'merchant_1629250869293',
      // id_merchant: 'MOIhomeli1',
      // cd_bank: '00000020',
      // cd_deal: '00000020',
      // dt_trans: '20210818',
      // tm_trans: '104349',
      // no_msgseq: '0002133837',
      // cd_joinorg: '01306001',
      // dt_transbase: '20210818',
      // no_transseq: '2133837',
      // type_msg: '0200',
      // cl_trans: '1100',
      // cl_close: '0',
      // cl_kor: '2',
      // no_msgmanage: '10004349',
      // no_vacct: '27489495718161',
      // amt_input: '1001',
      // amt_check: '0',
      // nm_inputbank: '%BF%EC%B8%AE%C0%BA%C7%E0',
      // nm_input: '%B9%E8%C3%A2%B1%D4',
      // dt_inputstd: '20210818',
      // dt_calculstd: '20210818',
      // flg_close: '0',
      // dt_cshr: '20210818',
      // tm_cshr: '104550',
      // no_cshr_appl: '265687974',
      // no_cshr_tid: 'StdpayVBNKMOIhomeli120210818104128882138'





      res.set({ "Content-Type": "text/plain" });
      res.send("OK");
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      res.set({ "Content-Type": "text/plain" });
      res.send("FAIL");
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(ReceiptRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = ReceiptRouter;
