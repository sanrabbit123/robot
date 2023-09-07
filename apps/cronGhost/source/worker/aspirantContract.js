const dayId = [
  "d131",
];

const hourId = [];

const worker = async function (package) {
  const { mother, address, back, mongo, mongolocal } = package;
  const { requestSystem, errorLog, emergencyAlarm } = mother;
  try {
    await requestSystem("https://" + address.secondinfo.host + ":3000/noticeAspirantContractYesterday", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    await emergencyAlarm("aspirant contract error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
