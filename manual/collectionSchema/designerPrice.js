/**
 * 콜렉션 이름
 * @type {string}
 * @description 스타일링 레벨과 시공 레벨에 따른 디자이너 가격 정보가 담긴 데이터베이스
 */
const collectionName = "designerPrice";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너의 스타일링 레벨, 시공 레벨에 따른 가격 정보를 저장한 데이터베이스
 */
const collectionDescription = "스타일링 레벨, 시공 레벨에 의한 디자이너 가격 정보가 담겨 있는 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} DesignerPriceData
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {number} key 디자이너 가격의 기준이 되는 값
 * @property {Object} level 디자이너의 시공 및 스타일링 레벨
 * @property {number} level.construct 시공 레벨 (0 ~ 3)
 * @property {number} level.styling 스타일링 레벨 (0 ~ 3)
 * @property {Array<Array<number>>} matrix 각 레벨과 기준에 따른 가격 매트릭스
 * @property {number} newcomer 신입 디자이너 할인 비율 (0.8 = 80%)
 * @property {number} premium 프리미엄 디자이너 추가 요금 비율 (1.2 = 120%)
 * @property {Array<number>} fee 각 레벨별 수수료 정보
 * @property {Object} standard 가격 책정에 사용되는 표준 정보
 * @property {Object} standard.x 가격 기준의 x축 값
 * @property {Array<Array<number>>} standard.x.value 가격 범위를 정의하는 값들
 * @property {Array<string>} standard.x.string 가격 범위에 해당하는 문자열 배열
 * @property {Object} standard.y 가격 기준의 y축 값
 * @property {Array<string>} standard.y.string 가격 범위를 정의하는 문자열 배열
 * @property {Object} travel 디자이너의 출장 비용 관련 정보
 * @property {Object} travel.unit 출장 단위당 비용 정보
 * @property {number} travel.unit.meters 미터당 출장 비용
 * @property {number} travel.unit.seconds 초당 출장 비용
 * @property {Object} travel.consulting 상담 시간 및 노동 비용 정보
 * @property {number} travel.consulting.hours 상담 시간
 * @property {number} travel.consulting.labor 시간당 노동 비용 (원)
 * @property {Object} online 온라인 가격 할인 정보
 * @property {Array<number>} online.matrix 온라인 할인 적용 비율 매트릭스
 * @property {Object} online.minus 온라인 할인 금액 범위
 * @property {number} online.minus.min 최소 할인 금액
 * @property {number} online.minus.max 최대 할인 금액
 * @property {Object} online.absolute 온라인 상담 최소 가격
 * @property {number} online.absolute.min 절대 최소 가격
 */
const collectionSampleData0 = {
  _id: "66c09be37d20f001559da3e3",  // MongoDB에서 자동 생성된 고유 ID
  key: 30,  // 디자이너 가격을 계산하는 기준이 되는 값
  level: {
    construct: 3,  // 시공 레벨 (3단계)
    styling: 0  // 스타일링 레벨 (0단계)
  },
  matrix: [
    [60, 60, 80, 100],  // 스타일링, 시공 레벨에 따른 가격 (단위: 만 원)
    [100, 100, 140, 140],  // 가격 매트릭스: [스타일링 레벨, 시공 레벨]
    [130, 150, 180, 180],
    [170, 190, 240, 240],
    [190, 210, 280, 290],
    [210, 230, 300, 310],
    [230, 250, 310, 330],
    [250, 270, 340, 360]
  ],
  newcomer: 0.8,  // 신입 디자이너는 20% 할인 (0.8 = 80%)
  premium: 1.2,  // 프리미엄 디자이너는 20% 추가 요금 (1.2 = 120%)
  fee: [20, 20, 25, 30, 30, 30, 30, 30],  // 각 레벨별 수수료 정보 (단위: %)
  standard: {
    x: {
      value: [
        [0, 8],  // 면적 범위 (평수 기준)
        [9, 14],
        [15, 22],
        [23, 28],
        [29, 33],
        [34, 38],
        [39, 44],
        [44, 999]
      ],
      string: [
        "0 - 8",  // 면적 범위의 문자열 표현
        "9 - 14",
        "15 - 22",
        "23 - 29",
        "30 - 33",
        "34 - 38",
        "39 - 44",
        "44 - 999"
      ]
    },
    y: {
      string: [
        "F",  // 홈퍼니싱
        "S",  // 홈스타일링
        "T",  // 토탈 스타일링
        "XT"  // 엑스트라 스타일링
      ]
    }
  },
  travel: {
    unit: {
      meters: 0.201875,  // 미터당 출장 비용 (원)
      seconds: 0.473005  // 초당 출장 비용 (원)
    },
    consulting: {
      hours: 2,  // 상담 시간 (2시간)
      labor: 15000  // 상담 시 노동 비용 (1시간당 15,000원)
    }
  },
  online: {
    matrix: [1, 2, 3, 5],  // 온라인 할인 적용 비율
    minus: {
      min: 60000,  // 최소 할인 금액 (60,000원)
      max: 200000  // 최대 할인 금액 (200,000원)
    },
    absolute: {
      min: 700000  // 온라인 상담 시 절대 최소 가격 (700,000원)
    }
  }
};

/**
 * 샘플 데이터 1
 * @type {DesignerPriceData}
 */
const collectionSampleData1 = {
  _id: "66c09be37d20f001559da3db",  // MongoDB에서 자동 생성된 고유 ID
  key: 21,  // 디자이너 가격 계산 기준이 되는 값
  level: {
    construct: 2,  // 시공 레벨 (2단계)
    styling: 1  // 스타일링 레벨 (1단계)
  },
  matrix: [
    [60, 70, 90, 120],  // 스타일링, 시공 레벨에 따른 가격 매트릭스
    [110, 120, 150, 150],  // [스타일링 레벨, 시공 레벨]
    [130, 150, 190, 190],
    [170, 190, 260, 260],
    [210, 230, 280, 310],
    [230, 250, 300, 320],
    [250, 280, 320, 340],
    [270, 300, 350, 380]
  ],
  newcomer: 0.8,  // 신입 디자이너 할인율 (80%)
  premium: 1.2,  // 프리미엄 디자이너 추가 요금 (120%)
  fee: [20, 20, 25, 30, 30, 30, 30, 30],  // 수수료 비율 (단위: %)
  standard: {
    x: {
      value: [
        [0, 8],  // 면적 범위 (평수)
        [9, 14],
        [15, 22],
        [23, 28],
        [29, 33],
        [34, 38],
        [39, 44],
        [44, 999]
      ],
      string: [
        "0 - 8",  // 면적 범위의 문자열 표현
        "9 - 14",
        "15 - 22",
        "23 - 29",
        "30 - 33",
        "34 - 38",
        "39 - 44",
        "44 - 999"
      ]
    },
    y: {
      string: [
        "F",  // 홈퍼니싱
        "S",  // 홈스타일링
        "T",  // 토탈 스타일링
        "XT"  // 엑스트라 스타일링
      ]
    }
  },
  travel: {
    unit: {
      meters: 0.201875,  // 미터당 출장 비용 (원)
      seconds: 0.473005  // 초당 출장 비용 (원)
    },
    consulting: {
      hours: 2,  // 상담 시간 (2시간)
      labor: 15000  // 시간당 노동 비용 (원)
    }
  },
  online: {
    matrix: [1, 2, 3, 5],  // 온라인 할인 적용 비율
    minus: {
      min: 60000,  // 최소 할인 금액
      max: 200000  // 최대 할인 금액
    },
    absolute: {
      min: 700000  // 온라인 상담 최소 가격
    }
  }
};