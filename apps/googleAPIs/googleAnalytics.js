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
    let num;

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

GoogleAnalytics.prototype.complexMetric = async function (startDate, endDate) {
  const instance = this;
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition } = this.mother;
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

GoogleAnalytics.prototype.clientMetric = async function (cliid, selfMongo) {
  const instance = this;
  const address = this.address;
  const { fileSystem, equalJson, requestSystem } = this.mother;
  try {
    let sessionResult;
    let clientObject;
    let pidList;
    let desidList;
    let res;

    if (typeof cliid !== "string" || typeof selfMongo !== "object" || selfMongo === null) {
      throw new Error("invalid input");
    }

    sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo);
    if (sessionResult === null) {
      throw new Error("session parsing error");
    }

    clientObject = {};

    clientObject.cliid = cliid;

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

    clientObject.history = {};
    clientObject.history.detail = [];
    for (let obj of sessionResult.users) {
      for (let obj2 of obj.history) {
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
    clientObject.history.detail.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    clientObject.history.length = clientObject.history.detail.length;
    clientObject.history.during = clientObject.history.detail[clientObject.history.detail.length - 1].date.valueOf() - clientObject.history.detail[0].date.valueOf();

    clientObject.source.referrer = [ ...new Set(clientObject.source.referrer) ];
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
    clientObject.contents.designers = [];


    await fileSystem(`writeJson`, [ `${process.cwd()}/temp/target.json`, clientObject ]);
    console.log(clientObject.contents.view);

    return clientObject;

  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = GoogleAnalytics;
