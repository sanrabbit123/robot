const dayId = [
  "d092",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/cxDashboardSync", { noNewClient: 0 }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("cx dashboard update error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
