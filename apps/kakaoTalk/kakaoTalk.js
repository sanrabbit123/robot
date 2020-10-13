const KakaoTalk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();

  this.userid = "hliaison";
  this.apikey = "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2";
  this.senderkey = "dd2f3f0b034a044b16531e5171cbcc764fb716eb";
  this.ip = {
    office: address.officeinfo.ip.outer,
    home: address.homeinfo.ip.outer,
    bridge: address.bridgeinfo.ip.outer,
    console: address.consoleinfo.ip.outer,
    front: address.frontinfo.ip.outer,
  };
  this.ipRegExp = {
    office: new RegExp(this.ip.office + "\n", 'g'),
    home: new RegExp(this.ip.home + "\n", 'g'),
    bridge: new RegExp(this.ip.bridge + "\n", 'g'),
    console: new RegExp(this.ip.console + "\n", 'g'),
    front: new RegExp(this.ip.front + "\n", 'g'),
  }
  this.token = {
    office: '717dee27a1c36fa03609ea5decb1262a4eee5fd4acb413efb25005c7303e7cf159832a278f72563d8f85179c8d743fc68dc268d0755579ca2250f929b1b878b31HpLNZ4PHSOLw/YjhGTq+sdhRCwumNg2GigT/bNqD8FB+gVWF/w+sv3pR9bisbG7pDOUT7uL/4xGXknWFGnS0w==',
    home: '576217887e73737604c357294e16d069c890b2db80a5c6d789320db80b3708d0a59bbef46deab257ea436ad7f89d910258d24002410ff4982a389f591fed190alqWwYl/GZyf937+4r16MsR650J9gwoR5rf2QOjjwaKO2QtnWGb3KzuOPTtLGnEUQtCkw3j5Z31o+AkyhxQUhlA==',
    bridge: '1869e260c916b51987e1efafd84bc83c6b135894738bf6e63e87d79be8eb25ca0e1401f5a567deaeb52f57cd1f1473679642bfe350293d5ad5c21e8e130bc52b67i\/XFvDRs4LWXM1gY+B8Jn2xvlVkSJQ04VQtD44dvPlS7n8ofviesmSRhCrPZTStNA5Am4EHXjCp9jTUo9Ntw==',
    front: 'c14a594407ce851449e11aa060556b54faf1e4de714adc353e49f645c9720880a1149ed617ad5ef19de94fed1da6094bdeb4f1a8756bed3b3fe74c8120490fe4hX3mInjDzik6Yz05qMUnpOJkL6ix9DcJRLVAZpofdBoZA89GFnHTtZJ5BUx\/iFFVdRVHW2vD4cA0dmbL8Qkf0A==',
    console: '',
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
    pastcomplete: "TA_7532",
    complete: "TC_1244",
    photo: "TC_1179",
  };
  return tong[target];
}

KakaoTalk.prototype.setTalk = async function (method, name, phone) {
  const instance = this;
  try {
    let client = { name: name, phone: phone };
    let targetId = this.templateTong(method);
    let options = {
      apikey: this.authObj.apikey,
      userid: this.authObj.userid,
      token: this.authObj.token,
      senderkey: this.authObj.senderkey,
      tpl_code: targetId,
      sender: "01024560311",
      receiver_1: client.phone.replace(/-/g, ''),
      recvname_1: client.name,
      subject_1: this.templates[targetId].templtName,
      message_1: this.templates[targetId].templtContent.replace(/#\{[^\{\}]+\}/g, client.name),
      button_1: { button: this.templates[targetId].buttons },
      failover: "Y",
      fsubject_1: this.templates[targetId].templtName,
    }

    if (this.templates[targetId].buttons.length === 0) {
      options.fmessage_1 = this.templates[targetId].templtContent.replace(/#\{[^\{\}]+\}/g, client.name);
    } else if (this.templates[targetId].buttons.length === 1) {
      options.fmessage_1 = this.templates[targetId].templtContent.replace(/#\{[^\{\}]+\}/g, client.name) + "\n\n" + this.templates[targetId].buttons[0].name + " : " + this.templates[targetId].buttons[0].linkPc;
    }

    this.message = options;
    return options;
  } catch (e) {
    console.log(e);
  }
}

KakaoTalk.prototype.sendTalk = async function (method, name, phone) {
  const instance = this;
  try {
    let options = await this.setTalk(method, name, phone);
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
  return this.templates[this.templateTong(target)];
}


module.exports = KakaoTalk;
