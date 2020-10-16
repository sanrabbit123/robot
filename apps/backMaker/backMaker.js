const BackMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const NotionAPIs = require(process.cwd() + "/apps/notionAPIs/notionAPIs.js");
  this.mother = new Mother();
  this.notion = new NotionAPIs();
  this.dir = process.cwd() + "/apps/backMaker";
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
  this.aliveDir = this.dir + "/alive";
}

// STATIC ------------------------------------------------------------------------------------

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
}

// METHOD ------------------------------------------------------------------------------------

BackMaker.prototype.pastMap = function () {
  switch (this.button) {
    case "client":
      return { collection: "BC1_conlist", id: "a4_customernumber" };
      break;
    case "project":
      return { collection: "Project", id: "proid" };
      break;
  }
}

BackMaker.prototype.jsonStructure = function () {
  const instance = this;
  const map = require(`${this.mapDir}/${this.button}.js`);
  return function () {
    return JSON.parse(JSON.stringify(map));
  }
}

BackMaker.prototype.pastToJson = async function (cliid = "entire") {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const map = require(`${this.pastDir}/${this.button}/${this.button}.js`);
  const filter = map({ map: this.jsonStructure(this.button), Mother: this.mother, Notion: this.notion, Filters: BackMaker.filters });
  try {
    let row, tempArr, queryObj;
    const { collection, id } = this.pastMap();
    queryObj = {};
    queryObj[id] = 0;

    await MONGOC.connect();

    if (cliid === "entire") {
      row = await MONGOC.db("miro81").collection(collection).find({}).toArray();
    } else if (/^latest/.test(cliid)) {
      tempArr = cliid.split("_");
      queryObj[id] = -1;
      row = await MONGOC.db("miro81").collection(collection).find({}).sort(queryObj).limit(Number(tempArr[1].replace(/[^0-9]/g, ''))).toArray();
    } else {
      queryObj[id] = cliid;
      row = await MONGOC.db("miro81").collection(collection).find(queryObj).limit(1).toArray();
    }

    return (await filter(row));
  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
  }
}

BackMaker.prototype.subLogicToJson = async function (tong) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const targetDir = `${this.pastDir}/${this.button}/subLogic`;
    const targetDirArr = await fileSystem(`readDir`, [ targetDir ]);
    let tempFunc, funcs;

    funcs = [];
    for (let i of targetDirArr) { if (i !== `.DS_Store`) {
      funcs.push(require(targetDir + "/" + i));
    }}

    for (let i = 0; i < funcs.length; i++) {
      tempFunc = (funcs[i])({ Mother: this.mother, Notion: this.notion, Filters: BackMaker.filters });
      tong = await tempFunc(tong);
    }

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getTong = async function (cliid = "entire") {
  const instance = this;
  try {
    const tong = await this.pastToJson(cliid);
    const finalTong = await this.subLogicToJson(tong);
    return finalTong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.launching = async function (button) {
  const instance = this;
  const { fileSystem } = this.mother;
  this.button = button;
  try {
    let result = await this.pastToJson();
    await fileSystem(`write`, [ `${process.cwd()}/temp/project.json`, JSON.stringify(result, null, 2) ]);

    return result;
  } catch (e) {
    console.log(e);
  }
}

// GET Client --------------------------------------------------------------------------------

BackMaker.prototype.getClientById = async function (cliid, option = { withTools: false }) {
  const instance = this;
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong = await this.getTong(cliid);
    if (!option.withTools) {
      return new Client(tong[0]);
    } else {
      Client = Tools.widthTools(Client);
      return new Client(tong[0]);
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestClient = async function (option = { withTools: false }) {
  const instance = this;
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong = await this.getTong("latest_1");
    if (!option.withTools) {
      return new Client(tong[0]);
    } else {
      Client = Tools.widthTools(Client);
      return new Client(tong[0]);
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestClients = async function (number = 1, option = { withTools: false }) {
  const instance = this;
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    tong = await this.getTong("latest_" + String(number));

    if (!option.withTools) {
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    } else {
      Client = Tools.widthTools(Client);
      Clients = Tools.widthToolsArr(Clients);
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    }
    return clientsArr;
  } catch (e) {
    console.log(e);
  }
}



module.exports = BackMaker;
