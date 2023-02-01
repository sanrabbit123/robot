const dayId = [
  "d053",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/mongoToJson", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
