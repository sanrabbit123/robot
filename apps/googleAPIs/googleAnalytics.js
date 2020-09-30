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

    const standard = {
      name: "ga:userDefinedValue"
    };

    const dimensions = [
        { name: "ga:country" }, // 국가
        { name: "ga:city" }, // 도시
        { name: "ga:longitude" }, // 경도
        { name: "ga:latitude" }, // 위도
        { name: "ga:browser" }, // 브라우저
        { name: "ga:browserVersion" }, // 브라우저 버전
        { name: "ga:operatingSystem" }, // OS
        { name: "ga:keyword" }, // 검색어
        { name: "ga:source" }, // 전 페이지
        { name: "ga:sourceMedium" }, // 전 페이지
        { name: "ga:deviceCategory" }, // 모바일 / 데스크탑
        { name: "ga:pagePath" }, // 진입 경로
        { name: "ga:pageTitle" }, // 검색어
        { name: "ga:minute" }, // 날짜 - 분
        { name: "ga:date" }, // 날짜 - 일
        { name: "ga:hour" }, // 날짜 - 시간
        { name: "ga:userType" }, // 새로운 사람인지 방문했던 사람인지
        { name: "ga:campaign" }, // 광고 캠패인
        { name: "ga:browserSize" }, // 브라우저 해상도
    ];

    const users = [
        { name: "ga:userAgeBracket" }, // 나이대
        { name: "ga:userGender" }, // 성별
        { name: "ga:interestOtherCategory" }, // 관심사 1
        { name: "ga:interestInMarketCategory" }, // 관심사 2
        { name: "ga:mobileDeviceInfo" }, // 핸드폰 기종
    ];

    let dimensionsKeys = [];
    for (let obj of dimensions) {
      dimensionsKeys.push(obj.name.replace(/^ga:/, ''));
    }

    const startDate = "2020-09-18";
    const endDate = "2020-09-24";
    const bridgeData = { startDate, endDate, standard, dimensions, users };

    //write objects
    let totalTong = [];
    
    /*
    for (let i = 0; i < dimensions.length - 2; i++) {
      result = await mother.pythonExecute(this.pythonApp, [ "analytics", i ], bridgeData);
      console.log(result);
      totalTong.push(result);
      await mother.fileSystem(`write`, [ this.tempDir + "/analytics" + String(i) + ".json", JSON.stringify(result, null, 2) ]);
    }
    */

    result = await mother.pythonExecute(this.pythonApp, [ "analytics", 0 ], bridgeData);
    console.log(result);

    /*

    //merge objects
    for (let i = 1; i < totalTong.length; i++) {
      for (let obj of totalTong[0]) {

        for (let obj2 of totalTong[i]) {
          if (obj[dimensionsKeys[i]] === obj2[dimensionsKeys[i]] && obj[dimensionsKeys[dimensionsKeys.length - 1]] === obj2[dimensionsKeys[dimensionsKeys.length - 1]]) {
            obj[dimensionsKeys[i + 1]] = obj2[dimensionsKeys[i + 1]];
          }
        }

      }
    }
    let [ mergeTong ] = totalTong;
    await mother.fileSystem(`write`, [ this.tempDir + "/analytics.json", JSON.stringify(mergeTong, null, 2) ]);
    console.log("merge done");


    */





    /*
    //to object
    obj = {};
    for (let i of result) {
      if (!obj.hasOwnProperty(i.clientId)) {
        obj[i.clientId] = {};
        if (/^\(not/.test(i.city)) {
          obj[i.clientId].city = null;
        } else {
          obj[i.clientId].city = i.city;
        }
        obj[i.clientId].browser = i.browser;
        if (/^\(not/.test(i.keyword)) {
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
        if (/^\(not/.test(i.campaign)) {
          obj[i.clientId].campaign = null;
        } else {
          obj[i.clientId].campaign = i.campaign;
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
    */
    //write json file
    // await mother.fileSystem(`write`, [ this.tempDir + "/analytics.json", JSON.stringify(result, null, 2) ]);
    /*
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
      if (z.info.campaign !== null) {
        tempArr.push(z.info.campaign);
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
    */
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log("done");
  }
}


module.exports = GoogleAnalytics;
