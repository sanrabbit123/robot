const DataRouter = function (DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, isGhost = false) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/dataConsole";
  this.module = this.dir + "/module";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.patchClass = DataPatch;
  this.patch = new DataPatch();
  this.middle = DataMiddle;
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.pythonApp = this.dir + "/python/app.py";
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.members = {};
  this.isGhost = isGhost;
  this.kakao = kakaoInstance;
}

//STATIC FUNCTIONS --------------------------------------------------------------------------

DataRouter.queryFilter = function (str) {
  str = str.replace(/[|\\\/\[\]\{\}\(\)\<\>!@#\$\%\^\&\*\=\+\?]/g, '');
  str = str.replace(/\n/g, '');
  str = str.replace(/\t/g, '');
  return str;
}

DataRouter.dateToString = function (obj) {
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  return `${String(obj.getFullYear())}-${zeroAddition(obj.getMonth() + 1)}-${zeroAddition(obj.getDate())}`;
}

DataRouter.autoComma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus;
  if (/\-/g.test(str)) { minus = /\-/g.exec(str)[0]; }
  else { minus = ''; }
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
}

DataRouter.stringFilter = function (str) {
  let filtered;
  filtered = str.replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '');
  filtered = filtered.replace(/^\n/, '');
  filtered = filtered.replace(/\n$/, '');
  filtered = filtered.replace(/\n\n/g, '\n');
  filtered = filtered.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z\)\(\.\,\?\!\/\'\"\;\:\@\#\$\%\&\*\-\_\+\=\n\t ]/g, '');
  filtered = filtered.replace(/^ /g, '');
  filtered = filtered.replace(/ $/g, '');
  filtered = filtered.replace(/  /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/      /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/  /g, ' ');
  return filtered;
}

DataRouter.notionArrRefine = function (arr) {
  let target;
  let targetTong;
  target = [];
  for (let obj of arr) {
    if (obj.title_plaintext !== undefined && obj.title_plaintext !== '') {
      targetTong = {};
      targetTong.title_plaintext = DataRouter.stringFilter(obj.title_plaintext);
      if (obj.children !== undefined) {
        targetTong.children = DataRouter.notionArrRefine(obj.children);
      }
      target.push(targetTong);
    }
  }
  return target;
}

DataRouter.objectToFlat = function (arr) {
  let totalString;
  let temp, tempArr;
  totalString = '';
  for (let obj of arr) {
    totalString += obj.title_plaintext;
    totalString += "__split__";
    if (obj.children !== undefined) {
      temp = DataRouter.objectToFlat(obj.children);
      tempArr = temp.split("__split__");
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = "- " + tempArr[i];
      }
      totalString += tempArr.join("__split__");
      totalString += "__split__";
    }
  }
  totalString = totalString.slice(0, -9);
  return totalString;
}

DataRouter.splitToSpace = function (str) {
  return str.replace(/__split__/g, '\n');
}


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
        <script src="${target}.js"></script>
      </body>
    </html>`;

    return new Promise(function(resolve, reject) {
      resolve(html);
    });


  } else if (mode === "middle") {

    return new Promise(function(resolve, reject) {
      if (DataMiddle !== null) {
        DataMiddle.baseHtml(target, req).then(function (html) {
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

//GET ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res) {
    try {
      res.redirect("/client");
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Binary = function () {
  const instance = this;
  const brandProjectConstant = "brandProject";
  let obj = {};
  obj.link = "/" + brandProjectConstant + "/:id";
  obj.func = async function (req, res) {
    try {
      let html, mainPdfName, sourceName;

      mainPdfName = "index";
      sourceName = `${instance.address.s3info.host}/${brandProjectConstant}/${req.params.id}/${mainPdfName}.pdf`;
      const { statusCode } = await instance.mother.headRequest(sourceName);

      if (statusCode === 200) {
        html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><title></title><style media="screen">*{margin:0;padding:0}</style></head><body><embed id="this" src="${sourceName}"/><script type="text/javascript">let e = document.getElementById("this");let ea = "px";e.setAttribute("width", (String(window.innerWidth) + ea));e.setAttribute("height", (String(window.innerHeight) + ea));window.addEventListener("resize", (e) => { window.location.reload(); })</script></body></html>`;
        res.set("Content-Type", "text/html");
        res.send(html);
      } else {
        res.redirect("/client");
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  let obj = {};
  let ipTong;
  ipTong = [ 127001, 172301254 ];
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
  obj.func = function (req, res) {
    try {
      let target;

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      // if (!ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
      //
      //   res.set("Content-Type", "text/html");
      //   res.send(`<html><head><title>알 수 없는 ip</title></head><body><script>
      //     alert("알 수 없는 아이피 주소 입니다. 관리자에게 문의해주세요!\\n접근 아이피 주소 : ${ip.trim()}");
      //     window.location.href = "https://home-liaison.com";</script></body></html>`);
      //
      // } else {

      if (instance.isGhost) {

        res.set("Content-Type", "text/html");
        res.send(`<html><head><title>Permission denied</title></head><body><script>
          alert("접근할 수 없는 경로입니다!");
          window.location.href = "https://home-liaison.com";</script></body></html>`);

      } else {

        if (/^cl/i.test(req.params.id)) {
          target = "client";
        } else if (/^de/i.test(req.params.id)) {
          target = "designer";
        } else if (/^ser/i.test(req.params.id)) {
          target = "service";
        } else if (/^proj/i.test(req.params.id)) {
          target = "project";
        } else if (/^prop/i.test(req.params.id)) {
          target = "proposal";
        } else if (/^ana/i.test(req.params.id)) {
          target = "analytics";
        } else if (/^con/i.test(req.params.id)) {
          target = "contents";
        } else if (/^pho/i.test(req.params.id)) {
          target = "photo";
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

      // }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Middle = function () {
  const instance = this;
  let obj = {};
  obj.link = "/middle/:id";
  obj.func = function (req, res) {
    try {
      instance.baseMaker(req.params.id, "middle", req).then(function (html) {
        res.set("Content-Type", "text/html");
        res.send(html);
      }).catch(function (err) {
        throw new Error(err);
      });
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Address = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/address";
  obj.func = function (req, res) {
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_ServerSent = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  let obj = {};
  obj.link = [ "/sse/get_client", "/sse/get_designer", "/sse/get_project", "/sse/get_contents", "/sse/get_photo" ];
  obj.func = async function (req, res) {
    try {
      const thisPath = req.url.split('_')[1];
      const sseStream = new SseStream(req);
      let log_past, log_new;

      res.set({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new = await fileSystem(`readString`, [ instance.dir + "/log/" + thisPath + "_latest.json" ]);
          if (log_new !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new });
          }
          log_past = log_new;
        } catch (e) {
          console.log(e);
        }
      }, 1000);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_SpecificServerSent = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  let obj = {};
  obj.link = [ "/specificsse/get_checklist/:id" ];
  obj.func = async function (req, res) {
    try {
      const thisPath = req.url.split('/')[2].split('_')[1];
      const thisId = req.params.id;
      const sseStream = new SseStream(req);
      const logDir = instance.dir + "/log";
      const sseConst = "sse_designerMatrix";
      let log_past, log_new_raw, log_new, log_new_string;
      let sseObjs;

      res.set({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      sseObjs = await back.mongoRead(sseConst, { desid: thisId }, { selfMongo: instance.mongolocal });
      if (sseObjs.length === 0) {
        await back.mongoCreate(sseConst, { desid: thisId, column: "null", type: "null", order: [] }, { selfMongo: instance.mongolocal });
      }

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new_raw = await back.mongoRead(sseConst, { desid: thisId }, { selfMongo: instance.mongolocal });
          log_new = { desid: log_new_raw[0].desid, column: log_new_raw[0].column, type: log_new_raw[0].type, order: log_new_raw[0].order };
          log_new_string = JSON.stringify(log_new);
          if (log_new_string !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new_string });
          }
          log_past = log_new_string;
        } catch (e) {
          console.log(e);
        }
      }, 1000);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}


//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getPhotos" ];
  obj.func = async function (req, res) {
    try {
      let standard, raw_data, data, optionQuery, whereQuery;

      if (req.url === "/getClients") {
        standard = instance.patch.clientStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestClients(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestClients("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getClientsByQuery(JSON.parse(req.body.where), optionQuery);
        }
      } else if (req.url === "/getDesigners") {
        standard = instance.patch.designerStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestDesigners(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestDesigners("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getDesignersByQuery(JSON.parse(req.body.where), optionQuery);
        }
      } else if (req.url === "/getProjects" || req.url === "/getPhotos") {
        standard = instance.patch.projectStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestProjects(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestProjects("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          whereQuery = JSON.parse(req.body.where);
          if (req.url === "/getPhotos") {
            whereQuery["$and"].push({ "process.calculation.payments.first.date": { "$gt": (new Date(2000, 0, 1)) } });
          }
          raw_data = await instance.back.getProjectsByQuery(whereQuery, optionQuery);
        }
      } else if (req.url === "/getContents") {
        standard = instance.patch.contentsStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestContentsArr(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestContentsArr("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getContentsArrByQuery(JSON.parse(req.body.where), optionQuery);
        }
      }

      if (req.body.noFlat === undefined) {
        if (req.url !== "/getPhotos") {
          data = raw_data.flatDeath();
        } else {
          standard = instance.patch.photoStandard();
          data = raw_data.planeDeath();
        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(raw_data.toNormal()));
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchDocuments = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners", "/searchContents", "/searchPhotos" ];
  obj.func = async function (req, res) {
    try {
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let whereQuery;
      let data;
      let rawJson;
      let filteredArr;

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
      } else if (req.url === "/searchContents") {
        standard = instance.patch.contentsStandard();
        map = instance.patch.contentsMap();
      } else if (req.url === "/searchPhotos") {
        standard = instance.patch.photoStandard();
        map = instance.patch.photoMap();
      }

      mapArr = Object.values(map);

      searchQuery = {};
      searchArr = [];
      for (let { position, searchBoo } of mapArr) {
        if (searchBoo) {
          tempObj = {};
          tempObj2 = {};
          if (req.body.query !== "") {
            tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
          } else {
            tempObj["$regex"] = new RegExp('.', 'gi');
          }
          tempObj2[position] = tempObj["$regex"];
          searchArr.push(tempObj2);
        }
      }
      searchQuery["$or"] = searchArr;

      if (req.url === "/searchClients") {
        rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchProjects" || req.url === "/searchPhotos") {
        rawJson = await instance.back.getProjectsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
        if (/\/project/g.test(req.headers.referer) || /\/photo/g.test(req.headers.referer)) {

          if (/^d/i.test(req.body.query)) {
            req.body.query = req.body.query.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\:\;\?\/\|\<\>\,\.\\\]\[\{\} \n\t]/g, '').replace(/^d/i, '');
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.designerMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let designers of rawJson) {
                whereQuery["$or"].push({ desid: designers.desid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

            }
          } else {
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.clientMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let client of rawJson) {
                whereQuery["$or"].push({ cliid: client.cliid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

              if (rawJson.length === 0) {
                mapArr = Object.values(instance.patch.designerMap());
                searchQuery = {};
                searchArr = [];
                for (let { position, searchBoo } of mapArr) {
                  if (searchBoo) {
                    tempObj = {};
                    tempObj2 = {};
                    if (req.body.query !== "") {
                      tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                    } else {
                      tempObj["$regex"] = new RegExp('.', 'gi');
                    }
                    tempObj2[position] = tempObj["$regex"];
                    searchArr.push(tempObj2);
                  }
                }
                searchQuery["$or"] = searchArr;
                if (req.body.query !== "") {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                }

                whereQuery = {};
                whereQuery["$or"] = [];
                for (let designers of rawJson) {
                  whereQuery["$or"].push({ desid: designers.desid });
                }

                if (whereQuery["$or"].length > 0) {
                  rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = [];
                }

              }

            }
          }

          filteredArr = [];
          for (let obj of rawJson) {
            if (obj.desid !== "") {
              filteredArr.push(obj);
            }
          }
          filteredArr.flatDeath = function () {
            let tong, tempArr;
            tong = [];
            for (let i of this) {
              tempArr = i.flatDeath();
              for (let j of tempArr) {
                tong.push(j);
              }
            }
            return tong;
          }
          filteredArr.planeDeath = function () {
            let tong, tempArr;
            tong = [];
            for (let i of this) {
              tempArr = i.planeDeath();
              for (let j of tempArr) {
                tong.push(j);
              }
            }
            return tong;
          }

          rawJson = filteredArr;
        }
      } else if (req.url === "/searchDesigners") {
        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchContents") {
        rawJson = await instance.back.getContentsArrByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      }

      if (req.body.noFlat === undefined) {
        if (req.url !== "/searchPhotos") {
          data = rawJson.flatDeath();
        } else {
          data = rawJson.planeDeath();
        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson.toNormal()));
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const { fileSystem, pythonExecute, shell, shellLink } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents", "/updatePhoto" ];
  obj.func = async function (req, res) {
    try {
      let { thisId, requestIndex, column, value, pastValue, user } = req.body;
      let thisPath;
      let map;
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp, pastFinalValue, pastValueTemp;
      let temp, temp2, temp3;
      let tempFunction;
      let position;
      let userArr;
      let today;
      let noUpdate;
      let updateTong;

      if (req.url === "/updateClient") {
        thisPath = "client";
        map = instance.patch.clientMap();
      } else if (req.url === "/updateDesigner") {
        thisPath = "designer";
        map = instance.patch.designerMap();
      } else if (req.url === "/updateProject") {
        thisPath = "project";
        map = instance.patch.projectMap();
      } else if (req.url === "/updateContents") {
        thisPath = "contents";
        map = instance.patch.contentsMap();
      } else if (req.url === "/updatePhoto") {
        thisPath = "photo";
        map = instance.patch.photoMap();
      }

      noUpdate = false;

      switch (map[column].type) {
        case "string":
          finalValue = String(value);
          pastFinalValue = String(pastValue);
          break;
        case "number":
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
          pastFinalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          break;
        case "date":
          if (value === "-" || value === "") {
            value = "1800-01-01";
          } else if (/예정/g.test(value)) {
            value = "3800-01-01";
          }
          if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
            if (value.length === 10) {
              temp = value.split('-');
              finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
            } else if (value.length === 19) {
              temp = value.split(' ');
              temp2 = temp[0].split('-');
              temp3 = temp[1].split(':');
              finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
            } else {
              finalValue = new Date(pastValue);
            }
          } else {
            finalValue = new Date(pastValue);
          }
          pastFinalValue = new Date(pastValue);
          break;
        case "boolean":
          if (/^미/.test(value) || /^비/.test(value) || /^안/.test(value) || /no/gi.test(value) || value === "false" || value === "null") {
            pastFinalValue = false;
            finalValue = false;
          } else {
            pastFinalValue = true;
            finalValue = true;
          }
          break;
        case "array":
          finalValue = [];
          pastFinalValue = [];
          valueTemp = value.split(", ");
          pastValueTemp = pastValue.split(", ");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
          for (let i of pastValueTemp) {
            pastFinalValue.push(i);
          }
          break;
        case "object":
          tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue, false);
          pastFinalValue = tempFunction(pastValue, pastValue, false);
          break;
        case "null":
          noUpdate = true;
          finalValue = null;
          pastFinalValue = null;
        case "link":
          finalValue = String(value);
          break;
        default:
          throw new Error("invaild type");
      }

      if (!noUpdate) {
        updateQuery = {};
        position = map[column].position.replace(/\.0\./, ("." + requestIndex + "."));
        updateQuery[position] = finalValue;

        whereQuery = {};
        if (req.url === "/updateClient") {
          whereQuery[map.cliid.position] = thisId;
        } else if (req.url === "/updateDesigner") {
          whereQuery[map.desid.position] = thisId;
        } else if (req.url === "/updateProject") {
          whereQuery[map.proid.position] = thisId;
        } else if (req.url === "/updateContents") {
          whereQuery[map.conid.position] = thisId;
        } else if (req.url === "/updatePhoto") {
          whereQuery[map.proid.position] = thisId;
        }

        if (map[column].isHistory !== undefined && map[column].isHistory !== null) {
          if (req.url === "/updateClient") {
            message = await instance.back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateDesigner") {
            message = await instance.back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateProject") {
            message = await instance.back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateContents") {
            message = await instance.back.updateHistory("contents", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updatePhoto") {
            message = await instance.back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }
        } else {
          if (req.url === "/updateClient") {
            message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateDesigner") {
            message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateProject") {
            message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateContents") {
            message = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updatePhoto") {
            message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          }
        }

        //update log
        const members = instance.members;
        const logDir = `${instance.dir}/log`;
        let thisPerson, fileTarget;

        userArr = user.split("__split__");
        today = new Date();

        for (let { name, email } of members) {
          if (email.includes(userArr[1])) {
            thisPerson = name;
            break;
          }
        }

        updateTong = {
          user: {
            name: thisPerson,
            email: userArr[1]
          },
          where: thisId,
          update: {
            target: position,
            value: finalValue,
            pastValue: pastFinalValue
          },
          date: today
        };

        instance.back.mongoCreate((req.url.replace(/^\//, '') + "Log"), updateTong, { local: null, local: true, selfMongo: null }).catch(function (e) {
          throw new Error(e);
        });

        await fileSystem(`write`, [ logDir + "/" + thisPath + "_" + "latest.json", JSON.stringify({ path: thisPath, who: thisPerson, where: thisId, column: column, value: value, date: today }) ]);
        const dir = await fileSystem(`readDir`, [ logDir ]);
        fileTarget = null;

        for (let fileName of dir) {
          if ((new RegExp("^" + thisId)).test(fileName)) {
            fileTarget = fileName;
          }
        }
        if (fileTarget !== null) {
          shell.exec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
        }
        await fileSystem(`write`, [ `${instance.dir}/log/${thisId}__name__${thisPerson}`, `0` ]);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_rawUpdateDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents" ];
  obj.func = async function (req, res) {
    try {
      let raw_data;
      let whereQuery, updateQuery, dateQuery;

      whereQuery = JSON.parse(req.body.where);

      if (req.body.updateQuery === undefined) {
        updateQuery = {};
        if (/^\{/.test(req.body.updateValue) || /^\[/.test(req.body.updateValue)) {
          updateQuery[req.body.target] = JSON.parse(req.body.updateValue);
        } else if (req.body.updateValue === "today") {
          updateQuery[req.body.target] = new Date();
        } else {
          updateQuery[req.body.target] = req.body.updateValue;
        }
      } else {
        updateQuery = JSON.parse(req.body.updateQuery);
        if (req.body.dateQuery !== undefined) {
          dateQuery = JSON.parse(req.body.dateQuery);
          for (let z in dateQuery) {
            if (dateQuery[z]) {
              if (updateQuery[z] === undefined) {
                throw new Error("invaild date query");
              } else {
                updateQuery[z] = new Date(updateQuery[z]);
              }
            }
          }
        }
      }

      if (req.url === "/rawUpdateClient") {
        raw_data = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateDesigner") {
        raw_data = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateProject") {
        raw_data = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateContents") {
        raw_data = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_deleteDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/deleteClient", "/deleteDesigner", "/deleteProject", "/deleteContents" ];
  obj.func = async function (req, res) {
    try {
      if (req.url === "/deleteClient") {
        await instance.back.deleteClient(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteDesigner") {
        await instance.back.deleteDesigner(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteProject") {
        await instance.back.deleteProject(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteContents") {
        await instance.back.deleteContents(req.body.id, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/createClient", "/createDesigner", "/createProject", "/createContents" ];
  obj.func = async function (req, res) {
    try {
      const updateQuery = JSON.parse(req.body.updateQuery);
      let id;

      if (req.url === "/createClient") {
        id = await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createDesigner") {
        id = await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createProject") {
        updateQuery["proposal.date"] = new Date();
        id = await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createContents") {
        id = await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ id: id }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return String(number);
    }
  }

  let obj = {};
  obj.link = "/getClientReport";
  obj.func = async function (req, res) {
    try {
      const today = new Date();
      let dateMatrix;
      let searchQuery, clients, proposals, contracts, process;
      let processTong;
      let cliidArr, cliidArr_raw;
      let resultArr;
      let obj;
      let searchBoo;
      let processTong_refined, processTong_past, processTong_double;
      let doubleObject;
      let doubleClient;
      let finalLength;
      let processNumber;
      let pastTong;
      let proposalsTong;

      if (req.body.month === undefined) {
        if (req.body.startYear === undefined) {
          req.body.month = 8;
          searchBoo = false;
        } else {
          let { startYear, startMonth, endYear, endMonth } = req.body;
          startYear = Number(startYear);
          startMonth = Number(startMonth.replace(/^0/, ''));
          endYear = Number(endYear);
          endMonth = Number(endMonth.replace(/^0/, ''));
          req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;
          req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);
          searchBoo = true;
        }
      } else {
        searchBoo = false;
      }

      if (!searchBoo) {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
      } else {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
        for (let i = 0; i < req.body.endMonth; i++) {
          dateMatrix.shift();
        }
      }

      resultArr = [];

      for (let matrix of dateMatrix) {
        monthArr = [];
        for (let arr of matrix) {
          obj = {};
          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": arr[0], "$lt": arr[2] } } } };
          clients = await instance.back.getClientsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.client = clients.length;

          //proposal
          cliidArr_raw = [];
          cliidArr = [];
          processTong = [];
          pastTong = [];
          for (let client of clients) {
            cliidArr_raw.push(client.cliid);
          }
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          for (let cliid of cliidArr_raw) {
            cliidArr.push({ cliid });
          }
          if (cliidArr.length > 0) {
            searchQuery = { "$or": cliidArr };
            process = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
            for (let i of process) {
              if (!pastTong.includes(i.cliid)) {
                processTong.push(i);
              }
              pastTong.push(i.cliid);
            }
            obj.proposal = processTong.length;
          } else {
            obj.proposal = 0;
          }

          //recommend
          searchQuery = { "proposal.date": { "$gte": arr[0], "$lt": arr[2] } };
          proposals = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          pastTong = [];
          proposalsTong = [];
          for (let i of proposals) {
            if (!pastTong.includes(i.cliid)) {
              proposalsTong.push(i);
            }
            pastTong.push(i.cliid);
          }
          obj.recommend = proposalsTong.length;

          //contract
          searchQuery = { "process.contract.first.date": { "$gte": arr[0], "$lt": arr[2] } };
          contracts = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.contract = contracts.length;

          //process start
          processNumber = 0;
          for (let c of clients) {
            for (let { analytics: { proposal } } of c.requests) {
              for (let obj of proposal) {
                if (obj.contract) {
                  processNumber = processNumber + 1;
                }
              }
            }
          }
          obj.process = processNumber;

          monthArr.push(obj);
        }
        resultArr.push(monthArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getProjectReport = function () {
  const instance = this;
  const back = this.back;
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return String(number);
    }
  }

  let obj = {};
  obj.link = "/getProjectReport";
  obj.func = async function (req, res) {
    try {
      let target;
      let resultObj;
      let temp, temp2;
      let tempObj, tempArr;
      let startDay;
      let endDay;
      let searchQuery0, searchQuery1, searchQuery2, searchQuery3, searchQuery4, searchQuery5, projects;
      let cliidArr, desidArr;
      let tempAmount;

      resultObj = {};
      resultObj.today = req.body.today;
      startDay = new Date(Number(req.body.start.split("-")[0]), Number(req.body.start.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.start.split("-")[2].replace(/^0/, '')));
      endDay = new Date(Number(req.body.end.split("-")[0]), Number(req.body.end.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.end.split("-")[2].replace(/^0/, '')));
      resultObj.startDay = req.body.start;
      resultObj.endDay = req.body.end;

      resultObj.projects = [];
      for (let i = 0; i < 6; i++) {

        if (i === 0) {
          searchQuery0 = { "process.contract.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 1) {
          searchQuery0 = { "process.contract.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 2) {
          searchQuery0 = { "process.contract.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 3) {
          searchQuery3 = { "process.contract.remain.date": { "$gte": new Date(2000, 0, 1) } };
          searchQuery4 = { "process.calculation.payments.first.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery0 = { "process.calculation.payments.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery5 = { "$or": [ searchQuery4, searchQuery0 ] };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery5, searchQuery1, searchQuery3 ] };
        } else if (i === 4) {
          searchQuery0 = { "process.calculation.payments.first.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        } else if (i === 5) {
          searchQuery0 = { "process.calculation.payments.first.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        }

        searchQuery2["$and"].push({ "process.status": { "$not": { "$regex": "^[홀드]" } } });

        temp = await back.getProjectsByQuery(searchQuery2, { selfMongo: instance.mongo });

        cliidArr = [];
        desidArr = [];
        for (let j = 0; j < temp.length; j++) {
          cliidArr.push({ cliid: temp[j].cliid });
          desidArr.push({ desid: temp[j].desid });
        }

        if (i < 3) {
          if (cliidArr.length > 0) {
            temp2 = await back.getClientsByQuery({ "$or": cliidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        } else {
          if (desidArr.length > 0) {
            temp2 = await back.getDesignersByQuery({ "$or": desidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        }

        tempArr = [];
        for (let j = 0; j < temp.length; j++) {
          tempObj = {};
          tempObj.date = "1001-01-01";
          tempObj.proid = temp[j].proid;

          if (i === 0) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 1) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.date);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 2) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.cancel);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.refund) + "만원";
          } else if (i === 3) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if ((new Date(2000, 0, 1)).valueOf() >= temp[j].process.calculation.payments.remain.date.valueOf()) {
              tempAmount = 0.5;
            }
            if ((new Date(2000, 0, 1)).valueOf() >= temp[j].process.calculation.payments.first.date.valueOf()) {
              tempAmount = 1;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(temp[j].process.calculation.payments.totalAmount * tempAmount)) + "만원";
          } else if (i === 4) {

            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if (startDay.valueOf() <= temp[j].process.calculation.payments.first.date.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.first.date.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.first.amount;
            }
            if (startDay.valueOf() <= temp[j].process.calculation.payments.remain.date.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.remain.date.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.remain.amount;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(tempAmount)) + "만원";
          } else if (i === 5) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if (startDay.valueOf() <= temp[j].process.calculation.payments.first.cancel.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.first.cancel.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.first.refund;
            }
            if (startDay.valueOf() <= temp[j].process.calculation.payments.remain.cancel.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.remain.cancel.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.remain.refund;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(tempAmount)) + "만원";
          }
          tempArr.push(tempObj);
        }
        resultObj.projects.push(tempArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getContentsReport = function () {
  const instance = this;
  const SnsParsing = require(`${process.cwd()}/apps/snsParsing/snsParsing.js`);
  const sns = new SnsParsing();
  const back = this.back;
  let obj = {};
  obj.link = "/getContentsReport";
  obj.func = async function (req, res) {
    try {
      let resultArr;

      resultArr = {};

      resultArr.data = await sns.getSnsReport();
      resultArr.flat = resultArr.data.flatDeath();

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDesignerReport = function () {
  const instance = this;
  const back = this.back;
  const patch = this.patch;
  let obj = {};
  obj.link = [ "/getDesignerReport", "/updateDesignerReport", "/viewDesignerRawPortfolio" ];
  obj.func = async function (req, res) {
    try {
      const { updateStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, sameStandard, cloudLinkTargets } = patch.designerRawMap();
      const dateToString = function (str) {
        const zeroAddition = function (num) {
          if (num < 10) {
            return `0${String(num)}`;
          } else {
            return String(num);
          }
        }
        let date;
        date = new Date(str);
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
      }
      const stringToDateValue = function (str) {
        let tempArr0, tempArr1, tempArr2;
        let resultDate;
        tempArr0 = str.split(" ");
        tempArr1 = tempArr0[0].split("-");
        tempArr2 = tempArr0[1].split(":");
        resultDate = new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
        return resultDate.valueOf();
      }
      const stringToDateWording = function (str) {
        const today = new Date();
        let temp;
        temp = str.split(" ");
        return new Date(today.getFullYear(), Number(temp[0].replace(/[^0-9]/g, '')) - 1, Number(temp[1].replace(/[^0-9]/g, '')), Number(temp[3].replace(/[^0-9]/g, '')));
      }
      const oppositeMode = req.body.mode !== "total" ? ((req.body.mode === "presentation") ? "partnership" : "presentation") : "presentation";
      let row, oppositeRow, binaryRow;
      let sameStandardColumn;
      let realData;
      let tempObj;
      let targetIndex;
      let whereQuery, updateQuery;
      let tempLink;
      let phoneTong;
      let tempAspirants, tempAspirant;

      if (req.url === "/getDesignerReport") {

        row = await back.getAspirantsByQuery({ "meeting.status": { "$not": { "$regex": "드" } } }, { withTools: true, selfMongo: instance.mongo, portfolioReset: true });
        realData = [];
        for (let i of row) {
          if (i.flatDeath(req.body.mode) !== null) {
            realData.push(i.flatDeath(req.body.mode));
          }
        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ mode: req.body.mode, oppositeMode: oppositeMode, title: titleNameMap[req.body.mode], columns: columnRelativeMap[req.body.mode], data: realData, standard: updateStandard }));

      } else if (req.url === "/updateDesignerReport") {

        whereQuery = {};
        updateQuery = {};

        whereQuery[updateStandard] = req.body.standard;
        if (req.body.column === "status") {
          updateQuery["meeting.status"] = req.body.value;
        } else if (req.body.column === "presentationTimes" || req.body.column === "meetingTime") {
          updateQuery["meeting.date"] = stringToDateWording(req.body.value);
        }

        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        // if (req.body.calendar !== undefined) {
        //   tempAspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: instance.mongo });
        //   tempAspirant = tempAspirants[0];
        //   if (tempAspirant.calendar.id !== "") {
        //     instance.calendar.updateSchedule(tempAspirant.calendar.mother, tempAspirant.calendar.id, { start: tempAspirant.meeting.date });
        //   } else {
        //     instance.calendar.makeSchedule(tempAspirant.calendar.mother, tempAspirant.designer + " 디자이너 사전 미팅", "", tempAspirant.meeting.date).then(function (res) {
        //       back.updateAspirant([ whereQuery, { "calendar.id": res.eventId } ], { selfMongo: instance.mongo });
        //     }).catch(function (e) {
        //       console.log(e);
        //     });
        //   }
        // }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "success" }));

      } else if (req.url === "/viewDesignerRawPortfolio") {

        whereQuery = {};
        whereQuery[updateStandard] = req.body.standard;
        await back.unshiftAspirantPortfolioConfirm(whereQuery, 0, (new Date()), req.body.user, { selfMongo: instance.mongo });

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "success" }));
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getHistory = function () {
  const instance = this;
  const back = this.back;
  const stringFilter = function (raw) {
    const originalValue = raw;
    const originalValueArr = originalValue.split("\n");

    let str;
    let tempString;
    let item = null;
    let tong = [];

    for (let text of originalValueArr) {
      if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
        tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
        tong.push('- ' + tempString);
      } else if (/^\<\%item\%\>/.test(text)) {
        item = text;
      }
    }

    if (item !== null) {
      str = item + "\n\n" + tong.join("\n");
    } else {
      str = tong.join("\n");
    }

    return str.replace(/\&/g, ",");
  }
  let obj = {};
  obj.link = [ "/getClientHistory", "/getProjectHistory", "/getHistoryProperty", "/getClientsImportant", "/getProjectsImportant", "/getClientsManager", "/getProjectsManager", "/getClientsIssue", "/getProjectsIssue" ];
  obj.func = async function (req, res) {
    try {
      let historyObj, responseArr;
      let resultObj;
      let method;

      responseArr = [];

      if (req.url === "/getClientHistory") {

        historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });

        if (historyObj === null) {
          await back.createHistory("client", { cliid: req.body.id }, { selfMongo: instance.mongolocal });
          for (let i = 0; i < 6; i++) {
            responseArr.push('');
          }
        } else {
          responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.space === undefined ? '' : historyObj.space.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.styling === undefined ? '' : historyObj.styling.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.construct === undefined ? '' : historyObj.construct.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.budget === undefined ? '' : historyObj.budget.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.progress === undefined ? '' : historyObj.progress.replace(/\=/g, '').replace(/\&/g, ",")));
        }

      } else if (req.url === "/getProjectHistory") {

        historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });

        if (historyObj === null) {
          await back.createHistory("project", { proid: req.body.id }, { selfMongo: instance.mongolocal });
          for (let i = 0; i < 4; i++) {
            responseArr.push('');
          }
        } else {
          responseArr.push((historyObj.history === undefined ? '' : stringFilter(historyObj.history)));
          responseArr.push((historyObj.designer === undefined ? '' : stringFilter(historyObj.designer)));
          responseArr.push((historyObj.client === undefined ? '' : stringFilter(historyObj.client)));
          responseArr.push((historyObj.photo === undefined ? '' : stringFilter(historyObj.photo)));
        }

      } else if (req.url === "/getHistoryProperty") {
        if (JSON.parse(req.body.idArr).length > 0) {
          responseArr = await back.getHistoryProperty(req.body.method, req.body.property, JSON.parse(req.body.idArr), { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateHistory = function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const back = this.back;
  const members = this.members;
  let obj = {};
  obj.link = [ "/updateHistory", "/updateClientHistory", "/updateProjectHistory" ];
  obj.func = async function (req, res) {
    try {
      const today = new Date();
      const { id, column, value, email } = req.body;
      const logDir = `${instance.dir}/log`;
      let historyObj;
      let whereQuery, updateQuery;
      let thisPerson;
      let fileTarget;
      let method, standard;

      for (let member of members) {
        if (member.email.includes(email)) {
          thisPerson = member.name;
          break;
        }
      }

      whereQuery = {};
      updateQuery = {};

      if (/Client/gi.test(req.url)) {
        method = "client";
      } else if (/Project/gi.test(req.url)) {
        method = "project";
      } else if (/Designer/gi.test(req.url)) {
        method = "designer";
      } else if (/Contents/gi.test(req.url)) {
        method = "contents";
      } else {
        if (req.body.method === undefined) {
          throw new Error("invaild method");
        } else {
          method = req.body.method;
        }
      }

      if (/client/gi.test(method)) {
        standard = "cliid";
      } else if (/project/gi.test(method)) {
        standard = "proid";
      } else if (/designer/gi.test(method)) {
        standard = "desid";
      } else if (/contents/gi.test(method)) {
        standard = "conid";
      } else {
        throw new Error("invaild method");
      }

      historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
      if (historyObj === null) {
        updateQuery = {};
        updateQuery[standard] = id;
        if (column === "important") {
          updateQuery[column] = (Number(value) === 1);
        } else {
          updateQuery[column] = value;
        }
        await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal });
      } else {
        whereQuery = {};
        whereQuery[standard] = id;
        if (column === "important") {
          updateQuery[column] = (Number(value) === 1);
        } else {
          updateQuery[column] = value;
        }
        await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      }

      await fileSystem(`write`, [ logDir + "/" + method + "_" + "latest.json", JSON.stringify({ path: method, who: thisPerson, where: id, column: "history_" + column, value: "", date: today }) ]);
      const dir = await fileSystem(`readDir`, [ logDir ]);
      fileTarget = null;
      for (let fileName of dir) {
        if ((new RegExp("^" + id)).test(fileName)) {
          fileTarget = fileName;
        }
      }
      if (fileTarget !== null) {
        shell.exec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
      }
      await fileSystem(`write`, [ `${instance.dir}/log/${id}__name__${thisPerson}`, `0` ]);

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ "message": "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getContentsDetail = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = [ "/getContentsDetail" ];
  obj.func = async function (req, res) {
    try {
      let contents;

      contents = await back.getContentsById(req.body.id);
      const { portfolio, review } = contents.getContentsFlatDetail();

      res.set("Content-Type", "application/json");
      if (req.body.noFlat === undefined) {
        res.send(JSON.stringify([ portfolio, review ]));
      } else {
        res.send(JSON.stringify([ contents.getPortfolioDetail(), contents.getReviewDetail(), contents.getGsArr() ]));
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSlack = function () {
  const instance = this;
  const back = this.back;
  const slack = this.mother.slack_bot;
  const url = require('url');
  let obj = {};
  obj.link = "/sendSlack";
  obj.func = async function (req, res) {
    try {
      let link;
      let link_index;
      let row_message, new_message;
      let query;
      let requrl;

      link = '';
      link_index = 0;
      row_message = '';
      new_message = '';

      if (req.body.linkmake !== undefined) {
        query = JSON.parse(req.body.query);
        requrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.body.link,
        });

        link += requrl + '?';
        for (let i of query) {
          link += i.standard + '=' + i.value + '&'
        }
        link = link.slice(0, -1);

        row_message = req.body.message;
        link_index = row_message.search(/link:/g);
        new_message = row_message.slice(0, link_index) + "link: " + link + row_message.slice(link_index + 6);

        await slack.chat.postMessage({ text: new_message, channel: req.body.channel });
      } else {
        await slack.chat.postMessage({ text: req.body.message, channel: req.body.channel });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSheets = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/sendSheets";
  obj.func = async function (req, res) {
    try {
      const values = JSON.parse(req.body.values);
      let sheetsId, response;
      if (req.body.newMake !== undefined) {
        sheetsId = await sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId);
        await sheets.update_value_inPython(sheetsId, '', values, [ 0, 0 ]);
        await sheets.setting_cleanView_inPython(sheetsId);
        response = await drive.read_webView_inPython(sheetsId);
      }
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: response }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeDesigner = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/realtimeDesigner";
  obj.func = async function (req, res) {
    try {
      const desid = req.body.desid;
      const today = new Date();
      let futureConst;
      let futureArr;
      let resultArr;
      let num;
      let tong;
      let thisDesigner;
      let thisYear, thisMonth, thisOnoff;

      if (req.body.type === "get") {
        futureConst = 5;
        futureArr = [];

        for (let i = 0; i < futureConst; i++) {
          futureArr.push({ year: today.getFullYear(), month: today.getMonth() + 1 + i, onoff: true, })
        }

        resultArr = new Array(futureConst);
        num = 0;
        for (let obj of futureArr) {
          if (obj.month > 12) {
            obj.year = obj.year + 1;
            obj.month = obj.month - 12;
          }
          resultArr[futureConst - 1 - num] = obj;
          num++;
        }

        tong = await back.mongoRead("realtimeDesigner", { desid }, { local: true });
        if (tong.length === 0) {
          await back.mongoCreate("realtimeDesigner", {
            desid: desid,
            available: resultArr,
          }, { local: true });
        } else {
          thisDesigner = tong[0];
          for (let obj2 of resultArr) {
            for (let obj of thisDesigner.available) {
              if (obj.year === obj2.year && obj.month === obj2.month) {
                obj2.onoff = obj.onoff;
              }
            }
          }
          await back.mongoUpdate("realtimeDesigner", [
            { desid },
            { available: resultArr }
          ], { local: true });
        }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultArr));
      } else {

        thisYear = Number(req.body.year);
        thisMonth = Number(req.body.month);
        thisOnoff = Number(req.body.onoff);

        tong = await back.mongoRead("realtimeDesigner", { desid }, { local: true });
        thisDesigner = tong[0];
        for (let obj of thisDesigner.available) {
          if (obj.year === thisYear && obj.month === thisMonth) {
            if (thisOnoff === 0) {
              obj.onoff = false;
            } else {
              obj.onoff = true;
            }
          }
        }
        await back.mongoUpdate("realtimeDesigner", [
          { desid },
          { available: thisDesigner.available }
        ], { local: true });

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ "message": "success" }));
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calculateService = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/calculateService";
  obj.func = async function (req, res) {
    try {
      let { serviceArr, pyeong, thisService } = req.body;

      serviceArr = JSON.parse(serviceArr);
      pyeong = Number(pyeong);
      thisService = JSON.parse(thisService);

      const service = await instance.back.getServiceById(serviceArr[thisService[0]].serid);
      const { x, y } = service.standard;
      const matrix = service.getMatrixByNumber(serviceArr[thisService[0]].case);
      let xNum, yNum;
      let result;

      for (let i = 0; i < x.length; i++) {
        if (x[i] === thisService[1]) {
          xNum = i;
        }
      }

      for (let i = 0; i < y.length; i++) {
        if (y[i][0] <= pyeong) {
          if (y[i][1] > pyeong) {
            yNum = i;
          }
        }
      }

      if (matrix[yNum] !== undefined) {
        if (typeof matrix[yNum][xNum] === "string") {
          result = pyeong * Number(matrix[yNum][xNum].replace(/py/gi, ''));
        } else {
          result = matrix[yNum][xNum];
        }
      } else {
        result = 0;
      }

      if (Math.floor(result) === 0) {
        result = 0;
      } else {
        result = Math.round(result) * 10000;
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ result }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calendarArr = function () {
  const instance = this;
  let obj = {};
  obj.link = "/calendarArr";
  obj.func = async function (req, res) {
    try {
      const resultArr = await instance.getCalendar(Number(req.body.length));
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_notionUpdate = function () {
  const instance = this;
  const back = this.back;
  const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
  const notion = new NotionAPIs();
  let obj = {};
  obj.link = "/notionUpdate";
  obj.func = async function (req, res) {
    try {
      let notionCard;
      let whoMethod, whoFunction;
      let result;
      let whereQuery, updateQuery;
      let historyObj;

      whoMethod = null;
      if (req.body.cliid !== undefined) {
        notionCard = await notion.getElementById(req.body.cliid, true);
        whoMethod = "client";
      } else if (req.body.desid !== undefined) {
        notionCard = await notion.getElementById(req.body.desid);
        whoMethod = "designer";
      }

      whoFunction = instance.patch[whoMethod + "NotionMap"];
      result = whoFunction(notionCard);

      updateQuery = {};
      for (let { target, finalValue } of result) {
        if (finalValue !== null && finalValue !== undefined) {
          updateQuery[target] = finalValue;
        }
      }

      whereQuery = {};
      if (req.body.cliid !== undefined) {
        whereQuery.cliid = req.body.cliid;
        await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        historyObj = {};
        historyObj.cliid = req.body.cliid;
        historyObj.history = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.history === undefined ? [] : notionCard.detailStory.history))));
        historyObj.space = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.space === undefined ? [] : notionCard.detailStory.space))));
        historyObj.styling = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.styling === undefined ? [] : notionCard.detailStory.styling))));
        historyObj.construct = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.construct === undefined ? [] : notionCard.detailStory.construct))));
        historyObj.budget = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.budget === undefined ? [] : notionCard.detailStory.budget))));
        historyObj.progress = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.progress === undefined ? [] : notionCard.detailStory.progress))));

        await instance.back.updateHistory("client", [ whereQuery, historyObj ], { selfMongo: instance.mongolocal });

      } else if (req.body.desid !== undefined) {
        whereQuery.desid = req.body.desid;
        await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ "message": "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createAiDocument = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  let obj = {};
  obj.link = [ "/createRequestDocument", "/createProposalDocument" ];
  obj.func = async function (req, res) {
    try {

      if (req.url === "/createRequestDocument") {

        let clientOriginal;
        let projects, project;
        let resultObj = { "alert": "요청에 문제가 있습니다!" };

        clientOriginal = await instance.back.getClientById(req.body.id);
        if (clientOriginal === null) {
          resultObj = { "alert": "확인되는 고객이 없습니다!" };
        } else {
          projects = await instance.back.getProjectsByQuery({ cliid: req.body.id });
          project = null;
          for (let p of projects) {
            if (p.desid !== '') {
              project = p;
              break;
            }
          }
          if (project === null) {
            resultObj = { "alert": "확인되는 프로젝트가 없습니다!" };
          } else {
            if (project.process.contract.meeting.date.getFullYear() < 1900) {
              resultObj = { "alert": "현장 미팅에 대한 정보가 없습니다!" };
            } else {
              await instance.mother.requestSystem("http://" + ADDRESS.homeinfo.ip.outer + ":" + ADDRESS.homeinfo.polling.port + "/toAiServer", { type: "request", id: req.body.id });
              resultObj = { "alert": "의뢰서 제작 요청이 완료되었습니다!" };
            }
          }
        }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultObj));

      } else if (req.url === "/createProposalDocument") {
        await instance.mother.requestSystem("http://" + ADDRESS.homeinfo.ip.outer + ":" + ADDRESS.homeinfo.polling.port + "/toAiServer", { type: "proposal", id: req.body.id });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "done" }));
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getMembers = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  let obj = {};
  obj.link = "/getMembers";
  obj.func = async function (req, res) {
    try {
      const membersArr = instance.members;
      let emailArr = [];
      let targetMember = null;

      if (req.body.type === "get") {

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(membersArr));

      } else if (req.body.type === "boo") {
        for (let { id, email } of membersArr) {
          for (let e of email) {
            emailArr.push({ email: e, id });
          }
        }

        for (let i = 0; i < emailArr.length; i++) {
          if (req.body.value === emailArr[i].email) {
            for (let j = 0; j < membersArr.length; j++) {
              if (emailArr[i].id === membersArr[j].id) {
                targetMember = membersArr[j];
              }
            }
          }
        }

        //dev------------------------------------------------------
        if (req.body.value === "homeliaisonphoto@gmail.com") {
          targetMember = membersArr[7];
        }
        //---------------------------------------------------------

        res.set("Content-Type", "application/json");
        if (targetMember === undefined || targetMember === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: targetMember }));
        }

      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  const stringToArr = function (dateString) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = dateString.split(' ');
    tempArr1 = tempArr0[0].split('-');
    tempArr2 = tempArr0[1].split(':');
    return [ Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')) ];
  }
  let obj = {};
  obj.link = "/getAnalytics_total";
  obj.func = async function (req, res) {
    try {
      let rangeObj = JSON.parse(req.body.range);
      let { startDate, endDate } = rangeObj;
      let searchQuery, rows;
      let andSearchQuery, orSearchQuery, search;
      const columns = [
        "userid",
        "userType",
        "campaign",
        "referrer.name",
        "referrer.detail.host",
        "referrer.raw",
        "device.type",
        "device.os",
        "device.mobileDevice",
        "region.country",
        "region.city",
      ];
      let temp;

      startDate = new Date(...stringToArr(startDate));
      endDate = new Date(...stringToArr(endDate));
      searchQuery = { "latestTimeline": { "$gte": startDate, "$lte": endDate } };

      if (rangeObj.search !== undefined) {
        andSearchQuery = {};
        andSearchQuery["$and"] = [];
        andSearchQuery["$and"].push(searchQuery);

        orSearchQuery = {};
        orSearchQuery["$or"] = [];
        for (let c of columns) {
          temp = {};
          temp[c] = { "$regex": rangeObj.search };
          orSearchQuery["$or"].push(temp);
        }

        andSearchQuery["$and"].push(orSearchQuery);
      } else {
        andSearchQuery = searchQuery;
      }

      rows = await instance.back.mongoRead("googleAnalytics_total", andSearchQuery, { home: true });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getRawContents = function () {
  const instance = this;
  const back = this.back;
  const slack = this.mother.slack_bot;
  const GoogleDocs = require(`${process.cwd()}/apps/googleAPIs/googleDocs.js`);
  const docs = new GoogleDocs();
  let obj = {};
  obj.link = "/getRawContents";
  obj.func = async function (req, res) {
    try {
      let { id, method, button } = req.body;
      let text;
      let responseObj, resultObjArr;
      let proidArr;
      let tempArr;
      let realTargetArr;
      let noConids;
      let resultArr;
      let cliidArr, cliidArrPure;
      let desidArr, desidArrPure;
      let projects, clients, designers;
      let proid, desid, cliid;
      let updateQuery, whereQuery;
      let uploadObj;
      let fileName;
      let parentFolder;
      let docId;
      let rawContentsArr, rawContents;
      let thisObj;
      let findContents;

      responseObj = {};
      thisObj = null;
      whereQuery = null;
      updateQuery = null;
      findContents = null;

      if (button === "get") {
        resultObjArr = await back.mongoRead("contentsRaw", { proid: id }, { python: true });
        if (resultObjArr.length > 0) {
          responseObj.text = resultObjArr[0][method].contents;
        } else {
          responseObj.text = '';
        }
      } else if (button === "projectNoConid" || button === "projectYesConid") {

        tempArr = await back.mongoRead("contentsRaw", { conid: ((button === "projectNoConid") ? "" : { "$regex": "^t" }) }, { python: true });
        proidArr = [];
        for (let i of tempArr) {
          proidArr.push({ proid: i.proid });
        }

        projects = await back.getProjectsByQuery({ "$or": proidArr });
        responseObj = projects.toNormal();

        cliidArr = [];
        cliidArrPure = [];
        desidArr = [];
        desidArrPure = [];
        for (let i of projects) {
          if (!cliidArrPure.includes(i.cliid)) {
            cliidArr.push({ cliid: i.cliid });
          }
          if (!desidArrPure.includes(i.desid)) {
            desidArr.push({ desid: i.desid });
          }
          cliidArrPure.push(i.cliid);
          desidArrPure.push(i.desid);
        }

        clients = await back.getClientsByQuery({ "$or": cliidArr });
        designers = await back.getDesignersByQuery({ "$or": desidArr });

        for (let i of responseObj) {
          for (let j of clients) {
            if (i.cliid === j.cliid) {
              i.name = j.name;
            }
          }
          for (let j of designers) {
            if (i.desid === j.desid) {
              i.designer = j.designer;
            }
          }
          for (let j of tempArr) {
            if (i.proid === j.proid) {
              i.raw = {};
              i.raw.portfolio = {};
              i.raw.review = {};
              i.raw.photo = {};
              i.raw.portfolio.exist = j.portfolio.exist;
              i.raw.review.exist = j.review.exist;
              i.raw.photo.link = j.photo.link;
            }
          }
        }

      } else if (button === "createRawContents") {

        updateQuery = JSON.parse(req.body.updateQuery);
        whereQuery = JSON.parse(req.body.whereQuery);

        proid = whereQuery.proid;
        desid = updateQuery.desid;
        cliid = updateQuery.cliid;

        uploadObj = {};

        uploadObj.proid = proid;
        uploadObj.cliid = cliid;
        uploadObj.desid = desid;
        uploadObj.conid = "";

        uploadObj.portfolio = {};
        uploadObj.review = {};
        uploadObj.photo = {};

        uploadObj.portfolio.exist = false;
        uploadObj.portfolio.contents = '';

        uploadObj.review.exist = false;
        uploadObj.review.contents = '';

        uploadObj.photo.link = '';

        await back.mongoCreate("contentsRaw", uploadObj, { python: true });

      } else if (button === "insertText") {

        updateQuery = {};
        whereQuery = {};

        whereQuery.proid = id;
        thisObj = await back.mongoRead("contentsRaw", whereQuery, { python: true });
        thisObj = thisObj[0];

        if (req.body.text === '') {
          updateQuery[(method + ".exist")] = false;
          updateQuery[(method + ".contents")] = "";
        } else {
          updateQuery[(method + ".exist")] = true;
          updateQuery[(method + ".contents")] = req.body.text;
        }

        await back.mongoUpdate("contentsRaw", [ whereQuery, updateQuery ], { python: true });

        responseObj.link = "none";

        if (req.body.text !== '' && req.body.text !== "미지정") {
          parentFolder = req.body.parentId;
          fileName = req.body.clientName + "C_" + req.body.designerName + "D_" + method + "_" + instance.mother.todayMaker("total");
          docId = await docs.create_newDocs_inPython(fileName, parentFolder);
          await docs.update_value_inPython(docId, req.body.text);
          responseObj.link = "https://docs.google.com/document/d/" + docId + "/edit?usp=sharing";
        }

      } else if (button === "photo") {

        rawContentsArr = await back.mongoRead("contentsRaw", { proid: id }, { python: true });
        rawContents = rawContentsArr[0];
        responseObj.link = rawContents.photo.link;

      } else if (button === "insertPhoto") {

        updateQuery = {};
        whereQuery = {};

        whereQuery.proid = id;
        thisObj = await back.mongoRead("contentsRaw", whereQuery, { python: true });
        thisObj = thisObj[0];
        updateQuery["photo.link"] = req.body.link;
        await back.mongoUpdate("contentsRaw", [ whereQuery, updateQuery ], { python: true });

        if (updateQuery["photo.link"] !== '') {
          findContents = await back.getContentsArrByQuery({ proid: id }, { selfMongo: instance.mongo });
          if (findContents.length === 0) {
            await slack.chat.postMessage({ text: `${req.body.clientName}C_${req.body.designerName}D님의 원본 사진이 등록되었습니다! 선보정을 시작해주세요! link: https://${instance.address.backinfo.host}/contents?view=create&proid=${id}`, channel: "#503_contents" });
          }
        }

      }

      if (thisObj !== null && whereQuery !== null) {
        if (whereQuery.proid !== undefined) {
          thisObj = await back.mongoRead("contentsRaw", whereQuery, { python: true });
          thisObj = thisObj[0];
          if (thisObj.portfolio.exist && thisObj.review.exist && thisObj.photo.link !== "") {
            if (findContents === null) {
              findContents = await back.getContentsArrByQuery({ proid: id }, { selfMongo: instance.mongo });
            }
            if (findContents.length === 0) {
              await slack.chat.postMessage({ text: `${req.body.clientName}C_${req.body.designerName}D님의 컨텐츠 교정 준비가 완료되었습니다! 보정을 시작해주세요! link: https://${instance.address.backinfo.host}/contents?view=create&proid=${id}`, channel: "#503_contents" });
            }
          }
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerMatrix = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  let obj = {};
  obj.link = "/designerMatrix";
  obj.func = async function (req, res) {
    try {
      const logDir = `${instance.dir}/log`;
      const { button, desid } = req.body;
      const sseConst = "sse_designerMatrix";
      let responseObj;
      let thisObjs, thisObj;
      let temp0, temp1;
      let matrixA, matrixB;
      let json;
      let standardA, standardB;
      let today;
      let whereQuery, updateQuery;
      let sseObjs;

      responseObj = {};

      if (button === "get") {
        thisObjs = await back.getDesignersByQuery({ desid }, { selfMongo: instance.mongo });
        if (thisObjs.length > 0) {
          thisObj = thisObjs[0];
          responseObj[req.body.target] = thisObj.analytics.etc.matrix;
          responseObj["values"] = thisObj.analytics.etc.matrix.getStandards();
          responseObj["analytics"] = thisObj.analytics.toNormal();
        } else {
          responseObj["error"] = "There is no designer";
        }

        sseObjs = await back.mongoRead(sseConst, { desid }, { selfMongo: instance.mongolocal });
        if (sseObjs.length === 0) {
          await back.mongoCreate(sseConst, { desid, column: "null", type: "null", order: [] }, { selfMongo: instance.mongolocal });
        }

      } else if (button === "update") {
        whereQuery = { desid };
        updateQuery = {};
        if (req.body.matrixA !== undefined) {
          updateQuery["analytics.etc.matrix"] = JSON.parse(req.body.matrixA);
        } else {
          updateQuery = JSON.parse(req.body.update);
        }
        await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        await back.mongoUpdate(sseConst, [ { desid }, { column: req.body.column, type: req.body.type, order: JSON.parse(req.body.order) } ], { selfMongo: instance.mongolocal });
        // await fileSystem(`write`, [ logDir + "/designerMatrix_" + desid + "_latest.json", JSON.stringify({ desid, column: req.body.column, type: req.body.type, order: JSON.parse(req.body.order) }) ]);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.async_analyticsReport = async function (startDate, endDate, title, parentId) {
  const instance = this;
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  const analytics = new GoogleAnalytics();
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  try {
    let responseObj;
    let matrix = [];
    let sheetsId, response;
    let xyMetrics;
    let sheetTitle;
    let nameArr;

    responseObj = await analytics.generalMetric(startDate, endDate);

    sheetsId = await sheets.create_newSheets_inPython(title, parentId);
    await sheets.update_defaultSheetName_inPython(sheetsId, "general");
    await sheets.update_value_inPython(sheetsId, "general", responseObj.matrix, [ 0, 0 ]);

    xyMetrics = (await analytics.xyMetric("ga:campaign", startDate, endDate)).matrix;
    nameArr = [];
    for (let i = 0; i < xyMetrics.length; i++) {
      sheetTitle = "캠페인_" + xyMetrics[i][0][0];
      nameArr.push(sheetTitle);
    }
    await sheets.add_newSheet_inPython(sheetsId, nameArr);
    for (let i = 0; i < xyMetrics.length; i++) {
      await sheets.update_value_inPython(sheetsId, nameArr[i], xyMetrics[i], [ 0, 0 ]);
    }

    xyMetrics = (await analytics.xyMetric("ga:source", startDate, endDate)).matrix;
    nameArr = [];
    for (let i = 0; i < xyMetrics.length; i++) {
      sheetTitle = "소스_" + xyMetrics[i][0][0];
      nameArr.push(sheetTitle);
    }
    await sheets.add_newSheet_inPython(sheetsId, nameArr);
    for (let i = 0; i < xyMetrics.length; i++) {
      await sheets.update_value_inPython(sheetsId, nameArr[i], xyMetrics[i], [ 0, 0 ]);
    }

    await sheets.setting_cleanView_inPython(sheetsId);
    response = await drive.read_webView_inPython(sheetsId);

    return response;
  } catch (e) {
    instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
    console.log(e);
  }
}

DataRouter.prototype.rou_post_analyticsReport = function () {
  const instance = this;
  const slack = this.mother.slack_bot;
  let obj = {};
  obj.link = "/analyticsReport";
  obj.func = async function (req, res) {
    try {
      const { startDate, endDate, parentId } = req.body;
      const title = "analyticsReport_" + startDate + "_" + endDate;

      instance.async_analyticsReport(startDate, endDate, title, parentId).then(function (link) {
        slack.chat.postMessage({ text: "어널리틱스 보고서가 완성되었습니다! (" + title + ") link: " + link, channel: "#500_marketing" });
      }).catch(function (e) {
        throw new Error(e);
      });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: {} }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingLatestLog = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  let obj = {};
  obj.link = "/parsingLatestLog";
  obj.func = async function (req, res) {
    try {
      if (req.body.idArr === undefined) {
        throw new Error("must be id arr: Array");
      }
      const logDir = `${instance.dir}/log`;
      const idArr = JSON.parse(req.body.idArr);
      const logAll = await fileSystem(`readDir`, [ logDir ]);

      let logParsing, logIdArr;
      let result;
      let tempArr;
      let index;

      logParsing = [];
      logIdArr = [];
      for (let log of logAll) {
        if (log !== `.DS_Store`) {
          tempArr = log.split("__name__");
          logParsing.push({ id: tempArr[0], name: tempArr[1] });
          logIdArr.push(tempArr[0]);
        }
      }

      result = [];
      for (let id of idArr) {
        index = logIdArr.indexOf(id);
        if (index === -1) {
          result.push("-");
        } else {
          result.push(logParsing[index].name);
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingProposal = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/parsingProposal";
  obj.func = async function (req, res) {
    try {
      if (req.body.id === undefined) {
        throw new Error("must be cliid");
      }
      const { id } = req.body;
      const { cases, proid } = await back.getCaseProidById(id, { selfMongo: instance.mongo });
      let project;

      res.set("Content-Type", "application/json");
      if (proid === null) {
        res.send(JSON.stringify({ result: null }));
      } else {
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        if (project === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: {
            proid: project.proid,
            proposal: project.proposal.detail
          }}));
        }
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_manageDeadline = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/manageDeadline";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const { json } = req.body;
      const obj = JSON.parse(json);
      const now = new Date();
      let rows, resultObj;

      if (obj.mode === "set") {

        rows = await back.mongoRead("deadline", { name: obj.name }, { console: true });
        if (rows.length > 0) {
          await back.mongoUpdate("deadline", [ { name: obj.name }, { deadline: new Date(obj.deadline), middleline: new Date(obj.middleline) } ], { console: true });
        } else {
          await back.mongoCreate("deadline", { deadline: new Date(obj.deadline), middleline: new Date(obj.middleline), name: obj.name }, { console: true });
        }

        resultObj = { message: "done" };

      } else if (obj.mode === "get") {

        rows = await back.mongoRead("deadline", { name: obj.name }, { console: true });
        if (rows.length > 0) {
          resultObj = {};
          if (now.valueOf() > rows[0].middleline.valueOf()) {
            resultObj.expired = true;
          } else {
            resultObj.expired = false;
          }
          if (now.valueOf() > rows[0].deadline.valueOf()) {
            resultObj.dead = true;
          } else {
            resultObj.dead = false;
          }
        } else {
          resultObj = { expired: true, dead: true };
        }

      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_alimTalk = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/alimTalk";
  obj.func = async function (req, res) {
    try {
      if (req.body.method === undefined || req.body.name === undefined || req.body.phone === undefined) {
        throw new Error("must be method, name, phone");
      }
      const requestObj = req.body;
      let option;
      if (req.body.option === undefined) {
        option = {};
      } else {
        option = JSON.parse(req.body.option);
        if (/ADDRESS\[/g.test(option.host)) {
          if (/\(ghost\)/gi.test(option.host)) {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].ghost.host;
          } else {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].host;
          }
        }
      }
      await instance.kakao.sendTalk(req.body.method, req.body.name, req.body.phone, option);
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}


DataRouter.prototype.rou_post_getDesignerGhost = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/getDesignerGhost";
  obj.func = async function (req, res) {
    try {
      if (req.body.desid === undefined) {
        throw new Error("must be desid");
      }
      const { desid } = req.body;
      let result, final, tempArr, tempObj;

      result = await back.mongoRead("foreContents", { desid }, { selfMongo: instance.mongolocal });

      final = [];
      for (let { forecast } of result) {
        tempArr = [];
        for (let { file, gs } of forecast) {
          tempObj = {};
          tempObj.link = file;
          tempObj.sgTrue = gs;
          tempArr.push(tempObj);
        }
        final.push(tempArr);
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify(final));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}


// MIDDLE ROUTER

DataRouter.prototype.rou_post_styleEstimation_getImageList = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_getImageList";
  obj.func = async function (req, res) {
    try {
      const contentsArr = await back.getContentsArrByQuery({}, { selfMongo: this.mongo, withTools: true });
      const imagePath = contentsArr.imagePath().keyListImage();
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify(imagePath));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleEstimation_getContentsByPid = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_getContentsByPid";
  obj.func = async function (req, res) {
    try {
      if (req.body.pid === undefined || req.body.pid === null) {
        console.log(req.body);
        throw new Error("invaild request");
      }
      const { pid } = req.body;
      const contentsArr = await back.getContentsArrByQuery({ "contents.portfolio.pid": pid }, { selfMongo: this.mongo });
      let designer;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (contentsArr.length !== 1) {
        res.send(JSON.stringify({}));
      } else {
        designer = await back.getDesignerById(contentsArr[0].desid, { selfMongo: this.mongo });
        contentsArr[0].designer = designer.designer;
        res.send(JSON.stringify(contentsArr[0]));
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleEstimation_getQuestions = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_getQuestions";
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify([
        {
          question: "진한 우드를 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "연한 우드를 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "도장(색면)을 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "금속 스타일 요소를 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "포인트 컬러를 1개 이상 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "색종류 5개 이상을 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "클래식 형태를 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "화이트 톤이 지배적인가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "분위기가 전반적으로 어두운 톤인가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "이 사진은 예외가 되어야 합니다.",
          type: 0,
          children: [
            "동의한다",
            "아니다",
          ]
        },
      ]));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}


//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.setMembers = async function () {
  const instance = this;
  const { pythonExecute } = this.mother;
  try {
    const { members } = JSON.parse(await pythonExecute(this.pythonApp, [ "getMembers" ], {}));
    this.members = members;
  } catch (e) {
    instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
    console.log(e);
  }
}

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(DataRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = DataRouter;


