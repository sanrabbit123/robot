const NaverAPIs = function (mother = null, back = null, address = null) {
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
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  this.chrome = new GoogleChrome();

  this.dir = process.cwd() + "/apps/naverAPIs";

  this.naverToken = "01000000001df72459c6f186739e0778461122cfee6a0fddea2bb30df35e82c92f20944587";
  this.naverSecret = "AQAAAAAd9yRZxvGGc54HeEYRIs/uQCeezUnYnLfpaLvLRNMcyg==";
  this.naverId = "1608132";
  this.naverUrl = "https://api.naver.com";

  this.naverMapVersion = "v5";
  this.naverMapUrl = "https://map.naver.com";
  this.naverMapSearch = "/p/api/search/allSearch";

  this.naverLandUrl = "https://new.land.naver.com";
  this.naverLandAuthorizationKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2OTQwNTg5MTUsImV4cCI6MTY5NDA2OTcxNX0.I6HBJO77xIkg_4M9nnTmu-kIYbV8y4bjswqpbNC2LfQ";

  this.complexIdKeyword = "land_complex_";

  this.fakeHeaders = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4",
    "Cache-Control": "no-cache",
    "Cookie": "NNB=5XIB6BZTOOQWI; ASID=d2b204fd00000189c9dcbaaa00000062; _ga=GA1.1.937291492.1692025459; naverfinancial_CID=a0caafb6e3ca4fd1acfa82580cb6dd7f; _ga_Q7G1QTKPGB=GS1.1.1692025458.1.0.1692025462.0.0.0; _ga_451MFZ9CFM=GS1.1.1703148673.1.1.1703148684.0.0.0; nx_ssl=2",
    "Expires": "Sat, 01 Jan 3000 00:00:00 GMT",
    "Pragma": "no-cache",
    "Referer": "https://map.naver.com/p/search/%EC%98%A4%EC%82%B0%EC%97%AD%20e-%ED%8E%B8%ED%95%9C%EC%84%B8%EC%83%81%202%EB%8B%A8%EC%A7%80?c=15.00,0,0,0,dh",
    "Sec-Ch-Ua": `"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`,
    "Sec-Ch-Ua-Mobile": `?0`,
    "Sec-Ch-Ua-Platform": `"macOS"`,
    "Sec-Fetch-Dest": `empty`,
    "Sec-Fetch-Mode": `cors`,
    "Sec-Fetch-Site": `same-origin`,
    "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`,
  }

}

NaverAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { naverToken, naverSecret, naverId, naverUrl } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  try {
    const campaignCollection = "dailyCampaign";
    let tempRows;
    let res, res2, url;
    let json;
    let from, to;
    let startDate;
    let num, num2;
    let key;
    let now;
    let thisNowDate;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    url = "/ncc/campaigns";
    thisNowDate = new Date();
    res = await requestSystem(naverUrl + url, {
      recordSize: 200,
      timeRange: JSON.stringify({
        since: dateToString(startDate),
        until: dateToString(now),
      }),
    }, {
      method: "get",
      headers: {
        "X-Timestamp": String(thisNowDate.valueOf()),
        "X-API-KEY": naverToken,
        "X-Customer": naverId,
        "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url)
      }
    });

    for (let i = 0; i < dayNumber; i++) {

      await sleep(1000);

      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      url = "/stats";
      num2 = 0;
      for (let { nccCampaignId, customerId, name, campaignTp } of res.data) {

        await sleep(100);

        try {
          thisNowDate = new Date();
          res2 = await requestSystem(naverUrl + url, {
            id: nccCampaignId,
            fields: JSON.stringify([ "impCnt", "clkCnt", "salesAmt", "ccnt" ]),
            timeRange: JSON.stringify({
              since: dateToString(from),
              until: dateToString(from),
            }),
          }, {
            method: "get",
            headers: {
              "X-Timestamp": String(thisNowDate.valueOf()),
              "X-API-KEY": naverToken,
              "X-Customer": naverId,
              "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url)
            }
          });
          if (!(res2.data.data[0].impCnt === 0 && res2.data.data[0].clkCnt === 0 && res2.data.data[0].salesAmt === 0)) {

            key = dateToString(from).replace(/\-/gi, '') + "_" + nccCampaignId;

            json = {
              camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'n' + String.fromCharCode(97 + num2) + zeroAddition(from.getDate()) + 's',
              key,
              date: { from, to },
              value: {
                charge: Number(res2.data.data[0].salesAmt),
                performance: {
                  impressions: Number(res2.data.data[0].impCnt),
                  clicks: Number(res2.data.data[0].clkCnt),
                },
              },
              information: {
                mother: "naver",
                type: campaignTp,
                id: {
                  account: String(customerId),
                  campaign: nccCampaignId,
                },
                name: name,
              }
            };

            tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
            if (tempRows.length !== 0) {
              await back.mongoDelete(campaignCollection, { key }, { selfMongo });
            }

            await back.mongoCreate(campaignCollection, json, { selfMongo })
            console.log(json);

            num2++
          }
        } catch (e) {
          await errorLog("NaverAPIs.dailyCampaign error : " + "too much requests");
          console.log("there is nothing")
        }
      }
    }

    if (logger !== null) {
      logger.cron("naver daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    await emergencyAlarm("NaverAPIs.dailyCampaign error : " + e.message);
    console.log(e);
  }
}

NaverAPIs.prototype.naverComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { naverToken, naverSecret, naverId, naverUrl } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, fileSystem } = this.mother;
  try {
    const collection = "naverComplex";
    const idKeyword = 'f';
    const naverKeyword = 'n';
    const naverKeyKeyword = "naver";
    let tempRows;
    let res, res2, url;
    let json;
    let from, to;
    let startDate;
    let num, num2;
    let key;
    let now;
    let resultObject;
    let thisNowDate;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    url = "/ncc/campaigns";
    thisNowDate = new Date();
    res = await requestSystem(naverUrl + url, {
      recordSize: 200,
      timeRange: JSON.stringify({
        since: dateToString(startDate),
        until: dateToString(now),
      }),
    }, {
      method: "get",
      headers: {
        "X-Timestamp": String(thisNowDate.valueOf()),
        "X-API-KEY": naverToken,
        "X-Customer": naverId,
        "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url)
      }
    });
    
    for (let i = 0; i < dayNumber; i++) {

      await sleep(1000);
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      key = dateToString(from).replace(/\-/gi, '') + "_" + naverKeyKeyword;
      resultObject = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + naverKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0,
            performance: {
              impressions: 0,
              clicks: 0,
            },
            length: {
              web: 0,
              power: 0,
              contents: 0,
              brand: 0,
              place: 0,
              etc: 0,
            }
          },
          campaign: [],
        },
      }

      url = "/stats";
      num2 = 0;
      for (let { nccCampaignId, customerId, name, campaignTp } of res.data) {
        await sleep(100);
        try {
          thisNowDate = new Date();
          res2 = await requestSystem(naverUrl + url, {
            id: nccCampaignId,
            fields: JSON.stringify([ "impCnt", "clkCnt", "salesAmt", "ccnt", "avgRnk" ]),
            timeRange: JSON.stringify({
              since: dateToString(from),
              until: dateToString(from),
            }),
          }, {
            method: "get",
            headers: {
              "X-Timestamp": String(thisNowDate.valueOf()),
              "X-API-KEY": naverToken,
              "X-Customer": naverId,
              "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url)
            }
          });
          if (!(res2.data.data[0].impCnt === 0 && res2.data.data[0].clkCnt === 0 && res2.data.data[0].salesAmt === 0)) {
            resultObject.advertisement.campaign.push({
              value: {
                charge: Number(res2.data.data[0].salesAmt),
                performance: {
                  impressions: Number(res2.data.data[0].impCnt),
                  clicks: Number(res2.data.data[0].clkCnt),
                  rank: Number(res2.data.data[0].avgRnk),
                },
              },
              information: {
                id: nccCampaignId,
                type: campaignTp,
                name: name,
              }
            });
            num2++
          }
        } catch (e) {
          await errorLog("NaverAPIs.naverComplex error : " + "too much requests");
          console.log("there is nothing")
        }
      }

      resultObject.advertisement.value.charge = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge; }, 0);
      resultObject.advertisement.value.performance.impressions = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions; }, 0);
      resultObject.advertisement.value.performance.clicks = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks; }, 0);

      resultObject.advertisement.value.length.web = resultObject.advertisement.campaign.filter((o) => { return /WEB_SITE/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.power = resultObject.advertisement.campaign.filter((o) => { return /POWER/gi.test(o.information.type) && !/POWER_CONTENTS/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.contents = resultObject.advertisement.campaign.filter((o) => { return /POWER_CONTENTS/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.brand = resultObject.advertisement.campaign.filter((o) => { return /BRAND_SEARCH/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.place = resultObject.advertisement.campaign.filter((o) => { return /PLACE/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.etc = resultObject.advertisement.campaign.length - (resultObject.advertisement.value.length.web + resultObject.advertisement.value.length.power + resultObject.advertisement.value.length.contents + resultObject.advertisement.value.length.brand + resultObject.advertisement.value.length.place);

      // store
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      await back.mongoCreate(collection, resultObject, { selfMongo });
      console.log(resultObject);

    }

    if (logger !== null) {
      logger.cron("naver complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return true;

  } catch (e) {
    emergencyAlarm("NaverAPIs.naverComplex error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
    return false;
  }
}

NaverAPIs.prototype.mapVersionCheck = async function () {
  const instance = this;
  const { emergencyAlarm } = this.mother;
  const { chrome, naverMapUrl, naverMapVersion } = this;
  try {
    const test = await chrome.frontScript(naverMapUrl, async function () {
      return window.location.href;
    })
    const version = test.replace(new RegExp(naverMapUrl, "gi"), "").split("/").find((str) => { return /^v/i.test(str) });
    if (version !== naverMapVersion) {
      await emergencyAlarm("네이버 주소 버전 바뀌었음 작업 필요 : " + JSON.stringify(new Date()));
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

NaverAPIs.prototype.mapSearch = async function (query, justWordingMode = false) {
  const instance = this;
  const { equalJson, requestSystem, emergencyAlarm } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch, fakeHeaders } = this;
  const querystring = require("querystring");
  try {
    const queryStr = querystring.stringify({
      query: query.replace(/아파트/gi, ""),
      searchCoord: "127.05840838974427;37.75015390090829",
      type: "all",
      lang: "ko"
    });
    const targetUrl = naverMapUrl + naverMapSearch + "?" + queryStr;
    const { data: queryResult } = await requestSystem(targetUrl, {}, {
      method: "get",
      headers: {
        ...fakeHeaders
      }
    });
    const { result } = queryResult;
    let targetAddress;
    let resultList;

    if (typeof result !== "object") {
      throw new Error("query fail");
    }

    targetAddress = null;

    if (result.address !== null) {    
      if (result.address.roadAddress !== null) {
        targetAddress = equalJson(JSON.stringify(result.address.roadAddress));
      } else {
        targetAddress = equalJson(JSON.stringify(result.address.jibunsAddress));
      }
      resultList = targetAddress.list;
      resultList = resultList.map((obj) => {
        if (typeof obj.addressElements !== "object" || typeof obj.siteRepName !== "string") {
          throw new Error("invalid address");
        }
        let latitude, longitude;
        latitude = 0;
        longitude = 0;
        if (!Number.isNaN(Number(obj.x))) {
          longitude = Number(obj.x);
        }
        if (!Number.isNaN(Number(obj.y))) {
          latitude = Number(obj.y);
        }
        return {
          name: (obj.addressElements.buildName === null || obj.addressElements.buildName === undefined) ? "" : (obj.addressElements.buildName.trim() === "" ? obj.siteRepName.trim() : obj.addressElements.buildName.trim()),
          address: obj.fullAddress,
          latitude,
          longitude,
          elements: obj.addressElements,
        }
      });
    } else if (result.place !== null) {
      resultList = result.place.list;
      resultList = resultList.map((obj) => {
        let thisComplexId;
        if (obj.poiInfo.land === null) {
          if (obj.theme !== null) {
            if (obj.theme.themeId !== null) {
            thisComplexId = obj.theme.themeId;
            } else {
            thisComplexId = "";
            }
          } else {
            thisComplexId = "";
          }
        } else {
          thisComplexId = obj.poiInfo.land.shapeKey.shapeID;
        }
        return {
          name: obj.name,
          address: obj.roadAddress,
          elements: {
            id: obj.id,
            bcode: '',
            hcode: '',
            complexId: thisComplexId,
          },
        }
      }).filter((obj) => {
        return obj.elements.complexId !== "" && obj.elements.complexId !== null;
      });

    } else {
      return null;
    }

    if (resultList.length === 0) {
      return null;
    }

    if (justWordingMode) {
      if (resultList[0].elements.bcode === '' && resultList[0].elements.hcode === '' && resultList[0].elements.complexId === '' && resultList[0].elements.id !== "") {
        const finalRes = await requestSystem("https://map.naver.com/v5/api/sites/summary/" + resultList[0].elements.id + "?lang=ko")
        if (finalRes.data.theme.isLand) {
          resultList[0].elements.complexId = finalRes.data.theme.extKey;
        }
      }
    }

    return {
      first: resultList[0],
      list: resultList,
    }
  } catch (e) {
    await emergencyAlarm("NaverAPIs.mapSearch error : " + e.message);
    console.log(e);
    return null;
  }
}

NaverAPIs.prototype.complexSearch = async function (query, complexIdMode = false) {
  const instance = this;
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey } = this;
  try {
    query = query.replace(/전라남도 장성군 북이면 백양로 3/gi, "").trim();
    const naverMapResult = await this.mapSearch(query);
    if (naverMapResult === null) {
      throw new Error("no result");
    } else {
      const response = await requestSystem(naverLandUrl + "/api/search", { keyword: naverMapResult.first.name.replace(/아파트/gi, "").replace(/[0-9]단지/gi, '') }, { method: "get" });
      const { bcode, hcode } = naverMapResult.first.elements;
      let target, complexId;
      let resultObj;

      if (/\/complexes\/[0-9]+/g.test(response.data.deepLink)) {
        complexId = response.data.deepLink.split("/")[2].split("?")[0];
      } else {
        if (bcode === "" && hcode === "" && typeof naverMapResult.first.elements.complexId === "string" && naverMapResult.first.elements.complexId !== "") {
          complexId = naverMapResult.first.elements.complexId;
        } else {
          if (!Array.isArray(response.data.complexes)) {
            throw new Error("there is no information");
          }
          if (response.data.complexes.length === 0) {
            throw new Error("there is no information 2");
          }
          target = response.data.complexes.find((obj) => {
            if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
              return true;
            } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
              return true;
            } else {
              return false;
            }
          })

          if (target === undefined && response.data.complexes.length === 1) {
            target = response.data.complexes[0];
          }

          if (target === undefined && response.data.complexes.length > 1) {
            if (typeof naverMapResult.first.longitude === "number") {
              response.data.complexes.sort((a, b) => {
                return (Math.abs(a.longitude - naverMapResult.first.longitude) + Math.abs(a.latitude - naverMapResult.first.latitude)) - (Math.abs(b.longitude - naverMapResult.first.longitude) + Math.abs(b.latitude - naverMapResult.first.latitude));
              })
              target = response.data.complexes.find((obj) => {
                let tempArr = obj.cortarAddress.split(" ");
                let tempArr2 = naverMapResult.first.address.split(" ");
                let boo;
                tempArr = tempArr.map((str) => { return str.slice(0, 2) });
                tempArr2 = tempArr2.map((str) => { return str.slice(0, 2) });
                boo = (tempArr[0] === tempArr2[0]) && (tempArr[1] === tempArr2[1]);
                if (boo) {
                  boo = Math.floor(naverMapResult.first.longitude * 1000) === Math.floor(obj.longitude * 1000) && Math.floor(naverMapResult.first.latitude * 1000) === Math.floor(obj.latitude * 1000);
                }
                return boo;
              });
            }
          }

          if (target === undefined) {
            throw new Error("there is no information 3");
          }
          complexId = target.complexNo;
        }
      }

      if (complexIdMode) {
        return complexId;
      }

      resultObj = await this.complexModeling(complexId, naverMapResult);

      return resultObj;

    }
  } catch (e) {
    try {
      let justAddress;

      if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2).join(" ");
      } else {
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2).join(" ");
      }
      
      const justAddressResult = await this.mapSearch(justAddress);
      if (justAddressResult === null) {
        throw new Error("no result");
      } else {
        const response = await requestSystem(naverLandUrl + "/api/search", { keyword: justAddressResult.first.name }, { method: "get" });
        const { bcode, hcode } = justAddressResult.first.elements;
        let target, complexId;
        let resultObj;
  
        if (bcode === "" && hcode === "" && typeof justAddressResult.first.elements.complexId === "string" && justAddressResult.first.elements.complexId !== "") {
          complexId = justAddressResult.first.elements.complexId;
        } else {
          if (!Array.isArray(response.data.complexes)) {
            throw new Error("there is no information");
          }
          if (response.data.complexes.length === 0) {
            throw new Error("there is no information 2");
          }
          target = response.data.complexes.find((obj) => {
            if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
              return true;
            } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
              return true;
            } else {
              return false;
            }
          })
          if (target === undefined) {
            throw new Error("there is no information 3");
          }
          complexId = target.complexNo;
        }
  
        if (complexIdMode) {
          return complexId;
        }
  
        resultObj = await this.complexModeling(complexId, justAddressResult);
  
        return resultObj;
      }
    } catch (e) {
      try {
        let nameAddress;
        if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2);
        } else {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2);
        }
        nameAddress = nameAddress.filter((str) => { return !/[동호]$/gi.test(str.trim()) });
        nameAddress = nameAddress.join(" ");

        const nameAddressResult = await this.mapSearch(nameAddress);
        if (nameAddressResult === null) {
          throw new Error("no result");
        } else {
          const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
          const { bcode, hcode } = nameAddressResult.first.elements;
          let target, complexId;
          let resultObj;
    
          if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
            complexId = nameAddressResult.first.elements.complexId;
          } else {
            if (!Array.isArray(response.data.complexes)) {
              throw new Error("there is no information");
            }
            if (response.data.complexes.length === 0) {
              throw new Error("there is no information 2");
            }
            target = response.data.complexes.find((obj) => {
              if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                return true;
              } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                return true;
              } else {
                return false;
              }
            })
            if (target === undefined) {
              throw new Error("there is no information 3");
            }
            complexId = target.complexNo;
          }
    
          if (complexIdMode) {
            return complexId;
          }
          resultObj = await this.complexModeling(complexId, nameAddressResult);
          return resultObj;
        }
      } catch (e) {
        try {
          const targetWordsArr = query.split(" ").map((str) => { return str.trim().replace(/[\, \(\)]/gi, '') }).filter((str) => { return !/[0-9]$/gi.test(str) }).filter((str) => { return !/[동로가]$/gi.test(str) }).filter((str) => { return !/[로길]$/gi.test(str) }).filter((str) => { return !/[호]$/gi.test(str) });
          const targetWords = targetWordsArr[targetWordsArr.length - 1];
        
          const nameAddressResult = await this.mapSearch(targetWords, true);
          if (nameAddressResult === null) {
            throw new Error("no result");
          } else {
            const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
            const { bcode, hcode } = nameAddressResult.first.elements;
            let target, complexId;
            let resultObj;
      
            if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
              complexId = nameAddressResult.first.elements.complexId;
            } else {
              if (!Array.isArray(response.data.complexes)) {
                throw new Error("there is no information");
              }
              if (response.data.complexes.length === 0) {
                throw new Error("there is no information 2");
              }
              target = response.data.complexes.find((obj) => {
                if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                  return true;
                } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                  return true;
                } else {
                  return false;
                }
              })
              if (target === undefined) {
                throw new Error("there is no information 3");
              }
              complexId = target.complexNo;
            }
      
            if (complexIdMode) {
              return complexId;
            }
            resultObj = await this.complexModeling(complexId, nameAddressResult);
            return resultObj;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    }
  }
}

NaverAPIs.prototype.complexModeling = async function (complexId, naverMapResult = null) {
  const instance = this;
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition, emergencyAlarm } = this.mother;
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey, complexIdKeyword } = this;
  try {
    let resultObj;
    let complexDetail, complexPyeongDetailList;
    let addressValue;

    ({ complexDetail, complexPyeongDetailList } = (await chrome.frontScript(naverLandUrl + "/complexes/" + complexId, (async function () {
      const res = await fetch("/api/complexes/__complexId__?sameAddressGroup=false", { headers: { "Authorization": "Bearer " + "__authorizationKey__" } })
      const json = await res.json();
      return JSON.stringify(json);
    }).toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '').replace(/__authorizationKey__/gi, naverLandAuthorizationKey).replace(/__complexId__/gi, complexId))));

    if (complexDetail.roadAddress !== undefined) {
      addressValue = (complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress).trim() === "" ? complexDetail.address + " " + complexDetail.detailAddress : complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress;
    } else {
      addressValue = complexDetail.address;
    }
    if (naverMapResult === null) {
      naverMapResult = await this.mapSearch(addressValue);
    }

    resultObj = {};
    resultObj.id = complexIdKeyword + complexDetail.complexNo;
    resultObj.naver = complexId;
    resultObj.name = complexDetail.complexName;
    resultObj.date = new Date();
    resultObj.address = {
      value: addressValue,
      latitude: complexDetail.latitude,
      longitude: complexDetail.longitude,
      zipCode: complexDetail.roadZipCode === undefined ? "" : complexDetail.roadZipCode,
      detail: naverMapResult === null ? {} : naverMapResult.first.elements,
    }
    resultObj.information = {};

    if (complexDetail.useApproveYmd.length > 6) {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4, 6)) - 1, Number(complexDetail.useApproveYmd.slice(6)));
    } else {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4)) - 1, 1);
    }
    resultObj.information.count = {
      household: complexDetail.totalHouseholdCount,
      dong: complexDetail.totalDongCount,
      parking: complexDetail.parkingPossibleCount,
    };
    resultObj.information.floor = {
      low: complexDetail.lowFloor,
      high: complexDetail.highFloor,
    };
    resultObj.information.type = {};
    resultObj.information.type.length = complexPyeongDetailList.length;
    resultObj.information.type.detail = complexPyeongDetailList.map((obj) => {
      return {
        name: obj.pyeongName,
        area: {
          supply: obj.supplyAreaDouble,
          exclusive: Number(obj.exclusiveArea),
          pyeong: Number(obj.supplyPyeong),
          exclusivePyeong: Number(obj.exclusivePyeong),
        },
        count: {
          household: Number.isNaN(Number(obj.householdCountByPyeong)) ? 0 : Number(obj.householdCountByPyeong),
          room: Number.isNaN(Number(obj.roomCnt)) ? 0 : Number(obj.roomCnt),
          bathroom: Number.isNaN(Number(obj.bathroomCnt)) ? 0 : Number(obj.bathroomCnt),
        }
      }
    });

    return resultObj;

  } catch (e) {
    await emergencyAlarm("NaverAPIs.complexModeling error : " + e.message);
    console.log(e);
    return null;
  }
}

module.exports = NaverAPIs;
