const CronSource = function (mother, back, address, kakaoInstance, humanInstance, work, report, bill, analytics, sheets, drive, calendar, docs, MONGOC, MONGOCONSOLEC, MONGOPYTHONC, MONGOLOCALC) {
  this.mother = mother;
  this.back = back;
  this.address = address;
  this.kakao = kakaoInstance;
  this.human = humanInstance;
  this.work = work;
  this.report = report;
  this.bill = bill;
  this.analytics = analytics;
  this.sheets = sheets;
  this.drive = drive;
  this.calendar = calendar;
  this.docs = docs;
  this.mongo = MONGOC;
  this.mongoconsole = MONGOCONSOLEC;
  this.mongopython = MONGOPYTHONC;
  this.mongolocal = MONGOLOCALC;
  this.dir = process.cwd() + "/apps/cronGhost/source";
  this.sourceMap = null;
}

CronSource.prototype.sourceLoad = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const { dir } = this;
  try {
    const workerList = await fileSystem(`readFolder`, [ dir + "/worker" ]);
    let dateFinalList, hourFinalList;
    let sourceMap;
    let pathList;
    let tempObj;
    let index;

    dateFinalList = [];
    hourFinalList = [];
    pathList = workerList.map((name) => { return `${dir}/worker/${name}` });
    for (let path of pathList) {
      tempObj = require(path);

      for (let id of tempObj.dayId) {
        index = dateFinalList.findIndex((arr) => { return arr[0] === id });
        if (index === -1) {
          dateFinalList.push([ id, [ path ] ]);
        } else {
          dateFinalList[index][1].push(path);
        }
      }

      for (let id of tempObj.hourId) {
        index = hourFinalList.findIndex((arr) => { return arr[0] === id });
        if (index === -1) {
          hourFinalList.push([ id, [ path ] ]);
        } else {
          hourFinalList[index][1].push(path);
        }
      }
    }

    dateFinalList.sort((a, b) => {
      return Number(a[0].replace(/[^0-9]/gi, '')) - Number(b[0].replace(/[^0-9]/gi, ''));
    });
    hourFinalList.sort((a, b) => {
      return Number(a[0].replace(/[^0-9]/gi, '')) - Number(b[0].replace(/[^0-9]/gi, ''));
    });

    sourceMap = {
      date: dateFinalList,
      hour: hourFinalList
    };

    this.sourceMap = sourceMap;

    console.log(JSON.stringify(sourceMap, null, 2));

    return sourceMap;

  } catch (e) {
    console.log(e);
  }
}

CronSource.prototype.targetLauching = async function (cronId) {
  const instance = this;
  const { sourceMap } = this;
  const { day: dayId, hour: hourId } = cronId;
  const package = {
    mother: this.mother,
    back: this.back,
    address: this.address,
    kakao: this.kakao,
    human: this.human,
    work: this.work,
    report: this.report,
    bill: this.bill,
    analytics: this.analytics,
    sheets: this.sheets,
    drive: this.drive,
    calendar: this.calendar,
    docs: this.docs,
    mongo: this.mongo,
    mongoconsole: this.mongoconsole,
    mongopython: this.mongopython,
    mongolocal: this.mongolocal,
  };
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
      for (let obj of targetList) {
        res = await obj.worker(package);
        num++;
      }
    }

    index = sourceMap.hour.findIndex((arr) => { return arr[0] === hourId; });
    if (index !== -1) {
      targetList = sourceMap.hour[index][1].map((path) => {
        return require(path);
      });
      num = 0;
      for (let obj of targetList) {
        res = await obj.worker(package);
        num++;
      }
    }

  } catch (e) {
    console.log(e);
  }
}


module.exports = CronSource;
