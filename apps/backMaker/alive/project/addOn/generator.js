const ProjectSampleData = {
  // 프로젝트 ID, 각 프로젝트마다 고유한 식별자를 가집니다.
  "proid": "p2203_aa71s",

  // 고객 ID, 이 프로젝트와 관련된 고객의 고유 식별자입니다.
  "cliid": "c2203_aa75s",

  // 디자이너 ID, 이 프로젝트를 담당한 디자이너의 고유 식별자입니다.
  "desid": "d2105_aa02s",

  // 서비스 정보, 프로젝트와 관련된 서비스에 대한 세부 정보를 포함합니다.
  "service": {
    // 서비스 ID, 특정 서비스 유형을 식별합니다.
    "serid": "s2011_aa02s",
    // 서비스 옵션 값, 서비스의 특정 옵션을 나타냅니다.
    "xValue": "B",
    // 온라인 서비스 여부, 서비스가 온라인으로 제공되는지 여부를 나타냅니다.
    "online": false
  },

  // 제안서 정보, 프로젝트 진행 중 고객에게 제공된 제안서에 대한 세부 정보입니다.
  "proposal": {
    // 제안서 상태, 제안서의 현재 상태를 나타냅니다.
    "status": "발송 예약",
    // 제안서 발송 예정 날짜, 제안서가 발송될 예정인 날짜입니다.
    "date": new Date("2022-04-04T02:41:38.970Z"),
    // 제안서의 세부 정보 배열, 각 디자이너별로 제공된 제안서의 내용이 포함됩니다.
    "detail": [
      {
        // 디자이너 ID, 해당 제안서를 제공한 디자이너의 식별자입니다.
        "desid": "d1902_aa01s",
        // 제안된 수수료 정보, 서비스 제공에 대한 비용 세부 사항입니다.
        "fee": [
          {
            // 서비스 제공 방식 (오프라인/온라인 등)
            "method": "offline",
            // 부분 서비스 여부, 전체 또는 부분 서비스인지 여부를 나타냅니다.
            "partial": false,
            // 제안된 금액, 해당 서비스에 대해 제안된 총 금액입니다.
            "amount": 3999000,
            // 이동 거리 정보, 디자이너의 이동에 따른 거리 및 시간 정보입니다.
            "distance": {
              "number": 0,
              "amount": 0,
              "distance": "0km",
              "time": "0시간 0분",
              "limit": 5
            },
            // 할인가, 서비스 비용에서 적용된 할인을 나타냅니다.
            "discount": 0
          }
        ],
        // 제안서의 이미지 설정, 제안서에 포함된 이미지의 위치와 스타일 정보를 담고 있습니다.
        "pictureSettings": [
          {
            // 이미지의 위치 정보, 제안서에서 이미지가 표시될 위치를 나타냅니다.
            "position": "0",
            // 이미지의 중요한 여부, 이 이미지가 중요한지 여부를 나타냅니다.
            "sgTrue": "g",
            // 이미지 위치 병합 설정, 이미지가 병합되어 표시될지 여부를 나타냅니다.
            "unionPo": "union",
            // 스타일 정보, CSS 스타일을 이용해 이미지의 위치와 크기를 설정합니다.
            "styleText": "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/corePortfolio/listImage/p125/t6p125.jpg\");",
            // 이미지 소스, 이미지의 실제 파일 경로를 나타냅니다.
            "imgSrc": "/corePortfolio/listImage/p125/t6p125.jpg"
          },
          // 이외의 다른 이미지 설정들...
        ],
        // 제안서의 설명, 제안된 스타일 및 디자인에 대한 설명을 포함합니다.
        "description": [
          "전체적으로 모던하면서도, 동시에 편안하고 고급스러운 홈스타일링으로 집을 만들어 드립니다.",
          "디자이너로서 공간 활용 또는 스타일링에 대한 다양한 제안을 잘 하시는 편입니다.",
          "작업을 진행한 고객평 : \"원하는 것보다 더 좋은 제안을 받게되어 만족스러워요.\""
        ]
      },
      // 이외의 다른 디자이너의 제안서 세부 정보들...
            {
        "desid": "d1907_aa01s",
        "fee": [
          {
            "method": "offline",
            "partial": false,
            "amount": 3751000,
            "distance": {
              "number": 0,
              "amount": 0,
              "distance": "0km",
              "time": "0시간 0분",
              "limit": 5
            },
            "discount": 0
          }
        ],
        "pictureSettings": [
          {
            "position": "0",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/corePortfolio/listImage/p89/t4p89.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p89/t4p89.jpg"
          },
          {
            "position": "1",
            "sgTrue": "s",
            "unionPo": "right",
            "styleText": "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/p33/t14p33.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p33/t14p33.jpg"
          },
          {
            "position": "2",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 32.8%; height: 33%; top: 67%; left: 0%; background-image: url(\"/corePortfolio/listImage/p61/t2p61.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p61/t2p61.jpg"
          },
          {
            "position": "3",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 33%; height: 33%; top: 67%; left: 33.5%; background-image: url(\"/corePortfolio/listImage/p118/t6p118.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p118/t6p118.jpg"
          },
          {
            "position": "4",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 32.8%; height: 33%; top: 67%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/p61/t15p61.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p61/t15p61.jpg"
          }
        ],
        "description": [
          "패브릭과 우드톤을 사용한 내추럴한 스타일링으로 공간을 따뜻하게 만들어 드립니다.",
          "고객의 예산과 상황에 맞춰 최대한의 디자인 결과물을 내려고 노력하는 편이십니다.",
          "작업을 진행한 고객평 : \"적은 예산이지만 실장님과 진행하니 만족스러워요.\""
        ]
      },
      {
        "desid": "d2105_aa02s",
        "fee": [
          {
            "method": "offline",
            "partial": false,
            "amount": 3150000,
            "distance": {
              "number": 0,
              "amount": 0,
              "distance": "0km",
              "time": "0시간 0분",
              "limit": 5
            },
            "discount": 0
          }
        ],
        "pictureSettings": [
          {
            "position": "0",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/corePortfolio/forecast/p197/photo28.jpg\");",
            "imgSrc": "/corePortfolio/forecast/p197/photo28.jpg"
          },
          {
            "position": "1",
            "sgTrue": "s",
            "unionPo": "right",
            "styleText": "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/p143/t2p143.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p143/t2p143.jpg"
          },
          {
            "position": "2",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"/corePortfolio/forecast/p197/photo35.jpg\");",
            "imgSrc": "/corePortfolio/forecast/p197/photo35.jpg"
          },
          {
            "position": "3",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"/rawDesigner/ghost/d2105_aa02s/g2.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2105_aa02s/g2.jpg"
          },
          {
            "position": "4",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"/rawDesigner/ghost/d2105_aa02s/g14.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2105_aa02s/g14.jpg"
          }
        ],
        "description": [
          "고객님의 스타일에 잘 맞추어 조정하며, 서로간 예의를 지키는 가치를 중요시 합니다.",
          "화려함보다는 질리지 않는 뉴트럴 톤의 공간 스타일을 지향합니다.",
          "집이 단순한 휴식 공간을 넘어 나를 표현하는 곳이 될 수 있도록 만들어 드립니다."
        ]
      },
      {
        "desid": "d2004_aa01s",
        "fee": [
          {
            "method": "offline",
            "partial": false,
            "amount": 3021000,
            "distance": {
              "number": 0,
              "amount": 0,
              "distance": "0km",
              "time": "0시간 0분",
              "limit": 5
            },
            "discount": 0
          }
        ],
        "pictureSettings": [
          {
            "position": "0",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/corePortfolio/listImage/p117/t2p117.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p117/t2p117.jpg"
          },
          {
            "position": "1",
            "sgTrue": "s",
            "unionPo": "right",
            "styleText": "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/p119/t20p119.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p119/t20p119.jpg"
          },
          {
            "position": "2",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 32.8%; height: 33%; top: 67%; left: 0%; background-image: url(\"/corePortfolio/listImage/p150/t6p150.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p150/t6p150.jpg"
          },
          {
            "position": "3",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"/corePortfolio/listImage/p119/t15p119.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p119/t15p119.jpg"
          },
          {
            "position": "4",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 32.8%; height: 33%; top: 67%; left: 67.2%; background-image: url(\"/corePortfolio/listImage/p119/t7p119.jpg\");",
            "imgSrc": "/corePortfolio/listImage/p119/t7p119.jpg"
          }
        ],
        "description": [
          "내추럴한 스타일링에 강점이 있고, 스튜디오 타입 혹은 독창적인 니즈에 꼭 맞는 스타일링에 능합니다.",
          "고객의 요청 사항에 대해서 세심하게 반응하며 디자인합니다.",
          "작업을 진행한 고객평 : \"책임감있게 제안해주셔서 의견 조정시 믿고 따라갈 수 있었습니다.\""
        ]
      },
      {
        "desid": "d2201_aa02s",
        "fee": [
          {
            "method": "offline",
            "partial": false,
            "amount": 2725000,
            "distance": {
              "number": 0,
              "amount": 0,
              "distance": "0km",
              "time": "0시간 0분",
              "limit": 5
            },
            "discount": 0
          }
        ],
        "pictureSettings": [
          {
            "position": "0",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"/rawDesigner/ghost/d2201_aa02s/g15.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2201_aa02s/g15.jpg"
          },
          {
            "position": "1",
            "sgTrue": "s",
            "unionPo": "right",
            "styleText": "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"/rawDesigner/ghost/d2201_aa02s/g12.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2201_aa02s/g12.jpg"
          },
          {
            "position": "2",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"/rawDesigner/ghost/d2201_aa02s/g14.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2201_aa02s/g14.jpg"
          },
          {
            "position": "3",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"/rawDesigner/ghost/d2201_aa02s/g10.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2201_aa02s/g10.jpg"
          },
          {
            "position": "4",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"/rawDesigner/ghost/d2201_aa02s/g9.jpg\");",
            "imgSrc": "/rawDesigner/ghost/d2201_aa02s/g9.jpg"
          }
        ],
        "description": [
          "미팅 전에 준비한 라이프스타일 체크지를 통해 생활 습관들을 전반적으로 파악합니다.",
          "고객님만의 드림 하우스, 고객님만의 낭만적인 공간 요소를 찾아보려 노력합니다.",
          "고객님을 잘 표현할 수 있는 컬러, 무드, 소재, 브랜드를 고려하고 제안합니다."
        ]
      }
    ]
  },

  // 프로젝트 진행 상태 및 관련된 세부 정보
  "process": {
    // 프로젝트 상태, 현재 프로젝트의 상태를 나타냅니다.
    "status": "완료",
    // 현재 진행 중인 액션, 현재 프로젝트에서 진행 중인 작업을 나타냅니다.
    "action": "촬영 컨택",
    // 세부 사항, 특정 이유나 추가적인 정보를 기록할 수 있는 배열입니다.
    "detail": [],
    // 프로젝트 중단 이유, 프로젝트가 중단된 경우 그 이유를 기록합니다.
    "outreason": [],
    // 전화 기록, 다음 전화 일정과 과거 전화 내역을 포함합니다.
    "call": {
      // 다음 전화 일정, 다음 통화가 예정된 날짜를 나타냅니다.
      "next": new Date(1800, 0, 1),
      // 과거 전화 기록 배열, 이전 통화 내역을 기록합니다.
      "history": []
    },
    // 계약 정보, 프로젝트와 관련된 계약의 세부 사항입니다.
    "contract": {
      // 첫 번째 계약 정보, 초기 계약 관련 날짜 및 계산 정보를 포함합니다.
      "first": {
        // 계약 가이드 날짜, 계약에 대한 가이드가 제공된 날짜입니다.
        "guide": new Date(1800, 0, 1),
        // 계약 체결 날짜, 실제 계약이 체결된 날짜입니다.
        "date": new Date(1800, 0, 1),
        // 계약 취소 날짜, 계약이 취소된 경우 그 날짜를 기록합니다.
        "cancel": new Date(1800, 0, 1),
        // 계산 정보, 계약과 관련된 금액 계산 정보를 포함합니다.
        "calculation": {
          // 계약 금액, 계약에 따라 지불된 금액입니다.
          "amount": 330000,
          // 계산에 대한 추가 정보, 지불 방법과 영수증 정보 등을 포함합니다.
          "info": {
            "method": "카드(롯데)",
            "proof": "이니시스",
            "to": "이민희"
          },
          // 환불 금액, 만약 환불이 발생한 경우 그 금액을 기록합니다.
          "refund": 0
        }
      },
      // 잔금 계약 정보, 남은 금액에 대한 계약 관련 정보를 포함합니다.
      "remain": {
        // 잔금 가이드 날짜, 잔금에 대한 가이드가 제공된 날짜입니다.
        "guide": new Date(1800, 0, 1),
        // 잔금 체결 날짜, 실제 잔금이 지불된 날짜입니다.
        "date": new Date("2022-05-10T02:16:52.867Z"),
        // 잔금 취소 날짜, 잔금 계약이 취소된 경우 그 날짜를 기록합니다.
        "cancel": new Date(1800, 0, 1),
        // 잔금 계산 정보, 잔금과 관련된 금액 계산 정보를 포함합니다.
        "calculation": {
          // 잔금 금액 정보, 공급가, 부가세, 소비자 가격을 포함합니다.
          "amount": {
            "supply": 3150000,
            "vat": 315000,
            "consumer": 3465000
          },
          // 잔금에 대한 추가 정보, 지불 방법과 영수증 정보 등을 포함합니다.
          "info": {
            "method": "카드(롯데)",
            "proof": "이니시스",
            "to": "이민희"
          },
          // 환불 금액, 만약 환불이 발생한 경우 그 금액을 기록합니다.
          "refund": 0,
          // 할인 금액, 잔금에서 적용된 할인 금액입니다.
          "discount": 0
        }
      },
      // 계약서 양식 정보, 계약서와 관련된 날짜와 ID 정보를 포함합니다.
      "form": {
        // 계약서 ID, 계약서의 고유 식별자입니다.
        "id": "6279cab19fc128b671e0afee",
        // 계약서 가이드 날짜, 계약서 가이드가 제공된 날짜입니다.
        "guide": new Date(1800, 0, 1),
        // 계약 기간, 계약이 유효한 기간을 나타냅니다.
        "date": {
          // 계약 시작 날짜, 계약이 시작되는 날짜입니다.
          "from": new Date("2022-06-14T15:00:00.000Z"),
          // 계약 종료 날짜, 계약이 종료되는 날짜입니다.
          "to": new Date("2022-08-14T15:00:00.000Z"),
          // 계약 취소 날짜, 계약이 취소된 경우 그 날짜를 기록합니다.
          "cancel": new Date(1800, 0, 1),
        }
      },
      // 미팅 정보, 미팅과 관련된 날짜와 이전 디자이너 정보를 포함합니다.
      "meeting": {
        // 미팅 날짜, 미팅이 진행된 날짜입니다.
        "date": new Date("2022-05-09T03:30:00.000Z"),
        // 과거 디자이너들, 이전에 참여했던 디자이너들에 대한 정보를 포함합니다.
        "pastDesigners": []
      }
    },

    // 디자인 진행 상태 및 세부 정보
    "design": {
      // 제안 정보, 디자인 제안이 제공되었는지 여부를 포함합니다.
      "proposal": {
        // 제공 여부, 제안이 제공되었는지 여부를 나타냅니다.
        "provided": false,
        // 제안서 제한, 제안에 대한 제한 사항이 있는지 여부를 나타냅니다.
        "limit": null,
        // 제안서의 세부 정보, 제안서에 포함된 세부 사항들을 기록합니다.
        "detail": []
      },
      // 시공 진행 상태, 시공이 완료되었는지 여부를 포함합니다.
      "construct": {
        // 시공 상태, 시공의 현재 상태를 나타냅니다.
        "status": "완료",
        // 시공 요청 날짜, 시공 요청이 이루어진 날짜입니다.
        "request": new Date("2022-06-15T15:00:00.000Z"),
        // 시공 견적, 시공에 대한 견적 정보를 포함합니다.
        "estimate": [
          {
            // 인보이스 ID, 시공 견적서의 고유 식별자입니다.
            "invid": null,
            // 견적 날짜, 견적이 작성된 날짜입니다.
            "date": new Date("2022-07-17T15:00:00.000Z"),
          }
        ],
        // 시공 계약 정보, 시공과 관련된 계약의 세부 사항입니다.
        "contract": {
          // 시공 파트너, 시공을 담당한 파트너 업체의 이름입니다.
          "partner": "김상우_규빗디자인웍스",
          // 시공 계약서 양식, 계약서와 관련된 날짜와 ID 정보를 포함합니다.
          "form": {
            "id": "62da5f1f5a0db2004b8fdfbf",
            "guide": new Date("2022-07-22T08:26:05.332Z"),
            "date": {
              "from": new Date("2022-07-24T15:00:00.000Z"),
              "to": new Date("2022-08-01T15:00:00.000Z"),
              "cancel": new Date(1800, 0, 1),
            }
          },
          // 시공 비용 계산 정보, 시공과 관련된 금액 계산 정보를 포함합니다.
          "payments": {
            // 첫 번째 지불 정보, 시공의 첫 번째 지불과 관련된 세부 사항입니다.
            "first": {
              "guide": new Date("2022-07-22T08:26:08.556Z"),
              "date": new Date("2022-07-22T08:28:26.619Z"),
              "cancel": new Date(1800, 0, 1),
              "calculation": {
                // 첫 번째 지불 금액 정보, 공급가, 부가세, 소비자 가격을 포함합니다.
                "amount": {
                  "supply": 642728,
                  "vat": 64272,
                  "consumer": 707000
                },
                "info": {
                  "method": "계좌 이체",
                  "proof": "현금 영수증",
                  "to": "이민희"
                },
                "refund": 0
              }
            },
            // 작업 시작 지불 정보, 시공 시작 시 지불된 금액과 관련된 세부 사항입니다.
            "start": {
              "guide": new Date("2022-07-26T04:57:16.858Z"),
              "date": new Date("2022-07-26T05:10:35.142Z"),
              "cancel": new Date(1800, 0, 1),
              "calculation": {
                // 작업 시작 시 지불된 금액 정보, 공급가, 부가세, 소비자 가격을 포함합니다.
                "amount": {
                  "supply": 2570910,
                  "vat": 257090,
                  "consumer": 2828000
                },
                "info": {
                  "method": "계좌 이체",
                  "proof": "현금 영수증",
                  "to": "이민희"
                },
                "refund": 0
              }
            },
            // 중간 지불 정보, 시공 중간에 지불된 금액과 관련된 세부 사항입니다.
            "middle": {
              "guide": new Date("2022-07-28T05:28:10.718Z"),
              "date": new Date("2022-07-30T15:45:47.658Z"),
              "cancel": new Date(1800, 0, 1),
              "calculation": {
                // 중간 지불 금액 정보, 공급가, 부가세, 소비자 가격을 포함합니다.
                "amount": {
                  "supply": 2570910,
                  "vat": 257090,
                  "consumer": 2828000
                },
                "info": {
                  "method": "계좌 이체",
                  "proof": "현금 영수증",
                  "to": "이민희"
                },
                "refund": 0
              }
            },
            // 잔금 지불 정보, 시공 완료 후 남은 잔금의 지불과 관련된 세부 사항입니다.
            "remain": {
              "guide": new Date("2022-08-03T02:37:08.287Z"),
              "date": new Date("2022-08-03T02:52:06.077Z"),
              "cancel": new Date(1800, 0, 1),
              "calculation": {
                // 잔금 금액 정보, 공급가, 부가세, 소비자 가격을 포함합니다.
                "amount": {
                  "supply": 470000,
                  "vat": 47000,
                  "consumer": 517000
                },
                "info": {
                  "method": "계좌 이체",
                  "proof": "현금 영수증",
                  "to": "이민희"
                },
                "refund": 0
              }
            }
          },
          // 시공 후 처리 정보, 시공이 완료된 후의 처리 관련 정보를 포함합니다.
          "after": {
            // 만료 날짜, 시공 후 처리 기간의 만료 날짜입니다.
            "expired": new Date(1800, 0, 1),
            // 시공 후 처리 기록, 시공 후의 기록들을 포함합니다.
            "history": []
          }
        }
      },
      // 구매 정보, 프로젝트와 관련된 구매가 진행되었는지 여부를 나타냅니다.
      "purchase": {
        // 제공 여부, 구매가 제공되었는지 여부를 나타냅니다.
        "provided": false,
        // 구매의 세부 정보, 구매에 포함된 세부 사항들을 기록합니다.
        "detail": []
      }
    },

    // 계산 정보, 프로젝트와 관련된 지불 및 계산 세부 정보를 포함합니다.
    "calculation": {
      // 계산 방법, 계산이 이루어진 방식 (예: 사업자, 간이 등)을 나타냅니다.
      "method": "사업자(간이)",
      // 수수료 비율, 프로젝트의 수익 배분 비율을 나타냅니다.
      "percentage": 30,
      // 계산 정보, 지불과 관련된 세부 정보입니다.
      "info": {
        // 은행 계좌 정보, 금액이 지불된 계좌 정보입니다.
        "account": "우리은행 1005-704-310314",
        // 증빙 정보, 지불과 관련된 증빙 정보입니다.
        "proof": "박주령",
        // 지불 대상, 지불된 금액의 수신자입니다.
        "to": "박주령"
      },
      // 지불 정보, 각 지불과 관련된 세부 정보를 포함합니다.
      "payments": {
        // 총 지불 금액, 전체 프로젝트에 대해 지불된 총 금액입니다.
        "totalAmount": 2205000,
        // 첫 번째 지불 정보, 프로젝트 시작 시 지불된 금액과 관련된 세부 사항입니다.
        "first": {
          "amount": 1102500,
          "date": new Date("2022-05-22T15:00:00.000Z"),
          "cancel": new Date(1800, 0, 1),
          "refund": 0
        },
        // 잔금 지불 정보, 프로젝트 완료 후 남은 잔금의 지불과 관련된 세부 사항입니다.
        "remain": {
          "amount": 1102500,
          "date": new Date("2022-09-25T15:00:00.000Z"),
          "cancel": new Date(1800, 0, 1),
          "refund": 0
        }
      }
    }
  },

  // 콘텐츠 정보, 프로젝트와 관련된 콘텐츠에 대한 세부 사항입니다.
  "contents": {
    // 콘텐츠 ID, 관련된 콘텐츠의 고유 식별자입니다.
    "conid": "",
    // 사진 촬영 정보, 프로젝트에 대한 사진 촬영 세부 정보입니다.
    "photo": {
      // 촬영 여부, 사진 촬영이 완료되었는지 여부를 나타냅니다.
      "boo": true,
      // 촬영 상태, 현재 사진 촬영의 상태를 나타냅니다.
      "status": "촬영 완료",
      // 촬영 날짜, 사진 촬영이 이루어진 날짜입니다.
      "date": new Date("2022-09-20T02:00:00.000Z"),
      // 촬영 정보, 촬영 관련 담당자의 정보를 포함합니다.
      "info": {
        // 사진사 이름, 촬영을 담당한 사진사의 이름입니다.
        "photographer": "정경일",
        // 인터뷰어 이름, 인터뷰를 담당한 인터뷰어의 이름입니다.
        "interviewer": "김지은"
      }
    },
    // 원본 자료, 프로젝트와 관련된 원본 자료에 대한 세부 사항입니다.
    "raw": {
      // 포트폴리오 원본 상태, 원본 포트폴리오가 수집되었는지 여부를 나타냅니다.
      "portfolio": {
        "status": "원본 수집 완료",
        // 원본 포트폴리오의 링크, 원본 자료에 접근할 수 있는 링크입니다.
        "link": "https://drive.google.com/file/d/1NUAzCa80Zz2nESM_tpQc4YHTJ5mrjRdQ/view?uspsharing"
      },
      // 인터뷰 원본 상태, 원본 인터뷰 자료가 수집되었는지 여부를 나타냅니다.
      "interview": {
        "status": "해당 없음",
        "link": ""
      },
      // 사진 원본 상태, 원본 사진이 보정되었는지 여부를 나타냅니다.
      "photo": {
        "status": "원본 보정 완료",
        "link": ""
      }
    },
    // 공유 정보, 프로젝트의 콘텐츠가 고객과 디자이너에게 공유된 날짜입니다.
    "share": {
      "client": {
        "photo": new Date("2022-09-20T11:19:26.986Z"),
        "contents": new Date("2022-12-02T06:49:02.585Z"),
      },
      "designer": {
        "photo": new Date("2022-09-20T11:19:26.986Z"),
        "contents": new Date("2022-12-02T06:49:02.585Z"),
      }
    },
    // SNS 공유 정보, SNS에 공유된 포트폴리오 및 인터뷰의 세부 사항입니다.
    "sns": {
      "portfolio": {
        // 포트폴리오의 장기 공유 일정, 포트폴리오가 장기적으로 SNS에 공유될 일정입니다.
        "long": new Date("3799-12-31T15:00:00.000Z"),
        // 포트폴리오의 단기 공유 일정, 포트폴리오가 단기적으로 SNS에 공유될 일정입니다.
        "short": new Date(1800, 0, 1),
      },
      "interview": {
        // 인터뷰의 장기 공유 일정, 인터뷰가 장기적으로 SNS에 공유될 일정입니다.
        "long": new Date("2022-12-01T15:00:00.000Z"),
        // 인터뷰의 단기 공유 일정, 인터뷰가 단기적으로 SNS에 공유될 일정입니다.
        "short": new Date(-5364692872000),
      }
    },
    // 결제 정보, 프로젝트와 관련된 결제 세부 사항입니다.
    "payment": {
      // 결제 상태, 결제가 완료되었는지 여부를 나타냅니다.
      "status": "결제 완료",
      // 결제 날짜, 결제가 이루어진 날짜입니다.
      "date": new Date("2022-09-20T02:00:00.000Z"),
      // 결제 취소 날짜, 결제가 취소된 경우 그 날짜를 기록합니다.
      "cancel": new Date(1800, 0, 1),
      // 결제 계산 정보, 결제와 관련된 금액 계산 정보를 포함합니다.
      "calculation": {
        // 결제 금액 정보, 결제에 따른 총 금액을 나타냅니다.
        "amount": 165000,
        // 결제 정보, 지불 방법과 영수증 정보 등을 포함합니다.
        "info": {
          "method": "계좌 이체",
          "proof": "현금영수증",
          "to": "박주령"
        },
        // 환불 금액, 만약 환불이 발생한 경우 그 금액을 기록합니다.
        "refund": 0
      }
    }
  }
}

/**
 * ProjectMap은 홈리에종 인테리어 프로젝트에 대한 스키마를 정의하고 기본값을 제공하는 JSON 생성기 함수입니다.
 * 이 스키마는 프로젝트의 다양한 속성에 대한 기본 구조와 데이터를 초기화합니다.
 */
const ProjectMap = {
  /**
   * main 메서드는 프로젝트의 전체 구조를 정의하는 기본 JSON 객체를 생성합니다.
   * @returns {Object} - 프로젝트에 대한 기본 스키마를 가진 JSON 객체
   */
  main: function () {
    let dummy; // JSON 객체를 담을 변수 dummy를 선언합니다.
    dummy = {
      structure: { // 프로젝트 구조를 정의하는 'structure' 객체를 초기화합니다.
        proid: "", // 프로젝트 ID를 나타내는 문자열입니다.
        cliid: "", // 고객 ID를 나타내는 문자열입니다.
        desid: "", // 디자이너 ID를 나타내는 문자열입니다.
        service: { // 서비스 정보와 관련된 속성을 정의하는 객체입니다.
          serid: "", // 서비스 ID를 나타내는 문자열입니다.
          xValue: "", // 서비스와 관련된 추가 정보를 나타내는 값입니다.
          online: false, // 온라인 서비스 여부를 나타내는 불리언 값입니다.
        },
        proposal: { // 제안서와 관련된 정보를 담고 있는 객체입니다.
          status: "", // 제안서 상태를 나타내는 문자열입니다.
          date: new Date(1800, 0, 1), // 제안서 생성 날짜를 초기화합니다.
          detail: [], // 제안서 세부사항을 담을 배열입니다.
        },
        process: { // 프로젝트 프로세스에 대한 정보를 담는 객체입니다.
          status: "대기", // 현재 프로세스 상태를 나타내는 문자열입니다.
          action: "계약금 안내", // 다음으로 취할 액션을 나타내는 문자열입니다.
          detail: [], // 프로세스 세부사항을 담을 배열입니다.
          outreason: [], // 프로젝트 종료 사유를 담는 배열입니다.
          call: { // 통화 기록과 관련된 정보를 담는 객체입니다.
            next: new Date(1800, 0, 1), // 다음 통화 예약 날짜를 초기화합니다.
            history: [], // 통화 기록을 담는 배열입니다.
          },
          contract: { // 계약 관련 정보를 담는 객체입니다.
            first: { // 초기 계약 정보에 대한 객체입니다.
              guide: new Date(1800, 0, 1), // 계약 가이드의 날짜를 초기화합니다.
              date: new Date(1800, 0, 1), // 계약 날짜를 초기화합니다.
              cancel: new Date(1800, 0, 1), // 계약 취소 날짜를 초기화합니다.
              calculation: { // 계산과 관련된 정보를 담는 객체입니다.
                amount: 0, // 계산 금액을 초기화합니다.
                info: { // 추가적인 계산 정보를 담는 객체입니다.
                  method: "", // 결제 방법을 나타내는 문자열입니다.
                  proof: "", // 결제 증빙을 나타내는 문자열입니다.
                  to: "", // 수신자를 나타내는 문자열입니다.
                },
                refund: 0, // 환불 금액을 초기화합니다.
              },
            },
            remain: { // 잔여 계약에 대한 객체입니다.
              guide: new Date(1800, 0, 1), // 잔여 계약 가이드 날짜를 초기화합니다.
              date: new Date(1800, 0, 1), // 잔여 계약 날짜를 초기화합니다.
              cancel: new Date(1800, 0, 1), // 잔여 계약 취소 날짜를 초기화합니다.
              calculation: { // 잔여 계약 계산과 관련된 정보를 담는 객체입니다.
                amount: { // 금액에 대한 상세 정보를 담는 객체입니다.
                  supply: 0, // 공급 금액을 초기화합니다.
                  vat: 0, // 부가가치세 금액을 초기화합니다.
                  consumer: 0, // 소비자 금액을 초기화합니다.
                },
                info: { // 추가적인 계산 정보를 담는 객체입니다.
                  method: "", // 결제 방법을 나타내는 문자열입니다.
                  proof: "", // 결제 증빙을 나타내는 문자열입니다.
                  to: "", // 수신자를 나타내는 문자열입니다.
                },
                refund: 0, // 환불 금액을 초기화합니다.
                discount: 0, // 할인 금액을 초기화합니다.
              },
            },
            form: { // 계약서와 관련된 정보를 담는 객체입니다.
              id: "", // 계약서 ID를 나타내는 문자열입니다.
              guide: new Date(1800, 0, 1), // 계약서 가이드 날짜를 초기화합니다.
              date: { // 계약 기간과 관련된 날짜 정보를 담는 객체입니다.
                from: new Date(1800, 0, 1), // 계약 시작 날짜를 초기화합니다.
                to: new Date(1800, 0, 1), // 계약 종료 날짜를 초기화합니다.
                cancel: new Date(1800, 0, 1), // 계약 취소 날짜를 초기화합니다.
              }
            },
            meeting: { // 계약 전 미팅과 관련된 정보를 담는 객체입니다.
              date: new Date(1800, 0, 1), // 미팅 날짜를 초기화합니다.
              pastDesigners: [] // 이전 디자이너에 대한 정보를 담는 배열입니다.
            },
          },
          design: { // 디자인과 관련된 정보를 담는 객체입니다.
            proposal: { // 디자인 제안서와 관련된 정보를 담는 객체입니다.
              provided: false, // 제안서 제공 여부를 나타내는 불리언 값입니다.
              limit: null, // 제안서 제한을 나타내는 값입니다.
              detail: [] // 제안서 세부 정보를 담는 배열입니다.
            },
            construct: null, // 시공과 관련된 정보를 담는 객체입니다.
            purchase: { // 구매와 관련된 정보를 담는 객체입니다.
              provided: false, // 구매 제공 여부를 나타내는 불리언 값입니다.
              detail: [], // 구매 세부 정보를 담는 배열입니다.
            },
          },
          calculation: { // 최종 계산과 관련된 정보를 담는 객체입니다.
            method: "", // 계산 방법을 나타내는 문자열입니다.
            percentage: 0, // 계산 비율을 초기화합니다.
            info: { // 추가적인 계산 정보를 담는 객체입니다.
              account: "", // 계좌 정보를 나타내는 문자열입니다.
              proof: "", // 증빙 정보를 나타내는 문자열입니다.
              to: "", // 수신자를 나타내는 문자열입니다.
            },
            payments: { // 결제와 관련된 정보를 담는 객체입니다.
              totalAmount: 0, // 총 금액을 초기화합니다.
              first: { // 첫 결제와 관련된 정보를 담는 객체입니다.
                amount: 0, // 첫 결제 금액을 초기화합니다.
                date: new Date(1800, 0, 1), // 첫 결제 날짜를 초기화합니다.
                cancel: new Date(1800, 0, 1), // 첫 결제 취소 날짜를 초기화합니다.
                refund: 0, // 첫 결제 환불 금액을 초기화합니다.
              },
              remain: { // 잔여 결제와 관련된 정보를 담는 객체입니다.
                amount: 0, // 잔여 결제 금액을 초기화합니다.
                date: new Date(1800, 0, 1), // 잔여 결제 날짜를 초기화합니다.
                cancel: new Date(1800, 0, 1), // 잔여 결제 취소 날짜를 초기화합니다.
                refund: 0, // 잔여 결제 환불 금액을 초기화합니다.
              }
            }
          },
        },
        contents: { // 콘텐츠와 관련된 정보를 담는 객체입니다.
          conid: "", // 콘텐츠 ID를 나타내는 문자열입니다.
          photo: { // 사진과 관련된 정보를 담는 객체입니다.
            boo: true, // 사진 촬영 여부를 나타내는 불리언 값입니다.
            status: "세팅 대기", // 사진 상태를 나타내는 문자열입니다.
            date: new Date(3800, 0, 1), // 사진 촬영 날짜를 초기화합니다.
            info: { // 사진과 관련된 추가 정보를 담는 객체입니다.
              photographer: "미정", // 사진 작가 이름을 나타내는 문자열입니다.
              interviewer: "미정", // 인터뷰어 이름을 나타내는 문자열입니다.
            }
          },
          payment: { // 결제와 관련된 정보를 담는 객체입니다.
            status: "결제 대기", // 결제 상태를 나타내는 문자열입니다.
            date: new Date(1800, 0, 1), // 결제 날짜를 초기화합니다.
            cancel: new Date(1800, 0, 1), // 결제 취소 날짜를 초기화합니다.
            calculation: { // 결제 계산과 관련된 정보를 담는 객체입니다.
              amount: 165000, // 결제 금액을 초기화합니다.
              info: { // 추가적인 결제 정보를 담는 객체입니다.
                method: "", // 결제 방법을 나타내는 문자열입니다.
                proof: "", // 결제 증빙을 나타내는 문자열입니다.
                to: "", // 수신자를 나타내는 문자열입니다.
              },
              refund: 0, // 환불 금액을 초기화합니다.
            },
          },
          raw: { // 원본 자료와 관련된 정보를 담는 객체입니다.
            portfolio: { // 포트폴리오와 관련된 정보를 담는 객체입니다.
              status: "해당 없음", // 포트폴리오 상태를 나타내는 문자열입니다.
              link: "", // 포트폴리오 링크를 나타내는 문자열입니다.
            },
            interview: { // 인터뷰와 관련된 정보를 담는 객체입니다.
              status: "해당 없음", // 인터뷰 상태를 나타내는 문자열입니다.
              link: "", // 인터뷰 링크를 나타내는 문자열입니다.
            },
            photo: { // 사진 원본과 관련된 정보를 담는 객체입니다.
              status: "해당 없음", // 사진 원본 상태를 나타내는 문자열입니다.
              link: "", // 사진 원본 링크를 나타내는 문자열입니다.
            },
          },
          share: { // 공유와 관련된 정보를 담는 객체입니다.
            client: { // 클라이언트와 관련된 정보를 담는 객체입니다.
              photo: new Date(3800, 0, 1), // 클라이언트에게 공유된 사진 날짜를 초기화합니다.
              contents: new Date(3800, 0, 1), // 클라이언트에게 공유된 콘텐츠 날짜를 초기화합니다.
            },
            designer: { // 디자이너와 관련된 정보를 담는 객체입니다.
              photo: new Date(3800, 0, 1), // 디자이너에게 공유된 사진 날짜를 초기화합니다.
              contents: new Date(3800, 0, 1), // 디자이너에게 공유된 콘텐츠 날짜를 초기화합니다.
            }
          },
          sns: { // 소셜 미디어와 관련된 정보를 담는 객체입니다.
            portfolio: { // 포트폴리오와 관련된 소셜 미디어 정보를 담는 객체입니다.
              long: new Date(3800, 0, 1), // 장기 포트폴리오 상태를 초기화합니다.
              short: new Date(3800, 0, 1), // 단기 포트폴리오 상태를 초기화합니다.
            },
            interview: { // 인터뷰와 관련된 소셜 미디어 정보를 담는 객체입니다.
              long: new Date(3800, 0, 1), // 장기 인터뷰 상태를 초기화합니다.
              short: new Date(3800, 0, 1), // 단기 인터뷰 상태를 초기화합니다.
            },
          }
        },
      }
    };
    return dummy; // 생성된 JSON 객체를 반환합니다.
  },

  /**
   * sub 메서드는 특정 주제에 대한 서브 객체를 생성합니다.
   * @param {string} subject - 생성할 서브 객체의 주제
   * @returns {Object|null} - 주제에 따른 서브 객체를 반환하거나, 해당 주제가 없으면 null을 반환합니다.
   */
  sub: function (subject) {
    let dummy = null; // 서브 객체를 담을 변수 dummy를 선언합니다.
    
    // 주제에 따라 다른 서브 객체를 생성합니다.
    if (subject === "process.call.history") {
      dummy = {
        date: new Date(1800, 0, 1), // 통화 날짜를 초기화합니다.
        who: "", // 통화 상대를 나타내는 문자열입니다.
      };
    } else if (subject === "process.contract.meeting.pastDesigners") {
      dummy = {
        date: new Date(1800, 0, 1), // 미팅 날짜를 초기화합니다.
        desid: "", // 이전 디자이너의 ID를 나타내는 문자열입니다.
      };
    } else if (subject === "process.design.construct") {
      dummy = {
        status: "대기", // 시공 상태를 나타내는 문자열입니다.
        request: new Date(1800, 0, 1), // 시공 요청 날짜를 초기화합니다.
        estimate: [], // 시공 견적 정보를 담는 배열입니다.
        contract: { // 시공 계약과 관련된 정보를 담는 객체입니다.
          partner: "", // 시공 파트너를 나타내는 문자열입니다.
          form: { // 계약서와 관련된 정보를 담는 객체입니다.
            id: "", // 계약서 ID를 나타내는 문자열입니다.
            guide: new Date(1800, 0, 1), // 계약서 가이드 날짜를 초기화합니다.
            date: { // 계약 기간과 관련된 날짜 정보를 담는 객체입니다.
              from: new Date(1800, 0, 1), // 계약 시작 날짜를 초기화합니다.
              to: new Date(1800, 0, 1), // 계약 종료 날짜를 초기화합니다.
              cancel: new Date(1800, 0, 1), // 계약 취소 날짜를 초기화합니다.
            }
          },
          payments: { // 시공 결제와 관련된 정보를 담는 객체입니다.
            first: null, // 첫 결제 정보를 초기화합니다.
            start: null, // 시작 결제 정보를 초기화합니다.
            middle: null, // 중간 결제 정보를 초기화합니다.
            remain: null, // 잔여 결제 정보를 초기화합니다.
          },
          after: { // 시공 후 정보와 관련된 객체입니다.
            expired: new Date(1800, 0, 1), // 시공 만료 날짜를 초기화합니다.
            history: [], // 시공 후 기록을 담는 배열입니다.
          }
        }
      };
    } else if (subject === "process.design.construct.estimate") {
      dummy = {
        invid: "", // 견적서 ID를 나타내는 문자열입니다.
        date: new Date(1800, 0, 1), // 견적 날짜를 초기화합니다.
      };
    } else if (subject === "process.design.construct.contract.after.history") {
      dummy = {
        from: new Date(1800, 0, 1), // 시공 시작 날짜를 초기화합니다.
        to: new Date(1800, 0, 1), // 시공 종료 날짜를 초기화합니다.
        amount: 0, // 시공 금액을 초기화합니다.
      };
    } else if (subject === "process.design.construct.contract.payments") {
      dummy = {
        guide: new Date(1800, 0, 1), // 결제 가이드 날짜를 초기화합니다.
        date: new Date(1800, 0, 1), // 결제 날짜를 초기화합니다.
        cancel: new Date(1800, 0, 1), // 결제 취소 날짜를 초기화합니다.
        calculation: { // 결제 계산과 관련된 정보를 담는 객체입니다.
          amount: { // 결제 금액에 대한 객체입니다.
            supply: 0, // 공급 금액을 초기화합니다.
            vat: 0, // 부가가치세 금액을 초기화합니다.
            consumer: 0, // 소비자 금액을 초기화합니다.
          },
          info: { // 결제 정보에 대한 객체입니다.
            method: "", // 결제 방법을 나타내는 문자열입니다.
            proof: "", // 결제 증빙을 나타내는 문자열입니다.
            to: "", // 수신자를 나타내는 문자열입니다.
          },
          refund: 0, // 환불 금액을 초기화합니다.
        },
      };
    }
    return dummy; // 생성된 서브 객체를 반환합니다.
  }
};

/**
 * @class Address
 * @description 주소 데이터를 관리하는 클래스입니다. 주어진 문자열을 기반으로 주소 정보를 초기화하고, 이를 변환하는 기능을 제공합니다.
 */
class Address {
  /**
   * @constructor
   * @param {string} rawString - 주소를 나타내는 원본 문자열입니다.
   * @description 생성자는 주소의 원본 문자열을 받아 내부 속성에 저장합니다.
   */
  constructor(rawString) {
    this.raw = rawString; // 원본 주소 문자열을 raw 속성에 저장합니다.
    this.value = rawString; // 원본 주소 문자열을 value 속성에 저장합니다. 이는 변환된 값을 저장하기 위해 사용됩니다.
  }

  /**
   * @method toNormal
   * @description Address 객체의 값을 일반 문자열 형태로 반환합니다.
   * @returns {string} 주소 문자열을 반환합니다.
   */
  toNormal() {
    return this.value; // 변환된 주소 값을 반환합니다. 이 경우 변환 작업 없이 그대로 반환됩니다.
  }
}

/**
 * @class DateParse
 * Date 클래스를 확장하여 날짜 처리 기능을 제공하는 클래스입니다.
 * 문자열 형식의 날짜를 Date 객체로 변환하거나, Date 객체를 다양한 형식으로 변환할 수 있습니다.
 */
class DateParse extends Date {

  /**
   * @constructor
   * 주어진 dateObject를 Date 객체로 변환하여 초기화합니다.
   * 문자열 형식의 날짜가 주어진 경우, 해당 문자열을 분석하여 Date 객체로 변환합니다.
   * @param {string|Date} dateObject - 변환할 날짜 문자열 또는 Date 객체
   * @throws {Error} 유효하지 않은 날짜 형식이 주어진 경우 예외를 발생시킵니다.
   */
  constructor(dateObject) {
    // 임시 배열 변수를 선언합니다.
    let tempArr0, tempArr1, tempArr2;

    // dateObject가 문자열인 경우
    if (typeof dateObject === "string") {
      // 날짜 문자열이 "YYYY-MM-DD HH:MM:SS" 형식인 경우
      if (dateObject.length === 19) {
        // 날짜와 시간을 분리하여 tempArr0에 저장합니다.
        tempArr0 = dateObject.split(" ");
        // 날짜 부분을 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = tempArr0[0].split("-");
        // 시간 부분을 ":"로 분리하여 tempArr2에 저장합니다.
        tempArr2 = tempArr0[1].split(":");
        // 분리된 연, 월, 일, 시, 분, 초 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2]), 
          Number(tempArr2[0]), 
          Number(tempArr2[1]), 
          Number(tempArr2[2])
        ));
      } 
      // 날짜 문자열이 "YYYY-MM-DD" 형식인 경우
      else if (dateObject.length === 10) {
        // 날짜를 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = dateObject.split("-");
        // 분리된 연, 월, 일 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2])
        ));
      } 
      // 유효하지 않은 날짜 형식인 경우
      else {
        // 예외를 발생시킵니다.
        throw new Error("invalid date object");
      }
    } 
    // dateObject가 문자열이 아닌 경우
    else {
      // dateObject를 ISO 문자열로 변환한 후 Date 객체로 초기화합니다.
      super(dateObject.toISOString());
    }
  }

  /**
   * @method zeroAddition
   * 숫자가 10보다 작은 경우 앞에 0을 추가하여 2자리 문자열로 반환합니다.
   * @param {number} number - 2자리로 변환할 숫자
   * @returns {string} 2자리 숫자 문자열
   */
  static zeroAddition(number) {
    // 숫자가 10보다 큰 경우 그대로 문자열로 반환합니다.
    if (number > 9) {
      return String(number);
    } 
    // 숫자가 10보다 작은 경우 앞에 0을 추가하여 문자열로 반환합니다.
    else {
      return '0' + String(number);
    }
  }

  /**
   * @method toString
   * Date 객체를 "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
   * @param {boolean} [detail=false] - 시간 정보까지 포함할지 여부
   * @returns {string} 변환된 날짜 문자열
   */
  toString(detail = false) {
    // 연도, 월, 일, 시, 분, 초 정보를 각각 추출합니다.
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();

    // detail이 true인 경우 "YYYY-MM-DD HH:MM:SS" 형식으로 변환합니다.
    if (detail) {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일, 시, 분, 초를 모두 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day) + " " + 
          DateParse.zeroAddition(hours) + ":" + 
          DateParse.zeroAddition(minutes) + ":" + 
          DateParse.zeroAddition(seconds)
        );
      }
    } 
    // detail이 false인 경우 "YYYY-MM-DD" 형식으로 변환합니다.
    else {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일만 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day)
        );
      }
    }
  }

  /**
   * @method toNormal
   * DateParse 객체를 일반 Date 객체로 변환합니다.
   * @returns {Date} 변환된 Date 객체
   */
  toNormal() {
    // 현재 객체의 ISO 문자열 표현을 사용하여 새로운 Date 객체를 반환합니다.
    return new Date(this.toISOString());
  }

  /**
   * @method toSixString
   * Date 객체를 "YYMMDD" 형식의 6자리 문자열로 변환합니다.
   * @returns {string} 변환된 6자리 날짜 문자열
   */
  toSixString() {
    // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환한 후, 앞 두 자리를 제외한 "YYMMDD" 형식으로 잘라서 반환합니다.
    let date = this.toString(false);
    return (date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10));
  }

}

/**
 * @class Menu
 * @extends String
 * @description 주어진 값들 중 하나 또는 여러 개를 선택하여 관리하는 클래스입니다. Enum과 유사한 역할을 하며, 단일 선택 또는 다중 선택 모드를 지원합니다.
 */
class Menu extends String {

  /**
   * @constructor
   * @param {string|string[]} value - 초기 값 또는 값들의 배열입니다.
   * @param {string[]} items - 선택 가능한 값들의 배열입니다.
   * @param {boolean} [multiple=false] - 다중 선택 모드 여부를 지정합니다. 기본값은 false입니다.
   * @description 주어진 값이 유효한지 검사하고, 유효하다면 해당 값을 설정합니다. 다중 선택 모드인 경우, 유효한 값들만 필터링하여 저장합니다.
   */
  constructor(value, items, multiple = false) {
    // value가 배열인 경우 빈 문자열로 초기화하고, 그렇지 않으면 해당 값을 상위 클래스(String)로 전달하여 초기화합니다.
    if (Array.isArray(value)) {
      super(''); // 다중 선택 모드에서 상위 클래스(String)를 빈 문자열로 초기화합니다.
    } else {
      super(value); // 단일 선택 모드에서 상위 클래스(String)를 주어진 값으로 초기화합니다.
    }

    this.value = null; // 단일 선택된 값을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.values = null; // 다중 선택된 값들을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.items = items; // 선택 가능한 값들의 목록을 items 속성에 저장합니다.

    let temp; // 임시 배열을 선언합니다. 다중 선택 모드에서 사용됩니다.

    // 단일 선택 모드인 경우
    if (!multiple) {
      // 주어진 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
      if (items.includes(value)) {
        this.value = value; // 포함되어 있다면 해당 값을 value 속성에 저장합니다.
      } else {
        this.value = "알 수 없음"; // 포함되어 있지 않다면 "알 수 없음"을 value 속성에 저장합니다.
      }
    }
    // 다중 선택 모드인 경우
    else {
      temp = []; // 임시 배열을 빈 배열로 초기화합니다.
      for (let i of value) { // 주어진 값 배열에서 각 값을 반복합니다.
        if (items.includes(i)) { // 각 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
          temp.push(i); // 포함되어 있다면 임시 배열에 추가합니다.
        }
      }
      this.values = temp; // 필터링된 값을 values 속성에 저장합니다.
    }
  }

  /**
   * @method toNormal
   * @description 현재 선택된 값을 반환합니다. 단일 선택 모드인 경우 단일 값을 반환하고, 다중 선택 모드인 경우 선택된 값들의 배열을 반환합니다.
   * @returns {string|string[]} 선택된 값 또는 값들의 배열을 반환합니다.
   */
  toNormal() {
    if (this.values === null) { // 다중 선택된 값이 없는 경우 (단일 선택 모드)
      return this.value; // 단일 값을 반환합니다.
    } else {
      return this.values; // 다중 선택된 값들의 배열을 반환합니다.
    }
  }
  
}

/**
 * Project 클래스는 JSON 데이터를 받아 프로젝트 정보를 관리하고 처리하는 객체입니다.
 * 이 클래스는 프로젝트의 ID, 고객 ID, 디자이너 ID, 서비스 정보, 제안서, 프로세스, 콘텐츠 등을 다룹니다.
 */
class Project {
  /**
   * Project 클래스의 생성자 함수입니다.
   * 주어진 JSON 데이터를 기반으로 Project 객체를 초기화합니다.
   * 
   * @param {Object} json - 프로젝트 데이터를 담고 있는 JSON 객체
   */
  constructor(json) {
    /** 
     * @property {string} proid - 프로젝트 ID를 나타냅니다. 
     */
    this.proid = json.proid;

    /** 
     * @property {string} cliid - 고객 ID를 나타냅니다. 
     */
    this.cliid = json.cliid;

    /** 
     * @property {string} desid - 디자이너 ID를 나타냅니다. 
     */
    this.desid = json.desid;

    /** 
     * @property {Object} service - 프로젝트 서비스 정보를 나타냅니다.
     * @description service는 Project 클래스의 private 클래스인 #ProjectService의 인스턴스로 초기화됩니다.
     */
    this.service = new this.#ProjectService(json.service);

    /** 
     * @property {Object} proposal - 프로젝트 제안서를 나타냅니다.
     * @description proposal은 Project 클래스의 private 클래스인 #ProjectProposal의 인스턴스로 초기화됩니다.
     */
    this.proposal = new this.#ProjectProposal(json.proposal);

    /** 
     * @property {Object} process - 프로젝트 진행 상태를 나타냅니다.
     * @description process는 Project 클래스의 private 클래스인 #ProjectProcess의 인스턴스로 초기화됩니다.
     */
    this.process = new this.#ProjectProcess(json.process);

    /** 
     * @property {Object} contents - 프로젝트의 콘텐츠 정보를 나타냅니다.
     * @description contents는 Project 클래스의 private 클래스인 #ProjectContents의 인스턴스로 초기화됩니다.
     */
    this.contents = new this.#ProjectContents(json.contents);
  }

  /**
   * 프로젝트 데이터를 일반적인 JavaScript 객체로 변환합니다.
   * @returns {Object} - 변환된 프로젝트 데이터 객체
   */
  toNormal() {
    return {
      proid: this.proid, // 프로젝트 ID를 반환합니다.
      cliid: this.cliid, // 고객 ID를 반환합니다.
      desid: this.desid, // 디자이너 ID를 반환합니다.
      service: this.service.toNormal(), // 서비스 정보를 일반 객체로 변환하여 반환합니다.
      proposal: this.proposal.toNormal(), // 제안서 정보를 일반 객체로 변환하여 반환합니다.
      process: this.process.toNormal(), // 프로세스 정보를 일반 객체로 변환하여 반환합니다.
      contents: this.contents.toNormal() // 콘텐츠 정보를 일반 객체로 변환하여 반환합니다.
    };
  }

  /**
   * #ProjectProposal 클래스는 프로젝트 제안서의 정보를 관리하는 클래스입니다.
   */
  #ProjectProposal = class {
    /**
     * #ProjectProposal 클래스의 생성자 함수입니다.
     * 주어진 JSON 데이터를 기반으로 제안서의 상태, 날짜, 상세 내용을 초기화합니다.
     * 
     * @param {Object} json - 제안서 데이터를 담고 있는 JSON 객체
     */
    constructor(json) {
      /**
       * @property {string} status - 제안서의 상태를 나타냅니다.
       */
      this.status = json.status;

      /**
       * @property {DateParse} date - 제안서의 날짜를 나타냅니다.
       * DateParse 클래스를 사용하여 날짜를 처리합니다.
       */
      this.date = new DateParse(json.date);

      /**
       * @property {Array} detail - 제안서의 상세 내용을 담은 배열입니다.
       * #Proposals 클래스의 인스턴스로 초기화되며, 제안서의 여러 상세 항목을 포함합니다.
       */
      this.detail = new this.#Proposals();
      
      // json.detail 배열을 순회하여 각 항목을 #Proposal 클래스의 인스턴스로 만들어 detail 배열에 추가합니다.
      for (let i of json.detail) {
        const tempInstance = new this.#Proposal(i);
        this.detail.push(tempInstance);
      }
    }

    /**
     * 제안서 데이터를 일반적인 JavaScript 객체로 변환합니다.
     * @returns {Object} - 변환된 제안서 데이터 객체
     */
    toNormal() {
      return {
        status: this.status, // 제안서의 상태를 반환합니다.
        date: this.date.toNormal(), // 제안서의 날짜를 일반 객체로 변환하여 반환합니다.
        detail: this.detail.toNormal(), // 제안서의 상세 내용을 일반 객체로 변환하여 반환합니다.
      };
    }

    /**
     * #Proposals 클래스는 여러 제안서 항목을 관리하는 배열 확장 클래스입니다.
     */
    #Proposals = class extends Array {
      /**
       * 배열에 담긴 제안서 항목들을 일반 객체로 변환합니다.
       * @returns {Array} - 변환된 제안서 항목들의 배열
       */
      toNormal() {
        let arr = [];
        // 배열의 각 항목을 순회하며 toNormal() 메서드를 호출해 변환된 객체를 배열에 추가합니다.
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr; // 변환된 객체들의 배열을 반환합니다.
      }
    }
    
    /**
     * #Proposal 클래스는 개별 제안서 항목의 세부 정보를 관리하는 클래스입니다.
     */
    #Proposal = class {
      /**
       * #Proposal 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 제안서의 디자이너 ID, 비용, 이미지 설정, 설명을 초기화합니다.
       * 
       * @param {Object} json - 개별 제안서 항목 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {string} desid - 제안서를 담당하는 디자이너의 ID입니다.
         */
        this.desid = json.desid;

        /**
         * @property {Array} fee - 제안서의 비용 정보를 관리하는 배열입니다.
         * #Fees 클래스의 인스턴스로 초기화됩니다.
         */
        this.fee = new this.#Fees();
        // json.fee 배열을 순회하여 각 항목을 #Fee 클래스의 인스턴스로 만들어 fee 배열에 추가합니다.
        for (let i of json.fee) {
          const tempInstance0 = new this.#Fee(i);
          this.fee.push(tempInstance0);
        }

        /**
         * @property {Array} pictureSettings - 제안서의 이미지 설정 정보를 관리하는 배열입니다.
         * #PictureSettings 클래스의 인스턴스로 초기화됩니다.
         */
        this.pictureSettings = new this.#PictureSettings();
        // json.pictureSettings 배열을 순회하여 각 항목을 #PictureSetting 클래스의 인스턴스로 만들어 pictureSettings 배열에 추가합니다.
        for (let i of json.pictureSettings) {
          const tempInstance1 = new this.#PictureSetting(i);
          this.pictureSettings.push(tempInstance1);
        }

        /**
         * @property {Array} description - 제안서의 설명을 관리하는 배열입니다.
         * #Description 클래스의 인스턴스로 초기화됩니다.
         */
        this.description = new this.#Description();
        // json.description 배열을 순회하여 각 설명을 description 배열에 추가합니다.
        for (let i of json.description) {
          this.description.push(i);
        }
      }

      /**
       * #Fees 클래스는 제안서 항목의 비용 정보를 관리하는 배열 확장 클래스입니다.
       */
      #Fees = class extends Array {
        /**
         * 배열에 담긴 비용 항목들을 일반 객체로 변환합니다.
         * @returns {Array} - 변환된 비용 항목들의 배열
         */
        toNormal() {
          let arr = [];
          // 배열의 각 항목을 순회하며 toNormal() 메서드를 호출해 변환된 객체를 배열에 추가합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr; // 변환된 객체들의 배열을 반환합니다.
        }

        /**
         * 배열에 담긴 모든 비용 항목을 제거합니다.
         */
        reset() {
          if (this.length > 0) {
            this.splice(0, this.length); // 배열의 모든 항목을 제거합니다.
          }
        }
      }
      
      /**
       * #Fee 클래스는 개별 제안서 항목의 비용 세부 정보를 관리하는 클래스입니다.
       */
      #Fee = class {
        /**
         * #Fee 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 비용의 방법, 부분 여부, 금액, 할인, 거리 정보를 초기화합니다.
         * 
         * @param {Object} json - 개별 비용 항목 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {string} method - 비용의 결제 방법을 나타냅니다.
           */
          this.method = json.method;

          /**
           * @property {boolean} partial - 부분 결제 여부를 나타냅니다.
           */
          this.partial = json.partial;

          /**
           * @property {number} amount - 결제 금액을 나타냅니다.
           */
          this.amount = json.amount;

          /**
           * @property {number} discount - 할인 금액을 나타냅니다.
           */
          this.discount = json.discount;

          /**
           * @property {Object} distance - 거리 정보를 관리하는 객체입니다.
           * #FeeDistance 클래스의 인스턴스로 초기화됩니다.
           */
          this.distance = new this.#FeeDistance(json.distance);
        }

        /**
         * 비용 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 비용 데이터 객체
         */
        toNormal() {
          return {
            method: this.method, // 결제 방법을 반환합니다.
            partial: this.partial, // 부분 결제 여부를 반환합니다.
            amount: this.amount, // 결제 금액을 반환합니다.
            discount: this.discount, // 할인 금액을 반환합니다.
            distance: this.distance.toNormal() // 거리 정보를 일반 객체로 변환하여 반환합니다.
          };
        }

        /**
         * #FeeDistance 클래스는 비용 항목의 거리 정보를 관리하는 클래스입니다.
         */
        #FeeDistance = class {
          /**
           * #FeeDistance 클래스의 생성자 함수입니다.
           * 주어진 JSON 데이터를 기반으로 거리 정보를 초기화합니다.
           * 
           * @param {Object} json - 거리 정보를 담고 있는 JSON 객체
           */
          constructor(json) {
            /**
             * @property {number} number - 거리의 숫자 값을 나타냅니다.
             */
            this.number = json.number;

            /**
             * @property {number} amount - 거리당 추가 금액을 나타냅니다.
             */
            this.amount = json.amount;

            /**
             * @property {string} distance - 거리의 문자열 표현을 나타냅니다.
             */
            this.distance = json.distance;

            /**
             * @property {string} time - 거리에 따른 예상 시간을 나타냅니다.
             */
            this.time = json.time;

            /**
             * @property {number} limit - 거리에 따른 제한을 나타냅니다.
             */
            this.limit = json.limit;
          }

          /**
           * 거리 데이터를 일반적인 JavaScript 객체로 변환합니다.
           * @returns {Object} - 변환된 거리 데이터 객체
           */
          toNormal() {
            return {
              number: this.number, // 거리 숫자 값을 반환합니다.
              amount: this.amount, // 거리당 추가 금액을 반환합니다.
              distance: this.distance, // 거리 문자열을 반환합니다.
              time: this.time, // 예상 시간을 반환합니다.
              limit: this.limit // 제한을 반환합니다.
            };
          }
        }
      }
      
      /**
       * #PictureSettings 클래스는 제안서 항목의 이미지 설정 정보를 관리하는 배열 확장 클래스입니다.
       */
      #PictureSettings = class extends Array {
        /**
         * 배열에 담긴 이미지 설정 항목들을 일반 객체로 변환합니다.
         * @returns {Array} - 변환된 이미지 설정 항목들의 배열
         */
        toNormal() {
          let arr = [];
          // 배열의 각 항목을 순회하며 toNormal() 메서드를 호출해 변환된 객체를 배열에 추가합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr; // 변환된 객체들의 배열을 반환합니다.
        }
      }
      
      /**
       * #PictureSetting 클래스는 개별 이미지 설정 항목의 세부 정보를 관리하는 클래스입니다.
       */
      #PictureSetting = class {
        /**
         * #PictureSetting 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 이미지 설정 정보를 초기화합니다.
         * 
         * @param {Object} json - 개별 이미지 설정 항목 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {string} position - 이미지의 위치 정보를 나타냅니다.
           */
          this.position = json.position;

          /**
           * @property {string} sgTrue - 이미지의 sgTrue 속성을 나타냅니다.
           */
          this.sgTrue = json.sgTrue;

          /**
           * @property {string} unionPo - 이미지의 unionPo 속성을 나타냅니다.
           */
          this.unionPo = json.unionPo;

          /**
           * @property {string} styleText - 이미지의 스타일 텍스트를 나타냅니다.
           */
          this.styleText = json.styleText;

          /**
           * @property {string} imgSrc - 이미지의 소스 URL을 나타냅니다.
           */
          this.imgSrc = json.imgSrc;
        }

        /**
         * 이미지 설정 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 이미지 설정 데이터 객체
         */
        toNormal() {
          return {
            position: this.position, // 이미지 위치 정보를 반환합니다.
            sgTrue: this.sgTrue, // 이미지의 sgTrue 속성을 반환합니다.
            unionPo: this.unionPo, // 이미지의 unionPo 속성을 반환합니다.
            styleText: this.styleText, // 이미지 스타일 텍스트를 반환합니다.
            imgSrc: this.imgSrc // 이미지 소스 URL을 반환합니다.
          };
        }
      }

      /**
       * #Description 클래스는 제안서 항목의 설명을 관리하는 배열 확장 클래스입니다.
       */
      #Description = class extends Array {
        /**
         * 배열에 담긴 설명 항목들을 일반 객체로 변환합니다.
         * @returns {Array} - 변환된 설명 항목들의 배열
         */
        toNormal() {
          let arr = [];
          // 배열의 각 항목을 순회하며 해당 항목을 변환된 배열에 추가합니다.
          for (let i of this) {
            arr.push(i);
          }
          return arr; // 변환된 설명 항목들의 배열을 반환합니다.
        }
      }

      /**
       * 제안서 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 제안서 데이터 객체
       */
      toNormal() {
        return {
          desid: this.desid, // 디자이너 ID를 반환합니다.
          fee: this.fee.toNormal(), // 비용 정보를 일반 객체로 변환하여 반환합니다.
          pictureSettings: this.pictureSettings.toNormal(), // 이미지 설정 정보를 일반 객체로 변환하여 반환합니다.
          description: this.description.toNormal(), // 설명 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * 현재 제안서의 비용 정보를 모두 초기화합니다.
       */
      resetFee() {
        this.fee.reset(); // 비용 정보를 초기화합니다.
      }

      /**
       * 새로운 비용 정보를 제안서에 추가합니다.
       * 
       * @param {string} method - 결제 방법 (online 또는 offline)
       * @param {number} amount - 결제 금액
       * @param {number} number - 거리 숫자 값 (기본값: 0)
       * @param {number} distanceAmount - 거리당 추가 금액 (기본값: 0)
       * @param {string} km - 거리의 문자열 표현 (기본값: "0km")
       * @param {string} time - 예상 시간 (기본값: "0시간 0분")
       * @throws {Error} - method가 문자열이 아니거나 amount가 숫자가 아닌 경우 에러를 던집니다.
       */
      appendFee(method, amount, number = 0, distanceAmount = 0, km = "0km", time = "0시간 0분") {
        if (typeof method !== "string" || typeof amount !== "number") {
          throw new Error("invalid input"); // 잘못된 입력값이 있는 경우 에러를 발생시킵니다.
        }
        const tempInstance = new this.#Fee({
          method: (/off/gi.test(method) ? "offline" : "online"), // method가 offline인지 online인지 체크하여 저장합니다.
          partial: false, // 기본적으로 partial 값은 false로 설정합니다.
          amount: amount, // 입력받은 amount 값을 설정합니다.
          discount: 0, // 기본적으로 discount 값은 0으로 설정합니다.
          distance: {
            number: number, // 입력받은 거리 숫자 값을 설정합니다.
            amount: distanceAmount, // 입력받은 거리당 추가 금액을 설정합니다.
            distance: km, // 입력받은 거리 문자열 표현을 설정합니다.
            time: time, // 입력받은 예상 시간을 설정합니다.
            limit: 5, // 기본적인 거리 제한을 5로 설정합니다.
          },
        });
        this.fee.push(tempInstance); // 새로 생성한 비용 정보를 fee 배열에 추가합니다.
      }
    }
  }
  
  /**
   * #ProjectContents 클래스는 프로젝트의 다양한 콘텐츠 관련 정보를 관리하는 클래스입니다.
   */
  #ProjectContents = class {
    /**
     * #ProjectContents 클래스의 생성자 함수입니다.
     * 주어진 JSON 데이터를 기반으로 콘텐츠 ID, 사진, 결제, 원본 자료, 공유, SNS 관련 정보를 초기화합니다.
     * 
     * @param {Object} json - 콘텐츠 데이터를 담고 있는 JSON 객체
     */
    constructor(json) {
      /**
       * @property {string} conid - 콘텐츠 ID를 나타냅니다.
       */
      this.conid = json.conid;

      /**
       * @property {Object} photo - 콘텐츠의 사진 관련 정보를 관리합니다.
       * #ContentsPhoto 클래스의 인스턴스로 초기화됩니다.
       */
      this.photo = new this.#ContentsPhoto(json.photo);

      /**
       * @property {Object} payment - 콘텐츠의 결제 관련 정보를 관리합니다.
       * #ContentsPayment 클래스의 인스턴스로 초기화됩니다.
       */
      this.payment = new this.#ContentsPayment(json.payment);

      /**
       * @property {Object} raw - 원본 자료 관련 정보를 관리합니다.
       * #ContentsRaw 클래스의 인스턴스로 초기화됩니다.
       */
      this.raw = new this.#ContentsRaw(json.raw);

      /**
       * @property {Object} share - 콘텐츠의 공유 관련 정보를 관리합니다.
       * #ContentsShare 클래스의 인스턴스로 초기화됩니다.
       */
      this.share = new this.#ContentsShare(json.share);

      /**
       * @property {Object} sns - 콘텐츠의 SNS 관련 정보를 관리합니다.
       * #ContentsSns 클래스의 인스턴스로 초기화됩니다.
       */
      this.sns = new this.#ContentsSns(json.sns);
    }

    /**
     * 콘텐츠 데이터를 일반적인 JavaScript 객체로 변환합니다.
     * @returns {Object} - 변환된 콘텐츠 데이터 객체
     */
    toNormal() {
      let obj = {};
      obj.conid = this.conid; // 콘텐츠 ID를 반환합니다.
      obj.photo = this.photo.toNormal(); // 사진 관련 정보를 일반 객체로 변환하여 반환합니다.
      obj.payment = this.payment.toNormal(); // 결제 관련 정보를 일반 객체로 변환하여 반환합니다.
      obj.raw = this.raw.toNormal(); // 원본 자료 관련 정보를 일반 객체로 변환하여 반환합니다.
      obj.share = this.share.toNormal(); // 공유 관련 정보를 일반 객체로 변환하여 반환합니다.
      obj.sns = this.sns.toNormal(); // SNS 관련 정보를 일반 객체로 변환하여 반환합니다.
      return obj;
    }

    /**
     * #ContentsPayment 클래스는 콘텐츠의 결제 정보를 관리하는 클래스입니다.
     */
    #ContentsPayment = class {
      /**
       * #ContentsPayment 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 결제 상태, 날짜, 취소 정보, 계산 정보를 초기화합니다.
       * 
       * @param {Object} json - 결제 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {Menu} status - 결제 상태를 나타내는 Menu 객체입니다.
         * 상태는 '결제 대기', '결제 완료', '무료 촬영', '환불 완료', '해당 없음' 중 하나입니다.
         */
        this.status = new Menu(json.status, [
          '결제 대기',
          '결제 완료',
          '무료 촬영',
          '환불 완료',
          '해당 없음'
        ], false);

        /**
         * @property {DateParse} date - 결제 날짜를 나타내는 DateParse 객체입니다.
         */
        this.date = new DateParse(json.date);

        /**
         * @property {DateParse} cancel - 결제 취소 날짜를 나타내는 DateParse 객체입니다.
         */
        this.cancel = new DateParse(json.cancel);

        /**
         * @property {Object} calculation - 결제 계산 정보를 관리하는 객체입니다.
         * #ContentsPaymentCalculation 클래스의 인스턴스로 초기화됩니다.
         */
        this.calculation = new this.#ContentsPaymentCalculation(json.calculation);
      }

      /**
       * 결제 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 결제 데이터 객체
       */
      toNormal() {
        return {
          status: this.status.toNormal(), // 결제 상태를 일반 객체로 변환하여 반환합니다.
          date: this.date.toNormal(), // 결제 날짜를 일반 객체로 변환하여 반환합니다.
          cancel: this.cancel.toNormal(), // 결제 취소 날짜를 일반 객체로 변환하여 반환합니다.
          calculation: this.calculation.toNormal() // 계산 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * #ContentsPaymentCalculation 클래스는 결제 계산 정보를 관리하는 클래스입니다.
       */
      #ContentsPaymentCalculation = class {
        /**
         * #ContentsPaymentCalculation 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 계산 금액, 계산 정보, 환불 정보를 초기화합니다.
         * 
         * @param {Object} json - 계산 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {number} amount - 결제 금액을 나타냅니다.
           */
          this.amount = json.amount;

          /**
           * @property {Object} info - 결제 계산 정보를 관리하는 객체입니다.
           * #ContentsPaymentCalculationInfo 클래스의 인스턴스로 초기화됩니다.
           */
          this.info = new this.#ContentsPaymentCalculationInfo(json.info);

          /**
           * @property {number} refund - 환불 금액을 나타냅니다.
           */
          this.refund = json.refund;
        }

        /**
         * 계산 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 계산 데이터 객체
         */
        toNormal() {
          return {
            amount: this.amount, // 결제 금액을 반환합니다.
            info: this.info.toNormal(), // 결제 계산 정보를 일반 객체로 변환하여 반환합니다.
            refund: this.refund // 환불 금액을 반환합니다.
          };
        }

        /**
         * #ContentsPaymentCalculationInfo 클래스는 결제 계산의 세부 정보를 관리하는 클래스입니다.
         */
        #ContentsPaymentCalculationInfo = class {
          /**
           * #ContentsPaymentCalculationInfo 클래스의 생성자 함수입니다.
           * 주어진 JSON 데이터를 기반으로 결제 방법, 증빙, 수취인 정보를 초기화합니다.
           * 
           * @param {Object} json - 계산 세부 정보를 담고 있는 JSON 객체
           */
          constructor(json) {
            /**
             * @property {string} method - 결제 방법을 나타냅니다.
             */
            this.method = json.method;

            /**
             * @property {string} proof - 결제 증빙 정보를 나타냅니다.
             */
            this.proof = json.proof;

            /**
             * @property {string} to - 결제 수취인을 나타냅니다.
             */
            this.to = json.to;
          }

          /**
           * 계산 세부 정보를 일반적인 JavaScript 객체로 변환합니다.
           * @returns {Object} - 변환된 계산 세부 정보 객체
           */
          toNormal() {
            return {
              method: this.method, // 결제 방법을 반환합니다.
              proof: this.proof, // 결제 증빙 정보를 반환합니다.
              to: this.to // 결제 수취인을 반환합니다.
            };
          }
        }
      }
    }

    /**
     * #ContentsSns 클래스는 콘텐츠의 SNS 관련 정보를 관리하는 클래스입니다.
     */
    #ContentsSns = class {
      /**
       * #ContentsSns 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 포트폴리오와 인터뷰 관련 SNS 정보를 초기화합니다.
       * 
       * @param {Object} json - SNS 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {Object} portfolio - 포트폴리오 관련 SNS 정보를 관리합니다.
         * #ContentsSnsPortfolio 클래스의 인스턴스로 초기화됩니다.
         */
        this.portfolio = new this.#ContentsSnsPortfolio(json.portfolio);

        /**
         * @property {Object} interview - 인터뷰 관련 SNS 정보를 관리합니다.
         * #ContentsSnsInterview 클래스의 인스턴스로 초기화됩니다.
         */
        this.interview = new this.#ContentsSnsInterview(json.interview);
      }

      /**
       * SNS 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 SNS 데이터 객체
       */
      toNormal() {
        return {
          portfolio: this.portfolio.toNormal(), // 포트폴리오 정보를 일반 객체로 변환하여 반환합니다.
          interview: this.interview.toNormal() // 인터뷰 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * #ContentsSnsInterview 클래스는 인터뷰 관련 SNS 정보를 관리하는 클래스입니다.
       */
      #ContentsSnsInterview = class {
        /**
         * #ContentsSnsInterview 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 인터뷰의 장기 및 단기 SNS 노출 정보를 초기화합니다.
         * 
         * @param {Object} json - 인터뷰 SNS 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {DateParse} long - 장기 SNS 노출 날짜를 나타내는 DateParse 객체입니다.
           */
          this.long = new DateParse(json.long);

          /**
           * @property {DateParse} short - 단기 SNS 노출 날짜를 나타내는 DateParse 객체입니다.
           */
          this.short = new DateParse(json.short);
        }

        /**
         * 인터뷰 SNS 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 인터뷰 SNS 데이터 객체
         */
        toNormal() {
          return {
            long: this.long.toNormal(), // 장기 SNS 노출 날짜를 반환합니다.
            short: this.short.toNormal() // 단기 SNS 노출 날짜를 반환합니다.
          };
        }
      }

      /**
       * #ContentsSnsPortfolio 클래스는 포트폴리오 관련 SNS 정보를 관리하는 클래스입니다.
       */
      #ContentsSnsPortfolio = class {
        /**
         * #ContentsSnsPortfolio 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 포트폴리오의 장기 및 단기 SNS 노출 정보를 초기화합니다.
         * 
         * @param {Object} json - 포트폴리오 SNS 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {DateParse} long - 장기 SNS 노출 날짜를 나타내는 DateParse 객체입니다.
           */
          this.long = new DateParse(json.long);

          /**
           * @property {DateParse} short - 단기 SNS 노출 날짜를 나타내는 DateParse 객체입니다.
           */
          this.short = new DateParse(json.short);
        }

        /**
         * 포트폴리오 SNS 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 포트폴리오 SNS 데이터 객체
         */
        toNormal() {
          return {
            long: this.long.toNormal(), // 장기 SNS 노출 날짜를 반환합니다.
            short: this.short.toNormal() // 단기 SNS 노출 날짜를 반환합니다.
          };
        }
      }
    }

    /**
     * #ContentsPhoto 클래스는 콘텐츠의 사진 관련 정보를 관리하는 클래스입니다.
     */
    #ContentsPhoto = class {
      /**
       * #ContentsPhoto 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 사진의 관련 정보들을 초기화합니다.
       * 
       * @param {Object} json - 사진 관련 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {boolean} boo - 사진의 부울(불리언) 값을 나타냅니다.
         */
        this.boo = json.boo;

        /**
         * @property {Menu} status - 사진 상태를 나타내는 Menu 객체입니다.
         * 상태는 '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' 중 하나입니다.
         */
        this.status = new Menu(json.status, [
          '세팅 대기',
          '촬영 컨택 요망',
          '촬영 컨택중',
          '촬영 일정 확정',
          '촬영 완료',
          '촬영 홀딩',
          '해당 없음'
        ], false);

        /**
         * @property {DateParse} date - 촬영 날짜를 나타내는 DateParse 객체입니다.
         */
        this.date = new DateParse(json.date);

        /**
         * @property {Object} info - 촬영 정보 객체입니다.
         * #ContentsPhotoInfo 클래스의 인스턴스로 초기화됩니다.
         */
        this.info = new this.#ContentsPhotoInfo(json.info);
      }

      /**
       * 사진 관련 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 사진 관련 데이터 객체
       */
      toNormal() {
        return {
          boo: this.boo, // 사진의 부울 값을 반환합니다.
          status: this.status.toNormal(), // 사진 상태를 일반 객체로 변환하여 반환합니다.
          date: this.date.toNormal(), // 촬영 날짜를 일반 객체로 변환하여 반환합니다.
          info: this.info.toNormal() // 촬영 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * #ContentsPhotoInfo 클래스는 촬영에 대한 세부 정보를 관리하는 클래스입니다.
       */
      #ContentsPhotoInfo = class {
        /**
         * #ContentsPhotoInfo 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 사진작가와 인터뷰어 정보를 초기화합니다.
         * 
         * @param {Object} json - 촬영 세부 정보를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {string} photographer - 사진작가의 이름을 나타냅니다.
           */
          this.photographer = json.photographer;

          /**
           * @property {string} interviewer - 인터뷰어의 이름을 나타냅니다.
           */
          this.interviewer = json.interviewer;
        }

        /**
         * 촬영 세부 정보를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 촬영 세부 정보 객체
         */
        toNormal() {
          return {
            photographer: this.photographer, // 사진작가의 이름을 반환합니다.
            interviewer: this.interviewer // 인터뷰어의 이름을 반환합니다.
          };
        }
      }
    }

    /**
     * #ContentsShare 클래스는 콘텐츠의 공유 정보를 관리하는 클래스입니다.
     */
    #ContentsShare = class {
      /**
       * #ContentsShare 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 고객 및 디자이너에게 공유된 콘텐츠 정보를 초기화합니다.
       * 
       * @param {Object} json - 공유 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {Object} client - 고객에게 공유된 콘텐츠 정보를 관리합니다.
         * #ContentsShareClient 클래스의 인스턴스로 초기화됩니다.
         */
        this.client = new this.#ContentsShareClient(json.client);

        /**
         * @property {Object} designer - 디자이너에게 공유된 콘텐츠 정보를 관리합니다.
         * #ContentsShareDesigner 클래스의 인스턴스로 초기화됩니다.
         */
        this.designer = new this.#ContentsShareDesigner(json.designer);
      }

      /**
       * 공유 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 공유 데이터 객체
       */
      toNormal() {
        return {
          client: this.client.toNormal(), // 고객에게 공유된 정보를 일반 객체로 변환하여 반환합니다.
          designer: this.designer.toNormal() // 디자이너에게 공유된 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * #ContentsShareDesigner 클래스는 디자이너에게 공유된 콘텐츠 정보를 관리하는 클래스입니다.
       */
      #ContentsShareDesigner = class {
        /**
         * #ContentsShareDesigner 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 디자이너에게 공유된 사진과 콘텐츠 정보를 초기화합니다.
         * 
         * @param {Object} json - 디자이너에게 공유된 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {DateParse} photo - 디자이너에게 공유된 사진의 공유 날짜를 나타내는 DateParse 객체입니다.
           */
          this.photo = new DateParse(json.photo);

          /**
           * @property {DateParse} contents - 디자이너에게 공유된 콘텐츠의 공유 날짜를 나타내는 DateParse 객체입니다.
           */
          this.contents = new DateParse(json.contents);
        }

        /**
         * 디자이너에게 공유된 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 디자이너 공유 데이터 객체
         */
        toNormal() {
          return {
            photo: this.photo.toNormal(), // 사진의 공유 날짜를 반환합니다.
            contents: this.contents.toNormal() // 콘텐츠의 공유 날짜를 반환합니다.
          };
        }
      }

      /**
       * #ContentsShareClient 클래스는 고객에게 공유된 콘텐츠 정보를 관리하는 클래스입니다.
       */
      #ContentsShareClient = class {
        /**
         * #ContentsShareClient 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 고객에게 공유된 사진과 콘텐츠 정보를 초기화합니다.
         * 
         * @param {Object} json - 고객에게 공유된 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {DateParse} photo - 고객에게 공유된 사진의 공유 날짜를 나타내는 DateParse 객체입니다.
           */
          this.photo = new DateParse(json.photo);

          /**
           * @property {DateParse} contents - 고객에게 공유된 콘텐츠의 공유 날짜를 나타내는 DateParse 객체입니다.
           */
          this.contents = new DateParse(json.contents);
        }

        /**
         * 고객에게 공유된 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 고객 공유 데이터 객체
         */
        toNormal() {
          return {
            photo: this.photo.toNormal(), // 사진의 공유 날짜를 반환합니다.
            contents: this.contents.toNormal() // 콘텐츠의 공유 날짜를 반환합니다.
          };
        }
      }
    }

    /**
     * #ContentsRaw 클래스는 콘텐츠의 원본 자료 관련 정보를 관리하는 클래스입니다.
     */
    #ContentsRaw = class {
      /**
       * #ContentsRaw 클래스의 생성자 함수입니다.
       * 주어진 JSON 데이터를 기반으로 원본 포트폴리오, 인터뷰, 사진 정보를 초기화합니다.
       * 
       * @param {Object} json - 원본 자료 데이터를 담고 있는 JSON 객체
       */
      constructor(json) {
        /**
         * @property {Object} portfolio - 원본 포트폴리오 자료를 관리합니다.
         * #ContentsRawPortfolio 클래스의 인스턴스로 초기화됩니다.
         */
        this.portfolio = new this.#ContentsRawPortfolio(json.portfolio);

        /**
         * @property {Object} interview - 원본 인터뷰 자료를 관리합니다.
         * #ContentsRawInterview 클래스의 인스턴스로 초기화됩니다.
         */
        this.interview = new this.#ContentsRawInterview(json.interview);

        /**
         * @property {Object} photo - 원본 사진 자료를 관리합니다.
         * #ContentsRawPhoto 클래스의 인스턴스로 초기화됩니다.
         */
        this.photo = new this.#ContentsRawPhoto(json.photo);
      }

      /**
       * 원본 자료 데이터를 일반적인 JavaScript 객체로 변환합니다.
       * @returns {Object} - 변환된 원본 자료 데이터 객체
       */
      toNormal() {
        return {
          portfolio: this.portfolio.toNormal(), // 원본 포트폴리오 정보를 일반 객체로 변환하여 반환합니다.
          interview: this.interview.toNormal(), // 원본 인터뷰 정보를 일반 객체로 변환하여 반환합니다.
          photo: this.photo.toNormal() // 원본 사진 정보를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * #ContentsRawPhoto 클래스는 원본 사진 자료 관련 정보를 관리하는 클래스입니다.
       */
      #ContentsRawPhoto = class {
        /**
         * #ContentsRawPhoto 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 원본 사진의 상태와 링크 정보를 초기화합니다.
         * 
         * @param {Object} json - 원본 사진 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {Menu} status - 원본 사진의 상태를 나타내는 Menu 객체입니다.
           * 상태는 '촬영 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 보정중', '원본 보정 완료', '해당 없음' 중 하나입니다.
           */
          this.status = new Menu(json.status, [
            '촬영 대기',
            '원본 요청 요망',
            '원본 요청 완료',
            '원본 수집 완료',
            '원본 보정중',
            '원본 보정 완료',
            '해당 없음'
          ], false);

          /**
           * @property {string} link - 원본 사진의 링크를 나타냅니다.
           */
          this.link = json.link;
        }

        /**
         * 원본 사진 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 원본 사진 데이터 객체
         */
        toNormal() {
          return {
            status: this.status.toNormal(), // 원본 사진 상태를 일반 객체로 변환하여 반환합니다.
            link: this.link // 원본 사진 링크를 반환합니다.
          };
        }
      }

      /**
       * #ContentsRawInterview 클래스는 원본 인터뷰 자료 관련 정보를 관리하는 클래스입니다.
       */
      #ContentsRawInterview = class {
        /**
         * #ContentsRawInterview 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 원본 인터뷰의 상태와 링크 정보를 초기화합니다.
         * 
         * @param {Object} json - 원본 인터뷰 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {Menu} status - 원본 인터뷰의 상태를 나타내는 Menu 객체입니다.
           * 상태는 '세팅 대기', '인터뷰 요망', '인터뷰 완료', '원본 편집중', '원본 편집 완료', '해당 없음' 중 하나입니다.
           */
          this.status = new Menu(json.status, [
            '세팅 대기',
            '인터뷰 요망',
            '인터뷰 완료',
            '원본 편집중',
            '원본 편집 완료',
            '해당 없음'
          ], false);

          /**
           * @property {string} link - 원본 인터뷰의 링크를 나타냅니다.
           */
          this.link = json.link;
        }

        /**
         * 원본 인터뷰 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 원본 인터뷰 데이터 객체
         */
        toNormal() {
          return {
            status: this.status.toNormal(), // 원본 인터뷰 상태를 일반 객체로 변환하여 반환합니다.
            link: this.link // 원본 인터뷰 링크를 반환합니다.
          };
        }
      }

      /**
       * #ContentsRawPortfolio 클래스는 원본 포트폴리오 자료 관련 정보를 관리하는 클래스입니다.
       */
      #ContentsRawPortfolio = class {
        /**
         * #ContentsRawPortfolio 클래스의 생성자 함수입니다.
         * 주어진 JSON 데이터를 기반으로 원본 포트폴리오의 상태와 링크 정보를 초기화합니다.
         * 
         * @param {Object} json - 원본 포트폴리오 데이터를 담고 있는 JSON 객체
         */
        constructor(json) {
          /**
           * @property {Menu} status - 원본 포트폴리오의 상태를 나타내는 Menu 객체입니다.
           * 상태는 '세팅 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 편집중', '원본 편집 완료', '해당 없음' 중 하나입니다.
           */
          this.status = new Menu(json.status, [
            '세팅 대기',
            '원본 요청 요망',
            '원본 요청 완료',
            '원본 수집 완료',
            '원본 편집중',
            '원본 편집 완료',
            '해당 없음'
          ], false);

          /**
           * @property {string} link - 원본 포트폴리오의 링크를 나타냅니다.
           */
          this.link = json.link;
        }

        /**
         * 원본 포트폴리오 데이터를 일반적인 JavaScript 객체로 변환합니다.
         * @returns {Object} - 변환된 원본 포트폴리오 데이터 객체
         */
        toNormal() {
          return {
            status: this.status.toNormal(), // 원본 포트폴리오 상태를 일반 객체로 변환하여 반환합니다.
            link: this.link // 원본 포트폴리오 링크를 반환합니다.
          };
        }
      }
    }
  }
  
  /**
   * #ProjectService 클래스는 프로젝트의 서비스 정보를 관리하는 클래스입니다.
   * 이 클래스는 JSON 데이터를 기반으로 서비스를 초기화하고,
   * 데이터를 일반적인 JavaScript 객체로 변환하는 메서드를 제공합니다.
   */
  #ProjectService = class {
    
    /**
     * #ProjectService 클래스의 생성자 함수입니다.
     * 주어진 JSON 데이터를 기반으로 서비스 ID, xValue, 온라인 여부를 초기화합니다.
     * 
     * @param {Object} json - 서비스 데이터를 담고 있는 JSON 객체
     */
    constructor(json) {
      /**
       * @property {string} serid - 서비스 ID를 나타냅니다.
       * 홈리에종에서 제공하는 특정 서비스의 고유 식별자입니다.
       */
      this.serid = json.serid;

      /**
       * @property {string} xValue - 서비스와 관련된 추가 값을 나타냅니다.
       * 이 값은 서비스의 세부적인 설정이나 속성을 나타낼 수 있습니다.
       */
      this.xValue = json.xValue;

      /**
       * @property {boolean} online - 서비스가 온라인으로 제공되는지 여부를 나타내는 불리언 값입니다.
       * 주어진 데이터에서 `online` 값이 true로 변환되는 경우, 서비스는 온라인으로 제공됩니다.
       */
      this.online = Boolean(json.online);
    }

    /**
     * 서비스 데이터를 일반적인 JavaScript 객체로 변환합니다.
     * @returns {Object} - 변환된 서비스 데이터 객체
     */
    toNormal() {
      return {
        serid: this.serid, // 서비스 ID를 반환합니다.
        xValue: this.xValue, // 서비스와 관련된 추가 값을 반환합니다.
        online: this.online // 서비스의 온라인 여부를 반환합니다.
      };
    }
  }
  
  /**
   * ProjectProcess 클래스는 프로젝트의 프로세스를 관리합니다.
   */
  #ProjectProcess = class {
    /**
     * 주어진 JSON 데이터를 기반으로 ProjectProcess 인스턴스를 초기화합니다.
     * @param {Object} json - ProjectProcess 데이터를 포함한 JSON 객체
     */
    constructor(json) {
      // status는 프로젝트의 현재 상태를 나타내며, Menu 클래스를 사용하여 초기화됩니다.
      this.status = new Menu(json.status, [
        "대기",  // 대기 상태
        "진행중",  // 진행 중 상태
        "완료",  // 완료 상태
        "홀딩",  // 일시 중지 상태
        "드랍"  // 중단 상태
      ], false);

      // action은 프로젝트의 현재 진행 단계를 나타내며, Menu 클래스를 사용하여 초기화됩니다.
      this.action = new Menu(json.action, [
        "계약금 안내",  // 계약금 안내 단계
        "현장미팅 조율",  // 현장미팅 조율 단계
        "현장미팅 확정",  // 현장미팅 확정 단계
        "의뢰서 공유",  // 의뢰서 공유 단계
        "현장미팅 피드백",  // 현장미팅 피드백 단계
        "잔금 안내",  // 잔금 안내 단계
        "시작 대기",  // 시작 대기 단계
        "1차 제안",  // 1차 제안 단계
        "수정 제안",  // 수정 제안 단계
        "시공 진행",  // 시공 진행 단계
        "제품 구매",  // 제품 구매 단계
        "추가 제안",  // 추가 제안 단계
        "배송중",  // 배송 중 단계
        "세팅 마무리",  // 세팅 마무리 단계
        "촬영 컨택",  // 촬영 컨택 단계
        "사진 업로드",  // 사진 업로드 단계
        "디자이너글 업로드",  // 디자이너 글 업로드 단계
        "증빙 처리",  // 증빙 처리 단계
        "정산 대기",  // 정산 대기 단계
        "프로젝트 완료",  // 프로젝트 완료 단계
        "해당 없음"  // 해당 없음 단계
      ], false);

      // outreason은 프로젝트 종료 사유를 나타내며, Menu 클래스를 사용하여 초기화됩니다.
      this.outreason = new Menu(json.outreason, [
        "연결 안 됨",  // 연락 불가
        "가벼운 문의",  // 가벼운 문의로 인한 종료
        "타사 계약",  // 다른 회사와의 계약으로 인한 종료
        "비용 문제",  // 비용 문제로 인한 종료
        "의견 조정 안 됨",  // 의견 조정 실패로 인한 종료
        "직접 진행",  // 클라이언트가 직접 진행하기로 결정
      ], true);

      // detail은 프로젝트 진행 세부 사항을 나타내며, ProcessDetails 클래스를 사용하여 초기화됩니다.
      this.detail = new this.#ProcessDetails(json.detail);

      // call은 프로젝트 진행 중 통화 관련 정보를 나타내며, ProcessCall 클래스를 사용하여 초기화됩니다.
      this.call = new this.#ProcessCall(json.call);

      // contract는 계약 관련 정보를 나타내며, Contract 클래스를 사용하여 초기화됩니다.
      this.contract = new this.#Contract(json.contract);

      // design은 디자인 관련 정보를 나타내며, Design 클래스를 사용하여 초기화됩니다.
      this.design = new this.#Design(json.design);

      // calculation은 정산 관련 정보를 나타내며, Calculation 클래스를 사용하여 초기화됩니다.
      this.calculation = new this.#Calculation(json.calculation);
    }
  
    /**
     * ProjectProcess 인스턴스를 일반 객체로 변환합니다.
     * @returns {Object} 일반 객체로 변환된 ProjectProcess 인스턴스
     */
    toNormal() {
      return {
        status: this.status.toNormal(),  // 상태 변환
        action: this.action.toNormal(),  // 액션 변환
        outreason: this.outreason.toNormal(),  // 종료 사유 변환
        detail: this.detail.toNormal(),  // 세부 사항 변환
        call: this.call.toNormal(),  // 통화 정보 변환
        contract: this.contract.toNormal(),  // 계약 정보 변환
        design: this.design.toNormal(),  // 디자인 정보 변환
        calculation: this.calculation.toNormal(),  // 정산 정보 변환
      };
    }
  
    /**
     * Contract 클래스는 프로젝트 계약 관련 정보를 관리합니다.
     */
    #Contract = class {
      /**
       * 주어진 JSON 데이터를 기반으로 Contract 인스턴스를 초기화합니다.
       * @param {Object} json - Contract 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        // 첫 번째 계약 정보는 First 클래스를 사용하여 초기화됩니다.
        this.first = new this.#First(json.first);

        // 잔여 계약 정보는 Remain 클래스를 사용하여 초기화됩니다.
        this.remain = new this.#Remain(json.remain);

        // 계약 양식 정보는 Form 클래스를 사용하여 초기화됩니다.
        this.form = new this.#Form(json.form);

        // 미팅 정보는 Meeting 클래스를 사용하여 초기화됩니다.
        this.meeting = new this.#Meeting(json.meeting);
      }
    
      /**
       * Contract 인스턴스를 일반 객체로 변환합니다.
       * @returns {Object} 일반 객체로 변환된 Contract 인스턴스
       */
      toNormal() {
        return {
          first: this.first.toNormal(),  // 첫 번째 계약 정보 변환
          remain: this.remain.toNormal(),  // 잔여 계약 정보 변환
          form: this.form.toNormal(),  // 계약 양식 정보 변환
          meeting: this.meeting.toNormal(),  // 미팅 정보 변환
        };
      }
    
      /**
       * First 클래스는 첫 번째 계약 관련 정보를 관리합니다.
       */
      #First = class {
        /**
         * 주어진 JSON 데이터를 기반으로 First 인스턴스를 초기화합니다.
         * @param {Object} json - 첫 번째 계약 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.guide = new DateParse(json.guide);  // 계약 안내 날짜
          this.date = new DateParse(json.date);  // 계약 날짜
          this.cancel = new DateParse(json.cancel);  // 계약 취소 날짜
          this.calculation = new this.#FirstCalculation(json.calculation);  // 계약 금액 계산 정보
        }
      
        /**
         * First 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 First 인스턴스
         */
        toNormal() {
          return {
            guide: this.guide.toNormal(),  // 계약 안내 날짜 변환
            date: this.date.toNormal(),  // 계약 날짜 변환
            cancel: this.cancel.toNormal(),  // 계약 취소 날짜 변환
            calculation: this.calculation.toNormal(),  // 계약 금액 계산 정보 변환
          };
        }
      
        /**
         * FirstCalculation 클래스는 첫 번째 계약 금액 계산 관련 정보를 관리합니다.
         */
        #FirstCalculation = class {
          /**
           * 주어진 JSON 데이터를 기반으로 FirstCalculation 인스턴스를 초기화합니다.
           * @param {Object} json - 첫 번째 계약 금액 계산 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.amount = json.amount;  // 계약 금액
            this.info = new this.#FirstCalculationInfo(json.info);  // 금액 관련 추가 정보
            this.refund = json.refund;  // 환불 금액
          }
        
          /**
           * FirstCalculation 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 FirstCalculation 인스턴스
           */
          toNormal() {
            return {
              amount: this.amount,  // 계약 금액 변환
              info: this.info.toNormal(),  // 금액 관련 추가 정보 변환
              refund: this.refund,  // 환불 금액 변환
            };
          }
        
          /**
           * FirstCalculationInfo 클래스는 계약 금액 관련 추가 정보를 관리합니다.
           */
          #FirstCalculationInfo = class {
            /**
             * 주어진 JSON 데이터를 기반으로 FirstCalculationInfo 인스턴스를 초기화합니다.
             * @param {Object} json - 계약 금액 관련 추가 정보를 포함한 JSON 객체
             */
            constructor(json) {
              this.method = json.method;  // 결제 방법
              this.proof = json.proof;  // 증빙 자료
              this.to = json.to;  // 금액 수령자
            }
          
            /**
             * FirstCalculationInfo 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 FirstCalculationInfo 인스턴스
             */
            toNormal() {
              return {
                method: this.method,  // 결제 방법 변환
                proof: this.proof,  // 증빙 자료 변환
                to: this.to,  // 금액 수령자 변환
              };
            }
          }
        }
      }
      
      /**
       * Remain 클래스는 잔여 계약 관련 정보를 관리합니다.
       */
      #Remain = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Remain 인스턴스를 초기화합니다.
         * @param {Object} json - 잔여 계약 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.guide = new DateParse(json.guide);  // 잔여 계약 안내 날짜
          this.date = new DateParse(json.date);  // 잔여 계약 날짜
          this.cancel = new DateParse(json.cancel);  // 잔여 계약 취소 날짜
          this.calculation = new this.#RemainCalculation(json.calculation);  // 잔여 계약 금액 계산 정보
        }
      
        /**
         * Remain 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Remain 인스턴스
         */
        toNormal() {
          return {
            guide: this.guide.toNormal(),  // 잔여 계약 안내 날짜 변환
            date: this.date.toNormal(),  // 잔여 계약 날짜 변환
            cancel: this.cancel.toNormal(),  // 잔여 계약 취소 날짜 변환
            calculation: this.calculation.toNormal(),  // 잔여 계약 금액 계산 정보 변환
          };
        }
      
        /**
         * RemainCalculation 클래스는 잔여 계약 금액 계산 관련 정보를 관리합니다.
         */
        #RemainCalculation = class {
          /**
           * 주어진 JSON 데이터를 기반으로 RemainCalculation 인스턴스를 초기화합니다.
           * @param {Object} json - 잔여 계약 금액 계산 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.amount = new this.#RemainCalculationAmount(json.amount);  // 잔여 계약 금액
            this.info = new this.#RemainCalculationInfo(json.info);  // 금액 관련 추가 정보
            this.refund = json.refund;  // 환불 금액
            this.discount = json.discount;  // 할인 금액
          }
        
          /**
           * RemainCalculation 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 RemainCalculation 인스턴스
           */
          toNormal() {
            return {
              amount: this.amount.toNormal(),  // 잔여 계약 금액 변환
              info: this.info.toNormal(),  // 금액 관련 추가 정보 변환
              refund: this.refund,  // 환불 금액 변환
              discount: this.discount,  // 할인 금액 변환
            };
          }
        
          /**
           * RemainCalculationAmount 클래스는 잔여 계약 금액 정보를 관리합니다.
           */
          #RemainCalculationAmount = class {
            /**
             * 주어진 JSON 데이터를 기반으로 RemainCalculationAmount 인스턴스를 초기화합니다.
             * @param {Object} json - 잔여 계약 금액 데이터를 포함한 JSON 객체
             */
            constructor(json) {
              this.supply = json.supply;  // 공급 금액
              this.vat = json.vat;  // 부가가치세
              this.consumer = json.consumer;  // 소비자 부담금
            }
          
            /**
             * RemainCalculationAmount 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 RemainCalculationAmount 인스턴스
             */
            toNormal() {
              return {
                supply: this.supply,  // 공급 금액 변환
                vat: this.vat,  // 부가가치세 변환
                consumer: this.consumer,  // 소비자 부담금 변환
              };
            }
          }
          
          /**
           * RemainCalculationInfo 클래스는 잔여 계약 금액 관련 추가 정보를 관리합니다.
           */
          #RemainCalculationInfo = class {
            /**
             * 주어진 JSON 데이터를 기반으로 RemainCalculationInfo 인스턴스를 초기화합니다.
             * @param {Object} json - 잔여 계약 금액 관련 추가 정보를 포함한 JSON 객체
             */
            constructor(json) {
              this.method = json.method;  // 결제 방법
              this.proof = json.proof;  // 증빙 자료
              this.to = json.to;  // 금액 수령자
            }
          
            /**
             * RemainCalculationInfo 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 RemainCalculationInfo 인스턴스
             */
            toNormal() {
              return {
                method: this.method,  // 결제 방법 변환
                proof: this.proof,  // 증빙 자료 변환
                to: this.to,  // 금액 수령자 변환
              };
            }
          }
        }
      }
      
      /**
       * Form 클래스는 계약 양식 정보를 관리합니다.
       */
      #Form = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Form 인스턴스를 초기화합니다.
         * @param {Object} json - 계약 양식 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.id = json.id;  // 계약 양식 ID
          this.guide = new DateParse(json.guide);  // 계약 양식 안내 날짜
          this.date = new this.#FormDate(json.date);  // 계약 양식 날짜
        }
      
        /**
         * Form 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Form 인스턴스
         */
        toNormal() {
          return {
            id: this.id,  // 계약 양식 ID 변환
            guide: this.guide.toNormal(),  // 계약 양식 안내 날짜 변환
            date: this.date.toNormal(),  // 계약 양식 날짜 변환
          };
        }
      
        /**
         * FormDate 클래스는 계약 양식 날짜 정보를 관리합니다.
         */
        #FormDate = class {
          /**
           * 주어진 JSON 데이터를 기반으로 FormDate 인스턴스를 초기화합니다.
           * @param {Object} json - 계약 양식 날짜 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.from = new DateParse(json.from);  // 계약 시작 날짜
            this.to = new DateParse(json.to);  // 계약 종료 날짜
            this.cancel = new DateParse(json.cancel);  // 계약 취소 날짜
          }
        
          /**
           * FormDate 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 FormDate 인스턴스
           */
          toNormal() {
            return {
              from: this.from.toNormal(),  // 계약 시작 날짜 변환
              to: this.to.toNormal(),  // 계약 종료 날짜 변환
              cancel: this.cancel.toNormal(),  // 계약 취소 날짜 변환
            };
          }
        }
      }
      
      /**
       * Meeting 클래스는 미팅 관련 정보를 관리합니다.
       */
      #Meeting = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Meeting 인스턴스를 초기화합니다.
         * @param {Object} json - 미팅 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.date = new DateParse(json.date);  // 미팅 날짜
          this.pastDesigners = new this.#PastDesigners();  // 이전 디자이너 목록
          for (let i of json.pastDesigners) {
            const tempInstance = new this.#PastDesigner(i);  // 이전 디자이너 정보 초기화
            this.pastDesigners.push(tempInstance);  // 목록에 추가
          }
        }
      
        /**
         * Meeting 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Meeting 인스턴스
         */
        toNormal() {
          return {
            date: this.date.toNormal(),  // 미팅 날짜 변환
            pastDesigners: this.pastDesigners.toNormal(),  // 이전 디자이너 목록 변환
          };
        }
      
        /**
         * PastDesigners 클래스는 이전 디자이너 목록을 관리합니다.
         */
        #PastDesigners = class extends Array {
          /**
           * PastDesigners 인스턴스를 일반 객체 배열로 변환합니다.
           * @returns {Array} 일반 객체 배열로 변환된 PastDesigners 인스턴스
           */
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i.toNormal());  // 각 디자이너 정보를 일반 객체로 변환하여 배열에 추가
            }
            return arr;
          }
        }
        
        /**
         * PastDesigner 클래스는 이전 디자이너 정보를 관리합니다.
         */
        #PastDesigner = class {
          /**
           * 주어진 JSON 데이터를 기반으로 PastDesigner 인스턴스를 초기화합니다.
           * @param {Object} json - 이전 디자이너 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.desid = json.desid;  // 디자이너 ID
            this.date = new DateParse(json.date);  // 미팅 날짜
          }
        
          /**
           * PastDesigner 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 PastDesigner 인스턴스
           */
          toNormal() {
            return {
              desid: this.desid,  // 디자이너 ID 변환
              date: this.date.toNormal(),  // 미팅 날짜 변환
            };
          }
        }
      }
    }
  
    /**
     * ProcessDetails 클래스는 프로젝트의 세부 진행 정보를 관리합니다.
     */
    #ProcessDetails = class extends Array {
      /**
       * 주어진 JSON 배열 데이터를 기반으로 ProcessDetails 인스턴스를 초기화합니다.
       * @param {Array} json - 세부 진행 정보를 포함한 JSON 배열
       */
      constructor(json) {
        super();
        for (let i of json) {
          this.push(new this.#ProcessDetail(i));  // 각 세부 진행 정보를 초기화하여 배열에 추가
        }
      }
    
      /**
       * ProcessDetails 인스턴스를 일반 객체 배열로 변환합니다.
       * @returns {Array} 일반 객체 배열로 변환된 ProcessDetails 인스턴스
       */
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());  // 각 세부 진행 정보를 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    
      /**
       * ProcessDetail 클래스는 개별 세부 진행 정보를 관리합니다.
       */
      #ProcessDetail = class {
        /**
         * 주어진 JSON 데이터를 기반으로 ProcessDetail 인스턴스를 초기화합니다.
         * @param {Object} json - 개별 세부 진행 정보를 포함한 JSON 객체
         */
        constructor(json) {
          this.name = json.name;  // 진행 항목 이름
          this.date = new DateParse(json.date);  // 진행 날짜
          this.calendar = new this.#Calendar(json.calendar);  // 캘린더 정보
        }
      
        /**
         * ProcessDetail 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 ProcessDetail 인스턴스
         */
        toNormal() {
          return {
            name: this.name,  // 진행 항목 이름 변환
            date: this.date.toNormal(),  // 진행 날짜 변환
            calendar: this.calendar.toNormal(),  // 캘린더 정보 변환
          };
        }
      
        /**
         * Calendar 클래스는 진행 정보와 연결된 캘린더 데이터를 관리합니다.
         */
        #Calendar = class {
          /**
           * 주어진 JSON 데이터를 기반으로 Calendar 인스턴스를 초기화합니다.
           * @param {Object} json - 캘린더 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.mother = json.mother;  // 연관된 Mother 메서드 정보
            this.id = json.id;  // 캘린더 ID
          }
        
          /**
           * Calendar 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 Calendar 인스턴스
           */
          toNormal() {
            return {
              mother: this.mother,  // 연관된 Mother 메서드 정보 변환
              id: this.id,  // 캘린더 ID 변환
            };
          }
        }
      }
    }
  
    /**
     * ProcessCall 클래스는 프로젝트 진행 중 통화 관련 정보를 관리합니다.
     */
    #ProcessCall = class {
      /**
       * 주어진 JSON 데이터를 기반으로 ProcessCall 인스턴스를 초기화합니다.
       * @param {Object} json - 통화 관련 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        this.next = new DateParse(json.next);  // 다음 통화 날짜
        this.history = new this.#ProcessCallHistory(json.history);  // 통화 이력
      }
    
      /**
       * ProcessCall 인스턴스를 일반 객체로 변환합니다.
       * @returns {Object} 일반 객체로 변환된 ProcessCall 인스턴스
       */
      toNormal() {
        return {
          next: this.next.toNormal(),  // 다음 통화 날짜 변환
          history: this.history.toNormal(),  // 통화 이력 변환
        };
      }
    
      /**
       * ProcessCallHistory 클래스는 통화 이력을 관리합니다.
       */
      #ProcessCallHistory = class extends Array {
        /**
         * 주어진 JSON 배열 데이터를 기반으로 ProcessCallHistory 인스턴스를 초기화합니다.
         * @param {Array} json - 통화 이력을 포함한 JSON 배열
         */
        constructor(json) {
          super();
          for (let i of json) {
            this.push(new this.#ProcessCallHistoryFactor(i));  // 각 통화 이력 항목을 초기화하여 배열에 추가
          }
        }

        /**
         * ProcessCallHistory 인스턴스를 일반 객체 배열로 변환합니다.
         * @returns {Array} 일반 객체 배열로 변환된 ProcessCallHistory 인스턴스
         */
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i.toNormal());  // 각 통화 이력 항목을 일반 객체로 변환하여 배열에 추가
          }
          return arr;
        }
      
        /**
         * ProcessCallHistoryFactor 클래스는 개별 통화 이력 항목을 관리합니다.
         */
        #ProcessCallHistoryFactor = class {
          /**
           * 주어진 JSON 데이터를 기반으로 ProcessCallHistoryFactor 인스턴스를 초기화합니다.
           * @param {Object} json - 개별 통화 이력 항목을 포함한 JSON 객체
           */
          constructor(json) {
            this.date = new DateParse(json.date);  // 통화 날짜
            this.who = json.who;  // 통화 상대
          }
        
          /**
           * ProcessCallHistoryFactor 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 ProcessCallHistoryFactor 인스턴스
           */
          toNormal() {
            return {
              date: this.date.toNormal(),  // 통화 날짜 변환
              who: this.who,  // 통화 상대 변환
            };
          }
        }
      }
    }
  
    /**
     * Design 클래스는 프로젝트의 디자인 관련 정보를 관리합니다.
     */
    #Design = class {
      /**
       * 주어진 JSON 데이터를 기반으로 Design 인스턴스를 초기화합니다.
       * @param {Object} json - 디자인 관련 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        this.proposal = new this.#DesignProposal(json.proposal);  // 디자인 제안 정보
        this.construct = json.construct ? new this.#ConstructDetail(json.construct) : null;  // 시공 관련 정보
        this.purchase = new this.#Purchase(json.purchase);  // 구매 관련 정보
      }
    
      /**
       * Design 인스턴스를 일반 객체로 변환합니다.
       * @returns {Object} 일반 객체로 변환된 Design 인스턴스
       */
      toNormal() {
        return {
          proposal: this.proposal.toNormal(),  // 디자인 제안 정보 변환
          construct: this.construct ? this.construct.toNormal() : null,  // 시공 관련 정보 변환
          purchase: this.purchase.toNormal(),  // 구매 관련 정보 변환
        };
      }
    
      /**
       * DesignProposal 클래스는 디자인 제안 관련 정보를 관리합니다.
       */
      #DesignProposal = class {
        /**
         * 주어진 JSON 데이터를 기반으로 DesignProposal 인스턴스를 초기화합니다.
         * @param {Object} json - 디자인 제안 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.provided = json.provided;  // 제안된 디자인
          this.limit = json.limit;  // 디자인 제한
          this.detail = new this.#DesignProposalDetails();  // 디자인 제안 세부 사항
          for (let i of json.detail) {
            const tempInstance = new this.#DesignProposalDetail(i);  // 각 세부 사항 초기화
            this.detail.push(tempInstance);  // 세부 사항 목록에 추가
          }
        }
      
        /**
         * DesignProposal 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 DesignProposal 인스턴스
         */
        toNormal() {
          return {
            provided: this.provided,  // 제안된 디자인 변환
            limit: this.limit,  // 디자인 제한 변환
            detail: this.detail.toNormal(),  // 세부 사항 변환
          };
        }
      
        /**
         * DesignProposalDetails 클래스는 디자인 제안 세부 사항 목록을 관리합니다.
         */
        #DesignProposalDetails = class extends Array {
          /**
           * DesignProposalDetails 인스턴스를 일반 객체 배열로 변환합니다.
           * @returns {Array} 일반 객체 배열로 변환된 DesignProposalDetails 인스턴스
           */
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i.toNormal());  // 각 세부 사항을 일반 객체로 변환하여 배열에 추가
            }
            return arr;
          }
        }
        
        /**
         * DesignProposalDetail 클래스는 개별 디자인 제안 세부 사항을 관리합니다.
         */
        #DesignProposalDetail = class {
          /**
           * 주어진 JSON 데이터를 기반으로 DesignProposalDetail 인스턴스를 초기화합니다.
           * @param {Object} json - 개별 디자인 제안 세부 사항을 포함한 JSON 객체
           */
          constructor(json) {
            this.date = new DateParse(json.date);  // 세부 사항 관련 날짜
          }
        
          /**
           * DesignProposalDetail 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 DesignProposalDetail 인스턴스
           */
          toNormal() {
            return {
              date: this.date.toNormal(),  // 세부 사항 관련 날짜 변환
            };
          }
        }
      }
    
      /**
       * ConstructDetail 클래스는 시공 관련 정보를 관리합니다.
       */
      #ConstructDetail = class {
        /**
         * 주어진 JSON 데이터를 기반으로 ConstructDetail 인스턴스를 초기화합니다.
         * @param {Object} json - 시공 관련 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.status = json.status;  // 시공 상태
          this.request = new DateParse(json.request);  // 시공 요청 날짜
          this.estimate = new this.#ConstructEstimate(json.estimate);  // 시공 견적 정보
          this.contract = new this.#ConstructContract(json.contract);  // 시공 계약 정보
        }
      
        /**
         * ConstructDetail 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 ConstructDetail 인스턴스
         */
        toNormal() {
          return {
            status: this.status,  // 시공 상태 변환
            request: this.request.toNormal(),  // 시공 요청 날짜 변환
            estimate: this.estimate.toNormal(),  // 시공 견적 정보 변환
            contract: this.contract.toNormal(),  // 시공 계약 정보 변환
          };
        }
      
        /**
         * ConstructEstimate 클래스는 시공 견적 정보를 관리합니다.
         */
        #ConstructEstimate = class extends Array {
          /**
           * 주어진 JSON 배열 데이터를 기반으로 ConstructEstimate 인스턴스를 초기화합니다.
           * @param {Array} arr - 시공 견적 정보를 포함한 JSON 배열
           */
          constructor(arr) {
            super();
            for (let i of arr) {
              this.push(new this.#ConstructEstimateDocument(i));  // 각 견적 정보를 초기화하여 배열에 추가
            }
          }

          /**
           * ConstructEstimate 인스턴스를 일반 객체 배열로 변환합니다.
           * @returns {Array} 일반 객체 배열로 변환된 ConstructEstimate 인스턴스
           */
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i.toNormal());  // 각 견적 정보를 일반 객체로 변환하여 배열에 추가
            }
            return arr;
          }

          /**
           * ConstructEstimateDocument 클래스는 개별 시공 견적 문서를 관리합니다.
           */
          #ConstructEstimateDocument = class {
            /**
             * 주어진 JSON 데이터를 기반으로 ConstructEstimateDocument 인스턴스를 초기화합니다.
             * @param {Object} json - 개별 시공 견적 문서를 포함한 JSON 객체
             */
            constructor(json) {
              this.invid = json.invid;  // 견적 문서 ID
              this.date = new DateParse(json.date);  // 견적 문서 날짜
            }
          
            /**
             * ConstructEstimateDocument 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 ConstructEstimateDocument 인스턴스
             */
            toNormal() {
              return {
                invid: this.invid,  // 견적 문서 ID 변환
                date: this.date.toNormal(),  // 견적 문서 날짜 변환
              };
            }
          }
        }
      
        /**
         * ConstructContract 클래스는 시공 계약 정보를 관리합니다.
         */
        #ConstructContract = class {
          /**
           * 주어진 JSON 데이터를 기반으로 ConstructContract 인스턴스를 초기화합니다.
           * @param {Object} json - 시공 계약 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            this.partner = json.partner;  // 계약 파트너 정보
            this.form = new this.#ConstructContractForm(json.form);  // 계약 양식 정보
            this.payments = new this.#ConstructContractPayments(json.payments);  // 계약 금액 정보
            this.after = new this.#ConstructContractAfter(json.after);  // 시공 후 처리 정보
          }
        
          /**
           * ConstructContract 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 ConstructContract 인스턴스
           */
          toNormal() {
            return {
              partner: this.partner,  // 계약 파트너 정보 변환
              form: this.form.toNormal(),  // 계약 양식 정보 변환
              payments: this.payments.toNormal(),  // 계약 금액 정보 변환
              after: this.after.toNormal(),  // 시공 후 처리 정보 변환
            };
          }
        
          /**
           * ConstructContractPayments 클래스는 시공 계약 금액 정보를 관리합니다.
           */
          #ConstructContractPayments = class {
            /**
             * 주어진 JSON 데이터를 기반으로 ConstructContractPayments 인스턴스를 초기화합니다.
             * @param {Object} json - 시공 계약 금액 데이터를 포함한 JSON 객체
             */
            constructor(json) {
              this.first = json.first ? new this.#ConstructContractPayment(json.first) : null;  // 첫 번째 금액 정보
              this.start = json.start ? new this.#ConstructContractPayment(json.start) : null;  // 시작 금액 정보
              this.middle = json.middle ? new this.#ConstructContractPayment(json.middle) : null;  // 중간 금액 정보
              this.remain = json.remain ? new this.#ConstructContractPayment(json.remain) : null;  // 잔여 금액 정보
            }
          
            /**
             * ConstructContractPayments 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 ConstructContractPayments 인스턴스
             */
            toNormal() {
              return {
                first: this.first ? this.first.toNormal() : null,  // 첫 번째 금액 정보 변환
                start: this.start ? this.start.toNormal() : null,  // 시작 금액 정보 변환
                middle: this.middle ? this.middle.toNormal() : null,  // 중간 금액 정보 변환
                remain: this.remain ? this.remain.toNormal() : null,  // 잔여 금액 정보 변환
              };
            }
          
            /**
             * ConstructContractPayment 클래스는 개별 시공 계약 금액 정보를 관리합니다.
             */
            #ConstructContractPayment = class {
              /**
               * 주어진 JSON 데이터를 기반으로 ConstructContractPayment 인스턴스를 초기화합니다.
               * @param {Object} json - 개별 시공 계약 금액 정보를 포함한 JSON 객체
               */
              constructor(json) {
                this.guide = new DateParse(json.guide);  // 금액 안내 날짜
                this.date = new DateParse(json.date);  // 금액 지불 날짜
                this.cancel = new DateParse(json.cancel);  // 금액 취소 날짜
                this.calculation = new this.#ConstructContractPaymentCalculation(json.calculation);  // 금액 계산 정보
              }
            
              /**
               * ConstructContractPayment 인스턴스를 일반 객체로 변환합니다.
               * @returns {Object} 일반 객체로 변환된 ConstructContractPayment 인스턴스
               */
              toNormal() {
                return {
                  guide: this.guide.toNormal(),  // 금액 안내 날짜 변환
                  date: this.date.toNormal(),  // 금액 지불 날짜 변환
                  cancel: this.cancel.toNormal(),  // 금액 취소 날짜 변환
                  calculation: this.calculation.toNormal(),  // 금액 계산 정보 변환
                };
              }
            
              /**
               * ConstructContractPaymentCalculation 클래스는 금액 계산 관련 정보를 관리합니다.
               */
              #ConstructContractPaymentCalculation = class {
                /**
                 * 주어진 JSON 데이터를 기반으로 ConstructContractPaymentCalculation 인스턴스를 초기화합니다.
                 * @param {Object} json - 금액 계산 관련 데이터를 포함한 JSON 객체
                 */
                constructor(json) {
                  this.amount = new this.#ConstructContractPaymentCalculationAmount(json.amount);  // 금액 정보
                  this.info = new this.#ConstructContractPaymentCalculationInfo(json.info);  // 금액 계산 추가 정보
                  this.refund = json.refund;  // 환불 금액
                }
              
                /**
                 * ConstructContractPaymentCalculation 인스턴스를 일반 객체로 변환합니다.
                 * @returns {Object} 일반 객체로 변환된 ConstructContractPaymentCalculation 인스턴스
                 */
                toNormal() {
                  return {
                    amount: this.amount.toNormal(),  // 금액 정보 변환
                    info: this.info.toNormal(),  // 금액 계산 추가 정보 변환
                    refund: this.refund,  // 환불 금액 변환
                  };
                }
              
                /**
                 * ConstructContractPaymentCalculationInfo 클래스는 금액 계산 추가 정보를 관리합니다.
                 */
                #ConstructContractPaymentCalculationInfo = class {
                  /**
                   * 주어진 JSON 데이터를 기반으로 ConstructContractPaymentCalculationInfo 인스턴스를 초기화합니다.
                   * @param {Object} json - 금액 계산 추가 정보를 포함한 JSON 객체
                   */
                  constructor(json) {
                    this.method = json.method;  // 결제 방법
                    this.proof = json.proof;  // 증빙 자료
                    this.to = json.to;  // 금액 수령자
                  }
                
                  /**
                   * ConstructContractPaymentCalculationInfo 인스턴스를 일반 객체로 변환합니다.
                   * @returns {Object} 일반 객체로 변환된 ConstructContractPaymentCalculationInfo 인스턴스
                   */
                  toNormal() {
                    return {
                      method: this.method,  // 결제 방법 변환
                      proof: this.proof,  // 증빙 자료 변환
                      to: this.to,  // 금액 수령자 변환
                    };
                  }
                }
                
                /**
                 * ConstructContractPaymentCalculationAmount 클래스는 금액 정보를 관리합니다.
                 */
                #ConstructContractPaymentCalculationAmount = class {
                  /**
                   * 주어진 JSON 데이터를 기반으로 ConstructContractPaymentCalculationAmount 인스턴스를 초기화합니다.
                   * @param {Object} json - 금액 정보를 포함한 JSON 객체
                   */
                  constructor(json) {
                    this.supply = json.supply;  // 공급 금액
                    this.vat = json.vat;  // 부가가치세
                    this.consumer = json.consumer;  // 소비자 부담금
                  }
                
                  /**
                   * ConstructContractPaymentCalculationAmount 인스턴스를 일반 객체로 변환합니다.
                   * @returns {Object} 일반 객체로 변환된 ConstructContractPaymentCalculationAmount 인스턴스
                   */
                  toNormal() {
                    return {
                      supply: this.supply,  // 공급 금액 변환
                      vat: this.vat,  // 부가가치세 변환
                      consumer: this.consumer,  // 소비자 부담금 변환
                    };
                  }
                }
              }
            }
          }
        
          /**
           * ConstructContractForm 클래스는 시공 계약 양식을 관리합니다.
           */
          #ConstructContractForm = class {
            /**
             * 주어진 JSON 데이터를 기반으로 ConstructContractForm 인스턴스를 초기화합니다.
             * @param {Object} json - 시공 계약 양식 데이터를 포함한 JSON 객체
             */
            constructor(json) {
              this.id = json.id;  // 계약 양식 ID
              this.guide = new DateParse(json.guide);  // 계약 양식 안내 날짜
              this.date = new this.#ConstructContractFormDate(json.date);  // 계약 양식 날짜
            }
          
            /**
             * ConstructContractForm 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 ConstructContractForm 인스턴스
             */
            toNormal() {
              return {
                id: this.id,  // 계약 양식 ID 변환
                guide: this.guide.toNormal(),  // 계약 양식 안내 날짜 변환
                date: this.date.toNormal(),  // 계약 양식 날짜 변환
              };
            }
          
            /**
             * ConstructContractFormDate 클래스는 시공 계약 양식 날짜 정보를 관리합니다.
             */
            #ConstructContractFormDate = class {
              /**
               * 주어진 JSON 데이터를 기반으로 ConstructContractFormDate 인스턴스를 초기화합니다.
               * @param {Object} json - 시공 계약 양식 날짜 데이터를 포함한 JSON 객체
               */
              constructor(json) {
                this.from = new DateParse(json.from);  // 계약 시작 날짜
                this.to = new DateParse(json.to);  // 계약 종료 날짜
                this.cancel = new DateParse(json.cancel);  // 계약 취소 날짜
              }
            
              /**
               * ConstructContractFormDate 인스턴스를 일반 객체로 변환합니다.
               * @returns {Object} 일반 객체로 변환된 ConstructContractFormDate 인스턴스
               */
              toNormal() {
                return {
                  from: this.from.toNormal(),  // 계약 시작 날짜 변환
                  to: this.to.toNormal(),  // 계약 종료 날짜 변환
                  cancel: this.cancel.toNormal(),  // 계약 취소 날짜 변환
                };
              }
            }
          }
        
          /**
           * ConstructContractAfter 클래스는 시공 후 처리 정보를 관리합니다.
           */
          #ConstructContractAfter = class {
            /**
             * 주어진 JSON 데이터를 기반으로 ConstructContractAfter 인스턴스를 초기화합니다.
             * @param {Object} json - 시공 후 처리 정보를 포함한 JSON 객체
             */
            constructor(json) {
              this.expired = new DateParse(json.expired);  // 처리 만료 날짜
              this.history = new this.#ConstructContractAfterHistory(json.history);  // 시공 후 처리 이력
            }
          
            /**
             * ConstructContractAfter 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 ConstructContractAfter 인스턴스
             */
            toNormal() {
              return {
                expired: this.expired.toNormal(),  // 처리 만료 날짜 변환
                history: this.history.toNormal(),  // 시공 후 처리 이력 변환
              };
            }
          
            /**
             * ConstructContractAfterHistory 클래스는 시공 후 처리 이력을 관리합니다.
             */
            #ConstructContractAfterHistory = class extends Array {
              /**
               * 주어진 JSON 배열 데이터를 기반으로 ConstructContractAfterHistory 인스턴스를 초기화합니다.
               * @param {Array} arr - 시공 후 처리 이력을 포함한 JSON 배열
               */
              constructor(arr) {
                super();
                for (let i of arr) {
                  this.push(new this.#ConstructContractAfterHistoryFactor(i));  // 각 처리 이력 항목을 초기화하여 배열에 추가
                }
              }

              /**
               * ConstructContractAfterHistory 인스턴스를 일반 객체 배열로 변환합니다.
               * @returns {Array} 일반 객체 배열로 변환된 ConstructContractAfterHistory 인스턴스
               */
              toNormal() {
                let arr = [];
                for (let i of this) {
                  arr.push(i.toNormal());  // 각 처리 이력 항목을 일반 객체로 변환하여 배열에 추가
                }
                return arr;
              }

              /**
               * ConstructContractAfterHistoryFactor 클래스는 개별 시공 후 처리 이력 항목을 관리합니다.
               */
              #ConstructContractAfterHistoryFactor = class {
                /**
                 * 주어진 JSON 데이터를 기반으로 ConstructContractAfterHistoryFactor 인스턴스를 초기화합니다.
                 * @param {Object} json - 개별 시공 후 처리 이력 항목을 포함한 JSON 객체
                 */
                constructor(json) {
                  this.from = new DateParse(json.from);  // 처리 시작 날짜
                  this.to = new DateParse(json.to);  // 처리 종료 날짜
                  this.amount = json.amount;  // 처리 금액
                }
              
                /**
                 * ConstructContractAfterHistoryFactor 인스턴스를 일반 객체로 변환합니다.
                 * @returns {Object} 일반 객체로 변환된 ConstructContractAfterHistoryFactor 인스턴스
                 */
                toNormal() {
                  return {
                    from: this.from.toNormal(),  // 처리 시작 날짜 변환
                    to: this.to.toNormal(),  // 처리 종료 날짜 변환
                    amount: this.amount,  // 처리 금액 변환
                  };
                }
              }
            }
          }
        }
      }
    
      /**
       * Purchase 클래스는 프로젝트의 구매 관련 정보를 관리합니다.
       */
      #Purchase = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Purchase 인스턴스를 초기화합니다.
         * @param {Object} json - 구매 관련 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.provided = json.provided;  // 구매된 항목
          this.detail = new this.#PurchaseDetails();  // 구매 세부 사항 목록
          for (let i of json.detail) {
            const tempInstance = new this.#PurchaseDetail(i);  // 각 구매 세부 사항 초기화
            this.detail.push(tempInstance);  // 구매 세부 사항 목록에 추가
          }
        }
      
        /**
         * Purchase 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Purchase 인스턴스
         */
        toNormal() {
          return {
            provided: this.provided,  // 구매된 항목 변환
            detail: this.detail.toNormal(),  // 구매 세부 사항 목록 변환
          };
        }
      
        /**
         * PurchaseDetails 클래스는 구매 세부 사항 목록을 관리합니다.
         */
        #PurchaseDetails = class extends Array {
          /**
           * PurchaseDetails 인스턴스를 일반 객체 배열로 변환합니다.
           * @returns {Array} 일반 객체 배열로 변환된 PurchaseDetails 인스턴스
           */
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i.toNormal());  // 각 구매 세부 사항을 일반 객체로 변환하여 배열에 추가
            }
            return arr;
          }
        }
        
        /**
         * PurchaseDetail 클래스는 개별 구매 세부 사항을 관리합니다.
         */
        #PurchaseDetail = class {
          /**
           * 주어진 JSON 데이터를 기반으로 PurchaseDetail 인스턴스를 초기화합니다.
           * @param {Object} json - 개별 구매 세부 사항을 포함한 JSON 객체
           */
          constructor(json) {
            this.name = json.name;  // 구매 항목 이름
            this.provider = json.provider;  // 공급자
            this.link = json.link;  // 관련 링크
            this.calculation = new this.#PurchaseDetailCalculation(json.calculation);  // 구매 금액 계산 정보
          }
        
          /**
           * PurchaseDetail 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 PurchaseDetail 인스턴스
           */
          toNormal() {
            return {
              name: this.name,  // 구매 항목 이름 변환
              provider: this.provider,  // 공급자 변환
              link: this.link,  // 관련 링크 변환
              calculation: this.calculation.toNormal(),  // 구매 금액 계산 정보 변환
            };
          }
        
          /**
           * PurchaseDetailCalculation 클래스는 구매 금액 계산 정보를 관리합니다.
           */
          #PurchaseDetailCalculation = class {
            /**
             * 주어진 JSON 데이터를 기반으로 PurchaseDetailCalculation 인스턴스를 초기화합니다.
             * @param {Object} json - 구매 금액 계산 정보를 포함한 JSON 객체
             */
            constructor(json) {
              this.amount = json.amount;  // 구매 금액
            }
            /**
             * PurchaseDetailCalculation 인스턴스를 일반 객체로 변환합니다.
             * @returns {Object} 일반 객체로 변환된 PurchaseDetailCalculation 인스턴스
             */
            toNormal() {
              return {
                amount: this.amount,  // 구매 금액 변환
              };
            }
          }
        }
      }
    }
  
    /**
     * Calculation 클래스는 프로젝트의 정산 관련 정보를 관리합니다.
     */
    #Calculation = class {
      /**
       * 주어진 JSON 데이터를 기반으로 Calculation 인스턴스를 초기화합니다.
       * @param {Object} json - 정산 관련 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        this.method = new Menu(json.method, ["사업자(일반)", "사업자(간이)", "프리랜서"], false);  // 정산 방법
        this.percentage = json.percentage;  // 정산 비율
        this.info = new this.#Info(json.info);  // 정산 정보
        this.payments = new this.#Payments(json.payments);  // 결제 정보
      }
    
      /**
       * Calculation 인스턴스를 일반 객체로 변환합니다.
       * @returns {Object} 일반 객체로 변환된 Calculation 인스턴스
       */
      toNormal() {
        return {
          method: this.method.toNormal(),  // 정산 방법 변환
          percentage: this.percentage,  // 정산 비율 변환
          info: this.info.toNormal(),  // 정산 정보 변환
          payments: this.payments.toNormal(),  // 결제 정보 변환
        };
      }
    
      /**
       * Info 클래스는 정산 관련 정보를 관리합니다.
       */
      #Info = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Info 인스턴스를 초기화합니다.
         * @param {Object} json - 정산 관련 정보를 포함한 JSON 객체
         */
        constructor(json) {
          this.account = json.account;  // 정산 계좌 정보
          this.proof = json.proof;  // 증빙 자료
          this.to = json.to;  // 정산 대상자
        }
      
        /**
         * Info 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Info 인스턴스
         */
        toNormal() {
          return {
            account: this.account,  // 정산 계좌 정보 변환
            proof: this.proof,  // 증빙 자료 변환
            to: this.to,  // 정산 대상자 변환
          };
        }
      }
      
      /**
       * Payments 클래스는 결제 관련 정보를 관리합니다.
       */
      #Payments = class {
        /**
         * 주어진 JSON 데이터를 기반으로 Payments 인스턴스를 초기화합니다.
         * @param {Object} json - 결제 관련 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.totalAmount = json.totalAmount;  // 총 결제 금액
          this.first = new this.#PaymentsFirst(json.first);  // 첫 번째 결제 정보
          this.remain = new this.#PaymentsRemain(json.remain);  // 잔여 결제 정보
        }
      
        /**
         * Payments 인스턴스를 일반 객체로 변환합니다.
         * @returns {Object} 일반 객체로 변환된 Payments 인스턴스
         */
        toNormal() {
          return {
            totalAmount: this.totalAmount,  // 총 결제 금액 변환
            first: this.first.toNormal(),  // 첫 번째 결제 정보 변환
            remain: this.remain.toNormal(),  // 잔여 결제 정보 변환
          };
        }
      
        /**
         * PaymentsFirst 클래스는 첫 번째 결제 정보를 관리합니다.
         */
        #PaymentsFirst = class {
          /**
           * 주어진 JSON 데이터를 기반으로 PaymentsFirst 인스턴스를 초기화합니다.
           * @param {Object} json - 첫 번째 결제 정보를 포함한 JSON 객체
           */
          constructor(json) {
            this.amount = json.amount;  // 결제 금액
            this.date = new DateParse(json.date);  // 결제 날짜
            this.cancel = new DateParse(json.cancel);  // 결제 취소 날짜
            this.refund = json.refund;  // 환불 금액
          }
        
          /**
           * PaymentsFirst 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 PaymentsFirst 인스턴스
           */
          toNormal() {
            return {
              amount: this.amount,  // 결제 금액 변환
              date: this.date.toNormal(),  // 결제 날짜 변환
              cancel: this.cancel.toNormal(),  // 결제 취소 날짜 변환
              refund: this.refund,  // 환불 금액 변환
            };
          }
        }
        
        /**
         * PaymentsRemain 클래스는 잔여 결제 정보를 관리합니다.
         */
        #PaymentsRemain = class {
          /**
           * 주어진 JSON 데이터를 기반으로 PaymentsRemain 인스턴스를 초기화합니다.
           * @param {Object} json - 잔여 결제 정보를 포함한 JSON 객체
           */
          constructor(json) {
            this.amount = json.amount;  // 결제 금액
            this.date = new DateParse(json.date);  // 결제 날짜
            this.cancel = new DateParse(json.cancel);  // 결제 취소 날짜
            this.refund = json.refund;  // 환불 금액
          }
        
          /**
           * PaymentsRemain 인스턴스를 일반 객체로 변환합니다.
           * @returns {Object} 일반 객체로 변환된 PaymentsRemain 인스턴스
           */
          toNormal() {
            return {
              amount: this.amount,  // 결제 금액 변환
              date: this.date.toNormal(),  // 결제 날짜 변환
              cancel: this.cancel.toNormal(),  // 결제 취소 날짜 변환
              refund: this.refund,  // 환불 금액 변환
            };
          }
        }
      }
    }
  }

  /**
   * 지정된 디자이너 ID에 해당하는 제안서를 선택합니다.
   * @param {string} desid - 선택할 제안서의 디자이너 ID
   * @returns {Object|null} - 해당 디자이너 ID에 해당하는 제안서 객체 또는 null
   * @throws {Error} - desid가 문자열이 아닌 경우 에러를 던집니다.
   */
  selectProposal(desid) {
    // desid가 문자열이 아닌 경우 에러를 발생시킵니다.
    if (typeof desid !== "string") {
      throw new Error("must be desid");
    }

    // 선택된 제안서를 저장할 변수를 선언합니다.
    let target = null;

    // proposal.detail 배열을 순회하며 desid와 일치하는 제안서를 찾습니다.
    for (let obj of this.proposal.detail) {
      // 일치하는 제안서가 있는 경우
      if (obj.desid === desid) {
        target = obj; // 해당 제안서를 target 변수에 할당합니다.
        target.proid = this.proid; // 해당 제안서의 proid를 현재 프로젝트의 proid로 설정합니다.
        break; // 찾으면 반복문을 종료합니다.
      }
    }

    // 찾은 제안서를 반환합니다. 일치하는 제안서가 없다면 null을 반환합니다.
    return target;
  }
}

/**
 * Projects 클래스는 Project 인스턴스를 담는 확장 배열 클래스입니다.
 * 이 클래스는 Project 인스턴스들의 배열을 관리하고, 다양한 조작 및 조회 기능을 제공합니다.
 */
class Projects extends Array {

  /**
   * Projects 인스턴스를 일반 배열로 변환합니다.
   * 각 Project 인스턴스의 toNormal() 메서드를 호출하여 변환된 객체들을 배열로 반환합니다.
   * @returns {Array} Project 인스턴스들의 일반 객체 배열
   */
  toNormal() {
    let tong;  // 변환된 객체들을 담을 배열 선언
    tong = [];  // 빈 배열로 초기화
    for (let i of this) {  // 현재 Projects 배열의 각 Project 인스턴스에 대해 반복
      tong.push(i.toNormal());  // 각 Project 인스턴스를 일반 객체로 변환하여 배열에 추가
    }
    return tong;  // 변환된 객체들의 배열 반환
  }

  /**
   * 모든 Project 인스턴스들의 Proposal 세부 항목을 수집하여 배열로 반환합니다.
   * 각 Proposal의 proid, cliid, service 값을 해당 Project의 값으로 설정합니다.
   * @returns {Array} Proposal 세부 항목들의 배열
   */
  getProposals() {
    let tong;  // Proposal 세부 항목들을 담을 배열 선언
    tong = [];  // 빈 배열로 초기화
    for (let i of this) {  // 현재 Projects 배열의 각 Project 인스턴스에 대해 반복
      for (let j of i.proposal.detail) {  // 각 Project의 proposal.detail 배열의 항목에 대해 반복
        j.proid = i.proid;  // Proposal의 proid를 해당 Project의 proid로 설정
        j.cliid = i.cliid;  // Proposal의 cliid를 해당 Project의 cliid로 설정
        j.service = i.service;  // Proposal의 service를 해당 Project의 service로 설정
        tong.push(j);  // 수정된 Proposal 세부 항목을 배열에 추가
      }
    }
    return tong;  // 수집된 Proposal 세부 항목들의 배열 반환
  }

  /**
   * 모든 Project 인스턴스들의 Fee 정보를 수집하여 배열로 반환합니다.
   * 각 Fee의 proid, cliid, desid 값을 해당 Project와 Proposal의 값으로 설정합니다.
   * @returns {Fees} Fee 인스턴스들의 배열을 담은 Fees 클래스 인스턴스
   */
  getFees() {
    let tong;  // Fee 정보를 담을 배열 선언
    
    /**
     * Fees 클래스는 Fee 인스턴스를 담는 확장 배열 클래스입니다.
     * 이 클래스는 online, offline 메서드를 통해 온라인 및 오프라인 결제 정보를 필터링할 수 있습니다.
     */
    class Fees extends Array {
      /**
       * 온라인 결제 정보만을 필터링하여 반환합니다.
       * @returns {Fees} 온라인 결제 정보만을 담은 새로운 Fees 인스턴스
       */
      online() {
        let tong = new Fees();  // 온라인 결제 정보만 담을 새로운 Fees 인스턴스 생성
        for (let i of this) {  // 현재 Fees 배열의 각 Fee 인스턴스에 대해 반복
          if (i.method === "online") {  // 결제 방식이 온라인인 경우
            tong.push(i);  // 해당 Fee 인스턴스를 새로운 배열에 추가
          }
        }
        return tong;  // 온라인 결제 정보만 담은 새로운 Fees 인스턴스 반환
      }

      /**
       * 오프라인 결제 정보만을 필터링하여 반환합니다.
       * @returns {Fees} 오프라인 결제 정보만을 담은 새로운 Fees 인스턴스
       */
      offline() {
        let tong = new Fees();  // 오프라인 결제 정보만 담을 새로운 Fees 인스턴스 생성
        for (let i of this) {  // 현재 Fees 배열의 각 Fee 인스턴스에 대해 반복
          if (i.method === "offline") {  // 결제 방식이 오프라인인 경우
            tong.push(i);  // 해당 Fee 인스턴스를 새로운 배열에 추가
          }
        }
        return tong;  // 오프라인 결제 정보만 담은 새로운 Fees 인스턴스 반환
      }
    }

    tong = new Fees();  // 빈 Fees 인스턴스로 초기화
    for (let i of this) {  // 현재 Projects 배열의 각 Project 인스턴스에 대해 반복
      for (let j of i.proposal.detail) {  // 각 Project의 proposal.detail 배열의 항목에 대해 반복
        for (let k of j.fee) {  // 각 Proposal의 fee 배열의 항목에 대해 반복
          k.proid = i.proid;  // Fee의 proid를 해당 Project의 proid로 설정
          k.cliid = i.cliid;  // Fee의 cliid를 해당 Project의 cliid로 설정
          k.desid = j.desid;  // Fee의 desid를 해당 Proposal의 desid로 설정
          tong.push(k);  // 수정된 Fee 항목을 배열에 추가
        }
      }
    }
    return tong;  // 수집된 Fee 정보의 배열 반환
  }

  /**
   * desid 값이 비어 있지 않은 Project 인스턴스만을 필터링하여 반환합니다.
   * @returns {Projects} desid 값이 있는 Project 인스턴스만을 담은 새로운 Projects 인스턴스
   */
  proceedFilter() {
    let arr;  // 필터링된 Project 인스턴스들을 담을 배열 선언
    arr = new Projects();  // 빈 Projects 인스턴스로 초기화
    for (let i of this) {  // 현재 Projects 배열의 각 Project 인스턴스에 대해 반복
      if (i.desid !== "") {  // Project의 desid 값이 비어 있지 않은 경우
        arr.push(i);  // 해당 Project 인스턴스를 새로운 배열에 추가
      }
    }
    return arr;  // 필터링된 Project 인스턴스들의 배열 반환
  }

}

/**
 * Project 클래스에 유용한 도구 메서드를 추가하는 함수입니다.
 * 이 함수는 Project 클래스의 프로토타입에 여러 메서드를 추가하여 데이터를 다양한 형식으로 가공하거나, 계산 작업을 수행할 수 있게 합니다.
 * @param {Function} Project - Project 클래스
 * @returns {Function} - 수정된 Project 클래스를 반환
 */
const withTools = function (Project) {

  // Node.js의 기본 모듈 중 하나인 querystring 모듈을 가져와서 QueryString으로 명명합니다.
  const QueryString = require("querystring");

  /**
   * Project 클래스에 flatDeath 메서드를 추가합니다.
   * 이 메서드는 프로젝트 데이터를 평평하게(flat) 정리하여 가공된 데이터를 반환합니다.
   */
  Project.prototype.flatDeath = function () {
    // Project 인스턴스를 일반 객체 형태로 변환합니다.
    const project = this.toNormal();

    /**
     * 주어진 Date 객체를 'YYYY-MM-DD' 또는 'YYYY-MM-DD HH:MM:SS' 형식의 문자열로 변환합니다.
     * @param {Date} dateObject - 날짜 객체
     * @param {boolean} [detail=false] - 시간까지 포함할지 여부
     * @returns {string} - 포맷된 날짜 문자열
     */
    const dateToString = function (dateObject, detail = false) {
      let dayString = '';  // 변환된 날짜 문자열을 저장할 변수 선언

      // 연도 부분을 추가합니다.
      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';

      // 월 부분을 추가합니다. 한 자리 숫자는 앞에 0을 붙입니다.
      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }

      dayString += '-';

      // 일 부분을 추가합니다. 한 자리 숫자는 앞에 0을 붙입니다.
      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      // detail 옵션이 true인 경우 시간까지 포맷하여 추가합니다.
      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      // 특정 패턴에 따라 날짜 문자열을 변경합니다.
      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;  // 최종 포맷된 날짜 문자열 반환
    }

    /**
     * 결제 정보 객체를 문자열로 변환합니다.
     * @param {Object} infoObj - 결제 정보 객체
     * @returns {string} - 포맷된 결제 정보 문자열
     */
    const infoToString = function (infoObj) {
      const { proof, to } = infoObj;  // 증빙 정보와 수신자 정보 추출
      let target, wording, result;

      // 계좌번호가 없는 경우 결제 방법을 사용합니다.
      if (infoObj.account === undefined) {
        target = infoObj.method;
        wording = "결제방법";
      } else {
        target = infoObj.account;
        wording = "계좌번호";
      }

      // 결제 정보 문자열을 구성합니다.
      result = wording + ' ' + target + " / " + "수신자" + ' ' + to + " / " + "증빙" + ' ' + proof;
      return result;  // 최종 포맷된 결제 정보 문자열 반환
    }

    /**
     * 통화 기록 배열을 문자열로 변환합니다.
     * @param {Array} historyArr - 통화 기록 배열
     * @returns {string} - 포맷된 통화 기록 문자열
     */
    const callHistoryToString = function (historyArr) {
      let totalString = '';  // 최종 문자열을 저장할 변수 선언

      // 통화 기록을 최신순으로 정렬합니다.
      historyArr.reverse();
      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }

      // 마지막 쉼표와 공백을 제거합니다.
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;  // 최종 포맷된 통화 기록 문자열 반환
    }

    /**
     * 할인 정보를 문자열로 변환합니다.
     * @param {number} discount - 할인율 (소수점 형태)
     * @param {number} supply - 공급가액
     * @param {number} consumer - 소비자가액
     * @returns {string} - 포맷된 할인 정보 문자열
     */
    const discountToString = function (discount, supply, consumer) {
      /**
       * 주어진 숫자 문자열에 쉼표를 추가하여 포맷합니다.
       * @param {string|number} str - 숫자 또는 숫자 문자열
       * @returns {string} - 쉼표가 추가된 문자열
       */
      const autoComma = function (str) {
        let minus;
        let count, countArr;
        let temp, tempArr;

        if (typeof str === "number") {
          str = String(Math.floor(str));  // 숫자를 정수로 변환 후 문자열로 변환
        }

        // 과학적 표기법을 처리할 수 없으므로 에러를 발생시킵니다.
        if (/e/gi.test(str)) {
          throw new Error("is too heavy");
        }

        minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';  // 음수 처리
        str = str.replace(/[^0-9]/g, '');  // 숫자 외의 문자 제거

        // 숫자가 유효한지 확인합니다.
        if (str === '') {
          throw new Error("invalid number");
        }

        // 숫자를 3자리마다 구분합니다.
        count = Math.ceil(str.length / 3);
        countArr = [];
        for (let i = 0; i < count; i++) {
          countArr.push([3 * i, 3 * (i + 1)]);
        }

        // 구분된 숫자를 역순으로 처리하여 쉼표를 추가합니다.
        tempArr = [];
        for (let arr of countArr) {
          temp = '';
          for (let i = arr[0]; i < arr[1]; i++) {
            if (str.length - 1 - i < 0) {
              temp += '';
            } else {
              temp = str[str.length - 1 - i] + temp;
            }
          }
          if (temp !== '') {
            tempArr.unshift(temp);
          }
        }

        // 최종 포맷된 숫자 문자열을 반환합니다.
        return (minus + tempArr.join(','));
      }

      // 공급가액과 소비자가액에 대한 할인 금액을 계산합니다.
      const supplyDiscount = (supply / (1 - discount)) - supply;
      const consumerDiscount = (consumer / (1 - discount)) - consumer;

      // 할인 정보 문자열을 구성합니다.
      return `${String(Math.floor(discount * 100))}% (${autoComma(supplyDiscount)}원/${autoComma(consumerDiscount)}원)`;
    }

    // 결과를 담을 배열 선언 및 초기화
    let tong = [];
    let temp;
    let proposalDetailLength, proposalAverage;

    // 프로젝트 객체에서 필요한 데이터를 구조분해 할당으로 추출
    const { proid, cliid, desid, service: { serid, xValue, online } } = project;
    const { date: proposalDate, detail: proposalDetail } = project.proposal;
    const { status, action, outreason, call: { next, history: callHistory }, contract: { first: { guide: firstGuide, date: firstDate, cancel: firstCancel, calculation: { amount: firstAmount, info: firstInfo, refund: firstRefund, } }, remain: { guide: remainGuide, date: remainDate, cancel: remainCancel, calculation: { amount: { supply: remainSupply, vat: remainVat, consumer: remainConsumer }, info: remainInfo, refund: remainRefund, discount: remainDiscount } }, form: { guide: formGuide, date: { from: formDateFrom, to: formDateTo, cancel: formDateCancel, } }, meeting: { date: meetingDate } }, calculation: { method, percentage, info: calculationInfo, payments: { totalAmount: paymentsTotalAmount, first: { amount: paymentsFirstAmount, date: paymentsFirstDate, cancel: paymentsFirstCancel, refund: paymentsFirstRefund, }, remain: { amount: paymentsRemainAmount, date: paymentsRemainDate, cancel: paymentsRemainCancel, refund: paymentsRemainRefund, } } } } = project.process;
    const { photo: { boo: photoBoo, status: photoStatus, date: contentsPhotoDate, info: { photographer, interviewer } }, raw: { portfolio: { status: rawPortfolioStatus }, interview: { status: rawInterviewStatus }, photo: { status: rawPhotoStatus } }, share: { client: { photo: shareClientPhoto, contents: shareClientContents }, designer: { photo: shareDesignerPhoto, contents: shareDesignerContents } } } = project.contents;

    // 제안서 세부 항목 길이 및 평균을 계산
    proposalDetailLength = proposalDetail.length;
    proposalAverage = 0;
    for (let i = 0; i < proposalDetailLength; i++) {
      proposalAverage += proposalDetail[i].fee[0].amount;
    }
    if (proposalDetailLength !== 0) {
      proposalAverage = Math.round(Math.round(proposalAverage / proposalDetailLength) / 1000) * 1000;
    }

    // 중간 데이터 객체 초기화 및 데이터 추가
    temp = {};
    temp.standard = {
      proid
    };

    temp.middle = {
      cliid,
      desid,
      serid,
      xValue,
      online
    };

    temp.info = {
      status,
      action,
      next: dateToString(next),
      callHistory: callHistoryToString(callHistory),
      firstDate: dateToString(firstDate),
      firstCancel: dateToString(firstCancel),
      firstAmount: String(firstAmount),
      firstInfo: infoToString(firstInfo),
      firstRefund: String(firstRefund),
      remainDate: dateToString(remainDate),
      remainCancel: dateToString(remainCancel),
      remainSupply: String(remainSupply),
      remainVat: String(remainVat),
      remainConsumer: String(remainConsumer),
      remainPure: String(remainConsumer - firstAmount),
      remainInfo: infoToString(remainInfo),
      remainRefund: String(remainRefund),
      discount: discountToString(remainDiscount, remainSupply, remainConsumer),
      discountDesigner: discountToString(remainDiscount, remainSupply, remainConsumer),
      formDateFrom: dateToString(formDateFrom),
      formDateTo: dateToString(formDateTo),
      formDateCancel: dateToString(formDateCancel),
      meetingDate: dateToString(meetingDate, true),
      method,
      percentage: String(percentage),
      calculationInfo: infoToString(calculationInfo),
      paymentsTotalAmount: String(paymentsTotalAmount),
      paymentsFirstAmount: String(paymentsFirstAmount),
      paymentsFirstDate: dateToString(paymentsFirstDate),
      paymentsFirstCancel: dateToString(paymentsFirstCancel),
      paymentsFirstRefund: String(paymentsFirstRefund),
      paymentsRemainAmount: String(paymentsRemainAmount),
      paymentsRemainDate: dateToString(paymentsRemainDate),
      paymentsRemainCancel: dateToString(paymentsRemainCancel),
      paymentsRemainRefund: String(paymentsRemainRefund),
      photoStatus,
      contentsPhotoDate: dateToString(contentsPhotoDate),
      proposalDate: dateToString(proposalDate),
      proposalDesigner0: (proposalDetailLength > 0 ? proposalDetail[0].desid : ''),
      proposalFee0: (proposalDetailLength > 0 ? proposalDetail[0].fee[0].amount : 0),
      proposalDesigner1: (proposalDetailLength > 1 ? proposalDetail[1].desid : ''),
      proposalFee1: (proposalDetailLength > 1 ? proposalDetail[1].fee[0].amount : 0),
      proposalDesigner2: (proposalDetailLength > 2 ? proposalDetail[2].desid : ''),
      proposalFee2: (proposalDetailLength > 2 ? proposalDetail[2].fee[0].amount : 0),
      proposalDesigner3: (proposalDetailLength > 3 ? proposalDetail[3].desid : ''),
      proposalFee3: (proposalDetailLength > 3 ? proposalDetail[3].fee[0].amount : 0),
      proposalDesigner4: (proposalDetailLength > 4 ? proposalDetail[4].desid : ''),
      proposalFee4: (proposalDetailLength > 4 ? proposalDetail[4].fee[0].amount : 0),
      proposalDesigner5: (proposalDetailLength > 5 ? proposalDetail[5].desid : ''),
      proposalFee5: (proposalDetailLength > 5 ? proposalDetail[5].fee[0].amount : 0),
      proposalDesigner6: (proposalDetailLength > 6 ? proposalDetail[6].desid : ''),
      proposalFee6: (proposalDetailLength > 6 ? proposalDetail[6].fee[0].amount : 0),
      proposalDesigner7: (proposalDetailLength > 7 ? proposalDetail[7].desid : ''),
      proposalFee7: (proposalDetailLength > 7 ? proposalDetail[7].fee[0].amount : 0),
      proposalDesigner8: (proposalDetailLength > 8 ? proposalDetail[8].desid : ''),
      proposalFee8: (proposalDetailLength > 8 ? proposalDetail[8].fee[0].amount : 0),
      proposalDesigner9: (proposalDetailLength > 9 ? proposalDetail[9].desid : ''),
      proposalFee9: (proposalDetailLength > 9 ? proposalDetail[9].fee[0].amount : 0),
      proposalAverage,
    };

    tong.push(temp);  // 결과 배열에 추가

    return tong;  // 최종 결과 배열 반환
  }

  /**
   * Project 클래스에 planeDeath 메서드를 추가합니다.
   * 이 메서드는 프로젝트 데이터를 간략화하여 단순한 구조로 가공된 데이터를 반환합니다.
   */
  Project.prototype.planeDeath = function () {
    const project = this.toNormal();  // Project 인스턴스를 일반 객체 형태로 변환

    /**
     * 주어진 Date 객체를 'YYYY-MM-DD' 또는 'YYYY-MM-DD HH:MM:SS' 형식의 문자열로 변환합니다.
     * @param {Date} dateObject - 날짜 객체
     * @param {boolean} [detail=false] - 시간까지 포함할지 여부
     * @returns {string} - 포맷된 날짜 문자열
     */
    const dateToString = function (dateObject, detail = false) {
      let dayString = '';  // 변환된 날짜 문자열을 저장할 변수 선언

      // 연도 부분을 추가합니다.
      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';

      // 월 부분을 추가합니다. 한 자리 숫자는 앞에 0을 붙입니다.
      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }

      dayString += '-';

      // 일 부분을 추가합니다. 한 자리 숫자는 앞에 0을 붙입니다.
      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      // detail 옵션이 true인 경우 시간까지 포맷하여 추가합니다.
      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      // 특정 패턴에 따라 날짜 문자열을 변경합니다.
      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;  // 최종 포맷된 날짜 문자열 반환
    }

    // 결과를 담을 배열 선언 및 초기화
    let tong = [];
    let temp;

    // 프로젝트 객체에서 필요한 데이터를 구조분해 할당으로 추출
    const { proid, cliid, desid } = project;
    const { status, action } = project.process;
    const { photo: { boo: photoBoo, status: photoStatus, date: contentsPhotoDate, info: { photographer, interviewer } }, raw: { portfolio: { status: rawPortfolioStatus, link: rawPortfolioLink }, interview: { status: rawInterviewStatus, link: rawInterviewLink }, photo: { status: rawPhotoStatus, link: rawPhotoLink } }, share: { client: { photo: shareClientPhoto, contents: shareClientContents }, designer: { photo: shareDesignerPhoto, contents: shareDesignerContents } } } = project.contents;

    // 중간 데이터 객체 초기화 및 데이터 추가
    temp = {};
    temp.standard = {
      proid
    };

    temp.middle = {
      cliid,
      desid,
    };

    temp.info = {
      status,
      action,
      photoBoo,
      photoStatus,
      contentsPhotoDate: dateToString(contentsPhotoDate),
      photographer,
      interviewer,
      rawPortfolioStatus,
      rawPortfolioLink: QueryString.escape(rawPortfolioLink),
      rawInterviewStatus,
      rawInterviewLink: QueryString.escape(rawInterviewLink),
      rawPhotoStatus,
      rawPhotoLink: QueryString.escape(rawPhotoLink),
      shareClientPhoto: dateToString(shareClientPhoto),
      shareClientContents: dateToString(shareClientContents),
      shareDesignerPhoto: dateToString(shareDesignerPhoto),
      shareDesignerContents: dateToString(shareDesignerContents),
    };

    tong.push(temp);  // 결과 배열에 추가

    return tong;  // 최종 결과 배열 반환
  }

  /**
   * Project 클래스에 dimensionSqueeze 메서드를 추가합니다.
   * 이 메서드는 flatDeath 메서드의 결과를 기반으로 데이터를 축약된 형태로 정리하여 반환합니다.
   */
  Project.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath();  // flatDeath 메서드의 결과를 가져옵니다.
    let result, tempObj;

    result = [];
    for (let { standard, middle, info } of tong) {
      tempObj = {};
      for (let i in standard) {
        tempObj[i] = standard[i];
      }
      for (let i in middle) {
        tempObj[i] = middle[i];
      }
      for (let i in info) {
        tempObj[i] = info[i];
      }
      result.push(tempObj);
    }

    return result;  // 최종 결과 배열 반환
  }

  /**
   * 프로젝트의 평균 데이터를 나타내는 클래스입니다.
   * @param {Object} obj - 평균 데이터를 포함하는 객체
   */
  const Average = function (obj) {
    this.proid = obj.proid;
    this.cliid = obj.cliid;
    this.average = obj.average;
    this.averageRaw = obj.averageRaw;
    this.contract = obj.contract;
    this.length = obj.length;
  }

  /**
   * Project 클래스에 returnAverage 메서드를 추가합니다.
   * 이 메서드는 제안서의 평균 금액을 계산하여 Average 객체로 반환합니다.
   */
  Project.prototype.returnAverage = function () {
    /**
     * 주어진 숫자를 만 단위로 자르고, 콤마로 구분합니다.
     * @param {number} num - 숫자
     * @returns {string} - 포맷된 문자열
     */
    const moneyParsing = function (num) {
      let str = String(Math.round(num));
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3);
      }
      return `${str}만원`;  // "만원" 단위를 추가하여 반환
    }

    let result, total, pageNumber;

    total = 0;
    pageNumber = 0;
    for (let { fee } of this.proposal.detail) {
      for (let { amount } of fee) {
        total += amount;
        pageNumber++;
      }
    }

    result = {
      proid: this.proid,
      cliid: this.cliid,
      average: moneyParsing((total / pageNumber) / 10000),  // 평균 금액을 계산하고 포맷
      averageRaw: total / pageNumber,
      contract: (/^d/.test(this.desid) && this.process.status !== "드랍" && this.process.status !== "홀딩"),  // 특정 조건을 만족하는지 확인
      length: pageNumber,
    };

    return new Average(result);  // Average 객체를 생성하여 반환
  }

  return Project;  // 수정된 Project 클래스를 반환
}

/**
 * Projects 클래스에 다양한 메서드를 추가하는 함수입니다.
 * @param {Projects} Projects - 확장할 Projects 클래스
 * @returns {Projects} - 확장된 Projects 클래스
 */
const withToolsArr = function (Projects) {

  /**
   * 평균 데이터를 저장하고 보고서를 생성하는 클래스입니다.
   * @extends Array
   */
  class AverageTong extends Array {
    /**
     * 평균 데이터를 기반으로 보고서를 생성합니다.
     * @returns {Object} - 평균 데이터를 포함하는 보고서 객체
     */
    averageReport() {
      // 금액을 "만원" 단위로 포맷하는 함수
      const moneyParsing = function (num) {
        let str = String(Math.round(num));
        if (str.length > 3) {
          str = str.slice(0, -3) + ',' + str.slice(-3);
        }
        return `${str}만원`;
      }

      let result, total, contractNum, contractProposalTotal;
      let proidArr, cliidArr;

      total = 0;
      contractNum = 0;
      contractProposalTotal = 0;
      proidArr = [];
      cliidArr = [];

      // 배열의 각 요소에 대해 평균 데이터를 계산합니다.
      for (let { proid, cliid, averageRaw, contract } of this) {
        total += averageRaw;
        if (contract) {
          contractNum++;
          contractProposalTotal += averageRaw;
        }
        proidArr.push(proid);
        cliidArr.push(cliid);
      }

      result = { proidArr, cliidArr };
      result.proposal = proidArr.length;
      result.contract = contractNum;
      result.average = {};

      // 제안서 평균을 계산합니다.
      if (this.length === 0) {
        result.average.proposal = "0만원";
      } else {
        result.average.proposal = moneyParsing((total / this.length) / 10000);
      }

      // 계약 평균을 계산합니다.
      if (contractNum === 0) {
        result.average.contract = "0만원";
      } else {
        result.average.contract = moneyParsing((contractProposalTotal / contractNum) / 10000);
      }

      return result;
    }
  }

  /**
   * Projects 클래스에 flatDeath 메서드를 추가합니다.
   * 각 Project 인스턴스에 대해 flatDeath 메서드를 호출하고 결과를 결합합니다.
   * @returns {Array} - 가공된 데이터의 배열
   */
  Projects.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  /**
   * Projects 클래스에 planeDeath 메서드를 추가합니다.
   * 각 Project 인스턴스에 대해 planeDeath 메서드를 호출하고 결과를 결합합니다.
   * @returns {Array} - 간략화된 데이터의 배열
   */
  Projects.prototype.planeDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.planeDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  /**
   * Projects 클래스에 returnAverage 메서드를 추가합니다.
   * 각 Project 인스턴스에 대해 returnAverage 메서드를 호출하고 결과를 AverageTong 객체에 저장합니다.
   * @returns {AverageTong} - 평균 데이터를 저장한 객체
   */
  Projects.prototype.returnAverage = function () {
    let tong;
    tong = new AverageTong();
    for (let i of this) {
      tong.push(i.returnAverage());
    }
    return tong;
  }

  /**
   * Projects 클래스에 dimensionSqueeze 메서드를 추가합니다.
   * 각 Project 인스턴스에 대해 dimensionSqueeze 메서드를 호출하고 SQL 관련 데이터를 생성합니다.
   * @returns {Object|null} - SQL 모델과 데이터 객체, 또는 null
   */
  Projects.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "project";  // 테이블 이름을 지정
    const LONG_TARGETS = [];  // TEXT 타입으로 지정할 필드 리스트

    /**
     * SQL 테이블 모델을 생성하는 클래스입니다.
     */
    class SqlModel {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)";
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)";
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)";
          } else {
            this[i] = "VARCHAR(255)";
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT";
          }
        }
      }

      // 테이블 이름을 반환하는 메서드
      getName() {
        return TABLE_NAME;
      }

      // 테이블 생성 SQL 문을 생성하는 메서드
      getCreateSql() {
        let sql = "CREATE TABLE \`" + this.getName() + "\` (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\` ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql;
      }

      // 테이블 삭제 SQL 문을 생성하는 메서드
      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql;
      }
    }

    /**
     * SQL 삽입 문을 생성하는 배열 클래스를 정의합니다.
     * @extends Array
     */
    class SqlTong extends Array {
      getName() {
        return TABLE_NAME;
      }

      // 각 요소의 삽입 SQL 문을 반환하는 메서드
      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql());
        }
        return arr;
      }
    }

    /**
     * 각 데이터 요소를 SQL 삽입 문으로 변환하는 클래스입니다.
     */
    class SqlTongFactor {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "boolean") {
            this[i] = sample[i] ? 1 : 0;
          } else {
            this[i] = JSON.stringify(sample[i]);
          }
        }
      }

      // 테이블 이름을 반환하는 메서드
      getName() {
        return TABLE_NAME;
      }

      /**
       * 현재 객체의 데이터를 기반으로 MySQL INSERT SQL 문을 생성하는 메서드입니다.
       * @returns {string} - 생성된 INSERT SQL 문
       */
      getInsertSql() {
        // SQL INSERT 문을 생성하기 위해 초기 SQL 문자열을 생성합니다.
        let sql = "INSERT INTO `" + this.getName() + "` (";  // 테이블 이름을 포함한 INSERT 문 시작 부분 생성

        // 객체의 각 필드를 순회하며 INSERT 문에 들어갈 필드 이름을 추가합니다.
        for (let i in this) {  // 객체의 각 프로퍼티에 대해 반복
          sql += "`";  // 필드 이름 앞에 백틱(`) 추가 (SQL 구문에서 필드 이름을 감싸기 위해 사용)
          sql += i;  // 현재 필드 이름을 추가
          sql += "`";  // 필드 이름 뒤에 백틱(`) 추가
          sql += ",";  // 다음 필드를 위한 쉼표 추가
        }

        // 마지막 쉼표를 제거하여 SQL 구문 오류를 방지합니다.
        sql = sql.slice(0, -1);  // 마지막 쉼표를 제거
        sql += ") VALUES (";  // 필드 이름 섹션을 닫고, VALUES 섹션을 시작

        // 객체의 각 필드 값에 대해, 필드 타입에 맞는 형식으로 SQL 값을 추가합니다.
        for (let i in this) {  // 객체의 각 프로퍼티에 대해 반복
          if (typeof this[i] === "number") {  // 필드 값이 숫자인 경우
            sql += this[i];  // 숫자 그대로 추가
          } else {  // 필드 값이 문자열인 경우
            // 날짜 형식인지 확인하고, SQL의 날짜 형식에 맞게 변환하여 추가합니다.
            if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gi.test(this[i])) {  // YYYY-MM-DD 형식의 날짜인 경우
              sql += "STR_TO_DATE('";  // MySQL의 날짜 형식으로 변환하기 위한 구문 시작
              sql += this[i].replace(/'/g, '"');  // 날짜 값을 추가하고, 작은 따옴표(')를 큰 따옴표(")로 변환
              sql += "', '%Y-%m-%d')";  // MySQL 날짜 형식으로 변환하는 구문 종료
            } else if (/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/gi.test(this[i])) {  // YYYY-MM-DD HH:MM:SS 형식의 날짜인 경우
              sql += "STR_TO_DATE('";  // MySQL의 날짜와 시간 형식으로 변환하기 위한 구문 시작
              sql += this[i].replace(/'/g, '"');  // 날짜 및 시간 값을 추가하고, 작은 따옴표(')를 큰 따옴표(")로 변환
              sql += "', '%Y-%m-%d %H:%i:%s')";  // MySQL 날짜와 시간 형식으로 변환하는 구문 종료
            } else {  // 일반 문자열인 경우
              sql += "'";  // 문자열을 작은 따옴표(')로 감싸기 위한 시작 부분 추가
              sql += this[i].replace(/'/g, '"');  // 문자열 값 추가, 작은 따옴표(')를 큰 따옴표(")로 변환
              sql += "'";  // 문자열을 작은 따옴표(')로 감싸기 위한 종료 부분 추가
            }
          }
          sql += ",";  // 다음 값을 위한 쉼표 추가
        }

        // 마지막 쉼표를 제거하여 SQL 구문 오류를 방지합니다.
        sql = sql.slice(0, -1);  // 마지막 쉼표를 제거
        sql += ");";  // VALUES 섹션을 닫고, SQL 문 종료

        // 완성된 SQL INSERT 문을 반환합니다.
        return sql;
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    for (let i of this) {
      tempArr = i.dimensionSqueeze();
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j));
      }
    }

    if (tong.length > 0) {
      sample = tong[0];
      model = new SqlModel(sample);
      return { model, data: tong };
    } else {
      return null;
    }
  }

  /**
   * 주어진 프로젝트 ID로 Project를 검색하는 메서드입니다.
   * @param {string} proid - 프로젝트 ID
   * @returns {Project|null} - 검색된 Project 객체 또는 null
   */
  Projects.prototype.search = function (proid) {
    let result = null;
    for (let i of this) {
      if (i.proid === proid) {
        result = i;
        break;
      }
    }
    return result;
  }

  /**
   * 주어진 고객 ID로 Project를 검색하는 메서드입니다.
   * @param {string} cliid - 고객 ID
   * @param {boolean} isContract - 계약 여부를 필터링하는 옵션
   * @returns {Project|Array|null} - 검색된 Project 객체 또는 null, 또는 계약된 Project 배열
   */
  Projects.prototype.searchByCliid = function (cliid, isContract = false) {
    // cliid가 undefined인 경우 오류를 발생시킵니다.
    if (cliid === undefined) {
      throw new Error("must be cliid");
    }
  
    let result = null; // 기본 결과값을 null로 초기화합니다.
    let final = null;  // 계약된 프로젝트를 담을 배열을 초기화합니다.
  
    // isContract가 false인 경우, 고객 ID로 단일 프로젝트를 검색합니다.
    if (!isContract) {
      for (let i of this) {  // 현재 Projects 인스턴스의 모든 프로젝트를 순회합니다.
        if (i.cliid === cliid) {  // 프로젝트의 cliid가 매개변수로 받은 cliid와 일치하는지 확인합니다.
          result = i;  // 일치하는 프로젝트를 result에 저장합니다.
          break;  // 검색이 끝나면 반복문을 종료합니다.
        }
      }
      return result;  // 검색된 프로젝트를 반환합니다. 찾지 못하면 null을 반환합니다.
    } else {
      // isContract가 true인 경우, 계약된 프로젝트를 검색합니다.
      result = [];  // 계약된 프로젝트를 저장할 배열을 초기화합니다.
  
      for (let i of this) {  // 현재 Projects 인스턴스의 모든 프로젝트를 순회합니다.
        // 프로젝트의 desid가 'd'로 시작하는지 확인하여 계약된 프로젝트인지 필터링합니다.
        if (/^d/.test(i.desid)) {
          if (i.cliid === cliid) {  // 프로젝트의 cliid가 매개변수로 받은 cliid와 일치하는지 확인합니다.
            result.push(i);  // 일치하는 프로젝트를 result 배열에 추가합니다.
          }
        }
      }
  
      final = [];  // 최종적으로 반환할 계약된 프로젝트를 저장할 배열을 초기화합니다.
  
      for (let i of result) {  // 계약된 프로젝트로 필터링된 result 배열을 순회합니다.
        // 계약 날짜가 2000년 1월 1일 이후인지 확인하여 유효한 계약만 필터링합니다.
        if (i.process.contract.first.date.valueOf() > (new Date(2000, 0, 1).valueOf())) {
          final.push(i);  // 조건에 맞는 프로젝트를 final 배열에 추가합니다.
        }
      }
  
      return final;  // 최종적으로 필터링된 계약된 프로젝트 배열을 반환합니다.
    }
  }

  return Projects;  // 수정된 Projects 클래스를 반환
}

module.exports = { ProjectMap, Project, Projects, Tools: { withTools, withToolsArr } };
