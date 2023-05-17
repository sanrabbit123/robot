const dayId = [
  "d074",
  "d104",
  "d124",
  "d154",
  "d174",
  "d204",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("client analytics error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
