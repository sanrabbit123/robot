/**
 * CronGhost 클래스는 홈리에종 시스템에서 다양한 크론 작업을 관리합니다.
 * 이 클래스는 주기적인 작업을 수행하여 시스템 상태를 점검하고 데이터를 동기화합니다.
 * @constructor
 */
const CronGhost = function () {
  /**
   * Mother 클래스의 인스턴스를 생성하여 시스템의 주요 기능을 사용합니다.
   * @type {Object}
   */
  const Mother = require(process.cwd() + "/apps/mother.js");

  /**
   * BackMaker 클래스의 인스턴스를 생성하여 데이터베이스 작업을 처리합니다.
   * @type {Object}
   */
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");

  /**
   * 주소 정보 객체를 가져옵니다.
   * @type {Object}
   */
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");

  /**
   * Mother 클래스의 인스턴스를 this에 할당하여 클래스 전반에서 사용합니다.
   * @type {Object}
   */
  this.mother = new Mother();

  /**
   * BackMaker 클래스의 인스턴스를 this에 할당하여 데이터베이스 작업에 사용합니다.
   * @type {Object}
   */
  this.back = new BackMaker();

  /**
   * 시스템에서 사용하는 주소 정보를 this에 할당합니다.
   * @type {Object}
   */
  this.address = ADDRESS;

  /**
   * cronGhost 관련 파일이 위치한 디렉토리를 설정합니다.
   * @type {string}
   */
  this.dir = `${process.cwd()}/apps/cronGhost`;

  /**
   * 기본 포트를 설정합니다.
   * @type {number}
   */
  this.generalPort = 3000;
}

/**
 * aliveTest 메서드는 시스템의 상태를 확인하고 계좌 동기화 작업을 수행하는 비동기 함수입니다.
 * 주기적으로 시스템의 상태를 점검하고 계좌 내역을 동기화하여 최신 상태를 유지합니다.
 * @param {Object} MONGOC - MongoDB 연결 객체입니다.
 */
CronGhost.prototype.aliveTest = async function (MONGOC) {
  /**
   * this를 instance 변수에 할당하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * 주소 정보 객체를 가져옵니다.
   * @type {Object}
   */
  const address = this.address;

  /**
   * Mother 클래스의 다양한 유틸리티 메서드를 비구조화 할당으로 추출합니다.
   * @type {Function}
   */
  const { requestSystem, messageLog, errorLog, emergencyAlarm, aliveLog, dateToString, stringToDate } = this.mother;

  /**
   * 일반적으로 사용할 포트를 가져옵니다.
   * @type {number}
   */
  const { generalPort } = this;

  /**
   * 제어 경로를 설정합니다.
   * @type {string}
   */
  const controlPath = "/ssl";

  /**
   * BackMaker 인스턴스를 back 변수에 할당합니다.
   * @type {Object}
   */
  const back = this.back;

  /**
   * MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
   * @type {Object}
   */
  const selfMongo = MONGOC;

  /**
   * 시각적으로 구분하기 위한 바(bar) 문자열입니다.
   * @type {string}
   */
  const bar = "================================================";

  /**
   * 더 긴 바(bar) 문자열입니다.
   * @type {string}
   */
  const bar2 = "====================================================================";

  /**
   * 타임아웃 상수를 1초(1000ms)로 설정합니다.
   * @type {number}
   */
  const timeoutConst = 1 * 1000;

  /**
   * Pushbullet API를 통해 시스템의 상태를 확인하기 위해 원본 응답 데이터를 가져옵니다.
   * @type {Object}
   */
  const originalResponse = await requestSystem("https://api.pushbullet.com/v2/permanents/ujEVkZaUIQCsjA8RALCBgW_thread_36", {}, {
    method: "get",
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ko-KR,ko;q=0.9",
      "API-Version": "2014-05-07",
      "Authorization": "Basic OWdKdk94bTNrQ2tUMUNwMVVxSW5jT29kQ3dCZnhnWE46",
      "Host": "api.pushbullet.com",
      "Origin": "https://www.pushbullet.com",
      "Referer": "https://www.pushbullet.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
      "X-User-Agent": "Pushbullet Website 162",
    }
  });

  /**
   * 원본 응답 데이터를 시간순으로 정렬합니다.
   * @type {Array}
   */
  const targetArray = originalResponse.data.thread.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  /**
   * 계좌 내역 필터링에 사용할 시작 번호와 종료 번호를 설정합니다.
   * @type {string}
   */
  const accountStartNumber = "049";
  const accountEndNumber = "022";

  let res, targets, targetNumber, successNum, failNum, message;
  let instances;
  let thisObj;
  let diskMongoMessage;
  let thisDisk, thisMongo;
  let tempMessage;
  let percentage;
  let tong;
  let timeoutId;

  try {
    /**
     * 계좌 동기화 작업을 수행하는 비동기 함수입니다.
     * @async
     */
    const accountSync = async () => {
      /**
       * 계좌 내역이 저장된 컬렉션 이름을 설정합니다.
       * @type {string}
       */
      const collection = "accountHistory";

      /**
       * MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
       * @type {Object}
       */
      const selfMongo = MONGOC;

      let date, messageArr, index, amount, name, body, data, rows, original;

      /**
       * MongoDB에서 accountHistory 컬렉션의 모든 데이터를 읽어와 최신 순으로 정렬합니다.
       * @type {Array}
       */
      rows = await back.mongoRead(collection, {}, { selfMongo });
      rows.sort((a, b) => {
        return b.date.valueOf() - a.date.valueOf();
      });

      /**
       * 가장 최근의 데이터를 original 변수에 할당합니다.
       * @type {Object}
       */
      [original] = rows;

      /**
       * 동기화할 데이터를 저장할 배열을 초기화합니다.
       * @type {Array}
       */
      data = [];

      /**
       * Pushbullet에서 가져온 메시지 데이터를 순회하면서 필요한 정보를 추출합니다.
       * 각 메시지는 계좌 내역을 나타낼 수 있으며, 이 정보는 나중에 동기화 및 확인에 사용됩니다.
       */
      for (let obj of targetArray) {
        /**
         * 각 메시지의 본문 내용을 body 변수에 저장합니다.
         * body에는 계좌 거래 내역 등의 정보가 포함될 수 있습니다.
         * @type {string}
         */
        body = obj.body;

        /**
         * 메시지 본문에 '입금'과 '기업'이라는 키워드가 포함된 경우에만 해당 메시지를 처리합니다.
         * '입금'은 거래 발생을, '기업'은 특정 은행(기업은행)을 나타냅니다.
         */
        if (/입금/gi.test(body) && /기업/gi.test(body)) {
          /**
           * 메시지 본문을 줄 단위로 나누고, 각 줄에서 앞뒤 공백을 제거한 배열을 만듭니다.
           * 이를 통해 메시지의 각 라인을 개별적으로 처리할 수 있습니다.
           * @type {Array<string>}
           */
          messageArr = body.split("\n").map((str) => {
            return str.trim();
          });

          /**
           * 빈 문자열을 제거하여 의미 없는 데이터를 걸러냅니다.
           * 또한, '[홈리에종]'이라는 문자열을 제거하고, 라인의 마지막에 있는 콜론(:)도 제거합니다.
           * @type {Array<string>}
           */
          messageArr = messageArr.filter((str) => {
            return str.trim() !== "";
          }).map((str) => {
            return str.replace(/\[홈리에종\] /gi, "").trim().replace(/\:$/gi, '');
          });

          /**
           * 대괄호([])로 둘러싸인 라인들을 필터링하여 제거합니다.
           * 또한, 계좌 시작 번호와 종료 번호가 지정된 패턴과 일치하는 라인을 제거합니다.
           * 이는 계좌 정보가 아닌 부가적인 정보를 제거하기 위함입니다.
           * @type {Array<string>}
           */
          messageArr = messageArr.filter((str) => {
            return !(/^\[/.test(str) && /^\]/.test(str));
          }).filter((str) => {
            return !((new RegExp('^' + accountStartNumber)).test(str) && (new RegExp(accountEndNumber + '$')).test(str));
          });

          /**
           * 메시지의 마지막 줄이 '기업'으로 끝나는 경우 해당 줄을 제거합니다.
           * 이는 불필요한 은행 이름 정보가 포함될 수 있기 때문입니다.
           */
          if (messageArr[messageArr.length - 1].trim() === "기업") {
            messageArr = messageArr.slice(0, -1);
          }

          /**
           * 특정 키워드(KG이니시스)가 포함된 메시지를 필터링하여 제거합니다.
           * 이는 특정 결제 서비스에 관련된 정보가 포함된 줄을 제거하기 위함입니다.
           */
          messageArr = messageArr.filter((arr) => {
            return !/KG이니시스/gi.test(arr[4]);
          });

          /**
           * 메시지 배열의 길이가 2 이상인 경우에만 데이터를 처리합니다.
           * 이는 의미 있는 데이터가 포함된 경우에만 데이터를 추출하기 위함입니다.
           */
          if (messageArr.length >= 2) {

            /**
             * '입금'이라는 키워드가 포함된 인덱스를 찾습니다.
             * 이는 해당 줄에서 금액 정보를 추출하기 위함입니다.
             * @type {number}
             */
            index = messageArr.findIndex((str) => {
              return /^입금/gi.test(str.trim());
            });

            /**
             * '입금' 키워드를 찾지 못한 경우, 메시지를 유효하지 않은 것으로 간주하고 오류를 발생시킵니다.
             */
            if (index === -1) {
              throw new Error("invalid message");
            }

            /**
             * 금액 정보를 추출하여 숫자로 변환하고, 숫자가 아닌 경우 오류를 발생시킵니다.
             * 금액 정보는 입금 내역에서 중요한 정보이므로 정확히 추출되어야 합니다.
             * @type {number}
             */
            amount = Math.floor(Number(messageArr[index].replace(/[^0-9]/gi, '')));
            if (Number.isNaN(amount)) {
              throw new Error("invalid message, NaN amount");
            }

            /**
             * 이름 정보를 추출하고, 문자열이 아닌 경우 오류를 발생시킵니다.
             * 이름은 입금자의 이름으로 추정되며, 정확히 추출되어야 합니다.
             * @type {string}
             */
            if (typeof messageArr[index + 1] !== "string") {
              throw new Error("invalid message, name error");
            }
            name = messageArr[index + 1].trim();

            /**
             * 날짜 정보를 추출하여 문자열을 날짜 객체로 변환합니다.
             * 날짜 정보는 거래 내역에서 중요한 요소이므로 정확히 변환되어야 합니다.
             * @type {Date}
             */
            date = stringToDate(messageArr[index - 1].trim().replace(/\//gi, '-') + ":00");

            /**
             * 추출된 데이터를 데이터 배열에 추가합니다.
             * 이 데이터는 나중에 확인 및 동기화 작업에 사용됩니다.
             */
            data.push({
              date,
              amount,
              name,
              confirm: false,
            });
          }
        }
      }

      /**
       * 기존 데이터와 새로 추출된 데이터를 비교하여 중복을 확인하고,
       * 중복된 항목의 confirm 값을 true로 설정합니다.
       */
      for (let d of original.data) {
        for (let o of data) {
          if (dateToString(o.date, true) === dateToString(d.date, true) && o.amount === d.amount && o.name === d.name) {
            o.confirm = true;
          }
        }
      }

      /**
       * 확인되지 않은 새로운 데이터만 서버에 전송하여 알림을 발생시킵니다.
       * 이는 새로운 입금 내역이 시스템에 기록되었음을 알리기 위함입니다.
       */
      for (let o of data) {
        if (!o.confirm) {
          await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/receiveSms", { date: new Date(), amount: o.amount, name: o.name }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }

      /**
       * 최종적으로 모든 데이터를 MongoDB에 저장하여 기록을 유지합니다.
       * 이는 추후 분석이나 기록 보관용으로 사용됩니다.
       */
      await back.mongoCreate(collection, {
        date: new Date(),
        data,
      }, {
        selfMongo
      });
    };

    // 계좌 동기화 작업을 실행합니다.
    await accountSync();

  } catch (e) {
    // 오류가 발생한 경우 비상 알람을 전송합니다.
    await emergencyAlarm("alive test error : " + e.message);
  }
};

/**
 * basicAsyncRequest 메서드는 여러 비동기 요청을 순차적으로 처리하여 시스템의 데이터를 동기화하는 역할을 합니다.
 * 이 메서드는 여러 API 요청을 순서대로 실행하며, 각각의 요청이 성공적으로 완료된 후에 다음 요청이 실행됩니다.
 * @param {Object} MONGOC - MongoDB 연결 객체입니다.
 * @returns {Promise<void>}
 */
CronGhost.prototype.basicAsyncRequest = async function (MONGOC) {
  /**
   * this를 instance 변수에 할당하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * 주소 정보 객체를 가져옵니다.
   * 이 객체는 다양한 API 엔드포인트의 호스트 정보를 포함합니다.
   * @type {Object}
   */
  const address = this.address;

  /**
   * Mother 클래스의 유틸리티 메서드를 비구조화 할당으로 추출합니다.
   * requestSystem: 외부 시스템에 HTTP 요청을 보내는 함수입니다.
   * messageLog: 로그 메시지를 기록하는 함수입니다.
   * errorLog: 오류 로그를 기록하는 함수입니다.
   * @type {Function}
   */
  const { requestSystem, messageLog, errorLog } = this.mother;

  /**
   * 일반적으로 사용할 포트를 가져옵니다.
   * @type {number}
   */
  const { generalPort } = this;

  /**
   * MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
   * 이 변수는 이후 데이터베이스 작업에 사용됩니다.
   * @type {Object}
   */
  const selfMongo = MONGOC;

  try {
    /**
     * 첫 번째 비동기 요청을 실행합니다.
     * /parsingCashReceipt 엔드포인트로 요청을 보내 현금 영수증 데이터를 파싱합니다.
     * Content-Type 헤더를 'application/json'으로 설정하여 JSON 데이터를 전송합니다.
     * @returns {Promise} 첫 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
     */
    requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/parsingCashReceipt", 
    { data: null }, 
    { headers: { "Content-Type": "application/json" } })

      // 첫 번째 요청이 성공적으로 완료되면 두 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /stylingFormSync 엔드포인트로 요청을 보내 스타일링 폼 데이터를 동기화합니다.
         * @returns {Promise} 두 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/stylingFormSync", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 두 번째 요청이 성공적으로 완료되면 세 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /metaInstant 엔드포인트로 요청을 보내 메타데이터를 즉시 동기화합니다.
         * @returns {Promise} 세 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.contentsinfo.host + ":" + String(generalPort) + "/metaInstant", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 세 번째 요청이 성공적으로 완료되면 네 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /callHistory 엔드포인트로 요청을 보내 통화 기록 데이터를 동기화합니다.
         * @returns {Promise} 네 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/callHistory", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 네 번째 요청이 성공적으로 완료되면 다섯 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /calendarSync 엔드포인트로 요청을 보내 일정 데이터를 동기화합니다.
         * @returns {Promise} 다섯 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/calendarSync", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 다섯 번째 요청이 성공적으로 완료되면 여섯 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /workProjectActionSync 엔드포인트로 요청을 보내 작업 프로젝트 행동 데이터를 동기화합니다.
         * @returns {Promise} 여섯 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/workProjectActionSync", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 여섯 번째 요청이 성공적으로 완료되면 일곱 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /workProposalToClient 엔드포인트로 요청을 보내 고객에게 작업 제안을 동기화합니다.
         * @returns {Promise} 일곱 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/workProposalToClient", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 일곱 번째 요청이 성공적으로 완료되면 여덟 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /photoStatusSync 엔드포인트로 요청을 보내 사진 상태 데이터를 동기화합니다.
         * @returns {Promise} 여덟 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/photoStatusSync", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 여덟 번째 요청이 성공적으로 완료되면 아홉 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /storeClientAnalytics 엔드포인트로 요청을 보내 클라이언트 분석 데이터를 동기화합니다.
         * 이 요청은 빠르게 처리되도록 'fast' 모드를 사용합니다.
         * @returns {Promise} 아홉 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/storeClientAnalytics", 
        { fast: true }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 아홉 번째 요청이 성공적으로 완료되면 열 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /timeAspirantCommon 엔드포인트로 요청을 보내 지망자의 시간 정보를 업데이트합니다.
         * @param {Object} options - 옵션 객체입니다.
         * @param {string} options.mode - 'update' 모드로 실행됩니다.
         * @returns {Promise} 열 번째 요청이 완료되면 다음 then 블록이 실행됩니다.
         */
        return requestSystem("https://" + address.secondinfo.host + ":" + String(3003) + "/timeAspirantCommon", 
        { mode: "update" }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 열 번째 요청이 성공적으로 완료되면 열한 번째 요청을 실행합니다.
      .then(() => {
        /**
         * /designerCareerSync 엔드포인트로 요청을 보내 디자이너 경력 데이터를 업데이트합니다.
         * @param {Object} options - 옵션 객체입니다.
         * @param {string} options.mode - 'update' 모드로 실행됩니다.
         * @returns {Promise} 열한 번째 요청이 완료되면 마지막 요청이 실행됩니다.
         */
        return requestSystem("https://" + address.secondinfo.host + ":" + String(3003) + "/designerCareerSync", 
        { mode: "update" }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 열한 번째 요청이 성공적으로 완료되면 마지막 요청을 실행합니다.
      .then(() => {
        /**
         * /taxBill 엔드포인트로 요청을 보내 세금 계산서를 처리합니다.
         * @returns {Promise} 모든 요청이 성공적으로 완료된 후 최종적으로 작업이 종료됩니다.
         */
        return requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/taxBill", 
        { data: null }, 
        { headers: { "Content-Type": "application/json" } });
      })

      // 모든 요청이 완료된 후 발생하는 오류를 처리합니다.
      .catch((e) => {
        throw new Error(e);
      });

  } catch (e) {
    // 요청 중 오류가 발생하면 오류 로그를 기록합니다.
    await errorLog("basic async request error : " + e.message);
  }
}

/**
 * pollingAsyncRequest 메서드는 지정된 엔드포인트에 비동기 요청을 보내 폴링(polling) 작업을 수행합니다.
 * 이 메서드는 주기적으로 시스템의 특정 상태를 확인하거나 데이터를 갱신하기 위해 사용될 수 있습니다.
 * @param {Object} MONGOC - MongoDB 연결 객체입니다.
 * @returns {Promise<void>}
 */
CronGhost.prototype.pollingAsyncRequest = async function (MONGOC) {
  /**
   * this를 instance 변수에 할당하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * 주소 정보 객체를 가져옵니다.
   * 이 객체는 다양한 API 엔드포인트의 호스트 정보를 포함합니다.
   * @type {Object}
   */
  const address = this.address;

  /**
   * Mother 클래스의 유틸리티 메서드를 비구조화 할당으로 추출합니다.
   * requestSystem: 외부 시스템에 HTTP 요청을 보내는 함수입니다.
   * messageLog: 로그 메시지를 기록하는 함수입니다.
   * errorLog: 오류 로그를 기록하는 함수입니다.
   * @type {Function}
   */
  const { requestSystem, messageLog, errorLog } = this.mother;

  /**
   * 일반적으로 사용할 포트를 가져옵니다.
   * @type {number}
   */
  const { generalPort } = this;

  /**
   * MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
   * 이 변수는 이후 데이터베이스 작업에 사용됩니다.
   * @type {Object}
   */
  const selfMongo = MONGOC;

  try {
    /**
     * /designerFolder 엔드포인트에 비동기 요청을 보냅니다.
     * 이 요청은 디자이너 폴더에 관련된 데이터를 가져오거나 갱신하는데 사용될 수 있습니다.
     * Content-Type 헤더를 'application/json'으로 설정하여 JSON 데이터를 전송합니다.
     * 요청 중 오류가 발생할 경우, catch 블록에서 해당 오류를 처리하고, 새로운 Error 객체를 던집니다.
     * @returns {Promise<void>} 요청이 완료되면 결과를 처리하거나 오류가 발생하면 catch 블록으로 넘어갑니다.
     */
    requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/designerFolder", 
    { data: null }, 
    { headers: { "Content-Type": "application/json" } })
      .catch((e) => {
        // 요청 중 오류가 발생하면 오류 메시지를 포함한 Error 객체를 던집니다.
        throw new Error(e);
      });

  } catch (e) {
    // 요청 또는 catch 블록에서 오류가 발생하면 오류 로그를 기록합니다.
    await errorLog("basic async request error : " + e.message);
  }
}

/**
 * diskTestAndCost 메서드는 시스템의 특정 서버들의 디스크 상태를 확인하고 그 결과를 처리하는 비동기 함수입니다.
 * 이 메서드는 여러 서버에 디스크 상태를 요청하고, 오류가 발생하면 로그를 기록하거나 비상 알림을 전송할 수 있습니다.
 * @param {Object} MONGOC - MongoDB 연결 객체입니다.
 * @returns {Promise<void>}
 */
CronGhost.prototype.diskTestAndCost = async function (MONGOC) {
  /**
   * this를 instance 변수에 할당하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * Mother 클래스에서 제공하는 유틸리티 메서드를 비구조화 할당으로 추출합니다.
   * requestSystem: 외부 시스템에 HTTP 요청을 보내는 함수입니다.
   * errorLog: 오류 로그를 기록하는 함수입니다.
   * emergencyAlarm: 비상 상황 시 알림을 보내는 함수입니다.
   * aliveLog: 시스템 상태를 기록하는 함수입니다.
   * @type {Function}
   */
  const { requestSystem, errorLog, emergencyAlarm, aliveLog } = this.mother;

  try {
    /**
     * 디스크 상태를 확인할 서버들의 이름과 포트를 정의합니다.
     * @type {Array<Object>}
     */
    const targets = [
      { name: "office", port: 3000 },  // 첫 번째 서버: office, 포트 3000
      { name: "office", port: 3002 },  // 두 번째 서버: office, 포트 3002
      { name: "office", port: 3003 },  // 세 번째 서버: office, 포트 3003
    ];

    /**
     * 로봇 관련 요청에 사용할 기본 포트를 설정합니다.
     * @type {number}
     */
    const robotPort = 3000;

    /**
     * 디스크 상태를 요청할 경로를 상수로 설정합니다.
     * @type {string}
     */
    const pathConst = "/disk";

    /**
     * 요청에 사용할 프로토콜을 설정합니다.
     * https 프로토콜을 사용하여 안전한 통신을 보장합니다.
     * @type {string}
     */
    const protocol = "https:";

    /**
     * 각 서버(targets)로 디스크 상태를 요청합니다.
     * 서버 목록(targets)을 순회하면서 각 서버에 비동기 요청을 보냅니다.
     */
    for (let { name, port } of targets) {
      /**
       * 각 서버에 대해 requestSystem 메서드를 사용하여 디스크 상태를 요청합니다.
       * 요청 URL은 프로토콜, 호스트, 포트, 경로로 구성됩니다.
       * @returns {Promise<void>} 요청이 완료되면 다음 서버로 이동합니다.
       */
      await requestSystem(protocol + "//" + instance.address.officeinfo.ghost.host + ":" + String(port) + pathConst);
    }

  } catch (e) {
    /**
     * 오류가 발생하면 해당 오류를 콘솔에 출력합니다.
     * 이 부분은 시스템에서 오류를 처리하기 위한 첫 번째 단계로 작동합니다.
     */
    console.log(e);
  }
}

/**
 * cronServer 메서드는 서버를 설정하고 다양한 크론 작업을 수행하기 위한 비동기 함수입니다.
 * 이 메서드는 HTTP 서버를 시작하고, 웹소켓 연결을 설정하며, 다양한 주기적 작업을 설정합니다.
 * @returns {Promise<void>}
 */
CronGhost.prototype.cronServer = async function () {
  /**
   * this를 instance 변수에 할당하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * 주소 정보 객체를 가져옵니다.
   * @type {Object}
   */
  const address = this.address;

  /**
   * Mother 클래스의 여러 유틸리티 메서드를 비구조화 할당으로 추출합니다.
   * @type {Function}
   */
  const { shellExec, fileSystem, messageSend, requestSystem, pureServer, dateToString, mongo, mongolocalinfo, mongoinfo, mongoconsoleinfo, errorLog } = this.mother;

  /**
   * 서버가 사용할 포트를 설정합니다.
   * @type {number}
   */
  const port = 53000;

  /**
   * 주기적으로 실행할 작업의 간격을 밀리초 단위로 설정합니다. (10분)
   * @type {number}
   */
  const interval = (10 * 60 * 1000);

  /**
   * 날짜 객체를 복사하는 유틸리티 함수입니다.
   * @param {Date} dateObj - 복사할 날짜 객체
   * @returns {Date} 복사된 새로운 날짜 객체
   */
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }

  /**
   * 숫자가 10보다 작은 경우 앞에 0을 추가하는 유틸리티 함수입니다.
   * @param {number} num - 변환할 숫자
   * @returns {string} 0이 추가된 문자열
   */
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }

  /**
   * CronSource 클래스를 가져와 인스턴스를 생성합니다.
   * 이 클래스는 크론 작업에 필요한 소스 데이터를 관리합니다.
   * @type {Object}
   */
  const CronSource = require(`${this.dir}/source/cronSource.js`);

  /**
   * MongoDB 연결을 위한 객체를 생성합니다.
   * @type {Object}
   */
  const MONGOC = new mongo(mongoinfo);
  const MONGOLOCALC = new mongo(mongoinfo);

  try {
    /**
     * HTTP 서버와 Express 애플리케이션, 웹소켓 등을 설정하는 데 필요한 모듈을 가져옵니다.
     * @type {Object}
     */
    const https = require("https");
    const express = require("express");
    const WebSocket = require("ws");
    const url = require("url");

    /**
     * Express 애플리케이션을 생성합니다.
     * @type {Object}
     */
    const app = express();

    /**
     * 사용자 에이전트를 감지하기 위한 express-useragent 미들웨어를 설정합니다.
     * @type {Object}
     */
    const useragent = require("express-useragent");

    let pems;
    let pemsLink;
    let certDir;
    let keyDir;
    let caDir;
    let intervalFunc, startTime, today;
    let intervalFunc0, intervalFunc1, intervalFunc2, intervalFunc3;
    let generalSocket, server;

    /**
     * 사용자 에이전트 및 JSON, URL 인코딩된 요청을 처리할 수 있는 미들웨어를 설정합니다.
     */
    app.use(useragent.express());
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    /**
     * MongoDB에 연결합니다.
     * MONGOC과 MONGOLOCALC는 각각 원격과 로컬 MongoDB 인스턴스를 나타냅니다.
     */
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    /**
     * 현재 시간을 this.time에 저장하고, 크론 작업 ID들을 초기화합니다.
     * @type {Date}
     */
    this.time = new Date();
    this.cronId = {
      unique: "",
      week: "",
      day: "",
      hour: "",
    };

    /**
     * CronSource 인스턴스를 생성하여 크론 작업에 필요한 소스 데이터를 관리합니다.
     * @type {Object}
     */
    this.source = new CronSource(
      this.mother,
      this.back,
      this.address,
      MONGOC,
      MONGOLOCALC
    );

    /**
     * 소스 데이터를 로드합니다.
     * 이 함수는 크론 작업에 필요한 데이터를 미리 로드하여 준비합니다.
     */
    await this.source.sourceLoad();

    /**
     * 웹소켓 서버를 설정합니다.
     * @type {Object}
     */
    generalSocket = new WebSocket.Server({ noServer: true });

    /**
     * 웹소켓 서버에 연결된 클라이언트가 메시지를 전송했을 때 발생하는 이벤트를 처리합니다.
     */
    generalSocket.on("connection", (ws) => {
      ws.on("message", (message) => {
        try {
          /**
           * 메시지를 JSON 형식으로 파싱하고, 모드에 따라 클라이언트를 등록하거나 메시지를 전송합니다.
           */
          const { mode, to, data } = JSON.parse(String(message));
          if (mode === "register") {
            ws.__who__ = data; // 클라이언트를 등록합니다.
          } else if (mode === "message") {
            /**
             * 특정 클라이언트에게 메시지를 전송합니다.
             */
            const clients = [ ...generalSocket.clients ];
            for (let c of clients) {
              if (c.__who__ === to) {
                c.send(JSON.stringify({ from: ws.__who__, data }));
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    /**
     * 웹소켓 연결이 종료되었을 때 발생하는 이벤트를 처리합니다.
     */
    generalSocket.on("close", (ws) => {
      console.log(ws.__who__);
    });

    /**
     * HTTP GET 요청에 대한 라우터를 설정합니다.
     */
    app.get("/:id", async function (req, res) {
      /**
       * CORS 및 응답 헤더를 설정합니다.
       */
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        /**
         * 요청된 ID에 따라 적절한 응답을 전송합니다.
         * 'ssl' 또는 'disk'가 요청되면 디스크 상태를 읽어와서 JSON 형식으로 응답합니다.
         */
        if (req.params.id === "ssl") {
          const disk = await diskReading();
          res.send(JSON.stringify({ disk: disk.toArray() }));
        } else if (req.params.id === "disk") {
          const disk = await diskReading();
          res.send(JSON.stringify({ disk: disk.toArray() }));
        } else {
          res.send(JSON.stringify({ message: "hi" }));
        }
      } catch (e) {
        /**
         * 요청 처리 중 오류가 발생하면 오류 로그를 기록하고, 오류 메시지를 응답합니다.
         */
        errorLog("Cron launcher 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
        console.log(e);
        res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * HTTP POST 요청에 대한 라우터를 설정합니다.
     */
    app.post("/wssStatus", async function (req, res) {
      /**
       * CORS 및 응답 헤더를 설정합니다.
       */
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        /**
         * 현재 연결된 모든 웹소켓 클라이언트의 상태를 응답합니다.
         */
        const clients = [ ...generalSocket.clients ].map((obj) => { return obj.__who__ });
        res.send(JSON.stringify(clients));
      } catch (e) {
        /**
         * 요청 처리 중 오류가 발생하면 오류 로그를 기록하고, 오류 메시지를 응답합니다.
         */
        errorLog("Cron launcher 서버 문제 생김 (rou_post_wssStatus): " + e.message).catch((e) => { console.log(e); });
        console.log(e);
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    console.log(`set router`);

    /**
     * 주기적으로 실행할 작업을 정의합니다.
     */
    intervalFunc = async () => {
      try {
        /**
         * 현재 시간을 가져와 크론 작업 ID를 생성하고, 대상 작업을 실행합니다.
         * 
         * 1. 현재 시간을 가져와 'now' 변수에 저장합니다. 
         *    - 이는 현재 시각을 기준으로 크론 작업을 수행하기 위함입니다.
         * @type {Date}
         */
        const now = new Date();

        /**
         * 현재 요일을 숫자로 반환합니다.
         * - 0: 일요일, 1: 월요일, ..., 6: 토요일
         * @type {number}
         */
        const dayNumber = now.getDay();

        /**
         * 현재 시간을 'YYYY-MM-DD HH:MM:SS' 형식의 문자열로 변환하여 저장합니다.
         * - 'dateToString' 함수는 현재 시간을 사람이 읽을 수 있는 형식으로 변환합니다.
         * @type {string}
         */
        const dateString = dateToString(now, true);

        /**
         * 시간과 날짜를 처리하기 위해 임시 배열을 선언합니다.
         * - tempArr: 날짜와 시간을 분리한 값을 저장합니다.
         * - tempArr2: 날짜 부분을 연도, 월, 일로 분리한 값을 저장합니다.
         * - tempArr3: 시간 부분을 시, 분, 초로 분리한 값을 저장합니다.
         * @type {Array<string>}
         */
        let tempArr, tempArr2, tempArr3;

        /**
         * 날짜 문자열을 ' '로 나누어 날짜와 시간 부분을 분리하여 tempArr에 저장합니다.
         * - 예: '2024-09-01 13:45:30' => ['2024-09-01', '13:45:30']
         */
        tempArr = dateString.split(' ');

        /**
         * tempArr의 첫 번째 요소(날짜 부분)를 '-'로 나누어 연도, 월, 일로 분리합니다.
         * - 예: '2024-09-01' => ['2024', '09', '01']
         */
        tempArr2 = tempArr[0].split('-');

        /**
         * tempArr의 두 번째 요소(시간 부분)를 ':'로 나누어 시, 분, 초로 분리합니다.
         * - 예: '13:45:30' => ['13', '45', '30']
         */
        tempArr3 = tempArr[1].split(':');

        /**
         * tempArr2 배열에서 날짜(일)를 추출합니다.
         * - 예: ['2024', '09', '01'] => '01'
         * @type {string}
         */
        let date = tempArr2[2];

        /**
         * tempArr3 배열에서 시간(시)을 추출합니다.
         * - 예: ['13', '45', '30'] => '13'
         * @type {string}
         */
        let hour = tempArr3[0];

        /**
         * tempArr3 배열에서 분의 첫 번째 자리 숫자를 추출합니다.
         * - 이는 분을 10분 단위로 나누기 위함입니다.
         * - 예: ['13', '45', '30'] => '4' (분의 첫 자리 숫자만 사용)
         * @type {string}
         */
        let minute = tempArr3[1].slice(0, 1);

        /**
         * 현재 시간의 복사본을 instance.time에 저장합니다.
         * - 'dateCopy' 함수는 현재 시간을 복사하여 원본이 변경되지 않도록 합니다.
         * @type {Date}
         */
        instance.time = dateCopy(now);

        /**
         * 유니크한 크론 작업 ID를 생성합니다.
         * - 'uniqueId'는 'u'로 시작하고, 날짜와 시간을 숫자로 변환하여 생성합니다.
         * - 예: '2024-09-01 13:45:30' => 'u2409011345'
         * @type {string}
         */
        let uniqueId = 'u' + dateString.slice(2, -4).replace(/[^0-9]/gi, '');

        /**
         * 주간 크론 작업 ID를 생성합니다.
         * - 'weekId'는 'w'로 시작하고, 요일, 시, 분(첫 자리)을 조합하여 생성합니다.
         * - 예: 요일 '1' (월요일), 시 '13', 분 '4' => 'w1134'
         * @type {string}
         */
        let weekId = 'w' + String(dayNumber) + hour + minute;

        /**
         * 일간 크론 작업 ID를 생성합니다.
         * - 'dayId'는 'd'로 시작하고, 시, 분(첫 자리)을 조합하여 생성합니다.
         * - 예: 시 '13', 분 '4' => 'd134'
         * @type {string}
         */
        let dayId = 'd' + hour + minute;

        /**
         * 시간별 크론 작업 ID를 생성합니다.
         * - 'hourId'는 'h'로 시작하고, 분(첫 자리)을 사용하여 생성합니다.
         * - 예: 분 '4' => 'h4'
         * @type {string}
         */
        let hourId = 'h' + minute;

        /**
         * 생성된 크론 작업 ID들을 instance.cronId 객체에 저장합니다.
         * - 이는 이후 크론 작업을 식별하고 관리하는 데 사용됩니다.
         */
        instance.cronId.unique = uniqueId;
        instance.cronId.week = weekId;
        instance.cronId.day = dayId;
        instance.cronId.hour = hourId;

        /**
         * 생성된 크론 작업 ID를 사용하여 대상 작업을 실행합니다.
         */
        await instance.source.targetLauching(instance.cronId);

      } catch (e) {
        /**
         * 작업 실행 중 오류가 발생하면 오류 로그를 기록하고 프로세스를 종료합니다.
         */
        await errorLog("cron ghost 문제 일어남 : " + e.message);
        process.exit();
      }
    }

    /**
     * 주기적으로 디스크 상태를 확인하는 작업을 정의합니다.
     */
    intervalFunc0 = async () => {
      try {
        await instance.diskTestAndCost(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * 주기적으로 비동기 요청을 처리하는 작업을 정의합니다.
     */
    intervalFunc1 = async () => {
      try {
        await instance.basicAsyncRequest(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * 주기적으로 서버 상태를 확인하는 작업을 정의합니다.
     */
    intervalFunc2 = async () => {
      try {
        await instance.aliveTest(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * 주기적으로 폴링 요청을 처리하는 작업을 정의합니다.
     */
    intervalFunc3 = async () => {
      try {
        await instance.pollingAsyncRequest(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * 현재 시간을 기준으로 타이머를 설정합니다.
     * 타이머는 주기적인 작업이 특정 시간 간격에 맞춰 실행되도록 설정됩니다.
     * 
     * 1. 현재 날짜와 시간을 나타내는 'today' 객체를 생성합니다.
     *    - 이는 타이머의 시작 시간을 계산하는 데 사용됩니다.
     * @type {Date}
     */
    today = new Date();

    /**
     * 현재 분(minute)의 1의 자리 숫자를 가져와 'startTime' 변수에 저장합니다.
     * - 'today.getMinutes()'는 현재 시간을 분 단위로 반환합니다.
     * - 'zeroAddition' 함수는 분 값을 두 자리 문자열로 변환하며, 예를 들어 '07'에서 '7'을 추출합니다.
     * - 이 숫자는 타이머가 언제 시작할지를 결정하는 데 사용됩니다.
     * @type {number}
     */
    startTime = Number(zeroAddition(today.getMinutes()).slice(1));

    /**
     * 만약 'startTime'이 0이라면, 타이머가 즉시 시작되도록 'startTime'을 10으로 설정합니다.
     * - 0분(10분 단위로 정확히 떨어지는 시간)에 타이머가 시작되도록 설정합니다.
     * @type {number}
     */
    if (startTime === 0) {
      startTime = 10;
    }

    /**
     * 10분 간격으로 작업이 실행되도록 'startTime'을 계산합니다.
     * - 현재 분의 1의 자리 숫자를 10에서 빼고, 그 결과를 분(minute)에서 밀리초(milliseconds)로 변환합니다.
     * - 예를 들어, 현재 분의 1의 자리 숫자가 7이라면, 3분 후에 타이머가 시작됩니다 (10 - 7 = 3).
     * - 3분을 밀리초로 변환하면 3 * 60 * 1000 = 180,000ms(3분)가 됩니다.
     * @type {number}
     */
    startTime = (10 - startTime) * (60 * 1000);

    /**
     * 설정된 타이머가 종료되면 주기적인 작업을 실행하고, 각 작업을 특정 간격으로 반복합니다.
     * 
     * 1. 'setTimeout' 함수는 'startTime'이 지나면 첫 번째 주기적인 작업을 시작합니다.
     *    - 각 작업은 비동기로 실행되며, catch 블록에서 오류를 처리합니다.
     * 2. 'setInterval' 함수는 각 작업이 설정된 간격으로 반복 실행되도록 설정합니다.
     *    - intervalFunc: 10분 간격으로 실행됩니다.
     *    - intervalFunc0: 1시간 간격으로 실행됩니다.
     *    - intervalFunc1: 20분 간격으로 실행됩니다.
     *    - intervalFunc2: 5분 간격으로 실행됩니다.
     *    - intervalFunc3: 10분 간격으로 실행됩니다.
     */
    setTimeout(() => {
      // 첫 번째 주기적인 작업을 시작합니다.
      intervalFunc().catch((err) => { console.log(err); });
      
      // 디스크 테스트 작업을 시작합니다.
      intervalFunc0().catch((err) => { console.log(err); });
      
      // 비동기 요청 작업을 시작합니다.
      intervalFunc1().catch((err) => { console.log(err); });
      
      // 서버 상태 확인 작업을 시작합니다.
      intervalFunc2().catch((err) => { console.log(err); });
      
      // 폴링 작업을 시작합니다.
      intervalFunc3().catch((err) => { console.log(err); });
      
      // 10분 간격으로 intervalFunc을 반복 실행합니다.
      setInterval(intervalFunc, interval);
      
      // 1시간 간격으로 intervalFunc0을 반복 실행합니다.
      setInterval(intervalFunc0, 1 * 60 * 60 * 1000);
      
      // 20분 간격으로 intervalFunc1을 반복 실행합니다.
      setInterval(intervalFunc1, 1 * 20 * 60 * 1000);
      
      // 5분 간격으로 intervalFunc2을 반복 실행합니다.
      setInterval(intervalFunc2, 1 * 5 * 60 * 1000);
      
      // 10분 간격으로 intervalFunc3을 반복 실행합니다.
      setInterval(intervalFunc3, 1 * 10 * 60 * 1000);
    }, startTime);

    /**
     * PEM 키를 설정하여 HTTPS 서버를 시작합니다.
     * 서버는 클라이언트와의 안전한 통신을 위해 HTTPS 프로토콜을 사용합니다.
     */
    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.officeinfo.host;
    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);
    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    /**
     * HTTPS 서버를 생성하고, 웹소켓 연결을 처리하는 업그레이드 이벤트를 설정합니다.
     */
    server = https.createServer(pems, app);
    server.on("upgrade", (request, socket, head) => {
      const { pathname } = url.parse(request.url);
      if (/realTimeCommunication/gi.test(pathname)) {
        generalSocket.handleUpgrade(request, socket, head, (ws) => {
          generalSocket.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    /**
     * 서버를 설정된 포트에서 실행하고, 서버가 실행 중임을 콘솔에 출력합니다.
     */
    server.listen(port, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    /**
     * 서버 설정 중 오류가 발생하면 오류를 콘솔에 출력합니다.
     */
    console.log(e);
  }
}

module.exports = CronGhost;
