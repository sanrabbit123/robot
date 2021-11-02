const dayId = [
  "d151",
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
  const { messageLog, messageSend, errorLog, equalJson } = mother;
  try {
    const selfMongo = mongo;
    const today = new Date();
    const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
    const logCollection = "firstMeetingLog";
    const dayTargets = [
      [ 5, 7, "firstMeetingWeekAgo" ],
      [ 1, 2, "firstMeetingDayAgo" ],
    ]
    let standardDay0, standardDay1;
    let projects;
    let clients;
    let clientIndex;
    let client;
    let meetingDate;
    let log;
    let boo;

    for (let [ futureConst0, futureConst1, talkKey ] of dayTargets) {

      standardDay0 = new Date();
      standardDay0.setHours(1);
      standardDay0.setDate(standardDay0.getDate() + futureConst0);

      standardDay1 = new Date();
      standardDay1.setHours(22);
      standardDay1.setDate(standardDay1.getDate() + futureConst1);

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.contract.meeting.date": { $gte: standardDay0 } },
          { "process.contract.meeting.date": { $lte: standardDay1 } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {

            meetingDate = project.process.contract.meeting.date;
            client = clients.toNormal()[clientIndex];
            log = await rethink.rethinkRead(logCollection, { proid: project.proid });
            boo = true;
            if (log.length === 0) {
              await rethink.rethinkCreate(logCollection, { date: new Date(), proid: project.proid, method: [ futureConst0 ] });
              boo = true;
            } else {
              if (log[0].method.includes(futureConst0)) {
                boo = false;
              } else {
                log[0].method.push(futureConst0);
                await rethink.rethinkUpdate(logCollection, [ { proid: project.proid }, { date: new Date(), method: equalJson(JSON.stringify(log[0].method)) } ]);
                boo = true;
              }
            }

            if (boo) {
              await kakao.sendTalk(talkKey, client.name, client.phone, {
                client: client.name,
                date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                day: dayConst[meetingDate.getDay()],
                hour: String(meetingDate.getHours()),
                minute: String(meetingDate.getMinutes()),
                host: address.homeinfo.ghost.host,
                path: "meeting",
                proid: project.proid,
              });
              await messageSend(client.name + " 고객님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
            }
          }
        }
      }

    }

    await messageLog("first meeting alarm done");
    return true;
  } catch (e) {
    await errorLog("first meeting alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
