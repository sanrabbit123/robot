const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const BackReport = require(APP_PATH + "/backMaker/backReport.js");
const BackWorker = require(APP_PATH + "/backMaker/backWorker.js");
const BridgeCloud = require(APP_PATH + "/bridgeCloud/bridgeCloud.js");
const GoogleAPIs = require(APP_PATH + "/googleAPIs/googleAPIs.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const GoogleDrive = require(APP_PATH + "/googleAPIs/googleDrive.js");
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js");
const GoogleMail = require(APP_PATH + "/googleAPIs/googleMail.js");
const GoogleDocs = require(APP_PATH + "/googleAPIs/googleDocs.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AiConsole = require(APP_PATH + "/contentsMaker/aiConsole.js");
const AppleNotes = require(APP_PATH + "/appleAPIs/appleNotes.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js");
const ResourceMaker = require(APP_PATH + "/resourceMaker/resourceMaker.js");
const NotionAPIs = require(APP_PATH + "/notionAPIs/notionAPIs.js");
const ImmovablesServer = require(APP_PATH + "/immovablesServer/immovablesServer.js");
const KakaoTalk = require(APP_PATH + "/kakaoTalk/kakaoTalk.js");
const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
const DataRouter = require(APP_PATH + "/dataConsole/router/dataRouter.js");
const ParsingHangul = require(APP_PATH + "/parsingHangul/parsingHangul.js");
const SnsParsing = require(APP_PATH + "/snsParsing/snsParsing.js");
const PlayAudio = require(APP_PATH + "/playAudio/playAudio.js");
const SpawnCatfish = require(APP_PATH + "/spawnCatfish/spawnCatfish.js");
const MongoReflection = require(APP_PATH + "/mongoReflection/mongoReflection.js");
const SvgOptimizer = require(APP_PATH + "/svgOptimizer/svgOptimizer.js");
const NaverBlogParsing = require(APP_PATH + "/naverAPIs/naverBlogParsing.js");
const DataMiddle = require(APP_PATH + "/dataConsole/router/dataMiddle.js");
const ReceiptObserver = require(APP_PATH + "/receiptObserver/receiptObserver.js");

const DevContext = function () {
  this.mother = new Mother();
  this.back = new BackMaker();
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, pythonExecute, autoComma, dateToString, stringToDate } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();
    const sheets = new GoogleSheet();





    // const selfMongo = this.MONGOLOCALC;
    // const consoleInfo = "https://" + this.address.backinfo.host;
    // const today = new Date();
    // const yearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    // const emptyDate = new Date(1800, 0, 1);
    // const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    // const allDesigners = await back.getDesignersByQuery({}, { selfMongo });
    // const allProjects = await back.getProjectsByQuery({}, { selfMongo });
    // const reverseMatrix = function (matrix) {
    //   if (!Array.isArray(matrix)) {
    //     throw new Error("must be 2 matrix");
    //   }
    //   let length = null;
    //   for (let arr of matrix) {
    //     if (!Array.isArray(arr)) {
    //       throw new Error("invaild matrix");
    //     }
    //     if (length !== null) {
    //       if (length !== arr.length) {
    //         throw new Error("invaild matrix");
    //       }
    //     }
    //     length = arr.length;
    //   }
    //   if (length === null) {
    //     return [];
    //   }
    //   let tong;
    //   let tempArr;
    //   tong = [];
    //   for (let i = 0; i < length; i++) {
    //     tempArr = [];
    //     for (let arr of matrix) {
    //       tempArr.push(arr[i]);
    //     }
    //     tong.push(tempArr);
    //   }
    //   return tong;
    // }
    // const designerPrice = "designerPrice";
    // const service = [
    //   { column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
    //   { column: "homeStyling", name: "홈스타일링", id: 'S' },
    //   { column: "totalStyling", name: "토탈 스타일링", id: 'T' },
    //   { column: "architecture", name: "설계 변경", id: 'XT' }
    // ];
    // const standards = await back.mongoRead(designerPrice, { key: 33 }, { console: true });
    // const sheetsName = [ "제안건", "계약건", "가격" ];
    // const parentId = "1oKc2UD6hhMyLwfAKWylqh1iKTa7zBc6l";
    // class DesignerReport {
    //   matrixProposal() {
    //     let matrix;
    //     let arr;
    //     let order;
    //     let boo;
    //     let sum;
    //     matrix = [ [ "순서", "고객명", "날짜", "제안 금액", "온오프라인", "부분 공간", "계약 여부", "제안서 아이디", "콘솔" ] ];
    //     order = 1;
    //     sum = 0;
    //     for (let obj of this.proposal) {
    //       arr = [];
    //       arr.push(order);
    //       arr.push(obj.client.name);
    //       arr.push(dateToString(obj.date));
    //       arr.push(obj.detail.amount);
    //       arr.push(/off/g.test(obj.detail.method) ? "오프라인" : "온라인");
    //       arr.push(obj.detail.partial ? 'O' : 'X');
    //       boo = false;
    //       for (let obj2 of this.contract) {
    //         if (obj.proid === obj2.project.proid) {
    //           boo = true;
    //         }
    //       }
    //       arr.push(boo ? 'O' : 'X');
    //       arr.push(obj.proid);
    //       arr.push(obj.console);
    //       matrix.push(arr);
    //
    //       sum = sum + obj.detail.amount;
    //       order++;
    //     }
    //     matrix.push([ "합계", "", "", sum, "", "", "", "", "" ]);
    //     return matrix;
    //   }
    //   matrixContract() {
    //     let matrix;
    //     let arr;
    //     let order;
    //     let boo;
    //     let sum, sum2;
    //     let proposal;
    //     let targetProject;
    //     matrix = [ [ "순서", "고객명", "시작일", "종료일", "온오프라인", "부분 공간", "정산 금액", "제안 금액", "수수료", "선금 정산일", "잔금 정산일", "프로젝트 아이디", "콘솔" ] ];
    //     order = 1;
    //     sum = 0;
    //     sum2 = 0;
    //     for (let obj of this.contract) {
    //       proposal = null;
    //       for (let obj2 of this.proposal) {
    //         if (obj2.proid === obj.project.proid) {
    //           proposal = obj2;
    //         }
    //       }
    //       if (proposal === null) {
    //         for (let project of allProjects) {
    //           if (obj.project.proid === project.proid) {
    //             targetProject = project;
    //           }
    //         }
    //         proposal = {
    //           detail: {
    //             method: targetProject.proposal.detail[0].fee[0].method,
    //             partial: targetProject.proposal.detail[0].fee[0].partial,
    //             amount: 0
    //           }
    //         };
    //       }
    //       arr = [];
    //       arr.push(order);
    //       arr.push(obj.client.name);
    //       arr.push(dateToString(obj.project.start));
    //       arr.push(dateToString(obj.project.end));
    //       arr.push(/off/g.test(proposal.detail.method) ? "오프라인" : "온라인");
    //       arr.push(proposal.detail.partial ? 'O' : 'X');
    //       arr.push(obj.payments.amount);
    //       arr.push(proposal.detail.amount);
    //       arr.push(obj.payments.percentage);
    //       arr.push(dateToString(obj.payments.first));
    //       arr.push(dateToString(obj.payments.remain));
    //       arr.push(obj.project.proid);
    //       arr.push(obj.console);
    //       matrix.push(arr);
    //
    //       sum = sum + obj.payments.amount;
    //       sum2 = sum2 + proposal.detail.amount;
    //       order++;
    //     }
    //     matrix.push([ "합계", "", "", "", "", "", sum, sum2, "", "", "", "", "" ]);
    //     return matrix;
    //   }
    //   matrixPrice() {
    //     let matrix;
    //     let basicTarget;
    //     let premiumTarget;
    //     let mapFunction;
    //     let tempArr;
    //     let target;
    //     matrix = [ [ "추가값", "서비스명" ] ];
    //     for (let str of standards[0].standard.x.string) {
    //       matrix[0].push(str);
    //     }
    //
    //     basicTarget = Object.keys(this.price.detail.basic);
    //     premiumTarget = Object.keys(this.price.detail.premium);
    //     mapFunction = (str) => {
    //       for (let { column, name } of service) {
    //         if (column === str) {
    //           return { column, name };
    //         }
    //       }
    //     }
    //     basicTarget = basicTarget.map(mapFunction);
    //     premiumTarget = premiumTarget.map(mapFunction);
    //
    //     for (let i = 0; i < basicTarget.length; i++) {
    //       tempArr = [];
    //       if (i === 0) {
    //         tempArr.push(String(this.price.alpha) + '%');
    //       } else {
    //         tempArr.push('');
    //       }
    //       tempArr.push(basicTarget[i].name + ' B');
    //       target = this.price.detail.basic[basicTarget[i].column];
    //       for (let j = 0; j < target.length; j++) {
    //         tempArr.push(target[j] * 10000);
    //       }
    //       matrix.push(tempArr);
    //     }
    //
    //     for (let i = 0; i < premiumTarget.length; i++) {
    //       tempArr = [];
    //       tempArr.push('');
    //       tempArr.push(premiumTarget[i].name + ' P');
    //       target = this.price.detail.premium[premiumTarget[i].column];
    //       for (let j = 0; j < target.length; j++) {
    //         tempArr.push(target[j] * 10000);
    //       }
    //       matrix.push(tempArr);
    //     }
    //
    //     tempArr = [];
    //     tempArr.push('');
    //     tempArr.push("수수료");
    //     for (let num of this.fee) {
    //       tempArr.push(num);
    //     }
    //     matrix.push(tempArr);
    //
    //     return matrix;
    //   }
    //   getMatrix() {
    //     return [
    //       { sheets: sheetsName[0], matrix: this.matrixProposal() },
    //       { sheets: sheetsName[1], matrix: this.matrixContract() },
    //       { sheets: sheetsName[2], matrix: this.matrixPrice() }
    //     ];
    //   }
    // }
    // let designer, desid;
    // let projects;
    // let clients, client;
    // let contents;
    // let contract;
    // let contentsDate;
    // let proposals;
    // let cliidArr;
    // let key0, key1;
    // let rows;
    // let matrix, newcomer, premium, fee;
    // let designerFee;
    // let possible;
    // let targetService;
    // let serviceTong;
    // let alpha;
    // let alphaPercentage;
    // let homeliaison;
    // let entireTong;
    // let sheetsId;
    // let sheetsTargets;
    //
    // for (let { desid } of allDesigners) {
    //   entireTong = new DesignerReport();
    //   designer = await back.getDesignerById(desid, { selfMongo });
    //   projects = await back.getProjectsByQuery({ desid }, { selfMongo });
    //
    //   proposals = [];
    //   cliidArr = [];
    //   for (let project of allProjects) {
    //     cliidArr.push({ cliid: project.cliid });
    //     for (let obj of project.proposal.detail) {
    //       if (desid === obj.desid) {
    //         proposals.push({
    //           proid: project.proid,
    //           date: project.proposal.date,
    //           client: {
    //             cliid: project.cliid,
    //           },
    //           detail: {
    //             amount: obj.fee[0].amount,
    //             method: obj.fee[0].method,
    //             partial: obj.fee[0].partial,
    //           },
    //           console: consoleInfo + "/proposal?proid=" + project.proid
    //         });
    //       }
    //     }
    //   }
    //   if (cliidArr.length > 0) {
    //     clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo });
    //     for (let { cliid, name } of clients) {
    //       for (let proposal of proposals) {
    //         if (proposal.client.cliid === cliid) {
    //           proposal.client.name = name;
    //         }
    //       }
    //     }
    //   }
    //
    //   contract = [];
    //   cliidArr = [];
    //   for (let project of projects) {
    //     cliidArr.push({ cliid: project.cliid });
    //     contents = await back.getContentsArrByQuery({ proid: project.proid }, { selfMongo });
    //     contentsDate = emptyDate;
    //     if (contents.length !== 0) {
    //       contentsDate = contents[0].contents.portfolio.date;
    //     }
    //     contract.push({
    //       client: {
    //         cliid: project.cliid,
    //       },
    //       project: {
    //         proid: project.proid,
    //         start: (project.process.contract.meeting.date.valueOf() < emptyDateValue ? project.proposal.date : project.process.contract.meeting.date),
    //         end: (project.process.contract.form.date.to.valueOf() < emptyDateValue ? ((project.process.calculation.payments.remain.date.valueOf() < emptyDateValue) ? (project.contents.photo.date.valueOf() < emptyDateValue ? contentsDate : project.contents.photo.date) : project.process.calculation.payments.remain.date) : project.process.contract.form.date.to),
    //       },
    //       payments: {
    //         percentage: project.process.calculation.percentage,
    //         amount: project.process.calculation.payments.totalAmount,
    //         first: project.process.calculation.payments.first.date,
    //         remain: project.process.calculation.payments.remain.date,
    //       },
    //       console: consoleInfo + "/project?proid=" + project.proid
    //     });
    //   }
    //   if (cliidArr.length > 0) {
    //     clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo });
    //     for (let { cliid, name } of clients) {
    //       for (let c of contract) {
    //         if (c.client.cliid === cliid) {
    //           c.client.name = name;
    //         }
    //       }
    //     }
    //   }
    //
    //   entireTong.proposal = proposals;
    //   entireTong.contract = contract;
    //
    //   alpha = 0;
    //   alpha += ((new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1)).valueOf() <= yearsAgo.valueOf()) ? 2 : 0;
    //   alpha += (designer.analytics.project.paperWork.values.length >= 4) ? 2 : 0;
    //   alpha += designer.analytics.purchase.agencies ? (1 / 3) : 0
    //   alpha += designer.analytics.purchase.setting.install ? (1 / 3) : 0
    //   alpha += designer.analytics.purchase.setting.storage ? (1 / 3) : 0
    //
    //   homeliaison = 0;
    //   for (let { value } of designer.analytics.etc.personality) {
    //     if (value) {
    //       homeliaison = homeliaison + 1;
    //     }
    //   }
    //   homeliaison += 2 - designer.analytics.etc.relation.items.indexOf(designer.analytics.etc.relation.value);
    //
    //   alpha += (homeliaison * (2 / 7));
    //   alphaPercentage = (alpha / 100) + 1;
    //   alpha = (Math.floor(alpha * 100) / 100);
    //
    //   key0 = designer.analytics.construct.level;
    //   key1 = designer.analytics.styling.level;
    //
    //   rows = await back.mongoRead(designerPrice, { key: (key0 * 10) + key1 }, { console: true });
    //   if (rows.length === 0) {
    //     throw new Error("invaild key");
    //   }
    //   matrix = reverseMatrix(rows[0].matrix);
    //
    //   newcomer = standards[0].newcomer;
    //   premium = standards[0].premium;
    //   fee = standards[0].fee;
    //   possible = designer.analytics.project.matrix;
    //
    //   targetService = [];
    //   targetServicePremium = [];
    //   for (let i = 0; i < possible.length; i++) {
    //     if (possible[i][1] === 1) {
    //       targetService.push(i);
    //     }
    //     if (possible[i][2] === 1) {
    //       targetServicePremium.push(i);
    //     }
    //   }
    //
    //   serviceTong = {
    //      basic: {},
    //      premium: {}
    //   };
    //   for (let index of targetService) {
    //     serviceTong.basic[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * alphaPercentage) });
    //   }
    //   for (let index of targetServicePremium) {
    //     serviceTong.premium[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * premium * alphaPercentage) });
    //   }
    //   fee = fee.map((num) => { return designer.information.business.service.cost.percentage * (num / 30) });
    //
    //   entireTong.price = {};
    //   entireTong.price.alpha = alpha;
    //   entireTong.price.detail = serviceTong;
    //   entireTong.fee = fee;
    //
    //   sheetsTargets = entireTong.getMatrix();
    //
    //   sheetsId = await sheets.create_newSheets_inPython(designer.designer + " 보고서", parentId);
    //   await sheets.update_defaultSheetName_inPython(sheetsId, sheetsName[0]);
    //   await sheets.add_newSheet_inPython(sheetsId, [ sheetsName[1], sheetsName[2] ]);
    //   await sheets.setting_cleanView_inPython(sheetsId);
    //
    //   for (let { sheets: sheetsName, matrix } of sheetsTargets) {
    //     await sheets.update_value_inPython(sheetsId, sheetsName, matrix, [ 0, 0 ]);
    //   }
    // }





    







    // const document = new GoogleDocs();
    // const selfMongo = this.MONGOLOCALC;
    // const designers = await back.getDesignersByQuery({}, { selfMongo });
    // let response, idArr, folders;
    //
    // idArr = [];
    // for (let designer of designers) {
    //   idArr.push(designer.desid);
    // }
    //
    // response = await back.getHistoryProperty("designer", "$all", idArr, { selfMongo });
    // for (let desid in response) {
    //   console.log(response[desid].history);
    // }
    //
    // folders = await back.mongoRead("folderDesigner", {}, { selfMongo });
    // console.log(folders);
    //
    // for (let { docs, desid } of folders) {
    //   await document.update_value_inPython(docs, response[desid].history);
    //   console.log(desid, "done");
    // }






    /*

    const MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    await MONGOC.connect();
    const selfMongo = MONGOC;
    const sheetsId = "1iRp_N0RMWCxxIO96uBNlph6bX3jKaP-At2Phj3qEiHA";
    const res = await sheets.get_value_inPython(sheetsId, "target!C1:J");
    class Price extends Array {
      constructor() {
        super();
        this.standard = {};
        this.standard.x = [ 9, 15, 23, 30, 34, 39, 45 ];
        this.standard.y = [ "F", "S", "T", "XT" ];

      }
      set(key, value) {
        this.push(value);
        this[key] = value;
      }
    }
    let num, standard, tempArr, tempArr2, tempArr3, tong;
    let num0, num1;
    let tempObj;
    let map, keyList;
    let length;
    let tong2;

    keyList = [ "c3s3", "c2s3", "c1s3", "c3s2", "c2s2", "c1s2", "c3s1", "c2s1", "c1s1" ];
    num = 0;
    standard = 8;
    tong = [];
    while (num < res.length) {
      tempArr = [];
      tempArr2 = [];
      for (let i = num; i < num + (standard / 2); i++) {
        tempArr3 = res[i].map((str) => { return Number(str); });
        tempArr2.push(tempArr3);
      }
      tempArr.push(tempArr2);
      tempArr2 = [];
      for (let i = num + (standard / 2); i < num + standard; i++) {
        tempArr3 = res[i].map((str) => { return Number(str); });
        tempArr2.push(tempArr3);
      }
      tempArr.push(tempArr2);
      tong.push(tempArr);
      num = num + standard;
    }
    tong.pop();

    tong2 = [];
    for (let arr of tong) {
      tempArr3 = [];
      for (let k = 0; k < arr.length; k++) {
        tempArr2 = [];
        for (let j = 0; j < arr[0][0].length; j++) {
          tempArr = [];
          for (let i = 0; i < arr[0].length; i++) {
            tempArr.push(arr[k][i][j]);
          }
          tempArr2.push(tempArr);
        }
        tempArr3.push(tempArr2);
      }
      tong2.push(tempArr3);
    }

    map = new Price();
    for (let i = 0; i < keyList.length; i++) {
      tempArr = keyList[i].split('s');
      num0 = Number(tempArr[0].replace(/[^0-9]/gi, ''));
      num1 = Number(tempArr[1].replace(/[^0-9]/gi, ''));
      tempObj = {};
      tempObj.key = (num0 * 10) + num1;
      tempObj.level = {};
      tempObj.level.construct = num0;
      tempObj.level.styling = num1;
      tempObj.matrix = tong2[i][1];
      tempObj.newcomer = 0.8;
      tempObj.premium = 1.2;
      map.push(tempObj);
    }

    for (let i of map) {
      console.log(i);
      await back.mongoCreate("designerPrice", i, { selfMongo });
    }

    await MONGOC.close();

    // */







    // const getPrice = async function (desid, cliid, serviceArr) {
    //   if (typeof desid !== "string" || typeof cliid !== "string" || !Array.isArray(serviceArr)) {
    //     throw new Error("invaild input");
    //   }
    //   try {
    //     const selfMongo = instance.MONGOLOCALC;
    //     const collection = "designerPrice";
    //     const pyeongArr = [ [ 0, 8 ], [ 9, 14 ], [ 15, 22 ], [ 23, 29 ], [ 30, 33 ], [ 34, 38 ], [ 39, 44 ], [ 45, 99999 ] ];
    //     let service, xValue, yValue, pyeong, online;
    //     let designer, client;
    //     let cLevel, sLevel;
    //     let priceMatrix, matrix;
    //     let count;
    //     let percentage;
    //     let final;
    //     designer = await back.getDesignerById(desid, { selfMongo });
    //     client = await back.getClientById(cliid, { selfMongo });
    //     service = serviceArr[0];
    //     xValue = serviceArr[1];
    //     pyeong = client.requests[0][0].space.pyeong.value;
    //     online = false;
    //     cLevel = designer.analytics.construct.level;
    //     sLevel = designer.analytics.styling.level;
    //     for (let i = 0; i < pyeongArr.length; i++) {
    //       if (pyeongArr[i][0] <= pyeong && pyeong <= pyeongArr[i][1]) {
    //         yValue = i;
    //         break;
    //       }
    //     }
    //
    //     priceMatrix = await back.mongoRead(collection, { key: (cLevel * 10) + sLevel }, { selfMongo });
    //     priceMatrix = priceMatrix[0];
    //     matrix = priceMatrix.matrix[(xValue === 0) ? "partial" : "entire"];
    //
    //     count = 0;
    //     for (let { value } of designer.analytics.etc.personality) {
    //       count += value ? 1 : 0;
    //     }
    //     switch (designer.analytics.etc.relation) {
    //       case "좋지 않음":
    //         count += 0;
    //         break;
    //       case "확인중":
    //         count += 1;
    //         break;
    //       case "그냥 평범":
    //         count += 2;
    //         break;
    //       case "지속가능성 높음":
    //         count += 3;
    //         break;
    //     }
    //     percentage = (count * (10 / 8)) / 100;
    //     final = Math.round(matrix[service][yValue] * (1 + percentage));
    //     return final;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // console.log(await getPrice("d1909_aa01s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1910_aa01s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1904_aa12s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1904_aa11s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1902_aa01s", "c2106_aa01s", [ 1, 1 ]));




    // const selfMongo = this.MONGOLOCALC;
    // const targetDesid = [
    //   'd1902_aa01s',
    //   'd1904_aa02s',
    //   'd2007_aa02s',
    //   'd2006_aa01s',
    //   'd1908_aa01s',
    //   'd1904_aa01s',
    //   'd1906_aa01s',
    //   'd1904_aa11s',
    //   'd1907_aa01s',
    //   'd2007_aa01s',
    //   'd1908_aa02s',
    //   'd2008_aa01s',
    //   'd1904_aa17s',
    //   'd1904_aa09s',
    //   'd1910_aa02s',
    //   'd1904_aa16s',
    //   'd1910_aa01s',
    //   'd1910_aa02s',
    //   'd1910_aa03s',
    //   'd1904_aa05s',
    //   'd2004_aa02s',
    //   'd1909_aa01s',
    //   'd2004_aa01s',
    //   'd1904_aa12s',
    //   'd1909_aa01s',
    // ];
    // const projects = await back.getProjectsByQuery({ $and: [ { "service.serid": "s2011_aa02s" }, { "service.xValue": "B" }, { "service.online": false } ] }, { selfMongo });
    // let tong, client, designer;
    // let entireTong;
    // let key, value;
    // let sortTong;
    // let standard;
    // let range;
    // let sum, count;
    // let average;
    //
    // //1
    // entireTong = {};
    // for (let i = 0; i < targetDesid.length; i++) {
    //   entireTong[targetDesid[i]] = [];
    //   for (let project of projects) {
    //     for (let { desid, fee } of project.proposal.detail) {
    //       for (let { method, partial, amount } of fee) {
    //         if (desid === targetDesid[i]) {
    //           if (!/online/gi.test(method)) {
    //             if (!partial) {
    //               client = await back.getClientById(project.cliid, { selfMongo });
    //               entireTong[targetDesid[i]].push({ amount: (amount / client.requests[0][0].space.pyeong.value), cliid: project.cliid, proid: project.proid });
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    //
    // //2
    // average = {};
    // range = 20000;
    //
    // for (let d in entireTong) {
    //   tong = {};
    //   for (let { amount } of entireTong[d]) {
    //     key = 'a' + String(Math.round(amount / 10000));
    //     if (tong[key] === undefined) {
    //       tong[key] = 0;
    //     } else {
    //       tong[key] = tong[key] + 1;
    //     }
    //   }
    //   sortTong = [];
    //   for (let i in tong) {
    //     sortTong.push({ value: Number(i.replace(/[^0-9]/g, '')), count: tong[i] + 1 });
    //   }
    //   sortTong.sort((a, b) => { return b.count - a.count; });
    //   standard = sortTong[0].value * 10000;
    //
    //   sum = 0;
    //   count = 0;
    //   for (let { amount } of entireTong[d]) {
    //     // if (standard - range <= amount && amount <= standard + range) {
    //       sum += amount;
    //       count = count + 1;
    //     // }
    //   }
    //   designer = await back.getDesignerById(d, { selfMongo });
    //   average[d] = { average: Math.round((sum / count) / 1000) * 1000, c: designer.analytics.construct.level, s: designer.analytics.styling.level };
    // }
    //
    // console.log(average)





    //eform

    // const id = "8tYXXpqfLD";
    // const key = "pmXpXXlzgtsJGLIYHNfOgrBHm5XCbmixvF7hnRyd";
    // const { data: { access_token } } = await requestSystem("https://api.eform.io/v2/token", {}, { headers: { "x-api-id": id, "x-api-key": key } });
    // const getUrl = function (url, params) {
    //   if (typeof url !== "string" || typeof params !== "object") {
    //     throw new Error("invaild input");
    //   }
    //   if (!/^http/.test(url)) {
    //     throw new Error("invaild input");
    //   }
    //   let str = '';
    //   for (let i in params) {
    //     str += i.replace(/[\=\&]/g, '');
    //     str += '=';
    //     str += params[i].replace(/[\=\&]/g, '');
    //     str += '&';
    //   }
    //   if (str.length > 0) {
    //     str = str.slice(0, -1);
    //   }
    //   return url + "?" + str;
    // }
    // let response, headers, url, data, config;
    // headers = { "x-api-key": key, "x-access-token": access_token };
    // data = {};
    // config = { headers };
    // url = "https://api.eform.io/v2/form";
    // response = await requestSystem(getUrl(url, {}), data, config);
    // console.log(response.data);
    // url = "https://api.eform.io/v2/form/detail";
    // response = await requestSystem(getUrl(url, { form_id: "60b6d531bb0e68efedc5c1f1" }), data, config);
    // console.log(JSON.stringify(response.data, null, 2));














    // let resultObj, res;
    // resultObj = {};
    // resultObj["pretext"] = "김주연";
    // resultObj["cellphone"] = "070-7558-9269";
    // resultObj["email"] = "j05sup@hanmail.net";
    // resultObj["dwelling"] = "서울시 노원구 노원로 38길 포레나노원 아파트";
    // resultObj["folk"] = "부부, 딸 2명(6학년, 4학년)";
    // resultObj["money"] = "1,000만원";
    // resultObj["area"] = "34";
    // resultObj["movingdate"] = "2021-08-16";
    // resultObj["myhomeboo"] = "자가";
    // resultObj["spotspec"] = "방 3개 / 화장실 2개 / 발코니 확장";
    // resultObj["description"] = "방3개, 화장실 2개, 다용도실1, 거실, ,주방, 거실에 딸린 알파 공간, 안방 베란다1, 작은 방에 딸린 실외기실\n1) 홈스타일링 요청. (가구, 조명, 침구 패브릭, 액자, 소품 등)\n2) 새아파트 입주.\n3) 거의 모든 가구 구매 예정.\n4) 가전은 제가 선택하나 디자인은 함께 봐 주길 희망함.\n5) 가구는 가성비 좋은 합리적 가구를 원함.\n6) 상의 후 제작 가구가 필요하다면 제작 가구도 들일 생각 있으므로 제작 가구를 해 주실 수 있는 디자이너 추천 바람.\n7) 인테리어나 홈스타일에 대한 지식이 없으므로 성향 잘 캐치하여 알아서 잘 해주시는 분 추천 해주시길 바람.\n8) 풍수 인테리어에 관심 있음. 그런 쪽을 잘 알고 해주시는 디자이너 선생님이면 좋겠음.\n9) 홈스타일링 비용은 100만원 후반대에서 200만원까지 생각하고 있음.";
    // resultObj["wayto"] = "인터넷 검색";
    // res = await requestSystem("https://homeliaison-bridgecloud.xyz:3000/submit", resultObj, { "Content-Type": "application/json" });
    // console.log(res);







    /*

    const sheetsId = "1Clrbaub3Ztn5l2FYWIkGKrYL2_lP0B6QBGDzOXTRqw8";
    const matrix = await sheets.get_value_inPython(sheetsId, "총괄 시트!B2:V");
    const columns = [ "name", "null0", "boo", "status", "designer", "photographer", "interviewer", "date", "hours", "memo", "rawInterview", "rawPortfolio", "rawPhoto", "blogInterview", "blogPortfolio", "instaInterview", "instaPortfolio", "web", "sharePhotoDesigner", "sharePhotoClient", "shareContents" ];
    const matrix_clone = JSON.parse(JSON.stringify(matrix));
    const selfMongo = this.MONGOC;
    const convertStatus_photo = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '촬영 컨택 요망';
      } else if (/컨택중/gi.test(str)) {
        return '촬영 컨택중';
      } else if (/확정/gi.test(str)) {
        return '촬영 일정 확정';
      } else if (/완료/gi.test(str)) {
        return '촬영 완료';
      } else if (/홀딩/gi.test(str)) {
        return '촬영 홀딩';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("photo", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawPortfolio = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '원본 요청 요망';
      } else if (/요청 완료/gi.test(str)) {
        return '원본 요청 완료';
      } else if (/수집 완료/gi.test(str)) {
        return '원본 수집 완료';
      } else if (/편집중/gi.test(str)) {
        return '원본 편집중';
      } else if (/편집 완료/gi.test(str)) {
        return '원본 편집 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("portfolio", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawInterview = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '인터뷰 요망';
      } else if (/인터뷰 완료/gi.test(str)) {
        return '인터뷰 완료';
      } else if (/편집중/gi.test(str)) {
        return '원본 편집중';
      } else if (/편집 완료/gi.test(str)) {
        return '원본 편집 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("interview", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawPhoto = (str) => {
      if (/대기/gi.test(str)) {
        return '촬영 대기';
      } else if (/요망/gi.test(str)) {
        return '원본 요청 요망';
      } else if (/요청 완료/gi.test(str)) {
        return '원본 요청 완료';
      } else if (/수집 완료/gi.test(str)) {
        return '원본 수집 완료';
      } else if (/보정중/gi.test(str)) {
        return '원본 보정중';
      } else if (/보정 완료/gi.test(str)) {
        return '원본 보정 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("rawphoto", str);
        throw new Error("invaild input");
      }
    }
    const stringToDate = (dateString, hours = null) => {
      let tempArr, hoursArr, h;
      tempArr = dateString.split('-');
      if (hours === null) {
        return new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        hoursArr = hours.split(':');
        if (/후/.test(hoursArr[0])) {
          h = Number(hoursArr[0].replace(/[^0-9]/g, '')) + 12;
        } else {
          h = Number(hoursArr[0].replace(/[^0-9]/g, ''));
        }
        return new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), h);
      }
    }
    let tong, tempObj;
    let filteredTong;
    let projects, project;
    let convertingDictionary;
    let whereQuery, updateQuery;
    let tempDate;
    let contents;
    let tempContentsDate;

    matrix_clone.sort((a, b) => { return b.length - a.length });

    tong = [];
    for (let arr of matrix) {
      tempObj = {};
      for (let i = 0; i < columns.length; i++) {
        tempObj[columns[i]] = arr[i] === undefined ? "" : arr[i].trim();
      }
      tong.push(tempObj);
    }

    filteredTong = [];
    for (let obj of tong) {
      projects = await back.getProjectsByNames([ obj.name, obj.designer ], { selfMongo });
      contents = await back.getContentsArrByQuery({ proid: projects[0].proid }, { selfMongo });
      tempContentsDate = new Date(3800, 0, 1);
      if (contents.length !== 0) {
        tempContentsDate = contents[0].contents.portfolio.date.toNormal();
      }
      tempDate = stringToDate(obj.date, obj.hours);
      tempDate.setDate(tempDate.getDate() + 3);
      tempObj = {
        proid: projects[0].proid,
        cliid: projects[0].cliid,
        desid: projects[0].desid,
        boo: (obj.boo.trim() === 'X' || obj.boo.trim() === 'x') ? false : true,
        status: convertStatus_photo(obj.status),
        photographer: obj.photographer.trim(),
        interviewer: obj.interviewer.trim(),
        date: stringToDate(obj.date, obj.hours),
        memo: obj.memo,
        rawInterview: convertStatus_rawInterview(obj.rawInterview),
        rawPortfolio: convertStatus_rawPortfolio(obj.rawPortfolio),
        rawPhoto: convertStatus_rawPhoto(obj.rawPhoto),
        blogInterview: stringToDate(obj.blogInterview),
        blogPortfolio: stringToDate(obj.blogPortfolio),
        instaInterview: stringToDate(obj.instaInterview),
        instaPortfolio: stringToDate(obj.instaPortfolio),
        sharePhotoDesigner: obj.sharePhotoDesigner === 'O' ? tempDate : new Date(3800, 0, 1),
        sharePhotoClient: obj.sharePhotoClient === 'O' ? tempDate : new Date(3800, 0, 1),
        shareContentsDesigner: obj.shareContents === 'O' ? tempContentsDate : new Date(3800, 0, 1),
        shareContentsClient: obj.shareContents === 'O' ? tempContentsDate : new Date(3800, 0, 1),
      };
      filteredTong.push(tempObj);
    }

    convertingDictionary = {
      boo: "contents.photo.boo",
      status: "contents.photo.status",
      photographer: "contents.photo.info.photographer",
      interviewer: "contents.photo.info.interviewer",
      date: "contents.photo.date",
      rawInterview: "contents.raw.interview.status",
      rawPortfolio: "contents.raw.portfolio.status",
      rawPhoto: "contents.raw.photo.status",
      blogInterview: "contents.sns.interview.long",
      blogPortfolio: "contents.sns.portfolio.long",
      instaInterview: "contents.sns.interview.short",
      instaPortfolio: "contents.sns.portfolio.short",
      sharePhotoDesigner: "contents.share.designer.photo",
      sharePhotoClient: "contents.share.client.photo",
      shareContentsDesigner: "contents.share.designer.contents",
      shareContentsClient: "contents.share.client.contents",
    };

    console.log(filteredTong);

    for (let obj of filteredTong) {
      whereQuery = { proid: obj.proid };
      updateQuery = {};
      for (let i in convertingDictionary) {
        updateQuery[convertingDictionary[i]] = obj[i];
      }
      await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
      console.log(whereQuery);
    }

    */








    // const aspirants = await back.getAspirantsByQuery({});
    // const designers = await back.getDesignersByQuery({});
    // let targetDesid, histories;
    // let whereQuery, updateQuery;
    // let careerTong;
    //
    // targetDesid = [];
    // careerTong = {};
    // for (let designer of designers) {
    //   for (let aspirant of aspirants) {
    //     if (aspirant.phone === designer.information.phone) {
    //       targetDesid.push(designer.desid);
    //       careerTong[designer.desid] = aspirant.information.career.detail;
    //     }
    //   }
    // }
    //
    // targetDesid = Array.from(new Set(targetDesid));
    //
    // histories = await this.MONGOLOCALC.db("miro81").collection("designerHistory").find({}).toArray();
    //
    // for (let obj of histories) {
    //   whereQuery = { desid: obj.desid };
    //   updateQuery = {};
    //   updateQuery["career"] = "";
    //   if (targetDesid.includes(obj.desid)) {
    //     updateQuery["career"] = careerTong[obj.desid];
    //   }
    //   await this.MONGOLOCALC.db("miro81").collection("designerHistory").updateOne(whereQuery, { "$set": updateQuery });
    //   console.log(whereQuery);
    // }





    // TOOLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // get sheets
    // console.log(await ghostRequest(`getSheets`, {
    //   id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
    //   range: "A1:D2"
    // }));


    // update sheets
    // console.log(await ghostRequest(`updateSheets`, {
    //   id: "1z6QgrhFKbKnrMCdiuyQwSOnytCA0yRZ5pXdVjPr0YsM",
    //   values: [ [ "안녕?", "안녕?", "안녕?", "안녕?", ], [ "안녕?", "안녕?", "안녕?", "안녕?", ] ],
    //   cleanView: true
    // }));


    // convert svg to js
    // await this.makeSvgTong();


    // get drive folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/18L-hSXjsmksMrOOb3rZzMbXylQRb7pYM");


    // naverBlog to json
    // const blog = new NaverBlogParsing();
    // await blog.blogToJson();


    // spawn catfish
    // const app = new SpawnCatfish();
    // await app.spawnLaunching(true);


    // contents upload
    // const client = "오로사";
    // const pid = "p96";
    // const rid = "re090";
    // const links = [
    //   "https://docs.google.com/document/d/1SQqg1Xwu-iYW46Z_iHRc7zG6O5_N0yg2DfVpldTVOR0/edit?usp=sharing",
    //   "https://docs.google.com/document/d/1jeVlQeVxdOPhfcuxwzxQPuwAprunEeB4_EOKKLBBxZY/edit?usp=sharing",
    //   "https://drive.google.com/drive/folders/1_KrEXQwjq0ZhMDpM7LDZ9fRts9KEyR0j?usp=sharing",
    // ];
    // const webLinks = [
    //   "https://home-liaison.com/portdetail.php?qqq=" + pid,
    //   "https://home-liaison.com/revdetail.php?qqq=" + rid,
    // ];
    // let channel;
    //
    // // 1
    // channel = "#502_sns_contents";
    // await this.mother.slack_bot.chat.postMessage({ text: `${client} 고객님의 디자이너 포트폴리오 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${links[0]}`, channel });
    // await this.mother.slack_bot.chat.postMessage({ text: `${client} 고객님의 고객 인터뷰 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${links[1]}`, channel });
    // await this.mother.slack_bot.chat.postMessage({ text: `${client} 고객님 세팅 사진 원본 link : ${links[2]}`, channel });
    //
    // // 2
    // channel = "#200_web";
    // await this.mother.slack_bot.chat.postMessage({ text: `${client} 고객님 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${webLinks[0]}`, channel });
    // await this.mother.slack_bot.chat.postMessage({ text: `${client} 고객님 고객 인터뷰 컨텐츠를 웹에 업로드하였습니다! link : ${webLinks[1]}`, channel });


    // kakao token
    // const app = new KakaoTalk();
    // await app.generateToken();


    // addtional photo repair
    // const filter = new PortfolioFilter();
    // await filter.additionalRepair("p90", 13);


    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: "이미영",
    //     designer: "김은정",
    //     link: "https://drive.google.com/drive/folders/112UC1Tj71vbNZFHhWz7WXXgr_MBLQpkF",
    //   },
    //   {
    //     client: "정하나",
    //     designer: "임은숙",
    //     link: "https://drive.google.com/drive/folders/1QtKjorPDRex96up8VH6ehhK_KiabZCQN",
    //   },
    // ]);


    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1f7TO4P5SoSPoI9v6ZgVNEohwhTsNEquf", "p96");


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("p96");


    // get corePortfolio by pid
    // await this.getCorePortfolio("p96");


    // aspirant to designer
    // await this.aspirantToDesigner([
    //   [ "김연주", "2021-04-27" ],
    // ]);


    // new designer to front web
    // await work.newDesignerToFront([ "d2008_aa01s" ]);


    // new designer set proposal setting
    // await this.setProposalSettingForDesigner("d2105_aa06s", [
    //   { porlid: "ghost", index: 8 },
    //   { porlid: "ghost", index: 5 },
    //   { porlid: "ghost", index: 10 },
    //   { porlid: "ghost", index: 11 },
    //   { porlid: "ghost", index: 4 },
    //   { porlid: "ghost", index: 7 }
    // ], [
    //   "고객님의 취향과 라이프 스타일에 맞게 시공부터 스타일링까지 진행합니다.",
    //   "모던하고 대비 있는 스타일에 능하며, 그 외에도 여러 스타일을 구사할 수 있습니다.",
    //   "고객님과의 활발한 커뮤니케이션을 진행하며 디자인을 진행합니다."
    // ]);


    // new designer alarm
    // let targetArr, channel, desid, designer, pid, webLinks;
    // channel = "#200_web";
    // targetArr = [
    //   { designer: "김윤진", desid: "de053", pid: "a83" },
    // ];
    // for (let { designer, desid, pid } of targetArr) {
    //   webLinks = [
    //     "https://home-liaison.com/portdetail.php?qqq=" + pid,
    //     "https://home-liaison.com/desdetail.php?qqq=" + desid,
    //   ];
    //   await this.mother.slack_bot.chat.postMessage({ text: `${designer} 디자이너의 첫 번째 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${webLinks[0]}`, channel });
    //   await this.mother.slack_bot.chat.postMessage({ text: `${designer} 디자이너 페이지를 생성하여 웹에 업로드하였습니다! link : ${webLinks[1]}`, channel });
    // }


    // send mail
    // const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    // const human = new HumanPacket();
    // console.log(await human.sendEmail({
    //   to: "uragenbooks@gmail.com",
    //   subject: "안녕하세요!",
    //   contents: "안녕하세요.",
    // }));


    // send sms
    // const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    // const human = new HumanPacket();
    // console.log(await human.sendSms({
    //   name: "배창규",
    //   phone: "01027473403",
    //   subject: "안녕하세요!",
    //   contents: "안녕하세요.",
    // }));


    // ready page block
    // await this.pageReady("webProposal");


    // render page block
    // await this.pageRender(process.env.HOME + "/improvingContract/improvingContract.ai");


    // cook json property
    /*
    await this.cookProperty([
      {
        mongoConnection: this.MONGOC,
        collection: "project",
        standard: "proid",
        mode: "add",
        position: "contents.sns",
        value: {
          portfolio: {
            long: new Date(3800, 0, 1),
            short: new Date(3800, 0, 1),
          },
          interview: {
            long: new Date(3800, 0, 1),
            short: new Date(3800, 0, 1),
          },
        }
      }
    ]);


    */

  } catch (e) {
    console.log(e);
  } finally {
    await this.MONGOC.close();
    await this.MONGOLOCALC.close();
    console.log(`done`);
  }
}

DevContext.prototype.cookProperty = async function (obj) {
  /*
    example:
    await instance.cookProperty([
      {
        mongoConnection: this.MONGOLOCALC,
        collection: "designer",
        standard: "desid",
        mode: "add", // add or remove
        position: "information.test",
        value: "this is test"
      },
      {
        mode: "add", // add or remove
        position: "information.test2",
        value: "this is test2"
      },
      {
        mode: "remove", // add or remove
        position: "information.contract.test3",
        value: "this is test3"
      }
    ]);
  */
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const dbName = "miro81";
  const modes = [ "add", "remove", "move", "copy" ];
  const findValue = function (json, order) {
    const orderArr = order.split(".");
    let target;
    target = json;
    for (let i = 0; i < orderArr.length; i++) {
      target = target[orderArr[i]];
    }
    return target;
  }
  try {
    if (obj === null || typeof obj !== "object") {
      throw new Error("argument must be Object: { mode, mongoConnection, collection, standard, position, value }");
    }
    if (!Array.isArray(obj)) {
      obj = [ obj ];
    }
    if (obj.length === 0) {
      throw new Error("invaild argument");
    }
    if (obj[0].mode === undefined || obj[0].mongoConnection === undefined || obj[0].collection === undefined || obj[0].standard === undefined || obj[0].position === undefined || obj[0].value === undefined) {
      throw new Error("arguments must be [ { mode, mongoConnection, collection, standard, position, value }... ]");
    }
    if (!(modes.includes(obj[0].mode))) {
      throw new Error("mode must be ", modes);
    }
    if (typeof obj[0].position !== "string") {
      throw new Error("position must be string");
    }

    let { mode, mongoConnection, collection, standard, position, value } = obj[0];
    let MONGOC = mongoConnection;
    let whereQuery, updateQuery, updateMotherQuery;
    let rows;

    rows = await MONGOC.db(dbName).collection(collection).find({}).toArray();

    for (let i = 0; i < obj.length; i++) {
      mode = modes.includes(obj[i].mode) ? obj[i].mode : mode;
      position = typeof obj[i].position === "string" ? obj[i].position : position;
      value = obj[i].value !== undefined ? obj[i].value : value;
      if (mode === "remove") {
        value = "";
      }
      for (let json of rows) {

        whereQuery = {};
        updateQuery = {};
        updateMotherQuery = {};

        whereQuery[standard] = findValue(json, standard);

        if (mode === "add") {
          updateQuery[position] = value;
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "remove") {
          updateQuery[position] = value;
          updateMotherQuery["$unset"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "move") {
          updateQuery[position] = findValue(json, value);
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
          updateQuery = {};
          updateMotherQuery = {};
          updateQuery[value] = "";
          updateMotherQuery["$unset"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "copy") {
          updateQuery[position] = findValue(json, value);
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        }

        console.log(`${collection} ${mode} "${position}"`, whereQuery);
      }
    }

    console.log(`${collection} ${mode} all done`);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.splitAi = async function splitAi(targetAi) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  try {
    if (!(await fileSystem(`exist`, [ targetAi ]))) {
      throw new Error("There is no ai file");
    }
    const contents = new ContentsMaker();
    await fileSystem(`write`, [ `${process.cwd()}/temp/aiCanvasScript.js`, `console.splitAi("${targetAi}", true);` ]);
    await contents.generalLaunching(`${process.cwd()}/temp/aiCanvasScript.js`);
    let targetAirDir, resultFolder;
    let target;
    let targetDir, temp, targetTong, optimizer, optimizeResult;
    let svgTongString;

    targetAirDir = targetAi.split('/');
    targetAirDir.pop();
    targetAirDir = targetAirDir.join('/');
    resultFolder = targetAirDir + "/split";

    target = resultFolder + "/svg";

    targetDir = await fileSystem(`readDir`, [ target ]);
    targetDir = targetDir.filter((i) => { return ((i !== `.DS_Store`) && (!/\.js/i.test(i)) && i !== "tong.js"); });
    targetTong = [];

    for (let svg of targetDir) {
      targetTong.push(target + "/" + svg);
    }

    optimizer = new SvgOptimizer(targetTong);
    optimizeResult = await optimizer.launching();

    svgTongString = '';
    for (let i in optimizeResult) {
      svgTongString += "SvgTong." + i + " = " + "'" + optimizeResult[i].replace(/\'/g, '"') + "'";
      svgTongString += "\n\n";
    }

    await fileSystem(`write`, [ `${target}/tong.js`, svgTongString ]);
    for (let svg of targetDir) {
      shell.exec(`rm -rf ${shellLink(target + "/" + svg)};`);
    }

    return resultFolder;

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pageRender = async function (targetAi) {
  const instance = this;
  const { fileSystem, shell, shellLink, ghostFileUpload } = this.mother;
  try {
    if (!(await fileSystem(`exist`, [ targetAi ]))) {
      throw new Error("There is no ai file");
    }

    const resultConst = [ "svg", "jpg", "pdf" ];
    const mediaConst = "media";
    const pageBlockConst = "pageBlock";
    let mediaBoo;
    let targetFolder, resultFolder;
    let tempArr;
    let fromArr, toArr;
    let dirList;
    let aiName;

    tempArr = targetAi.split('/');
    aiName = tempArr.pop();
    targetFolder = tempArr.join('/');

    resultFolder = await this.splitAi(targetAi);

    if (await fileSystem(`exist`, [ `${targetFolder}/${mediaConst}` ])) {
      shell.exec(`cp -r ${shellLink(targetFolder + "/" + mediaConst)} ${resultFolder}`);
      mediaBoo = true;
    } else {
      mediaBoo = false;
    }

    fromArr = [];
    toArr = [];

    for (let i of resultConst) {
      dirList = await fileSystem(`readDir`, [ `${resultFolder}/${i}` ]);
      dirList = dirList.filter((f) => { return f !== `.DS_Store`; });
      for (let j of dirList) {
        fromArr.push(`${resultFolder}/${i}/${j}`);
        toArr.push(`${pageBlockConst}/${aiName.replace(/\.ai$/gi, '')}/${i}/${j}`);
      }
    }

    if (mediaBoo) {
      dirList = await fileSystem(`readDir`, [ `${resultFolder}/${mediaConst}` ]);
      dirList = dirList.filter((f) => { return f !== `.DS_Store`; });
      for (let j of dirList) {
        fromArr.push(`${resultFolder}/${mediaConst}/${j}`);
        toArr.push(`${pageBlockConst}/${aiName.replace(/\.ai$/gi, '')}/${mediaConst}/${j}`);
      }
    }

    await ghostFileUpload(fromArr, toArr);
    shell.exec(`rm -rf ${shellLink(resultFolder)}`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pageReady = async function (name) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  try {
    const contents = new ContentsMaker();
    const homeDir = process.env.HOME;
    const homeDirList = await fileSystem(`readDir`, [ homeDir ]);
    let aiScriptFunc, aiScript;
    let resultFolder;

    resultFolder = `${homeDir}/${name}`;
    if (homeDirList.includes(name)) {
      shell.exec(`rm -rf ${shellLink(resultFolder)}`);
    }
    shell.exec(`mkdir ${shellLink(resultFolder)}`);

    aiScriptFunc = function () {
      const thisAi = console.createDocument();
      const rect = thisAi.artboards[0].artboardRect;
      const rectangle = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });

      thisAi.artboards.add(rectangle.geometricBounds);
      thisAi.artboards.remove(0);
      rectangle.remove();

      let tempRect, saveOptions;

      thisAi.artboards[0].name = "a1";
      thisAi.layers[0].name = "svg";
      tempRect = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(20),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(24),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: 0,
        left: console.convertMillimeters(297 - 20),
        width: console.convertMillimeters(20),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: console.convertMillimeters(210 - 24) * -1,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(24),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;

      saveOptions = new IllustratorSaveOptions();
      thisAi.saveAs(new File(RESULT_FILE), saveOptions);
      thisAi.close(SaveOptions.DONOTSAVECHANGES);
    }
    aiScript = aiScriptFunc.toString().replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, '').replace(/\}$/gi, '').replace(/RESULT_FILE/g, '"' + resultFolder + "/" + name + ".ai" + '"');
    await fileSystem(`write`, [ `${process.cwd()}/temp/aiCanvasScript.js`, aiScript ]);
    await contents.generalLaunching(`${process.cwd()}/temp/aiCanvasScript.js`);

    shell.exec(`open ${shellLink(resultFolder)}`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.makeSvgTong = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);
    const target = process.cwd() + "/temp/svg";
    let targetDir, temp, targetTong, optimizer, optimizeResult;
    let svgTongString;

    targetDir = await fileSystem(`readDir`, [ target ]);
    targetDir = targetDir.filter((i) => { return ((i !== `.DS_Store`) && (!/\.js/i.test(i)) && i !== "tong.js"); });
    targetTong = [];

    for (let svg of targetDir) {
      targetTong.push(target + "/" + svg);
    }

    optimizer = new SvgOptimizer(targetTong);
    optimizeResult = await optimizer.launching();

    svgTongString = '';
    for (let i in optimizeResult) {
      svgTongString += "SvgTong." + i + " = " + "'" + optimizeResult[i].replace(/\'/g, '"') + "'";
      svgTongString += "\n\n";
    }

    await fileSystem(`write`, [ `${process.cwd()}/temp/svg/tong.js`, svgTongString ]);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.spellCheck = async function (porlid) {
  const instance = this;
  try {
    const app = new NaverAPIs();
    const hangul = new ParsingHangul();
    let note, targetArr, temp;
    let fixString;
    let updateArr = [];
    note = new AppleNotes({ folder: "portfolio", subject: porlid });
    targetArr = await note.readNote();
    for (let i of targetArr) {
      temp = await app.paragraphChecker(i);
      fixString = hangul.fixString(temp);
      console.log(fixString)
      updateArr.push(fixString);
    }
    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br>'));
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.aspirantToDesigner = async function (nameList) {
  if (!Array.isArray(nameList)) {
    throw new Error("input must be array => [ [], [], []... ]");
  }
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    const stringToDate = function (str) {
      let temp = str.split('-');
      return new Date(Number(temp[0]), Number(temp[1].replace(/^0/g, '')) - 1, Number(temp[2].replace(/^0/g, '')));
    }

    let whereQuery, updateQuery;
    let aspirants, aspirant;
    let aspidArr;
    aspidArr = [];
    for (let [ name, contractDay ] of nameList) {
      whereQuery = { designer: name };
      aspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: this.MONGOC });
      aspirant = aspirants[0];
      aspidArr.push({ aspid: aspirant.aspid, contract: stringToDate(contractDay) });
    }
    await work.aspirantToDesigner(aspidArr, { selfMongo: this.MONGOC });
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.sendChecklist = async function () {
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
    const kakao = new KakaoTalk();
    await kakao.ready();
    const method = "designerCheckList";
    const designers = await back.getDesignersByQuery({ desid: "d2103_aa21s" });

    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';
    let targetDesigners = [];
    let tempObj;
    let middleDate, deadDate;
    let rows;

    if (today.getDay() !== 0 && today.getDay() !== 6) {
      //pyeong-day
      today.setDate(today.getDate() + 7);
    } else {
      if (today.getDay() !== 0) {
        //saturday
        today.setDate(today.getDate() + 9);
      } else {
        //sunday
        today.setDate(today.getDate() + 8);
      }
    }

    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(14) + "시";

    for (let d of designers) {
      if (/완료/gi.test(d.information.contract.status.value)) {
        targetDesigners.push({ desid: d.desid, designer: d.designer, phone: d.information.phone });
      }
    }

    middleDate = new Date();
    middleDate.setHours(middleDate.getHours() + 8);
    deadDate = new Date();
    deadDate.setDate(deadDate.getDate() + 9);

    for (let { desid, designer, phone } of targetDesigners) {
      console.log(method, designer, phone);
      console.log(expiredString, ADDRESS.homeinfo.ghost.host, desid);
      rows = await back.mongoRead("deadline", { name: "designerCheckList_" + desid }, { console: true });
      if (rows.length > 0) {
        await back.mongoUpdate("deadline", [ { name: "designerCheckList_" + desid }, { deadline: deadDate, middleline: middleDate } ], { console: true });
      } else {
        await back.mongoCreate("deadline", { deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid }, { console: true });
      }
      await kakao.sendTalk(method, designer, phone, {
        date: expiredString,
        host: ADDRESS.homeinfo.ghost.host,
        desid: desid,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.getCorePortfolio = async function (pid) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    if (pid === undefined) {
      throw new Error("must be pid");
    }
    const nameConst = "static";
    const staticConst = "/home/" + this.address.homeinfo.ghost.user + "/" + nameConst;
    const portfolioConst = "/corePortfolio/original";
    let scpFrom, scpTo;
    scpFrom = this.address.homeinfo.ghost.user + "@" + this.address.homeinfo.ghost.host + ":" + shellLink(staticConst + portfolioConst + "/" + pid);
    scpTo = shellLink(process.cwd() + "/temp");
    shell.exec(`scp -r ${scpFrom} ${scpTo}`);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.setProposalSettingForDesigner = async function (desid, files, description) {
  // files = [ { porlid: "a78", index: 2 } or { porlid: "ghost", index: 2 } ]
  const instance = this;
  try {
    if (!Array.isArray(files)) {
      throw new Error("files must be array");
    }
    if (files.length !== 6) {
      throw new Error("files must be 6 array");
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].porlid === undefined || files[i].index === undefined) {
        throw new Error("files must be [ { porlid: \"a78\", index: 2 } or { porlid: \"ghost\", index: 2 } ]");
      }
    }
    let proposalArr, dummy, filesArr;
    filesArr = [];
    for (let { porlid, index } of files) {
      if (porlid !== "ghost") {
        filesArr.push(`/corePortfolio/listImage/${porlid}/t${String(index)}${porlid}.jpg`);
      } else {
        filesArr.push(`/rawDesigner/ghost/${desid}/g${String(index)}.jpg`);
      }
    }

    dummy = function (fileArr) {
      let resultArr = { name: "기본 세팅", photo: [
        {
            "position" : "0",
            "sgTrue" : "g",
            "unionPo" : "union",
            "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"" + filesArr[0] + "\");",
            "imgSrc" : filesArr[0]
        },
        {
            "position" : "1",
            "sgTrue" : "s",
            "unionPo" : "right",
            "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"" + filesArr[1] + "\");",
            "imgSrc" : filesArr[1]
        },
        {
            "position" : "2",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[2],
            "styleText" : "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[2] + "\");"
        },
        {
            "position" : "3",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[3],
            "styleText" : "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"" + filesArr[3] + "\");"
        },
        {
            "position" : "4",
            "sgTrue" : "s",
            "unionPo" : "left",
            "imgSrc" : filesArr[4],
            "styleText" : "top: 67%; left: 67.2%; width: 16%; height: 33%; background-image: url(\"" + filesArr[4] + "\");"
        },
        {
            "position" : "5",
            "sgTrue" : "s",
            "unionPo" : "right",
            "imgSrc" : filesArr[5],
            "styleText" : "top: 67%; left: 84%; width: 16%; height: 33%; background-image: url(\"" + filesArr[5] + "\");"
        }
      ], description };
      return resultArr;
    }

    proposalArr = [];
    for (let i = 0; i < 5; i++) {
      proposalArr.push(JSON.parse(JSON.stringify(dummy())));
    }

    console.log(proposalArr[0]);
    await this.back.updateDesigner([ { desid }, { "setting.proposal": proposalArr } ]);
    console.log("injection success");
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.devCanvas = async function (dataCheck = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  const contents = new ContentsMaker();
  try {
    const canvasFolder = `${this.dir}/canvas`;
    const tempFolder = `${process.cwd()}/temp`;
    const canvasFolderList = await fileSystem(`readDir`, [ canvasFolder ]);
    let canvasFolderList_refined, targetFolder, targetFolderList;
    let finalString, tempString, order, fileName, temp;

    canvasFolderList_refined = [];
    for (let i of canvasFolderList) {
      if (i !== `.DS_Store`) {
        canvasFolderList_refined.push(i);
      }
    }

    canvasFolderList_refined.sort((a, b) => {
      return Number(b.split('_')[0].replace(/[^0-9]/g, '')) - Number(a.split('_')[0].replace(/[^0-9]/g, ''));
    });

    targetFolder = canvasFolder + "/" + canvasFolderList_refined[0];
    targetFolderList = await fileSystem(`readDir`, [ targetFolder ]);

    finalString = '';
    if (!dataCheck) {
      order = [ "class", "data", "text", "exec", "exe", "main", "m", "index", "app" ];
    } else {
      order = [ "class", "data", "text", "check", "dev" ];
    }

    for (let i of order) {
      if (targetFolderList.includes(`${i}.js`)) {
        tempString = await fileSystem(`readString`, [ `${targetFolder}/${i}.js` ]);
        finalString += "\n\n";
        finalString += tempString.replace(/process.cwd\(\)/g, '"' + process.cwd() + '"');
      }
    }

    if (!dataCheck) {
      fileName = "aiCanvasScript.js";
      await fileSystem(`write`, [ `${tempFolder}/${fileName}`, finalString ]);
      await contents.generalLaunching(`${tempFolder}/${fileName}`);
    } else {
      temp = new Function(finalString);
      temp();
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = DevContext;
