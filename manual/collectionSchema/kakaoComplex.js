const collectionName = "kakaoComplex";

const collectionDescription = "카카오 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비"

const collectionSampleData0 = {
  "_id": "66628eff03dba13862cf70fb",
  "camid": "f2406_ka06s",
  "key": "20240606_kakao",
  "date": {
    "from": "2024-06-05T15:00:00.000Z",
    "to": "2024-06-06T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 0,
      "performance": {
        "play": 0,
        "impressions": 0,
        "clicks": 0
      },
      "length": {
        "campaign": 1,
        "adset": 1,
        "ad": 1
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 0,
          "performance": {
            "play": 0,
            "impressions": 0,
            "clicks": 0
          }
        },
        "information": {
          "id": "1232683",
          "account": "608725",
          "name": "카카오톡 톡채널_도달_2024.03-06"
        },
        "children": [
          {
            "value": {
              "charge": 0,
              "performance": {
                "play": 0,
                "impressions": 0,
                "clicks": 0
              }
            },
            "information": {
              "id": "3382528",
              "campaign": "1232683",
              "name": "카카오 톡채널_도달_할인율_디자이너_active_240516"
            },
            "children": [
              {
                "value": {
                  "charge": 0,
                  "performance": {
                    "play": 0,
                    "impressions": 0,
                    "clicks": 0
                  }
                },
                "information": {
                  "id": "25613632",
                  "adset": "3382528",
                  "name": "카카오톡 채널_도달_202405141153"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

const collectionSampleData1 = {
  "_id": "65f4047e27553efba5d72ac1",
  "camid": "f2402_ka27s",
  "key": "20240227_kakao",
  "date": {
    "from": "2024-02-26T15:00:00.000Z",
    "to": "2024-02-27T15:00:00.000Z"
  },
  "advertisement": {
    "value": {
      "charge": 0,
      "performance": {
        "play": 0,
        "impressions": 0,
        "clicks": 0
      },
      "length": {
        "campaign": 1,
        "adset": 2,
        "ad": 2
      }
    },
    "campaign": [
      {
        "value": {
          "charge": 0,
          "performance": {
            "play": 0,
            "impressions": 0,
            "clicks": 0
          }
        },
        "information": {
          "id": "1218157",
          "account": "608725",
          "name": "카카오톡 톡채널_도달_2024.02"
        },
        "children": [
          {
            "value": {
              "charge": 0,
              "performance": {
                "play": 0,
                "impressions": 0,
                "clicks": 0
              }
            },
            "information": {
              "id": "3242044",
              "campaign": "1218157",
              "name": "카카오 톡채널_도달_관심사_인테리어/부동산/금융/이벤트_all3059"
            },
            "children": [
              {
                "value": {
                  "charge": 0,
                  "performance": {
                    "play": 0,
                    "impressions": 0,
                    "clicks": 0
                  }
                },
                "information": {
                  "id": "24829297",
                  "adset": "3242044",
                  "name": "카카오톡 채널_도달_202402131516"
                }
              }
            ]
          },
          {
            "value": {
              "charge": 0,
              "performance": {
                "play": 0,
                "impressions": 0,
                "clicks": 0
              }
            },
            "information": {
              "id": "3252051",
              "campaign": "1218157",
              "name": "카카오 톡채널_도달_관심사_인테리어/부동산/금융/이벤트_female3059"
            },
            "children": [
              {
                "value": {
                  "charge": 0,
                  "performance": {
                    "play": 0,
                    "impressions": 0,
                    "clicks": 0
                  }
                },
                "information": {
                  "id": "24895214",
                  "adset": "3252051",
                  "name": "카카오톡 채널_도달_202402201413_구매성격"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

