const dayId = [
  "d090",
  "d100",
  "d110",
  "d120",
  "d130",
  "d140",
  "d150",
  "d160",
  "d170",
  "d180",
  "d190",
  "d200",
];

const hourId = [];

const worker = async function (package) {
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal,
    rethink,
  } = package;
  const { ghostRequest, errorLog, messageLog } = mother;
  try {
    const now = new Date();
    let target, wording, wordings, second;
    now.setMinutes(now.getMinutes() + 20);
    target = now.getHours();
    wordings = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "", // 9
      "", // 10
      "", // 11
      "점심 시간이 시작되었습니다.", // 12
      "오후 업무 시간이 시작되었습니다.", // 13
      "", // 14
      "", // 15
      "", // 16
      "", // 17
      "", // 18
      "퇴근 시간이 지났습니다. 업무를 마무리해주세요!", // 19
      "", // 20
      "",
      "",
      "",
    ];

    second = wordings[target];

    if (target >= 12) {
      wording = "오후 ";
      if (target > 12) {
        target = target - 12;
      }
    } else {
      wording = "오전 ";
    }

    await ghostRequest("voice", { text: "지금은 " + wording + String(target) + "시 입니다. " + second });

    await messageLog("time alarm done");

    return true;
  } catch (e) {
    await errorLog("time alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
