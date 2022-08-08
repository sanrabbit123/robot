const dayId = [
  "d031",
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

    await analytics.analyticsToMongo();
    await errorLog("google analytics done");

    return true;
  } catch (e) {
    await errorLog("google analytics error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
