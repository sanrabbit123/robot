const ReceiptRouter = function (MONGOC, MONGOLOCALC, kakaoInstance, humanInstance) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/receiptObserver";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.work = new BackWorker();
  this.bill = new BillMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();

  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;

  this.kakao = kakaoInstance;
  this.human = humanInstance;

  this.bankCode = BillMaker.returnBankCode("", "matrix");
}

ReceiptRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res, logger) {
    try {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_Ssl = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  obj.link = "/ssl";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const disk = await diskReading();
      const aliveMongoResult = await aliveMongo();
      res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_get_Ssl): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_Disk = function () {
  const instance = this;
  const { diskReading } = this.mother;
  let obj = {};
  obj.link = "/disk";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const disk = await diskReading();
      res.send(JSON.stringify({ disk: disk.toArray() }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_get_Disk): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_bluePrint = function () {
  const instance = this;
  let obj = {};
  obj.link = "/bluePrint";
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_get_bluePrint): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_blackPrint = function () {
  const instance = this;
  let obj = {};
  obj.link = "/blackPrint";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #000000;}</style></head><body></body></html>`;
      res.set({
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(html);
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_get_blackPrint): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_isOffice = function () {
  const instance = this;
  const address = this.address;
  let obj = {};
  obj.link = "/isOffice";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      res.send(JSON.stringify({ result: (String(ip).replace(/[^0-9\.]/gi, '').trim() === address.officeinfo.ip.outer.trim() ? 1 : 0) }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_get_isOffice): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_generalMongo): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_cashReceipt = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog } = this.mother;
  let obj = {};
  obj.link = "/cashReceipt";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      bill.createBill(collection, rows, { selfMongo: selfMongo }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_cashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createStylingContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createStylingContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.contractName === undefined || req.body.contractAddress === undefined) {
        throw new Error("invaild post");
      }
      const { proid, contractName, contractAddress } = req.body;
      const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자인계약서_000고객님_주홈리에종_YYMMDD";
        const project = await back.getProjectById(proid, { selfMongo });
        const client = await back.getClientById(project.cliid, { selfMongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo });
        const today = new Date();
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let request, analytics;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;
        let delta;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        proposalDate = project.proposal.date.valueOf();

        requestNumber = 0;
        for (let i = 0; i < client.requests.length; i++) {
          if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
            requestNumber = i;
            break;
          }
        }

        ({ request, analytics } = client.requests[requestNumber]);
        request = request.toNormal();
        analytics = analytics.toNormal();

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = client.name;
          if (contractName.trim() !== "") {
            titleName = contractName;
          }

          titleAddress = request.space.address;
          if (contractAddress.trim() !== "") {
            titleAddress = contractAddress;
          }

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자인계약서_" + titleName + "고객님_주홈리에종_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
          map = [
            { id: "661380e13e7c67bec0da739e", value: todayYear },
            { id: "661380e13e7c67bec0da739f", value: todayMonth },
            { id: "661380e13e7c67bec0da73a0", value: todayDate },
            { id: "661380e13e7c67bec0da73a1", value: titleName === '' ? '-' : titleName },
            { id: "661380e13e7c67bec0da73a2", value: client.phone === '' ? '-' : client.phone },
            { id: "661380e13e7c67bec0da73a3", value: request.family === '' ? "알 수 없음" : request.family },
            { id: "661380e13e7c67bec0da73a4", value: titleAddress === '' ? '-' : titleAddress },
            { id: "661380e13e7c67bec0da73a5", value: request.budget + " (디자이너 논의 및 조정)" },
            { id: "661380e13e7c67bec0da73a6", value: request.space.contract === '' ? '-' : request.space.contract },
            { id: "661380e13e7c67bec0da73a7", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "661380e13e7c67bec0da73a8", value: String(request.space.pyeong) },
            { id: "661380e13e7c67bec0da73a9", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
            { id: "661380e13e7c67bec0da73aa", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
            { id: "661380e13e7c67bec0da73ab", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
          ];

          map.push({ id: "661380e13e7c67bec0da73c1", value: serviceParsing(project.service) });

          map.push({ id: "661380e13e7c67bec0da73ac", value: designer.designer });

          map.push({ id: "661380e13e7c67bec0da73ad", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73ae", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73af", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73b0", value: String(project.process.contract.form.date.from.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73b1", value: String(project.process.contract.form.date.from.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73b2", value: String(project.process.contract.form.date.from.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73b3", value: String(project.process.contract.form.date.to.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73b4", value: String(project.process.contract.form.date.to.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73b5", value: String(project.process.contract.form.date.to.getDate()) });

          delta = (((((project.process.contract.form.date.to.valueOf() - project.process.contract.form.date.from.valueOf()) / 1000) / 60) / 60) / 24) / 30;
          map.push({ id: "661380e13e7c67bec0da73b6", value: String(Math.round(delta * 10) / 10) });

          map.push({ id: "661380e13e7c67bec0da73b7", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });

          map.push({ id: "661380e13e7c67bec0da73b8", value: "박헌성" });
          map.push({ id: "661380e13e7c67bec0da73ba", value: "02-2039-2252" });
          map.push({ id: "661380e13e7c67bec0da73b9", value: "help@home-liaison.com" });

          map.push({ id: "661380e13e7c67bec0da73bc", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73be", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73bd", value: todayDate });
          map.push({ id: "661380e13e7c67bec0da73bf", value: titleName === '' ? '-' : titleName });

          map.push({ id: "661380e13e7c67bec0da73c2", value: titleName === '' ? '-' : titleName });

          map.push({ id: "661380e13e7c67bec0da73c3", value: String(project.process.contract.form.date.from.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73c5", value: String(project.process.contract.form.date.from.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73c6", value: String(project.process.contract.form.date.from.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73c4", value: String(project.process.contract.form.date.to.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73c8", value: String(project.process.contract.form.date.to.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73c7", value: String(project.process.contract.form.date.to.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73c9", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });


          map.push({ id: "661380e13e7c67bec0da73cd", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73ce", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73cf", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73ca", value: titleAddress === '' ? '-' : titleAddress });
          map.push({ id: "661380e13e7c67bec0da73cb", value: titleName === '' ? '-' : titleName });

          map.push({ id: "6613817dacb8f4637c000001", value: titleName === '' ? '-' : titleName });
          map.push({ id: "66138192acb8f4637c000002", value: todayYear });
          map.push({ id: "6613819aacb8f4637c000003", value: todayMonth });
          map.push({ id: "661381a7acb8f4637c000004", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73d3", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73d4", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73d5", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73d0", value: titleAddress === '' ? '-' : titleAddress });
          map.push({ id: "661380e13e7c67bec0da73d1", value: titleName === '' ? '-' : titleName });

          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 홈스타일링 계약서 보내드립니다.",
            receiver_list: [
              {
                name: client.name,
                email: client.email,
                mobile: client.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("stylingForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            requestNumber: requestNumber,
            cliid: client.cliid,
            proid: project.proid
          } ], { selfMongo: instance.mongolocal });

          await kakao.sendTalk("stylingForm", client.name, client.phone, { client: client.name });
          messageSend({ text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createStylingContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, messageLog, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createConstructContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.summary === undefined) {
        throw new Error("invaild post");
      }
      const { proid, summary } = req.body;
      const { contractName, contractAddress, contractPhone } = summary;
      const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });

      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023시공계약서_000고객님_주홈리에종_YYMMDD";
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
        const today = new Date();
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
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let request, analytics;
          let map;
          let data;

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

              ({ request, analytics } = client.requests[requestNumber]);
              request = request.toNormal();
              analytics = analytics.toNormal();

              widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

              if (widsignRes.data.result_code !== 200) {
                throw new Error("access token error");
              } else {
                token = widsignRes.data.access_token;
                num = 1;
                safeNum = 0;
                do {
                  widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                  target = widsignRes.data.result.filter((obj) => { return obj.title === title });
                  num++;
                  safeNum++;
                  if (safeNum > 1000) {
                    throw new Error("title name error");
                  }
                } while (target.length === 0);

                [ { id: targetFormId } ] = target;

                titleName = client.name;
                if (contractName.trim() !== "") {
                  titleName = contractName;
                }

                titleAddress = request.space.address;
                if (contractAddress.trim() !== "") {
                  titleAddress = contractAddress;
                }

                tempArr = dateToString(today).split('-');
                formTitle = "시공계약서_" + titleName + "고객님_주홈리에종_";
                formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
                map = [
                  { id: "651e7414fbcd2144a51009c2", value: titleName === '' ? '-' : titleName },
                  { id: "651e7414fbcd2144a51009c3", value: summary.name === '' ? '-' : summary.name },
                  { id: "651e7414fbcd2144a51009c4", value: summary.address === '' ? '-' : summary.address },
                  { id: "651e7414fbcd2144a51009c5", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[0] },
                  { id: "651e7414fbcd2144a51009c7", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[1] },
                  { id: "651e7414fbcd2144a51009c9", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[2] },
                  { id: "651e7414fbcd2144a51009c6", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[0] },
                  { id: "651e7414fbcd2144a51009c8", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[1] },
                  { id: "651e7414fbcd2144a51009ca", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[2] },
                  { id: "651e7414fbcd2144a51009cb", value: summary.hangul === '' ? '-' : summary.hangul.replace(/원$/, '') },
                  { id: "651e7414fbcd2144a51009cc", value: autoComma(summary.total) === '' ? '-' : autoComma(summary.total) },
                  { id: "651e7414fbcd2144a51009cd", value: String(summary.first.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d1", value: autoComma(summary.first.amount) === '' ? '-' : autoComma(summary.first.amount) },
                  { id: "651e7414fbcd2144a51009d5", value: summary.first.date === '' ? '-' : summary.first.date },
                  { id: "651e7414fbcd2144a51009d9", value: summary.first.etc === '' ? '-' : summary.first.etc },
                  { id: "651e7414fbcd2144a51009ce", value: String(summary.start.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d2", value: autoComma(summary.start.amount) === '' ? '-' : autoComma(summary.start.amount) },
                  { id: "651e7414fbcd2144a51009d6", value: summary.start.date === '' ? '-' : summary.start.date },
                  { id: "651e7414fbcd2144a51009da", value: summary.start.etc === '' ? '-' : summary.start.etc },
                  { id: "651e7414fbcd2144a51009cf", value: String(summary.middle.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d3", value: autoComma(summary.middle.amount) === '' ? '-' : autoComma(summary.middle.amount) },
                  { id: "651e7414fbcd2144a51009d7", value: summary.middle.date === '' ? '-' : summary.middle.date },
                  { id: "651e7414fbcd2144a51009db", value: summary.middle.etc === '' ? '-' : summary.middle.etc },
                  { id: "651e7414fbcd2144a51009d0", value: String(summary.remain.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d4", value: autoComma(summary.remain.amount) === '' ? '-' : autoComma(summary.remain.amount) },
                  { id: "651e7414fbcd2144a51009d8", value: summary.remain.date === '' ? '-' : summary.remain.date },
                  { id: "651e7414fbcd2144a51009dc", value: summary.remain.etc === '' ? '-' : summary.remain.etc },
                  { id: "651e7414fbcd2144a51009e0", value: titleName === '' ? '-' : titleName },
                  { id: "651e7414fbcd2144a51009de", value: contractPhone === '' ? '-' : contractPhone },
                  { id: "651e7414fbcd2144a51009df", value: contractAddress === '' ? '-' : contractAddress },
                ];

                data = {
                  form_id: targetFormId,
                  title: formTitle,
                  send_type: "SAMETIME",
                  auth_phone: "N",
                  mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 시공 계약서 보내드립니다.",
                  receiver_list: [
                    {
                      name: client.name,
                      email: client.email,
                      mobile: client.phone.replace(/\-/gi, '')
                    }
                  ],
                  items: map
                }
                widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

                await bill.createBill("constructForm", [ {
                  name: widsignRes.data.result[0].doc_name,
                  id: widsignRes.data.result[0].receiver_meta_id,
                  time: new Date(),
                  requestNumber: requestNumber,
                  cliid: client.cliid,
                  proid: project.proid
                } ], { selfMongo: instance.mongolocal });

                await kakao.sendTalk("constructForm", client.name, client.phone, { client: client.name });
                messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).then(() => {
                  return requestSystem("https://" + instance.address.backinfo.host + ":3000/constructInteraction", {
                    mode: "chargeGuide",
                    proid: project.proid,
                    method: "first",
                  }, { headers: { "Content-Type": "application/json", "origin": instance.address.pythoninfo.host } });
                }).catch((err) => {
                  console.log(err);
                });


                res.send(JSON.stringify({ message: "OK" }));
              }

            } else {
              await messageSend({ text: "프로젝트 " + proid + "에서 지정된 파트서 시공사가 등록된 파트너가 아니에요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
              res.send(JSON.stringify({ message: "ERROR" }));
            }
          } else {
            await messageSend({ text: "프로젝트 " + proid + "는 파트서 시공사가 지정되지 않았어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
            res.send(JSON.stringify({ message: "ERROR" }));
          }
        } else {
          await messageSend({ text: "프로젝트 " + proid + "의 영수증을 찾을 수 없어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } else {
        console.log("styling form cancel : " + proid);
        await messageSend({ text: "프로젝트 " + proid + "의 시공 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createConstructContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createPartnershipContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createPartnershipContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined) {
        throw new Error("invaild post");
      }
      const { aspid } = req.body;
      const rows = await back.mongoRead("partnershipForm", { aspid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자이너파트너십계약서_000디자이너_YYMMDD";
        const aspirant = await back.getAspirantById(aspid, { selfMongo });
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        nextYear.setDate(nextYear.getDate() - 1);
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = aspirant.designer;
          titleAddress = aspirant.address;

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자이너파트너십계약서_" + titleName + "디자이너_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

          map = [
            { id: "6441eeed39f14f6a53000001", value: aspirant.designer },
            { id: "6441ef0e39f14f6a53000002", value: dateToString(today) + " ~ " + dateToString(nextYear) },
            { id: "6441ef2c39f14f6a53000003", value: aspirant.designer },
            { id: "6441ef4239f14f6a53000005", value: /프리/gi.test(aspirant.information.company.classification) ? "-" : aspirant.information.company.businessNumber },
            { id: "6441ef4b39f14f6a53000006", value: dateToString(aspirant.birth) },
            { id: "6441ef3f39f14f6a53000004", value: dateToString(today) },
            { id: "6441f02f39f14f6a53000009", value: titleAddress },
            { id: "6441f03e39f14f6a5300000a", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
            { id: "6441f04b39f14f6a5300000b", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
          ];
          
          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 파트너십 계약서 보내드립니다.",
            receiver_list: [
              {
                name: aspirant.designer,
                email: aspirant.email,
                mobile: aspirant.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("partnershipForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            aspid: aspid,
          } ], { selfMongo: instance.mongolocal });

          messageSend({ text: aspirant.designer + " 파트너십 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "신청자 " + aspid + "의 파트너십 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createPartnershipContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_createDesignerContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createDesignerContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined) {
        throw new Error("invaild post");
      }
      const { aspid } = req.body;
      const rows = await back.mongoRead("designerForm", { aspid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자인서비스제휴계약서_000디자이너_YYMMDD";
        const aspirant = await back.getAspirantById(aspid, { selfMongo });
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        nextYear.setDate(nextYear.getDate() - 1);
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;
        let percentage;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        percentage = 30;

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = aspirant.designer;
          titleAddress = aspirant.address;

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자인서비스제휴계약서_" + titleName + "디자이너_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

          map = [
            { id: "6440dafad4a1496b82000005", value: aspirant.designer },
            { id: "6440db17d4a1496b82000006", value: todayYear },
            { id: "6440db23d4a1496b82000007", value: todayMonth },
            { id: "6440db3dd4a1496b82000009", value: todayDate },
            { id: "6440db8fd4a1496b8200000a", value: String(percentage) },
            { id: "6440dbc3d4a1496b8200000b", value: aspirant.information.account.to },
            { id: "6440dbe4d4a1496b8200000d", value: aspirant.information.account.bank },
            { id: "6440dc17d4a1496b8200000e", value: aspirant.information.account.number },
            { id: "6440dddad4a1496b82000011", value: titleAddress },
            { id: "6440ddebd4a1496b82000012", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
            { id: "6440ddfbd4a1496b82000013", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
          ];

          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 서비스 제휴 계약서 보내드립니다.",
            receiver_list: [
              {
                name: aspirant.designer,
                email: aspirant.email,
                mobile: aspirant.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("designerForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            aspid: aspid,
          } ], { selfMongo: instance.mongolocal });

          messageSend({ text: aspirant.designer + " 서비스 제휴 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "신청자 " + aspid + "의 서비스 제휴 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createDesignerContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_receiveConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, fileSystem, dateToString, autoComma, messageSend, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/receiveConstructContract";
  obj.func = async function (req, res, logger) {
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
        await kakao.sendTalk(collection, client.name, client.phone, { client: client.name });
        messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).then(() => {
          return requestSystem("https://" + instance.address.backinfo.host + ":3000/constructInteraction", {
            mode: "chargeGuide",
            proid: json.proid,
            method: "first",
          }, { headers: { "Content-Type": "application/json", "origin": instance.address.pythoninfo.host } });
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
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_receiveConstructContract): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/constructAmountSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined || req.body.method === undefined) {
        throw new Error("invaild post");
      }
      const { proid, cliid, desid, method } = equalJson(req.body);
      const find0 = "시공 잔금";
      const findFirst = "시공 계약금";
      const findStart = "시공 착수금";
      const findMiddle = "시공 중도금";
      const findRemain = "시공 잔금";
      const find1 = "시공";
      let bills, bilid, tempIndex, targetIndex, targetBill;
      let itemIndex;
      let whereQuery, updateQuery;

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
          if (req.body.amount !== undefined) {
            const { amount: { supply, vat, consumer } } = equalJson(req.body);

            if (targetIndex !== -1) {
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

          } else {
            const { first, start, middle, remain } = equalJson(req.body);

            whereQuery = { bilid };
            updateQuery = {};

            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findFirst, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = first.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = first.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = first.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = first.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findStart, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = start.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = start.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = start.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = start.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findMiddle, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = middle.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = middle.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = middle.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = middle.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findRemain, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = remain.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = remain.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = remain.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = remain.consumer;
            }

            await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }

        }
      }

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_constructAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_stylingAmountSync = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const { equalJson, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/stylingAmountSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { proid } = equalJson(req.body);
      const find0 = "홈리에종 잔금";
      const find1 = "디자인비";
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let bills, bilid, tempIndex, targetIndex, targetBill;
      let itemIndex;
      let whereQuery, updateQuery;
      let project;
      let supply;
      let vat;
      let consumer;
      let firstTargetIndex, firstItemIndex;
      let firstConsumer;
      let firstVat;
      let firstSupply;
      let firstIndex;
      let remainIndex;


      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      if (project === null) {
        throw new Error("invaild post");
      }

      bills = await bill.getBillsByQuery({
        $and: [
          { "links.proid": proid },
          { "links.cliid": project.cliid },
          { "links.desid": project.desid },
          { "links.method": (project.service.online ? "online" : "offline") },
        ]
      }, { selfMongo: instance.mongolocal });
      if (bills.length === 0) {
        throw new Error("cannot find bill");
      }

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

      consumer = Math.floor(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount);
      vat = Math.floor(consumer / 11);
      supply = Math.floor(consumer - vat);

      firstConsumer = Math.floor(project.process.contract.first.calculation.amount);
      firstVat = Math.floor(firstConsumer / 11);
      firstSupply = Math.floor(firstConsumer - firstVat);


      itemIndex = -1;
      for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
        if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
          itemIndex = i;
          break;
        }
      }

      firstTargetIndex = -1;
      firstItemIndex = -1;
      for (let i = 0; i < targetBill.requests.length; i++) {
        if (/홈리에종 계약금/gi.test(targetBill.requests[i].name)) {
          firstTargetIndex = i;
          break;
        }
      }

      for (let i = 0; i < targetBill.requests[firstTargetIndex].items.length; i++) {
        if (/디자인비/gi.test(targetBill.requests[firstTargetIndex].items[i].name)) {
          firstItemIndex = i;
          break;
        }
      }


      whereQuery = { bilid };
      updateQuery = {};

      if (firstTargetIndex !== -1 && firstItemIndex !== -1) {
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".unit.price"] = firstSupply;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.supply"] = firstSupply;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.vat"] = firstVat;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.consumer"] = firstConsumer;
      }

      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;


      remainIndex = 0;
      firstIndex = 0;
      for (let i = 0; i < targetBill.responses.length; i++) {
        if (/홈리에종 잔금/gi.test(targetBill.responses[i].name)) {
          remainIndex = i;
        }
        if (/홈리에종 선금/gi.test(targetBill.responses[i].name)) {
          firstIndex = i;
        }
      }

      updateQuery["responses." + String(firstIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.first.amount)
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.first.amount)
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)

      updateQuery["responses." + String(remainIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.remain.amount)
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.remain.amount)
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)


      if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".pay"] = [
          {
            date: project.process.calculation.payments.first.date,
            amount: Math.floor(project.process.calculation.payments.first.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(firstIndex) + ".proofs"] = [
          {
            date: project.process.calculation.payments.first.date,
            method: "계좌 이체",
            proof: project.process.calculation.info.proof,
            to: project.process.calculation.info.to,
          }
        ]
      }

      if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".cancel"] = [
          {
            date: project.process.calculation.payments.first.cancel,
            amount: Math.floor(project.process.calculation.payments.first.refund),
            oid: ""
          }
        ]
      }

      if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".pay"] = [
          {
            date: project.process.calculation.payments.remain.date,
            amount: Math.floor(project.process.calculation.payments.remain.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(remainIndex) + ".proofs"] = [
          {
            date: project.process.calculation.payments.remain.date,
            method: "계좌 이체",
            proof: project.process.calculation.info.proof,
            to: project.process.calculation.info.to,
          }
        ]
      }

      if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".cancel"] = [
          {
            date: project.process.calculation.payments.remain.cancel,
            amount: Math.floor(project.process.calculation.payments.remain.refund),
            oid: ""
          }
        ]
      }

      console.log(whereQuery, updateQuery);

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_smsParsing = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, autoComma, requestSystem, sleep } = this.mother;
  const collection = "accountTransfer";
  const designerCollection = "designerTransfer";
  const standardDay = 7;
  let obj = {};
  obj.link = "/smsParsing";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.date === undefined || req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const emptyPromise = () => {
        return new Promise((resolve, reject) => { resolve(null); });
      }
      const selfMongo = instance.mongolocal;
      const { date, amount, name } = equalJson(req.body);
      const errorMessage = "뭔가 은행 문자가 왔는데 찾을 수 없음 : " + name + " " + autoComma(amount) + "원";
      const ignoreMessage = "무시하는 리스트에 포함된 은행 문자 왔음 : " + name + " " + autoComma(amount) + "원";
      const ignoreList = [
        "KG이니시스",
      ];
      let rows, ago, target, rows2;
      let target2;
      let whereQuery;
      let updateQuery;
      let thisProject;
      let thisClient;

      if (!ignoreList.includes(name.trim())) {
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
          }
        }

        if (target !== null) {

          await sleep(500);

          const { phone, amount, requestNumber } = target;

          target.accountInfo.requestNumber = requestNumber;
          messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });

          await requestSystem("https://" + instance.address.pythoninfo.host + ":3000/webHookVAccount", target.accountInfo, {
            headers: { "Content-Type": "application/json" }
          });
          logger.log("현금 영수증 관련 핸드폰 번호 감지 => " + phone).catch((e) => { console.log(e); });
          if (/^010/.test(phone)) {
            requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/issueCashReceipt", { amount: Number(amount), phone }, { headers: { "Content-Type": "application/json" } }).then(() => {
              return messageSend(`${name} 고객님의 현금 영수증을 발행하였습니다!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
            }).catch((err) => {
              logger.error("Python 서버 문제 생김 (rou_post_smsParsing): " + err.message).catch((e) => { console.log(e); });
              throw new Error(err.message);
            });
          }

        } else {

          target2 = null;
          rows = await back.mongoRead(designerCollection, { amount }, { selfMongo });
          if (rows.length > 0) {
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
            rows = rows.filter((obj) => {
              return obj.date.valueOf() >= ago.valueOf();
            }).filter((obj) => {
              return (new RegExp(obj.name, "gi")).test(name);
            }).filter((obj) => {
              return obj.complete === 0;
            });
            if (rows.length > 0) {
              if (rows.length === 1) {
                [ target2 ] = rows;
              } else {
                rows2 = rows.filter((obj) => {
                  return obj.name.trim() === name.trim();
                });
                if (rows2.length > 0) {
                  [ target2 ] = rows2;
                } else {
                  [ target2 ] = rows;
                }
              }
            }
          }

          if (target2 !== null) {

            if (/촬영/gi.test(target2.goodname)) {

              thisProject = await back.getProjectById(target2.proid, { selfMongo: instance.mongo });
              thisClient = await back.getClientById(target2.cliid, { selfMongo: instance.mongo });

              messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#301_console", true).catch((err) => { throw new Error(err.message); });
              messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
              
              whereQuery = { proid: target2.proid };
              updateQuery = {};
              updateQuery["contents.payment.status"] = "결제 완료";
              updateQuery["contents.payment.date"] = new Date();
              updateQuery["contents.payment.calculation.amount"] = amount;
              updateQuery["contents.payment.calculation.info.method"] = "계좌 이체";
              if (/프리/gi.test(thisProject.process.calculation.method) || /간이/gi.test(thisProject.process.calculation.method)) {
                updateQuery["contents.payment.calculation.info.proof"] = "현금영수증";
              } else {
                updateQuery["contents.payment.calculation.info.proof"] = "세금계산서";
              }
              updateQuery["contents.payment.calculation.info.to"] = target2.name;
              await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

              whereQuery = { proid: target2.proid, goodname: target2.goodname };
              updateQuery = {};
              updateQuery["complete"] = 1;
              await selfMongo.db("miro81").collection(designerCollection).updateMany(whereQuery, { $set: updateQuery });

            } else {
              messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
              logger.alert(errorMessage).catch((e) => { console.log(e); });
            }

          } else {
            messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
            logger.alert(errorMessage).catch((e) => { console.log(e); });
          }

        }

      } else {
        logger.log(ignoreMessage).catch((e) => { console.log(e); });
      }

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_smsParsing): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeSet";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { amount, name } = equalJson(req.body);
      let rows, result;

      messageSend(`${name} 고객님이 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
      await back.mongoCreate(collection, equalJson(req.body), { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_accountTimeSet): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_designerTransfer = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "designerTransfer";
  let obj = {};
  obj.link = "/designerTransfer";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.designer === undefined || req.body.desid === undefined || req.body.body === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { designer, desid, body } = equalJson(req.body);
      const thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });

      messageSend(`${designer} 실장님이 ${body.goodname} 결제를 위해 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });

      kakao.sendTalk("designerAccount", designer, thisDesigner.information.phone, {
        designer,
        goodName: body.goodname,
        bankName: "기업",
        account: "049-085567-04-022",
        to: designer,
        amount: autoComma(body.amount),
      }).catch((err) => {
        console.log(err);
      });

      await back.mongoCreate(collection, body, { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerTransfer): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_accountTimeUpdate = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeUpdate";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const { whereQuery, updateQuery, name, phone } = equalJson(req.body);

      logger.log(`증빙 번호 업데이트 감지 => \n${JSON.stringify(whereQuery, null, 2)}\n${JSON.stringify(updateQuery, null, 2)}`).catch((err) => { throw new Error(err.message); });

      if (/^010/.test(phone)) {
        // pass
      } else {
        await messageSend({ text: `${name} 고객님이 ${phone} 번호로 세금 계산서 신청을 하셨습니다!`, channel: "#700_operation", voice: true });
      }
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_accountTimeUpdate): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_post_createStylingBill): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      } else if (mode === "update") {

        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery, updateQuery");
        }
        ({ whereQuery, updateQuery } = equalJson(req.body));
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
        result = { message: "success" };

      } else {
        throw new Error("must be mode => [ read, update ]");
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_generalBill): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.sync_paymentProject = async function (bilid, requestNumber, data, amount, proofs, inisis, needs, logger) {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, requestSystem, messageSend } = this.mother;
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
    let discount;
    let thisProposal;
    let thisMethod;
    let thisFeeObject;
    let billsDuplication;

    if (/홈리에종 계약금/gi.test(data.goodName.trim()) || /홈리에종 잔금/gi.test(data.goodName.trim())) {
      projectQuery = {};
      if (proposal !== undefined && proposal !== null) {
        if (proposal.fee.length === 1) {
          pureDesignFee = Math.round(proposal.fee[0].amount);
          discount = proposal.fee[0].discount;
        } else {
          for (let obj of proposal.fee) {
            if (obj.method === thisBill.links.method) {
              pureDesignFee = Math.round(obj.amount);
              discount = obj.discount;
            }
          }
        }
      } else {
        pureDesignFee = 0;
        discount = 0;
      }

      if (/계약금/gi.test(data.goodName.trim())) {

        billsDuplication = await bill.getBillsByQuery({ "links.proid": proid, "links.desid": desid, "links.method": thisBill.links.method }, { selfMongo: instance.mongolocal });
        if (billsDuplication.length > 1) {
          for (let b of billsDuplication) {
            if (b.bilid !== thisBill.bilid) {
              if (typeof b.bilid === "string") {
                await bill.deleteBill(b.bilid, { selfMongo: instance.mongolocal });
              }
            }
          }
        }

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
        projectQuery["process.contract.remain.calculation.discount"] = Number(discount);

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

        [ calculate ] = bill.designerCalculation((pureDesignFee / (1 - discount)), businessMethod, percentage, client, { toArray: true });
        projectQuery["process.calculation.payments.totalAmount"] = calculate;
        projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
        projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

        if (Number(project.service.serid.split("_")[1].replace(/[^0-9]/gi, '').replace(/^0/, '')) !== 1) {
          projectQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
        }

        await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
        await bill.designerSelect(proid, desid, { selfMongo: instance.mongolocal });

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });
        await bill.amountConverting(thisBill.bilid, { selfMongo: instance.mongolocal });

        thisProposal = project.proposal.detail.find((p) => { return p.desid === desid });
        thisMethod = (project.service.online ? "online" : "offline");
        if (thisProposal !== undefined) {
          thisFeeObject = thisProposal.fee.find((f) => { return f.method === thisMethod });
          if (thisFeeObject !== undefined) {
            if (thisFeeObject.distance.amount !== 0) {
              await bill.travelInjection("request", proid, thisMethod, 1, { selfMongo: instance.mongolocal });
            }
          }
        }

        requestSystem("https://" + instance.address.backinfo.host + ":3000/getHistoryProperty", { idArr: [ desid ], method: "designer", property: "manager" }, {
          headers: {
            "Content-Type": "application/json",
            "origin": "https://" + instance.address.pythoninfo.host,
          }
        }).then((res) => {
          const { data } = res;
          return requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
            method: "project",
            id: proid,
            column: "manager",
            value: data[desid],
            email: null
          }, {
            headers: {
              "Content-Type": "application/json",
              "origin": "https://" + instance.address.pythoninfo.host,
            }
          });
        }).catch((err) => {
          logger.error("Python 서버 문제 생김 (sync_paymentProject, history 연산중 콘솔에서 문제 생김) : " + err.message).catch((e) => { console.log(e); })
        });

        instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
          host: instance.address.frontinfo.host,
          path: "caution",
        }).catch((err) => {
          console.log(err);
        });

        requestSystem("https://" + instance.address.backinfo.host + "/realtimeDesigner", { mode: "sync", proid }, {
          headers: {
            "Content-Type": "application/json",
            "origin": "https://" + instance.address.pythoninfo.host
          }
        }).then((obj) => {
          if (obj.status >= 300) {
            return logger.error("Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) ");
          }
        }).catch((err) => {
          logger.error("Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) : " + err.message).catch((e) => { console.log(e); })
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
        }).catch((err) => {
          console.log(err);
        });

      }

    } else if (/시공 계약금/gi.test(data.goodName.trim()) || /시공 착수금/gi.test(data.goodName.trim()) || /시공 중도금/gi.test(data.goodName.trim()) || /시공 잔금/gi.test(data.goodName.trim())) {

      projectQuery = {};

      if (/계약금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "계약금 입금";
        projectQuery["process.design.construct.contract.payments.first.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.first.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.first.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.first.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/착수금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "착수금 입금";
        projectQuery["process.design.construct.contract.payments.start.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.start.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.start.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.start.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/중도금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "중도금 입금";
        projectQuery["process.design.construct.contract.payments.middle.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/잔금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "잔금 입금";
        projectQuery["process.design.construct.contract.payments.remain.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      }

      instance.kakao.sendTalk("generalPayments", client.name, client.phone, {
        client: client.name,
        goods: data.goodName.trim(),
      }).catch((err) => {
        console.log(err);
      });

    }

  } catch (e) {
    logger.error("Python 서버 문제 생김 (sync_paymentProject) : " + e.message).catch((e) => { console.log(e); })
    console.log(e);
  }
}

ReceiptRouter.prototype.rou_post_ghostClientBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/ghostClientBill";
  obj.func = async function (req, res, logger) {
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
      let itemArr, payArr, cancelArr;
      let itemNum, payNum, cancelNum;
      let payObject;
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

        if (client === null || designer === null || project === null) {
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

          updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";

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
          await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal }, logger);

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
            }).catch((err) => {
              console.log(err);
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
            }).catch((err) => {
              console.log(err);
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
      logger.error("Python 서버 문제 생김 (rou_post_ghostClientBill): " + e.message).catch((e) => { console.log(e); });
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
  const address = this.address;
  const bill = this.bill;
  const { equalJson, requestSystem, messageSend } = this.mother;
  const impWebhookUrl = "https://service.iamport.kr/inicis_payments/notice_vbank";
  let obj = {};
  obj.link = "/webHookVAccount";
  obj.public = true;
  obj.func = async function (req, res, logger) {
    try {
      const oid = req.body.no_oid;
      const inisis = "현금 영수증";
      const bankFrom = req.body.nm_inputbank;
      const nameFrom = req.body.nm_input;
      const rawRequestNumber = Number(req.body.requestNumber);
      let bills;
      let accountTransferCollection;
      let transferRows, transferRows2;
      let impId;

      if (!/imp_/g.test(oid)) {

        bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: oid } } }, { selfMongo: instance.mongolocal });

        if (bills.length === 0) {
          accountTransferCollection = "accountTransfer";
          transferRows = await back.mongoRead(accountTransferCollection, { "accountInfo.no_oid": oid }, { selfMongo: instance.mongolocal });
          if (transferRows.length > 0) {
            transferRows2 = await back.mongoRead(accountTransferCollection, {
              $and: [
                { name: transferRows[0].name },
                { phone: transferRows[0].phone },
                { amount: transferRows[0].amount },
                { goodname: transferRows[0].goodname },
              ]
            }, { selfMongo: instance.mongolocal });
            if (transferRows2.length > 1) {
              transferRows2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
              for (let obj of transferRows2) {
                bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: obj.accountInfo.no_oid } } }, { selfMongo: instance.mongolocal });
                if (bills.length !== 0) {
                  break;
                }
              }
              if (bills.length === 0) {
                throw new Error("invaild oid 3");
              }
            } else {
              throw new Error("invaild oid 2");
            }
          } else {
            throw new Error("invaild oid 1");
          }
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
        let whereQuery, updateQuery;
        let proofs;
        let itemArr, payArr, cancelArr;
        let itemNum, payNum, cancelNum;
        let payObject;
        let message;
  
        thisBill = bills[0];
        thisBill = thisBill.toNormal();
        bilid = thisBill.bilid;
  
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        proposal = project.selectProposal(desid);
  
        if (client === null || designer === null || project === null) {
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
          requestNumber = rawRequestNumber;
          if (Number.isNaN(Number(requestNumber))) {
            throw new Error("invalid request request number")
          }
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
  
        updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
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
        await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal }, logger);
  
      } else {
        const impId = req.body.no_oid;
        const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
          imp_key: address.officeinfo.import.key,
          imp_secret: address.officeinfo.import.secret
        }, { headers: { "Content-Type": "application/json" } }));
        const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
          method: "get",
          headers: { "Authorization": accessToken }
        });

        const oid = paymentData.merchant_uid;

        if (/dreg_/g.test(oid)) {
          const [ oidConst, aspid0, aspid1 ] = oid.split("_");
          const aspid = aspid0 + "_" + aspid1;
          if (/paid/g.test(paymentData.status)) {
            if (paymentData.pay_method === "card") {
              await requestSystem("https://" + address.backinfo.host + ":3000/aspirantPayment", {
                aspid,
                mode: "card",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              await requestSystem("https://" + address.backinfo.host + ":3000/aspirantPayment", {
                aspid,
                mode: "vbank",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            }
          } else {
            if (paymentData.pay_method !== "card") {
              await requestSystem("https://" + address.backinfo.host + ":3000/aspirantPayment", {
                aspid,
                mode: "vbank",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            }
          }
        }
      }

      res.set({ "Content-Type": "text/plain" });
      res.send("OK");
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_webHookVAccount): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_post_designerSelect): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_post_travelInjection): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_post_travelEjection): " + e.message).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_travelUpDown = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelUpDown";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.order === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { order, proid, method, index: rawIndex } = equalJson(req.body);
      const index = Number(rawIndex);
      const thisBill = await bill.travelUpDown(order, proid, method, index, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_travelUpDown): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
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
      logger.error("Python 서버 문제 생김 (rou_post_travelReconfig): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, requestSystem, sleep, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/serviceConverting";
  obj.func = async function (req, res, logger) {
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
            host: address.backinfo.host,
            path: "estimation",
            cliid: client.cliid,
            needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
          }).catch((err) => {
            console.log(err);
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
      logger.error("Python 서버 문제 생김 (rou_post_serviceConverting): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, requestSystem, sleep, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/designerConverting";
  obj.func = async function (req, res, logger) {
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
          host: address.backinfo.host,
          total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
          path: "estimation",
          cliid: client.cliid,
          needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
        }).catch((err) => {
          console.log(err);
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
      logger.error("Python 서버 문제 생김 (rou_post_designerConverting): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid } = equalJson(req.body);
      await bill.amountConverting(bilid, { selfMongo, selfCoreMongo: instance.mongo });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_amountConverting): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.kind === undefined || req.body.bilid === undefined || req.body.requestIndex === undefined || req.body.payIndex === undefined) {
        throw new Error("invaild post 0");
      }
      const selfMongo = instance.mongolocal;
      const { kind, bilid } = equalJson(req.body);
      const requestIndex = Number(req.body.requestIndex);
      const payIndex = Number(req.body.payIndex);
      if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial", "cashEntire", "cashPartial" ]).includes(kind)) {
        throw new Error("invaild post, kind must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial, cashEntire, cashPartial ]");
      }
      if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
        throw new Error("invaild post 1");
      }
      let refundPrice;
      let report, option, client, designer, project, pastProject, proid;
      let timeConst, map;

      if (req.body.refundPrice !== undefined) {
        refundPrice = Number(req.body.refundPrice);
        if (refundPrice === 0 || Number.isNaN(refundPrice)) {
          refundPrice = null;
        }
      } else {
        refundPrice = null;
      }

      option = { selfMongo, selfCoreMongo: instance.mongo };
      if (req.body.percentage !== undefined) {
        if (typeof req.body.percentage === "string") {
          if (!Number.isNaN(Number(req.body.percentage.replace(/[^0-9\.]/gi, '')))) {
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
      if (refundPrice !== undefined && refundPrice !== null) {
        if (typeof refundPrice === "number") {
          option.refundPrice = refundPrice;
        }
      }

      if (!/^cash/i.test(kind)) {
        report = await bill.requestRefund(kind, bilid, requestIndex, payIndex, option);
        await messageLog("환불 감지 : " + JSON.stringify(report, null, 2));
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
          percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
          amount: report.price.refund
        }).then(() => {
          return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
        }).catch((err) => {
          console.log(err);
        });

        res.send(JSON.stringify(report));

      } else {

        if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "request") {
          report = await bill.cashRefund("request", bilid, requestIndex, payIndex, option);
        } else if (req.body.mode === "execute") {
          report = await bill.cashRefund("execute", bilid, requestIndex, payIndex, option);

          client = report.client;
          designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

          kakao.sendTalk("refundVAccount", client.name, client.phone, {
            client: client.name,
            designer: designer.designer,
            percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
            amount: report.price.refund
          }).then(() => {
            return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
          }).catch((err) => {
            console.log(err);
          });

        }
        if (report.message === "success") {
          res.send(JSON.stringify(report));
        } else {
          throw new Error(report.message);
        }

      }

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_requestRefund): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      res.send(JSON.stringify(report));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_contractCancel): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      res.send(JSON.stringify(bankCode));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_returnBankCode): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      if (req.body.mode === "commission") {
        res.send(JSON.stringify({ commission }));
      } else if (req.body.mode === "total") {
        res.send(JSON.stringify({ calculate, commission }));
      } else {
        res.send(JSON.stringify({ calculate }));
      }
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerCalculation): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_returnDummy = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/returnDummy";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.collection === undefined || req.body.subject === undefined) {
        throw new Error("invaild post : must be { collection, subject }");
      }
      const { collection, subject } = req.body;
      const dummy = bill.returnDummies(collection, subject);
      res.send(JSON.stringify(dummy));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_returnDummy): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_invoiceRead = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/invoiceRead";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined) {
        throw new Error("invaild post");
      }
      const collection = "constructInvoice";
      const { whereQuery } = equalJson(req.body);
      const rows = await back.mongoRead(collection, whereQuery, { selfMongo: instance.mongolocal });
      res.send(JSON.stringify(rows));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_invoiceRead): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_invoiceRequest = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/invoiceRequest";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.matrix === undefined) {
        throw new Error("invaild post : must be { matrix }");
      }
      const { matrix } = equalJson(req.body);
      const request = await bill.matrixToRequest(matrix);
      res.send(JSON.stringify(request));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_invoiceRequest): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_invoiceCreate = function () {
  const instance = this;
  const bill = this.bill;
  const address = this.address;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/invoiceCreate";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.buiid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post : must be { buiid, proid }");
      }
      const { buiid, proid } = equalJson(req.body);
      const matrix = (await requestSystem("https://" + address.officeinfo.ghost.host + "/publicSector/estimation/sample", { data: null })).data;
      const request = await bill.matrixToRequest(matrix);
      const invoice = await bill.requestInvoice(buiid, proid, request, { selfMongo: instance.mongolocal, selfCoreMongo: instance.mongo });
      res.send(JSON.stringify(invoice));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_invoiceCreate): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_taxBill = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/taxBill";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      bill.taxBill().catch((err) => {
        logger.error("Python 서버 문제 생김 (rou_post_taxBill): " + err.message).catch((e) => { console.log(e); });
      })
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_taxBill): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_weeklyCalculation = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/weeklyCalculation";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.designerCalculation().then(() => {
        return logger.cron("weeklyCalculation success");
      }).catch((e) => {
        logger.error("Python 서버 문제 생김 (rou_post_weeklyCalculation): " + e.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_weeklyCalculation): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_nonPaidResponses = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/nonPaidResponses";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const result = await work.designerCalculation(false);
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_nonPaidResponses): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_excuteResponse = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = "/excuteResponse";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, date } = equalJson(req.body);
      let thisBill;
      let oid;
      let method;
      let proid;
      let thisProject;
      let thisResponse;
      let pay, name, target;
      let whereQuery, updateQuery;
      let projectWhereQuery, projectUpdateQuery;
      let amount;
      let type;
      let thisClient, thisDesigner;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      oid = "";
      method = "계좌 이체";
      proid = thisBill.links.proid;
      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      thisResponse = thisBill.responses[responseIndex];
      ({ pay, name, target } = thisResponse);

      amount = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));

      whereQuery = { bilid };
      updateQuery = {};

      if (pay.length === 0) {
        updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
        updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
      } else if (pay.length === 1) {
        updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".amount"] = amount;
        updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".date"] = date;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".date"] = date;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".method"] = method;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".proof"] = thisProject.process.calculation.info.proof;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".to"] = thisProject.process.calculation.info.to;
      } else {
        updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
        updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
      }

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        if (/홈리에종 선금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.first.date"] = date;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(thisProject.process.calculation.payments.totalAmount - amount);
          type = "first";
        } else if (/홈리에종 잔금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.remain.date"] = date;
          type = "remain";
        }

        await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        thisClient = await back.getClientById(thisProject.cliid, { selfMongo: instance.mongo });
        thisDesigner = await back.getDesignerById(thisResponse.target.id, { selfMongo: instance.mongo });

        if (type === "first") {
          await kakao.sendTalk("paymentFirstDesigner", thisDesigner.designer, thisDesigner.information.phone, {
            designer: thisDesigner.designer,
            client: thisClient.name,
            host: address.frontinfo.host,
            proid: thisProject.proid,
          });
          await messageSend({ text: thisDesigner.designer + " 실장님께 선금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
        } else {
          await kakao.sendTalk("paymentRemainDesigner", thisDesigner.designer, thisDesigner.information.phone, {
            designer: thisDesigner.designer,
            client: thisClient.name,
            host: address.frontinfo.host,
            proid: thisProject.proid,
          });
          await messageSend({ text: thisDesigner.designer + " 실장님께 잔금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
        }

      }

      res.send(JSON.stringify({
        message: "success",
        bilid,
        proid,
        bill: thisBill.toNormal(),
        project: thisProject.toNormal(),
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_excuteResponse): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_excuteRepay = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/excuteRepay";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined || req.body.amount === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, date, amount } = equalJson(req.body);
      let thisBill;
      let oid;
      let method;
      let proid;
      let thisProject;
      let thisResponse;
      let cancel, name, target, proofs;
      let whereQuery, updateQuery;
      let projectWhereQuery, projectUpdateQuery;
      let cancelArr, proofsArr;
      let proof, to;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      amount = Number(amount);
      if (Number.isNaN(amount)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      oid = "";
      method = "계좌 이체 취소";
      proof = "현금 영수증";
      to = "주식회사 홈리에종";

      proid = thisBill.links.proid;
      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      thisResponse = thisBill.responses[responseIndex];
      ({ cancel, proofs, name, target } = thisResponse);

      cancelArr = equalJson(JSON.stringify(cancel));
      proofsArr = equalJson(JSON.stringify(proofs));

      whereQuery = { bilid };
      updateQuery = {};

      cancelArr.unshift({ date, amount, oid });
      proofsArr.unshift({ date, method, proof, to });

      updateQuery["responses." + String(responseIndex) + ".cancel"] = cancelArr;
      updateQuery["responses." + String(responseIndex) + ".proofs"] = proofsArr;

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        if (/홈리에종 선금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.first.refund"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.first.cancel"] = date;
        } else if (/홈리에종 잔금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.remain.refund"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.remain.cancel"] = date;
        }

        await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      }

      res.send(JSON.stringify({
        message: "success",
        bilid,
        proid,
        bill: thisBill.toNormal(),
        project: thisProject.toNormal(),
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_excuteRepay): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_passiveResponse = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/passiveResponse";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.amount === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, amount } = equalJson(req.body);
      let thisBill;
      let whereQuery;
      let updateQuery;
      let thisResponse;
      let thisItems;
      let thisItem;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      amount = Number(amount);
      if (Number.isNaN(amount)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      thisResponse = thisBill.responses[responseIndex];
      thisItems = thisResponse.items;
      thisItem = thisItems[0];

      whereQuery = { bilid };
      updateQuery = {};

      updateQuery["responses." + String(responseIndex) + ".items"] = [
        {
          id: thisItem.id,
          class: thisItem.class,
          name: thisItem.name,
          description: thisItem.description,
          info: thisItem.info,
          unit: {
            ea: thisItem.unit.ea,
            price: amount,
            number: 1,
          },
          amount: {
            pure: amount,
            commission: 0,
          }
        }
      ];

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({
        bilid: thisBill.bilid,
        proid: thisBill.links.proid,
        bill: thisBill.toNormal()
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_passiveResponse): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_stylingFormSync = function () {
  const instance = this;
  const { requestSystem, equalJson, stringToDate, messageLog, messageSend } = this.mother;
  const address = this.address;
  const { officeinfo: { widsign: { id, key, endPoint } } } = address;
  const collections = [ "stylingForm", "constructForm", "partnershipForm", "designerForm" ];
  const back = this.back;
  const formSync = async (MONGOC, MONGOPYTHONC) => {
    try {
      const selfMongo = MONGOPYTHONC;
      let widsignResponse, token;
      let num;
      let forms, resultForms, finalForms;
      let pageSize;
      let monthAgoValue;
      let boo;
      let whereQuery, updateQuery;
      let dbForms;
      let target;
      let formDetail;
      let thisClient;
      let thisProject, thisDesigner;
      let text;

      for (let collection of collections) {
        monthAgoValue = new Date();
        monthAgoValue.setMonth(monthAgoValue.getMonth() - 3);
        monthAgoValue = monthAgoValue.valueOf();

        pageSize = 30;
        widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignResponse.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignResponse.data.access_token;
          resultForms = [];
          forms = [ null ];
          num = 1;
          while (forms.length > 0) {
            widsignResponse = await requestSystem(endPoint + "/v2/doc", { page: num, page_size: pageSize }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            forms = equalJson(JSON.stringify(widsignResponse.data.result)).map((obj) => {
              let newObj;
              newObj = {};
              newObj.form = obj.form_id;
              newObj.id = (obj.receiver_list.length > 0) ? obj.receiver_list[0] : null;
              newObj.name = obj.title;
              newObj.date = stringToDate(obj.created_date);
              newObj.confirm = (obj.status === 'END');
              return newObj;
            });
            if (forms.length > 0) {
              forms.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
              if (forms[0].date.valueOf() <= monthAgoValue) {
                break;
              }
              resultForms = resultForms.concat(forms);
            }
            num++;
          }

          resultForms.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

          finalForms = [];
          for (let f of resultForms) {
            boo = (finalForms.find((obj) => { return obj.name === f.name; }) !== undefined);
            if (!boo) {
              finalForms.push(f);
            }
          }

          widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
          if (widsignResponse.data.result_code !== 200) {
            throw new Error("access token error");
          }
          token = widsignResponse.data.access_token;

          if (/styling/gi.test(collection) || /construct/gi.test(collection)) {
            whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
            dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
            for (let f of dbForms) {
              whereQuery = { proid: f.proid };
              updateQuery = {};
  
              target = null;
              for (let i of finalForms) {
                if (i.name === f.name) {
                  target = i;
                }
              }
  
              if (target !== null) {
                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                if (typeof widsignResponse.data === "object") {
                  if (widsignResponse.data.result !== undefined) {
                    if (widsignResponse.data.result.receiver_list.length > 0) {
                      updateQuery["id"] = target.id;
                      updateQuery["date"] = target.date;
                      updateQuery["confirm"] = target.confirm;
                      updateQuery["form"] = target.form;
                      updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                      widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                      if (typeof widsignResponse.data === "object") {
                        if (Array.isArray(widsignResponse.data.result)) {
                          updateQuery["history"] = widsignResponse.data.result.map((obj) => {
                            obj.date = stringToDate(obj.created_date);
                            delete obj.created_date;
                            return obj;
                          });
                          if (f.confirm !== true && target.confirm === true) {
  
                            thisProject = await back.getProjectById(f.proid, { selfMongo: MONGOC });
                            thisClient = await back.getClientById(f.client.cliid, { selfMongo: MONGOC });
                            thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: MONGOC });
  
                            text = thisClient.name + " 고객님이 계약서에 서명을 완료하셨습니다!";
                            await messageSend({ text, channel: "#400_customer", voice: true });
  
                          }
                          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
  
                          if (/styling/gi.test(collection)) {
                            await back.updateProject([ { proid: f.proid }, { "process.contract.form.id": target.id } ], { selfMongo: MONGOC });
                          } else if (/construct/gi.test(collection)) {
                            await back.updateProject([ { proid: f.proid }, { "process.design.construct.contract.form.id": target.id } ], { selfMongo: MONGOC });
                          }
  
                        }
                      }
                    }
                  }
                }
              }
  
            }
          } else {

            whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
            dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
            for (let f of dbForms) {
              whereQuery = { aspid: f.aspid };
              updateQuery = {};
  
              target = null;
              for (let i of finalForms) {
                if (i.name === f.name) {
                  target = i;
                }
              }
  
              if (target !== null) {
                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                if (typeof widsignResponse.data === "object") {
                  if (widsignResponse.data.result !== undefined) {
                    if (widsignResponse.data.result.receiver_list.length > 0) {
                      updateQuery["id"] = target.id;
                      updateQuery["date"] = target.date;
                      updateQuery["confirm"] = target.confirm;
                      updateQuery["form"] = target.form;
                      updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                      widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                      if (typeof widsignResponse.data === "object") {
                        if (Array.isArray(widsignResponse.data.result)) {
                          updateQuery["history"] = widsignResponse.data.result.map((obj) => {
                            obj.date = stringToDate(obj.created_date);
                            delete obj.created_date;
                            return obj;
                          });
                          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                          if (f.confirm !== true && target.confirm === true) {
                            thisDesigner = await back.getAspirantById(f.aspid, { selfMongo: MONGOC });
                            text = thisDesigner.designer + " 디자이너님이 계약서에 서명을 완료하셨습니다!";
                            await messageSend({ text, channel: "#301_apply", voice: true });
                            if (/partnership/gi.test(collection)) {
                              await back.updateAspirant([ { aspid: f.aspid }, { "contract.partnership.id": target.id, "contract.partnership.date": new Date() } ], { selfMongo: MONGOC });
                            } else if (/designer/gi.test(collection)) {
                              await back.updateAspirant([ { aspid: f.aspid }, { "contract.designer.id": target.id, "contract.designer.date": new Date() } ], { selfMongo: MONGOC });
                            }
                            await back.updateAspirant([ { aspid: f.aspid }, { "meeting.status": "계약 완료" } ], { selfMongo: MONGOC });
                          }
                        }
                      }
                    }
                  }
                }
              }
  
            }

          }

        }

      }
    
      return true;

    } catch (e) {
      return false;
    }
  }
  let obj = {};
  obj.link = "/stylingFormSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      formSync(instance.mongo, instance.mongolocal).then((boo) => {
        if (boo) {
          logger.cron("styling form sync success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        } else {
          logger.error("styling form sync fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }
        return requestSystem("https://" + address.pythoninfo.host + ":3000/stylingFormFile", { data: null }, { headers: { "Content-Type": "application/json" } });;
      }).catch((err) => {
        logger.error("Python 서버 문제 생김 (rou_post_stylingFormSync): " + err.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingFormSync): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_stylingFormFile = function () {
  const instance = this;
  const { requestSystem, binaryRequest, fileSystem, shellExec, sleep, generalFileUpload, equalJson, stringToDate, messageLog, messageSend } = this.mother;
  const address = this.address;
  const { officeinfo: { widsign: { id, key, endPoint } } } = address;
  const back = this.back;
  let obj = {};
  obj.link = "/stylingFormFile";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const splitToken = "__split__";
      const collection = "stylingForm";
      let widsignResponse;
      let token;
      let rows;
      let fileName;
      let transRes;
      let subtract;
      let fileList;
      let downloadTargets;
      let fromArr, toArr;

      rows = await back.mongoRead(collection, {}, { selfMongo });
      rows = rows.filter((obj) => { return obj.confirm });
  
      transRes = await requestSystem("https://" + address.transinfo.host + ":3000/contractList", { data: null }, { headers: { "Content-Type": "application/json" } });

      fileList = transRes.data.map((obj) => { return obj.proid });
      subtract = rows.map((obj) => { return obj.proid }).filter((proid) => {
        return !fileList.includes(proid);
      });
      downloadTargets = rows.filter((obj) => {
        return subtract.includes(obj.proid);
      });
  
      for (let { id: formId, proid, client: { cliid, requestNumber } } of downloadTargets) {
        widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
        if (widsignResponse.data.result_code !== 200) {
          throw new Error("access token error");
        }
        token = widsignResponse.data.access_token;
        fileName = `${proid}${splitToken}${cliid}${splitToken}${requestNumber}${splitToken}${formId}.zip`;
        widsignResponse = await binaryRequest(endPoint + "/v2/doc/download?receiver_meta_id=" + formId, null, { "x-api-key": key, "x-access-token": token });
        await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${fileName}`, widsignResponse ]);
  
        fromArr = [ `${process.cwd()}/temp/${fileName}` ];
        toArr = [ "/photo/contract/" + fileName ];
        await generalFileUpload("https://" + address.transinfo.host + ":3000/generalFileUpload", fromArr, toArr);
  
        await sleep(300);
        await shellExec("rm", [ "-rf", `${process.cwd()}/temp/${fileName}` ]);
  
      }

      logger.cron("styling form file success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingFormFile): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error " + e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_responseInjection = function () {
  const instance = this;
  const bill = this.bill;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/responseInjection";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, amount, name } = equalJson(req.body);
      let thisBill;
      let cliid, desid, proid, method;
      let client, designer, project;

      thisBill = await bill.getBillById(bilid, { selfMongo });
      if (thisBill === null) {
        throw new Error("invaild bilid");
      }
      ({ cliid, desid, proid, method } = thisBill.links);
      client = await back.getClientById(cliid, { selfMongo: instance.mongo });
      designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
  
      await bill.responseInjection(bilid, "generalConstructFee", client, designer, project, method, {
        customAmount: { amount: Number(amount) },
        consumerMode: false,
        customSub: { name },
        selfMongo
      });

      thisBill = await bill.getBillById(bilid, { selfMongo });

      res.send(JSON.stringify({ bill: thisBill }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_responseInjection): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_calculationConsole = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/calculationConsole";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const { mode } = req.body;
      const agoDateNumber = 28;
      let projects, clients, designers, bills;
      let ago;
      let preClients;

      if (mode === "init") {
        ago = new Date();
        ago.setDate(ago.getDate() - agoDateNumber);
        projects = await back.getProjectsByQuery({
          "process.contract.first.date": { $gte: ago }
        }, { selfMongo: selfCoreMongo });
      } else if (mode === "search") {
        const { value } = req.body;
        preClients = await back.getClientsByQuery({ name: { $regex: value.replace(/[\\]/g, '') } }, { selfMongo: selfCoreMongo });
        if (preClients.length === 0) {
          projects = [];
        } else {
          projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
          projects = projects.filter((project) => {
            return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
          });
        }
      } else {
        projects = await back.getProjectsByQuery({
          "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
        }, { selfMongo: selfCoreMongo });
      }

      projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
        designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });
  
        bills = await back.mongoRead("generalBill", {
          $or: projects.toNormal().map((project) => { return { "links.proid": project.proid } })
        }, { selfMongo });
  
        res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), bills }));

      } else {

        res.send(JSON.stringify({ projects: [], clients: [], designers: [], bills: [] }));

      }

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_calculationConsole): " + e.message).catch((e) => { console.log(e); });
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
