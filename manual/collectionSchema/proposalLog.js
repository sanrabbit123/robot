/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종에서 고객에게 보낸 추천서에 대한 정보를 기록하는 데이터베이스
 */
const collectionName = "proposalLog";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 고객들에게 보낸 추천서와 관련된 정보와 시간 기록이 저장된 데이터베이스
 */
const collectionDescription = "홈리에종에서 고객님들께 보낸 추천서에 대한 정보와 시간에 대한 기록이 쌓여 있는 디비";

/**
 * @typedef {Object} Distance
 * @property {number} number 거리 측정 값 (숫자)
 * @property {number} amount 거리 기준 비용
 * @property {string} distance 실제 거리 표시 (km)
 * @property {string} time 소요 시간 (시간, 분)
 * @property {number} limit 기본 거리 제한 (기본 5km)
 */

/**
 * @typedef {Object} Fee
 * @property {string} method 결제 방식 (예: offline)
 * @property {boolean} partial 부분 결제 여부
 * @property {number} amount 결제 금액
 * @property {number} discount 할인 금액
 * @property {Distance} distance 거리와 관련된 정보
 */

/**
 * @typedef {Object} PictureSetting
 * @property {string} position 사진의 위치
 * @property {string} sgTrue 스타일을 구분하는 값 ('g' 또는 's')
 * @property {string} unionPo 사진의 정렬 방식 (예: 'union' 또는 'right')
 * @property {string} styleText 스타일을 정의하는 CSS 텍스트
 * @property {string} imgSrc 이미지의 경로
 */

/**
 * @typedef {Object} ProjectDetail
 * @property {string} desid 디자이너의 ID
 * @property {Fee[]} fee 결제 관련 정보 배열
 * @property {PictureSetting[]} pictureSettings 사진 설정 정보 배열
 * @property {string[]} description 프로젝트 설명 내용 배열
 */

/**
 * @typedef {Object} Project
 * @property {string} status 프로젝트의 상태 (예: '완료')
 * @property {string} date 프로젝트 완료 날짜
 * @property {ProjectDetail[]} detail 프로젝트의 세부 정보 배열
 */

/**
 * @typedef {Object} ProposalLog
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 추천서를 보낸 날짜와 시간
 * @property {string} method 추천서를 보낸 방법 (예: 'send')
 * @property {string} proid 프로젝트의 고유 ID
 * @property {Project} project 프로젝트에 대한 세부 정보
 */

/**
 * 샘플 데이터 0
 * @type {ProposalLog}
 * @description 2024년 9월 6일에 프로젝트 'p2409_aa38s'에 대한 추천서를 보낸 기록
 */
const collectionSampleData0 = {
  _id: "66dac9da18daeed8a74d3947", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-09-06T09:22:34.730Z", // 추천서를 보낸 날짜와 시간
  method: "send", // 추천서를 보낸 방법 (send)
  proid: "p2409_aa38s", // 프로젝트의 고유 ID
  project: {
    status: "완료", // 프로젝트의 상태 (완료)
    date: "2024-09-06T09:22:34.174Z", // 프로젝트가 완료된 날짜
    detail: [
      {
        desid: "d2405_aa01s", // 디자이너 ID
        fee: [
          {
            method: "offline", // 결제 방식 (오프라인)
            partial: false, // 부분 결제 여부 (아님)
            amount: 2480000, // 결제 금액 (248만 원)
            discount: 0, // 할인 금액 (없음)
            distance: {
              number: 0, // 거리 (0km)
              amount: 0, // 거리 비용 (없음)
              distance: "0km", // 거리 표시 (0km)
              time: "0시간 0분", // 시간 표시 (0시간 0분)
              limit: 5 // 기본 거리 제한 (5km)
            }
          }
        ],
        pictureSettings: [
          {
            position: "0", // 첫 번째 사진의 위치
            sgTrue: "g", // 가로 세로 구분 (g)
            unionPo: "union", // 사진 정렬 (union)
            styleText: "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/corePortfolio/listImage/a142/t5a142.jpg\");", // CSS 스타일 정의
            imgSrc: "/corePortfolio/listImage/a142/t5a142.jpg" // 첫 번째 사진의 이미지 경로
          },
          {
            position: "1", // 두 번째 사진의 위치
            sgTrue: "s", // 가로 세로 구분 (s)
            unionPo: "right", // 사진 정렬 (right)
            styleText: "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/a142/t21a142.jpg\");", // CSS 스타일 정의
            imgSrc: "/corePortfolio/listImage/a142/t21a142.jpg" // 두 번째 사진의 이미지 경로
          },
          {
            position: "2", // 세 번째 사진의 위치
            sgTrue: "g", // 가로 세로 구분 (g)
            unionPo: "union", // 사진 정렬 (union)
            styleText: "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"/corePortfolio/listImage/a142/t9a142.jpg\");", // CSS 스타일 정의
            imgSrc: "/corePortfolio/listImage/a142/t9a142.jpg" // 세 번째 사진의 이미지 경로
          },
          {
            position: "3", // 네 번째 사진의 위치
            sgTrue: "g", // 가로 세로 구분 (g)
            unionPo: "union", // 사진 정렬 (union)
            styleText: "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"/corePortfolio/listImage/a142/t18a142.jpg\");", // CSS 스타일 정의
            imgSrc: "/corePortfolio/listImage/a142/t18a142.jpg" // 네 번째 사진의 이미지 경로
          },
          {
            position: "4", // 다섯 번째 사진의 위치
            sgTrue: "g", // 가로 세로 구분 (g)
            unionPo: "union", // 사진 정렬 (union)
            styleText: "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"/corePortfolio/listImage/a142/t20a142.jpg\");", // CSS 스타일 정의
            imgSrc: "/corePortfolio/listImage/a142/t20a142.jpg" // 다섯 번째 사진의 이미지 경로
          }
        ],
        description: [
          "꼼꼼한 상담 스타일로 고객님의 니즈를 정확하고 구체적으로 파악합니다.", // 첫 번째 설명
          "원활한 소통으로 진행해 드립니다.", // 두 번째 설명
          "책임감 있고 퀄리티 높은 마감으로 마무리 합니다." // 세 번째 설명
        ]
      }
    ]
  }
};