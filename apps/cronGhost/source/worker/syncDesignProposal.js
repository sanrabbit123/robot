const dayId = [
  "d061",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/syncDesignProposal", { data: null }, { headers: { "Content-Type": "application/json" } });
    await errorLog("sync design proposal request done");
    return true;
  } catch (e) {
    await emergencyAlarm("sync design proposal request error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
