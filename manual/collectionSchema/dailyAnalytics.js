/**
 * @const {string} collectionName - 콜렉션 이름
 * @description 매일 웹에 대한 구글 Analytics를 통해 기록된 문의 고객 데이터를 저장하는 컬렉션
 */
const collectionName = "dailyAnalytics";

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 구글 Analytics를 통해 매일 웹에서 문의한 고객에 대한 정보를 저장한 컬렉션
 */
const collectionDescription = "매일 그 날 웹에 대해서 구글 Analytics를 통해 기록한 문의 고객에 대한 정보";

/**
 * @typedef {Object} DateRange
 * @property {string} from - 시작 날짜 (ISO 8601 형식)
 * @property {string} to - 종료 날짜 (ISO 8601 형식)
 */

/**
 * @typedef {Object} DetailCases
 * @property {string} case - 특정 케이스 이름 (예: 도시 이름, 소스 유형 등)
 * @property {number} value - 해당 케이스에 대한 값
 */

/**
 * @typedef {Object} Detail
 * @property {DetailCases[]} cases - 각 케이스별 상세 데이터
 * @property {number} total - 총 합계
 * @property {number} kinds - 케이스의 종류 개수
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {number} total - 전체 숫자 (사용자 수, 조회 수 등)
 * @property {Object.<string, Detail>} detail - 세부 정보 (도시, 소스, 캠페인 등)
 */

/**
 * @typedef {Object} ConversionData
 * @property {number} total - 총 전환 수
 * @property {Object.<string, Detail>} detail - 전환 관련 세부 정보
 */

/**
 * @typedef {Object} DailyAnalyticsData
 * @property {AnalyticsData} users - 사용자 관련 데이터
 * @property {AnalyticsData} views - 조회수 관련 데이터
 * @property {AnalyticsData} events - 이벤트 관련 데이터
 * @property {Object.<string, ConversionData>} conversion - 전환 관련 데이터
 */

/**
 * @typedef {Object} CollectionSampleData
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} anaid - Analytics ID
 * @property {DateRange} date - 데이터 기록 시작일과 종료일
 * @property {DailyAnalyticsData} data - 일일 Analytics 정보
 */

/**
 * @type {CollectionSampleData}
 * @description 첫 번째 샘플 데이터
 */
const collectionSampleData0 = {
  /**
   * MongoDB에서 자동 생성된 고유 식별자
   * @type {string}
   * @description 고유 식별자로, MongoDB에서 각 문서를 식별하는 데 사용됨
   */
  _id: "66dbd24e9c11e28c3a074ac1",

  /**
   * Analytics 고유 식별자
   * @type {string}
   * @description 각 문의 고객에 대한 고유한 분석 ID
   */
  anaid: "n2409_aa07s",

  /**
   * Analytics 데이터의 날짜 범위
   * @type {DateRange}
   * @description 해당 분석 데이터가 기록된 날짜 범위
   */
  date: {
    /**
     * 기록 시작 날짜
     * @type {string}
     * @description 분석 데이터가 시작된 시간 (ISO 8601 형식)
     */
    from: "2024-09-06T15:00:00.000Z",

    /**
     * 기록 종료 날짜
     * @type {string}
     * @description 분석 데이터가 종료된 시간 (ISO 8601 형식)
     */
    to: "2024-09-07T15:00:00.000Z"
  },

  /**
   * Analytics 데이터
   * @type {DailyAnalyticsData}
   * @description 해당 기간 동안의 사용자, 조회수, 이벤트 및 전환 관련 분석 데이터
   */
  data: {
    /**
     * 사용자 관련 데이터
     * @type {AnalyticsData}
     * @description 웹사이트 방문자 관련 통계 데이터
     */
    users: {
      /**
       * 전체 사용자 수
       * @type {number}
       * @description 해당 기간 동안 웹사이트를 방문한 총 사용자 수
       */
      total: 40,

      /**
       * 사용자 세부 정보
       * @type {Object.<string, Detail>}
       * @description 사용자 유형, 국가, 도시, 캠페인, 소스 등의 세부 정보
       */
      detail: {
        /**
         * 사용자 유형에 대한 데이터 (새 방문자 등)
         * @type {Detail}
         * @description 새 방문자와 기존 방문자의 비율을 나타냄
         */
        userType: {
          cases: [
            {
              /**
               * 방문자 유형
               * @type {string}
               * @description "New Visitor"는 새로운 방문자를 의미함
               */
              case: "New Visitor",
              /**
               * 해당 방문자 유형의 수
               * @type {number}
               * @description 새 방문자의 수
               */
              value: 14
            }
          ],
          /**
           * 총 사용자 수
           * @type {number}
           * @description 분석된 총 사용자 수 (여기선 36명으로 기록됨)
           */
          total: 36,
          /**
           * 사용자 유형의 종류 수
           * @type {number}
           * @description 방문자 유형의 종류 (새 방문자, 기존 방문자 등)
           */
          kinds: 3
        },
        /**
         * 국가별 사용자 데이터
         * @type {Detail}
         * @description 방문자들의 국가별 통계
         */
        country: {
          cases: [
            {
              /**
               * 방문자의 국가
               * @type {string}
               * @description 방문자가 속한 국가 (예: "South Korea")
               */
              case: "South Korea",
              /**
               * 해당 국가의 방문자 수
               * @type {number}
               * @description 해당 국가에서 방문한 사용자 수
               */
              value: 29
            }
          ],
          /**
           * 총 국가별 방문자 수
           * @type {number}
           * @description 해당 국가에서 방문한 총 사용자 수
           */
          total: 29,
          /**
           * 방문 국가의 종류 수
           * @type {number}
           * @description 방문자들이 속한 국가의 종류 (여기서는 1개 국가만 기록됨)
           */
          kinds: 1
        },
        /**
         * 도시별 사용자 데이터
         * @type {Detail}
         * @description 방문자의 도시별 통계
         */
        city: {
          cases: [
            {
              /**
               * 방문자의 도시
               * @type {string}
               * @description 방문자가 위치한 도시 (예: "Seoul")
               */
              case: "Seoul",
              /**
               * 해당 도시의 방문자 수
               * @type {number}
               * @description 해당 도시에서 방문한 사용자 수
               */
              value: 9
            },
            {
              /**
               * 방문자의 도시
               * @type {string}
               * @description 방문자가 위치한 도시 (예: "Busan")
               */
              case: "Busan",
              /**
               * 해당 도시의 방문자 수
               * @type {number}
               * @description 해당 도시에서 방문한 사용자 수
               */
              value: 3
            }
          ],
          /**
           * 총 도시별 방문자 수
           * @type {number}
           * @description 해당 도시에서 방문한 총 사용자 수
           */
          total: 30,
          /**
           * 방문 도시의 종류 수
           * @type {number}
           * @description 방문자들이 위치한 도시의 종류 (16개의 도시 기록)
           */
          kinds: 16
        },
        /**
         * 캠페인 관련 데이터
         * @type {Detail}
         * @description 사용자가 클릭한 광고 또는 캠페인과 관련된 통계
         */
        campaign: {
          cases: [
            {
              /**
               * 캠페인 이름
               * @type {string}
               * @description 캠페인 이름 (예: "(not set)")
               */
              case: "(not set)",
              /**
               * 해당 캠페인을 통한 방문자 수
               * @type {number}
               * @description 해당 캠페인을 통해 유입된 사용자 수
               */
              value: 18
            }
          ],
          /**
           * 총 캠페인을 통한 방문자 수
           * @type {number}
           * @description 캠페인을 통해 유입된 총 사용자 수
           */
          total: 40,
          /**
           * 캠페인의 종류 수
           * @type {number}
           * @description 캠페인의 종류 수 (12개의 캠페인이 기록됨)
           */
          kinds: 12
        },
        /**
         * 트래픽 소스 관련 데이터
         * @type {Detail}
         * @description 사용자가 어떤 소스를 통해 사이트를 방문했는지에 대한 통계
         */
        source: {
          cases: [
            {
              /**
               * 소스 이름
               * @type {string}
               * @description 방문자들이 사용한 트래픽 소스 (예: "(not set)")
               */
              case: "(not set)",
              /**
               * 해당 소스를 통해 방문한 사용자 수
               * @type {number}
               * @description 해당 소스를 통해 유입된 사용자 수
               */
              value: 18
            }
          ],
          /**
           * 총 소스를 통한 방문자 수
           * @type {number}
           * @description 트래픽 소스를 통한 총 사용자 수
           */
          total: 40,
          /**
           * 트래픽 소스의 종류 수
           * @type {number}
           * @description 사용된 소스의 종류 (8개의 소스가 기록됨)
           */
          kinds: 8
        },
        /**
         * 소스 세부 정보 데이터
         * @type {Detail}
         * @description 소스에 대한 구체적인 세부 정보
         */
        sourceDetail: {
          cases: [
            {
              /**
               * 소스 이름
               * @type {string}
               * @description 소스의 세부 항목 (예: "(not set)")
               */
              case: "(not set)",
              /**
               * 해당 소스 세부 정보를 통한 방문자 수
               * @type {number}
               * @description 해당 소스 세부 정보를 통해 유입된 사용자 수
               */
              value: 18
            }
          ],
          /**
           * 총 소스 세부 정보를 통한 방문자 수
           * @type {number}
           * @description 소스 세부 정보를 통한 총 사용자 수
           */
          total: 40,
          /**
           * 소스 세부 정보의 종류 수
           * @type {number}
           * @description 소스 세부 정보의 종류 (12개의 세부 정보가 기록됨)
           */
          kinds: 12
        }
      }
    },
    
    /**
     * 조회수 관련 데이터
     * @type {AnalyticsData}
     * @description 해당 기간 동안의 페이지 조회수에 대한 데이터
     */
    views: {
      /**
       * 총 조회수
       * @type {number}
       * @description 해당 기간 동안 기록된 총 조회수
       */
      total: 237,

      /**
       * 조회수의 세부 정보
       * @type {Object.<string, Detail>}
       * @description 페이지 경로, 참조자, 디바이스 카테고리 등과 관련된 세부 정보
       */
      detail: {
        /**
         * 페이지 경로별 조회수 데이터
         * @type {Detail}
         * @description 페이지 경로별 조회수 통계
         */
        pagePath: {
          cases: [
            {
              /**
               * 페이지 경로
               * @type {string}
               * @description 특정 페이지 경로 (예: "/desdetail.php?desid=d2104_aa09s")
               */
              case: "/desdetail.php?desid=d2104_aa09s",
              /**
               * 해당 페이지 경로의 조회수
               * @type {number}
               * @description 해당 페이지에서 발생한 조회수
               */
              value: 15
            },
            {
              /**
               * 페이지 경로
               * @type {string}
               * @description 특정 페이지 경로 (예: "/desdetail.php?desid=d2105_aa02s")
               */
              case: "/desdetail.php?desid=d2105_aa02s",
              /**
               * 해당 페이지 경로의 조회수
               * @type {number}
               * @description 해당 페이지에서 발생한 조회수
               */
              value: 12
            }
          ],
          /**
           * 총 페이지 경로별 조회수
           * @type {number}
           * @description 페이지 경로별로 기록된 총 조회수
           */
          total: 237,
          /**
           * 페이지 경로의 종류 수
           * @type {number}
           * @description 기록된 페이지 경로의 종류 (112개의 경로가 기록됨)
           */
          kinds: 112
        },
        /**
         * 참조자에 따른 조회수 데이터
         * @type {Detail}
         * @description 사용자가 어떤 경로로 해당 페이지에 들어왔는지에 대한 통계
         */
        referer: {
          cases: [
            {
              /**
               * 참조자 경로
               * @type {string}
               * @description 참조된 경로 (예: "https://home-liaison.com/designer.php")
               */
              case: "https://home-liaison.com/designer.php",
              /**
               * 해당 참조 경로의 조회수
               * @type {number}
               * @description 참조된 경로에서 발생한 조회수
               */
              value: 51
            }
          ],
          /**
           * 총 참조 경로별 조회수
           * @type {number}
           * @description 참조 경로별로 기록된 총 조회수
           */
          total: 237,
          /**
           * 참조 경로의 종류 수
           * @type {number}
           * @description 참조된 경로의 종류 (50개의 참조 경로가 기록됨)
           */
          kinds: 50
        },
        /**
         * 디바이스 카테고리에 따른 조회수 데이터
         * @type {Detail}
         * @description 방문자가 사용한 디바이스 종류에 따른 통계
         */
        deviceCategory: {
          cases: [
            {
              /**
               * 디바이스 종류
               * @type {string}
               * @description 사용된 디바이스 종류 (예: "mobile")
               */
              case: "mobile",
              /**
               * 해당 디바이스의 조회수
               * @type {number}
               * @description 모바일 기기를 통해 발생한 조회수
               */
              value: 202
            },
            {
              /**
               * 디바이스 종류
               * @type {string}
               * @description 사용된 디바이스 종류 (예: "desktop")
               */
              case: "desktop",
              /**
               * 해당 디바이스의 조회수
               * @type {number}
               * @description 데스크탑을 통해 발생한 조회수
               */
              value: 35
            }
          ],
          /**
           * 총 디바이스 카테고리별 조회수
           * @type {number}
           * @description 디바이스 종류에 따른 총 조회수
           */
          total: 237,
          /**
           * 디바이스 카테고리의 종류 수
           * @type {number}
           * @description 사용된 디바이스 종류 (2개의 종류가 기록됨: mobile, desktop)
           */
          kinds: 2
        },
        /**
         * 운영체제에 따른 조회수 데이터
         * @type {Detail}
         * @description 방문자가 사용한 운영체제별 통계
         */
        operatingSystem: {
          cases: [
            {
              /**
               * 운영체제 종류
               * @type {string}
               * @description 사용된 운영체제 (예: "Android")
               */
              case: "Android",
              /**
               * 해당 운영체제를 통해 발생한 조회수
               * @type {number}
               * @description 안드로이드 기기를 통해 발생한 조회수
               */
              value: 175
            }
          ],
          /**
           * 총 운영체제별 조회수
           * @type {number}
           * @description 운영체제에 따른 총 조회수
           */
          total: 237,
          /**
           * 운영체제의 종류 수
           * @type {number}
           * @description 기록된 운영체제의 종류 (3개의 종류가 기록됨)
           */
          kinds: 3
        },
        /**
         * 브라우저별 조회수 데이터
         * @type {Detail}
         * @description 방문자가 사용한 브라우저별 통계
         */
        browser: {
          cases: [
            {
              /**
               * 브라우저 종류
               * @type {string}
               * @description 사용된 브라우저 (예: "Whale Browser")
               */
              case: "Whale Browser",
              /**
               * 해당 브라우저에서 발생한 조회수
               * @type {number}
               * @description Whale 브라우저를 통해 발생한 조회수
               */
              value: 160
            }
          ],
          /**
           * 총 브라우저별 조회수
           * @type {number}
           * @description 브라우저 종류에 따른 총 조회수
           */
          total: 237,
          /**
           * 브라우저의 종류 수
           * @type {number}
           * @description 기록된 브라우저의 종류 (5개의 종류가 기록됨)
           */
          kinds: 5
        }
      }
    },

    /**
     * 이벤트 관련 데이터
     * @type {AnalyticsData}
     * @description 웹 페이지에서 발생한 이벤트에 대한 통계 데이터
     */
    events: {
      /**
       * 총 이벤트 수
       * @type {number}
       * @description 해당 기간 동안 기록된 총 이벤트 수
       */
      total: 1518,

      /**
       * 이벤트의 세부 정보
       * @type {Object.<string, Detail>}
       * @description 이벤트 경로, 이벤트 이름 등과 관련된 세부 정보
       */
      detail: {
        /**
         * 페이지 경로별 이벤트 데이터
         * @type {Detail}
         * @description 페이지별 발생한 이벤트 통계
         */
        pagePath: {
          cases: [
            {
              /**
               * 이벤트가 발생한 페이지 경로
               * @type {string}
               * @description 이벤트가 발생한 페이지 (예: "/curation.php?cliid=c2409_aa32s")
               */
              case: "/curation.php?cliid=c2409_aa32s",
              /**
               * 해당 페이지에서 발생한 이벤트 수
               * @type {number}
               * @description 해당 페이지에서 발생한 총 이벤트 수
               */
              value: 339
            }
          ],
          /**
           * 총 페이지 경로별 이벤트 수
           * @type {number}
           * @description 페이지별로 기록된 총 이벤트 수
           */
          total: 1518,
          /**
           * 페이지 경로의 종류 수
           * @type {number}
           * @description 이벤트가 발생한 페이지 경로의 종류 (120개의 경로가 기록됨)
           */
          kinds: 120
        },
        /**
         * 이벤트 이름에 따른 데이터
         * @type {Detail}
         * @description 발생한 이벤트 종류별 통계
         */
        eventName: {
          cases: [
            {
              /**
               * 이벤트 이름
               * @type {string}
               * @description 발생한 이벤트 이름 (예: "readTimer")
               */
              case: "readTimer",
              /**
               * 해당 이벤트의 발생 수
               * @type {number}
               * @description 해당 이벤트가 발생한 횟수
               */
              value: 476
            },
            {
              /**
               * 이벤트 이름
               * @type {string}
               * @description 발생한 이벤트 이름 (예: "page_view")
               */
              case: "page_view",
              /**
               * 해당 이벤트의 발생 수
               * @type {number}
               * @description 해당 이벤트가 발생한 횟수
               */
              value: 237
            }
          ],
          /**
           * 총 이벤트 이름별 발생 수
           * @type {number}
           * @description 이벤트 이름별로 기록된 총 이벤트 수
           */
          total: 1518,
          /**
           * 이벤트 이름의 종류 수
           * @type {number}
           * @description 기록된 이벤트 이름의 종류 (16개의 이벤트 이름이 기록됨)
           */
          kinds: 16
        }
      }
    }
  }
}
