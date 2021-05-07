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
    bridge: address.bridgeinfo.ip.outer,
    console: address.backinfo.ip.outer,
    front: address.frontinfo.ip.outer,
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office + "\n", 'g'),
    home: new RegExp(this.ip.home + "\n", 'g'),
    bridge: new RegExp(this.ip.bridge + "\n", 'g'),
    console: new RegExp(this.ip.console + "\n", 'g'),
    front: new RegExp(this.ip.front + "\n", 'g'),
  };
  this.token = {
    office: 'f05cb48bb2b2397b0a00673f9d042cb11e617e2f474adb80aa21def198e93defb9772db0decfdceb11711fe00220d7353e22750dfa4a033787d2b65baa74c0edRpWklMHb+gajmvp0DWz3EOkwdpHCjhFmkliDkyfGD20Rw/GTrgkATGf016jQH2sPQym/QCo7cxJnGmM4do74ZA==',
    home: 'cc851a072d2ce73cd7ecf1390fe4e79fb858c0e78c038536bfca379f7b0dcb064a576a7a3048d0ef1afb1c591cda68bc1432614ae143dce4228c02de270969f7gNeHUuqtRL2jE8SWVZSeSAnqB7tqO1KtQ4o8sMn1Q1oFdwfOPVnFLTTaFvNYlSomdjZjihdtRexwdQ9vWRm6pw==',
    bridge: 'ad71db7b43a31011c2cad920198f0820c3ee1984db28fea5770ea728b8b1bc0fbc231da21c02113119568762aec1588c0a7c29b05c354d07493a8b9341436d3fZaVjZRr90NmU9J/cDxAMHR3tjA9/k6mK22IkZFPVHMGbuqY3erFhtZAq6/L4B4JCcG5cmfbRJAGE4OTK71Udwg==',
    front: 'c14a594407ce851449e11aa060556b54faf1e4de714adc353e49f645c9720880a1149ed617ad5ef19de94fed1da6094bdeb4f1a8756bed3b3fe74c8120490fe4hX3mInjDzik6Yz05qMUnpOJkL6ix9DcJRLVAZpofdBoZA89GFnHTtZJ5BUx\/iFFVdRVHW2vD4cA0dmbL8Qkf0A==',
    console: 'aa75be3ea35bd41e6df6f61e78cc60c3ad7c4cc7904977c1d196d2450c32fe0c56149c2e108acf4c5f1ed99fbcab12477abfe8e687e65a1558d6755898030efct1SICS3yu5x3EKNeIHKkY4ua62MZH2aweY7zBm2BvPVvHmQDS1eH9eEX3+peb5hQrO8p8sB7XgSrzsz+3UODcg==',
  };
  this.authObj = {};
  this.templates = {};
  this.message = {};
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
    } else if (this.ipRegExp.bridge.test(data)) {
      this.authObj.token = this.token.bridge;
    } else if (this.ipRegExp.console.test(data)) {
      this.authObj.token = this.token.console;
    }

  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.setTemplate = async function () {
  const instance = this;
  try {
    const { data } = await this.mother.requestSystem("https://kakaoapi.aligo.in/akv10/template/list/", this.authObj);
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
      name: "설명회 사전 안내",
      id: "TD_6666",
      needs: [
        "date"
      ],
      convert: function (obj) {
        return [
          { from: "고객명", to: obj.name },
          { from: "날짜", to: obj.date }
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
      name: "제안서 발송",
      id: "TE_4038",
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
      name: "고객 디자이너 선택",
      id: "TE_4039",
      needs: [
        "client",
        "designer",
        "host",
        "path"
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
  };
  return tong[target];
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
        contents = contents.replace(tempRegexp, to);
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
  try {
    let options;
    options = await this.setTalk(method, name, phone, convertObj);
    const { data } = await this.mother.requestSystem("https://kakaoapi.aligo.in/akv10/alimtalk/send/", options);
    console.log(data);
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

KakaoTalk.prototype.sendAspirantPresentation = async function () {
  const instance = this;
  const back = this.back;
  const slack = this.mother.slack_bot;
  try {
    await this.ready();
    const targetId = "TD_6666";
    let allAspirants, targetArr;
    let options, response;

    allAspirants = await back.getAspirantsByQuery({});
    targetArr = allAspirants.meetingAlarm();

    for (let { name, phone, dateString, alarm } of targetArr) {
      if (alarm) {
        options = {
          apikey: this.authObj.apikey,
          userid: this.authObj.userid,
          token: this.authObj.token,
          senderkey: this.authObj.senderkey,
          tpl_code: targetId,
          sender: this.senderPhone,
          receiver_1: phone.replace(/-/g, ''),
          recvname_1: name,
          subject_1: this.templates[targetId].templtName,
          message_1: this.templates[targetId].templtContent.replace(/#\{고객명\}/g, name).replace(/#\{날짜\}/g, dateString),
          button_1: { button: this.templates[targetId].buttons },
          failover: "Y",
          fsubject_1: this.templates[targetId].templtName,
          fmessage_1: this.templates[targetId].templtContent.replace(/#\{고객명\}/g, name).replace(/#\{날짜\}/g, dateString)
        };
        response = await this.mother.requestSystem("https://kakaoapi.aligo.in/akv10/alimtalk/send/", options);
        await slack.chat.postMessage({ text: name + " 디자이너님에게 설명회 안내 알림톡을 전송하였습니다!", channel: "#300_designer" });
        console.log(response.data);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = KakaoTalk;
