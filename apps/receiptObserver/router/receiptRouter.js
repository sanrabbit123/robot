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
  let obj = {};
  obj.link = "/ssl";
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_get_Ssl): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_get_Disk = function () {
  const instance = this;
  const { diskReading } = this.mother;
  let obj = {};
  obj.link = "/disk";
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_get_Disk): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
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
  const { equalJson, messageLog } = this.mother;
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
        await messageLog("cashout receive");
        for (let arr of cashOut_raw) {
          for (let obj of arr) {
            rows.push(obj);
          }
        }
      } else if (json.cashIn !== undefined) {
        await messageLog("cashin receive");
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
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createStylingContract";
  obj.func = async function (req, res) {
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
        const title = "홈스타일링계약서_000고객님_주홈리에종_YYMMDD";
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
          formTitle = "홈스타일링계약서_" + titleName + "고객님_주홈리에종_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
          map = [
            { id: "5faa618f9da73962a9050ef4", value: titleName === '' ? '-' : titleName },
            { id: "5faa6196b3c0673961000001", value: titleAddress === '' ? '-' : titleAddress },
            { id: "5faa618f9da73962a9050ef6", value: client.phone === '' ? '-' : client.phone },
            { id: "5faa618f9da73962a9050ef7", value: dateToString(project.process.contract.first.date) === '' ? '-' : dateToString(project.process.contract.first.date) },
            { id: "5faa618f9da73962a9050ef9", value: dateToString(project.process.contract.form.date.from) === '' ? '-' : dateToString(project.process.contract.form.date.from) },
            { id: "5faa618f9da73962a9050efa", value: dateToString(project.process.contract.form.date.to) === '' ? '-' : dateToString(project.process.contract.form.date.to) },
            { id: "5faa618f9da73962a9050ef5", value: titleName === '' ? '-' : titleName },
            { id: "5faa618f9da73962a9050ef8", value: request.family === '' ? "알 수 없음" : request.family },
            { id: "5faa618f9da73962a9050f04", value: titleAddress === '' ? '-' : titleAddress },
            { id: "5faa618f9da73962a9050f01", value: request.budget + " (디자이너 논의 및 조정)" },
            { id: "5faa618f9da73962a9050f02", value: designer.designer + ", " + designer.information.phone },
            { id: "5faa618f9da73962a9050efb", value: request.space.contract === '' ? '-' : request.space.contract },
            { id: "5faa618f9da73962a9050efd", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
            { id: "5faa618f9da73962a9050efe", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
            { id: "5faa618f9da73962a9050efc", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
            { id: "5faa618f9da73962a9050eff", value: String(request.space.pyeong) + "평" },
            { id: "5faa618f9da73962a9050f00", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "5faa618f9da73962a9050f03", value: serviceParsing(project.service) === '' ? '-' : serviceParsing(project.service) },
            { id: "5faa618f9da73962a9050f05", value: autoComma(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount) },
            { id: "5faa618f9da73962a9050f06", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) },
            { id: "5faa618f9da73962a9050f16", value: titleName === '' ? '-' : titleName },
            { id: "5faa618f9da73962a9050f1a", value: client.phone === '' ? '-' : client.phone },
            { id: "5faa61beb3c0673961000002", value: titleAddress === '' ? '-' : titleAddress },
            { id: "5faa618f9da73962a9050f19", value: titleName === '' ? '-' : titleName },
          ];

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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_createStylingContract): " + e.message).catch((e) => { console.log(e); });
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
  const { requestSystem, messageSend, messageLog, errorLog, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createConstructContract";
  obj.func = async function (req, res) {
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
        const title = "2022시공계약서_000고객님_주홈리에종_YYMMDD";
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
                  { id: "62eb773ba946c12c4847f936", value: titleName === '' ? '-' : titleName },
                  { id: "62eb773ba946c12c4847f937", value: summary.name === '' ? '-' : summary.name },
                  { id: "62eb773ba946c12c4847f938", value: summary.address === '' ? '-' : summary.address },
                  { id: "62eb773ba946c12c4847f939", value: summary.date.start === '' ? '-' : summary.date.start },
                  { id: "62eb773ba946c12c4847f93a", value: summary.date.end === '' ? '-' : summary.date.end },
                  { id: "62eb773ba946c12c4847f93b", value: summary.hangul === '' ? '-' : summary.hangul },
                  { id: "62eb773ba946c12c4847f93c", value: autoComma(summary.total) === '' ? '-' : autoComma(summary.total) },
                  { id: "62eb773ba946c12c4847f93d", value: String(summary.first.percentage) + '%' },
                  { id: "62eb773ba946c12c4847f941", value: autoComma(summary.first.amount) === '' ? '-' : autoComma(summary.first.amount) },
                  { id: "62eb773ba946c12c4847f945", value: summary.first.date === '' ? '-' : summary.first.date },
                  { id: "62eb773ba946c12c4847f949", value: summary.first.etc === '' ? '-' : summary.first.etc },
                  { id: "62eb773ba946c12c4847f93e", value: String(summary.start.percentage) + '%' },
                  { id: "62eb773ba946c12c4847f942", value: autoComma(summary.start.amount) === '' ? '-' : autoComma(summary.start.amount) },
                  { id: "62eb773ba946c12c4847f946", value: summary.start.date === '' ? '-' : summary.start.date },
                  { id: "62eb773ba946c12c4847f94a", value: summary.start.etc === '' ? '-' : summary.start.etc },
                  { id: "62eb773ba946c12c4847f93f", value: String(summary.middle.percentage) + '%' },
                  { id: "62eb773ba946c12c4847f943", value: autoComma(summary.middle.amount) === '' ? '-' : autoComma(summary.middle.amount) },
                  { id: "62eb773ba946c12c4847f947", value: summary.middle.date === '' ? '-' : summary.middle.date },
                  { id: "62eb773ba946c12c4847f94b", value: summary.middle.etc === '' ? '-' : summary.middle.etc },
                  { id: "62eb773ba946c12c4847f940", value: String(summary.remain.percentage) + '%' },
                  { id: "62eb773ba946c12c4847f944", value: autoComma(summary.remain.amount) === '' ? '-' : autoComma(summary.remain.amount) },
                  { id: "62eb773ba946c12c4847f948", value: summary.remain.date === '' ? '-' : summary.remain.date },
                  { id: "62eb773ba946c12c4847f94c", value: summary.remain.etc === '' ? '-' : summary.remain.etc },
                  { id: "62eb773ba946c12c4847f94e", value: titleName === '' ? '-' : titleName },
                  { id: "62eb773ba946c12c4847f950", value: contractPhone === '' ? '-' : contractPhone },
                  { id: "62eb773ba946c12c4847f951", value: contractAddress === '' ? '-' : contractAddress },
                  { id: "62eb773ba946c12c4847f953", value: client.phone === '' ? '-' : client.phone },
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
      errorLog("Python 서버 문제 생김 (rou_post_createConstructContract): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, fileSystem, dateToString, autoComma, ghostRequest, messageSend, errorLog, requestSystem } = this.mother;
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_receiveConstructContract): " + e.message).catch((e) => { console.log(e); });
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
      errorLog("Python 서버 문제 생김 (rou_post_constructAmountSync): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, messageSend, messageLog, errorLog } = this.mother;
  let obj = {};
  obj.link = "/stylingAmountSync";
  obj.func = async function (req, res) {
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
      errorLog("Python 서버 문제 생김 (rou_post_stylingAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_smsParsing = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, errorLog, autoComma, requestSystem, sleep } = this.mother;
  const collection = "accountTransfer";
  const standardDay = 7;
  let obj = {};
  obj.link = "/smsParsing";
  obj.func = async function (req, res) {
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

        messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });

        if (target !== null) {

          await sleep(500);

          const { phone, amount } = target;
          requestSystem("https://" + instance.address.pythoninfo.host + ":3000/webHookVAccount", target.accountInfo, {
            headers: { "Content-Type": "application/json" }
          }).then(() => {
            errorLog("현금 영수증 관련 핸드폰 번호 감지 => " + phone).catch((e) => { console.log(e); });
            if (/^010/.test(phone)) {
              return requestSystem(`https://${instance.address.secondinfo.host}/receiptSend`, {
                amount: String(amount),
                phone,
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              return emptyPromise();
            }
          }).then((promiseData) => {
            if (/^010/.test(phone)) {
              return messageSend(`${name} 고객님의 현금 영수증을 발행하였습니다!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
            } else {
              return messageSend(`${name} 고객님의 세금계산서를 발행해주세요!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
            }
          }).catch((err) => {
            console.log(err);
          });

        } else {
          errorLog(errorMessage).catch((e) => { console.log(e); });
        }

      } else {
        errorLog(ignoreMessage).catch((e) => { console.log(e); });
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

ReceiptRouter.prototype.rou_post_accountTimeUpdate = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, errorLog, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeUpdate";
  obj.func = async function (req, res) {
    try {
      const selfMongo = instance.mongolocal;
      const { whereQuery, updateQuery, name, phone } = equalJson(req.body);

      if (/^010/.test(phone)) {
        errorLog(`현금영수증 번호 업데이트 감지 => \n${JSON.stringify(whereQuery, null, 2)}\n${JSON.stringify(updateQuery, null, 2)}`).catch((err) => { throw new Error(err.message); });
      } else {
        await messageSend({ text: `${name} 고객님이 ${phone} 번호로 세금 계산서 신청을 하셨습니다!`, channel: "#400_customer", voice: true });
      }
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_generalBill): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
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
    let discount;

    if (/홈리에종 계약금/gi.test(data.goodName.trim()) || /홈리에종 잔금/gi.test(data.goodName.trim())) {
      projectQuery = {};
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
          errorLog({ text: "Python 서버 문제 생김 (sync_paymentProject, history 연산중 콘솔에서 문제 생김) : " + err.message, channel: "#error_log" }).catch((e) => { console.log(e); })
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
          await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });

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
      await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });

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

ReceiptRouter.prototype.rou_post_travelUpDown = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelUpDown";
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_travelUpDown): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_amountConverting): " + e.message).catch((e) => { console.log(e); });
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
  const { equalJson, sleep, requestSystem, messageSend, messageLog, errorLog } = this.mother;
  let obj = {};
  obj.link = "/requestRefund";
  obj.func = async function (req, res) {
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
      if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial" ]).includes(kind)) {
        throw new Error("invaild post, kind must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial ]");
      }
      if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
        throw new Error("invaild post 1");
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
        percentage: (!Number.isNaN(Number(req.body.percentage)) ? Number(req.body.percentage) : 100),
        amount: report.price.refund
      }).then(() => {
        return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify(report));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_requestRefund): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_contractCancel): " + e.message).catch((e) => { console.log(e); });
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
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      res.send(JSON.stringify(bankCode));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_returnBankCode): " + e.message).catch((e) => { console.log(e); });
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_designerCalculation): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_returnDummy): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_invoiceRead): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_invoiceRequest): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
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
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_invoiceCreate): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_taxBill = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/taxBill";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      bill.taxBill().then(() => {
        console.log("taxBill success");
      }).catch((e) => {
        throw new Error(e);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_taxBill): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
    try {
      work.designerCalculation().then(() => {
        console.log("weeklyCalculation success");
      }).catch((e) => {
        throw new Error(e);
      });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Python 서버 문제 생김 (rou_post_weeklyCalculation): " + e.message).catch((e) => { console.log(e); });
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
