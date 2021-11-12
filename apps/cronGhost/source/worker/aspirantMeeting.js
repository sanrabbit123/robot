const dayId = [
  "d145",
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
    const allAspirants = await back.getAspirantsByQuery({});
    const targetArr = allAspirants.meetingAlarm();
    for (let { name, phone, dateString, alarm } of targetArr) {
      if (alarm) {
        await kakao.sendTalk("designerPresentationAlarm", name, phone, {
          designer: name,
          date: dateString,
        });
      }
    }
    await messageLog("send aspirant alarm done");
    return true;
  } catch (e) {
    await errorLog("send aspirant alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
