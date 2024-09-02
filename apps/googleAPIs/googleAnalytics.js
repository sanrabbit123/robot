/**
 * GoogleAnalytics 클래스는 Google Analytics API와 관련된 다양한 작업을 수행하기 위한 설정과 메서드를 제공합니다.
 * @constructor
 */
const GoogleAnalytics = function () {
  // Mother 클래스와 BackMaker 클래스를 불러와 각각의 인스턴스를 생성합니다.
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  
  this.mother = new Mother(); // Mother 클래스의 인스턴스
  this.back = new BackMaker(); // BackMaker 클래스의 인스턴스

  // Google API와 관련된 설정 및 파일 경로를 정의합니다.
  this.address = require(`${process.cwd()}/apps/infoObj.js`); // 주소 관련 설정 객체
  this.dir = process.cwd() + "/apps/googleAPIs"; // Google API 관련 작업을 수행할 디렉토리 경로
  this.pythonApp = this.dir + "/python/app.py"; // Google API를 위한 Python 스크립트 경로
  this.tempDir = process.cwd() + "/temp"; // 임시 파일 저장 디렉토리 경로
  this.tokenDir = this.dir + "/python/google/tokens"; // Google API 토큰 저장 디렉토리 경로
  this.iamSecrets = process.cwd() + "/temp/iam_secrets.json"; // IAM 비밀 키 저장 경로
  this.envConst = "GOOGLE_APPLICATION_CREDENTIALS"; // 환경 변수 이름
  this.projectId = ""; // Google Cloud 프로젝트 ID
  this.ready = false; // 초기화 완료 여부를 나타내는 플래그
  this.propertyId = "227717726"; // Google Analytics의 Property ID
  this.property = `properties/${this.propertyId}`; // Property 경로
  this.collection = "homeliaisonAnalytics"; // MongoDB의 컬렉션 이름
  this.clientAnalyticsCollection = "clientAnalytics"; // 클라이언트 분석 데이터 컬렉션 이름
  this.realtimeCollection = "realtimeAnalytics"; // 실시간 분석 데이터 컬렉션 이름
  this.unknownKeyword = "(not set)"; // 미지정 키워드 처리용 문자열
  this.nullWords = "null"; // NULL 값을 나타내는 문자열
}

/**
 * 문자열을 받아서 Date 객체로 변환하는 메서드입니다.
 * 이 메서드는 YYYYMMDDHHMM 형식의 날짜 문자열을 받아 Date 객체로 변환합니다.
 * @param {string} str - 변환할 날짜 문자열 (형식: YYYYMMDDHHMM)
 * @return {Date} - 변환된 Date 객체
 */
GoogleAnalytics.prototype.returnDate = function (str) {
  str = String(str); // 입력된 값을 문자열로 변환
  const year = str.slice(0, 4); // 문자열의 처음 4자리에서 년도를 추출
  const month = str.slice(4, 6); // 그 다음 2자리에서 월을 추출
  const date = str.slice(6, 8); // 그 다음 2자리에서 일을 추출
  const hour = str.slice(8, 10); // 그 다음 2자리에서 시간을 추출
  const minute = str.slice(10, 12); // 그 다음 2자리에서 분을 추출
  const second = "00"; // 초는 항상 00으로 설정

  // 추출한 년, 월, 일, 시, 분, 초 정보를 사용해 Date 객체를 생성하고 반환
  return new Date(Number(year), Number(month) - 1, Number(date), Number(hour), Number(minute), Number(second));
}

/**
 * Google Analytics의 자격 증명을 설정하는 비동기 함수입니다.
 * 이 함수는 Google Cloud IAM 자격 증명을 설정하여, Google Analytics API에 접근할 수 있도록 합니다.
 * @async
 */
GoogleAnalytics.prototype.setCredentials = async function () {
  const instance = this; // 현재 인스턴스 참조
  const { envConst, iamSecrets } = this; // 환경 변수와 IAM 비밀 키 파일 경로를 참조
  const { fileSystem, decryptoHash } = this.mother; // Mother 클래스의 파일 시스템 및 해시 해독 기능 참조

  try {
    let jsonContents; // IAM 비밀 키 JSON 파일의 내용을 저장할 변수

    // 암호화된 문자열을 복호화하여 JSON 문자열로 변환합니다.
    const hex = `91e007520eb387eb42be0e118488daba8d200e311919099f9577c44baf4b79c972f9dc75825287e8a26de40d5c450587785ab48f4096d57e0310b377def4481497308512a915f7bd79c5caa6c6163b999f5183e2365572727f99c86e90e129f80d253dc1578aa9aa390f4eb20a7054b14cb64769bf7f7b1d7c7ed43d8f69d531691ece8e467bb1abfdce9437e252cb413e5b68cf6cbcc83c866b321bc86031c429d81c2f2b61c659b7eab8840ecb2b45ba7fe0a707ba60f24db22142bda41f8ca154b1501a4f72bb14f9608ea2dbdfcf2214b2d28479686e3de62c79cb23241c2f5b906212cd549c561ba64e5ffe66b817836e456e7e2f5bbe894eee462b4e5d2760978e91a8d96b3c3ffd7c773fb54e71087b1373b0abb2393c91a128a4c5f99a4d78469d16441db66cefe32714a3beca096b7e98e3b422697eae9dfd31db4eeecef4387ee5eba85643670835e51931e7efa10bc2aeaf39f9f1da59762506d93bfa587f91b224ab0ca521a8900144a9cf0df602c89b08cbdddb58f40386e12a125b8dacb40e6281014599d1b545e8a5253499beb158c88214dcd09617a5049a0a7b4e53b60703744aace1a84bb98ab60a1adc8537c931c180a10faa41f1dbbe65400105d9d495c232750dc9ca4f3769ad4fb05626f3ed9a6ef61bb74eae51705a40a18dca70958dcdd300746046b3df51c6d171460b5d6ff79ffe3f8c93143413cdc0f43477543b6752c72ac11e9d7e2369201a9a2345745e60659b4e851b2442c8811957602b3dbbc00a80353c875424bf8933fe1ba91527c04fda01eff39c1e1264d828511f92db0edb7b34f0737d48452814a6505dab6760c430173b51d1ba24a2b3c5a5d369aa2c5a0c0b57b8cdb1cf20015862e4c249334d57f12779237264df9bc6104b33cc5adba4d660ff95e328a3b19dde53701c01d10dd7736a04fd31502cbf1448341be9ab86ed6b7f21b3040927658bfbb0de8ce425a8b43e5ada9c7c81fd20c9fd6fdec689f060955285c64616de2bccda0c3723791bde33bc89359e7a6ef41a7754909d151f9adc0c3bf330eff40454b817e71dd9b98e4463ef43ad33d4981c953a3861a6488056a712f76840438aee095208e154e62da080c664876907f28b669abce976b2ed0b70e70453bceaf8c04c0da93ec8c4fba6c74600bd05ee320547d1a25bf79067539338f6ed26a02bc6545a7cf0ec4a89897c8962394c9c51477b4b5059612c2e5f9975fb3aa8204384ecbb3424c4f633e91ea8fd4e631c78145e4046c57f3102c0e9926594fd8d5fd4713d6cc606059332b7a9506094fda4649b2b5c7e50ecaed0d83444ab9ea478bdb3b23b9b33d4bf53637d88f3abf0f68ee548a7714f3f0b9570cb5d3228452f1293733d65df187f2b6bb72906961ee6c6d6bc245d7946262d1be597ff8a9e50df7c337444edb8e38a27312e56bbacf481383e50777b806a1dfd2bbf8eb92823bf6247007a7ef60c253ded2ccad82f440a8537a9e569f1d332abb033e291621b672254712218132093303210bb8edb74f5db4965a5f71cdaf190a488cb7afd512c34b22218cedd146531632c734d45f2d2f87723e0aa853cea787ac4dbc7cda034d07220cdef8dfef49304d74a1db490e2b14433a8a20b0d0977df4f5fb07d62e7a373f52ee46979c3598156d35b2ac2cc7864561ecf2eb041d74e9231371ca7f99d53de4dfb1bcd24b76f9886bc1712296d1d385d63e58a7ea644b6527e1b6534c58679a33677157c03988e38ca4253ca33f9bc2a75870ee8c021e265724cbb479aec31296d8bef03ff223f8ec9b353ea9995794ed59dc3fe44842f740a6466ea959abc2272aa0533babaea695b49186a9d9dc4f3db3033c1524d92c1e4c3649d574c11def62642c1412ef4694cfdf4ed1d9709dd285582d346d2863b2bbea6bdfa055a7e3ad4c01ac751705998970ebfcd815425981d186e9cda09aa83abe52e24f01dd55a93232ab9b2c43f18edae531fefaf3479385ec8f439e0b6009d282f5cfe1e17f8dfac08324cb7eb9236820496392196f248e66d3b1c0f4b0acff6012bfd11771849e173881c13b7aad9db18c68c38cb4c20f0aafc203ba818783f1e788fb4faec44b0af3cb80f8266b92e96778d907377e167dfb02aa73a3573561974cb07b717e889aa4a8f4700c589113e2394bf8c2b5e0d5e0370f696f2fd70e7d58fb38990ab5a448b97a2a2cec1af89ae74bc0f4bf70fbde25022a9ce30a1baa14adf9a0d166dcce2339d0e039bbbe7e859287ab2792b0ab5dfdb71a6ad03053574fe1a92bbc2d228b77bd862c9a1664c73e119277fe293bc41fb8f69dcdee2eb25c72a9af1ea549fe930ac68208398b45c54a364486b1656fffb4ee9c1098a7c180ef1c792ca336156135bd40ab395f5342c2360e5b29ceadf86f3bf97e174b944f10f1a43e88e2f21584cca5a4e90076f965a4a10c7a8e155db51e8f5a770e0d1514a1e0524704b3acf4371ea9e9fb7db91238ee445a4aa3f1793477374d0b61d7234728e5c94dc8ac97f72a24ccdd65b9ed05c927ff30f6d2673f9e7e12c364224223b161d1e1b5682043e6d5e0f60700591c1aacc809cde103a33f11ab8b970da08e294c63e34334738abd75093f2225529e54b0cfe48a3d54af3ecbcbb43d008b7b5e80d328b4a33d3e04fd15422257c09a3a7e9472d432398aa5f1e38e27a92fc39169f33e8f1f0f2671bb2dcd936913bad18fb094515738a8c00a85daa5db919a108b4ec409c14462233687e2d44060435b1e5b0f4067642a9dd95b0d24951433776432339d9366f0a604e72ff6d7621592baf57e7a6638bb606c211c044e5fd4deca12713e1740ffe511a312e5efebe0d4316fa484df18ec2483bcd78184c744ee977b1a800002b7275509f2c8921feb739b1b09325dcf1a01104d4ffb29b7a623692529d4c42332c820f6266871d9323014e169d02d6d0b88feaf3f2b53d4c38de2531c49e5d87f12ad8e74b83274f4b26d667e943f1980ff9704b012a5264997ee6bd15cc707d1c095fa3854aef21c842e258ca171649b73cc162f92f906fbad6df78a43fd844e8a42c4fe9efa9a239136bd4a935bce747803fdc5f359f13522ce2e9a2f902294a165b603630c69266edf76eda8f5a43dc62b4e890678a6acfa7a512e101a4f1e38f2a2f0a66dbd9e499d77e405a3233fbf30f90d7cd2cf48403a2a9855cf63406d10efb2b8252fbc787fbae24f8316645f8e5fe5a10e83903deeaad77b75f1b93811f4514a1943d7bbe9ef5913f9d0be41f2fc7deffa6c77dc8c2d14dc3c1ec6ee3e6db0bd0b7596d2ed9a96974d16642e2d7206de6c0570529687c5a025ffb07c8a12a167b1affa1e82b2d61e16bb55e944b3a7164c36d64c1c41885`; // 암호화된 비밀 키
    
    // decryptoHash 메서드를 사용하여 hex 값을 복호화하고, JSON 문자열로 변환합니다.
    // 이 과정에서 JSON 형식에 맞게 줄 바꿈과 공백을 처리합니다.
    const jsonString = (await decryptoHash("homeliaison", hex))
      .replace(/\n/gi, "\\n") // 모든 줄 바꿈 문자를 이스케이프 처리
      .replace(/,\\n/gi, ",") // 콤마 뒤의 줄 바꿈 문자를 제거
      .replace(/\\n[ ]*\}/, "}") // JSON 객체의 끝에 있는 불필요한 줄 바꿈 제거
      .replace(/\{\\n/, "{"); // JSON 객체의 시작 부분의 줄 바꿈 제거
    
    // 복호화된 JSON 문자열을 IAM 비밀 키 파일 경로에 저장합니다.
    await fileSystem(`writeString`, [iamSecrets, jsonString]);

    // 환경 변수에 IAM 비밀 키 파일 경로를 설정합니다.
    process.env[envConst] = iamSecrets;

    // 파일 시스템에서 IAM 비밀 키 파일을 읽어와 JSON 객체로 변환합니다.
    jsonContents = await fileSystem(`readJson`, [iamSecrets]);

    // 프로젝트 ID를 JSON 파일에서 추출하여 설정합니다.
    this.projectId = jsonContents["project_id"];
    this.ready = true; // 자격 증명이 성공적으로 설정되었음을 표시

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * Google Analytics 데이터를 조회하여 분석 결과 객체를 반환하는 비동기 함수입니다.
 * 주어진 메트릭과 차원에 따라 Google Analytics 보고서를 생성하고, 
 * 해당 보고서의 결과를 파싱하여 특정 형식으로 반환합니다.
 * @async
 * @param {object} analyticsDataClient - Google Analytics 데이터 클라이언트 객체.
 * @param {string} startDate - 조회할 데이터의 시작 날짜 (YYYY-MM-DD 형식).
 * @param {string} endDate - 조회할 데이터의 종료 날짜 (YYYY-MM-DD 형식).
 * @param {string} metric - 조회할 메트릭의 이름.
 * @param {Array.<Object>} dimensionsArr - 차원 배열로, 각 차원 객체는 title, name, filter 속성을 가집니다.
 * @param {object|null} [dimensionFilter=null] - 선택적 차원 필터 객체.
 * @returns {object|null} 조회된 분석 결과 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
GoogleAnalytics.prototype.returnAnalyticsObjectExecute = async function (analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter = null) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수
  const { property } = this; // 현재 인스턴스의 property 속성 참조
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition } = this.mother; // Mother 클래스의 여러 유틸리티 메서드 참조

  try {
    let metrics, dimensions; // 메트릭과 차원 변수 선언
    let thisCases, thisTotal, thisKinds; // 케이스, 총합, 종류 수를 저장할 변수 선언
    let detailObj; // 세부 데이터를 저장할 객체 선언
    let metricResult; // 최종 결과를 저장할 객체 선언
    let parsingResponse; // 응답 파싱을 위한 함수 선언
    let reportRequest; // Google Analytics 보고서 요청 객체 선언

    // Google Analytics API 응답을 파싱하는 함수
    parsingResponse = (arr) => {
      const [response] = arr; // 응답 배열에서 첫 번째 요소만 사용
      const result = response.rows.map((obj) => {
        let arr = [];
        for (let i = 0; i < obj.dimensionValues.length; i++) {
          arr.push({
            case: obj.dimensionValues[i].value, // 각 차원의 값
            value: Number(obj.metricValues[i].value), // 메트릭 값을 숫자로 변환하여 저장
          });
        }
        return arr;
      }).flat(); // 다차원 배열을 평탄화
      result.sort((a, b) => b.value - a.value); // 값에 따라 내림차순으로 정렬
      return result;
    };

    metricResult = {}; // 메트릭 결과 객체 초기화
    metrics = [{ name: metric }]; // 요청할 메트릭 설정
    detailObj = {}; // 세부 데이터 객체 초기화

    // 각 차원에 대해 데이터를 조회하고 결과를 처리하는 반복문
    for (let { title, name, filter } of dimensionsArr) {
      dimensions = [{ name }]; // 차원 설정
      reportRequest = { property, dateRanges: [{ startDate: startDate, endDate: endDate }], dimensions, metrics }; // 보고서 요청 객체 생성
      if (dimensionFilter !== null) {
        reportRequest.dimensionFilter = dimensionFilter; // 필터가 있는 경우 요청에 추가
      }
      
      // 보고서를 실행하고 결과를 파싱하여 저장
      thisCases = parsingResponse(await analyticsDataClient.runReport(reportRequest));
      
      // 필터 함수가 존재하면 적용
      if (typeof filter === "function") {
        thisCases = thisCases.map((obj) => {
          obj.case = filter(obj.case); // 필터링된 값으로 업데이트
          return obj;
        });
      }
      
      // 총합과 종류 수 계산
      thisTotal = thisCases.reduce((acc, curr) => acc + curr.value, 0);
      thisKinds = thisCases.length;
      
      // 세부 데이터 객체에 결과 저장
      detailObj[title] = {
        cases: thisCases,
        total: thisTotal,
        kinds: thisKinds,
      };
    }

    // 전체 메트릭 결과의 총합 계산
    metricResult.total = Object.values(detailObj).reduce((acc, curr) => acc >= curr.total ? acc : curr.total, 0);
    metricResult.detail = detailObj; // 세부 데이터를 최종 결과에 추가

    return metricResult; // 최종 결과 반환

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
};

/**
 * Google Analytics 데이터를 조회하여 분석 결과 객체를 반환하는 비동기 함수입니다.
 * 주어진 메트릭과 차원에 따라 Google Analytics 보고서를 생성하고, 
 * 재시도를 통해 데이터를 성공적으로 조회할 때까지 반복 시도합니다.
 * @async
 * @param {object} analyticsDataClient - Google Analytics 데이터 클라이언트 객체.
 * @param {string} startDate - 조회할 데이터의 시작 날짜 (YYYY-MM-DD 형식).
 * @param {string} endDate - 조회할 데이터의 종료 날짜 (YYYY-MM-DD 형식).
 * @param {string} metric - 조회할 메트릭의 이름.
 * @param {Array.<Object>} dimensionsArr - 차원 배열로, 각 차원 객체는 title, name, filter 속성을 가집니다.
 * @param {object|null} [dimensionFilter=null] - 선택적 차원 필터 객체.
 * @returns {object|null} 조회된 분석 결과 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
GoogleAnalytics.prototype.returnAnalyticsObject = async function (analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter = null) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수
  const { sleep, emergencyAlarm } = this.mother; // Mother 클래스에서 제공하는 sleep 및 emergencyAlarm 메서드 참조
  
  try {
    let result; // 분석 결과를 저장할 변수
    let safeNum; // 안전한 재시도를 위한 카운터 변수

    // 잠시 대기 후 첫 번째 시도 실행
    await sleep(500);
    result = await this.returnAnalyticsObjectExecute(analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter);

    safeNum = 0; // 재시도 카운터 초기화

    // 결과가 null인 경우 최대 10번 재시도
    while (result === null) {
      await sleep(5 * 1000); // 5초 대기
      result = await this.returnAnalyticsObjectExecute(analyticsDataClient, startDate, endDate, metric, dimensionsArr, dimensionFilter);
      safeNum++; // 재시도 카운터 증가

      if (safeNum > 10) {
        break; // 10번을 초과하면 반복 종료
      }
    }

    // 여전히 결과가 null이면 에러 처리
    if (result === null) {
      throw new Error("metric fail"); // 에러 메시지 던지기
    }

    return result; // 성공적으로 조회된 결과 반환

  } catch (e) {
    // 오류 발생 시 비상 알림 호출 및 로그 출력
    await emergencyAlarm("metric fail (GoogleAnalytics.prototype.returnAnalyticsObject): " + e.message);
    console.log(e);
    return null; // null 반환하여 오류 발생 알림
  }
}

/**
 * 주어진 날짜에 대한 Google Analytics 일별 메트릭 데이터를 수집하고 분석 결과를 반환하는 비동기 함수입니다.
 * 사용된 메트릭은 사용자, 조회수, 이벤트, 전환(팝업 열기 및 상담 페이지) 등이 포함됩니다.
 * @async
 * @param {Date} thisDate - 수집할 메트릭의 대상이 되는 날짜.
 * @returns {object|null} 수집된 메트릭 데이터를 포함하는 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
GoogleAnalytics.prototype.dailyMetric = async function (thisDate) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, emergencyAlarm, sleep } = this.mother; // Mother 클래스에서 필요한 메서드들을 참조
  const { BetaAnalyticsDataClient } = require("@google-analytics/data"); // Google Analytics Data API 클라이언트 모듈을 가져옴
  
  try {
    let startDate, endDate; // 시작 날짜와 종료 날짜를 저장할 변수
    let userMetric, userDimensions; // 사용자 메트릭과 차원을 저장할 변수
    let viewMetric, viewDimensions; // 조회수 메트릭과 차원을 저장할 변수
    let eventMetric, eventDimensions; // 이벤트 메트릭과 차원을 저장할 변수
    let conversionPopupOpenMetric, conversionPopupOpenDimensions; // 전환(팝업 열기) 메트릭과 차원을 저장할 변수
    let conversionConsultingPageMetric, conversionConsultingPageDimensions; // 전환(상담 페이지) 메트릭과 차원을 저장할 변수
    let analyticsDataClient; // Google Analytics 데이터 클라이언트를 저장할 변수
    let dataObject; // 수집된 데이터를 저장할 객체
    let finalObj; // 최종적으로 반환할 객체
    let start; // 현재 날짜를 나타내는 변수
    let next; // 다음 날짜를 나타내는 변수

    // thisDate가 Date 객체인지 확인
    if (!(thisDate instanceof Date)) {
      throw new Error("invalid input"); // Date 객체가 아니면 오류 발생
    }

    // 시작 날짜와 종료 날짜를 동일하게 설정
    startDate = new Date(JSON.stringify(thisDate).slice(1, -1));
    endDate = new Date(JSON.stringify(thisDate).slice(1, -1));
    startDate = dateToString(startDate);
    endDate = dateToString(endDate);

    // Google Analytics 인증을 설정하고 데이터 클라이언트 생성
    await this.setCredentials();
    analyticsDataClient = new BetaAnalyticsDataClient();
    dataObject = {}; // 수집된 데이터를 저장할 객체 초기화

    await sleep(500); // API 호출 전 500ms 대기

    // 사용자 메트릭 설정
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "country", name: "country", meaning: "국가", filter: null },
      { title: "city", name: "city", meaning: "도시", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);
    if (dataObject.users === null) {
      throw new Error("users parsing fail"); // 사용자 메트릭 수집 실패 시 오류 발생
    }

    await sleep(500); // 다음 API 호출 전 500ms 대기

    // 조회수 메트릭 설정
    viewMetric = "screenPageViews";
    viewDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "referer", name: "pageReferrer", meaning: "레퍼럴", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.views = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, viewMetric, viewDimensions);
    if (dataObject.views === null) {
      throw new Error("views parsing fail"); // 조회수 메트릭 수집 실패 시 오류 발생
    }

    await sleep(500); // 다음 API 호출 전 500ms 대기

    // 이벤트 메트릭 설정
    eventMetric = "eventCount";
    eventDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "eventName", name: "eventName", meaning: "이벤트 이름", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.events = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, eventMetric, eventDimensions);
    if (dataObject.events === null) {
      throw new Error("events parsing fail"); // 이벤트 메트릭 수집 실패 시 오류 발생
    }

    // 전환 데이터를 저장할 객체 초기화
    dataObject.conversion = {};

    await sleep(500); // 다음 API 호출 전 500ms 대기

    // 전환 - 팝업 열기 메트릭 설정
    conversionPopupOpenMetric = "eventCount";
    conversionPopupOpenDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.conversion.popupOpen = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionPopupOpenMetric, conversionPopupOpenDimensions, { filter: { fieldName: "eventName", stringFilter: { matchType: "CONTAINS", value: "popupOpen", caseSensitive: true } } });
    if (dataObject.conversion.popupOpen === null) {
      throw new Error("conversion.popupOpen parsing fail"); // 팝업 열기 전환 메트릭 수집 실패 시 오류 발생
    }

    await sleep(500); // 다음 API 호출 전 500ms 대기

    // 전환 - 상담 페이지 메트릭 설정
    conversionConsultingPageMetric = "screenPageViews";
    conversionConsultingPageDimensions = [
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    dataObject.conversion.consultingPage = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionConsultingPageMetric, conversionConsultingPageDimensions, { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "consulting.php", caseSensitive: true } } });
    if (dataObject.conversion.consultingPage === null) {
      throw new Error("conversion.consultingPage parsing fail"); // 상담 페이지 전환 메트릭 수집 실패 시 오류 발생
    }

    // 최종적으로 반환할 객체 생성
    start = new Date(JSON.stringify(thisDate).slice(1, -1));
    next = new Date(JSON.stringify(thisDate).slice(1, -1));
    next.setDate(next.getDate() + 1);
    finalObj = {
      anaid: ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's'),
      date: {
        from: start,
        to: next,
      },
      data: dataObject
    };

    return finalObj; // 최종 결과 객체 반환

  } catch (e) {
    // 오류 발생 시 비상 알림 호출 및 로그 출력
    await emergencyAlarm("GoogleAnalytics.dailyMetric error : " + e.message + " / " + dateToString(thisDate));
    console.log(e);
    return null; // null 반환하여 오류 발생 알림
  }
}

/**
 * 주어진 날짜에 대한 Google Analytics의 클라이언트 데이터를 수집하고 분석 결과를 반환하는 비동기 함수입니다.
 * 대상 클라이언트의 세션 데이터를 수집하여 상세한 정보를 반환합니다.
 * @async
 * @param {Date} thisDate - 데이터를 수집할 날짜.
 * @param {Object} selfCoreMongo - MongoDB의 Core 인스턴스.
 * @param {Object} selfMongo - MongoDB 인스턴스.
 * @returns {Object|null} 수집된 클라이언트 데이터를 포함하는 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
GoogleAnalytics.prototype.dailyClients = async function (thisDate, selfCoreMongo, selfMongo) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수
  const back = this.back; // 백엔드 관련 작업을 처리하기 위한 back 객체 참조
  const { equalJson, zeroAddition } = this.mother; // Mother 클래스의 유틸리티 메서드 참조

  try {
    let targetClients; // 타겟 클라이언트 목록을 저장할 변수
    let fromDate, toDate; // 데이터 수집의 시작과 종료 날짜를 저장할 변수
    let targetCliids; // 타겟 클라이언트의 ID 목록을 저장할 변수
    let sessionResult; // 세션 결과를 저장할 변수
    let dataObject; // 수집된 데이터를 저장할 객체
    let finalObj; // 최종적으로 반환할 객체

    // thisDate가 Date 객체인지 확인
    if (!(thisDate instanceof Date)) {
      throw new Error("invalid input"); // Date 객체가 아니면 오류 발생
    }

    dataObject = {}; // 수집된 데이터를 저장할 객체 초기화

    // fromDate와 toDate를 동일하게 설정하고 toDate를 다음 날로 설정
    fromDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
    toDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);

    // 타겟 클라이언트 목록을 쿼리를 통해 가져옴
    targetClients = (await back.getClientsByQuery({
      "requests": {
        $elemMatch: {
          "request.timeline": {
            $gte: fromDate, // fromDate 이후의 타임라인
            $lt: toDate, // toDate 이전의 타임라인
          }
        }
      }
    }, { selfMongo: selfCoreMongo })).toNormal(); // MongoDB 쿼리 결과를 일반 객체로 변환

    // 클라이언트 ID 목록을 추출하여 dataObject에 저장
    targetCliids = targetClients.map((client) => { return client.cliid });
    dataObject.cliid = targetCliids;
    dataObject.detail = [];

    // 각 클라이언트 ID에 대해 세션 객체를 가져와 dataObject에 추가
    for (let cliid of targetCliids) {
      sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo, selfCoreMongo); // 세션 객체 가져오기
      if (sessionResult === null) {
        throw new Error("session parsing error"); // 세션 파싱 실패 시 오류 발생
      }
      dataObject.detail.push(sessionResult); // 세션 결과를 데이터 객체에 추가
    }

    // 최종적으로 반환할 객체 생성
    finalObj = {
      ancid: ('y' + String(fromDate.getFullYear()).slice(2) + zeroAddition(fromDate.getMonth() + 1) + '_' + "aa" + zeroAddition(fromDate.getDate()) + 's'),
      date: {
        from: fromDate, // 수집 시작 날짜
        to: toDate, // 수집 종료 날짜
      },
      data: dataObject // 수집된 클라이언트 데이터
    };

    return finalObj; // 최종 결과 객체 반환

  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지 출력
    console.log(e);
    return null; // null 반환하여 오류 발생 알림
  }
}

/**
 * 주어진 클라이언트 ID에 해당하는 세션 데이터를 수집하고 분석 결과를 반환하는 비동기 함수입니다.
 * 세션 데이터를 기반으로 사용자의 행동, 소스, 디바이스 정보 등을 수집합니다.
 * @async
 * @param {string} cliid - 클라이언트의 ID.
 * @param {Object} selfMongo - MongoDB 인스턴스.
 * @param {Object} selfCoreMongo - Core MongoDB 인스턴스.
 * @returns {Object} 수집된 세션 데이터를 포함하는 객체를 반환하며, 오류 발생 시 기본 구조의 객체를 반환합니다.
 */
GoogleAnalytics.prototype.getSessionObjectByCliid = async function (cliid, selfMongo, selfCoreMongo) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수
  const back = this.back; // 백엔드 관련 작업을 처리하기 위한 back 객체 참조
  const address = this.address; // 주소 정보를 담고 있는 객체 참조
  const { collection, unknownKeyword } = this; // 수집할 데이터의 컬렉션과 미지의 키워드를 참조
  const { dateToString, stringToDate, ipParsing, requestSystem, sleep, emergencyAlarm } = this.mother; // Mother 클래스의 유틸리티 메서드 참조
  const querystring = require("querystring"); // 쿼리스트링 파싱을 위한 Node.js 모듈 참조

  try {
    let rows, rows2; // MongoDB에서 가져온 데이터 저장 변수
    let sessionIds; // 세션 ID 목록을 저장할 배열
    let whereQuery, updateQuery; // MongoDB 쿼리 문을 저장할 변수
    let thisIp; // 클라이언트 IP 주소를 저장할 변수
    let thisObj; // 파싱된 IP 정보를 저장할 변수
    let queryStrings; // 쿼리스트링을 저장할 배열
    let sourceArr, campaignArr; // UTM 소스 및 캠페인 정보를 저장할 배열
    let thisSource, thisCampaign; // 중복 제거된 소스 및 캠페인 정보를 저장할 변수
    let referrerArr; // 리퍼러 정보를 저장할 배열
    let userObj; // 사용자의 세션 데이터를 저장할 객체
    let historyFactor; // 사용자 행동의 히스토리 정보를 저장할 객체
    let mediumArr; // UTM 미디엄 정보를 저장할 배열
    let thisMedium; // 중복 제거된 미디엄 정보를 저장할 변수
    let finalObj; // 최종 결과를 저장할 객체
    let num; // 순서를 위한 변수
    let rowsMother; // MongoDB에서 가져온 세션 데이터 저장 변수
    let thisClient; // 현재 클라이언트 정보를 저장할 변수

    // 클라이언트 ID를 사용하여 클라이언트 정보를 가져옴
    thisClient = await back.getClientById(cliid, { selfMongo: selfCoreMongo, toNormal: true });
    // 클라이언트 ID와 전화번호를 기반으로 MongoDB에서 데이터를 조회
    rows = await back.mongoRead(collection, { "data.cliid": cliid }, { selfMongo });
    rows2 = await back.mongoRead(collection, { "data.value": thisClient.phone }, { selfMongo });
    // 두 쿼리 결과를 합침
    rows = rows.concat(rows2);
    // 테스트 모드 URL을 제외하고 필터링
    rows = rows.filter((obj) => {
      return !/\&mode\=test/g.test(obj.info.requestUrl);
    }).filter((obj) => {
      return !/\&view\=test/g.test(obj.info.requestUrl);
    }).map((obj) => { return obj.id });
    // 중복된 세션 ID를 제거
    sessionIds = [ ...new Set(rows) ];

    finalObj = {
      cliid,
      users: [],
    };

    // 세션 ID가 존재하는 경우에만 MongoDB에서 데이터를 다시 조회
    await sleep(1000);
    if (sessionIds.length > 0) {
      rowsMother = await back.mongoRead(collection, { $or: sessionIds.map((id) => { return { id } }) }, { selfMongo });
    } else {
      rowsMother = [];
    }

    for (let id of sessionIds) {
      // 해당 세션 ID에 해당하는 데이터만 필터링
      rows = rowsMother.filter((o) => { return o.id === id });
      if (rows.length > 0) {
        // 세션 데이터를 날짜 순으로 정렬
        rows.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
        queryStrings = [];
        referrerArr = [];
        num = 0;

        for (let row of rows) {
          // URL에서 쿼리스트링을 추출하여 저장
          if (/\?/gi.test(row.info.requestUrl)) {
            queryStrings.push(querystring.parse(row.info.requestUrl.split("?")[1]));
          }
          // 리퍼러 정보 중에서 자신이 아닌 리퍼러를 필터링하여 저장
          if (!(new RegExp(instance.address.frontinfo.host, "gi")).test(row.info.referer)) {
            if (!(new RegExp(unknownKeyword, "i")).test(row.info.referer)) {
              referrerArr.push(row.info.referer);
            }
          }
          num++;
        }

        // 중복된 리퍼러 제거
        referrerArr = [ ...new Set(referrerArr) ];

        sourceArr = [];
        campaignArr = [];
        mediumArr = [];

        // UTM 파라미터에서 소스, 캠페인, 미디엄 정보를 추출
        for (let obj of queryStrings) {
          if (obj["utm_source"] !== undefined) {
            sourceArr.push(obj["utm_source"]);
          }
          if (obj["utm_campaign"] !== undefined) {
            campaignArr.push(obj["utm_campaign"]);
          }
          if (obj["utm_medium"] !== undefined) {
            mediumArr.push(obj["utm_medium"]);
          }
        }

        // 리퍼러 기반 소스 추가
        if (referrerArr.some((str) => { return /naver/gi.test(str) })) {
          sourceArr.push("naver");
        } else if (referrerArr.some((str) => { return /google/gi.test(str) })) {
          sourceArr.push("google");
        } else if (referrerArr.some((str) => { return /youtube/gi.test(str) })) {
          sourceArr.push("google");
        } else if (referrerArr.some((str) => { return /instagram/gi.test(str) })) {
          sourceArr.push("instagram");
        } else if (referrerArr.some((str) => { return /facebook/gi.test(str) })) {
          sourceArr.push("facebook");
        } else if (referrerArr.some((str) => { return /meta/gi.test(str) })) {
          sourceArr.push("facebook");
        } else if (referrerArr.some((str) => { return /kakao/gi.test(str) })) {
          sourceArr.push("kakao");
        }

        // 중복된 소스, 캠페인, 미디엄 제거
        thisSource = [ ...new Set(sourceArr) ];
        thisCampaign = [ ...new Set(campaignArr) ];
        thisMedium = [ ...new Set(mediumArr) ];

        // 소스 정보 필터링 및 표준화
        thisSource = Array.from(new Set(thisSource.map((str) => {
          let result;
          if (/naver/gi.test(str)) {
            result = "naver";
          } else if (/instagram/gi.test(str)) {
            result = "instagram";
          } else if (/facebook/gi.test(str) || /meta/gi.test(str)) {
            result = "facebook";
          } else if (/kakao/gi.test(str)) {
            result = "kakao";
          } else {
            result = str;
          }
          return result;
        })));

        // 네트워크 정보가 없는 경우 IP를 파싱하여 네트워크 정보 추가
        if (Object.keys(rows[0].network).length === 0) {
          thisIp = rows[0].info.ip;
          thisObj = await ipParsing(thisIp);
          rows[0].network = thisObj;

          // 네트워크 정보가 여전히 없는 경우 오류 처리
          if (Object.keys(rows[0].network).length === 0) {
            throw new Error("invalid ip address");
          }
        }

        // 사용자 정보를 저장하는 객체 생성
        userObj = {
          id: id,
          type: (rows[rows.length - 1].date.valueOf() - rows[0].date.valueOf()) >= (1000 * 60 * 60 * 24) ? "Returning Visitor" : "New Visitor",
          history: [],
          source: {
            referrer: referrerArr,
            mother: thisSource,
            medium: thisMedium,
            campaign: thisCampaign
          },
          device: {
            kinds: rows[0].device.device.type,
            os: rows[0].device.os.name,
            browser: rows[0].device.os.browser,
          },
          region: {
            country: /KR/gi.test(rows[0].network.country) ? "South Korea" : rows[0].network.country,
            city: (rows[0].network.region === rows[0].network.city) ? rows[0].network.city : (rows[0].network.region + " " + rows[0].network.city),
          }
        };

        // 각 세션의 히스토리 정보를 추가
        for (let row of rows) {
          historyFactor = {};
          historyFactor.date = new Date(JSON.stringify(row.date).slice(1, -1));
          historyFactor.path = row.info.requestUrl;
          historyFactor.referer = row.info.referer;
          if (typeof row.info.pageTitle === "string" && row.info.pageTitle.trim() !== "") {
            historyFactor.title = row.info.pageTitle;
          } else {
            historyFactor.title = "";
          }
          historyFactor.event = row.action;
          userObj.history.push(historyFactor);
        }

        // 최종 사용자 객체를 결과 객체에 추가
        finalObj.users.push(userObj);
      }
    }

    return finalObj; // 최종 결과 반환

  } catch (e) {
    // 오류 발생 시 긴급 알람을 발송하고 기본 구조의 객체를 반환
    await emergencyAlarm("GoogleAnalytics.getSessionObjectByCliid error : " + e.message);
    console.log(e);
    return {
      cliid,
      users: [],
    };
  }
}

/**
 * 주어진 날짜 범위 내에서 간단한 Google Analytics 메트릭을 수집하여 반환하는 비동기 함수입니다.
 * 사용자와 이벤트 메트릭을 포함하여 수집된 데이터를 반환합니다.
 * @async
 * @param {Date|string} startDate - 메트릭 수집을 시작할 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @param {Date|string} endDate - 메트릭 수집을 종료할 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @returns {Object|null} 수집된 메트릭 데이터를 포함하는 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} 시작 날짜와 종료 날짜가 지정되지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.simpleMetric = async function (startDate, endDate) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  // Mother 클래스의 유틸리티 메서드 참조
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, sleep } = this.mother;
  // Google Analytics 데이터 클라이언트 모듈 참조
  const { BetaAnalyticsDataClient } = require("@google-analytics/data");

  try {
    let analyticsDataClient; // Google Analytics 데이터 클라이언트 인스턴스를 저장할 변수
    let dataObject; // 수집된 데이터를 저장할 객체
    let userMetric; // 사용자 메트릭 변수
    let userDimensions; // 사용자 관련 차원 정보 배열
    let eventMetric; // 이벤트 메트릭 변수
    let eventDimensions; // 이벤트 관련 차원 정보 배열
    let finalObj; // 최종 결과 객체
    let start; // 시작 날짜를 저장할 변수
    let next; // 시작 날짜의 다음 날을 저장할 변수
    let end; // 종료 날짜를 저장할 변수
    let endNext; // 종료 날짜의 다음 날을 저장할 변수

    // 시작 날짜와 종료 날짜가 지정되지 않은 경우 오류 발생
    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }

    // 시작 날짜가 Date 객체인 경우 문자열로 변환
    if (startDate instanceof Date) {
      startDate = dateToString(startDate);
    }
    // 종료 날짜가 Date 객체인 경우 문자열로 변환
    if (endDate instanceof Date) {
      endDate = dateToString(endDate);
    }

    // Google Analytics 자격 증명을 설정
    await this.setCredentials();
    // Google Analytics 데이터 클라이언트 인스턴스 생성
    analyticsDataClient = new BetaAnalyticsDataClient();
    dataObject = {}; // 데이터를 저장할 객체 초기화

    await sleep(1000); // 요청 간 대기 시간 설정

    // 사용자 메트릭 수집
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 사용자 메트릭 데이터를 수집하고 dataObject에 저장
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);

    await sleep(1000); // 요청 간 대기 시간 설정

    // 이벤트 메트릭 수집
    eventMetric = "eventCount";
    eventDimensions = [
      { title: "eventName", name: "eventName", meaning: "이벤트 이름", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 이벤트 메트릭 데이터를 수집하고 dataObject에 저장
    dataObject.events = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, eventMetric, eventDimensions);

    // 최종 결과 객체 생성
    start = stringToDate(startDate);
    next = stringToDate(startDate);
    next.setDate(next.getDate() + 1); // 시작 날짜의 다음 날 계산
    end = stringToDate(endDate);
    endNext = stringToDate(endDate);
    endNext.setDate(endNext.getDate() + 1); // 종료 날짜의 다음 날 계산

    finalObj = {
      key: "simple_analytics_" + startDate.replace(/\-/gi, '') + "_" + endDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: (endDate === startDate ? next : endNext),
      },
      data: dataObject
    };

    // 최종 결과 객체 반환
    return finalObj;

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
}

/**
 * 주어진 날짜에 대해 쿼리를 분석하고, 이를 기반으로 결과를 반환하는 비동기 함수입니다.
 * 주어진 날짜의 조회 데이터를 MongoDB에서 읽어온 후, 쿼리스트링과 Google 쿼리를 분석하여 결과를 반환합니다.
 * @async
 * @param {Date|string} targetDate - 분석할 대상 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @param {Object} selfMongo - MongoDB 연결 객체.
 * @returns {Object|null} 분석된 쿼리 데이터를 포함하는 객체를 반환하며, 해당 날짜의 데이터가 없거나 오류 발생 시 null을 반환합니다.
 * @throws {Error} targetDate가 지정되지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.queryParsing = async function (targetDate, selfMongo) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  // Mother 클래스의 유틸리티 메서드 참조
  const { dateToString, stringToDate, equalJson, zeroAddition } = this.mother;
  // Back 객체 참조
  const back = this.back;
  // Node.js querystring 모듈 참조
  const querystring = require("querystring");

  try {
    // targetDate가 정의되지 않은 경우 오류 발생
    if (targetDate === undefined) {
      throw new Error("must be targetDate");
    }
    // targetDate가 Date 객체인 경우 문자열로 변환
    if (targetDate instanceof Date) {
      targetDate = dateToString(targetDate);
    }

    const collection = "dailyAnalytics"; // 조회할 MongoDB 컬렉션 이름
    let key; // MongoDB 조회 키
    let start, end; // 시작 및 종료 날짜 객체
    let targetReport; // MongoDB에서 조회한 보고서 객체
    let targetCases; // 분석할 케이스 목록
    let res; // 중간 결과를 저장할 배열
    let tong; // 최종 결과를 저장할 배열
    let googleRes; // Google에서 조회한 결과
    let result; // 최종 결과 객체
    let finalObj; // 반환할 최종 객체

    // targetDate를 기반으로 시작 및 종료 날짜 설정
    start = stringToDate(targetDate);
    end = stringToDate(targetDate);
    end.setDate(end.getDate() + 1);
    // MongoDB에서 조회할 키 생성
    key = ('n' + String(start.getFullYear()).slice(2) + zeroAddition(start.getMonth() + 1) + '_' + "aa" + zeroAddition(start.getDate()) + 's');
    // MongoDB에서 보고서를 읽어옴
    [ targetReport ] = await back.mongoRead(collection, { anaid: key }, { selfMongo });
    
    // targetReport가 정의된 경우
    if (targetReport !== undefined) {

      // 참조 도메인에서의 쿼리 추출 및 처리

      console.log(targetReport.data);

      targetCases = targetReport.data.views.detail.referer.cases;

      // 쿼리스트링을 분석하여 필요한 값들을 추출
      res = targetCases.map((obj) => {
        return obj.case;
      }).filter((str) => {
        return /\?/gi.test(str) // 쿼리스트링이 존재하는 경우 필터링
      }).map((str) => {
        return querystring.parse(str.split('?')[1]) // 쿼리스트링 파싱
      }).map((obj) => {
        return Object.values(obj); // 파싱된 객체의 값들만 추출
      }).map((arr) => {
        return arr.filter((str) => { return /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi.test(str) }) // 한글만 필터링
      }).flat(10).map((str) => {
        return str.trim(); // 공백 제거
      });

      // 중복을 제거한 결과를 tong 배열에 저장
      tong = [ ...new Set(res) ].map((str) => {
        return { case: str, value: 0 };
      });

      // 각 문자열의 빈도를 계산
      for (let str of res) {
        for (let obj of tong) {
          if (str === obj.case) {
            obj.value = obj.value + 1;
          }
        }
      }

      // 빈도 순으로 정렬
      tong.sort((a, b) => { return b.value - a.value });

      // Google 검색어에서의 쿼리 추출 및 병합
      googleRes = (await this.googleQuery(targetDate)).data.detail;
      googleRes = googleRes.filter((obj) => { return obj.clicks >= 1 }).map((obj) => { obj.query = obj.query.trim(); return obj; });

      // Google 쿼리를 tong 배열과 비교하여 병합
      for (let z of googleRes) {
        for (let obj of tong) {
          if (obj.case === z.query) {
            obj.value = obj.value + z.clicks;
            z.done = true;
          }
        }
      }
      googleRes = googleRes.filter((obj) => { return obj.done !== true });

      // 남은 Google 쿼리를 tong 배열에 추가
      for (let { query, clicks } of googleRes) {
        tong.push({
          case: query,
          value: clicks,
        });
      }

      // 최종 결과를 빈도 순으로 정렬
      tong.sort((a, b) => { return b.value - a.value });

      // 최종 결과 객체 생성
      finalObj = {
        key: targetDate.replace(/\-/gi, '') + "_query",
        date: {
          from: start,
          to: end,
        },
        data: {
          total: tong.reduce((acc, curr) => { return acc + curr.value }, 0),
          detail: tong
        }
      };

      // 최종 결과 반환
      return finalObj;

    } else {
      // 해당 날짜의 보고서가 없으면 null 반환
      return null;
    }

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
}

/**
 * 주어진 날짜에 대해 Google Search Console의 데이터를 조회하고, 이를 기반으로 보고서를 생성하는 비동기 함수입니다.
 * 이 함수는 기본적인 검색 노출수(basic impressions)와 쿼리별 검색 노출수(query impressions)를 수집하여 분석한 결과를 반환합니다.
 * @async
 * @param {Date|string} targetDate - 조회할 대상 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @returns {Object|null} 분석된 Google Search Console 데이터를 포함하는 보고서 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} targetDate가 지정되지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.googleQuery = async function (targetDate) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  // Mother 클래스의 유틸리티 메서드 참조
  const { dateToString, stringToDate, pythonExecute, equalJson, zeroAddition } = this.mother;

  try {
    // targetDate가 정의되지 않은 경우 오류 발생
    if (targetDate === undefined) {
      throw new Error("must be targetDate");
    }

    // targetDate가 Date 객체인 경우 문자열로 변환
    if (targetDate instanceof Date) {
      targetDate = dateToString(targetDate);
    }

    let res; // Python 실행 결과를 저장할 변수
    let report; // 최종 보고서를 저장할 변수
    let start, end, next; // 시작 및 종료 날짜 객체

    // targetDate를 기반으로 시작 및 종료 날짜 설정
    start = stringToDate(targetDate);
    end = stringToDate(targetDate);
    end.setDate(end.getDate() + 1);

    // 초기 보고서 객체 생성
    report = {
      key: targetDate.replace(/\-/gi, '') + "_googleQuery",
      date: {
        from: start,
        to: end,
      },
      data: {
        clicks: 0, // 초기 클릭 수는 0으로 설정
        impressions: 0, // 초기 노출 수는 0으로 설정
        detail: [], // 쿼리별 상세 데이터 저장용 배열
      }
    };

    // Python으로 basicImpressions 메서드를 실행하여 기본 노출수를 조회
    res = equalJson(await pythonExecute(this.pythonApp, [ "console", "basicImpressions" ], { startDate: targetDate, endDate: targetDate }));
    
    // 결과가 배열 형태로 반환되는 경우 보고서에 클릭 수와 노출 수를 기록
    if (Array.isArray(res.rows)) {
      report.data.clicks = res.rows[0].clicks; // 첫 번째 결과의 클릭 수를 기록
      report.data.impressions = res.rows[0].impressions; // 첫 번째 결과의 노출 수를 기록
    }

    // Python으로 queryImpressions 메서드를 실행하여 쿼리별 노출수를 조회
    res = equalJson(await pythonExecute(this.pythonApp, [ "console", "queryImpressions" ], { startDate: targetDate, endDate: targetDate }));
    
    // 결과가 배열 형태로 반환되는 경우 각 쿼리에 대해 클릭 수와 노출 수를 기록
    if (Array.isArray(res.rows)) {
      report.data.detail = res.rows.map((obj) => {
        return {
          query: obj.keys[0], // 쿼리 문자열
          clicks: obj.clicks, // 해당 쿼리의 클릭 수
          impressions: obj.impressions // 해당 쿼리의 노출 수
        }
      });
    }

    // 최종 보고서 객체를 반환
    return report;

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
}

/**
 * 주어진 시작일과 종료일에 대한 복잡한 Google Analytics 메트릭 데이터를 수집하는 비동기 함수입니다.
 * 사용자, 페이지 뷰, 이벤트, 전환(팝업 오픈 및 상담 페이지) 등의 데이터를 수집하여 반환합니다.
 * @async
 * @param {Date|string} startDate - 분석할 기간의 시작 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @param {Date|string} endDate - 분석할 기간의 종료 날짜. Date 객체 또는 'YYYY-MM-DD' 형식의 문자열.
 * @returns {Object|null} 분석된 Google Analytics 데이터를 포함하는 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} startDate와 endDate가 지정되지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.complexMetric = async function (startDate, endDate) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  // Mother 클래스의 유틸리티 메서드 참조
  const { dateToString, equalJson, stringToDate, requestSystem, fileSystem, zeroAddition, sleep } = this.mother;
  // Google Analytics Data API 클라이언트 클래스 로드
  const { BetaAnalyticsDataClient } = require("@google-analytics/data");

  try {
    // 사용자 메트릭 및 차원, 결과를 저장할 변수들 선언
    let userMetric, userDimensions;
    let viewMetric, viewDimensions;
    let eventMetric, eventDimensions;
    let conversionPopupOpenMetric, conversionPopupOpenDimensions;
    let conversionConsultingPageMetric, conversionConsultingPageDimensions;
    let analyticsDataClient; // Google Analytics Data API 클라이언트 인스턴스
    let dataObject; // 최종 데이터 객체
    let finalObj; // 최종 결과 객체
    let start; // 시작 날짜 객체
    let next; // 시작 날짜의 다음 날 객체
    let end; // 종료 날짜 객체
    let endNext; // 종료 날짜의 다음 날 객체

    // 시작일과 종료일이 지정되지 않은 경우 오류 발생
    if (startDate === undefined || endDate === undefined) {
      throw new Error("must be start-date and end-date");
    }
    // 시작일과 종료일이 Date 객체인 경우 문자열로 변환
    if (startDate instanceof Date) {
      startDate = dateToString(startDate);
    }
    if (endDate instanceof Date) {
      endDate = dateToString(endDate);
    }

    // Google Analytics 자격 증명 설정
    await this.setCredentials();
    // Google Analytics Data API 클라이언트 인스턴스 생성
    analyticsDataClient = new BetaAnalyticsDataClient();
    // 데이터 객체 초기화
    dataObject = {};

    // 500ms 대기
    await sleep(500);

    // 사용자 메트릭 및 차원 설정
    userMetric = "totalUsers";
    userDimensions = [
      { title: "userType", name: "newVsReturning", meaning: "유저 타입", filter: (str) => { return (str === "new" ? "New Visitor" : (str === "returning" ? "Returning Visitor" : str)) } },
      { title: "country", name: "country", meaning: "국가", filter: null },
      { title: "city", name: "city", meaning: "도시", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 사용자 데이터 수집 및 저장
    dataObject.users = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, userMetric, userDimensions);

    // 500ms 대기
    await sleep(500);

    // 페이지 뷰 메트릭 및 차원 설정
    viewMetric = "screenPageViews";
    viewDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "referer", name: "pageReferrer", meaning: "레퍼럴", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 페이지 뷰 데이터 수집 및 저장
    dataObject.views = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, viewMetric, viewDimensions);

    // 500ms 대기
    await sleep(500);

    // 이벤트 메트릭 및 차원 설정
    eventMetric = "eventCount";
    eventDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "eventName", name: "eventName", meaning: "이벤트 이름", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 이벤트 데이터 수집 및 저장
    dataObject.events = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, eventMetric, eventDimensions);

    // 500ms 대기
    await sleep(500);

    // 전환 데이터 초기화
    dataObject.conversion = {};

    // 팝업 오픈 전환 메트릭 및 차원 설정
    conversionPopupOpenMetric = "eventCount";
    conversionPopupOpenDimensions = [
      { title: "pagePath", name: "pagePathPlusQueryString", meaning: "페이지 경로", filter: null },
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 팝업 오픈 전환 데이터 수집 및 저장 (eventName이 "popupOpen"인 데이터 필터링)
    dataObject.conversion.popupOpen = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionPopupOpenMetric, conversionPopupOpenDimensions, { filter: { fieldName: "eventName", stringFilter: { matchType: "CONTAINS", value: "popupOpen", caseSensitive: true } } });

    // 500ms 대기
    await sleep(500);

    // 상담 페이지 전환 메트릭 및 차원 설정
    conversionConsultingPageMetric = "screenPageViews";
    conversionConsultingPageDimensions = [
      { title: "deviceCategory", name: "deviceCategory", meaning: "디바이스", filter: null },
      { title: "operatingSystem", name: "operatingSystem", meaning: "운영 체제", filter: null },
      { title: "browser", name: "browser", meaning: "브라우저", filter: null },
      { title: "campaign", name: "sessionCampaignName", meaning: "캠페인", filter: null },
      { title: "source", name: "sessionSource", meaning: "소스", filter: null },
      { title: "sourceDetail", name: "sessionSourceMedium", meaning: "소스 디테일", filter: null },
    ];
    // 상담 페이지 전환 데이터 수집 및 저장 (pagePath가 "consulting.php"인 데이터 필터링)
    dataObject.conversion.consultingPage = await this.returnAnalyticsObject(analyticsDataClient, startDate, endDate, conversionConsultingPageMetric, conversionConsultingPageDimensions, { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "consulting.php", caseSensitive: true } } });

    // 결과 날짜 객체 설정
    start = stringToDate(startDate);
    next = stringToDate(startDate);
    next.setDate(next.getDate() + 1);
    end = stringToDate(endDate);
    endNext = stringToDate(endDate);
    endNext.setDate(endNext.getDate() + 1);

    // 최종 결과 객체 생성
    finalObj = {
      key: "complex_analytics_" + startDate.replace(/\-/gi, '') + "_" + endDate.replace(/\-/gi, ''),
      date: {
        from: start,
        to: (endDate === startDate ? next : endNext),
      },
      data: dataObject
    };

    // 최종 결과 반환
    return finalObj;

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
}

/**
 * 주어진 날짜를 기준으로 현재 달과 이전 달의 Google Analytics 메트릭 데이터를 수집하는 비동기 함수입니다.
 * @async
 * @param {Date|null} [thisDate=null] - 기준 날짜. 주어지지 않으면 현재 날짜를 사용.
 * @returns {Object|null} 현재 달과 이전 달의 메트릭 데이터를 포함하는 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} thisDate가 유효한 Date 객체가 아닌 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.monthlyMetric = async function (thisDate = null) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  
  try {
    // thisDate가 null인 경우 현재 날짜를 사용, 그렇지 않으면 전달된 thisDate 사용
    const now = (thisDate === null ? new Date() : thisDate);
    let year, month;
    let pastStartDate, pastEndDate; // 지난 달의 시작일과 종료일
    let nowStartDate, nowEndDate; // 이번 달의 시작일과 종료일
    let thisMonthMetric, pastMonthMetric; // 이번 달과 지난 달의 메트릭 데이터

    // now가 Date 객체가 아닌 경우 오류 발생
    if (!(now instanceof Date)) {
      throw new Error("invalid input");
    }

    // 현재 연도와 월을 얻음
    year = now.getFullYear();
    month = now.getMonth() + 1;

    // 이번 달의 시작일과 종료일 설정
    nowStartDate = new Date(year, month - 1, 1, 0, 0, 0);
    nowEndDate = new Date(year, month - 1, now.getDate(), 0, 0, 0);
    nowEndDate.setDate(nowEndDate.getDate() - 1); // 종료일은 하루 전으로 설정

    // 지난 달의 시작일과 종료일 설정
    pastStartDate = new Date(JSON.stringify(nowStartDate).slice(1, -1));
    pastEndDate = new Date(JSON.stringify(nowStartDate).slice(1, -1));
    pastStartDate.setDate(pastStartDate.getDate() - 1);
    pastEndDate.setDate(pastEndDate.getDate() - 1);
    pastStartDate.setDate(1); // 지난 달의 첫째 날로 설정

    // 시작일이 종료일 이후라면 유효하지 않으므로 null로 설정
    if (nowStartDate.valueOf() >= nowEndDate.valueOf()) {
      nowStartDate = null;
      nowEndDate = null;
    }

    // 이번 달의 메트릭 데이터 수집
    if (nowStartDate !== null) {
      thisMonthMetric = await this.complexMetric(nowStartDate, nowEndDate);
    } else {
      thisMonthMetric = null;
    }
    
    // 지난 달의 메트릭 데이터 수집
    pastMonthMetric = await this.complexMetric(pastStartDate, pastEndDate);

    // 이번 달과 지난 달의 메트릭 데이터를 포함하는 객체 반환
    return {
      thisMonth: thisMonthMetric,
      pastMonth: pastMonthMetric,
    };

  } catch (e) {
    // 오류 발생 시 콘솔에 출력하고 null 반환
    console.log(e);
    return null;
  }
}

/**
 * 클라이언트 메트릭 데이터를 수집하고 분석한 후 MongoDB에 저장할 수 있는 비동기 함수입니다.
 * @async
 * @param {Object} thisClient - 클라이언트 객체. 클라이언트 메트릭 분석에 필요한 기본 정보를 포함합니다.
 * @param {Array} contentsArrInput - 콘텐츠 배열. 특정 클라이언트와 관련된 콘텐츠 정보를 포함합니다.
 * @param {Array} historyArrInput - 히스토리 배열. 클라이언트의 과거 히스토리 정보를 포함합니다.
 * @param {Object} selfMongo - MongoDB 연결 객체. 클라이언트 메트릭 데이터를 저장하는 데 사용됩니다.
 * @param {Object} selfCoreMongo - 코어 MongoDB 연결 객체. 클라이언트와 관련된 코어 데이터를 조회하는 데 사용됩니다.
 * @param {Object} selfConsoleMongo - 콘솔 MongoDB 연결 객체. 클라이언트의 콘솔 히스토리 데이터를 조회하는 데 사용됩니다.
 * @param {boolean} [store=false] - 클라이언트 메트릭 데이터를 MongoDB에 저장할지 여부를 결정하는 플래그. 기본값은 false입니다.
 * @returns {Object|boolean} 클라이언트 메트릭 데이터를 포함한 객체를 반환하며, 오류 발생 시 false를 반환합니다.
 * @throws {Error} 필요한 MongoDB 연결 객체가 없거나 유효하지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.clientMetric = async function (thisClient, contentsArrInput, historyArrInput, selfMongo, selfCoreMongo, selfConsoleMongo, store = false) {
  const instance = this;
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조
  const address = this.address; // 서버 주소 정보를 가져오기 위한 참조
  const unknownKeyword = this.unknownKeyword; // 미확인 데이터를 나타내기 위한 상수
  const { equalJson, emergencyAlarm, sleep } = this.mother; // Mother 객체의 메서드 및 상수를 가져옴
  const collection = this.clientAnalyticsCollection; // MongoDB 컬렉션 이름 설정
  const querystring = require("querystring"); // 쿼리스트링 파싱을 위한 Node.js 기본 모듈 로드
  let storeSuccess; // 저장 성공 여부를 나타내는 변수
  storeSuccess = false;

  try {
    let sessionResult; // 세션 결과를 담을 변수
    let clientObject; // 클라이언트 메트릭 데이터를 저장할 객체
    let pidList, desidList; // 콘텐츠의 pid와 desid를 저장할 리스트
    let res, constentsArr; // 쿼리 결과와 콘텐츠 배열을 저장할 변수
    let whereQuery; // MongoDB 쿼리 객체
    let thisHistory; // 클라이언트 히스토리를 저장할 변수
    let historyAdd; // 추가할 히스토리 데이터를 저장할 배열
    let rows; // MongoDB 조회 결과를 저장할 배열
    let cliid; // 클라이언트 ID를 저장할 변수
    let deleteLength; // 삭제할 데이터 길이를 저장할 변수

    // MongoDB 연결 객체가 유효한지 확인
    if (typeof selfCoreMongo !== "object" || selfCoreMongo === null) {
      throw new Error("invalid input 2");
    }

    if (typeof selfConsoleMongo !== "object" || selfConsoleMongo === null) {
      throw new Error("invalid input 3");
    }

    if (typeof selfMongo !== "object" || selfMongo === null) {
      throw new Error("invalid input 4");
    }

    cliid = thisClient.cliid; // 클라이언트 ID 설정

    // 1초 동안 대기
    await sleep(1000);

    // 클라이언트 ID로 세션 데이터를 가져옴
    sessionResult = await this.getSessionObjectByCliid(cliid, selfMongo, selfCoreMongo);
    if (sessionResult === null) {
      throw new Error("session parsing error : " + cliid);
    }

    // 히스토리 배열에서 현재 클라이언트의 히스토리를 찾음
    if (historyArrInput instanceof Array) {
      thisHistory = historyArrInput.find((obj) => { return obj.cliid === cliid });
    } else {
      // MongoDB에서 클라이언트 히스토리를 가져옴
      [ thisHistory ] = await back.mongoPick("clientHistory", [ { cliid }, { curation: 1, cliid: 1, manager: 1, important: 1 } ], { selfMongo: selfConsoleMongo });
    }

    clientObject = {}; // 클라이언트 메트릭 데이터를 저장할 객체 초기화

    // 클라이언트 객체에 기본 정보 할당
    clientObject.cliid = cliid;
    clientObject.client = thisClient;

    // 세션 데이터 추가
    clientObject.sessions = {};
    clientObject.sessions.length = sessionResult.users.length; // 세션 길이
    clientObject.sessions.id = []; // 세션 ID 배열 초기화
    clientObject.sessions.device = []; // 디바이스 정보 배열 초기화
    for (let { id, device } of sessionResult.users) {
      clientObject.sessions.id.push(id);
      clientObject.sessions.device.push(device);
    }

    // 소스 데이터 초기화
    clientObject.source = {};
    clientObject.source.referrer = [];
    clientObject.source.mother = [];
    clientObject.source.medium = [];
    clientObject.source.campaign = [];
    clientObject.source.search = [];

    // 요청 중에서 "meta instant"가 포함된 경우 소스 데이터를 업데이트
    if (thisClient.requests.some((o) => { return /from meta instant/gi.test(o.request.etc.comment) }) || thisClient.requests.some((o) => { return /메타 인스턴트/gi.test(o.request.etc.channel) })) {
      clientObject.source.mother.push("facebook");
      clientObject.source.medium.push("instantads");
    }

    // 히스토리 데이터 추가
    clientObject.history = {};
    clientObject.history.detail = [];
    for (let obj of sessionResult.users) {
      for (let obj2 of obj.history) {
        obj2.session = obj.id;
        clientObject.history.detail.push(equalJson(JSON.stringify(obj2)));
      }
      for (let str of obj.source.referrer) {
        clientObject.source.referrer.push(str);
      }
      for (let str of obj.source.mother) {
        clientObject.source.mother.push(str);
      }
      for (let str of obj.source.medium) {
        clientObject.source.medium.push(str);
      }
      for (let str of obj.source.campaign) {
        clientObject.source.campaign.push(str);
      }
    }

    // 검색 소스 데이터 추가
    clientObject.source.search = Array.from(new Set(clientObject.source.referrer.filter((str) => {
      return /\?/g.test(str);
    }).map((str) => {
      const queryObj = querystring.parse(str.split('?')[1]);
      if (typeof queryObj === "object" && queryObj !== null) {
        return Object.values(queryObj).filter((s) => { return (typeof s === "string") }).filter((str) => { return /[ㄱ-ㅎㅏ-ㅣ가-힣]/gi.test(str) })
      } else {
        return [];
      }
    }).flat(10)));

    // 추가할 히스토리 데이터 초기화 및 정렬
    historyAdd = [];
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.send.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "send" + obj.page.slice(0, 1).toUpperCase() + obj.page.slice(1),
        session: unknownKeyword,
      }
    }));
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.call.out.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "callOut" + (obj.success ? "Success" : "Fail") + "_" + String(obj.duration),
        session: unknownKeyword,
      }
    }));
    historyAdd = historyAdd.concat(thisHistory.curation.analytics.call.in.map((obj) => {
      return {
        date: obj.date,
        path: unknownKeyword,
        referer: unknownKeyword,
        title: unknownKeyword,
        event: "callIn" + (obj.success ? "Success" : "Fail") + "_" + String(obj.duration),
        session: unknownKeyword,
      }
    }));

    // 히스토리 데이터를 최종 히스토리 배열에 추가 및 정렬
    clientObject.history.detail = clientObject.history.detail.concat(historyAdd);
    clientObject.history.detail.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    clientObject.history.length = clientObject.history.detail.length;
    if (clientObject.history.length > 0) {
      clientObject.history.during = clientObject.history.detail[clientObject.history.length - 1].date.valueOf() - clientObject.history.detail[0].date.valueOf();
    } else {
      clientObject.history.during = 0;
    }
    
    // 소스 데이터에서 중복 제거 및 필터링
    clientObject.source.referrer = [ ...new Set(clientObject.source.referrer) ].filter((str) => {
      return !(new RegExp(address.frontinfo.host, "g")).test(str);
    });
    clientObject.source.mother = [ ...new Set(clientObject.source.mother) ];
    clientObject.source.medium = [ ...new Set(clientObject.source.medium) ];
    clientObject.source.campaign = [ ...new Set(clientObject.source.campaign) ];

    // 콘텐츠 뷰 데이터 처리
    pidList = [];
    desidList = [];
    for (let { path } of clientObject.history.detail) {
      if (/pid\=/gi.test(path)) {
        pidList.push(path);
      }
      if (/desid\=/gi.test(path)) {
        desidList.push(path);
      }
    }

    pidList = [ ...new Set(pidList) ];
    desidList = [ ...new Set(desidList) ];

    clientObject.contents = {};
    clientObject.contents.view = {};
    clientObject.contents.view.portfolio = pidList.filter((str) => { return /portdetail/gi.test(str) }).map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    clientObject.contents.view.review = pidList.filter((str) => { return /revdetail/gi.test(str) }).map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    clientObject.contents.view.designer = desidList.map((str) => { return { link: "https://" + address.frontinfo.host + str }; });
    
    for (let obj of clientObject.contents.view.portfolio) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }
    for (let obj of clientObject.contents.view.review) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }
    for (let obj of clientObject.contents.view.designer) {
      obj.title = clientObject.history.detail.find((o) => { return ("https://" + address.frontinfo.host + o.path) === obj.link }).title;
    }

    // 콘텐츠 디자이너 데이터 처리
    clientObject.contents.designers = {};
    whereQuery = {};
    whereQuery["$or"] = (pidList.map((str) => { return /pid\=([^\&]+)/gi.exec(str)[1] }).map((pid) => { return { "contents.portfolio.pid": pid } }));
    
    if (whereQuery["$or"].length > 0) {
      if (contentsArrInput instanceof Array) {
        constentsArr = contentsArrInput.filter((obj) => { return whereQuery["$or"].map((o) => { return o["contents.portfolio.pid"]; }).includes(obj.contents.portfolio.pid); });
      } else {
        constentsArr = await back.mongoPick("contents", [ whereQuery, { "contents.portfolio.pid": 1, conid: 1, desid: 1 } ], { selfMongo: selfCoreMongo });
      }
      clientObject.contents.designers.desid = [ ...new Set(constentsArr.map((c) => { return c.desid }).concat(desidList.map((str) => { return /desid\=([^\&]+)/gi.exec(str)[1] }))) ];
    } else {
      constentsArr = [];
      clientObject.contents.designers.desid = desidList.map((str) => { return /desid\=([^\&]+)/gi.exec(str)[1] });
    }
    clientObject.contents.designers.length = clientObject.contents.designers.desid.length;

    // 데이터 저장을 활성화한 경우 MongoDB에 저장
    if (store) {
      await sleep(500);
      rows = await back.mongoPick(collection, [ { cliid }, { cliid: 1 } ], { selfMongo });
      if (rows.length !== 0) {
        deleteLength = Number(rows.length);
        for (let i = 0; i < deleteLength; i++) {
          await back.mongoDelete(collection, { cliid }, { selfMongo });
          await sleep(500);
        }
      }
      await sleep(500);
      await back.mongoCreate(collection, clientObject, { selfMongo });
      console.log("mongo store success : " + cliid);
      storeSuccess = true;
    }

    // 최종 클라이언트 메트릭 객체 반환
    return clientObject;
  } catch (e) {
    // 오류 발생 시 비상 경고 및 콘솔 출력 후 false 반환
    await emergencyAlarm("GoogleAnalytics.clientMetric error : " + e.message);
    console.log(e);
    return storeSuccess;
  }
}

/**
 * 여러 클라이언트에 대한 메트릭 데이터를 수집하고 분석하는 비동기 함수입니다.
 * @async
 * @param {Array} clientsArr - 클라이언트 객체 배열. 분석할 클라이언트의 리스트입니다.
 * @param {Object} selfCoreMongo - 코어 MongoDB 연결 객체. 클라이언트와 관련된 코어 데이터를 조회하는 데 사용됩니다.
 * @param {Object} selfConsoleMongo - 콘솔 MongoDB 연결 객체. 클라이언트의 콘솔 히스토리 데이터를 조회하는 데 사용됩니다.
 * @param {Object} selfMongo - MongoDB 연결 객체. 클라이언트 메트릭 데이터를 저장하는 데 사용됩니다.
 * @param {boolean} [store=false] - 클라이언트 메트릭 데이터를 MongoDB에 저장할지 여부를 결정하는 플래그. 기본값은 false입니다.
 * @param {boolean} [fast=false] - 빠른 처리를 위해 일부 단계를 건너뛸지 여부를 결정하는 플래그. 기본값은 false입니다.
 * @returns {Array|null} 각 클라이언트에 대한 메트릭 데이터를 포함한 객체 배열을 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} 입력된 클라이언트 배열이 유효하지 않거나 MongoDB 연결 객체가 유효하지 않은 경우 오류를 발생시킵니다.
 */
GoogleAnalytics.prototype.clientsMetric = async function (clientsArr, selfCoreMongo, selfConsoleMongo, selfMongo, store = false, fast = false) {
  // this 인스턴스 참조를 위한 변수 선언
  const instance = this;
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조
  const { sleep } = this.mother; // Mother 객체의 sleep 메서드를 사용하기 위한 참조

  try {
    let contentsArr; // 콘텐츠 데이터를 저장할 배열
    let historiesArr; // 클라이언트 히스토리 데이터를 저장할 배열
    let clientResult; // 개별 클라이언트의 메트릭 결과를 저장할 변수
    let clientsObjectArr; // 모든 클라이언트의 메트릭 결과를 저장할 배열
    let cliidArr; // 클라이언트 ID 배열

    // 입력된 클라이언트 배열이 유효한지 확인
    if (!Array.isArray(clientsArr)) {
      throw new Error("invalid input");
    }
    if (clientsArr.length === 0) {
      throw new Error("no empty arr");
    }
    // MongoDB 연결 객체가 유효한지 확인
    if (typeof selfCoreMongo !== "object" || selfCoreMongo === null) {
      throw new Error("invalid input 3");
    }
    if (typeof selfConsoleMongo !== "object" || selfConsoleMongo === null) {
      throw new Error("invalid input 4");
    }
    if (typeof selfMongo !== "object" || selfMongo === null) {
      throw new Error("invalid input 5");
    }

    // 클라이언트 배열에서 중복되지 않은 cliid 목록을 생성
    cliidArr = Array.from(new Set(clientsArr.map((c) => { return c.cliid })));

    // 콘텐츠 데이터와 클라이언트 히스토리 데이터를 MongoDB에서 가져옴
    contentsArr = await back.mongoPick("contents", [ {}, { "contents.portfolio.pid": 1, conid: 1, desid: 1 } ], { selfMongo: selfCoreMongo });
    historiesArr = await back.mongoPick("clientHistory", [ { $or: cliidArr.map((cliid) => { return { cliid } }) }, { curation: 1, cliid: 1, manager: 1, important: 1 } ], { selfMongo: selfConsoleMongo });

    clientsObjectArr = []; // 최종 결과를 저장할 배열 초기화

    // 클라이언트 배열을 순회하면서 각 클라이언트에 대한 메트릭 데이터를 생성
    for (let client of clientsArr) {
      // 개별 클라이언트 메트릭 데이터를 수집
      clientResult = await this.clientMetric(client, contentsArr, historiesArr, selfMongo, selfCoreMongo, selfConsoleMongo, store);

      // 클라이언트 메트릭 데이터가 올바르게 생성되지 않은 경우 재시도
      while (typeof clientResult !== "object" || clientResult === null) {
        await sleep(2000); // 2초 대기
        if (!clientResult) {
          clientResult = await this.clientMetric(client, contentsArr, historiesArr, selfMongo, selfCoreMongo, selfConsoleMongo, store);
        } else {
          clientResult = {};
        }
      }

      // 생성된 클라이언트 메트릭 데이터를 결과 배열에 추가
      clientsObjectArr.push(clientResult);
      await sleep(1000); // 다음 클라이언트 메트릭 데이터 생성을 위해 1초 대기
    }

    // 모든 클라이언트에 대한 메트릭 데이터를 반환
    return clientsObjectArr;
  } catch (e) {
    // 오류 발생 시 콘솔에 로그를 남기고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * 최근 일정 기간 내에 수집된 클라이언트 메트릭 데이터를 수정하는 비동기 함수입니다.
 * 중복된 데이터를 제거하는 역할을 합니다.
 * @async
 * @param {Object} selfLogMongo - MongoDB 연결 객체. 클라이언트 메트릭 데이터를 조회하고 삭제하는 데 사용됩니다.
 * @param {number} [monthDelta=3] - 몇 개월 전부터 데이터를 수정할지 결정하는 파라미터. 기본값은 3개월입니다.
 * @returns {Object} 처리 결과 메시지를 담은 객체를 반환합니다. 성공 시 "done", 실패 시 "fail"을 반환합니다.
 * @throws {Error} 오류 발생 시 콘솔에 로그를 남기고 "fail" 메시지를 반환합니다.
 */
GoogleAnalytics.prototype.fixClientMetric = async function (selfLogMongo, monthDelta = 3) {
  const instance = this; // this 인스턴스를 참조하기 위한 변수 선언
  const mongoDB = require("mongodb"); // MongoDB 모듈을 불러옴
  const db = "miro81"; // 사용할 데이터베이스 이름
  const collection = "clientAnalytics"; // 사용할 컬렉션 이름
  const { sleep, equalJson, emergencyAlarm, errorLog } = this.mother; // Mother 메서드를 사용하기 위한 참조
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조

  try {
    let rows; // 조회된 클라이언트 메트릭 데이터 배열
    let cliidArr; // 중복 제거된 클라이언트 ID 배열
    let tempRows; // 임시로 중복된 데이터를 저장할 배열
    let targetRows; // 삭제할 타겟 데이터를 저장할 배열
    let threeMonthAgo; // 몇 개월 전의 날짜를 계산하기 위한 변수

    // monthDelta가 숫자가 아닐 경우 기본값 3으로 설정
    if (typeof monthDelta !== "number") {
      monthDelta = 3;
    }

    // 현재 날짜에서 monthDelta만큼 이전의 날짜를 계산
    threeMonthAgo = new Date();
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - monthDelta);

    // 지정된 기간 내에 수집된 클라이언트 메트릭 데이터를 MongoDB에서 조회
    rows = await back.mongoRead(collection, {
      "client.requests": {
        $elemMatch: {
          "request.timeline": {
            $gte: threeMonthAgo, // threeMonthAgo 이후의 데이터만 조회
          }
        }
      }
    }, { selfMongo: selfLogMongo });

    // 중복되지 않은 클라이언트 ID 배열을 생성
    cliidArr = rows.map((o) => { return o.client.cliid });
    cliidArr = [ ...new Set(cliidArr) ];

    // 클라이언트 ID 배열을 순회하면서 중복 데이터를 처리
    for (let cliid of cliidArr) {
      await sleep(500); // 반복문 사이에 500ms 대기
      tempRows = rows.filter((r) => { return r.cliid === cliid }); // 해당 클라이언트 ID에 해당하는 데이터 필터링
      if (tempRows.length !== 1) { // 중복된 데이터가 있는 경우
        targetRows = equalJson(JSON.stringify(tempRows)).slice(0, -1); // 중복된 데이터 목록 생성
        for (let r of targetRows) {
          await selfLogMongo.db(db).collection(collection).deleteOne({ _id: new mongoDB.ObjectID(r._id) }); // 중복 데이터 삭제
          console.log("delete success => ", cliid, r._id); // 삭제된 데이터 로그 출력
          await sleep(500); // 삭제 후 500ms 대기
        }
      }
    }

    return { message: "done" }; // 처리 완료 메시지 반환

  } catch (e) {
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지 출력
    return { message: "fail" }; // 실패 메시지 반환
  }
}

/**
 * 실시간 메트릭 데이터를 수집하고 필요한 경우 MongoDB에 저장하는 비동기 함수입니다.
 * 
 * @async
 * @param {Object} selfCoreMongo - MongoDB 연결 객체. 클라이언트 데이터를 조회하는 데 사용됩니다.
 * @param {Object} selfMongo - MongoDB 연결 객체. 메트릭 데이터를 조회 및 저장하는 데 사용됩니다.
 * @param {boolean} [store=true] - 수집한 데이터를 MongoDB에 저장할지 여부를 결정하는 플래그. 기본값은 true입니다.
 * @returns {Array} 실시간 세션 데이터를 포함한 배열을 반환합니다.
 * @throws {Error} 오류 발생 시 콘솔에 로그를 남기고 null을 반환합니다.
 */
GoogleAnalytics.prototype.realtimeMetric = async function (selfCoreMongo, selfMongo, store = true) {
  const instance = this; // this 인스턴스를 참조하기 위한 변수 선언
  const { equalJson, db } = this.mother; // Mother 객체의 메서드와 데이터베이스 이름 참조
  const { collection, clientAnalyticsCollection, nullWords, realtimeCollection } = this; // GoogleAnalytics 클래스 내부 속성 참조
  const delta = 20; // 실시간 메트릭 데이터를 수집할 시간 범위(분 단위)
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조
  const address = this.address; // 주소 데이터를 사용하기 위한 참조

  try {
    let ago; // delta 분 전의 시간을 저장하는 변수
    let agoHistory; // delta 분 전부터 현재까지의 히스토리 데이터를 저장할 배열
    let sessions; // 세션 정보를 저장할 배열
    let cliids; // 클라이언트 ID와 세션 ID를 저장할 배열
    let targetFindIds; // 특정 세션 ID 목록을 저장할 배열
    let whereQuery; // MongoDB 조회에 사용할 쿼리 객체
    let targetClients; // 조회된 타겟 클라이언트 데이터를 저장할 배열
    let sessionTarget; // 특정 세션 데이터를 저장할 객체
    let targetHistories; // 조회된 타겟 히스토리 데이터를 저장할 배열
    let historiesTarget; // 특정 세션에 해당하는 히스토리 데이터를 저장할 배열
    let cliidsTarget; // 특정 클라이언트 ID 목록을 저장할 배열
    let thisClients; // 조회된 클라이언트 데이터를 저장할 배열

    // 현재 시간에서 delta 분 전의 시간을 계산
    ago = new Date();
    ago.setMinutes(ago.getMinutes() - delta);

    // delta 분 전부터 현재까지의 데이터를 MongoDB에서 조회
    agoHistory = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });

    // 조회된 데이터에서 클라이언트 ID와 세션 ID를 추출
    cliids = agoHistory.filter((obj) => { 
      return (typeof obj.data.cliid === "string" && /^c/i.test(obj.data.cliid)) 
    }).map((obj) => {
      return {
        cliid: obj.data.cliid,
        sessionId: obj.id
      };
    });

    // 세션 ID 목록을 생성하고 중복을 제거
    sessions = [ ...new Set(agoHistory.map((o) => { return o.id })) ]
      .filter((str) => { return typeof str === "string"; })
      .map((id) => {
        let cliid;
        if (cliids.find((o) => { return o.sessionId === id }) === undefined) {
          cliid = nullWords; // 클라이언트 ID가 없는 경우 "nullWords"로 설정
        } else {
          cliid = cliids.find((o) => { return o.sessionId === id }).cliid;
        }
        return { id, cliid };
      });

    // 클라이언트 ID가 없는 세션 ID 목록을 생성
    targetFindIds = [ ...new Set(sessions.filter((o) => { return o.cliid === nullWords }).map(({ id }) => { return id })) ];

    // MongoDB 조회를 위한 whereQuery 객체를 생성
    whereQuery = {};
    whereQuery["sessions.id"] = { $elemMatch: { $regex: "(" + targetFindIds.join("|") + ")" } };

    // 클라이언트 데이터를 조회
    targetClients = await back.mongoPick(clientAnalyticsCollection, [ whereQuery, { cliid: 1, "sessions.id": 1 } ], { selfMongo });

    // 세션 ID와 클라이언트 ID를 매핑
    for (let obj of sessions) {
      for (let obj2 of targetClients) {
        if (obj2.sessions.id.includes(obj.id)) {
          obj.cliid = obj2.cliid;
        }
      }
    }

    // 세션에 해당하는 히스토리 데이터를 조회
    targetHistories = await back.mongoPick(collection, [ 
      { id: { $regex: "(" + sessions.map(({ id }) => { return id }).join("|") + ")" } }, 
      { page: 1, action: 1, data: 1, id: 1, info: 1, date: 1 } 
    ], { selfMongo });

    // 조회된 클라이언트 ID 목록을 생성
    cliidsTarget = sessions.map((o) => { return o.cliid }).filter((str) => { return str !== nullWords });

    // 클라이언트 ID에 해당하는 클라이언트 데이터를 조회
    if (cliidsTarget.length === 0) {
      thisClients = [];
    } else {
      thisClients = (await back.getClientsByQuery({ $or: cliidsTarget.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo })).toNormal();
    }

    // 세션 데이터를 업데이트
    for (let obj of sessions) {
      sessionTarget = agoHistory.find((o) => { return obj.id === o.id });
      historiesTarget = targetHistories.filter((o) => { return o.id === obj.id });
      obj.device = sessionTarget.device;
      obj.network = sessionTarget.network;

      // 히스토리 데이터를 시간 순서로 정렬하고 세션 데이터에 추가
      historiesTarget.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
      obj.history = {};
      obj.history.detail = historiesTarget;
      obj.history.length = historiesTarget.length;

      // 히스토리 데이터가 없을 경우 기본값 설정
      if (historiesTarget.length === 0) {
        obj.history.lastPage = "unknown";
        obj.history.summary = [];
      } else {
        obj.history.lastPage = historiesTarget[historiesTarget.length - 1].info.pageTitle + " (" + historiesTarget[historiesTarget.length - 1].page + ")";
        obj.history.summary = obj.history.detail.map((o) => { return o.info.pageTitle });
      }

      // 클라이언트 데이터를 세션 데이터에 추가
      obj.client = thisClients.find((o) => { return o.cliid === obj.cliid }) === undefined ? null : thisClients.find((o) => { return o.cliid === obj.cliid });
    }

    // store 플래그가 true일 경우 실시간 데이터를 MongoDB에 저장
    if (store) {
      await selfMongo.db(db).collection(realtimeCollection).deleteMany({}); // 기존 데이터를 삭제
      for (let obj of sessions) {
        await back.mongoCreate(realtimeCollection, obj, { selfMongo }); // 새로운 데이터를 저장
      }
    }

    return sessions; // 최종 세션 데이터를 반환

  } catch (e) {
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지 출력
    return null; // null을 반환
  }
};

/**
 * 실시간으로 웹사이트에 접속 중인 사용자 및 고객에 대한 정보를 메시지 형태로 반환하는 비동기 함수입니다.
 * 
 * @async
 * @param {Object} selfMongo - MongoDB 연결 객체. 실시간 사용자 데이터를 조회하는 데 사용됩니다.
 * @returns {string|null} 실시간 메시지를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} 오류 발생 시 콘솔에 로그를 남기고 null을 반환합니다.
 */
GoogleAnalytics.prototype.realtimeMessage = async function (selfMongo) {
  const instance = this; // this 인스턴스를 참조하기 위한 변수 선언
  const { equalJson, requestSystem, dateToString } = this.mother; // Mother 객체의 메서드를 참조
  const { realtimeCollection } = this; // GoogleAnalytics 클래스 내부 속성에서 실시간 컬렉션 이름을 참조
  const bar = "\n=================================================================="; // 구분선으로 사용할 문자열
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조
  const address = this.address; // 주소 데이터를 사용하기 위한 참조

  try {
    // MongoDB에서 실시간 사용자 데이터를 조회
    const current = await back.mongoRead(realtimeCollection, {}, { selfMongo });
    
    // 조회된 데이터 중 클라이언트 정보가 있는 항목만 필터링
    const clients = current.filter((o) => { return o.client !== null });

    let message; // 반환할 메시지를 저장할 변수
    let index; // 사용자 인덱스를 저장할 변수

    // 메시지 초기화 및 현재 시간 추가
    message = bar;
    message += "\n" + dateToString(new Date(), true) + " 현재";
    message += bar;

    // 현재 접속자 수 및 고객 수를 메시지에 추가
    message += "\n\n현재 홈리에종 웹 페이지에는 " + String(current.length) + "명" + "이 있습니다.";
    message += "\n";
    message += "이 중 홈리에종의 고객은 " + String(clients.length) + "명" + "이 있네요.";
    
    // 고객이 있을 경우 고객 명단을 메시지에 추가
    if (clients.length > 0) {
      message += "\n";
      message += "현재 온라인 상태에 있는 고객님의 명단은 " + clients.map((o) => { 
        return o.client.name + "(" + o.client.cliid + ")"; 
      }).join(", ") + " 입니다.";
    }
    message += "\n";
    message += "\n";
    
    // 현재 접속 중인 사용자가 있을 경우, 각 사용자의 마지막 페이지 및 디바이스 정보를 메시지에 추가
    if (current.length > 0) {
      message += String(current.length) + "명의 유저가 현재 있는 페이지는 다음과 같습니다.";
      message += bar;
      index = 1;
      
      for (let obj of current) {
        message += "\n";
        // 클라이언트 정보가 있는 경우와 없는 경우의 메시지를 다르게 처리
        if (obj.client !== null) {
          message += String(index) + "번 사용자 (" + obj.client.name + ") : " + obj.history.lastPage + " - " + obj.device.device.type;
        } else {
          message += String(index) + "번 사용자 : " + obj.history.lastPage + " - " + obj.device.device.type;
        }
        index++;
      }
      message += bar;
    }

    // 최종 메시지를 반환
    return message;

  } catch (e) {
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지 출력
    return null; // null을 반환
  }
};

/**
 * 특정 클라이언트의 웹 활동 정보를 바탕으로 보고서 형식의 메시지를 생성하는 비동기 함수입니다.
 * 
 * @async
 * @param {string} cliid - 클라이언트의 ID.
 * @param {Object} selfCoreMongo - MongoDB 연결 객체. 클라이언트 관련 데이터를 조회하는 데 사용됩니다.
 * @param {Object} selfMongo - MongoDB 연결 객체. 실시간 데이터와 클라이언트 데이터를 조회하는 데 사용됩니다.
 * @returns {string|null} 클라이언트의 웹 보고서 메시지를 반환하며, 오류 발생 시 null을 반환합니다.
 * @throws {Error} 유효하지 않은 cliid이거나 다른 오류 발생 시 콘솔에 로그를 남기고 null을 반환합니다.
 */
GoogleAnalytics.prototype.clientMessage = async function (cliid, selfCoreMongo, selfMongo) {
  const instance = this; // this 인스턴스를 참조하기 위한 변수 선언
  const back = this.back; // 백엔드 메서드를 사용하기 위한 참조
  const { requestSystem } = this.mother; // Mother 객체의 메서드를 참조
  const { clientAnalyticsCollection } = this; // GoogleAnalytics 클래스 내부 속성에서 클라이언트 분석 컬렉션 이름을 참조

  try {
    // MongoDB에서 특정 클라이언트의 데이터를 조회
    const [ targetClient ] = await back.mongoRead(clientAnalyticsCollection, { cliid }, { selfMongo });

    // 조회된 클라이언트 데이터가 없으면 오류를 발생시킴
    if (targetClient === undefined || targetClient === null) {
      throw new Error("invalid cliid");
    }

    const bar = "========================================================================"; // 구분선으로 사용할 문자열
    const { client, sessions, source: { mother, campaign, search }, history, contents } = targetClient; // 클라이언트의 세션 및 소스, 히스토리 데이터를 추출
    let designers; // 디자이너 정보를 저장할 변수
    let designerObject = {}; // 디자이너 객체를 초기화
    let pidList = []; // 포트폴리오 및 리뷰 ID 리스트를 저장할 배열
    let tempResult; // 임시 결과를 저장할 변수
    let thisContents; // 현재 컨텐츠를 저장할 변수
    let thisContentsArr; // 현재 컨텐츠 배열을 저장할 변수
    let messageTong = []; // 메시지 배열을 저장할 변수
    let aboutBoo; // 서비스 소개 페이지 방문 여부를 저장할 변수
    let sourceStr = ""; // 출처 정보를 저장할 변수
    let searchStr = ""; // 검색어 정보를 저장할 변수
    let deviceStr = ""; // 디바이스 정보를 저장할 변수

    // 디자이너 정보를 MongoDB에서 조회하여 디자이너 ID와 이름을 매핑하는 객체 생성
    designers = await back.mongoPick("designer", [ {}, { desid: 1, designer: 1 } ], { selfMongo: selfCoreMongo });
    for (let { desid, designer } of designers) {
      designerObject[desid] = designer;
    }

    // 컨텐츠 뷰 처리
    // 포트폴리오 및 리뷰 링크에서 pid를 추출하여 pidList에 저장
    for (let { link } of contents.view.portfolio) {
      tempResult = /pid\=([a-z][0-9]+)/gi.exec(link);
      if (tempResult.length > 1) {
        pidList.push({ type: "포트폴리오", pid: tempResult[1].trim() });
      }
    }
    for (let { link } of contents.view.review) {
      tempResult = /pid\=([a-z][0-9]+)/gi.exec(link);
      if (tempResult.length > 1) {
        pidList.push({ type: "인터뷰", pid: tempResult[1].trim() });
      }
    }

    // pidList를 기반으로 컨텐츠 정보를 조회하여 디자이너와 제목 정보를 추가
    if (pidList.length !== 0) {
      thisContentsArr = await back.mongoPick("contents", [ { $or: pidList.map((obj) => { return obj.pid }).map((str) => { return { "contents.portfolio.pid": str } }) }, { conid: 1, desid: 1, cliid: 1, "contents.portfolio.pid": 1, "contents.portfolio.title.sub": 1 } ], { selfMongo: selfCoreMongo });

      for (let obj of pidList) {
        thisContents = thisContentsArr.find((o) => { return o.contents.portfolio.pid === obj.pid });
        obj.designer = designerObject[thisContents.desid];
        obj.desid = thisContents.desid;
        obj.title = thisContents.contents.portfolio.title.sub;
      }

      // 디자이너 상세 페이지 정보를 pidList에 추가
      for (let { link } of contents.view.designer) {
        tempResult = /desid\=([a-z][0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/gi.exec(link);
        if (tempResult.length > 1) {
          pidList.push({ type: "상세 페이지", title: "", designer: designerObject[tempResult[1]], desid: tempResult[1] });
        }
      }

      // 메시지에 방문한 컨텐츠 정보 추가
      messageTong.push("방문한 컨텐츠 : " + String(pidList.length) + "개");
      pidList.forEach((obj) => {
        messageTong.push(`${obj.designer}(${obj.desid}) 실장님의 ${obj.type}${obj.title !== "" ? " : " + obj.title : ""}`);
      });
    } else {
      messageTong.push("방문한 컨텐츠 : " + String(pidList.length) + "개");
    }

    messageTong.unshift(bar); // 구분선 추가
    messageTong.push(bar); // 구분선 추가

    // 서비스 소개 및 유형 페이지 방문 여부 처리
    aboutBoo = history.detail.map((o) => { return o.path }).some((str) => { return /about\.php/gi.test(str) }) || history.detail.map((o) => { return o.path }).some((str) => { return /service\.php/gi.test(str) });

    messageTong.unshift(bar);
    if (history.detail.map((o) => { return o.path }).some((str) => { return /service\.php/gi.test(str) })) {
      messageTong.unshift("서비스 유형 페이지 " + "O");
    } else {
      messageTong.unshift("서비스 유형 페이지 " + "X");
    }
    if (history.detail.map((o) => { return o.path }).some((str) => { return /about\.php/gi.test(str) })) {
      messageTong.unshift("서비스 소개 페이지 " + "O");
    } else {
      messageTong.unshift("서비스 소개 페이지 " + "X");
    }
    if (aboutBoo) {
      messageTong.unshift("서비스 소개 페이지 방문함");
    } else {
      messageTong.unshift("서비스 소개 페이지 미방문");
    }

    // 방문 출처 및 검색어 정보 처리
    if (mother.length > 0) {
      sourceStr = "출저 : " + mother.join(", ");
      sourceStr += " / ";
      if (campaign.length > 0) {
        sourceStr += "광고 보고 들어옴 : " + campaign.join(", ");
      } else {
        sourceStr += "광고 흔적 없음";
      }
      if (search.length > 0) {
        searchStr = "검색어 : " + search.join(", ");
      }
    } else {
      sourceStr = "출저 알 수 없음";
    }
    if (searchStr !== "") {
      messageTong.unshift(searchStr);
    }
    messageTong.unshift(sourceStr);
    messageTong.unshift(bar);

    // 디바이스 정보 처리
    deviceStr = sessions.device[0].kinds === "mobile" ? "모바일" : (sessions.device[0].kinds === "desktop" ? "데스크탑" : "태블릿");
    deviceStr += "(" + sessions.device[0].os + ")";
    deviceStr += " / ";
    deviceStr += sessions.device[0].browser + " 브라우저";

    // 최종 메시지 구성
    messageTong.unshift(deviceStr);
    messageTong.unshift("총 행동 " + String(history.length) + "회");
    messageTong.unshift(bar);
    messageTong.unshift(client.name + "(" + client.cliid + ") 웹 보고서");

    // 메시지를 줄 단위로 결합하여 반환
    return messageTong.join("\n");

  } catch (e) {
    console.log(e); // 오류 발생 시 콘솔에 로그 출력
    return null; // null 반환
  }
};

module.exports = GoogleAnalytics;
