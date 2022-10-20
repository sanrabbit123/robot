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

  this.facebookAppId = "4385911554783319";
  this.facebookAppSecret = "5c9ad0873f5983081b8ad1ba1855806e";
  this.facebookToken = "EAAZBU9pw9OFcBAC04DxfOzEz5Jsk6HJxZBRuxDZCPHjLFSVSJLmYg9ZBWIfBuxjhIC9KsHLZA1H73OjVQSjGZCTK2e7rJIp7XZBQD9ZCZBrW87rbcBki1H25iywoTFrhoMjF238rxFlAshSUbar6TyxLFt8CMf5Bv3bNIvZBfmBZBq1q7qiSS4ZAdqox";
  this.facebookPageId = "290144638061244";
  this.instagramId = "17841405547472752";
  this.facebookAdId = "505249990112820";

}

FacebookAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog } = this.mother;
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

      res = await requestSystem("https://graph.facebook.com/v14.0/act_" + facebookAdId + "/insights", {
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
        await back.mongoCreate(campaignCollection, json, { selfMongo })
        console.log(json);
        num++;
      }

    }

  } catch (e) {
    await errorLog("FacebookAPIs.dailyCampaign error : " + e.message);
    console.log(e);
  }
}

FacebookAPIs.prototype.dailyInstagram = async function (selfMongo, dayNumber = 7) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
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

    res = await requestSystem("https://graph.facebook.com/v14.0/" + instagramId + "/insights", {
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

FacebookAPIs.prototype.getAccessToken = async function () {
  const instance = this;
  const { requestSystem } = this.mother;
  const { facebookAppId, facebookAppSecret, facebookPageId, instagramId, facebookAdId } = this;
  try {
    const url = "https://graph.facebook.com/oauth/access_token";
    let res, token;

    token = "EAAZBU9pw9OFcBAJamBM5nKa39Lk8gWlvsnVqcyXI2OXLnamQ2H0ji9qmsJNiCfDia0lzLXUxlZAqfJQSYN2UFZAFQQbLXJGPXiZAq879J8UGrhyKOULwSTAGzYhSSEVitBsDMSwy5RwExtPWBIMg8Gcwb33XfrphievgRDptvNTcEWTlX50aZCmV2wvFA4NqSrEM7fICFq7SY3LGfz5Ft8wJZByZAxJZCMhA1Gehe2L9bTPNKzABRg3YIswpS4gu2lcZD";

    res = await requestSystem(url, {
      grant_type: "fb_exchange_token",
      client_id: facebookAppId,
      client_secret: facebookAppSecret,
      fb_exchange_token: token,
    }, { method: "get" })

    console.log(res);

  } catch (e) {
    console.log(e);
  }
}

module.exports = FacebookAPIs;
