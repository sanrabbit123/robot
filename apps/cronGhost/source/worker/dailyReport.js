const dayId = [
  "d231",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.secondinfo.host + ":" + String(3003) + "/storeDailyReport", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("daily report error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
