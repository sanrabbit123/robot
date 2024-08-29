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
    
    const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 가져옵니다.
    const BackMaker = require(this.dir + "/backMaker.js"); // BackMaker 모듈을 현재 경로에서 다시 불러옵니다.
    
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
    console.log(e);
  }
}

/**
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
        console.log(e); // 에러가 발생하면 로그에 출력합니다.
      }
    }

    await compileFrontDesidScript(newDesid); // 새로운 디자이너 ID를 컴파일합니다.
    console.log("front desid make"); // 컴파일 완료 로그를 출력합니다.

  } catch (e) {
    console.log(e); // 에러가 발생하면 로그에 출력합니다.
  }
}






BackWorker.prototype.newDesignerToFront = async function (porlid, index, designerName, option = { selfMongo: null }) {
  const instance = this;
  const back = this.back;
  const { requestSystem } = this.mother;
  try {
    class DesignerFrontIndex {

      constructor(mother, back, option = { selfMongo: null }) {
        this.mother = mother;
        this.back = back;
        this.option = option;
      }

      toNormal() {
        let obj = {};
        obj.introduction = this.introduction;
        obj.methods = this.methods;
        obj.photo = this.photo;
        obj.order = this.order;
        obj.designer = this.designer;
        obj.desid = this.desid;
        return obj;
      }

      generateDummy(porlid, index, designer = '', desid = '') {
        this.introduction = {
          desktop: [],
          mobile: []
        };
        this.methods = [];
        this.photo = {
          porlid: porlid,
          index: index,
        };
        this.order = 0;
        this.designer = designer;
        this.desid = desid;
      }

      setIntroduction(designer) {
        this.introduction.desktop = designer.setting.front.introduction.desktop;
        this.introduction.mobile = designer.setting.front.introduction.mobile;
      }

      setMethod() {
        this.methods = [ "mth0", "mth7" ]
      }

      setOrder() {
        this.order = 748;
      }

      async returnFrontObject(porlid, index, designerObj) {
        try {
          const { designer, desid } = designerObj;
          this.generateDummy(porlid, index, designer, desid);
          this.setIntroduction(designerObj);
          this.setMethod();
          this.setOrder();
          return this.toNormal();
        } catch (e) {
          console.log(e);
        }
      }

      async renderDesigner(porlid, index, designerObj) {
        const instance = this;
        const { fileSystem, shellExec, shellLink, mysqlQuery } = this.mother;
        try {
          const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
          const Filter = this.back.idFilter("designer");
          const frontSetting = await this.returnFrontObject(porlid, index, designerObj);
          console.log(frontSetting);
          const careerCalculation = function (designer) {
            let yS, yM, rY, rM;
            let monthResult;

            yS = designer.information.business.career.startY;
            yM = designer.information.business.career.startM;
            rY = designer.information.business.career.relatedY;
            rM = designer.information.business.career.relatedM;

            monthResult = ((yS * 12) + yM) - ((rY * 12) + rM);

            return {
              year: Math.floor(monthResult / 12),
              month: (monthResult % 12),
            };
          }

          let pastDesid;
          let scpOrder;
          let insertQuery;
          let whereQuery, updateQuery;

          if (frontSetting.methods.length !== 2) {
            throw new Error("method's length must be 2")
          }
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
          await mysqlQuery(insertQuery, { front: true });
          console.log(`front mysql insert done`);
          delete frontSetting.designer;
          delete frontSetting.desid;
          whereQuery = { desid: designerObj.desid };
          updateQuery = { "setting.front": frontSetting };
          await this.back.updateDesigner([ whereQuery, updateQuery ], this.option);
          console.log(`db update done`);

        } catch (e) {
          console.log(e);
        }
      }
    }
    const front = new DesignerFrontIndex(this.mother, this.back, option);
    let thisDesigner, desid;
    [ thisDesigner ] = await back.getDesignersByQuery({ designer: designerName }, { toNormal: true });
    desid = thisDesigner.desid;
    await front.renderDesigner(porlid, 't' + String(index), thisDesigner);
    await requestSystem("https://" + instance.address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.designerCalculation = async function (alarm = true) {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, dateToString, autoComma, messageSend } = this.mother;
  const MONGOC = new mongo(mongoinfo);
  const PYTHONMONGOC = new mongo(mongolocalinfo);
  try {
    await MONGOC.connect();
    await PYTHONMONGOC.connect();
    const back = this.back;
    const Designers = require(`${process.cwd()}/apps/dataConsole/router/source/class/designer.js`);
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
    const selfMongo = MONGOC;
    const bar1 = "================================================================";
    const collection = "taxBill";
    const collection2 = "cashReceipt";
    const collection3 = "generalBill";
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let projects, clients, designers;
    let desidArr_raw, desidArr;
    let cliidArr;
    let whereQuery, updateQuery;
    let tong;
    let amount0, amount1;
    let condition0, condition1;
    let name;
    let tempString;
    let needsResponses, pendingResponses, infoDetail;
    let rows, boo;
    let tempDate;
    let ago, agoValue;
    let greateStandard;
    let limitAgo;
    let bills;
    let thisBill;
    let proid;
    let thisResponses, thisRequests;
    let itemAmount, payAmount;
    let requestRemain;
    let condition;
    let taxBills, cashReceipts;
    let businessNumber;
    let cliid;
    let requestTravel;
    let bilid, responseIndex;
    let thisTargetDesigner;
    let tongTong;
    let tongSet;
    let tongMatrix;
    let tongTempArr;

    ago = new Date();
    ago.setDate(ago.getDate() - 28);
    agoValue = ago.valueOf();

    limitAgo = new Date();
    limitAgo.setFullYear(limitAgo.getFullYear() - 2);

    whereQuery = {
      $and: [
        { desid: { $regex: "^d" } },
        { "proposal.date": { $gt: limitAgo } },
        { "process.contract.first.date": { $gt: new Date(2000, 0, 1) } },
        { proid: { $not: { $regex: "p1801_aa01s" } } },
        { proid: { $not: { $regex: "p1801_aa02s" } } },
      ]
    };

    projects = await back.getProjectsByQuery(whereQuery, { selfMongo });

    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    whereQuery = {
      $or: [
        { $or: desidArr },
        { "information.contract.status": { $regex: "완료" } }
      ]
    };
    designers = await back.getDesignersByQuery(whereQuery, { selfMongo });

    whereQuery = {
      $or: cliidArr
    };
    clients = await back.getClientsByQuery(whereQuery, { selfMongo });

    designers = new Designers(designers.toNormal());
    designers.setProjects(projects.toNormal());
    designers.setClients(clients.toNormal());
    designers = designers.returnDoingDesigners();

    taxBills = await back.mongoRead(collection, {}, { selfMongo: PYTHONMONGOC });
    cashReceipts = await back.mongoRead(collection2, {}, { selfMongo: PYTHONMONGOC });
    bills = await back.mongoRead(collection3, {}, { selfMongo: PYTHONMONGOC });

    needsResponses = [];
    pendingResponses = [];
    for (let designer of designers) {
      for (let i = 0; i < designer.projects.length; i++) {
        name = designer.projects[i].name;
        cliid = designer.projects[i].cliid;
        proid = designer.projects[i].proid;

        thisBill = null;
        thisBill = bills.find((bill) => {
          return ((bill.links.proid === proid) && (bill.links.method === (designer.projects[i].service.online ? "online" : "offline")))
        });
        if (thisBill === null || thisBill === undefined) {
          continue;
        }
        thisResponses = thisBill.responses;
        thisRequests = thisBill.requests;
        bilid = thisBill.bilid;

        responseIndex = 0;
        for (let response of thisResponses) {

          itemAmount = Math.floor(response.items.reduce((acc, curr) => {
            return acc + curr.amount.pure;
          }, 0))
          payAmount = Math.floor(response.pay.reduce((acc, curr) => {
            return acc + curr.amount;
          }, 0))

          thisTargetDesigner = designers.find((d) => { return d.desid === response.target.id });

          if (itemAmount > 0) {
            if (itemAmount > payAmount) {
              if (/홈리에종 선금/gi.test(response.name)) {

                requestRemain = thisRequests.find((obj) => { return /홈리에종 잔금/gi.test(obj.name) })
                if (requestRemain === undefined) {
                  condition = false;
                } else {
                  if (Math.floor(requestRemain.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestRemain.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
                    businessNumber = thisTargetDesigner.information.business.businessInfo.businessNumber.replace(/-/g, '');
                    if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                      condition = true;
                    } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                      condition = (cashReceipts.filter((obj) => {
                        return obj.method === 1;
                      }).filter((obj) => {
                        return obj.who.business.replace(/\-/gi, '') === businessNumber
                      }).filter((obj) => {
                        return obj.amount.total === itemAmount
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                          return false;
                        } else {
                          return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                        }
                      }).length > 0);
                      if (!condition) {
                        condition = (taxBills.filter((obj) => {
                          return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                        }).filter((obj) => {
                          return obj.sum.total === itemAmount
                        }).filter((obj) => {
                          if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                            return false;
                          } else {
                            return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                          }
                        }).length > 0);
                      }
                    } else {
                      condition = (taxBills.filter((obj) => {
                        return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                      }).filter((obj) => {
                        return obj.sum.total === itemAmount
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i] === undefined) {
                          return false;
                        } else {
                          if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                            return false;
                          } else {
                            return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                          }
                        }
                      }).length > 0);
                    }
                  } else {
                    if (/드랍/gi.test(thisTargetDesigner.projects[i].process.status)) {
                      if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                        condition = true;
                      } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                        condition = (cashReceipts.filter((obj) => {
                          return obj.method === 1;
                        }).filter((obj) => {
                          return obj.who.business.replace(/\-/gi, '') === businessNumber
                        }).filter((obj) => {
                          return obj.amount.total === itemAmount
                        }).filter((obj) => {
                          if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                            return false;
                          } else {
                            return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                          }
                        }).length > 0);
                        if (!condition) {
                          condition = (taxBills.filter((obj) => {
                            return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                          }).filter((obj) => {
                            return obj.sum.total === itemAmount
                          }).filter((obj) => {
                            if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                              return false;
                            } else {
                              return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                            }
                          }).length > 0);
                        }
                      } else {
                        condition = (taxBills.filter((obj) => {
                          return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                        }).filter((obj) => {
                          return obj.sum.total === itemAmount
                        }).filter((obj) => {
                          if (thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf() < emptyDateValue) {
                            return false;
                          } else {
                            return obj.date.valueOf() > thisTargetDesigner.projects[i].process.contract.meeting.date.valueOf()
                          }
                        }).length > 0);
                      }
                    } else {
                      condition = false;
                    }
                  }
                }

              } else if (/홈리에종 잔금/gi.test(response.name)) {

                requestRemain = thisRequests.find((obj) => { return /홈리에종 잔금/gi.test(obj.name) })
                if (requestRemain === undefined) {
                  condition = false;
                } else {

                  if (Math.floor(requestRemain.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestRemain.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
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

                if (condition) {
                  businessNumber = thisTargetDesigner.information.business.businessInfo.businessNumber.replace(/-/g, '');
                  if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = true;
                  } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = (cashReceipts.filter((obj) => {
                      return obj.method === 1;
                    }).filter((obj) => {
                      return obj.who.business.replace(/\-/gi, '') === businessNumber
                    }).filter((obj) => {
                      return obj.amount.total === itemAmount
                    }).filter((obj) => {
                      if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                        return false;
                      } else {
                        return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf()
                      }
                    }).length > 0);
                    if (!condition) {
                      condition = (taxBills.filter((obj) => {
                        return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                      }).filter((obj) => {
                        return obj.sum.total === itemAmount
                      }).filter((obj) => {
                        if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                          return false;
                        } else {
                          return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf()
                        }
                      }).length > 0);
                    }
                  } else {
                    condition = (taxBills.filter((obj) => {
                      return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                    }).filter((obj) => {
                      return obj.sum.total === itemAmount
                    }).filter((obj) => {
                      if (thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf() < emptyDateValue) {
                        return false;
                      } else {
                        return obj.date.valueOf() > thisTargetDesigner.projects[i].process.calculation.payments.first.date.valueOf()
                      }
                    }).length > 0);
                  }
                }

              } else if (/출장비/gi.test(response.name)) {

                requestTravel = thisRequests.find((obj) => { return /출장비/gi.test(obj.name) })
                if (requestTravel === undefined) {
                  requestTravel = thisRequests.find((obj) => {
                    return obj.items.some((o) => {
                      return /출장/gi.test(o.name);
                    })
                  })
                  if (requestTravel === undefined) {
                    condition = false;
                  } else {
                    if (Math.floor(requestTravel.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestTravel.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
                      condition = true;
                    } else {
                      condition = false;
                    }
                  }
                } else {
                  if (Math.floor(requestTravel.items.reduce((acc, curr) => { return acc + curr.amount.consumer; }, 0)) <= Math.floor(requestTravel.pay.reduce((acc, curr) => { return acc + curr.amount; }, 0))) {
                    condition = true;
                  } else {
                    condition = false;
                  }
                }
                if (thisTargetDesigner.desid !== designer.desid) {
                  condition = true;
                }

                if (requestTravel !== undefined && condition) {
                  businessNumber = thisTargetDesigner.information.business.businessInfo.businessNumber.replace(/-/g, '');
                  if (/프리/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = true;
                  } else if (/간이/gi.test(thisTargetDesigner.information.business.businessInfo.classification)) {
                    condition = (cashReceipts.filter((obj) => {
                      return obj.method === 1;
                    }).filter((obj) => {
                      return obj.who.business.replace(/\-/gi, '') === businessNumber
                    }).filter((obj) => {
                      return obj.amount.total === itemAmount
                    }).filter((obj) => {
                      return obj.date.valueOf() > requestTravel.pay[0].date.valueOf()
                    }).length > 0);
                    if (!condition) {
                      condition = (taxBills.filter((obj) => {
                        return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                      }).filter((obj) => {
                        return obj.sum.total === itemAmount
                      }).filter((obj) => {
                        return obj.date.valueOf() > requestTravel.pay[0].date.valueOf()
                      }).length > 0);
                    }
                  } else {
                    condition = (taxBills.filter((obj) => {
                      return obj.who.from.business.replace(/\-/gi, '') === businessNumber
                    }).filter((obj) => {
                      return obj.sum.total === itemAmount
                    }).filter((obj) => {
                      return obj.date.valueOf() > requestTravel.pay[0].date.valueOf()
                    }).length > 0);
                  }
                }

              } else if (/시공 계약금/gi.test(response.name)) {
                condition = false;
              } else if (/시공 착수금/gi.test(response.name)) {
                condition = false;
              } else if (/시공 중도금/gi.test(response.name)) {
                condition = false;
              } else if (/시공 잔금/gi.test(response.name)) {
                condition = false;
              } else {
                condition = false;
              }

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

          responseIndex++;

        }
      }
    }

    if (alarm) {
      tong = [];
      tong.push(`${dateToString(new Date())} 디자이너 디자인비 정산 명단입니다!`);
      tong.push(bar1);

      tongTong = [];
      tongSet = [];
      for (let { names: { name, designer }, classification: { free, simple, classification }, item: { name: itemName, amount } } of needsResponses) {
        tongTong.push(`- ${designer}D ${name}C : ${itemName.replace(/ 정산/gi, '')} ${autoComma(amount)}원 / ${free ? classification : (simple ? "현금 영수증 확인" : "세금 계산서 발행 완료")}`);
        tongSet.push(itemName.replace(/ 정산/gi, ''));
      }
      tongSet = [ ...new Set(tongSet) ];
      tongSet.sort();

      tongMatrix = [];
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

      await messageSend({ text: tong.join("\n"), channel: "#700_operation" });
    }

    return {
      needs: needsResponses,
      pending: pendingResponses
    };
  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    await PYTHONMONGOC.close();
  }
}

BackWorker.prototype.designerTendencySync = async function () {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, equalJson } = this.mother;
  try {
    const selfMongo = new mongo(mongoinfo);
    await selfMongo.connect();
    const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
    const designers = await back.getDesignersByQuery({}, { selfMongo });
    let thisTendency;
    let num;
    let whereQuery, updateQuery;

    for (let designer of designers) {
      thisTendency = designer.toNormal().analytics.styling.tendency;
      num = 0;
      for (let { desid, contents } of contentsArr) {
        if (designer.desid === desid) {
          for (let key in thisTendency) {
            for (let key2 in thisTendency[key]) {
              thisTendency[key][key2] = thisTendency[key][key2] + contents.portfolio.detailInfo.tendency[key][key2];
            }
          }
          num++;
        }
      }

      if (num !== 0) {
        for (let key in thisTendency) {
          for (let key2 in thisTendency[key]) {
            thisTendency[key][key2] = Math.round(thisTendency[key][key2] / (num + 1));
            if (thisTendency[key][key2] === 0) {
              thisTendency[key][key2] = 1;
            }
            if (thisTendency[key][key2] >= 10) {
              thisTendency[key][key2] = 10;
            }
          }
        }
      }
      whereQuery = { desid: designer.desid };
      updateQuery = {};
      updateQuery["analytics.styling.tendency"] = equalJson(JSON.stringify(thisTendency));
      await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
      console.log(whereQuery, updateQuery);
    }

    await selfMongo.close();

  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.designerFeeTable = async function (desid, option = { selfMongo: null, selfLocalMongo: null }) {
  if (typeof desid !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;
  const back = this.back;
  const serviceTable = [
    "s2011_aa01s",
    "s2011_aa02s",
    "s2011_aa03s",
    "s2011_aa04s",
  ];
  const cliidConst = "c1801_aa01s";
  const xValueConst = 'B';
  const minPyeong = 8;
  const maxPyeong = 100;
  const toMoney = (num) => { return (Math.round(num / 1000) * 1000); }
  let MONGOC, MONGOLOCALC;

  if (option.selfMongo === null || option.selfMongo === undefined) {
    MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();
  } else {
    MONGOC = option.selfMongo;
  }

  if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
    MONGOLOCALC = new mongo(mongoconsoleinfo);
    await MONGOLOCALC.connect();
  } else {
    MONGOLOCALC = option.selfLocalMongo;
  }

  try {
    let designer;
    let res;
    let result;
    let y, serviceMatchBoo;

    designer = await back.getDesignerById(desid, { selfMongo: MONGOC });

    result = {};
    result.service = {};

    for (let serid of serviceTable) {

      y = Number((serid.split('_'))[1].replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^0/, '').replace(/^0/, '')) - 1;
      if (Number.isNaN(y)) {
        throw new Error("service error");
      }
      serviceMatchBoo = (y <= designer.analytics.construct.level);
      if (serviceMatchBoo) {
        serviceMatchBoo = (y <= designer.analytics.construct.ability);
      }

      res = await this.getDesignerFee(desid, cliidConst, serid, xValueConst, { selfMongo: MONGOC, selfLocalMongo: MONGOLOCALC, generalPriceView: true });
      result.alphaPercentage = res.alphaPercentage;
      result.priceStandard = res.priceStandard;
      result.service[serid] = {
        feeFunction: res.feeFunction,
        able: serviceMatchBoo,
        example: [],
      };

      for (let i = minPyeong; i < maxPyeong + 1; i++) {
        result.service[serid].example.push({
          pyeong: i,
          price: toMoney(res.feeFunction(i) * 10000 * res.alphaPercentage)
        });
      }

    }

    if (option.jsonMode === true) {
      for (let serid in result.service) {
        delete result.service[serid].feeFunction;
      }
      delete result.priceStandard._id;

      return JSON.stringify(result, null, 2);

    } else {
      return result;
    }

  } catch (e) {
    console.log(e);
    return { error: e.message };
  } finally {
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }
    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      await MONGOLOCALC.close();
    }
  }
}

BackWorker.prototype.getDesignerFee = async function (proid, cliid, serid = null, xValue = null, option = { selfMongo: null, selfLocalMongo: null }) {
  if (typeof proid === "string" && /^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    if (typeof cliid !== "object" || cliid === null) {
      cliid = { selfMongo: null, selfLocalMongo: null };
    }
    option = cliid;
  } else if (typeof proid === "string" && /^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    if (typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
      throw new Error("invaild input");
    }
    if (!/^c[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(cliid)) {
      throw new Error("invaild input");
    }
    if (!/[0-9]/gi.test(serid)) {
      throw new Error("invaild input");
    }
    if (!/\_/g.test(serid)) {
      serid = "s_" + serid.replace(/[^0-9]/gi, '');
    }
    if (typeof option !== "object" || option === null) {
      option = { selfMongo: null, selfLocalMongo: null };
    }
  } else {
    throw new Error("invaild proid");
  }
  const frontMode = (typeof option === "object" && option !== null) ? (option.frontMode === 1 || option.frontMode === '1') : false;
  const newcomers = [ "곽수빈" ];
  const instance = this;
  const { mongo, mongoinfo, mongoconsoleinfo } = this.mother;
  const back = this.back;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const addressApp = new AddressParser();
  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
  const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
  const functionMaker = function (tong) {
    if (!Array.isArray(tong)) {
      throw new Error("invaild input");
    }
    const endLimit = 900;
    const inclinationDownConst = 2;
    const middleConst = 0.45;
    const inputName = 'x';
    const outputName = 'y';
    let functionScript;
    let middle;
    let pastMiddle;
    let pastAmount;
    let from;
    let inclination;

    functionScript = '';
    pastMiddle = 0;
    pastAmount = 0;
    from = 0;
    for (let { to, amount } of tong) {
      middle = to <= endLimit ? (from + ((to - from) * middleConst)) : from;
      functionScript += `} else if (${String(pastMiddle)} <= ${inputName} && ${inputName} < ${String(middle)}) {\n`;
      functionScript += `  ${outputName} = (((${String(amount)} - ${String(pastAmount)}) / (${String(middle)} - ${String(pastMiddle)})) * ${inputName}) + (((${String(pastAmount)} * ${String(middle)}) - (${String(amount)} * ${String(pastMiddle)})) / (${String(middle)} - ${String(pastMiddle)}));\n`;
      if (to > endLimit) {
        functionScript += `} else {\n`;
        functionScript += `  ${outputName} = (${String(inclination / inclinationDownConst)} * ${inputName}) + (${String(amount)} - ${String(from * (inclination / inclinationDownConst))});\n`;
      }
      inclination = (amount - pastAmount) / (middle - pastMiddle);
      from = to;
      pastMiddle = middle;
      pastAmount = amount;
    }

    functionScript = "let " + outputName + ";\n" + functionScript.slice(String("} else ").length) + "}\nreturn Math.round(" + outputName + ");";
    return new Function(inputName, functionScript);
  }
  const toMoney = (num) => { return (Math.round(num / 1000) * 1000); }
  let MONGOC, MONGOLOCALC;

  if (option.selfMongo === null || option.selfMongo === undefined) {
    MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();
  } else {
    MONGOC = option.selfMongo;
  }

  if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
    MONGOLOCALC = new mongo(mongoconsoleinfo);
    await MONGOLOCALC.connect();
  } else {
    MONGOLOCALC = option.selfLocalMongo;
  }

  try {
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

    priceStandardCollection = "designerPrice";
    addressLogCollection = "addressLog";
    priceStandardConst = 33;
    onlineRatio = 0.8;
    travelNumber = 2;
    distanceLimitPlus = 5;
    comment = "";

    if (typeof cliid === "object") {
      mode = 0;
    } else {
      mode = 1;
      desid = proid;
      if (typeof desid !== "string" || typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
        throw new Error("invaild input");
      }
    }

    if (mode === 0) {

      project = await back.getProjectById(proid, { selfMongo: MONGOC });
      if (project === null) {
        throw new Error("invaild project");
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
        throw new Error("invaild client request number");
      }
      request = client.requests[requestNumber].request;

    } else if (mode === 1) {

      client = await back.getClientById(cliid, { selfMongo: MONGOC });
      requestNumber = 0;
      request = client.requests[requestNumber].request;

    } else {
      throw new Error("mode Error");
    }

    priceStandard = await back.mongoRead(priceStandardCollection, { key: priceStandardConst }, { selfMongo: MONGOLOCALC });
    if (priceStandard.length !== 1) {
      throw new Error("invaild price standard");
    }
    priceStandard = priceStandard[0];

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

    designers = await back.getDesignersByQuery({ $or: desidArr }, { selfMongo: MONGOC });
    if (designers.length === 0) {
      throw new Error("no designer error");
    }

    tong = [];
    clientAddress = null;
    for (let designer of designers) {

      serviceMatchBoo = (y <= designer.analytics.construct.level);
      if (serviceMatchBoo) {
        serviceMatchBoo = (y <= designer.analytics.construct.ability);
      }

      if (client.requests[requestNumber].request.space.resident.living) {
        if (designer.analytics.project.living) {
          livingMatchBoo = true;
        } else {
          livingMatchBoo = false;
        }
      } else {
        livingMatchBoo = true;
      }

      partialMatchBoo = true;
      if (client.requests[requestNumber].request.space.partial.boo === true) {
        partialMatchBoo = false;
        if (designer.analytics.project.partial) {
          partialMatchBoo = true;
        }
      }

      price = await back.mongoRead(priceStandardCollection, { key: (designer.analytics.construct.level * 10) + designer.analytics.styling.level }, { selfMongo: MONGOLOCALC });
      if (price.length !== 1) {
        throw new Error("invaild price");
      }
      price = price[0];

      matrixTong = [];
      for (let m = 0; m < price.matrix.length; m++) {
        matrixTong.push({
          to: price.standard.x.value[m][1],
          amount: price.matrix[m][y]
        });
      }
      thisFeeFunction = functionMaker(matrixTong);
      fee = thisFeeFunction(request.space.pyeong.value) * 10000;
      // fee = price.matrix[x][y] * 10000;

      if (mode === 0) {
        proposal = project.selectProposal(designer.desid);
        if (proposal === null) {
          throw new Error("invaild desid");
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

      newcomerBoo = newcomers.includes(designer.designer);

      if (fee !== 0) {

        addressRows = await back.mongoRead(addressLogCollection, { input: designer.information.address[0].value }, { selfMongo: MONGOLOCALC });
        if (addressRows.length !== 0) {
          designerAddress = addressRows[0].address;
        } else {
          designerAddress = await addressApp.getAddress(designer.information.address[0].value);
          if (designerAddress === null) {
            throw new Error("invaild designer address");
          }
          await back.mongoCreate(addressLogCollection, { input: designer.information.address[0].value, address: designerAddress }, { selfMongo: MONGOLOCALC });
        }

        if (clientAddress === null) {
          addressRows = await back.mongoRead(addressLogCollection, { input: request.space.address.value }, { selfMongo: MONGOLOCALC });
          if (addressRows.length !== 0) {
            clientAddress = addressRows[0].address;
          } else {
            clientAddress = await addressApp.getAddress(request.space.address.value);
            if (clientAddress === null) {
              throw new Error("invaild client address");
            }
            await back.mongoCreate(addressLogCollection, { input: request.space.address.value, address: clientAddress }, { selfMongo: MONGOLOCALC });
          }
        }

        travelInfo = await addressApp.getTravelExpenses(designerAddress, clientAddress, { selfMongo: MONGOLOCALC });
      } else {
        travelInfo = null;
      }

      if (travelInfo === null) {
        distanceBoo = false;
        distanceLimitBoo = false;
        travelInfo = { amount: 0, distance: { string: "0km" }, time: { string: "0시간 0분" } };
      } else {
        distanceBoo = (travelInfo.distance.meters > (designer.analytics.region.range * 1000));
        distanceLimitBoo = (travelInfo.distance.meters > ((distanceLimitPlus + designer.analytics.region.expenses) * 1000));
      }

      if (newcomerBoo) {
        fee = fee * priceStandard.newcomer;
      }

      if (premiumBoo) {
        fee = fee * priceStandard.premium;
      }

      thisDesignerCareerStart = new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1);

      alpha = 0;
      alpha += (designer.information.business.career.relatedY >= 4 ? 0.5 : 0);
      alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 1 : (thisDesignerCareerStart.valueOf() <= fourYearsAgo.valueOf() ? 0.5 : 0);
      alpha += (designer.analytics.project.cad ? 0.5 : 0);
      alpha += (designer.analytics.project.modeling >= 1 ? 0.5 : 0);
      alpha += (designer.analytics.project.collage ? 0.5 : 0);

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      relationItems = designer.analytics.etc.relation.items;
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation.value);

      alpha += (homeliaison * (4.5 / 7));

      //고객 평가 (2점 만점)
      alpha += 1;
      //인기도 (0.5점 만점)
      alpha += 0.5;

      alphaPercentage = (alpha / 100) + 1;

      if (option.generalPriceView === true) {
        return {
          alphaPercentage,
          priceStandard,
          feeFunction: thisFeeFunction
        };
      }

      fee = alphaPercentage * fee;

      offlineFeeCase = fee;
      onlineFeeCase = fee * 0.85;

      if (!distanceBoo || distanceLimitBoo) {
        travelInfo.amount = 0;
        travelNumber = 0;
        travelInfo.distance.string = "0km";
        travelInfo.time.string = "0시간 0분";
      }

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

      if (!serviceMatchBoo) {
        comment = frontMode ? "해당 서비스에서는 불가능" : "Unable service";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      if (!livingMatchBoo) {
        comment = frontMode ? "거주중 진행 불가능" : "Unable in living";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      if (!partialMatchBoo) {
        comment = frontMode ? "부분 공간 진행 불가능" : "Unable in partial space";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      if (y >= 2 && distanceBoo) {
        comment = frontMode ? "토탈 스타일링시 거리 초과 불가능" : "Distance over, unable in totalStyling";
        if (!frontMode) {
          fee = 0;
          offlineFeeCase = 0;
          onlineFeeCase = 0;
        }
      }

      if (comment === "" && fee === 0) {
        comment = "Zero in table";
      }

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

    if (mode === 0) {
      return tong;
    } else if (mode === 1) {
      return tong[0];
    }

  } catch (e) {
    console.log(e);
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
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }
    if (option.selfLocalMongo === null || option.selfLocalMongo === undefined) {
      await MONGOLOCALC.close();
    }
  }
}

BackWorker.prototype.designerCuration = async function (cliid, selectNumber, seridArr, option = { selfMongo: null, selfLocalMongo: null }) {
  const instance = this;
  const back = this.back;
  if (typeof cliid !== "string" || typeof selectNumber !== "number" || !Array.isArray(seridArr)) {
    throw new Error("invaild input");
  }
  try {
    const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
    const addressApp = new AddressParser();
    const designers = await back.getDesignersByQuery({}, { selfMongo: option.selfMongo, withTools: true });
    const clientCase = await back.getCaseProidById(cliid, { selfMongo: option.selfMongo });
    const realTimes = await back.mongoRead("realtimeDesigner", {}, { selfMongo: option.selfLocalMongo });
    const clientHistory = await back.getHistoryById("client", cliid, { selfMongo: option.selfLocalMongo });
    const { client, cases } = clientCase;
    const ytoken = 'y';
    const mtoken = 'm';
    const pyeongStandards = [
      [ 0, 22 ],
      [ 23, 34 ],
      [ 34, 99999 ]
    ];
    let contract, proposal, final;
    let project;
    let temp;
    let realtimeMap;
    let standard;
    let now;
    let range, secondRange;
    let selected, selectedDesigner;
    let boo;
    let designer;
    let preferBoo, preferDesigners;
    let tempObj;
    let feeCalculation;
    let serviceCase;
    let serid, xValue;
    let dateNumber, secondDateNumber;
    let seridNumber;
    let standardStart, standardEnd, standardRealEnd;
    let possibleRange, possibleRealRange;
    let possibleTempArr;
    let possibleBoo;
    let realPossible;
    let selectedResult;
    let onlyOnlineCase;
    let offlineOnlineCase;
    let pyeongIndex;

    selectNumber = selectNumber * 3;

    serid = null;
    xValue = null;
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
      feeCalculation = async function (arr) {
        if (!Array.isArray(arr)) {
          throw new Error("invaild input");
        }
        let feeObject;
        let newArr;
        let designer;
        try {
          newArr = [];
          for (let obj of arr) {
            feeObject = await instance.getDesignerFee(obj.desid, cliid, serid, xValue, { selfMongo: option.selfMongo, selfLocalMongo: option.selfLocalMongo });

            obj.resetFee();

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

            if (feeObject.detail.online !== 0) {
              newArr.push(obj);
            }
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

    preferBoo = false;
    if (clientHistory.curation !== undefined) {
      if (Array.isArray(clientHistory.curation.style)) {
        if (clientHistory.curation.style.length > 0) {
          preferBoo = true;
          preferDesigners = clientHistory.curation.style;
        }
      }
    }

    dateNumber = 60;
    secondDateNumber = 60;
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

    standardEnd = client.toNormal().requests[0].analytics.date.space.movein;
    standardStart = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardStart.setDate(standardStart.getDate() - dateNumber);
    standardRealEnd = new Date(standardEnd.getFullYear(), standardEnd.getMonth(), standardEnd.getDate());
    standardRealEnd.setDate(standardRealEnd.getDate() + secondDateNumber);

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

    final = clientCase.caseProposal();

    if (option.noCalculation !== true) {
      final = final.filter((project) => { return project.service.serid === serid });
      if (final.length <= (selectNumber * 4)) {
        final = await back.getProjectsByQuery({ "service.serid": serid }, { selfMongo: option.selfMongo, limit: 800 });
      }
    }

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

    //option.noCalculation
    selectedResult = null;
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

    // distance priority
    selectedResult.sort((a, b) => {
      return a.fee[0].distance.amount - b.fee[0].distance.amount;
    });
    onlyOnlineCase = [];
    offlineOnlineCase = [];
    for (let p of selectedResult) {
      if (p.fee.every((obj) => { return obj.method === "online" })) {
        onlyOnlineCase.push(p);
      } else {
        offlineOnlineCase.push(p);
      }
    }
    selectedResult = offlineOnlineCase.concat(onlyOnlineCase);
    selectedResult = selectedResult.slice(0, selectNumber / 1.5);
    selectNumber = selectNumber / 1.5;

    // pyeong priority
    pyeongIndex = pyeongStandards.findIndex((arr) => {
      return arr[0] <= client.requests[0].request.space.pyeong.value && arr[1] >= client.requests[0].request.space.pyeong.value;
    }) + 1
    if (Number(serid.split('_')[1].replace(/[^0-9]/gi, '')) < 3) {
      if (pyeongIndex === 1) {
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.styling.level - pyeongIndex) - (designers.search(b.desid).analytics.styling.level - pyeongIndex)
        });
      } else if (pyeongIndex === 2) {
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.styling.level - pyeongIndex < 0 ? 0.5 : designers.search(a.desid).analytics.styling.level - pyeongIndex) - (designers.search(b.desid).analytics.styling.level - pyeongIndex < 0 ? 0.5 : designers.search(b.desid).analytics.styling.level - pyeongIndex)
        });
      } else {
        selectedResult.sort((a, b) => {
          return (pyeongIndex - designers.search(a.desid).analytics.styling.level) - (pyeongIndex - designers.search(b.desid).analytics.styling.level)
        });
      }
    } else {
      if (pyeongIndex === 1) {
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.construct.level - pyeongIndex) - (designers.search(b.desid).analytics.construct.level - pyeongIndex)
        });
      } else if (pyeongIndex === 2) {
        selectedResult.sort((a, b) => {
          return (designers.search(a.desid).analytics.construct.level - pyeongIndex < 0 ? 0.5 : designers.search(a.desid).analytics.construct.level - pyeongIndex) - (designers.search(b.desid).analytics.construct.level - pyeongIndex < 0 ? 0.5 : designers.search(b.desid).analytics.construct.level - pyeongIndex)
        });
      } else {
        selectedResult.sort((a, b) => {
          return (pyeongIndex - designers.search(a.desid).analytics.construct.level) - (pyeongIndex - designers.search(b.desid).analytics.construct.level)
        });
      }
    }

    return selectedResult.slice(0, selectNumber / 2);

  } catch (e) {
    console.log(e);
    return e.message;
  }
}

BackWorker.prototype.proposalReset = async function (cliid, option = { selfMongo: null, selfLocalBoo: null }) {
  if (typeof cliid !== "string") {
    throw new Error("invaild input");
  }
  if (!/^[cp]/.test(cliid)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  try {
    let selfMongo, selfLocalMongo;
    let selfBoo, selfLocalBoo;
    let detail, update;
    let projects;

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (option.selfLocalMongo === undefined || option.selfLocalMongo === null) {
      selfLocalBoo = false;
    } else {
      selfLocalBoo = true;
    }

    if (!selfBoo) {
      selfMongo = new mongo(mongoinfo);
      await selfMongo.connect();
    } else {
      selfMongo = option.selfMongo;
    }

    if (!selfLocalBoo) {
      selfLocalMongo = new mongo(mongolocalinfo);
      await selfLocalMongo.connect();
    } else {
      selfLocalMongo = option.selfLocalMongo;
    }

    projects = await back.getProjectsByQuery({ cliid }, { selfMongo });
    update = [];
    if (/^c/.test(cliid)) {
      projects = await back.getProjectsByQuery({ cliid }, { selfMongo });
    } else if (/^p/.test(cliid)) {
      projects = await back.getProjectById(cliid, { selfMongo });
      if (projects === null) {
        projects = [];
      } else {
        projects = [ projects ];
      }
    } else {
      throw new Error("invaild id");
    }

    if (projects.length > 0) {
      const project = projects[0];
      const { proid, cliid: id, service: { serid } } = project;

      detail = await this.designerCuration(id, 4, [ serid ], { selfMongo, selfLocalMongo });
      for (let d of detail) {
        update.push(d.toNormal());
      }
      if (update.length > 0) {
        await back.updateProject([ { proid }, { "proposal.detail": update } ], { selfMongo });
      }
    }

    if (!selfBoo) {
      await selfMongo.close();
    }
    if (!selfLocalBoo) {
      await selfLocalMongo.close();
    }

    return update.length;
  } catch (e) {
    console.log(e);
  }
}

BackWorker.prototype.realtimeDesignerSync = async function (proid, option = { selfMongo: null, selfConsoleMongo: null }) {
  if (typeof proid !== "string") {
    throw new Error("invaild input");
  }
  if (!/^[p]/.test(proid)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongoconsoleinfo, equalJson, dateToString } = this.mother;
  const collection = "realtimeDesigner";
  const deepCopy = (obj) => { return equalJson(JSON.stringify(obj)); }
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }
  let selfMongo, selfConsoleMongo;
  let selfBoo, selfConsoleBoo;

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
    let project, realTimes, realTime, possible;
    let result0, result1, result2;
    let from, to;
    let copied0, copied1, copied2;
    let tempDate, tempObj;
    let finalBoo;
    let desid;
    let updatedProids;
    let final;

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

    project = await back.getProjectById(proid, { selfMongo });
    if (project === null) {
      throw new Error("invaild proid");
    }
    desid = project.desid;
    if (desid === "") {
      throw new Error("invaild project");
    }
    designer = await back.getDesignerById(desid, { selfMongo });
    if (designer === null) {
      throw new Error("invaild desid");
    }
    realTimes = await back.mongoRead(collection, { desid }, { selfMongo: selfConsoleMongo });
    if (realTimes.length === 0) {
      throw new Error("there is no realtime in this designer");
    }
    [ realTime ] = realTimes;
    [ { possible } ] = realTimes;
    updatedProids = (realTime.updatedProids === undefined ? [] : deepCopy(realTime.updatedProids));
    from = project.process.contract.form.date.from;
    to = project.process.contract.form.date.to;

    from.setHours(0);
    from.setMinutes(0);
    from.setSeconds(0);
    from.setMilliseconds(0);

    to.setHours(0);
    to.setMinutes(0);
    to.setSeconds(0);
    to.setMilliseconds(0);

    result0 = [];
    for (let obj of possible) {

      obj.start.setHours(0);
      obj.start.setMinutes(0);
      obj.start.setSeconds(0);
      obj.start.setMilliseconds(0);

      obj.end.setHours(0);
      obj.end.setMinutes(0);
      obj.end.setSeconds(0);
      obj.end.setMilliseconds(0);

      if (to.valueOf() < obj.start.valueOf()) {
        result0.push(deepCopy(obj));
      } else if (to.valueOf() <= obj.end.valueOf()) {
        if (from.valueOf() < obj.start.valueOf()) {

          // case 1
          copied0 = deepCopy(obj);
          copied0.end = dateCopy(to);
          copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied0);

          if (dateToString(to) !== dateToString(obj.end)) {
            copied1 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied1.start = tempDate;
            result0.push(copied1);
          }

        } else {

          // case 2
          if (dateToString(from) === dateToString(obj.start) && dateToString(to) === dateToString(obj.end)) {

            copied0 = deepCopy(obj);
            copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied0);

          } else if (dateToString(from) === dateToString(obj.start) && dateToString(to) !== dateToString(obj.end)) {

            copied0 = deepCopy(obj);
            copied0.end = dateCopy(to);
            copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied0);

            copied1 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied1.start = tempDate;
            result0.push(copied1);

          } else if (dateToString(from) !== dateToString(obj.start) && dateToString(to) === dateToString(obj.end)) {

            copied0 = deepCopy(obj);
            tempDate = dateCopy(from);
            tempDate.setDate(tempDate.getDate() - 1);
            copied0.end = tempDate;
            result0.push(copied0);

            copied1 = deepCopy(obj);
            copied1.start = dateCopy(from);
            copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied1);

          } else {

            copied0 = deepCopy(obj);
            tempDate = dateCopy(from);
            tempDate.setDate(tempDate.getDate() - 1);
            copied0.end = dateCopy(tempDate);
            result0.push(copied0);

            copied1 = deepCopy(obj);
            copied1.start = dateCopy(from);
            copied1.end = dateCopy(to);
            copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
            result0.push(copied1);

            copied2 = deepCopy(obj);
            tempDate = dateCopy(to);
            tempDate.setDate(tempDate.getDate() + 1);
            copied2.start = dateCopy(tempDate);
            result0.push(copied2);

          }

        }
      } else {
        if (from.valueOf() < obj.start.valueOf()) {

          // case 3
          copied0 = deepCopy(obj);
          copied0.matrix = copied0.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied0);

        } else if (from.valueOf() < obj.end.valueOf()) {

          // case 4

          copied0 = deepCopy(obj);
          tempDate = dateCopy(from);
          tempDate.setDate(tempDate.getDate() - 1);
          copied0.end = dateCopy(tempDate);
          result0.push(copied0);

          copied1 = deepCopy(obj);
          copied1.start = dateCopy(from);
          copied1.matrix = copied1.matrix.map((number) => { return ((number - 1 < 0) ? 0 : number - 1) });
          result0.push(copied1);

        } else {
          result0.push(deepCopy(obj));
        }
      }
    }

    result1 = [];
    for (let obj of result0) {
      obj.start.setHours(0);
      obj.start.setMinutes(0);
      obj.start.setSeconds(0);
      obj.start.setMilliseconds(0);
      obj.end.setHours(0);
      obj.end.setMinutes(0);
      obj.end.setSeconds(0);
      obj.end.setMilliseconds(0);
      if (obj.start.valueOf() <= obj.end.valueOf()) {
        if (!obj.matrix.every((n) => { return n === 0; })) {
          result1.push(deepCopy(obj));
        }
      }
    }

    result2 = [];
    finalBoo = true;
    for (let i = 0; i < result1.length - 1; i++) {
      tempDate = dateCopy(result1[i].end);
      tempDate.setDate(tempDate.getDate() + 1);
      if (result1[i + 1].start.valueOf() <= tempDate.valueOf() && JSON.stringify(result1[i].matrix) === JSON.stringify(result1[i + 1].matrix)) {
        tempObj = deepCopy(result1[i]);
        tempObj.end = dateCopy(result1[i + 1].end);
        result2.push(deepCopy(tempObj));
        finalBoo = false;
      } else {
        if (finalBoo) {
          result2.push(deepCopy(result1[i]));
        }
        finalBoo = true;
      }
    }

    if (finalBoo) {
      result2.push(deepCopy(result1[result1.length - 1]));
    }

    if (!updatedProids.includes(proid)) {
      updatedProids.push(proid);
      await back.mongoUpdate(collection, [ { desid }, { possible: result2, updatedProids } ], { selfMongo: selfConsoleMongo });
      realTime.possible = result2;
      realTime.updatedProids = updatedProids;
    }

    final = deepCopy(realTime);
    delete final._id;

    if (!selfBoo) {
      await selfMongo.close();
      selfBoo = true;
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
      selfConsoleBoo = true;
    }

    return {
      message: "success",
      result: final,
    };

  } catch (e) {
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

BackWorker.prototype.realtimePossibleConverting = function (possibleArr, dateMargin = 10) {
  if (!Array.isArray(possibleArr)) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (!possibleArr.every((obj) => { return typeof obj === "object" })) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (!possibleArr.every((obj) => { return (obj.start !== undefined && obj.end !== undefined) })) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (typeof dateMargin !== "number") {
    dateMargin = 10;
  }
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

  rawPossibleArr = possibleArr.map((obj) => { return { start: obj.start, end: obj.end }; });

  do {
    indexArr = [];
    for (let i = 0; i < rawPossibleArr.length - 1; i++) {
      tempDateArr = new Array(dateMargin);
      for (let j = 0; j < dateMargin; j++) {
        tempDateArr[j] = new Date(JSON.stringify(rawPossibleArr[i].end).slice(1, -1));
        tempDateArr[j].setDate(tempDateArr[j].getDate() + (j + 1));
        tempDateArr[j] = dateToString(tempDateArr[j]);
      }
      tempDate2 = new Date(JSON.stringify(rawPossibleArr[i + 1].start).slice(1, -1));
      if (tempDateArr.includes(dateToString(tempDate2))) {
        indexArr.push(i);
      }
    }
    if (indexArr.length > 0) {

      indexArr = indexArr.map((num) => { return [ num, num + 1 ] });
      indexArrFlat = indexArr.flat();
      tempObj = {};
      for (let a of indexArrFlat) {
        if (tempObj['a' + String(a)] !== undefined) {
          tempObj['a' + String(a)] = tempObj['a' + String(a)] + 1;
        } else {
          tempObj['a' + String(a)] = 1;
        }
      }
      removeTargets = [];
      for (let key in tempObj) {
        if (tempObj[key] !== 1) {
          removeTargets.push(Number(key.replace(/[^0-9]/gi, '')));
        }
      }

      indexArrReverse = [];
      for (let i = 0; i < rawPossibleArr.length; i++) {
        indexArrReverse.push(i);
      }
      indexArrReverse = indexArrReverse.filter((num) => { return !indexArrFlat.includes(num); });
      indexArrFlat = indexArrFlat.filter((num) => { return !removeTargets.includes(num); })

      indexArrFinal = [];
      for (let i = 0; i < indexArrFlat.length; i++) {
        if (i % 2 === 0) {
          indexArrFinal.push([ indexArrFlat[i], indexArrFlat[i + 1] ]);
        }
      }

      indexArrFinal = indexArrFinal.map((arr) => {
        return {
          start: new Date(JSON.stringify(rawPossibleArr[arr[0]].start).slice(1, -1)),
          end: new Date(JSON.stringify(rawPossibleArr[arr[1]].end).slice(1, -1))
        };
      });

      for (let index of indexArrReverse) {
        indexArrFinal.push(equalJson(JSON.stringify(rawPossibleArr[index])));
      }
      indexArrFinal.sort((a, b) => {
        return a.start.valueOf() - b.start.valueOf();
      });

      rawPossibleArr = equalJson(JSON.stringify(indexArrFinal));

      dateBoo = true;
    } else {
      dateBoo = false;
    }
  } while (dateBoo);

  return rawPossibleArr;
}

BackWorker.prototype.realtimeDesignerMatch = async function (desid, proid, serid, xValue, option = { selfMongo: null, selfConsoleMongo: null }) {
  if (typeof desid !== "string" || typeof proid !== "string") {
    throw new Error("invaild input");
  }
  if (!/^[d]/.test(desid)) {
    throw new Error("invaild desid");
  }
  if (!/^[cp]/.test(proid)) {
    throw new Error("invaild proid or cliid");
  }
  if (typeof serid === "object" && serid !== null) {
    option = serid;
  } else if (typeof serid === "string") {
    if (typeof xValue !== "string" || typeof option !== "object") {
      throw new Error("invaild xValue or option");
    }
  } else {
    throw new Error("invaild serid position");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongoconsoleinfo, equalJson, dateToString, serviceParsing } = this.mother;
  const collection = "realtimeDesigner";
  const dateMargin = 10;
  let selfMongo, selfConsoleMongo;
  let selfBoo, selfConsoleBoo;

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

    if (/^p/.test(proid)) {
      project = await back.getProjectById(proid, { selfMongo });
      cliid = project.cliid;
      client = await back.getClientById(cliid, { selfMongo });
      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      online = project.service.online;
      serid = project.service.serid;
      xValue = project.service.xValue;
    } else {
      cliid = proid;
      client = await back.getClientById(cliid, { selfMongo });
      requestNumber = 0;
      online = false;
    }

    startDate = client.toNormal().requests[requestNumber].analytics.date.space.movein;
    endDate = client.toNormal().requests[requestNumber].analytics.date.space.movein;
    startDate.setDate(startDate.getDate() - serviceParsing({ online, serid, xValue }, true));

    startDate.setDate(startDate.getDate() + dateMargin);
    endDate.setDate(endDate.getDate() - dateMargin);

    designerRealtime = await back.mongoRead(collection, { desid }, { selfMongo: selfConsoleMongo });
    rawPossibleArr = this.realtimePossibleConverting(designerRealtime[0].possible, dateMargin);

    boo = false;
    for (let { start, end } of rawPossibleArr) {
      if (start.valueOf() <= startDate.valueOf() && endDate.valueOf() <= end.valueOf()) {
        boo = true;
        break;
      }
    }

    if (!selfBoo) {
      await selfMongo.close();
    }
    if (!selfConsoleBoo) {
      await selfConsoleMongo.close();
    }

    return {
      result: boo,
      possible: rawPossibleArr,
      project: {
        start: startDate,
        end: endDate
      },
    };

  } catch (e) {
    return { message: "error : " + e.message };
  }
}

BackWorker.prototype.clientActionSync = async function (option = { selfMongo: null, selfConsoleMongo: null, updateMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo, equalJson, requestSystem } = this.mother;
  const actionFilter = (action, clients, clientHistories) => {
    let targets, cliidArr;
    let targetClients;
    let targetClientHistories;

    targets = [];
    for (let client of clients) {
      for (let { analytics } of client.requests) {
        if (analytics.response.action.value.trim() === action.trim()) {
          targets.push(client.cliid);
        }
      }
    }
    targets = [ ...new Set(targets) ];

    cliidArr = targets.map((cliid) => { return { cliid } });
    targetClients = clients.toNormal().filter((c) => { return targets.includes(c.cliid); });
    targetClientHistories = clientHistories.filter((c) => { return targets.includes(c.cliid); });

    return { clients: targetClients, histories: targetClientHistories };
  }
  let selfMongo, selfConsoleMongo, updateMongo;
  let selfBoo, selfConsoleBoo, updateBoo;
  let fromLocalMode;

  selfBoo = (option.selfMongo !== null && option.selfMongo !== undefined);
  selfConsoleBoo = (option.selfConsoleMongo !== null && option.selfConsoleMongo !== undefined);
  updateBoo = (option.updateMongo !== null && option.updateMongo !== undefined);
  fromLocalMode = (option.fromLocal === true);

  try {
    let clients, clientHistories;
    let filteredObject;
    let targets;
    let tempArr, tempArr2;
    let whereQuery, updateQuery;
    let thisClient;
    let tempObj;
    let updateQueries;

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
    if (!selfConsoleBoo) {
      selfConsoleMongo = new mongo(mongoinfo);
      await selfConsoleMongo.connect();
    } else {
      selfConsoleMongo = option.selfConsoleMongo;
    }
    if (!updateBoo) {
      updateMongo = new mongo(mongoinfo);
      await updateMongo.connect();
    } else {
      updateMongo = option.updateMongo;
    }

    clients = await back.getClientsByQuery({ requests: { $elemMatch: { "analytics.response.status": { $regex: "^[응장]" } } } }, { selfMongo, withTools: true });
    if (clients.length > 0) {
      clientHistories = await back.getHistoriesByQuery("client", { $or: clients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfConsoleMongo });
      updateQueries = [];

      // 1 - 1차 응대 예정
      filteredObject = actionFilter("1차 응대 예정", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "1차 응대 예정") {
            tempObj = { cliid, requestNumber: i };
            tempArr = call.out.concat(call.in).filter((obj) => { return obj.success; });
            tempArr = tempArr.filter((obj) => { return obj.date.valueOf() >= thisClient.requests[i].request.timeline.valueOf(); });
            if (i !== 0) {
              tempArr = tempArr.filter((obj) => { return obj.date.valueOf() < thisClient.requests[i - 1].request.timeline.valueOf(); });
            }
            tempArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

            tempArr2 = send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "general" });
            tempArr2 = tempArr2.filter((obj) => { return obj.date.valueOf() >= thisClient.requests[i].request.timeline.valueOf(); });
            if (i !== 0) {
              tempArr2 = tempArr2.filter((obj) => { return obj.date.valueOf() < thisClient.requests[i - 1].request.timeline.valueOf(); });
            }
            tempArr2.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

            if (tempArr.length === 0) {
              if (tempArr2.length > 0) {
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
                } else {
                  tempObj.to = "부재중 알림 발송";
                }
                targets.push(tempObj);
              }
            } else {
              if (tempArr2.length > 0) {
                if (tempArr2[0].date.valueOf() < tempArr[0].date.valueOf()) {
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
                  } else {
                    tempObj.to = "부재중 알림 발송";
                  }
                } else {
                  if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
                    if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                      if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                        tempObj.to = "제안 피드백 예정";
                      } else {
                        tempObj.to = "제안 발송 예정";
                      }
                    } else {
                      tempObj.to = "스타일 체크 대기";
                    }
                  } else {
                    tempObj.to = "1차 응대 후 대기";
                  }
                }
              } else {
                if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
                  if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                    if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                      tempObj.to = "제안 피드백 예정";
                    } else {
                      tempObj.to = "제안 발송 예정";
                    }
                  } else {
                    tempObj.to = "스타일 체크 대기";
                  }
                } else {
                  tempObj.to = "1차 응대 후 대기";
                }
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
          from: "1차 응대 예정",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }

      // 1.2 - 1차 응대 후 대기
      filteredObject = actionFilter("1차 응대 후 대기", clients, clientHistories);
      targets = [];
      for (let { cliid, curation: { analytics: { page, call, send, submit } } } of filteredObject.histories) {
        thisClient = clients.pick(cliid);
        for (let i = 0; i < thisClient.requests.length; i++) {
          if ([ "응대중", "장기" ].includes(thisClient.requests[i].analytics.response.status.value) && thisClient.requests[i].analytics.response.action.value === "1차 응대 후 대기") {
            tempObj = { cliid, requestNumber: i };
            if (send.filter((obj) => { return obj.page === "styleCuration" && obj.mode === "lite" }).length > 0) {
              if (submit.filter((obj) => { return obj.page === "styleCuration" }).length > 0) {
                if (send.filter((obj) => { return obj.page === "designerProposal" }).length > 0) {
                  tempObj.to = "제안 피드백 예정";
                } else {
                  tempObj.to = "제안 발송 예정";
                }
              } else {
                tempObj.to = "스타일 체크 대기";
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
          from: "1차 응대 후 대기",
          to: to,
          randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
        });
        console.log(whereQuery, updateQuery);
      }


      // 1.3 - 스타일 체크 대기
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


      // 1.4 - 제안 발송 예정
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


      // 2.2 - 부재중 알림 발송
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


      // 2.3 - 상세 설문 대기
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


      // 2.4 - 부재중 제안 발송
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
    console.log(e);
  }
}

BackWorker.prototype.projectActionSync = async function (option = { selfMongo: null, selfConsoleMongo: null, updateMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongoconsoleinfo, mongolocalinfo, equalJson, requestSystem } = this.mother;
  const actionFilter = (action, projects, projectHistories) => {
    let targets, proidArr;
    let targetProjects;
    let targetProjectHistories;

    targets = [];
    if (typeof action === "string") {
      for (let project of projects) {
        if (project.process.action.value.trim() === action.trim()) {
          targets.push(project.proid);
        }
      }
    } else if (Array.isArray(action)) {
      for (let project of projects) {
        if (action.includes(project.process.action.value.trim())) {
          targets.push(project.proid);
        }
      }
    } else {
      throw new Error("invaild input");
    }
    targets = [ ...new Set(targets) ];

    proidArr = targets.map((proid) => { return { proid } });
    targetProjects = projects.toNormal().filter((p) => { return targets.includes(p.proid); });
    targetProjectHistories = projectHistories.filter((p) => { return targets.includes(p.proid); });

    return { projects: targetProjects, histories: targetProjectHistories };
  }
  let selfMongo, selfConsoleMongo, updateMongo;
  let selfBoo, selfConsoleBoo, updateBoo;
  let fromLocalMode;

  selfBoo = (option.selfMongo !== null && option.selfMongo !== undefined);
  selfConsoleBoo = (option.selfConsoleMongo !== null && option.selfConsoleMongo !== undefined);
  updateBoo = (option.updateMongo !== null && option.updateMongo !== undefined);
  fromLocalMode = (option.fromLocal === true);

  try {
    let projects, projectHistories;
    let clients, clientHistories;
    let designers, designerHistories;
    let filteredObject;
    let targets;
    let tempArr, tempArr2;
    let whereQuery, updateQuery;
    let thisClient;
    let tempObj, tempIndex;
    let updateQueries;

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
    if (!updateBoo) {
      updateMongo = new mongo(mongoinfo);
      await updateMongo.connect();
    } else {
      updateMongo = option.updateMongo;
    }

    projects = await back.getProjectsByQuery({ $and: [ { desid: { $regex: "^d" } }, { "process.status": { $regex: "^[대진홀]" } } ] }, { selfMongo, withTools: true });

    if (projects.length > 0) {
      projectHistories = await back.getHistoriesByQuery("project", { $or: projects.toNormal().map((p) => { return { proid: p.proid } }) }, { selfMongo: selfConsoleMongo });
      clients = await back.getClientsByQuery({ $or: projects.toNormal().map((p) => { return { cliid: p.cliid }; }) }, { selfMongo });
      clientHistories = await back.getHistoriesByQuery("client", { $or: projects.toNormal().map((p) => { return { cliid: p.cliid }; }) }, { selfMongo: selfConsoleMongo });
      designers = await back.getDesignersByQuery({ $or: projects.toNormal().map((p) => { return { desid: p.desid }; }) }, { selfMongo });
      designerHistories = await back.getHistoriesByQuery("designer", { $or: projects.toNormal().map((p) => { return { desid: p.desid }; }) }, { selfMongo: selfConsoleMongo });
      updateQueries = [];

      // to: 현장미팅 확정
      filteredObject = actionFilter([ "계약금 안내", "현장미팅 조율" ], projects, projectHistories);
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
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: updateMongo });
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

      // to: 의뢰서 공유
      filteredObject = actionFilter([ "현장미팅 확정" ], projects, projectHistories);
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
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: updateMongo });
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

      // to: 현장미팅 피드백
      filteredObject = actionFilter([ "계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유" ], projects, projectHistories);
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
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: updateMongo });
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

      // to: 잔금 안내
      filteredObject = actionFilter([ "계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유", "현장미팅 피드백" ], projects, projectHistories);
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
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: updateMongo });
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

      // to: 시작 대기
      filteredObject = actionFilter([ "계약금 안내", "현장미팅 조율", "현장미팅 확정", "의뢰서 공유", "현장미팅 피드백", "잔금 안내" ], projects, projectHistories);
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
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: updateMongo });
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
    console.log(e);
  }
}

BackWorker.prototype.designerLevelMatrixSync = async function (selfMongo) {
  const instance = this;
  const { equalJson } = this.mother;
  try {
    const db = "miro81";
    const collection = "designer";
    const designers = await selfMongo.db(db).collection(collection).find({}).toArray();
    let whereQuery, updateQuery;
    let copiedMatrix;

    for (let designer of designers) {
      whereQuery = { desid: designer.desid };
      updateQuery = {};

      copiedMatrix = equalJson(JSON.stringify(designer.analytics.project.matrix));
      if (designer.analytics.construct.level === 0) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ 0, 0, 0 ];
        copiedMatrix[2] = [ 0, 0, 0 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      } else if (designer.analytics.construct.level === 1) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ 0, 0, 0 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      } else if (designer.analytics.construct.level === 2) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[3] = [ 0, 0, 0 ];
      } else if (designer.analytics.construct.level === 3) {
        copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        copiedMatrix[3] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
      }

      updateQuery["analytics.project.matrix"] = equalJson(JSON.stringify(copiedMatrix));
      await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
      console.log(whereQuery, updateQuery);
    }

    return true;

  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = BackWorker;
