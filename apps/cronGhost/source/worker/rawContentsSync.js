const dayId = [
  "d193"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog } = mother;
  try {
    await requestSystem("https://" + address.secondinfo.host + ":3000/rawContentsSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("raw contents sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
