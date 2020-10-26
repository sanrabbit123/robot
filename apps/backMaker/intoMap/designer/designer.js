module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = emptyDate();
  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;

      let information, analytics, realTime, setting;
      let temp, temp2;

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;

        tempObj.designer = past.a5_name;
        tempObj.desid = past.a4_desid;

        information = tempObj.information;

        information.contract = {};
        information.contract.status = past.a1_relation;
        information.contract.date = past.a2_contractday;

        information.phone = past.b2_phone;
        information.email = past.b3_email;

        information.address = [];
        information.address.push(past.b5_address);

        information.personalSystem = {};
        information.personalSystem.showRoom = (past.b7_showroom === "Y" ? true : false);
        information.personalSystem.webPage = [];
        information.personalSystem.sns = [];

        temp = past.b4_sns.split(" / ");
        tempArr = [];
        for (let i of temp) {
          tempArr.push(i.split(" ")[1]);
        }
        for (let i of tempArr) {
          if (i !== '-' && i !== '') {
            if (/blog/gi.test(i)) {
              information.personalSystem.sns.push({ kind: "Naver", href: i });
            } else if (/insta/gi.test(i)) {
              information.personalSystem.sns.push({ kind: "Instagram", href: i });
            } else if (/you/gi.test(i)) {
              information.personalSystem.sns.push({ kind: "Youtube", href: i });
            } else {
              information.personalSystem.sns.push({ kind: "etc", href: i });
            }
          }
        }

        information.business = {};
        information.business.career = past.b6_career;
        information.business.account = [];
        temp = past.c4_bankname.split("__________split__________");
        for (let i of temp) {
          information.business.account.push(i);
        }

        /*****************************************************************************************************
        데이터 모델링 업무 중단 ( 2020 / 10 / 26 )
        *****************************************************************************************************/

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
