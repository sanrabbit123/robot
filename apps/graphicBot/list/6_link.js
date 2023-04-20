module.exports = function (arg, info) {
  return [
    "https://home-liaison.xyz:3000/blackPrint",
    async function () {
      const { link } = equalJson(JSON.stringify(POSTCONST));
      await sleep(1000);
      selfHref(stringToLink(link));
    },
  ];
};
