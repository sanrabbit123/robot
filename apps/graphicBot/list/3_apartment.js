module.exports = function (arg, info) {
  return [
    "https://map.naver.com/v5",
    async function () {
      try {
        let rawAddress;


        rawAddress = "세종특별자치시 다솜로 50 중흥 센텀뷰";

        if (document.querySelector('.input_search') !== null) {
          await injectionInput(document.querySelector('.input_search'), rawAddress);
          await pressKey("enter");
        }




        console.log("this!");
        await sleep(30000);





      } catch (e) {
        console.log(e);
      }
    }
  ];
};
