module.exports = async function (Mother) {
  const { fileSystem, mongo, mongoinfo } = Mother;
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
      { id: "152PKTPNhEfRX31JiKmDqUSaiburcXBcwGdK3lYHOQWg", sheet: "시트1", xyz: "B1:V12" },
      { id: "1OoUJ79hmOziq38MHPk3hh2ker9EmsA5cVdKQbMCGqlg", sheet: "시트1", xyz: "A2:D21" }
    ],
    update: [
      { id: "1ygfQKHwigARiTh1sBaP4eRxNH8gOtsQYDnlAjQ0xKvg", sheet: "지표", xyz: [ 0, 0 ] }
    ]
  }
  const MONGOC = new mongo(mongoinfo);

  try {
    let rawArr = {};
    let resultObj = { lines: [], bar: [], circles: [] };
    let tempObj, tempObj2;
    let rawObj;
    let revenue, profit, adCost, marketingCost, newClient, contractClient, netProfit;

    await MONGOC.connect();

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
        "graph_0-entire_0-color_#ffffff-guide_#dddddd-ratio_0.8-fontSize_28",
        "hidden",
        "graph_0-order_0-color_#2fa678",
        "graph_0-order_1-color_#f9e3a8",
        "graph_1-entire_0-color_#2fa678-guide_#dddddd-ratio_0.327-fontSize_28",
        "graph_1-order_0-color_#f9e3a8",
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
        "graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_0.6822-fontSize_28",
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


    tempObj = {};
    tempObj.name = "usersIn";
    tempObj.ea = "명";
    tempObj.columns = {
      add: [
        "총 인원",
        "서비스 계약",
        "서비스 신청",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0-color_#ffffff-guide_#dddddd-ratio_0.8-fontSize_28",
        "graph_0-order_0-color_#f7e1a6",
        "graph_0-order_1-color_#2fa678",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];
    for (let i = 0; i < rawObj.length - 1; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(rawObj[i].values.request + rawObj[i].values.contract);
      tempObj2.add.push(rawObj[i].values.contract);
      tempObj2.add.push(rawObj[i].values.request);
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
        "graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_0.327-fontSize_28",
        "graph_1-entire_0-color_#2fa678-guide_#dddddd-ratio_1.2-fontSize_24",
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
        "graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_1.1-fontSize_28",
        "graph_1-entire_0-color_#2fa678-guide_#dddddd-ratio_0.5-fontSize_28",
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
          sheetTempArr.push(String(resultObj.lines[z].values[j].value.add[i]));
        }
        sheetFinalArr.push(sheetTempArr);
      }
      for (let i = 0; i < resultObj.lines[z].columns.subtract.length; i++) {
        sheetTempArr = [];
        sheetTempArr.push(resultObj.lines[z].columns.subtract[i]);
        for (let j = 0; j < resultObj.lines[z].values.length; j++) {
          sheetTempArr.push(String(resultObj.lines[z].values[j].value.subtract[i]));
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
    tempObj.display.add.push("graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_7-fontSize_28");
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
    tempObj.display.add.push("graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_18-fontSize_28");
    for (let i = 0; i < gender.length; i++) {
      tempObj.values.push({ name: gender[i].name, value: { add: [ gender[i].value ], subtract: [] } });
    }
    resultObj.bar.push(tempObj);


    //google search console
    const searchData = await analytics.getSearchData("2020-01-01");
    tempObj = {};
    tempObj.name = "googleSearch";
    tempObj.ea = "개";
    tempObj.columns = {
      add: [
        "노출수",
        "클릭수",
      ],
      subtract: []
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_0.4-fontSize_16",
        "graph_0-order_0-color_#f9e3a8"
      ],
      subtract: []
    };
    tempObj.values = [];
    for (let i = 0; i < searchData.length; i++) {
      tempObj2 = {};
      tempObj2.name = searchData[i].name;
      tempObj2.value = {};
      tempObj2.value.add = [];
      tempObj2.value.subtract = [];
      tempObj2.value.add.push(searchData[i].rows.impressions);
      tempObj2.value.add.push(searchData[i].rows.clicks);
      tempObj.values.push(tempObj2);
    }
    resultObj.lines.push(tempObj);


    //naver blog
    tempObj = {};
    tempObj.name = "naverBlog";
    tempObj.ea = "명";
    tempObj.columns = { add: [], subtract: [] };
    tempObj.display = { add: [], subtract: [] };
    tempObj.columns.add.push("인원수");
    tempObj.display.add.push("graph_0-entire_0-color_#2fa678-guide_#dddddd-ratio_0.4-fontSize_16");
    tempObj.values = [
      {
        name: "2020년 1월",
        value: {
          add: [ 3215 ],
          subtract: []
        }
      },
      {
        name: "2020년 2월",
        value: {
          add: [ 3090 ],
          subtract: []
        }
      },
      {
        name: "2020년 3월",
        value: {
          add: [ 4601 ],
          subtract: []
        }
      },
      {
        name: "2020년 4월",
        value: {
          add: [ 5741 ],
          subtract: []
        }
      },
      {
        name: "2020년 5월",
        value: {
          add: [ 6139 ],
          subtract: []
        }
      },
      {
        name: "2020년 6월",
        value: {
          add: [ 7017 ],
          subtract: []
        }
      },
      {
        name: "2020년 7월",
        value: {
          add: [ 8260 ],
          subtract: []
        }
      },
      {
        name: "2020년 8월",
        value: {
          add: [ 8248 ],
          subtract: []
        }
      },
      {
        name: "2020년 9월",
        value: {
          add: [ 8128 ],
          subtract: []
        }
      },
    ]

    resultObj.lines.push(tempObj);

    let row;
    let rowTotalNum;
    let itemsCount = {
      search: { count: 0, percent: 0 },
      blog: { count: 0, percent: 0 },
      sns: { count: 0, percent: 0 },
      friend: { count: 0, percent: 0 },
      news: { count: 0, percent: 0 },
      etc: { count: 0, percent: 0 },
    };

    row = await MONGOC.db("miro81").collection("BC1_conlist").find({}).project({ a30_channel: 1 }).toArray();
    rowTotalNum = row.length;
    for (let i = 0; i < rowTotalNum; i++) {
      if (/검색/g.test(row[i].a30_channel) || /인터넷/g.test(row[i].a30_channel)) {
        itemsCount.search.count++;
      } else if (/블로그/g.test(row[i].a30_channel) || /커뮤니티/g.test(row[i].a30_channel)) {
        itemsCount.blog.count++;
      } else if (/인스타/g.test(row[i].a30_channel)) {
        itemsCount.sns.count++;
      } else if (/지인/g.test(row[i].a30_channel)) {
        itemsCount.friend.count++;
      } else if (/언론/g.test(row[i].a30_channel)) {
        itemsCount.news.count++;
      } else {
        itemsCount.etc.count++;
      }
    }

    for (let i in itemsCount) {
      itemsCount[i].percent = Math.round((itemsCount[i].count / rowTotalNum) * 100);
    }

    console.log(itemsCount);


    //addtional graph
    let addtionalRaw = await sheet.get_value_inPython(sheetIds.get[1].id, sheetIds.get[1].sheet + '!' + sheetIds.get[1].xyz);
    let addtionalNames, addtionalDesigner, addtionalConstruct, addtionalConstructSelf, addtionalTotal;

    addtionalNames = [];
    addtionalDesigner = [];
    addtionalConstruct = [];
    addtionalConstructSelf = [];
    addtionalTotal = [];

    for (let [ n, d, c, cs ] of addtionalRaw) {
      addtionalNames.push(n);
      addtionalDesigner.push(numberFilter(d));
      addtionalConstruct.push(numberFilter(c));
      addtionalConstructSelf.push(numberFilter(cs));
      addtionalTotal.push(numberFilter(d) + numberFilter(c) + numberFilter(cs));
    }

    tempObj = {};
    tempObj.name = "futureRevenue";
    tempObj.ea = "원";
    tempObj.columns = {
      add: [
        "총 매출",
        "디자이너 연계",
        "시공 연계",
        "직접 시공",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0-color_#ffffff-guide_#dddddd-ratio_1-fontSize_28",
        "graph_0-order_0-color_#2fa678",
        "graph_0-order_1-color_#f7e1a6",
        "graph_0-order_2-color_#c10d23",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];
    for (let i = 0; i < addtionalNames.length; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(addtionalTotal[i]);
      tempObj2.add.push(addtionalDesigner[i]);
      tempObj2.add.push(addtionalConstruct[i]);
      tempObj2.add.push(addtionalConstructSelf[i]);
      tempObj2.subtract = [];
      tempObj.values.push({ name: addtionalNames[i], value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    tempObj = {};
    tempObj.name = "futureRevenueRatio";
    tempObj.ea = "%";
    tempObj.columns = {
      add: [
        "총 비율",
        "디자이너 연계 비율",
        "시공 연계 비율",
        "직접 시공 비율",
      ],
      subtract: [
      ]
    };
    tempObj.display = {
      add: [
        "graph_0-entire_0-color_#ffffff-guide_#dddddd-ratio_0.8-fontSize_28",
        "graph_0-order_0-color_#2fa678",
        "graph_0-order_1-color_#f7e1a6",
        "graph_0-order_2-color_#c10d23",
      ],
      subtract: [
      ]
    };
    tempObj.values = [];
    for (let i = 0; i < addtionalNames.length; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(100);
      tempObj2.add.push(Math.round((addtionalDesigner[i] / addtionalTotal[i]) * 100));
      tempObj2.add.push(Math.round((addtionalConstruct[i] / addtionalTotal[i]) * 100));
      tempObj2.add.push(Math.round((addtionalConstructSelf[i] / addtionalTotal[i]) * 100));
      tempObj2.subtract = [];
      tempObj.values.push({ name: addtionalNames[i], value: tempObj2 });
    }
    resultObj.lines.push(tempObj);


    //end
    await fileSystem(`write`, [ `${process.cwd()}/temp/0_secondIR.js`, JSON.stringify(resultObj, null, 2) ]);

    MONGOC.close();

    return resultObj;
  } catch (e) {
    MONGOC.close();
    console.log(e);
  }
}
