const collectionName = "dailyAnalytics";

const collectionDescription = "매일 그 날 웹에 대해서 구글 Analytics를 통해 기록한 문의 고객에 대한 정보"

const collectionSampleData0 = {
  "_id": "66dbd24e9c11e28c3a074ac1",
  "anaid": "n2409_aa07s",
  "date": {
    "from": "2024-09-06T15:00:00.000Z",
    "to": "2024-09-07T15:00:00.000Z"
  },
  "data": {
    "users": {
      "total": 40,
      "detail": {
        "userType": {
          "cases": [
            {
              "case": "New Visitor",
              "value": 14
            },
            {
              "case": "",
              "value": 11
            },
            {
              "case": "Returning Visitor",
              "value": 11
            }
          ],
          "total": 36,
          "kinds": 3
        },
        "country": {
          "cases": [
            {
              "case": "South Korea",
              "value": 29
            }
          ],
          "total": 29,
          "kinds": 1
        },
        "city": {
          "cases": [
            {
              "case": "Seoul",
              "value": 9
            },
            {
              "case": "Busan",
              "value": 3
            },
          ],
          "total": 30,
          "kinds": 16
        },
        "campaign": {
          "cases": [
            {
              "case": "(not set)",
              "value": 18
            },
            {
              "case": "(direct)",
              "value": 4
            },
            {
              "case": "(organic)",
              "value": 4
            },
          ],
          "total": 40,
          "kinds": 12
        },
        "source": {
          "cases": [
            {
              "case": "(not set)",
              "value": 18
            },
            {
              "case": "naver",
              "value": 8
            },
          ],
          "total": 40,
          "kinds": 8
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "(not set)",
              "value": 18
            },
            {
              "case": "(direct) / (none)",
              "value": 4
            },
            {
              "case": "meta / interest_all_test",
              "value": 4
            },
          ],
          "total": 40,
          "kinds": 12
        }
      }
    },
    "views": {
      "total": 237,
      "detail": {
        "pagePath": {
          "cases": [
            {
              "case": "/desdetail.php?desid=d2104_aa09s",
              "value": 15
            },
            {
              "case": "/desdetail.php?desid=d2105_aa02s",
              "value": 12
            },
            {
              "case": "/designer.php",
              "value": 11
            },
          ],
          "total": 237,
          "kinds": 112
        },
        "referer": {
          "cases": [
            {
              "case": "https://home-liaison.com/designer.php",
              "value": 51
            },
            {
              "case": "https://home-liaison.com/designer/dashboard.php?desid=d2309_aa07s",
              "value": 21
            },
            {
              "case": "https://home-liaison.com/desdetail.php?desid=d2104_aa09s",
              "value": 15
            },
          ],
          "total": 237,
          "kinds": 50
        },
        "deviceCategory": {
          "cases": [
            {
              "case": "mobile",
              "value": 202
            },
            {
              "case": "desktop",
              "value": 35
            }
          ],
          "total": 237,
          "kinds": 2
        },
        "operatingSystem": {
          "cases": [
            {
              "case": "Android",
              "value": 175
            },
            {
              "case": "Macintosh",
              "value": 35
            },
            {
              "case": "iOS",
              "value": 27
            }
          ],
          "total": 237,
          "kinds": 3
        },
        "browser": {
          "cases": [
            {
              "case": "Whale Browser",
              "value": 160
            },
            {
              "case": "Safari",
              "value": 33
            },
            {
              "case": "Chrome",
              "value": 24
            },
            {
              "case": "Android Webview",
              "value": 15
            },
            {
              "case": "Safari (in-app)",
              "value": 5
            }
          ],
          "total": 237,
          "kinds": 5
        },
        "campaign": {
          "cases": [
            {
              "case": "(not set)",
              "value": 123
            },
            {
              "case": "image",
              "value": 43
            },
          ],
          "total": 237,
          "kinds": 12
        },
        "source": {
          "cases": [
            {
              "case": "(not set)",
              "value": 123
            },
            {
              "case": "naver",
              "value": 73
            },
          ],
          "total": 237,
          "kinds": 8
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "(not set)",
              "value": 123
            },
            {
              "case": "naver / brand",
              "value": 43
            },
          ],
          "total": 237,
          "kinds": 12
        }
      }
    },
    "events": {
      "total": 1518,
      "detail": {
        "pagePath": {
          "cases": [
            {
              "case": "/curation.php?cliid=c2409_aa32s",
              "value": 339
            },
            {
              "case": "/",
              "value": 150
            },
            {
              "case": "/desdetail.php?desid=d2104_aa09s",
              "value": 68
            },
          ],
          "total": 1518,
          "kinds": 120
        },
        "eventName": {
          "cases": [
            {
              "case": "readTimer",
              "value": 476
            },
            {
              "case": "page_view",
              "value": 237
            },
          ],
          "total": 1518,
          "kinds": 16
        },
        "campaign": {
          "cases": [
            {
              "case": "(not set)",
              "value": 562
            },
            {
              "case": "(direct)",
              "value": 402
            },
            {
              "case": "image",
              "value": 193
            },
          ],
          "total": 1518,
          "kinds": 12
        },
        "source": {
          "cases": [
            {
              "case": "(not set)",
              "value": 562
            },
            {
              "case": "(direct)",
              "value": 402
            },
          ],
          "total": 1518,
          "kinds": 8
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "(not set)",
              "value": 562
            },
            {
              "case": "(direct) / (none)",
              "value": 402
            },
          ],
          "total": 1518,
          "kinds": 12
        }
      }
    },
    "conversion": {
      "popupOpen": {
        "total": 0,
        "detail": {
          "pagePath": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "deviceCategory": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "operatingSystem": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "browser": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "campaign": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "source": {
            "cases": [],
            "total": 0,
            "kinds": 0
          },
          "sourceDetail": {
            "cases": [],
            "total": 0,
            "kinds": 0
          }
        }
      },
      "consultingPage": {
        "total": 1,
        "detail": {
          "deviceCategory": {
            "cases": [
              {
                "case": "desktop",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          },
          "operatingSystem": {
            "cases": [
              {
                "case": "Macintosh",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          },
          "browser": {
            "cases": [
              {
                "case": "Chrome",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          },
          "campaign": {
            "cases": [
              {
                "case": "(organic)",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          },
          "source": {
            "cases": [
              {
                "case": "google",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          },
          "sourceDetail": {
            "cases": [
              {
                "case": "google / organic",
                "value": 1
              }
            ],
            "total": 1,
            "kinds": 1
          }
        }
      }
    }
  }
}

