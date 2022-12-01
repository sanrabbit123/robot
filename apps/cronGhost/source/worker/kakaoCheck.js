const dayId = [
  "d102",
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
  } = package;
  const { requestSystem, errorLog, messageLog } = mother;
  try {
    await kakao.ObserveRemain();
    await messageLog("kakao check done");
    return true;
  } catch (e) {
    await errorLog("kakao check error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
