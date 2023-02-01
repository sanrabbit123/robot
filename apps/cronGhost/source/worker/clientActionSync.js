const dayId = [
  "d065",
  "d105",
  "d125",
  "d145",
  "d165",
  "d185",
  "d215",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/workClientActionSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("client action sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
