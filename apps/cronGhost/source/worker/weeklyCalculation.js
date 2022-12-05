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
  } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    const today = new Date();
    if (today.getDay() === 1 || today.getDay() === 5) {
      await requestSystem("https://" + address.pythoninfo.host + ":" + String(3000) + "/weeklyCalculation", { data: null }, { headers: { "Content-Type": "application/json" } });
      await messageLog("weekly calculation done");
    }
    return true;
  } catch (e) {
    await errorLog("weekly calculation error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
