const dayId = [
  "d061",
  "d121",
  "d151",
  "d191",
  "d211",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { messageLog, errorLog } = mother;
  try {
    await work.setProposalToClient("cron", { selfMongo: mongo });
    await errorLog("proposal to client sync done");
    return true;
  } catch (e) {
    await errorLog("proposal to client sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
