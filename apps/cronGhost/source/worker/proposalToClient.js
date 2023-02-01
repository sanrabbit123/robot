const dayId = [
  "d061",
  "d121",
  "d151",
  "d191",
  "d211",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, messageLog, errorLog } = mother;
  try {
    await requestSystem("https://" + address.backinfo.host + ":3000/workProposalToClient", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await errorLog("proposal to client sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
