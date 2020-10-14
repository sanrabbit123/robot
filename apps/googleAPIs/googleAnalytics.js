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

GoogleAnalytics.prototype.returnTimeline = function (str) {
  str = String(str);
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const date = str.slice(6, 8);
  const hour = str.slice(8, 10);
  const minute = str.slice(10, 12);
  const second = "00";
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
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

GoogleAnalytics.prototype.getTodayClients = async function () {
  const instance = this;
  const mother = this.mother;
  try {
    const { reports: [ { data: result } ] } = await mother.pythonExecute(this.pythonApp, [ "analytics", "getTodayClients" ], {});
    let users_raw = [];
    for (let { dimensions } of result.rows) {
      users_raw.push(dimensions);
    }
    users_raw.sort((a, b) => { return Number(b[1]) - Number(a[1]); });

    let users = [];
    let users_boo = false;
    for (let [ id, time ] of users_raw) {
      users_boo = false;
      for (let i of users) {
        if (i.user === id) {
          users_boo = true;
        }
      }
      if (!users_boo) {
        users.push({ id, time });
      }
    }

    return users;
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.getClientById = async function (clientId) {
  if (clientId === undefined) {
    throw new Error("invaild arguments");
  }
  const instance = this;
  const mother = this.mother;
  const queryString = require('querystring');
  const userSort = function (result) {
    let users = [];
    for (let { dimensions } of result.rows) {
      users.push(dimensions);
    }
    users.sort((a, b) => { return Number(b[0]) - Number(a[0]); });
    return users;
  }

  try {
    let users, dimensions, result;
    let resultObj = {};
    let questionIndex;

    // 1
    dimensions = [
      { name: "ga:dateHourMinute" },
      { name: "ga:pagePath" },
      { name: "ga:pageTitle" },
      { name: "ga:userDefinedValue" },
      { name: "ga:source" },
      { name: "ga:deviceCategory" },
      { name: "ga:operatingSystem" },
      { name: "ga:campaign" },
      { name: "ga:mobileDeviceModel" },
    ];
    result = await mother.pythonExecute(this.pythonApp, [ "analytics", "getClientById" ], { clientId, dimensions });
    if (Number(result.reports[0].data.totals[0].values[0]) !== 0) {
      users = userSort(result.reports[0].data);
    } else {
      throw new Error("invaild data in first");
    }

    resultObj = {};
    resultObj.referrer = {};
    resultObj.referrer.name = users[0][4];
    resultObj.referrer.detail = {};
    resultObj.referrer.detail.host = null;
    resultObj.referrer.detail.queryString = {};

    if (/^http/.test(users[0][3])) {
      if (/\?/.test(users[0][3])) {
        questionIndex = users[0][3].search(/\?/);
        resultObj.referrer.detail.host = users[0][3].slice(0, questionIndex);
        resultObj.referrer.detail.queryString = queryString.parse(users[0][3].slice(questionIndex + 1));
      } else {
        resultObj.referrer.detail.host = users[0][3];
        resultObj.referrer.detail.queryString = {};
      }
    }

    resultObj.device = {};
    resultObj.device.type = users[0][5];
    resultObj.device.os = users[0][6];
    resultObj.device.mobileDevice = users[0][8];

    resultObj.campaign = users[0][7];
    resultObj.history = [];

    let temp;
    users.sort((a, b) => { return Number(a[0]) - Number(b[0]); });
    for (let i = 0; i < users.length; i++) {
      temp = {};
      temp.time = users[i][0].slice(0, 4) + "-" + users[i][0].slice(4, 6) + "-" + users[i][0].slice(6, 8) + " " + users[i][0].slice(8, 10) + ":" + users[i][0].slice(10, 12) + ":00";
      temp.page = users[i][2];
      temp.page_raw = users[i][1];
      resultObj.history.push(temp);
    }

    // 2
    dimensions = [
      { name: "ga:dateHourMinute" },
      { name: "ga:country" },
      { name: "ga:city" },
      { name: "ga:latitude" },
      { name: "ga:longitude" },
    ];
    result = await mother.pythonExecute(this.pythonApp, [ "analytics", "getClientById" ], { clientId, dimensions });
    if (Number(result.reports[0].data.totals[0].values[0]) !== 0) {
      users = userSort(result.reports[0].data);
    } else {
      throw new Error("invaild data in second");
    }

    resultObj.region = {};
    resultObj.region.country = users[0][1];
    resultObj.region.city = users[0][2];
    resultObj.region.latitude = Number(users[0][3]);
    resultObj.region.longitude = Number(users[0][4]);

    // 4
    dimensions = [
      { name: "ga:userAgeBracket" },
      { name: "ga:userGender" },
    ];
    result = await mother.pythonExecute(this.pythonApp, [ "analytics", "getClientById" ], { clientId, dimensions });
    resultObj.personalInfo = {};
    if (Number(result.reports[0].data.totals[0].values[0]) !== 0) {
      resultObj.personalInfo.age = result.reports[0].data.rows[0][1];
      resultObj.personalInfo.gender = result.reports[0].data.rows[0][2];
    } else {
      resultObj.personalInfo.age = null;
      resultObj.personalInfo.gender = null;
    }

    return resultObj;

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.getClientsInfoByNumber = async function (number = 1) {
  const instance = this;
  const mother = this.mother;
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  try {
    const back = new BackMaker();
    const usersObj = await this.getTodayClients();
    let tempObj;

    if (number > usersObj.length) {
      throw new Error("over num");
    }

    let clients = await back.getLatestClients(number);
    for (let i = 0; i < clients.length; i++) {
      tempObj = await this.getClientById(usersObj[i].id);
      tempObj.timeline = this.returnTimeline(usersObj[i].time);
      clients[i].googleAnalyticsUpdate(tempObj);
    }

    for (let i of clients) {
      console.log(i.google);
    }

    return clients;
  } catch (e) {
    console.log(e);
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
