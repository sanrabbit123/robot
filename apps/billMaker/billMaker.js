const BillMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/billMaker";
  this.mapDir = this.dir + "/map";
  this.tempDir = process.cwd() + "/temp";
}

BillMaker.prototype.getClientById = async function (cliid, option = { withTools: false, selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  let { Client, Clients } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      arr = await MONGOC.db(`miro81`).collection(button).find({ cliid }).toArray();
      await MONGOC.close();
    } else {
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ cliid }).toArray();
    }

    if (option.withTools) {
      const { Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/tools.js`);
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

BillMaker.prototype.getClientsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  } else {
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }
  const button = "client";
  let { Client, Clients } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/generator.js`);
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
      await MONGOC.close();
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
      const { Tools } = require(`${option.devAlive === true ? this.devAliveDir : this.aliveDir}/${button}/addOn/tools.js`);
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

BillMaker.prototype.updateClient = async function (queryArr, option = { selfMongo: null, devAlive: false }) {
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
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.deleteClient = async function (cliid, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  try {
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).deleteOne({ cliid });
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ cliid });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.returnClientDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/client.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BillMaker.prototype.returnClientRequest = function () {
  const instance = this;
  const map = require(`${this.mapDir}/client.js`);
  let request;
  request = map.sub("requests");
  return request;
}

BillMaker.prototype.createClient = async function (updateQuery, option = { selfMongo: null, devAlive: false }) {
  const instance = this;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const button = "client";
  const map = require(`${option.devAlive === true ? this.devMapDir : this.mapDir}/client.js`);
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
    dummy = map.main();
    requestDummy = map.sub("requests");
    dummy.structure.requests.unshift(requestDummy);
    dummy.structure.cliid = this.idMaker(latestClient.cliid);

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    await this.updateClient([ { cliid: dummy.structure.cliid }, updateQuery ], option);

    return dummy.structure.cliid;
  } catch (e) {
    console.log(e);
  }
}

module.exports = BillMaker;
