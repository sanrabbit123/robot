const dayId = [
  "d070",
  "d131",
  "d191"
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
  const { messageLog, errorLog } = mother;
  try {

    const selfMongo = mongo;
    const today = new Date();
    const standardDay = new Date();
    const pastConst = 3;
    standardDay.setDate(standardDay.getDate() - pastConst);
    let projects, from;
    let clients, designers;
    let client, designer;
    let title, list;

    from = "photographing";
    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "contents.photo.date": { $gt: standardDay } },
        { "contents.photo.date": { $lt: new Date(3000, 0, 1) } },
      ]
    }, { selfMongo });

    if (projects.length > 0) {
      clients = await back.getClientsByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
      }, { selfMongo });
      designers = await back.getDesignersByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
      }, { selfMongo });

      for (let project of projects) {
        if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
          client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
          designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
          title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
          list = await calendar.listEvents(from, project.proid);
          if (list.length > 0) {
            await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
            console.log(`${project.proid} photo schedule update : ${title}`);
          } else {
            await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
            console.log(`${project.proid} photo schedule create : ${title}`);
          }
        }
      }
    }

    from = "designerMeeting";
    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.meeting.date": { $gt: standardDay } },
        { "process.contract.meeting.date": { $lt: new Date(3000, 0, 1) } },
      ]
    }, { selfMongo });

    if (projects.length > 0) {

      clients = await back.getClientsByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
      }, { selfMongo });
      designers = await back.getDesignersByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
      }, { selfMongo });

      for (let project of projects) {
        client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
        designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
        title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
        list = await calendar.listEvents(from, project.proid);
        if (list.length > 0) {
          await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
          console.log(`${project.proid} meeting schedule update : ${title}`);
        } else {
          await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
          console.log(`${project.proid} meeting schedule create : ${title}`);
        }
      }

    }

    errorLog("calendar sync success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

    return true;
  } catch (e) {
    await errorLog("calendar sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
