const ClientSampleData = {
  // 클라이언트의 이름을 나타냅니다.
  "name": "곽숙영",
  // 클라이언트의 전화번호를 나타냅니다.
  "phone": "010-7276-7524",
  // 클라이언트의 이메일 주소를 나타냅니다.
  "email": "suying75@gmail.com",
  // 클라이언트 ID를 나타내며, 'c'로 시작하는 고유 식별자입니다.
  "cliid": "c2302_aa59s",
  // 클라이언트의 여러 요청(requests)을 담고 있는 배열입니다.
  "requests": [
    {
      // 요청에 대한 구체적인 정보를 담고 있는 객체입니다.
      "request": {
        // 요청의 타임라인을 나타내는 Date 객체입니다.
        "timeline": new Date("2023-02-13T01:45:21.532Z"),
        // 노션 ID를 나타내며, 이 경우에는 비어있습니다.
        "notionId": "",
        // 요청한 예산을 나타내며, 여기서는 2,000만원입니다.
        "budget": "2,000만원",
        // 가구 구매 계획을 나타내며, 전체 구매로 설정되어 있습니다.
        "furniture": "전체 구매",
        // 가족 구성원을 나타내며, 고객과 자녀 3명이 포함됩니다.
        "family": "고객님, 자녀3(대학생,고등학생, 초등학생)",
        // 공간 정보를 나타내는 객체입니다.
        "space": {
          // 주소 정보를 나타내며, 서울 서초구의 특정 아파트로 설정되어 있습니다.
          "address": "서울 서초구 잠원로 166-17 (잠원동, 강변아파트) 2-502호",
          // 계약 형태를 나타내며, 전월세 계약으로 설정되어 있습니다.
          "contract": "전월세",
          // 평수를 나타내며, 30평으로 설정되어 있습니다.
          "pyeong": 30,
          // 공간의 스펙을 나타내는 객체입니다.
          "spec": {
            // 방 개수를 나타내며, 3개로 설정되어 있습니다.
            "room": 3,
            // 화장실 개수를 나타내며, 2개로 설정되어 있습니다.
            "bathroom": 2,
            // 발코니 확장 여부를 나타내며, 확장되지 않은 상태로 설정되어 있습니다.
            "valcony": false
          },
          // 거주자 정보를 나타내는 객체입니다.
          "resident": {
            // 현재 거주 여부를 나타내며, 이사 예정으로 설정되어 있습니다.
            "living": false,
            // 입주 예정일을 나타내며, 2023년 3월 16일로 설정되어 있습니다.
            "expected": new Date("2023-03-16T15:00:00.000Z")
          },
          // 부분 시공 여부를 나타내는 객체입니다.
          "partial": {
            // 부분 시공 여부를 나타내며, 전체 시공으로 설정되어 있습니다.
            "boo": false,
            // 부분 시공 평수를 나타내며, 이 경우 0으로 설정되어 있습니다.
            "pyeong": 0,
            // 부분 시공 상세 정보를 나타내며, 이 경우 비어 있습니다.
            "detail": ""
          },
          // 네이버 매물 ID를 나타내며, '511'로 설정되어 있습니다.
          "naver": "511"
        },
        // 기타 요청 사항을 나타내는 객체입니다.
        "etc": {
          // 고객의 요청 내용을 나타내며, 가구 교체와 수납공간 확보를 원한다고 기재되어 있습니다.
          "comment": "이사 가면서 안방, 거실, 고등학생 아이방 , 식탁까지 거의 모든 가구의 교체를 원해요. 구축이라 수납공간 확보가 가장 중요합니다.",
          // 문의 채널을 나타내며, 인터넷 검색을 통해 문의한 것으로 설정되어 있습니다.
          "channel": "인터넷 검색"
        }
      },
      // 요청에 대한 분석 정보를 담고 있는 객체입니다.
      "analytics": {
        // 응답 상태를 나타내는 객체입니다.
        "response": {
          // 현재 상태를 나타내며, '드랍' 상태로 설정되어 있습니다.
          "status": "드랍",
          // 액션 상태를 나타내며, 제안 피드백 완료로 설정되어 있습니다.
          "action": "제안 피드백 완료",
          // 거부 이유를 나타내며, '가벼운 문의'와 '기간 임박'으로 설정되어 있습니다.
          "outreason": [
            "가벼운 문의",
            "기간 임박"
          ],
          // 카카오톡 여부를 나타내며, 사용하지 않음으로 설정되어 있습니다.
          "kakao": false,
          // 서비스 정보를 나타내는 객체입니다.
          "service": {
            // 서비스 ID를 나타내며, 's2011_aa01s'로 설정되어 있습니다.
            "serid": "s2011_aa01s",
            // 서비스의 유형을 나타내며, 'B'로 설정되어 있습니다.
            "xValue": "B",
            // 온라인 여부를 나타내며, 오프라인으로 설정되어 있습니다.
            "online": false
          },
          // 참여한 디자이너 리스트를 나타내며, 이 경우 빈 배열로 설정되어 있습니다.
          "designers": [],
          // 응대 가능성을 나타내며, '낮음'으로 설정되어 있습니다.
          "possible": "낮음",
          // 우선 순위를 나타내며, '상'으로 설정되어 있습니다.
          "priority": "상",
          // 메모를 나타내며, 이 경우 비어 있습니다.
          "memo": "",
          // 타겟 여부를 나타내며, 타겟으로 설정되어 있습니다.
          "target": "타겟"
        },
        // 날짜 정보를 담고 있는 객체입니다.
        "date": {
          // 통화 관련 정보를 담고 있는 객체입니다.
          "call": {
            // 다음 통화 일정을 나타내며, 비정상적으로 과거의 날짜로 설정되어 있습니다.
            "next": new Date(-5364692872000),
            // 통화 이력을 나타내는 배열입니다.
            "history": [
              {
                // 통화한 날짜를 나타내며, 2023년 2월 14일로 설정되어 있습니다.
                "date": new Date("2023-02-14T07:02:43.000Z"),
                // 통화한 사람을 나타내며, 이 경우 비어 있습니다.
                "who": ""
              },
              {
                // 두 번째 통화한 날짜를 나타내며, 2023년 2월 15일로 설정되어 있습니다.
                "date": new Date("2023-02-15T09:08:45.000Z"),
                // 두 번째 통화한 사람을 나타내며, 이 경우 비어 있습니다.
                "who": ""
              },
              {
                // 세 번째 통화한 날짜를 나타내며, 2023년 2월 16일로 설정되어 있습니다.
                "date": new Date("2023-02-16T04:26:30.000Z"),
                // 세 번째 통화한 사람을 나타내며, 이 경우 비어 있습니다.
                "who": ""
              }
            ],
            // 추천 날짜를 나타내며, 비정상적으로 과거의 날짜로 설정되어 있습니다.
            "recommend": new Date(-5364692872000)
          },
          // 공간 관련 날짜 정보를 담고 있는 객체입니다.
          "space": {
            // 사전 점검 일정을 나타내며, 비정상적으로 과거의 날짜로 설정되어 있습니다.
            "precheck": new Date(-5364692872000),
            // 비어있는 상태가 되는 날짜를 나타내며, 2023년 3월 16일로 설정되어 있습니다.
            "empty": new Date("2023-03-16T15:00:00.000Z"),
            // 입주 날짜를 나타내며, 2023년 4월 6일로 설정되어 있습니다.
            "movein": new Date("2023-04-06T15:00:00.000Z")
          },
          // 캘린더와 관련된 정보를 담고 있는 객체입니다.
          "calendar": {
            // 통화 일정에 관련된 캘린더 정보를 나타내며, 'clientCalendar'로 설정되어 있습니다.
            "call": {
              "mother": "clientCalendar",
              "id": ""
            },
            // 사전 점검 일정에 관련된 캘린더 정보를 나타내며, 'clientCalendar'로 설정되어 있습니다.
            "precheck": {
              "mother": "clientCalendar",
              "id": ""
            },
            // 공간 비움 일정에 관련된 캘린더 정보를 나타내며, 'clientCalendar'로 설정되어 있습니다.
            "empty": {
              "mother": "clientCalendar",
              "id": ""
            },
            // 입주 일정에 관련된 캘린더 정보를 나타내며, 'clientCalendar'로 설정되어 있습니다.
            "movein": {
              "mother": "clientCalendar",
              "id": ""
            }
          }
        },
        // 사진 정보와 관련된 객체입니다.
        "picture": {
          // 공간 사진 정보를 담고 있는 객체입니다.
          "space": {
            // 공간 사진의 제출 여부를 나타내며, 미제출로 설정되어 있습니다.
            "boo": false,
            // 파일 리스트를 나타내며, 이 경우 비어 있습니다.
            "file": []
          },
          // 선호 사진 정보를 담고 있는 객체입니다.
          "prefer": {
            // 선호 사진의 제출 여부를 나타내며, 미제출로 설정되어 있습니다.
            "boo": false,
            // 파일 리스트를 나타내며, 이 경우 비어 있습니다.
            "file": []
          }
        },
        // 제안서 관련 정보를 담고 있는 배열입니다.
        "proposal": [
          {
            // 제안서 ID를 나타내며, 'p2302_aa55s'로 설정되어 있습니다.
            "proid": "p2302_aa55s",
            // 제안서 생성 날짜를 나타내며, 2023년 2월 16일로 설정되어 있습니다.
            "date": new Date("2023-02-16T10:25:08.015Z"),
            // 계약 여부를 나타내며, 계약되지 않은 상태로 설정되어 있습니다.
            "contract": false
          }
        ],
        // 세션 관련 정보를 담고 있는 배열이며, 이 경우 빈 배열로 설정되어 있습니다.
        "session": []
      }
    }
  ]
}

/**
 * @namespace ClientMap
 * @description 홈리에종에 인테리어 상담 문의를 남긴 고객들에 대한 스키마를 정의하고, 기본값을 설정하는 JSON 생성기 함수입니다.
 */
const ClientMap = {

  /**
   * @function main
   * @memberof ClientMap
   * @description 고객 데이터를 위한 기본 스키마를 정의합니다. 각 고객의 기본 정보를 포함한 구조를 반환합니다.
   * @returns {Object} 기본값이 설정된 고객 데이터의 구조체를 반환합니다.
   */
  main: function () {
    let dummy; // 'dummy'라는 변수를 선언합니다. 이 변수는 기본 구조체를 저장하는 데 사용됩니다.
    
    // 'dummy' 변수에 고객의 기본 정보를 담는 구조체를 할당합니다.
    dummy = {
      structure: {
        name: "", // 고객의 이름을 저장할 빈 문자열. 초기값은 빈 문자열로 설정됩니다.
        phone: "", // 고객의 전화번호를 저장할 빈 문자열. 초기값은 빈 문자열로 설정됩니다.
        email: "", // 고객의 이메일을 저장할 빈 문자열. 초기값은 빈 문자열로 설정됩니다.
        cliid: "", // 고객 ID를 저장할 빈 문자열. 초기값은 빈 문자열로 설정됩니다.
        requests: [], // 고객이 남긴 문의 사항(requests)을 저장할 배열. 초기값은 빈 배열로 설정됩니다.
      },
    };
    
    return dummy; // 초기값이 설정된 고객 데이터 구조체를 반환합니다.
  },

  /**
   * @function sub
   * @memberof ClientMap
   * @description 주어진 주제에 따라 적절한 기본값을 포함하는 객체를 생성하여 반환합니다.
   * @param {string} subject - 요청된 하위 구조의 이름입니다.
   * @returns {Object} subject에 해당하는 기본값이 포함된 객체를 반환합니다.
   */
  sub: function (subject) {
    let dummy = null; // 'dummy' 변수를 null로 초기화합니다. 나중에 조건에 따라 적절한 값을 할당합니다.

    // 주어진 subject가 "requests"일 경우
    if (subject === "requests") {
      // 'requests'에 해당하는 기본 구조체를 정의하고 dummy에 할당합니다.
      dummy = {
        request: {
          timeline: new Date(1800, 0, 1), // 문의가 제출된 날짜와 시간을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
          notionId: "", // 노션(Notion) ID를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
          budget: "알 수 없음", // 예산 정보를 저장할 문자열. 기본값은 "알 수 없음"으로 설정됩니다.
          furniture: "알 수 없음", // 가구 구매 여부를 저장할 문자열. 기본값은 "알 수 없음"으로 설정됩니다.
          family: "", // 가족 구성원 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
          space: {
            address: "", // 공간의 주소 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
            contract: "알 수 없음", // 계약 형태(자가, 전월세 등)를 저장할 문자열. 기본값은 "알 수 없음"으로 설정됩니다.
            pyeong: 0, // 공간의 평수 정보를 저장할 숫자. 기본값은 0으로 설정됩니다.
            naver: "", // 네이버에서 제공하는 특정 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
            spec: {
              room: 0, // 방의 개수를 나타내는 숫자. 기본값은 0으로 설정됩니다.
              bathroom: 0, // 화장실의 개수를 나타내는 숫자. 기본값은 0으로 설정됩니다.
              valcony: false, // 발코니 확장 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
            },
            resident: {
              living: false, // 현재 거주 중인지 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
              expected: new Date(1800, 0, 1), // 입주 예정일을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
            },
            partial: {
              boo: false, // 부분 리모델링 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
              pyeong: 0, // 부분 리모델링의 평수를 나타내는 숫자. 기본값은 0으로 설정됩니다.
              detail: "", // 리모델링에 대한 추가 세부사항을 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
            },
          },
          etc: {
            comment: "", // 고객의 추가 요청 사항을 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
            channel: "", // 문의 채널(인터넷 검색, 지인 소개 등)을 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
          },
        },
        analytics: {
          response: {
            status: "응대중", // 고객 문의에 대한 응대 상태를 나타내는 문자열. 기본값은 "응대중"으로 설정됩니다.
            action: "1차 응대 예정", // 응대 후 취할 조치를 나타내는 문자열. 기본값은 "1차 응대 예정"으로 설정됩니다.
            outreason: [], // 문의 종료 사유를 나타내는 문자열 배열. 기본값은 빈 배열로 설정됩니다.
            kakao: false, // 카카오톡 등록 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
            service: {
              serid: "s2011_aa02s", // 서비스 ID를 나타내는 문자열. 기본값은 "s2011_aa02s"로 설정됩니다.
              xValue: "B", // 서비스의 세부 카테고리를 나타내는 문자열. 기본값은 "B"로 설정됩니다.
              online: false, // 온라인 서비스 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
            },
            designers: [], // 관련된 디자이너들의 ID를 저장하는 배열. 기본값은 빈 배열로 설정됩니다.
            priority: "하", // 문의의 우선순위를 나타내는 문자열. 기본값은 "하"로 설정됩니다.
            possible: "낮음", // 성공 가능성을 나타내는 문자열. 기본값은 "낮음"으로 설정됩니다.
            target: "해당 없음", // 타겟 여부를 나타내는 문자열. 기본값은 "해당 없음"으로 설정됩니다.
            memo: "", // 추가 메모를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
          },
          date: {
            call: {
              next: new Date(1800, 0, 1), // 다음 전화 통화 일정을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
              history: [], // 이전 통화 기록을 저장하는 배열. 기본값은 빈 배열로 설정됩니다.
              recommend: new Date(1800, 0, 1), // 추천 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
            },
            space: {
              precheck: new Date(1800, 0, 1), // 사전 확인 일정을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
              empty: new Date(1800, 0, 1), // 공간이 비어있는 시점을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
              movein: new Date(1800, 0, 1), // 입주 일정을 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
            },
            calendar: {
              call: {
                mother: "clientCalendar", // 전화 통화 일정을 관리하는 주체를 나타내는 문자열. "clientCalendar"로 설정됩니다.
                id: "", // 전화 통화 일정과 연결된 ID를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
              },
              precheck: {
                mother: "clientCalendar", // 사전 확인 일정을 관리하는 주체를 나타내는 문자열. "clientCalendar"로 설정됩니다.
                id: "", // 사전 확인 일정과 연결된 ID를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
              },
              empty: {
                mother: "clientCalendar", // 공간이 비어있는 일정을 관리하는 주체를 나타내는 문자열. "clientCalendar"로 설정됩니다.
                id: "", // 공간 비어있음 일정과 연결된 ID를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
              },
              movein: {
                mother: "clientCalendar", // 입주 일정을 관리하는 주체를 나타내는 문자열. "clientCalendar"로 설정됩니다.
                id: "", // 입주 일정과 연결된 ID를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
              },
            },
          },
          picture: {
            space: {
              boo: false, // 공간 관련 사진이 제출되었는지 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
              file: [], // 공간 관련 사진 파일 목록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
            },
            prefer: {
              boo: false, // 선호도 관련 사진이 제출되었는지 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
              file: [], // 선호도 관련 사진 파일 목록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
            },
          },
          proposal: [], // 제안서 목록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
          session: [] // 세션 기록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
        },
      };
    } else if (subject === "analytics.date.history") {
      // 주어진 subject가 "analytics.date.history"일 경우
      dummy = {
        date: new Date(1800, 0, 1), // 통화 기록의 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        who: "", // 통화한 사람의 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
      };
    } else if (subject === "analytics.picture.space.file") {
      // 주어진 subject가 "analytics.picture.space.file"일 경우
      dummy = {
        date: new Date(1800, 0, 1), // 사진이 제출된 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        confirm: [], // 사진 제출 확인 기록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
        folderId: "" // 사진이 저장된 폴더 ID를 나타내는 문자열. 기본값은 빈 문자열로 설정됩니다.
      };
    } else if (subject === "analytics.picture.prefer.file") {
      // 주어진 subject가 "analytics.picture.prefer.file"일 경우
      dummy = {
        date: new Date(1800, 0, 1), // 선호도 사진이 제출된 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        confirm: [], // 선호도 사진 제출 확인 기록을 저장할 배열. 기본값은 빈 배열로 설정됩니다.
        folderId: "" // 선호도 사진이 저장된 폴더 ID를 나타내는 문자열. 기본값은 빈 문자열로 설정됩니다.
      };
    } else if (subject === "analytics.picture.space.file.confirm") {
      // 주어진 subject가 "analytics.picture.space.file.confirm"일 경우
      dummy = {
        date: new Date(1800, 0, 1), // 공간 사진 제출 확인 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        who: "", // 확인한 사람의 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
      };
    } else if (subject === "analytics.picture.prefer.file.confirm") {
      // 주어진 subject가 "analytics.picture.prefer.file.confirm"일 경우
      dummy = {
        date: new Date(1800, 0, 1), // 선호도 사진 제출 확인 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        who: "", // 확인한 사람의 정보를 저장할 문자열. 기본값은 빈 문자열로 설정됩니다.
      };
    } else if (subject === "analytics.proposal") {
      // 주어진 subject가 "analytics.proposal"일 경우
      dummy = {
        proid: "", // 제안서 ID를 나타내는 문자열. 기본값은 빈 문자열로 설정됩니다.
        date: new Date(1800, 0, 1), // 제안서 제출 날짜를 나타내는 Date 객체. 기본값은 1800-01-01로 설정됩니다.
        contract: false, // 계약 여부를 나타내는 Boolean 값. 기본값은 false로 설정됩니다.
      };
    }
    return dummy; // 주어진 subject에 해당하는 기본 구조체를 반환합니다.
  }
};

/**
 * @class Address
 * @description 주소 데이터를 관리하는 클래스입니다. 주어진 문자열을 기반으로 주소 정보를 초기화하고, 이를 변환하는 기능을 제공합니다.
 */
class Address {
  /**
   * @constructor
   * @param {string} rawString - 주소를 나타내는 원본 문자열입니다.
   * @description 생성자는 주소의 원본 문자열을 받아 내부 속성에 저장합니다.
   */
  constructor(rawString) {
    this.raw = rawString; // 원본 주소 문자열을 raw 속성에 저장합니다.
    this.value = rawString; // 원본 주소 문자열을 value 속성에 저장합니다. 이는 변환된 값을 저장하기 위해 사용됩니다.
  }

  /**
   * @method toNormal
   * @description Address 객체의 값을 일반 문자열 형태로 반환합니다.
   * @returns {string} 주소 문자열을 반환합니다.
   */
  toNormal() {
    return this.value; // 변환된 주소 값을 반환합니다. 이 경우 변환 작업 없이 그대로 반환됩니다.
  }
}

/**
 * @class DateParse
 * Date 클래스를 확장하여 날짜 처리 기능을 제공하는 클래스입니다.
 * 문자열 형식의 날짜를 Date 객체로 변환하거나, Date 객체를 다양한 형식으로 변환할 수 있습니다.
 */
class DateParse extends Date {

  /**
   * @constructor
   * 주어진 dateObject를 Date 객체로 변환하여 초기화합니다.
   * 문자열 형식의 날짜가 주어진 경우, 해당 문자열을 분석하여 Date 객체로 변환합니다.
   * @param {string|Date} dateObject - 변환할 날짜 문자열 또는 Date 객체
   * @throws {Error} 유효하지 않은 날짜 형식이 주어진 경우 예외를 발생시킵니다.
   */
  constructor(dateObject) {
    // 임시 배열 변수를 선언합니다.
    let tempArr0, tempArr1, tempArr2;

    // dateObject가 문자열인 경우
    if (typeof dateObject === "string") {
      // 날짜 문자열이 "YYYY-MM-DD HH:MM:SS" 형식인 경우
      if (dateObject.length === 19) {
        // 날짜와 시간을 분리하여 tempArr0에 저장합니다.
        tempArr0 = dateObject.split(" ");
        // 날짜 부분을 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = tempArr0[0].split("-");
        // 시간 부분을 ":"로 분리하여 tempArr2에 저장합니다.
        tempArr2 = tempArr0[1].split(":");
        // 분리된 연, 월, 일, 시, 분, 초 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2]), 
          Number(tempArr2[0]), 
          Number(tempArr2[1]), 
          Number(tempArr2[2])
        ));
      } 
      // 날짜 문자열이 "YYYY-MM-DD" 형식인 경우
      else if (dateObject.length === 10) {
        // 날짜를 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = dateObject.split("-");
        // 분리된 연, 월, 일 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2])
        ));
      } 
      // 유효하지 않은 날짜 형식인 경우
      else {
        // 예외를 발생시킵니다.
        throw new Error("invalid date object");
      }
    } 
    // dateObject가 문자열이 아닌 경우
    else {
      // dateObject를 ISO 문자열로 변환한 후 Date 객체로 초기화합니다.
      super(dateObject.toISOString());
    }
  }

  /**
   * @method zeroAddition
   * 숫자가 10보다 작은 경우 앞에 0을 추가하여 2자리 문자열로 반환합니다.
   * @param {number} number - 2자리로 변환할 숫자
   * @returns {string} 2자리 숫자 문자열
   */
  static zeroAddition(number) {
    // 숫자가 10보다 큰 경우 그대로 문자열로 반환합니다.
    if (number > 9) {
      return String(number);
    } 
    // 숫자가 10보다 작은 경우 앞에 0을 추가하여 문자열로 반환합니다.
    else {
      return '0' + String(number);
    }
  }

  /**
   * @method toString
   * Date 객체를 "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
   * @param {boolean} [detail=false] - 시간 정보까지 포함할지 여부
   * @returns {string} 변환된 날짜 문자열
   */
  toString(detail = false) {
    // 연도, 월, 일, 시, 분, 초 정보를 각각 추출합니다.
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();

    // detail이 true인 경우 "YYYY-MM-DD HH:MM:SS" 형식으로 변환합니다.
    if (detail) {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일, 시, 분, 초를 모두 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day) + " " + 
          DateParse.zeroAddition(hours) + ":" + 
          DateParse.zeroAddition(minutes) + ":" + 
          DateParse.zeroAddition(seconds)
        );
      }
    } 
    // detail이 false인 경우 "YYYY-MM-DD" 형식으로 변환합니다.
    else {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일만 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day)
        );
      }
    }
  }

  /**
   * @method toNormal
   * DateParse 객체를 일반 Date 객체로 변환합니다.
   * @returns {Date} 변환된 Date 객체
   */
  toNormal() {
    // 현재 객체의 ISO 문자열 표현을 사용하여 새로운 Date 객체를 반환합니다.
    return new Date(this.toISOString());
  }

  /**
   * @method toSixString
   * Date 객체를 "YYMMDD" 형식의 6자리 문자열로 변환합니다.
   * @returns {string} 변환된 6자리 날짜 문자열
   */
  toSixString() {
    // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환한 후, 앞 두 자리를 제외한 "YYMMDD" 형식으로 잘라서 반환합니다.
    let date = this.toString(false);
    return (date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10));
  }

}

/**
 * @class Menu
 * @extends String
 * @description 주어진 값들 중 하나 또는 여러 개를 선택하여 관리하는 클래스입니다. Enum과 유사한 역할을 하며, 단일 선택 또는 다중 선택 모드를 지원합니다.
 */
class Menu extends String {

  /**
   * @constructor
   * @param {string|string[]} value - 초기 값 또는 값들의 배열입니다.
   * @param {string[]} items - 선택 가능한 값들의 배열입니다.
   * @param {boolean} [multiple=false] - 다중 선택 모드 여부를 지정합니다. 기본값은 false입니다.
   * @description 주어진 값이 유효한지 검사하고, 유효하다면 해당 값을 설정합니다. 다중 선택 모드인 경우, 유효한 값들만 필터링하여 저장합니다.
   */
  constructor(value, items, multiple = false) {
    // value가 배열인 경우 빈 문자열로 초기화하고, 그렇지 않으면 해당 값을 상위 클래스(String)로 전달하여 초기화합니다.
    if (Array.isArray(value)) {
      super(''); // 다중 선택 모드에서 상위 클래스(String)를 빈 문자열로 초기화합니다.
    } else {
      super(value); // 단일 선택 모드에서 상위 클래스(String)를 주어진 값으로 초기화합니다.
    }

    this.value = null; // 단일 선택된 값을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.values = null; // 다중 선택된 값들을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.items = items; // 선택 가능한 값들의 목록을 items 속성에 저장합니다.

    let temp; // 임시 배열을 선언합니다. 다중 선택 모드에서 사용됩니다.

    // 단일 선택 모드인 경우
    if (!multiple) {
      // 주어진 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
      if (items.includes(value)) {
        this.value = value; // 포함되어 있다면 해당 값을 value 속성에 저장합니다.
      } else {
        this.value = "알 수 없음"; // 포함되어 있지 않다면 "알 수 없음"을 value 속성에 저장합니다.
      }
    }
    // 다중 선택 모드인 경우
    else {
      temp = []; // 임시 배열을 빈 배열로 초기화합니다.
      for (let i of value) { // 주어진 값 배열에서 각 값을 반복합니다.
        if (items.includes(i)) { // 각 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
          temp.push(i); // 포함되어 있다면 임시 배열에 추가합니다.
        }
      }
      this.values = temp; // 필터링된 값을 values 속성에 저장합니다.
    }
  }

  /**
   * @method toNormal
   * @description 현재 선택된 값을 반환합니다. 단일 선택 모드인 경우 단일 값을 반환하고, 다중 선택 모드인 경우 선택된 값들의 배열을 반환합니다.
   * @returns {string|string[]} 선택된 값 또는 값들의 배열을 반환합니다.
   */
  toNormal() {
    if (this.values === null) { // 다중 선택된 값이 없는 경우 (단일 선택 모드)
      return this.value; // 단일 값을 반환합니다.
    } else {
      return this.values; // 다중 선택된 값들의 배열을 반환합니다.
    }
  }
  
}

/**
 * @class Client
 * @description 고객의 JSON 데이터를 기반으로 고객 객체를 생성하는 클래스입니다. 이 클래스는 다양한 메서드를 통해 고객의 데이터를 관리하고 변환할 수 있습니다.
 */
class Client {

  /**
   * @constructor
   * @description 주어진 JSON 데이터를 사용하여 Client 객체를 초기화합니다.
   * @param {Object} json - 고객의 JSON 데이터입니다.
   */
  constructor(json) {
    /**
     * @property {string} name - 고객의 이름입니다.
     */
    this.name = json.name; // 주어진 JSON에서 고객의 이름을 가져와 name 속성에 저장합니다.

    /**
     * @property {string} phone - 고객의 전화번호입니다.
     */
    this.phone = json.phone; // 주어진 JSON에서 고객의 전화번호를 가져와 phone 속성에 저장합니다.

    /**
     * @property {string} email - 고객의 이메일 주소입니다.
     */
    this.email = json.email; // 주어진 JSON에서 고객의 이메일을 가져와 email 속성에 저장합니다.

    /**
     * @property {string} cliid - 유효성 검사를 거친 고객 ID입니다.
     */
    this.cliid = this.#validateClientId(json.cliid); // 고객 ID의 유효성을 검사한 후 cliid 속성에 저장합니다.

    /**
     * @property {Array} requests - 고객의 여러 요청 사항(requests)입니다.
     */
    this.requests = this.#requestsMaker(json.requests); // 주어진 요청 사항들을 처리하여 requests 속성에 저장합니다.
  }

  /**
   * @method #validateClientId
   * @description 고객 ID의 형식이 유효한지 검사합니다. 유효하지 않으면 오류를 발생시킵니다.
   * @param {string} rawId - 검증할 고객 ID입니다.
   * @returns {string} 유효한 고객 ID를 반환합니다.
   * @throws {Error} ID가 유효하지 않을 경우 오류를 발생시킵니다.
   */
  #validateClientId(rawId) {
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      // 고객 ID는 'c'로 시작해야 하며, 길이가 정확히 11이어야 합니다.
      throw new Error("invalid client id"); // 유효하지 않은 ID일 경우 오류를 발생시킵니다.
    }
    return rawId; // 유효한 ID일 경우 그대로 반환합니다.
  }

  /**
   * @method latestRequest
   * @description 고객의 가장 최근 요청 사항을 반환합니다.
   * @returns {Object} 고객의 가장 최근 요청 사항(request)입니다.
   */
  latestRequest() {
    return this.requests[0]; // 요청 사항 배열의 첫 번째 요소, 즉 가장 최근 요청을 반환합니다.
  }

  /**
   * @method toJson
   * @description 현재의 Client 객체를 JSON 형식으로 변환하여 반환합니다.
   * @returns {Object} JSON 형식의 고객 데이터를 반환합니다.
   */
  toJson() {
    return {
      name: this.name, // 고객의 이름을 JSON으로 변환합니다.
      phone: this.phone, // 고객의 전화번호를 JSON으로 변환합니다.
      email: this.email, // 고객의 이메일을 JSON으로 변환합니다.
      cliid: this.cliid, // 유효한 고객 ID를 JSON으로 변환합니다.
      requests: this.requests.toNormal(), // 요청 사항들을 'Normal' 형태로 변환하여 JSON으로 반환합니다.
    };
  }

  /**
   * @method toNormal
   * @description toJson 메서드와 동일하게 JSON 형식으로 변환합니다.
   * @returns {Object} JSON 형식의 고객 데이터를 반환합니다.
   */
  toNormal() {
    return this.toJson(); // toJson 메서드를 호출하여 JSON 형식의 데이터를 반환합니다.
  }

  /**
   * @method toString
   * @description 현재의 Client 객체를 JSON 문자열로 변환하여 반환합니다.
   * @returns {string} JSON 형식의 문자열을 반환합니다.
   */
  toString() {
    return JSON.stringify(this.toJson(), null, 2); // JSON 데이터를 문자열로 변환하며, 들여쓰기 포함하여 포맷팅합니다.
  }

  /**
   * @method toDeath
   * @description toString 메서드와 동일하게 JSON 문자열로 변환하여 반환합니다.
   * @returns {string} JSON 형식의 문자열을 반환합니다.
   */
  toDeath() {
    return this.toString(); // toString 메서드를 호출하여 JSON 문자열을 반환합니다.
  }

  /**
   * @method stringify
   * @description toString 메서드와 동일하게 JSON 문자열로 변환하여 반환합니다.
   * @returns {string} JSON 형식의 문자열을 반환합니다.
   */
  stringify() {
    return this.toString(); // toString 메서드를 호출하여 JSON 문자열을 반환합니다.
  }

  /**
   * @method returnPyeongArr
   * @description 고객의 요청 사항 중 공간의 평수를 배열로 반환합니다.
   * @returns {Array<number>} 평수 값들이 담긴 배열을 반환합니다.
   */
  returnPyeongArr() {
    let pyeongArr; // 평수 값을 저장할 배열을 선언합니다.
    pyeongArr = []; // 배열을 초기화합니다.
    for (let obj of this.requests) {
      // 모든 요청 사항(requests)을 순회하면서
      pyeongArr.push(obj.request.space.pyeong.value); // 각 요청 사항의 평수 값을 배열에 추가합니다.
    }
    return pyeongArr; // 평수 값들이 담긴 배열을 반환합니다.
  }

  /**
   * @method #requestsMaker
   * @memberof Client
   * @description 주어진 요청 사항 배열(requests)을 처리하여 Request 인스턴스 배열로 변환합니다.
   * @param {Array} requests - 고객의 요청 사항들을 담고 있는 배열입니다.
   * @returns {Array} Request 객체들로 이루어진 배열을 반환합니다.
   */
  #requestsMaker(requests) {
    /**
     * @property {Array} result - Request 객체들이 담긴 배열을 초기화합니다.
     */
    let result = new this.#Requests(); 
    // 'result'라는 변수에 새로운 Requests 배열 객체를 생성하여 할당합니다.
    // Requests 클래스는 Client 클래스 내부에서 정의된 배열을 확장한 클래스입니다.

    /**
     * @property {Object} requestInstance - 각 요청 사항을 처리하여 생성되는 Request 인스턴스를 저장하는 변수입니다.
     */
    let requestInstance;
    // 각 요청 사항(request)을 처리하여 생성된 Request 인스턴스를 저장할 변수를 선언합니다.

    // 주어진 요청 사항 배열(requests)을 순회하면서 각 요청 사항을 처리합니다.
    for (let i of requests) {
        requestInstance = new this.#Request(i); 
        // 현재 순회 중인 요청 사항(i)을 기반으로 새로운 Request 인스턴스를 생성하여 requestInstance에 저장합니다.
        result.push(requestInstance); 
        // 생성된 Request 인스턴스를 result 배열에 추가합니다.
    }

    // 모든 요청 사항이 처리된 후, Request 인스턴스들로 구성된 result 배열을 반환합니다.
    return result; 
  }

  /**
   * @class Client.#Request
   * @description 고객의 요청 사항(request) 데이터를 처리하고 관리하는 내부 클래스입니다. 이 클래스는 Array를 확장하여 요청 데이터와 분석 데이터를 함께 관리합니다.
   * @extends Array
   */
  #Request = class extends Array {
    
    /**
     * @constructor
     * @description 주어진 요청 데이터를 기반으로 Request 객체를 초기화합니다.
     * @param {Object} _request - 고객의 요청 데이터를 포함한 객체입니다.
     */
    constructor(_request) {
      super(); // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

      /**
       * @property {Object} request - 요청 데이터의 세부 정보를 담고 있는 객체입니다.
       */
      const { request, analytics, proposal } = _request;
      // 주어진 _request 객체에서 request, analytics, proposal 데이터를 구조 분해 할당을 통해 가져옵니다.

      this.request = new this.#WebRequest(request); 
      // WebRequest 클래스를 사용하여 request 데이터를 처리하고, 이를 this.request에 저장합니다.

      this.analytics = new this.#HomeLiaisonAnalytics(analytics); 
      // HomeLiaisonAnalytics 클래스를 사용하여 analytics 데이터를 처리하고, 이를 this.analytics에 저장합니다.

      this.push(this.request); 
      // 처리된 request 데이터를 현재 객체(Array)에 추가합니다.

      this.push(this.analytics); 
      // 처리된 analytics 데이터를 현재 객체(Array)에 추가합니다.
    }

    /**
     * @property {Object} space - 요청 데이터에서 공간 정보(space)를 반환합니다.
     * @returns {Object} 공간 정보 데이터를 반환합니다.
     */
    get space() {
      return this.request.space; 
      // request 객체의 space 데이터를 반환합니다.
    }

    /**
     * @method toNormal
     * @description 현재 Request 객체를 JSON 형식으로 변환하여 반환합니다.
     * @returns {Object} JSON 형식의 요청 데이터를 반환합니다.
     */
    toNormal() {
      let obj = {}; 
      // JSON 데이터를 담을 빈 객체를 생성합니다.

      obj.request = this.request.toNormal(); 
      // request 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

      obj.analytics = this.analytics.toNormal(); 
      // analytics 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

      return obj; 
      // 변환된 JSON 데이터를 반환합니다.
    }

    /**
     * @class Client.#Request.#HomeLiaisonAnalytics
     * @description 고객의 요청에 대한 분석 데이터를 처리하고 관리하는 내부 클래스입니다.
     */
    #HomeLiaisonAnalytics = class {

      /**
       * @constructor
       * @description 주어진 분석 데이터를 기반으로 HomeLiaisonAnalytics 객체를 초기화합니다.
       * @param {Object} analytics - 요청에 대한 분석 데이터를 포함한 객체입니다.
       */
      constructor(analytics) {
        /**
         * @property {Client.#Request.#HomeLiaisonAnalytics.#Response} response - 응답 상태 데이터를 관리하는 객체입니다.
         */
        this.response = new this.#Response(analytics.response);
        // 응답 상태 데이터를 처리하여 Response 객체로 저장합니다.

        /**
         * @property {Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics} date - 날짜 관련 데이터를 관리하는 객체입니다.
         */
        this.date = new this.#DateAnalytics(analytics.date);
        // 날짜 관련 데이터를 처리하여 DateAnalytics 객체로 저장합니다.

        /**
         * @property {Client.#Request.#HomeLiaisonAnalytics.#Picture} picture - 사진 데이터를 관리하는 객체입니다.
         */
        this.picture = new this.#Picture(analytics.picture);
        // 사진 데이터를 처리하여 Picture 객체로 저장합니다.

        /**
         * @property {Client.#Request.#HomeLiaisonAnalytics.#Proposal} proposal - 제안 데이터를 관리하는 객체입니다.
         */
        this.proposal = new this.#Proposal(analytics.proposal);
        // 제안 데이터를 처리하여 Proposal 객체로 저장합니다.

        /**
         * @property {Client.#Request.#HomeLiaisonAnalytics.#Session} session - 세션 데이터를 관리하는 객체입니다.
         */
        this.session = new this.#Session(analytics.session);
        // 세션 데이터를 처리하여 Session 객체로 저장합니다.
      }

      /**
       * @method toNormal
       * @description HomeLiaisonAnalytics 객체를 JSON 형식으로 변환하여 반환합니다.
       * @returns {Object} JSON 형식의 분석 데이터를 반환합니다.
       */
      toNormal() {
        let obj = {};
        // JSON 데이터를 담을 빈 객체를 생성합니다.

        obj.response = this.response.toNormal();
        // response 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.date = this.date.toNormal();
        // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.picture = this.picture.toNormal();
        // picture 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.proposal = this.proposal.toNormal();
        // proposal 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.session = this.session.toNormal();
        // session 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        return obj;
        // 변환된 JSON 데이터를 반환합니다.
      }

      /**
       * @class Client.#Request.#HomeLiaisonAnalytics.#Session
       * @description 세션 데이터를 관리하는 내부 클래스입니다.
       * @extends Array
       */
      #Session = class extends Array {

        /**
         * @constructor
         * @description 주어진 세션 데이터를 기반으로 Session 객체를 초기화합니다.
         * @param {Array} json - 세션 데이터 배열입니다.
         */
        constructor(json) {
          super();
          // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

          for (let i of json) {
            this.push(i);
            // 각 세션 데이터를 순회하며 배열에 추가합니다.
          }
        }

        /**
         * @method toNormal
         * @description Session 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Array} JSON 형식의 세션 데이터를 반환합니다.
         */
        toNormal() {
          let arr = [];
          // JSON 데이터를 담을 빈 배열을 생성합니다.

          for (let i of this) {
            arr.push(i);
            // 각 세션 데이터를 배열에 추가합니다.
          }

          return arr;
          // 변환된 JSON 배열을 반환합니다.
        }
      }

      /**
       * @class Client.#Request.#HomeLiaisonAnalytics.#Response
       * @description 응답 상태 데이터를 관리하는 내부 클래스입니다.
       */
      #Response = class {

        /**
         * @constructor
         * @description 주어진 응답 데이터를 기반으로 Response 객체를 초기화합니다.
         * @param {Object} response - 응답 데이터를 포함한 객체입니다.
         */
        constructor(response) {
          this.status = new Menu(response.status, [
            "드랍", "진행", "응대중", "장기"
          ], false);
          // 상태 데이터를 처리하여 Menu 객체로 저장합니다.

          this.action = new Menu(response.action, [
            "1차 응대 예정", "1차 응대 후 대기", "스타일 체크 대기", 
            "제안 발송 예정", "제안 피드백 예정", "피드백 부재중", 
            "제안 피드백 완료", "부재중 알림 발송", "상세 설문 대기", 
            "부재중 제안 발송", "피드백과 응대 예정", "자동 피드백 부재중", 
            "피드백과 응대 완료", "디자이너 선택", "해당 없음"
          ], false);
          // 조치 데이터를 처리하여 Menu 객체로 저장합니다.

          this.outreason = new Menu(response.outreason, [
            "연결 안 됨", "가벼운 문의", "고객 미션 미응답", 
            "직접 진행", "고객 상황 변동", "가족 의견 불일치", 
            "기간 임박", "장기 고객", "시공만 필요", 
            "거주중 시공", "일단 견적 먼저", "시공 문제", 
            "서비스 불일치", "타사 계약", "지역 이슈", 
            "총 예산 문제", "디자인비 문제", "프로세스 문제", 
            "디자이너 부족", "제안서 매력도"
          ], true);
          // 종료 사유 데이터를 처리하여 Menu 객체로 저장합니다.

          this.kakao = response.kakao;
          // 카카오톡 관련 응답 데이터를 저장합니다.

          this.service = new this.#ProjectService(response.service);
          // 서비스 데이터를 처리하여 ProjectService 객체로 저장합니다.

          this.designers = new this.#PredictDesigners(response.designers);
          // 디자이너 관련 데이터를 처리하여 PredictDesigners 객체로 저장합니다.

          this.priority = new Menu(response.priority, [
            "상", "중", "하"
          ], false);
          // 우선순위 데이터를 처리하여 Menu 객체로 저장합니다.

          this.possible = new Menu(response.possible, [
            "높음", "애매", "낮음"
          ], false);
          // 가능성 데이터를 처리하여 Menu 객체로 저장합니다.

          this.target = new Menu(response.target, [
            "타겟", "애매", "해당 없음"
          ], false);
          // 타겟 여부 데이터를 처리하여 Menu 객체로 저장합니다.

          this.memo = response.memo;
          // 메모 데이터를 저장합니다.
        }

        /**
         * @method toNormal
         * @description Response 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Object} JSON 형식의 응답 데이터를 반환합니다.
         */
        toNormal = () => {
          let obj = {};
          // JSON 데이터를 담을 빈 객체를 생성합니다.

          obj.status = this.status.toNormal();
          // status 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.action = this.action.toNormal();
          // action 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.outreason = this.outreason.toNormal();
          // outreason 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.kakao = this.kakao;
          // kakao 데이터를 obj 객체에 저장합니다.

          obj.service = this.service.toNormal();
          // service 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.designers = this.designers.toNormal();
          // designers 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.priority = this.priority.toNormal();
          // priority 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.possible = this.possible.toNormal();
          // possible 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.target = this.target.toNormal();
          // target 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.memo = this.memo;
          // memo 데이터를 obj 객체에 저장합니다.

          return obj;
          // 변환된 JSON 데이터를 반환합니다.
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#Response.#PredictDesigners
         * @description 예측된 디자이너 데이터를 관리하는 내부 클래스입니다.
         * @extends Array
         */
        #PredictDesigners = class extends Array {

          /**
           * @constructor
           * @description 주어진 디자이너 데이터를 기반으로 PredictDesigners 객체를 초기화합니다.
           * @param {Array} json - 디자이너 데이터 배열입니다.
           */
          constructor(json) {
            super();
            // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

            for (let i of json) {
              this.push(i);
              // 각 디자이너 데이터를 순회하며 배열에 추가합니다.
            }
          }

          /**
           * @method toNormal
           * @description PredictDesigners 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Array} JSON 형식의 디자이너 데이터를 반환합니다.
           */
          toNormal() {
            let arr = [];
            // JSON 데이터를 담을 빈 배열을 생성합니다.

            for (let i of this) {
              arr.push(i);
              // 각 디자이너 데이터를 배열에 추가합니다.
            }

            return arr;
            // 변환된 JSON 배열을 반환합니다.
          }
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#Response.#ProjectService
         * @description 프로젝트 서비스 데이터를 관리하는 내부 클래스입니다.
         */
        #ProjectService = class {

          /**
           * @constructor
           * @description 주어진 프로젝트 서비스 데이터를 기반으로 ProjectService 객체를 초기화합니다.
           * @param {Object} json - 프로젝트 서비스 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.serid = json.serid;
            // 서비스 ID 데이터를 저장합니다.

            this.xValue = json.xValue;
            // xValue 데이터를 저장합니다.

            this.online = Boolean(json.online);
            // 온라인 여부를 Boolean 값으로 변환하여 저장합니다.
          }

          /**
           * @method toNormal
           * @description ProjectService 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 프로젝트 서비스 데이터를 반환합니다.
           */
          toNormal() {
            let obj = {};
            // JSON 데이터를 담을 빈 객체를 생성합니다.

            obj.serid = this.serid;
            // serid 데이터를 obj 객체에 저장합니다.

            obj.xValue = this.xValue;
            // xValue 데이터를 obj 객체에 저장합니다.

            obj.online = this.online;
            // online 데이터를 obj 객체에 저장합니다.

            return obj;
            // 변환된 JSON 데이터를 반환합니다.
          }
        }

      }

      /**
       * @class Client.#Request.#HomeLiaisonAnalytics.#Proposal
       * @description 제안 데이터를 관리하는 내부 클래스입니다.
       * @extends Array
       */
      #Proposal = class extends Array {

        /**
         * @constructor
         * @description 주어진 제안 데이터를 기반으로 Proposal 객체를 초기화합니다.
         * @param {Array} json - 제안 데이터 배열입니다.
         */
        constructor(json) {
          super();
          // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

          for (let i of json) {
            this.push(new this.#ProposalDetail(i));
            // 각 제안 데이터를 ProposalDetail 객체로 변환하여 배열에 추가합니다.
          }
        }

        /**
         * @method toNormal
         * @description Proposal 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Array} JSON 형식의 제안 데이터를 반환합니다.
         */
        toNormal() {
          let arr = [];
          // JSON 데이터를 담을 빈 배열을 생성합니다.

          for (let i of this) {
            arr.push(i.toNormal());
            // 각 제안 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
          }

          return arr;
          // 변환된 JSON 배열을 반환합니다.
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#Proposal.#ProposalDetail
         * @description 제안 세부 정보를 관리하는 내부 클래스입니다.
         */
        #ProposalDetail = class {

          /**
           * @constructor
           * @description 주어진 제안 세부 정보를 기반으로 ProposalDetail 객체를 초기화합니다.
           * @param {Object} json - 제안 세부 정보를 포함한 객체입니다.
           */
          constructor(json) {
            this.proid = json.proid;
            // 제안 ID를 저장합니다.

            this.date = new DateParse(json.date);
            // 제안 날짜를 DateParse 객체로 변환하여 저장합니다.

            this.contract = json.contract;
            // 계약 여부를 저장합니다.
          }

          /**
           * @method toNormal
           * @description ProposalDetail 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 제안 세부 정보를 반환합니다.
           */
          toNormal() {
            let obj = {};
            // JSON 데이터를 담을 빈 객체를 생성합니다.

            obj.proid = this.proid;
            // proid 데이터를 obj 객체에 저장합니다.

            obj.date = this.date.toNormal();
            // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

            obj.contract = this.contract;
            // contract 데이터를 obj 객체에 저장합니다.

            return obj;
            // 변환된 JSON 데이터를 반환합니다.
          }
        }
      }

      /**
       * @class Client.#Request.#HomeLiaisonAnalytics.#Picture
       * @description 사진 데이터를 관리하는 내부 클래스입니다.
       */
      #Picture = class {

        /**
         * @constructor
         * @description 주어진 사진 데이터를 기반으로 Picture 객체를 초기화합니다.
         * @param {Object} picture - 사진 데이터를 포함한 객체입니다.
         */
        constructor(picture) {
          this.space = new this.#Space(picture.space);
          // 공간 사진 데이터를 처리하여 Space 객체로 저장합니다.

          this.prefer = new this.#Prefer(picture.prefer);
          // 선호도 사진 데이터를 처리하여 Prefer 객체로 저장합니다.
        }

        /**
         * @method toNormal
         * @description Picture 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Object} JSON 형식의 사진 데이터를 반환합니다.
         */
        toNormal() {
          return {
            space: this.space.toNormal(),
            // space 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

            prefer: this.prefer.toNormal(),
            // prefer 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
          };
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Prefer
         * @description 선호도 사진 데이터를 관리하는 내부 클래스입니다.
         */
        #Prefer = class {

          /**
           * @constructor
           * @description 주어진 선호도 사진 데이터를 기반으로 Prefer 객체를 초기화합니다.
           * @param {Object} json - 선호도 사진 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.boo = Boolean(json.boo);
            // 선호도 사진 여부를 Boolean 값으로 변환하여 저장합니다.

            this.file = new this.#PreferPicture(json.file);
            // 선호도 사진 파일 데이터를 처리하여 PreferPicture 객체로 저장합니다.
          }

          /**
           * @method toNormal
           * @description Prefer 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 선호도 사진 데이터를 반환합니다.
           */
          toNormal() {
            return {
              boo: this.boo,
              // boo 데이터를 반환 객체에 저장합니다.

              file: this.file.toNormal(),
              // file 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
            };
          }

          /**
           * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Prefer.#PreferPicture
           * @description 선호도 사진 파일 데이터를 관리하는 내부 클래스입니다.
           * @extends Array
           */
          #PreferPicture = class extends Array {

            /**
             * @constructor
             * @description 주어진 선호도 사진 파일 데이터를 기반으로 PreferPicture 객체를 초기화합니다.
             * @param {Array} json - 선호도 사진 파일 데이터 배열입니다.
             */
            constructor(json) {
              super();
              // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

              for (let i of json) {
                this.push(new this.#PreferPictureDetail(i));
                // 각 선호도 사진 파일 데이터를 PreferPictureDetail 객체로 변환하여 배열에 추가합니다.
              }
            }

            /**
             * @method toNormal
             * @description PreferPicture 객체를 JSON 형식으로 변환하여 반환합니다.
             * @returns {Array} JSON 형식의 선호도 사진 파일 데이터를 반환합니다.
             */
            toNormal() {
              const arr = [];
              // JSON 데이터를 담을 빈 배열을 생성합니다.

              for (let i of this) {
                arr.push(i.toNormal());
                // 각 선호도 사진 파일 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
              }

              return arr;
              // 변환된 JSON 배열을 반환합니다.
            }

            /**
             * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Prefer.#PreferPicture.#PreferPictureDetail
             * @description 선호도 사진 파일의 세부 정보를 관리하는 내부 클래스입니다.
             */
            #PreferPictureDetail = class {

              /**
               * @constructor
               * @description 주어진 선호도 사진 파일의 세부 정보를 기반으로 PreferPictureDetail 객체를 초기화합니다.
               * @param {Object} json - 선호도 사진 파일의 세부 정보를 포함한 객체입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                // 사진 파일 날짜를 DateParse 객체로 변환하여 저장합니다.

                this.confirm = new this.#Confirms(json.confirm);
                // 확인 정보 데이터를 처리하여 Confirms 객체로 저장합니다.

                this.folderId = json.folderId;
                // 폴더 ID를 저장합니다.
              }

              /**
               * @method toNormal
               * @description PreferPictureDetail 객체를 JSON 형식으로 변환하여 반환합니다.
               * @returns {Object} JSON 형식의 선호도 사진 파일 세부 정보를 반환합니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                  confirm: this.confirm.toNormal(),
                  // confirm 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                  folderId: this.folderId,
                  // folderId 데이터를 반환 객체에 저장합니다.
                };
              }

              /**
               * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Prefer.#PreferPicture.#PreferPictureDetail.#Confirms
               * @description 선호도 사진 파일의 확인 정보를 관리하는 내부 클래스입니다.
               * @extends Array
               */
              #Confirms = class extends Array {

                /**
                 * @constructor
                 * @description 주어진 확인 정보를 기반으로 Confirms 객체를 초기화합니다.
                 * @param {Array} json - 확인 정보 배열입니다.
                 */
                constructor(json) {
                  super();
                  // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                    // 각 확인 정보를 Confirm 객체로 변환하여 배열에 추가합니다.
                  }
                }

                /**
                 * @method toNormal
                 * @description Confirms 객체를 JSON 형식으로 변환하여 반환합니다.
                 * @returns {Array} JSON 형식의 확인 정보를 반환합니다.
                 */
                toNormal() {
                  const arr = [];
                  // JSON 데이터를 담을 빈 배열을 생성합니다.

                  for (let i of this) {
                    arr.push(i.toNormal());
                    // 각 확인 정보를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
                  }

                  return arr;
                  // 변환된 JSON 배열을 반환합니다.
                }

                /**
                 * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Prefer.#PreferPicture.#PreferPictureDetail.#Confirms.#Confirm
                 * @description 개별 확인 정보를 관리하는 내부 클래스입니다.
                 */
                #Confirm = class {

                  /**
                   * @constructor
                   * @description 주어진 확인 정보를 기반으로 Confirm 객체를 초기화합니다.
                   * @param {Object} json - 확인 정보를 포함한 객체입니다.
                   */
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    // 확인 날짜를 DateParse 객체로 변환하여 저장합니다.

                    this.who = json.who;
                    // 확인한 사람의 정보를 저장합니다.
                  }

                  /**
                   * @method toNormal
                   * @description Confirm 객체를 JSON 형식으로 변환하여 반환합니다.
                   * @returns {Object} JSON 형식의 확인 정보를 반환합니다.
                   */
                  toNormal() {
                    return {
                      date: this.date.toNormal(),
                      // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                      who: this.who,
                      // who 데이터를 반환 객체에 저장합니다.
                    };
                  }
                };
              };
            };
          };
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Space
         * @description 공간 사진 데이터를 관리하는 내부 클래스입니다.
         */
        #Space = class {

          /**
           * @constructor
           * @description 주어진 공간 사진 데이터를 기반으로 Space 객체를 초기화합니다.
           * @param {Object} json - 공간 사진 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.boo = Boolean(json.boo);
            // 공간 사진 여부를 Boolean 값으로 변환하여 저장합니다.

            this.file = new this.#SpacePicture(json.file);
            // 공간 사진 파일 데이터를 처리하여 SpacePicture 객체로 저장합니다.
          }

          /**
           * @method toNormal
           * @description Space 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 공간 사진 데이터를 반환합니다.
           */
          toNormal() {
            return {
              boo: this.boo,
              // boo 데이터를 반환 객체에 저장합니다.

              file: this.file.toNormal(),
              // file 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
            };
          }

          /**
           * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Space.#SpacePicture
           * @description 공간 사진 파일 데이터를 관리하는 내부 클래스입니다.
           * @extends Array
           */
          #SpacePicture = class extends Array {

            /**
             * @constructor
             * @description 주어진 공간 사진 파일 데이터를 기반으로 SpacePicture 객체를 초기화합니다.
             * @param {Array} json - 공간 사진 파일 데이터 배열입니다.
             */
            constructor(json) {
              super();
              // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

              for (let i of json) {
                this.push(new this.#SpacePictureDetail(i));
                // 각 공간 사진 파일 데이터를 SpacePictureDetail 객체로 변환하여 배열에 추가합니다.
              }
            }

            /**
             * @method toNormal
             * @description SpacePicture 객체를 JSON 형식으로 변환하여 반환합니다.
             * @returns {Array} JSON 형식의 공간 사진 파일 데이터를 반환합니다.
             */
            toNormal() {
              const arr = [];
              // JSON 데이터를 담을 빈 배열을 생성합니다.

              for (let i of this) {
                arr.push(i.toNormal());
                // 각 공간 사진 파일 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
              }

              return arr;
              // 변환된 JSON 배열을 반환합니다.
            }

            /**
             * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Space.#SpacePicture.#SpacePictureDetail
             * @description 공간 사진 파일의 세부 정보를 관리하는 내부 클래스입니다.
             */
            #SpacePictureDetail = class {

              /**
               * @constructor
               * @description 주어진 공간 사진 파일의 세부 정보를 기반으로 SpacePictureDetail 객체를 초기화합니다.
               * @param {Object} json - 공간 사진 파일의 세부 정보를 포함한 객체입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                // 사진 파일 날짜를 DateParse 객체로 변환하여 저장합니다.

                this.confirm = new this.#Confirms(json.confirm);
                // 확인 정보 데이터를 처리하여 Confirms 객체로 저장합니다.

                this.folderId = json.folderId;
                // 폴더 ID를 저장합니다.
              }

              /**
               * @method toNormal
               * @description SpacePictureDetail 객체를 JSON 형식으로 변환하여 반환합니다.
               * @returns {Object} JSON 형식의 공간 사진 파일 세부 정보를 반환합니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                  confirm: this.confirm.toNormal(),
                  // confirm 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                  folderId: this.folderId,
                  // folderId 데이터를 반환 객체에 저장합니다.
                };
              }

              /**
               * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Space.#SpacePicture.#SpacePictureDetail.#Confirms
               * @description 공간 사진 파일의 확인 정보를 관리하는 내부 클래스입니다.
               * @extends Array
               */
              #Confirms = class extends Array {

                /**
                 * @constructor
                 * @description 주어진 확인 정보를 기반으로 Confirms 객체를 초기화합니다.
                 * @param {Array} json - 확인 정보 배열입니다.
                 */
                constructor(json) {
                  super();
                  // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                    // 각 확인 정보를 Confirm 객체로 변환하여 배열에 추가합니다.
                  }
                }

                /**
                 * @method toNormal
                 * @description Confirms 객체를 JSON 형식으로 변환하여 반환합니다.
                 * @returns {Array} JSON 형식의 확인 정보를 반환합니다.
                 */
                toNormal() {
                  const arr = [];
                  // JSON 데이터를 담을 빈 배열을 생성합니다.

                  for (let i of this) {
                    arr.push(i.toNormal());
                    // 각 확인 정보를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
                  }

                  return arr;
                  // 변환된 JSON 배열을 반환합니다.
                }

                /**
                 * @class Client.#Request.#HomeLiaisonAnalytics.#Picture.#Space.#SpacePicture.#SpacePictureDetail.#Confirms.#Confirm
                 * @description 개별 확인 정보를 관리하는 내부 클래스입니다.
                 */
                #Confirm = class {

                  /**
                   * @constructor
                   * @description 주어진 확인 정보를 기반으로 Confirm 객체를 초기화합니다.
                   * @param {Object} json - 확인 정보를 포함한 객체입니다.
                   */
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    // 확인 날짜를 DateParse 객체로 변환하여 저장합니다.

                    this.who = json.who;
                    // 확인한 사람의 정보를 저장합니다.
                  }

                  /**
                   * @method toNormal
                   * @description Confirm 객체를 JSON 형식으로 변환하여 반환합니다.
                   * @returns {Object} JSON 형식의 확인 정보를 반환합니다.
                   */
                  toNormal() {
                    return {
                      date: this.date.toNormal(),
                      // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                      who: this.who,
                      // who 데이터를 반환 객체에 저장합니다.
                    };
                  }
                };
              };
            };
          };
        }

      }

      /**
       * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics
       * @description 날짜 관련 데이터를 관리하는 내부 클래스입니다.
       */
      #DateAnalytics = class {

        /**
         * @constructor
         * @description 주어진 날짜 데이터를 기반으로 DateAnalytics 객체를 초기화합니다.
         * @param {Object} date - 날짜 데이터를 포함한 객체입니다.
         */
        constructor(date) {
          this.call = new this.#DateCall(date.call);
          // 콜 날짜 데이터를 처리하여 DateCall 객체로 저장합니다.

          this.space = new this.#DateSpace(date.space);
          // 공간 날짜 데이터를 처리하여 DateSpace 객체로 저장합니다.

          this.calendar = new this.#DateCalendar(date.calendar);
          // 캘린더 데이터를 처리하여 DateCalendar 객체로 저장합니다.
        }

        /**
         * @method toNormal
         * @description DateAnalytics 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Object} JSON 형식의 날짜 데이터를 반환합니다.
         */
        toNormal() {
          return {
            call: this.call.toNormal(),
            // call 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

            space: this.space.toNormal(),
            // space 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

            calendar: this.calendar.toNormal(),
            // calendar 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
          };
        }

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateCalendar
         * @description 캘린더 데이터를 관리하는 내부 클래스입니다.
         */
        #DateCalendar = class {

          /**
           * @constructor
           * @description 주어진 캘린더 데이터를 기반으로 DateCalendar 객체를 초기화합니다.
           * @param {Object} json - 캘린더 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.call = new this.#Calendar(json.call);
            // 콜 캘린더 데이터를 처리하여 Calendar 객체로 저장합니다.

            this.precheck = new this.#Calendar(json.precheck);
            // 사전 점검 캘린더 데이터를 처리하여 Calendar 객체로 저장합니다.

            this.empty = new this.#Calendar(json.empty);
            // 빈 공간 캘린더 데이터를 처리하여 Calendar 객체로 저장합니다.

            this.movein = new this.#Calendar(json.movein);
            // 입주 캘린더 데이터를 처리하여 Calendar 객체로 저장합니다.
          }

          /**
           * @method toNormal
           * @description DateCalendar 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 캘린더 데이터를 반환합니다.
           */
          toNormal() {
            return {
              call: this.call.toNormal(),
              // call 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              precheck: this.precheck.toNormal(),
              // precheck 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              empty: this.empty.toNormal(),
              // empty 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              movein: this.movein.toNormal(),
              // movein 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
            };
          }

          /**
           * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateCalendar.#Calendar
           * @description 개별 캘린더 항목을 관리하는 내부 클래스입니다.
           */
          #Calendar = class {

            /**
             * @constructor
             * @description 주어진 캘린더 항목 데이터를 기반으로 Calendar 객체를 초기화합니다.
             * @param {Object} json - 캘린더 항목 데이터를 포함한 객체입니다.
             */
            constructor(json) {
              this.mother = json.mother;
              // mother 데이터를 저장합니다.

              this.id = json.id;
              // id 데이터를 저장합니다.
            }

            /**
             * @method toNormal
             * @description Calendar 객체를 JSON 형식으로 변환하여 반환합니다.
             * @returns {Object} JSON 형식의 캘린더 항목 데이터를 반환합니다.
             */
            toNormal() {
              return {
                mother: this.mother,
                // mother 데이터를 반환 객체에 저장합니다.

                id: this.id,
                // id 데이터를 반환 객체에 저장합니다.
              };
            }
          };
        };

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateSpace
         * @description 공간 관련 날짜 데이터를 관리하는 내부 클래스입니다.
         */
        #DateSpace = class {

          /**
           * @constructor
           * @description 주어진 공간 관련 날짜 데이터를 기반으로 DateSpace 객체를 초기화합니다.
           * @param {Object} json - 공간 관련 날짜 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.precheck = new DateParse(json.precheck);
            // 사전 점검 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.

            this.empty = new DateParse(json.empty);
            // 빈 공간 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.

            this.movein = new DateParse(json.movein);
            // 입주 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.
          }

          /**
           * @method toNormal
           * @description DateSpace 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 공간 관련 날짜 데이터를 반환합니다.
           */
          toNormal() {
            return {
              precheck: this.precheck.toNormal(),
              // precheck 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              empty: this.empty.toNormal(),
              // empty 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              movein: this.movein.toNormal(),
              // movein 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
            };
          }
        };

        /**
         * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateCall
         * @description 콜 관련 날짜 데이터를 관리하는 내부 클래스입니다.
         */
        #DateCall = class {

          /**
           * @constructor
           * @description 주어진 콜 관련 날짜 데이터를 기반으로 DateCall 객체를 초기화합니다.
           * @param {Object} json - 콜 관련 날짜 데이터를 포함한 객체입니다.
           */
          constructor(json) {
            this.next = new DateParse(json.next);
            // 다음 콜 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.

            this.history = new this.#DateCallHistory(json.history);
            // 콜 이력 데이터를 처리하여 DateCallHistory 객체로 저장합니다.

            this.recommend = new DateParse(json.recommend);
            // 추천 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.
          }

          /**
           * @method toNormal
           * @description DateCall 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 콜 관련 날짜 데이터를 반환합니다.
           */
          toNormal() {
            return {
              next: this.next.toNormal(),
              // next 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              history: this.history.toNormal(),
              // history 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

              recommend: this.recommend.toNormal(),
              // recommend 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.
            };
          }

          /**
           * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateCall.#DateCallHistory
           * @description 콜 이력 데이터를 관리하는 내부 클래스입니다.
           * @extends Array
           */
          #DateCallHistory = class extends Array {

            /**
             * @constructor
             * @description 주어진 콜 이력 데이터를 기반으로 DateCallHistory 객체를 초기화합니다.
             * @param {Array} json - 콜 이력 데이터 배열입니다.
             */
            constructor(json) {
              super();
              // 부모 클래스(Array)의 생성자를 호출하여 초기화합니다.

              for (let i of json) {
                this.push(new this.#DateCallHistoryFactor(i));
                // 각 콜 이력 데이터를 DateCallHistoryFactor 객체로 변환하여 배열에 추가합니다.
              }
            }

            /**
             * @method toNormal
             * @description DateCallHistory 객체를 JSON 형식으로 변환하여 반환합니다.
             * @returns {Array} JSON 형식의 콜 이력 데이터를 반환합니다.
             */
            toNormal() {
              const arr = [];
              // JSON 데이터를 담을 빈 배열을 생성합니다.

              for (let i of this) {
                arr.push(i.toNormal());
                // 각 콜 이력 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
              }

              return arr;
              // 변환된 JSON 배열을 반환합니다.
            }

            /**
             * @class Client.#Request.#HomeLiaisonAnalytics.#DateAnalytics.#DateCall.#DateCallHistory.#DateCallHistoryFactor
             * @description 개별 콜 이력 항목을 관리하는 내부 클래스입니다.
             */
            #DateCallHistoryFactor = class {

              /**
               * @constructor
               * @description 주어진 콜 이력 항목 데이터를 기반으로 DateCallHistoryFactor 객체를 초기화합니다.
               * @param {Object} json - 콜 이력 항목 데이터를 포함한 객체입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                // 콜 이력 날짜 데이터를 DateParse 객체로 변환하여 저장합니다.

                this.who = json.who;
                // 콜을 수행한 사람의 정보를 저장합니다.
              }

              /**
               * @method toNormal
               * @description DateCallHistoryFactor 객체를 JSON 형식으로 변환하여 반환합니다.
               * @returns {Object} JSON 형식의 콜 이력 항목 데이터를 반환합니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  // date 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 반환합니다.

                  who: this.who,
                  // who 데이터를 반환 객체에 저장합니다.
                };
              }
            };
          };
        };
      };
    }

    /**
     * @class Client.#Request.#WebRequest
     * @description 고객의 요청 데이터를 관리하고 처리하는 내부 클래스입니다.
     */
    #WebRequest = class {
      
      /**
       * @constructor
       * @description 주어진 요청 데이터를 기반으로 WebRequest 객체를 초기화합니다.
       * @param {Object} request - 요청 데이터를 포함한 객체입니다.
       */
      constructor(request) {
        /**
         * @property {DateParse} timeline - 요청이 발생한 시점을 나타내는 객체입니다.
         */
        this.timeline = new DateParse(request.timeline);
        // 주어진 요청 데이터의 timeline을 DateParse 객체로 변환하여 저장합니다.

        /**
         * @property {string} notionId - 노션 ID입니다.
         */
        this.notionId = request.notionId;
        // 주어진 요청 데이터의 notionId를 그대로 저장합니다.

        /**
         * @property {Menu} budget - 예산 정보를 나타내는 객체입니다.
         */
        this.budget = new Menu(request.budget, [
          '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원',
          '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상',
          '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상',
          '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상',
          '5억원 이상', '10억원 이상'
        ], false);
        // 예산 정보를 나타내는 Menu 객체를 생성합니다. 가능한 값들을 배열로 전달하고, 선택 불가능한 값은 false로 설정합니다.

        /**
         * @property {Client.#Request.#WebRequest.#Family} family - 가족 정보를 관리하는 객체입니다.
         */
        this.family = new this.#Family(request.family);
        // 주어진 가족 정보를 처리하여 Family 객체로 저장합니다.

        /**
         * @property {Menu} furniture - 가구 구매 여부를 나타내는 객체입니다.
         */
        this.furniture = new Menu(request.furniture, [
          "재배치", "일부 구매", "전체 구매"
        ], false);
        // 가구 구매 정보를 나타내는 Menu 객체를 생성합니다. 선택 가능한 가구 구매 옵션을 배열로 전달하고, 선택 불가능한 값은 false로 설정합니다.

        /**
         * @property {Client.#Request.#WebRequest.#Space} space - 공간 정보를 관리하는 객체입니다.
         */
        this.space = new this.#Space(request.space);
        // 주어진 공간 정보를 처리하여 Space 객체로 저장합니다.

        /**
         * @property {Object} etc - 기타 정보를 담고 있는 객체입니다.
         */
        this.etc = {};
        this.etc.comment = request.etc.comment;
        // 기타 요청사항(comment)을 etc 객체에 저장합니다.

        this.etc.channel = request.etc.channel;
        // 문의 채널 정보를 etc 객체에 저장합니다.
      }

      /**
       * @method toNormal
       * @description WebRequest 객체를 JSON 형식으로 변환하여 반환합니다.
       * @returns {Object} JSON 형식의 요청 데이터를 반환합니다.
       */
      toNormal() {
        let obj = {};
        // JSON 데이터를 담을 빈 객체를 생성합니다.

        obj.timeline = this.timeline.toNormal();
        // timeline 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.notionId = this.notionId;
        // notionId 데이터를 obj 객체에 저장합니다.

        obj.budget = this.budget.toNormal();
        // budget 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.family = this.family.toNormal();
        // family 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.furniture = this.furniture.toNormal();
        // furniture 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.space = this.space.toNormal();
        // space 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

        obj.etc = this.etc;
        // 기타 데이터를 obj 객체에 저장합니다.

        return obj;
        // 변환된 JSON 데이터를 반환합니다.
      }

      /**
       * @class Client.#Request.#WebRequest.#Family
       * @description 가족 정보를 관리하는 내부 클래스입니다.
       */
      #Family = class {
        
        /**
         * @constructor
         * @description 주어진 가족 정보를 기반으로 Family 객체를 초기화합니다.
         * @param {string} rawString - 가족 구성에 대한 원시 문자열 데이터입니다.
         */
        constructor(rawString) {
          this.raw = rawString;
          // 원시 문자열 데이터를 저장합니다.

          this.value = rawString;
          // 원시 문자열 데이터를 value 속성으로 저장합니다.
        }
        
        /**
         * @method toNormal
         * @description Family 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {string} JSON 형식의 가족 구성 데이터를 반환합니다.
         */
        toNormal() {
          return this.value;
          // 가족 구성 데이터를 반환합니다.
        }
      }
      
      /**
       * @class Client.#Request.#WebRequest.#Space
       * @description 공간 정보를 관리하는 내부 클래스입니다.
       */
      #Space = class {

        /**
         * @constructor
         * @description 주어진 공간 정보를 기반으로 Space 객체를 초기화합니다.
         * @param {Object} space - 공간 정보를 포함한 객체입니다.
         */
        constructor(space) {
          this.address = new Address(space.address);
          // 공간의 주소 정보를 Address 객체로 변환하여 저장합니다.

          this.contract = new Menu(space.contract, ['전월세', '자가'], false);
          // 계약 형태 정보를 나타내는 Menu 객체를 생성하여 저장합니다.

          this.pyeong = new this.#Pyeong(space.pyeong);
          // 평수 정보를 처리하여 Pyeong 객체로 저장합니다.

          this.naver = space.naver;
          // 네이버 공간 정보(예: 네이버 부동산 링크 등)를 저장합니다.

          this.spec = new this.#SpaceSpec(space.spec);
          // 공간의 상세 스펙(방, 화장실, 발코니 등)을 처리하여 SpaceSpec 객체로 저장합니다.

          this.resident = new this.#Resident(space.resident);
          // 거주자 정보를 처리하여 Resident 객체로 저장합니다.

          this.partial = new this.#Partial(space.partial);
          // 부분 리모델링 정보를 처리하여 Partial 객체로 저장합니다.
        }

        /**
         * @method toNormal
         * @description Space 객체를 JSON 형식으로 변환하여 반환합니다.
         * @returns {Object} JSON 형식의 공간 정보를 반환합니다.
         */
        toNormal() {
          let obj = {};
          // JSON 데이터를 담을 빈 객체를 생성합니다.

          obj.address = this.address.toNormal();
          // address 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.contract = this.contract.toNormal();
          // contract 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.pyeong = this.pyeong.toNormal();
          // pyeong 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.naver = this.naver;
          // 네이버 데이터를 obj 객체에 저장합니다.

          obj.spec = this.spec.toNormal();
          // spec 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.resident = this.resident.toNormal();
          // resident 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          obj.partial = this.partial.toNormal();
          // partial 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

          return obj;
          // 변환된 JSON 데이터를 반환합니다.
        }

        /**
         * @class Client.#Request.#WebRequest.#Space.#SpaceSpec
         * @description 공간의 상세 스펙(방 개수, 화장실 개수, 발코니 여부 등)을 관리하는 내부 클래스입니다.
         */
        #SpaceSpec = class {

          /**
           * @constructor
           * @description 주어진 스펙 데이터를 기반으로 SpaceSpec 객체를 초기화합니다.
           * @param {Object} spec - 스펙 데이터를 포함한 객체입니다.
           */
          constructor(spec) {
            this.room = Number(spec.room);
            // 방 개수 정보를 숫자로 변환하여 저장합니다.

            this.bathroom = Number(spec.bathroom);
            // 화장실 개수 정보를 숫자로 변환하여 저장합니다.

            this.valcony = Boolean(spec.valcony);
            // 발코니 확장 여부를 Boolean 값으로 변환하여 저장합니다.
          }
          
          /**
           * @method toNormal
           * @description SpaceSpec 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 스펙 데이터를 반환합니다.
           */
          toNormal() {
            let obj = {};
            // JSON 데이터를 담을 빈 객체를 생성합니다.

            obj.room = this.room;
            // room 데이터를 obj 객체에 저장합니다.

            obj.bathroom = this.bathroom;
            // bathroom 데이터를 obj 객체에 저장합니다.

            obj.valcony = this.valcony;
            // valcony 데이터를 obj 객체에 저장합니다.

            return obj;
            // 변환된 JSON 데이터를 반환합니다.
          }
          
          /**
           * @method toMessage
           * @description 방 개수, 화장실 개수, 발코니 확장 여부를 포함한 문자열 메시지를 생성하여 반환합니다.
           * @returns {string} 스펙 정보를 요약한 메시지를 반환합니다.
           */
          toMessage() {
            return `방 ${this.room}개${this.room === 4 ? " 이상" : ""} / 화장실 ${this.bathroom}개${this.bathroom === 3 ? " 이상" : ""} / 발코니 확장${this.valcony ? "" : " 없음"}`;
            // 방 개수, 화장실 개수, 발코니 확장 여부를 포함한 메시지를 반환합니다.
          }
        }

        /**
         * @class Client.#Request.#WebRequest.#Space.#Resident
         * @description 거주자 정보를 관리하는 내부 클래스입니다.
         */
        #Resident = class {

          /**
           * @constructor
           * @description 주어진 거주자 정보를 기반으로 Resident 객체를 초기화합니다.
           * @param {Object} resident - 거주자 정보를 포함한 객체입니다.
           */
          constructor(resident) {
            this.living = Boolean(resident.living);
            // 현재 거주 중인지 여부를 Boolean 값으로 변환하여 저장합니다.

            this.expected = new DateParse(resident.expected);
            // 입주 예정일을 DateParse 객체로 변환하여 저장합니다.
          }
          
          /**
           * @method toNormal
           * @description Resident 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 거주자 정보를 반환합니다.
           */
          toNormal() {
            let obj = {};
            // JSON 데이터를 담을 빈 객체를 생성합니다.

            obj.living = this.living;
            // living 데이터를 obj 객체에 저장합니다.

            obj.expected = this.expected.toNormal();
            // expected 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

            return obj;
            // 변환된 JSON 데이터를 반환합니다.
          }
        }

        /**
         * @class Client.#Request.#WebRequest.#Space.#Partial
         * @description 부분 리모델링 정보를 관리하는 내부 클래스입니다.
         */
        #Partial = class {

          /**
           * @constructor
           * @description 주어진 부분 리모델링 정보를 기반으로 Partial 객체를 초기화합니다.
           * @param {Object} json - 부분 리모델링 정보를 포함한 객체입니다.
           */
          constructor(json) {
            this.boo = json.boo;
            // 부분 리모델링 여부를 저장합니다.

            this.pyeong = new this.#Pyeong(json.pyeong);
            // 부분 리모델링 평수 정보를 처리하여 Pyeong 객체로 저장합니다.

            this.detail = json.detail;
            // 부분 리모델링에 대한 세부 사항을 저장합니다.
          }
          
          /**
           * @method toNormal
           * @description Partial 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {Object} JSON 형식의 부분 리모델링 정보를 반환합니다.
           */
          toNormal() {
            let obj = {};
            // JSON 데이터를 담을 빈 객체를 생성합니다.

            obj.boo = this.boo;
            // boo 데이터를 obj 객체에 저장합니다.

            obj.pyeong = this.pyeong.toNormal();
            // pyeong 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 obj 객체에 저장합니다.

            obj.detail = this.detail;
            // detail 데이터를 obj 객체에 저장합니다.

            return obj;
            // 변환된 JSON 데이터를 반환합니다.
          }

          /**
           * @class Client.#Request.#WebRequest.#Space.#Partial.#Pyeong
           * @description 평수 정보를 관리하는 내부 클래스입니다.
           */
          #Pyeong = class {

            /**
             * @constructor
             * @description 주어진 평수 정보를 기반으로 Pyeong 객체를 초기화합니다.
             * @param {number} rawNumber - 평수 정보를 나타내는 숫자입니다.
             */
            constructor(rawNumber) {
              this.raw = rawNumber;
              // 원시 평수 데이터를 저장합니다.

              this.value = rawNumber;
              // 평수 값을 저장합니다.
            }

            /**
             * @method toNormal
             * @description Pyeong 객체를 JSON 형식으로 변환하여 반환합니다.
             * @returns {number} 평수 값을 반환합니다.
             */
            toNormal() {
              return this.value;
              // 평수 값을 반환합니다.
            }

            /**
             * @method toMessage
             * @description 평수 정보를 문자열 형식으로 변환하여 반환합니다.
             * @returns {string} 평수 정보를 포함한 문자열을 반환합니다.
             */
            toMessage() {
              return String(this.value) + "평";
              // 평수 값을 문자열로 변환하여 반환합니다.
            }
          }
        }

        /**
         * @class Client.#Request.#WebRequest.#Space.#Pyeong
         * @description 평수 정보를 관리하는 내부 클래스입니다.
         */
        #Pyeong = class {

          /**
           * @constructor
           * @description 주어진 평수 정보를 기반으로 Pyeong 객체를 초기화합니다.
           * @param {number} rawNumber - 평수 정보를 나타내는 숫자입니다.
           */
          constructor(rawNumber) {
            this.raw = rawNumber;
            // 원시 평수 데이터를 저장합니다.

            this.value = rawNumber;
            // 평수 값을 저장합니다.
          }

          /**
           * @method toNormal
           * @description Pyeong 객체를 JSON 형식으로 변환하여 반환합니다.
           * @returns {number} 평수 값을 반환합니다.
           */
          toNormal() {
            return this.value;
            // 평수 값을 반환합니다.
          }

          /**
           * @method toMessage
           * @description 평수 정보를 문자열 형식으로 변환하여 반환합니다.
           * @returns {string} 평수 정보를 포함한 문자열을 반환합니다.
           */
          toMessage() {
            return String(this.value) + "평";
            // 평수 값을 문자열로 변환하여 반환합니다.
          }
        }
      }
    }

  }

  #Requests = class extends Array {
    toNormal() {
      let arr = [];
      for (let i = 0; i < this.length; i++) {
        arr.push(this[i].toNormal());
      }
      return arr;
    }
  }
}

/**
 * @class Clients
 * @extends Array
 * @description 고객 인스턴스를 담는 배열을 관리하는 클래스입니다. 
 * 이 클래스는 고객 데이터와 관련된 여러 메서드를 제공합니다.
 */
class Clients extends Array {

  /**
   * @method latestRequests
   * @description 각 고객의 최신 요청을 배열로 반환합니다.
   * @returns {Array} 고객의 최신 요청들로 구성된 배열을 반환합니다.
   */
  latestRequests() {
    let arr = [];
    // 결과를 담을 빈 배열을 생성합니다.

    for (let i of this) {
      arr.push(i.latestRequest());
      // 각 고객의 latestRequest 메서드를 호출하여 최신 요청을 배열에 추가합니다.
    }

    return arr;
    // 최신 요청들이 담긴 배열을 반환합니다.
  }

  /**
   * @method getRequests
   * @description 모든 고객의 요청들을 하나의 배열로 반환합니다.
   * @returns {Array} 고객들의 모든 요청들이 담긴 배열을 반환합니다.
   */
  getRequests() {
    let arr = [];
    // 결과를 담을 빈 배열을 생성합니다.

    let tempArr;
    // 각 고객의 요청들을 임시로 저장할 변수를 선언합니다.

    for (let i of this) {
      tempArr = i.requests;
      // 각 고객의 requests를 tempArr에 저장합니다.

      for (let j of tempArr) {
        arr.push(j);
        // 각 요청을 arr 배열에 추가합니다.
      }
    }

    return arr;
    // 모든 요청들이 담긴 배열을 반환합니다.
  }

  /**
   * @getter requests
   * @description 모든 고객의 요청들을 하나의 배열로 반환하는 getRequests 메서드를 호출합니다.
   * @returns {Array} 고객들의 모든 요청들이 담긴 배열을 반환합니다.
   */
  get requests() {
    return this.getRequests();
    // getRequests 메서드를 호출하여 그 결과를 반환합니다.
  }

  /**
   * @getter name
   * @description 모든 고객의 이름을 콤마(,)로 연결하여 하나의 문자열로 반환합니다.
   * @returns {string} 모든 고객의 이름을 연결한 문자열을 반환합니다.
   */
  get name() {
    let arr = [];
    // 결과를 담을 빈 배열을 생성합니다.

    for (let i of this) {
      arr.push(i.name);
      // 각 고객의 이름을 배열에 추가합니다.
    }

    return arr.join(',');
    // 배열의 모든 이름을 콤마로 연결한 문자열을 반환합니다.
  }

  /**
   * @method toNormal
   * @description 모든 고객 데이터를 일반적인 JSON 형식으로 변환하여 배열로 반환합니다.
   * @returns {Array} 모든 고객의 데이터를 JSON 형식으로 변환한 배열을 반환합니다.
   */
  toNormal() {
    let tong;
    tong = [];
    // 결과를 담을 빈 배열을 생성합니다.

    for (let i of this) {
      tong.push(i.toNormal());
      // 각 고객 데이터를 toNormal 메서드를 통해 JSON 형식으로 변환하여 배열에 추가합니다.
    }

    return tong;
    // 변환된 JSON 데이터들이 담긴 배열을 반환합니다.
  }

}

/**
 * @class ClientTypeCases
 * @extends Array
 * @description 고객 유형에 따른 케이스를 관리하는 클래스입니다. 이 클래스는 여러 고객 유형을 분석하고 해당하는 케이스를 찾는 기능을 제공합니다.
 */
class ClientTypeCases extends Array {

  /**
   * @method parsingCases
   * @description 주어진 고객의 요청 유형을 분석하여 해당하는 케이스들을 반환합니다.
   * @param {Object} client - 고객 객체로, 요청 유형을 분석할 대상입니다.
   * @returns {Array} 고객 유형에 해당하는 케이스들을 반환합니다.
   */
  parsingCases(client) {
    const requestTypes = client.getType();
    // 고객 객체에서 요청 유형을 가져옵니다.

    let arr = [], result = [];
    // 요청 유형을 담을 배열(arr)과 결과를 담을 배열(result)을 선언합니다.

    for (let i of requestTypes) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
      // 각 요청 유형을 문자열로 결합하여 arr 배열에 추가합니다.
    }

    for (let i of arr) {
      for (let obj of this) {
        if (obj.name === i) {
          result.push(obj);
          // arr에 저장된 문자열과 같은 이름을 가진 객체를 찾아 result 배열에 추가합니다.
        }
      }
    }

    return result;
    // 해당하는 케이스들이 담긴 result 배열을 반환합니다.
  }

  /**
   * @method parsingProid
   * @description 주어진 고객의 케이스를 분석하여 해당하는 프로젝트 ID를 반환합니다.
   * @param {Object} client - 고객 객체로, 케이스를 분석할 대상입니다.
   * @returns {string|null} 해당하는 프로젝트 ID를 반환하거나, 없을 경우 null을 반환합니다.
   */
  parsingProid(client) {
    const caseArray = this.parsingCases(client);
    // 주어진 고객의 케이스를 분석하여 caseArray에 저장합니다.

    let targetProid;
    targetProid = null;
    // 결과로 반환할 프로젝트 ID를 저장할 변수를 선언하고 null로 초기화합니다.

    for (let i = 0; i < caseArray.length; i++) {
      caseArray[caseArray.length - 1 - i].proidArr.sort();
      caseArray[caseArray.length - 1 - i].contractArr.sort();
      // 최신 케이스부터 역순으로 프로세스 ID 배열과 계약 배열을 정렬합니다.

      for (let j = 0; j < caseArray[caseArray.length - 1 - i].proidArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].proidArr[j];
        // 가장 최신의 프로젝트 ID를 targetProid에 저장합니다.
      }

      for (let j = 0; j < caseArray[caseArray.length - 1 - i].contractArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].contractArr[j];
        // 가장 최신의 계약된 프로젝트 ID를 targetProid에 저장합니다.
      }
    }

    return targetProid;
    // 최종적으로 선택된 프로젝트 ID를 반환합니다.
  }
}

/**
 * @class ClientTypes
 * @extends Array
 * @description 고객 유형을 분석하고 케이스를 구성하는 기능을 제공합니다.
 */
class ClientTypes extends Array {

  /**
   * @method getCompositionWords
   * @description 고객 유형을 구성하는 단어들을 반환합니다.
   * @returns {Array} 고객 유형을 구성하는 문자열 배열을 반환합니다.
   */
  getCompositionWords() {
    let arr = [];
    // 결과를 담을 배열을 선언합니다.

    for (let i of this) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
      // 각 고객 유형을 결합하여 배열에 추가합니다.
    }

    return arr;
    // 고객 유형 문자열로 구성된 배열을 반환합니다.
  }

  /**
   * @method getTypeCases
   * @description 고객 유형에 따른 케이스들을 구성하여 반환합니다.
   * @param {Array|null} projects - 프로젝트 배열로, 케이스를 생성할 때 사용할 프로젝트 데이터입니다.
   * @returns {ClientTypeCases} 구성된 고객 유형 케이스들을 반환합니다.
   */
  getTypeCases(projects = null) {
    const typeSet = Array.from(new Set(this.getCompositionWords()));
    // 중복을 제거한 고객 유형 문자열들을 가져와 typeSet에 저장합니다.

    typeSet.sort((a, b) => {
      return Number(a.split("_")[0]) - Number(b.split("_")[0]);
      // 예산을 기준으로 고객 유형을 오름차순으로 정렬합니다.
    });

    let resultArr, cliidArr, tempObj, tempArr, proidArr, contractArr;
    resultArr = new ClientTypeCases();
    // 결과를 담을 ClientTypeCases 객체를 생성합니다.

    for (let i of typeSet) {
      tempObj = { name: i, case: {} };
      // 각 유형에 대한 임시 객체를 생성합니다.

      tempArr = i.split('_');
      // 유형 문자열을 '_' 기준으로 분리하여 배열로 만듭니다.

      tempObj.case.budget = Number(tempArr[0]);
      tempObj.case.address = tempArr[1];
      tempObj.case.pyeong = { from: Number(tempArr[2].split(" ~ ")[0]), to: Number(tempArr[2].split(" ~ ")[1]) };
      tempObj.case.contract = tempArr[3];
      tempObj.case.living = tempArr[4] === "거주중";
      // 각 유형에 대해 예산, 주소, 평수, 계약, 거주 여부를 할당합니다.

      cliidArr = [];
      // 클라이언트 ID를 저장할 배열을 선언합니다.

      for (let j of this) {
        if (i === (`${j.budget.type}_${j.address.type}_${j.pyeong.type}_${j.contract.type}_${j.living.type}`)) {
          cliidArr.push(j.cliid);
          // 현재 유형과 일치하는 클라이언트 ID를 cliidArr에 추가합니다.
        }
      }

      tempObj.cliidArr = cliidArr;
      // 일치하는 클라이언트 ID 배열을 임시 객체에 저장합니다.

      if (projects !== null) {
        proidArr = [];
        contractArr = [];
        // 프로젝트 ID와 계약 ID를 저장할 배열들을 선언합니다.

        for (let p of projects) {
          if (cliidArr.includes(p.cliid)) {
            proidArr.push(p.proid);
            // 프로젝트의 클라이언트 ID가 cliidArr에 포함되면 proidArr에 추가합니다.

            if (/^d/.test(p.desid)) {
              contractArr.push(p.proid);
              // 프로젝트 ID가 계약 ID인지 확인하고 contractArr에 추가합니다.
            }
          }
        }

        tempObj.proidArr = proidArr;
        tempObj.contractArr = contractArr;
        // 프로젝트 ID와 계약 ID 배열을 임시 객체에 저장합니다.
      }

      resultArr.push(tempObj);
      // 구성된 케이스 객체를 결과 배열에 추가합니다.
    }

    return resultArr;
    // 구성된 케이스 객체들을 담은 배열을 반환합니다.
  }
}

/**
 * @function ClientType
 * @description 주어진 객체를 기반으로 고객 유형을 파악합니다.
 * @param {Object} obj - 고객 데이터를 포함한 객체입니다.
 */
const ClientType = function (obj) {

  /**
   * @function budgetTypes
   * @description 예산에 따라 유형을 반환합니다.
   * @param {number} number - 예산 금액입니다.
   * @returns {number} 해당 예산 금액에 맞는 유형을 반환합니다.
   */
  const budgetTypes = function (number) {
    if (number <= 500) {
      return 500;
    } else if (number > 500 && number < 1500) {
      return 1000;
    } else if (number >= 1500 && number < 2000) {
      return 1500;
    } else if (number >= 2000 && number < 3000) {
      return 2000;
    } else if (number >= 3000 && number < 4000) {
      return 3000;
    } else if (number >= 4000 && number < 5000) {
      return 4000;
    } else {
      return 5000;
    }
    // 주어진 예산 금액에 맞는 유형을 반환합니다.
  }

  /**
   * @function addressTypes
   * @description 주소 배열을 받아 해당 주소 유형을 반환합니다.
   * @param {Array} arr - 주소 배열입니다.
   * @returns {string} 해당 주소 유형을 반환합니다.
   */
  const addressTypes = function (arr) {
    if ((new RegExp("^서울")).test(arr[0])) {
      return "서울";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else {
      return "지방";
    }
    // 주어진 주소 배열의 첫 요소를 정규 표현식으로 검사하여 해당 주소 유형을 반환합니다.
  }

  /**
   * @function pyeongTypes
   * @description 평수에 따라 유형을 반환합니다.
   * @param {number} number - 평수입니다.
   * @returns {string} 해당 평수에 맞는 유형을 반환합니다.
   */
  const pyeongTypes = function (number) {
    if (number <= 10) {
      return "0 ~ 9";
    } else if (number >= 10 && number < 25) {
      return "10 ~ 24";
    } else if (number >= 25 && number < 30) {
      return "25 ~ 29";
    } else if (number >= 30 && number < 35) {
      return "30 ~ 34";
    } else if (number >= 35 && number < 40) {
      return "35 ~ 39";
    } else if (number >= 40 && number < 45) {
      return "40 ~ 44";
    } else if (number >= 45 && number < 50) {
      return "45 ~ 49";
    } else {
      return "50 ~ ";
    }
    // 주어진 평수에 맞는 유형을 반환합니다.
  }

  this.cliid = obj.cliid;
  // 고객 ID를 저장합니다.

  this.timeline = obj.timeline;
  // 고객의 타임라인 데이터를 저장합니다.

  this.budget = {
    value: Number(obj.budget.replace(/[^0-9\.\-]/g, '')),
    type: budgetTypes(Number(obj.budget.replace(/[^0-9\.\-]/g, ''))),
    // 예산 금액에서 숫자만 추출하여 value로 저장하고, 예산 유형을 파악하여 type으로 저장합니다.
  };

  this.address = {
    value: obj.address.split(" "),
    type: addressTypes(obj.address.split(" ")),
    // 주소를 공백으로 분리하여 value로 저장하고, 주소 유형을 파악하여 type으로 저장합니다.
  };

  this.pyeong = {
    value: obj.pyeong,
    type: pyeongTypes(obj.pyeong),
    // 평수 값을 저장하고, 평수 유형을 파악하여 type으로 저장합니다.
  };

  this.contract = {
    value: obj.contract,
    type: obj.contract,
    // 계약 유형을 value와 type으로 저장합니다.
  };

  this.living = {
    value: obj.living,
    type: (obj.living ? "거주중" : "이사"),
    // 거주 여부를 value로 저장하고, 이에 따른 유형을 type으로 저장합니다.
  };
}

/**
 * @function withTools
 * @description Client 클래스에 유용한 메서드들을 추가하는 함수입니다.
 * @param {Object} Client - Client 클래스입니다.
 * @returns {Object} 수정된 Client 클래스를 반환합니다.
 */
const withTools = function (Client) {

  /**
   * @method Client.prototype.getType
   * @description 고객의 요청 데이터를 분석하여 유형화된 객체 배열을 반환합니다.
   * @returns {Array} 유형화된 ClientType 객체들의 배열을 반환합니다.
   */
  Client.prototype.getType = function () {
    let arr = new ClientTypes();
    // ClientTypes 객체를 생성합니다.

    let tempObj;
    // 임시 객체를 선언합니다.

    for (let { request } of this.requests) {
      // 고객의 각 요청에 대해 반복합니다.

      tempObj = {};
      // 각 요청에 대해 임시 객체를 초기화합니다.

      tempObj.cliid = this.cliid;
      // 임시 객체에 고객 ID를 추가합니다.

      tempObj.timeline = request.timeline;
      // 임시 객체에 요청의 타임라인을 추가합니다.

      tempObj.budget = request.budget.value;
      // 임시 객체에 요청의 예산을 추가합니다.

      tempObj.address = request.space.address.value;
      // 임시 객체에 요청의 주소를 추가합니다.

      tempObj.pyeong = request.space.pyeong.value;
      // 임시 객체에 요청의 평수를 추가합니다.

      tempObj.contract = request.space.contract.value;
      // 임시 객체에 요청의 계약 형태를 추가합니다.

      tempObj.living = request.space.resident.living;
      // 임시 객체에 거주 여부를 추가합니다.

      arr.push(new ClientType(tempObj));
      // 임시 객체를 기반으로 ClientType 객체를 생성하여 배열에 추가합니다.
    }

    return arr;
    // 유형화된 ClientType 객체들의 배열을 반환합니다.
  }

  /**
   * @method Client.prototype.toMessage
   * @description 고객 정보를 메시지 형태로 변환하여 반환합니다.
   * @returns {string} 고객 정보를 담은 메시지 문자열을 반환합니다.
   */
  Client.prototype.toMessage = function () {
    const { request } = this.requests[0];
    // 첫 번째 요청 객체를 가져옵니다.

    let message = "";
    // 메시지를 저장할 변수를 초기화합니다.

    message += "문의일 : " + request.timeline.toString(true) + "\n";
    // 문의일을 메시지에 추가합니다.

    message += "고객 아이디 : " + this.cliid + "\n";
    // 고객 ID를 메시지에 추가합니다.

    message += "성함 : " + this.name + "\n";
    // 고객 이름을 메시지에 추가합니다.

    message += "연락처 : " + this.phone + "\n";
    // 고객 전화번호를 메시지에 추가합니다.

    message += "이메일 : " + this.email + "\n";
    // 고객 이메일을 메시지에 추가합니다.

    message += "주소 : " + request.space.address.value + "\n";
    // 주소를 메시지에 추가합니다.

    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    // 평수를 메시지에 추가합니다.

    if (!request.space.resident.living) {
      message += "입주 예정일 : " + request.space.resident.expected.toString() + "\n";
    } else {
      message += "입주 예정일 : " + "거주중" + "\n";
    }
    // 입주 예정일 또는 거주 상태를 메시지에 추가합니다.

    message += "계약 형태 : " + request.space.contract.value + "\n";
    // 계약 형태를 메시지에 추가합니다.

    message += "요청 사항 : " + request.etc.comment + "\n";
    // 요청 사항을 메시지에 추가합니다.

    return message.replace(/\n$/, '');
    // 마지막 줄 바꿈을 제거한 메시지를 반환합니다.
  }

  /**
   * @method Client.prototype.toPrint
   * @description 고객 정보를 프린트 가능한 형식으로 변환하여 반환합니다.
   * @param {Array} addition - 추가적인 정보를 담은 배열입니다.
   * @param {number} requestNumber - 요청 번호로, 특정 요청을 지정합니다.
   * @returns {string} 프린트 가능한 형식의 고객 정보를 반환합니다.
   */
  Client.prototype.toPrint = function (addition = [], requestNumber = 0) {
    const { request, analytics } = this.requests[requestNumber];
    // 주어진 요청 번호에 해당하는 요청과 분석 데이터를 가져옵니다.

    const indent = "    ";
    const bar = "=============================================================";
    const wordEaLength = 70;
    let documentArr, comment, commentArr;
    let tempStr;
    let thisSerid;

    documentArr = [];
    // 문서 배열을 초기화합니다.

    documentArr.push(`상담 신청서  /  ${this.cliid}  /  ${request.timeline.toString(true)}\n`);
    // 상담 신청서 정보를 문서 배열에 추가합니다.

    documentArr.push(bar + "\n");
    // 구분선을 문서 배열에 추가합니다.

    documentArr.push(`${this.name} (${this.phone})\n`);
    // 고객 이름과 전화번호를 문서 배열에 추가합니다.

    documentArr.push("주소 : " + request.space.address.value + "\n");
    // 주소를 문서 배열에 추가합니다.

    documentArr.push("평수 : " + request.space.pyeong.toMessage() + "\n");
    // 평수를 문서 배열에 추가합니다.

    if (!request.space.resident.living) {
      documentArr.push("입주 예정일 : " + request.space.resident.expected.toString() + "\n");
    } else {
      documentArr.push("입주 예정일 : " + "거주중" + "\n");
    }
    // 입주 예정일 또는 거주 상태를 문서 배열에 추가합니다.

    documentArr.push("계약 형태 : " + request.space.contract.value + "\n");
    // 계약 형태를 문서 배열에 추가합니다.

    documentArr.push("예산 : " + request.budget.value + "\n");
    // 예산을 문서 배열에 추가합니다.

    documentArr.push("가구 구매 : " + request.furniture.value + "\n");
    // 가구 구매 정보를 문서 배열에 추가합니다.

    for (let text of addition) {
      documentArr.push(text + "\n");
      // 추가적인 정보를 문서 배열에 추가합니다.
    }

    comment = "요청 사항 : " + request.etc.comment;
    // 요청 사항을 comment에 저장합니다.

    commentArr = [];
    tempStr = '';
    // commentArr를 초기화하고, 임시 문자열(tempStr)을 선언합니다.

    for (let i = 0; i < comment.length; i++) {
      tempStr += comment[i];
      if (i % wordEaLength === wordEaLength - 1) {
        commentArr.push(tempStr);
        tempStr = '';
      }
    }
    commentArr.push(tempStr);
    // 요청 사항을 일정 길이마다 줄 바꿈하여 commentArr에 추가합니다.

    commentArr = commentArr.filter((s) => { return s !== ""; }).map((s) => { return s.trim() + "\n"; });
    // 빈 문자열을 제거하고, 각 문자열의 끝에 줄 바꿈을 추가합니다.

    documentArr = documentArr.concat(commentArr);
    // commentArr를 문서 배열에 추가합니다.

    documentArr = documentArr.map((s) => { return indent + s; });
    // 문서 배열의 각 항목에 들여쓰기를 추가합니다.

    return documentArr.join("\n");
    // 최종적으로 문서 배열을 문자열로 변환하여 반환합니다.
  }

  /**
   * @method Client.prototype.flatDeath
   * @description 고객의 요청 및 분석 데이터를 평탄화하여 반환합니다.
   * @returns {Array} 평탄화된 고객 데이터 배열을 반환합니다.
   */
  Client.prototype.flatDeath = function () {
    const client = this.toNormal();
    // 고객 데이터를 일반 객체로 변환합니다.

    const { name, phone, email, cliid } = client;
    // 고객의 기본 정보를 추출합니다.

    /**
     * @function dateToString
     * @description 날짜 객체를 문자열로 변환합니다.
     * @param {Date} dateObject - 날짜 객체입니다.
     * @param {boolean} [detail=false] - 시간까지 포함할지 여부를 결정합니다.
     * @returns {string} 변환된 날짜 문자열을 반환합니다.
     */
    const dateToString = function (dateObject, detail = false) {
      let dayString = '';
      // 날짜 문자열을 초기화합니다.

      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';

      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }
      dayString += '-';

      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;
      // 날짜 객체를 문자열로 변환하여 반환합니다.
    }

    /**
     * @function callHistoryToString
     * @description 콜 이력 배열을 문자열로 변환합니다.
     * @param {Array} historyArr - 콜 이력 배열입니다.
     * @returns {string} 변환된 콜 이력 문자열을 반환합니다.
     */
    const callHistoryToString = function (historyArr) {
      let totalString = '';
      // 콜 이력 문자열을 초기화합니다.

      historyArr.reverse();
      // 콜 이력 배열을 역순으로 정렬합니다.

      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;
      // 콜 이력 문자열을 반환합니다.
    }

    /**
     * @function serviceParsing
     * @description 서비스 객체를 설명 문자열로 변환합니다.
     * @param {Object} serviceObj - 서비스 객체입니다.
     * @returns {string} 서비스 설명 문자열을 반환합니다.
     */
    const serviceParsing = function (serviceObj) {
      let serviceWording = '';

      if (serviceObj.serid === "s2011_aa01s") {
        serviceWording = "홈퍼니싱";
      } else if (serviceObj.serid === "s2011_aa02s") {
        serviceWording = "홈스타일링";
      } else if (serviceObj.serid === "s2011_aa03s") {
        serviceWording = "토탈 스타일링";
      } else {
        serviceWording = "설계 변경";
      }

      if (serviceObj.xValue === 'M') {
        serviceWording += " mini";
      } else if (serviceObj.xValue === 'B') {
        serviceWording += " basic";
      } else if (serviceObj.xValue === 'P') {
        serviceWording += " premium";
      }

      if (serviceObj.online) {
        serviceWording = "온라인 " + serviceWording;
      } else {
        serviceWording = "오프라인 " + serviceWording;
      }

      return serviceWording;
      // 서비스 객체를 설명 문자열로 변환하여 반환합니다.
    }

    let tong = [];
    let temp;

    for (let { request: { timeline, budget, family, furniture, space: { address, contract, pyeong, naver, spec: { room, bathroom, valcony }, resident: { living, expected }, partial: { boo: partialBoo, pyeong: partialPyeong, detail: partialDetail } }, etc: { comment, channel } }, analytics: { response: { status, action, outreason, kakao, service, designers, priority, possible, target, memo }, date: { call: { next, history: callHistory, recommend }, space: { precheck, empty, movein } }, picture: { space: spacePicture, prefer: preferPicture } } } of client.requests) {

      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        action,
        outreason: outreason.join(", "),
        kakao: (kakao ? "등록" : "미등록"),
        service: serviceParsing(service),
        next: dateToString(next),
        recommend: dateToString(recommend),
        callHistory: callHistoryToString(callHistory),
        timeline: dateToString(timeline, true),
        spacePicture: (spacePicture.boo ? "제출" : "미제출"),
        preferPicture: (preferPicture.boo ? "제출" : "미제출"),
        phone,
        email,
        budget,
        address,
        contract,
        pyeong,
        naver,
        living,
        precheck: dateToString(precheck),
        empty: dateToString(empty),
        movein: dateToString(movein),
        expected: dateToString(expected),
        room,
        bathroom,
        valcony,
        family,
        furniture,
        comment,
        channel,
        partialBoo: (partialBoo ? "부분" : "전체"),
        partialPyeong,
        partialDetail,
        designers: designers.join(", "),
        priority,
        target,
        possible,
        memo,
      }
      tong.push(temp);
      // 요청과 분석 데이터를 평탄화하여 tong 배열에 추가합니다.
    }
    return tong;
    // 평탄화된 데이터를 반환합니다.
  }

  /**
   * @method Client.prototype.dimensionSqueeze
   * @description 평탄화된 고객 데이터를 압축하여 반환합니다.
   * @returns {Array} 압축된 고객 데이터 배열을 반환합니다.
   */
  Client.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath();
    // 평탄화된 데이터를 가져옵니다.

    let result, tempObj;
    result = [];

    for (let { standard, info } of tong) {
      tempObj = {};
      for (let i in standard) {
        tempObj[i] = standard[i];
      }
      for (let i in info) {
        tempObj[i] = info[i];
      }
      result.push(tempObj);
      // standard와 info 데이터를 결합하여 result 배열에 추가합니다.
    }

    return result;
    // 압축된 데이터를 반환합니다.
  }

  return Client;
  // 수정된 Client 클래스를 반환합니다.
}

/**
 * @function withToolsArr
 * @description Clients 배열에 유용한 메서드들을 추가하는 함수입니다.
 * @param {Object} Clients - Clients 배열입니다.
 * @returns {Object} 수정된 Clients 배열을 반환합니다.
 */
const withToolsArr = function (Clients) {

  /**
   * @class TongReports
   * @extends Array
   * @description 보고서를 담는 배열 클래스입니다.
   */
  class TongReports extends Array {}

  /**
   * @class TongReport
   * @description 단일 보고서를 표현하는 클래스입니다.
   * @param {string} cliid - 고객 ID입니다.
   * @param {number|string|boolean} value - 보고서의 값입니다.
   */
  class TongReport {
    constructor(cliid, value) {
      this.cliid = cliid;
      this.value = value;
    }
  }

  /**
   * @class RequestsTongs
   * @extends Array
   * @description 요청의 집합을 표현하는 배열 클래스입니다.
   */
  class RequestsTongs extends Array {

    /**
     * @method reportAll
     * @description 모든 요청에 대한 보고서를 생성합니다.
     * @returns {Array} 모든 요청에 대한 보고서 배열을 반환합니다.
     */
    reportAll() {
      let arr = [];
      // 결과 배열을 초기화합니다.

      for (let i of this) {
        arr.push(i.reportAll());
        // 각 요청에 대해 보고서를 생성하고 배열에 추가합니다.
      }
      return arr;
      // 보고서 배열을 반환합니다.
    }

    /**
     * @method select
     * @description 특정 날짜에 해당하는 요청을 선택합니다.
     * @param {Date} dateObj - 날짜 객체입니다.
     * @returns {Object|null} 선택된 요청을 반환합니다.
     */
    select(dateObj) {
      if (!(dateObj instanceof Date)) {
        throw new Error("must be date object");
        // 입력이 Date 객체가 아닐 경우 오류를 발생시킵니다.
      }
      let key, target;

      target = null;
      // 선택된 요청을 초기화합니다.

      key = (String(dateObj.getFullYear()).slice(2) + "년 " + String(dateObj.getMonth() + 1) + "월");
      // 날짜 객체를 문자열로 변환하여 키를 생성합니다.

      for (let obj of this) {
        if (obj.name === key) {
          target = obj;
          break;
          // 키와 일치하는 요청을 찾으면 target에 할당하고 반복을 종료합니다.
        }
      }

      return target;
      // 선택된 요청을 반환합니다.
    }

  }

  /**
   * @class RequestsTongFactor
   * @description 개별 요청에 대한 데이터를 관리하는 클래스입니다.
   * @param {Object} obj - 요청 데이터를 포함하는 객체입니다.
   */
  class RequestsTongFactor {
    constructor(obj) {
      this.name = obj.name;
      this.date = obj.date;
      this.tong = obj.tong;
    }

    /**
     * @method static ratioParsing
     * @description 비율을 퍼센트 문자열로 변환합니다.
     * @param {number} num - 비율 숫자입니다.
     * @returns {string} 변환된 퍼센트 문자열을 반환합니다.
     */
    static ratioParsing(num) {
      return `${String(Math.round(num * 100 * 10) / 10)}%`;
      // 비율을 소수점 첫째 자리까지 퍼센트로 변환합니다.
    }

    /**
     * @method static moneyParsing
     * @description 금액을 '만원' 단위의 문자열로 변환합니다.
     * @param {number} num - 금액 숫자입니다.
     * @returns {string} 변환된 금액 문자열을 반환합니다.
     */
    static moneyParsing(num) {
      let str = String(Math.round(num));
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3);
        // 3자리마다 콤마를 추가합니다.
      }
      return `${str}만원`;
      // '만원' 단위로 변환된 문자열을 반환합니다.
    }

    /**
     * @method static pyeongParsing
     * @description 평수를 '평' 단위의 문자열로 변환합니다.
     * @param {number} num - 평수 숫자입니다.
     * @returns {string} 변환된 평수 문자열을 반환합니다.
     */
    static pyeongParsing(num) {
      return `${String(Math.round(num * 100) / 100)}평`;
      // 평수를 소수점 둘째 자리까지 '평' 단위로 변환합니다.
    }

    /**
     * @method static dayParsing
     * @description 일수를 '일' 단위의 문자열로 변환합니다.
     * @param {number} num - 일수 숫자입니다.
     * @returns {string} 변환된 일수 문자열을 반환합니다.
     */
    static dayParsing(num) {
      return `${String(Math.floor(num))}일`;
      // 일수를 '일' 단위로 변환합니다.
    }

    /**
     * @method reportBudget
     * @description 예산에 대한 보고서를 생성합니다.
     * @returns {Object} 예산 보고서를 반환합니다.
     */
    reportBudget() {
      const tong = this.tong;
      // tong 데이터를 가져옵니다.

      const reports = [
        { name: "500만원 이하", from: 0, to: 1000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,000만원", from: 1000, to: 1500, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,500만원", from: 1500, to: 2000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2,000만원", from: 2000, to: 3000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3,000만원", from: 3000, to: 4000, value: 0, ratio: 0, cliidArr: [] },
        { name: "4,000만원", from: 4000, to: 5000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5,000만원 이상", from: 5000, to: 6000, value: 0, ratio: 0, cliidArr: [] },
        { name: "6,000만원 이상", from: 6000, to: 7000, value: 0, ratio: 0, cliidArr: [] },
        { name: "7,000만원 이상", from: 7000, to: 8000, value: 0, ratio: 0, cliidArr: [] },
        { name: "8,000만원 이상", from: 8000, to: 9000, value: 0, ratio: 0, cliidArr: [] },
        { name: "9,000만원 이상", from: 9000, to: 10000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억원 이상", from: 10000, to: 15000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억 5,000만원 이상", from: 15000, to: 20000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2억원 이상", from: 20000, to: 30000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3억원 이상", from: 30000, to: 50000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5억원 이상", from: 50000, to: 100000, value: 0, ratio: 0, cliidArr: [] },
        { name: "10억원 이상", from: 100000, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      // 예산 범위를 기반으로 보고서를 초기화합니다.

      const targetArr = tong.getBudget();
      // tong에서 예산 데이터를 가져옵니다.

      let total = 0;
      // 전체 예산의 합계를 초기화합니다.

      for (let { value } of targetArr) {
        total += value;
        // 모든 예산 값을 더하여 총 예산을 계산합니다.
      }

      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
            // 예산 범위에 따라 고객 ID를 추가합니다.
          }
        }
      }

      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        // 각 범위에 대한 비율을 계산합니다.

        delete obj.from;
        delete obj.to;
        // 보고서에서 범위 정보를 제거합니다.
      }

      return { total: tong.length, average: RequestsTongFactor.moneyParsing(total / tong.length), detail: reports };
      // 총 요청 수, 평균 예산, 상세 보고서를 반환합니다.
    }

    // 이와 같은 패턴으로 `reportAddress`, `reportPyeong`, `reportLiving`, `reportContract`, `reportMovingDay` 메서드를 구현하여
    // 각각의 주소, 평수, 거주 상태, 계약 형태, 이동 일자에 대한 보고서를 생성합니다.

    /**
     * @method reportAll
     * @description 모든 보고서를 생성합니다.
     * @returns {Object} 최종 보고서를 반환합니다.
     */
    reportAll() {
      let finalReport, tempObj;

      finalReport = {};

      finalReport.name = this.name;
      finalReport.date = this.date;
      // 보고서 이름과 날짜를 설정합니다.

      tempObj = this.reportBudget();
      finalReport.total = tempObj.total;
      finalReport.budget = {};
      finalReport.budget.average = tempObj.average;
      finalReport.budget.detail = tempObj.detail;
      // 예산 보고서를 생성하고 추가합니다.

      tempObj = this.reportAddress();
      finalReport.address = {};
      finalReport.address.average = tempObj.average;
      finalReport.address.detail = tempObj.detail;
      // 주소 보고서를 생성하고 추가합니다.

      tempObj = this.reportPyeong();
      finalReport.pyeong = {};
      finalReport.pyeong.average = tempObj.average;
      finalReport.pyeong.detail = tempObj.detail;
      // 평수 보고서를 생성하고 추가합니다.

      tempObj = this.reportLiving();
      finalReport.living = {};
      finalReport.living.average = tempObj.average;
      finalReport.living.detail = tempObj.detail;
      // 거주 상태 보고서를 생성하고 추가합니다.

      tempObj = this.reportContract();
      finalReport.contract = {};
      finalReport.contract.average = tempObj.average;
      finalReport.contract.detail = tempObj.detail;
      // 계약 형태 보고서를 생성하고 추가합니다.

      tempObj = this.reportMovingDay();
      finalReport.movingDay = {};
      finalReport.movingDay.average = tempObj.average;
      finalReport.movingDay.detail = tempObj.detail;
      // 이동 일자 보고서를 생성하고 추가합니다.

      return finalReport;
      // 최종 보고서를 반환합니다.
    }

  }

  // RequestsTong 및 SqlModel, SqlTong, SqlTongFactor 등 다양한 유틸리티 클래스가 추가되어 있습니다.
  // 이들 클래스는 주로 고객 데이터를 SQL 쿼리로 변환하고 이를 관리하는 데 사용됩니다.
  
  return Clients;
  // 수정된 Clients 배열을 반환합니다.
}

module.exports = { ClientMap, Client, Clients, Tools: { withTools, withToolsArr } };