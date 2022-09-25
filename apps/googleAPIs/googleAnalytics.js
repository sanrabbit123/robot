const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tempDir = process.cwd() + "/temp";
}

GoogleAnalytics.prototype.returnDate = function (str) {
  str = String(str);
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const date = str.slice(6, 8);
  const hour = str.slice(8, 10);
  const minute = str.slice(10, 12);
  const second = "00";
  return new Date(Number(year), Number(month) - 1, Number(date), Number(hour), Number(minute), Number(second));
}

GoogleAnalytics.prototype.getSubmitClients = async function (thisDate, selfMongo) {
  const instance = this;
  const back = this.back;
  const { pythonExecute, dateToString, stringToDate, errorLog, sleep } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const withTools = true;
    let result;
    let clients, requests;
    let dateFilter;
    let thisDateRequests;
    let cliidArr;
    let cliidTong;
    let clientsArr;
    let tempObj;
    let userTong;
    let finalObj;
    let start;
    let end;
    let targetCliidSet;
    let rawData;
    let rawSet;
    let subtractSet;
    let subtractObj;
    let subtractMatrix;
    let problemClients;
    let subtractMatrixFiltered;
    let safeNum;

    if (typeof thisDate !== "string") {
      thisDate = dateToString(thisDate);
    }

    clients = await back.getClientsByQuery({}, { selfMongo, withTools })
    requests = clients.getRequestsTong();

    dateFilter = function (stringDate, requests) {
      if (typeof stringDate !== "string") {
        stringDate = dateToString(stringDate);
      }
      if (stringDate.length !== 10) {
        throw new Error("invaild input");
      }
      let filteredRequests;
      let year, month, date;
      let startDate;
      let endDate;

      [ year, month, date ] = stringDate.split("-");
      year = Number(year);
      month = Number(month.replace(/^0/i, '')) - 1;
      date = Number(date.replace(/^0/i, ''));

      startDate = new Date(year, month, date, 0, 0, 0);
      endDate = new Date(year, month, date, 0, 0, 0);
      endDate.setDate(endDate.getDate() + 1);

      filteredRequests = requests.filter((obj) => { return (obj.request.timeline.valueOf() >= startDate.valueOf()) && (obj.request.timeline.valueOf() < endDate.valueOf()) })
      return filteredRequests;
    }

    thisDateRequests = dateFilter(thisDate, requests);
    cliidArr = thisDateRequests.map((obj) => { return obj.cliid });

    cliidTong = {};
    problemClients = [];
    for (let cliid of cliidArr) {
      ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getSubmitClients" ], { startDate: thisDate, endDate: thisDate, cliid }));
      if (!Array.isArray(result.rows)) {
        await errorLog("cannot find by this cliid : " + cliid);
        cliidTong[cliid] = [];
        problemClients.push(thisDateRequests.find((obj) => { return obj.cliid === cliid }));
      } else {
        cliidTong[cliid] = result.rows.map((obj) => { return obj.dimensions[0] });
      }
    }

    if (Object.values(cliidTong).some((arr) => { return arr.length === 0 })) {

      targetCliidSet = Object.values(cliidTong).flat();
      targetCliidSet = Array.from(new Set(targetCliidSet));

      ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getInputBlurUsers" ], { startDate: thisDate, endDate: thisDate }));
      rawData = result.rows.map((obj) => { return obj.dimensions });
      rawSet = [ ...new Set(rawData.map((arr) => { return arr[0] })) ];

      subtractSet = rawSet.filter((id) => { return !targetCliidSet.includes(id) });
      subtractObj = {};
      for (let id of subtractSet) {
        subtractObj[id] = [];
        for (let [ i, t ] of rawData) {
          if (i === id) {
            subtractObj[id].push(this.returnDate(t));
          }
        }
        subtractObj[id].sort((a, b) => { return b.valueOf() - a.valueOf() })
      }

      subtractMatrix = [];
      for (let id in subtractObj) {
        if (subtractObj[id].length >= 1) {
          subtractMatrix.push([
            id,
            subtractObj[id][0]
          ]);
        }
      }

      if (Object.values(cliidTong).filter((arr) => { return arr.length === 0 }).length <= subtractMatrix.length) {
        for (let problemClient of problemClients) {
          subtractMatrixFiltered = subtractMatrix.filter((arr) => { return arr[1].valueOf() <= problemClient.request.timeline.valueOf() });
          if (subtractMatrixFiltered.length !== 0) {
            subtractMatrixFiltered.sort((a, b) => { return Math.abs(problemClient.request.timeline.valueOf() - a[1].valueOf()) - Math.abs(problemClient.request.timeline.valueOf() - b[1].valueOf()) });
            cliidTong[problemClient.cliid].push(subtractMatrixFiltered[0][0]);
            await errorLog("find missing cliid : " + problemClient.cliid + " => " + subtractMatrixFiltered[0][0]);
          }
        }
      }

    }


    console.log("target tong : ", cliidTong);

    clientsArr = [];
    for (let cliid of cliidArr) {
      tempObj = { cliid };
      tempObj.users = [];
      for (let id of cliidTong[cliid]) {
        userTong = await this.getUserById(thisDate, id);
        safeNum = 0;
        while (userTong === null && safeNum < 10) {
          await sleep(1000);
          userTong = await this.getUserById(thisDate, id);
          safeNum++;
        }
        if (userTong === null) {
          await errorLog("GoogleAnalytics getSubmitClients error : cannot find user info => cliid " + cliid + " / id " + id);
        }
        tempObj.users.push(userTong);
      }
      clientsArr.push(tempObj);
    }

    start = stringToDate(thisDate);
    end = stringToDate(thisDate);
    end.setDate(end.getDate() + 1);

    finalObj = {
      ancid: ('y' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's'),
      date: {
        from: start,
        to: end,
      },
      data: {
        cliid: cliidArr,
        detail: clientsArr,
      }
    }

    return finalObj;

  } catch (e) {
    await errorLog("GoogleAnalytics getSubmitClients error : " + e.message);
    console.log(e);
  }
}

GoogleAnalytics.prototype.getUserById = async function (date, clientId) {
  const instance = this;
  const { stringToDate, equalJson, dateToString, pythonExecute } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    let dimensionsArr;
    let startDate, endDate;
    let result;
    let matrix;
    let userTong;

    console.log(`parsing ${clientId}...`);

    if (typeof date === "string") {
      date = stringToDate(date);
    }
    startDate = new Date(JSON.stringify(date).slice(1, -1));
    startDate.setDate(startDate.getDate() - 14);
    endDate = new Date(JSON.stringify(date).slice(1, -1));
    endDate.setDate(endDate.getDate() + 3);
    dimensionsArr = [
      [
        { name: "ga:pagePath" },
        { name: "ga:pageTitle" },
      ],
      [
        { name: "ga:userDefinedValue" },
      ],
      [
        { name: "ga:source" },
      ],
      [
        { name: "ga:deviceCategory" },
      ],
      [
        { name: "ga:operatingSystem" },
      ],
      [
        { name: "ga:country" },
      ],
      [
        { name: "ga:city" },
      ],
      [
        { name: "ga:campaign" },
      ],
      [
        { name: "ga:userType" },
      ]
    ];

    userTong = {
      id: clientId,
      type: null,
      history: [],
      source: {
        referrer: [],
        mother: null,
        campaign: null,
      },
      device: {
        kinds: null,
        os: null,
      },
      region: {
        country: null,
        city: null,
      },
    };


    // history
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[0] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });

    for (let [ date, pagePath, pageTitle ] of matrix) {
      date = this.returnDate(date);
      userTong.history.push({ date, path: pagePath, title: pageTitle })
    }
    userTong.history.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });


    // referrer
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[1] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });

    for (let [ date, referrer ] of matrix) {
      userTong.source.referrer.push(referrer);
    }
    userTong.source.referrer = [ ...new Set(userTong.source.referrer) ];


    // source
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[2] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.source.mother = matrix[0][1];
    }


    // device
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[3] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.device.kinds = matrix[0][1];
    }


    // os
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[4] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.device.os = matrix[0][1];
    }


    // country
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[5] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.region.country = matrix[0][1];
    }


    // city
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[6] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.region.city = matrix[0][1];
    }


    // campaign
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[7] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    matrix = matrix.filter((arr) => {
      return arr[1] !== "(not set)";
    });
    if (matrix.length > 0) {
      userTong.source.campaign = matrix[0][1];
    } else {
      userTong.source.campaign = "(not set)";
    }

    // user type
    ({ reports: [ { data: result } ] } = await pythonExecute(this.pythonApp, [ "analytics", "getUserById" ], { startDate: dateToString(startDate), endDate: dateToString(endDate), clientId, dimensions: dimensionsArr[8] }));
    matrix = result.rows.map((obj) => { return obj.dimensions });
    matrix.sort((a, b) => { return Number(a[0]) - Number(b[0]) });
    if (matrix.length > 0) {
      userTong.type = matrix[0][1];
    }

    return userTong;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.reportParsing = function (reports) {
  const instance = this;
  const { reports: [ { data } ] } = reports;
  let result, tong, total, kinds;
  let rows;

  result = {};
  tong = [];
  total = 0;

  if (Array.isArray(data.rows)) {
    rows = data.rows;
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

    result.cases = tong;
    result.total = total;
    result.kinds = kinds;
  } else {

    result = {
      cases: [],
      total: 0,
      kinds: 0
    }

  }

  return result;
}

GoogleAnalytics.prototype.generalMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, stringToDate, pythonExecute } = this.mother;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return `${String(num)}`;
    }
  }
  try {

    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }

    if (startDate instanceof Date) {
      startDate = dateToString(startDate);
    }

    if (endDate instanceof Date) {
      endDate = dateToString(endDate);
    }

    const userDimensions = [
      { name: "ga:userType", meaning: "유저 타입" },
      { name: "ga:country", meaning: "국가" },
      { name: "ga:city", meaning: "도시" },
      { name: "ga:userAgeBracket", meaning: "나이대" },
      { name: "ga:userGender", meaning: "성별" },
      { name: "ga:campaign", meaning: "캠페인" },
      { name: "ga:source", meaning: "소스" },
    ];
    const dimensions = [
      { name: "ga:pagePath", meaning: "페이지 경로" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:operatingSystem", meaning: "운영 체제" },
      { name: "ga:campaign", meaning: "캠페인" },
    ];
    const eventDimensions = [
      { name: "ga:eventAction", meaning: "이벤트 액션" },
    ];
    const conversionDimensions = [
      { name: "ga:campaign", meaning: "캠페인" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:userType", meaning: "유저 타입" },
    ];
    let temp, tempObj, result, tempArr;
    let totalNumbers;
    let finalObj;
    let detailObj;
    let keyArr;
    let start, next, end;
    let conversion;
    let conversionObj;
    let users;
    let usersDetail;
    let userResult;
    let userTotalNumbers;
    let userDetailObj;

    // users

    userResult = [];
    for (let i of userDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getUserMetric" ], { startDate, endDate, dimensions: temp });
      userResult.push(this.reportParsing(tempObj));
    }

    userTotalNumbers = userResult.map((obj) => { return obj.total });

    userDetailObj = {};
    keyArr = userDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      userDetailObj[keyArr[i]] = userResult[i];
    }


    // page views

    result = [];

    for (let i of dimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "generalMetric" ], { startDate, endDate, dimensions: temp });
      result.push(this.reportParsing(tempObj));
    }

    totalNumbers = result.map((obj) => { return obj.total });

    for (let i of eventDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "eventMetric" ], { startDate, endDate, dimensions: temp });
      result.push(this.reportParsing(tempObj));
    }

    detailObj = {};
    keyArr = dimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      detailObj[keyArr[i]] = result[i];
    }
    keyArr = eventDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      detailObj[keyArr[i]] = result[dimensions.length + i];
    }


    // conversion
    conversion = [];

    // conversion - popupOpen
    conversionObj = {};
    conversionObj.name = "popupOpen";
    conversionObj.type = "event";
    conversionObj.metric = "ga:totalEvents";
    conversionObj.filter = {
      dimensionName: "ga:eventAction",
      operator: "REGEXP",
      expressions: "popupOpen",
    };
    conversionObj.detail = {};
    for (let i of conversionDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getPopupOpenDetail" ], { startDate, endDate, dimensions: temp });
      conversionObj.detail[i.name.replace(/ga\:/gi, '')] = this.reportParsing(tempObj);
    }
    conversion.push(conversionObj);

    // conversion - consulting
    conversionObj = {};
    conversionObj.name = "consultingPage";
    conversionObj.type = "page";
    conversionObj.metric = "ga:pageviews";
    conversionObj.filter = {
      dimensionName: "ga:pagePath",
      operator: "REGEXP",
      expressions: "consulting.php",
    };
    conversionObj.detail = {};
    for (let i of conversionDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getConsultingPageDetail" ], { startDate, endDate, dimensions: temp });
      conversionObj.detail[i.name.replace(/ga\:/gi, '')] = this.reportParsing(tempObj);
    }
    conversion.push(conversionObj);

    start = stringToDate(startDate);
    next = stringToDate(startDate);
    next.setDate(next.getDate() + 1);
    end = stringToDate(endDate);

    finalObj = {
      anaid: ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's'),
      date: {
        from: start,
        to: (endDate === startDate ? next : end),
      },
      data: {
        users: {
          total: userTotalNumbers.reduce((acc, cur) => { return (acc >= cur ? acc : cur) }, 0),
          detail: userDetailObj,
        },
        views: {
          total: totalNumbers.reduce((acc, cur) => { return (acc >= cur ? acc : cur) }, 0),
          detail: detailObj,
        },
        conversion,
      }
    };

    return finalObj;
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.simpleMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, stringToDate, pythonExecute } = this.mother;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return `${String(num)}`;
    }
  }
  try {

    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }

    if (startDate instanceof Date) {
      startDate = dateToString(startDate);
    }

    if (endDate instanceof Date) {
      endDate = dateToString(endDate);
    }

    const userDimensions = [
      { name: "ga:userType", meaning: "유저 타입" },
      { name: "ga:campaign", meaning: "캠페인" },
    ];
    let temp, tempObj, result, tempArr;
    let totalNumbers;
    let finalObj;
    let detailObj;
    let keyArr;
    let start, next, end;
    let conversion;
    let conversionObj;
    let users;
    let usersDetail;
    let userResult;
    let userTotalNumbers;
    let userDetailObj;

    // users

    userResult = [];
    for (let i of userDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getUserMetric" ], { startDate, endDate, dimensions: temp });
      userResult.push(this.reportParsing(tempObj));
    }

    userTotalNumbers = userResult.map((obj) => { return obj.total });

    userDetailObj = {};
    keyArr = userDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      userDetailObj[keyArr[i]] = userResult[i];
    }

    start = stringToDate(startDate);
    next = stringToDate(startDate);
    next.setDate(next.getDate() + 1);
    end = stringToDate(endDate);

    finalObj = {
      key: "simple_analytics_" + startDate.replace(/\-/gi, '') + "_" + endDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: (endDate === startDate ? next : end),
      },
      data: {
        users: {
          total: userTotalNumbers.reduce((acc, cur) => { return (acc >= cur ? acc : cur) }, 0),
          detail: userDetailObj,
        },
      }
    };

    return finalObj;
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.queryMetric = async function (targetDate) {
  const instance = this;
  const { dateToString, stringToDate, pythonExecute, equalJson } = this.mother;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return `${String(num)}`;
    }
  }
  try {

    if (targetDate === undefined) {
      throw new Error("must be targetDate");
    }

    if (targetDate instanceof Date) {
      targetDate = dateToString(targetDate);
    }

    let res;
    let report;
    let start, end, next;

    start = stringToDate(targetDate);
    end = stringToDate(targetDate);
    end.setDate(end.getDate() + 1);

    report = {
      key: "google_query_" + targetDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: end,
      },
      data: {
        clicks: 0,
        impressions: 0,
        detail: [],
      }
    };

    res = equalJson(await pythonExecute(this.pythonApp, [ "analytics", "basicImpressions" ], { startDate: targetDate, endDate: targetDate }));
    report.data.clicks = res.rows[0].clicks;
    report.data.impressions = res.rows[0].impressions;

    res = equalJson(await pythonExecute(this.pythonApp, [ "analytics", "queryImpressions" ], { startDate: targetDate, endDate: targetDate }));
    report.data.detail = res.rows.map((obj) => {
      return {
        query: obj.keys[0],
        clicks: obj.clicks,
        impressions: obj.impressions
      }
    });

    return report;

  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleAnalytics;
