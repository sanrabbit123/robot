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

            for (let j of tempObj.photo) {
              if (/a04/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a04/g, 'a4');
                j.imgSrc = j.imgSrc.replace(/a04/g, 'a4');
              }
              if (/a05/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a05/g, 'a5');
                j.imgSrc = j.imgSrc.replace(/a05/g, 'a5');
              }
              if (/a08/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a08/g, 'a8');
                j.imgSrc = j.imgSrc.replace(/a08/g, 'a8');
              }
              if (/a09/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a09/g, 'a9');
                j.imgSrc = j.imgSrc.replace(/a09/g, 'a9');
              }
              if (/a01/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a01/g, 'p1');
                j.imgSrc = j.imgSrc.replace(/a01/g, 'p1');
              }
              if (/a31/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a31/g, 'p2');
                j.imgSrc = j.imgSrc.replace(/a31/g, 'p2');
              }
              if (/a12/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a12/g, 'p3');
                j.imgSrc = j.imgSrc.replace(/a12/g, 'p3');
              }
              if (/a43/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a43/g, 'p4');
                j.imgSrc = j.imgSrc.replace(/a43/g, 'p4');
              }
              if (/a44/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/a44/g, 'p5');
                j.imgSrc = j.imgSrc.replace(/a44/g, 'p5');
              }
              if (/p06/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/p06/g, 'p6');
                j.imgSrc = j.imgSrc.replace(/p06/g, 'p6');
              }
              if (/p07/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/p07/g, 'p7');
                j.imgSrc = j.imgSrc.replace(/p07/g, 'p7');
              }
              if (/p08/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/p08/g, 'p8');
                j.imgSrc = j.imgSrc.replace(/p08/g, 'p8');
              }
              if (/p09/g.test(j.styleText)) {
                j.styleText = j.styleText.replace(/p09/g, 'p9');
                j.imgSrc = j.imgSrc.replace(/p09/g, 'p9');
              }
            }

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
