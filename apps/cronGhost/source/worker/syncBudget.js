const dayId = [
  "d074"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.contentsinfo.host + ":3000/syncClientBudget", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("syncBudget error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
