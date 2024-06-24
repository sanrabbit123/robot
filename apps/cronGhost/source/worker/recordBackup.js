const dayId = [
  "d222",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3001) + "/recordBackup", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
