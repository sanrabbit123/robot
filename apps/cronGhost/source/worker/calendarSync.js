const dayId = [
  "d070",
  "d131",
  "d191"
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { requestSystem, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/calendarSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("calendar sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
