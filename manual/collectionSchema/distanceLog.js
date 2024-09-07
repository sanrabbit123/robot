/**
 * 콜렉션 이름
 * @type {string}
 * @description 고객 주소와 디자이너 주소 간의 거리를 계산한 기록과 중간 데이터를 저장하는 컬렉션
 */
const collectionName = "distanceLog";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 고객과 디자이너의 주소 간의 거리 계산에 대한 정보를 기록
 */
const collectionDescription = "고객 주소, 디자이너 주소 간 거리 연산에 대한 기록과 중간 데이터";

/**
 * 샘플 데이터 0
 * @typedef {Object} DistanceLog
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {Object} input 입력 데이터 (거리 계산에 사용된 출발지와 목적지 정보)
 * @property {string} input.origin 출발지의 좌표 (위도, 경도 형식)
 * @property {string} input.destination 목적지의 좌표 (위도, 경도 형식)
 * @property {Object} distance 계산된 거리 및 관련 정보
 * @property {number} distance.meters 출발지와 목적지 간의 거리 (단위: 미터)
 * @property {number} distance.seconds 출발지에서 목적지까지의 예상 시간 (단위: 초)
 * @property {Object} distance.from 출발지에 대한 상세 정보
 * @property {Object} distance.from.address 출발지의 주소 정보
 * @property {string} distance.from.address.zipcode 출발지 우편번호
 * @property {string} distance.from.address.road 출발지 도로명 주소
 * @property {string} distance.from.address.parcel 출발지 지번 주소
 * @property {string} distance.from.address.english 출발지 영문 주소
 * @property {Object} distance.from.info 출발지에 대한 부가 정보
 * @property {Object} distance.from.point 출발지의 좌표 정보
 * @property {Array<Object>} distance.from.queryResult 출발지에 대한 추가 검색 결과
 * @property {Object} distance.to 목적지에 대한 상세 정보
 * @property {Object} distance.to.address 목적지의 주소 정보
 * @property {string} distance.to.address.zipcode 목적지 우편번호
 * @property {string} distance.to.address.road 목적지 도로명 주소
 * @property {string} distance.to.address.parcel 목적지 지번 주소
 * @property {string} distance.to.address.english 목적지 영문 주소
 * @property {Object} distance.to.info 목적지에 대한 부가 정보
 * @property {Object} distance.to.point 목적지의 좌표 정보
 * @property {Array<Object>} distance.to.queryResult 목적지에 대한 추가 검색 결과
 */
const collectionSampleData0 = {
  _id: "66dc039328488b9c1b88e97a",  // MongoDB에서 자동 생성된 고유 ID
  input: {
    origin: "37.628837228869735,127.11516750707831",  // 출발지의 위도와 경도 정보
    destination: "37.54296697980853,127.09829425076303"  // 목적지의 위도와 경도 정보
  },
  distance: {
    meters: 14152,  // 출발지와 목적지 사이의 거리 (단위: 미터)
    seconds: 2205,  // 출발지에서 목적지까지의 예상 시간 (단위: 초)
    from: {
      address: {
        zipcode: "11902",  // 출발지의 우편번호
        road: "경기도 구리시 갈매중앙로 45(갈매동, 갈매와이시티)",  // 출발지의 도로명 주소
        parcel: "경기도 구리시 갈매동 626 갈매와이시티",  // 출발지의 지번 주소
        english: "45, Galmaejungang-ro, Guri-si, Gyeonggi-do"  // 출발지의 영문 주소
      },
      info: {
        rn: "갈매중앙로",  // 도로명
        emdNm: "갈매동",  // 읍면동 이름
        emdNo: "01",  // 읍면동 번호
        sggNm: "구리시",  // 시군구 이름
        siNm: "경기도",  // 도 이름
        bdNm: "갈매와이시티",  // 건물 이름
        admCd: "4131010100",  // 행정 구역 코드
        udrtYn: "0",  // 지하 여부 (0: 지상)
        lnbrMnnm: "626",  // 지번 본번
        lnbrSlno: "0",  // 지번 부번
        buldMnnm: "45",  // 건물 본번
        bdKdcd: "1",  // 건물 코드 (1: 일반 건물)
        rnMgtSn: "413103351113",  // 도로명 관리번호
        mtYn: "0",  // 산 여부 (0: 평지)
        bdMgtSn: "4131010100103320001010692",  // 건물 관리번호
        buldSlno: "0"  // 건물 부번
      },
      point: {
        x: 127.11516750707831,  // 출발지의 경도
        y: 37.628837228869735,  // 출발지의 위도
        h: 966043.0915500501,  // 출발지의 수평 위치
        v: 1958889.6461313954,  // 출발지의 수직 위치
        value: "37.628837228869735,127.11516750707831"  // 좌표 정보 문자열
      },
      queryResult: [
        {
          detBdNmList: "502동, 501동, 어린이집, 505동, 504동, 503동",  // 출발지의 건물 정보
          engAddr: "45, Galmaejungang-ro, Guri-si, Gyeonggi-do",  // 출발지의 영문 주소
          rn: "갈매중앙로",  // 도로명
          emdNm: "갈매동",  // 읍면동 이름
          zipNo: "11902",  // 우편번호
          roadAddrPart2: "(갈매동, 갈매와이시티)",  // 도로명 주소 2
          emdNo: "01",  // 읍면동 번호
          sggNm: "구리시",  // 시군구 이름
          jibunAddr: "경기도 구리시 갈매동 626 갈매와이시티",  // 지번 주소
          siNm: "경기도",  // 도 이름
          roadAddrPart1: "경기도 구리시 갈매중앙로 45",  // 도로명 주소 1
          bdNm: "갈매와이시티",  // 건물 이름
          admCd: "4131010100",  // 행정 구역 코드
          udrtYn: "0",  // 지하 여부 (0: 지상)
          lnbrMnnm: "626",  // 지번 본번
          roadAddr: "경기도 구리시 갈매중앙로 45(갈매동, 갈매와이시티)",  // 도로명 주소
          lnbrSlno: "0",  // 지번 부번
          buldMnnm: "45",  // 건물 본번
          bdKdcd: "1",  // 건물 코드 (1: 일반 건물)
          liNm: "",  // 리 이름 (빈 값)
          rnMgtSn: "413103351113",  // 도로명 관리번호
          mtYn: "0",  // 산 여부 (0: 평지)
          bdMgtSn: "4131010100103320001010692",  // 건물 관리번호
          buldSlno: "0"  // 건물 부번
        }
      ]
    },
    to: {
      address: {
        zipcode: "04984",  // 목적지의 우편번호
        road: "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트)",  // 목적지의 도로명 주소
        parcel: "서울특별시 광진구 광장동 576 현대아파트",  // 목적지의 지번 주소
        english: "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul"  // 목적지의 영문 주소
      },
      info: {
        rn: "아차산로69길",  // 도로명
        emdNm: "광장동",  // 읍면동 이름
        emdNo: "01",  // 읍면동 번호
        sggNm: "광진구",  // 시군구 이름
        siNm: "서울특별시",  // 도 이름
        bdNm: "현대아파트",  // 건물 이름
        admCd: "1121510400",  // 행정 구역 코드
        udrtYn: "0",  // 지하 여부 (0: 지상)
        lnbrMnnm: "576",  // 지번 본번
        lnbrSlno: "0",  // 지번 부번
        buldMnnm: "19",  // 건물 본번
        bdKdcd: "1",  // 건물 코드 (1: 일반 건물)
        rnMgtSn: "112154112352",  // 도로명 관리번호
        mtYn: "0",  // 산 여부 (0: 평지)
        bdMgtSn: "1121510400105760000011071",  // 건물 관리번호
        buldSlno: "0"  // 건물 부번
      },
      point: {
        x: 127.09829425076303,  // 목적지의 경도
        y: 37.54296697980853,  // 목적지의 위도
        h: 964513.478912758,  // 목적지의 수평 위치
        v: 1949369.0138247,  // 목적지의 수직 위치
        value: "37.54296697980853,127.09829425076303"  // 좌표 정보 문자열
      },
      queryResult: [
        {
          detBdNmList: "경비실, 관리동, 902동, 901동, 903동, 905동, 904동",  // 목적지의 건물 정보
          engAddr: "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul",  // 목적지의 영문 주소
          rn: "아차산로69길",  // 도로명
          emdNm: "광장동",  // 읍면동 이름
          zipNo: "04984",  // 우편번호
          roadAddrPart2: " (광장동, 현대아파트)",  // 도로명 주소 2
          emdNo: "01",  // 읍면동 번호
          sggNm: "광진구",  // 시군구 이름
          jibunAddr: "서울특별시 광진구 광장동 576 현대아파트",  // 지번 주소
          siNm: "서울특별시",  // 도 이름
          roadAddrPart1: "서울특별시 광진구 아차산로69길 19",  // 도로명 주소 1
          bdNm: "현대아파트",  // 건물 이름
          admCd: "1121510400",  // 행정 구역 코드
          udrtYn: "0",  // 지하 여부 (0: 지상)
          lnbrMnnm: "576",  // 지번 본번
          roadAddr: "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트)",  // 도로명 주소
          lnbrSlno: "0",  // 지번 부번
          buldMnnm: "19",  // 건물 본번
          bdKdcd: "1",  // 건물 코드 (1: 일반 건물)
          liNm: "",  // 리 이름 (빈 값)
          rnMgtSn: "112154112352",  // 도로명 관리번호
          mtYn: "0",  // 산 여부 (0: 평지)
          bdMgtSn: "1121510400105760000011071",  // 건물 관리번호
          buldSlno: "0"  // 건물 부번
        }
      ]
    }
  }
}