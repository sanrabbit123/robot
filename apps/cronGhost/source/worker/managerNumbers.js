const dayId = [
  "d232",
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
  const { messageLog, errorLog, equalJson } = mother;
  try {
    const selfMongo = mongo;
    const selfConsoleMongo = mongoconsole;
    const sheetsId = "1nqjhgB8xYqoM_6R_wbO7qHJL8EcGMfpa6vc9-xYxNro";
    let clients, cliidArr, projects, projectsRaw, secondCliidArr, targetClients, targetClientHistories, totalClientHistories;
    let arr, result, total, matrix, num, table;
    let keys, values;
    let totalLength;
    let resultLength;
    let start, end;
    let dateArr;
    let tempClient, tempProject;
    let tempCliidArr;
    let startDate, endDate;
    let acc0, acc1, acc2, acc3, acc4, acc5;
    let curr0, curr1, curr2, curr3, curr4, curr5;
    let temp;

    clients = (await back.getClientsByQuery({}, { selfMongo, withTools: true })).getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; return obj; });
    clients.sort((a, b) => { return a.timeline.valueOf() - b.timeline.valueOf(); });
    cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
    totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo: mongoconsole });
    for (let obj of clients) {
      for (let history of totalClientHistories) {
        if (obj.cliid === history.cliid) {
          obj.manager = history.manager;
        }
      }
    }

    clients.sort((a, b) => { return a.timeline.valueOf() - b.timeline.valueOf(); });
    cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
    totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo: mongoconsole });

    start = new Date(JSON.stringify(clients[0].timeline).slice(1, -1));
    end = new Date(JSON.stringify(clients[clients.length - 1].timeline).slice(1, -1));
    dateArr = [];
    while (start.valueOf() <= end.valueOf()) {
      dateArr.push([ start.getFullYear(), start.getMonth() + 1, start.getDate() ]);
      start.setDate(start.getDate() + 1);
    }
    dateArr = dateArr.map((arr) => {
      return arr.slice(0, 2).map((num) => { return String(num) }).join("_")
    });
    dateArr = [ ...new Set(dateArr) ].map((str) => { return str.split('_').map((str) => { return Number(str) }) });
    dateArr.reverse();

    projectsRaw = (await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo })).toNormal();
    for (let obj of projectsRaw) {
      for (let history of totalClientHistories) {
        if (obj.cliid === history.cliid) {
          obj.manager = history.manager;
        }
      }
    }
    projects = projectsRaw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    secondCliidArr = projects.map((obj) => { return obj.cliid });
    targetClients = clients.filter((obj) => { return secondCliidArr.includes(obj.cliid); });

    arr = targetClients.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
    result = {};
    for (let { cliid, manager } of arr) {
      if (result[manager] === undefined) {
        result[manager] = [];
      }
      result[manager].push(cliid);
    }

    arr = clients.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
    total = {};
    for (let { cliid, manager } of arr) {
      if (total[manager] === undefined) {
        total[manager] = [];
      }
      total[manager].push(cliid);
    }

    matrix = [ [ "담당자명", "전체 문의수", "전체 진행수", "전체 계약수", "개인계약 문의율(%)", "팀내 응대 비율(%)", "팀내 계약 비율(%)" ] ];
    keys = Object.keys(total);
    totalLength = Object.values(total).map((arr) => { return arr.length; }).reduce((accumulate, current) => { return accumulate + current });
    resultLength = Object.values(result).map((arr) => { return arr.length; }).reduce((accumulate, current) => { return accumulate + current });
    keys.sort();
    acc0 = 0;
    acc1 = 0;
    acc2 = 0;
    acc3 = 0;
    acc4 = 0;
    acc5 = 0;
    for (let name of keys) {
      curr0 = total[name].length;
      curr1 = result[name].length;
      curr2 = result[name].length;
      curr3 = total[name].length === 0 ? 0 : (Math.floor((result[name].length / total[name].length) * 100000) / 1000);
      curr4 = totalLength === 0 ? 0 : (Math.floor((total[name].length / totalLength) * 100000) / 1000);
      curr5 = resultLength === 0 ? 0 : (Math.floor((result[name].length / resultLength) * 100000) / 1000);

      acc0 += curr0;
      acc1 += curr1;
      acc2 += curr2;
      acc3 += curr3;
      acc4 += curr4;
      acc5 += curr5;

      arr = [];
      arr.push(name);
      arr.push(curr0);
      arr.push(curr1);
      arr.push(curr2);
      arr.push(curr3);
      arr.push(curr4);
      arr.push(curr5);
      matrix.push(arr);
    }

    matrix.push([ "total", acc0, acc1, acc2, (Math.floor((acc1 / acc0) * 100000) / 1000), Math.round(acc4), Math.round(acc5) ]);
    matrix.push([ "", "", "", "", "", "", "" ]);

    for (let [ year, month ] of dateArr) {

      startDate = new Date(year, month - 1, 1);
      if (month < 12) {
        endDate = new Date(year, month, 1);
      } else {
        endDate = new Date(year + 1, 0, 1);
      }

      matrix.push([ "담당자명", String(year).slice(2) + '.' + String(month) + " 문의", String(year).slice(2) + '.' + String(month) + " 진행", String(year).slice(2) + '.' + String(month) + " 계약", "진행율(%)", "팀내 응대 비율(%)", "팀내 계약 비율(%)" ]);

      tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() });
      tempProject = equalJson(JSON.stringify(projectsRaw));
      tempCliidArr = tempClient.map((obj) => { return obj.cliid });
      acc0 = tempClient.length;
      acc1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;

      for (let name of keys) {
        tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() }).filter((obj) => { return obj.manager === name });
        tempProject = equalJson(JSON.stringify(projectsRaw));
        tempCliidArr = tempClient.map((obj) => { return obj.cliid });
        curr0 = tempClient.length;
        curr1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;
        curr2 = tempProject.filter((obj) => { return obj.process.contract.first.date.valueOf() >= startDate.valueOf() && obj.process.contract.first.date.valueOf() < endDate.valueOf() }).filter((obj) => { return obj.manager === name }).length;
        curr3 = curr0 === 0 ? 0 : Math.floor((curr1 / curr0) * 100000) / 1000;
        curr4 = acc0 === 0 ? 0 : Math.floor((curr0 / acc0) * 100000) / 1000;
        curr5 = acc1 === 0 ? 0 : Math.floor((curr1 / acc1) * 100000) / 1000;
        matrix.push([
          name,
          curr0,
          curr1,
          curr2,
          curr3,
          curr4,
          curr5,
        ]);
      }

      tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() });
      tempProject = equalJson(JSON.stringify(projectsRaw));
      tempCliidArr = tempClient.map((obj) => { return obj.cliid });
      curr0 = tempClient.length;
      curr1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;
      curr2 = tempProject.filter((obj) => { return obj.process.contract.first.date.valueOf() >= startDate.valueOf() && obj.process.contract.first.date.valueOf() < endDate.valueOf() }).length;
      curr3 = curr0 === 0 ? 0 : Math.floor((curr1 / curr0) * 100000) / 1000;
      curr4 = 100;
      curr5 = 100;
      matrix.push([
        "total",
        curr0,
        curr1,
        curr2,
        curr3,
        curr4,
        curr5,
      ]);
      matrix.push([ "", "", "", "", "", "", "" ]);

    }

    await sheets.update_value_inPython(sheetsId, "", matrix);

    await messageLog("manager sync done");
    return true;
  } catch (e) {
    await errorLog("manager sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
