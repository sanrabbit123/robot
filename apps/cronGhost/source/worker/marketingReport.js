const dayId = [
  "d092",
  "d131",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { messageLog, errorLog, requestSystem, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + "/analyticsToday", { report: 1 }, { headers: { "Content-Type": "application/json" } });
    await errorLog("marketing reporting done");
    return true;
  } catch (e) {
    await emergencyAlarm("marketing reporting error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
