/**
 * LogReport 클래스는 마케팅 데이터를 관리하고, 이를 구글 시트로 업데이트하는 작업을 수행합니다.
 * 이 클래스는 MongoDB와의 연결, 외부 서비스와의 통합, 데이터 처리 등을 포함합니다.
 * 
 * @class
 * @param {object} MONGOC - MongoDB 클라이언트 객체로, 데이터베이스 연결을 관리합니다.
 */
const LogReport = function (MONGOC) {
  // 현재 작업 디렉토리에서 Mother 모듈을 불러옵니다.
  // Mother 클래스는 다양한 유틸리티 메서드를 제공하며, 데이터 처리, API 호출 등을 지원합니다.
  const Mother = require(`${process.cwd()}/apps/mother.js`);

  // 현재 작업 디렉토리에서 BackMaker 모듈을 불러옵니다.
  // BackMaker 클래스는 백엔드 관련 작업을 처리하며, 데이터베이스와의 상호작용을 포함합니다.
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  // Mother 클래스의 인스턴스를 생성하여 this.mother에 저장합니다.
  // 이 인스턴스는 LogReport 클래스 내에서 다양한 유틸리티 기능을 제공하는 데 사용됩니다.
  this.mother = new Mother();

  // BackMaker 클래스의 인스턴스를 생성하여 this.back에 저장합니다.
  // 이 인스턴스는 데이터베이스와의 상호작용 및 백엔드 작업을 수행하는 데 사용됩니다.
  this.back = new BackMaker();

  // 현재 작업 디렉토리에서 주소 정보 객체를 불러와 this.address에 저장합니다.
  // address 객체는 홈리에종의 서버 주소와 관련된 정보를 포함하고 있습니다.
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  // MongoDB 클라이언트 객체를 this.mongo에 저장합니다.
  // 이 객체는 LogReport 클래스에서 데이터베이스 작업을 수행하는 데 사용됩니다.
  this.mongo = MONGOC;

  // 홈리에종의 메인 서버 호스트 정보를 this.host에 저장합니다.
  // 이 정보는 서버와의 통신 및 데이터 전송 시 사용됩니다.
  this.host = this.address.officeinfo.host;
}

/**
 * LogReport 클래스의 dailyReports 메서드는 마케팅 데이터를 수집, 분석하여 구글 시트로 업데이트하는 작업을 수행합니다.
 * 이 메서드는 매일 실행되어 최신 데이터를 반영합니다.
 * 
 * @returns {Promise<boolean>} 이 메서드는 비동기 작업을 수행하며, 반환 값은 불리언입니다.
 */
LogReport.prototype.dailyReports = async function () {
  // LogReport 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // LogReport 클래스의 back 속성을 back 변수에 저장합니다.
  // back 속성은 BackMaker 클래스의 인스턴스를 가리키며, 백엔드 관련 작업을 처리합니다.
  const back = this.back;

  // LogReport 클래스의 address 속성을 address 변수에 저장합니다.
  // address 속성은 홈리에종의 서버 주소 정보 객체를 가리킵니다.
  const address = this.address;

  // host 정보를 추출하여 host 변수에 저장합니다.
  // 이 변수는 홈리에종의 메인 서버 호스트를 나타냅니다.
  const { host } = this;

  // Mother 클래스에서 제공하는 다양한 유틸리티 메서드를 비구조화 할당으로 불러옵니다.
  // 이 메서드들은 데이터베이스 작업, 파일 시스템 작업, API 요청, 문자열 포맷팅 등을 지원합니다.
  const { 
    mongo,               // MongoDB와의 연결을 관리하는 클래스입니다.
    mongoinfo,           // 메인 데이터베이스 연결 정보를 포함합니다.
    mongocontentsinfo,   // 콘텐츠 데이터베이스 연결 정보를 포함합니다.
    fileSystem,          // 파일 시스템 작업을 처리합니다.
    requestSystem,       // HTTP 요청을 처리하는 메서드입니다.
    autoComma,           // 숫자에 자동으로 콤마를 추가하는 포맷팅 함수입니다.
    dateToString,        // 날짜 객체를 문자열로 변환하는 함수입니다.
    stringToDate,        // 문자열을 날짜 객체로 변환하는 함수입니다.
    equalJson,           // JSON.parse와 같은 기능을 하는 메서드로 주어진 JSON string을 객체로 변환합니다.
    errorLog,            // 에러 로그를 기록하는 함수입니다.
    messageLog,          // 메시지 로그를 기록하는 함수입니다.
    messageSend,         // 메시지를 전송하는 함수입니다.
    serviceParsing,      // 홈리에종 서비스를 파싱하는 함수입니다.
    getDateMatrix,       // 날짜를 매트릭스 형식으로 변환하는 함수입니다.
    zeroAddition         // 숫자에 0을 추가하는 함수입니다.
  } = this.mother;

  // GoogleSheet 모듈을 현재 작업 디렉토리에서 불러옵니다.
  // GoogleSheet 클래스는 구글 시트와의 상호작용을 처리합니다.
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);

  // GoogleAnalytics 모듈을 현재 작업 디렉토리에서 불러옵니다.
  // GoogleAnalytics 클래스는 구글 애널리틱스와의 상호작용을 처리합니다.
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);

  // querystring 모듈을 불러와서 querystring 변수에 저장합니다.
  // 이 모듈은 URL 쿼리 문자열을 처리하는 데 사용됩니다.
  const querystring = require("querystring");

  // MongoDB 인스턴스를 생성하여 selfCoreMongo 변수에 저장합니다.
  // 이 인스턴스는 메인 데이터베이스와의 연결을 관리합니다.
  const selfCoreMongo = new mongo(mongoinfo);

  // MongoDB 인스턴스를 생성하여 selfContentsMongo 변수에 저장합니다.
  // 이 인스턴스는 콘텐츠 데이터베이스와의 연결을 관리합니다.
  const selfContentsMongo = new mongo(mongocontentsinfo);

  // LogReport 클래스에서 전달된 mongo 인스턴스를 selfMongo 변수에 저장합니다.
  // 이 인스턴스는 로그 데이터베이스와의 연결을 관리합니다.
  const selfMongo = this.mongo;
  try {
    // GoogleSheet 클래스의 인스턴스를 생성하여 sheets 변수에 저장합니다.
    // 이 인스턴스는 구글 시트와의 상호작용을 처리합니다.
    const sheets = new GoogleSheet();

    // GoogleAnalytics 클래스의 인스턴스를 생성하여 analytics 변수에 저장합니다.
    // 이 인스턴스는 구글 애널리틱스와의 상호작용을 처리합니다.
    const analytics = new GoogleAnalytics();

    // 오늘 날짜를 나타내는 Date 객체를 생성하여 today 변수에 저장합니다.
    const today = new Date();

    // 어제 날짜를 나타내는 Date 객체를 생성하여 yesterday 변수에 저장합니다.
    const yesterday = new Date();
    
    // 어제 날짜를 계산하기 위해 yesterday 변수에 1일을 빼줍니다.
    yesterday.setDate(yesterday.getDate() - 1);

    // 보고서의 시작 날짜를 나타내는 Date 객체를 생성하여 startDay 변수에 저장합니다.
    // 이 예제에서는 2023년 4월 1일로 설정됩니다.
    const startDay = new Date(2023, 3, 1);

    // sixthTypeArr 배열은 시트 데이터의 각 열이 어떤 데이터 유형을 가지는지를 나타냅니다.
    // 문자열은 "string"으로, 숫자는 "number"로 표시됩니다.
    const sixthTypeArr = [
        "string",  // 첫 번째 열은 문자열 타입입니다.
        "string",  // 두 번째 열은 문자열 타입입니다.
        "string",  // 세 번째 열은 문자열 타입입니다.
        "string",  // 네 번째 열은 문자열 타입입니다.
        "string",  // 다섯 번째 열은 문자열 타입입니다.
        "string",  // 여섯 번째 열은 문자열 타입입니다.
        "string",  // 일곱 번째 열은 문자열 타입입니다.
        "string",  // 여덟 번째 열은 문자열 타입입니다.
        "string",  // 아홉 번째 열은 문자열 타입입니다.
        "string",  // 열 번째 열은 문자열 타입입니다.
        "string",  // 열한 번째 열은 문자열 타입입니다.
        "string",  // 열두 번째 열은 문자열 타입입니다.
        "number",  // 열세 번째 열은 숫자 타입입니다.
        "string",  // 열네 번째 열은 문자열 타입입니다.
        "string",  // 열다섯 번째 열은 문자열 타입입니다.
        "string",  // 열여섯 번째 열은 문자열 타입입니다.
        "string",  // 열일곱 번째 열은 문자열 타입입니다.
        "string",  // 열여덟 번째 열은 문자열 타입입니다.
        "string",  // 열아홉 번째 열은 문자열 타입입니다.
        "string",  // 스무 번째 열은 문자열 타입입니다.
        "string",  // 스물한 번째 열은 문자열 타입입니다.
        "string",  // 스물두 번째 열은 문자열 타입입니다.
        "number",  // 스물세 번째 열은 숫자 타입입니다.
        "string",  // 스물네 번째 열은 문자열 타입입니다.
    ];

    /**
     * applyUpdate 함수는 주어진 데이터 행렬(newMatrix)을 시트에 적용하는 기능을 담당합니다.
     * @param {string} sheetsId - 업데이트할 구글 시트의 ID입니다.
     * @param {Array} newMatrix - 시트에 적용할 데이터 행렬입니다.
     * @param {boolean} [monthVersion=false] - 월별 데이터를 처리할지 여부를 나타냅니다.
     * @returns {Promise<Array|null>} 업데이트된 데이터 행렬을 반환합니다.
     */
    const applyUpdate = async (sheetsId, newMatrix, monthVersion = false) => {
        /**
         * typePatch 함수는 데이터 행의 각 요소를 올바른 데이터 유형으로 변환합니다.
         * @param {Array} typeArr - 각 열의 데이터 유형을 나타내는 배열입니다.
         * @returns {function} 배열과 인덱스를 받아 변환된 배열을 반환하는 함수입니다.
         */
        const typePatch = (typeArr) => {
            return (arr, index) => {
                let newArr;
                if (index === 0) {
                    // 첫 번째 행은 헤더로, 그대로 반환합니다.
                    return arr;
                } else {
                    newArr = new Array(arr.length);
                    for (let i = 0; i < arr.length; i++) {
                        if (typeArr[i] === "string") {
                            // 열이 문자열 타입인 경우, 그대로 추가합니다.
                            newArr[i] = arr[i];
                        } else if (typeArr[i] === "number") {
                            // 열이 숫자 타입인 경우, 숫자로 변환하여 추가합니다.
                            newArr[i] = Number(arr[i].replace(/[^0-9\.\-]/gi, ''));
                        } else {
                            newArr[i] = arr[i];
                        }
                    }
                    return newArr;
                }
            };
        };

        /**
         * returnFinalArr 함수는 시트에서 과거 데이터를 가져와서 새로운 데이터와 결합한 후 최종 배열을 반환합니다.
         * @param {string} sheetsId - 구글 시트의 ID입니다.
         * @param {Array} newMatrix - 결합할 새로운 데이터 행렬입니다.
         * @param {boolean} [monthVersion=false] - 월별 데이터를 처리할지 여부를 나타냅니다.
         * @returns {Promise<Array|null>} 최종 결합된 배열을 반환합니다.
         */
        const returnFinalArr = async (sheetsId, newMatrix, monthVersion = false) => {
            try {
                let pastValues, sliceIndexFirst, lastDateNumbers;
                if (newMatrix.length > 1) {
                    // 시트에서 과거 데이터를 가져옵니다.
                    pastValues = (await sheets.get_value_inPython(sheetsId, "A1:" + sheets.abc[newMatrix[0].length]))
                        .map(typePatch(newMatrix[1].map((o) => { return (typeof o); })));

                    // 새로운 데이터의 마지막 날짜와 일치하는 행의 인덱스를 찾습니다.
                    sliceIndexFirst = pastValues.findIndex((arr) => {
                        return arr[0] === newMatrix[newMatrix.length - 1][0];
                    });

                    if (sliceIndexFirst === -1) {
                        sliceIndexFirst = 1;
                        lastDateNumbers = 0;
                    } else {
                        lastDateNumbers = pastValues.filter((arr) => {
                            return arr[0] === newMatrix[newMatrix.length - 1][0];
                        }).length;
                    }

                    // 과거 데이터를 새로운 데이터에 결합하여 반환합니다.
                    return newMatrix.concat(pastValues.slice(sliceIndexFirst + lastDateNumbers));
                } else {
                    return null;
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        };

        try {
            // 최종 배열을 반환하여 시트에 업데이트합니다.
            const finalArr = await returnFinalArr(sheetsId, newMatrix);
            if (finalArr !== null) {
                await sheets.update_value_inPython(sheetsId, "", finalArr);
                return finalArr;
            } else {
                // 시트에서 데이터를 가져와서 형식을 맞추어 반환합니다.
                return (await sheets.get_value_inPython(sheetsId, "A1:" + sheets.abc[newMatrix[0].length])).map(typePatch(sixthTypeArr));
            }
        } catch (e) {
            console.log(e);
        }
    };

    // 슬랙 메시지를 저장할 변수를 선언합니다.
    let slackMessage;

    // selfCoreMongo 인스턴스와의 연결을 시작합니다.
    await selfCoreMongo.connect();

    // selfContentsMongo 인스턴스와의 연결을 시작합니다.
    await selfContentsMongo.connect();

    /**
     * marketingBasicMatrix 함수는 마케팅 데이터를 수집하고 다양한 분석을 통해
     * 각 채널의 성과를 평가하기 위한 매트릭스를 생성하는 함수입니다.
     *
     * @param {Date} startDate - 분석을 시작할 기준 날짜.
     */
    const marketingBasicMatrix = async (startDate) => {
      try {
        // 시작 날짜의 연도, 월, 일을 기반으로 새로운 Date 객체를 생성합니다.
        const queryStandardDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        // MongoDB에서 모든 클라이언트 데이터를 가져옵니다.
        // selfMongo는 로그 보고서에서 사용되는 MongoDB 인스턴스입니다.
        const clients = await back.getClientsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });

        // MongoDB에서 모든 프로젝트 데이터를 가져옵니다.
        const projects = await back.getProjectsByQuery({}, { selfMongo: selfCoreMongo, withTools: true });

        // 각 클라이언트의 히스토리 데이터를 가져옵니다.
        // requestSystem은 HTTP 요청을 보내는 메서드이며, 이 경우 클라이언트의 히스토리 데이터를 가져오기 위해 사용됩니다.
        // 요청 URL은 officeinfo.host를 기반으로 합니다.
        const clientHistories = (await requestSystem("https://" + address.officeinfo.host + ":3002/getHistoryProperty", {
          idArr: clients.toNormal().map((obj) => { return obj.cliid }), // 클라이언트 ID 목록을 가져옵니다.
          property: "curation", // 가져올 속성은 'curation'입니다.
          method: "client", // 메서드는 'client'로 지정합니다.
        }, { headers: { "Content-Type": "application/json" } })).data; // 요청 헤더로 'Content-Type: application/json'을 설정합니다.

        /**
         * 마케팅 데이터를 MongoDB에서 읽어와 필터링하여 사용하기 위한 함수들 및 조건들을 정의합니다.
         * 이 함수들은 특정 날짜 이후의 마케팅 데이터를 가져오고, 각 캠페인 플랫폼을 식별하는데 사용됩니다.
         */

        // MongoDB에서 'dailyCampaign' 컬렉션에서 기준 날짜 이후의 캠페인 데이터를 읽어옵니다.
        // 기준 날짜는 queryStandardDate로 설정되어 있으며, selfMongo 인스턴스를 사용하여 MongoDB에 접근합니다.
        const campaignEntireRows = await back.mongoRead("dailyCampaign", { "date.from": { $gte: queryStandardDate } }, { selfMongo });

        // MongoDB에서 'dailyAspirantCampaign' 컬렉션에서 기준 날짜 이후의 디자이너 신청자 모객 캠페인 데이터를 읽어옵니다.
        const campaignAspirantEntireRows = await back.mongoRead("dailyAspirantCampaign", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        
        // MongoDB에서 'dailyAnalytics' 컬렉션에서 기준 날짜 이후의 분석 데이터를 읽어옵니다.
        const analyticsEntireRows = await back.mongoRead("dailyAnalytics", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        
        // MongoDB에서 'dailyClients' 컬렉션에서 기준 날짜 이후의 클라이언트 데이터를 읽어옵니다.
        const clientsEntireRows = await back.mongoRead("dailyClients", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        
        // MongoDB에서 'metaComplex' 컬렉션에서 기준 날짜 이후의 메타 데이터를 읽어옵니다.
        // selfContentsMongo 인스턴스를 사용하여 MongoDB에 접근합니다.
        const metaComplexRows = await back.mongoRead("metaComplex", { "date.from": { $gte: queryStandardDate } }, { selfMongo: selfContentsMongo });
        
        // MongoDB에서 'googleComplex' 컬렉션에서 기준 날짜 이후의 구글 데이터를 읽어옵니다.
        // selfContentsMongo 인스턴스를 사용하여 MongoDB에 접근합니다.
        const googleComplexRows = await back.mongoRead("googleComplex", { "date.from": { $gte: queryStandardDate } }, { selfMongo: selfContentsMongo });
        
        /**
          * 특정 문자열이 페이스북 또는 인스타그램 관련 캠페인인지 확인하는 함수입니다.
          * @param {string} str - 캠페인 이름 또는 관련 정보.
          * @returns {boolean} 페이스북, 인스타그램, 메타 관련 캠페인 여부.
          */
        const facebookCampaignBoo = (str) => {
          // 문자열이 'instagram', 'facebook', 'meta'를 포함하는지 정규식을 통해 확인합니다.
          return (/instagram/gi.test(str) || /facebook/gi.test(str) || /meta/gi.test(str));
        }
        
        /**
          * 특정 문자열이 네이버 광고 캠페인인지 확인하는 함수입니다.
          * @param {string} str - 캠페인 이름 또는 관련 정보.
          * @returns {boolean} 네이버 광고 캠페인 여부.
          */
        const naverCampaignBoo = (str) => {
          // 문자열이 'naver'를 포함하고 'organic' 또는 'referral'을 포함하지 않는지 정규식을 통해 확인합니다.
          return (/naver/gi.test(str)) && !(/organic/gi.test(str) || /referral/gi.test(str));
        }
        
        /**
          * 특정 문자열이 구글 또는 유튜브 광고 캠페인인지 확인하는 함수입니다.
          * @param {string} str - 캠페인 이름 또는 관련 정보.
          * @returns {boolean} 구글 또는 유튜브 광고 캠페인 여부.
          */
        const googleCampaignBoo = (str) => {
          // 문자열이 'google' 또는 'youtube'를 포함하는지 정규식을 통해 확인합니다.
          return (/google/gi.test(str) || /youtube/gi.test(str));
        }
        
        /**
          * 특정 문자열이 카카오 광고 캠페인인지 확인하는 함수입니다.
          * @param {string} str - 캠페인 이름 또는 관련 정보.
          * @returns {boolean} 카카오 광고 캠페인 여부.
          */
        const kakaoCampaignBoo = (str) => {
          // 문자열이 'kakao'를 포함하는지 정규식을 통해 확인합니다.
          return (/kakao/gi.test(str));
        }

        /**
         * 주어진 날짜에 대한 다양한 마케팅 데이터를 수집하고 보고서 형태로 가공하는 함수입니다.
         * @param {Date} targetDate - 보고서를 생성할 목표 날짜입니다.
         * @param {Array} campaignEntireRows - 주어진 날짜 이후의 모든 캠페인 데이터입니다.
         * @param {Array} campaignAspirantEntireRows - 주어진 날짜 이후의 모든 아스피란트 캠페인 데이터입니다.
         * @param {Array} analyticsEntireRows - 주어진 날짜 이후의 모든 분석 데이터입니다.
         * @param {Array} clientsEntireRows - 주어진 날짜 이후의 모든 클라이언트 데이터입니다.
         * @param {Object} clients - 클라이언트 관련 메서드를 포함한 객체입니다.
         * @param {Object} projects - 프로젝트 관련 데이터를 포함한 객체입니다.
         * @param {Object} clientHistories - 클라이언트 히스토리 데이터를 포함한 객체입니다.
         * @param {Array} metaComplexRows - 주어진 날짜 이후의 메타 데이터입니다.
         * @param {Array} googleComplexRows - 주어진 날짜 이후의 구글 데이터입니다.
         * @returns {Array|null} 여러 형태의 마케팅 데이터를 가공한 결과 배열 또는 에러 발생 시 null 반환.
         */
        const getReportsByDate = async (
          targetDate,
          campaignEntireRows,
          campaignAspirantEntireRows,
          analyticsEntireRows,
          clientsEntireRows,
          clients,
          projects,
          clientHistories,
          metaComplexRows,
          googleComplexRows
        ) => {
          try {
            // 주어진 날짜를 기반으로 키 값을 생성하는 함수를 정의합니다.
            const keyMaker = (date) => {
              // 캠페인 데이터에서 사용할 키를 생성합니다.
              const keyRegMaker = (date) => {
                return `${String(date.getFullYear())}${zeroAddition(
                  date.getMonth() + 1
                )}${zeroAddition(date.getDate())}_`;
              };
              // 분석 데이터에서 사용할 ID를 생성합니다.
              const analyticsIdMaker = (date) => {
                return `n${String(date.getFullYear()).slice(2)}${zeroAddition(
                  date.getMonth() + 1
                )}_aa${zeroAddition(date.getDate())}s`;
              };
              // 클라이언트 데이터에서 사용할 ID를 생성합니다.
              const clientsIdMaker = (date) => {
                return `y${String(date.getFullYear()).slice(2)}${zeroAddition(
                  date.getMonth() + 1
                )}_aa${zeroAddition(date.getDate())}s`;
              };
              // 메타 데이터에서 사용할 키를 생성합니다.
              const metaKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, "") + "_meta";
              };
              // 구글 데이터에서 사용할 키를 생성합니다.
              const googleKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, "") + "_google";
              };
              // 카카오 데이터에서 사용할 키를 생성합니다.
              const kakaoKeyMaker = (date) => {
                return dateToString(date).replace(/[^0-9]/gi, "") + "_kakao";
              };
              // 각 데이터를 위한 키를 객체로 반환합니다.
              return {
                campaign: keyRegMaker(date),
                analytics: analyticsIdMaker(date),
                clients: clientsIdMaker(date),
                meta: metaKeyMaker(date),
                google: googleKeyMaker(date),
                kakao: kakaoKeyMaker(date),
              };
            };

            // 생성된 키를 활용하여 필요한 데이터의 키 값을 정의합니다.
            const {
              campaign: campaignKey,
              analytics: analyticsKey,
              clients: clientsKey,
              meta: metaKey,
              google: googleKey,
              kakao: kakaoKey,
            } = keyMaker(targetDate);

            // 클라이언트로부터 요청 데이터를 가져옵니다.
            const requests = clients.getRequestsTong();

            // 다양한 변수를 선언하여 이후 데이터 처리를 위해 사용합니다.
            let campaignRows, analyticsRows, clientsRows;
            let campaignCharge, campaignImpressions, campaignClicks;
            let totalUsers, pageViews;
            let consultingViews;
            let popupOpenEvents;
            let from, to;
            let requestsNumber;
            let contractsNumber;
            let facebookRows;
            let facebookCharge;
            let facebookReach;
            let facebookImpressions;
            let facebookClicks;
            let facebookFromUsers;
            let facebookFromClicks;
            let facebookFromPopups;
            let facebookFromSubmit;
            let naverRows;
            let naverCharge;
            let naverImpressions;
            let naverClicks;
            let naverFromUsers;
            let naverFromClicks;
            let naverFromPopups;
            let naverFromSubmit;
            let firstMatrix;
            let secondMatrix;
            let thirdMatrix;
            let fourthMatrix;
            let facebookCtr;
            let facebookCpc;
            let facebookClicksConverting;
            let facebookSubmitChargeConverting;
            let facebookSubmitConverting;
            let facebookClicksChargeConverting;
            let naverCtr;
            let naverCpc;
            let naverClicksConverting;
            let naverSubmitChargeConverting;
            let naverSubmitConverting;
            let naverClicksChargeConverting;
            let fifthMatrix;
            let fifthMatrixFactorArr;
            let sixthMatrix;
            let googleRows;
            let googleCharge;
            let googleImpressions;
            let googleClicks;
            let googleFromUsers;
            let googleFromClicks;
            let googleFromPopups;
            let googleFromSubmit;
            let googleCtr;
            let googleCpc;
            let googleClicksConverting;
            let googleClicksChargeConverting;
            let googleSubmitConverting;
            let googleSubmitChargeConverting;
            let seventhMatrix;
            let firstNewMatrix;
            let snsMatrix;
            let thisMeta, thisGoogle, thisKakao;
            let kakaoRows;
            let kakaoCharge;
            let kakaoImpressions;
            let kakaoClicks;
            let kakaoFromUsers;
            let kakaoFromClicks;
            let kakaoFromPopups;
            let kakaoFromSubmit;
            let kakaoCtr;
            let kakaoCpc;
            let kakaoClicksConverting;
            let kakaoClicksChargeConverting;
            let kakaoSubmitConverting;
            let kakaoSubmitChargeConverting;
            let kakaoMatrix;
            let campaignAspirantRows;
            let facebookAspirantRows;
            let facebookAspirantCharge;
            let facebookAspirantReach;
            let facebookAspirantImpressions;
            let facebookAspirantClicks;

            // from과 to 변수를 현재 날짜를 기준으로 초기화합니다.
            from = new Date(
              targetDate.getFullYear(),
              targetDate.getMonth(),
              targetDate.getDate()
            );
            to = new Date(
              targetDate.getFullYear(),
              targetDate.getMonth(),
              targetDate.getDate()
            );
            // to 날짜를 하루 뒤로 설정하여 범위를 설정합니다.
            to.setDate(to.getDate() + 1);

            // get data

            /**
             * 주어진 날짜에 맞는 캠페인, 아스피란트 캠페인, 분석 및 클라이언트 데이터를 필터링합니다.
             */
            campaignRows = campaignEntireRows.filter((obj) => {
              // 캠페인 키와 일치하는 키를 가진 객체들을 필터링합니다.
              return new RegExp("^" + campaignKey).test(obj.key);
            });

            campaignAspirantRows = campaignAspirantEntireRows.filter((obj) => {
              // 캠페인 아스피란트 키와 일치하는 키를 가진 객체들을 필터링합니다.
              return new RegExp("^" + campaignKey).test(obj.key);
            });

            analyticsRows = analyticsEntireRows.find((obj) => {
              // 분석 데이터 중에서 해당 분석 ID와 일치하는 데이터를 찾습니다.
              return obj.anaid === analyticsKey;
            });

            clientsRows = clientsEntireRows.find((obj) => {
              // 클라이언트 데이터 중에서 해당 클라이언트 ID와 일치하는 데이터를 찾습니다.
              return obj.ancid === clientsKey;
            });

            // 만약 분석 데이터나 클라이언트 데이터가 없을 경우, 오류를 출력하고 null을 반환합니다.
            if (analyticsRows === undefined || clientsRows === undefined) {
              console.log(analyticsKey, clientsKey);
              return null;
            }

            // 메타 데이터에서 해당 키와 일치하는 객체를 찾습니다.
            thisMeta = metaComplexRows.find((obj) => {
              return obj.key === metaKey;
            });

            // 구글 데이터에서 해당 키와 일치하는 객체를 찾습니다.
            thisGoogle = googleComplexRows.find((obj) => {
              return obj.key === googleKey;
            });

            /**
             * 1 - Total Funnel 섹션의 데이터를 계산합니다.
             */

            // 캠페인 데이터에서 총 비용을 계산합니다.
            campaignCharge = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.charge;
            }, 0);

            // 캠페인 데이터에서 총 노출 수를 계산합니다.
            campaignImpressions = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.performance.impressions;
            }, 0);

            // 캠페인 데이터에서 총 클릭 수를 계산합니다.
            campaignClicks = campaignRows.reduce((acc, curr) => {
              return acc + curr.value.performance.clicks;
            }, 0);

            // 전체 사용자 수를 분석 데이터에서 가져옵니다.
            totalUsers = analyticsRows.data.users.total;

            // 전체 페이지 조회 수를 분석 데이터에서 가져옵니다.
            pageViews = analyticsRows.data.views.total;

            // 컨설팅 페이지 조회 수를 필터링하여 계산합니다.
            consultingViews = analyticsRows.data.views.detail.pagePath.cases
              .filter((obj) => {
                // 페이지 경로가 consulting.php와 일치하는 경우를 찾습니다.
                return /consulting\.php/gi.test(obj.case);
              })
              .reduce((acc, curr) => {
                // 해당 조회 수를 합산합니다.
                return acc + curr.value;
              }, 0);

            // 팝업 열기 이벤트 수를 필터링하여 계산합니다.
            popupOpenEvents = analyticsRows.data.events.detail.eventName.cases
              .filter((obj) => {
                // 이벤트 이름이 popupOpen과 일치하는 경우를 찾습니다.
                return /popupOpen/gi.test(obj.case);
              })
              .reduce((acc, curr) => {
                // 해당 이벤트 수를 합산합니다.
                return acc + curr.value;
              }, 0);

            // 요청 데이터에서 주어진 날짜에 해당하는 요청 수를 계산합니다.
            requestsNumber = requests.filter(({ request }) => {
              const thisValue = request.timeline.toNormal().valueOf();
              // 요청 시간 범위가 주어진 날짜 내에 있는 경우를 필터링합니다.
              return thisValue >= from.valueOf() && thisValue < to.valueOf();
            }).length;

            // 프로젝트 데이터에서 주어진 날짜에 해당하는 계약 수를 계산합니다.
            contractsNumber = projects.toNormal().filter(({ process }) => {
              const thisValue = process.contract.first.date.valueOf();
              // 계약 날짜가 주어진 날짜 내에 있는 경우를 필터링합니다.
              return thisValue >= from.valueOf() && thisValue < to.valueOf();
            }).length;

            // Total Funnel 데이터를 배열 형태로 정리합니다.
            firstMatrix = [
              [
                dateToString(targetDate), // 대상 날짜
                campaignCharge, // 총 캠페인 비용
                campaignImpressions, // 총 노출 수
                campaignClicks, // 총 클릭 수
                totalUsers, // 전체 사용자 수
                pageViews, // 전체 페이지 조회 수
                consultingViews, // 컨설팅 페이지 조회 수
                popupOpenEvents, // 팝업 열기 이벤트 수
                requestsNumber, // 요청 수
                contractsNumber, // 계약 수
              ],
            ];

            // 1-2 - new front values
            /**
             * 새로운 프론트 값들을 계산하여 firstNewMatrix 배열에 저장합니다.
             */
            firstNewMatrix = [
              [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                totalUsers, // 전체 사용자 수를 저장합니다.
                pageViews, // 전체 페이지 조회 수를 저장합니다.
                analyticsRows.data.conversion.consultingPage.total, // 컨설팅 페이지 전환 총합을 저장합니다.
                analyticsRows.data.conversion.popupOpen.total, // 팝업 열기 전환 총합을 저장합니다.
                analyticsRows.data.conversion.consultingPage.total + analyticsRows.data.conversion.popupOpen.total, // 컨설팅 페이지와 팝업 열기 전환의 총합을 저장합니다.
                requestsNumber, // 요청 수를 저장합니다.
                contractsNumber, // 계약 수를 저장합니다.
                
                // organic 캠페인에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.campaign.cases
                  .filter((c) => c.case === "(organic)")
                  .reduce((acc, curr) => acc + curr.value, 0),
                  
                // direct, organic, referral, (not set)이 아닌 캠페인에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      !/^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0),
                
                // link 캠페인에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      /^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0),
                
                // 전체 조회 수에서 organic 및 필터링된 조회 수를 제외한 값을 계산하여 저장합니다.
                analyticsRows.data.views.total -
                analyticsRows.data.views.detail.campaign.cases
                  .filter((c) => c.case === "(organic)")
                  .reduce((acc, curr) => acc + curr.value, 0) -
                analyticsRows.data.views.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)"
                  )
                  .reduce((acc, curr) => acc + curr.value, 0),

                // Naver 소스에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.source.cases
                  .filter((c) => /naver/gi.test(c.case))
                  .reduce((acc, curr) => acc + curr.value, 0),

                // Instagram, Facebook, Meta 소스에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.source.cases
                  .filter((c) => /instagram/gi.test(c.case) || /facebook/gi.test(c.case) || /meta/gi.test(c.case))
                  .reduce((acc, curr) => acc + curr.value, 0),

                // Google, YouTube 소스에서 발생한 조회 수를 필터링하여 합산합니다.
                analyticsRows.data.views.detail.source.cases
                  .filter((c) => /google/gi.test(c.case) || /youtube/gi.test(c.case))
                  .reduce((acc, curr) => acc + curr.value, 0),

                // Organic 캠페인에서 발생한 컨설팅 페이지와 팝업 열기 전환 총합을 계산하여 합산합니다.
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases
                  .filter((c) => c.case === "(organic)")
                  .reduce((acc, curr) => acc + curr.value, 0) +
                analyticsRows.data.conversion.popupOpen.detail.campaign.cases
                  .filter((c) => c.case === "(organic)")
                  .reduce((acc, curr) => acc + curr.value, 0)),

                // Direct, organic, referral, (not set)이 아닌 캠페인에서 발생한 컨설팅 페이지와 팝업 열기 전환을 필터링하여 합산합니다.
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      !/^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0) +
                analyticsRows.data.conversion.popupOpen.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      !/^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0)),

                // Link 캠페인에서 발생한 컨설팅 페이지와 팝업 열기 전환을 필터링하여 합산합니다.
                (analyticsRows.data.conversion.consultingPage.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      /^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0) +
                analyticsRows.data.conversion.popupOpen.detail.campaign.cases
                  .filter(
                    (c) =>
                      c.case !== "(direct)" &&
                      c.case !== "(organic)" &&
                      c.case !== "(referral)" &&
                      c.case !== "(not set)" &&
                      /^link/.test(c.case)
                  )
                  .reduce((acc, curr) => acc + curr.value, 0)),

                // 총 전환 수에서 organic과 direct, referral 등을 제외한 값을 계산하여 저장합니다.
                (analyticsRows.data.conversion.consultingPage.total + 
                  analyticsRows.data.conversion.popupOpen.total) - 
                  (analyticsRows.data.conversion.consultingPage.detail.campaign.cases
                    .filter((c) => c.case === "(organic)")
                    .reduce((acc, curr) => acc + curr.value, 0) + 
                  analyticsRows.data.conversion.popupOpen.detail.campaign.cases
                    .filter((c) => c.case === "(organic)")
                    .reduce((acc, curr) => acc + curr.value, 0)) -
                  (analyticsRows.data.conversion.consultingPage.detail.campaign.cases
                    .filter(
                      (c) =>
                        c.case !== "(direct)" &&
                        c.case !== "(organic)" &&
                        c.case !== "(referral)" &&
                        c.case !== "(not set)"
                    )
                    .reduce((acc, curr) => acc + curr.value, 0) + 
                  analyticsRows.data.conversion.popupOpen.detail.campaign.cases
                    .filter(
                      (c) =>
                        c.case !== "(direct)" &&
                        c.case !== "(organic)" &&
                        c.case !== "(referral)" &&
                        c.case !== "(not set)"
                    )
                    .reduce((acc, curr) => acc + curr.value, 0)),
              ]
            ];

            // 2 - facebook
            /**
             * Facebook 관련 데이터를 처리하고 분석하여 secondMatrix 배열에 저장합니다.
             */

            // Facebook과 Meta, Instagram과 관련된 캠페인 데이터를 필터링하여 facebookRows 배열에 저장합니다.
            facebookRows = campaignRows.filter((obj) => {
              return /facebook/gi.test(obj.information.mother) || /meta/gi.test(obj.information.mother) || /instagram/gi.test(obj.information.mother);
            });

            // 필터링된 facebookRows 배열이 비어 있지 않은 경우, 해당 데이터를 사용해 요약 정보를 계산합니다.
            if (facebookRows.length > 0) {
              facebookCharge = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.charge; // 캠페인 비용(Charge)을 합산합니다.
              }, 0);
              facebookReach = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.reach; // 캠페인 도달수(Reach)를 합산합니다.
              }, 0);
              facebookImpressions = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions; // 캠페인 노출수(Impressions)를 합산합니다.
              }, 0);
              facebookClicks = facebookRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks; // 캠페인 클릭수(Clicks)를 합산합니다.
              }, 0);
            } else {
              // facebookRows가 비어 있으면 모든 요약 정보는 0으로 설정됩니다.
              facebookCharge = 0;
              facebookReach = 0;
              facebookImpressions = 0;
              facebookClicks = 0;
            }

            // Facebook, Meta, Instagram과 관련된 디자이너 신청자(aspirant) 캠페인 데이터를 필터링하여 facebookAspirantRows 배열에 저장합니다.
            facebookAspirantRows = campaignAspirantRows.filter((obj) => {
              return /facebook/gi.test(obj.information.mother) || /meta/gi.test(obj.information.mother) || /instagram/gi.test(obj.information.mother);
            });

            // 필터링된 facebookAspirantRows 배열이 비어 있지 않은 경우, 해당 데이터를 사용해 요약 정보를 계산합니다.
            if (facebookAspirantRows.length > 0) {
              facebookAspirantCharge = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.charge; // 디자이너 신청자 캠페인의 비용(Charge)을 합산합니다.
              }, 0);
              facebookAspirantReach = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.reach; // 디자이너 신청자 캠페인의 도달수(Reach)를 합산합니다.
              }, 0);
              facebookAspirantImpressions = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions; // 디자이너 신청자 캠페인의 노출수(Impressions)를 합산합니다.
              }, 0);
              facebookAspirantClicks = facebookAspirantRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks; // 디자이너 신청자 캠페인의 클릭수(Clicks)를 합산합니다.
              }, 0);
            } else {
              // facebookAspirantRows가 비어 있으면 모든 요약 정보는 0으로 설정됩니다.
              facebookAspirantCharge = 0;
              facebookAspirantReach = 0;
              facebookAspirantImpressions = 0;
              facebookAspirantClicks = 0;
            }

            // Analytics 데이터에서 Facebook 관련 사용자 수를 필터링하고 합산하여 facebookFromUsers에 저장합니다.
            facebookFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Analytics 데이터에서 Facebook 관련 전환 클릭 수를 필터링하고 합산하여 facebookFromClicks에 저장합니다.
            facebookFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Analytics 데이터에서 Facebook 관련 팝업 오픈 수를 필터링하고 합산하여 facebookFromPopups에 저장합니다.
            facebookFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return facebookCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Clients 데이터에서 Facebook 관련 제출 수를 필터링하여 facebookFromSubmit에 저장합니다.
            facebookFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  return obj.source.mother.some((c) => { return facebookCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            // Facebook 캠페인 CTR (클릭률) 계산
            facebookCtr = 0;
            facebookCpc = 0;
            facebookClicksConverting = 0;
            facebookClicksChargeConverting = 0;
            facebookSubmitConverting = 0;
            facebookSubmitChargeConverting = 0;

            // Facebook 캠페인 CTR (클릭률) 계산: 노출수 대비 클릭수 비율을 계산합니다.
            if (facebookImpressions !== 0) {
              facebookCtr = facebookClicks / facebookImpressions;
              facebookCtr = Math.floor(facebookCtr * 10000) / 10000; // 소수점 네 자리까지 표현합니다.
            }

            // CPC (클릭당 비용) 계산: 클릭당 비용을 계산합니다.
            if (facebookClicks !== 0) {
              facebookCpc = Math.round(facebookCharge / facebookClicks);
            }

            // 클릭 전환율 계산: Facebook에서 발생한 클릭이 실제 전환으로 이어진 비율을 계산합니다.
            if (facebookClicks !== 0) {
              facebookClicksConverting = (facebookFromClicks + facebookFromPopups) / facebookClicks;
              facebookClicksConverting = Math.floor(facebookClicksConverting * 10000) / 10000;
            }

            // 클릭당 전환 비용 계산: 클릭당 비용을 전환 수로 나누어 계산합니다.
            if (facebookFromClicks + facebookFromPopups !== 0) {
              facebookClicksChargeConverting = Math.round(facebookCharge / (facebookFromClicks + facebookFromPopups));
            }

            // 제출 전환율 계산: Facebook에서 발생한 제출이 실제 전환으로 이어진 비율을 계산합니다.
            if (facebookClicks !== 0) {
              facebookSubmitConverting = facebookFromSubmit / facebookClicks;
              facebookSubmitConverting = Math.floor(facebookSubmitConverting * 10000) / 10000;
            }

            // 제출당 전환 비용 계산: 제출당 비용을 전환 수로 나누어 계산합니다.
            if (facebookFromSubmit !== 0) {
              facebookSubmitChargeConverting = Math.round(facebookCharge / facebookFromSubmit);
            }

            // 계산된 Facebook 관련 데이터를 secondMatrix 배열에 저장합니다.
            secondMatrix = [
              [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                facebookCharge, // Facebook 캠페인에 사용된 총 비용을 저장합니다.
                facebookReach, // Facebook 캠페인 도달수(Reach)를 저장합니다.
                facebookImpressions, // Facebook 캠페인 노출수(Impressions)를 저장합니다.
                facebookClicks, // Facebook 캠페인 클릭수(Clicks)를 저장합니다.
                facebookFromUsers, // Facebook 소스에서 발생한 사용자 수를 저장합니다.
                facebookFromClicks, // Facebook 소스에서 발생한 전환 클릭 수를 저장합니다.
                facebookFromPopups, // Facebook 소스에서 발생한 팝업 오픈 수를 저장합니다.
                facebookFromSubmit, // Facebook 소스에서 발생한 제출 수를 저장합니다.
                facebookCtr, // Facebook 캠페인 CTR (클릭률)을 저장합니다.
                facebookCpc, // Facebook 캠페인 CPC (클릭당 비용)를 저장합니다.
                facebookClicksConverting, // Facebook 캠페인 클릭 전환율을 저장합니다.
                facebookClicksChargeConverting, // Facebook 캠페인 클릭당 전환 비용을 저장합니다.
                facebookSubmitConverting, // Facebook 캠페인 제출 전환율을 저장합니다.
                facebookSubmitChargeConverting, // Facebook 캠페인 제출당 전환 비용을 저장합니다.
                facebookAspirantCharge, // 디자이너 신청자 캠페인의 비용(Charge)을 저장합니다.
                facebookAspirantReach, // 디자이너 신청자 캠페인의 도달수(Reach)를 저장합니다.
                facebookAspirantImpressions, // 디자이너 신청자 캠페인의 노출수(Impressions)를 저장합니다.
                facebookAspirantClicks, // 디자이너 신청자 캠페인의 클릭수(Clicks)를 저장합니다.
              ]
            ];


            // 3 - naver
            /**
             * 네이버(Naver) 관련 데이터를 처리하고 분석하여 thirdMatrix 배열에 저장합니다.
             */

            // campaignRows 배열에서 Naver 관련 데이터를 필터링하여 naverRows 배열에 저장합니다.
            // 필터링 기준은 정보 객체의 mother 속성에 "naver"라는 단어가 포함된 캠페인입니다.
            naverRows = campaignRows.filter((obj) => {
              return /naver/gi.test(obj.information.mother);
            });

            // naverRows 배열에 데이터가 있는지 확인합니다.
            if (naverRows.length > 0) {
              // naverRows 배열에 데이터가 있는 경우, 해당 데이터를 사용해 비용, 노출수, 클릭수 정보를 합산합니다.
              
              // Naver 캠페인의 총 비용을 계산하여 naverCharge 변수에 저장합니다.
              naverCharge = naverRows.reduce((acc, curr) => {
                return acc + curr.value.charge;
              }, 0);
              
              // Naver 캠페인의 총 노출수를 계산하여 naverImpressions 변수에 저장합니다.
              naverImpressions = naverRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions;
              }, 0);
              
              // Naver 캠페인의 총 클릭수를 계산하여 naverClicks 변수에 저장합니다.
              naverClicks = naverRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks;
              }, 0);
            } else {
              // naverRows 배열이 비어 있는 경우, 모든 변수들을 0으로 초기화합니다.
              naverCharge = 0;
              naverImpressions = 0;
              naverClicks = 0;
            }

            // Analytics 데이터에서 Naver 관련 사용자 수를 필터링하고 합산하여 naverFromUsers에 저장합니다.
            naverFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Analytics 데이터에서 Naver 관련 전환 클릭 수를 필터링하고 합산하여 naverFromClicks에 저장합니다.
            naverFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Analytics 데이터에서 Naver 관련 팝업 오픈 수를 필터링하고 합산하여 naverFromPopups에 저장합니다.
            naverFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return naverCampaignBoo(obj.case);
            }).reduce((acc, curr) => {
              return acc + curr.value;
            }, 0);

            // Clients 데이터에서 Naver 관련 제출 수를 필터링하여 naverFromSubmit에 저장합니다.
            naverFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  // 'Mother' 메서드는 각 사용자가 어떤 소스에서 유입되었는지 확인하는 역할을 합니다.
                  // 여기서는 naverCampaignBoo 함수가 true를 반환하는지 검사합니다.
                  return obj.source.mother.some((c) => { return naverCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            // Naver 캠페인의 기본 전환율 계산을 위한 변수들을 초기화합니다.
            naverCtr = 0;
            naverCpc = 0;
            naverClicksConverting = 0;
            naverClicksChargeConverting = 0;
            naverSubmitConverting = 0;
            naverSubmitChargeConverting = 0;

            // Naver 캠페인의 클릭률(CTR)을 계산합니다.
            // 노출수(Impressions) 대비 클릭수(Clicks) 비율을 계산하여 naverCtr 변수에 저장합니다.
            if (naverImpressions !== 0) {
              naverCtr = naverClicks / naverImpressions;
              naverCtr = Math.floor(naverCtr * 10000) / 10000; // 소수점 네 자리까지 표현합니다.
            }

            // 클릭당 비용(CPC)을 계산합니다.
            // 총 비용을 클릭수로 나누어 계산하여 naverCpc 변수에 저장합니다.
            if (naverClicks !== 0) {
              naverCpc = Math.round(naverCharge / naverClicks);
            }

            // 클릭 전환율을 계산합니다.
            // 클릭수 대비 전환된 클릭 수를 계산하여 naverClicksConverting 변수에 저장합니다.
            if (naverClicks !== 0) {
              naverClicksConverting = (naverFromClicks + naverFromPopups) / naverClicks;
              naverClicksConverting = Math.floor(naverClicksConverting * 10000) / 10000;
            }

            // 클릭당 전환 비용을 계산합니다.
            // 총 비용을 전환된 클릭 수로 나누어 계산하여 naverClicksChargeConverting 변수에 저장합니다.
            if (naverFromClicks + naverFromPopups !== 0) {
              naverClicksChargeConverting = Math.round(naverCharge / (naverFromClicks + naverFromPopups));
            }

            // 제출 전환율을 계산합니다.
            // 클릭수 대비 제출된 비율을 계산하여 naverSubmitConverting 변수에 저장합니다.
            if (naverClicks !== 0) {
              naverSubmitConverting = naverFromSubmit / naverClicks;
              naverSubmitConverting = Math.floor(naverSubmitConverting * 10000) / 10000;
            }

            // 제출당 전환 비용을 계산합니다.
            // 총 비용을 제출 수로 나누어 계산하여 naverSubmitChargeConverting 변수에 저장합니다.
            if (naverFromSubmit !== 0) {
              naverSubmitChargeConverting = Math.round(naverCharge / naverFromSubmit);
            }

            // 계산된 Naver 관련 데이터를 thirdMatrix 배열에 저장합니다.
            thirdMatrix = [
              [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                naverCharge, // Naver 캠페인에 사용된 총 비용을 저장합니다.
                naverImpressions, // Naver 캠페인 노출수(Impressions)를 저장합니다.
                naverClicks, // Naver 캠페인 클릭수(Clicks)를 저장합니다.
                naverFromUsers, // Naver 소스에서 발생한 사용자 수를 저장합니다.
                naverFromClicks, // Naver 소스에서 발생한 전환 클릭 수를 저장합니다.
                naverFromPopups, // Naver 소스에서 발생한 팝업 오픈 수를 저장합니다.
                naverFromSubmit, // Naver 소스에서 발생한 제출 수를 저장합니다.
                naverCtr, // Naver 캠페인 CTR (클릭률)을 저장합니다.
                naverCpc, // Naver 캠페인 CPC (클릭당 비용)를 저장합니다.
                naverClicksConverting, // Naver 캠페인 클릭 전환율을 저장합니다.
                naverClicksChargeConverting, // Naver 캠페인 클릭당 전환 비용을 저장합니다.
                naverSubmitConverting, // Naver 캠페인 제출 전환율을 저장합니다.
                naverSubmitChargeConverting, // Naver 캠페인 제출당 전환 비용을 저장합니다.
              ]
            ];


            // 4 - clients
            /**
             * 홈리에종 인테리어 상담 고객에 대한 데이터를 처리하고 분석하여 fourthMatrix 배열에 저장합니다.
             */

            // clientsRows에서 고객 상세 데이터를 추출하여 새로운 배열 fourthMatrix를 만듭니다.
            // cliid는 고객 ID를 나타내며, users는 이 고객과 연관된 사용자들을 나타냅니다.
            // 사용자 ID들을 모아서 ids 문자열을 만듭니다.
            fourthMatrix = clientsRows.data.detail.map((obj) => {
              return { 
                cliid: obj.cliid, 
                users: obj.users, 
                ids: obj.users.map((user) => { 
                  return user === null ? "" : user.id 
                }).join(", ") 
              }
            });

            // 각 고객(cliid)에 대해 상세 정보를 추가로 처리합니다.
            fourthMatrix = fourthMatrix.map(({ cliid, users, ids }) => {
              // 고객 ID를 기반으로 해당 고객의 요청(request) 정보를 찾습니다.
              const targetRequest = requests.find((obj) => { return obj.cliid === cliid });

              // 고객 ID를 기반으로 해당 고객의 히스토리(history) 정보를 찾습니다.
              const targetHistory = clientHistories[cliid];

              // 만약 해당 고객의 히스토리가 존재하지 않는다면, 로그를 남깁니다.
              if (targetHistory === undefined) {
                errorLog("there is no history => " + cliid).catch((err) => { console.log(err); });
              }

              let returnType; // 고객이 신규인지 재방문인지 저장하는 변수입니다.
              let source, sourceArr; // 사용자의 유입 경로(source) 관련 정보를 저장할 변수입니다.
              let campaign, campaignArr; // 사용자의 캠페인(campaign) 관련 정보를 저장할 변수입니다.
              let device; // 사용자의 디바이스 정보를 저장할 변수입니다.
              let referrer, referrerArr; // 사용자가 유입된 referrer 정보를 저장할 변수입니다.
              let service; // 고객이 요청한 서비스 정보를 저장할 변수입니다.

              // 모든 사용자가 null이거나 'New' 타입이라면, 신규 방문으로 간주합니다.
              if (users.every((obj) => { return obj === null ? true : /^New/.test(obj.type); })) {
                returnType = "신규";
              } else {
                returnType = "재방문";
              }

              // 사용자의 유입 경로(mother) 정보를 추출합니다.
              sourceArr = users.map((obj) => { return obj.source.mother }).filter((arr) => { return arr.length > 0 });

              // 사용자의 캠페인 정보(campaign)를 추출합니다.
              campaignArr = users.map((obj) => { return obj.source.campaign }).filter((arr) => { return arr.length > 0 });

              // 유입 경로(source)가 존재하면, 이를 문자열로 결합합니다. 없으면 "(direct)"로 표시합니다.
              if (sourceArr.length > 0) {
                source = sourceArr.flat().join(", ");
              } else {
                source = "(direct)";
              }

              // 캠페인(campaign)이 존재하면, 이를 문자열로 결합합니다. 없으면 "(not set)"으로 표시합니다.
              if (campaignArr.length > 0) {
                campaign = campaignArr.flat().join(", ");
              } else {
                campaign = "(not set)";
              }

              // 첫 번째 사용자 정보를 사용하여 디바이스 정보를 설정합니다. 없으면 "(not set)"으로 표시합니다.
              if (users.length > 0) {
                device = users[0].device.kinds;
              } else {
                device = "(not set)";
              }

              // 사용자의 referrer 정보를 추출하여, 가장 긴 referrer를 선택합니다.
              try {
                referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
                referrerArr.sort((a, b) => { return b.length - a.length });
                if (referrerArr.length > 0) {
                  referrer = referrerArr[0];
                } else {
                  referrer = "(not set)";
                }
              } catch (e) {
                console.log(e);
                referrerArr = [];
                referrer = "(not set)";
              }

              // 고객의 요청한 서비스 정보를 추출합니다. serviceParsing 함수가 이를 처리합니다.
              try {
                if (targetHistory.service.serid.length > 0) {
                  service = serviceParsing(targetHistory.service.serid[0]);
                } else {
                  service = "알 수 없음";
                }
              } catch (e) {
                console.log(e);
                service = "알 수 없음";
              }

              // 고객 정보를 배열로 반환합니다.
              return [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                cliid, // 고객 ID를 저장합니다.
                targetRequest.name, // 고객의 이름(또는 요청의 이름)을 저장합니다.
                ids, // 이 고객과 관련된 사용자 ID들을 저장합니다.
                dateToString(targetRequest.request.timeline, true), // 요청의 타임라인을 저장합니다.
                returnType, // 고객이 신규인지 재방문인지를 저장합니다.
                source, // 유입 경로를 저장합니다.
                campaign, // 캠페인 정보를 저장합니다.
                device, // 사용된 디바이스 종류를 저장합니다.
                referrer, // 유입된 referrer 정보를 저장합니다.
                targetRequest.request.space.address.value, // 고객의 주소 정보를 저장합니다.
                targetRequest.request.space.pyeong.value, // 요청한 공간의 크기(평수)를 저장합니다.
                (targetRequest.request.space.resident.living ? "거주중" : "이사"), // 현재 거주 여부를 저장합니다.
                (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)), // 이사 예정일을 저장합니다.
                service, // 요청한 서비스 정보를 저장합니다.
              ];
            });


            // 5 - campaign
            /**
             * 캠페인 데이터를 처리하여 fifthMatrix 배열에 저장합니다.
             */

            // 빈 배열 fifthMatrix를 초기화합니다. 이 배열은 이후에 캠페인 데이터로 채워집니다.
            fifthMatrix = [];

            // campaignRows 배열을 순회하면서 각 캠페인 데이터에 대해 처리합니다.
            for (let campaignRow of campaignRows) {
              
              // 각 캠페인 데이터에 대해 처리 결과를 담을 배열을 초기화합니다.
              fifthMatrixFactorArr = [];

              // 대상 날짜를 문자열로 변환하여 배열에 추가합니다.
              fifthMatrixFactorArr.push(dateToString(targetDate));

              // 캠페인의 mother 정보(유입 경로)를 배열에 추가합니다.
              // 여기서 mother는 광고 캠페인이 속한 플랫폼을 나타내며, 이를 통해 특정 플랫폼(예: Facebook, Instagram)을 식별합니다.
              // /meta/gi.test(campaignRow.information.mother)를 통해 Meta와 관련된 정보인지 확인할 수 있습니다.
              fifthMatrixFactorArr.push(campaignRow.information.mother);

              // 캠페인의 타입(예: 광고 형식, 캠페인 종류)을 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.information.type);

              // 캠페인의 ID(광고 캠페인을 고유하게 식별하는 값)를 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.information.id.campaign);

              // 캠페인의 이름을 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.information.name);

              // 캠페인에 사용된 총 비용(Charge)을 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.value.charge);

              // 캠페인에 의해 발생한 총 노출 수(Impressions)를 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.value.performance.impressions);

              // 캠페인에 의해 발생한 총 클릭 수(Clicks)를 배열에 추가합니다.
              fifthMatrixFactorArr.push(campaignRow.value.performance.clicks);

              // 처리된 캠페인 데이터를 fifthMatrix 배열에 추가합니다.
              fifthMatrix.push(fifthMatrixFactorArr);
            }


            // 6 - contract
            /**
             * 계약 고객 데이터를 처리하여 sixthMatrix 배열에 저장합니다.
             */

            // clientsRows에서 각 고객의 ID와 사용자 정보를 매핑하여 새로운 배열을 생성합니다.
            sixthMatrix = clientsRows.data.detail.map((obj) => {
              return {
                cliid: obj.cliid, // 고객의 ID를 가져옵니다.
                users: obj.users, // 고객과 연관된 사용자 데이터를 가져옵니다.
                ids: obj.users.map((user) => {
                  // 각 사용자의 ID를 추출하여 콤마로 연결된 문자열로 만듭니다.
                  return user.id;
                }).join(", ")
              };
            });

            // 매핑된 데이터를 기반으로 각 고객에 대한 세부 정보를 포함하는 배열을 생성합니다.
            sixthMatrix = sixthMatrix.map(({ cliid, users, ids }) => {
              // 현재 고객과 관련된 요청 데이터를 가져옵니다.
              const targetRequest = requests.find((obj) => { return obj.cliid === cliid });
              
              // 현재 고객의 히스토리 데이터를 가져옵니다.
              const targetHistory = clientHistories[cliid];
              
              // 현재 고객과 관련된 모든 프로젝트를 가져옵니다.
              const targetProjects = projects.toNormal().filter((obj) => { return obj.cliid === cliid });
              
              let targetProject;
              let returnType;
              let source, sourceArr;
              let campaign, campaignArr;
              let device;
              let referrer, referrerArr;
              let service;
              let query;

              // 사용자의 모든 데이터가 신규인지 확인하여 신규 또는 재방문 고객 유형을 결정합니다.
              if (users.every((obj) => { return /^New/.test(obj.type); })) {
                returnType = "신규";
              } else {
                returnType = "재방문";
              }

              // 각 사용자의 유입 경로(mother) 데이터를 배열로 변환하고, 빈 배열이 아닌 것만 필터링합니다.
              sourceArr = users.map((obj) => { return obj.source.mother }).filter((arr) => { return arr.length > 0 });
              
              // 각 사용자의 캠페인 데이터를 배열로 변환하고, 빈 배열이 아닌 것만 필터링합니다.
              campaignArr = users.map((obj) => { return obj.source.campaign }).filter((arr) => { return arr.length > 0 });

              // 유입 경로 데이터가 있는 경우 이를 문자열로 결합하여 source 변수에 저장하고, 없을 경우 "(direct)"로 설정합니다.
              if (sourceArr.length > 0) {
                source = sourceArr.flat().join(", ");
              } else {
                source = "(direct)";
              }

              // 캠페인 데이터가 있는 경우 이를 문자열로 결합하여 campaign 변수에 저장하고, 없을 경우 "(not set)"으로 설정합니다.
              if (campaignArr.length > 0) {
                campaign = campaignArr.flat().join(", ");
              } else {
                campaign = "(not set)";
              }

              // 사용자 데이터가 있는 경우 첫 번째 사용자의 장치 종류를 device 변수에 저장하고, 없을 경우 "(not set)"으로 설정합니다.
              if (users.length > 0) {
                device = users[0].device.kinds;
              } else {
                device = "(not set)";
              }

              // 리퍼러 데이터를 가져와서 가장 긴 리퍼러를 referrer 변수에 저장합니다.
              try {
                referrerArr = users.map((obj) => { return obj.source.referrer }).flat();
                referrerArr.sort((a, b) => { return b.length - a.length });
                if (referrerArr.length > 0) {
                  referrer = referrerArr[0];
                } else {
                  referrer = "(not set)";
                }
              } catch (e) {
                console.log(e);
                referrerArr = [];
                referrer = "(not set)";
              }

              // 서비스 데이터를 가져와서 처리하며, 오류가 발생할 경우 "알 수 없음"으로 설정합니다.
              try {
                if (targetHistory.service.serid.length > 0) {
                  service = serviceParsing(targetHistory.service.serid[0]);
                } else {
                  service = "알 수 없음";
                }
              } catch (e) {
                console.log(e);
                service = "알 수 없음";
              }

              // 계약된 프로젝트 중 가장 최신의 것을 찾아 targetProject에 할당합니다.
              targetProject = targetProjects.find((obj) => {
                return obj.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
              });

              // 최신 프로젝트가 없는 경우 첫 번째 프로젝트를 할당합니다.
              if (targetProject === undefined && targetProjects.length > 0) {
                targetProject = targetProjects[0];
              }

              // 프로젝트가 여전히 없는 경우 null로 설정합니다.
              if (targetProject === undefined) {
                targetProject = null;
              }

              // 사용자의 히스토리와 리퍼러 데이터를 기반으로 검색 쿼리를 생성합니다.
              query = [];
              for (let user of users) {
                for (let { path } of user.history) {
                  query.push(path);
                }
                for (let str of user.source.referrer) {
                  query.push(str);
                }
              }

              // 쿼리 문자열에서 한글로 된 부분을 필터링하여 유일한 값만 남깁니다.
              query = query.filter((str) => { return /\?/gi.test(str); });
              query = query.map((str) => { return Object.values(querystring.parse(str.split("?")[1])) }).flat();
              query = [...new Set(query.filter((str) => { return /[가-힣ㄱ-ㅎㅏ-ㅣ]/gi.test(str) }))];

              // 최종적으로 데이터를 배열로 반환하여 sixthMatrix에 저장합니다.
              return [
                dateToString(targetDate), // 계약 날짜
                cliid, // 고객 ID
                targetRequest.name, // 고객 이름
                ids, // 사용자 ID 목록
                dateToString(targetRequest.request.timeline, true), // 요청된 타임라인
                targetProject === null ? "1800-01-01" : dateToString(targetProject.process.contract.first.date, true), // 계약 날짜
                returnType, // 신규 또는 재방문 여부
                source, // 유입 경로
                campaign, // 캠페인 정보
                device, // 사용된 장치 정보
                referrer, // 리퍼러 정보
                targetRequest.request.space.address.value, // 주소
                targetRequest.request.space.pyeong.value, // 면적 정보
                targetRequest.request.budget.value, // 예산 정보
                targetRequest.request.family.value, // 가족 구성 정보
                (targetRequest.request.space.resident.living ? "거주중" : "이사"), // 현재 거주 상태
                (targetRequest.request.space.resident.living ? "해당 없음" : dateToString(targetRequest.request.space.resident.expected)), // 예상 이사 날짜
                (targetRequest.request.space.partial.boo ? "부분 공간" : "전체 공간"), // 부분 공간 또는 전체 공간 여부
                targetProject === null ? "알 수 없음" : (targetProject.service.online ? "온라인" : "오프라인"), // 온라인/오프라인 여부
                service, // 제공된 서비스 정보
                targetProject === null ? "알 수 없음" : serviceParsing(targetProject.service.serid), // 서비스 ID
                targetRequest.request.etc.comment, // 기타 코멘트
                targetProject === null ? 0 : targetProject.process.contract.remain.calculation.amount.consumer, // 소비자 비용
                query.join(", "), // 검색 쿼리
              ];
            }).filter((arr) => {
              // 필터링을 통해 유효한 계약 데이터만 남깁니다.
              const cliid = arr[1];
              const targetProject = projects.toNormal().find((obj) => { return obj.cliid === cliid });
              if (targetProject === undefined || targetProject === null) {
                return false;
              } else {
                return targetProject.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf();
              }
            });


            // 7 - google
            /**
             * Google 캠페인 데이터를 처리하여 seventhMatrix 배열에 저장합니다.
             */

            // campaignRows 배열에서 'google'이 포함된 mother 정보를 가진 캠페인들을 필터링하여 googleRows 배열에 저장합니다.
            googleRows = campaignRows.filter((obj) => {
              return /google/gi.test(obj.information.mother); // 정보의 mother 속성에 'google' 문자열이 포함된 경우만 선택합니다.
            });

            // 필터링된 googleRows 배열이 비어있지 않다면, Google 광고 관련 성과 지표들을 계산합니다.
            if (googleRows.length > 0) {
              // googleCharge 변수에 Google 광고의 총 비용을 계산하여 저장합니다.
              googleCharge = googleRows.reduce((acc, curr) => {
                return acc + curr.value.charge; // 각 광고의 charge 값을 누적하여 합산합니다.
              }, 0);

              // googleImpressions 변수에 Google 광고의 총 노출 수를 계산하여 저장합니다.
              googleImpressions = googleRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions; // 각 광고의 impressions 값을 누적하여 합산합니다.
              }, 0);

              // googleClicks 변수에 Google 광고의 총 클릭 수를 계산하여 저장합니다.
              googleClicks = googleRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks; // 각 광고의 clicks 값을 누적하여 합산합니다.
              }, 0);
            } else {
              // googleRows 배열이 비어있다면, 모든 지표를 0으로 설정합니다.
              googleCharge = 0;
              googleImpressions = 0;
              googleClicks = 0;
            }

            // Google에서 유입된 사용자 수를 계산하여 googleFromUsers 변수에 저장합니다.
            googleFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case); // Google 캠페인인지 여부를 확인합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 유입된 사용자 수를 누적하여 합산합니다.
            }, 0);

            // Google에서 유입된 클릭 수를 계산하여 googleFromClicks 변수에 저장합니다.
            googleFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case); // Google 캠페인인지 여부를 확인합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 유입된 클릭 수를 누적하여 합산합니다.
            }, 0);

            // Google에서 유입된 팝업 오픈 수를 계산하여 googleFromPopups 변수에 저장합니다.
            googleFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return googleCampaignBoo(obj.case); // Google 캠페인인지 여부를 확인합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 유입된 팝업 오픈 수를 누적하여 합산합니다.
            }, 0);

            // Google에서 유입된 사용자 중 상담 신청한 사용자 수를 계산하여 googleFromSubmit 변수에 저장합니다.
            googleFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false;
                } else {
                  // 사용자의 mother 속성에 Google 캠페인이 포함된 경우와 캠페인 정보가 존재하는 경우만 true를 반환합니다.
                  return obj.source.mother.some((c) => { return googleCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            // 지표 초기화
            googleCtr = 0; // CTR(클릭률) 초기화
            googleCpc = 0; // CPC(클릭당 비용) 초기화
            googleClicksConverting = 0; // 클릭 전환율 초기화
            googleClicksChargeConverting = 0; // 클릭 전환당 비용 초기화
            googleSubmitConverting = 0; // 상담 신청 전환율 초기화
            googleSubmitChargeConverting = 0; // 상담 신청 전환당 비용 초기화

            // Google 광고의 노출 수가 0이 아닌 경우 CTR을 계산합니다.
            if (googleImpressions !== 0) {
              googleCtr = googleClicks / googleImpressions; // 클릭 수를 노출 수로 나누어 CTR 계산
              googleCtr = Math.floor(googleCtr * 10000) / 10000; // 소수점 이하 4자리까지 반올림
            }

            // Google 광고의 클릭 수가 0이 아닌 경우 CPC를 계산합니다.
            if (googleClicks !== 0) {
              googleCpc = Math.round(googleCharge / googleClicks); // 총 비용을 클릭 수로 나누어 CPC 계산
            }

            // Google 광고의 클릭 수가 0이 아닌 경우 클릭 전환율을 계산합니다.
            if (googleClicks !== 0) {
              googleClicksConverting = (googleFromClicks + googleFromPopups) / googleClicks; // 전환 수를 클릭 수로 나누어 클릭 전환율 계산
              googleClicksConverting = Math.floor(googleClicksConverting * 10000) / 10000; // 소수점 이하 4자리까지 반올림
            }

            // 전환된 클릭 수가 0이 아닌 경우 클릭 전환당 비용을 계산합니다.
            if (googleFromClicks + googleFromPopups !== 0) {
              googleClicksChargeConverting = Math.round(googleCharge / (googleFromClicks + googleFromPopups)); // 총 비용을 전환된 클릭 수로 나누어 클릭 전환당 비용 계산
            }

            // Google 광고의 클릭 수가 0이 아닌 경우 상담 신청 전환율을 계산합니다.
            if (googleClicks !== 0) {
              googleSubmitConverting = googleFromSubmit / googleClicks; // 상담 신청 수를 클릭 수로 나누어 상담 신청 전환율 계산
              googleSubmitConverting = Math.floor(googleSubmitConverting * 10000) / 10000; // 소수점 이하 4자리까지 반올림
            }

            // 상담 신청 수가 0이 아닌 경우 상담 신청 전환당 비용을 계산합니다.
            if (googleFromSubmit !== 0) {
              googleSubmitChargeConverting = Math.round(googleCharge / googleFromSubmit); // 총 비용을 상담 신청 수로 나누어 상담 신청 전환당 비용 계산
            }

            // 계산된 모든 데이터를 2차원 배열의 형태로 seventhMatrix 배열에 저장합니다.
            seventhMatrix = [
              [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장
                googleCharge, // 총 광고 비용
                googleImpressions, // 총 노출 수
                googleClicks, // 총 클릭 수
                googleFromUsers, // Google 유입 사용자 수
                googleFromClicks, // Google 유입 클릭 수
                googleFromPopups, // Google 유입 팝업 오픈 수
                googleFromSubmit, // Google 유입 상담 신청 수
                googleCtr, // 클릭률(CTR)
                googleCpc, // 클릭당 비용(CPC)
                googleClicksConverting, // 클릭 전환율
                googleClicksChargeConverting, // 클릭 전환당 비용
                googleSubmitConverting, // 상담 신청 전환율
                googleSubmitChargeConverting, // 상담 신청 전환당 비용
              ]
            ];


            // 8 - sns
            // SNS 데이터가 존재하는지 확인하기 위한 조건문입니다.
            if (thisMeta !== undefined && thisGoogle !== undefined) {
              // thisMeta와 thisGoogle 객체가 정의되어 있다면 SNS 관련 지표들을 snsMatrix 배열에 저장합니다.
              snsMatrix = [
                [
                  dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                  thisMeta.instagram.profile.views, // Instagram 프로필 조회 수
                  thisMeta.instagram.profile.followers, // Instagram 팔로워 수
                  thisMeta.instagram.performance.impressions, // Instagram 노출 수
                  thisMeta.instagram.performance.clicks, // Instagram 클릭 수
                  thisMeta.instagram.performance.likes, // Instagram 좋아요 수
                  thisMeta.instagram.performance.comments, // Instagram 댓글 수
                  thisMeta.instagram.performance.saves, // Instagram 저장 수
                  thisMeta.instagram.performance.shares, // Instagram 공유 수
                  thisGoogle.youtube.profile.followers, // YouTube 팔로워 수
                  thisGoogle.youtube.performance.views, // YouTube 조회 수
                  thisGoogle.youtube.performance.likes, // YouTube 좋아요 수
                  thisGoogle.youtube.performance.shares, // YouTube 공유 수
                ]
              ];
            } else {
              // thisMeta 또는 thisGoogle 객체가 정의되어 있지 않은 경우, snsMatrix에 기본값으로 0을 저장합니다.
              snsMatrix = [
                [
                  dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장합니다.
                  0, // Instagram 프로필 조회 수가 없으므로 0으로 설정
                  0, // Instagram 팔로워 수가 없으므로 0으로 설정
                  0, // Instagram 노출 수가 없으므로 0으로 설정
                  0, // Instagram 클릭 수가 없으므로 0으로 설정
                  0, // Instagram 좋아요 수가 없으므로 0으로 설정
                  0, // Instagram 댓글 수가 없으므로 0으로 설정
                  0, // Instagram 저장 수가 없으므로 0으로 설정
                  0, // Instagram 공유 수가 없으므로 0으로 설정
                  0, // YouTube 팔로워 수가 없으므로 0으로 설정
                  0, // YouTube 조회 수가 없으므로 0으로 설정
                  0, // YouTube 좋아요 수가 없으므로 0으로 설정
                  0, // YouTube 공유 수가 없으므로 0으로 설정
                ]
              ];
            }


            // 9 - kakao
            // 'kakao'라는 문자열이 'information.mother' 속성에 포함된 캠페인 데이터를 필터링하여 가져옵니다.
            // Mother 메서드는 특정 플랫폼(이 경우에는 'kakao')과 관련된 데이터를 필터링하는 데 사용됩니다.
            kakaoRows = campaignRows.filter((obj) => {
              return /kakao/gi.test(obj.information.mother); // 'information.mother' 속성에 'kakao'가 포함된 객체를 반환합니다.
            });

            // 필터링된 kakaoRows 배열이 비어있지 않은지 확인합니다.
            if (kakaoRows.length > 0) {
              // Kakao 캠페인의 총 비용을 계산합니다.
              kakaoCharge = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.charge; // 캠페인 행의 'charge' 값을 누적하여 합산합니다.
              }, 0);

              // Kakao 캠페인의 총 노출 수를 계산합니다.
              kakaoImpressions = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.performance.impressions; // 캠페인 행의 'impressions' 값을 누적하여 합산합니다.
              }, 0);

              // Kakao 캠페인의 총 클릭 수를 계산합니다.
              kakaoClicks = kakaoRows.reduce((acc, curr) => {
                return acc + curr.value.performance.clicks; // 캠페인 행의 'clicks' 값을 누적하여 합산합니다.
              }, 0);
            } else {
              // 만약 kakaoRows 배열이 비어있다면, 모든 값을 0으로 설정합니다.
              kakaoCharge = 0;
              kakaoImpressions = 0;
              kakaoClicks = 0;
            }

            // Kakao 캠페인에서 유입된 사용자 수를 계산합니다.
            kakaoFromUsers = analyticsRows.data.users.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case); // 'kakao' 캠페인에 해당하는 데이터를 필터링합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 각 케이스의 'value' 값을 합산하여 총 사용자 수를 계산합니다.
            }, 0);

            // Kakao 캠페인에서 유입된 클릭 수를 계산합니다.
            kakaoFromClicks = analyticsRows.data.conversion.consultingPage.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case); // 'kakao' 캠페인에 해당하는 클릭 데이터를 필터링합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 각 클릭 케이스의 'value' 값을 합산하여 총 클릭 수를 계산합니다.
            }, 0);

            // Kakao 캠페인에서 발생한 팝업 열기 이벤트 수를 계산합니다.
            kakaoFromPopups = analyticsRows.data.conversion.popupOpen.detail.sourceDetail.cases.filter((obj) => {
              return kakaoCampaignBoo(obj.case); // 'kakao' 캠페인에 해당하는 팝업 열기 데이터를 필터링합니다.
            }).reduce((acc, curr) => {
              return acc + curr.value; // 각 팝업 열기 케이스의 'value' 값을 합산하여 총 이벤트 수를 계산합니다.
            }, 0);

            // Kakao 캠페인에서 유입된 후 제출된 사용자 수를 계산합니다.
            kakaoFromSubmit = clientsRows.data.detail.map((obj) => { return obj.users }).filter((arr) => {
              return arr.some((obj) => {
                if (obj === null) {
                  return false; // 사용자가 null이면 false 반환
                } else {
                  // Mother 메서드를 사용하여 'kakao' 캠페인에 해당하는지 확인
                  return obj.source.mother.some((c) => { return kakaoCampaignBoo(c); }) && obj.source.campaign.length > 0;
                }
              });
            }).length;

            // Kakao 캠페인의 클릭률(CTR)을 계산합니다.
            kakaoCtr = 0;
            kakaoCpc = 0;
            kakaoClicksConverting = 0;
            kakaoClicksChargeConverting = 0;
            kakaoSubmitConverting = 0;
            kakaoSubmitChargeConverting = 0;

            // 노출 수가 0이 아닌 경우 CTR 계산
            if (kakaoImpressions !== 0) {
              kakaoCtr = kakaoClicks / kakaoImpressions; // CTR 계산
              kakaoCtr = Math.floor(kakaoCtr * 10000) / 10000; // 소수점 네 자리까지 반올림
            }

            // 클릭 수가 0이 아닌 경우 CPC 계산
            if (kakaoClicks !== 0) {
              kakaoCpc = Math.round(kakaoCharge / kakaoClicks); // CPC 계산
            }

            // 클릭 수가 0이 아닌 경우 전환율 계산
            if (kakaoClicks !== 0) {
              kakaoClicksConverting = (kakaoFromClicks + kakaoFromPopups) / kakaoClicks; // 클릭당 전환율 계산
              kakaoClicksConverting = Math.floor(kakaoClicksConverting * 10000) / 10000; // 소수점 네 자리까지 반올림
            }

            // 클릭 또는 팝업 열기 이벤트가 있는 경우 클릭당 비용 전환율 계산
            if (kakaoFromClicks + kakaoFromPopups !== 0) {
              kakaoClicksChargeConverting = Math.round(kakaoCharge / (kakaoFromClicks + kakaoFromPopups)); // 클릭당 비용 전환율 계산
            }

            // 클릭 수가 0이 아닌 경우 제출 전환율 계산
            if (kakaoClicks !== 0) {
              kakaoSubmitConverting = kakaoFromSubmit / kakaoClicks; // 제출 전환율 계산
              kakaoSubmitConverting = Math.floor(kakaoSubmitConverting * 10000) / 10000; // 소수점 네 자리까지 반올림
            }

            // 제출 수가 0이 아닌 경우 제출당 비용 전환율 계산
            if (kakaoFromSubmit !== 0) {
              kakaoSubmitChargeConverting = Math.round(kakaoCharge / kakaoFromSubmit); // 제출당 비용 전환율 계산
            }

            // 최종적으로 모든 계산된 값들을 kakaoMatrix 배열에 저장합니다.
            kakaoMatrix = [
              [
                dateToString(targetDate), // 대상 날짜를 문자열로 변환하여 저장
                kakaoCharge, // Kakao 캠페인의 총 비용
                kakaoImpressions, // Kakao 캠페인의 총 노출 수
                kakaoClicks, // Kakao 캠페인의 총 클릭 수
                kakaoFromUsers, // Kakao 캠페인에서 유입된 사용자 수
                kakaoFromClicks, // Kakao 캠페인에서 유입된 클릭 수
                kakaoFromPopups, // Kakao 캠페인에서 발생한 팝업 열기 이벤트 수
                kakaoFromSubmit, // Kakao 캠페인에서 유입된 후 제출된 사용자 수
                kakaoCtr, // Kakao 캠페인의 클릭률(CTR)
                kakaoCpc, // Kakao 캠페인의 클릭당 비용(CPC)
                kakaoClicksConverting, // Kakao 캠페인의 클릭당 전환율
                kakaoClicksChargeConverting, // Kakao 캠페인의 클릭당 비용 전환율
                kakaoSubmitConverting, // Kakao 캠페인의 제출 전환율
                kakaoSubmitChargeConverting, // Kakao 캠페인의 제출당 비용 전환율
              ]
            ];


            // 최종 매트릭스를 반환합니다.
            return [
              firstMatrix,
              firstNewMatrix,
              secondMatrix,
              thirdMatrix,
              fourthMatrix,
              fifthMatrix,
              sixthMatrix,
              seventhMatrix,
              snsMatrix,
              kakaoMatrix,
            ];
          } catch (e) {
            console.log(e);
            return null;
          }
        }

        /**
         * `matrix` 변수를 정의하고 초기화합니다. 이 변수는 각기 다른 마케팅 데이터를 저장하는 여러 개의 행렬을 포함합니다.
         * 행렬은 다양한 마케팅 지표와 관련된 데이터를 구조화하여 저장하기 위해 사용됩니다.
         * 각 배열은 다양한 마케팅 메트릭스를 나타내며, 각각의 행렬에는 분석하려는 특정 데이터의 제목과 구조가 포함됩니다.
         */
        let matrix, resMatrix; // 다양한 마케팅 지표 데이터를 저장할 행렬과 결과 행렬을 선언합니다.
        let now; // 현재 날짜 및 시간을 저장할 변수입니다.
        let standardDate; // 기준 날짜를 저장할 변수입니다.
        let dateNumber; // 날짜를 숫자로 변환하여 저장할 변수입니다.
        let numberDate; // 숫자로 된 날짜를 다시 날짜 형식으로 변환하여 저장할 변수입니다.
        let totalFunnelCopied, totalFunnelWeekMatrix, totalFunnelMonthMatrix; // 총 퍼널 데이터와 관련된 복사본 및 주간, 월간 매트릭스를 저장할 변수들입니다.
        let facebookPaidCopied, facebookPaidMonthMatrix, facebookPaidWeekMatrix; // 페이스북 유료 광고 데이터와 관련된 복사본 및 주간, 월간 매트릭스를 저장할 변수들입니다.
        let naverPaidCopied, naverPaidMonthMatrix, naverPaidWeekMatrix; // 네이버 유료 광고 데이터와 관련된 복사본 및 주간, 월간 매트릭스를 저장할 변수들입니다.
        let googlePaidCopied, googlePaidMonthMatrix, googlePaidWeekMatrix; // 구글 유료 광고 데이터와 관련된 복사본 및 주간, 월간 매트릭스를 저장할 변수들입니다.
        let kakaoPaidCopied, kakaoPaidMonthMatrix, kakaoPaidWeekMatrix; // 카카오 유료 광고 데이터와 관련된 복사본 및 주간, 월간 매트릭스를 저장할 변수들입니다.
        let tempArr; // 임시 데이터를 저장할 배열입니다.
        let monthStartDate; // 해당 월의 시작 날짜를 저장할 변수입니다.
        let monthArr; // 월간 데이터를 저장할 배열입니다.
        let weekArr; // 주간 데이터를 저장할 배열입니다.
        let thisIndex; // 특정 인덱스를 저장할 변수입니다.
        let ratioConverting; // 전환율 계산을 위한 변수를 저장합니다.
        let weekSpread; // 주간 데이터 분포를 저장할 변수입니다.
        let target; // 목표 데이터를 저장할 변수입니다.
        let startD, endD; // 시작 날짜와 종료 날짜를 저장할 변수들입니다.
        let simpleRes; // 간단한 결과를 저장할 변수입니다.
        let simpleRows; // 간단한 행렬 데이터를 저장할 변수입니다.

        /**
         * 마케팅 데이터를 저장할 행렬을 초기화합니다.
         * 각 배열은 특정 마케팅 지표와 관련된 데이터를 저장하는 데 사용됩니다.
         * 행렬은 총 10개의 배열로 구성되어 있으며, 각각은 날짜, 비용, 노출, 클릭 수 등의 다양한 지표를 포함합니다.
         */
        matrix = [
          // 첫 번째 행렬: 날짜별 총 비용, 노출, 클릭 수 등을 저장
          [
            [
              "날짜",
              "총 비용",
              "총 노출",
              "총 클릭",
              "MAU",
              "페이지뷰",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "계약수",
            ]
          ],
          // 두 번째 행렬: 기준일, 유저 수, 페이지뷰 등 다양한 지표를 저장
          [
            [
              "기준일",
              "유저수",
              "페이지뷰",
              "컨설팅 페이지",
              "팝업 오픈",
              "전환수",
              "문의수",
              "계약수",
              "오가닉 뷰수",
              "광고 뷰수",
              "SNS 뷰수",
              "다이렉트 뷰수",
              "네이버 유입",
              "메타 유입",
              "구글 유입",
              "오가닉 전환수",
              "광고 전환수",
              "SNS 전환수",
              "다이렉트 전환수",
            ]
          ],
          // 세 번째 행렬: 페이스북, 인스타그램 등의 광고 지표를 저장
          [
            [
              "날짜",
              "비용",
              "도달",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
              "디자이너 비용",
              "디자이너 도달",
              "디자이너 노출",
              "디자이너 클릭",
            ]
          ],
          // 네 번째 행렬: 네이버 광고 지표를 저장
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          // 다섯 번째 행렬: 고객의 세부 정보와 관련된 데이터를 저장
          [
            [
              "날짜",
              "아이디",
              "고객명",
              "GA",
              "문의일",
              "재방문 여부",
              "소스",
              "캠페인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "거주중 여부",
              "입주 예정일",
              "희망 서비스",
            ]
          ],
          // 여섯 번째 행렬: 캠페인 세부 정보와 관련된 데이터를 저장
          [
            [
              "날짜",
              "채널",
              "종류",
              "아이디",
              "이름",
              "비용",
              "노출",
              "클릭",
            ]
          ],
          // 일곱 번째 행렬: 계약 고객과 관련된 세부 정보를 저장
          [
            [
              "날짜",
              "아이디",
              "고객명",
              "GA",
              "문의일",
              "계약일",
              "재방문 여부",
              "소스",
              "캠페인",
              "디바이스",
              "레퍼럴",
              "주소",
              "평수",
              "예산",
              "가족 구성원",
              "거주중 여부",
              "입주 예정일",
              "부분 여부",
              "온라인 여부",
              "희망 서비스",
              "계약 서비스",
              "요청사항",
              "계약 디자인비",
              "검색어",
            ]
          ],
          // 여덟 번째 행렬: 특정 광고 지표를 저장
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
          // 아홉 번째 행렬: 인스타그램 및 유튜브의 SNS 지표를 저장
          [
            [
              "기준일",
              "인스타 프로필뷰",
              "인스타 팔로워",
              "인스타 노출수",
              "인스타 클릭수",
              "인스타 좋아요수",
              "인스타 댓글수",
              "인스타 저장수",
              "인스타 공유수",
              "유튜브 구독자",
              "유튜브 노출수",
              "유튜브 좋아요수",
              "유튜브 공유수",
            ]
          ],
          // 열 번째 행렬: 카카오 광고 지표를 저장
          [
            [
              "날짜",
              "비용",
              "노출",
              "클릭",
              "사용자수",
              "신청 페이지뷰",
              "신청 팝업수",
              "문의수",
              "CTR",
              "CPC",
              "전환율",
              "전환당 비용",
              "문의율",
              "문의당 비용",
            ]
          ],
        ];

        /**
         * 현재 날짜 및 시간을 저장합니다.
         * 이 변수는 데이터를 수집하고 분석하는 기준이 되는 날짜로 사용됩니다.
         */
        now = new Date();

        /**
         * `standardDate` 변수는 현재 날짜를 기준으로 한 날짜를 저장합니다.
         * 이 변수는 데이터 분석의 기준일로 사용됩니다.
         */
        standardDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        /**
         * 지난 30일 동안의 데이터를 수집하여 `matrix`에 저장하는 루프입니다.
         * 매일의 데이터를 `getReportsByDate` 함수를 통해 얻고, `matrix`에 추가합니다.
         * 데이터가 유효하지 않은 경우 다음 날짜로 넘어갑니다.
         */
        for (let i = 0; i < 30; i++) {
            // 기준 날짜의 데이터를 가져옵니다.
            resMatrix = await getReportsByDate(standardDate, campaignEntireRows, campaignAspirantEntireRows, analyticsEntireRows, clientsEntireRows, clients, projects, clientHistories, metaComplexRows, googleComplexRows);

            // 만약 반환된 데이터가 배열이 아닌 경우, 콘솔에 출력하고 다음 날짜로 넘어갑니다.
            if (!Array.isArray(resMatrix)) {
                console.log(resMatrix);
                standardDate.setDate(standardDate.getDate() - 1); // 기준 날짜를 하루 전으로 변경합니다.
                continue;
            }

            // 가져온 데이터를 각 매트릭스에 추가합니다.
            for (let i = 0; i < matrix.length; i++) {
                for (let arr of resMatrix[i]) {
                    matrix[i].push(arr); // 매트릭스에 데이터를 추가합니다.
                }
            }

            // 기준 날짜를 하루 전으로 변경합니다.
            standardDate.setDate(standardDate.getDate() - 1);
        }

        /**
         * 주간 및 월간 표준 데이터를 설정합니다.
         * `monthStartDate`는 해당 월의 첫 번째 날짜를 저장합니다.
         */
        monthStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

        /**
         * `monthArr`는 월별로 데이터를 저장합니다.
         * 해당 월이 현재 달과 같아질 때까지 반복합니다.
         */
        monthArr = [];
        while (!(monthStartDate.getFullYear() === now.getFullYear() && monthStartDate.getMonth() === now.getMonth())) {
            // 각 월의 연도와 월을 배열에 추가합니다.
            monthArr.push([
                monthStartDate.getFullYear(),
                monthStartDate.getMonth() + 1
            ]);
            monthStartDate.setMonth(monthStartDate.getMonth() + 1); // 월을 하나 증가시킵니다.
        }

        // 현재 월을 `monthArr`에 추가합니다.
        monthArr.push([
            monthStartDate.getFullYear(),
            monthStartDate.getMonth() + 1
        ]);

        /**
         * `weekArr`는 주간 데이터를 저장하는 배열입니다.
         * 각 월별로 주간 데이터를 계산하여 `weekArr`에 추가합니다.
         */
        weekArr = monthArr.map(([year, month]) => {
            return getDateMatrix(year, month - 1); // 월의 시작일부터 종료일까지 주간 데이터를 계산합니다.
        }).map(({ matrix }) => {
            return matrix.map((arr) => {
                // 각 주의 시작일과 종료일을 설정합니다.
                const weekArr = arr.filter((obj) => { return obj !== null }).map((obj) => {
                    return obj.dateObject;
                });
                return { start: dateToString(weekArr[0]), end: dateToString(weekArr[weekArr.length - 1]) };
            });
        }).flat(); // 주간 데이터를 평탄화하여 배열로 만듭니다.

        /**
         * `monthArr` 배열을 다시 객체 형태로 변환하고, 최신 월부터 시작하도록 순서를 반전시킵니다.
         */
        monthArr = monthArr.map(([year, month]) => {
            return { year, month };
        });
        monthArr.reverse(); // 월별 데이터를 최신부터 과거로 정렬합니다.
        weekArr.reverse(); // 주간 데이터를 최신부터 과거로 정렬합니다.

        /**
         * `ratioConverting` 함수는 클릭률(CTR), 클릭당 비용(CPC), 전환율 등의 지표를 계산합니다.
         * 각 매트릭스에서 페이스북 모드와 그 외 모드를 구분하여 적절한 지표를 계산한 후, 배열에 추가합니다.
         */
        ratioConverting = (mode) => {
            return (arr) => {
                let charge, impressions, clicks, fromUsers, fromClicks, fromPopups, fromSubmit;
                let ctr, cpc, clicksConverting, clicksChargeConverting, submitConverting, submitChargeConverting;

                // 배열에서 필요한 데이터를 추출합니다.
                charge = arr[1];
                if (mode === "facebook") {
                    impressions = arr[3];
                    clicks = arr[4];
                    fromUsers = arr[5];
                    fromClicks = arr[6];
                    fromPopups = arr[7];
                    fromSubmit = arr[8];
                } else {
                    impressions = arr[2];
                    clicks = arr[3];
                    fromUsers = arr[4];
                    fromClicks = arr[5];
                    fromPopups = arr[6];
                    fromSubmit = arr[7];
                }

                // 초기화
                ctr = 0;
                cpc = 0;
                clicksConverting = 0;
                clicksChargeConverting = 0;
                submitConverting = 0;
                submitChargeConverting = 0;

                // 클릭률(CTR) 계산
                if (impressions !== 0) {
                    ctr = clicks / impressions;
                    ctr = Math.floor(ctr * 10000) / 10000;
                }

                // 클릭당 비용(CPC) 계산
                if (clicks !== 0) {
                    cpc = Math.round(charge / clicks);
                }

                // 클릭 전환율 계산
                if (clicks !== 0) {
                    clicksConverting = (fromClicks + fromPopups) / clicks;
                    clicksConverting = Math.floor(clicksConverting * 10000) / 10000;
                }

                // 전환당 비용 계산
                if (fromClicks + fromPopups !== 0) {
                    clicksChargeConverting = Math.round(charge / (fromClicks + fromPopups));
                }

                // 전환율 계산
                if (clicks !== 0) {
                    submitConverting = fromSubmit / clicks;
                    submitConverting = Math.floor(submitConverting * 10000) / 10000;
                }

                // 전환당 비용 계산
                if (fromSubmit !== 0) {
                    submitChargeConverting = Math.round(charge / fromSubmit);
                }

                // 계산된 데이터를 배열에 반영합니다.
                if (mode === "facebook") {
                    arr[9] = ctr;
                    arr[10] = cpc;
                    arr[11] = clicksConverting;
                    arr[12] = clicksChargeConverting;
                    arr[13] = submitConverting;
                    arr[14] = submitChargeConverting;
                } else {
                    arr[8] = ctr;
                    arr[9] = cpc;
                    arr[10] = clicksConverting;
                    arr[11] = clicksChargeConverting;
                    arr[12] = submitConverting;
                    arr[13] = submitChargeConverting;
                }
            }
        };

        /**
         * `weekSpread` 함수는 주간 데이터를 정리합니다.
         * 주간의 시작일과 종료일을 배열의 첫 번째 요소로 설정하고, 배열을 평탄화하여 반환합니다.
         */
        weekSpread = (arr) => {
            if (arr[0] === "날짜") {
                arr[0] = ["주 시작일", "주 종료일"]; // 날짜를 주간 시작일과 종료일로 대체합니다.
            } else {
                arr[0] = arr[0].split(" ~ "); // 주간 데이터의 시작일과 종료일을 나눕니다.
            }
            arr = arr.flat(); // 배열을 평탄화합니다.
            return arr;
        };


        // total funnel
        /**
         * 총 유입 분석(Total Funnel) 데이터를 생성하는 부분입니다.
         * 이 부분에서는 월별 및 주별 총 유입 데이터를 계산하여 저장합니다.
         */

        thisIndex = 0; // `matrix` 배열에서 총 유입 분석 데이터를 찾기 위한 인덱스 설정

        // 현재의 총 유입 분석 데이터를 복사합니다.
        totalFunnelCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);

        // 월별 데이터와 주별 데이터를 복사합니다.
        totalFunnelMonthMatrix = equalJson(JSON.stringify(monthArr));
        totalFunnelWeekMatrix = equalJson(JSON.stringify(weekArr));

        /**
         * 월별 총 유입 분석 데이터를 계산하는 반복문입니다.
         * 각 월에 해당하는 데이터를 추출하여 합산하고, 결과를 `totalFunnelMonthMatrix`에 저장합니다.
         */
        for (let obj of totalFunnelMonthMatrix) {
            target = []; // 특정 월에 해당하는 데이터를 저장할 배열

            // 총 유입 분석 데이터를 월별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of totalFunnelCopied) {
                if ((new RegExp(String(obj.year).slice(2) + "-" + zeroAddition(obj.month), "gi")).test(arr[0])) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 월별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 사용자의 총 유입 데이터를 `target` 배열에 설정합니다.
                target[4] = simpleRes.data.users.total;
            }

            // 계산된 월별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `totalFunnelMonthMatrix`에서 유효한 데이터를 필터링하고, 월별로 데이터를 정렬하여 반환합니다.
        totalFunnelMonthMatrix = totalFunnelMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
            matrix[0] = String(year) + "년 " + String(month) + "월"; // 각 월의 제목을 설정합니다.
            return matrix;
        });

        // 월별 총 유입 분석 데이터의 첫 번째 행에 제목을 추가합니다.
        totalFunnelMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        /**
         * 주별 총 유입 분석 데이터를 계산하는 반복문입니다.
         * 각 주에 해당하는 데이터를 추출하여 합산하고, 결과를 `totalFunnelWeekMatrix`에 저장합니다.
         */
        for (let obj of totalFunnelWeekMatrix) {
            target = []; // 특정 주에 해당하는 데이터를 저장할 배열

            // 총 유입 분석 데이터를 주별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of totalFunnelCopied) {
                if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 주별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 사용자의 총 유입 데이터를 `target` 배열에 설정합니다.
                target[4] = simpleRes.data.users.total;
            }

            // 계산된 주별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `totalFunnelWeekMatrix`에서 유효한 데이터를 필터링하고, 주별로 데이터를 정렬하여 반환합니다.
        totalFunnelWeekMatrix = totalFunnelWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
            matrix[0] = String(start) + " ~ " + String(end); // 각 주의 시작일과 종료일을 설정합니다.
            return matrix;
        });

        // 주별 총 유입 분석 데이터의 첫 번째 행에 제목을 추가합니다.
        totalFunnelWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        // 주간 데이터를 `weekSpread` 함수를 통해 평탄화하여 반환합니다.
        totalFunnelWeekMatrix = totalFunnelWeekMatrix.map(weekSpread);



        // facebook paid
        /**
         * 페이스북 유료 광고 분석(Facebook Paid)을 위한 데이터 처리 부분입니다.
         * 이 부분에서는 월별 및 주별 페이스북 유료 광고 데이터를 계산하여 저장합니다.
         */

        thisIndex = 2; // `matrix` 배열에서 페이스북 유료 광고 데이터를 찾기 위한 인덱스 설정

        // 현재의 페이스북 유료 광고 데이터를 복사합니다.
        facebookPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);

        // 월별 데이터와 주별 데이터를 복사합니다.
        facebookPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        facebookPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        /**
         * 월별 페이스북 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 월에 해당하는 데이터를 추출하여 합산하고, 결과를 `facebookPaidMonthMatrix`에 저장합니다.
         */
        for (let obj of facebookPaidMonthMatrix) {
            target = []; // 특정 월에 해당하는 데이터를 저장할 배열

            // 페이스북 유료 광고 데이터를 월별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of facebookPaidCopied) {
                if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 월별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 페이스북 유입 사용자 데이터를 `target` 배열에 설정합니다.
                target[5] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return facebookCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 월별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `facebookPaidMonthMatrix`에서 유효한 데이터를 필터링하고, 월별로 데이터를 정렬하여 반환합니다.
        facebookPaidMonthMatrix = facebookPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
            matrix[0] = String(year) + "년 " + String(month) + "월"; // 각 월의 제목을 설정합니다.
            return matrix;
        });

        // 페이스북 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        facebookPaidMonthMatrix.forEach(ratioConverting("facebook"));

        // 월별 페이스북 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        facebookPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        /**
         * 주별 페이스북 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 주에 해당하는 데이터를 추출하여 합산하고, 결과를 `facebookPaidWeekMatrix`에 저장합니다.
         */
        for (let obj of facebookPaidWeekMatrix) {
            target = []; // 특정 주에 해당하는 데이터를 저장할 배열

            // 페이스북 유료 광고 데이터를 주별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of facebookPaidCopied) {
                if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 주별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 페이스북 유입 사용자 데이터를 `target` 배열에 설정합니다.
                target[5] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return facebookCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 주별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `facebookPaidWeekMatrix`에서 유효한 데이터를 필터링하고, 주별로 데이터를 정렬하여 반환합니다.
        facebookPaidWeekMatrix = facebookPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
            matrix[0] = String(start) + " ~ " + String(end); // 각 주의 시작일과 종료일을 설정합니다.
            return matrix;
        });

        // 페이스북 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        facebookPaidWeekMatrix.forEach(ratioConverting("facebook"));

        // 주별 페이스북 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        facebookPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        // 주간 데이터를 `weekSpread` 함수를 통해 평탄화하여 반환합니다.
        facebookPaidWeekMatrix = facebookPaidWeekMatrix.map(weekSpread);



        // naver paid
        /**
         * 네이버 유료 광고 분석(Naver Paid)을 위한 데이터 처리 부분입니다.
         * 이 부분에서는 월별 및 주별 네이버 유료 광고 데이터를 계산하여 저장합니다.
         */

        thisIndex = 3; // `matrix` 배열에서 네이버 유료 광고 데이터를 찾기 위한 인덱스 설정

        // 현재의 네이버 유료 광고 데이터를 복사합니다.
        naverPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);

        // 월별 데이터와 주별 데이터를 복사합니다.
        naverPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        naverPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        /**
         * 월별 네이버 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 월에 해당하는 데이터를 추출하여 합산하고, 결과를 `naverPaidMonthMatrix`에 저장합니다.
         */
        for (let obj of naverPaidMonthMatrix) {
            target = []; // 특정 월에 해당하는 데이터를 저장할 배열

            // 네이버 유료 광고 데이터를 월별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of naverPaidCopied) {
                if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 월별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 네이버 유입 사용자 데이터를 `target` 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return naverCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 월별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `naverPaidMonthMatrix`에서 유효한 데이터를 필터링하고, 월별로 데이터를 정렬하여 반환합니다.
        naverPaidMonthMatrix = naverPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
            matrix[0] = String(year) + "년 " + String(month) + "월"; // 각 월의 제목을 설정합니다.
            return matrix;
        });

        // 네이버 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        naverPaidMonthMatrix.forEach(ratioConverting("naver"));

        // 월별 네이버 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        naverPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        /**
         * 주별 네이버 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 주에 해당하는 데이터를 추출하여 합산하고, 결과를 `naverPaidWeekMatrix`에 저장합니다.
         */
        for (let obj of naverPaidWeekMatrix) {
            target = []; // 특정 주에 해당하는 데이터를 저장할 배열

            // 네이버 유료 광고 데이터를 주별로 필터링하여 `target` 배열에 추가합니다.
            for (let arr of naverPaidCopied) {
                if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 주별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 `target` 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 `simpleAnalytics` 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 네이버 유입 사용자 데이터를 `target` 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return naverCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 주별 데이터를 `matrix`에 추가합니다.
            obj.matrix = target;
        }

        // `naverPaidWeekMatrix`에서 유효한 데이터를 필터링하고, 주별로 데이터를 정렬하여 반환합니다.
        naverPaidWeekMatrix = naverPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
            matrix[0] = String(start) + " ~ " + String(end); // 각 주의 시작일과 종료일을 설정합니다.
            return matrix;
        });

        // 네이버 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        naverPaidWeekMatrix.forEach(ratioConverting("naver"));

        // 주별 네이버 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        naverPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        // 주간 데이터를 `weekSpread` 함수를 통해 평탄화하여 반환합니다.
        naverPaidWeekMatrix = naverPaidWeekMatrix.map(weekSpread);



        // google paid
        /**
         * 구글 유료 광고(Google Paid) 분석을 위한 데이터 처리 부분입니다.
         * 이 부분에서는 월별 및 주별 구글 유료 광고 데이터를 계산하여 저장합니다.
         */

        // matrix 배열에서 구글 유료 광고 데이터를 찾기 위한 인덱스를 설정합니다.
        thisIndex = 7;

        // 현재의 구글 유료 광고 데이터를 복사합니다.
        googlePaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);

        // 월별 데이터와 주별 데이터를 복사합니다.
        googlePaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        googlePaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        /**
         * 월별 구글 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 월에 해당하는 데이터를 추출하여 합산하고, 결과를 googlePaidMonthMatrix에 저장합니다.
         */
        for (let obj of googlePaidMonthMatrix) {
            target = []; // 특정 월에 해당하는 데이터를 저장할 배열

            // 구글 유료 광고 데이터를 월별로 필터링하여 target 배열에 추가합니다.
            for (let arr of googlePaidCopied) {
                if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 월별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 target 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 simpleAnalytics 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 구글 유입 사용자 데이터를 target 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return googleCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 월별 데이터를 matrix에 추가합니다.
            obj.matrix = target;
        }

        // googlePaidMonthMatrix에서 유효한 데이터를 필터링하고, 월별로 데이터를 정렬하여 반환합니다.
        googlePaidMonthMatrix = googlePaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
            matrix[0] = String(year) + "년 " + String(month) + "월"; // 각 월의 제목을 설정합니다.
            return matrix;
        });

        // 구글 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        googlePaidMonthMatrix.forEach(ratioConverting("google"));

        // 월별 구글 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        googlePaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        /**
         * 주별 구글 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 주에 해당하는 데이터를 추출하여 합산하고, 결과를 googlePaidWeekMatrix에 저장합니다.
         */
        for (let obj of googlePaidWeekMatrix) {
            target = []; // 특정 주에 해당하는 데이터를 저장할 배열

            // 구글 유료 광고 데이터를 주별로 필터링하여 target 배열에 추가합니다.
            for (let arr of googlePaidCopied) {
                if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 주별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 target 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 simpleAnalytics 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 구글 유입 사용자 데이터를 target 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return googleCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 주별 데이터를 matrix에 추가합니다.
            obj.matrix = target;
        }

        // googlePaidWeekMatrix에서 유효한 데이터를 필터링하고, 주별로 데이터를 정렬하여 반환합니다.
        googlePaidWeekMatrix = googlePaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
            matrix[0] = String(start) + " ~ " + String(end); // 각 주의 시작일과 종료일을 설정합니다.
            return matrix;
        });

        // 구글 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        googlePaidWeekMatrix.forEach(ratioConverting("google"));

        // 주별 구글 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        googlePaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        // 주간 데이터를 weekSpread 함수를 통해 평탄화하여 반환합니다.
        googlePaidWeekMatrix = googlePaidWeekMatrix.map(weekSpread);



        // kakao paid
        /**
         * 카카오 유료 광고(Kakao Paid) 분석을 위한 데이터 처리 부분입니다.
         * 이 부분에서는 월별 및 주별 카카오 유료 광고 데이터를 계산하여 저장합니다.
         */

        // matrix 배열에서 카카오 유료 광고 데이터를 찾기 위한 인덱스를 설정합니다.
        thisIndex = 9;

        // 현재의 카카오 유료 광고 데이터를 복사합니다.
        kakaoPaidCopied = equalJson(JSON.stringify(matrix[thisIndex])).slice(1);

        // 월별 데이터와 주별 데이터를 복사합니다.
        kakaoPaidMonthMatrix = equalJson(JSON.stringify(monthArr));
        kakaoPaidWeekMatrix = equalJson(JSON.stringify(weekArr));

        /**
         * 월별 카카오 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 월에 해당하는 데이터를 추출하여 합산하고, 결과를 kakaoPaidMonthMatrix에 저장합니다.
         */
        for (let obj of kakaoPaidMonthMatrix) {
            target = []; // 특정 월에 해당하는 데이터를 저장할 배열

            // 카카오 유료 광고 데이터를 월별로 필터링하여 target 배열에 추가합니다.
            for (let arr of kakaoPaidCopied) {
                if ((new RegExp("^" + String(obj.year) + "-" + zeroAddition(obj.month))).test(arr[0])) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 월별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 target 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 simpleAnalytics 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 카카오 유입 사용자 데이터를 target 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return kakaoCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 월별 데이터를 matrix에 추가합니다.
            obj.matrix = target;
        }

        // kakaoPaidMonthMatrix에서 유효한 데이터를 필터링하고, 월별로 데이터를 정렬하여 반환합니다.
        kakaoPaidMonthMatrix = kakaoPaidMonthMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ year, month, matrix }) => {
            matrix[0] = String(year) + "년 " + String(month) + "월"; // 각 월의 제목을 설정합니다.
            return matrix;
        });

        // 카카오 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        kakaoPaidMonthMatrix.forEach(ratioConverting("kakao"));

        // 월별 카카오 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        kakaoPaidMonthMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        /**
         * 주별 카카오 유료 광고 데이터를 계산하는 반복문입니다.
         * 각 주에 해당하는 데이터를 추출하여 합산하고, 결과를 kakaoPaidWeekMatrix에 저장합니다.
         */
        for (let obj of kakaoPaidWeekMatrix) {
            target = []; // 특정 주에 해당하는 데이터를 저장할 배열

            // 카카오 유료 광고 데이터를 주별로 필터링하여 target 배열에 추가합니다.
            for (let arr of kakaoPaidCopied) {
                if (stringToDate(obj.start).valueOf() <= stringToDate(arr[0]).valueOf() && stringToDate(obj.end).valueOf() >= stringToDate(arr[0]).valueOf()) {
                    target.push(equalJson(JSON.stringify(arr)));
                }
            }

            // 필터링된 데이터가 있는 경우에만 처리
            if (target.length !== 0) {
                // 주별 데이터의 시작일과 종료일을 설정합니다.
                endD = target[0][0];
                startD = target[target.length - 1][0];

                // 각 항목의 값을 합산하여 target 배열에 저장합니다.
                target = target.reduce((acc, curr) => {
                    for (let i = 0; i < curr.length; i++) {
                        if (i !== 0) {
                            acc[i] = acc[i] + curr[i];
                        }
                    }
                    return acc;
                }, new Array(target[0].length).fill(0, 0));

                // 합산된 데이터와 관련된 simpleAnalytics 데이터를 데이터베이스에서 읽어옵니다.
                simpleRows = await back.mongoRead("simpleAnalytics", { key: "simple_analytics_" + startD.replace(/\-/gi, '') + "_" + endD.replace(/\-/gi, '') }, { selfMongo });

                // 데이터베이스에 저장된 데이터가 없는 경우, 새로운 분석 데이터를 생성하고 저장합니다.
                if (simpleRows.length === 0) {
                    simpleRes = await analytics.simpleMetric(startD, endD); // 새로 분석 데이터를 생성합니다.
                    await back.mongoCreate("simpleAnalytics", simpleRes, { selfMongo }); // 생성된 데이터를 데이터베이스에 저장합니다.
                } else {
                    simpleRes = simpleRows[0]; // 기존 데이터를 사용합니다.
                }

                // 카카오 유입 사용자 데이터를 target 배열에 설정합니다.
                target[4] = simpleRes.data.users.detail.sourceDetail.cases.filter((obj) => {
                    return kakaoCampaignBoo(obj.case);
                }).reduce((acc, curr) => {
                    return acc + curr.value;
                }, 0);
            }

            // 계산된 주별 데이터를 matrix에 추가합니다.
            obj.matrix = target;
        }

        // kakaoPaidWeekMatrix에서 유효한 데이터를 필터링하고, 주별로 데이터를 정렬하여 반환합니다.
        kakaoPaidWeekMatrix = kakaoPaidWeekMatrix.filter((obj) => { return obj.matrix.length !== 0 }).map(({ start, end, matrix }) => {
            matrix[0] = String(start) + " ~ " + String(end); // 각 주의 시작일과 종료일을 설정합니다.
            return matrix;
        });

        // 카카오 데이터를 변환하는 함수를 실행하여 필요한 값을 추가합니다.
        kakaoPaidWeekMatrix.forEach(ratioConverting("kakao"));

        // 주별 카카오 유료 광고 데이터의 첫 번째 행에 제목을 추가합니다.
        kakaoPaidWeekMatrix.unshift(equalJson(JSON.stringify(matrix[thisIndex][0])));

        // 주간 데이터를 weekSpread 함수를 통해 평탄화하여 반환합니다.
        kakaoPaidWeekMatrix = kakaoPaidWeekMatrix.map(weekSpread);

        /**
         * 이 함수의 반환값으로, 월별 및 주별로 분류된 데이터와 전체 matrix 데이터를 반환합니다.
         * 이는 마케팅 기본 메트릭스를 구성하기 위한 다양한 데이터를 포함합니다.
         */
        return {
            matrix,
            month: {
                totalFunnelMonthMatrix,
                facebookPaidMonthMatrix,
                naverPaidMonthMatrix,
                googlePaidMonthMatrix,
                kakaoPaidMonthMatrix
            },
            week: {
                totalFunnelWeekMatrix,
                facebookPaidWeekMatrix,
                naverPaidWeekMatrix,
                googlePaidWeekMatrix,
                kakaoPaidWeekMatrix
            }
        };

      } catch (e) {
        console.log(e);
        return null;
      }
    }

    /**
     * Sub Analytics Report를 생성하는 함수입니다.
     * 주어진 시작 날짜를 기준으로 3개월 전부터 현재까지의 데이터를 조회하여 매트릭스를 생성합니다.
     *
     * @param {Date} startDate - 분석을 시작할 기준 날짜입니다.
     * @returns {Promise<Array>} 생성된 매트릭스를 반환합니다.
     */
    const subAnalyticsMatrix = async (startDate) => {
      try {
        // 기준 날짜를 생성합니다. 시작 날짜의 년, 월, 일을 기준으로 새로운 Date 객체를 생성합니다.
        const queryStandardDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        // 기준 날짜에서 3개월을 뺍니다. 이렇게 하여 3개월 전의 날짜를 구합니다.
        queryStandardDate.setMonth(queryStandardDate.getMonth() - 3);

        // 3개월 전부터 현재까지의 데이터를 MongoDB에서 조회합니다.
        const queryEntireRows = await back.mongoRead("queryAnalytics", { "date.from": { $gte: queryStandardDate } }, { selfMongo });
        
        let middleMatrix;
        let lengthMax;
        let matrix;
        let tempArr;

        // 조회된 데이터들을 날짜 순으로 정렬합니다. 가장 최근의 데이터가 먼저 오도록 정렬됩니다.
        queryEntireRows.sort((a, b) => {
          return b.date.from.valueOf() - a.date.from.valueOf();
        });

        // 각 데이터를 매트릭스 형태로 변환합니다. 날짜와 함께 세부 데이터를 배열로 변환하여 저장합니다.
        middleMatrix = queryEntireRows.map((obj) => {
          return [
            dateToString(obj.date.from),
            ...obj.data.detail
          ];
        });

        // 매트릭스 중 가장 긴 길이를 계산합니다.
        lengthMax = middleMatrix.map((arr) => { return arr.length }).reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);

        matrix = [];

        // 각 열을 순서대로 처리하여 매트릭스 배열을 생성합니다.
        for (let i = 0; i < lengthMax; i++) {
          tempArr = [];
          if (i === 0) {
            // 첫 번째 열의 경우, 날짜 데이터를 추가합니다.
            for (let arr of middleMatrix) {
              tempArr.push(arr[i]);
              tempArr.push('');
            }
          } else {
            // 두 번째 열부터는 각 케이스와 값을 매트릭스에 추가합니다.
            for (let arr of middleMatrix) {
              if (arr[i] !== undefined) {
                tempArr.push(arr[i].case);
                tempArr.push(arr[i].value);
              } else {
                tempArr.push('');
                tempArr.push('');
              }
            }
          }
          // 생성된 배열을 매트릭스에 추가합니다.
          matrix.push(tempArr);
        }

        // 최종적으로 생성된 매트릭스를 반환합니다.
        return [ matrix ];

      } catch (e) {
        // 에러 발생 시 콘솔에 에러를 출력합니다.
        console.log(e);
      }
    };

    /**
     * 계약된 고객 정보를 바탕으로 다양한 통계 정보를 계산하고 매트릭스를 생성하는 함수입니다.
     * 
     * @param {Array} sixth - 계약된 고객 정보 배열
     * @returns {Promise<Array>} 계약된 고객 정보를 기반으로 생성된 매트릭스를 반환
     */
    const tenthParsingMatrix = async (sixth) => {
      try {
        // 주어진 고객 정보 배열을 깊은 복사하여 새로운 배열로 만듭니다.
        const tenth = equalJson(JSON.stringify(sixth)).slice(1);
        
        // 계약된 고객 수를 계산합니다.
        const length = tenth.length;

        let regionSet;
        let pyeongSet;
        let serviceSet;
        let familySet;
        let livingSet;
        let sourceSet;
        let budgetSet;
        let feeSet;
        let adSet;
        let ratioFunction, sortFunction, mapFunction;
        let maxLength;
        let mapArr;

        // 비율 계산 함수: 각 항목의 비율을 전체 고객 수에 대해 계산하여 obj.ratio에 저장합니다.
        ratioFunction = (obj, index) => {
          obj.ratio = length === 0 ? 0 : obj.value / length;
        };

        // 정렬 함수: 비율을 기준으로 내림차순 정렬합니다.
        sortFunction = (a, b) => { return b.ratio - a.ratio; };

        // 맵핑 함수: 케이스와 값, 비율을 배열로 변환합니다.
        mapFunction = (obj) => {
          return [obj.case, obj.value, obj.ratio];
        };

        // 지역 정보를 담는 객체 배열을 초기화합니다.
        regionSet = [
          { case: "서울", value: 0 },
          { case: "경기", value: 0 },
          { case: "충청", value: 0 },
          { case: "강원", value: 0 },
          { case: "경상", value: 0 },
          { case: "전라", value: 0 },
          { case: "제주", value: 0 },
          { case: "기타", value: 0 },
        ];

        // 평수 정보를 담는 객체 배열을 초기화합니다.
        pyeongSet = [
          { case: "10평 미만", value: 0 },
          { case: "10평대", value: 0 },
          { case: "20평대", value: 0 },
          { case: "30평대", value: 0 },
          { case: "40평대", value: 0 },
          { case: "50평대", value: 0 },
          { case: "60평 이상", value: 0 }
        ];

        // 서비스 종류를 담는 객체 배열을 초기화합니다.
        serviceSet = [
          { case: "홈퍼니싱", value: 0 },
          { case: "홈스타일링", value: 0 },
          { case: "토탈 스타일링", value: 0 },
          { case: "엑스트라", value: 0 },
        ];

        // 가족 구성 정보를 담는 객체 배열을 초기화합니다.
        familySet = [
          { case: "1인 가구", value: 0 },
          { case: "부부", value: 0 },
          { case: "기타", value: 0 },
        ];

        // 거주 상태를 담는 객체 배열을 초기화합니다.
        livingSet = [
          { case: "이사", value: 0 },
          { case: "거주중", value: 0 },
        ];

        // 소스 정보를 담는 객체 배열을 초기화합니다.
        sourceSet = [
          { case: "메타", value: 0 },
          { case: "네이버", value: 0 },
          { case: "구글", value: 0 },
          { case: "유튜브", value: 0 },
          { case: "카카오", value: 0 },
          { case: "기타", value: 0 }
        ];

        // 예산 정보를 담는 객체 배열을 초기화합니다.
        budgetSet = [
          { case: "500만원 이하", value: 0 },
          { case: "1,000만원대", value: 0 },
          { case: "2,000만원대", value: 0 },
          { case: "3,000만원대", value: 0 },
          { case: "4,000만원대", value: 0 },
          { case: "5,000만원대", value: 0 },
          { case: "6,000만원대", value: 0 },
          { case: "7,000만원대", value: 0 },
          { case: "8,000만원대", value: 0 },
          { case: "9,000만원대", value: 0 },
          { case: "1억원대", value: 0 },
        ];

        // 디자인 비용을 담는 객체 배열을 초기화합니다.
        feeSet = [
          { case: "100만원 이하", value: 0 },
          { case: "100만원대", value: 0 },
          { case: "200만원대", value: 0 },
          { case: "300만원대", value: 0 },
          { case: "400만원대", value: 0 },
          { case: "500만원대", value: 0 },
          { case: "600만원 이상", value: 0 }
        ];

        // 광고 유입 여부를 담는 객체 배열을 초기화합니다.
        adSet = [
          { case: "광고 유입", value: 0 },
          { case: "비광고", value: 0 },
        ];

        // 계약된 고객 정보를 하나씩 순회하며 각 정보를 적절한 객체 배열에 카운트합니다.
        for (let [date, cliid, name, ids, timeline, contract, type, source, campaign, device, referer, address, pyeong, budget, family, living, expected, total, onoff, service0, service1, comment, fee, query] of tenth) {

          // 지역 정보 카운트
          if (/^서울/gi.test(address)) {
            regionSet[0].value++;
          } else if (/^경기/gi.test(address)) {
            regionSet[1].value++;
          } else if (/^충청/gi.test(address)) {
            regionSet[2].value++;
          } else if (/^강원/gi.test(address)) {
            regionSet[3].value++;
          } else if (/^경상/gi.test(address)) {
            regionSet[4].value++;
          } else if (/^전라/gi.test(address)) {
            regionSet[5].value++;
          } else if (/^제주/gi.test(address)) {
            regionSet[6].value++;
          } else {
            regionSet[7].value++;
          }

          // 평수 정보 카운트
          if (pyeong < 10) {
            pyeongSet[0].value++;
          } else if (pyeong >= 10 && pyeong < 20) {
            pyeongSet[1].value++;
          } else if (pyeong >= 20 && pyeong < 30) {
            pyeongSet[2].value++;
          } else if (pyeong >= 30 && pyeong < 40) {
            pyeongSet[3].value++;
          } else if (pyeong >= 40 && pyeong < 50) {
            pyeongSet[4].value++;
          } else if (pyeong >= 50 && pyeong < 60) {
            pyeongSet[5].value++;
          } else {
            pyeongSet[6].value++;
          }

          // 가족 구성 정보 카운트
          if (/1인/gi.test(family)) {
            familySet[0].value++;
          } else if (/부부/gi.test(family)) {
            familySet[1].value++;
          } else {
            familySet[2].value++;
          }

          // 거주 상태 카운트
          if (living === "이사") {
            livingSet[0].value++;
          } else {
            livingSet[1].value++;
          }

          // 서비스 정보 카운트
          if (/퍼니싱/gi.test(service1)) {
            serviceSet[0].value++;
          } else if (/홈스타일링/gi.test(service1)) {
            serviceSet[1].value++;
          } else if (/토탈/gi.test(service1)) {
            serviceSet[2].value++;
          } else {
            serviceSet[3].value++;
          }

          // 디자인 비용 카운트
          if (fee < 1000000) {
            feeSet[0].value++;
          } else if (fee >= 1000000 && fee < 2000000) {
            feeSet[1].value++;
          } else if (fee >= 2000000 && fee < 3000000) {
            feeSet[2].value++;
          } else if (fee >= 3000000 && fee < 4000000) {
            feeSet[3].value++;
          } else if (fee >= 4000000 && fee < 5000000) {
            feeSet[4].value++;
          } else if (fee >= 5000000 && fee < 6000000) {
            feeSet[5].value++;
          } else {
            feeSet[6].value++;
          }

          // 예산 정보 처리
          budget = Number(budget.replace(/[^0-9]/gi, '')) * 10000;

          if (budget < 10000000) {
            budgetSet[0].value++;
          } else if (budget >= 10000000 && budget < 20000000) {
            budgetSet[1].value++;
          } else if (budget >= 20000000 && budget < 30000000) {
            budgetSet[2].value++;
          } else if (budget >= 30000000 && budget < 40000000) {
            budgetSet[3].value++;
          } else if (budget >= 40000000 && budget < 50000000) {
            budgetSet[4].value++;
          } else if (budget >= 50000000 && budget < 60000000) {
            budgetSet[5].value++;
          } else if (budget >= 60000000 && budget < 70000000) {
            budgetSet[6].value++;
          } else if (budget >= 70000000 && budget < 80000000) {
            budgetSet[7].value++;
          } else if (budget >= 80000000 && budget < 90000000) {
            budgetSet[8].value++;
          } else if (budget >= 90000000 && budget < 100000000) {
            budgetSet[9].value++;
          } else {
            budgetSet[10].value++;
          }

          // 소스 정보 카운트
          if (/facebook/gi.test(source) || /instagram/gi.test(source) || /meta/gi.test(source)) {
            sourceSet[0].value++;
          } else if (/naver/gi.test(source)) {
            sourceSet[1].value++;
          } else if (/google/gi.test(source)) {
            sourceSet[2].value++;
          } else if (/youtube/gi.test(source)) {
            sourceSet[3].value++;
          } else if (/daum/gi.test(source) || /kakao/gi.test(source)) {
            sourceSet[4].value++;
          } else {
            sourceSet[5].value++;
          }

          // 광고 유입 여부 카운트
          if (campaign.trim() === "" || /not set/gi.test(campaign.trim())) {
            adSet[1].value++;
          } else {
            adSet[0].value++;
          }

        }

        // 각 항목의 비율을 계산하고 내림차순으로 정렬합니다.
        regionSet.forEach(ratioFunction);
        regionSet.sort(sortFunction);

        pyeongSet.forEach(ratioFunction);
        pyeongSet.sort(sortFunction);

        serviceSet.forEach(ratioFunction);
        serviceSet.sort(sortFunction);

        familySet.forEach(ratioFunction);
        familySet.sort(sortFunction);

        livingSet.forEach(ratioFunction);
        livingSet.sort(sortFunction);

        sourceSet.forEach(ratioFunction);
        sourceSet.sort(sortFunction);

        budgetSet.forEach(ratioFunction);
        budgetSet.sort(sortFunction);

        feeSet.forEach(ratioFunction);
        feeSet.sort(sortFunction);

        adSet.forEach(ratioFunction);
        adSet.sort(sortFunction);

        // 각 세트를 매트릭스로 변환합니다.
        mapArr = [
          regionSet.map(mapFunction),
          pyeongSet.map(mapFunction),
          serviceSet.map(mapFunction),
          familySet.map(mapFunction),
          livingSet.map(mapFunction),
          sourceSet.map(mapFunction),
          budgetSet.map(mapFunction),
          feeSet.map(mapFunction),
          adSet.map(mapFunction),
        ];

        // 매트릭스의 최대 길이를 계산하여, 그 길이에 맞게 배열을 맞춥니다.
        maxLength = mapArr.reduce((acc, curr) => { return acc >= curr.length ? acc : curr.length }, 0);
        mapArr = mapArr.map((arr) => {
          let thisLength;
          thisLength = arr.length;
          for (let i = 0; i < maxLength - thisLength; i++) {
            arr.push(["", "", ""]);
          }
          return arr;
        });

        // 각 항목을 하나의 배열로 합칩니다.
        for (let z = 1; z < mapArr.length; z++) {
          for (let i = 0; i < mapArr[0].length; i++) {
            mapArr[0][i].push('');
            mapArr[0][i].push(mapArr[z][i][0]);
            mapArr[0][i].push(mapArr[z][i][1]);
            mapArr[0][i].push(mapArr[z][i][2]);
          }
        }

        mapArr = mapArr[0];
        mapArr.unshift([
          "지역", "", "", "",
          "평", "", "", "",
          "서비스", "", "", "",
          "가족 구성", "", "", "",
          "이사 여부", "", "", "",
          "소스", "", "", "",
          "예산", "", "", "",
          "디자인비", "", "", "",
          "광고 여부", "", "", "",
        ]);

        // 최종 매트릭스를 반환합니다.
        return mapArr;

      } catch (e) {
        // 에러 발생 시 콘솔에 에러를 출력합니다.
        console.log(e);
      }
    };

    const zeroSheetsId = "1tS-lRBb3yXIC9N-1jgQH--rbigqujGcLRRXEXWCG7xk"; // 제로 스프레드시트 ID
    const firstSheetsId = "1QaJfS2EkrPxek3l1OFBFBoJrOjDh7BiEXFO5tx4rJP4"; // 첫 번째 스프레드시트 ID
    const secondSheetsId = "14xqEKuEhIlTEQL44RlgwPGgdO3TiI8SidNCb7k1y4PU"; // 두 번째 스프레드시트 ID
    const thirdSheetsId = "1X3PeZPj06C6hTsVJWQKCQ8WCF05NhmqUWd6Huyhnd0k"; // 세 번째 스프레드시트 ID
    const fourthSheetsId = "13wUb5uTXktWHRTAezsKKMXO0b7P6slsSQWboeItsYQU"; // 네 번째 스프레드시트 ID
    const fifthSheetsId = "1QFr_a5cnexPyvcKAsIDvcq7SCwHKLAbiQcQGkcoeuAo"; // 다섯 번째 스프레드시트 ID
    const sixthSheetsId = "1d64IEb9S4MIfb0rTQW1ojWI9Tq6utyzdE6MEsEbVvcs"; // 여섯 번째 스프레드시트 ID
    const seventhSheetsId = "1XvZGAalipoQFzwWM178_c8Ect6n2hRf_MV5OfSXGfl8"; // 일곱 번째 스프레드시트 ID
    const snsSheetsId = "1Rz_El0Dtu64876EsJ9od06jsQftiAs1Mfqj3NaReFrw"; // SNS 스프레드시트 ID
    const ninthSheetsId = "1ocaqxxtKIXdyEKV9SodBQW-IzoCWUe8L_dTjKOLGMe8"; // 아홉 번째 스프레드시트 ID
    const tenthSheetsId = "18-Kpl062mlA9fyTXgP_RWZvmhCZsg1sMi0Y0cx4qaS0"; // 열 번째 스프레드시트 ID
    const firstNewSheetsId = "1zIA6AdkY2uZO4Lg3qykbiionnbYOBjVzQut5Oir_tEs"; // 새로운 첫 번째 스프레드시트 ID
    const kakaoSheetsId = "1pLZwub_dSBDmOZig6MPPyiTKLNKe6MQATXEH6l5tet4"; // 카카오 스프레드시트 ID
    
    // 월간 스프레드시트 ID 모음
    const monthSheets = {
      totalFunnelMonthMatrix: "1jmbTM-pKZ6hwWtQyEsQPuKsT2t3YtVsEo6XuU6kqENU",
      facebookPaidMonthMatrix: "1EVBjmpFlqmitvQkkWM6K2NWH7h8I-r0vxe7Dub2HLZM",
      naverPaidMonthMatrix: "1xkcwOZRAwsXC6JGeSio-Ubm--dr4ddxgG6gdGZb52xc",
      googlePaidMonthMatrix: "1w_SCBYBlocVsD5QQNR-1l3i-mYOODbSFxmJnL75inag",
      kakaoPaidMonthMatrix: "1cjTz6i5G1hHXZZXjXGv-ZeL4O96rRL7D5MmWbReg0DI",
    };
    
    // 주간 스프레드시트 ID 모음
    const weekSheets = {
      totalFunnelWeekMatrix: "19ed2yeKFQvYIHOHSQ14BK8vAj-H6_jrCviQWfLzOTzw",
      facebookPaidWeekMatrix: "1-A0v7Ox22l5wcS2H-gYkq200BZrAakKBMa3muwm8eKg",
      naverPaidWeekMatrix: "1q3NFIYnbFCuQUgJRWvgchFOdAeIQxaWmkbAPIuqY1AU",
      googlePaidWeekMatrix: "15Rd2JbqCcm9LjIIMuPVm0U13cDJC_uYxyPdFRjf4b2Y",
      kakaoPaidWeekMatrix: "1_HiuwxXmyWtoKKTt_cWvLfss8H_tQcebbY7qwWwVJKg",
    };
    
    // marketingBasicMatrix 함수 호출로부터 필요한 데이터를 가져옵니다.
    const {
      matrix: [first, firstNew, second, third, fourth, fifth, sixth, seventh, sns, kakao],
      month: { totalFunnelMonthMatrix, facebookPaidMonthMatrix, naverPaidMonthMatrix, googlePaidMonthMatrix, kakaoPaidMonthMatrix },
      week: { totalFunnelWeekMatrix, facebookPaidWeekMatrix, naverPaidWeekMatrix, googlePaidWeekMatrix, kakaoPaidWeekMatrix }
    } = await marketingBasicMatrix(startDay);
    
    // 각 시트에 데이터를 업데이트합니다.
    const newFirst = await applyUpdate(firstSheetsId, first);
    const newSecond = await applyUpdate(secondSheetsId, second);
    const newThird = await applyUpdate(thirdSheetsId, third);
    const newFourth = await applyUpdate(fourthSheetsId, fourth);
    const newFifth = await applyUpdate(fifthSheetsId, fifth);
    const newSixth = await applyUpdate(sixthSheetsId, sixth);
    const newSeventh = await applyUpdate(seventhSheetsId, seventh);
    const newSns = await applyUpdate(snsSheetsId, sns);
    const newKakao = await applyUpdate(kakaoSheetsId, kakao);
    
    // 첫 번째 시트에 새로운 데이터를 업데이트합니다.
    await applyUpdate(firstNewSheetsId, firstNew);
    
    // subAnalyticsMatrix 함수로부터 아홉 번째 데이터를 가져와 시트를 업데이트합니다.
    const [ninth] = await subAnalyticsMatrix(startDay);
    
    // tenthParsingMatrix 함수로부터 열 번째 데이터를 가져와 시트를 업데이트합니다.
    const tenth = await tenthParsingMatrix(newSixth);
    
    // 열 번째 시트를 업데이트합니다.
    await sheets.update_value_inPython(ninthSheetsId, "", ninth);
    await sheets.update_value_inPython(tenthSheetsId, "", tenth);
    
    // 월간 데이터를 업데이트합니다.
    await applyUpdate(monthSheets.totalFunnelMonthMatrix, totalFunnelMonthMatrix);
    await applyUpdate(monthSheets.facebookPaidMonthMatrix, facebookPaidMonthMatrix);
    await applyUpdate(monthSheets.naverPaidMonthMatrix, naverPaidMonthMatrix);
    await applyUpdate(monthSheets.googlePaidMonthMatrix, googlePaidMonthMatrix);
    await applyUpdate(monthSheets.kakaoPaidMonthMatrix, kakaoPaidMonthMatrix);
    
    // 주간 데이터를 업데이트합니다.
    await applyUpdate(weekSheets.totalFunnelWeekMatrix, totalFunnelWeekMatrix);
    await applyUpdate(weekSheets.facebookPaidWeekMatrix, facebookPaidWeekMatrix);
    await applyUpdate(weekSheets.naverPaidWeekMatrix, naverPaidWeekMatrix);
    await applyUpdate(weekSheets.googlePaidWeekMatrix, googlePaidWeekMatrix);
    await applyUpdate(weekSheets.kakaoPaidWeekMatrix, kakaoPaidWeekMatrix);
    
    console.log("sheets update all done"); // 모든 스프레드시트 업데이트 완료 로그 출력
    
    // 데이터베이스 연결을 종료합니다.
    await selfCoreMongo.close();
    await selfContentsMongo.close();
    
    // 슬랙에 메시지를 보냅니다.
    slackMessage = '';
    slackMessage += dateToString(today) + " MPR 시트를 업데이트 하였습니다!";
    slackMessage += "\n";
    slackMessage += "https://docs.google.com/spreadsheets/d/" + zeroSheetsId + "/edit?usp=sharing";
    await messageSend({
      text: slackMessage,
      channel: "#500_marketing",
    });
    
    return true;

  } catch (e) {
    console.log(e);
    await selfCoreMongo.close();
    await selfContentsMongo.close();
    return false;
  }
}

/**
 * LogReport 클래스의 unknownCampaign 메서드는 특정 년도와 월에 대한 "unknown" 키워드를 포함하는 캠페인을 생성하여 MongoDB에 저장합니다.
 * 만약 이미 동일한 키워드의 캠페인이 존재할 경우, 기존 데이터를 삭제하고 새로운 데이터를 생성합니다.
 *
 * @param {number} year - 연도 값
 * @param {number} month - 월 값 (1월부터 12월까지)
 * @param {number} amount - 캠페인의 차지(비용) 값
 * @returns {Promise<void>} - 반환 값 없음, 비동기 작업이 완료되면 종료됨
 */
LogReport.prototype.unknownCampaign = async function (year, month, amount) {
  const instance = this; // 현재 LogReport 인스턴스를 instance에 저장
  const back = this.back; // back 객체를 LogReport 인스턴스에서 가져와 사용
  const { dateToString, zeroAddition } = this.mother; // Mother 객체에서 dateToString과 zeroAddition 메서드를 구조 분해 할당으로 가져옴

  try {
    const campaignCollection = "dailyCampaign"; // MongoDB 컬렉션 이름을 "dailyCampaign"으로 설정
    const selfMongo = instance.mongo; // MongoDB 연결 객체를 selfMongo에 저장
    let dummy; // 더미 데이터를 저장할 변수 선언
    let standardDate; // 기준 날짜를 저장할 변수 선언
    let unknownKeyword; // "unknown" 키워드를 저장할 변수 선언
    let idKeyword; // 캠페인 ID 키워드를 저장할 변수 선언
    let standardTomorrow; // 기준 날짜의 다음 날을 저장할 변수 선언
    let tempRows; // 임시로 데이터를 저장할 배열 선언
    let key; // MongoDB에서 사용될 키를 저장할 변수 선언

    // 기준 날짜를 주어진 년도와 월의 첫 번째 날로 설정
    standardDate = new Date(year, month - 1, 1);
    // 기준 날짜의 다음 날을 설정
    standardTomorrow = new Date(year, month - 1, 1);
    standardTomorrow.setDate(standardTomorrow.getDate() + 1);
    unknownKeyword = "unknown"; // "unknown" 키워드를 unknownKeyword에 저장
    idKeyword = "g"; // 캠페인 ID의 시작 부분을 "g"로 설정
    // 기준 날짜를 사용하여 키 값을 생성 (형식: YYYYMMDD_unknown)
    key = dateToString(standardDate).replace(/\-/gi, '') + "_" + unknownKeyword;

    // 더미 데이터 생성
    dummy = {
      camid: idKeyword + String(year).slice(2) + zeroAddition(month) + "_un" + zeroAddition(1) + "s", // 캠페인 ID 생성
      key: key, // 키 값을 더미 데이터에 포함
      date: {
        from: standardDate, // 시작 날짜를 더미 데이터에 포함
        to: standardTomorrow, // 종료 날짜를 더미 데이터에 포함
      },
      value: {
        charge: amount, // 주어진 비용 값을 더미 데이터에 포함
        performance: {
          impressions: 0, // 노출 수를 0으로 초기화
          clicks: 0, // 클릭 수를 0으로 초기화
        }
      },
      information: {
        mother: unknownKeyword, // 정보에 "unknown" 키워드를 포함
        type: unknownKeyword, // 정보 유형에 "unknown"을 포함
        id: {
          account: unknownKeyword, // 계정 ID를 "unknown"으로 설정
          campaign: unknownKeyword, // 캠페인 ID를 "unknown"으로 설정
        },
        name: unknownKeyword // 캠페인 이름을 "unknown"으로 설정
      }
    };

    // MongoDB에서 해당 키와 일치하는 데이터를 조회
    tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
    if (tempRows.length !== 0) {
      // 동일한 키를 가진 데이터가 존재할 경우, 기존 데이터를 삭제
      await back.mongoDelete(campaignCollection, { key }, { selfMongo });
    }
    // 새로운 더미 데이터를 MongoDB에 생성
    await back.mongoCreate(campaignCollection, dummy, { selfMongo });

    // 생성된 더미 데이터를 콘솔에 출력
    console.log(dummy);

  } catch (e) {
    // 에러가 발생할 경우, 에러 메시지를 콘솔에 출력
    console.log(e);
  }
}

module.exports = LogReport;
