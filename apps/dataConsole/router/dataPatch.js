const DataPatch = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
}

//CLIENT ----------------------------------------------------------------------------------------

DataPatch.prototype.clientStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    cliid: {
      name: "아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };
  model.info = {
    status: {
      name: "상태",
      width: 50,
      left: 30,
    },
    outreason: {
      name: "유출 이유",
      width: 100,
    },
    callHistory: {
      name: "전화 기록",
      width: 100,
    },
    timeline: {
      name: "문의일",
      width: 100,
    },
    phone: {
      name: "연락처",
      width: 120,
    },
    email: {
      name: "이메일",
      width: 180,
    },
    budget: {
      name: "예산",
      width: 120,
    },
    address: {
      name: "주소",
      width: 250,
    },
    contract: {
      name: "계약 상태",
      width: 80,
    },
    pyeong: {
      name: "평수",
      width: 60,
    },
    living: {
      name: "거주중",
      width: 60,
    },
    expected: {
      name: "입주 예정일",
      width: 100,
    },
    precheck: {
      name: "사전 점검일",
      width: 100,
    },
    empty: {
      name: "집 비는 날",
      width: 100,
    },
    movein: {
      name: "이사일",
      width: 100,
    },
    room: {
      name: "방",
      width: 60,
    },
    bathroom: {
      name: "화장실",
      width: 60,
    },
    valcony: {
      name: "발코니",
      width: 60,
    },
    family: {
      name: "가족 구성원",
      width: 150,
    },
    comment: {
      name: "요청 사항",
      width: 250,
    },
    channel: {
      name: "유입 채널",
      width: 100,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.clientCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "cliid",
    ],
    info: [
      "timeline",
      "phone",
      "budget",
      "address",
    ],
    exceptionHeight: [
      false,
      false,
      false,
      true,
    ],
  };

  return targetColumns;
}

DataPatch.prototype.clientWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "cliid",
    ],
    info: [
      { name: "상태", target: "status" },
      { name: "유출 이유", target: "outreason" },
      { name: "전화 기록", target: "callHistory" },
      { name: "문의일", target: "timeline" },
      { name: "연락처", target: "phone" },
      { name: "이메일", target: "email" },
      { name: "예산", target: "budget" },
      { name: "주소", target: "address" },
      { name: "계약 상태", target: "contract" },
      { name: "평수", target: "pyeong" },
      { name: "거주중", target: "living" },
      { name: "입주 예정일", target: "expected" },
      { name: "사전 점검일", target: "precheck" },
      { name: "집 비는 날", target: "empty" },
      { name: "이사일", target: "movein" },
      { name: "방", target: "room" },
      { name: "화장실", target: "bathroom" },
      { name: "발코니", target: "valcony" },
      { name: "가족 구성원", target: "family" },
      { name: "요청 사항", target: "comment" },
      { name: "유입 채널", target: "channel" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.clientMap = function () {
  const map = {
    name: { position: "name", type: "string", searchBoo: true, },
    cliid: { position: "cliid", type: "string", searchBoo: true, },
    phone: { position: "phone", type: "string", searchBoo: true, },
    email: { position: "email", type: "string", searchBoo: true, },
    timeline: { position: "requests.0.request.timeline", type: "date", searchBoo: true, },
    budget: { position: "requests.0.request.budget", type: "string", searchBoo: true, },
    family: { position: "requests.0.request.family", type: "string", searchBoo: true, },
    address: { position: "requests.0.request.space.address", type: "string", searchBoo: true, },
    contract: { position: "requests.0.request.space.contract", type: "string", searchBoo: true, },
    pyeong: { position: "requests.0.request.space.pyeong", type: "number", searchBoo: true, },
    room: { position: "requests.0.request.space.spec.room", type: "number", searchBoo: false, },
    bathroom: { position: "requests.0.request.space.spec.bathroom", type: "number", searchBoo: false, },
    valcony: { position: "requests.0.request.space.spec.valcony", type: "boolean", searchBoo: false, },
    living: { position: "requests.0.request.space.resident.living", type: "boolean", searchBoo: false, },
    expected: { position: "requests.0.request.space.resident.expected", type: "date", searchBoo: true, },
    comment: { position: "requests.0.request.etc.comment", type: "date", searchBoo: false, },
    channel: { position: "requests.0.request.etc.channel", type: "date", searchBoo: true, },
    status: { position: "requests.0.analytics.response.status", type: "date", searchBoo: true, },
    outreason: { position: "requests.0.analytics.response.outreason", type: "array", searchBoo: true, },
    callHistory: { position: "requests.0.analytics.date.callHistory", type: "array", searchBoo: false, },
    precheck: { position: "requests.0.analytics.date.space.precheck", type: "date", searchBoo: false, },
    empty: { position: "requests.0.analytics.date.space.empty", type: "date", searchBoo: false, },
    movein: { position: "requests.0.analytics.date.space.movein", type: "date", searchBoo: false, },
  };
  return map;
}


//DESIGNER --------------------------------------------------------------------------------------

DataPatch.prototype.designerStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    desid: {
      name: "아이디",
      left: 35,
    },
    designer: {
      name: "성함",
      left: 128,
    }
  };

  model.info = {
    status: {
      name: "계약 상태",
      width: 50,
      left: 30,
    },
    date: {
      name: "계약일",
      width: 100,
    },
    phone: {
      name: "연락처",
      width: 120,
    },
    email: {
      name: "이메일",
      width: 180,
    },
    address: {
      name: "주소",
      width: 250,
    },
    showRoom: {
      name: "쇼룸",
      width: 80,
    },
    webPage: {
      name: "웹페이지",
      width: 250,
    },
    sns: {
      name: "SNS",
      width: 180,
    },
    career: {
      name: "경력",
      width: 120,
    },
    account: {
      name: "계좌번호",
      width: 250,
    },
    classification: {
      name: "사업자 분류",
      width: 180,
    },
    businessNumber: {
      name: "사업자 등록번호",
      width: 250,
    },
    files: {
      name: "파일 유무",
      width: 250,
    },
    percentage: {
      name: "수수료",
      width: 80,
    },
    partner: {
      name: "시공사",
      width: 120,
    },
    method: {
      name: "시공 방식",
      width: 120,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.designerCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "designer",
      "desid",
    ],
    info: [
      "date",
      "phone",
      "email",
      "account",
      "percentage",
    ],
    exceptionHeight: [
      false,
      false,
      false,
      false,
      false,
    ],
  };

  return targetColumns;
}

DataPatch.prototype.designerWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "designer",
      "desid",
    ],
    info: [
      { name: "계약 상태", target: "status" },
      { name: "계약일", target: "date" },
      { name: "연락처", target: "phone" },
      { name: "이메일", target: "email" },
      { name: "주소", target: "address" },
      { name: "쇼룸", target: "showRoom" },
      { name: "웹페이지", target: "webPage" },
      { name: "SNS", target: "sns" },
      { name: "경력", target: "career" },
      { name: "계좌번호", target: "account" },
      { name: "사업자 분류", target: "classification" },
      { name: "사업자 등록번호", target: "businessNumber" },
      { name: "파일 유무", target: "files" },
      { name: "수수료", target: "percentage" },
      { name: "시공사", target: "partner" },
      { name: "시공 방식", target: "method" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.designerMap = function () {
  const snsToObject = function (value, pastValue) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 2) {
          boo = true;
        }
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.kind = temp2[0];
      obj.href = temp2[1];
      arr.push(obj);
    }

    return arr;
  }

  const careerToObject = function (value, pastValue) {
    let obj = {};
    let boo = false;
    let temp;

    if (value.split(' ').length === 2) {
      boo = false;
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    if (Number.isNaN(obj.startY) || Number.isNaN(obj.startM)) {
      boo = true;
    }

    obj = {};

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    return obj;
  }

  const accountToObject = function (value, pastValue) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 3) {
          boo = true;
        }
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.bankName = temp2[0];
      obj.accountNumber = temp2[1];
      obj.to = temp2[2];
      arr.push(obj);
    }

    return arr;
  }

  const filesToObject = function (value, pastValue) {
    let obj;
    let temp;
    let boo = false;
    let target = [
      "businessRegistration",
      "bankBook",
      "registrationCard",
    ];

    temp = value.split(" / ");
    if (temp.length !== 3) {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    obj = {};
    for (let i = 0; i < target.length; i++) {
      obj[target[i]] = /유/gi.test(temp[i]) ? true : false;
    }

    return obj;
  }

  const map = {
    designer: { position: "designer", type: "string", searchBoo: true, },
    desid: { position: "desid", type: "string", searchBoo: true, },
    status: { position: "information.contract.status", type: "string", searchBoo: true, },
    date: { position: "information.contract.date", type: "date", searchBoo: true, },
    phone: { position: "information.phone", type: "string", searchBoo: true, },
    email: { position: "information.email", type: "string", searchBoo: true, },
    address: { position: "information.address", type: "array", searchBoo: true, },
    showRoom: { position: "information.personalSystem.showRoom", type: "boolean", searchBoo: true, },
    webPage: { position: "information.personalSystem.webPage", type: "array", searchBoo: true, },
    sns: { position: "information.personalSystem.sns", type: "object", objectFunction: snsToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    career: { position: "information.business.career", type: "object", objectFunction: careerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    account: { position: "information.business.account", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    classification: { position: "information.business.businessInfo.classification", type: "string", searchBoo: true, },
    businessNumber: { position: "information.business.businessInfo.businessNumber", type: "string", searchBoo: true, },
    files: { position: "information.business.businessInfo.files", type: "object", objectFunction: filesToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    percentage: { position: "information.business.service.cost.percentage", type: "number", searchBoo: true, },
    partner: { position: "information.business.service.contruct.partner", type: "string", searchBoo: true, },
    method: { position: "information.business.service.contruct.method", type: "string", searchBoo: true, },
  };
  return map;
}

//PROJECT ---------------------------------------------------------------------------------------

DataPatch.prototype.projectStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    proid: {
      name: "아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };

  model.info = {
    designer: {
      name: "디자이너",
      width: 50,
      left: 30,
    },
    service: {
      name: "서비스",
      width: 50,
      left: 30,
    },
    status: {
      name: "진행 상태",
      width: 50,
      left: 30,
    },
    firstGuide: {
      name: "계약금 안내",
      width: 100,
    },
    firstDate: {
      name: "계약금 입금",
      width: 120,
    },
    firstAmount: {
      name: "계약금",
      width: 180,
    },
    firstInfo: {
      name: "계약금 정보",
      width: 250,
    },
    remainGuide: {
      name: "잔금 안내",
      width: 80,
    },
    remainDate: {
      name: "잔금 입금",
      width: 250,
    },
    remainSupply: {
      name: "공급가",
      width: 180,
    },
    remainVat: {
      name: "VAT",
      width: 120,
    },
    remainConsumer: {
      name: "소비자가",
      width: 250,
    },
    remainInfo: {
      name: "잔금 정보",
      width: 50,
      left: 30,
    },
    formGuide: {
      name: "계약 안내",
      width: 100,
    },
    formDateFrom: {
      name: "프로젝트 시작일",
      width: 120,
    },
    formDateTo: {
      name: "프로젝트 종료일",
      width: 180,
    },
    meetingDate: {
      name: "1차 미팅",
      width: 250,
    },
    method: {
      name: "정산 방식",
      width: 80,
    },
    percentage: {
      name: "수수료",
      width: 250,
    },
    calculationInfo: {
      name: "정산 정보",
      width: 180,
    },
    paymentsTotalAmount: {
      name: "정산 총금액",
      width: 120,
    },
    paymentsFirstAmount: {
      name: "디자이너 선금",
      width: 250,
    },
    paymentsFirstDate: {
      name: "선금 지급일",
      width: 180,
    },
    paymentsRemainAmount: {
      name: "디자이너 잔금",
      width: 250,
    },
    paymentsRemainDate: {
      name: "잔금 지급일",
      width: 250,
    },
    contentsPhotoDate: {
      name: "촬영일",
      width: 80,
    },
    photographer: {
      name: "촬영 작가",
      width: 120,
    },
    interviewer: {
      name: "인터뷰어",
      width: 120,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.projectCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "proid",
    ],
    info: [
      "designer",
      "remainDate",
      "remainConsumer",
      "formDateFrom",
      "formDateTo",
    ],
    exceptionHeight: [
      false,
      false,
      false,
      false,
      false,
    ],
  };

  return targetColumns;
}

DataPatch.prototype.projectWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "proid",
    ],
    info: [
      { name: "디자이너", target: "designer" },
      { name: "서비스", target: "service" },
      { name: "진행 상태", target: "status" },
      { name: "계약금 안내", target: "firstGuide" },
      { name: "계약금 입금", target: "firstDate" },
      { name: "계약금", target: "firstAmount" },
      { name: "계약금 정보", target: "firstInfo" },
      { name: "잔금 안내", target: "remainGuide" },
      { name: "잔금 입금", target: "remainDate" },
      { name: "공급가", target: "remainSupply" },
      { name: "VAT", target: "remainVat" },
      { name: "소비자가", target: "remainConsumer" },
      { name: "잔금 정보", target: "remainInfo" },
      { name: "계약 안내", target: "formGuide" },
      { name: "프로젝트 시작일", target: "formDateFrom" },
      { name: "프로젝트 종료일", target: "formDateTo" },
      { name: "1차 미팅", target: "meetingDate" },
      { name: "정산 방식", target: "method" },
      { name: "수수료", target: "percentage" },
      { name: "정산 정보", target: "calculationInfo" },
      { name: "정산 총금액", target: "paymentsTotalAmount" },
      { name: "디자이너 선금", target: "paymentsFirstAmount" },
      { name: "선금 지급일", target: "paymentsFirstDate" },
      { name: "디자이너 잔금", target: "paymentsRemainAmount" },
      { name: "잔금 지급일", target: "paymentsRemainDate" },
      { name: "촬영일", target: "contentsPhotoDate" },
      { name: "촬영 작가", target: "photographer" },
      { name: "인터뷰어", target: "interviewer" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.projectMap = function () {
  const accountToObject = function (value, pastValue) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    obj = {};
    obj.account = temp[0].replace(/^계좌번호 /, '');
    obj.to = temp[1].replace(/^수신자 /, '');
    obj.proof = temp[2].replace(/^증빙 /, '');

    return obj;
  }

  const methodToObject = function (value, pastValue) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    obj = {};
    obj.method = temp[0].replace(/^결제방법 /, '');
    obj.to = temp[1].replace(/^수신자 /, '');
    obj.proof = temp[2].replace(/^증빙 /, '');

    return obj;
  }

  const map = {
    proid: { position: "proid", type: "string", searchBoo: true, },
    cliid: { position: "cliid", type: "string", searchBoo: true, },
    desid: { position: "desid", type: "string", searchBoo: true, },
    status: { position: "process.status", type: "string", searchBoo: true, },
    firstGuide: { position: "process.contract.first.guide", type: "date", searchBoo: true, },
    firstDate: { position: "process.contract.first.date", type: "date", searchBoo: true, },
    firstAmount: { position: "process.contract.first.calculation.amount", type: "number", searchBoo: true, },
    firstInfo: { position: "process.contract.first.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    remainGuide: { position: "process.contract.remain.guide", type: "date", searchBoo: true, },
    remainDate: { position: "process.contract.remain.date", type: "date", searchBoo: true, },
    remainSupply: { position: "process.contract.remain.calculation.amount.supply", type: "number", searchBoo: true, },
    remainVat: { position: "process.contract.remain.calculation.amount.vat", type: "number", searchBoo: true, },
    remainConsumer: { position: "process.contract.remain.calculation.amount.consumer", type: "number", searchBoo: true, },
    remainInfo: { position: "process.contract.remain.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    formGuide: { position: "process.contract.form.guide", type: "date", searchBoo: true, },
    formDateFrom: { position: "process.contract.form.date.from", type: "date", searchBoo: true, },
    formDateTo: { position: "process.contract.form.date.to", type: "date", searchBoo: true, },
    meetingDate: { position: "process.contract.meeting.date", type: "date", searchBoo: true, },
    method: { position: "process.calculation.method", type: "string", searchBoo: true, },
    percentage: { position: "process.calculation.percentage", type: "number", searchBoo: true, },
    calculationInfo: { position: "process.calculation.info", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue\) \{/gi, ''), searchBoo: true, },
    paymentsTotalAmount: { position: "process.calculation.payments.totalAmount", type: "number", searchBoo: true, },
    paymentsFirstAmount: { position: "process.calculation.payments.first.amount", type: "number", searchBoo: true, },
    paymentsFirstDate: { position: "process.calculation.payments.first.date", type: "date", searchBoo: true, },
    paymentsRemainAmount: { position: "process.calculation.payments.remain.amount", type: "number", searchBoo: true, },
    paymentsRemainDate: { position: "process.calculation.payments.remain.date", type: "date", searchBoo: true, },
    contentsPhotoDate: { position: "contents.photo.date", type: "date", searchBoo: true, },
    photographer: { position: "contents.photo.info.photographer", type: "string", searchBoo: true, },
    interviewer: { position: "contents.photo.info.interviewer", type: "string", searchBoo: true, },
  };
  return map;
}

//CONTENTS --------------------------------------------------------------------------------------

DataPatch.prototype.contentsStandard = function () {

}

DataPatch.prototype.contentsCardViewStandard = function () {

}

DataPatch.prototype.contentsWhiteViewStandard = function () {

}

DataPatch.prototype.contentsMap = function () {

}

module.exports = DataPatch;
