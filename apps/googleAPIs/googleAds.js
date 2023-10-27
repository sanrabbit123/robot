const GoogleAds = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/googleAPIs";
}

GoogleAds.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const campaignCollection = "dailyCampaign";
    let startDate;
    let res;
    let from, to;
    let key;
    let json;
    let tempRows;
    let views, likes, subscribers;
    let now;
    let targetRows;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < (dayNumber - 1); i++) {
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

      res = await pythonExecute(`${this.dir}/python/app.py`, [ "ads", "getCampaignList" ], { date: dateToString(from) });

      if (Array.isArray(res)) {
        targetRows = res.map((obj) => {
          return {
            id: obj.id,
            account: obj.account,
            name: obj.name,
            type: obj.type.replace(/^AdvertisingChannelType\./i, ''),
            cost: Math.round(Number(obj.cost_micros) / 1000000),
            impressions: Number(obj.impressions),
            clicks: Number(obj.clicks),
          }
        }).filter((obj) => {
          return !(obj.cost === 0 && obj.impressions === 0 && obj.clicks === 0);
        });
  
        num = 0;
  
        for (let obj of targetRows) {
  
          key = dateToString(from).replace(/\-/gi, '') + "_" + obj.id
  
          json = {
            camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'g' + String.fromCharCode(97 + num) + zeroAddition(from.getDate()) + 's',
            key,
            date: { from, to },
            value: {
              charge: Number(obj.cost),
              performance: {
                impressions: Number(obj.impressions),
                clicks: Number(obj.clicks),
              },
            },
            information: {
              mother: "google",
              type: obj.type,
              id: {
                account: obj.account,
                campaign: obj.id,
              },
              name: obj.name,
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

    }

    if (logger !== null) {
      logger.cron("google daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    emergencyAlarm("GoogleAds.dailyCampaign error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

GoogleAds.prototype.getCampaignsByDate = async function (targetDate) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, emergencyAlarm, zeroAddition } = this.mother;
  try {
    let res;
    let targetRows;
    let num;
    let key, json;
    let from, to;
    let result;

    if (!(targetDate instanceof Date)) {
      throw new Error("invalid input");
    }

    from = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
    to = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
    to.setDate(to.getDate() + 1);

    res = await pythonExecute(`${this.dir}/python/app.py`, [ "ads", "getCampaignList" ], { date: dateToString(targetDate) });
    if (Array.isArray(res)) {
      targetRows = res.map((obj) => {
        return {
          id: obj.id,
          account: obj.account,
          name: obj.name,
          type: obj.type.replace(/^AdvertisingChannelType\./i, ''),
          cost: Math.round(Number(obj.cost_micros) / 1000000),
          impressions: Number(obj.impressions),
          clicks: Number(obj.clicks),
          interactions: Number(obj.interactions),
        }
      }).filter((obj) => {
        return !(obj.cost === 0 && obj.impressions === 0 && obj.clicks === 0);
      });

      num = 0;
      result = [];
      for (let obj of targetRows) {

        key = dateToString(targetDate).replace(/\-/gi, '') + "_" + obj.id

        json = {
          key,
          date: { from, to },
          value: {
            charge: Number(obj.cost),
            performance: {
              impressions: Number(obj.impressions),
              clicks: Number(obj.clicks),
              interactions: Number(obj.interactions),
            },
          },
          information: {
            mother: "google",
            type: obj.type,
            id: {
              account: obj.account,
              campaign: obj.id,
            },
            name: obj.name,
          }
        };

        result.push(json);
        num++;
      }

      return result;

    } else {
      return [];
    }

  } catch (e) {
    emergencyAlarm("GoogleAds.getCampaignsByDate error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

GoogleAds.prototype.googleComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const collection = "googleComplex";
    const idKeyword = 'f';
    const googleKeyword = 'g';
    const googleKeyKeyword = "google";
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
    let campaigns;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
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

      key = dateToString(from).replace(/\-/gi, '') + "_" + googleKeyKeyword;
      json = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + googleKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0,
            performance: {
              interactions: 0,
              impressions: 0,
              clicks: 0
            },
            length: {
              campaign: 0,
            }
          },
          campaign: [],
        }
      };

      // campaign
      campaigns = await ads.getCampaignsByDate(from);
      for (let campaign of campaigns) {
        json.advertisement.campaign.push({
          value: {
            charge: campaign.value.charge,
            performance: {
              interactions: campaign.value.performance.interactions,
              impressions: campaign.value.performance.impressions,
              clicks: campaign.value.performance.clicks,
            }
          },
          information: {
            id: campaign.information.id.campaign,
            account: campaign.information.id.account,
            name: campaign.information.id.name,
          }
        })
      }
      json.advertisement.value.length.campaign = json.advertisement.campaign.length;
      json.advertisement.value.charge = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
      json.advertisement.value.performance.interactions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.interactions }, 0);
      json.advertisement.value.performance.impressions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
      json.advertisement.value.performance.clicks = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
  
      // youtube


      // search


      // store
      // tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      // if (tempRows.length !== 0) {
      //   await back.mongoDelete(collection, { key }, { selfMongo });
      // }
      // await back.mongoCreate(collection, json, { selfMongo });
      console.log(json);

    }

    if (logger !== null) {
      logger.cron("google complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    emergencyAlarm("GoogleAds.googleComplex error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

module.exports = GoogleAds;
