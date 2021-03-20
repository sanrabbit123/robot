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
  const toUpdateQuery = function (aspirant) {
    let updateQuery = {};

    updateQuery["designer"] = aspirant.designer;

    updateQuery["information.contract.date"] = new Date();
    updateQuery["information.phone"] = aspirant.phone;
    updateQuery["information.email"] = aspirant.email;
    updateQuery["information.address"] = [ aspirant.address ];

    updateQuery["information.personalSystem.webPage"] = aspirant.information.web;
    updateQuery["information.personalSystem.sns"] = aspirant.information.sns;

    updateQuery["information.business.career.startY"] = null;
    updateQuery["information.business.career.startM"] = null;

    updateQuery["information.business.account"] = null;

    updateQuery["information.business.businessInfo.classification"] = null;
    updateQuery["information.business.businessInfo.businessNumber"] = null;

    updateQuery["information.business.service.construct.partner"] = null;
    updateQuery["information.business.service.construct.method"] = null;

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
