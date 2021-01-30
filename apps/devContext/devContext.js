const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
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

      p1 박혜연 실장님 소희진 고객님
      p2 김은설 실장님 오현우 고객님
      p3 김인선 실장님 홍순제 고객님
      p4 김지은 실장님 이석암 고객님
      p5 전소영 실장님 마카롱 고객님
      p6 박혜연 실장님 정가혜 고객님
      p7 한혜원 실장님 조선영 고객님
      p8 박혜연 실장님 수달사순 고객님
      p9 임은숙 실장님 홍선희 고객님
      p12 한혜원 실장님 김이경 고객님
      p14 박혜연 실장님 김복자 고객님
      p15 박혜연 실장님 송진혜 고객님

      no project

      p10 박혜연 실장님 유정민 고객님 ("p1905_aa06s", "c1905_aa02s", "d1701_aa01s", "s2011_aa01s", (new Date(2018, 5, 2, 13, 0, 0)), (new Date(2018, 5, 2, 13, 0, 0)), 2500000, 30, 2500000)
      p24 곽수빈 실장님 신동연 고객님 ("p1910_aa10s", "c1910_aa13s", "d1904_aa13s", "s2011_aa01s", (new Date(2018, 5, 2, 13, 0, 0)), (new Date(2018, 5, 2, 13, 0, 0)), 2500000, 30, 2500000)
      p27 임은숙 실장님 김기용 고객님 ("p1909_aa05s", "c1909_aa11s", "d1902_aa01s", "s2011_aa02s", (new Date(2018, 5, 2, 13, 0, 0)), (new Date(2018, 5, 2, 13, 0, 0)), 2500000, 30, 2500000)
      p44 한서원 실장님 황시우 고객님 ("p2002_aa13s", "c2002_aa04s", "d1912_aa01s", "s2011_aa01s", (new Date(2018, 5, 2, 13, 0, 0)), (new Date(2018, 5, 2, 13, 0, 0)), 2500000, 30, 2500000)
      p50 임은숙 실장님 송희경 고객님 ("p1910_aa11s", "c1910_aa06s", "d1902_aa01s", "s2011_aa03s", (new Date(2018, 5, 2, 13, 0, 0)), (new Date(2018, 5, 2, 13, 0, 0)), 2500000, 30, 2500000)



      const MONGOC = this.MONGOC;
      function returnProjectJson(proid, cliid, desid, serid, firstDate, lastDate, supply, percentage, totalAmount) {
        let projectJson;
        let method;

        method = "프리랜서";

        projectJson = {
          proid: proid,
          cliid: cliid,
          desid: desid,
          service: {
            serid: serid,
            xValue: "M",
            online: false,
          },
          proposal: {
            status: "완료",
            date: firstDate,
            detail: [
                {
                  "desid" : desid,
                  "fee" : [
                      {
                          "method" : "offline",
                          "partial" : false,
                          "amount" : supply
                      }
                  ],
                  "pictureSettings" : [
                      {
                          "position" : "0",
                          "sgTrue" : "g",
                          "unionPo" : "union",
                          "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%;"
                      },
                      {
                          "position" : "1",
                          "sgTrue" : "s",
                          "unionPo" : "right",
                          "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%;"
                      },
                      {
                          "position" : "2",
                          "sgTrue" : "g",
                          "unionPo" : "union",
                          "styleText" : "width: 32.8%; height: 33%; top: 67%; left: 0%;"
                      },
                      {
                          "position" : "3",
                          "sgTrue" : "g",
                          "unionPo" : "union",
                          "styleText" : "width: 33%; height: 33%; top: 67%; left: 33.5%;"
                      },
                      {
                          "position" : "4",
                          "sgTrue" : "g",
                          "unionPo" : "union",
                          "styleText" : "width: 32.8%; height: 33%; top: 67%; left: 67.2%;"
                      }
                  ],
                  "description" : [
                      "내추럴하면서도 컬러를 조화롭게 사용하여 전체적으로 따뜻하고 차분한 스타일입니다.",
                      "고객이 합리적인 선택을 할 수 있도록 전문가 입장에서 조언해드립니다.",
                      "사진, 문서 등 다양한 방식으로 커뮤니케이션 잘 하시는 편입니다."
                  ]
              }
            ],
          },
          process: {
            status: "완료",
            contract: {
              first: {
                guide: new Date(1800, 0, 1),
                date: firstDate,
                cancel: new Date(1800, 0, 1),
                calculation: {
                  amount: 330000,
                  info: {
                    method: "",
                    proof: "",
                    to: "",
                  },
                  refund: 0,
                },
              },
              remain: {
                guide: new Date(1800, 0, 1),
                date: firstDate,
                cancel: new Date(1800, 0, 1),
                calculation: {
                  amount: {
                    supply: supply,
                    vat: (supply * 0.1),
                    consumer: (supply * 1.1),
                  },
                  info: {
                    method: "",
                    proof: "",
                    to: "",
                  },
                  refund: 0,
                },
              },
              form: {
                id: "",
                guide: new Date(1800, 0, 1),
                date: {
                  from: new Date(1800, 0, 1),
                  to: new Date(1800, 0, 1),
                  cancel: new Date(1800, 0, 1),
                }
              },
              meeting: {
                date: new Date(1800, 0, 1),
                pastDesigners: []
              },
            },
            design: {
              proposal: {
                provided: false,
                limit: null,
                detail: []
              },
              construct: {
                provided: false,
                detail: [],
              },
              purchase: {
                provided: false,
                detail: [],
              },
            },
            calculation: {
              method: method,
              percentage: percentage,
              info: {
                account: "",
                proof: "",
                to: "",
              },
              payments: {
                totalAmount: totalAmount,
                first: {
                  amount: (totalAmount / 2),
                  date: lastDate,
                  cancel: new Date(1800, 0, 1),
                  refund: 0,
                },
                remain: {
                  amount: (totalAmount / 2),
                  date: lastDate,
                  cancel: new Date(1800, 0, 1),
                  refund: 0,
                }
              }
            },
          },
          contents: {
            photo: {
              date: new Date(1800, 0, 1),
              info: {
                photographer: "",
                interviewer: "",
              }
            },
            conid: "",
          },
        };
        return projectJson;
      }

      await MONGOC.db(`miro81`).collection(`project`).insertOne(returnProjectJson("p1911_aa21s", "c1911_aa08s", "d1906_aa01s", "s2011_aa01s", (new Date(2019, 10, 4, 13, 0, 0)), (new Date(2020, 1, 24, 13, 0, 0)), 1909091, 30, 1292264));


      */

      /*

      const MONGOC = this.MONGOC;
      const back = new BackMaker();
      let note, targetArr;
      let temp, tempArr;
      let resultArr;
      let updateArr = [];
      let clients, client;
      let contents, content;
      let designers, designer;
      let projects, project;
      let searchQuery;
      let thisProject;
      let desid, cliid, proid, conid;

      for (let i = 1; i < 85; i++) {
        note = new AppleAPIs({ folder: "portfolio", subject: "p" + String(i) });
        targetArr = await note.readNote();
        if (targetArr.length > 0) {
          tempArr = targetArr[1].split(" ");
          clients = await back.getClientsByQuery({ name: tempArr[2].trim() });
          designers = await back.getDesignersByQuery({ designer: tempArr[0].trim() });

          thisProject = null;
          for (let c of clients) {
            searchQuery = { "$and": [ { desid: designers[0].desid }, { cliid: c.cliid } ] };
            projects = await back.getProjectsByQuery(searchQuery);
            if (projects.length > 0) {
              thisProject = projects[0];
              proid = thisProject.proid;
              desid = designers[0].desid;
              cliid = c.cliid;
            }
          }
          contents = await back.getContentsArrByQuery({ "contents.portfolio.pid": targetArr[0].trim() });
          conid = contents[0].conid;


          console.log(targetArr[0], targetArr[1], conid, desid, cliid, proid)

          // await back.updateContents([ { conid: conid }, { cliid: cliid } ]);
          // console.log("cliid done");
          //
          // await back.updateContents([ { conid: conid }, { proid: proid } ]);
          // console.log("proid done");



          console.log("---------------------------------------------------------------------");
        }
      }

      */


      /*

      const MONGOC = this.MONGOC;
      const hangulParsing = new ParsingHangul();
      const back = new BackMaker();
      const robotDirArr = (process.cwd()).split('/');
      robotDirArr.pop();
      robotDirArr.push("target");
      robotDirArr.push("portfolio");
      robotDirArr.join('/')
      const targetDir = robotDirArr.join('/');
      const { stdout } = shell.exec(`ls -al ${targetDir}`, { silent: true });

      let tong;
      let tempArr, tempArr2;
      let rawTarget;
      let refined;
      let originalName,fixedName;
      let client, designer;
      let resultClients, resultClient;
      let resultDesigners, resultDesigner;
      let resultProjects, resultProjectsTemp;
      let resultContents;
      let finalObj, finalName;
      let cliid, proid;
      let order;

      rawTarget = stdout.split('\n');
      tong = [];
      for (let i of rawTarget) {
        if (!/\.$/.test(i) && !/\.DS_Store$/.test(i) && !/\.\.$/.test(i) && !/^total/.test(i)) {
          originalName = i.split(' ')[i.split(' ').length - 1];
          fixedName = hangulParsing.fixString(originalName);
          refined = hangulParsing.fixString(i);
          refined = refined.replace(/\.txt$/, '').replace(/ /g, '').replace(/[0-9]/g, '').replace(/\-/g, '').replace(/C/gi, "고객").replace(/D/gi, "디자이너").replace(/실장/gi, "디자이너").replace(/박혜연/gi, "박혜연디자이너").replace(/clare/gi, "박혜연디자이너").replace(/bae고객/gi, "");
          if (!/p$/.test(refined)) {
            if (refined !== '' && originalName !== '') {
              finalObj = {};
              finalName = '';
              tempArr = refined.split('_');
              client = null;
              designer = null;
              for (let j of tempArr) {
                if (/고객/g.test(j)) {
                  client = j;
                  client = client.replace(/디자이너글/g, '').replace(/고객님/g, '').replace(/고객/g, '').replace(/[^가-힣]/g, '');
                }
                if (/디자이너/g.test(j)) {
                  designer = j;
                  designer = designer.replace(/디자이너글/g, '').replace(/디자이너님/g, '').replace(/디자이너/g, '').replace(/실장님/g, '').replace(/실장/g, '').replace(/[^가-힣]/g, '');
                }
              }

              resultClients = await back.getClientsByQuery({ name: client }, { selfMongo: MONGOC });
              resultDesigners = await back.getDesignersByQuery({ designer: designer }, { selfMongo: MONGOC });

              resultProjects = null;
              for (let z of resultClients) {
                resultProjectsTemp = await back.getProjectsByQuery({ "$and": [ { cliid: z.cliid }, { desid: (resultDesigners[0]).desid } ] }, { selfMongo: MONGOC });
                if (resultProjectsTemp.length > 0) {
                  resultProjects = resultProjectsTemp[0];
                }
              }

              resultContents = await back.getContentsArrByQuery({ proid: resultProjects.proid }, { selfMongo: MONGOC });

              finalObj.cliid = resultProjects.cliid;
              finalObj.desid = (resultDesigners[0]).desid;
              finalObj.proid = resultProjects.proid;
              finalObj.conid = 'none';
              if (resultContents.length > 0) {
                finalObj.conid = resultContents[0].conid;
              }

              finalName = finalObj.cliid + '-' + finalObj.desid + '-' + finalObj.proid + '-' + finalObj.conid + '.txt';
              finalObj.originalName = originalName;
              finalObj.fixedName = finalName;

              tong.push(finalObj);
            }
          }
        }
      }

      for (let { originalName, fixedName } of tong) {
        order = `mv ${targetDir}/'${originalName}' ${targetDir}/${fixedName}`;
        shell.exec(order);
      }

      */



      /*

      const MONGOCHOME = new this.mother.mongo(("mongodb://uragen:Dpdhdn941!@220.117.13.12:27017/admin"), { useUnifiedTopology: true });
      await MONGOCHOME.connect();
      const MONGOC = this.MONGOC;
      const hangulParsing = new ParsingHangul();
      const back = new BackMaker();
      const robotDirArr = (process.cwd()).split('/');
      robotDirArr.pop();
      robotDirArr.push("target");
      robotDirArr.push("portfolio");
      robotDirArr.join('/')
      const targetDir = robotDirArr.join('/');
      const { stdout } = shell.exec(`ls -al ${targetDir}`, { silent: true });

      let rawTarget;
      let temp;
      let fileName;
      let fileArr;
      let uploadObj;
      let reviewContents;

      rawTarget = stdout.split('\n');

      for (let i of rawTarget) {
        if (!/\.$/.test(i) && !/\.DS_Store$/.test(i) && !/\.\.$/.test(i) && !/^total/.test(i)) {
          temp = i.split(' ');
          if (temp[temp.length - 1] !== '') {
            fileName = temp[temp.length - 1];
            fileArr = fileName.replace(/\.txt$/, '').split('-');

            uploadObj = {};

            uploadObj.proid = fileArr[2];
            uploadObj.cliid = fileArr[0];
            uploadObj.desid = fileArr[1];
            if (fileArr[3] === 'none') {
              uploadObj.conid = '';
            } else {
              uploadObj.conid = fileArr[3];
            }

            uploadObj.portfolio = {};
            uploadObj.review = {};
            uploadObj.photo = {};

            uploadObj.portfolio.exist = true;
            uploadObj.portfolio.contents = await fileSystem('readString', [ targetDir + '/' + fileName ]);

            uploadObj.review.exist = false;
            uploadObj.review.contents = '';

            if (uploadObj.conid !== '') {
              reviewContents = await back.getContentsById(uploadObj.conid, { selfMongo: MONGOC });
              if (reviewContents.getRid() !== 're999') {
                uploadObj.review.exist = true;
                uploadObj.review.contents = reviewContents.getContentsFlatDetail().review;
              }
            }

            uploadObj.photo.link = '';

            console.log(uploadObj);
            await MONGOCHOME.db(`miro81`).collection(`contentsRaw`).insertOne(uploadObj);
          }
        }
      }

      MONGOCHOME.close();

      */




      // let json, matrixA, matrixB, today;
      // let temp0, temp1;
      // let standardsA, standardsB;
      //
      // today = new Date();
      //
      // standardsA = {
      //   xValues: [
      //     "F",
      //     "S",
      //     "T",
      //     "XT"
      //   ],
      //   yValues: [
      //     "B",
      //     "N",
      //     "O"
      //   ],
      //   zValues: [
      //     "premium",
      //     "normal",
      //     "economy"
      //   ]
      // };
      //
      // standardsB = {
      //   xValues: [
      //     "디자인",
      //     "스타일링",
      //     "시공 운영",
      //     "부가 서비스",
      //     "제작 여부",
      //     "현장 경험",
      //     "고객 응대",
      //     "고객 평가",
      //     "리스크 관리",
      //     "홈리에종",
      //   ],
      //   yValues: [
      //     "10",
      //     "9",
      //     "8",
      //     "7",
      //     "6",
      //     "5",
      //     "4",
      //     "3",
      //     "2",
      //     "1",
      //   ],
      // };
      //
      // matrixA = [];
      // for (let i = 0; i < 4; i++) {
      //   temp0 = [];
      //   for (let j = 0; j < 3; j++) {
      //     temp1 = [];
      //     for (let k = 0; k < 3; k++) {
      //       temp1.push(0);
      //     }
      //     temp0.push(temp1);
      //   }
      //   matrixA.push(temp0);
      // }
      //
      // matrixB = [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ];
      //
      // const designers = await back.getDesignersAll();
      // for (let d of designers) {
      //   json = {
      //     desid: d.desid,
      //     matrix: {
      //       matrixA: {
      //         standard: standardsA,
      //         value: matrixA,
      //         update: today,
      //       },
      //       matrixB: {
      //         standard: standardsB,
      //         value: matrixB,
      //         update: today,
      //       },
      //     }
      //   };
      //   await back.mongoCreate("designerMatrix", json, { console: true });
      // }

      // const MONGOC = this.MONGOC;
      // let projects, tempArr;
      //
      //
      // projects = await back.getProjectsByQuery({ desid: { "$regex": "^d" } });
      //
      //
      // for (let project of projects) {
      //   tempArr = await MONGOC.db(`miro81`).collection(`BP2_calculation`).find({ a4_customernumber: project.cliid }).toArray();
      //   if (tempArr.length > 0) {
      //     if (Number(tempArr[0].c1_supply.replace(/[^0-9]/g, '')) !== Number(project.process.contract.remain.calculation.amount.supply)) {
      //       console.log(project)
      //     }
      //   }
      // }


      // const app = new SnsParsing();

      // await app.fromToFix("a69", "a55", "portfolio");
      // await app.fromToFix("p48", "p52", "review");

      // const NaverBlogParsing = require(process.cwd() + "/apps/naverAPIs/naverBlogParsing.js");
      // const app = new NaverBlogParsing();
      // await app.blogToJson();





      // TOOLS ----------------------------------------------------------------------------------------------------


      // contents upload

      // const client = "허지인";
      // const pid = "p79";
      // const rid = "re073";
      // const links = [
      //   "https://docs.google.com/document/d/1K1gRly8rNKrV1q46HR54ub-vwqHNH-gptqj5PcnBAE0/edit?usp=sharing",
      //   "https://docs.google.com/document/d/1EGzRsyY2gNvsJhGKuYbVMmhibeKBMuAMabT8RdB6ZIE/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/16RUahIONQnhEz4XaoGY0Z3YlYSuXTwyL?usp=sharing",
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

      // await this.spellCheck("p79");
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
