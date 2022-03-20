const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
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

GoogleAnalytics.prototype.historyToMongo = async function (ago = 15) {
  const instance = this;
  const mother = this.mother;
  const back = this.back;
  const { fileSystem, pythonExecute, dateToString, mongo, mongolocalinfo } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const collection = "clientFrontHistory";
  try {
    const targetEvent = "login";
    const targetEventPath = "/consulting.php";
    let history;
    let tong, tempObj;
    let result;
    let target;
    let totalTong;
    let date, dateAgo, endDate;
    let rows;
    let referrer, device;
    let parsingObj;

    await MONGOLOCALC.connect();

    date = new Date();
    date.setDate(date.getDate() - 1);

    for (let i = 0; i < ago; i++) {

      totalTong = [];

      dateAgo = new Date(JSON.stringify(date).slice(1, -1));
      dateAgo.setDate(dateAgo.getDate() - 30);
      endDate = new Date(JSON.stringify(date).slice(1, -1));
      endDate.setDate(endDate.getDate() + 1);

      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `${dateToString(date)} - ${dateToString(endDate)} parsing...`);

      try {
        target = await pythonExecute(this.pythonApp, [ "analytics", "getClientsHistory" ], {
          startDate: dateToString(date),
          startAgoDate: dateToString(dateAgo),
          endDate: dateToString(endDate)
        });
        result = {};
        for (let id in target) {
          history = target[id].history;
          tong = [];
          for (let { dimensions: [ path, title, date ] } of history) {
            tong.push({ path, title, date: Number(date) });
          }
          for (let obj of target[id].event) {
            if (obj.dimensions.includes(targetEvent)) {
              tong.push({
                path: targetEventPath,
                title: targetEvent,
                date: Number(obj.dimensions[1]),
              });
            }
          }
          tong.sort((a, b) => { return a.date - b.date; });
          tong = tong.map((obj) => {
            let str = String(obj.date);
            obj.date = new Date(Number(str.slice(0, 4)), Number(str.slice(4, 6)) - 1, Number(str.slice(6, 8)), Number(str.slice(8, 10)), Number(str.slice(10, 12)));
            return obj;
          });

          result[id] = {};
          result[id].history = tong;
        }
        for (let id in result) {
          parsingObj = await this.getClientById(id);
          if (parsingObj === "error") {
            throw new Error("parsing error");
          }
          ({ referrer, device } = parsingObj);
          totalTong.push({
            id,
            history: result[id].history,
            referrer,
            device
          });
        }
        for (let obj of totalTong) {
          rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo: MONGOLOCALC });
          if (rows.length === 0) {
            await back.mongoCreate(collection, obj, { selfMongo: MONGOLOCALC });
            console.log(`\x1b[33m%s\x1b[0m`, obj.id + " insert success");
          } else {
            await back.mongoUpdate(collection, [ { id: obj.id }, obj ], { selfMongo: MONGOLOCALC });
            console.log(`\x1b[33m%s\x1b[0m`, obj.id + " update success");
          }
        }

        date = new Date(JSON.stringify(date).slice(1, -1));
        date.setDate(date.getDate() - 1);
        console.log(``);

      } catch (e) {
        console.log(e);
        date = new Date(JSON.stringify(date).slice(1, -1));
        ago = ago + 1;
        console.log(``);
      }

    }

    await MONGOLOCALC.close();

  } catch (e) {
    console.log(e);
    await MONGOLOCALC.close();
  }
}

GoogleAnalytics.prototype.getClientById = async function (clientId) {
  if (typeof clientId !== "string") {
    throw new Error("invaild arguments");
  }
  const instance = this;
  const { pythonApp } = this;
  const { pythonExecute } = this.mother;
  try {
    let dimensions;
    let num;
    let result;
    let response;

    result = {
      id: clientId
    };

    dimensions = [
      [
        { name: "ga:userDefinedValue" },
      ],
      [
        { name: "ga:deviceCategory" },
        { name: "ga:operatingSystem" },
      ],
    ];

    num = 0;
    for (let dimension of dimensions) {
      response = await pythonExecute(pythonApp, [ "analytics", "getClientById" ], { clientId, dimensions: dimension });
      if (num === 0) {
        // referrer
        result.referrer = [];
        if (response.reports[0].data.rows !== undefined) {
          for (let { dimensions } of response.reports[0].data.rows) {
            for (let str of dimensions) {
              result.referrer.push(str);
            }
          }
        }
      } else {
        // device
        if (response.reports[0].data.rows !== undefined) {
          result.device = {
            kind: response.reports[0].data.rows[0].dimensions[0],
            os: response.reports[0].data.rows[0].dimensions[1]
          };
        } else {
          result.device = {
            kind: "(not set)",
            os: "(not set)",
          };
        }
      }
      num++;
    }

    return result;

  } catch (e) {
    return "error";
  }
}

GoogleAnalytics.prototype.getUsersByDate = async function (date = "aMonthAgo", end = "today") {
  const instance = this;
  const queryString = require('querystring');
  const zeroAddtion = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return `${String(num)}`;
    }
  }
  const userSort = function (result) {
    let users = [];
    for (let { dimensions } of result.rows) {
      users.push(dimensions);
    }
    users.sort((a, b) => { return Number(b[0].replace(/[^0-9\.\-]/, '')) - Number(a[0].replace(/[^0-9\.\-]/, '')); });
    return users;
  }
  try {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    let startDate, endDate;
    let dimensionsArr;
    let users, dimensions, dimensions_values, result;
    let resultObj = {};
    let resultObj_key;
    let questionIndex;
    let tempObj;
    let finalObj;
    let filteredArr;
    let temp;
    let num;

    if (end === "today") {
      endDate = zeroAddtion(today.getFullYear()) + '-' + zeroAddtion(today.getMonth() + 1) + '-' + zeroAddtion(today.getDate());
    } else {
      endDate = end;
    }

    if (date === "aMonthAgo") {
      startDate = zeroAddtion(monthAgo.getFullYear()) + '-' + zeroAddtion(monthAgo.getMonth() + 1) + '-' + zeroAddtion(monthAgo.getDate());
    } else {
      startDate = date;
    }

    dimensionsArr = [
      [
        { name: "ga:pagePath" },
        { name: "ga:pageTitle" },
      ],
      [
        { name: "ga:userDefinedValue" },
        { name: "ga:source" },
      ],
      [
        { name: "ga:deviceCategory" },
        { name: "ga:operatingSystem" },
        { name: "ga:mobileDeviceModel" },
      ],
      [
        { name: "ga:country" },
        { name: "ga:city" },
      ],
      [
        { name: "ga:campaign" },
        { name: "ga:userType" },
      ],
    ];

    resultObj = {};
    for (let z = 0; z < dimensionsArr.length; z++) {
      dimensions = dimensionsArr[z];
      dimensions_values = [];
      for (let { name } of dimensions) {
        dimensions_values.push(name.replace(/^ga\:/, ''));
      }
      result = await this.mother.pythonExecute(this.pythonApp, [ "analytics", "getClientsByDate" ], { startDate, endDate, dimensions });
      users = userSort(result.reports[0].data);
      for (let i of users) {
        if (resultObj[i[1]] === undefined) {
          resultObj[i[1]] = [];
        }
        tempObj = {};
        tempObj.timeline = i[0];
        for (let j = 2; j < dimensions_values.length + 2; j++) {
          tempObj[dimensions_values[j - 2]] = i[j];
        }
        resultObj[i[1]].push(tempObj);
      }
    }

    finalObj = {};
    for (let i in resultObj) {
      tempObj = {};
      for (let j = 0; j < resultObj[i].length; j++) {
        if (tempObj[resultObj[i][j].timeline] === undefined) {
          tempObj[resultObj[i][j].timeline] = {};
        }
        for (let k in resultObj[i][j]) {
          tempObj[resultObj[i][j].timeline][k] = resultObj[i][j][k];
        }
      }
      finalObj[i] = Object.values(tempObj);
    }

    filteredArr = [];
    for (let i in finalObj) {

      finalObj[i].sort((a, b) => { return Number(a.timeline) - Number(b.timeline); });

      tempObj = {};
      tempObj.history = [];
      questionIndex = 0;
      num = 0;

      for (let obj of finalObj[i]) {
        tempObj.userid = i;

        tempObj.userType = obj.userType !== undefined && obj.userType !== '' ? obj.userType : "(not set)";
        tempObj.campaign = obj.campaign !== undefined && obj.campaign !== '' ? obj.campaign : "(not set)";

        tempObj.referrer = {};
        tempObj.referrer.name = obj.source !== undefined && obj.source !== '' ? obj.source : "(not set)";
        tempObj.referrer.detail = {};
        tempObj.referrer.detail.host = null;
        tempObj.referrer.detail.queryString = {};

        tempObj.referrer.raw = obj.userDefinedValue !== undefined && obj.userDefinedValue !== '' ? obj.userDefinedValue : "(not set)";
        if (/^http/.test(obj.userDefinedValue)) {
          if (/\?/.test(obj.userDefinedValue)) {
            questionIndex = obj.userDefinedValue.search(/\?/);
            tempObj.referrer.detail.host = obj.userDefinedValue.slice(0, questionIndex);
            tempObj.referrer.detail.queryString = queryString.parse(obj.userDefinedValue.slice(questionIndex + 1));
          } else {
            tempObj.referrer.detail.host = obj.userDefinedValue;
            tempObj.referrer.detail.queryString = {};
          }
        }

        tempObj.device = {};
        tempObj.device.type = obj.deviceCategory !== undefined && obj.deviceCategory !== '' ? obj.deviceCategory : "(not set)";
        tempObj.device.os = obj.operatingSystem !== undefined && obj.operatingSystem !== '' ? obj.operatingSystem : "(not set)";
        tempObj.device.mobileDevice = obj.mobileDeviceModel !== undefined && obj.mobileDeviceModel !== '' ? obj.mobileDeviceModel : "(not set)";

        tempObj.region = {};
        tempObj.region.country = obj.country !== undefined && obj.country !== '' ? obj.country : "(not set)";
        tempObj.region.city = obj.city !== undefined && obj.city !== '' ? obj.city : "(not set)";

        temp = {};
        temp.time = obj.timeline.slice(0, 4) + "-" + obj.timeline.slice(4, 6) + "-" + obj.timeline.slice(6, 8) + " " + obj.timeline.slice(8, 10) + ":" + obj.timeline.slice(10, 12) + ":00";
        temp.page = obj.pageTitle !== undefined && obj.pageTitle !== '' ? obj.pageTitle : "(not set)";
        temp.page_raw = obj.pagePath !== undefined && obj.pagePath !== '' ? obj.pagePath : "(not set)";
        tempObj.history.push(temp);

        if (num === 0) {
          tempObj.firstTimeline = temp.time;
        }
        tempObj.latestTimeline = temp.time;

        num++;
      }
      filteredArr.push(tempObj);
    }

    filteredArr.sort((a, b) => {
      return Number(b.latestTimeline.replace(/[^0-9]/g, '')) - Number(a.latestTimeline.replace(/[^0-9]/g, ''));
    });

    return filteredArr;
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
    row = await MONGOC.db("miro81").collection("client").find({}).toArray();
    rowNumber = [];
    for (let { cliid } of row) {
      temp = { raw: cliid, parsing: idParsing(cliid) };
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
    row = await MONGOC.db("miro81").collection("project").find({}).toArray();
    contract_raw = [];
    for (let { process: { contract: { first: { date: value } } } } of row) {
      if (value.getFullYear() > 2000) {
        contract_raw.push(String(value.getFullYear()) + '-' + (value.getMonth() + 1 < 10 ? '0' + String(value.getMonth() + 1) : String(value.getMonth() + 1)) + '-' + (value.getDate() < 10 ? '0' + String(value.getDate()) : String(value.getDate())));
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

GoogleAnalytics.prototype.analyticsToMongo = async function (startDate = "default", endDate = "default") {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const collection = "googleAnalytics";
  try {
    let today;
    if (startDate === "default") {
      today = new Date();
      today.setDate(today.getDate() - 2);
      startDate = today;
    }

    const dateChaining = function (startDate) {
      const dateToString = function (dateObj) {
        let str;
        str = '';
        str += String(dateObj.getFullYear());
        str += '-';
        if (dateObj.getMonth() < 9) {
          str += '0' + String(dateObj.getMonth() + 1);
        } else {
          str += String(dateObj.getMonth() + 1);
        }
        str += '-';
        if (dateObj.getDate() < 10) {
          str += '0' + String(dateObj.getDate());
        } else {
          str += String(dateObj.getDate());
        }
        return str;
      }

      let tempArr0, tempArr1, tempArr2;
      let today;
      let endDateTempArr;
      let resultArr;
      let dateRange;
      let temp;

      if (typeof startDate === "string") {
        if (startDate.length === 10) {
          tempArr0 = startDate.split("-");
          startDate = new Date(Number(tempArr0[0]), Number(tempArr0[1].replace(/^0/, '')) - 1, Number(tempArr0[2].replace(/^0/, '')));
        } else {
          tempArr0 = startDate.split(" ");
          tempArr1 = tempArr0.split("-");
          tempArr2 = tempArr0.split(":");
          startDate = new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
        }
      } else {
        startDate = startDate;
      }

      if (endDate === "default") {
        today = new Date();
      } else {
        endDateTempArr = endDate.split("-");
        today = new Date(Number(endDateTempArr[0]), Number(endDateTempArr[1].replace(/^0/, '')) - 1, Number(endDateTempArr[2].replace(/^0/, '')));
      }
      if (startDate.valueOf() > today.valueOf()) {
        throw new Error("invaild start date value")
      }

      resultArr = [];
      dateRange = Math.floor(((((today.valueOf() - startDate.valueOf()) / 1000) / 60) / 60) / 24);

      for (let i = 0; i < dateRange; i++) {
        temp = [];
        temp.push(dateToString(startDate));
        startDate.setDate(startDate.getDate() + 1);
        temp.push(dateToString(startDate));
        resultArr.push(temp);
      }

      return resultArr;
    }
    const stringToArr = function (dateString) {
      let tempArr0, tempArr1, tempArr2;
      tempArr0 = dateString.split(' ');
      tempArr1 = tempArr0[0].split('-');
      tempArr2 = tempArr0[1].split(':');
      return [ Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')) ];
    }
    const dateChain = dateChaining(startDate);

    let users;
    let fileName, fileNameArr;
    let tempDir;
    let totalTong;
    let tempArr;
    let already;
    let submitClients, submitClientsIds;

    tempDir = process.cwd() + "/temp";
    fileNameArr = [];

    for (let [ start, end ] of dateChain) {
      users = await this.getUsersByDate(start, end);
      fileName = `analyticsExports_${start}_${end}.js`;
      fileNameArr.push(fileName);
      await fileSystem(`write`, [ `${tempDir}/${fileName}`, JSON.stringify(users, null, 2) ]);
      console.log(`analyticsExports_${start}_${end} done`);
    }

    await MONGOLOCALC.connect();

    for (let f of fileNameArr) {
      totalTong = [];
      tempArr = JSON.parse(await fileSystem(`readString`, [ `${tempDir}/${f}` ]));
      for (let j = 0; j < tempArr.length; j++) {
        totalTong.push(tempArr[tempArr.length - 1 - j]);
      }
      console.log(`analyticsExports read`);

      submitClients = await this.mother.pythonExecute(this.pythonApp, [ "analytics", "getSubmitClientsByDate" ], { startDate: f.split("_")[1].replace(/\.js/gi, ''), endDate: f.split("_")[2].replace(/\.js/gi, ''), dimensions: [] });
      submitClientsIds = [];
      if (Array.isArray(submitClients.reports[0].data.rows)) {
        for (let i of submitClients.reports[0].data.rows) {
          submitClientsIds.push(i.dimensions[1]);
        }
      }

      for (let i of totalTong) {
        i.firstTimeline = new Date(...stringToArr(i.firstTimeline));
        i.latestTimeline = new Date(...stringToArr(i.latestTimeline));
        for (let j = 0; j < i.history.length; j++) {
          i.history[j].time = new Date(...stringToArr(i.history[j].time));
        }
        for (let j in i.referrer.detail.queryString) {
          if (/[\.\/\\\<\>\?\:\;\'\"\!\&\=\+]/g.test(j)) {
            delete i.referrer.detail.queryString[j];
          }
        }
        if (i.source !== undefined) {
          delete i.source;
        }

        if (submitClientsIds.includes(i.userid)) {
          i.submit = "submit";
        } else {
          i.submit = "no";
        }

        already = await this.back.mongoRead(collection, { "userid": i.userid }, { selfMongo: MONGOLOCALC });
        if (already.length !== 0) {
          await this.back.mongoDelete(collection, i, { selfMongo: MONGOLOCALC });
        }
        await this.back.mongoCreate(collection, i, { selfMongo: MONGOLOCALC });
        console.log(i.userid + " success");
      }

    }

    await MONGOLOCALC.close();

    for (let i of fileNameArr) {
      shell.exec(`rm -rf ${shellLink(tempDir)}/${i}`);
    }

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.reportParsing = function (reports) {
  const instance = this;
  const { reports: [ { data: { rows } } ] } = reports;
  let result, tong, total, kinds;

  result = {};
  tong = [];
  total = 0;
  kinds = rows.length;

  for (let { dimensions, metrics } of rows) {
    if (dimensions.length === 1) {
      tong.push({ case: String(dimensions[0]), value: Number(metrics[0].values[0]) });
    } else if (dimensions.length > 1) {
      tong.push({ case: dimensions.join("__split__"), value: Number(metrics[0].values[0]) });
    }
    total = total + Number(metrics[0].values[0]);
  }

  tong.sort((a, b) => { return b.value - a.value; });

  result.tong = tong;
  result.total = total;
  result.kinds = kinds;

  return result;
}

GoogleAnalytics.prototype.generalMetric = async function (startDate, endDate) {
  const instance = this;
  try {

    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }

    const dimensions = [
      { name: "ga:pagePath", meaning: "페이지 경로" },
      { name: "ga:pageTitle", meaning: "페이지 제목" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:operatingSystem", meaning: "운영 체제" },
      { name: "ga:campaign", meaning: "캠페인" },
      { name: "ga:mobileDeviceModel", meaning: "핸드폰 기종" },
      { name: "ga:country", meaning: "국가" },
      { name: "ga:city", meaning: "도시" },
      { name: "ga:userType", meaning: "유저 타입" },
      { name: "ga:userAgeBracket", meaning: "나이대" },
      { name: "ga:userGender", meaning: "성별" },
    ];
    let temp, tempObj, result, matrix, tempArr;
    let resultCopied;
    let maxKinds;

    result = [];
    matrix = [];

    for (let i of dimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await this.mother.pythonExecute(this.pythonApp, [ "analytics", "generalMetric" ], { startDate, endDate, dimensions: temp });
      result.push(this.reportParsing(tempObj));
    }

    resultCopied = JSON.parse(JSON.stringify(result));
    resultCopied.sort((a, b) => {
      return b.kinds - a.kinds;
    });
    maxKinds = resultCopied[0].kinds;

    matrix.push([]);
    for (let { meaning } of dimensions) {
      matrix[0].push(meaning);
      matrix[0].push("");
    }

    for (let i = 0; i < maxKinds; i++) {
      matrix.push([]);
    }

    for (let { tong } of result) {
      for (let j = 0; j < maxKinds; j++) {
        if (tong[j] !== undefined) {
          matrix[j + 1].push(tong[j].case);
          matrix[j + 1].push(tong[j].value);
        } else {
          matrix[j + 1].push("");
          matrix[j + 1].push("");
        }
      }
    }

    return { data: result, matrix: matrix };
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.xyMetric = async function (standard, startDate, endDate) {
  const instance = this;
  try {

    if (standard === undefined || startDate === undefined || endDate === undefined) {
      throw new Error("must be standard and start-date and end-date");
    }

    const dimensions = [
      { name: "ga:pagePath", meaning: "페이지 경로" },
      { name: "ga:pageTitle", meaning: "페이지 제목" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:operatingSystem", meaning: "운영 체제" },
      { name: "ga:mobileDeviceModel", meaning: "핸드폰 기종" },
      { name: "ga:country", meaning: "국가" },
      { name: "ga:city", meaning: "도시" },
      { name: "ga:userType", meaning: "유저 타입" },
      { name: "ga:userAgeBracket", meaning: "나이대" },
      { name: "ga:userGender", meaning: "성별" },
    ];
    let temp, tempObj, result, matrix, tempArr;
    let temp0, temp1;
    let matrixFactors;
    let x, y;
    let num;

    result = [];

    for (let i of dimensions) {
      temp = [ { name: standard } ];
      temp.push({ name: i.name });
      tempObj = await this.mother.pythonExecute(this.pythonApp, [ "analytics", "generalMetric" ], { startDate, endDate, dimensions: temp });
      result.push(this.reportParsing(tempObj));
    }

    matrix = [];
    num = 0;
    for (let { tong } of result) {
      temp0 = [];
      temp1 = [];
      for (let obj of tong) {
        tempArr = obj.case.split("__split__");
        temp0.push(tempArr[0]);
        temp1.push(tempArr[1]);
      }

      temp0 = Array.from(new Set(temp0));
      temp1 = Array.from(new Set(temp1));

      matrixFactors = new Array(temp1.length + 1);

      temp = [ '' ];
      for (let i of temp0) {
        temp.push(i);
      }
      matrixFactors[0] = temp;

      for (let i = 1; i < temp1.length + 1; i++) {
        temp = [ '' ];
        for (let j = 0; j < temp0.length; j++) {
          temp.push(0);
        }
        temp[0] = temp1[i - 1];
        matrixFactors[i] = temp;
      }

      for (let obj of tong) {
        x = 0;
        y = 0;
        tempArr = obj.case.split("__split__");
        for (let i = 0; i < temp0.length; i++) {
          if (tempArr[0] === temp0[i]) {
            x = i;
          }
        }
        for (let i = 0; i < temp1.length; i++) {
          if (tempArr[1] === temp1[i]) {
            y = i;
          }
        }
        matrixFactors[y + 1][x + 1] = obj.value;
        matrixFactors[0][0] = dimensions[num].meaning;
      }

      matrix.push(matrixFactors);
      num++;
    }

    return { data: result, matrix: matrix };

  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleAnalytics;
