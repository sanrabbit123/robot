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

class DevContext extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo, mongolocalinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
    const { fileSystem, shell, shellLink, s3FileUpload, requestSystem, curlSystem, ghostRequest, mysqlQuery } = this.mother;
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
      // const MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
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

      // ASPIRANT TO DESIGNER

      const nameList = [
        [ "박정훈", "2021-03-03" ],
        [ "손병준", "2021-03-03" ],
        [ "윤보라", "2021-03-03" ],
        [ "이한솔", "2021-03-03" ],
        [ "이지영", "2021-03-03" ],
        [ "류상현", "2021-03-03" ],
        [ "정민재", "2021-03-05" ],
        [ "최문형", "2021-03-05" ],
        [ "김현영", "2021-03-08" ],
        [ "전진화", "2021-03-08" ],
        [ "이정아", "2021-03-08" ],
        [ "강주현", "2021-03-08" ],
        [ "왕지연", "2021-03-08" ],
        [ "호지희", "2021-03-11" ],
        [ "한채은", "2021-03-12" ],
        [ "조원숙", "2021-03-12" ],
        [ "권미정", "2021-03-12" ],
        [ "서한수", "2021-03-12" ],
        [ "김윤진", "2021-03-12" ],
        [ "김상화", "2021-03-17" ],
      ];
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
        // await kakao.sendTalk(method, designer, phone, {
        //   date: expiredString,
        //   host: ADDRESS.homeinfo.ghost.host,
        //   desid: desid,
        // });
      }

      await kakao.sendTalk(method, "배창규", "010-2747-3403", {
        date: expiredString,
        host: ADDRESS.homeinfo.ghost.host,
        desid: "d1701_aa01s",
      });

      */


      // const drive = new GoogleDrive();
      // console.log(await drive.get_folder("https://drive.google.com/drive/folders/1Q3SgaM4Yp-59ne720tV0eQg1hdEFK7av"));


      // TOOLS =========================================================================================================================================


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

      // const client = "이희윤";
      // const pid = "p87";
      // const rid = "re081";
      // const links = [
      //   "https://docs.google.com/document/d/1fn5bhPaqgL8m7GJ8eiW4khznz9YCdjHWxm4lxWgO2as/edit?usp=sharing",
      //   "https://docs.google.com/document/d/1YHrCm_CmFr2qwKJIbnzprNdfCkfSvCKS35QG21-jcQc/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/1LK96is7wYn4PGtajU08a9BEJsM2VTjq4?usp=sharing",
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

      //addtional photo repair

      // const filter = new PortfolioFilter();
      // await filter.addtionalRepair("p87", 3);

      //raw photo to raw portfolio

      // const filter = new PortfolioFilter();
      // await filter.rawToRaw([
      //   {
      //     client: "김정운",
      //     designer: "김다래",
      //     pid: "p106",
      //     link: "https://drive.google.com/drive/folders/1vN6tDwrT5TttpSQR8lqxat6ZwbhYZMuJ",
      //   },
      // ]);

      // etc tools

      // await this.spellCheck("p87");
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
