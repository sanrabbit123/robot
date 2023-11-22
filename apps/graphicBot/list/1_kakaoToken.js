module.exports = function (proid, info) {
  return [
    "https://kakao.com",
    async function () {
      try {
        await sleep(500);
        window.location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7c646aef29f8c1a06c13e1af68c9a54c&redirect_uri=https%3A%2F%2Fhome-liaison.net%2FkakaoRedirect";
        await sleep(3000);
      } catch (e) {
        console.log(e);
      }
    },
  ];
};
