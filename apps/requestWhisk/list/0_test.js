module.exports = {
  method: "get",
  url: "https://google.com",
  data: {},
  headers: {},
  interval: 1000 * 60 * 3,
  callBack: async function (mother, back, raw) {
    console.log(raw);
  }
};
