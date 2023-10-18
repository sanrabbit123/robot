const dayId = [
  "d045",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/hahaDropClients", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("fix ClientAnalytics : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
