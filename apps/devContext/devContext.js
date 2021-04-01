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

const DevContext = function () {
  this.mother = new Mother();
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    const back = new BackMaker();
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


    // console.log(ghostMap);


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
    // await this.aspirantToDesigner();


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("p88");


  } catch (e) {
    console.log(e);
  } finally {
    this.MONGOC.close();
    this.MONGOLOCALC.close();
    console.log(`done`);
  }
}

DevContext.prototype.spellCheck = async function (porlid) {
  const instance = this;
  try {
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
      [ "박선영", "2021-03-23" ],
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
      await contents.tempLaunching(`${tempFolder}/${fileName}`);
    } else {
      temp = new Function(finalString);
      temp();
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = DevContext;
