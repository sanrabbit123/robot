const dayId = [
  "d011",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.contentsinfo.host + ":" + String(3000) + "/storeContentsView", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("store contents view error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
