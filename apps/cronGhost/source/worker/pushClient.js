const dayId = [
  "d123"
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
  const { messageLog, errorLog, messageSend, sleep } = mother;
  try {

    const clients = await back.getClientsByQuery({}, { selfMongo: mongo, withTools: true });
    let today, ago;
    let requests;

    today = new Date();
    today.setHours(today.getHours() - 1);

    ago = new Date();
    ago.setDate(ago.getDate() - 2);

    requests = clients.getRequestsTong().filter((request) => {
      return request.analytics.response.status.value === "응대중" && request.analytics.response.action.value === "1차 응대 예정";
    }).filter((request) => {
      return request.request.timeline.valueOf() < today.valueOf() && request.request.timeline.valueOf() >= ago.valueOf();
    })

    for (let request of requests) {
      await kakao.sendTalk("pushClient", request.name, request.phone, {
        client: request.name,
        host: address.frontinfo.host,
        path: "curation",
        cliid: request.cliid,
      });
      await messageSend({ text: request.name + " 고객님께 신청 완료하라고 독촉했어요.", channel: "#404_curation", voice: true });
      await sleep(1000);
    }

    await messageLog("push client done");
    return true;
  } catch (e) {
    await errorLog("push client error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
