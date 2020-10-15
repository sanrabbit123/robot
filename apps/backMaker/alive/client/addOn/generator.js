const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const Client = require(CLIENT_DIR + "/client.js");

class Clients extends Array {
  get latestRequests() {
    let arr = [];
    for (let i of this) {
      arr.push(i.latestRequest);
    }
    return arr;
  }
}

class WithTools extends Client {

  toMessage() {
    const { request } = this.requests[this.requests.length - 1];
    let message = "";

    message += "문의일 : " + request.timeline.toNormal(true) + "\n";
    message += "고객 아이디 : " + this.cliid + "\n";
    message += "성함 : " + this.name + "\n";
    message += "연락처 : " + this.phone + "\n";
    message += "이메일 : " + this.email + "\n";
    message += "주소 : " + request.space.address.value + "\n";
    message += "가족 구성원 : " + request.family.value + "\n";
    message += "예산 : " + request.budget.value + "\n";
    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    message += "입주 예정일 : " + request.space.resident.expected.toNormal() + "\n";
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "공간 상태 : " + request.space.spec.toMessage() + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";
    message += "유입 경로 : " + request.etc.channel + "\n";

    return message.replace(/\n$/, '');
  }

  toSheet() {
    const { request } = this.requests[this.requests.length - 1];
    let sheet = [];

    sheet.push(request.timeline.toNormal(true));
    sheet.push(this.cliid);
    sheet.push(this.name);
    sheet.push(this.phone);
    sheet.push(this.email);
    sheet.push(request.space.address.value);
    sheet.push(request.family.value);
    sheet.push(request.budget.value);
    sheet.push(request.space.pyeong.toMessage());
    sheet.push(request.space.resident.expected.toNormal());
    sheet.push(request.space.contract.value);
    sheet.push(request.space.spec.toMessage());
    sheet.push(request.etc.comment);
    sheet.push(request.etc.channel);

    return sheet;
  }

}

class WithToolsArr extends Clients {

  toMessage() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toMessage());
    }
    return arr;
  }

  toSheet() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toSheet());
    }
    return arr;
  }

}


module.exports = { Client, Clients, WithTools, WithToolsArr };
