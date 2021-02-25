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

      // const sheets = new GoogleSheet();
      // const sheetsId = "1yyBGnVXfmu9maQWxXs4-_ngDwefdzmqzTp9NYyI6CGw";
      // const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      // const ABC = [];
      // for (let i of alphabet) { ABC.push(i); }
      // for (let i of alphabet) { for (let j of alphabet) { ABC.push(i + j); } }
      // const targetInfo = {
      //   client: {
      //     name: "응대중 고객 현황",
      //     startPoint: [ 0, 6 ],
      //     endPoint: [ 11, 77 ],
      //     columns: [
      //       "cliid",
      //       "important",
      //       "name",
      //       "status",
      //       "action",
      //       "latest",
      //       "kakao",
      //
      //
      //     ]
      //   },
      //   project: {
      //     name: "프로젝트케어",
      //     startPoint: [],
      //   },
      //   drop: {
      //     name: "드랍 고객 관리",
      //     startPoint: [],
      //   }
      // };
      // const rangeMaker = function (key) {
      //   let str = '';
      //   str += targetInfo[key].name + '!';
      //   str += ABC[targetInfo[key].startPoint[0]] + String(targetInfo[key].startPoint[1] + 1);
      //   str += ':';
      //   str += ABC[targetInfo[key].endPoint[0]] + String(targetInfo[key].endPoint[1] + 1);
      //   return str;
      // }
      // let temp, tong;
      //
      // tong = await sheets.get_value_inPython(sheetsId, rangeMaker("client"));
      // console.log(tong);


      // let whereQuery, updateQuery;
      //
      // for (let d of designers) {
      //   if (d.portfolio.length > 0) {
      //     whereQuery = { aspid: d.aspid };
      //     for (let i = 0; i < d.portfolio.length; i++) {
      //       updateQuery = {};
      //       updateQuery["portfolio." + String(i) + ".confirm"] = [];
      //       await this.MONGOC.db(`miro81`).collection(`aspirant`).updateOne(whereQuery, { "$set": updateQuery });
      //     }
      //   }
      // }



      /*

      const reflection = new MongoReflection();
      await reflection.ultimateReflection();

      let row;
      let whereQuery, updateQuery;
      let historyArr;

      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `client converting start ======================================================`);

      row = await this.MONGOLOCALC.db("miro81").collection("client").find({}).toArray();
      for (let i of row) {
        for (let k = 0; k < i.requests.length; k++) {
          whereQuery = { cliid: i.cliid };
          updateQuery = {};

          updateQuery["requests." + String(k) + ".analytics.response.service"] = {
            serid: "s2011_aa02s",
            xValue: "B",
            online: false,
          };

          historyArr = [];
          for (let j of i.requests[k].analytics.date.callHistory) {
            historyArr.unshift({
              date: j,
              who: ""
            });
          }

          updateQuery["requests." + String(k) + ".analytics.date.call"] = {
            next: new Date(1800, 0, 1),
            history: historyArr
          };

          updateQuery["requests." + String(k) + ".analytics.date.calendar"] = {
            call: {
              mother: "clientCalendar",
              id: "",
            },
            precheck: {
              mother: "clientCalendar",
              id: "",
            },
            empty: {
              mother: "clientCalendar",
              id: "",
            },
            movein: {
              mother: "clientCalendar",
              id: "",
            }
          };

          updateQuery["requests." + String(k) + ".analytics.picture.space"] = {
            boo: false,
            file: [],
          };
          updateQuery["requests." + String(k) + ".analytics.picture.prefer"] = {
            boo: false,
            file: [],
          };
          updateQuery["requests." + String(k) + ".analytics.proposal"] = [];

          await this.MONGOLOCALC.db("miro81").collection("client").updateOne(whereQuery, { "$set": updateQuery });

          updateQuery = {};
          updateQuery["requests." + String(k) + ".proposal"] = "";
          updateQuery["requests." + String(k) + ".analytics.date.callHistory"] = "";

          await this.MONGOLOCALC.db("miro81").collection("client").updateOne(whereQuery, { "$unset": updateQuery });
        }
      }
      console.log(`client converting success`);
      console.log(``);

      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `project converting start =====================================================`);

      row = await this.MONGOLOCALC.db("miro81").collection("project").find({}).toArray();

      for (let i of row) {
        whereQuery = { proid: i.proid };
        updateQuery = {};

        updateQuery["process.call"] = {
          next: new Date(1800, 0, 1),
          history: []
        };
        updateQuery["contents.photo.boo"] = false;
        updateQuery["contents.photo.status"] = "해당 없음";
        updateQuery["contents.raw"] = {
          portfolio: {
            status: "해당 없음",
            link: "",
          },
          interview: {
            status: "해당 없음",
            link: "",
          },
          photo: {
            status: "해당 없음",
            link: "",
          },
        };
        updateQuery["contents.share"] = {
          client: {
            photo: new Date(1800, 0, 1),
            contents: new Date(1800, 0, 1),
          },
          designer: {
            photo: new Date(1800, 0, 1),
            contents: new Date(1800, 0, 1),
          }
        };
        await this.MONGOLOCALC.db("miro81").collection("project").updateOne(whereQuery, { "$set": updateQuery });

      }
      console.log(`project converting success`);
      console.log(``);

      */



      // const sheets = new GoogleSheet();
      // const report = await back.getClientReport();
      // await sheets.update_value_inPython("14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM", "", report.getMatrix(), [ 0, 0 ]);




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

      // const client = "임경지";
      // const pid = "p82";
      // const rid = "re076";
      // const links = [
      //   "https://docs.google.com/document/d/1Mkg2S0u4Wdd0hEutLOZji78e7PL3YyVSCI0KHkaIdUU/edit?usp=sharing",
      //   "https://docs.google.com/document/d/1Rk75pJkZu-Up3tOYP5KTm629zz5znR7VKUL-kVXMInE/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/1Jkny-V2nky11rBz9fJy0YQ8fE4PyruFk?usp=sharing",
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
      // await filter.addtionalRepair("p79", 4);

      // etc tools

      // await this.spellCheck("p81");
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
