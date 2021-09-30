module.exports = function (arg, info) {
  return [
    "https://map.naver.com/v5",
    async function () {
      try {

        await sleep(30000);
        console.log("this!");


      } catch (e) {
        console.log(e);
      }
    }
  ];
};
