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
  this.facebookToken = "EAAZBU9pw9OFcBO8B96qa8pdw3EglZC0gHeZBZCRmQp1wCzEZBEPVN2K5ELKC8I2ty4M6nWzapTHOlbsb1u8l1kj7DnpDAOvJSSwy1pvZCDEXrIJBYwsHuHzlAbzrCz0z29RrZABkpLbnSkBrb9s12xWL9BigW7jzyutrnHtq5hVzVyjnLTH87ycKPcAwxzBFMfFvzbslq0R00ipYo7y";
  this.facebookPageId = "290144638061244";
  this.instagramId = "17841405547472752";
  this.facebookAdId = "505249990112820";
  this.pixelId = "814052605684956";
  this.appVersion = "v18.0";
}

FacebookAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
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

  } catch (e) {
    await emergencyAlarm("FacebookAPIs.dailyCampaign error : " + e.message);
    console.log(e);
  }
}

FacebookAPIs.prototype.instagramList = async function () {
  const instance = this;
  const back = this.back;
  const { facebookUrl: url, facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, fileSystem, requestSystem, errorLog, zeroAddition, linkToString } = this.mother;
  try {
    const keyToken = "_instagram";
    let res;
    let mediaId;
    let metric;
    let resultTong;
    let thisObj;
    
    mediaId = [];

    res = await requestSystem(url + "/" + appVersion + "/" + instagramId + "/media", {
      access_token: facebookToken
    }, { method: "get" });
    for (let { id } of res.data.data) {
      mediaId.push(id);
    }

    while (res.data.paging !== undefined && typeof res.data.paging.next === "string") {
      res = await requestSystem(res.data.paging.next);
      for (let { id } of res.data.data) {
        mediaId.push(id);
      }
    }

    resultTong = [];

    for (let thisId of mediaId) {
      try {
        thisObj = { id: thisId };

        res = await requestSystem(url + "/" + appVersion + "/" + thisId, {
          access_token: facebookToken,
          fields: "media_type,media_url,timestamp,like_count",
        }, { method: "get" });
  
        thisObj.date = {
          create: new Date(res.data.timestamp),
          update: new Date(),
        }
        thisObj.type = {
          name: "media",
          detail: res.data.media_type
        }
        thisObj.url = res.data.media_url;
        thisObj.key = dateToString(thisObj.date.create).replace(/[^0-9]/gi, '') + "_" + thisId + keyToken;
  
        thisObj.value = {};
        thisObj.value.interactions = res.data.like_count;
  
        res = await requestSystem(url + "/" + appVersion + "/" + thisId + "/insights", {
          access_token: facebookToken,
          metric: "reach",
        }, { method: "get" });
  
        thisObj.value.reach = res.data.data.find((o) => { return o.name === "reach" }).values.reduce((acc, curr) => { return acc + curr.value }, 0)
        resultTong.push(thisObj);
      } catch {}
    }

    await fileSystem(`writeJson`, [ `${process.cwd()}/temp/instaResult.json`, resultTong ])

  } catch (e) {
    console.log(e);
    return null;
  }
}

FacebookAPIs.prototype.dailyInstagram = async function (selfMongo, dayNumber = 7) {
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

    token = "EAAZBU9pw9OFcBOZCc2lNsuYZAjBMbvRmJXxndsKpyZCPHexRdlEj54RxnOtr6d6IhXbTotYREQmf0Lps7XCqgOv4OAX1PUXcuynUcxzJeskhjlulPF0UCgJd77pdcR2X0kqw8LeencT3hedvQc7fXMOnxCtAT7I5gNWtd00oN1o9KF5QG4kHE8c3jMOW5kkeAaiULTcdmj54FD2JcJuwuh2eF4VyxZCQD0adC5WtRiEA9fdOyzPcZD";

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
