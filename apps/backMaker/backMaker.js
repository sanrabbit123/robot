const BackMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();

  const NotionAPIs = require(process.cwd() + "/apps/notionAPIs/notionAPIs.js");
  this.notion = new NotionAPIs();

  this.dir = process.cwd() + "/apps/backMaker";
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
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
  const { main, sub } = map;
  return {
    main: function () {
      return JSON.parse(JSON.stringify(main));
    },
    sub: function () {
      return JSON.parse(JSON.stringify(sub));
    }
  }
}

BackMaker.prototype.pastToJson = async function () {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const map = require(this.pastDir + "/" + this.button + ".js");
  const filter = map({ map: this.jsonStructure(this.button), Mother: this.mother, Notion: this.notion });
  try {
    await MONGOC.connect();
    const row = await MONGOC.db("miro81").collection(this.pastMap()).find({}).toArray();
    return (await filter(row));
  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    console.log("done");
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
  } finally {
    console.log("done");
  }
}

BackMaker.prototype.launching = async function (button) {
  const instance = this;
  const { fileSystem } = this.mother;
  this.button = button;
  try {
    const tong = await this.pastToJson();
    const finalTong = await this.subLogicToJson(tong);
    await fileSystem(`write`, [ `${this.resourceDir}/${this.button}.json`, JSON.stringify(finalTong, null, 2) ]);
  } catch (e) {
    console.log(e);
  }
}

module.exports = BackMaker;
