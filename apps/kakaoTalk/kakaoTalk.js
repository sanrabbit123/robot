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
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office, 'gi'),
    console: new RegExp(this.ip.console, 'gi'),
    front: new RegExp(this.ip.front, 'gi'),
    python: new RegExp(this.ip.python, 'gi'),
    test: new RegExp(this.ip.test, 'gi'),
    second: new RegExp(this.ip.second, 'gi'),
    member: new RegExp(this.ip.member, 'gi'),
  };
  this.token = {
    office: "12db5e3f9f69752ae47ca3895c49041f3fef3adaf0d6367e2f76d98cf79ec4a6e26dbcf5e1dde678fe8fcc6b49d11ce4928b06fa3656b5c6f72a43995ac3942fd8igM/kv6V9akkKxrdnTki9fYYNxgsKQxKoIfZIwjZxUHyiE9yQVsuMzH30PXsQigRc0jfMMogOxffpGCON0Kg==",
    console: "c9d3a094da0f8d891f0c7e460c1c7c5c2172d87d8b63d0a3ad871b906e48cb813d840230de4c75991109377085c0c4e1f39891676b0a0bcdbb4b11c8518cf0b89WdqgM6A3cERFmaTG6M65cLeW2wa5Wft/l+tPb6JI9pFfYOd4ZdiXG9f1+VkjaacMgtbxy9AwD+UnEErUPMYpg==",
    python: "6bc7b36ce07134ac35186319824016b9e86385774dda5574d5746502ccadc016b6d606c986454ad478f97aa227d5522cad5613a3e5c08ecb19a49f3a7e26cc20ysYT9g6Rf+u0hsZg2k8g4v2x32tWeq7D3ZSSzImq43fLuI2iRzKvA4uLYzpXKEksOwFjcJSzi54ySK7i92ml7Q==",
    test: "666639a00a05b4c3c9dbdc84815802c9a640d35f222155604a9e14d662404da70130a5e01a84fcf47a070331ddd0397277d30fb48759cae3628a9f19904426732wKlg9P6eu73NONhd1tAiBahj5XVFGL82SAl7gi/bCkYkhRVxgVjyT9T4AQlsuLSedDd37TIT9VAbcWAUsY9dQ==",
    second: "86d7070538aa06d9b6426d1138b99fc9df9c724aa360264d06c3643f23baada5cd9061a8b8184294ea42e4d9515714edf9a8c87e79c6e5daf7e76297627837b043INKNy+i3O7koE5RVZjpmoYYYrwksX7QKoa7F1NHDbQi+4Oe3bvEbHm/26twLtZ/FNM47nI727H8fPrwHrjIg==",
    member: "12db5e3f9f69752ae47ca3895c49041f3fef3adaf0d6367e2f76d98cf79ec4a6e26dbcf5e1dde678fe8fcc6b49d11ce4928b06fa3656b5c6f72a43995ac3942fd8igM/kv6V9akkKxrdnTki9fYYNxgsKQxKoIfZIwjZxUHyiE9yQVsuMzH30PXsQigRc0jfMMogOxffpGCON0Kg==",
  };
  this.authObj = {};
  this.message = {};
  this.dir = process.cwd() + "/kakaoTalk";
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
      "name": "사진 공유 고객",
      "id": "TF_1248",
      "needs": [
        "client",
        "file"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"file\", to: obj.file }\n        ];\n      }",
      "raw": {
        "templtContent": "#{client} 고객님 안녕하세요 :) 촬영한 사진이 나와서 연락드려요!\n\n#{client}님만의 매력과 취향이 묻어나는 아름다운 집이네요 :) #{client}님의 소중한 집을 꾸미는 일에 저희 홈리에종과 함께 해주셔서 감사했습니다! 편안하고 아름다운 집에서 늘 행복한 일상을 이어나가시기를 바랄게요!\n\n고객 후기 콘텐츠는 순차 발행 중이라 나오면 추후에 링크 보내드리겠습니다!\n\n사진 공유 : https://drive.google.com/file/d/#{file}/view?usp=sharing",
        "templtName": "사진 공유 고객",
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
        "cdate": "2021-07-13 15:52:04",
        "templtCode": "TF_1248",
        "comments": [
          {
            "cdate": "2021-07-13 16:46:18",
            "name": "검수자",
            "id": "1440268",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2021-07-13 16:46:18",
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
      "name": "큐레이션 완료 최종 수정",
      "id": "TL_5994",
      "needs": [
        "client"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n작성하신 내용은 모두 전달되었습니다.\n\n고객님의 요청 사항을 토대로 더 상세한 상담을 위해, 영업일 기준 3-4일 안에 전화드리겠습니다 :)\n\n감사합니다!",
        "templtName": "큐레이션 완료 최종 수정",
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
        "cdate": "2023-01-27 12:31:25",
        "templtCode": "TL_5994",
        "comments": [
          {
            "cdate": "2023-01-27 14:41:05",
            "name": "검수자",
            "id": "2367698",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-01-27 14:41:05",
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
      "name": "드랍시 서비스 안내",
      "id": "TJ_5864",
      "needs": [
        "client",
        "host",
        "path"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님!\n홈리에종에 문의주셔서 감사드립니다 :)\n\n유선으로 말씀드린 자세한 서비스 안내 페이지 보내드립니다. 확인해보시고 궁금하신 내용은 문의주세요!\n\n* 홈리에종 서비스 안내\nhttps://#{host}/#{path}.php\n\n\n정해진 시간 내 할 것 많고 알 것 많은 인테리어,\n\n1. 시공부터 스타일링까지 한 번에\n2. 전문 디자이너가 우리 집 맞춤으로 한땀한땀 정성스럽게\n3. 홈리에종의 시스템과 케어로 안정감 있게\n4. 실제 우리 집에 만족스러운 변화를 가져오는\n\n홈리에종과 함께 하세요!",
        "templtName": "드랍시 서비스 안내",
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
        "cdate": "2022-08-04 12:53:50",
        "templtCode": "TJ_5864",
        "comments": []
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
      "name": "미니 신청 완료",
      "id": "TJ_0095",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client} 고객님,\n홈리에종 Mini 서비스 결제가 완료되었습니다. \n\n담당 디자이너가 #{client}님의 정보를 확인하는 동안 다음 과정을 진행해 주시면, 디자이너와의 상담이 시작됩니다! \n\n1. 우리집 직접 실측하기 \n- 스타일링이 필요한 공간의 가로 * 세로, 창문, 사용할 가구의 사이즈를 가이드에 따라 실측해 주세요.\n\n2. 내가 원하는 컨셉 준비하기\n- 디자이너와의 상담 전, 내가 원하는 무드를 정확하게 알고있다면 좀 더 효율적으로 미팅 시간을 활용할 수 있어요! \n- 레퍼런스 이미지를 미리 준비해둔다면 훨씬 소통이 매끄럽겠죠?\n\n3. 상세 정보와 현장 사진 보내기\n- 1, 2번을 마치셨다면 실측 가이드 페이지를 통해 상세 정보와 현장 사진, 레퍼런스 이미지를 보내주세요!\n\n* 상세 정보 전송 및 실측 가이드 페이지\nhttps://#{host}/middle/#{path}?useid=#{useid}",
        "templtName": "미니 신청 완료",
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
        "cdate": "2022-06-14 11:42:34",
        "templtCode": "TJ_0095",
        "comments": []
      }
    },
    "miniRequest": {
      "name": "미니 디자인 요청 수정",
      "id": "TJ_0147",
      "needs": [
        "designer",
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{designer} 디자이너님, #{client} 고객님의 홈리에종 Mini 서비스 신규 프로젝트 진행을 알려드립니다!\n\n* 디자인 요청 페이지\nhttps://#{host}/middle/#{path}?useid=#{useid}\n\n#{client} 고객님이 필요한 공간을 실측해주시고, 원하는 컨셉에 대해 요청을 남기셨어요. 공간 사진과 고객의 요청사항을 꼼꼼히 비교하여 원활한 작업이 진행될 수 있도록 영업일 기준 2일 내로 고객님과 상담을 진행해 주세요!\n\n[TIP] 간혹 원하는 컨셉이 없거나 디자이너의 추천을 원하는 경우도 있기 때문에 디자이너님이 제안해주실 방향도 따로 준비해주신다면 원활하게 미팅을 진행하실 수 있을 거에요!\n\n혹시 고객님께서 실측 진행을 하지 않으셨다면, 직접 하실 수 있도록 요청해 주시고,\n실측 정보를 확인 한 기준 날짜로 제안서 작업 시작일임을 안내해 주세요!\n\n* 디자인 요청 페이지\nhttps://#{host}/middle/#{path}?useid=#{useid}",
        "templtName": "미니 디자인 요청 수정",
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
        "cdate": "2022-06-14 15:23:43",
        "templtCode": "TJ_0147",
        "comments": []
      }
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
      "name": "미니 제안서 전송",
      "id": "TJ_0109",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{client}님! 디자인 제안서가 도착했어요. #{client}님 공간의 무드 체인지! 바로 시작해보세요!\n\n제안서 페이지를 오픈하여 내용을 확인해주시고, 시스템 내 리뷰창에 댓글을 남겨주세요. 확인 완료 댓글이 없는 경우, 페이지 오픈 기준 2일 내 자동으로 프로젝트가 종료됩니다.\n\n혹시 궁금한 점이 있다면 제안서 페이지 아래 부분에 위치한 댓글란에 확인 댓글과 함께 같이 문의를 남겨주세요.\n내용 확인 후, 1-2일 안으로 답변드리도록 하겠습니다!\n\n* 디자인 제안서\nhttps://#{host}/middle/#{path}?useid=#{useid}",
        "templtName": "미니 제안서 전송",
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
        "cdate": "2022-06-14 12:12:27",
        "templtCode": "TJ_0109",
        "comments": []
      }
    },
    "miniComplete": {
      "name": "미니 완료 고객",
      "id": "TJ_0378",
      "needs": [
        "client",
        "host",
        "path",
        "useid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host },\n          { from: \"path\", to: obj.path },\n          { from: \"useid\", to: obj.useid },\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님!\n디자이너님과 진행한 홈리에종 Mini 서비스는 만족하셨나요?\n\n가구의 변경 없이 패브릭, 액자, 소품 등의 변화로도 공간의 무드를 변화시킬 수 있는 홈리에종의 Mini 서비스, 어떠셨나요?\n\n아래 공유해 드리는 고객 만족도 설문지를 통해 홈리에종이 더 나은 서비스를 제공할 수 있도록, 고객님들의 의견에 귀 기울이겠습니다. 솔직한 설문 답변을 부탁드릴게요!\n\n* 고객 만족도 설문지\nhttps://#{host}/middle/#{path}/?useid=#{useid}&reviewcard=true",
        "templtName": "미니 완료 고객",
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
        "cdate": "2022-06-15 15:21:38",
        "templtCode": "TJ_0378",
        "comments": []
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
      "name": "디자이너 콘솔 교육 공지 수정",
      "id": "TM_5412",
      "needs": [
        "designer",
        "date",
        "host",
        "desid"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"designer\", to: obj.designer },\n          { from: \"date\", to: obj.date },\n          { from: \"host\", to: obj.host },\n          { from: \"desid\", to: obj.desid }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요, #{designer} 실장님!\n홈리에종은 디자이너님들의 편의 제공과 고객님께 더 신뢰 있는 서비스 제공을 위해 '디자이너 콘솔'을 구상하여 제작하였습니다.\n\n디자이너 콘솔은 홈리에종과 협업 관계에 있는 디자이너님들이 홈리에종을 통해 받으신 모든 홈스타일링 프로젝트를 더 편리하고 직관적으로 관리하고 공유할 수 있도록 제작된 관리자 콘솔입니다.\n\n디자이너 콘솔을 이용하시면 프로젝트를 쉽게 관리할 수 있는 것은 물론, 고객님께 더 편리한 방식으로 프로젝트 진행 상황과 파일을 공유하실 수 있으며, 홈리에종에 별도로 연락하실 필요 없이 실시간으로 프로젝트 상황을 공유할 수 있습니다. 이를 통해 실장님과 고객님 사이의 의사 소통을 더욱 원활하게 할 수 있도록 하였습니다.\n\n디자이너 콘솔 릴리즈에 앞서, 릴리즈 날짜와 사전 교육 자료를 보내드리겠습니다. 하단 링크를 통해 디자이너 콘솔 메뉴얼 페이지로 이동하시면, 릴리즈 될 디자이너 콘솔에 대한 자세한 설명과 이용법에 대한 상세한 영상 메뉴얼까지 확인하실 수 있습니다. 디자이너 콘솔은 #{date}에 릴리즈 예정이며, 실장님께서는 릴리즈일 전에 보내드린 교육 자료를 참고하여 디자이너 콘솔 이용법을 숙지하시기 바랍니다.\n\n기타 궁금하신 사항이나 문의 사항이 있으시면 홈리에종 카카오 채널을 통해 문의해주시기 바랍니다. 감사합니다 :)\n\n* 릴리즈 날짜 : #{date} 12시\n* 디자이너 콘솔 메뉴얼\nhttps://#{host}/designer/manual.php?desid=#{desid}",
        "templtName": "디자이너 콘솔 교육 공지 수정",
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
        "cdate": "2023-03-31 10:52:44",
        "templtCode": "TM_5412",
        "comments": [
          {
            "cdate": "2023-03-31 13:59:18",
            "name": "검수자",
            "id": "2526825",
            "userName": "검수자",
            "commentContent": "안녕하세요. 카카오톡 알림톡 검수 담당자입니다.\r\n\r\n신청하신 메시지 확인하여 승인되었습니다.\r\n참고로 상기와 같은 공지성 및 안내성 메시지는 수신자액션(수신자의 요청 및 신청 또는 계약관계 등)에 의해 발송하는 메시지에 한하여 가능합니다. 이점, 상기하시어 알림톡 운영 바랍니다.\r\n\r\n승인 이후 발송되는 메시지의 책임은 발송자에게 있으며, 이후 어뷰징 확인 또는 신고가 다수 접수될 경우 해당 프로필에 대한 차단이 이루어집니다. \r\n또한 차단된 프로필은 사업자등록번호 기준으로 관리되기에 해당 사업자등록번호로는 영구적으로 알림톡 사용이 불가한 점 참고하여 주시기 바랍니다.\r\n\r\n감사합니다.",
            "createdAt": "2023-03-31 13:59:18",
            "status": "APR"
          }
        ]
      }
    },
    "aspirantSubmit": {
      "name": "파트너십 신청 완료",
      "id": "TN_3473",
      "needs": [
        "client",
        "host"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님!\n작성하신 디자이너 파트너십 신청서는 접수 완료되었습니다 :)\n\n추가적인 포트폴리오 발송이 필요하시다면, 아래 링크를 통해 보내주세요! 검토 후 확인 연락드리겠습니다.\n\n*추가 포트폴리오 전송\nhttps://#{host}/aspirant.php?mode=portfolio",
        "templtName": "파트너십 신청 완료",
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
        "cdate": "2023-05-25 15:57:46",
        "templtCode": "TN_3473",
        "comments": [
          {
            "cdate": "2023-05-25 16:40:16",
            "name": "검수자",
            "id": "2636062",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-05-25 16:40:16",
            "status": "APR"
          }
        ]
      },
    },
    "aspirantPortfolio": {
      "name": "추가 포트폴리오 전송",
      "id": "TN_3474",
      "needs": [
        "client",
        "host"
      ],
      "convert": "function (obj) {\n        return [\n          { from: \"client\", to: obj.client },\n          { from: \"host\", to: obj.host }\n        ];\n      }",
      "raw": {
        "templtContent": "안녕하세요 #{client}님!\n보내주신 추가 포트폴리오는 접수 완료되었습니다 :)\n\n또 추가적인 포트폴리오 발송이 필요하시다면, 아래 링크를 통해 보내주세요! 최대한 많이 보내주시면 모두 검토 후, 확인 연락드리겠습니다!\n\n*추가 포트폴리오 전송\nhttps://#{host}/aspirant.php?mode=portfolio",
        "templtName": "추가 포트폴리오 전송",
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
        "cdate": "2023-05-25 15:59:44",
        "templtCode": "TN_3474",
        "comments": [
          {
            "cdate": "2023-05-25 16:40:21",
            "name": "검수자",
            "id": "2636064",
            "userName": "검수자",
            "commentContent": "",
            "createdAt": "2023-05-25 16:40:21",
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
    const subject = "(광고) 홈리에종 HomeLiaison";
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
        await requestSystem("https://" + instance.address.testinfo.host + "/marketingMessage", { text, channel: channel2 }, { headers: { "Content-Type": "application/json" } });
        successList.push({ name, phone });
      } else {
        console.log(`${name} / ${phone} fail`);
        text = `${name} (${phone}) 고객님께 ${bodyObject.title} 친구톡 전송에 실패하였습니다!`;
        await messageSend({ text, channel, voice: false });
        await requestSystem("https://" + instance.address.testinfo.host + "/marketingMessage", { text, channel: channel2 }, { headers: { "Content-Type": "application/json" } });
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

module.exports = KakaoTalk;
