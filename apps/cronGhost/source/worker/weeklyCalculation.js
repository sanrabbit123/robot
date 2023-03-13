const dayId = [
  "d001",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    const today = new Date();
    if (today.getDay() === 6) {
      await requestSystem("https://" + address.pythoninfo.host + ":" + String(3000) + "/weeklyCalculation", { data: null }, { headers: { "Content-Type": "application/json" } });
      await errorLog("weekly calculation done");
    }
    return true;
  } catch (e) {
    await errorLog("weekly calculation error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
