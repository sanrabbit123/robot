const collectionName = "addressComplex";

const collectionDescription = "네이버 부동산에서 끌고 온 아파트 단지 정보를 JSON 형태로 변환하여 저장한 기록"

/**
 * 네이버 부동산에서 끌어온 아파트 단지 정보를 저장하는 `addressComplex` 컬렉션
 * 이 컬렉션은 아파트 단지 정보를 JSON 형식으로 변환하여 저장합니다.
 */

/**
 * 첫 번째 샘플 데이터: 마포래미안푸르지오 아파트 단지 정보
 */
const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "66c149100a17fbd09853fd46",  // MongoDB에서 자동 생성된 고유 ObjectId로 문서를 식별합니다.
  
  /**
   * 단지 ID (id)
   * @type {string}
   */
  "id": "land_complex_104917",  // 네이버 부동산에서 제공된 단지 ID로, 해당 단지를 고유하게 식별합니다.
  
  /**
   * 네이버 단지 ID (naver)
   * @type {string}
   */
  "naver": "104917",  // 네이버 부동산에서 제공된 단지 고유 ID입니다.
  
  /**
   * 단지 이름 (name)
   * @type {string}
   */
  "name": "마포래미안푸르지오",  // 아파트 단지의 공식 이름은 '마포래미안푸르지오'입니다.
  
  /**
   * 데이터 기록 날짜 (date)
   * @type {string}
   */
  "date": "2024-08-18T01:06:24.622Z",  // 이 데이터가 기록된 날짜로, ISO 8601 형식입니다.
  
  /**
   * 주소 정보 (address)
   * @type {object}
   */
  "address": {
    /**
     * 전체 주소 (value)
     * @type {string}
     */
    "value": "서울시 마포구 마포대로 195",  // 아파트 단지의 전체 주소입니다.
    
    /**
     * 위도 (latitude)
     * @type {number}
     */
    "latitude": 37.553341,  // 아파트 단지가 위치한 위도 좌표입니다.
    
    /**
     * 경도 (longitude)
     * @type {number}
     */
    "longitude": 126.953154,  // 아파트 단지가 위치한 경도 좌표입니다.
    
    /**
     * 우편번호 (zipCode)
     * @type {string}
     */
    "zipCode": "04129",  // 아파트 단지의 우편번호입니다.
    
    /**
     * 상세 주소 정보 (detail)
     * @type {object}
     */
    "detail": {
      "sido": "서울특별시",  // 시/도 정보
      "sidoShort": "서울",  // 시/도의 짧은 이름
      "sigugun": "마포구",  // 시/구/군 정보
      "dongmyun": "아현동",  // 동/면 정보
      "ri": "",  // 리 정보는 없음
      "roadName": "마포대로",  // 도로명 주소
      "buildNumber": "195",  // 건물 번호
      "jibun": "777",  // 지번
      "buildName": "마포래미안푸르지오",  // 건물 이름
      "roadGroupId": "114402113001",  // 도로 그룹 ID
      "zipcode": "04129",  // 우편번호
      "bcode": "1144010100",  // 법정동 코드
      "hcode": "1144055500"  // 행정동 코드
    }
  },
  
  /**
   * 단지 관련 정보 (information)
   * @type {object}
   */
  "information": {
    /**
     * 준공일 (date)
     * @type {string}
     */
    "date": "2014-08-31T15:00:00.000Z",  // 아파트 단지의 준공일입니다.
    
    /**
     * 단지 내 정보 (count)
     * @type {object}
     */
    "count": {
      "household": 3885,  // 총 세대 수
      "dong": 51,  // 동(건물) 수
      "parking": 4580  // 주차 대수
    },
    
    /**
     * 층수 정보 (floor)
     * @type {object}
     */
    "floor": {
      "low": 8,  // 최저 층수
      "high": 30  // 최고 층수
    },
    
    /**
     * 타입 정보 (type)
     * @type {object}
     */
    "type": {
      "length": 15,  // 총 15가지 타입의 세대가 존재
      "detail": [
        /**
         * 80A 타입 세대 정보
         */
        {
          "name": "80A",  // 타입 이름
          "area": {
            "supply": 80.16,  // 공급 면적 (제곱미터)
            "exclusive": 59.96,  // 전용 면적 (제곱미터)
            "pyeong": 24.24,  // 공급 면적 (평)
            "exclusivePyeong": 18.13  // 전용 면적 (평)
          },
          "count": {
            "household": 572,  // 80A 타입 세대 수
            "room": 3,  // 방 개수
            "bathroom": 2  // 화장실 개수
          }
        },
        /**
         * 80C 타입 세대 정보
         */
        {
          "name": "80C",
          "area": {
            "supply": 80.19,
            "exclusive": 59.92,
            "pyeong": 24.25,
            "exclusivePyeong": 18.12
          },
          "count": {
            "household": 339,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 80B 타입 세대 정보
         */
        {
          "name": "80B",
          "area": {
            "supply": 80.18,
            "exclusive": 59.94,
            "pyeong": 24.25,
            "exclusivePyeong": 18.13
          },
          "count": {
            "household": 163,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 80E 타입 세대 정보
         */
        {
          "name": "80E",
          "area": {
            "supply": 80.63,
            "exclusive": 59.97,
            "pyeong": 24.39,
            "exclusivePyeong": 18.14
          },
          "count": {
            "household": 139,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 80F 타입 세대 정보
         */
        {
          "name": "80F",
          "area": {
            "supply": 80.4,
            "exclusive": 59.92,
            "pyeong": 24.32,
            "exclusivePyeong": 18.12
          },
          "count": {
            "household": 21,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 81D 타입 세대 정보
         */
        {
          "name": "81D",
          "area": {
            "supply": 81.17,
            "exclusive": 59.9,
            "pyeong": 24.55,
            "exclusivePyeong": 18.11
          },
          "count": {
            "household": 7,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 110A 타입 세대 정보
         */
        {
          "name": "110A",
          "area": {
            "supply": 110.95,
            "exclusive": 84.38,
            "pyeong": 33.56,
            "exclusivePyeong": 25.52
          },
          "count": {
            "household": 167,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 112C 타입 세대 정보
         */
        {
          "name": "112C",
          "area": {
            "supply": 112.71,
            "exclusive": 84.59,
            "pyeong": 34.09,
            "exclusivePyeong": 25.58
          },
          "count": {
            "household": 501,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 113B 타입 세대 정보
         */
        {
          "name": "113B",
          "area": {
            "supply": 113,
            "exclusive": 84.89,
            "pyeong": 34.18,
            "exclusivePyeong": 25.67
          },
          "count": {
            "household": 520,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 113E 타입 세대 정보
         */
        {
          "name": "113E",
          "area": {
            "supply": 113.05,
            "exclusive": 84.59,
            "pyeong": 34.19,
            "exclusivePyeong": 25.58
          },
          "count": {
            "household": 253,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 114D 타입 세대 정보
         */
        {
          "name": "114D",
          "area": {
            "supply": 114.8,
            "exclusive": 84.96,
            "pyeong": 34.72,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 17,
            "room": 3,
            "bathroom": 2
          }
        },
        /**
         * 149A 타입 세대 정보
         */
        {
          "name": "149A",
          "area": {
            "supply": 149.28,
            "exclusive": 114.28,
            "pyeong": 45.15,
            "exclusivePyeong": 34.56
          },
          "count": {
            "household": 106,
            "room": 4,
            "bathroom": 2
          }
        },
        /**
         * 150C 타입 세대 정보
         */
        {
          "name": "150C",
          "area": {
            "supply": 150.5,
            "exclusive": 114.72,
            "pyeong": 45.52,
            "exclusivePyeong": 34.7
          },
          "count": {
            "household": 216,
            "room": 4,
            "bathroom": 2
          }
        },
        /**
         * 150B 타입 세대 정보
         */
        {
          "name": "150B",
          "area": {
            "supply": 150.66,
            "exclusive": 114.58,
            "pyeong": 45.57,
            "exclusivePyeong": 34.66
          },
          "count": {
            "household": 177,
            "room": 4,
            "bathroom": 2
          }
        },
        /**
         * 189A 타입 세대 정보
         */
        {
          "name": "189A",
          "area": {
            "supply": 189.33,
            "exclusive": 145.2,
            "pyeong": 57.27,
            "exclusivePyeong": 43.92
          },
          "count": {
            "household": 26,
            "room": 4,
            "bathroom": 2  // 189A 타입의 방은 4개, 화장실은 2개입니다.
          }
        }
      ]
    }
  }
}