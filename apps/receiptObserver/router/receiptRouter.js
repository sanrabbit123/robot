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
      if (req.body.bilid === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, requestNumber, data } = equalJson(req.body);
      if (typeof data.MOID !== "string") {
        throw new Error("invaild post");
      }
      const oid = data.MOID;
      const inisis = "이니시스";
      let whereQuery, updateQuery, method;
      let thisBill;
      let cliid, desid, proid;
      let client, designer, project;
      let proposal;
      let oidArr, infoArr;
      let index;
      let boo;
      let proofs;
      let projectQuery;
      let amount;
      let pureDesignFee;
      let vat, consumer;
      let classification, percentage;
      let businessMethod;
      let bankName, bankTo;
      let calculate;
      let designerHistory;

      thisBill = await bill.getBillById(bilid, { selfMongo });
      if (thisBill === null) {
        throw new Error("there is no bill");
      }
      if (thisBill.links.cliid === undefined || thisBill.links.desid === undefined || thisBill.links.proid === undefined) {
        throw new Error("invaild bill");
      }
      thisBill = thisBill.toNormal();
      cliid = thisBill.links.cliid;
      desid = thisBill.links.desid;
      proid = thisBill.links.proid;
      client = await back.getClientById(cliid, { selfMongo: instance.mongo });
      designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      proposal = project.selectProposal(desid);

      if (client === null || designer === null || project === null || proposal === null) {
        throw new Error("invaild proposal");
      }

      if (Array.isArray(thisBill.links.oid)) {
        oidArr = JSON.parse(JSON.stringify(thisBill.links.oid));
        boo = false;
        for (let o of oidArr) {
          if (o === oid) {
            boo = true;
          }
        }
        if (!boo) {
          oidArr.push(oid);
        }
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
        updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
        updateQuery["requests." + String(requestNumber) + ".pay"] = new Date();
        proofs = bill.returnBillDummies("proofs");
        proofs.method = "카드(" + data.P_FN_NM.replace(/카드/gi, '') + ")";
        proofs.proof = inisis;
        proofs.to = data.buyerName;
        thisBill.requests[Number(requestNumber)].proofs.push(proofs);
        updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

        if (data.goodName.trim() === "홈리에종 계약금" || data.goodName.trim() === "홈리에종 잔금") {

          projectQuery = {};
          amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));
          if (proposal.fee.length === 1) {
            pureDesignFee = Math.round(proposal.fee[0].amount * (1 - proposal.fee[0].discount));
          } else {
            for (let obj of fee) {
              if (obj.method === thisBill.links.method) {
                pureDesignFee = Math.round(obj.amount * (1 - obj.discount));
              }
            }
          }

          if (data.goodName.trim() === "홈리에종 계약금") {
            projectQuery["process.contract.first.date"] = new Date();
            projectQuery["process.contract.first.calculation.amount"] = amount;
            projectQuery["process.contract.first.calculation.info.method"] = proofs.method;
            projectQuery["process.contract.first.calculation.info.proof"] = inisis;
            projectQuery["process.contract.first.calculation.info.to"] = proofs.to;

            projectQuery["desid"] = desid;
            projectQuery["service.online"] = /off/gi.test(thisBill.links.method);
            projectQuery["process.status"] = "진행";
            projectQuery["proposal.status"] = "고객 선택";

            vat = Math.round(pureDesignFee * 0.1);
            consumer = Math.round(pureDesignFee * 1.1);

            projectQuery["process.contract.remain.calculation.amount.supply"] = Number(pureDesignFee);
            projectQuery["process.contract.remain.calculation.amount.vat"] = Number(vat);
            projectQuery["process.contract.remain.calculation.amount.consumer"] = Number(consumer);

            classification = designer.information.business.businessInfo.classification;
            percentage = Number(designer.information.business.service.cost.percentage);
            businessMethod = "사업자(일반)";
            if (/사업자/g.test(classification)) {
              if (/일반/g.test(classification)) {
                businessMethod = "사업자(일반)";
              } else {
                businessMethod = "사업자(간이)";
              }
            } else {
              businessMethod = "프리랜서";
            }
            projectQuery["process.calculation.method"] = businessMethod;
            projectQuery["process.calculation.percentage"] = percentage;

            if (designer.information.business.account.length > 0) {
              bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber);
              bankTo = designer.information.business.account[0].to;
              projectQuery["process.calculation.info.account"] = bankName;
              projectQuery["process.calculation.info.proof"] = bankTo;
              projectQuery["process.calculation.info.to"] = bankTo;
            }

            if (/일반/gi.test(businessMethod)) {
              calculate = Math.round((pureDesignFee * 1.1) * (1 - (percentage / 100)));
            } else if (/간이/gi.test(businessMethod)) {
              calculate = Math.round(pureDesignFee * (1 - (percentage / 100)));
            } else if (/프리/gi.test(businessMethod)) {
              ratio = 0.967;
              calculate = Math.round((pureDesignFee - (pureDesignFee * (percentage / 100))) * ratio);
            } else {
              calculate = Math.round((pureDesignFee * 1.1) * (1 - (percentage / 100)));
            }
            projectQuery["process.calculation.payments.totalAmount"] = calculate;
            projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
            projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

            await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
            designerHistory = await back.getHistoryProperty("designer", "manager", [ desid ], { fromConsole: true });
            await back.updateHistory("project", [ { proid }, { manager: designerHistory[desid] } ], { fromConsole: true });

            // instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
            //   client: client.name,
            //   designer: designer.designer,
            // });

          } else if (data.goodName.trim() === "홈리에종 잔금") {
            projectQuery["process.contract.remain.date"] = new Date();
            projectQuery["process.contract.remain.calculation.info.method"] = proofs.method;
            projectQuery["process.contract.remain.calculation.info.proof"] = inisis;
            projectQuery["process.contract.remain.calculation.info.to"] = proofs.to;
          }

          await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });
        }

      } else {

        // instance.kakao.sendTalk("virtualAccount", client.name, client.phone, {
        //   client: client.name,
        //   goodName: data.goodName,
        //   bankName: data.vactBankName,
        //   account: data.VACT_Num,
        //   to: data.VACT_Name,
        //   date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
        // });

      }

      instance.mother.slack_bot.chat.postMessage({ text: client.name + " 고객님이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!", channel: "#700_operation" });

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo })

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 (rou_post_ghostClientBill): " + e.message, channel: "#error_log" });
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
  const ParsingHangul = require(`${process.cwd()}/apps/parsingHangul/parsingHangul.js`);
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
      const inisis = "이니시스";
      const bankFrom = ParsingHangul.decodeURI(req.body.nm_inputbank);
      const nameFrom = ParsingHangul.decodeURI(req.body.nm_input);
      const bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: oid } } }, { selfMongo: instance.mongolocal });
      if (bills.length === 0) {
        throw new Error("invaild oid");
      }
      if (bills[0].links.proid === undefined || bills[0].links.desid === undefined || bills[0].links.cliid === undefined) {
        throw new Error("invaild bill");
      }
      const { proid, cliid, desid, method } = bills[0].links;
      let infoArr, index;
      let bilid;
      let client, designer, project, proposal;
      let requestNumber;
      let data;
      let thisBill;
      let projectQuery;
      let amount;
      let pureDesignFee;
      let vat, consumer;
      let classification, percentage;
      let businessMethod;
      let bankName, bankTo;
      let calculate;
      let designerHistory;
      let whereQuery, updateQuery;
      let proofs;

      thisBill = bills[0];
      thisBill = thisBill.toNormal();
      bilid = thisBill.bilid;

      client = await back.getClientById(cliid, { selfMongo: instance.mongo });
      designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      proposal = project.selectProposal(desid);

      if (client === null || designer === null || project === null || proposal === null) {
        throw new Error("invaild id");
      }

      requestNumber = null;
      for (let i = 0; i < thisBill.requests.length; i++) {
        for (let obj of thisBill.requests[i].info) {
          if (obj.oid === oid) {
            requestNumber = i;
            break;
          }
        }
      }

      if (requestNumber === null) {
        throw new Error("invaild request");
      }

      for (let obj of thisBill.requests[requestNumber].info) {
        if (typeof obj.data === "object" && obj.data !== null) {
          data = JSON.parse(JSON.stringify(obj.data));
        }
      }

      infoArr = JSON.parse(JSON.stringify(thisBill.requests[requestNumber].info));
      index = -1;
      for (let i = 0; i < infoArr.length; i++) {
        if (infoArr[i].virtualAccount !== undefined && typeof infoArr[i].virtualAccount === "string") {
          index = i;
        }
      }
      if (index !== -1) {
        infoArr.splice(index, 1);
      }
      infoArr.push({ virtualAccount: JSON.parse(JSON.stringify(req.body)) });

      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;
      updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
      updateQuery["requests." + String(requestNumber) + ".pay"] = new Date();
      proofs = bill.returnBillDummies("proofs");
      proofs.method = "무통장 입금(" + bankFrom + ")";
      proofs.proof = inisis;
      proofs.to = nameFrom;
      thisBill.requests[requestNumber].proofs.push(proofs);
      updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;

      if (data.goodName.trim() === "홈리에종 계약금" || data.goodName.trim() === "홈리에종 잔금") {

        projectQuery = {};
        amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));
        if (proposal.fee.length === 1) {
          pureDesignFee = Math.round(proposal.fee[0].amount * (1 - proposal.fee[0].discount));
        } else {
          for (let obj of fee) {
            if (obj.method === thisBill.links.method) {
              pureDesignFee = Math.round(obj.amount * (1 - obj.discount));
            }
          }
        }

        if (data.goodName.trim() === "홈리에종 계약금") {
          projectQuery["process.contract.first.date"] = new Date();
          projectQuery["process.contract.first.calculation.amount"] = amount;
          projectQuery["process.contract.first.calculation.info.method"] = proofs.method;
          projectQuery["process.contract.first.calculation.info.proof"] = inisis;
          projectQuery["process.contract.first.calculation.info.to"] = proofs.to;

          projectQuery["desid"] = desid;
          projectQuery["service.online"] = /off/gi.test(thisBill.links.method);
          projectQuery["process.status"] = "진행";
          projectQuery["proposal.status"] = "고객 선택";

          vat = Math.round(pureDesignFee * 0.1);
          consumer = Math.round(pureDesignFee * 1.1);

          projectQuery["process.contract.remain.calculation.amount.supply"] = Number(pureDesignFee);
          projectQuery["process.contract.remain.calculation.amount.vat"] = Number(vat);
          projectQuery["process.contract.remain.calculation.amount.consumer"] = Number(consumer);

          classification = designer.information.business.businessInfo.classification;
          percentage = Number(designer.information.business.service.cost.percentage);
          businessMethod = "사업자(일반)";
          if (/사업자/g.test(classification)) {
            if (/일반/g.test(classification)) {
              businessMethod = "사업자(일반)";
            } else {
              businessMethod = "사업자(간이)";
            }
          } else {
            businessMethod = "프리랜서";
          }
          projectQuery["process.calculation.method"] = businessMethod;
          projectQuery["process.calculation.percentage"] = percentage;

          if (designer.information.business.account.length > 0) {
            bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber);
            bankTo = designer.information.business.account[0].to;
            projectQuery["process.calculation.info.account"] = bankName;
            projectQuery["process.calculation.info.proof"] = bankTo;
            projectQuery["process.calculation.info.to"] = bankTo;
          }

          if (/일반/gi.test(businessMethod)) {
            calculate = Math.round((pureDesignFee * 1.1) * (1 - (percentage / 100)));
          } else if (/간이/gi.test(businessMethod)) {
            calculate = Math.round(pureDesignFee * (1 - (percentage / 100)));
          } else if (/프리/gi.test(businessMethod)) {
            ratio = 0.967;
            calculate = Math.round((pureDesignFee - (pureDesignFee * (percentage / 100))) * ratio);
          } else {
            calculate = Math.round((pureDesignFee * 1.1) * (1 - (percentage / 100)));
          }
          projectQuery["process.calculation.payments.totalAmount"] = calculate;
          projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
          projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

          await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
          designerHistory = await back.getHistoryProperty("designer", "manager", [ desid ], { fromConsole: true });
          await back.updateHistory("project", [ { proid }, { manager: designerHistory[desid] } ], { fromConsole: true });

          // instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
          //   client: client.name,
          //   designer: designer.designer,
          // });

        } else if (data.goodName.trim() === "홈리에종 잔금") {
          projectQuery["process.contract.remain.date"] = new Date();
          projectQuery["process.contract.remain.calculation.info.method"] = proofs.method;
          projectQuery["process.contract.remain.calculation.info.proof"] = inisis;
          projectQuery["process.contract.remain.calculation.info.to"] = proofs.to;
        }

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      }

      instance.mother.slack_bot.chat.postMessage({ text: client.name + " 고객님이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!", channel: "#700_operation" });
      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      res.set({ "Content-Type": "text/plain" });
      res.send("OK");
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Python 서버 문제 생김 : " + e, channel: "#error_log" });
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
