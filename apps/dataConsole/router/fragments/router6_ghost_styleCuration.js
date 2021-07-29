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
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_updateCalculation";
  obj.func = async function (req, res) {
    try {
      if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined) {
        throw new Error("invaild post");
      }
      const cliid = req.body.cliid;
      const historyQuery = equalJson(req.body.historyQuery);
      const coreQuery = equalJson(req.body.coreQuery);
      const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
      if (clientCase === null) {
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({}));
      } else {
        await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        } else {
          await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
        }
        const serviceCase = clientCase.caseService();
        if (serviceCase !== null) {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify(serviceCase));
        } else {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({}));
        }
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
