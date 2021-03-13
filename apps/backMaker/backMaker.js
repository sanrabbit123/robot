const BackMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/backMaker";
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
  this.aliveDir = this.dir + "/alive";
  this.idFilterDir = this.dir + "/idFilter";
}

// STATIC ------------------------------------------------------------------------------------

BackMaker.allDatabaseNames = [
  "mongoinfo",
  "backinfo",
  "pythoninfo",
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

BackMaker.prototype.idMaker = function (pastId) {
  const instance = this;
  const { orderSystem } = this.mother;
  const today = new Date();

  let thisId;
  let year, month, dateString;
  let initial, endInitial;

  initial = pastId.slice(0, 1);
  endInitial = pastId.slice(-1);

  year = today.getFullYear();
  month = today.getMonth();

  dateString = String(year).slice(2);
  if (month + 1 < 10) {
    dateString += '0' + String(month + 1);
  } else {
    dateString += String(month + 1);
  }

  if (pastId.slice(1, 5) === dateString) {
    thisId = initial + dateString + '_' + orderSystem("encode", orderSystem("decode", pastId) + 1) + endInitial;
  } else {
    thisId = initial + dateString + '_' + orderSystem("encode", 1) + endInitial;
  }

  return thisId;
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

BackMaker.prototype.updateDesid = async function () {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  const Filter = this.idFilter(button);
  try {
    await MONGOC.connect();
    let temp;
    let pastDesid, newDesid;
    let newString;

    // 1
    let designers = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
    for (let d of designers) {
      await MONGOC.db(`miro81`).collection(button).updateOne({ desid: d.desid }, { $set: { desid: Filter.pastToNew(d.desid) } });
      console.log("success");
    }


    // 2
    // const contents = await MONGOC.db(`miro81`).collection("contents").find({}).toArray();
    // for (let d of contents) {
    //   await MONGOC.db(`miro81`).collection("contents").updateOne({ desid: d.desid }, { $set: { desid: Filter.pastToNew(d.desid) } });
    //   console.log("success");
    // }


    // 3
    designers = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
    for (let { desid, setting: { proposal, ghost } } of designers) {

      for (let { photo } of proposal) {
        for (let photoObj of photo) {
          if (photoObj.styleText !== undefined) {
            if ((/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.styleText) !== null) {
              temp = (/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.styleText)[0];
              pastDesid = temp.split("/")[2];
              newDesid = Filter.pastToNew(pastDesid);
              newString = "/rawDesigner/ghost/" + newDesid;
              photoObj.styleText = photoObj.styleText.replace(/\/ghost\/de0[0-9][0-9]/g, newString);
            }
            if ((/\/list_image\/portp/g).exec(photoObj.styleText) !== null) {
              temp = (/\/list_image\/portp/g).exec(photoObj.styleText)[0];
              newString = "/corePortfolio/listImage/" + temp.replace(/\/list_image\/portp/g, '');
              photoObj.styleText = photoObj.styleText.replace(/\/list_image\/portp/g, newString);
            }
          }
          if (photoObj.imgSrc !== undefined) {
            if ((/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.imgSrc) !== null) {
              temp = (/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.imgSrc)[0];
              pastDesid = temp.split("/")[2];
              newDesid = Filter.pastToNew(pastDesid);
              newString = "/rawDesigner/ghost/" + newDesid;
              photoObj.imgSrc = photoObj.imgSrc.replace(/\/ghost\/de0[0-9][0-9]/g, newString);
            }
            if ((/\/list_image\/portp/g).exec(photoObj.imgSrc) !== null) {
              temp = (/\/list_image\/portp/g).exec(photoObj.imgSrc)[0];
              newString = "/corePortfolio/listImage/" + temp.replace(/\/list_image\/portp/g, '');
              photoObj.imgSrc = photoObj.imgSrc.replace(/\/list_image\/portp/g, newString);
            }
          }
        }
      }

      for (let ghostObj of ghost) {
        if ((/\/ghost\/de0[0-9][0-9]/g).exec(ghostObj.link) !== null) {
          temp = (/\/ghost\/de0[0-9][0-9]/g).exec(ghostObj.link)[0];
          pastDesid = temp.split("/")[2];
          newDesid = Filter.pastToNew(pastDesid);
          newString = "/rawDesigner/ghost/" + newDesid;
          ghostObj.link = ghostObj.link.replace(/\/ghost\/de0[0-9][0-9]/g, newString);
        }
      }

      await MONGOC.db(`miro81`).collection("designer").updateOne({ desid }, { $set: { "setting.proposal": proposal, "setting.ghost": ghost } });
      console.log("success");
    }


    // 4
    let project = await MONGOC.db(`miro81`).collection("project").find({}).toArray();
    for (let d of project) {
      await MONGOC.db(`miro81`).collection("project").updateOne({ desid: d.desid }, { $set: { desid: Filter.pastToNew(d.desid) } });
      console.log("success");
    }
    project = await MONGOC.db(`miro81`).collection("project").find({}).toArray();
    for (let d of project) {
      if (d.desid === null) {
        await MONGOC.db(`miro81`).collection("project").updateOne({ proid: d.proid }, { $set: { desid: '' } });
        console.log("success");
      }
    }


    // 5
    project = await MONGOC.db(`miro81`).collection("project").find({}).toArray();
    for (let { proposal: { detail } } of project) {
      for (let detailObj of detail) {
        detailObj.desid = Filter.pastToNew(detailObj.desid);
        for (let photoObj of detailObj.pictureSettings) {
          if (photoObj.styleText !== undefined) {
            if ((/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.styleText) !== null) {
              temp = (/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.styleText)[0];
              pastDesid = temp.split("/")[2];
              newDesid = Filter.pastToNew(pastDesid);
              newString = "/rawDesigner/ghost/" + newDesid;
              photoObj.styleText = photoObj.styleText.replace(/\/ghost\/de0[0-9][0-9]/g, newString);
            }
            if ((/\/list_image\/portp/g).exec(photoObj.styleText) !== null) {
              temp = (/\/list_image\/portp/g).exec(photoObj.styleText)[0];
              newString = "/corePortfolio/listImage/" + temp.replace(/\/list_image\/portp/g, '');
              photoObj.styleText = photoObj.styleText.replace(/\/list_image\/portp/g, newString);
            }
          }
          if (photoObj.imgSrc !== undefined) {
            if ((/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.imgSrc) !== null) {
              temp = (/\/ghost\/de0[0-9][0-9]/g).exec(photoObj.imgSrc)[0];
              pastDesid = temp.split("/")[2];
              newDesid = Filter.pastToNew(pastDesid);
              newString = "/rawDesigner/ghost/" + newDesid;
              photoObj.imgSrc = photoObj.imgSrc.replace(/\/ghost\/de0[0-9][0-9]/g, newString);
            }
            if ((/\/list_image\/portp/g).exec(photoObj.imgSrc) !== null) {
              temp = (/\/list_image\/portp/g).exec(photoObj.imgSrc)[0];
              newString = "/corePortfolio/listImage/" + temp.replace(/\/list_image\/portp/g, '');
              photoObj.imgSrc = photoObj.imgSrc.replace(/\/list_image\/portp/g, newString);
            }
          }
        }
      }
    }
    for (let { proid, proposal } of project) {
      await MONGOC.db(`miro81`).collection("project").updateOne({ proid }, { $set: { "proposal": proposal } });
      console.log("success");
    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
  }
}

BackMaker.prototype.historyParsing = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
  try {

    //client history

    let targets, targets2;
    let pastTong;
    let historyTong;
    let tempTong;
    let projectHistories;
    let tempArr;

    targets = [
      "a12_history",
      "a31_aboutsite",
      "a32_aboutcom",
      "a33_aboutsty",
      "a34_aboutmon",
      "a35_aboutetc",
    ];

    targets2 = [
      "history",
      "space",
      "construct",
      "styling",
      "budget",
      "progress",
    ];

    await MONGOC.connect();
    await MONGOLOCALC.connect();

    pastTong = await MONGOC.db(`miro81`).collection(`BC1_conlist`).find({}).toArray();

    historyTong = [];
    await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).deleteMany({});

    for (let p of pastTong) {
      tempTong = {};
      tempTong.cliid = p.a4_customernumber;
      tempTong.history = "";
      tempTong.space = "";
      tempTong.construct = "";
      tempTong.styling = "";
      tempTong.budget = "";
      tempTong.progress = "";

      if (p.a12_history !== "" && p.a12_history !== "-") {
        tempTong.history += p.a12_history;
      }
      if (p.a31_aboutsite !== "" && p.a31_aboutsite !== "-") {
        tempTong.space = p.a31_aboutsite;
      }
      if (p.a32_aboutcom !== "" && p.a32_aboutcom !== "-") {
        tempTong.construct = p.a32_aboutcom;
      }
      if (p.a33_aboutsty !== "" && p.a33_aboutsty !== "-") {
        tempTong.styling += p.a33_aboutsty;
      }
      if (p.a34_aboutmon !== "" && p.a34_aboutmon !== "-") {
        tempTong.budget = p.a34_aboutmon;
      }
      if (p.a35_aboutetc !== "" && p.a35_aboutetc !== "-") {
        tempTong.progress = p.a35_aboutetc;
      }

      historyTong.push(tempTong);
      await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).insertOne(tempTong);
    }

    //project history
    pastTong = await MONGOC.db(`miro81`).collection(`BP1_process`).find({}).toArray();

    projectHistories = [];
    await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).deleteMany({});

    for (let p of pastTong) {
      tempArr = await MONGOC.db(`miro81`).collection(`project`).find({ cliid: p.a4_customernumber }).toArray();
      if (tempArr.length > 0) {
        tempTong = {};
        tempTong.proid = "";
        tempTong.history = "";
        tempTong.designer = "";
        tempTong.client = "";
        tempTong.photo = "";

        tempTong.proid = tempArr[0].proid;

        if (p.z1_history1 !== "" && p.z1_history1 !== "-") {
          tempTong.history += p.z1_history1;
        }
        if (p.z2_history2 !== "" && p.z2_history2 !== "-") {
          tempTong.history += "\n\n";
          tempTong.history += p.z2_history2;
        }
        if (p.z3_history3 !== "" && p.z3_history3 !== "-") {
          tempTong.history += "\n\n";
          tempTong.history += p.z3_history3;
        }

        projectHistories.push(tempTong);
        await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).insertOne(tempTong);
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
    MONGOLOCALC.close();
  }
}

BackMaker.prototype.pastMap = function () {
  switch (this.button) {
    case "client":
      return { collection: "BC1_conlist", id: "a4_customernumber", time: "a18_timeline" };
      break;
    case "project":
      return { collection: "Project", id: "proid", time: "proid" };
      break;
    case "designer":
      return { collection: "BD2_deslist", id: "a4_desid", time: "a4_desid" };
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
  const { fileSystem, mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const map = require(`${this.pastDir}/${this.button}/${this.button}.js`);
  const filter = map({ map: this.jsonStructure(this.button), Mother: this.mother, Notion: {}, Filters: BackMaker.filters });
  try {
    let row, tempArr, queryObj;

    if (this.button !== "contents") {

      const { collection, id, time } = this.pastMap();
      queryObj = {};

      await MONGOC.connect();

      if (cliid === "entire") {
        row = await MONGOC.db("miro81").collection(collection).find({}).toArray();
      } else if (/^latest/.test(cliid)) {
        tempArr = cliid.split("_");
        queryObj[time] = -1;
        row = await MONGOC.db("miro81").collection(collection).find({}).sort(queryObj).limit(Number(tempArr[1].replace(/[^0-9]/g, ''))).toArray();
      } else {
        queryObj[id] = cliid;
        row = await MONGOC.db("miro81").collection(collection).find(queryObj).limit(1).toArray();
      }

    } else if (this.button === "contents") {

      let contentsResourceDir, contentsResourceDirRaw, contentsResourceArr;
      let contentsJson;

      contentsResourceDir = `${process.cwd()}/apps/contentsMaker/resource`;
      contentsResourceDirRaw = await fileSystem(`readDir`, [ contentsResourceDir ]);

      contentsResourceArr = [];
      for (let i of contentsResourceDirRaw) { if (i !== `.DS_Store`) {
        contentsResourceArr.push(i);
      }}

      row = [];
      for (let i of contentsResourceArr) {
        contentsJson = require(`${contentsResourceDir}/${i}`);
        row.push(contentsJson);
      }

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
      tempFunc = (funcs[i])({ Mother: this.mother, Notion: {}, Filters: BackMaker.filters });
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

BackMaker.prototype.pastToMongo = async function () {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  try {
    let tong, resultTong, finalTong;

    await MONGOC.connect();
    const target = [
      "client",
      "designer",
      "project",
    ];

    for (let t of target) {
      this.button = t;
      tong = await this.pastToJson("entire");
      resultTong = await this.subLogicToJson(tong);
      await MONGOC.db(`miro81`).collection(t).deleteMany({});
      for (let i of resultTong) {
        await MONGOC.db(`miro81`).collection(t).insertOne(i);
      }
      console.log(`${t} update success`);
    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
  }
}

// GET Client --------------------------------------------------------------------------------

BackMaker.prototype.getClientById = async function (cliid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ cliid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ cliid }).toArray();
    }

    if (option.withTools) {
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
    }

    if (arr.length > 0) {
      target = new Client(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "client";
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
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
      MONGOC.close();
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
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
      Clients = Tools.withToolsArr(Clients);
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

BackMaker.prototype.getClientsAll = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    if (!option.withTools) {
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    } else {
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
      Clients = Tools.withToolsArr(Clients);
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

BackMaker.prototype.getLatestClient = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
    }

    if (arr.length > 0) {
      target = new Client(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestClients = async function (number = 1, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "requests.0.request.timeline": -1 }).toArray();
      }
    }

    if (!option.withTools) {
      clientsArr = new Clients();
      for (let i of tong) {
        clientsArr.push(new Client(i));
      }
    } else {
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/tools.js`);
      Client = Tools.withTools(Client);
      Clients = Tools.withToolsArr(Clients);
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

BackMaker.prototype.updateClient = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteClient = async function (cliid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ cliid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ cliid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnClientDummies = function (subject) {
  let dummy;
  switch (subject) {
    case "analytics.date.history":
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
      break;
    case "analytics.picture.space.file":
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
      break;
    case "analytics.picture.prefer.file":
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
      break;
    case "analytics.picture.space.file.confirm":
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
      break;
    case "analytics.picture.prefer.file.confirm":
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
      break;
    case "analytics.proposal":
      dummy = {
        proid: "",
        generate: {
          date: new Date(1800, 0, 1),
          who: "",
        },
        complete: {
          date: new Date(1800, 0, 1),
          who: "",
        },
        send: {
          date: new Date(1800, 0, 1),
          who: "",
        },
        feedback: {
          date: new Date(1800, 0, 1),
          who: "",
        },
      };
      break;
  }

  return dummy;
}

BackMaker.prototype.returnClientRequest = function () {
  let request;
  request = {
    request: {
      timeline: new Date(1800, 0, 1),
      notionId: "",
      budget: "알 수 없음",
      family: "",
      space: {
        address: "",
        contract: "알 수 없음",
        pyeong: 0,
        spec: {
          room: 0,
          bathroom: 0,
          valcony: false
        },
        resident: {
          living: false,
          expected: new Date(1800, 0, 1),
        },
      },
      etc: {
        comment: "",
        channel: "",
      },
    },
    analytics: {
      googleAnalytics: {
        timeline: new Date(1800, 0, 1),
        userType: "",
        referrer: {
          name: "",
          detail: {
            host: null,
            queryString: {},
          },
        },
        device: {
          type: "",
          os: "",
          mobileDevice: "",
        },
        region: {
          country: "",
          city: "",
          latitude: 0,
          longitude: 0,
        },
        personalInfo: {
          age: null,
          gender: null
        },
        campaign: "",
        history: [],
      },
      response: {
        status: "응대중",
        action: "1차 응대 예정",
        outreason: [],
        outspot: "해당 없음",
        kakao: false,
        service: {
          serid: "s2011_aa02s",
          xValue: "B",
          online: false,
        },
      },
      date: {
        call: {
          next: new Date(1800, 0, 1),
          history: [],
        },
        space: {
          precheck: new Date(1800, 0, 1),
          empty: new Date(1800, 0, 1),
          movein: new Date(1800, 0, 1),
        },
        calendar: {
          call: {
            mother: "clientCalendar",
            id: "",
          },
          precheck: {
            mother: "clientCalendar",
            id: "",
          },
          empty: {
            mother: "clientCalendar",
            id: "",
          },
          movein: {
            mother: "clientCalendar",
            id: "",
          }
        },
      },
      picture: {
        space: {
          boo: false,
          file: [],
        },
        prefer: {
          boo: false,
          file: [],
        },
      },
      proposal: [],
    },
  };
  return request;
}

BackMaker.prototype.createClient = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
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
    dummy = {
      structure: {
        name: "",
        phone: "",
        email: "",
        cliid: "",
        requests: [],
      },
    };
    requestDummy = this.returnClientRequest();
    dummy.structure.requests.unshift(requestDummy);
    dummy.structure.cliid = this.idMaker(latestClient.cliid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      MONGOC.close();
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
  const { slack_bot } = this.mother;
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
                tempArr.push(String(finalObj));
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
            tempArr.push(String(this[i].total));
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);

          tempArr = [ "제안" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(String(this[i].proposalTotal));
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push("");
            }
          }
          result.push(tempArr);


          tempArr = [ "진행" ];
          for (let i = 0; i < this.length; i++) {
            tempArr.push(String(this[i].contactTotal));
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
    slack_bot.chat.postMessage({ text: "리포트 서버 문제 생김 : " + e, channel: "#error_log" });
    console.log(e);
  }
}

BackMaker.prototype.getCaseProidById = async function (id, option = { selfMongo: null }) {
  const instance = this;
  try {
    if (typeof option !== "object" || Array.isArray(option)) {
      throw new Error("invaild option input");
    }
    const clients = await this.getClientsByQuery({}, { withTools: true, ...option });
    const projects = await this.getProjectsByQuery({}, { withTools: true, ...option });
    const cases = clients.getType().getTypeCases(projects);
    const targetClient = await this.getClientById(id, option);
    let resultObj = {};

    if (targetClient === null) {
      resultObj.cases = null;
      resultObj.proid = null;
    } else {
      resultObj.cases = cases.parsingCases(targetClient);
      resultObj.proid = cases.parsingProid(targetClient);
    }

    return resultObj;
  } catch (e) {
    console.log(e);
  }
}

// GET Contents --------------------------------------------------------------------------------

BackMaker.prototype.getContentsById = async function (conid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ conid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ conid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    if (arr.length > 0) {
      target = new Contents(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsByPid = async function (pid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    if (arr.length > 0) {
      target = new Contents(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsArrByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
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
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
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

    return contentsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getContentsArrAll = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      MONGOC.close();
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

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestContents = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    if (arr.length > 0) {
      target = new Contents(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestContentsArr = async function (number = 1, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "contents.portfolio.date": -1 }).toArray();
      }
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

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateContents = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteContents = async function (conid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ conid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ conid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createContents = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "contents";
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
    dummy = {
      structure: {
        conid: "",
        desid: "",
        cliid: "",
        proid: "",
        contents: {
          portfolio: {
            pid: "",
            date: new Date(1800, 0, 1),
            spaceInfo: {
              space: "",
              pyeong: 0,
              region: "",
              method: "",
            },
            title: {
              main: "",
              sub: "",
            },
            color: {
              main: "",
              sub: "",
              title: "",
            },
            detailInfo: {
              photodae: [],
              photosg: {
                first: 0,
                last: 0,
              },
              slide: [],
              tag: [],
              service: "",
              sort: {
                key8: 0,
                key9: 0,
              },
            },
            contents: {
              suggestion: "Designer's\nSuggestion",
              detail: [],
            }
          },
          review: {
            rid: "",
            date: new Date(1800, 0, 1),
            title: {
              main: "",
              sub: "",
            },
            detailInfo: {
              photodae: [],
              order: 0,
            },
            contents: {
              detail: [],
            }
          }
        },
        photos: {
          first: 0,
          last: 0,
          detail: [],
        }
      }
    };
    dummy.structure.conid = this.idMaker(latestContents.conid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      MONGOC.close();
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

BackMaker.prototype.getServiceById = async function (serid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "service";
  const { Service } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ serid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ serid }).toArray();
    }

    if (arr.length > 0) {
      target = new Service(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

// GET Designer --------------------------------------------------------------------------------

BackMaker.prototype.getDesignerById = async function (desid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ desid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ desid }).toArray();
    }

    if (option.withTools) {
      Designer = Tools.withTools(Designer);
    }

    if (arr.length > 0) {
      target = new Designer(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getDesignersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
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
      MONGOC.close();
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

    return designersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getDesignersAll = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, designersArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      MONGOC.close();
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

    return designersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestDesigner = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Designer = Tools.withTools(Designer);
    }

    if (arr.length > 0) {
      target = new Designer(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestDesigners = async function (number = 1, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, designersArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "information.contract.date": -1 }).toArray();
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

    return designersArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateDesigner = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteDesigner = async function (desid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ desid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ desid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createDesigner = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "designer";
  try {
    let dummy, dummySetting, latestDesigner, latestDesignerArr;
    let newOption = {};

    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    newOption.withTools = false;
    newOption.sort = { "desid": -1 };
    newOption.limit = 1;

    latestDesignerArr = await this.getDesignersByQuery({}, newOption);
    latestDesigner = latestDesignerArr[0];

    dummy = {
      structure: {
        designer: "",
        desid: "",
        information: {
          contract: {
            status: "",
            date: new Date(1800, 0, 1),
          },
          phone: "",
          email: "",
          did: "",
          address: [],
          personalSystem: {
            showRoom: false,
            webPage: [],
            sns: [],
          },
          business: {
            career: {
              startY: 0,
              startM: 0,
            },
            account: [],
            businessInfo: {
              classification: "",
              businessNumber: "",
              files: {
                businessRegistration: false,
                bankBook: false,
                registrationCard: false
              },
            },
            service: {
              cost: {
                matrix: {
                  service: [
                    {
                      serid: "s2011_aa01s",
                      case: 9
                    },
                    {
                      serid: "s2011_aa02s",
                      case: 11
                    },
                    {
                      serid: "s2011_aa03s",
                      case: 9
                    }
                  ],
                  online: true
                },
                percentage: 0,
                percentageHistory: []
              },
              construct: {
                partner: "",
                method: "",
              },
            },
          }
        },
        analytics: {
          region: {
            available: [ "서울", "경기" ],
            transportation: {
              method: "자동차",
              expenses: {
                actual: {
                  boo: true
                },
                unit: {
                  boo: true,
                  amount: 0,
                }
              },
            },
          },
          meeting: {
            measure: {
              direct: false,
              furniture: false,
            },
            team: false,
            style: "철저한 준비",
          },
          project: {
            index: false,
            budget: {
              resultOffer: false,
              method: "문서",
            },
            time: {
              first: 7,
              entire: 30,
            },
            paperWork: [],
            communication: {
              method: "대면",
              count: 0,
            },
            retouch: {
              partial: 3,
              entire: 4
            }
          },
          construct: {
            level: 1,
            possible: {
              supervision: false,
              partialSupervision: false,
              others: false
            },
            contract: {
              method: "협업사 계약",
              othersFinishing: "해당 없음",
              communication: "",
            }
          },
          styling: {
            level: 1,
            method: "순차 제안",
            tendency: {
              style: {
                modern: 0,
                glam: 0,
                antique: 0,
                natural: 0,
                minimum: 0,
                vintage: 0,
                feminine: 0,
                exotic: 0,
              },
              texture: {
                darkWood: 0,
                whiteWood: 0,
                coating: 0,
                metal: 0
              },
              color: {
                darkWood: 0,
                whiteWood: 0,
                highContrast: 0,
                vivid: 0,
                white: 0,
                mono: 0
              },
              density: {
                maximun: 0,
                minimum: 0,
              }
            },
            furniture: {
              builtin: false,
              design: false
            },
            fabric: {
              manufacture: false,
              method: "업체 연결",
            }
          },
          purchase: {
            agencies: {
              boo: false,
              fee: 0,
            },
            setting: {
              takeIn: false,
              install: true,
              storage: true,
              detail: "해당 없음",
            },
            detail: "",
          },
          etc: {
            matrix: [],
            operationBudget: {
              min: 5000000,
              max: 10000000
            },
            personality: {
              fast: true,
              careful: true,
              lead: true
            },
            relation: "확인중"
          }
        },
        realTime: {
          availableDate: [],
        },
        setting: {
          front: {
            introduction: {
              desktop: [],
              mobile: [],
            },
            methods: [],
            photo: {
              porlid: "",
              index: "",
            },
            order: 0,
          },
          proposal: [],
          ghost: [],
        },
      },
    };
    dummySetting = function (num) {
      let settingObj = {
          name : "기본 세팅 " + String(num),
          photo : [
            {
              position: "0",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 66.5%;height: 66%;top: 0%;left: 0%;"
            },
            {
              position: "1",
              sgTrue: "s",
              unionPo: "right",
              styleText: "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
            },
            {
              position: "2",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 32.8%;height: 33%;top: 67%;left: 0%;"
            },
            {
              position: "3",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 33%;height: 33%;top: 67%;left: 33.5%;"
            },
            {
              position: "4",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
            }
          ],
          description : [
            "NULL",
            "NULL",
            "NULL"
          ]
      };
      return JSON.parse(JSON.stringify(settingObj));
    }
    dummy.structure.desid = this.idMaker(latestDesigner.desid);
    for (let i = 0; i < 5; i++) {
      dummy.structure.setting.proposal.push(dummySetting(i));
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateDesigner([ { desid: dummy.structure.desid }, updateQuery ], option);

    return dummy.structure.desid;
  } catch (e) {
    console.log(e);
  }
}

// GET Project --------------------------------------------------------------------------------

BackMaker.prototype.getProjectById = async function (proid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ proid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ proid }).toArray();
    }

    if (option.withTools) {
      Project = Tools.withTools(Project);
    }

    if (arr.length > 0) {
      target = new Project(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
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
      MONGOC.close();
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

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsAll = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      MONGOC.close();
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

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestProject = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Project = Tools.withTools(Project);
    }

    if (arr.length > 0) {
      target = new Project(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestProjects = async function (number = 1, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find({}).sort({ "proid": -1 }).toArray();
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

    return projectsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectsByCliidArr = function (cliidArr, option = { withTools: false, selfMongo: null, recycle: null }) {
  const instance = this;
  const button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  let projects;

  if (option.recycle !== undefined && option.recycle !== null) {
    projects = option.recycle;
    if (option.withTools === true) {
      Projects = Tools.withToolsArr(Projects);
    }
    let result = new Projects();
    for (let p of projects) {
      if (cliidArr.includes(p.cliid)) {
        result.push(p);
      }
    }
    return result;

  } else {
    const { mongo, mongoinfo } = this.mother;
    const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    return new Promise(function (resolve, reject) {
      instance.getProjectsByQuery({}, option).then(function (projects) {
        if (option.withTools === true) {
          Projects = Tools.withToolsArr(Projects);
        }
        let result = new Projects();
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

BackMaker.prototype.getProjectsByNames = async function (nameArr, option = { withTools: false, selfMongo: null }) {
  if (Array.isArray(nameArr)) {
    if (nameArr.length !== 2) {
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
  } else {
    throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
  }
  const instance = this;
  try {
    const [ name, designer ] = nameArr;
    let clients, designers, projects;
    let allCases, tempArr;
    let whereQuery;

    clients = await this.getClientsByQuery({ name }, option);
    designers = await this.getDesignersByQuery({ designer }, option);

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

    if (projects.length === 0) {
      return [];
    } else {
      return projects;
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateProject = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteProject = async function (proid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ proid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ proid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.returnProjectDummies = function (subject) {
  let dummy;
  switch (subject) {
    case "process.call.history":
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
      break;
    case "process.contract.meeting.pastDesigners":
      dummy = {
        date: new Date(1800, 0, 1),
        desid: "",
      };
      break;
  }

  return dummy;
}

BackMaker.prototype.createProject = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "project";
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

    dummy = {
      structure: {
        proid: "",
        cliid: "",
        desid: "",
        service: {
          serid: "",
          xValue: "",
          online: false,
        },
        proposal: {
          status: "",
          date: new Date(1800, 0, 1),
          detail: [],
        },
        process: {
          status: "드랍",
          action: "응대 대기",
          detail: [],
          outreason: [],
          outspot: "해당 없음",
          call: {
            next: new Date(1800, 0, 1),
            history: [],
          },
          contract: {
            first: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: 0,
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            },
            remain: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 0,
                  vat: 0,
                  consumer: 0,
                },
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            },
            form: {
              id: "",
              guide: new Date(1800, 0, 1),
              date: {
                from: new Date(1800, 0, 1),
                to: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
              }
            },
            meeting: {
              date: new Date(1800, 0, 1),
              pastDesigners: []
            },
          },
          design: {
            proposal: {
              provided: false,
              limit: null,
              detail: []
            },
            construct: {
              provided: false,
              detail: [],
            },
            purchase: {
              provided: false,
              detail: [],
            },
          },
          calculation: {
            method: "",
            percentage: 0,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 0,
              first: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              }
            }
          },
        },
        contents: {
          conid: "",
          photo: {
            boo: true,
            status: "세팅 대기",
            date: new Date(3800, 0, 1),
            info: {
              photographer: "미정",
              interviewer: "미정",
            }
          },
          raw: {
            portfolio: {
              status: "해당 없음",
              link: "",
            },
            interview: {
              status: "해당 없음",
              link: "",
            },
            photo: {
              status: "해당 없음",
              link: "",
            },
          },
          share: {
            client: {
              photo: new Date(1800, 0, 1),
              contents: new Date(1800, 0, 1),
            },
            designer: {
              photo: new Date(1800, 0, 1),
              contents: new Date(1800, 0, 1),
            }
          }
        },
      }
    };
    dummy.structure.proid = this.idMaker(latestProject.proid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      MONGOC.close();
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

BackMaker.prototype.getAspirantById = async function (aspid, option = { withTools: false, selfMongo: null, portfolioReset: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "aspirant";
  let { Aspirant, Aspirants, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ aspid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ aspid }).toArray();
    }

    if (option.withTools) {
      Aspirant = Tools.withTools(Aspirant);
    }

    if (arr.length > 0) {
      target = new Aspirant(arr[0]);
    } else {
      target = null;
    }

    return target;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getAspirantsByQuery = async function (query, option = { withTools: false, selfMongo: null, portfolioReset: null, fromLocal: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "aspirant";
  let { Aspirant, Aspirants, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
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
      MONGOC.close();
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
        MONGOC.close();
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

    return aspirantsArr;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateAspirant = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "aspirant";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteAspirant = async function (aspid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "aspirant";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ aspid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ aspid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createAspirant = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "aspirant";
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

    dummy = {
      structure: {
        aspid: "",
        designer: "",
        phone: "",
        address: "",
        email: "",
        meeting: {
          date: new Date(1800, 0, 1),
          status: "",
        },
        calendar: {
          mother: "designerMeeting",
          id: "",
        },
        portfolio: [],
        submit: {
          presentation: {
            date: new Date(1800, 0, 1),
            boo: false
          },
          partnership: {
            date: new Date(1800, 0, 1),
            boo: false
          },
          firstRequest: {
            date: new Date(1800, 0, 1),
            method: "",
          },
          comeFrom: "",
        },
        information: {
          company: {
            name: "",
            classification: "",
            businessNumber: "",
            representative: "",
            start: new Date(1800, 0, 1),
          },
          account: {
            bank: "",
            number: "",
            to: "",
            etc: "",
          },
          career: {
            interior: {
              year: 0,
              month: 0
            },
            styling: {
              year: 0,
              month: 0
            },
            detail: "",
          },
          channel: {
            web: [],
            sns: [],
            cloud: []
          }
        }
      }
    };
    dummy.structure.aspid = this.idMaker(latestAspirant.aspid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateAspirant([ { aspid: dummy.structure.aspid }, updateQuery ], option);

    return dummy.structure.aspid;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.unshiftAspirantPortfolioConfirm = async function (whereQuery, position, date, who, option = { selfMongo: null }) {
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

// GET history -------------------------------------------------------------------------

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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
      MONGOLOCALC.close();
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
      MONGOLOCALC.close();
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
      MONGOLOCALC.close();
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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

    projectQuery = {};
    projectQuery[sortStandard] = 1;
    projectQuery[property] = 1;

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
      MONGOLOCALC.close();
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
            tongLeft.push(id);
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
        finalTong[obj[sortStandard]] = obj[property];
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      }
    }

    const [ whereQuery, updateQuery ] = queryArr;
    let collection;

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
      MONGOLOCALC.close();
    }

    return "success";
  } catch (e) {
    console.log(e);
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
      MONGOLOCALC.close();
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createHistory = async function (method, updateQuery, option = { fromConsole: false, selfMongo: null }) {
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
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      }
    }

    let dummy;
    let sortStandard, collection, whereQuery;

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
        manager: "-"
      };
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
      dummy = {
        desid: updateQuery.desid,
        important: false,
        issue: "",
        manager: "-"
      };
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
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
        manager: "-"
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
      MONGOLOCALC.close();
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

BackMaker.prototype.mongoCreate = async function (collection, json, option = { local: null, console: null, home: null, bridge: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongohomeinfo, bridgeinfo } = this.mother;
  try {

    let MONGOC;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else if (option.home !== undefined && option.home !== null) {
        MONGOC = new mongo(mongohomeinfo, { useUnifiedTopology: true });
      } else if (option.bridge !== undefined && option.bridge !== null) {
        MONGOC = new mongo(bridgeinfo, { useUnifiedTopology: true });
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      } else {
        MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      }
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(collection).insertOne(json);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(collection).insertOne(json);
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoRead = async function (collection, query, option = { local: null, console: null, home: null, bridge: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongohomeinfo, bridgeinfo } = this.mother;
  try {
    let MONGOC;
    let tong;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = {};
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else if (option.home !== undefined && option.home !== null) {
        MONGOC = new mongo(mongohomeinfo, { useUnifiedTopology: true });
      } else if (option.bridge !== undefined && option.bridge !== null) {
        MONGOC = new mongo(bridgeinfo, { useUnifiedTopology: true });
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      } else {
        MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      }
      await MONGOC.connect();
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
      }
    }

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoUpdate = async function (collection, queryArr, option = { local: null, console: null, home: null, bridge: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongohomeinfo, bridgeinfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    let MONGOC;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else if (option.home !== undefined && option.home !== null) {
        MONGOC = new mongo(mongohomeinfo, { useUnifiedTopology: true });
      } else if (option.bridge !== undefined && option.bridge !== null) {
        MONGOC = new mongo(bridgeinfo, { useUnifiedTopology: true });
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      } else {
        MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      }
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoDelete = async function (collection, query, option = { local: null, console: null, home: null, bridge: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongohomeinfo, bridgeinfo } = this.mother;
  try {
    let MONGOC;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else if (option.home !== undefined && option.home !== null) {
        MONGOC = new mongo(mongohomeinfo, { useUnifiedTopology: true });
      } else if (option.bridge !== undefined && option.bridge !== null) {
        MONGOC = new mongo(bridgeinfo, { useUnifiedTopology: true });
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      } else {
        MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      }
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(collection).deleteOne(query);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(collection).deleteOne(query);
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.mongoListCollections = async function (option = { local: null, console: null, home: null, bridge: null, python: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo, mongohomeinfo, bridgeinfo } = this.mother;
  try {
    let MONGOC, allCollections_raw, allCollections;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      if (option.local !== undefined && option.local !== null) {
        MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      } else if (option.console !== undefined && option.console !== null) {
        MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else if (option.home !== undefined && option.home !== null) {
        MONGOC = new mongo(mongohomeinfo, { useUnifiedTopology: true });
      } else if (option.bridge !== undefined && option.bridge !== null) {
        MONGOC = new mongo(bridgeinfo, { useUnifiedTopology: true });
      } else if (option.python !== undefined && option.python !== null) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      } else {
        MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      }
      await MONGOC.connect();
      allCollections_raw = await MONGOC.db(`miro81`).listCollections().toArray();
      MONGOC.close();
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
