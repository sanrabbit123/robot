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

  async grammerCheck() {
    const { requestSystem } = this.mother;
    const app = new NaverAPIs();
    console.log(await app.spellChecker());


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

  async launching() {
    try {
      // await this.MONGOC.connect();

      // await this.main0();
      // await this.main1();

      await this.grammerCheck();

      // await this.intoDesigner();
      // await this.getGoogleWriteJson();

    } catch (e) {
      console.log(e);
    } finally {
      // this.MONGOC.close();
    }
  }

}

module.exports = DevContext;
