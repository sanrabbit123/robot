const dayId = [
  "d222",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/recordBackup", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
