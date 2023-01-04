const dayId = [
  "d072",
  "d193"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { requestSystem, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/photoStatusSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("photo status sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
