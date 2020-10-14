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

BackMaker.prototype.pastMap = function () {
  switch (this.button) {
    case "client":
      return "BC1_conlist";
      break;
  }
}

BackMaker.prototype.jsonStructure = function () {
  const instance = this;
  const map = require(this.mapDir + "/" + this.button + ".js");
  return function () {
    return JSON.parse(JSON.stringify(map));
  }
}

BackMaker.prototype.pastToJson = async function (cliid = "entire") {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const map = require(this.pastDir + "/" + this.button + ".js");
  const filter = map({ map: this.jsonStructure(this.button), Mother: this.mother, Notion: this.notion });
  try {
    let row, tempArr;

    await MONGOC.connect();

    if (cliid === "entire") {
      row = await MONGOC.db("miro81").collection(this.pastMap()).find({}).toArray();
    } else if (/^latest/.test(cliid)) {
      tempArr = cliid.split("_");
      row = await MONGOC.db("miro81").collection("BC1_conlist").find({}).sort({ a4_customernumber: -1 }).limit(Number(tempArr[1].replace(/[^0-9]/g, ''))).toArray();
    } else {
      row = await MONGOC.db("miro81").collection(this.pastMap()).find({ a4_customernumber: cliid }).limit(1).toArray();
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
    const targetDir = this.pastDir + "/" + this.button;
    const targetDirArr = await fileSystem(`readDir`, [ targetDir ]);
    let tempFunc, funcs;

    funcs = [];
    for (let i of targetDirArr) { if (i !== `.DS_Store`) {
      funcs.push(require(targetDir + "/" + i));
    }}

    for (let i = 0; i < funcs.length; i++) {
      tempFunc = (funcs[i])({ Mother: this.mother, Notion: this.notion });
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

    const Client = require(this.aliveDir + "/client/client.js");

    let clientInstance, clientJson;

    clientJson = JSON.parse(await fileSystem(`readString`, [ `${this.resourceDir}/${this.button}.json` ]));
    clientInstance = new Client(clientJson[clientJson.length - 1]);

    console.log(clientInstance);
    console.log(clientInstance.death);
    console.log(clientInstance.google);

  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getClientById = async function (cliid) {
  const instance = this;
  this.button = "client";
  const Client = require(`${this.aliveDir}/${this.button}/${this.button}.js`);
  try {
    let tong = await this.getTong(cliid);
    return new Client(tong[0]);
  } catch (e) {
    console.log(e);
  }
}

BackMaker.prototype.getLatestClients = async function (number = 1) {
  const instance = this;
  this.button = "client";
  const Client = require(`${this.aliveDir}/${this.button}/${this.button}.js`);
  class Clients extends Array {
    get latestRequests() {
      let arr = [];
      for (let i of this) {
        arr.push(i.latestRequest);
      }
      return arr;
    }
  }
  try {
    let tong = await this.getTong("latest_" + String(number));
    let result = new Clients();
    for (let i of tong) {
      result.push(new Client(i));
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = BackMaker;
