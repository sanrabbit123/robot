const LogRouter = function (slack_bot, MONGOC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const LogReport = require(`${process.cwd()}/apps/logConsole/router/logReport.js`);

  const FacebookAPIs = require(`${process.cwd()}/apps/facebookAPIs/facebookAPIs.js`);
  const NaverAPIs = require(`${process.cwd()}/apps/naverAPIs/naverAPIs.js`);
  const GoogleAds = require(`${process.cwd()}/apps/googleAPIs/googleAds.js`);
  const GoogleYoutube = require(`${process.cwd()}/apps/googleAPIs/googleYoutube.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.mongo = MONGOC;
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.report = new LogReport(MONGOC);
  this.host = this.address.testinfo.host;
  this.slack_bot = slack_bot;

  this.facebook = new FacebookAPIs();
  this.naver = new NaverAPIs();
  this.google = new GoogleAds();
  this.youtube = new GoogleYoutube();
}

LogRouter.prototype.baseMaker = function (target, req = null) {
  const instance = this;
  let html;

  html = `<!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
      <title>HomeLiaison Log Console: ${target}</title>
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
}

LogRouter.prototype.dailyAnalytics = async function () {
  const instance = this;
  const back = this.back;
  const { dateToString, requestSystem, sleep } = this.mother;
  try {
    let date;
    let requestString;

    date = new Date();
    date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() - 1);

    requestString = '';
    requestString += dateToString(date);
    requestString += ',';
    date.setDate(date.getDate() + 1);
    requestString += dateToString(date);
    requestString += ',';
    date.setDate(date.getDate() + 1);
    requestString += dateToString(date);

    await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/analyticsDaily", { date: requestString }, { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    console.log(e);
  }
}

LogRouter.prototype.dailyCampaign = async function (selfMongo) {
  const instance = this;
  try {
    const dayNumber = 3;

    await instance.facebook.dailyCampaign(selfMongo, dayNumber);
    await instance.naver.dailyCampaign(selfMongo, dayNumber);
    await instance.google.dailyCampaign(selfMongo, dayNumber);

  } catch (e) {
    console.log(e);
  }
}

LogRouter.prototype.dailyChannel = async function (selfMongo) {
  const instance = this;
  try {
    const dayNumber = 3;

    await instance.facebook.dailyInstagram(selfMongo, dayNumber);
    await instance.youtube.dailyYoutube(selfMongo, dayNumber);

  } catch (e) {
    console.log(e);
  }
}

LogRouter.prototype.dailySubAnalytics = async function (selfMongo) {
  const instance = this;
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  try {
    const analytics = new GoogleAnalytics();
    const dayNumber = 3;

    await analytics.dailyQuery(selfMongo, dayNumber);

  } catch (e) {
    console.log(e);
  }
}

//GET ---------------------------------------------------------------------------------------------

LogRouter.prototype.rou_get_Root = function () {
  const instance = this;
  const address = this.address;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res, logger) {
    try {
      res.redirect("https://" + address.frontinfo.host);
    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.redirect("https://" + address.frontinfo.host);
    }
  }
  return obj;
}

LogRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, errorLog } = this.mother;
  const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
  const reflection = new MongoReflection();
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {

        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));

      } else if (req.params.id === "disk") {

        const disk = await diskReading();
        reflection.frontReflection().then(() => {
          return instance.dailyCampaign(instance.mongo);
        }).then(() => {
          return instance.dailyChannel(instance.mongo);
        }).then(() => {
          return instance.dailyAnalytics();
        }).then(() => {
          return instance.dailySubAnalytics(instance.mongo);
        }).then(() => {
          return errorLog("front reflection, daily campaign, daily channel done");
        }).catch((err) => { console.log(err); });
        res.send(JSON.stringify({ disk: disk.toArray() }));

      } else {

        const html = await instance.baseMaker(req.params.id, req);
        res.set("Content-Type", "text/html");
        res.send(html);

      }

    } catch (e) {
      errorLog("Log Console 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

LogRouter.prototype.rou_get_Address = function () {
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
      instance.mother.errorLog("Console 서버 문제 생김 (rou_get_Address): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

//POST ---------------------------------------------------------------------------------------------

LogRouter.prototype.rou_post_receiveLog = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  const ignoreList = [ 121130214221, 2201171312 ];
  let obj = {};
  obj.link = [ "/receiveLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.data === undefined) {
        throw new Error("invaild post");
      }
      const collection = "homeliaisonAnalytics";
      const { data } = equalJson(req.body);
      const { page, action, standard, id, value } = data;
      const selfMongo = instance.mongo;
      const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let ipObj, json;

      ipObj = await ipParsing(ip);
      if (ipObj === null) {
        ipObj = { ip };
      }

      json = {
        network: {
          referer,
          userAgent,
          browser,
          os,
          platform,
          mobile: rawUserAgent.isMobile,
          ...ipObj
        },
        date: {
          standard: new Date(Number(standard)),
          now: new Date(),
        },
        data: {
          page,
          action,
          id,
          value
        }
      };

      if (typeof ip === "string") {
        if (!ignoreList.includes(Number(ip.replace(/[^0-9]/gi, '')))) {
          await back.mongoCreate(collection, json, { selfMongo });
        }
      }
      res.send(JSON.stringify(json));

    } catch (e) {
      instance.mother.errorLog("Log Console 서버 문제 생김 (rou_post_receiveLog): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_extractLog = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, stringToDate } = this.mother;
  let obj = {};
  let findBackground, rowsToTong;

  findBackground = async (from, to) => {
    try {
      const collection = "homeliaisonAnalytics";
      let rows;
      rows = await back.mongoRead(collection, {
        $and: [
          { "date.now": { $gte: from } },
          { "date.now": { $lt: to } },
        ]
      }, { selfMongo: instance.mongo });
      return rows;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  rowsToTong = (rows) => {
    let tong;
    let copied;
    tong = {};
    for (let obj of rows) {
      if (typeof tong[obj.data.id] !== "object") {
        tong[obj.data.id] = {};
      }
      copied = equalJson(JSON.stringify(obj));
      delete copied._id;

      tong[obj.data.id].network = copied.network;
      if (!Array.isArray(tong[obj.data.id].history)) {
        tong[obj.data.id].history = [];
      }
      tong[obj.data.id].history.push({
        date: copied.date.now,
        ...copied.data
      });
    }
    for (let key in tong) {
      tong[key].history.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
      });
    }
    return tong;
  }

  obj.link = [ "/extractLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      let id, from, to;
      let rows, tong;

      if (mode === "list") {
        if (typeof req.body.from !== "string" || typeof req.body.to !== "string") {
          throw new Error("must be from, to");
        }

        from = stringToDate(req.body.from);
        to = stringToDate(req.body.to);

        rows = await findBackground(from, to);
        tong = rowsToTong(rows);

      } else if (mode === "get") {
        if (req.body.id === undefined) {
          throw new Error("must be id");
        }
        id = req.body.id;

        from = new Date();
        to = new Date();
        from.setMonth(from.getMonth() - 1);

        rows = await findBackground(from, to);
        tong = rowsToTong(rows);

        if (tong[id] === undefined) {
          tong = {};
        } else {
          tong[id].id = id;
          tong = tong[id];
        }
      } else if (mode === "raw") {
        if (typeof req.body.from !== "string" || typeof req.body.to !== "string") {
          throw new Error("must be from, to");
        }

        from = stringToDate(req.body.from);
        to = stringToDate(req.body.to);

        tong = await findBackground(from, to);
      } else {
        throw new Error("invalid mode");
      }

      res.send(JSON.stringify(tong));
    } catch (e) {
      instance.mother.errorLog("Log Console 서버 문제 생김 (rou_post_extractLog): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_getContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const hideContents = [ "p61" ];
      let limit;
      let contentsArr_raw;
      let contentsArr, designers;
      let reviewArr, indexArr;
      let indexSliceNumber;

      if (req.body.mode === "portfolio" || req.body.mode === "review") {

        contentsArr_raw = await back.getContentsArrByQuery({}, { selfMongo });
        contentsArr_raw = contentsArr_raw.toNormal();
        if (req.body.mode === "review") {
          contentsArr_raw.sort((a, b) => {
            return b.contents.review.detailInfo.order - a.contents.review.detailInfo.order;
          });
        } else {
          contentsArr_raw.sort((a, b) => {
            return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
          });
        }

        if (req.body.limit === undefined) {
          contentsArr = contentsArr_raw;
        } else {
          limit = Number(req.body.limit);
          contentsArr = contentsArr_raw.slice(0, limit);
        }

        if (req.body.pid !== undefined) {
          if (/^re/.test(req.body.pid)) {
            contentsArr = contentsArr.filter((obj) => {
              return obj.contents.review.rid === req.body.pid;
            });
          } else {
            contentsArr = contentsArr.filter((obj) => {
              return obj.contents.portfolio.pid === req.body.pid;
            });
          }
        } else {
          contentsArr = contentsArr.map((obj) => {
            let copied;
            copied = equalJson(JSON.stringify(obj));
            delete copied.contents.portfolio.contents.detail;
            delete copied.contents.review.contents.detail;
            return copied;
          });
        }

        contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
        designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });

        res.send(JSON.stringify({
          contentsArr: contentsArr,
          designers: designers.frontMode(),
        }));

      } else if (req.body.mode === "designer") {

        if (req.body.desid === undefined) {

          designers = await back.getDesignersByQuery({}, { selfMongo });
          contentsArr_raw = await back.getContentsArrByQuery({}, { selfMongo });
          contentsArr_raw = contentsArr_raw.toNormal();
          contentsArr_raw.sort((a, b) => {
            return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
          });
          contentsArr = contentsArr_raw.map((obj) => {
            let copied;
            copied = equalJson(JSON.stringify(obj));
            delete copied.contents.portfolio.contents.detail;
            delete copied.contents.review.contents.detail;
            return copied;
          });
          contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

          res.send(JSON.stringify({
            contentsArr: contentsArr,
            designers: designers.frontMode(),
          }));

        } else {

          designers = await back.getDesignersByQuery({ desid: req.body.desid }, { selfMongo });
          contentsArr_raw = await back.getContentsArrByQuery({ desid: req.body.desid }, { selfMongo });
          contentsArr_raw = contentsArr_raw.toNormal();
          contentsArr_raw.sort((a, b) => {
            return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
          });
          contentsArr = contentsArr_raw;
          contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

          res.send(JSON.stringify({
            contentsArr: contentsArr,
            designers: designers.frontMode(),
          }));

        }

      } else if (req.body.mode === "index") {

        indexSliceNumber = 9;

        contentsArr_raw = await back.getContentsArrByQuery({}, { selfMongo });

        contentsArr = contentsArr_raw.toNormal().filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
        reviewArr = contentsArr_raw.toNormal().filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
        indexArr = contentsArr_raw.toNormal().filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

        contentsArr.sort((a, b) => {
          return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
        });
        reviewArr.sort((a, b) => {
          return b.contents.review.detailInfo.order - a.contents.review.detailInfo.order;
        });
        indexArr.sort((a, b) => {
          return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
        });

        contentsArr = contentsArr.slice(0, indexSliceNumber);
        reviewArr = reviewArr.slice(0, indexSliceNumber);
        indexArr = indexArr.slice(0, indexSliceNumber * 2);

        res.send(JSON.stringify({ contentsArr, reviewArr, indexArr }));
      } else if (req.body.mode === "magazine") {

        contentsArr_raw = await back.mongoRead("magazine", {}, { selfMongo });
        contentsArr_raw.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

        if (req.body.mid !== undefined) {
          contentsArr = contentsArr_raw.filter((obj) => {
            return obj.mid === req.body.mid;
          });
        } else {
          contentsArr = contentsArr_raw.map((obj) => {
            let contents;
            contents = equalJson(JSON.stringify(obj.contents));
            contents.detail = contents.detail.slice(0, 2);
            return {
              magid: obj.magid,
              mid: obj.mid,
              date: obj.date,
              editor: obj.editor,
              contents
            }
          })
        }

        res.send(JSON.stringify({
          contentsArr: contentsArr,
        }));

      }

    } catch (e) {
      instance.mother.errorLog("Log Console 서버 문제 생김 (rou_post_getContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_analyticsGeneral = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/analyticsGeneral" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const analyticsCollection = "dailyAnalytics";
      const { result } = equalJson(req.body);
      let anaid;
      let rows;

      anaid = result.anaid;
      rows = await back.mongoRead(analyticsCollection, { anaid }, { selfMongo });
      if (rows.length !== 0) {
        await back.mongoDelete(analyticsCollection, { anaid }, { selfMongo })
      }
      await back.mongoCreate(analyticsCollection, result, { selfMongo });

      errorLog("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });

      res.send({ message: "success" });
    } catch (e) {
      await errorLog("Log Console 서버 문제 생김 (rou_post_analyticsGeneral): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_analyticsClients = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/analyticsClients" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const analyticsCollection = "dailyClients";
      const { result } = equalJson(req.body);
      let ancid;
      let rows;

      ancid = result.ancid;
      rows = await back.mongoRead(analyticsCollection, { ancid }, { selfMongo });
      if (rows.length !== 0) {
        await back.mongoDelete(analyticsCollection, { ancid }, { selfMongo })
      }
      await back.mongoCreate(analyticsCollection, result, { selfMongo });

      errorLog("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });

      res.send({ message: "success" });
    } catch (e) {
      await errorLog("Log Console 서버 문제 생김 (rou_post_analyticsClients): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_basicReport = function () {
  const instance = this;
  const report = this.report;
  const { errorLog } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/basicReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      report.dailyReports().catch((err) => {
        errorLog("Log console, basic dailyReports error : " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Log console 서버 문제 생김 (rou_post_basicReport): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_marketingMessage = function () {
  const instance = this;
  let obj;
  obj = {};
  obj.link = [ "/marketingMessage" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined || req.body.channel === undefined) {
        throw new Error("invaild post, must be text, channel");
      }
      const { text, channel } = req.body;
      await instance.slack_bot.chat.postMessage({ text, channel });
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.errorLog("Log console 서버 문제 생김 (rou_post_marketingMessage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_errorMessage = function () {
  const instance = this;
  const { errorLog } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/errorMessage" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined) {
        throw new Error("invaild post, must be text");
      }
      const { text } = req.body;
      await errorLog(text);
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Log console 서버 문제 생김 (rou_post_errorMessage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const back = this.back;
  const parser = require("ua-parser-js");
  const { equalJson, ipParsing, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const collection = "homeliaisonAnalytics";
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      let name;
      let custom;
      let ip, referer;
      let thisData;
      let thisId;
      let ipObj;
      let safeNum;
      let parserResult;
      let user;

      thisData = equalJson(req.body);
      if (typeof thisData.info === "object" && thisData.info !== null) {
        ip = thisData.info.ip;
        referer = thisData.info.referer;
        user = thisData.info.userAgent;
      } else {
        ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
        referer = (req.headers.referer === undefined ? "" : req.headers.referer);  
        user = userAgent;
      }

      if (typeof thisData.id === "string") {
        thisId = thisData.id;
      } else {
        thisId = "(not set)";
      }

      name = "fromServer_" + thisData.action;

      ipObj = await ipParsing(ip);

      safeNum = 0;
      while (Object.keys(ipObj).length === 0) {
        if (safeNum > 10) {
          break;
        }
        await sleep(100);
        ipObj = await ipParsing(ip);
        safeNum = safeNum + 1;
      }

      custom = {
        id: thisData.id,
        network: {
          ip,
          referer,
          userAgent,
          browser,
          os,
          platform,
          mobile: rawUserAgent.isMobile,
          ...ipObj
        },
        date: (new Date()).valueOf(),
        data: {
          page: thisData.page,
          action: thisData.action,
          raw: thisData.data,
        }
      };

      thisData.date = new Date();
      thisData.network = { ...ipObj };

      try {
        parserResult = parser(user);

        delete parserResult.cpu;
        delete parserResult.ua;
        delete parserResult.engine;

        parserResult.browser = parserResult.browser.name;
        parserResult.os.browser = parserResult.browser;

        delete parserResult.browser;
  
        if (parserResult.os.name === "Windows") {
          if (parserResult.device.vendor === undefined) {
            parserResult.device.vendor = "Unknown";
          }
          if (parserResult.device.model === undefined) {
            parserResult.device.model = "Unknown";
          }
          parserResult.device.type = "desktop";
        } else if (/Mac OS/gi.test(parserResult.os.name)) {
          parserResult.device.type = "desktop";
        }
  
        if (parserResult.device.vendor === undefined) {
          parserResult.device.vendor = "Unknown";
        }
        if (parserResult.device.model === undefined) {
          parserResult.device.model = "Unknown";
        }
        if (parserResult.device.type === undefined) {
          parserResult.device.type = "desktop";
        }

        thisData.device = equalJson(JSON.stringify(parserResult));
      } catch {
        thisData.device = {};
      }

      await back.mongoCreate(collection, thisData, { selfMongo: instance.mongo });

      instance.facebook.conversionEvent({
        name,
        data: {
          ip: ip,
          userAgent: userAgent,
        },
        custom,
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Log console 서버 문제 생김 (rou_post_getAnalytics): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_updateContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageLog, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/updateContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery, updateQuery } = equalJson(req.body);
      let data;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (Object.keys(whereQuery).length === 0) {
        throw new Error("query ban");
      }
      if (typeof updateQuery !== "object" || updateQuery === null) {
        throw new Error("invaild query object");
      }

      data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
      res.send(JSON.stringify({ message: data }));

    } catch (e) {
      errorLog("Log console 문제 생김 (rou_post_updateContents): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

LogRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageLog, messageSend, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/getClientReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.fromYear === undefined || req.body.fromMonth === undefined || req.body.toYear === undefined || req.body.toMonth === undefined) {
        throw new Error("invalid post");
      }
      const { fromYear, fromMonth, toYear, toMonth } = equalJson(req.body);
      const selfMongo = instance.mongo;
      let fromDate, toDate;
      let monthlyAnalytics;
      let thisFrom, thisTo;
      let tempRows;
      let tempRows2;

      fromDate = new Date(fromYear, fromMonth - 1, 1);
      toDate = new Date(toYear, toMonth, 1);

      monthlyAnalytics = await back.mongoRead("complexAnalytics", {
        $and: [
          { "date.from": { $gte: fromDate }, },
          { "date.to": { $lte: toDate } },
        ]
      }, { selfMongo });

      monthlyAnalytics = monthlyAnalytics.map((obj) => {
        let resultObj;
        let copiedDate;

        copiedDate = new Date(JSON.stringify(obj.date.from).slice(1, -1));
        copiedDate.setDate(copiedDate.getDate() + 10);

        resultObj = {};

        resultObj.standard = copiedDate;
        resultObj.year = copiedDate.getFullYear();
        resultObj.month = copiedDate.getMonth() + 1;
        resultObj.mau = obj.data.users.total;

        return resultObj;
      })

      monthlyAnalytics.sort((a, b) => {
        return a.standard.valueOf() - b.standard.valueOf();
      })

      for (let obj of monthlyAnalytics) {
        thisFrom = new Date(obj.year, obj.month - 1, 1);
        thisTo = new Date(obj.year, obj.month - 1, 1);
        thisTo.setMonth(thisTo.getMonth() + 1);
        
        tempRows = await back.mongoRead("dailyClients", {
          $and: [
            { "date.from": { $gte: thisFrom }, },
            { "date.to": { $lte: thisTo } },
          ]
        }, { selfMongo });
        
        obj.adClients = tempRows.map((obj) => { return obj.data.detail }).flat().filter((obj2) => {
          return obj2.users.some((obj3) => {
            if (obj3 === null) {
              return false;
            } else {
              return !/not set/gi.test(obj3.source.campaign)
            }
          })
        }).length;

        tempRows2 = await back.mongoRead("dailyCampaign", {
          $and: [
            { "date.from": { $gte: thisFrom }, },
            { "date.to": { $lte: thisTo } },
          ]
        }, { selfMongo });

        obj.charge = tempRows2.map((obj2) => { return obj2.value.charge }).reduce((acc, curr) => { return acc + curr }, 0);
      }

      res.send(JSON.stringify(monthlyAnalytics));

    } catch (e) {
      errorLog("Log console 문제 생김 (rou_post_getClientReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

LogRouter.policy = function () {
  let text = '';
  text += "<b>개인정보 처리 방침</b><br><br><b>제1조 총칙</b><br><br>① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, ";
  text += "주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>";
  text += "② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>③ 홈리에종은 ‘정보통신망 ";
  text += "이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.";
  text += "<br>⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br><br><b>제2조 개인정보의 수집항목 및 목적</b><br><br>";
  text += "① 모든 회원은 홈리에종이 제공하는 다양한 서비스를 이용할 수 있습니다. 홈리에종이 처리하고 있는 개인정보는 다음의 수집/이용 목적 이외의 용도로는 활용되지 않으며, 수집/이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.";
  text += "<br>② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>③ 홈리에종은 다음과 같이 회원의 ";
  text += "개인정보를 수집합니다.<br>④ 회원 가입시, 문의사항 작성시 : User name, E-mail, 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)";
  text += "<br>⑤ 구매자 결제진행시 : 전화번호, 주소, 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌 번호 등";
  text += "디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>⑧ 개인정보의 이용목적<br>⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 ";
  text += "회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 ";
  text += "이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>⑪ 신규 서비스 개발 및 마케팅 광고에의 활용 : 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 ";
  text += "특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 ";
  text += "구축 등<br><br><b>제3조 개인정보 제3자 제공</b><br><br>① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>② 홈리에종은 개인정보를  ‘개인정보 수집항목 ";
  text += "및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 ";
  text += "받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 ";
  text += "개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.";
  text += "<br>⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br><b>제4조 개인정보 처리위탁</b><br><br>① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 ";
  text += "처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>③ 개인정보 처리위탁을 하는 업무의 내용";
  text += "<br>④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>⑥ E-mail 및 문자 발송 : mailchimp, 알리고(서비스 운영관련 알림 및 정보 제공)<br>⑦ ";
  text += "배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br><br><b>제5조 개인정보의 보유 및 이용기간</b><br><br>① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 ";
  text += "개인정보를 파기합니다.<br>② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>③ ";
  text += "홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 ";
  text += "사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 ";
  text += "및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>⑧ 소비자의 ";
  text += "불만 또는 분쟁처리에 관한 기록 : 3년<br>⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>⑫ 개인정보 ";
  text += "파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br><br><b>제6조 개인정보의 수집 및 이용을 ";
  text += "거부할 권리</b><br><br>개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br><br><b>제7조 링크 사이트에 대한 책임</b><br><br>홈리에종은 ";
  text += "회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 \“개인정보처리방침\”이 적용되지 않습니다.<br><br><b>제8조 회원 및 법정대리인의 권리</b><br><br>① 회원 및 법정 대리인은 ";
  text += "언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 ";
  text += "이에 대해 지체없이 조치하겠습니다.<br>③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 ";
  text += "통지하여 정정이 이루어지도록 하겠습니다.<br>④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 ";
  text += "개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 \“개인정보의 보유 ";
  text += "및 이용기간\”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br><b>제9조 개인정보의 기술적, 관리적 보호대책</b><br><br>① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 ";
  text += "등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.";
  text += "<br>③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>⑤ ";
  text += "민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 ";
  text += "내부방침 등의 준수를 강조하고 있습니다.<br>⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 ";
  text += "최선을 다하고 있습니다.<br><br><b>제10조 개인정보보호 책임자</b><br><br>① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 ";
  text += "지정하고 있습니다.<br>② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다.";
  text += "홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br><br><b>제11조 기타 개인정보침해에 대한 신고 및 상담</b><br><br>① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관";
  text += "소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>";
  text += "③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do ";
  text += "(국번없이) 182<br><br><b>제12조 고지의 의무</b><br><br>현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 ";
  text += "내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.";
  text = text.replace(/[\=\&]/g, '');
  return text;
}

LogRouter.policyButton = function () {
  let obj;
  obj = {};
  obj.off = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#575757"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#575757"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#575757"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#575757"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#575757"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#575757"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#575757"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#575757"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#575757"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#575757"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#575757"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#575757"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#575757"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#575757"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#575757"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#575757"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#575757"/><circle cx="4.604" cy="10.231" r="4.604" fill="#ECECEC"/></svg>';
  obj.on = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#2FA678"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#2FA678"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#2FA678"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#2FA678"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#2FA678"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#2FA678"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#2FA678"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#2FA678"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#2FA678"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#2FA678"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#2FA678"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#2FA678"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#2FA678"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#2FA678"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#2FA678"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#2FA678"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#2FA678"/><circle cx="4.604" cy="10.231" r="4.604" fill="#2FA678"/></svg>';
  return obj;
}

LogRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(LogRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = LogRouter;
