module.exports = function (tools) {
  const { Mother, Notion } = tools;
  return async function (tong) {
    try {
      // let totalTong = [];

      // return totalTong;

      return tong;

    } catch (e) {
      console.log(e);
    } finally {
      console.log("from notion done");
    }
  }
}
