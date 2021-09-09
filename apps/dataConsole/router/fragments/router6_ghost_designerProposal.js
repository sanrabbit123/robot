DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const { slack_bot, requestSystem } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res) {
    try {
      res.set({ "Content-Type": "application/json" });
      let { cliid, proid, desid, name, phone, designer, method } = req.body;
      await requestSystem("https://" + address.pythoninfo.host + ":3000/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
      await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });
      slack_bot.chat.postMessage({ text: `${name} 고객님이 ${designer}(${desid}) 디자이너를 선택하셨습니다! 알림톡이 갔으니 확인 연락 부탁드립니다!\n${name} 고객님 : https://${address.backinfo.host}/client?cliid=${cliid}\n제안서 : https://${address.homeinfo.ghost.host}/middle/proposal?proid=${proid}&mode=test\n디자이너 : https://${address.backinfo.host}/designer?desid=${desid}`, channel: "#400_customer" });
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
      console.log(e);
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
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_getDesigners";
  obj.func = async function (req, res) {
    try {
      if (req.body.whereQuery === undefined || req.body.startDate === undefined || req.body.endDate === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery, startDate, endDate } = equalJson(req.body);
      const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
      const designersRealTime = await back.mongoRead("realtimeDesigner", whereQuery, { selfMongo: instance.mongolocal });
      const margin = 10;
      let designersNormal;
      let boo;

      startDate.setDate(startDate.getDate() + margin);
      endDate.setDate(endDate.getDate() - margin);

      boo = false;
      for (let designerRealTime of designersRealTime) {
        boo = false;
        for (let { start, end } of designerRealTime.possible) {
          if (start.valueOf() <= startDate.valueOf() && endDate.valueOf() <= end.valueOf()) {
            boo = true;
          }
          if (boo) {
            break;
          }
        }
        designers.search(designerRealTime.desid).end = !boo;
      }

      designersNormal = designers.toNormal();
      for (let d of designersNormal) {
        d.end = designers.search(d.desid).end;
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(designersNormal));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김(designerProposal_getDesigners) : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
