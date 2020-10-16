module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();
  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;
        tempObj.proid = past.proid;
        tempObj.cliid = past.cliid;
        tempObj.desid = "";
        tempObj.serid = past.service;
        tempObj.proposal.status = past.status;

        tempObj.proposal.detail = [];

        tempArr = past.proposal;
        for (let i of tempArr) {
          tempObjDetail = {};
          tempObjDetail2 = i.picture_settings.pop();

          tempObjDetail.desid = i.desid;
          tempObjDetail.fee = i.fee;
          tempObjDetail.pictureSettings = i.picture_settings;
          tempObjDetail.description = Object.values(tempObjDetail2);

          tempObj.proposal.detail.push(tempObjDetail);
        }

        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
