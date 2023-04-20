module.exports = function (arg, info) {
  return [
    "https://naver.com",
    async function () {
      const { link } = equalJson(JSON.stringify(POSTCONST));
      await sleep(2000);
      selfHref(stringToLink(link));
    },
  ];
};
