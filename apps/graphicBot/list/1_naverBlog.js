module.exports = function (proid, info) {
  return [
    "https://nid.naver.com/nidlogin.login",
    async function () {
      try {

        await sleep(500);
        while (document.getElementById("id") === null) {
          await sleep(500);
        }
        await clickElement(document.getElementById("id"));
        await sleep(500);
        await injectionInput(document.getElementById("id"), "homeliaison");
        await sleep(500);
        await clickElement(document.getElementById("pw"));
        await clickElement(document.getElementById("pw"));
        await sleep(500);
        await injectionInput(document.getElementById("pw"), "Hlo!fwis83!");
        await sleep(500);

        await clickElement(document.getElementById("log.login"));

      } catch (e) {
        console.log(e);
      }
    },
    "toss: https://blog.stat.naver.com/blog/download?blogId=homeliaison",
    async function () {
      try {

        await sleep(3000);

      } catch (e) {
        console.log(e);
      }
    }
  ];
};
