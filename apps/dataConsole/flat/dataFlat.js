const DataFlat = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataFlat.prototype.clientStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    cliid: {
      name: "고객 아이디",
      left: 30,
    },
    name: {
      name: "성함",
      left: 123,
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
  }

  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataFlat.prototype.clientFlat = function (client) {
  let tong = [];
  let temp;
  const { name, phone, email, cliid } = client.toNormal();
  for (let { request: { timeline, budget, family, space: { address, contract, pyeong, spec: { room, bathroom, valcony }, resident: { living, expected } }, etc: { comment, channel } }, analytics: { response: { status, outreason }, date: { callHistory, space: { precheck, empty, movein } }, picture } } of client.toNormal().requests) {
    temp = {};
    temp.standard = {
      cliid,
      name
    };
    temp.info = {
      status,
      outreason: outreason.join("__split__"),
      callHistory: callHistory.join("__split__"),
      timeline,
      phone,
      email,
      budget,
      address,
      contract,
      pyeong,
      living,
      expected,
      precheck,
      empty,
      movein,
      room,
      bathroom,
      valcony,
      family,
      comment,
      channel,
    }
    tong.push(temp);
  }
  return tong;
}

DataFlat.prototype.getClients = async function (limit = 100) {
  const instance = this;
  try {
    const clients = await this.back.getLatestClients(limit);
    let tong, tempArr;
    tong = [];
    for (let i of clients) {
      tempArr = this.clientFlat(i);
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return {
      standard: this.clientStandard(),
      data: tong
    };
  } catch (e) {
    console.log(e);
  }
}

module.exports = DataFlat;
