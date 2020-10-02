module.exports = async function (Mother) {
  const { fileSystem } = Mother;
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
  const sheet = new GoogleSheet();
  const analytics = new GoogleAnalytics();
  const numberFilter = function (str) {
    let newStr = str.replace(/[^0-9\-]/g, '');
    if (newStr === "-" || newStr === "") { return 0; }
    else { return Number(newStr); }
  }
  const dateFilter = function (str) {
    let temp;
    if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]/.test(str)) {
      temp = str.split('-');
      return (temp[0] + "년" + " " + temp[1].replace(/^0/, '') + "월");
    } else {
      return str;
    }
  }

  try {

    let rawArr = {};
    let resultObj = { lines: [], circles: [] };
    let tempObj, tempObj2;
    let rawObj;
    let revenue, profit, adCost, marketingCost, newClient, contractClient, netProfit;

    rawArr.first = await sheet.get_value_inPython("152PKTPNhEfRX31JiKmDqUSaiburcXBcwGdK3lYHOQWg", "시트1!B1:V12");
    rawArr.second = await analytics.getUsers();
    const { first, second } = rawArr;


    //first
    const [ firstStandard ] = first;
    tempObj = {};
    tempObj.name = "inOut";
    tempObj.columns = {
      add: [
        "서비스 매출",
        "시공 매출",
        "총 매출",
        "총 순수익",
      ],
      subtract: [
        "광고 비용",
        "마케팅 비용",
      ]
    };
    tempObj.ea = {
      add: [
        "원",
        "원",
        "원",
        "원",
      ],
      subtract: [
        "원",
        "원",
      ]
    };
    tempObj.values = [];
    for (let i = 2; i < firstStandard.length; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(numberFilter(first[4][i]));
      tempObj2.add.push(numberFilter(first[5][i]));
      tempObj2.add.push(numberFilter(first[4][i]) + numberFilter(first[5][i]));
      tempObj2.add.push(Math.floor((numberFilter(first[4][i]) * 0.3) + numberFilter(first[5][i])));
      tempObj2.subtract = [];
      tempObj2.subtract.push(numberFilter(first[9][i]));
      tempObj2.subtract.push(numberFilter(first[11][i]));
      tempObj.values.push({ name: dateFilter(firstStandard[i]), value: tempObj2 })
    }
    resultObj.lines.push(tempObj);


    //second
    rawObj = await analytics.getUsers();
    tempObj = {};
    tempObj.name = "users";
    tempObj.columns = {
      add: [
        "방문자 수",
        "신청 페이지 도달",
        "서비스 신청",
        "서비스 계약",
      ],
      subtract: [
      ]
    };
    tempObj.ea = {
      add: [
        "명",
        "명",
        "명",
        "명",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];
    for (let i = 0; i < rawObj.length - 1; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(rawObj[i].values.total);
      tempObj2.add.push(rawObj[i].values.consulting);
      tempObj2.add.push(rawObj[i].values.request);
      tempObj2.add.push(rawObj[i].values.contract);
      tempObj2.subtract = [];
      tempObj.values.push({ name: dateFilter(rawObj[i].name), value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    //third
    const [ firstValues_total, secondValues_total ] = resultObj.lines;
    const { values: firstValues } = firstValues_total;
    const { values: secondValues } = secondValues_total;
    if (firstValues.length !== secondValues.length) { throw new Error("invaild values"); return; }

    tempObj = {};
    tempObj.name = "marketing";
    tempObj.columns = {
      add: [
        "CAC",
        "AOV",
        "ROAS",
        "ROI",
      ],
      subtract: [
      ]
    };
    tempObj.ea = {
      add: [
        "원",
        "원",
        "%",
        "%",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];

    for (let i = 0; i < firstValues.length; i++) {

      revenue = firstValues[i].value.add[2];
      profit = firstValues[i].value.add[3];
      adCost = firstValues[i].value.subtract[0];
      marketingCost = firstValues[i].value.subtract[1];
      newClient = secondValues[i].value.add[2];
      contractClient = secondValues[i].value.add[3];
      netProfit = profit - adCost;

      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(Math.round(marketingCost / newClient));
      if (contractClient !== 0) {
        tempObj2.add.push(Math.round(revenue / contractClient));
      } else {
        tempObj2.add.push(0);
      }
      tempObj2.add.push(Math.round((revenue / adCost) * 100));
      tempObj2.add.push(Math.round((netProfit / adCost) * 100));
      tempObj2.subtract = [];
      tempObj.values.push({ name: firstValues[i].name, value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    //end
    await fileSystem(`write`, [ `${process.cwd()}/temp/0_secondIR.js`, JSON.stringify(resultObj, null, 2) ]);

    return resultObj;
  } catch (e) {
    console.log(e);
  }
}
