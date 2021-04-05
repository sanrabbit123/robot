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
      } else if (dateArray === "cron") {
        const today = new Date();
        const agoDay = new Date();
        agoDay.setMonth(agoDay.getMonth() - 2);
        dateArray = [ agoDay, today ];
      } else {
        throw new Error("arguments must be array and [ startDate, endDate ]");
      }
    }
    let MONGOC;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOC.connect();
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

    console.log(`\x1b[33m%s\x1b[0m`, `client-proposal sync start...`);
    console.log(``);

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
      console.log(`update ${JSON.stringify(whereQuery)} client-proposal sync done`);
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC.close();
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
      today.setMonth(today.getMonth() - ((aspirant.information.career.interior.year * 12) + aspirant.information.career.interior.month));
      updateQuery["information.business.career.startY"] = today.getFullYear();
      updateQuery["information.business.career.startM"] = today.getMonth() + 1;
    } else {
      today.setMonth(today.getMonth() - ((aspirant.information.career.styling.year * 12) + aspirant.information.career.styling.month));
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
      await MONGOC.connect();
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

    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.newDesignerToFront = async function (desidArr, option = { selfMongo: null }) {
  const instance = this;
  try {
    if (!Array.isArray(desidArr)) {
      throw new Error(`arguments must be desid array => [ desid, desid, desid... ]`);
    }
    class DesignerFrontIndex {

      constructor(mother, back, option = { selfMongo: null }) {
        this.mother = mother;
        this.back = back;
        this.option = option;
      }

      toNormal() {
        let obj = {};
        obj.introduction = this.introduction;
        obj.methods = this.methods;
        obj.photo = this.photo;
        obj.order = this.order;
        obj.designer = this.designer;
        obj.desid = this.desid;
        return obj;
      }

      async getFromNotes(desid) {
        try {
          const AppleNotes = require(`${process.cwd()}/apps/appleAPIs/appleNotes.js`);
          let notes, strArr;
          let keyIndexArr;
          notes = new AppleNotes({ folder: "designer", subject: desid });
          strArr = await notes.readNote();
          keyIndexArr = [];
          for (let i = 0; i < strArr.length; i++) {
            if (/^_/.test(strArr[i])) {
              keyIndexArr.push(i);
            }
          }
          this.noteArr = strArr;
          this.keyIndexArr = keyIndexArr;
        } catch (e) {
          console.log(e);
        }
      }

      generateDummy(designer = '', desid = '') {
        this.introduction = {
          desktop: [],
          mobile: []
        };
        this.methods = [];
        this.photo = {
          porlid: "",
          index: "",
        };
        this.order = 0;
        this.designer = designer;
        this.desid = desid;
      }

      setIntroduction() {
        let start, end;
        start = this.keyIndexArr[0];
        end = this.keyIndexArr[1];
        for (let i = start + 1; i < end; i++) {
          this.introduction.desktop.push(this.noteArr[i]);
        }
        start = this.keyIndexArr[1];
        end = this.keyIndexArr[2];
        for (let i = start + 1; i < end; i++) {
          this.introduction.mobile.push(this.noteArr[i]);
        }
      }

      setMethod() {
        let start, end;
        start = this.keyIndexArr[2];
        end = this.keyIndexArr[3];
        for (let i = start + 1; i < end; i++) {
          this.methods.push(this.noteArr[i]);
        }
      }

      setPhoto() {
        let start, end;
        start = this.keyIndexArr[3];
        end = this.keyIndexArr[4];
        for (let i = start + 1; i < end; i++) {
          this.photo.porlid = this.noteArr[i];
        }
        start = this.keyIndexArr[4];
        end = this.keyIndexArr[5];
        for (let i = start + 1; i < end; i++) {
          this.photo.index = this.noteArr[i];
        }
      }

      setOrder() {
        let start, end;
        start = this.keyIndexArr[5];
        end = this.noteArr.length;
        for (let i = start + 1; i < end; i++) {
          this.order = Number(this.noteArr[i].replace(/[^0-9]/g, ''));
        }
      }

      async returnFrontObject(designerObj) {
        try {
          const { designer, desid } = designerObj;
          await this.getFromNotes(desid);
          this.generateDummy(designer, desid);
          this.setIntroduction();
          this.setMethod();
          this.setPhoto();
          this.setOrder();
          return this.toNormal();
        } catch (e) {
          console.log(e);
        }
      }

      renderScript(data) {
        const aiFuncs = function () {
          const targets = [ "desktop", "mobile" ];
          let this_ai, textBox, to;
          for (let t of targets) {
            console.open(new File(this.etc.template + "/designer/" + t + "/template.ai"));
            this_ai = console.activeDocument();
            textBox = this_ai.pageItems.getByName("active");
            textBox.contents = data.introduction[t].join("\n");
            console.expandAll();
            console.saveSvg(this_ai, t);
          }
          this_ai = console.createDoc();
          to = "name";
          console.setCreateSetting({ from: "general", to, exception: { font: "sandoll700" } });
          console.setParagraph({ from: data.designer, to });
          console.createElements(this_ai, console.createSetting[to]);
          console.fit_box();
          console.expandAll();
          console.saveSvg(this_ai, to);
        }
        let aiScript;
        aiScript = `const data = ${JSON.stringify(data, null, 2)};\n`;
        aiScript += aiFuncs.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, '');
        return aiScript;
      }

      async renderDesigner(designerObj, query = false) {
        const instance = this;
        const { fileSystem, shell, shellLink, mysqlQuery } = this.mother;
        try {
          const getFolder = function (link) {
            let tempArr;
            tempArr = link.split("/");
            tempArr.pop();
            return tempArr.join("/");
          }
          const getName = function (link) {
            let tempArr;
            tempArr = link.split("/");
            return tempArr.pop().replace(/\.svg$/i, '');
          }
          const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
          const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
          const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);
          const Filter = this.back.idFilter("designer");
          const contents = new ContentsMaker();
          const frontSetting = await this.returnFrontObject(designerObj);
          console.log(frontSetting);
          const aiScript = this.renderScript(frontSetting);
          const fileName = "designerFrontSettingAiCanvasScript_" + String((new Date()).valueOf()) + ".js";
          await fileSystem(`write`, [ `${process.cwd()}/temp/${fileName}`, aiScript ]);
          const { resultFolder, resultList } = await contents.generalLaunching(`${process.cwd()}/temp/${fileName}`);

          let desktop = null, mobile = null, name = null;
          let newDesktop, newMobile, newName;
          let pastDesid;
          let scpOrder;
          let svgList, svgListApp, svgResultList;
          let insertQuery;
          let whereQuery, updateQuery;

          for (let i = 0; i < resultList.length; i++) {
            if (/^desktop_/gi.test(resultList[i]) && /\.svg$/i.test(resultList[i])) {
              desktop = resultFolder + "/" + resultList[i];
            }
            if (/^mobile_/gi.test(resultList[i]) && /\.svg$/i.test(resultList[i])) {
              mobile = resultFolder + "/" + resultList[i];
            }
            if (/^name_/gi.test(resultList[i]) && /\.svg$/i.test(resultList[i])) {
              name = resultFolder + "/" + resultList[i];
            }
          }

          if (desktop === null || mobile === null || name === null) {
            throw new Error("invaild rendering");
          }

          pastDesid = Filter.newToPast(designerObj.desid);
          newDesktop = `${getFolder(desktop)}/word${pastDesid}.svg`;
          newMobile = `${getFolder(mobile)}/moword${pastDesid}.svg`;
          newName = `${getFolder(name)}/name${pastDesid}.svg`;

          svgList = [];
          svgList.push(desktop);
          svgList.push(mobile);
          svgList.push(name);

          svgListApp = new SvgOptimizer(svgList);
          svgListApp.setDcimal(3);
          svgResultList = await svgListApp.launching();

          await fileSystem(`write`, [ newDesktop, svgResultList[getName(desktop)] ]);
          await fileSystem(`write`, [ newMobile, svgResultList[getName(mobile)] ]);
          await fileSystem(`write`, [ newName, svgResultList[getName(name)] ]);

          shell.exec(`rm -rf ${shellLink(desktop)}`);
          shell.exec(`rm -rf ${shellLink(mobile)}`);
          shell.exec(`rm -rf ${shellLink(name)}`);

          scpOrder = '';
          scpOrder += `scp ${shellLink(newDesktop)} ${ADDRESS.frontinfo.user}@${ADDRESS.frontinfo.host}:/${ADDRESS.frontinfo.user}/www/list_svg/dedetail/wording;`;
          scpOrder += `scp ${shellLink(newMobile)} ${ADDRESS.frontinfo.user}@${ADDRESS.frontinfo.host}:/${ADDRESS.frontinfo.user}/www/list_svg/dedetail/wording;`;
          scpOrder += `scp ${shellLink(newName)} ${ADDRESS.frontinfo.user}@${ADDRESS.frontinfo.host}:/${ADDRESS.frontinfo.user}/www/list_svg/delist/name;`;

          shell.exec(scpOrder);
          console.log(`scp done`);

          shell.exec(`rm -rf ${shellLink(newDesktop)}`);
          shell.exec(`rm -rf ${shellLink(newMobile)}`);
          shell.exec(`rm -rf ${shellLink(newName)}`);

          if (query) {
            if (frontSetting.methods.length !== 2) {
              throw new Error("method's length must be 2")
            }
            insertQuery = "INSERT INTO deslist (desid,name,start_Y,start_M,method1,method2,daepyo_a,daepyo_t,order_function) VALUES (";
            insertQuery += `'${pastDesid}',`;
            insertQuery += `'${designerObj.designer}',`;
            insertQuery += `'${String(designerObj.information.business.career.startY)}',`;
            insertQuery += `'${String(designerObj.information.business.career.startM)}',`;
            insertQuery += `'${frontSetting.methods[0]}',`;
            insertQuery += `'${frontSetting.methods[1]}',`;
            insertQuery += `'${frontSetting.photo.porlid}',`;
            insertQuery += `'${frontSetting.photo.index}',`;
            insertQuery += `'${String(frontSetting.order)}');`;
            await mysqlQuery(insertQuery, { front: true });
            console.log(`front mysql insert done`);
          }

          delete frontSetting.designer;
          delete frontSetting.desid;
          whereQuery = { desid: designerObj.desid };
          updateQuery = { "setting.front": frontSetting };
          await this.back.updateDesigner([ whereQuery, updateQuery ], this.option);
          console.log(`db update done`);

        } catch (e) {
          console.log(e);
        }
      }
    }
    const front = new DesignerFrontIndex(this.mother, this.back, option);
    for (let desid of desidArr) {
      await front.renderDesigner(await this.back.getDesignerById(desid, option), true);
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = BackWorker;
