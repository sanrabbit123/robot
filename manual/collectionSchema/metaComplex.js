/**
 * 콜렉션 이름
 * @type {string}
 * @description 메타 채널에 대한 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록하는 데이터베이스
 */
const collectionName = "metaComplex";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 메타 채널에서의 광고 비용, 노출수, 클릭수 등 광고 성과 데이터를 기록하는 데이터베이스
 */
const collectionDescription = "메타 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비";

/**
 * @typedef {Object} MetaComplex
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} camid 메타 캠페인 ID
 * @property {string} key 메타 채널 데이터의 고유 키 (날짜와 메타 채널 식별자를 포함)
 * @property {Object} date 데이터 수집의 시작과 끝 날짜
 * @property {string} date.from 데이터 수집 시작 날짜 및 시간
 * @property {string} date.to 데이터 수집 종료 날짜 및 시간
 * @property {Object} advertisement 광고에 대한 정보
 * @property {Object} advertisement.value 광고비와 성과 정보
 * @property {number} advertisement.value.charge 광고비
 * @property {Object} advertisement.value.performance 광고 성과 정보
 * @property {number} advertisement.value.performance.reach 광고 도달수
 * @property {number} advertisement.value.performance.impressions 광고 노출수
 * @property {number} advertisement.value.performance.clicks 광고 클릭수
 * @property {Object} advertisement.value.length 캠페인, 광고 세트, 광고의 개수
 * @property {number} advertisement.value.length.campaign 캠페인의 개수
 * @property {number} advertisement.value.length.adset 광고 세트의 개수
 * @property {number} advertisement.value.length.ad 광고의 개수
 * @property {Array<Object>} advertisement.campaign 광고 캠페인 정보 배열
 * @property {Object} instagram 인스타그램 성과 정보
 * @property {Object} instagram.profile 인스타그램 계정 정보
 * @property {number} instagram.profile.views 계정 조회수
 * @property {number} instagram.profile.followers 팔로워 수
 * @property {Object} instagram.performance 인스타그램 성과 정보
 * @property {number} instagram.performance.impressions 노출 수
 * @property {number} instagram.performance.clicks 클릭 수
 * @property {number} instagram.performance.likes 좋아요 수
 * @property {number} instagram.performance.comments 댓글 수
 * @property {number} instagram.performance.saves 저장 수
 * @property {number} instagram.performance.shares 공유 수
 */

/**
 * 샘플 데이터 0
 * @type {MetaComplex}
 */
const collectionSampleData0 = {
  _id: "66bd4a268e33158330329aa5", // MongoDB에서 자동 생성된 고유 ID
  camid: "f2408_fa13s", // 메타 캠페인 ID
  key: "20240813_meta", // 데이터의 고유 키 (날짜와 메타 채널 식별자를 조합한 값)
  date: {
    from: "2024-08-12T15:00:00.000Z", // 데이터 수집 시작 날짜 및 시간
    to: "2024-08-13T15:00:00.000Z" // 데이터 수집 종료 날짜 및 시간
  },
  advertisement: {
    value: {
      charge: 213925, // 광고비 (단위: 원)
      performance: {
        reach: 5461, // 광고 도달 수 (광고를 본 유저 수)
        impressions: 6705, // 광고 노출 수 (광고가 표시된 횟수)
        clicks: 260 // 광고 클릭 수
      },
      length: {
        campaign: 4, // 총 캠페인 수 (4개)
        adset: 7, // 총 광고 세트 수 (7개)
        ad: 10 // 총 광고 수 (10개)
      }
    },
    campaign: [
      {
        value: {
          charge: 10093, // 해당 캠페인의 광고비 (10,093원)
          performance: {
            reach: 538, // 광고 도달 수
            impressions: 584, // 광고 노출 수
            clicks: 25 // 광고 클릭 수
          }
        },
        information: {
          id: "23854725673120375", // 캠페인 ID
          account: "505249990112820", // 광고 계정 ID
          name: "전환_관심사타겟_디자이너_2306" // 캠페인 이름
        },
        children: [
          {
            value: {
              charge: 10093, // 해당 광고 세트의 광고비 (10,093원)
              performance: {
                reach: 538, // 광고 도달 수
                impressions: 584, // 광고 노출 수
                clicks: 25 // 광고 클릭 수
              }
            },
            information: {
              id: "120206005775340376", // 광고 세트 ID
              campaign: "23854725673120375", // 상위 캠페인 ID
              name: "selling point_디자인 드로잉_2402" // 광고 세트 이름
            },
            children: [
              {
                value: {
                  charge: 10093, // 해당 광고의 광고비 (10,093원)
                  performance: {
                    reach: 538, // 광고 도달 수
                    impressions: 584, // 광고 노출 수
                    clicks: 25 // 광고 클릭 수
                  }
                },
                information: {
                  id: "120206005775330376", // 광고 ID
                  adset: "120206005775340376", // 상위 광고 세트 ID
                  name: "drawing_01_carousel" // 광고 이름
                }
              }
            ]
          }
        ]
      }
    ]
  },
  instagram: {
    profile: {
      views: 173, // 인스타그램 프로필 조회 수
      followers: 0 // 인스타그램 팔로워 수
    },
    performance: {
      impressions: 9390, // 인스타그램 노출 수
      clicks: 16, // 인스타그램 클릭 수
      likes: 7, // 좋아요 수
      comments: 0, // 댓글 수
      saves: 31, // 저장 수
      shares: 2 // 공유 수
    }
  }
};