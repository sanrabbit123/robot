module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = new Date(1800, 0, 1);
  const dateToNumberArr = function (str, detail = false) {
    let strArr, strArr2, strArr3;
    let year, month, date, hour, minute, second;
    if (!detail) {
      strArr = str.split("-");
      year = Number(strArr[0]);
      month = Number(strArr[1].replace(/^0/, '')) - 1;
      date = Number(strArr[2].replace(/^0/, ''));
      return [ year, month, date ];
    } else {
      strArr = str.split(' ');
      strArr2 = strArr[0].split("-");
      strArr3 = strArr[1].split(":");
      year = Number(strArr2[0]);
      month = Number(strArr2[1].replace(/^0/, '')) - 1;
      date = Number(strArr2[2].replace(/^0/, ''));
      hour = Number(strArr3[0].replace(/^0/, ''));
      minute = Number(strArr3[1].replace(/^0/, ''));
      second = Number(strArr3[2].replace(/^0/, ''));
      return [ year, month, date, hour, minute, second ];
    }
  }
  const newDesid = function (contractDay, order) {
    let year, month;
    let thisId, number;

    year = contractDay.split("-")[0].slice(2);
    month = contractDay.split("-")[1];
    number = Mother.orderSystem("encode", order);

    thisId = `d${year}${month}_${number}s`;

    return thisId;
  }

  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;
      let information, analytics, realTime, setting;
      let temp, temp2;

      let orderTong;
      let lastStringArr, newString, lastNumberObj;
      let scriptString, scriptSpace;

      totalTong = [];
      orderTong = [];
      for (let past of row) {
        if (/^1/.test(past.a2_contractday.slice(0, 7))) {
          continue;
        }
        orderTong.push({ past_desid: past.a4_desid, contractDate: past.a2_contractday.slice(0, 7) });
      }

      orderTong.sort((a, b) => { return Number(a.past_desid.replace(/de0/g, '')) - Number(b.past_desid.replace(/de0/g, '')); });

      lastStringArr = [];
      newString = '';
      lastNumberObj = {};
      scriptString = '';
      scriptSpace = '  ';

      for (let i = 0; i < orderTong.length; i++) {
        newString = orderTong[i].contractDate;
        if (!lastStringArr.includes(newString)) {
          lastNumberObj[newString] = 0;
        } else {
          lastNumberObj[newString] = lastNumberObj[newString] + 1;
        }
        lastStringArr.push(orderTong[i].contractDate);
        orderTong[i].order = lastNumberObj[newString];
      }

      for (let obj of orderTong) {
        obj.order = obj.order + 1;
        obj.desid = newDesid(obj.contractDate, obj.order);
      }

      scriptString = `const Filter = function () {}\n`;
      scriptString += `\n`;

      scriptString += `Filter.pastToNew = function (str) {\n`;
      scriptString += `${scriptSpace}switch (str) {\n`;
      for (let { past_desid, desid } of orderTong) {
        scriptString += `${scriptSpace}${scriptSpace}case "${past_desid}":\n`;
        scriptString += `${scriptSpace}${scriptSpace}${scriptSpace}return "${desid}";\n`;
        scriptString += `${scriptSpace}${scriptSpace}${scriptSpace}break;\n`;
      }
      scriptString += `${scriptSpace}}\n`;
      scriptString += `}\n`;

      scriptString += `\n`;

      scriptString += `Filter.newToPast = function (str) {\n`;
      scriptString += `${scriptSpace}switch (str) {\n`;
      for (let { past_desid, desid } of orderTong) {
        scriptString += `${scriptSpace}${scriptSpace}case "${desid}":\n`;
        scriptString += `${scriptSpace}${scriptSpace}${scriptSpace}return "${past_desid}";\n`;
        scriptString += `${scriptSpace}${scriptSpace}${scriptSpace}break;\n`;
      }
      scriptString += `${scriptSpace}}\n`;
      scriptString += `}\n`;

      scriptString += `\n`;

      scriptString += `module.exports = Filter;`;

      await Mother.fileSystem(`write`, [ `${process.cwd()}/apps/backMaker/idFilter/designer.js`, scriptString ]);

      for (let past of row) {

        if (/^1/.test(past.a2_contractday.slice(0, 7))) {
          continue;
        }

        tempObj = map().structure;

        tempObj.designer = past.a5_name;
        tempObj.desid = past.a4_desid;

        information = tempObj.information;

        information.contract = {};
        information.contract.status = past.a1_relation;
        information.contract.date = new Date(...dateToNumberArr(past.a2_contractday));

        information.phone = past.b2_phone;
        information.email = past.b3_email;

        tempArr = past.b5_address.split("__________split__________");
        information.address = [];
        for (let i of tempArr) {
          if (i !== '') {
            information.address.push(i.trim());
          }
        }

        information.personalSystem = {};
        information.personalSystem.showRoom = (past.b7_showroom === "Y" ? true : false);
        information.personalSystem.webPage = [];
        if (past.b1_web !== '-' && past.b1_web !== '') {
          information.personalSystem.webPage.push(past.b1_web);
        }

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
          if (i !== "") {
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
        }

        information.business.businessInfo = {};
        information.business.businessInfo.classification = past.c2_classification;
        information.business.businessInfo.businessNumber = past.c3_businessnumber;
        information.business.businessInfo.files = {};
        temp = past.c5_accountnumber.split(" / ");
        information.business.businessInfo.files.businessRegistration = (/유$/.test(temp[0])) ? true : false;
        information.business.businessInfo.files.bankBook = (/유$/.test(temp[1])) ? true : false;
        information.business.businessInfo.files.registrationCard = (/유$/.test(temp[2])) ? true : false;
        information.business.service = {};
        information.business.service.cost = {
          matrix: {
            service: [],
            online: false
          },
          percentage: 0,
          percentageHistory: []
        };
        information.business.service.cost.percentage = Number(past.c1_fees.replace(/\%$/, '').replace(/[^0-9]/g, ''));
        information.business.service.contruct = {
          partner: "",
          method: "",
        };

        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
