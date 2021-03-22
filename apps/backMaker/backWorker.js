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
    const today = new Date();
    let updateQuery = {};

    updateQuery["designer"] = aspirant.designer;
    updateQuery["information.contract.date"] = today;

    //phone
    if (aspirant.phone === "" || aspirant.phone === undefined || aspirant.phone === null) {
      throw new Error("There is no phone");
    }
    updateQuery["information.phone"] = aspirant.phone;

    //email
    if (aspirant.email === "" || aspirant.email === undefined || aspirant.email === null) {
      throw new Error("There is no email");
    }
    updateQuery["information.email"] = aspirant.email;

    //address
    if (aspirant.address === "" || aspirant.address === undefined || aspirant.address === null) {
      throw new Error("There is no address");
    }
    updateQuery["information.address"] = [ aspirant.address ];

    //web and sns
    updateQuery["information.personalSystem.webPage"] = aspirant.information.web;
    updateQuery["information.personalSystem.sns"] = aspirant.information.sns;

    //career
    if (aspirant.information.styling.year === 0 && aspirant.information.styling.month === 0) {
      throw new Error("There is no career");
    }
    today.setMonth(today.getMonth() - ((aspirant.information.styling.year * 12) + aspirant.information.styling.month));
    updateQuery["information.business.career.startY"] = today.getFullYear();
    updateQuery["information.business.career.startM"] = today.getMonth() + 1;

    //account
    if (aspirant.information.account.number === "" || aspirant.information.account.number === null || aspirant.information.account.number === undefined) {
      throw new Error("There is no account");
    }
    updateQuery["information.business.account"] = [
      {
        bankName: aspirant.information.account.bank,
        accountNumber: aspirant.information.account.number,
        to: aspirant.information.account.to,
      }
    ];

    //classification and businessNumber
    if (aspirant.information.company.classification === "" || aspirant.information.company.classification === null || aspirant.information.company.classification === undefined) {
      throw new Error("There is no classification");
    }
    if (/개인/gi.test(aspirant.information.company.classification)) {
      if (/일반/gi.test(aspirant.information.company.classification)) {
        updateQuery["information.business.businessInfo.classification"] = "개인사업자(일반)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      } else {
        updateQuery["information.business.businessInfo.classification"] = "개인사업자(간이)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      }
    } else if (/법인/gi.test(aspirant.information.company.classification)) {
      if (/일반/gi.test(aspirant.information.company.classification)) {
        updateQuery["information.business.businessInfo.classification"] = "법인사업자(일반)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      } else {
        updateQuery["information.business.businessInfo.classification"] = "법인사업자(간이)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      }
    } else {
      updateQuery["information.business.businessInfo.classification"] = "프리랜서";
      updateQuery["information.business.businessInfo.businessNumber"] = "";
    }

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
