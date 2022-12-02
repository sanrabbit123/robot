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
    console: address.backinfo.ip.outer,
    front: address.frontinfo.ip.outer,
    python: address.pythoninfo.ip.outer,
    test: address.testinfo.ip.outer,
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office + "\n", 'g'),
    console: new RegExp(this.ip.console + "\n", 'g'),
    front: new RegExp(this.ip.front + "\n", 'g'),
    python: new RegExp(this.ip.python + "\n", 'g'),
    test: new RegExp(this.ip.test + "\n", 'g'),
  };
  this.token = {
    office: '7c3384dd3b6e943f8128adb61f537bc316124b2eb2b0f03b81e76db1ccaa3e1ce057594fc9df213004416f9d049d685c8bb0675d4db0b4fdde3610085179cde3ciwCIj/6sre3xiXz5V4aCDIdUvW1oRBjGUbrPgrbNFX2XYIhQzLLtEcMxKSxRXKZztHRlWBIYBJlbOsKNUAMkA==',
    console: '03104da420fc46c60e3cef0be1539c7b1fd7c1ddfcc6255b70d34c8e75ae2f44a186e8a7686dbacdab6e5322f5b8ee8abc3692a9c8fc1200cbdead04389ee3dbL3L46vX2uxyCPrdq54Q8syIsPXc34KaKcg9ATptqShoshq1MM4562RPdv5TlPTK+PJ04FtXcKVY++HuRdDINKQ==',
    python: '53d2f480ce9e4087b03d0fd8b8fac1e87aa47d407fefff0cadcddb4e9301cc705f5ea3c27f3bd1ad0c537daaef82b2a1ff29e2d623e3176034a9be316d1adcd7bU9USuplgt2b2Ivow9XRAwQf7dYTr+naSe5eTD6GWQIJmcJ5ARB1wx8WE2Akvm02I9yfLXlTfyAJG84jAOFPnw==',
    test: '4e8e135049172aa7c2a6df73f93e97da14a44ae587a38dc5ad528d6392301aea364391ab92849acd22f583e5ab342f98b906c22d2b27648de4d880cdd4c4e467Y2Q2mND3WGO2LKixCNvwCOrwvJOoXD3Q6/UD0G7nKK3neoTxlqXG5mvlyVbs8gnWAgEafYfhLx3ZtymgnX4E7g==',
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
      name: "체크리스트 진짜 최종 수정",
      id: "TJ_8591",
      needs: [
        "designer",
        "host",
        "path",
        "desid"
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.name },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "desid", to: obj.desid },
        ];
      },
    },
    designerProposal: {
      name: "제안서 발송 수정 수정 수정 수정",
      id: "TJ_3701",
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
      name: "제안서 발송 부재중 수정",
      id: "TJ_3702",
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
      name: "큐레이션 완료 수정 수정 수정 링크 없는 버전",
      id: "TJ_0535",
      needs: [
        "client",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
        ];
      },
    },
    paymentAndChannel: {
      name: "계약금 입금 및 등록 수정",
      id: "TJ_8587",
      needs: [
        "client",
        "designer",
        "host",
        "path",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
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
      id: "TJ_9111",
      needs: [
        "client",
        "goodName",
        "bankName",
        "account",
        "to",
        "amount",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "goodName", to: obj.goodName },
          { from: "bankName", to: obj.bankName },
          { from: "account", to: obj.account },
          { from: "to", to: obj.to },
          { from: "amount", to: obj.amount },
        ];
      },
    },
    firstPayment: {
      name: "계약금 안내 수정 수정",
      id: "TK_4108",
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
      name: "잔금 안내 수정 수정 수정 수정",
      id: "TK_4109",
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
      name: "출장비 안내 수정",
      id: "TK_4111",
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
      name: "디자이너 콘솔 전송 수정 수정",
      id: "TJ_8643",
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
    finalPush: {
      name: "드랍시 서비스 안내",
      id: "TJ_5864",
      needs: [
        "client",
        "host",
        "path",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
        ];
      },
    },
    designerConsoleRequest: {
      name: "홈스타일링 의뢰서 전송 수정 수정",
      id: "TK_7798",
      needs: [
        "designer",
        "client",
        "host",
        "path",
        "desid",
        "proid",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "desid", to: obj.desid },
          { from: "proid", to: obj.proid },
        ];
      },
    },
    designerConsoleRequestFirstMeeting: {
      name: "홈스타일링 의뢰서 현장 미팅 수정 수정",
      id: "TK_7775",
      needs: [
        "designer",
        "client",
        "date",
        "day",
        "hour",
        "minute",
        "host",
        "path",
        "proid",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
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
      name: "현장 미팅 안내 일주일 수정",
      id: "TJ_3907",
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
      name: "현장 미팅 안내 하루전 수정",
      id: "TJ_3908",
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
      name: "시공 계약금 수정 수정 수정 수정",
      id: "TK_4112",
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
      name: "착수금 안내 수정 수정 수정 수정",
      id: "TK_4113",
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
      name: "중도금 안내 수정 수정 수정 수정",
      id: "TK_4114",
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
      name: "시공 잔금 안내 수정 수정 수정 수정",
      id: "TK_4115",
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
    pushClient: {
      name: "상담 신청 완료 쪼기 수정",
      id: "TJ_3621",
      needs: [
        "client",
        "host",
        "path",
        "cliid",
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
    miniConsulting: {
      name: "미니 신청 완료",
      id: "TJ_0095",
      needs: [
        "client",
        "host",
        "path",
        "useid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "useid", to: obj.useid },
        ];
      },
    },
    miniRequest: {
      name: "미니 디자인 요청 수정",
      id: "TJ_0147",
      needs: [
        "designer",
        "client",
        "host",
        "path",
        "useid",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "useid", to: obj.useid },
        ];
      },
    },
    miniFile: {
      name: "미니 고객 파일 전송 완료",
      id: "TJ_0100",
      needs: [
        "client",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
        ];
      },
    },
    miniConfirmUser: {
      name: "미니 컨펌 대기 고객",
      id: "TJ_0105",
      needs: [
        "client",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
        ];
      },
    },
    miniCompleteDesigner: {
      name: "미니 컨펌 완료 디자이너",
      id: "TJ_0106",
      needs: [
        "designer",
        "client",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
        ];
      },
    },
    miniProposal: {
      name: "미니 제안서 전송",
      id: "TJ_0109",
      needs: [
        "client",
        "host",
        "path",
        "useid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "useid", to: obj.useid },
        ];
      },
    },
    miniComplete: {
      name: "미니 완료 고객",
      id: "TJ_0378",
      needs: [
        "client",
        "host",
        "path",
        "useid",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "useid", to: obj.useid },
        ];
      },
    },
    projectDetail: {
      name: "파일 전달",
      id: "TK_7337",
      needs: [
        "client",
        "designer",
        "file",
        "host",
        "path",
        "proid",
        "key",
      ],
      convert: function (obj) {
        return [
          { from: "client", to: obj.client },
          { from: "designer", to: obj.designer },
          { from: "file", to: obj.file },
          { from: "host", to: obj.host },
          { from: "path", to: obj.path },
          { from: "proid", to: obj.proid },
          { from: "key", to: obj.key },
        ];
      },
    },
    pushDesignerFile: {
      name: "파일 전달 촉구 수정",
      id: "TK_7749",
      needs: [
        "designer",
        "client",
        "file",
        "host",
        "path",
        "proid",
      ],
      convert: function (obj) {
        return [
          { from: "designer", to: obj.designer },
          { from: "client", to: obj.client },
          { from: "file", to: obj.file },
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
