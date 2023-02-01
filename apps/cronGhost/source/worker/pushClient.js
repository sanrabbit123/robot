const dayId = [
  "d123"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { messageLog, errorLog, messageSend, sleep, requestSystem } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/pushClient", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("push client error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
