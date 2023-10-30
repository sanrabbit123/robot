const dayId = [
  "d084"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/dailySales", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("calendar sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
