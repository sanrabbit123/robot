const dayId = [
  "d034",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/mysqlReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
    await errorLog("mysql reflection request done");
    return true;
  } catch (e) {
    await emergencyAlarm("mysql reflection request error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
