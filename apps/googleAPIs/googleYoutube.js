/**
 * GoogleYoutube 클래스는 YouTube API와 관련된 기능을 제공하는 클래스입니다.
 * @constructor
 * @param {object|null} mother - Mother 클래스의 인스턴스 (선택적)
 * @param {object|null} back - BackMaker 클래스의 인스턴스 (선택적)
 * @param {object|null} address - 주소 객체 (선택적)
 */
const GoogleYoutube = function (mother = null, back = null, address = null) {
  // mother, back, address가 모두 제공된 경우 해당 인스턴스를 사용
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    // 그렇지 않으면 필요한 모듈을 로드하여 새로운 인스턴스를 생성
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성
    this.address = ADDRESS; // ADDRESS 객체를 로드
  }
  // Google API 관련 작업을 수행할 디렉토리 경로를 설정
  this.dir = process.cwd() + "/apps/googleAPIs";
}

/**
 * YouTube 채널의 일일 데이터를 MongoDB에 저장하는 메서드입니다.
 * @param {object} selfMongo - MongoDB 연결 객체
 * @param {number} [dayNumber=7] - 데이터를 수집할 일수 (기본값: 7일)
 * @param {object|null} logger - 로그 객체 (선택적)
 */
GoogleYoutube.prototype.dailyYoutube = async function (selfMongo, dayNumber = 7, logger = null) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 메서드를 destructuring을 통해 가져옴
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, zeroAddition, emergencyAlarm } = this.mother;

  try {
    // MongoDB의 컬렉션 이름 설정
    const channelCollection = "dailyChannel";
    let startDate;
    let res;
    let from, to;
    let key;
    let json;
    let tempRows;
    let views, likes, subscribers;
    let now;

    // 현재 날짜를 가져옴
    now = new Date();

    // 시작 날짜를 현재 날짜로 설정하고, dayNumber에 따라 이전 날짜로 조정
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < (dayNumber - 1); i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // dayNumber 만큼의 데이터를 반복하여 수집
    for (let i = 0; i < (dayNumber - 1); i++) {
      from = new Date(JSON.stringify(startDate).slice(1, -1));
      to = new Date(JSON.stringify(startDate).slice(1, -1));
      to.setDate(to.getDate() + 1);

      // 수집할 데이터의 고유 키 생성
      key = dateToString(from).replace(/\-/gi, '') + "_" + "youtube";

      // Python 스크립트를 실행하여 YouTube 채널의 데이터 수집
      res = await pythonExecute(`${this.dir}/python/app.py`, ["youtube", "channelNumbers"], { startDate: dateToString(from), endDate: dateToString(from) });
      [views, likes, subscribers] = res;

      // 수집된 데이터가 유효한 경우 JSON 객체로 생성하여 MongoDB에 저장
      if (typeof views === "number" && typeof likes === "number" && typeof subscribers === "number") {
        json = {
          chaid: 'h' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'g' + 'y' + zeroAddition(from.getDate()) + 's',
          key,
          date: { from, to },
          value: {
            profile: { subscribers },
            performance: { views, likes }
          },
          information: {
            mother: "google",
            type: "youtube",
          }
        };

        // MongoDB에서 기존 데이터를 읽어오고, 기존 데이터가 있으면 삭제
        tempRows = await back.mongoRead(channelCollection, { key }, { selfMongo });
        if (tempRows.length !== 0) {
          await back.mongoDelete(channelCollection, { key }, { selfMongo });
        }

        // 새 데이터를 MongoDB에 생성
        await back.mongoCreate(channelCollection, json, { selfMongo });
        console.log(json);
      }

      // 날짜를 하루 증가시키고, 잠시 대기
      startDate.setDate(startDate.getDate() + 1);
      await sleep(500);
    }

    // 로그 객체가 제공된 경우, 작업 완료 로그를 기록
    if (logger !== null) {
      logger.cron("google daily youtube done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    // 오류 발생 시, 비상 경보를 발송하고 오류 메시지를 출력
    emergencyAlarm("GoogleYoutube.dailyYoutube error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

module.exports = GoogleYoutube;
