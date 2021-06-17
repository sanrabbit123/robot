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
  this.token = {
    vworld: {
      url: "http://api.vworld.kr/req/search",
      key: "A9ECB4F3-AE34-3A28-AD0F-59DAA7AC0A0B"
    },
    googleDirections: {
      url: "https://maps.googleapis.com/maps/api/directions/json",
      key: "AIzaSyDL_6xND6KHPO5u6J6LIZCk0yMi1H_GnuY"
    }
  };
}

AddressParser.prototype.getAddress = async function (address, pointMode = false) {
  if (typeof address !== "string") {
    throw new Error("invaild input, address must be string");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  const { url, key } = this.token.vworld;
  try {
    let data, res, result;
    let tempArr, roadBoo;
    let index;

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

    data = {
      request: "search",
      key: key,
      type: "address",
      query: address,
      format: "json",
      errorformat: "json",
      category: (roadBoo ? "road" : "parcel")
    };
    res = await requestSystem(url, data, { method: "get" });

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
  if (typeof from !== "string" || typeof to !== "string") {
    throw new Error("invaild input => String: from address, String: to address");
  }
  const instance = this;
  const { requestSystem, stringToDate } = this.mother;
  const { url, key } = this.token.googleDirections;
  try {
    class Distance {
      constructor(m, s) {
        if (typeof m !== "number" || typeof s !== "number") {
          throw new Error("invaild input");
        }
        this.meters = m;
        this.seconds = s;
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
    let meters, seconds;

    departure_time = String(when.valueOf() / 1000);
    origin = await this.getAddress(from, true);
    destination = await this.getAddress(to, true);

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

    result = new Distance(meters, seconds);

    return result;
  } catch (e) {
    console.log(e);
  }
}

AddressParser.prototype.getTravelExpenses = async function (from, to, when = null) {
  if (typeof from !== "string" || typeof to !== "string") {
    throw new Error("invaild input => String: from address, String: to address");
  }
  const instance = this;
  const { autoComma } = this.mother;
  try {
    const mConst = 0.5;
    const sConst = 1.2;
    const distance = await this.getDistance(from, to, when);
    let m, s, result;

    result = null;

    if (distance === null) {
      return result;
    }

    m = distance.m;
    s = distance.s;
    result = (mConst * m) + (sConst * s);
    result = Math.round(result / 1000) * 1000;

    return {
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

module.exports = AddressParser;
