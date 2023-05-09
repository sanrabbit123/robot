const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tempDir = process.cwd() + "/temp";
  this.tokenDir = this.dir + "/python/google/tokens";
  this.iamSecrets = this.tokenDir + "/iam_secrets.json";
  this.envConst = "GOOGLE_APPLICATION_CREDENTIALS";
  this.projectId = "";
  this.ready = false;
  this.propertyId = "227717726";
  this.property = `properties/${this.propertyId}`;
  this.collection = "homeliaisonAnalytics";
  this.unknownKeyword = "(not set)";
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
    let sourceMotherArr, campaignArr;

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

      sourceMotherArr = matrix.map((arr) => { return arr[1]; });
      sourceMotherArr = sourceMotherArr.map((str) => {
        if (/naver/gi.test(str)) {
          return "naver";
        } else if (/instagram/gi.test(str) || /facebook/gi.test(str)) {
          return "facebook";
        } else {
          return str;
        }
      });
      sourceMotherArr = [ ...new Set(sourceMotherArr) ];

      userTong.source.mother = sourceMotherArr.join(", ");
    } else {
      userTong.source.mother = "(direct)";
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
      campaignArr = matrix.map((arr) => { return arr[1]; });
      campaignArr = [ ...new Set(campaignArr) ];
      userTong.source.campaign = campaignArr.join(", ");
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

GoogleAnalytics.prototype.complexMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, stringToDate, pythonExecute, zeroAddition } = this.mother;
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
    let regionSet;
    let regionArr;
    let regionTotal;
    let feeArr;
    let feeTotal;
    let feeAverage;
    let feeSet;
    let familyArr;
    let familySet;
    let livingArr;
    let livingSet;
    let contractArr;
    let contractSet;

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
    ];

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

    regionSet = [
      {
        case: "서울",
        value: 0,
      },
      {
        case: "경기",
        value: 0,
      },
      {
        case: "충청",
        value: 0,
      },
      {
        case: "강원",
        value: 0,
      },
      {
        case: "경상",
        value: 0,
      },
      {
        case: "전라",
        value: 0,
      },
      {
        case: "제주",
        value: 0,
      },
      {
        case: "기타",
        value: 0,
      },
    ];

    regionArr = thisClients.map(({ request }) => {
      return request.space.address.value.trim();
    });

    for (let str of regionArr) {
      if (/^서울/gi.test(str) || /^강서/gi.test(str) || /^양천/gi.test(str) || /^구로/gi.test(str) || /^영등포/gi.test(str) || /^금천/gi.test(str)|| /^동작/gi.test(str)|| /^관악/gi.test(str)|| /^서초/gi.test(str)|| /^강남/gi.test(str)|| /^송파/gi.test(str)|| /^강동/gi.test(str)|| /^광진/gi.test(str)|| /^동대문/gi.test(str)|| /^성동/gi.test(str)|| /^중랑/gi.test(str)|| /^성북/gi.test(str)|| /^강북/gi.test(str)|| /^도봉/gi.test(str)|| /^노원/gi.test(str)|| /^종로/gi.test(str)|| /^서대문/gi.test(str)|| /^마포/gi.test(str)|| /^용산/gi.test(str)|| /^은평/gi.test(str)) {
        regionSet[0].value = regionSet[0].value + 1;
      } else if (/^경기/gi.test(str) || /^인천/gi.test(str) || /^수원/gi.test(str) || /^부평/gi.test(str) || /^의정부/gi.test(str) || /^부천/gi.test(str) || /^과천/gi.test(str) || /^고양/gi.test(str) || /^시흥/gi.test(str) || /^성남/gi.test(str) || /^파주/gi.test(str) || /^김포/gi.test(str) || /^양주/gi.test(str) || /^남양주/gi.test(str) || /^포천/gi.test(str) || /^안양/gi.test(str) || /^의왕/gi.test(str) || /^광명/gi.test(str) || /^동두천/gi.test(str) || /^화성/gi.test(str) || /^오산/gi.test(str) || /^안성/gi.test(str) || /^평택/gi.test(str) || /^이천/gi.test(str) || /^여주/gi.test(str) || /^안산/gi.test(str) || /^가평/gi.test(str) || /^양평/gi.test(str)) {
        regionSet[1].value = regionSet[1].value + 1;
      } else if (/^충청/gi.test(str) || /^충북/gi.test(str) || /^충남/gi.test(str) || /^세종/gi.test(str) || /^대전/gi.test(str) || /^충주/gi.test(str)) {
        regionSet[2].value = regionSet[2].value + 1;
      } else if (/^강원/gi.test(str) || /^원주/gi.test(str) || /^강릉/gi.test(str) || /^속초/gi.test(str)) {
        regionSet[3].value = regionSet[3].value + 1;
      } else if (/^경상/gi.test(str) || /^경북/gi.test(str) || /^경남/gi.test(str) || /^부산/gi.test(str) || /^울산/gi.test(str) || /^대구/gi.test(str)) {
        regionSet[4].value = regionSet[4].value + 1;
      } else if (/^전라/gi.test(str) || /^전북/gi.test(str) || /^전남/gi.test(str) || /^광주/gi.test(str) || /^전주/gi.test(str)) {
        regionSet[5].value = regionSet[5].value + 1;
      } else if (/^제주/gi.test(str)) {
        regionSet[6].value = regionSet[6].value + 1;
      } else {
        console.log(str);
        regionSet[7].value = regionSet[7].value + 1;
      }
    }

    regionSet.forEach((obj, index) => {
      obj.ratio = regionArr.length === 0 ? 0 : obj.value / regionArr.length
    });

    resultObj.region = {
      total: {
        metropolitan: {
          value: regionSet[0].value + regionSet[1].value,
          ratio: regionSet[0].ratio + regionSet[1].ratio,
        },
        nonMetropolitan: {
          value: regionSet[2].value + regionSet[3].value + regionSet[4].value + regionSet[5].value + regionSet[6].value + regionSet[7].value,
          ratio: 1 - (regionSet[0].ratio + regionSet[1].ratio),
        }
      },
      detail: regionSet
    };


    // design fee

    feeArr = thisProjects.map(({ process }) => {
      return process.contract.remain.calculation.amount.consumer;
    });

    feeTotal = feeArr.reduce((acc, curr) => {
      return acc + curr;
    }, 0)

    feeAverage = Math.floor((feeArr.length === 0 ? 0 : feeTotal / feeArr.length));

    feeSet = [
      {
        case: "100만원 이하",
        value: 0,
      },
      {
        case: "100만원대",
        value: 0,
      },
      {
        case: "200만원대",
        value: 0,
      },
      {
        case: "300만원대",
        value: 0,
      },
      {
        case: "400만원대",
        value: 0,
      },
      {
        case: "500만원대",
        value: 0,
      },
      {
        case: "600만원 이상",
        value: 0,
      }
    ];


    for (let number of feeArr) {
      if (number < 1000000) {
        feeSet[0].value = feeSet[0].value + 1;
      } else if (number >= 1000000 && number < 2000000) {
        feeSet[1].value = feeSet[1].value + 1;
      } else if (number >= 2000000 && number < 3000000) {
        feeSet[2].value = feeSet[2].value + 1;
      } else if (number >= 3000000 && number < 4000000) {
        feeSet[3].value = feeSet[3].value + 1;
      } else if (number >= 4000000 && number < 5000000) {
        feeSet[4].value = feeSet[4].value + 1;
      } else if (number >= 5000000 && number < 6000000) {
        feeSet[5].value = feeSet[5].value + 1;
      } else {
        feeSet[6].value = feeSet[6].value + 1;
      }
    }

    feeSet.forEach((obj, index) => {
      obj.ratio = feeArr.length === 0 ? 0 : obj.value / feeArr.length
    });

    resultObj.fee = {
      total: {
        average: feeAverage,
      },
      detail: feeSet
    }


    // family

    familyArr = thisClients.map(({ request }) => {
      return request.family.value;
    });

    familySet = [
      {
        case: "1인 가구",
        value: 0,
      },
      {
        case: "부부",
        value: 0,
      },
      {
        case: "기타",
        value: 0,
      },
    ];

    for (let str of familyArr) {
      if (/1인/gi.test(str)) {
        familySet[0].value = familySet[0].value + 1;
      } else if (/부부/gi.test(str)) {
        familySet[1].value = familySet[1].value + 1;
      } else {
        familySet[2].value = familySet[2].value + 1;
      }
    }

    familySet.forEach((obj, index) => {
      obj.ratio = familyArr.length === 0 ? 0 : obj.value / familyArr.length
    });

    resultObj.family = {
      detail: familySet
    };



    // living

    livingArr = thisClients.map(({ request }) => {
      return request.space.resident.living;
    });

    livingSet = [
      {
        case: "이사",
        value: 0,
      },
      {
        case: "거주중",
        value: 0,
      },
    ];

    for (let boo of livingArr) {
      if (!boo) {
        livingSet[0].value = livingSet[0].value + 1;
      } else {
        livingSet[1].value = livingSet[1].value + 1;
      }
    }

    livingSet.forEach((obj, index) => {
      obj.ratio = livingArr.length === 0 ? 0 : obj.value / livingArr.length
    });

    resultObj.living = {
      detail: livingSet
    };

    // contract

    contractArr = thisClients.map(({ request }) => {
      return request.space.contract.value;
    });

    contractSet = [
      {
        case: "자가",
        value: 0,
      },
      {
        case: "전월세",
        value: 0,
      },
    ];

    for (let str of contractArr) {
      if (/자가/gi.test(str)) {
        contractSet[0].value = contractSet[0].value + 1;
      } else if (/전월세/gi.test(str)) {
        contractSet[1].value = contractSet[1].value + 1;
      }
    }

    contractSet.forEach((obj, index) => {
      obj.ratio = contractArr.length === 0 ? 0 : obj.value / contractArr.length
    });

    resultObj.contract = {
      detail: contractSet
    };


    // end
    finalObj = {
      key: key.replace(/^complex_analytics_/i, "complex_report_"),
      date,
      data: resultObj,
    };

    // store
    rows = await back.mongoRead(collection, { key: finalObj.key }, { selfMongo });
    if (rows.length !== 0) {
      await back.mongoDelete(collection, { key: finalObj.key }, { selfMongo });
    }
    await back.mongoCreate(collection, finalObj, { selfMongo });

    console.log(finalObj.data);

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
      [ "평수", "", "", "", "전체", data.conversion.total.value, data.conversion.total.ratio, "", data.boundSource[5].case, "비율 (%)", data.boundSource[5].boundRate, "" ],
      [ "전체 평균", data.pyeong.total.average, "평", "", "신청 페이지", data.conversion.consultingPage.value, data.conversion.consultingPage.ratio, "", ],
      [ "유형", "값", "비율", "", "신청 팝업", data.conversion.popupOpen.value, data.conversion.popupOpen.ratio, "", ],
      [ data.pyeong.detail[0].case, data.pyeong.detail[0].value, data.pyeong.detail[0].ratio, "", "", "", "", "", ],
      [ data.pyeong.detail[1].case, data.pyeong.detail[1].value, data.pyeong.detail[1].ratio, "", "서비스", "", "", "", ],
      [ data.pyeong.detail[2].case, data.pyeong.detail[2].value, data.pyeong.detail[2].ratio, "", "유형", "값", "비율", "", ],
      [ data.pyeong.detail[3].case, data.pyeong.detail[3].value, data.pyeong.detail[3].ratio, "", data.service.detail[0].case, data.service.detail[0].value, data.service.detail[0].ratio, "", ],
      [ data.pyeong.detail[4].case, data.pyeong.detail[4].value, data.pyeong.detail[4].ratio, "", data.service.detail[1].case, data.service.detail[1].value, data.service.detail[1].ratio, "", ],
      [ data.pyeong.detail[5].case, data.pyeong.detail[5].value, data.pyeong.detail[5].ratio, "", data.service.detail[2].case, data.service.detail[2].value, data.service.detail[2].ratio, "", ],
      [ data.pyeong.detail[6].case, data.pyeong.detail[6].value, data.pyeong.detail[6].ratio, "", data.service.detail[3].case, data.service.detail[3].value, data.service.detail[3].ratio, "", ],
      [ "", "", "", "", "", "", "", "", ],
      [ "지역", "", "", "", "디자인비", "", "", "", ],
      [ "수도권", data.region.total.metropolitan.value, data.region.total.metropolitan.ratio, "", "전체 평균", data.fee.total.average, "원", "", ],
      [ "비수도권", data.region.total.nonMetropolitan.value, data.region.total.nonMetropolitan.ratio, "", "유형", "값", "비율", "", ],
      [ "유형", "값", "비율", "", data.fee.detail[0].case, data.fee.detail[0].value, data.fee.detail[0].ratio, "", ],
      [ data.region.detail[0].case, data.region.detail[0].value, data.region.detail[0].ratio, "", data.fee.detail[1].case, data.fee.detail[1].value, data.fee.detail[1].ratio, "", ],
      [ data.region.detail[1].case, data.region.detail[1].value, data.region.detail[1].ratio, "", data.fee.detail[2].case, data.fee.detail[2].value, data.fee.detail[2].ratio, "", ],
      [ data.region.detail[2].case, data.region.detail[2].value, data.region.detail[2].ratio, "", data.fee.detail[3].case, data.fee.detail[3].value, data.fee.detail[3].ratio, "", ],
      [ data.region.detail[3].case, data.region.detail[3].value, data.region.detail[3].ratio, "", data.fee.detail[4].case, data.fee.detail[4].value, data.fee.detail[4].ratio, "", ],
      [ data.region.detail[4].case, data.region.detail[4].value, data.region.detail[4].ratio, "", data.fee.detail[5].case, data.fee.detail[5].value, data.fee.detail[5].ratio, "", ],
      [ data.region.detail[5].case, data.region.detail[5].value, data.region.detail[5].ratio, "", data.fee.detail[6].case, data.fee.detail[6].value, data.fee.detail[6].ratio, "", ],
      [ data.region.detail[6].case, data.region.detail[6].value, data.region.detail[6].ratio, "", "", "", "", "", ],
      [ data.region.detail[7].case, data.region.detail[7].value, data.region.detail[6].ratio, "", "이사 여부", "", "", "", ],
      [ "", "", "", "", "유형", "값", "비율", "", ],
      [ "가족 구성", "", "", "", data.living.detail[0].case, data.living.detail[0].value, data.living.detail[0].ratio, "", ],
      [ "유형", "값", "비율", "", data.living.detail[1].case, data.living.detail[1].value, data.living.detail[1].ratio, "", ],
      [ data.family.detail[0].case, data.family.detail[0].value, data.family.detail[0].ratio, "", "", "", "", "", ],
      [ data.family.detail[1].case, data.family.detail[1].value, data.family.detail[1].ratio, "", "계약 상태", "", "", "", ],
      [ data.family.detail[2].case, data.family.detail[2].value, data.family.detail[2].ratio, "", "유형", "값", "비율", "", ],
      [ "", "", "", "", data.contract.detail[0].case, data.contract.detail[0].value, data.contract.detail[0].ratio, "", ],
      [ "", "", "", "", data.contract.detail[1].case, data.contract.detail[1].value, data.contract.detail[1].ratio, "", ],
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

GoogleAnalytics.prototype.complexGraph = async function (selfMongo) {
  const instance = this;
  const back = this.back;
  const { dateToString, stringToDate, equalJson } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const sheets = new GoogleSheet();
  try {
    const sheetsId = "1wKBOkcUB9eHfI8KgFp-s0IcLFO58B390Z6ghFdOMr_U";
    const collection = "complexReport";
    let matrix;
    let columns;
    let tempArr;
    let rows;

    rows = await back.mongoRead(collection, {}, { selfMongo });
    rows.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });

    // total - web
    columns = [
      "날짜",
      "MAU",
      "세션",
      "페이지뷰",
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.total.users,
        data.total.sessions,
        data.total.views,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_web", matrix);
    console.log(matrix);


    // total - clients
    columns = [
      "날짜",
      "문의",
      "계약",
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.total.request,
        data.total.contract,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_clients", matrix);
    console.log(matrix);


    // age
    columns = [
      "날짜",
      rows[0].data.age[0].case,
      rows[0].data.age[1].case,
      rows[0].data.age[2].case,
      rows[0].data.age[3].case,
      rows[0].data.age[4].case,
      rows[0].data.age[5].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.age[0].ratio,
        data.age[1].ratio,
        data.age[2].ratio,
        data.age[3].ratio,
        data.age[4].ratio,
        data.age[5].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_age", matrix);
    console.log(matrix);

    // gender
    columns = [
      "날짜",
      rows[0].data.gender[0].case === "여성" ? rows[0].data.gender[0].case : rows[0].data.gender[1].case,
      rows[0].data.gender[0].case === "여성" ? rows[0].data.gender[1].case : rows[0].data.gender[0].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.gender[0].case === "여성" ? data.gender[0].ratio : data.gender[1].ratio,
        data.gender[0].case === "여성" ? data.gender[1].ratio : data.gender[0].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_gender", matrix);
    console.log(matrix);

    // type
    columns = [
      "날짜",
      rows[0].data.type[0].case === "신규" ? rows[0].data.type[0].case : rows[0].data.type[1].case,
      rows[0].data.type[0].case === "신규" ? rows[0].data.type[1].case : rows[0].data.type[0].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.type[0].case === "신규" ? data.type[0].ratio : data.type[1].ratio,
        data.type[0].case === "신규" ? data.type[1].ratio : data.type[0].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_type", matrix);
    console.log(matrix);

    // pyeong
    columns = [
      "날짜",
      rows[0].data.pyeong.detail[0].case,
      rows[0].data.pyeong.detail[1].case,
      rows[0].data.pyeong.detail[2].case,
      rows[0].data.pyeong.detail[3].case,
      rows[0].data.pyeong.detail[4].case,
      rows[0].data.pyeong.detail[5].case,
      rows[0].data.pyeong.detail[6].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.pyeong.detail[0].ratio,
        data.pyeong.detail[1].ratio,
        data.pyeong.detail[2].ratio,
        data.pyeong.detail[3].ratio,
        data.pyeong.detail[4].ratio,
        data.pyeong.detail[5].ratio,
        data.pyeong.detail[6].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_pyeong", matrix);
    console.log(matrix);

    // region
    columns = [
      "날짜",
      rows[0].data.region.detail[0].case,
      rows[0].data.region.detail[1].case,
      rows[0].data.region.detail[2].case,
      rows[0].data.region.detail[3].case,
      rows[0].data.region.detail[4].case,
      rows[0].data.region.detail[5].case,
      rows[0].data.region.detail[6].case,
      rows[0].data.region.detail[7].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.region.detail[0].ratio,
        data.region.detail[1].ratio,
        data.region.detail[2].ratio,
        data.region.detail[3].ratio,
        data.region.detail[4].ratio,
        data.region.detail[5].ratio,
        data.region.detail[6].ratio,
        data.region.detail[7].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_region", matrix);
    console.log(matrix);

    // family
    columns = [
      "날짜",
      rows[0].data.family.detail[0].case,
      rows[0].data.family.detail[1].case,
      rows[0].data.family.detail[2].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.family.detail[0].ratio,
        data.family.detail[1].ratio,
        data.family.detail[2].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_family", matrix);
    console.log(matrix);

    // service
    columns = [
      "날짜",
      rows[0].data.service.detail[0].case,
      rows[0].data.service.detail[1].case,
      rows[0].data.service.detail[2].case,
      rows[0].data.service.detail[3].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.service.detail[0].ratio,
        data.service.detail[1].ratio,
        data.service.detail[2].ratio,
        data.service.detail[3].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_service", matrix);
    console.log(matrix);

    // fee
    columns = [
      "날짜",
      rows[0].data.fee.detail[0].case,
      rows[0].data.fee.detail[1].case,
      rows[0].data.fee.detail[2].case,
      rows[0].data.fee.detail[3].case,
      rows[0].data.fee.detail[4].case,
      rows[0].data.fee.detail[5].case,
      rows[0].data.fee.detail[6].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.fee.detail[0].value,
        data.fee.detail[1].value,
        data.fee.detail[2].value,
        data.fee.detail[3].value,
        data.fee.detail[4].value,
        data.fee.detail[5].value,
        data.fee.detail[6].value,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_fee", matrix);
    console.log(matrix);

    // source
    columns = [
      "날짜",
      rows[0].data.source[0].case,
      rows[0].data.source[1].case,
      rows[0].data.source[2].case,
      rows[0].data.source[3].case,
      rows[0].data.source[4].case,
      rows[0].data.source[5].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.source[0].ratio,
        data.source[1].ratio,
        data.source[2].ratio,
        data.source[3].ratio,
        data.source[4].ratio,
        data.source[5].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_source", matrix);
    console.log(matrix);

    // paid
    columns = [
      "날짜",
      "paid",
      "non-paid",
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.ad.total.ratio,
        1 - data.ad.total.ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_paid", matrix);
    console.log(matrix);

    // conversion
    columns = [
      "날짜",
      "전체",
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.conversion.total.value,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_conversion", matrix);
    console.log(matrix);


    // living
    columns = [
      "날짜",
      rows[0].data.living.detail[0].case,
      rows[0].data.living.detail[1].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.living.detail[0].ratio,
        data.living.detail[1].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_living", matrix);
    console.log(matrix);


    // contract
    columns = [
      "날짜",
      rows[0].data.contract.detail[0].case,
      rows[0].data.contract.detail[1].case,
    ];
    matrix = [ columns ];
    for (let { date, data } of rows) {
      matrix.push([
        dateToString(date.from).replace(/\-/gi, ". ").slice(0, 8),
        data.contract.detail[0].ratio,
        data.contract.detail[1].ratio,
      ]);
    }
    await sheets.update_value_inPython(sheetsId, "raw_contract", matrix);
    console.log(matrix);


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

    await sleep(1000);

    await this.complexGraph(selfMongo);

    await selfMongo.close();
    await selfCoreMongo.close();

  } catch (e) {
    console.log(e);
  }
}

// new area ============================================================================================

GoogleAnalytics.prototype.setCredentials = async function () {
  const instance = this;
  const { envConst, iamSecrets } = this;
  const { fileSystem } = this.mother;
  try {
    let jsonContents;

    process.env[envConst] = iamSecrets;
    jsonContents = await fileSystem(`readJson`, [ iamSecrets ]);
    this.projectId = jsonContents["project_id"];
    this.ready = true;

  } catch (e) {
    console.log(e);
  }
}

GoogleAnalytics.prototype.returnAnalyticsObject = async function (analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter = null) {
  const instance = this;
  const { property } = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition } = this.mother;
  try {
    let metrics, dimensions;
    let thisCases, thisTotal, thisKinds;
    let detailObj;
    let metricResult;
    let parsingResponse;
    let reportRequest;

    parsingResponse = (arr) => {
      const [ response ] = arr;
      const result = response.rows.map((obj) => {
        let arr;
        arr = [];
        for (let i = 0; i < obj.dimensionValues.length; i++) {
          arr.push({
            case: obj.dimensionValues[i].value,
            value: Number(obj.metricValues[i].value),
          })
        }
        return arr;
      }).flat();
      result.sort((a, b) => { return b.value - a.value });
      return result;
    }
    metricResult = {};
    metrics = [ { name: metric } ];
    detailObj = {};
    for (let { title, name, filter } of dimensionsArr) {
      dimensions = [ { name } ];
      reportRequest = { property, dateRanges: [ { startDate: startDate, endDate: endDate } ], dimensions, metrics };
      if (dimensionFilter !== null) {
        reportRequest.dimensionFilter = dimensionFilter;
      }
      thisCases = parsingResponse(await analyticsDataClient.runReport(reportRequest));
      if (typeof filter === "function") {
        thisCases = thisCases.map((obj) => {
          obj.case = filter(obj.case);
          return obj;
        })
      }
      thisTotal = thisCases.reduce((acc, curr) => { return acc + curr.value }, 0);
      thisKinds = thisCases.length;
      detailObj[title] = {
        cases: thisCases,
        total: thisTotal,
        kinds: thisKinds,
      };
    }
    metricResult.total = Object.values(detailObj).reduce((acc, curr) => { return acc >= curr.total ? acc : curr.total }, 0)
    metricResult.detail = detailObj;

    return metricResult;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.dailyMetric = async function (thisDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition } = this.mother;
  const { BetaAnalyticsDataClient } = require("@google-analytics/data");
  try {
    let startDate, endDate;
    let userMetric, userDimensions;
    let viewMetric, viewDimensions;
    let eventMetric, eventDimensions;
    let conversionPopupOpenMetric, conversionPopupOpenDimensions;
    let conversionConsultingPageMetric, conversionConsultingPageDimensions;
    let analyticsDataClient;
    let dataObject;
    let finalObj;
    let start;
    let next;

    if (!(thisDate instanceof Date)) {
      throw new Error("invalid input");
    }

    startDate = new Date(JSON.stringify(thisDate).slice(1, -1));
    endDate = new Date(JSON.stringify(thisDate).slice(1, -1));
    startDate = dateToString(startDate);
    endDate = dateToString(endDate);

    await this.setCredentials();
    analyticsDataClient = new BetaAnalyticsDataClient();
    dataObject = {};

    // users
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "country", name: "country", meaning: "국가", filter: null },
      { title: "city", name: "city", meaning: "도시", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);


    // views
    viewMetric = "screenPageViews";
    viewDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "referer", name: "pageReferrer", meaning: "레퍼럴", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.views = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, viewMetric, viewDimensions);


    // events
    eventMetric = "eventCount";
    eventDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "eventName", name: "eventName", meaning: "이벤트 이름", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.events = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, eventMetric, eventDimensions);


    // conversion
    dataObject.conversion = {};

    // conversion - popup open
    conversionPopupOpenMetric = "eventCount";
    conversionPopupOpenDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.conversion.popupOpen = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionPopupOpenMetric, conversionPopupOpenDimensions, { filter: { fieldName: "eventName", stringFilter: { matchType: "CONTAINS", value: "popupOpen", caseSensitive: true } } });


    // conversion - consulting page
    conversionConsultingPageMetric = "screenPageViews";
    conversionConsultingPageDimensions = [
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.conversion.consultingPage = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionConsultingPageMetric, conversionConsultingPageDimensions, { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "consulting.php", caseSensitive: true } } });


    // final
    start = new Date(JSON.stringify(thisDate).slice(1, -1));
    next = new Date(JSON.stringify(thisDate).slice(1, -1));
    next.setDate(next.getDate() + 1);
    finalObj = {
      anaid: ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's'),
      date: {
        from: start,
        to: next,
      },
      data: dataObject
    };

    return finalObj;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.dailyClients = async function (thisDate, selfCoreMongo, selfMongo) {
  const instance = this;
  const back = this.back;
  const { equalJson, zeroAddition } = this.mother;
  try {
    let targetClients;
    let fromDate, toDate;
    let targetCliids;
    let sessionResult;
    let dataObject;
    let finalObj;

    if (!(thisDate instanceof Date)) {
      throw new Error("invalid input");
    }

    dataObject = {};

    fromDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
    toDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);

    targetClients = (await back.getClientsByQuery({
      "requests": {
        $elemMatch: {
          "request.timeline": {
            $gte: fromDate,
            $lt: toDate,
          }
        }
      }
    }, { selfMongo: selfCoreMongo })).toNormal();
    targetCliids = targetClients.map((client) => { return client.cliid });
    dataObject.cliid = targetCliids;
    dataObject.detail = [];
    for (let cliid of targetCliids) {
      sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo);
      if (sessionResult === null) {
        throw new Error("session parsing error");
      }
      dataObject.detail.push(sessionResult);
    }

    finalObj = {
      ancid: ('y' + String(fromDate.getFullYear()).slice(2) + zeroAddition(fromDate.getMonth() + 1) + '_' + "aa" + zeroAddition(fromDate.getDate()) + 's'),
      date: {
        from: fromDate,
        to: toDate,
      },
      data: dataObject
    };

    return finalObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.getSessionObjectByCliid = async function (cliid, selfMongo) {
  const instance = this;
  const back = this.back;
  const { collection, unknownKeyword } = this;
  const { dateToString, stringToDate, ipParsing, requestSystem } = this.mother;
  const querystring = require("querystring");
  try {
    let rows;
    let sessionIds;
    let whereQuery, updateQuery;
    let thisIp;
    let thisObj;
    let queryStrings;
    let sourceArr, campaignArr;
    let thisSource, thisCampaign;
    let referrerArr;
    let userObj;
    let historyFactor;
    let mediumArr;
    let thisMedium;
    let finalObj;

    rows = await back.mongoRead(collection, { "data.cliid": cliid }, { selfMongo });
    rows = rows.map((obj) => { return obj.id });
    sessionIds = [ ...new Set(rows) ];

    finalObj = {
      cliid,
      users: [],
    };

    for (let id of sessionIds) {

      whereQuery = { id };
      rows = await back.mongoRead(collection, whereQuery, { selfMongo });

      if (rows.length > 0) {

        rows.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
        queryStrings = [];
        referrerArr = [];
        for (let row of rows) {
          if (/\?/gi.test(row.info.requestUrl)) {
            queryStrings.push(querystring.parse(row.info.requestUrl.split("?")[1]));
          }
          if (!(new RegExp(instance.address.frontinfo.host, "gi")).test(row.info.referer)) {
            if (!(new RegExp(unknownKeyword, "i")).test(row.info.referer)) {
              referrerArr.push(row.info.referer);
            }
          }
        }
  
        referrerArr = [ ...new Set(referrerArr) ];
  
        sourceArr = [];
        campaignArr = [];
        mediumArr = [];
  
        for (let obj of queryStrings) {
          if (obj["utm_source"] !== undefined) {
            sourceArr.push(obj["utm_source"]);
          }
          if (obj["utm_campaign"] !== undefined) {
            campaignArr.push(obj["utm_campaign"]);
          }
          if (obj["utm_medium"] !== undefined) {
            mediumArr.push(obj["utm_medium"]);
          }
        }
  
        thisSource = [ ...new Set(sourceArr) ];
        thisCampaign = [ ...new Set(campaignArr) ];
        thisMedium = [ ...new Set(mediumArr) ];
        
        thisSource = Array.from(new Set(thisSource.map((str) => {
          let result;
          if (/naver/gi.test(str)) {
            result = "naver";
          } else if (/instagram/gi.test(str) || /facebook/gi.test(str)) {
            result = "facebook";
          } else {
            result = str;
          }
          return result;
        })));
  
        if (Object.keys(rows[0].network).length === 0) {
          thisIp = rows[0].info.ip;
          thisObj = await ipParsing(thisIp);
          rows[0].network = thisObj;

          if (Object.keys(rows[0].network).length === 0) {
            throw new Error("invalid ip address");
          }
        }

        userObj = {
          id: id,
          type: (rows[rows.length - 1].date.valueOf() - rows[0].date.valueOf()) >= (1000 * 60 * 60 * 24) ? "Returning Visitor" : "New Visitor",
          history: [],
          source: {
            referrer: referrerArr,
            mother: thisSource,
            medium: thisMedium,
            campaign: thisCampaign
          },
          device: {
            kinds: rows[0].device.device.type,
            os: rows[0].device.os.name,
            browser: rows[0].device.os.browser,
          },
          region: {
            country: /KR/gi.test(rows[0].network.country) ? "South Korea" : rows[0].network.country,
            city: (rows[0].network.region === rows[0].network.city) ? rows[0].network.city : (rows[0].network.region + " " + rows[0].network.city),
          }
        };

        for (let row of rows) {
          historyFactor = {};
          historyFactor.date = new Date(JSON.stringify(row.date).slice(1, -1));
          historyFactor.path = row.info.requestUrl;
          historyFactor.referer = row.info.referer;
          historyFactor.title = (/\<title\>([^\<]*)\<\/title\>/gi.exec((await requestSystem("https://" + instance.address.frontinfo.host + row.info.requestUrl)).data))[1];
          historyFactor.event = row.action;
          userObj.history.push(historyFactor);
        }

        finalObj.users.push(userObj);
      }
    }

    return finalObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.simpleMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition } = this.mother;
  const { BetaAnalyticsDataClient } = require("@google-analytics/data");
  try {
    let analyticsDataClient;
    let dataObject;
    let userMetric;
    let userDimensions;
    let eventMetric;
    let eventDimensions;
    let finalObj;
    let start;
    let next;
    let end;
    let endNext;

    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }
    if (startDate instanceof Date) {
      startDate = dateToString(startDate);
    }
    if (endDate instanceof Date) {
      endDate = dateToString(endDate);
    }

    await this.setCredentials();
    analyticsDataClient = new BetaAnalyticsDataClient();
    dataObject = {};

    // users
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);


    // events
    eventMetric = "eventCount";
    eventDimensions = [
      { title: "eventName", name: "eventName", meaning: "이벤트 이름", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.events = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, eventMetric, eventDimensions);


    // end
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
      data: dataObject
    };

    return finalObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.queryParsing = async function (targetDate, selfMongo) {
  const instance = this;
  const { dateToString, stringToDate, equalJson, zeroAddition } = this.mother;
  const back = this.back;
  const querystring = require("querystring");
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
      targetCases = targetReport.data.views.detail.referer.cases;

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
  const { dateToString, stringToDate, pythonExecute, equalJson, zeroAddition } = this.mother;
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

    res = equalJson(await pythonExecute(this.pythonApp, [ "console", "basicImpressions" ], { startDate: targetDate, endDate: targetDate }));
    if (Array.isArray(res.rows)) {
      report.data.clicks = res.rows[0].clicks;
      report.data.impressions = res.rows[0].impressions;
    }

    res = equalJson(await pythonExecute(this.pythonApp, [ "console", "queryImpressions" ], { startDate: targetDate, endDate: targetDate }));
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
