const dayId = [
  "d001",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog, emergencyAlarm } = mother;
  try {
    const today = new Date();
    if (today.getDay() === 6) {
      await requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/weeklyCalculation", { data: null }, { headers: { "Content-Type": "application/json" } });
      await errorLog("weekly calculation done");
    }
    return true;
  } catch (e) {
    await emergencyAlarm("weekly calculation error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
