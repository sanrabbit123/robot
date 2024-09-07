const collectionName = "naverComplex";

const collectionDescription = "네이버 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비"

const collectionSampleData0 = {
  "_id": "66bd4a028e33158330329a9f",
  "camid": "f2408_na14s",
  "key": "20240814_naver",
  "date": {
    "from": "2024-08-13T15:00:00.000Z",
    "to": "2024-08-14T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 124047,
      "performance": {
        "impressions": 1291,
        "clicks": 41
      },
      "length": {
        "web": 2,
        "power": 0,
        "contents": 0,
        "brand": 1,
        "place": 1,
        "etc": 0
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 16808,
          "performance": {
            "impressions": 511,
            "clicks": 8,
            "rank": 1.9
          }
        },
        "information": {
          "id": "cmp-a001-01-000000003101395",
          "type": "WEB_SITE",
          "name": "PO 홈리에종 : 특성"
        }
      },
      {
        "value": {
          "charge": 107239,
          "performance": {
            "impressions": 728,
            "clicks": 20,
            "rank": 1.2
          }
        },
        "information": {
          "id": "cmp-a001-01-000000004441942",
          "type": "WEB_SITE",
          "name": "PO2 홈리에종 : 메인 키워드"
        }
      },
      {
        "value": {
          "charge": 0,
          "performance": {
            "impressions": 30,
            "clicks": 13,
            "rank": 1
          }
        },
        "information": {
          "id": "cmp-a001-04-000000003198580",
          "type": "BRAND_SEARCH",
          "name": "BR 홈리에종 브랜드 검색"
        }
      },
      {
        "value": {
          "charge": 0,
          "performance": {
            "impressions": 22,
            "clicks": 0,
            "rank": 4.1
          }
        },
        "information": {
          "id": "cmp-a001-06-000000005250582",
          "type": "PLACE",
          "name": "PL 홈리에종 지역"
        }
      }
    ]
  }
}

const collectionSampleData1 = {
  "_id": "6590188e69591eb6056d9a10",
  "camid": "f2312_na25s",
  "key": "20231225_naver",
  "date": {
    "from": "2023-12-24T15:00:00.000Z",
    "to": "2023-12-25T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 23342,
      "performance": {
        "impressions": 247,
        "clicks": 19
      },
      "length": {
        "web": 2,
        "power": 0,
        "contents": 0,
        "brand": 1,
        "place": 1,
        "etc": 0
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 2673,
          "performance": {
            "impressions": 138,
            "clicks": 1,
            "rank": 2.5
          }
        },
        "information": {
          "id": "cmp-a001-01-000000003101395",
          "type": "WEB_SITE",
          "name": "PO-홈리에종"
        }
      },
      {
        "value": {
          "charge": 20669,
          "performance": {
            "impressions": 87,
            "clicks": 9,
            "rank": 1.9
          }
        },
        "information": {
          "id": "cmp-a001-01-000000004441942",
          "type": "WEB_SITE",
          "name": "PO_홈리에종_2"
        }
      },
      {
        "value": {
          "charge": 0,
          "performance": {
            "impressions": 16,
            "clicks": 9,
            "rank": 1
          }
        },
        "information": {
          "id": "cmp-a001-04-000000003198580",
          "type": "BRAND_SEARCH",
          "name": "브랜드검색#1"
        }
      },
      {
        "value": {
          "charge": 0,
          "performance": {
            "impressions": 6,
            "clicks": 0,
            "rank": 3.7
          }
        },
        "information": {
          "id": "cmp-a001-06-000000005250582",
          "type": "PLACE",
          "name": "PL_홈리에종"
        }
      }
    ]
  }
}

const collectionSampleData2 = {
  "_id": "652654321c6ca1415a954d8b",
  "camid": "f2305_na01s",
  "key": "20230501_naver",
  "date": {
    "from": "2023-04-30T15:00:00.000Z",
    "to": "2023-05-01T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 31009,
      "performance": {
        "impressions": 544,
        "clicks": 18
      },
      "length": {
        "web": 2,
        "power": 0,
        "contents": 0,
        "brand": 0,
        "place": 1,
        "etc": 0
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 10274,
          "performance": {
            "impressions": 388,
            "clicks": 7,
            "rank": 3.1
          }
        },
        "information": {
          "id": "cmp-a001-01-000000003101395",
          "type": "WEB_SITE",
          "name": "PO-홈리에종"
        }
      },
      {
        "value": {
          "charge": 20735,
          "performance": {
            "impressions": 130,
            "clicks": 11,
            "rank": 2.2
          }
        },
        "information": {
          "id": "cmp-a001-01-000000004441942",
          "type": "WEB_SITE",
          "name": "PO_홈리에종_2"
        }
      },
      {
        "value": {
          "charge": 0,
          "performance": {
            "impressions": 26,
            "clicks": 0,
            "rank": 2.3
          }
        },
        "information": {
          "id": "cmp-a001-06-000000005250582",
          "type": "PLACE",
          "name": "PL_홈리에종"
        }
      }
    ]
  }
}

