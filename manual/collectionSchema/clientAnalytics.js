const collectionName = "clientAnalytics";

const collectionDescription = "매일 그 날 문의한 고객들의 세션 번호와 프론트 웹에서 무엇을 했는지에 대해 기록한 디비"

/**
 * clientAnalytics 컬렉션: 매일 그 날 문의한 고객들의 세션 번호와 프론트 웹에서 어떤 활동을 했는지 기록한 데이터.
 * 이 데이터는 고객의 행동을 추적하고 분석하기 위해 저장됩니다.
 */

const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "6695d19525c2281b5ce61d4c",  // MongoDB에서 생성된 이 문서의 고유 ObjectId입니다.

  /**
   * 고객 ID (cliid)
   * @type {string}
   */
  "cliid": "c2204_aa51s",  // Homeliezon의 고객 ID로 이 고객을 식별하는데 사용됩니다.

  /**
   * 고객 정보 (client)
   * @type {Object}
   */
  "client": {
    /**
     * 고객 이름 (name)
     * @type {string}
     */
    "name": "최인애",  // 고객의 이름입니다.

    /**
     * 고객 전화번호 (phone)
     * @type {string}
     */
    "phone": "010-3684-6931",  // 고객의 전화번호입니다.

    /**
     * 고객 이메일 (email)
     * @type {string}
     */
    "email": "inaech@gmail.com",  // 고객의 이메일 주소입니다.

    /**
     * 고객 ID (cliid)
     * @type {string}
     */
    "cliid": "c2204_aa51s",  // 고객의 고유 식별자입니다.

    /**
     * 고객 요청 (requests)
     * @type {Array}
     */
    "requests": [
      {
        /**
         * 요청 세부 정보 (request)
         * @type {Object}
         */
        "request": {
          /**
           * 요청 발생 시각 (timeline)
           * @type {string}
           */
          "timeline": "2024-07-09T03:12:09.187Z",  // 요청이 접수된 시간입니다.

          /**
           * 노션 ID (notionId)
           * @type {string}
           */
          "notionId": "",  // 노션과 연동된 경우, 관련 노션 ID입니다. 현재는 값이 없습니다.

          /**
           * 예산 정보 (budget)
           * @type {string}
           */
          "budget": "9,000만원 이상",  // 고객이 제시한 예산 범위입니다.

          /**
           * 가족 구성 (family)
           * @type {string}
           */
          "family": "부부, 자녀 없음",  // 고객의 가족 구성 정보입니다.

          /**
           * 가구 정보 (furniture)
           * @type {string}
           */
          "furniture": "알 수 없음",  // 가구 정보가 확인되지 않았음을 나타냅니다.

          /**
           * 공간 정보 (space)
           * @type {Object}
           */
          "space": {
            /**
             * 주소 (address)
             * @type {string}
             */
            "address": "경기 고양시 덕양구 세솔로 25 (동산동, 동산마을 22단지 호반베르디움) 2213-1803",  // 고객의 공간 주소입니다.

            /**
             * 계약 정보 (contract)
             * @type {string}
             */
            "contract": "자가",  // 해당 공간이 자가인지 여부를 나타냅니다.

            /**
             * 평수 (pyeong)
             * @type {number}
             */
            "pyeong": 34,  // 해당 공간의 평수입니다.

            /**
             * 세부 사항 (spec)
             * @type {Object}
             */
            "spec": {
              /**
               * 방 개수 (room)
               * @type {number}
               */
              "room": 3,  // 방의 개수입니다.

              /**
               * 욕실 개수 (bathroom)
               * @type {number}
               */
              "bathroom": 2,  // 욕실의 개수입니다.

              /**
               * 발코니 여부 (valcony)
               * @type {boolean}
               */
              "valcony": false  // 발코니 유무를 나타냅니다. 발코니가 없습니다.
            },

            /**
             * 거주 정보 (resident)
             * @type {Object}
             */
            "resident": {
              /**
               * 현재 거주 여부 (living)
               * @type {boolean}
               */
              "living": false,  // 현재 이 공간에 거주 중인지를 나타냅니다. 거주 중이 아닙니다.

              /**
               * 예상 입주일 (expected)
               * @type {string}
               */
              "expected": "2024-08-30T15:00:00.000Z"  // 예상 입주일입니다.
            },

            /**
             * 부분 시공 여부 (partial)
             * @type {Object}
             */
            "partial": {
              /**
               * 부분 시공 여부 (boo)
               * @type {boolean}
               */
              "boo": false,  // 부분 시공을 원하는지 여부입니다.

              /**
               * 시공 평수 (pyeong)
               * @type {number}
               */
              "pyeong": 0,  // 시공하려는 평수입니다. 부분 시공을 원하지 않기 때문에 0입니다.

              /**
               * 시공 세부 사항 (detail)
               * @type {string}
               */
              "detail": ""  // 시공의 세부 사항입니다. 현재는 비어 있습니다.
            }
          },

          /**
           * 기타 요청사항 (etc)
           * @type {Object}
           */
          "etc": {
            /**
             * 고객의 코멘트 (comment)
             * @type {string}
             */
            "comment": "예산 내에서 전체 시공 및 스타일링 하고싶어요.\n예산은 가구, 가전 포함해서  1억 이내로 하고 싶어요.",  // 고객의 추가 요청 사항입니다.

            /**
             * 상담 채널 (channel)
             * @type {string}
             */
            "channel": "인터넷 검색"  // 고객이 상담 요청을 한 경로입니다. 여기서는 인터넷 검색을 통해 상담 요청을 했습니다.
          }
        },

        /**
         * 분석 데이터 (analytics)
         * @type {Object}
         */
        "analytics": {
          /**
           * 응답 상태 (response)
           * @type {Object}
           */
          "response": {
            /**
             * 상태 (status)
             * @type {string}
             */
            "status": "드랍",  // 고객이 상담을 드랍한 상태입니다.

            /**
             * 진행 중 액션 (action)
             * @type {string}
             */
            "action": "제안 피드백 예정",  // 이후에 제안 피드백을 진행할 예정임을 나타냅니다.

            /**
             * 드랍 사유 (outreason)
             * @type {Array<string>}
             */
            "outreason": ["연결 안 됨"],  // 드랍된 사유로, 고객과 연결되지 않았음을 나타냅니다.

            /**
             * 카카오 소통 여부 (kakao)
             * @type {boolean}
             */
            "kakao": false,  // 카카오톡을 통해 소통하지 않았습니다.

            /**
             * 서비스 정보 (service)
             * @type {Object}
             */
            "service": {
              /**
               * 서비스 ID (serid)
               * @type {string}
               */
              "serid": "s2011_aa03s",  // 서비스 ID입니다.

              /**
               * 서비스 분류 (xValue)
               * @type {string}
               */
              "xValue": "B",  // 서비스 분류 값입니다.

              /**
               * 온라인 여부 (online)
               * @type {boolean}
               */
              "online": false  // 해당 서비스가 온라인 상에서 이루어지는지 여부입니다. 온라인이 아닙니다.
            },

            /**
             * 할당된 디자이너들 (designers)
             * @type {Array}
             */
            "designers": [],  // 해당 고객에게 할당된 디자이너는 없습니다.

            /**
             * 우선순위 (priority)
             * @type {string}
             */
            "priority": "하",  // 우선순위가 낮음을 나타냅니다.

            /**
             * 가능성 (possible)
             * @type {string}
             */
            "possible": "낮음",  // 상담이 성공할 가능성이 낮습니다.

            /**
             * 타겟 상태 (target)
             * @type {string}
             */
            "target": "해당 없음",  // 현재 타겟으로 설정된 상태가 없습니다.

            /**
             * 메모 (memo)
             * @type {string}
             */
            "memo": "카톡피드백"  // 상담 메모입니다. 카카오톡을 통해 피드백을 진행할 예정임을 나타냅니다.
          },

          /**
           * 날짜 관련 정보 (date)
           * @type {Object}
           */
          "date": {
            /**
             * 통화 기록 (call)
             * @type {Object}
             */
            "call": {
              /**
               * 다음 통화 날짜 (next)
               * @type {string}
               */
              "next": "2024-07-08T15:00:00.000Z",  // 다음 통화가 예정된 날짜입니다.

              /**
               * 통화 이력 (history)
               * @type {Array<Object>}
               */
              "history": [
                {
                  /**
                   * 통화 날짜 (date)
                   * @type {string}
                   */
                  "date": "2024-07-09T04:55:28.000Z",  // 통화가 이루어진 시각입니다.

                  /**
                   * 통화한 사람 (who)
                   * @type {string}
                   */
                  "who": ""  // 통화한 사람에 대한 정보입니다. 비어 있습니다.
                },
                {
                  "date": "2024-07-09T05:33:46.000Z",  // 또 다른 통화 기록입니다.
                  "who": ""  // 통화한 사람의 정보는 없습니다.
                }
              ],

              /**
               * 추천 통화 날짜 (recommend)
               * @type {string}
               */
              "recommend": "1799-12-31T15:32:08.000Z"  // 추천된 통화 날짜입니다. 테스트 데이터입니다.
            },
            
            /**
             * 공간 관련 정보 (space)
             * @type {Object}
             */
            "space": {
              "precheck": "1799-12-31T15:32:08.000Z",  // 사전 점검 날짜입니다.
              "empty": "1799-12-31T15:32:08.000Z",  // 빈 공간 여부 확인 날짜입니다.
              "movein": "2024-09-03T15:00:00.000Z"  // 고객이 이사할 날짜입니다.
            },
            
            /**
             * 캘린더 정보 (calendar)
             * @type {Object}
             */
            "calendar": {
              "call": {
                "mother": "clientCalendar",  // 캘린더에 설정된 부모 이벤트입니다.
                "id": ""  // 해당 이벤트의 ID입니다. 현재 비어 있습니다.
              },
              "precheck": {
                "mother": "clientCalendar",  // 사전 점검 이벤트에 대한 정보
                "id": ""  // 사전 점검 이벤트 ID입니다.
              },
              "empty": {
                "mother": "clientCalendar",  // 빈 공간 점검 이벤트
                "id": ""  // 빈 공간 점검 이벤트 ID입니다.
              },
              "movein": {
                "mother": "clientCalendar",  // 이사 일정 이벤트
                "id": ""  // 이사 일정 이벤트 ID입니다.
              }
            }
          },

          /**
           * 사진 정보 (picture)
           * @type {Object}
           */
          "picture": {
            "space": {
              "boo": false,  // 공간 사진 여부입니다.
              "file": []  // 사진 파일 배열
            },
            "prefer": {
              "boo": false,  // 선호 사진 여부입니다.
              "file": []  // 선호 사진 파일 배열
            }
          },

          /**
           * 제안서 정보 (proposal)
           * @type {Array<Object>}
           */
          "proposal": [
            {
              /**
               * 제안서 ID (proid)
               * @type {string}
               */
              "proid": "p2204_aa46s",  // 제안서 ID입니다.

              /**
               * 제안 날짜 (date)
               * @type {string}
               */
              "date": "2024-07-09T05:54:47.364Z",  // 제안이 이루어진 날짜입니다.

              /**
               * 계약 여부 (contract)
               * @type {boolean}
               */
              "contract": false  // 계약이 이루어지지 않았습니다.
            }
          ],

          /**
           * 세션 정보 (session)
           * @type {Array<string>}
           */
          "session": [
            "homeliaison_6dd2c14a3dfe09fc_1720451091_0d62e630"  // 고객이 웹사이트에 접속한 세션 ID입니다.
          ]
        }
      }
    ]
  },

  /**
   * 세션 정보 (sessions)
   * @type {Object}
   */
  "sessions": {
    "length": 1,  // 세션의 길이입니다.
    "id": [
      "homeliaison_6dd2c14a3dfe09fc_1720451091_0d62e630"  // 세션 ID입니다.
    ],
    "device": [
      {
        "kinds": "mobile",  // 고객이 접속한 장치 종류입니다.
        "os": "iOS",  // 사용 중인 운영체제입니다.
        "browser": "Mobile Safari"  // 고객이 사용 중인 브라우저입니다.
      }
    ]
  },

  /**
   * 소스 정보 (source)
   * @type {Object}
   */
  "source": {
    "referrer": [
      "https://www.google.com/"  // 사용자가 접근한 출처 URL입니다.
    ],
    "mother": [
      "naver",  // 네이버에서 접속한 이력
      "google"  // 구글에서 접속한 이력
    ],
    "medium": [
      "brand"  // 접속 매체 정보입니다.
    ],
    "campaign": [
      "image"  // 관련된 캠페인 정보입니다.
    ],
    "search": []  // 검색 기록입니다.
  },

  /**
   * 히스토리 기록 (history)
   * @type {Object}
   */
  "history": {
    "detail": [
      {
        "date": "2024-07-09T03:45:18.486Z",  // 활동이 이루어진 시간입니다.
        "path": "/portdetail.php?pid=a127",  // 사용자가 접근한 경로입니다.
        "referer": "https://home-liaison.com/desdetail.php?desid=d2402_aa02s",  // 사용자가 이전에 방문한 페이지입니다.
        "title": "신내 두산대림 홈스타일링 | 홈리에종",  // 사용자가 방문한 페이지 제목입니다.
        "event": "contentsView",  // 발생한 이벤트 유형입니다.
        "session": "homeliaison_6dd2c14a3dfe09fc_1720451091_0d62e630"  // 이 활동에 해당하는 세션입니다.
      }
    ],
    "length": 507,  // 이 고객이 수행한 총 이벤트 횟수입니다.
    "during": 70338535858  // 활동이 지속된 시간입니다.
  },

  /**
   * 콘텐츠 정보 (contents)
   * @type {Object}
   */
  "contents": {
    "view": {
      "portfolio": [
        {
          "link": "https://home-liaison.com/portdetail.php?pid=p410",  // 고객이 본 포트폴리오의 링크입니다.
          "title": "푸르지오 브리시엘 홈스타일링 | 홈리에종"  // 포트폴리오의 제목입니다.
        }
      ],
      "review": [
        {
          "link": "https://home-liaison.com/revdetail.php?pid=p428",  // 고객이 본 리뷰의 링크입니다.
          "title": "디자이너와 작업하는 과정이 즐겁고 편안했어요. | 홈리에종"  // 리뷰 제목입니다.
        },
        {
          "link": "https://home-liaison.com/revdetail.php?pid=p426",  // 다른 리뷰 링크입니다.
          "title": "디자이너님의 의견을 듣는 것이 결정적이었어요. | 홈리에종"  // 리뷰 제목입니다.
        }
      ],
      "designer": [
        {
          "link": "https://home-liaison.com/desdetail.php?desid=d2302_aa01s",  // 고객이 본 디자이너 정보의 링크입니다.
          "title": "강유정 디자이너 | 홈리에종"  // 디자이너 이름 및 정보입니다.
        }
      ]
    },
    "designers": {
      "desid": [
        "d1902_aa01s",  // 고객이 본 디자이너 ID입니다.
        "d1904_aa12s",
        "d2105_aa01s"
      ],
      "length": 41  // 고객이 본 총 디자이너 수입니다.
    }
  }
};

