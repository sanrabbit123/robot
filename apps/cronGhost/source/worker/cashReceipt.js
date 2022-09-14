const dayId = [
  "d091",
  "d171",
  "d190",
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
  const { messageLog, errorLog, hexaJson, requestSystem, equalJson } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.second.port) + "/cash");
    await messageLog("cash receipt sync done");
    return true;
  } catch (e) {
    await errorLog("cash receipt sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
