module.exports = function (arg, info) {
  return [
    "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
    async function () {
      const idLoginButtonId = "anchor15";
      const returnButtonId = "anchor25";
      const inputs = {
        id: "iptUserId",
        pwd: "iptUserPw"
      };

      while (document.getElementById(idLoginButtonId) === null) {
        await sleep(500);
      }

      document.getElementById(idLoginButtonId).click();
      document.getElementById(inputs.id).value = INFO.find((obj) => { return obj.name === "hometax"; }).user;
      document.getElementById(inputs.pwd).value = INFO.find((obj) => { return obj.name === "hometax"; }).password;
      document.getElementById(returnButtonId).click();
    },
    "toss: https://tecr.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/cr/c/b/UTECRCB041.xml",
    async function () {
      const { amount, phone } = equalJson(JSON.stringify(POSTCONST));
      await sleep(1000);
      await injectionInput(document.getElementById("trsAmt"), String(amount), true);
      await sleep(1000);
      await injectionInput(document.getElementById("spstCnfrNoEncCntn"), String(phone), true);
      await sleep(1000);
      await clickElement(document.querySelector("#trigger4"), false, null, true, true);
      await sleep(1000);
    },
  ];
};
