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

      // let app;
      // for (let i of aTargets) {
      //   app = new ResourceMaker(i);
      //   await app.launching();
      // }
      //
      // for (let i of pTargets) {
      //   app = new ResourceMaker(i);
      //   await app.launching();
      // }

      // for (let i of pTargets) {
      //   await this.reviewVerification(i);
      // }

      // const app = new BackMaker();
      // console.log((await app.getContentsByPid("p59")).toAiState());
      // const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
      // let tempResponse, index, endPoint;
      // tempResponse = 200;
      // index = -1;
      // while (tempResponse === 200) {
      //   index++;
      //   tempResponse = await this.mother.headRequest(ADDRESS.s3info.host + "/corePortfolio/original/p61/i" + String(index) + "p61.jpg");
      //   tempResponse = tempResponse.statusCode;
      // }
      // endPoint = index - 1;
      // console.log(endPoint);


      // {
      //
      //   const resultFolder = process.env.HOME + "/photoOriginal";
      //   let fromArr, toArr;
      //   let pidList_raw, pidList;
      //   let targetFolder, targetFolderList_raw, targetFolderList;
      //
      //
      //   pidList_raw = await fileSystem(`readDir`, [ resultFolder ]);
      //   pidList = [];
      //   for (let i of pidList_raw) {
      //     if (i !== `.DS_Store`) {
      //       pidList.push(i);
      //     }
      //   }
      //
      //   for (let pid of pidList) {
      //
      //     targetFolder = resultFolder + "/" + pid;
      //     targetFolderList_raw = await fileSystem(`readDir`, [ targetFolder ]);
      //     targetFolderList = [];
      //     for (let i of targetFolderList_raw) {
      //       if (i !== `.DS_Store`) {
      //         targetFolderList.push(i);
      //       }
      //     }
      //
      //     fromArr = [];
      //     toArr = [];
      //     for (let i of targetFolderList) {
      //       if (i !== `.DS_Store`) {
      //         fromArr.push(`${shellLink(targetFolder)}/${i}`);
      //         toArr.push(`corePortfolio/original/${pid}/${i}`);
      //       }
      //     }
      //
      //     console.log(fromArr);
      //     console.log(toArr);
      //
      //     await this.mother.s3FileUpload(fromArr, toArr);
      //
      //   }
      //
      // }




      // const notion = new NotionAPIs();
      // const notionCard = await notion.getElementById("d2003_aa01s");
      // console.log(notionCard)
      // await notion.pastToNewDesid()
      // await notion.updateConsoleLink();

      // await this.mother.requestSystem("http://52.79.119.72:3000/toNotion", { cliid: "c2011_aa47s" });

      // const back = new BackMaker();
      // console.log(await back.getClientsAll());


      // const { mongo } = this.mother;
      // const MONGOCTEST = new mongo("mongodb://" + "uragen" + ':' + "Dpdhdn941!" + '@' + "3.34.233.59" + ':' + String(27017) + "/admin", { useUnifiedTopology: true });
      // let tempArr;
      // let targetCollections = [
      //   `clientHistory`,
      //   `projectHistory`,
      //   `realtimeDesigner`,
      // ];
      //
      // await MONGOCTEST.connect();
      //
      // for (let t of targetCollections) {
      //   tempArr = await this.MONGOLOCALC.db(`miro81`).collection(t).find({}).toArray();
      //   await MONGOCTEST.db(`miro81`).collection(t).deleteMany({});
      //   for (let i of tempArr) {
      //     await MONGOCTEST.db(`miro81`).collection(t).insertOne(i);
      //   }
      // }
      //
      // MONGOCTEST.close();


      // const MONGOC = this.MONGOC;
      // const projects = await MONGOC.db(`miro81`).collection(`project`).find({}).toArray();
      // let whereQuery, updateQuery;
      // let tempObj, tempObj2, tempObj3, tempObj4, tempObj5;
      //
      // for (let p of projects) {
      //   whereQuery = { proid: p.proid };
      //
      //   tempObj = p.process.contract.first;
      //   tempObj.cancel = new Date(1800, 0, 1);
      //   tempObj.calculation.refund = 0;
      //
      //   tempObj2 = p.process.contract.remain;
      //   tempObj2.cancel = new Date(1800, 0, 1);
      //   tempObj2.calculation.refund = 0;
      //
      //   tempObj3 = p.process.contract.form;
      //   tempObj3.date.cancel = new Date(1800, 0, 1);
      //
      //   tempObj4 = p.process.calculation.payments.first;
      //   tempObj4.cancel = new Date(1800, 0, 1);
      //   tempObj4.refund = 0;
      //
      //   tempObj5 = p.process.calculation.payments.remain;
      //   tempObj5.cancel = new Date(1800, 0, 1);
      //   tempObj5.refund = 0;
      //
      //   updateQuery = { "process.contract.first": tempObj, "process.contract.remain": tempObj2, "process.contract.form": tempObj3, "process.calculation.payments.first": tempObj4, "process.calculation.payments.remain": tempObj5 };
      //   await MONGOC.db(`miro81`).collection(`project`).updateOne(whereQuery, { $set: updateQuery });
      // }





      // const back = new BackMaker();
      // let clients = await back.getClientsByQuery({ "$or": [ { "requests.0.analytics.response.status": "진행" }, { "requests.0.analytics.response.status": "완료" } ] });
      //
      // let tong = [ [ "이름", "전화번호" ] ];
      // let tempTong;
      // for (let i of clients) {
      //   tempTong = [];
      //   tempTong.push(i.name);
      //   tempTong.push(i.phone);
      //   tong.push(tempTong);
      // }
      // console.log(tong);
      //
      // const sheets = new GoogleSheet();
      // const drive = new GoogleDrive();
      //
      // let sheetsId, response;
      //
      // sheetsId = await sheets.create_newSheets_inPython("진행 및 완료 고객 이름, 번호", "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c");
      // await sheets.update_value_inPython(sheetsId, '', tong, [ 0, 0 ]);
      // await sheets.setting_cleanView_inPython(sheetsId);
      // response = await drive.read_webView_inPython(sheetsId);
      //
      //
      // console.log(response);




      // let clients = await back.getLatestClients(1, { withTools: true });
      //
      // console.log(clients)
      // console.log(clients[0].requests)
      // console.log(clients[0].requests[0].analytics.googleAnalytics)
      // console.log(clients[0].requests[0].analytics.response)



      // const analytics = new GoogleAnalytics();
      // const startDay = "2020-12-21";
      // const endDay = "2020-12-29";
      // const users = await analytics.getUsersByDate(startDay, endDay);
      // await fileSystem(`write`, [ `${process.cwd()}/temp/analyticsExports_${startDay}_${endDay}.js`, JSON.stringify(users, null, 2) ]);


      /*

      const targets = [
        "analyticsExports_2019-03-01_2019-05-01.js",
        "analyticsExports_2019-05-01_2019-07-01.js",
        "analyticsExports_2019-07-01_2019-09-01.js",
        "analyticsExports_2019-09-01_2019-11-01.js",
        "analyticsExports_2019-11-01_2020-01-01.js",
        "analyticsExports_2020-01-01_2020-02-01.js",
        "analyticsExports_2020-02-01_2020-04-01.js",
        "analyticsExports_2020-04-01_2020-06-01.js",
        "analyticsExports_2020-06-01_2020-08-01.js",
        "analyticsExports_2020-08-01_2020-10-01.js",
        "analyticsExports_2020-10-01_2020-12-01.js",
        "analyticsExports_2020-12-01_2020-12-29.js",
      ];

      let totalTong = [];
      let tempArr;
      for (let i of targets) {
        tempArr = JSON.parse(await fileSystem(`readString`, [ `${process.cwd()}/temp/${i}` ]));
        for (let j = 0; j < tempArr.length; j++) {
          totalTong.push(tempArr[tempArr.length - 1 - j]);
        }
      }

      // await fileSystem(`write`, [ `${process.cwd()}/temp/analyticsExports_totalTong.js`, JSON.stringify(totalTong) ]);

      const { mongo, mongoinfo } = this.mother;
      const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
      const MONGOCPYTHON = new mongo(("mongodb://" + ADDRESS.pythoninfo.user + ':' + ADDRESS.pythoninfo.password + '@' + ADDRESS.pythoninfo.host + ':' + String(ADDRESS.pythoninfo.port) + "/admin"), { useUnifiedTopology: true });


      await MONGOCPYTHON.connect();

      const stringToArr = function (dateString) {
        let tempArr0, tempArr1, tempArr2;
        tempArr0 = dateString.split(' ');
        tempArr1 = tempArr0[0].split('-');
        tempArr2 = tempArr0[1].split(':');
        return [ Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')) ];
      }

      let already;

      for (let i of totalTong) {
        i.firstTimeline = new Date(...stringToArr(i.firstTimeline));
        i.latestTimeline = new Date(...stringToArr(i.latestTimeline));
        for (let j = 0; j < i.history.length; j++) {
          i.history[j].time = new Date(...stringToArr(i.history[j].time));
        }
        for (let j in i.referrer.detail.queryString) {
          if (/[\.\/\\\<\>\?\:\;\'\"\!\&\=\+]/g.test(j)) {
            delete i.referrer.detail.queryString[j];
          }
        }
        if (i.source !== undefined) {
          delete i.source;
        }

        i.device.type = i.device.category;
        i.device.mobileDevice = i.device.model;
        delete i.device.category;
        delete i.device.model;

        already = await MONGOCPYTHON.db(`miro81`).collection(`googleAnalytics_total`).find({ "userid": i.userid }).toArray();
        if (already.length === 0) {
          await MONGOCPYTHON.db(`miro81`).collection(`googleAnalytics_total`).insertOne(i);
        }
        console.log(i.userid + " success");
      }


      MONGOCPYTHON.close();

      */


      // const back = new BackMaker();
      // const projects = await back.getProjectsAll();
      // let stack = [];
      // for (let i = 0; i < projects.length; i++) {
      //   if (projects[i].cliid !== "" && projects[i].desid !== "") {
      //     if (i !== 0) {
      //       if (stack.includes(projects[i].cliid + "_" + projects[i].desid)) {
      //         console.log(projects[i]);
      //       }
      //     }
      //     stack.push(projects[i].cliid + "_" + projects[i].desid);
      //   }
      // }



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



      */


      // if (p.middle.serid === "s2011_aa01s") {
      //   serviceWording = "홈퍼니싱";
      // } else if (p.middle.serid === "s2011_aa02s") {
      //   serviceWording = "홈스타일링";
      // } else if (p.middle.serid === "s2011_aa03s") {
      //   serviceWording = "토탈 스타일링";
      // }
      //
      // if (p.middle.xValue === 'M') {
      //   serviceWording += " mini";
      // } else if (p.middle.xValue === 'B') {
      //   serviceWording += " basic";
      // } else if (p.middle.xValue === 'P') {
      //   serviceWording += " premium";
      // }

      const MONGOC = this.MONGOC;
      let clientJson, projectJson;


      //p1 박혜연 실장님 소희진 고객님 : ok
      clientJson = {
        name: "소희진",
        phone: "010-2627-6393",
        email: "",
        cliid: "c1806_aa01s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 5, 1, 13, 0, 0),
              notionId: "",
              budget: "5,000만원 이상",
              family: "부부, 아들 1, 딸 1",
              space: {
                address: "서울 서초구 잠원로 150 잠원 한신아파트 4동 307호",
                contract: "자가",
                pyeong: 34,
                spec: {
                  room: 3,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: false,
                  expected: new Date(2018, 6, 18),
                },
              },
              etc: {
                comment: "",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1806_aa01s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1806_aa01s",
        cliid: "c1806_aa01s",
        desid: "d1701_aa01s",
        service: {
          serid: "s2011_aa03s",
          xValue: "P",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 5, 2, 13, 0, 0),
          detail: [
              {
                "desid" : "d1701_aa01s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 3500000
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
              date: new Date(2018, 5, 3, 13, 0, 0),
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
              date: new Date(2018, 5, 3, 13, 0, 0),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 3500000,
                  vat: 350000,
                  consumer: 3850000,
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
            method: "",
            percentage: 100,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 0,
              first: {
                amount: 0,
                date: new Date(2018, 5, 4, 13, 0, 0),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 0,
                date: new Date(2018, 5, 4, 13, 0, 0),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p2 김은설 실장님 오현우 고객님 : ok
      clientJson = {
        name: "오현우",
        phone: "010-4031-4776",
        email: "exodus27@naver.com",
        cliid: "c1809_aa01s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 8, 5, 21, 50, 17),
              notionId: "",
              budget: "1,000만원",
              family: "혼자",
              space: {
                address: "경기 평택시 비전푸르지오3차 311동 2304호",
                contract: "전월세",
                pyeong: 34,
                spec: {
                  room: 3,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: false,
                  expected: new Date(2018, 9, 1),
                },
              },
              etc: {
                comment: "28일부터 가능하고 입주 예정일은 10월 첫주나 둘째주입니다. 무인양품스타일 따뜻한느낌 간접조명",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1809_aa01s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1809_aa01s",
        cliid: "c1809_aa01s",
        desid: "d1904_aa11s",
        service: {
          serid: "s2011_aa01s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 8, 6, 13, 0, 0),
          detail: [
              {
                "desid" : "d1904_aa11s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 2000000
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
              date: new Date(2018, 8, 7, 13, 0, 0),
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
              date: new Date(2018, 8, 7, 13, 0, 0),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 2000000,
                  vat: 200000,
                  consumer: 2200000,
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
            method: "",
            percentage: 30,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 2000000,
              first: {
                amount: 1000000,
                date: new Date(2018, 8, 8, 13, 0, 0),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 1000000,
                date: new Date(2018, 8, 8, 13, 0, 0),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p3 김인선 실장님 홍순제 고객님 : ok
      clientJson = {
        name: "홍순제",
        phone: "010-2776-1333",
        email: "soonje@gmail.com",
        cliid: "c1812_aa01s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 11, 10, 12, 10, 40),
              notionId: "",
              budget: "500만원 이하",
              family: "알 수 없음",
              space: {
                address: "서울 용산구 녹사평대로26나길 6",
                contract: "전월세",
                pyeong: 50,
                spec: {
                  room: 4,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: true,
                  expected: new Date(2018, 11, 10, 12, 10, 40),
                },
              },
              etc: {
                comment: "심플했으면 합니다.",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1812_aa01s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1812_aa01s",
        cliid: "c1812_aa01s",
        desid: "d1904_aa08s",
        service: {
          serid: "s2011_aa01s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 11, 11, 12, 10, 40),
          detail: [
              {
                "desid" : "d1904_aa08s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 3500000
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
              date: new Date(2018, 11, 12, 12, 10, 40),
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
              date: new Date(2018, 11, 12, 12, 10, 40),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 3500000,
                  vat: 350000,
                  consumer: 3850000,
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
            method: "",
            percentage: 17,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 2905000,
              first: {
                amount: 1452500,
                date: new Date(2018, 11, 13, 12, 10, 40),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 1452500,
                date: new Date(2018, 11, 13, 12, 10, 40),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p4 김지은 실장님 이석암 고객님 : ok
      clientJson = {
        name: "이석암",
        phone: "010-6245-0506",
        email: "seokam87@gmail.com",
        cliid: "c1811_aa02s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 10, 22, 16, 5, 9),
              notionId: "",
              budget: "500만원 이하",
              family: "셰어하우스",
              space: {
                address: "서울 마포구 잔다리로 7길 30 2층",
                contract: "전월세",
                pyeong: 23,
                spec: {
                  room: 3,
                  bathroom: 1,
                  valcony: true
                },
                resident: {
                  living: true,
                  expected: new Date(2018, 10, 22, 16, 5, 9),
                },
              },
              etc: {
                comment: "모던&내츄럴, 블랙앤화이트, 아늑, 플랜테리어",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1811_aa02s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1811_aa02s",
        cliid: "c1811_aa02s",
        desid: "d1904_aa12s",
        service: {
          serid: "s2011_aa01s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 10, 23, 16, 5, 9),
          detail: [
              {
                "desid" : "d1904_aa12s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 1200000
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
              date: new Date(2018, 10, 24, 16, 5, 9),
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
              date: new Date(2018, 10, 24, 16, 5, 9),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 1200000,
                  vat: 120000,
                  consumer: 1320000,
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
            method: "",
            percentage: 35,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 754260,
              first: {
                amount: 377130,
                date: new Date(2018, 10, 25, 16, 5, 9),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 377130,
                date: new Date(2018, 10, 25, 16, 5, 9),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p5 전소영 실장님 김유나 고객님 : ok
      clientJson = {
        name: "김유나",
        phone: "010-9373-3994",
        email: "cocosable@naver.com",
        cliid: "c1811_aa01s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 10, 13, 22, 18, 58),
              notionId: "",
              budget: "3,000만원",
              family: "부부.여아1",
              space: {
                address: "서울 서초구 고무래로 35 반포리체",
                contract: "자가",
                pyeong: 25,
                spec: {
                  room: 2,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: false,
                  expected: new Date(2019, 0, 13, 22, 18, 58),
                },
              },
              etc: {
                comment: "디자인도움만 받고 시공은 따로할지 한번에 맡길지 고민중입니다",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1811_aa01s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1811_aa01s",
        cliid: "c1811_aa01s",
        desid: "d1904_aa05s",
        service: {
          serid: "s2011_aa03s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 10, 14, 22, 18, 58),
          detail: [
              {
                "desid" : "d1904_aa05s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 2500000
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
              date: new Date(2018, 10, 15, 22, 18, 58),
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
              date: new Date(2018, 10, 15, 22, 18, 58),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 2500000,
                  vat: 250000,
                  consumer: 2750000,
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
            method: "",
            percentage: 10,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 2175750,
              first: {
                amount: 1087875,
                date: new Date(2018, 10, 16, 22, 18, 58),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 1087875,
                date: new Date(2018, 10, 16, 22, 18, 58),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p6 박혜연 실장님 정가혜 고객님 : ok
      clientJson = {
        name: "정가혜",
        phone: "010-6346-7692",
        email: "gahyejung@gmail.com",
        cliid: "c1807_aa01s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 6, 19, 13, 0, 0),
              notionId: "",
              budget: "4,000만원",
              family: "알 수 없음",
              space: {
                address: "서울 동작구 여의대방로54길 6 대방동 경남아너스빌",
                contract: "자가",
                pyeong: 34,
                spec: {
                  room: 3,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: false,
                  expected: new Date(2018, 7, 19, 13, 0, 0),
                },
              },
              etc: {
                comment: "",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1807_aa01s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1807_aa01s",
        cliid: "c1807_aa01s",
        desid: "d1701_aa01s",
        service: {
          serid: "s2011_aa03s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 6, 20, 13, 0, 0),
          detail: [
              {
                "desid" : "d1701_aa01s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 2700000
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
              date: new Date(2018, 6, 21, 13, 0, 0),
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
              date: new Date(2018, 6, 21, 13, 0, 0),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 2700000,
                  vat: 270000,
                  consumer: 2970000,
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
            method: "",
            percentage: 100,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 0,
              first: {
                amount: 0,
                date: new Date(2018, 6, 22, 13, 0, 0),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 0,
                date: new Date(2018, 6, 22, 13, 0, 0),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p7 한혜원 실장님 조선영 고객님
      clientJson = {
        name: "조선영",
        phone: "010-4155-9092",
        email: "pupil200@hotmail.com",
        cliid: "c1811_aa03s",
        requests: [
          {
            request: {
              timeline: new Date(2018, 10, 17, 2, 13, 41),
              notionId: "",
              budget: "1,500만원",
              family: "부부 아들 하나(36개월)",
              space: {
                address: "경기 시흥시 은계남로 11 한양수자인 더 클래스",
                contract: "자가",
                pyeong: 30,
                spec: {
                  room: 3,
                  bathroom: 2,
                  valcony: true
                },
                resident: {
                  living: false,
                  expected: new Date(2019, 0, 1, 13, 0, 0),
                },
              },
              etc: {
                comment: "편안한 느낌에 따뜻한 분위기로 수납 많고 청소하기 쉬운 스타일 원해요~~거실창쪽으로는 아이공간을 만드려고요(간단한 독서공간&장난감공간)",
                channel: "인터넷 검색",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "완료",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "p1811_aa03s",
            },
          },
        ],
      };
      await MONGOC.db(`miro81`).collection(`client`).insertOne(clientJson);
      projectJson = {
        proid: "p1811_aa03s",
        cliid: "c1811_aa03s",
        desid: "d1904_aa16s",
        service: {
          serid: "s2011_aa01s",
          xValue: "B",
          online: false,
        },
        proposal: {
          status: "완료",
          timeline: new Date(2018, 10, 18, 2, 13, 41),
          detail: [
              {
                "desid" : "d1904_aa16s",
                "fee" : [
                    {
                        "method" : "offline",
                        "partial" : false,
                        "amount" : 1800000
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
              date: new Date(2018, 10, 19, 2, 13, 41),
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
              date: new Date(2018, 10, 19, 2, 13, 41),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 1800000,
                  vat: 180000,
                  consumer: 1980000,
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
            method: "",
            percentage: 30,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 1218420,
              first: {
                amount: 609210,
                date: new Date(2018, 10, 20, 2, 13, 41),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 609210,
                date: new Date(2018, 10, 20, 2, 13, 41),
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
      await MONGOC.db(`miro81`).collection(`project`).insertOne(projectJson);


      //p8 박혜연 실장님 수달사순 고객님??



      //p9 임은숙 실장님 홍선희 고객님



      //p12 한혜원 실장님 김이경 고객님



      //p14 박혜연 실장님 김복자 고객님??



      //p15 박혜연 실장님 송진혜 고객님











      const back = new BackMaker();
      let note, targetArr;
      let temp, tempArr;
      let resultArr;
      let updateArr = [];
      let clients;

      for (let i = 1; i < 85; i++) {
        note = new AppleAPIs({ folder: "portfolio", subject: "p" + String(i) });
        targetArr = await note.readNote();
        if (targetArr.length > 0) {
          tempArr = targetArr[1].split(" ");
          clients = await back.getClientsByQuery({ name: tempArr[2].trim() });
          if (clients.length === 0) {
            console.log(targetArr[0], targetArr[1]);
          }
        }
      }

      // for (let i of targetArr) {
      //   temp = await app.paragraphChecker(i);
      //   updateArr.push(temp);
      // }
      // console.log(updateArr);
      // updateArr.shift();
      // await note.updateNote(updateArr.join('<br><br><br>'));








      // TOOLS ----------------------------------------------------------------------------------------------------


      // contents upload

      // const client = "강영후";
      // const pid = "p77";
      // const rid = "re071";
      // const links = [
      //   "https://docs.google.com/document/d/1G9qMTqJC1j0hrr9HT0Bb6PrX42zcHkbIxKbVOTSq5Qg/edit?usp=sharing",
      //   "https://docs.google.com/document/d/19stRqaANwH1DFY0izMvhyUqd8GvG9iYg5sybWEs1q0I/edit?usp=sharing",
      //   "https://drive.google.com/drive/folders/1h18Z5NSAhWY-8cevvJjUpIgKwj03X1B4?usp=sharing",
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
      // await filter.addtionalRepair("p73", 10);

      // etc tools

      // await this.spellCheck("p77");
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
