const dayId = [
  "d063",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.mysqlinfo.host + "/coreReflect", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("mysql reflection error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
