const dayId = [
  "d211",
];

const hourId = [];

const worker = async function (package) {
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal, mongopython,
    rethink,
  } = package;
  const { requestSystem, messageLog, errorLog, dateToString, stringToDate, equalJson } = mother;
  try {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)) }
    const selfPythonMongo = mongopython;
    const selfMongo = mongo;

    const clients = (await back.getClientsByQuery({}, { selfMongo })).toNormal();
    const designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
    const motherProjects_raw = (await back.getProjectsByQuery({}, { selfMongo })).toNormal();
    const motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    const collection = "generalBill";
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();

    let result;
    let thisClient, name;
    let thisDesigner;
    let proid, cliid, desid, service, process;
    let thisBill;
    let thisBilid;
    let phone;
    let firstSupply, firstVat, firstConsumer;
    let remainSupply, remainVat, remainConsumer;
    let remainPay;
    let remainCancel;
    let remainProofs;
    let firstPay;
    let firstCancel;
    let firstProofs;
    let rows;
    let whereQuery, updateQuery;
    let remainIndex, remainItemIndex;
    let firstIndex, firstItemIndex;

    for (let thisProject of motherProjects) {

      ({ proid, cliid, desid, service, process } = thisProject);

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      thisDesigner = designers.find((obj) => { return obj.desid === desid });

      name = thisClient.name;
      phone = thisClient.phone;
      [ thisBill ] = await back.mongoRead(collection, { $and: [ { "links.proid": proid }, { "links.method": (service.online ? "online" : "offline") } ] }, { selfMongo: selfPythonMongo });
      thisBilid = thisBill.bilid;

      remainIndex = 0;
      firstIndex = 0;
      for (let i = 0; i < thisBill.responses.length; i++) {
        if (/홈리에종 잔금/gi.test(thisBill.responses[i].name)) {
          remainIndex = i;
        }
        if (/홈리에종 선금/gi.test(thisBill.responses[i].name)) {
          firstIndex = i;
        }
      }

      whereQuery = { bilid: thisBilid };
      updateQuery = {};

      updateQuery["responses." + String(firstIndex) + ".items.0.unit.price"] = Math.floor(process.calculation.payments.first.amount);
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.pure"] = Math.floor(process.calculation.payments.first.amount);
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.commission"] = Math.floor((process.contract.remain.calculation.amount.supply - process.calculation.payments.totalAmount) / 2);

      updateQuery["responses." + String(remainIndex) + ".items.0.unit.price"] = Math.floor(process.calculation.payments.remain.amount);
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.pure"] = Math.floor(process.calculation.payments.remain.amount);
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.commission"] = Math.floor((process.contract.remain.calculation.amount.supply - process.calculation.payments.totalAmount) / 2);

      if (process.calculation.payments.first.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".pay"] = [
          {
            date: process.calculation.payments.first.date,
            amount: Math.floor(process.calculation.payments.first.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(firstIndex) + ".proofs"] = [
          {
            date: process.calculation.payments.first.date,
            method: "계좌 이체",
            proof: process.calculation.info.proof,
            to: process.calculation.info.to,
          }
        ]
      }

      if (process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".cancel"] = [
          {
            date: process.calculation.payments.first.cancel,
            amount: Math.floor(process.calculation.payments.first.refund),
            oid: ""
          }
        ]
      }

      if (process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".pay"] = [
          {
            date: process.calculation.payments.remain.date,
            amount: Math.floor(process.calculation.payments.remain.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(remainIndex) + ".proofs"] = [
          {
            date: process.calculation.payments.remain.date,
            method: "계좌 이체",
            proof: process.calculation.info.proof,
            to: process.calculation.info.to,
          }
        ]
      }

      if (process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".cancel"] = [
          {
            date: process.calculation.payments.remain.cancel,
            amount: Math.floor(process.calculation.payments.remain.refund),
            oid: ""
          }
        ]
      }

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfPythonMongo });
      console.log(whereQuery, updateQuery);

    }

    await errorLog("bill responses sync done");
    return true;
  } catch (e) {
    await errorLog("bill responses error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
