const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tempDir = process.cwd() + "/temp";
}

GoogleAnalytics.prototype.returnMonthBox = function (startDate = "2019-03-01") {
  const startDay = new Date(startDate);
  const today = new Date();

  let pastMonth, newMonth, pastyear, lastDate;
  let middle = [], result = [];
  let temp;

  while (startDay.getFullYear() !== today.getFullYear() || startDay.getMonth() !== today.getMonth()) {
    do {
      pastyear = startDay.getFullYear();
      pastMonth = startDay.getMonth();
      lastDate = startDay.getDate();
      startDay.setDate(startDay.getDate() + 1);
      newMonth = startDay.getMonth();
    } while (pastMonth === newMonth);
    middle.push({ year: pastyear, month: pastMonth + 1, date: lastDate });
  }

  for (let { year, month, date } of middle) {
    temp = (month < 10) ? '0' + String(month) : String(month);
    result.push({ startDate: String(year) + '-' + temp + '-' + "01", endDate: String(year) + '-' + temp + '-' + String(date) });
  }

  return result;
}

GoogleAnalytics.prototype.getAgeGender = async function () {
  const instance = this;
  const mother = this.mother;
  const sheet = this.mother.googleSystem("sheets");
  try {
    const { age: { reports: [ ageResultRaw ] }, gender: { reports: [ genderResultRaw ] } } = await mother.pythonExecute(this.pythonApp, [ "analytics", "getAgeGender" ], {});
    const { data: { rows: ageResult } } = ageResultRaw;
    const { data: { rows: genderResult } } = genderResultRaw;
    let temp, tempArr;
    let age = [];
    for (let { dimensions, metrics } of ageResult) {
      temp = {};
      tempArr = dimensions[0].replace(/[\-\+]/g, '_').split('_');
      if (tempArr[1] === undefined || tempArr[1] === '') {
        temp.name = tempArr[0] + "세 이상 ~";
      } else {
        temp.name = tempArr[0] + "세 ~ " + tempArr[1] + "세";
      }
      temp.value = Number(metrics[0].values[0]);
      age.push(temp);
    }
    let gender = [];
    for (let { dimensions, metrics } of genderResult) {
      temp = {};
      if (dimensions[0] === "female") {
        temp.name = "여성";
        temp.value = Number(metrics[0].values[0]);
      } else {
        temp.name = "남성";
        temp.value = Number(metrics[0].values[0]);
      }
      gender.push(temp);
    }

    return { age, gender };
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.getLatestClientId = async function () {
  const instance = this;
  const mother = this.mother;
  try {
    const { reports: [ { data: result } ] } = await mother.pythonExecute(this.pythonApp, [ "analytics", "getLatestClientId" ], {});
    for (let { dimensions } of result.rows) {
      console.log(dimensions);
    }

    // let users = [];
    // for (let { dimensions } of result.rows) {
    //   users.push(dimensions);
    // }
    // users.sort((a, b) => { return Number(b[1]) - Number(a[1]); });
    // return users[0][0];
  } catch (e) {
    console.log(e);
  }
}


GoogleAnalytics.prototype.getLatestClient = async function () {
  const instance = this;
  const mother = this.mother;
  try {
    const latestId = await this.getLatestClientId();
    // const { reports: [ { data: result } ] } = await mother.pythonExecute(this.pythonApp, [ "analytics", "getLatestClient" ], { clientId: latestId });
    // let users = [];
    // for (let { dimensions } of result.rows) {
    //   users.push(dimensions);
    // }
    // users.sort((a, b) => { return Number(b[0]) - Number(a[0]); });
    //
    // let resultObj = {};
    // resultObj.referrer = users[0][4] + " / " + users[0][3];
    // resultObj.device = users[0][5] + "(" + users[0][6] + ")";
    // resultObj.city = users[0][7];
    // resultObj.campaign = users[0][8];
    // resultObj.history = [];
    //
    // let temp;
    // users.sort((a, b) => { return Number(a[0]) - Number(b[0]); });
    // for (let i = 0; i < users.length; i++) {
    //   temp = {};
    //   temp.time = users[i][0].slice(4, 6) + "-" + users[i][0].slice(6, 8) + " " + users[i][0].slice(8, 10) + ":" + users[i][0].slice(10, 12);
    //   temp.page = users[i][2];
    //   temp.page_raw = users[i][1];
    //   resultObj.history.push(temp);
    // }
    //
    // return resultObj;
  } catch (e) {
    console.log(e);
  }
}

//this is problem
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

    const dimensions = [
        { name: "ga:dateHourMinute" }, // 시간
        { name: "ga:country" }, // 국가
        { name: "ga:city" }, // 도시
        { name: "ga:browser" }, // 브라우저
        { name: "ga:operatingSystem" }, // OS
        { name: "ga:keyword" }, // 검색어
        { name: "ga:userDefinedValue" }, // 레퍼럴 1
        { name: "ga:source" }, // 전 페이지
        { name: "ga:deviceCategory" }, // 모바일 / 데스크탑
        // { name: "ga:pagePath" }, // 진입 경로
        // { name: "ga:pageTitle" }, // 검색어
        // { name: "ga:campaign" }, // 광고 캠패인
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

    //write objects
    let clientsBox = [];
    let client;
    let totalTong = [];


    //testing
    let monthBox = this.returnMonthBox("2020-09-01");
    for (let i = 0; i < monthBox.length; i++) {
      result = await mother.pythonExecute(this.pythonApp, [ "analytics", "clientsIdTesting" ], { startDate: monthBox[i].startDate, endDate: monthBox[i].endDate });
      if (Number(result.totalNum) !== result.data.rows.length) { throw new Error("invaild ID"); process.exit(); return; }
      if (Number(result.totalNum) !== Number(result.data.totals[0].values[0])) { throw new Error("invaild ID"); process.exit(); return; }
      if (result.data.rows.length !== Number(result.data.totals[0].values[0])) { throw new Error("invaild ID"); process.exit(); return; }

      client = [];
      for (let obj of result.data.rows) {
        client.push(obj.dimensions[0]);
      }

      clientsBox.push(client);
      console.log(monthBox[i].startDate + " success");
    }
    console.log("testing success");

    for (let i = 0; i < monthBox.length; i++) {
      result = await mother.pythonExecute(this.pythonApp, [ "analytics", "getAllClients" ], { startDate: monthBox[i].startDate, endDate: monthBox[i].endDate, dimensionsList: dimensions, clientsBox: clientsBox[i] });
      totalTong.push(result);
      console.log(monthBox[i].startDate + " success");
    }

    await mother.fileSystem(`write`, [ process.cwd() + "/temp/ana.json", JSON.stringify(totalTong, null, 2) ]);


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
    result_num = (ABCOBJ[target[0]] * ABC.length) + ABCOBJ[target[1]];

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

GoogleAnalytics.prototype.getSearchData = async function (startDay = "2020-01-01") {
  const instance = this;
  const mother = this.mother;
  try {
    const monthBox = this.returnMonthBox(startDay);
    const pythonResult = await mother.pythonExecute(this.pythonApp, [ "analytics", "monthSearch" ], { monthBox });

    let result = [];
    let temp, tempString, tempArr, number;

    number = 0;
    for (let { rows } of pythonResult) {
      tempString = monthBox[number].startDate.slice(0, 7);
      tempArr = tempString.split('-');
      temp = {};
      temp.rows = rows[0];
      temp.date = { year: Number(tempArr[0]), month: Number(tempArr[1]) };
      temp.name = String(Number(tempArr[0])) + "년 " + String(Number(tempArr[1])) + "월";
      result.push(temp);
      number++;
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleAnalytics;
