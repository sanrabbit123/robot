const dayId = [
  "d064",
  "d104",
  "d124",
  "d144",
  "d164",
  "d184",
  "d214",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/workProjectActionSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("project action sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
