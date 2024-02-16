const KakaoTalk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.human = new HumanPacket();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.userid = "hliaison";
  this.apikey = "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2";
  this.senderkey = "dd2f3f0b034a044b16531e5171cbcc764fb716eb";
  this.senderPhone = "0220392252";
  this.plusId = "@홈리에종";
  this.channelId = "_vxixkjxl";
  this.ip = {
    office: address.officeinfo.ip.outer,
    console: address.backinfo.ip.outer,
    front: address.frontinfo.ip.outer,
    python: address.pythoninfo.ip.outer,
    test: address.testinfo.ip.outer,
    second: address.secondinfo.ip.outer,
    member: address.memberinfo.ip.outer,
    home: address.homeinfo.ip.outer,
    contents: address.contentsinfo.ip.outer,
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office, 'gi'),
    console: new RegExp(this.ip.console, 'gi'),
    front: new RegExp(this.ip.front, 'gi'),
    python: new RegExp(this.ip.python, 'gi'),
    test: new RegExp(this.ip.test, 'gi'),
    second: new RegExp(this.ip.second, 'gi'),
    member: new RegExp(this.ip.member, 'gi'),
    home: new RegExp(this.ip.home, 'gi'),
    contents: new RegExp(this.ip.contents, 'gi'),
  };
  this.token = {
    office: "19f2758a0c19d66e8b13d5e461dde9da32c489caac0dbef9ade4a2c0f19c631b96aab4762f14d5d082170acf4e5c730426d04d55db96509e0316746708a609a5otJbdbQibEhdisvCzCJWi0Kk8/RnnW1dkQ/9bLHA4u9Jg9uf/C4QTB/KQyeThZPS2fyNn4SkOUDPsSuRtvUgRQ==",
    console: "d1f471de2a51dcb274c03b667d76d32b6565e26f5ef7b52401ed03721396f8e61bc451c969fe886d47d082a3a22b443b5b031941c67459569dc0ce7afc82e6d7isk4rc0u02hPvi6/qyLQSUN0tCd8DJLnaTSHoo82y2Ke+Dzap1E0Yc9aW6mmXBeBKqsko9TDKKLtg/gwYBw4Dg==",
    python: "fa00d602d8ea0175ea5a589a6a34c194dd366052753b4b104e747013f56cf5bd94cfab495a16b9b0fd3ef3f86e69f365be7062bacdd20dcd0062457f2b06caf5ovKj6SnKOw/DkqgyO17cGsk6eevDREWlyd/i+8ly2gYowpHD2Xn6Lj84hYQxce+KDNeleQZyEbeonIhDSk+YGA==",
    test: "653405233f47846d8a0e221cec348fc9a6ba51b807c5b76cfb0673ab331b6d9007563b912651867b91fed1a6152a67eb00bd6219e97f6ee59b679336f7da06e9+0VRj06cXafvqvU3XP0m0vocW2tFb7wpwIB84vkv/s7L77hgPt6Ux3TOB+IXe7yt1i4zal4l3FGzI04Cjpt7Ew==",
    second: "9441912be335e0b6f3aac79f23e3bd89ca28b14122e750134776dbb9c854593eb05ed4103d28f3330f2fa94d796a819ef80a30f5a975e7bbb5aad3e4e0934ef0387JtpG29I4l0Xt7TcnYvErqhYDJQCBPphM9T0FORwRpUa4v3opf2NSpf9c1fD1RI4BzacBTFIwDG9nggJWIbg=='",
    member: "3fc7a22411a09c30a9005dce3b193747cf769b28898aec31f25bcf68b7a076e9d7850de48db2b3113c1307c89d4abb026fe3b78d8961dfec48b5c1e75389ed52q5WJ0ImIn3u0RmcpwapwAZm50j1ih+ujbczXTGicaUAydjRrz13vQQLSqGHRf5/d6mUWLETApyQTHimChdwfEg==",
    home: "2710d2e2b79073731654a7076ea570de1882908d07f457949b886693a2e4710a7c61c8ab06e8659e556281d9957f768a954cf01984e2e7eaee53b25e9a141aaaFVL2HoN4bAweiJGM54/q/9bBS63kPEVcZ3ok+wrfgwlpDyi3L/5KBUlrwZzWfg4RGqXah3twFCdhIXfikW98ow==",
    contents: "5db4dd1e3c461d9fb09d5c0b39300bc9e9429f8aad4e0970918a64bf1170367fbe45754c43debd0b8f1d64552e112dabf04345e4329b99fbf963d54cf3c9dc7bcSFfFyGGBHbaQCsoTkLNeOrr5ln3UZiHt8tMzeeozF48rKeaAgtyvVsCh/oBNjBv/I9aK7f3Nr0ljQoffKeKqw==",
  };
  this.authObj = {};
  this.message = {};
  this.dir = process.cwd() + "/apps/kakaoTalk";
  this.tokenDir = this.dir + "/token";
  this.accessTokenPath = this.tokenDir + "/access_token.txt";
  this.refreshTokenPath = this.tokenDir + "/refresh_token.txt";
  this.moment = {
    adsId: "608725",
    apiKey: "7c646aef29f8c1a06c13e1af68c9a54c",
    baseUrl: "https://apis.moment.kakao.com/openapi",
    version: "v4",
    redirectUri: "https://home-liaison.net/kakaoRedirect",
    codeTarget: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7c646aef29f8c1a06c13e1af68c9a54c&redirect_uri=https%3A%2F%2Fhome-liaison.net%2FkakaoRedirect",
  }
}

KakaoTalk.prototype.generateToken = async function () {
  try {
    const { data } = await this.mother.requestSystem("https://kakaoapi.aligo.in/akv10/token/create/1/y/", {
      apikey: this.apikey,
      userid: this.userid
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.setAuth = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  try {
    this.authObj.apikey = this.apikey;
    this.authObj.userid = this.userid;
    this.authObj.senderkey = this.senderkey;

    const { data } = await requestSystem("https://" + address.pythoninfo.host + ":3000");

    if (this.ipRegExp.office.test(data.trim())) {
      this.authObj.token = this.token.office;
    } else if (this.ipRegExp.console.test(data.trim())) {
      this.authObj.token = this.token.console;
    } else if (this.ipRegExp.python.test(data.trim())) {
      this.authObj.token = this.token.python;
    } else if (this.ipRegExp.test.test(data.trim())) {
      this.authObj.token = this.token.test;
    } else if (this.ipRegExp.second.test(data.trim())) {
      this.authObj.token = this.token.second;
    } else if (this.ipRegExp.member.test(data.trim())) {
      this.authObj.token = this.token.member;
    } else if (this.ipRegExp.home.test(data.trim())) {
      this.authObj.token = this.token.home;
    } else if (this.ipRegExp.contents.test(data.trim())) {
      this.authObj.token = this.token.contents;
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

KakaoTalk.prototype.getTemplate = async function () {
  const instance = this;
  const { requestSystem } = this.mother;
  try {

    await this.setAuth();

    const response = await requestSystem("https://kakaoapi.aligo.in/akv10/template/list/", this.authObj);
    const { data } = response;
    const { list } = data;
    let tong;
    tong = {};
    for (let i of list) {
      tong[i.templtCode] = {};
      for (let j in i) {
        tong[i.templtCode][j] = i[j];
      }
    }
    return tong;
  } catch (e) {
    console.log(e);
    return null;
  }
}

KakaoTalk.prototype.templateTong = function (target) {
  const tong = {
    "photo": {
      "name": "사진 전송 완료 안내",
      "id": "TC_1179",
      "needs": [],
      "convert": "function (obj) {\n        return []\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{고객명}님!\n보내주신 사진은 #{고객명}님 이름으로 등록 완료되었습니다 :)\n\n해당 사진 확인 후, 영업일 기준 2일 안에 전화드리겠습니다. 감사합니다!",
        "templtName": "사진 전송 완료 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2020-09-03 12:06:21",
        "templtCode": "TC_1179",
        "comments": [
          {
            "cdate": "2020-09-03 14:13:41",
            "name": "검수자",
            "id": "1009053",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2020-09-03 14:13:41",
            "status": "APR"
          }
        ]
      }
    },
    "complete": {
      "name": "신청 완료 안내",
      "id": "TC_1244",
      "needs": [],
      "convert": "function (obj) {\n        return []\n      }"
    },
    "certification": {
      "name": "인증카톡",
      "id": "TC_9600",
      "needs": [
        "company",
        "certification"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"회사명\", to: obj.company },\n          { from: \"고객명\", to: obj.name },\n          { from: \"인증번호\", to: obj.certification }\n        ];\n      }",
      "raw": {
        "templtContent": "[#{회사명}] 안녕하세요! #{고객명}님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : #{인증번호}\n\n인증번호를 팝업창에 입력해주세요!",
        "templtName": "인증카톡",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2020-12-16 01:49:51",
        "templtCode": "TC_9600",
        "comments": [
          {
            "cdate": "2020-12-16 10:29:15",
            "name": "검수자",
            "id": "1133488",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2020-12-16 10:29:15",
            "status": "APR"
          }
        ]
      }
    },
    "stylingForm": {
      "name": "스타일링 계약 서명 요청",
      "id": "TG_5277",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 홈스타일링 계약서를 widsign을 통해 보내드렸습니다!\n\n체크박스가 있는 내용은 꼭 확인해주시고, 마지막 서명까지 부탁드립니다.\n보시다 문의사항 있으시면 알려주시고요!\n\n감사합니다 :)",
        "templtName": "스타일링 계약 서명 요청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-11-19 14:19:02",
        "templtCode": "TG_5277",
        "comments": [
          {
            "cdate": "2021-11-19 16:04:42",
            "name": "검수자",
            "id": "1639422",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-11-19 16:04:42",
            "status": "APR"
          }
        ]
      }
    },
    "constructForm": {
      "name": "시공 계약 서명 요청",
      "id": "TG_5279",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 홈리에종 시공 계약서를 widsign을 통해 보내드렸습니다!\n\n체크박스가 있는 내용은 꼭 확인해주시고, 마지막 서명까지 부탁드립니다.\n보시다 문의사항 있으시면 알려주시고요!\n\n감사합니다 :)",
        "templtName": "시공 계약 서명 요청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-11-19 14:19:53",
        "templtCode": "TG_5279",
        "comments": [
          {
            "cdate": "2021-11-19 16:04:56",
            "name": "검수자",
            "id": "1639426",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-11-19 16:04:56",
            "status": "APR"
          }
        ]
      }
    },
    "designerPartnership": {
      "name": "파트너십 신청",
      "id": "TD_5890",
      "needs": [],
      "convert": "function (obj) {\n        return []\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{고객명}님!\n작성하신 파트너십 신청서는 접수 완료되었습니다 :)\n\n추가적인 포트폴리오 발송은\n아래 링크에서 성함과 전화번호와 함께 보내주시면, 검토 후 확인 연락드리겠습니다.",
        "templtName": "파트너십 신청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [
          {
            "ordering": "1",
            "name": "포트폴리오 전송",
            "linkType": "WL",
            "linkTypeName": "웹링크",
            "linkMo": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkPc": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkIos": "",
            "linkAnd": ""
          }
        ],
        "cdate": "2021-02-16 10:24:04",
        "templtCode": "TD_5890",
        "comments": [
          {
            "cdate": "2021-02-16 14:29:15",
            "name": "검수자",
            "id": "1210765",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-02-16 14:29:15",
            "status": "APR"
          }
        ]
      }
    },
    "designerPresentation": {
      "name": "설명회 신청 수정",
      "id": "TD_5891",
      "needs": [],
      "convert": "function (obj) {\n        return []\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{고객명}님!\n홈리에종 디자이너 파트너십 설명회에 신청해주셔서 감사합니다 :)\n\n추가적인 포트폴리오 발송은\n아래 링크에서 성함과 전화번호와 함께 보내주시면, 검토 후 확인 연락드리겠습니다.",
        "templtName": "설명회 신청 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [
          {
            "ordering": "1",
            "name": "포트폴리오 전송",
            "linkType": "WL",
            "linkTypeName": "웹링크",
            "linkMo": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkPc": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkIos": "",
            "linkAnd": ""
          }
        ],
        "cdate": "2021-02-16 10:25:04",
        "templtCode": "TD_5891",
        "comments": [
          {
            "cdate": "2021-02-16 14:29:07",
            "name": "검수자",
            "id": "1210763",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-02-16 14:29:07",
            "status": "APR"
          }
        ]
      }
    },
    "designerPresentationAlarm": {
      "name": "신청자 미팅 안내",
      "id": "TG_4335",
      "needs": [
        "designer",
        "date"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"date\", to: obj.date }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다. 디자이너 미팅 시간과 주소 안내차 연락을 드렸어요.\n\n- 일시 : #{date}\n- 장소 : 서울 창업허브 성수 (서울 성동구 성수이로 22길 37 4층)\n\n※ 지하에 1~2시간 무료 주차가 가능합니다. 미팅을 마치신 후, 주차권을 전달드리겠습니다.\n※ 혹시 참석여부에 변동 사항이 있으시면 꼭! 연락을 부탁드려요. 감사합니다 :)\n\nP : 02-2039-2252\nK : @홈리에종\nE : help@home-liaison.com\nH : home-liaison.com",
        "templtName": "신청자 미팅 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-11-11 22:28:15",
        "templtCode": "TG_4335",
        "comments": [
          {
            "cdate": "2021-11-12 11:38:16",
            "name": "검수자",
            "id": "1627056",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-11-12 11:38:16",
            "status": "APR"
          }
        ]
      }
    },
    "portfolioFail": {
      "name": "포트폴리오 전송 실패 안내",
      "id": "TD_7334",
      "needs": [],
      "convert": "function (obj) {\n        return []\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{고객명} 디자이너님.\n홈리에종입니다!\n\n전송해주신 포트폴리오 파일이 너무 커 파일 전송에 실패하였습니다. 100MB 이하의 pdf로 정리해주셔서 다시 보내주시거나,\n\n클라우드에 저장 후 링크로 공유해주시면 감사드리겠습니다 :)",
        "templtName": "포트폴리오 전송 실패 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [
          {
            "ordering": "1",
            "name": "포트폴리오 전송",
            "linkType": "WL",
            "linkTypeName": "웹링크",
            "linkMo": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkPc": "https://home-liaison.com/desevent.php?mode=portfolio",
            "linkIos": "",
            "linkAnd": ""
          }
        ],
        "cdate": "2021-03-02 10:05:10",
        "templtCode": "TD_7334",
        "comments": [
          {
            "cdate": "2021-03-02 15:31:17",
            "name": "검수자",
            "id": "1231909",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-03-02 15:31:17",
            "status": "APR"
          }
        ]
      }
    },
    "designerCheckList": {
      "name": "체크리스트 진짜 최종 수정",
      "id": "TJ_8591",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.name },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님. 홈리에종입니다 :)\n\n홈리에종이 실장님들을 더 잘 이해하고, \n더 적합한 고객을 연결시켜드리기 위해, 체크리스트를 전송해드리고자 합니다.\n\n아래 첨부한 링크를 통해 들어가실 수 있으며, 설명드렸던 항목만 간단히 체크해주시면 됩니다 :)\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "체크리스트 진짜 최종 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-08-31 11:59:26",
        "templtCode": "TJ_8591",
        "comments": []
      }
    },
    "designerProposal": {
      "name": "제안서 발송 수정 수정 수정 수정",
      "id": "TJ_3701",
      "needs": [
        "client",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자이너 추천서 보내드립니다.\n\n고객님께서 기입해주신 정보 [주소, 일정, 서비스 유형 등] 를 기준으로 현재 시점에서 적합한 디자이너를 큐레이션하였습니다.\n\n영업일 기준 2일 이내로 홈리에종 담당자가 디자이너 추천서 리뷰를 위해 전화를 드릴 예정이오니 잠시만 기다려주세요 :)\n\n* 디자이너 추천서\nhttps://#{host}/#{path}.php?proid=#{proid}",
        "templtName": "제안서 발송 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-07-15 08:50:57",
        "templtCode": "TJ_3701",
        "comments": []
      }
    },
    "outOfDesignerProposal": {
      "name": "제안서 발송 부재중 수정",
      "id": "TJ_3702",
      "needs": [
        "client",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 :)\n발송해드린 디자이너 추천서에 대한 안내를 위해 연락드렸으나, 통화가 어려우신 듯하여 메세지 남겨 드립니다.\n\n제안서 피드백 통화를 통해 궁금한 정보를 확인하고, 나에게 더 적합한 디자이너를 함께 선택할 수 있어요~!\n\n02-2039-2252로 전화주시거나, 홈리에종 카카오 채널을 통해 통화 가능 시간을 남겨주시면, 확인 후 연락드리겠습니다!\n\n* 디자이너 추천서\nhttps://#{host}/#{path}.php?proid=#{proid}",
        "templtName": "제안서 발송 부재중 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-07-15 08:52:20",
        "templtCode": "TJ_3702",
        "comments": []
      }
    },
    "designerSelect": {
      "name": "고객 디자이너 선택 최종 수정 수정",
      "id": "TN_1999",
      "needs": [
        "client",
        "designer",
        "host",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님.\n#{designer} 디자이너를 선택하셨군요!\n\n디자이너와 함께하면 내 마음에 쏙 드는 우리 집을 만나게 되실 거에요! 프로젝트 진행을 위해 계약금 안내드립니다 :)\n\n계약금은 전체 디자이너 비용에 포함되는 금액으로, 디자이너와의 현장 미팅 및 디자이너 일정 예약을 위해 정가제로 운영되고 있습니다.\n\n계약금을 입금해 주시면 디자이너와의 미팅 일정을 조정합니다.\n\n* 유의사항\n1. 계약자명과 입금자명이 같게 보내주셔야 합니다.\n2. 현장미팅 후 서비스를 진행하지 않더라도 계약금은 환불되지 않습니다.\n3. 현장미팅 후 계약금을 제외한 잔금을 입금하시면 서비스가 계속 진행됩니다.\n\n감사합니다 :)\n\n* 계약금 안내\nhttps://#{host}/estimation.php?cliid=#{cliid}&needs=#{needs}",
        "templtName": "고객 디자이너 선택 최종 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-05-17 11:54:08",
        "templtCode": "TN_1999",
        "comments": [
          {
            "cdate": "2023-05-17 14:24:32",
            "name": "검수자",
            "id": "2617237",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-05-17 14:24:32",
            "status": "APR"
          }
        ]
      }
    },
    "contentsShareClient": {
      "name": "컨텐츠 공유 고객",
      "id": "TL_5290",
      "needs": [
        "client",
        "host",
        "pid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"pid\", to: obj.pid }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client} 고객님 안녕하세요 :) 고객 후기 콘텐츠가 오픈되어 연락드려요~\n\n* 고객 후기\nhttps://#{host}/revdetail.php?pid=#{pid}\n\n#{client}님이 처음 문의주신 때부터 실제로 만나뵙고 인터뷰를 진행하던 순간까지 저희 홈리에종에게도 너무나 소중한 시간이었습니다! 저희는 고객 후기 공유를 끝으로 마지막 인사를 드리며, 앞으로도 항상 행복하고 건강하시기를 바랍니다! \n\n홈리에종의 서비스가 만족스러우셨다면, 주변 분들에게 살포시 추천도 부탁드릴게요 :)\n\n감사합니다!\n\n- 홈리에종 드림.",
        "templtName": "컨텐츠 공유 고객 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-18 16:17:29",
        "templtCode": "TL_5290",
        "comments": [
          {
            "cdate": "2023-01-18 16:57:05",
            "name": "검수자",
            "id": "2356565",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n\r\n참고로 승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 알림톡 운영 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-01-18 16:57:05",
            "status": "APR"
          }
        ]
      }
    },
    "contentsShareDesigner": {
      "name": "컨텐츠 공유 디자이너",
      "id": "TL_5291",
      "needs": [
        "client",
        "designer",
        "host",
        "pid",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"pid\", to: obj.pid },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "#{designer} 실장님, 안녕하세요 :) #{client} 고객님 디자이너 포트폴리오 콘텐츠가 오픈되었어요!\n\n* 포트폴리오\nhttps://#{host}/portdetail.php?pid=#{pid}\n\n디자이너 콘솔에서 포트폴리오의 대표 사진을 변경하실 수 있고, 기타 설정값을 원하시는대로 조정할 수 있습니다!\n\n* 콘솔 (대표 사진 조정)\nhttps://#{host}/designer/process.php?proid=#{proid}\n\n현장 미팅 시작부터 촬영까지 #{client} 고객님께 좋은 경험을 선물해드릴 수 있도록, 홈리에종과 함께 해주셔서 감사합니다 :)",
        "templtName": "컨텐츠 공유 디자이너 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-18 16:22:55",
        "templtCode": "TL_5291",
        "comments": [
          {
            "cdate": "2023-01-18 17:03:36",
            "name": "검수자",
            "id": "2356584",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-18 17:03:36",
            "status": "APR"
          }
        ]
      }
    },
    "photoShareClient": {
      "name": "사진 공유 고객 수정",
      "id": "TP_2963",
      "needs": [
        "client",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client} 고객님 안녕하세요, 홈리에종입니다 :) 촬영한 사진이 나와서 연락드려요!\n\n#{client}님의 소중한 집을 꾸미는 일에 저희 홈리에종과 함께 해주셔서 감사했습니다! 마지막으로 홈리에종과 디자이너에 대한 경험을 아래 서비스 평가 페이지를 통해 리뷰 부탁드리겠습니다. \n\n솔직한 평가를 남겨주시고, 하단 '평가 제출하기'를 클릭하시면 고객님 현장을 촬영한 사진을 다운로드하실 수 있습니다.\n\n편안하고 아름다운 집에서 늘 행복한 일상을 이어나가시기를 바랄게요!\n\n감사합니다 :)\n\n* 서비스 평가 및 사진 다운로드\nhttps://#{host}/#{path}.php?proid=#{proid}",
        "templtName": "사진 공유 고객 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-10-11 09:34:14",
        "templtCode": "TP_2963",
        "comments": [
          {
            "cdate": "2023-10-11 14:33:24",
            "name": "검수자",
            "id": "2875359",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-10-11 14:33:24",
            "status": "APR"
          }
        ]
      }
    },
    "photoShareDesigner": {
      "name": "사진 공유 디자이너 수정",
      "id": "TL_3781",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "#{designer} 실장님, 안녕하세요 :) #{client} 고객님 원본 사진이 나와서 연락드려요!\n\n이번 프로젝트도 너무 수고 많으셨습니다! #{client}님만의 매력과 취향이 묻어나는 아름다운 집을 완성해주셔서 감사드려요~\n\n포트폴리오 콘텐츠는 순차 발행중이라 나오면 추후에 링크 공유드리겠습니다! \n\n* 사진 공유\nhttps://#{host}/designer/process.php?proid=#{proid}&download=auto",
        "templtName": "사진 공유 디자이너 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-09 09:17:28",
        "templtCode": "TL_3781",
        "comments": [
          {
            "cdate": "2023-01-09 12:29:51",
            "name": "검수자",
            "id": "2330013",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-09 12:29:51",
            "status": "APR"
          }
        ]
      }
    },
    "preferPhoto": {
      "name": "선호 사진 요청 수정",
      "id": "TF_3616",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님, 홈리에종입니다!\n선호하시는 스타일 및 참고 사진을 보내주세요 :)\n\n선호사진 / 현장사진(이사 가실 곳, 현재 거주하시는 곳 등)을 아래 버튼으로 보내주시거나, 홈리에종 카카오 채널을 통해 보내주시면 참고하여 고객님께 딱! 맞는 좋은 디자이너 분들로 제안드릴게요.\n\n*선호사진 1~2장만으로도 적합한 디자이너 추천과 빠른 제안서 발송에 큰 도움이 됩니다!",
        "templtName": "선호 사진 요청 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [
          {
            "ordering": "1",
            "name": "사진 전송 하기",
            "linkType": "WL",
            "linkTypeName": "웹링크",
            "linkMo": "https://home-liaison.com/login.php",
            "linkPc": "https://home-liaison.com/login.php",
            "linkIos": "",
            "linkAnd": ""
          }
        ],
        "cdate": "2021-07-30 16:28:57",
        "templtCode": "TF_3616",
        "comments": [
          {
            "cdate": "2021-07-30 17:05:21",
            "name": "검수자",
            "id": "1469294",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-07-30 17:05:21",
            "status": "APR"
          }
        ]
      }
    },
    "outOfClient": {
      "name": "부재중 알림 수정",
      "id": "TF_3881",
      "needs": [
        "client",
        "host",
        "path",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 :) 홈스타일링 문의주신 홈리에종입니다. 상담을 위해 연락드렸으나 통화가 어려우신 듯하여 메세지 남겨 드립니다.\n\n02-2039-2252로 전화주시거나, 홈리에종 카카오 채널을 통해 통화 가능 시간을 남겨주시면, 확인 후 연락드리겠습니다!\n\n만약 통화가 어려우시다면, 다음 진행을 위해 상세 큐레이션 페이지를 작성 부탁드리겠습니다.\n\n상세 큐레이션 페이지에 응답해주시면, 고객님께 맞는 서비스와 디자이너를 추천드릴 수 있게 되며, 큐레이팅 결과가 반영된 홈리에종 제안서가 발송됩니다.\n\n좋은 하루 되세요. 감사합니다!\n\n* 큐레이션 페이지\nhttps://#{host}/middle/#{path}?cliid=#{cliid}",
        "templtName": "부재중 알림 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-08-02 16:55:12",
        "templtCode": "TF_3881",
        "comments": [
          {
            "cdate": "2021-08-03 10:43:02",
            "name": "검수자",
            "id": "1471986",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-08-03 10:43:02",
            "status": "APR"
          }
        ]
      }
    },
    "pureOutOfClient": {
      "name": "순수 부재중 알림",
      "id": "TF_6196",
      "needs": [
        "client",
        "emoji0",
        "emoji1"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"emoji0\", to: obj.emoji0 },\n          { from: \"emoji1\", to: obj.emoji1 },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 #{emoji0} 홈스타일링 문의주신 홈리에종입니다. 상담을 위해 연락드렸으나 통화가 어려우신 듯하여 메세지 남겨 드립니다.\n\n#{emoji1} 02-2039-2252로 전화주시거나, 홈리에종 카카오 채널을 통해 통화 가능 시간을 남겨주시면, 확인 후 연락드리겠습니다!",
        "templtName": "순수 부재중 알림",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-08-25 18:31:01",
        "templtCode": "TF_6196",
        "comments": [
          {
            "cdate": "2021-08-26 11:02:05",
            "name": "검수자",
            "id": "1506353",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-08-26 11:02:05",
            "status": "APR"
          }
        ]
      }
    },
    "clientCuration": {
      "name": "스타일 찾기 전송",
      "id": "TF_6198",
      "needs": [
        "client",
        "emoji0",
        "emoji1",
        "host",
        "path",
        "cliid",
        "mode"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"emoji0\", to: obj.emoji0 },\n          { from: \"emoji1\", to: obj.emoji1 },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"mode\", to: obj.mode },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 #{emoji0}\n\nStep 1 : CX팀과의 상담을 잘 진행하셨나요?\n\nStep 2 #{emoji1} : 30초 간단 스타일 찾기를 보내드리오니, 작성 부탁드리겠습니다!\n\n스타일 찾기에 응답해주시면, 고객님께 맞는 서비스와 디자이너를 추천드릴 수 있게 되며, 큐레이팅 결과가 반영된 홈리에종 제안서가 발송됩니다.\n\n좋은 하루 되세요. 감사합니다!\n\n* 큐레이션 페이지 https://#{host}/middle/#{path}?cliid=#{cliid}&mode=#{mode}",
        "templtName": "스타일 찾기 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-08-25 18:39:25",
        "templtCode": "TF_6198",
        "comments": [
          {
            "cdate": "2021-08-26 11:02:18",
            "name": "검수자",
            "id": "1506355",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-08-26 11:02:18",
            "status": "APR"
          }
        ]
      }
    },
    "outClientCuration": {
      "name": "부재중 큐레이션 전송",
      "id": "TF_3540",
      "needs": [
        "client",
        "host",
        "path",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 :) 홈스타일링 문의주신 홈리에종입니다. 상담을 위해 연락드렸으나 통화가 어려우신 듯하여 메세지 남겨 드립니다.\n\n다음 진행을 위해 아래 상세 큐레이션 페이지를 보내드리오니, 작성 부탁드리겠습니다!\n\n상세 큐레이션 페이지에 응답해주시면, 고객님께 맞는 서비스와 디자이너를 추천드릴 수 있게 되며, 큐레이팅 결과가 반영된 홈리에종 제안서가 발송됩니다.\n\n좋은 하루 되세요. 감사합니다!\n\n* 큐레이션 페이지\nhttps://#{host}/middle/#{path}?cliid=#{cliid}",
        "templtName": "부재중 큐레이션 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-07-30 10:59:51",
        "templtCode": "TF_3540",
        "comments": [
          {
            "cdate": "2021-07-30 14:08:41",
            "name": "검수자",
            "id": "1468420",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-07-30 14:08:41",
            "status": "APR"
          }
        ]
      }
    },
    "curationComplete": {
      "name": "큐레이션 완료 서비스 소개 추가",
      "id": "TQ_2204",
      "needs": [
        "client",
        "host",
        "path",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n작성하신 내용은 모두 전달되었습니다.\n\n고객님의 요청 사항을 토대로 더 상세한 상담을 위해, 영업일 기준 2일 안에 전화드리겠습니다 :)\n\n더 정확하고 빠른 응대를 위해, 홈리에종 카카오 채널에 통화 가능한 시간을 남겨주세요!\n\n홈리에종의 영업시간은 다음과 같습니다.\n\n* 홈리에종 영업시간\n- 평일 오전 9:30 ~ 오후 6:30\n- 점심시간 : 오후 12:30 ~ 오후 1:30\n\n* 홈리에종 서비스 소개\nhttps://#{host}/#{path}.php?cliid=#{cliid}",
        "templtName": "큐레이션 완료 서비스 소개 추가",
        "templateType": "AD",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "채널 추가하고 이 채널의 광고와 마케팅 메시지를 카카오톡으로 받기",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [
          {
            "ordering": "1",
            "name": "채널 추가",
            "linkType": "AC",
            "linkTypeName": "채널 추가",
            "linkMo": "",
            "linkPc": "",
            "linkIos": "",
            "linkAnd": ""
          }
        ],
        "cdate": "2023-12-01 08:00:43",
        "templtCode": "TQ_2204",
        "comments": [
          {
            "cdate": "2023-12-01 12:13:49",
            "name": "검수자",
            "id": "2982137",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-12-01 12:13:49",
            "status": "APR"
          }
        ]
      }
    },
    "paymentAndChannel": {
      "name": "계약금 입금 및 등록 수정",
      "id": "TJ_8587",
      "needs": [
        "client",
        "designer",
        "host",
        "path"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 :)\n#{designer} 디자이너님을 선택하시고\n계약금 넣어주신 것 잘 확인되었습니다.\n\n현장 미팅 및 홈스타일링 계약에 앞서,\n서비스에 관련된 유의 사항 안내 페이지를 보내드립니다.\n\n꼭 한 번 읽어봐 주시고, 앞으로의 진행은 홈리에종 채널을 통해 소통이 이루어질 예정입니다. 감사합니다 :)\n\n* 서비스 유의 사항\nhttps://#{host}/#{path}.php",
        "templtName": "계약금 입금 및 등록 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-08-31 11:51:25",
        "templtCode": "TJ_8587",
        "comments": []
      }
    },
    "remainPaymentAndChannel": {
      "name": "잔금 입금 완료 수정",
      "id": "TF_9757",
      "needs": [
        "client",
        "designer",
        "emoji"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"emoji\", to: obj.emoji },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n#{designer} 디자이너님과의 프로젝트에 대한 잔금 입금이 잘 확인되었고, 계약서 서명이 완료된 경우, 계약된 기간에 맞추어 디자이너님께 디자인 작업 시작을 요청드릴 예정입니다 :)\n\n진행하시면서 궁금하신 점이나 어려움이 있으시면 언제든 편하게 홈리에종으로 연락주세요! 즐거운 집꾸미기 과정이 되시도록 저희가 동행하겠습니다 #{emoji}\n\n좋은 하루 보내세요! 감사합니다.",
        "templtName": "잔금 입금 완료 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-09-28 09:40:32",
        "templtCode": "TF_9757",
        "comments": [
          {
            "cdate": "2021-09-28 12:04:20",
            "name": "검수자",
            "id": "1552325",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-09-28 12:04:20",
            "status": "APR"
          }
        ]
      }
    },
    "virtualAccount": {
      "name": "가상계좌 안내 수정",
      "id": "TF_5485",
      "needs": [
        "client",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount",
        "date"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"goodName\", to: obj.goodName },\n          { from: \"bankName\", to: obj.bankName },\n          { from: \"account\", to: obj.account },\n          { from: \"to\", to: obj.to },\n          { from: \"amount\", to: obj.amount },\n          { from: \"date\", to: obj.date },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! #{goodName}을 입금해주실 가상계좌 안내드립니다.\n\n은행명 : #{bankName}\n계좌번호 : #{account}\n수취인 : #{to}\n금액 : #{amount}원\n\n#{date} 까지 위 가상계좌를 통해 #{amount}원을 입금해주시면 결제가 완료됩니다!\n\n감사합니다 :)",
        "templtName": "가상계좌 안내 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-08-19 13:53:51",
        "templtCode": "TF_5485",
        "comments": [
          {
            "cdate": "2021-08-19 16:15:19",
            "name": "검수자",
            "id": "1496264",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-08-19 16:15:19",
            "status": "APR"
          }
        ]
      }
    },
    "realAccount": {
      "name": "홈리에종 계좌 안내 수정 수정 수정",
      "id": "TL_5574",
      "needs": [
        "client",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"goodName\", to: obj.goodName },\n          { from: \"bankName\", to: obj.bankName },\n          { from: \"account\", to: obj.account },\n          { from: \"to\", to: obj.to },\n          { from: \"amount\", to: obj.amount },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! #{goodName}을 입금해주실 계좌 안내드립니다.\n\n은행명 : #{bankName}\n계좌번호 : #{account}\n수취인 : #{to}\n금액 : #{amount}원\n\n위 계좌를 통해 #{amount}원을 입금해주시면 결제가 완료됩니다! 받는 통장 표시에 반드시 #{client}님의 성함을 적어주세요!\n\n감사합니다 :)",
        "templtName": "홈리에종 계좌 안내 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-20 13:51:51",
        "templtCode": "TL_5574",
        "comments": [
          {
            "cdate": "2023-01-20 15:48:10",
            "name": "검수자",
            "id": "2361483",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-20 15:48:10",
            "status": "APR"
          }
        ]
      }
    },
    "designerAccount": {
      "name": "홈리에종 계좌 안내 디자이너",
      "id": "TL_5575",
      "needs": [
        "designer",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"goodName\", to: obj.goodName },\n          { from: \"bankName\", to: obj.bankName },\n          { from: \"account\", to: obj.account },\n          { from: \"to\", to: obj.to },\n          { from: \"amount\", to: obj.amount },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님! #{goodName}을 입금해주실 계좌 안내드립니다.\n\n은행명 : #{bankName}\n계좌번호 : #{account}\n수취인 : #{to}\n금액 : #{amount}원\n\n위 계좌를 통해 #{amount}원을 입금해주시면 결제가 완료됩니다. 받는 통장 표시에 반드시 #{designer} 실장님의 성함을 적어주세요!\n\n감사합니다 :)",
        "templtName": "홈리에종 계좌 안내 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-20 13:52:07",
        "templtCode": "TL_5575",
        "comments": [
          {
            "cdate": "2023-01-20 15:48:25",
            "name": "검수자",
            "id": "2361484",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-20 15:48:25",
            "status": "APR"
          }
        ]
      },
    },
    "firstPayment": {
      "name": "계약금 안내 수정 수정",
      "id": "TK_4108",
      "needs": [
        "client",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님~\n디자이너와 함께하면 내 마음에 쏙 드는 우리 집을 만나게 되실 거에요! 프로젝트 진행을 위해 계약금 안내드립니다 :)\n\n계약금은 전체 디자이너 비용에 포함되는 금액으로, 디자이너와의 현장 미팅 및 디자이너 일정 예약을 위해 정가제로 운영되고 있습니다.\n\n계약금을 입금해 주시면 디자이너와의 미팅 일정을 조정합니다.\n\n* 유의사항\n1. 계약자명과 입금자명이 같게 보내주셔야 합니다.\n2. 현장미팅 후 서비스를 진행하지 않더라도 계약금은 환불되지 않습니다.\n3. 현장미팅 후 계약금을 제외한 잔금을 입금하시면 서비스가 계속 진행됩니다.\n\n감사합니다 :)\n\n* 계약금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}",
        "templtName": "계약금 안내 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:02:07",
        "templtCode": "TK_4108",
        "comments": [
          {
            "cdate": "2022-10-26 16:56:05",
            "name": "검수자",
            "id": "2201788",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2022-10-26 16:56:05",
            "status": "APR"
          }
        ]
      }
    },
    "secondPayment": {
      "name": "잔금 안내 수정 수정 수정 수정",
      "id": "TK_4109",
      "needs": [
        "client",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님~ 프로젝트 진행을 위해 잔금 안내 드립니다 :)\n\n잔금은 전체 디자이너 비용에서 계약금을 제외한 금액으로, 입금해주시면 디자이너가 홈스타일링 서비스를 계속 진행하게 됩니다.\n\n* 유의사항\n1. 입금하신 서비스비는 디자이너에게 진행 단계에 따라 정산합니다.\n2. 계약금 결제시 요청하신 증빙 방식으로 발행됩니다.\n\n* 계좌 이체시 유의사항\n1. 입금자명은 반드시 신청자명으로 보내주셔야 합니다.\n2. 현금 영수증 발행을 위해 안내 페이지 하단의 '계좌 이체' 버튼을 반드시 눌러주세요!\n\n감사합니다 :)\n\n* 잔금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}",
        "templtName": "잔금 안내 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:03:52",
        "templtCode": "TK_4109",
        "comments": [
          {
            "cdate": "2022-10-26 17:00:09",
            "name": "검수자",
            "id": "2201821",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2022-10-26 17:00:09",
            "status": "APR"
          }
        ]
      }
    },
    "travelPayment": {
      "name": "출장비 안내 수정",
      "id": "TK_4111",
      "needs": [
        "client",
        "unit",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"unit\", to: obj.unit },\n          { from: \"total\", to: obj.total },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 말씀드렸던 출장비 안내드립니다.\n\n출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용으로, 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.\n\n* 1회 출장비(왕복) : #{unit}원 (VAT포함)\n* 총 금액 : #{total}원 (VAT포함)\n\n감사합니다 :)\n\n* 출장비 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}",
        "templtName": "출장비 안내 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:04:39",
        "templtCode": "TK_4111",
        "comments": []
      }
    },
    "plusDesignFee": {
      "name": "서비스 변경 추가 금액 안내",
      "id": "TF_6757",
      "needs": [
        "client",
        "pastservice",
        "newservice",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"pastservice\", to: obj.pastservice },\n          { from: \"newservice\", to: obj.newservice },\n          { from: \"total\", to: obj.total },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자이너 서비스 변경으로 인한 추가 디자인비 안내드립니다.\n\n* 변경 전 서비스명 : #{pastservice}\n* 변경 후 서비스명 : #{newservice}\n* 추가 금액 : #{total}원 (VAT포함)\n\n감사합니다 :)\n\n* 결제 안내\nhttps://#{host}/middle/#{path}?cliid=#{cliid}&needs=#{needs}",
        "templtName": "서비스 변경 추가 금액 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-08-31 16:17:35",
        "templtCode": "TF_6757",
        "comments": [
          {
            "cdate": "2021-08-31 16:43:28",
            "name": "검수자",
            "id": "1513740",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-08-31 16:43:28",
            "status": "APR"
          }
        ]
      }
    },
    "plusDesignerFee": {
      "name": "디자이너 변경 추가 견적",
      "id": "TF_7173",
      "needs": [
        "client",
        "pastdesigner",
        "newdesigner",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"pastdesigner\", to: obj.pastdesigner },\n          { from: \"newdesigner\", to: obj.newdesigner },\n          { from: \"total\", to: obj.total },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자이너 변경으로 인한 추가 디자인비 안내드립니다.\n\n* 변경 전 디자이너 : #{pastdesigner}\n* 변경 후 디자이너 : #{newdesigner}\n* 추가 금액 : #{total}원 (VAT포함)\n\n감사합니다 :)\n\n* 추가 디자인비 견적서\nhttps://#{host}/middle/#{path}?cliid=#{cliid}&needs=#{needs}",
        "templtName": "디자이너 변경 추가 견적",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-09-03 11:53:15",
        "templtCode": "TF_7173",
        "comments": [
          {
            "cdate": "2021-09-03 14:51:53",
            "name": "검수자",
            "id": "1519663",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-09-03 14:51:53",
            "status": "APR"
          }
        ]
      }
    },
    "refundCard": {
      "name": "환불 신청 완료 카드",
      "id": "TF_7403",
      "needs": [
        "client",
        "designer",
        "percentage",
        "amount"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"percentage\", to: obj.percentage },\n          { from: \"amount\", to: obj.amount },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n#{designer} 디자이너님과의 프로젝트에 대한 카드 환불 신청이 완료되었습니다.\n\n환불 비율 : #{percentage}%\n환불 금액 : #{amount}원\n\n환불 신청 접수 완료 후 영업일 기준으로 3~7일 정도 소요됩니다. 카드사의 사정에 따라 7일 이상 경과될 수 있습니다.\n\n정확한 카드 환불 일정은 해당 카드사에 문의하시기 바랍니다.\n\n문의해주시고, 이용해주셔서 감사합니다 :)",
        "templtName": "환불 신청 완료 카드",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-09-06 10:47:42",
        "templtCode": "TF_7403",
        "comments": [
          {
            "cdate": "2021-09-06 14:36:27",
            "name": "검수자",
            "id": "1521539",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-09-06 14:36:27",
            "status": "APR"
          }
        ]
      }
    },
    "refundVAccount": {
      "name": "환불 신청 완료 가상계좌",
      "id": "TF_7406",
      "needs": [
        "client",
        "designer",
        "percentage",
        "amount"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"percentage\", to: obj.percentage },\n          { from: \"amount\", to: obj.amount },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n#{designer} 디자이너님과의 프로젝트에 대한 환불 신청이 완료되었습니다.\n\n환불 비율 : #{percentage}%\n환불 금액 : #{amount}원\n\n환불은 환불 계좌 접수 후 영업일 기준 5~7일 내에 접수된 계좌로 취소/환불수수료를 공제한 금액으로 입금됩니다.\n\n접수 계좌 오류, 증빙서류 미접수 등의 사유로 환불이 유보 또는 지연될 수 있으며, 이 경우 이메일 등을 통해 별도 안내합니다.\n\n문의해주시고, 이용해주셔서 감사합니다 :)",
        "templtName": "환불 신청 완료 가상계좌",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-09-06 11:01:21",
        "templtCode": "TF_7406",
        "comments": [
          {
            "cdate": "2021-09-06 14:37:15",
            "name": "검수자",
            "id": "1521545",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-09-06 14:37:15",
            "status": "APR"
          }
        ]
      }
    },
    "designerConsole": {
      "name": "디자이너 콘솔 전송 수정 수정",
      "id": "TJ_8643",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n\n홈리에종 파트너 디자이너 전용, 관리자 콘솔 링크를 보내드립니다!\n\n기타 문의 사항은 전화 또는 홈리에종 채널로 문의 부탁드리겠습니다. 감사합니다!\n\n* 디자이너 콘솔 링크\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 콘솔 전송 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-08-31 16:25:49",
        "templtCode": "TJ_8643",
        "comments": []
      }
    },
    "finalPush": {
      "name": "드랍시 서비스 안내 수정",
      "id": "TO_3238",
      "needs": [
        "client",
        "host",
        "path"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈리에종에 문의주셔서 감사드립니다 :)\n\n모바일로도 알 수 있는 자세한 서비스 안내 페이지 보내드립니다. 확인해보시고 궁금하신 내용은 문의주세요!\n\n* 홈리에종 서비스 안내\nhttps://#{host}/#{path}.php\n\n\n정해진 시간 내 할 것 많고 알 것 많은 인테리어,\n\n1. 시공부터 스타일링까지 한 번에\n2. 전문 디자이너가 우리 집 맞춤으로 한땀한땀 정성스럽게\n3. 홈리에종의 시스템과 케어로 안정감 있게\n4. 실제 우리 집에 만족스러운 변화를 가져오는\n\n홈리에종과 함께 하세요!",
        "templtName": "드랍시 서비스 안내 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-01 11:40:29",
        "templtCode": "TO_3238",
        "comments": [
          {
            "cdate": "2023-08-02 11:12:37",
            "name": "검수자",
            "id": "2755913",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-02 11:12:37",
            "status": "APR"
          }
        ]
      }
    },
    "designerConsoleRequest": {
      "name": "홈스타일링 의뢰서 전송 수정 수정",
      "id": "TK_7798",
      "needs": [
        "designer",
        "client",
        "host",
        "path",
        "desid",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n#{client} 고객님 현장의 홈스타일링 의뢰서를 보내드립니다.\n\n기타 문의 사항은 전화 또는 홈리에종 채널로 문의 부탁드리겠습니다. 감사합니다 :)\n\n* 홈스타일링 의뢰서\nhttps://#{host}/designer/#{path}.php?desid=#{desid}&proid=#{proid}&mode=request",
        "templtName": "홈스타일링 의뢰서 전송 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-11-23 13:00:01",
        "templtCode": "TK_7798",
        "comments": []
      }
    },
    "designerConsoleRequestFirstMeeting": {
      "name": "홈스타일링 의뢰서 현장 미팅 수정 수정",
      "id": "TK_7775",
      "needs": [
        "designer",
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"day\", to: obj.day },\n          { from: \"hour\", to: obj.hour },\n          { from: \"minute\", to: obj.minute },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n#{client} 고객님과의 첫 현장 미팅이 다가옵니다!\n\n* 현장미팅 일정\n#{date} #{day}요일 #{hour}시 #{minute}분\n\n* 홈스타일링 의뢰서\nhttps://#{host}/designer/#{path}.php?proid=#{proid}&mode=request\n\n의뢰서를 꼭 검토하여 미팅을 준비해주세요. 현장 사진을 찍을 수 있는 경우, 의뢰서를 통해 현장 사진을 업로드해주시길 바랍니다.\n\n미팅 3일 전 꼭 고객님께 인사 메시지를 남겨주세요. 고객님도 동일한 안내를 받고 기다리고 계십니다.",
        "templtName": "홈스타일링 의뢰서 현장 미팅 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-11-23 11:51:37",
        "templtCode": "TK_7775",
        "comments": []
      }
    },
    "photoShareAKeywordDesigner": {
      "name": "디자이너 개인 포트폴리오 공유",
      "id": "TG_0998",
      "needs": [
        "designer",
        "file"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"file\", to: obj.file }\n        ];\n      }",
      "raw": {
        "templtContent": "#{designer} 실장님, 안녕하세요 :) 촬영한 현장의 원본 사진이 나와서 연락드려요!\n\n포트폴리오 콘텐츠는 순차 발행중이라 나오면 추후에 링크 공유드리겠습니다!\n\n감사합니다 :)\n\n사진 공유 : https://drive.google.com/file/d/#{file}/view?usp=sharing",
        "templtName": "디자이너 개인 포트폴리오 공유",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-10-12 14:56:32",
        "templtCode": "TG_0998",
        "comments": [
          {
            "cdate": "2021-10-12 15:54:58",
            "name": "검수자",
            "id": "1573765",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-10-12 15:54:58",
            "status": "APR"
          }
        ]
      }
    },
    "firstMeetingWeekAgo": {
      "name": "현장 미팅 안내 일주일 수정",
      "id": "TJ_3907",
      "needs": [
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"day\", to: obj.day },\n          { from: \"hour\", to: obj.hour },\n          { from: \"minute\", to: obj.minute },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 안녕하세요 :)\n디자이너님과의 첫 미팅이 다가옵니다!\n\n* 현장미팅 일정 :\n#{date} #{day}요일 #{hour}시 #{minute}분\n\n이제부터 디자이너는 고객님의 문제를 함께 고민하고 해결해 나갑니다. 원하시는 것, 궁금하신 것이 있으시면 현장에서 솔직하고 구체적으로 말씀해주시는 것이 가장 좋습니다 :)\n\n미팅 준비를 위한 문의가 있다면 연락주세요!\n\n* 현장 미팅 안내\nhttps://#{host}/#{path}.php?proid=#{proid}",
        "templtName": "현장 미팅 안내 일주일 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-07-18 09:41:57",
        "templtCode": "TJ_3907",
        "comments": []
      }
    },
    "firstMeetingDayAgo": {
      "name": "현장 미팅 안내 하루전 수정",
      "id": "TJ_3908",
      "needs": [
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"day\", to: obj.day },\n          { from: \"hour\", to: obj.hour },\n          { from: \"minute\", to: obj.minute },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n현장 미팅 일정 재알림드려요!\n\n* 현장미팅 일정 :\n#{date} #{day}요일 #{hour}시 #{minute}분\n\n이제부터 디자이너는 고객님의 문제를 함께 고민하고 해결해 나갑니다. 원하시는 것, 궁금하신 것이 있으시면 현장에서 솔직하고 구체적으로 말씀해주시는 것이 가장 좋습니다 :)\n\n그럼 저희는 미팅 완료 후 전화드릴게요 :)\n\n* 현장 미팅 안내\nhttps://#{host}/#{path}.php?proid=#{proid}",
        "templtName": "현장 미팅 안내 하루전 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-07-18 09:42:30",
        "templtCode": "TJ_3908",
        "comments": []
      }
    },
    "constructFirst": {
      "name": "시공 계약금 수정 수정 수정 수정",
      "id": "TK_4112",
      "needs": [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"amount\", to: obj.amount },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님! 시공 계약금 안내드립니다 :) 다음 링크를 통해 계약금 #{amount}원을 입금해주시면, 시공이 다음 단계로 진행됩니다.\n\n* 유의사항\n1. 입금자명은 반드시 신청자명으로 보내주셔야 합니다.\n2. 계좌 이체시, 현금 영수증 발행을 위해 안내 페이지 하단의 '계좌 이체' 버튼을 반드시 눌러주세요!\n3. 시공 계약서는 고객님과 논의를 거친 견적서를 바탕으로 작성되었습니다.\n4. 진행 중 변경사항이 생기면 마무리 단계에서 증감 내역을 확인하여 최종 정산에 반영합니다 :)\n\n감사합니다 :)\n\n* 계약금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}&inicisdeactive=true",
        "templtName": "시공 계약금 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:06:02",
        "templtCode": "TK_4112",
        "comments": []
      }
    },
    "constructStart": {
      "name": "착수금 안내 수정 수정 수정 수정",
      "id": "TK_4113",
      "needs": [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"amount\", to: obj.amount },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님! 시공 착수금 안내드립니다 :) 다음 링크를 통해 착수금 #{amount}원을 입금해주시면, 시공이 다음 단계로 진행됩니다.\n\n* 유의사항\n1. 입금자명은 반드시 신청자명으로 보내주셔야 합니다.\n2. 계좌 이체시, 현금 영수증 발행을 위해 안내 페이지 하단의 '계좌 이체' 버튼을 반드시 눌러주세요!\n3. 진행 중 변경사항이 생기면 마무리 단계에서 증감 내역을 확인하여 최종 정산에 반영합니다.\n\n이제 시공 들어가시는데 진행하시면서 저희 안내가 필요하시면 편하게 연락주세요 :)\n\n* 착수금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}&inicisdeactive=true",
        "templtName": "착수금 안내 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:06:48",
        "templtCode": "TK_4113",
        "comments": []
      }
    },
    "constructMiddle": {
      "name": "중도금 안내 수정 수정 수정 수정",
      "id": "TK_4114",
      "needs": [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"amount\", to: obj.amount },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님! 시공 중도금 안내드립니다 :) 다음 링크를 통해 중도금 #{amount}원을 입금해주시면, 시공이 다음 단계로 진행됩니다.\n\n* 유의사항\n1. 입금자명은 반드시 신청자명으로 보내주셔야 합니다.\n2. 계좌 이체시, 현금 영수증 발행을 위해 안내 페이지 하단의 '계좌 이체' 버튼을 반드시 눌러주세요!\n3. 진행 중 변경사항이 생기면 마무리 단계에서 증감 내역을 확인하여 최종 정산에 반영합니다.\n\n감사합니다 :)\n\n* 중도금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}&inicisdeactive=true",
        "templtName": "중도금 안내 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:07:17",
        "templtCode": "TK_4114",
        "comments": []
      }
    },
    "constructRemain": {
      "name": "시공 잔금 안내 수정 수정 수정 수정",
      "id": "TK_4115",
      "needs": [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"amount\", to: obj.amount },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"needs\", to: obj.needs },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 시공 잔금 안내드립니다 :) 기존 견적에서 가격 변동된 부분은 하늘색으로 표시해드렸습니다. 해당 내역을 반영해서 최종 잔금을 안내드리오니 확인 부탁드립니다!\n\n* 최종 납입 금액: #{amount}원 (vat포함)\n\n* 유의사항\n1. 입금자명은 반드시 신청자명으로 보내주셔야 합니다.\n2. 계좌 이체시, 현금 영수증 발행을 위해 안내 페이지 하단의 '계좌 이체' 버튼을 반드시 눌러주세요!\n\n감사합니다 :)\n\n* 잔금 안내\nhttps://#{host}/#{path}.php?cliid=#{cliid}&needs=#{needs}&inicisdeactive=true",
        "templtName": "시공 잔금 안내 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-10-26 15:08:05",
        "templtCode": "TK_4115",
        "comments": []
      }
    },
    "generalPayments": {
      "name": "일반 결제 완료",
      "id": "TG_5450",
      "needs": [
        "client",
        "goods"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"goods\", to: obj.goods },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! #{goods}에 대한 입금 확인이 완료되었습니다 :) 해당 항목과 관련된 안내를 위해, 담당자가 고객님께 연락드릴 예정입니다!\n\n감사합니다.",
        "templtName": "일반 결제 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-11-22 12:49:59",
        "templtCode": "TG_5450",
        "comments": [
          {
            "cdate": "2021-11-22 14:31:45",
            "name": "검수자",
            "id": "1641028",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-11-22 14:31:45",
            "status": "APR"
          }
        ]
      }
    },
    "constructEstimation": {
      "name": "시공 견적서",
      "id": "TG_9724",
      "needs": [
        "client",
        "host",
        "path",
        "proid",
        "buiid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n          { from: \"buiid\", to: obj.buiid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님~\n고객님 현장에 예상되는 시공 내역을 정리한 견적서 보내드립니다!\n\n해당 견적서는 공사 진행시 현장 상황에 따라 부득이한 변동 사항이 발생할 수 있으며, 이 때는 상호 협의 후 진행하게 됩니다.\n\n기타 문의사항은 카카오 채널 또는 유선상으로 문의 부탁드립니다! 감사합니다 :)\n\n* 견적 안내\nhttps://#{host}/middle/#{path}?proid=#{proid}&buiid=#{buiid}",
        "templtName": "시공 견적서",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2021-12-24 12:45:29",
        "templtCode": "TG_9724",
        "comments": [
          {
            "cdate": "2021-12-24 15:14:43",
            "name": "검수자",
            "id": "1696533",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\n\n신청하신 메시지 확인하여 승인되었습니다.\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\n\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\n\n감사합니다.",
            "createdAt": "2021-12-24 15:14:43",
            "status": "APR"
          }
        ]
      }
    },
    "designerSchedule": {
      "name": "디자이너 상세 일정 기입",
      "id": "TH_1452",
      "needs": [
        "designer",
        "client",
        "date",
        "host",
        "path",
        "desid",
        "mode",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid },\n          { from: \"mode\", to: obj.mode },\n          { from: \"cliid\", to: obj.cliid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n\n#{client} 고객님 현장이 곧 시작됩니다! 계약상 시작 날짜로부터 5일 전과 당일에 맞추어 #{client} 고객님께 상세 일정 페이지가 자동으로 전송될 예정입니다.\n\n* 자동으로 전송될 날짜 : #{date}\n\n고객님이 페이지를 보기 전, 이 프로젝트에 대한 상세 일정을 간단히 기입해주세요! 기입하는 방법은 아래 링크로 가시면 매뉴얼 영상을 보실 수 있습니다 :)\n\n기타 문의 사항은 전화 또는 홈리에종 채널로 문의 부탁드리겠습니다. 감사합니다!\n\n* 상세 일정 기입\nhttps://#{host}/middle/#{path}?desid=#{desid}&mode=#{mode}&cliid=#{cliid}",
        "templtName": "디자이너 상세 일정 기입",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-01-11 13:32:51",
        "templtCode": "TH_1452",
        "comments": [
          {
            "cdate": "2022-01-11 15:37:10",
            "name": "검수자",
            "id": "1721154",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2022-01-11 15:37:10",
            "status": "APR"
          }
        ]
      }
    },
    "clientSchedule": {
      "name": "고객 상세 일정 전송",
      "id": "TH_1450",
      "needs": [
        "client",
        "date",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 안녕하세요 :)\n디자이너님과의 프로젝트 시작이 다가옵니다!\n\n* 프로젝트 시작일 : #{date}\n\n고객님께 프로젝트의 상세 일정표를 공유해드립니다. 하단 링크로 가시면, 앞으로 디자이너가 어떤 일을 하게 될 지에 대한 순서와 대략적인 날짜가 정렬되어 있습니다. 해당 일정은 프로젝트 진행 상태와 현장 상황에 따라 변경될 수 있습니다.\n\n확인 부탁드리고, 궁금한 사항이나 기타 문의가 있으시다면 언제든 연락 주세요!\n\n* 상세 일정 안내\nhttps://#{host}/middle/#{path}?proid=#{proid}",
        "templtName": "고객 상세 일정 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-01-11 13:01:31",
        "templtCode": "TH_1450",
        "comments": [
          {
            "cdate": "2022-01-11 14:34:02",
            "name": "검수자",
            "id": "1720876",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2022-01-11 14:34:02",
            "status": "APR"
          }
        ]
      }
    },
    "clientScheduleNow": {
      "name": "고객 상세 일정 전송 당일",
      "id": "TH_1451",
      "needs": [
        "client",
        "date",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "#{client}님, 안녕하세요 :) 오늘은 디자이너님과의 프로젝트 시작일입니다!\n\n고객님께 프로젝트의 상세 일정표를 공유해드립니다. 하단 링크로 가시면, 앞으로 디자이너가 어떤 일을 하게 될 지에 대한 순서와 대략적인 날짜가 정렬되어 있습니다. 해당 일정은 프로젝트 진행 상태와 현장 상황에 따라 변경될 수 있습니다.\n\n확인 부탁드리고, 궁금한 사항이나 기타 문의가 있으시다면 언제든 연락 주세요!\n\n* 상세 일정 안내\nhttps://#{host}/middle/#{path}?proid=#{proid}",
        "templtName": "고객 상세 일정 전송 당일",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-01-11 13:32:02",
        "templtCode": "TH_1451",
        "comments": [
          {
            "cdate": "2022-01-11 14:59:12",
            "name": "검수자",
            "id": "1721015",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2022-01-11 14:59:12",
            "status": "APR"
          }
        ]
      }
    },
    "pushClient": {
      "name": "상담 신청 완료 쪼기 수정",
      "id": "TJ_3621",
      "needs": [
        "client",
        "host",
        "path",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님 홈리에종입니다!\n\n상담 신청이 끝까지 정상적으로 이루어지지 않았습니다.\n디자이너 추천 제안서를 받아 보시고, 인테리어 진행을 위해서는 끝까지 정보 입력을 완료하셔야 해요 :)\n\n다음 링크를 통해 문의를 끝까지 진행해주시고, 꼭 하단 신청 완료하기 버튼을 눌러주세요!\n\n* 상담 신청 완료하기\nhttps://#{host}/#{path}.php?cliid=#{cliid}",
        "templtName": "상담 신청 완료 쪼기 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-07-14 11:43:44",
        "templtCode": "TJ_3621",
        "comments": []
      }
    },
    "miniConsulting": {
      "name": "미니 신청 완료 수정",
      "id": "TO_1100",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client} 고객님,\n홈리에종 Mini 서비스 결제가 완료되었습니다. \n\n담당 디자이너가 #{client}님의 정보를 확인하는 동안 다음 과정을 진행해 주시면, 디자이너와의 상담이 시작됩니다! \n\n1. 우리집 직접 실측하기 \n- 스타일링이 필요한 공간의 가로 * 세로, 창문, 사용할 가구의 사이즈를 가이드에 따라 실측해 주세요.\n\n2. 내가 원하는 컨셉 준비하기\n- 디자이너와의 상담 전, 내가 원하는 무드를 정확하게 알고있다면 좀 더 효율적으로 미팅 시간을 활용할 수 있어요! \n- 레퍼런스 이미지를 미리 준비해둔다면 훨씬 소통이 매끄럽겠죠?\n\n3. 상세 정보와 현장 사진 보내기\n- 1, 2번을 마치셨다면 실측 가이드 페이지를 통해 상세 정보와 현장 사진, 레퍼런스 이미지를 보내주세요!\n\n* 상세 정보 전송 및 실측 가이드 페이지\nhttps://#{host}/#{path}.php?useid=#{useid}",
        "templtName": "미니 신청 완료 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-18 17:43:58",
        "templtCode": "TO_1100",
        "comments": [
          {
            "cdate": "2023-07-19 14:01:51",
            "name": "검수자",
            "id": "2729204",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-07-19 14:01:51",
            "status": "APR"
          }
        ]
      },
    },
    "miniRequest": {
      "name": "미니 디자인 요청 수정 수정",
      "id": "TO_1104",
      "needs": [
        "designer",
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{designer} 디자이너님, #{client} 고객님의 홈리에종 Mini 서비스 신규 프로젝트 진행을 알려드립니다!\n\n* 디자인 요청 페이지\nhttps://#{host}/#{path}.php?useid=#{useid}\n\n#{client} 고객님이 필요한 공간을 실측해주시고, 원하는 컨셉에 대해 요청을 남기셨어요. 공간 사진과 고객의 요청사항을 꼼꼼히 비교하여 원활한 작업이 진행될 수 있도록 영업일 기준 2일 내로 고객님과 상담을 진행해 주세요!\n\n[TIP] 간혹 원하는 컨셉이 없거나 디자이너의 추천을 원하는 경우도 있기 때문에 디자이너님이 제안해주실 방향도 따로 준비해주신다면 원활하게 미팅을 진행하실 수 있을 거에요!\n\n혹시 고객님께서 실측 진행을 하지 않으셨다면, 직접 하실 수 있도록 요청해 주시고,\n실측 정보를 확인 한 기준 날짜로 제안서 작업 시작일임을 안내해 주세요!\n\n* 디자인 요청 페이지\nhttps://#{host}/#{path}.php?useid=#{useid}",
        "templtName": "미니 디자인 요청 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-18 17:47:45",
        "templtCode": "TO_1104",
        "comments": [
          {
            "cdate": "2023-07-19 14:04:15",
            "name": "검수자",
            "id": "2729218",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-19 14:04:15",
            "status": "APR"
          }
        ]
      },
    },
    "miniFile": {
      "name": "미니 고객 파일 전송 완료",
      "id": "TJ_0100",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님. 적어주신 상세 정보와 파일 전송이 완료되었습니다 :)\n\n홈리에종은 '홈리에종 Mini 서비스 특별 교육'을 받은 디자이너님을 매칭해드리고 있답니다! 디자이너님과 함께 새로운 우리집 변화를 느껴보세요.\n\n곧, 3일 내로 디자이너님과 상담이 시작될 예정입니다. 상담은 디자이너님과 유선 전화 또는 메신저를 통해 진행됩니다.",
        "templtName": "미니 고객 파일 전송 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-06-14 11:54:18",
        "templtCode": "TJ_0100",
        "comments": []
      }
    },
    "miniConfirmUser": {
      "name": "미니 컨펌 대기 고객",
      "id": "TJ_0105",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자이너의 제안서 작업이 마무리되었고, 홈리에종에서 고객님의 요청 사항 중 놓친 부분이 없는지 더블 체크 중이에요!\n\n확인이 완료되면, 영업일 기준 2일 내 디자이너의 제안서를 열람하실 수 있도록 링크를 전달드릴게요 :)",
        "templtName": "미니 컨펌 대기 고객",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-06-14 12:06:25",
        "templtCode": "TJ_0105",
        "comments": []
      }
    },
    "miniCompleteDesigner": {
      "name": "미니 컨펌 완료 디자이너",
      "id": "TJ_0106",
      "needs": [
        "designer",
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n        ];\n      }",
      "raw": {
        "templtContent": "#{designer} 디자이너님, 시안 작업하시느라 고생 많으셨어요!\n\n#{client} 고객님 Mini 프로젝트 제안서 중간 컨펌을 완료했습니다. 고객님께서 확인하실 수 있도록 제안서 페이지를 open하겠습니다!",
        "templtName": "미니 컨펌 완료 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-06-14 12:07:59",
        "templtCode": "TJ_0106",
        "comments": []
      }
    },
    "miniProposal": {
      "name": "미니 제안서 전송 수정",
      "id": "TO_1102",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자인 제안서가 도착했어요. #{client}님 공간의 무드 체인지! 바로 시작해보세요!\n\n제안서 페이지를 오픈하여 내용을 확인해주시고, 시스템 내 리뷰창에 댓글을 남겨주세요. 확인 완료 댓글이 없는 경우, 페이지 오픈 기준 2일 내 자동으로 프로젝트가 종료됩니다.\n\n혹시 궁금한 점이 있다면 제안서 페이지 아래 부분에 위치한 댓글란에 확인 댓글과 함께 같이 문의를 남겨주세요.\n내용 확인 후, 1-2일 안으로 답변드리도록 하겠습니다!\n\n* 디자인 제안서\nhttps://#{host}/#{path}.php?useid=#{useid}",
        "templtName": "미니 제안서 전송 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-18 17:46:40",
        "templtCode": "TO_1102",
        "comments": [
          {
            "cdate": "2023-07-19 14:02:19",
            "name": "검수자",
            "id": "2729206",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-19 14:02:19",
            "status": "APR"
          }
        ]
      }
    },
    "miniComplete": {
      "name": "미니 완료 고객 수정",
      "id": "TO_1105",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님!\n디자이너님과 진행한 홈리에종 Mini 서비스는 만족하셨나요?\n\n가구의 변경 없이 패브릭, 액자, 소품 등의 변화로도 공간의 무드를 변화시킬 수 있는 홈리에종의 Mini 서비스, 어떠셨나요?\n\n아래 공유해 드리는 고객 만족도 설문지를 통해 홈리에종이 더 나은 서비스를 제공할 수 있도록, 고객님들의 의견에 귀 기울이겠습니다. 솔직한 설문 답변을 부탁드릴게요!\n\n* 고객 만족도 설문지\nhttps://#{host}/#{path}.php/?useid=#{useid}&reviewcard=true",
        "templtName": "미니 완료 고객 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-18 17:48:42",
        "templtCode": "TO_1105",
        "comments": [
          {
            "cdate": "2023-07-19 14:04:21",
            "name": "검수자",
            "id": "2729219",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-07-19 14:04:21",
            "status": "APR"
          }
        ]
      }
    },
    "projectDetail": {
      "name": "파일 전달",
      "id": "TK_7337",
      "needs": [
        "client",
        "designer",
        "file",
        "host",
        "path",
        "proid",
        "key"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"file\", to: obj.file },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n          { from: \"key\", to: obj.key },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요! #{client}님, #{designer} 디자이너님이 #{file} 파일을 업로드하였습니다. \n\n하단 링크를 통해 다운로드 페이지로 가실 수 있으며, 기타 궁금하신 사항은 디자이너님 또는 홈리에종으로 문의주세요!\n\n감사합니다 :)\n\n* #{file} 파일 다운로드 페이지\nhttps://#{host}/#{path}.php?proid=#{proid}&key=#{key}",
        "templtName": "파일 전달",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-11-19 15:21:40",
        "templtCode": "TK_7337",
        "comments": []
      }
    },
    "pushDesignerFile": {
      "name": "파일 전달 촉구 수정",
      "id": "TK_7749",
      "needs": [
        "designer",
        "client",
        "file",
        "host",
        "path",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"file\", to: obj.file },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"proid\", to: obj.proid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요! #{designer} 디자이너님, #{client} 고객님께 #{file} 파일을 디자이너 콘솔을 통해 업로드해주세요!\n\n하단 링크를 통해 업로드 페이지로 가실 수 있으며, 기타 궁금하신 사항은 홈리에종 채널로 문의주세요!\n\n감사합니다 :)\n\n* #{file} 파일 업로드 페이지\nhttps://#{host}/designer/#{path}.php?proid=#{proid}",
        "templtName": "파일 전달 촉구 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "A",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2022-11-23 10:55:22",
        "templtCode": "TK_7749",
        "comments": []
      }
    },
    "requestRawContents": {
      "name": "디자이너 글 요청",
      "id": "TL_4785",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님! 홈리에종입니다 :) #{client} 고객님 현장의 디자이너 글 요청드립니다!\n\n완성된 현장의 사진은 텍스트와 함께 홈리에종의 웹사이트 / SNS 채널에 발행되며, 고객 제안 및 디자이너 브랜딩 용도로 사용합니다 :)\n\n* 반드시 아래 링크를 통해 디자이너 글을 업로드 해주세요!\n\n* 업로드 링크\nhttps://#{host}/designer/process.php?proid=#{proid}&raw=upload",
        "templtName": "디자이너 글 요청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-16 09:48:42",
        "templtCode": "TL_4785",
        "comments": [
          {
            "cdate": "2023-01-16 13:42:19",
            "name": "검수자",
            "id": "2350588",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-01-16 13:42:19",
            "status": "APR"
          }
        ]
      }
    },
    "requestPhotoPay": {
      "name": "촬영비 안내",
      "id": "TL_5621",
      "needs": [
        "client",
        "designer",
        "amount0",
        "amount1",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"amount0\", to: obj.amount0 },\n          { from: \"amount1\", to: obj.amount1 },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님! #{client} 고객님 현장의 촬영비 안내 드립니다.\n\n홈리에종은 디자이너 현장의 정확한 기록과 퀄리티 있는 포트폴리오를 위해 전문 작가를 이용합니다.\n\n전문 작가의 비용은 건당 #{amount0}원 (VAT 별도) 이며, 홈리에종의 50% 부담을 제외한 #{amount1}원 (VAT 포함) 입니다.\n\n기타 자세한 사항은 디자이너 콘솔을 통해 확인하실 수 있습니다. 감사합니다 :)\n\n* 디자이너 콘솔\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=photopay",
        "templtName": "촬영비 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-20 18:20:08",
        "templtCode": "TL_5621",
        "comments": [
          {
            "cdate": "2023-01-25 10:26:52",
            "name": "검수자",
            "id": "2361995",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-25 10:26:52",
            "status": "APR"
          }
        ]
      }
    },
    "feedBackDesigner": {
      "name": "현장 미팅 피드백",
      "id": "TL_5837",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님과의 현장 미팅은 어떠셨나요? 무사히 잘 끝났다면, 디자이너 콘솔을 통해 현장 사진을 업로드해주세요!\n\n홈리에종과 고객님 간 피드백 통화 이후, 잔금 요청과 계약서 발송 단계가 진행됩니다. 고객님의 잔금 지불이 완료되기 전까지 프로젝트 시작을 홀딩해주세요.\n\n* 콘솔 (현장 사진 업로드)\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=feedback",
        "templtName": "현장 미팅 피드백",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-26 11:31:19",
        "templtCode": "TL_5837",
        "comments": [
          {
            "cdate": "2023-01-26 14:18:00",
            "name": "검수자",
            "id": "2365267",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-26 14:18:00",
            "status": "APR"
          }
        ]
      }
    },
    "paymentFirstDesigner": {
      "name": "선금 지급 완료",
      "id": "TL_5974",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님 현장의 디자인비 선금 정산이 완료되었습니다. 실장님께서는 정산 확인 부탁드리겠습니다.\n\n금액 등 상세 내역과 기타 안내는 아래 디자이너 콘솔 링크에서 확인하실 수 있습니다.\n\n감사합니다!\n\n* 콘솔\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=payfirst",
        "templtName": "선금 지급 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-27 10:54:35",
        "templtCode": "TL_5974",
        "comments": [
          {
            "cdate": "2023-01-27 13:59:14",
            "name": "검수자",
            "id": "2367525",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-27 13:59:14",
            "status": "APR"
          }
        ]
      }
    },
    "paymentRemainDesigner": {
      "name": "잔금 지급 완료",
      "id": "TL_5976",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님 현장의 디자인비 잔금 정산이 완료되었습니다. 실장님께서는 정산 확인 부탁드리겠습니다.\n\n금액 등 상세 내역과 기타 안내는 아래 디자이너 콘솔 링크에서 확인하실 수 있습니다.\n\n감사합니다!\n\n* 콘솔\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=payremain",
        "templtName": "잔금 지급 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-27 10:55:04",
        "templtCode": "TL_5976",
        "comments": [
          {
            "cdate": "2023-01-27 14:03:34",
            "name": "검수자",
            "id": "2367542",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-27 14:03:34",
            "status": "APR"
          }
        ]
      }
    },
    "photoDateDesigner": {
      "name": "촬영일 알림 디자이너 수정",
      "id": "TL_5980",
      "needs": [
        "client",
        "designer",
        "date",
        "address"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"date\", to: obj.date },\n          { from: \"address\", to: obj.address }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님! #{client} 고객님 현장의 촬영일이 다가와 알림 드립니다 :)\n\n* 일시 : #{date}\n* 주소 : #{address}\n\n촬영 전 공간 세팅 부탁드립니다. 세팅 시간은 고객님께 별도로 연락하셔서 협의해주시면 됩니다! \n\n감사합니다 :)",
        "templtName": "촬영일 알림 디자이너 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-27 10:58:32",
        "templtCode": "TL_5980",
        "comments": [
          {
            "cdate": "2023-01-27 14:03:52",
            "name": "검수자",
            "id": "2367544",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-27 14:03:52",
            "status": "APR"
          }
        ]
      }
    },
    "contractConfirmDesigner": {
      "name": "계약서 서명시 디자이너",
      "id": "TL_6162",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님께서 홈스타일링 계약서에 서명을 완료하셨습니다!\n\n계약상 시작일이 되면, 고객님께 프로젝트의 디자인 작업이 시작된다는 안내가 발송됩니다. 실장님께서는 시작일 확인을 부탁드립니다.\n\n시작 날짜 등 자세한 사항은 디자이너 콘솔을 통해 확인 부탁드립니다.\n \n감사합니다!\n\n* 콘솔 (계약서 확인)\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=contractconfirm",
        "templtName": "계약서 서명시 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-30 09:15:32",
        "templtCode": "TL_6162",
        "comments": [
          {
            "cdate": "2023-01-30 11:46:20",
            "name": "검수자",
            "id": "2369491",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-30 11:46:20",
            "status": "APR"
          }
        ]
      }
    },
    "contractStartDesigner": {
      "name": "계약서 시작일 디자이너",
      "id": "TL_6163",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님 프로젝트의 계약서상 시작일이 되었습니다. 실장님께서는 디자인 작업을 시작해 주세요!\n\n고객님과의 상담을 통해 작업을 진행하신 후, 일정표, 디자인 제안서, 제품 리스트 등의 페이퍼 작업을 콘솔에 업로드해 주세요!\n\n* 콘솔\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=contractstart",
        "templtName": "계약서 시작일 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-01-30 09:18:48",
        "templtCode": "TL_6163",
        "comments": [
          {
            "cdate": "2023-01-30 11:46:42",
            "name": "검수자",
            "id": "2369493",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-30 11:46:42",
            "status": "APR"
          }
        ]
      }
    },
    "contractStartScheduleDesigner": {
      "name": "계약서 시작일 일정표 디자이너",
      "id": "TL_8265",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님 프로젝트의 계약서상 시작일이 되었습니다. 실장님께서는 프로젝트의 디자인 작업을 시작해 주세요.\n\n그리고, 작업을 시작하시면서 프로젝트의 일정표를 적어주셔야 합니다. 일정표는 디자이너 콘솔을 통해 쉽게 작성하실 수 있습니다.\n\n현시점으로부터 5일 후, 고객님께 프로젝트 일정표가 자동으로 안내될 예정입니다. 실장님께서는 꼭! 아래 링크를 통해 안내될 일정표를 확인해 주시고, 수정해 주세요!\n\n* 콘솔 (일정표 작성)\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=schedule",
        "templtName": "계약서 시작일 일정표 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-02-13 12:19:56",
        "templtCode": "TL_8265",
        "comments": [
          {
            "cdate": "2023-02-13 14:37:40",
            "name": "검수자",
            "id": "2428786",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-02-13 14:37:40",
            "status": "APR"
          }
        ]
      }
    },
    "puserScheduleDesigner": {
      "name": "순수 일정표 안내 디자이너",
      "id": "TM_2929",
      "needs": [
        "client",
        "designer",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님 프로젝트의 일정표를 작성 부탁드립니다! 일정표는 디자이너 콘솔을 통해 쉽게 작성하실 수 있습니다.\n\n실장님께서는 꼭! 아래 링크를 통해 안내될 일정표를 확인해 주시고, 수정해 주세요!\n\n* 콘솔 (일정표 작성)\nhttps://#{host}/designer/process.php?proid=#{proid}&mode=schedule",
        "templtName": "순수 일정표 안내 디자이너",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-03-16 15:16:38",
        "templtCode": "TM_2929",
        "comments": [
          {
            "cdate": "2023-03-16 16:43:32",
            "name": "검수자",
            "id": "2498484",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-03-16 16:43:32",
            "status": "APR"
          }
        ]
      }
    },
    "hahaClientSend": {
      "name": "하하 수정 수정 수정 수정",
      "id": "TM_9280",
      "needs": [
        "client",
        "host",
        "cliid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"cliid\", to: obj.cliid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client} 고객님!\n원활한 상담을 위해 아래 3가지 문항 체크해 보시고, 해당 사항이 없으시면 상담 진행을 도와드리겠습니다 :)\n\n1. 시공 서비스'만' 필요하신가요? 홈리에종은 시공 업체가 아니기 때문에 시공 서비스'만'을 제공하지 않습니다.\n\n2. 거주 중에 시공을 진행하시나요? 홈리에종은 거주중인 현장의 시공을 진행하지 않습니다. 거주중일때는 시공 없이 스타일링만으로 집을 확 바꿔보세요!\n\n3. 일단 견적서만 받아보기를 원하시나요? 홈리에종은 디자이너 매칭 후, 디자이너와의 상담을 거쳐 시공 범위를 정하는 서비스로 견적서만 먼저 제공해드리기는 어렵습니다.\n\n위 3가지 유의 사항을 확인한 후, 아래 링크를 클릭하여 서비스 설명을 꼼꼼히 읽어보세요.\n\n설명을 모두 읽으신 후 페이지를 끝까지 스크롤하시면 '디자이너 추천 받기' 버튼이 있습니다. 해당 버튼을 클릭하시면 무료로 디자이너 추천 서비스를 이용하실 수 있습니다.\n\n* 서비스 설명 및 디자이너 추천 받기\nhttps://#{host}/response.php?cliid=#{cliid}\n\n* 유선 상담을 원하시면 홈리에종 카카오 채널을 통해 성함을 입력해주시고, 유선 상담 희망 문의를 남겨주시면 상담 도와드리겠습니다.",
        "templtName": "하하 수정 수정 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-04-26 14:42:41",
        "templtCode": "TM_9280",
        "comments": [
          {
            "cdate": "2023-04-26 16:16:50",
            "name": "검수자",
            "id": "2579041",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-04-26 16:16:50",
            "status": "APR"
          }
        ]
      }
    },
    "scheduleClient": {
      "name": "일정표 안내 고객 수정",
      "id": "TM_1069",
      "needs": [
        "client",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client} 고객님!\n\n고객님 현장의 전체적인 일정표를 보내드립니다. 아래 링크를 통해 확인하실 수 있으며, 해당 일정에 맞게 디자인 작업이 진행될 예정입니다!\n\n해당 일정표는 대략적으로 예상되는 일정을 담고 있는 표이기에, 상황에 따라 변동 가능하며 정확하지 않을 수 있습니다! 이 점 참고하시어 일정표 확인 부탁드리겠습니다 :)\n\n* 일정표 확인\nhttps://#{host}/project.php?proid=#{proid}&mode=schedule",
        "templtName": "일정표 안내 고객 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-03-04 09:03:55",
        "templtCode": "TM_1069",
        "comments": [
          {
            "cdate": "2023-03-06 11:12:13",
            "name": "검수자",
            "id": "2470531",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-03-06 11:12:13",
            "status": "APR"
          }
        ]
      }
    },
    "progressClient": {
      "name": "프로젝트 상태 안내 고객 수정",
      "id": "TM_4760",
      "needs": [
        "client",
        "host",
        "proid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client} 고객님!\n프로젝트의 현재 진행 상황 안내 드립니다.\n\n아래 링크를 통해 프로젝트의 진행율을 체크하실 수 있으며, 자세한 진행 상황까지 확인하실 수 있습니다!\n\n기타 궁금하신 사항이 있다면, 디자이너를 통해, 또는 홈리에종 카카오 채널을 통해 언제든 문의 부탁드립니다 :) \n\n* 프로젝트 진행율\nhttps://#{host}/project.php?proid=#{proid}&mode=form",
        "templtName": "프로젝트 상태 안내 고객 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-03-28 09:23:38",
        "templtCode": "TM_4760",
        "comments": [
          {
            "cdate": "2023-03-28 11:51:03",
            "name": "검수자",
            "id": "2518179",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-03-28 11:51:03",
            "status": "APR"
          }
        ]
      }
    },
    "progressDesignerTotal": {
      "name": "프로젝트 상태 체크 디자이너 전체 고객용",
      "id": "TM_1338",
      "needs": [
        "designer",
        "host",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n진행중인 고객님들의 프로젝트가 현재 어느 단계 있는지, 확인 및 체크 부탁드리겠습니다.\n\n프로젝트 상태 체크를 해주시면 홈리에종에게 별도로 연락할 필요 없이 정확하게 진행 상황을 공유하실 수 있으며, 고객님께도 상황을 객관적으로 전달할 수 있으므로 적극적인 활용 부탁드리겠습니다!\n\n* 콘솔 (상태 체크)\nhttps://#{host}/designer/dashboard.php?desid=#{desid}&mode=status\n\n* 상태 변경 방법\nhttps://#{host}/designer/manual.php?desid=#{desid}",
        "templtName": "프로젝트 상태 체크 디자이너 전체 고객용",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-03-07 14:17:50",
        "templtCode": "TM_1338",
        "comments": [
          {
            "cdate": "2023-03-07 16:12:44",
            "name": "검수자",
            "id": "2475471",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-03-07 16:12:44",
            "status": "APR"
          }
        ]
      }
    },
    "progressDesignerSpecific": {
      "name": "프로젝트 상태 체크 디자이너 특정 고객용",
      "id": "TM_1339",
      "needs": [
        "designer",
        "client",
        "host",
        "proid",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid },\n          { from: \"proid\", to: obj.proid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n#{client} 고객님의 프로젝트가 현재 어느 단계 있는지, 확인 및 체크 부탁드리겠습니다.\n\n프로젝트 상태 체크를 해주시면 홈리에종에게 별도로 연락할 필요 없이 정확하게 진행 상황을 공유하실 수 있으며, 고객님께도 상황을 객관적으로 전달할 수 있으므로 적극적인 활용 부탁드리겠습니다!\n\n* 콘솔 (상태 체크)\nhttps://#{host}/designer/process.php?proid=#{proid}\n\n* 상태 변경 방법\nhttps://#{host}/designer/manual.php?desid=#{desid}",
        "templtName": "프로젝트 상태 체크 디자이너 특정 고객용",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-03-07 14:18:49",
        "templtCode": "TM_1339",
        "comments": [
          {
            "cdate": "2023-03-07 16:12:51",
            "name": "검수자",
            "id": "2475472",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-03-07 16:12:51",
            "status": "APR"
          }
        ]
      }
    },
    "designerConsolePreGuide": {
      "name": "디자이너 콘솔 교육 공지 수정 수정",
      "id": "TQ_6088",
      "needs": [
        "designer",
        "date",
        "host",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n디자이너 콘솔은 홈리에종과 협업 관계에 있는 디자이너님들이 홈리에종을 통해 받으신 프로젝트를 더 편리하게 관리할 수 있도록 제작된 관리자 콘솔입니다.\n\n디자이너 콘솔을 이용하시면 프로젝트를 쉽게 관리할 수 있는 것은 물론, 고객님께 더 편리한 방식으로 프로젝트 진행 상황과 파일을 공유하실 수 있으며, 홈리에종에 별도로 연락하실 필요 없이 실시간으로 프로젝트 상황을 공유할 수 있습니다.\n\n디자이너 콘솔의 상태 체크 요청에 앞서, 교육 자료를 보내드리겠습니다. 하단 링크를 통해 디자이너 콘솔 메뉴얼 페이지로 이동하시면, 콘솔에 대한 자세한 설명과 이용법에 대한 영상까지 확인하실 수 있습니다. 디자이너 콘솔의 상태 체크 요청은 #{date}에 주기적으로 시작될 예정이며, 실장님께서는 보내드린 교육 자료를 참고하여 디자이너 콘솔 이용법을 숙지하시기 바랍니다.\n\n기타 궁금하신 사항이나 문의 사항이 있으시면 홈리에종 카카오 채널을 통해 문의해주시기 바랍니다. 감사합니다 :)\n\n* 상태 체크 요청 시작 : #{date}\n* 디자이너 콘솔 메뉴얼\nhttps://#{host}/designer/manual.php?desid=#{desid}",
        "templtName": "디자이너 콘솔 교육 공지 수정 수정",
        "templateType": "BA",
        "templateEmType": "TEXT",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "디자이너 콘솔",
        "templtSubtitle": "더 편리한 프로젝트 관리",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-12-27 09:03:39",
        "templtCode": "TQ_6088",
        "comments": [
          {
            "cdate": "2023-12-27 16:07:42",
            "name": "검수자",
            "id": "3030950",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-12-27 16:07:42",
            "status": "APR"
          }
        ]
      }
    },
    "aspirantSubmit": {
      "name": "파트너십 신청 완료 진짜 최종",
      "id": "TO_4442",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님!\n작성하신 디자이너 파트너십 신청서는 접수 완료되었습니다 :)\n\n아래 링크를 통해, 홈리에종 파트너십에 대한 설명을 보실 수 있습니다. \n\n홈리에종과의 파트너십 계약 여부를 결정할 수 있도록 몇 가지 중요한 특징을 안내해드립니다. 검토하셔서 홈리에종의 취지 및 내용에 동의하시는지 확인 부탁드릴게요!\n\n동시에 홈리에종은 디자이너님이 남겨주신 신청 내용 및 포트폴리오를 확인하여 파트너십 계약 가능 여부를 검토하겠습니다!\n\n이후 신규 디자이너 등록 안내를 위해 유선으로 연락 드릴 예정(영업일 기준 최대 7일 이내)이니, 잠시만 기다려주세요!\n\n[향후 진행 과정]\n상호 검토 -> 유선 안내 -> 파트너십 계약 여부 결정 -> 등록비 납입 및 상세 정보 입력 -> 디자이너 공통교육 참석 -> 고객 추천 대기\n\n감사합니다 :)\n\n*홈리에종 파트너십\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 신청 완료 진짜 최종",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-08 18:21:54",
        "templtCode": "TO_4442",
        "comments": [
          {
            "cdate": "2023-08-10 11:28:28",
            "name": "검수자",
            "id": "2771088",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-10 11:28:28",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantPortfolio": {
      "name": "파트너십 추가 포트폴리오 접수 완료 수정",
      "id": "TO_4897",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 보내주신 추가 포트폴리오는 접수 완료되었습니다 :)\n\n또 추가적인 포트폴리오 발송이 필요하시다면, 아래 링크를 통해 보내주세요! 최대한 많이 보내주시면 모두 검토 후, 확인 연락드리겠습니다!\n\n*추가 포트폴리오 전송\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 추가 포트폴리오 접수 완료 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-11 10:36:24",
        "templtCode": "TO_4897",
        "comments": [
          {
            "cdate": "2023-08-14 11:29:43",
            "name": "검수자",
            "id": "2775921",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-14 11:29:43",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestDocuments": {
      "name": "파트너십 등록 안내",
      "id": "TO_3805",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈리에종 디자이너 파트너십에 신청해 주셔서 감사합니다 :)\n\n아래 링크를 통해, 디자이너 등록 안내 페이지에 들어가실 수 있습니다. 안내 페이지를 통해 디자이너 등록 안내를 받으실 수 있고, 등록 서류 업로드, 등록비 안내, 추가 포트폴리오 전송을 하실 수 있습니다. \n\n원활한 디자이너 등록을 위해, 안내 페이지의 설명대로 진행 부탁드릴게요~! \n\n*디자이너 등록 안내\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 등록 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-03 19:02:28",
        "templtCode": "TO_3805",
        "comments": [
          {
            "cdate": "2023-08-07 10:37:57",
            "name": "검수자",
            "id": "2763033",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-07 10:37:57",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestPayment": {
      "name": "파트너십 등록비 별도 안내",
      "id": "TO_4236",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 홈리에종 파트너십에 신청해주셔서 감사합니다 :)\n\n홈리에종 파트너십 신청이 완료되기 위해선, 등록비 결제가 필요합니다. 등록비는 실장님을 플랫폼에 등록하고, 돋보이게 하기 위한 작업을 해드리는 비용입니다.\n\n등록비 결제가 모두 완료되면, 직접 디자이너님께 연락을 드려 대면 미팅 안내를 드릴 예정입니다.\n\n감사합니다 :)\n\n*등록비 구성 안내\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 등록비 별도 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-07 18:13:38",
        "templtCode": "TO_4236",
        "comments": [
          {
            "cdate": "2023-08-09 14:39:58",
            "name": "검수자",
            "id": "2769018",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-09 14:39:58",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantPaymentComplete": {
      "name": "파트너십 결제 완료",
      "id": "TO_3997",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client }        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 등록비 결제 확인이 완료되었습니다 :)\n\n홈리에종에서 디자이너님과 미팅 날짜를 잡기 위해 직접 연락을 드릴 예정입니다.\n\n미팅을 통해 홈리에종 파트너십 교육을 받으시고, 기본 정보 입력과 프로필, 제안 문서 사진 업로드를 마치시면 본격적으로 홈리에종 파트너 디자이너로 활동하실 수 있게 됩니다!\n\n곧 연락드릴 예정이니, 잠시만 기다려주세요! 감사합니다 :)",
        "templtName": "파트너십 결제 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-04 18:54:02",
        "templtCode": "TO_3997",
        "comments": [
          {
            "cdate": "2023-08-07 16:08:16",
            "name": "검수자",
            "id": "2764598",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-07 16:08:16",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantNoticeComplete": {
      "name": "파트너십 서류 접수 등록비 안내",
      "id": "TO_4234",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 서류 업로드 및 접수 완료되었습니다 :)\n\n서류 확인 및 등록비 결제까지 모두 완료되면, 직접 디자이너님께 연락을 드려 대면 미팅 안내를 드릴 예정입니다. 보내주신 자료 꼼꼼히 확인 후 연락드리겠습니다!\n\n감사합니다 :)\n\n*등록비 구성 안내\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 서류 접수 등록비 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-07 18:11:25",
        "templtCode": "TO_4234",
        "comments": [
          {
            "cdate": "2023-08-09 14:39:07",
            "name": "검수자",
            "id": "2769015",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-09 14:39:07",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestPortfolio": {
      "name": "파트너십 추가 포트폴리오 요청",
      "id": "TO_4842",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈리에종 디자이너 파트너십에 신청해 주셔서 감사합니다 :)\n\n홈리에종에서 디자이너님에 대해 좀 더 정확히 판단하기 위해 추가 포트폴리오 업로드를 요청 드립니다! \n\n추가 포트폴리오는 주거 인테리어에 홈스타일링까지 완료된 포트폴리오로 부탁드리며, 실제로 완료된 현장의 사진이 가장 좋습니다. \n\n만약 포트폴리오로 쓸 현장의 사진이 부족하다면, 디자이너님의 스타일링 능력을 판단할 수 있는 이미지라도 최대한 전송해주시길 부탁드릴게요! 감사합니다 :)\n\n*추가 포트폴리오 전송\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 추가 포트폴리오 요청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-10 17:21:12",
        "templtCode": "TO_4842",
        "comments": [
          {
            "cdate": "2023-08-14 10:16:05",
            "name": "검수자",
            "id": "2775606",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-08-14 10:16:05",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestPure": {
      "name": "파트너십 부재중 알림",
      "id": "TO_5056",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈스타일링 디자이너 신청해주신 홈리에종입니다. 연락드렸으나 통화가 어려우신 듯하여 메세지 남겨 드립니다.\n\n02-2039-2252로 전화주시거나, 홈리에종 카카오 채널을 통해 통화 가능 시간을 남겨주시면, 확인 후 연락드리겠습니다!",
        "templtName": "파트너십 부재중 알림",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-11 16:38:44",
        "templtCode": "TO_5056",
        "comments": [
          {
            "cdate": "2023-08-14 17:48:49",
            "name": "검수자",
            "id": "2778346",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n\r\n참고로 승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 알림톡 운영 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-14 17:48:49",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestCommon": {
      "name": "파트너십 공통 교육 안내",
      "id": "TO_6667",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 홈리에종 공통 교육 일정에 대해서 안내드립니다.\n\n아래 페이지를 통해 공통 교육 가능 일정을 확인하실 수 있으며, 제시된 공통 교육 일자 중 참석이 가능한 일자를 선택 후, 하단 버튼을 눌러주시면 됩니다!\n\n페이지에서 공통 교육 일정을 확인 및 선택 부탁드리고, 만약 모두 시간이 안 되신다면 홈리에종 채널에 별도로 문의 부탁드리겠습니다.\n\n감사합니다 :)\n\n*공통 교육 일정 선택\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 공통 교육 안내",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-24 17:28:55",
        "templtCode": "TO_6667",
        "comments": [
          {
            "cdate": "2023-08-25 16:19:04",
            "name": "검수자",
            "id": "2797874",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-25 16:19:04",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestCommonConfirm": {
      "name": "파트너십 공통 교육 안내 확정",
      "id": "TO_7656",
      "needs": [
        "client",
        "date",
        "address"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"date\", to: obj.date },\n          { from: \"address\", to: obj.address }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 홈리에종 공통 교육 시간과 장소에 대해 안내드립니다.\n\n시간: #{date}\n장소: #{address}\n주차: 2시간은 무료, 이후 10분당 1500원\n\n프로세스 및 내용 상세 설명, Q&A, 팀 소개 등이 진행 예정이니 미리 도착하셔서 준비해주세요!\n\n감사합니다 :)",
        "templtName": "파트너십 공통 교육 안내 확정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-31 16:47:36",
        "templtCode": "TO_7656",
        "comments": [
          {
            "cdate": "2023-09-01 10:23:16",
            "name": "검수자",
            "id": "2811104",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-09-01 10:23:16",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantRequestSetting": {
      "name": "파트너십 세트 포트폴리오 요청",
      "id": "TO_8039",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈리에종에서 디자이너님을 추천드리고, 연결해 드리기 위해 세트 포트폴리오 업로드를 요청드립니다! \n\n세트 포트폴리오는 주거 인테리어에 홈스타일링까지 완료된 포트폴리오로 부탁드리며, 한 집의 모든 공간을 보여주고 있어야 합니다. 기타 자세한 조건과 설명은 아래 페이지를 통해 확인해 주세요!\n\n만약 세트 포트폴리오가 없다면, 페이지 하단에 있는 '세트 포트폴리오 없음' 버튼을 눌러 추천서용 사진 전송을 부탁드릴게요! 감사합니다 :)\n\n*세트 포트폴리오 전송\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 세트 포트폴리오 요청",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-09-04 16:54:03",
        "templtCode": "TO_8039",
        "comments": [
          {
            "cdate": "2023-09-05 10:30:06",
            "name": "검수자",
            "id": "2816618",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-09-05 10:30:06",
            "status": "APR"
          }
        ]
      }
    },
    "aspirantSettingConfirm": {
      "name": "파트너십 세트 포트폴리오 접수 완료",
      "id": "TO_8040",
      "needs": [
        "client",
        "host",
        "path",
        "aspid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"aspid\", to: obj.aspid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님! 보내주신 세트 포트폴리오는 접수 완료되었습니다 :)\n\n또 추가적인 세트 포트폴리오 또는 제안서용 사진 발송이 필요하시다면, 아래 링크를 통해 보내주세요! 최대한 많이 보내주시면 모두 검토 후, 확인 연락드리겠습니다!\n\n*세트 포트폴리오 전송\nhttps://#{host}/#{path}.php?aspid=#{aspid}",
        "templtName": "파트너십 세트 포트폴리오 접수 완료",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-09-04 16:55:15",
        "templtCode": "TO_8040",
        "comments": [
          {
            "cdate": "2023-09-05 10:34:09",
            "name": "검수자",
            "id": "2816635",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-09-05 10:34:09",
            "status": "APR"
          }
        ]
      },
    },
    "noticeDesignerChecklist": {
      "name": "디자이너 요청 전송 체크리스트",
      "id": "TO_1919",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다 :)\n\n홈리에종이 실장님들을 더 잘 이해하고, 더 적합한 고객을 연결시켜드리기 위해 체크리스트를 전송해드립니다.\n\n체크리스트는 아래 링크를 통해 들어가실 수 있으며, 항목마다 자세한 설명은 물음표 아이콘을 눌러보시면 팝업 형태로 나옵니다. 각 설명을 참고하셔서 모두 체크해주시길 바랍니다 :)\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 체크리스트",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-24 13:29:42",
        "templtCode": "TO_1919",
        "comments": [
          {
            "cdate": "2023-07-24 15:56:38",
            "name": "검수자",
            "id": "2738714",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-24 15:56:38",
            "status": "APR"
          }
        ]
      },
    },
    "noticeDesignerConsole": {
      "name": "디자이너 요청 전송 디자이너 콘솔",
      "id": "TO_1921",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n\n홈리에종 파트너 디자이너 전용, 관리자 콘솔 링크를 보내드립니다! 해당 디자이너 콘솔을 통해 프로젝트 관리, 기본 체크리스트 설정, 일정 관리 등을 수행하실 수 있습니다!\n\n기타 문의 사항은 전화 또는 홈리에종 채널로 문의 부탁드리겠습니다. 감사합니다!\n\n* 디자이너 콘솔 링크\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 디자이너 콘솔",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-24 13:46:44",
        "templtCode": "TO_1921",
        "comments": [
          {
            "cdate": "2023-07-24 16:03:31",
            "name": "검수자",
            "id": "2738784",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-24 16:03:31",
            "status": "APR"
          }
        ]
      },
    },
    "noticeDesignerProfile": {
      "name": "디자이너 요청 전송 프로필 사진",
      "id": "TO_1922",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다 :)\n\n아래 링크로 가셔서 디자이너님의 사진을 업로드해주세요! 프로필 사진은 홈페이지와 추천서에 노출되어 고객님께 디자이너님을 어필하는 중요한 포인트가 됩니다. 정면 또는 측면의 얼굴이 잘 보이는 사진으로 업로드 부탁드리겠습니다 :)\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 프로필 사진",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-24 13:48:28",
        "templtCode": "TO_1922",
        "comments": [
          {
            "cdate": "2023-07-24 16:11:24",
            "name": "검수자",
            "id": "2738844",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-24 16:11:24",
            "status": "APR"
          }
        ]
      },
    },
    "noticeDesignerWork": {
      "name": "디자이너 요청 전송 작업 사진",
      "id": "TO_1923",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다 :)\n\n디자이너님의 대표 페이퍼 워크 작업이나 작업하고 있는 사진을 업로드 해주세요. 4장의 작업 사진은 추천서에 노출되어 고객님께 어필하는 중요 포인트가 됩니다. 자신을 어필할 수 있는 대표적인 4장의 사진을 꼭 올려주세요!\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 작업 사진",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-07-24 13:49:15",
        "templtCode": "TO_1923",
        "comments": [
          {
            "cdate": "2023-07-24 16:11:32",
            "name": "검수자",
            "id": "2738845",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-07-24 16:11:32",
            "status": "APR"
          }
        ]
      }
    },
    "noticeDesignerCareer": {
      "name": "디자이너 요청 전송 경력 및 학력",
      "id": "TO_4554",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다 :)\n\n아래 링크로 가셔서 디자이너님의 경력 사항과 학력 사항을 자세히 작성해주세요!\n\n경력에 대한 상세 정보는 디자이너님을 고객님들께 어필할 때 꼭 필요한 정보로, 고객님들께서 구체적인 정보를 물어보시기 때문에 반드시 상세하고 정확히 적어주셔야 합니다.\n\n체크리스트의 '경력 상세'와 '학력 상세'에 '+'을 이용하셔서 상세한 기입 부탁드리겠습니다~! 감사합니다 :)\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 경력 및 학력",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-09 11:58:39",
        "templtCode": "TO_4554",
        "comments": [
          {
            "cdate": "2023-08-10 14:31:09",
            "name": "검수자",
            "id": "2771905",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-10 14:31:09",
            "status": "APR"
          }
        ]
      }
    },
    "noticeDesignerEntire": {
      "name": "디자이너 요청 전송 일괄 체크리스트",
      "id": "TO_4556",
      "needs": [
        "designer",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님! 홈리에종입니다 :)\n\n홈리에종이 실장님들을 더 잘 이해하고, 더 적합한 고객을 연결시켜 드리기 위해, 체크리스트를 전송해 드립니다.\n\n체크리스트 페이지에서는 프로필 사진 업로드, 작업 사진 업로드, 그리고 기본 체크리스트 업데이트 작업을 수행하실 수 있습니다.\n\n체크리스트 페이지에 있는 모든 정보는 디자이너님을 고객님께 어필할 때 반드시 필요한 내용들이므로 디자이너님께서 자세하고 정확히 적어주실수록, 더 많은 고객님께, 더 적합한 고객님께 연결시켜 드릴 수 있습니다. \n\n따라서 프로필 사진 업로드, 작업 사진 업로드, 체크리스트 기입을 꼭 해주시길 요청드릴게요 :)\n\n체크리스트는 아래 링크를 통해 들어가실 수 있으며, 항목마다 자세한 설명은 물음표 아이콘을 눌러보시면 팝업 형태로 나옵니다. 각 설명을 참고하셔서 모두 체크해주시길 바랍니다! 기타 문의 사항은 홈리에종 채널을 통해 문의 부탁드립니다~!\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 요청 전송 일괄 체크리스트",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-09 12:03:02",
        "templtCode": "TO_4556",
        "comments": [
          {
            "cdate": "2023-08-10 14:33:30",
            "name": "검수자",
            "id": "2771924",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-10 14:33:30",
            "status": "APR"
          }
        ]
      }
    },
    "noticeDesignerEntireUntil": {
      "name": "체크리스트 일괄 전송 마감 추가 수정",
      "id": "TO_5750",
      "needs": [
        "designer",
        "date",
        "host",
        "path",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 디자이너님!\n홈리에종입니다 :)\n\n홈리에종이 실장님들을 더 잘 이해하고, 더 적합한 고객을 연결시켜 드리기 위해, 체크리스트를 전송해 드립니다.\n\n체크리스트 페이지에서는 프로필 사진 업로드, 작업 사진 업로드, 그리고 기본 체크리스트 업데이트 작업을 수행하실 수 있습니다.\n\n체크리스트 페이지에 있는 모든 정보는 디자이너님을 고객님께 어필할 때 반드시 필요한 내용들이므로 디자이너님께서 자세하고 정확히 적어주실수록, 더 많은 고객님께, 더 적합한 고객님께 연결시켜 드릴 수 있습니다. \n\n따라서 프로필 사진 업로드, 작업 사진 업로드, 체크리스트 기입을 마감기한 내까지 꼭 해주시길 요청드릴게요 :)\n\n체크리스트는 아래 링크를 통해 들어가실 수 있으며, 항목마다 자세한 설명은 물음표 아이콘을 눌러보시면 팝업 형태로 나옵니다. 각 설명을 참고하셔서 모두 체크해주시길 바랍니다! 기타 문의 사항은 홈리에종 채널을 통해 문의 부탁드립니다~!\n\n* 마감 기한\n- #{date}\n\n* 체크리스트 페이지\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "체크리스트 일괄 전송 마감 추가 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-08-17 16:40:46",
        "templtCode": "TO_5750",
        "comments": [
          {
            "cdate": "2023-08-18 17:37:47",
            "name": "검수자",
            "id": "2785938",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-08-18 17:37:47",
            "status": "APR"
          }
        ]
      }
    },
    "evaluationSubmit": {
      "name": "평가 완료 고객",
      "id": "TP_3977",
      "needs": [
        "client",
        "file"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"file\", to: obj.file }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client} 고객님 안녕하세요! 평가를 남겨주셔서 감사합니다 :)\n\n고객님 현장의 원본 사진을 구글 드라이브 링크로도 공유드리고, 고객 후기 콘텐츠는 순차 발행 중이라 나오면 추후에 링크 보내드리겠습니다!\n\n편안하고 아름다운 집에서 늘 행복한 일상을 이어나가시기를 바랄게요!\n\n감사합니다 :)\n\n* 사진 공유 : https://drive.google.com/file/d/#{file}/view?usp=sharing",
        "templtName": "평가 완료 고객",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-10-17 10:11:59",
        "templtCode": "TP_3977",
        "comments": [
          {
            "cdate": "2023-10-17 14:45:15",
            "name": "검수자",
            "id": "2886937",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-10-17 14:45:15",
            "status": "APR"
          }
        ]
      }
    },
    "imageTransfer": {
      "name": "이미지 전달 수정 수정",
      "id": "TQ_0295",
      "needs": [
        "client",
        "designer",
        "type",
        "purpose",
        "host",
        "path",
        "cliid",
        "id"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"designer\", to: obj.designer },\n          { from: \"type\", to: obj.type },\n          { from: \"purpose\", to: obj.purpose },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"cliid\", to: obj.cliid },\n          { from: \"id\", to: obj.id }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client} 고객님 안녕하세요, 홈리에종입니다!\r\n\r\n고객님께서 요청하신 디자이너 추천을 위해 #{designer} 디자이너의 #{type} 관련 이미지를 전달해드립니다. 하단 페이지 링크를 통해 전달해드린 이미지들을 보실 수 있습니다.\r\n\r\n감사합니다 :)\r\n\r\n* 제목 : #{purpose}\r\n* 페이지 링크\r\nhttps://#{host}/#{path}.php?cliid=#{cliid}&id=#{id}",
        "templtName": "이미지 전달 수정 수정",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-11-21 17:24:59",
        "templtCode": "TQ_0295",
        "comments": [
          {
            "cdate": "2023-11-22 14:51:19",
            "name": "검수자",
            "id": "2961497",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n알림톡은 수신자의 액션을 기반한 정보성 메시지에 한하여 발송 가능합니다.\r\n허나 해당 메시지는 수신자가 요청하지 않은 내용으로 광고성 및 공지성 메시지에 해당함에 따라 알림톡 발송 불가합니다.\r\n만약 수신자액션(요청, 신청 등)에 의해 발송되는 메시지일 경우, 메시지내 수신자액션을 고정값으로 추가하여 주시기 바랍니다.\r\n(예: 예약완료. / 요청하신 디자이너 추천~ 등)\r\n\r\n더 자세한 알림톡 검수 가이드는 딜러사를 통해 확인 부탁드립니다.\r\n감사합니다.",
            "createdAt": "2023-11-22 14:51:19",
            "status": "REJ"
          },
          {
            "cdate": "2023-11-23 08:26:24",
            "name": "검수자",
            "id": "2963113",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 1회성 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-11-23 08:26:24",
            "status": "APR"
          }
        ]
      }
    },
    "designerEducationBasicSend": {
      "name": "디자이너 가이드 교육 자료 전송",
      "id": "TQ_3634",
      "needs": [
        "designer",
        "host",
        "desid",
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n홈리에종의 협업 디자이너들을 위한 홈리에종 프로젝트 디자인 가이드 페이지 링크를 보내드립니다.\n\n홈리에종 프로젝트 디자인 가이드는 홈리에종 프로젝트에 대해서 상세한 디자인 매뉴얼과 함께 실장님께서 하셔야 할 것들, 정산 정책 등이 상세히 적혀 있는 종합적인 가이드입니다.\n\n아래 페이지 링크를 통해 디자인 가이드를 자세히 보실 수 있으니, 해당 페이지에 있는 자료를 숙지해 주시고, 홈리에종 프로젝트 디자인 가이드에 따라 프로젝트를 운영해 주세요!\n\n감사합니다 :)\n\n* 홈리에종 디자인 가이드\nhttps://#{host}/designer/provision.php?desid=#{desid}",
        "templtName": "디자이너 가이드 교육 자료 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-12-11 16:00:32",
        "templtCode": "TQ_3634",
        "comments": [
          {
            "cdate": "2023-12-12 13:51:48",
            "name": "검수자",
            "id": "3002325",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-12-12 13:51:48",
            "status": "APR"
          }
        ]
      }
    },
    "designerEducationConsoleSend": {
      "name": "디자이너 콘솔 교육 자료 전송",
      "id": "TQ_3633",
      "needs": [
        "designer",
        "host",
        "desid",
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n디자이너 콘솔 사용 방법에 대한 설명 페이지 링크를 보내드립니다.\n\n디자이너 콘솔은 홈리에종과 협업 관계에 있는 디자이너님들이 홈리에종을 통해 받으신 모든 홈스타일링 프로젝트를 더 편리하고 직관적으로 관리하고 공유할 수 있도록 제작된 관리자 콘솔입니다.\n\n아래 페이지 링크를 통해 디자이너 콘솔 사용 방법에 대해 자세히 안내받으실 수 있습니다. 해당 페이지에 있는 영상과 설명 자료를 숙지해 주시고, 디자이너 콘솔을 홈리에종 프로젝트 진행 시 적극적으로 사용해 주세요!\n\n감사합니다 :)\n\n* 디자이너 콘솔 매뉴얼\nhttps://#{host}/designer/manual.php?desid=#{desid}",
        "templtName": "디자이너 콘솔 교육 자료 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-12-11 16:00:04",
        "templtCode": "TQ_3633",
        "comments": [
          {
            "cdate": "2023-12-12 13:51:40",
            "name": "검수자",
            "id": "3002323",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-12-12 13:51:40",
            "status": "APR"
          }
        ]
      }
    },
    "designerSettingPortfolioSend": {
      "name": "디자이너 세트 포트폴리오 전송",
      "id": "TQ_5918",
      "needs": [
        "designer",
        "host",
        "path",
        "desid",
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n홈리에종에서 디자이너님을 추천드리고, 연결해 드리기 위해 세트 포트폴리오 업로드를 요청드립니다! \n\n세트 포트폴리오는 주거 인테리어에 홈스타일링까지 완료된 포트폴리오로 부탁드리며, 한 집의 모든 공간을 보여주고 있어야 합니다. 기타 자세한 조건과 설명은 아래 페이지를 통해 확인해 주시고, 페이지를 통해서 세트 포트폴리오를 전송해주세요!\n\n*세트 포트폴리오 전송\nhttps://#{host}/designer/#{path}.php?desid=#{desid}",
        "templtName": "디자이너 세트 포트폴리오 전송",
        "templateType": "BA",
        "templateEmType": "NONE",
        "templateExtra": "",
        "templateAdvert": "",
        "templtTitle": "",
        "templtSubtitle": "",
        "templtImageName": "",
        "templtImageUrl": "",
        "block": "N",
        "dormant": "N",
        "securityFlag": "N",
        "status": "R",
        "inspStatus": "APR",
        "senderKey": "dd2f3f0b034a044b16531e5171cbcc764fb716eb",
        "buttons": [],
        "cdate": "2023-12-26 12:04:21",
        "templtCode": "TQ_5918",
        "comments": [
          {
            "cdate": "2023-12-27 10:34:50",
            "name": "검수자",
            "id": "3029294",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-12-27 10:34:50",
            "status": "APR"
          }
        ]
      },
    },
  };
  if (target === "$all") {
    return tong;
  } else {
    if (tong[target] !== undefined) {
      return tong[target];
    } else {
      throw new Error("invaild target");
    }
  }
}

KakaoTalk.prototype.setTalk = async function (method, name, phone, option = {}) {
  const instance = this;
  try {
    const client = { name: name, phone: phone, ...option };
    const { id: targetId, needs, convert, raw } = this.templateTong(method);
    let tong, contents;
    let convertArr;
    let tempRegexp;
    let convertFunc;

    tong = {
      apikey: this.authObj.apikey,
      userid: this.authObj.userid,
      token: this.authObj.token,
      senderkey: this.authObj.senderkey,
      tpl_code: targetId,
      sender: this.senderPhone,
      receiver_1: client.phone.replace(/-/g, ''),
      recvname_1: client.name,
      subject_1: raw.templtName,
      message_1: "",
      button_1: { button: raw.buttons },
      failover: "Y",
      fsubject_1: raw.templtName,
      fmessage_1: ""
    };

    contents = raw.templtContent;
    for (let i of needs) {
      if (client[i] === undefined) {
        throw new Error("invaild option");
      }
    }
    convertFunc = new Function("obj", convert.replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''));
    convertArr = convertFunc(client);
    for (let { from, to } of convertArr) {
      tempRegexp = new RegExp("#\\{" + from + "\\}", "g");
      contents = contents.replace(tempRegexp, String(to));
    }
    if (convertArr.length === 0) {
      contents = contents.replace(/#\{[^\{\}]+\}/g, client.name);
    }

    if (typeof raw.templtTitle === "string") {
      if (raw.templtTitle.trim() !== "") {
        tong.emtitle_1 = raw.templtTitle;
      }
    }

    tong.message_1 = contents;
    tong.fmessage_1 = contents;
    for (let i = 0; i < raw.buttons.length; i++) {
      tong.fmessage_1 += "\n\n";
      tong.fmessage_1 += raw.buttons[0].name + " : " + raw.buttons[0].linkPc;
    }

    this.message = tong;
    return tong;
  } catch (e) {
    console.log(e);
    return null;
  }
}

KakaoTalk.prototype.templateToBody = async function (method, name, phone, option = {}) {
  const instance = this;
  try {
    const client = { name: name, phone: phone, ...option };
    const { id: targetId, needs, convert, raw } = this.templateTong(method);
    let contents;
    let convertArr;
    let convertFunc;
    let tempRegexp;

    contents = raw.templtContent;
    for (let i of needs) {
      if (client[i] === undefined) {
        throw new Error("invaild option");
      }
    }
    convertFunc = new Function("obj", convert.replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''));
    convertArr = convertFunc(client);
    for (let { from, to } of convertArr) {
      tempRegexp = new RegExp("#\\{" + from + "\\}", "g");
      contents = contents.replace(tempRegexp, String(to));
    }
    if (convertArr.length === 0) {
      contents = contents.replace(/#\{[^\{\}]+\}/g, client.name);
    }

    return contents;
  } catch (e) {
    console.log(e);
    return "";
  }
}

KakaoTalk.prototype.sendTalk = async function (method, name, phone, convertObj = {}) {
  const instance = this;
  const human = this.human;
  const { requestSystem } = this.mother;
  try {
    let options, boo, data;
    let result;

    boo = false;
    data = null;

    try {
      result = await this.setAuth();
      if (!result) {
        throw new Error("auth error");
      }
      options = await this.setTalk(method, name, phone, convertObj);
      if (options === null) {
        throw new Error("set error");
      }

      try {
        ({ data } = await requestSystem("https://kakaoapi.aligo.in/akv10/alimtalk/send/", options));
      } catch (e) {
        console.log(e);
        data = null;
      }
      boo = true;
    } catch (e) {
      console.log(e);
      boo = false;
    }

    if (data !== null && typeof data === "object" && typeof data.message === "string" && /성공/gi.test(data.message)) {
      boo = true;
    } else {
      boo = false;
    }

    if (!boo) {
      await human.sendSms({
        to: phone,
        body: (await this.templateToBody(method, name, phone, convertObj)),
      });
    }

    return data;
  } catch (e) {
    console.log(e);
    await human.sendSms({
      to: phone,
      body: (await this.templateToBody(method, name, phone, convertObj)),
    });
    return null;
  }
}

KakaoTalk.prototype.friendTalk = async function (name, phone, bodyObject) {
  const instance = this;
  const { requestSystem, fileSystem } = this.mother;
  try {
    const subject = bodyObject.ads === true ? "(광고) 홈리에종 HomeLiaison" : "홈리에종 HomeLiaison";
    let options, boo, data;
    let result;
    let body;
    let res;

    if (typeof name !== "string" || typeof phone !== "string" || bodyObject === null || typeof bodyObject !== "object") {
      throw new Error("invalid input");
    }
    if (typeof bodyObject.body !== "string") {
      throw new Error("must be body");
    }
    if (typeof bodyObject.convert !== "object" || bodyObject.convert === null) {
      throw new Error("must be convert object");
    }

    boo = false;
    data = null;

    result = await this.setAuth();

    // body

    body = bodyObject.body;

    for (let key in bodyObject.convert) {
      body = body.replace(new RegExp("#\\{" + key + "\\}", "g"), bodyObject.convert[key](name, phone));
    }

    options = {
      apikey: this.authObj.apikey,
      userid: this.authObj.userid,
      token: this.authObj.token,
      senderkey: this.authObj.senderkey,
      sender: this.senderPhone,
      advert: "Y",
      receiver_1: phone.replace(/-/g, ''),
      recvname_1: name,
      subject_1: subject,
      message_1: body,
      failover: "N",
    };

    if (typeof bodyObject.image === "string") {
      options.image = await fileSystem(`readStream`, [ bodyObject.image ]);
    }
    if (typeof bodyObject.button === "object" && bodyObject.button !== null) {
      options.button_1 = {
        button: [
          {
            name: bodyObject.button.title,
            linkType: "WL",
            linkTypeName: "웹링크",
            linkMo: bodyObject.button.link,
            linkPc: bodyObject.button.link,
          },
        ]
      };
    }

    // send

    try {
      ({ data } = await requestSystem("https://kakaoapi.aligo.in/akv10/friend/send", options));
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (data !== null && typeof data === "object" && typeof data.message === "string" && /성공/gi.test(data.message)) {
      boo = true;
    } else {
      boo = false;
    }

    return boo;
      
  } catch (e) {
    console.log(e);
    return false;
  }
}

KakaoTalk.prototype.friendsTalk = async function (friends, bodyObject) {
  const instance = this;
  const { sleep, messageSend, requestSystem } = this.mother;
  try {
    const channel = "#500_marketing";
    const channel2 = "#marketing";
    const delta = 2000;
    let boo;
    let successList;
    let failList;
    let text;

    if (!Array.isArray(friends)) {
      throw new Error("invalid input 0");
    }
    if (!friends.every((obj) => { return typeof obj === "object" && obj !== null })) {
      throw new Error("invalid input 1");
    }
    if (!friends.every((obj) => { return typeof obj.name === "string" && typeof obj.phone === "string" })) {
      throw new Error("invalid input 2");
    }
    if (typeof bodyObject.convert !== "object" || bodyObject.convert === null) {
      throw new Error("must be convert object");
    }

    successList = [];
    failList = [];

    for (let { name, phone } of friends) {
      boo = await this.friendTalk(name, phone, bodyObject);
      if (boo) {
        console.log(`${name} / ${phone} success`);
        text = `${name} (${phone}) 고객님께 ${bodyObject.title} 친구톡을 전송하였습니다!`;
        await messageSend({ text, channel, voice: false });
        successList.push({ name, phone });
      } else {
        console.log(`${name} / ${phone} fail`);
        text = `${name} (${phone}) 고객님께 ${bodyObject.title} 친구톡 전송에 실패하였습니다!`;
        await messageSend({ text, channel, voice: false });
        failList.push({ name, phone });
      }
      await sleep(delta);
    }

    return {
      success: successList,
      fail: failList,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

KakaoTalk.prototype.ObserveRemain = async function () {
  const instance = this;
  const { requestSystem, messageSend, sleep } = this.mother;
  try {
    const convertConst = 8.400605449041372;
    const timeConst = 30 * 1000;
    const standard = 200;
    const ea = '원';
    let res;
    do {
      res = await requestSystem("https://apis.aligo.in/remain/", {
        key: this.authObj.apikey,
        user_id: this.authObj.userid,
      });
      if (res.data.MMS_CNT < standard) {
        await messageSend({ text: "알리고 충전이 필요해요! 지금 " + String(Math.round(res.data.SMS_CNT * convertConst)) + ea + " 남아 있답니다.", channel: "#700_operation", voice: true });
      }
      await sleep(timeConst);
    } while (res.data.MMS_CNT < standard);
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.ready = async function () {
  const instance = this;
  try {

    // not used

  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.getAccessToken = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  try {
    const { accessToken } = (await requestSystem("https://" + address.secondinfo.host + "/kakaoAccessToken")).data;
    return accessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}

KakaoTalk.prototype.campaignsIdMap = async function (store = false) {
  const instance = this;
  const { requestSystem, fileSystem, equalJson, uniqueValue, sleep } = this.mother;
  try {
    const { moment: { adsId, baseUrl, version } } = this;
    const token = await this.getAccessToken();
    const defaultHeaders = {
      "Authorization": "Bearer " + token,
    }
    const storeName = `${process.cwd()}/temp/campaigns_${uniqueValue("hex")}.json`;
    let url, url2, res;
    let campaigns;

    await sleep(500);

    url = baseUrl + "/" + version + "/campaigns";
    res = await requestSystem(url, {}, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
    campaigns = res.data.content;

    url = baseUrl + "/" + version + "/adGroups";
    for (let campaign of campaigns) {
      await sleep(1000);
      res = await requestSystem(url, { campaignId: String(campaign.id) }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
      campaign.adGroups = equalJson(JSON.stringify(res.data.content));
      for (let adGroup of campaign.adGroups) {
        await sleep(500);
        url2 = baseUrl + "/" + version + "/creatives";
        res = await requestSystem(url2, { adGroupId: String(adGroup.id) }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
        adGroup.ads = equalJson(JSON.stringify(res.data.content));
      }
    }

    if (store) {
      await fileSystem("writeJson", [ storeName, campaigns ]);
    }

    return { store, file: !store ? null : storeName, campaigns };
  } catch (e) {
    console.log(e);
    return null;
  }
}

KakaoTalk.prototype.kakaoComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { moment: { adsId, baseUrl, version } } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  try {
    const collection = "kakaoComplex";
    const idKeyword = 'f';
    const kakaoKeyword = 'k';
    const kakaoKeyKeyword = "kakao";
    let now;
    let startDate;
    let from;
    let to;
    let json;
    let key;
    let advertisement;
    let url;
    let targets;
    let response;
    let complexCampaignArr;
    let campaignObj;
    let adGroupObj;
    let adObj;
    let reportResult;
    let thisAdObj;
    let token;
    let campaigns;
    let tempRows;
    let defaultHeaders;
    let thisResult;
    
    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    token = await this.getAccessToken();
    defaultHeaders = {
      "Authorization": "Bearer " + token,
    }
    thisResult = await this.campaignsIdMap();

    campaigns = thisResult.campaigns;

    for (let i = 0; i < dayNumber; i++) {

      await sleep(60 * 1000);
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      key = dateToString(from).replace(/\-/gi, '') + "_" + kakaoKeyKeyword;
      json = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + kakaoKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
      };

      await sleep(1000);
      url = baseUrl + "/" + version + "/creatives/report";
      complexCampaignArr = [];
      for (let campaign of campaigns) {
        campaignObj = {
          value: {
            charge: 0,
            performance: {
              play: 0,
              impressions: 0,
              clicks: 0,
            }
          },
          information: {
            id: String(campaign.id),
            account: String(adsId),
            name: campaign.name,
          },
          children: []
        };
        await sleep(500);
        targets = campaign.adGroups.map((o) => { return o.ads.map((o) => { return o.id }); }).flat();
        if (targets.slice(0, 100).length > 0) {
          try {
            response = await requestSystem(url, { creativeId: targets.slice(0, 100), start: dateToString(from).replace(/\-/gi, ''), end: dateToString(from).replace(/\-/gi, ''), timeUnit: "DAY", metricsGroup: "BASIC" }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
            reportResult = [].concat(equalJson(JSON.stringify(response.data.data)));
          } catch {
            reportResult = [];
          }
          for (let i = 0; i < Math.floor(targets.length / 100); i++) {
            if (targets.slice((i + 1) * 100, (i + 2) * 100).length > 0) {
              try {
                response = await requestSystem(url, { creativeId: targets.slice((i + 1) * 100, (i + 2) * 100), start: dateToString(from).replace(/\-/gi, ''), end: dateToString(from).replace(/\-/gi, ''), timeUnit: "DAY", metricsGroup: "BASIC" }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
                reportResult = reportResult.concat(equalJson(JSON.stringify(response.data.data)));  
              } catch {
                reportResult = reportResult.concat([]);
              }
            }
            await sleep(60 * 1000);
          }
        } else {
          reportResult = [];
        }
        for (let adGroup of campaign.adGroups) {
          adGroupObj = {
            value: {
              charge: 0,
              performance: {
                play: 0,
                impressions: 0,
                clicks: 0,
              }
            },
            information: {
              id: String(adGroup.id),
              campaign: String(campaign.id),
              name: adGroup.name,
            },
            children: []
          }
          for (let ad of adGroup.ads) {
            thisAdObj = reportResult.find((o) => { return o.dimensions.creative_id === String(ad.id) });
            if (thisAdObj === undefined) {
              thisAdObj = null;
            }
            if (thisAdObj !== null) {
              adObj = {
                value: {
                  charge: thisAdObj.metrics.cost,
                  performance: {
                    play: thisAdObj.metrics.video_play_3s,
                    impressions: thisAdObj.metrics.imp,
                    clicks: thisAdObj.metrics.click,
                  }
                },
                information: {
                  id: String(ad.id),
                  adset: String(adGroup.id),
                  name: ad.name,
                },
              }
              adGroupObj.children.push(equalJson(JSON.stringify(adObj)));
            }
          }
          if (adGroupObj.children.length > 0) {
            adGroupObj.value.charge = adGroupObj.children.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
            adGroupObj.value.performance.play = adGroupObj.children.reduce((acc, curr) => { return acc + curr.value.performance.play }, 0);
            adGroupObj.value.performance.impressions = adGroupObj.children.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
            adGroupObj.value.performance.clicks = adGroupObj.children.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
            campaignObj.children.push(equalJson(JSON.stringify(adGroupObj)));
          }
        }
        if (campaignObj.children.length > 0) {
          campaignObj.value.charge = campaignObj.children.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
          campaignObj.value.performance.play = campaignObj.children.reduce((acc, curr) => { return acc + curr.value.performance.play }, 0);
          campaignObj.value.performance.impressions = campaignObj.children.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
          campaignObj.value.performance.clicks = campaignObj.children.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
          complexCampaignArr.push(equalJson(JSON.stringify(campaignObj)));
        }
      }
  
      advertisement = {
        value: {
          charge: complexCampaignArr.reduce((acc, curr) => { return acc + curr.value.charge }, 0),
          performance: {
            play: complexCampaignArr.reduce((acc, curr) => { return acc + curr.value.performance.play }, 0),
            impressions: complexCampaignArr.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0),
            clicks: complexCampaignArr.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0),
          },
          length: {
            campaign: complexCampaignArr.length,
            adset: complexCampaignArr.map((c) => { return c.children.length }).reduce((acc, curr) => { return acc + curr }, 0),
            ad: complexCampaignArr.map((c) => { return c.children.map((a) => { return a.children.length }).reduce((acc, curr) => { return acc + curr }, 0) }).reduce((acc, curr) => { return acc + curr }, 0),
          }
        },
        campaign: equalJson(JSON.stringify(complexCampaignArr)),
      };

      json.advertisement = equalJson(JSON.stringify(advertisement));

      // store
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });
      console.log(json);
    }

    if (logger !== null) {
      logger.cron("kakao complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return true;

  } catch (e) {
    console.log(e);
    console.log(e.response);
    emergencyAlarm("KakaoTalk.kakaoComplex error : " + e.message).catch((err) => { console.log(err); });
    return false;
  }
}

KakaoTalk.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;
  const back = this.back;
  const { moment: { adsId, baseUrl, version } } = this;
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  try {
    const campaignCollection = "dailyCampaign";
    let tempRows;
    let res;
    let json;
    let from, to;
    let startDate;
    let num;
    let key;
    let now;
    let token;
    let defaultHeaders;
    let thisResult;
    let campaigns;
    let response;
    let url;
    let targets;
    let reportResult;
    let thisCampaign;

    now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }
    token = await this.getAccessToken();
    defaultHeaders = {
      "Authorization": "Bearer " + token,
    }

    thisResult = await this.campaignsIdMap();
    campaigns = thisResult.campaigns;

    url = baseUrl + "/" + version + "/campaigns/report";
    targets = campaigns.map((o) => { return o.id });

    for (let i = 0; i < dayNumber; i++) {

      await sleep(60 * 1000);
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      try {
        response = await requestSystem(url, { campaignId: targets.slice(0, 5), start: dateToString(from).replace(/\-/gi, ''), end: dateToString(from).replace(/\-/gi, ''), timeUnit: "DAY", metricsGroup: "BASIC" }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
        reportResult = [].concat(equalJson(JSON.stringify(response.data.data)));
        for (let i = 0; i < Math.floor(targets.length / 5); i++) {
          if (targets.slice((i + 1) * 5, (i + 2) * 5).length > 0) {
            response = await requestSystem(url, { campaignId: targets.slice((i + 1) * 5, (i + 2) * 5), start: dateToString(from).replace(/\-/gi, ''), end: dateToString(from).replace(/\-/gi, ''), timeUnit: "DAY", metricsGroup: "BASIC" }, { method: "get", headers: { ...defaultHeaders, adAccountId: adsId } });
            reportResult = reportResult.concat(equalJson(JSON.stringify(response.data.data)));
          }
          await sleep(60 * 1000);
        }
      } catch {
        reportResult = [];
      }

      num = 0;
      for (let obj of campaigns) {

        thisCampaign = reportResult.find((o) => { return String(o.dimensions.campaign_id) === String(obj.id) });
        if (thisCampaign !== undefined) {

          key = dateToString(from).replace(/\-/gi, '') + "_" + String(obj.id)
          json = {
            camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'f' + String.fromCharCode(97 + num) + zeroAddition(from.getDate()) + 's',
            key,
            date: { from, to },
            value: {
              charge: thisCampaign.metrics.cost,
              performance: {
                play: thisCampaign.metrics.video_play_3s,
                impressions: thisCampaign.metrics.imp,
                clicks: thisCampaign.metrics.click,
              },
            },
            information: {
              mother: "kakao",
              type: "moment",
              id: {
                account: adsId,
                campaign: String(obj.id),
              },
              name: obj.name,
            }
          };
  
          tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
          if (tempRows.length !== 0) {
            await back.mongoDelete(campaignCollection, { key }, { selfMongo });
          }
          await back.mongoCreate(campaignCollection, json, { selfMongo });
          console.log(json);
          num++;

        }
      }

    }

    if (logger !== null) {
      logger.cron("kakao daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    emergencyAlarm("KakaoTalk.dailyCampaign error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

module.exports = KakaoTalk;
