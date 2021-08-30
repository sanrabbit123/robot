const BillMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/billMaker";
  this.mapDir = this.dir + "/map";
  this.tempDir = process.cwd() + "/temp";
}

BillMaker.billCollections = [
  "cashReceipt",
  "taxBill",
  "stylingForm",
];

BillMaker.billDictionary = {
  styling: {
    class: "style",
    name: "스타일링",
    requests: {
      firstPayment: {
        name: "홈리에종 계약금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ method });
          return info;
        },
        item: (feeObject, subObj = {}) => {
          const contractAmount = 300000;
          return [
            [ "designerTime", contractAmount ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: client.cliid,
            name: client.name,
            phone: client.phone,
            email: client.email,
          };
        },
        comments: [
          "계약금은 전체 서비스 금액에 포함됩니다.",
          "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
          "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 스타일링 서비스가 계속 진행됩니다.",
          "현장 미팅 후 스타일링을 진행하지 않더라도, 계약금은 환불되지 않습니다.",
        ]
      },
      secondPayment: {
        name: "홈리에종 잔금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ method });
          return info;
        },
        item: (feeObject, subObj = {}) => {
          const contractAmount = 300000;
          return [
            [ "designerTime", feeObject.amount - contractAmount ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: client.cliid,
            name: client.name,
            phone: client.phone,
            email: client.email,
          };
        },
        comments: [
          "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
          "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
          "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
          "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다.",
        ]
      },
      travelPayment: {
        name: "디자이너 출장비",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          let feeObject, distance;
          for (let proposal of project.proposal.detail) {
            if (proposal.desid === designer.desid) {
              for (let obj of proposal.fee) {
                if (obj.method === method) {
                  feeObject = obj;
                }
              }
            }
          }
          distance = feeObject.distance;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ distance: distance.distance });
          info.push({ time: distance.time });
          info.push({ number: distance.number });
          info.push({ limit: distance.limit });
          info.push({ method });
          info.push({ desid: designer.desid });
          return info;
        },
        item: (feeObject, subObj = {}) => {
          return [
            [ "travelExpenses", 0 ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: client.cliid,
            name: client.name,
            phone: client.phone,
            email: client.email,
          };
        },
        comments: []
      }
    },
    responses: {
      firstDesignFee: {
        name: "홈리에종 선금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ method });
          info.push({ desid: designer.desid });
          return info;
        },
        item: (feeObject, subObj) => {
          return [
            [ "designerFeeRemain", feeObject.amount ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: designer.desid,
            name: designer.designer,
            phone: designer.information.phone,
            email: designer.information.email,
          };
        },
        comments: [
          "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
          "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
          "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
          "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다.",
        ]
      },
      secondDesignFee: {
        name: "홈리에종 잔금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ method });
          info.push({ desid: designer.desid });
          return info;
        },
        item: (feeObject, subObj) => {
          return [
            [ "designerFeeRemain", feeObject.amount ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: designer.desid,
            name: designer.designer,
            phone: designer.information.phone,
            email: designer.information.email,
          };
        },
        comments: [
          "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
          "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
          "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
          "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다.",
        ]
      },
      designerTravelFee: {
        name: "출장비 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          let feeObject, distance;
          for (let proposal of project.proposal.detail) {
            if (proposal.desid === designer.desid) {
              for (let obj of proposal.fee) {
                if (obj.method === method) {
                  feeObject = obj;
                }
              }
            }
          }
          distance = feeObject.distance;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          info.push({ distance: distance.distance });
          info.push({ time: distance.time });
          info.push({ number: distance.number });
          info.push({ limit: distance.limit });
          info.push({ method });
          info.push({ desid: designer.desid });
          return info;
        },
        item: (feeObject, subObj) => {
          return [
            [ "travelExpenses", feeObject.amount ]
          ];
        },
        target: (client, designer, project, method, subObj = {}) => {
          return {
            id: designer.desid,
            name: designer.designer,
            phone: designer.information.phone,
            email: designer.information.email,
          };
        },
        comments: []
      }
    },
    goods: {
      designerTime: {
        id: "_idte",
        name: "디자인비",
        description: "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
        ea: null,
        number: (method, distance, subObj = {}) => { return 1; },
        amount: (method, amount, distance, subObj = {}) => { return amount; },
        comments: []
      },
      travelExpenses: {
        id: "_ites",
        name: "출장비",
        description: "디자이너가 출장시 발생되는 왕복 비용입니다.",
        ea: "회",
        number: (method, distance) => { return distance.number; },
        amount: (method, amount, distance) => { return distance.amount; },
        comments: [
          "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
          "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.",
          "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
          "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.",
        ]
      },
    },
    calculation: {
      designerFeeFirst: {
        id: "_edff",
        name: "디자인비 선금",
        description: "디자인 비용에 대한 선금입니다.",
        ea: null,
        number: (method, distance, subObj = {}) => { return 1; },
        amount: (method, amount, distance, subObj) => {
          const { designer } = subObj;
          const freeRatio = 0.967;
          let classification, percentage, calculate, commission;

          classification = designer.information.business.businessInfo.classification.value;
          percentage = designer.information.business.service.cost.percentage;

          if (/일반/gi.test(classification)) {
            calculate = Math.floor((amount * 1.1) * (1 - (percentage / 100)));
          } else if (/간이/gi.test(classification)) {
            calculate = Math.floor(amount * (1 - (percentage / 100)));
          } else if (/프리/gi.test(classification)) {
            calculate = Math.floor((amount - (amount * (percentage / 100))) * freeRatio);
          } else {
            calculate = Math.floor((amount * 1.1) * (1 - (percentage / 100)));
          }
          commission = (amount * (percentage / 100)) / 2;
          commission = Math.floor(commission / 10) * 10;
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission };
        },
        comments: []
      },
      designerFeeRemain: {
        id: "_edfr",
        name: "디자인비 잔금",
        description: "디자인 비용에 대한 잔금입니다.",
        ea: null,
        number: (method, distance, subObj = {}) => { return 1; },
        amount: (method, amount, distance, subObj) => {
          const { designer } = subObj;
          const freeRatio = 0.967;
          let classification, percentage, calculate, commission;

          classification = designer.information.business.businessInfo.classification.value;
          percentage = designer.information.business.service.cost.percentage;

          if (/일반/gi.test(classification)) {
            calculate = Math.floor((amount * 1.1) * (1 - (percentage / 100)));
          } else if (/간이/gi.test(classification)) {
            calculate = Math.floor(amount * (1 - (percentage / 100)));
          } else if (/프리/gi.test(classification)) {
            calculate = Math.floor((amount - (amount * (percentage / 100))) * freeRatio);
          } else {
            calculate = Math.floor((amount * 1.1) * (1 - (percentage / 100)));
          }
          commission = (amount * (percentage / 100)) / 2;
          commission = Math.floor(commission / 10) * 10;
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission };
        },
        comments: []
      },
      travelExpenses: {
        id: "_edte",
        name: "디자이너 출장비",
        description: "디자이너가 출장시 발생되는 왕복 비용입니다.",
        ea: "회",
        number: (method, distance, subObj = {}) => { return distance.number; },
        amount: (method, amount, distance, subObj) => {
          const { designer } = subObj;
          const freeRatio = 0.967;
          const distancePercentage = 10;
          let classification, calculate, commission, distanceFinalAmount;

          distanceFinalAmount = distance.amount * distance.number;
          classification = designer.information.business.businessInfo.classification.value;

          if (/일반/gi.test(classification)) {
            calculate = Math.floor((distanceFinalAmount * 1.1) * (1 - (distancePercentage / 100)));
          } else if (/간이/gi.test(classification)) {
            calculate = Math.floor(distanceFinalAmount * (1 - (distancePercentage / 100)));
          } else if (/프리/gi.test(classification)) {
            calculate = Math.floor((distanceFinalAmount - (distanceFinalAmount * (distancePercentage / 100))) * freeRatio);
          } else {
            calculate = Math.floor((distanceFinalAmount * 1.1) * (1 - (distancePercentage / 100)));
          }
          commission = Math.floor(distanceFinalAmount * (distancePercentage / 100));

          calculate = (distance.number === 0 ? 0 : Math.floor(calculate / distance.number));

          return { amount: calculate, commission };
        },
        comments: [
          "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
          "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
          "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
          "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.",
        ]
      }
    },
    etc: {
      contractAmount: 300000,
      vatRatio: 0.1,
      freeRatio: 0.967,
      distancePercentage: 10,
    }
  },
};

BillMaker.prototype.createBill = async function (collection, updateQueryArr, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  if (typeof collection === "object" && typeof updateQueryArr === "object" && !Array.isArray(updateQueryArr)) {
    const updateQuery = collection;
    option = updateQueryArr;
    collection = "generalBill";
    const map = require(`${this.mapDir}/${collection}.js`);
    try {
      let MONGOC;
      let selfBoo;
      let rows;
      let dummy;
      let pastId;
      let newId;

      if (option.selfMongo === undefined || option.selfMongo === null) {
        selfBoo = false;
      } else {
        selfBoo = true;
      }

      if (!selfBoo) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
        await MONGOC.connect();
      } else {
        MONGOC = option.selfMongo;
      }

      dummy = map.main();
      rows = await MONGOC.db(`miro81`).collection(collection).find({}).sort({ "date": -1 }).limit(1).toArray();
      if (rows.length === 0) {
        pastId = "b2111_aa01s";
      } else {
        pastId = rows[0].bilid;
      }
      dummy.bilid = this.back.idMaker(pastId, false);
      newId = dummy.bilid;

      await MONGOC.db(`miro81`).collection(collection).insertOne(dummy);
      if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
        await MONGOC.db(`miro81`).collection(collection).updateOne({ bilid: newId }, { $set: updateQuery });
      }

      if (!selfBoo) {
        await MONGOC.close();
      }

      return newId;

    } catch (e) {
      console.log(e);
    }
  } else if (typeof collection === "string" && Array.isArray(updateQueryArr) && typeof option === "object") {
    if (!BillMaker.billCollections.includes(collection)) {
      throw new Error("generalBill must use getBillById or getBillsByQuery");
    }
    if (!updateQueryArr.every((o) => { return typeof o === "object"; })) {
      throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
    }
    const map = require(`${this.mapDir}/${collection}.js`);
    try {
      const { main, alive } = map;
      if (typeof main !== "function" || typeof alive !== "function") {
        throw new Error("invaild collection model");
      }
      let MONGOC;
      let selfBoo;
      let tong;
      let rows;

      if (option.selfMongo === undefined || option.selfMongo === null) {
        selfBoo = false;
      } else {
        selfBoo = true;
      }

      if (!selfBoo) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
        await MONGOC.connect();
      } else {
        MONGOC = option.selfMongo;
      }

      tong = main(alive, updateQueryArr, instance.mother);
      for (let { fresh, findQuery, insertEvent } of tong) {
        rows = await MONGOC.db(`miro81`).collection(collection).find(findQuery).toArray();
        if (rows.length === 0) {
          await insertEvent(fresh);
          await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
        } else {
          if (option.updateMode === true) {
            await MONGOC.db(`miro81`).collection(collection).deleteOne(findQuery);
            await insertEvent(fresh);
            await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
          }
        }
      }

      if (!selfBoo) {
        await MONGOC.close();
      }

    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
}

BillMaker.prototype.readBill = async function (collection, whereQuery, option = { selfMongo: null }) {
  if (typeof collection !== "string" || typeof whereQuery !== "object" || typeof option !== "object") {
    throw new Error("input must be String: bill collection, Object: whereQuery, Object: option");
  }
  if (!BillMaker.billCollections.includes(collection)) {
    throw new Error("generalBill must use getBillById or getBillsByQuery");
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  const map = require(`${this.mapDir}/${collection}.js`);
  try {
    const { alive, wrap } = map;
    let MONGOC;
    let selfBoo;
    let rows;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.limit !== undefined) {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).toArray();
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return map.wrap(alive, rows, this.mother);

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.returnBillDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/generalBill.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BillMaker.prototype.getBillById = async function (bilid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const map = require(`${this.mapDir}/generalBill.js`);
    let MONGOC;
    let selfBoo;
    let arr;
    let result, target;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    arr = await MONGOC.db(`miro81`).collection(`generalBill`).find({ bilid }).toArray();
    result = map.wrap(map.alive, arr, this.mother);
    if (result.length > 0) {
      target = result[0];
    } else {
      target = null;
    }
    if (!selfBoo) {
      await MONGOC.close();
    }
    return target;
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.getBillsByQuery = async function (whereQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const map = require(`${this.mapDir}/generalBill.js`);
    let MONGOC;
    let selfBoo;
    let sortQuery;
    let tong;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.limit !== undefined) {
      tong = await MONGOC.db(`miro81`).collection(`generalBill`).find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOC.db(`miro81`).collection(`generalBill`).find(whereQuery).sort(sortQuery).toArray();
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return map.wrap(map.alive, tong, this.mother);
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.updateBill = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
    }
    let MONGOC;
    let selfBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
      await MONGOC.db(`miro81`).collection(`generalBill`).updateOne(whereQuery, { $set: updateQuery });
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.deleteBill = async function (bilid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    let MONGOC;
    let selfBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    await MONGOC.db(`miro81`).collection(`generalBill`).deleteOne({ bilid });
    if (!selfBoo) {
      await MONGOC.close();
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.createStylingBill = async function (proid, option = { selfMongo: null, selfCoreMongo: null, selfConsoleMongo: null }) {
  if (typeof proid !== "string") {
    throw new Error("must be proid");
  }
  if (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    throw new Error("must be proid");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo, mongoconsoleinfo, sleep, equalJson } = this.mother;
  const constNames = {
    class: BillMaker.billDictionary.styling.class,
    name: BillMaker.billDictionary.styling.name,
  };
  try {
    let MONGOC, MONGOCOREC, MONGOCONSOLEC;
    let selfBoo, selfCoreBoo, selfConsoleBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (option.selfConsoleMongo === undefined || option.selfConsoleMongo === null) {
      selfConsoleBoo = false;
    } else {
      selfConsoleBoo = true;
    }

    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }
    if (!selfConsoleBoo) {
      MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      await MONGOCONSOLEC.connect();
    } else {
      MONGOCONSOLEC = option.selfConsoleMongo;
    }

    const members = await back.setMemberObj({ selfMongo: MONGOCOREC, getMode: true });
    if (!Array.isArray(members) || members.length === 0) {
      throw new Error("no member error");
    }
    const project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("no project error");
    }
    const client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });
    if (client === null) {
      throw new Error("no client error");
    }

    let targetProposals;
    let designerHistory;
    let thisMember;
    let bilid, bilidArr;
    let whereQuery, updateQuery;
    let tempObj, tempObj2, tempArr;
    let res;
    let temp;
    let updateMode;
    let thisBill;
    let designer;

    if (/^d/.test(project.desid)) {
      targetProposals = [];
      for (let proposal of project.proposal.detail) {
        if (proposal.desid === project.desid) {
          targetProposals.push(proposal);
        }
      }
    } else {
      targetProposals = project.proposal.detail;
    }

    bilidArr = [];
    for (let { desid, fee } of targetProposals) {

      designerHistory = await back.getHistoryById("designer", desid, { selfMongo: MONGOCONSOLEC });
      if (designerHistory === null) {
        throw new Error("designer history error");
      }

      designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });

      thisMember = null;
      for (let obj of members) {
        if (obj.name === designerHistory.manager) {
          thisMember = obj;
        }
      }
      if (thisMember === null) {
        thisMember = members[0];
      }

      for (let { method, partial, amount, distance } of fee) {

        temp = await this.getBillsByQuery({
          $and: [
            { "links.proid": project.proid },
            { "links.cliid": client.cliid },
            { "links.desid": desid },
            { "links.method": method },
          ]
        }, { selfMongo: MONGOC });
        if (temp.length === 0) {
          bilid = await this.createBill({}, { selfMongo: MONGOC });
          updateMode = false;
        } else {
          thisBill = temp[0].bilid;
          bilid = thisBill.bilid;
          updateMode = true;
        }

        whereQuery = { bilid };
        updateQuery = {};
        updateQuery["class"] = constNames.class;
        updateQuery["name"] = client.name + "_" + client.phone + "_" + constNames.name;
        updateQuery["date"] = new Date();

        tempObj = this.returnBillDummies("managers");
        tempObj.id = thisMember.id;
        tempObj.name = thisMember.name;
        tempObj.phone = thisMember.phone;
        tempObj.email = thisMember.email[0];
        updateQuery["participant.managers"] = [ equalJson(JSON.stringify(tempObj)) ];
        updateQuery["participant.customer.id"] = client.cliid;
        updateQuery["participant.customer.name"] = client.name;
        updateQuery["participant.customer.phone"] = client.phone;
        updateQuery["participant.customer.email"] = client.email;
        updateQuery["participant.designer.id"] = designer.desid;
        updateQuery["participant.designer.name"] = designer.designer;
        updateQuery["participant.designer.phone"] = designer.information.phone;
        updateQuery["participant.designer.email"] = designer.information.email;
        updateQuery["links.proid"] = project.proid;
        updateQuery["links.cliid"] = client.cliid;
        updateQuery["links.desid"] = desid;
        updateQuery["links.method"] = method;
        res = await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

        await this.requestInjection(bilid, "firstPayment", client, designer, project, method, { selfMongo: MONGOC });
        await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC });
        // await this.requestInjection(bilid, "travelPayment", client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: 5 } });

        await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC });
        await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC });
        // await this.responseInjection(bilid, "designerTravelFee", client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: 5 } });

        if (res === "success") {
          bilidArr.push(bilid);
        }
      }

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }
    if (!selfConsoleBoo) {
      await MONGOCONSOLEC.close();
    }

    return bilidArr;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.requestInjection = async function (bilid, requestKey, client, designer, project, method, option = { selfMongo: null }) {
  if (typeof bilid !== "string" || typeof requestKey !== "string" || typeof client !== "object" || typeof designer !== "object" || typeof project !== "object" || typeof method !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { mongo, mongopythoninfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  const requestConst = "_r";
  try {
    let requestObject;
    let MONGOC;
    let selfBoo;
    let thisBill;
    let thisRequest;
    let feeObject;
    let itemMatrix;
    let item, itemFactor;
    let distance;
    let tempArr;
    let whereQuery, updateQuery;
    let commentsArr;

    if (stylingRequests[requestKey] === undefined) {
      throw new Error("invaild request key");
    }
    thisRequest = stylingRequests[requestKey];

    feeObject = null;
    for (let proposal of project.proposal.detail) {
      if (proposal.desid === designer.desid) {
        for (let obj of proposal.fee) {
          if (obj.method === method) {
            feeObject = obj;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    distance = feeObject.distance;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    requestObject = this.returnBillDummies("requests");
    requestObject.id = bilid + requestConst + String(thisBill.requests.length);
    requestObject.info = thisRequest.info(client, designer, project, method, null);

    itemMatrix = thisRequest.item(feeObject, null);
    commentsArr = thisRequest.comments;
    for (let [ property, thisAmount ] of itemMatrix) {
      await sleep(100);
      if (stylingItems[property] === undefined) {
        throw new Error("item property error");
      }
      item = stylingItems[property];
      itemFactor = this.returnBillDummies("items");
      itemFactor.id = bilid + item.id;
      itemFactor.class = property;
      itemFactor.name = item.name;
      itemFactor.description = item.description;
      itemFactor.unit.ea = item.ea;
      itemFactor.unit.price = Math.round(item.amount(method, thisAmount, distance, { client, designer, project }));
      if (typeof option.number === "object" && option.number !== null) {
        if (typeof option.number[property] === "number") {
          itemFactor.unit.number = option.number[property];
        } else {
          itemFactor.unit.number = item.number(method, distance, { client, designer, project });
        }
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project });
      }
      itemFactor.amount.supply = Math.round(itemFactor.unit.price * itemFactor.unit.number);
      itemFactor.amount.vat = Math.round(itemFactor.amount.supply * vatRatio);
      itemFactor.amount.consumer = Math.round(itemFactor.amount.supply * (1 + vatRatio));
      requestObject.items.push(equalJson(JSON.stringify(itemFactor)));
      commentsArr = commentsArr.concat(item.comments);
    }

    requestObject.name = thisRequest.name;
    for (let c of commentsArr) {
      requestObject.comments.push(c);
    }

    requestObject.target = thisRequest.target(client, designer, project, method, null);

    tempArr = thisBill.requests.toNormal();
    tempArr.unshift(requestObject);
    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests"] = equalJson(JSON.stringify(tempArr));
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.requestEjection = async function (bilid, requestIndex, option = { selfMongo: null }) {
  if (typeof bilid !== "string") {
    throw new Error("invaild input");
  }
  let mode, thisId;
  if (bilid.split("_").length === 3) {
    mode = "id";
    option = requestIndex;
    thisId = bilid;
    bilid = thisId.split("_").slice(0, 2).join("_");
  } else {
    if (typeof requestIndex !== "number") {
      throw new Error("invaild input");
    }
    mode = "index";
  }

  const instance = this;
  const { mongo, mongopythoninfo, equalJson } = this.mother;
  try {
    let MONGOC;
    let selfBoo;
    let thisBill;
    let tempArr, finalArr;
    let whereQuery, updateQuery;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    tempArr = thisBill.requests.toNormal();

    if (mode === "index") {
      tempArr.splice(requestIndex, 1);
      finalArr = equalJson(JSON.stringify(tempArr));
    } else {
      finalArr = [];
      for (let obj of tempArr) {
        if (obj.id !== thisId) {
          finalArr.push(obj);
        }
      }
    }

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests"] = finalArr;
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.responseInjection = async function (bilid, responseKey, client, designer, project, method, option = { selfMongo: null }) {
  if (typeof bilid !== "string" || typeof responseKey !== "string" || typeof client !== "object" || typeof designer !== "object" || typeof project !== "object" || typeof method !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { mongo, mongopythoninfo, equalJson, sleep } = this.mother;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const responseConst = "_s";
  try {
    let responseObject;
    let MONGOC;
    let selfBoo;
    let thisBill;
    let thisResponse;
    let feeObject;
    let itemMatrix;
    let item, itemFactor;
    let distance;
    let tempArr;
    let whereQuery, updateQuery;
    let commentsArr;
    let tempObject, tempAmount, tempCommission;

    if (stylingResponses[responseKey] === undefined) {
      throw new Error("invaild response key");
    }
    thisResponse = stylingResponses[responseKey];

    feeObject = null;
    for (let proposal of project.proposal.detail) {
      if (proposal.desid === designer.desid) {
        for (let obj of proposal.fee) {
          if (obj.method === method) {
            feeObject = obj;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    distance = feeObject.distance;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    responseObject = this.returnBillDummies("responses");
    responseObject.id = bilid + responseConst + String(thisBill.responses.length);
    responseObject.info = thisResponse.info(client, designer, project, method, null);

    itemMatrix = thisResponse.item(feeObject, { designer });
    commentsArr = thisResponse.comments;
    for (let [ property, thisAmount ] of itemMatrix) {
      await sleep(100);
      if (designerCalculation[property] === undefined) {
        throw new Error("item property error");
      }
      item = designerCalculation[property];
      itemFactor = this.returnBillDummies("responseItems");
      itemFactor.id = bilid + item.id;
      itemFactor.class = property;
      itemFactor.name = item.name;
      itemFactor.description = item.description;
      itemFactor.unit.ea = item.ea;
      tempObject = item.amount(method, thisAmount, distance, { client, designer, project });
      tempAmount = tempObject.amount;
      tempCommission = tempObject.commission;
      itemFactor.unit.price = tempAmount;
      if (typeof option.number === "object" && option.number !== null) {
        if (typeof option.number[property] === "number") {
          itemFactor.unit.number = option.number[property];
        } else {
          itemFactor.unit.number = item.number(method, distance, { client, designer, project });
        }
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project });
      }
      if (property === "travelExpenses") {
        tempCommission = (tempCommission / distance.number) * itemFactor.unit.number;
      }
      itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
      itemFactor.amount.commission = tempCommission;
      responseObject.items.push(equalJson(JSON.stringify(itemFactor)));
      commentsArr = commentsArr.concat(item.comments);
    }

    responseObject.name = thisResponse.name;
    for (let c of commentsArr) {
      responseObject.comments.push(c);
    }

    responseObject.target = thisResponse.target(client, designer, project, method, null);

    tempArr = thisBill.responses.toNormal();
    tempArr.unshift(responseObject);
    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["responses"] = equalJson(JSON.stringify(tempArr));
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.responseEjection = async function (bilid, responseIndex, option = { selfMongo: null }) {
  if (typeof bilid !== "string") {
    throw new Error("invaild input");
  }
  let mode, thisId;
  if (bilid.split("_").length === 3) {
    mode = "id";
    option = responseIndex;
    thisId = bilid;
    bilid = thisId.split("_").slice(0, 2).join("_");
  } else {
    if (typeof responseIndex !== "number") {
      throw new Error("invaild input");
    }
    mode = "index";
  }

  const instance = this;
  const { mongo, mongopythoninfo, equalJson } = this.mother;
  try {
    let MONGOC;
    let selfBoo;
    let thisBill;
    let tempArr, finalArr;
    let whereQuery, updateQuery;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    tempArr = thisBill.responses.toNormal();

    if (mode === "index") {
      tempArr.splice(responseIndex, 1);
      finalArr = equalJson(JSON.stringify(tempArr));
    } else {
      finalArr = [];
      for (let obj of tempArr) {
        if (obj.id !== thisId) {
          finalArr.push(obj);
        }
      }
    }

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["responses"] = finalArr;
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.itemInjection = async function (id, itemKey, client, designer, project, method, option = { selfMongo: null }) {
  if (typeof id !== "string" || typeof itemKey !== "string") {
    throw new Error("must be request or response id");
  }
  if (!/_/gi.test(id)) {
    throw new Error("must be request or response id");
  }
  if (!(id.split('_').length === 3 && /^[rs]/.test(id.split('_')[2]))) {
    throw new Error("must be request or response id");
  }
  const instance = this;
  const { mongo, mongopythoninfo, equalJson, sleep } = this.mother;
  const bilid = id.split('_')[0] + "_" + id.split('_')[1];
  const toggle = /^r/.test(id.split('_')[2]) ? true : false;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  try {
    let MONGOC;
    let feeObject;
    let selfBoo;
    let thisBill;
    let distance;
    let item;
    let targetR, targetIndex;
    let itemFactor;
    let num;
    let amount;
    let whereQuery, updateQuery;
    let itemsArr, commentsArr;
    let tempObject, tempAmount, tempCommission;

    if (toggle) {
      if (stylingItems[itemKey] === undefined) {
        throw new Error("invaild item key");
      }
      item = stylingItems[itemKey];
    } else {
      if (designerCalculation[itemKey] === undefined) {
        throw new Error("invaild item key");
      }
      item = designerCalculation[itemKey];
    }

    feeObject = null;
    for (let proposal of project.proposal.detail) {
      if (proposal.desid === designer.desid) {
        for (let obj of proposal.fee) {
          if (obj.method === method) {
            feeObject = obj;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    distance = feeObject.distance;
    amount = feeObject.amount;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    targetR = null;
    num = 0;
    if (toggle) {
      for (let obj of thisBill.requests) {
        if (id === obj.id) {
          targetR = obj;
          targetIndex = num;
        }
        num++;
      }
    } else {
      for (let obj of thisBill.responses) {
        if (id === obj.id) {
          targetR = obj;
          targetIndex = num;
        }
        num++;
      }
    }
    if (targetR === null) {
      throw new Error("invaild request or response id");
    }

    itemsArr = targetR.items.toNormal();
    commentsArr = targetR.comments.toNormal();

    if (toggle) {
      itemFactor = this.returnBillDummies("items");
      itemFactor.id = bilid + item.id;
      itemFactor.class = itemKey;
      itemFactor.name = item.name;
      itemFactor.description = item.description;
      itemFactor.unit.ea = item.ea;
      itemFactor.unit.price = Math.round(item.amount(method, amount, distance, { client, designer, project }));
      if (typeof option.number === "number") {
        itemFactor.unit.number = option.number;
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project });
      }
      itemFactor.amount.supply = Math.round(itemFactor.unit.price * itemFactor.unit.number);
      itemFactor.amount.vat = Math.round(itemFactor.amount.supply * vatRatio);
      itemFactor.amount.consumer = Math.round(itemFactor.amount.supply * (1 + vatRatio));
    } else {
      itemFactor = this.returnBillDummies("responseItems");
      itemFactor.id = bilid + item.id;
      itemFactor.class = itemKey;
      itemFactor.name = item.name;
      itemFactor.description = item.description;
      itemFactor.unit.ea = item.ea;
      tempObject = item.amount(method, amount, distance, { client, designer, project });
      tempAmount = tempObject.amount;
      tempCommission = tempObject.commission;
      itemFactor.unit.price = tempAmount;
      if (typeof option.number === "number") {
        itemFactor.unit.number = option.number;
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project });
      }
      itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
      itemFactor.amount.commission = tempCommission;
    }
    itemsArr.push(equalJson(JSON.stringify(itemFactor)));
    for (let c of item.comments) {
      if (!commentsArr.includes(c)) {
        commentsArr.push(c);
      }
    }

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".items"] = equalJson(JSON.stringify(itemsArr));
    updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".comments"] = equalJson(JSON.stringify(commentsArr));
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.itemEjection = async function (id, itemKey, option = { selfMongo: null }) {
  if (typeof id !== "string" || typeof itemKey !== "string") {
    throw new Error("must be request or response id");
  }
  if (!/_/gi.test(id)) {
    throw new Error("must be request or response id");
  }
  if (!(id.split('_').length === 3 && /^[rs]/.test(id.split('_')[2]))) {
    throw new Error("must be request or response id");
  }
  const instance = this;
  const { mongo, mongopythoninfo, equalJson, sleep } = this.mother;
  const bilid = id.split('_')[0] + "_" + id.split('_')[1];
  const toggle = /^r/.test(id.split('_')[2]) ? true : false;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  try {
    let MONGOC;
    let selfBoo;
    let thisBill;
    let item;
    let targetR, targetIndex;
    let num;
    let whereQuery, updateQuery;
    let itemsArr, commentsArr;
    let newItemArr, newCommentsArr;

    if (toggle) {
      if (stylingItems[itemKey] === undefined) {
        throw new Error("invaild item key");
      }
      item = stylingItems[itemKey];
    } else {
      if (designerCalculation[itemKey] === undefined) {
        throw new Error("invaild item key");
      }
      item = designerCalculation[itemKey];
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    targetR = null;
    num = 0;
    if (toggle) {
      for (let obj of thisBill.requests) {
        if (id === obj.id) {
          targetR = obj;
          targetIndex = num;
        }
        num++;
      }
    } else {
      for (let obj of thisBill.responses) {
        if (id === obj.id) {
          targetR = obj;
          targetIndex = num;
        }
        num++;
      }
    }
    if (targetR === null) {
      throw new Error("invaild request or response id");
    }

    itemsArr = targetR.items.toNormal();
    commentsArr = targetR.comments.toNormal();

    newItemArr = [];
    for (let i of itemsArr) {
      if (i.class !== itemKey) {
        newItemArr.push(i);
      }
    }
    newCommentsArr = [];
    for (let i of commentsArr) {
      if (!item.comments.includes(i)) {
        newCommentsArr.push(i);
      }
    }

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".items"] = newItemArr;
    updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".comments"] = newCommentsArr;
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.travelInjection = async function (injectionCase, proid, method, number, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof number !== "number") {
    throw new Error("invaild input");
  }
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
    throw new Error("injection case must be request or first or remain");
  }
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
    throw new Error("invaild proid");
  }
  if (method !== "offline" && method !== "online") {
    throw new Error("invaild method");
  }
  if (number < 0 || 20 < number) {
    throw new Error("invaild travel number");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const itemKey = "travelExpenses";
  const requestKey = "travelPayment";
  const responseKey = "designerTravelFee";
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let client, designer, project;
    let thisBill, bilid;
    let targetIndex;
    let updatedBill;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

    thisBill = await this.getBillsByQuery({
      $and: [
        { "links.proid": project.proid },
        { "links.cliid": client.cliid },
        { "links.desid": designer.desid },
        { "links.method": method },
      ]
    }, { selfMongo: MONGOC });
    if (thisBill.length === 0) {
      throw new Error("cannot found bill");
    }
    thisBill = thisBill[0];
    bilid = thisBill.bilid;

    if (injectionCase === "request") {

      await this.requestInjection(bilid, requestKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });
      await this.responseInjection(bilid, responseKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });

    } else {

      targetIndex = null;
      if (typeof option.index === "number" && thisBill.requests[option.index] !== undefined) {
        targetIndex = option.index;
      } else {
        for (let i = 0; i < thisBill.requests.length; i++) {
          if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
            targetIndex = i;
            break;
          }
        }
      }
      if (targetIndex !== null) {
        await this.itemEjection(thisBill.requests[targetIndex].id, itemKey, { selfMongo: MONGOC });
        await this.itemInjection(thisBill.requests[targetIndex].id, itemKey, client, designer, project, method, { selfMongo: MONGOC, number });
      }
      await this.responseInjection(bilid, responseKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });

    }

    updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return updatedBill;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.travelEjection = async function (injectionCase, proid, method, index, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number") {
    throw new Error("invaild input");
  }
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
    throw new Error("injection case must be request or first or remain");
  }
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
    throw new Error("invaild proid");
  }
  if (method !== "offline" && method !== "online") {
    throw new Error("invaild method");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const itemKey = "travelExpenses";
  const requestKey = "travelPayment";
  const responseKey = "designerTravelFee";
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let client, designer, project;
    let thisBill, bilid;
    let targetIndex;
    let targetItem, targetNumber, targetResponse, targetResponseIndex;
    let num;
    let updatedBill;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

    thisBill = await this.getBillsByQuery({
      $and: [
        { "links.proid": project.proid },
        { "links.cliid": client.cliid },
        { "links.desid": designer.desid },
        { "links.method": method },
      ]
    }, { selfMongo: MONGOC });
    if (thisBill.length === 0) {
      throw new Error("cannot found bill");
    }
    thisBill = thisBill[0];
    bilid = thisBill.bilid;

    if (injectionCase === "request") {

      for (let i of thisBill.requests[index].items) {
        if (i.class === itemKey) {
          targetItem = i;
        }
      }
      targetNumber = targetItem.unit.number;
      num = 0;
      targetResponse = null;
      for (let r of thisBill.responses) {
        if (r.name === stylingResponses[responseKey].name) {
          for (let i of r.items) {
            if (i.class === itemKey) {
              if (i.unit.number === targetNumber) {
                targetResponse = r;
                targetResponseIndex = num;
                break;
              }
            }
          }
          if (targetResponse !== null) {
            break;
          }
        }
        num++;
      }

      await this.requestEjection(bilid, index, { selfMongo: MONGOC });
      await this.responseEjection(bilid, targetResponseIndex, { selfMongo: MONGOC });

    } else {

      targetIndex = null;
      for (let i = 0; i < thisBill.requests.length; i++) {
        if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
          targetIndex = i;
          break;
        }
      }

      if (targetIndex !== null) {

        for (let i of thisBill.requests[targetIndex].items) {
          if (i.class === itemKey) {
            targetItem = i;
          }
        }
        targetNumber = targetItem.unit.number;
        num = 0;
        targetResponse = null;
        for (let r of thisBill.responses) {
          if (r.name === stylingResponses[responseKey].name) {
            for (let i of r.items) {
              if (i.class === itemKey) {
                if (i.unit.number === targetNumber) {
                  targetResponse = r;
                  targetResponseIndex = num;
                  break;
                }
              }
            }
            if (targetResponse !== null) {
              break;
            }
          }
          num++;
        }

        await this.itemEjection(thisBill.requests[targetIndex].id, itemKey, { selfMongo: MONGOC });
        await this.responseEjection(bilid, targetResponseIndex, { selfMongo: MONGOC });

      }

    }

    updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return updatedBill;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.travelReconfig = async function (injectionCase, proid, method, index, number, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number" || typeof number !== "number") {
    throw new Error("invaild input");
  }
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
    throw new Error("injection case must be request or first or remain");
  }
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
    throw new Error("invaild proid");
  }
  if (method !== "offline" && method !== "online") {
    throw new Error("invaild method");
  }
  if (number < 0 || 20 < number) {
    throw new Error("invaild travel number");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  const distancePercentage = BillMaker.billDictionary.styling.etc.distancePercentage;
  const itemKey = "travelExpenses";
  const requestKey = "travelPayment";
  const responseKey = "designerTravelFee";
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let client, designer, project;
    let thisBill, bilid;
    let targetIndex;
    let targetItem, targetItemIndex, targetNumber, targetResponse, targetResponseIndex, targetResponseItemIndex;
    let num;
    let whereQuery, updateQuery;
    let itemArr, oppositeItemArr;
    let feeObject, distance;
    let updatedBill;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

    feeObject = null;
    for (let proposal of project.proposal.detail) {
      if (proposal.desid === designer.desid) {
        for (let obj of proposal.fee) {
          if (obj.method === method) {
            feeObject = obj;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    distance = feeObject.distance;

    thisBill = await this.getBillsByQuery({
      $and: [
        { "links.proid": project.proid },
        { "links.cliid": client.cliid },
        { "links.desid": designer.desid },
        { "links.method": method },
      ]
    }, { selfMongo: MONGOC });
    if (thisBill.length === 0) {
      throw new Error("cannot found bill");
    }
    thisBill = thisBill[0];
    bilid = thisBill.bilid;

    if (injectionCase !== "request") {
      targetIndex = null;
      for (let i = 0; i < thisBill.requests.length; i++) {
        if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
          targetIndex = i;
          break;
        }
      }
      index = targetIndex;
    }

    for (let i = 0; i < thisBill.requests[index].items.length; i++) {
      if (thisBill.requests[index].items[i].class === itemKey) {
        targetItem = thisBill.requests[index].items[i];
        targetItemIndex = i;
      }
    }
    targetNumber = targetItem.unit.number;
    num = 0;
    targetResponse = null;
    for (let r of thisBill.responses) {
      if (r.name === stylingResponses[responseKey].name) {
        for (let i = 0; i < r.items.length; i++) {
          if (r.items[i].class === itemKey) {
            if (r.items[i].unit.number === targetNumber) {
              targetResponse = r;
              targetResponseIndex = num;
              targetResponseItemIndex = i;
              break;
            }
          }
        }
        if (targetResponse !== null) {
          break;
        }
      }
      num++;
    }

    itemsArr = thisBill.requests[index].items.toNormal();
    itemsArr[targetItemIndex].unit.number = number;
    itemsArr[targetItemIndex].amount.supply = itemsArr[targetItemIndex].unit.price * itemsArr[targetItemIndex].unit.number;
    itemsArr[targetItemIndex].amount.vat = Math.round(itemsArr[targetItemIndex].amount.supply * vatRatio);
    itemsArr[targetItemIndex].amount.consumer = Math.round(itemsArr[targetItemIndex].amount.supply + itemsArr[targetItemIndex].amount.vat);

    oppositeItemArr = thisBill.responses[targetResponseIndex].items.toNormal();
    oppositeItemArr[targetResponseItemIndex].unit.number = number;
    oppositeItemArr[targetResponseItemIndex].amount.pure = oppositeItemArr[targetResponseItemIndex].unit.price * oppositeItemArr[targetResponseItemIndex].unit.number;
    oppositeItemArr[targetResponseItemIndex].amount.commission = distance.amount * oppositeItemArr[targetResponseItemIndex].unit.number * (distancePercentage / 100);

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests." + String(index) + ".items"] = equalJson(JSON.stringify(itemsArr));
    updateQuery["responses." + String(targetResponseItemIndex) + ".items"] = equalJson(JSON.stringify(oppositeItemArr));
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return updatedBill;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.designerSelect = async function (proid, desid, option = { selfMongo: null }) {
  if (typeof proid !== "string" || typeof desid !== "string" || typeof option !== "object") {
    throw new Error("must be proid, desid");
  }
  if (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid) || !/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(desid)) {
    throw new Error("must be proid, desid");
  }
  const instance = this;
  const { mongo, mongoinfo, equalJson } = this.mother;
  try {
    let MONGOC;
    let selfBoo;
    let thisBill;
    let targets;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    targets = await this.getBillsByQuery({ "links.proid": proid }, { selfMongo: MONGOC });
    thisBill = null;
    for (let b of targets) {
      if (b.links.desid === desid) {
        thisBill = b;
      }
    }
    if (thisBill !== null) {
      for (let b of targets) {
        if (b.links.desid !== desid) {
          await this.deleteBill(b.bilid, { selfMongo: MONGOC });
        }
      }
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.serviceConverting = async function (proid, method, serid, option = { selfMongo: null, selfConsoleMongo: null }) {
  if (typeof proid !== "string" || typeof method !== "string" || typeof serid !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const work = new BackWorker();
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep } = this.mother;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio;
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let project;
    let thisBill, bilid;
    let pastSerid;
    let xValue;
    let remain;
    let totalNum, payNum, cancelNum;
    let totalNumR0, payNumR0, cancelNumR0;
    let totalNumR1, payNumR1, cancelNumR1;
    let desid, cliid;
    let designer, client;
    let feeObject;
    let pastFeeObject;
    let newFeeObject;
    let remainIndex, remainItemIndex;
    let num;
    let pastRemainArr;
    let proposalIndex0, proposalIndex1;
    let projectWhereQuery, projectUpdateQuery;
    let whereQuery, updateQuery;
    let newResponses;
    let pastResponses;
    let newSupply;
    let classification, percentage;
    let calculate, commission;
    let pastRemainPrice;
    let newRequestAmount;
    let firstResponse, secondResponse;
    let firstBoo, remainBoo;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }
    desid = project.desid;
    cliid = project.cliid;
    pastSerid = project.service.serid;
    xValue = project.service.xValue;
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });
    feeObject = null;
    for (let i = 0; i < project.proposal.detail.length; i++) {
      if (project.proposal.detail[i].desid === designer.desid) {
        for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
          if (project.proposal.detail[i].fee[j].method === method) {
            feeObject = project.proposal.detail[i].fee[j];
            proposalIndex0 = i;
            proposalIndex1 = j;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    pastFeeObject = await work.getDesignerFee(desid, cliid, pastSerid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    newFeeObject = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    if (newFeeObject.detail[method] === 0) {
      return { error: "unable in this service" };
    } else {
      thisBill = await this.getBillsByQuery({
        $and: [
          { "links.proid": project.proid },
          { "links.cliid": cliid },
          { "links.desid": desid },
          { "links.method": method },
        ]
      }, { selfMongo: MONGOC });
      if (thisBill.length === 0) {
        throw new Error("cannot found bill");
      }
      thisBill = thisBill[0];
      bilid = thisBill.bilid;
      num = 0;
      for (let request of thisBill.requests) {
        if (request.name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
          remain = request;
          remainIndex = num;
        }
        num++;
      }
      totalNum = 0;
      for (let { amount: { consumer } } of remain.items) {
        totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of remain.pay) {
        payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of remain.cancel) {
        cancelNum += amount;
      }

      pastRemainArr = thisBill.requests[remainIndex].items.toNormal();
      for (let i = 0; i < pastRemainArr.length; i++) {
        if (pastRemainArr[i].class === "designerTime") {
          remainItemIndex = i;
        }
      }
      pastRemainPrice = pastRemainArr[remainItemIndex].unit.price;
      whereQuery = { bilid };
      updateQuery = {};

      if (payNum === 0) {

        pastRemainArr[remainItemIndex].unit.price = pastRemainPrice + newFeeObject.detail[method] - pastFeeObject.detail[method];
        pastRemainArr[remainItemIndex].amount.supply = pastRemainArr[remainItemIndex].unit.price * pastRemainArr[remainItemIndex].unit.number;
        pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
        pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
        project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount = pastRemainArr[remainItemIndex].unit.price + Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
        newSupply = project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount;

        updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));

        pastResponses = thisBill.responses.toNormal();
        newResponses = [];
        for (let res of pastResponses) {
          if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            newResponses.push(res);
          }
        }
        updateQuery["responses"] = equalJson(JSON.stringify(newResponses));

        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC });
        await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC });

      } else if (totalNum <= payNum - cancelNum) {

        firstResponse = null;
        secondResponse = null;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
          }
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
          }
        }
        if (firstResponse === null || secondResponse === null) {
          throw new Error("invaild response structure");
        }

        firstBoo = false;
        remainBoo = false;

        totalNumR0 = 0;
        for (let { amount: { pure } } of firstResponse.items) {
          totalNumR0 += pure;
        }
        payNumR0 = 0;
        for (let { amount } of remain.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of remain.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (totalNumR0 <= payNumR0 - cancelNumR0);

        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of remain.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of remain.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (totalNumR1 <= payNumR1 - cancelNumR1);

        newRequestAmount = newFeeObject.detail[method] - pastFeeObject.detail[method];

        if (newRequestAmount <= 0) {
          if (!firstBoo && !remainBoo) {









          } else if (firstBoo && !remainBoo) {










          } else if (firstBoo && remainBoo) {










          }
        } else {
          if (!firstBoo && !remainBoo) {









          } else if (firstBoo && !remainBoo) {










          } else if (firstBoo && remainBoo) {










          }
        }
      } else {



      }

      projectWhereQuery = { proid };
      projectUpdateQuery = {};
      projectUpdateQuery["service.serid"] = serid;
      projectUpdateQuery["service.online"] = !/off/gi.test(method);
      projectUpdateQuery["process.contract.remain.calculation.amount.supply"] = Math.round(newSupply);
      projectUpdateQuery["process.contract.remain.calculation.amount.vat"] = Math.round(newSupply * vatRatio);
      projectUpdateQuery["process.contract.remain.calculation.amount.consumer"] = Math.round(newSupply * (1 + vatRatio));
      classification = designer.information.business.businessInfo.classification.value;
      percentage = designer.information.business.service.cost.percentage;
      if (/일반/gi.test(classification)) {
        calculate = Math.floor((newSupply * 1.1) * (1 - (percentage / 100)));
      } else if (/간이/gi.test(classification)) {
        calculate = Math.floor(newSupply * (1 - (percentage / 100)));
      } else if (/프리/gi.test(classification)) {
        calculate = Math.floor((newSupply - (newSupply * (percentage / 100))) * freeRatio);
      } else {
        calculate = Math.floor((newSupply * 1.1) * (1 - (percentage / 100)));
      }
      projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.totalAmount"] = projectUpdateQuery["process.calculation.payments.first.amount"] * 2;

      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.taxBill = async function (pastDateNumber = 2) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo, fileSystem, shell, shellLink, pythonExecute, requestSystem, decryptoHash, slack_bot, autoComma } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    const collection = "taxBill";
    const map = require(`${this.mapDir}/${collection}.js`);
    await MONGOLOCALC.connect();
    const selfMongo = MONGOLOCALC;
    const today = new Date();
    const yesterday = new Date();
    const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const host = "imap.daum.net";
    const port = 993;
    const id = "hijinijini0311";
    const hash = "d3e48a26c2203b3f57af7489f4357a49c1336757d65d49d31455414c3c84e54e";
    const password = "homeliaison";
    const homeTaxEmail = "hometaxadmin@hometax.go.kr";
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const keywords = "전자세금계산서를 발급하고 발송한 메일";
    const attachmentsKeywords = "Content-Disposition: attachment";
    const dateKeywords = "Date: ";
    const pythonFile = `${process.cwd()}/temp/getMail.py`;
    const zeroAddition = (num) => { return ((num < 10) ? '0' + String(num) : String(num)); }
    const { TaxBill } = map.alive(this.mother);
    class FindIndex extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      findIndexAll(word, regxp = false, between = 0, start = 0) {
        let result;
        result = [];
        if (regxp) {
          for (let i = 0; i < this.length; i++) {
            if ((new RegExp(word, "gi")).test(this[i])) {
              result.push(i);
            }
          }
        } else {
          for (let i = 0; i < this.length; i++) {
            if (this[i] === word) {
              result.push(i);
            }
          }
        }
        result = result.slice(start);
        if (result.length > 1 && between > 0) {
          result.splice(1, between);
        }
        return result;
      }
    }
    let pythonDate, pythonScript;
    let realPwd;
    let result;
    let rawArr;
    let dateIndex;
    let attachmentsIndex;
    let binary, buff, data;
    let html, date;
    let search;
    let res, localScript;
    let newHtml;
    let dom;
    let finalText;
    let textArr, resultObj, tempArr;
    let spotTargets;
    let items, itemStart, itemEnd;
    let num;
    let supplySum, vatSum;
    let tempObj;
    let htmlTong, htmlNum;
    let resultObjTong;
    let startNums;
    let orderArr;
    let minus;
    let tempNum;
    let rows;

    yesterday.setDate(yesterday.getDate() - pastDateNumber);
    realPwd = await decryptoHash(password, hash);
    pythonDate = `${zeroAddition(yesterday.getDate())}-${month[yesterday.getMonth()]}-${String(yesterday.getFullYear())}`;
    pythonScript = ``;
    pythonScript += `from imaplib import IMAP4_SSL\n`;
    pythonScript += `import json\n`;
    pythonScript += `\n`;
    pythonScript += `imap = IMAP4_SSL(host="${host}", port=${String(port)})\n`;
    pythonScript += `\n`;
    pythonScript += `imap.login('${id}', '${realPwd}')\n`;
    pythonScript += `imap.select(mailbox="Inbox")\n`;
    pythonScript += `(typ, data) = imap.search(None, '(FROM "${homeTaxEmail}" SINCE "${pythonDate}")')\n`;
    pythonScript += `\n`;
    pythonScript += `targetMail_numbers = data[0].split()\n`;
    pythonScript += `targetMail_numbers.sort(reverse=True)\n`;
    pythonScript += `\n`;
    pythonScript += `mailTong = []\n`;
    pythonScript += `for num in targetMail_numbers:\n`;
    pythonScript += `    (typ, data) = imap.fetch(num, '(RFC822)')\n`;
    pythonScript += `    mailTong.append(data[0][1].decode('utf8'))\n`;
    pythonScript += `\n`;
    pythonScript += `print(json.dumps(mailTong))\n`;
    pythonScript += `\n`;
    pythonScript += `imap.close()\n`;
    pythonScript += `imap.logout()`;

    if (await fileSystem(`exist`, [ pythonFile ])) {
      shell.exec(`rm -rf ${shellLink(pythonFile)}`);
    }
    await fileSystem(`write`, [ pythonFile, pythonScript ]);

    result = await pythonExecute(pythonFile, [], {});
    html = null;
    htmlTong = [];
    for (let i = 0; i < result.length; i++) {
      if ((new RegExp(keywords, "gi")).test(result[i])) {
        rawArr = result[i].split("\r\n");

        dateIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(dateKeywords, "gi")).test(rawArr[j])) {
            dateIndex = j;
            break;
          }
        }

        attachmentsIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(attachmentsKeywords, "gi")).test(rawArr[j])) {
            attachmentsIndex = j;
            break;
          }
        }

        if (attachmentsIndex === null) {
          throw new Error("not found attachment");
        }

        do {
          attachmentsIndex = attachmentsIndex + 1;
        } while (rawArr[attachmentsIndex].trim() === "" || /filename\=/g.test(rawArr[attachmentsIndex]));

        binary = "";
        while (rawArr[attachmentsIndex].trim() !== "") {
          binary += rawArr[attachmentsIndex].trim();
          attachmentsIndex++;
        }

        buff = Buffer.from(binary, "base64");
        data = buff.toString("utf8");
        html = data;
        date = new Date(rawArr[dateIndex].replace((new RegExp(dateKeywords, "gi"), "").trim()));

        htmlTong.push({ date, html });
      }
    }

    if (html === null || htmlTong.length === 0) {
      console.log("not found");
      return htmlTong;
    }

    console.log("parsing start...");
    resultObjTong = [];
    htmlNum = 0;
    for (let { date, html } of htmlTong) {

      search = [ ...html.matchAll(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi) ];
      res, localScript;
      newHtml;

      localScript = '';
      for (let arr of search) {
        res = await requestSystem(arr[1]);
        localScript += res.data;
        localScript += "\n\n";
      }

      localScript = `<script>\n\n${localScript}\n\n</script>`;

      newHtml = html.replace(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi, '');
      newHtml = newHtml.replace(/\<\/head\>/g, localScript + "</head>").replace(/src\=\"[^\"]+\"/gi, "").replace(/href\=\"[^\"]+\"/gi, "");
      newHtml = newHtml.replace(/\<script defer\>[^\<]+\<\/script\>/gi, '');
      newHtml += `\n\n<script>
      var s = document.getElementById("idCriHeader").value;
      var decodeHeader = CryptoJS.enc.Base64.parse(s);
      var words = decodeHeader.words;
      var decHeader="";
      for(i=0; i < decodeHeader.sigBytes; i++)
      {
        var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        var bite2 = bite ^ 0x6b;
        decHeader = decHeader + String.fromCharCode(bite2);
      }
      decHeader = decHeader.replace(/\\r\\n/gi, '||');
      decHeader = decHeader.replace(/\\n/gi, '||');
      Cri_Header_parser(decHeader);
      Cri_Check_Pwd("2218149759");
      CriDisplayBody();
      </script>`;

      console.log("dom" + String(htmlNum) + " parsing start...");
      dom = new JSDOM(newHtml, { runScripts: "dangerously" });
      finalText = dom.window.document.getElementById('CriMsgPosition').contentWindow.document.querySelector("table").textContent;
      textArr = finalText.split("\n");
      textArr = textArr.filter((i) => { return (i.trim() !== ""); });
      textArr = new FindIndex(textArr.map((i) => { return i.trim(); }));
      spotTargets = [
        { word: "번호", not: "상호", regxp: true, between: 1, start: 1, column: "business" },
        { word: "상호\\(", not: "성명", regxp: true, between: 0, start: 0, column: "company" },
        { word: "성명", not: "사업장", regxp: false, between: 0, start: 0, column: "name" },
        { word: "사업장", not: "업태", regxp: false, between: 0, start: 0, column: "address" },
        { word: "업태", not: "종목", regxp: false, between: 0, start: 0, column: "status" },
        { word: "종목", not: "이메일", regxp: false, between: 0, start: 0, column: "detail" },
        { word: "이메일", not: "이메일", regxp: false, between: 0, start: 0, column: "email" },
      ];
      resultObj = new TaxBill(null);
      resultObj.make(textArr[2], date);

      for (let { word, not, regxp, between, start, column } of spotTargets) {
        tempArr = textArr.findIndexAll(word, regxp, between, start);
        if (tempArr.length < 2) {
          throw new Error("invaild text");
        }
        resultObj.who.from[column] = textArr[tempArr[0] + 1] === not ? "" : textArr[tempArr[0] + 1];
        resultObj.who.to[column] = textArr[tempArr[1] + 1] === not ? "" : textArr[tempArr[1] + 1];
      }

      tempArr = textArr.findIndexAll("비고");
      if (tempArr.length < 2) {
        throw new Error("invaild text");
      }
      itemStart = tempArr[1] + 1;
      tempArr = textArr.findIndexAll("합계금액");
      if (tempArr.length < 1) {
        throw new Error("invaild text");
      }
      itemEnd = tempArr[0] - 1;

      textArr = Array.from(textArr);
      textArr = textArr.slice(itemStart, itemEnd + 1);

      startNums = [];
      for (let i = 0; i < textArr.length; i++) {
        if (i !== textArr.length - 1) {
          if (/^[0-1][0-9]$/.test(textArr[i].trim())) {
            if (/^[0-9][0-9]$/.test(textArr[i + 1].trim())) {
              startNums.push(i);
            }
          }
        }
      }

      orderArr = [];
      for (let i = 0; i < startNums.length; i++) {
        if (i === startNums.length - 1) {
          orderArr.push([ startNums[i], textArr.length ]);
        } else {
          orderArr.push([ startNums[i], startNums[i + 1] ]);
        }
      }

      items = [];
      for (let i = 0; i < orderArr.length; i++) {
        tempArr = [];
        num = 0;
        for (let j = orderArr[i][0]; j < orderArr[i][1]; j++) {
          if (num === 0) {
            if (/^[0-1][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item month error");
            }
          } else if (num === 1) {
            if (/^[0-4][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item date error");
            }
          } else if (num === 2) {

            tempNum = orderArr[i][1] - orderArr[i][0];
            if (tempNum === 9) {
              for (let k = 0; k < 7; k++) {
                tempArr.push(textArr[j + k]);
              }
            } else if (tempNum === 8) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
                tempArr.push("");
              } else {
                tempArr.push("");
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
              }
            } else if (tempNum === 7 || tempNum === 6 || tempNum === 5) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
                tempArr.push("");
              } else {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
              }
            } else if (tempNum === 4) {
              tempArr.push("");
              tempArr.push("");
              tempArr.push(1);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j + 1]);
              tempArr.push("");
            } else {
              throw new Error("item error");
            }
          }
          num++;
        }
        items.push(tempArr);
      }

      supplySum = 0;
      vatSum = 0;

      for (let arr of items) {
        tempObj = {
          month: Number(arr[0].replace(/^0/, '')),
          date: Number(arr[1]),
          name: arr[2],
          ea: arr[3],
          amount: Number(arr[4]),
          unit: Number(arr[5].replace(/[^0-9\-]/g, '')),
          supply: Number(arr[6].replace(/[^0-9\-]/g, '')),
          vat: Number(arr[7].replace(/[^0-9\-]/g, '')),
          etc: arr[8]
        };
        resultObj.items.push(tempObj);
        supplySum += tempObj.supply;
        vatSum += tempObj.vat;
      }

      resultObj.sum.total = supplySum + vatSum;
      resultObj.sum.supply = supplySum;
      resultObj.sum.vat = vatSum;

      console.log(resultObj);
      resultObjTong.push(resultObj);
      htmlNum++;

    }

    resultObjTong.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    for (let json of resultObjTong) {
      rows = await back.mongoRead("taxBill", { id: json.id }, { selfMongo });
      if (rows.length === 0) {
        await back.mongoCreate("taxBill", json, { selfMongo });
        console.log("mongo insert");
        if (json.who.from.business !== "221-81-49759") {
          await slack_bot.chat.postMessage({ text: json.toMessage(), channel: "#701_taxbill" });
        }
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOLOCALC.close();
    await slack_bot.chat.postMessage({ text: "taxBill success : " + JSON.stringify(new Date()), channel: "#error_log" });
  }
}

module.exports = BillMaker;
