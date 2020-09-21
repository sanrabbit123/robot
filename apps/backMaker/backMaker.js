const BackMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/backMaker";
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
}

BackMaker.prototype.jsonStructure = function (button) {
  const instance = this;
  const map = require(this.mapDir + "/" + button + ".js");
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

BackMaker.prototype.pastToJson = async function (button) {
  const instance = this;
  const { shell, shellLink, fileSystem, mongo, bridgeinfo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const func = require(this.pastDir + "/" + button + ".js");
  const filter = func(this.jsonStructure(button));
  try {
    await MONGOC.connect();
    const row = await MONGOC.db("miro81").collection("BC1_conlist").find({}).toArray();
    const tong = filter(row);
    await fileSystem(`write`, [ `${this.tempDir}/temp.json`, JSON.stringify(tong, null, 2) ]);
  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    console.log("done");
  }
}

BackMaker.prototype.launching = async function () {
  const instance = this;
  try {
    await this.pastToJson("client");
  } catch (e) {
    console.log(e);
  }
}

module.exports = BackMaker;
