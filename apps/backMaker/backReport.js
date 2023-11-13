const BackReport = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/backMaker";
  const BackMaker = require(this.dir + "/backMaker.js");
  this.back = new BackMaker();
  this.mapDir = this.dir + "/map";
  this.pastDir = this.dir + "/intoMap";
  this.tempDir = process.cwd() + "/temp";
  this.resourceDir = this.dir + "/resource";
  this.aliveDir = this.dir + "/alive";
  this.idFilterDir = this.dir + "/idFilter";
}

BackReport.prototype.getDesignerProposalReport = async function (option = { selfMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  try {
    let selfBoo;
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.connect();
      option = { selfMongo: MONGOC, withTools: true };
      selfBoo = false;
    } else {
      option = { selfMongo: option.selfMongo, withTools: true };
      selfBoo = true;
    }

    class ProposalTong {
      get matrix() {
        let temp, temp2, temp3;

        temp3 = {};
        for (let desid in this) {
          temp2 = [];
          temp2.push([ "디자이너명", "제안 횟수", "평균 금액", "제안 정보 =>", "제안 일자", "고객명", "고객 평수", "제안 금액", "계약 정보 =>", "계약 제안 일자", "고객명", "고객 평수", "제안 금액" ]);
          for (let i = 0; i < this[desid].proposal.length; i++) {
            temp = [];
            if (i === 0) {
              temp.push(this[desid].designer);
              temp.push(this[desid].report.proposal.numberString);
              temp.push(this[desid].report.proposal.averageString);
            } else {
              temp.push("");
              temp.push("");
              temp.push("");
            }

            temp.push("-");
            temp.push(dateToString(this[desid].proposal[i].date));
            temp.push(this[desid].proposal[i].client);
            temp.push(numberToPyeong(this[desid].proposal[i].pyeong));
            temp.push(numberToWon(this[desid].proposal[i].fee));

            if (this[desid].contract[i] !== undefined) {
              temp.push("-");
              temp.push(dateToString(this[desid].contract[i].date));
              temp.push(this[desid].contract[i].client);
              temp.push(numberToPyeong(this[desid].contract[i].pyeong));
              temp.push(numberToWon(this[desid].contract[i].fee));
            } else {
              temp.push("");
              temp.push("");
              temp.push("");
              temp.push("");
              temp.push("");
            }
            temp2.push(temp);
          }

          temp3[desid] = temp2;
        }

        return temp3;
      }
    }

    const projects = await back.getProjectsByQuery({}, option);
    const clients = await back.getClientsByQuery({}, option);
    const designers = await back.getDesignersByQuery({}, option);
    const dateToString = (dateObj) => { return `${String(dateObj.getFullYear()).slice(2)}년 ${String(dateObj.getMonth() + 1)}월 ${String(dateObj.getDate())}일`; }
    const numberToWon = (num) => { return (String(Math.round(Math.round(num) / 10000)) + "만원"); }
    const numberToPyeong = (num) => { return (String(num) + "평"); }

    let proposalTong, proposalTongObj;
    let temp, temp2;
    let sheetsId, response, message;

    proposalTong = [];
    for (let p of projects) {
      for (let { desid, fee } of p.proposal.detail) {
        proposalTong.push({ desid, fee: fee[0].amount, date: p.proposal.date, cliid: p.cliid, contract: (desid === p.desid) });
      }
    }

    proposalTongObj = new ProposalTong();

    for (let { desid, fee, date, cliid, contract } of proposalTong) {
      if (proposalTongObj[desid] === undefined) {
        proposalTongObj[desid] = {};
        proposalTongObj[desid].designer = designers.search(desid).designer;
        proposalTongObj[desid].proposal = [];
        proposalTongObj[desid].contract = [];
        proposalTongObj[desid].report = {};
        proposalTongObj[desid].report.proposal = {};
        proposalTongObj[desid].report.contract = {};
      }
      if (fee > 0) {
        proposalTongObj[desid].proposal.push({ fee, date, client: clients.search(cliid).name, pyeong: clients.search(cliid).requests[0].request.space.pyeong.value, unitPrice: Math.round(fee / clients.search(cliid).requests[0].request.space.pyeong.value) });
        if (contract) {
          proposalTongObj[desid].contract.push({ fee, date, client: clients.search(cliid).name, pyeong: clients.search(cliid).requests[0].request.space.pyeong.value, unitPrice: Math.round(fee / clients.search(cliid).requests[0].request.space.pyeong.value) });
        }
      }
    }

    for (let desid in proposalTongObj) {
      proposalTongObj[desid].report.proposal.number = proposalTongObj[desid].proposal.length;
      temp = 0;
      temp2 = 0;
      for (let { fee, unitPrice } of proposalTongObj[desid].proposal) {
        temp += fee;
        temp2 += unitPrice;
      }
      proposalTongObj[desid].report.proposal.average = Math.round(Math.round(temp / proposalTongObj[desid].report.proposal.number) / 10000) * 10000;
      proposalTongObj[desid].report.proposal.unitAverage = Math.round(Math.round(temp2 / proposalTongObj[desid].report.proposal.number) / 10000) * 10000;
      proposalTongObj[desid].report.proposal.numberString = String(proposalTongObj[desid].report.proposal.number) + "회";
      proposalTongObj[desid].report.proposal.averageString = String(proposalTongObj[desid].report.proposal.average / 10000) + "만원";
      proposalTongObj[desid].report.proposal.unitAverageString = String(proposalTongObj[desid].report.proposal.unitAverage / 10000) + "만원";

      proposalTongObj[desid].report.contract.number = proposalTongObj[desid].contract.length;
      temp = 0;
      temp2 = 0;
      for (let { fee, unitPrice } of proposalTongObj[desid].contract) {
        temp += fee;
        temp2 += unitPrice;
      }
      proposalTongObj[desid].report.contract.average = Math.round(Math.round(temp / proposalTongObj[desid].report.contract.number) / 10000) * 10000;
      proposalTongObj[desid].report.contract.unitAverage = Math.round(Math.round(temp2 / proposalTongObj[desid].report.contract.number) / 10000) * 10000;
      proposalTongObj[desid].report.contract.numberString = String(proposalTongObj[desid].report.contract.number) + "회";
      proposalTongObj[desid].report.contract.averageString = String(proposalTongObj[desid].report.contract.average / 10000) + "만원";
      proposalTongObj[desid].report.contract.unitAverageString = String(proposalTongObj[desid].report.contract.unitAverage / 10000) + "만원";
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return proposalTongObj;

  } catch (e) {
    console.log(e);
  }
}

module.exports = BackReport;
