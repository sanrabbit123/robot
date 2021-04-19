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
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();

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
                    "실측 체크리스트",
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
                    "디자인 제안 체크",
                    "시공 체크",
                    "제작 체크",
                    "세팅 체크",
                    "기타 문의 사항",
                    "마무리 확정"
                  ]
                }
              },
              designer: {
                name: "프로세스 정산 안내",
                composition: {
                  contents: [
                    "고객 확정 및 정산 안내",
                    "정산 금액 안내"
                  ]
                }
              }
            },
          ]
        }
      ]
    };


    // const projects = await back.getProjectsByQuery({ $and: [ { desid: { $regex: "^d" } } ] });
    // let tempArr;
    // let target;
    // let total, num;
    //
    // num = 0;
    // total = 0;
    // for (let p of projects) {
    //   if (p.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
    //     tempArr = p.proposal.detail;
    //     for (let obj of tempArr) {
    //       if (obj.desid === p.desid) {
    //         target = obj.fee;
    //         break;
    //       }
    //     }
    //     if (target[0].amount !== 0) {
    //       total += (target[0].amount * 1.1);
    //       num++;
    //     }
    //   }
    // }
    //
    // console.log(total, num)
    // console.log(total / num)



















    // designer analytics
    // const desid = "d2104_aa09s";
    // const fileName = (process.cwd() + "/temp/" + desid + ".json");
    // const analytics = JSON.parse(await fileSystem(`readString`, [ fileName ]));
    // let whereQuery, updateQuery;
    // whereQuery = { desid };
    // updateQuery = {};
    // updateQuery["analytics"] = analytics;
    // await back.updateDesigner([ whereQuery, updateQuery ]);

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


    // get drive folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1l9pzk9U5uBhYLp0b-lP-bnpUP1E3icC1");


    // naverBlog to json
    // const blog = new NaverBlogParsing();
    // await blog.blogToJson();


    // spawn catfish
    // const app = new SpawnCatfish();
    // await app.spawnLaunching(false);


    // contents upload
    // const client = "서현";
    // const pid = "p75";
    // const rid = "re069";
    // const links = [
    //   "https://docs.google.com/document/d/17bN6cOmStr9x16FPuui6AZ79PcTFBhE0a4SkKUcNX28/edit?usp=sharing",
    //   "https://docs.google.com/document/d/1hlk59o2D-bDXvz8-FDeIon0vOvfo7syxCF4zc-vvqjU/edit?usp=sharing",
    //   "https://drive.google.com/drive/folders/1kc_Rn9aMlzg3Gq41g6SZTH51oHSirOvk?usp=sharing",
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
    // await filter.additionalRepair("a81", 5);


    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: "나원채",
    //     designer: "김경수",
    //     pid: "p113",
    //     link: "https://drive.google.com/drive/folders/1Uw14NDZ9OBgR6DDgwaDhSQBVhaw_19xL",
    //   },
    //   {
    //     client: "이명서",
    //     designer: "우다미",
    //     pid: "p114",
    //     link: "https://drive.google.com/drive/folders/1dNTdLk0p6gt-2aLLCfN7FS0afWo3a-RZ",
    //   }
    // ]);


    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1WSNtDJ5MGyLms0AkF4PqJfLje3kcUWjq", "p110");


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("a81");


    // get corePortfolio by pid
    // await this.getCorePortfolio("a81");


    // aspirant to designer
    // await this.aspirantToDesigner();


    // new designer to front web
    // await work.newDesignerToFront([ "d2104_aa09s" ]);


    // new designer set proposal setting
    // await this.setProposalSettingForDesigner("d2104_aa09s", [
    //   { porlid: "a81", index: 3 },
    //   { porlid: "a81", index: 6 },
    //   { porlid: "a81", index: 14 },
    //   { porlid: "a81", index: 19 },
    //   { porlid: "a81", index: 21 },
    //   { porlid: "a81", index: 1 }
    // ], [
    //   "공간의 톤앤매너를 중요하게 생각하며 모던하면서 간결한 스타일링을 추구합니다.",
    //   "보기에만 좋은 디자인이 아니라 유지 보수와 사용자 편의에 맞춘 요소들을 반영합니다.",
    //   "고객에 맞춰 조정하는 편이지만 전문가 입장에서 적극 리드하는 경우가 있을 수 있습니다."
    // ]);


    // new designer alarm
    // let targetArr, channel, desid, designer, pid, webLinks;
    // channel = "#200_web";
    // targetArr = [
    //   { designer: "박정훈", desid: "de056", pid: "a81" },
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

  } catch (e) {
    console.log(e);
  } finally {
    this.MONGOC.close();
    this.MONGOLOCALC.close();
    console.log(`done`);
    process.exit();
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

DevContext.prototype.aspirantToDesigner = async function () {
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    const nameList = [
      [ "박정훈", "2021-03-05" ],
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
        finalString += tempString;
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
