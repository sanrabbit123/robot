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

GoogleAds.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
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


  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleAds;
