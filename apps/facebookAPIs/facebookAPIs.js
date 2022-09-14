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
  this.facebookToken = "EAAZBU9pw9OFcBAFScXv1FdfOpRSybLX1JyAb85sy6mgtu1Gyum7jyQVDMIhNQp6qVZCoFwrSnxJNsMUbmLpNeEwn4pqYjvxIK3RTpL8zMjG9korM4T9aZBIi2KIJWdalC2nBn50RQTcZCU3UG3EBMVD9cQo0ZC94qjXREIodvpbgr5EOcTVNl";
  this.facebookPageId = "290144638061244";
  this.instagramId = "17841405547472752";
  this.facebookAdId = "505249990112820";

}

FacebookAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem } = this.mother;
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

    startDate = new Date();
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    for (let i = 0; i < dayNumber; i++) {

      await sleep(200);

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
    console.log(e);
  }
}

module.exports = FacebookAPIs;
