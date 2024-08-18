const dayId = [
  "d151",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.host + ":3002/timeDeltaAlarm", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("first meeting alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
