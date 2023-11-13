const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const BackReport = require(APP_PATH + "/backMaker/backReport.js");
const BackWorker = require(APP_PATH + "/backMaker/backWorker.js");
const BridgeCloud = require(APP_PATH + "/bridgeCloud/bridgeCloud.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const GoogleDrive = require(APP_PATH + "/googleAPIs/googleDrive.js");
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AiConsole = require(APP_PATH + "/contentsMaker/aiConsole.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");
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

class DevContext extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo, mongolocalinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo);
    this.MONGOLOCALC = new mongo(mongolocalinfo);
    this.address = require(`${process.cwd()}/apps/infoObj.js`);
  }

  async getGoogleWriteJson() {
    const analytics = new GoogleAnalytics();
    const sheet = new GoogleSheet();
    const sheetTarget = { id: "1ESI1wf8Zj17s6hYHkEJhDOeLutEvC5iDvtSUN3qjpZc", sheet: "분석", xyz: [ 0, 1 ] };

    const clients = await analytics.getClientsInfoByNumber();
    console.log(clients);

    for (let client of clients) {
      await this.mother.fileSystem(`write`, [ `${process.cwd()}/temp/googleAnalytics_${client.cliid}_${this.mother.todayMaker()}.json`, client.death ]);
    }

    console.log("success");
  }

  async spellCheck(porlid) {
    const app = new NaverAPIs();
    let note, targetArr, temp;
    let updateArr = [];
    note = new AppleAPIs({ folder: "portfolio", subject: porlid });
    targetArr = await note.readNote();
    for (let i of targetArr) {
      temp = await app.paragraphChecker(i);
      updateArr.push(temp);
    }
    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br><br>'));
  }

  async titleVerification(target) {
    let note, noteArr;
    let title;
    let apartArr, apartText, pyIndex;
    let resultObj = {};

    note = new AppleAPIs({ folder: "portfolio", subject: target });
    noteArr = await note.readNote();
    title = noteArr[2];

    let [ subject, apart ] = title.split(", ");

    apartArr = apart.split(' ');
    for (let i = 0; i < apartArr.length; i++) {
      if (/py/gi.test(apartArr[i])) {
        pyIndex = i;
      }
    }

    apartText = '';
    for (let i = 0; i < pyIndex; i++) {
      apartText += apartArr[i] + ' ';
    }
    apartText = apartText.slice(0, -1);

    resultObj.porlid = target;

    resultObj.raw = {};
    resultObj.raw.apart = { text: apartText, length: apartText.length };
    resultObj.raw.subject = { text: subject, length: subject.length };
    resultObj.raw.apartTitle = { text: apart, length: apart.length };

    resultObj.boo = {};
    resultObj.boo.apart = (apartText.length < 10);
    resultObj.boo.subject = (subject.length < 19);
    resultObj.boo.apartTitle = (apart.length < 21);
    resultObj.boo.subjectTitle = (subject.length + apartText.length < 27);

    return resultObj;
  }

  async reviewVerification(target) {
    let note, noteArr;
    let reviewTitleIndex, reviewTitleArr;
    let noReview = true;
    let booResults = [];

    note = new AppleAPIs({ folder: "portfolio", subject: target });
    noteArr = await note.readNote();

    for (let i = 0; i < noteArr.length; i++) {
      if (/^_review/.test(noteArr[i])) {
        reviewTitleIndex = i + 2;
        noReview = false;
      }
    }

    if (!noReview) {

      reviewTitleArr = noteArr[reviewTitleIndex].split(", ");

      booResults.push(reviewTitleArr[0].length < 10);
      booResults.push(reviewTitleArr[1].length < 10);

      if (!booResults[0] || !booResults[1]) {
        console.log(target, booResults);
      }

    }
  }

  async googlePythonTest() {
    const analytics = new GoogleAnalytics();
    const clients = await analytics.getClientsInfoByNumber(1);
    console.log(clients);
  }

  async designerTextFromAi() {
    const targetMother = `/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_NewWeb/_Designer`;
    const targetMotherDir = await fileSystem(`readDir`, [ targetMother ]);
    let desidTarget = [];
    for (let i of targetMotherDir) { if ((new RegExp("^[0-9]")).test(i)) {
      desidTarget.push('de0' + i.replace(/[^0-9]/g, ''));
    }}

    async function getText(desid) {
      const app = new ContentsMaker();
      let targetFolder, responseArr = {};
      for (let i of targetMotherDir) { if ((new RegExp("^" + desid.slice(3))).test(i)) {
        targetFolder = targetMother + "/" + i;
      }}
      responseArr.desktop = (await app.getTextFromAi(targetFolder + "/" + "word" + desid + ".ai"))[0].split("\n");
      responseArr.mobile = (await app.getTextFromAi(targetFolder + "/" + "moword" + desid + ".ai"))[0].split("\n");

      let resultArr = [];
      resultArr.push("_desktop");
      for (let i of responseArr.desktop) {
        resultArr.push(i);
      }
      resultArr.push("_mobile");
      for (let i of responseArr.mobile) {
        resultArr.push(i);
      }

      return resultArr;
    }

    let note, targetArr, updateArr;
    console.log(desidTarget);
    for (let i of desidTarget) {
      note = new AppleAPIs({ folder: "designer", subject: i });
      targetArr = await note.readNote();
      updateArr = targetArr.concat(await getText(i));
      updateArr.shift();
      await note.updateNote(updateArr.join('<br><br><br>'));
    }
  }

  getMatrix(index) {
    const sheet = new GoogleSheet();
    const sheetPromise = function (index) {
      return new Promise(function(resolve, reject) {
        const range = [
          "target!C3:E224",
          "target!F3:H224",
          "target!I3:K224",
        ]
        sheet.get_value_inPython("11k3VpCdp_doHC-xoyWMpJqa5jMUeTERcG9C3MdCq_HQ", range[index]).then(function (fu) {
          let arr, result;
          arr = [];
          result = '';
          for (let i = 0; i < fu.length; i++) {
            result += fu[i].join("__split0__");
            result += "__split1__";
            if ((i % 6) === 5) {
              result = result.slice(0, -10);
              arr.push(result);
              result = '';
            }
          }
          const set = new Set(arr);
          const filteredArr = Array.from(set);
          resolve(filteredArr);
        }).catch(function (err) {
          reject(err);
        });
      });
    }

    return new Promise(function(resolve, reject) {
      sheetPromise(index).then((value) => {
        resolve(value);
      })
    });
  }

  parsingMatrix(values) {
    const list = [
      { name: "HomeFurnishing", range: "target!C3:E224", },
      { name: "HomeStyling", range: "target!F3:H224", },
      { name: "TotalStyling", range: "target!I3:K224", },
    ];
    let resultArr = [];
    let tempObj;
    for (let i = 0; i < list.length; i++) {
      tempObj = {
        serid: "s2011_aa0" + String(i + 1) + 's',
        name: list[i].name,
        standard: {
          x: [
            'M',
            'B',
            'P'
          ],
          y: [
            [ 0, 9 ],
            [ 9, 18 ],
            [ 18, 25 ],
            [ 25, 40 ],
            [ 40, 50 ],
            [ 50 ],
          ],
        },
        case: values[i],
      };
      resultArr.push(tempObj);
    }
    return resultArr;
  }

  async getDesignerMatrix() {
    const back = new BackMaker();
    const sheet = new GoogleSheet();

    let target = [
      [ "s2011_aa01s", "target!C3:E224" ],
      [ "s2011_aa02s", "target!F3:H224" ],
      [ "s2011_aa03s", "target!I3:K224" ],
    ]

    let idArr = [];
    let onlineArr = [];
    let idArrRaw = await sheet.get_value_inPython("11k3VpCdp_doHC-xoyWMpJqa5jMUeTERcG9C3MdCq_HQ", "target!A3:A224");
    let onlineArrRaw = await sheet.get_value_inPython("11k3VpCdp_doHC-xoyWMpJqa5jMUeTERcG9C3MdCq_HQ", "target!L3:L224");
    for (let i of idArrRaw) {
      if (i.length !== 0) {
        idArr.push(i[0]);
      }
    }
    for (let i of onlineArrRaw) {
      if (i.length !== 0) {
        onlineArr.push(i[0]);
      }
    }

    async function returnTong(arr) {
      let service, result;
      let matrixTotalTong, matrixTong, resultTong;

      service = await back.getServiceById(arr[0]);
      result = await sheet.get_value_inPython("11k3VpCdp_doHC-xoyWMpJqa5jMUeTERcG9C3MdCq_HQ", arr[1]);

      matrixTotalTong = [];
      matrixTong = [];
      for (let i = 0; i < result.length; i++) {
        matrixTong.push(result[i]);
        if ((i % 6) === 5) {
          matrixTotalTong.push(matrixTong);
          matrixTong = [];
        }
      }

      resultTong = [];
      for (let i of matrixTotalTong) {
        resultTong.push(service.queryCase(i));
      }

      return resultTong;
    }

    let tongs = [];
    for (let i = 0; i < target.length; i++) {
      tongs.push({ id: target[i][0], arr: (await returnTong(target[i])) });
    }

    let finalTong = {};
    for (let i = 0; i < idArr.length; i++) {
      finalTong[idArr[i]] = { service: [], online: false };
      for (let j = 0; j < tongs.length; j++) {
        finalTong[idArr[i]].service.push({ serid: tongs[j].id, case: tongs[j].arr[i] });
      }
      if (/x/gi.test(onlineArr[i])) {
        finalTong[idArr[i]].online = false;
      } else {
        finalTong[idArr[i]].online = true;
      }
    }

    console.log(finalTong);
    await fileSystem(`write`, [ `${process.cwd()}/temp/serviceTong.js`, JSON.stringify(finalTong, null, 2) ]);
  }

  async launching() {
    const instance = this;
    const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
    try {
      await this.MONGOC.connect();
      await this.MONGOLOCALC.connect();
      const back = new BackMaker();
      const report = new BackReport();
      const work = new BackWorker();

      /*

      const sheets = new GoogleSheet();
      const sheetsId = "1yyBGnVXfmu9maQWxXs4-_ngDwefdzmqzTp9NYyI6CGw";
      const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      const ABC = [];
      for (let i of alphabet) { ABC.push(i); }
      for (let i of alphabet) { for (let j of alphabet) { ABC.push(i + j); } }
      const targetInfo = {
        client: {
          name: "응대중 고객 현황",
          startPoint: [ 0, 9 ],
          endPoint: [ 11, 1000 ],
          columns: [
            "cliid",
            "important",
            "name",
            "status",
            "action",
            "latest",
            "kakao",
            "prefer",
            "issue",
            "latest",
            "timeline",
            "movein"
          ]
        },
        project: {
          name: "프로젝트케어",
          startPoint: [ 0, 9 ],
          endPoint: [ 9, 1000 ],
          columns: [
            "proid",
            "name",
            "status",
            "contract",
            "designer",
            "service",
            "action",
            "latest",
            "first",
            "issue",
          ]
        },
        drop: {
          name: "드랍 고객 관리",
          startPoint: [],
        }
      };
      const rangeMaker = function (key) {
        let str = '';
        str += targetInfo[key].name + '!';
        str += ABC[targetInfo[key].startPoint[0]] + String(targetInfo[key].startPoint[1] + 1);
        str += ':';
        str += ABC[targetInfo[key].endPoint[0]] + String(targetInfo[key].endPoint[1] + 1);
        return str;
      }
      let temp, tong, tempObj, totalTong, tempClient, tongtong;
      let cliidArr, projects;
      let whereQuery, updateQuery;
      let proidArr;

      const key = "client";

      tong = await sheets.get_value_inPython(sheetsId, rangeMaker(key));
      totalTong = [];

      for (let arr of tong) {
        tempObj = {};
        for (let i = 0; i < targetInfo[key].columns.length; i++) {
          tempObj[targetInfo[key].columns[i]] = arr[i];
        }
        totalTong.push(tempObj);
      }


      tongtong = {};
      for (let { cliid, action, kakao, prefer } of totalTong) {
        tongtong[cliid] = {
          "requests.0.analytics.response.action": "응대 종료",
        };
        if (/1차/g.test(action) && /예정/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "1차 응대 예정",
          };
        }
        if (/1차/g.test(action) && /대기/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "1차 응대 후 대기",
          };
        }
        if (/제안/g.test(action) && /발송/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "제안 발송 예정",
          };
        }
        if (/제안/g.test(action) && /피드백/g.test(action) && /예정/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "제안 피드백 대기",
          };
        }
        if (/제안/g.test(action) && /피드백/g.test(action) && /완/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "제안 피드백 완료",
          };
        }
        if (/제안/g.test(action) && /후/g.test(action) && /반응/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "제안 후 대기",
          };
        }
        if (/연결/g.test(action) && /안/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "연결 안 됨",
          };
        }
        if (/계약/g.test(action) && /입금/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "계약금 입금",
          };
        }
        if (/계약/g.test(action) && /서명/g.test(action)) {
          tongtong[cliid] = {
            "requests.0.analytics.response.action": "계약서 서명",
          };
        }

        if (/X/gi.test(kakao)) {
          tongtong[cliid]["requests.0.analytics.response.kakao"] = false;
        } else {
          tongtong[cliid]["requests.0.analytics.response.kakao"] = true;
        }

        if (/X/gi.test(prefer)) {
          tongtong[cliid]["requests.0.analytics.picture.prefer.boo"] = false;
        } else {
          tongtong[cliid]["requests.0.analytics.picture.prefer.boo"] = true;
        }

      }

      cliidArr = Object.keys(tongtong);

      for (let c of cliidArr) {
        whereQuery = { cliid: c };
        updateQuery = tongtong[c];
        // await back.updateClient([ whereQuery, updateQuery ]);
        // console.log(`update ${c} success`);
      }

      projects = await back.getProjectsByQuery({});
      for (let p of projects) {
        whereQuery = { cliid: p.cliid };
        updateQuery = {};
        updateQuery["requests.0.analytics.response.service"] = p.service.toNormal();
        // await back.updateClient([ whereQuery, updateQuery ]);
        // console.log(`update ${p.cliid} success`);
      }



      tong = await sheets.get_value_inPython(sheetsId, rangeMaker("project"));
      totalTong = [];

      for (let arr of tong) {
        tempObj = {};
        for (let i = 0; i < targetInfo["project"].columns.length; i++) {
          tempObj[targetInfo["project"].columns[i]] = arr[i];
        }
        totalTong.push(tempObj);
      }

      console.log(totalTong);


      tongtong = {};
      for (let { proid, action } of totalTong) {
        tongtong[proid] = {
          "process.action": "해당 없음",
        };

        if (/현장/g.test(action)) {
          tongtong[proid] = {
            "process.action": "현장 미팅",
          };
        }
        if (/1차/g.test(action)) {
          tongtong[proid] = {
            "process.action": "1차 제안",
          };
        }
        if (/수정/g.test(action)) {
          tongtong[proid] = {
            "process.action": "수정 제안",
          };
        }
        if (/시공/g.test(action)) {
          tongtong[proid] = {
            "process.action": "시공 진행",
          };
        }
        if (/제품/g.test(action)) {
          tongtong[proid] = {
            "process.action": "제품 구매",
          };
        }
        if (/배송/g.test(action)) {
          tongtong[proid] = {
            "process.action": "배송중",
          };
        }
        if (/촬영/g.test(action)) {
          tongtong[proid] = {
            "process.action": "촬영 컨택",
          };
        }

      }

      proidArr = Object.keys(tongtong);

      for (let p of proidArr) {
        whereQuery = { proid: p };
        updateQuery = tongtong[p];
        // await back.updateProject([ whereQuery, updateQuery ]);
        // console.log(`update ${p} success`);
      }


      */

      /*

      const hangul = new ParsingHangul();
      const contents = new ContentsMaker();
      const total = require(`${process.cwd()}/apps/parsingHangul/library/total.js`);
      let str, fileName;

      fileName = `${process.cwd()}/temp/aiscripting.js`;

      str = `const text = ${JSON.stringify(total.split(""), null, 2)};`;
      str += "\n\n";
      str += `let this_ai, from, to, contents, temp, items, count, testWording, tempNum, finalHeight, pastArtBoard;

      const fontTargetList = [
        "SDGothicNeoa-aTh",
        "SDGothicNeoa-bUltLt",
        "SDGothicNeoa-cLt",
        "SDGothicNeoa-dRg",
        "SDGothicNeoa-eMd",
        "SDGothicNeoa-fSm",
        "SDGothicNeoa-gBd",
        "SDGothicNeoa-hExBd",
        // "SDGothicNeoa-iHv",
      ];

      const subTargets = [ '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '[', ']', '{', '}', '<', '>', ',', '.', '?', '/', ':', ';', '~', '“', '”', '‘', '’' ];

      for (let targetIndex = 0; targetIndex < fontTargetList.length; targetIndex++) {
        this.createDoc();
        tempNum = Math.floor(text.length / 20) + 1;
        finalHeight = 0;

        for (let i = 0; i < tempNum; i++) {
          testWording = text.slice((20 * i), (20 * (i + 1)));
          this_ai = app.activeDocument;
          from = "general";
          to = "wordTest";
          contents = testWording.join("");
          this.setCreateSetting({ from: from, to: to, exception: {
            font: fontTargetList[targetIndex]
          }});
          this.setParagraph({ from: contents, to: to });
          temp = this.createElements(this_ai, this.createSetting[to]);
          temp = temp.createOutline();

          if (temp.height > finalHeight) {
            finalHeight = temp.height;
          }
          temp.remove();
        }

        for (let i = 0; i < subTargets.length; i++) {
          this_ai = app.activeDocument;
          from = "general";
          to = "method" + String(targetIndex) + "_word" + String(i);
          contents = subTargets[i];
          this.setCreateSetting({ from: from, to: to, exception: {
            font: fontTargetList[targetIndex]
          }});
          this.setParagraph({ from: contents, to: to });
          temp = this.createElements(this_ai, this.createSetting[to]);
          temp = temp.createOutline();
          if (temp.height > 0) {
            temp.remove();
            contents = "궜흖" + subTargets[i];
            this.setCreateSetting({ from: from, to: to, exception: {
              font: fontTargetList[targetIndex]
            }});
            this.setParagraph({ from: contents, to: to });
            temp = this.createElements(this_ai, this.createSetting[to]);
            temp = temp.createOutline();
            this.mother.fit_box({ height: { value: finalHeight } });
            temp.pageItems[temp.pageItems.length - 1].remove();
            temp.pageItems[temp.pageItems.length - 1].remove();

            pastArtBoard = app.activeDocument.artboards[0];
            app.activeDocument.artboards.add([ temp.pageItems[0].left, pastArtBoard.artboardRect[1], pastArtBoard.artboardRect[2], pastArtBoard.artboardRect[3] ]);
            pastArtBoard.remove();

            app.doScript("expandall", "contents_maker");
            this.saveSvg(this_ai, to, true);
          } else {
            items = [];
            for (let j = 0; j < this_ai.pageItems.length; j++) {
              items.push(this_ai.pageItems[j]);
            }
            count = this_ai.length;
            for (let j = 0; j < count; j++) {
              items[j].remove();
            }
          }
        }

        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      }`

      await fileSystem(`write`, [ fileName, str ]);
      await contents.tempLaunching(fileName);

      */


      // Photo sheets to Photo console START ============================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================
      /*

      const MONGOC = this.MONGOLOCALC;
      const MONGOHISTORYC = this.MONGOLOCALC;
      const EMPTYDATE = new Date(1800, 0, 1);
      const EMPTYDATEBOO = new Date(2000, 0, 1);
      const FOREDATE = new Date(3800, 0, 1);
      const sheets = new GoogleSheet();
      const sheetsId = "1Clrbaub3Ztn5l2FYWIkGKrYL2_lP0B6QBGDzOXTRqw8";
      const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      const ABC = [];
      for (let i of alphabet) { ABC.push(i); }
      for (let i of alphabet) { for (let j of alphabet) { ABC.push(i + j); } }
      const stringToDate = function (str, hours = null) {
        let tempArr, hoursParsing;
        tempArr = str.split("-");
        if (tempArr.length !== 3) {
          throw new Error("invaild date string");
        }
        if (Number(tempArr[0].replace(/^0/, '')) > 3000) {
          if (hours !== null) {
            return new Date(3800, 0, 1);
          } else {
            return new Date(1800, 0, 1);
          }
        }
        if (Number(tempArr[0].replace(/^0/, '')) < 2000) {
          return new Date(1800, 0, 1);
        }
        if (hours === null) {
          return new Date(Number(tempArr[0].replace(/^0/, '')), Number(tempArr[1].replace(/^0/, '')), Number(tempArr[2].replace(/^0/, '')));
        } else {
          if (/^오후/.test(hours)) {
            hoursParsing = 12;
          } else {
            hoursParsing = 0;
          }
          hoursParsing += Number(hours.split(':')[0].replace(/[^0-9]/g, ''));
          if (Number.isNaN(hoursParsing)) {
            throw new Error("invaild date hour string");
          }
          if (hoursParsing === 24) {
            hoursParsing = 12;
          }
          if (0 >= hoursParsing || 24 <= hoursParsing) {
            console.log(hoursParsing, str, hours);
          }
          return new Date(Number(tempArr[0].replace(/^0/, '')), Number(tempArr[1].replace(/^0/, '')), Number(tempArr[2].replace(/^0/, '')), hoursParsing);
        }
      }
      let tong, tong2;
      let projects, projectHistories;
      let fixedMatrix, fixedTempArr;
      let tempObj;
      let objArr;
      let photoStatusCases;
      let portfolioContentsCases, interviewContentsCases, photoFixCases;
      let finalArr;
      let temp, tempArr;
      let whereQuery, updateQuery, updateQuery2;

      tong = await sheets.get_value_inPython(sheetsId, "총괄 시트!A2:X");

      objArr = [];
      // fixedMatrix = [ [ "ID", "고객명", "종료", "촬영 진행 여부", "촬영 진행 상태", "D", "P", "I", "촬영일", "촬영 시간", "주소 및 세부내용", "인터뷰 원고", "디자이너 글", "사진", "BI", "BP", "II", "IP", "발행(W)", "사진공유(D)", "사진공유(C)", "콘텐츠 공유" ] ];
      for (let [ proid, client, null0, photoBoo, photoStatus, designer, photographer, interviewer, photoDate, photoDateHours, issue, interviewContents, portfolioContents, photoFix, blogInterview, blogPortfolio, instaInterview, instaPortfolio, web, shareDesignerPhoto, shareClientPhoto, shareClientContents ] of tong) {
        tempObj = {
          proid: proid.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          client: client.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoBoo: photoBoo.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoStatus: photoStatus.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          designer: designer.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photographer: photographer.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          interviewer: interviewer.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoDate: photoDate.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoDateHours: photoDateHours.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoIssue: issue.trim(),
          interviewContents: interviewContents.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          portfolioContents: portfolioContents.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          photoFix: photoFix.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          blogInterview: blogInterview.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          blogPortfolio: blogPortfolio.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          instaInterview: instaInterview.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          instaPortfolio: instaPortfolio.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          shareDesignerPhoto: shareDesignerPhoto.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          shareClientPhoto: shareClientPhoto.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
          shareClientContents: shareClientContents.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '').trim(),
        };
        objArr.push(tempObj);
      }

      photoStatusCases = [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ];
      portfolioContentsCases = [ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ];
      interviewContentsCases = [ '세팅 대기', '인터뷰 요망', '인터뷰 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ];
      photoFixCases = [ '촬영 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 보정중', '원본 보정 완료', '해당 없음' ];

      projects = await back.getProjectsByQuery({}, { selfMongo: MONGOC });
      for (let p of projects) {
        whereQuery = {};
        updateQuery = {};
        whereQuery["proid"] = p.proid;
        updateQuery["contents.photo.boo"] = true;
        updateQuery["contents.photo.status"] = "세팅 대기";
        updateQuery["contents.photo.date"] = new Date(3800, 0, 1);
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        temp = await back.getHistoryById("project", p.proid, { selfMongo: MONGOHISTORYC });
        if (temp === null) {
          await back.createHistory("project", whereQuery, { selfMongo: MONGOHISTORYC });
        }
      }

      finalArr = [];
      for (let { proid, client, photoBoo, photoStatus, designer, photographer, interviewer, photoDate, photoDateHours, photoIssue, interviewContents, portfolioContents, photoFix, blogInterview, blogPortfolio, instaInterview, instaPortfolio, shareDesignerPhoto, shareClientPhoto, shareClientContents } of objArr) {
        projects = await back.getProjectsByNames([ client.trim(), designer.trim() ], { selfMongo: MONGOC });
        projectHistories = await back.getHistoryById("project", proid, { selfMongo: MONGOHISTORYC });
        if (proid !== projects[0].proid) {
          throw new Error("invaild proid : " + proid);
        }
        if (!photoStatusCases.includes(photoStatus)) {
          throw new Error("invaild photoStatusCases : " + proid);
        }
        if (!portfolioContentsCases.includes(portfolioContents)) {
          throw new Error("invaild portfolioContentsCases : " + proid);
        }
        if (!interviewContentsCases.includes(interviewContents)) {
          throw new Error("invaild interviewContentsCases : " + proid);
        }
        if (!photoFixCases.includes(photoFix)) {
          throw new Error("invaild photoFixCases : " + proid);
        }
        tempArr = [];

        whereQuery = {};
        updateQuery = {};
        updateQuery2 = {};

        whereQuery["proid"] = proid;
        updateQuery["contents.photo.boo"] = (photoBoo === 'O');
        updateQuery["contents.photo.status"] = photoStatus;
        updateQuery["contents.photo.date"] = stringToDate(photoDate, photoDateHours);
        updateQuery["contents.photo.info.photographer"] = photographer.trim() === "미정" ? "" : photographer.trim();
        updateQuery["contents.photo.info.interviewer"] = interviewer.trim() === "미정" ? "" : interviewer.trim();
        updateQuery["contents.raw.portfolio.status"] = portfolioContents;
        updateQuery["contents.raw.interview.status"] = interviewContents;
        updateQuery["contents.raw.photo.status"] = photoFix;

        updateQuery2["contents.blog.portfolio.date"] = stringToDate(blogPortfolio);
        updateQuery2["contents.blog.portfolio.boo"] = (updateQuery2["contents.blog.portfolio.date"].valueOf() > EMPTYDATEBOO.valueOf());
        updateQuery2["contents.blog.review.date"] = stringToDate(blogInterview);
        updateQuery2["contents.blog.review.boo"] = (updateQuery2["contents.blog.review.date"].valueOf() > EMPTYDATEBOO.valueOf());
        updateQuery2["contents.instagram.portfolio.date"] = stringToDate(instaPortfolio);
        updateQuery2["contents.instagram.portfolio.boo"] = (updateQuery2["contents.instagram.portfolio.date"].valueOf() > EMPTYDATEBOO.valueOf());
        updateQuery2["contents.instagram.review.date"] = stringToDate(instaInterview);
        updateQuery2["contents.instagram.review.boo"] = (updateQuery2["contents.instagram.review.date"].valueOf() > EMPTYDATEBOO.valueOf());
        if (projectHistories["photo"] === "") {
          updateQuery2["photo"] = photoIssue;
        }

        if (shareClientPhoto === 'O') {
          if (updateQuery2["contents.blog.review.boo"]) {
            updateQuery["contents.share.client.photo"] = updateQuery2["contents.blog.review.date"];
            updateQuery["contents.share.designer.photo"] = updateQuery2["contents.blog.review.date"];
          } else if (updateQuery2["contents.blog.portfolio.boo"]) {
            updateQuery["contents.share.client.photo"] = updateQuery2["contents.blog.portfolio.date"];
            updateQuery["contents.share.designer.photo"] = updateQuery2["contents.blog.portfolio.date"];
          } else {
            updateQuery["contents.share.client.photo"] = EMPTYDATE;
            updateQuery["contents.share.designer.photo"] = EMPTYDATE;
          }
        } else {
          updateQuery["contents.share.client.photo"] = EMPTYDATE;
          updateQuery["contents.share.designer.photo"] = EMPTYDATE;
        }

        if (shareClientContents === 'O') {
          if (updateQuery2["contents.blog.review.boo"]) {
            updateQuery["contents.share.client.contents"] = updateQuery2["contents.blog.review.date"];
            updateQuery["contents.share.designer.contents"] = updateQuery2["contents.blog.review.date"];
          } else if (updateQuery2["contents.blog.portfolio.boo"]) {
            updateQuery["contents.share.client.contents"] = updateQuery2["contents.blog.portfolio.date"];
            updateQuery["contents.share.designer.contents"] = updateQuery2["contents.blog.portfolio.date"];
          } else {
            updateQuery["contents.share.client.contents"] = EMPTYDATE;
            updateQuery["contents.share.designer.contents"] = EMPTYDATE;
          }
        } else {
          updateQuery["contents.share.client.contents"] = EMPTYDATE;
          updateQuery["contents.share.designer.contents"] = EMPTYDATE;
        }

        tempArr.push(whereQuery);
        tempArr.push(updateQuery);
        tempArr.push(updateQuery2);

        finalArr.push(tempArr);
      }

      console.log(finalArr);

      for (let [ whereQuery, updateQuery, updateQuery2 ] of finalArr) {
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        await back.updateHistory("project", [ whereQuery, updateQuery2 ], { selfMongo: MONGOHISTORYC });
      }

      // await sheets.update_value_inPython(sheetsId, "총괄 시트", fixedMatrix, [ 0, 0 ]);

      */
      // Photo sheets to Photo console END ==============================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================
      // ================================================================================================================================================

      // const MONGOC = this.MONGOLOCALC;
      // const collection = "designerMatrix";
      // let matrixTong;
      // let whereQuery, updateQuery;
      //
      // matrixTong = await back.mongoRead(collection, {}, { selfMongo: MONGOC });
      // console.log(matrixTong);

      // for (let { desid } of matrixTong) {
      //   whereQuery = { desid };
      //   updateQuery = {};
      //   updateQuery["analytics"] = {
      //     region: [],
      //     tools: [],
      //     designMethod: [],
      //     designNumber: {
      //       min: 2,
      //       max: 3,
      //     },
      //     purchase: false,
      //     makeAble: [],
      //     construct: 1,
      //     style: {
      //       modern: 1,
      //       glam: 1,
      //       cozy: 1,
      //       antique: 1,
      //       natural: 1,
      //       minimum: 1,
      //     },
      //     personality: [],
      //     relation: "그냥 평범",
      //   };
      //
      //   await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { console: true });
      // }



      // let target = [
      //   {
      //     name: "서비스 가능 지역",
      //     column: "region",
      //     items: [
      //       "서울",
      //       "인천",
      //       "경기",
      //       "강원",
      //       "충청",
      //       "대전",
      //       "세종",
      //       "전라",
      //       "경상",
      //       "제주",
      //       "부산",
      //       "대구",
      //       "울산",
      //       "광주",
      //     ],
      //     multiple: true,
      //     type: "string",
      //   },
      //   {
      //     name: "디자인 기술",
      //     column: "tools",
      //     items: [
      //       "도면",
      //       "3D",
      //       "컨셉 보드",
      //       "제품 리스트",
      //     ],
      //     multiple: true,
      //     type: "string",
      //   },
      //   {
      //     name: "디자인 제안 방식",
      //     column: "designMethod",
      //     items: [
      //       "PPT",
      //       "SHEETS",
      //       "문서",
      //       "카톡",
      //       "전화",
      //     ],
      //     multiple: true,
      //     type: "string",
      //   },
      //   {
      //     name: "스타일링 횟수",
      //     column: "designNumber",
      //     items: [
      //       "2회",
      //       "3회",
      //       "4회",
      //       "5회",
      //       "6회",
      //       "7회",
      //       "8회",
      //     ],
      //     multiple: true,
      //     type: "range",
      //   },
      //   {
      //     name: "구매 대행 여부",
      //     column: "purchase",
      //     items: [
      //       "안 함",
      //       "진행",
      //     ],
      //     multiple: false,
      //     type: "boolean",
      //   },
      //   {
      //     name: "제작 가능",
      //     column: "makeAble",
      //     items: [
      //       "가구",
      //       "패브릭"
      //     ],
      //     multiple: true,
      //     type: "string",
      //   },
      //   {
      //     name: "시공 능력",
      //     column: "construct",
      //     items: [
      //       "1단계",
      //       "2단계",
      //       "3단계",
      //       "4단계",
      //     ],
      //     multiple: false,
      //     type: "number",
      //   },
      //   {
      //     name: "스타일 경향성",
      //     column: "style",
      //     items: [
      //       { name: "모던", column: "modern", range: [ 0, 10 ], type: "number" },
      //       { name: "글램", column: "glam", range: [ 0, 10 ], type: "number" },
      //       { name: "코지", column: "cozy", range: [ 0, 10 ], type: "number" },
      //       { name: "엔틱", column: "antique", range: [ 0, 10 ], type: "number" },
      //       { name: "내추럴", column: "natural", range: [ 0, 10 ], type: "number" },
      //       { name: "미니멈", column: "minimum", range: [ 0, 10 ], type: "number" },
      //     ],
      //     multiple: true,
      //     type: "object",
      //   },
      //   {
      //     name: "디자이너 성격",
      //     column: "personality",
      //     items: [
      //       "착함",
      //       "나쁨",
      //       "돈밝힘",
      //       "성실함",
      //       "게으름",
      //       "위험함",
      //       "쿨함"
      //     ],
      //     multiple: true,
      //     type: "string",
      //   },
      //   {
      //     name: "홈리에종 관계",
      //     column: "relation",
      //     items: [
      //       "매우 좋음",
      //       "그냥 평범",
      //       "좋지 않음",
      //     ],
      //     multiple: false,
      //     type: "string",
      //   }
      // ];
      // let matrix, temp;
      //
      // matrix = [];
      // temp = [ "" ];
      //
      // for (let i = 0; i < target[0].items.length; i++) {
      //   temp.push(" ");
      // }
      // matrix.push(temp);
      //
      // for (let obj of target) {
      //   temp = [];
      //   temp.push(obj.name);
      //   for (let i = 0; i < target[0].items.length; i++) {
      //     if (obj.items[i] !== undefined) {
      //       if (typeof obj.items[i] !== "string") {
      //         temp.push(obj.items[i].name);
      //       } else {
      //         temp.push(obj.items[i]);
      //       }
      //     } else {
      //       temp.push(" ");
      //     }
      //   }
      //   matrix.push(temp);
      // }
      //
      // console.log(matrix);
      // console.log(await ghostRequest(`updateSheets`, {
      //   id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
      //   values: matrix,
      // }));



      // const clients = await back.getClientsByQuery({}, { withTools: true, selfMongo: this.MONGOLOCALC });
      // const requestTong = clients.getRequestsTong();
      // let history;
      // let matrix, temp;
      // let arr;
      //
      // arr = [
      //   // { name: "8월", start: [ 2020, 6, 31 ], end: [ 2020, 8, 1 ] },
      //   // { name: "9월", start: [ 2020, 7, 31 ], end: [ 2020, 9, 1 ] },
      //   // { name: "10월", start: [ 2020, 8, 30 ], end: [ 2020, 10, 1 ] },
      //   // { name: "11월", start: [ 2020, 9, 31 ], end: [ 2020, 11, 1 ] },
      //   // { name: "12월", start: [ 2020, 10, 30 ], end: [ 2021, 0, 1 ] },
      //   // { name: "1월", start: [ 2020, 11, 31 ], end: [ 2021, 1, 1 ] },
      //   { name: "2월", start: [ 2021, 0, 31 ], end: [ 2021, 2, 1 ] },
      // ];
      //
      // for (let { name: sheetName, start, end } of arr) {
      //   matrix = [];
      //   matrix = [
      //     [ "성함", "아이디", "유출 이유", "유출 시점", "응대 기록 1", "응대 기록 2", "응대 기록 3", "응대 기록 4", "응대 기록 5", "응대 기록 6" ]
      //   ];
      //   for (let { name, cliid, request, analytics } of requestTong) {
      //     if (request.timeline.valueOf() > (new Date(start[0], start[1], start[2])).valueOf()) {
      //       if (request.timeline.valueOf() < (new Date(end[0], end[1], end[2])).valueOf()) {
      //         if (analytics.response.status.value === "드랍") {
      //           history = await back.getHistoryById("client", cliid, { selfMongo: this.MONGOLOCALC });
      //           temp = [];
      //           temp.push(name);
      //           temp.push(cliid);
      //           if (analytics.response.outreason.values.length > 0) {
      //             temp.push(analytics.response.outreason.values[0]);
      //           } else {
      //             temp.push('');
      //           }
      //           temp.push(analytics.response.outspot.value);
      //           temp.push(history.history.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           temp.push(history.space.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           temp.push(history.construct.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           temp.push(history.styling.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           temp.push(history.budget.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           temp.push(history.progress.replace(/\n/g, ' ').replace(/[\[\]\{\}\"\'\/\?]/g, ''));
      //           matrix.push(temp);
      //         }
      //       }
      //     }
      //   }
      //   console.log(await ghostRequest(`updateSheets`, {
      //     id: "1XaZDtPRCAxOYj7sTqZ-scrbQtjy9IKaHNFWJgyo7wtk",
      //     values: matrix,
      //     sheetName: sheetName,
      //     cleanView: true
      //   }));
      // }


      // ===============================================================================================================================================
      // Sheets to checkList ===========================================================================================================================
      // ===============================================================================================================================================
      /*

      const fileName = `${process.cwd()}/temp/rawMatrix.js`;

      const rawMatrix = await ghostRequest(`getSheets`, {
        id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
        range: "A1:S"
      });
      await fileSystem(`write`, [ fileName, JSON.stringify(rawMatrix, null, 2) ]);

      // const rawMatrix = JSON.parse(await fileSystem(`readString`, [ fileName ]));

      let matrix;
      let tempTong, max;
      let tong;
      let tempNum, orderNum;
      let from, to;
      let finalTong;

      tempTong = [];
      for (let arr of rawMatrix) {
        tempTong.push(arr.length);
      }

      tempTong.sort((a, b) => { return b - a; });
      max = tempTong[0];

      matrix = rawMatrix.map((arr) => {
        const count = max - arr.length;
        for (let i = 0; i < count; i++) {
          arr.push('');
        }
        return arr;
      });

      for (let arr of matrix) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].trim().length === 0) {
            arr[i] = '';
          }
        }
      }

      tong = [];
      tempNum = 0;
      for (let arr of matrix) {
        if (arr[0] === '-') {
          tong.push({
            column: arr[2],
            name: arr[5],
            items: [],
            index: tempNum,
          });
        }
        tempNum++;
      }

      console.log(tong);

      const arrToObj = function (arr) {
        const stylingTendencyToObj = function (items) {
          let newArr = [];
          let temp, tempObj;
          for (let i of items) {
            temp = i.split('_');
            tempObj = {};
            tempObj["name"] = temp[0];
            tempObj["column"] = temp[1];
            tempObj["range"] = [ 0, 10 ];
            tempObj["type"] = "number";
            newArr.push(tempObj);
          }
          return newArr;
        }
        const [ type, multiple, name, column, position ] = arr;
        let items_tong = arr.slice(5);
        let items;
        items = [];
        for (let i of items_tong) {
          if (i !== '') {
            items.push(i);
          }
        }
        if (items.length === 1 && (items[0] === "INT" || items[0] === "LONG TEXT")) {
          items = [];
        }
        if (column === "stylingTendency") {
          items = stylingTendencyToObj(items);
        }
        return { type, multiple: /true/gi.test(multiple), name, column, position, items };
      }

      for (let z = 0; z < tong.length; z++) {
        console.log(tong[z].column);
        from = tong[z].index + 1;
        if (z !== tong.length - 1) {
          to = tong[z + 1].index;
        } else {
          to = matrix.length;
        }
        for (let i = from; i < to; i++) {
          if (matrix[i][0] !== '' && matrix[i][0] !== ' ' && matrix[i][0] !== '-' && matrix[i][0] !== 'null') {
            console.log(arrToObj(matrix[i]));
            tong[z].items.push(arrToObj(matrix[i]));
          }
        }
        console.log(`================`);
      }

      finalTong = {};
      for (let obj of tong) {
        finalTong[obj.column] = obj;
        delete obj.index;
        delete obj.column;
      }

      await fileSystem(`write`, [ `${process.cwd()}/temp/checkListFinalTong.js`, JSON.stringify(finalTong, null, 2) ]);


      console.log(finalTong);
      shell.exec(`atom ${process.cwd()}/temp/checkListFinalTong.js`);

      */



      // const designers = await this.MONGOC.db(`miro81`).collection(`designer`).find({}).toArray();
      // let whereQuery, updateQuery;
      // let dummy = {
      //   region: {
      //     available: [ "서울", "경기" ],
      //     transportation: {
      //       method: "자동차",
      //       expenses: {
      //         actual: {
      //           boo: true
      //         },
      //         unit: {
      //           boo: true,
      //           amount: 0,
      //         }
      //       },
      //     },
      //   },
      //   meeting: {
      //     measure: {
      //       direct: false,
      //       furniture: false,
      //     },
      //     team: false,
      //     style: "철저한 준비",
      //   },
      //   project: {
      //     index: false,
      //     budget: {
      //       resultOffer: false,
      //       method: "문서",
      //     },
      //     time: {
      //       first: 7,
      //       entire: 30,
      //     },
      //     paperWork: [],
      //     communication: {
      //       method: "대면",
      //       count: 0,
      //     },
      //     retouch: {
      //       partial: 3,
      //       entire: 4
      //     }
      //   },
      //   construct: {
      //     level: 1,
      //     possible: {
      //       supervision: false,
      //       partialSupervision: false,
      //       others: false
      //     },
      //     contract: {
      //       method: "협업사 계약",
      //       othersFinishing: "해당 없음",
      //       communication: "",
      //     }
      //   },
      //   styling: {
      //     level: 1,
      //     method: "순차 제안",
      //     tendency: {
      //       style: {
      //         modern: 0,
      //         glam: 0,
      //         antique: 0,
      //         natural: 0,
      //         minimum: 0,
      //         vintage: 0,
      //         feminine: 0,
      //         exotic: 0,
      //       },
      //       texture: {
      //         darkWood: 0,
      //         whiteWood: 0,
      //         coating: 0,
      //         metal: 0
      //       },
      //       color: {
      //         darkWood: 0,
      //         whiteWood: 0,
      //         highContrast: 0,
      //         vivid: 0,
      //         white: 0,
      //         mono: 0
      //       },
      //       density: {
      //         maximun: 0,
      //         minimum: 0,
      //       }
      //     },
      //     furniture: {
      //       builtin: false,
      //       design: false
      //     },
      //     fabric: {
      //       manufacture: false,
      //       method: "업체 연결",
      //     }
      //   },
      //   purchase: {
      //     agencies: {
      //       boo: false,
      //       fee: 0,
      //     },
      //     setting: {
      //       takeIn: false,
      //       install: true,
      //       storage: true,
      //       detail: "해당 없음",
      //     },
      //     detail: "",
      //   },
      //   etc: {
      //     matrix: [],
      //     operationBudget: {
      //       min: 5000000,
      //       max: 10000000
      //     },
      //     personality: {
      //       fast: true,
      //       careful: true,
      //       lead: true
      //     },
      //     relation: "확인중"
      //   }
      // };
      //
      //
      // for (let obj of designers) {
      //   whereQuery = { desid: obj.desid };
      //   updateQuery = { analytics: JSON.parse(JSON.stringify(dummy)) };
      //   await this.MONGOC.db(`miro81`).collection(`designer`).updateOne(whereQuery, { $set: updateQuery });
      //   console.log(obj.desid);
      // }



      // const app = await report.getDesignerProposalReport({ selfMongo: this.MONGOLOCALC });
      // console.log(app);
      // console.log(app.matrix);



      // const { mongo, mongoconsoleinfo } = this.mother;
      // const MONGOC = new mongo(mongoconsoleinfo);
      // const designers = await back.getDesignersByQuery({});
      // let whereQuery, updateQuery;
      // await MONGOC.connect();
      // for (let d of designers) {
      //   await MONGOC.db(`miro81`).collection(`designerHistory`).updateOne({ desid: d.desid }, { $set: { needs: "" } });
      //   console.log(`${d.desid} done`);
      // }
      // MONGOC.close();

      // const designerRequest = ghostRequest().bindPath("designer");
      // console.log(await designerRequest("folder", { id: [ "d2004_aa02s", "d1911_aa02s" ] }));






      /*
      // ALIMTALK

      const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
      const kakao = new KakaoTalk();
      await kakao.ready();
      const method = "designerCheckList";
      const designers = await back.getDesignersByQuery({});

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



      */




      //CALENDAR to mongo
      /*
      const targetProjects = await back.getProjectsByQuery({ $and: [ { "desid": { $regex: "^d" } }, { "process.status": { $regex: "^[진완]" } }, { "process.contract.meeting.date": { $lte: new Date(2000, 0, 1) } } ] }, { selfMongo: this.MONGOC });
      let targetProidArr = [];
      for (let { proid } of targetProjects) {
        targetProidArr.push(proid);
      }

      const calendar = new GoogleCalendar();
      await calendar.ready();

      const allEvents = await calendar.listEvents("designerMeeting");
      let temp, tempArr, tempObj;
      let refinedArr;
      let thisProjects, thisProject;
      let whereQuery, updateQuery;
      let tempMeetingDate;
      let targetObj;

      tempMeetingDate = new Map();

      for (let { title, date: { start } } of allEvents) {
        temp = title.replace(/[^가-힣]/gi, '_');
        for (let i = 0; i < 30; i++) {
          temp = temp.replace(/__/gi, '_');
        }
        temp = temp.replace(/^_/g, '').replace(/_$/g, '').trim();
        tempArr = temp.split('_');
        refinedArr = [];
        for (let i of tempArr) {
          if (!/현장/g.test(i) && !/미팅/g.test(i) && !/세팅/g.test(i) && !/셋팅/g.test(i) && i.length > 1 && !/점검/g.test(i) && !/실측/g.test(i) && !/변경예정/g.test(i) && !/다시잡아야/g.test(i) && !/이기석/g.test(i) && !/원중희/g.test(i) && !/최호식/g.test(i) && !/유창민/g.test(i)) {
            refinedArr.push(i);
          }
        }
        thisProjects = await back.getProjectsByNames(refinedArr, { selfMongo: this.MONGOC });
        if (thisProjects.length === 1) {
          thisProject = thisProjects[0];
          whereQuery = { proid: thisProject.proid };
          updateQuery = {};
          updateQuery["process.contract.meeting.date"] = start;
          if (targetProidArr.includes(thisProject.proid)) {
            await back.updateProject([ whereQuery, updateQuery ], { selfMongo: this.MONGOC });
          }
        } else if (thisProjects.length > 1) {
          if (tempMeetingDate.get(thisProjects[0].proid) === undefined || tempMeetingDate.get(thisProjects[0].proid) === null) {
            tempMeetingDate.set(thisProjects[0].proid, {
              date: [ start ],
              projects: thisProjects
            });
          } else {
            tempObj = tempMeetingDate.get(thisProjects[0].proid);
            tempObj.date.push(start);
          }
        }
      }

      for (let i of tempMeetingDate) {
        targetObj = i[1];
        targetObj.date.sort((a, b) => {
          return b.valueOf() - a.valueOf();
        });
        targetObj.projects.sort((a, b) => {
          return b.proposal.date.valueOf() - a.proposal.date.valueOf();
        });

        for (let j = 0; j < targetObj.projects.length; j++) {
          whereQuery = { proid: targetObj.projects[j].proid };
          updateQuery = {};
          updateQuery["process.contract.meeting.date"] = targetObj.date[j];
          if (targetProidArr.includes(targetObj.projects[j].proid)) {
            await back.updateProject([ whereQuery, updateQuery ], { selfMongo: this.MONGOC });
          }
        }
      }

      */


      // const axios = require('axios');
      // const FormData = require('form-data');
      // const fs = require('fs');
      //
      // let form = new FormData();
      //
      // form.append('my_file', fs.createReadStream('/Users/baechang-gyu/Downloads/back.jpg'));
      //
      // let formHeaders = form.getHeaders();
      //
      // axios.post('http://172.30.1.58:3001/api/upload', form, { headers: { ...formHeaders } }).then(function (response) {
      //   console.log(response.data);
      // }).catch(function (error) {
      //   console.log(error);
      //   console.log("error");
      // });



      // await work.setProposalToClient("cron", { selfMongo: this.MONGOC });

      // const clients = await this.MONGOC.db(`miro81`).collection(`client`).find({}).toArray();
      // let updateQuery, whereQuery;
      //
      // for (let client of clients) {
      //   whereQuery = { cliid: client.cliid };
      //   for (let i = 0; i < client.requests.length; i++) {
      //     if (client.requests[i].proposal !== undefined) {
      //       updateQuery = { "$unset": {} };
      //       updateQuery["$unset"]["requests." + String(i) + ".proposal"] = "";
      //       console.log(whereQuery, updateQuery);
      //       // await this.MONGOC.db(`miro81`).collection(`client`).updateOne(whereQuery, updateQuery);
      //     }
      //   }
      // }





      //get files S3
      /*
      const S3HOST = require(`${process.cwd()}/apps/infoObj.js`).s3info.host;
      const targetDir = process.env.HOME + "/static";
      let getS3;
      let temp, tempArr;
      let listImageTong, originalTong;
      let tong;
      let binaryTarget = [];
      let tempObject;
      let ghostTong;

      //list image
      getS3 = await this.mother.s3FileList("corePortfolio/listImage");
      tong = [];
      for (let i of getS3) {
        tempArr = i.split("/");
        if (tempArr.length > 2) {
          if (tempArr[2] !== "" && tempArr[2] !== "__delete__") {
            tong.push(tempArr[2]);
          }
        }
      }
      listImageTong = Array.from(new Set(tong));
      console.log(listImageTong);

      //original photo
      getS3 = await this.mother.s3FileList("corePortfolio/original");
      tong = [];
      for (let i of getS3) {
        tempArr = i.split("/");
        if (tempArr.length > 2) {
          if (tempArr[2] !== "" && tempArr[2] !== "__delete__") {
            tong.push(tempArr[2]);
          }
        }
      }
      originalTong = Array.from(new Set(tong));
      console.log(originalTong);

      shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio;`);
      shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio/listImage;`);
      shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio/original;`);
      for (let pid of listImageTong) {
        shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio/listImage/${pid};`);
        shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio/listImage/${pid}/mobile;`);
      }
      for (let pid of originalTong) {
        shell.exec(`mkdir ${shellLink(targetDir)}/corePortfolio/original/${pid};`);
      }

      getS3 = await this.mother.s3FileList("corePortfolio");
      binaryTarget = [];
      for (let i of getS3) {
        if (/\.[^\.]+$/i.test(i) && !/__delete__/gi.test(i) && !/DS_Store/gi.test(i)) {
          binaryTarget.push(i);
        }
      }
      for (let b of binaryTarget) {
        tempObject = await binaryRequest(S3HOST + "/" + b);
        await fileSystem(`writeBinary`, [ targetDir + "/" + b, tempObject ]);
        console.log(`binary "${b}" download done`);
      }

      //designer ghost
      getS3 = await this.mother.s3FileList("rawDesigner/ghost");

      shell.exec(`mkdir ${shellLink(targetDir)}/rawDesigner;`);
      shell.exec(`mkdir ${shellLink(targetDir)}/rawDesigner/ghost;`);

      tong = [];
      for (let i of getS3) {
        tempArr = i.split("/");
        if (tempArr.length > 2) {
          if (tempArr[2] !== "" && tempArr[2] !== "__delete__") {
            tong.push(tempArr[2]);
          }
        }
      }
      ghostTong = Array.from(new Set(tong));
      console.log(ghostTong);

      for (let id of ghostTong) {
        shell.exec(`mkdir ${shellLink(targetDir)}/rawDesigner/ghost/${id};`);
      }

      getS3 = await this.mother.s3FileList("rawDesigner");
      binaryTarget = [];
      for (let i of getS3) {
        if (/\.[^\.]+$/i.test(i) && !/__delete__/gi.test(i) && !/DS_Store/gi.test(i)) {
          binaryTarget.push(i);
        }
      }
      for (let b of binaryTarget) {
        tempObject = await binaryRequest(S3HOST + "/" + b);
        await fileSystem(`writeBinary`, [ targetDir + "/" + b, tempObject ]);
        console.log(`binary "${b}" download done`);
      }

      //profile photos
      getS3 = await this.mother.s3FileList("etcPhotos/memberProfile");
      shell.exec(`mkdir ${shellLink(targetDir)}/etcPhotos;`);
      shell.exec(`mkdir ${shellLink(targetDir)}/etcPhotos/memberProfile;`);

      getS3 = await this.mother.s3FileList("etcPhotos");
      binaryTarget = [];
      for (let i of getS3) {
        if (/\.[^\.]+$/i.test(i) && !/__delete__/gi.test(i) && !/DS_Store/gi.test(i)) {
          binaryTarget.push(i);
        }
      }
      for (let b of binaryTarget) {
        tempObject = await binaryRequest(S3HOST + "/" + b);
        await fileSystem(`writeBinary`, [ targetDir + "/" + b, tempObject ]);
        console.log(`binary "${b}" download done`);
      }



      */


      const ghostMap = {
        name: "ghostMap",
        process: [
          {
            name: "프로젝트 시작 전",
            process: [
              {
                client: {
                  name: "서비스 안내서",
                  composition: {
                    contents: [
                      "적합한 서비스 명시",
                      "해당 서비스 프로세스 설명",
                      "일반적인 홈스타일링 설명",
                      "리모델링보다 나은 이유",
                      "셀프 인테리어보다 나은 이유"
                    ]
                  }
                },
                designer: null
              },
              {
                client: {
                  name: "디자이너 제안서",
                  composition: {
                    contents: [
                      "서비스 종류",
                      "고객 기본 정보",
                      "디자이너 포트폴리오 사진 구성",
                      "디자이너의 간단 설명글",
                      "디자이너 기본 사항 (체크리스트)",
                      "디자이너 스타일링 정보",
                      "디자이너 금액",
                      "프로세스 기본 계약 사항"
                    ]
                  }
                },
                designer: null
              },
              {
                client: {
                  name: "계약금 안내",
                  composition: {
                    contents: [
                      "홈리에종 정산 방식 안내",
                      "잔금 및 계약금 구성 안내",
                      "계약금 입금 방식 안내",
                      "계약금 주의 사항 안내"
                    ]
                  }
                },
                designer: {
                  name: "홈스타일링 의뢰서",
                  composition: {
                    contents: [
                      "현장 미팅 일자",
                      "현장 미팅 장소 정보",
                      "해당 서비스 종류 정보",
                      "고객 기본 정보",
                      "해당 현장 정보",
                      "서비스 정보",
                      "홈리에종 응대 / 요청사항",
                      "서비스비 안내",
                      "고객 안내 사항",
                      "시공 연계수수료 안내",
                      "정산 안내"
                    ]
                  }
                }
              },
              {
                client: {
                  name: "현장 미팅 안내서",
                  composition: {
                    contents: [
                      "현장 미팅 일자",
                      "현장 미팅 장소 정보",
                      "실측 안내",
                      "현장 체크 안내",
                      "현장 미팅시 제안 범위 안내",
                      "디자이너 변경시 안내",
                    ]
                  }
                },
                designer: {
                  name: "현장 미팅 체크리스트",
                  composition: {
                    contents: [
                      "현장 미팅 일자",
                      "현장 미팅 장소 정보",
                      "실측 체크리스트"
                      "공정별 현장 체크리스트"
                    ]
                  }
                }
              },
              {
                client: {
                  name: "잔금 안내 및 스타일링 계약서",
                  composition: {
                    contents: [
                      "홈리에종 정산 방식 안내",
                      "잔금 금액 및 구성 안내",
                      "잔금 입금 방식 안내",
                      "잔금 주의 사항 안내",
                      "인테리어 전체 예산 구성 안내",
                      "시공사 안내",
                    ]
                  }
                },
                designer: null
              },
            ]
          },
          {
            name: "프로젝트 진행 중",
            process: [
              {
                client: {
                  name: "디자인 진행 안내문",
                  composition: {
                    contents: [
                      "전체 컨셉",
                      "각 공간별 활용 계획",
                      "각 공간별 마감 제안",
                      "각 공간별 레이아웃",
                      "각 공정별 시공 운영 계획",
                      "전체 예산 계획",
                      "제품 리스트 제공 안내",
                      "페이퍼 워크 제공 안내",
                    ]
                  }
                },
                designer: {
                  name: "디자인 체크리스트",
                  composition: {
                    contents: [
                      "전체 컨셉",
                      "각 공간별 활용 계획",
                      "전체 예산 계획",
                      "전체 예산 계획서 폼, 가이드"
                    ]
                  }
                }
              },
              {
                client: {
                  name: "시공 안내문",
                  composition: {
                    contents: [
                      "해당 현장 필요 시공 리스트",
                      "각 공정별 절차 안내",
                      "각 공정별 비용 안내",
                      "각 공정별 기간 안내",
                      "시공 스케줄표",
                    ]
                  }
                },
                designer: {
                  name: "시공 체크리스트",
                  composition: {
                    contents: [
                      "해당 현장 필요 시공 리스트",
                      "각 공정별 체크리스트",
                      "시공 견적서",
                      "시공 스케줄표",
                    ]
                  }
                }
              },
              {
                client: {
                  name: "제작 제품 안내문",
                  composition: {
                    contents: [
                      "제작 제품 구성 - 빌트인, 가구, 패브릭",
                      "제작 제품 이점 안내",
                      "해당 현장 필요 제작 리스트",
                      "제작 제품 절차 안내",
                      "제작 제품 비용 안내",
                      "제작 제품 기간 안내",
                      "제작 제품 스케줄표",
                    ]
                  }
                },
                designer: {
                  name: "제작 제품 체크리스트",
                  composition: {
                    contents: [
                      "해당 현장 필요 제작 리스트",
                      "제작 제품 종류별 체크리스트",
                      "제작 제품 견적서",
                      "제작 제품 스케줄표"
                    ]
                  }
                }
              },
              {
                client: {
                  name: "구매 및 세팅 안내문",
                  composition: {
                    contents: [
                      "해당 현장 구매 목록 링크 리스트",
                      "설치 및 조립 서비스 제공 안내",
                      "부가 서비스 제공 안내",
                      "세팅 가이드 및 세팅 일정 안내",
                      "구매 및 세팅 전체 스케줄표"
                    ]
                  }
                },
                designer: {
                  name: "구매 및 세팅 체크리스트",
                  composition: {
                    contents: [
                      "해당 현장 구매 목록 입력기",
                      "설치 및 조립 서비스 제공 가이드",
                      "부가 서비스 제공 가이드",
                      "구매 및 세팅 스케줄 조정"
                    ]
                  }
                }
              },
            ]
          },
          {
            name: "프로젝트 마무리",
            process: [
              {
                client: {
                  name: "촬영 안내서",
                  composition: {
                    contents: [
                      "촬영 종류 및 범위 안내",
                      "촬영 범위에 따른 동의 항목 체크",
                      "촬영 스케줄 조정",
                      "촬영 스케줄표"
                    ]
                  }
                },
                designer: {
                  name: "촬영 안내서",
                  composition: {
                    contents: [
                      "홈리에종 촬영 안내",
                      "촬영시 세팅 안내",
                      "촬영 스케줄표",
                      "원본 사진 구매 및 제공 안내"
                    ]
                  }
                }
              },
              {
                client: {
                  name: "프로젝트 마무리",
                  composition: {
                    contents: [

                    ]
                  }
                },
                designer: {
                  name: "프로세스 정산 안내",
                  composition: {
                    contents: [

                    ]
                  }
                }
              },
            ]
          }
        ]
      };


      // const fileRequest = ghostRequest().bind("file");
      // const base = this.address.homeinfo.ghost.file.static;
      // const response = await fileRequest("readDir", { target: `${base}/rawDesigner/ghost` });
      // console.log(response);







      // TOOLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


      // get sheets

      // console.log(await ghostRequest(`getSheets`, {
      //   id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
      //   range: "A1:D2"
      // }));


      // update sheets

      // console.log(await ghostRequest(`updateSheets`, {
      //   id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
      //   values: [ [ "안녕?", "안녕?", "안녕?", "안녕?", ], [ "안녕?", "안녕?", "안녕?", "안녕?", ] ],
      //   cleanView: true
      // }));


      // naverBlog to json

      // const blog = new NaverBlogParsing();
      // await blog.blogToJson();


      // parsingHangul

      // const hangul = new ParsingHangul();
      // hangul.fixDir("/home/homeliaison/samba/photo");
      // hangul.fixDir("/home/homeliaison/samba/drive");
      // hangul.fixDir("/home/homeliaison/samba/drive/HomeLiaisonServer");
      // hangul.fixDir("/home/homeliaison/samba/drive/HomeLiaisonServer/영상");

      // spawn catfish

      // const app = new SpawnCatfish();
      // await app.spawnLaunching(false);

      // contents upload

      // const client = "김지연";
      // const pid = "p88";
      // const rid = "re082";
      // const links = [
      //   "https://docs.google.com/document/d/1jpDXD3V-ZMO2mLGCIqT_PTB4ADM-0EbPs6-7OFOs9Kk/edit?usp=sharing",
      //   "https://docs.google.com/document/d/1iybVqD90cYLW9eSz-lSSQlGt8lKN4ik3j6_ZOSKcSpI/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/1cRFP2P6hEDMYbA-9nvSNefw0ica2akgA?usp=sharing",
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


      // card setting

      // await this.mother.slack_bot.chat.postMessage({ text: "김정운 고객님의 카드 세팅을 완료하였습니다!", channel: "#400_customer" });

      // kakao token

      // const app = new KakaoTalk();
      // await app.generateToken();

      // contents backup

      // const MONGOC = this.MONGOC;
      // const contents = await MONGOC.db(`miro81`).collection(`contents_backup`).find({}).toArray();
      // for (let c of contents) {
      //   await MONGOC.db(`miro81`).collection(`contents`).insertOne(c);
      // }

      // addtional photo repair

      // const filter = new PortfolioFilter();
      // await filter.additionalRepair("p88", 10);

      // raw photo to raw portfolio

      // const filter = new PortfolioFilter();
      // await filter.rawToRaw([
      //   {
      //     client: "김정운",
      //     designer: "김다래",
      //     pid: "p106",
      //     link: "https://drive.google.com/drive/folders/1vN6tDwrT5TttpSQR8lqxat6ZwbhYZMuJ",
      //   },
      // ]);


      // get photo folder
      // const drive = new GoogleDrive();
      // await drive.get_folder("https://drive.google.com/drive/folders/14YT3OCACvbGJMwHNHpCS8eP-Cd_1wKxe");


      // aspirant to designer
      // const nameList = [
      //   [ "박선영", "2021-03-23" ],
      // ];
      // const stringToDate = function (str) {
      //   let temp = str.split('-');
      //   return new Date(Number(temp[0]), Number(temp[1].replace(/^0/g, '')) - 1, Number(temp[2].replace(/^0/g, '')));
      // }
      //
      // let whereQuery, updateQuery;
      // let aspirants, aspirant;
      // let aspidArr;
      //
      // aspidArr = [];
      // for (let [ name, contractDay ] of nameList) {
      //   whereQuery = { designer: name };
      //   aspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: this.MONGOC });
      //   aspirant = aspirants[0];
      //   aspidArr.push({ aspid: aspirant.aspid, contract: stringToDate(contractDay) });
      // }
      // await work.aspirantToDesigner(aspidArr, { selfMongo: this.MONGOC });


      //send checklist alimtalk
      // const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
      // const kakao = new KakaoTalk();
      // await kakao.ready();
      // const method = "designerCheckList";
      // const designers = await back.getDesignersByQuery({ desid: "d2103_aa21s" });
      //
      // const today = new Date();
      // const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
      // let expiredString = '';
      // let targetDesigners = [];
      // let tempObj;
      // let middleDate, deadDate;
      // let rows;
      //
      // if (today.getDay() !== 0 && today.getDay() !== 6) {
      //   //pyeong-day
      //   today.setDate(today.getDate() + 7);
      // } else {
      //   if (today.getDay() !== 0) {
      //     //saturday
      //     today.setDate(today.getDate() + 9);
      //   } else {
      //     //sunday
      //     today.setDate(today.getDate() + 8);
      //   }
      // }
      //
      // expiredString += String(today.getMonth() + 1) + "월";
      // expiredString += " ";
      // expiredString += String(today.getDate()) + "일";
      // expiredString += " ";
      // expiredString += dayArr[today.getDay()] + "요일";
      // expiredString += " ";
      // expiredString += String(14) + "시";
      //
      // for (let d of designers) {
      //   if (/완료/gi.test(d.information.contract.status.value)) {
      //     targetDesigners.push({ desid: d.desid, designer: d.designer, phone: d.information.phone });
      //   }
      // }
      //
      // middleDate = new Date();
      // middleDate.setHours(middleDate.getHours() + 8);
      // deadDate = new Date();
      // deadDate.setDate(deadDate.getDate() + 9);
      //
      // for (let { desid, designer, phone } of targetDesigners) {
      //   console.log(method, designer, phone);
      //   console.log(expiredString, ADDRESS.homeinfo.ghost.host, desid);
      //   rows = await back.mongoRead("deadline", { name: "designerCheckList_" + desid }, { console: true });
      //   if (rows.length > 0) {
      //     await back.mongoUpdate("deadline", [ { name: "designerCheckList_" + desid }, { deadline: deadDate, middleline: middleDate } ], { console: true });
      //   } else {
      //     await back.mongoCreate("deadline", { deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid }, { console: true });
      //   }
      //   await kakao.sendTalk(method, designer, phone, {
      //     date: expiredString,
      //     host: ADDRESS.homeinfo.ghost.host,
      //     desid: desid,
      //   });
      // }


      // etc tools

      // await this.spellCheck("p88");
      // await this.getGoogleWriteJson();
      // await this.googlePythonTest();
      // await this.deletePorfolio("p60");
      // await this.deletePorfolioWithReview("p64", "re059");

    } catch (e) {
      console.log(e);
    } finally {
      this.MONGOC.close();
      this.MONGOLOCALC.close();
      console.log(`done`);
    }
  }

}

module.exports = DevContext;
