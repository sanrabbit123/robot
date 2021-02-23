const MongoReflection = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const mongoTargets = [ "mongoinfo", "backinfo", "pythoninfo" ];

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/mongoReflection";
  this.servers = mongoTargets;
}

MongoReflection.prototype.mongoToJson = async function (dir = "default", target = "default") {
  const instance = this;
  const { mongo, shell, shellLink } = this.mother;
  try {
    const folderName = "mongoReflection";
    let order, targetFolder, targetDb, timeString;

    if (dir === "default") {
      targetFolder = process.cwd() + "/temp";
    } else {
      targetFolder = dir;
    }

    if (target === "default") {
      targetDb = "mongoinfo";
    } else {
      targetDb = target;
    }

    const MONGOC = new mongo("mongodb://" + this.address[targetDb].user + ':' + this.address[targetDb].password + '@' + this.address[targetDb].host + ':' + String(this.address[targetDb].port) + "/admin", { useUnifiedTopology: true });
    await MONGOC.connect();
    const collections = await MONGOC.db(`miro81`).listCollections().toArray();
    MONGOC.close();

    targetFolder = targetFolder + "/" + folderName;
    targetFolder = shellLink(targetFolder);

    timeString = (new Date()).valueOf();
    timeString = String(timeString);

    for (let i of collections) {
      order = '';
      order = `mongoexport --uri="mongodb://${this.address[targetDb]["host"]}/${this.address[targetDb]["database"]}" --username=${this.address[targetDb]["user"]} --password=${this.address[targetDb]["password"]} --port=${String(this.address[targetDb]["port"])} --collection=${i.name} --out="${targetFolder}/${timeString}/${i.name}_${timeString}.json" --authenticationDatabase admin`;
      shell.exec(order);
    }

  } catch (e) {
    console.log(e);
  }
}


MongoReflection.prototype.mongoMigration = async function (to = "local", from = "mongoinfo", option = { drop: true }) {
  const instance = this;
  const { mongo, shell, shellLink } = this.mother;
  try {
    const dbName = "miro81";
    let MONGOC_FROM, MONGOC_TO;
    let fromString, toString;
    let fromDB, toDB;
    let rows;

    fromDB = from;
    toDB = to;

    fromString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + this.address[fromDB].host + ':' + String(this.address[fromDB].port) + "/admin";
    if (toDB === "local") {
      toString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + "127.0.0.1" + ':' + String(this.address[fromDB].port) + "/admin";
    } else {
      toString = "mongodb://" + this.address[toDB].user + ':' + this.address[toDB].password + '@' + this.address[toDB].host + ':' + String(this.address[toDB].port) + "/admin";
    }

    MONGOC_FROM = new mongo(fromString, { useUnifiedTopology: true });
    MONGOC_TO = new mongo(toString, { useUnifiedTopology: true });

    await MONGOC_FROM.connect();
    await MONGOC_TO.connect();

    const collections = await MONGOC_FROM.db(dbName).listCollections().toArray();
    const collections_local = await MONGOC_TO.db(dbName).listCollections().toArray();

    if (option.drop === true || option.drop === undefined) {
      for (let i of collections_local) {
        await MONGOC_TO.db(dbName).collection(i.name).drop();
      }
    }

    for (let i of collections) {
      rows = await MONGOC_FROM.db(dbName).collection(i.name).find({}).toArray();
      for (let j of rows) {
        await MONGOC_TO.db(dbName).collection(i.name).insertOne(j);
      }
      console.log(`migration ${i.name} success`);
    }

    MONGOC_FROM.close();
    MONGOC_TO.close();

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.totalReflection = async function (to = "local") {
  const instance = this;
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  try {

    //all mongoDB reflection
    const allDB = BackMaker.allDatabaseNames;
    for (let i = 0; i < allDB.length; i++) {
      console.log(`${allDB[i]} reflection start ==================================================`);
      await this.mongoMigration(to, allDB[i], { drop: (i === 0) });
      console.log(`from: ${allDB[i]} => to: ${to} reflection success`);
      console.log(``);
    }

    //flat death to 1:1 json


    //total delete in mysql


    //extract cloumns end create table query


    //insert query


    //insert front DB



  } catch (e) {
    console.log(e);
  }
}

module.exports = MongoReflection;
