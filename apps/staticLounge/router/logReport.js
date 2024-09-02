const LogReport = function (MONGOC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mongo = MONGOC;
  this.host = this.address.officeinfo.host;
  this.realEstate = {
    collection: "realEstate",
    key: "7VuaiHtcKan1rHFT1huoXCufMJYJnmRl0Y5j5E5dyNnrDu2+bNqF2CzcA6M9RZ6n7GTO9xV74nwHxkNv9bkn/Q==",
    keyConst: "realEstate_contract"
  }
}

LogReport.prototype.miningRealEstate = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { host } = this;
  const { collection, key, keyConst } = this.realEstate;
  const { fileSystem, requestSystem, autoComma, dateToString, stringToDate, equalJson, errorLog, messageLog, messageSend, serviceParsing, getDateMatrix, sleep, zeroAddition } = this.mother;
  try {
    const selfMongo = this.mongo;
    const url = "https://api.odcloud.kr/api/RealEstateTradingSvc/v1/getRealEstateTradingCountBuildType";
    const contractUrl = {
      single: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent",
      multiple: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHRent",
      apartment: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent",
      officetell: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent"
    };
    let res;
    let arr;
    let requestObj;
    let index;
    let tong, tong2, tong3;
    let filteredTong;
    let year, month;
    let yearMonthTargets;
    let now;
    let thisDate, nextDate, endDate;
    let tempObj;
    let thisKey;
    let dataArray;
    let dataObject;
    let totalArea;
    let treeMonthAgo;
    let codeMap, codeTong, codeMatrix;
    let tempArr;
    let sum;
    let rows;
    let singleValue;
    let multipleValue;
    let apartmentValue;
    let officetellValue;
    let whereQuery, updateQuery;


    now = new Date();

    treeMonthAgo = new Date();
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);

    year = treeMonthAgo.getFullYear();
    month = treeMonthAgo.getMonth() + 1;

    yearMonthTargets = [];
    while (true) {
      if (((year * 12) + month) >= (((now.getFullYear() * 12) + (now.getMonth() + 1)))) {
        break;
      }
      yearMonthTargets.push(String(year) + zeroAddition(month));
      thisDate = new Date(year, month - 1, 1);
      thisDate.setMonth(thisDate.getMonth() + 1);
      year = thisDate.getFullYear();
      month = thisDate.getMonth() + 1;
    }

    requestObj = {
      returnType: "JSON",
      "cond[RESEARCH_DATE::GTE]": String(treeMonthAgo.getFullYear()) + zeroAddition(treeMonthAgo.getMonth() + 1),
      "cond[DEAL_OBJ::EQ]": "03",
      serviceKey: key
    };

    index = 1;
    tong = [];

    do {

      try {

        console.log("try " + String(index) + " page request");

        res = await requestSystem(url, {
          page: index,
          perPage: 100,
          ...requestObj
        }, {
          method: "get",
          headers: {
            Authorization: key
          }
        });

        if (typeof res.data === "object" && res.data !== null) {
          if (Array.isArray(res.data.data)) {
            if (res.data.data.length > 0) {
              for (let obj of res.data.data) {
                tong.push(equalJson(JSON.stringify(obj)));
              }
            } else {
              break;
            }
          } else {
            break;
          }
        } else {
          throw new Error("");
        }

        index++;

        await sleep(500);

      } catch (e) {
        console.log(e);
        console.log("try again : " + String(index))
      }

    } while (true);

    tong.sort((a, b) => { return Number(a["RESEARCH_DATE"]) - Number(b["RESEARCH_DATE"]) });
    filteredTong = tong.filter((obj) => { return /000$/.test(obj["REGION_CD"]) });

    tong2 = [];
    for (let str of yearMonthTargets) {
      tempObj = {};

      thisDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
      nextDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
      nextDate.setMonth(nextDate.getMonth() + 1);
      endDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      thisKey = keyConst + "_" + dateToString(thisDate).replace(/\-/gi, '') + "_" + dateToString(endDate).replace(/\-/gi, '');

      tempObj.key = thisKey;

      tempObj.date = {
        from: thisDate,
        to: nextDate,
      };

      dataArray = filteredTong.filter((obj) => { return obj["RESEARCH_DATE"] === str });
      if (dataArray.length > 0) {

        totalArea = dataArray.find((obj) => { return obj["REGION_NM"] === "전국" });

        dataObject = {
          value: {
            total: (totalArea["BULD_USE11_CNT"] + totalArea["BULD_USE12_CNT"] + totalArea["BULD_USE13_CNT"] + totalArea["BULD_USE14_CNT"] + totalArea["BULD_USE15_CNT"] + totalArea["BULD_USE21_CNT"]),
            detail: {
              single: (totalArea["BULD_USE11_CNT"] + totalArea["BULD_USE12_CNT"]),
              multiple: (totalArea["BULD_USE13_CNT"] + totalArea["BULD_USE14_CNT"]),
              apartment: totalArea["BULD_USE15_CNT"],
              officetell: totalArea["BULD_USE21_CNT"],
            }
          },
          detail: [],
        };

        dataArray = dataArray.filter((obj) => { return obj["REGION_NM"] !== "전국" });

        for (let obj of dataArray) {
          dataObject.detail.push({
            name: obj["REGION_NM"],
            code: obj["REGION_CD"],
            metropolitan: (obj["REGION_NM"] === "서울" || obj["REGION_NM"] === "경기" || obj["REGION_NM"] === "인천"),
            value: {
              total: (obj["BULD_USE11_CNT"] + obj["BULD_USE12_CNT"] + obj["BULD_USE13_CNT"] + obj["BULD_USE14_CNT"] + obj["BULD_USE15_CNT"] + obj["BULD_USE21_CNT"]),
              detail: {
                single: (obj["BULD_USE11_CNT"] + obj["BULD_USE12_CNT"]),
                multiple: (obj["BULD_USE13_CNT"] + obj["BULD_USE14_CNT"]),
                apartment: obj["BULD_USE15_CNT"],
                officetell: obj["BULD_USE21_CNT"],
              }
            }
          });
        }

        dataObject.detail.sort((a, b) => { return Number(a.code) - Number(b.code) });

        tempObj.data = {};
        tempObj.data.trade = dataObject;
        tong2.push(tempObj);

      }
    }

    for (let json of tong2) {
      rows = await back.mongoRead(collection, { key: json.key }, { selfMongo });
      if (rows.length !== 0) {
        await back.mongoDelete(collection, { key: json.key }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });
    }

    console.log(tong2);


    // contract

    index = 1;
    tong3 = [];

    do {

      try {

        console.log("try " + String(index) + " page request");

        res = await requestSystem(url, {
          page: index,
          perPage: 100,
          returnType: "JSON",
          "cond[RESEARCH_DATE::GTE]": String(treeMonthAgo.getFullYear()) + zeroAddition(treeMonthAgo.getMonth() + 1),
          "cond[DEAL_OBJ::EQ]": "03",
          serviceKey: key
        }, {
          method: "get",
          headers: {
            Authorization: key
          }
        });

        if (typeof res.data === "object" && res.data !== null) {
          if (Array.isArray(res.data.data)) {
            if (res.data.data.length > 0) {
              for (let obj of res.data.data) {
                tong3.push(equalJson(JSON.stringify(obj)));
              }
            } else {
              break;
            }
          } else {
            break;
          }
        } else {
          throw new Error("");
        }

        index++;

        await sleep(100);

      } catch {
        console.log("try again : " + String(index))
      }

    } while (true);

    tong3 = tong3.map((obj) => { return `${obj["REGION_CD"]}_${obj["REGION_NM"]}` });
    tong3 = Array.from(new Set(tong3));
    tong3 = tong3.filter((str) => { return str !== "A1000_전국" });
    tong3.sort((a, b) => { return Number(a.split("_")[0]) - Number(b.split("_")[0]) })

    codeMap = tong3.map((str) => {
      return str.split("_")[0].slice(0, 2) + "000";
    });
    codeMap = Array.from(new Set(codeMap));
    codeMap = codeMap.map((code) => {
      return { code, name: tong3.find((s) => { return (new RegExp("^" + code)).test(s) }).split("_")[1], children: [], count: {}, data: {} }
    })
    codeMap.forEach((obj) => {
      for (let str of tong3) {
        if ((new RegExp("^" + obj.code.slice(0, 2))).test(str)) {
          obj.children.push(str.split("_")[0]);
        }
      }
    });



    for (let i = 0; i < codeMap.length; i++) {

      console.log(codeMap[i].name);

      // single
      codeMap[i].count.single = [];
      for (let code of codeMap[i].children) {
        tempArr = [];
        for (let ymd of yearMonthTargets) {
          res = await requestSystem(contractUrl.single, {
            LAWD_CD: code,
            DEAL_YMD: ymd,
            serviceKey: key
          }, {
            method: "get",
          })
          console.log(codeMap[i].name, "single", code, ymd, res.data.response.body.totalCount);
          tempArr.push(res.data.response.body.totalCount);
        }
        codeMap[i].count.single.push(tempArr);
      }

      codeMap[i].data.single = [];
      for (let j = 0; j < yearMonthTargets.length; j++) {
        sum = 0;
        for (let arr of codeMap[i].count.single) {
          sum += arr[j];
        }
        codeMap[i].data.single.push({
          date: yearMonthTargets[j],
          value: sum,
        })
      }

      // multiple
      codeMap[i].count.multiple = [];
      for (let code of codeMap[i].children) {
        tempArr = [];
        for (let ymd of yearMonthTargets) {
          res = await requestSystem(contractUrl.multiple, {
            LAWD_CD: code,
            DEAL_YMD: ymd,
            serviceKey: key
          }, {
            method: "get",
          })
          console.log(codeMap[i].name, "multiple", code, ymd, res.data.response.body.totalCount);
          tempArr.push(res.data.response.body.totalCount);
        }
        codeMap[i].count.multiple.push(tempArr);
      }

      codeMap[i].data.multiple = [];
      for (let j = 0; j < yearMonthTargets.length; j++) {
        sum = 0;
        for (let arr of codeMap[i].count.multiple) {
          sum += arr[j];
        }
        codeMap[i].data.multiple.push({
          date: yearMonthTargets[j],
          value: sum,
        })
      }

      // apartment
      codeMap[i].count.apartment = [];
      for (let code of codeMap[i].children) {
        tempArr = [];
        for (let ymd of yearMonthTargets) {
          res = await requestSystem(contractUrl.apartment, {
            LAWD_CD: code,
            DEAL_YMD: ymd,
            serviceKey: key
          }, {
            method: "get",
          })
          console.log(codeMap[i].name, "apartment", code, ymd, res.data.response.body.totalCount);
          tempArr.push(res.data.response.body.totalCount);
        }
        codeMap[i].count.apartment.push(tempArr);
      }

      codeMap[i].data.apartment = [];
      for (let j = 0; j < yearMonthTargets.length; j++) {
        sum = 0;
        for (let arr of codeMap[i].count.apartment) {
          sum += arr[j];
        }
        codeMap[i].data.apartment.push({
          date: yearMonthTargets[j],
          value: sum,
        })
      }


      // officetell
      codeMap[i].count.officetell = [];
      for (let code of codeMap[i].children) {
        tempArr = [];
        for (let ymd of yearMonthTargets) {
          res = await requestSystem(contractUrl.officetell, {
            LAWD_CD: code,
            DEAL_YMD: ymd,
            serviceKey: key
          }, {
            method: "get",
          })
          console.log(codeMap[i].name, "officetell", code, ymd, res.data.response.body.totalCount);
          tempArr.push(res.data.response.body.totalCount);
          // await sleep(300);
        }
        codeMap[i].count.officetell.push(tempArr);
      }

      codeMap[i].data.officetell = [];
      for (let j = 0; j < yearMonthTargets.length; j++) {
        sum = 0;
        for (let arr of codeMap[i].count.officetell) {
          sum += arr[j];
        }
        codeMap[i].data.officetell.push({
          date: yearMonthTargets[j],
          value: sum,
        })
      }

      console.log(codeMap[i]);
    }


    // merge

    rows = await back.mongoRead(collection, {}, { selfMongo });

    codeMatrix = {};

    for (let yearMonth of yearMonthTargets) {
      codeTong = [];

      for (let obj of codeMap) {
        singleValue = obj.data.single.find((o) => { return o.date === yearMonth }).value;
        multipleValue = obj.data.multiple.find((o) => { return o.date === yearMonth }).value;
        apartmentValue = obj.data.apartment.find((o) => { return o.date === yearMonth }).value;
        officetellValue = obj.data.officetell.find((o) => { return o.date === yearMonth }).value;

        codeTong.push({
          name: obj.name,
          code: obj.code,
          metropolitan: (obj.name === "서울" || obj.name === "경기" || obj.name === "인천"),
          value: {
            total: singleValue + multipleValue + apartmentValue + officetellValue,
            detail: {
              single: singleValue,
              multiple: multipleValue,
              apartment: apartmentValue,
              officetell: officetellValue,
            }
          }
        });
      }

      singleValue = codeTong.reduce((acc, curr) => { return acc + curr.value.detail.single }, 0);
      multipleValue = codeTong.reduce((acc, curr) => { return acc + curr.value.detail.multiple }, 0);
      apartmentValue = codeTong.reduce((acc, curr) => { return acc + curr.value.detail.apartment }, 0);
      officetellValue = codeTong.reduce((acc, curr) => { return acc + curr.value.detail.officetell }, 0);

      codeMatrix[yearMonth] = {
        value: {
          total: singleValue + multipleValue + apartmentValue + officetellValue,
          detail: {
            single: singleValue,
            multiple: multipleValue,
            apartment: apartmentValue,
            officetell: officetellValue,
          }
        },
        detail: codeTong,
      }

    }

    for (let row of rows) {

      whereQuery = { key: row.key };
      updateQuery = {};

      if (codeMatrix[row.key.split("_")[2].slice(0, -2)] !== undefined) {
        row.data.rent = codeMatrix[row.key.split("_")[2].slice(0, -2)];
        updateQuery["data.rent"] = row.data.rent;

        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        console.log(whereQuery);
      }
    }

    await this.miningAgeTrade();

    await sleep(1000);

    await this.miningTradeType();

    await sleep(2000);

    await this.reportRealEstate();

  } catch (e) {
    console.log(e);
  }
}

LogReport.prototype.miningAgeTrade = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { host } = this;
  const { collection, key, keyConst } = this.realEstate;
  const { fileSystem, requestSystem, autoComma, dateToString, stringToDate, equalJson, errorLog, messageLog, messageSend, serviceParsing, getDateMatrix, sleep } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const selfMongo = this.mongo;
    const url = "https://api.odcloud.kr/api/RealEstateTradingBuyerAge/v1/getRealEstateTradingCountAge";
    let res;
    let now, treeMonthAgo;
    let index, tong;
    let filteredTong;
    let year;
    let month;
    let yearMonthTargets;
    let thisDate;
    let tong2;
    let nextDate;
    let endDate;
    let tempObj;
    let dataArray;
    let dataObject;
    let thisKey;
    let whereQuery, updateQuery;

    now = new Date();

    treeMonthAgo = new Date();
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);

    year = treeMonthAgo.getFullYear();
    month = treeMonthAgo.getMonth() + 1;

    yearMonthTargets = [];
    while (true) {
      if (((year * 12) + month) >= (((now.getFullYear() * 12) + (now.getMonth() + 1)))) {
        break;
      }
      yearMonthTargets.push(String(year) + zeroAddition(month));
      thisDate = new Date(year, month - 1, 1);
      thisDate.setMonth(thisDate.getMonth() + 1);
      year = thisDate.getFullYear();
      month = thisDate.getMonth() + 1;
    }

    requestObj = {
      returnType: "JSON",
      "cond[RESEARCH_DATE::GTE]": String(treeMonthAgo.getFullYear()) + zeroAddition(treeMonthAgo.getMonth() + 1),
      "cond[DEAL_OBJ::EQ]": "07",
      serviceKey: key
    };

    index = 1;
    tong = [];

    do {

      try {

        console.log("try " + String(index) + " page request");

        res = await requestSystem(url, {
          page: index,
          perPage: 100,
          ...requestObj
        }, {
          method: "get",
          headers: {
            Authorization: key
          }
        });

        if (typeof res.data === "object" && res.data !== null) {
          if (Array.isArray(res.data.data)) {
            if (res.data.data.length > 0) {
              for (let obj of res.data.data) {
                tong.push(equalJson(JSON.stringify(obj)));
              }
            } else {
              break;
            }
          } else {
            break;
          }
        } else {
          throw new Error("");
        }

        index++;

        await sleep(500);

      } catch (e) {
        console.log(e);
        console.log("try again : " + String(index))
      }

    } while (true);


    tong.sort((a, b) => { return Number(a["RESEARCH_DATE"]) - Number(b["RESEARCH_DATE"]) });
    filteredTong = tong.filter((obj) => { return /000$/.test(obj["REGION_CD"]) });


    tong2 = [];
    for (let str of yearMonthTargets) {

      dataArray = filteredTong.filter((obj) => { return obj["RESEARCH_DATE"] === str });
      if (dataArray.length > 0) {

        thisDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        nextDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        nextDate.setMonth(nextDate.getMonth() + 1);
        endDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);

        thisKey = keyConst + "_" + dateToString(thisDate).replace(/\-/gi, '') + "_" + dateToString(endDate).replace(/\-/gi, '');

        totalArea = dataArray.find((obj) => { return obj["REGION_NM"] === "전국" });

        dataObject = {
          value: {
            total: totalArea["ALL_CNT"],
            detail: {
              age10: totalArea["AGE01_CNT"],
              age20: totalArea["AGE02_CNT"],
              age30: totalArea["AGE03_CNT"],
              age40: totalArea["AGE04_CNT"],
              age50: totalArea["AGE05_CNT"],
              age60: totalArea["AGE06_CNT"],
              age70: totalArea["AGE07_CNT"],
            }
          },
          detail: [],
        };

        dataArray = dataArray.filter((obj) => { return obj["REGION_NM"] !== "전국" });

        for (let obj of dataArray) {
          dataObject.detail.push({
            name: obj["REGION_NM"],
            code: obj["REGION_CD"],
            metropolitan: (obj["REGION_NM"] === "서울" || obj["REGION_NM"] === "경기" || obj["REGION_NM"] === "인천"),
            value: {
              total: obj["ALL_CNT"],
              detail: {
                age10: obj["AGE01_CNT"],
                age20: obj["AGE02_CNT"],
                age30: obj["AGE03_CNT"],
                age40: obj["AGE04_CNT"],
                age50: obj["AGE05_CNT"],
                age60: obj["AGE06_CNT"],
                age70: obj["AGE07_CNT"],
              }
            }
          });
        }

        dataObject.detail.sort((a, b) => { return Number(a.code) - Number(b.code) });

        whereQuery = { key: thisKey };
        updateQuery = {};
        updateQuery["data.age"] = dataObject;
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

        console.log(whereQuery);

      }
    }

  } catch (e) {
    console.log(e);
  }
}

LogReport.prototype.miningTradeType = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { host } = this;
  const { collection, key, keyConst } = this.realEstate;
  const { fileSystem, requestSystem, autoComma, dateToString, stringToDate, equalJson, errorLog, messageLog, messageSend, serviceParsing, getDateMatrix, sleep } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  try {
    const selfMongo = this.mongo;
    const url = "https://api.odcloud.kr/api/RealEstateTradingSvc/v1/getRealEstateTradingCountReason";
    let res;
    let now, treeMonthAgo;
    let index, tong;
    let filteredTong;
    let year;
    let month;
    let yearMonthTargets;
    let thisDate;
    let tong2;
    let nextDate;
    let endDate;
    let tempObj;
    let dataArray;
    let dataObject;
    let thisKey;
    let whereQuery, updateQuery;

    now = new Date();

    treeMonthAgo = new Date();
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);
    treeMonthAgo.setMonth(treeMonthAgo.getMonth() - 1);

    year = treeMonthAgo.getFullYear();
    month = treeMonthAgo.getMonth() + 1;

    yearMonthTargets = [];
    while (true) {
      if (((year * 12) + month) >= (((now.getFullYear() * 12) + (now.getMonth() + 1)))) {
        break;
      }
      yearMonthTargets.push(String(year) + zeroAddition(month));
      thisDate = new Date(year, month - 1, 1);
      thisDate.setMonth(thisDate.getMonth() + 1);
      year = thisDate.getFullYear();
      month = thisDate.getMonth() + 1;
    }

    requestObj = {
      returnType: "JSON",
      "cond[RESEARCH_DATE::GTE]": String(treeMonthAgo.getFullYear()) + zeroAddition(treeMonthAgo.getMonth() + 1),
      "cond[DEAL_OBJ::EQ]": "03",
      serviceKey: key
    };

    index = 1;
    tong = [];

    do {

      try {

        console.log("try " + String(index) + " page request");

        res = await requestSystem(url, {
          page: index,
          perPage: 100,
          ...requestObj
        }, {
          method: "get",
          headers: {
            Authorization: key
          }
        });

        if (typeof res.data === "object" && res.data !== null) {
          if (Array.isArray(res.data.data)) {
            if (res.data.data.length > 0) {
              for (let obj of res.data.data) {
                tong.push(equalJson(JSON.stringify(obj)));
              }
            } else {
              break;
            }
          } else {
            break;
          }
        } else {
          throw new Error("");
        }

        index++;

        await sleep(500);

      } catch (e) {
        console.log(e);
        console.log("try again : " + String(index))
      }

    } while (true);


    tong.sort((a, b) => { return Number(a["RESEARCH_DATE"]) - Number(b["RESEARCH_DATE"]) });
    filteredTong = tong.filter((obj) => { return /000$/.test(obj["REGION_CD"]) });

    tong2 = [];
    for (let str of yearMonthTargets) {

      dataArray = filteredTong.filter((obj) => { return obj["RESEARCH_DATE"] === str });
      if (dataArray.length > 0) {

        thisDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        nextDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        nextDate.setMonth(nextDate.getMonth() + 1);
        endDate = new Date(Number(str.slice(0, 4)), Number(str.slice(-2)) - 1, 1);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);

        thisKey = keyConst + "_" + dateToString(thisDate).replace(/\-/gi, '') + "_" + dateToString(endDate).replace(/\-/gi, '');

        totalArea = dataArray.find((obj) => { return obj["REGION_NM"] === "전국" });

        dataObject = {
          value: {
            total: totalArea["ALL_CNT"],
            detail: {
              trade: totalArea["DEAL1_CNT"],
              pre: totalArea["DEAL990_CNT"] + totalArea["DEAL991_CNT"] + totalArea["DEAL992_CNT"],
              etc: totalArea["ALL_CNT"] - totalArea["DEAL1_CNT"] - (totalArea["DEAL990_CNT"] + totalArea["DEAL991_CNT"] + totalArea["DEAL992_CNT"]),
            }
          },
          detail: [],
        };

        dataArray = dataArray.filter((obj) => { return obj["REGION_NM"] !== "전국" });

        for (let obj of dataArray) {
          dataObject.detail.push({
            name: obj["REGION_NM"],
            code: obj["REGION_CD"],
            metropolitan: (obj["REGION_NM"] === "서울" || obj["REGION_NM"] === "경기" || obj["REGION_NM"] === "인천"),
            value: {
              total: obj["ALL_CNT"],
              detail: {
                trade: obj["DEAL1_CNT"],
                pre: obj["DEAL990_CNT"] + obj["DEAL991_CNT"] + obj["DEAL992_CNT"],
                etc: obj["ALL_CNT"] - obj["DEAL1_CNT"] - (obj["DEAL990_CNT"] + obj["DEAL991_CNT"] + obj["DEAL992_CNT"]),
              }
            }
          });
        }

        dataObject.detail.sort((a, b) => { return Number(a.code) - Number(b.code) });

        whereQuery = { key: thisKey };
        updateQuery = {};
        updateQuery["data.type"] = dataObject;
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

        console.log(whereQuery, updateQuery);

      }
    }

  } catch (e) {
    console.log(e);
  }
}

LogReport.prototype.reportRealEstate = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { collection, key, keyConst } = this.realEstate;
  const { fileSystem, requestSystem, autoComma, dateToString, stringToDate, equalJson, errorLog, messageLog, messageSend, serviceParsing, getDateMatrix, sleep } = this.mother;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const sheets = new GoogleSheet();
  try {
    const selfMongo = this.mongo;
    const sheetsId = "1wKBOkcUB9eHfI8KgFp-s0IcLFO58B390Z6ghFdOMr_U";

    let rows;
    let tempArr;
    let matrix;
    let metropolitanTargets;
    let metropolitanTotalAge, metropolitanTargetAge;
    let metropolitanAgeTargetRatio;
    let preRatio, tradeRatio;
    let preMetropolitanRatio, tradeMetropolitanRatio;
    let tradeMetropolitan;
    let rentMetropolitan;

    rows = await back.mongoRead(collection, {}, { selfMongo });

    rows.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() })

    matrix = [
      [
        "날짜",
        "전체",
        "거래",
        "매매",
        "분양",
        "전월세",
        "수도권 전체",
        "수도권 거래",
        "수도권 매매",
        "수도권 분양",
        "수도권 전월세",
        "30-50 수도권 전체",
        "30-50 수도권 거래",
        "30-50 수도권 매매",
        "30-50 수도권 분양",
        "30-50 수도권 전월세",
      ]
    ]

    for (let obj of rows) {
      metropolitanTargets = obj.data.age.detail.filter((o) => { return o.metropolitan });
      metropolitanTotalAge = metropolitanTargets.reduce((acc, curr) => { return acc + curr.value.total }, 0);
      metropolitanTargetAge = metropolitanTargets.map((o) => { return o.value.detail }).map((o) => { return o["age30"] + o["age40"] + o["age50"] }).reduce((acc, curr) => { return acc + curr }, 0);
      metropolitanAgeTargetRatio = (metropolitanTargetAge / metropolitanTotalAge);
      tradeRatio = obj.data.type.value.total === 0 ? 0 : obj.data.type.value.detail.trade / obj.data.type.value.total;
      preRatio = obj.data.type.value.total === 0 ? 0 : obj.data.type.value.detail.pre / obj.data.type.value.total;
      tradeMetropolitanRatio = obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0) === 0 ? 0 : obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.detail.trade }, 0) / obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0);
      preMetropolitanRatio = obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0) === 0 ? 0 : obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.detail.pre }, 0) / obj.data.type.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0);
      tradeMetropolitan = obj.data.trade.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0);
      rentMetropolitan = obj.data.rent.detail.filter((o) => { return o.metropolitan }).reduce((acc, curr) => { return acc + curr.value.total }, 0);

      tempArr = [
        obj.key.split("_")[2].slice(0, -2).slice(0, 4) + ". " + obj.key.split("_")[2].slice(0, -2).slice(-2),
        obj.data.trade.value.total + obj.data.rent.value.total,
        obj.data.trade.value.total,
        Math.floor(obj.data.trade.value.total * tradeRatio),
        Math.floor(obj.data.trade.value.total * preRatio),
        obj.data.rent.value.total,
        tradeMetropolitan + rentMetropolitan,
        tradeMetropolitan,
        Math.floor(tradeMetropolitan * tradeMetropolitanRatio),
        Math.floor(tradeMetropolitan * preMetropolitanRatio),
        rentMetropolitan,
        Math.floor((tradeMetropolitan + rentMetropolitan) * metropolitanAgeTargetRatio),
        Math.floor(tradeMetropolitan * metropolitanAgeTargetRatio),
        Math.floor(tradeMetropolitan * tradeMetropolitanRatio * metropolitanAgeTargetRatio),
        Math.floor(tradeMetropolitan * preMetropolitanRatio * metropolitanAgeTargetRatio),
        Math.floor(rentMetropolitan * metropolitanAgeTargetRatio),
      ];
      matrix.push(tempArr);
    }

    await sheets.update_value_inPython(sheetsId, "raw_realestate", matrix);
    console.log(matrix);

  } catch (e) {
    console.log(e);
  }
}

LogReport.prototype.dailyReports = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { host } = this;
  const { mongo, mongoinfo, mongocontentsinfo, fileSystem, requestSystem, autoComma, dateToString, stringToDate, equalJson, errorLog, messageLog, messageSend, serviceParsing, getDateMatrix, zeroAddition } = this.mother;
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  const querystring = require("querystring");
  const selfCoreMongo = new mongo(mongoinfo);
  const selfContentsMongo = new mongo(mongocontentsinfo);
  const selfMongo = this.mongo;
  try {
    const sheets = new GoogleSheet();
    const analytics = new GoogleAnalytics();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // const startDay = new Date();
    // startDay.setMonth(startDay.getMonth() - 4);
    // const dateAgoStandard = new Date();
    // dateAgoStandard.setMonth(dateAgoStandard.getMonth() - 1);
    // const dateAgo = Math.floor((((((new Date()).valueOf() - dateAgoStandard.valueOf()) / 1000) / 60) / 60) / 24);
    const startDay = new Date(2023, 3, 1);
    const sixthTypeArr = [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "number",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "number",
      "string",
    ]
    const applyUpdate = async (sheetsId, newMatrix, monthVersion = false) => {
      const typePatch = (typeArr) => {
        return (arr, index) => {
          let newArr;
          if (index === 0) {
            return arr;
          } else {
            newArr = new Array(arr.length);
            for (let i = 0; i < arr.length; i++) {
              if (typeArr[i] === "string") {
                newArr[i] = arr[i];
              } else if (typeArr[i] === "number") {
                newArr[i] = Number(arr[i].replace(/[^0-9\.\-]/gi, ''));
              } else {
                newArr[i] = arr[i];
              }
            }
            return newArr;
          }
        }
      }
      const returnFinalArr = async (sheetsId, newMatrix, monthVersion = false) => {
        try {
          let pastValues, sliceIndexFirst, lastDateNumbers;
          if (newMatrix.length > 1) {
            pastValues = (await sheets.get_value_inPython(sheetsId, "A1:" + sheets.abc[newMatrix[0].length])).map(typePatch(newMatrix[1].map((o) => { return (typeof o); })));
            sliceIndexFirst = pastValues.findIndex((arr) => {
              return arr[0] === newMatrix[newMatrix.length - 1][0];
            });
            if (sliceIndexFirst === -1) {
              sliceIndexFirst = 1;
              lastDateNumbers = 0;
            } else {
              lastDateNumbers = pastValues.filter((arr) => {
                return arr[0] === newMatrix[newMatrix.length - 1][0];
              }).length;
            }
            return newMatrix.concat(pastValues.slice(sliceIndexFirst + lastDateNumbers));
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      }
      try {
        const finalArr = await returnFinalArr(sheetsId, newMatrix);
        if (finalArr !== null) {
          await sheets.update_value_inPython(sheetsId, "", finalArr);
          return finalArr;
        } else {
          return (await sheets.get_value_inPython(sheetsId, "A1:" + sheets.abc[newMatrix[0].length])).map(typePatch(sixthTypeArr));
        }
      } catch (e) {
        console.log(e);
      }
    }
    let slackMessage;

    await selfCoreMongo.connect();
    await selfContentsMongo.connect();

    // day report
    const marketingBasicMatrix = async (startDate) => {
      try {
        const queryStandardDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const clients = await back.getClientsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });
        const projects = await back.getProjectsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });
        const clientHistories = (await requestSystem("https://" + address.officeinfo.host + ":3002/getHistoryProperty", {
          idArr: clients.toNormal().map((obj) => { return obj.cliid }),
          property: "curation",
          method: "client",
        }, { headers: { "Content-Type": "application/json" } })).data;

        const campaignEntireRows = await back.mongoRead("dailyCampaign", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        const campaignAspirantEntireRows = await back.mongoRead("dailyAspirantCampaign", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        const analyticsEntireRows = await back.mongoRead("dailyAnalytics", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        const clientsEntireRows = await back.mongoRead("dailyClients", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        const metaComplexRows = await back.mongoRead("metaComplex", { "date.from": { $gte: queryStandardDate } }, { selfMongo: selfContentsMongo });
        const googleComplexRows = await back.mongoRead("googleComplex", { "date.from": { $gte: queryStandardDate } }, { selfMongo: selfContentsMongo });

        const facebookCampaignBoo = (str) => {
          return (/instagram/gi.test(str) || /facebook/gi.test(str) || /meta/gi.test(str));
        }
        const naverCampaignBoo = (str) => {
          return (/naver/gi.test(str)) && !(/organic/gi.test(str) || /referral/gi.test(str));
        }
        const googleCampaignBoo = (str) => {
          return (/google/gi.test(str) || /youtube/gi.test(str));
        }
        const kakaoCampaignBoo = (str) => {
          return (/kakao/gi.test(str));
        }

        const getReportsByDate = async (targetDate, campaignEntireRows, campaignAspirantEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects, clientHistories, metaComplexRows, googleComplexRows) => {
          try {
            const keyMaker = (date) => {
              const keyRegMaker = (date) => {
                return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}_`;
              }
              const analyticsIdMaker = (date) => {
                return `n${String(date.getFullYear()).slice(2)}${zeroAddition(date.getMonth() + 1)}_aa${zeroAddition(date.getDate())}s`;
              }
              const clientsIdMaker = (date) => {
                return `y${String(date.getFullYear()).slice(2)}${zeroAddition(date.getMonth() + 1)}_aa${zeroAddition(date.getDate())}s`;
              }
              const metaKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, '') + "_meta"
              }
              const googleKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, '') + "_google"
              }
              const kakaoKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, '') + "_kakao"
              }
              return {
                campaign: keyRegMaker(date),
                analytics: analyticsIdMaker(date),
                clients: clientsIdMaker(date),
                meta: metaKeyMaker(date),
                google: googleKeyMaker(date),
                kakao: kakaoKeyMaker(date),
              }
            };
            const {
              campaign: campaignKey,
              analytics: analyticsKey,
              clients: clientsKey,
              meta: metaKey,
              google: googleKey,
              kakao: kakaoKey,
            } = keyMaker(targetDate);
            const requests = clients.getRequestsTong();
            let campaignRows, analyticsRows, clientsRows;
            let campaignCharge, campaignImpressions, campaignClicks;
            let totalUsers, pageViews;
            let consultingViews;
            let popupOpenEvents;
            let from, to;
            let requestsNumber;
            let contractsNumber;
            let facebookRows;
            let facebookCharge;
            let facebookReach;
            let facebookImpressions;
            let facebookClicks;
            let facebookFromUsers;
            let facebookFromClicks;
            let facebookFromPopups;
            let facebookFromSubmit;
            let naverRows;
            let naverCharge;
            let naverImpressions;
            let naverClicks;
            let naverFromUsers;
            let naverFromClicks;
            let naverFromPopups;
            let naverFromSubmit;
            let firstMatrix;
            let secondMatrix;
            let thirdMatrix;
            let fourthMatrix;
            let facebookCtr;
            let facebookCpc;
            let facebookClicksConverting;
            let facebookSubmitChargeConverting;
            let facebookSubmitConverting;
            let facebookClicksChargeConverting;
            let naverCtr;
            let naverCpc;
            let naverClicksConverting;
            let naverSubmitChargeConverting;
            let naverSubmitConverting;
            let naverClicksChargeConverting;
            let fifthMatrix;
            let fifthMatrixFactorArr;
            let sixthMatrix;
            let googleRows;
            let googleCharge;
            let googleImpressions;
            let googleClicks;
            let googleFromUsers;
            let googleFromClicks;
            let googleFromPopups;
            let googleFromSubmit;
            let googleCtr;
            let googleCpc;
            let googleClicksConverting;
            let googleClicksChargeConverting;
            let googleSubmitConverting;
            let googleSubmitChargeConverting;
            let seventhMatrix;
            let firstNewMatrix;
            let snsMatrix;
            let thisMeta, thisGoogle, thisKakao;
            let kakaoRows;
            let kakaoCharge;
            let kakaoImpressions;
            let kakaoClicks;
            let kakaoFromUsers;
            let kakaoFromClicks;
            let kakaoFromPopups;
            let kakaoFromSubmit;
            let kakaoCtr;
            let kakaoCpc;
            let kakaoClicksConverting;
            let kakaoClicksChargeConverting;
            let kakaoSubmitConverting;
            let kakaoSubmitChargeConverting;
            let kakaoMatrix;
            let campaignAspirantRows;
            let facebookAspirantRows;
            let facebookAspirantCharge;
            let facebookAspirantReach;
            let facebookAspirantImpressions;
            let facebookAspirantClicks;

            from = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            to = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            to.setDate(to.getDate() + 1);

            // get data

            campaignRows = campaignEntireRows.filter((obj) => { return (new RegExp("^" + campaignKey)).test(obj.key); });
            campaignAspirantRows = campaignAspirantEntireRows.filter((obj) => { return (new RegExp("^" + campaignKey)).test(obj.key); });
            analyticsRows = analyticsEntireRows.find((obj) => { return obj.anaid === analyticsKey });
            clientsRows = clientsEntireRows.find((obj) => { return obj.ancid === clientsKey });
            if (analyticsRows === undefined || clientsRows === undefined) {
              console.log(analyticsKey, clientsKey);
              return null;
            }
            thisMeta = metaComplexRows.find((obj) => { return obj.key === metaKey });
            thisGoogle = googleComplexRows.find((obj) => { return obj.key === googleKey });

            // 1 - total funnel

            campaignCharge = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.charge;
            }, 0);
            campaignImpressions = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.performance.impressions;
            }, 0);
            campaignClicks = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.performance.clicks;
            }, 0);

            totalUsers = analyticsRows.data.users.total;
            pageViews = analyticsRows.data.views.total;

            consultingViews = analyticsRows.data.views.detail.pagePath.cases.filter((obj) => {
              return /consulting\.php/gi.test(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            popupOpenEvents = analyticsRows.data.events.detail.eventName.cases.filter((obj) => {
              return /popupOpen/gi.test(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            requestsNumber = requests.filter(({ request }) => {
              const thisValue = request.timeline.toNormal().valueOf();
              return thisValue >= from.valueOf() && thisValue < to.valueOf();
            }).length;

            contractsNumber = projects.toNormal().filter(({ process }) => {
              const thisValue = process.contract.first.date.valueOf();
              return thisValue >= from.valueOf() && thisValue < to.valueOf();
            }).length;

            firstMatrix = [
              [
                dateToString(targetDate),
                campaignCharge,
                campaignImpressions,
                campaignClicks,
                totalUsers,
                pageViews,
                consultingViews,
                popupOpenEvents,
                requestsNumber,
                contractsNumber,
              ]
            ];

            // 1-2 - new front values
            firstNewMatrix = [
              [
                dateToString(targetDate),
                totalUsers,
                pageViews,
                analyticsRows.data.conversion.consultingPage.total,
                analyticsRows.data.conversion.popupOpen.total,
                analyticsRows.data.conversion.consultingPage.total + analyticsRows.data.conversion.popupOpen.total,
                requestsNumber,
                contractsNumber,
                analyticsRows.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0),
                analyticsRows.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                analyticsRows.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                analyticsRows.data.views.total - (analyticsRows.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (analyticsRows.data.views.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                analyticsRows.data.views.detail.source.cases.filter((c) => { return /naver/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                analyticsRows.data.views.detail.source.cases.filter((c) => { return /instagram/gi.test(c.case) || /facebook/gi.test(c.case) || /meta/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                analyticsRows.data.views.detail.source.cases.filter((c) => { return /google/gi.test(c.case) || /youtube/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + analyticsRows.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + analyticsRows.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + analyticsRows.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                (analyticsRows.data.conversion.consultingPage.total + analyticsRows.data.conversion.popupOpen.total) - (analyticsRows.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + analyticsRows.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (analyticsRows.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + analyticsRows.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
              ]
            ];

            // 2 - facebook

            facebookRows = campaignRows.filter((obj) => {
              return /facebook/gi.test(obj.information.mother) || /meta/gi.test(obj.information.mother) || /instagram/gi.test(obj.information.mother);
            });
            if (facebookRows.length > 0) {
              facebookCharge = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              facebookReach = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.reach;
              }, 0);
              facebookImpressions = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              facebookClicks = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              facebookCharge = 0;
              facebookReach = 0;
              facebookImpressions = 0;
              facebookClicks = 0;
            }

            facebookAspirantRows = campaignAspirantRows.filter((obj) => {
              return /facebook/gi.test(obj.information.mother) || /meta/gi.test(obj.information.mother) || /instagram/gi.test(obj.information.mother);
            });
            if (facebookAspirantRows.length > 0) {
              facebookAspirantCharge = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              facebookAspirantReach = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.reach;
              }, 0);
              facebookAspirantImpressions = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              facebookAspirantClicks = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              facebookAspirantCharge = 0;
              facebookAspirantReach = 0;
              facebookAspirantImpressions = 0;
              facebookAspirantClicks = 0;
            }

            facebookFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            facebookFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            facebookFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            facebookFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  return obj.source.mother.some((c) => { return facebookCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            facebookCtr = 0;
            facebookCpc = 0;
            facebookClicksConverting = 0;
            facebookClicksChargeConverting = 0;
            facebookSubmitConverting = 0;
            facebookSubmitChargeConverting = 0;

            if (facebookImpressions !== 0) {
              facebookCtr = facebookClicks / facebookImpressions;
              facebookCtr = Math.floor(facebookCtr * 10000) / 10000;
            }
            if (facebookClicks !== 0) {
              facebookCpc = Math.round(facebookCharge / facebookClicks);
            }
            if (facebookClicks !== 0) {
              facebookClicksConverting = (facebookFromClicks + facebookFromPopups) / facebookClicks;
              facebookClicksConverting = Math.floor(facebookClicksConverting * 10000) / 10000;
            }
            if (facebookFromClicks + facebookFromPopups !== 0) {
              facebookClicksChargeConverting = Math.round(facebookCharge / (facebookFromClicks + facebookFromPopups));
            }
            if (facebookClicks !== 0) {
              facebookSubmitConverting = facebookFromSubmit / facebookClicks;
              facebookSubmitConverting = Math.floor(facebookSubmitConverting * 10000) / 10000;
            }
            if (facebookFromSubmit !== 0) {
              facebookSubmitChargeConverting = Math.round(facebookCharge / facebookFromSubmit);
            }

            secondMatrix = [
              [
                dateToString(targetDate),
                facebookCharge,
                facebookReach,
                facebookImpressions,
                facebookClicks,
                facebookFromUsers,
                facebookFromClicks,
                facebookFromPopups,
                facebookFromSubmit,
                facebookCtr,
                facebookCpc,
                facebookClicksConverting,
                facebookClicksChargeConverting,
                facebookSubmitConverting,
                facebookSubmitChargeConverting,
                facebookAspirantCharge,
                facebookAspirantReach,
                facebookAspirantImpressions,
                facebookAspirantClicks,
              ]
            ];

            // 3 - naver

            naverRows = campaignRows.filter((obj) => {
              return /naver/gi.test(obj.information.mother);
            });
            if (naverRows.length > 0) {
              naverCharge = naverRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              naverImpressions = naverRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              naverClicks = naverRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              naverCharge = 0;
              naverImpressions = 0;
              naverClicks = 0;
            }

            naverFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            naverFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            naverFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            naverFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  return obj.source.mother.some((c) => { return naverCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            naverCtr = 0;
            naverCpc = 0;
            naverClicksConverting = 0;
            naverClicksChargeConverting = 0;
            naverSubmitConverting = 0;
            naverSubmitChargeConverting = 0;

            if (naverImpressions !== 0) {
              naverCtr = naverClicks / naverImpressions;
              naverCtr = Math.floor(naverCtr * 10000) / 10000;
            }
            if (naverClicks !== 0) {
              naverCpc = Math.round(naverCharge / naverClicks);
            }
            if (naverClicks !== 0) {
              naverClicksConverting = (naverFromClicks + naverFromPopups) / naverClicks;
              naverClicksConverting = Math.floor(naverClicksConverting * 10000) / 10000;
            }
            if (naverFromClicks + naverFromPopups !== 0) {
              naverClicksChargeConverting = Math.round(naverCharge / (naverFromClicks + naverFromPopups));
            }
            if (naverClicks !== 0) {
              naverSubmitConverting = naverFromSubmit / naverClicks;
              naverSubmitConverting = Math.floor(naverSubmitConverting * 10000) / 10000;
            }
            if (naverFromSubmit !== 0) {
              naverSubmitChargeConverting = Math.round(naverCharge / naverFromSubmit);
            }

            thirdMatrix = [
              [
                dateToString(targetDate),
                naverCharge,
                naverImpressions,
                naverClicks,
                naverFromUsers,
                naverFromClicks,
                naverFromPopups,
                naverFromSubmit,
                naverCtr,
                naverCpc,
                naverClicksConverting,
                naverClicksChargeConverting,
                naverSubmitConverting,
                naverSubmitChargeConverting,
              ]
            ];

            // 4 - clients

            fourthMatrix = clientsRows.data.detail.map((obj) => {
              return { cliid: obj.cliid, users: obj.users, ids: obj.users.map((user) => { return user === null ? "" : user.id }).join(", ") }
            });
            fourthMatrix = fourthMatrix.map(({ cliid, users, ids }) => {
              const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
              const targetHistory = clientHistories[cliid];
              if (targetHistory === undefined) {
                errorLog("there is no history => " + cliid).catch((err) => { console.log(err); });
              }
              let returnType;
              let source, sourceArr;
              let campaign, campaignArr;
              let device;
              let referrer, referrerArr;
              let service;

              if (users.every((obj) => { return obj === null ? true : /^New/.test(obj.type); })) {
                returnType = "신규";
              } else {
                returnType = "재방문";
              }

              sourceArr = users.map((obj) => { return obj.source.mother }).filter((arr) => { return arr.length > 0 });
              campaignArr = users.map((obj) => { return obj.source.campaign }).filter((arr) => { return arr.length > 0 });

              if (sourceArr.length > 0) {
                source = sourceArr.flat().join(", ");
              } else {
                source = "(direct)";
              }

              if (campaignArr.length > 0) {
                campaign = campaignArr.flat().join(", ");
              } else {
                campaign = "(not set)";
              }

              if (users.length > 0) {
                device = users[0].device.kinds;
              } else {
                device = "(not set)";
              }

              try {
                referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
                referrerArr.sort((a, b) => { return b.length - a.length });
                if (referrerArr.length > 0) {
                  referrer = referrerArr[0];
                } else {
                  referrer = "(not set)";
                }
              } catch (e) {
                console.log(e);
                referrerArr = [];
                referrer = "(not set)";
              }

              try {
                if (targetHistory.service.serid.length > 0) {
                  service = serviceParsing(targetHistory.service.serid[0]);
                } else {
                  service = "알 수 없음";
                }
              } catch (e) {
                console.log(e);
                service = "알 수 없음";
              }

              return [
                dateToString(targetDate),
                cliid,
                targetRequest.name,
                ids,
                dateToString(targetRequest.request.timeline, true),
                returnType,
                source,
                campaign,
                device,
                referrer,
                targetRequest.request.space.address.value,
                targetRequest.request.space.pyeong.value,
                (targetRequest.request.space.resident.living ? "거주중" : "이사"),
                (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)),
                service,
              ];
            });

            // 5 - campaign

            fifthMatrix = [];

            for (let campaignRow of campaignRows) {
              fifthMatrixFactorArr = [];
              fifthMatrixFactorArr.push(dateToString(targetDate));
              fifthMatrixFactorArr.push(campaignRow.information.mother);
              fifthMatrixFactorArr.push(campaignRow.information.type);
              fifthMatrixFactorArr.push(campaignRow.information.id.campaign);
              fifthMatrixFactorArr.push(campaignRow.information.name);
              fifthMatrixFactorArr.push(campaignRow.value.charge);
              fifthMatrixFactorArr.push(campaignRow.value.performance.impressions);
              fifthMatrixFactorArr.push(campaignRow.value.performance.clicks);
              fifthMatrix.push(fifthMatrixFactorArr);
            }


            // 6 - contract

            sixthMatrix = clientsRows.data.detail.map((obj) => { return { cliid: obj.cliid, users: obj.users, ids: obj.users.map((user) => { return user.id }).join(", ") } });
            sixthMatrix = sixthMatrix.map(({ cliid, users, ids }) => {
              const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
              const targetHistory = clientHistories[cliid];
              const targetProjects = projects.toNormal().filter((obj) => { return obj.cliid === cliid });
              let targetProject;
              let returnType;
              let source, sourceArr;
              let campaign, campaignArr;
              let device;
              let referrer, referrerArr;
              let service;
              let query;

              if (users.every((obj) => { return /^New/.test(obj.type); })) {
                returnType = "신규";
              } else {
                returnType = "재방문";
              }

              sourceArr = users.map((obj) => { return obj.source.mother }).filter((arr) => { return arr.length > 0 });
              campaignArr = users.map((obj) => { return obj.source.campaign }).filter((arr) => { return arr.length > 0 });

              if (sourceArr.length > 0) {
                source = sourceArr.flat().join(", ");
              } else {
                source = "(direct)";
              }

              if (campaignArr.length > 0) {
                campaign = campaignArr.flat().join(", ");
              } else {
                campaign = "(not set)";
              }

              if (users.length > 0) {
                device = users[0].device.kinds;
              } else {
                device = "(not set)";
              }


              try {
                referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
                referrerArr.sort((a, b) => { return b.length - a.length });
                if (referrerArr.length > 0) {
                  referrer = referrerArr[0];
                } else {
                  referrer = "(not set)";
                }
              } catch (e) {
                console.log(e);
                referrerArr = [];
                referrer = "(not set)";
              }

              try {
                if (targetHistory.service.serid.length > 0) {
                  service = serviceParsing(targetHistory.service.serid[0]);
                } else {
                  service = "알 수 없음";
                }
              } catch (e) {
                console.log(e);
                service = "알 수 없음";
              }

              targetProject = targetProjects.find((obj) => {
                obj.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
              });
              if (targetProject === undefined && targetProjects.length > 0) {
                targetProject = targetProjects[0];
              }
              if (targetProject === undefined) {
                targetProject = null;
              }

              query = [];
              for (let user of users) {
                for (let { path } of user.history) {
                  query.push(path);
                }
                for (let str of user.source.referrer) {
                  query.push(str);
                }
              }
              query = query.filter((str) => { return /\?/gi.test(str); });
              query = query.map((str) => { return Object.values(querystring.parse(str.split("?")[1])) }).flat();
              query = [ ...new Set(query.filter((str) => { return /[가-힣ㄱ-ㅎㅏ-ㅣ]/gi.test(str) })) ];

              return [
                dateToString(targetDate),
                cliid,
                targetRequest.name,
                ids,
                dateToString(targetRequest.request.timeline, true),
                targetProject === null ? "1800-01-01" : dateToString(targetProject.process.contract.first.date, true),
                returnType,
                source,
                campaign,
                device,
                referrer,
                targetRequest.request.space.address.value,
                targetRequest.request.space.pyeong.value,
                targetRequest.request.budget.value,
                targetRequest.request.family.value,
                (targetRequest.request.space.resident.living ? "거주중" : "이사"),
                (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)),
                (targetRequest.request.space.partial.boo ? "부분 공간" : "전체 공간"),
                targetProject === null ? "알 수 없음" : (targetProject.service.online ? "온라인" : "오프라인"),
                service,
                targetProject === null ? "알 수 없음" : serviceParsing(targetProject.service.serid),
                targetRequest.request.etc.comment,
                targetProject === null ? 0 : targetProject.process.contract.remain.calculation.amount.consumer,
                query.join(", "),
              ];
            }).filter((arr) => {
              const cliid = arr[1];
              const targetProject = projects.toNormal().find((obj) => { return obj.cliid === cliid });
              if (targetProject === undefined || targetProject === null) {
                return false;
              } else {
                return targetProject.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf();
              }
            });


            // 7 - google

            googleRows = campaignRows.filter((obj) => {
              return /google/gi.test(obj.information.mother);
            });
            if (googleRows.length > 0) {
              googleCharge = googleRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              googleImpressions = googleRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              googleClicks = googleRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              googleCharge = 0;
              googleImpressions = 0;
              googleClicks = 0;
            }

            googleFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            googleFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            googleFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            googleFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  return obj.source.mother.some((c) => { return googleCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            googleCtr = 0;
            googleCpc = 0;
            googleClicksConverting = 0;
            googleClicksChargeConverting = 0;
            googleSubmitConverting = 0;
            googleSubmitChargeConverting = 0;

            if (googleImpressions !== 0) {
              googleCtr = googleClicks / googleImpressions;
              googleCtr = Math.floor(googleCtr * 10000) / 10000;
            }
            if (googleClicks !== 0) {
              googleCpc = Math.round(googleCharge / googleClicks);
            }
            if (googleClicks !== 0) {
              googleClicksConverting = (googleFromClicks + googleFromPopups) / googleClicks;
              googleClicksConverting = Math.floor(googleClicksConverting * 10000) / 10000;
            }
            if (googleFromClicks + googleFromPopups !== 0) {
              googleClicksChargeConverting = Math.round(googleCharge / (googleFromClicks + googleFromPopups));
            }
            if (googleClicks !== 0) {
              googleSubmitConverting = googleFromSubmit / googleClicks;
              googleSubmitConverting = Math.floor(googleSubmitConverting * 10000) / 10000;
            }
            if (googleFromSubmit !== 0) {
              googleSubmitChargeConverting = Math.round(googleCharge / googleFromSubmit);
            }

            seventhMatrix = [
              [
                dateToString(targetDate),
                googleCharge,
                googleImpressions,
                googleClicks,
                googleFromUsers,
                googleFromClicks,
                googleFromPopups,
                googleFromSubmit,
                googleCtr,
                googleCpc,
                googleClicksConverting,
                googleClicksChargeConverting,
                googleSubmitConverting,
                googleSubmitChargeConverting,
              ]
            ];


            // 8 - sns

            if (thisMeta !== undefined && thisGoogle !== undefined) {
              snsMatrix = [
                [
                  dateToString(targetDate),
                  thisMeta.instagram.profile.views,
                  thisMeta.instagram.profile.followers,
                  thisMeta.instagram.performance.impressions,
                  thisMeta.instagram.performance.clicks,
                  thisMeta.instagram.performance.likes,
                  thisMeta.instagram.performance.comments,
                  thisMeta.instagram.performance.saves,
                  thisMeta.instagram.performance.shares,
                  thisGoogle.youtube.profile.followers,
                  thisGoogle.youtube.performance.views,
                  thisGoogle.youtube.performance.likes,
                  thisGoogle.youtube.performance.shares,
                ]
              ];
            } else {
              snsMatrix = [
                [
                  dateToString(targetDate),
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                ]
              ];
            }

            // 9 - kakao

            kakaoRows = campaignRows.filter((obj) => {
              return /kakao/gi.test(obj.information.mother);
            });
            if (kakaoRows.length > 0) {
              kakaoCharge = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              kakaoImpressions = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              kakaoClicks = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              kakaoCharge = 0;
              kakaoImpressions = 0;
              kakaoClicks = 0;
            }

            kakaoFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            kakaoFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            kakaoFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            kakaoFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  return obj.source.mother.some((c) => { return kakaoCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            kakaoCtr = 0;
            kakaoCpc = 0;
            kakaoClicksConverting = 0;
            kakaoClicksChargeConverting = 0;
            kakaoSubmitConverting = 0;
            kakaoSubmitChargeConverting = 0;

            if (kakaoImpressions !== 0) {
              kakaoCtr = kakaoClicks / kakaoImpressions;
              kakaoCtr = Math.floor(kakaoCtr * 10000) / 10000;
            }
            if (kakaoClicks !== 0) {
              kakaoCpc = Math.round(kakaoCharge / kakaoClicks);
            }
            if (kakaoClicks !== 0) {
              kakaoClicksConverting = (kakaoFromClicks + kakaoFromPopups) / kakaoClicks;
              kakaoClicksConverting = Math.floor(kakaoClicksConverting * 10000) / 10000;
            }
            if (kakaoFromClicks + kakaoFromPopups !== 0) {
              kakaoClicksChargeConverting = Math.round(kakaoCharge / (kakaoFromClicks + kakaoFromPopups));
            }
            if (kakaoClicks !== 0) {
              kakaoSubmitConverting = kakaoFromSubmit / kakaoClicks;
              kakaoSubmitConverting = Math.floor(kakaoSubmitConverting * 10000) / 10000;
            }
            if (kakaoFromSubmit !== 0) {
              kakaoSubmitChargeConverting = Math.round(kakaoCharge / kakaoFromSubmit);
            }

            kakaoMatrix = [
              [
                dateToString(targetDate),
                kakaoCharge,
                kakaoImpressions,
                kakaoClicks,
                kakaoFromUsers,
                kakaoFromClicks,
                kakaoFromPopups,
                kakaoFromSubmit,
                kakaoCtr,
                kakaoCpc,
                kakaoClicksConverting,
                kakaoClicksChargeConverting,
                kakaoSubmitConverting,
                kakaoSubmitChargeConverting,
              ]
            ];

            return [
              firstMatrix,
              firstNewMatrix,
              secondMatrix,
              thirdMatrix,
              fourthMatrix,
              fifthMatrix,
              sixthMatrix,
              seventhMatrix,
              snsMatrix,
              kakaoMatrix,
            ];
          } catch (e) {
            console.log(e);
            return null;
          }
        }

        let matrix, resMatrix;
        let now;
        let standardDate;
        let dateNumber;
        let numberDate;
        let totalFunnelCopied, totalFunnelWeekMatrix, totalFunnelMonthMatrix;
        let facebookPaidCopied, facebookPaidMonthMatrix, facebookPaidWeekMatrix;
        let naverPaidCopied, naverPaidMonthMatrix, naverPaidWeekMatrix;
        let googlePaidCopied, googlePaidMonthMatrix, googlePaidWeekMatrix;
        let kakaoPaidCopied, kakaoPaidMonthMatrix, kakaoPaidWeekMatrix;
        let tempArr;
        let monthStartDate;
        let monthArr;
        let weekArr;
        let thisIndex;
        let ratioConverting;
        let weekSpread;
        let target;
        let startD, endD;
        let simpleRes;
        let simpleRows;

        matrix = [
          [
            [
              "날짜",
              "총 비용",
              "총 노출",
              "총 클릭",
              "MAU",
              "페이지뷰",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "계약수",
            ]
          ],
          [
            [
              "기준일",
              "유저수",
              "페이지뷰",
              "컨설팅 페이지",
              "팝업 오픈",
              "전환수",
              "문의수",
              "계약수",
              "오가닉 뷰수",
              "광고 뷰수",
              "SNS 뷰수",
              "다이렉트 뷰수",
              "네이버 유입",
              "메타 유입",
              "구글 유입",
              "오가닉 전환수",
              "광고 전환수",
              "SNS 전환수",
              "다이렉트 전환수",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "도달",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
              "디자이너 비용",
              "디자이너 도달",
              "디자이너 노출",
              "디자이너 클릭",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          [
            [
              "날짜",
              "아이디",
              "고객명",
              "GA",
              "문의일",
              "재방문 여부",
              "소스",
              "캠패인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "거주중 여부",
              "입주 예정일",
              "희망 서비스",
            ]
          ],
          [
            [
              "날짜",
              "채널",
              "종류",
              "아이디",
              "이름",
              "비용",
              "노출",
              "클릭",
            ]
          ],
          [
            [
              "날짜",
              "아이디",
              "고객명",
              "GA",
              "문의일",
              "계약일",
              "재방문 여부",
              "소스",
              "캠패인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "예산",
              "가족 구성원",
              "거주중 여부",
              "입주 예정일",
              "부분 여부",
              "온라인 여부",
              "희망 서비스",
              "계약 서비스",
              "요청사항",
              "계약 디자인비",
              "검색어",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          [
            [
              "기준일",
              "인스타 프로필뷰",
              "인스타 팔로워",
              "인스타 노출수",
              "인스타 클릭수",
              "인스타 좋아요수",
              "인스타 댓글수",
              "인스타 저장수",
              "인스타 공유수",
              "유투브 구독자",
              "유투브 노출수",
              "유투브 좋아요수",
              "유투브 공유수",
            ]
          ],
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
        ];

        now = new Date();

        standardDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        for (let i = 0; i < 30; i++) {
          resMatrix = await getReportsByDate(standardDate, campaignEntireRows, campaignAspirantEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects, clientHistories, metaComplexRows, googleComplexRows);
          if (!Array.isArray(resMatrix)) {
            console.log(resMatrix);
            standardDate.setDate(standardDate.getDate() - 1);
            continue;
          }
          for (let i = 0; i < matrix.length; i++) {
            for (let arr of resMatrix[i]) {
              matrix[i].push(arr);
            }
          }
          standardDate.setDate(standardDate.getDate() - 1);
        }

        // weekly, monthy standard

        monthStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

        monthArr = [];
        while (!(monthStartDate.getFullYear() === now.getFullYear() && monthStartDate.getMonth() === now.getMonth())) {
          monthArr.push([
            monthStartDate.getFullYear(),
            monthStartDate.getMonth() + 1
          ]);
          monthStartDate.setMonth(monthStartDate.getMonth() + 1);
        }
        monthArr.push([
          monthStartDate.getFullYear(),
          monthStartDate.getMonth() + 1
        ]);

        weekArr = monthArr.map(([ year, month ]) => {
          return getDateMatrix(year, month - 1);
        }).map(({ matrix }) => {
          return matrix.map((arr) => {
            const weekArr = arr.filter((obj) => { return obj !== null }).map((obj) => {
              return obj.dateObject;
            });
            return { start: dateToString(weekArr[0]), end: dateToString(weekArr[weekArr.length - 1]) };
          });
        }).flat();

        monthArr = monthArr.map(([ year, month ]) => {
          return { year, month };
        })

        monthArr.reverse();
        weekArr.reverse();

        ratioConverting = (mode) => {
          return (arr) => {
            let charge;
            let impressions;
            let clicks;
            let fromUsers;
            let fromClicks;
            let fromPopups;
            let fromSubmit;
            let ctr;
            let cpc;
            let clicksConverting;
            let clicksChargeConverting;
            let submitConverting;
            let submitChargeConverting;

            charge = arr[1];
            if (mode === "facebook") {
              impressions = arr[3];
              clicks = arr[4];
              fromUsers = arr[5];
              fromClicks = arr[6];
              fromPopups = arr[7];
              fromSubmit = arr[8];
            } else {
              impressions = arr[2];
              clicks = arr[3];
              fromUsers = arr[4];
              fromClicks = arr[5];
              fromPopups = arr[6];
              fromSubmit = arr[7];
            }

            ctr = 0;
            cpc = 0;
            clicksConverting = 0;
            clicksChargeConverting = 0;
            submitConverting = 0;
            submitChargeConverting = 0;

            if (impressions !== 0) {
              ctr = clicks / impressions;
              ctr = Math.floor(ctr * 10000) / 10000;
            }
            if (clicks !== 0) {
              cpc = Math.round(charge / clicks);
            }
            if (clicks !== 0) {
              clicksConverting = (fromClicks + fromPopups) / clicks;
              clicksConverting = Math.floor(clicksConverting * 10000) / 10000;
            }
            if (fromClicks + fromPopups !== 0) {
              clicksChargeConverting = Math.round(charge / (fromClicks + fromPopups));
            }
            if (clicks !== 0) {
              submitConverting = fromSubmit / clicks;
              submitConverting = Math.floor(submitConverting * 10000) / 10000;
            }
            if (fromSubmit !== 0) {
              submitChargeConverting = Math.round(charge / fromSubmit);
            }

            if (mode === "facebook") {
              arr[9] = ctr;
              arr[10] = cpc;
              arr[11] = clicksConverting;
              arr[12] = clicksChargeConverting;
              arr[13] = submitConverting;
              arr[14] = submitChargeConverting;
            } else {
              arr[8] = ctr;
              arr[9] = cpc;
              arr[10] = clicksConverting;
              arr[11] = clicksChargeConverting;
              arr[12] = submitConverting;
              arr[13] = submitChargeConverting;
            }
          }
        };

        weekSpread = (arr) => {
          if (arr[0] === "날짜") {
            arr[0] = [ "주 시작일", "주 종료일" ];
          } else {
            arr[0] = arr[0].split(" ~ ");
          }
          arr = arr.flat();
          return arr;
        };

        // total funnel
        thisIndex = 0;
        totalFunnelCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);
        totalFunnelMonthMatrix = equalJson(JSON.stringify(monthArr));
        totalFunnelWeekMatrix = equalJson(JSON.stringify(weekArr));

        for (let obj of totalFunnelMonthMatrix) {
          target = [];
          for (let arr of totalFunnelCopied) {
            if ((new RegExp(String(obj.year).slice(2) + "-" + zeroAddition(obj.month), "gi")).test(arr[0])) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.total;

          }
          obj.matrix = target;
        }
        totalFunnelMonthMatrix = totalFunnelMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
          matrix[0] = String(year) + "년 " + String(month) + "월";
          return matrix;
        });
        totalFunnelMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        for (let obj of totalFunnelWeekMatrix) {
          target = [];
          for (let arr of totalFunnelCopied) {
            if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }

          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.total;

          }
          obj.matrix = target;
        }
        totalFunnelWeekMatrix = totalFunnelWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
          matrix[0] = String(start) + " ~ " + String(end);
          return matrix;
        });
        totalFunnelWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));
        totalFunnelWeekMatrix = totalFunnelWeekMatrix.map(weekSpread);

        // facebook paid
        thisIndex = 2;
        facebookPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);
        facebookPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        facebookPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        for (let obj of facebookPaidMonthMatrix) {
          target = [];
          for (let arr of facebookPaidCopied) {
            if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }

          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[5] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        facebookPaidMonthMatrix = facebookPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
          matrix[0] = String(year) + "년 " + String(month) + "월";
          return matrix;
        });
        facebookPaidMonthMatrix.forEach(ratioConverting("facebook"));
        facebookPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        for (let obj of facebookPaidWeekMatrix) {
          target = [];
          for (let arr of facebookPaidCopied) {
            if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[5] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }

        facebookPaidWeekMatrix = facebookPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
          matrix[0] = String(start) + " ~ " + String(end);
          return matrix;
        });
        facebookPaidWeekMatrix.forEach(ratioConverting("facebook"));
        facebookPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));
        facebookPaidWeekMatrix = facebookPaidWeekMatrix.map(weekSpread);

        // naver paid
        thisIndex = 3;
        naverPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);
        naverPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        naverPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        for (let obj of naverPaidMonthMatrix) {
          target = [];
          for (let arr of naverPaidCopied) {
            if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        naverPaidMonthMatrix = naverPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
          matrix[0] = String(year) + "년 " + String(month) + "월";
          return matrix;
        });
        naverPaidMonthMatrix.forEach(ratioConverting("naver"));
        naverPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        for (let obj of naverPaidWeekMatrix) {
          target = [];
          for (let arr of naverPaidCopied) {
            if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        naverPaidWeekMatrix = naverPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
          matrix[0] = String(start) + " ~ " + String(end);
          return matrix;
        });
        naverPaidWeekMatrix.forEach(ratioConverting("naver"));
        naverPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));
        naverPaidWeekMatrix = naverPaidWeekMatrix.map(weekSpread);

        // google paid
        thisIndex = 7;
        googlePaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);
        googlePaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        googlePaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        for (let obj of googlePaidMonthMatrix) {
          target = [];
          for (let arr of googlePaidCopied) {
            if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        googlePaidMonthMatrix = googlePaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
          matrix[0] = String(year) + "년 " + String(month) + "월";
          return matrix;
        });
        googlePaidMonthMatrix.forEach(ratioConverting("google"));
        googlePaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        for (let obj of googlePaidWeekMatrix) {
          target = [];
          for (let arr of googlePaidCopied) {
            if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        googlePaidWeekMatrix = googlePaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
          matrix[0] = String(start) + " ~ " + String(end);
          return matrix;
        });
        googlePaidWeekMatrix.forEach(ratioConverting("google"));
        googlePaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));
        googlePaidWeekMatrix = googlePaidWeekMatrix.map(weekSpread);

        // kakao paid
        thisIndex = 9;
        kakaoPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);
        kakaoPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        kakaoPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        for (let obj of kakaoPaidMonthMatrix) {
          target = [];
          for (let arr of kakaoPaidCopied) {
            if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        kakaoPaidMonthMatrix = kakaoPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
          matrix[0] = String(year) + "년 " + String(month) + "월";
          return matrix;
        });
        kakaoPaidMonthMatrix.forEach(ratioConverting("kakao"));
        kakaoPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        for (let obj of kakaoPaidWeekMatrix) {
          target = [];
          for (let arr of kakaoPaidCopied) {
            if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
              target.push(equalJson(JSON.stringify(arr)));
            }
          }
          if (target.length !== 0) {
            endD = target[0][0];
            startD = target[target.length - 1][0];
            target = target.reduce((acc, curr) => {
              for (let i = 0; i < curr.length; i++) {
                if (i !== 0) {
                  acc[i] = acc[i] + curr[i];
                }
              }
              return acc;
            }, new Array(target[0].length).fill(0, 0));

            simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });
            if (simpleRows.length === 0) {
              simpleRes = await analytics.simpleMetric(startD, endD);
              await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo });
            } else {
              simpleRes = simpleRows[0];
            }
            target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

          }
          obj.matrix = target;
        }
        kakaoPaidWeekMatrix = kakaoPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
          matrix[0] = String(start) + " ~ " + String(end);
          return matrix;
        });
        kakaoPaidWeekMatrix.forEach(ratioConverting("kakao"));
        kakaoPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));
        kakaoPaidWeekMatrix = kakaoPaidWeekMatrix.map(weekSpread);

        return { matrix, month: { totalFunnelMonthMatrix, facebookPaidMonthMatrix, naverPaidMonthMatrix, googlePaidMonthMatrix, kakaoPaidMonthMatrix }, week: { totalFunnelWeekMatrix, facebookPaidWeekMatrix, naverPaidWeekMatrix, googlePaidWeekMatrix, kakaoPaidWeekMatrix } };

      } catch (e) {
        console.log(e);
        return null;
      }
    }

    // sub analytics report
    const subAnalyticsMatrix = async (startDate) => {
      try {
        const queryStandardDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        queryStandardDate.setMonth(queryStandardDate.getMonth() - 3);

        const queryEntireRows = await back.mongoRead("queryAnalytics", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        let middleMatrix;
        let lengthMax;
        let matrix;
        let tempArr;

        queryEntireRows.sort((a, b) => {
          return b.date.from.valueOf() - a.date.from.valueOf();
        });

        middleMatrix = queryEntireRows.map((obj) => {
          return [
            dateToString(obj.date.from),
            ...obj.data.detail
          ]
        });

        lengthMax = middleMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0)

        matrix = [];

        for (let i = 0; i < lengthMax; i++) {
          tempArr = [];
          if (i === 0) {
            for (let arr of middleMatrix) {
              tempArr.push(arr[i]);
              tempArr.push('');
            }
          } else {
            for (let arr of middleMatrix) {
              if (arr[i] !== undefined) {
                tempArr.push(arr[i].case);
                tempArr.push(arr[i].value);
              } else {
                tempArr.push('');
                tempArr.push('');
              }
            }
          }
          matrix.push(tempArr);
        }

        return [ matrix ];

      } catch (e) {
        console.log(e);
      }
    }

    // contract clients report
    const tenthParsingMatrix = async (sixth) => {
      try {
        const tenth = equalJson(JSON.stringify(sixth)).slice(1);
        const length = tenth.length;
        let regionSet;
        let pyeongSet;
        let serviceSet;
        let familySet;
        let livingSet;
        let sourceSet;
        let budgetSet;
        let feeSet;
        let adSet;
        let ratioFunction, sortFunction, mapFunction;
        let maxLength;
        let mapArr;

        ratioFunction = (obj, index) => {
          obj.ratio = length === 0 ? 0 : obj.value / length
        };
        sortFunction = (a, b) => { return b.ratio - a.ratio };
        mapFunction = (obj) => {
          return [ obj.case, obj.value, obj.ratio ];
        };

        regionSet = [
          {
            case: "서울",
            value: 0,
          },
          {
            case: "경기",
            value: 0,
          },
          {
            case: "충청",
            value: 0,
          },
          {
            case: "강원",
            value: 0,
          },
          {
            case: "경상",
            value: 0,
          },
          {
            case: "전라",
            value: 0,
          },
          {
            case: "제주",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          },
        ];

        pyeongSet = [
          {
            case: "10평 미만",
            value: 0,
          },
          {
            case: "10평대",
            value: 0,
          },
          {
            case: "20평대",
            value: 0,
          },
          {
            case: "30평대",
            value: 0,
          },
          {
            case: "40평대",
            value: 0,
          },
          {
            case: "50평대",
            value: 0,
          },
          {
            case: "60평 이상",
            value: 0,
          }
        ];

        serviceSet = [
          {
            case: "홈퍼니싱",
            value: 0,
          },
          {
            case: "홈스타일링",
            value: 0,
          },
          {
            case: "토탈 스타일링",
            value: 0,
          },
          {
            case: "엑스트라",
            value: 0,
          },
        ];

        familySet = [
          {
            case: "1인 가구",
            value: 0,
          },
          {
            case: "부부",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          },
        ];

        livingSet = [
          {
            case: "이사",
            value: 0,
          },
          {
            case: "거주중",
            value: 0,
          },
        ];

        sourceSet = [
          {
            case: "메타",
            value: 0,
          },
          {
            case: "네이버",
            value: 0,
          },
          {
            case: "구글",
            value: 0,
          },
          {
            case: "유튜브",
            value: 0,
          },
          {
            case: "카카오",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          }
        ];

        budgetSet = [
          {
            case: "500만원 이하",
            value: 0,
          },
          {
            case: "1,000만원대",
            value: 0,
          },
          {
            case: "2,000만원대",
            value: 0,
          },
          {
            case: "3,000만원대",
            value: 0,
          },
          {
            case: "4,000만원대",
            value: 0,
          },
          {
            case: "5,000만원대",
            value: 0,
          },
          {
            case: "6,000만원대",
            value: 0,
          },
          {
            case: "7,000만원대",
            value: 0,
          },
          {
            case: "8,000만원대",
            value: 0,
          },
          {
            case: "9,000만원대",
            value: 0,
          },
          {
            case: "1억원대",
            value: 0,
          },
        ];

        feeSet = [
          {
            case: "100만원 이하",
            value: 0,
          },
          {
            case: "100만원대",
            value: 0,
          },
          {
            case: "200만원대",
            value: 0,
          },
          {
            case: "300만원대",
            value: 0,
          },
          {
            case: "400만원대",
            value: 0,
          },
          {
            case: "500만원대",
            value: 0,
          },
          {
            case: "600만원 이상",
            value: 0,
          }
        ];

        adSet = [
          {
            case: "광고 유입",
            value: 0,
          },
          {
            case: "비광고",
            value: 0,
          },
        ];

        for (let [ date, cliid, name, ids, timeline, contract, type, source, campaign, device, referer, address, pyeong, budget, family, living, expected, total, onoff, service0, service1, comment, fee, query ] of tenth) {

          if (/^서울/gi.test(address) || /^강서/gi.test(address) || /^양천/gi.test(address) || /^구로/gi.test(address) || /^영등포/gi.test(address) || /^금천/gi.test(address)|| /^동작/gi.test(address)|| /^관악/gi.test(address)|| /^서초/gi.test(address)|| /^강남/gi.test(address)|| /^송파/gi.test(address)|| /^강동/gi.test(address)|| /^광진/gi.test(address)|| /^동대문/gi.test(address)|| /^성동/gi.test(address)|| /^중랑/gi.test(address)|| /^성북/gi.test(address)|| /^강북/gi.test(address)|| /^도봉/gi.test(address)|| /^노원/gi.test(address)|| /^종로/gi.test(address)|| /^서대문/gi.test(address)|| /^마포/gi.test(address)|| /^용산/gi.test(address)|| /^은평/gi.test(address)) {
            regionSet[0].value = regionSet[0].value + 1;
          } else if (/^경기/gi.test(address) || /^인천/gi.test(address) || /^수원/gi.test(address) || /^부평/gi.test(address) || /^의정부/gi.test(address) || /^부천/gi.test(address) || /^과천/gi.test(address) || /^고양/gi.test(address) || /^시흥/gi.test(address) || /^성남/gi.test(address) || /^파주/gi.test(address) || /^김포/gi.test(address) || /^양주/gi.test(address) || /^남양주/gi.test(address) || /^포천/gi.test(address) || /^안양/gi.test(address) || /^의왕/gi.test(address) || /^광명/gi.test(address) || /^동두천/gi.test(address) || /^화성/gi.test(address) || /^오산/gi.test(address) || /^안성/gi.test(address) || /^평택/gi.test(address) || /^이천/gi.test(address) || /^여주/gi.test(address) || /^안산/gi.test(address) || /^가평/gi.test(address) || /^양평/gi.test(address)) {
            regionSet[1].value = regionSet[1].value + 1;
          } else if (/^충청/gi.test(address) || /^충북/gi.test(address) || /^충남/gi.test(address) || /^세종/gi.test(address) || /^대전/gi.test(address) || /^충주/gi.test(address)) {
            regionSet[2].value = regionSet[2].value + 1;
          } else if (/^강원/gi.test(address) || /^원주/gi.test(address) || /^강릉/gi.test(address) || /^속초/gi.test(address)) {
            regionSet[3].value = regionSet[3].value + 1;
          } else if (/^경상/gi.test(address) || /^경북/gi.test(address) || /^경남/gi.test(address) || /^부산/gi.test(address) || /^울산/gi.test(address) || /^대구/gi.test(address)) {
            regionSet[4].value = regionSet[4].value + 1;
          } else if (/^전라/gi.test(address) || /^전북/gi.test(address) || /^전남/gi.test(address) || /^광주/gi.test(address) || /^전주/gi.test(address)) {
            regionSet[5].value = regionSet[5].value + 1;
          } else if (/^제주/gi.test(address)) {
            regionSet[6].value = regionSet[6].value + 1;
          } else {
            regionSet[7].value = regionSet[7].value + 1;
          }

          if (pyeong < 10) {
            pyeongSet[0].value = pyeongSet[0].value + 1;
          } else if (pyeong >= 10 && pyeong < 20) {
            pyeongSet[1].value = pyeongSet[1].value + 1;
          } else if (pyeong >= 20 && pyeong < 30) {
            pyeongSet[2].value = pyeongSet[2].value + 1;
          } else if (pyeong >= 30 && pyeong < 40) {
            pyeongSet[3].value = pyeongSet[3].value + 1;
          } else if (pyeong >= 40 && pyeong < 50) {
            pyeongSet[4].value = pyeongSet[4].value + 1;
          } else if (pyeong >= 50 && pyeong < 60) {
            pyeongSet[5].value = pyeongSet[5].value + 1;
          } else {
            pyeongSet[6].value = pyeongSet[6].value + 1;
          }

          if (/1인/gi.test(family)) {
            familySet[0].value = familySet[0].value + 1;
          } else if (/부부/gi.test(family)) {
            familySet[1].value = familySet[1].value + 1;
          } else {
            familySet[2].value = familySet[2].value + 1;
          }

          if (living === "이사") {
            livingSet[0].value = livingSet[0].value + 1;
          } else {
            livingSet[1].value = livingSet[1].value + 1;
          }

          if (/퍼니싱/gi.test(service1)) {
            serviceSet[0].value = serviceSet[0].value + 1;
          } else if (/홈스타일링/gi.test(service1)) {
            serviceSet[1].value = serviceSet[1].value + 1;
          } else if (/토탈/gi.test(service1)) {
            serviceSet[2].value = serviceSet[2].value + 1;
          } else {
            serviceSet[3].value = serviceSet[3].value + 1;
          }

          if (fee < 1000000) {
            feeSet[0].value = feeSet[0].value + 1;
          } else if (fee >= 1000000 && fee < 2000000) {
            feeSet[1].value = feeSet[1].value + 1;
          } else if (fee >= 2000000 && fee < 3000000) {
            feeSet[2].value = feeSet[2].value + 1;
          } else if (fee >= 3000000 && fee < 4000000) {
            feeSet[3].value = feeSet[3].value + 1;
          } else if (fee >= 4000000 && fee < 5000000) {
            feeSet[4].value = feeSet[4].value + 1;
          } else if (fee >= 5000000 && fee < 6000000) {
            feeSet[5].value = feeSet[5].value + 1;
          } else {
            feeSet[6].value = feeSet[6].value + 1;
          }

          budget = Number(budget.replace(/[^0-9]/gi, '')) * 10000;

          if (budget < 10000000) {
            budgetSet[0].value = budgetSet[0].value + 1;
          } else if (budget >= 10000000 && budget < 20000000) {
            budgetSet[1].value = budgetSet[1].value + 1;
          } else if (budget >= 20000000 && budget < 30000000) {
            budgetSet[2].value = budgetSet[2].value + 1;
          } else if (budget >= 30000000 && budget < 40000000) {
            budgetSet[3].value = budgetSet[3].value + 1;
          } else if (budget >= 40000000 && budget < 50000000) {
            budgetSet[4].value = budgetSet[4].value + 1;
          } else if (budget >= 50000000 && budget < 60000000) {
            budgetSet[5].value = budgetSet[5].value + 1;
          } else if (budget >= 60000000 && budget < 70000000) {
            budgetSet[6].value = budgetSet[6].value + 1;
          } else if (budget >= 70000000 && budget < 80000000) {
            budgetSet[7].value = budgetSet[7].value + 1;
          } else if (budget >= 80000000 && budget < 90000000) {
            budgetSet[8].value = budgetSet[8].value + 1;
          } else if (budget >= 90000000 && budget < 100000000) {
            budgetSet[9].value = budgetSet[9].value + 1;
          } else {
            budgetSet[10].value = budgetSet[10].value + 1;
          }

          if (/facebook/gi.test(source) || /instagram/gi.test(source) || /meta/gi.test(source)) {
            sourceSet[0].value = sourceSet[0].value + 1;
          } else if (/naver/gi.test(source)) {
            sourceSet[1].value = sourceSet[1].value + 1;
          } else if (/google/gi.test(source)) {
            sourceSet[2].value = sourceSet[2].value + 1;
          } else if (/youtube/gi.test(source)) {
            sourceSet[3].value = sourceSet[3].value + 1;
          } else if (/daum/gi.test(source) || /kakao/gi.test(source)) {
            sourceSet[4].value = sourceSet[4].value + 1;
          } else {
            sourceSet[5].value = sourceSet[5].value + 1;
          }

          if (campaign.trim() === "" || /not set/gi.test(campaign.trim())) {
            adSet[1].value = adSet[1].value + 1;
          } else {
            adSet[0].value = adSet[0].value + 1;
          }

        }

        regionSet.forEach(ratioFunction);
        regionSet.sort(sortFunction);

        pyeongSet.forEach(ratioFunction);
        pyeongSet.sort(sortFunction);

        serviceSet.forEach(ratioFunction);
        serviceSet.sort(sortFunction);

        familySet.forEach(ratioFunction);
        familySet.sort(sortFunction);

        livingSet.forEach(ratioFunction);
        livingSet.sort(sortFunction);

        sourceSet.forEach(ratioFunction);
        sourceSet.sort(sortFunction);

        budgetSet.forEach(ratioFunction);
        budgetSet.sort(sortFunction);

        feeSet.forEach(ratioFunction);
        feeSet.sort(sortFunction);

        adSet.forEach(ratioFunction);
        adSet.sort(sortFunction);


        mapArr = [
          regionSet.map(mapFunction),
          pyeongSet.map(mapFunction),
          serviceSet.map(mapFunction),
          familySet.map(mapFunction),
          livingSet.map(mapFunction),
          sourceSet.map(mapFunction),
          budgetSet.map(mapFunction),
          feeSet.map(mapFunction),
          adSet.map(mapFunction),
        ];

        maxLength = mapArr.reduce((acc, curr) => { return acc >= curr.length ? acc : curr.length }, 0);
        mapArr = mapArr.map((arr) => {
          let thisLength;
          thisLength = arr.length;
          for (let i = 0; i < maxLength - thisLength; i++) {
            arr.push([ "", "", "" ]);
          }
          return arr;
        })

        for (let z = 1; z < mapArr.length; z++) {
          for (let i = 0; i < mapArr[0].length; i++) {
            mapArr[0][i].push('');
            mapArr[0][i].push(mapArr[z][i][0]);
            mapArr[0][i].push(mapArr[z][i][1]);
            mapArr[0][i].push(mapArr[z][i][2]);
          }
        }

        mapArr = mapArr[0];
        mapArr.unshift([
          "지역",
          "",
          "",
          "",
          "평",
          "",
          "",
          "",
          "서비스",
          "",
          "",
          "",
          "가족 구성",
          "",
          "",
          "",
          "이사 여부",
          "",
          "",
          "",
          "소스",
          "",
          "",
          "",
          "예산",
          "",
          "",
          "",
          "디자인비",
          "",
          "",
          "",
          "광고 여부",
          "",
          "",
          "",
        ])

        return mapArr;

      } catch (e) {
        console.log(e);
      }
    }

    const zeroSheetsId = "1tS-lRBb3yXIC9N-1jgQH--rbigqujGcLRRXEXWCG7xk";
    const firstSheetsId = "1QaJfS2EkrPxek3l1OFBFBoJrOjDh7BiEXFO5tx4rJP4";
    const secondSheetsId = "14xqEKuEhIlTEQL44RlgwPGgdO3TiI8SidNCb7k1y4PU";
    const thirdSheetsId = "1X3PeZPj06C6hTsVJWQKCQ8WCF05NhmqUWd6Huyhnd0k";
    const fourthSheetsId = "13wUb5uTXktWHRTAezsKKMXO0b7P6slsSQWboeItsYQU";
    const fifthSheetsId = "1QFr_a5cnexPyvcKAsIDvcq7SCwHKLAbiQcQGkcoeuAo";
    const sixthSheetsId = "1d64IEb9S4MIfb0rTQW1ojWI9Tq6utyzdE6MEsEbVvcs";
    const seventhSheetsId = "1XvZGAalipoQFzwWM178_c8Ect6n2hRf_MV5OfSXGfl8";
    const snsSheetsId = "1Rz_El0Dtu64876EsJ9od06jsQftiAs1Mfqj3NaReFrw";
    const eighthSheetsId = "1TPSsXlaNz8ZssqImPZUYTZvnsqRuInSQXaAoFJ-CttU";
    const ninthSheetsId = "1ocaqxxtKIXdyEKV9SodBQW-IzoCWUe8L_dTjKOLGMe8";
    const tenthSheetsId = "18-Kpl062mlA9fyTXgP_RWZvmhCZsg1sMi0Y0cx4qaS0";
    const firstNewSheetsId = "1zIA6AdkY2uZO4Lg3qykbiionnbYOBjVzQut5Oir_tEs";
    const kakaoSheetsId = "1pLZwub_dSBDmOZig6MPPyiTKLNKe6MQATXEH6l5tet4";

    const monthSheets = {
      totalFunnelMonthMatrix: "1jmbTM-pKZ6hwWtQyEsQPuKsT2t3YtVsEo6XuU6kqENU",
      facebookPaidMonthMatrix: "1EVBjmpFlqmitvQkkWM6K2NWH7h8I-r0vxe7Dub2HLZM",
      naverPaidMonthMatrix: "1xkcwOZRAwsXC6JGeSio-Ubm--dr4ddxgG6gdGZb52xc",
      googlePaidMonthMatrix: "1w_SCBYBlocVsD5QQNR-1l3i-mYOODbSFxmJnL75inag",
      kakaoPaidMonthMatrix: "1cjTz6i5G1hHXZZXjXGv-ZeL4O96rRL7D5MmWbReg0DI",
    };

    const weekSheets = {
      totalFunnelWeekMatrix: "19ed2yeKFQvYIHOHSQ14BK8vAj-H6_jrCviQWfLzOTzw",
      facebookPaidWeekMatrix: "1-A0v7Ox22l5wcS2H-gYkq200BZrAakKBMa3muwm8eKg",
      naverPaidWeekMatrix: "1q3NFIYnbFCuQUgJRWvgchFOdAeIQxaWmkbAPIuqY1AU",
      googlePaidWeekMatrix: "15Rd2JbqCcm9LjIIMuPVm0U13cDJC_uYxyPdFRjf4b2Y",
      kakaoPaidWeekMatrix: "1_HiuwxXmyWtoKKTt_cWvLfss8H_tQcebbY7qwWwVJKg",
    };

    const {
      matrix: [ first, firstNew, second, third, fourth, fifth, sixth, seventh, sns, kakao ],
      month: { totalFunnelMonthMatrix, facebookPaidMonthMatrix, naverPaidMonthMatrix, googlePaidMonthMatrix, kakaoPaidMonthMatrix },
      week: { totalFunnelWeekMatrix, facebookPaidWeekMatrix, naverPaidWeekMatrix, googlePaidWeekMatrix, kakaoPaidWeekMatrix }
    } = await marketingBasicMatrix(startDay);

    const newFirst = await applyUpdate(firstSheetsId, first);
    const newSecond = await applyUpdate(secondSheetsId, second);
    const newThird = await applyUpdate(thirdSheetsId, third);
    const newFourth = await applyUpdate(fourthSheetsId, fourth);
    const newFifth = await applyUpdate(fifthSheetsId, fifth);
    const newSixth = await applyUpdate(sixthSheetsId, sixth);
    const newSeventh = await applyUpdate(seventhSheetsId, seventh);
    const newSns = await applyUpdate(snsSheetsId, sns);
    const newKakao = await applyUpdate(kakaoSheetsId, kakao);

    await applyUpdate(firstNewSheetsId, firstNew);

    const [ ninth ] = await subAnalyticsMatrix(startDay);
    const tenth = await tenthParsingMatrix(newSixth);

    await sheets.update_value_inPython(ninthSheetsId, "", ninth);
    await sheets.update_value_inPython(tenthSheetsId, "", tenth);

    await applyUpdate(monthSheets.totalFunnelMonthMatrix, totalFunnelMonthMatrix);
    await applyUpdate(monthSheets.facebookPaidMonthMatrix, facebookPaidMonthMatrix);
    await applyUpdate(monthSheets.naverPaidMonthMatrix, naverPaidMonthMatrix);
    await applyUpdate(monthSheets.googlePaidMonthMatrix, googlePaidMonthMatrix);
    await applyUpdate(monthSheets.kakaoPaidMonthMatrix, kakaoPaidMonthMatrix);

    await applyUpdate(weekSheets.totalFunnelWeekMatrix, totalFunnelWeekMatrix);
    await applyUpdate(weekSheets.facebookPaidWeekMatrix, facebookPaidWeekMatrix);
    await applyUpdate(weekSheets.naverPaidWeekMatrix, naverPaidWeekMatrix);
    await applyUpdate(weekSheets.googlePaidWeekMatrix, googlePaidWeekMatrix);
    await applyUpdate(weekSheets.kakaoPaidWeekMatrix, kakaoPaidWeekMatrix);

    console.log("sheets update all done");

    await selfCoreMongo.close();
    await selfContentsMongo.close();

    slackMessage = '';
    slackMessage += dateToString(today) + " MPR 시트를 업데이트 하였습니다!";
    slackMessage += "\n";
    slackMessage += "https://docs.google.com/spreadsheets/d/" + zeroSheetsId + "/edit?usp=sharing";

    await messageSend({
      text: slackMessage,
      channel: "#500_marketing",
    });

    return true;

  } catch (e) {
    console.log(e);
    await selfCoreMongo.close();
    await selfContentsMongo.close();
    return false;
  }
}

LogReport.prototype.unknownCampaign = async function (year, month, amount) {
  const instance = this;
  const back = this.back;
  const { dateToString, zeroAddition } = this.mother;
  try {
    const campaignCollection = "dailyCampaign";
    const selfMongo = instance.mongo;
    let dummy;
    let standardDate;
    let unknownKeyword;
    let idKeyword;
    let standardTomorrow;
    let tempRows;
    let key;

    standardDate = new Date(year, month - 1, 1);
    standardTomorrow = new Date(year, month - 1, 1);
    standardTomorrow.setDate(standardTomorrow.getDate() + 1);
    unknownKeyword = "unknown";
    idKeyword = "g";
    key = dateToString(standardDate).replace(/\-/gi, '') + "_" + unknownKeyword;

    dummy = {
      camid: idKeyword + String(year).slice(2) + zeroAddition(month) + "_un" + zeroAddition(1) + "s",
      key: key,
      date: {
        from: standardDate,
        to: standardTomorrow,
      },
      value: {
        charge: amount,
        performance: {
          impressions: 0,
          clicks: 0,
        }
      },
      information: {
        mother: unknownKeyword,
        type: unknownKeyword,
        id: {
          account: unknownKeyword,
          campaign: unknownKeyword,
        },
        name: unknownKeyword
      }
    };

    tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
    if (tempRows.length !== 0) {
      await back.mongoDelete(campaignCollection, { key }, { selfMongo });
    }
    await back.mongoCreate(campaignCollection, dummy, { selfMongo })

    console.log(dummy);

  } catch (e) {
    console.log(e);
  }
}

module.exports = LogReport;
