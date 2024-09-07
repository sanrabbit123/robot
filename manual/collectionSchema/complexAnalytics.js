const collectionName = "complexAnalytics";

const collectionDescription = "매일 그 날 웹에 대해서 구글 Analytics를 통해 기록한 모든 유저와 이벤트에 대한 정보"

const collectionSampleData0 = {
  "_id": "66c1c641414481dd471757ee",
  "key": "complex_analytics_20240801_20240817",
  "date": {
    "from": "2024-07-31T15:00:00.000Z",
    "to": "2024-08-17T15:00:00.000Z"
  },
  "data": {
    "users": {
      "total": 7330,
      "detail": {
        "userType": {
          "cases": [
            {
              "case": "New Visitor",
              "value": 6000
            },
            {
              "case": "Returning Visitor",
              "value": 1040
            },
            {
              "case": "(not set)",
              "value": 290
            }
          ],
          "total": 7330,
          "kinds": 3
        },
        "country": {
          "cases": [
            {
              "case": "South Korea",
              "value": 6407
            },
            {
              "case": "United States",
              "value": 45
            },
          ],
          "total": 6500,
          "kinds": 23
        },
        "city": {
          "cases": [
            {
              "case": "Seoul",
              "value": 3220
            },
            {
              "case": "Busan",
              "value": 526
            },
            {
              "case": "Seongnam-si",
              "value": 226
            },
          ],
          "total": 6934,
          "kinds": 152
        },
        "campaign": {
          "cases": [
            {
              "case": "ads03",
              "value": 1586
            },
            {
              "case": "(direct)",
              "value": 742
            },
            {
              "case": "(organic)",
              "value": 723
            },
            {
              "case": "service_homestyling_01_single",
              "value": 633
            }
          ],
          "total": 6741,
          "kinds": 79
        },
        "source": {
          "cases": [
            {
              "case": "naver",
              "value": 1685
            },
            {
              "case": "carrot",
              "value": 1646
            },
            {
              "case": "meta",
              "value": 1436
            },
          ],
          "total": 6622,
          "kinds": 45
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "carrot / 2408",
              "value": 1646
            },
            {
              "case": "meta / interest_all_test",
              "value": 1100
            },
            {
              "case": "(direct) / (none)",
              "value": 742
            },
          ],
          "total": 6662,
          "kinds": 65
        }
      }
    },
    "views": {
      "total": 38654,
      "detail": {
        "pagePath": {
          "cases": [
            {
              "case": "/portfolio.php",
              "value": 2234
            },
            {
              "case": "/",
              "value": 1489
            },
            {
              "case": "/review.php",
              "value": 1181
            },
          ],
          "total": 38654,
          "kinds": 6327
        },
        "referer": {
          "cases": [
            {
              "case": "https://home-liaison.com/portfolio.php",
              "value": 2691
            },
            {
              "case": "https://home-liaison.com/designer.php",
              "value": 1615
            },
            {
              "case": "http://instagram.com/",
              "value": 1415
            },
          ],
          "total": 38654,
          "kinds": 4098
        },
        "deviceCategory": {
          "cases": [
            {
              "case": "mobile",
              "value": 25941
            },
            {
              "case": "desktop",
              "value": 11922
            },
            {
              "case": "tablet",
              "value": 791
            }
          ],
          "total": 38654,
          "kinds": 3
        },
        "operatingSystem": {
          "cases": [
            {
              "case": "Android",
              "value": 16454
            },
            {
              "case": "iOS",
              "value": 10270
            },
            {
              "case": "Windows",
              "value": 7569
            },
            {
              "case": "Macintosh",
              "value": 4271
            },
            {
              "case": "Linux",
              "value": 87
            },
            {
              "case": "(not set)",
              "value": 1
            },
            {
              "case": "Chrome OS",
              "value": 1
            },
            {
              "case": "Tizen",
              "value": 1
            }
          ],
          "total": 38654,
          "kinds": 8
        },
        "browser": {
          "cases": [
            {
              "case": "Android Webview",
              "value": 9869
            },
            {
              "case": "Chrome",
              "value": 8410
            },
            {
              "case": "Safari (in-app)",
              "value": 5361
            },
            {
              "case": "Safari",
              "value": 5323
            },
            {
              "case": "Whale Browser",
              "value": 5112
            },
            {
              "case": "Edge",
              "value": 3110
            },
            {
              "case": "Samsung Internet",
              "value": 1448
            },
            {
              "case": "Firefox",
              "value": 10
            },
            {
              "case": "Mozilla Compatible Agent",
              "value": 7
            },
            {
              "case": "Opera",
              "value": 2
            },
            {
              "case": "(not set)",
              "value": 1
            },
            {
              "case": "Phoenix Browser",
              "value": 1
            }
          ],
          "total": 38654,
          "kinds": 12
        },
        "campaign": {
          "cases": [
            {
              "case": "(referral)",
              "value": 6288
            },
            {
              "case": "(organic)",
              "value": 6249
            },
            {
              "case": "(direct)",
              "value": 6209
            },
          ],
          "total": 38654,
          "kinds": 79
        },
        "source": {
          "cases": [
            {
              "case": "naver",
              "value": 11578
            },
            {
              "case": "(direct)",
              "value": 6209
            },
            {
              "case": "meta",
              "value": 5945
            },
          ],
          "total": 38654,
          "kinds": 45
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "(direct) / (none)",
              "value": 6209
            },
            {
              "case": "meta / interest_all_test",
              "value": 5127
            },
          ],
          "total": 38654,
          "kinds": 65
        }
      }
    },
    "events": {
      "total": 240514,
      "detail": {
        "pagePath": {
          "cases": [
            {
              "case": "/",
              "value": 18393
            },
            {
              "case": "/index.php",
              "value": 14775
            },
            {
              "case": "/portfolio.php",
              "value": 11583
            },
          ],
          "total": 240514,
          "kinds": 6328
        },
        "eventName": {
          "cases": [
            {
              "case": "readTimer",
              "value": 55510
            },
            {
              "case": "page_view",
              "value": 38654
            },
            {
              "case": "pageInit",
              "value": 32989
            },
          ],
          "total": 240514,
          "kinds": 55
        },
        "campaign": {
          "cases": [
            {
              "case": "(organic)",
              "value": 61790
            },
            {
              "case": "(direct)",
              "value": 32702
            },
            {
              "case": "(referral)",
              "value": 31203
            },
          ],
          "total": 240514,
          "kinds": 79
        },
        "source": {
          "cases": [
            {
              "case": "naver",
              "value": 79321
            },
            {
              "case": "meta",
              "value": 33435
            },
            {
              "case": "(direct)",
              "value": 32702
            },
            {
              "case": "google",
              "value": 21078
            },
            {
              "case": "home-liaison.org",
              "value": 18607
            },
            {
              "case": "carrot",
              "value": 16914
            },
            {
              "case": "kakao",
              "value": 12239
            },
            {
              "case": "instagram",
              "value": 7452
            },
            {
              "case": "(not set)",
              "value": 5453
            },
            {
              "case": "naver.com",
              "value": 2862
            },
            {
              "case": "localhost:3000",
              "value": 1791
            },
            {
              "case": "ksmobile.inicis.com",
              "value": 1553
            },
            {
              "case": "m.search.naver.com",
              "value": 1474
            },
            {
              "case": "m.blog.naver.com",
              "value": 899
            },
            {
              "case": "youtube.com",
              "value": 817
            },
            {
              "case": "blog.naver.com",
              "value": 789
            },
            {
              "case": "home-liaison.org:3000",
              "value": 575
            },
            {
              "case": "m.search.daum.net",
              "value": 316
            },
            {
              "case": "link.naver.com",
              "value": 291
            },
            {
              "case": "memo.naver.com",
              "value": 288
            },
            {
              "case": "yul-do.com",
              "value": 251
            },
            {
              "case": "yahoo",
              "value": 244
            },
            {
              "case": "daum",
              "value": 240
            },
            {
              "case": "bing",
              "value": 223
            },
            {
              "case": "fcmobile.inicis.com",
              "value": 206
            },
            {
              "case": "l.instagram.com",
              "value": 193
            },
            {
              "case": "facebook.com",
              "value": 60
            },
            {
              "case": "l.facebook.com",
              "value": 54
            },
            {
              "case": "m.youtube.com",
              "value": 30
            },
            {
              "case": "ntp.msn.com",
              "value": 27
            },
            {
              "case": "homeliaison.tistory.com",
              "value": 16
            },
            {
              "case": "instagram.com",
              "value": 12
            },
            {
              "case": "m.naver.com",
              "value": 12
            },
            {
              "case": "saramin.co.kr",
              "value": 12
            },
            {
              "case": "m.keep.naver.com",
              "value": 10
            },
            {
              "case": "facebook",
              "value": 9
            },
            {
              "case": "drive.kakao.com",
              "value": 8
            },
            {
              "case": "gdn",
              "value": 8
            },
            {
              "case": "br.nate.com",
              "value": 7
            },
            {
              "case": "m.facebook.com",
              "value": 7
            },
            {
              "case": "pcmap.place.naver.com",
              "value": 7
            },
            {
              "case": "dailytodaily.com",
              "value": 6
            },
            {
              "case": "sopoong.net",
              "value": 6
            },
            {
              "case": "center-pf.kakao.com",
              "value": 5
            },
            {
              "case": "scrub.sourcescrub.com",
              "value": 5
            }
          ],
          "total": 240514,
          "kinds": 45
        },
        "sourceDetail": {
          "cases": [
            {
              "case": "naver / organic",
              "value": 40011
            },
            {
              "case": "(direct) / (none)",
              "value": 32702
            },
            {
              "case": "meta / interest_all_test",
              "value": 27794
            },
            {
              "case": "google / organic",
              "value": 21072
            },
            {
              "case": "naver / brand",
              "value": 18683
            },
            {
              "case": "home-liaison.org / referral",
              "value": 18607
            },
            {
              "case": "carrot / 2408",
              "value": 16914
            },
            {
              "case": "instagram / profile",
              "value": 7441
            },
            {
              "case": "kakao / chat",
              "value": 7419
            },
            {
              "case": "naver / PO2_cpc",
              "value": 7338
            },
            {
              "case": "(not set)",
              "value": 5453
            },
            {
              "case": "naver / review_cpc",
              "value": 4790
            },
            {
              "case": "kakao / message",
              "value": 4345
            },
            {
              "case": "meta / designer",
              "value": 4145
            },
            {
              "case": "naver / PO2",
              "value": 3682
            },
            {
              "case": "naver.com / referral",
              "value": 2862
            },
            {
              "case": "naver / display_conversion",
              "value": 2594
            },
            {
              "case": "localhost:3000 / referral",
              "value": 1791
            },
            {
              "case": "ksmobile.inicis.com / referral",
              "value": 1553
            },
            {
              "case": "meta / instant",
              "value": 1485
            },
            {
              "case": "m.search.naver.com / referral",
              "value": 1474
            },
            {
              "case": "naver / blog",
              "value": 984
            },
            {
              "case": "m.blog.naver.com / referral",
              "value": 899
            },
            {
              "case": "youtube.com / referral",
              "value": 817
            },
            {
              "case": "blog.naver.com / referral",
              "value": 789
            },
            {
              "case": "home-liaison.org:3000 / referral",
              "value": 575
            },
            {
              "case": "kakao / promotion",
              "value": 475
            },
            {
              "case": "m.search.daum.net / referral",
              "value": 316
            },
            {
              "case": "naver / reviewcpc",
              "value": 315
            },
            {
              "case": "naver / PO2_serve_cpc",
              "value": 296
            },
            {
              "case": "link.naver.com / referral",
              "value": 291
            },
            {
              "case": "memo.naver.com / referral",
              "value": 288
            },
            {
              "case": "naver / promotion",
              "value": 285
            },
            {
              "case": "naver / po",
              "value": 266
            },
            {
              "case": "yul-do.com / referral",
              "value": 251
            },
            {
              "case": "yahoo / organic",
              "value": 244
            },
            {
              "case": "daum / organic",
              "value": 240
            },
            {
              "case": "bing / organic",
              "value": 223
            },
            {
              "case": "fcmobile.inicis.com / referral",
              "value": 206
            },
            {
              "case": "l.instagram.com / referral",
              "value": 193
            },
            {
              "case": "facebook.com / referral",
              "value": 60
            },
            {
              "case": "l.facebook.com / referral",
              "value": 54
            },
            {
              "case": "naver / cpc_servelink",
              "value": 49
            },
            {
              "case": "m.youtube.com / referral",
              "value": 30
            },
            {
              "case": "naver / cafe",
              "value": 28
            },
            {
              "case": "ntp.msn.com / referral",
              "value": 27
            },
            {
              "case": "homeliaison.tistory.com / referral",
              "value": 16
            },
            {
              "case": "instagram.com / referral",
              "value": 12
            },
            {
              "case": "m.naver.com / referral",
              "value": 12
            },
            {
              "case": "saramin.co.kr / referral",
              "value": 12
            },
            {
              "case": "meta / meta",
              "value": 11
            },
            {
              "case": "m.keep.naver.com / referral",
              "value": 10
            },
            {
              "case": "facebook / interior",
              "value": 9
            },
            {
              "case": "drive.kakao.com / referral",
              "value": 8
            },
            {
              "case": "gdn / image",
              "value": 8
            },
            {
              "case": "br.nate.com / referral",
              "value": 7
            },
            {
              "case": "instagram / referral",
              "value": 7
            },
            {
              "case": "m.facebook.com / referral",
              "value": 7
            },
            {
              "case": "pcmap.place.naver.com / referral",
              "value": 7
            },
            {
              "case": "dailytodaily.com / referral",
              "value": 6
            },
            {
              "case": "google / youtubefeed",
              "value": 6
            },
            {
              "case": "sopoong.net / referral",
              "value": 6
            },
            {
              "case": "center-pf.kakao.com / referral",
              "value": 5
            },
            {
              "case": "scrub.sourcescrub.com / referral",
              "value": 5
            },
            {
              "case": "instagram / sns",
              "value": 4
            }
          ],
          "total": 240514,
          "kinds": 65
        }
      }
    },
    "conversion": {
      "popupOpen": {
        "total": 157,
        "detail": {
          "pagePath": {
            "cases": [
              {
                "case": "/about.php",
                "value": 15
              },
              {
                "case": "/portfolio.php",
                "value": 10
              },
            ],
            "total": 157,
            "kinds": 100
          },
          "deviceCategory": {
            "cases": [
              {
                "case": "mobile",
                "value": 124
              },
              {
                "case": "desktop",
                "value": 29
              },
              {
                "case": "tablet",
                "value": 4
              }
            ],
            "total": 157,
            "kinds": 3
          },
          "operatingSystem": {
            "cases": [
              {
                "case": "Android",
                "value": 71
              },
              {
                "case": "iOS",
                "value": 57
              },
              {
                "case": "Windows",
                "value": 19
              },
              {
                "case": "Macintosh",
                "value": 10
              }
            ],
            "total": 157,
            "kinds": 4
          },
          "browser": {
            "cases": [
              {
                "case": "Android Webview",
                "value": 46
              },
              {
                "case": "Safari (in-app)",
                "value": 35
              },
            ],
            "total": 157,
            "kinds": 7
          },
          "campaign": {
            "cases": [
              {
                "case": "service_homestyling_01_single",
                "value": 34
              },
              {
                "case": "(organic)",
                "value": 23
              },
            ],
            "total": 157,
            "kinds": 27
          },
          "source": {
            "cases": [
              {
                "case": "meta",
                "value": 58
              },
              {
                "case": "naver",
                "value": 50
              },
            ],
            "total": 157,
            "kinds": 12
          },
          "sourceDetail": {
            "cases": [
              {
                "case": "meta / interest_all_test",
                "value": 54
              },
              {
                "case": "naver / brand",
                "value": 17
              },
              {
                "case": "naver / organic",
                "value": 17
              },
            ],
            "total": 157,
            "kinds": 22
          }
        }
      },
      "consultingPage": {
        "total": 655,
        "detail": {
          "deviceCategory": {
            "cases": [
              {
                "case": "mobile",
                "value": 475
              },
              {
                "case": "desktop",
                "value": 174
              },
              {
                "case": "tablet",
                "value": 6
              }
            ],
            "total": 655,
            "kinds": 3
          },
          "operatingSystem": {
            "cases": [
              {
                "case": "Android",
                "value": 251
              },
              {
                "case": "iOS",
                "value": 230
              },
              {
                "case": "Windows",
                "value": 122
              },
              {
                "case": "Macintosh",
                "value": 49
              },
              {
                "case": "Linux",
                "value": 3
              }
            ],
            "total": 655,
            "kinds": 5
          },
          "browser": {
            "cases": [
              {
                "case": "Safari (in-app)",
                "value": 158
              },
              {
                "case": "Chrome",
                "value": 157
              },
              {
                "case": "Android Webview",
                "value": 151
              },
              {
                "case": "Whale Browser",
                "value": 77
              },
              {
                "case": "Safari",
                "value": 72
              },
              {
                "case": "Samsung Internet",
                "value": 21
              },
              {
                "case": "Edge",
                "value": 19
              }
            ],
            "total": 655,
            "kinds": 7
          },
          "campaign": {
            "cases": [
              {
                "case": "(organic)",
                "value": 123
              },
              {
                "case": "(referral)",
                "value": 80
              },
              {
                "case": "consulting",
                "value": 78
              },
            ],
            "total": 655,
            "kinds": 39
          },
          "source": {
            "cases": [
              {
                "case": "naver",
                "value": 168
              },
              {
                "case": "kakao",
                "value": 139
              },
            ],
            "total": 655,
            "kinds": 18
          },
          "sourceDetail": {
            "cases": [
              {
                "case": "instagram / profile",
                "value": 95
              },
              {
                "case": "kakao / message",
                "value": 89
              },
            ],
            "total": 655,
            "kinds": 30
          }
        }
      }
    }
  }
}
