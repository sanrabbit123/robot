const dayId = [
  "d125",
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
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.pythoninfo.host + ":" + String(3000) + "/weeklyCalculation");
    await messageLog("weekly calculation done");
    return true;
  } catch (e) {
    await errorLog("weekly calculation error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
