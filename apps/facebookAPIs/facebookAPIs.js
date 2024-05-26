const FacebookAPIs = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/facebookAPIs";

  this.facebookUrl = "https://graph.facebook.com";
  this.facebookAppId = "4385911554783319";
  this.facebookAppSecret = "5c9ad0873f5983081b8ad1ba1855806e";
  this.facebookToken = "EAAZBU9pw9OFcBOyCgWIPd6sOIaipeZAAOhRqJsLZC7YRegfh7QLyniTZAtZBlknn4mtcglgPAUXxLiUptPOvqMT36XhXdk6n5dZBEgsXGzRrWNv5lXx7qXNlcZA1PWMYZBKasUZAZCtVVbSNUXZChOsQoJvZBdeFqSS5FFpPZCZCGOgWA4BM3VSibqM7GtnFzZAsOEJGojJ";
  this.facebookPageId = "290144638061244";
  this.instagramId = "17841405547472752";
  this.facebookAdId = "505249990112820";
  this.facebookUserId = "192515798954554";
  this.pixelId = "814052605684956";
  this.appVersion = "v19.0";
}

FacebookAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const campaignCollection = "dailyCampaign";
    let tempRows;
    let res;
    let json;
    let from, to;
    let startDate;
    let num;
    let key;
    let now;

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

      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/act_" + facebookAdId + "/insights", {
        level: "campaign",
        fields: [
          "account_id",
          "campaign_id",
          "campaign_name",
          "reach",
          "impressions",
          "spend",
          "clicks",
          "date_start",
          "date_stop",
        ].join(","),
        time_range: JSON.stringify({
          since: dateToString(from),
          until: dateToString(from),
        }),
        access_token: facebookToken
      }, { method: "get" });

      num = 0;

      for (let obj of res.data.data) {

        key = dateToString(from).replace(/\-/gi, '') + "_" + obj.campaign_id

        json = {
          camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'f' + String.fromCharCode(97 + num) + zeroAddition(from.getDate()) + 's',
          key,
          date: { from, to },
          value: {
            charge: Number(obj.spend),
            performance: {
              reach: Number(obj.reach),
              impressions: Number(obj.impressions),
              clicks: Number(obj.clicks),
            },
          },
          information: {
            mother: "facebook",
            type: "instagram",
            id: {
              account: obj.account_id,
              campaign: obj.campaign_id,
            },
            name: obj.campaign_name,
          }
        };

        tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
        if (tempRows.length !== 0) {
          await back.mongoDelete(campaignCollection, { key }, { selfMongo });
        }
        await back.mongoCreate(campaignCollection, json, { selfMongo });
        console.log(json);
        num++;
      }

    }

    if (logger !== null) {
      logger.cron("facebook daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    emergencyAlarm("FacebookAPIs.dailyCampaign error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

FacebookAPIs.prototype.accountStatusCheck = async function (logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const statusDictionary = {
      "s1": "ACTIVE",
      "s2": "DISABLED",
      "s3": "UNSETTLED",
      "s7": "PENDING_RISK_REVIEW",
      "s8": "PENDING_SETTLEMENT",
      "s9": "IN_GRACE_PERIOD",
      "s100": "PENDING_CLOSURE",
      "s101": "CLOSED",
      "s201": "ANY_ACTIVE",
      "s202": "ANY_CLOSED",
    };
    const disableDictionary = {
      "d0": "NONE",
      "d1": "ADS_INTEGRITY_POLICY",
      "d2": "ADS_IP_REVIEW",
      "d3": "RISK_PAYMENT",
      "d4": "GRAY_ACCOUNT_SHUT_DOWN",
      "d5": "ADS_AFC_REVIEW",
      "d6": "BUSINESS_INTEGRITY_RAR",
      "d7": "PERMANENT_CLOSE",
      "d8": "UNUSED_RESELLER_ACCOUNT",
      "d9": "UNUSED_ACCOUNT",
      "d10": "UMBRELLA_AD_ACCOUNT",
      "d11": "BUSINESS_MANAGER_INTEGRITY_POLICY",
      "d12": "MISREPRESENTED_AD_ACCOUNT",
      "d13": "AOAB_DESHARE_LEGAL_ENTITY",
      "d14": "CTX_THREAD_REVIEW",
      "d15": "COMPROMISED_AD_ACCOUNT",
    };
    let res;
    let account_status;
    let disable_reason;
    let statusErrorMessage;
    let disableErrorMessage;
    let boo;

    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/act_" + facebookAdId, {
      fields: [
        "account_id",
        "account_status",
        "amount_spent",
        "disable_reason",
      ].join(","),
      access_token: facebookToken
    }, { method: "get" });

    ({ account_status, disable_reason } = res.data);

    boo = true;

    if (Number(account_status) !== 1) {
      statusErrorMessage = statusDictionary["s" + String(account_status)] === undefined ? "UNKNOWN" : statusDictionary["s" + String(account_status)];
      statusErrorMessage = "facebook account status error (" + statusErrorMessage + ")";
      statusErrorMessage = "FacebookAPIs.accountStatusCheck error : " + statusErrorMessage + " / " + dateToString(new Date());
      if (logger !== null) {
        logger.error(statusErrorMessage).catch((err) => { console.log(err); });
      } else {
        emergencyAlarm(statusErrorMessage).catch((err) => { console.log(err); });
      }
      boo = false;
    }

    if (Number(disable_reason) !== 0) {
      disableErrorMessage = disableDictionary["d" + String(disable_reason)] === undefined ? "UNKNOWN" : disableDictionary["d" + String(disable_reason)];
      disableErrorMessage = "facebook account disable reason (" + disableErrorMessage + ")";
      disableErrorMessage = "FacebookAPIs.accountStatusCheck error : " + disableErrorMessage + " / " + dateToString(new Date());
      if (logger !== null) {
        logger.error(disableErrorMessage).catch((err) => { console.log(err); });
      } else {
        emergencyAlarm(disableErrorMessage).catch((err) => { console.log(err); });
      }
      boo = false;
    }

    if (logger !== null) {
      logger.cron("facebook account status check done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return boo;

  } catch (e) {
    emergencyAlarm("FacebookAPIs.accountStatusCheck error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
    return false;
  }
}

FacebookAPIs.prototype.getActiveInstantFormId = async function (logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy } = this.mother;
  try {
    const delta = 30 * 1000;
    let res;
    let pageAccessToken;
    let formArr;

    await sleep(3000);

    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + facebookUserId + "/accounts", {
      access_token: facebookToken
    }, { method: "get" });
    pageAccessToken = res.data.data.find((o) => { return o.id === facebookPageId }).access_token;
    
    await sleep(delta);

    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + facebookPageId + "/leadgen_forms", {
      access_token: pageAccessToken
    }, { method: "get" });

    formArr = objectDeepCopy(res.data.data);
    formArr = formArr.filter((o) => { return o.name.replace(/[^0-9]/gi, '').trim().length > 5 });
    formArr.sort((a, b) => {
      const aStandard = a.name.replace(/[^0-9\.\- ]/gi, '').trim();
      const bStandard = b.name.replace(/[^0-9\.\- ]/gi, '').trim();
      const aStandardDate = stringToDate(aStandard.split(/[\.\- ]/gi).map((s) => { return s.replace(/[^0-9]/gi, '').trim() }).filter((s) => { return s !== "" }).join("-"));
      const bStandardDate = stringToDate(bStandard.split(/[\.\- ]/gi).map((s) => { return s.replace(/[^0-9]/gi, '').trim() }).filter((s) => { return s !== "" }).join("-"));
      return bStandardDate.valueOf() - aStandardDate.valueOf();
    });

    if (formArr.length > 0) {
      return { pageAccessToken, formId: formArr[0].id };
    } else {
      return null;
    }

  } catch (e) {
    console.log(e);
    return null;
  }
}

FacebookAPIs.prototype.syncMetaInstantForm = async function (selfMongo, dateDelta = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, fileSystem, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy, binaryRequest, messageSend } = this.mother;
  try {
    const collection = "metaInstantForm";
    const delta = 40 * 1000;
    const instantIdResult = await instance.getActiveInstantFormId(logger);
    if (instantIdResult === null) {
      return false;
    }
    const { pageAccessToken, formId } = instantIdResult;
    const url = "https://graph.facebook.com/" + appVersion + "/" + formId + "/leads";
    let res;
    let tong;
    let tempObj;
    let thisDate;
    let afterToken;
    let fields;
    let now, ago;
    let standardStamp;
    let filtering;
    let rawArr;
    let seridRaw;
    let purchaseRaw;
    let budgetRaw;
    let nameRaw;
    let phoneRaw;
    let addressRaw;
    let pyeongRaw;
    let expectedRaw;
    let thisId, json;
    let rows;
    let emailRaw, contractRaw;
    let thisInjection;
    let timeRaw;

    await sleep(delta);

    now = new Date();
    ago = new Date(JSON.stringify(now).slice(1, -1));
    ago.setDate(ago.getDate() - dateDelta);

    standardStamp = Math.floor(ago.valueOf() / 1000);
    
    filtering = JSON.stringify([
      {
        field: "time_created",
        operator: "GREATER_THAN_OR_EQUAL",
        value: standardStamp
      }
    ]);
    fields = [
      "created_time",
      "id",
      "ad_id",
      "form_id",
      "field_data"
    ].join(",");

    res = await requestSystem(url, { access_token: pageAccessToken, fields, filtering }, { method: "get" });
    if (res.data.paging === undefined || res.data.data.length === 0) {
      afterToken = null;
    } else {
      if (typeof res.data.paging === "object" && res.data.paging !== null) {
        afterToken = res.data.paging.cursors?.after;
      } else {
        afterToken = null;
      }
    }

    tong = [];
    for (let obj of res.data.data) {

      thisDate = new Date(obj.created_time);
      thisDate = dateToString(thisDate, true);
      thisDate = stringToDate(thisDate);
      rawArr = objectDeepCopy(obj.field_data);

      seridRaw = null;
      purchaseRaw = null;
      budgetRaw = null;
      nameRaw = null;
      phoneRaw = null;
      addressRaw = null;
      pyeongRaw = null;
      expectedRaw = null;
      emailRaw = null;
      contractRaw = null;
      timeRaw = null;

      tempObj = {
        id: obj.id,
        ad: obj.ad_id,
        date: new Date(JSON.stringify(thisDate).slice(1, -1)),
        injection: 0,
        raw: rawArr,
        data: {},
      };

      try {
        seridRaw = rawArr.find((o) => { return /serid/gi.test(o.name) })?.values?.join("");
        if (seridRaw === null || seridRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.serid = seridRaw;
      } catch {
        tempObj.data.serid = null;  
      }

      try {
        purchaseRaw = rawArr.find((o) => { return /purchase/gi.test(o.name) })?.values?.join("");
        if (purchaseRaw === null || purchaseRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.purchase = purchaseRaw;
      } catch {
        tempObj.data.purchase = null;
      }

      try {
        budgetRaw = rawArr.find((o) => { return /budget/gi.test(o.name) })?.values?.join("");
        if (budgetRaw === null || budgetRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.budget = budgetRaw;
      } catch {
        tempObj.data.budget = null;
      }

      try {
        nameRaw = rawArr.find((o) => { return /name/gi.test(o.name) })?.values?.join("");
        if (nameRaw === null || nameRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.name = nameRaw;
      } catch {
        tempObj.data.name = null;
      }

      try {
        phoneRaw = rawArr.find((o) => { return /phone/gi.test(o.name) })?.values?.join("");
        if (phoneRaw === null || phoneRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.phone = phoneRaw;
      } catch {
        tempObj.data.phone = null;
      }

      try {
        addressRaw = rawArr.find((o) => { return /address/gi.test(o.name) })?.values?.join("");
        if (addressRaw === null || addressRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.address = addressRaw;
      } catch {
        tempObj.data.address = null;
      }

      try {
        pyeongRaw = rawArr.find((o) => { return /pyeong/gi.test(o.name) })?.values?.join("");
        if (pyeongRaw === null || pyeongRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.pyeong = pyeongRaw;
      } catch {
        tempObj.data.pyeong = null;
      }

      try {
        expectedRaw = rawArr.find((o) => { return /expected/gi.test(o.name) })?.values?.join("");
        if (expectedRaw === null || expectedRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.expected = expectedRaw;
      } catch {
        tempObj.data.expected = null;
      }

      try {
        emailRaw = rawArr.find((o) => { return /email/gi.test(o.name) })?.values?.join("");
        if (emailRaw === null || emailRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.email = emailRaw;
      } catch {
        tempObj.data.email = "";
      }

      try {
        contractRaw = rawArr.find((o) => { return /contract/gi.test(o.name) })?.values?.join("");
        if (contractRaw === null || contractRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.contract = contractRaw;
      } catch {
        tempObj.data.contract = "자가";
      }

      try {
        timeRaw = rawArr.find((o) => { return /time/gi.test(o.name) })?.values?.join("");
        if (timeRaw === null || timeRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.time = [ "9:30 - 11:00", "11:00 - 12:30", "13:30 - 16:30", "16:30 - 18:30", ][Number(timeRaw)];
      } catch {
        tempObj.data.time = "";
      }

      tong.push(tempObj);
    }
    
    while (Boolean(afterToken)) {
      await sleep(delta);
      res = await requestSystem(url, { access_token: pageAccessToken, fields, filtering, after: afterToken }, { method: "get" });
      if (res.data.paging === undefined || res.data.data.length === 0) {
        afterToken = null;
      } else {
        if (typeof res.data.paging === "object" && res.data.paging !== null) {
          afterToken = res.data.paging.cursors?.after;
        } else {
          afterToken = null;
        }
      }
      for (let obj of res.data.data) {
        thisDate = new Date(obj.created_time);
        thisDate = dateToString(thisDate, true);
        thisDate = stringToDate(thisDate);
        tempObj = {
          id: obj.id,
          date: new Date(JSON.stringify(thisDate).slice(1, -1)),
          raw: objectDeepCopy(obj.field_data),
        }
        tong.push(tempObj);
      }
    }

    for (let row of tong) {
      json = objectDeepCopy(row);
      thisId = row.id;      
      rows = await back.mongoRead(collection, { id: thisId }, { selfMongo });
      if (rows.length === 0) {
        messageSend({ text: "새로운 인스턴트 문의가 왔습니다! 성함은 " + json.data.name + "입니다!", channel: "#401_consulting" }).catch((err) => { console.log(err); });
      } else {
        json.injection = rows[0].injection;
      }
      for (let pastRow of rows) {
        await back.mongoDelete(collection, { id: pastRow.id }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });
    }

    return true;

  } catch (e) {
    emergencyAlarm("FacebookAPIs.syncMetaInstantForm error : " + e.message).catch((err) => { console.log(err); });
    emergencyAlarm("FacebookAPIs.syncMetaInstantForm error : " + JSON.stringify(e?.response?.data?.error)).catch((err) => { console.log(err); });
    console.log(e);
    console.log("FacebookAPIs.syncMetaInstantForm error : " + JSON.stringify(e?.response?.data?.error));
    return false;
  }
}

FacebookAPIs.prototype.metaInstantToClient = async function (selfMongo, selfCoreMongo, logger = null) {
  const instance = this;
  const back = this.back;
  const AddressParser = require(process.cwd() + "/apps/addressParser/addressParser.js");
  const app = new AddressParser();
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, fileSystem, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy, binaryRequest, messageSend, autoComma, autoHypenPhone, homeliaisonAnalytics } = this.mother;
  try {
    const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ];
    const purchaseArr = [ "재배치", "일부 구매", "전체 구매" ];
    const staticImageSet = [
      "t6p18.jpg",
      "t11p58.jpg",
      "t4p123.jpg",
      "t9p306.jpg",
      "t1p29.jpg",
      "t18p350.jpg"
    ];
    const collection = "metaInstantForm";
    let rows;
    let target;
    let serid;
    let purchase;
    let budget;
    let name;
    let phone;
    let address;
    let pyeong;
    let expected;
    let searchResult;
    let expectedYear, expectedMonth, expectedDate;
    let now, thisDate;
    let tempDate;
    let year, month, date;
    let email;
    let contract;
    let etc;
    let living;
    let map;
    let response;
    let thisId;
    let clientResponse;
    let cliid;
    let whereQuery, updateQuery, coreQuery;
    let defaultQueryObject;
    let requestNumber;
    let livingNow;
    let time;

    now = new Date();
    rows = await back.mongoRead(collection, { injection: 0 }, { selfMongo });

    for (let i = 0; i < rows.length; i++) {

      await sleep(1000);

      target = rows[i];
      thisId = target.id;
      requestNumber = 0;
  
      try {
  
        serid = target.data.serid;
        if (/[0-9]/gi.test(target.data.purchase)) {
          purchase = Number(target.data.purchase.replace(/[^0-9]/gi, ''));
        } else {
          purchase = (/기존[_ ]?가구/gi.test(target.data.purchase) ? 0 : (/일부/gi.test(target.data.purchase) ? 1 : 2));
        }
        budget = target.data.budget;
        name = target.data.name.trim();
        email = target.data.email.trim();
        contract = target.data.contract;
        etc = "from meta instant ads";
        living = "false";
    
        if (/^0/gi.test(target.data.phone)) {
          phone = autoHypenPhone(target.data.phone.trim().replace(/[^0-9\-]/gi, ''));
        } else {
          phone = autoHypenPhone(String('0' + target.data.phone).trim().replace(/[^0-9\-]/gi, ''));
        }
    
        address = target.data.address.trim().replace(/[\n\t]/gi, '').replace(/[\n\t]/gi, '');
        searchResult = await app.getAddress(address);
        if (searchResult !== null) {
          if (typeof searchResult === "object" && searchResult.address !== undefined && searchResult.address !== null && typeof searchResult.address === "object") {
            if (typeof searchResult.address.road === "string") {
              if (searchResult.address.road.trim() !== "") {
                address = searchResult.address.road;
              }
            }
          }
        }
    
        pyeong = target.data.pyeong.replace(/[^0-9\.]/gi, '');
        if (pyeong === '' || Number.isNaN(Number(pyeong))) {
          pyeong = 34;
        } else {
          pyeong = Number(pyeong);
        }
    
        livingNow = false;
        try {
          if (/거주/gi.test(target.data.expected)) {
            livingNow = true;
            expected = new Date();
          } else {
            try {
              livingNow = false;
              expected = stringToDate(target.data.expected.trim());
            } catch (e) {
              livingNow = true;
              expected = new Date();
            }
          }
        } catch {
          expected = target.data.expected;
          expectedYear = /([0-9]+[ ]*[년연])/gi.exec(expected)
          expectedMonth = /([0-9]+[ ]*[월윌])/gi.exec(expected)
          expectedDate = /([0-9]+[ ]*[일])/gi.exec(expected)
      
          if (expectedYear === null && expectedMonth === null && expectedDate === null) {
            if (/거주/gi.test(target.data.expected)) {
              livingNow = true;
              expected = new Date();
            } else {
              try {
                livingNow = false;
                expected = stringToDate(target.data.expected.trim());
              } catch (e) {
                livingNow = true;
                expected = new Date();
              }
            }
          } else {

            livingNow = false;

            if (expectedYear !== null) {
              if (expectedYear[0] !== undefined) {
                expectedYear = Number(expectedYear[0].replace(/[^0-9]/gi, ''));
                if (expectedYear < 1000) {
                  expectedYear = 2000 + expectedYear;
                }
              } else {
                expectedYear = null;
              }
            } else {
              expectedYear = null;
            }
        
            if (expectedMonth !== null) {
              if (expectedMonth[0] !== undefined) {
                expectedMonth = Number(expectedMonth[0].replace(/[^0-9]/gi, ''));
              } else {
                expectedMonth = null;
              }
            } else {
              expectedMonth = null;
            }
        
            if (expectedDate !== null) {
              if (expectedDate[0] !== undefined) {
                expectedDate = Number(expectedDate[0].replace(/[^0-9]/gi, ''));
              } else {
                expectedDate = null;
              }
            } else {
              expectedDate = null;
            }
            
            tempDate = new Date(JSON.stringify(now).slice(1, -1));
            if (expectedYear === null) {
              year = tempDate.getFullYear();
            } else {
              year = expectedYear;
            }
            if (expectedMonth === null) {
              month = tempDate.getMonth() + 1;
            } else {
              month = expectedMonth;
            }
            if (expectedDate === null) {
              date = 1;
            } else {
              date = expectedDate;
            }
        
            thisDate = stringToDate(`${String(year)}-${zeroAddition(month)}-${zeroAddition(date)}`)
            expected = new Date(JSON.stringify(thisDate).slice(1, -1));
          }
        }
    
        if (email === undefined || email === null || email === '') {
          email = "";
        }
    
        if (contract === undefined || contract === null || contract === '') {
          contract = "자가";
        }
    
        map = [
          {
            property: "name",
            value: String(name),
          },
          {
            property: "phone",
            value: String(phone),
          },
          {
            property: "address0",
            value: String(address),
          },
          {
            property: "address1",
            value: "",
          },
          {
            property: "email",
            value: String(email),
          },
          {
            property: "pyeong",
            value: String(pyeong),
          },
          {
            property: "movein",
            value: dateToString(expected),
          },
          {
            property: "living",
            value: livingNow ? "거주중" : "이사",
          },
          {
            property: "etc",
            value: String(etc),
          },
          {
            property: "contract",
            value: String(contract),
          },
        ];
        
        if (/0[0-9][0-9]?\-[0-9][0-9][0-9][0-9]?\-[0-9][0-9][0-9][0-9]/gi.test(phone)) {
          if (name.length < 9 && name.length > 1) {
            if (/없음/gi.test(name) || /딱히/gi.test(name) || /비공개/gi.test(name) || /않/gi.test(name) || /개인샵/gi.test(name) || /개인샾/gi.test(name) || /필라테스/gi.test(name) || /필름도배/gi.test(name)) {
              await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
            } else {
              response = await back.getClientsByQuery({ phone }, { selfMongo: selfCoreMongo })
              if (response.length === 0) {
      
                clientResponse = await requestSystem("https://" + instance.address.backinfo.host + ":3000/clientSubmit", {
                  map
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
                if (clientResponse.data.cliid === undefined) {
                  throw new Error("");
                }
                cliid = clientResponse.data.cliid;
      
                await homeliaisonAnalytics({
                  action: "login",
                  data: {
                    cliid,
                    date: dateToString(new Date(), true),
                  },
                });
                await sleep(5000);
    
                // style check
      
                defaultQueryObject = {
                  newMode: true,
                  method: "client",
                  id: cliid
                };
                whereQuery = { cliid };
      
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.service.serid"] = [ serid ];
                updateQuery["curation.check.serid"] = serid;
                coreQuery["requests." + String(requestNumber) + ".analytics.response.service.serid"] = serid;
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
      
                await sleep(100);
    
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.purchase"] = Number.isNaN(Number(purchase)) ? 0 : Number(purchase);
                coreQuery["requests." + String(requestNumber) + ".request.furniture"] = purchaseArr[Number.isNaN(Number(purchase)) ? 0 : Number(purchase)];
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
      
                await sleep(100);
    
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.time"] = [];
                updateQuery["budget"] = "상담 가능 시간 : \n" + [].join(", ");
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
      
                await sleep(100);
    
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.budget"] = budgetArr.findIndex((s) => { return s === budget });
                coreQuery["requests." + String(requestNumber) + ".request.budget"] = budget;
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
      
                await sleep(100);
    
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.image"] = objectDeepCopy(staticImageSet);
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
    
                await sleep(100);
    
                updateQuery = {};
                coreQuery = {};
                updateQuery["budget"] = "상담 가능 시간 : \n" + (typeof target.data.time === "string" ? target.data.time : "");
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
      
                await sleep(3 * 1000);
      
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/styleCuration_updateCalculation", { cliid: cliid, historyQuery: {}, coreQuery: {}, mode: "calculation", fromConsole: 0 }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
                await sleep(1000);
      
                await requestSystem("https://" + instance.address.backinfo.host + ":3000/ghostClient_updateAnalytics", {
                  page: "styleCuration",
                  mode: "submit",
                  cliid: cliid,
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });
                await sleep(1000);
      
                await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
    
              } else {
                await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
              }
            }
          } else {
            await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
          }
        } else {
          await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
        }
      } catch (e) {
        console.log(e);
        if (logger !== null) {
          logger.error("intant error : " + thisId + " / " + e.message).catch((err) => { console.log(err) });
        }
        emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + e.message).catch((err) => { console.log(err); });
        await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
      }
    }

  } catch (e) {
    emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + e.message).catch((err) => { console.log(err); });
    emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + JSON.stringify(e?.response?.data?.error)).catch((err) => { console.log(err); });
    console.log(e);
    console.log("FacebookAPIs.metaInstantToClient error : " + JSON.stringify(e?.response?.data?.error));
  }
}

FacebookAPIs.prototype.metaComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const collection = "metaComplex";
    const idKeyword = 'f';
    const metaKeyword = 'f';
    const metaKeyKeyword = "meta";
    const delta = 40 * 1000;
    let tempRows;
    let res;
    let json;
    let from, to;
    let startDate;
    let num;
    let key;
    let now;
    let campaignId;
    let adsetId;
    let targetObj;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    await sleep(30 * 1000);

    for (let i = 0; i < dayNumber; i++) {

      await sleep(60 * 1000);
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      key = dateToString(from).replace(/\-/gi, '') + "_" + metaKeyKeyword;
      json = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + metaKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0,
            performance: {
              reach: 0,
              impressions: 0,
              clicks: 0,
            },
            length: {
              campaign: 0,
              adset: 0,
              ad: 0,
            }
          },
          campaign: [],
        },
        instagram: {
          profile: {
            views: 0,
            followers: 0,
          },
          performance: {
            impressions: 0,
            clicks: 0,
            likes: 0,
            comments: 0,
            saves: 0,
            shares: 0,
          }
        }
      };

      // campaign
      await sleep(delta);
      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/act_" + facebookAdId + "/insights", {
        level: "campaign",
        fields: [
          "account_id",
          "campaign_id",
          "campaign_name",
          "reach",
          "impressions",
          "spend",
          "clicks",
          "date_start",
          "date_stop",
        ].join(","),
        time_range: JSON.stringify({
          since: dateToString(from),
          until: dateToString(from),
        }),
        access_token: facebookToken
      }, { method: "get" });
      for (let obj of res.data.data) {

        json.advertisement.campaign.unshift({
          value: {
            charge: Number(obj.spend),
            performance: {
              reach: Number(obj.reach),
              impressions: Number(obj.impressions),
              clicks: Number(obj.clicks),
            },
          },
          information: {
            id: obj.campaign_id,
            account: obj.account_id,
            name: obj.campaign_name,
          },
          children: [],
        });

        await sleep(delta);
        campaignId = obj.campaign_id;
        res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + campaignId + "/insights", {
          level: "adset",
          fields: [
            "adset_id",
            "adset_name",
            "reach",
            "impressions",
            "spend",
            "clicks",
            "date_start",
            "date_stop",
          ].join(","),
          time_range: JSON.stringify({
            since: dateToString(from),
            until: dateToString(from),
          }),
          access_token: facebookToken
        }, { method: "get" });

        for (let obj2 of res.data.data) {

          json.advertisement.campaign[0].children.unshift({
            value: {
              charge: Number(obj2.spend),
              performance: {
                reach: Number(obj2.reach),
                impressions: Number(obj2.impressions),
                clicks: Number(obj2.clicks),
              },
            },
            information: {
              id: obj2.adset_id,
              campaign: obj.campaign_id,
              name: obj2.adset_name,
            },
            children: [],
          })

          await sleep(delta);
          adsetId = obj2.adset_id;
          res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + adsetId + "/insights", {
            level: "ad",
            fields: [
              "adset_id",
              "adset_name",
              "ad_id",
              "ad_name",
              "reach",
              "impressions",
              "spend",
              "clicks",
              "date_start",
              "date_stop",
            ].join(","),
            time_range: JSON.stringify({
              since: dateToString(from),
              until: dateToString(from),
            }),
            access_token: facebookToken
          }, { method: "get" });

          for (let obj3 of res.data.data) {

            json.advertisement.campaign[0].children[0].children.unshift({
              value: {
                charge: Number(obj3.spend),
                performance: {
                  reach: Number(obj3.reach),
                  impressions: Number(obj3.impressions),
                  clicks: Number(obj3.clicks),
                },
              },
              information: {
                id: obj3.ad_id,
                adset: obj3.adset_id,
                name: obj3.ad_name,
              },
            })

          }
        }
      }
      if (json.advertisement.campaign.length > 0) {
        json.advertisement.value.charge = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
        json.advertisement.value.performance.reach = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.reach }, 0);
        json.advertisement.value.performance.impressions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
        json.advertisement.value.performance.clicks = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
        json.advertisement.value.length.campaign = json.advertisement.campaign.length;
        json.advertisement.value.length.adset = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.children.length }, 0);
        json.advertisement.value.length.ad = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.children.reduce((a, c) => { return a + c.children.length }, 0) }, 0);
      }

      // instagram
      await sleep(delta);
      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
        metric: "impressions,profile_views,follower_count,website_clicks",
        period: "day",
        since: dateToString(from),
        access_token: facebookToken
      }, { method: "get" });
      [ impressions, profile, follower, website ] = res.data.data;
      try {
        json.instagram.performance.impressions = impressions.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.performance.impressions = 0;
      }
      try {
        json.instagram.profile.views = profile.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.profile.views = 0;
      }
      try {
        json.instagram.profile.followers = follower.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.profile.followers = 0;
      }
      try {
        json.instagram.performance.clicks = website.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.performance.clicks = 0;
      }  
      await sleep(delta);
      try {
        res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
          metric: "likes,comments,saves,shares",
          metric_type: "total_value",
          period: "day",
          since: dateToString(from),
          until: dateToString(to),
          access_token: facebookToken
        }, { method: "get" });
        json.instagram.performance.likes = res.data.data.find((o) => { return o.name === "likes" }).total_value.value;
        json.instagram.performance.comments = res.data.data.find((o) => { return o.name === "comments" }).total_value.value;
        json.instagram.performance.saves = res.data.data.find((o) => { return o.name === "saves" }).total_value.value;
        json.instagram.performance.shares = res.data.data.find((o) => { return o.name === "shares" }).total_value.value;
      } catch (e) {
        json.instagram.performance.likes = 0;
        json.instagram.performance.comments = 0;
        json.instagram.performance.saves = 0;
        json.instagram.performance.shares = 0;
      }

      // store
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });
      console.log(json);

    }

    if (logger !== null) {
      logger.cron("meta complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return true;

  } catch (e) {
    emergencyAlarm("FacebookAPIs.metaComplex error : " + e.message).catch((err) => { console.log(err); });
    emergencyAlarm("FacebookAPIs.metaComplex error : " + JSON.stringify(e?.response?.data?.error)).catch((err) => { console.log(err); });
    console.log(e);
    return false;
  }
}

FacebookAPIs.prototype.dailyInstagram = async function (selfMongo, dayNumber = 7, logger = null) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, zeroAddition } = this.mother;
  try {
    const channelCollection = "dailyChannel";
    let res;
    let startDate;
    let impressions, profile, follower, website;
    let json;
    let from, to;
    let key;
    let tempRows;
    let now;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < (dayNumber - 1); i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
      metric: "impressions,profile_views,follower_count,website_clicks",
      period: "day",
      since: dateToString(startDate),
      access_token: facebookToken
    }, { method: "get" });

    [ impressions, profile, follower, website ] = res.data.data;

    for (let i = 0; i < impressions.values.length; i++) {

      from = stringToDate(impressions.values[i].end_time.slice(0, 10));
      to = stringToDate(impressions.values[i].end_time.slice(0, 10));
      to.setDate(to.getDate() + 1);

      key = dateToString(from).replace(/\-/gi, '') + "_" + "instagram";

      json = {
        chaid: 'h' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'f' + 'i' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        value: {
          profile: {
            views: profile.values[i].value,
            followers: follower.values[i].value,
          },
          performance: {
            impressions: impressions.values[i].value,
            clicks: website.values[i].value,
          }
        },
        information: {
          mother: "facebook",
          type: "instagram",
        }
      };

      tempRows = await back.mongoRead(channelCollection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(channelCollection, { key }, { selfMongo });
      }
      await back.mongoCreate(channelCollection, json, { selfMongo });
      console.log(json);
    }

    if (logger !== null) {
      logger.cron("facebook daily instagram done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    await errorLog("FacebookAPIs.dailyInstagram error : " + e.message);
    console.log(e);
  }
}

FacebookAPIs.prototype.conversionEvent = async function (obj) {
  const instance = this;
  const { requestSystem, emergencyAlarm } = this.mother;
  const { facebookToken, pixelId, appVersion } = this;
  try {
    const url = `https://graph.facebook.com/${appVersion}/${pixelId}/events?access_token=${facebookToken}`;
    let res, data;
    let injectionObject;

    injectionObject = {
      event_name: obj.name,
      event_time: Math.floor((new Date()).valueOf() / 1000),
      event_source_url: "https://" + instance.address.frontinfo.host,
      action_source: "website",
      user_data: {
        client_ip_address: obj.data.ip,
        client_user_agent: obj.data.userAgent,
      },
      custom_data: { ...obj.custom },
    };

    data = [ injectionObject ];

    res = await requestSystem(url, { data }, {
      headers: { "Content-Type": "application/json" }
    });

    return { message: "success" };

  } catch (e) {
    await emergencyAlarm("FacebookAPIs.conversionEvent error : " + e.message);
    console.log(e);
    return null;
  }
}

FacebookAPIs.prototype.getAccessToken = async function () {
  const instance = this;
  const { requestSystem } = this.mother;
  const { facebookAppId, facebookAppSecret, facebookPageId, instagramId, facebookAdId } = this;
  try {
    const url = "https://graph.facebook.com/oauth/access_token";
    let res, token;

    token = "EAAZBU9pw9OFcBO2EOvaiJsfdAUZCKtLpPZCZBr3GbcPKd6LZARQEewo8ZCZBWAbNHHUnSbmZBDomD0w5DVIHuZAlLHbZBtP4waZCqUYFJuyKa3q4TYr6iVZCx8zfYDkhIFkwqZCezWiY0fbUnMkkTh6UMan8dXbDV2oAsdkQp4SOcsSukUN7SjkhT5rqb0ZBoEyO3xM1P3dz1ViKVKK293gXDKVDOEXH933YIZD";
    
    res = await requestSystem(url, {
      grant_type: "fb_exchange_token",
      client_id: facebookAppId,
      client_secret: facebookAppSecret,
      fb_exchange_token: token,
    }, { method: "get" });

    console.log(res.data);

  } catch (e) {
    console.log(e);
  }
}

module.exports = FacebookAPIs;
