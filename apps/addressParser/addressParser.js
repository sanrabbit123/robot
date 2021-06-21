const AddressParser = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/addressParser";
  this.jsonDir = this.dir + "/json";
  this.pythonApp = this.dir + "/python/app.py";
  this.serveFolderName = "immovablesServerStaticFolder";
  this.priceStandardKey = 33;
  this.priceCollection = "designerPrice";
  this.token = {
    vworld: {
      url: "http://api.vworld.kr/req/search",
      key: "A9ECB4F3-AE34-3A28-AD0F-59DAA7AC0A0B"
    },
    googleDirections: {
      url: "https://maps.googleapis.com/maps/api/directions/json",
      key: "AIzaSyDL_6xND6KHPO5u6J6LIZCk0yMi1H_GnuY"
    },
    jusoRoad: {
      url: "https://www.juso.go.kr/addrlink/addrLinkApi.do",
      key: "U01TX0FVVEgyMDIxMDYyMTEzMjkxMjExMTMwNDk=",
    },
    jusoLocation: {
      url: "https://www.juso.go.kr/addrlink/addrCoordApi.do",
      key: "U01TX0FVVEgyMDIxMDYyMTEzNDE1MzExMTMwNTI=",
    }
  };
}

AddressParser.prototype.convertXY = function (x, y) {
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

  return proj4.transform(grs80, wgs84, p);
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
      res = await requestSystem(vworldUrl, data, { method: "get" });

      result = null;

      if (res.data.response.status === "OK") {
        if (res.data.response.result !== undefined) {
          if (Array.isArray(res.data.response.result.items)) {
            if (res.data.response.result.items.length > 0) {
              result = res.data.response.result.items[0];
              result.queryResult = JSON.parse(JSON.stringify(res.data.response.result.items));
              result.point.value = result.point.y + "," + result.point.x;
              result.point.y = Number(result.point.y);
              result.point.x = Number(result.point.x);
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
    }

    if (result !== null && pointMode) {
      result = result.point.value;
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.getDistance = async function (from, to, when = null) {
  if (from === undefined || to === undefined) {
    throw new Error("invaild input => String: from address, String: to address");
  }
  const instance = this;
  const { requestSystem, stringToDate } = this.mother;
  const { url, key } = this.token.googleDirections;
  try {
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
    if (when === undefined || when === null) {
      when = new Date();
    }
    if (!(when instanceof Date)) {
      if (typeof when !== "string") {
        throw new Error("invaild input when");
      }
      when = stringToDate(when);
      if (!(when instanceof Date)) {
        throw new Error("invaild input when");
      }
    }
    const mode = "transit";
    let origin, destination, res, result, departure_time;
    let origin_obj, destination_obj;
    let meters, seconds;

    departure_time = String(when.valueOf() / 1000);
    if (typeof from === "string") {
      origin_obj = await this.getAddress(from);
      if (origin_obj === null) {
        return null;
      }
      origin = origin_obj.point.value;
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
            origin_obj = from;
            origin = from.point.value;
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
      destination_obj = await this.getAddress(to);
      if (destination_obj === null) {
        return null;
      }
      destination = destination_obj.point.value;
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
            destination_obj = to;
            destination = to.point.value;
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
    res = await requestSystem(url, { origin, destination, mode, key, departure_time }, { method: "get" });
    if (!Array.isArray(res.data.routes)) {
      return result;
    }
    if (res.data.routes.length === 0) {
      return result;
    }
    if (!Array.isArray(res.data.routes[0].legs)) {
      return result;
    }
    if (res.data.routes[0].legs.length === 0) {
      return result;
    }
    if (typeof res.data.routes[0].legs[0].distance !== "object" || typeof res.data.routes[0].legs[0].duration !== "object") {
      return result;
    }
    if (typeof res.data.routes[0].legs[0].distance.value !== "number" || typeof res.data.routes[0].legs[0].duration.value !== "number") {
      return result;
    }

    meters = res.data.routes[0].legs[0].distance.value;
    seconds = res.data.routes[0].legs[0].duration.value;

    result = new Distance(meters, seconds, origin_obj, destination_obj);

    return result;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.getTravelExpenses = async function (from, to, when = null) {
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
    const consultingConst = priceStandard[0].travel.consulting.hours * priceStandard[0].travel.consulting.labor;
    const distance = await this.getDistance(from, to, when);
    let m, s, result;

    result = null;

    if (distance === null) {
      return result;
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
  const { fileSystem, shell, shellLink } = this.mother;
  try {

    //static setting
    const home = process.env.HOME;
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const tempFolderName = "immovablesServerTempFolder";
    const targetPath = home + "/" + tempFolderName;
    if (homeDir.includes(tempFolderName)) {
      shell.exec(`rm -rf ${shellLink(targetPath)}`);
    }
    if (!homeDir.includes(this.serveFolderName)) {
      shell.exec(`mkdir ${shellLink(home)}/${this.serveFolderName}`);
    }
    shell.exec(`mkdir ${shellLink(targetPath)}`);


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
    for (let i of dateMatrix_flat) {
      shell.exec(`mkdir ${shellLink(targetPath)}/d${i}`);
      if (!serveFolderDir.includes(`d${i}`)) {
        shell.exec(`mkdir ${shellLink(home)}/${this.serveFolderName}/d${i}`);
      }
    }

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
    shell.exec(`rm -rf ${shellLink(targetPath)}`);

    return "done";

  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.addressInspection = async function (addressArr) {
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
    const inspection = async function (id, address) {
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
          }
        }
        if (targetIndex === null) {
          return { boo: false, message: "ERROR: 지번명 또는 도로명 알 수 없음" };
        }
        if (addressArr[targetIndex + 1] === undefined) {
          return { boo: false, message: "ERROR: 건물 번호 없음" };
        }
        if (/[로길]$/i.test(addressArr[targetIndex])) {
          if (addressArr[targetIndex + 1].replace(/[0-9\-\.]/gi, '') !== '') {
            return { boo: false, message: "ERROR: 건물 번호가 이상함" };
          }
        }

        searchResult = await instance.getAddress(address);
        if (searchResult === null) {
          return { boo: false, message: "ERROR: 검색 결과가 없음" };
        }

        first = addressArr[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '');
        road = searchResult.address.road.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '');
        parcel = searchResult.address.parcel.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '');
        if (first !== road && first !== parcel) {
          return { boo: false, message: "ERROR: 광역 단계 일치하지 않음" };
        }

        return { boo: true, message: "SUCCESS" };
      } catch (e) {
        console.log(e);
      }
    }
    let inspectionResult;

    failAddress = [];
    for (let { id, address } of addressArr) {
      inspectionResult = await inspection(id, address);
      if (!inspectionResult.boo) {
        failAddress.push({ id, address, message: inspectionResult.message });
      }
    }

    return failAddress;
  } catch (e) {
    console.log(e);
  }
}

module.exports = AddressParser;
