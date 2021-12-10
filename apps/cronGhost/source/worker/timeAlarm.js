const dayId = [
  "d132",
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
    await messageLog("time alarm done 0");

    const now = new Date();
    let target, wording, wordings, second;
    now.setMinutes(now.getMinutes() + 20);
    target = now.getHours();
    wordings = [
      "잘 자고 있죠? 지금은 새벽입니다.",
      "잘 자고 있죠? 지금은 새벽입니다.",
      "잘 자고 있죠? 지금은 새벽입니다.",
      "잘 자고 있죠? 지금은 새벽입니다.",
      "잘 자고 있죠? 지금은 새벽입니다.",
      "잘 자고 있죠? 지금은 새벽입니다.",
      "좋은 아침입니다!",
      "좋은 아침입니다!",
      "좋은 아침입니다!",
      "좋은 아침입니다!",
      "좋은 아침입니다!",
      "오전 근무가 거의 끝나가고 있습니다.",
      "점심을 안 드셨다면 빨리 점심 드세요.",
      "아직도 점심을 안 드신 건 아니죠?",
      "졸리면 커피를 마시기 바랍니다.",
      "물 한 잔 마시고, 숨 좀 돌리세요.",
      "스트레칭을 추천합니다.",
      "오늘도 화나셨다면, 심호흡을 하세요.",
      "퇴근 시간이 가까워졌답니다. 업무를 마무리하세요.",
      "아직 퇴근 안 하셨나요? 빨리 가세요.",
      "아직 퇴근 안 하셨나요? 빨리 가세요.",
      "안녕히 주무세요.",
      "안녕히 주무세요.",
      "안녕히 주무세요.",
    ];

    second = wordings[target];
    await messageLog("time alarm done 1");

    if (target >= 12) {
      wording = "오후 ";
      if (target > 12) {
        target = target - 12;
      }
    } else {
      wording = "오전 ";
    }
    await messageLog("time alarm done 2");

    await ghostRequest("voice", { text: "지금은 " + wording + String(target) + "시 입니다. " + second });
    await messageLog("time alarm done 3");

    await messageLog("time alarm done");

    return true;
  } catch (e) {
    await errorLog("time alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
