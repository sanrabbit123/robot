const dayId = [
  "d142",
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

    const selfMongo = mongolocal;
    const today = new Date();
    let standardDay;
    let futureConst;
    let projects;
    let clients;
    let client;

    standardDay = new Date();
    futureConst = 5;
    standardDay.setDate(standardDay.getDate() + futureConst);

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

      for (let project of projects) {

        client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });


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



    await messageLog("first meeting alarm done");
    return true;
  } catch (e) {
    await errorLog("first meeting alarm error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
