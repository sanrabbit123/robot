const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js");
const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");

class DevContext extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }

  async main0() {
    let back = new BackMaker();
    // let client = await back.getClientById("c2010_aa35s");
    // console.log(client);
    // console.log(client.google);

    // let tong = await back.getLatestClients(5, { withTools: true });
    // console.log(tong);
    // console.log(await back.launching("project"));
    await back.launching("project");
  }

  async main1() {
    const fobot = new AiGraph();
    fobot.launching();
  }

  async injectPhotos(target) {
    const MONGOC = this.MONGOC;
    const collections = [
      "FP2_pordeta",
      "FR2_revdeta",
    ];

    let row, targetRow;
    let titles, keys;
    let keyStrings;
    let note, noteArr, updateArr;
    let number;
    let ifReview = false;
    let reviewMatrix;
    let qArr, aArr, qNumber, aNumber;
    let phototnumArr, reviewWordingkeyArr, reviewKeyStrings, reviewFinal;
    let reviewStartPoint, integration;

    row = await MONGOC.db("miro81").collection(collections[0]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { wordingtitle, wordingkey } = targetRow;

    titles = wordingtitle.split(' ');
    keys = wordingkey.split(' ');

    keyStrings = [ "1 - " + keys[0] ];
    for (let i = 1; i < keys.length; i++) {
      keyStrings.push(String(Number(keys[i - 1]) + 1) + " - " + keys[i]);
    }

    note = new AppleAPIs({ folder: "portfolio", subject: target });
    noteArr = await note.readNote();

    updateArr = [];
    number = 0;

    for (let i = 0; i < noteArr.length; i++) {

      if (noteArr[i] === "{photo}") {
        updateArr.push(keyStrings[number]);
        updateArr.push(titles[number]);
        number++;
      } else {
        updateArr.push(noteArr[i]);
      }

      if (/^re/.test(noteArr[i])) {
        ifReview = true;
      }

    }

    /* if review  */
    if (ifReview) {

      row = await MONGOC.db("miro81").collection(collections[1]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { revid, phototnum, wordingkey: reviewWordingkey } = targetRow;

      reviewMatrix = await this.getFromAiReview(revid);

      qArr = [];
      aArr = [];
      for (let i of reviewMatrix) {
        qNumber = 0;
        aNumber = 0;
        for (let j of i) {
          if (/^Q\./i.test(j)) {
            qNumber++;
          } else if (/\n\n/g.test(j)) {
            aNumber = ([ ...j.matchAll(/\n/g) ]).length / 2;
          }
        }
        qArr.push(qNumber);
        aArr.push(qNumber + Math.floor(aNumber));
      }

      phototnumArr = phototnum.split(' ');
      reviewWordingkeyArr = reviewWordingkey.split(' ');
      reviewKeyStrings = new Array(reviewWordingkeyArr.length);

      reviewFinal = [];

      for (let i = 0; i < reviewWordingkeyArr.length; i++) {
        reviewKeyStrings[i] = '';
        if (i === 0) {
          for (let j = 0; j < Number(reviewWordingkeyArr[i]); j++) {
            reviewKeyStrings[i] += phototnumArr[j] + ' ';
          }
        } else {
          for (let j = Number(reviewWordingkeyArr[i - 1]); j < Number(reviewWordingkeyArr[i]); j++) {
            reviewKeyStrings[i] += phototnumArr[j] + ' ';
          }
        }
        reviewKeyStrings[i] = reviewKeyStrings[i].slice(0, -1);
        reviewFinal.push(reviewKeyStrings[i]);
      }

      for (let i = 0; i < updateArr.length; i++) {
        if (/^re[0-9]/.test(updateArr[i])) {
          reviewStartPoint = i;
        }
      }

      integration = reviewStartPoint + 3;

      for (let i = 0; i < reviewFinal.length; i++) {
        updateArr.splice(integration, 0, reviewFinal[i]);
        integration = integration + (qArr[i] + aArr[i]) + 1;
      }

    }

    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br><br>'));

  }

  async appendOptions(target) {
    const MONGOC = this.MONGOC;
    const collections = [
      "FP1_porlist",
      "FP2_pordeta",
      "FR1_revlist",
      "FR2_revdeta",
    ];

    let row, targetRow;
    let model;
    let portfolioModel, reviewModel;
    let note, noteArr;
    let ifReview = false, reviewIndex = 0, reviewTitle = '';
    let apartMethod = "아파트 홈스타일링";
    let title;
    let apartArr, apartText, pyIndex;
    let updateArr, finalArr;
    let regionString, regionArr;


    row = await MONGOC.db("miro81").collection(collections[0]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { photodae_s, photodae_d, desid, region, method, key8, key9, tag } = targetRow;


    if (!/[시구]$/.test(region)) {
      regionArr = region.split(' ');
      if (/서울/.test(regionArr[0]) || /인천/.test(regionArr[0]) || /대전/.test(regionArr[0]) || /부산/.test(regionArr[0]) || /광주/.test(regionArr[0]) || /대구/.test(regionArr[0]) || /울산/.test(regionArr[0])) {
        regionString = region + "구";
      } else {
        regionString = region + "시";
      }
    } else {
      regionString = region;
    }

    row = await MONGOC.db("miro81").collection(collections[1]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { slide } = targetRow;

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

    if (/빌라/g.test(apartText)) {
       apartMethod = "빌라 홈스타일링";
    } else if (/타운하우스/g.test(apartText)) {
      apartMethod = "타운하우스 홈스타일링";
    } else if (/오피스텔/g.test(apartText)) {
      apartMethod = "오피스텔 홈스타일링";
    } else if (/주택/g.test(apartText)) {
      apartMethod = "주택 홈스타일링";
    }

    portfolioModel = [
      "_info",
      desid,
      "_portfolio",
      "_1",
      (subject + ", " + apartText + " " + "홈스타일링"),
      regionString,
      apartMethod,
      "_2",
      "세로 / 가로",
      (photodae_s + " " + photodae_d),
      "슬라이드",
      slide,
      "태그",
      tag,
      "서비스",
      method,
      "Key8",
      key8,
      "Key9",
      key9,
    ];

    for (let i = 0; i < noteArr.length; i++) {
      if (/^re[0-9]/.test(noteArr[i])) {
        ifReview = true;
        reviewIndex = i;
      }
    }

    if (ifReview) {

      reviewTitle = noteArr[reviewIndex + 1];

      row = await MONGOC.db("miro81").collection(collections[2]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { order_function } = targetRow;

      row = await MONGOC.db("miro81").collection(collections[3]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { photodae } = targetRow;

      reviewModel = [
        "_review",
        "_1",
        reviewTitle.split(', ')[1],
        "_2",
        "세로 / 가로",
        photodae,
        "순서",
        order_function,
      ];
      model = portfolioModel.concat(reviewModel);
    } else {
      model = portfolioModel;
    }

    updateArr = noteArr.concat(model);

    finalArr = [];

    for (let i of updateArr) {
      finalArr.push(i.replace(/\}$/g, ''));
    }

    console.log(finalArr);
    finalArr.shift();
    await note.updateNote(finalArr.join('<br><br><br>'));
  }

  async getFromAiReview(subject) {
    const app = new ContentsMaker();
    const { fileSystem, appleScript } = this.mother;
    try {
      let tempArr;
      let newWebLink, targetLink;
      let targetDetail, targetAis;
      let getTextScript;
      let response, responseArr;
      let finalTong = [];
      let titleName = "";

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";

      targetLink = `${newWebLink}/_Review/${subject}code/${subject}`;

      targetDetail = await fileSystem(`readDir`, [ targetLink ]);

      targetAis = [];
      for (let i of targetDetail) {
        if (/\.ai$/.test(i)) {
          if (!/^mo/.test(i)) {
            if (!/00\.ai$/.test(i)) {
              if (!/^title/.test(i)) {
                if (/word/.test(i)) {
                  targetAis.push(i);
                }
              }
            }
          }
        }
      }

      targetAis.sort((a, b) => { return Number(a.split('_')[1].replace(/\.ai$/, '')) - Number(b.split('_')[1].replace(/\.ai$/, '')) });

      for (let i = 0; i < targetAis.length; i++) {
        responseArr = await app.getTextFromAi(targetLink + "/" + targetAis[i]);
        finalTong.push(responseArr);
      }

      finalTong.shift();

      return finalTong;
    } catch (e) {
      console.log(e);
    }
  }

  async getFromAi(subject) {
    const app = new ContentsMaker();
    const { fileSystem, appleScript } = this.mother;
    try {
      let tempArr;
      let newWebLink, targetLink;
      let targetDetail, targetAis;
      let getTextScript;
      let response, responseArr;
      let finalTong = [];
      let titleName = "";

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";

      if (/^[ap]/i.test(subject)) {
        targetLink = `${newWebLink}/_PortfolioDetail/${subject}code/portp${subject}/svg`;
      } else {
        targetLink = `${newWebLink}/_Review/${subject}code/${subject}`;
      }

      targetDetail = await fileSystem(`readDir`, [ targetLink ]);

      targetAis = [];
      for (let i of targetDetail) {
        if (/\.ai$/.test(i)) {
          if (!/^mo/.test(i)) {
            if (!/00\.ai$/.test(i)) {
              if (!/^title/.test(i)) {
                if (/word/.test(i)) {
                  targetAis.push(i);
                }
              }
            }
          }
        }
      }

      targetAis.sort((a, b) => { return Number(a.split('_')[1].replace(/\.ai$/, '')) - Number(b.split('_')[1].replace(/\.ai$/, '')) });

      if (/^[ap]/i.test(subject)) {
        titleName = "title" + subject + ".ai";
      } else {
        titleName = "retitle" + subject + ".ai";
      }

      targetAis.unshift(titleName);
      console.log(targetAis);

      for (let i = 0; i < targetAis.length; i++) {
        responseArr = await app.getTextFromAi(targetLink + "/" + targetAis[i]);
        for (let j of responseArr) {
          finalTong.push(j.replace(/\n/g, '<br>'));
        }
      }

      finalTong.unshift(subject);

      return finalTong;
    } catch (e) {
      console.log(e);
    }
  }

  async getFromAiTitle(subject) {
    const app = new ContentsMaker();
    const { fileSystem, appleScript } = this.mother;
    try {
      let tempArr;
      let newWebLink, targetLink;
      let target;
      let targetDetail, targetAis;
      let getTextScript;
      let response, responseArr;
      let finalTong = [];
      let titleName = "";

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";

      if (/^[ap]/i.test(subject)) {
        target = `${newWebLink}/_PortfolioDetail/${subject}code/portivec${subject}.ai`;
      } else {
        target = `${newWebLink}/_Review/${subject}code/${subject}/name2${subject}.ai`;
      }

      console.log(target)

      responseArr = await app.getTextFromAi(target);

      return responseArr;
    } catch (e) {
      console.log(e);
    }
  }

  async intoDesigner() {
    const MONGOC = this.MONGOC;
    let obj;
    obj = {
      "designer": "박보영",
      "desid": "de046",
      "past_desid": "de046",
      "info": {
        "general": {
          "contractday": "2020-08-04",
          "contract": "완료",
          "phone": "010-5375-7526",
          "email": "selavi0426@naver.com",
          "web": "-",
          "sns": [],
          "showroom": "N",
          "address": [ "서울시 성북구 보문로35길 53, 202호" ]
        },
        "business": {
          "career": "2016년 10월",
          "classification": "프리랜서",
          "businessnumber": "",
          "bankname": [ "신한 110-313-869391" ],
          "fileexist": {
            "business_registration": "무",
            "bank_book": "유",
            "registration_card": "유"
          },
          "cashreceipt": "-"
        },
        "service": {
          "personality": "",
          "designstyle": [
            "모던",
            "내추럴",
            "글램",
            "트레디셔널",
            "빈티지",
            "스트릿",
            "인더스트리얼",
            "코지"
          ],
          "determinants": [
            "신진 디자이너",
            "경력 디자이너",
            "홈리에종과 협업 관계"
          ],
          "needs": "",
          "servicearea": "서울",
          "available": [
            "홈퍼니싱",
            "홈스타일링",
            "토탈스타일링",
            "온라인",
            "마감재",
            "기타공간"
          ],
          "technology": [
            "컨셉제안서",
            "캐드도면",
            "쉬운도면",
            "스케치업/3D",
            "제작가구",
            "패브릭"
          ],
          "furniture": "",
          "fabric": ""
        },
        "construction": {
          "longtext": "주 협력 시공업체 : __________split__________시공계약방식(고객이 직접/디자이너가 주도) : __________split__________시공팀 : __________split__________시공 상세 - 감리방식, A/S 처리 방식, 시공 계약 방식 : __________split__________"
        },
        "personal": {
          "longtext": "브랜드 명 : __________split__________프로젝트별 미팅 회수(스타일링 수정 횟수 / 미팅 횟수) : __________split__________스타일링 횟수 : __________split__________커뮤니케이션 방식 : __________split__________구매대행 여부 : __________split__________구매대행 설명 : __________split__________업무 프로세스 : __________split__________디자인비(개인으로 일할 때) - 방2+거실+현관+화장실 기준 : __________split__________결제방식(개인으로 일할 때) : __________split__________사진 촬영 방법(본인이 직접/포토그래퍼) : __________split__________주 홍보채널, 타 플랫폼 이용하는 것이 있다면?(웹사이트, 블로그, 인스타, 타플랫폼) : __________split__________추가 수익(제작가구/패브릭/구매대행 등) : "
        }
      },
      "picture": {
        "settings": [
          {
            "name": "기본 세팅 0",
            "value": [
              {
                "position": "0",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 66.5%;height: 66%;top: 0%;left: 0%;"
              },
              {
                "position": "1",
                "sgTrue": "s",
                "unionPo": "right",
                "styleText": "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
              },
              {
                "position": "2",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 0%;"
              },
              {
                "position": "3",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 33%;height: 33%;top: 67%;left: 33.5%;"
              },
              {
                "position": "4",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
              },
              {
                "description0": "NULL",
                "description1": "NULL",
                "description2": "NULL"
              }
            ]
          },
          {
            "name": "기본 세팅 1",
            "value": [
              {
                "position": "0",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 66.5%;height: 66%;top: 0%;left: 0%;"
              },
              {
                "position": "1",
                "sgTrue": "s",
                "unionPo": "right",
                "styleText": "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
              },
              {
                "position": "2",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 0%;"
              },
              {
                "position": "3",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 33%;height: 33%;top: 67%;left: 33.5%;"
              },
              {
                "position": "4",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
              },
              {
                "description0": "NULL",
                "description1": "NULL",
                "description2": "NULL"
              }
            ]
          },
          {
            "name": "기본 세팅 2",
            "value": [
              {
                "position": "0",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 66.5%;height: 66%;top: 0%;left: 0%;"
              },
              {
                "position": "1",
                "sgTrue": "s",
                "unionPo": "right",
                "styleText": "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
              },
              {
                "position": "2",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 0%;"
              },
              {
                "position": "3",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 33%;height: 33%;top: 67%;left: 33.5%;"
              },
              {
                "position": "4",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
              },
              {
                "description0": "NULL",
                "description1": "NULL",
                "description2": "NULL"
              }
            ]
          },
          {
            "name": "기본 세팅 3",
            "value": [
              {
                "position": "0",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 66.5%;height: 66%;top: 0%;left: 0%;"
              },
              {
                "position": "1",
                "sgTrue": "s",
                "unionPo": "right",
                "styleText": "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
              },
              {
                "position": "2",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 0%;"
              },
              {
                "position": "3",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 33%;height: 33%;top: 67%;left: 33.5%;"
              },
              {
                "position": "4",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
              },
              {
                "description0": "NULL",
                "description1": "NULL",
                "description2": "NULL"
              }
            ]
          },
          {
            "name": "기본 세팅 4",
            "value": [
              {
                "position": "0",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 66.5%;height: 66%;top: 0%;left: 0%;"
              },
              {
                "position": "1",
                "sgTrue": "s",
                "unionPo": "right",
                "styleText": "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
              },
              {
                "position": "2",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 0%;"
              },
              {
                "position": "3",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 33%;height: 33%;top: 67%;left: 33.5%;"
              },
              {
                "position": "4",
                "sgTrue": "g",
                "unionPo": "union",
                "styleText": "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
              },
              {
                "description0": "NULL",
                "description1": "NULL",
                "description2": "NULL"
              }
            ]
          }
        ],
        "ghost": []
      }
    };
    await MONGOC.db(`miro81`).collection(`Designer`).insertOne(obj);
    obj = {
      a1_relation: '협약 완료',
      a2_contractday: '2020-08-04',
      a3_contract: '완료',
      a4_desid: 'de046',
      a5_name: '박보영',
      b2_phone: "010-5375-7526",
      b3_email: "selavi0426@naver.com",
      b1_web: '-',
      b4_sns: '블로그 - / 인스타 - / 기타 -',
      b7_showroom: 'N',
      b5_address: "서울시 성북구 보문로35길 53, 202호",
      b6_career: "2016년 10월",
      c1_fees: '',
      c2_classification: '프리랜서',
      c3_businessnumber: '',
      c4_bankname: "신한 110-313-869391",
      c5_accountnumber: '사업자등록증 - / 통장사본 - / 민증사본 -',
      c6_cashreceipt: '',
      d1_personality: '',
      d2_designstyle: '모던,내추럴,글램,트레디셔널,빈티지,스트릿,인더스트리얼,코지',
      d3_determinants: '신진 디자이너,경력 디자이너,홈리에종과 협업 관계',
      d4_needs: '',
      e1_servicearea: '',
      e2_available: '홈퍼니싱,홈스타일링,토탈스타일링,온라인,마감재,기타공간',
      e3_technology: '컨셉제안서,캐드도면,쉬운도면,스케치업/3D,제작가구,패브릭',
      e4_furniture: '',
      e5_fabric: '',
      e6_construction: '주 협력 시공업체 : __________split__________시공계약방식(고객이 직접/디자이너가 주도) : __________split__________시공팀 : __________split__________시공 상세 - 감리방식, A/S 처리 방식, 시공 계약 방식 : __________split__________',
      f1_designerinfo: '브랜드 명 : __________split__________프로젝트별 미팅 회수(스타일링 수정 횟수 / 미팅 횟수) : __________split__________스타일링 횟수 : __________split__________커뮤니케이션 방식 : __________split__________구매대행 여부 : __________split__________구매대행 설명 : __________split__________업무 프로세스 : __________split__________디자인비(개인으로 일할 때) - 방2+거실+현관+화장실 기준 : __________split__________결제방식(개인으로 일할 때) : __________split__________사진 촬영 방법(본인이 직접/포토그래퍼) : __________split__________주 홍보채널, 타 플랫폼 이용하는 것이 있다면?(웹사이트, 블로그, 인스타, 타플랫폼) : __________split__________추가 수익(제작가구/패브릭/구매대행 등) : '
    };
    await MONGOC.db(`miro81`).collection(`BD2_deslist`).insertOne(obj);
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

  async reviveText(porlid) {
    const dir = `${process.cwd()}/apps/contentsMaker/resource`;
    const target = dir + "/" + porlid + ".js";
    const targetJson = require(target);
    let newArr = [];
    let note, noteArr;
    let photoKeyNum;
    let photoString;

    note = new AppleAPIs({ folder: "portfolio", subject: porlid });
    noteArr = await note.readNote();

    const { contents } = targetJson;

    newArr.push(porlid);
    newArr.push(noteArr[1]);
    newArr.push(targetJson.title);

    photoKeyNum = 1;
    for (let { photo_key, title, main_contents, smalltalk_yn, smalltalk_contents } of contents) {
      if (title === "init") {
        newArr.push(main_contents.replace(/\n/g, "<br>"));
        if (smalltalk_yn !== "") {
          newArr.push(smalltalk_yn);
          newArr.push(smalltalk_contents.replace(/\n/g, "<br>"));
        }
      } else {
        newArr.push(String(photoKeyNum) + " - " + String(photo_key));
        photoKeyNum = photo_key + 1;

        newArr.push(title);
        newArr.push(main_contents.replace(/\n/g, "<br>"));
        if (smalltalk_yn !== "") {
          newArr.push(smalltalk_yn);
          newArr.push(smalltalk_contents.replace(/\n/g, "<br>"));
        }

      }
    }

    const { sub_titles: { rev_main_title }, r_id, reviews } = targetJson;
    if (r_id !== "re999") {

      newArr.push(r_id);
      newArr.push(rev_main_title.replace(/\n/g, ", "));

      for (let { type, photos, contents } of reviews) {
        if (type === "init") {
          for (let { quest, answer } of contents) {
            newArr.push(answer.replace(/\n/g, "<br>"))
          }
        } else {
          photoString = '';
          for (let i of photos) {
            photoString += String(i) + ' ';
          }
          photoString = photoString.slice(0, -1);

          newArr.push(photoString);
          for (let { quest, answer } of contents) {
            newArr.push("Q. " + quest.replace(/\n/g, "<br>"))
            newArr.push(answer.replace(/\n/g, "<br>"))
          }
        }
      }

    }

    const { sub_titles: { portivec: { sub, region, method } }, designer, p_info: { photodae, slide, tag, service, key8, key9 } } = targetJson;

    newArr.push("_info");
    newArr.push(designer);
    newArr.push("_portfolio");
    newArr.push("_1");
    newArr.push(sub);
    newArr.push(region);
    newArr.push(method);
    newArr.push("_2");
    newArr.push("세로 / 가로");
    newArr.push(String(photodae[0]) + " " + String(photodae[1]));
    newArr.push("슬라이드");
    newArr.push(slide);
    newArr.push("태그");
    newArr.push(tag);
    newArr.push("서비스");
    newArr.push(service);
    newArr.push("Key8");
    newArr.push(key8);
    newArr.push("Key9");
    newArr.push(key9);

    if (r_id !== "re999") {

      const { sub_titles: { rev_name_card: { main: reviewSubTitle } }, r_info: { photodae: reviewPhotodae, order } } = targetJson;
      newArr.push("_review");
      newArr.push("_1");
      newArr.push(reviewSubTitle.replace(/\n/g, ", "));
      newArr.push("_2");
      newArr.push("세로 / 가로");
      newArr.push(String(reviewPhotodae[0]) + " " + String(reviewPhotodae[1]));
      newArr.push("순서");
      newArr.push(String(order));

    }

    console.log(newArr);
    newArr.shift();
    await note.updateNote(newArr.join('<br><br><br>'));

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


  async launching() {
    const instance = this;
    try {
      let temp, temp2;

      await this.MONGOC.connect();

      // await this.main0();
      // await this.main1();

      // {
      //   let targets = [
      //     "p39",
      //   ];
      //
      //   for (let i of targets) {
      //     await this.injectPhotos(i);
      //   }
      // }

      async function a(targets) {
        let exceptions = [
          "p11",
          "a71",
          "a18",
        ];
        for (let i of targets) {
          temp2 = false;
          temp = await instance.titleVerification(i);
          for (let j in temp.boo) {
            if(!temp.boo[j]) { temp2 = true; }
          }
          if (temp2) {
            if (!exceptions.includes(temp.porlid)) {
              console.log(temp);
            }
          }
        }
      }

      let pReturnTargets = [
        "p33",
        "p34",
        "p35",
        "p36",
        "p37",
        "p38",
        "p39",
        "p40",
        "p41",
        "p42",
        "p43",
      ];
      let aReturnTargets = [
        "a75",
        "a74",
        "a73",
        "a72",
        "a71",
        "a70",
        "a69",
      ];
      let aTargets = [
        "a68",
        "a67",
        "a66",
        "a64",
        "a62",
        "a61",
        "a60",
        "a59",
        "a58",
        "a57",
        "a56",
        "a55",
        "a54",
        "a53",
        "a51",
        "a49",
        "a47",
        "a45",
        "a44",
        "a43",
        "a41",
        "a39",
        "a38",
        "a37",
        "a36",
        "a35",
        "a34",
        "a33",
        "a32",
        "a31",
        "a30",
        "a27",
        "a26",
        "a25",
        "a24",
        "a22",
        "a20",
        "a18",
        "a17",
        "a16",
        "a14",
        "a13",
        "a12",
        "a10",
        "a09",
        "a08",
        "a05",
        "a04",
        "a01",
      ];
      let pTargets = [
        "p32",
        "p31",
        "p30",
        "p29",
        "p27",
        "p26",
        "p25",
        "p24",
        "p23",
        "p22",
        "p21",
        "p20",
        "p19",
        "p18",
        "p17",
        "p16",
        "p15",
        "p14",
        "p13",
        "p12",
        "p11",
        "p10",
        "p09",
        "p08",
        "p07",
        "p06",
      ];

      // await a(pTargets);


      let app;

      for (let i of aTargets) {
        app = new ResourceMaker(i);
        await app.launching();
      }

      for (let i of pTargets) {
        app = new ResourceMaker(i);
        await app.launching();
      }




      // for (let i of pTargets) {
      //   await this.reviewVerification(i);
      // }

      // await this.spellCheck("p57");
      // await this.intoDesigner();
      // await this.getGoogleWriteJson();

    } catch (e) {
      console.log(e);
    } finally {
      this.MONGOC.close();
    }
  }

}

module.exports = DevContext;
