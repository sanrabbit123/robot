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
  this.facebookToken = "EAAZBU9pw9OFcBOwI2ZBqFZCgqfmKzTKA6gyl3tG1ULZCovwMiXH733albvChZBZAMq9aZBeJLYbk6nHschSRjvMvS8CgFaK4uUY9z0I5Rhp60G8j0ZC58sY5V7UhpoIkVo88W9OqgJZBuZCh01eTNd3AfMpmvpI0V2lkRqrnhFtSnlycr72kIABjwrhZAE9Wuq85qaGppxg5NR8LLkdfFz5";
  this.facebookPageId = "290144638061244";
  this.instagramId = "17841405547472752";
  this.facebookAdId = "505249990112820";
  this.pixelId = "814052605684956";
  this.appVersion = "v18.0";
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
      await sleep(1000);
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

        await sleep(5000);
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

          await sleep(5000);
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
      await sleep(5000);
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
      await sleep(1000);
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

    token = "EAAZBU9pw9OFcBO0AY4JAYWACnCOwBZBIi6EHpzsVnF4JbFM6WFDrgvGwOuiPIZCpIJvlJggZCa82w7IB7auQD2xZAlBp8MZABlifsnlSwYS2oRIvs1irS74whENCNvvOLfvJdkCSlpXbrLP6L0TRnc93Ch9OKZCHTFDFNfO0uDDd33BCZAVtsc9pM9pW2uZAifyehehQUsAKuMowDDBAZBpE9VGfmixzDj5ZATkFgpLxG5i37keQSzA27wZD";

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
