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
