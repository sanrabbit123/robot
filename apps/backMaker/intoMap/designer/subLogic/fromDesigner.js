module.exports = function (tools) {
  const { Mother, Notion, Filters } = tools;
  const { mongo, mongoinfo } = Mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  return async function (tong) {
    try {
      await MONGOC.connect();
      let row, totalTong, targetRow;
      let tempObj, tempObjDetail;
      totalTong = [];
      for (let i = 0; i < tong.length; i++) {
        row = await MONGOC.db("miro81").collection("Designer").find({ desid: tong[i].desid }).toArray();
        if (row.length > 0) {
          targetRow = row[0];

          tong[i].setting.proposal = [];
          for (let obj of targetRow.picture.settings) {
            tempObj = {};
            tempObj.name = obj.name;
            tempObjDetail = obj.value.pop();
            tempObj.photo = obj.value;
            tempObj.description = Object.values(tempObjDetail);
            tong[i].setting.proposal.push(tempObj);
          }
          tong[i].setting.ghost = targetRow.picture.ghost;

          totalTong.push(tong[i]);
        }
      }
      return totalTong;
    } catch (e) {
      console.log(e);
    } finally {
      await MONGOC.close();
    }
  }
}
