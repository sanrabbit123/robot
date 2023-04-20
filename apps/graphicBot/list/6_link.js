module.exports = function (arg, info) {
  return [
    "https://naver.com",
    async function () {

      const { link } = equalJson(JSON.stringify(POSTCONST));

      console.log(link);
      console.log(stringToLink(link));
      console.log(selfHref);

      await sleep(5000);
    },
  ];
};
