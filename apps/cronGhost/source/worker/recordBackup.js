const dayId = [
  "d222",
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
    const MirrorWhisk = require(`${process.cwd()}/apps/mirrorWhisk/mirrorWhisk.js`);
    const mirror = new MirrorWhisk();
    const log = await mirror.recordBackup();
    const logCollection = "recordBackupLog";
    await rethink.rethinkCreate(logCollection, log);
    await messageLog("record backup and delete done");
    return true;
  } catch (e) {
    await errorLog("record backup and delete error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
