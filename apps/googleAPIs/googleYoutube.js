const GoogleYoutube = function (mother = null, back = null, address = null) {
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

GoogleYoutube.prototype.dailyYoutube = async function (selfMongo, dayNumber = 7, logger = null) {
  const instance = this;
  const back = this.back;
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, zeroAddition, emergencyAlarm } = this.mother;
  try {
    const channelCollection = "dailyChannel";
    let startDate;
    let res;
    let from, to;
    let key;
    let json;
    let tempRows;
    let views, likes, subscribers;
    let now;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < (dayNumber - 1); i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    for (let i = 0; i < (dayNumber - 1); i++) {
      from = new Date(JSON.stringify(startDate).slice(1, -1));
      to = new Date(JSON.stringify(startDate).slice(1, -1));
      to.setDate(to.getDate() + 1);

      key = dateToString(from).replace(/\-/gi, '') + "_" + "youtube";

      res = await pythonExecute(`${this.dir}/python/app.py`, [ "youtube", "channelNumbers" ], { startDate: dateToString(from), endDate: dateToString(from) });
      [ views, likes, subscribers ] = res;

      if (typeof views === "number" && typeof likes === "number" && typeof subscribers === "number") {
        json = {
          chaid: 'h' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'g' + 'y' + zeroAddition(from.getDate()) + 's',
          key,
          date: { from, to },
          value: {
            profile: { subscribers },
            performance: { views, likes }
          },
          information: {
            mother: "google",
            type: "youtube",
          }
        };

        tempRows = await back.mongoRead(channelCollection, { key }, { selfMongo });
        if (tempRows.length !== 0) {
          await back.mongoDelete(channelCollection, { key }, { selfMongo });
        }
        await back.mongoCreate(channelCollection, json, { selfMongo });
        console.log(json);
      }

      startDate.setDate(startDate.getDate() + 1);
      await sleep(500);
    }

    if (logger !== null) {
      logger.cron("google daily youtube done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    emergencyAlarm("GoogleYoutube.dailyYoutube error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

module.exports = GoogleYoutube;
