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
          question: "도장(가구,벽)을 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "금속 재질을 사용하였는가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "전체적으로 모노톤인가?",
          type: 0,
          children: [
            "그렇다",
            "아니다",
          ]
        },
        {
          question: "포인트 컬러를 사용했거나, 비비드한가?",
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
          question: "스타일링 요소가 많은 편인가, 적은 편인가?",
          type: 0,
          children: [
            "많은듯",
            "적은듯",
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

DataRouter.prototype.rou_post_styleEstimation_setData = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_setData";
  obj.func = async function (req, res) {
    try {
      if (req.body.pid === undefined || req.body.room === undefined || req.body.index === undefined || req.body.who === undefined || req.body.value === undefined) {
        throw new Error("invaild request");
      }
      const collection = "styleEstimation";
      const { pid, room } = req.body;
      const value = JSON.parse(req.body.value);
      const who = Number(req.body.who);
      const index = Number(req.body.index);
      let id, json, row;

      id = pid + "_" + room;
      json = { id, date: new Date(), who, index, value };

      row = await back.mongoRead(collection, { id, who }, { selfMongo: instance.mongolocal });
      if (row.length === 0) {
        await back.mongoCreate(collection, json, { selfMongo: instance.mongolocal });
      } else {
        await back.mongoUpdate(collection, [ { id, who }, { date: json.date, index, value } ], { selfMongo: instance.mongolocal });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleEstimation_getData = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_getData";
  obj.func = async function (req, res) {
    try {
      if (req.body.who === undefined) {
        throw new Error("invaild request");
      }
      const who = Number(req.body.who);
      if (Number.isNaN(who)) {
        throw new Error("invaild request");
      }
      const collection = "styleEstimation";
      let row, initialNumber;
      let assign;

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      assign = [
        0,
        1,
        0,
        321,
        441,
        0,
        121,
        201
      ];
      row = await back.mongoRead(collection, { who }, { selfMongo: instance.mongolocal });
      initialNumber = assign[who];

      if (row.length === 0) {
        res.send(JSON.stringify({ index: initialNumber - 1 }));
      } else {
        row.sort((a, b) => { return b.index - a.index; });
        res.send(JSON.stringify({ index: row[0].index }));
      }
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ index: 0 }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
