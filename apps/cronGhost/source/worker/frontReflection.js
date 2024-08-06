const dayId = [
  "d061",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
    await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/syncContentsTag", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("front reflection error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
