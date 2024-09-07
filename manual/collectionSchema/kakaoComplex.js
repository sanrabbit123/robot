/**
 * 콜렉션 이름
 * @type {string}
 * @description 카카오 채널에 대한 종합적인 정보 (광고 비용, 노출수, 클릭수 등) 를 날마다 기록하는 데이터베이스
 */
const collectionName = "kakaoComplex";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 카카오 채널의 광고 비용, 노출수, 클릭수 등의 종합적인 정보를 기록하는 데이터베이스
 */
const collectionDescription = "카카오 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} KakaoComplex
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} camid 카카오 캠페인 ID
 * @property {string} key 카카오 채널 데이터의 고유 키 (날짜와 카카오 채널 식별자를 포함)
 * @property {Object} date 날짜 범위 정보
 * @property {string} date.from 데이터 수집 시작 날짜 및 시간
 * @property {string} date.to 데이터 수집 종료 날짜 및 시간
 * @property {Object} advertisement 광고에 대한 정보
 * @property {Object} advertisement.value 광고 비용 및 성과 정보
 * @property {number} advertisement.value.charge 광고비
 * @property {Object} advertisement.value.performance 광고 성과 정보
 * @property {number} advertisement.value.performance.play 광고 재생수
 * @property {number} advertisement.value.performance.impressions 광고 노출수
 * @property {number} advertisement.value.performance.clicks 광고 클릭수
 * @property {Object} advertisement.value.length 캠페인, 광고 세트, 광고의 개수
 * @property {number} advertisement.value.length.campaign 캠페인의 개수
 * @property {number} advertisement.value.length.adset 광고 세트의 개수
 * @property {number} advertisement.value.length.ad 광고의 개수
 * @property {Array} advertisement.campaign 광고 캠페인에 대한 정보 배열
 */
const collectionSampleData0 = {
  _id: "66628eff03dba13862cf70fb", // MongoDB에서 자동 생성된 고유 ID
  camid: "f2406_ka06s", // 카카오 캠페인 ID
  key: "20240606_kakao", // 데이터 수집 고유 키 (날짜와 카카오 채널을 조합한 값)
  date: {
    from: "2024-06-05T15:00:00.000Z", // 데이터 수집 시작 날짜 및 시간
    to: "2024-06-06T15:00:00.000Z" // 데이터 수집 종료 날짜 및 시간
  },
  advertisement: {
    value: {
      charge: 0, // 광고비 (현재 0)
      performance: {
        play: 0, // 광고 재생수 (현재 0)
        impressions: 0, // 광고 노출수 (현재 0)
        clicks: 0 // 광고 클릭수 (현재 0)
      },
      length: {
        campaign: 1, // 총 캠페인 수 (1개)
        adset: 1, // 총 광고 세트 수 (1개)
        ad: 1 // 총 광고 수 (1개)
      }
    },
    campaign: [
      {
        value: {
          charge: 0, // 해당 캠페인의 광고비 (현재 0)
          performance: {
            play: 0, // 광고 재생수 (현재 0)
            impressions: 0, // 광고 노출수 (현재 0)
            clicks: 0 // 광고 클릭수 (현재 0)
          }
        },
        information: {
          id: "1232683", // 캠페인 ID
          account: "608725", // 광고 계정 ID
          name: "카카오톡 톡채널_도달_2024.03-06" // 캠페인 이름
        },
        children: [
          {
            value: {
              charge: 0, // 해당 광고 세트의 광고비 (현재 0)
              performance: {
                play: 0, // 광고 재생수 (현재 0)
                impressions: 0, // 광고 노출수 (현재 0)
                clicks: 0 // 광고 클릭수 (현재 0)
              }
            },
            information: {
              id: "3382528", // 광고 세트 ID
              campaign: "1232683", // 상위 캠페인 ID
              name: "카카오 톡채널_도달_할인율_디자이너_active_240516" // 광고 세트 이름
            },
            children: [
              {
                value: {
                  charge: 0, // 해당 광고의 광고비 (현재 0)
                  performance: {
                    play: 0, // 광고 재생수 (현재 0)
                    impressions: 0, // 광고 노출수 (현재 0)
                    clicks: 0 // 광고 클릭수 (현재 0)
                  }
                },
                information: {
                  id: "25613632", // 광고 ID
                  adset: "3382528", // 상위 광고 세트 ID
                  name: "카카오톡 채널_도달_202405141153" // 광고 이름
                }
              }
            ]
          }
        ]
      }
    ]
  }
};