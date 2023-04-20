module.exports = function (arg, info) {
  return [
    "https://naver.com",
    async function () {
      const { link } = equalJson(JSON.stringify(POSTCONST));
      await SelfServicePortal(5000);
      selfHref(stringToLink(link));
    },
  ];
};
