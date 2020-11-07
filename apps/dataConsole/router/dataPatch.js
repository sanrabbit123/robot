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
      name: "고객 아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };

  targetArr = [
    "status",
    "outreason",
    "callHistory",
    "timeline",
    "phone",
    "email",
    "budget",
    "address",
    "contract",
    "pyeong",
    "living",
    "expected",
    "precheck",
    "empty",
    "movein",
    "room",
    "bathroom",
    "valcony",
    "family",
    "comment",
    "channel",
  ];

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

module.exports = DataPatch;
