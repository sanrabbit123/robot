const dayId = [
  "d043",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
