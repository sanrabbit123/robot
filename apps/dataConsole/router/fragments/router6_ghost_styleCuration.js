DataRouter.prototype.rou_post_styleCuration_getPhotos = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleCuration_getPhotos";
  obj.func = async function (req, res) {
    try {
      const selfMongo = instance.mongo;
      const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const exceptionList = [
        "t16a41.jpg",
        "t1p36.jpg",
        "t1a33.jpg",
        "t1a20.jpg",
        "t2a33.jpg",
        "t5a27.jpg",
        "t8p9.jpg",
        "t13a27.jpg",
        "t19a41.jpg",
        "t1p12.jpg",
        "t9a37.jpg"
      ];

      let photos, sendingDesigners, temp;

      photos = contentsArr.getAllPhotos();
      sendingDesigners = [];
      for (let designer of designers) {
        temp = designer.toNormal();
        temp.tendency = designer.analytics.styling.tendency.toMatrix();
        sendingDesigners.push(temp);
      }
      for (let obj of photos) {
        for (let designer of designers) {
          if (obj.desid === designer.desid) {
            obj.tendency = designer.analytics.styling.tendency.toMatrix();
            break;
          }
        }
      }
      photos = photos.filter((obj) => { return !/before/gi.test(obj.room) && !/withdesigner/gi.test(obj.room) && !exceptionList.includes(obj.file) });
      photos = photos.map((obj) => {
        obj.keywords = obj.keywords.filter((s) => { return !/아파트/gi.test(s) && !/거주중/gi.test(s) && !/아기/gi.test(s) && !/아이/gi.test(s) && !/부부/gi.test(s) && !/가족/gi.test(s) && !/소품/gi.test(s) && !/거실/gi.test(s) && !/주방/gi.test(s) && !/신축/gi.test(s) && !/서재/gi.test(s) && !/톤앤/gi.test(s) && !/스타일링/gi.test(s) && !/조명/gi.test(s) && !/오피스텔/gi.test(s) && !/홈스타일링/gi.test(s) && !/홈퍼니싱/gi.test(s) && !/토탈/gi.test(s) && !/인테리어/gi.test(s) && !/인가구/gi.test(s) && !/다이닝/gi.test(s) && !/깔끔/gi.test(s) && !/인스타/gi.test(s) && !/아이/gi.test(s); });
        return obj;
      });
      photos = photos.filter((obj) => { return !obj.tendency.every((num) => { return num === 0; }); });

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ photos, contentsArr, designers: sendingDesigners }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_updateCalculation = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const { equalJson, ghostRequest } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_updateCalculation";
  obj.func = async function (req, res) {
    try {
      if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined || req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const cliid = req.body.cliid;
      const historyQuery = equalJson(req.body.historyQuery);
      const coreQuery = equalJson(req.body.coreQuery);
      const mode = req.body.mode;
      let history;

      if (Object.keys(coreQuery).length > 0) {
        await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
      }

      if (Object.keys(historyQuery).length > 0) {
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (history === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        }
        await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
      const client = clientCase.client;
      if (clientCase === null) {
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({}));
      } else {
        const service = clientCase.caseService();
        if (service === null) {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({}));
        } else {

          const detail = await work.designerCuration(cliid, 4, history.curation.service.serid, { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal });
          let detailUpdate, updateQuery;
          let newProid;

          if (detail.length !== 0) {

            detailUpdate = [];
            for (let obj of detail) {
              detailUpdate.push(obj.toNormal());
            }

            updateQuery = {};
            updateQuery["desid"] = "";
            updateQuery["proposal.status"] = "작성중";
            updateQuery["cliid"] = cliid;
            updateQuery["service.serid"] = history.curation.service.serid[0];
            updateQuery["service.xValue"] = (service.xValue.length === 0 ? "M" : service.xValue[0].xValue);
            updateQuery["service.online"] = false;
            updateQuery["proposal.detail"] = detailUpdate;

            back.createProject(updateQuery, { selfMongo: instance.mongo }).then((proid) => {
              newProid = proid;
              //DEV => name, phone
              return instance.kakao.sendTalk("curationComplete", "배창규", "010-2747-3403", { client: client.name });
            }).then(() => {
              return ghostRequest("voice", { text: client.name + " 고객님의 제안서가 자동으로 제작되었습니다!" });
            }).then(() => {
              instance.mother.slack_bot.chat.postMessage({ text: client.name + " 고객님의 제안서가 자동으로 제작되었습니다! 확인부탁드립니다!\nlink: " + "https://" + instance.address.backinfo.host + "/proposal?proid=" + newProid, channel: "#400_customer" });
            }).catch((err) => {
              console.log(err);
              instance.mother.slack_bot.chat.postMessage({ text: client.name + " 제안서 제작 문제 생김" + err.message, channel: "#error_log" });
            });

            res.set({ "Content-Type": "application/json" });
            res.send(JSON.stringify({ service: detailUpdate, client, history }));

          } else {

            res.set({ "Content-Type": "application/json" });
            res.send(JSON.stringify({ service: [], client, history }));

          }

        }
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_updateAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_updateAnalytics";
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined || req.body.cliid === undefined) {
        throw new Error("invaild post");
      }
      const { mode, cliid } = req.body;
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let whereQuery, updateQuery;
      let history;
      let update;
      let image;
      let ipObj;

      whereQuery = { cliid };
      history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      if (mode === "page") {

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        history.curation.analytics.page.push({ date: new Date(), referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
        updateQuery = {};
        updateQuery["curation.analytics.page"] = history.curation.analytics.page;
        if (req.body.liteMode === "false") {
          updateQuery["curation.analytics.full"] = true;
        }

        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "update") {

        update = equalJson(req.body.update);
        history.curation.analytics.update.push({ date: new Date(), update });
        updateQuery = {};
        updateQuery["curation.analytics.update"] = history.curation.analytics.update;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        if (req.body.updateQuery !== undefined) {
          const { history: historyQuery, core: coreQuery } = equalJson(req.body.updateQuery);
          if (historyQuery !== null && typeof historyQuery === "object" && Object.keys(historyQuery).length > 0) {
            await back.updateHistory("client", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });
          }
          if (coreQuery !== null && typeof coreQuery === "object" && Object.keys(coreQuery).length > 0) {
            await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
          }
        }

      } else if (mode === "submit") {

        history.curation.analytics.submit.push({ date: new Date() });
        updateQuery = {};
        updateQuery["curation.analytics.submit"] = history.curation.analytics.submit;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "image") {

        image = equalJson(req.body.image);
        updateQuery = {};
        updateQuery["curation.image"] = image;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else {
        throw new Error("invaild mode");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
