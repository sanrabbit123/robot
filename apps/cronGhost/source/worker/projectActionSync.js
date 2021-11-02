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
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal,
    rethink,
  } = package;
  const { messageLog, errorLog } = mother;
  try {
    await work.projectActionSync({ selfMongo: mongo, selfConsoleMongo: mongoconsole, updateMongo: mongo });
    await messageLog("project action sync done");
    return true;
  } catch (e) {
    await errorLog("project action sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
