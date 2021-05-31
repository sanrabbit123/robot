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

const DevContext = function () {
  this.mother = new Mother();
  this.back = new BackMaker();
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, pythonExecute } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();











    // const selfMongo = this.MONGOLOCALC;
    // const targetDesigners = [ "홍민영", "이지수", "채성은" ];
    // const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
    // const dateToString = (date) => { return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`; }
    // const autoComma = function (str) {
    //   if (typeof str === "number") {
    //     str = String(str);
    //   }
    //   let minus, num, tmp;
    //
    //   if (/\-/g.test(str)) {
    //     minus = /\-/g.exec(str)[0];
    //   } else {
    //     minus = '';
    //   }
    //
    //   num = str.replace(/[^0-9]/g, '');
    //   tmp = '';
    //
    //   if (num.length < 4) {
    //     return minus + num;
    //   } else if (num.length < 7) {
    //     tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    //     return minus + tmp;
    //   } else if (num.length < 10) {
    //     tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    //     return minus + tmp;
    //   } else if (num.length < 13) {
    //     tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    //     return minus + tmp;
    //   } else if (num.length < 16) {
    //     tmp += num.slice(-15, -12) + ',' + num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    //     return minus + tmp;
    //   }
    //
    //   return minus + num;
    // }
    // const consoleInfo = "https://homeliaison-console.xyz";
    // const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    // let designers, designer, desid;
    // let projects, client;
    // let contents;
    // let matrix, rowArr;
    // let contentsDate;
    //
    // matrix = [ [ "디자이너 이름", "고객 이름", "시작일", "종료일", "정산 금액", "프로젝트 콘솔" ] ];
    //
    // for (let name of targetDesigners) {
    //   designers = await back.getDesignersByQuery({ designer: name }, { selfMongo });
    //   designer = designers[0];
    //   desid = designer.desid;
    //   projects = await back.getProjectsByQuery({ desid }, { selfMongo })
    //   for (let project of projects) {
    //     client = await back.getClientById(project.cliid, { selfMongo });
    //     contents = await back.getContentsArrByQuery({ proid: project.proid }, { selfMongo });
    //
    //     contentsDate = new Date(1800, 0, 1);
    //     if (contents.length !== 0) {
    //       contentsDate = contents[0].contents.portfolio.date;
    //     }
    //
    //     matrix.push([
    //       name,
    //       client.name,
    //       dateToString(project.process.contract.meeting.date.valueOf() < emptyDateValue ? project.proposal.date : project.process.contract.meeting.date),
    //       dateToString(project.process.contract.form.date.to.valueOf() < emptyDateValue ? ((project.process.calculation.payments.remain.date.valueOf() < emptyDateValue) ? (project.contents.photo.date.valueOf() < emptyDateValue ? contentsDate : project.contents.photo.date) : project.process.calculation.payments.remain.date) : project.process.contract.form.date.to),
    //       autoComma(project.process.calculation.payments.totalAmount) + "원",
    //       consoleInfo + "/project?proid=" + project.proid ]);
    //   }
    // }
    //
    // console.log(matrix);
    //
    // const sheetsId = "1HxJjhGW1qoldqGw6IqFIbLrcCgvMBGnDJPkhYJRoFTU";
    // const sheets = new GoogleSheet();
    // await sheets.setting_cleanView_inPython(sheetsId);
    // await sheets.update_value_inPython(sheetsId, "디자이너", matrix, [ 0, 0 ]);




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


    // const sheets = new GoogleSheet();
    // const sheetsId = "1W2duVMJVtQgbjQpTafM4lnuukebWNAEHyvD__VnOb_w";
    // const selfMongo = this.MONGOLOCALC;
    // const option = { selfMongo, withTools: true };
    // const clients = await back.getClientsByQuery({}, option);
    // const projects = await back.getProjectsByQuery({}, option);
    // const tongs = clients.getRequestsTongsMonthly();
    // let temp, num;
    // let tempArr;
    // let matrix;
    //
    // matrix = [ [ "날짜", "문의", "계약", "계약율" ] ];
    // for (let { name, tong } of tongs) {
    //   num = 0;
    //   for (let { cliid } of tong) {
    //     temp = projects.searchByCliid(cliid, true);
    //     num += temp.length;
    //   }
    //   matrix.push([ name, String(tong.length), String(num), (String(Math.round((num / tong.length) * 10000) / 100) + '%') ]);
    // }
    // console.log(matrix)
    // await sheets.setting_cleanView_inPython(sheetsId);
    // await sheets.update_value_inPython(sheetsId, "문의계약", matrix, [ 0, 0 ]);





    /*

    const sheets = new GoogleSheet();
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

    // card setting
    // await this.cardSetting("010-9476-2253");


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
    // await drive.get_folder("https://drive.google.com/drive/folders/1Syjhfd-vm4ZrTuCuuwLKrJYOPQIMISc-");


    // naverBlog to json
    // const blog = new NaverBlogParsing();
    // await blog.blogToJson();


    // spawn catfish
    // const app = new SpawnCatfish();
    // await app.spawnLaunching(true);


    // contents upload
    // const client = "최영미";
    // const pid = "p95";
    // const rid = "re089";
    // const links = [
    //   "https://docs.google.com/document/d/1ATtGuIWbBmVrA_7U0kkVtfeL3pHwc_5WTg_AQwttyOA/edit?usp=sharing",
    //   "https://docs.google.com/document/d/1hmHACGLg9EzSUEszti1DyJcDuUSjUW9Dea-3OcEgi2Q/edit?usp=sharing",
    //   "https://drive.google.com/drive/folders/1T-wnDda0LEJq5i0ppY2IwGdqrXLiA9Xj?usp=sharing",
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


    // addtional photo repair
    // const filter = new PortfolioFilter();
    // await filter.additionalRepair("p90", 13);


    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: "김법정",
    //     designer: "김지은",
    //     link: "https://drive.google.com/drive/folders/1KM6lTMFnuXzJlo4eVmBsplL6UePwKkwo",
    //   }
    // ]);


    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1-fszrR5hWn__B2So0uoG8OcGIbOHyeD5", "p95");


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("p95");


    // get corePortfolio by pid
    // await this.getCorePortfolio("p95");


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

DevContext.prototype.cardSetting = async function (phone) {
  const instance = this;
  const back = this.back;
  const { mysqlQuery } = this.mother;
  try {
    if (typeof phone !== "string") {
      throw new Error("invaild input");
    }
    if (!/-/g.test(phone)) {
      throw new Error("invaild input");
    }
    const clients = await back.getClientsByQuery({ phone });
    if (clients.length === 0) {
      throw new Error("clients error");
    }
    let cliid, name;
    let projects, project;
    let first, remain;
    let query;

    cliid = clients[0].cliid;
    name = clients[0].name;
    projects = await back.getProjectsByQuery({ cliid });
    if (projects.length === 0) {
      throw new Error("projects error");
    }

    project = projects[0];
    first = project.process.contract.first.calculation.amount;
    remain = project.process.contract.remain.calculation.amount.consumer - first;

    query = `INSERT INTO cardlist (name,phone,amount) VALUES ('${name}','${phone}','${String(remain)}');`;

    await mysqlQuery(query, { front: true });
    await this.mother.slack_bot.chat.postMessage({ text: `${name} 고객님의 카드 세팅을 완료하였습니다!`, channel: "#400_customer" });

  } catch (e) {
    console.log(e);
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
