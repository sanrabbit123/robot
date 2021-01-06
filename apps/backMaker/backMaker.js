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
  this.button = "designer";
  const Filter = this.idFilter(this.button);
  try {
    await MONGOC.connect();
    let temp;
    let pastDesid, newDesid;
    let newString;

    // 1
    let designers = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
    for (let d of designers) {
      await MONGOC.db(`miro81`).collection(this.button).updateOne({ desid: d.desid }, { $set: { desid: Filter.pastToNew(d.desid) } });
      console.log("success");
    }


    // 2
    // const contents = await MONGOC.db(`miro81`).collection("contents").find({}).toArray();
    // for (let d of contents) {
    //   await MONGOC.db(`miro81`).collection("contents").updateOne({ desid: d.desid }, { $set: { desid: Filter.pastToNew(d.desid) } });
    //   console.log("success");
    // }


    // 3
    designers = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
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
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ cliid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ cliid }).toArray();
    }

    if (option.withTools) {
      Client = Tools.widthTools(Client);
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

BackMaker.prototype.getClientsByQuery = async function (query, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
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
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
    }

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

BackMaker.prototype.getClientsAll = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
      MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).toArray();
    }

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

BackMaker.prototype.getLatestClient = async function (option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Client = Tools.widthTools(Client);
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
  this.button = "client";
  let { Client, Clients, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, clientsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "requests.0.request.timeline": -1 }).toArray();
      }
    }

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

BackMaker.prototype.updateClient = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "client";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
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
  this.button = "client";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).deleteOne({ cliid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).deleteOne({ cliid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createClient = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "client";
  try {
    let dummy, latestClient;

    latestClient = await this.getLatestClient(option);
    dummy = {
      structure: {
        name: "",
        phone: "",
        email: "",
        cliid: "",
        requests: [
          {
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
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "",
            },
          },
        ],
      },
    };
    dummy.structure.cliid = this.idMaker(latestClient.cliid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).insertOne(dummy.structure);
    }

    await this.updateClient([ { cliid: dummy.structure.cliid }, updateQuery ], option);

    return dummy.structure.cliid;
  } catch (e) {
    console.log(e);
  }
}

// GET Contents --------------------------------------------------------------------------------

BackMaker.prototype.getContentsById = async function (conid, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ conid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ conid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.widthTools(Contents);
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
  this.button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ "contents.portfolio.pid": pid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ "contents.portfolio.pid": pid }).toArray();
    }

    if (option.withTools) {
      Contents = Tools.widthTools(Contents);
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

BackMaker.prototype.getContentsArrByQuery = async function (query, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "contents";
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
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      contentsArr = new ContentsArr();
      for (let i of tong) {
        contentsArr.push(new Contents(i));
      }
    } else {
      Contents = Tools.widthTools(Contents);
      ContentsArr = Tools.widthToolsArr(ContentsArr);
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
  this.button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
      MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).toArray();
    }

    if (!option.withTools) {
      projectsArr = new ContentsArr();
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    } else {
      Contents = Tools.widthTools(Contents);
      ContentsArr = Tools.widthToolsArr(ContentsArr);
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
  this.button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Contents = Tools.widthTools(Contents);
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
  this.button = "contents";
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "contents.portfolio.date": -1 }).toArray();
      }
    }

    if (!option.withTools) {
      projectsArr = new ContentsArr();
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    } else {
      Contents = Tools.widthTools(Contents);
      ContentsArr = Tools.widthToolsArr(ContentsArr);
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
  this.button = "contents";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
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
  this.button = "contents";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).deleteOne({ conid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).deleteOne({ conid });
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
  this.button = "contents";
  try {
    let dummy, latestClient;

    latestClient = await this.getLatestContents(option);
    dummy = {
      structure: {
        conid: "",
        desid: "",
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
    dummy.structure.conid = this.idMaker(latestClient.conid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).insertOne(dummy.structure);
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
  this.button = "service";
  const { Service } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ serid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ serid }).toArray();
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
  this.button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ desid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ desid }).toArray();
    }

    if (option.withTools) {
      Designer = Tools.widthTools(Designer);
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

BackMaker.prototype.getDesignersByQuery = async function (query, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
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
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    } else {
      Designer = Tools.widthTools(Designer);
      Designers = Tools.widthToolsArr(Designers);
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
  this.button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, designersArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
      MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).toArray();
    }

    if (!option.withTools) {
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    } else {
      Designer = Tools.widthTools(Designer);
      Designers = Tools.widthToolsArr(Designers);
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
  this.button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Designer = Tools.widthTools(Designer);
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
  this.button = "designer";
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, designersArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "information.contract.date": -1 }).toArray();
      }
    }

    if (!option.withTools) {
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i));
      }
    } else {
      Designer = Tools.widthTools(Designer);
      Designers = Tools.widthToolsArr(Designers);
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
  this.button = "designer";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
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
  this.button = "designer";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).deleteOne({ desid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).deleteOne({ desid });
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
  this.button = "designer";
  try {
    let dummy, dummySetting, latestClient;

    latestClient = await this.getLatestDesigner(option);
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
          notionId: "",
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
          personality: 0,
          grade: 0,
          reliability: 0,
          availables: {
            area: [],
            style: [],
            service: [],
            tech: [],
            make: {
              furniture: false,
              fabric: false,
            },
          },
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

    dummy.structure.desid = this.idMaker(latestClient.desid);
    for (let i = 0; i < 5; i++) {
      dummy.structure.setting.proposal.push(dummySetting(i));
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).insertOne(dummy.structure);
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
  this.button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({ proid }).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({ proid }).toArray();
    }

    if (option.withTools) {
      Project = Tools.widthTools(Project);
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

BackMaker.prototype.getProjectsByQuery = async function (query, option = { withTools: false, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
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
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
      MONGOC.close();
    } else {
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find(query).sort(sortQuery).toArray();
      }
    }

    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      Project = Tools.widthTools(Project);
      Projects = Tools.widthToolsArr(Projects);
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
  this.button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      tong = await MONGOC.db(`miro81`).collection(this.button).find({}).toArray();
      MONGOC.close();
    } else {
      tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).toArray();
    }

    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      Project = Tools.widthTools(Project);
      Projects = Tools.widthToolsArr(Projects);
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
  this.button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).limit(1).toArray();
      MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).limit(1).toArray();
    }

    if (option.withTools) {
      Project = Tools.widthTools(Project);
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
  this.button = "project";
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${this.button}/addOn/generator.js`);
  try {
    let tong, projectsArr;

    if (number !== "all") {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).limit(Number(number)).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).limit(Number(number)).toArray();
      }
    } else {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
        tong = await MONGOC.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).toArray();
        MONGOC.close();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(this.button).find({}).sort({ "proid": -1 }).toArray();
      }
    }

    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      Project = Tools.widthTools(Project);
      Projects = Tools.widthToolsArr(Projects);
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

BackMaker.prototype.updateProject = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "project";
  try {
    const [ whereQuery, updateQuery ] = queryArr;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).updateOne(whereQuery, { $set: updateQuery });
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
  this.button = "project";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).deleteOne({ proid });
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).deleteOne({ proid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createProject = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.button = "project";
  try {
    let dummy, latestClient;
    let temp;

    latestClient = await this.getLatestProject(option);
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
          photo: {
            date: new Date(1800, 0, 1),
            info: {
              photographer: "",
              interviewer: "",
            }
          },
          conid: "",
        },
      }
    };

    dummy.structure.proid = this.idMaker(latestClient.proid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(this.button).insertOne(dummy.structure);
      MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(this.button).insertOne(dummy.structure);
    }

    await this.updateProject([ { proid: dummy.structure.proid }, updateQuery ], option);

    return dummy.structure.proid;
  } catch (e) {
    console.log(e);
  }
}

// GET client history -------------------------------------------------------------------------

BackMaker.prototype.getClientHistoryById = async function (cliid, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }

    let arr, target;
    await MONGOLOCALC.connect();
    arr = await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).find({ cliid }).toArray();
    MONGOLOCALC.close();
    if (arr.length > 0) {
      return arr[0];
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientHistoriesByQuery = async function (query, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let tong, sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "cliid": -1 };
    } else {
      sortQuery = option.sort;
    }

    await MONGOLOCALC.connect();
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).find(query).sort(sortQuery).toArray();
    }
    MONGOLOCALC.close();

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientHistoriesAll = async function (option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }

    let tong, sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "cliid": -1 };
    } else {
      sortQuery = option.sort;
    }

    await MONGOLOCALC.connect();
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).find({}).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).find({}).sort(sortQuery).toArray();
    }
    MONGOLOCALC.close();

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateClientHistory = async function (queryArr, option = { fromConsole: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }

    const [ whereQuery, updateQuery ] = queryArr;

    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).updateOne(whereQuery, { $set: updateQuery });
    MONGOLOCALC.close();

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteClientHistory = async function (cliid, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).deleteOne({ cliid });
    MONGOLOCALC.close();
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createClientHistory = async function (updateQuery, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let dummy;

    dummy = {
      cliid: updateQuery.cliid,
      history: "",
      space: "",
      construct: "",
      styling: "",
      budget: "",
      progress: "",
    };

    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`clientHistory`).insertOne(dummy);
    MONGOLOCALC.close();

    await this.updateClientHistory([ { cliid: updateQuery.cliid }, updateQuery ], option);

    return updateQuery.cliid;
  } catch (e) {
    console.log(e);
  }
}

// GET project history -------------------------------------------------------------------------

BackMaker.prototype.getProjectHistoryById = async function (proid, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let arr, target;
    await MONGOLOCALC.connect();
    arr = await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).find({ proid }).toArray();
    MONGOLOCALC.close();
    if (arr.length > 0) {
      return arr[0];
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectHistoriesByQuery = async function (query, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let tong, sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "proid": -1 };
    } else {
      sortQuery = option.sort;
    }

    await MONGOLOCALC.connect();
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).find(query).sort(sortQuery).toArray();
    }
    MONGOLOCALC.close();

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getProjectHistoriesAll = async function (option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let tong, sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "proid": -1 };
    } else {
      sortQuery = option.sort;
    }

    await MONGOLOCALC.connect();
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).find({}).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).find({}).sort(sortQuery).toArray();
    }
    MONGOLOCALC.close();

    return tong;
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.updateProjectHistory = async function (queryArr, option = { fromConsole: false }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    const [ whereQuery, updateQuery ] = queryArr;

    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).updateOne(whereQuery, { $set: updateQuery });
    MONGOLOCALC.close();

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.deleteProjectHistory = async function (proid, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).deleteOne({ proid });
    MONGOLOCALC.close();
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.createProjectHistory = async function (updateQuery, option = { fromConsole: false }) {
  const instance = this;
  const { mongo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOLOCALC;
    if (option.fromConsole) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    }
    let dummy;

    dummy = {
      proid: updateQuery.proid,
      history: "",
      designer: "",
      client: "",
      photo: "",
    };

    await MONGOLOCALC.connect();
    await MONGOLOCALC.db(`miro81`).collection(`projectHistory`).insertOne(dummy);
    MONGOLOCALC.close();

    await this.updateClientHistory([ { proid: updateQuery.proid }, updateQuery ], option);

    return updateQuery.proid;
  } catch (e) {
    console.log(e);
  }
}

// general mongo CRUD  --------------------------------------------------------------------

BackMaker.prototype.mongoCreate = async function (collection, json, option = { local: null, console: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {

    let MONGOC;
    if (option.local !== undefined && option.local !== null) {
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    } else if (option.console !== undefined && option.console !== null) {
      MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
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

BackMaker.prototype.mongoRead = async function (collection, query, option = { local: null, console: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOC;
    if (option.local !== undefined && option.local !== null) {
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    } else if (option.console !== undefined && option.console !== null) {
      MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    }

    let tong;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = {};
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
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

BackMaker.prototype.mongoUpdate = async function (collection, queryArr, option = { local: null, console: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    let MONGOC;
    if (option.local !== undefined && option.local !== null) {
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    } else if (option.console !== undefined && option.console !== null) {
      MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    }
    if (option.selfMongo === undefined || option.selfMongo === null) {
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

BackMaker.prototype.mongoDelete = async function (collection, query, option = { local: null, console: null, selfMongo: null }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  try {
    let MONGOC;
    if (option.local !== undefined && option.local !== null) {
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    } else if (option.console !== undefined && option.console !== null) {
      MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    }
    if (option.selfMongo === undefined || option.selfMongo === null) {
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

module.exports = BackMaker;
