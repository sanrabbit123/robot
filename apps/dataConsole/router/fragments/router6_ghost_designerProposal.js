DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const { slack_bot, requestSystem, ghostRequest } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res) {
    res.set({ "Content-Type": "application/json" });
    try {
      let { cliid, proid, desid, name, phone, designer, method } = req.body;
      let thisProject, thisClient, requestNumber;
      let action;

      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      thisClient = await back.getClientById(cliid, { selfMongo: instance.mongo });
      requestNumber = 0;
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      action = "디자이너 선택";

      await requestSystem("https://" + address.pythoninfo.host + ":3000/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
      await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });

      slack_bot.chat.postMessage({ text: `${name} 고객님이 ${designer}(${desid}) 디자이너를 선택하셨습니다! 알림톡이 갔으니 확인 연락 부탁드립니다!\n${name} 고객님 : https://${address.backinfo.host}/client?cliid=${cliid}\n제안서 : https://${address.homeinfo.ghost.host}/middle/proposal?proid=${proid}&mode=test\n디자이너 : https://${address.backinfo.host}/designer?desid=${desid}`, channel: "#400_customer" });
      ghostRequest("voice", { text: `${name} 고객님이 ${designer} 디자이너를 선택하셨어요.` }).then(() => {
        return requestSystem("https://" + address.backinfo.host + ":3000/generalMongo", {
          mode: "sse",
          db: "console",
          collection: "sse_clientCard",
          log: true,
          who: "autoBot",
          updateQuery: {
            cliid,
            requestNumber,
            mode: "action",
            from: thisClient.requests[requestNumber].analytics.response.action.value,
            to: action,
            randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
          }
        }, { headers: { "origin": "https://" + address.homeinfo.ghost.host, "Content-Type": "application/json" } });
      }).then(() => {
        let updateObj;
        updateObj = {};
        updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
        return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
      }).catch((err) => {
        instance.mother.slack_bot.chat.postMessage({ text: "Ghost Client 서버 문제 생김 (designerProposal_submit) : " + err.message, channel: "#error_log" });
      });

      await instance.kakao.sendTalk("designerSelect", name, phone, {
        client: name,
        designer: designer,
        host: address.homeinfo.ghost.host,
        path: "estimation",
        cliid: cliid,
        needs: ("style," + desid + "," + proid + "," + method),
      });

      res.send(JSON.stringify({ index: 0 }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Ghost Client 서버 문제 생김 (designerProposal_submit) : " + e.message, channel: "#error_log" });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_policy = function () {
  const instance = this;
  const { slack_bot } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_policy";
  obj.func = async function (req, res) {
    try {
      res.set({ "Content-Type": "application/json" });
      let resultObj;
      resultObj = {
        policy: DataRouter.policy(),
        button: DataRouter.policyButton(),
      };
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_getDesigners = function () {
  const instance = this;
  const { equalJson } = this.mother;
  const back = this.back;
  const work = this.work;
  let obj = {};
  obj.link = "/designerProposal_getDesigners";
  obj.func = async function (req, res) {
    res.set("Content-Type", "application/json");
    try {
      if (req.body.whereQuery === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery, proid } = equalJson(req.body);
      const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
      let designersNormal;
      let designerNormal;
      let realtime;
      designersNormal = [];
      for (let designer of designers) {
        realtime = await work.realtimeDesignerMatch(designer.desid, proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
        designerNormal = designer.toNormal();
        designerNormal.end = !realtime.result;
        designersNormal.push(designerNormal);
      }
      res.send(JSON.stringify(designersNormal));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김(designerProposal_getDesigners) : " + e.message, channel: "#error_log" });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}
