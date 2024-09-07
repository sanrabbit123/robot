/**
 * @const {string} collectionName - 콜렉션 이름
 * @description AWS 비용 기록을 저장한 데이터베이스, 현재 사용되지 않음
 */
const collectionName = "costLog"; // AWS 비용 기록을 저장하는 데이터베이스, 사용되지 않음

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description AWS 비용 기록을 저장한 디비로, 현재는 사용되지 않는 상태
 */
const collectionDescription = "AWS 비용 기록에 대한 디비, 사용되지 않음";

/**
 * @typedef {Object} CostComposition
 * @property {string} name - 비용 항목의 이름 (AWS 서비스명)
 * @property {number} amount - 해당 항목의 비용
 * @property {number} ratio - 해당 항목이 전체 비용에서 차지하는 비율
 */

/**
 * @typedef {Object} CostDetails
 * @property {string} unit - 비용의 통화 단위 (USD로 고정)
 * @property {number} amount - 총 비용 금액
 * @property {CostComposition[]} composition - 각 서비스별 비용 상세 정보
 */

/**
 * @typedef {Object} DateRange
 * @property {string} start - 비용 기록 시작 날짜 (ISO 8601 형식)
 * @property {string} end - 비용 기록 종료 날짜 (ISO 8601 형식)
 */

/**
 * @typedef {Object} CollectionSampleData
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} id - 비용 기록의 고유 ID
 * @property {DateRange} date - 비용이 기록된 기간 (시작일과 종료일)
 * @property {CostDetails} cost - 비용 상세 정보
 */

/**
 * @type {CollectionSampleData}
 * @description 첫 번째 샘플 데이터
 */
const collectionSampleData0 = {
  /**
   * MongoDB에서 자동 생성된 고유 식별자
   * @type {string}
   */
  _id: "66c215e67ae42c7111d0d949",

  /**
   * 비용 기록의 고유 ID
   * @type {string}
   */
  id: "cost_aws0000_aa20soq17vaa00saa00s",

  /**
   * 비용 기록 시작 날짜와 종료 날짜
   * @type {DateRange}
   */
  date: {
    /**
     * 비용 기록 시작 날짜 (ISO 8601 형식)
     * @type {string}
     */
    start: "2024-08-16T15:00:00.000Z",

    /**
     * 비용 기록 종료 날짜 (ISO 8601 형식)
     * @type {string}
     */
    end: "2024-08-17T15:00:00.000Z"
  },

  /**
   * 비용 상세 정보
   * @type {CostDetails}
   */
  cost: {
    /**
     * 비용의 통화 단위 (미국 달러)
     * @type {string}
     */
    unit: "USD",

    /**
     * 총 비용 금액
     * @type {number}
     */
    amount: 21.6159914506,

    /**
     * 각 서비스별 비용 구성
     * @type {CostComposition[]}
     */
    composition: [
      {
        /**
         * AWS 비용 탐색기 서비스 비용
         * @type {string}
         */
        name: "AWS Cost Explorer",

        /**
         * 해당 서비스에 대한 비용
         * @type {number}
         */
        amount: 0.34,

        /**
         * 전체 비용에서 차지하는 비율
         * @type {number}
         */
        ratio: 0.015729095784341764
      },
      {
        name: "AWS Key Management Service",
        amount: 0,
        ratio: 0
      },
      {
        name: "EC2 - Other",
        amount: 13.2679989123,
        ratio: 0.6138047816414971
      },
      {
        name: "Amazon Elastic Compute Cloud - Compute",
        amount: 7.4469655127,
        ratio: 0.34451186427043545
      },
      {
        name: "Amazon Route 53",
        amount: 0.0032988,
        ratio: 0.00015260923874525471
      },
      {
        name: "Amazon Simple Notification Service",
        amount: 5.6e-9,
        ratio: 2.590674599773937e-10
      },
      {
        name: "Amazon Simple Storage Service",
        amount: 0.00614488,
        ratio: 0.0002842747238331941
      },
      {
        name: "Amazon Virtual Private Cloud",
        amount: 0.55158334,
        ratio: 0.025517374082079845
      },
      {
        name: "AmazonCloudWatch",
        amount: 0,
        ratio: 0
      }
    ]
  }
};

/**
 * @type {CollectionSampleData}
 * @description 두 번째 샘플 데이터
 */
const collectionSampleData1 = {
  _id: "66c09c127d20f001559fcb8e",
  id: "cost_aws0000_aa20sop08vaa00saa00s",
  date: {
    start: "2024-07-07T15:00:00.000Z",
    end: "2024-07-08T15:00:00.000Z"
  },
  cost: {
    unit: "USD",
    amount: 15.1642596803,
    composition: [
      {
        name: "AWS Cost Explorer",
        amount: 0.42,
        ratio: 0.027696703225520796
      },
      {
        name: "EC2 - Other",
        amount: 7.0373584333,
        ratio: 0.4640753048064907
      },
      {
        name: "Amazon Elastic Compute Cloud - Compute",
        amount: 6.756119247,
        ratio: 0.44552911842949533
      },
      {
        name: "Amazon Route 53",
        amount: 0.010702,
        ratio: 0.0007057383759988656
      },
      {
        name: "Amazon Virtual Private Cloud",
        amount: 0.93,
        ratio: 0.06132841428508177
      },
      {
        name: "AmazonCloudWatch",
        amount: 0.01008,
        ratio: 0.0006647208774124991
      }
    ]
  }
};