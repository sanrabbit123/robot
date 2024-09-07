const collectionName = "constructInvoice";

const collectionDescription = "시공 견적서에 대한 디비 현재 개발중단되어 사용되지 않음"

const collectionSampleData0 = {
  "_id": "66c09c287d20f00155a1f764",
  "invid": "v21co_aa01s",
  "title": "다정하게C 박혜연D 시공 견적",
  "date": "2021-12-24T08:05:24.656Z",
  "organizer": {
    "name": "홈리에종",
    "businessNumber": "221-81-49759",
    "phone": "02-2039-2252",
    "address": "서울특별시 성동구 성수이로22길 37 4층 408A호"
  },
  "requests": [
    {
      "id": "RACCD1640333124660A434297BED7197CD3A05911",
      "date": "2021-12-24T08:05:24.660Z",
      "status": "작성중",
      "items": [
        {
          "id": "IFF2F1715677971737A91540667F81203EF6EEC95",
          "name": "가설공사",
          "detail": [
            {
              "id": "DBB9D1715677971738AA1540667F81B9502E3CC07",
              "name": "현장정리정돈",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 1
              }
            },
            {
              "id": "DCA2B1715677971738AA1540667F81042B79C50C5",
              "name": "엘리베이터/시공부위 보양",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DAACA1715677971738AA1540667F81DCD378951DD",
              "name": "주민동의서 대행",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DCE0A1715677971738AA1540667F81185772CBEF7",
              "name": "품명 입력",
              "description": "비고",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 9100,
                  "vat": 900,
                  "consumer": 10000
                },
                "number": 1
              }
            }
          ]
        },
        {
          "id": "IABFC1715677971738AA1540667F81F741CF62C35",
          "name": "철거공사",
          "detail": [
            {
              "id": "DAF4A1715677971738AA1540667F8116EA0B27ED4",
              "name": "가구및 기본철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 772730,
                  "vat": 77270,
                  "consumer": 850000
                },
                "number": 1
              }
            },
            {
              "id": "DCA1E1715677971738AA1540667F816CD53A8AEA4",
              "name": "ⓐ 욕실철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            },
            {
              "id": "DED0D1715677971738AA1540667F8103A592E9217",
              "name": "ⓐ 욕실타일 철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 1
              }
            },
            {
              "id": "DAA3A1715677971738AA1540667F814F30E228533",
              "name": "ⓐ 온돌마루철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 22730,
                  "vat": 2270,
                  "consumer": 25000
                },
                "number": 0
              }
            },
            {
              "id": "DBBDC1715677971738AA1540667F8133C46391E42",
              "name": "ⓐ 가구철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DFFEA1715677971738AA1540667F8192EA0704A9A",
              "name": "ⓐ 화단철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 500000,
                  "vat": 50000,
                  "consumer": 550000
                },
                "number": 0
              }
            },
            {
              "id": "DBAFA1715677971739AB1540667F8145FD024DC85",
              "name": "ⓐ 도어철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 31820,
                  "vat": 3180,
                  "consumer": 35000
                },
                "number": 1
              }
            },
            {
              "id": "DDCDD1715677971739AB1540667F817BDDBB652D6",
              "name": "ⓐ 벽체철거",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m",
                "amount": {
                  "supply": 90910,
                  "vat": 9090,
                  "consumer": 100000
                },
                "number": 1
              }
            },
            {
              "id": "DBEFB1715677971739AB1540667F813DDA8B5BAC1",
              "name": "ⓐ 천정철거 (부분철거)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 54550,
                  "vat": 5450,
                  "consumer": 60000
                },
                "number": 0
              }
            },
            {
              "id": "DADDE1715677971739AB1540667F8195734AF264A",
              "name": "ⓐ 천정철거 (전체철거)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 34550,
                  "vat": 3450,
                  "consumer": 38000
                },
                "number": 1
              }
            },
            {
              "id": "DFD6E1715677971739AB1540667F814E998A4FF83",
              "name": "ⓐ 기타철거 (벽면타일)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 1
              }
            },
            {
              "id": "DBC1D1715677971739AB1540667F815E28EB2EDFD",
              "name": "인건비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 1
              }
            },
            {
              "id": "DCA7F1715677971739AB1540667F8172F6E2E12B9",
              "name": "부자재/장비대",
              "description": "",
              "info": [],
              "unit": {
                "ea": "대",
                "amount": {
                  "supply": 63640,
                  "vat": 6360,
                  "consumer": 70000
                },
                "number": 1
              }
            },
            {
              "id": "DAA3C1715677971739AB1540667F81F2137DC6EDF",
              "name": "폐자재 반출 (1ton)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "대",
                "amount": {
                  "supply": 345460,
                  "vat": 34540,
                  "consumer": 380000
                },
                "number": 1
              }
            },
            {
              "id": "DEBCA1715677971739AB1540667F8109160473D8E",
              "name": "품명 입력",
              "description": "비고",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 9100,
                  "vat": 900,
                  "consumer": 10000
                },
                "number": 1
              }
            }
          ]
        },
        {
          "id": "IEA8E1715677971739AB1540667F8133A651348A0",
          "name": "샤시교체",
          "detail": [
            {
              "id": "DBC9F1715677971739AB1540667F811DBCCA49212",
              "name": "KCC 발코니단창 (24T 페어, B130)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1513640,
                  "vat": 151360,
                  "consumer": 1665000
                },
                "number": 1
              }
            },
            {
              "id": "DAB7B1715677971739AB1540667F81123AEAE36BC",
              "name": "KCC 발코니단창 (24T 페어, B130)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1201820,
                  "vat": 120180,
                  "consumer": 1322000
                },
                "number": 1
              }
            },
            {
              "id": "DFDBB1715677971739AB1540667F811417D820EBE",
              "name": "KCC 발코니단창 (24T 페어, B130)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 299100,
                  "vat": 29900,
                  "consumer": 329000
                },
                "number": 0
              }
            },
            {
              "id": "DCE0E1715677971739AB1540667F818EF8F56C8B6",
              "name": "KCC 발코니단창 (24T 페어, B130)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 235460,
                  "vat": 23540,
                  "consumer": 259000
                },
                "number": 1
              }
            },
            {
              "id": "DFB6E1715677971739AB1540667F81FB35853B8C9",
              "name": "KCC 스마트이중창 (24T 페어, BF225)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 760000,
                  "vat": 76000,
                  "consumer": 836000
                },
                "number": 1
              }
            },
            {
              "id": "DEB6B1715677971739AB1540667F811E04E91C74D",
              "name": "KCC 스마트이중창 (24T 페어, BF242)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 2703640,
                  "vat": 270360,
                  "consumer": 2974000
                },
                "number": 1
              }
            },
            {
              "id": "DAC6F1715677971739AB1540667F81001E707988F",
              "name": "KCC 스마트이중창 (24T 페어, D250)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1988190,
                  "vat": 198810,
                  "consumer": 2187000
                },
                "number": 3
              }
            },
            {
              "id": "DBDBA1715677971739AB1540667F815636FB605FC",
              "name": "KCC 스마트이중창 (24T 페어, D250)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 893190,
                  "vat": 89310,
                  "consumer": 982500
                },
                "number": 0
              }
            },
            {
              "id": "DFFDB1715677971739AB1540667F81434E8702291",
              "name": "KCC 터닝발코니도어:D140",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 590910,
                  "vat": 59090,
                  "consumer": 650000
                },
                "number": 0
              }
            },
            {
              "id": "DAC6C1715677971739AB1540667F81BFF85EBB929",
              "name": "폴딩도어(시스템, 슬라이딩)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "장",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DABFC1715677971740AC1540667F813792B427C85",
              "name": "부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DDEDE1715677971740AC1540667F81381A9D4BE10",
              "name": "시공비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            },
            {
              "id": "DFB7A1715677971740AC1540667F811E73CE37E9C",
              "name": "품명 입력ㅇㅇㅇ",
              "description": "비고",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 9100,
                  "vat": 900,
                  "consumer": 10000
                },
                "number": 1
              }
            }
          ]
        },
        {
          "id": "IBE0E1715677971740AC1540667F81DB6C7A69305",
          "name": "확장공사",
          "detail": [
            {
              "id": "DDF7B1715677971740AC1540667F81394EB706E35",
              "name": "바닥파쇄",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 1
              }
            },
            {
              "id": "DED9B1715677971740AC1540667F8116EBB0386B8",
              "name": "바닥미장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 1
              }
            },
            {
              "id": "DAA1E1715677971740AC1540667F81DF01E4B7541",
              "name": "난방배관 연장(엑셀관)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 545460,
                  "vat": 54540,
                  "consumer": 600000
                },
                "number": 1
              }
            },
            {
              "id": "DDDBE1715677971740AC1540667F81ECAAE40985F",
              "name": "목공/벽2P 천정1P (석고작업)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 1
              }
            },
            {
              "id": "DEB6C1715677971740AC1540667F81D4DC3B565A9",
              "name": "단열재(벽,천정 30t)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 1
              }
            },
            {
              "id": "DFB7B1715677971740AC1540667F81F66D9455898",
              "name": "베란다 단높임",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 1
              }
            },
            {
              "id": "DAE0F1715677971740AC1540667F81B4ED9BB561A",
              "name": "부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 1
              }
            }
          ]
        },
        {
          "id": "IFCDE1715677971740AC1540667F815884748B3A6",
          "name": "목공사",
          "detail": [
            {
              "id": "DDD3E1715677971740AC1540667F8185707798ED0",
              "name": "몰딩 (마이너스)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DAE8C1715677971740AC1540667F81DC8C84CBCC7",
              "name": "걸레받이",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DFB5A1715677971740AC1540667F814E4D5065C03",
              "name": "아트월",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 500000,
                  "vat": 50000,
                  "consumer": 550000
                },
                "number": 1
              }
            },
            {
              "id": "DEF1C1715677971740AC1540667F8196823F96361",
              "name": "TV 부위 보강",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 90910,
                  "vat": 9090,
                  "consumer": 100000
                },
                "number": 0
              }
            },
            {
              "id": "DEBAF1715677971740AC1540667F8194453B6A9C9",
              "name": "욕실 도어 교체",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DEF4E1715677971740AC1540667F818D7B2A4FD55",
              "name": "벽면/천장 평탄화작업(거실)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 636370,
                  "vat": 63630,
                  "consumer": 700000
                },
                "number": 0
              }
            },
            {
              "id": "DBBAC1715677971740AC1540667F814FCCA483552",
              "name": "등박스/간접조명(거실)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DBACC1715677971740AC1540667F8144590B4C21A",
              "name": "거실아트월/하부 단 공사",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DFF1F1715677971740AC1540667F81CF651D81A48",
              "name": "웨인스코팅",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 636370,
                  "vat": 63630,
                  "consumer": 700000
                },
                "number": 0
              }
            },
            {
              "id": "DFBFC1715677971740AC1540667F8192FE09C12CA",
              "name": "파티션/가벽",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DBC3C1715677971741AD1540667F81E636BD05BC9",
              "name": "테라스/발코니 데크시공",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 4090910,
                  "vat": 409090,
                  "consumer": 4500000
                },
                "number": 0
              }
            },
            {
              "id": "DFB6F1715677971741AD1540667F812595B1CB001",
              "name": "테라스/발코니 평상,울타리",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1818190,
                  "vat": 181810,
                  "consumer": 2000000
                },
                "number": 0
              }
            },
            {
              "id": "DBD1B1715677971741AD1540667F81204BCCE57EC",
              "name": "현관 중문",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 772730,
                  "vat": 77270,
                  "consumer": 850000
                },
                "number": 0
              }
            },
            {
              "id": "DCAFF1715677971741AD1540667F817A83A74556A",
              "name": "현관 중문(2도어/양개형/투명유리)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1363640,
                  "vat": 136360,
                  "consumer": 1500000
                },
                "number": 0
              }
            },
            {
              "id": "DFE7D1715677971741AD1540667F81CFE29DEDCDC",
              "name": "타공도어 (유리포함, 840*2040)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DDBCB1715677971741AD1540667F8140BB59E10C6",
              "name": "방문 (ABS/멤브레인 900*2100)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DDDFC1715677971741AD1540667F81D8E9E68AA55",
              "name": "문틀 (900*2100)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 68190,
                  "vat": 6810,
                  "consumer": 75000
                },
                "number": 0
              }
            },
            {
              "id": "DED8B1715677971741AD1540667F812E40F329F98",
              "name": "부자재 (손잡이,경첩,기타)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 36370,
                  "vat": 3630,
                  "consumer": 40000
                },
                "number": 0
              }
            },
            {
              "id": "DCCFB1715677971741AD1540667F81200480B0466",
              "name": "슬라이딩 레일 및 부속품",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 71820,
                  "vat": 7180,
                  "consumer": 79000
                },
                "number": 0
              }
            },
            {
              "id": "DEE9C1715677971741AD1540667F81ADA7C59E7CC",
              "name": "템바보드 (소형, 반달, 9t)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 363640,
                  "vat": 36360,
                  "consumer": 400000
                },
                "number": 0
              }
            },
            {
              "id": "DBABD1715677971741AD1540667F811DB18AADE20",
              "name": "장비대/부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DBD4E1715677971741AD1540667F81EDD22A7342F",
              "name": "시공비/설치비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DEE4B1715677971741AD1540667F81F4BC3486C8F",
              "name": "인건비(기공/숙련공)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DBD0F1715677971741AD1540667F817675FAE4E8F",
              "name": "인건비(조공/보조기술자)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IEE1A1715677971741AD1540667F81AC2138E469A",
          "name": "욕실공사",
          "detail": [
            {
              "id": "DDB2B1715677971741AD1540667F81A0408D4E9EF",
              "name": "세면기 (도기,벽붙이)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 145460,
                  "vat": 14540,
                  "consumer": 160000
                },
                "number": 0
              }
            },
            {
              "id": "DDCFE1715677971741AD1540667F81FB7B733E60F",
              "name": "양변기 (도기,투피스타입)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 254550,
                  "vat": 25450,
                  "consumer": 280000
                },
                "number": 0
              }
            },
            {
              "id": "DBA3A1715677971741AD1540667F818138C190EAC",
              "name": "욕조 (매입형,아크릴)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 254550,
                  "vat": 25450,
                  "consumer": 280000
                },
                "number": 0
              }
            },
            {
              "id": "DEBCA1715677971741AD1540667F8115FF407ACB5",
              "name": "샤워부스",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 436370,
                  "vat": 43630,
                  "consumer": 480000
                },
                "number": 0
              }
            },
            {
              "id": "DFB7A1715677971741AD1540667F81A0F6752DE05",
              "name": "샤워파티션",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 254550,
                  "vat": 25450,
                  "consumer": 280000
                },
                "number": 0
              }
            },
            {
              "id": "DDAFF1715677971741AD1540667F8142561CF3CF4",
              "name": "세면기수전",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 90910,
                  "vat": 9090,
                  "consumer": 100000
                },
                "number": 0
              }
            },
            {
              "id": "DBEFA1715677971741AD1540667F815D7C8731BB2",
              "name": "샤워수전",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DFBBD1715677971741AD1540667F81758287301AC",
              "name": "슬라이드바",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 36370,
                  "vat": 3630,
                  "consumer": 40000
                },
                "number": 0
              }
            },
            {
              "id": "DDE6F1715677971741AD1540667F81FF1C4754AA2",
              "name": "욕실거울 (700*800)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 72730,
                  "vat": 7270,
                  "consumer": 80000
                },
                "number": 0
              }
            },
            {
              "id": "DBCAC1715677971741AD1540667F81B27729C75C7",
              "name": "욕실 수납장 (1200*800)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 100000,
                  "vat": 10000,
                  "consumer": 110000
                },
                "number": 0
              }
            },
            {
              "id": "DAD7A1715677971741AD1540667F817BDB7649C5A",
              "name": "거울 슬라이딩장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DCF4B1715677971741AD1540667F817AD1E674546",
              "name": "액세사리(4종)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 72730,
                  "vat": 7270,
                  "consumer": 80000
                },
                "number": 0
              }
            },
            {
              "id": "DAD1C1715677971741AD1540667F817C407C5981C",
              "name": "일자선반",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 18190,
                  "vat": 1810,
                  "consumer": 20000
                },
                "number": 0
              }
            },
            {
              "id": "DAE1E1715677971741AD1540667F819D61CAADF4B",
              "name": "코너선반",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 13640,
                  "vat": 1360,
                  "consumer": 15000
                },
                "number": 0
              }
            },
            {
              "id": "DAC2D1715677971741AD1540667F8179B4A290A1E",
              "name": "욕실환풍기(힘펠 JV-201C)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 27280,
                  "vat": 2720,
                  "consumer": 30000
                },
                "number": 0
              }
            },
            {
              "id": "DAA4F1715677971741AD1540667F8183AD414D0C8",
              "name": "천정(돔,평판)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 254550,
                  "vat": 25450,
                  "consumer": 280000
                },
                "number": 0
              }
            },
            {
              "id": "DEE8F1715677971741AD1540667F817A4C3EC7719",
              "name": "젠다이 시공",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DCD1D1715677971741AD1540667F81FFE7D3308AB",
              "name": "젠다이 상판교체",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DCEEF1715677971741AD1540667F8137D7E323D54",
              "name": "부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 27280,
                  "vat": 2720,
                  "consumer": 30000
                },
                "number": 0
              }
            },
            {
              "id": "DDA4D1715677971741AD1540667F813B572BCDC48",
              "name": "설치비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "ICEDE1715677971741AD1540667F81C64A7DCD3DA",
          "name": "타일공사",
          "detail": [
            {
              "id": "DEBCC1715677971742AE1540667F8170F90CB7C83",
              "name": "화장실 바닥타일 (300*300)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 25460,
                  "vat": 2540,
                  "consumer": 28000
                },
                "number": 0
              }
            },
            {
              "id": "DFCEC1715677971742AE1540667F81DB5E85C4A86",
              "name": "화장실 벽타일 (600*600)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 34550,
                  "vat": 3450,
                  "consumer": 38000
                },
                "number": 0
              }
            },
            {
              "id": "DBA7A1715677971742AE1540667F81B2536943F0A",
              "name": "포세린 타일 (800*400)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 59100,
                  "vat": 5900,
                  "consumer": 65000
                },
                "number": 0
              }
            },
            {
              "id": "DDD1F1715677971742AE1540667F813C701F6DA2C",
              "name": "현관타일 (600*600)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "box",
                "amount": {
                  "supply": 40910,
                  "vat": 4090,
                  "consumer": 45000
                },
                "number": 0
              }
            },
            {
              "id": "DEE9C1715677971742AE1540667F813646C2E93DB",
              "name": "주방타일 (600*600)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 34550,
                  "vat": 3450,
                  "consumer": 38000
                },
                "number": 0
              }
            },
            {
              "id": "DED9E1715677971742AE1540667F81DE6E02B1D4A",
              "name": "베란다 타일",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 34550,
                  "vat": 3450,
                  "consumer": 38000
                },
                "number": 0
              }
            },
            {
              "id": "DDAFC1715677971742AE1540667F810BAC9031252",
              "name": "육가",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 9100,
                  "vat": 900,
                  "consumer": 10000
                },
                "number": 0
              }
            },
            {
              "id": "DEE4B1715677971742AE1540667F8158E3D075FB8",
              "name": "트렌치 (스텐레스)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 81820,
                  "vat": 8180,
                  "consumer": 90000
                },
                "number": 0
              }
            },
            {
              "id": "DBB9A1715677971742AE1540667F81BC3AD183E7F",
              "name": "부자재(모래,시멘트,본드 등)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DCE7E1715677971742AE1540667F81962911087D1",
              "name": "시공비 (화장실)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 545460,
                  "vat": 54540,
                  "consumer": 600000
                },
                "number": 0
              }
            },
            {
              "id": "DCCCC1715677971742AE1540667F81F7B87A35FC5",
              "name": "시공비 (주방벽면)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DEA7E1715677971742AE1540667F818B0284786A2",
              "name": "시공비 (현관/발코니)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DFC7E1715677971742AE1540667F81C608F9CAFA2",
              "name": "시공비 (거실 아트월)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IBA5B1715677971742AE1540667F81829046DF5ED",
          "name": "전기/조명",
          "detail": [
            {
              "id": "DBB7A1715677971742AE1540667F819F26BF7ABE4",
              "name": "거실등 (LED, 200w)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 272730,
                  "vat": 27270,
                  "consumer": 300000
                },
                "number": 0
              }
            },
            {
              "id": "DEDFF1715677971742AE1540667F81C9C9F4E473B",
              "name": "방등 (LED, 50w)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 72730,
                  "vat": 7270,
                  "consumer": 80000
                },
                "number": 0
              }
            },
            {
              "id": "DBD2D1715677971742AE1540667F815C14179606D",
              "name": "외부등/창고,베란다",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 40910,
                  "vat": 4090,
                  "consumer": 45000
                },
                "number": 0
              }
            },
            {
              "id": "DCE4D1715677971742AE1540667F81C70ADD665B6",
              "name": "주방등 (LED, 50w)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 72730,
                  "vat": 7270,
                  "consumer": 80000
                },
                "number": 0
              }
            },
            {
              "id": "DEA0E1715677971742AE1540667F81589FC289AC2",
              "name": "펜던트등 (일반)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 1,
                  "vat": 0,
                  "consumer": 1
                },
                "number": 0
              }
            },
            {
              "id": "DCA7C1715677971742AE1540667F81D6190F4FD26",
              "name": "실링팬",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 1,
                  "vat": 0,
                  "consumer": 1
                },
                "number": 0
              }
            },
            {
              "id": "DAD4F1715677971742AE1540667F81AC1B682A58D",
              "name": "조명센서 (모션감지)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 27280,
                  "vat": 2720,
                  "consumer": 30000
                },
                "number": 0
              }
            },
            {
              "id": "DCCDF1715677971742AE1540667F818B35AAD5E52",
              "name": "3인치매입 (LED, 주백색, COB)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 9100,
                  "vat": 900,
                  "consumer": 10000
                },
                "number": 0
              }
            },
            {
              "id": "DDADF1715677971742AE1540667F81E09D4A64E77",
              "name": "3인치매입 (LED, 욕실방습)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 13640,
                  "vat": 1360,
                  "consumer": 15000
                },
                "number": 0
              }
            },
            {
              "id": "DCB7C1715677971742AE1540667F81F186EC95C81",
              "name": "T5 (LED, 15W, 1200mm)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 13640,
                  "vat": 1360,
                  "consumer": 15000
                },
                "number": 0
              }
            },
            {
              "id": "DBCBB1715677971742AE1540667F81D2E46AD7DCB",
              "name": "LED기판교체",
              "description": "",
              "info": [],
              "unit": {
                "ea": "EA",
                "amount": {
                  "supply": 45460,
                  "vat": 4540,
                  "consumer": 50000
                },
                "number": 0
              }
            },
            {
              "id": "DFF3D1715677971742AE1540667F81CD32EAD608D",
              "name": "배관 및 배선자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DCCDB1715677971742AE1540667F8130BB7E9792E",
              "name": "스위치/콘센트 (일반)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 0
              }
            },
            {
              "id": "DECAC1715677971742AE1540667F8135972FE6910",
              "name": "거실콘센트 이설작업",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DBFEF1715677971742AE1540667F812F48951ACA8",
              "name": "현관수납장 조명작업(상부)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DAE8E1715677971742AE1540667F8125F92FA0D9B",
              "name": "배선작업 (타공/인입)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DFA9D1715677971742AE1540667F81BBA44E360F0",
              "name": "조명등 설치",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IBBED1715677971743AF1540667F8179BE54E34AA",
          "name": "도장공사",
          "detail": [
            {
              "id": "DCF3B1715677971743AF1540667F81DD488BD98FB",
              "name": "발코니 (탄성/바이오세라믹)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 0,
                  "vat": 0,
                  "consumer": 0
                },
                "number": 0
              }
            },
            {
              "id": "DABAC1715677971743AF1540667F81B4D09CAB3FC",
              "name": "메인 발코니",
              "description": "",
              "info": [],
              "unit": {
                "ea": "칸",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DFF6A1715677971743AF1540667F814A1814F4DF1",
              "name": "추가 발코니",
              "description": "",
              "info": [],
              "unit": {
                "ea": "칸",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DDA4A1715677971743AF1540667F817EFC0685616",
              "name": "벽면도장 (자석페인트)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DDB6A1715677971743AF1540667F8126AD191610B",
              "name": "안방 웨인스코팅 도장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IDEEB1715677971743AF1540667F81DE606B23EFD",
          "name": "필름공사",
          "detail": [
            {
              "id": "DECCD1715677971743AF1540667F81A600D901C84",
              "name": "샤시",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1181820,
                  "vat": 118180,
                  "consumer": 1300000
                },
                "number": 0
              }
            },
            {
              "id": "DAE0D1715677971743AF1540667F81D9377CE957F",
              "name": "주방상부장 하부장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 590910,
                  "vat": 59090,
                  "consumer": 650000
                },
                "number": 0
              }
            },
            {
              "id": "DFDCF1715677971743AF1540667F81F36792BD968",
              "name": "현관문/방문문틀",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DAD5E1715677971743AF1540667F8108031AFE7BC",
              "name": "붙박이장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DEA8B1715677971743AF1540667F81B51F490348B",
              "name": "신발장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DCC4F1715677971743AF1540667F81E05A72143B4",
              "name": "천장몰딩/걸래받이",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 363640,
                  "vat": 36360,
                  "consumer": 400000
                },
                "number": 0
              }
            },
            {
              "id": "DBDDF1715677971743AF1540667F81063BAA19E01",
              "name": "실리콘 마감",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 272730,
                  "vat": 27270,
                  "consumer": 300000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "ICB1F1715677971743AF1540667F81DBD95309926",
          "name": "바닥공사",
          "detail": [
            {
              "id": "DCCDF1715677971743AF1540667F8126A0E201654",
              "name": "원목마루",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DEDFF1715677971743AF1540667F81F46C893D085",
              "name": "강마루 (구정,이건,동화,LG)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 118190,
                  "vat": 11810,
                  "consumer": 130000
                },
                "number": 0
              }
            },
            {
              "id": "DAA1A1715677971743AF1540667F8176E2532872B",
              "name": "온돌마루 (헤링본 시공)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 159100,
                  "vat": 15900,
                  "consumer": 175000
                },
                "number": 0
              }
            },
            {
              "id": "DDBDF1715677971743AF1540667F81BF9D014AB94",
              "name": "강화마루 (동화,한솔,)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 72730,
                  "vat": 7270,
                  "consumer": 80000
                },
                "number": 0
              }
            },
            {
              "id": "DDC5D1715677971743AF1540667F81C2ED58EF35A",
              "name": "LG프리미엄시트(엑스컴포트, 5t)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 68190,
                  "vat": 6810,
                  "consumer": 75000
                },
                "number": 0
              }
            },
            {
              "id": "DCF3E1715677971743AF1540667F81ADCB912A8F6",
              "name": "우드륨 1.8t",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 31820,
                  "vat": 3180,
                  "consumer": 35000
                },
                "number": 0
              }
            },
            {
              "id": "DCBBC1715677971743AF1540667F8139DA373002E",
              "name": "우드륨 2.2t",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 45460,
                  "vat": 4540,
                  "consumer": 50000
                },
                "number": 0
              }
            },
            {
              "id": "DBA2D1715677971743AF1540667F81651FB262722",
              "name": "데코타일 (일반)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 31820,
                  "vat": 3180,
                  "consumer": 35000
                },
                "number": 0
              }
            },
            {
              "id": "DCBAA1715677971743AF1540667F81517E61ECBAE",
              "name": "데코타일 (LG하우시스,온돌전용)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 35460,
                  "vat": 3540,
                  "consumer": 39000
                },
                "number": 0
              }
            },
            {
              "id": "DFEBF1715677971743AF1540667F81DCD9F18817E",
              "name": "시공후 종이보양지",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 3190,
                  "vat": 310,
                  "consumer": 3500
                },
                "number": 0
              }
            },
            {
              "id": "DBFAB1715677971743AF1540667F81963EB12D8D6",
              "name": "수평몰타르",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 41820,
                  "vat": 4180,
                  "consumer": 46000
                },
                "number": 0
              }
            },
            {
              "id": "DEDFA1715677971743AF1540667F81CCF68D6E34F",
              "name": "에폭시 라이닝",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 47280,
                  "vat": 4720,
                  "consumer": 52000
                },
                "number": 0
              }
            },
            {
              "id": "DFB0B1715677971743AF1540667F81311615CEDF4",
              "name": "포세린/폴리싱 타일 (600*600)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 22730,
                  "vat": 2270,
                  "consumer": 25000
                },
                "number": 0
              }
            },
            {
              "id": "DEC0B1715677971743AF1540667F8101D914D3B79",
              "name": "부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 13640,
                  "vat": 1360,
                  "consumer": 15000
                },
                "number": 0
              }
            },
            {
              "id": "DFBFD1715677971743AF1540667F8168731BC1D65",
              "name": "시공비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m2",
                "amount": {
                  "supply": 34550,
                  "vat": 3450,
                  "consumer": 38000
                },
                "number": 0
              }
            },
            {
              "id": "DDDDB1715677971743AF1540667F81E2B4389F477",
              "name": "인건비(기공/숙련공)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DBBAC1715677971744A02540667F8174CE2FED296",
              "name": "인건비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            },
            {
              "id": "DCE4C1715677971744A02540667F8120A67FF0643",
              "name": "양중",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IEBEE1715677971744A02540667F811C9A16C9228",
          "name": "도배공사",
          "detail": [
            {
              "id": "DDEDB1715677971744A02540667F816A2054DADD6",
              "name": "천장/벽면 전체도배 (실크벽지)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 24550,
                  "vat": 2450,
                  "consumer": 27000
                },
                "number": 0
              }
            },
            {
              "id": "DFECA1715677971744A02540667F8102689D2B9C8",
              "name": "부분도배 (실크벽지)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DEADD1715677971744A02540667F81476144BA5CF",
              "name": "천장/벽면 전체도배 (합지벽지)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 20000,
                  "vat": 2000,
                  "consumer": 22000
                },
                "number": 0
              }
            },
            {
              "id": "DCCBA1715677971744A02540667F8174F84EC7923",
              "name": "도배면 평탄화작업 (핸디코트/마감)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 0,
                  "vat": 0,
                  "consumer": 0
                },
                "number": 0
              }
            },
            {
              "id": "DEB8C1715677971744A02540667F81C7CAD87476F",
              "name": "벽지 부자재",
              "description": "",
              "info": [],
              "unit": {
                "ea": "평",
                "amount": {
                  "supply": 10910,
                  "vat": 1090,
                  "consumer": 12000
                },
                "number": 0
              }
            },
            {
              "id": "DBFAE1715677971744A02540667F8184A5940371F",
              "name": "인건비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "M/D",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IDA7C1715677971744A02540667F8138B2CE40474",
          "name": "가구공사",
          "detail": [
            {
              "id": "DCDFD1715677971744A02540667F814DA3778C311",
              "name": "씽크대 (PET무광)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 163640,
                  "vat": 16360,
                  "consumer": 180000
                },
                "number": 0
              }
            },
            {
              "id": "DCADB1715677971744A02540667F81A155CB5286C",
              "name": "씽크대/보조 (하이그로시/무광PET)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DFCCE1715677971744A02540667F814E497B82FFA",
              "name": "상판교체(씽크대/세라믹)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 2272730,
                  "vat": 227270,
                  "consumer": 2500000
                },
                "number": 0
              }
            },
            {
              "id": "DCA1B1715677971744A02540667F81905A78AAA18",
              "name": "미드웨이 교체 (씽크대벽면/세라믹)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1181820,
                  "vat": 118180,
                  "consumer": 1300000
                },
                "number": 0
              }
            },
            {
              "id": "DACBF1715677971744A02540667F813F613A8DA3C",
              "name": "상판교체(씽크대/인조대리석)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "m",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DADCF1715677971744A02540667F813D6728AE0A3",
              "name": "상판교체(화장대/천연석)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DCA1D1715677971744A02540667F81C605AC09EAF",
              "name": "상판철거(인조대리석)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DEE7D1715677971744A02540667F817CAB30B8EA9",
              "name": "씽크볼(사각)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DBE5F1715677971744A02540667F81AA27D1DA362",
              "name": "수전",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            },
            {
              "id": "DFB1C1715677971744A02540667F819B563C18D19",
              "name": "식기세척기 공간",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DAA8A1715677971744A02540667F81B57E03EE8EB",
              "name": "쿡탑 후드 (침니후드)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 345460,
                  "vat": 34540,
                  "consumer": 380000
                },
                "number": 0
              }
            },
            {
              "id": "DBF9A1715677971744A02540667F811E50189DDCF",
              "name": "아일랜드 테이블",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 636370,
                  "vat": 63630,
                  "consumer": 700000
                },
                "number": 0
              }
            },
            {
              "id": "DCCBF1715677971744A02540667F8102055C70EB0",
              "name": "수납장 (냉장고장/키큰장)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 163640,
                  "vat": 16360,
                  "consumer": 180000
                },
                "number": 0
              }
            },
            {
              "id": "DBBEA1715677971744A02540667F81D748C2F4DE7",
              "name": "수납장 (하부수납장/여닫이도어)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DAE2D1715677971744A02540667F8190153B84DE1",
              "name": "수납장 (홈바/간접조명)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 227280,
                  "vat": 22720,
                  "consumer": 250000
                },
                "number": 0
              }
            },
            {
              "id": "DAAFB1715677971744A02540667F814F361E6C569",
              "name": "수납장 (서랍장)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 200000,
                  "vat": 20000,
                  "consumer": 220000
                },
                "number": 0
              }
            },
            {
              "id": "DBB2E1715677971744A02540667F817EDED57B35D",
              "name": "수납장 (하부수납장)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DAAFE1715677971744A02540667F81174FFF23F34",
              "name": "신발장(PET무광)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 500000,
                  "vat": 50000,
                  "consumer": 550000
                },
                "number": 0
              }
            },
            {
              "id": "DEEDB1715677971745A12540667F81E6103C7D4AA",
              "name": "선반장/아트월",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 1090910,
                  "vat": 109090,
                  "consumer": 1200000
                },
                "number": 0
              }
            },
            {
              "id": "DFEEB1715677971745A12540667F81D29BC267B8B",
              "name": "드레스룸(의류수납)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 109100,
                  "vat": 10900,
                  "consumer": 120000
                },
                "number": 0
              }
            },
            {
              "id": "DCE4C1715677971745A12540667F81F2AC1242ACA",
              "name": "붙박이장(PET무광/여닫이도어)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 145460,
                  "vat": 14540,
                  "consumer": 160000
                },
                "number": 0
              }
            },
            {
              "id": "DCC0A1715677971745A12540667F815DF0E81909B",
              "name": "붙박이장(PET무광/여닫이도어)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "자",
                "amount": {
                  "supply": 145460,
                  "vat": 14540,
                  "consumer": 160000
                },
                "number": 0
              }
            },
            {
              "id": "DFBEE1715677971745A12540667F8176BD0EE741A",
              "name": "발코니 수납장",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 318190,
                  "vat": 31810,
                  "consumer": 350000
                },
                "number": 0
              }
            },
            {
              "id": "DFFAF1715677971745A12540667F81C11BC343BC2",
              "name": "리프트업 도어(460*600)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 181820,
                  "vat": 18180,
                  "consumer": 200000
                },
                "number": 0
              }
            },
            {
              "id": "DFFFE1715677971745A12540667F810EB2B915FC1",
              "name": "선반설치 (일자, 무지주)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 63640,
                  "vat": 6360,
                  "consumer": 70000
                },
                "number": 0
              }
            },
            {
              "id": "DAC1E1715677971745A12540667F81719BECF2538",
              "name": "씽크대 도어교체 (하이그로시/무광PET)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "개",
                "amount": {
                  "supply": 50000,
                  "vat": 5000,
                  "consumer": 55000
                },
                "number": 0
              }
            }
          ]
        },
        {
          "id": "IDBDA1715677971745A12540667F810A6CACA0234",
          "name": "기타공사",
          "detail": [
            {
              "id": "DDF6B1715677971745A12540667F81FEA756D0FBC",
              "name": "테라스하부 마감 (?)",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 909100,
                  "vat": 90900,
                  "consumer": 1000000
                },
                "number": 0
              }
            },
            {
              "id": "DDA3E1715677971745A12540667F81302A42C9875",
              "name": "마루 부분보수",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 409100,
                  "vat": 40900,
                  "consumer": 450000
                },
                "number": 0
              }
            },
            {
              "id": "DAD3C1715677971745A12540667F81EDFAB3E0167",
              "name": "벽면,천장몰딩 부분보수",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 136370,
                  "vat": 13630,
                  "consumer": 150000
                },
                "number": 0
              }
            },
            {
              "id": "DFF0E1715677971745A12540667F81A9B97091B28",
              "name": "공사중 폐기물",
              "description": "",
              "info": [],
              "unit": {
                "ea": "대",
                "amount": {
                  "supply": 345460,
                  "vat": 34540,
                  "consumer": 380000
                },
                "number": 0
              }
            },
            {
              "id": "DCF3F1715677971745A12540667F816D856F92F79",
              "name": "공과잡비",
              "description": "",
              "info": [],
              "unit": {
                "ea": "식",
                "amount": {
                  "supply": 454550,
                  "vat": 45450,
                  "consumer": 500000
                },
                "number": 0
              }
            }
          ]
        }
      ],
      "commission": {
        "supply": 0,
        "vat": 0,
        "consumer": 0
      },
      "info": [],
      "comments": [
        "견적 내용 외 항목은 비용이 추가됩니다.",
        "자재변경, 공사내용 변경시 금액은 변경됩니다.",
        "공사 진행시 현장 상황에 따라 부득이한 변동사항이 발생할 수 있으며, 이 때는 상호 협의 후 진행합니다.",
        "하자보수 AS 기간은 1년입니다. (건물 자체 하자 제외)",
        "상세 내역서 별도 첨부 후 공사범위 확정합니다. (상세내역서 별도 첨부)",
        "입주청소 견적 외 별도입니다.",
        "엘리베이터 이용비가 있을 시 별도 청구됩니다."
      ]
    }
  ],
  "links": {
    "buiid": "u2111_aa01s",
    "cliid": "c1801_aa01s",
    "desid": "d1701_aa01s",
    "proid": "p1801_aa01s"
  }
}