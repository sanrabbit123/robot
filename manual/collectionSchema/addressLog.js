const collectionName = "addressLog";

const collectionDescription = "주소 연산에 대한 기록과 중간 데이터"

/**
 * addressLog 컬렉션: 주소 연산에 대한 기록과 중간 데이터를 저장하는 컬렉션
 * 이 컬렉션은 주소 데이터를 분석하고 변환한 결과를 저장합니다.
 */

/**
 * 첫 번째 샘플 데이터: 서울 광진구 아차산로69길 19 (광장동, 현대아파트)에 대한 주소 연산 기록
 */
const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "66dc039128488b9c1b88e973",  // MongoDB에서 자동 생성된 고유 ObjectId로 문서를 식별합니다.
  
  /**
   * 입력된 주소 (input)
   * @type {string}
   */
  "input": "서울 광진구 아차산로69길 19 (광장동, 현대아파트) 902동 204호",  // 사용자 또는 시스템이 입력한 원본 주소입니다.
  
  /**
   * 주소 데이터 (address)
   * @type {object}
   */
  "address": {
    /**
     * 변환된 주소 정보 (address)
     * @type {object}
     */
    "address": {
      "zipcode": "04984",  // 변환된 주소의 우편번호입니다.
      "road": "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트) 현대아파트",  // 변환된 도로명 주소입니다.
      "parcel": "서울특별시 광진구 광장동 576 현대아파트",  // 변환된 지번 주소입니다.
      "english": "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul"  // 변환된 영어 주소입니다.
    },
    
    /**
     * 상세 주소 정보 (info)
     * @type {object}
     */
    "info": {
      "rn": "아차산로69길",  // 도로명
      "emdNm": "광장동",  // 읍/면/동명
      "emdNo": "01",  // 읍/면/동 번호
      "sggNm": "광진구",  // 시/군/구 명칭
      "siNm": "서울특별시",  // 시/도 명칭
      "bdNm": "현대아파트",  // 건물 이름
      "admCd": "1121510400",  // 행정동 코드
      "udrtYn": "0",  // 지하 여부 (0: 지상, 1: 지하)
      "lnbrMnnm": "576",  // 지번 본번
      "lnbrSlno": "0",  // 지번 부번 (없음)
      "buldMnnm": "19",  // 건물 본번
      "bdKdcd": "1",  // 건물 코드 (1: 일반 건물)
      "liNm": "",  // 리 명칭 (없음)
      "rnMgtSn": "112154112352",  // 도로명 관리 번호
      "mtYn": "0",  // 산 여부 (0: 평지)
      "bdMgtSn": "1121510400105760000011071",  // 건물 관리 번호
      "buldSlno": "0"  // 건물 부번 (없음)
    },
    
    /**
     * 좌표 정보 (point)
     * @type {object}
     */
    "point": {
      "x": 127.09829425076303,  // 좌표 X값 (경도)
      "y": 37.54296697980853,  // 좌표 Y값 (위도)
      "h": 964513.478912758,  // h 좌표 (3차원 공간 좌표)
      "v": 1949369.0138247,  // v 좌표 (3차원 공간 좌표)
      "value": "37.54296697980853,127.09829425076303"  // 좌표의 문자열 표현
    },
    
    /**
     * 쿼리 결과 (queryResult)
     * @type {Array}
     */
    "queryResult": [
      {
        "detBdNmList": "경비실, 관리동, 902동, 901동, 903동, 905동, 904동",  // 해당 건물 내 세부 동 리스트
        "engAddr": "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul",  // 영어 주소
        "rn": "아차산로69길",  // 도로명
        "emdNm": "광장동",  // 읍/면/동명
        "zipNo": "04984",  // 우편번호
        "roadAddrPart2": " (광장동, 현대아파트)",  // 도로명 주소 2부 (동/건물명)
        "emdNo": "01",  // 읍/면/동 번호
        "sggNm": "광진구",  // 시/군/구 명칭
        "jibunAddr": "서울특별시 광진구 광장동 576 현대아파트",  // 지번 주소
        "siNm": "서울특별시",  // 시/도 명칭
        "roadAddrPart1": "서울특별시 광진구 아차산로69길 19",  // 도로명 주소 1부
        "bdNm": "현대아파트",  // 건물 이름
        "admCd": "1121510400",  // 행정동 코드
        "udrtYn": "0",  // 지하 여부 (0: 지상)
        "lnbrMnnm": "576",  // 지번 본번
        "roadAddr": "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트)",  // 도로명 전체 주소
        "lnbrSlno": "0",  // 지번 부번 (없음)
        "buldMnnm": "19",  // 건물 본번
        "bdKdcd": "1",  // 건물 코드
        "liNm": "",  // 리 명칭 (없음)
        "rnMgtSn": "112154112352",  // 도로명 관리 번호
        "mtYn": "0",  // 산 여부
        "bdMgtSn": "1121510400105760000011071",  // 건물 관리 번호
        "buldSlno": "0"  // 건물 부번
      }
    ]
  }
}

/**
 * 두 번째 샘플 데이터: 경기 수원시 영통구 영통로290번길 26 (벽적골주공 휴먼시아8단지)에 대한 주소 연산 기록
 */
const collectionSampleData1 = {
  "_id": "66c09c167d20f001559ff9a5",  // MongoDB에서 자동 생성된 고유 ObjectId로 문서를 식별합니다.
  "input": "경기 수원시 영통구 영통로290번길 26 (영통동, 벽적골주공 휴먼시아8단지) 845702",  // 원본 주소 입력
  "address": {
    "address": {
      "zipcode": "16698",  // 우편번호
      "road": "경기도 수원시 영통구 영통로290번길 26 (영통동, 벽적골주공 휴먼시아8단지)",  // 도로명 주소
      "parcel": "경기도 수원시 영통구 영통동 972-2 벽적골주공 휴먼시아8단지",  // 지번 주소
      "english": "26 Yeongtong-ro 290beon-gil, Yeongtong-gu, Suwon-si, Gyeonggi-do"  // 영어 주소
    },
    "info": {
      "rn": "영통로290번길",  // 도로명
      "emdNm": "영통동",  // 읍/면/동명
      "emdNo": "01",  // 읍/면/동 번호
      "sggNm": "수원시 영통구",  // 시/군/구 명칭
      "siNm": "경기도",  // 시/도 명칭
      "bdNm": "벽적골주공 휴먼시아8단지",  // 건물 이름
      "admCd": "4111710500",  // 행정동 코드
      "udrtYn": "0",  // 지하 여부 (0: 지상)
      "lnbrMnnm": "972",  // 지번 본번
      "lnbrSlno": "2",  // 지번 부번
      "buldMnnm": "26",  // 건물 본번
      "bdKdcd": "1",  // 건물 코드
      "liNm": "",  // 리 명칭 (없음)
      "rnMgtSn": "411174331141",  // 도로명 관리 번호
      "mtYn": "0",  // 산 여부
      "bdMgtSn": "4111710500109720002003241",  // 건물 관리 번호
      "buldSlno": "0"  // 건물 부번
    },
    "point": {
      "x": 127.06207382197977,  // 좌표 X값 (경도)
      "y": 37.25136761302005,  // 좌표 Y값 (위도)
      "h": 961163.590908359,  // h 좌표
      "v": 1917032.8099385407,  // v 좌표
      "value": "37.25136761302005,127.06207382197977"  // 좌표의 문자열 표현
    },
    "queryResult": [
      {
        "detBdNmList": "831동,840동,842동,841동,상가,843동,844동,관리사무소,벽적골주공1아파트관리사무소...",  // 해당 건물의 동 리스트
        "engAddr": "26 Yeongtong-ro 290beon-gil, Yeongtong-gu, Suwon-si, Gyeonggi-do",  // 영어 주소
        // 이하 데이터는 첫 번째 샘플과 동일한 형식의 정보
      }
    ]
  }
}
