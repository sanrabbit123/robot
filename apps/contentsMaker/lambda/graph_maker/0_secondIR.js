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
  const sheetIds = {
    get: [
      { id: "152PKTPNhEfRX31JiKmDqUSaiburcXBcwGdK3lYHOQWg", sheet: "시트1", xyz: "B1:V12" }
    ],
    update: [
      { id: "1ygfQKHwigARiTh1sBaP4eRxNH8gOtsQYDnlAjQ0xKvg", sheet: "지표", xyz: [ 0, 0 ] }
    ]
  }

  try {
    let rawArr = {};
    let resultObj = { lines: [], bar: [], circles: [] };
    let tempObj, tempObj2;
    let rawObj;
    let revenue, profit, adCost, marketingCost, newClient, contractClient, netProfit;

    rawArr.first = await sheet.get_value_inPython(sheetIds.get[0].id, sheetIds.get[0].sheet + '!' + sheetIds.get[0].xyz);
    rawArr.second = await analytics.getUsers();
    rawArr.third = await analytics.getAgeGender();
    const { first, second, third } = rawArr;


    //first
    const [ firstStandard ] = first;
    tempObj = {};
    tempObj.name = "inOut";
    tempObj.ea = "원";
    tempObj.columns = {
      add: [
        "총 매출",
        "총 순수익",
        "서비스 매출",
        "시공 매출",
        "마케팅 비용",
        "광고 비용",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0",
        "hidden",
        "graph_0-order_0",
        "graph_0-order_1",
        "graph_1-entire_0",
        "graph_1-order_0",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];
    for (let i = 2; i < firstStandard.length; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(numberFilter(first[4][i]) + numberFilter(first[5][i]));
      tempObj2.add.push(Math.floor((numberFilter(first[4][i]) * 0.3) + numberFilter(first[5][i])));
      tempObj2.add.push(numberFilter(first[4][i]));
      tempObj2.add.push(numberFilter(first[5][i]));
      tempObj2.add.push(numberFilter(first[11][i]));
      tempObj2.add.push(numberFilter(first[9][i]));
      tempObj2.subtract = [];
      tempObj.values.push({ name: dateFilter(firstStandard[i]), value: tempObj2 })
    }
    resultObj.lines.push(tempObj);


    //second
    rawObj = await analytics.getUsers();
    tempObj = {};
    tempObj.name = "users";
    tempObj.ea = "명";
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
    tempObj.display = {
      add: [
        "graph_0-entire_0",
        "hidden",
        "hidden",
        "hidden"
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
    tempObj.ea = "원";
    tempObj.columns = {
      add: [
        "CAC",
        "AOV",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0",
        "graph_1-entire_0",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];

    for (let i = 0; i < firstValues.length; i++) {

      revenue = firstValues[i].value.add[0];
      profit = firstValues[i].value.add[1];
      adCost = firstValues[i].value.add[5];
      marketingCost = firstValues[i].value.add[4];
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
      tempObj2.subtract = [];
      tempObj.values.push({ name: firstValues[i].name, value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    //fourth
    tempObj = {};
    tempObj.name = "marketing";
    tempObj.ea = "%";
    tempObj.columns = {
      add: [
        "ROAS",
        "ROI",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0",
        "graph_1-entire_0",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];

    for (let i = 0; i < firstValues.length; i++) {

      revenue = firstValues[i].value.add[0];
      profit = firstValues[i].value.add[1];
      adCost = firstValues[i].value.add[5];
      marketingCost = firstValues[i].value.add[4];
      newClient = secondValues[i].value.add[2];
      contractClient = secondValues[i].value.add[3];
      netProfit = profit - adCost;

      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(Math.round((revenue / adCost) * 100));
      tempObj2.add.push(Math.round((netProfit / adCost) * 100));
      tempObj2.subtract = [];
      tempObj.values.push({ name: firstValues[i].name, value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    //lines to google sheet
    let sheetTempArr;
    let sheetFinalArr = [];

    sheetTempArr = [];
    sheetTempArr.push('');
    for (let i = 0; i < resultObj.lines[0].values.length; i++) {
      sheetTempArr.push(resultObj.lines[0].values[i].name);
    }
    sheetFinalArr.push(sheetTempArr);

    for (let z = 0; z < resultObj.lines.length; z++) {
      for (let i = 0; i < resultObj.lines[z].columns.add.length; i++) {
        sheetTempArr = [];
        sheetTempArr.push(resultObj.lines[z].columns.add[i]);
        for (let j = 0; j < resultObj.lines[z].values.length; j++) {
          sheetTempArr.push(String(resultObj.lines[z].values[j].value.add[i]) + resultObj.lines[z].ea);
        }
        sheetFinalArr.push(sheetTempArr);
      }
      for (let i = 0; i < resultObj.lines[z].columns.subtract.length; i++) {
        sheetTempArr = [];
        sheetTempArr.push(resultObj.lines[z].columns.subtract[i]);
        for (let j = 0; j < resultObj.lines[z].values.length; j++) {
          sheetTempArr.push(String(resultObj.lines[z].values[j].value.subtract[i]) + resultObj.lines[z].ea);
        }
        sheetFinalArr.push(sheetTempArr);
      }
    }

    await sheet.update_value_inPython(sheetIds.update[0].id, sheetIds.update[0].sheet, sheetFinalArr, sheetIds.update[0].xyz);


    //bar
    const { age, gender } = third;

    //age
    tempObj = {};
    tempObj.name = "age";
    tempObj.ea = "명";
    tempObj.columns = { add: [], subtract: [] };
    tempObj.display = { add: [], subtract: [] };
    tempObj.values = [];
    tempObj.columns.add.push("인원수");
    tempObj.display.add.push("graph_0-entire_0");
    for (let i = 0; i < age.length; i++) {
      tempObj.values.push({ name: age[i].name, value: { add: [ age[i].value ], subtract: [] } });
    }
    resultObj.bar.push(tempObj);

    //gender
    tempObj = {};
    tempObj.name = "gender";
    tempObj.ea = "명";
    tempObj.columns = { add: [], subtract: [] };
    tempObj.display = { add: [], subtract: [] };
    tempObj.values = [];
    tempObj.columns.add.push("인원수");
    tempObj.display.add.push("graph_0-entire_0");
    for (let i = 0; i < gender.length; i++) {
      tempObj.values.push({ name: gender[i].name, value: { add: [ gender[i].value ], subtract: [] } });
    }
    resultObj.bar.push(tempObj);

    //end
    await fileSystem(`write`, [ `${process.cwd()}/temp/0_secondIR.js`, JSON.stringify(resultObj, null, 2) ]);

    return resultObj;
  } catch (e) {
    console.log(e);
  }
}
