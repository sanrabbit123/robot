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

BackWorker.prototype.setProposalToClient = async function (dateArray = [], option = { selfMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, slack_bot, ghostRequest } = this.mother;
  try {
    if (!Array.isArray(dateArray)) {
      if (dateArray === null || dateArray === undefined) {
        dateArray = [];
      } else {
        throw new Error("arguments must be array and [ startDate, endDate ]");
      }
    }
    let MONGOC;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = option.selfMongo;
    }

    let searchQuery;
    if (dateArray.length === 0) {
      searchQuery = {};
    } else if (dateArray.length === 2) {
      searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": dateArray[0], "$lt": dateArray[1] } } } };
    } else {
      throw new Error("arguments must be array and [ startDate, endDate ]");
    }

    const clients = await back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: MONGOC });
    const allRequests = clients.getRequestsTong();
    let projects, tempArr, tempArr2, matrix, timelines;
    let whereQuery, updateQuery;

    for (let { cliid, requests } of clients) {
      projects = await back.getProjectsByQuery({ cliid }, { selfMongo: MONGOC });

      tempArr = [];
      for (let p of projects) {
        tempArr.push({ proid: p.proid, date: p.proposal.date, contract: /^d/i.test(p.desid) });
      }
      whereQuery = { cliid };

      timelines = [];
      for (let { request: { timeline } } of requests) {
        timelines.push(timeline);
      }

      if (timelines.length === 1) {
        updateQuery = { "requests.0.analytics.proposal": tempArr };
      } else {
        updateQuery = {};
        matrix = [];
        for (let i = 0; i < timelines.length; i++) {
          if (i === 0) {
            matrix.unshift([]);
            for (let obj of tempArr) {
              if (obj.date.valueOf() >= timelines[i].valueOf()) {
                matrix[0].push(obj);
              }
            }
            updateQuery["requests." + String(i) + ".analytics.proposal"] = matrix[0];
          } else {
            matrix.unshift([]);
            for (let obj of tempArr) {
              if (obj.date.valueOf() >= timelines[i].valueOf() && obj.date.valueOf() < timelines[i - 1].valueOf()) {
                matrix[0].push(obj);
              }
            }
            updateQuery["requests." + String(i) + ".analytics.proposal"] = matrix[0];
          }
        }
      }

      await back.updateClient([ whereQuery, updateQuery ], { selfMongo: MONGOC });
      console.log(`update ${JSON.stringify(whereQuery)} done`);
    }

  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.aspirantToDesigner = async function (aspidArr, option = { selfMongo: null }) {
  /*
  aspidArr = [
    { aspid: "a2000_0000", contract: new Date() }
  ];
  */
  class AspidArr extends Array {
    constructor(arr) {
      super();
      for (let i of arr) {
        if (i.aspid === undefined || i.contract === undefined) {
          throw new Error("invaild aspid arr");
        }
        this.push(i);
      }
    }
    search(aspid) {
      let target = null;
      for (let i of this) {
        if (aspid === i.aspid) {
          target = i.contract;
          break;
        }
      }
      return target;
    }
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, slack_bot, ghostRequest } = this.mother;
  const toUpdateQuery = function (aspirant, contractDay) {
    const today = new Date();
    const thisDesigner = aspirant.designer + " (" + aspirant.aspid + ")";
    let updateQuery = {};
    let snsObj, tempObj;

    updateQuery["designer"] = aspirant.designer;
    updateQuery["information.contract.date"] = contractDay;

    //phone
    if (aspirant.phone === "" || aspirant.phone === undefined || aspirant.phone === null) {
      slack_bot.chat.postMessage({ text: thisDesigner + " 디자이너의 핸드폰 번호가 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.phone"] = aspirant.phone;

    //email
    if (aspirant.email === "" || aspirant.email === undefined || aspirant.email === null) {
      slack_bot.chat.postMessage({ text: thisDesigner + " 디자이너의 이메일이 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.email"] = aspirant.email;

    //address
    if (aspirant.address === "" || aspirant.address === undefined || aspirant.address === null) {
      slack_bot.chat.postMessage({ text: thisDesigner + " 디자이너의 주소가 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.address"] = [ aspirant.address ];

    //web and sns
    updateQuery["information.personalSystem.webPage"] = aspirant.information.channel.web;
    updateQuery["information.personalSystem.sns"] = [];
    for (let link of aspirant.information.channel.sns) {
      tempObj = {};
      tempObj.kind = "etc";
      if (/naver/gi.test(link)) {
        tempObj.kind = "Naver";
      } else if (/insta/gi.test(link)) {
        tempObj.kind = "Instagram";
      }
      tempObj.href = link;
      updateQuery["information.personalSystem.sns"].push(tempObj);
    }

    //career
    if (aspirant.information.career.styling.year === 0 && aspirant.information.career.styling.month === 0 && aspirant.information.career.interior.year === 0 && aspirant.information.career.interior.month === 0) {
      slack_bot.chat.postMessage({ text: thisDesigner + " 디자이너의 경력 사항이 없습니다!", channel: "#300_designer" });
      return null;
    }
    if (aspirant.information.career.styling.year === 0 && aspirant.information.career.styling.month === 0) {
      today.setMonth(today.getMonth() - ((aspirant.information.career.styling.year * 12) + aspirant.information.career.styling.month));
      updateQuery["information.business.career.startY"] = today.getFullYear();
      updateQuery["information.business.career.startM"] = today.getMonth() + 1;
    } else {
      today.setMonth(today.getMonth() - ((aspirant.information.career.interior.year * 12) + aspirant.information.career.interior.month));
      updateQuery["information.business.career.startY"] = today.getFullYear();
      updateQuery["information.business.career.startM"] = today.getMonth() + 1;
    }

    //account
    if (aspirant.information.account.number === "" || aspirant.information.account.number === null || aspirant.information.account.number === undefined) {
      slack_bot.chat.postMessage({ text: thisDesigner + " 디자이너의 계좌 번호가 없습니다!", channel: "#300_designer" });
      return null;
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
      slack_bot.chat.postMessage({ text: thisDesigner + " 사업자 정보가 없습니다!", channel: "#300_designer" });
      return null;
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
  const designerRequest = ghostRequest().bindPath("designer");
  try {
    if (!Array.isArray(aspidArr)) {
      throw new Error("argument must be aspid arr");
    }
    aspidArr = new AspidArr(aspidArr);

    let MONGOC;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    } else {
      MONGOC = option.selfMongo;
    }

    let whereQuery;
    whereQuery = { "$or": [] };
    for (let { aspid } of aspidArr) {
      whereQuery["$or"].push({ aspid });
    }

    const targetAspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: MONGOC });
    let aspirantJson, updateQuery, contractDay, newDesid, newDesigner;

    for (let aspirant of targetAspirants) {
      contractDay = aspidArr.search(aspirant.aspid);
      aspirantJson = aspirant.toNormal();
      updateQuery = toUpdateQuery(aspirantJson, contractDay);
      if (updateQuery !== null) {
        newDesid = await back.createDesigner(updateQuery, { selfMongo: MONGOC });
        newDesigner = await back.getDesignerById(newDesid, { selfMongo: MONGOC });
        await designerRequest("create", { name: newDesigner.designer, subid: newDesigner.information.did });
      }
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = BackWorker;
