const BillMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/billMaker";
  this.mapDir = this.dir + "/map";
  this.tempDir = process.cwd() + "/temp";
}

BillMaker.billCollections = [
  "cashReceipt",
  "taxBill",
  "stylingForm",
];

BillMaker.prototype.createBill = async function (collection, updateQueryArr, option = { selfMongo: null }) {
  if (typeof collection !== "string" || !Array.isArray(updateQueryArr) || typeof option !== "object") {
    throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
  if (!BillMaker.billCollections.includes(collection)) {
    throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
  if (!updateQueryArr.every((o) => { return typeof o === "object"; })) {
    throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  const map = require(`${this.mapDir}/${collection}.js`);
  try {
    const { main, alive } = map;
    if (typeof main !== "function" || typeof alive !== "function") {
      throw new Error("invaild collection model");
    }
    let MONGOC;
    let selfBoo;
    let tong;
    let rows;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    tong = main(alive, updateQueryArr);
    for (let { fresh, findQuery, insertEvent } of tong) {
      rows = await MONGOC.db(`miro81`).collection(collection).find(findQuery).toArray();
      if (rows.length === 0) {
        await insertEvent.call(instance, fresh);
        await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
      }
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.createBill = async function (collection, updateQueryArr, option = { selfMongo: null, devAlive: false }) {
  if (typeof collection !== "string" || !Array.isArray(updateQueryArr)) {
    throw new Error("input must be String: bill collection, Array: updateQueryArr")
  }
  if (!BillMaker.billCollections.includes(collection)) {
    throw new Error("input must be String: bill collection, Array: updateQueryArr")
  }
  if (!updateQueryArr.every((o) => { return typeof o === "object"; })) {
    throw new Error("input must be String: bill collection, Array: updateQueryArr")
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  const MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
  const map = require(`${this.mapDir}/${collection}.js`);
  try {
    const { main, alive } = map;
    if (typeof main !== "function" || typeof alive !== "function") {
      throw new Error("invaild collection model");
    }







  } catch (e) {
    console.log(e);
  }
}

module.exports = BillMaker;
