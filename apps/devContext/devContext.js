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
const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);

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

    return (a + b);
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

    return (a + b + c + d);
  }

  async getProposalEa() {
    const MONGOC = this.MONGOC;

    let p = await MONGOC.db(`miro81`).collection(`Project`).find({}).toArray();

    let finalTong = [];
    let client, designer;

    for (let { cliid, service, proposal } of p) {
      client = (await MONGOC.db(`miro81`).collection(`BC1_conlist`).find({ a4_customernumber: cliid }).toArray())[0];
      for (let i of proposal) {
        designer = (await MONGOC.db(`miro81`).collection(`Designer`).find({ past_desid: i.desid }).toArray())[0];
        for (let j of i.fee) {
          finalTong.push([ designer.designer, service, String(j.money) + "원", client.a24_pyeong, String(Math.round(Number(j.money) / Number(client.a24_pyeong.replace(/[^0-9\.]/g, '')))) + "원", client.a19_name ]);
        }
      }
    }

    const sheet = new GoogleSheet();
    const sheetTarget = { id: "1ORC0CAcKn0y7VoEwR1S2_gLoyaO5p_cwX-YLuRqexco", sheet: "1022", xyz: [ 0, 1 ] };
    await sheet.update_value_inPython(sheetTarget.id, sheetTarget.sheet, finalTong, sheetTarget.xyz);


    return "done";
  }

  async googlePythonTest() {
    const analytics = new GoogleAnalytics();
    const clients = await analytics.getClientsInfoByNumber(1);
    console.log(clients);
  }

  async launching() {
    const instance = this;
    const { fileSystem, shell, shellLink } = this.mother;
    try {
      let temp, temp2;

      await this.MONGOC.connect();

      // await this.main0();
      // await this.main1();

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
        "a41",
        "a39",
        "a38",
        "a37",
        "a36",
        "a35",
        "a34",
        "a33",
        "a32",
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
        "a10",
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
      ];

      // let app;
      //
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

      const app = new BackMaker();
      app.launching("contents");



      // TOOLS ----------------------------------------------------

      // await this.spellCheck("p57");
      // await this.intoDesigner();
      // await this.getGoogleWriteJson();
      // await this.googlePythonTest();

    } catch (e) {
      console.log(e);
    } finally {
      this.MONGOC.close();
    }
  }

}

module.exports = DevContext;
