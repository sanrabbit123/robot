const collectionName = "addressComplex";

const collectionDescription = "네이버 부동산에서 끌고 온 아파트 단지 정보를 JSON 형태로 변환하여 저장한 기록"

const collectionSampleData0 = {
  "_id": "66c149100a17fbd09853fd46",
  "id": "land_complex_104917",
  "naver": "104917",
  "name": "마포래미안푸르지오",
  "date": "2024-08-18T01:06:24.622Z",
  "address": {
    "value": "서울시 마포구 마포대로 195",
    "latitude": 37.553341,
    "longitude": 126.953154,
    "zipCode": "04129",
    "detail": {
      "sido": "서울특별시",
      "sidoShort": "서울",
      "sigugun": "마포구",
      "dongmyun": "아현동",
      "ri": "",
      "roadName": "마포대로",
      "buildNumber": "195",
      "jibun": "777",
      "buildName": "마포래미안푸르지오",
      "roadGroupId": "114402113001",
      "zipcode": "04129",
      "bcode": "1144010100",
      "hcode": "1144055500"
    }
  },
  "information": {
    "date": "2014-08-31T15:00:00.000Z",
    "count": {
      "household": 3885,
      "dong": 51,
      "parking": 4580
    },
    "floor": {
      "low": 8,
      "high": 30
    },
    "type": {
      "length": 15,
      "detail": [
        {
          "name": "80A",
          "area": {
            "supply": 80.16,
            "exclusive": 59.96,
            "pyeong": 24.24,
            "exclusivePyeong": 18.13
          },
          "count": {
            "household": 572,
            "room": 3,
            "bathroom": 2
          }
        },
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
            "bathroom": 2
          }
        }
      ]
    }
  }
}

const collectionSampleData1 = {
  "_id": "669a2cb6ca44bdc9d78a01ad",
  "id": "land_complex_25874",
  "naver": "25874",
  "name": "고덕아이파크",
  "date": "2024-07-19T09:07:02.398Z",
  "address": {
    "value": "서울시 강동구 동남로79길 26",
    "latitude": 37.558909,
    "longitude": 127.155676,
    "zipCode": "05232",
    "detail": {
      "sido": "서울특별시",
      "sigugun": "강동구",
      "dongmyun": "고덕동",
      "ri": "",
      "roadName": "동남로79길",
      "buildNumber": "26",
      "jibun": "499",
      "buildName": "고덕아이파크",
      "roadGroupId": "117404172098",
      "zipcode": "05232",
      "bcode": "1174010200",
      "hcode": ""
    }
  },
  "information": {
    "date": "2011-12-27T15:00:00.000Z",
    "count": {
      "household": 1142,
      "dong": 14,
      "parking": 2024
    },
    "floor": {
      "low": 12,
      "high": 20
    },
    "type": {
      "length": 9,
      "detail": [
        {
          "name": "85",
          "area": {
            "supply": 85.07,
            "exclusive": 59.99,
            "pyeong": 25.73,
            "exclusivePyeong": 18.14
          },
          "count": {
            "household": 136,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "113A",
          "area": {
            "supply": 113.15,
            "exclusive": 84.98,
            "pyeong": 34.22,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 186,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "114B",
          "area": {
            "supply": 114.14,
            "exclusive": 84.98,
            "pyeong": 34.52,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 186,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "114",
          "area": {
            "supply": 114.16,
            "exclusive": 84.98,
            "pyeong": 34.53,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 102,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "147",
          "area": {
            "supply": 147.9,
            "exclusive": 114.98,
            "pyeong": 44.73,
            "exclusivePyeong": 34.78
          },
          "count": {
            "household": 170,
            "room": 4,
            "bathroom": 2
          }
        },
        {
          "name": "147A",
          "area": {
            "supply": 147.52,
            "exclusive": 115.45,
            "pyeong": 44.62,
            "exclusivePyeong": 34.92
          },
          "count": {
            "household": 39,
            "room": 4,
            "bathroom": 2
          }
        },
        {
          "name": "179A",
          "area": {
            "supply": 179.54,
            "exclusive": 145.22,
            "pyeong": 54.31,
            "exclusivePyeong": 43.92
          },
          "count": {
            "household": 78,
            "room": 4,
            "bathroom": 2
          }
        },
        {
          "name": "181B",
          "area": {
            "supply": 181.7,
            "exclusive": 145,
            "pyeong": 54.96,
            "exclusivePyeong": 43.86
          },
          "count": {
            "household": 39,
            "room": 4,
            "bathroom": 2
          }
        },
        {
          "name": "215",
          "area": {
            "supply": 215.88,
            "exclusive": 177.99,
            "pyeong": 65.3,
            "exclusivePyeong": 53.84
          },
          "count": {
            "household": 78,
            "room": 4,
            "bathroom": 3
          }
        }
      ]
    }
  }
}

const collectionSampleData2 = {
  "_id": "667df0a9b528994f84c72a28",
  "id": "land_complex_106199",
  "naver": "106199",
  "name": "미사강변한신휴플러스",
  "date": "2024-06-27T23:07:21.370Z",
  "address": {
    "value": "경기도 하남시 미사강변한강로 170",
    "latitude": 37.574364,
    "longitude": 127.191944,
    "zipCode": "12903",
    "detail": {
      "sido": "경기도",
      "sigugun": "하남시",
      "dongmyun": "망월동",
      "ri": "",
      "roadName": "미사강변한강로",
      "buildNumber": "170",
      "jibun": "904",
      "buildName": "미사강변 한신휴플러스",
      "roadGroupId": "414503202055",
      "zipcode": "12903",
      "bcode": "4145010900",
      "hcode": ""
    }
  },
  "information": {
    "date": "2015-01-15T15:00:00.000Z",
    "count": {
      "household": 763,
      "dong": 10,
      "parking": 915
    },
    "floor": {
      "low": 12,
      "high": 22
    },
    "type": {
      "length": 8,
      "detail": [
        {
          "name": "98A",
          "area": {
            "supply": 98.9,
            "exclusive": 74.61,
            "pyeong": 29.91,
            "exclusivePyeong": 22.56
          },
          "count": {
            "household": 240,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "98AN",
          "area": {
            "supply": 98.9,
            "exclusive": 74.61,
            "pyeong": 29.91,
            "exclusivePyeong": 22.56
          },
          "count": {
            "household": 20,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112B1",
          "area": {
            "supply": 112.65,
            "exclusive": 84.98,
            "pyeong": 34.07,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 192,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112B2",
          "area": {
            "supply": 112.57,
            "exclusive": 84.92,
            "pyeong": 34.05,
            "exclusivePyeong": 25.68
          },
          "count": {
            "household": 115,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112C",
          "area": {
            "supply": 112.3,
            "exclusive": 84.72,
            "pyeong": 33.97,
            "exclusivePyeong": 25.62
          },
          "count": {
            "household": 88,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112B3",
          "area": {
            "supply": 112.62,
            "exclusive": 84.96,
            "pyeong": 34.06,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 76,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112B1N",
          "area": {
            "supply": 112.65,
            "exclusive": 84.98,
            "pyeong": 34.07,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 20,
            "room": 3,
            "bathroom": 2
          }
        },
        {
          "name": "112B3N",
          "area": {
            "supply": 112.62,
            "exclusive": 84.96,
            "pyeong": 34.06,
            "exclusivePyeong": 25.7
          },
          "count": {
            "household": 12,
            "room": 3,
            "bathroom": 2
          }
        }
      ]
    }
  }
}

