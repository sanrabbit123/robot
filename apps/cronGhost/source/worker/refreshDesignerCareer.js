const dayId = [
  "d043",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/refreshDesignerCareer", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("mongo to json error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
