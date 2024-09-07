/**
 * 콜렉션 이름
 * @type {string}
 * @description 서버에서 발생한 에러 로그를 시간순으로 기록해 저장하는 컬렉션
 */
const collectionName = "serverLog";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 서버에서 발생한 에러 로그를 출력한 패킷을 시간순으로 기록하는 데이터베이스
 */
const collectionDescription = "서버에서 에러 로그를 출력한 패킷에 대해 시간순으로 저장해놓은 콜렉션";

/**
 * @typedef {Object} ServerLog
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 에러가 발생한 시간 (ISO 8601 형식)
 * @property {string} server 에러가 발생한 서버의 이름
 * @property {string} contents 에러에 대한 구체적인 로그 내용 (에러 메시지, 발생한 위치 등)
 */

/**
 * 샘플 데이터 0
 * @type {ServerLog}
 * @description 2024년 9월 7일 transferLounge 서버에서 발생한 에러 로그
 */
const collectionSampleData0 = {
  _id: "66dbdc4f90e99ee12a2a2cd9", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-09-07T04:20:20.644Z", // 에러가 발생한 날짜와 시간 (2024년 9월 7일 04:20:20.644 UTC)
  server: "transferLounge", // 에러가 발생한 서버의 이름 (transferLounge 서버)
  contents: "============================================================\n" +
    "2024-09-07T04:20:20.644Z error\n" + // 에러 로그 시작 시간과 오류 메시지
    "aspirant onboarding => \n" + // 오류 발생 시 처리 중인 작업(aspirant onboarding)
    "[{\"aspid\":\"a2404_aa17s\",\"name\":\"정기현\"}," + // 오류 발생 시 처리 중인 디자이너들의 정보 (첫 번째 디자이너: 정기현)
    "{\"aspid\":\"a2306_aa02s\",\"name\":\"김정옥\"}," + // 두 번째 디자이너: 김정옥
    "{\"aspid\":\"a2403_aa02s\",\"name\":\"황미연\"}," + // 세 번째 디자이너: 황미연
    "{\"aspid\":\"a2402_aa05s\",\"name\":\"김민지\"}," + // 네 번째 디자이너: 김민지
    "{\"aspid\":\"a2312_aa07s\",\"name\":\"김민하\"}]\n" + // 다섯 번째 디자이너: 김민하
    "============================================================" // 로그 구분선을 추가해 시각적 구분을 제공
};

/**
 * 샘플 데이터 1
 * @type {ServerLog}
 * @description 2024년 9월 6일 staticLounge 서버에서 발생한 에러 로그
 */
const collectionSampleData1 = {
  _id: "66da7c5af79983585f1a29d1", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-09-06T01:10:39.712Z", // 에러가 발생한 날짜와 시간 (2024년 9월 6일 01:10:39.712 UTC)
  server: "staticLounge", // 에러가 발생한 서버의 이름 (staticLounge 서버)
  contents: "============================================================\n" +
    "2024-09-06T01:10:39.712Z error\n" + // 에러 로그 시작 시간과 오류 메시지
    "in /updateImagesOrder\n" + // 오류가 발생한 위치 (/updateImagesOrder 라우트)
    "TypeError: Cannot read properties of undefined (reading 'fromIndex')\n" + // 발생한 에러 메시지 (정의되지 않은 값을 읽으려 시도한 오류)
    "    at /home/ubuntu/robot/apps/staticLounge/router/staticRouter.js:9622:89\n" + // 에러가 발생한 코드 위치 (staticRouter.js 파일의 9622번째 줄)
    "    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n" + // Express.js 라우팅 관련 에러 발생 위치
    "    at next (/home/ubuntu/robot/node_modules/express/lib/router/route.js:149:13)\n" + // 다음 미들웨어로의 전환 (next() 함수)
    "    at Route.dispatch (/home/ubuntu/robot/node_modules/express/lib/router/route.js:119:3)\n" + // Express.js 라우팅 dispatch 처리 위치
    "    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n" + // 라우트 계층에서의 처리
    "    at /home/ubuntu/robot/node_modules/express/lib/router/index.js:284:15\n" + // 라우팅 처리 과정에서 발생한 오류
    "    at Function.process_params (/home/ubuntu/robot/node_modules/express/lib/router/index.js:346:12)\n" + // Express.js 파라미터 처리 과정
    "    at next (/home/ubuntu/robot/node_modules/express/lib/router/index.js:280:10)\n" + // 다음 미들웨어로 전환
    "    at Function.handle (/home/ubuntu/robot/node_modules/express/lib/router/index.js:175:3)\n" + // 라우트 핸들링
    "    at router (/home/ubuntu/robot/node_modules/express/lib/router/index.js:47:12)\n" + // 라우터에서 발생한 에러 처리
    "============================================================" // 로그 구분선을 추가해 시각적 구분을 제공
};