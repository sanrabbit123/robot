/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔을 통해 자신의 체크리스트를 수정한 기록을 저장하는 데이터베이스
 */
const collectionName = "designerChecklistLog";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너가 콘솔을 통해 체크리스트를 수정한 내역을 기록하는 디비
 */
const collectionDescription = "디자이너가 디자이너 콘솔을 통해서 자신의 체크리스트를 수정한 기록";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} mode 수정한 내용의 모드 ("checklist"로 고정)
 * @property {Object} data 체크리스트 수정 정보
 * @property {string} data.desid 디자이너의 고유 식별자
 * @property {Date} data.date 수정이 이루어진 날짜 및 시간
 * @property {string} data.type 수정된 체크리스트 항목의 종류 (예: "selection", "tendency")
 * @property {string} data.property 수정된 체크리스트 항목의 속성 (예: "업무 정보", "텍스처 경향성")
 * @property {string} data.column 수정된 컬럼의 경로 (예: "information.contract.status")
 * @property {string|number} data.value 수정된 값 (예: "협약 완료", 6)
 * @property {string} data.designer 체크리스트를 수정한 디자이너의 이름
 * @property {string|number} data.pastValue 수정되기 전의 값
 * @property {boolean} data.entireMode 전체 모드 여부 (true 또는 false)
 * @property {string} id 수정 내역의 고유 식별자
 * @property {Date} date 수정이 저장된 날짜 및 시간
 * @property {number} entire 수정 내역이 전체에 영향을 미치는지 여부 (1 = 전체 영향, 0 = 부분 영향)
 * @property {Object} network 네트워크 정보
 * @property {string} network.userAgent 사용자가 접속한 기기의 User-Agent
 * @property {string} network.browser 접속에 사용된 브라우저 (예: "Chrome")
 * @property {string} network.os 사용한 운영체제 (예: "Windows 10.0")
 * @property {string} network.platform 사용한 플랫폼 (예: "Microsoft Windows")
 * @property {boolean} network.mobile 접속한 기기가 모바일인지 여부
 * @property {string} network.ip 접속한 사용자의 IP 주소
 * @property {string} network.city 접속한 사용자의 도시 정보
 * @property {string} network.region 접속한 사용자의 지역 정보
 * @property {string} network.country 접속한 사용자의 국가 정보
 * @property {string} network.loc 접속한 사용자의 위치 정보 (위도, 경도)
 * @property {string} network.org 접속한 사용자의 네트워크 제공자
 * @property {string} network.postal 접속한 사용자의 우편번호
 * @property {string} network.timezone 접속한 사용자의 시간대 정보
 */
const collectionSampleData0 = {
  _id: "66dab3e52d2f704184c7baaa",  // MongoDB에서 자동 생성된 고유 ID
  mode: "checklist",  // 수정한 내용의 모드 (항상 "checklist")
  data: {
    desid: "d2207_aa01s",  // 디자이너 고유 식별자
    date: "2024-09-06T07:46:19.808Z",  // 수정이 이루어진 날짜 및 시간
    type: "selection",  // 수정된 체크리스트 항목의 종류 ("selection" = 선택 항목)
    property: "업무 정보",  // 수정된 항목의 속성
    column: "information.contract.status",  // 수정된 항목이 저장된 컬럼의 경로
    value: "협약 완료",  // 수정 후 값
    designer: "오정언",  // 체크리스트를 수정한 디자이너 이름
    pastValue: "협약 휴직",  // 수정 이전 값
    entireMode: true  // 전체 모드로 수정 여부 (true = 전체 수정)
  },
  id: "d2207_aa01s_1725608933116_DBEE1725608933116ACF6BE46C19183DE93BE426",  // 수정 내역의 고유 ID
  date: "2024-09-06T07:48:53.116Z",  // 수정 기록이 저장된 날짜 및 시간
  entire: 1,  // 전체에 영향을 미친 경우 (1 = 전체 영향)
  network: {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",  // 접속 기기의 User-Agent
    browser: "Chrome",  // 사용한 브라우저
    os: "Windows 10.0",  // 사용한 운영체제
    platform: "Microsoft Windows",  // 사용한 플랫폼
    mobile: false,  // 모바일 기기 여부
    ip: "1.229.181.18",  // 접속한 사용자의 IP 주소
    city: "Ansan-si",  // 접속한 도시
    region: "Gyeonggi-do",  // 접속한 지역
    country: "KR",  // 접속한 국가
    loc: "37.3236,126.8219",  // 위도 및 경도 정보
    org: "AS9318 SK Broadband Co Ltd",  // 네트워크 제공자 정보
    postal: "15271",  // 우편번호
    timezone: "Asia/Seoul"  // 접속한 시간대
  }
};

/**
 * 샘플 데이터 1
 * @type {Object}
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} mode 수정한 내용의 모드 ("checklist"로 고정)
 * @property {Object} data 체크리스트 수정 정보
 * @property {string} data.desid 디자이너의 고유 식별자
 * @property {Date} data.date 수정이 이루어진 날짜 및 시간
 * @property {string} data.type 수정된 체크리스트 항목의 종류 (예: "tendency")
 * @property {string} data.property 수정된 체크리스트 항목의 속성 (예: "텍스처 경향성")
 * @property {string} data.column 수정된 컬럼의 경로 (예: "analytics.styling.tendency.texture.whiteWood")
 * @property {string|number} data.value 수정된 값 (숫자일 경우 6)
 * @property {string} data.designer 체크리스트를 수정한 디자이너의 이름
 * @property {string|number} data.pastValue 수정되기 전의 값
 * @property {boolean} data.entireMode 전체 모드 여부 (true 또는 false)
 * @property {string} id 수정 내역의 고유 식별자
 * @property {Date} date 수정이 저장된 날짜 및 시간
 * @property {number} entire 수정 내역이 전체에 영향을 미치는지 여부 (1 = 전체 영향, 0 = 부분 영향)
 * @property {Object} network 네트워크 정보
 * @property {string} network.userAgent 사용자가 접속한 기기의 User-Agent
 * @property {string} network.browser 접속에 사용된 브라우저 (예: "Chrome")
 * @property {string} network.os 사용한 운영체제 (예: "OS X")
 * @property {string} network.platform 사용한 플랫폼 (예: "Apple Mac")
 * @property {boolean} network.mobile 접속한 기기가 모바일인지 여부
 * @property {string} network.ip 접속한 사용자의 IP 주소
 * @property {string} network.city 접속한 사용자의 도시 정보
 * @property {string} network.region 접속한 사용자의 지역 정보
 * @property {string} network.country 접속한 사용자의 국가 정보
 * @property {string} network.loc 접속한 사용자의 위치 정보 (위도, 경도)
 * @property {string} network.org 접속한 사용자의 네트워크 제공자
 * @property {string} network.postal 접속한 사용자의 우편번호
 * @property {string} network.timezone 접속한 사용자의 시간대 정보
 */
const collectionSampleData1 = {
  _id: "66cd681506355bce9a6171f5",  // MongoDB에서 자동 생성된 고유 ID
  mode: "checklist",  // 수정한 내용의 모드 (항상 "checklist")
  data: {
    desid: "d2408_aa03s",  // 디자이너 고유 식별자
    date: "2024-08-27T05:45:56.967Z",  // 수정이 이루어진 날짜 및 시간
    type: "tendency",  // 수정된 체크리스트 항목의 종류 ("tendency" = 경향성)
    property: "텍스처 경향성",  // 수정된 항목의 속성
    column: "analytics.styling.tendency.texture.whiteWood",  // 수정된 항목이 저장된 컬럼의 경로
    value: 6,  // 수정 후 값 (숫자 6)
    designer: "윤영은",  // 체크리스트를 수정한 디자이너 이름
    pastValue: 6,  // 수정 이전 값
    entireMode: false  // 전체 모드로 수정 여부 (false = 부분 수정)
  },
  id: "d2408_aa03s_1724737557312_ED4B1724737557312A0439E5291913363B573416",  // 수정 내역의 고유 ID
  date: "2024-08-27T05:45:57.312Z",  // 수정 기록이 저장된 날짜 및 시간
  entire: 0,  // 부분에만 영향을 미친 경우 (0 = 부분 영향)
  network: {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",  // 접속 기기의 User-Agent
    browser: "Chrome",  // 사용한 브라우저
    os: "OS X",  // 사용한 운영체제
    platform: "Apple Mac",  // 사용한 플랫폼
    mobile: false,  // 모바일 기기 여부
    ip: "119.195.213.30",  // 접속한 사용자의 IP 주소
    city: "Ansan-si",  // 접속한 도시
    region: "Gyeonggi-do",  // 접속한 지역
    country: "KR",  // 접속한 국가
    loc: "37.3236,126.8219",  // 위도 및 경도 정보
    org: "AS4766 Korea Telecom",  // 네트워크 제공자 정보
    postal: "15271",  // 우편번호
    timezone: "Asia/Seoul"  // 접속한 시간대
  }
};