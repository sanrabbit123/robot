/**
 * @class ProposalTong
 * @description 제안 및 계약 정보를 관리하는 클래스입니다. 이 클래스는 디자이너별로 제안과 계약 정보를 구조화하여 제공합니다.
 */
class ProposalTong {
  /**
   * @property {Object} matrix
   * @description 디자이너별로 제안 및 계약 정보를 행렬 형태로 반환합니다.
   * @returns {Object} 디자이너 ID를 키로 하는 객체로, 각 디자이너의 제안 및 계약 정보를 포함합니다.
   */
  get matrix() {
    const dateToString = (dateObj) => { return `${String(dateObj.getFullYear()).slice(2)}년 ${String(dateObj.getMonth() + 1)}월 ${String(dateObj.getDate())}일`; }; // 날짜 객체를 "YY년 MM월 DD일" 형식의 문자열로 변환하는 함수입니다.
    const numberToWon = (num) => { return (String(Math.round(Math.round(num) / 10000)) + "만원"); }; // 숫자를 만원 단위로 변환하여 문자열로 반환하는 함수입니다.
    const numberToPyeong = (num) => { return (String(num) + "평"); }; // 숫자를 평수 단위로 변환하여 문자열로 반환하는 함수입니다.

    let temp, temp2, temp3; // 임시 변수를 선언합니다.

    temp3 = {}; // 최종적으로 반환할 객체를 초기화합니다.
    for (let desid in this) { // 객체의 모든 디자이너 ID에 대해 반복합니다.
      temp2 = []; // 각 디자이너의 제안 및 계약 정보를 담을 배열을 초기화합니다.
      temp2.push([ "디자이너명", "제안 횟수", "평균 금액", "제안 정보 =>", "제안 일자", "고객명", "고객 평수", "제안 금액", "계약 정보 =>", "계약 제안 일자", "고객명", "고객 평수", "제안 금액" ]); // 테이블의 헤더를 추가합니다.
      for (let i = 0; i < this[desid].proposal.length; i++) { // 각 디자이너의 제안 정보를 반복합니다.
        temp = []; // 제안 정보를 담을 임시 배열을 초기화합니다.
        if (i === 0) { // 첫 번째 제안인 경우 디자이너명과 제안 횟수, 평균 금액을 추가합니다.
          temp.push(this[desid].designer); // 디자이너명을 추가합니다.
          temp.push(this[desid].report.proposal.numberString); // 제안 횟수를 추가합니다.
          temp.push(this[desid].report.proposal.averageString); // 평균 금액을 추가합니다.
        } else { // 첫 번째 제안이 아닌 경우 빈 칸을 추가합니다.
          temp.push("");
          temp.push("");
          temp.push("");
        }

        temp.push("-"); // 제안 정보 구분자를 추가합니다.
        temp.push(dateToString(this[desid].proposal[i].date)); // 제안 일자를 추가합니다.
        temp.push(this[desid].proposal[i].client); // 고객명을 추가합니다.
        temp.push(numberToPyeong(this[desid].proposal[i].pyeong)); // 고객 평수를 추가합니다.
        temp.push(numberToWon(this[desid].proposal[i].fee)); // 제안 금액을 추가합니다.

        if (this[desid].contract[i] !== undefined) { // 계약 정보가 있는 경우
          temp.push("-"); // 계약 정보 구분자를 추가합니다.
          temp.push(dateToString(this[desid].contract[i].date)); // 계약 제안 일자를 추가합니다.
          temp.push(this[desid].contract[i].client); // 고객명을 추가합니다.
          temp.push(numberToPyeong(this[desid].contract[i].pyeong)); // 고객 평수를 추가합니다.
          temp.push(numberToWon(this[desid].contract[i].fee)); // 계약 제안 금액을 추가합니다.
        } else { // 계약 정보가 없는 경우 빈 칸을 추가합니다.
          temp.push("");
          temp.push("");
          temp.push("");
          temp.push("");
          temp.push("");
        }
        temp2.push(temp); // 임시 배열을 디자이너별 배열에 추가합니다.
      }

      temp3[desid] = temp2; // 디자이너 ID를 키로 하여 최종 객체에 배열을 추가합니다.
    }

    return temp3; // 최종 객체를 반환합니다.
  }
}

/**
 * @class BackReport
 * @description 홈리에종과 협약한 디자이너들의 제안 및 계약 정보를 리포트로 만들기 위해 사용되는 클래스입니다.
 */
class BackReport {
  /**
   * @constructor
   * @description BackReport 클래스의 인스턴스를 초기화합니다.
   */
  constructor() {
    const Mother = require(process.cwd() + "/apps/mother.js"); // 현재 작업 디렉토리에서 Mother 클래스를 가져옵니다.
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // 현재 작업 디렉토리에서 BackMaker 클래스를 가져옵니다.
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 `this.mother`에 할당합니다.
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 `this.back`에 할당합니다.
    this.dir = process.cwd() + "/apps/backMaker"; // BackMaker 작업 디렉토리 경로를 설정합니다.
    this.mapDir = this.dir + "/map"; // 맵 디렉토리 경로를 설정합니다.
    this.pastDir = this.dir + "/intoMap"; // 과거 맵 디렉토리 경로를 설정합니다.
    this.tempDir = process.cwd() + "/temp"; // 임시 디렉토리 경로를 설정합니다.
    this.resourceDir = this.dir + "/resource"; // 리소스 디렉토리 경로를 설정합니다.
    this.aliveDir = this.dir + "/alive"; // 활성화된 작업 디렉토리 경로를 설정합니다.
    this.idFilterDir = this.dir + "/idFilter"; // ID 필터 디렉토리 경로를 설정합니다.
  }

  /**
   * @method getDesignerProposalReport
   * @description 홈리에종의 CX가 디자이너들을 얼마나 고객들에게 추천했는지를 분석하여 리포트로 만듭니다.
   * @param {Object} option - 설정 옵션 객체입니다.
   * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
   * @returns {Promise<Object>} 디자이너별 제안 및 계약 정보를 포함한 객체를 반환합니다.
   */
  async getDesignerProposalReport(option = { selfMongo: null }) {
    const instance = this; // `this`를 `instance` 변수에 할당하여 인스턴스에 접근할 수 있도록 합니다.
    const back = this.back; // `this.back`을 `back` 변수에 할당하여 BackMaker 인스턴스에 접근할 수 있도록 합니다.
    const { mongo, mongoinfo } = this.mother; // Mother 인스턴스에서 MongoDB 클라이언트와 연결 정보를 가져옵니다.
    const MONGOC = new mongo(mongoinfo); // MongoDB 클라이언트를 생성합니다.
    try {
      let selfBoo; // MongoDB 연결 상태를 확인하기 위한 변수를 선언합니다.
      if (option.selfMongo === null || option.selfMongo === undefined) { // selfMongo 옵션이 설정되지 않은 경우
        await MONGOC.connect(); // MongoDB에 연결합니다.
        option = { selfMongo: MONGOC, withTools: true }; // 옵션을 업데이트하여 MongoDB 인스턴스를 포함시킵니다.
        selfBoo = false; // MongoDB 연결을 새로 생성했음을 나타냅니다.
      } else { // selfMongo 옵션이 설정된 경우
        option = { selfMongo: option.selfMongo, withTools: true }; // 옵션을 업데이트하여 기존 MongoDB 인스턴스를 포함시킵니다.
        selfBoo = true; // 기존 MongoDB 인스턴스를 사용했음을 나타냅니다.
      }
  
      const projects = await back.getProjectsByQuery({}, option); // 모든 프로젝트 데이터를 가져옵니다.
      const clients = await back.getClientsByQuery({}, option); // 모든 고객 데이터를 가져옵니다.
      const designers = await back.getDesignersByQuery({}, option); // 모든 디자이너 데이터를 가져옵니다.
  
      let proposalTong, proposalTongObj; // 제안 정보를 저장할 변수를 선언합니다.
      let temp, temp2; // 임시 변수를 선언합니다.
  
      proposalTong = []; // 제안 정보를 저장할 배열을 초기화합니다.
      for (let p of projects) { // 모든 프로젝트에 대해 반복합니다.
        for (let { desid, fee } of p.proposal.detail) { // 각 프로젝트의 제안 세부 정보를 반복합니다.
          proposalTong.push({ desid, fee: fee[0].amount, date: p.proposal.date, cliid: p.cliid, contract: (desid === p.desid) }); // 제안 정보를 배열에 추가합니다.
        }
      }
  
      proposalTongObj = new ProposalTong(); // ProposalTong 클래스의 인스턴스를 생성합니다.
  
      for (let { desid, fee, date, cliid, contract } of proposalTong) { // 모든 제안 정보를 반복합니다.
        if (proposalTongObj[desid] === undefined) { // 해당 디자이너의 정보가 없으면 초기화합니다.
          proposalTongObj[desid] = {}; // 디자이너 정보를 저장할 객체를 초기화합니다.
          proposalTongObj[desid].designer = designers.search(desid).designer; // 디자이너 이름을 설정합니다.
          proposalTongObj[desid].proposal = []; // 제안 정보를 저장할 배열을 초기화합니다.
          proposalTongObj[desid].contract = []; // 계약 정보를 저장할 배열을 초기화합니다.
          proposalTongObj[desid].report = {}; // 보고서 정보를 저장할 객체를 초기화합니다.
          proposalTongObj[desid].report.proposal = {}; // 제안 보고서 정보를 초기화합니다.
          proposalTongObj[desid].report.contract = {}; // 계약 보고서 정보를 초기화합니다.
        }
        if (fee > 0) { // 제안 금액이 0보다 큰 경우
          proposalTongObj[desid].proposal.push({ fee, date, client: clients.search(cliid).name, pyeong: clients.search(cliid).requests[0].request.space.pyeong.value, unitPrice: Math.round(fee / clients.search(cliid).requests[0].request.space.pyeong.value) }); // 제안 정보를 추가합니다.
          if (contract) { // 계약이 체결된 경우
            proposalTongObj[desid].contract.push({ fee, date, client: clients.search(cliid).name, pyeong: clients.search(cliid).requests[0].request.space.pyeong.value, unitPrice: Math.round(fee / clients.search(cliid).requests[0].request.space.pyeong.value) }); // 계약 정보를 추가합니다.
          }
        }
      }
  
      for (let desid in proposalTongObj) { // 각 디자이너에 대해 반복합니다.
        proposalTongObj[desid].report.proposal.number = proposalTongObj[desid].proposal.length; // 제안 횟수를 설정합니다.
        temp = 0; // 제안 금액 총합을 초기화합니다.
        temp2 = 0; // 평당 단가 총합을 초기화합니다.
        for (let { fee, unitPrice } of proposalTongObj[desid].proposal) { // 각 제안 정보를 반복합니다.
          temp += fee; // 총 제안 금액에 더합니다.
          temp2 += unitPrice; // 총 평당 단가에 더합니다.
        }
        proposalTongObj[desid].report.proposal.average = Math.round(Math.round(temp / proposalTongObj[desid].report.proposal.number) / 10000) * 10000; // 제안 금액 평균을 계산합니다.
        proposalTongObj[desid].report.proposal.unitAverage = Math.round(Math.round(temp2 / proposalTongObj[desid].report.proposal.number) / 10000) * 10000; // 평당 단가 평균을 계산합니다.
        proposalTongObj[desid].report.proposal.numberString = String(proposalTongObj[desid].report.proposal.number) + "회"; // 제안 횟수를 문자열로 변환합니다.
        proposalTongObj[desid].report.proposal.averageString = String(proposalTongObj[desid].report.proposal.average / 10000) + "만원"; // 제안 금액 평균을 문자열로 변환합니다.
        proposalTongObj[desid].report.proposal.unitAverageString = String(proposalTongObj[desid].report.proposal.unitAverage / 10000) + "만원"; // 평당 단가 평균을 문자열로 변환합니다.
  
        proposalTongObj[desid].report.contract.number = proposalTongObj[desid].contract.length; // 계약 횟수를 설정합니다.
        temp = 0; // 계약 금액 총합을 초기화합니다.
        temp2 = 0; // 평당 단가 총합을 초기화합니다.
        for (let { fee, unitPrice } of proposalTongObj[desid].contract) { // 각 계약 정보를 반복합니다.
          temp += fee; // 총 계약 금액에 더합니다.
          temp2 += unitPrice; // 총 평당 단가에 더합니다.
        }
        proposalTongObj[desid].report.contract.average = Math.round(Math.round(temp / proposalTongObj[desid].report.contract.number) / 10000) * 10000; // 계약 금액 평균을 계산합니다.
        proposalTongObj[desid].report.contract.unitAverage = Math.round(Math.round(temp2 / proposalTongObj[desid].report.contract.number) / 10000) * 10000; // 평당 단가 평균을 계산합니다.
        proposalTongObj[desid].report.contract.numberString = String(proposalTongObj[desid].report.contract.number) + "회"; // 계약 횟수를 문자열로 변환합니다.
        proposalTongObj[desid].report.contract.averageString = String(proposalTongObj[desid].report.contract.average / 10000) + "만원"; // 계약 금액 평균을 문자열로 변환합니다.
        proposalTongObj[desid].report.contract.unitAverageString = String(proposalTongObj[desid].report.contract.unitAverage / 10000) + "만원"; // 평당 단가 평균을 문자열로 변환합니다.
      }
  
      if (!selfBoo) { // MongoDB 연결을 새로 생성한 경우
        await MONGOC.close(); // MongoDB 연결을 종료합니다.
      }
  
      return proposalTongObj; // 최종 결과 객체를 반환합니다.
  
    } catch (e) {
      console.log(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  }
}

module.exports = BackReport;