const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tempDir = process.cwd() + "/temp";
}

GoogleAnalytics.prototype.getClients = async function () {
  const instance = this;
  const mother = this.mother;
  const sheet = this.mother.googleSystem("sheets");
  const sheetInfo = {
    id: "1Z940pTUwFo9kyY_UjgzXnWm9bbX88bRNLuCEtym6zzA",
    sheet: "sheet1",
    startPoint: [ 0, 1 ],
  }
  try {
    let result, obj, finalArr;
    let sheetRow;
    let tempArr, tempString;

    const standard = {
      name: "ga:userDefinedValue"
    };

    const dimensions = [
        { name: "ga:country" }, // 국가
        { name: "ga:city" }, // 도시
        { name: "ga:longitude" }, // 경도
        { name: "ga:latitude" }, // 위도
        { name: "ga:browser" }, // 브라우저
        { name: "ga:browserVersion" }, // 브라우저 버전
        { name: "ga:operatingSystem" }, // OS
        { name: "ga:keyword" }, // 검색어
        { name: "ga:source" }, // 전 페이지
        { name: "ga:sourceMedium" }, // 전 페이지
        { name: "ga:deviceCategory" }, // 모바일 / 데스크탑
        { name: "ga:pagePath" }, // 진입 경로
        { name: "ga:pageTitle" }, // 검색어
        { name: "ga:minute" }, // 날짜 - 분
        { name: "ga:date" }, // 날짜 - 일
        { name: "ga:hour" }, // 날짜 - 시간
        { name: "ga:userType" }, // 새로운 사람인지 방문했던 사람인지
        { name: "ga:campaign" }, // 광고 캠패인
        { name: "ga:browserSize" }, // 브라우저 해상도
    ];

    const users = [
        { name: "ga:userAgeBracket" }, // 나이대
        { name: "ga:userGender" }, // 성별
        { name: "ga:interestOtherCategory" }, // 관심사 1
        { name: "ga:interestInMarketCategory" }, // 관심사 2
        { name: "ga:mobileDeviceInfo" }, // 핸드폰 기종
    ];

    let dimensionsKeys = [];
    for (let obj of dimensions) {
      dimensionsKeys.push(obj.name.replace(/^ga:/, ''));
    }

    const startDate = "2019-03-18";
    const endDate = "2020-09-28";
    const bridgeData = { startDate, endDate, standard, dimensions, users };

    //write objects
    let totalTong = [];

    /*
    for (let i = 0; i < dimensions.length - 2; i++) {
      result = await mother.pythonExecute(this.pythonApp, [ "analytics", i ], bridgeData);
      console.log(result);
      totalTong.push(result);
      await mother.fileSystem(`write`, [ this.tempDir + "/analytics" + String(i) + ".json", JSON.stringify(result, null, 2) ]);
    }
    */

    console.log(bridgeData);

    // result = await mother.pythonExecute(this.pythonApp, [ "analytics", "getAllClients", 0 ], bridgeData);
    // console.log(result);

    /*
    //merge objects
    for (let i = 1; i < totalTong.length; i++) {
      for (let obj of totalTong[0]) {

        for (let obj2 of totalTong[i]) {
          if (obj[dimensionsKeys[i]] === obj2[dimensionsKeys[i]] && obj[dimensionsKeys[dimensionsKeys.length - 1]] === obj2[dimensionsKeys[dimensionsKeys.length - 1]]) {
            obj[dimensionsKeys[i + 1]] = obj2[dimensionsKeys[i + 1]];
          }
        }

      }
    }
    let [ mergeTong ] = totalTong;
    await mother.fileSystem(`write`, [ this.tempDir + "/analytics.json", JSON.stringify(mergeTong, null, 2) ]);
    console.log("merge done");
    */

    /*
    //to object
    obj = {};
    for (let i of result) {
      if (!obj.hasOwnProperty(i.clientId)) {
        obj[i.clientId] = {};
        if (/^\(not/.test(i.city)) {
          obj[i.clientId].city = null;
        } else {
          obj[i.clientId].city = i.city;
        }
        obj[i.clientId].browser = i.browser;
        if (/^\(not/.test(i.keyword)) {
          obj[i.clientId].keyword = null;
        } else {
          obj[i.clientId].keyword = i.keyword;
        }
        if (i.sourceMedium === '(direct) / (none)') {
          obj[i.clientId].sourceMedium = null;
        } else {
          obj[i.clientId].sourceMedium = i.sourceMedium;
        }
        if (i.deviceCategory === "mobile") {
          obj[i.clientId].deviceCategory = "모바일";
        } else if (i.deviceCategory === "desktop") {
          obj[i.clientId].deviceCategory = "데스크탑";
        } else {
          obj[i.clientId].deviceCategory = "태블릿";
        }
        obj[i.clientId].pageHistory = [ { page: i.pagePath, date: Number(i.dateHourMinute) } ];
        if (/^\(not/.test(i.campaign)) {
          obj[i.clientId].campaign = null;
        } else {
          obj[i.clientId].campaign = i.campaign;
        }
      } else {
        obj[i.clientId].pageHistory.push({ page: i.pagePath, date: Number(i.dateHourMinute) });
      }
    }
    for (let key in obj) {
      obj[key].pageHistory.sort((a, b) => { return a.date - b.date; });
    }
    finalArr = [];
    for (let key in obj) {
      finalArr.push({ clientId: key, info: obj[key] });
    }
    finalArr.sort((a, b) => { return a.info.pageHistory[0].date - b.info.pageHistory[0].date; });

    for (let i of finalArr) {
      for (let j = 0; j < i.info.pageHistory.length; j++) {
        i.info.pageHistory[j].date = String(i.info.pageHistory[j].date).slice(0, 4) + "-" + String(i.info.pageHistory[j].date).slice(4, 6) + "-" + String(i.info.pageHistory[j].date).slice(6, 8) + " " + String(i.info.pageHistory[j].date).slice(8, 10) + ":" + String(i.info.pageHistory[j].date).slice(10, 12)
      }
    }
    */
    //write json file
    // await mother.fileSystem(`write`, [ this.tempDir + "/analytics.json", JSON.stringify(result, null, 2) ]);
    /*
    //to sheet
    sheetRow = [];

    for (let z of finalArr) {
      tempArr = [];
      tempArr.push(z.clientId);
      if (z.info.city !== null) {
        tempArr.push(z.info.city);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.browser !== null) {
        tempArr.push(z.info.browser);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.keyword !== null) {
        tempArr.push(z.info.keyword);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.sourceMedium !== null) {
        tempArr.push(z.info.sourceMedium);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.deviceCategory !== null) {
        tempArr.push(z.info.deviceCategory);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.campaign !== null) {
        tempArr.push(z.info.campaign);
      } else {
        tempArr.push("알 수 없음");
      }
      tempString = '';
      for (let i = 0; i < z.info.pageHistory.length; i++) {
        tempString += "시점 : " + z.info.pageHistory[i].date + " / ";
        tempString += "경로 : " + z.info.pageHistory[i].page + " | ";
      }
      tempString = tempString.slice(0, -3);
      tempArr.push(tempString);
      sheetRow.push(tempArr);
    }

    await sheet.update_value(sheetInfo.id, sheetInfo.sheet, sheetRow, sheetInfo.startPoint);
    */
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log("done");
  }
}

GoogleAnalytics.prototype.getUsers = async function () {
  const instance = this;
  const mother = this.mother;

  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  const getAnalytics = async function (boo) {
    try {
      let result = await mother.pythonExecute(instance.pythonApp, [ "analytics", "getUsers" ], { consulting: boo });
      const { reports: [ reports_raw ] } = result;
      const { data: { rows } } = reports_raw;
      let temp;
      let finalArr = [];
      for (let { dimensions, metrics } of rows) {
        temp = {};
        temp.name = String(dimensions[0]) + "-" + String(dimensions[1]);
        temp.value = Number(metrics[0].values[0]);
        finalArr.push(temp);
      }
      return finalArr;
    } catch (e) {
      console.log(e);
    }
  }
  const idParsing = function (id) {
    const ABC = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
    let ABCOBJ = {};
    for (let i = 0; i < ABC.length; i++) { ABCOBJ[ABC[i]] = i; }
    let max, maxLength, target, result_num, append;

    max = ABC[ABC.length - 1] + ABC[ABC.length - 1];
    maxLength = String((ABCOBJ[max[0]] * ABC.length) + ABCOBJ[max[1]]).length;

    target = id.split('_')[1].slice(0, 2);
    result_num = (ABCOBJ[target[0]] * ABC.length) + ABCOBJ[target[1]]

    append = '';
    for (let i = 0; i < maxLength - String(result_num).length; i++) {
      append += '0';
    }

    return append + String(result_num) + id.split('_')[1].replace(/[^0-9]/g, '');
  }

  try {
    let totalFinalArr, totalFinal;
    let temp, temp2;
    let row, requestArr;
    let contract_raw;

    await MONGOC.connect();

    //total, consulting
    totalFinalArr = {};
    totalFinalArr.total = await getAnalytics(false);
    totalFinalArr.consulting = await getAnalytics(true);
    totalFinal = [];
    for (let i = 0; i < totalFinalArr.total.length; i++) {
      totalFinal.push({ name: totalFinalArr.total[i].name, values: { total: totalFinalArr.total[i].value, consulting: totalFinalArr.consulting[i].value } });
    }

    //request
    row = await MONGOC.db("miro81").collection("BC1_conlist").find({}).project({ a4_customernumber: 1 }).toArray();
    rowNumber = [];
    for (let { a4_customernumber } of row) {
      temp = { raw: a4_customernumber, parsing: idParsing(a4_customernumber) };
      temp2 = temp.parsing;
      while (/^0/.test(temp2)) {
        temp2 = temp2.replace(/^0/, '');
      }
      temp.num = Number(temp2);
      rowNumber.push(temp);
    }
    rowNumber.sort((a, b) => { return ((Number(a.raw.split('_')[0].slice(1)) * 1000) + a.num) - ((Number(b.raw.split('_')[0].slice(1)) * 1000) + b.num); });
    requestArr = [];
    for (let i = 0; i < rowNumber.length - 1; i++) {
      if ((rowNumber[i + 1].num - rowNumber[i].num) !== 1) {
        requestArr.push(rowNumber[i]);
      }
    }
    requestArr.push(rowNumber[rowNumber.length - 1]);
    for (let i = 0; i < totalFinal.length; i++) {
      totalFinal[i].values.request = requestArr[i].num;
    }

    //contract

    row = await MONGOC.db("miro81").collection("BP2_calculation").find({}).project({ d5_deposit_yn: 1 }).toArray();
    contract_raw = [];
    for (let { d5_deposit_yn: value } of row) {
      if (/^[0-9][0-9][0-9][0-9]/.test(value)) {
        contract_raw.push(value.slice(0, 7));
      }
    }
    for (let i of totalFinal) {
      i.values.contract = 0;
      for (let j of contract_raw) {
        if (i.name === j) {
          i.values.contract = i.values.contract + 1;
        }
      }
    }

    return totalFinal;

  } catch (e) {
    console.log(e.message);
  } finally {
    MONGOC.close();
    console.log("done");
  }
}

module.exports = GoogleAnalytics;
