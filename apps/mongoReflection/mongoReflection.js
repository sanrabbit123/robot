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
  this.dropExceptionList = [ "slackMessages", "apartInfo" ];
}

MongoReflection.prototype.showTables = async function (location = "local") {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  try {
    let tableArr = [];
    let whereQuery = {};
    if (/local/gi.test(location)) {
      whereQuery["local"] = true;
    } else if (/front/gi.test(location) || /web/gi.test(location)) {
      whereQuery["front"] = true;
    } else if (/office/gi.test(location)) {
      whereQuery["office"] = true;
    } else if (/home/gi.test(location)) {
      whereQuery["home"] = true;
    }
    const raw = await mysqlQuery("SHOW TABLES;", whereQuery);
    for (let i of raw) {
      tableArr.push(String(Object.values(i)[0]));
    }
    return tableArr;
  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.showColumns = async function (table, location = "local") {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  try {
    let result = [];
    let whereQuery = {};
    if (/local/gi.test(location)) {
      whereQuery["local"] = true;
    } else if (/front/gi.test(location) || /web/gi.test(location)) {
      whereQuery["front"] = true;
    } else if (/office/gi.test(location)) {
      whereQuery["office"] = true;
    } else if (/home/gi.test(location)) {
      whereQuery["home"] = true;
    }
    const raw = await mysqlQuery("DESC " + table, whereQuery);
    for (let obj of raw) {
      if (String(obj.Field) !== 'id' && String(obj.Field) !== 'Id' && String(obj.Field) !== 'ID') {
        result.push({
          column: String(obj.Field),
          type: String(obj.Type)
        });
      }
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.showData = async function (table, location = "local") {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  class MysqlObject {
    toInsertQuery() {
      let sql;
      let columns = Object.keys(this);

      sql = "INSERT INTO ";
      sql += table;
      sql += " (";
      for (let i of columns) {
        sql += i + ',';
      }
      sql = sql.slice(0, -1) + ") VALUES (";
      for (let i of columns) {
        sql += "'" + String(this[i]).replace(/\'/g, '"') + "',";
      }
      sql = sql.slice(0, -1) + ");";

      return sql;
    }
  }
  try {
    let result = [];
    let whereQuery = {};
    let refinedObj;
    if (/local/gi.test(location)) {
      whereQuery["local"] = true;
    } else if (/front/gi.test(location) || /web/gi.test(location)) {
      whereQuery["front"] = true;
    } else if (/office/gi.test(location)) {
      whereQuery["office"] = true;
    } else if (/home/gi.test(location)) {
      whereQuery["home"] = true;
    }
    const raw = await mysqlQuery("SELECT * FROM " + table, whereQuery);
    for (let obj of raw) {
      refinedObj = new MysqlObject();
      for (let i in obj) {
        if (i !== "id" && i !== "Id" && i !== "ID") {
          refinedObj[i] = String(obj[i]);
        }
      }
      result.push(refinedObj);
    }
    return result;
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
      order = `mongodump --uri="mongodb://${this.address[targetDb]["host"]}/${this.address[targetDb]["database"]}" --username=${this.address[targetDb]["user"]} --password=${this.address[targetDb]["password"]} --port=${String(this.address[targetDb]["port"])} --collection=${i.name} --out="${targetFolder}/${timeString}/${i.name}_${timeString}.json" --authenticationDatabase admin`;
      shell.exec(order);
    }

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.mongoMigration = async function (to = "local", from = "mongoinfo", option = { drop: true }) {
  const instance = this;
  const { mongo } = this.mother;
  try {
    const dbName = "miro81";
    let MONGOC_FROM, MONGOC_TO;
    let fromString, toString;
    let fromDB, toDB;
    let fromHost;
    let rows;

    fromDB = from;
    fromHost = this.address[fromDB].host;
    toDB = to;

    fromString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + fromHost + ':' + String(this.address[fromDB].port) + "/admin";
    if (toDB === "local") {
      toString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + "127.0.0.1" + ':' + String(this.address[fromDB].port) + "/admin";
    } else {
      toString = "mongodb://" + this.address[toDB].user + ':' + this.address[toDB].password + '@' + this.address[toDB].host + ':' + String(this.address[toDB].port) + "/admin";
    }

    console.log(from);
    console.log(`from DB : ${JSON.stringify(this.address[fromDB], null, 2)}`);

    MONGOC_FROM = new mongo(fromString, { useUnifiedTopology: true });
    MONGOC_TO = new mongo(toString, { useUnifiedTopology: true });

    await MONGOC_FROM.connect();
    await MONGOC_TO.connect();

    console.log("connection success");

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

    await MONGOC_FROM.close();
    await MONGOC_TO.close();

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
    await mysqlQuery(sqlList, { local: true });
    console.log(`\x1b[33m%s\x1b[0m`, `mariaDB flat reflection success`);
    console.log(``);

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.ultimateReflection = async function (to = "local") {
  const instance = this;
  try {
    await this.mongoReflection(to);
  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.coreReflection = async function (to = "local") {
  const instance = this;
  const { mongo } = this.mother;
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  try {
    const targets = BackMaker.coreDatabaseNames;
    const dbName = "miro81";
    let MONGOC_FROM, MONGOC_TO;
    let fromString, toString;
    let fromDB, toDB;
    let rows;
    let consoleWording;
    let equalNum;

    for (let [ from, collection ] of targets) {

      consoleWording = `${from} reflection start `;
      equalNum = 78 - consoleWording.length;
      for (let j = 0; j < equalNum; j++) {
        consoleWording += '=';
      }
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, consoleWording);

      fromDB = from;
      fromHost = this.address[fromDB].host;
      toDB = to;
      fromString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + fromHost + ':' + String(this.address[fromDB].port) + "/admin";
      if (toDB === "local") {
        toString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + "127.0.0.1" + ':' + String(this.address[fromDB].port) + "/admin";
      } else {
        toString = "mongodb://" + this.address[toDB].user + ':' + this.address[toDB].password + '@' + this.address[toDB].host + ':' + String(this.address[toDB].port) + "/admin";
      }

      console.log(`from DB : ${JSON.stringify(this.address[fromDB], null, 2)}`);

      MONGOC_FROM = new mongo(fromString, { useUnifiedTopology: true });
      MONGOC_TO = new mongo(toString, { useUnifiedTopology: true });

      await MONGOC_FROM.connect();
      await MONGOC_TO.connect();

      console.log("connection success");

      for (let i of collection) {
        try {
          await MONGOC_TO.db(dbName).collection(i).drop();
        } catch (e) {
          console.log("There is no collection : " + i);
        }

        rows = await MONGOC_FROM.db(dbName).collection(i).find({}).toArray();
        for (let j of rows) {
          await MONGOC_TO.db(dbName).collection(i).insertOne(j);
        }
        console.log(`migration ${i} success`);

      }

      await MONGOC_FROM.close();
      await MONGOC_TO.close();

      console.log(`\x1b[33m%s\x1b[0m`, `from: ${from} => to: ${to} reflection success`);
      console.log(``);

    }

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.mongoToFront = async function () {
  const instance = this;
  const back = this.back;
  const { mysqlQuery } = this.mother;
  try {
    const designerToFront = async function () {
      try {
        const designers = await back.getDesignersByQuery({});
        let queryArr, columns, table;
        let createQuery;
        let types;

        table = "designer";

        columns = [
          "desid",
          "designer",
          "introduction",
          "porlid",
          "tid",
        ];

        types = [
          "VARCHAR(255)",
          "VARCHAR(255)",
          "TEXT",
          "VARCHAR(255)",
          "VARCHAR(255)",
        ];

        queryArr = designers.frontMode().filter((obj) => {
          return !/해지/gi.test(obj.information.contract.status);
        }).filter((obj) => {
          return obj.setting.front.introduction.desktop.length > 0;
        }).filter((obj) => {
          return /^[ap]/i.test(obj.setting.front.photo.porlid);
        }).map((designer) => {
          let value;
          let query;

          value = [
            designer.desid,
            designer.designer,
            designer.setting.front.introduction.desktop.join(" "),
            designer.setting.front.photo.porlid,
            designer.setting.front.photo.index
          ];

          query = "INSERT INTO ";
          query += table;
          query += " (";
          for (let i of columns) {
            query += i + ',';
          }
          query = query.slice(0, -1) + ") VALUES (";
          for (let i of value) {
            query += "'" + String(i).replace(/\'/g, '"') + "',";
          }
          query = query.slice(0, -1) + ");";

          return query;
        });

        createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
        for (let i = 0; i < columns.length; i++) {
          createQuery += columns[i] + ' ' + types[i] + ',';
        }
        createQuery += "PRIMARY KEY (id));";

        queryArr.unshift(createQuery);
        queryArr.unshift("DROP TABLE " + table + ";");

        await mysqlQuery(queryArr);

      } catch (e) {
        console.log(e);
      }
    }
    const contentsToFront = async function () {
      try {
        const contents = await back.getContentsArrByQuery({});
        let queryArr, columns, table;
        let createQuery;
        let types;

        table = "contents";

        columns = [
          "conid",
          "desid",
          "pid",
          "rid",
          "portfoliotitlemain",
          "portfoliotitlesub",
          "apart",
          "reviewtitlemain",
          "reviewtitlesub",
          "portfoliocontents",
          "reviewcontents",
          "portfoliotid",
          "reivewtid"
        ];

        types = [
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "VARCHAR(255)",
          "TEXT",
          "TEXT",
          "VARCHAR(255)",
          "VARCHAR(255)",
        ];


        queryArr = contents.map((obj) => {
          let value;
          let query;

          value = [
            obj.conid,
            obj.desid,
            obj.contents.portfolio.pid,
            obj.contents.review.rid,
            obj.contents.portfolio.title.main,
            obj.contents.portfolio.title.sub.split(", ")[0],
            obj.contents.portfolio.title.sub.split(", ")[1],
            obj.contents.review.title.main,
            obj.contents.review.title.sub.replace(/,/gi, ''),
            obj.contents.portfolio.contents.detail.toNormal().map((o) => { return o.contents }).join("\n"),
            obj.contents.review.contents.detail.toNormal().map((o) => { return o.contents.map((k) => { return k.question + "\n" + k.answer }).join("\n") }).join("\n").slice(1),
            't' + String(obj.contents.portfolio.detailInfo.photodae[1]),
            't' + String(obj.contents.review.detailInfo.photodae[1]),
          ];

          query = "INSERT INTO ";
          query += table;
          query += " (";
          for (let i of columns) {
            query += i + ',';
          }
          query = query.slice(0, -1) + ") VALUES (";
          for (let i of value) {
            query += "'" + String(i).replace(/\'/g, '"') + "',";
          }
          query = query.slice(0, -1) + ");";

          return query;
        });

        createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
        for (let i = 0; i < columns.length; i++) {
          createQuery += columns[i] + ' ' + types[i] + ',';
        }
        createQuery += "PRIMARY KEY (id));";

        queryArr.unshift(createQuery);
        queryArr.unshift("DROP TABLE " + table + ";");

        await mysqlQuery(queryArr);
      } catch (e) {
        console.log(e);
      }
    }
    await designerToFront();
    await contentsToFront();
  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.frontReflection = async function (to = "local") {
  const instance = this;
  const { mongo } = this.mother;
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  try {
    const targets = BackMaker.frontDatabaseNames;
    const dbName = "miro81";
    let MONGOC_FROM, MONGOC_TO;
    let fromString, toString;
    let fromDB, toDB;
    let rows;
    let consoleWording;
    let equalNum;

    for (let [ from, collection ] of targets) {

      consoleWording = `${from} reflection start `;
      equalNum = 78 - consoleWording.length;
      for (let j = 0; j < equalNum; j++) {
        consoleWording += '=';
      }
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, consoleWording);

      fromDB = from;
      fromHost = this.address[fromDB].host;
      toDB = to;
      fromString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + fromHost + ':' + String(this.address[fromDB].port) + "/admin";
      if (toDB === "local") {
        toString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + "127.0.0.1" + ':' + String(this.address[fromDB].port) + "/admin";
      } else {
        toString = "mongodb://" + this.address[toDB].user + ':' + this.address[toDB].password + '@' + this.address[toDB].host + ':' + String(this.address[toDB].port) + "/admin";
      }

      console.log(`from DB : ${JSON.stringify(this.address[fromDB], null, 2)}`);

      MONGOC_FROM = new mongo(fromString, { useUnifiedTopology: true });
      MONGOC_TO = new mongo(toString, { useUnifiedTopology: true });

      await MONGOC_FROM.connect();
      await MONGOC_TO.connect();

      console.log("connection success");

      for (let i of collection) {

        try {
          await MONGOC_TO.db(dbName).collection(i).drop();
        } catch {
          console.log("There is no collection : " + i);
        }

        rows = await MONGOC_FROM.db(dbName).collection(i).find({}).toArray();
        for (let j of rows) {
          await MONGOC_TO.db(dbName).collection(i).insertOne(j);
        }
        console.log(`migration ${i} success`);

      }

      await MONGOC_FROM.close();
      await MONGOC_TO.close();

      console.log(`\x1b[33m%s\x1b[0m`, `from: ${from} => to: ${to} reflection success`);
      console.log(``);

    }

    await this.mongoToFront();

  } catch (e) {
    console.log(e);
  }
}

MongoReflection.prototype.logReflection = async function () {
  const instance = this;
  const { mongo } = this.mother;
  try {
    const dbName = "miro81";
    const secondPort = 27018;
    const fromDB = "testinfo";
    let MONGOC_FROM, MONGOC_TO;
    let fromString, toString;
    let toDB;
    let rows;
    let consoleWording;
    let equalNum;
    let collection;

    fromHost = this.address[fromDB].host;
    fromString = "mongodb://" + this.address[fromDB].user + ':' + this.address[fromDB].password + '@' + fromHost + ':' + String(this.address[fromDB].port) + "/admin";
    toString = "mongodb://" + this.address.officeinfo.mongo.user + ':' + this.address.officeinfo.mongo.password + '@' + "127.0.0.1" + ':' + String(secondPort) + "/admin";

    console.log(`from DB : ${JSON.stringify(this.address[fromDB], null, 2)}`);

    MONGOC_FROM = new mongo(fromString, { useUnifiedTopology: true });
    MONGOC_TO = new mongo(toString, { useUnifiedTopology: true });

    await MONGOC_FROM.connect();
    await MONGOC_TO.connect();

    console.log("connection success");

    collection = (await MONGOC_FROM.db(dbName).listCollections().toArray()).map((obj) => { return obj.name });

    for (let i of collection) {

      try {
        await MONGOC_TO.db(dbName).collection(i).drop();
      } catch {
        console.log("There is no collection : " + i);
      }

      rows = await MONGOC_FROM.db(dbName).collection(i).find({}).toArray();
      for (let j of rows) {
        await MONGOC_TO.db(dbName).collection(i).insertOne(j);
      }
      console.log(`migration ${i} success`);

    }

    await MONGOC_FROM.close();
    await MONGOC_TO.close();

    console.log(`\x1b[33m%s\x1b[0m`, `log console to second ghost reflection success`);
    console.log(``);

  } catch (e) {
    console.log(e);
  }
}

module.exports = MongoReflection;
