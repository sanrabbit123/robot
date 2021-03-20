const BackWorker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/backMaker";
  const BackMaker = require(this.dir + "/backMaker.js");
  this.back = new BackMaker();
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
  this.aliveDir = this.dir + "/alive";
  this.idFilterDir = this.dir + "/idFilter";
}

BackWorker.prototype.aspirantToDesigner = async function (aspidArr, option = { selfMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo } = this.mother;
  const toUpdateQuery = function (aspid) {
    let updateQuery = {};

    updateQuery["designer"]

    updateQuery["information.contract.date"]
    updateQuery["information.phone"]
    updateQuery["information.email"]
    updateQuery["information.address"]

    updateQuery["information.personalSystem.webPage"]
    updateQuery["information.personalSystem.sns"]

    updateQuery["information.business.career.startY"]
    updateQuery["information.business.career.startM"]

    updateQuery["information.business.account"]

    updateQuery["information.business.businessInfo.classification"]
    updateQuery["information.business.businessInfo.businessNumber"]

    updateQuery["information.business.service.construct.partner"]
    updateQuery["information.business.service.construct.method"]


    return updateQuery;
  }
  try {
    if (!Array.isArray(aspidArr)) {
      throw new Error("argument must be aspid arr");
    }

    let MONGOC;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = option.selfMongo;
    }

    let whereQuery;
    whereQuery = { "$or": [] };
    for (let aspid of aspidArr) {
      whereQuery["$or"].push({ aspid });
    }

    const targetAspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: MONGOC });
    let aspirantJson;

    for (let aspirant of targetAspirants) {
      aspirantJson = aspirant.toNormal();
      await back.createDesigner(toUpdateQuery(aspirantJson), { selfMongo: MONGOC });
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = BackWorker;
