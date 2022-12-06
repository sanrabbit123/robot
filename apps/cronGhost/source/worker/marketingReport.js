const dayId = [
  "d091",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { messageLog, errorLog, requestSystem } = mother;
  try {
    await requestSystem("https://" + address.testinfo.host + "/basicReport", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
    await errorLog("marketing reporting done");
    return true;
  } catch (e) {
    await errorLog("marketing reporting error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
