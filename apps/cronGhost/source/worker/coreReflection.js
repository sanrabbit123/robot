const dayId = [
  "d051",
  "d131",
  "d161",
  "d181",
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
  } = package;
  const { messageLog, errorLog } = mother;
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.coreReflection();
    await reflection.mysqlReflection();
    await messageLog("core mongo reflection done");
    return true;
  } catch (e) {
    await errorLog("core mongo reflection error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
