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
        agoDay.setMonth(agoDay.getMonth() - 4);
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
      await MONGOC.close();
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
  const { fileSystem, shell, shellLink, mongo, mongoinfo, slack_bot, ghostRequest } = this.mother;
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
    let aspirantJson, updateQuery, contractDay, newDesid, newDesigner, designerFolderResponse;

    for (let aspirant of targetAspirants) {
      contractDay = aspidArr.search(aspirant.aspid);
      aspirantJson = aspirant.toNormal();
      updateQuery = toUpdateQuery(aspirantJson, contractDay);
      if (updateQuery !== null) {
        newDesid = await back.createDesigner(updateQuery, { selfMongo: MONGOC });
        console.log("create designer success");
        newDesigner = await back.getDesignerById(newDesid, { selfMongo: MONGOC });
        designerFolderResponse = await designerRequest("create", { name: newDesigner.designer, subid: newDesigner.information.did });
        designerFolderResponse.desid = newDesid;
        designerFolderResponse.date = new Date();
        console.log(designerFolderResponse);
        await back.mongoCreate("folderDesigner", designerFolderResponse, { console: true });
      }
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.close();
    }

    //front desid
    const compileFrontDesidScript = async function (newDesid) {
      try {
        const target = `${process.cwd()}/apps/backMaker/idFilter/designer.js`;
        const hundredString = function (number) {
          if (number > 99) {
            return String(number);
          } else if (number < 10) {
            return `00${String(number)}`;
          } else {
            return `0${String(number)}`;
          }
        }
        let code, func;
        let tempArr, tempArr2;
        let tong;
        let newFrontDesid;
        let latestFrontDesid;
        let latestDesid;
        let tempReg;
        let index;
        let result;
        let newCode;
        let margin, margin2;

        code = await fileSystem(`readString`, [ target ]);
        func = require(target);
        tempArr = code.split("function");

        tong = [];
        for (let i of tempArr) {
          tempArr2 = [ ...i.matchAll(/de[0-9][0-9][0-9]/g) ];
          for (let j of tempArr2) {
            tong.push(j[0])
          }
        }
        tong = Array.from(new Set(tong));
        tong.sort((a, b) => {
          return Number(b.replace(/[^0-9]/gi, '').replace(/^0/, '')) - Number(a.replace(/[^0-9]/gi, '').replace(/^0/, ''));
        });

        latestFrontDesid = tong[0];
        latestDesid = func.pastToNew(latestFrontDesid);
        newFrontDesid = "de" + hundredString(Number(tong[0].replace(/[^0-9]/gi, '').replace(/^0/, '')) + 1);

        tempReg = new RegExp(`[ ]+case [\\"\\']${latestFrontDesid}[\\"\\']\\:[^;]+;[^;]+;`);
        result = code.match(tempReg);
        margin = result[0].split("case")[0];
        margin2 = result[0].split("return")[0].split("\n")[1];

        newCode = code.slice(0, result.index + result[0].length) + `\n${margin}case "${newFrontDesid}":\n${margin2}return "${newDesid}";\n${margin2}break;` + code.slice(result.index + result[0].length);
        code = newCode;

        tempReg = new RegExp(`[ ]+case [\\"\\']${latestDesid}[\\"\\']\\:[^;]+;[^;]+;`);
        result = code.match(tempReg);
        margin = result[0].split("case")[0];
        margin2 = result[0].split("return")[0].split("\n")[1];

        newCode = code.slice(0, result.index + result[0].length) + `\n${margin}case "${newDesid}":\n${margin2}return "${newFrontDesid}";\n${margin2}break;` + code.slice(result.index + result[0].length);
        code = newCode;

        await fileSystem(`write`, [ target, code ]);

      } catch (e) {
        console.log(e);
      }
    }

    await compileFrontDesidScript(newDesid);
    console.log("front desid make");

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

BackWorker.prototype.designerCalculation = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, dateToString, autoComma } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const PYTHONMONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await PYTHONMONGOC.connect();
    const back = this.back;
    const Designers = require(`${process.cwd()}/apps/dataConsole/router/source/class/designer.js`);
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
    const selfMongo = MONGOC;
    const bar1 = "================================================================";
    const collection = "taxBill";
    const collection2 = "cashReceipt";
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let projects, clients, designers;
    let desidArr_raw, desidArr;
    let cliidArr;
    let whereQuery, updateQuery;
    let tong;
    let amount0, amount1;
    let condition0, condition1;
    let name;
    let tempString;
    let infoTong, infoDetail;
    let rows, boo;
    let tempDate;
    let ago, agoValue;
    let greateStandard;
    let limitAgo;

    ago = new Date();
    ago.setDate(ago.getDate() - 28);
    agoValue = ago.valueOf();

    limitAgo = new Date();
    limitAgo.setFullYear(limitAgo.getFullYear() - 2);

    whereQuery = {
      $and: [
        { desid: { $regex: "^d" } },
        { "proposal.date": { $gt: limitAgo } },
        { "process.contract.remain.date": { $gt: new Date(2000, 0, 1) } }
      ]
    };

    projects = await back.getProjectsByQuery(whereQuery, { selfMongo });

    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    whereQuery = {
      $or: [
        { $or: desidArr },
        { "information.contract.status": { $regex: "완료" } }
      ]
    };
    designers = await back.getDesignersByQuery(whereQuery, { selfMongo });

    whereQuery = {
      $or: cliidArr
    };
    clients = await back.getClientsByQuery(whereQuery, { selfMongo });

    designers = new Designers(designers.toNormal());
    designers.setProjects(projects.toNormal());
    designers.setClients(clients.toNormal());
    designers = designers.returnDoingDesigners();

    infoTong = [];
    for (let designer of designers) {
      infoDetail = {
        desid: designer.desid,
        designer: designer.designer,
        classification: designer.information.business.businessInfo.classification,
        free: (/프리/gi.test(designer.information.business.businessInfo.classification)),
        simple: (/간이/gi.test(designer.information.business.businessInfo.classification)),
        business: /프리/gi.test(designer.information.business.businessInfo.classification) ? "" : designer.information.business.businessInfo.businessNumber.replace(/-/g, ''),
        first: [],
        remain: [],
      };
      for (let i = 0; i < designer.projects.length; i++) {
        name = designer.projects[i].name;
        amount0 = designer.projects[i].process.calculation.payments.first.amount;
        condition0 = (designer.projects[i].process.calculation.payments.first.date.valueOf() > emptyDateValue);
        if (!condition0) {
          tempDate = designer.projects[i].proposal.date;
          tempDate.setDate(tempDate.getDate() + 1);
          infoDetail.first.push({ name, amount: amount0, proposal: tempDate, receipt: true });
        }
        amount1 = designer.projects[i].process.calculation.payments.remain.amount;
        if (designer.projects[i].process.calculation.payments.remain.date.valueOf() <= emptyDateValue) {
          if (([ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '해당 없음' ]).includes(designer.projects[i].contents.raw.portfolio.status)) {
            condition1 = true;
          } else {
            if (designer.projects[i].contents.photo.boo) {
              if (designer.projects[i].contents.photo.date.valueOf() < (new Date(3000, 0, 1)).valueOf() && designer.projects[i].contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
                condition1 = false;
              } else {
                condition1 = true;
              }
            } else {
              condition1 = false;
            }
          }
        } else {
          condition1 = true;
        }
        if (!condition1) {
          tempDate = designer.projects[i].process.calculation.payments.first.date;
          tempDate.setDate(tempDate.getDate() + 1);
          infoDetail.remain.push({ name, amount: amount1, firstCalculation: tempDate, receipt: true });
        }
      }

      infoTong.push(infoDetail);
    }

    infoTong = infoTong.filter((obj) => { return (obj.first.length > 0 || obj.remain.length > 0); });
    for (let { desid, designer, free, simple, business, first, remain } of infoTong) {
      if (business !== "") {
        for (let obj of first) {
          greateStandard = (obj.proposal.valueOf() >= agoValue ? obj.proposal : ago);
          rows = await back.mongoRead(collection, { date: { $gt: greateStandard } }, { selfMongo: PYTHONMONGOC });
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
          boo = false;
          for (let i of rows) {
            if (i.who.from.business.replace(/-/g, '') === business) {
              for (let { supply, vat } of i.items) {
                if (supply + vat === obj.amount) {
                  boo = true;
                  break;
                }
              }
            }
          }
          if (simple) {
            rows = await back.mongoRead(collection2, { $and: [ { method: 1 }, { date: { $gt: greateStandard } } ] }, { selfMongo: PYTHONMONGOC });
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
            for (let i of rows) {
              if (i.who.business.replace(/-/g, '') === business) {
                if (i.amount.total === obj.amount || i.amount.supply === obj.amount) {
                  boo = true;
                  break;
                }
              }
            }
          }
          obj.receipt = free ? true : boo;
        }
        for (let obj of remain) {
          greateStandard = (obj.firstCalculation.valueOf() >= agoValue ? obj.firstCalculation : ago);
          rows = await back.mongoRead(collection, { date: { $gt: greateStandard } }, { selfMongo: PYTHONMONGOC });
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
          boo = false;
          for (let i of rows) {
            if (i.who.from.business.replace(/-/g, '') === business) {
              for (let { supply, vat } of i.items) {
                if (supply + vat === obj.amount) {
                  boo = true;
                  break;
                }
              }
            }
          }
          if (simple) {
            rows = await back.mongoRead(collection2, { $and: [ { method: 1 }, { date: { $gt: greateStandard } } ] }, { selfMongo: PYTHONMONGOC });
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
            for (let i of rows) {
              if (i.who.business.replace(/-/g, '') === business) {
                if (i.amount.total === obj.amount || i.amount.supply === obj.amount) {
                  boo = true;
                  break;
                }
              }
            }
          }
          obj.receipt = free ? true : boo;
        }
      }
    }

    tong = [];

    tong.push(`${dateToString(new Date())} 디자이너 디자인비 정산 명단입니다!`);
    tong.push(`상세 : https://${ADDRESS["backinfo"]["host"]}/designer?mode=calculation`);
    tong.push(bar1);
    for (let { designer, free, simple, classification, first, remain } of infoTong) {
      for (let { name, amount, receipt } of first) {
        if (receipt) {
          tong.push(`- ${designer}D ${name}C : 선금 ${autoComma(amount)}원 / ${free ? classification : (simple ? "현금 영수증 확인" : "세금 계산서 발행 완료")}`);
        }
      }
      for (let { name, amount, receipt } of remain) {
        if (receipt) {
          tong.push(`- ${designer}D ${name}C : 잔금 ${autoComma(amount)}원 / ${free ? classification : (simple ? "현금 영수증 확인" : "세금 계산서 발행 완료")}`);
        }
      }
    }
    tong.push(bar1);

    await this.mother.slack_bot.chat.postMessage({ text: tong.join("\n"), channel: "#700_operation" });

    return infoTong;
  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    await PYTHONMONGOC.close();
  }
}

BackWorker.prototype.getDesignerFee = async function (proid, cliid, serid = null, xValue = null, option = { selfMongo: null, selfLocalMongo: null }) {
  if (typeof proid === "string" && /^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    if (typeof cliid !== "object" || cliid === null) {
      cliid = { selfMongo: null, selfLocalMongo: null };
    }
    option = cliid;
  } else if (typeof proid === "string" && /^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    if (typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
      throw new Error("invaild input");
    }
    if (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid)) {
      throw new Error("invaild input");
    }
    if (!/[0-9]/gi.test(serid)) {
      throw new Error("invaild input");
    }
    if (!/\_/g.test(serid)) {
      serid = "s_" + serid.replace(/[^0-9]/gi, '');
    }
    if (typeof option !== "object" || option === null) {
      option = { selfMongo: null, selfLocalMongo: null };
    }
  } else {
    throw new Error("invaild proid");
  }
  const newcomers = [ "곽수빈" ];
  const instance = this;
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;
  const back = this.back;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const addressApp = new AddressParser();
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
  const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
  try {
    let MONGOC, MONGOLOCALC;
    let requestNumber;
    let designers, desidArr;
    let desid;
    let client, project;
    let priceStandard, price;
    let priceStandardConst, priceStandardCollection;
    let designerAddress, clientAddress;
    let travelInfo;
    let proposalDate;
    let request;
    let x, y;
    let onlineBoo, partialBoo, premiumBoo, newcomerBoo, distanceBoo;
    let tong;
    let proposal;
    let fee;
    let homeliaison, alpha, alphaPercentage;
    let onlineFee;
    let relationItems;
    let mode;
    let offlineFeeCase;
    let onlineFeeCase;
    let toMoney;
    let travelNumber;
    let thisDesignerCareerStart;
    let distanceLimitBoo;
    let distanceLimitPlus;
    let serviceMatchBoo;

    priceStandardCollection = "designerPrice";
    priceStandardConst = 33;
    onlineRatio = 0.8;
    travelNumber = 2;
    distanceLimitPlus = 5;

    if (typeof cliid === "object") {
      mode = 0;
    } else {
      mode = 1;
      desid = proid;
      if (typeof desid !== "string" || typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
        throw new Error("invaild input");
      }
    }

    if (option.selfMongo === null || option.selfMongo === undefined) {
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      await MONGOLOCALC.connect();
    } else {
      MONGOLOCALC = option.selfLocalMongo;
    }


    if (mode === 0) {

      project = await back.getProjectById(proid, { selfMongo: MONGOC });
      if (project === null) {
        throw new Error("invaild project");
      }
      client = await back.getClientById(project.cliid, { selfMongo: MONGOC });
      requestNumber = 0;
      proposalDate = project.proposal.date.valueOf();
      for (let i = 0; i < client.requests.length; i++) {
        if (i === 0) {
          if (proposalDate >= client.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        } else {
          if (proposalDate <= client.requests[i - 1].request.timeline.valueOf() && proposalDate >= client.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        }
      }
      if (client.requests[requestNumber] === undefined) {
        throw new Error("invaild client request number");
      }
      request = client.requests[requestNumber].request;

    } else if (mode === 1) {

      client = await back.getClientById(cliid, { selfMongo: MONGOC });
      requestNumber = 0;
      request = client.requests[requestNumber].request;

    } else {
      throw new Error("mode Error");
    }

    priceStandard = await back.mongoRead(priceStandardCollection, { key: priceStandardConst }, { selfMongo: MONGOLOCALC });
    if (priceStandard.length !== 1) {
      throw new Error("invaild price standard");
    }
    priceStandard = priceStandard[0];

    x = null;
    for (let i = 0; i < priceStandard.standard.x.value.length; i++) {
      if (i !== priceStandard.standard.x.value.length - 1) {
        if (priceStandard.standard.x.value[i][0] <= request.space.pyeong.value && request.space.pyeong.value < priceStandard.standard.x.value[i + 1][0]) {
          x = i;
        }
      } else {
        if (priceStandard.standard.x.value[i][0] <= request.space.pyeong.value) {
          x = i;
        }
      }
    }
    if (x === null) {
      throw new Error("pyeong error");
    }

    if (mode === 0) {
      y = Number((project.service.serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }
      desidArr = [];
      for (let { desid } of project.proposal.detail) {
        desidArr.push({ desid });
      }
    } else {
      y = Number((serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }
      desidArr = [ { desid } ];
    }

    designers = await back.getDesignersByQuery({ $or: desidArr }, { selfMongo: MONGOC });
    if (designers.length === 0) {
      throw new Error("no designer error");
    }

    tong = [];
    clientAddress = null;
    for (let designer of designers) {

      serviceMatchBoo = designer.analytics.project.matrix[y].some((s) => { return s === 1; });

      price = await back.mongoRead(priceStandardCollection, { key: (designer.analytics.construct.level * 10) + designer.analytics.styling.level }, { selfMongo: MONGOLOCALC });
      if (price.length !== 1) {
        throw new Error("invaild price");
      }
      price = price[0];
      fee = price.matrix[x][y] * 10000;

      if (mode === 0) {
        proposal = project.selectProposal(designer.desid);
        if (proposal === null) {
          throw new Error("invaild desid");
        }

        onlineBoo = false;
        for (let obj of proposal.fee) {
          if (/online/.test(obj.method)) {
            onlineBoo = true;
          }
        }
        premiumBoo = (project.service.xValue === 'P');
      } else if (mode === 1) {
        onlineBoo = false;
        premiumBoo = (xValue === 'P');
      }

      newcomerBoo = newcomers.includes(designer.designer);

      if (fee !== 0) {
        designerAddress = await addressApp.getAddress(designer.information.address[0].value);
        if (designerAddress === null) {
          throw new Error("invaild designer address");
        }
        if (clientAddress === null) {
          clientAddress = await addressApp.getAddress(request.space.address.value);
          if (clientAddress === null) {
            throw new Error("invaild client address");
          }
        }
        travelInfo = await addressApp.getTravelExpenses(designerAddress, clientAddress);
      } else {
        travelInfo = null;
      }

      if (travelInfo === null) {
        distanceBoo = false;
        distanceLimitBoo = false;
        travelInfo = { amount: 0, distance: { string: "" }, time: { string: "" } };
      } else {
        distanceBoo = (travelInfo.distance.meters > (designer.analytics.region.range * 1000));
        distanceLimitBoo = (travelInfo.distance.meters > ((distanceLimitPlus + designer.analytics.region.expenses) * 1000));
      }

      if (newcomerBoo) {
        fee = fee * priceStandard.newcomer;
      }

      if (premiumBoo) {
        fee = fee * priceStandard.premium;
      }

      thisDesignerCareerStart = new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1);

      alpha = 0;
      alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 2 : (thisDesignerCareerStart.valueOf() <= fiveYearsAgo.valueOf() ? 1 : 0);
      alpha += designer.analytics.project.paperWork.values.includes("3D") ? 2 : ((designer.analytics.project.paperWork.values.length >= 4) ? 1 : 0);
      alpha += designer.analytics.purchase.agencies ? (1 / 3) : 0;
      alpha += designer.analytics.purchase.setting.install ? (1 / 3) : 0;
      alpha += designer.analytics.purchase.setting.storage ? (1 / 3) : 0;

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      relationItems = designer.analytics.etc.relation.items;
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation.value);

      alpha += (homeliaison * (2 / 7));

      //인기도
      alpha += 0.5;

      alphaPercentage = (alpha / 100) + 1;

      fee = alphaPercentage * fee;

      offlineFeeCase = fee;
      onlineFeeCase = fee;

      if (!distanceBoo) {
        travelInfo.amount = 0;
        travelNumber = 0;
      }

      // distance fee plus
      // if (distanceBoo) {
      //   fee = fee + (travelInfo.amount * travelNumber);
      //   offlineFeeCase = fee;
      // }

      if (distanceLimitBoo) {
        if (designer.analytics.project.online) {
          offlineFeeCase = 0;
          fee = onlineFeeCase;
        } else {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      if (!serviceMatchBoo) {
        fee = 0;
        offlineFeeCase = 0;
        onlineFeeCase = 0;
      }

      toMoney = (num) => { return (Math.round(num / 1000) * 1000); }

      tong.push({
        desid: designer.desid,
        designer: designer.designer,
        cliid: client.cliid,
        client: client.name,
        proid: mode === 0 ? project.proid : "",
        detail: {
          original: fee,
          alpha: alpha,
          serid: mode === 0 ? project.service.serid : serid,
          xValue: mode === 0 ? project.service.xValue : xValue,
          newcomer: newcomerBoo,
          premium: premiumBoo,
          online: toMoney(onlineFeeCase),
          offline: toMoney(offlineFeeCase),
          distance: travelInfo.amount,
          travel: {
            distance: travelInfo.distance.string,
            time: travelInfo.time.string,
            number: travelNumber,
          },
          xy: { x, y },
          pyeong: request.space.pyeong.value,
          level: {
            construct: designer.analytics.construct.level,
            styling: designer.analytics.styling.level,
          },
        },
        fee: toMoney(fee)
      });
    }

    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }

    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      await MONGOLOCALC.close();
    }

    if (mode === 0) {
      return tong;
    } else if (mode === 1) {
      return tong[0];
    }

  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.designerCuration = async function (cliid, selectNumber, seridArr, option = { selfMongo: null, selfLocalMongo: null }) {
  const instance = this;
  const back = this.back;
  if (typeof cliid !== "string" || typeof selectNumber !== "number" || !Array.isArray(seridArr)) {
    throw new Error("invaild input");
  }
  try {
    const designers = await back.getDesignersByQuery({}, { selfMongo: option.selfMongo, withTools: true });
    const clientCase = await back.getCaseProidById(cliid, { selfMongo: option.selfMongo });
    const realTimes = await back.mongoRead("realtimeDesigner", {}, { selfMongo: option.selfLocalMongo });
    const clientHistory = await back.getHistoryById("client", cliid, { selfMongo: option.selfLocalMongo });
    const { client, cases } = clientCase;
    const ytoken = 'y';
    const mtoken = 'm';
    let contract, proposal, final;
    let project;
    let temp;
    let realtimeMap;
    let standard;
    let now;
    let range, secondRange;
    let selected, selectedDesigner;
    let boo;
    let designer;
    let preferBoo, preferDesigners;
    let tempObj;
    let feeCalculation;
    let serviceCase;
    let serid, xValue;
    let dateNumber, secondDateNumber;
    let seridNumber;
    let standardStart, standardEnd, standardRealEnd;
    let possibleRange, possibleRealRange;
    let possibleTempArr;
    let possibleBoo;

    serid = null;
    xValue = null;
    if (option.noCalculation !== true) {
      serviceCase = clientCase.caseService();
      if (serviceCase === null) {
        serid = null;
        xValue = null;
      } else {
        serid = serviceCase.serid[0].serid;
        xValue = serviceCase.xValue[0].xValue;
      }
      if (seridArr.length === 1) {
        serid = seridArr[0];
      }
      if (xValue === null || xValue === undefined) {
        xValue = "B";
      }
      feeCalculation = async function (arr) {
        if (!Array.isArray(arr)) {
          throw new Error("invaild input");
        }
        let feeObject;
        let newArr;
        let designer;
        try {
          newArr = [];
          for (let obj of arr) {
            feeObject = await instance.getDesignerFee(obj.desid, cliid, serid, xValue, { selfMongo: option.selfMongo, selfLocalMongo: option.selfLocalMongo });
            obj.resetFee();

            if (feeObject.detail.offline !== feeObject.detail.online) {
              if (feeObject.detail.offline !== 0) {
                obj.appendFee("offline", feeObject.detail.offline, feeObject.detail.travel.number, feeObject.detail.distance);
                designer = designers.search(obj.desid);
                if (designer !== null) {
                  if (designer.analytics.project.online) {
                    obj.appendFee("online", feeObject.detail.online, 0, feeObject.detail.distance);
                  }
                }
              } else {
                designer = designers.search(obj.desid);
                if (designer !== null) {
                  if (designer.analytics.project.online) {
                    obj.appendFee("online", feeObject.detail.online, 0, feeObject.detail.distance);
                  }
                }
              }
            } else {
              obj.appendFee("offline", feeObject.detail.offline, 0, feeObject.detail.distance);
            }

            if (feeObject.detail.online !== 0) {
              newArr.push(obj);
            }
            if (newArr.length === selectNumber) {
              break;
            }
          }
          return newArr;
        } catch (e) {
          console.log(e);
        }
      }
    }

    preferBoo = false;
    if (clientHistory.curation !== undefined) {
      if (Array.isArray(clientHistory.curation.style)) {
        if (clientHistory.curation.style.length > 0) {
          preferBoo = true;
          preferDesigners = clientHistory.curation.style;
        }
      }
    }

    dateNumber = 60;
    secondDateNumber = 60;
    if (serid !== null && serid !== undefined && typeof serid === "string") {
      if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(serid)) {
        seridNumber = Number(serid.split('_')[1].replace(/[^0-9]/gi, '').replace(/^0/, '').replace(/^0/, ''));
        if (seridNumber === 1) {
          dateNumber = 35;
          secondDateNumber = 35;
        } else if (seridNumber === 2) {
          dateNumber = 45;
          secondDateNumber = 45;
        } else if (seridNumber === 3) {
          dateNumber = 60;
          secondDateNumber = 60;
        } else if (seridNumber === 4) {
          dateNumber = 60;
          secondDateNumber = 60;
        }
      }
    }

    standardEnd = client.toNormal().requests[0].analytics.date.space.movein;
    standardStart = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardStart.setDate(standardStart.getDate() - dateNumber);
    standardRealEnd = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardRealEnd.setDate(standardRealEnd.getDate() + secondDateNumber);

    // possibleRange = [];
    // while (standardStart.valueOf() < standardEnd.valueOf()) {
    //   possibleRange.push(ytoken + String(standardStart.getFullYear()) + mtoken + String(standardStart.getMonth() + 1));
    //   standardStart.setDate(standardStart.getDate() + 1);
    // }
    // possibleRange = Array.from(new Set(possibleRange));
    //
    // possibleRealRange = [];
    // while (standardStart.valueOf() < standardRealEnd.valueOf()) {
    //   possibleRealRange.push(ytoken + String(standardStart.getFullYear()) + mtoken + String(standardStart.getMonth() + 1));
    //   standardStart.setDate(standardStart.getDate() + 1);
    // }
    // possibleRealRange = Array.from(new Set(possibleRealRange));

    realtimeMap = {};
    for (let { desid, possible } of realTimes) {
      realtimeMap[desid] = false;
      for (let { start, end } of possible) {
        possibleBoo = (start.valueOf() <= standardStart.valueOf() && standardEnd.valueOf() <= end.valueOf());
        realtimeMap[desid] = possibleBoo;
        if (possibleBoo) {
          break;
        }
      }
    }

    if (Object.values(realtimeMap).filter((b) => { return b === true; }).length === 0) {
      realtimeMap = {};
      for (let { desid, possible } of realTimes) {
        realtimeMap[desid] = false;
        for (let { start, end } of possible) {
          possibleBoo = (start.valueOf() <= standardEnd.valueOf() && standardRealEnd.valueOf() <= end.valueOf());
          realtimeMap[desid] = possibleBoo;
          if (possibleBoo) {
            break;
          }
        }
      }
    }

    final = clientCase.caseProposal();

    if (option.noCalculation !== true) {
      final = final.filter((project) => { return project.service.serid === serid });
      if (final.length <= (selectNumber * 4)) {
        final = await back.getProjectsByQuery({ "service.serid": serid }, { selfMongo: option.selfMongo, limit: 800 });
      }
    }

    selected = [];
    for (let project of final) {
      if (project !== null) {
        temp = project.toNormal().proposal.detail.map((obj) => { return obj.desid });
        for (let desid of temp) {
          boo = false;
          designer = designers.search(desid);
          if (designer !== null && /완료/gi.test(designer.information.contract.status.value)) {
            boo = realtimeMap[desid];
            if (boo) {
              if (!selected.map((obj) => { return obj.desid }).includes(desid)) {
                selected.push(project.selectProposal(desid));
              }
            }
          }
          if (!preferBoo && selected.length === selectNumber) {
            break;
          }
        }
      }
      if (!preferBoo && selected.length === selectNumber) {
        break;
      }
    }

    //option.noCalculation
    if (preferBoo) {
      selectedDesigner = [];
      for (let desid of preferDesigners) {
        if (typeof selected.find((obj) => { return obj.desid === desid; }) === "object") {
          tempObj = selected.find((obj) => { return obj.desid === desid; });
          selectedDesigner.push(tempObj);
        }
      }
      if (selectedDesigner.length === 0) {
        if (option.noCalculation !== true) {
          selected = await feeCalculation(selected);
        }
        selected = selected.slice(0, selectNumber);
        return selected;
      } else {
        if (option.noCalculation !== true) {
          selectedDesigner = await feeCalculation(selectedDesigner);
        }
        selectedDesigner = selectedDesigner.slice(0, selectNumber);
        return selectedDesigner;
      }
    } else {
      if (option.noCalculation !== true) {
        selected = await feeCalculation(selected);
      }
      selected = selected.slice(0, selectNumber);
      return selected;
    }

  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.proposalReset = async function (cliid, option = { selfMongo: null, selfLocalBoo: null }) {
  if (typeof cliid !== "string") {
    throw new Error("invaild input");
  }
  if (!/^[cp]/.test(cliid)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  try {
    let selfMongo, selfLocalMongo;
    let selfBoo, selfLocalBoo;
    let detail, update;
    let projects;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (option.selfLocalMongo === undefined || option.selfLocalMongo === null) {
      selfLocalBoo = false;
    } else {
      selfLocalBoo = true;
    }

    if (!selfBoo) {
      selfMongo = new mongo(mongoinfo, { useUnifiedTopology: true });
      await selfMongo.connect();
    } else {
      selfMongo = option.selfMongo;
    }

    if (!selfLocalBoo) {
      selfLocalMongo = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      await selfLocalMongo.connect();
    } else {
      selfLocalMongo = option.selfLocalMongo;
    }

    projects = await back.getProjectsByQuery({ cliid }, { selfMongo });
    update = [];
    if (/^c/.test(cliid)) {
      projects = await back.getProjectsByQuery({ cliid }, { selfMongo });
    } else if (/^p/.test(cliid)) {
      projects = await back.getProjectById(cliid, { selfMongo });
      if (projects === null) {
        projects = [];
      } else {
        projects = [ projects ];
      }
    } else {
      throw new Error("invaild id");
    }

    if (projects.length > 0) {
      const project = projects[0];
      const { proid, cliid: id, service: { serid } } = project;

      detail = await this.designerCuration(id, 6, [ serid ], { selfMongo, selfLocalMongo });
      for (let d of detail) {
        update.push(d.toNormal());
      }
      if (update.length > 0) {
        await back.updateProject([ { proid }, { "proposal.detail": update } ], { selfMongo });
      }
    }

    if (!selfBoo) {
      await selfMongo.close();
    }
    if (!selfLocalBoo) {
      await selfLocalMongo.close();
    }

    return update.length;
  } catch (e) {
    console.log(e);
  }
}

module.exports = BackWorker;
