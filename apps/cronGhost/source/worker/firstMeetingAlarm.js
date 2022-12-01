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
  } = package;
  const { messageLog, messageSend, errorLog, equalJson } = mother;
  try {
    const selfMongo = mongo;
    const today = new Date();
    const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
    let projects;
    let clients, client;
    let clientIndex;
    let meetingDate;
    let delta;
    let todayValue;
    let rawDelta;
    let designer;

    today.setHours(9);
    todayValue = today.valueOf();

    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.status": { $regex: "^[대진완홀]" } },
        { "process.contract.meeting.date": { $gt: new Date() } },
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

          rawDelta = (((Math.abs(meetingDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
          delta = Math.floor(rawDelta);

          if (delta === 3 || delta === 7) {

            designer = await back.getDesignerById(project.desid, { selfMongo });

            await kakao.sendTalk("firstMeetingWeekAgo", client.name, client.phone, {
              client: client.name,
              date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
              day: dayConst[meetingDate.getDay()],
              hour: String(meetingDate.getHours()),
              minute: String(meetingDate.getMinutes()),
              host: address.frontinfo.host,
              path: "meeting",
              proid: project.proid,
            });

            await kakao.sendTalk("designerConsoleRequestFirstMeeting", designer.designer, designer.information.phone, {
              designer: designer.designer,
              client: client.name,
              date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
              day: dayConst[meetingDate.getDay()],
              hour: String(meetingDate.getHours()),
              minute: String(meetingDate.getMinutes()),
              host: address.frontinfo.host,
              path: "process",
              proid: project.proid,
            });

            await messageSend(client.name + " 고객님과 " + designer.designer + " 실장님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
          }

        }
      }
    }

    await errorLog("first meeting alarm done");
    return true;
  } catch (e) {
    await errorLog("first meeting alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
