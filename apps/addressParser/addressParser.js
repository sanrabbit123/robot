class Distance {
  constructor(m, s, from, to) {
    if (typeof m !== "number" || typeof s !== "number" || from === undefined || to === undefined) {
      throw new Error("invaild input");
    }
    this.meters = m;
    this.seconds = s;
    this.from = from;
    this.to = to;
  }
  toNormal() {
    let obj = {};
    obj.meters = this.meters;
    obj.seconds = this.seconds;
    obj.from = this.from;
    obj.to = this.to;
    return obj;
  }
  get m() {
    return this.meters;
  }
  get s() {
    return this.seconds;
  }
  get meter() {
    return this.meters;
  }
  get metre() {
    return this.meters;
  }
  get second() {
    return this.seconds;
  }
}

const AddressParser = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/addressParser";
  this.jsonDir = this.dir + "/json";
  this.sampleDir = this.jsonDir + "/samples";
  this.samples = {
    client: this.sampleDir + "/clientAddress.json",
    designer: this.sampleDir + "/clientAddress.json",
    travel: this.sampleDir + "/travelExpensesSamples.json",
    travelMin: this.sampleDir + "/travelExpensesSamples_min.json",
  };
  this.serveFolderName = "immovablesServerStaticFolder";
  this.addressCode = this.dir + "/code/code.txt";
  this.priceStandardKey = 33;
  this.priceCollection = "designerPrice";
  this.token = {
    vworld: {
      url: "http://api.vworld.kr/req/search",
      key: "034D39D9-E04A-32CE-B860-70C780965F05"
    },
    tMap: {
      poi: "https://apis.openapi.sk.com/tmap/pois",
      url: "https://apis.openapi.sk.com/tmap/routes?version=1",
      key: "l7xxa22f35e01b7d4814a4eb247b28a84c3a"
    },
    jusoRoad: {
      url: "https://www.juso.go.kr/addrlink/addrLinkApi.do",
      key: "U01TX0FVVEgyMDIxMDYyMTEzMjkxMjExMTMwNDk=",
    },
    jusoLocation: {
      url: "https://www.juso.go.kr/addrlink/addrCoordApi.do",
      key: "U01TX0FVVEgyMDIxMDYyMTEzNDE1MzExMTMwNTI=",
    },
    openApi: {
      url: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc",
      key: "qYxqA/rabM2euF/V0hfK7RoH5z9vLUyj5GEsjM4U3NhiVrgIBDMKE5jfdpjeTZ176nISXMeaRl2TxefP5MrpsQ==",
    }
  };
}

AddressParser.prototype.convertXY = function (x, y, reverse = false) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const proj4 = require(`${this.dir}/module/proj4.js`);
  let grs80, wgs84, p;

  proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
  grs80 = proj4.Proj(proj4.defs["EPSG:5179"]);
  wgs84 = proj4.Proj(proj4.defs["EPSG:4326"]);

  p = proj4.toPoint([ x, y ]);

  if (!reverse) {
    return proj4.transform(grs80, wgs84, p);
  } else {
    return proj4.transform(wgs84, grs80, p);
  }
}

AddressParser.prototype.getTmapPoiSearch = async function (searchKeyword, child = false) {
  const instance = this;
  const { poi: url, key: appKey } = this.token.tMap;
  const { requestSystem, objectDeepCopy, emergencyAlarm, sleep } = this.mother;
  try {
    const delta = 100;
    const version = 1;
    const format = "json";
    const callback = "result";
    const resCoordType = "EPSG3857";
    const reqCoordType = "WGS84GEO";
    const count = 10;
    const method = "get";
    const res = await requestSystem(url, { version, format, callback, searchKeyword, resCoordType, reqCoordType, count, appKey }, { method, headers: { appKey } });
    let result;
    let target;
    let tempArr;

    result = null;
    if (typeof res.data === "object" && res.data !== null) {
      if (typeof res.data.searchPoiInfo === "object" && res.data.searchPoiInfo !== null) {
        if (Array.isArray(res.data.searchPoiInfo.pois) && res.data.searchPoiInfo.pois.length > 0) {
          [ target ] = res.data.searchPoiInfo.pois;
        } else if (typeof res.data.searchPoiInfo.pois === "object" && res.data.searchPoiInfo.pois !== null) {
          [ target ] = objectDeepCopy(res.data.searchPoiInfo.pois).poi;
        } else {
          target = null;
        }
        if (target !== null) {
          if (typeof target.roadName === "string" && target.roadName !== "") {
            result = "";
            result += target.upperAddrName;
            result += " ";
            result += target.middleAddrName;
            result += " ";
            result += target.roadName;
            result += " ";
            result += target.firstBuildNo;
            if (target.secondBuildNo !== "" && target.secondBuildNo !== "0" && target.secondBuildNo !== 0) {
              result += "-";
              result += target.secondBuildNo;
            }
            result = result.trim();
          } else {
            result = "";
            result += target.upperAddrName;
            result += " ";
            result += target.middleAddrName;
            result += " ";
            result += target.lowerAddrName;
            result += " ";
            result += target.firstNo;
            if (target.secondNo !== "" && target.secondNo !== "0" && target.secondNo !== 0) {
              result += "-";
              result += target.secondNo;
            }
          }
          if (result !== null) {
            if (target.name.slice(0, 2) !== result.slice(0, 2)) {
              result += " " + target.name;
            }
          }
        }
      }
    }

    if (!child) {
      if (result === null) {
        await sleep(delta);
        searchKeyword = searchKeyword.replace(/\([^\)]*\)/gi, '');
        result = await instance.getTmapPoiSearch(searchKeyword, true);
        if (result === null) {
          await sleep(delta);
          tempArr = searchKeyword.split(" ").map((s) => { return s.trim() }).filter((s) => { return !/[도리]$/gi.test(s); });
          tempArr = tempArr.filter((s) => { return !/거주(중)?/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/입주(할|예정)?/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/예정/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/아파트/gi.test(s) });
          searchKeyword = tempArr.join(" ");
          result = await instance.getTmapPoiSearch(searchKeyword, true);
          if (result === null) {
            await sleep(delta);
            tempArr = searchKeyword.split(" ").map((s) => { return s.trim() }).filter((s) => { return !/[도시구동리]$/gi.test(s); });
            searchKeyword = tempArr.join(" ");
            result = await instance.getTmapPoiSearch(searchKeyword, true);
          }
        }
      }
    }

    return result;

  } catch (e) {
    console.log(e);
    emergencyAlarm("getTmapPoiSearch error : " + e.message).catch((err) => { console.log(err) });
    return null;
  }
}

AddressParser.prototype.getAddress = async function (address, pointMode = false) {
  if (typeof address !== "string") {
    throw new Error("invaild input, address must be string");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  const { url: vworldUrl, key: vworldKey } = this.token.vworld;
  const { url: roadUrl, key: roadKey } = this.token.jusoRoad;
  const { url: locationUrl, key: locationKey } = this.token.jusoLocation;
  try {
    let data, res, res2, result;
    let tempArr, roadBoo;
    let index;
    let firstBoo;
    let tempResult, convertResult;
    let tempValue0, tempValue1;
    let indexStop;
    let fixedAddress;

    if (/[가-힣]+로[0-9]+ /gi.test(address)) {
      [ , tempValue0, tempValue1 ] = [ .../([가-힣]+로)([0-9]+) /g.exec(address) ];
      address = address.replace(/[가-힣]+로[0-9]+ /g, tempValue0 + " " + tempValue1 + " ");
    }

    if (/[가-힣]+로 [0-9]+길/gi.test(address)) {
      [ , tempValue0, tempValue1 ] = [ .../([가-힣]+로) ([0-9]+길)/g.exec(address) ];
      address = address.replace(/[가-힣]+로 [0-9]+길/g, tempValue0 + tempValue1);
    }

    tempArr = address.split(' ');
    roadBoo = true;
    indexStop = false;
    for (let i = 0; i < tempArr.length; i++) {
      if (/[동가리]$/i.test(tempArr[i].trim())) {
        roadBoo = false;
        index = i;
        indexStop = true;
        break;
      }
      if (/[로길]$/i.test(tempArr[i].trim())) {
        roadBoo = true;
        index = i;
        indexStop = true;
        break;
      }
    }
    if (!indexStop) {
      index = tempArr.length - 1;
    }

    if (tempArr[index + 1] !== undefined) {
      tempArr = tempArr.slice(0, index + 1 + 1);
    } else {
      tempArr = tempArr.slice(0, index + 1);
    }

    tempArr = tempArr.map((i) => { return i.trim(); });
    address = tempArr.join(" ");

    //zero search
    fixedAddress = await instance.getTmapPoiSearch(address);
    if (fixedAddress !== null) {
      address = fixedAddress;
    } else {
      fixedAddress = null;
    }

    //first search
    firstBoo = false;
    result = null;

    res = await requestSystem(roadUrl, {
      confmKey: roadKey,
      currentPage: 1,
      countPerPage: 50,
      keyword: address,
      resultType: "json",
      hstryYn: "Y",
    }, { method: "get" });

    if (res.data !== undefined) {
      if (res.data.results !== undefined) {
        if (res.data.results.common !== undefined) {
          if (res.data.results.common.errorMessage === "정상") {
            if (Array.isArray(res.data.results.juso)) {
              if (res.data.results.juso.length > 0) {
                tempResult = {
                  address: {
                    zipcode: res.data.results.juso[0].zipNo,
                    road: String(res.data.results.juso[0].roadAddr + " " + (res.data.results.juso[0].bdNm !== '' ? res.data.results.juso[0].bdNm : "")).trim(),
                    parcel: res.data.results.juso[0].jibunAddr,
                    english: res.data.results.juso[0].engAddr,
                  },
                  info: {
                    rn: res.data.results.juso[0].rn,
                    emdNm: res.data.results.juso[0].emdNm,
                    emdNo: res.data.results.juso[0].emdNo,
                    sggNm: res.data.results.juso[0].sggNm,
                    siNm: res.data.results.juso[0].siNm,
                    bdNm: res.data.results.juso[0].bdNm,
                    admCd: res.data.results.juso[0].admCd,
                    udrtYn: res.data.results.juso[0].udrtYn,
                    lnbrMnnm: res.data.results.juso[0].lnbrMnnm,
                    lnbrSlno: res.data.results.juso[0].lnbrSlno,
                    buldMnnm: res.data.results.juso[0].buldMnnm,
                    bdKdcd: res.data.results.juso[0].bdKdcd,
                    liNm: res.data.results.juso[0].liNm,
                    rnMgtSn: res.data.results.juso[0].rnMgtSn,
                    mtYn: res.data.results.juso[0].mtYn,
                    bdMgtSn: res.data.results.juso[0].bdMgtSn,
                    buldSlno: res.data.results.juso[0].buldSlno,
                  },
                  point: {},
                  queryResult: JSON.parse(JSON.stringify(res.data.results.juso)),
                };

                res2 = await requestSystem(locationUrl, {
                  confmKey: locationKey,
                  admCd: tempResult.info.admCd,
                  rnMgtSn: tempResult.info.rnMgtSn,
                  udrtYn: tempResult.info.udrtYn,
                  buldMnnm: Number(tempResult.info.buldMnnm),
                  buldSlno: Number(tempResult.info.buldSlno),
                  resultType: "json",
                }, { method: "get" });

                if (res2.data !== undefined) {
                  if (res2.data.results !== undefined) {
                    if (res2.data.results.common !== undefined) {
                      if (res2.data.results.common.errorMessage === "정상") {
                        if (Array.isArray(res2.data.results.juso)) {
                          if (res2.data.results.juso.length > 0) {
                            convertResult = this.convertXY(Number(res2.data.results.juso[0].entX), Number(res2.data.results.juso[0].entY));
                            tempResult.point.x = convertResult.x;
                            tempResult.point.y = convertResult.y;
                            tempResult.point.h = Number(res2.data.results.juso[0].entX);
                            tempResult.point.v = Number(res2.data.results.juso[0].entY);
                            tempResult.point.value = String(convertResult.y) + "," + String(convertResult.x);
                            firstBoo = true;
                            result = tempResult;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    //second search
    if (!firstBoo) {
      data = {
        request: "search",
        key: vworldKey,
        type: "address",
        query: address,
        format: "json",
        errorformat: "json",
        category: (roadBoo ? "road" : "parcel")
      };

      result = null;
      try {
        res = await requestSystem(vworldUrl, data, { method: "get" });

        if (res.data.response.status === "OK") {
          if (res.data.response.result !== undefined) {
            if (Array.isArray(res.data.response.result.items)) {
              if (res.data.response.result.items.length > 0) {
                result = res.data.response.result.items[0];
                result.queryResult = JSON.parse(JSON.stringify(res.data.response.result.items));
                result.point.value = result.point.y + "," + result.point.x;
                convertResult = this.convertXY(Number(result.point.x), Number(result.point.y));
                result.point.x = Number(result.point.x);
                result.point.y = Number(result.point.y);
                result.point.h = convertResult.x;
                result.point.v = convertResult.y;
                result.info = {};
                result.info.bldnm = result.address.bldnm;
                result.info.bldnmdc = result.address.bldnmdc;
                result.address.road = String(result.address.road + " " + (result.address.bldnm !== '' ? result.address.bldnm : "")).trim();
                delete result.id;
                delete result.address.category;
                delete result.address.bldnm;
                delete result.address.bldnmdc;
              }
            }
          }
        }
      } catch (e) {
        result = null;
      }

    }

    //third search
    if (result === null && fixedAddress === null) {
      return null;
    } else if (result === null && !pointMode && typeof fixedAddress === "string") {

      if (fixedAddress.trim() === "") {
        return null;
      } else {
        return {
          address: {
            road: fixedAddress
          }
        }
      }
    }

    if (result !== null && pointMode) {
      result = result.point.value;
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.getDistance = async function (from, to, option = { selfMongo: null }) {
  if (from === undefined || to === undefined) {
    throw new Error("invaild input => String: from address, String: to address");
  }
  const instance = this;
  const back = this.back;
  const { requestSystem, stringToDate, mongo, mongoconsoleinfo } = this.mother;
  const { url, key } = this.token.tMap;
  try {
    let origin, destination, res, result;
    let meters, seconds;
    let data;
    let distanceLogCollection;
    let distanceRows;
    let addressLogCollection;
    let addressRows;
    let MONGOC;

    if (option.selfMongo === null || option.selfMongo === undefined) {
      MONGOC = new mongo(mongoconsoleinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    distanceLogCollection = "distanceLog";
    addressLogCollection = "addressLog";

    if (typeof from === "string") {
      addressRows = await back.mongoRead(addressLogCollection, { input: from }, { selfMongo: MONGOC });
      if (addressRows.length !== 0) {
        origin = addressRows[0].address;
      } else {
        origin = await this.getAddress(from);
        await back.mongoCreate(addressLogCollection, { input: from, address: origin }, { selfMongo: MONGOC });
      }
      if (origin === null) {
        return null;
      }
    } else if (typeof from === "object") {
      if (typeof from.point !== "object") {
        throw new Error("invaild from");
        return null;
      } else {
        if (typeof from.point.value !== "string") {
          throw new Error("invaild from");
          return null;
        } else {
          if (/^[0-9]/.test(from.point.value) && /[0-9]$/.test(from.point.value) && /,/g.test(from.point.value)) {
            origin = from;
          } else {
            throw new Error("invaild from");
            return null;
          }
        }
      }
    } else {
      throw new Error("invaild from");
      return null;
    }

    if (typeof to === "string") {
      addressRows = await back.mongoRead(addressLogCollection, { input: to }, { selfMongo: MONGOC });
      if (addressRows.length !== 0) {
        destination = addressRows[0].address;
      } else {
        destination = await this.getAddress(to);
        await back.mongoCreate(addressLogCollection, { input: to, address: destination }, { selfMongo: MONGOC });
      }
      if (destination === null) {
        return null;
      }
    } else if (typeof to === "object") {
      if (typeof to.point !== "object") {
        throw new Error("invaild to");
        return null;
      } else {
        if (typeof to.point.value !== "string") {
          throw new Error("invaild to");
          return null;
        } else {
          if (/^[0-9]/.test(to.point.value) && /[0-9]$/.test(to.point.value) && /,/g.test(to.point.value)) {
            destination = to;
          } else {
            throw new Error("invaild to");
            return null;
          }
        }
      }
    } else {
      throw new Error("invaild to");
      return null;
    }

    result = null;

    if (origin === null || destination === null) {
      return result;
    }

    distanceRows = await back.mongoRead(distanceLogCollection, { $and: [ { "input.origin": origin.point.value }, { "input.destination": destination.point.value } ] }, { selfMongo: MONGOC });
    if (distanceRows.length !== 0) {
      result = new Distance(distanceRows[0].distance.meters, distanceRows[0].distance.seconds, origin, destination);
    } else {

      data = {
        startX: origin.point.x,
        startY: origin.point.y,
        endX: destination.point.x,
        endY: destination.point.y,
        totalValue: 2,
        reqCoordType: "WGS84GEO",
        speed: 60,
      };

      res = await requestSystem(url, data, { headers: { "appKey": key, "Content-type": "application/json" } });

      if (res.data === undefined) {
        return result;
      }
      if (!Array.isArray(res.data.features)) {
        return result;
      }
      if (res.data.features.length === 0) {
        return result;
      }
      if (res.data.features[0].properties === undefined) {
        return result;
      }
      if (res.data.features[0].properties.totalDistance === undefined) {
        return result;
      }
      if (res.data.features[0].properties.totalTime === undefined) {
        return result;
      }

      meters = res.data.features[0].properties.totalDistance;
      seconds = res.data.features[0].properties.totalTime;

      result = new Distance(meters, seconds, origin, destination);
      await back.mongoCreate(distanceLogCollection, { input: { origin: origin.point.value, destination: destination.point.value }, distance: result.toNormal() }, { selfMongo: MONGOC });
    }

    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.chainDistance = async function (from, to) {
  if (typeof from !== "string" && !Array.isArray(from)) {
    throw new Error("invaild input");
  }
  if (typeof from === "string") {
    if (typeof to !== "string") {
      throw new Error("invaild input");
    }
  } else {
    if (!from.every((f) => { return Array.isArray(f); })) {
      throw new Error("invaild input");
    }
    if (!from.every((f) => { return f.length === 2 })) {
      throw new Error("invaild input");
    }
  }
  const instance = this;
  const encodeUrl = (obj) => {
    let str;
    str = '';
    for (let i in obj) {
      str += i;
      str += '=';
      str += global.encodeURI(obj[i]);
      str += '&';
    }
    if (str.length > 0) {
      str = str.slice(0, -1);
    }
    return str;
  }
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  const chrome = new GoogleChrome();
  let url;
  let queries;
  let res;
  let map;
  let tempObj;
  let frontScript;
  try {

    frontScript = async function () {
      const { sleep } = GeneralJs;
      try {
        let distance, time;
        let meters, seconds;
        let tempArr;
        let targets;

        targets = document.querySelectorAll("span.distance");
        while (targets.length === 0) {
          await sleep(100);
          targets = document.querySelectorAll("span.distance");
        }
        for (let dom of targets) {
          if (dom.getAttribute("data-id") === "distance") {
            distance = dom;
            break;
          }
        }

        targets = document.querySelectorAll("span.time");
        while (targets.length === 0) {
          await sleep(100);
          targets = document.querySelectorAll("span.time");
        }
        for (let dom of targets) {
          if (dom.getAttribute("data-id") === "time") {
            time = dom;
            break;
          }
        }

        meters = Number(distance.querySelector(".num").textContent.trim()) * (distance.querySelector(".text").textContent.trim() === "km" ? 1000 : 1);

        if (/시간/gi.test(time.textContent)) {
          if (/분/gi.test(time.textContent)) {
            tempArr = time.textContent.split("시간").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
            seconds = (tempArr[0] * 60 * 60) + (tempArr[1] * 60);
          } else {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, '')) * 60 * 60;
          }
        } else {
          if (/분/gi.test(time.textContent)) {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, '')) * 60;
          } else {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, ''));
          }
        }

        return { meters, seconds }
      } catch (e) {
        return e.message;
      }
    }

    if (typeof from === "string" && typeof to === "string") {

      queries = {
        map_type: "TYPE_MAP",
        target: "car",
        rt: ",,523953,1084098",
        rt1: from,
        rt2: to
      };
      url = "https://map.kakao.com/?" + encodeUrl(queries);

      res = await chrome.frontScript(url, frontScript);

      res.from = from;
      res.to = to;
      return new Distance(res.meters, res.seconds, res.from, res.to);

    } else if (Array.isArray(from)) {

      if (!from.every((f) => { return Array.isArray(f) && f.length === 2 })) {
        throw new Error("invaild input");
      }

      map = [];
      for (let [ f, t ] of from) {
        tempObj = {};
        queries = {
          map_type: "TYPE_MAP",
          target: "car",
          rt: ",,523953,1084098",
          rt1: f,
          rt2: t
        };
        tempObj.link = "https://map.kakao.com/?" + encodeUrl(queries);
        tempObj.func = frontScript;
        map.push(tempObj);
      }

      res = await chrome.scriptChain(map, 100);
      res = res.map((obj, index) => {
        return new Distance(obj.meters, obj.seconds, from[index][0], from[index][1]);
      });

      return res;

    } else {
      throw new Error("invaild input");
    }

  } catch (e) {
    console.log(e);
    return null;
  }
}

AddressParser.prototype.getTravelExpenses = async function (from, to, option = { selfMongo: null }) {
  if (from === undefined || to === undefined) {
    throw new Error("invaild input => String: from address, String: to address");
  }
  const instance = this;
  const { priceStandardKey, priceCollection } = this;
  const back = this.back;
  const { autoComma } = this.mother;
  try {
    const priceStandard = await back.mongoRead(priceCollection, { key: priceStandardKey }, { console: true });
    if (priceStandard.length === 0) {
      throw new Error("price collection error");
    }
    const mConst = priceStandard[0].travel.unit.meters;
    const sConst = priceStandard[0].travel.unit.seconds;
    const consultingConst = priceStandard[0].travel.consulting.labor;
    const distance = await this.getDistance(from, to, option);
    let m, s, result;

    result = null;

    if (distance === null) {
      return null;
    }

    m = distance.m;
    s = distance.s;
    result = (mConst * m * 2) + (sConst * s * 2);
    result = (Math.round(result / 1000) * 1000) + consultingConst;

    return {
      from: distance.from,
      to: distance.to,
      amount: result,
      string: autoComma(result) + '원',
      distance: {
        meters: m,
        string: String(Math.round(m / 1000)) + "km",
      },
      time: {
        seconds: s,
        string: String(Math.floor(Math.round(s / 60) / 60)) + "시간 " + String(Math.round(s / 60) % 60) + "분",
      },
      standard: {
        distance: {
          value: mConst,
          string: "미터당 " + String(mConst) + "원",
        },
        time: {
          value: sConst,
          string: "초당 " + String(sConst) + "원",
        }
      }
    };

  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.addressInspection = async function (addressArr, liteMode = false) {
  if (!Array.isArray(addressArr)) {
    throw new Error("input must be address array");
  }
  for (let obj of addressArr) {
    if (obj.id === undefined || typeof obj.address !== "string") {
      throw new Error(`address array => [ { id: "", address: "" }... ]`);
    }
  }
  const instance = this;
  const { fileSystem } = this.mother;
  let failAddress;
  let inspectionResult;
  try {
    const inspection = async function (id, address, liteMode = false) {
      if (id === undefined || address === undefined) {
        throw new Error("invaild input");
      }
      if (typeof address !== "string") {
        throw new Error("input must be string");
      }
      try {
        const addressArr = address.split(' ').map((i) => { return i.trim(); });
        if (addressArr.length < 2) {
          return { boo: false, message: "ERROR: 주소가 아님" };
        }
        let targetIndex;
        let searchResult;
        let first;
        let road, parcel;

        targetIndex = null;

        for (let i = 0; i < addressArr.length; i++) {
          if (/[동로가리길]$/i.test(addressArr[i])) {
            targetIndex = i;
            break;
          }
        }
        if (targetIndex === null) {
          return { boo: false, message: "ERROR: 지번명 또는 도로명 알 수 없음" };
        }
        if (addressArr[targetIndex + 1] === undefined) {
          return { boo: false, message: "ERROR: 건물 번호 없음" };
        }
        if (/[로길]$/i.test(addressArr[targetIndex])) {
          if (addressArr[targetIndex + 1].replace(/\([^\)]*\)?/gi, '').replace(/[0-9\-\.]/gi, '') !== '') {
            return { boo: false, message: "ERROR: 건물 번호가 이상함" };
          }
        }

        if (!liteMode) {
          searchResult = await instance.getAddress(address);
          if (searchResult === null) {
            return { boo: false, message: "ERROR: 검색 결과가 없음" };
          }

          first = addressArr[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');
          road = searchResult.address.road.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');
          parcel = searchResult.address.parcel.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');
          if (first !== road && first !== parcel) {
            return { boo: false, message: "ERROR: 광역 단계 일치하지 않음" };
          }
        }

        return { boo: true, message: "SUCCESS" };
      } catch (e) {
        console.log(e);
      }
    }
    failAddress = [];
    for (let { id, address } of addressArr) {
      inspectionResult = await inspection(id, address, liteMode);
      if (!inspectionResult.boo) {
        failAddress.push({ id, address, message: inspectionResult.message });
      }
    }
    return failAddress;
  } catch (e) {
    console.log(e);
    failAddress = [];
    for (let { id, address } of addressArr) {
      failAddress.push({ id, address, message: "" });
    }
    return failAddress;
  }
}

AddressParser.prototype.apartNameSearch = async function (words) {
  if (typeof words !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  const junkList = [
    '로딩중',
    '우편번호',
    '도로명',
    '지번',
    '이 주소의 장소',
    '길찾기',
    'VIEW',
    '문서 저장하기',
    'Keep에 저장',
    'Keep 바로가기',
    '전체',
    '메뉴 영역으로 바로가기',
    '본문 영역으로 바로가기',
    'NAVER',
    '검색',
    '한글 입력기',
    '자동완성 레이어',
    '최근검색어',
    '전체삭제',
    '컨텍스트 자동완성',
    'ON/OFF 설정은',
    '해당기기(브라우저)에 저장됩니다.',
    '자세히',
    '동일한 시간대/연령/남녀별',
    '사용자 그룹의',
    '관심사에 맞춰 자동완성을 제공합니다.',
    '로그인',
    '자세히',
    '컨텍스트 자동완성 레이어 닫기',
    '도움말',
    '신고',
    '자동완성 끄기',
    '검색',
    '통합',
    'VIEW',
    '이미지',
    '지식iN',
    '동영상',
    '쇼핑',
    '뉴스',
    '어학사전',
    '지도',
    '책',
    '더보기',
    '뮤직',
    '지식백과',
    '오디오클립',
    '학술정보',
    '검색옵션',
    '공유',
    '추가',
    '자세히보기',
    '바로가기',
    '검색옵션 닫기',
    '정렬',
    '관련도순',
    '최신순',
    '기간',
    '직접입력',
    '옵션',
    '펼치기',
    '접기',
    '삭제',
    '검색어 저장 기능이 꺼져 있습니다.',
    '설정이 초기화 된다면',
    '을 확인해주세요.',
    '최근 검색어 내역이 없습니다.',
    '설정이 초기화 된다면',
    '을 확인해주세요.',
    '자동저장 끄기',
    '기간 설정시작',
    '기간 설정끝',
    '적용',
    '옵션초기화',
    '검색옵션 가이드',
    '관심사를 반영한 컨텍스트 자동완성',
    '지급기한 1년',
    '블로그',
    '카페',
    '기본뷰',
    '타임라인뷰',
    '멀티미디어뷰',
    'VIEW 더보기',
    '정보를 가져오는 중입니다.',
    '검색결과가 없습니다.',
    '옵션을 재선택 하시거나 초기화 해보시기 바랍니다.',
    '초기화',
    '죄송합니다. 일시적인 오류입니다.',
    '잠시 후 다시 시도해주십시오.',
    '재시도',
    'MS엑셀(xls)',
    '리뷰월드',
    '년(Year)',
    '월(Month)',
    '일(Day)',
    '이 정보가 표시된 이유',
    '네이버가 운영하는 부동산 서비스입니다.',
    '정보확인 레이어 닫기',
    '다른 사이트를 보시려면 클릭하세요',
    '다른 사이트 더보기',
    '관심단지',
    '‘관심 단지’',
    '에 저장되었습니다',
  ];
  const junkRegList = [
    /function/gi,
    /var/g,
    /root/g,
    /flex/g,
    /background/g,
    /hidden/g,
    /margin/g,
    /jQuery/gi,
    /^KEEP/gi,
    /\@\.?$/,
    /charCodeAt/g,
    /통합검색/gi,
    /setTimeout/gi,
    /\>\>/gi,
  ];
  const naverSearch = async function (words) {
    const protocol = "https:";
    const host = "search.naver.com";
    const path = "/search.naver";
    const token = "__split__";
    try {
      const url = `${protocol}//${host}${path}?query=${global.encodeURIComponent(words)}`;
      let response, arr, rawString, window, document, html, link;

      response = await requestSystem(url);

      if (response.status < 300) {
        const { data } = response;
        rawString = data.replace(/<[^\>]+>/gi, token);
        arr = rawString.split(token);
        arr = arr.map((str) => { return str.trim(); }).filter((str) => { return str.trim() !== ''; });
        arr = arr.map((str) => { if (/^[\'\"]/.test(str.trim()) || /[\'\"]$/.test(str.trim())) { return str.trim().slice(1, -1); } else { return str.trim(); } });
        arr = arr.filter((str) => { return junkRegList.every((reg) => { return !reg.test(str) }); });
        arr = arr.filter((str) => { return !junkList.includes(str.trim()); });
        arr = arr.filter((str) => { return str.trim() !== '' && str.trim() !== '|' && str.trim() !== '~' });
        arr = arr.slice(arr.findIndex((str) => { return (new RegExp('^' + words.slice(0, 2), 'i')).test(str) && / /g.test(str) && str.split(' ').map((a) => { return a.trim() }).some((a) => { return /[동로가리길]$/i.test(a); }) }));
        arr = arr.filter((str) => { return str.trim().replace(/[0-9\-]/gi, '') !== '' });

        return arr;
      } else {
        throw new Error("response error");
      }
    } catch (e) {
      return null;
    }
  }
  const limit = 4;
  let num, resultArr, addressArr, targetIndex, fromClient, final, realFinal;
  try {

    words = words.trim().replace(/\([^\)]+\)/gi, '').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ');

    addressArr = words.split(' ').map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
    targetIndex = null;
    for (let i = 0; i < addressArr.length; i++) {
      if (/[동로가리길]$/i.test(addressArr[i])) {
        targetIndex = i;
        break;
      }
    }
    fromClient = addressArr.slice(targetIndex + 2).map((str) => { return str.trim(); }).filter((str) => { return !/^[0-9\-]+[동호]$/gi.test(str); }).filter((str) => { return str.replace(/[0-9\-\.동호]/gi, '') !== ''; }).join(' ');

    if (addressArr[targetIndex + 2] !== undefined && !/^[0-9]/.test(addressArr[targetIndex + 2]) && !/동$/.test(addressArr[targetIndex + 2]) && !/^\(/.test(addressArr[targetIndex + 2])) {
      return { raw: words, apart: fromClient };
    }

    num = 0;
    do {
      resultArr = await naverSearch(words);
      num++;
    } while (!Array.isArray(resultArr) && num <= limit);

    if (resultArr === null) {
      realFinal = '';
    } else {
      if (resultArr.slice(0, 2).every((s) => { return (new RegExp("^" + words.slice(0, 2), 'i')).test(s); })) {
        final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
      } else {
        if (resultArr[1] !== undefined) {
          if (/^[a-zA-Z가-힣0-9]/.test(resultArr[1].trim())) {
            final = resultArr[1].replace(/\([^\)]+\)/gi, '').trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
          } else {
            final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
          }
        } else {
          final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
        }
      }
      if (final === '') {
        realFinal = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
      } else {
        if (final.replace(/[0-9 \-]/gi, '') === '') {
          realFinal = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
        } else {
          final = final.split(' ').map((str) => { return str.trim(); }).filter((str) => { return !/^[0-9\-]+[동호]$/gi.test(str); }).filter((str) => { return str.replace(/[0-9\-\.동호]/gi, '') !== ''; }).join(' ').trim();
          realFinal = final;
        }
      }
      if (realFinal === '') {
        return { raw: words, apart: words };
      } else {
        if (/필터/gi.test(realFinal)) {
          return instance.apartNameSearch(words);
        } else {
          return { raw: words, apart: realFinal };
        }
      }
    }

  } catch (e) {
    console.log(e);
    return { raw: words, apart: words };
  }
}

AddressParser.prototype.returnAddressCodeMatrix = async function (five = true) {
  const instance = this;
  const { addressCode } = this;
  const { fileSystem } = this.mother;
  try {
    const target = await fileSystem(`readString`, [ addressCode ]);
    let arr, map;
    let targetCode;
    let targetMatrix;

    arr = target.split("\n").filter((str) => { return /존재/gi.test(str); }).map((str) => {
      return str.split("\t").slice(0, 2);
    });

    map = {};
    for (let [ code, name ] of arr) {
      map[code] = name;
    }

    if (five) {
      targetCode = [ ...new Set(arr.map((a) => { return a[0].slice(0, 5) })) ]
      targetMatrix = targetCode.map((code) => {
        return [ code, map[code + "00000"] ];
      });
    } else {
      targetCode = [ ...new Set(arr.map((a) => { return a[0]; })) ]
      targetMatrix = targetCode.map((code) => {
        return [ code, map[code] ];
      });
    }

    return targetMatrix;

  } catch (e) {
    console.log(e);
  }
}

module.exports = AddressParser;
