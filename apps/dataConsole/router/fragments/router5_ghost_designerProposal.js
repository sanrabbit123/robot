DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const { requestSystem, messageSend } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      await requestSystem("https://" + address.officeinfo.host + ":3002/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
      await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });

      messageSend({ text: `${name} 고객님이 ${designer} 디자이너를 선택하셨어요.`, channel: "#400_customer", voice: true }).then(() => {
        let updateObj;
        updateObj = {};
        updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
        return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
      }).catch((err) => {
        logger.error({ text: "Console 서버 문제 생김 (designerProposal_submit) : " + err.message, channel: "#error_log" }).catch((e) => { console.log(e); });
      });

      await instance.kakao.sendTalk("designerSelect", name, phone, {
        client: name,
        designer: designer,
        host: address.frontinfo.host,
        cliid: cliid,
        needs: ("style," + desid + "," + proid + "," + method),
      });

      res.send(JSON.stringify({ index: 0 }));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (designerProposal_submit) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_policy = function () {
  const instance = this;
  const { equalJson } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_policy";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let resultObj;
      resultObj = {
        policy: DataRouter.policy(),
        button: DataRouter.policyButton(),
      };
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_designerProposal_policy): " + e.message);
      res.send(JSON.stringify({
        policy: DataRouter.policy(),
        button: DataRouter.policyButton(),
      }));
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
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery, proid } = equalJson(req.body);
      const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
      let designersNormal;
      let designerNormal;
      let realtime;
      let thisDesigner;
      let designerMode;

      designerMode = false;
      if (req.body.designerMode !== undefined) {
        if (req.body.designerMode === 1 || req.body.designerMode === '1') {
          designerMode = true;
        }
      }

      if (!designerMode) {
        designersNormal = [];
        for (let { desid } of thisProject.proposal.detail) {
          thisDesigner = designers.find((d) => { return d.desid === desid });
          realtime = await work.realtimeDesignerMatch(desid, proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
          designerNormal = thisDesigner.toNormal();
          designerNormal.end = !realtime.result;
          designersNormal.push(designerNormal);
        }
        res.send(JSON.stringify(designersNormal));
      } else {
        designersNormal = [];
        for (let { desid } of designers) {
          thisDesigner = designers.find((d) => { return d.desid === desid });
          designerNormal = thisDesigner.toNormal();
          designerNormal.end = false;
          designersNormal.push(designerNormal);
        }
        res.send(JSON.stringify(designersNormal));
      }

    } catch (e) {
      await logger.error("Console 서버 문제 생김(designerProposal_getDesigners) : " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}
