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
  const { requestSystem, errorLog, messageLog } = mother;
  try {
    const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
    const app = new AddressParser();
    let res;

    res = await app.chainDistance([
      [ "부산역", "카카오" ],
      [ "대전역", "카카오" ],
      [ "제천역", "카카오" ],
    ]);

    if (!Array.isArray(res)) {
      throw new Error("please do update");
    }
    if (res.length !== 3) {
      throw new Error("please do update");
    }
    if (!res.every((obj) => { return typeof obj.meters === "number" && typeof obj.seconds === "number" })) {
      throw new Error("please do update");
    }

    await messageLog("kakao map check done");
    return true;
  } catch (e) {
    await errorLog("kakao map check error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
