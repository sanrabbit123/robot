const dayId = [
  "d065",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.contentsinfo.host + ":" + String(3000) + "/storeHoliday", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("store holiday error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
