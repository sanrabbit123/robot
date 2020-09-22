module.exports = function (tools) {
  const { Mother, Notion } = tools;
  const { mongo, mongoinfo } = Mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  return async function (tong) {
    try {
      await MONGOC.connect();
      let row, totalTong;
      totalTong = [];
      for (let i = 0; i < tong.length; i++) {
        row = await MONGOC.db("miro81").collection("Project").find({ cliid: tong[i].cliid }).toArray();
        if (row.length > 0) {
          tong[i].request[0].thirdProposal.proid = row[0].proid;
        }
        totalTong.push(tong[i]);
      }
      return totalTong;
    } catch (e) {
      console.log(e);
    } finally {
      await MONGOC.close();
      console.log("from project done");
    }
  }
}
