module.exports = {
  method: "get",
  url: "https://google.com",
  data: {},
  headers: {},
  interval: 100,
  callBack: async function (mother, raw) {
    console.log(raw);
  }
};
