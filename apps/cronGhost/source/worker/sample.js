const dayId = [
  "d100",
  "d152"
];

const hourId = [
  "h0",
  "h1"
]

const worker = async function (package) {
  const {
    mother, address,
    back, worker, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal,
    rethink,
  } = package;
  try {
    console.log("test");
    return true;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { dayId, hourId, worker };
