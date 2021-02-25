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
  this.dropExceptionList = [ "googleAnalytics_total" ];
}

MongoReflection.prototype.showTables = async function () {
  const instance = this;
  const { mysqlQuery } = this.mother;
  try {
    let tableArr = [];
    const raw = await mysqlQuery("SHOW TABLES;");
    for (let i of raw) {
      tableArr.push(Object.values(i)[0]);
    }
    return tableArr;
  } catch (e) {
    console.log(e);
  }
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
        if (!this.dropExceptionList.includes(i.name)) {
          await MONGOC_TO.db(dbName).collection(i.name).drop();
        }
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

MongoReflection.prototype.mongoReflection = async function (to = "local") {
  const instance = this;
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  try {
    const allDB = BackMaker.allDatabaseNames;
    let consoleWording, equalNum;
    for (let i = 0; i < allDB.length; i++) {
      consoleWording = `${allDB[i]} reflection start `;
      equalNum = 78 - consoleWording.length;
      for (let j = 0; j < equalNum; j++) {
        consoleWording += '=';
      }
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, consoleWording);
      await this.mongoMigration(to, allDB[i], { drop: (i === 0) });
      console.log(`\x1b[33m%s\x1b[0m`, `from: ${allDB[i]} => to: ${to} reflection success`);
      console.log(``);
    }
  } catch (e) {
    console.log(e);
  }
}


MongoReflection.prototype.mysqlReflection = async function (to = "local") {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const back = this.back;
  try {

    let sqlList, alreadyTables;

    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `mariaDB flat reflection start ==================================================`);

    const clients = await back.getClientsByQuery({}, { withTools: true, fromLocal: true });
    const { model: clientsModel, data: clientsData } = clients.dimensionSqueeze();
    const designers = await back.getDesignersByQuery({}, { withTools: true, fromLocal: true });
    const { model: designersModel, data: designersData } = designers.dimensionSqueeze();
    const projects = await back.getProjectsByQuery({}, { withTools: true, fromLocal: true });
    const { model: projectsModel, data: projectsData } = projects.dimensionSqueeze();
    const aspirants = await back.getAspirantsByQuery({}, { withTools: true, fromLocal: true });
    const { model: aspirantsModel, data: aspirantsData } = aspirants.dimensionSqueeze();
    const contentsArr = await back.getContentsArrByQuery({}, { withTools: true, fromLocal: true });
    const { model: contentsArrModel, data: contentsArrData } = contentsArr.dimensionSqueeze();

    alreadyTables = await this.showTables();
    sqlList = [];

    if (alreadyTables.includes("client")) {
      sqlList.push(clientsModel.getDropSql());
      console.log(`client table in mysql delete`);
    }
    if (alreadyTables.includes("designer")) {
      sqlList.push(designersModel.getDropSql());
      console.log(`designer table in mysql delete`);
    }
    if (alreadyTables.includes("project")) {
      sqlList.push(projectsModel.getDropSql());
      console.log(`project table in mysql delete`);
    }
    if (alreadyTables.includes("aspirant")) {
      sqlList.push(aspirantsModel.getDropSql());
      console.log(`aspirant table in mysql delete`);
    }
    if (alreadyTables.includes("contents")) {
      sqlList.push(contentsArrModel.getDropSql());
      console.log(`contents table in mysql delete`);
    }

    sqlList.push(clientsModel.getCreateSql());
    sqlList.push(designersModel.getCreateSql());
    sqlList.push(projectsModel.getCreateSql());
    sqlList.push(aspirantsModel.getCreateSql());
    sqlList.push(contentsArrModel.getCreateSql());
    console.log(`create tables`);

    //insert query
    let tempArr;

    tempArr = clientsData.getInsertSql();
    for (let insertQuery of tempArr) {
      sqlList.push(insertQuery);
    }
    console.log(`insert client query`);
    tempArr = designersData.getInsertSql();
    for (let insertQuery of tempArr) {
      sqlList.push(insertQuery);
    }
    console.log(`insert designer query`);
    tempArr = projectsData.getInsertSql();
    for (let insertQuery of tempArr) {
      sqlList.push(insertQuery);
    }
    console.log(`insert project query`);
    tempArr = aspirantsData.getInsertSql();
    for (let insertQuery of tempArr) {
      sqlList.push(insertQuery);
    }
    console.log(`insert aspirant query`);
    tempArr = contentsArrData.getInsertSql();
    for (let insertQuery of tempArr) {
      sqlList.push(insertQuery);
    }
    console.log(`insert contents query`);

    //execute
    await mysqlQuery(sqlList);
    console.log(`\x1b[33m%s\x1b[0m`, `mariaDB flat reflection success`);
    console.log(``);

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.ultimateReflection = async function (to = "local") {
  const instance = this;
  const os = require("os");
  try {
    await this.mongoReflection(to);
    if (os.type() !== 'Darwin') {
      await this.mysqlReflection(to);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = MongoReflection;
