const dayId = [
  "d071",
  "d132",
  "d192"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { requestSystem, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/cxDashboardSync", { noNewClient: 1 }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("cx dashboard sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
