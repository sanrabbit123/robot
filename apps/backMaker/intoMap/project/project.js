module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = new Date("1800-01-01");
  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;
      let tempFee;

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;
        tempObj.proid = past.proid;
        tempObj.cliid = past.cliid;
        tempObj.desid = "";

        tempObj.service = {};
        tempObj.service.serid = "";
        tempObj.service.xValue = "";

        if (/^홈스/.test(past.service)) {
          tempObj.service.serid = "s2011_aa02s";
        } else if (/^홈퍼/.test(past.service)) {
          tempObj.service.serid = "s2011_aa01s";
        } else {
          tempObj.service.serid = "s2011_aa03s";
        }

        if (/mini/gi.test(past.service)) {
          tempObj.service.xValue = "M";
        } else if (/basic/gi.test(past.service)) {
          tempObj.service.xValue = "B";
        } else {
          tempObj.service.xValue = "P";
        }

        tempObj.proposal.status = past.status;
        tempObj.proposal.date = new Date("1800-01-01");
        tempObj.proposal.detail = [];

        tempArr = past.proposal;
        for (let i of tempArr) {
          tempObjDetail = {};
          tempObjDetail2 = i.picture_settings.pop();

          tempObjDetail.desid = i.desid;
          tempObjDetail.fee = [];
          for (let j of i.fee) {
            tempFee = {};
            tempFee.method = j.method;
            tempFee.partial = j.partial;
            tempFee.amount = j.money;
            tempObjDetail.fee.push(tempFee);
          }
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
