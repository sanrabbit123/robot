const dayId = [
  "d065",
  "d105",
  "d125",
  "d145",
  "d165",
  "d185",
  "d215",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, work, mongo, mongoconsole, mongolocal } = package;
  const { messageLog, errorLog } = mother;
  try {
    // await work.clientActionSync({ selfMongo: mongo, selfConsoleMongo: mongoconsole, updateMongo: mongo });
    // await errorLog("client action sync done");
    return true;
  } catch (e) {
    await errorLog("client action sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
