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
  "accountTransfer",
  "cashReceipt",
  "taxBill",
  "stylingForm",
  "constructForm",
  "constructInvoice",
];

BillMaker.designerCalculation = function (supply, classification, percentage, client, option) {
  const vatRatio = 0.1;
  const consumerRatio = 1 + vatRatio;
  const freeRatio = 0.967;
  const pyeongStandard = 15;
  const pyeongMinAmount = 130 * (10000);
  const pyeongMinConst = 0.5;
  const minimumPercentage = 20;
  const initialPyeong = 34;
  const classRegExpCase = [ "일반", "간이", "프리" ];
  const moneyCuttingConst = 10;
  let thisMode;
  let pyeong;
  let calculate, commission;

  if (typeof supply === "number" && typeof classification === "string" && typeof percentage === "number" && (typeof client === "object" || client === null) && typeof option === "object") {

    // case 0 pass
    thisMode = 0;

  } else if (typeof supply === "number" && typeof classification === "object" && typeof percentage === "number" && (typeof client === "object" || client === null) && typeof option === "object") {

    if (classification.value !== undefined) {
      classification = classification.value;
      if (typeof classification === "string") {
        // case 0 pass
        thisMode = 0;
      } else {
        throw new Error("invaild input");
      }
    } else {
      throw new Error("invaild input");
    }

  } else if (typeof supply === "number" && typeof classification === "object" && (typeof percentage === "object" || percentage === null) && typeof client === "object" && option === undefined) {
    if (classification.proid !== undefined) {

      // case 1 project, client
      option = client;
      client = percentage;
      percentage = classification.process.calculation.percentage;
      classification = classification.process.calculation.method;
      thisMode = 1;

    } else if (classification.desid !== undefined) {

      // case 2 designer, client
      option = client;
      client = percentage;
      percentage = classification.information.business.service.cost.percentage;
      classification = classification.information.business.businessInfo.classification;
      thisMode = 2;

    } else {
      throw new Error("invaild input");
    }
  } else if (typeof supply === "object" && (typeof classification === "object" || classification === null) && typeof percentage === "object" && client === undefined && option === undefined) {

    // case 3 project, client, no supply
    option = percentage;
    client = classification;
    percentage = supply.process.calculation.percentage;
    classification = supply.process.calculation.method;
    supply = supply.process.contract.remain.calculation.amount.supply;
    thisMode = 3;

  } else {
    throw new Error("invaild input");
  }

  if (typeof classification === "object" && classification.value !== undefined) {
    classification = classification.value;
  }

  if (typeof supply !== "number" || typeof classification !== "string" || typeof percentage !== "number" || typeof option !== "object") {
    throw new Error("invaild input");
  }

  pyeong = null;
  if (client === null) {
    pyeong = null;
  } else if (typeof client === "object" && !Array.isArray(client)) {
    if (client.cliid !== undefined && client.name !== undefined && client.requests !== undefined) {
      if (Array.isArray(client.requests)) {
        if (client.requests.length !== 0) {
          pyeong = [];
          for (let r of client.requests) {
            pyeong.push(r.request.space.pyeong);
          }
        } else {
          throw new Error("invaild client input");
        }
      } else {
        throw new Error("invaild client input");
      }
    } else {
      throw new Error("invaild client input");
    }
  } else {
    throw new Error("invaild client input");
  }
  if (pyeong === null) {
    pyeong = initialPyeong;
  }
  if (typeof pyeong !== "number" && !Array.isArray(pyeong)) {
    throw new Error("invaild pyeong input");
  }
  if (!(new RegExp(classRegExpCase[0], "gi")).test(classification) && !(new RegExp(classRegExpCase[1], "gi")).test(classification) && !(new RegExp(classRegExpCase[2], "gi")).test(classification)) {
    throw new Error("invaild classification : " + classification);
  }
  if (Array.isArray(pyeong)) {
    if (pyeong.length === 0) {
      throw new Error("invaild pyeong");
    }
    if (!pyeong.every((n) => { return (typeof n === "number"); })) {
      if (pyeong.every((obj) => { return (typeof obj === "object"); })) {
        pyeong = pyeong.map((obj) => { return obj.value; });
        if (!pyeong.every((n) => { return (typeof n === "number"); })) {
          throw new Error("invaild pyeong");
        }
      } else {
        throw new Error("invaild pyeong");
      }
    }
    if (pyeong.length === 1) {
      pyeong = pyeong[0];
      if (typeof pyeong !== "number") {
        throw new Error("invaild pyeong");
      }
    }
  }

  if (Array.isArray(pyeong)) {
    if (pyeong.every((n) => { return n >= pyeongStandard; })) {
      pyeong = pyeong[0];
    } else {
      if (supply < pyeongMinAmount) {
        pyeong = pyeong.find((n) => { return n < pyeongStandard });
      } else {
        if (pyeong.every((n) => { return n < pyeongStandard; })) {
          pyeong = pyeong[0];
        } else {
          if (supply <= pyeongMinAmount * (1 + pyeongMinConst)) {
            pyeong = pyeong[0];
          } else {
            pyeong = pyeong.find((n) => { return n >= pyeongStandard });
          }
        }
      }
    }
  }

  if (option.forcePercentage !== true) {
    if (pyeong < pyeongStandard) {
      percentage = minimumPercentage;
    }
    if (percentage <= minimumPercentage) {
      percentage = minimumPercentage;
    }
  }

  if ((new RegExp(classRegExpCase[0], "gi")).test(classification)) {
    calculate = Math.floor((supply * consumerRatio) * (1 - (percentage / 100)));
  } else if ((new RegExp(classRegExpCase[1], "gi")).test(classification)) {
    calculate = Math.floor(supply * (1 - (percentage / 100)));
  } else if ((new RegExp(classRegExpCase[2], "gi")).test(classification)) {
    calculate = Math.floor((supply - (supply * (percentage / 100))) * freeRatio);
  }
  calculate = Math.floor(calculate / moneyCuttingConst) * moneyCuttingConst;

  commission = supply * (percentage / 100);
  commission = Math.floor(commission / moneyCuttingConst) * moneyCuttingConst;

  if (option.toArray === true) {
    return [ calculate, commission ];
  } else {
    return { calculate, commission };
  }
}

BillMaker.prototype.designerCalculation = function (supply, classification, percentage, client, option) {
  return BillMaker.designerCalculation(supply, classification, percentage, client, option);
}

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
        item: (feeObject, subObj) => {
          let { project, vatRatio, contractAmount } = subObj;
          if (project.process.contract.first.calculation.amount !== 0) {
            contractAmount = project.process.contract.first.calculation.amount * (1 / (1 + vatRatio));
          }
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
          "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.",
          "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다.",
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
        item: (feeObject, subObj) => {
          let { project, vatRatio, contractAmount } = subObj;
          let finalNumber;
          if (project.process.contract.first.calculation.amount !== 0) {
            contractAmount = project.process.contract.first.calculation.amount * (1 / (1 + vatRatio));
          }
          if (project.process.contract.remain.calculation.amount.supply !== 0) {
            finalNumber = project.process.contract.remain.calculation.amount.supply - contractAmount;
          } else {
            finalNumber = feeObject.amount - contractAmount;
          }
          return [
            [ "designerTime", finalNumber ]
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
        item: (feeObject, subObj) => {
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
      },
      constructFirst: {
        name: "시공 계약금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructTimeFirst", amountObject.first ]
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
          "계약금은 전체 시공 금액에 포함됩니다.",
          "계약금을 입금하시면 해당 시공사에게 고객님 정보가 전달되며, 현장 미팅을 할 수 있습니다.",
        ]
      },
      constructStart: {
        name: "시공 착수금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructTimeStart", amountObject.start ]
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
          "착수금은 공사를 시작하기 위한 금액입니다. 전체 시공 금액에 포함됩니다.",
          "착수금 입금하시면 본격적인 시공이 진행됩니다.",
        ]
      },
      constructMiddle: {
        name: "시공 중도금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructTimeMiddle", amountObject.middle ]
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
          "중도금 공사가 한창 진행하고 있는 중간에 내시는 금액입니다. 전체 시공 금액에 포함됩니다.",
          "중도금을 입금하시면 시공이 다음 단계로 진행됩니다.",
        ]
      },
      constructRemain: {
        name: "시공 잔금",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructTimeRemain", amountObject.remain ]
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
          "잔금은 공사가 마무리된 후, 내시는 금액입니다. 전체 시공 금액에 포함됩니다.",
          "잔금을 내시면 공사가 마무리되고, 홈스타일링 과정상 시공 다음 단계가 진행됩니다.",
        ]
      },
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
          let { project } = subObj;
          let finalNumber;
          if (project.process.contract.remain.calculation.amount.supply !== 0) {
            finalNumber = project.process.contract.remain.calculation.amount.supply;
          } else {
            finalNumber = feeObject.amount;
          }
          return [
            [ "designerFeeFirst", finalNumber ]
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
          "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
          "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
          "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
          "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다.",
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
          let { project } = subObj;
          let finalNumber;
          if (project.process.contract.remain.calculation.amount.supply !== 0) {
            finalNumber = project.process.contract.remain.calculation.amount.supply;
          } else {
            finalNumber = feeObject.amount;
          }
          return [
            [ "designerFeeRemain", finalNumber ]
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
          "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
          "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
          "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
          "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다.",
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
      },
      firstConstructFee: {
        name: "시공 계약금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructExpenses", amountObject.first ]
          ];
        },
        target: (client, designer, project, method, subObj) => {
          const { builder } = subObj;
          return {
            id: builder.buiid,
            name: builder.builder,
            phone: builder.information.phone,
            email: builder.information.email,
          };
        },
        comments: []
      },
      startConstructFee: {
        name: "시공 착수금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructExpenses", amountObject.start ]
          ];
        },
        target: (client, designer, project, method, subObj) => {
          const { builder } = subObj;
          return {
            id: builder.buiid,
            name: builder.builder,
            phone: builder.information.phone,
            email: builder.information.email,
          };
        },
        comments: []
      },
      middleConstructFee: {
        name: "시공 중도금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructExpenses", amountObject.middle ]
          ];
        },
        target: (client, designer, project, method, subObj) => {
          const { builder } = subObj;
          return {
            id: builder.buiid,
            name: builder.builder,
            phone: builder.information.phone,
            email: builder.information.email,
          };
        },
        comments: []
      },
      remainConstructFee: {
        name: "시공 잔금 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "constructExpenses", amountObject.remain ]
          ];
        },
        target: (client, designer, project, method, subObj) => {
          const { builder } = subObj;
          return {
            id: builder.buiid,
            name: builder.builder,
            phone: builder.information.phone,
            email: builder.information.email,
          };
        },
        comments: []
      },
      generalConstructFee: {
        name: "홈리에종 시공 정산",
        info: (client, designer, project, method, subObj = {}) => {
          let info;
          info = [];
          info.push({ address: client.requests[0].request.space.address.value });
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });
          return info;
        },
        item: (amountObject, subObj) => {
          return [
            [ "generalExpenses", amountObject.amount ]
          ];
        },
        target: (client, designer, project, method, subObj) => {
          let name;
          if (subObj === null) {
            name = "";
          } else {
            name = subObj.name;
          }
          return {
            id: "",
            name,
            phone: "",
            email: "",
          };
        },
        comments: []
      },
    },
    goods: {
      designerTime: {
        id: "_idte",
        name: "디자인비",
        description: "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
        ea: null,
        number: (method, distance, subObj) => { return 1; },
        amount: (method, amount, distance, subObj) => { return amount; },
        comments: []
      },
      travelExpenses: {
        id: "_ites",
        name: "출장비",
        description: "디자이너가 출장시 발생되는 왕복 비용입니다.",
        ea: "회",
        number: (method, distance, subObj) => { return distance.number; },
        amount: (method, amount, distance, subObj) => { return distance.amount; },
        comments: [
          "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
          "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.",
          "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
          "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.",
        ]
      },
      constructTimeFirst: {
        id: "_ictf",
        name: "시공 계약금",
        description: "견적에 따른 인테리어 공사를 진행하는 비용 중 계약금입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => { return amount; },
        comments: []
      },
      constructTimeStart: {
        id: "_icts",
        name: "시공 착수금",
        description: "견적에 따른 인테리어 공사를 진행하는 비용 중 착수금입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => { return amount; },
        comments: []
      },
      constructTimeMiddle: {
        id: "_ictm",
        name: "시공 중도금",
        description: "견적에 따른 인테리어 공사를 진행하는 비용 중 중도금입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => { return amount; },
        comments: []
      },
      constructTimeRemain: {
        id: "_ictr",
        name: "시공 잔금",
        description: "견적에 따른 인테리어 공사를 진행하는 비용 중 잔금입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => { return amount; },
        comments: []
      },
    },
    calculation: {
      designerFeeFirst: {
        id: "_edff",
        name: "디자인비 선금",
        description: "디자인 비용에 대한 선금입니다.",
        ea: null,
        number: (method, distance, subObj) => { return 1; },
        amount: (method, amount, distance, subObj) => {
          const { client, designer, freeRatio } = subObj;
          let classification, percentage, calculate, commission;
          classification = designer.information.business.businessInfo.classification;
          percentage = designer.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true });
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission: Math.floor((commission / 2) / 10) * 10 };
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
          const { client, designer, freeRatio } = subObj;
          let classification, percentage, calculate, commission;
          classification = designer.information.business.businessInfo.classification;
          percentage = designer.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true });
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission: Math.floor((commission / 2) / 10) * 10 };
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
          const { designer, freeRatio, distancePercentage } = subObj;
          let classification, calculate, commission, distanceFinalAmount;
          if (distance.number !== 0) {
            distanceFinalAmount = distance.amount * distance.number;
            classification = designer.information.business.businessInfo.classification;
            [ calculate, commission ] = BillMaker.designerCalculation(distanceFinalAmount, classification, distancePercentage, null, { toArray: true, forcePercentage: true });
            calculate = Math.floor(calculate / distance.number);
          } else {
            distanceFinalAmount = distance.amount * 1;
            classification = designer.information.business.businessInfo.classification;
            [ calculate, commission ] = BillMaker.designerCalculation(distanceFinalAmount, classification, distancePercentage, null, { toArray: true, forcePercentage: true });
            calculate = Math.floor(calculate / 1);
          }
          return { amount: calculate, commission };
        },
        comments: [
          "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
          "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
          "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
          "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.",
        ]
      },
      constructExpenses: {
        id: "_eces",
        name: "시공 비용",
        description: "시공 비용입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => {
          const { client, designer, freeRatio, builder } = subObj;
          let classification, percentage, calculate, commission;
          classification = builder.information.business.businessInfo.classification;
          percentage = builder.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true, forcePercentage: true });
          return { amount: Math.floor((calculate / 1) / 10) * 10, commission: Math.floor((commission / 1) / 10) * 10 };
        },
        comments: []
      },
      generalExpenses: {
        id: "_ecgs",
        name: "시공 비용",
        description: "시공 비용입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => {
          return { amount, commission: 0 };
        },
        comments: []
      },
    },
    etc: {
      contractAmount: 300000,
      vatRatio: 0.1,
      freeRatio: 0.967,
      distancePercentage: 7,
      designerCancel: {
        id: "_edcl",
        class: "designerCancel",
        name: "디자이너 1회 미팅 비용",
        description: "취소된 디자이너의 1회 미팅에 대한 비용입니다.",
        unit: {
          ea: null,
          price: 100000,
          number: 1
        },
        amount: {
          pure: 100000,
          commission: 220000,
        },
        comments: [
          "디자이너 변경으로 인해 미팅을 하신 프로젝트가 취소되었습니다.",
          "1회 미팅에 대한 금액을 정산해드리는 비용입니다."
        ],
        total: 330000,
      }
    }
  }
};

BillMaker.returnBankCode = function (name, mode = "code") {
  if (typeof name !== "string") {
    throw new Error("invaild input");
  }
  name = name.trim().replace(/은행/gi, '').trim().replace(/ /gi, '').trim();
  const bankMatrix = [
    [ "농협중앙회", "11" ],
    [ "단위농협", "12" ],
    [ "축협중앙회", "16" ],
    [ "우리", "20" ],
    [ "조흥", "21" ],
    [ "상업", "22" ],
    [ "SC제일", "23" ],
    [ "한일", "24" ],
    [ "서울", "25" ],
    [ "신한", "88" ],
    [ "구신한", "26" ],
    [ "한미", "27" ],
    [ "대구", "31" ],
    [ "부산", "32" ],
    [ "광주", "34" ],
    [ "제주", "35" ],
    [ "전북", "37" ],
    [ "강원", "38" ],
    [ "경남", "39" ],
    [ "비씨카드", "41" ],
    [ "새마을금고", "45" ],
    [ "신협", "48" ],
    [ "상호저축", "50" ],
    [ "한국씨티", "53" ],
    [ "홍콩상하이", "54" ],
    [ "도이치", "55" ],
    [ "ABN암로", "56" ],
    [ "JP모건", "57" ],
    [ "미쓰비시도쿄", "59" ],
    [ "BOA", "60" ],
    [ "산림조합", "64" ],
    [ "신안상호저축", "70" ],
    [ "우체국", "71" ],
    [ "하나", "81" ],
    [ "평화", "83" ],
    [ "신세계", "87" ],
    [ "케이뱅크", "89" ],
    [ "카카오뱅크", "90" ],
    [ "네이버포인트", "91" ],
    [ "토스뱅크", "92" ],
    [ "토스머니", "93" ],
    [ "SSG머니", "94" ],
    [ "엘포인트", "96" ],
    [ "카카오머니", "97" ],
    [ "페이코", "98" ],
    [ "한국산업", "02" ],
    [ "기업", "03" ],
    [ "국민", "04" ],
    [ "외환", "05" ],
    [ "주택", "06" ],
    [ "수협중앙회", "07" ],
    [ "유안타증권", "D1" ],
    [ "현대증권", "D2" ],
    [ "미래에셋증권", "D3" ],
    [ "한국투자증권", "D4" ],
    [ "우리투자증권", "D5" ],
    [ "하이투자증권", "D6" ],
    [ "HMC투자증권", "D7" ],
    [ "SK증권", "D8" ],
    [ "대신증권", "D9" ],
    [ "하나대투증권", "DA" ],
    [ "굿모닝신한증권", "DB" ],
    [ "동부증권", "DC" ],
    [ "유진투자증권", "DD" ],
    [ "메리츠증권", "DE" ],
    [ "신영증권", "DF" ],
    [ "대우증권", "DG" ],
    [ "삼성증권", "DH" ],
    [ "교보증권", "DI" ],
    [ "키움증권", "DJ" ],
    [ "이트레이드", "DK" ],
    [ "솔로몬증권", "DL" ],
    [ "한화증권", "DM" ],
    [ "NH증권", "DN" ],
    [ "부국증권", "DO" ],
    [ "LIG증권", "DP" ],
    [ "뱅크월렛", "BW" ]
  ];
  let result;
  if (mode === "code") {
    result = "00";
    for (let arr of bankMatrix) {
      if (name === arr[0]) {
        result = arr[1];
        break;
      }
    }
    return result;
  } else if (mode === "matrix") {
    return bankMatrix;
  }
}

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
    if (collection === "generalBill") {
      throw new Error("generalBill must use no collection name use");
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

BillMaker.prototype.returnDummies = function (collection, subject) {
  const instance = this;
  const map = require(`${this.mapDir}/${collection}.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
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

    if (option.forceDesid !== undefined) {
      targetProposals = [];
      for (let proposal of project.proposal.detail) {
        if (proposal.desid === option.forceDesid) {
          targetProposals.push(proposal);
        }
      }
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
          thisBill = temp[0];
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

        if (!updateMode) {

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

BillMaker.prototype.createInvoice = async function (updateQuery = {}, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  const collection = "constructInvoice";
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
      pastId = "v2111_aa01s";
    } else {
      pastId = rows[0].invid;
    }
    dummy.invid = this.back.idMaker(pastId, false);
    newId = dummy.invid;

    await MONGOC.db(`miro81`).collection(collection).insertOne(dummy);
    if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
      await MONGOC.db(`miro81`).collection(collection).updateOne({ invid: newId }, { $set: updateQuery });
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return newId;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.requestInvoice = async function (buiid, proid, contents, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof proid !== "string" || typeof buiid !== "string" || (typeof contents !== "object" && typeof contents !== "string")) {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, uniqueValue } = this.mother;
  const organizer = {
    name: "홈리에종",
    businessNumber: "221-81-49759",
    phone: "02-2039-2252",
    address: "서울특별시 성동구 성수이로22길 37 4층 408A호",
  };
  const requestIdConst = "R";
  const itemIdConst = "I";
  const itemDetailConst = "D";
  const collection = "constructInvoice";
  const map = require(`${this.mapDir}/${collection}.js`);
  try {
    if (typeof contents === "string") {
      contents = await this.matrixToRequest(contents);
    }
    const { commission: { supply, vat, consumer }, items, info, comments } = contents;
    if (!Array.isArray(items)) {
      throw new Error("invaild object");
    }
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let mode;
    let rows;
    let invid;
    let target;
    let thisInvoice;
    let thisProject, thisClient, thisDesigner;
    let requestDummy;
    let itemDummy;
    let detailDummy;
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

    if (!/^u[0-9][0-9][0-9][0-9]\_[a-z][a-z][0-9][0-9][a-z]$/.test(buiid)) {
      throw new Error("invaild input 3");
    }
    if (/^p[0-9][0-9][0-9][0-9]\_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
      rows = await this.readBill(collection, { "links.proid": proid }, { selfMongo: MONGOC });
      if (rows.length === 0) {
        mode = "create";
      } else {
        [ thisInvoice ] = rows;
        mode = "update";
        invid = thisInvoice.invid;
      }
    } else if (/^v[0-9][0-9][0-9][0-9]\_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
      mode = "update";
      invid = proid;
      rows = await this.readBill(collection, { invid }, { selfMongo: MONGOC });
      if (rows.length === 0) {
        throw new Error("invaild invid");
      }
      [ thisInvoice ] = rows;
      proid = thisInvoice.links.proid;
    } else {
      throw new Error("invaild input 3");
    }

    thisProject = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    thisClient = await back.getClientById(thisProject.cliid, { selfMongo: MONGOCOREC });
    thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: MONGOCOREC });

    if (thisProject === null || thisClient === null || thisDesigner === null) {
      throw new Error("invaild project");
    }

    if (mode === "create") {
      invid = await this.createInvoice({
        "title": `${thisClient.name}C ${thisDesigner.designer}D 시공 견적`,
        "date": new Date(),
        "organizer": organizer,
        "links.buiid": buiid,
        "links.proid": proid,
        "links.cliid": thisClient.cliid,
        "links.desid": thisDesigner.desid,
      }, { selfMongo: MONGOC });
      [ thisInvoice ] = await this.readBill(collection, { invid }, { selfMongo: MONGOC });
    }

    requestDummy = map.sub("requests");

    requestDummy.id = requestIdConst + uniqueValue("hex");
    requestDummy.date = new Date();
    requestDummy.commission.supply = supply;
    requestDummy.commission.vat = vat;
    requestDummy.commission.consumer = consumer;

    for (let { name, detail } of items) {
      itemDummy = map.sub("items");
      itemDummy.id = itemIdConst + uniqueValue("hex");
      itemDummy.name = name;

      for (let { name, description, info, unit: { ea, amount: { supply, vat, consumer }, number } } of detail) {
        detailDummy = map.sub("detail");
        detailDummy.id = itemDetailConst + uniqueValue("hex");
        detailDummy.name = name;
        detailDummy.description = description;
        detailDummy.info = info;
        detailDummy.unit.ea = ea;
        detailDummy.unit.amount.supply = supply;
        detailDummy.unit.amount.vat = vat;
        detailDummy.unit.amount.consumer = consumer;
        detailDummy.unit.number = number;
        itemDummy.detail.push(detailDummy);
      }

      requestDummy.items.push(itemDummy);
    }

    requestDummy.info = info;
    requestDummy.comments = comments;

    thisInvoice.requests.unshift(requestDummy);

    whereQuery = { invid };
    updateQuery = {};
    updateQuery["requests"] = thisInvoice.requests;

    await MONGOC.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return thisInvoice;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.matrixToRequest = async function (file) {
  const instance = this;
  const ExcelReader = require(`${process.cwd()}/apps/excelReader/excelReader.js`);
  const { uniqueValue } = this.mother;
  try {
    const requestIdConst = "R";
    const collection = "constructInvoice";
    const map = require(`${this.mapDir}/${collection}.js`);
    const excel = new ExcelReader(this.mother, this.back, this.address);
    const commissionPercentage = 10;
    let matrix;
    let startIndex, itemStartIndex;
    let tempArr, tempArr2;
    let tong, tong2, tong3;
    let commentIndex, commentArr;
    let tempObj, tempObj2, title;
    let indexArr;
    let sum;
    let consumer, vat, supply;

    if (typeof file === "string") {
      matrix = (await excel.fileToMatrix(file, "내역서")).filter((arr) => {
        return arr.some((i) => { return i !== null });
      });
    } else if (Array.isArray(file)) {
      matrix = file.filter((arr) => {
        return arr.some((i) => { return i !== null });
      });
    } else {
      throw new Error("invaild input");
    }

    startIndex = matrix.map((arr) => {
      return arr.map((i) => { return String(i).replace(/ /gi, '') }).join('');
    }).findIndex((str) => {
      return /품명/gi.test(str) && /단위/gi.test(str) && /단가/gi.test(str) && /금액/gi.test(str);
    });

    matrix = matrix.slice(startIndex + 1);
    matrix = matrix.filter((arr) => {
      return !(arr.map((i) => { return String(i).replace(/ /gi, '').trim() }).some((str) => { return str === "소계" || str === "합계" || str === "계" }) && arr.some((i) => { return typeof i === "number" }));
    });
    commentIndex = matrix.findIndex((arr) => {
      return /참고사항/gi.test(arr.map((s) => { return String(s).replace(/ /g, '') }).join('')) && arr[0] === null && arr[arr.length - 1] === null;
    });
    commentArr = matrix.slice(commentIndex);
    matrix = matrix.slice(0, commentIndex);

    tong = [];
    tempArr = null;
    for (let arr of matrix) {
      if (arr.length === 0) {
        throw new Error("invaild matrix 0");
      }

      if (typeof arr[0] === "string") {
        arr[0] = arr[0].trim().replace(/[^0-9]/gi, '');
        if (arr[0] === '' || Number.isNaN(Number(arr[0]))) {
          arr[0] = null;
        } else {
          arr[0] = String(Number(arr[0]));
        }
      } else if (typeof arr[0] === "number") {
        arr[0] = String(arr[0]);
      } else {
        arr[0] = null;
      }

      if (typeof arr[0] === "string" && /^[0-9]/gi.test(arr[0])) {
        if (tempArr !== null) {
          tong.push(tempArr);
        }
        tempArr = [];
      }

      tempArr.push(arr);
    }
    tong.push(tempArr);

    tong2 = [];
    for (let m of tong) {
      if (m.length === 0) {
        throw new Error("invaild tong 0");
      }
      tempObj = {};
      tempObj.name = m[0].find((i) => { return typeof i === "string" && !/^[0-9]+$/.test(i) });
      m = m.slice(1);
      indexArr = m.map((arr) => { return arr.findIndex((j) => { return j !== null }) });

      indexArr.sort((a, b) => { return a - b; });
      itemStartIndex = indexArr[0];

      tempObj.detail = [];
      for (let i = 0; i < m.length; i++) {
        tempObj2 = {};
        tempArr2 = m[i].slice(itemStartIndex);
        if (tempArr2.length < 7) {
          throw new Error("invaild tong 1");
        }
        tempObj2.name = tempArr2[0];
        tempObj2.description = typeof tempArr2[6] === "string" ? tempArr2[6] : "";
        tempObj2.info = [];
        tempObj2.unit = {};
        tempObj2.unit.ea = tempArr2[2];

        tempObj2.unit.amount = {};
        consumer = Math.floor(Number(tempArr2[3]));
        vat = Math.floor((consumer / 11) / 10) * 10;
        supply = Math.floor(consumer - vat);
        tempObj2.unit.amount.supply = supply;
        tempObj2.unit.amount.vat = vat;
        tempObj2.unit.amount.consumer = consumer;
        tempObj2.unit.number = typeof tempArr2[1] !== "number" ? (Number.isNaN(Number(tempArr2[1])) ? 0 : Math.floor(Number(tempArr2[1]))) : Math.floor(tempArr2[1]);

        tempObj.detail.push(tempObj2);
      }
      tong2.push(tempObj);
    }

    commentArr = commentArr.map((arr) => {
      return arr.filter((s) => { return s !== null });
    }).map((arr) => {
      if (arr.length !== 0) {
        if (arr.length > 1) {
          return arr[arr.length - 1];
        } else {
          return arr[0];
        }
      } else {
        return '';
      }
    }).filter((str) => {
      return str !== '';
    }).map((str) => {
      return str.replace(/^[0-9]+\. /gi, '');
    })

    tong3 = map.sub("requests");
    tong3.id = requestIdConst + uniqueValue("hex");
    tong3.items = tong2;
    tong3.comments = commentArr;

    sum = 0;
    for (let { detail } of tong2) {
      for (let { unit: { amount: { consumer }, number } } of detail) {
        sum += consumer * number;
      }
    }

    consumer = Math.floor(sum * (commissionPercentage / 100));
    vat = Math.floor((consumer / 11) / 10) * 10;
    supply = Math.floor(consumer - vat);
    tong3.commission = { supply, vat, consumer };

    return tong3;
  } catch (e) {
    console.log(e);
    return null;
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
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;
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
    let itemSupply, itemVat, itemConsumer;

    if (stylingRequests[requestKey] === undefined) {
      throw new Error("invaild request key");
    }
    thisRequest = stylingRequests[requestKey];

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


    if (typeof option.customAmount !== "object" || option.customAmount === null) {

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
        if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
          feeObject = option.feeObject;
        } else {
          throw new Error("cannot find fee object");
        }
      }
      distance = feeObject.distance;

      itemMatrix = thisRequest.item(feeObject, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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

        if (option.consumerMode !== true) {
          itemSupply = Math.round(item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
          itemVat = Math.round(itemSupply * vatRatio);
          itemConsumer = itemSupply + itemVat;
        } else {
          itemConsumer = Math.round(item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
          itemVat = Math.floor(itemConsumer / ((1 + vatRatio) * 10));
          itemSupply = itemConsumer - itemVat;
        }

        itemFactor.unit.price = itemSupply;

        if (typeof option.number === "object" && option.number !== null) {
          if (typeof option.number[property] === "number") {
            itemFactor.unit.number = option.number[property];
          } else {
            itemFactor.unit.number = Math.floor(item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
          }
        } else {
          itemFactor.unit.number = Math.floor(item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
        }

        itemFactor.amount.supply = itemSupply * itemFactor.unit.number;
        itemFactor.amount.vat = itemVat * itemFactor.unit.number;
        itemFactor.amount.consumer = itemConsumer * itemFactor.unit.number;

        requestObject.items.push(equalJson(JSON.stringify(itemFactor)));
        commentsArr = commentsArr.concat(item.comments);
      }

    } else {

      itemMatrix = thisRequest.item(option.customAmount, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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

        if (option.consumerMode !== true) {
          itemSupply = Math.round(item.amount(thisAmount, { client, designer, project, contractAmount, vatRatio, freeRatio }));
          itemVat = Math.round(itemSupply * vatRatio);
          itemConsumer = itemSupply + itemVat;
        } else {
          itemConsumer = Math.round(item.amount(thisAmount, { client, designer, project, contractAmount, vatRatio, freeRatio }));
          itemVat = Math.floor(itemConsumer / ((1 + vatRatio) * 10));
          itemSupply = itemConsumer - itemVat;
        }

        itemFactor.unit.price = itemSupply;

        if (typeof option.number === "object" && option.number !== null) {
          if (typeof option.number[property] === "number") {
            itemFactor.unit.number = option.number[property];
          } else {
            itemFactor.unit.number = Math.floor(item.number({ client, designer, project, contractAmount, vatRatio, freeRatio }));
          }
        } else {
          itemFactor.unit.number = Math.floor(item.number({ client, designer, project, contractAmount, vatRatio, freeRatio }));
        }

        itemFactor.amount.supply = itemSupply * itemFactor.unit.number;
        itemFactor.amount.vat = itemVat * itemFactor.unit.number;
        itemFactor.amount.consumer = itemConsumer * itemFactor.unit.number;

        requestObject.items.push(equalJson(JSON.stringify(itemFactor)));
        commentsArr = commentsArr.concat(item.comments);
      }

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
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;
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
    let optionObject;

    if (stylingResponses[responseKey] === undefined) {
      throw new Error("invaild response key");
    }
    thisResponse = stylingResponses[responseKey];

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


    if (typeof option.customAmount !== "object" || option.customAmount === null) {

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
        if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
          feeObject = option.feeObject;
        } else {
          throw new Error("cannot find fee object");
        }
      }
      distance = feeObject.distance;

      itemMatrix = thisResponse.item(feeObject, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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

        if (option.consumerMode === true) {
          thisAmount = thisAmount - Math.floor(thisAmount * (1 / ((1 + vatRatio) * 10)));
        }

        tempObject = item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
        tempAmount = tempObject.amount;
        tempCommission = tempObject.commission;
        itemFactor.unit.price = tempAmount;
        if (typeof option.number === "object" && option.number !== null) {
          if (typeof option.number[property] === "number") {
            itemFactor.unit.number = option.number[property];
          } else {
            itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          }
        } else {
          itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
        }
        if (property === "travelExpenses") {
          tempCommission = (tempCommission / distance.number) * itemFactor.unit.number;
        }
        itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
        itemFactor.amount.commission = tempCommission;
        responseObject.items.push(equalJson(JSON.stringify(itemFactor)));
        commentsArr = commentsArr.concat(item.comments);
      }

    } else {

      itemMatrix = thisResponse.item(option.customAmount, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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

        if (option.consumerMode === true) {
          thisAmount = thisAmount - Math.floor(thisAmount * (1 / ((1 + vatRatio) * 10)));
        }

        if (typeof option.customSub === "object" && option.customSub !== null) {
          optionObject = { client, designer, project, contractAmount, vatRatio, freeRatio, ...option.customSub };
        } else {
          optionObject = { client, designer, project, contractAmount, vatRatio, freeRatio };
        }

        tempObject = item.amount(thisAmount, optionObject);
        tempAmount = tempObject.amount;
        tempCommission = tempObject.commission;
        itemFactor.unit.price = tempAmount;
        if (typeof option.number === "object" && option.number !== null) {
          if (typeof option.number[property] === "number") {
            itemFactor.unit.number = option.number[property];
          } else {
            itemFactor.unit.number = item.number(optionObject);
          }
        } else {
          itemFactor.unit.number = item.number(optionObject);
        }
        itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
        itemFactor.amount.commission = tempCommission;
        responseObject.items.push(equalJson(JSON.stringify(itemFactor)));
        commentsArr = commentsArr.concat(item.comments);
      }

    }

    responseObject.name = thisResponse.name;
    for (let c of commentsArr) {
      responseObject.comments.push(c);
    }

    responseObject.target = thisResponse.target(client, designer, project, method, typeof option.customSub === "object" ? option.customSub : null);

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
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;
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
      if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
        feeObject = option.feeObject;
      } else {
        throw new Error("cannot find fee object");
      }
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
      itemFactor.unit.price = Math.round(item.amount(method, amount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
      if (typeof option.number === "number") {
        itemFactor.unit.number = option.number;
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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
      tempObject = item.amount(method, amount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
      tempAmount = tempObject.amount;
      tempCommission = tempObject.commission;
      itemFactor.unit.price = tempAmount;
      if (typeof option.number === "number") {
        itemFactor.unit.number = option.number;
      } else {
        itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
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

BillMaker.prototype.passiveSync = async function (bilid, clientName, requestNumber, amount, payDate, method, proof, option = { selfMongo: null }) {
  if (typeof bilid !== "string" || typeof clientName !== "string") {
    throw new Error("invaild input");
  }
  if (typeof requestNumber !== "number" || typeof amount !== "number") {
    throw new Error("invaild input");
  }
  if (!(payDate instanceof Date)) {
    throw new Error("invaild input");
  }
  if (typeof method !== "string" || typeof proof !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { mongo, mongopythoninfo, equalJson } = this.mother;
  const address = this.address;
  let selfMongo, selfBoo;
  if (option.selfMongo === undefined || option.selfMongo === null) {
    selfMongo = new mongo(mongopythoninfo, { useUnifiedTopology: true });
    selfBoo = false;
  } else {
    selfMongo = option.selfMongo;
    selfBoo = true;
  }
  try {
    if (!selfBoo){
      await selfMongo.connect();
    }

    let whereQuery, updateQuery;
    let itemArr, payArr, cancelArr;
    let infoArr;
    let payObject;
    let proofs;
    let thisBill;

    thisBill = await this.getBillById(bilid, { selfMongo });

    whereQuery = { bilid };
    updateQuery = {};

    infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
    infoArr.unshift({
      data: {
        "mid": address.officeinfo.inicis.mid,
        "tid": "",
        "TotPrice": amount,
        "MOID": "",
        "payMethod": (/card/gi.test(method) || /카드/gi.test(method)) ? "CARD" : "CASH",
        "vactBankName": method,
        "P_FN_NM": method
      }
    });
    updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

    itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
    payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
    cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
    payObject = this.returnBillDummies("pay");
    payObject.date = payDate;
    payObject.amount = amount;
    payObject.oid = "";
    payArr.unshift(payObject);

    updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
    updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

    proofs = this.returnBillDummies("proofs");
    proofs.date = payDate;
    proofs.method = method;
    proofs.proof = proof;
    proofs.to = clientName;
    thisBill.requests[Number(requestNumber)].proofs.unshift(proofs);
    updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

    await this.updateBill([ whereQuery, updateQuery ], { selfMongo });

    return "done";
  } catch (e) {
    console.log(e);
  } finally {
    if (!selfBoo){
      await selfMongo.close();
    }
  }
}

BillMaker.prototype.passiveSyncAll = async function () {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOPYTHONC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await MONGOPYTHONC.connect();

    const selfMongo = MONGOC;
    const selfPythonMongo = MONGOPYTHONC;
    let projects;
    let thisBills, thisBill;
    let whereQuery;
    let client;
    let method;
    let bilid;
    let bilidLog;
    let proof;
    let requestNumber;

    bilidLog = {
      contract: [],
      left: [],
    };

    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
        { "process.status": { $regex: "^[대진홀]" } }
      ]
    }, { selfMongo });

    for (let project of projects) {
      whereQuery = {};
      whereQuery["links.proid"] = project.proid;
      whereQuery["links.desid"] = project.desid;
      whereQuery["links.method"] = project.service.online ? "online" : "offline";
      thisBills = await this.getBillsByQuery(whereQuery, { selfMongo: selfPythonMongo });
      client = await back.getClientById(project.cliid, { selfMongo });
      if (thisBills.length >= 1) {
        [ thisBill ] = thisBills;
        for (let i = 0; i < thisBill.requests.length; i++) {
          if (/계약/gi.test(thisBill.requests[i].name)) {
            requestNumber = i;
            break;
          }
        }
        if (thisBill.requests[requestNumber].pay.length === 0) {
          bilid = thisBill.bilid;
          method = project.process.contract.first.calculation.info.method.trim();
          if (method === '' || method === '-') {
            method = "계좌";
          }
          proof = project.process.contract.first.calculation.info.proof.trim();
          if (proof === '' || proof === '-') {
            if (/계좌/gi.test(method)) {
              proof = "현금영수증";
            } else if (/카드/gi.test(method)) {
              proof = "이니시스";
            } else {
              proof = "현금영수증";
            }
          }
          console.log(bilid, client.name, requestNumber, project.process.contract.first.calculation.amount, project.process.contract.first.date, method, proof);
          await this.passiveSync(bilid, client.name, requestNumber, project.process.contract.first.calculation.amount, project.process.contract.first.date, method, proof, { selfMongo: selfPythonMongo });
          bilidLog.contract.push(bilid);
        }
      }
    }

    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.remain.date": { $gte: new Date(2000, 0, 1) } },
        { "process.status": { $regex: "^[대진홀]" } }
      ]
    }, { selfMongo });

    for (let project of projects) {
      whereQuery = {};
      whereQuery["links.proid"] = project.proid;
      whereQuery["links.desid"] = project.desid;
      whereQuery["links.method"] = project.service.online ? "online" : "offline";
      thisBills = await this.getBillsByQuery(whereQuery, { selfMongo: selfPythonMongo });
      client = await back.getClientById(project.cliid, { selfMongo });
      if (thisBills.length >= 1) {
        [ thisBill ] = thisBills;
        for (let i = 0; i < thisBill.requests.length; i++) {
          if (/잔금/gi.test(thisBill.requests[i].name)) {
            requestNumber = i;
            break;
          }
        }
        if (thisBill.requests[requestNumber].pay.length === 0) {
          bilid = thisBill.bilid;
          method = project.process.contract.remain.calculation.info.method.trim();
          if (method === '' || method === '-') {
            method = "계좌";
          }
          proof = project.process.contract.remain.calculation.info.proof.trim();
          if (proof === '' || proof === '-') {
            if (/계좌/gi.test(method)) {
              proof = "현금영수증";
            } else if (/카드/gi.test(method)) {
              proof = "이니시스";
            } else {
              proof = "현금영수증";
            }
          }
          console.log(bilid, client.name, requestNumber, project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount, project.process.contract.remain.date, method, proof);
          await this.passiveSync(bilid, client.name, requestNumber, project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount, project.process.contract.remain.date, method, proof, { selfMongo: selfPythonMongo });
          bilidLog.left.push(bilid);
        }
      }
    }

    console.log(bilidLog);

    return bilidLog;

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    await MONGOPYTHONC.close();
  }
}

BillMaker.prototype.passiveCashReceipt = async function (cliid, goodName, supply) {
  const instance = this;
  const { cryptoString, requestSystem, equalJson } = this.mother;
  const back = this.back;
  const crypto = require("crypto");
  const url = "https://iniapi.inicis.com/api/v1/receipt";
  const headers = { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" };
  const dateToTimestamp = (date) => {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
    return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}${zeroAddition(date.getHours())}${zeroAddition(date.getMinutes())}${zeroAddition(date.getSeconds())}`;
  }
  try {
    const client = await back.getClientById(cliid);
    const now = new Date();
    const type = "Issue";
    const paymethod = "Receipt";
    const timestamp = dateToTimestamp(new Date());
    const clientIp = address.officeinfo.ip.outer;
    const currency = "WON";
    const useOpt = "0";
    const algorithm = "aes-128-cbc";
    const digest = "base64";
    const sha = "sha512";
    const hashType = "hex";
    const vatRatio = 0.1;
    const mid = address.officeinfo.inicis.mid;
    const srcvPrice = String(0);
    let crPrice;
    let supPrice;
    let tax;
    let buyerName;
    let buyerEmail;
    let buyerTel;
    let regNum;
    let hashData;
    let requestObj;

    buyerName = client.name;
    buyerEmail = client.email;
    buyerTel = client.phone;

    supPrice = String(Math.floor(supply));
    tax = String(Math.floor(supply / 10));
    crPrice = String(Math.floor(supply + (supply * (1 / 10))));

    regNum = await cryptoString(address.officeinfo.inicis.key, buyerTel.replace(/[^0-9]/gi, ''), { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest });
    hashData = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + crPrice + supPrice + srcvPrice + regNum).digest(hashType);

    requestObj = {
      type,
      paymethod,
      timestamp,
      clientIp,
      mid,
      goodName,
      crPrice,
      supPrice,
      tax,
      srcvPrice,
      buyerName,
      buyerEmail,
      buyerTel,
      currency,
      regNum,
      useOpt,
      hashData
    };
    console.log(requestObj);

    await requestSystem(url, requestObj, { headers });

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

BillMaker.prototype.travelUpDown = async function (order, proid, method, index, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof order !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number") {
    throw new Error("invaild input");
  }
  if (!([ "down", "up" ]).includes(order)) {
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
    let tempArr;
    let finalArr;
    let targetObj;
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

    tempArr = thisBill.requests.toNormal();
    targetObj = equalJson(JSON.stringify(tempArr[index]));
    tempArr.splice(index, 1);
    finalArr = equalJson(JSON.stringify(tempArr));
    if (order === "down") {
      if (index + 1 === thisBill.requests.toNormal().length) {
        finalArr.push(targetObj);
      } else {
        finalArr.splice(index + 1, 0, targetObj);
      }
    } else {
      if (index - 1 < 0) {
        finalArr.unshift(targetObj);
      } else {
        finalArr.splice(index - 1, 0, targetObj);
      }
    }

    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests"] = finalArr;
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

BillMaker.prototype.convertingDummy = function () {
  return {
    service: {
      from: {
        serid: "",
        xValue: "",
        online: false
      },
      to: {
        serid: "",
        xValue: ""
      }
    },
    designer: {
      from: {
        id: "",
        name: "",
        phone: "",
        email: ""
      },
      to: {
        id: "",
        name: "",
        phone: "",
        email: ""
      }
    },
    request: {
      from: {
        supply: 0,
        vat: 0,
        consumer: 0
      },
      to: {
        supply: 0,
        vat: 0,
        consumer: 0
      },
      additional: false
    },
    response: {
      from: {
        total: 0,
        first: 0,
        remain: 0
      },
      to: {
        total: 0,
        first: 0,
        remain: 0
      },
      additional: false
    }
  };
}

BillMaker.prototype.serviceConverting = async function (proid, method, serid, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof proid !== "string" || typeof method !== "string" || typeof serid !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const doingSignature = "billMaker_serviceConvertingDoing_" + proid;
  const work = new BackWorker();
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep, fileSystem, errorLog } = this.mother;
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
    let newRequestPrice;
    let remainResponse;
    let remainResponseIndex;
    let remainResponseRemainItem;
    let remainResponseRemainItemIndex;
    let responseBetween;
    let newCommission;
    let firstResponseIndex;
    let firstResponseFirstItemIndex;
    let returnObject;
    let unknownDesignerFee, newDesignerFeeObject;
    let safeNum;

    safeNum = 0;
    while ((await fileSystem(`exist`, [ `${process.cwd()}/temp/${doingSignature}.json` ])) && safeNum < 100) {
      await sleep(300);
      safeNum++;
    }
    await fileSystem(`write`, [ `${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }` ]);

    returnObject = this.convertingDummy();

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
      feeObject = project.proposal.detail[0].fee[0];
      proposalIndex0 = 0;
      proposalIndex1 = 0;
      unknownDesignerFee = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
      newDesignerFeeObject = {
        method: feeObject.method,
        partial: feeObject.partial,
        amount: feeObject.amount,
        discount: feeObject.discount,
        distance: {
          number: (unknownDesignerFee.detail.distance === 0 ? 0 : feeObject.distance.number),
          amount: unknownDesignerFee.detail.distance,
          distance: unknownDesignerFee.detail.travel.distance,
          time: unknownDesignerFee.detail.travel.time,
          limit: feeObject.distance.limit
        }
      };
      feeObject = equalJson(JSON.stringify(newDesignerFeeObject));
    }
    pastFeeObject = await work.getDesignerFee(desid, cliid, pastSerid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    newFeeObject = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    if (newFeeObject.detail[method] === 0) {
      await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
      return { error: "unable in this service : " + newFeeObject.comment };
    } else {

      returnObject.service.from.serid = project.service.serid;
      returnObject.service.from.xValue = project.service.xValue;
      returnObject.service.from.online = project.service.online;

      returnObject.service.to.serid = serid;
      returnObject.service.to.xValue = project.service.xValue;
      returnObject.service.to.online = project.service.online;

      returnObject.designer.from.id = designer.desid;
      returnObject.designer.from.name = designer.designer;
      returnObject.designer.from.phone = designer.information.phone;
      returnObject.designer.from.email = designer.information.email;

      returnObject.designer.to.id = designer.desid;
      returnObject.designer.to.name = designer.designer;
      returnObject.designer.to.phone = designer.information.phone;
      returnObject.designer.to.email = designer.information.email;

      returnObject.request.from.supply = project.process.contract.remain.calculation.amount.supply;
      returnObject.request.from.vat = project.process.contract.remain.calculation.amount.vat;
      returnObject.request.from.consumer = project.process.contract.remain.calculation.amount.consumer;

      returnObject.response.from.total = project.process.calculation.payments.totalAmount;
      returnObject.response.from.first = project.process.calculation.payments.first.amount;
      returnObject.response.from.remain = project.process.calculation.payments.remain.amount;

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
      num = thisBill.requests.length;
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
      if (typeof option.newPrice === "number") {
        newSupply = option.newPrice;
        newRequestPrice = newSupply - Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
        newRequestAmount = newRequestPrice - pastRemainPrice;
      } else {
        newRequestAmount = newFeeObject.detail[method] - pastFeeObject.detail[method];
        newRequestPrice = pastRemainPrice + newRequestAmount;
        newSupply = newRequestPrice + Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
      }

      projectWhereQuery = { proid };
      projectUpdateQuery = {};
      projectUpdateQuery["service.serid"] = serid;
      projectUpdateQuery["service.online"] = !/off/gi.test(method);
      projectUpdateQuery["process.contract.remain.calculation.amount.supply"] = Math.round(newSupply);
      projectUpdateQuery["process.contract.remain.calculation.amount.vat"] = Math.round(newSupply * vatRatio);
      projectUpdateQuery["process.contract.remain.calculation.amount.consumer"] = Math.round(newSupply * (1 + vatRatio));
      classification = designer.information.business.businessInfo.classification;
      percentage = designer.information.business.service.cost.percentage;
      [ calculate ] = BillMaker.designerCalculation(newSupply, classification, percentage, client, { toArray: true });
      projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.totalAmount"] = projectUpdateQuery["process.calculation.payments.first.amount"] * 2;

      if (typeof option.confirmMode === "boolean" && option.confirmMode) {
        if (!selfBoo) {
          await MONGOC.close();
        }
        if (!selfCoreBoo) {
          await MONGOCOREC.close();
        }
        await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);

        return {
          price: {
            supply: {
              from: project.process.contract.remain.calculation.amount.supply,
              to: newSupply,
            },
            remain: {
              from: project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount,
              to: newRequestPrice * (1 + vatRatio),
            },
            between: {
              supply: newRequestAmount,
              consumer: newRequestAmount * (1 + vatRatio),
            }
          },
          calculate: {
            total: {
              from: project.process.calculation.payments.totalAmount,
              to: projectUpdateQuery["process.calculation.payments.totalAmount"]
            },
            first: {
              from: project.process.calculation.payments.first.amount,
              to: (project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1).valueOf()) ? project.process.calculation.payments.first.amount : projectUpdateQuery["process.calculation.payments.first.amount"]),
            },
            remain: {
              from: project.process.calculation.payments.remain.amount,
              to: (project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1).valueOf()) ? (projectUpdateQuery["process.calculation.payments.totalAmount"] - project.process.calculation.payments.first.amount) : projectUpdateQuery["process.calculation.payments.remain.amount"])
            }
          }
        };
      }

      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      feeObject.amount = newSupply;
      project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount = newSupply;
      project.service.serid = projectUpdateQuery["service.serid"];
      project.service.online = projectUpdateQuery["service.online"];
      project.process.contract.remain.calculation.amount.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      project.process.contract.remain.calculation.amount.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      project.process.contract.remain.calculation.amount.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];
      project.process.calculation.payments.first.amount = projectUpdateQuery["process.calculation.payments.first.amount"];
      project.process.calculation.payments.remain.amount = projectUpdateQuery["process.calculation.payments.remain.amount"];
      project.process.calculation.payments.totalAmount = projectUpdateQuery["process.calculation.payments.totalAmount"];

      returnObject.request.to.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      returnObject.request.to.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      returnObject.request.to.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];

      returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];
      returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];
      returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];

      newCommission = Math.floor((newSupply * (percentage / 100)) / 10) * 10;

      whereQuery = { bilid };
      updateQuery = {};

      if (payNum === 0) {

        pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
        pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
        pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
        pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
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
        await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });
        await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });

      } else {

        //request
        if (newRequestAmount < 0) {
          pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
          pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));
        } else if (newRequestAmount > 0) {
          returnObject.request.additional = true;
          await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC, feeObject });
          pastRemainArr[remainItemIndex].unit.price = newRequestAmount;
          pastRemainArr[remainItemIndex].amount.supply = newRequestAmount * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(0) + ".items." + String(0)] = equalJson(JSON.stringify(pastRemainArr[remainItemIndex]));
        }
        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        updateQuery = {};

        //response
        firstResponse = null;
        secondResponse = null;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
            break;
          }
        }
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
            break;
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
        for (let { amount } of firstResponse.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of firstResponse.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of secondResponse.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of secondResponse.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

        if (!firstBoo && !remainBoo) {

          pastResponses = thisBill.responses.toNormal();
          newResponses = [];
          for (let res of pastResponses) {
            if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              newResponses.push(res);
            }
          }
          updateQuery = {};
          updateQuery["responses"] = equalJson(JSON.stringify(newResponses));
          await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
          await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });
          await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });

        } else {

          pastResponses = thisBill.responses.toNormal();
          for (let i = 0; i < pastResponses.length; i++) {
            if (pastResponses[i].name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              remainResponse = pastResponses[i];
              remainResponseIndex = i;
              break;
            }
          }
          for (let i = 0; i < pastResponses.length; i++) {
            if (pastResponses[i].name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
              firstResponse = pastResponses[i];
              firstResponseIndex = i;
              break;
            }
          }
          for (let i = 0; i < remainResponse.items.length; i++) {
            if (remainResponse.items[i].class === "designerFeeRemain") {
              remainResponseRemainItem = remainResponse.items[i];
              remainResponseRemainItemIndex = i;
            }
          }
          for (let i = 0; i < firstResponse.items.length; i++) {
            if (firstResponse.items[i].class === "designerFeeFirst") {
              firstResponseFirstItemIndex = i;
            }
          }

          responseBetween = projectUpdateQuery["process.calculation.payments.totalAmount"] - (pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price + pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price);
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price + responseBetween;
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].amount.pure = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].amount.commission = newCommission - pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].amount.commission;
          updateQuery = {};
          updateQuery["responses." + String(remainResponseIndex) + ".items"] = pastResponses[remainResponseIndex].items;
          await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

          projectUpdateQuery = {};
          projectUpdateQuery["process.calculation.payments.first.amount"] = pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          projectUpdateQuery["process.calculation.payments.totalAmount"] = pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price + pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

          returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];
          returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];
          returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];

        }

      }

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
    return returnObject;

  } catch (e) {
    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
    await errorLog("BillMaker.prototype.serviceConverting error : " + e.message);
    console.log(e);
  }
}

BillMaker.prototype.designerConverting = async function (proid, method, desid, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof proid !== "string" || typeof method !== "string" || typeof desid !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const doingSignature = "billMaker_designerConvertingDoing_" + proid;
  const work = new BackWorker();
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep, fileSystem, errorLog } = this.mother;
  const { vatRatio, freeRatio, designerCancel } = BillMaker.billDictionary.styling.etc;
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let project;
    let thisBill, bilid;
    let serid;
    let xValue;
    let remain, contract;
    let totalNumContract, payNumContract, cancelNumContract;
    let totalNum, payNum, cancelNum;
    let totalNumR0, payNumR0, cancelNumR0;
    let totalNumR1, payNumR1, cancelNumR1;
    let pastDesid, cliid;
    let pastDesigner;
    let designer, client;
    let feeObject;
    let pastFeeObject;
    let newFeeObject;
    let remainIndex, remainItemIndex, contractIndex, contractItemIndex;
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
    let newRequestPrice;
    let remainResponse;
    let remainResponseIndex;
    let remainResponseRemainItem;
    let remainResponseRemainItemIndex;
    let responseBetween;
    let newCommission;
    let firstResponseIndex;
    let firstResponseFirstItemIndex;
    let returnObject;
    let bankName;
    let bankTo;
    let newDesignerFeeObject;
    let safeNum;
    let designerCancelObject;
    let designerCancelCalculate;
    let newFeeObjectInProposal;

    safeNum = 0;
    while ((await fileSystem(`exist`, [ `${process.cwd()}/temp/${doingSignature}.json` ])) && safeNum < 100) {
      await sleep(300);
      safeNum++;
    }
    await fileSystem(`write`, [ `${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }` ]);

    returnObject = this.convertingDummy();

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
    pastDesid = project.desid;
    cliid = project.cliid;
    serid = project.service.serid;
    xValue = project.service.xValue;

    pastDesigner = await back.getDesignerById(pastDesid, { selfMongo: MONGOCOREC });
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });

    feeObject = null;
    for (let i = 0; i < project.proposal.detail.length; i++) {
      if (project.proposal.detail[i].desid === pastDesid) {
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
      feeObject = project.proposal.detail[0].fee[0];
      proposalIndex0 = 0;
      proposalIndex1 = 0;
    }

    newFeeObjectInProposal = null;
    for (let i = 0; i < project.proposal.detail.length; i++) {
      if (project.proposal.detail[i].desid === desid) {
        for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
          if (project.proposal.detail[i].fee[j].method === method) {
            newFeeObjectInProposal = project.proposal.detail[i].fee[j];
          }
        }
      }
    }

    pastFeeObject = await work.getDesignerFee(pastDesid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    newFeeObject = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });

    if (newFeeObject.detail[method] === 0) {
      return { error: "unable in this designer" };
    } else {
      returnObject.service.from.serid = serid;
      returnObject.service.from.xValue = project.service.xValue;
      returnObject.service.from.online = project.service.online;
      returnObject.service.to.serid = serid;
      returnObject.service.to.xValue = project.service.xValue;
      returnObject.service.to.online = project.service.online;

      returnObject.designer.from.id = pastDesigner.desid;
      returnObject.designer.from.name = pastDesigner.designer;
      returnObject.designer.from.phone = pastDesigner.information.phone;
      returnObject.designer.from.email = pastDesigner.information.email;

      returnObject.designer.to.id = designer.desid;
      returnObject.designer.to.name = designer.designer;
      returnObject.designer.to.phone = designer.information.phone;
      returnObject.designer.to.email = designer.information.email;

      returnObject.request.from.supply = project.process.contract.remain.calculation.amount.supply;
      returnObject.request.from.vat = project.process.contract.remain.calculation.amount.vat;
      returnObject.request.from.consumer = project.process.contract.remain.calculation.amount.consumer;

      returnObject.response.from.total = project.process.calculation.payments.totalAmount;
      returnObject.response.from.first = project.process.calculation.payments.first.amount;
      returnObject.response.from.remain = project.process.calculation.payments.remain.amount;

      thisBill = await this.getBillsByQuery({
        $and: [
          { "links.proid": project.proid },
          { "links.cliid": cliid },
          { "links.desid": pastDesid },
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
        if (request.name === BillMaker.billDictionary.styling.requests.firstPayment.name) {
          contract = request;
          contractIndex = num;
          break;
        }
        num++;
      }
      num = 0;
      for (let request of thisBill.requests) {
        if (request.name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
          remain = request;
          remainIndex = num;
        }
        num++;
      }
      num = thisBill.requests.length;

      totalNumContract = 0;
      for (let { amount: { consumer } } of contract.items) {
        totalNumContract += consumer;
      }
      payNumContract = 0;
      for (let { amount } of contract.pay) {
        payNumContract += amount;
      }
      cancelNumContract = 0;
      for (let { amount } of contract.cancel) {
        cancelNumContract += amount;
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
      if (newFeeObjectInProposal !== null) {
        newRequestAmount = newFeeObjectInProposal.amount - pastRemainPrice - Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
      } else {
        newRequestAmount = newFeeObject.detail[method] - pastFeeObject.detail[method];
      }
      newRequestPrice = pastRemainPrice + newRequestAmount;
      newSupply = newRequestPrice + Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));

      projectWhereQuery = { proid };
      projectUpdateQuery = {};
      projectUpdateQuery["desid"] = desid;
      projectUpdateQuery["process.contract.remain.calculation.amount.supply"] = Math.round(newSupply);
      projectUpdateQuery["process.contract.remain.calculation.amount.vat"] = Math.round(newSupply * vatRatio);
      projectUpdateQuery["process.contract.remain.calculation.amount.consumer"] = Math.round(newSupply * (1 + vatRatio));
      classification = designer.information.business.businessInfo.classification;
      percentage = designer.information.business.service.cost.percentage;

      [ calculate ] = BillMaker.designerCalculation(newSupply, classification, percentage, client, { toArray: true });

      projectUpdateQuery["process.calculation.method"] = classification.toNormal().replace(/법인/gi, '').replace(/개인/gi, '');
      projectUpdateQuery["process.calculation.percentage"] = percentage;
      if (designer.information.business.account.length > 0) {
        bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber);
        bankTo = designer.information.business.account[0].to === undefined ? designer.designer : designer.information.business.account[0].to;
        projectUpdateQuery["process.calculation.info.account"] = bankName;
        projectUpdateQuery["process.calculation.info.proof"] = bankTo;
        projectUpdateQuery["process.calculation.info.to"] = bankTo;
      }

      projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.totalAmount"] = projectUpdateQuery["process.calculation.payments.first.amount"] * 2;
      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount = newSupply;
      project.service.serid = projectUpdateQuery["service.serid"];
      project.service.online = projectUpdateQuery["service.online"];
      project.process.contract.remain.calculation.amount.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      project.process.contract.remain.calculation.amount.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      project.process.contract.remain.calculation.amount.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];
      project.process.calculation.payments.first.amount = projectUpdateQuery["process.calculation.payments.first.amount"];
      project.process.calculation.payments.remain.amount = projectUpdateQuery["process.calculation.payments.remain.amount"];
      project.process.calculation.payments.totalAmount = projectUpdateQuery["process.calculation.payments.totalAmount"];
      project.process.calculation.method = projectUpdateQuery["process.calculation.method"];
      project.process.calculation.percentage = projectUpdateQuery["process.calculation.percentage"];

      returnObject.request.to.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      returnObject.request.to.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      returnObject.request.to.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];

      returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];
      returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];
      returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];

      newCommission = Math.floor((newSupply * (percentage / 100)) / 10) * 10;

      newDesignerFeeObject = {
        method: feeObject.method,
        partial: feeObject.partial,
        amount: newSupply,
        discount: feeObject.discount,
        distance: {
          number: (newFeeObject.detail.distance === 0 ? 0 : feeObject.distance.number),
          amount: newFeeObject.detail.distance,
          distance: newFeeObject.detail.travel.distance,
          time: newFeeObject.detail.travel.time,
          limit: feeObject.distance.limit
        }
      };

      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["participant.designer.id"] = designer.desid;
      updateQuery["participant.designer.name"] = designer.designer;
      updateQuery["participant.designer.phone"] = designer.information.phone;
      updateQuery["participant.designer.email"] = designer.information.email;
      if (Array.isArray(thisBill.links.pastDesid)) {
        updateQuery["links.pastDesid"] = equalJson(JSON.stringify(thisBill.links.pastDesid.unshift(pastDesid)));
      } else {
        updateQuery["links.pastDesid"] = [ pastDesid ];
      }
      updateQuery["links.desid"] = desid;

      if (payNum === 0) {

        pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
        pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
        pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
        pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
        updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));

        pastResponses = thisBill.responses.toNormal();
        newResponses = [];
        if (payNumContract === 0) {
          for (let res of pastResponses) {
            if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              newResponses.push(res);
            }
          }
        } else {
          returnObject.response.additional = true;
          for (let res of pastResponses) {
            if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {

                designerCancelObject = equalJson(JSON.stringify(designerCancel));
                [ designerCancelCalculate ] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });
                designerCancelObject.unit.price = designerCancelCalculate;
                designerCancelObject.amount.pure = designerCancelCalculate;
                designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;

                res.items = res.items.slice(0, 1);
                res.items[0].id = thisBill.bilid + designerCancelObject.id;
                res.items[0].class = designerCancelObject.class;
                res.items[0].name = designerCancelObject.name;
                res.items[0].description = designerCancelObject.description;
                res.items[0].unit = designerCancelObject.unit;
                res.items[0].amount = designerCancelObject.amount;
                res.comments = designerCancelObject.comments;

              }
              newResponses.push(res);
              break;
            }
          }
        }
        updateQuery["responses"] = equalJson(JSON.stringify(newResponses));
        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        // ???? 1회 출장 비용을 홈리에종이 부담하는 건지, 디자이너 정산 금액에서 까는건지..
        await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });
        await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });

      } else {

        //request
        if (newRequestAmount < 0) {
          pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
          pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));
        } else if (newRequestAmount > 0) {
          returnObject.request.additional = true;
          await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });
          pastRemainArr[remainItemIndex].unit.price = newRequestAmount;
          pastRemainArr[remainItemIndex].amount.supply = newRequestAmount * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(0) + ".items." + String(0)] = equalJson(JSON.stringify(pastRemainArr[remainItemIndex]));
        }
        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        updateQuery = {};

        //response
        firstResponse = null;
        secondResponse = null;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
            break;
          }
        }
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
            break;
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
        for (let { amount } of firstResponse.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of firstResponse.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of secondResponse.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of secondResponse.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

        if (!firstBoo && !remainBoo) {

          returnObject.response.additional = true;
          pastResponses = thisBill.responses.toNormal();
          newResponses = [];
          for (let res of pastResponses) {
            if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {

                designerCancelObject = equalJson(JSON.stringify(designerCancel));
                [ designerCancelCalculate ] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });
                designerCancelObject.unit.price = designerCancelCalculate;
                designerCancelObject.amount.pure = designerCancelCalculate;
                designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;

                res.items = res.items.slice(0, 1);
                res.items[0].id = thisBill.bilid + designerCancelObject.id;
                res.items[0].class = designerCancelObject.class;
                res.items[0].name = designerCancelObject.name;
                res.items[0].description = designerCancelObject.description;
                res.items[0].unit = designerCancelObject.unit;
                res.items[0].amount = designerCancelObject.amount;
                res.comments = designerCancelObject.comments;

              }
              newResponses.push(res);
              break;
            }
          }
          updateQuery = {};
          updateQuery["responses"] = equalJson(JSON.stringify(newResponses));
          await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
          // ???? 1회 출장 비용을 홈리에종이 부담하는 건지, 디자이너 정산 금액에서 까는건지..
          await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });
          await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });

        } else {

          if (!remainBoo) {
            pastResponses = thisBill.responses.toNormal();
            newResponses = [];
            for (let res of pastResponses) {
              if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                newResponses.push(res);
              }
            }
            updateQuery = {};
            updateQuery["responses"] = equalJson(JSON.stringify(newResponses));
            await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
          }

          returnObject.response.additional = true;
          await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });
          await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });

        }

      }

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);

    return returnObject;

  } catch (e) {
    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
    await errorLog(e.message);
    console.log(e);
  }
}

BillMaker.prototype.amountConverting = async function (bilid, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof bilid !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const doingSignature = "billMaker_amountConvertingDoing_" + bilid;
  const work = new BackWorker();
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, equalJson, sleep, fileSystem } = this.mother;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio;
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
  try {
    let MONGOC, MONGOCOREC;
    let proid;
    let selfBoo, selfCoreBoo;
    let project;
    let thisBill;
    let serid;
    let xValue;
    let desid, cliid;
    let designer, client;
    let remain, contract;
    let first, second;
    let remainIndex, contractIndex;
    let firstIndex, secondIndex;
    let remainIndexItem, contractIndexItem;
    let firstIndexItem, secondIndexItem;
    let requestsCopied, responsesCopied;
    let whereQuery, updateQuery;
    let contractAmount;
    let supply, vat, consumer;
    let contractAmountSupply;
    let firstAmount, secondAmount;
    let percentage;
    let remainBoo, firstBoo;
    let totalNum, payNum, cancelNum;
    let feeObject, newDesignerFeeObject, unknownDesignerFee;
    let proposalIndex0, proposalIndex1;
    let method;
    let pastRemainArr;
    let newRequestAmount;
    let totalAmount;
    let safeNum;
    let payObject;
    let tempQuery;
    let payArr;

    safeNum = 0;
    while ((await fileSystem(`exist`, [ `${process.cwd()}/temp/${doingSignature}.json` ])) && safeNum < 100) {
      await sleep(300);
      safeNum++;
    }
    await fileSystem(`write`, [ `${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }` ]);

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

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    proid = thisBill.links.proid;

    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }

    method = project.service.online ? "online" : "offline";
    desid = project.desid;
    cliid = project.cliid;
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });
    serid = project.service.serid;
    xValue = project.service.xValue;
    contractAmount = project.process.contract.first.calculation.amount;
    contractAmountSupply = contractAmount * (1 / (1 + vatRatio));
    supply = project.process.contract.remain.calculation.amount.supply;
    vat = project.process.contract.remain.calculation.amount.vat;
    consumer = project.process.contract.remain.calculation.amount.consumer;
    firstAmount = project.process.calculation.payments.first.amount;
    secondAmount = project.process.calculation.payments.remain.amount;
    percentage = project.process.calculation.percentage;
    totalAmount = firstAmount + secondAmount;

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
      feeObject = project.proposal.detail[0].fee[0];
      proposalIndex0 = 0;
      proposalIndex1 = 0;
      unknownDesignerFee = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
      newDesignerFeeObject = {
        method: feeObject.method,
        partial: feeObject.partial,
        amount: feeObject.amount,
        discount: feeObject.discount,
        distance: {
          number: (unknownDesignerFee.detail.distance === 0 ? 0 : feeObject.distance.number),
          amount: unknownDesignerFee.detail.distance,
          distance: unknownDesignerFee.detail.travel.distance,
          time: unknownDesignerFee.detail.travel.time,
          limit: feeObject.distance.limit
        }
      };
      feeObject = equalJson(JSON.stringify(newDesignerFeeObject));
    }
    feeObject.amount = supply;

    requestsCopied = thisBill.requests.toNormal();
    responsesCopied = thisBill.responses.toNormal();

    for (let i = 0; i < requestsCopied.length; i++) {
      if (requestsCopied[i].name === BillMaker.billDictionary.styling.requests.firstPayment.name) {
        contract = requestsCopied[i];
        contractIndex = i;
        break;
      }
    }
    for (let i = 0; i < contract.items.length; i++) {
      if (contract.items[i].class === "designerTime") {
        contractIndexItem = i;
        break;
      }
    }
    for (let i = 0; i < requestsCopied.length; i++) {
      if (requestsCopied[i].name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
        remain = requestsCopied[i];
        remainIndex = i;
      }
    }
    for (let i = 0; i < remain.items.length; i++) {
      if (remain.items[i].class === "designerTime") {
        remainIndexItem = i;
        break;
      }
    }
    for (let i = 0; i < responsesCopied.length; i++) {
      if (responsesCopied[i].name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
        first = responsesCopied[i];
        firstIndex = i;
        break;
      }
    }
    for (let i = 0; i < first.items.length; i++) {
      if (first.items[i].class === "designerFeeFirst") {
        firstIndexItem = i;
        break;
      }
    }
    for (let i = 0; i < responsesCopied.length; i++) {
      if (responsesCopied[i].name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
        second = responsesCopied[i];
        secondIndex = i;
        break;
      }
    }
    for (let i = 0; i < second.items.length; i++) {
      if (second.items[i].class === "designerFeeRemain") {
        secondIndexItem = i;
        break;
      }
    }

    remainBoo = false;
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
    remainBoo = (Math.floor(totalNum) <= Math.floor(payNum + cancelNum));

    firstBoo = false;
    totalNum = 0;
    for (let { amount: { pure } } of first.items) {
      totalNum += consumer;
    }
    payNum = 0;
    for (let { amount } of first.pay) {
      payNum += amount;
    }
    cancelNum = 0;
    for (let { amount } of first.cancel) {
      cancelNum += amount;
    }
    firstBoo = (Math.floor(totalNum) <= Math.floor(payNum + cancelNum));


    whereQuery = { bilid };
    if (!remainBoo && !firstBoo) {

      updateQuery = {};
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);
      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".unit.price"] = firstAmount;
      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.pure"] = firstAmount;
      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = secondAmount;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = secondAmount;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;

    } else if (remainBoo && !firstBoo) {

      updateQuery = {};
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);

      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".unit.price"] = firstAmount;
      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.pure"] = firstAmount;
      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = secondAmount;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = secondAmount;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;

    } else if (remainBoo && firstBoo) {

      updateQuery = {};
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
      updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);

      updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) * (first.items[firstIndexItem].amount.pure / totalAmount);
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = totalAmount - first.items[firstIndexItem].amount.pure;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = totalAmount - first.items[firstIndexItem].amount.pure;
      updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) * ((totalAmount - first.items[firstIndexItem].amount.pure) / totalAmount);

    } else {
      throw new Error("invaild case");
    }

    if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
      payObject = this.returnBillDummies("pay");
      payObject.date = project.process.calculation.payments.first.date.toNormal();
      payObject.amount = project.process.calculation.payments.first.amount;
      payArr = [ payObject ];
      updateQuery["responses." + String(firstIndex) + ".pay"] = payArr;
    }

    if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
      payObject = this.returnBillDummies("pay");
      payObject.date = project.process.calculation.payments.remain.date.toNormal();
      payObject.amount = project.process.calculation.payments.remain.amount;
      payArr = [ payObject ];
      updateQuery["responses." + String(secondIndex) + ".pay"] = payArr;
    }

    if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
      payObject = this.returnBillDummies("pay");
      payObject.date = project.process.calculation.payments.first.cancel.toNormal();
      payObject.amount = project.process.calculation.payments.first.refund;
      payArr = [ payObject ];
      updateQuery["responses." + String(firstIndex) + ".cancel"] = payArr;
    }

    if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
      payObject = this.returnBillDummies("pay");
      payObject.date = project.process.calculation.payments.remain.cancel.toNormal();
      payObject.amount = project.process.calculation.payments.remain.refund;
      payArr = [ payObject ];
      updateQuery["responses." + String(secondIndex) + ".cancel"] = payArr;
    }

    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.requestRefund = async function (method, bilid, requestIndex, payIndex, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof method !== "string" || typeof bilid !== "string" || typeof requestIndex !== "number" || typeof payIndex !== "number") {
    throw new Error(`invaild input : method => ${String(method)}, bilid => ${String(bilid)}, requestIndex => ${String(requestIndex)} / ${typeof requestIndex}, payIndex => ${String(payIndex)}, ${typeof payIndex}`);
  }
  if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial" ]).includes(method)) {
    throw new Error("invaild method, must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial ]");
  }
  if (/Partial/gi.test(method)) {
    if (typeof option.percentage !== "number") {
      throw new Error("invaild option");
    }
  }
  if (/vaccount/gi.test(method)) {
    if (typeof option.accountNumber !== "string" || typeof option.bankName !== "string" || typeof option.accountName !== "string") {
      throw new Error("invaild option");
    }
  }
  const instance = this;
  const address = this.address;
  const back = this.back;
  const crypto = require("crypto");
  const { mongo, mongopythoninfo, mongoinfo, cryptoString, requestSystem, ipCheck, equalJson, errorLog } = this.mother;
  const dateToTimestamp = (date) => {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
    return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}${zeroAddition(date.getHours())}${zeroAddition(date.getMinutes())}${zeroAddition(date.getSeconds())}`;
  }
  const url = "https://iniapi.inicis.com/api/v1/refund";
  const msg = "콘솔로부터 환불 요청";
  const currency = "WON";
  const sha = "sha512";
  const algorithm = "aes-128-cbc";
  const digest = "base64";
  const contentType = "application/x-www-form-urlencoded;charset=utf-8";
  const hashType = "hex";
  const status = /Partial/gi.test(method) ? "부분 환불" : "전체 환불";
  const now = new Date();
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio;
  try {
    let type, paymethod, timestamp;
    let clientIp;
    let mid, tid;
    let price, confirmPrice;
    let hash;
    let accountNumber, bankName;
    let refundAcctNum, refundBankCode, refundAcctName;
    let response;
    let thisBill, thisRequest, thisData;
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let infoCopied, infoCopiedCopied;
    let originalPrice;
    let percentage;
    let whereQuery, updateQuery;
    let cancelArr;
    let proofsArr;
    let resultObj;
    let client, project;
    let projectWhereQuery, projectUpdateQuery;
    let totalNumR0, payNumR0, cancelNumR0;
    let totalNumR1, payNumR1, cancelNumR1;
    let firstBoo, remainBoo;
    let firstResponse, secondResponse;
    let firstResponseIndex, secondResponseIndex;
    let firstResponseIndexItemIndex, secondResponseIndexItemIndex;
    let refreshTotalAmount, refreshTotalAmountRaw;
    let calculate;
    let commission;
    let classification;
    let num;
    let refreshRemainAmount;
    let oid;
    let tempObj;
    let allCancelPrice;

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

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }
    if (thisBill.requests[requestIndex] === undefined) {
      throw new Error("invaild request index");
    }
    thisRequest = thisBill.requests[requestIndex];
    if (thisRequest.pay[payIndex] === undefined) {
      throw new Error("invaild pay index");
    }

    firstResponse = null;
    secondResponse = null;
    firstResponseIndexItemIndex = null;
    secondResponseIndexItemIndex = null;
    num = 0;
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
        firstResponse = res;
        firstResponseIndex = num;
        break;
      }
      num++;
    }
    num = 0;
    for (let item of thisBill.responses[firstResponseIndex].items) {
      if (item.class === "designerFeeFirst") {
        firstResponseIndexItemIndex = num;
      }
      num++;
    }
    num = 0;
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
        secondResponse = res;
        secondResponseIndex = num;
        break;
      }
      num++;
    }
    num = 0;
    for (let item of thisBill.responses[secondResponseIndex].items) {
      if (item.class === "designerFeeRemain") {
        secondResponseIndexItemIndex = num;
      }
      num++;
    }
    if (firstResponse === null || secondResponse === null || firstResponseIndexItemIndex === null || secondResponseIndexItemIndex === null) {
      throw new Error("invaild response structure");
    }
    firstBoo = false;
    remainBoo = false;
    totalNumR0 = 0;
    for (let { amount: { pure } } of firstResponse.items) {
      totalNumR0 += pure;
    }
    payNumR0 = 0;
    for (let { amount } of firstResponse.pay) {
      payNumR0 += amount;
    }
    cancelNumR0 = 0;
    for (let { amount } of firstResponse.cancel) {
      cancelNumR0 += amount;
    }
    firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
    totalNumR1 = 0;
    for (let { amount: { pure } } of secondResponse.items) {
      totalNumR1 += pure;
    }
    payNumR1 = 0;
    for (let { amount } of secondResponse.pay) {
      payNumR1 += amount;
    }
    cancelNumR1 = 0;
    for (let { amount } of secondResponse.cancel) {
      cancelNumR1 += amount;
    }
    remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

    client = await back.getClientById(thisBill.links.cliid, { selfMongo: MONGOCOREC });
    project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    infoCopied = thisRequest.info.toNormal();
    infoCopiedCopied = equalJson(JSON.stringify(infoCopied));
    infoCopiedCopied = infoCopiedCopied.filter((obj) => {
      return (typeof obj.data === "object");
    }).filter((obj) => {
      return (obj.data.mid !== undefined && obj.data.tid !== undefined && obj.data.TotPrice !== undefined && obj.data.MOID !== undefined);
    });
    thisData = infoCopiedCopied.find((obj) => {
      return obj.data.MOID === thisRequest.pay[payIndex].oid;
    });
    if (thisData === undefined) {
      throw new Error("invaild oid data");
    }
    originalPrice = Number(thisData.data.TotPrice.replace(/[^0-9\.\-]/gi, ''));

    if (typeof option.percentage === "number") {
      percentage = option.percentage;
    } else {
      percentage = 100;
    }

    price = Math.floor((originalPrice * (percentage / 100)) / 10) * 10;
    confirmPrice = originalPrice - price;

    if (typeof option.refundPrice === "number") {
      price = Math.floor(option.refundPrice);
      confirmPrice = originalPrice - price;
      percentage = Math.floor(((option.refundPrice / originalPrice) * 100) * 100) / 100;
    }

    timestamp = dateToTimestamp(now);
    clientIp = (await ipCheck()).ip;
    mid = address.officeinfo.inicis.mid;
    tid = thisData.data.tid;
    oid = thisData.data.MOID;

    if (method === "cardEntire") {

      type = "Refund";
      paymethod = "Card";
      hash = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + tid).digest(hashType);
      res = await requestSystem(url, { type, paymethod, timestamp, clientIp, mid, tid, msg, hashData: hash }, { "Content-Type": contentType });
      price = originalPrice;

    } else if (method === "cardPartial") {

      type = "PartialRefund";
      paymethod = "Card";
      hash = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + tid + price + confirmPrice).digest(hashType);
      res = await requestSystem(url, { type, paymethod, timestamp, clientIp, mid, tid, msg, price, confirmPrice, currency, hashData: hash }, { "Content-Type": contentType });

    } else if (method === "vaccountEntire") {

      type = "Refund";
      paymethod = "Vacct";
      refundAcctNum = await cryptoString(address.officeinfo.inicis.key, option.accountNumber, { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest });
      refundBankCode = BillMaker.returnBankCode(option.bankName);
      refundAcctName = option.accountName;
      hash = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + tid + refundAcctNum).digest(hashType);
      res = await requestSystem(url, { type, paymethod, timestamp, clientIp, mid, tid, msg, refundAcctNum, refundBankCode, refundAcctName, hashData: hash }, { "Content-Type": contentType });
      price = originalPrice;

    } else if (method === "vaccountPartial") {

      type = "PartialRefund";
      paymethod = "Vacct";
      refundAcctNum = await cryptoString(address.officeinfo.inicis.key, option.accountNumber, { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest });
      refundBankCode = BillMaker.returnBankCode(option.bankName);
      refundAcctName = option.accountName;
      hash = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + tid + price + confirmPrice + refundAcctNum).digest(hashType);
      res = await requestSystem(url, { type, paymethod, timestamp, clientIp, mid, tid, msg, price, confirmPrice, refundAcctNum, refundBankCode, refundAcctName, hashData: hash }, { "Content-Type": contentType });

    }

    if (res.status === 200 && typeof res.data === "object" && res.data.resultCode === "00") {

      if (/vaccount/gi.test(method)) {
        res.data.refundAcctNum = option.accountNumber;
        res.data.refundBankCode = option.bankName;
        res.data.refundAcctName = option.accountName;
      }

      //report
      resultObj = { bilid };
      resultObj.bill = thisBill;
      resultObj.proid = project.proid;
      resultObj.cliid = project.cliid;
      resultObj.desid = thisBill.links.desid;
      resultObj.project = project;
      resultObj.client = client;
      resultObj.method = method;
      resultObj.price = {};
      resultObj.price.partial = (price !== originalPrice);
      resultObj.price.refund = price;
      resultObj.price.original = originalPrice;
      resultObj.price.percentage = percentage;
      resultObj.rawData = res.data;

      whereQuery = { bilid };
      updateQuery = {};
      projectWhereQuery = { proid: project.proid };
      projectUpdateQuery = {};

      infoCopied.unshift(res.data);
      cancelArr = thisRequest.cancel.toNormal();
      tempObj = this.returnBillDummies("pay");
      tempObj.date = now;
      tempObj.amount = price;
      tempObj.oid = oid;
      cancelArr.unshift(tempObj);
      proofsArr = thisRequest.proofs.toNormal();
      tempObj = this.returnBillDummies("proofs");
      tempObj.date = now;
      tempObj.method = ((/vaccount/gi.test(method) ? "무통장 입금" : "카드") + (thisData.data.P_FN_NM !== undefined ? "(" + thisData.data.P_FN_NM.replace(/카드/gi, '').replace(/은행/gi, '') + ")" : "(" + thisData.data.vactBankName.replace(/카드/gi, '').replace(/은행/gi, '') + ")") + " 취소");
      tempObj.proof = "이니시스";
      tempObj.to = client.name;
      proofsArr.unshift(tempObj);

      allCancelPrice = 0;
      for (let { amount } of cancelArr) {
        allCancelPrice += amount;
      }

      refreshTotalAmountRaw = project.process.contract.remain.calculation.amount.supply - Math.round(allCancelPrice * (10 / 11));
      if (refreshTotalAmountRaw < 10) {
        refreshTotalAmountRaw = 0;
      }
      classification = project.process.calculation.method;
      [ calculate, commission ] = BillMaker.designerCalculation(refreshTotalAmountRaw, classification, project.process.calculation.percentage, client, { toArray: true });
      refreshTotalAmount = Math.floor(calculate / 10) * 10;


      if (/홈리에종 계약금/gi.test(thisBill.requests[requestIndex].name) || /홈리에종 잔금/gi.test(thisBill.requests[requestIndex].name)) {
        if (!firstBoo && !remainBoo) {

          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.first.amount"] = (refreshTotalAmount / 2);
          projectUpdateQuery["process.calculation.payments.remain.amount"] = (refreshTotalAmount / 2);

        } else {

          refreshRemainAmount = refreshTotalAmount - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].unit.price;
          commission = commission - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].amount.commission;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = commission;

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = refreshRemainAmount;

        }
      }

      updateQuery["requests." + String(requestIndex) + ".info"] = equalJson(JSON.stringify(infoCopied));
      updateQuery["requests." + String(requestIndex) + ".cancel"] = cancelArr;
      updateQuery["requests." + String(requestIndex) + ".proofs"] = proofsArr;
      updateQuery["requests." + String(requestIndex) + ".status"] = status;

      if (/홈리에종 계약금/gi.test(thisBill.requests[requestIndex].name) || /홈리에종 잔금/gi.test(thisBill.requests[requestIndex].name)) {
        projectUpdateQuery["process.contract." + (/계약/gi.test(thisBill.requests[requestIndex].name) ? "first" : "remain") + ".cancel"] = now;
        projectUpdateQuery["process.contract." + (/계약/gi.test(thisBill.requests[requestIndex].name) ? "first" : "remain") + ".calculation.refund"] = allCancelPrice;
        projectUpdateQuery["process.contract.form.date.cancel"] = now;
      }

      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
      resultObj.pastProject = resultObj.project;
      resultObj.project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    } else {
      resultObj = null;
      console.log("error : " + JSON.stringify(res.data, null, 2));
      await errorLog("error : " + JSON.stringify(res.data, null, 2));
    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return resultObj;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.cashRefund = async function (mode, bilid, requestIndex, payIndex, option = { selfMongo: null, selfCoreMongo: null }) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, cryptoString, requestSystem, ipCheck, equalJson, errorLog, autoComma, messageSend } = this.mother;
  try {
    let selfBoo;
    let selfCoreBoo;
    let thisBill;
    let thisRequest;
    let MONGOC, MONGOCOREC;
    let status;
    let whereQuery;
    let updateQuery;
    let projectWhereQuery;
    let projectUpdateQuery;
    let infoCopied;
    let thisData;
    let infoCopiedCopied;
    let originalPrice;
    let percentage, price;
    let infoCopiedUnshift;
    let slackMessage;
    let resultObj;
    let accountNumber;
    let bankName;
    let accountName;
    let cancelCopied, proofsCopied;
    let now;
    let proid;
    let client;
    let project;
    let firstResponse;
    let secondResponse;
    let firstResponseIndexItemIndex;
    let secondResponseIndexItemIndex;
    let num;
    let firstBoo;
    let remainBoo;
    let totalNumR0;
    let payNumR0;
    let cancelNumR0;
    let totalNumR1;
    let payNumR1;
    let cancelNumR1;
    let allCancelPrice;
    let refreshTotalAmountRaw;
    let classification;
    let calculate;
    let commission;
    let refreshTotalAmount;

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

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }
    if (thisBill.requests[requestIndex] === undefined) {
      throw new Error("invaild request index");
    }
    thisRequest = thisBill.requests[requestIndex];
    if (thisRequest.pay[payIndex] === undefined) {
      throw new Error("invaild pay index");
    }

    infoCopied = thisRequest.info.toNormal();
    infoCopiedCopied = equalJson(JSON.stringify(infoCopied));
    infoCopiedCopied = infoCopiedCopied.filter((obj) => {
      return (typeof obj.data === "object");
    }).filter((obj) => {
      return (obj.data.mid !== undefined && obj.data.tid !== undefined && obj.data.TotPrice !== undefined && obj.data.MOID !== undefined);
    });
    thisData = infoCopiedCopied.find((obj) => {
      return obj.data.MOID === thisRequest.pay[payIndex].oid;
    });
    if (thisData === undefined) {
      throw new Error("invaild oid data");
    }
    originalPrice = Number(thisData.data.TotPrice.replace(/[^0-9\.\-]/gi, ''));

    if (typeof option.percentage === "number") {
      percentage = option.percentage;
    } else {
      percentage = 100;
    }

    price = Math.floor((originalPrice * (percentage / 100)) / 10) * 10;

    if (typeof option.refundPrice === "number") {
      price = Math.floor(option.refundPrice);
      percentage = Math.floor(((option.refundPrice / originalPrice) * 100) * 100) / 100;
    }

    accountNumber = option.accountNumber;
    bankName = option.bankName;
    accountName = option.accountName;

    resultObj = { message: "success" };

    if (mode === "request") {

      infoCopiedUnshift = equalJson(JSON.stringify(infoCopied));
      infoCopiedUnshift.unshift({
        key: "refundReceipt",
        oid: thisRequest.pay[payIndex].oid,
        data: {
          original: originalPrice,
          refund: price,
          info: { accountNumber, bankName, accountName }
        }
      });

      whereQuery = { bilid };
      updateQuery = {};
      status = "환불 요청";

      updateQuery["requests." + String(requestIndex) + ".status"] = status;
      updateQuery["requests." + String(requestIndex) + ".info"] = infoCopiedUnshift;

      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      slackMessage = [
        thisBill.participant.customer.name + " 고객님, ",
        thisBill.participant.designer.name + " 디자이너님 현장의 ",
        thisRequest.name + " ",
        String(percentage) + "% 환불을 ",
        "요청합니다! => ",
        autoComma(price) + "원 환불",
      ].join("");
      messageSend({ text: slackMessage, channel: "#700_operation", voice: true }).catch((err) => { console.log(err); });

      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });

    } else if (mode === "execute") {

      proid = thisBill.links.proid;

      client = await back.getClientById(thisBill.links.cliid, { selfMongo: MONGOCOREC });
      project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

      whereQuery = { bilid };
      updateQuery = {};
      status = (percentage !== 100 ? "부분 환불" : "전체 환불");

      cancelCopied = equalJson(JSON.stringify(thisRequest.cancel.toNormal()));
      proofsCopied = equalJson(JSON.stringify(thisRequest.proofs.toNormal()));

      now = new Date();

      cancelCopied.unshift({
        date: now,
        amount: price,
        oid: thisRequest.pay[payIndex].oid
      });

      proofsCopied.unshift({
        date: now,
        method: "계좌 이체 취소",
        proof: "현금영수증",
        to: thisBill.participant.customer.name
      });

      updateQuery["requests." + String(requestIndex) + ".status"] = status;
      updateQuery["requests." + String(requestIndex) + ".cancel"] = cancelCopied;
      updateQuery["requests." + String(requestIndex) + ".proofs"] = proofsCopied;

      // project update
      if (/홈리에종 계약금/gi.test(thisRequest.name) || /홈리에종 잔금/gi.test(thisRequest.name)) {

        firstResponse = null;
        secondResponse = null;
        firstResponseIndexItemIndex = null;
        secondResponseIndexItemIndex = null;
        num = 0;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
            firstResponseIndex = num;
            break;
          }
          num++;
        }
        num = 0;
        for (let item of thisBill.responses[firstResponseIndex].items) {
          if (item.class === "designerFeeFirst") {
            firstResponseIndexItemIndex = num;
          }
          num++;
        }
        num = 0;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
            secondResponseIndex = num;
            break;
          }
          num++;
        }
        num = 0;
        for (let item of thisBill.responses[secondResponseIndex].items) {
          if (item.class === "designerFeeRemain") {
            secondResponseIndexItemIndex = num;
          }
          num++;
        }

        firstBoo = false;
        remainBoo = false;
        totalNumR0 = 0;
        for (let { amount: { pure } } of firstResponse.items) {
          totalNumR0 += pure;
        }
        payNumR0 = 0;
        for (let { amount } of firstResponse.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of firstResponse.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of secondResponse.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of secondResponse.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));


        allCancelPrice = 0;
        for (let { amount } of cancelCopied) {
          allCancelPrice += amount;
        }

        refreshTotalAmountRaw = project.process.contract.remain.calculation.amount.supply - Math.round(allCancelPrice * (10 / 11));
        if (refreshTotalAmountRaw < 10) {
          refreshTotalAmountRaw = 0;
        }
        classification = project.process.calculation.method;
        [ calculate, commission ] = BillMaker.designerCalculation(refreshTotalAmountRaw, classification, project.process.calculation.percentage, client, { toArray: true });
        refreshTotalAmount = Math.floor(calculate / 10) * 10;


        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        if (!firstBoo && !remainBoo) {

          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.first.amount"] = (refreshTotalAmount / 2);
          projectUpdateQuery["process.calculation.payments.remain.amount"] = (refreshTotalAmount / 2);

        } else {

          refreshRemainAmount = refreshTotalAmount - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].unit.price;
          commission = commission - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].amount.commission;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = commission;

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = refreshRemainAmount;

        }

        if (/홈리에종 계약금/gi.test(thisRequest.name)) {
          projectUpdateQuery["process.contract.first.cancel"] = now;
          projectUpdateQuery["process.contract.first.calculation.refund"] = price;
        } else if (/홈리에종 잔금/gi.test(thisRequest.name)) {
          projectUpdateQuery["process.contract.remain.cancel"] = now;
          projectUpdateQuery["process.contract.remain.calculation.refund"] = price;
        }
        projectUpdateQuery["process.contract.form.date.cancel"] = now;

        await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      }

      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
      resultObj.bilid = resultObj.bill.bilid;
      resultObj.proid = project.proid;
      resultObj.cliid = project.cliid;
      resultObj.desid = resultObj.bill.links.desid;
      resultObj.project = project;
      resultObj.client = client;
      resultObj.price = {};
      resultObj.price.refund = price;
      resultObj.price.original = originalPrice;
      resultObj.price.percentage = percentage;

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return resultObj;

  } catch (e) {
    console.log(e);
    return { message: "error : " + e.message };
  }
}

BillMaker.prototype.contractCancel = async function (bilid, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof bilid !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongopythoninfo, mongoinfo, requestSystem, ipCheck, equalJson } = this.mother;
  const now = new Date();
  const designerCancel = BillMaker.billDictionary.styling.etc.designerCancel;
  try {
    let response;
    let thisBill, thisData;
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let whereQuery, updateQuery;
    let resultObj;
    let project;
    let projectWhereQuery, projectUpdateQuery;
    let firstBoo, remainBoo;
    let firstResponse, secondResponse;
    let firstResponseIndex, secondResponseIndex;
    let firstResponseIndexItemIndex, secondResponseIndexItemIndex;
    let num;
    let tempObj;
    let cancelItem;
    let designer;
    let designerCancelObject;
    let classification;
    let designerCancelCalculate;

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

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    firstResponse = null;
    secondResponse = null;
    firstResponseIndexItemIndex = null;
    secondResponseIndexItemIndex = null;
    num = 0;
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
        firstResponse = res;
        firstResponseIndex = num;
        break;
      }
      num++;
    }
    num = 0;
    for (let item of thisBill.responses[firstResponseIndex].items) {
      if (item.class === "designerFeeFirst") {
        firstResponseIndexItemIndex = num;
      }
      num++;
    }
    num = 0;
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
        secondResponse = res;
        secondResponseIndex = num;
        break;
      }
      num++;
    }
    num = 0;
    for (let item of thisBill.responses[secondResponseIndex].items) {
      if (item.class === "designerFeeRemain") {
        secondResponseIndexItemIndex = num;
      }
      num++;
    }
    if (firstResponse === null || secondResponse === null || firstResponseIndexItemIndex === null || secondResponseIndexItemIndex === null) {
      throw new Error("invaild response structure");
    }

    project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    classification = designer.information.business.businessInfo.classification;

    //report
    resultObj = { bilid };
    resultObj.bill = thisBill;
    resultObj.proid = project.proid;
    resultObj.cliid = project.cliid;
    resultObj.desid = thisBill.links.desid;
    resultObj.project = project;

    whereQuery = { bilid };
    updateQuery = {};
    projectWhereQuery = { proid: project.proid };
    projectUpdateQuery = {};

    cancelItem = this.returnBillDummies("responseItems");

    designerCancelObject = equalJson(JSON.stringify(designerCancel));
    [ designerCancelCalculate ] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });
    designerCancelObject.unit.price = designerCancelCalculate;
    designerCancelObject.amount.pure = designerCancelCalculate;
    designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;

    cancelItem.id = thisBill.bilid + designerCancelObject.id;
    cancelItem.class = designerCancelObject.class;
    cancelItem.name = designerCancelObject.name;
    cancelItem.description = designerCancelObject.description;
    cancelItem.unit = designerCancelObject.unit;
    cancelItem.amount = designerCancelObject.amount;

    updateQuery["responses." + String(firstResponseIndex) + ".items"] = [ cancelItem ];
    updateQuery["responses." + String(firstResponseIndex) + ".comments"] = designerCancelObject.comments;
    updateQuery["responses." + String(secondResponseIndex) + ".removal"] = now;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = 0;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = 0;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = 0;

    projectUpdateQuery["process.contract.first.cancel"] = now;
    projectUpdateQuery["process.contract.form.date.cancel"] = now;
    projectUpdateQuery["process.calculation.payments.totalAmount"] = designerCancelObject.amount.pure;
    projectUpdateQuery["process.calculation.payments.first.amount"] = designerCancelObject.amount.pure;
    projectUpdateQuery["process.calculation.payments.remain.amount"] = 0;

    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
    await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

    resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
    resultObj.pastProject = resultObj.project;
    resultObj.project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return resultObj;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.constructInjection = async function (bilid, buiid, amountObject, option = { selfMongo: null, selfCoreMongo: null }) {
  if (typeof bilid !== "string" || typeof buiid !== "string" || typeof amountObject !== "object") {
    throw new Error("invaild input");
  }
  if (typeof amountObject.first !== "number" || typeof amountObject.start !== "number" || typeof amountObject.middle !== "number" || typeof amountObject.remain !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo, equalJson, sleep } = this.mother;
  try {
    const { first, start, middle, remain } = amountObject;
    let thisBill;
    let selfBoo, selfCoreBoo;
    let MONGOC, MONGOCOREC;
    let client, designer, project;
    let builder;

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

    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }
    const { cliid, desid, proid, method } = thisBill.links;
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    builder = await back.getBuilderById(buiid, { selfMongo: MONGOCOREC });

    if (first !== 0) {
      await this.requestInjection(bilid, "constructFirst", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
      // await this.responseInjection(bilid, "firstConstructFee", client, designer, project, method, { customAmount: amountObject, consumerMode: true, customSub: { builder }, selfMongo: MONGOC });
    }
    if (start !== 0) {
      await this.requestInjection(bilid, "constructStart", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
      // await this.responseInjection(bilid, "startConstructFee", client, designer, project, method, { customAmount: amountObject, consumerMode: true, customSub: { builder }, selfMongo: MONGOC });
    }
    if (middle !== 0) {
      await this.requestInjection(bilid, "constructMiddle", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
      // await this.responseInjection(bilid, "middleConstructFee", client, designer, project, method, { customAmount: amountObject, consumerMode: true, customSub: { builder }, selfMongo: MONGOC });
    }
    if (remain !== 0) {
      await this.requestInjection(bilid, "constructRemain", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
      // await this.responseInjection(bilid, "remainConstructFee", client, designer, project, method, { customAmount: amountObject, consumerMode: true, customSub: { builder }, selfMongo: MONGOC });
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.taxBill = async function (indexArr) {
  if (!Array.isArray(indexArr)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo, fileSystem, shellExec, shellLink, pythonExecute, requestSystem, decryptoHash, autoComma, messageLog, messageSend, errorLog, curlRequest, equalJson, zeroAddition } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  const human = new HumanPacket();
  try {
    await MONGOLOCALC.connect();
    const selfMongo = MONGOLOCALC;

    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const mailBoxName = "mailBox";
    const moduleName = "getMail.py";
    const areaToken = "____split____";
    const returnToken = "____return____";
    const nameToken = "____name____";
    const targetEmail = "hometaxadmin@hometax.go.kr";
    const collection = "taxBill";

    const { dir, mapDir } = this;
    const host = this.address.frontinfo.host;
    const today = new Date();

    const map = require(`${mapDir}/${collection}.js`);
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

    let id0, password0;
    let id1, password1;
    let mailBoxDir;
    let finalScript;
    let res;
    let mailTargets;
    let raw;
    let rawArr;
    let html;
    let search;
    let localScript;
    let res2;
    let newHtml;
    let dom;
    let finalText;
    let textArr;
    let spotTargets;
    let resultObj;
    let tempArr;
    let itemStart;
    let itemEnd;
    let startNums;
    let orderArr;
    let items;
    let supplySum;
    let vatSum;
    let tempObj;
    let minus;
    let tempNum;
    let rows;
    let num;
    let resultObjTong;
    let finalRows;
    let newMail;

    id0 = "help";
    password0 = "hlofwis83!";

    [ newMail ] = await human.getMails(id0, password0, indexArr);

    if ((new RegExp(targetEmail, "gi")).test(newMail.from)) {

      html = Buffer.from(newMail.data.raw.map((str) => { return str === '' ? areaToken : str }).join(returnToken).split(areaToken).filter((str) => { return str !== returnToken })[5].split(returnToken).join(""), "base64").toString("utf8");
      search = [ ...html.matchAll(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi) ];

      localScript = '';
      for (let arr of search) {
        res2 = await curlRequest(arr[1]);
        localScript += res2;
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
      resultObj.make(textArr[2], newMail.date);

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

      finalRows = await back.mongoRead(collection, { id: resultObj.id }, { selfMongo });
      if (finalRows.length === 0) {
        await back.mongoCreate(collection, resultObj, { selfMongo });
        console.log("mongo insert");
        await messageSend({ text: resultObj.toMessage(), channel: "#701_taxbill" });
      }

    } else {
      throw new Error("invail index arr");
    }

  } catch (e) {
    await errorLog(e.message);
    console.log(e);
  } finally {
    await MONGOLOCALC.close();
    await errorLog("taxBill done : " + JSON.stringify(new Date()));
  }
}

BillMaker.prototype.parsingCashReceipt = async function (noHeadlessMode = false) {
  const instance = this;
  const address = this.address;
  const { errorLog, emergencyAlarm, dateToString, stringToDate, equalJson, requestSystem } = this.mother;
  const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
  const xmlParser = require("xml2json");
  try {
    const chrome = new GoogleChrome();
    const frontResult = await chrome.scriptChain([
      {
        link: "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
        func: async function () {
          try {
            const idLoginButtonId = "anchor15";
            const returnButtonId = "anchor25";
            const inputs = {
              id: "iptUserId",
              pwd: "iptUserPw"
            };
            while (document.getElementById(idLoginButtonId) === null) {
              await sleep(500);
            }
            document.getElementById(idLoginButtonId).click();
  
            document.getElementById(inputs.id).value = INFO.officeinfo.hometax.user;
            document.getElementById(inputs.pwd).value = INFO.officeinfo.hometax.password;
            document.getElementById(returnButtonId).click();
  
            return 1;
          } catch (e) {
            return 0;
          }
        },
      },
      {
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml",
        func: async function () {
          try {
            const actionId = "ATECRCBA001R03";
            const screenId = "UTECRCB013";
            const pageInfoId = "pageInfoVO";
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, '');
            const pblClCd = "all";
            const tinNumber = INFO.officeinfo.hometax.tin;
            const fromDate = new Date();
            const toDate = new Date();
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };

            fromDate.setMonth(fromDate.getMonth() - 1);
            fromDate.setDate(1);

            const res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers,
              body: `<map id="${actionId}">
              <sumTotaTrsAmt/><tin>${tinNumber}</tin><txprDscmNo/>
              <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
              <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
              <pblClCd>${pblClCd}</pblClCd>
              </map>`
            });

            const text = await res.text();
            const xml = (new window.DOMParser()).parseFromString(text, "text/xml");
            const pageSize = Number(xml.querySelector("pageSize") === null ? 10 : xml.querySelector("pageSize").textContent);
            const countArr = [ ...xml.querySelectorAll("totalCount") ].map((dom) => { return Number(dom.textContent) }).filter((n) => { return n !== 0 && !Number.isNaN(n) });
            countArr.sort((a, b) => { return b - a });
            const [ totalCount ] = countArr.length > 0 ? countArr : [ 0 ];
            const length = Math.ceil(totalCount / pageSize);
            let thisResponse;
            let thisText;
            let xmlArr;

            xmlArr = [];
            for (let i = 0; i < length; i++) {
              thisResponse = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
                method: "POST",
                headers,
                body: `<map id="${actionId}">
                <sumTotaTrsAmt/>
                <tin>${tinNumber}</tin>
                <txprDscmNo/>
                <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
                <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
                <pblClCd>${pblClCd}</pblClCd>
                <map id="${pageInfoId}">
                <pageSize>${String(pageSize)}</pageSize>
                <pageNum>${String(i + 1)}</pageNum>
                <totalCount>${String(totalCount)}</totalCount>
                </map></map>`,
              });
              thisText = await thisResponse.text();
              xmlArr.push(thisText);
            }

            return xmlArr;
          } catch (e) {
            return "error : " + e.message;
          }
        }
      },
      {
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml",
        func: async function () {
          try {
            const actionId = "ATECRCBA001R02";
            const screenId = "UTECRCB005";
            const pageInfoId = "pageInfoVO";
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, '');
            const spjbTrsYn = "all";
            const pubcUserNo = "all";
            const spstCnfrId = "all";
            const tinNumber = INFO.officeinfo.hometax.tin;
            const fromDate = new Date();
            const toDate = new Date();
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };

            fromDate.setMonth(fromDate.getMonth() - 1);
            fromDate.setDate(1);

            const res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers,
              body: `<map id="${actionId}">
              <tin>${tinNumber}</tin>
              <spjbTrsYn>${spjbTrsYn}</spjbTrsYn>
              <pubcUserNo>${pubcUserNo}</pubcUserNo>
              <spstCnfrId>${spstCnfrId}</spstCnfrId>
              <sumTotaTrsAmt/>
              <mrntTxprDscmNoEncCntn/>
              <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
              <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
              <txprDscmNo>${txprDscmNo}</txprDscmNo>
              </map>`
            });

            const text = await res.text();
            const xml = (new window.DOMParser()).parseFromString(text, "text/xml");
            const pageSize = Number(xml.querySelector("pageSize") === null ? 10 : xml.querySelector("pageSize").textContent);
            const countArr = [ ...xml.querySelectorAll("totalCount") ].map((dom) => { return Number(dom.textContent) }).filter((n) => { return n !== 0 && !Number.isNaN(n) });
            countArr.sort((a, b) => { return b - a });
            const [ totalCount ] = countArr.length > 0 ? countArr : [ 0 ];
            const length = Math.ceil(totalCount / pageSize);
            let thisResponse;
            let thisText;
            let xmlArr;

            xmlArr = [];
            for (let i = 0; i < length; i++) {
              thisResponse = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
                method: "POST",
                headers,
                body: `<map id="${actionId}">
                <tin>${tinNumber}</tin>
                <spjbTrsYn>${spjbTrsYn}</spjbTrsYn>
                <pubcUserNo>${pubcUserNo}</pubcUserNo>
                <spstCnfrId>${spstCnfrId}</spstCnfrId>
                <sumTotaTrsAmt/>
                <mrntTxprDscmNoEncCntn/>
                <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
                <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
                <txprDscmNo>${txprDscmNo}</txprDscmNo>
                <map id="${pageInfoId}">
                <pageSize>${String(pageSize)}</pageSize>
                <pageNum>${String(i + 1)}</pageNum>
                <totalCount>${String(totalCount)}</totalCount>
                </map></map>`,
              });
              thisText = await thisResponse.text();
              xmlArr.push(thisText);
            }

            return xmlArr;
          } catch (e) {
            return "error : " + e.message;
          }
        }
      }
    ], 2500, {}, noHeadlessMode);
    if (!Array.isArray(frontResult)) {
      throw new Error(frontResult.message);
    }
    const [ one, outXml, inXml ] = frontResult;
    if (!Array.isArray(outXml)) {
      throw new Error(outXml);
    }
    if (!Array.isArray(inXml)) {
      throw new Error(inXml);
    }
    const outObject = outXml.map((text) => {
      return JSON.parse(xmlParser.toJson(text));
    })
    const outList = [];
    for (let obj of outObject) {
      if (Array.isArray(obj.map.list.map)) {
        for (let obj2 of obj.map.list.map) {
          outList.push(obj2);
        }
      } else {
        outList.push(obj.map.list.map);
      }
    }
    const inObject = inXml.map((text) => {
      return JSON.parse(xmlParser.toJson(text));
    })
    const inList = [];
    for (let obj of inObject) {
      if (Array.isArray(obj.map.list.map)) {
        for (let obj2 of obj.map.list.map) {
          inList.push(obj2);
        }
      } else {
        inList.push(obj.map.list.map);
      }
    }
    let outMiddle, inMiddle;

    outMiddle = [];
    for (let obj of outList) {
      outMiddle.push({
        method: obj.pblClCd,
        time: stringToDate(obj.trsDtm.trim()),
        supply: Number(obj.splCft),
        vat: Number(obj.vaTxamt),
        service: Number(obj.tip),
        total: Number(obj.totaTrsAmt),
        id: obj.aprvNo,
        issuance: obj.spstCnfrPartNo,
        deal: /승인/gi.test(obj.trsClNm),
        etc: obj.cshptUsgClNm,
      });
    }

    inMiddle = [];
    for (let obj of inList) {
      inMiddle.push({
        time: stringToDate(obj.trsDtTime.trim()),
        business: obj.mrntTxprDscmNoEncCntn,
        from: obj.mrntTxprNm,
        item: obj.itmNm,
        supply: Number(obj.splCft),
        vat: Number(obj.vaTxamt),
        service: Number(obj.tip),
        total: Number(obj.totaTrsAmt),
        id: obj.aprvNo,
        issuance: obj.spstCnfrPartNo,
        deal: /승인/gi.test(obj.trsClNm),
        etc: obj.prhTxamtDdcClNm,
      });
    }

    await requestSystem("https://" + address.pythoninfo.host + ":3000/cashReceipt", { json: JSON.stringify({ cashOut: [ outMiddle ] }) }, { headers: { "Content-Type": "application/json" } });
    await requestSystem("https://" + address.pythoninfo.host + ":3000/cashReceipt", { json: JSON.stringify({ cashIn: [ inMiddle ] }) }, { headers: { "Content-Type": "application/json" } });

    return true;

  } catch (e) {
    await emergencyAlarm("cashReceipt fail : " + e.message + " / " + JSON.stringify(new Date()));
    console.log(e);
    return false;
  }
}

BillMaker.prototype.issueCashReceipt = async function (amount, phone) {
  const instance = this;
  const address = this.address;
  const { errorLog, emergencyAlarm, dateToString, stringToDate, equalJson, requestSystem } = this.mother;
  const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
  const xmlParser = require("xml2json");
  try {
    const chrome = new GoogleChrome();
    const frontResult = await chrome.scriptChain([
      {
        link: "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
        func: async function () {
          try {
            const idLoginButtonId = "anchor15";
            const returnButtonId = "anchor25";
            const inputs = {
              id: "iptUserId",
              pwd: "iptUserPw"
            };
            while (document.getElementById(idLoginButtonId) === null) {
              await sleep(500);
            }
            document.getElementById(idLoginButtonId).click();
  
            document.getElementById(inputs.id).value = INFO.officeinfo.hometax.user;
            document.getElementById(inputs.pwd).value = INFO.officeinfo.hometax.password;
            document.getElementById(returnButtonId).click();
  
            return 1;
          } catch (e) {
            return 0;
          }
        },
      },
      {
        link: "https://tecr.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/cr/c/b/UTECRCB041.xml",
        func: async function () {
          try {
            const actionId = "ATECRCBA003C01";
            const screenId = "UTECRCB041";
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, '');
            const tinNumber = INFO.officeinfo.hometax.tin;
            const mapId = "cshptIsfIsnPubcDVO";
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };
            let res, amount;
            let phone;
            let supply, vat;
            let time, date;
            let now;
            let tip;

            amount = TONG.amount;
            supply = Math.ceil(amount / 1.1);
            vat = amount - supply;
            phone = TONG.phone;
            tip = 0;
            now = GeneralJs.dateToString(new Date(), true);
            date = now.split(" ")[0].replace(/[^0-9]/gi, '');
            time = now.split(" ")[1].replace(/[^0-9]/gi, '');

            res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers: headers,
              body: `
              <map id="${actionId}">
              <bmanTin/><tin>${tinNumber}</tin>
              <cshptTrsTypeCd>01</cshptTrsTypeCd>
              <map id="${mapId}">
              <cshptUsgClCd>0</cshptUsgClCd>
              <spstCnfrClCd>03</spstCnfrClCd>
              <trsDt>${date}</trsDt>
              <trsTime>${time}</trsTime>
              <cshptInptClCd>1</cshptInptClCd>
              <tip>${String(tip)}</tip>
              <spstCnfrNoEncCntn>${phone.replace(/[^0-9]/gi, '')}</spstCnfrNoEncCntn>
              <rcprTin></rcprTin>
              <totaTrsAmt>${String(amount)}</totaTrsAmt>
              <splCft>${String(supply)}</splCft>
              <vaTxamt>${String(vat)}</vaTxamt>
              <trsClCd>0</trsClCd>
              <cshptIsnMmoCntn></cshptIsnMmoCntn></map></map>`
            });
            const text = await res.text();
            return (/발급/gi.test(text) && /완료/gi.test(text));
          } catch (e) {
            console.log(e);
          }
        }
      }
    ], 2500, { amount, phone });

    if (!Array.isArray(frontResult)) {
      throw new Error("issue cash receipt fail");
    }
    if (frontResult.length <= 1) {
      throw new Error("issue cash receipt fail");
    }

    return frontResult[1];
  } catch (e) {
    await emergencyAlarm("issue cashReceipt fail : " + e.message + " / " + JSON.stringify(new Date()));
    console.log(e);
    return false;
  }
}

module.exports = BillMaker;
