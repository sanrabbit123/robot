const RethinkAccess = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/rethinkAccess";
  this.moduleDir = this.dir + "/module";
  this.module = this.moduleDir + "/rethinkdb.js";
  this.connectionInfo = {
    host: "home-liaison.serveftp.com",
    port: 28015,
    db: "miro81",
  };
  this.rethink = require(this.module);
  this.connection = null;
}

RethinkAccess.prototype.connect = async function () {
  const instance = this;
  const { rethink, connectionInfo } = this;
  try {
    if (this.connection !== null) {
      await this.connection.close();
    }
    const RETHINKC = await rethink.connect(connectionInfo);
    this.connection = RETHINKC;
    return RETHINKC;
  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.close = async function () {
  const instance = this;
  try {
    if (this.connection !== null) {
      await this.connection.close();
    }
  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.bindCollection = function (collection) {
  if (typeof collection !== "string") {
    throw new Error("collection must be string");
  }
  const instance = this;
  this.collection = collection;
}

RethinkAccess.prototype.rethinkRead = async function (collection, query, option = { selfRethink: null }) {
  const instance = this;
  const { rethink, connectionInfo } = this;
  let RETHINKC;
  let selfBoo, cursor, result;
  try {

    if (typeof collection === "object") {
      if (this.collection === null) {
        throw new Error("collection bind first");
      }
      if (typeof query !== "object") {
        query = { selfRethink: null };
      }
      option = query;
      query = collection;
      collection = this.collection;
    } else if (typeof collection === "string") {
      if (typeof query !== "object") {
        throw new Error("invaild query");
      }
    } else {
      throw new Error("invaild input");
    }

    selfBoo = true;
    if (this.connection === null && (option.selfRethink === undefined || option.selfRethink === null)) {
      selfBoo = false;
    }
    if (!selfBoo) {
      RETHINKC = await rethink.connect(connectionInfo);
    } else {
      if (this.connection === null) {
        RETHINKC = option.selfRethink;
      } else {
        RETHINKC = this.connection;
      }
    }

    if (Object.keys(query).length === 0) {
      cursor = await rethink.table(collection).filter((obj) => {
        return obj.hasFields("id");
      }).run(RETHINKC);
    } else {
      cursor = await rethink.table(collection).filter(query).run(RETHINKC);
    }

    result = await cursor.toArray();

    if (!selfBoo) {
      await RETHINKC.close();
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.rethinkCreate = async function (collection, json, option = { selfRethink: null }) {
  const instance = this;
  const { rethink, connectionInfo } = this;
  let RETHINKC;
  let selfBoo;
  try {

    if (typeof collection === "object") {
      if (this.collection === null) {
        throw new Error("collection bind first");
      }
      if (typeof json !== "object") {
        json = { selfRethink: null };
      }
      option = json;
      json = collection;
      collection = this.collection;
    } else if (typeof collection === "string") {
      if (typeof json !== "object") {
        throw new Error("invaild query");
      }
    } else {
      throw new Error("invaild input");
    }

    selfBoo = true;
    if (this.connection === null && (option.selfRethink === undefined || option.selfRethink === null)) {
      selfBoo = false;
    }
    if (!selfBoo) {
      RETHINKC = await rethink.connect(connectionInfo);
    } else {
      if (this.connection === null) {
        RETHINKC = option.selfRethink;
      } else {
        RETHINKC = this.connection;
      }
    }

    await rethink.table(collection).insert(json).run(RETHINKC);

    if (!selfBoo) {
      await RETHINKC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.rethinkUpdate = async function (collection, queryArr, option = { selfRethink: null }) {
  const instance = this;
  const { rethink, connectionInfo } = this;
  let RETHINKC;
  let selfBoo, cursor, result;
  try {

    if (typeof collection === "object") {
      if (this.collection === null) {
        throw new Error("collection bind first");
      }
      if (typeof queryArr !== "object") {
        queryArr = { selfRethink: null };
      }
      option = queryArr;
      queryArr = collection;
      collection = this.collection;
    } else if (typeof collection === "string") {
      if (!Array.isArray(queryArr)) {
        throw new Error("invaild queryArr");
      }
    } else {
      throw new Error("invaild input");
    }

    const [ whereQuery, updateQuery ] = queryArr;
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild input");
    }

    selfBoo = true;
    if (this.connection === null && (option.selfRethink === undefined || option.selfRethink === null)) {
      selfBoo = false;
    }
    if (!selfBoo) {
      RETHINKC = await rethink.connect(connectionInfo);
    } else {
      if (this.connection === null) {
        RETHINKC = option.selfRethink;
      } else {
        RETHINKC = this.connection;
      }
    }

    cursor = await rethink.table(collection).filter(whereQuery).run(RETHINKC);
    result = await cursor.toArray();

    if (result.length > 0) {
      const [ target ] = result;
      if (target.id !== undefined) {
        await rethink.table(collection).get(target.id).update(updateQuery).run(RETHINKC);
      }
    }

    if (!selfBoo) {
      await RETHINKC.close();
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.rethinkDelete = async function (collection, query, option = { selfRethink: null }) {
  const instance = this;
  const { rethink, connectionInfo } = this;
  let RETHINKC;
  let selfBoo, cursor, result;
  try {

    if (typeof collection === "object") {
      if (this.collection === null) {
        throw new Error("collection bind first");
      }
      if (typeof query !== "object") {
        query = { selfRethink: null };
      }
      option = query;
      query = collection;
      collection = this.collection;
    } else if (typeof collection === "string") {
      if (typeof query !== "object") {
        throw new Error("invaild query");
      }
    } else {
      throw new Error("invaild input");
    }

    selfBoo = true;
    if (this.connection === null && (option.selfRethink === undefined || option.selfRethink === null)) {
      selfBoo = false;
    }
    if (!selfBoo) {
      RETHINKC = await rethink.connect(connectionInfo);
    } else {
      if (this.connection === null) {
        RETHINKC = option.selfRethink;
      } else {
        RETHINKC = this.connection;
      }
    }

    cursor = await rethink.table(collection).filter(query).run(RETHINKC);
    result = await cursor.toArray();

    if (result.length > 0) {
      const [ target ] = result;
      if (target.id !== undefined) {
        await rethink.table(collection).get(target.id).delete().run(RETHINKC);
      }
    }

    if (!selfBoo) {
      await RETHINKC.close();
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

RethinkAccess.prototype.rethinkListCollections = async function (option = { selfRethink: null }) {
  const instance = this;
  const { rethink, connectionInfo } = this;
  let RETHINKC;
  let selfBoo, result;
  try {
    selfBoo = true;
    if (this.connection === null && (option.selfRethink === undefined || option.selfRethink === null)) {
      selfBoo = false;
    }
    if (!selfBoo) {
      RETHINKC = await rethink.connect(connectionInfo);
    } else {
      if (this.connection === null) {
        RETHINKC = option.selfRethink;
      } else {
        RETHINKC = this.connection;
      }
    }

    result = await rethink.tableList().run(RETHINKC);

    if (!selfBoo) {
      await RETHINKC.close();
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = RethinkAccess;
