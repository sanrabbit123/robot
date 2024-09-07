const collectionName = "simpleAnalytics";

const collectionDescription = "구글 Analytics가 종합적인 연산을 할 때 잠시 구글 API를 통해 일시적으로 만든 보고서의 디비"

const collectionSampleData0 = {
  "_id": "66db9fd450474b7b47a8fba7",
  "key": "simple_analytics_20240809_20240811",
  "date": {
    "from": "2024-08-08T15:00:00.000Z",
    "to": "2024-08-11T15:00:00.000Z"
  },
  "data": {
    "users": {
      "total": 1066,
      "detail": {
        "userType": {
          "cases": [
            {
              "case": "New Visitor",
              "value": 833
            },
            {
              "case": "Returning Visitor",
              "value": 186
            },
            {
              "case": "(not set)",
              "value": 47
            }
          ],
          "total": 1066,
          "kinds": 3
        },
        "campaign": {
          "cases": [
            {
              "case": "ads03",
              "value": 170
            },
            {
              "case": "(direct)",
              "value": 110
            },
          ],
          "total": 1018,
          "kinds": 49
        },
        "source": {
          "cases": [
            {
              "case": "meta",
              "value": 280
            },
            {
              "case": "naver",
              "value": 255
            },
          ],
          "total": 1013,
          "kinds": 22
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "meta / interest_all_test",
              "value": 218
            },
            {
              "case": "carrot / 2408",
              "value": 172
            },
          ],
          "total": 1014,
          "kinds": 37
        }
      }
    },
    "events": {
      "total": 25373,
      "detail": {
        "eventName": {
          "cases": [
            {
              "case": "page_view",
              "value": 4763
            },
            {
              "case": "pageInit",
              "value": 4001
            },
          ],
          "total": 25373,
          "kinds": 44
        },
        "campaign": {
          "cases": [
            {
              "case": "(organic)",
              "value": 5721
            },
            {
              "case": "(direct)",
              "value": 2894
            },
            {
              "case": "service_homestyling_01_single",
              "value": 1964
            },
          ],
          "total": 25373,
          "kinds": 49
        },
        "source": {
          "cases": [
            {
              "case": "naver",
              "value": 9135
            },
            {
              "case": "meta",
              "value": 5152
            },
            {
              "case": "(direct)",
              "value": 2894
            },
          ],
          "total": 25373,
          "kinds": 22
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "meta / interest_all_test",
              "value": 4631
            },
            {
              "case": "naver / organic",
              "value": 3542
            },
            {
              "case": "(direct) / (none)",
              "value": 2894
            },
          ],
          "total": 25373,
          "kinds": 37
        }
      }
    }
  }
}
