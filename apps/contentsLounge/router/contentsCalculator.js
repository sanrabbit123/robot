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

ContentsCalculator.prototype.forecastWebSchedule = async function (selfMongo, logger = null) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const calendar = this.calendar;
  const { calendarName } = this;
  const { requestSystem, equalJson, dateToString, stringToDate, getHoliday } = this.mother;
  const targetDayNumbers = [ 3, 5 ];
  const safeNum = 1000;
  const returnGoogleCalendarArr = async () => {
    try {
      const res = await requestSystem("https://" + address.contentsinfo.host + ":3000/contentsCalendar", { mode: "get" }, { headers: { "Content-Type": "application/json" } });
      const targets = equalJson(JSON.stringify(res.data));
      const delta = 7 * 8
      let realTargets, realTargets2;
      let thisId;
      let future;

      future = new Date();
      future.setDate(future.getDate() + delta);

      realTargets = [];
      for (let obj of targets) {
        thisId = obj.pid;
        realTargets.push({
          id: obj.eventId,
          pid: thisId,
          date: stringToDate(dateToString(obj.date.start))
        });
      }

      realTargets2 = realTargets.filter((o) => {
        return o.date.valueOf() <= future.valueOf();
      })
      realTargets = realTargets.filter((o) => {
        return o.date.valueOf() > future.valueOf();
      })

      return { alreadyArr: realTargets2, futureArr: realTargets };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  try {
    const holidayArr = await getHoliday(true);
    const { alreadyArr, futureArr } = await returnGoogleCalendarArr();
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
    let allDesigners;
    let tempArr;

    if (!Array.isArray(alreadyArr)) {
      throw new Error("request fail");
    }

    allDesigners = await back.getDesignersByQuery({}, { selfMongo, toNormal: true });

    contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
    contentsArr = contentsArr.toNormal();
    contentsArrPid = contentsArr.map(({ contents: { portfolio: { pid } } }) => { return pid });

    for (let designer of allDesigners) {
      tempArr = contentsArr.filter((c) => { return c.desid === designer.desid });
      designer.contents = equalJson(JSON.stringify(tempArr));
    }

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

    await calendar.deleteSchedules(calendarName, futureArr.map(({ id }) => { return id; }));

    projects = (await back.getProjectsByQuery({ $or: resultTong.map(({ proid }) => { return { proid } }) }, { selfMongo })).toNormal();
    for (let obj of resultTong) {
      proid = obj.proid;
      obj.project = projects.find((p) => { return p.proid === proid });
      obj.foreCast = null;
    }

    resultTong = resultTong.filter((o) => {
      return !alreadyArr.map(({ pid }) => { return pid }).includes(o.pid);
    })

    resultTong = resultTong.map((o) => {
      const thisDesigner = allDesigners.find((d) => { return d.desid === o.project.desid });
      let gradeNumber;
      if (thisDesigner.analytics.grade === -1) {
        gradeNumber = 1;
      } else if (thisDesigner.analytics.grade === 1) {
        gradeNumber = 2;
      } else {
        gradeNumber = 3;
      }
      gradeNumber = gradeNumber * 10000;
      gradeNumber = gradeNumber + (thisDesigner.contents.length * 100);
      gradeNumber = gradeNumber + Number(o.pid.replace(/[^0-9]/gi, ''))
      o.gradeNumber = gradeNumber;
      return o;
    });

    // resultTong.sort((a, b) => { return a.gradeNumber - b.gradeNumber });
    
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
    if (logger !== null) {
      logger.error("Contents calculator 문제 생김 (forecastWebSchedule): " + e.message).catch((e) => { console.log(e); });
    }
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
      await sleep(3000);
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

ContentsCalculator.prototype.storeContentsView = async function (selfMongo, selfCoreMongo, selfLocalMongo, logger) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { requestSystem, equalJson, dateToString, stringToDate, sleep } = this.mother;
  try {
    const analyticsCollection = "homeliaisonAnalytics";
    const action = "contentsView";
    const collection = "contentsView";
    let rows;
    let whereQuery;
    let contentsArr;
    let jsonModel;
    let browserMap;
    let foundTarget, foundTarget2, foundTarget3;
    let osMap;
    let timeMap;
    let dateTypeString;
    let finalJson;
    let finalRows, key;

    key = dateToString(new Date()).replace(/[^0-9]/gi, '') + "_web";
    finalJson = {
      key,
      date: new Date(),
      contents: [],
    };

    contentsArr = await back.getContentsArrByQuery({}, { selfMongo: selfCoreMongo });
    for (let contents of contentsArr) {

      thisPid = contents.contents.portfolio.pid;
      whereQuery = { action, "data.contents_pid": thisPid };
      rows = await back.mongoRead(analyticsCollection, whereQuery, { selfMongo });
  
      browserMap = rows.filter((o) => { return typeof o.device.os.browser === "string" }).map((o) => { return o.device.os.browser.toLowerCase().trim(); });
      browserMap = [ ...new Set(browserMap) ];
      browserMap = browserMap.map((type) => { return { type, value: 0 } })
  
      osMap = rows.filter((o) => { return typeof o.device.os.name === "string" }).map((o) => { return o.device.os.name.toLowerCase().trim(); });
      osMap = [ ...new Set(osMap) ];
      osMap = osMap.map((type) => { return { type, value: 0 } })
  
      timeMap = rows.map((o) => { return dateToString(o.date).replace(/[^0-9]/gi, '').slice(0, 6) });
      timeMap = [ ...new Set(timeMap) ];
      timeMap = timeMap.map((type) => { return { type, value: 0 } })
  
      for (let obj of rows) {
        if (typeof obj.device.os.browser === "string") {
          foundTarget = browserMap.find((o) => { return o.type === obj.device.os.browser.toLowerCase().trim() });
          if (foundTarget !== undefined) {
            foundTarget.value = foundTarget.value + 1;
          }
        }
        if (typeof obj.device.os.name === "string") {
          foundTarget2 = osMap.find((o) => { return o.type === obj.device.os.name.toLowerCase().trim() });
          if (foundTarget2 !== undefined) {
            foundTarget2.value = foundTarget2.value + 1;
          }
        }
        dateTypeString = dateToString(obj.date).replace(/[^0-9]/gi, '').slice(0, 6)
        foundTarget3 = timeMap.find((o) => { return o.type === dateTypeString });
        if (foundTarget3 !== undefined) {
          foundTarget3.value = foundTarget3.value + 1;
        }
      }
  
      jsonModel = {
        pid: thisPid,
        conid: contents.conid,
        desid: contents.desid,
        proid: contents.proid,
        date: new Date(JSON.stringify(contents.contents.portfolio.date).slice(1, -1)),
        data: {
          view: {
            total: rows.length,
            portfolio: rows.filter((obj) => { return !/revdetail/gi.test(obj.info.requestUrl) }).length,
            review: rows.filter((obj) => { return /revdetail/gi.test(obj.info.requestUrl) }).length,
          },
          device: {
            mobile: rows.filter((obj) => { return /mobile/gi.test(obj.device.device.type) }).length,
            desktop: rows.filter((obj) => { return /desktop/gi.test(obj.device.device.type) }).length,
            tablet: rows.filter((obj) => { return /tablet/gi.test(obj.device.device.type) }).length,
          },
          browser: equalJson(JSON.stringify(browserMap)),
          os: equalJson(JSON.stringify(osMap)),
          time: equalJson(JSON.stringify(timeMap)),
        }
      };
  
      finalJson.contents.push(equalJson(JSON.stringify(jsonModel)));

      await sleep(1500);
    }
    
    finalRows = await back.mongoRead(collection, { key }, { selfMongo: selfLocalMongo });
    if (finalRows.length > 0) {
      await back.mongoDelete(collection, { key }, { selfMongo: selfLocalMongo });
    }
    await back.mongoCreate(collection, finalJson, { selfMongo: selfLocalMongo });

    await logger.log("store web contents view success : " + JSON.stringify(new Date()));
    return { message: "done" };
  } catch (e) {
    logger.error("Contents calculator 문제 생김 (storeContentsView): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
    return null;
  }
}

module.exports = ContentsCalculator;