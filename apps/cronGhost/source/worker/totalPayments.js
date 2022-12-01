const dayId = [
  "d233",
];

const hourId = [];

const worker = async function (package) {
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongopython, mongolocal,
  } = package;
  const { messageLog, errorLog, equalJson, dateToString } = mother;
  try {
    const selfMongo = mongo;
    const selfPythonMongo = mongopython;
    const sheetsId = "1OFnDHF0ZI4OyDfAsF_qGOSxOouxtwLw8zlSsbj4ymY0";
    const projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }
      ]
    }, { selfMongo });
    const clients = await back.getClientsByQuery({ $or: projects.toNormal().map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo, withTools: true });
    const targetProjectsProid = projects.toNormal().map((obj) => { return obj.proid }).map((proid) => { return { "links.proid": proid } });
    const targetBills = await back.mongoRead("generalBill", { $or: targetProjectsProid }, { selfMongo: selfPythonMongo });
    const targetRequests = targetBills.map((obj) => { for (let request of obj.requests) { request.proid = obj.links.proid; request.cliid = obj.links.cliid; } return obj.requests });
    const requestMatrix_raw = targetRequests.flat();
    const requestMatrix = requestMatrix_raw.map((obj) => { return { proid: obj.proid, cliid: obj.cliid, name: obj.name, status: obj.status, pay: obj.pay, proofs: obj.proofs } }).filter((obj) => { return obj.proofs.length !== 0 });
    let client, finalMatrix, tempArr;

    requestMatrix.sort((a, b) => {
      return a.proid > b.proid ? 1 : -1;
    });

    finalMatrix = [];
    for (let obj of requestMatrix) {
      client = clients.search(obj.cliid);
      obj.client = client.name;

      for (let i = 0; i < obj.proofs.length; i++) {
        obj.proofs[i].amount = obj.pay[Math.floor(i / 2)].amount;
      }

      obj.proofs.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

      for (let { date, amount, method, proof, to } of obj.proofs) {
        tempArr = [];
        tempArr.push(client.name);
        tempArr.push(obj.cliid);
        tempArr.push(obj.proid);
        tempArr.push(obj.name);
        tempArr.push(amount);
        tempArr.push(dateToString(date));
        tempArr.push(method);
        tempArr.push(proof);
        tempArr.push(to);
        finalMatrix.unshift(tempArr);
      }
    }

    finalMatrix.unshift([
      "성함",
      "C id",
      "P id",
      "대상",
      "결제 금액",
      "결제 날짜",
      "결제 방법",
      "증빙",
      "수신자"
    ]);

    await sheets.update_value_inPython(sheetsId, "default", finalMatrix);

    await messageLog("total payments sheets done");
    return true;
  } catch (e) {
    await errorLog("total payments sheets error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
