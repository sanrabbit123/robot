const collectionName = "metaComplex";

const collectionDescription = "메타 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비"

const collectionSampleData0 = {
  "_id": "66bd4a268e33158330329aa5",
  "camid": "f2408_fa13s",
  "key": "20240813_meta",
  "date": {
    "from": "2024-08-12T15:00:00.000Z",
    "to": "2024-08-13T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 213925,
      "performance": {
        "reach": 5461,
        "impressions": 6705,
        "clicks": 260
      },
      "length": {
        "campaign": 4,
        "adset": 7,
        "ad": 10
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 10093,
          "performance": {
            "reach": 538,
            "impressions": 584,
            "clicks": 25
          }
        },
        "information": {
          "id": "23854725673120375",
          "account": "505249990112820",
          "name": "전환_관심사타겟_디자이너_2306"
        },
        "children": [
          {
            "value": {
              "charge": 10093,
              "performance": {
                "reach": 538,
                "impressions": 584,
                "clicks": 25
              }
            },
            "information": {
              "id": "120206005775340376",
              "campaign": "23854725673120375",
              "name": "selling point_디자인 드로잉_2402"
            },
            "children": [
              {
                "value": {
                  "charge": 10093,
                  "performance": {
                    "reach": 538,
                    "impressions": 584,
                    "clicks": 25
                  }
                },
                "information": {
                  "id": "120206005775330376",
                  "adset": "120206005775340376",
                  "name": "drawing_01_carousel"
                }
              }
            ]
          }
        ]
      },
      {
        "value": {
          "charge": 102711,
          "performance": {
            "reach": 1912,
            "impressions": 2281,
            "clicks": 99
          }
        },
        "information": {
          "id": "23862022566240375",
          "account": "505249990112820",
          "name": "잠재고객_관심사타겟_일반_인스턴트양식_2403 캠페인"
        },
        "children": [
          {
            "value": {
              "charge": 51106,
              "performance": {
                "reach": 773,
                "impressions": 891,
                "clicks": 34
              }
            },
            "information": {
              "id": "120205838266970376",
              "campaign": "23862022566240375",
              "name": "selling point_인스턴트광고_test_2404"
            },
            "children": [
              {
                "value": {
                  "charge": 46880,
                  "performance": {
                    "reach": 707,
                    "impressions": 820,
                    "clicks": 32
                  }
                },
                "information": {
                  "id": "120207991043680376",
                  "adset": "120205838266970376",
                  "name": "instant_04_single"
                }
              },
              {
                "value": {
                  "charge": 4226,
                  "performance": {
                    "reach": 66,
                    "impressions": 71,
                    "clicks": 2
                  }
                },
                "information": {
                  "id": "120205842787320376",
                  "adset": "120205838266970376",
                  "name": "instant_02_single"
                }
              }
            ]
          },
          {
            "value": {
              "charge": 51605,
              "performance": {
                "reach": 1287,
                "impressions": 1390,
                "clicks": 65
              }
            },
            "information": {
              "id": "120211087328680376",
              "campaign": "23862022566240375",
              "name": "selling point_인스턴트광고_스토리_현장정보_2407"
            },
            "children": [
              {
                "value": {
                  "charge": 47334,
                  "performance": {
                    "reach": 1204,
                    "impressions": 1298,
                    "clicks": 58
                  }
                },
                "information": {
                  "id": "120211087328710376",
                  "adset": "120211087328680376",
                  "name": "instant_15_single"
                }
              },
              {
                "value": {
                  "charge": 4271,
                  "performance": {
                    "reach": 83,
                    "impressions": 92,
                    "clicks": 7
                  }
                },
                "information": {
                  "id": "120211087328700376",
                  "adset": "120211087328680376",
                  "name": "instant_14_single"
                }
              }
            ]
          }
        ]
      },
      {
        "value": {
          "charge": 60295,
          "performance": {
            "reach": 1687,
            "impressions": 2103,
            "clicks": 92
          }
        },
        "information": {
          "id": "120204485499390376",
          "account": "505249990112820",
          "name": "전환_관심사타겟_일반_2402 캠페인"
        },
        "children": [
          {
            "value": {
              "charge": 50127,
              "performance": {
                "reach": 1422,
                "impressions": 1654,
                "clicks": 79
              }
            },
            "information": {
              "id": "120209510209500376",
              "campaign": "120204485499390376",
              "name": "selling point_\b서비스H_2405"
            },
            "children": [
              {
                "value": {
                  "charge": 50127,
                  "performance": {
                    "reach": 1422,
                    "impressions": 1654,
                    "clicks": 79
                  }
                },
                "information": {
                  "id": "120209510209490376",
                  "adset": "120209510209500376",
                  "name": "service_homestyling_01_single"
                }
              }
            ]
          },
          {
            "value": {
              "charge": 10168,
              "performance": {
                "reach": 397,
                "impressions": 449,
                "clicks": 13
              }
            },
            "information": {
              "id": "120211463799380376",
              "campaign": "120204485499390376",
              "name": "selling point_\b서비스_2408"
            },
            "children": [
              {
                "value": {
                  "charge": 4059,
                  "performance": {
                    "reach": 139,
                    "impressions": 148,
                    "clicks": 4
                  }
                },
                "information": {
                  "id": "120211463799390376",
                  "adset": "120211463799380376",
                  "name": "service_H_single"
                }
              },
              {
                "value": {
                  "charge": 6109,
                  "performance": {
                    "reach": 258,
                    "impressions": 301,
                    "clicks": 9
                  }
                },
                "information": {
                  "id": "120211463819000376",
                  "adset": "120211463799380376",
                  "name": "service_T_single"
                }
              }
            ]
          }
        ]
      },
      {
        "value": {
          "charge": 40826,
          "performance": {
            "reach": 1324,
            "impressions": 1737,
            "clicks": 44
          }
        },
        "information": {
          "id": "120210976671700376",
          "account": "505249990112820",
          "name": "전환_관심사타겟_일반_홈스타일링/지역_2407_LightVer"
        },
        "children": [
          {
            "value": {
              "charge": 8899,
              "performance": {
                "reach": 268,
                "impressions": 351,
                "clicks": 16
              }
            },
            "information": {
              "id": "120210976671690376",
              "campaign": "120210976671700376",
              "name": "selling point_홈스타일링_판교_2407"
            },
            "children": [
              {
                "value": {
                  "charge": 8899,
                  "performance": {
                    "reach": 268,
                    "impressions": 351,
                    "clicks": 16
                  }
                },
                "information": {
                  "id": "120210976671750376",
                  "adset": "120210976671690376",
                  "name": "pg_homestyling_01_single"
                }
              }
            ]
          },
          {
            "value": {
              "charge": 31927,
              "performance": {
                "reach": 1071,
                "impressions": 1386,
                "clicks": 28
              }
            },
            "information": {
              "id": "120210976671790376",
              "campaign": "120210976671700376",
              "name": "selling point_홈스타일링_용산한남_2407"
            },
            "children": [
              {
                "value": {
                  "charge": 31927,
                  "performance": {
                    "reach": 1071,
                    "impressions": 1386,
                    "clicks": 28
                  }
                },
                "information": {
                  "id": "120210976671710376",
                  "adset": "120210976671790376",
                  "name": "yshn_homestyling_01_single"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "instagram": {
    "profile": {
      "views": 173,
      "followers": 0
    },
    "performance": {
      "impressions": 9390,
      "clicks": 16,
      "likes": 7,
      "comments": 0,
      "saves": 31,
      "shares": 2
    }
  }
}

