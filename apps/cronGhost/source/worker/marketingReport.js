const dayId = [
  "d091",
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
  const { messageLog, errorLog, requestSystem } = mother;
  try {
    await requestSystem("https://" + address.testinfo.host + "/basicReport", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
    await messageLog("marketing reporting done");
    return true;
  } catch (e) {
    await errorLog("marketing reporting error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
