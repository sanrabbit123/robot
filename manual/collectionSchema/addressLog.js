const collectionName = "addressLog";

const collectionDescription = "주소 연산에 대한 기록과 중간 데이터"

const collectionSampleData0 = {
  "_id": "66dc039128488b9c1b88e973",
  "input": "서울 광진구 아차산로69길 19 (광장동, 현대아파트) 902동  204호",
  "address": {
    "address": {
      "zipcode": "04984",
      "road": "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트) 현대아파트",
      "parcel": "서울특별시 광진구 광장동 576 현대아파트",
      "english": "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul"
    },
    "info": {
      "rn": "아차산로69길",
      "emdNm": "광장동",
      "emdNo": "01",
      "sggNm": "광진구",
      "siNm": "서울특별시",
      "bdNm": "현대아파트",
      "admCd": "1121510400",
      "udrtYn": "0",
      "lnbrMnnm": "576",
      "lnbrSlno": "0",
      "buldMnnm": "19",
      "bdKdcd": "1",
      "liNm": "",
      "rnMgtSn": "112154112352",
      "mtYn": "0",
      "bdMgtSn": "1121510400105760000011071",
      "buldSlno": "0"
    },
    "point": {
      "x": 127.09829425076303,
      "y": 37.54296697980853,
      "h": 964513.478912758,
      "v": 1949369.0138247,
      "value": "37.54296697980853,127.09829425076303"
    },
    "queryResult": [
      {
        "detBdNmList": "경비실, 관리동, 902동, 901동, 903동, 905동, 904동",
        "engAddr": "19 Achasan-ro 69-gil, Gwangjin-gu, Seoul",
        "rn": "아차산로69길",
        "emdNm": "광장동",
        "zipNo": "04984",
        "roadAddrPart2": " (광장동, 현대아파트)",
        "emdNo": "01",
        "sggNm": "광진구",
        "jibunAddr": "서울특별시 광진구 광장동 576 현대아파트",
        "siNm": "서울특별시",
        "roadAddrPart1": "서울특별시 광진구 아차산로69길 19",
        "bdNm": "현대아파트",
        "admCd": "1121510400",
        "udrtYn": "0",
        "lnbrMnnm": "576",
        "roadAddr": "서울특별시 광진구 아차산로69길 19 (광장동, 현대아파트)",
        "lnbrSlno": "0",
        "buldMnnm": "19",
        "bdKdcd": "1",
        "liNm": "",
        "rnMgtSn": "112154112352",
        "mtYn": "0",
        "bdMgtSn": "1121510400105760000011071",
        "buldSlno": "0"
      }
    ]
  }
}

const collectionSampleData1 = {
  "_id": "66c09c167d20f001559ff9a5",
  "input": "경기 수원시 영통구 영통로290번길 26 (영통동, 벽적골주공 휴먼시아8단지) 845702",
  "address": {
    "address": {
      "zipcode": "16698",
      "road": "경기도 수원시 영통구 영통로290번길 26 (영통동, 벽적골주공 휴먼시아8단지)",
      "parcel": "경기도 수원시 영통구 영통동 972-2 벽적골주공 휴먼시아8단지",
      "english": "26 Yeongtong-ro 290beon-gil, Yeongtong-gu, Suwon-si, Gyeonggi-do"
    },
    "info": {
      "rn": "영통로290번길",
      "emdNm": "영통동",
      "emdNo": "01",
      "sggNm": "수원시 영통구",
      "siNm": "경기도",
      "bdNm": "벽적골주공 휴먼시아8단지",
      "admCd": "4111710500",
      "udrtYn": "0",
      "lnbrMnnm": "972",
      "lnbrSlno": "2",
      "buldMnnm": "26",
      "bdKdcd": "1",
      "liNm": "",
      "rnMgtSn": "411174331141",
      "mtYn": "0",
      "bdMgtSn": "4111710500109720002003241",
      "buldSlno": "0"
    },
    "point": {
      "x": 127.06207382197977,
      "y": 37.25136761302005,
      "h": 961163.590908359,
      "v": 1917032.8099385407,
      "value": "37.25136761302005,127.06207382197977"
    },
    "queryResult": [
      {
        "detBdNmList": "831동,840동,842동,841동,상가,843동,844동,관리사무소,벽적골주공1아파트관리사무소,834동,845동,838동,835동,837동,836동,833동,847동,846동,848동,832동,839동",
        "engAddr": "26 Yeongtong-ro 290beon-gil, Yeongtong-gu, Suwon-si, Gyeonggi-do",
        "rn": "영통로290번길",
        "emdNm": "영통동",
        "zipNo": "16698",
        "roadAddrPart2": " (영통동, 벽적골주공 휴먼시아8단지)",
        "emdNo": "01",
        "sggNm": "수원시 영통구",
        "jibunAddr": "경기도 수원시 영통구 영통동 972-2 벽적골주공 휴먼시아8단지",
        "siNm": "경기도",
        "roadAddrPart1": "경기도 수원시 영통구 영통로290번길 26",
        "bdNm": "벽적골주공 휴먼시아8단지",
        "admCd": "4111710500",
        "udrtYn": "0",
        "lnbrMnnm": "972",
        "roadAddr": "경기도 수원시 영통구 영통로290번길 26 (영통동, 벽적골주공 휴먼시아8단지)",
        "lnbrSlno": "2",
        "buldMnnm": "26",
        "bdKdcd": "1",
        "liNm": "",
        "rnMgtSn": "411174331141",
        "mtYn": "0",
        "bdMgtSn": "4111710500109720002003241",
        "buldSlno": "0"
      }
    ]
  }
}

const collectionSampleData2 = {
  "_id": "66c09c167d20f001559fed19",
  "input": "경기 성남시 분당구 분당로201번길 17 현대아파트 112동 1503호",
  "address": {
    "address": {
      "zipcode": "13586",
      "road": "경기도 성남시 분당구 분당로201번길 17(서현동, 효자촌)",
      "parcel": "경기도 성남시 분당구 서현동 300 효자촌",
      "english": "17, Bundang-ro 201beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do"
    },
    "info": {
      "rn": "분당로201번길",
      "emdNm": "서현동",
      "emdNo": "01",
      "sggNm": "성남시 분당구",
      "siNm": "경기도",
      "bdNm": "효자촌",
      "admCd": "4113510500",
      "udrtYn": "0",
      "lnbrMnnm": "300",
      "lnbrSlno": "0",
      "buldMnnm": "17",
      "bdKdcd": "1",
      "liNm": "",
      "rnMgtSn": "411354340154",
      "mtYn": "0",
      "bdMgtSn": "4113510500102990000001943",
      "buldSlno": "0"
    },
    "point": {
      "x": 127.13372572275395,
      "y": 37.374629226203666,
      "h": 967570.8801771407,
      "v": 1930680.426250672,
      "value": "37.374629226203666,127.13372572275395"
    },
    "queryResult": [
      {
        "detBdNmList": "111동, 106동, 104동, 관리동, 101동, 103동, 105동, 유치원동, 102동, 107동, 113동, 112동, 108동, 109동, 114동, 분산상가동, 110동",
        "engAddr": "17, Bundang-ro 201beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do",
        "rn": "분당로201번길",
        "emdNm": "서현동",
        "zipNo": "13586",
        "roadAddrPart2": "(서현동, 효자촌)",
        "emdNo": "01",
        "sggNm": "성남시 분당구",
        "jibunAddr": "경기도 성남시 분당구 서현동 300 효자촌",
        "siNm": "경기도",
        "roadAddrPart1": "경기도 성남시 분당구 분당로201번길 17",
        "bdNm": "효자촌",
        "admCd": "4113510500",
        "udrtYn": "0",
        "lnbrMnnm": "300",
        "roadAddr": "경기도 성남시 분당구 분당로201번길 17(서현동, 효자촌)",
        "lnbrSlno": "0",
        "buldMnnm": "17",
        "bdKdcd": "1",
        "liNm": "",
        "rnMgtSn": "411354340154",
        "mtYn": "0",
        "bdMgtSn": "4113510500102990000001943",
        "buldSlno": "0"
      }
    ]
  }
}

