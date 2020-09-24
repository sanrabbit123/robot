const GoogleAnalytics = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tempDir = process.cwd() + "/temp";
}

GoogleAnalytics.prototype.getClients = async function () {
  const instance = this;
  const mother = this.mother;
  const sheet = this.mother.googleSystem("sheets");
  const sheetInfo = {
    id: "1Z940pTUwFo9kyY_UjgzXnWm9bbX88bRNLuCEtym6zzA",
    sheet: "sheet1",
    startPoint: [ 0, 1 ],
  }
  try {
    let result, obj, finalArr;
    let sheetRow;
    let tempArr, tempString;

    result = await mother.pythonExecute(this.pythonApp, [], { startDate: "2020-09-01", endDate: "2020-09-23" });

    //to object
    obj = {};
    for (let i of result) {
      if (!obj.hasOwnProperty(i.clientId)) {
        obj[i.clientId] = {};
        if (i.city === '(not set)') {
          obj[i.clientId].city = null;
        } else {
          obj[i.clientId].city = i.city;
        }
        obj[i.clientId].browser = i.browser;
        if (i.keyword === '(not set)') {
          obj[i.clientId].keyword = null;
        } else {
          obj[i.clientId].keyword = i.keyword;
        }
        if (i.sourceMedium === '(direct) / (none)') {
          obj[i.clientId].sourceMedium = null;
        } else {
          obj[i.clientId].sourceMedium = i.sourceMedium;
        }
        if (i.deviceCategory === "mobile") {
          obj[i.clientId].deviceCategory = "모바일";
        } else if (i.deviceCategory === "desktop") {
          obj[i.clientId].deviceCategory = "데스크탑";
        } else {
          obj[i.clientId].deviceCategory = "태블릿";
        }
        obj[i.clientId].pageHistory = [ { page: i.pagePath, date: Number(i.dateHourMinute) } ];
        if (i.userType === 'New Visitor') {
          obj[i.clientId].userType = "새로운 방문자";
        } else {
          obj[i.clientId].userType = "재방문자";
        }
      } else {
        obj[i.clientId].pageHistory.push({ page: i.pagePath, date: Number(i.dateHourMinute) });
      }
    }
    for (let key in obj) {
      obj[key].pageHistory.sort((a, b) => { return a.date - b.date; });
    }
    finalArr = [];
    for (let key in obj) {
      finalArr.push({ clientId: key, info: obj[key] });
    }
    finalArr.sort((a, b) => { return a.info.pageHistory[0].date - b.info.pageHistory[0].date; });

    for (let i of finalArr) {
      for (let j = 0; j < i.info.pageHistory.length; j++) {
        i.info.pageHistory[j].date = String(i.info.pageHistory[j].date).slice(0, 4) + "-" + String(i.info.pageHistory[j].date).slice(4, 6) + "-" + String(i.info.pageHistory[j].date).slice(6, 8) + " " + String(i.info.pageHistory[j].date).slice(8, 10) + ":" + String(i.info.pageHistory[j].date).slice(10, 12)
      }
    }

    //write json file
    await mother.fileSystem(`write`, [ this.tempDir + "/analytics.json", JSON.stringify(finalArr, null, 2) ]);

    //to sheet
    sheetRow = [];

    for (let z of finalArr) {
      tempArr = [];
      tempArr.push(z.clientId);
      if (z.info.city !== null) {
        tempArr.push(z.info.city);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.browser !== null) {
        tempArr.push(z.info.browser);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.keyword !== null) {
        tempArr.push(z.info.keyword);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.sourceMedium !== null) {
        tempArr.push(z.info.sourceMedium);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.deviceCategory !== null) {
        tempArr.push(z.info.deviceCategory);
      } else {
        tempArr.push("알 수 없음");
      }
      if (z.info.userType !== null) {
        tempArr.push(z.info.userType);
      } else {
        tempArr.push("알 수 없음");
      }
      tempString = '';
      for (let i = 0; i < z.info.pageHistory.length; i++) {
        tempString += "시점 : " + z.info.pageHistory[i].date + " / ";
        tempString += "경로 : " + z.info.pageHistory[i].page + " | ";
      }
      tempString = tempString.slice(0, -3);
      tempArr.push(tempString);
      sheetRow.push(tempArr);
    }

    await sheet.update_value(sheetInfo.id, sheetInfo.sheet, sheetRow, sheetInfo.startPoint);

  } catch (e) {
    console.log(e.message);
  } finally {
    console.log("done");
  }
}


module.exports = GoogleAnalytics;
