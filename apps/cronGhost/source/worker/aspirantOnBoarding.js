const dayId = [
  "d132",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantOnBoarding", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("aspirant onboarding error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
