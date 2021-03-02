const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
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

  async deletePorfolio(porlid) {
    let a, b;

    a = `DELETE FROM porlist WHERE porlid = '${porlid}';`;
    await this.MONGOC.db("miro81").collection("FP1_porlist").deleteOne({ porlid: porlid });

    b = `DELETE FROM pordeta WHERE porlid = '${porlid}';`;
    await this.MONGOC.db("miro81").collection("FP2_pordeta").deleteOne({ porlid: porlid });

    let result = (a + b);
    console.log(result);
    return result;
  }

  async deletePorfolioWithReview(porlid, revid) {
    let a, b, c, d;

    a = `DELETE FROM porlist WHERE porlid = '${porlid}';`;
    await this.MONGOC.db("miro81").collection("FP1_porlist").deleteOne({ porlid: porlid });

    b = `DELETE FROM pordeta WHERE porlid = '${porlid}';`;
    await this.MONGOC.db("miro81").collection("FP2_pordeta").deleteOne({ porlid: porlid });

    c = `DELETE FROM revlist WHERE revid = '${revid}';`;
    await this.MONGOC.db("miro81").collection("FR1_revlist").deleteOne({ revid: revid });

    d = `DELETE FROM revdeta WHERE revid = '${revid}';`;
    await this.MONGOC.db("miro81").collection("FR2_revdeta").deleteOne({ revid: revid });

    let result = (a + b + c + d);
    console.log(result);
    return result;
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
    const { fileSystem, shell, shellLink, s3FileUpload } = this.mother;
    try {
      await this.MONGOC.connect();
      await this.MONGOLOCALC.connect();
      const back = new BackMaker();


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



      // const clients = await back.getClientsByQuery({}, { withTools: true, fromLocal: true });
      // const projects = await back.getProjectsByQuery({}, { fromLocal: true });
      // const cases = clients.getType().getTypeCases(projects);
      // for (let c of cases) {
      //   console.log(c);
      // }



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
        "SDGothicNeoa-iHv",
      ];

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

        for (let i = 0; i < text.length; i++) {
          this_ai = app.activeDocument;
          from = "general";
          to = "method" + String(targetIndex) + "_word" + String(i);
          contents = text[i];
          this.setCreateSetting({ from: from, to: to, exception: {
            font: fontTargetList[targetIndex]
          }});
          this.setParagraph({ from: contents, to: to });
          temp = this.createElements(this_ai, this.createSetting[to]);
          temp = temp.createOutline();
          if (temp.height > 0) {
            temp.remove();
            contents = "궜흖" + text[i];
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



      // const hangul = new ParsingHangul();
      // const total = require(`${process.cwd()}/apps/parsingHangul/library/total.js`);
      // const target = `${process.env.HOME}/tempTarget`;
      // const targetDir_raw = await fileSystem(`readDir`, [ `${target}` ]);
      // let targetDir, targetIndex;
      // let optimizer;
      // let finalObj;
      // let totalArr, svgWordingObj, targetKeys;
      // let indexKeys, meanings, tempArr, resultObj;
      // let wordingsFileName;
      //
      // for (let targetIndex = 0; targetIndex < 7; targetIndex++) {
      //   targetDir = [];
      //   for (let i of targetDir_raw) {
      //     if (i !== `.DS_Store`) {
      //       if ((new RegExp("^method" + String(targetIndex))).test(i)) {
      //         targetDir.push(target + "/" + i);
      //       }
      //     }
      //   }
      //
      //   optimizer = new SvgOptimizer(targetDir);
      //   optimizer.setDcimal(3);
      //   finalObj = await optimizer.launching();
      //   wordingsFileName = `${target}/result/method${String(targetIndex)}_wordings.js`;
      //
      //   await fileSystem(`write`, [ wordingsFileName, JSON.stringify(finalObj, null, 2) ]);
      //
      //   totalArr = total.split('');
      //   svgWordingObj = JSON.parse(await fileSystem(`readString`, [ wordingsFileName ]));
      //   targetKeys = Object.keys(svgWordingObj);
      //
      //   indexKeys = [];
      //   meanings = [];
      //   for (let i of targetKeys) {
      //     tempArr = i.split("_");
      //     indexKeys.push(Number(tempArr[1].replace(/[^0-9]/gi, '')))
      //     meanings.push('c' + String(totalArr[Number(tempArr[1].replace(/[^0-9]/gi, ''))].charCodeAt()))
      //   }
      //
      //   resultObj = {};
      //   for (let i = 0; i < meanings.length; i++) {
      //     resultObj[meanings[i]] = svgWordingObj[targetKeys[i]];
      //   }
      //
      //   wordingsFileName = `${target}/result/method${String(targetIndex)}_final.js`;
      //   await fileSystem(`write`, [ wordingsFileName, JSON.stringify(resultObj, null, 2) ]);
      //   console.log(resultObj);
      // }

      // TOOLS =========================================================================================================================================

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

      // const client = "정승희";
      // const pid = "p85";
      // const rid = "re079";
      // const links = [
      //   "https://docs.google.com/document/d/1b6YMA4UgSc-UFnabxByvft_24tJhZH5-VDcb7iuU8cQ/edit?usp=sharing",
      //   "https://docs.google.com/document/d/1bVxvMqfiCyD__Ux2-w0L04SQG4kUm-6LEtd4atFx5lY/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/1X_bX-JPySUZ1Ri2rd4EKa6ezW-jp3_Pc?usp=sharing",
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
      // await filter.addtionalRepair("p85", 6);

      // etc tools

      // await this.spellCheck("p85");
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
