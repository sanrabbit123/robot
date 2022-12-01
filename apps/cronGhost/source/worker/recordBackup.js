const dayId = [
  "d222",
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
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.port) + "/recordBackup");
    await messageLog("record backup and delete done");
    return true;
  } catch (e) {
    await errorLog("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
