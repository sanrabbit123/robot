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
  this.bankCode = BillMaker.returnBankCode("", "matrix");
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_Ssl = function () {
  const instance = this;
  const { statusReading } = this.mother;
  let obj = {};
  obj.link = '/ssl';
  obj.func = async function (req, res) {
    try {
      statusReading().catch((err) => {
        console.log(err);
      });
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("hi");
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_get_Ssl): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_get_bluePrint): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_generalMongo): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_cashReceipt): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createStylingContract = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend } = this.mother;
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

        url = "https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.graphic.port[0]) + "/form";

        await requestSystem(url, { requestNumber, client: client.toNormal(), designer: designer.toNormal(), project: project.toNormal(), contractName, contractAddress }, { headers: { "Content-type": "application/json" } });
      } else {
        console.log("styling form cancel : " + proid);
        await messageSend({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_createStylingContract): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, fileSystem, dateToString, autoComma, ghostRequest, messageSend, errorLog } = this.mother;
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
        messageSend({ text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_receiveStylingContract): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const { requestSystem, messageSend, messageLog, errorLog } = this.mother;
  let obj = {};
  obj.link = "/createConstructContract";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined || req.body.summary === undefined) {
        throw new Error("invaild post");
      }
      const { proid, summary } = req.body;

      const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });

      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
        const thisBills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": project.proid },
            { "links.desid": project.desid },
            { "links.cliid": project.cliid },
            { "links.method": project.service.online ? "online" : "offline" }
          ]
        }, { selfMongo: instance.mongolocal });
        if (thisBills.length > 0) {
          const [ thisBill ] = thisBills;
          let url, requestNumber, proposalDate;
          let searchPoint0, searchPoint1;
          let tempArr;
          let projectNormal;
          let builders;

          projectNormal = project.toNormal();

          if (projectNormal.process.design.construct.contract.partner !== "") {

            if (/_/gi.test(projectNormal.process.design.construct.contract.partner)) {
              tempArr = projectNormal.process.design.construct.contract.partner.split('_');
              searchPoint0 = tempArr[0].trim();
              searchPoint1 = tempArr[1].trim();
            } else {
              searchPoint0 = projectNormal.process.design.construct.contract.partner.trim();
              searchPoint1 = '';
            }

            builders = await back.getBuildersByQuery({
              $and: [
                { "builder": searchPoint0 },
                { "information.business.company": searchPoint1 }
              ]
            }, { selfMongo: instance.mongo });

            if (builders.length !== 0) {
              const [ builder ] = builders;

              await bill.constructInjection(thisBill.bilid, builder.buiid, {
                first: summary.first.amount,
                start: summary.start.amount,
                middle: summary.middle.amount,
                remain: summary.remain.amount,
              }, { selfMongo: instance.mongolocal, selfCoreMongo: instance.mongo });
              await messageLog(thisBill.bilid + " construct request, response set complete");

              proposalDate = project.proposal.date.valueOf();
              requestNumber = 0;
              for (let i = 0; i < client.requests.length; i++) {
                if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
                  requestNumber = i;
                  break;
                }
              }

              url = "https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.graphic.port[0]) + "/constructForm";
              await requestSystem(url, { summary, requestNumber, client: client.toNormal(), designer: designer.toNormal(), project: project.toNormal() }, { headers: { "Content-type": "application/json" } });

            } else {
              await messageSend({ text: "프로젝트 " + proid + "에서 지정된 파트서 시공사가 등록된 파트너가 아니에요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
            }
          } else {
            await messageSend({ text: "프로젝트 " + proid + "는 파트서 시공사가 지정되지 않았어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
          }
        } else {
          await messageSend({ text: "프로젝트 " + proid + "의 영수증을 찾을 수 없어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
        }
      } else {
        console.log("styling form cancel : " + proid);
        await messageSend({ text: "프로젝트 " + proid + "의 시공 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      errorLog("Python 서버 문제 생김 (rou_post_createConstructContract): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_receiveConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, fileSystem, dateToString, autoComma, ghostRequest, messageSend, errorLog } = this.mother;
  let obj = {};
  obj.link = "/receiveConstructContract";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "constructForm";
      const selfMongo = instance.mongolocal;
      let client;

      await bill.createBill(collection, [ json ], { selfMongo: instance.mongolocal });
      client = await back.getClientById(json.cliid, { selfMongo: instance.mongo });
      if (client !== null) {
        // await kakao.sendTalk(collection, client.name, client.phone, { client: client.name });
        messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_receiveStylingContract): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_constructAmountSync = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const { equalJson, messageSend, messageLog, errorLog } = this.mother;
  let obj = {};
  obj.link = "/constructAmountSync";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined || req.body.method === undefined || req.body.amount === undefined) {
        throw new Error("invaild post");
      }
      const { proid, cliid, desid, method, amount: { supply, vat, consumer } } = equalJson(req.body);
      const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });
      const find0 = "시공 잔금";
      const find1 = "시공비";
      let bills, bilid, tempIndex, targetIndex, targetBill;
      let itemIndex;
      let whereQuery, updateQuery;

      if (rows.length !== 0) {

        bills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": proid },
            { "links.cliid": cliid },
            { "links.desid": desid },
            { "links.method": method },
          ]
        }, { selfMongo: instance.mongolocal });
        if (bills.length > 0) {
          bilid = null;
          targetBill = null;
          targetIndex = -1;
          for (let i = 0; i < bills.length; i++) {
            tempIndex = bills[i].requests.findIndex((obj) => {
              return (new RegExp(find0, "gi")).test(obj.name);
            });
            if (tempIndex !== -1) {
              bilid = bills[i].bilid;
              targetBill = bills[i];
              targetIndex = tempIndex;
              break;
            }
          }
          if (bilid !== null) {
            itemIndex = -1;
            for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
              if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                itemIndex = i;
                break;
              }
            }
            whereQuery = { bilid };
            updateQuery = {};
            updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
            updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
            updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
            updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;
            await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }
        }

      }

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      errorLog("Python 서버 문제 생김 (rou_post_constructAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_smsParsing = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, errorLog, autoComma, requestSystem } = this.mother;
  const collection = "accountTransfer";
  const standardDay = 7;
  let obj = {};
  obj.link = "/smsParsing";
  obj.func = async function (req, res) {
    try {
      if (req.body.date === undefined || req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { date, amount, name } = equalJson(req.body);
      const errorMessage = "뭔가 은행 문자가 왔는데 찾을 수 없음 : " + name + " " + autoComma(amount) + "원";
      let rows, ago, target, rows2;

      messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });

      ago = new Date();
      ago.setDate(ago.getDate() - (standardDay * 2));

      target = null;
      rows = await back.mongoRead(collection, { amount }, { selfMongo });
      if (rows.length > 0) {
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
        rows = rows.filter((obj) => {
          return obj.date.valueOf() >= ago.valueOf();
        }).filter((obj) => {
          return (new RegExp(obj.name, "gi")).test(name);
        });
        if (rows.length > 0) {
          if (rows.length === 1) {
            [ target ] = rows;
          } else {
            rows2 = rows.filter((obj) => {
              return obj.name.trim() === name.trim();
            });
            if (rows2.length > 0) {
              [ target ] = rows2;
            } else {
              [ target ] = rows;
            }
          }
        } else {
          errorLog(errorMessage).catch((e) => { console.log(e); });
        }
      } else {
        errorLog(errorMessage).catch((e) => { console.log(e); });
      }

      if (target !== null) {
        const { phone, amount } = target;
        requestSystem("https://" + instance.address.pythoninfo.host + ":3000/webHookVAccount", target.accountInfo, {
          headers: { "Content-Type": "application/json" }
        }).then(() => {
          return requestSystem(`https://${instance.address.officeinfo.ghost.host}:${String(instance.address.officeinfo.ghost.graphic.port[0])}/receiptSend`, {
            amount: String(amount),
            phone,
          }, { headers: { "Content-Type": "application/json" } });
        }).then(() => {
          return messageSend(`${name} 고객님의 번호로 현금영수증 발행을 완료하였어요.`, "#700_operation", true);
        }).catch((err) => {
          console.log(err);
        });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Python 서버 문제 생김 (rou_post_smsParsing): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_accountTimeSet = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, errorLog, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeSet";
  obj.func = async function (req, res) {
    try {
      if (req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { amount, name } = equalJson(req.body);
      let rows, result;

      messageSend(`${name} 고객님이 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
      await back.mongoCreate(collection, equalJson(req.body), { selfMongo });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Python 서버 문제 생김 (rou_post_smsParsing): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
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
      let option, bilidArr;
      option = { selfCoreMongo: instance.mongo, selfMongo: instance.mongolocal };
      if (req.body.desid !== undefined) {
        option.forceDesid = req.body.desid;
      }
      bilidArr = await bill.createStylingBill(proid, option);
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(bilidArr));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_createStylingBill): " + e.message).catch((e) => { console.log(e); });
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
      let option;

      selfMongo = instance.mongolocal;

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        option = { selfMongo };
        if (req.body.limit !== undefined && !Number.isNaN(Number(req.body.limit))) {
          option.limit = Number(req.body.limit);
        }
        result = await bill.getBillsByQuery(whereQuery, option);
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_generalBill): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.sync_paymentProject = async function (bilid, requestNumber, data, amount, proofs, inisis, needs) {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, ghostRequest, requestSystem, messageSend, errorLog } = this.mother;
  try {
    const { thisBill, client, designer, project, proposal } = needs;
    const { cliid } = client;
    const { desid } = designer;
    const { proid } = project;
    let projectQuery;
    let pureDesignFee;
    let vat, consumer;
    let classification, percentage;
    let businessMethod;
    let bankName, bankTo;
    let calculate;
    let designerHistory;

    if (/계약금/gi.test(data.goodName.trim()) || /잔금/gi.test(data.goodName.trim())) {
      projectQuery = {};
      if (proposal.fee.length === 1) {
        pureDesignFee = Math.round(proposal.fee[0].amount * (1 - proposal.fee[0].discount));
      } else {
        for (let obj of proposal.fee) {
          if (obj.method === thisBill.links.method) {
            pureDesignFee = Math.round(obj.amount * (1 - obj.discount));
          }
        }
      }

      if (/계약금/gi.test(data.goodName.trim())) {
        projectQuery["process.contract.first.date"] = new Date();
        projectQuery["process.contract.first.calculation.amount"] = amount;
        projectQuery["process.contract.first.calculation.info.method"] = proofs.method;
        projectQuery["process.contract.first.calculation.info.proof"] = inisis;
        projectQuery["process.contract.first.calculation.info.to"] = proofs.to;

        projectQuery["desid"] = desid;
        projectQuery["service.online"] = !/off/gi.test(thisBill.links.method);
        projectQuery["process.status"] = "대기";
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

        [ calculate ] = bill.designerCalculation(pureDesignFee, businessMethod, percentage, client, { toArray: true });
        projectQuery["process.calculation.payments.totalAmount"] = calculate;
        projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
        projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

        await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
        designerHistory = await back.getHistoryProperty("designer", "manager", [ desid ], { fromConsole: true });
        await back.updateHistory("project", [ { proid }, { manager: designerHistory[desid] } ], { fromConsole: true });
        await bill.designerSelect(proid, desid, { selfMongo: instance.mongolocal });

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });
        await bill.amountConverting(thisBill.bilid, { selfMongo: instance.mongolocal });

        instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
        });

        requestSystem("https://" + instance.address.backinfo.host + "/realtimeDesigner", { mode: "sync", proid }, {
          headers: {
            "Content-Type": "application/json",
            "origin": "https://" + instance.address.pythoninfo.host
          }
        }).then((obj) => {
          if (obj.status >= 300) {
            return errorLog({ text: "Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) ", channel: "#error_log" }).catch((err) => { console.log(err); });
          }
        }).catch((err) => {
          errorLog({ text: "Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) : " + err.message, channel: "#error_log" }).catch((e) => { console.log(e); })
        });

      } else if (/잔금/gi.test(data.goodName.trim())) {

        projectQuery["process.status"] = "진행중";
        projectQuery["process.action"] = "시작 대기";
        projectQuery["process.contract.remain.date"] = new Date();
        projectQuery["process.contract.remain.calculation.info.method"] = proofs.method;
        projectQuery["process.contract.remain.calculation.info.proof"] = inisis;
        projectQuery["process.contract.remain.calculation.info.to"] = proofs.to;

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

        instance.kakao.sendTalk("remainPaymentAndChannel", client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
          emoji: "(방긋)",
        });

      }

    }

  } catch (e) {
    errorLog({ text: "Python 서버 문제 생김 (sync_paymentProject) : " + e.message, channel: "#error_log" }).catch((e) => { console.log(e); })
    console.log(e);
  }
}

ReceiptRouter.prototype.rou_post_ghostClientBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, ghostRequest, requestSystem, messageSend, errorLog } = this.mother;
  let obj = {};
  obj.link = "/ghostClientBill";
  obj.func = async function (req, res) {
    try {
      if (req.body.bilid === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, requestNumber, data } = equalJson(req.body);
      if (typeof data !== "object") {
        throw new Error("invaild post : data must be object");
      }
      if (typeof data.MOID !== "string") {
        throw new Error("invaild post");
      }
      if (Number.isNaN(Number(requestNumber))) {
        throw new Error("invaild request number");
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
      let itemArr, payArr, cancelArr;
      let itemNum, payNum, cancelNum;
      let payObject;
      let paymentComplete;
      let message;

      if (data.__ignorethis__ !== 1) {

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
          throw new Error("invaild id");
        }

        if (Array.isArray(thisBill.links.oid)) {
          oidArr = equalJson(JSON.stringify(thisBill.links.oid));
          boo = false;
          for (let o of oidArr) {
            if (o === oid) {
              boo = true;
            }
          }
          if (!boo) {
            oidArr.unshift(oid);
          }
        } else {
          oidArr = [ oid ];
        }

        infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
        infoArr.unshift({ data });
        infoArr.unshift({ oid });

        whereQuery = { bilid };
        updateQuery = {};
        updateQuery["links.oid"] = oidArr;
        updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

        amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));

        if (data.CARD_BankCode !== undefined) {

          itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
          payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
          cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
          payObject = bill.returnBillDummies("pay");
          payObject.amount = amount;
          payObject.oid = oid;
          payArr.unshift(payObject);

          // itemNum = 0;
          // for (let { amount: { consumer } } of itemArr) {
          //   itemNum += consumer;
          // }
          // payNum = 0;
          // for (let { amount: payAmount } of payArr) {
          //   payNum += payAmount;
          // }
          // cancelNum = 0;
          // for (let { amount: cancelAmount } of cancelArr) {
          //   cancelNum += cancelAmount;
          // }
          //
          // if (itemNum <= payNum - cancelNum) {
          //   updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
          //   paymentComplete = true;
          // } else {
          //   paymentComplete = false;
          // }

          updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
          paymentComplete = true;

          updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

          proofs = bill.returnBillDummies("proofs");
          if (typeof data.P_FN_NM === "string") {
            proofs.method = "카드(" + data.P_FN_NM.replace(/카드/gi, '') + ")";
          } else {
            proofs.method = "카드(알 수 없음)";
          }
          proofs.proof = inisis;
          proofs.to = data.buyerName;
          thisBill.requests[Number(requestNumber)].proofs.unshift(proofs);
          updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

          message = client.name + " 고객님이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
          messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          })
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

          if (paymentComplete) {
            await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });
          }

        } else {

          if (data.REAL_Account === undefined) {

            instance.kakao.sendTalk("virtualAccount", client.name, client.phone, {
              client: client.name,
              goodName: data.goodName,
              bankName: data.vactBankName,
              account: data.VACT_Num,
              to: data.VACT_Name,
              amount: autoComma(amount),
              date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
            });
            message = client.name + " 고객님이 " + data.goodName.trim() + " 결제를 위한 가상 계좌를 발급하셨습니다!";
            messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
              console.log(err);
            });

          } else {

            instance.kakao.sendTalk("realAccount", client.name, client.phone, {
              client: client.name,
              goodName: data.goodName,
              bankName: data.vactBankName,
              account: data.VACT_Num,
              to: data.VACT_Name,
              amount: autoComma(amount),
              date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
            });

          }

          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      } else {

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      }

    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_ghostClientBill): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, requestSystem, ghostRequest, messageSend, errorLog } = this.mother;
  let obj = {};
  obj.link = "/webHookVAccount";
  obj.public = true;
  obj.func = async function (req, res) {
    try {
      const oid = req.body.no_oid;
      const inisis = "현금 영수증";
      const bankFrom = req.body.nm_inputbank;
      const nameFrom = req.body.nm_input;
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
      let itemArr, payArr, cancelArr;
      let itemNum, payNum, cancelNum;
      let payObject;
      let paymentComplete;
      let message;

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
        if (obj.data !== undefined && typeof obj.data === "object" && obj.data !== null) {
          data = equalJson(JSON.stringify(obj.data));
          break;
        }
      }

      infoArr = equalJson(JSON.stringify(thisBill.requests[requestNumber].info));
      infoArr.unshift({ virtualAccount: equalJson(JSON.stringify(req.body)) });

      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

      amount = Number(equalJson(JSON.stringify(req.body)).amt_input.replace(/[^0-9]/gi, ''));

      itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
      payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
      cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
      payObject = bill.returnBillDummies("pay");
      payObject.oid = oid;
      payObject.amount = amount;
      payArr.unshift(payObject);

      // itemNum = 0;
      // for (let { amount: { consumer } } of itemArr) {
      //   itemNum += consumer;
      // }
      // payNum = 0;
      // for (let { amount: payAmount } of payArr) {
      //   payNum += payAmount;
      // }
      // cancelNum = 0;
      // for (let { amount: cancelAmount } of cancelArr) {
      //   cancelNum += cancelAmount;
      // }
      // if (itemNum <= payNum - cancelNum) {
      //   updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
      //   paymentComplete = true;
      // } else {
      //   paymentComplete = false;
      // }

      updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
      paymentComplete = true;

      updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

      proofs = bill.returnBillDummies("proofs");

      if (!(typeof req.body.real_account === "string")) {
        if (typeof bankFrom === "string") {
          proofs.method = "무통장 입금(" + bankFrom.replace(/은행/gi, '') + ")";
        } else {
          proofs.method = "무통장 입금(알 수 없음)";
        }
      } else {
        proofs.method = "계좌 이체";
      }

      proofs.proof = inisis;
      proofs.to = nameFrom;
      thisBill.requests[requestNumber].proofs.unshift(proofs);
      updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;

      message = client.name + " 고객님이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
      messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
        console.log(err);
      });
      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      if (paymentComplete) {
        await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });
      }

      res.set({ "Content-Type": "text/plain" });
      res.send("OK");
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_webHookVAccount): " + e.message).catch((e) => { console.log(e); });
      res.set({ "Content-Type": "text/plain" });
      res.send("FAIL");
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_designerSelect = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/designerSelect";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined || req.body.desid === undefined) {
        throw new Error("invaild post, must be proid / desid : " + JSON.stringify(req.body, null, 2));
      }
      const selfMongo = instance.mongolocal;
      const { proid, desid } = equalJson(req.body);
      await bill.designerSelect(proid, desid, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_designerSelect): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_travelInjection = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelInjection";
  obj.func = async function (req, res) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.number === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, number: rawNumber } = equalJson(req.body);
      const number = Number(rawNumber);
      const thisBill = await bill.travelInjection(injectionCase, proid, method, number, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_travelInjection): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_travelEjection = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelEjection";
  obj.func = async function (req, res) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, index: rawIndex } = equalJson(req.body);
      const index = Number(rawIndex);
      const thisBill = await bill.travelEjection(injectionCase, proid, method, index, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_travelEjection): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_travelReconfig = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelReconfig";
  obj.func = async function (req, res) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined || req.body.number === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, index: rawIndex, number: rawNumber } = equalJson(req.body);
      const index = Number(rawIndex);
      const number = Number(rawNumber);
      const thisBill = await bill.travelReconfig(injectionCase, proid, method, index, number, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_travelReconfig): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_serviceConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, requestSystem, sleep, ghostRequest, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/serviceConverting";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined || req.body.method === undefined || req.body.serid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { proid, method, serid } = equalJson(req.body);
      const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
      const firstContract = project.process.contract.first.calculation.amount;
      const pastService = equalJson(JSON.stringify(project.service));
      const timeConst = 410;
      let report, map;
      let newPrice, confirmMode;

      if (req.body.mode === "confirm") {

        confirmMode = true;

        if (req.body.newPrice === undefined) {
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, confirmMode });
        } else {
          if (Number.isNaN(Number(req.body.newPrice))) {
            throw new Error("must be newPrice(number) in confirm mode");
          }
          newPrice = Math.round(Number(req.body.newPrice));
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice, confirmMode });
        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(report));

      } else {

        if (req.body.newPrice !== undefined && !Number.isNaN(Number(req.body.newPrice))) {
          newPrice = Math.round(Number(req.body.newPrice));
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice });
        } else {
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo });
        }

        map = [
          {
            column: "service",
            position: "service",
            pastValue: report.service.from,
            finalValue: report.service.to,
          },
          {
            column: "remainSupply",
            position: "process.contract.remain.calculation.amount.supply",
            pastValue: report.request.from.supply,
            finalValue: report.request.to.supply,
          },
          {
            column: "remainVat",
            position: "process.contract.remain.calculation.amount.vat",
            pastValue: report.request.from.vat,
            finalValue: report.request.to.vat,
          },
          {
            column: "remainConsumer",
            position: "process.contract.remain.calculation.amount.consumer",
            pastValue: report.request.from.consumer,
            finalValue: report.request.to.consumer,
          },
          {
            column: "remainPure",
            position: "process.contract.remain.calculation.amount.consumer",
            pastValue: report.request.from.consumer - firstContract,
            finalValue: report.request.to.consumer - firstContract,
          },
          {
            column: "paymentsTotalAmount",
            position: "process.calculation.payments.totalAmount",
            pastValue: report.response.from.total,
            finalValue: report.response.to.total,
          },
          {
            column: "paymentsFirstAmount",
            position: "process.calculation.payments.first.amount",
            pastValue: report.response.from.first,
            finalValue: report.response.to.first,
          },
          {
            column: "paymentsRemainAmount",
            position: "process.calculation.payments.remain.amount",
            pastValue: report.response.from.remain,
            finalValue: report.response.to.remain,
          },
        ];

        for (let { column, position, pastValue, finalValue } of map) {
          await requestSystem("https://" + address.backinfo.host + ":3000/updateLog", { id: proid, column, position, pastValue, finalValue }, { headers: { "origin": "https://" + address.pythoninfo.host, "Content-Type": "application/json" } });
          await sleep(timeConst);
        }

        if (report.request.additional) {
          await kakao.sendTalk("plusDesignFee", client.name, client.phone, {
            client: client.name,
            pastservice: serviceParsing(report.service.from),
            newservice: serviceParsing(report.service.to),
            total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
            host: address.homeinfo.ghost.host,
            path: "estimation",
            cliid: client.cliid,
            needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
          });
          messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          });
        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      }
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_serviceConverting): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_designerConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, requestSystem, sleep, ghostRequest, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/designerConverting";
  obj.func = async function (req, res) {
    try {
      if (req.body.proid === undefined || req.body.method === undefined || req.body.desid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { proid, method, desid } = equalJson(req.body);
      const project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
      const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
      const pastDesigner = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
      const designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      const firstContract = project.process.contract.first.calculation.amount;
      const report = await bill.designerConverting(proid, method, desid, { selfMongo, selfCoreMongo: instance.mongo });
      const newProject = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
      const timeConst = 410;
      const map = [
        {
          column: "designer",
          position: "desid",
          pastValue: pastDesigner.desid,
          finalValue: designer.desid,
        },
        {
          column: "calculationInfo",
          position: "process.calculation.info",
          pastValue: project.process.calculation.info,
          finalValue: newProject.process.calculation.info,
        },
        {
          column: "method",
          position: "process.calculation.method",
          pastValue: project.process.calculation.method,
          finalValue: newProject.process.calculation.method,
        },
        {
          column: "percentage",
          position: "process.calculation.percentage",
          pastValue: project.process.calculation.percentage,
          finalValue: newProject.process.calculation.percentage,
        },
        {
          column: "remainSupply",
          position: "process.contract.remain.calculation.amount.supply",
          pastValue: report.request.from.supply,
          finalValue: report.request.to.supply,
        },
        {
          column: "remainVat",
          position: "process.contract.remain.calculation.amount.vat",
          pastValue: report.request.from.vat,
          finalValue: report.request.to.vat,
        },
        {
          column: "remainConsumer",
          position: "process.contract.remain.calculation.amount.consumer",
          pastValue: report.request.from.consumer,
          finalValue: report.request.to.consumer,
        },
        {
          column: "remainPure",
          position: "process.contract.remain.calculation.amount.consumer",
          pastValue: report.request.from.consumer - firstContract,
          finalValue: report.request.to.consumer - firstContract,
        },
        {
          column: "paymentsTotalAmount",
          position: "process.calculation.payments.totalAmount",
          pastValue: report.response.from.total,
          finalValue: report.response.to.total,
        },
        {
          column: "paymentsFirstAmount",
          position: "process.calculation.payments.first.amount",
          pastValue: report.response.from.first,
          finalValue: report.response.to.first,
        },
        {
          column: "paymentsRemainAmount",
          position: "process.calculation.payments.remain.amount",
          pastValue: report.response.from.remain,
          finalValue: report.response.to.remain,
        },
      ];

      for (let { column, position, pastValue, finalValue } of map) {
        await requestSystem("https://" + address.backinfo.host + ":3000/updateLog", { id: proid, column, position, pastValue, finalValue }, { headers: { "origin": "https://" + address.pythoninfo.host, "Content-Type": "application/json" } });
        await sleep(timeConst);
      }

      if (report.request.additional) {
        await kakao.sendTalk("plusDesignerFee", client.name, client.phone, {
          client: client.name,
          pastdesigner: pastDesigner.designer,
          newdesigner: designer.designer,
          host: address.homeinfo.ghost.host,
          total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
          path: "estimation",
          cliid: client.cliid,
          needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
        });
        messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
          console.log(err);
        });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_designerConverting): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_amountConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/amountConverting";
  obj.func = async function (req, res) {
    try {
      if (req.body.bilid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid } = equalJson(req.body);
      await bill.amountConverting(bilid, { selfMongo, selfCoreMongo: instance.mongo });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_amountConverting): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_requestRefund = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep, requestSystem, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/requestRefund";
  obj.func = async function (req, res) {
    try {
      if (req.body.kind === undefined || req.body.bilid === undefined || req.body.requestIndex === undefined || req.body.payIndex === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { kind, bilid } = equalJson(req.body);
      const requestIndex = Number(req.body.requestIndex);
      const payIndex = Number(req.body.payIndex);
      if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial" ]).includes(kind)) {
        throw new Error("invaild post, kind must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial ]");
      }
      if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
        throw new Error("invaild post");
      }
      let report, option, client, designer, project, pastProject, proid;
      let timeConst, map;

      option = { selfMongo, selfCoreMongo: instance.mongo };
      if (req.body.percentage !== undefined) {
        if (typeof req.body.percentage === "string") {
          if (!Number.isNaN(Number(req.body.percentage.replace(/[^0-9]/gi, '')))) {
            option.percentage = Number(req.body.percentage);
          }
        } else if (typeof req.body.percentage === "number") {
          if (!Number.isNaN(req.body.percentage)) {
            option.percentage = Number(req.body.percentage);
          }
        }
      }
      if (req.body.accountNumber !== undefined && req.body.bankName !== undefined && req.body.accountName !== undefined) {
        option.accountNumber = req.body.accountNumber;
        option.bankName = req.body.bankName;
        option.accountName = req.body.accountName;
      }

      report = await bill.requestRefund(kind, bilid, requestIndex, payIndex, option);
      await messageLog(report);
      report.bill = report.bill.toNormal();
      report.pastProject = report.pastProject.toNormal();
      report.project = report.project.toNormal();
      report.client = report.client.toNormal();
      client = report.client;
      pastProject = report.pastProject;
      project = report.project;
      proid = project.proid;
      designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

      timeConst = 410;
      map = [
        {
          column: "paymentsTotalAmount",
          position: "process.calculation.payments.totalAmount",
          pastValue: pastProject.process.calculation.payments.totalAmount,
          finalValue: project.process.calculation.payments.totalAmount,
        },
        {
          column: "paymentsFirstAmount",
          position: "process.calculation.payments.first.amount",
          pastValue: pastProject.process.calculation.payments.first.amount,
          finalValue: project.process.calculation.payments.first.amount,
        },
        {
          column: "paymentsRemainAmount",
          position: "process.calculation.payments.remain.amount",
          pastValue: pastProject.process.calculation.payments.remain.amount,
          finalValue: project.process.calculation.payments.remain.amount,
        },
      ];

      for (let { column, position, pastValue, finalValue } of map) {
        await requestSystem("https://" + address.backinfo.host + ":3000/updateLog", { id: proid, column, position, pastValue, finalValue }, { headers: { "origin": "https://" + address.pythoninfo.host, "Content-Type": "application/json" } });
        await sleep(timeConst);
      }

      kakao.sendTalk((/card/gi.test(kind) ? "refundCard" : "refundVAccount"), client.name, client.phone, {
        client: client.name,
        designer: designer.designer,
        percentage: (!Number.isNaN(Number(req.body.percentage)) ? Number(req.body.percentage) : 100),
        amount: report.price.refund
      }).then(() => {
        return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
      }).catch((err) => {
        console.log(err);
      });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(report));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_requestRefund): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_contractCancel = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/contractCancel";
  obj.func = async function (req, res) {
    try {
      if (req.body.bilid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid } = equalJson(req.body);
      let report, option, project, pastProject, proid;
      let timeConst, map;

      option = { selfMongo, selfCoreMongo: instance.mongo };

      report = await bill.contractCancel(bilid, option);
      report.bill = report.bill.toNormal();
      report.pastProject = report.pastProject.toNormal();
      report.project = report.project.toNormal();

      pastProject = report.pastProject;
      project = report.project;
      proid = project.proid;

      timeConst = 410;
      map = [
        {
          column: "paymentsTotalAmount",
          position: "process.calculation.payments.totalAmount",
          pastValue: pastProject.process.calculation.payments.totalAmount,
          finalValue: project.process.calculation.payments.totalAmount,
        },
        {
          column: "paymentsFirstAmount",
          position: "process.calculation.payments.first.amount",
          pastValue: pastProject.process.calculation.payments.first.amount,
          finalValue: project.process.calculation.payments.first.amount,
        },
        {
          column: "paymentsRemainAmount",
          position: "process.calculation.payments.remain.amount",
          pastValue: pastProject.process.calculation.payments.remain.amount,
          finalValue: project.process.calculation.payments.remain.amount,
        },
      ];

      for (let { column, position, pastValue, finalValue } of map) {
        await requestSystem("https://" + address.backinfo.host + ":3000/updateLog", { id: proid, column, position, pastValue, finalValue }, { headers: { "origin": "https://" + address.pythoninfo.host, "Content-Type": "application/json" } });
        await sleep(timeConst);
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(report));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_contractCancel): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_returnBankCode = function () {
  const instance = this;
  const bankCode = this.bankCode;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/returnBankCode";
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(bankCode));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_returnBankCode): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_designerCalculation = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/designerCalculation";
  obj.func = async function (req, res) {
    try {
      if (req.body.supply === undefined || req.body.classification === undefined || req.body.percentage === undefined || req.body.cliid === undefined) {
        throw new Error("invaild post");
      }
      const { classification, cliid } = equalJson(req.body);
      const supply = Number(req.body.supply);
      const percentage = Number(req.body.percentage);
      let calculate, commission;
      let project, client;

      if (/^c/.test(cliid)) {
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        if (client === null) {
          throw new Error("invaild cliid");
        }
      } else if (/^p/.test(cliid)) {
        project = await back.getProjectById(cliid, { selfMongo: instance.mongo });
        if (project === null) {
          throw new Error("invaild proid");
        }
        client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        if (client === null) {
          throw new Error("invaild cliid");
        }
      } else {
        throw new Error("invaild cliid");
      }

      [ calculate, commission ] = bill.designerCalculation(supply, classification, percentage, client, { toArray: true });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      if (req.body.mode === "commission") {
        res.send(JSON.stringify({ commission }));
      } else if (req.body.mode === "total") {
        res.send(JSON.stringify({ calculate, commission }));
      } else {
        res.send(JSON.stringify({ calculate }));
      }
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_designerCalculation): " + e.message).catch((e) => { console.log(e); });
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
