const AspirantSampleData = {
  // 신청자 ID
  "aspid": "a2404_aa03s",
  // 신청자 이름
  "designer": "김윤아",
  // 신청자 전화번호
  "phone": "010-7303-6343",
  // 신청자 성별
  "gender": "여성",
  // 신청자 생년월일
  "birth": new Date("1996-03-05T15:00:00.000Z"),
  // 신청자 주소
  "address": "서울 마포구 염리동 141-1 4층",
  // 신청자 이메일 주소
  "email": "kjh41000@naver.com",
  // 미팅 관련 정보
  "meeting": {
    // 미팅 날짜
    "date": new Date(1800, 0, 1), // 아직 미팅이 예정되지 않았음을 의미
    // 미팅 상태
    "status": "드랍", // 현재 상태는 "드랍" 상태
    // 미팅 메모
    "memo": "주거 포트폴리오 확인 어려움, 추가 자료 요청",
    // 공통 미팅 정보
    "common": {
      // 공통 미팅 날짜
      "date": new Date(1800, 0, 1),
      // 공통 미팅 상태
      "status": "",
      // 추가 정보
      "eight": []
    }
  },
  // 캘린더 관련 정보
  "calendar": {
    // 캘린더 어미 정보 (Mother 메서드 관련)
    "mother": "designerMeeting",
    // 캘린더 ID
    "id": ""
  },
  // 포트폴리오 정보 (현재는 없음)
  "portfolio": [],
  // 제출 상태 관련 정보
  "submit": {
    // 발표 관련 제출 상태
    "presentation": {
      "date": new Date(1800, 0, 1), // 아직 제출되지 않음
      "boo": false // 발표 자료 미제출
    },
    // 파트너십 관련 제출 상태
    "partnership": {
      "date": new Date("2024-04-04T08:42:51.736Z"), // 파트너십 제출일
      "boo": true // 파트너십 제출 완료
    },
    // 최초 요청 관련 정보
    "firstRequest": {
      "date": new Date("2024-04-04T08:42:51.736Z"), // 최초 요청 날짜
      "method": "partnership" // 요청 방식은 파트너십
    },
    // 문서 제출 상태
    "documents": {
      "date": new Date(1800, 0, 1), // 문서 제출되지 않음
      "boo": false // 문서 미제출
    },
    // 등록 관련 제출 상태
    "registration": {
      "date": new Date(1800, 0, 1), // 등록 미완료
      "boo": false // 등록 미제출
    },
    // 미팅 관련 제출 상태
    "meeting": {
      "date": new Date(1800, 0, 1), // 미팅 날짜 미정
      "boo": false // 미팅 미진행
    },
    // 신청 경로
    "comeFrom": ""
  },
  // 기타 정보
  "information": {
    // 회사 정보
    "company": {
      // 회사 이름
      "name": "프리랜서",
      // 회사 분류
      "classification": "프리랜서",
      // 사업자 번호
      "businessNumber": "960306",
      // 대표자 이름
      "representative": "김윤아",
      // 사업 시작일
      "start": new Date("2024-04-03T15:00:00.000Z")
    },
    // 계좌 정보
    "account": {
      // 은행 이름
      "bank": "우리은행",
      // 계좌 번호
      "number": "1002258794239",
      // 예금주
      "to": "김윤아",
      // 기타 정보
      "etc": ""
    },
    // 경력 정보
    "career": {
      // 인테리어 경력
      "interior": {
        "year": 0, // 경력 연수
        "month": 0 // 경력 월수
      },
      // 스타일링 경력
      "styling": {
        "year": 0, // 경력 연수
        "month": 0 // 경력 월수
      },
      // 상세 경력
      "detail": [
        {
          // 회사명
          "company": "헤르메스 디자인",
          // 팀명
          "team": "공간기획팀",
          // 역할
          "role": "기획, 설계 및 3D",
          // 태그
          "tag": "건축 설계",
          // 근무 기간
          "date": {
            "start": new Date("2023-11-30T15:00:00.000Z"),
            "end": new Date("3799-12-31T15:00:00.000Z") // 현재 근무 중을 의미
          }
        },
        {
          "company": "디오디자인",
          "team": "공간디자인팀",
          "role": "브랜드 설계 및 3D, 현장감리",
          "tag": "리모델링",
          "date": {
            "start": new Date("2023-06-30T15:00:00.000Z"),
            "end": new Date("2023-11-30T15:00:00.000Z") // 종료된 근무
          }
        }
      ],
      // 학력 정보
      "school": [
        {
          "school": "신안산대학교",
          "major": "국제비서학과",
          "date": {
            "start": new Date("2016-02-29T15:00:00.000Z"), // 입학일
            "end": new Date("2019-01-31T15:00:00.000Z") // 졸업일
          }
        }
      ],
      // 자기소개
      "about": "공간기획을 통해 홈스타일에 관한 지원을 희망하는 이유 중 가장 큰 것은..."
    },
    // 채널 정보
    "channel": {
      // 웹 관련 정보
      "web": [],
      // SNS 관련 정보
      "sns": [
        "https:www.instagram.comuyuona_"
      ],
      // 클라우드 관련 정보
      "cloud": []
    }
  },
  // 응답 관련 정보
  "response": {
    // 응답 날짜
    "date": new Date(1800, 0, 1), // 응답 없음
    // 장기 메모
    "long": "45 \n추가 포트폴리오 요청\n일단 3D라도 보내주시기로\n태도가 좋으신거같음",
    // 탈락 사유
    "outreason": "",
    // 담당자
    "manager": "리에종",
    // 초기 상태
    "first": {
      "status": "불합격", // 초기 상태는 불합격
      "reason": "" // 불합격 사유 없음
    },
    // 포트폴리오 관련 상태
    "portfolio": {
      "summary": "",
      // 적합성 상태
      "proper": {
        "status": 0,
        "remodeling": false,
        "styling": false
      },
      // 준비 상태
      "ready": {
        "home": false,
        "furnishing": false,
        "set": false
      },
      // 추가 요청 상태
      "plus": {
        "needs": false,
        "request": new Date(1800, 0, 1),
        "photo": new Date(1800, 0, 1)
      }
    }
  },
  // 계약 관련 정보
  "contract": {
    // 파트너십 계약 정보
    "partnership": {
      "date": new Date(1800, 0, 1), // 아직 계약되지 않음
      "id": "" // 계약 ID 없음
    },
    // 디자이너 계약 정보
    "designer": {
      "date": new Date(1800, 0, 1), // 아직 계약되지 않음
      "id": "" // 계약 ID 없음
    }
  }
}

/**
 * AspirantMap 객체는 디자이너 신청자에 대한 스키마를 정의하고, 기본값을 설정하는 기능을 제공합니다.
 * 이 객체는 main 메서드와 sub 메서드로 구성되어 있으며, 각각 기본 구조와 특정 주제에 대한 데이터를 생성합니다.
 */
const AspirantMap = {
  /**
   * main 메서드는 디자이너 신청자에 대한 기본 구조를 정의하고, 
   * 모든 필드에 대한 기본값을 설정합니다.
   * @returns {Object} 기본값이 설정된 신청자 스키마 객체
   */
  main: function () {
    // dummy 변수를 선언하여 반환할 객체의 초기 상태를 정의합니다.
    let dummy;
    // dummy 변수에 신청자 구조체를 할당합니다.
    dummy = {
      structure: {
        // aspid는 신청자 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
        aspid: "",
        // designer는 디자이너 이름을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
        designer: "",
        // phone은 신청자의 전화번호를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
        phone: "",
        // gender는 신청자의 성별을 나타냅니다. 기본값은 "여성"입니다.
        gender: "여성",
        // birth는 신청자의 생년월일을 나타냅니다. 기본값은 1800년 1월 1일입니다.
        birth: new Date(1800, 0, 1),
        // address는 신청자의 주소를 나타냅니다. 기본값은 빈 문자열입니다.
        address: "",
        // email은 신청자의 이메일 주소를 나타냅니다. 기본값은 빈 문자열입니다.
        email: "",
        // meeting은 미팅 정보에 대한 필드입니다.
        meeting: {
          // 미팅 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
          date: new Date(1800, 0, 1),
          // 미팅 상태를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
          status: "",
          // 미팅에 대한 메모를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          memo: "",
          // common은 미팅에 대한 공통 정보를 저장하는 객체입니다.
          common: {
            // 공통 정보의 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 공통 정보의 상태를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            status: "",
            // eight 필드는 공통 정보와 관련된 배열 데이터를 저장합니다. 기본값은 빈 배열입니다.
            eight: [],
          },
        },
        // calendar는 일정 관리와 관련된 정보를 저장합니다.
        calendar: {
          // mother 필드는 관련된 모체 데이터를 가리킵니다. 기본값은 "designerMeeting"입니다.
          mother: "designerMeeting",
          // id 필드는 일정의 고유 ID를 나타냅니다. 기본값은 빈 문자열입니다.
          id: "",
        },
        // portfolio는 디자이너의 포트폴리오를 저장하는 배열입니다. 기본값은 빈 배열입니다.
        portfolio: [],
        // submit은 디자이너 신청과 관련된 다양한 제출 정보를 포함합니다.
        submit: {
          // presentation은 발표 자료 제출에 대한 정보를 저장합니다.
          presentation: {
            // 발표 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 발표 자료 제출 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
            boo: false
          },
          // partnership은 파트너십 신청에 대한 정보를 저장합니다.
          partnership: {
            // 파트너십 신청 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 파트너십 신청 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
            boo: false
          },
          // firstRequest는 첫 요청에 대한 정보를 저장합니다.
          firstRequest: {
            // 첫 요청 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 첫 요청 방식을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            method: "",
          },
          // documents는 문서 제출에 대한 정보를 저장합니다.
          documents: {
            // 문서 제출 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 문서 제출 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
            boo: false,
          },
          // registration은 등록 관련 정보를 저장합니다.
          registration: {
            // 등록 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 등록 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
            boo: false,
          },
          // meeting은 미팅 관련 정보를 저장합니다.
          meeting: {
            // 미팅 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 미팅 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
            boo: false,
          },
          // comeFrom은 신청 경로를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
          comeFrom: "",
        },
        // information은 신청자와 관련된 추가 정보를 저장하는 필드입니다.
        information: {
          // company는 회사 정보를 저장합니다.
          company: {
            // 회사 이름을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            name: "",
            // 회사의 분류(유형)를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            classification: "",
            // 회사의 사업자 번호를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            businessNumber: "",
            // 회사 대표자의 이름을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            representative: "",
            // 회사 시작일을 나타내며 기본값은 1800년 1월 1일입니다.
            start: new Date(1800, 0, 1),
          },
          // account는 신청자의 은행 계좌 정보를 저장합니다.
          account: {
            // 은행 이름을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            bank: "",
            // 계좌 번호를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            number: "",
            // 계좌 수신자 이름을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            to: "",
            // 기타 계좌 정보를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            etc: "",
          },
          // career는 신청자의 경력 정보를 저장합니다.
          career: {
            // interior는 인테리어 경력을 저장하는 필드입니다.
            interior: {
              // 경력 연도를 나타내며 기본값은 0입니다.
              year: 0,
              // 경력 개월을 나타내며 기본값은 0입니다.
              month: 0
            },
            // styling은 스타일링 경력을 저장하는 필드입니다.
            styling: {
              // 경력 연도를 나타내며 기본값은 0입니다.
              year: 0,
              // 경력 개월을 나타내며 기본값은 0입니다.
              month: 0
            },
            // detail은 경력 상세 정보를 저장하는 배열입니다. 기본값은 빈 배열입니다.
            detail: [],
            // school은 학력 정보를 저장하는 배열입니다. 기본값은 빈 배열입니다.
            school: [],
            // about 필드는 자기소개나 지원 동기와 같은 정보를 저장합니다. 기본값은 빈 문자열입니다.
            about: "",
          },
          // channel은 신청자가 사용하는 웹, SNS, 클라우드 등의 채널 정보를 저장합니다.
          channel: {
            // 웹사이트 링크 정보를 저장하는 배열입니다. 기본값은 빈 배열입니다.
            web: [],
            // SNS 링크 정보를 저장하는 배열입니다. 기본값은 빈 배열입니다.
            sns: [],
            // 클라우드 링크 정보를 저장하는 배열입니다. 기본값은 빈 배열입니다.
            cloud: []
          }
        },
        // response는 심사 결과와 응답에 관한 정보를 저장하는 필드입니다.
        response: {
          // 응답 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
          date: new Date(1800, 0, 1),
          // 응답에 대한 상세 정보를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          long: "",
          // 탈락 이유를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
          outreason: "",
          // 심사 담당자의 이름을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          manager: "",
          // 첫 응답에 대한 상태와 이유를 저장하는 필드입니다.
          first: {
            // 응답 상태를 나타내며 기본값은 "검토중"입니다.
            status: "검토중",
            // 응답 이유를 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            reason: "",
          },
          // portfolio 필드는 포트폴리오 관련 응답 정보를 저장합니다.
          portfolio: {
            // 요약 정보를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            summary: "",
            // proper 필드는 적절성에 대한 정보를 저장하는 객체입니다.
            proper: {
              // 적절성 상태를 나타내는 숫자 값입니다. 기본값은 0입니다.
              status: 0,
              // 리모델링 적합 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              remodeling: false,
              // 스타일링 적합 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              styling: false,
            },
            // ready 필드는 준비 여부를 나타내는 객체입니다.
            ready: {
              // 홈 준비 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              home: false,
              // 가구 준비 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              furnishing: false,
              // 세트 준비 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              set: false,
            },
            // plus 필드는 추가 요구 사항을 저장하는 객체입니다.
            plus: {
              // 요구 사항 충족 여부를 나타내는 불리언 값입니다. 기본값은 false입니다.
              needs: false,
              // 요구 사항 요청 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
              request: new Date(1800, 0, 1),
              // 요구 사항 사진을 저장한 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
              photo: new Date(1800, 0, 1),
            }
          },
        },
        // contract는 계약과 관련된 정보를 저장하는 필드입니다.
        contract: {
          // partnership 필드는 파트너십 계약 정보를 저장합니다.
          partnership: {
            // 계약 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 계약 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            id: "",
          },
          // designer 필드는 디자이너 계약 정보를 저장합니다.
          designer: {
            // 계약 날짜를 나타내며 기본값은 1800년 1월 1일입니다.
            date: new Date(1800, 0, 1),
            // 계약 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            id: "",
          },
        }
      }
    };
    // 생성된 기본값 객체를 반환합니다.
    return dummy;
  },
  
  /**
   * sub 메서드는 주어진 주제(subject)에 따라 다른 구조의 데이터를 반환합니다.
   * 주제에 따라 포트폴리오나 미팅의 공통 정보를 생성합니다.
   * @param {string} subject - 생성할 데이터의 주제를 지정합니다.
   * @returns {Object|null} 주제에 따라 생성된 데이터 객체 또는 null
   */
  sub: function (subject) {
    // dummy 변수를 null로 초기화합니다.
    let dummy = null;
    // 주제가 'portfolio'일 경우, 포트폴리오 구조체를 생성합니다.
    if (subject === "portfolio") {
      dummy = {
        // 포트폴리오 제출 날짜를 현재 날짜로 설정합니다.
        date: new Date(),
        // 확인 배열을 초기화합니다.
        confirm: [
          {
            // 확인 날짜를 현재 날짜로 설정합니다.
            date: new Date(),
            // 확인한 사람을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
            who: "",
          }
        ],
        // Google Drive의 폴더 ID를 나타내는 필드입니다.
        folderId: "1j-mLXZszbWNqq_xhXVPtm4MW5QOm5sZ2"
      };
    // 주제가 'meeting.common.eight'일 경우, 미팅의 공통 정보를 생성합니다.
    } else if (subject === "meeting.common.eight") {
      dummy = {
        // 미팅의 날짜를 현재 날짜로 설정합니다.
        date: new Date(),
        // 미팅의 우선순위를 나타내는 필드입니다. 기본값은 0입니다.
        priority: 0,
        // 미팅 이름을 나타내는 필드입니다. 기본값은 빈 문자열입니다.
        name: "",
      };
    }
    // 생성된 구조체를 반환하거나, 주제에 해당하는 데이터가 없으면 null을 반환합니다.
    return dummy;
  }
};

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
 * @class Aspirant
 * 디자이너 신청자 정보를 처리하는 클래스입니다.
 * JSON 데이터를 받아 해당 정보를 처리하고, 필요한 데이터를 변환하거나 반환하는 메서드를 포함합니다.
 */
class Aspirant {

  /**
   * @constructor
   * JSON 데이터를 기반으로 Aspirant 객체를 초기화합니다.
   * @param {Object} json - 신청자 정보를 담고 있는 JSON 객체
   */
  constructor(json) {
    // 신청자 ID를 json에서 가져와 this.aspid에 저장합니다.
    this.aspid = json.aspid;
    // 디자이너 이름을 json에서 가져와 this.designer에 저장합니다.
    this.designer = json.designer;
    // 전화번호를 json에서 가져와 this.phone에 저장합니다.
    this.phone = json.phone;
    // 성별을 json에서 가져와 this.gender에 저장합니다.
    this.gender = json.gender;
    // 생년월일을 json에서 가져와 this.birth에 저장합니다.
    // DateParse는 날짜를 처리하기 위해 확장된 클래스입니다.
    this.birth = new DateParse(json.birth);
    // 주소를 json에서 가져와 this.address에 저장합니다.
    this.address = json.address;
    // 이메일을 json에서 가져와 this.email에 저장합니다.
    this.email = json.email;
    // 미팅 정보를 json에서 가져와 this.meeting에 저장합니다.
    // #AspirantMeeting은 미팅 정보를 처리하는 내부 클래스입니다.
    this.meeting = new this.#AspirantMeeting(json.meeting);
    // 캘린더 정보를 json에서 가져와 this.calendar에 저장합니다.
    // #AspirantCalendar은 캘린더 정보를 처리하는 내부 클래스입니다.
    this.calendar = new this.#AspirantCalendar(json.calendar);
    // 포트폴리오 정보를 json에서 가져와 this.portfolio에 저장합니다.
    // #AspirantPortfolio은 포트폴리오 정보를 처리하는 내부 클래스입니다.
    this.portfolio = new this.#AspirantPortfolio(json.portfolio);
    // 제출 정보를 json에서 가져와 this.submit에 저장합니다.
    // #AspirantSubmit은 제출 정보를 처리하는 내부 클래스입니다.
    this.submit = new this.#AspirantSubmit(json.submit);
    // 추가 정보를 json에서 가져와 this.information에 저장합니다.
    // #AspirantInformation은 추가 정보를 처리하는 내부 클래스입니다.
    this.information = new this.#AspirantInformation(json.information);
    // 응답 정보를 json에서 가져와 this.response에 저장합니다.
    // #AspirantResponse은 응답 정보를 처리하는 내부 클래스입니다.
    this.response = new this.#AspirantResponse(json.response);
    // 계약 정보를 json에서 가져와 this.contract에 저장합니다.
    // #AspirantContract은 계약 정보를 처리하는 내부 클래스입니다.
    this.contract = new this.#AspirantContract(json.contract);
  }

  /**
   * @method toNormal
   * 현재 객체의 모든 속성을 일반 JavaScript 객체로 변환합니다.
   * @returns {Object} 변환된 객체
   */
  toNormal() {
    // 변환된 객체를 저장할 obj를 선언합니다.
    let obj = {};
    // 신청자 ID를 obj에 저장합니다.
    obj.aspid = this.aspid;
    // 디자이너 이름을 obj에 저장합니다.
    obj.designer = this.designer;
    // 전화번호를 obj에 저장합니다.
    obj.phone = this.phone;
    // 성별을 obj에 저장합니다.
    obj.gender = this.gender;
    // 생년월일을 obj에 저장합니다. DateParse 클래스의 toNormal 메서드를 통해 일반 날짜 객체로 변환됩니다.
    obj.birth = this.birth.toNormal();
    // 주소를 obj에 저장합니다.
    obj.address = this.address;
    // 이메일을 obj에 저장합니다.
    obj.email = this.email;
    // 미팅 정보를 obj에 저장합니다. 미팅 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.meeting = this.meeting.toNormal();
    // 캘린더 정보를 obj에 저장합니다. 캘린더 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.calendar = this.calendar.toNormal();
    // 포트폴리오 정보를 obj에 저장합니다. 포트폴리오 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.portfolio = this.portfolio.toNormal();
    // 제출 정보를 obj에 저장합니다. 제출 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.submit = this.submit.toNormal();
    // 추가 정보를 obj에 저장합니다. 추가 정보 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.information = this.information.toNormal();
    // 응답 정보를 obj에 저장합니다. 응답 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.response = this.response.toNormal();
    // 계약 정보를 obj에 저장합니다. 계약 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
    obj.contract = this.contract.toNormal();
    // 변환된 객체를 반환합니다.
    return obj;
  }

  /**
   * @method firstRequest
   * 첫 요청 날짜를 반환합니다.
   * @returns {Date} 첫 요청 날짜
   */
  firstRequest() {
    // 제출 객체 내 첫 요청 날짜를 반환합니다.
    return this.submit.firstRequest.date;
  }

  /**
   * @method meetingAlarm
   * 미팅 알람을 설정하고, 필요한 정보를 반환합니다.
   * @returns {Object|null} 미팅 알람 정보 또는 null
   */
  meetingAlarm() {
    // 오늘 날짜를 today에 저장합니다.
    const today = new Date();
    // 요일을 한글로 변환하기 위한 배열을 선언합니다.
    const dayConvert = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    // 날짜 객체를 문자열로 변환하는 함수 dateToString을 선언합니다.
    const dateToString = function (dateObject) {
      // 날짜를 "월 일 요일 시간" 형식으로 변환하여 반환합니다.
      return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} ${dateObject.getHours()}시`;
    }
    // 미팅 알람의 기준 날짜를 설정할 standard 변수를 선언합니다.
    let obj, standard;

    // 오늘이 목요일(4일)일 경우, 4일 후의 날짜를 standard로 설정합니다.
    if (today.getDay() === 4) {
      standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 4));
    // 오늘이 금요일(5일)일 경우, 4일 후의 날짜를 standard로 설정합니다.
    } else if (today.getDay() === 5) {
      standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 4));
    // 오늘이 토요일(6일)일 경우, standard를 null로 설정합니다.
    } else if (today.getDay() === 6) {
      standard = null;
    // 오늘이 일요일(0일)일 경우, standard를 null로 설정합니다.
    } else if (today.getDay() === 0) {
      standard = null;
    // 그 외의 요일일 경우, 2일 후의 날짜를 standard로 설정합니다.
    } else {
      standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 2));
    }

    // 미팅 알람 정보를 저장할 객체 obj를 선언합니다.
    obj = {
      // 디자이너 이름을 obj에 저장합니다.
      name: this.designer,
      // 디자이너 전화번호를 obj에 저장합니다.
      phone: this.phone,
      // 미팅 날짜를 obj에 저장합니다.
      date: this.meeting.date,
      // 미팅 상태를 날짜와 비교하여 설정합니다.
      status: ((this.meeting.date.valueOf() <= today.valueOf()) ? "미팅 완료" : "미팅 대기"),
      // 미팅 날짜를 문자열로 변환하여 obj에 저장합니다.
      dateString: dateToString(this.meeting.date),
    };

    // standard가 null이 아닐 경우, 미팅 날짜가 알람 기준 날짜와 일치하는지 확인하고 obj.alarm에 저장합니다.
    if (standard !== null) {
      obj.alarm = (standard.getFullYear() === this.meeting.date.getFullYear() && standard.getMonth() === this.meeting.date.getMonth() && standard.getDate() === this.meeting.date.getDate());
    } else {
      // 알람이 설정되지 않은 경우 obj.alarm에 false를 저장합니다.
      obj.alarm = false;
    }

    // 미팅 날짜가 2000년 이전일 경우, null을 반환합니다.
    if (this.meeting.date.getFullYear() < 2000) {
      return null;
    } else {
      // 그렇지 않으면 미팅 알람 객체를 반환합니다.
      return obj;
    }
  }

  /**
   * @class #AspirantContract
   * 계약 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantContract = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 계약 정보를 초기화합니다.
     * @param {Object} json - 계약 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 파트너십 계약 정보를 초기화합니다.
      this.partnership = new this.#AspirantContractPartnership(json.partnership);
      // 디자이너 계약 정보를 초기화합니다.
      this.designer = new this.#AspirantContractDesigner(json.designer);
    }

    /**
     * @method toNormal
     * 계약 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 계약 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 파트너십 계약 정보를 obj에 저장합니다.
      obj.partnership = this.partnership.toNormal();
      // 디자이너 계약 정보를 obj에 저장합니다.
      obj.designer = this.designer.toNormal();
      // 변환된 계약 정보 객체를 반환합니다.
      return obj;
    }

    /**
     * @class #AspirantContractPartnership
     * 파트너십 계약 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantContractPartnership = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 파트너십 계약 정보를 초기화합니다.
       * @param {Object} json - 파트너십 계약 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 계약 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 계약 ID를 초기화합니다.
        this.id = json.id;
      }

      /**
       * @method toNormal
       * 파트너십 계약 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 파트너십 계약 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 계약 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 계약 ID를 obj에 저장합니다.
        obj.id = this.id;
        // 변환된 파트너십 계약 정보 객체를 반환합니다.
        return obj;
      }
    }

    /**
     * @class #AspirantContractDesigner
     * 디자이너 계약 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantContractDesigner = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 디자이너 계약 정보를 초기화합니다.
       * @param {Object} json - 디자이너 계약 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 계약 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 계약 ID를 초기화합니다.
        this.id = json.id;
      }

      /**
       * @method toNormal
       * 디자이너 계약 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 디자이너 계약 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 계약 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 계약 ID를 obj에 저장합니다.
        obj.id = this.id;
        // 변환된 디자이너 계약 정보 객체를 반환합니다.
        return obj;
      }
    }
  }

  /**
   * @class #AspirantMeeting
   * 미팅 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantMeeting = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 미팅 정보를 초기화합니다.
     * @param {Object} json - 미팅 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 미팅 상태를 초기화합니다.
      this.status = json.status;
      // 미팅 날짜를 DateParse 클래스를 통해 처리합니다.
      this.date = new DateParse(json.date);
      // 미팅 메모를 초기화합니다.
      this.memo = json.memo;
      // 공통 미팅 정보를 초기화합니다.
      this.common = new this.#AspirantMeetingCommon(json.common);
    }
  
    /**
     * @method toNormal
     * 미팅 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 미팅 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 미팅 상태를 obj에 저장합니다.
      obj.status = this.status;
      // 미팅 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
      obj.date = this.date.toNormal();
      // 미팅 메모를 obj에 저장합니다.
      obj.memo = this.memo;
      // 공통 미팅 정보를 obj에 저장합니다. 공통 미팅 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
      obj.common = this.common.toNormal();
      // 변환된 미팅 정보 객체를 반환합니다.
      return obj;
    }
  
    /**
     * @class #AspirantMeetingCommon
     * 미팅 공통 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantMeetingCommon = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 미팅 공통 정보를 초기화합니다.
       * @param {Object} json - 미팅 공통 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 공통 정보의 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 공통 정보의 상태를 초기화합니다.
        this.status = json.status;
        // 공통 정보와 관련된 배열 데이터를 초기화합니다.
        this.eight = new this.#AspirantMeetingEightMatrix(json.eight);
      }
  
      /**
       * @method toNormal
       * 미팅 공통 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 미팅 공통 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 공통 정보의 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 공통 정보의 상태를 obj에 저장합니다.
        obj.status = this.status;
        // 공통 정보와 관련된 배열 데이터를 obj에 저장합니다.
        obj.eight = this.eight.toNormal();
        // 변환된 미팅 공통 정보 객체를 반환합니다.
        return obj;
      }
  
      /**
       * @class #AspirantMeetingEightMatrix
       * 미팅 공통 정보와 관련된 배열 데이터를 처리하는 내부 클래스입니다.
       * Array를 확장하여 추가 기능을 제공합니다.
       */
      #AspirantMeetingEightMatrix = class extends Array {
        /**
         * @constructor
         * JSON 배열 데이터를 기반으로 초기화합니다.
         * @param {Array} json - 미팅 공통 정보와 관련된 배열 데이터
         */
        constructor(json) {
          // 상위 클래스(Array)의 생성자를 호출합니다.
          super();
          // JSON 배열 데이터를 순회하며, 요소를 #AspirantMeetingEightMatrixFactor 인스턴스로 변환하여 배열에 추가합니다.
          for (let i of json) {
            this.push(new this.#AspirantMeetingEightMatrixFactor(i));
          }
        }
  
        /**
         * @method toNormal
         * 배열 데이터를 일반 배열로 변환합니다.
         * @returns {Array} 변환된 배열
         */
        toNormal() {
          // 변환된 배열을 저장할 arr을 선언합니다.
          let arr = [];
          // 배열의 각 요소를 순회하며, toNormal 메서드를 호출하여 일반 객체로 변환합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          // 변환된 배열을 반환합니다.
          return arr;
        }
  
        /**
         * @class #AspirantMeetingEightMatrixFactor
         * 미팅 공통 정보와 관련된 배열 요소를 처리하는 내부 클래스입니다.
         */
        #AspirantMeetingEightMatrixFactor = class {
          /**
           * @constructor
           * JSON 데이터를 기반으로 배열 요소를 초기화합니다.
           * @param {Object} json - 배열 요소 데이터를 담고 있는 JSON 객체
           */
          constructor(json) {
            // 배열 요소의 날짜를 DateParse 클래스를 통해 처리합니다.
            this.date = new DateParse(json.date);
            // 배열 요소의 우선순위를 초기화합니다.
            this.priority = json.priority;
            // 배열 요소의 이름을 초기화합니다.
            this.name = json.name;
          }
  
          /**
           * @method toNormal
           * 배열 요소 데이터를 일반 객체로 변환합니다.
           * @returns {Object} 변환된 배열 요소 객체
           */
          toNormal() {
            // 변환된 객체를 저장할 obj를 선언합니다.
            let obj = {};
            // 배열 요소의 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
            obj.date = this.date.toNormal();
            // 배열 요소의 우선순위를 obj에 저장합니다.
            obj.priority = this.priority;
            // 배열 요소의 이름을 obj에 저장합니다.
            obj.name = this.name;
            // 변환된 배열 요소 객체를 반환합니다.
            return obj;
          }
        };
      };
    };
  }
  
  /**
   * @class #AspirantCalendar
   * 캘린더 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantCalendar = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 캘린더 정보를 초기화합니다.
     * @param {Object} json - 캘린더 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 캘린더의 모체 데이터를 초기화합니다.
      this.mother = json.mother;
      // 캘린더의 ID를 초기화합니다.
      this.id = json.id;
    }
  
    /**
     * @method toNormal
     * 캘린더 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 캘린더 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 캘린더 모체 데이터를 obj에 저장합니다.
      obj.status = this.mother;
      // 캘린더 ID를 obj에 저장합니다.
      obj.date = this.id;
      // 변환된 캘린더 정보 객체를 반환합니다.
      return obj;
    }
  }
  
  /**
   * @class #AspirantInformation
   * 신청자 추가 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantInformation = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 신청자 추가 정보를 초기화합니다.
     * @param {Object} json - 신청자 추가 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 회사 정보를 초기화합니다.
      this.company = new this.#Company(json.company);
      // 계좌 정보를 초기화합니다.
      this.account = new this.#Account(json.account);
      // 경력 정보를 초기화합니다.
      this.career = new this.#Career(json.career);
      // 채널 정보를 초기화합니다.
      this.channel = new this.#Channel(json.channel);
    }
  
    /**
     * @method toNormal
     * 신청자 추가 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 추가 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 회사 정보를 obj에 저장합니다.
      obj.company = this.company.toNormal();
      // 계좌 정보를 obj에 저장합니다.
      obj.account = this.account.toNormal();
      // 경력 정보를 obj에 저장합니다.
      obj.career = this.career.toNormal();
      // 채널 정보를 obj에 저장합니다.
      obj.channel = this.channel.toNormal();
      // 변환된 추가 정보 객체를 반환합니다.
      return obj;
    }
  
    /**
     * @class #Company
     * 회사 정보를 처리하는 내부 클래스입니다.
     */
    #Company = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 회사 정보를 초기화합니다.
       * @param {Object} json - 회사 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 회사 이름을 초기화합니다.
        this.name = json.name;
        // 회사 분류를 초기화합니다.
        this.classification = json.classification;
        // 사업자 번호를 초기화합니다.
        this.businessNumber = json.businessNumber;
        // 회사 대표자를 초기화합니다.
        this.representative = json.representative;
        // 회사 시작일을 DateParse 클래스를 통해 처리합니다.
        this.start = new DateParse(json.start);
      }
  
      /**
       * @method toNormal
       * 회사 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 회사 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 회사 이름을 obj에 저장합니다.
        obj.name = this.name;
        // 회사 분류를 obj에 저장합니다.
        obj.classification = this.classification;
        // 사업자 번호를 obj에 저장합니다.
        obj.businessNumber = this.businessNumber;
        // 회사 대표자를 obj에 저장합니다.
        obj.representative = this.representative;
        // 회사 시작일을 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.start = this.start.toNormal();
        // 변환된 회사 정보 객체를 반환합니다.
        return obj;
      }
    };
  
    /**
     * @class #Account
     * 계좌 정보를 처리하는 내부 클래스입니다.
     */
    #Account = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 계좌 정보를 초기화합니다.
       * @param {Object} json - 계좌 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 은행 이름을 초기화합니다.
        this.bank = json.bank;
        // 계좌 번호를 초기화합니다.
        this.number = json.number;
        // 수취인을 초기화합니다.
        this.to = json.to;
        // 기타 정보를 초기화합니다.
        this.etc = json.etc;
      }
  
      /**
       * @method toNormal
       * 계좌 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 계좌 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 은행 이름을 obj에 저장합니다.
        obj.bank = this.bank;
        // 계좌 번호를 obj에 저장합니다.
        obj.number = this.number;
        // 수취인을 obj에 저장합니다.
        obj.to = this.to;
        // 기타 정보를 obj에 저장합니다.
        obj.etc = this.etc;
        // 변환된 계좌 정보 객체를 반환합니다.
        return obj;
      }
    };
  
    /**
     * @class #Career
     * 경력 정보를 처리하는 내부 클래스입니다.
     */
    #Career = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 경력 정보를 초기화합니다.
       * @param {Object} json - 경력 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 인테리어 경력을 초기화합니다.
        this.interior = new this.#CareerYearMonth(json.interior);
        // 스타일링 경력을 초기화합니다.
        this.styling = new this.#CareerYearMonth(json.styling);
        // 경력 상세 정보를 초기화합니다.
        this.detail = new this.#CareerDetail(json.detail);
        // 학력 정보를 초기화합니다.
        this.school = new this.#SchoolDetail(json.school);
        // 자기소개 또는 지원 동기를 초기화합니다.
        this.about = json.about;
      }
  
      /**
       * @method toNormal
       * 경력 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 경력 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 인테리어 경력을 obj에 저장합니다.
        obj.interior = this.interior.toNormal();
        // 스타일링 경력을 obj에 저장합니다.
        obj.styling = this.styling.toNormal();
        // 경력 상세 정보를 obj에 저장합니다.
        obj.detail = this.detail.toNormal();
        // 학력 정보를 obj에 저장합니다.
        obj.school = this.school.toNormal();
        // 자기소개 또는 지원 동기를 obj에 저장합니다.
        obj.about = this.about;
        // 변환된 경력 정보 객체를 반환합니다.
        return obj;
      }
  
      /**
       * @class #CareerYearMonth
       * 경력 기간(년, 월)을 처리하는 내부 클래스입니다.
       */
      #CareerYearMonth = class {
        /**
         * @constructor
         * JSON 데이터를 기반으로 경력 기간을 초기화합니다.
         * @param {Object} json - 경력 기간 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          // 경력 연도를 초기화합니다.
          this.year = json.year;
          // 경력 개월 수를 초기화합니다.
          this.month = json.month;
        }
  
        /**
         * @method toNormal
         * 경력 기간을 일반 객체로 변환합니다.
         * @returns {Object} 변환된 경력 기간 객체
         */
        toNormal() {
          // 변환된 객체를 저장할 obj를 선언합니다.
          let obj = {};
          // 경력 연도를 obj에 저장합니다.
          obj.year = this.year;
          // 경력 개월 수를 obj에 저장합니다.
          obj.month = this.month;
          // 변환된 경력 기간 객체를 반환합니다.
          return obj;
        }
      };
  
      /**
       * @class #CareerDetail
       * 경력 상세 정보를 처리하는 내부 클래스입니다.
       * Array를 확장하여 추가 기능을 제공합니다.
       */
      #CareerDetail = class extends Array {
        /**
         * @constructor
         * JSON 배열 데이터를 기반으로 초기화합니다.
         * @param {Array} json - 경력 상세 정보를 담고 있는 JSON 배열
         */
        constructor(json) {
          // 상위 클래스(Array)의 생성자를 호출합니다.
          super();
          // 임시 변수를 선언합니다.
          let tempInstance;
          // JSON 배열 데이터를 순회하며, 요소를 #CareerDetailFactor 인스턴스로 변환하여 배열에 추가합니다.
          for (let i of json) {
            tempInstance = new this.#CareerDetailFactor(i);
            this.push(tempInstance);
          }
        }
  
        /**
         * @method toNormal
         * 경력 상세 정보를 일반 배열로 변환합니다.
         * @returns {Array} 변환된 경력 상세 정보 배열
         */
        toNormal() {
          // 변환된 배열을 저장할 arr을 선언합니다.
          let arr = [];
          // 배열의 각 요소를 순회하며, toNormal 메서드를 호출하여 일반 객체로 변환합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          // 변환된 경력 상세 정보 배열을 반환합니다.
          return arr;
        }
  
        /**
         * @class #CareerDetailFactor
         * 경력 상세 정보의 요소를 처리하는 내부 클래스입니다.
         */
        #CareerDetailFactor = class {
          /**
           * @constructor
           * JSON 데이터를 기반으로 경력 상세 정보의 요소를 초기화합니다.
           * @param {Object} json - 경력 상세 정보를 담고 있는 JSON 객체
           */
          constructor(json) {
            // 근무했던 회사 이름을 초기화합니다.
            this.company = json.company;
            // 근무했던 팀 이름을 초기화합니다.
            this.team = json.team;
            // 담당했던 역할을 초기화합니다.
            this.role = json.role;
            // 경력에 대한 태그를 초기화합니다.
            this.tag = json.tag;
            // 경력 기간 정보를 초기화합니다.
            this.date = new this.#CareerDetailFactorDate(json.date);
          }
  
          /**
           * @method toNormal
           * 경력 상세 정보의 요소를 일반 객체로 변환합니다.
           * @returns {Object} 변환된 경력 상세 정보 객체
           */
          toNormal() {
            // 변환된 객체를 저장할 obj를 선언합니다.
            let obj = {};
            // 근무했던 회사 이름을 obj에 저장합니다.
            obj.company = this.company;
            // 근무했던 팀 이름을 obj에 저장합니다.
            obj.team = this.team;
            // 담당했던 역할을 obj에 저장합니다.
            obj.role = this.role;
            // 경력에 대한 태그를 obj에 저장합니다.
            obj.tag = this.tag;
            // 경력 기간 정보를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
            obj.date = this.date.toNormal();
            // 변환된 경력 상세 정보 객체를 반환합니다.
            return obj;
          }
  
          /**
           * @class #CareerDetailFactorDate
           * 경력 기간 정보를 처리하는 내부 클래스입니다.
           */
          #CareerDetailFactorDate = class {
            /**
             * @constructor
             * JSON 데이터를 기반으로 경력 기간 정보를 초기화합니다.
             * @param {Object} json - 경력 기간 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
              // 경력 시작일을 DateParse 클래스를 통해 처리합니다.
              this.start = new DateParse(json.start);
              // 경력 종료일을 DateParse 클래스를 통해 처리합니다.
              this.end = new DateParse(json.end);
            }
  
            /**
             * @method toNormal
             * 경력 기간 정보를 일반 객체로 변환합니다.
             * @returns {Object} 변환된 경력 기간 객체
             */
            toNormal() {
              // 변환된 객체를 저장할 obj를 선언합니다.
              let obj = {};
              // 경력 시작일을 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
              obj.start = this.start.toNormal();
              // 경력 종료일을 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
              obj.end = this.end.toNormal();
              // 변환된 경력 기간 객체를 반환합니다.
              return obj;
            }
          };
        };
      };
  
      /**
       * @class #SchoolDetail
       * 학력 정보를 처리하는 내부 클래스입니다.
       * Array를 확장하여 추가 기능을 제공합니다.
       */
      #SchoolDetail = class extends Array {
        /**
         * @constructor
         * JSON 배열 데이터를 기반으로 초기화합니다.
         * @param {Array} json - 학력 정보를 담고 있는 JSON 배열
         */
        constructor(json) {
          // 상위 클래스(Array)의 생성자를 호출합니다.
          super();
          // 임시 변수를 선언합니다.
          let tempInstance;
          // JSON 배열 데이터를 순회하며, 요소를 #SchoolDetailFactor 인스턴스로 변환하여 배열에 추가합니다.
          for (let i of json) {
            tempInstance = new this.#SchoolDetailFactor(i);
            this.push(tempInstance);
          }
        }
  
        /**
         * @method toNormal
         * 학력 정보를 일반 배열로 변환합니다.
         * @returns {Array} 변환된 학력 정보 배열
         */
        toNormal() {
          // 변환된 배열을 저장할 arr을 선언합니다.
          let arr = [];
          // 배열의 각 요소를 순회하며, toNormal 메서드를 호출하여 일반 객체로 변환합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          // 변환된 학력 정보 배열을 반환합니다.
          return arr;
        }
  
        /**
         * @class #SchoolDetailFactor
         * 학력 정보의 요소를 처리하는 내부 클래스입니다.
         */
        #SchoolDetailFactor = class {
          /**
           * @constructor
           * JSON 데이터를 기반으로 학력 정보의 요소를 초기화합니다.
           * @param {Object} json - 학력 정보를 담고 있는 JSON 객체
           */
          constructor(json) {
            // 학교 이름을 초기화합니다.
            this.school = json.school;
            // 전공을 초기화합니다.
            this.major = json.major;
            // 학력 기간 정보를 초기화합니다.
            this.date = new this.#SchoolDetailFactorDate(json.date);
          }
  
          /**
           * @method toNormal
           * 학력 정보의 요소를 일반 객체로 변환합니다.
           * @returns {Object} 변환된 학력 정보 객체
           */
          toNormal() {
            // 변환된 객체를 저장할 obj를 선언합니다.
            let obj = {};
            // 학교 이름을 obj에 저장합니다.
            obj.school = this.school;
            // 전공을 obj에 저장합니다.
            obj.major = this.major;
            // 학력 기간 정보를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
            obj.date = this.date.toNormal();
            // 변환된 학력 정보 객체를 반환합니다.
            return obj;
          }
  
          /**
           * @class #SchoolDetailFactorDate
           * 학력 기간 정보를 처리하는 내부 클래스입니다.
           */
          #SchoolDetailFactorDate = class {
            /**
             * @constructor
             * JSON 데이터를 기반으로 학력 기간 정보를 초기화합니다.
             * @param {Object} json - 학력 기간 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
              // 학력 시작일을 DateParse 클래스를 통해 처리합니다.
              this.start = new DateParse(json.start);
              // 학력 종료일을 DateParse 클래스를 통해 처리합니다.
              this.end = new DateParse(json.end);
            }
  
            /**
             * @method toNormal
             * 학력 기간 정보를 일반 객체로 변환합니다.
             * @returns {Object} 변환된 학력 기간 객체
             */
            toNormal() {
              // 변환된 객체를 저장할 obj를 선언합니다.
              let obj = {};
              // 학력 시작일을 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
              obj.start = this.start.toNormal();
              // 학력 종료일을 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
              obj.end = this.end.toNormal();
              // 변환된 학력 기간 객체를 반환합니다.
              return obj;
            }
          };
        };
      };
    };
  
    /**
     * @class #Channel
     * 채널 정보를 처리하는 내부 클래스입니다.
     */
    #Channel = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 채널 정보를 초기화합니다.
       * @param {Object} json - 채널 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 웹 채널 정보를 초기화합니다.
        this.web = new this.#LinkArray(json.web);
        // SNS 채널 정보를 초기화합니다.
        this.sns = new this.#LinkArray(json.sns);
        // 클라우드 채널 정보를 초기화합니다.
        this.cloud = new this.#LinkArray(json.cloud);
      }
  
      /**
       * @method toNormal
       * 채널 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 채널 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 웹 채널 정보를 obj에 저장합니다.
        obj.web = this.web.toNormal();
        // SNS 채널 정보를 obj에 저장합니다.
        obj.sns = this.sns.toNormal();
        // 클라우드 채널 정보를 obj에 저장합니다.
        obj.cloud = this.cloud.toNormal();
        // 변환된 채널 정보 객체를 반환합니다.
        return obj;
      }
  
      /**
       * @class #LinkArray
       * 채널 정보를 처리하는 내부 클래스입니다.
       * Array를 확장하여 추가 기능을 제공합니다.
       */
      #LinkArray = class extends Array {
        /**
         * @constructor
         * JSON 배열 데이터를 기반으로 초기화합니다.
         * @param {Array} json - 채널 정보를 담고 있는 JSON 배열
         */
        constructor(json) {
          // 상위 클래스(Array)의 생성자를 호출합니다.
          super();
          // JSON 배열 데이터를 순회하며, 각 요소를 배열에 추가합니다.
          for (let i of json) {
            this.push(i);
          }
        }
  
        /**
         * @method toNormal
         * 채널 정보를 일반 배열로 변환합니다.
         * @returns {Array} 변환된 채널 정보 배열
         */
        toNormal() {
          // 변환된 배열을 저장할 arr을 선언합니다.
          let arr = [];
          // 배열의 각 요소를 순회하며, 일반 객체로 변환하여 arr에 추가합니다.
          for (let i of this) {
            arr.push(i);
          }
          // 변환된 채널 정보 배열을 반환합니다.
          return arr;
        }
      };
    };
  }
  
  /**
   * @class #AspirantPortfolio
   * 포트폴리오 정보를 처리하는 내부 클래스입니다.
   * Array를 확장하여 추가 기능을 제공합니다.
   */
  #AspirantPortfolio = class extends Array {
    /**
     * @constructor
     * JSON 배열 데이터를 기반으로 초기화합니다.
     * @param {Array} json - 포트폴리오 정보를 담고 있는 JSON 배열
     */
    constructor(json) {
      // 상위 클래스(Array)의 생성자를 호출합니다.
      super();
      // 임시 변수를 선언합니다.
      let tempInstance;
      // JSON 배열 데이터를 순회하며, 요소를 #AspirantPortfolioDetail 인스턴스로 변환하여 배열에 추가합니다.
      for (let i of json) {
        tempInstance = new this.#AspirantPortfolioDetail(i);
        this.push(tempInstance);
      }
    }
  
    /**
     * @method toNormal
     * 포트폴리오 정보를 일반 배열로 변환합니다.
     * @returns {Array} 변환된 포트폴리오 정보 배열
     */
    toNormal() {
      // 변환된 배열을 저장할 arr을 선언합니다.
      let arr = [];
      // 배열의 각 요소를 순회하며, toNormal 메서드를 호출하여 일반 객체로 변환합니다.
      for (let i of this) {
        arr.push(i.toNormal());
      }
      // 변환된 포트폴리오 정보 배열을 반환합니다.
      return arr;
    }
  
    /**
     * @class #AspirantPortfolioDetail
     * 포트폴리오 상세 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantPortfolioDetail = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 포트폴리오 상세 정보를 초기화합니다.
       * @param {Object} json - 포트폴리오 상세 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 포트폴리오 제출 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 포트폴리오 확인 정보를 초기화합니다.
        this.confirm = new this.#Confirms(json.confirm);
        // 포트폴리오 폴더 ID를 초기화합니다.
        this.folderId = json.folderId;
      }
  
      /**
       * @method toNormal
       * 포트폴리오 상세 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 포트폴리오 상세 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 포트폴리오 제출 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 포트폴리오 확인 정보를 obj에 저장합니다.
        obj.confirm = this.confirm.toNormal();
        // 포트폴리오 폴더 ID를 obj에 저장합니다.
        obj.folderId = this.folderId;
        // 변환된 포트폴리오 상세 정보 객체를 반환합니다.
        return obj;
      }
  
      /**
       * @class #Confirms
       * 포트폴리오 확인 정보를 처리하는 내부 클래스입니다.
       * Array를 확장하여 추가 기능을 제공합니다.
       */
      #Confirms = class extends Array {
        /**
         * @constructor
         * JSON 배열 데이터를 기반으로 초기화합니다.
         * @param {Array} json - 포트폴리오 확인 정보를 담고 있는 JSON 배열
         */
        constructor(json) {
          // 상위 클래스(Array)의 생성자를 호출합니다.
          super();
          // JSON 배열 데이터를 순회하며, 요소를 #Confirm 인스턴스로 변환하여 배열에 추가합니다.
          for (let i of json) {
            this.push(new this.#Confirm(i));
          }
        }
  
        /**
         * @method toNormal
         * 포트폴리오 확인 정보를 일반 배열로 변환합니다.
         * @returns {Array} 변환된 포트폴리오 확인 정보 배열
         */
        toNormal() {
          // 변환된 배열을 저장할 arr을 선언합니다.
          let arr = [];
          // 배열의 각 요소를 순회하며, toNormal 메서드를 호출하여 일반 객체로 변환합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          // 변환된 포트폴리오 확인 정보 배열을 반환합니다.
          return arr;
        }
  
        /**
         * @class #Confirm
         * 포트폴리오 확인 정보의 요소를 처리하는 내부 클래스입니다.
         */
        #Confirm = class {
          /**
           * @constructor
           * JSON 데이터를 기반으로 포트폴리오 확인 정보의 요소를 초기화합니다.
           * @param {Object} json - 포트폴리오 확인 정보를 담고 있는 JSON 객체
           */
          constructor(json) {
            // 포트폴리오 확인 날짜를 DateParse 클래스를 통해 처리합니다.
            this.date = new DateParse(json.date);
            // 확인한 사람의 이름을 초기화합니다.
            this.who = json.who;
          }
  
          /**
           * @method toNormal
           * 포트폴리오 확인 정보를 일반 객체로 변환합니다.
           * @returns {Object} 변환된 포트폴리오 확인 정보 객체
           */
          toNormal() {
            // 변환된 객체를 저장할 obj를 선언합니다.
            let obj = {};
            // 포트폴리오 확인 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
            obj.date = this.date.toNormal();
            // 확인한 사람의 이름을 obj에 저장합니다.
            obj.who = this.who;
            // 변환된 포트폴리오 확인 정보 객체를 반환합니다.
            return obj;
          }
        };
      };
    };
  }
  
  /**
   * @class #AspirantResponse
   * 응답 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantResponse = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 응답 정보를 초기화합니다.
     * @param {Object} json - 응답 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 응답 날짜를 DateParse 클래스를 통해 처리합니다.
      this.date = new DateParse(json.date);
      // 응답에 대한 상세 정보를 초기화합니다.
      this.long = json.long;
      // 탈락 이유를 초기화합니다.
      this.outreason = json.outreason;
      // 심사 담당자 이름을 초기화합니다.
      this.manager = json.manager;
      // 첫 응답 정보를 초기화합니다.
      this.first = new this.#AspirantResponseFirst(json.first);
      // 포트폴리오 응답 정보를 초기화합니다.
      this.portfolio = new this.#AspirantResponsePortfolio(json.portfolio);
    }
  
    /**
     * @method toNormal
     * 응답 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 응답 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 응답 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
      obj.date = this.date.toNormal();
      // 응답에 대한 상세 정보를 obj에 저장합니다.
      obj.long = this.long;
      // 탈락 이유를 obj에 저장합니다.
      obj.outreason = this.outreason;
      // 심사 담당자 이름을 obj에 저장합니다.
      obj.manager = this.manager;
      // 첫 응답 정보를 obj에 저장합니다. 첫 응답 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
      obj.first = this.first.toNormal();
      // 포트폴리오 응답 정보를 obj에 저장합니다. 포트폴리오 응답 객체의 toNormal 메서드를 호출하여 일반 객체로 변환합니다.
      obj.portfolio = this.portfolio.toNormal();
      // 변환된 응답 정보 객체를 반환합니다.
      return obj;
    }
  
    /**
     * @class #AspirantResponsePortfolio
     * 포트폴리오 응답 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantResponsePortfolio = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 포트폴리오 응답 정보를 초기화합니다.
       * @param {Object} json - 포트폴리오 응답 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 포트폴리오 요약 정보를 초기화합니다.
        this.summary = json.summary;
        // 포트폴리오 적절성 정보를 초기화합니다.
        this.proper = new this.#AspirantResponsePortfolioProper(json.proper);
        // 포트폴리오 준비 여부를 초기화합니다.
        this.ready = new this.#AspirantResponsePortfolioReady(json.ready);
        // 포트폴리오 추가 요구 사항을 초기화합니다.
        this.plus = new this.#AspirantResponsePortfolioPlus(json.plus);
      }
  
      /**
       * @method toNormal
       * 포트폴리오 응답 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 포트폴리오 응답 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 포트폴리오 요약 정보를 obj에 저장합니다.
        obj.summary = this.summary;
        // 포트폴리오 적절성 정보를 obj에 저장합니다.
        obj.proper = this.proper.toNormal();
        // 포트폴리오 준비 여부를 obj에 저장합니다.
        obj.ready = this.ready.toNormal();
        // 포트폴리오 추가 요구 사항을 obj에 저장합니다.
        obj.plus = this.plus.toNormal();
        // 변환된 포트폴리오 응답 정보 객체를 반환합니다.
        return obj;
      }
  
      /**
       * @class #AspirantResponsePortfolioProper
       * 포트폴리오 적절성 정보를 처리하는 내부 클래스입니다.
       */
      #AspirantResponsePortfolioProper = class {
        /**
         * @constructor
         * JSON 데이터를 기반으로 포트폴리오 적절성 정보를 초기화합니다.
         * @param {Object} json - 포트폴리오 적절성 정보를 담고 있는 JSON 객체
         */
        constructor(json) {
          // 적절성 상태를 초기화합니다.
          this.status = json.status;
          // 리모델링 적합 여부를 초기화합니다.
          this.remodeling = json.remodeling;
          // 스타일링 적합 여부를 초기화합니다.
          this.styling = json.styling;
        }
  
        /**
         * @method toNormal
         * 포트폴리오 적절성 정보를 일반 객체로 변환합니다.
         * @returns {Object} 변환된 포트폴리오 적절성 정보 객체
         */
        toNormal() {
          // 변환된 객체를 저장할 obj를 선언합니다.
          let obj = {};
          // 적절성 상태를 obj에 저장합니다.
          obj.status = this.status;
          // 리모델링 적합 여부를 obj에 저장합니다.
          obj.remodeling = this.remodeling;
          // 스타일링 적합 여부를 obj에 저장합니다.
          obj.styling = this.styling;
          // 변환된 포트폴리오 적절성 정보 객체를 반환합니다.
          return obj;
        }
      }
  
      /**
       * @class #AspirantResponsePortfolioReady
       * 포트폴리오 준비 여부를 처리하는 내부 클래스입니다.
       */
      #AspirantResponsePortfolioReady = class {
        /**
         * @constructor
         * JSON 데이터를 기반으로 포트폴리오 준비 여부를 초기화합니다.
         * @param {Object} json - 포트폴리오 준비 여부를 담고 있는 JSON 객체
         */
        constructor(json) {
          // 홈 준비 여부를 초기화합니다.
          this.home = json.home;
          // 가구 준비 여부를 초기화합니다.
          this.furnishing = json.furnishing;
          // 세트 준비 여부를 초기화합니다.
          this.set = json.set;
        }
  
        /**
         * @method toNormal
         * 포트폴리오 준비 여부를 일반 객체로 변환합니다.
         * @returns {Object} 변환된 포트폴리오 준비 여부 객체
         */
        toNormal() {
          // 변환된 객체를 저장할 obj를 선언합니다.
          let obj = {};
          // 홈 준비 여부를 obj에 저장합니다.
          obj.home = this.home;
          // 가구 준비 여부를 obj에 저장합니다.
          obj.furnishing = this.furnishing;
          // 세트 준비 여부를 obj에 저장합니다.
          obj.set = this.set;
          // 변환된 포트폴리오 준비 여부 객체를 반환합니다.
          return obj;
        }
      }
  
      /**
       * @class #AspirantResponsePortfolioPlus
       * 포트폴리오 추가 요구 사항을 처리하는 내부 클래스입니다.
       */
      #AspirantResponsePortfolioPlus = class {
        /**
         * @constructor
         * JSON 데이터를 기반으로 포트폴리오 추가 요구 사항을 초기화합니다.
         * @param {Object} json - 포트폴리오 추가 요구 사항을 담고 있는 JSON 객체
         */
        constructor(json) {
          // 추가 요구 사항 충족 여부를 초기화합니다.
          this.needs = json.needs;
          // 추가 요구 사항 요청 날짜를 DateParse 클래스를 통해 처리합니다.
          this.request = new DateParse(json.request);
          // 추가 요구 사항 사진 제출 날짜를 DateParse 클래스를 통해 처리합니다.
          this.photo = new DateParse(json.photo);
        }
  
        /**
         * @method toNormal
         * 포트폴리오 추가 요구 사항을 일반 객체로 변환합니다.
         * @returns {Object} 변환된 포트폴리오 추가 요구 사항 객체
         */
        toNormal() {
          // 변환된 객체를 저장할 obj를 선언합니다.
          let obj = {};
          // 추가 요구 사항 충족 여부를 obj에 저장합니다.
          obj.needs = this.needs;
          // 추가 요구 사항 요청 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
          obj.request = this.request.toNormal();
          // 추가 요구 사항 사진 제출 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
          obj.photo = this.photo.toNormal();
          // 변환된 포트폴리오 추가 요구 사항 객체를 반환합니다.
          return obj;
        }
      }
    }
  
    /**
     * @class #AspirantResponseFirst
     * 첫 응답 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantResponseFirst = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 첫 응답 정보를 초기화합니다.
       * @param {Object} json - 첫 응답 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 응답 상태를 초기화합니다.
        this.status = json.status;
        // 응답 이유를 초기화합니다.
        this.reason = json.reason;
      }
  
      /**
       * @method toNormal
       * 첫 응답 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 첫 응답 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 응답 상태를 obj에 저장합니다.
        obj.status = this.status;
        // 응답 이유를 obj에 저장합니다.
        obj.reason = this.reason;
        // 변환된 첫 응답 정보 객체를 반환합니다.
        return obj;
      }
    }
  }
  
  /**
   * @class #AspirantSubmit
   * 제출 정보를 처리하는 내부 클래스입니다.
   */
  #AspirantSubmit = class {
    /**
     * @constructor
     * JSON 데이터를 기반으로 제출 정보를 초기화합니다.
     * @param {Object} json - 제출 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      // 발표 자료 제출 정보를 초기화합니다.
      this.presentation = new this.#AspirantSubmitPresentation(json.presentation);
      // 파트너십 신청 정보를 초기화합니다.
      this.partnership = new this.#AspirantSubmitPartnership(json.partnership);
      // 첫 요청 정보를 초기화합니다.
      this.firstRequest = new this.#AspirantSubmitFirst(json.firstRequest);
      // 문서 제출 정보를 초기화합니다.
      this.documents = new this.#AspirantSubmitDocuments(json.documents);
      // 등록 정보를 초기화합니다.
      this.registration = new this.#AspirantSubmitRegistration(json.registration);
      // 미팅 관련 제출 정보를 초기화합니다.
      this.meeting = new this.#AspirantSubmitMeeting(json.meeting);
      // 신청 경로를 초기화합니다.
      this.comeFrom = json.comeFrom;
    }
  
    /**
     * @method toNormal
     * 제출 정보를 일반 객체로 변환합니다.
     * @returns {Object} 변환된 제출 정보 객체
     */
    toNormal() {
      // 변환된 객체를 저장할 obj를 선언합니다.
      let obj = {};
      // 발표 자료 제출 정보를 obj에 저장합니다.
      obj.presentation = this.presentation.toNormal();
      // 파트너십 신청 정보를 obj에 저장합니다.
      obj.partnership = this.partnership.toNormal();
      // 첫 요청 정보를 obj에 저장합니다.
      obj.firstRequest = this.firstRequest.toNormal();
      // 문서 제출 정보를 obj에 저장합니다.
      obj.documents = this.documents.toNormal();
      // 등록 정보를 obj에 저장합니다.
      obj.registration = this.registration.toNormal();
      // 미팅 관련 제출 정보를 obj에 저장합니다.
      obj.meeting = this.meeting.toNormal();
      // 신청 경로를 obj에 저장합니다.
      obj.comeFrom = this.comeFrom;
      // 변환된 제출 정보 객체를 반환합니다.
      return obj;
    }
  
    /**
     * @class #AspirantSubmitDocuments
     * 문서 제출 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitDocuments = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 문서 제출 정보를 초기화합니다.
       * @param {Object} json - 문서 제출 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 문서 제출 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 문서 제출 여부를 초기화합니다.
        this.boo = json.boo;
      }
  
      /**
       * @method toNormal
       * 문서 제출 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 문서 제출 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 문서 제출 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 문서 제출 여부를 obj에 저장합니다.
        obj.boo = this.boo;
        // 변환된 문서 제출 정보 객체를 반환합니다.
        return obj;
      }
    }
  
    /**
     * @class #AspirantSubmitRegistration
     * 등록 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitRegistration = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 등록 정보를 초기화합니다.
       * @param {Object} json - 등록 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 등록 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 등록 여부를 초기화합니다.
        this.boo = json.boo;
      }
  
      /**
       * @method toNormal
       * 등록 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 등록 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 등록 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 등록 여부를 obj에 저장합니다.
        obj.boo = this.boo;
        // 변환된 등록 정보 객체를 반환합니다.
        return obj;
      }
    }
  
    /**
     * @class #AspirantSubmitMeeting
     * 미팅 관련 제출 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitMeeting = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 미팅 관련 제출 정보를 초기화합니다.
       * @param {Object} json - 미팅 관련 제출 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 미팅 관련 제출 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 미팅 관련 제출 여부를 초기화합니다.
        this.boo = json.boo;
      }
  
      /**
       * @method toNormal
       * 미팅 관련 제출 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 미팅 관련 제출 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 미팅 관련 제출 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 미팅 관련 제출 여부를 obj에 저장합니다.
        obj.boo = this.boo;
        // 변환된 미팅 관련 제출 정보 객체를 반환합니다.
        return obj;
      }
    }
  
    /**
     * @class #AspirantSubmitPresentation
     * 발표 자료 제출 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitPresentation = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 발표 자료 제출 정보를 초기화합니다.
       * @param {Object} json - 발표 자료 제출 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 발표 자료 제출 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 발표 자료 제출 여부를 초기화합니다.
        this.boo = json.boo;
      }
  
      /**
       * @method toNormal
       * 발표 자료 제출 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 발표 자료 제출 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 발표 자료 제출 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 발표 자료 제출 여부를 obj에 저장합니다.
        obj.boo = this.boo;
        // 변환된 발표 자료 제출 정보 객체를 반환합니다.
        return obj;
      }
    }
  
    /**
     * @class #AspirantSubmitPartnership
     * 파트너십 신청 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitPartnership = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 파트너십 신청 정보를 초기화합니다.
       * @param {Object} json - 파트너십 신청 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 파트너십 신청 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 파트너십 신청 여부를 초기화합니다.
        this.boo = json.boo;
      }
  
      /**
       * @method toNormal
       * 파트너십 신청 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 파트너십 신청 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 파트너십 신청 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 파트너십 신청 여부를 obj에 저장합니다.
        obj.boo = this.boo;
        // 변환된 파트너십 신청 정보 객체를 반환합니다.
        return obj;
      }
    }
  
    /**
     * @class #AspirantSubmitFirst
     * 첫 요청 정보를 처리하는 내부 클래스입니다.
     */
    #AspirantSubmitFirst = class {
      /**
       * @constructor
       * JSON 데이터를 기반으로 첫 요청 정보를 초기화합니다.
       * @param {Object} json - 첫 요청 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        // 첫 요청 날짜를 DateParse 클래스를 통해 처리합니다.
        this.date = new DateParse(json.date);
        // 첫 요청 방법을 초기화합니다.
        this.method = json.method;
      }
  
      /**
       * @method toNormal
       * 첫 요청 정보를 일반 객체로 변환합니다.
       * @returns {Object} 변환된 첫 요청 정보 객체
       */
      toNormal() {
        // 변환된 객체를 저장할 obj를 선언합니다.
        let obj = {};
        // 첫 요청 날짜를 obj에 저장합니다. 날짜는 DateParse의 toNormal 메서드를 통해 변환됩니다.
        obj.date = this.date.toNormal();
        // 첫 요청 방법을 obj에 저장합니다.
        obj.method = this.method;
        // 변환된 첫 요청 정보 객체를 반환합니다.
        return obj;
      }
    }
  }
}

/**
 * @class Aspirants
 * 신청자(Aspirant) 클래스의 인스턴스들을 포함하는 배열을 확장한 클래스입니다.
 * 이 클래스는 신청자 배열을 처리하기 위한 추가적인 메서드를 제공합니다.
 */
class Aspirants extends Array {

  /**
   * @method toNormal
   * 배열에 포함된 모든 신청자 인스턴스를 일반 객체로 변환하여 새로운 배열에 저장합니다.
   * @returns {Array} 변환된 신청자 객체들을 포함하는 배열
   */
  toNormal() {
    // 변환된 신청자 객체들을 저장할 tong 배열을 선언합니다.
    let tong;
    // tong 배열을 빈 배열로 초기화합니다.
    tong = [];
    // 현재 배열(this)에 있는 모든 신청자 인스턴스를 순회합니다.
    for (let i of this) {
      // 각 신청자 인스턴스의 toNormal 메서드를 호출하여 일반 객체로 변환한 후, tong 배열에 추가합니다.
      tong.push(i.toNormal());
    }
    // 변환된 신청자 객체들을 포함하는 tong 배열을 반환합니다.
    return tong;
  }

  /**
   * @method meetingAlarm
   * 각 신청자의 미팅 알람 정보를 추출하여 정렬된 배열로 반환합니다.
   * @returns {Array} 정렬된 미팅 알람 정보 배열
   */
  meetingAlarm() {
    // 미팅 알람 정보를 저장할 arr 배열을 선언합니다.
    let arr;
    // arr 배열을 빈 배열로 초기화합니다.
    arr = [];
    // 현재 배열(this)에 있는 모든 신청자 인스턴스를 순회합니다.
    for (let i of this) {
      // 각 신청자 인스턴스의 meetingAlarm 메서드를 호출하여 알람 정보를 확인합니다.
      // null이 아닌 경우(알람 정보가 존재하는 경우), arr 배열에 추가합니다.
      if (i.meetingAlarm() !== null) {
        arr.push(i.meetingAlarm());
      }
    }
    // 미팅 날짜에 따라 알람 정보를 정렬합니다.
    arr.sort((a, b) => {
      // 각 알람의 날짜를 비교하여 오름차순으로 정렬합니다.
      return a.date.valueOf() - b.date.valueOf();
    });
    // 정렬된 미팅 알람 정보 배열을 반환합니다.
    return arr;
  }

}

/**
 * @function withTools
 * 신청자(Aspirant) 클래스에 프로토타입 메서드를 추가하는 함수입니다.
 * 이 함수는 신청자 클래스에 다양한 데이터 처리를 위한 메서드를 확장합니다.
 * @param {Function} Aspirant - 신청자 클래스
 * @returns {Function} 확장된 신청자 클래스
 */
const withTools = function (Aspirant) {

  /**
   * @method flatDeath
   * 신청자 객체의 데이터를 평탄화하여 새로운 객체로 반환합니다.
   * 특정 모드에 따라 다른 데이터 세트를 반환합니다.
   * @param {string} [mode="total"] - 반환할 데이터 세트를 결정하는 모드 ("total", "presentation", "partnership")
   * @returns {Object|null} 평탄화된 데이터 객체 또는 null
   */
  Aspirant.prototype.flatDeath = function (mode = "total") {
    // 신청자 객체를 일반 객체로 변환하여 aspirant 변수에 저장합니다.
    const aspirant = this.toNormal();

    /**
     * @function dateToStringDay
     * 날짜 객체를 "월 일 요일 시간" 형식의 문자열로 변환합니다.
     * @param {Date} dateObject - 변환할 날짜 객체
     * @returns {string} 변환된 날짜 문자열
     */
    const dateToStringDay = function (dateObject) {
      // 요일을 한글로 변환하기 위한 배열을 선언합니다.
      const dayConvert = [
        "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
      ];
      // 월, 일, 요일, 시간 정보를 문자열로 반환합니다.
      return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} ${String(dateObject.getHours())}시`;
    };

    /**
     * @function dateToString
     * 문자열로 된 날짜를 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
     * @param {string} str - 변환할 날짜 문자열
     * @returns {string} 변환된 날짜 문자열
     */
    const dateToString = function (str) {
      /**
       * @function zeroAddition
       * 숫자를 2자리 문자열로 변환합니다. 10보다 작은 경우 앞에 0을 추가합니다.
       * @param {number} num - 변환할 숫자
       * @returns {string} 변환된 2자리 숫자 문자열
       */
      const zeroAddition = function (num) {
        if (num < 10) {
          return `0${String(num)}`;
        } else {
          return String(num);
        }
      };
      // 날짜 객체로 변환한 후, "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 반환합니다.
      let date;
      date = new Date(str);
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
    };

    // 반환할 임시 객체를 초기화합니다.
    let tempObj;

    tempObj = {};

    // 모드가 "total"인 경우, 모든 데이터를 평탄화하여 반환합니다.
    if (mode === "total") {
      // 각 필드를 평탄화하여 tempObj에 저장합니다.
      // 신청자의 디자이너 이름을 tempObj 객체에 저장합니다.
      tempObj.designer = aspirant.designer;

      // 신청자의 전화번호를 tempObj 객체에 저장합니다.
      tempObj.phone = aspirant.phone;

      // 신청자의 미팅 상태를 tempObj 객체에 저장합니다.
      tempObj.status = aspirant.meeting.status;

      // 미팅 상태가 "조정"으로 시작하지 않는 경우, 미팅 시간을 문자열로 변환하여 tempObj 객체에 저장합니다.
      // 만약 "조정"으로 시작하면 "기타"로 저장합니다.
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";

      // 신청서 첫 요청 날짜를 문자열로 변환하여 tempObj 객체에 저장합니다.
      tempObj.date = dateToString(aspirant.submit.firstRequest.date);

      // 발표 자료 제출 여부를 tempObj 객체에 저장합니다 (true 또는 false).
      tempObj.presentationBoo = aspirant.submit.presentation.boo;

      // 파트너십 제출 여부를 tempObj 객체에 저장합니다 (true 또는 false).
      tempObj.partnershipBoo = aspirant.submit.partnership.boo;

      // 포트폴리오가 제출된 경우 tempObj에 true를, 그렇지 않으면 false를 저장합니다.
      tempObj.portfolioBoo = (aspirant.portfolio.length > 0);

      // 웹 채널 정보를 쉼표로 구분된 문자열로 변환하여 tempObj 객체에 저장합니다.
      tempObj.webChannel = aspirant.information.channel.web.join(',');

      // SNS 채널 정보를 쉼표로 구분된 문자열로 변환하여 tempObj 객체에 저장합니다.
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');

      // 클라우드 채널 정보를 쉼표로 구분된 문자열로 변환하여 tempObj 객체에 저장합니다.
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');

      // 신청 경로 정보를 tempObj 객체에 저장합니다.
      tempObj.comeFrom = aspirant.submit.comeFrom;

      // 이메일 주소를 tempObj 객체에 저장합니다.
      tempObj.email = aspirant.email;

      // 주소 정보를 tempObj 객체에 저장합니다.
      tempObj.address = aspirant.address;

      // 회사 분류 정보를 tempObj 객체에 저장합니다.
      tempObj.classification = aspirant.information.company.classification;

      // 회사 이름을 tempObj 객체에 저장합니다.
      tempObj.company = aspirant.information.company.name;

      // 사업자 번호를 tempObj 객체에 저장합니다.
      tempObj.businessNumber = aspirant.information.company.businessNumber;

      // 회사 설립일을 문자열로 변환한 후, 연-월-일 형식으로 잘라서 tempObj 객체에 저장합니다.
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);

      // 회사 대표자의 이름을 tempObj 객체에 저장합니다.
      tempObj.representative = aspirant.information.company.representative;

      // 은행 이름을 tempObj 객체에 저장합니다.
      tempObj.bankName = aspirant.information.account.bank;

      // 은행 계좌 번호를 tempObj 객체에 저장합니다.
      tempObj.bankAccount = aspirant.information.account.number;

      // 은행 수취인 이름을 tempObj 객체에 저장합니다.
      tempObj.bankTo = aspirant.information.account.to;

      // 은행 관련 기타 정보를 tempObj 객체에 저장합니다.
      tempObj.bankEtc = aspirant.information.account.etc;

      // 인테리어 경력을 "X년 Y개월" 형식으로 변환하여 tempObj 객체에 저장합니다.
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';

      // 스타일링 경력을 "X년 Y개월" 형식으로 변환하여 tempObj 객체에 저장합니다.
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';

      // 경력 상세 정보를 tempObj 객체에 저장합니다.
      tempObj.careerDetail = aspirant.information.career.detail;

      // 포트폴리오가 존재하는지 여부를 binary로 저장합니다 (true 또는 false).
      tempObj.binary = (aspirant.portfolio.length > 0);

      // 포트폴더 ID를 null로 초기화합니다.
      tempObj.folderId = null;

      // 포트폴리오 확인 정보가 담긴 배열을 JSON 문자열로 변환한 후, tempObj 객체에 저장합니다.
      tempObj.portfolioConfirms = JSON.stringify([]);

      // 만약 포트폴리오가 존재한다면, 첫 번째 포트폴리오의 폴더 ID와 확인 정보를 tempObj 객체에 저장합니다.
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
        tempObj.portfolioConfirms = JSON.stringify(aspirant.portfolio[0].confirm);
      }

      // 파트너십 제출 여부를 relation으로 저장합니다 (true 또는 false).
      tempObj.relation = aspirant.submit.partnership.boo;

      // 포트폴리오가 존재하지 않는 경우, 웹, SNS, 클라우드 채널 정보를 통해 포트폴리오 링크를 생성합니다.
      if (!tempObj.binary) {
        // 웹 채널에서 링크를 추출하여 folderId에 "__link__" 접두어와 함께 저장합니다.
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        // SNS 채널에서 링크를 추출하여 folderId에 "__link__" 접두어와 함께 저장합니다.
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        // 클라우드 채널에서 링크를 추출하여 folderId에 "__link__" 접두어와 함께 저장합니다.
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

      // 발표 자료 제출 여부를 "신청" 또는 "미신청"으로 변환하여 저장합니다.
      tempObj.presentationBoo = tempObj.presentationBoo ? "신청" : "미신청";

      // 파트너십 제출 여부를 "신청" 또는 "미신청"으로 변환하여 저장합니다.
      tempObj.partnershipBoo = tempObj.partnershipBoo ? "신청" : "미신청";

      // 포트폴리오 제출 여부를 "제출" 또는 "미제출"로 변환하여 저장합니다.
      tempObj.portfolioBoo = tempObj.portfolioBoo ? "제출" : "미제출";

      // 최종적으로 평탄화된 tempObj 객체를 반환합니다.
      return tempObj;
    } 
    // 모드가 "presentation"인 경우, 발표 자료 관련 데이터를 평탄화하여 반환합니다.
    else if (mode === "presentation") {
      if (!aspirant.submit.presentation.boo) {
        return null;
      }
      // 발표 자료 관련 데이터를 tempObj에 저장합니다.
      tempObj.date = dateToString(aspirant.submit.presentation.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;
      tempObj.status = aspirant.meeting.status;
      tempObj.presentationTimes = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";
      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }
    } 
    // 모드가 "partnership"인 경우, 파트너십 관련 데이터를 평탄화하여 반환합니다.
    else if (mode === "partnership") {
      if (!aspirant.submit.partnership.boo) {
        return null;
      }
      // 파트너십 관련 데이터를 tempObj에 저장합니다.
      tempObj.date = dateToString(aspirant.submit.partnership.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;

      tempObj.status = aspirant.meeting.status;
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";

      tempObj.classification = aspirant.information.company.classification;
      tempObj.company = aspirant.information.company.name;
      tempObj.businessNumber = aspirant.information.company.businessNumber;
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);
      tempObj.representative = aspirant.information.company.representative;
      tempObj.bankName = aspirant.information.account.bank;
      tempObj.bankAccount = aspirant.information.account.number;
      tempObj.bankTo = aspirant.information.account.to;
      tempObj.bankEtc = aspirant.information.account.etc;
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';
      tempObj.careerDetail = aspirant.information.career.detail;

      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

    }

    // 평탄화된 데이터 객체를 반환합니다.
    return tempObj;
  }

  /**
   * @method dimensionSqueeze
   * 신청자 데이터를 단일 차원으로 압축하여 반환합니다.
   * 이 메서드는 데이터를 JSON 형태로 변환한 후, 불필요한 데이터를 제거하고 필요한 데이터를 남깁니다.
   * @returns {Array} 압축된 데이터 배열
   */
  Aspirant.prototype.dimensionSqueeze = function () {
    // 신청자 데이터를 JSON 형태로 복사하여 tong 변수에 저장합니다.
    const tong = JSON.parse(JSON.stringify(this.flatDeath()));
    let result;

    // 결과를 저장할 배열 result를 초기화합니다.
    result = [];

    // 포트폴리오 확인 정보를 삭제합니다.
    delete tong.portfolioConfirms;
    // folderId가 "__link__"로 시작하는 경우, 해당 접두사를 제거합니다.
    if (/^__link__/.test(tong.folderId)) {
      tong.folderId = tong.folderId.slice(8);
    }
    // binary 값을 aspirantBinary로 변경합니다.
    tong.aspirantBinary = tong.binary;
    delete tong.binary;

    // 변환된 객체를 result 배열에 추가합니다.
    result.push(tong);

    // 압축된 데이터 배열을 반환합니다.
    return result;
  }

  // 확장된 신청자 클래스를 반환합니다.
  return Aspirant;
}

/**
 * @function withToolsArr
 * 신청자 배열(Aspirants) 클래스에 프로토타입 메서드를 추가하는 함수입니다.
 * @param {Function} Aspirants - 신청자 배열 클래스
 * @returns {Function} 확장된 신청자 배열 클래스
 */
const withToolsArr = function (Aspirants) {

  /**
   * @method flatDeath
   * 배열에 있는 모든 신청자 인스턴스를 평탄화하여 단일 배열로 반환합니다.
   * @returns {Array} 평탄화된 데이터 배열
   */
  Aspirants.prototype.flatDeath = function () {
    // 결과를 저장할 tong 배열과 임시 배열 tempArr을 초기화합니다.
    let tong, tempArr;
    tong = [];
    // 배열 내 각 신청자 인스턴스를 순회합니다.
    for (let i of this) {
      // 각 신청자를 평탄화하여 tempArr에 저장합니다.
      tempArr = i.flatDeath();
      // tempArr의 각 요소를 tong 배열에 추가합니다.
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    // 평탄화된 데이터 배열을 반환합니다.
    return tong;
  }

  /**
   * @method dimensionSqueeze
   * 배열에 있는 모든 신청자 인스턴스를 SQL 테이블에 맞게 압축하고, SQL 생성 및 삽입 문을 반환합니다.
   * @returns {Object|null} SQL 모델 및 데이터 객체 또는 null
   */
  Aspirants.prototype.dimensionSqueeze = function () {
    // SQL 테이블 이름을 정의합니다.
    const TABLE_NAME = "aspirant";
    // 긴 텍스트 필드를 지정하는 배열을 초기화합니다.
    const LONG_TARGETS = [];

    /**
     * @class SqlModel
     * SQL 테이블 모델을 생성하는 클래스입니다.
     */
    class SqlModel {
      /**
       * @constructor
       * 샘플 데이터를 기반으로 SQL 테이블의 필드를 초기화합니다.
       * @param {Object} sample - 샘플 데이터 객체
       */
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)";
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)";
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)";
          } else {
            this[i] = "VARCHAR(255)";
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT";
          }
        }
      }

      /**
       * @method getName
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * @method getCreateSql
       * SQL 테이블 생성 문을 반환합니다.
       * @returns {string} SQL 테이블 생성 문
       */
      getCreateSql() {
        let sql = "CREATE TABLE `" + this.getName() + "` (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT, ";
        for (let i in this) {
          sql += "`" + i + "` " + this[i] + ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql;
      }

      /**
       * @method getDropSql
       * SQL 테이블 삭제 문을 반환합니다.
       * @returns {string} SQL 테이블 삭제 문
       */
      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql;
      }

    }

    /**
     * @class SqlTong
     * SQL 삽입 문을 생성하는 클래스입니다. Array를 확장합니다.
     */
    class SqlTong extends Array {
      /**
       * @method getName
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * @method getInsertSql
       * SQL 삽입 문을 반환합니다.
       * @returns {Array} SQL 삽입 문 배열
       */
      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql());
        }
        return arr;
      }
      
    }

    /**
     * @class SqlTongFactor
     * SQL 삽입 문을 생성하는 각 데이터 요소를 처리하는 클래스입니다.
     */
    class SqlTongFactor {
      /**
       * @constructor
       * 샘플 데이터를 기반으로 SQL 삽입 문을 초기화합니다.
       * @param {Object} sample - 샘플 데이터 객체
       */
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "boolean") {
            this[i] = sample[i] ? 1 : 0;
          } else {
            this[i] = JSON.stringify(sample[i]);
          }
        }
      }

      /**
       * @method getName
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * @method getInsertSql
       * SQL 삽입 문을 생성하여 반환합니다.
       * @returns {string} SQL 삽입 문
       */
      getInsertSql() {
        let sql = "INSERT INTO `" + this.getName() + "` (";
        for (let i in this) {
          sql += "`" + i + "`,";
        }

        sql = sql.slice(0, -1);
        sql += ") VALUES (";

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i];
          } else {
            sql += "'";
            sql += this[i].replace(/'/g, '"');
            sql += "'";
          }
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ");";

        return sql;
      }
    }

    // SQL 삽입 데이터를 저장할 tong 배열을 초기화합니다.
    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    // 현재 배열(this)의 각 요소를 순회하며, 데이터를 SQL 삽입 문으로 변환합니다.
    for (let i of this) {
      tempArr = i.dimensionSqueeze();
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j));
      }
    }

    // 데이터가 있는 경우, SQL 모델과 데이터를 반환합니다.
    if (tong.length > 0) {
      sample = tong[0];
      model = new SqlModel(sample);
      return { model, data: tong };
    } else {
      return null;
    }
  }

  /**
   * @method search
   * 주어진 신청자 ID를 기반으로 배열에서 해당 신청자를 검색하여 반환합니다.
   * @param {string} aspid - 검색할 신청자 ID
   * @returns {Object|null} 찾은 신청자 객체 또는 null
   */
  Aspirants.prototype.search = function (aspid) {
    let result = null;
    for (let i of this) {
      if (i.aspid === aspid) {
        result = i;
        break;
      }
    }
    return result;
  }

  /**
   * @method find
   * search 메서드의 별칭입니다. 주어진 신청자 ID를 기반으로 배열에서 해당 신청자를 검색합니다.
   * @param {string} aspid - 검색할 신청자 ID
   * @returns {Object|null} 찾은 신청자 객체 또는 null
   */
  Aspirants.prototype.find = function (aspid) {
    return this.search(aspid);
  }

  // 확장된 신청자 배열 클래스를 반환합니다.
  return Aspirants;
}

module.exports = { AspirantMap, Aspirant, Aspirants, Tools: { withTools, withToolsArr } };
