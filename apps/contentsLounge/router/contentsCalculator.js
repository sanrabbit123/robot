const ContentsCalculator = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.sheets = new GoogleSheet();
  this.calendar = new GoogleCalendar();

  this.calendarName = "homeliaisonContents";
}

ContentsCalculator.prototype.forecastWebSchedule = async function (selfMongo, logger) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { requestSystem, equalJson, dateToString, stringToDate, getHoliday } = this.mother;
  const targetDayNumbers = [ 3, 5 ];
  const safeNum = 1000;
  const returnGoogleCalendarArr = async () => {
    try {
      const res = await requestSystem("https://" + address.contentsinfo.host + ":3000/contentsCalendar", { mode: "get" }, { headers: { "Content-Type": "application/json" } });
      const targets = equalJson(JSON.stringify(res.data));
      let realTargets;
      let thisId;
      realTargets = [];
      for (let obj of targets) {
        thisId = obj.pid;
        realTargets.push({
          pid: thisId,
          date: stringToDate(dateToString(obj.date.start))
        });
      }
      return realTargets;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  try {
    const holidayArr = await getHoliday(true);
    const alreadyArr = await returnGoogleCalendarArr();
    let contentsArr;
    let contentsArrPid;
    let foreContentsArr;
    let foreContentsArrPid;
    let pidArr;
    let resultTong;
    let contentsArrResult, foreContentsResult;
    let thisObj;
    let projects;
    let proid;
    let runner;
    let number;
    let thisDayNumber;
    let thisDateString;
    let index;
    let exceptionPids;
    let cliidArr, desidArr;
    let targetClients, targetDesigners;

    if (!Array.isArray(alreadyArr)) {
      throw new Error("request fail");
    }

    contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
    contentsArr = contentsArr.toNormal();
    contentsArrPid = contentsArr.map(({ contents: { portfolio: { pid } } }) => { return pid });

    foreContentsArr = (await requestSystem("https://" + address.contentsinfo.host + ":3000/foreContents", { mode: "get" }, { headers: { "Content-Type": "application/json" } })).data;
    foreContentsArrPid = foreContentsArr.map(({ pid }) => { return pid });
    exceptionPids = (await requestSystem("https://" + address.contentsinfo.host + ":3000/foreContents", { mode: "exceptionList", type: "string" }, { headers: { "Content-Type": "application/json" } })).data;

    pidArr = contentsArrPid.concat(foreContentsArrPid);
    pidArr = [ ...new Set(pidArr) ].filter((id) => { return /^p/gi.test(id) });
    pidArr.sort((a, b) => { return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, '')) });

    resultTong = [];
    for (let pid of pidArr) {
      if (!exceptionPids.includes(pid)) {
        thisObj = { pid, proid: "" };
        contentsArrResult = contentsArr.findIndex((obj) => { return obj.contents.portfolio.pid === pid });
        foreContentsResult = foreContentsArr.findIndex((obj) => { return obj.pid === pid });
        if (contentsArrResult === -1) {
          foreContentsResult = foreContentsArr.find((obj) => { return obj.pid === pid });
          if (foreContentsResult !== undefined) {
            thisObj.proid = foreContentsResult.proid;
            resultTong.push(equalJson(JSON.stringify(thisObj)));
          }
        }
      }
    }

    projects = (await back.getProjectsByQuery({ $or: resultTong.map(({ proid }) => { return { proid } }) }, { selfMongo })).toNormal();
    for (let obj of resultTong) {
      proid = obj.proid;
      obj.project = projects.find((p) => { return p.proid === proid });
      obj.foreCast = null;
    }

    resultTong = resultTong.filter((o) => {
      return !alreadyArr.map(({ pid }) => { return pid }).includes(o.pid);
    })

    runner = new Date();
    number = 0;
    index = 0;
    while (true) {
      thisDayNumber = runner.getDay();
      if (targetDayNumbers.includes(thisDayNumber)) {
        if (!holidayArr.includes(dateToString(runner))) {
          if (!alreadyArr.map(({ date }) => { return dateToString(date) }).includes(dateToString(runner))) {
            thisDateString = dateToString(runner, true);
            if (resultTong[index] === undefined) {
              break;
            }
            resultTong[index].foreCast = stringToDate(thisDateString);
            index = index + 1;
          }
        }
      }
      runner.setDate(runner.getDate() + 1);
      number++;
      if (number > safeNum) {
        break;
      }
    }

    cliidArr = [ ...new Set(resultTong.map((o) => { return o.project.cliid })) ];
    desidArr = [ ...new Set(resultTong.map((o) => { return o.project.desid })) ];

    if (cliidArr.length > 0) {
      targetClients = (await back.getClientsByQuery({ $or: cliidArr.map((cliid) => { return { cliid } }) }, { selfMongo })).toNormal();
    } else {
      targetClients = [];
    }

    if (desidArr.length > 0) {
      targetDesigners = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
    } else {
      targetDesigners = [];
    }

    for (let obj of resultTong) {
      if (targetClients.length > 0) {
        obj.name = targetClients.find((c) => { return c.cliid === obj.project.cliid }).name;
      } else {
        obj.name = "";
      }
      if (targetDesigners.length > 0) {
        obj.designer = targetDesigners.find((c) => { return c.desid === obj.project.desid }).designer;
      } else {
        obj.designer = "";
      }

      if (/^미정$/gi.test(obj.project.contents.photo.info.interviewer) || /없음/gi.test(obj.project.contents.photo.info.interviewer)) {
        obj.title = "Web(" + obj.pid + ")" + " " + obj.name + "C" + " " + obj.designer + "D";
      } else {
        obj.title = "Web(" + obj.pid + ")" + " " + obj.name + "C" + " " + obj.designer + "D" + " " + obj.project.contents.photo.info.interviewer + "I";
      }

    }

    return resultTong;

  } catch (e) {
    logger.error("Contents calculator 문제 생김 (forecastWebSchedule): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
    return null;
  }
}

ContentsCalculator.prototype.settingWebSchedule = async function (selfMongo, logger) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const calendar = this.calendar;
  const { calendarName } = this;
  const { requestSystem, equalJson, dateToString, stringToDate, sleep } = this.mother;
  try {
    const safeNum = 20;
    let forecastSchedule;
    let num;
    let length;
    let result;

    forecastSchedule = await this.forecastWebSchedule(selfMongo, logger);
    num = 0;
    while (forecastSchedule === null) {
      if (num > safeNum) {
        break;
      }
      await sleep(2000);
      forecastSchedule = await this.forecastWebSchedule(selfMongo, logger);
      num++;
    }
    if (forecastSchedule === null) {
      throw new Error("forecast fail");
    }

    length = forecastSchedule.length;
    for (let i = 0; i < length; i++) {
      result = await calendar.makeSchedule(calendarName, forecastSchedule[i].title, "", dateToString(forecastSchedule[i].foreCast), null, true);
      if (result === null) {
        throw new Error("make schedule fail");
      }
      await sleep(1000);
    }

    await logger.log("setting web schedule success : " + JSON.stringify(new Date()));
    return { message: "done" };

  } catch (e) {
    logger.error("Contents calculator 문제 생김 (settingWebSchedule): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
    return null;
  }
}

ContentsCalculator.prototype.syncWebSchedule = async function (selfMongo, logger) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { requestSystem, equalJson, dateToString, stringToDate, sleep } = this.mother;
  try {
    const responseResult = await requestSystem("https://" + address.contentsinfo.host + ":3000/contentsCalendar", { mode: "get", detailMode: true }, { headers: { "Content-Type": "application/json" } });
    const calendarTargets = equalJson(JSON.stringify(responseResult.data));
    let whereQuery, updateQuery;

    for (let { date, proid } of calendarTargets) {
      whereQuery = { proid };
      updateQuery = {};
      updateQuery["contents.sns.portfolio.long"] = new Date(JSON.stringify(date.start).slice(1, -1));
      updateQuery["contents.sns.interview.long"] = new Date(JSON.stringify(date.start).slice(1, -1));
      await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
    }

    await logger.log("sync web schedule success : " + JSON.stringify(new Date()));
    return { message: "done" };
  } catch (e) {
    logger.error("Contents calculator 문제 생김 (syncWebSchedule): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
    return null;
  }
}

module.exports = ContentsCalculator;