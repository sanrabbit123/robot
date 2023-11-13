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
  this.pythonApp = this.dir + "/python/app.py";
  this.serveFolderName = "immovablesServerStaticFolder";
  this.addressCode = this.dir + "/code/code.txt";
  this.priceStandardKey = 33;
  this.priceCollection = "designerPrice";
  this.token = {
    vworld: {
      url: "http://api.vworld.kr/req/search",
      key: "A9ECB4F3-AE34-3A28-AD0F-59DAA7AC0A0B"
    },
    tMap: {
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
  this.mapDir = this.dir + "/map";
}

AddressParser.prototype.createApartment = async function (updateQuery, option = { selfMongo: null }) {
  if (typeof updateQuery !== "object") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { mongo, mongolocalinfo } = this.mother;
  const collection = "apartInfo";
  const map = require(`${this.mapDir}/${collection}.js`);
  let MONGOC;
  let selfBoo;
  let rows;
  let dummy;
  let pastId;
  let newId;
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongolocalinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    dummy = map.main();
    rows = await MONGOC.db(`miro81`).collection(collection).find({}).sort({ "date": -1 }).limit(1).toArray();
    if (rows.length === 0) {
      pastId = "l2111_aa01s";
    } else {
      pastId = rows[0].apaid;
    }
    dummy.apaid = this.back.idMaker(pastId, false);
    newId = dummy.apaid;

    await MONGOC.db(`miro81`).collection(collection).insertOne(dummy);
    if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
      await MONGOC.db(`miro81`).collection(collection).updateOne({ apaid: newId }, { $set: updateQuery });
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return newId;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.updateApartment = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongolocalinfo } = this.mother;
  const collection = "apartInfo";
  const map = require(`${this.mapDir}/${collection}.js`);
  const [ whereQuery, updateQuery ] = queryArr;
  if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  let MONGOC;
  let selfBoo;
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongolocalinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
      await MONGOC.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.readApartment = async function (whereQuery, option = { selfMongo: null }) {
  if (typeof whereQuery !== "object" || typeof option !== "object") {
    throw new Error("input must be Object: whereQuery, Object: option");
  }
  const instance = this;
  const { mongo, mongolocalinfo } = this.mother;
  const collection = "apartInfo";
  const map = require(`${this.mapDir}/${collection}.js`);
  const { alive, wrap } = map;
  let MONGOC;
  let selfBoo;
  let rows;
  let sortQuery;
  try {
    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongolocalinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.limit !== undefined) {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).toArray();
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return map.wrap(alive, rows, this.mother);

  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.rawToApartment = async function (data, option = { selfMongo: null }) {
  if (typeof data !== "object") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { mongo, mongolocalinfo } = this.mother;
  const collection = "apartInfo";
  const map = require(`${this.mapDir}/${collection}.js`);
  let MONGOC;
  let selfBoo;
  let result;
  let tempStr, tempStr2, tempArr, tempArr2, tempDate, tempReg, tempReg2, tempNum, tempObj;
  let detailArr;
  let findTarget;
  let returnNumber;
  let rows;
  let pastRows;
  let pastId;
  let newId;
  let thisApaid;
  let cliidArr;
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongolocalinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    result = map.main();

    result.name = data.name;
    result.link = data.link;
    result.cliid = [ data.cliid ];

    findTarget = (arr, reg) => {
      const f = arr.find((obj) => { return reg.test(obj.name); });
      if (f === undefined) {
        return null;
      } else {
        return f.value;
      }
    }

    returnNumber = (str) => {
      let num = Number(str);
      if (Number.isNaN(num)) {
        return null;
      } else {
        return num;
      }
    }

    tempStr = findTarget(data.entire, /일$/);
    if (tempStr !== null) {
      if (tempStr.trim() === '-' || tempStr.trim() === '') {
        tempDate = new Date(1800, 0, 1);
      } else {
        tempArr = tempStr.split(/[년 \.]/g).map((i) => { return i.trim(); }).filter((i) => { return i !== ''; }).map((i) => { return Number(i.replace(/[^0-9]/gi, '')); });
        if (tempArr.every((i) => { return typeof i === "number"; })) {
          if (!tempArr.some((i) => { return Number.isNaN(i); })) {
            if (tempArr.length === 2) {
              tempDate = new Date(tempArr[0], tempArr[1] - 1, 15);
            } else if (tempArr.length === 3) {
              tempDate = new Date(tempArr[0], tempArr[1] - 1, tempArr[2]);
            } else {
              tempDate = new Date(1800, 0, 1);
            }
          }
        }
      }
      result.created = new Date(JSON.stringify(tempDate).slice(1, -1));
    }
    tempStr = findTarget(data.entire, /주소/gi);
    if (tempStr !== null) {
      tempReg = new RegExp(tempStr.split(' ')[0].slice(0, 2), "gi");
      tempReg2 = new RegExp('^' + tempStr.split(' ')[0].slice(0, 2));
      tempArr = tempStr.split(' ').map((i) => { return i.trim(); }).filter((i) => { return i !== '' });
      tempNum = tempArr.findIndex((i) => {
        return tempReg.test(i) && !tempReg2.test(i);
      });
      tempArr[tempNum] = tempArr[tempNum].split(tempReg)[0].trim();
      tempArr = tempArr.slice(0, tempNum + 1);
      result.address = tempArr.join(' ');
    }
    tempStr = findTarget(data.entire, /세대수/gi);
    if (tempStr !== null) {
      result.numbers.households = returnNumber(tempStr.split(/세대/)[0].replace(/[^0-9]/gi, ''));
      if (/동/.test(tempStr)) {
        result.numbers.buildings = returnNumber(tempStr.split(/세대/)[1].replace(/[^0-9]/gi, ''));
      }
    }
    tempStr = findTarget(data.entire, /층$/);
    if (tempStr !== null) {
      if (/\//gi.test(tempStr)) {
        result.floor.min = returnNumber(tempStr.split(/\//)[0].replace(/[^0-9]/gi, ''));
        result.floor.max = returnNumber(tempStr.split(/\//)[1].replace(/[^0-9]/gi, ''));
      }
    }
    tempStr = findTarget(data.entire, /용적/gi);
    if (tempStr !== null) {
      if (tempStr.replace(/[^0-9\.]/gi, '') !== '') {
        result.ratio.floorArea = returnNumber(tempStr.replace(/[^0-9\.]/gi, '')) / 100;
      }
    }
    tempStr = findTarget(data.entire, /건폐/gi);
    if (tempStr !== null) {
      if (tempStr.replace(/[^0-9\.]/gi, '') !== '') {
        result.ratio.buildingCover = returnNumber(tempStr.replace(/[^0-9\.]/gi, '')) / 100;
      }
    }
    tempStr = findTarget(data.entire, /면적/gi);
    if (tempStr !== null) {
      if (/\,/gi.test(tempStr)) {
        tempArr = tempStr.split(',').map((i) => { return i.trim(); }).filter((i) => { return i !== ''; }).map((i) => { return i.replace(/㎡/gi, ''); });
      } else {
        tempArr = [ tempStr.trim().replace(/㎡/gi, '') ];
      }

      detailArr = [];
      for (let i = 0; i < tempArr.length; i++) {
        tempObj = {};
        tempObj.name = tempArr[i];

        tempStr2 = findTarget(data.detail[i], /세대수/gi);
        if (tempStr2 === null) {
          tempObj.count = null;
        } else {
          tempObj.count = returnNumber(tempStr2.replace(/[^0-9]/gi, ''));
        }

        tempObj.area = {};
        tempStr2 = findTarget(data.detail[i], /전용/gi);
        if (tempStr2 === null) {
          tempObj.area.supply = null;
          tempObj.area.dedicated = null;
          tempObj.area.ratio = null;
        } else {
          tempObj.area.supply = returnNumber(tempStr2.split(/[\/\(]/gi)[0].replace(/[^0-9\.]/gi, ''));
          tempObj.area.dedicated = returnNumber(tempStr2.split(/[\/\(]/gi)[1].replace(/[^0-9\.]/gi, ''));
          tempObj.area.ratio = returnNumber(tempStr2.split(/[\/\(]/gi)[2].replace(/[^0-9\.]/gi, '')) / 100;
        }

        tempObj.composition = {};
        tempStr2 = findTarget(data.detail[i], /방수/gi);
        if (tempStr2 === null) {
          tempObj.composition.rooms = null;
          tempObj.composition.bathrooms = null;
        } else {
          tempObj.composition.rooms = returnNumber(tempStr2.split(/[\/]/gi)[0].replace(/[^0-9]/gi, ''));
          tempObj.composition.bathrooms = returnNumber(tempStr2.split(/[\/]/gi)[1].replace(/[^0-9]/gi, ''));
        }

        detailArr.push(tempObj);
      }

      result.kinds = detailArr;
    }

    rows = await this.readApartment({ name: result.name }, option);
    if (rows.length > 0) {

      thisApaid = rows[0].apaid;
      cliidArr = rows[0].cliid;
      if (!cliidArr.includes(data.cliid)) {
        cliidArr.push(data.cliid);
      }
      result.apaid = thisApaid;
      newId = thisApaid;
      await this.updateApartment([ { apaid: thisApaid }, { cliid: cliidArr } ], option);

    } else {

      pastRows = await MONGOC.db(`miro81`).collection(collection).find({}).sort({ "date": -1 }).limit(1).toArray();
      if (pastRows.length === 0) {
        pastId = "l2111_aa01s";
      } else {
        pastId = pastRows[0].apaid;
      }
      result.apaid = this.back.idMaker(pastId, false);
      newId = result.apaid;
      await MONGOC.db(`miro81`).collection(collection).insertOne(result);

    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return result;

  } catch (e) {
    console.log(e);
  }
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

AddressParser.prototype.getAddress = async function (address, pointMode = false, defaultGeneralSpotsNameIndex = 0) {
  if (typeof address !== "string") {
    throw new Error("invaild input, address must be string");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  const { url: vworldUrl, key: vworldKey } = this.token.vworld;
  const { url: roadUrl, key: roadKey } = this.token.jusoRoad;
  const { url: locationUrl, key: locationKey } = this.token.jusoLocation;
  const defaultGeneralSpotsName = [
    "공원",
    "초등학교",
    "중학교",
    "고등학교",
    "학교",
    "1",
    "사거리",
    "삼거리",
    "보건소",
  ];
  try {
    let data, res, res2, result;
    let tempArr, roadBoo;
    let index;
    let firstBoo;
    let tempResult, convertResult;
    let tempValue0, tempValue1;

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
    for (let i = 0; i < tempArr.length; i++) {
      if (/[동가리]$/i.test(tempArr[i].trim())) {
        roadBoo = false;
        index = i;
        break;
      }
      if (/[로길]$/i.test(tempArr[i].trim())) {
        roadBoo = true;
        index = i;
        break;
      }
    }

    if (tempArr[index + 1] !== undefined) {
      tempArr = tempArr.slice(0, index + 1 + 1);
    } else {
      tempArr = tempArr.slice(0, index + 1);
    }

    tempArr = tempArr.map((i) => { return i.trim(); });
    address = tempArr.join(" ");

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
                    road: res.data.results.juso[0].roadAddr,
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
    if (result === null) {
      tempArr = address.split(' ');
      tempArr = tempArr.slice(0, index + 1);
      if (defaultGeneralSpotsName[defaultGeneralSpotsNameIndex] === undefined) {
        return null;
      }
      tempArr.push(defaultGeneralSpotsName[defaultGeneralSpotsNameIndex]);
      result = await this.getAddress(tempArr.join(" "), false, defaultGeneralSpotsNameIndex + 1);
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

AddressParser.prototype.getAllImmovables = async function () {
  const instance = this;
  const { fileSystem, shellLink, shellExec } = this.mother;
  try {

    //static setting
    const home = process.env.HOME;
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const tempFolderName = "immovablesServerTempFolder";
    const targetPath = home + "/" + tempFolderName;
    if (homeDir.includes(tempFolderName)) {
      await shellExec("rm", [ "-rf", targetPath ]);
    }
    if (!homeDir.includes(this.serveFolderName)) {
      await shellExec("mkdir", [ home + "/" + this.serveFolderName ]);
    }
    await shellExec("mkdir", [ targetPath ]);

    //date matrix setting
    const dateMatrix = [
      [ "202009" ]
    ];
    let dateMatrix_flat = [];
    for (let i of dateMatrix) {
      for (let j of i) {
        dateMatrix_flat.push(j);
      }
    }
    const serveFolderDir = await fileSystem(`readDir`, [ home + "/" + this.serveFolderName ]);
    let commandArr;
    commandArr = [];
    for (let i of dateMatrix_flat) {
      commandArr.push([ "mkdir", [ `${targetPath}/d${i}` ] ]);
      if (!serveFolderDir.includes(`d${i}`)) {
        commandArr.push([ "mkdir", [ `${home}/${this.serveFolderName}/d${i}` ] ]);
      }
    }
    await shellExec(commandArr);

    await this.mother.pythonExecute(this.pythonApp, [ "getAll" ], { dateMatrix, targetPath });

    let fileListRAW_P, fileListRAW, fileList;
    let arr;
    let filter;
    let result;
    let temp;
    let totalTong;
    let dateName;

    fileListRAW_P = await fileSystem(`readDir`, [ targetPath ]);

    for (let p of fileListRAW_P) {
      if (p !== `.DS_Store`) {

        fileListRAW = await fileSystem(`readDir`, [ targetPath + "/" + p ]);
        fileList = [];
        for (let i of fileListRAW) {
          if (i !== `.DS_Store`) {
            fileList.push(i);
          }
        }

        for (let i = 0; i < fileList.length; i++) {
          dateName = ((fileList[i].split("_"))[fileList[i].split("_").length - 1]).replace(/\.json$/, '');

          arr = JSON.parse(await fileSystem(`readString`, [ targetPath + "/d" + dateName + "/" + fileList[i] ]));
          totalTong = [];
          for (let i of arr) {
            filter = [];
            result = [];
            for (let j of i.replace(/\&lt/g, '').replace(/\&gt/g, '').split(";")) {
              if (/\!--/g.test(j)) {
                filter.push(j);
              }
            }
            for (let i of filter) {
              temp = i.split("<!--");
              result.push({ subject: temp[1].replace(/--\>/g, '').replace(/\<[^\>]+\>/g, ''), value: temp[0].trim().replace(/ /g, '') });
            }
            totalTong.push(result);
          }
          await fileSystem(`write`, [ (home + "/" + this.serveFolderName + "/d" + dateName + "/" + fileList[i]), JSON.stringify(totalTong, null, 2) ]);
        }

      }
    }
    await shellExec("rm", [ "-rf", targetPath ]);

    return "done";

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
    let inspectionResult;

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

AddressParser.prototype.immovablesInfoByDate = async function (date) {
  if (!(date instanceof Date)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  const serviceKey = this.token.openApi.key;
  const urlMap = {
    apartment: {
      trade: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: (typeof obj["거래금액"] === "string" ? Number(obj["거래금액"].trim().replace(/[^0-9]/gi, '')) : obj["거래금액"]) * 10000,
              deposit: 0,
              monthly: 0,
            },
            space: {
              kind: "apartment",
              name: obj["아파트"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
      rent: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: 0,
              deposit: (typeof obj["보증금액"] === "string" ? Number(obj["보증금액"].trim().replace(/[^0-9]/gi, '')) : obj["보증금액"]) * 10000,
              monthly: (typeof obj["월세금액"] === "string" ? Number(obj["월세금액"].trim().replace(/[^0-9]/gi, '')) : obj["월세금액"]) * 10000,
            },
            space: {
              kind: "apartment",
              name: obj["아파트"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
    },
    officetel: {
      trade: {
        url: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiTrade",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: (typeof obj["거래금액"] === "string" ? Number(obj["거래금액"].trim().replace(/[^0-9]/gi, '')) : obj["거래금액"]) * 10000,
              deposit: 0,
              monthly: 0,
            },
            space: {
              kind: "officetel",
              name: obj["단지"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
      rent: {
        url: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcOffiRent",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: 0,
              deposit: (typeof obj["보증금"] === "string" ? Number(obj["보증금"].trim().replace(/[^0-9]/gi, '')) : obj["보증금"]) * 10000,
              monthly: (typeof obj["월세"] === "string" ? Number(obj["월세"].trim().replace(/[^0-9]/gi, '')) : obj["월세"]) * 10000,
            },
            space: {
              kind: "officetel",
              name: obj["단지"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
    },
    rowhouse: {
      trade: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: (typeof obj["거래금액"] === "string" ? Number(obj["거래금액"].trim().replace(/[^0-9]/gi, '')) : obj["거래금액"]) * 10000,
              deposit: 0,
              monthly: 0,
            },
            space: {
              kind: "rowhouse",
              name: obj["연립다세대"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
      rent: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHRent",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: 0,
              deposit: (typeof obj["보증금액"] === "string" ? Number(obj["보증금액"].trim().replace(/[^0-9]/gi, '')) : obj["보증금액"]) * 10000,
              monthly: (typeof obj["월세금액"] === "string" ? Number(obj["월세금액"].trim().replace(/[^0-9]/gi, '')) : obj["월세금액"]) * 10000,
            },
            space: {
              kind: "rowhouse",
              name: obj["연립다세대"].trim(),
              pyeong: obj["전용면적"] / 3.30579,
              floor: obj["층"],
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
    },
    singlehouse: {
      trade: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHTrade",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: (typeof obj["거래금액"] === "string" ? Number(obj["거래금액"].trim().replace(/[^0-9]/gi, '')) : obj["거래금액"]) * 10000,
              deposit: 0,
              monthly: 0,
            },
            space: {
              kind: "singlehouse",
              name: obj["주택유형"].trim(),
              pyeong: obj["연면적"] / 3.30579,
              floor: 0,
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
      rent: {
        url: "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent",
        convert: (obj) => {
          return {
            date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
            amount: {
              trade: 0,
              deposit: (typeof obj["보증금액"] === "string" ? Number(obj["보증금액"].trim().replace(/[^0-9]/gi, '')) : obj["보증금액"]) * 10000,
              monthly: (typeof obj["월세금액"] === "string" ? Number(obj["월세금액"].trim().replace(/[^0-9]/gi, '')) : obj["월세금액"]) * 10000,
            },
            space: {
              kind: "singlehouse",
              name: "단독",
              pyeong: obj["계약면적"] / 3.30579,
              floor: 0,
              dong: obj["법정동"].trim(),
              builtYear: obj["건축년도"],
            }
          };
        }
      },
    }
  };
  const urlTarget = [
    urlMap.apartment.trade.url,
    urlMap.apartment.rent.url,
    urlMap.officetel.trade.url,
    urlMap.officetel.rent.url,
    urlMap.rowhouse.trade.url,
    urlMap.rowhouse.rent.url,
    urlMap.singlehouse.trade.url,
    urlMap.singlehouse.rent.url,
  ];
  const zeroAddition = (num) => (num < 10 ? `0${String(num)}` : String(num));
  try {
    const targetMatrix = await this.returnAddressCodeMatrix();
    let response;
    let LAWD_CD, DEAL_YMD;
    let tong;
    let result;
    let final;

    DEAL_YMD = String(date.getFullYear()) + zeroAddition(date.getMonth() + 1);

    final = [];
    for (let [ LAWD_CD, region ] of targetMatrix) {

      if (!/000$/.test(LAWD_CD)) {
        tong = [];
        for (let url of urlTarget) {
          response = await requestSystem(url, { serviceKey, LAWD_CD, DEAL_YMD }, { method: "get" });
          if (response.data.response.body === undefined || response.data.response.body.items.item === undefined) {
            tong.push(0);
          } else {
            tong.push(response.data.response.body.items.item.length);
          }
        }

        result = {
          code: LAWD_CD,
          region,
          date: new Date(date.getFullYear(), date.getMonth(), 10),
          numbers: {
            apartment: {
              trade: tong[0],
              rent: tong[1],
            },
            officetel: {
              trade: tong[2],
              rent: tong[3],
            },
            rowhouse: {
              trade: tong[4],
              rent: tong[5],
            },
            singlehouse: {
              trade: tong[6],
              rent: tong[7],
            }
          }
        };

        final.push(result);
      }

    }

    return final;

  } catch (e) {
    console.log(e);
  }
}

module.exports = AddressParser;
