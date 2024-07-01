//GENERAL METHODS ---------------------------------------------------------------------------------

DataRouter.prototype.baseMaker = function (target, mode = "first", req = null) {
  const instance = this;
  const ADDRESS = this.address;
  const DataPatch = this.patchClass;
  const DataMiddle = this.middle;
  let html;

  if (mode === "first") {

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
        <title>HomeLiaison Console: ${target}</title>
        <style></style>
      </head>
      <body>
        <div id="totalcontents"></div>
        <script src="/${target}.js"></script>
      </body>
    </html>`;

    return new Promise(function(resolve, reject) {
      resolve(html);
    });


  } else if (mode === "middle") {

    return new Promise(function(resolve, reject) {
      if (DataMiddle !== null) {
        DataMiddle.baseHtml(target, req, instance.mongo, instance.mongolocal).then(function (html) {
          resolve(html);
        }).catch(function (e) {
          reject(e);
        });
      } else {
        resolve(`<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`);
      }
    });

  }
}

DataRouter.prototype.getDateMatrix = async function (length = 6) {
  const instance = this;
  try {
    const today = new Date();
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrix" ], { length });

    let year, month;
    let day0, day1, day2;
    let dateString0, dateString1;
    let resultArr, middleResultArr, resultFactorArr;

    resultArr = [];
    for (let j = 0; j < dateMatrix.length; j++) {

      year = today.getFullYear();
      month = today.getMonth() + 1 - j;

      year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
      month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);

      middleResultArr = [];
      for (let i = 0; i < dateMatrix[j].length; i++) {
        resultFactorArr = [];

        day0 = dateMatrix[j][i][0];
        resultFactorArr.push(new Date(year, month - 1, day0));

        day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];
        resultFactorArr.push(new Date(year, month - 1, day1));

        if (i !== dateMatrix[j].length - 1) {
          day2 = dateMatrix[j][i + 1][0];
          resultFactorArr.push(new Date(year, month - 1, day2));
        } else {
          day2 = 1;
          if (month === 12) {
            resultFactorArr.push(new Date(year + 1, 0, day2));
          } else {
            resultFactorArr.push(new Date(year, month, day2));
          }
        }
        middleResultArr.push(resultFactorArr);
      }
      resultArr.push(middleResultArr);
    }

    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.getCalendar = async function (length = 12) {
  const instance = this;
  try {
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrixFullSet" ], { length });
    return dateMatrix;
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.parsingAddress = async function (id, rawString, MONGOC, logger) {
  if (typeof id !== "string" || typeof rawString !== "string" || MONGOC === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const app = new AddressParser();
  const back = this.back;
  const { messageSend, messageLog } = this.mother;
  try {
    let arr;

    //client
    if (/^c/gi.test(id)) {
      arr = await app.addressInspection([ { id, address: rawString } ]);
      if (arr.length === 0) {
        return { result: true, id };
      } else {
        const res = await app.getAddress(rawString);
        if (res === null) {
          return { result: false, id };
        } else {
          const { address: { road } } = res;
          await back.updateClient([ { cliid: id }, { "requests.0.request.space.address": (road + " " + rawString) } ], { selfMongo: MONGOC });
          return { result: true, id };
        }
      }
    }
  } catch (e) {
    await logger.error("주소 연산 중 오류 생김 (parsingAddress): " + e.message);
    console.log(e);
  }
}

//GET ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res, logger) {
    try {
      res.redirect("/client");
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  let ipTong;
  ipTong = [ 1, 127001, 19216801, 192168090, 172301254, 5822475162, 122918116, 112184236121, 2112459242, 219250244131, 12291816, 11638190154, 118235266, 599136192, 12611323030, 2233316480, 114202212178, 143219271, 210178154164, 1209167202, 12453101162, 22212024117, 12191922, 223622240, 1209167202, 59929145, 1121696161 ];
  for (let info in instance.address) {
    if (instance.address[info].ip.outer.length > 0) {
      ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
    }
    if (instance.address[info].ip.inner.length > 0) {
      ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
    }
  }
  ipTong = Array.from(new Set(ipTong));
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    try {
      let ip, pass;
      let target;
      let aliveMongoResult;

      ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      if (typeof ip !== "string") {
        pass = false;
        ip = '';
      } else {
        if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
          pass = true;
        } else {
          pass = false;
        }
      }

      if (!pass) {
        if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
          pass = true;
        } else {
          pass = false;
        }
      }

      if (req.params.id === "ssl") {

        aliveMongoResult = false;
        aliveMongo().then((boo) => {
          aliveMongoResult = boo;
          return diskReading();
        }).then((disk) => {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
        }).catch((err) => {
          throw new Error(err);
        });

      } else if (req.params.id === "disk") {

        diskReading().then((disk) => {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ disk: disk.toArray() }));
        }).catch((err) => {
          throw new Error(err);
        });

      } else {

        if (!pass) {

          res.set("Content-Type", "text/html");
          res.send(`<html><head><title>알 수 없는 ip</title></head><body><script>
            alert("알 수 없는 아이피 주소 입니다. 관리자에게 문의해주세요!\\n접근 아이피 주소 : ${ip.trim()}");
            window.location.href = "https://home-liaison.com";</script></body></html>`);

        } else {

          if (/^cl/i.test(req.params.id)) {
            target = "client";
          } else if (/^bu/i.test(req.params.id)) {
            target = "builder";
          } else if (/^de/i.test(req.params.id)) {
            target = "designer";
          } else if (/^dash/i.test(req.params.id)) {
            target = "dashboard";
          } else if (/^proj/i.test(req.params.id)) {
            target = "project";
          } else if (/^prop/i.test(req.params.id)) {
            target = "proposal";
          } else if (/^proc/i.test(req.params.id)) {
            target = "process";
          } else if (/^con/i.test(req.params.id)) {
            target = "contents";
          } else if (/^fil/i.test(req.params.id)) {
            target = "file";
          } else if (/^mes/i.test(req.params.id)) {
            target = "message";
          } else if (/^use/i.test(req.params.id)) {
            target = "user";
          } else if (/^mpr/i.test(req.params.id)) {
            target = "mpr";
          } else if (/^ana/i.test(req.params.id)) {
            target = "analytics";
          } else if (/^ca/i.test(req.params.id)) {
            target = "calculation";
          } else if (/^sa/i.test(req.params.id)) {
            target = "sales";
          } else if (/^flo/i.test(req.params.id)) {
            target = "flow";
          } else if (/^numb/i.test(req.params.id)) {
            target = "numbers";
          } else if (/^emai/i.test(req.params.id)) {
            target = "email";
          } else {
            target = "client";
          }

          instance.baseMaker(target, "first", null).then(function (html) {
            res.set("Content-Type", "text/html");
            res.send(html);
          }).catch(function (err) {
            throw new Error(err);
          });

        }

      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.set({ "Content-Type": "text/plain" });
      res.send("error");
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Middle = function () {
  const instance = this;
  let obj = {};
  obj.link = "/middle/:id";
  obj.func = async function (req, res, logger) {
    try {
      instance.baseMaker(req.params.id, "middle", req).then(function (html) {
        res.set("Content-Type", "text/html");
        res.send(html);
      }).catch(function (err) {
        throw new Error(err);
      });
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Middle): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Address = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/address";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
        new daum.Postcode({
            oncomplete: function (data) {
              let addr = '', extraAddr = '';
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
              } else { addr = data.jibunAddress; }
              const detail = prompt("상세주소를 입력해주세요! : " + addr + extraAddr);
              window.parent.postMessage(addr + extraAddr + " " + detail, '*');
            }, width : '100%', height : '100%' }).embed(div_clone);</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Address): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_AddressLite = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/addressLite";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
        new daum.Postcode({
            oncomplete: function (data) {
              let addr = '', extraAddr = '';
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
              } else { addr = data.jibunAddress; }
              window.parent.postMessage(addr + extraAddr, '*');
            }, width : '100%', height : '100%' }).embed(div_clone);</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Address): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Trigger = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/trigger";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        window.parent.postMessage("안녕?", '*');</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Trigger): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_AllLogStore = function () {
  const instance = this;
  const { fileSystem, requestSystem, equalJson } = this.mother;
  const allLogToFile = async (logger) => {
    try {
      const allLogKeyword = logger.all;
      const logFolder = logger.folder;
      const allLogFileName = `${allLogKeyword}_${(new Date()).valueOf()}.json`;
      const allLogFile = `${logFolder}/${allLogFileName}`;
      let stringTemp;
      let logString, pastJsonArr;
      let pastPastArr;
      let pastLoggerFiles;
      let thisLoggerFiles;
      let allLoggerFiles;

      pastLoggerFiles = (await fileSystem("readDir", [ logFolder ])).filter((str) => { return str !== ".DS_Store" });

      thisLoggerFiles = pastLoggerFiles.filter((str) => { return (new RegExp("^" + logger.keyword, "gi")).test(str) });
      thisLoggerFiles.sort((a, b) => {
        return Number(b.split("_")[1].replace(/[^0-9]/gi, '')) - Number(a.split("_")[1].replace(/[^0-9]/gi, ''));
      })
      thisLoggerFiles = thisLoggerFiles.slice(0, logger.instances);

      allLoggerFiles = equalJson(JSON.stringify(pastLoggerFiles));
      pastLoggerFiles = pastLoggerFiles.filter((str) => { return !thisLoggerFiles.includes(str) });

      if (allLoggerFiles.length > 0) {
        logString = '';
        pastPastArr = [];
        for (let fileName of allLoggerFiles) {
          stringTemp = await fileSystem(`readString`, [ `${logFolder}/${fileName}` ]);
          if (/^\{/.test(stringTemp)) {
            logString += stringTemp;
            logString += "\n\n";
          } else if (/^\[/.test(stringTemp)) {
            pastPastArr = JSON.parse(stringTemp);
          }
        }

        pastJsonArr = logString.split("\n").map((str) => { return str.trim(); }).filter((str) => { return str !== "" }).filter((str) => {
          return (/^\{/.test(str) && /\}$/.test(str))
        }).filter((str) => {
          try {
            const obj = JSON.parse(str);
            return true;
          } catch {
            return false;
          }
        }).map((str) => {
          return equalJson(str);
        });

        pastJsonArr = pastPastArr.concat(pastJsonArr);
        pastJsonArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

        await fileSystem(`write`, [ allLogFile, JSON.stringify(pastJsonArr) ]);
        for (let fileName of pastLoggerFiles) {
          await fileSystem(`remove`, [ `${logFolder}/${fileName}` ]);
        }
      }

      return allLogFileName;
    } catch (e) {
      await logger.error("past log to file error : " + e.message);
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = "/log/allLogStore";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      allLogToFile(logger).then((file) => {
        if (typeof file === "string") {
          logger.cron("back console all log store success").catch((err) => { console.log(err); });
        } else {
          throw new Error("back console all log store fail");
        }
      }).catch((err) => {
        logger.error("Console 서버 문제 생김 (rou_get_AllLogStore): " + err.message).catch((err) => { console.log(err); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_AllLogStore): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Patch = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  let obj = {};
  obj.link = "/patch/:key";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let target, stream;
      if (typeof req.query.directory === "string") {
        target = instance.dir + "/router/source/patch/" + req.query.directory + "/" + req.params.key + ".js";
      } else {
        target = instance.dir + "/router/source/patch" + "/" + req.params.key + ".js";
      }
      if (await fileSystem("exist", [ target ])) {
        stream = await fileSystem("readStream", [ target ]);
        stream.pipe(res);
      } else {
        throw new Error("invaild key");
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Patch): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send("error : " + e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_ServerSent = function () {
  const instance = this;
  const back = this.back;
  const SseStream = require(`${this.module}/sseStream.js`);
  const { readFileSync } = require(`fs`);
  let obj = {};
  obj.link = [ "/sse/get_client", "/sse/get_designer", "/sse/get_project", "/sse/get_contents" ];
  obj.func = async function (req, res, logger) {
    try {
      const thisPath = req.url.split('_')[1];
      const sseStream = new SseStream(req);
      let log_past, log_new;

      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new = String(readFileSync(instance.dir + "/log/" + thisPath + "_latest.json"));
          if (log_new !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new });
          }
          log_past = log_new;
        } catch (e) {
          console.log(e);
        }
      }, 400);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_ServerSent): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_SpecificServerSent = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  const { readFileSync } = require(`fs`);
  const os = require(`os`);
  const cpuLength = os.cpus().length;
  let connectionNumber_raw = 0;
  let connectionNumber = 0;
  let totalOrder = 0;
  let obj = {};
  obj.link = [ "/specificsse/:id" ];
  obj.func = async function (req, res, logger) {
    try {
      const idConst = "sse";
      const sseConst = idConst + "_" + req.params.id;
      const sseFile = instance.dir + "/log/sse_" + req.params.id + "_latest.json"
      let sseObjs;
      let orderRaw, order;
      let trigger;

      res.set({
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": 'keep-alive',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      sseObjs = await back.mongoRead(sseConst, { id: idConst }, { selfMongo: instance.mongolocal });
      if (sseObjs.length === 0) {
        await back.mongoCreate(sseConst, { id: idConst, order: [] }, { selfMongo: instance.mongolocal });
      }

      if (!(await fileSystem(`exist`, [ sseFile ]))) {
        await fileSystem(`write`, [ sseFile, JSON.stringify([]) ]);
      }

      connectionNumber_raw = connectionNumber_raw + 1;
      connectionNumber = cpuLength * connectionNumber_raw;
      totalOrder = connectionNumber;

      const pusher = setInterval(async function () {
        try {
          if (totalOrder <= 0) {
            totalOrder = connectionNumber;
          }
          try {
            trigger = JSON.parse(String(readFileSync(sseFile)));
          } catch (e) {
            trigger = [];
          }
          if (trigger.length > 0) {
            orderRaw = await back.mongoRead(sseConst, { id: idConst }, { selfMongo: instance.mongolocal });
            order = orderRaw[0].order;
            for (let i = 0; i < order.length; i++) {
              if (/^[\{\[]/.test(order[i].trim()) && /[\}\]]$/.test(order[i].trim())) {
                order[i] = equalJson(order[i]);
              }
            }
            res.write(`event: updateTong\ndata: ${JSON.stringify(order)}\n\n`);
            totalOrder = totalOrder - 1;
            if (totalOrder <= 0) {
              await back.mongoUpdate(sseConst, [ { id: idConst }, { order: [] } ], { selfMongo: instance.mongolocal });
              await fileSystem(`write`, [ sseFile, JSON.stringify([]) ]);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }, 100);

      res.on('close', function () {
        clearInterval(pusher);
        res.end();
        connectionNumber_raw = connectionNumber_raw - 1;
        connectionNumber = cpuLength * connectionNumber_raw;
      });

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_SpecificServerSent): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}
