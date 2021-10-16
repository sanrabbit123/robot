const CronSource = function (mother, back, address, MONGOLOCALC, RETHINKC) {
  this.mother = mother;
  this.back = back;
  this.address = address;
  this.mongo = MONGOLOCALC;
  this.rethink = RETHINKC;
  this.dir = process.cwd() + "/apps/cronGhost/source";
  this.sourceMap = null;
}

CronSource.prototype.sourceLoad = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const { dir } = this;
  try {
    const dateList = await fileSystem(`readFolder`, [ dir + "/day" ]);
    const hourList = await fileSystem(`readFolder`, [ dir + "/hour" ]);
    let dateDetailList, dateFinalList, dateNum;
    let hourDetailList, hourFinalList, hourNum;
    let sourceMap;

    dateDetailList = dateList.map((name) => { return fileSystem(`readFolder`, [ `${dir}/day/${name}` ]); });
    dateFinalList = [];
    dateNum = 0;
    for await (let list of dateDetailList) {
      dateFinalList.push([
        dateList[dateNum],
        list.filter((script) => { return script !== "0_sample.js"; }).map((file) => {
          return `${dir}/day/${dateList[dateNum]}/${file}`;
        }),
      ]);
      dateNum++;
    }

    hourDetailList = hourList.map((name) => { return fileSystem(`readFolder`, [ `${dir}/hour/${name}` ]); });
    hourFinalList = [];
    hourNum = 0;
    for await (let list of hourDetailList) {
      hourFinalList.push([
        hourList[hourNum],
        list.filter((script) => { return script !== "0_sample.js"; }).map((file) => {
          return `${dir}/day/${dateList[dateNum]}/${file}`;
        }),
      ]);
      hourNum++;
    }

    sourceMap = {
      date: dateFinalList,
      hour: hourFinalList
    };

    this.sourceMap = sourceMap;

    return sourceMap;

  } catch (e) {
    console.log(e);
  }
}

CronSource.prototype.targetLauching = async function (cronId) {
  const instance = this;
  const { sourceMap, rethink } = this;
  const { day: dayId, hour: hourId } = cronId;
  try {
    const { date, hour } = sourceMap;
    let targetList;
    let index;
    let num;
    let res;

    index = sourceMap.date.findIndex((arr) => { return arr[0] === dayId; });
    if (index !== -1) {
      targetList = sourceMap.date[index][1].map((path) => {
        return require(path);
      });
      num = 0;
      for (let asyncFunction of targetList) {
        res = await asyncFunction(this.mother, this.back, this.address, this.mongo);
        await rethink.create({ date: new Date(), name: sourceMap.date[index][1][num].split("/").slice(-1)[0], result: res });
        num++;
      }
    }

    index = sourceMap.hour.findIndex((arr) => { return arr[0] === hourId; });
    if (index !== -1) {
      targetList = sourceMap.hour[index][1].map((path) => {
        return require(path);
      });
      num = 0;
      for (let asyncFunction of targetList) {
        res = await asyncFunction(this.mother, this.back, this.address, this.mongo);
        await rethink.create({ date: new Date(), name: sourceMap.hour[index][1][num].split("/").slice(-1)[0], result: res });
        num++;
      }
    }

  } catch (e) {
    console.log(e);
  }
}


module.exports = CronSource;
