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
    let endNext;
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
    endNext = stringToDate(endDate);
    endNext.setDate(endNext.getDate() + 1);

    finalObj = {
      anaid: ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's'),
      date: {
        from: start,
        to: (endDate === startDate ? next : endNext),
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
    let endNext;
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
    endNext = stringToDate(endDate);
    endNext.setDate(endNext.getDate() + 1);

    finalObj = {
      key: "simple_analytics_" + startDate.replace(/\-/gi, '') + "_" + endDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: (endDate === startDate ? next : endNext),
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

GoogleAnalytics.prototype.complexMetric = async function (startDate, endDate) {
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
      { name: "ga:userAgeBracket", meaning: "나이대" },
      { name: "ga:userGender", meaning: "성별" },
      { name: "ga:source", meaning: "소스" },
    ];
    const dimensions = [
      { name: "ga:pagePath", meaning: "페이지 경로" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:campaign", meaning: "캠페인" },
    ];
    const eventDimensions = [
      { name: "ga:eventAction", meaning: "이벤트 액션" },
    ];
    const sourceDimensions = [
      { name: "ga:campaign", meaning: "캠페인" },
    ];
    const conversionDimensions = [
      { name: "ga:campaign", meaning: "캠페인" },
      { name: "ga:userDefinedValue", meaning: "레퍼럴" },
      { name: "ga:source", meaning: "소스" },
      { name: "ga:deviceCategory", meaning: "디바이스" },
      { name: "ga:userType", meaning: "유저 타입" },
    ];
    const timeDimensions = [
      { name: "ga:source", meaning: "소스" },
    ];
    const outDimensions = [
      { name: "ga:source", meaning: "소스" },
    ];
    const sessionDimensions = [
      { name: "ga:source", meaning: "소스" },
    ];
    let temp, tempObj, result, tempArr;
    let totalNumbers;
    let finalObj;
    let detailObj;
    let keyArr;
    let start, next, end;
    let endNext;
    let conversion;
    let conversionObj;
    let usersDetail;
    let userResult;
    let userTotalNumbers;
    let userDetailObj;
    let timeResult;
    let timeTotalNumbers;
    let timeDetailObj;
    let outResult;
    let outTotalNumbers;
    let outDetailObj;
    let withResult;
    let withTotalNumbers;
    let withDetailObj;
    let sessionResult;
    let sessionTotalNumbers;
    let sessionDetailObj;

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


    // time

    timeResult = [];
    for (let i of timeDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getTimeMetric" ], { startDate, endDate, dimensions: temp });
      timeResult.push(this.reportParsing(tempObj));
    }

    timeTotalNumbers = timeResult.map((obj) => { return obj.total });

    timeDetailObj = {};
    keyArr = timeDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      timeDetailObj[keyArr[i]] = timeResult[i];
    }


    // out

    outResult = [];
    for (let i of outDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getOutMetric" ], { startDate, endDate, dimensions: temp });
      outResult.push(this.reportParsing(tempObj));
    }

    outTotalNumbers = outResult.map((obj) => { return obj.total });

    outDetailObj = {};
    keyArr = outDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      outDetailObj[keyArr[i]] = outResult[i];
    }


    // session

    sessionResult = [];
    for (let i of sessionDimensions) {
      temp = [];
      temp.push({ name: i.name });
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "getSessionMetric" ], { startDate, endDate, dimensions: temp });
      sessionResult.push(this.reportParsing(tempObj));
    }

    sessionTotalNumbers = sessionResult.map((obj) => { return obj.total });

    sessionDetailObj = {};
    keyArr = sessionDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      sessionDetailObj[keyArr[i]] = sessionResult[i];
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


    // with

    withResult = [];
    for (let i of sourceDimensions) {
      temp = [];
      temp.push({ name: i.name });
      temp.push({ name: "ga:source" })
      tempObj = await pythonExecute(this.pythonApp, [ "analytics", "generalMetric" ], { startDate, endDate, dimensions: temp });
      withResult.push(this.reportParsing(tempObj));
    }

    withDetailObj = {};
    keyArr = sourceDimensions.map((obj) => { return obj.name.replace(/ga\:/gi, '') })
    for (let i = 0; i < keyArr.length; i++) {
      withDetailObj[keyArr[i]] = withResult[i];
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
    endNext = stringToDate(endDate);
    endNext.setDate(endNext.getDate() + 1);

    finalObj = {
      key: "complex_analytics_" + startDate.replace(/\-/gi, '') + "_" + endDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: (endDate === startDate ? next : endNext),
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
        sessions: {
          total: sessionTotalNumbers.reduce((acc, cur) => { return (acc >= cur ? acc : cur) }, 0),
          detail: sessionDetailObj,
        },
        time: {
          detail: timeDetailObj,
        },
        out: {
          detail: outDetailObj,
        },
        source: {
          detail: withDetailObj,
        },
        conversion,
      }
    };

    return finalObj;
  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.complexStore = async function (year, month, selfMongo) {
  const instance = this;
  const back = this.back;
  try {
    const collection = "complexAnalytics";
    let json;
    let startDate, endDate;
    let rows;

    startDate = new Date(year, month - 1, 1);
    endDate = new Date((month === 12 ? year + 1 : year), (month === 12 ? 0 : month), 1);
    endDate.setDate(endDate.getDate() - 1);

    json = await this.complexMetric(startDate, endDate);

    rows = await back.mongoRead(collection, { key: json.key }, { selfMongo });
    if (rows.length !== 0) {
      await back.mongoDelete(collection, { key: json.key }, { selfMongo });
    }
    await back.mongoCreate(collection, json, { selfMongo });

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.complexReport = async function (year, month, selfMongo, selfCoreMongo) {
  const instance = this;
  const back = this.back;
  const { dateToString, stringToDate, equalJson, serviceParsing } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const collection = "complexReport";
    const querystring = require("querystring");
    const clients = await back.getClientsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });
    const requests = clients.getRequestsTong();
    const projects = await back.getProjectsByQuery({}, { selfMongo: selfCoreMongo });
    const [ { key, date, data } ] = await back.mongoRead("complexAnalytics", { key: { $regex: "^complex_analytics_" + String(year) + zeroAddition(month) } }, { selfMongo });
    const sourceSet = [
      {
        case: "메타",
        value: 0,
      },
      {
        case: "네이버",
        value: 0,
      },
      {
        case: "구글",
        value: 0,
      },
      {
        case: "유튜브",
        value: 0,
      },
      {
        case: "카카오",
        value: 0,
      },
      {
        case: "기타",
        value: 0,
      }
    ];
    let resultObj;
    let ageTotal;
    let genderTotal;
    let typeTotal;
    let sourceTotal;
    let sourceArr;
    let adArr;
    let adTotal;
    let deviceTotal;
    let sessionSourceTotal;
    let sessionSourceArr;
    let timeSourceTotal;
    let timeSourceArr;
    let boundSourceTotal;
    let boundSourceArr;
    let referrers;
    let referrersTemp;
    let referrersTong;
    let referrersTotal;
    let finalObj;
    let rows;
    let thisClients;
    let thisProjects;
    let pyeongSet;
    let pyeongArr;
    let pyeongTotal;
    let pyeongAverage;
    let serviceArr;
    let serviceSet;

    resultObj = {};
    finalObj = {};

    // total numbers

    resultObj.total = {
      users: data.users.total,
      sessions: data.sessions.total,
      views: data.views.total,
    };

    thisClients = requests.filter((obj) => {
      return obj.request.timeline.valueOf() >= (new Date(year, month - 1, 1)).valueOf() && obj.request.timeline.valueOf() < (new Date((month === 12 ? year + 1 : year), (month === 12 ? 0 : month), 1)).valueOf();
    });
    resultObj.total.request = thisClients.length;

    thisProjects = projects.toNormal().filter((obj) => {
      return obj.process.contract.first.date.valueOf() >= (new Date(year, month - 1, 1)).valueOf() && obj.process.contract.first.date.valueOf() < (new Date((month === 12 ? year + 1 : year), (month === 12 ? 0 : month), 1)).valueOf();
    });
    resultObj.total.contract = thisProjects.length;


    // age bracket

    resultObj.age = data.users.detail.userAgeBracket.cases;
    ageTotal = resultObj.age.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    resultObj.age = resultObj.age.map((obj) => {
      return {
        case: obj.case,
        value: obj.value,
        ratio: ageTotal === 0 ? 0 : (obj.value / ageTotal),
      }
    });
    resultObj.age.sort((a, b) => { return Number(a.case.slice(0, 2)) - Number(b.case.slice(0, 2)) })


    // gender

    resultObj.gender = data.users.detail.userGender.cases;
    genderTotal = resultObj.gender.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    resultObj.gender = resultObj.gender.map((obj) => {
      return {
        case: obj.case === "male" ? "남성" : "여성",
        value: obj.value,
        ratio: genderTotal === 0 ? 0 : (obj.value / genderTotal),
      }
    });


    // type

    resultObj.type = data.users.detail.userType.cases;
    typeTotal = resultObj.type.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    resultObj.type = resultObj.type.map((obj) => {
      return {
        case: /New/gi.test(obj.case) ? "신규" : "재방문",
        value: obj.value,
        ratio: typeTotal === 0 ? 0 : (obj.value / typeTotal),
      }
    });


    // source

    resultObj.source = data.views.detail.source.cases;
    sourceTotal = resultObj.source.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    sourceArr = equalJson(JSON.stringify(sourceSet));

    for (let obj of resultObj.source) {
      if (/facebook/gi.test(obj.case) || /instagram/gi.test(obj.case)) {
        sourceArr[0].value += obj.value;
      } else if (/naver/gi.test(obj.case)) {
        sourceArr[1].value += obj.value;
      } else if (/google/gi.test(obj.case)) {
        sourceArr[2].value += obj.value;
      } else if (/youtube/gi.test(obj.case)) {
        sourceArr[3].value += obj.value;
      } else if (/daum/gi.test(obj.case) || /kakao/gi.test(obj.case)) {
        sourceArr[4].value += obj.value;
      } else {
        sourceArr[5].value += obj.value;
      }
    }

    sourceArr = sourceArr.map((obj) => {
      return {
        case: obj.case,
        value: obj.value,
        ratio: sourceTotal === 0 ? 0 : (obj.value / sourceTotal),
      }
    });

    resultObj.source = sourceArr;


    // ad ratio

    resultObj.ad = data.source.detail.campaign.cases;
    adArr = equalJson(JSON.stringify(sourceSet));

    for (let obj of resultObj.ad) {
      if (!/\(not set\)/gi.test(obj.case)) {
        if (/facebook/gi.test(obj.case) || /instagram/gi.test(obj.case)) {
          adArr[0].value += obj.value;
        } else if (/naver/gi.test(obj.case)) {
          adArr[1].value += obj.value;
        } else if (/google/gi.test(obj.case)) {
          adArr[2].value += obj.value;
        } else if (/youtube/gi.test(obj.case)) {
          adArr[3].value += obj.value;
        } else if (/daum/gi.test(obj.case) || /kakao/gi.test(obj.case)) {
          adArr[4].value += obj.value;
        } else {
          adArr[5].value += obj.value;
        }
      }
    }

    adTotal = adArr.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    resultObj.ad = {
      total: {
        case: "광고",
        value: adTotal,
        opposite: sourceTotal - adTotal,
        ratio: sourceTotal === 0 ? 0 : adTotal / sourceTotal,
      },
      detail: adArr.map((obj, index) => {
        return {
          case: obj.case,
          value: obj.value,
          opposite: resultObj.source[index].value - obj.value,
          ratio: resultObj.source[index].value === 0 ? 0 : obj.value / resultObj.source[index].value
        }
      })
    }


    // device

    resultObj.device = data.views.detail.deviceCategory.cases;
    deviceTotal = resultObj.device.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    resultObj.device = resultObj.device.map((obj) => {
      return {
        case: /mobile/gi.test(obj.case) ? "모바일" : (/desktop/gi.test(obj.case) ? "데스크탑" : "태블릿"),
        value: obj.value,
        ratio: deviceTotal === 0 ? 0 : (obj.value / deviceTotal),
      }
    });


    // sessionSource

    resultObj.sessionSource = data.sessions.detail.source.cases;
    sessionSourceTotal = resultObj.sessionSource.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    sessionSourceArr = equalJson(JSON.stringify(sourceSet));

    for (let obj of resultObj.sessionSource) {
      if (/facebook/gi.test(obj.case) || /instagram/gi.test(obj.case)) {
        sessionSourceArr[0].value += obj.value;
      } else if (/naver/gi.test(obj.case)) {
        sessionSourceArr[1].value += obj.value;
      } else if (/google/gi.test(obj.case)) {
        sessionSourceArr[2].value += obj.value;
      } else if (/youtube/gi.test(obj.case)) {
        sessionSourceArr[3].value += obj.value;
      } else if (/daum/gi.test(obj.case) || /kakao/gi.test(obj.case)) {
        sessionSourceArr[4].value += obj.value;
      } else {
        sessionSourceArr[5].value += obj.value;
      }
    }

    sessionSourceArr = sessionSourceArr.map((obj) => {
      return {
        case: obj.case,
        value: obj.value,
        ratio: sessionSourceTotal === 0 ? 0 : (obj.value / sessionSourceTotal),
      }
    });

    resultObj.sessionSource = sessionSourceArr;



    // timeSource

    resultObj.timeSource = data.time.detail.source.cases;
    timeSourceTotal = resultObj.timeSource.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    timeSourceArr = equalJson(JSON.stringify(sourceSet));

    for (let obj of resultObj.timeSource) {
      if (/facebook/gi.test(obj.case) || /instagram/gi.test(obj.case)) {
        timeSourceArr[0].value += obj.value;
      } else if (/naver/gi.test(obj.case)) {
        timeSourceArr[1].value += obj.value;
      } else if (/google/gi.test(obj.case)) {
        timeSourceArr[2].value += obj.value;
      } else if (/youtube/gi.test(obj.case)) {
        timeSourceArr[3].value += obj.value;
      } else if (/daum/gi.test(obj.case) || /kakao/gi.test(obj.case)) {
        timeSourceArr[4].value += obj.value;
      } else {
        timeSourceArr[5].value += obj.value;
      }
    }

    timeSourceArr = timeSourceArr.map((obj) => {
      return {
        case: obj.case,
        value: obj.value,
        ratio: timeSourceTotal === 0 ? 0 : (obj.value / timeSourceTotal),
      }
    });

    resultObj.timeSource = timeSourceArr;


    // boundSource

    resultObj.boundSource = data.out.detail.source.cases;
    boundSourceTotal = resultObj.boundSource.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    boundSourceArr = equalJson(JSON.stringify(sourceSet));

    for (let obj of resultObj.boundSource) {
      if (/facebook/gi.test(obj.case) || /instagram/gi.test(obj.case)) {
        boundSourceArr[0].value += obj.value;
      } else if (/naver/gi.test(obj.case)) {
        boundSourceArr[1].value += obj.value;
      } else if (/google/gi.test(obj.case)) {
        boundSourceArr[2].value += obj.value;
      } else if (/youtube/gi.test(obj.case)) {
        boundSourceArr[3].value += obj.value;
      } else if (/daum/gi.test(obj.case) || /kakao/gi.test(obj.case)) {
        boundSourceArr[4].value += obj.value;
      } else {
        boundSourceArr[5].value += obj.value;
      }
    }

    boundSourceArr = boundSourceArr.map((obj) => {
      return {
        case: obj.case,
        value: obj.value,
        ratio: boundSourceTotal === 0 ? 0 : (obj.value / boundSourceTotal),
      }
    });

    resultObj.boundSource = boundSourceArr;


    // session per

    resultObj.source.forEach((obj, index) => {
      if (resultObj.sessionSource[index].value !== 0) {
        obj.sessionPer = Math.round(obj.value / resultObj.sessionSource[index].value);
      } else {
        obj.sessionPer = 0;
      }
    });

    resultObj.timeSource.forEach((obj, index) => {
      if (resultObj.sessionSource[index].value !== 0) {
        obj.sessionPer = Math.round(obj.value / resultObj.sessionSource[index].value);
      } else {
        obj.sessionPer = 0;
      }
    });

    resultObj.boundSource.forEach((obj, index) => {
      if (resultObj.sessionSource[index].value !== 0) {
        obj.boundRate = obj.value / resultObj.sessionSource[index].value;
      } else {
        obj.boundRate = 0;
      }
    });


    // keywords

    referrers = data.views.detail.userDefinedValue.cases
    referrers = referrers.filter((obj) => {
      return /\?/gi.test(obj.case);
    }).map((obj) => {
      return {
        case: Object.values(querystring.parse(obj.case.split("?")[1])).filter((str) => { return typeof str === "string" }).filter((str) => { return /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi.test(str) }).map((str) => { return str.trim() }),
        value: obj.value
      }
    }).filter((obj) => {
      return obj.case.length !== 0;
    });

    referrersTemp = [];
    for (let obj of referrers) {
      for (let str of obj.case) {
        referrersTemp.push({
          case: str,
          value: obj.value
        })
      }
    }

    referrersTong = [];
    for (let obj of referrersTemp) {
      if (referrersTong.findIndex((o) => { return o.case === obj.case }) === -1) {
        referrersTong.push({
          case: obj.case,
          value: obj.value
        })
      } else {
        referrersTong[referrersTong.findIndex((o) => { return o.case === obj.case })].value += obj.value;
      }
    }

    referrersTong.sort((a, b) => {
      return b.value - a.value;
    })

    referrersTotal = referrersTong.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    referrersTong.forEach((obj, index) => {
      obj.ratio = (referrersTotal === 0 ? 0 : obj.value / referrersTotal)
    });

    resultObj.query = referrersTong;



    // conversion

    resultObj.conversion = {};
    resultObj.conversion.popupOpen = Object.values(data.conversion[0].detail).reduce((acc, curr) => { return acc >= curr.total ? acc : curr.total }, 0);
    resultObj.conversion.consultingPage = Object.values(data.conversion[1].detail).reduce((acc, curr) => { return acc >= curr.total ? acc : curr.total }, 0);
    resultObj.conversion.total = resultObj.conversion.popupOpen + resultObj.conversion.consultingPage;

    resultObj.conversion.popupOpen = {
      value: resultObj.conversion.popupOpen,
      ratio: resultObj.total.views === 0 ? 0 : resultObj.conversion.popupOpen / resultObj.total.views,
    };

    resultObj.conversion.consultingPage = {
      value: resultObj.conversion.consultingPage,
      ratio: resultObj.total.views === 0 ? 0 : resultObj.conversion.consultingPage / resultObj.total.views,
    };

    resultObj.conversion.total = {
      value: resultObj.conversion.total,
      ratio: resultObj.total.views === 0 ? 0 : resultObj.conversion.total / resultObj.total.views,
    };



    // pyeong

    pyeongArr = thisClients.map(({ request }) => {
      return request.space.pyeong.value;
    });

    pyeongTotal = pyeongArr.reduce((acc, curr) => {
      return acc + curr;
    }, 0)

    pyeongAverage = Math.floor((pyeongArr.length === 0 ? 0 : pyeongTotal / pyeongArr.length) * 100) / 100;

    pyeongSet = [
      {
        case: "10평 미만",
        value: 0,
      },
      {
        case: "10평대",
        value: 0,
      },
      {
        case: "20평대",
        value: 0,
      },
      {
        case: "30평대",
        value: 0,
      },
      {
        case: "40평대",
        value: 0,
      },
      {
        case: "50평대",
        value: 0,
      },
      {
        case: "60평 이상",
        value: 0,
      }
    ];

    for (let number of pyeongArr) {
      if (number < 10) {
        pyeongSet[0].value = pyeongSet[0].value + 1;
      } else if (number >= 10 && number < 20) {
        pyeongSet[1].value = pyeongSet[1].value + 1;
      } else if (number >= 20 && number < 30) {
        pyeongSet[2].value = pyeongSet[2].value + 1;
      } else if (number >= 30 && number < 40) {
        pyeongSet[3].value = pyeongSet[3].value + 1;
      } else if (number >= 40 && number < 50) {
        pyeongSet[4].value = pyeongSet[4].value + 1;
      } else if (number >= 50 && number < 60) {
        pyeongSet[5].value = pyeongSet[5].value + 1;
      } else {
        pyeongSet[6].value = pyeongSet[6].value + 1;
      }
    }

    pyeongSet.forEach((obj, index) => {
      obj.ratio = pyeongArr.length === 0 ? 0 : obj.value / pyeongArr.length
    });

    resultObj.pyeong = {
      total: {
        average: pyeongAverage,
      },
      detail: pyeongSet
    }



    // service

    serviceArr = thisProjects.map((project) => {
      return serviceParsing(project.service);
    });

    serviceSet = [
      {
        case: "홈퍼니싱",
        value: 0,
      },
      {
        case: "홈스타일링",
        value: 0,
      },
      {
        case: "토탈 스타일링",
        value: 0,
      },
      {
        case: "엑스트라",
        value: 0,
      },
    ]

    for (let str of serviceArr) {
      if (/퍼니싱/gi.test(str)) {
        serviceSet[0].value = serviceSet[0].value + 1;
      } else if (/홈스타일링/gi.test(str)) {
        serviceSet[1].value = serviceSet[1].value + 1;
      } else if (/토탈/gi.test(str)) {
        serviceSet[2].value = serviceSet[2].value + 1;
      } else {
        serviceSet[3].value = serviceSet[3].value + 1;
      }
    }

    serviceSet.forEach((obj, index) => {
      obj.ratio = serviceArr.length === 0 ? 0 : obj.value / serviceArr.length
    });

    resultObj.service = {
      detail: serviceSet
    };


    // region





    // design fee





    // family









    // end
    finalObj = {
      key: key.replace(/^complex_analytics_/i, "complex_report_"),
      date,
      data: resultObj,
    };

    // store
    // rows = await back.mongoRead(collection, { key: finalObj.key }, { selfMongo });
    // if (rows.length !== 0) {
    //   await back.mongoDelete(collection, { key: finalObj.key }, { selfMongo });
    // }
    // await back.mongoCreate(collection, finalObj, { selfMongo });

    // console.log(finalObj.data);




    return finalObj;

  } catch (e) {
    console.log(e);
    console.log("complex store first");
  }
}

GoogleAnalytics.prototype.complexMatrix = async function (year, month, selfMongo) {
  const instance = this;
  const back = this.back;
  const { dateToString, stringToDate, equalJson } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const sheets = new GoogleSheet();
  try {
    const sheetsId = "1wKBOkcUB9eHfI8KgFp-s0IcLFO58B390Z6ghFdOMr_U";
    const collection = "complexReport";

    const [ { key, date, data } ] = await back.mongoRead(collection, { key: { $regex: "^complex_report_" + String(year) + zeroAddition(month) } }, { selfMongo });
    let matrix;
    let lengthMax;
    let thisLength;

    matrix = [
      [ String(year) + ". " + zeroAddition(month) ],
      [ "" ],
      [ "총괄", "" ],
      [ "항목", "값" ],
      [ "MAU", data.total.users ],
      [ "세션", data.total.sessions ],
      [ "페이지뷰", data.total.views ],
      [ "문의", data.total.request ],
      [ "계약", data.total.contract ],
      [ "" ],
      [ "나이대", "", "", "", "소스", "", "", "", "소스별 세션당 페이지뷰", "", "", "" ],
      [ "영역", "값", "비율", "", "항목", "값", "비율", "", "항목", "단위", "값", "" ],
      [ data.age[0].case, data.age[0].value, data.age[0].ratio, "", data.source[0].case, data.source[0].value, data.source[0].ratio, "", data.source[0].case, "평균값 (회)", data.source[0].sessionPer, "" ],
      [ data.age[1].case, data.age[1].value, data.age[1].ratio, "", data.source[1].case, data.source[1].value, data.source[1].ratio, "", data.source[1].case, "평균값 (회)", data.source[1].sessionPer, "" ],
      [ data.age[2].case, data.age[2].value, data.age[2].ratio, "", data.source[2].case, data.source[2].value, data.source[2].ratio, "", data.source[2].case, "평균값 (회)", data.source[2].sessionPer, "" ],
      [ data.age[3].case, data.age[3].value, data.age[3].ratio, "", data.source[3].case, data.source[3].value, data.source[3].ratio, "", data.source[3].case, "평균값 (회)", data.source[3].sessionPer, "" ],
      [ data.age[4].case, data.age[4].value, data.age[4].ratio, "", data.source[4].case, data.source[4].value, data.source[4].ratio, "", data.source[4].case, "평균값 (회)", data.source[4].sessionPer, "" ],
      [ data.age[5].case, data.age[5].value, data.age[5].ratio, "", data.source[5].case, data.source[5].value, data.source[5].ratio, "", data.source[5].case, "평균값 (회)", data.source[5].sessionPer, "" ],
      [ "" ],
      [ "성별", "", "", "", "paid 비율", "", "", "", "소스별 세션당 시간", "", "", "" ],
      [ "유형", "값", "비율", "", "항목", "값", "비율", "", "항목", "단위", "값", "" ],
      [ data.gender[0].case, data.gender[0].value, data.gender[0].ratio, "", "paid", data.ad.total.value, data.ad.total.ratio, "", data.timeSource[0].case, "평균값 (초)", data.timeSource[0].sessionPer, "" ],
      [ data.gender[1].case, data.gender[1].value, data.gender[1].ratio, "", "non-paid", data.ad.total.opposite, 1 - data.ad.total.ratio, "", data.timeSource[1].case, "평균값 (초)", data.timeSource[1].sessionPer, "" ],
      [ "", "", "", "", "", "", "", "", data.timeSource[2].case, "평균값 (초)", data.timeSource[2].sessionPer, "" ],
      [ "방문 유형", "", "", "", "소스별 paid 비율", "", "", "", data.timeSource[3].case, "평균값 (초)", data.timeSource[3].sessionPer, "" ],
      [ "유형", "값", "비율", "", "항목", "값", "비율", "", data.timeSource[4].case, "평균값 (초)", data.timeSource[4].sessionPer, "" ],
      [ data.type[0].case, data.type[0].value, data.type[0].ratio, "", data.ad.detail[0].case, data.ad.detail[0].value, data.ad.detail[0].ratio, "", data.timeSource[5].case, "평균값 (초)", data.timeSource[5].sessionPer, "" ],
      [ data.type[1].case, data.type[1].value, data.type[1].ratio, "", data.ad.detail[1].case, data.ad.detail[1].value, data.ad.detail[1].ratio, "", "", "", "", "" ],
      [ "", "", "", "", data.ad.detail[2].case, data.ad.detail[2].value, data.ad.detail[2].ratio, "", "소스별 이탈율", "", "", "" ],
      [ "디바이스", "", "", "", data.ad.detail[3].case, data.ad.detail[3].value, data.ad.detail[3].ratio, "", "항목", "단위", "값", "" ],
      [ "유형", "값", "비율", "", data.ad.detail[4].case, data.ad.detail[4].value, data.ad.detail[4].ratio, "", data.boundSource[0].case, "비율 (%)", data.boundSource[0].boundRate, "" ],
      [ data.device[0].case, data.device[0].value, data.device[0].ratio, "", data.ad.detail[5].case, data.ad.detail[5].value, data.ad.detail[5].ratio, "", data.boundSource[1].case, "비율 (%)", data.boundSource[1].boundRate, "" ],
      [ data.device[1].case, data.device[1].value, data.device[1].ratio, "", "", "", "", "", data.boundSource[2].case, "비율 (%)", data.boundSource[2].boundRate, "" ],
      [ data.device[2].case, data.device[2].value, data.device[2].ratio, "", "전환 비율", "", "", "", data.boundSource[3].case, "비율 (%)", data.boundSource[3].boundRate, "" ],
      [ "", "", "", "", "유형", "값", "비율", "", data.boundSource[4].case, "비율 (%)", data.boundSource[4].boundRate, "" ],
      [ "", "", "", "", "전체", data.conversion.total.value, data.conversion.total.ratio, "", data.boundSource[5].case, "비율 (%)", data.boundSource[5].boundRate, "" ],
      [ "", "", "", "", "신청 페이지", data.conversion.consultingPage.value, data.conversion.consultingPage.ratio, "", ],
      [ "", "", "", "", "신청 팝업", data.conversion.popupOpen.value, data.conversion.popupOpen.ratio, "", ],
    ];

    lengthMax = matrix.reduce((acc, curr) => {
      return acc >= curr.length ? acc : curr.length;
    }, 0)

    for (let arr of matrix) {
      thisLength = arr.length;
      for (let i = 0; i < lengthMax - thisLength; i++) {
        arr.push("");
      }
    }

    matrix[10] = matrix[10].concat([ "검색어" ]);
    matrix[11] = matrix[11].concat([ "단어", "값", "비율" ]);

    for (let i = 0; i < data.query.length; i++) {
      if (Array.isArray(matrix[12 + i])) {
        matrix[12 + i] = matrix[12 + i].concat([ data.query[i].case, data.query[i].value, data.query[i].ratio, ]);
      } else {
        matrix.push((new Array(lengthMax)).fill("").concat([ data.query[i].case, data.query[i].value, data.query[i].ratio, ]));
      }
    }

    lengthMax = matrix.reduce((acc, curr) => {
      return acc >= curr.length ? acc : curr.length;
    }, 0)

    for (let arr of matrix) {
      thisLength = arr.length;
      for (let i = 0; i < lengthMax - thisLength; i++) {
        arr.push("");
      }
    }

    await sheets.update_value_inPython(sheetsId, String(year) + ". " + zeroAddition(month), matrix);

    console.log(matrix);

    return matrix;

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.complexMonthly = async function (year, month) {
  const instance = this;
  const { mongo, mongoinfo, mongotestinfo, sleep } = this.mother;
  try {
    const selfMongo = new mongo(mongotestinfo, { useUnifiedTopology: true });
    const selfCoreMongo = new mongo(mongoinfo, { useUnifiedTopology: true });

    await selfMongo.connect();
    await selfCoreMongo.connect();

    await this.complexStore(year, month, selfMongo);

    await sleep(1000);

    await this.complexReport(year, month, selfMongo, selfCoreMongo);

    await sleep(1000);

    await this.complexMatrix(year, month, selfMongo);

    await selfMongo.close();
    await selfCoreMongo.close();

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.dailyQuery = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const queryCollection = "queryAnalytics";
    let from, to;
    let startDate;
    let now;
    let key;
    let json;
    let tempRows;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    for (let i = 0; i < dayNumber; i++) {

      await sleep(500);

      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      json = await this.queryParsing(from, selfMongo);

      if (json !== null) {
        key = json.key;

        tempRows = await back.mongoRead(queryCollection, { key }, { selfMongo });
        if (tempRows.length !== 0) {
          await back.mongoDelete(queryCollection, { key }, { selfMongo });
        }
        await back.mongoCreate(queryCollection, json, { selfMongo })
        console.log(json);
      } else {
        console.log(from, null);
      }

    }

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.queryParsing = async function (targetDate, selfMongo) {
  const instance = this;
  const { dateToString, stringToDate, pythonExecute, equalJson } = this.mother;
  const back = this.back;
  const querystring = require("querystring");
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

    const collection = "dailyAnalytics";
    let key;
    let start, end;
    let targetReport;
    let targetCases;
    let res;
    let tong;
    let googleRes;
    let result;
    let finalObj;

    start = stringToDate(targetDate);
    end = stringToDate(targetDate);
    end.setDate(end.getDate() + 1);
    key = ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's');
    [ targetReport ] = await back.mongoRead(collection, { anaid: key }, { selfMongo });
    if (targetReport !== undefined) {


      // from referrer

      targetCases = targetReport.data.views.detail.userDefinedValue.cases;

      res = targetCases.map((obj) => {
        return obj.case;
      }).filter((str) => {
        return /\?/gi.test(str)
      }).map((str) => {
        return querystring.parse(str.split('?')[1])
      }).map((obj) => {
        return Object.values(obj);
      }).map((arr) => {
        return arr.filter((str) => { return /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi.test(str) })
      }).flat(10).map((str) => {
        return str.trim();
      });

      tong = [ ...new Set(res) ].map((str) => {
        return { case: str, value: 0 };
      });

      for (let str of res) {
        for (let obj of tong) {
          if (str === obj.case) {
            obj.value = obj.value + 1;
          }
        }
      }

      tong.sort((a, b) => { return b.value - a.value });



      // from google

      googleRes = (await this.googleQuery(targetDate)).data.detail;
      googleRes = googleRes.filter((obj) => { return obj.clicks >= 1 }).map((obj) => { obj.query = obj.query.trim(); return obj; });

      for (let z of googleRes) {
        for (let obj of tong) {
          if (obj.case === z.query) {
            obj.value = obj.value + z.clicks;
            z.done = true;
          }
        }
      }
      googleRes = googleRes.filter((obj) => { return obj.done !== true });
      for (let { query, clicks } of googleRes) {
        tong.push({
          case: query,
          value: clicks,
        });
      }

      tong.sort((a, b) => { return b.value - a.value });


      // result

      finalObj = {
        key: targetDate.replace(/\-/gi, '') + "_query",
        date: {
          from: start,
          to: end,
        },
        data: {
          total: tong.reduce((acc, curr) => { return acc + curr.value }, 0),
          detail: tong
        }
      };

      return finalObj;

    } else {

      return null;

    }

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.googleQuery = async function (targetDate) {
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
      key: targetDate.replace(/\-/gi, '') + "_googleQuery",
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
    if (Array.isArray(res.rows)) {
      report.data.clicks = res.rows[0].clicks;
      report.data.impressions = res.rows[0].impressions;
    }

    res = equalJson(await pythonExecute(this.pythonApp, [ "analytics", "queryImpressions" ], { startDate: targetDate, endDate: targetDate }));
    if (Array.isArray(res.rows)) {
      report.data.detail = res.rows.map((obj) => {
        return {
          query: obj.keys[0],
          clicks: obj.clicks,
          impressions: obj.impressions
        }
      });
    }

    return report;

  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleAnalytics;
