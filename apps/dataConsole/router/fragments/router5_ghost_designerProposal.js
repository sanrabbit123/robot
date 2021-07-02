DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const { slack_bot } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res) {
    try {
      res.set({ "Content-Type": "application/json" });
      let { cliid, proid, desid, name, phone, designer } = req.body;
      slack_bot.chat.postMessage({ text: `${name} 고객님이 ${designer}(${desid}) 디자이너를 선택하셨습니다! 알림톡이 갔으니 확인 연락 부탁드립니다!\n${name} 고객님 : https://${address.backinfo.host}/client?cliid=${cliid}\n제안서 : https://${address.homeinfo.ghost.host}/middle/proposal?proid=${proid}\n디자이너 : https://${address.backinfo.host}/designer?desid=${desid}`, channel: "#400_customer" });
      await instance.kakao.sendTalk("designerSelect", name, phone, {
        client: name,
        designer: designer,
        host: address.frontinfo.host,
        path: "payment.php",
      });
      res.send(JSON.stringify({ index: 0 }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
