const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 가져옵니다.
const BackMaker = require(process.cwd()+ "/apps/backMaker/backMaker.js"); // BackMaker 모듈을 현재 경로에서 다시 불러옵니다.
const mother = new Mother();
const { errorLog, emergencyAlarm } = mother;

/**
 * @class BackWorker
 * @description 홈리에종의 핵심 데이터를 관리하고 다양한 보고서 작성, 디자이너 레벨링, 가격 선정 및 추천 작업을 수행하는 클래스입니다.
 */
class BackWorker {
  /**
   * @constructor
   * @description BackWorker 클래스의 인스턴스를 초기화합니다. 이 과정에서 여러 경로와 필요한 모듈들을 설정합니다.
   */
  constructor() {
    this.dir = process.cwd() + "/apps/backMaker"; // 현재 작업 디렉토리의 "apps/backMaker" 경로를 설정합니다.    
    this.address = require(process.cwd() + "/apps/infoObj.js"); // 고객 정보를 처리하는 모듈을 가져옵니다.
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 `this.mother`에 할당합니다.
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 `this.back`에 할당합니다.
    
    this.mapDir = this.dir + "/map"; // 맵 디렉토리 경로를 설정합니다.
    this.pastDir = this.dir + "/intoMap"; // 과거 맵 데이터 디렉토리 경로를 설정합니다.
    this.tempDir = process.cwd() + "/temp"; // 임시 파일을 저장할 디렉토리 경로를 설정합니다.
    this.resourceDir = this.dir + "/resource"; // 리소스 디렉토리 경로를 설정합니다.
    this.aliveDir = this.dir + "/alive"; // 활성 디렉토리 경로를 설정합니다.
    this.idFilterDir = this.dir + "/idFilter"; // ID 필터 디렉토리 경로를 설정합니다.
  }
}

/**
 * @async
 * @method setProposalToClient
 * @description 고객 데이터에 프로젝트 제안 기록을 연결하는 메서드입니다. 프로젝트의 아이디를 고객 데이터 내에 삽입하여 고객과 프로젝트 간의 관계를 설정합니다.
 * @param {Array<Date>} dateArray - 시작 및 종료 날짜를 포함하는 배열입니다. 예를 들어 [startDate, endDate] 형식입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<void>}
 */
BackWorker.prototype.setProposalToClient = async function (dateArray = [], option = { selfMongo: null }) {
  const instance = this; // 현재 인스턴스를 참조하기 위해 instance 변수에 this를 할당합니다.
  const back = this.back; // BackMaker 클래스 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 메서드와 mongoinfo 객체를 가져옵니다.

  try {
    // dateArray가 배열이 아닌 경우를 처리합니다.
    if (!Array.isArray(dateArray)) {
      // dateArray가 null 또는 undefined인 경우 빈 배열로 초기화합니다.
      if (dateArray === null || dateArray === undefined) {
        dateArray = [];
      } 
      // dateArray가 "cron"인 경우, 4개월 전부터 오늘까지의 날짜 범위를 설정합니다.
      else if (dateArray === "cron") {
        const today = new Date(); // 오늘 날짜를 생성합니다.
        const agoDay = new Date(); // 과거 날짜를 생성합니다.
        agoDay.setMonth(agoDay.getMonth() - 4); // 4개월 전의 날짜로 설정합니다.
        dateArray = [agoDay, today]; // 4개월 전부터 오늘까지의 날짜 배열을 만듭니다.
      } 
      // 그 외의 경우, 배열이 아니면 에러를 발생시킵니다.
      else {
        throw new Error("arguments must be array and [startDate, endDate]");
      }
    }

    let MONGOC; // MongoDB 연결 객체를 선언합니다.

    // option에 selfMongo가 설정되어 있지 않은 경우 새로운 MongoDB 연결을 생성합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo); // MongoDB 클라이언트를 생성합니다.
      await MONGOC.connect(); // MongoDB에 연결합니다.
    } 
    // 기존 MongoDB 연결이 있는 경우, 이를 사용합니다.
    else {
      MONGOC = option.selfMongo;
    }

    let searchQuery; // 검색 쿼리를 저장할 변수를 선언합니다.

    // 날짜 배열이 비어 있는 경우, 모든 데이터를 검색하기 위해 빈 쿼리를 설정합니다.
    if (dateArray.length === 0) {
      searchQuery = {};
    } 
    // 날짜 배열에 시작일과 종료일이 포함된 경우, 해당 기간 내의 요청을 검색합니다.
    else if (dateArray.length === 2) {
      searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": dateArray[0], "$lt": dateArray[1] } } } };
    } 
    // 날짜 배열이 잘못된 형식일 경우, 에러를 발생시킵니다.
    else {
      throw new Error("arguments must be array and [startDate, endDate]");
    }

    // 고객 데이터를 검색합니다.
    const clients = await back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: MONGOC });
    const allRequests = clients.getRequestsTong(); // 모든 요청 데이터를 가져옵니다.

    let projects, tempArr, matrix, timelines;
    let whereQuery, updateQuery;

    // 동기화 시작을 알리는 로그를 출력합니다.
    console.log(`\x1b[33m%s\x1b[0m`, `client-proposal sync start...`);
    console.log(``);

    // 각 고객에 대해 반복하여 처리합니다.
    for (let { cliid, requests } of clients) {
      // 고객 ID로 해당 고객의 프로젝트 데이터를 가져옵니다.
      projects = await back.getProjectsByQuery({ cliid }, { selfMongo: MONGOC });

      tempArr = []; // 임시 배열을 초기화합니다.

      // 각 프로젝트에 대해 반복하여 제안 정보를 임시 배열에 추가합니다.
      for (let p of projects) {
        tempArr.push({ proid: p.proid, date: p.proposal.date, contract: /^d/i.test(p.desid) });
      }
      whereQuery = { cliid }; // 고객 ID로 검색할 쿼리를 설정합니다.

      timelines = []; // 타임라인 배열을 초기화합니다.

      // 각 요청의 타임라인을 타임라인 배열에 추가합니다.
      for (let { request: { timeline } } of requests) {
        timelines.push(timeline);
      }

      // 타임라인이 하나만 있는 경우, 해당 타임라인에 제안 정보를 추가합니다.
      if (timelines.length === 1) {
        updateQuery = { "requests.0.analytics.proposal": tempArr };
      } 
      // 타임라인이 여러 개 있는 경우, 각 타임라인에 맞는 제안 정보를 추가합니다.
      else {
        updateQuery = {};
        matrix = [];
        for (let i = 0; i < timelines.length; i++) {
          if (i === 0) {
            matrix.unshift([]);
            for (let obj of tempArr) {
              if (obj.date.valueOf() >= timelines[i].valueOf()) {
                matrix[0].push(obj);
              }
            }
            updateQuery["requests." + String(i) + ".analytics.proposal"] = matrix[0];
          } else {
            matrix.unshift([]);
            for (let obj of tempArr) {
              if (obj.date.valueOf() >= timelines[i].valueOf() && obj.date.valueOf() < timelines[i - 1].valueOf()) {
                matrix[0].push(obj);
              }
            }
            updateQuery["requests." + String(i) + ".analytics.proposal"] = matrix[0];
          }
        }
      }

      // 고객 데이터를 업데이트합니다.
      await back.updateClient([whereQuery, updateQuery], { selfMongo: MONGOC });
    }

    // MongoDB 연결을 종료합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.close();
    }

  } catch (e) {
    // 에러가 발생하면 이를 로그에 출력합니다.
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * @async
 * @method aspirantToDesigner
 * @description 디자이너 신청자(aspirant)를 홈리에종의 협업 인테리어 디자이너로 변환하는 메서드입니다. 신청자의 정보를 바탕으로 새로운 디자이너로 등록합니다.
 * @param {Array<Object>} aspidArr - 지원자 ID와 계약 날짜가 포함된 객체 배열입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<void>}
 */
BackWorker.prototype.aspirantToDesigner = async function (aspidArr, option = { selfMongo: null }) {
  /**
   * @class AspidArr
   * @description 지원자 ID와 계약 날짜가 포함된 배열을 확장한 클래스입니다. 배열의 각 요소는 지원자 정보 객체입니다.
   */
  class AspidArr extends Array {
    /**
     * @constructor
     * @param {Array<Object>} arr - 지원자 ID와 계약 날짜가 포함된 객체 배열입니다.
     * @throws {Error} - 지원자 ID(aspid) 또는 계약 날짜(contract)가 누락된 경우 오류를 발생시킵니다.
     */
    constructor(arr) {
      super();
      for (let i of arr) {
        if (i.aspid === undefined || i.contract === undefined) {
          throw new Error("invalid aspid arr");
        }
        this.push(i); // 유효한 지원자 정보를 배열에 추가합니다.
      }
    }
    
    /**
     * @method search
     * @description 지원자 ID로 배열에서 해당 지원자의 계약 날짜를 검색합니다.
     * @param {string} aspid - 검색할 지원자 ID입니다.
     * @returns {Date|null} - 해당 지원자의 계약 날짜를 반환합니다. 찾지 못한 경우 null을 반환합니다.
     */
    search(aspid) {
      let target = null;
      for (let i of this) {
        if (aspid === i.aspid) {
          target = i.contract; // 지원자 ID가 일치하는 경우 해당 계약 날짜를 반환합니다.
          break;
        }
      }
      return target;
    }
  }

  const instance = this; // 현재 인스턴스를 참조하기 위해 instance 변수에 this를 할당합니다.
  const back = this.back; // BackMaker 인스턴스를 참조합니다.
  const { fileSystem, shell, shellLink, mongo, mongoinfo, messageSend, requestSystem, equalJson } = this.mother; // Mother 클래스의 여러 유틸리티 메서드를 가져옵니다.

  /**
   * @function toUpdateQuery
   * @description 지원자의 정보를 바탕으로 디자이너로 등록하기 위한 업데이트 쿼리를 생성합니다.
   * @param {Object} aspirant - 지원자 정보 객체입니다.
   * @param {Date} contractDay - 계약 날짜입니다.
   * @returns {Promise<Object|null>} - 생성된 업데이트 쿼리를 반환합니다. 필수 정보가 누락된 경우 null을 반환합니다.
   */
  const toUpdateQuery = async function(aspirant, contractDay) {
    const today = new Date(); // 현재 날짜를 today 변수에 저장합니다.
    const thisDesigner = aspirant.designer + " (" + aspirant.aspid + ")"; // 디자이너 이름과 지원자 ID를 조합한 문자열을 생성합니다.
    let updateQuery = {}; // 업데이트 쿼리를 저장할 객체를 초기화합니다.
    let snsObj, tempObj; // SNS 정보와 임시 객체를 저장할 변수를 선언합니다.

    updateQuery["designer"] = aspirant.designer; // 디자이너 이름을 업데이트 쿼리에 추가합니다.
    updateQuery["information.contract.date"] = contractDay; // 계약 날짜를 업데이트 쿼리에 추가합니다.

    // 전화번호가 없는 경우, 오류 메시지를 전송하고 null을 반환합니다.
    if (aspirant.phone === "" || aspirant.phone === undefined || aspirant.phone === null) {
      await messageSend({ text: thisDesigner + " 디자이너의 핸드폰 번호가 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.phone"] = aspirant.phone; // 전화번호를 업데이트 쿼리에 추가합니다.

    // 이메일이 없는 경우, 오류 메시지를 전송하고 null을 반환합니다.
    if (aspirant.email === "" || aspirant.email === undefined || aspirant.email === null) {
      await messageSend({ text: thisDesigner + " 디자이너의 이메일이 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.email"] = aspirant.email; // 이메일을 업데이트 쿼리에 추가합니다.

    // 주소가 없는 경우, 오류 메시지를 전송하고 null을 반환합니다.
    if (aspirant.address === "" || aspirant.address === undefined || aspirant.address === null) {
      await messageSend({ text: thisDesigner + " 디자이너의 주소가 없습니다!", channel: "#300_designer" });
      return null;
    }
    updateQuery["information.address"] = [aspirant.address]; // 주소를 업데이트 쿼리에 추가합니다.

    // 생년월일이 1920년 1월 1일 이후인 경우, 생년월일을 업데이트 쿼리에 추가합니다.
    if (aspirant.birth.valueOf() > (new Date(1920, 0, 1).valueOf())) {
      updateQuery["information.birth"] = new Date(JSON.stringify(aspirant.birth).slice(1, -1));
    }

    // 웹사이트와 SNS 정보를 업데이트 쿼리에 추가합니다.
    updateQuery["information.personalSystem.webPage"] = aspirant.information.channel.web;
    updateQuery["information.personalSystem.sns"] = [];
    for (let link of aspirant.information.channel.sns) {
      tempObj = {};
      tempObj.kind = "etc"; // 기본 SNS 종류를 '기타'로 설정합니다.
      if (/naver/gi.test(link)) {
        tempObj.kind = "Naver"; // 네이버 링크인 경우 종류를 'Naver'로 설정합니다.
      } else if (/insta/gi.test(link)) {
        tempObj.kind = "Instagram"; // 인스타그램 링크인 경우 종류를 'Instagram'으로 설정합니다.
      }
      tempObj.href = link; // 링크 URL을 추가합니다.
      updateQuery["information.personalSystem.sns"].push(tempObj); // SNS 정보를 업데이트 쿼리에 추가합니다.
    }

    // 경력 정보를 업데이트 쿼리에 추가합니다.
    if (aspirant.information.career.detail.length > 0 || aspirant.information.career.school.length > 0) {
      updateQuery["information.business.career.detail"] = equalJson(JSON.stringify(aspirant.information.career.detail));
      updateQuery["information.business.career.school"] = equalJson(JSON.stringify(aspirant.information.career.school));
    } 
    // 경력 정보가 없을 경우, 경력 시작 날짜를 계산하여 추가합니다.
    else {
      if (aspirant.information.career.styling.year === 0 && aspirant.information.career.styling.month === 0) {
        today.setMonth(today.getMonth() - ((aspirant.information.career.interior.year * 12) + aspirant.information.career.interior.month));
        updateQuery["information.business.career.startY"] = today.getFullYear();
        updateQuery["information.business.career.startM"] = today.getMonth() + 1;
      } else {
        today.setMonth(today.getMonth() - ((aspirant.information.career.styling.year * 12) + aspirant.information.career.styling.month));
        updateQuery["information.business.career.startY"] = today.getFullYear();
        updateQuery["information.business.career.startM"] = today.getMonth() + 1;
      }
    }

    // 계좌 정보가 없는 경우, 오류 메시지를 전송하고 null을 반환합니다.
    if (aspirant.information.account.number === "" || aspirant.information.account.number === null || aspirant.information.account.number === undefined) {
      await messageSend({ text: thisDesigner + " 디자이너의 계좌 번호가 없습니다!", channel: "#300_designer" });
      return null;
    }
    // 계좌 정보를 업데이트 쿼리에 추가합니다.
    updateQuery["information.business.account"] = [
      {
        bankName: aspirant.information.account.bank,
        accountNumber: aspirant.information.account.number,
        to: aspirant.information.account.to,
      }
    ];

    // 사업자 분류 및 사업자 번호를 업데이트 쿼리에 추가합니다.
    if (aspirant.information.company.classification === "" || aspirant.information.company.classification === null || aspirant.information.company.classification === undefined) {
      await messageSend({ text: thisDesigner + " 사업자 정보가 없습니다!", channel: "#300_designer" });
      return null;
    }
    // 사업자 분류에 따라 정보 추가
    if (/개인/gi.test(aspirant.information.company.classification)) {
      if (/일반/gi.test(aspirant.information.company.classification)) {
        updateQuery["information.business.businessInfo.classification"] = "개인사업자(일반)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      } else {
        updateQuery["information.business.businessInfo.classification"] = "개인사업자(간이)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      }
    } else if (/법인/gi.test(aspirant.information.company.classification)) {
      if (/일반/gi.test(aspirant.information.company.classification)) {
        updateQuery["information.business.businessInfo.classification"] = "법인사업자(일반)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      } else {
        updateQuery["information.business.businessInfo.classification"] = "법인사업자(간이)";
        updateQuery["information.business.businessInfo.businessNumber"] = aspirant.information.company.businessNumber;
      }
    } else {
      updateQuery["information.business.businessInfo.classification"] = "프리랜서";
      updateQuery["information.business.businessInfo.businessNumber"] = "";
    }

    // 디자이너 설정 초기화
    updateQuery["setting.description"] = [
      " ",
      " ",
      " "
    ];

    return updateQuery; // 최종적으로 생성된 업데이트 쿼리를 반환합니다.
  }

  try {
    // 입력된 aspidArr가 배열이 아닌 경우 오류를 발생시킵니다.
    if (!Array.isArray(aspidArr)) {
      throw new Error("argument must be aspid arr");
    }
    aspidArr = new AspidArr(aspidArr); // AspidArr 클래스의 인스턴스를 생성합니다.

    let MONGOC; // MongoDB 연결 객체를 선언합니다.
    
    // option에 selfMongo가 설정되어 있지 않은 경우 새로운 MongoDB 연결을 생성합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect(); // MongoDB에 연결합니다.
    } else {
      MONGOC = option.selfMongo; // 기존 MongoDB 연결을 사용합니다.
    }

    let whereQuery; // 지원자 검색을 위한 쿼리를 저장할 변수를 선언합니다.
    whereQuery = { "$or": [] }; // OR 조건으로 지원자들을 검색하기 위한 쿼리를 초기화합니다.
    for (let { aspid } of aspidArr) {
      whereQuery["$or"].push({ aspid }); // 각 지원자 ID를 OR 조건에 추가합니다.
    }

    const targetAspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: MONGOC }); // 지원자 정보를 가져옵니다.
    let aspirantJson, updateQuery, contractDay, newDesid, newDesigner, designerFolderResponse;

    // 각 지원자에 대해 반복하여 처리합니다.
    for (let aspirant of targetAspirants) {
      contractDay = aspidArr.search(aspirant.aspid); // 해당 지원자의 계약 날짜를 검색합니다.
      aspirantJson = aspirant.toNormal(); // 지원자 정보를 일반 객체로 변환합니다.
      updateQuery = await toUpdateQuery(aspirantJson, contractDay); // 지원자 정보를 바탕으로 업데이트 쿼리를 생성합니다.
      if (updateQuery !== null) {
        newDesid = await back.createDesigner(updateQuery, { selfMongo: MONGOC }); // 새로운 디자이너를 생성하고 ID를 반환받습니다.
        console.log("create designer success"); // 디자이너 생성 성공 로그를 출력합니다.
        newDesigner = await back.getDesignerById(newDesid, { selfMongo: MONGOC }); // 생성된 디자이너 정보를 가져옵니다.
        designerFolderResponse = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/designerFolder", { name: newDesigner.designer, subid: newDesigner.information.did }, { headers: { "Content-Type": "application/json" } })).data;
        designerFolderResponse.desid = newDesid; // 새로운 디자이너 ID를 폴더 응답 데이터에 추가합니다.
        designerFolderResponse.date = new Date(); // 현재 날짜를 추가합니다.
        console.log(designerFolderResponse); // 디자이너 폴더 응답 데이터를 로그에 출력합니다.
        await back.mongoCreate("folderDesigner", designerFolderResponse, { console: true }); // 디자이너 폴더 정보를 MongoDB에 저장합니다.
        await back.mongoCreate("realtimeDesigner", {
          desid: newDesid, // 새로운 디자이너 ID를 추가합니다.
          possible: [
            {
              start: new Date(2024, 6, 24), // 가능한 시작 날짜를 설정합니다.
              matrix: [ 1, 1, 1, 1, ], // 가능한 상태 매트릭스를 설정합니다.
              end: new Date(2034, 6, 24), // 가능한 종료 날짜를 설정합니다.
            }
          ],
          projects: [], // 초기 프로젝트 리스트를 빈 배열로 설정합니다.
        }, { console: true }); // 실시간 디자이너 정보를 MongoDB에 저장합니다.
      }
    }

    // MongoDB 연결을 종료합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.close();
    }

    /**
     * @function compileFrontDesidScript
     * @description 새로운 디자이너 ID를 프론트엔드에서 사용할 수 있도록 스크립트를 컴파일합니다.
     * @param {string} newDesid - 새로운 디자이너 ID입니다.
     * @returns {Promise<void>}
     */
    const compileFrontDesidScript = async function(newDesid) {
      try {
        const target = `${process.cwd()}/apps/backMaker/idFilter/designer.js`; // 디자이너 ID 필터 스크립트 경로를 설정합니다.
        
        // 숫자를 세 자리 문자열로 변환하는 함수입니다. 예를 들어, 5는 "005"로 변환됩니다.
        const hundredString = function(number) {
          if (number > 99) {
            return String(number);
          } else if (number < 10) {
            return `00${String(number)}`;
          } else {
            return `0${String(number)}`;
          }
        }

        let code, func;
        let tempArr, tempArr2;
        let tong;
        let newFrontDesid;
        let latestFrontDesid;
        let latestDesid;
        let tempReg;
        let index;
        let result;
        let newCode;
        let margin, margin2;

        code = await fileSystem(`readString`, [target]); // ID 필터 스크립트의 내용을 읽어옵니다.
        func = require(target); // 필터 스크립트를 모듈로 가져옵니다.
        tempArr = code.split("function"); // 함수별로 코드 내용을 나눕니다.

        tong = [];
        for (let i of tempArr) {
          tempArr2 = [...i.matchAll(/de[0-9][0-9][0-9]/g)]; // 디자이너 ID 패턴을 찾습니다.
          for (let j of tempArr2) {
            tong.push(j[0]); // 찾은 ID를 tong 배열에 추가합니다.
          }
        }
        tong = Array.from(new Set(tong)); // 중복된 ID를 제거합니다.
        tong.sort((a, b) => {
          return Number(b.replace(/[^0-9]/gi, '').replace(/^0/, '')) - Number(a.replace(/[^0-9]/gi, '').replace(/^0/, ''));
        });

        latestFrontDesid = tong[0]; // 최신 디자이너 ID를 가져옵니다.
        latestDesid = func.pastToNew(latestFrontDesid); // 최신 ID를 새로운 형식으로 변환합니다.
        newFrontDesid = "de" + hundredString(Number(tong[0].replace(/[^0-9]/gi, '').replace(/^0/, '')) + 1); // 새로운 디자이너 ID를 생성합니다.

        // 최신 ID와 관련된 코드를 찾고 새로운 ID를 삽입합니다.
        tempReg = new RegExp(`[ ]+case [\\"\\']${latestFrontDesid}[\\"\\']\\:[^;]+;[^;]+;`);
        result = code.match(tempReg);
        margin = result[0].split("case")[0];
        margin2 = result[0].split("return")[0].split("\n")[1];

        newCode = code.slice(0, result.index + result[0].length) + `\n${margin}case "${newFrontDesid}":\n${margin2}return "${newDesid}";\n${margin2}break;` + code.slice(result.index + result[0].length);
        code = newCode;

        // 최신 디자이너 ID에 대한 변환 코드를 삽입합니다.
        tempReg = new RegExp(`[ ]+case [\\"\\']${latestDesid}[\\"\\']\\:[^;]+;[^;]+;`);
        result = code.match(tempReg);
        margin = result[0].split("case")[0];
        margin2 = result[0].split("return")[0].split("\n")[1];

        newCode = code.slice(0, result.index + result[0].length) + `\n${margin}case "${newDesid}":\n${margin2}return "${newFrontDesid}";\n${margin2}break;` + code.slice(result.index + result[0].length);
        code = newCode;

        await fileSystem(`write`, [target, code]); // 변경된 코드를 파일에 저장합니다.

      } catch (e) {
        errorLog(e).catch((err) => { console.log(err) });
      }
    }

    await compileFrontDesidScript(newDesid); // 새로운 디자이너 ID를 컴파일합니다.
    console.log("front desid make"); // 컴파일 완료 로그를 출력합니다.

  } catch (e) {
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * @async
 * @method newDesignerToFront
 * @description 홈리에종에 신규 디자이너가 등록되었을 때 이 디자이너에 대한 정보를 홈리에종 프론트 웹에 자동으로 올려주는 메서드입니다.
 *              porlid는 해당 디자이너가 직접 수행한 콘텐츠의 ID이고, index는 그 콘텐츠를 대표하는 사진의 순서 번호를 지정하는 number 값입니다.
 * @param {string} porlid - 디자이너가 수행한 콘텐츠의 ID입니다.
 * @param {string} index - 콘텐츠를 대표하는 사진의 순서 번호입니다.
 * @param {string} designerName - 등록된 디자이너의 이름입니다.
 * @param {Object} option - 선택적 매개변수로, selfMongo를 포함할 수 있습니다.
 * @param {Object} [option.selfMongo=null] - MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 */
BackWorker.prototype.newDesignerToFront = async function (porlid, index, designerName, option = { selfMongo: null }) {
  // 현재 BackWorker 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
  const instance = this;

  // BackMaker 클래스의 인스턴스를 참조하여 back 변수에 저장합니다.
  const back = this.back;

  // Mother 클래스에서 requestSystem 메서드를 구조 분해 할당하여 가져옵니다.
  const { requestSystem } = this.mother;

  try {
    // 신규 디자이너의 프론트엔드 정보를 처리하는 내부 클래스를 정의합니다.
    class DesignerFrontIndex {

      /**
       * @constructor
       * @description DesignerFrontIndex 클래스의 인스턴스를 초기화합니다.
       * @param {Object} mother - Mother 클래스의 인스턴스입니다.
       * @param {Object} back - BackMaker 클래스의 인스턴스입니다.
       * @param {Object} option - 선택적 매개변수로, selfMongo를 포함할 수 있습니다.
       */
      constructor(mother, back, option = { selfMongo: null }) {
        // Mother 클래스의 인스턴스를 this.mother에 할당합니다.
        this.mother = mother;

        // BackMaker 클래스의 인스턴스를 this.back에 할당합니다.
        this.back = back;

        // 선택적 매개변수를 this.option에 할당합니다.
        this.option = option;
      }

      /**
       * @method toNormal
       * @description 현재 객체의 데이터를 일반 객체 형식으로 변환하여 반환합니다.
       * @returns {Object} 변환된 일반 객체입니다.
       */
      toNormal() {
        let obj = {};
        // 디자이너 소개 정보를 obj.introduction에 할당합니다.
        obj.introduction = this.introduction;

        // 디자이너의 작업 방식을 obj.methods에 할당합니다.
        obj.methods = this.methods;

        // 디자이너의 사진 정보를 obj.photo에 할당합니다.
        obj.photo = this.photo;

        // 디자이너의 순서를 obj.order에 할당합니다.
        obj.order = this.order;

        // 디자이너의 이름을 obj.designer에 할당합니다.
        obj.designer = this.designer;

        // 디자이너 ID를 obj.desid에 할당합니다.
        obj.desid = this.desid;

        // 변환된 객체를 반환합니다.
        return obj;
      }

      /**
       * @method generateDummy
       * @description 신규 디자이너를 위한 더미 데이터를 생성합니다.
       * @param {string} porlid - 콘텐츠 ID입니다.
       * @param {string} index - 콘텐츠의 대표 사진 순서 번호입니다.
       * @param {string} [designer=''] - 디자이너 이름입니다.
       * @param {string} [desid=''] - 디자이너 ID입니다.
       */
      generateDummy(porlid, index, designer = '', desid = '') {
        // 디자이너 소개 정보를 초기화합니다.
        this.introduction = {
          desktop: [],
          mobile: []
        };

        // 디자이너의 작업 방식을 초기화합니다.
        this.methods = [];

        // 디자이너의 사진 정보를 porlid와 index를 사용하여 설정합니다.
        this.photo = {
          porlid: porlid,
          index: index,
        };

        // 디자이너의 순서를 0으로 초기화합니다.
        this.order = 0;

        // 디자이너 이름을 설정합니다.
        this.designer = designer;

        // 디자이너 ID를 설정합니다.
        this.desid = desid;
      }

      /**
       * @method setIntroduction
       * @description 디자이너의 소개 정보를 설정합니다.
       * @param {Object} designer - 디자이너 객체입니다.
       */
      setIntroduction(designer) {
        // 디자이너의 소개 정보를 데스크탑과 모바일용으로 각각 설정합니다.
        this.introduction.desktop = designer.setting.front.introduction.desktop;
        this.introduction.mobile = designer.setting.front.introduction.mobile;
      }

      /**
       * @method setMethod
       * @description 디자이너의 작업 방식을 설정합니다.
       */
      setMethod() {
        // 디자이너의 작업 방식을 설정합니다. 여기서는 mth0과 mth7이라는 두 가지 방식이 사용됩니다.
        this.methods = ["mth0", "mth7"];
      }

      /**
       * @method setOrder
       * @description 디자이너의 순서를 설정합니다.
       */
      setOrder() {
        // 디자이너의 순서를 748로 설정합니다.
        this.order = 748;
      }

      /**
       * @method returnFrontObject
       * @description 프론트엔드에서 사용할 디자이너 객체를 반환합니다.
       * @param {string} porlid - 콘텐츠 ID입니다.
       * @param {string} index - 콘텐츠의 대표 사진 순서 번호입니다.
       * @param {Object} designerObj - 디자이너 객체입니다.
       * @returns {Object} 프론트엔드에서 사용할 디자이너 객체입니다.
       */
      async returnFrontObject(porlid, index, designerObj) {
        try {
          // 디자이너 객체에서 이름과 ID를 가져옵니다.
          const { designer, desid } = designerObj;

          // 더미 데이터를 생성합니다.
          this.generateDummy(porlid, index, designer, desid);

          // 디자이너의 소개 정보를 설정합니다.
          this.setIntroduction(designerObj);

          // 디자이너의 작업 방식을 설정합니다.
          this.setMethod();

          // 디자이너의 순서를 설정합니다.
          this.setOrder();

          // 변환된 디자이너 객체를 반환합니다.
          return this.toNormal();
        } catch (e) {
          // 오류가 발생하면 콘솔에 로그를 남깁니다.
          errorLog(e).catch((err) => { console.log(err) });
        }
      }

      /**
       * @method renderDesigner
       * @description 프론트엔드에서 사용할 디자이너 데이터를 생성하고, 이를 MySQL 데이터베이스에 저장한 후, 업데이트합니다.
       * @param {string} porlid - 콘텐츠 ID입니다.
       * @param {string} index - 콘텐츠의 대표 사진 순서 번호입니다.
       * @param {Object} designerObj - 디자이너 객체입니다.
       */
      async renderDesigner(porlid, index, designerObj) {
        // 현재 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
        const instance = this;

        // Mother 클래스에서 필요한 메서드들을 구조 분해 할당하여 사용합니다.
        const { fileSystem, shellExec, shellLink, mysqlQuery } = this.mother;

        try {
          // infoObj.js 파일을 불러와 주소 관련 정보를 가져옵니다.
          const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

          // 디자이너의 ID 필터링을 수행하는 메서드를 가져옵니다.
          const Filter = this.back.idFilter("designer");

          // 디자이너의 프론트엔드 객체를 생성합니다.
          const frontSetting = await this.returnFrontObject(porlid, index, designerObj);

          // 생성된 객체를 콘솔에 출력합니다.
          console.log(frontSetting);

          /**
           * @function careerCalculation
           * @description 디자이너의 경력 정보를 계산하여 반환합니다.
           * @param {Object} designer - 디자이너 객체입니다.
           * @returns {Object} 디자이너의 경력 정보를 포함하는 객체입니다.
           */
          const careerCalculation = function (designer) {
            let yS, yM, rY, rM;
            let monthResult;

            // 시작 연도와 월을 가져옵니다.
            yS = designer.information.business.career.startY;
            yM = designer.information.business.career.startM;

            // 관련된 연도와 월을 가져옵니다.
            rY = designer.information.business.career.relatedY;
            rM = designer.information.business.career.relatedM;

            // 경력 월 수를 계산합니다.
            monthResult = ((yS * 12) + yM) - ((rY * 12) + rM);

            // 경력 연도와 월을 반환합니다.
            return {
              year: Math.floor(monthResult / 12),
              month: (monthResult % 12),
            };
          }

          let pastDesid;
          let scpOrder;
          let insertQuery;
          let whereQuery, updateQuery;

          // 작업 방법이 두 개가 아닌 경우 오류를 발생시킵니다.
          if (frontSetting.methods.length !== 2) {
            throw new Error("method's length must be 2");
          }

          // 디자이너 정보를 MySQL에 삽입하는 쿼리를 작성합니다.
          insertQuery = "INSERT INTO deslist (desid,name,start_Y,start_M,method1,method2,daepyo_a,daepyo_t,order_function) VALUES (";
          insertQuery += `'${pastDesid}',`;
          insertQuery += `'${designerObj.designer}',`;
          insertQuery += `'${String(careerCalculation(designerObj).year)}',`;
          insertQuery += `'${String(careerCalculation(designerObj).month)}',`;
          insertQuery += `'${frontSetting.methods[0]}',`;
          insertQuery += `'${frontSetting.methods[1]}',`;
          insertQuery += `'${frontSetting.photo.porlid}',`;
          insertQuery += `'${frontSetting.photo.index}',`;
          insertQuery += `'${String(frontSetting.order)}');`;

          // MySQL 데이터베이스에 쿼리를 실행하여 데이터를 삽입합니다.
          await mysqlQuery(insertQuery, { front: true });

          // MySQL 데이터베이스에 삽입이 완료되었다는 메시지를 출력합니다.
          console.log(`front mysql insert done`);

          // 프론트엔드 설정 객체에서 디자이너 이름과 ID를 제거합니다.
          delete frontSetting.designer;
          delete frontSetting.desid;

          // 디자이너의 ID를 조건으로 하여 업데이트 쿼리를 작성합니다.
          whereQuery = { desid: designerObj.desid };
          updateQuery = { "setting.front": frontSetting };

          // MongoDB에서 해당 디자이너의 데이터를 업데이트합니다.
          await this.back.updateDesigner([whereQuery, updateQuery], this.option);

          // 데이터베이스 업데이트 완료 메시지를 출력합니다.
          console.log(`db update done`);

        } catch (e) {
          // 오류가 발생하면 콘솔에 로그를 남깁니다.
          errorLog(e).catch((err) => { console.log(err) });
        }
      }
    }

    // DesignerFrontIndex 클래스의 인스턴스를 생성합니다.
    const front = new DesignerFrontIndex(this.mother, this.back, option);

    let thisDesigner, desid;

    // 디자이너 이름으로 디자이너 데이터를 조회합니다.
    [thisDesigner] = await back.getDesignersByQuery({ designer: designerName }, { toNormal: true });

    // 조회된 디자이너의 ID를 가져옵니다.
    desid = thisDesigner.desid;

    // 프론트엔드에 디자이너 데이터를 렌더링합니다.
    await front.renderDesigner(porlid, 't' + String(index), thisDesigner);

    // 프론트엔드에서 새로 반영된 데이터를 가져옵니다.
    await requestSystem("https://" + instance.address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 남깁니다.
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * @async
 * @method designerCalculation
 * @description 홈리에종에서 매주 월요일 인테리어 디자이너들에게 디자인 비용을 정산해주는 정산 리스트를 자동으로 추적하여 홈리에종 슬랙 채널에 알림을 보내는 메서드입니다.
 * @param {boolean} [alarm=true] - 알림을 보낼지 여부를 결정하는 플래그입니다. 기본값은 true입니다.
 */
BackWorker.prototype.designerCalculation = async function (alarm = true) {
  // 현재 BackWorker 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 여러 유틸리티 메서드들을 구조 분해 할당하여 사용합니다.
  const { mongo, mongoinfo, mongolocalinfo, dateToString, autoComma, messageSend } = this.mother;

  // MongoDB 클라이언트를 초기화합니다. mongoinfo를 사용하여 메인 데이터베이스에 연결합니다.
  const MONGOC = new mongo(mongoinfo);

  // MongoDB 로컬 클라이언트를 초기화합니다. 로컬 데이터베이스에 연결하기 위해 mongolocalinfo를 사용합니다.
  const PYTHONMONGOC = new mongo(mongolocalinfo);

  try {
    // 메인 MongoDB 클라이언트를 연결합니다.
    await MONGOC.connect();

    // 로컬 MongoDB 클라이언트를 연결합니다. 현재는 MongoDB가 하나로 합쳐져 있으므로 사실상 MONGOC와 PYTHONMONGOC는 같은 연결입니다.
    await PYTHONMONGOC.connect();

    // BackMaker 클래스의 인스턴스를 참조하여 back 변수에 저장합니다.
    const back = this.back;

    // 디자이너 관련 데이터를 처리하기 위해 디자이너 클래스와 정보 객체를 불러옵니다.
    const Designers = require(`${process.cwd()}/apps/dataConsole/router/source/class/designer.js`);
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

    // 메인 MongoDB 클라이언트를 selfMongo 변수에 할당합니다.
    const selfMongo = MONGOC;

    // 슬랙 메시지에 사용될 구분선 문자열을 정의합니다.
    const bar1 = "================================================================";

    // MongoDB 컬렉션 이름을 변수에 저장합니다.
    const collection = "taxBill";        // 세금 계산서 컬렉션
    const collection2 = "cashReceipt";    // 현금 영수증 컬렉션
    const collection3 = "generalBill";    // 일반 청구서 컬렉션

    // 빈 날짜 값을 설정하여 초기화합니다.
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();

    // 필요한 변수를 초기화합니다.
    let projects, clients, designers; // 프로젝트, 클라이언트, 디자이너 데이터를 저장할 변수들
    let desidArr_raw, desidArr; // 디자이너 ID 배열을 저장할 변수들
    let cliidArr; // 클라이언트 ID 배열을 저장할 변수
    let whereQuery, updateQuery; // MongoDB 쿼리를 저장할 변수들
    let tong; // 슬랙 메시지에 사용할 텍스트 배열
    let amount0, amount1; // 금액을 저장할 변수들
    let condition0, condition1; // 조건을 저장할 변수들
    let name; // 이름을 저장할 변수
    let tempString; // 임시 문자열을 저장할 변수
    let needsResponses, pendingResponses, infoDetail; // 정산 응답 관련 변수를 저장할 변수들
    let rows, boo; // 행과 boolean 값을 저장할 변수들
    let tempDate; // 임시 날짜를 저장할 변수
    let ago, agoValue; // 과거 날짜를 저장할 변수들
    let greateStandard; // 비교 기준을 저장할 변수
    let limitAgo; // 날짜 제한을 저장할 변수
    let bills; // 청구서 데이터를 저장할 변수
    let thisBill; // 현재 청구서를 저장할 변수
    let proid; // 프로젝트 ID를 저장할 변수
    let thisResponses, thisRequests; // 청구서 응답 및 요청 데이터를 저장할 변수들
    let itemAmount, payAmount; // 금액을 계산할 변수들
    let requestRemain; // 잔금 요청을 저장할 변수
    let condition; // 조건을 저장할 변수
    let taxBills, cashReceipts; // 세금 계산서 및 현금 영수증 데이터를 저장할 변수들
    let businessNumber; // 사업자 번호를 저장할 변수
    let cliid; // 클라이언트 ID를 저장할 변수
    let requestTravel; // 출장비 요청을 저장할 변수
    let bilid, responseIndex; // 청구서 ID 및 응답 인덱스를 저장할 변수들
    let thisTargetDesigner; // 현재 타겟 디자이너를 저장할 변수
    let tongTong; // 슬랙 메시지 내용을 저장할 배열
    let tongSet; // 정렬된 슬랙 메시지 내용을 저장할 배열
    let tongMatrix; // 슬랙 메시지 출력을 위한 배열
    let tongTempArr; // 임시 배열을 저장할 변수

    // 28일 전의 날짜를 계산하여 ago와 agoValue 변수에 저장합니다.
    ago = new Date();
    ago.setDate(ago.getDate() - 28);
    agoValue = ago.valueOf();

    // 2년 전의 날짜를 계산하여 limitAgo 변수에 저장합니다.
    limitAgo = new Date();
    limitAgo.setFullYear(limitAgo.getFullYear() - 2);

    // MongoDB에서 조회할 쿼리 조건을 설정합니다.
    whereQuery = {
      $and: [
        { desid: { $regex: "^d" } }, // 디자이너 ID가 "d"로 시작하는 조건
        { "proposal.date": { $gt: limitAgo } }, // 최근 2년 이내에 제안된 프로젝트
        { "process.contract.first.date": { $gt: new Date(2000, 0, 1) } }, // 첫 계약일이 유효한 프로젝트
        { proid: { $not: { $regex: "p1801_aa01s" } } }, // 특정 프로젝트를 제외하는 조건
        { proid: { $not: { $regex: "p1801_aa02s" } } }  // 특정 프로젝트를 제외하는 조건
      ]
    };

    // 설정된 쿼리를 사용하여 프로젝트를 MongoDB에서 조회합니다.
    projects = await back.getProjectsByQuery(whereQuery, { selfMongo });

    // 중복된 디자이너 ID를 제거하여 raw 배열을 생성합니다.
    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));

    // 중복이 제거된 디자이너 ID 배열을 생성합니다.
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }

    // 클라이언트 ID 배열을 생성합니다.
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    // 디자이너를 조회할 쿼리 조건을 설정합니다.
    whereQuery = {
      $or: [
        { $or: desidArr }, // 디자이너 ID 배열에 해당하는 조건
        { "information.contract.status": { $regex: "완료" } } // 계약 상태가 "완료"인 조건
      ]
    };

    // 설정된 쿼리를 사용하여 디자이너를 MongoDB에서 조회합니다.
    designers = await back.getDesignersByQuery(whereQuery, { selfMongo });

    // 클라이언트를 조회할 쿼리 조건을 설정합니다.
    whereQuery = {
      $or: cliidArr // 클라이언트 ID 배열에 해당하는 조건
    };

    // 설정된 쿼리를 사용하여 클라이언트를 MongoDB에서 조회합니다.
    clients = await back.getClientsByQuery(whereQuery, { selfMongo });

    // 디자이너 객체를 생성하고, 프로젝트와 클라이언트 정보를 설정합니다.
    designers = new Designers(designers.toNormal());
    designers.setProjects(projects.toNormal());
    designers.setClients(clients.toNormal());

    // 현재 진행 중인 디자이너만 필터링하여 가져옵니다.
    designers = designers.returnDoingDesigners();

    // MongoDB에서 세금 계산서, 현금 영수증, 일반 청구서를 읽어옵니다.
    taxBills = await back.mongoRead(collection, {}, { selfMongo: PYTHONMONGOC });
    cashReceipts = await back.mongoRead(collection2, {}, { selfMongo: PYTHONMONGOC });
    bills = await back.mongoRead(collection3, {}, { selfMongo: PYTHONMONGOC });

    // 정산이 필요한 응답과 대기 중인 응답을 저장할 배열을 초기화합니다.
    needsResponses = [];
    pendingResponses = [];

    // 디자이너의 프로젝트를 순회하며 정산 작업을 수행합니다.
    for (let designer of designers) {
      for (let i = 0; i < designer.projects.length; i++) {
        // 프로젝트 이름, 클라이언트 ID, 프로젝트 ID를 가져옵니다.
        name = designer.projects[i].name;
        cliid = designer.projects[i].cliid;
        proid = designer.projects[i].proid;

        // 현재 청구서를 초기화합니다.
        thisBill = null;

        // 프로젝트 ID와 서비스 방법을 기준으로 청구서를 찾습니다.
        thisBill = bills.find((bill) => {
          return ((bill.links.proid === proid) && (bill.links.method === (designer.projects[i].service.online ? "online" : "offline")))
        });

        // 해당 청구서가 없으면 다음으로 넘어갑니다.
        if (thisBill === null || thisBill === undefined) {
          continue;
        }

        // 청구서의 응답과 요청 배열을 가져옵니다.
        thisResponses = thisBill.responses;
        thisRequests = thisBill.requests;
        bilid = thisBill.bilid;

        // 응답 인덱스를 초기화합니다.
        responseIndex = 0;

        // 응답 배열을 순회하며 정산 조건을 확인합니다.
        for (let response of thisResponses) {
          // 응답 항목들의 총 금액을 계산합니다.
          itemAmount = Math.floor(response.items.reduce((acc, curr) => {
            return acc + curr.amount.pure;
          }, 0));

          // 지급된 금액을 계산합니다.
          payAmount = Math.floor(response.pay.reduce((acc, curr) => {
            return acc + curr.amount;
          }, 0));

          // 응답 타겟 디자이너를 찾습니다.
          thisTargetDesigner = designers.find((d) => { return d.desid === response.target.id });

          // 아이템 금액이 0보다 큰 경우에만 조건을 처리합니다.
          if (itemAmount > 0) {
            // 아이템 금액이 지급된 금액보다 클 때, 추가 조건을 확인합니다.
            if (itemAmount > payAmount) {
              // 응답 이름이 "홈리에종 선금"일 때 처리합니다.
              if (/홈리에종 선금/gi.test(response.name)) {
                // 잔금 요청을 찾습니다.
                requestRemain = thisRequests.find((obj) => { return /홈리에종 잔금/gi.test(obj.name) });

                // 잔금 요청이 없으면 조건을 false로 설정합니다.
                if (requestRemain === undefined) {
                  condition = false;
                } else {
                  // 잔금 요청이 있는 경우, 조건을 설정합니다.
                  if (Math.floor(requestRemain.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestRemain.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
                    // 디자이너의 사업자 번호를 가져옵니다.
                    businessNumber = thisTargetDesigner.information.business.businessInfo.businessNumber.replace(/-/g, '');

                    // 프리랜서일 경우 조건을 true로 설정합니다.
                    if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                      condition = true;
                    } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                      // 간이사업자일 경우 현금 영수증 및 세금 계산서를 확인합니다.
                      condition = (cashReceipts.filter((obj) => {
                        return obj.method === 1;
                      }).filter((obj) => {
                        return obj.who.business.replace(/\-/gi, '') === businessNumber;
                      }).filter((obj) => {
                        return obj.amount.total === itemAmount;
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                          return false;
                        } else {
                          return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf();
                        }
                      }).length > 0);

                      // 조건이 충족되지 않으면 세금 계산서를 확인합니다.
                      if (!condition) {
                        condition = (taxBills.filter((obj) => {
                          return obj.who.from.business.replace(/\-/gi, '') === businessNumber;
                        }).filter((obj) => {
                          return obj.sum.total === itemAmount;
                        }).filter((obj) => {
                          if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                            return false;
                          } else {
                            return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf();
                          }
                        }).length > 0);
                      }
                    } else {
                      // 일반 사업자의 경우 세금 계산서를 확인합니다.
                      condition = (taxBills.filter((obj) => {
                        return obj.who.from.business.replace(/\-/gi, '') === businessNumber;
                      }).filter((obj) => {
                        return obj.sum.total === itemAmount;
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                          return false;
                        } else {
                          return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf();
                        }
                      }).length > 0);
                    }
                  }
                }

              // "홈리에종 잔금"과 관련된 처리입니다.
              } else if (/홈리에종 잔금/gi.test(response.name)) {
                // 잔금 요청을 찾습니다.
                requestRemain = thisRequests.find((obj) => { return /홈리에종 잔금/gi.test(obj.name) });

                // 잔금 요청이 없으면 조건을 false로 설정합니다.
                if (requestRemain === undefined) {
                  condition = false;
                } else {
                  // 잔금 요청이 있는 경우, 조건을 확인합니다.
                  if (Math.floor(requestRemain.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestRemain.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
                    // 계산 완료 날짜를 기준으로 조건을 설정합니다.
                    if (thisTargetDesigner.projects[i].process.calculation.payments.remain.date.valueOf() <= emptyDateValue) {
                      if (([ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '해당 없음' ]).includes(thisTargetDesigner.projects[i].contents.raw.portfolio.status)) {
                        condition = false;
                      } else {
                        if (thisTargetDesigner.projects[i].contents.photo.boo) {
                          if (/완료/gi.test(thisTargetDesigner.projects[i].contents.photo.status) && (/디자이너/gi.test(thisTargetDesigner.projects[i].contents.photo.info.photographer) || /고객/gi.test(thisTargetDesigner.projects[i].contents.photo.info.photographer))) {
                            condition = true;
                          } else {
                            if (thisTargetDesigner.projects[i].contents.photo.date.valueOf() < (new Date(3000, 0, 1)).valueOf() && thisTargetDesigner.projects[i].contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
                              condition = true;
                            } else {
                              condition = false;
                            }
                          }
                        } else {
                          condition = true;
                        }
                      }
                    } else {
                      condition = false;
                    }
                  } else {
                    condition = false;
                  }
                }

                // 최종 조건을 설정합니다.
                if (condition) {
                  businessNumber = thisTargetDesigner.information.business.businessInfo.businessNumber.replace(/-/g, '');
                  if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = true;
                  } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = (cashReceipts.filter((obj) => {
                      return obj.method === 1;
                    }).filter((obj) => {
                      return obj.who.business.replace(/\-/gi, '') === businessNumber;
                    }).filter((obj) => {
                      return obj.amount.total === itemAmount;
                    }).filter((obj) => {
                      if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                        return false;
                      } else {
                        return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf();
                      }
                    }).length > 0);
                    if (!condition) {
                      condition = (taxBills.filter((obj) => {
                        return obj.who.from.business.replace(/\-/gi, '') === businessNumber;
                      }).filter((obj) => {
                        return obj.sum.total === itemAmount;
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                          return false;
                        } else {
                          return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf();
                        }
                      }).length > 0);
                    }
                  } else {
                    condition = (taxBills.filter((obj) => {
                      return obj.who.from.business.replace(/\-/gi, '') === businessNumber;
                    }).filter((obj) => {
                      return obj.sum.total === itemAmount;
                    }).filter((obj) => {
                      if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                        return false;
                      } else {
                        return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf();
                      }
                    }).length > 0);
                  }
                }
              }

              // 정산이 필요한 경우 needsResponses 배열에 추가합니다.
              if (condition) {
                needsResponses.push({
                  cliid,
                  proid,
                  desid: thisTargetDesigner.desid,
                  bill: {
                    bilid,
                    responseIndex: responseIndex,
                  },
                  names: {
                    name,
                    designer: thisTargetDesigner.designer,
                  },
                  item: {
                    name: response.name,
                    amount: itemAmount,
                  },
                  classification: {
                    classification: thisTargetDesigner.information.business.businessInfo.classification,
                    free: /프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification),
                    simple: /간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification),
                  },
                });
              } else {
                // 조건이 충족되지 않는 경우, pendingResponses 배열에 추가합니다.
                pendingResponses.push({
                  cliid,
                  proid,
                  desid: thisTargetDesigner.desid,
                  bill: {
                    bilid,
                    responseIndex: responseIndex,
                  },
                  names: {
                    name,
                    designer: thisTargetDesigner.designer,
                  },
                  item: {
                    name: response.name,
                    amount: itemAmount,
                  },
                  classification: {
                    classification: thisTargetDesigner.information.business.businessInfo.classification,
                    free: /프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification),
                    simple: /간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification),
                  },
                });
              }
            }
          }

          // 응답 인덱스를 증가시킵니다.
          responseIndex++;
        }
      }
    }

    // 알람이 활성화되어 있는 경우, 슬랙 메시지를 생성합니다.
    if (alarm) {
      tong = [];
      tong.push(`${dateToString(new Date())} 디자이너 디자인비 정산 명단입니다!`);
      tong.push(bar1);

      tongTong = [];
      tongSet = [];
      // 정산이 필요한 응답을 순회하며 슬랙 메시지를 구성합니다.
      for (let { names: { name, designer }, classification: { free, simple, classification }, item: { name: itemName, amount } } of needsResponses) {
        tongTong.push(`- ${designer}D ${name}C : ${itemName.replace(/ 정산/gi, '')} ${autoComma(amount)}원 / ${free ? classification : (simple ? "현금 영수증 확인" : "세금 계산서 발행 완료")}`);
        tongSet.push(itemName.replace(/ 정산/gi, ''));
      }

      // 중복 항목을 제거하고 정렬합니다.
      tongSet = [ ...new Set(tongSet) ];
      tongSet.sort();

      tongMatrix = [];
      // 각 항목에 대해 슬랙 메시지를 구성합니다.
      for (let itemName of tongSet) {
        tongTempArr = [];
        for (let factor of tongTong) {
          if ((new RegExp(" : " + itemName + " ", "gi")).test(factor)) {
            tongTempArr.push(factor);
          }
        }
        tongMatrix = tongMatrix.concat(tongTempArr);
        tongMatrix.push(bar1);
      }

      tong = tong.concat(tongMatrix);

      // 슬랙 채널에 메시지를 전송합니다.
      await messageSend({ text: tong.join("\n"), channel: "#700_operation" });
    }

    // 정산이 필요한 응답과 대기 중인 응답을 반환합니다.
    return {
      needs: needsResponses,
      pending: pendingResponses
    };
  } catch (e) {
    // 오류 발생 시, 콘솔에 로그를 남깁니다.
    errorLog(e).catch((err) => { console.log(err) });
  } finally {
    // MongoDB 클라이언트를 닫습니다.
    await MONGOC.close();
    await PYTHONMONGOC.close();
  }
}
    
/**
 * @async
 * @method designerTendencySync
 * @description 디자이너 디자인 경향성에 대한 연산을 수행하고, 이를 동기화하는 메서드입니다.
 *              디자인 경향성(designer Tendency)이란 해당 디자이너가 어떤 스타일로 인테리어 디자인을 수행하는지에 대한 수치화된 지표입니다.
 */
BackWorker.prototype.designerTendencySync = async function () {
  // BackWorker 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
  const instance = this;

  // BackMaker 클래스의 인스턴스를 참조하여 back 변수에 저장합니다.
  const back = this.back;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당하여 가져옵니다.
  const { mongo, mongoinfo, equalJson } = this.mother;

  try {
    // Mother 클래스의 mongo 메서드를 사용하여 MongoDB 연결 인스턴스를 생성합니다.
    const selfMongo = new mongo(mongoinfo);

    // MongoDB 서버에 연결합니다.
    await selfMongo.connect();

    // MongoDB에서 모든 콘텐츠 배열을 가져옵니다.
    const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });

    // MongoDB에서 모든 디자이너 정보를 가져옵니다.
    const designers = await back.getDesignersByQuery({}, { selfMongo });

    // 각 디자이너의 경향성을 저장할 변수를 선언합니다.
    let thisTendency;

    // 해당 디자이너의 관련 콘텐츠 개수를 저장할 변수를 선언합니다.
    let num;

    // MongoDB 쿼리 조건과 업데이트 데이터를 저장할 변수를 선언합니다.
    let whereQuery, updateQuery;

    // 모든 디자이너를 순회합니다.
    for (let designer of designers) {
      // 현재 디자이너의 디자인 경향성 데이터를 가져옵니다.
      thisTendency = designer.toNormal().analytics.styling.tendency;

      // 관련 콘텐츠 개수를 초기화합니다.
      num = 0;

      // 모든 콘텐츠 배열을 순회합니다.
      for (let { desid, contents } of contentsArr) {
        // 현재 콘텐츠가 해당 디자이너의 콘텐츠인지 확인합니다.
        if (designer.desid === desid) {
          // 디자인 경향성 키를 순회합니다.
          for (let key in thisTendency) {
            // 각 키의 세부 항목을 순회하며 경향성을 합산합니다.
            for (let key2 in thisTendency[key]) {
              thisTendency[key][key2] = thisTendency[key][key2] + contents.portfolio.detailInfo.tendency[key][key2];
            }
          }
          // 관련 콘텐츠 개수를 증가시킵니다.
          num++;
        }
      }

      // 관련 콘텐츠가 있을 경우, 평균 값을 계산하여 경향성 데이터를 업데이트합니다.
      if (num !== 0) {
        // 각 경향성 키를 순회하며 평균 값을 계산합니다.
        for (let key in thisTendency) {
          for (let key2 in thisTendency[key]) {
            // 평균 값을 계산하고 소수점 이하를 반올림합니다.
            thisTendency[key][key2] = Math.round(thisTendency[key][key2] / (num + 1));

            // 경향성 값이 0이면 최소 값을 1로 설정합니다.
            if (thisTendency[key][key2] === 0) {
              thisTendency[key][key2] = 1;
            }

            // 경향성 값이 10 이상이면 최대 값을 10으로 설정합니다.
            if (thisTendency[key][key2] >= 10) {
              thisTendency[key][key2] = 10;
            }
          }
        }
      }

      // 현재 디자이너의 ID를 조건으로 하여 쿼리를 설정합니다.
      whereQuery = { desid: designer.desid };

      // 업데이트할 경향성 데이터를 설정합니다.
      updateQuery = {};
      updateQuery["analytics.styling.tendency"] = equalJson(JSON.stringify(thisTendency));

      // 디자이너의 경향성 데이터를 MongoDB에 업데이트합니다.
      await back.updateDesigner([whereQuery, updateQuery], { selfMongo });

      // 업데이트된 쿼리와 데이터를 콘솔에 출력합니다.
      console.log(whereQuery, updateQuery);
    }

    // MongoDB 연결을 닫습니다.
    await selfMongo.close();

  } catch (e) {
    // 오류가 발생하면 콘솔에 로그를 남깁니다.
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * @async
 * @method designerFeeTable
 * @description 디자이너의 디자인비 가격 테이블을 연산하고 데이터베이스로부터 가져오는 메서드입니다.
 * @param {string} desid - 디자이너의 ID입니다.
 * @param {Object} [option={selfMongo: null, selfLocalMongo: null}] - 선택적 매개변수로, MongoDB 인스턴스를 지정할 수 있습니다.
 * @param {Object} [option.selfMongo=null] - MongoDB 인스턴스입니다. 지정되지 않으면 새로운 인스턴스를 생성합니다.
 * @param {Object} [option.selfLocalMongo=null] - 로컬 MongoDB 인스턴스입니다. 지정되지 않으면 새로운 인스턴스를 생성합니다.
 * @throws {Error} 입력된 desid가 문자열이 아닌 경우 오류를 발생시킵니다.
 */
BackWorker.prototype.designerFeeTable = async function (desid, option = { selfMongo: null, selfLocalMongo: null }) {
  
  // desid가 문자열이 아닌 경우 오류를 발생시킵니다.
  if (typeof desid !== "string") {
    throw new Error("invalid input");
  }

  // 현재 BackWorker 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당하여 가져옵니다.
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;

  // BackMaker 클래스의 인스턴스를 참조하여 back 변수에 저장합니다.
  const back = this.back;

  // 디자인 서비스 ID 목록을 정의합니다.
  const serviceTable = [
    "s2011_aa01s", // 홈퍼니싱 (Home Furnishing) 서비스
    "s2011_aa02s", // 홈스타일링 (Home Styling) 서비스
    "s2011_aa03s", // 토탈 스타일링 (Total Styling) 서비스
    "s2011_aa04s", // 엑스트라 스타일링 (Extra Styling) 서비스
  ];

  // 클라이언트 ID와 기타 상수 값을 정의합니다.
  const cliidConst = "c1801_aa01s"; // 기본 클라이언트 ID
  const xValueConst = 'B'; // X 값 상수
  const minPyeong = 8; // 최소 평수 (단위: 평)
  const maxPyeong = 100; // 최대 평수 (단위: 평)

  // 금액을 천 단위로 반올림하는 함수입니다.
  const toMoney = (num) => { return (Math.round(num / 1000) * 1000); }

  // MongoDB 클라이언트를 저장할 변수를 선언합니다.
  let MONGOC, MONGOLOCALC;

  // selfMongo가 없으면 새로운 MongoDB 인스턴스를 생성하고 연결합니다.
  if (option.selfMongo === null || option.selfMongo === undefined) {
    MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();
  } else {
    MONGOC = option.selfMongo;
  }

  // selfLocalMongo가 없으면 새로운 로컬 MongoDB 인스턴스를 생성하고 연결합니다.
  if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
    MONGOLOCALC = new mongo(mongoconsoleinfo);
    await MONGOLOCALC.connect();
  } else {
    MONGOLOCALC = option.selfLocalMongo;
  }

  try {
    // 디자이너 정보를 저장할 변수를 선언합니다.
    let designer;

    // 특정 서비스에 대한 응답 결과를 저장할 변수를 선언합니다.
    let res;

    // 최종 결과를 저장할 객체를 선언합니다.
    let result;

    // 계산에 사용할 변수를 선언합니다.
    let y, serviceMatchBoo;

    // 디자이너 ID로 디자이너 정보를 MongoDB에서 조회합니다.
    designer = await back.getDesignerById(desid, { selfMongo: MONGOC });

    // 결과 객체를 초기화합니다.
    result = {};
    result.service = {};

    // 각 서비스에 대해 순회하면서 디자인비를 계산합니다.
    for (let serid of serviceTable) {
      
      // 서비스 ID에서 연도 값을 추출하여 계산합니다.
      y = Number((serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;

      // 연도 값이 숫자가 아닌 경우 오류를 발생시킵니다.
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }

      // 서비스가 디자이너의 시공 레벨에 맞는지 여부를 확인합니다.
      serviceMatchBoo = (y <= designer.analytics.construct.level);

      // 서비스가 디자이너의 시공 능력에 맞는지 여부를 추가로 확인합니다.
      if (serviceMatchBoo) {
        serviceMatchBoo = (y <= designer.analytics.construct.ability);
      }

      // getDesignerFee 메서드를 사용해 해당 서비스에 대한 디자인비를 계산합니다.
      res = await this.getDesignerFee(desid, cliidConst, serid, xValueConst, { selfMongo: MONGOC, selfLocalMongo: MONGOLOCALC, generalPriceView: true });

      // 결과 객체에 계산된 알파 비율과 기준 가격을 저장합니다.
      result.alphaPercentage = res.alphaPercentage;
      result.priceStandard = res.priceStandard;

      // 각 서비스에 대한 결과를 저장합니다.
      result.service[serid] = {
        feeFunction: res.feeFunction, // 요금 계산 함수
        able: serviceMatchBoo, // 서비스 가능 여부
        example: [], // 예시 데이터를 저장할 배열
      };

      // 최소 평수에서 최대 평수까지 순회하면서 요금을 계산합니다.
      for (let i = minPyeong; i < maxPyeong + 1; i++) {
        // 평수별 요금을 계산하고, 천 단위로 반올림하여 저장합니다.
        result.service[serid].example.push({
          pyeong: i, // 현재 평수
          price: toMoney(res.feeFunction(i) * 10000 * res.alphaPercentage) // 요금 계산 결과
        });
      }

    }

    // 결과를 JSON 형식으로 반환할지 여부를 확인합니다.
    if (option.jsonMode === true) {
      // JSON 모드가 활성화된 경우 요금 계산 함수를 제거하고, 결과를 JSON 문자열로 반환합니다.
      for (let serid in result.service) {
        delete result.service[serid].feeFunction;
      }
      delete result.priceStandard._id;

      return JSON.stringify(result, null, 2);

    } else {
      // JSON 모드가 아닌 경우, 결과 객체를 그대로 반환합니다.
      return result;
    }

  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력하고, 오류 객체를 반환합니다.
    errorLog(e).catch((err) => { console.log(err) });
    return { error: e.message };
  } finally {
    // MongoDB 연결을 닫습니다. selfMongo나 selfLocalMongo가 없을 때만 닫습니다.
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }
    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      await MONGOLOCALC.close();
    }
  }
}

/**
 * @async
 * @method getDesignerFee
 * @description 해당 디자이너의 디자인 비용을 고객 정보와 함께 자동으로 계산하고 상세한 정보를 반환하는 메서드입니다.
 * @param {string} proid - 프로젝트 ID입니다.
 * @param {string|Object} cliid - 고객 ID 또는 옵션 객체입니다.
 * @param {string} [serid=null] - 서비스 ID입니다.
 * @param {string} [xValue=null] - X 값입니다.
 * @param {Object} [option={selfMongo: null, selfLocalMongo: null}] - 선택적 매개변수로, MongoDB 인스턴스를 지정할 수 있습니다.
 * @param {Object} [option.selfMongo=null] - MongoDB 인스턴스입니다. 지정되지 않으면 새로운 인스턴스를 생성합니다.
 * @param {Object} [option.selfLocalMongo=null] - 로컬 MongoDB 인스턴스입니다. 지정되지 않으면 새로운 인스턴스를 생성합니다.
 * @throws {Error} 입력된 proid, cliid, serid, xValue가 유효하지 않은 경우 오류를 발생시킵니다.
 * @returns {Object} 디자이너의 디자인 비용 및 관련 정보가 포함된 객체를 반환합니다.
 */
BackWorker.prototype.getDesignerFee = async function (proid, cliid, serid = null, xValue = null, option = { selfMongo: null, selfLocalMongo: null }) {

  // proid가 유효한 프로젝트 ID 형식인지 확인합니다.
  if (typeof proid === "string" && /^p[0-9]{4}_[a-z]{2}[0-9]{2}[a-z]$/.test(proid)) {
    // cliid가 객체가 아닌 경우, 옵션으로 취급하여 설정합니다.
    if (typeof cliid !== "object" || cliid === null) {
      cliid = { selfMongo: null, selfLocalMongo: null };
    }
    option = cliid;
  } 
  // proid가 유효한 디자이너 ID 형식인지 확인합니다.
  else if (typeof proid === "string" && /^d[0-9]{4}_[a-z]{2}[0-9]{2}[a-z]$/.test(proid)) {
    // cliid, serid, xValue가 문자열 형식인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
    if (typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
      throw new Error("invalid input");
    }
    // cliid가 유효한 고객 ID 형식인지 확인합니다.
    if (!/^c[0-9]{4}_[a-z]{2}[0-9]{2}[a-z]$/.test(cliid)) {
      throw new Error("invalid input");
    }
    // serid가 숫자와 '_'를 포함하는지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
    if (!/[0-9]/gi.test(serid)) {
      throw new Error("invalid input");
    }
    // serid가 '_'를 포함하지 않으면, 기본 형식으로 변환합니다.
    if (!/\_/g.test(serid)) {
      serid = "s_" + serid.replace(/[^0-9]/gi, '');
    }
    // option이 객체인지 확인하고, 그렇지 않으면 기본 값을 설정합니다.
    if (typeof option !== "object" || option === null) {
      option = { selfMongo: null, selfLocalMongo: null };
    }
  } else {
    // proid가 유효하지 않으면 오류를 발생시킵니다.
    throw new Error("invalid proid");
  }

  // frontMode를 설정합니다. 옵션 객체에서 frontMode가 1 또는 '1'로 설정된 경우 true로 설정합니다.
  const frontMode = (typeof option === "object" && option !== null) ? (option.frontMode === 1 || option.frontMode === '1') : false;

  // 신규 디자이너 목록을 설정합니다. 여기서는 "곽수빈"이 신규 디자이너로 지정되어 있습니다.
  const newcomers = [ "곽수빈" ];

  // 현재 BackWorker 클래스의 인스턴스를 참조하여 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 구조 분해 할당하여 가져옵니다.
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;

  // BackMaker 클래스의 인스턴스를 참조하여 back 변수에 저장합니다.
  const back = this.back;

  // 주소 파서(AddressParser)를 초기화합니다.
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const addressApp = new AddressParser();

  // 현재 날짜와 과거 10년 및 4년 전의 날짜를 설정합니다.
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
  const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());

  // 가격 계산을 위한 함수 생성기입니다.
  // 이 함수 생성기는 주어진 평수(x)와 그에 대응하는 가격(y) 간의 관계를 함수로 표현합니다.
  // 'tong' 배열은 각각의 구간별 평수와 그에 대응하는 가격 정보를 포함하고 있습니다.
  const functionMaker = function (tong) {
    // 'tong'이 배열인지 확인합니다. 배열이 아닌 경우, 오류를 발생시킵니다.
    if (!Array.isArray(tong)) {
      throw new Error("invalid input");
    }

    // 계산할 평수의 최대 한계를 설정합니다. 이 값은 900평입니다.
    const endLimit = 900;

    // 경사 하강 상수를 설정합니다. 이 값은 가격 증가 속도를 조절하는 데 사용됩니다.
    const inclinationDownConst = 2;

    // 중간 값을 계산할 상수를 설정합니다. 전체 구간의 45% 지점에서 중간 값을 계산합니다.
    const middleConst = 0.45;

    // 입력 변수의 이름을 'x'로 설정합니다. 이 변수는 평수를 나타냅니다.
    const inputName = 'x';

    // 출력 변수의 이름을 'y'로 설정합니다. 이 변수는 계산된 가격을 나타냅니다.
    const outputName = 'y';

    // 함수 스크립트를 초기화합니다.
    let functionScript = '';

    // 중간값, 이전 중간값, 이전 금액, 시작 지점을 초기화합니다.
    let middle;
    let pastMiddle = 0;
    let pastAmount = 0;
    let from = 0;
    let inclination;

    // 구간별로 평수와 가격을 순회하며 함수 스크립트를 생성합니다.
    for (let { to, amount } of tong) {
      // 중간 값을 계산합니다. 최대 한계를 넘지 않는 구간에 대해서는 중간 값을 구간의 45% 지점에서 설정합니다.
      middle = to <= endLimit ? (from + ((to - from) * middleConst)) : from;

      // 이전 중간값과 현재 중간값 사이에서 평수에 따른 가격을 계산하는 식을 함수 스크립트에 추가합니다.
      functionScript += `} else if (${String(pastMiddle)} <= ${inputName} && ${inputName} < ${String(middle)}) {\n`;
      functionScript += `  ${outputName} = (((${String(amount)} - ${String(pastAmount)}) / (${String(middle)} - ${String(pastMiddle)})) * ${inputName}) + (((${String(pastAmount)} * ${String(middle)}) - (${String(amount)} * ${String(pastMiddle)})) / (${String(middle)} - ${String(pastMiddle)}));\n`;

      // 만약 'to' 값이 최대 한계를 넘는 경우, 경사 하강을 적용한 계산식을 추가합니다.
      if (to > endLimit) {
        functionScript += `} else {\n`;
        functionScript += `  ${outputName} = (${String(inclination / inclinationDownConst)} * ${inputName}) + (${String(amount)} - ${String(from * (inclination / inclinationDownConst))});\n`;
      }

      // 경사 값을 계산합니다. 이는 현재 구간에서 가격이 얼마나 증가하는지를 나타냅니다.
      inclination = (amount - pastAmount) / (middle - pastMiddle);

      // 시작 지점을 현재 'to' 값으로 설정하고, 이전 중간값과 금액을 업데이트합니다.
      from = to;
      pastMiddle = middle;
      pastAmount = amount;
    }

    // 완성된 함수 스크립트를 조합하여 새로운 함수 객체를 생성합니다.
    functionScript = "let " + outputName + ";\n" + functionScript.slice(String("} else ").length) + "}\nreturn Math.round(" + outputName + ");";
    return new Function(inputName, functionScript);
  }

  // 금액을 천 단위로 반올림하는 함수입니다. 예를 들어, 1540원을 2000원으로 반올림합니다.
  const toMoney = (num) => { return (Math.round(num / 1000) * 1000); }

  // MongoDB 클라이언트를 저장할 변수를 선언합니다.
  let MONGOC, MONGOLOCALC;

  // selfMongo가 옵션으로 제공되지 않은 경우, 새로운 MongoDB 인스턴스를 생성하고 연결합니다.
  if (option.selfMongo === null || option.selfMongo === undefined) {
    MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();
  } else {
    MONGOC = option.selfMongo;
  }

  // selfLocalMongo가 옵션으로 제공되지 않은 경우, 새로운 로컬 MongoDB 인스턴스를 생성하고 연결합니다.
  if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
    MONGOLOCALC = new mongo(mongoconsoleinfo);
    await MONGOLOCALC.connect();
  } else {
    MONGOLOCALC = option.selfLocalMongo;
  }

  try {
    // 프로젝트와 관련된 변수들을 선언하고 초기화합니다.
    let requestNumber;
    let designers, desidArr;
    let desid;
    let client, project;
    let priceStandard, price;
    let priceStandardConst, priceStandardCollection;
    let designerAddress, clientAddress;
    let travelInfo;
    let proposalDate;
    let request;
    let x, y;
    let onlineBoo, partialBoo, premiumBoo, newcomerBoo, distanceBoo;
    let tong;
    let proposal;
    let fee;
    let homeliaison, alpha, alphaPercentage;
    let onlineFee;
    let relationItems;
    let mode;
    let offlineFeeCase;
    let onlineFeeCase;
    let travelNumber;
    let thisDesignerCareerStart;
    let distanceLimitBoo;
    let distanceLimitPlus;
    let serviceMatchBoo;
    let addressLogCollection;
    let addressRows;
    let comment;
    let livingMatchBoo;
    let matrixTong;
    let thisFeeFunction;
    let partialMatchBoo;

    // 가격 기준이 저장된 MongoDB 컬렉션 이름과 상수를 설정합니다.
    priceStandardCollection = "designerPrice";
    addressLogCollection = "addressLog";
    priceStandardConst = 33;
    onlineRatio = 0.8;
    travelNumber = 2;
    distanceLimitPlus = 5;
    comment = "";

    // cliid가 객체로 주어졌는지 확인하여 모드를 설정합니다.
    if (typeof cliid === "object") {
      mode = 0;
    } else {
      mode = 1;
      desid = proid;
      if (typeof desid !== "string" || typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
        throw new Error("invalid input");
      }
    }

    // 모드에 따라 프로젝트 또는 고객 정보를 가져옵니다.
    if (mode === 0) {

      project = await back.getProjectById(proid, { selfMongo: MONGOC });
      if (project === null) {
        throw new Error("invalid project");
      }
      client = await back.getClientById(project.cliid, { selfMongo: MONGOC });
      requestNumber = 0;
      proposalDate = project.proposal.date.valueOf();
      for (let i = 0; i < client.requests.length; i++) {
        if (i === 0) {
          if (proposalDate >= client.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        } else {
          if (proposalDate <= client.requests[i - 1].request.timeline.valueOf() && proposalDate >= client.requests[i].request.timeline.valueOf()) {
            requestNumber = i;
          }
        }
      }
      if (client.requests[requestNumber] === undefined) {
        throw new Error("invalid client request number");
      }
      request = client.requests[requestNumber].request;

    } else if (mode === 1) {

      client = await back.getClientById(cliid, { selfMongo: MONGOC });
      requestNumber = 0;
      request = client.requests[requestNumber].request;

    } else {
      throw new Error("mode Error");
    }

    // 가격 기준 데이터를 MongoDB에서 읽어옵니다.
    priceStandard = await back.mongoRead(priceStandardCollection, { key: priceStandardConst }, { selfMongo: MONGOLOCALC });
    if (priceStandard.length !== 1) {
      throw new Error("invalid price standard");
    }
    priceStandard = priceStandard[0];

    // 요청된 평수에 따라 X 값을 결정합니다.
    x = null;
    for (let i = 0; i < priceStandard.standard.x.value.length; i++) {
      if (i !== priceStandard.standard.x.value.length - 1) {
        if (priceStandard.standard.x.value[i][0] <= request.space.pyeong.value && request.space.pyeong.value < priceStandard.standard.x.value[i + 1][0]) {
          x = i;
        }
      } else {
        if (priceStandard.standard.x.value[i][0] <= request.space.pyeong.value) {
          x = i;
        }
      }
    }
    if (x === null) {
      throw new Error("pyeong error");
    }

    // 프로젝트 모드에 따라 Y 값을 계산하고, 관련된 디자이너 정보를 가져옵니다.
    if (mode === 0) {
      y = Number((project.service.serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }
      desidArr = [];
      for (let { desid } of project.proposal.detail) {
        desidArr.push({ desid });
      }
    } else {
      y = Number((serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }
      desidArr = [ { desid } ];
    }

    // 디자이너 목록을 MongoDB에서 가져옵니다.
    designers = await back.getDesignersByQuery({ $or: desidArr }, { selfMongo: MONGOC });
    if (designers.length === 0) {
      throw new Error("no designer error");
    }

    // 디자이너별로 가격을 계산하고, 결과를 tong 배열에 저장합니다.
    tong = [];
    clientAddress = null;
    for (let designer of designers) {

      // 서비스 매칭 여부를 확인합니다.
      serviceMatchBoo = (y <= designer.analytics.construct.level);
      if (serviceMatchBoo) {
        serviceMatchBoo = (y <= designer.analytics.construct.ability);
      }

      // 거주 여부에 따른 매칭을 확인합니다.
      if (client.requests[requestNumber].request.space.resident.living) {
        if (designer.analytics.project.living) {
          livingMatchBoo = true;
        } else {
          livingMatchBoo = false;
        }
      } else {
        livingMatchBoo = true;
      }

      // 부분 공간 매칭 여부를 확인합니다.
      partialMatchBoo = true;
      if (client.requests[requestNumber].request.space.partial.boo === true) {
        partialMatchBoo = false;
        if (designer.analytics.project.partial) {
          partialMatchBoo = true;
        }
      }

      // 가격 기준 데이터를 가져옵니다.
      price = await back.mongoRead(priceStandardCollection, { key: (designer.analytics.construct.level * 10) + designer.analytics.styling.level }, { selfMongo: MONGOLOCALC });
      if (price.length !== 1) {
        throw new Error("invalid price");
      }
      price = price[0];

      // 매트릭스 데이터로부터 가격 계산을 위한 함수 객체를 생성합니다.
      matrixTong = [];
      for (let m = 0; m < price.matrix.length; m++) {
        matrixTong.push({
          to: price.standard.x.value[m][1],
          amount: price.matrix[m][y]
        });
      }
      thisFeeFunction = functionMaker(matrixTong);
      fee = thisFeeFunction(request.space.pyeong.value) * 10000;

      // 모드에 따라 제안서를 선택하고, 온라인/프리미엄 여부를 결정합니다.
      if (mode === 0) {
        proposal = project.selectProposal(designer.desid);
        if (proposal === null) {
          throw new Error("invalid desid");
        }

        onlineBoo = false;
        for (let obj of proposal.fee) {
          if (/online/.test(obj.method)) {
            onlineBoo = true;
          }
        }
        premiumBoo = (project.service.xValue === 'P');
      } else if (mode === 1) {
        onlineBoo = false;
        premiumBoo = (xValue === 'P');
      }

      // 신규 디자이너 여부를 확인합니다.
      newcomerBoo = newcomers.includes(designer.designer);

      if (fee !== 0) {
        // 디자이너의 주소를 가져오거나 MongoDB에 저장된 데이터를 활용합니다.
        addressRows = await back.mongoRead(addressLogCollection, { input: designer.information.address[0].value }, { selfMongo: MONGOLOCALC });
        if (addressRows.length !== 0) {
          designerAddress = addressRows[0].address;
        } else {
          designerAddress = await addressApp.getAddress(designer.information.address[0].value);
          if (designerAddress === null) {
            throw new Error("invalid designer address");
          }
          await back.mongoCreate(addressLogCollection, { input: designer.information.address[0].value, address: designerAddress }, { selfMongo: MONGOLOCALC });
        }

        // 고객 주소를 가져오거나 MongoDB에 저장된 데이터를 활용합니다.
        if (clientAddress === null) {
          addressRows = await back.mongoRead(addressLogCollection, { input: request.space.address.value }, { selfMongo: MONGOLOCALC });
          if (addressRows.length !== 0) {
            clientAddress = addressRows[0].address;
          } else {
            clientAddress = await addressApp.getAddress(request.space.address.value);
            if (clientAddress === null) {
              throw new Error("invalid client address");
            }
            await back.mongoCreate(addressLogCollection, { input: request.space.address.value, address: clientAddress }, { selfMongo: MONGOLOCALC });
          }
        }

        // 디자이너와 고객 간의 이동 거리를 계산합니다.
        travelInfo = await addressApp.getTravelExpenses(designerAddress, clientAddress, { selfMongo: MONGOLOCALC });
      } else {
        travelInfo = null;
      }

      // 이동 거리가 없거나 제한을 초과한 경우를 처리합니다.
      if (travelInfo === null) {
        distanceBoo = false;
        distanceLimitBoo = false;
        travelInfo = { amount: 0, distance: { string: "0km" }, time: { string: "0시간 0분" } };
      } else {
        distanceBoo = (travelInfo.distance.meters > (designer.analytics.region.range * 1000));
        distanceLimitBoo = (travelInfo.distance.meters > ((distanceLimitPlus + designer.analytics.region.expenses) * 1000));
      }

      // 신규 디자이너에 대한 비용 조정을 수행합니다.
      if (newcomerBoo) {
        fee = fee * priceStandard.newcomer;
      }

      // 프리미엄 서비스에 대한 비용 조정을 수행합니다.
      if (premiumBoo) {
        fee = fee * priceStandard.premium;
      }

      // 디자이너의 경력을 기반으로 알파 값을 계산합니다.
      thisDesignerCareerStart = new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1);

      alpha = 0;
      alpha += (designer.information.business.career.relatedY >= 4 ? 0.5 : 0);
      alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 1 : (thisDesignerCareerStart.valueOf() <= fourYearsAgo.valueOf() ? 0.5 : 0);
      alpha += (designer.analytics.project.cad ? 0.5 : 0);
      alpha += (designer.analytics.project.modeling >= 1 ? 0.5 : 0);
      alpha += (designer.analytics.project.collage ? 0.5 : 0);

      // 디자이너의 인성 및 관계 항목을 기반으로 알파 값을 추가합니다.
      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      relationItems = designer.analytics.etc.relation.items;
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation.value);

      alpha += (homeliaison * (4.5 / 7));

      // 고객 평가 및 인기도를 기반으로 추가 알파 값을 계산합니다.
      alpha += 1; // 고객 평가 (2점 만점)
      alpha += 0.5; // 인기도 (0.5점 만점)

      // 알파 백분율을 계산합니다.
      alphaPercentage = (alpha / 100) + 1;

      // 일반 가격 보기 모드가 설정된 경우, 가격 기준 및 함수 정보를 반환합니다.
      if (option.generalPriceView === true) {
        return {
          alphaPercentage,
          priceStandard,
          feeFunction: thisFeeFunction
        };
      }

      // 최종 비용을 알파 백분율을 반영하여 계산합니다.
      fee = alphaPercentage * fee;

      offlineFeeCase = fee;
      onlineFeeCase = fee * 0.85;

      // 거리 제한 초과 여부를 확인하고, 이동 비용을 조정합니다.
      if (!distanceBoo || distanceLimitBoo) {
        travelInfo.amount = 0;
        travelNumber = 0;
        travelInfo.distance.string = "0km";
        travelInfo.time.string = "0시간 0분";
      }

      // 거리 제한을 초과한 경우 처리합니다.
      if (distanceLimitBoo) {
        comment = frontMode ? "거리 초과 불가능" : "Out of bounds";
        if (!frontMode) {
          if (y < 2) {
            if (designer.analytics.project.online) {
              offlineFeeCase = 0;
              fee = onlineFeeCase;
            } else {
              fee = 0;
              offlineFeeCase = 0;
              onlineFeeCase = 0;
            }
          } else {
            fee = 0;
            offlineFeeCase = 0;
            onlineFeeCase = 0;
          }
        }
      }

      // 서비스 매칭이 불가능한 경우 처리합니다.
      if (!serviceMatchBoo) {
        comment = frontMode ? "해당 서비스에서는 불가능" : "Unable service";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      // 거주 중일 때 매칭이 불가능한 경우 처리합니다.
      if (!livingMatchBoo) {
        comment = frontMode ? "거주중 진행 불가능" : "Unable in living";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      // 부분 공간 매칭이 불가능한 경우 처리합니다.
      if (!partialMatchBoo) {
        comment = frontMode ? "부분 공간 진행 불가능" : "Unable in partial space";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      // 거리 제한을 초과한 경우 처리합니다.
      if (y >= 2 && distanceBoo) {
        comment = frontMode ? "토탈 스타일링시 거리 초과 불가능" : "Distance over, unable in totalStyling";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      // 만약 주석이 비어있고 비용이 0인 경우, 해당 사항을 기록합니다.
      if (comment === "" && fee === 0) {
        comment = "Zero in table";
      }

      // 최종 계산된 정보를 tong 배열에 추가합니다.
      tong.push({
        desid: designer.desid,
        designer: designer.designer,
        cliid: client.cliid,
        client: client.name,
        proid: mode === 0 ? project.proid : "",
        detail: {
          original: fee,
          alpha: alpha,
          serid: mode === 0 ? project.service.serid : serid,
          xValue: mode === 0 ? project.service.xValue : xValue,
          newcomer: newcomerBoo,
          premium: premiumBoo,
          online: toMoney(onlineFeeCase),
          offline: toMoney(offlineFeeCase),
          distance: travelInfo.amount,
          travel: {
            distance: travelInfo.distance.string,
            time: travelInfo.time.string,
            number: travelNumber,
          },
          xy: { x, y },
          pyeong: request.space.pyeong.value,
          level: {
            construct: designer.analytics.construct.level,
            styling: designer.analytics.styling.level,
          },
        },
        fee: toMoney(fee),
        comment,
      });
    }

    // 모드에 따라 결과를 반환합니다.
    if (mode === 0) {
      return tong;
    } else if (mode === 1) {
      return tong[0];
    }

  } catch (e) {
    // 오류가 발생한 경우, 오류 메시지를 콘솔에 출력하고 기본 값으로 초기화된 객체를 반환합니다.
    errorLog(e).catch((err) => { console.log(err) });
    return {
      desid: "",
      designer: "",
      cliid: "",
      client: "",
      proid: "",
      detail: {
        original: 0,
        alpha: 0,
        serid: "",
        xValue: "",
        newcomer: false,
        premium: false,
        online: 0,
        offline: 0,
        distance: 0,
        travel: {
          distance: "",
          time: "",
          number: 0,
        },
        xy: { x: 0, y: 0 },
        pyeong: 0,
        level: {
          construct: 0,
          styling: 0,
        },
      },
      fee: 0,
      comment: e.message,
    };
  } finally {
    // MongoDB 연결을 닫습니다. selfMongo나 selfLocalMongo가 제공되지 않은 경우에만 닫습니다.
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }
    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      await MONGOLOCALC.close();
    }
  }
}

/**
 * @async
 * @function designerCuration
 * @description 이 메서드는 고객의 정보를 바탕으로 적절한 디자이너를 큐레이션하여 추천 리스트를 자동으로 생성합니다. 고객의 요청, 서비스 ID, 디자이너의 경력 및 실시간 가능성을 고려하여 큐레이션됩니다.
 * @param {string} cliid - 고객의 고유 아이디입니다.
 * @param {number} selectNumber - 추천할 디자이너의 수입니다.
 * @param {Array} seridArr - 서비스 아이디들의 배열입니다.
 * @param {Object} [option={ selfMongo: null, selfLocalMongo: null }] - 선택 사항으로 MongoDB 연결 정보가 포함된 객체입니다.
 * @returns {Promise<Array>} 큐레이션된 디자이너 리스트 또는 오류 빈 배열을 반환합니다.
 * @throws {Error} 입력 값이 유효하지 않으면 에러를 발생시킵니다.
 */
BackWorker.prototype.designerCuration = async function (cliid, selectNumber, seridArr, option = { selfMongo: null, selfLocalMongo: null }) {
  const instance = this; // 현재 BackWorker 인스턴스를 참조합니다.
  const back = this.back; // back 속성을 통해 데이터베이스와 상호작용하는 메서드를 호출할 수 있습니다.

  // 입력 값 검증: cliid는 문자열, selectNumber는 숫자, seridArr는 배열이어야 합니다.
  if (typeof cliid !== "string" || typeof selectNumber !== "number" || !Array.isArray(seridArr)) {
    throw new Error("invalid input"); // 입력 값이 유효하지 않으면 에러를 발생시킵니다.
  }

  try {
    // 필요한 모듈과 클래스 인스턴스를 불러옵니다.
    const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
    const addressApp = new AddressParser(); // 주소 파싱을 위한 클래스 인스턴스를 생성합니다.
    
    // 디자이너 목록과 고객 사례 정보를 MongoDB에서 가져옵니다.
    const designers = await back.getDesignersByQuery({}, { selfMongo: option.selfMongo, withTools: true });
    const clientCase = await back.getCaseProidById(cliid, { selfMongo: option.selfMongo });
    const realTimes = await back.mongoRead("realtimeDesigner", {}, { selfMongo: option.selfLocalMongo });
    const clientHistory = await back.getHistoryById("client", cliid, { selfMongo: option.selfLocalMongo });

    const { client, cases } = clientCase; // 고객 정보와 관련된 케이스를 추출합니다.

    // 내부적으로 사용될 상수 및 변수들을 선언합니다.
    const ytoken = 'y'; // 년도 토큰
    const mtoken = 'm'; // 월 토큰
    const pyeongStandards = [ // 평수 기준 배열
      [ 0, 22 ],
      [ 23, 34 ],
      [ 34, 99999 ]
    ];

    let contract, proposal, final;
    let project;
    let temp;
    let realtimeMap = {}; // 실시간 가능성 맵
    let standard;
    let now = new Date(); // 현재 날짜
    let range, secondRange;
    let selected = [], selectedDesigner = [];
    let boo;
    let designer;
    let preferBoo = false, preferDesigners;
    let tempObj;
    let feeCalculation;
    let serviceCase;
    let serid = null, xValue = null;
    let dateNumber = 60, secondDateNumber = 60;
    let seridNumber;
    let standardStart, standardEnd, standardRealEnd;
    let possibleRange, possibleRealRange;
    let possibleTempArr;
    let possibleBoo;
    let realPossible;
    let selectedResult;
    let onlyOnlineCase = [], offlineOnlineCase = [];
    let pyeongIndex;

    // 추천할 디자이너 수를 3배로 증가시킵니다.
    selectNumber = selectNumber * 3;

    // 서비스 ID와 xValue 설정
    if (option.noCalculation !== true) {
      serviceCase = clientCase.caseService();
      if (serviceCase === null) {
        serid = null;
        xValue = null;
      } else {
        serid = serviceCase.serid[0].serid;
        xValue = serviceCase.xValue[0].xValue;
      }
      if (seridArr.length === 1) {
        serid = seridArr[0];
      }
      if (xValue === null || xValue === undefined) {
        xValue = "B";
      }

      // 비용 계산 함수를 정의합니다.
      feeCalculation = async function (arr) {
        if (!Array.isArray(arr)) {
          throw new Error("invalid input");
        }
        let feeObject;
        let newArr = [];
        let designer;

        try {
          for (let obj of arr) {
            feeObject = await instance.getDesignerFee(obj.desid, cliid, serid, xValue, { selfMongo: option.selfMongo, selfLocalMongo: option.selfLocalMongo });

            obj.resetFee(); // 현재 디자이너 객체의 비용 정보를 초기화합니다.

            // 오프라인 비용이 있는 경우, 이를 추가합니다.
            if (feeObject.detail.offline !== 0) {
              obj.appendFee("offline", feeObject.detail.offline, feeObject.detail.travel.number, feeObject.detail.distance, feeObject.detail.travel.distance, feeObject.detail.travel.time);
              designer = designers.search(obj.desid);
              if (designer !== null) {
                if (designer.analytics.project.online) {
                  obj.appendFee("online", feeObject.detail.online, feeObject.detail.travel.number, feeObject.detail.distance, feeObject.detail.travel.distance, feeObject.detail.travel.time);
                }
              }
            } else {
              designer = designers.search(obj.desid);
              if (designer !== null) {
                if (designer.analytics.project.online) {
                  obj.appendFee("online", feeObject.detail.online, feeObject.detail.travel.number, feeObject.detail.distance, feeObject.detail.travel.distance, feeObject.detail.travel.time);
                }
              }
            }

            // 온라인 비용이 있는 경우, 이를 배열에 추가합니다.
            if (feeObject.detail.online !== 0) {
              newArr.push(obj);
            }

            // 설정된 수량에 도달하면 반복문을 중지합니다.
            if (newArr.length === selectNumber) {
              break;
            }
          }
          return newArr;
        } catch (e) {
          console.log(e);
        }
      }
    }

    // 고객 히스토리에서 선호 디자이너 여부를 확인합니다.
    if (clientHistory.curation !== undefined) {
      if (Array.isArray(clientHistory.curation.style)) {
        if (clientHistory.curation.style.length > 0) {
          preferBoo = true;
          preferDesigners = clientHistory.curation.style;
        }
      }
    }

    // 서비스 ID에 따른 날짜 설정
    if (serid !== null && serid !== undefined && typeof serid === "string") {
      if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(serid)) {
        seridNumber = Number(serid.split('_')[1].replace(/[^0-9]/gi, '').replace(/^0/, '').replace(/^0/, ''));
        if (seridNumber === 1) {
          dateNumber = 35;
          secondDateNumber = 35;
        } else if (seridNumber === 2) {
          dateNumber = 45;
          secondDateNumber = 45;
        } else if (seridNumber === 3) {
          dateNumber = 60;
          secondDateNumber = 60;
        } else if (seridNumber === 4) {
          dateNumber = 60;
          secondDateNumber = 60;
        }
      }
    }

    // 표준 시작 및 종료 날짜 설정
    standardEnd = client.toNormal().requests[0].analytics.date.space.movein;
    standardStart = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardStart.setDate(standardStart.getDate() - dateNumber);
    standardRealEnd = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardRealEnd.setDate(standardRealEnd.getDate() + secondDateNumber);

    // 실시간 가능성 맵을 초기화합니다.
    realtimeMap = {};
    for (let { desid, possible } of realTimes) {
      realtimeMap[desid] = false;
      realPossible = this.realtimePossibleConverting(possible);
      for (let { start, end } of realPossible) {
        possibleBoo = (start.valueOf() <= standardStart.valueOf() && standardEnd.valueOf() <= end.valueOf());
        realtimeMap[desid] = possibleBoo;
        if (possibleBoo) {
          break;
        }
      }
    }

    // 실시간 가능성이 없는 경우, 범위를 재설정하여 다시 확인합니다.
    if (Object.values(realtimeMap).filter((b) => { return b === true; }).length === 0) {
      realtimeMap = {};
      for (let { desid, possible } of realTimes) {
        realtimeMap[desid] = false;
        realPossible = this.realtimePossibleConverting(possible);
        for (let { start, end } of realPossible) {
          possibleBoo = (start.valueOf() <= standardEnd.valueOf() && standardRealEnd.valueOf() <= end.valueOf());
          realtimeMap[desid] = possibleBoo;
          if (possibleBoo) {
            break;
          }
        }
      }
    }

    // 고객 사례에서 관련된 제안을 가져옵니다.
    final = clientCase.caseProposal();

    // 계산이 필요한 경우, 서비스 ID에 따라 필터링합니다.
    if (option.noCalculation !== true) {
      final = final.filter((project) => { return project.service.serid === serid });
      if (final.length <= (selectNumber * 4)) {
        final = await back.getProjectsByQuery({ "service.serid": serid }, { selfMongo: option.selfMongo, limit: 800 });
      }
    }

    // 선택된 디자이너를 저장할 배열을 초기화합니다.
    selected = [];
    for (let project of final) {
      if (project !== null) {
        temp = project.toNormal().proposal.detail.map((obj) => { return obj.desid });
        for (let desid of temp) {
          boo = false;
          designer = designers.search(desid);
          if (designer !== null && /완료/gi.test(designer.information.contract.status.value)) {
            boo = realtimeMap[desid];
            if (boo) {
              if (!selected.map((obj) => { return obj.desid }).includes(desid)) {
                selected.push(project.selectProposal(desid));
              }
            }
          }
          if (!preferBoo && selected.length === selectNumber) {
            break;
          }
        }
      }
      if (!preferBoo && selected.length === selectNumber) {
        break;
      }
    }

    // 고객 선호 디자이너를 반영하여 최종 선택된 디자이너 리스트를 생성합니다.
    selectedResult = [];
    if (preferBoo) {
      selectedDesigner = [];
      for (let desid of preferDesigners) {
        if (typeof selected.find((obj) => { return obj.desid === desid; }) === "object") {
          tempObj = selected.find((obj) => { return obj.desid === desid; });
          selectedDesigner.push(tempObj);
        }
      }
      if (selectedDesigner.length === 0) {
        if (option.noCalculation !== true) {
          selected = await feeCalculation(selected);
        }
        selected = selected.slice(0, selectNumber);
        selectedResult = selected;
      } else {
        if (option.noCalculation !== true) {
          selectedDesigner = await feeCalculation(selectedDesigner);
        }
        selectedDesigner = selectedDesigner.slice(0, selectNumber);
        selectedResult = selectedDesigner;
      }
    } else {
      if (option.noCalculation !== true) {
        selected = await feeCalculation(selected);
      }
      selected = selected.slice(0, selectNumber);
      selectedResult = selected;
    }

    // 거리 기준으로 정렬
    // 선택된 결과를 정렬하는데, 첫 번째 기준은 디자이너와 고객 간의 거리입니다.
    selectedResult.sort((a, b) => {
      // a와 b 각각의 fee 배열에서 첫 번째 요소의 거리(distance) 값을 비교하여 오름차순으로 정렬합니다.
      // 거리가 짧을수록 우선적으로 정렬됩니다.
      return a.fee[0].distance.amount - b.fee[0].distance.amount;
    });

    onlyOnlineCase = []; // 오직 온라인만 가능한 경우를 저장할 배열을 초기화합니다.
    offlineOnlineCase = []; // 오프라인과 온라인 모두 가능한 경우를 저장할 배열을 초기화합니다.

    // selectedResult 배열을 순회하면서 오직 온라인만 가능한 경우와 오프라인도 가능한 경우를 분류합니다.
    for (let p of selectedResult) {
      // p.fee 배열의 모든 요소에 대해, 해당 디자이너의 서비스가 온라인인 경우를 확인합니다.
      if (p.fee.every((obj) => { return obj.method === "online"; })) {
        // 모든 서비스가 온라인인 경우 onlyOnlineCase 배열에 추가합니다.
        onlyOnlineCase.push(p);
      } else {
        // 오프라인 서비스도 가능한 경우 offlineOnlineCase 배열에 추가합니다.
        offlineOnlineCase.push(p);
      }
    }

    // offlineOnlineCase 배열과 onlyOnlineCase 배열을 병합합니다.
    // 먼저 오프라인 서비스도 가능한 디자이너들이 포함된 offlineOnlineCase가 앞에 위치하고,
    // 그 다음으로 오직 온라인만 가능한 디자이너들이 포함된 onlyOnlineCase가 뒤에 위치합니다.
    selectedResult = offlineOnlineCase.concat(onlyOnlineCase);

    // 병합된 결과에서 selectNumber의 1.5배 만큼만 슬라이스하여 최종 selectedResult로 저장합니다.
    selectedResult = selectedResult.slice(0, selectNumber / 1.5);

    // selectNumber의 값을 1.5배 줄입니다.
    selectNumber = selectNumber / 1.5;

    // 평수 기준으로 정렬
    // pyeongStandards 배열에서 해당하는 평수 범위를 찾아내어 인덱스를 구합니다.
    pyeongIndex = pyeongStandards.findIndex((arr) => {
      // client.requests[0].request.space.pyeong.value가 평수 기준 내에 포함되는지 확인합니다.
      return arr[0] <= client.requests[0].request.space.pyeong.value && arr[1] >= client.requests[0].request.space.pyeong.value;
    }) + 1;

    // 서비스 ID를 기준으로 분류합니다. 서비스 ID가 3보다 작은 경우 스타일링 수준을 기준으로 정렬합니다.
    if (Number(serid.split('_')[1].replace(/[^0-9]/gi, '')) < 3) {
      if (pyeongIndex === 1) {
        // pyeongIndex가 1인 경우, 스타일링 수준이 낮은 순서대로 정렬합니다.
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.styling.level - pyeongIndex) - (designers.search(b.desid).analytics.styling.level - pyeongIndex);
        });
      } else if (pyeongIndex === 2) {
        // pyeongIndex가 2인 경우, 스타일링 수준이 pyeongIndex보다 낮은 디자이너를 우선적으로 정렬합니다.
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.styling.level - pyeongIndex < 0 ? 0.5 : designers.search(a.desid).analytics.styling.level - pyeongIndex) - (designers.search(b.desid).analytics.styling.level - pyeongIndex < 0 ? 0.5 : designers.search(b.desid).analytics.styling.level - pyeongIndex);
        });
      } else {
        // pyeongIndex가 3인 경우, pyeongIndex와의 차이가 적은 디자이너가 우선되도록 정렬합니다.
        selectedResult.sort((a, b) => {
          return (pyeongIndex - designers.search(a.desid).analytics.styling.level) - (pyeongIndex - designers.search(b.desid).analytics.styling.level);
        });
      }
    } else {
      // 서비스 ID가 3 이상인 경우, 건설 수준을 기준으로 정렬합니다.
      if (pyeongIndex === 1) {
        // pyeongIndex가 1인 경우, 건설 수준이 낮은 순서대로 정렬합니다.
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.construct.level - pyeongIndex) - (designers.search(b.desid).analytics.construct.level - pyeongIndex);
        });
      } else if (pyeongIndex === 2) {
        // pyeongIndex가 2인 경우, 건설 수준이 pyeongIndex보다 낮은 디자이너를 우선적으로 정렬합니다.
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.construct.level - pyeongIndex < 0 ? 0.5 : designers.search(a.desid).analytics.construct.level - pyeongIndex) - (designers.search(b.desid).analytics.construct.level - pyeongIndex < 0 ? 0.5 : designers.search(b.desid).analytics.construct.level - pyeongIndex);
        });
      } else {
        // pyeongIndex가 3인 경우, pyeongIndex와의 차이가 적은 디자이너가 우선되도록 정렬합니다.
        selectedResult.sort((a, b) => {
          return (pyeongIndex - designers.search(a.desid).analytics.construct.level) - (pyeongIndex - designers.search(b.desid).analytics.construct.level);
        });
      }
    }

    // 최종 선택된 디자이너 리스트를 반환합니다.
    return selectedResult.slice(0, selectNumber / 2);

  } catch (e) {
    errorLog(e).catch((err) => { console.log(err) });
    return []; // 오류 발생 시 빈 배열을 반환합니다.
  }
}

/**
 * 이 메서드는 특정 고객(cliid)에 대해 디자이너 추천을 초기화하고 다시 추천 리스트를 생성하여 프로젝트에 업데이트하는 역할을 합니다.
 * @async
 * @param {string} cliid - 고객 아이디 또는 프로젝트 아이디입니다. 'c'로 시작하면 고객 아이디, 'p'로 시작하면 프로젝트 아이디입니다.
 * @param {Object} option - 선택적 파라미터로, 데이터베이스 연결 객체를 포함할 수 있습니다.
 * @param {Object} option.selfMongo - 이미 연결된 MongoDB 객체를 사용하려면 여기에 전달합니다.
 * @param {Object} option.selfLocalMongo - 로컬 MongoDB 객체를 사용하려면 여기에 전달합니다.
 * @returns {Promise<number>} - 업데이트된 디자이너 추천 리스트의 개수를 반환합니다.
 * @throws {Error} - 잘못된 입력이 전달될 경우 에러를 던집니다.
 */
BackWorker.prototype.proposalReset = async function (cliid, option = { selfMongo: null, selfLocalBoo: null }) {
  // cliid가 문자열인지 확인하고, 아니면 에러를 던집니다.
  if (typeof cliid !== "string") {
    throw new Error("invaild input");
  }

  // cliid가 'c' 또는 'p'로 시작하는지 확인하고, 아니면 에러를 던집니다.
  if (!/^[cp]/.test(cliid)) {
    throw new Error("invaild input");
  }

  const instance = this;  // 현재 객체의 참조를 유지하기 위해 instance에 할당합니다.
  const back = this.back;  // this.back은 BackWorker 클래스의 다른 메서드 및 속성을 사용하기 위해 가져옵니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;  // Mother 클래스의 mongo 관련 정보를 가져옵니다.

  try {
    let selfMongo, selfLocalMongo;  // MongoDB와 로컬 MongoDB 객체를 초기화합니다.
    let selfBoo, selfLocalBoo;  // MongoDB와 로컬 MongoDB 객체의 존재 여부를 판단하는 변수입니다.
    let detail, update;  // 세부 사항(detail)과 업데이트할 내용(update)을 저장할 변수를 선언합니다.
    let projects;  // 해당 고객의 프로젝트 목록을 저장할 변수를 선언합니다.

    // 옵션에서 selfMongo가 정의되지 않았으면 false를 설정하여 새로운 연결을 생성합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    // 옵션에서 selfLocalMongo가 정의되지 않았으면 false를 설정하여 새로운 로컬 연결을 생성합니다.
    if (option.selfLocalMongo === undefined || option.selfLocalMongo === null) {
      selfLocalBoo = false;
    } else {
      selfLocalBoo = true;
    }

    // selfMongo가 없을 경우 새로운 MongoDB 연결을 생성합니다.
    if (!selfBoo) {
      selfMongo = new mongo(mongoinfo);
      await selfMongo.connect();  // MongoDB에 연결합니다.
    } else {
      selfMongo = option.selfMongo;  // 이미 존재하는 MongoDB 연결을 사용합니다.
    }

    // selfLocalMongo가 없을 경우 새로운 로컬 MongoDB 연결을 생성합니다.
    if (!selfLocalBoo) {
      selfLocalMongo = new mongo(mongolocalinfo);
      await selfLocalMongo.connect();  // 로컬 MongoDB에 연결합니다.
    } else {
      selfLocalMongo = option.selfLocalMongo;  // 이미 존재하는 로컬 MongoDB 연결을 사용합니다.
    }

    // cliid가 고객 아이디로 시작하는 경우, 해당 고객의 프로젝트를 가져옵니다.
    projects = await back.getProjectsByQuery({ cliid }, { selfMongo });

    // cliid가 'c'로 시작하면 고객 아이디로 프로젝트를 조회합니다.
    if (/^c/.test(cliid)) {
      projects = await back.getProjectsByQuery({ cliid }, { selfMongo });
    } 
    // cliid가 'p'로 시작하면 프로젝트 아이디로 프로젝트를 조회합니다.
    else if (/^p/.test(cliid)) {
      projects = await back.getProjectById(cliid, { selfMongo });
      if (projects === null) {
        projects = [];  // 프로젝트가 없으면 빈 배열로 설정합니다.
      } else {
        projects = [projects];  // 프로젝트가 있으면 배열로 변환합니다.
      }
    } 
    // cliid가 유효한 형식이 아니면 에러를 던집니다.
    else {
      throw new Error("invaild id");
    }

    // 하나 이상의 프로젝트가 있을 경우, 첫 번째 프로젝트에 대해 디자이너 추천을 초기화합니다.
    update = [];
    if (projects.length > 0) {
      const project = projects[0];  // 첫 번째 프로젝트를 선택합니다.
      const { proid, cliid: id, service: { serid } } = project;  // 프로젝트 정보에서 필요한 데이터를 추출합니다.

      // 디자이너 추천 리스트를 생성합니다.
      detail = await instance.designerCuration(id, 4, [serid], { selfMongo, selfLocalMongo });

      // 추천된 디자이너 리스트를 업데이트 목록에 추가합니다.
      for (let d of detail) {
        update.push(d.toNormal());
      }

      // 업데이트할 내용이 있으면 프로젝트 정보를 업데이트합니다.
      if (update.length > 0) {
        await back.updateProject([{ proid }, { "proposal.detail": update }], { selfMongo });
      }
    }

    // selfMongo 객체를 생성한 경우, 작업 후 연결을 닫습니다.
    if (!selfBoo) {
      await selfMongo.close();
    }

    // selfLocalMongo 객체를 생성한 경우, 작업 후 연결을 닫습니다.
    if (!selfLocalBoo) {
      await selfLocalMongo.close();
    }

    // 업데이트된 디자이너 추천 리스트의 개수를 반환합니다.
    return update.length;
  } catch (e) {
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * 이 메서드는 실시간으로 디자이너의 일정 정보를 동기화하여 업데이트하는 기능을 수행합니다.
 * 프로젝트 ID를 기반으로 해당 프로젝트의 일정과 디자이너의 일정을 비교하고, 
 * 그 결과를 실시간 일정 컬렉션에 반영합니다.
 * @async
 * @param {string} proid - 프로젝트 ID로, 'p'로 시작하는 문자열이어야 합니다.
 * @param {Object} option - 옵션 객체로, 이미 연결된 MongoDB 객체 등을 포함할 수 있습니다.
 * @param {Object} option.selfMongo - 이미 연결된 MongoDB 객체를 사용할 경우 전달합니다.
 * @param {Object} option.selfConsoleMongo - 로컬 MongoDB 객체를 사용할 경우 전달합니다.
 * @returns {Promise<Object>} - 동기화 결과를 담은 객체를 반환합니다.
 * @throws {Error} - 잘못된 입력이 전달될 경우 에러를 던집니다.
 */
BackWorker.prototype.realtimeDesignerSync = async function (proid, option = { selfMongo: null, selfConsoleMongo: null }) {
  // proid가 문자열인지 확인합니다.
  if (typeof proid !== "string") {
    throw new Error("invaild input");
  }

  // proid가 'p'로 시작하는지 확인합니다.
  if (!/^[p]/.test(proid)) {
    throw new Error("invaild input");
  }

  const instance = this; // 현재 객체의 참조를 유지하기 위해 instance에 할당합니다.
  const back = this.back; // BackWorker 클래스의 다른 메서드 및 속성을 사용하기 위해 back에 할당합니다.
  const { mongo, mongoinfo, mongoconsoleinfo, equalJson, dateToString } = this.mother; // Mother 클래스의 메서드와 정보를 가져옵니다.

  const collection = "realtimeDesigner"; // 실시간 디자이너 일정 정보를 저장하는 MongoDB 컬렉션 이름입니다.
  
  // 객체의 깊은 복사를 수행하는 함수입니다.
  const deepCopy = (obj) => { return equalJson(JSON.stringify(obj)); }

  // 날짜 객체의 깊은 복사를 수행하는 함수입니다.
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }

  let selfMongo, selfConsoleMongo; // MongoDB와 로컬 MongoDB 객체를 초기화합니다.
  let selfBoo, selfConsoleBoo; // MongoDB와 로컬 MongoDB 객체의 존재 여부를 판단하는 변수입니다.

  // 옵션에서 selfMongo가 정의되지 않았으면 false를 설정하여 새로운 연결을 생성합니다.
  if (option.selfMongo === null || option.selfMongo === undefined) {
    selfBoo = false;
  } else {
    selfBoo = true;
  }

  // 옵션에서 selfConsoleMongo가 정의되지 않았으면 false를 설정하여 새로운 로컬 연결을 생성합니다.
  if (option.selfConsoleMongo === null || option.selfConsoleMongo === undefined) {
    selfConsoleBoo = false;
  } else {
    selfConsoleBoo = true;
  }

  try {
    let project, realTimes, realTime, possible; // 프로젝트와 실시간 데이터를 저장할 변수들을 선언합니다.
    let result0, result1, result2; // 결과 데이터를 저장할 변수들을 선언합니다.
    let from, to; // 프로젝트의 시작 및 종료 날짜를 저장할 변수입니다.
    let copied0, copied1, copied2; // 복사된 데이터 객체를 저장할 변수들입니다.
    let tempDate, tempObj; // 임시 날짜와 객체를 저장할 변수입니다.
    let finalBoo; // 최종 결과 처리를 위한 부울 변수입니다.
    let desid; // 디자이너 ID를 저장할 변수입니다.
    let updatedProids; // 업데이트된 프로젝트 ID 목록을 저장할 변수입니다.
    let final; // 최종 결과 데이터를 저장할 변수입니다.

    // selfMongo가 없을 경우 새로운 MongoDB 연결을 생성합니다.
    if (!selfBoo) {
      selfMongo = new mongo(mongoinfo);
      await selfMongo.connect();
    } else {
      selfMongo = option.selfMongo; // 이미 존재하는 MongoDB 연결을 사용합니다.
    }

    // selfConsoleMongo가 없을 경우 새로운 로컬 MongoDB 연결을 생성합니다.
    if (!selfConsoleBoo) {
      selfConsoleMongo = new mongo(mongoconsoleinfo);
      await selfConsoleMongo.connect();
    } else {
      selfConsoleMongo = option.selfConsoleMongo; // 이미 존재하는 로컬 MongoDB 연결을 사용합니다.
    }

    // 프로젝트 ID로 해당 프로젝트의 정보를 가져옵니다.
    project = await back.getProjectById(proid, { selfMongo });
    if (project === null) {
      throw new Error("invaild proid");
    }

    desid = project.desid; // 프로젝트의 디자이너 ID를 가져옵니다.
    if (desid === "") {
      throw new Error("invaild project");
    }

    // 디자이너 ID로 해당 디자이너의 정보를 가져옵니다.
    designer = await back.getDesignerById(desid, { selfMongo });
    if (designer === null) {
      throw new Error("invaild desid");
    }

    // 실시간 디자이너 일정 데이터를 가져옵니다.
    realTimes = await back.mongoRead(collection, { desid }, { selfMongo: selfConsoleMongo });
    if (realTimes.length === 0) {
      throw new Error("there is no realtime in this designer");
    }

    [realTime] = realTimes; // 가져온 실시간 데이터를 할당합니다.
    [{ possible }] = realTimes; // 가능한 일정 데이터를 추출합니다.
    
    // 기존 업데이트된 프로젝트 ID 목록을 복사합니다.
    updatedProids = (realTime.updatedProids === undefined ? [] : deepCopy(realTime.updatedProids));

    from = project.process.contract.form.date.from; // 프로젝트 시작 날짜를 가져옵니다.
    to = project.process.contract.form.date.to; // 프로젝트 종료 날짜를 가져옵니다.

    // 시간 정보를 0으로 초기화하여 날짜 비교를 용이하게 합니다.
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);

    result0 = []; // 가능한 일정 데이터를 저장할 배열을 초기화합니다.

    // 가능한 일정 데이터를 순회하면서 처리합니다.
    for (let obj of possible) {
      // 시작 시간을 자정으로 초기화하여 날짜만 비교할 수 있도록 설정합니다.
      obj.start.setHours(0, 0, 0, 0);
      // 종료 시간을 자정으로 초기화하여 날짜만 비교할 수 있도록 설정합니다.
      obj.end.setHours(0, 0, 0, 0);

      // 프로젝트의 종료 날짜(to)가 가능한 일정의 시작 날짜보다 이전인 경우
      if (to.valueOf() < obj.start.valueOf()) {
        // 해당 일정은 영향을 받지 않으므로 그대로 result0에 추가합니다.
        result0.push(deepCopy(obj));

      // 프로젝트의 종료 날짜(to)가 가능한 일정의 종료 날짜와 같거나 그 이전인 경우
      } else if (to.valueOf() <= obj.end.valueOf()) {
        
        // 프로젝트의 시작 날짜(from)가 가능한 일정의 시작 날짜보다 이전인 경우
        if (from.valueOf() < obj.start.valueOf()) {
          // 가능한 일정의 끝을 프로젝트의 종료 날짜로 조정한 새로운 객체를 생성합니다.
          copied0 = deepCopy(obj);
          copied0.end = dateCopy(to);
          copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied0);

          // 프로젝트의 종료 날짜가 일정의 종료 날짜와 동일하지 않은 경우
          if (dateToString(to) !== dateToString(obj.end)) {
            // 일정의 시작 날짜를 프로젝트의 종료 날짜 다음 날로 조정한 새로운 객체를 생성합니다.
            copied1 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied1.start = tempDate;
            result0.push(copied1);
          }

        // 프로젝트의 시작 날짜와 가능한 일정의 시작 날짜가 동일하고, 종료 날짜도 동일한 경우
        } else {

          if (dateToString(from) === dateToString(obj.start) && dateToString(to) === dateToString(obj.end)) {
            // 가능한 일정의 matrix 값을 조정하고 그대로 추가합니다.
            copied0 = deepCopy(obj);
            copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied0);

          // 프로젝트의 시작 날짜와 가능한 일정의 시작 날짜가 동일하나, 종료 날짜가 다를 경우
          } else if (dateToString(from) === dateToString(obj.start) && dateToString(to) !== dateToString(obj.end)) {
            // 가능한 일정의 끝을 프로젝트의 종료 날짜로 조정한 새로운 객체를 생성합니다.
            copied0 = deepCopy(obj);
            copied0.end = dateCopy(to);
            copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied0);

            // 일정의 시작 날짜를 프로젝트의 종료 날짜 다음 날로 조정한 새로운 객체를 생성합니다.
            copied1 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied1.start = tempDate;
            result0.push(copied1);

          // 프로젝트의 시작 날짜와 가능한 일정의 시작 날짜가 다르지만 종료 날짜가 동일한 경우
          } else if (dateToString(from) !== dateToString(obj.start) && dateToString(to) === dateToString(obj.end)) {
            // 가능한 일정의 끝을 프로젝트의 시작 날짜 전 날로 조정한 새로운 객체를 생성합니다.
            copied0 = deepCopy(obj);
            tempDate = dateCopy(from);
            tempDate.setDate(tempDate.getDate() - 1);
            copied0.end = tempDate;
            result0.push(copied0);

            // 프로젝트의 시작 날짜와 동일하게 시작하여 종료 날짜까지 조정된 새로운 객체를 생성합니다.
            copied1 = deepCopy(obj);
            copied1.start = dateCopy(from);
            copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied1);

          // 프로젝트의 시작 날짜와 종료 날짜가 가능한 일정과 다를 경우 (양쪽 모두 다름)
          } else {
            // 가능한 일정의 끝을 프로젝트의 시작 날짜 전 날로 조정한 새로운 객체를 생성합니다.
            copied0 = deepCopy(obj);
            tempDate = dateCopy(from);
            tempDate.setDate(tempDate.getDate() - 1);
            copied0.end = dateCopy(tempDate);
            result0.push(copied0);

            // 프로젝트 기간과 동일한 일정을 조정하여 추가합니다.
            copied1 = deepCopy(obj);
            copied1.start = dateCopy(from);
            copied1.end = dateCopy(to);
            copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied1);

            // 프로젝트의 종료 날짜 이후 일정을 조정하여 추가합니다.
            copied2 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied2.start = dateCopy(tempDate);
            result0.push(copied2);
          }
        }

      // 프로젝트의 시작 날짜(from)가 가능한 일정의 시작 날짜보다 이후인 경우
      } else {
        if (from.valueOf() < obj.start.valueOf()) {
          // 가능한 일정의 matrix 값을 조정하고 그대로 추가합니다.
          copied0 = deepCopy(obj);
          copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied0);

        // 프로젝트의 시작 날짜(from)가 가능한 일정의 종료 날짜 이전인 경우
        } else if (from.valueOf() < obj.end.valueOf()) {
          // 가능한 일정의 끝을 프로젝트의 시작 날짜 전 날로 조정한 새로운 객체를 생성합니다.
          copied0 = deepCopy(obj);
          tempDate = dateCopy(from);
          tempDate.setDate(tempDate.getDate() - 1);
          copied0.end = dateCopy(tempDate);
          result0.push(copied0);

          // 프로젝트의 시작 날짜와 동일하게 시작하여 조정된 새로운 객체를 추가합니다.
          copied1 = deepCopy(obj);
          copied1.start = dateCopy(from);
          copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied1);

        // 그 외의 경우, 가능한 일정은 그대로 유지합니다.
        } else {
          result0.push(deepCopy(obj));
        }
      }
    }

    // 최종적으로 사용할 결과 데이터를 저장할 배열을 초기화합니다.
    result1 = [];
    for (let obj of result0) {
      // 모든 일정의 시간을 자정으로 초기화하여 날짜만 비교할 수 있도록 설정합니다.
      obj.start.setHours(0, 0, 0, 0);
      obj.end.setHours(0, 0, 0, 0);

      // 시작 날짜가 종료 날짜보다 빠르거나 같고, matrix가 0이 아닌 경우에만 추가합니다.
      if (obj.start.valueOf() <= obj.end.valueOf()) {
        if (!obj.matrix.every((n) => { return n === 0; })) {
          result1.push(deepCopy(obj));
        }
      }
    }

    // 중복된 일정이나 연결된 일정을 병합하여 최종 결과를 만듭니다.
    result2 = [];
    finalBoo = true;
    for (let i = 0; i < result1.length - 1; i++) {
      // 현재 일정의 종료 날짜 다음 날이 다음 일정의 시작 날짜보다 같거나 빠르며, matrix가 동일한 경우 병합합니다.
      tempDate = dateCopy(result1[i].end);
      tempDate.setDate(tempDate.getDate() + 1);
      if (result1[i + 1].start.valueOf() <= tempDate.valueOf() && JSON.stringify(result1[i].matrix) === JSON.stringify(result1[i + 1].matrix)) {
        tempObj = deepCopy(result1[i]);
        tempObj.end = dateCopy(result1[i + 1].end);
        result2.push(deepCopy(tempObj));
        finalBoo = false;
      } else {
        // 병합되지 않은 일정은 그대로 추가합니다.
        if (finalBoo) {
          result2.push(deepCopy(result1[i]));
        }
        finalBoo = true;
      }
    }

    // 마지막 남은 일정을 추가합니다.
    if (finalBoo) {
      result2.push(deepCopy(result1[result1.length - 1]));
    }

    // 업데이트된 프로젝트 ID 목록에 현재 프로젝트 ID를 추가하고, 데이터베이스에 반영합니다.
    if (!updatedProids.includes(proid)) {
      updatedProids.push(proid);
      await back.mongoUpdate(collection, [{ desid }, { possible: result2, updatedProids }], { selfMongo: selfConsoleMongo });
      realTime.possible = result2;
      realTime.updatedProids = updatedProids;
    }

    // 최종 결과를 반환하기 전에 필요 없는 ID를 삭제합니다.
    final = deepCopy(realTime);
    delete final._id;

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await selfMongo.close();
      selfBoo = true;
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
      selfConsoleBoo = true;
    }

    // 최종 결과를 반환합니다.
    return {
      message: "success",
      result: final,
    };

  } catch (e) {
    await errorLog(e);
    return { message: "error : " + e.message };
  } finally {
    if (!selfBoo) {
      await selfMongo.close();
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
    }
  }
}

/**
 * 디자이너의 가능한 일정 배열을 기반으로 일정이 가능한지 여부를 판단하는 메서드입니다.
 * 이 메서드는 가능한 일정들을 병합하고 최종적으로 가능한 일정 목록을 반환합니다.
 * @async
 * @param {Array} possibleArr - 디자이너의 가능한 일정이 담겨 있는 배열입니다. 각 객체는 start와 end 날짜를 포함해야 합니다.
 * @param {number} [dateMargin=10] - 일정 병합을 고려하는 날짜 간격입니다. 기본값은 10일입니다.
 * @returns {Array} - 병합된 가능한 일정 목록을 반환합니다.
 * @throws {Error} - 유효하지 않은 입력이 제공된 경우 오류를 발생시킵니다.
 */
BackWorker.prototype.realtimePossibleConverting = function (possibleArr, dateMargin = 10) {
  // possibleArr가 배열인지 확인합니다. 배열이 아닌 경우 오류를 발생시킵니다.
  if (!Array.isArray(possibleArr)) {
    console.log(possibleArr); // 디버깅을 위해 입력을 출력합니다.
    throw new Error("invaild input : must be possible array"); // 오류 발생
  }
  // 배열의 모든 요소가 객체인지 확인합니다.
  if (!possibleArr.every((obj) => { return typeof obj === "object" })) {
    console.log(possibleArr); // 디버깅을 위해 입력을 출력합니다.
    throw new Error("invaild input : must be possible array"); // 오류 발생
  }
  // 배열의 모든 요소가 start와 end 속성을 가지고 있는지 확인합니다.
  if (!possibleArr.every((obj) => { return (obj.start !== undefined && obj.end !== undefined) })) {
    console.log(possibleArr); // 디버깅을 위해 입력을 출력합니다.
    throw new Error("invaild input : must be possible array"); // 오류 발생
  }
  // dateMargin이 숫자인지 확인하고, 그렇지 않은 경우 기본값 10을 설정합니다.
  if (typeof dateMargin !== "number") {
    dateMargin = 10;
  }

  // 필요한 내부 메서드와 상수를 초기화합니다.
  const instance = this;
  const { equalJson, dateToString } = this.mother;
  let rawPossibleArr;
  let indexArr, indexArrFlat;
  let tempDateArr;
  let tempDate2;
  let tempObj;
  let removeTargets;
  let indexArrReverse;
  let indexArrFinal;
  let dateBoo;
  try {
    // 입력된 possibleArr를 복사하여 rawPossibleArr에 저장합니다. 객체의 start와 end 속성만을 유지합니다.
    rawPossibleArr = possibleArr.map((obj) => { return { start: obj.start, end: obj.end }; });

    // 가능한 일정 배열을 병합하는 작업을 반복합니다.
    do {
      indexArr = []; // 병합할 일정의 인덱스를 저장할 배열을 초기화합니다.
      
      // rawPossibleArr 배열을 순회하며 병합 가능한 일정의 인덱스를 찾습니다.
      for (let i = 0; i < rawPossibleArr.length - 1; i++) {
        tempDateArr = new Array(dateMargin); // 날짜 간격만큼의 배열을 생성합니다.
        
        // 날짜 간격만큼의 날짜 배열을 생성합니다.
        for (let j = 0; j < dateMargin; j++) {
          tempDateArr[j] = new Date(JSON.stringify(rawPossibleArr[i].end).slice(1, -1)); // 종료 날짜를 복사합니다.
          tempDateArr[j].setDate(tempDateArr[j].getDate() + (j + 1)); // 종료 날짜에 간격을 더합니다.
          tempDateArr[j] = dateToString(tempDateArr[j]); // 날짜를 문자열로 변환합니다.
        }

        // 다음 일정의 시작 날짜를 가져옵니다.
        tempDate2 = new Date(JSON.stringify(rawPossibleArr[i + 1].start).slice(1, -1));
        
        // 두 일정이 병합 가능한지 확인하고, 병합 가능한 경우 인덱스를 저장합니다.
        if (tempDateArr.includes(dateToString(tempDate2))) {
          indexArr.push(i);
        }
      }

      // 병합할 일정이 있는 경우
      if (indexArr.length > 0) {

        // 병합할 일정의 인덱스 배열을 생성하고, 이를 평탄화합니다.
        indexArr = indexArr.map((num) => { return [ num, num + 1 ] });
        indexArrFlat = indexArr.flat();

        // 병합 과정에서 중복된 일정 인덱스를 제거합니다.
        tempObj = {};
        for (let a of indexArrFlat) {
          if (tempObj['a' + String(a)] !== undefined) {
            tempObj['a' + String(a)] = tempObj['a' + String(a)] + 1;
          } else {
            tempObj['a' + String(a)] = 1;
          }
        }

        // 중복된 일정의 인덱스를 제거 대상 목록에 추가합니다.
        removeTargets = [];
        for (let key in tempObj) {
          if (tempObj[key] !== 1) {
            removeTargets.push(Number(key.replace(/[^0-9]/gi, '')));
          }
        }

        // 병합되지 않은 인덱스를 필터링합니다.
        indexArrReverse = [];
        for (let i = 0; i < rawPossibleArr.length; i++) {
          indexArrReverse.push(i);
        }
        indexArrReverse = indexArrReverse.filter((num) => { return !indexArrFlat.includes(num); });
        indexArrFlat = indexArrFlat.filter((num) => { return !removeTargets.includes(num); })

        // 최종 병합된 인덱스 배열을 생성합니다.
        indexArrFinal = [];
        for (let i = 0; i < indexArrFlat.length; i++) {
          if (i % 2 === 0) {
            indexArrFinal.push([ indexArrFlat[i], indexArrFlat[i + 1] ]);
          }
        }

        // 병합된 일정의 시작과 종료 날짜를 조정합니다.
        indexArrFinal = indexArrFinal.map((arr) => {
          return {
            start: new Date(JSON.stringify(rawPossibleArr[arr[0]].start).slice(1, -1)),
            end: new Date(JSON.stringify(rawPossibleArr[arr[1]].end).slice(1, -1))
          };
        });

        // 병합되지 않은 일정들을 최종 배열에 추가합니다.
        for (let index of indexArrReverse) {
          indexArrFinal.push(equalJson(JSON.stringify(rawPossibleArr[index])));
        }
        // 병합된 일정들을 시작 날짜 순으로 정렬합니다.
        indexArrFinal.sort((a, b) => {
          return a.start.valueOf() - b.start.valueOf();
        });

        // 병합된 일정을 rawPossibleArr에 저장하여 반복 작업을 계속합니다.
        rawPossibleArr = equalJson(JSON.stringify(indexArrFinal));

        dateBoo = true; // 병합 작업이 계속 진행되었음을 표시합니다.
      } else {
        dateBoo = false; // 병합할 일정이 없음을 표시합니다.
      }
    } while (dateBoo); // 병합 작업이 가능할 때까지 반복합니다.

    // 최종 병합된 일정을 반환합니다.
    return rawPossibleArr;

  } catch (e) {
    errorLog(e).catch((err) => { console.log(err) });
  }
}

/**
 * 프로젝트에서 일정이 가능한 디자이너를 찾아주는 메서드입니다.
 * 주어진 디자이너 ID와 프로젝트 ID를 기반으로 해당 디자이너가 프로젝트 기간 동안 일정이 가능한지 여부를 확인합니다.
 * @async
 * @param {string} desid - 디자이너 ID입니다.
 * @param {string} proid - 프로젝트 또는 고객 ID입니다.
 * @param {string|object} serid - 서비스 ID 또는 옵션 객체입니다.
 * @param {string} xValue - 서비스의 xValue 값입니다.
 * @param {object} [option={}] - 데이터베이스 연결 객체 등의 옵션입니다.
 * @returns {object} - 디자이너의 일정 가능 여부와 프로젝트 일정 정보를 반환합니다.
 * @throws {Error} - 입력 값이 유효하지 않을 경우 오류를 발생시킵니다.
 */
BackWorker.prototype.realtimeDesignerMatch = async function (desid, proid, serid, xValue, option = { selfMongo: null, selfConsoleMongo: null }) {
  // desid와 proid가 문자열인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
  if (typeof desid !== "string" || typeof proid !== "string") {
    throw new Error("invaild input");
  }
  // desid가 'd'로 시작하는지 확인합니다.
  if (!/^[d]/.test(desid)) {
    throw new Error("invaild desid");
  }
  // proid가 'c' 또는 'p'로 시작하는지 확인합니다.
  if (!/^[cp]/.test(proid)) {
    throw new Error("invaild proid or cliid");
  }
  // serid가 객체일 경우 option으로 간주합니다.
  if (typeof serid === "object" && serid !== null) {
    option = serid;
  } else if (typeof serid === "string") {
    // serid가 문자열이고 xValue와 option이 올바른 형태인지 확인합니다.
    if (typeof xValue !== "string" || typeof option !== "object") {
      throw new Error("invaild xValue or option");
    }
  } else {
    throw new Error("invaild serid position");
  }

  // 변수 선언 및 초기화
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongoconsoleinfo, equalJson, dateToString, serviceParsing } = this.mother;
  const collection = "realtimeDesigner"; // 실시간 디자이너 정보를 저장하는 컬렉션 이름
  const dateMargin = 10; // 날짜 마진 기본값
  let selfMongo, selfConsoleMongo;
  let selfBoo, selfConsoleBoo;

  // MongoDB 연결 옵션 설정
  if (option.selfMongo === null || option.selfMongo === undefined) {
    selfBoo = false;
  } else {
    selfBoo = true;
  }
  if (option.selfConsoleMongo === null || option.selfConsoleMongo === undefined) {
    selfConsoleBoo = false;
  } else {
    selfConsoleBoo = true;
  }

  try {
    let project;
    let cliid, client;
    let requestNumber;
    let startDate, endDate;
    let designerRealtime;
    let boo;
    let rawPossibleArr;
    let online;

    // MongoDB 연결 설정
    if (!selfBoo) {
      selfMongo = new mongo(mongoinfo);
      await selfMongo.connect();
    } else {
      selfMongo = option.selfMongo;
    }
    if (!selfConsoleBoo) {
      selfConsoleMongo = new mongo(mongoconsoleinfo);
      await selfConsoleMongo.connect();
    } else {
      selfConsoleMongo = option.selfConsoleMongo;
    }

    // 프로젝트 ID가 'p'로 시작하는 경우
    if (/^p/.test(proid)) {
      project = await back.getProjectById(proid, { selfMongo }); // 프로젝트 정보를 가져옵니다.
      cliid = project.cliid; // 해당 프로젝트의 고객 ID를 가져옵니다.
      client = await back.getClientById(cliid, { selfMongo }); // 고객 정보를 가져옵니다.
      requestNumber = 0; // 요청 번호 초기화
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      online = project.service.online; // 온라인 서비스 여부
      serid = project.service.serid; // 서비스 ID
      xValue = project.service.xValue; // 서비스 xValue
    } else {
      cliid = proid; // 고객 ID 설정
      client = await back.getClientById(cliid, { selfMongo }); // 고객 정보 가져오기
      requestNumber = 0; // 요청 번호 초기화
      online = false; // 온라인 서비스 여부 초기화
    }

    // 프로젝트 일정 계산
    startDate = client.toNormal().requests[requestNumber].analytics.date.space.movein;
    endDate = client.toNormal().requests[requestNumber].analytics.date.space.movein;
    // 서비스 기간을 고려하여 시작 날짜를 조정합니다.
    startDate.setDate(startDate.getDate() - serviceParsing({ online, serid, xValue }, true));

    // 날짜 마진을 고려하여 시작 및 종료 날짜를 조정합니다.
    startDate.setDate(startDate.getDate() + dateMargin);
    endDate.setDate(endDate.getDate() - dateMargin);

    // 디자이너의 실시간 가능한 일정 정보를 가져옵니다.
    designerRealtime = await back.mongoRead(collection, { desid }, { selfMongo: selfConsoleMongo });
    // 가능한 일정을 변환합니다.
    rawPossibleArr = this.realtimePossibleConverting(designerRealtime[0].possible, dateMargin);

    // 일정이 가능한지 여부를 확인합니다.
    boo = false;
    for (let { start, end } of rawPossibleArr) {
      if (start.valueOf() <= startDate.valueOf() && endDate.valueOf() <= end.valueOf()) {
        boo = true;
        break;
      }
    }

    // MongoDB 연결 해제
    if (!selfBoo) {
      await selfMongo.close();
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
    }

    // 일정 가능 여부와 함께 결과를 반환합니다.
    return {
      result: boo,
      possible: rawPossibleArr,
      project: {
        start: startDate,
        end: endDate
      },
    };

  } catch (e) {
    await errorLog(e);
    return { message: "error : " + e.message }; // 오류 메시지 반환
  }
}

/**
 * 이 메서드는 고객의 응대 상태를 자동으로 업데이트하고, 각 고객의 상황에 맞는 적절한 응대 상태로 변경해주는 기능을 수행합니다.
 * 이 과정에서 MongoDB 연결 객체들을 사용하여 필요한 데이터를 가져오고, 응대 상태를 업데이트합니다.
 * @async
 * @param {object} option - 다양한 MongoDB 연결 객체와 설정을 포함하는 옵션 객체입니다.
 */
BackWorker.prototype.clientActionSync = async function (option = { selfMongo: null, selfConsoleMongo: null, updateMongo: null }) {
  // 인스턴스 내의 다른 메서드와 변수를 사용하기 위해 현재 인스턴스를 instance로 저장
  const instance = this;

  // BackWorker 인스턴스 내의 back 객체를 참조합니다. 이 객체는 데이터베이스 관련 작업을 처리합니다.
  const back = this.back;

  // Mother 객체에서 필요한 메서드들을 구조 분해 할당으로 불러옵니다.
  // 여기에는 MongoDB 연결 정보, JSON 비교 함수, 요청 시스템 등이 포함됩니다.
  const { mongo, mongoinfo, mongolocalinfo, equalJson, requestSystem } = this.mother;

  /**
   * 응대 상태(action)와 일치하는 고객과 해당 고객의 히스토리를 필터링하는 함수입니다.
   * 
   * @param {string} action - 필터링할 응대 상태
   * @param {Array} clients - 필터링할 고객 목록
   * @param {Array} clientHistories - 필터링할 고객 히스토리 목록
   * @returns {object} 필터링된 고객 목록과 히스토리 목록을 포함하는 객체
   */
  const actionFilter = (action, clients, clientHistories) => {
    let targets, cliidArr;  // 타겟 고객 ID 목록과 이를 담을 배열을 선언합니다.
    let targetClients;      // 필터링된 타겟 고객들을 담을 변수
    let targetClientHistories; // 필터링된 타겟 고객의 히스토리를 담을 변수

    targets = [];  // 타겟 고객 ID를 담을 배열을 초기화합니다.

    // 모든 고객을 순회하며 각 고객의 요청들 중 응대 상태가 주어진 action과 일치하는 경우를 찾습니다.
    for (let client of clients) {
      for (let { analytics } of client.requests) {
        if (analytics.response.action.value.trim() === action.trim()) {
          targets.push(client.cliid);  // 일치하는 경우 해당 고객의 ID를 targets 배열에 추가합니다.
        }
      }
    }

    // 중복된 고객 ID를 제거하여 유일한 값들만 남깁니다.
    targets = [...new Set(targets)];

    // 타겟 고객 ID 배열을 생성합니다.
    cliidArr = targets.map((cliid) => { return { cliid } });

    // 전체 고객 목록 중 타겟 고객만 필터링하여 저장합니다.
    targetClients = clients.toNormal().filter((c) => { return targets.includes(c.cliid); });

    // 전체 고객 히스토리 목록 중 타겟 고객의 히스토리만 필터링하여 저장합니다.
    targetClientHistories = clientHistories.filter((c) => { return targets.includes(c.cliid); });

    // 필터링된 고객과 히스토리를 객체로 반환합니다.
    return { clients: targetClients, histories: targetClientHistories };
  }

  // MongoDB 연결 객체들을 선언합니다.
  let selfMongo, selfConsoleMongo, updateMongo;

  // MongoDB 연결 상태를 저장할 불리언 변수들을 선언합니다.
  let selfBoo, selfConsoleBoo, updateBoo;

  // 로컬 모드 여부를 저장하는 변수 선언
  let fromLocalMode;

  // 옵션에서 MongoDB 연결 객체가 주어졌는지 여부에 따라 불리언 변수를 설정합니다.
  selfBoo = (option.selfMongo !== null && option.selfMongo !== undefined);
  selfConsoleBoo = (option.selfConsoleMongo !== null && option.selfConsoleMongo !== undefined);
  updateBoo = (option.updateMongo !== null && option.updateMongo !== undefined);

  // 로컬 모드인지 여부를 확인합니다.
  fromLocalMode = (option.fromLocal === true);

  try {
    // 고객 데이터와 고객 히스토리를 저장할 변수를 선언합니다.
    let clients, clientHistories;

    // 필터링된 객체와 타겟 목록을 저장할 변수를 선언합니다.
    let filteredObject, targets;

    // 임시 배열과 쿼리 관련 변수를 선언합니다.
    let tempArr, tempArr2, whereQuery, updateQuery;

    // 현재 처리 중인 고객을 저장할 변수를 선언합니다.
    let thisClient;

    // 임시 객체를 저장할 변수를 선언합니다.
    let tempObj;

    // 업데이트할 쿼리들을 저장할 배열을 선언합니다.
    let updateQueries;

    // selfMongo 객체가 없을 경우 새로 MongoDB 연결을 생성합니다.
    if (!selfBoo) {
      if (!fromLocalMode) {
        // 일반 모드일 경우 mongoinfo를 사용하여 MongoDB에 연결합니다.
        selfMongo = new mongo(mongoinfo);
      } else {
        // 로컬 모드일 경우 mongolocalinfo를 사용하여 MongoDB에 연결합니다.
        selfMongo = new mongo(mongolocalinfo);
      }
      // MongoDB 연결을 비동기로 수행합니다.
      await selfMongo.connect();
    } else {
      // selfMongo가 이미 제공된 경우 해당 객체를 사용합니다.
      selfMongo = option.selfMongo;
    }

    // selfConsoleMongo 객체가 없을 경우 MongoDB에 연결합니다.
    if (!selfConsoleBoo) {
      // Console MongoDB 연결을 생성합니다.
      selfConsoleMongo = new mongo(mongoinfo);
      await selfConsoleMongo.connect();
    } else {
      // selfConsoleMongo가 이미 제공된 경우 해당 객체를 사용합니다.
      selfConsoleMongo = option.selfConsoleMongo;
    }

    // updateMongo 객체가 없을 경우 MongoDB에 연결합니다.
    if (!updateBoo) {
      // Update MongoDB 연결을 생성합니다.
      updateMongo = new mongo(mongoinfo);
      await updateMongo.connect();
    } else {
      // updateMongo가 이미 제공된 경우 해당 객체를 사용합니다.
      updateMongo = option.updateMongo;
    }

    // MongoDB에서 응대 상태가 '응대중' 또는 '장기'로 시작하는 요청을 가진 고객 데이터를 가져옵니다.
    clients = await back.getClientsByQuery({ requests: { $elemMatch: { "analytics.response.status": { $regex: "^[응장]" } } } }, { selfMongo, withTools: true });

    // 만약 고객 데이터가 존재하면
    if (clients.length > 0) {
      // 해당 고객들의 히스토리를 가져옵니다.
      clientHistories = await back.getHistoriesByQuery("client", { $or: clients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfConsoleMongo });
      // 업데이트할 쿼리를 저장할 배열을 초기화합니다.
      updateQueries = [];

      // 1 - '1차 응대 예정' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("1차 응대 예정", clients, clientHistories);
      targets = []; // 타겟 고객들을 저장할 배열을 초기화합니다.

      // 필터링된 히스토리를 순회하며 처리합니다.
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        // 현재 고객 데이터를 가져옵니다.
        thisClient = clients.pick(cliid);
        // 해당 고객의 요청들을 순회하며 처리합니다.
        for (let i = 0; i < thisClient.requests.length; i++) {
          // 요청의 응대 상태가 '응대중' 또는 '장기'이며, action이 '1차 응대 예정'인 경우를 처리합니다.
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "1차 응대 예정") {
            // 현재 고객 ID와 요청 번호를 임시 객체로 저장합니다.
            tempObj = { cliid, requestNumber: i };

            // 호출(call) 로그 중 성공한 로그들을 필터링합니다.
            tempArr = call.out.concat(call.in).filter((obj) => { return obj.success; });
            // 해당 로그들이 요청의 타임라인 이후에 발생했는지 필터링합니다.
            tempArr = tempArr.filter((obj) => { return obj.date.valueOf() >= thisClient.requests[i].request.timeline.valueOf(); });

            // 만약 이전 요청이 존재한다면, 해당 로그들이 이전 요청 타임라인 이전에 발생했는지 필터링합니다.
            if (i !== 0) {
              tempArr = tempArr.filter((obj) => { return obj.date.valueOf() < thisClient.requests[i - 1].request.timeline.valueOf(); });
            }

            // 필터링된 호출 로그들을 날짜 순으로 정렬합니다.
            tempArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

            // 'styleCuration' 페이지에서 일반 모드로 발송된 메시지를 필터링합니다.
            tempArr2 = send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "general" });
            // 해당 메시지들이 요청의 타임라인 이후에 발생했는지 필터링합니다.
            tempArr2 = tempArr2.filter((obj) => { return obj.date.valueOf() >= thisClient.requests[i].request.timeline.valueOf(); });

            // 만약 이전 요청이 존재한다면, 해당 메시지들이 이전 요청 타임라인 이전에 발생했는지 필터링합니다.
            if (i !== 0) {
              tempArr2 = tempArr2.filter((obj) => { return obj.date.valueOf() < thisClient.requests[i - 1].request.timeline.valueOf(); });
            }

            // 필터링된 메시지들을 날짜 순으로 정렬합니다.
            tempArr2.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

            // 만약 호출 로그가 없다면
            if (tempArr.length === 0) {
              // 메시지가 있는 경우
              if (tempArr2.length > 0) {
                // 'styleCuration' 페이지와 관련된 응대가 존재하는지 확인합니다.
                if (page.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                  // 'styleCuration' 페이지에 대한 설문 제출이 존재하는지 확인합니다.
                  if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                    // 'designerProposal' 페이지에 제안서 발송이 존재하는지 확인합니다.
                    if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                      // '피드백과 응대 예정' 상태로 전환
                      tempObj.to = "피드백과 응대 예정";
                    } else {
                      // '부재중 제안 발송' 상태로 전환
                      tempObj.to = "부재중 제안 발송";
                    }
                  } else {
                    // '상세 설문 대기' 상태로 전환
                    tempObj.to = "상세 설문 대기";
                  }
                } else {
                  // '부재중 알림 발송' 상태로 전환
                  tempObj.to = "부재중 알림 발송";
                }
                // 타겟 리스트에 추가
                targets.push(tempObj);
              }
            } else {
              // 호출 로그가 있는 경우
              if (tempArr2.length > 0) {
                // 메시지와 호출 로그 간의 순서를 비교하여 응대 상태를 결정합니다.
                if (tempArr2[0].date.valueOf() < tempArr[0].date.valueOf()) {
                  // 'styleCuration' 페이지와 관련된 응대가 존재하는지 확인합니다.
                  if (page.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                    // 'styleCuration' 페이지에 대한 설문 제출이 존재하는지 확인합니다.
                    if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                      // 'designerProposal' 페이지에 제안서 발송이 존재하는지 확인합니다.
                      if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                        // '피드백과 응대 예정' 상태로 전환
                        tempObj.to = "피드백과 응대 예정";
                      } else {
                        // '부재중 제안 발송' 상태로 전환
                        tempObj.to = "부재중 제안 발송";
                      }
                    } else {
                      // '상세 설문 대기' 상태로 전환
                      tempObj.to = "상세 설문 대기";
                    }
                  } else {
                    // '부재중 알림 발송' 상태로 전환
                    tempObj.to = "부재중 알림 발송";
                  }
                } else {
                  // 'styleCuration' 페이지에서 경량 모드로 발송된 메시지가 있는 경우
                  if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
                    // 'styleCuration' 페이지에 대한 설문 제출이 존재하는지 확인합니다.
                    if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                      // 'designerProposal' 페이지에 제안서 발송이 존재하는지 확인합니다.
                      if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                        // '제안 피드백 예정' 상태로 전환
                        tempObj.to = "제안 피드백 예정";
                      } else {
                        // '제안 발송 예정' 상태로 전환
                        tempObj.to = "제안 발송 예정";
                      }
                    } else {
                      // '스타일 체크 대기' 상태로 전환
                      tempObj.to = "스타일 체크 대기";
                    }
                  } else {
                    // '1차 응대 후 대기' 상태로 전환
                    tempObj.to = "1차 응대 후 대기";
                  }
                }
              } else {
                // 호출 로그가 없고 메시지도 없는 경우
                if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
                  // 'styleCuration' 페이지에 대한 설문 제출이 존재하는지 확인합니다.
                  if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                    // 'designerProposal' 페이지에 제안서 발송이 존재하는지 확인합니다.
                    if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                      // '제안 피드백 예정' 상태로 전환
                      tempObj.to = "제안 피드백 예정";
                    } else {
                      // '제안 발송 예정' 상태로 전환
                      tempObj.to = "제안 발송 예정";
                    }
                  } else {
                    // '스타일 체크 대기' 상태로 전환
                    tempObj.to = "스타일 체크 대기";
                  }
                } else {
                  // '1차 응대 후 대기' 상태로 전환
                  tempObj.to = "1차 응대 후 대기";
                }
              }
              // 타겟 리스트에 추가
              targets.push(tempObj);
            }
          }
        }
      }

      // 타겟 리스트에 저장된 각 고객의 상태를 업데이트합니다.
      for (let { cliid, to, requestNumber } of targets) {
        // MongoDB 쿼리 작성: 고객 ID로 필터링하고, 특정 요청의 응대 상태를 업데이트합니다.
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        // 업데이트 쿼리를 실행합니다.
        await back.updateClient([whereQuery, updateQuery], { selfMongo: updateMongo });
        // 메모리 상의 고객 데이터도 업데이트합니다.
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        // 나중에 로그를 남길 수 있도록 업데이트 쿼리 정보를 저장합니다.
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "1차 응대 예정",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        // 콘솔에 업데이트 내용을 출력합니다.
        console.log(whereQuery, updateQuery);
      }

      // 1.2 - '1차 응대 후 대기' 상태의 고객들을 처리합니다.
      // '1차 응대 후 대기' 상태의 고객들을 필터링합니다.
      filteredObject = actionFilter("1차 응대 후 대기", clients, clientHistories);
      // 업데이트할 대상 고객들을 저장할 배열을 초기화합니다.
      targets = [];
      // 필터링된 고객 이력에서 각 고객을 순회합니다.
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        
        // 현재 고객의 정보를 가져옵니다.
        thisClient = clients.pick(cliid);
        
        // 고객의 요청들을 순회합니다.
        for (let i = 0; i < thisClient.requests.length; i++) {
          
          // 요청이 '응대중' 또는 '장기' 상태이고, 현재 액션이 '1차 응대 후 대기'인 경우를 확인합니다.
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && 
              thisClient.requests[i].analytics.response.action.value === "1차 응대 후 대기") {
            
            // 임시 객체에 고객 ID와 요청 번호를 저장합니다.
            tempObj = { cliid, requestNumber: i };
            
            // 'styleCuration' 페이지에서 'lite' 모드로 전송된 데이터가 있는지 확인합니다.
            if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
              
              // 스타일 큐레이션 페이지에서 설문이 제출되었는지 확인합니다.
              if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                
                // 디자이너 제안 페이지에서 데이터가 전송되었는지 확인합니다.
                if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                  
                  // '제안 피드백 예정' 상태로 변경할 것을 지정합니다.
                  tempObj.to = "제안 피드백 예정";
                } else {
                  
                  // '제안 발송 예정' 상태로 변경할 것을 지정합니다.
                  tempObj.to = "제안 발송 예정";
                }
              } else {
                
                // '스타일 체크 대기' 상태로 변경할 것을 지정합니다.
                tempObj.to = "스타일 체크 대기";
              }
              
              // 대상 고객 리스트에 추가합니다.
              targets.push(tempObj);
            }
          }
        }
      }

      // 대상 고객 리스트를 순회하면서 DB 업데이트를 수행합니다.
      for (let { cliid, to, requestNumber } of targets) {
        
        // 업데이트할 고객을 식별하는 쿼리를 생성합니다.
        whereQuery = { cliid };
        
        // 업데이트할 필드를 지정합니다.
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        
        // 고객 정보를 DB에 업데이트합니다.
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        
        // 메모리상의 고객 정보도 업데이트합니다.
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        
        // 업데이트 쿼리를 기록합니다.
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "1차 응대 후 대기",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        
        // 업데이트된 쿼리를 콘솔에 출력합니다.
        console.log(whereQuery, updateQuery);
      }


      // 1.3 - '스타일 체크 대기' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("스타일 체크 대기", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "스타일 체크 대기") {
            tempObj = { cliid, requestNumber: i };
            if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
              if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                tempObj.to = "제안 피드백 예정";
              } else {
                tempObj.to = "제안 발송 예정";
              }
              targets.push(tempObj);
            }
          }
        }
      }
      for (let { cliid, to, requestNumber } of targets) {
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "스타일 체크 대기",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }


      // 1.4 - '제안 발송 예정' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("제안 발송 예정", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "제안 발송 예정") {
            tempObj = { cliid, requestNumber: i };
            if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
              tempObj.to = "제안 피드백 예정";
              targets.push(tempObj);
            }
          }
        }
      }
      for (let { cliid, to, requestNumber } of targets) {
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "제안 발송 예정",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }


      // 2.2 - '부재중 알림 발송' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("부재중 알림 발송", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "부재중 알림 발송") {
            tempObj = { cliid, requestNumber: i };

            if (page.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
              if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                  tempObj.to = "피드백과 응대 예정";
                } else {
                  tempObj.to = "부재중 제안 발송";
                }
              } else {
                tempObj.to = "상세 설문 대기";
              }
              targets.push(tempObj);
            }

          }
        }
      }
      for (let { cliid, to, requestNumber } of targets) {
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "부재중 알림 발송",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }


      // 2.3 - '상세 설문 대기' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("상세 설문 대기", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "상세 설문 대기") {
            tempObj = { cliid, requestNumber: i };

            if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
              if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                tempObj.to = "피드백과 응대 예정";
              } else {
                tempObj.to = "부재중 제안 발송";
              }
              targets.push(tempObj);
            }

          }
        }
      }
      for (let { cliid, to, requestNumber } of targets) {
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "상세 설문 대기",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }


      // 2.4 - '부재중 제안 발송' 상태의 고객들을 처리합니다.
      filteredObject = actionFilter("부재중 제안 발송", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "부재중 제안 발송") {
            tempObj = { cliid, requestNumber: i };
            if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
              tempObj.to = "피드백과 응대 예정";
              targets.push(tempObj);
            }
          }
        }
      }
      for (let { cliid, to, requestNumber } of targets) {
        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".analytics.response.action"] = to;
        await back.updateClient([ whereQuery, updateQuery ], { selfMongo: updateMongo });
        for (let client of clients) {
          if (client.cliid === cliid) {
            client.requests[requestNumber].analytics.response.action.value = to;
            break;
          }
        }
        updateQueries.push({
          cliid,
          requestNumber,
          mode: "action",
          from: "부재중 제안 발송",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

    }

    // MongoDB 연결을 종료합니다.
    if (!selfBoo) {
      await selfMongo.close();
      selfBoo = true;
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
      selfConsoleBoo = true;
    }
    if (!updateBoo) {
      await updateMongo.close();
      updateMongo = true;
    }

  } catch (e) {
    // 예외가 발생하면 콘솔에 오류 메시지를 출력합니다.
    await errorLog(e);
  }
}

/**
 * 프로젝트의 응대 상태를 자동으로 업데이트하고 적절한 응대 상태로 변경해주는 메서드입니다.
 * @async
 * @param {Object} option - MongoDB 연결 옵션을 포함하는 객체
 * @param {Object} option.selfMongo - 메인 MongoDB 연결 객체
 * @param {Object} option.selfConsoleMongo - 보조 MongoDB 연결 객체
 * @param {Object} option.updateMongo - 업데이트를 위한 MongoDB 연결 객체
 */
BackWorker.prototype.projectActionSync = async function (option = { selfMongo: null, selfConsoleMongo: null, updateMongo: null }) {

  // 현재 인스턴스를 가리키는 변수입니다.
  const instance = this;

  // 백엔드 관련 메서드를 담고 있는 객체입니다.
  const back = this.back;

  // MongoDB 연결과 관련된 유틸리티 함수와 정보를 Mother로부터 가져옵니다.
  const { mongo, mongoinfo, mongoconsoleinfo, mongolocalinfo, equalJson, requestSystem } = this.mother;

  /**
   * 주어진 액션과 일치하는 프로젝트들을 필터링하는 함수입니다.
   *
   * @param {string|string[]} action - 필터링할 응대 상태 또는 상태 목록
   * @param {Array} projects - 전체 프로젝트 목록
   * @param {Array} projectHistories - 프로젝트의 히스토리 목록
   * @returns {Object} 필터링된 프로젝트와 히스토리를 포함하는 객체
   */
  const actionFilter = (action, projects, projectHistories) => {

    // 타겟 프로젝트 ID를 저장할 배열입니다.
    let targets, proidArr;

    // 필터링된 타겟 프로젝트와 히스토리를 저장할 변수입니다.
    let targetProjects;
    let targetProjectHistories;

    // 타겟 프로젝트 ID를 초기화합니다.
    targets = [];

    // action이 문자열인 경우 해당 액션과 일치하는 프로젝트를 필터링합니다.
    if (typeof action === "string") {
      for (let project of projects) {
        if (project.process.action.value.trim() === action.trim()) {
          targets.push(project.proid);
        }
      }
    } 
    // action이 배열인 경우 해당 배열에 포함된 액션과 일치하는 프로젝트를 필터링합니다.
    else if (Array.isArray(action)) {
      for (let project of projects) {
        if (action.includes(project.process.action.value.trim())) {
          targets.push(project.proid);
        }
      }
    } 
    // action이 유효한 형식이 아닌 경우 오류를 발생시킵니다.
    else {
      throw new Error("invalid input");
    }

    // 중복된 프로젝트 ID를 제거합니다.
    targets = [...new Set(targets)];

    // 필터링된 프로젝트 ID 목록을 생성합니다.
    proidArr = targets.map((proid) => { return { proid } });

    // 필터링된 프로젝트 목록을 생성합니다.
    targetProjects = projects.toNormal().filter((p) => { return targets.includes(p.proid); });

    // 필터링된 프로젝트 히스토리 목록을 생성합니다.
    targetProjectHistories = projectHistories.filter((p) => { return targets.includes(p.proid); });

    // 필터링된 프로젝트와 히스토리를 반환합니다.
    return { projects: targetProjects, histories: targetProjectHistories };
  }

  // MongoDB 연결 객체를 초기화합니다.
  let selfMongo, selfConsoleMongo, updateMongo;

  // 각 MongoDB 연결 객체가 제공되었는지 여부를 판단하는 플래그입니다.
  let selfBoo, selfConsoleBoo, updateBoo;
  let fromLocalMode;

  // selfMongo 객체가 제공되었는지 여부를 확인합니다.
  selfBoo = (option.selfMongo !== null && option.selfMongo !== undefined);

  // selfConsoleMongo 객체가 제공되었는지 여부를 확인합니다.
  selfConsoleBoo = (option.selfConsoleMongo !== null && option.selfConsoleMongo !== undefined);

  // updateMongo 객체가 제공되었는지 여부를 확인합니다.
  updateBoo = (option.updateMongo !== null && option.updateMongo !== undefined);

  // 로컬 모드에서 실행 중인지 여부를 확인합니다.
  fromLocalMode = (option.fromLocal === true);

  try {
    // 프로젝트, 클라이언트, 디자이너, 및 해당 히스토리 데이터를 저장할 변수를 선언합니다.
    let projects, projectHistories;
    let clients, clientHistories;
    let designers, designerHistories;

    // 필터링된 결과를 저장할 변수입니다.
    let filteredObject;
    let targets;

    // 임시 데이터 배열을 저장할 변수를 선언합니다.
    let tempArr, tempArr2;

    // MongoDB 쿼리 조건을 저장할 변수를 선언합니다.
    let whereQuery, updateQuery;

    // 현재 클라이언트의 데이터를 저장할 변수를 선언합니다.
    let thisClient;

    // 임시 객체와 인덱스를 저장할 변수를 선언합니다.
    let tempObj, tempIndex;

    // 업데이트 쿼리를 저장할 배열을 초기화합니다.
    let updateQueries;

    // selfMongo 객체가 제공되지 않은 경우, 새로 연결합니다.
    if (!selfBoo) {
      if (!fromLocalMode) {
        selfMongo = new mongo(mongoinfo);
      } else {
        selfMongo = new mongo(mongolocalinfo);
      }
      await selfMongo.connect();
    } else {
      selfMongo = option.selfMongo;
    }

    // selfConsoleMongo 객체가 제공되지 않은 경우, 새로 연결합니다.
    if (!selfConsoleBoo) {
      if (!fromLocalMode) {
        selfConsoleMongo = new mongo(mongoconsoleinfo);
      } else {
        selfConsoleMongo = new mongo(mongolocalinfo);
      }
      await selfConsoleMongo.connect();
    } else {
      selfConsoleMongo = option.selfConsoleMongo;
    }

    // updateMongo 객체가 제공되지 않은 경우, 새로 연결합니다.
    if (!updateBoo) {
      updateMongo = new mongo(mongoinfo);
      await updateMongo.connect();
    } else {
      updateMongo = option.updateMongo;
    }

    // '대진홀' 상태인 프로젝트들을 가져옵니다.
    projects = await back.getProjectsByQuery({ $and: [{ desid: { $regex: "^d" } }, { "process.status": { $regex: "^[대진홀]" } }] }, { selfMongo, withTools: true });

    // 프로젝트가 존재하는 경우, 관련 히스토리 및 데이터를 가져옵니다.
    if (projects.length > 0) {
      projectHistories = await back.getHistoriesByQuery("project", { $or: projects.toNormal().map((p) => { return { proid: p.proid } }) }, { selfMongo: selfConsoleMongo });
      clients = await back.getClientsByQuery({ $or: projects.toNormal().map((p) => { return { cliid: p.cliid }; }) }, { selfMongo });
      clientHistories = await back.getHistoriesByQuery("client", { $or: projects.toNormal().map((p) => { return { cliid: p.cliid }; }) }, { selfMongo: selfConsoleMongo });
      designers = await back.getDesignersByQuery({ $or: projects.toNormal().map((p) => { return { desid: p.desid }; }) }, { selfMongo });
      designerHistories = await back.getHistoriesByQuery("designer", { $or: projects.toNormal().map((p) => { return { desid: p.desid }; }) }, { selfMongo: selfConsoleMongo });
      updateQueries = [];

      // '계약금 안내' 또는 '현장미팅 조율' 상태의 프로젝트를 '현장미팅 확정'으로 업데이트합니다.
      filteredObject = actionFilter(["계약금 안내", "현장미팅 조율"], projects, projectHistories);
      targets = [];
      for (let { proid, process: { action, contract: { meeting: { date } } } } of filteredObject.projects) {
        if (date.valueOf() > (new Date(2000, 0, 1)).valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf()) {
          targets.push({ proid, from: action, to: "현장미팅 확정" });
        }
      }
      for (let { proid, from, to } of targets) {
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.action"] = to;
        await back.updateProject([whereQuery, updateQuery], { selfMongo: updateMongo });
        for (let project of projects) {
          if (projects.proid === proid) {
            project.process.action = to;
            break;
          }
        }
        updateQueries.push({
          proid,
          mode: "form",
          from,
          to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

      // '현장미팅 확정' 상태의 프로젝트를 '의뢰서 공유'로 업데이트합니다.
      filteredObject = actionFilter(["현장미팅 확정"], projects, projectHistories);
      targets = [];
      for (let { proid, desid, cliid, process: { action } } of filteredObject.projects) {
        tempObj = designerHistories.find((d) => { return d.desid === desid });
        tempIndex = tempObj.request.analytics.send.findIndex((obj) => { return obj.cliid === cliid });
        if (tempIndex !== -1) {
          targets.push({ proid, from: action, to: "의뢰서 공유" });
        }
      }
      for (let { proid, from, to } of targets) {
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.action"] = to;
        await back.updateProject([whereQuery, updateQuery], { selfMongo: updateMongo });
        for (let project of projects) {
          if (projects.proid === proid) {
            project.process.action = to;
            break;
          }
        }
        updateQueries.push({
          proid,
          mode: "form",
          from,
          to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

      // '계약금 안내', '현장미팅 조율', '현장미팅 확정', '의뢰서 공유' 상태의 프로젝트를 '현장미팅 피드백'으로 업데이트합니다.
      filteredObject = actionFilter(["계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유"], projects, projectHistories);
      targets = [];
      for (let { proid, process: { action, contract: { meeting: { date } } } } of filteredObject.projects) {
        if (date.valueOf() >= (new Date()).valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf()) {
          targets.push({ proid, from: action, to: "현장미팅 피드백" });
        }
      }
      for (let { proid, from, to } of targets) {
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.action"] = to;
        await back.updateProject([whereQuery, updateQuery], { selfMongo: updateMongo });
        for (let project of projects) {
          if (projects.proid === proid) {
            project.process.action = to;
            break;
          }
        }
        updateQueries.push({
          proid,
          mode: "form",
          from,
          to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

      // '계약금 안내', '현장미팅 조율', '현장미팅 확정', '의뢰서 공유', '현장미팅 피드백' 상태의 프로젝트를 '잔금 안내'로 업데이트합니다.
      filteredObject = actionFilter(["계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유", "현장미팅 피드백"], projects, projectHistories);
      targets = [];
      for (let { proid, desid, cliid, process: { action, contract: { first: { date } } } } of filteredObject.projects) {
        tempObj = clientHistories.find((c) => { return c.cliid === cliid });
        tempIndex = tempObj.curation.analytics.send.findIndex((obj) => { return obj.page === "universalEstimation" && obj.date.valueOf() > date.valueOf() });
        if (tempIndex !== -1) {
          targets.push({ proid, from: action, to: "잔금 안내" });
        }
      }
      for (let { proid, from, to } of targets) {
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.action"] = to;
        await back.updateProject([whereQuery, updateQuery], { selfMongo: updateMongo });
        for (let project of projects) {
          if (projects.proid === proid) {
            project.process.action = to;
            break;
          }
        }
        updateQueries.push({
          proid,
          mode: "form",
          from,
          to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

      // '계약금 안내', '현장미팅 조율', '현장미팅 확정', '의뢰서 공유', '현장미팅 피드백', '잔금 안내' 상태의 프로젝트를 '시작 대기'로 업데이트합니다.
      filteredObject = actionFilter(["계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유", "현장미팅 피드백", "잔금 안내"], projects, projectHistories);
      targets = [];
      for (let { proid, process: { action, contract: { remain: { date } } } } of filteredObject.projects) {
        if (date.valueOf() > (new Date(2000, 0, 1)).valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf()) {
          targets.push({ proid, from: action, to: "시작 대기" });
        }
      }
      for (let { proid, from, to } of targets) {
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.action"] = to;
        await back.updateProject([whereQuery, updateQuery], { selfMongo: updateMongo });
        for (let project of projects) {
          if (projects.proid === proid) {
            project.process.action = to;
            break;
          }
        }
        updateQueries.push({
          proid,
          mode: "form",
          from,
          to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }
    }

    // MongoDB 연결을 해제합니다.
    if (!selfBoo) {
      await selfMongo.close();
      selfBoo = true;
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
      selfConsoleBoo = true;
    }
    if (!updateBoo) {
      await updateMongo.close();
      updateBoo = true;
    }

  } catch (e) {
    // 에러 발생 시 콘솔에 출력합니다.
    await errorLog(e);
  }
}

/**
 * 디자이너의 레벨에 따라 홈리에종의 프로젝트 메트릭스를 동기화하는 메서드입니다.
 * 이 메서드는 각 디자이너의 레벨과 프로젝트에 대한 정보를 기반으로 메트릭스를 업데이트합니다.
 * @async
 * @param {object} selfMongo - MongoDB 연결 객체입니다.
 * @returns {boolean} - 동기화가 성공하면 true, 실패하면 false를 반환합니다.
 */
BackWorker.prototype.designerLevelMatrixSync = async function (selfMongo) {
  // 현재 인스턴스를 변수로 할당
  const instance = this;
  // Mother 객체에서 equalJson 메서드를 가져옵니다. 이 메서드는 객체를 JSON 문자열로 비교하기 위해 사용됩니다.
  const { equalJson } = this.mother;
  try {
    // 사용할 데이터베이스와 컬렉션 이름을 설정합니다.
    const db = "miro81";
    const collection = "designer";
    // 디자이너 컬렉션에서 모든 디자이너 정보를 가져옵니다.
    const designers = await selfMongo.db(db).collection(collection).find({}).toArray();
    let whereQuery, updateQuery;
    let copiedMatrix;

    // 모든 디자이너를 순회하면서 레벨에 따라 메트릭스를 업데이트합니다.
    for (let designer of designers) {
      // 디자이너를 식별하기 위한 쿼리입니다.
      whereQuery = { desid: designer.desid };
      // 업데이트할 필드와 값을 저장할 객체입니다.
      updateQuery = {};

      // 디자이너의 프로젝트 메트릭스를 복사합니다. equalJson은 객체를 깊은 복사한 뒤, JSON으로 변환해 비교 가능하게 만듭니다.
      copiedMatrix = equalJson(JSON.stringify(designer.analytics.project.matrix));

      // 디자이너의 레벨에 따라 메트릭스를 수정합니다.
      // construct.level이 0일 때
      if (designer.analytics.construct.level === 0) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ 0, 0, 0 ];
        copiedMatrix[2] = [ 0, 0, 0 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      }
      // construct.level이 1일 때
      else if (designer.analytics.construct.level === 1) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ 0, 0, 0 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      }
      // construct.level이 2일 때
      else if (designer.analytics.construct.level === 2) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      }
      // construct.level이 3일 때
      else if (designer.analytics.construct.level === 3) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[3] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
      }

      // 업데이트할 데이터를 구성합니다.
      updateQuery["analytics.project.matrix"] = equalJson(JSON.stringify(copiedMatrix));
      // 디자이너 컬렉션에서 해당 디자이너의 메트릭스를 업데이트합니다.
      await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
      // 업데이트된 내용을 콘솔에 출력합니다.
      console.log(whereQuery, updateQuery);
    }

    // 모든 작업이 성공적으로 완료되면 true를 반환합니다.
    return true;

  } catch (e) {
    // 오류 발생 시 콘솔에 오류를 출력하고 false를 반환합니다.
    await errorLog(e);
    return false;
  }
}

module.exports = BackWorker;
