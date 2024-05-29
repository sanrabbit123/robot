const BackMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/backMaker";
  this.mapDir = this.dir + "/map";
  this.devMapDir = this.dir + "/devMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
  this.aliveDir = this.dir + "/alive";
  this.devAliveDir = this.dir + "/devAlive";
  this.idFilterDir = this.dir + "/idFilter";
}

// STATIC ------------------------------------------------------------------------------------

BackMaker.allDatabaseNames = [
  "mongoinfo",
  "backinfo",
  "pythoninfo",
];

BackMaker.coreDatabaseNames = [
  [
    "mongoinfo",
    [
      "aspirant",
      "builder",
      "client",
      "project",
      "designer",
      "contents",
      "user"
    ]
  ]
];

BackMaker.frontDatabaseNames = [
  [
    "mongoinfo",
    [
      "designer",
      "contents"
    ]
  ]
];

BackMaker.flatDeathCollections = [
  "aspirant",
  "client",
  "contents",
  "designer",
  "project",
];

BackMaker.filters = {
  emailFilter: function (str) {
    let strArr, email;
    strArr = str.split(' ');
    for (let i of strArr) {
      if (/@/.test(i)) { email = i; }
    }
    if (email !== undefined) {
      return email.trim();
    } else {
      return '';
    }
  },
  dateFilter: function (raw, mother) {
    const EMPTYDATE = "9999-09-09";
    const { a18_timeline } = mother;
    const currentDateRAW = a18_timeline.slice(0, 10).split('-');
    let currentDate = [];
    for (let i of currentDateRAW) {
      currentDate.push(Number(i));
    }
    let temp, result;

    //exception
    if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw)) {


      //six-wording
      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw.trim())) {
        // console.log("fix : (six-wording) " + raw + " => " + "20" + raw)
        return "20" + raw.trim();


      //first-month-error
      } else if (/^[0-9]+월[초]/.test(raw.trim())) {

        temp = Number(raw.trim().replace(/[^0-9]/g, ''));

        if (temp >= currentDate[1]) {
          result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
        } else {
          result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
        }

        // console.log("fix : (first-month-error) " + raw + " => " + result);
        return result;


      //first-hangul-error
      } else if (/\-[초]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '01';
        // console.log("fix : (first-hangul-error) " + raw + " => " + result);
        return result;


      //last-month-error
      } else if (/^[0-9]+월[말]/.test(raw.trim())) {

        temp = Number(raw.trim().replace(/[^0-9]/g, ''));

        if (temp >= currentDate[1]) {
          result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
        } else {
          result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
        }

        // console.log("fix : (last-month-error) " + raw + " => " + result);
        return result;


      //last-hangul-error
      } else if (/\-[말]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '28';
        // console.log("fix : (last-hangul-error) " + raw + " => " + result);
        return result;


      //middle-month-error
      } else if (/^[0-9]+월[중]/.test(raw.trim())) {

          temp = Number(raw.trim().replace(/[^0-9]/g, ''));

          if (temp >= currentDate[1]) {
            result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          } else {
            result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          }

          // console.log("fix : (middle-month-error) " + raw + " => " + result);
          return result;


      //middle-hangul-error
      } else if (/\-[중]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '15';
        // console.log("fix : (middle-hangul-error) " + raw + " => " + result);
        return result;


      //wait error
      } else if (/wait/g.test(raw.trim()) || /대기/g.test(raw.trim()) || /피드백/g.test(raw.trim()) || /여유/g.test(raw.trim()) || /미정/g.test(raw.trim())) {

          // console.log("fix : (wait error) " + raw + " => " + EMPTYDATE);
          return EMPTYDATE;


      //leave error
      } else if (/지남/g.test(raw.trim()) || /이미/g.test(raw.trim()) || /비어/g.test(raw.trim()) || /asap/g.test(raw.trim())) {

          // console.log("fix : (leave error) " + raw + " => " + a18_timeline.slice(0, 10));
          return a18_timeline.slice(0, 10);


      } else {
        // console.log(raw);
        return raw.replace(/\?/, '').trim();
      }
    } else {
      return raw.trim();
    }
  },
  selectionFilter: function (str, arr) {
    let tempReg;
    let index = 999;

    for (let i = 0; i < arr.length; i++) {
      tempReg = new RegExp(arr[i], "gi");
      if (tempReg.test(str.trim())) { index = i; }
    }

    if (index === 999) {
      return "알 수 없음";
    } else {
      return arr[index];
    }
  },
  hypenFilter: function (str) {
    if (str === '-') {
      return "";
    } else {
      return str;
    }
  },
  emptyDate: function () {
    return "9999-09-09";
  },
};

// METHOD ------------------------------------------------------------------------------------

BackMaker.prototype.bindDev = function () {
  this.aliveDir = this.devAliveDir;
  this.mapDir = this.devMapDir;
}

BackMaker.prototype.releaseDev = function () {
  this.aliveDir = this.dir + "/alive";
  this.mapDir = this.dir + "/map";
}

BackMaker.prototype.getMap = function (mode = "id", type = "array") {
  let map;
  if (mode === "id") {
    if (type === "array") {
      map = [
        { standard: "desid", method: "getDesignerById" },
        { standard: "cliid", method: "getClientById" },
        { standard: "proid", method: "getProjectById" },
        { standard: "conid", method: "getContentsById" },
        { standard: "aspid", method: "getAspirantById" },
        { standard: "serid", method: "getServiceById" },
        { standard: "nulid", method: "getNothingById" },
        { standard: "useid", method: "getUserById" },
      ];
    } else {
      map = {
        client: { standard: "cliid", method: "getClientById" },
        designer: { standard: "desid", method: "getDesignerById" },
        project: { standard: "proid", method: "getProjectById" },
        contents: { standard: "conid", method: "getContentsById" },
        aspirant: { standard: "aspid", method: "getAspirantById" },
        service: { standard: "serid", method: "getServiceById" },
        nothing: { standard: "nulid", method: "getNothingById" },
        user: { standard: "useid", method: "getUserById" },
      };
    }
    return map;
  }
}

BackMaker.prototype.getNothingById = async function (nulid) {
  const instance = this;
  try {
    const Nothing = function (id) {
      this.nulid = id;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.idMaker = function (pastId, generalMode = true) {
  const instance = this;
  const { orderSystem } = this.mother;
  const today = new Date();

  let thisId;
  let year, month, date, dateString;
  let initial;

  initial = pastId.slice(0, 1);

  year = today.getFullYear();
  month = today.getMonth() + 1;
  date = today.getDate();

  if (generalMode) {

    dateString = String(year).slice(2);
    if (month < 10) {
      dateString += '0' + String(month);
    } else {
      dateString += String(month);
    }

    if (pastId.slice(1, 5) === dateString) {
      thisId = initial + dateString + '_' + orderSystem("encode", orderSystem("decode", pastId) + 1);
    } else {
      thisId = initial + dateString + '_' + orderSystem("encode", 1);
    }

    return thisId;

  } else {

    const monthEncode = (num) => {
      const aCode = 'a'.charCodeAt(0);
      let arr = [];
      for (let i = 0; i < 12; i++) {
        if (i < 9) {
          arr.push(String(i + 1));
        } else {
          arr.push(String.fromCharCode(i - 9 + aCode));
        }
      }
      return arr[num];
    }
    const dateEncode = (num) => {
      const aCode = 'a'.charCodeAt(0);
      let arr = [];
      for (let i = 0; i < 32; i++) {
        if (i < 9) {
          arr.push(String(i + 1));
        } else {
          arr.push(String.fromCharCode(i - 9 + aCode));
        }
      }
      return arr[num];
    }

    dateString = String(year).slice(2);
    dateString += monthEncode(month - 1);
    dateString += dateEncode(date - 1);

    if (pastId.slice(1, 5) === dateString) {
      thisId = initial + dateString + '_' + orderSystem("encode", orderSystem("decode", pastId) + 1);
    } else {
      thisId = initial + dateString + '_' + orderSystem("encode", 1);
    }

    return thisId;

  }

}

BackMaker.prototype.idFilter = function (button) {
  const instance = this;
  this.button = button;
  try {
    const Filter = require(`${this.idFilterDir}/${this.button}.js`);
    return Filter;
  } catch (e) {
    console.log(e);
  }
}

// Authorization -----------------------------------------------------------------------------

BackMaker.prototype.setAjaxAuthorization = async function () {
  const instance = this;
  const { cryptoString } = this.mother;
  try {
    let trapString;
    trapString = "";
    trapString += "SvgTong['___ABCMDA___'] = \"" + (await cryptoString("homeliaison13", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ABNEDA___'] = \"" + (await cryptoString("homeliaison14", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ABCGDA___'] = \"" + (await cryptoString("homeliaison15", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___YBCEDA___'] = \"" + (await cryptoString("homeliaison41", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ZBCDEA___'] = \"" + (await cryptoString("homeliaison42", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ACYEDA___'] = \"" + (await cryptoString("homeliaison43", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___AUDEDA___'] = \"" + (await cryptoString("homeliaison44", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___AXCEAB___'] = \"" + (await cryptoString("homeliaison45", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ABCEQB___'] = \"" + (await cryptoString("homeliaison46", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ABQEDB___'] = \"" + (await cryptoString("homeliaison47", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___AACEXB___'] = \"" + (await cryptoString("homeliaison48", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___AXCKDC___'] = \"" + (await cryptoString("homeliaison49", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___XBVEDC___'] = \"" + (await cryptoString("homeliaison50", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___AICEDC___'] = \"" + (await cryptoString("homeliaison51", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ARCEMC___'] = \"" + (await cryptoString("homeliaison52", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___ABRMDD___'] = \"" + (await cryptoString("homeliaison53", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UBCDEC___'] = \"" + (await cryptoString("homeliaison82", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___URAGEN___'] = \"" + (await cryptoString("homeliaison83", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UUDEDC___'] = \"" + (await cryptoString("homeliaison84", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UXCEAA___'] = \"" + (await cryptoString("homeliaison85", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UBCEQE___'] = \"" + (await cryptoString("homeliaison86", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UBQEDR___'] = \"" + (await cryptoString("homeliaison87", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UACEXU___'] = \"" + (await cryptoString("homeliaison88", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___URCENN___'] = \"" + (await cryptoString("homeliaison92", instance.address.s3info.boto3.key)) + "\";\n\n";
    trapString += "SvgTong['___UZRGDR___'] = \"" + (await cryptoString("homeliaison95", instance.address.s3info.boto3.key)) + "\";\n\n";
    return trapString;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getAjaxAuthorization = async function () {
  const instance = this;
  const { cryptoString } = this.mother;
  try {
    return ("Basic " + (await cryptoString("homeliaison83", instance.address.s3info.boto3.key)));
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.setInfoObj = async function (option = { selfMongo: null, getMode: false }) {
  const instance = this;
  const { mongo, mongoinfo, fileSystem } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  try {
    const infoPath = `${process.cwd()}/apps/infoObj.js`;
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(`info`).find({ "classification.id": 0 }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(`info`).find({ "classification.id": 0 }).toArray();
    }

    if (arr.length === 0) {
      console.log("\x1b[32m", "there is no info object");
      return false;
    }

    arr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
    target = arr[0];

    if (option.getMode === true) {
      return target.info;
    } else {
      console.log("\x1b[32m%s\x1b[0m", "info set complete");
      await fileSystem(`write`, [ infoPath, `module.exports = ${JSON.stringify(target.info, null, 2)}` ]);
      return true;
    }

  } catch (e) {
    console.log(e);
    return false;
  }
}

BackMaker.prototype.updateInfoObj = async function (option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, fileSystem, equalJson } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  try {
    const infoPath = `${process.cwd()}/apps/infoObj.js`;
    let target, json;

    target = equalJson(JSON.stringify(require(infoPath)));
    json = {
      date: new Date(),
      classification: {
        id: 0,
        name: "core",
      },
      info: target
    };

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(`info`).insertOne(json);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(`info`).insertOne(json);
    }

    console.log("\x1b[32m%s\x1b[0m", "info update complete");
    return true;

  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.setMemberObj = async function (option = { selfMongo: null, getMode: false }) {
  const instance = this;
  const { mongo, mongoinfo, fileSystem } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  try {
    const infoPath = `${process.cwd()}/apps/memberObj.js`;
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(`info`).find({ "classification.id": 1 }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(`info`).find({ "classification.id": 1 }).toArray();
    }

    if (arr.length === 0) {
      console.log("\x1b[32m", "there is no member object");
      return false;
    }

    arr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
    target = arr[0];

    if (option.getMode === true) {
      return target.info;
    } else {
      console.log("\x1b[32m%s\x1b[0m", "member set complete");
      await fileSystem(`write`, [ infoPath, `module.exports = ${JSON.stringify(target.info, null, 2)}` ]);
      return true;
    }

  } catch (e) {
    console.log(e);
    return false;
  }
}

BackMaker.prototype.updateMemberObj = async function (option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, fileSystem, equalJson } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  try {
    const infoPath = `${process.cwd()}/apps/memberObj.js`;
    let target, json;

    target = equalJson(JSON.stringify(require(infoPath)));
    json = {
      date: new Date(),
      classification: {
        id: 1,
        name: "member",
      },
      info: target
    };

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(`info`).insertOne(json);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(`info`).insertOne(json);
    }

    console.log("\x1b[32m%s\x1b[0m", "member update complete");
    return true;

  } catch (e) {
    console.log(e);
  }
}

// GET Client --------------------------------------------------------------------------------

BackMaker.prototype.getClientById = async function (cliid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "client";
  let { Client, Clients } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ cliid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ cliid }).toArray();
    }

    if (option.withTools) {
      const { Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
    }

    if (arr.length > 0) {
      target = new Client(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "client";
  let { Client, Clients } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, clientsArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "requests.0.request.timeline": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    } else {
      const { Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
      Clients = Tools.withToolsArr(Clients);
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    }

    if (option.toNormal === true) {
      clientsArr = clientsArr.toNormal();
    }

    return clientsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientsAll = async function (option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "client";
  let { Client, Clients } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      await MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    if (!option.withTools) {
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    } else {
      const { Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
      Clients = Tools.withToolsArr(Clients);
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    }

    if (option.toNormal === true) {
      clientsArr = clientsArr.toNormal();
    }

    return clientsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateClient = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "client";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteClient = async function (cliid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "client";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ cliid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ cliid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnClientDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/client.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BackMaker.prototype.returnClientRequest = function () {
  const instance = this;
  const map = require(`${this.mapDir}/client.js`);
  let request;
  request = map.sub("requests");
  return request;
}

BackMaker.prototype.createClient = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "client";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/client.js`);
  try {
    let dummy, latestClient, latestClientArr;
    let newOption = {};
    let requestDummy;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "cliid": -1 };
    newOption.limit = 1;

    latestClientArr = await this.getClientsByQuery({}, newOption);
    latestClient = latestClientArr[0];
    dummy = map.main();
    requestDummy = map.sub("requests");
    dummy.structure.requests.unshift(requestDummy);
    dummy.structure.cliid = this.idMaker(latestClient.cliid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateClient([ { cliid: dummy.structure.cliid }, updateQuery ], option);

    return dummy.structure.cliid;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientReport = async function () {
  const instance = this;
  const { errorLog } = this.mother;
  try {
    const ratioParsing = (num) => { return `${String(Math.round(num * 100 * 10) / 10)}%`; }

    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `client report start ==================================================`);
    const clients = await this.getClientsByQuery({}, { withTools: true });
    console.log(`load client success`);
    const projects = await this.getProjectsByQuery({}, { withTools: true });
    console.log(`load project success`);
    const clientsReport = clients.getRequestsTongsMonthly().reportAll();

    let tempObj;
    let proposalNum, contractNum;

    for (let report of clientsReport) {
      console.log(`\x1b[33m%s\x1b[0m`, `parsing report : ${report.date}`);
      for (let key in report) {
        if (typeof report[key] === "object") {
          if (!(report[key] instanceof Date) && report[key].detail !== undefined) {

            proposalNum = 0;
            contractNum = 0;

            for (let obj of report[key].detail) {
              tempObj = this.getProjectsByCliidArr(obj.cliidArr, { withTools: true, recycle: projects }).returnAverage().averageReport();
              obj.proidArr = tempObj.proidArr;
              obj.proposal = tempObj.proposal;
              proposalNum += tempObj.proposal;
              if (obj.value !== 0) {
                obj.proposalRatio = ratioParsing(tempObj.proposal / obj.value);
              } else {
                obj.proposalRatio = ratioParsing(0);
              }
              obj.contract = tempObj.contract;
              contractNum += tempObj.contract;
              if (obj.value !== 0) {
                obj.contractRatio = ratioParsing(tempObj.contract / obj.value);
              } else {
                obj.contractRatio = ratioParsing(0);
              }
              obj.average = tempObj.average;
              obj.ratioObject = {};
            }

            report.proposalTotal = proposalNum;
            report.contactTotal = contractNum;

            for (let obj of report[key].detail) {
              obj.ratioObject.value = obj.ratio;
              obj.ratioObject.proposal = ratioParsing(obj.proposal / proposalNum);
              obj.ratioObject.contract = ratioParsing(obj.contract / contractNum);
              obj.ratioObject.proposal_inValue = obj.proposalRatio;
              obj.ratioObject.contract_inValue = obj.contractRatio;
              delete obj.ratio;
              delete obj.proposalRatio;
              delete obj.contractRatio;
              obj.ratio = JSON.parse(JSON.stringify(obj.ratioObject));
              delete obj.ratioObject;
            }

          }
        }
      }
    }

    clientsReport.constructor.prototype.getMatrix = function () {
      const targetArr = [
        { name: "금액별", target: "budget" },
        { name: "지역별", target: "address" },
        { name: "평수별", target: "pyeong" },
        { name: "거주중", target: "living" },
        { name: "계약별", target: "contract" },
        { name: "이사일", target: "movingDay" },
      ];
      const constColumns = [
        { name: "문의", target: "value" },
        { name: "제안", target: "proposal" },
        { name: "진행", target: "contract" },
        { name: "제안 금액 평균", target: "average.proposal" },
        { name: "진행 제안 금액 평균", target: "average.contract" },
        { name: "문의율", target: "ratio.value" },
        { name: "제안율", target: "ratio.proposal" },
        { name: "진행률", target: "ratio.contract" },
        { name: "문의중 제안율", target: "ratio.proposal_inValue" },
        { name: "문의중 진행율", target: "ratio.contract_inValue" },
      ];
      let result = [];
      let tempArr;
      let tempColumnArr, finalObj;

      if (this.length > 0) {
        for (let t = 0; t < targetArr.length; t++) {

          tempArr = [ targetArr[t].name ];
          for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < constColumns.length; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);

          tempArr = [ "기간" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].name);
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);

          tempArr = [ "항목" ];
          for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < constColumns.length; j++) {
              tempArr.push(constColumns[j].name);
            }
          }
          result.push(tempArr);

          for (let i = 0; i < this[0][targetArr[t].target].detail.length; i++) {
            tempArr = [ this[0][targetArr[t].target].detail[i].name ];
            for (let j = 0; j < this.length; j++) {
              for (let k = 0; k < constColumns.length; k++) {
                tempColumnArr = constColumns[k].target.split('.');
                finalObj = this[j][targetArr[t].target].detail[i];
                for (let z of tempColumnArr) {
                  finalObj = finalObj[z];
                }
                tempArr.push(finalObj);
              }
            }
            result.push(tempArr);
          }

          tempArr = [ "평균값" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i][targetArr[t].target].average === null ? "" : this[i][targetArr[t].target].average);
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);


          tempArr = [ "문의" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].total);
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);

          tempArr = [ "제안" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].proposalTotal);
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);


          tempArr = [ "진행" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].contactTotal);
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);

          result.push([ "" ]);
          result.push([ "" ]);

        }
      } else {
        result = null;
      }

      return result
    }

    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `client report end ====================================================`);

    return clientsReport;
  } catch (e) {
    await errorLog("리포트 분석 생김 : " + e.message);
  }
}

BackMaker.prototype.getCaseProidById = async function (id, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  try {
    if (typeof id !== "string") {
      throw new Error("must be cliid");
    }
    if (typeof option !== "object" || Array.isArray(option)) {
      throw new Error("invaild option input");
    }
    if (option.withTools !== true) {
      option.withTools = true;
    }
    const ago = new Date();
    ago.setMonth(ago.getMonth() - 24);
    const clients = await this.getClientsByQuery({ "requests.0.request.timeline": { $gte: ago } }, { withTools: true, ...option });
    const projects = await this.getProjectsByQuery({ "proposal.date": { $gte: ago } }, { withTools: true, ...option });
    const cases = clients.getType().getTypeCases(projects);
    const targetClient = await this.getClientById(id, option);
    if (targetClient === null) {
      return null;
    } else {
      const ClientCase = function (client, cases) {
        this.client = client;
        this.cases = cases;
      }
      ClientCase.prototype.caseProposal = function () {
        const { cases } = this;
        let contract, proposal, final;
        contract = [];
        proposal = [];
        for (let { proidArr, contractArr } of cases) {
          contract = contract.concat(contractArr);
          proposal = proposal.concat(proidArr);
        }
        contract = Array.from(new Set(contract));
        proposal = Array.from(new Set(proposal));
        proposal = proposal.filter((p) => { return !contract.includes(p); });
        contract.sort();
        proposal.sort();
        final = proposal.concat(contract).reverse();
        return final.map((proid) => { return projects.search(proid); });
      }
      ClientCase.prototype.caseService = function () {
        const projectArr = this.caseProposal();
        const serviceArr = projectArr.map((project) => {
          let serviceObj = JSON.parse(JSON.stringify(project.service));
          let length, total;
          let average;
          length = 0;
          total = 0;
          for (let { fee } of project.proposal.detail) {
            for (let { amount } of fee) {
              length = length + 1;
              total = total + amount;
            }
          }
          if (length === 0) {
            average = 0;
          } else {
            average = Math.round((total / length) / 1000) * 1000;
          }
          serviceObj.average = average;
          return serviceObj;
        });
        if (serviceArr.length === 0) {
          return null;
        } else {
          let seridArr, xValueArr;
          let seridObj, xValueObj;
          let tempArr, tempNum;
          let average;

          seridArr = serviceArr.map((obj) => { return obj.serid; });
          xValueArr = serviceArr.map((obj) => { return obj.xValue; });

          seridObj = {};
          for (let s of seridArr) {
            if (seridObj[s] === undefined) {
              seridObj[s] = 1;
            } else {
              seridObj[s] = seridObj[s] + 1;
            }
          }

          xValueObj = {};
          for (let s of xValueArr) {
            if (xValueObj[s] === undefined) {
              xValueObj[s] = 1;
            } else {
              xValueObj[s] = xValueObj[s] + 1;
            }
          }

          seridArr = [];
          for (let i in seridObj) {
            seridArr.push({ serid: i, number: seridObj[i] });
          }

          xValueArr = [];
          for (let i in xValueObj) {
            xValueArr.push({ xValue: i, number: xValueObj[i] });
          }

          seridArr.sort((a, b) => { return b.number - a.number; });
          xValueArr.sort((a, b) => { return b.number - a.number; });

          for (let obj of seridArr) {
            tempArr = serviceArr.filter((s) => { return s.serid === obj.serid; });
            tempNum = 0;
            obj.fee = [];
            for (let t of tempArr) {
              tempNum += t.average;
              obj.fee.push(t.average);
            }
            average = 0;
            if (tempArr.length !== 0) {
              average = Math.round((tempNum / tempArr.length) / 1000) * 1000;
            }
            obj.average = average;
          }

          if (seridArr.length === 0 || xValueArr.length === 0) {
            return null;
          } else {
            return { serid: seridArr, xValue: xValueArr };
          }
        }
      }
      const resultObj = new ClientCase(targetClient, cases.parsingCases(targetClient));
      return resultObj;
    }
  } catch (e) {
    console.log(e);
  }
}

// GET Contents --------------------------------------------------------------------------------

BackMaker.prototype.getContentsById = async function (conid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ conid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ conid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    if (arr.length > 0) {
      target = new Contents(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsByPid = async function (pid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    if (arr.length > 0) {
      target = new Contents(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsArrByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, contentsArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "contents.portfolio.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined && option.limit !== null) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined && option.limit !== null) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      contentsArr = new ContentsArr();
      for (let i of tong) {
        contentsArr.push(new Contents(i));
      }
    } else {
      Contents = Tools.withTools(Contents);
      ContentsArr = Tools.withToolsArr(ContentsArr);
      contentsArr = new ContentsArr();
      for (let i of tong) {
        contentsArr.push(new Contents(i));
      }
    }

    if (option.toNormal === true) {
      contentsArr = contentsArr.toNormal();
    }

    return contentsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsArrAll = async function (option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      await MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    if (!option.withTools) {
      projectsArr = new ContentsArr();
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    } else {
      Contents = Tools.withTools(Contents);
      ContentsArr = Tools.withToolsArr(ContentsArr);
      projectsArr = new ContentsArr();
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    }

    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateContents = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteContents = async function (conid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ conid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ conid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createContents = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "contents";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/contents.js`);
  try {
    let dummy, latestContents, latestContentsArr;
    let newOption = {};

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "conid": -1 };
    newOption.limit = 1;

    latestContentsArr = await this.getContentsArrByQuery({}, newOption);
    latestContents = latestContentsArr[0];
    dummy = map.main();
    dummy.structure.conid = this.idMaker(latestContents.conid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateContents([ { conid: dummy.structure.conid }, updateQuery ], option);

    return dummy.structure.conid;
  } catch (e) {
    console.log(e);
  }
}

// GET Service --------------------------------------------------------------------------------

BackMaker.prototype.getServiceById = async function (serid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "service";
  let { Service, Services, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ serid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ serid }).toArray();
    }

    if (option.withTools) {
      Service = Tools.withTools(Service);
    }

    if (arr.length > 0) {
      target = new Service(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getServiceByKey = async function (key, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "service";
  let { Service, Services, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ key }).sort({ date: -1 }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ key }).sort({ date: -1 }).toArray();
    }

    if (option.withTools) {
      Service = Tools.withTools(Service);
    }

    if (arr.length > 0) {
      target = new Service(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getServicesByKind = async function (kind, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "service";
  let { Service, Services, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, servicesArr;
    let sortQuery;
    let keyArr;
    let newTong;

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).toArray();
      }
    }

    tong.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });
    newTong = [];
    keyArr = [];
    for (let obj of tong) {
      if (!keyArr.includes(obj.key)) {
        newTong.push(obj);
      }
      keyArr.push(obj.key);
    }

    if (!option.withTools) {
      servicesArr = new Services();
      for (let i of newTong) {
        servicesArr.push(new Service(i));
      }
    } else {
      Service = Tools.withTools(Service);
      Services = Tools.withToolsArr(Services);
      servicesArr = new Services();
      for (let i of newTong) {
        servicesArr.push(new Service(i));
      }
    }

    if (option.toNormal === true) {
      servicesArr = servicesArr.toNormal();
    }

    return servicesArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getServicesByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "service";
  let { Service, Services, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, servicesArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      servicesArr = new Services();
      for (let i of tong) {
        servicesArr.push(new Service(i));
      }
    } else {
      Service = Tools.withTools(Service);
      Services = Tools.withToolsArr(Services);
      servicesArr = new Services();
      for (let i of tong) {
        servicesArr.push(new Service(i));
      }
    }

    if (option.toNormal === true) {
      servicesArr = servicesArr.toNormal();
    }

    return servicesArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateService = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "service";
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    let latestServiceArr, latestService;
    let newOption, newId;
    let targetDummyArr, targetDummy;

    newOption = {};
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "serid": -1 };
    newOption.limit = 1;

    latestServiceArr = await this.getServicesByQuery({}, newOption);
    latestService = latestServiceArr[0];

    newId = this.idMaker(latestService.serid);

    targetDummyArr = await this.getServicesByQuery(whereQuery, { selfMongo: option.selfMongo, sort: { date: -1 }, limit: 1 });
    if (targetDummyArr.length > 0) {
      [ targetDummy ] = targetDummyArr;
      targetDummy = targetDummy.toNormal();
      targetDummy.serid = newId;
      updateQuery.date = new Date();

      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        await MONGOC.db(`miro81`).collection(button).insertOne(targetDummy);
        await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
        await MONGOC.close();
      } else {
        await option.selfMongo.db(`miro81`).collection(button).insertOne(targetDummy);
        await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      }

    }
    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.createService = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "service";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/service.js`);
  try {
    let dummy, dummySetting, latestService, latestServiceArr;
    let newOption = {};
    let tempArr;
    let target;

    if (typeof updateQuery.kind !== "string") {
      throw new Error("must be kind");
    }

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "serid": -1 };
    newOption.limit = 1;

    latestServiceArr = await this.getServicesByQuery({}, newOption);
    latestService = latestServiceArr[0];

    dummy = map.main(updateQuery.kind);
    dummy.structure.serid = this.idMaker(latestService.serid);

    for (let i in updateQuery) {
      if (i !== "serid") {
        tempArr = i.split('.');
        target = dummy.structure;
        for (let j = 0; j < tempArr.length - 1; j++) {
          target = target[tempArr[j]]
        }
        target[tempArr[tempArr.length - 1]] = updateQuery[i];
      }
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    return dummy.structure.serid;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteService = async function (serid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "service";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ serid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ serid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

// GET Designer --------------------------------------------------------------------------------

BackMaker.prototype.getDesignerById = async function (desid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ desid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ desid }).toArray();
    }

    if (option.withTools) {
      Designer = Tools.withTools(Designer);
    }

    if (arr.length > 0) {
      target = new Designer(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getDesignersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, designersArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "information.contract.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    } else {
      Designer = Tools.withTools(Designer);
      Designers = Tools.withToolsArr(Designers);
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    }

    if (option.toNormal === true) {
      designersArr = designersArr.toNormal();
    }

    return designersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getDesignersAll = async function (option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, designersArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      await MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    if (!option.withTools) {
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    } else {
      Designer = Tools.withTools(Designer);
      Designers = Tools.withToolsArr(Designers);
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    }

    if (option.toNormal === true) {
      designersArr = designersArr.toNormal();
    }

    return designersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateDesigner = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "designer";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteDesigner = async function (desid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "designer";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ desid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ desid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createDesigner = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "designer";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/designer.js`);
  try {
    let dummy, dummySetting, latestDesigner, latestDesignerArr;
    let newOption = {};
    let temp0, temp1;
    let matrixStandard0, matrixStandard1, matrixStandard2;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "desid": -1 };
    newOption.limit = 1;

    latestDesignerArr = await this.getDesignersByQuery({}, newOption);
    latestDesigner = latestDesignerArr[0];

    dummy = map.main();
    dummySetting = function (num) {
      let settingObj;
      settingObj = map.sub("setting.proposal");
      settingObj.name = "기본 세팅 " + String(num);
      return JSON.parse(JSON.stringify(settingObj));
    }
    dummy.structure.desid = this.idMaker(latestDesigner.desid);
    dummy.structure.information.did = 'd' + String(Number(latestDesigner.information.did.replace(/[^0-9]/gi, '')) + 1);
    for (let i = 0; i < 5; i++) {
      dummy.structure.setting.proposal.push(dummySetting(i));
    }

    matrixStandard0 = [ 'F', 'S', 'T', 'XT' ];
    matrixStandard1 = [ 'mini', 'normal', 'premium' ];

    for (let i = 0; i < matrixStandard0.length; i++) {
      temp0 = [];
      for (let j = 0; j < matrixStandard1.length; j++) {
        temp0.push(0);
      }
      dummy.structure.analytics.project.matrix.push(temp0);
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateDesigner([ { desid: dummy.structure.desid }, updateQuery ], option);

    //set setting note
    const AppleNotes = require(`${process.cwd()}/apps/appleAPIs/appleNotes.js`);
    const thisDesigner = await this.getDesignerById(dummy.structure.desid, option);
    const br = "<br><br>";
    let note, body, front;

    front = thisDesigner.setting.front;
    body = '';
    body += thisDesigner.designer;
    body += br;
    body += "_desktop";
    body += br;
    for (let i of thisDesigner.setting.front.introduction.desktop) {
      body += i;
      body += br;
    }
    body += "_mobile";
    body += br;
    for (let i of thisDesigner.setting.front.introduction.mobile) {
      body += i;
      body += br;
    }
    body += "_method";
    body += br;
    for (let i of thisDesigner.setting.front.methods) {
      body += i;
      body += br;
    }
    body += "_porlid";
    body += br;
    body += thisDesigner.setting.front.photo.porlid;
    body += br;
    body += "_index";
    body += br;
    body += thisDesigner.setting.front.photo.index;
    body += br;
    body += "_order";
    body += br;
    body += String(thisDesigner.setting.front.order);

    note = new AppleNotes({ folder: "designer", subject: thisDesigner.desid });
    await note.createNote(body);

    return dummy.structure.desid;
  } catch (e) {
    console.log(e);
  }
}

// GET Project --------------------------------------------------------------------------------

BackMaker.prototype.getProjectById = async function (proid, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "project";
  let { Project, Projects, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ proid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ proid }).toArray();
    }

    if (option.withTools) {
      Project = Tools.withTools(Project);
    }

    if (arr.length > 0) {
      target = new Project(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "project";
  let { Project, Projects, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, projectsArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "proposal.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      Project = Tools.withTools(Project);
      Projects = Tools.withToolsArr(Projects);
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    }

    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsAll = async function (option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "project";
  let { Project, Projects, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      await MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      Project = Tools.withTools(Project);
      Projects = Tools.withToolsArr(Projects);
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    }

    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsByCliidArr = function (cliidArr, option = { withTools: false, selfMongo: null, recycle: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const button = "project";
  let { Project, Projects, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  let projects;

  if (option.recycle !== undefined && option.recycle !== null) {
    projects = option.recycle;
    if (option.withTools === true) {
      Projects = Tools.withToolsArr(Projects);
    }
    let result = (option.toNormal === true) ? [] : new Projects();
    for (let p of projects) {
      if (cliidArr.includes(p.cliid)) {
        result.push(p);
      }
    }
    return result;

  } else {
    const { mongo, mongoinfo } = this.mother;
    const MONGOC = new mongo(mongoinfo);
    return new Promise(function (resolve, reject) {
      instance.getProjectsByQuery({}, option).then((projects) => {
        if (option.withTools === true) {
          Projects = Tools.withToolsArr(Projects);
        }
        let result = (option.toNormal === true) ? [] : new Projects();
        for (let p of projects) {
          if (cliidArr.includes(p.cliid)) {
            result.push(p);
          }
        }
        resolve(result);
      }).catch(function (e) {
        reject(e);
      });
    });
  }

}

BackMaker.prototype.getProjectsByNames = async function (nameArr, option = { withTools: false, selfMongo: null, devAlive: false, toNormal: false }) {
  const instance = this;
  let confirmMode = false;
  try {
    if (Array.isArray(nameArr)) {
      if (nameArr.length < 2) {
        throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
      }
    } else if (typeof nameArr === "object") {
      if (nameArr.client !== undefined && nameArr.designer !== undefined) {
        nameArr = [ nameArr.client, nameArr.designer ];
      } else if (nameArr.clientName !== undefined && nameArr.designerName !== undefined) {
        nameArr = [ nameArr.clientName, nameArr.designerName ];
      } else {
        throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
      }
      confirmMode = true;
    } else {
      throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
    }
    let searchQuery_client, searchQuery_designer;
    let clients, designers, projects;
    let allCases, tempArr;
    let whereQuery;

    searchQuery_client = {};
    searchQuery_client["$or"] = [];
    searchQuery_designer = {};
    searchQuery_designer["$or"] = [];

    if (!confirmMode) {
      for (let i of nameArr) {
        searchQuery_client["$or"].push({ name: i });
        searchQuery_designer["$or"].push({ designer: i });
      }
    } else {
      searchQuery_client = { name: nameArr[0] };
      searchQuery_designer = { designer: nameArr[1] };
    }

    clients = await this.getClientsByQuery(searchQuery_client, option);
    designers = await this.getDesignersByQuery(searchQuery_designer, option);

    if (clients.length === 0 || designers.length === 0) {
      return [];
    }

    allCases = [];
    for (let { cliid } of clients) {
      for (let { desid } of designers) {
        tempArr = [ cliid, desid ];
        allCases.push(tempArr);
      }
    }

    if (allCases.length === 0) {
      return [];
    }

    whereQuery = {};
    whereQuery["$or"] = [];
    for (let [ cliid, desid ] of allCases) {
      whereQuery["$or"].push({ cliid, desid });
    }

    projects = await this.getProjectsByQuery(whereQuery, option);

    return projects;

  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateProject = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "project";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteProject = async function (proid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "project";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ proid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ proid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnProjectDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/project.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BackMaker.prototype.createProject = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "project";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/project.js`);
  try {
    let dummy, latestProject, latestProjectArr;
    let newOption = {};
    let temp;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "proid": -1 };
    newOption.limit = 1;

    latestProjectArr = await this.getProjectsByQuery({}, newOption);
    latestProject = latestProjectArr[0];

    dummy = map.main();
    dummy.structure.proid = this.idMaker(latestProject.proid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateProject([ { proid: dummy.structure.proid }, updateQuery ], option);

    return dummy.structure.proid;
  } catch (e) {
    console.log(e);
  }
}

// GET Aspirant -------------------------------------------------------------------------------

BackMaker.prototype.getAspirantById = async function (aspid, option = { withTools: false, selfMongo: null, portfolioReset: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "aspirant";
  let { Aspirant, Aspirants, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ aspid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ aspid }).toArray();
    }

    if (option.withTools) {
      Aspirant = Tools.withTools(Aspirant);
    }

    if (arr.length > 0) {
      target = new Aspirant(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getAspirantsByQuery = async function (query, option = { withTools: false, selfMongo: null, portfolioReset: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "aspirant";
  let { Aspirant, Aspirants, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, aspirantsArr;
    let sortQuery;
    let updateQuery;

    if (option.sort === undefined) {
      sortQuery = { "submit.firstRequest.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (option.portfolioReset !== null && option.portfolioReset !== undefined) {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
      }
      for (let a of tong) {
        if (a.portfolio.length === 0) {
          for (let i of a.information.channel.web) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          for (let i of a.information.channel.sns) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          for (let i of a.information.channel.cloud) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          updateQuery = {};
          updateQuery["portfolio"] = a.portfolio;
          if (option.selfMongo === undefined || option.selfMongo === null) {
            await MONGOC.db(`miro81`).collection(button).updateOne({ aspid: a.aspid }, { "$set": updateQuery });
          } else {
            await option.selfMongo.db(`miro81`).collection(button).updateOne({ aspid: a.aspid }, { "$set": updateQuery });
          }
        }
      }
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.close();
      }
    }

    if (!option.withTools) {
      aspirantsArr = new Aspirants();
      for (let i of tong) {
        aspirantsArr.push(new Aspirant(i));
      }
    } else {
      Aspirant = Tools.withTools(Aspirant);
      Aspirants = Tools.withToolsArr(Aspirants);
      aspirantsArr = new Aspirants();
      for (let i of tong) {
        aspirantsArr.push(new Aspirant(i));
      }
    }

    if (option.toNormal === true) {
      aspirantsArr = aspirantsArr.toNormal();
    }

    return aspirantsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateAspirant = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "aspirant";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteAspirant = async function (aspid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "aspirant";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ aspid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ aspid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createAspirant = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "aspirant";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/aspirant.js`);
  try {
    let dummy, latestAspirant, latestAspirantArr;
    let newOption = {};
    let temp;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "aspid": -1 };
    newOption.limit = 1;

    latestAspirantArr = await this.getAspirantsByQuery({}, newOption);
    latestAspirant = latestAspirantArr[0];

    dummy = map.main();
    dummy.structure.aspid = this.idMaker(latestAspirant.aspid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateAspirant([ { aspid: dummy.structure.aspid }, updateQuery ], option);

    return dummy.structure.aspid;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.unshiftAspirantPortfolioConfirm = async function (whereQuery, position, date, who, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  try {
    if (whereQuery === undefined) {
      throw new Error("invaild where query : arguments must be { whereQuery: Object, position: number, date: Date, who: string ");
    }
    if (typeof position !== "number") {
      throw new Error("invaild position : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }
    if (!(date instanceof Date)) {
      throw new Error("invaild date : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }
    if (typeof who !== "string") {
      throw new Error("invaild who : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }

    let tempAspirants, tempAspirant;
    let updateQuery;

    tempAspirants = await this.getAspirantsByQuery(whereQuery, option);
    updateQuery = {};

    if (tempAspirants.length === 1) {
      tempAspirant = tempAspirants[0];
      if (tempAspirant.portfolio.length > 0) {
        tempAspirant.portfolio[position].confirm.unshift({ date, who });
        updateQuery["portfolio." + String(position) + ".confirm"] = tempAspirant.portfolio[position].confirm;
        await this.updateAspirant([ whereQuery, updateQuery ], option);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// GET builder --------------------------------------------------------------------------------

BackMaker.prototype.getBuilderById = async function (buiid, option = { withTools: false, selfMongo: null, portfolioReset: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "builder";
  let { Builder, Builders, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ buiid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ buiid }).toArray();
    }

    if (option.withTools) {
      Builder = Tools.withTools(Builder);
    }

    if (arr.length > 0) {
      target = new Builder(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getBuildersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "builder";
  let { Builder, Builders, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, buildersArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "information.contract.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      buildersArr = new Builders();
      for (let i of tong) {
        buildersArr.push(new Builder(i));
      }
    } else {
      Builder = Tools.withTools(Builder);
      Builders = Tools.withToolsArr(Builders);
      buildersArr = new Builders();
      for (let i of tong) {
        buildersArr.push(new Builder(i));
      }
    }

    if (option.toNormal === true) {
      buildersArr = buildersArr.toNormal();
    }

    return buildersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateBuilder = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "builder";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteBuilder = async function (buiid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "builder";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ buiid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ buiid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createBuilder = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "builder";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/builder.js`);
  try {
    let dummy, latestBuilder, latestBuilderArr;
    let newOption = {};
    let temp;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "buiid": -1 };
    newOption.limit = 1;

    latestBuilderArr = await this.getBuildersByQuery({}, newOption);
    latestBuilder = latestBuilderArr[0];

    dummy = map.main();
    dummy.structure.buiid = this.idMaker(latestBuilder.buiid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateBuilder([ { buiid: dummy.structure.buiid }, updateQuery ], option);

    return dummy.structure.buiid;
  } catch (e) {
    console.log(e);
  }
}

// GET user --------------------------------------------------------------------------------

BackMaker.prototype.getUserById = async function (useid, option = { withTools: false, selfMongo: null, portfolioReset: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "user";
  let { User, Users, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ useid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ useid }).toArray();
    }

    if (option.withTools) {
      User = Tools.withTools(User);
    }

    if (arr.length > 0) {
      target = new User(arr[0]);
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getUsersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false, toNormal: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }
  const button = "user";
  let { User, Users, Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, usersArr;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "request.timeline": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      await MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      usersArr = new Users();
      for (let i of tong) {
        usersArr.push(new User(i));
      }
    } else {
      User = Tools.withTools(User);
      Users = Tools.withToolsArr(Users);
      usersArr = new Users();
      for (let i of tong) {
        usersArr.push(new User(i));
      }
    }

    if (option.toNormal === true) {
      usersArr = usersArr.toNormal();
    }

    return usersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnUserDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/user.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BackMaker.prototype.updateUser = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "user";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteUser = async function (useid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "user";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ useid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ useid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createUser = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const button = "user";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/user.js`);
  try {
    let dummy, latestUser, latestUserArr;
    let newOption = {};
    let temp;

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "useid": -1 };
    newOption.limit = 1;

    latestUserArr = await this.getUsersByQuery({}, newOption);
    latestUser = latestUserArr[0];

    dummy = map.main();
    dummy.structure.useid = this.idMaker(latestUser.useid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateUser([ { useid: dummy.structure.useid }, updateQuery ], option);

    return dummy.structure.useid;
  } catch (e) {
    console.log(e);
  }
}

// GET history --------------------------------------------------------------------------------

BackMaker.prototype.getHistoryById = async function (method, id, option = { fromConsole: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    let arr, target;
    let collection, whereQuery;

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      whereQuery = { cliid: id };
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      whereQuery = { desid: id };
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      whereQuery = { proid: id };
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      whereQuery = { conid: id };
    } else {
      throw new Error("invalid method");
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    arr = await MONGOLOCALC.db(`miro81`).collection(collection).find(whereQuery).toArray();
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }
    if (arr.length > 0) {
      return arr[0];
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getHistoriesByQuery = async function (method, query, option = { fromConsole: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    let tong, sortQuery;
    let sortStandard, collection;

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      throw new Error("invalid method");
    }

    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1;
    } else {
      sortQuery = option.sort;
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
    }
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getHistoriesAll = async function (method, option = { fromConsole: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    let tong, sortQuery;
    let sortStandard, collection;

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      throw new Error("invalid method");
    }

    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1;
    } else {
      sortQuery = option.sort;
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find({}).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find({}).sort(sortQuery).toArray();
    }
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getHistoryProperty = async function (method, property, idArr = null, option = { fromConsole: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    let tong, sortQuery;
    let finalTong;
    let findQuery, projectQuery;
    let sortStandard, collection;
    let tempObj;
    let tongLeft;
    let tongIds;
    let createQuery;
    let idKeywords;

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
      idKeywords = 'c';
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
      idKeywords = 'd';
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
      idKeywords = 'p';
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
      idKeywords = 't';
    } else {
      throw new Error("invalid method");
    }

    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1;
    } else {
      sortQuery = option.sort;
    }

    projectQuery = {};
    if (property !== "$all") {
      projectQuery[sortStandard] = 1;
      if (typeof property === "string") {
        projectQuery[property] = 1;
      } else if (Array.isArray(property)) {
        for (let p of property) {
          projectQuery[p] = 1;
        }
      }
    }

    findQuery = { "$or": [] };
    if (idArr === null) {
      findQuery = {};
    } else if (Array.isArray(idArr)) {
      for (let c of idArr) {
        tempObj = {};
        tempObj[sortStandard] = c;
        findQuery["$or"].push(tempObj);
      }
    } else {
      throw new Error("invaild id arr");
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(findQuery).project(projectQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(findQuery).project(projectQuery).sort(sortQuery).toArray();
    }
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    if (idArr !== null) {
      if (idArr.length !== tong.length) {
        tongIds = [];
        for (let obj of tong) {
          tongIds.push(obj[sortStandard]);
        }
        tongLeft = [];
        for (let id of idArr) {
          if (!tongIds.includes(id)) {
            if ((new RegExp("^" + idKeywords)).test(id)) {
              tongLeft.push(id);
            }
          }
        }
        for (let id of tongLeft) {
          createQuery = {};
          createQuery[sortStandard] = id;
          await this.createHistory(method, createQuery, option);
          tong.push(await this.getHistoryById(method, id, option));
        }
      }
    }

    if (tong.length > 0) {
      finalTong = {};
      for (let obj of tong) {
        if (property !== "$all") {
          if (typeof property === "string") {
            finalTong[obj[sortStandard]] = obj[property];
          } else {
            delete obj._id;
            finalTong[obj[sortStandard]] = obj;
          }
        } else {
          delete obj._id;
          finalTong[obj[sortStandard]] = obj;
        }
      }
      return finalTong;
    } else {
      return null;
    }

  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateHistory = async function (method, queryArr, option = { fromConsole: false, selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    const [ whereQuery, updateQuery ] = queryArr;
    let collection;

    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    if (/client/gi.test(method)) {
      collection = "clientHistory";
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
    } else {
      throw new Error("invalid method");
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    await MONGOLOCALC.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
}

BackMaker.prototype.deleteHistory = async function (method, id, option = { fromConsole: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    let sortStandard, collection, deleteQuery;

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      throw new Error("invalid method");
    }

    deleteQuery = {};
    deleteQuery[sortStandard] = id;

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    await MONGOLOCALC.db(`miro81`).collection(collection).deleteOne(deleteQuery);
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnHistoryDummies = function (subject) {
  const instance = this;
  let dummy;
  if (subject === "project.purchase.requests") {
    dummy = {
      id: "",
      date: new Date(),
      name: "",
      description: "",
      items: []
    }
  } else if (subject === "project.purchase.requests.items") {
    dummy = {
      id: "",
      name: "",
      description: "",
      detail: {
        link: "",
        location: "",
        option: "",
      },
      unit: {
        ea: null,
        price: 0,
        number: 0,
      },
      amount: {
        supply: 0,
        vat: 0,
        consumer: 0,
        delivery: 0,
      },
    }
  }
  return dummy;
}

BackMaker.prototype.createHistory = async function (method = "client", updateQuery = {}, option = { fromConsole: false, selfMongo: null, secondMongo: null, defaultCheckMode: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo, objectDeepCopy } = this.mother;
  const defaultSerid = "s2011_aa02s";
  const defaultCheckKey = "curation.check";
  const defaultCheckObject = {
    serid: defaultSerid,
    construct: {
      entire: true,
      items: [],
      environment: 2,
    },
    budget: 5,
    furniture: [],
    fabric: [],
    expect: 2,
    purchase: null,
    family: null,
    age: null,
    time: [],
  };
  try {
    let MONGOLOCALC, SELFMONGOBOO;
    let dummy;
    let sortStandard, collection, whereQuery;
    let temp, tempArr;
    let projectManager;
    let resultObject;

    if (typeof method !== "string") {
      throw new Error("invalid method");
    }
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid update query");
    }
    if (typeof option !== "object" || option === null) {
      throw new Error("invalid option");
    }

    if (option.defaultCheckMode === true || option.defaultCheckMode === 1) {
      if (option.keyMode === true || option.keyMode === 1) {
        resultObject = {};
        resultObject[defaultCheckKey] = objectDeepCopy(defaultCheckObject);
        return resultObject;
      } else {
        return objectDeepCopy(defaultCheckObject);
      }
    }

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      SELFMONGOBOO = false;
      if (option.fromConsole) {
        MONGOLOCALC = new mongo(mongoconsoleinfo);
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo);
      }
    }

    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
      dummy = {
        cliid: updateQuery.cliid,
        history: "",
        space: "",
        construct: "",
        styling: "",
        budget: "",
        progress: "",
        important: false,
        issue: "",
        manager: "-",
        curation: {
          analytics: {
            page: [],
            update: [],
            submit: [],
            send: [],
            call: {
              out: [],
              in: []
            },
            full: false
          },
          style: [],
          image: [],
          service: {
            serid: [ defaultSerid ],
          },
          building: {
            type: "",
          },
          furniture: {
            ratio: 50,
            makeNeeds: {
              furniture: false,
              fabric: false,
            }
          },
          construct: {
            living: false,
            items: []
          },
          check: objectDeepCopy(defaultCheckObject),
        }
      };
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
      dummy = {
        desid: updateQuery.desid,
        important: false,
        history: "",
        career: "",
        issue: "",
        family: "",
        partner: "",
        craft: "",
        styling: "",
        reception: "",
        etc: "",
        manager: "-",
        console: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
        checklist: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
        report: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
        request: {
          analytics: {
            page: [],
            send: [],
          }
        },
        possible: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
        project: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
        schedule: {
          analytics: {
            page: [],
            update: [],
            send: [],
          },
        },
      };
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
      projectManager = '-';
      if (SELFMONGOBOO) {
        if (option.secondMongo !== undefined && option.secondMongo !== null) {
          temp = await this.getProjectById(updateQuery.proid, { selfMongo: option.secondMongo });
          if (temp !== null) {
            if (/^d/.test(temp)) {
              tempArr = await MONGOLOCALC.db("miro81").collection("designerHistory").find({ desid: temp.desid }).toArray();
              if (tempArr.length > 0) {
                projectManager = tempArr[0].manager;
              }
            }
          }
        }
      }
      dummy = {
        proid: updateQuery.proid,
        history: "",
        designer: "",
        client: "",
        photo: "",
        contents: {
          blog: {
            portfolio: {
              boo: false,
              date: new Date(1800, 0, 1),
              link: "",
            },
            review: {
              boo: false,
              date: new Date(1800, 0, 1),
              link: "",
            }
          },
          instagram: {
            portfolio: {
              boo: false,
              date: new Date(1800, 0, 1),
              link: "",
            },
            review: {
              boo: false,
              date: new Date(1800, 0, 1),
              link: "",
            }
          }
        },
        important: false,
        issue: "",
        request: {
          analytics: {
            make: [],
            page: [],
            update: [],
            send: [],
          },
          client: {
            name: "",
            phone: "",
            family: "",
            address: "",
            budget: "",
            etc: "",
          },
          space: {
            contract: "",
            precheck: "",
            empty: "",
            movein: "",
            special: "",
            composition: "",
          },
          service: {
            service: "",
            concept: "",
            construct: "",
            styling: ""
          },
          about: {
            when: [],
            where: [],
            site: [],
            construct: [],
            styling: [],
            budget: [],
            progress: [],
          }
        },
        construct: {
          name: "",
          address: "",
          payments: {
            first: {
              date: new Date(1800, 0, 1),
              etc: "",
            },
            start: {
              date: new Date(1800, 0, 1),
              etc: "",
            },
            middle: {
              date: new Date(1800, 0, 1),
              etc: "",
            },
            remain: {
              date: new Date(1800, 0, 1),
              etc: "",
            },
          }
        },
        schedule: {
          analytics: {
            make: [],
            page: [],
            update: [],
            send: [],
          },
          progress: {
            start: new Date(1800, 0, 1),
            complete: new Date(1800, 0, 1),
            send: new Date(1800, 0, 1),
          },
          contents: {
            title: "",
            description: "",
            color: "",
          },
          date: {
            start: new Date(1800, 0, 1),
            end: new Date(1800, 0, 1),
          },
          children: []
        },
        purchase: {
          analytics: {
            make: [],
            page: [],
            update: [],
            send: [],
          },
          date: new Date(1800, 0, 1),
          requests: []
        },
        manager: projectManager
      };
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
      dummy = {
        conid: updateQuery.conid,
        important: false,
        issue: "",
        manager: "-"
      };
    } else {
      throw new Error("invalid method");
    }

    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }
    await MONGOLOCALC.db(`miro81`).collection(collection).insertOne(dummy);
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    whereQuery = {};
    whereQuery[sortStandard] = updateQuery[sortStandard];

    await this.updateHistory(method, [ whereQuery, updateQuery ], option);

    return updateQuery[sortStandard];
  } catch (e) {
    console.log(e);
  }
}

// general mongo CRUD  --------------------------------------------------------------------

BackMaker.prototype.mongoCreate = async function (collection, json, option = { local: null, console: null, home: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo, hexaJson } = this.mother;
  try {

    let MONGOC;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      if (option.hexaMode === true) {
        json = await hexaJson(json, true);
      }
      await MONGOC.db(`miro81`).collection(collection).insertOne(json);
      await MONGOC.close();
    } else {
      if (option.hexaMode === true) {
        json = await hexaJson(json, true);
      }
      await option.selfMongo.db(`miro81`).collection(collection).insertOne(json);
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoRead = async function (collection, query, option = { local: null, console: null, home: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo, hexaJson } = this.mother;
  try {
    let MONGOC;
    let tong;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = null;
      if (option.sortQuery === undefined) {
        sortQuery = null;
      } else {
        sortQuery = option.sortQuery;
      }
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
        }
      }
      await MONGOC.close();
    } else {
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
        }
      }
    }

    if (option.hexaMode === true) {
      tong = await hexaJson(JSON.stringify(tong));
    }

    return tong;
  } catch (e) {
    console.log(e);
    return [];
  }
}

BackMaker.prototype.mongoPick = async function (collection, queryArr, option = { local: null, console: null, home: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo, hexaJson } = this.mother;
  try {
    let MONGOC;
    let tong;
    let cursor;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = null;
      if (option.sortQuery === undefined) {
        sortQuery = null;
      } else {
        sortQuery = option.sortQuery;
      }
    } else {
      sortQuery = option.sort;
    }

    if (!Array.isArray(queryArr)) {
      throw new Error("must be [ whereQuery, projectQuery ]");
    }
    if (!queryArr.every((o) => { return (typeof o === "object" && o !== null) })) {
      throw new Error("must be [ whereQuery, projectQuery ]");
    }
    if (queryArr.length !== 2) {
      throw new Error("must be [ whereQuery, projectQuery ]");
    }

    queryArr[1]["_id"] = 0;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).toArray();
        }
      }
      await MONGOC.close();
    } else {
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).toArray();
        }
      }
    }

    if (option.hexaMode === true) {
      tong = await hexaJson(JSON.stringify(tong));
    }

    return tong;
  } catch (e) {
    console.log(e);
    return [];
  }
}

BackMaker.prototype.mongoUpdate = async function (collection, queryArr, option = { local: null, console: null, home: null, python: null, selfMongo: null, unset: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    let MONGOC;
    let unsetBoo;
    let finalUpdateObj;

    if (option.unset === null || option.unset === false || option.unset === undefined) {
      unsetBoo = false;
    } else if (option.unset === true) {
      unsetBoo = true;
    }

    finalUpdateObj = {};
    if (!unsetBoo) {
      finalUpdateObj["$set"] = updateQuery;
    } else {
      finalUpdateObj["$unset"] = updateQuery;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(collection).updateOne(whereQuery, finalUpdateObj);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(collection).updateOne(whereQuery, finalUpdateObj);
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoDelete = async function (collection, query, option = { local: null, console: null, home: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo } = this.mother;
  try {
    let MONGOC;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(collection).deleteOne(query);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(collection).deleteOne(query);
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoListCollections = async function (option = { local: null, console: null, home: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongotestinfo } = this.mother;
  try {
    let MONGOC, allCollections_raw, allCollections;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo);
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo);
      } else if (option.log !== undefined && option.log !== null) {
        MONGOC = new mongo(mongotestinfo);
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo);
      } else {
        MONGOC = new mongo(mongoinfo);
      }
      await MONGOC.connect();
      allCollections_raw = await MONGOC.db(`miro81`).listCollections().toArray();
      await MONGOC.close();
    } else {
      allCollections_raw = await option.selfMongo.db(`miro81`).listCollections().toArray();
    }

    allCollections = [];
    for (let { name } of allCollections_raw) {
      allCollections.push(name);
    }

    return allCollections;
  } catch (e) {
    console.log(e);
  }
}

module.exports = BackMaker;
