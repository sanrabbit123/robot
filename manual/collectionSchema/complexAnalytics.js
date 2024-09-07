/**
 * @const {string} collectionName - 콜렉션 이름
 * @description 매일 웹에 대한 구글 Analytics의 모든 유저 및 이벤트 기록을 저장한 데이터베이스
 */
const collectionName = "complexAnalytics"; // 복합 분석 데이터를 기록하는 콜렉션 이름

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 구글 Analytics를 통해 기록한 모든 유저와 이벤트에 대한 정보를 저장하는 콜렉션
 */
const collectionDescription = "매일 그 날 웹에 대해서 구글 Analytics를 통해 기록한 모든 유저와 이벤트에 대한 정보"; // 구글 Analytics 데이터를 기록하는 설명

/**
 * @const {Object} collectionSampleData0 - 첫 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} key - 복합 분석 키 (기간을 포함)
 * @property {Object} date - 분석 데이터의 시작일과 종료일
 * @property {Object} data - 유저, 조회수, 이벤트, 전환 데이터 등 상세 분석 결과
 */
const collectionSampleData0 = {
  _id: "66c1c641414481dd471757ee", // MongoDB의 고유 식별자
  key: "complex_analytics_20240801_20240817", // 분석 데이터 키, 기간을 포함한 고유값
  date: {
    from: "2024-07-31T15:00:00.000Z", // 분석 시작 날짜 (UTC)
    to: "2024-08-17T15:00:00.000Z" // 분석 종료 날짜 (UTC)
  },
  data: {
    users: {
      total: 7330, // 전체 유저 수
      detail: {
        userType: {
          cases: [
            {
              case: "New Visitor", // 새 방문자 유형
              value: 6000 // 새 방문자 수
            },
            {
              case: "Returning Visitor", // 재방문자 유형
              value: 1040 // 재방문자 수
            }
          ],
          total: 7330, // 유저 유형별 총합
          kinds: 3 // 유저 유형의 종류 수
        },
        country: {
          cases: [
            {
              case: "South Korea", // 방문 국가
              value: 6407 // 해당 국가에서 방문한 유저 수
            }
          ],
          total: 6500, // 국가별 유저 총합
          kinds: 23 // 국가의 종류 수
        },
        city: {
          cases: [
            {
              case: "Seoul", // 도시명
              value: 3220 // 해당 도시에서 방문한 유저 수
            }
          ],
          total: 6934, // 도시별 유저 총합
          kinds: 152 // 도시의 종류 수
        },
        campaign: {
          cases: [
            {
              case: "ads03", // 캠페인명
              value: 1586 // 해당 캠페인을 통해 방문한 유저 수
            },
            {
              case: "(direct)", // 직접 방문
              value: 742 // 직접 방문한 유저 수
            }
          ],
          total: 6741, // 캠페인별 유저 총합
          kinds: 79 // 캠페인의 종류 수
        },
        source: {
          cases: [
            {
              case: "naver", // 유입 경로 소스명
              value: 1685 // 해당 소스를 통해 방문한 유저 수
            }
          ],
          total: 6622, // 소스별 유저 총합
          kinds: 45 // 소스의 종류 수
        },
        sourceDetail: {
          cases: [
            {
              case: "carrot / 2408", // 세부 소스명
              value: 1646 // 해당 소스의 유저 수
            },
            {
              case: "meta / interest_all_test", // 세부 소스명
              value: 1100 // 해당 소스의 유저 수
            }
          ],
          total: 6662, // 세부 소스별 유저 총합
          kinds: 65 // 세부 소스의 종류 수
        }
      }
    },
    views: {
      total: 38654, // 전체 조회수
      detail: {
        pagePath: {
          cases: [
            {
              case: "/portfolio.php", // 페이지 경로
              value: 2234 // 해당 페이지의 조회수
            },
            {
              case: "/", // 홈페이지
              value: 1489 // 해당 페이지의 조회수
            }
          ],
          total: 38654, // 페이지 경로별 조회수 총합
          kinds: 6327 // 페이지 경로의 종류 수
        },
        referer: {
          cases: [
            {
              case: "https://home-liaison.com/portfolio.php", // 참조한 페이지 경로
              value: 2691 // 해당 페이지에서 유입된 조회수
            },
            {
              case: "https://home-liaison.com/designer.php", // 참조한 페이지 경로
              value: 1615 // 해당 페이지에서 유입된 조회수
            }
          ],
          total: 38654, // 참조 페이지 경로별 조회수 총합
          kinds: 4098 // 참조 경로의 종류 수
        },
        deviceCategory: {
          cases: [
            {
              case: "mobile", // 디바이스 카테고리
              value: 25941 // 해당 디바이스에서 발생한 조회수
            },
            {
              case: "desktop", // 디바이스 카테고리
              value: 11922 // 해당 디바이스에서 발생한 조회수
            }
          ],
          total: 38654, // 디바이스별 조회수 총합
          kinds: 3 // 디바이스 카테고리의 종류 수
        },
        operatingSystem: {
          cases: [
            {
              case: "Android", // 운영체제명
              value: 16454 // 해당 운영체제에서 발생한 조회수
            },
            {
              case: "iOS", // 운영체제명
              value: 10270 // 해당 운영체제에서 발생한 조회수
            }
          ],
          total: 38654, // 운영체제별 조회수 총합
          kinds: 8 // 운영체제의 종류 수
        },
        browser: {
          cases: [
            {
              case: "Android Webview", // 브라우저명
              value: 9869 // 해당 브라우저에서 발생한 조회수
            },
            {
              case: "Chrome", // 브라우저명
              value: 8410 // 해당 브라우저에서 발생한 조회수
            }
          ],
          total: 38654, // 브라우저별 조회수 총합
          kinds: 12 // 브라우저 종류 수
        },
        campaign: {
          cases: [
            {
              case: "(referral)", // 캠페인 유형
              value: 6288 // 해당 캠페인에서 발생한 조회수
            },
            {
              case: "(organic)", // 자연 검색 유입
              value: 6249 // 해당 캠페인에서 발생한 조회수
            }
          ],
          total: 38654, // 캠페인별 조회수 총합
          kinds: 79 // 캠페인의 종류 수
        },
        source: {
          cases: [
            {
              case: "naver", // 유입 경로 소스
              value: 11578 // 해당 소스에서 발생한 조회수
            },
            {
              case: "(direct)", // 직접 유입
              value: 6209 // 직접 유입에서 발생한 조회수
            }
          ],
          total: 38654, // 소스별 조회수 총합
          kinds: 45 // 소스의 종류 수
        },
        sourceDetail: {
          cases: [
            {
              case: "(direct) / (none)", // 세부 소스
              value: 6209 // 해당 소스에서 발생한 조회수
            }
          ],
          total: 38654, // 세부 소스별 조회수 총합
          kinds: 65 // 세부 소스의 종류 수
        }
      }
    },
    events: {
      total: 240514, // 전체 이벤트 수
      detail: {
        pagePath: {
          cases: [
            {
              case: "/", // 페이지 경로
              value: 18393 // 해당 페이지에서 발생한 이벤트 수
            }
          ],
          total: 240514, // 페이지별 이벤트 총합
          kinds: 6328 // 페이지 경로의 종류 수
        },
        eventName: {
          cases: [
            {
              case: "readTimer", // 이벤트 이름
              value: 55510 // 해당 이벤트 발생 수
            },
            {
              case: "page_view", // 이벤트 이름
              value: 38654 // 해당 이벤트 발생 수
            }
          ],
          total: 240514, // 이벤트명별 총합
          kinds: 55 // 이벤트 종류 수
        },
        campaign: {
          cases: [
            {
              case: "(organic)", // 자연 검색 캠페인
              value: 61790 // 해당 캠페인에서 발생한 이벤트 수
            }
          ],
          total: 240514, // 캠페인별 이벤트 총합
          kinds: 79 // 캠페인 종류 수
        },
        source: {
          cases: [
            {
              case: "naver", // 이벤트 발생 소스
              value: 79321 // 해당 소스에서 발생한 이벤트 수
            },
            {
              case: "meta", // 이벤트 발생 소스
              value: 33435 // 해당 소스에서 발생한 이벤트 수
            }
          ],
          total: 240514, // 소스별 이벤트 총합
          kinds: 45 // 소스의 종류 수
        },
        sourceDetail: {
          cases: [
            {
              case: "naver / organic", // 세부 소스
              value: 40011 // 해당 소스에서 발생한 이벤트 수
            },
            {
              case: "(direct) / (none)", // 세부 소스
              value: 32702 // 해당 소스에서 발생한 이벤트 수
            }
          ],
          total: 240514, // 세부 소스별 이벤트 총합
          kinds: 65 // 세부 소스의 종류 수
        }
      }
    },
    conversion: {
      popupOpen: {
        total: 157, // 전체 팝업 오픈 횟수
        detail: {
          pagePath: {
            cases: [
              {
                case: "/about.php", // 페이지 경로
                value: 15 // 해당 페이지에서 팝업 오픈 횟수
              },
              {
                case: "/portfolio.php", // 페이지 경로
                value: 10 // 해당 페이지에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 페이지 경로별 팝업 오픈 총합
            kinds: 100 // 페이지 경로의 종류 수
          },
          deviceCategory: {
            cases: [
              {
                case: "mobile", // 디바이스 카테고리
                value: 124 // 해당 디바이스에서 팝업 오픈 횟수
              },
              {
                case: "desktop", // 디바이스 카테고리
                value: 29 // 해당 디바이스에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 디바이스별 팝업 오픈 총합
            kinds: 3 // 디바이스 카테고리의 종류 수
          },
          operatingSystem: {
            cases: [
              {
                case: "Android", // 운영체제
                value: 71 // 해당 운영체제에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 운영체제별 팝업 오픈 총합
            kinds: 4 // 운영체제의 종류 수
          },
          browser: {
            cases: [
              {
                case: "Android Webview", // 브라우저
                value: 46 // 해당 브라우저에서 팝업 오픈 횟수
              },
              {
                case: "Safari (in-app)", // 브라우저
                value: 35 // 해당 브라우저에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 브라우저별 팝업 오픈 총합
            kinds: 7 // 브라우저 종류 수
          },
          campaign: {
            cases: [
              {
                case: "service_homestyling_01_single", // 캠페인 이름
                value: 34 // 해당 캠페인에서 팝업 오픈 횟수
              },
              {
                case: "(organic)", // 자연 검색 유입
                value: 23 // 해당 캠페인에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 캠페인별 팝업 오픈 총합
            kinds: 27 // 캠페인 종류 수
          },
          source: {
            cases: [
              {
                case: "meta", // 소스 이름
                value: 58 // 해당 소스에서 팝업 오픈 횟수
              },
              {
                case: "naver", // 소스 이름
                value: 50 // 해당 소스에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 소스별 팝업 오픈 총합
            kinds: 12 // 소스의 종류 수
          },
          sourceDetail: {
            cases: [
              {
                case: "meta / interest_all_test", // 세부 소스 이름
                value: 54 // 해당 소스에서 팝업 오픈 횟수
              },
              {
                case: "naver / brand", // 세부 소스 이름
                value: 17 // 해당 소스에서 팝업 오픈 횟수
              }
            ],
            total: 157, // 세부 소스별 팝업 오픈 총합
            kinds: 22 // 세부 소스의 종류 수
          }
        }
      },
      consultingPage: {
        total: 655, // 전체 상담 페이지 접속 횟수
        detail: {
          deviceCategory: {
            cases: [
              {
                case: "mobile", // 디바이스 카테고리
                value: 475 // 해당 디바이스에서 상담 페이지 접속 횟수
              },
              {
                case: "desktop", // 디바이스 카테고리
                value: 174 // 해당 디바이스에서 상담 페이지 접속 횟수
              },
              {
                case: "tablet", // 디바이스 카테고리
                value: 6 // 해당 디바이스에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 디바이스별 상담 페이지 접속 총합
            kinds: 3 // 디바이스 종류 수
          },
          operatingSystem: {
            cases: [
              {
                case: "Android", // 운영체제
                value: 251 // 해당 운영체제에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 운영체제별 상담 페이지 접속 총합
            kinds: 5 // 운영체제의 종류 수
          },
          browser: {
            cases: [
              {
                case: "Safari (in-app)", // 브라우저 이름
                value: 158 // 해당 브라우저에서 상담 페이지 접속 횟수
              },
              {
                case: "Chrome", // 브라우저 이름
                value: 157 // 해당 브라우저에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 브라우저별 상담 페이지 접속 총합
            kinds: 7 // 브라우저의 종류 수
          },
          campaign: {
            cases: [
              {
                case: "(organic)", // 자연 검색 유입
                value: 123 // 해당 캠페인에서 상담 페이지 접속 횟수
              },
              {
                case: "(referral)", // 참조 캠페인
                value: 80 // 해당 캠페인에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 캠페인별 상담 페이지 접속 총합
            kinds: 39 // 캠페인의 종류 수
          },
          source: {
            cases: [
              {
                case: "naver", // 소스 이름
                value: 168 // 해당 소스에서 상담 페이지 접속 횟수
              },
              {
                case: "kakao", // 소스 이름
                value: 139 // 해당 소스에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 소스별 상담 페이지 접속 총합
            kinds: 18 // 소스 종류 수
          },
          sourceDetail: {
            cases: [
              {
                case: "instagram / profile", // 세부 소스
                value: 95 // 해당 소스에서 상담 페이지 접속 횟수
              }
            ],
            total: 655, // 세부 소스별 상담 페이지 접속 총합
            kinds: 30 // 세부 소스 종류 수
          }
        }
      }
    }
  }
};