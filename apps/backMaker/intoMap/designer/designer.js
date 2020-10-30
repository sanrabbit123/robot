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

        tempArr = past.b5_address.split("__________split__________");
        information.address = [];
        for (let i of tempArr) {
          information.address.push(i);
        }

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
        tempArr = past.b6_career.split("년 ");
        information.business.career = {};
        information.business.career.startY = Number(tempArr[0])
        information.business.career.startM = Number(tempArr[1].replace(/월/, '').replace(/^0/, '').replace(/[^0-9]/g, ''));

        information.business.account = [];
        temp = past.c4_bankname.split("__________split__________");
        for (let i of temp) {
          tempObjDetail = {};
          tempObjDetail2 = i.split(" ");
          tempObjDetail.bankName = tempObjDetail2[0];
          tempObjDetail.accountNumber = tempObjDetail2[1];
          if (tempObjDetail2[2] !== undefined) {
            tempObjDetail.to = tempObjDetail2[2];
          } else {
            tempObjDetail.to = past.a5_name;
          }
          information.business.account.push(tempObjDetail);
        }

        information.businessInfo = {};
        information.businessInfo.classification = past.c2_classification;
        information.businessInfo.businessNumber = past.c3_businessnumber;
        information.businessInfo.files = {};
        temp = past.c5_accountnumber.split(" / ");
        information.businessInfo.files.businessRegistration = (/유$/.test(temp[0])) ? true : false;
        information.businessInfo.files.bankBook = (/유$/.test(temp[1])) ? true : false;
        information.businessInfo.files.registrationCard = (/유$/.test(temp[2])) ? true : false;

        information.service.percentage = Number(past.c1_fees.replace(/\%$/, '').replace(/[^0-9]/g, ''));
        information.service.percentageHistory = [];

        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
