const dayId = [
  "d091",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { messageLog, errorLog, requestSystem, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/updateDesignerProposalRealtime", { report: 1 }, { headers: { "Content-Type": "application/json" } });
    await errorLog("designer reporting done");
    return true;
  } catch (e) {
    await emergencyAlarm("designer reporting error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
