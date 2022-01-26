const KakaoTalk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.userid = "hliaison";
  this.apikey = "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2";
  this.senderkey = "dd2f3f0b034a044b16531e5171cbcc764fb716eb";
  this.senderPhone = "0220392252";
  this.ip = {
    office: address.officeinfo.ip.outer,
    home: address.homeinfo.ip.outer,
    console: address.backinfo.ip.outer,
    front: address.frontinfo.ip.outer,
    python: address.pythoninfo.ip.outer,
    test: address.testinfo.ip.outer,
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office + "\n", 'g'),
    home: new RegExp(this.ip.home + "\n", 'g'),
    console: new RegExp(this.ip.console + "\n", 'g'),
    front: new RegExp(this.ip.front + "\n", 'g'),
    python: new RegExp(this.ip.python + "\n", 'g'),
    test: new RegExp(this.ip.test + "\n", 'g'),
  };
  this.token = {
    office: '19deb2d6856c0ddd2d9f8b9d584b501ad74cbf63ef82705f5997ad9c7f376fb9f6d5d6fd1b66d9cf83a3c1d8c808ce09ed1990fcc97743694c7b86ca2fb34618LbdUflW6aCQVBPW8hosvNOGiPkz7DOdi0dtvZ9iQVMrZJZDQuRxKRTkGbV+fiUueO5L4SgFz8PB60dl62p9x9w==',
    home: 'cc851a072d2ce73cd7ecf1390fe4e79fb858c0e78c038536bfca379f7b0dcb064a576a7a3048d0ef1afb1c591cda68bc1432614ae143dce4228c02de270969f7gNeHUuqtRL2jE8SWVZSeSAnqB7tqO1KtQ4o8sMn1Q1oFdwfOPVnFLTTaFvNYlSomdjZjihdtRexwdQ9vWRm6pw==',
    front: 'c14a594407ce851449e11aa060556b54faf1e4de714adc353e49f645c9720880a1149ed617ad5ef19de94fed1da6094bdeb4f1a8756bed3b3fe74c8120490fe4hX3mInjDzik6Yz05qMUnpOJkL6ix9DcJRLVAZpofdBoZA89GFnHTtZJ5BUx\/iFFVdRVHW2vD4cA0dmbL8Qkf0A==',
    console: 'aa75be3ea35bd41e6df6f61e78cc60c3ad7c4cc7904977c1d196d2450c32fe0c56149c2e108acf4c5f1ed99fbcab12477abfe8e687e65a1558d6755898030efct1SICS3yu5x3EKNeIHKkY4ua62MZH2aweY7zBm2BvPVvHmQDS1eH9eEX3+peb5hQrO8p8sB7XgSrzsz+3UODcg==',
    python: '786b0d4ac1842028afa3040383a376a7266a56abafd828d6f5d006cf2f1ea7024f58c2b14e61824a4cbceb61f250934008a157b7adb442bc4c971c24cf30b20eC6SuVOSK1WhQraJ6x4anTsijkB/JQmX1zTVQnAG6765nBLZFjWWooknW9NJASAYXEHN4TbTHjTv0I+0eVOrM7g==',
    test: '8ce98534fb72cfbdcdde29b70dca9f0023f1b87478a28ca3e569b902062a7cb86bfcdf4c5621205740d800f6f7ba1049431f4c2d6fe228d7832ad2b24ba88804HWYdxjLttCdQ5VxHoVfWcAijEljawS9yF5ebKfyep8sgYDrV1338I8cVWy3hx4XcpW6I/lMKHJaC/MARUx2zUw==',
  };
  this.authObj = {};
  this.templates = {};
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
  try {
    this.authObj.apikey = this.apikey;
    this.authObj.userid = this.userid;
    this.authObj.senderkey = this.senderkey;

    const { data } = await this.mother.requestSystem("https://icanhazip.com");

    if (this.ipRegExp.office.test(data)) {
      this.authObj.token = this.token.office;
    } else if (this.ipRegExp.home.test(data)) {
      this.authObj.token = this.token.home;
    } else if (this.ipRegExp.console.test(data)) {
      this.authObj.token = this.token.console;
    } else if (this.ipRegExp.python.test(data)) {
      this.authObj.token = this.token.python;
    } else if (this.ipRegExp.test.test(data)) {
      this.authObj.token = this.token.test;
    }

  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.setTemplate = async function () {
  const instance = this;
  const { requestSystem } = this.mother;
  try {
    const response = await requestSystem("https://kakaoapi.aligo.in/akv10/template/list/", this.authObj);
    const { data } = response;
    const { list } = data;
    for (let i of list) {
      this.templates[i.templtCode] = {};
      for (let j in i) {
        this.templates[i.templtCode][j] = i[j];
      }
    }
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.templateTong = function (target) {
  const tong = {
    photo: {
      name: "사진 전송 완료 안내",
      id: "TC_1179",
      needs: [],
      convert: null
    },
    complete: {
      name: "신청 완료 안내",
      id: "TC_1244",
      needs: [],
      convert: null
    },
    certification: {
      name: "인증카톡",
      id: "TC_9600",
      needs: [
        "company",
        "certification"
      ],
      convert: function (obj) {
        return [
          { from: "회사명", to: obj.company },
          { from: "고객명", to: obj.name },
          { from: "인증번호", to: obj.certification }
        ];
      },
    },
    stylingForm: {
      name: "스타일링 계약 서명 요청",
      id: "TG_5277",
      needs: [
        "client"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client }
        ];
      },
    },
    constructForm: {
      name: "시공 계약 서명 요청",
      id: "TG_5279",
      needs: [
        "client"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client }
        ];
      },
    },
    designerPartnership: {
      name: "파트너십 신청",
      id: "TD_5890",
      needs: [],
      convert: null
    },
    designerPresentation: {
      name: "설명회 신청 수정",
      id: "TD_5891",
      needs: [],
      convert: null
    },
    designerPresentationAlarm: {
      name: "신청자 미팅 안내",
      id: "TG_4335",
      needs: [
        "designer",
        "date"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "date", to: obj.date }
        ];
      }
    },
    portfolioFail: {
      name: "포트폴리오 전송 실패 안내",
      id: "TD_7334",
      needs: [],
      convert: null
    },
    designerCheckList: {
      name: "체크리스트 최종",
      id: "TD_9625",
      needs: [
        "date",
        "host",
        "desid"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.name },
          { from: "date", to: obj.date },
          { from: "host", to: obj.host },
          { from: "desid", to: obj.desid },
        ];
      },
    },
    designerProposal: {
      name: "제안서 발송 수정",
      id: "TF_0587",
      needs: [
        "client",
        "host",
        "path",
        "proid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    outOfDesignerProposal: {
      name: "제안서 발송 부재중",
      id: "TF_3653",
      needs: [
        "client",
        "host",
        "path",
        "proid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    designerSelect: {
      name: "고객 디자이너 선택 최종 수정",
      id: "TF_7147",
      needs: [
        "client",
        "designer",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    contentsShareClient: {
      name: "컨텐츠 공유 고객",
      id: "TF_0642",
      needs: [
        "client",
        "rid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "rid", to: obj.rid }
        ];
      },
    },
    contentsShareDesigner: {
      name: "컨텐츠 공유 디자이너",
      id: "TF_0643",
      needs: [
        "client",
        "designer",
        "pid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "pid", to: obj.pid }
        ];
      },
    },
    photoShareClient: {
      name: "사진 공유 고객",
      id: "TF_1248",
      needs: [
        "client",
        "file"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "file", to: obj.file }
        ];
      },
    },
    photoShareDesigner: {
      name: "사진 공유 디자이너",
      id: "TF_1158",
      needs: [
        "client",
        "designer",
        "file"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "file", to: obj.file }
        ];
      },
    },
    preferPhoto: {
      name: "선호 사진 요청 수정",
      id: "TF_3616",
      needs: [
        "client"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
        ];
      },
    },
    outOfClient: {
      name: "부재중 알림 수정",
      id: "TF_3881",
      needs: [
        "client",
        "host",
        "path",
        "cliid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
        ];
      },
    },
    pureOutOfClient: {
      name: "순수 부재중 알림",
      id: "TF_6196",
      needs: [
        "client",
        "emoji0",
        "emoji1",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "emoji0", to: obj.emoji0 },
          { from: "emoji1", to: obj.emoji1 },
        ];
      },
    },
    clientCuration: {
      name: "스타일 찾기 전송",
      id: "TF_6198",
      needs: [
        "client",
        "emoji0",
        "emoji1",
        "host",
        "path",
        "cliid",
        "mode"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "emoji0", to: obj.emoji0 },
          { from: "emoji1", to: obj.emoji1 },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "mode", to: obj.mode },
        ];
      },
    },
    outClientCuration: {
      name: "부재중 큐레이션 전송",
      id: "TF_3540",
      needs: [
        "client",
        "host",
        "path",
        "cliid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
        ];
      },
    },
    curationComplete: {
      name: "큐레이팅 완료",
      id: "TF_3556",
      needs: [
        "client"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
        ];
      },
    },
    paymentAndChannel: {
      name: "계약금 입금 및 등록",
      id: "TF_5340",
      needs: [
        "client",
        "designer"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
        ];
      },
    },
    remainPaymentAndChannel: {
      name: "잔금 입금 완료 수정",
      id: "TF_9757",
      needs: [
        "client",
        "designer",
        "emoji"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "emoji", to: obj.emoji },
        ];
      },
    },
    virtualAccount: {
      name: "가상계좌 안내 수정",
      id: "TF_5485",
      needs: [
        "client",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount",
        "date",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "goodName", to: obj.goodName },
          { from: "bankName", to: obj.bankName },
          { from: "account", to: obj.account },
          { from: "to", to: obj.to },
          { from: "amount", to: obj.amount },
          { from: "date", to: obj.date },
        ];
      },
    },
    realAccount: {
      name: "홈리에종 계좌 안내 수정",
      id: "TG_5195",
      needs: [
        "client",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount",
        "date",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "goodName", to: obj.goodName },
          { from: "bankName", to: obj.bankName },
          { from: "account", to: obj.account },
          { from: "to", to: obj.to },
          { from: "amount", to: obj.amount },
          { from: "date", to: obj.date },
        ];
      },
    },
    firstPayment: {
      name: "계약금 안내 수정",
      id: "TF_6482",
      needs: [
        "client",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    secondPayment: {
      name: "잔금 안내 수정 수정 수정",
      id: "TG_6828",
      needs: [
        "client",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    travelPayment: {
      name: "출장비 안내",
      id: "TF_6513",
      needs: [
        "client",
        "unit",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "unit", to: obj.unit },
          { from: "total", to: obj.total },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    plusDesignFee: {
      name: "서비스 변경 추가 금액 안내",
      id: "TF_6757",
      needs: [
        "client",
        "pastservice",
        "newservice",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "pastservice", to: obj.pastservice },
          { from: "newservice", to: obj.newservice },
          { from: "total", to: obj.total },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    plusDesignerFee: {
      name: "디자이너 변경 추가 견적",
      id: "TF_7173",
      needs: [
        "client",
        "pastdesigner",
        "newdesigner",
        "total",
        "host",
        "path",
        "cliid",
        "needs"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "pastdesigner", to: obj.pastdesigner },
          { from: "newdesigner", to: obj.newdesigner },
          { from: "total", to: obj.total },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    refundCard: {
      name: "환불 신청 완료 카드",
      id: "TF_7403",
      needs: [
        "client",
        "designer",
        "percentage",
        "amount",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "percentage", to: obj.percentage },
          { from: "amount", to: obj.amount },
        ];
      },
    },
    refundVAccount: {
      name: "환불 신청 완료 가상계좌",
      id: "TF_7406",
      needs: [
        "client",
        "designer",
        "percentage",
        "amount",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "percentage", to: obj.percentage },
          { from: "amount", to: obj.amount },
        ];
      },
    },
    designerConsole: {
      name: "디자이너 콘솔 전송",
      id: "TF_9056",
      needs: [
        "designer",
        "host",
        "path",
        "desid"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "desid", to: obj.desid },
        ];
      },
    },
    designerConsoleRequest: {
      name: "홈스타일링 의뢰서 전송",
      id: "TF_9057",
      needs: [
        "designer",
        "client",
        "host",
        "path",
        "desid",
        "mode",
        "cliid"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "desid", to: obj.desid },
          { from: "mode", to: obj.mode },
          { from: "cliid", to: obj.cliid },
        ];
      },
    },
    photoShareAKeywordDesigner: {
      name: "디자이너 개인 포트폴리오 공유",
      id: "TG_0998",
      needs: [
        "designer",
        "file"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "file", to: obj.file }
        ];
      },
    },
    firstMeetingWeekAgo: {
      name: "현장 미팅 안내 일주일",
      id: "TG_2313",
      needs: [
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "date", to: obj.date },
          { from: "day", to: obj.day },
          { from: "hour", to: obj.hour },
          { from: "minute", to: obj.minute },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    firstMeetingDayAgo: {
      name: "현장 미팅 안내 하루전",
      id: "TG_2318",
      needs: [
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid"
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "date", to: obj.date },
          { from: "day", to: obj.day },
          { from: "hour", to: obj.hour },
          { from: "minute", to: obj.minute },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    constructFirst: {
      name: "시공 계약금 수정 수정 수정",
      id: "TG_6824",
      needs: [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "amount", to: obj.amount },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    constructStart: {
      name: "착수금 안내 수정 수정 수정",
      id: "TG_6825",
      needs: [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "amount", to: obj.amount },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    constructMiddle: {
      name: "중도금 안내 수정 수정 수정",
      id: "TG_6826",
      needs: [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "amount", to: obj.amount },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    constructRemain: {
      name: "잔금 안내 수정 수정 수정",
      id: "TG_6827",
      needs: [
        "client",
        "amount",
        "host",
        "path",
        "cliid",
        "needs",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "amount", to: obj.amount },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "cliid", to: obj.cliid },
          { from: "needs", to: obj.needs },
        ];
      },
    },
    generalPayments: {
      name: "일반 결제 완료",
      id: "TG_5450",
      needs: [
        "client",
        "goods",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "goods", to: obj.goods },
        ];
      },
    },
    constructEstimation: {
      name: "시공 견적서",
      id: "TG_9724",
      needs: [
        "client",
        "host",
        "path",
        "proid",
        "buiid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
          { from: "buiid", to: obj.buiid },
        ];
      },
    },
    designerSchedule: {
      name: "디자이너 상세 일정 기입",
      id: "TH_1452",
      needs: [
        "designer",
        "client",
        "date",
        "host",
        "path",
        "desid",
        "mode",
        "cliid",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
          { from: "date", to: obj.date },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "desid", to: obj.desid },
          { from: "mode", to: obj.mode },
          { from: "cliid", to: obj.cliid },
        ];
      },
    },
    clientSchedule: {
      name: "고객 상세 일정 전송",
      id: "TH_1450",
      needs: [
        "client",
        "date",
        "host",
        "path",
        "proid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "date", to: obj.date },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    clientScheduleNow: {
      name: "고객 상세 일정 전송 당일",
      id: "TH_1451",
      needs: [
        "client",
        "date",
        "host",
        "path",
        "proid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "date", to: obj.date },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
        ];
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
    const { id: targetId, needs, convert } = this.templateTong(method);
    let tong, contents;
    let convertArr;
    let tempRegexp;

    tong = {
      apikey: this.authObj.apikey,
      userid: this.authObj.userid,
      token: this.authObj.token,
      senderkey: this.authObj.senderkey,
      tpl_code: targetId,
      sender: this.senderPhone,
      receiver_1: client.phone.replace(/-/g, ''),
      recvname_1: client.name,
      subject_1: this.templates[targetId].templtName,
      message_1: "",
      button_1: { button: this.templates[targetId].buttons },
      failover: "Y",
      fsubject_1: this.templates[targetId].templtName,
      fmessage_1: ""
    };

    if (convert === null) {
      contents = this.templates[targetId].templtContent.replace(/#\{[^\{\}]+\}/g, client.name);
    } else {
      contents = this.templates[targetId].templtContent;
      for (let i of needs) {
        if (client[i] === undefined) {
          throw new Error("invaild option");
        }
      }
      convertArr = convert(client);
      for (let { from, to } of convertArr) {
        tempRegexp = new RegExp("#\\{" + from + "\\}", "g");
        contents = contents.replace(tempRegexp, String(to));
      }
    }

    tong.message_1 = contents;
    tong.fmessage_1 = contents;
    for (let i = 0; i < this.templates[targetId].buttons.length; i++) {
      tong.fmessage_1 += "\n\n";
      tong.fmessage_1 += this.templates[targetId].buttons[0].name + " : " + this.templates[targetId].buttons[0].linkPc;
    }

    this.message = tong;
    return tong;
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.sendTalk = async function (method, name, phone, convertObj = {}) {
  const instance = this;
  const { requestSystem } = this.mother;
  try {
    let options;
    options = await this.setTalk(method, name, phone, convertObj);
    const { data } = await requestSystem("https://kakaoapi.aligo.in/akv10/alimtalk/send/", options);
    return data;
  } catch (e) {
    console.log(e);
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
    await this.setAuth();
    await this.setTemplate();
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.getTemplate = function (target) {
  return this.templates[this.templateTong(target).id];
}

module.exports = KakaoTalk;
