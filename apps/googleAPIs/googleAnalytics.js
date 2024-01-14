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
  this.clientAnalyticsCollection = "clientAnalytics";
  this.realtimeCollection = "realtimeAnalytics";
  this.unknownKeyword = "(not set)";
  this.nullWords = "null";
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

GoogleAnalytics.prototype.returnAnalyticsObjectExecute = async function (analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter = null) {
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

GoogleAnalytics.prototype.returnAnalyticsObject = async function (analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter = null) {
  const instance = this;
  const { sleep, emergencyAlarm } = this.mother;
  try {
    let result;
    let safeNum;
    await sleep(500);
    result = await this.returnAnalyticsObjectExecute(analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter);
    safeNum = 0;
    while (result === null) {
      await sleep(5 * 1000);
      result = await this.returnAnalyticsObjectExecute(analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter);
      safeNum++;
      if (safeNum > 10) {
        break;
      }
    }
    if (result === null) {
      throw new Error("metric fail");
    }
    return result;
  } catch (e) {
    await emergencyAlarm("metric fail (GoogleAnalytics.prototype.returnAnalyticsObject): " + e.message);
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.dailyMetric = async function (thisDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, emergencyAlarm, sleep } = this.mother;
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

    await sleep(500);

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
    if (dataObject.users === null) {
      throw new Error("users parsing fail");
    }

    await sleep(500);

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
    if (dataObject.views === null) {
      throw new Error("views parsing fail");
    }

    await sleep(500);

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
    if (dataObject.events === null) {
      throw new Error("events parsing fail");
    }

    // conversion
    dataObject.conversion = {};

    await sleep(500);

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
    if (dataObject.conversion.popupOpen === null) {
      throw new Error("conversion.popupOpen parsing fail");
    }

    await sleep(500);

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
    if (dataObject.conversion.consultingPage === null) {
      throw new Error("conversion.consultingPage parsing fail");
    }

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
    await emergencyAlarm("GoogleAnalytics.dailyMetric error : " + e.message + " / " + dateToString(thisDate));
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
      sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo, selfCoreMongo);
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

GoogleAnalytics.prototype.getSessionObjectByCliid = async function (cliid, selfMongo, selfCoreMongo) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { collection, unknownKeyword } = this;
  const { dateToString, stringToDate, ipParsing, requestSystem, sleep, emergencyAlarm } = this.mother;
  const querystring = require("querystring");
  try {
    let rows, rows2;
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
    let num;
    let rowsMother;
    let thisClient;

    thisClient = await back.getClientById(cliid, { selfMongo: selfCoreMongo, toNormal: true });
    rows = await back.mongoRead(collection, { "data.cliid": cliid }, { selfMongo });
    rows2 = await back.mongoRead(collection, { "data.value": thisClient.phone }, { selfMongo });
    rows = rows.concat(rows2);
    rows = rows.filter((obj) => {
      return !/\&mode\=test/g.test(obj.info.requestUrl);
    }).filter((obj) => {
      return !/\&view\=test/g.test(obj.info.requestUrl);
    }).filter((obj) => {
      const thisDateValue = obj.date.valueOf();
      let histories0, histories1;
      let nonIpList;
      histories0 = address.homeinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      histories1 = address.memberinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      nonIpList = histories0.concat(histories1).map((o) => {
        return o.ip.trim().replace(/[^0-9]/gi, '');
      })
      return !nonIpList.includes(obj.network.ip.trim().replace(/[^0-9]/gi, ''));
    }).map((obj) => { return obj.id });
    sessionIds = [ ...new Set(rows) ];

    finalObj = {
      cliid,
      users: [],
    };

    await sleep(1000);
    if (sessionIds.length > 0) {
      rowsMother = await back.mongoRead(collection, { $or: sessionIds.map((id) => { return { id } }) }, { selfMongo });
    } else {
      rowsMother = [];
    }

    for (let id of sessionIds) {

      rows = rowsMother.filter((o) => { return o.id === id });
      if (rows.length > 0) {

        rows.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
        queryStrings = [];
        referrerArr = [];
        num = 0;
        for (let row of rows) {
          if (/\?/gi.test(row.info.requestUrl)) {
            queryStrings.push(querystring.parse(row.info.requestUrl.split("?")[1]));
          }
          if (!(new RegExp(instance.address.frontinfo.host, "gi")).test(row.info.referer)) {
            if (!(new RegExp(unknownKeyword, "i")).test(row.info.referer)) {
              referrerArr.push(row.info.referer);
            }
          }
          num++;
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

        if (referrerArr.some((str) => { return /naver/gi.test(str) })) {
          sourceArr.push("naver");
        } else if (referrerArr.some((str) => { return /google/gi.test(str) })) {
          sourceArr.push("google");
        } else if (referrerArr.some((str) => { return /youtube/gi.test(str) })) {
          sourceArr.push("google");
        } else if (referrerArr.some((str) => { return /instagram/gi.test(str) })) {
          sourceArr.push("instagram");
        } else if (referrerArr.some((str) => { return /facebook/gi.test(str) })) {
          sourceArr.push("facebook");
        } else if (referrerArr.some((str) => { return /meta/gi.test(str) })) {
          sourceArr.push("facebook");
        } else if (referrerArr.some((str) => { return /kakao/gi.test(str) })) {
          sourceArr.push("kakao");
        }
  
        thisSource = [ ...new Set(sourceArr) ];
        thisCampaign = [ ...new Set(campaignArr) ];
        thisMedium = [ ...new Set(mediumArr) ];
        
        thisSource = Array.from(new Set(thisSource.map((str) => {
          let result;
          if (/naver/gi.test(str)) {
            result = "naver";
          } else if (/instagram/gi.test(str)) {
            result = "instagram";
          } else if (/facebook/gi.test(str) || /meta/gi.test(str)) {
            result = "facebook";
          } else if (/kakao/gi.test(str)) {
            result = "kakao";
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
          if (typeof row.info.pageTitle === "string" && row.info.pageTitle.trim() !== "") {
            historyFactor.title = row.info.pageTitle;
          } else {
            historyFactor.title = (/\<title\>([^\<]*)\<\/title\>/gi.exec((await requestSystem("https://" + instance.address.frontinfo.host + row.info.requestUrl)).data))[1];
          }
          historyFactor.event = row.action;
          userObj.history.push(historyFactor);
        }

        finalObj.users.push(userObj);
      }
    }

    return finalObj;

  } catch (e) {
    await emergencyAlarm("GoogleAnalytics.getSessionObjectByCliid error : " + e.message);
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.simpleMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, sleep } = this.mother;
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

    await sleep(1000);

    // users
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);

    await sleep(1000);

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

      console.log(targetReport.data);

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
    return null;
  }
}

GoogleAnalytics.prototype.complexMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, sleep } = this.mother;
  const { BetaAnalyticsDataClient } = require("@google-analytics/data");
  try {
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

    await sleep(500);

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

    await sleep(500);

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

    await sleep(500);

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

    await sleep(500);

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

    await sleep(500);

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

    // end
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
      data: dataObject
    };

    return finalObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.monthlyMetric = async function (thisDate = null) {
  const instance = this;
  try {
    const now = (thisDate === null ? new Date() : thisDate);
    let year, month;
    let pastStartDate, pastEndDate;
    let nowStartDate, nowEndDate;
    let thisMonthMetric, pastMonthMetric;

    if (!(now instanceof Date)) {
      throw new Error("invalid input");
    }

    year = now.getFullYear();
    month = now.getMonth() + 1;

    nowStartDate = new Date(year, month - 1, 1, 0, 0, 0);
    nowEndDate = new Date(year, month - 1, now.getDate(), 0, 0, 0);
    nowEndDate.setDate(nowEndDate.getDate() - 1);

    pastStartDate = new Date(JSON.stringify(nowStartDate).slice(1, -1));
    pastEndDate = new Date(JSON.stringify(nowStartDate).slice(1, -1));
    pastStartDate.setDate(pastStartDate.getDate() - 1);
    pastEndDate.setDate(pastEndDate.getDate() - 1);
    pastStartDate.setDate(1);

    if (nowStartDate.valueOf() >= nowEndDate.valueOf()) {
      nowStartDate = null;
      nowEndDate = null;
    }

    if (nowStartDate !== null) {
      thisMonthMetric = await this.complexMetric(nowStartDate, nowEndDate);
    } else {
      thisMonthMetric = null;
    }
    pastMonthMetric = await this.complexMetric(pastStartDate, pastEndDate);

    return {
      thisMonth: thisMonthMetric,
      pastMonth: pastMonthMetric,
    };
    
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.clientsMetric = async function (clientsArr, selfCoreMongo, selfConsoleMongo, selfMongo, store = false, fast = false) {
  const instance = this;
  const back = this.back;
  const { sleep } = this.mother;
  try {
    let contentsArr;
    let historiesArr;
    let clientResult;
    let clientsObjectArr;
    let cliidArr;

    if (!Array.isArray(clientsArr)) {
      throw new Error("invalid input");
    }
    if (clientsArr.length === 0) {
      throw new Error("no empty arr");
    }
    if (typeof selfCoreMongo !== "object" || selfCoreMongo === null) {
      throw new Error("invalid input 3");
    }
    if (typeof selfConsoleMongo !== "object" || selfConsoleMongo === null) {
      throw new Error("invalid input 4");
    }
    if (typeof selfMongo !== "object" || selfMongo === null) {
      throw new Error("invalid input 5");
    }

    cliidArr = Array.from(new Set(clientsArr.map((c) => { return c.cliid })));
    
    contentsArr = await back.mongoPick("contents", [ {}, { "contents.portfolio.pid": 1, conid: 1, desid: 1 } ], { selfMongo: selfCoreMongo });
    historiesArr = await back.mongoPick("clientHistory", [ { $or: cliidArr.map((cliid) => { return { cliid } }) }, { curation: 1, cliid: 1, manager: 1, important: 1 } ], { selfMongo: selfConsoleMongo });

    clientsObjectArr = [];
    for (let client of clientsArr) {
      clientResult = await this.clientMetric(client, contentsArr, historiesArr, selfMongo, selfCoreMongo, selfConsoleMongo, store);
      while (typeof clientResult !== "object" || clientResult === null) {
        await sleep(2000);
        if (!clientResult) {
          clientResult = await this.clientMetric(client, contentsArr, historiesArr, selfMongo, selfCoreMongo, selfConsoleMongo, store);
        } else {
          clientResult = {};
        }
      }
      clientsObjectArr.push(clientResult);
      await sleep(1000);
    }

    return clientsObjectArr;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.clientMetric = async function (thisClient, contentsArrInput, historyArrInput, selfMongo, selfCoreMongo, selfConsoleMongo, store = false) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const unknownKeyword = this.unknownKeyword;
  const { equalJson, emergencyAlarm, sleep } = this.mother;
  const collection = this.clientAnalyticsCollection;
  const querystring = require("querystring");
  let storeSuccess;
  storeSuccess = false;
  try {
    let sessionResult;
    let clientObject;
    let pidList;
    let desidList;
    let res;
    let constentsArr;
    let whereQuery;
    let thisHistory;
    let historyAdd;
    let rows;
    let cliid;
    let deleteLength;

    if (typeof selfCoreMongo !== "object" || selfCoreMongo === null) {
      throw new Error("invalid input 2");
    }

    if (typeof selfConsoleMongo !== "object" || selfConsoleMongo === null) {
      throw new Error("invalid input 3");
    }

    if (typeof selfMongo !== "object" || selfMongo === null) {
      throw new Error("invalid input 4");
    }

    cliid = thisClient.cliid;

    await sleep(1000);
    sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo, selfCoreMongo);
    if (sessionResult === null) {
      throw new Error("session parsing error : " + cliid);
    }

    if (historyArrInput instanceof Array) {
      thisHistory = historyArrInput.find((obj) => { return obj.cliid === cliid });
    } else {
      [ thisHistory ] = await back.mongoPick("clientHistory", [ { cliid }, { curation: 1, cliid: 1, manager: 1, important: 1 } ], { selfMongo: selfConsoleMongo });
    }

    clientObject = {};

    clientObject.cliid = cliid;
    clientObject.client = thisClient;

    clientObject.sessions = {};
    clientObject.sessions.length = sessionResult.users.length;
    clientObject.sessions.id = [];
    clientObject.sessions.device = [];
    for (let { id, device } of sessionResult.users) {
      clientObject.sessions.id.push(id);
      clientObject.sessions.device.push(device);
    }

    clientObject.source = {};
    clientObject.source.referrer = [];
    clientObject.source.mother = [];
    clientObject.source.medium = [];
    clientObject.source.campaign = [];
    clientObject.source.search = [];

    clientObject.history = {};
    clientObject.history.detail = [];
    for (let obj of sessionResult.users) {
      for (let obj2 of obj.history) {
        obj2.session = obj.id;
        clientObject.history.detail.push(equalJson(JSON.stringify(obj2)));
      }
      for (let str of obj.source.referrer) {
        clientObject.source.referrer.push(str);
      }
      for (let str of obj.source.mother) {
        clientObject.source.mother.push(str);
      }
      for (let str of obj.source.medium) {
        clientObject.source.medium.push(str);
      }
      for (let str of obj.source.campaign) {
        clientObject.source.campaign.push(str);
      }
    }

    clientObject.source.search = Array.from(new Set(clientObject.source.referrer.filter((str) => {
      return /\?/g.test(str);
    }).map((str) => {
      const queryObj = querystring.parse(str.split('?')[1]);
      if (typeof queryObj === "object" && queryObj !== null) {
        return Object.values(queryObj).filter((s) => { return (typeof s === "string") }).filter((str) => { return /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi.test(str) })
      } else {
        return [];
      }
    }).flat(10)));

    historyAdd = [];
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.send.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "send" + obj.page.slice(0, 1).toUpperCase() + obj.page.slice(1),
        session: unknownKeyword,
      }
    }));
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.call.out.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "callOut" + (obj.success ? "Success" : "Fail") + "_" + String(obj.duration),
        session: unknownKeyword,
      }
    }));
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.call.in.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "callIn" + (obj.success ? "Success" : "Fail") + "_" + String(obj.duration),
        session: unknownKeyword,
      }
    }));

    clientObject.history.detail = clientObject.history.detail.concat(historyAdd);
    clientObject.history.detail.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    clientObject.history.length = clientObject.history.detail.length;
    if (clientObject.history.length > 0) {
      clientObject.history.during = clientObject.history.detail[clientObject.history.length - 1].date.valueOf() - clientObject.history.detail[0].date.valueOf();
    } else {
      clientObject.history.during = 0;
    }
    clientObject.source.referrer = [ ...new Set(clientObject.source.referrer) ].filter((str) => {
      return !(new RegExp(address.frontinfo.host, "g")).test(str);
    }).filter((str) => {
      return !(new RegExp(address.backinfo.host, "g")).test(str);
    });
    clientObject.source.mother = [ ...new Set(clientObject.source.mother) ];
    clientObject.source.medium = [ ...new Set(clientObject.source.medium) ];
    clientObject.source.campaign = [ ...new Set(clientObject.source.campaign) ];

    pidList = [];
    desidList = [];
    for (let { path } of clientObject.history.detail) {
      if (/pid\=/gi.test(path)) {
        pidList.push(path);
      }
      if (/desid\=/gi.test(path)) {
        desidList.push(path);
      }
    }

    pidList = [ ...new Set(pidList) ];
    desidList = [ ...new Set(desidList) ];

    clientObject.contents = {};

    clientObject.contents.view = {};
    clientObject.contents.view.portfolio = pidList.filter((str) => { return /portdetail/gi.test(str) }).map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    clientObject.contents.view.review = pidList.filter((str) => { return /revdetail/gi.test(str) }).map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    clientObject.contents.view.designer = desidList.map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    for (let obj of clientObject.contents.view.portfolio) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }
    for (let obj of clientObject.contents.view.review) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }
    for (let obj of clientObject.contents.view.designer) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }

    clientObject.contents.designers = {};
    whereQuery = {};
    whereQuery["$or"] = (pidList.map((str) => { return /pid\=([^\&]+)/gi.exec(str)[1] }).map((pid) => { return { "contents.portfolio.pid": pid } }));
    if (whereQuery["$or"].length > 0) {
      if (contentsArrInput instanceof Array) {
        constentsArr = contentsArrInput.filter((obj) => { return whereQuery["$or"].map((o) => { return o["contents.portfolio.pid"]; }).includes(obj.contents.portfolio.pid); });
      } else {
        constentsArr = await back.mongoPick("contents", [ whereQuery, { "contents.portfolio.pid": 1, conid: 1, desid: 1 } ], { selfMongo: selfCoreMongo });
      }
      clientObject.contents.designers.desid = [ ...new Set(constentsArr.map((c) => { return c.desid }).concat(desidList.map((str) => { return /desid\=([^\&]+)/gi.exec(str)[1] }))) ];
    } else {
      constentsArr = [];
      clientObject.contents.designers.desid = desidList.map((str) => { return /desid\=([^\&]+)/gi.exec(str)[1] });
    }
    clientObject.contents.designers.length = clientObject.contents.designers.desid.length;

    if (store) {
      await sleep(500);
      rows = await back.mongoPick(collection, [ { cliid }, { cliid: 1 } ], { selfMongo });
      if (rows.length !== 0) {
        deleteLength = Number(rows.length);
        for (let i = 0; i < deleteLength; i++) {
          await back.mongoDelete(collection, { cliid }, { selfMongo });
          await sleep(500);
        }
      }
      await sleep(500);
      await back.mongoCreate(collection, clientObject, { selfMongo });
      console.log("mongo store success : " + cliid);
      storeSuccess = true;
    }

    return clientObject;
  } catch (e) {
    await emergencyAlarm("GoogleAnalytics.clientMetric error : " + e.message);
    console.log(e);
    return storeSuccess;
  }
}

GoogleAnalytics.prototype.fixClientMetric = async function (selfLogMongo, monthDelta = 3) {
  const instance = this;
  const mongoDB = require("mongodb");
  const db = "miro81";
  const collection = "clientAnalytics";
  const { sleep, equalJson, emergencyAlarm, errorLog } = this.mother;
  const back = this.back;
  try {
    let rows;
    let cliidArr;
    let tempRows;
    let targetRows;
    let threeMonthAgo;

    if (typeof monthDelta !== "number") {
      monthDelta = 3;
    }

    threeMonthAgo = new Date();
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - monthDelta);

    rows = await back.mongoRead(collection, {
      "client.requests": {
        $elemMatch: {
          "request.timeline": {
            $gte: threeMonthAgo,
          }
        }
      }
    }, { selfMongo: selfLogMongo });

    cliidArr = rows.map((o) => { return o.client.cliid });
    cliidArr = [ ...new Set(cliidArr) ];

    for (let cliid of cliidArr) {
      await sleep(500);
      tempRows = rows.filter((r) => { return r.cliid === cliid });
      if (tempRows.length !== 1) {
        targetRows = equalJson(JSON.stringify(tempRows)).slice(0, -1);
        for (let r of targetRows) {
          await selfLogMongo.db(db).collection(collection).deleteOne({ _id: new mongoDB.ObjectID(r._id) });
          console.log("delete success => ", cliid, r._id);
          await sleep(500);
        }
      }
    }

    return { message: "done" };

  } catch (e) {
    console.log(e);
    return { message: "fail" };
  }
}

GoogleAnalytics.prototype.realtimeMetric = async function (selfCoreMongo, selfMongo, store = true) {
  const instance = this;
  const { equalJson, db } = this.mother;
  const { collection, clientAnalyticsCollection, nullWords, realtimeCollection } = this;
  const delta = 20;
  const back = this.back;
  const address = this.address;
  try {
    let ago;
    let agoHistory;
    let sessions;
    let cliids;
    let targetFindIds;
    let whereQuery;
    let targetClients;
    let sessionTarget;
    let targetHistories;
    let historiesTarget;
    let cliidsTarget;
    let thisClients;

    ago = new Date();
    ago.setMinutes(ago.getMinutes() - delta);

    agoHistory = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
    agoHistory = agoHistory.filter((obj) => {
      const thisDateValue = obj.date.valueOf();
      let histories0, histories1;
      let nonIpList;
      histories0 = address.homeinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      histories1 = address.memberinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      nonIpList = histories0.concat(histories1).map((o) => {
        return o.ip.trim().replace(/[^0-9]/gi, '');
      })
      return !nonIpList.includes(obj.network.ip.trim().replace(/[^0-9]/gi, ''));
    });

    cliids = agoHistory.filter((obj) => { return (typeof obj.data.cliid === "string" && /^c/i.test(obj.data.cliid)) }).map((obj) => {
      return {
        cliid: obj.data.cliid,
        sessionId: obj.id
      }
    });

    sessions = [ ...new Set(agoHistory.map((o) => { return o.id })) ].filter((str) => { return typeof str === "string" });
    sessions = sessions.map((id) => {
      let cliid;
      if (cliids.find((o) => { return o.sessionId === id }) === undefined) {
        cliid = nullWords;
      } else {
        cliid = cliids.find((o) => { return o.sessionId === id }).cliid;
      }
      return { id, cliid };
    })

    targetFindIds = [ ...new Set(sessions.filter((o) => { return o.cliid === nullWords }).map(({ id }) => { return id })) ];

    whereQuery = {};
    whereQuery["sessions.id"] = { $elemMatch: { $regex: "(" + targetFindIds.join("|") + ")" } };

    targetClients = await back.mongoPick(clientAnalyticsCollection, [ whereQuery, { cliid: 1, "sessions.id": 1 } ], { selfMongo });

    for (let obj of sessions) {
      for (let obj2 of targetClients) {
        if (obj2.sessions.id.includes(obj.id)) {
          obj.cliid = obj2.cliid;
        }
      }
    }

    targetHistories = await back.mongoPick(collection, [ { id: { $regex: "(" + sessions.map(({ id }) => { return id }).join("|") + ")" } }, { page: 1, action: 1, data: 1, id: 1, info: 1, date: 1 } ], { selfMongo });
    targetHistories = targetHistories.filter((o) => {
      const thisDateValue = o.date.valueOf();
      let histories0, histories1;
      let nonIpList;
      histories0 = address.homeinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      histories1 = address.memberinfo.history.filter((obj) => {
        return obj.date.from <= thisDateValue && thisDateValue <= obj.date.to
      })
      nonIpList = histories0.concat(histories1).map((o) => {
        return o.ip.trim().replace(/[^0-9]/gi, '');
      })
      return o.action === "pageInit" && !nonIpList.includes(o.info.ip.trim().replace(/[^0-9]/gi, ''))
    });

    cliidsTarget = sessions.map((o) => { return o.cliid }).filter((str) => { return str !== nullWords });
    if (cliidsTarget.length === 0) {
      thisClients = [];
    } else {
      thisClients = (await back.getClientsByQuery({ $or: cliidsTarget.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo })).toNormal();
    }

    for (let obj of sessions) {
      sessionTarget = agoHistory.find((o) => { return obj.id === o.id });
      historiesTarget = targetHistories.filter((o) => { return o.id === obj.id });
      obj.device = sessionTarget.device;
      obj.network = sessionTarget.network;
      
      historiesTarget.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })
      obj.history = {};
      obj.history.detail = historiesTarget;
      obj.history.length = historiesTarget.length;

      if (historiesTarget.length === 0) {
        obj.history.lastPage = "unknown";
        obj.history.summary = [];  
      } else {
        obj.history.lastPage = historiesTarget[historiesTarget.length - 1].info.pageTitle + " (" + historiesTarget[historiesTarget.length - 1].page + ")";
        obj.history.summary = obj.history.detail.map((o) => { return o.info.pageTitle });  
      }

      obj.client = thisClients.find((o) => { return o.cliid === obj.cliid }) === undefined ? null : thisClients.find((o) => { return o.cliid === obj.cliid });
    }

    if (store) {
      await selfMongo.db(db).collection(realtimeCollection).deleteMany({});
      for (let obj of sessions) {
        await back.mongoCreate(realtimeCollection, obj, { selfMongo });
      }
    }
    
    return sessions;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.realtimeMessage = async function (selfMongo) {
  const instance = this;
  const { equalJson, requestSystem, dateToString } = this.mother;
  const { realtimeCollection } = this;
  const bar = "\n==================================================================";
  const back = this.back;
  const address = this.address;
  try {
    const current = await back.mongoRead(realtimeCollection, {}, { selfMongo });
    const clients = current.filter((o) => { return o.client !== null });
    let message;
    let index;

    message = bar;
    message += "\n" + dateToString(new Date(), true) + " 현재";
    message += bar;

    message += "\n\n현재 홈리에종 웹 페이지에는 " + String(current.length) + "명" + "이 있습니다."
    message += "\n";
    message += "이 중 홈리에종의 고객은 " + String(clients.length) + "명" + "이 있네요.";
    if (clients.length > 0) {
      message += "\n";
      message += "현재 온라인 상태에 있는 고객님의 명단은 " + clients.map((o) => { return o.client.name + "(" + o.client.cliid + ")" }).join(", ") + " 입니다.";
    }
    message += "\n";
    message += "\n";
    if (current.length > 0) {
      message += String(current.length) + "명의 유저가 현재 있는 페이지는 다음과 같습니다.";
      message += bar;
      index = 1;
      for (let obj of current) {
        message += "\n";
        if (obj.client !== null) {
          message += String(index) + "번 사용자 (" + obj.client.name + ") : " + obj.history.lastPage + " - " + obj.device.device.type;
        } else {
          message += String(index) + "번 사용자 : " + obj.history.lastPage + " - " + obj.device.device.type;
        }
        index++;
      }
      message += bar;

    }

    return message;

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleAnalytics.prototype.clientMessage = async function (cliid, selfCoreMongo, selfMongo) {
  const instance = this;
  const back = this.back;
  const { requestSystem } = this.mother;
  const { clientAnalyticsCollection } = this;
  try {
    const [ targetClient ] = await back.mongoRead(clientAnalyticsCollection, { cliid }, { selfMongo });
    if (targetClient === undefined || targetClient === null) {
      throw new Error("invalid cliid");
    }
    const bar = "========================================================================";
    const { client, sessions, source: { mother, campaign, search }, history, contents } = targetClient;
    let designers;
    let designerObject;
    let pidList;
    let tempResult;
    let thisContents;
    let thisContentsArr;
    let messageTong;
    let aboutBoo;
    let sourceStr;
    let searchStr;
    let deviceStr;

    designers = await back.mongoPick("designer", [ {}, { desid: 1, designer: 1 } ], { selfMongo: selfCoreMongo });
    designerObject = {};
    for (let { desid, designer } of designers) {
      designerObject[desid] = designer;
    }

    messageTong = [];

    // contents view
    pidList = [];
    for (let { link } of contents.view.portfolio) {
      tempResult = /pid\=([a-z][0-9]+)/gi.exec(link)
      if (tempResult.length > 1) {
        pidList.push({ type: "포트폴리오", pid: tempResult[1].trim() })
      }
    }
    for (let { link } of contents.view.review) {
      tempResult = /pid\=([a-z][0-9]+)/gi.exec(link)
      if (tempResult.length > 1) {
        pidList.push({ type: "인터뷰", pid: tempResult[1].trim() })
      }
    }

    if (pidList.length !== 0) {
      thisContentsArr = await back.mongoPick("contents", [ { $or: pidList.map((obj) => { return obj.pid }).map((str) => { return { "contents.portfolio.pid": str } }) }, { conid: 1, desid: 1, cliid: 1, "contents.portfolio.pid": 1, "contents.portfolio.title.sub": 1 } ], { selfMongo: selfCoreMongo });
    
      for (let obj of pidList) {
        thisContents = thisContentsArr.find((o) => { return o.contents.portfolio.pid === obj.pid });
        obj.designer = designerObject[thisContents.desid];
        obj.desid = thisContents.desid;
        obj.title = thisContents.contents.portfolio.title.sub;
      }
  
      for (let { link } of contents.view.designer) {
        tempResult = /desid\=([a-z][0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/gi.exec(link)
        if (tempResult.length > 1) {
          pidList.push({ type: "상세 페이지", title: "", designer: designerObject[tempResult[1]], desid: tempResult[1] });
        }
      }
      messageTong.push("방문한 컨텐츠 : " + String(pidList.length) + "개");
      pidList.forEach((obj) => {
        messageTong.push(`${obj.designer}(${obj.desid}) 실장님의 ${obj.type}${obj.title !== "" ? " : " + obj.title : ""}`)
      });
    } else {
      messageTong.push("방문한 컨텐츠 : " + String(pidList.length) + "개");
    }

    messageTong.unshift(bar);
    messageTong.push(bar);
    

    // about boo

    if (history.detail.map((o) => { return o.path }).some((str) => { return /service\.php/gi.test(str) })) {
      messageTong.unshift("서비스 유형 페이지 " + "O");
    } else {
      messageTong.unshift("서비스 유형 페이지 " + "X");
    }
    if (history.detail.map((o) => { return o.path }).some((str) => { return /about\.php/gi.test(str) })) {
      messageTong.unshift("서비스 소개 페이지 " + "O");
    } else {
      messageTong.unshift("서비스 소개 페이지 " + "X");
    }
    aboutBoo = history.detail.map((o) => { return o.path }).some((str) => { return /about\.php/gi.test(str) }) || history.detail.map((o) => { return o.path }).some((str) => { return /service\.php/gi.test(str) })
    if (aboutBoo) {
      messageTong.unshift("서비스 소개 페이지 방문함");
    } else {
      messageTong.unshift("서비스 소개 페이지 미방문");
    }
    messageTong.unshift(bar);

    // source parsing

    searchStr = "";
    if (mother.length > 0) {
      sourceStr = "출저 : " + mother.join(", ");
      sourceStr += " / "
      if (campaign.length > 0) {
        sourceStr += "광고 보고 들어옴 : " + campaign.join(", ");
      } else {
        sourceStr += "광고 흔적 없음";
      }
      if (search.length > 0) {
        searchStr = "검색어 : " + search.join(", ");
      }
    } else {
      sourceStr = "출저 알 수 없음";
    }
    if (searchStr !== "") {
      messageTong.unshift(searchStr);
    }
    messageTong.unshift(sourceStr);
    messageTong.unshift(bar);


    // device
    deviceStr = sessions.device[0].kinds === "mobile" ? "모바일" : (sessions.device[0].kinds === "desktop" ? "데스크탑" : "태블릿");
    deviceStr += "(" + sessions.device[0].os + ")";
    deviceStr += " / ";
    deviceStr += sessions.device[0].browser + " 브라우저";

    messageTong.unshift(deviceStr);
    messageTong.unshift("총 행동 " + String(history.length) + "회");
    messageTong.unshift(bar);
    messageTong.unshift(client.name + "(" + client.cliid + ") 웹 보고서");

    return messageTong.join("\n");

  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = GoogleAnalytics;
