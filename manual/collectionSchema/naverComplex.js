/**
 * 콜렉션 이름
 * @type {string}
 * @description 네이버 채널의 종합적인 정보를 저장하는 데이터베이스. 광고 비용, 노출수, 클릭수 등 다양한 정보를 기록함.
 */
const collectionName = "naverComplex";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 네이버 채널의 광고 성과를 종합적으로 기록한 데이터베이스. 날마다 광고 비용, 노출수, 클릭수 등의 데이터를 저장.
 */
const collectionDescription = "네이버 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비";

/**
 * @typedef {Object} NaverComplex
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} camid 캠페인의 고유 ID
 * @property {string} key 날짜와 네이버 채널을 나타내는 고유 식별자
 * @property {Object} date 광고가 진행된 날짜 범위 (시작과 끝 시간)
 * @property {Object} advertisement 광고 성과 데이터를 포함한 객체
 * @property {Object[]} advertisement.campaign 개별 캠페인의 성과와 정보
 */

/**
 * 샘플 데이터 0
 * @type {NaverComplex}
 */
const collectionSampleData0 = {
  _id: "66bd4a028e33158330329a9f", // MongoDB에서 자동 생성된 고유 ID
  camid: "f2408_na14s", // 광고 캠페인의 고유 ID
  key: "20240814_naver", // 해당 데이터가 기록된 날짜와 네이버 채널을 나타내는 키
  date: {
    from: "2024-08-13T15:00:00.000Z", // 광고가 시작된 시간 (UTC 기준)
    to: "2024-08-14T15:00:00.000Z" // 광고가 종료된 시간 (UTC 기준)
  },
  advertisement: {
    value: {
      charge: 124047, // 총 광고 비용 (단위: 원)
      performance: {
        impressions: 1291, // 총 노출 수
        clicks: 41 // 총 클릭 수
      },
      length: {
        web: 2, // 웹 광고 횟수
        power: 0, // 파워 광고 횟수
        contents: 0, // 컨텐츠 광고 횟수
        brand: 1, // 브랜드 광고 횟수
        place: 1, // 장소 광고 횟수
        etc: 0 // 기타 광고 횟수
      }
    },
    campaign: [
      {
        value: {
          charge: 16808, // 캠페인에 대한 광고 비용
          performance: {
            impressions: 511, // 캠페인의 총 노출 수
            clicks: 8, // 캠페인의 총 클릭 수
            rank: 1.9 // 평균 광고 순위
          }
        },
        information: {
          id: "cmp-a001-01-000000003101395", // 캠페인의 고유 ID
          type: "WEB_SITE", // 광고 유형 (웹 사이트)
          name: "PO 홈리에종 : 특성" // 광고 이름 (홈리에종 웹 사이트 특성 광고)
        }
      },
      {
        value: {
          charge: 107239, // 캠페인에 대한 광고 비용
          performance: {
            impressions: 728, // 총 노출 수
            clicks: 20, // 총 클릭 수
            rank: 1.2 // 평균 광고 순위
          }
        },
        information: {
          id: "cmp-a001-01-000000004441942", // 캠페인의 고유 ID
          type: "WEB_SITE", // 광고 유형 (웹 사이트)
          name: "PO2 홈리에종 : 메인 키워드" // 광고 이름 (홈리에종 메인 키워드 광고)
        }
      },
      {
        value: {
          charge: 0, // 광고 비용 (해당 캠페인은 무료)
          performance: {
            impressions: 30, // 총 노출 수
            clicks: 13, // 총 클릭 수
            rank: 1 // 평균 광고 순위
          }
        },
        information: {
          id: "cmp-a001-04-000000003198580", // 캠페인의 고유 ID
          type: "BRAND_SEARCH", // 광고 유형 (브랜드 검색 광고)
          name: "BR 홈리에종 브랜드 검색" // 광고 이름 (홈리에종 브랜드 검색)
        }
      },
      {
        value: {
          charge: 0, // 광고 비용 (무료)
          performance: {
            impressions: 22, // 총 노출 수
            clicks: 0, // 클릭 수 (없음)
            rank: 4.1 // 평균 광고 순위
          }
        },
        information: {
          id: "cmp-a001-06-000000005250582", // 캠페인의 고유 ID
          type: "PLACE", // 광고 유형 (장소 광고)
          name: "PL 홈리에종 지역" // 광고 이름 (홈리에종 지역 광고)
        }
      }
    ]
  }
};