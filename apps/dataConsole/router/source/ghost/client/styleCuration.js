/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 서비스 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 서비스 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleCuration",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

class StyleCurationWordings {
  constructor() {
    this.wordings = {
      init: {
        curation: {
          title: [
            "홈리에종",
            "큐레이션",
          ],
          contents: [
            [
              "홈리에종은 체계화된 정보과 취향 분석 기능을",
              "활용해서 <b%고객님의 스타일과 조건에 딱 맞는%b>",
              "<b%서비스를 제안하고, 디자이너를 추천%b>해드립니다.",
            ],
            [
              "아래 간단한 상세 큐레이팅 설문에 응답해주시면",
              "<b%예상 서비스 및 서비스 금액%b>을 알려드릴 수 있으니,",
              "작성 부탁드립니다. 감사합니다!",
            ]
          ],
          image: [
            "/secondConsulting.jpg",
            "/secondConsultingb.jpg",
            "/secondConsultingc.jpg",
          ]
        },
        service: {
          title: [
            "홈리에종",
            "서비스 소개",
          ],
          contents: [
            [
              "일단 시공부터 하는 방식이 아닌, 생활을 고려해",
              "<b%디자인 및 기획을 먼저 하고 시공 범위를%b>",
              "<b%함께 고민해 정한 후 인테리어를 진행%b>합니다.",
            ],
            [
              "늘 앉아 있는 소파, 식사마다 머무는 식탁,",
              "햇빛을 가려주는 커튼, 살이 맞닿는 베딩까지.",
              "새로운 방식으로 나에게 맞는 집을 만들어 보세요!",
            ]
          ],
          image: [
            "/secondConsulting2.jpg",
            "/secondConsulting2b.jpg",
            "/secondConsulting2c.jpg",
          ]
        }
      },
      center: [
        {
          name: "style",
          title: "스타일",
          callback: "styleCheck",
          children: [
            {
              type: "style",
              half: false,
              question: [
                "선호하는 스타일을 <b%3장%b> 골라주세요!",
              ],
            }
          ]
        },
        {
          name: "space",
          title: "공간",
          callback: "blockCheck",
          children: [
            {
              type: "address",
              half: false,
              question: [
                "<b%스타일링 받으실 곳의 주소가 맞나요?%b>",
                "아니라면, 스타일링 받을 곳으로 고쳐주세요!"
              ],
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "해당 거주지의 <b%건물 유형%b>을 알려주세요!"
              ],
              items: [
                "아파트",
                "오피스텔",
                "타운하우스",
                "빌라",
                "단독 주택"
              ],
              multiple: false,
              exception: function (items, media) {
                const ea = "px";
                const mobile = media[4];
                const desktop = !mobile;
                let padding, subtract;
                let paddingLeft, left;
                if (desktop) {
                  padding = Number(items[4].style.paddingLeft.replace(/[^0-9\.\-]/g, ''));
                  subtract = items[2].getBoundingClientRect().width - items[4].getBoundingClientRect().width;
                  items[4].style.width = String(items[2].getBoundingClientRect().width - padding) + ea;
                  items[4].children[1].style.left = String(Number(items[4].children[1].style.left.replace(/[^0-9\.\-]/g, '')) + subtract) + ea;
                } else {
                  paddingLeft = 5.6;
                  left = paddingLeft - 1.2 - 1;
                  for (let dom of items) {
                    dom.style.paddingLeft = String(paddingLeft) + "vw";
                    dom.lastChild.style.left = String(left) + "vw";
                    items[4].children[0].textContent = "주택";
                  }
                }
              }
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "적어주신 <b%평수가 분양 면적 기준%b>이 맞나요?"
              ],
              items: [
                "분양 면적 (공급 면적)",
                "전용 면적",
              ],
              multiple: false,
            },
          ]
        },
        {
          name: "furniture",
          title: "가구",
          callback: "blockCheck",
          children: [
            {
              type: "opposite",
              half: false,
              question: [
                "가구와 소품의 <b%기존 제품 구매와 재사용의%b>",
                "<b%비율%b>을 알려주세요!"
              ],
              items: [
                "재사용",
                "새로 구입",
              ],
              total: 100,
              ea: '%',
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "<b%맞춤형 제작 가구 니즈%b>가 있으신가요?"
              ],
              items: [
                "있다",
                "없다",
                "모르겠다",
              ],
              multiple: false,
              notice: "맞춤형 제작 가구 : 신발장, 붙박이장 등, 디자인 제작 가구 : 거실장, 서재 책장, 윈도우 시트 등",
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "<b%커튼, 베딩 패브릭 제작 니즈%b>가 있으신가요?"
              ],
              items: [
                "있다",
                "없다",
                "모르겠다",
              ],
              multiple: false,
            },
          ]
        },
        {
          name: "construct",
          title: "시공",
          callback: "blockCheck",
          children: [
            {
              type: "checkbox",
              half: false,
              question: [
                "<b%생각하는 시공 정도%b>를 알려주세요!",
              ],
              multiple: true,
              items: [
                "시공 없이 홈퍼니싱만",
                "5개 이내의 부분 시공과 홈퍼니싱",
                "전체 리모델링과 전체 스타일링",
                "구조 변경을 포함한 고급 시공"
              ],
              exception: function (items, media) {
                const mother = items[0].parentNode;
                const grandMother = mother.parentNode;
                const mobile = media[4];
                const desktop = !mobile;
                let ratio = 30;
                if (media[3]) {
                  ratio = 40;
                }
                if (desktop) {
                  grandMother.firstChild.style.width = String(ratio) + '%';
                  grandMother.lastChild.style.width = String(100 - ratio) + '%';
                } else {
                  mother.style.textAlign = "left";
                  mother.style.left = String(-0.4) + "vw";
                  mother.style.paddingTop = String(0.5) + "vw";
                }
              }
            },
            {
              type: "list",
              half: false,
              question: [
                "생각하고 있는 <b%시공이 있으시다면 체크%b>해주세요!"
              ],
              items: [
                { name: "철거", contents: "마감재, 벽지 등 일부" },
                { name: "전기/조명 공사", contents: "배선, 이동추가, 조명 교체" },
                { name: "설비", contents: "수도/배관, 난방, 에어컨 배관" },
                { name: "주방 공사", contents: "싱크 등 주방 가구 전체 교체" },
                { name: "창호 공사", contents: "방문, 중문" },
                { name: "도장 공사", contents: "부분 페인팅, 탄성코트 등" },
                { name: "바닥 공사", contents: "마루, 타일, 장판 등" },
                { name: "금속 공사", contents: "" },
                { name: "목공사", contents: "간접등 박스, 웨인스 코팅 등" },
                { name: "욕실 공사", contents: "도기 교체 등" },
                { name: "샤시", contents: "" },
                { name: "필름 공사", contents: "면적 및 난이도에 따라 금액 상이" },
                { name: "철거", contents: "마감재, 벽지 등 일부" },
                { name: "발코니 확장", contents: "거실, 주방, 방 등 확장 예정 발코니" },
                { name: "타일 공사", contents: "현관, 주방, 다용도실, 발코니 등" },
                { name: "도배 공사", contents: "이전 상태에 따라 밑작업 난이도 상이" },
              ],
              multiple: true,
            },
            {
              type: "checkbox",
              half: false,
              question: [
                "시공 당일에 예상되는 <b%주거 환경을 알려주세요!%b>"
              ],
              items: [
                "거주중, 가구가 있는 상태",
                "공실 상태",
              ],
              multiple: false,
              notice: "거주중일 경우 시공에 한계가 있습니다.",
              exception: function (items, media) {
                const ea = "px";
                const mobile = media[4];
                const desktop = !mobile;
                if (desktop) {
                  items[0].style.marginRight = String(20) + ea;
                }
              }
            },
          ]
        },
      ],
      pannel: {
        button: "서비스 금액 알아보기"
      }
    };

  }

  get initWordings() {
    return this.wordings.init;
  }

  get centerWordings() {
    return this.wordings.center;
  }

  get pannelWordings() {
    return this.wordings.pannel;
  }
}

class WordsDictionary {
  getServiceWording() {
    let obj;
    obj = {
      service: {
        name: "서비스 추천",
        contents: [
          {
            name: "홈퍼니싱",
            image: "/service0.jpg",
          },
          {
            name: "홈스타일링",
            image: "/service1.jpg",
          },
          {
            name: "토탈 스타일링",
            image: "/service2.jpg",
          },
          {
            name: "엑스트라 스타일링",
            image: "/service3.jpg",
          },
        ]
      },
      fee: {
        name: "예상 디자인비",
        contents: [
          {
            name: "고객님의\n예상 디자인비는"
          }
        ]
      },
      methods: {
        name: "서비스 종류",
        contents: [
          {
            name: "홈퍼니싱",
            contents: "시공은 전혀 없이 기성 가구, 패브릭, 소품 등으로 제안",
            children: [
              "위치 변동 없는 조명 교체 포함",
              "빌트인 가구 제작은 시공에 포함, 빌트인 가구 제작 시 홈스타일링 유형"
            ],
            amount: 45,
            mobileLeft: 10.6,
          },
          {
            name: "홈스타일링",
            contents: "욕실, 싱크대 교체를 제외한 최소 시공에 스타일링 마무리",
            children: [
              "철거 제외 5가지 이하의 공정이 포함되는 경우",
              "공정 예시 : 도배, 필름, 중문, 조명 교체, 냉장고장 리폼, 타일 덧방 등",
              "고객님이 알아보신 시공사, 홈리에종 시공사 중에 선택 가능",
            ],
            amount: 60,
            mobileLeft: 13.2,
          },
          {
            name: "토탈 스타일링",
            contents: "욕실, 싱크대 교체를 포함한 전체 시공에 스타일링 마무리",
            children: [
              "욕실 혹은 싱크대 교체 중 한 가지라도 해당하는 경우",
              "철거 제외 6가지 이상의 공정이 포함되는 경우",
              "공정 예시 : 목공사, 도배, 필름, 목공사, 중문, 조명 교체, 가구 제작, 타일, 금속 등",
              "고객님이 알아보신 시공사, 홈리에종 시공사 혹은 디자이너 시공사에서 시공 가능 (디자이너에 따라 가능한 방식이 다름)"
            ],
            amount: 75,
            mobileLeft: 16.1,
          },
          {
            name: "엑스트라 스타일링",
            contents: "설계 변경을 포함한 전체 시공에 스타일링 마무리",
            children: [
              "주방 구조 변경, 알파룸 혹은 발코니 디자인, 게이트 등 공간에 따른 디자인 시공",
              "홈리에종 시공사 혹은 디자이너 시공사에서 시공 가능 (디자이너에 따라 가능한 방식이 다름)",
            ],
            amount: 90,
            mobileLeft: 20.9,
          },
        ]
      },
      process: {
        name: "전체 프로세스",
        contents: [
          {
            name: "계약 프로세스",
            contents: [
              "신청서 접수",
              "HL 전화 상담",
              "디자이너 추천 및 선택",
              "계약금 입금 (330,000원)",
              "디자이너와 현장 미팅",
              "계약서 작성 및 잔금 입금"
            ],
          },
          {
            name: "디자인 프로세스",
            contents: [
              "디자인 (2주 ~ 4주)",
              "고객 피드백",
              "수정 제안",
            ]
          },
          {
            name: "시공 프로세스",
            contents: [
              "시공 범위 지정",
              "시공 견적",
              "시공 계약",
              "시공 금액 입금 (4회 분할)",
              "마감재 선택",
              "시공 진행",
            ]
          },
          {
            name: "구매 프로세스",
            contents: [
              "구매 진행",
              "구매 상황 체크",
              "추가 항목 점검",
            ]
          },
          {
            name: "컨텐츠 프로세스",
            contents: [
              "현장 촬영",
              "고객 인터뷰",
              "사진 공유",
              "컨텐츠 공유"
            ]
          },
        ]
      }
    };
    return obj;
  }

  getAdditionWording() {
    let obj;
    obj = {
      image: "serviceDiagram",
      wordings: [
        [
          {
            title: [
              "<b%한 명의 디자이너가%b>",
              "처음부터 끝까지"
            ],
            contents: [
              "무엇보다 <b%홈스타일링 디자이너가 프로젝트의 총괄 관리자%b>가 되어, 공간 기획부터 시공 범위 계획, 그리고 구매 계획까지 한 번에",
              "진행해주기에, 인테리어 산업에서 흔히 일어나는 작업 혼선과 책임 회피, 관리 떠넘기기 등의 난처한 상황들을 만나지 않을 수 있으며",
              "우리집과 내 생활에 딱 맞게 최적화된 형태로 인테리어 프로젝트가 진행될 수 있어 가장 합리적이고 효과적인 결과를 낼 수 있습니다."
            ]
          },
          {
            title: [
              "<b%홈리에종 플랫폼과%b>",
              "안정감 있게"
            ],
            contents: [
              "홈리에종에서는 다양한 스타일의 포트폴리오와 홈스타일링 디자이너를 한 번에 만나보실 수 있습니다! 전담 디자이너를",
              "만나서 시공사를 결정하세요. <b%디자이너의 감성에 홈리에종의 지원을 더해 현실적으로 후회 없는 인테리어를 경험%b>하세요!",
              "홈리에종은 고객님들의 실제 생활을 위한 디자인으로 바꾸어, 공간이 줄 수 있는 풍성함과 편안함을 전하고자 합니다."
            ]
          }
        ],
        [
          {
            title: [
              "<b%한 명의 디자이너가%b>",
              "처음부터 끝까지"
            ],
            contents: [
              "무엇보다 <b%홈스타일링 디자이너가 프로젝트의 총괄 관리자%b>가 되어, 공간 기획부터 시공 범위 계획, 그리고 구매 계획까지 한 번에",
              "진행해주기에, 인테리어 산업에서 흔히 일어나는 작업 혼선과 책임 회피, 관리 떠넘기기 등의 난처한 상황들을 만나지 않을 수 있으며",
              "우리집과 내 생활에 딱 맞게 최적화된 형태로 인테리어 프로젝트가 진행될 수 있어 가장 합리적이고 효과적인 결과를 낼 수 있습니다."
            ]
          },
          {
            title: [
              "<b%홈리에종 플랫폼과%b>",
              "안정감 있게"
            ],
            contents: [
              "홈리에종에서는 다양한 스타일의 포트폴리오와 홈스타일링 디자이너를 한 번에 만나보실 수 있습니다! 전담 디자이너를",
              "만나서 시공사를 결정하세요. <b%디자이너의 감성에 홈리에종의 지원을 더해 현실적으로 후회 없는 인테리어를 경험%b>하세요!",
              "홈리에종은 고객님들의 실제 생활을 위한 디자인으로 바꾸어, 공간이 줄 수 있는 풍성함과 편안함을 전하고자 합니다."
            ]
          }
        ],
        [
          {
            title: [
              "<b%한 명의 디자이너가%b>",
              "처음부터 끝까지"
            ],
            contents: [
              "<b%홈스타일링 디자이너가 프로젝트의 총괄 관리자%b>가 되어, 기획부터 시공 범위 계획, 구매 계획까지 한 번에",
              "진행해주기에, 흔히 일어나는 작업 혼선과 책임 회피, 관리 떠넘기기 등 난처한 상황들을 만나지 않을 수 있으며",
              "우리집에 최적화된 형태로 프로젝트가 진행될 수 있어 가장 합리적이고 효과적인 결과를 낼 수 있습니다."
            ]
          },
          {
            title: [
              "<b%홈리에종 플랫폼과%b>",
              "안정감 있게"
            ],
            contents: [
              "홈리에종에서는 다양한 포트폴리오와 디자이너를 한 번에 만나보실 수 있습니다! 디자이너를 만나",
              "시공사를 결정하세요. <b%디자이너의 감성에 홈리에종의 지원을 더해 후회 없는 인테리어를 경험%b>하세요!",
              "홈리에종은 고객님의 실생활을 위한 디자인으로 공간이 줄 수 있는 풍성함과 편안함을 전하고자 합니다."
            ]
          }
        ],
        [
          {
            title: [
              "<b%한 명의 디자이너가%b>",
              "처음부터 끝까지"
            ],
            contents: [
              "<b%홈스타일링 디자이너가 프로젝트 관리자%b>가 되어, 기획부터 시공, 구매 계획까지 한 번에",
              "진행해주어, 흔히 일어나는 작업 혼선과 책임 회피 등 난처한 상황들을 만나지 않을 수 있고",
              "우리집에 최적화된 형태로 진행할 수 있어 합리적이고 효과적인 결과를 낼 수 있습니다."
            ]
          },
          {
            title: [
              "<b%홈리에종 플랫폼과%b>",
              "안정감 있게"
            ],
            contents: [
              "홈리에종에서는 다양한 포트폴리오와 디자이너를 한 번에 만나보실 수 있습니다!",
              "<b%디자이너의 감성에 홈리에종의 지원을 더해 후회 없는 인테리어를 경험%b>하세요.",
              "홈리에종은 고객님을 위한 디자인으로 공간이 줄 수 있는 풍성함을 전하고자 합니다."
            ]
          }
        ],
        [
          {
            title: [
              "<b%한 명의 디자이너가%b>",
              "처음부터 끝까지"
            ],
            contents: [
              "<b%디자이너가 프로젝트 관리자%b>가 되어, 기획, 시공, 구매 계획까지 한 번에",
              "진행해, 흔히 일어나는 작업 혼선과 책임 회피 등 난처한 상황들을 만나지 않을 수 있고",
              "집에 최적화된 형태로 진행할 수 있어 합리적이고 효과적인 결과를 낼 수 있습니다."
            ]
          },
          {
            title: [
              "<b%홈리에종 플랫폼과%b>",
              "안정감 있게"
            ],
            contents: [
              "홈리에종에서는 다양한 디자이너를 한 번에 만나보실 수 있습니다!",
              "<b%디자이너의 감성에 홈리에종 지원을 더해 후회 없는 인테리어를 경험%b>하세요.",
              "홈리에종은 고객님을 위한 디자인으로 공간이 줄 수 있는 풍성함을 편안함을 전하고자 합니다."
            ]
          }
        ],
      ]
    };

    return obj;
  }

}

Set.prototype.intersection = function(setB) {
  let intersection = new Set();
  for (let elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

Set.prototype.union = function(setB) {
  let union = new Set(this);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
}

const StyleCurationJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

StyleCurationJs.binaryPath = "/middle/curation";

StyleCurationJs.randomPick = function (photos, contentsArr, pictureNumber, roomsIntersection = false) {
  if (typeof photos !== "object" || typeof contentsArr !== "object" || typeof pictureNumber !== "number" || typeof roomsIntersection !== "boolean") {
    throw new Error("invaild input");
  }
  const photoLength = photos.length;
  const conidArr = Array.from(new Set(photos.map((obj) => { return obj.conid })));
  const standard = 50;
  let randoms;
  let randomPick, contentsPick;
  let temp, temp2, tempArr;
  let rooms, room;
  let accumulation;
  let num, num2;

  num2 = 0;
  do {
    if (num >= standard) {
      break;
    }
    do {
      temp = [];
      num = 0;
      while (num < standard + pictureNumber) {
        if (temp.length === pictureNumber) {
          break;
        }
        temp2 = Math.floor(Math.random() * conidArr.length);
        if (num < standard) {
          if (!temp.includes(temp2) && conidArr.length >= temp2) {
            temp.push(temp2);
          }
        } else {
          if (conidArr.length >= temp2) {
            temp.push(temp2);
          }
        }
        num++;
      }
      temp.sort((a, b) => { return a - b; });
      randoms = [];
      for (let n of temp) {
        randoms.push(conidArr[n]);
      }
      contentsPick = [];
      for (let conid of randoms) {
        for (let obj of contentsArr) {
          if (conid === obj.conid) {
            contentsPick.push(obj);
          }
        }
      }
      rooms = [];
      for (let obj of contentsPick) {
        tempArr = [];
        for (let { title } of obj.contents.portfolio.contents.detail) {
          if (title !== "init") {
            tempArr.push(title);
          }
        }
        rooms.push(tempArr);
      }
      accumulation = [];
      for (let arr of rooms) {
        tempArr = [];
        for (let a of arr) {
          if (roomsIntersection) {
            if (!accumulation.includes(a)) {
              tempArr.push(a);
            }
          } else {
            tempArr.push(a);
          }
        }
        if (tempArr.length > 0) {
          room = tempArr[Math.floor(Math.random() * tempArr.length)];
          accumulation.push(room);
        }
      }
    } while (accumulation.length !== randoms.length);
    randomPick = [];
    for (let i = 0; i < randoms.length; i++) {
      for (let obj of photos) {
        if (obj.conid === randoms[i] && obj.room === accumulation[i] && obj.gs === 'g') {
          randomPick.push(obj);
          break;
        }
      }
    }
    num2++;
  } while (randomPick.length !== pictureNumber);
  return randomPick;
}

StyleCurationJs.photoFilter = function (photos, picks) {
  if (typeof photos !== "object" || !Array.isArray(picks)) {
    throw new Error("invaild input");
  }
  if (picks.length < 3) {
    throw new Error("invaild picks");
  }
  const ratio = 0.7;
  const [ pick0, pick1, pick2 ] = picks;
  let threePick;
  let set0, set1, set2;
  let tendencyMatrix;
  let files;

  files = [];
  for (let obj of picks) {
    files.push(obj.file);
  }

  set0 = new Set(pick0.keywords);
  set1 = new Set(pick1.keywords);
  set2 = new Set(pick2.keywords);

  threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)));
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set0));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set1));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set2));
  }

  photos = photos.filter((obj) => { return obj.keywords.some((s) => { return threePick.includes(s); }) });
  photos = photos.filter((obj) => { return !files.includes(obj.file); });

  tendencyMatrix = new Array(pick0.tendency.length);
  for (let i = 0; i < tendencyMatrix.length; i++) {
    tendencyMatrix[i] = Math.round(((pick0.tendency[i] + pick1.tendency[i] + pick2.tendency[i]) / 3) * 100) / 100;
  }

  photos.sort((a, b) => {
    const length = tendencyMatrix.length;
    let sum0, sum1;
    sum0 = 0;
    sum1 = 0;
    for (let i = 0; i < length; i++) {
      sum0 += Math.abs(a.tendency[i] - tendencyMatrix[i]);
      sum1 += Math.abs(b.tendency[i] - tendencyMatrix[i]);
    }
    sum0 = sum0 / length;
    sum1 = sum1 / length;
    return sum0 - sum1;
  });

  return photos.slice(0, Math.floor(photos.length * ratio));
}

StyleCurationJs.prototype.styleCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, cleanChildren, isMac } = GeneralJs;
  const { photos, contentsArr, designers } = this;
  let pictureNumber, columnNumber;
  let randomPick, targetPhotos;
  let pictureBox;
  let innerMargin;
  let pictureMargin;
  let questionWording;
  let pannelHeight;
  let pannelWordsSize;
  let pannelWordsPadding;
  let pannelLineTop;
  let arrowTop, arrowWidth;

  cleanChildren(mother);

  pictureNumber = <%% 10, 10, 12, 12, 8 %%>;
  columnNumber = <%% 5, 5, 4, 4, 2 %%>;

  innerMargin = <%% 42, 36, 36, 28, 4.5 %%>;
  pictureMargin = <%% 10, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 114, 114, 114, 90, 15.4 %%>;
  pannelPaddingTop = <%% 32, 32, 32, 22, 4.2 %%>;
  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;
  pannelWordsPadding = <%% 16, 16, 16, 12, 16 %%>;
  pannelLineTop = <%% 47, 47, 47, 36, 47 %%>;

  arrowTop = <%% 43, 43, 43, 33, 2 %%>;
  arrowWidth = <%% 10, 10, 10, 8, 2 %%>;

  questionWording = wordings[0].question[0] + " ( 1 / 5 )";

  randomPick = StyleCurationJs.randomPick(photos, contentsArr, pictureNumber);
  this.randomPick = randomPick;
  targetPhotos = randomPick.map((obj) => { return S3HOST + obj.path; });

  mother.style.paddingTop = desktop ? String(innerMargin) + ea : String(0) + ea;
  if (mobile) {
    mother.style.background = "";
    mother.style.boxShadow = "";
  }

  pictureBox = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      marginLeft: desktop ? String(innerMargin) + ea : "",
      width: desktop ? withOut(innerMargin * 2, ea) : "",
    }
  });

  for (let i = 0; i < pictureNumber; i++) {
    createNode({
      mother: pictureBox,
      mode: "img",
      class: [ "hoverDefault_lite" ],
      attribute: [
        { src: targetPhotos[i], },
        { index: String(i) },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const index = Number(this.getAttribute("index"));
            const mother = this.parentNode;
            const motherRect = mother.getBoundingClientRect();
            const rect = this.getBoundingClientRect();
            let radius, circleVisual;
            radius = 22;
            circleVisual = 4;
            createNode({
              mother,
              attribute: [
                { file: instance.randomPick[index].file }
              ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = this.getAttribute("file");
                    let index;
                    index = null;
                    for (let i = 0; i < instance.selectPhotos.length; i++) {
                      if (instance.selectPhotos[i].file === file) {
                        index = i;
                        break;
                      }
                    }
                    if (index !== null) {
                      instance.selectPhotos.splice(index, 1);
                    }
                    mother.removeChild(this);
                  },
                }
              ],
              style: {
                position: "absolute",
                width: String(rect.width) + ea,
                height: String(rect.height) + ea,
                top: String(rect.top - motherRect.top) + ea,
                left: String(rect.left - motherRect.left) + ea,
                borderRadius: String(3) + "px",
                animation: "justfadeinoriginal 0.2s ease forwards",
                cursor: "pointer",
                overflow: "hidden",
                background: colorChip.green,
                "mix-blend-mode": "multiply",
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckCircle(colorChip.white),
                  style: {
                    position: "absolute",
                    width: String(radius * 2) + ea,
                    top: withOut(50, radius + circleVisual, ea),
                    left: withOut(50, radius, ea),
                  }
                }
              ]
            });
            instance.selectPhotos.push(instance.randomPick[index]);
            if (instance.selectPhotos.length >= 3) {
              instance.photos = StyleCurationJs.photoFilter(instance.photos, instance.selectPhotos);
              instance.selectPhotos = [];
              instance.styleCheck(mother.parentNode);
            }
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(100% - " + String(pictureMargin * (columnNumber - 1)) + ea + ") / " + String(columnNumber) + ")",
        height: "auto",
        borderRadius: String(3) + "px",
        marginRight: String(i % columnNumber === (columnNumber - 1) ? 0 : pictureMargin) + ea,
        marginBottom: String(pictureMargin) + ea,
      }
    });
  }

  createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(pannelHeight - pannelPaddingTop) + ea,
      paddingTop: String(pannelPaddingTop) + ea,
      textAlign: "center",
      background: mobile ? colorChip.white : "",
      boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
      borderRadius: mobile ? String(5) + "px" : "",
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          width: withOut(innerMargin * 2, ea),
          left: String(innerMargin) + ea,
          top: String(0) + ea,
          height: String(pannelLineTop) + ea,
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault" ],
        source: this.mother.returnArrow("left", colorChip.green),
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          left: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingRight: String(pannelWordsPadding) + ea,
          background: colorChip.white,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault" ],
        source: this.mother.returnArrow("right", colorChip.green),
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          right: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingLeft: String(pannelWordsPadding) + ea,
          background: colorChip.white,
        }
      },
      {
        text: questionWording,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(pannelWordsSize) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          paddingRight: desktop ? String(pannelWordsPadding) + ea : "",
          paddingLeft: desktop ? String(pannelWordsPadding) + ea : "",
          paddingTop: desktop ? (isMac() ? "" : String(2) + ea) : "",
          background: colorChip.white,
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.green,
        }
      }
    ]
  });

}

StyleCurationJs.prototype.blockCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, isMac } = GeneralJs;
  const token = '_';
  let wordingSize;
  let paddingTop, paddingBottom, marginLeft;
  let blockMother, block;
  let questionMargin;
  let questionArea, answerArea;
  let questionRatio;
  let qWidth;
  let num;
  let lineHeight;
  let blockMargin;
  let addressWordingSize;
  let addressWordingTextTop;
  let addressBottomLineHeight;
  let itemDoms;
  let itemPaddingLeft, itemMarginBottom;
  let itemRadius, itemCircleLeft, itemCircleTop;
  let y, z;
  let barTop, barHeight;
  let barTextTop;
  let bar, barText0, barText1;
  let barTextMargin;
  let barLeft;
  let standardSize;
  let barBox;
  let barClone;
  let barMotherHeight;
  let barButtonTop;
  let barButtonRadius;
  let barButton;
  let thisName;
  let listRightMargin;
  let listBottomMargin;
  let listColumnsLength;
  let listFullWidth;
  let listHypenWidth;
  let listColumWidth, listColumPaddingLeft;
  let listNum;
  let listAreaPaddingTop;
  let listWordingSize;

  lineHeight = 1.6;

  wordingSize = <%% 15, 15, 15, 13, 3.5 %%>;
  standardSize = <%% 13, 13, 13, 13, 2.5 %%>;
  listWordingSize = <%% 14, 13, 12, 12, 3 %%>;

  paddingTop = <%% 38, 36, 36, 28, 7 %%>;
  paddingBottom = <%% 40, 38, 38, 30, 3 %%>;

  if (desktop) {
    if (!isMac()) {
      paddingBottom = paddingBottom - 2;
    }
  }

  marginLeft = <%% 42, 36, 36, 28, 5.5 %%>;
  questionMargin = <%% 50, 30, 30, 15, 2 %%>;
  blockMargin = <%% 28, 28, 28, 20, 7 %%>;
  qWidth = <%% 19, 19, 19, 18, 4 %%>;

  addressWordingTextTop = <%% -1, -1, -1, -1, -1 %%>;
  addressWordingSize = <%% 22, 22, 22, 18, 4 %%>;
  addressBottomLineHeight = <%% 38, 38, 38, 32, 5.5 %%>;

  itemPaddingLeft = <%% 40, 32, 28, 28, 6.8 %%>;
  itemMarginBottom = <%% 5, 5, 5, 5, 1 %%>;

  itemRadius = <%% 3, 3, 3, 3, 0.6 %%>;
  itemCircleLeft = <%% -5, -5, -5, -5, -1 %%>;
  itemCircleTop = <%% 7, 7, 7, 7, 1.9 %%>;

  if (desktop) {
    if (!isMac()) {
      itemCircleTop = itemCircleTop - 1;
    }
  }

  barTop = <%% 16, 16, 16, 16, 1.5 %%>;
  barHeight = <%% 4, 4, 4, 4, 2 %%>;
  barTextTop = <%% 10.5, 10.5, 10.5, 10.5, 4.5 %%>;
  if (desktop) {
    if (!isMac()) {
      barTextTop = barTextTop + 1;
    }
  }
  barTextMargin = <%% 10, 10, 10, 10, 5 %%>;

  barMotherHeight = <%% 30, 30, 30, 30, 5 %%>;

  barButtonTop = <%% 12, 12, 12, 12, 1 %%>;
  barButtonRadius = <%% 5.5, 5.5, 5.5, 5.5, 1.3 %%>;

  listAreaPaddingTop = <%% 13, 13, 13, 13, 1 %%>;
  listRightMargin = <%% 10, 10, 10, 10, 3.6 %%>;
  listBottomMargin = <%% 8, 8, 8, 8, 1 %%>;
  listColumnsLength = <%% 4, 4, 4, 4, 2 %%>;
  listFullWidth = <%% 400, 400, 400, 400, 60 %%>;
  listHypenWidth = <%% 10, 10, 10, 10, 2 %%>;
  listColumWidth = <%% 10, 10, 10, 10, 2 %%>;
  listColumPaddingLeft = <%% 2, 2, 2, 2, 1 %%>;

  mother.style.paddingTop = String(paddingTop) + ea;
  mother.style.paddingBottom = String(paddingBottom) + ea;

  y = 0;
  num = 0;
  for (let obj of wordings) {

    if (obj.half) {
      questionRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;
      num = num + 1;
    } else {
      questionRatio = <%% 0.318, 0.38, 0.42, 0.45, 0.318 %%>;
    }

    if (desktop) {
      if (!obj.half || num % 2 === 1) {
        blockMother = createNode({
          mother,
          style: {
            display: "block",
            position: "relative",
            marginLeft: String(marginLeft) + ea,
            marginRight: String(marginLeft) + ea,
            width: withOut(marginLeft * 2, ea),
            verticalAlign: "top",
            marginBottom: String(blockMargin) + ea,
          }
        });
        block = createNode({
          mother: blockMother,
          style: {
            display: !obj.half ? "block" : "inline-block",
            position: "relative",
            width: !obj.half ? String(100) + '%' : withOut(50, questionMargin, ea),
            paddingRight: !obj.half ? "" : String(questionMargin) + ea,
          }
        });
      } else {
        block = createNode({
          mother: blockMother,
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(50, questionMargin, ea),
            paddingLeft: String(questionMargin) + ea,
          }
        });
      }
    } else {
      block = createNode({
        mother,
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(marginLeft) + ea,
          marginRight: String(marginLeft) + ea,
          width: withOut(marginLeft * 2, ea),
          marginBottom: String(blockMargin) + ea,
        }
      });
    }

    questionArea = createNode({
      mother: block,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(100 * questionRatio) + '%' : String(100) + '%',
        verticalAlign: "top",
        marginBottom: desktop ? "" : String(1.5) + ea,
      },
      children: [
        {
          text: "Q. ",
          style: {
            display: "inline-block",
            position: "relative",
            width: String(qWidth) + ea,
            fontSize: String(wordingSize) + ea,
            fontWeight: String(200),
            color: colorChip.shadow,
            verticalAlign: "top",
            lineHeight: String(lineHeight),
            top: mobile ? String(-0.1) + ea : "",
            paddingTop: mobile ? "" : (isMac() ? "" : String(1) + ea),
          }
        },
        {
          text: obj.question.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(qWidth, ea),
            fontSize: String(wordingSize) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            verticalAlign: "top",
            lineHeight: String(lineHeight),
            paddingTop: mobile ? "" : (isMac() ? "" : String(1) + ea),
          },
          bold: {
            fontWeight: String(600),
            color: colorChip.black,
          }
        },
      ]
    });

    answerArea = createNode({
      mother: block,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(100 * (1 - questionRatio)) + '%' : String(100) + '%',
        verticalAlign: "top",
      }
    });

    if (obj.type === "address") {
      if (mobile) {
        answerArea.style.marginTop = String(3) + ea;
        answerArea.style.marginLeft = String(qWidth) + ea;
        answerArea.style.width = withOut(qWidth, ea);
      }
      createNodes([
        {
          mother: answerArea,
          style: {
            position: "absolute",
            width: String(100) + '%',
            height: String(addressBottomLineHeight) + ea,
            top: String(0) + ea,
            left: String(0) + ea,
            borderBottom: "1px solid " + colorChip.gray3,
          }
        },
        {
          mother: answerArea,
          mode: "input",
          attribute: [
            { type: "text" },
            { value: this.client.requests[0].request.space.address }
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(addressWordingSize) + ea,
            fontWeight: String(200),
            color: colorChip.green,
            top: String(addressWordingTextTop) + ea,
            border: String(0),
            outline: String(0),
            background: "transparent",
            width: String(100) + '%',
          }
        }
      ]);
    } else if (obj.type === "checkbox") {
      itemDoms = [];
      answerArea.style.textAlign = "right";
      if (desktop) {
        answerArea.style.paddingTop = String(1) + ea;
      }
      z = 0;
      for (let i of obj.items) {
        itemDoms.push(createNode({
          mother: answerArea,
          class: [ "hoverDefault_lite", name + token + String(y) + token + String(z), name + token + String(y) ],
          attribute: [
            { toggle: "off" },
            { name: name },
            { y: String(y) },
            { z: String(z) },
            { multiple: obj.multiple ? "true" : "false" },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                const toggle = this.getAttribute("toggle");
                const name = this.getAttribute("name");
                const y = String(this.getAttribute("y"));
                const z = String(this.getAttribute("z"));
                const multiple = (this.getAttribute("multiple") === "true");
                const siblings = document.querySelectorAll('.' + name + token + String(y));
                let items;
                if (toggle === "on") {
                  this.children[0].style.color = colorChip.deactive;
                  this.children[1].style.background = colorChip.gray3;
                  this.setAttribute("toggle", "off");
                } else {
                  if (!multiple) {
                    for (let s of siblings) {
                      if (s !== this) {
                        s.children[0].style.color = colorChip.deactive;
                        s.children[1].style.background = colorChip.gray3;
                        s.setAttribute("toggle", "off");
                      } else {
                        this.children[0].style.color = colorChip.green;
                        this.children[1].style.background = colorChip.green;
                        this.setAttribute("toggle", "on");
                      }
                    }
                  } else {
                    this.children[0].style.color = colorChip.green;
                    this.children[1].style.background = colorChip.green;
                    this.setAttribute("toggle", "on");
                  }
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            paddingLeft: String(itemPaddingLeft) + ea,
          },
          children: [
            {
              text: i,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(wordingSize) + ea,
                fontWeight: String(200),
                color: colorChip.deactive,
                marginBottom: String(itemMarginBottom) + ea,
              }
            },
            {
              style: {
                position: "absolute",
                width: String(itemRadius * 2) + ea,
                height: String(itemRadius * 2) + ea,
                borderRadius: String(itemRadius + 1) + ea,
                background: colorChip.gray3,
                left: String(itemPaddingLeft - (itemRadius * 2) + itemCircleLeft) + ea,
                top: String(itemCircleTop) + ea,
              }
            }
          ]
        }));
        z++;
      }
      if (typeof obj.exception === "function") {
        obj.exception(itemDoms, media);
      }
    } else if (obj.type === "opposite") {

      if (mobile) {
        answerArea.style.marginLeft = String(qWidth) + ea;
        answerArea.style.width = withOut(qWidth, ea);
        answerArea.style.marginBottom = String(10) + ea;
      }

      answerArea.style.textAlign = "left";
      answerArea.style.height = String(barMotherHeight) + ea;
      answerArea.style.cursor = "pointer";

      bar = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          top: String(barTop) + ea,
          height: String(barHeight) + ea,
          borderRadius: String(barHeight + 1) + ea,
          background: colorChip.green,
          width: String(100) + '%',
          left: String(0) + ea,
        }
      });
      barText0 = createNode({
        mother: answerArea,
        text: obj.items[0],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(standardSize) + ea,
          fontWeight: String(400),
          color: colorChip.shadow,
          top: String(barTextTop) + ea,
        }
      });
      barText1 = createNode({
        mother: answerArea,
        text: obj.items[1],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(400),
          color: colorChip.green,
          right: String(0) + ea,
          top: String(barTextTop) + ea,
        }
      });

      if (desktop) {
        bar.style.width = withOut(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2), "px");
        barLeft = barText0.getBoundingClientRect().width + barTextMargin;
        bar.style.left = String(barLeft) + "px";
      }

      barBox = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          left: String(barLeft) + ea,
          top: String(0) + ea,
          width: desktop ? "calc(calc(100% - " + String(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2)) + "px" + ") / 2)" : String(50) + '%',
          height: String(100) + '%',
          background: colorChip.white,
          transition: "all 0s ease",
        }
      });
      if (desktop) {
        barBox.style.width = String(barBox.getBoundingClientRect().width) + "px";
      }
      barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
      barBox.setAttribute("entire", String(barBox.getBoundingClientRect().width * 2));
      barBox.setAttribute("value", String(50));

      barClone = bar.cloneNode(true);
      barClone.style.width = String(100) + '%';
      barClone.style.left = String(0) + ea;
      barClone.style.background = colorChip.gray3;
      barBox.appendChild(barClone);

      barButton = createNode({
        mother: barBox,
        style: {
          position: "absolute",
          top: String(barButtonTop) + ea,
          right: String(-1 * barButtonRadius) + ea,
          width: String(barButtonRadius * 2) + ea,
          height: String(barButtonRadius * 2) + ea,
          borderRadius: String(barButtonRadius + 1) + ea,
          background: colorChip.white,
          border: "1px solid " + colorChip.gray4,
          cursor: "pointer",
        }
      });

      thisName = name + token + String(y);
      GeneralJs.stacks[thisName + "_isDown"] = false;
      GeneralJs.stacks[thisName + "_startX"] = false;
      GeneralJs.stacks[thisName + "_scrollLeft"] = false;
      barButton.addEventListener("mousedown", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = true;
        GeneralJs.stacks[thisName + "_startX"] = e.pageX - this.offsetLeft;
        GeneralJs.stacks[thisName + "_scrollLeft"] = this.scrollLeft;
        answerArea.style.cursor = "grabbing";
        barBox.style.cursor = "grabbing";
        barButton.style.cursor = "grabbing";
      });
      answerArea.addEventListener("mouseleave", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";
      });
      answerArea.addEventListener("mouseup", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";
      });
      answerArea.addEventListener("mousemove", function (e) {
        let x, walk, newWidth;
        if (!GeneralJs.stacks[thisName + "_isDown"]) {
          return;
        }
        e.preventDefault();
        x = e.pageX - barButton.offsetLeft;
        walk = x - GeneralJs.stacks[thisName + "_startX"];

        newWidth = Number(barBox.getAttribute("width")) + walk;
        barBox.style.width = String(newWidth) + ea;
        barBox.setAttribute("width", String(newWidth));
        barBox.setAttribute("value", String(Math.round(Math.round((newWidth / Number(barBox.getAttribute("entire"))) * 10000) / 100)));

        answerArea.style.cursor = "grabbing";
        barBox.style.cursor = "grabbing";
        barButton.style.cursor = "grabbing";
      });

    } else if (obj.type === "list") {

      answerArea.style.display = "block";
      answerArea.style.width = String(100) + '%';
      answerArea.style.paddingTop = String(listAreaPaddingTop) + ea;

      listNum = 0;
      for (let obj2 of obj.items) {

        createNode({
          mother: answerArea,
          class: [ "hoverDefault_lite" ],
          attribute: [
            { toggle: "off" },
            { x: name },
            { y: String(y) },
            { z: String(listNum) },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                const toggle = this.getAttribute("toggle");
                const x = this.getAttribute("name");
                const y = Number(this.getAttribute('y'));
                const z = Number(this.getAttribute('z'));
                const children = this.firstChild.children;
                if (toggle === "off") {
                  for (let dom of children) {
                    dom.style.color = dom.getAttribute("active");
                  }
                  this.setAttribute("toggle", "on");
                } else {
                  for (let dom of children) {
                    dom.style.color = dom.getAttribute("deactive");
                  }
                  this.setAttribute("toggle", "off");
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            marginRight: String(listNum % listColumnsLength === listColumnsLength - 1 ? 0 : listRightMargin) + ea,
            marginBottom: String(listBottomMargin) + ea,
            width: "calc(calc(100% - " + String(listRightMargin * (listColumnsLength - 1)) + ea + ") / " + String(listColumnsLength) + ")",
            overflow: "hidden",
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(listWordingSize) + ea,
                width: String(listFullWidth) + ea,
              },
              children: [
                {
                  text: '- ',
                  attribute: [
                    { deactive: colorChip.gray5 },
                    { active: colorChip.green }
                  ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(listHypenWidth) + ea,
                    fontSize: "inherit",
                    fontWeight: String(200),
                    color: colorChip.gray5,
                  }
                },
                {
                  text: obj2.name,
                  attribute: [
                    { deactive: colorChip.deactive },
                    { active: colorChip.green }
                  ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: "inherit",
                    fontWeight: String(600),
                    color: colorChip.deactive,
                  }
                },
                {
                  text: obj2.contents === '' ? '' : ':',
                  attribute: [
                    { deactive: colorChip.gray5 },
                    { active: colorChip.gray5 }
                  ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(listColumWidth) + ea,
                    paddingLeft: String(listColumPaddingLeft) + ea,
                    fontSize: "inherit",
                    fontWeight: String(200),
                    color: colorChip.gray5,
                  }
                },
                {
                  text: obj2.contents,
                  attribute: [
                    { deactive: colorChip.deactive },
                    { active: colorChip.green }
                  ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: "inherit",
                    fontWeight: String(200),
                    color: colorChip.deactive,
                  }
                },
              ]
            }
          ]
        });
        listNum++;
      }


    }

    y++;
  }

  if (desktop) {
    blockMother.style.marginBottom = String(0) + ea;
  }

}

StyleCurationJs.prototype.insertInitBox = function (curation = true) {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let titleFontTop, titleFontSize, titleFontWeight, titleFontLineHeight;
  let firstBlock, secondBlock, thirdBlock;
  let firstBlockWidth, secondBlockWidth;
  let greenBoxTop, greenBoxWidth, greenBoxHeight, greenBoxVisual;
  let initWordingSize, initWordingWidth;
  let lineHeight;
  let initWordingMargin;
  let wordsPaddingTop;
  let initWordingLeft;
  let wordings, initPhoto;
  let greenBarWidth, greenBarHeight;
  let rightMargin;
  let initWordingTitleBetween;
  let zeroWordingSize, zeroWordingTop;
  let mobileWordingBetween;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontTop = <%% 36, 30, 23, 20, 48 %%>;
  titleFontSize = <%% 32, 31, 29, 26, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titleFontLineHeight = <%% 40, 40, 37, 32, 5.7 %%>;

  secondBlockWidth = <%% 350, 330, 320, 305, 330 %%>;

  greenBoxTop = <%% 1, 1, 1, 1, 1 %%>;
  greenBoxWidth = <%% 25, 25, 25, 25, 25 %%>;
  greenBoxHeight = <%% 4, 4, 4, 4, 4 %%>;
  greenBoxVisual = 1;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  initWordingWidth = <%% 300, 300, 300, 300, 300 %%>;
  initWordingMargin = <%% 15, 15, 15, 13, 2 %%>;
  initWordingLeft = <%% 1, 1, 1, 1, 1 %%>;
  initWordingTitleBetween = <%% 98, 96, 92, 78, 98 %%>;

  wordsPaddingTop = <%% 105, 105, 100, 95, 6 %%>;

  greenBarWidth = <%% 24, 24, 24, 24, 7 %%>;
  greenBarHeight = <%% 3, 3, 3, 3, 0.6 %%>;

  rightMargin = <%% 42, 40, 38, 32, 40 %%>;

  zeroWordingSize = <%% 22, 22, 22, 22, 22 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  mobileWordingBetween = 0.6;

  wordings = this.wordings.initWordings[curation ? "curation" : "service"];
  initPhoto = <%% this.wordings.initWordings[curation ? "curation" : "service"].image[0], this.wordings.initWordings[curation ? "curation" : "service"].image[1], this.wordings.initWordings[curation ? "curation" : "service"].image[1], this.wordings.initWordings[curation ? "curation" : "service"].image[1], this.wordings.initWordings[curation ? "curation" : "service"].image[2] %%>;

  lineHeight = 1.6;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  [ firstBlock, secondBlock, thirdBlock ] = createNodes([
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
        height: desktop ? String(100) + '%' : '',
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
      },
      children: [
        {
          text: String(0),
          style: {
            display: desktop ? "block" : "none",
            fontSize: String(zeroWordingSize) + ea,
            fontWeight: String(200),
            position: "absolute",
            top: String(zeroWordingTop) + ea,
            left: String(0) + ea,
            color: colorChip.gray4,
          }
        },
        {
          text: wordings.title[0],
          style: {
            display: desktop ? "block" : "inline-block",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: desktop ? "absolute" : "relative",
            top: desktop ? String(titleFontTop) + ea : "",
            right: desktop ? String(rightMargin) + ea : "",
            fontFamily: "sandoll",
            paddingRight: desktop ? "" : String(mobileWordingBetween) + ea,
          }
        },
        {
          text: wordings.title[1],
          style: {
            display: desktop ? "block" : "inline-block",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: desktop ? "absolute" : "relative",
            top: desktop ? String(titleFontTop + titleFontLineHeight) + ea : "",
            right: desktop ? String(rightMargin) + ea : "",
            fontFamily: "sandoll",
            paddingLeft: desktop ? "" : String(mobileWordingBetween) + ea,
          }
        }
      ]
    },
    {
      mother: whiteTong,
      style: {
        position: desktop ? "absolute" : "relative",
        width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
        verticalAlign: "bottom",
        paddingTop: String(wordsPaddingTop) + ea,
        height: desktop ? withOut(wordsPaddingTop, ea) : "",
        top: desktop ? String(0) : "",
        left: desktop ? String(0) : "",
      },
      children: [
        {
          style: {
            position: desktop ? "absolute" : "relative",
            width: desktop ? String(initWordingWidth) + ea : String(100) + '%',
            verticalAlign: desktop ? "bottom" : "",
            top: desktop ? String(titleFontTop + initWordingTitleBetween) + ea : "",
            right: desktop ? String(rightMargin) + ea : "",
          },
          children: [
            {
              text: wordings.contents[0].join("\n"),
              style: {
                position: "relative",
                width: String(100) + '%',
                display: "block",
                lineHeight: String(lineHeight),
                marginBottom: String(initWordingMargin) + ea,
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(300),
                color: colorChip.black,
                textAlign: desktop ? "right" : "center",
              },
              bold: {
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
              }
            },
            {
              text: wordings.contents[1].join("\n"),
              style: {
                position: "relative",
                width: String(100) + '%',
                display: "block",
                lineHeight: String(lineHeight),
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(300),
                color: colorChip.black,
                textAlign: desktop ? "right" : "center",
              },
              bold: {
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
              }
            },
          ]
        },
        {
          style: {
            position: "absolute",
            width: String(greenBarWidth) + ea,
            height: String(greenBarHeight) + ea,
            borderRadius: String(3) + "px",
            background: colorChip.green,
            bottom: desktop ? String(0) : "",
            right: desktop ? String(rightMargin + 1) + ea : "",
            top: desktop ? "" : String(2.5) + ea,
            left: desktop ? "" : String(35) + ea,
          }
        }
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "none",
        position: "relative",
        width: withOut(secondBlockWidth, ea),
        height: String(100) + '%',
        borderRadius: String(5) + "px",
        backgroundImage: "url('" + StyleCurationJs.binaryPath + initPhoto + "')",
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
      }
    }
  ]);

}

StyleCurationJs.prototype.insertCenterBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let center;
  let wordings;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let barTop;
  let titleBottom, blockBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;

  center = this.wordings.centerWordings;
  wordings = [];
  for (let { name, title, callback, children } of center) {
    wordings.push({
      name: title,
      contents: (mother) => {
        (instance[callback])(mother, children, name);
      }
    });
  }

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  barTop = <%% 15, 15, 15, 15, 2.6 %%>;

  titleBottom = <%% 15, 15, 15, 15, 0 %%>;
  blockBottom = <%% 40, 40, 40, 40, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(margin + (desktop ? 0 : 1.3)) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  num = 1;
  for (let { name, contents } of wordings) {
    block = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
      },
      children: [
        {
          style: {
            display: "block",
            position: mobile ? "absolute" : "relative",
            left: desktop ? "" : String(mobileTitleLeft) + ea,
            top: desktop ? "" : String(mobileTitleTop) + ea,
            width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
            marginBottom: String(titleBottom) + ea,
            zIndex: mobile ? String(1) : "",
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(barTop) + ea,
                width: String(100) + '%',
                borderBottom: desktop ? "1px dashed " + colorChip.gray2 : "1px solid " + colorChip.gray3,
              }
            },
            {
              text: String(num),
              style: {
                position: "relative",
                display: "inline-block",
                top: String(titleTopNumber) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(200),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingRight: String(numberRight) + ea,
                color: desktop ? colorChip.black : colorChip.green,
              }
            },
            {
              text: name,
              style: {
                position: "absolute",
                right: String(0),
                top: String(titleTop) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(600),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingLeft: String(numberRight) + ea,
                color: colorChip.black,
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            border: desktop ? "1px solid " + colorChip.gray2 : "",
            background: desktop ? "" : colorChip.white,
            boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
            borderRadius: String(5) + "px",
            overflow: "hidden",
            marginBottom: String(num !== wordings.length ? blockBottom : 0) + ea,
            marginTop: desktop ? "" : String(14) + ea,
          }
        },
      ]
    });
    contents(block.lastChild);
    num++;
  }

}

StyleCurationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let whiteBlock;
  let style;
  let blockHeight, blockMarginBottom;
  let designerButtonTong;
  let designerButtonBar;
  let designerButtonBarHead;
  let designerButton;
  let designerButtonText;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let headWidth, headVisual;
  let informationArea;
  let wordSpacing;
  let finalBottom;
  let grayTong, grayTextScroll, grayTextTong;
  let grayHeight, grayTop, grayTextTop, grayTextLeft, grayTextSize;
  let buttonOff, buttonOn;
  let buttonTongHeight, grayButtonHeight;
  let margin, paddingTop;

  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 156, 156, 156, 126, 28 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.3 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (isMac() ? 0 : 1);
  }

  headWidth = <%% 10, 10, 10, 10, 2 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  finalBottom = <%% paddingTop + 6, paddingTop + 6, paddingTop + 6, paddingTop + 6, 8 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 5, 5, 5, 5, 0 %%>;
  grayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  grayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  grayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  grayButtonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  buttonOn = {};

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: String(blockHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
    }
  });

  [ grayTong, grayTextScroll, grayTextTong ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 15 : 2.5) + ea,
        height: String(grayHeight) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(grayTextTop) + ea,
        left: String(grayTextLeft) + ea,
        width: withOut(grayTextLeft * 2, ea),
        height: withOut(grayTextTop * 2, ea),
        overflow: "scroll",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: "auto",
        fontSize: String(grayTextSize) + ea,
        fontWeight: String(300),
        lineHeight: String(1.6),
      }
    },
  ]);

  [ buttonTong ] = createNodes([
    {
      mother: whiteBlock,
      attribute: [
        { toggle: "on" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (buttonOn.style !== undefined) {
              if (this.getAttribute("toggle") === "on") {
                buttonOn.style.opacity = String(0);
                this.setAttribute("toggle", "off");
              } else {
                buttonOn.style.opacity = String(1);
                this.setAttribute("toggle", "on");
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        height: String(buttonTongHeight) + ea,
        cursor: "pointer",
      }
    },
  ]);

  ajaxJson("/designerProposal_policy").then(function (res) {
    const { policy, button } = res;
    let bTags;

    grayTextTong.insertAdjacentHTML("beforeend", policy);
    bTags = grayTextTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }

    [ buttonOff, buttonOn ] = createNodes([
      {
        mother: buttonTong,
        mode: "svg",
        source: button.off,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
        }
      },
      {
        mother: buttonTong,
        mode: "svg",
        source: button.on,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
          background: colorChip.white,
        }
      },
    ]);

  }).catch(function (err) {
    throw new Error(err);
  });

  createNode({
    mother: whiteBlock,
    style: {
      position: "relative",
      height: String(buttonHeight) + ea,
      textAlign: "center",
      marginTop: desktop ? "" : String(3) + ea,
    },
    children: [
      {
        events: [
          {
            type: "click",
            event: function (e) {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
              GeneralJs.setTimeout(() => { instance.serviceConverting(); }, 1000);
            }
          }
        ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(buttonWidth) + ea,
          height: String(100) + '%',
          background: colorChip.green,
          borderRadius: String(3) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "금액 알아보기",
            style: {
              position: "absolute",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonTextSize) + ea,
              fontWeight: String(400),
              color: colorChip.white,
              width: String(100) + '%',
              textAlign: "center",
            }
          }
        ]
      }
    ]
  });

  whiteBlock.style.paddingBottom = String(finalBottom) + ea;
  whiteBlock.style.height = "";

}

StyleCurationJs.prototype.insertServiceBox = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac } = GeneralJs;
  const words = new WordsDictionary();
  const serviceObj = words.getServiceWording();
  let whiteBlock;
  let blockHeight, blockMarginBottom;
  let wordsTable;
  let marginBottom;
  let nodeArr;
  let wordSize, wordSpacing;
  let box0Size, box1Size, box0Margin, box1Margin;
  let top, bottom;
  let grayHeight, grayTop, grayTong, grayTextScroll, grayTextTong, grayTextTop, grayTextLeft, grayTextSize;
  let buttonTong, buttonHeight, buttonTongHeight;
  let buttonOff = {}, buttonOn = {};
  let finalBottom;
  let tempBlock, tempChild, tempDom;
  let whiteBlockHeight, whiteBlockMargin, whiteBlockPaddingTop, whiteBlockPaddingLeft, whiteBlockVisual;
  let methodsTongTop, methodsTongBottom, methodsTongLeft, methodsBlockBottom;
  let methodsTitleWidth;
  let methodsBlockPaddingBottom;
  let methodsSecondBlockWidth;
  let methodsTongClassName;
  let methodsThirdBlockBottom;
  let methodsSecondBlockRight;
  let methodsTextVisual;
  let mobileTitleSize;
  let processTongClassName;
  let processBlockMarginLeft;
  let processArrowWidth;
  let processArrowTop;
  let processBlockHeight;
  let processBlockPaddingBottom;
  let processThirdBlockBottom;
  let amountTextVisual, amountTextTop;
  let leftMargin;
  let servicePhotoBetween;
  let serviceWordingBetween;
  let serviceWordingBottom;
  let data;
  let feeSize;
  let feeMarginRight, feeMarginBottomLast, feeMarginBottomInit;
  let feeMargin0, feeMargin1, feeMargin2;
  let feeTongPaddingTop;
  let servicePhotoMarginBottom;

  data = {
    selected: [ 0, 1 ],
    range: [
      [ 2000000, 3000000 ],
      [ 3000000, 4000000 ],
    ]
  };

  leftMargin = <%% 52, 52, 44, 36, 4.7 %%>;
  top = <%% 48, 48, 48, 48, 4.7 %%>;
  bottom = <%% 36, 36, 36, 36, 4.7 %%>;

  blockHeight = <%% 400, 400, 400, 400, 400 %%>;
  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;
  marginBottom = <%% 13, 13, 13, 9, 4 %%>;

  mobileTitleSize = 3.5;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  box0Size = <%% 140, 120, 120, 82, 12 %%>;
  box1Size = <%% 25, 0, 0, 0, 3 %%>;
  box0Margin = <%% 55, 55, 55, 45, 3 %%>;
  box1Margin = <%% 18, 18, 0, 0, 3 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 4, 4, 4, 4, 2.3 %%>;
  grayTextTop = <%% 12, 12, 10, 9, 1.8 %%>;
  grayTextLeft = <%% 12, 12, 10, 9, 1.8 %%>;
  grayTextSize = <%% 14, 14, 13, 11, 2.3 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  buttonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  finalBottom = <%% -3, -4, -7, -9, 0 %%>;

  whiteBlockHeight = <%% (isMac() ? 26 : 25), (isMac() ? 26 : 25), (isMac() ? 24 : 23), (isMac() ? 20 : 19), 4.6 %%>;
  whiteBlockMargin = <%% 6, 6, 6, 4, 1 %%>;
  whiteBlockPaddingTop = <%% 6, 6, 6, 4, 1 %%>;
  whiteBlockPaddingLeft = <%% 11, 11, 11, 9, 2 %%>;
  whiteBlockVisual = <%% 1, 1, 1, 1, 0 %%>;

  methodsTongTop = <%% 18, 18, 18, (isMac() ? 14 : 16), 3.2 %%>;
  methodsTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  methodsTongLeft = <%% 24, 24, 22, 22, 4 %%>;
  methodsTitleWidth = <%% 155, 140, 128, 110, 20 %%>;
  methodsBlockPaddingBottom = <%% 20, 20, 20, 16, 1.5 %%>;
  methodsBlockBottom = <%% 16, 16, 16, 16, 3.5 %%>;
  if (desktop) {
    if (!isMac()) {
      if (media[3]) {
        methodsBlockPaddingBottom = methodsBlockPaddingBottom - 2;
        methodsBlockBottom = methodsBlockBottom + 1;
      } else {
        methodsBlockPaddingBottom = methodsBlockPaddingBottom - 4;
        methodsBlockBottom = methodsBlockBottom + 2;
      }
    }
  }
  methodsSecondBlockWidth = <%% 370, 170, 170, 116, 80 %%>;
  methodsSecondBlockRight = <%% 0, 32, 28, 28, 10 %%>;
  methodsTongClassName = "methodsDetailTong";
  processTongClassName = "processDetailTong";
  methodsThirdBlockBottom = <%% 9, 9, 9, 9, 1 %%>;
  methodsTextVisual = <%% 0, 0, 1, 1, 0 %%>;

  processBlockMarginLeft = <%% 8, 8, 8, 7, 1.5 %%>;
  processBlockHeight = <%% 22, 22, 22, 18, 3 %%>;
  processArrowWidth = <%% 25, 25, 25, 24, 5 %%>;
  processArrowTop = <%% 7, 7, 7, 5, 1.3 %%>;
  processThirdBlockBottom = <%% 4, 4, 4, 2, 0.5 %%>;
  if (desktop) {
    if (!isMac()) {
      processThirdBlockBottom = processThirdBlockBottom - 2;
      processArrowTop = processArrowTop - 2;
    }
  }
  processBlockPaddingBottom = <%% 16, 16, 16, 16, 0.5 %%>;

  amountTextVisual = <%% 3, 3, 3, 3, 0.8 %%>;
  amountTextTop = <%% 20, 20, 20, 18, 0.1 %%>;

  servicePhotoBetween = <%% 10, 9, 8, 7, 1 %%>;
  serviceWordingBetween = <%% 8, 8, 8, 8, 3.5 %%>;
  serviceWordingBottom = <%% 2, 2, 2, 2, 2.1 %%>;

  feeSize = <%% 22, 22, 22, 20, 3.5 %%>;
  feeMarginRight = <%% 30, 30, 30, 30, 1 %%>;
  feeMarginBottomInit = <%% 4, 4, 4, 4, 0.5 %%>;
  feeMarginBottomLast = <%% 4, 4, 4, 4, 0 %%>;

  feeMargin0 = <%% 5, 5, 5, 3, 1 %%>;
  feeMargin1 = <%% 12, 12, 12, 9, 2 %%>;
  feeMargin2 = <%% 6, 6, 6, 5, 1 %%>;

  feeTongPaddingTop = <%% 4, 4, 4, 2, 0.5 %%>;

  servicePhotoMarginBottom = <%% 6, 0, 0, 0, 2.5 %%>;

  [ whiteBlock, wordsTable ] = createNodes([
    {
      mother: baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 3) + "px",
        width: String(100) + '%',
        background: colorChip.white,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
        marginBottom: String(blockMarginBottom) + ea,
        paddingTop: String(top) + ea,
        paddingBottom: String(bottom) + ea,
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(desktop ? leftMargin : 0) + ea,
        width: desktop ? withOut(leftMargin * 2, ea) : String(100) + '%',
      }
    }
  ]);

  //service
  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.service.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(servicePhotoMarginBottom) + ea,
        paddingBottom: String(methodsTongBottom) + ea,
        borderRadius: String(3) + "px",
        boxSizing: "border-box",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        width: String(100) + '%',
      }
    },
  ]);

  for (let i = 0; i < serviceObj.service.contents.length; i++) {
    tempChild = createNode({
      mother: grayTextTong,
      style: {
        position: "relative",
        display: "inline-block",
        width: desktop ? "calc(calc(100% - " + String((serviceObj.service.contents.length - 1) * servicePhotoBetween) + ea + ") / " + String(serviceObj.service.contents.length) + ")" : "calc(calc(100% - " + String(servicePhotoBetween) + ea + ") / 2)",
        marginRight: desktop ? String(serviceObj.service.contents.length - 1 === i ? 0 : servicePhotoBetween) + ea : String(i % 2 === 1 ? 0 : servicePhotoBetween) + ea,
        paddingBottom: desktop ? String(serviceWordingBottom) + ea : ((i >= 2) ? 0 : serviceWordingBottom) + ea,
      },
      children: [
        {
          mode: "img",
          attribute: [
            { src: StyleCurationJs.binaryPath + serviceObj.service.contents[i].image }
          ],
          style: {
            position: "relative",
            width: String(100) + '%',
            height: "auto",
            borderRadius: String(3) + "px",
          }
        },
        {
          text: serviceObj.service.contents[i].name,
          style: {
            position: "relative",
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(desktop ? wordSize : 3) + ea,
            fontWeight: String(600),
            color: data.selected.includes(i) ? colorChip.green : colorChip.black,
            marginTop: String(desktop ? serviceWordingBetween : 1.5) + ea,
          }
        },
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
            background: colorChip.white,
            opacity: String(0.8),
            display: data.selected.includes(i) ? "none" : "block",
          }
        }
      ]
    });
  }

  //design fee
  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.fee.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(servicePhotoMarginBottom) + ea,
        paddingTop: String(methodsTongTop) + ea,
        paddingBottom: String(methodsTongBottom) + ea,
        borderRadius: String(3) + "px",
        border: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(methodsTongLeft) + ea,
        width: withOut(methodsTongLeft * 2, ea),
      }
    },
  ]);

  tempChild = createNode({
    mother: grayTextTong,
    style: {
      position: "relative",
      display: "block",
      marginBottom: String(0) + ea,
      paddingBottom: String(methodsBlockPaddingBottom) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? String(methodsTitleWidth) + ea : "",
          verticalAlign: "top",
          marginBottom: desktop ? "" : String(1) + ea,
        },
        children: [
          {
            text: serviceObj.fee.contents[0].name,
            style: {
              position: "relative",
              left: String(desktop ? 1 : 0) + ea,
              fontSize: String(wordSize - methodsTextVisual) + ea,
              fontWeight: String(600),
              lineHeight: String(1.5),
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? withOut(methodsTitleWidth, ea) : "",
          verticalAlign: "top",
          marginBottom: desktop ? "" : String(2.5) + ea,
        }
      }
    ]
  });

  if (desktop) {
    tempChild.children[1].style.height = String(tempChild.children[0].getBoundingClientRect().height - 4) + ea;
    tempChild.children[1].style.overflow = "scroll";
  }
  tempChild.children[1].style.paddingTop = String(feeTongPaddingTop) + ea;

  for (let i = 0; i < data.range.length; i++) {

    createNode({
      mother: tempChild.children[1],
      style: {
        display: "inline-block",
        position: "relative",
        top: mobile ? "" : (isMac() ? "" : String(2) + ea),
        fontSize: String(feeSize) + ea,
        marginRight: String(i === data.range.length - 1 ? 0 : feeMarginRight) + ea,
        marginBottom: String(feeMarginBottomInit + (i === data.range.length - 1 ? feeMarginBottomLast : 0)) + ea,
      },
      children: [
        {
          text: serviceObj.service.contents[data.selected[i]].name,
          style: {
            display: "inline-block",
            fontSize: "inherit",
            fontWeight: String(200),
            color: colorChip.gray5,
          }
        },
        {
          text: ":",
          style: {
            display: "inline-block",
            fontSize: "inherit",
            fontWeight: String(200),
            color: colorChip.gray5,
            marginLeft: String(feeMargin0) + ea,
          }
        },
        {
          text: "최저 " + String(Math.round(data.range[i][0] / 10000)) + "만원",
          style: {
            display: "inline-block",
            fontSize: "inherit",
            fontWeight: String(200),
            color: colorChip.green,
            marginLeft: String(feeMargin1) + ea,
          }
        },
        {
          text: "~",
          style: {
            display: "inline-block",
            fontSize: "inherit",
            fontWeight: String(200),
            color: colorChip.green,
            marginLeft: String(feeMargin2) + ea,
          }
        },
        {
          text: "최고 " + String(Math.round(data.range[i][1] / 10000)) + "만원",
          style: {
            display: "inline-block",
            fontSize: "inherit",
            fontWeight: String(200),
            color: colorChip.green,
            marginLeft: String(feeMargin2) + ea,
          }
        },
      ]
    });

  }

  //methods
  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.methods.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 6 : 2.5) + ea,
        paddingTop: String(methodsTongTop) + ea,
        paddingBottom: String(methodsTongBottom) + ea,
        borderRadius: String(3) + "px",
        border: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(methodsTongLeft) + ea,
        width: withOut(methodsTongLeft * 2, ea),
      }
    },
  ]);

  for (let i = 0; i < serviceObj.methods.contents.length; i++) {
    tempChild = createNode({
      mother: grayTextTong,
      style: {
        position: "relative",
        display: "block",
        marginBottom: String(i === serviceObj.methods.contents.length - 1 ? 0 : methodsBlockBottom) + ea,
        paddingBottom: String(methodsBlockPaddingBottom) + ea,
        borderBottom: (i === serviceObj.methods.contents.length - 1) ? "" : "1px solid " + colorChip.gray3,
      },
      children: [
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? String(methodsTitleWidth) + ea : "",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(1) + ea,
          },
          children: [
            {
              text: serviceObj.methods.contents[i].name,
              style: {
                position: "relative",
                left: String(desktop ? 1 : 0) + ea,
                fontSize: String(wordSize - methodsTextVisual) + ea,
                fontWeight: String(600),
                lineHeight: String(1.5),
                color: colorChip.black,
              }
            },
            {
              text: "약 " + String(serviceObj.methods.contents[i].amount) + "일 소요",
              style: {
                position: "absolute",
                left: desktop ? String(1) + ea : "",
                fontSize: String(wordSize - methodsTextVisual - amountTextVisual) + ea,
                fontWeight: String(400),
                lineHeight: String(1.5),
                top: String(amountTextTop) + ea,
                right: mobile ? String(0) + ea : "",
                color: colorChip.green,
              }
            }
          ]
        },
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? String(methodsSecondBlockWidth) + ea : "",
            verticalAlign: "top",
            marginRight: desktop ? String(methodsSecondBlockRight) + ea : "",
            marginBottom: desktop ? "" : String(2.5) + ea,
          },
          children: [
            {
              text: serviceObj.methods.contents[i].contents,
              style: {
                fontSize: String(wordSize - methodsTextVisual) + ea,
                fontWeight: String(300),
                lineHeight: String(1.5),
                color: colorChip.black,
              }
            }
          ]
        },
        {
          class: [ methodsTongClassName ],
          style: {
            display: "inline-block",
            position: "relative",
            width: desktop ? withOut(methodsTitleWidth + methodsSecondBlockWidth + methodsSecondBlockRight, ea) : "",
            marginBottom: desktop ? "" : String(serviceObj.methods.contents[i].children.length !== 0 ? 2.5 : 0) + ea,
          },
        }
      ]
    });
    tempDom = tempChild.querySelector('.' + methodsTongClassName);
    for (let j = 0; j < serviceObj.methods.contents[i].children.length; j++) {
      createNode({
        mother: tempDom,
        text: "<b%-%b> " + serviceObj.methods.contents[i].children[j],
        style: {
          display: "block",
          position: "relative",
          fontSize: String(wordSize - methodsTextVisual) + ea,
          fontWeight: String(300),
          color: colorChip.black,
          marginBottom: String(j === serviceObj.methods.contents[i].children.length - 1 ? 0 : methodsThirdBlockBottom) + ea,
          lineHeight: String(1.5),
        },
        bold: {
          color: colorChip.green,
        }
      });
    }
  }

  //process

  tempBlock = createNode({
    mother: wordsTable,
    style: {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    }
  });

  createNode({
    mother: tempBlock,
    text: serviceObj.process.name,
    style: {
      display: desktop ? "inline-block" : "block",
      fontSize: String(desktop ? wordSize : mobileTitleSize) + ea,
      wordSpacing: String(wordSpacing) + "px",
      position: "relative",
      top: String(0) + ea,
      verticalAlign: "top",
      lineHeight: String(1.6),
      left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
      width: desktop ? String(box0Size) + ea : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
      marginRight: desktop ? String(box0Margin) + ea : "",
      marginBottom: desktop ? "" : String(marginBottom / 2) + ea,
      fontWeight: String(600),
      textAlign: "left",
      color: colorChip.black,
    }
  });

  if (desktop) {
    createNode({
      mother: tempBlock,
      text: '0',
      style: {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(0) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
        width: String(box1Size) + ea,
        marginRight: String(box1Margin) + ea,
        fontWeight: String(600),
        color: colorChip.white,
        textAlign: "right",
      }
    });
  }

  [ grayTong, grayTextTong ] = createNodes([
    {
      mother: tempBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        left: desktop ? "" : String((this.subBoxMargin.left + 0.2)) + ea,
        width: desktop ? withOut(box0Size + box1Size + box0Margin + box1Margin, ea) : withOut(((this.subBoxMargin.left + 0.2) * 2), ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 6 : 2.5) + ea,
        paddingTop: String(methodsTongTop) + ea,
        paddingBottom: String(methodsTongBottom) + ea,
        borderRadius: String(3) + "px",
        border: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        marginLeft: String(methodsTongLeft) + ea,
        width: withOut(methodsTongLeft * 2, ea),
      }
    },
  ]);

  for (let i = 0; i < serviceObj.process.contents.length; i++) {
    tempChild = createNode({
      mother: grayTextTong,
      style: {
        position: "relative",
        display: "block",
        marginBottom: String(i === serviceObj.process.contents.length - 1 ? 0 : methodsBlockBottom) + ea,
        paddingBottom: String(processBlockPaddingBottom) + ea,
        borderBottom: (i === serviceObj.process.contents.length - 1) ? "" : "1px solid " + colorChip.gray3,
      },
      children: [
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? String(methodsTitleWidth) + ea : "",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(1) + ea,
          },
          children: [
            {
              text: serviceObj.process.contents[i].name,
              style: {
                position: "relative",
                left: String(desktop ? 1 : 0) + ea,
                fontSize: String(wordSize - methodsTextVisual) + ea,
                fontWeight: String(600),
                lineHeight: String(1.5),
                color: colorChip.black,
              }
            }
          ]
        },
        {
          class: [ processTongClassName ],
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? withOut(methodsTitleWidth, ea) : "",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(2.5) + ea,
          },
        },
      ]
    });
    tempDom = tempChild.querySelector('.' + processTongClassName);
    for (let j = 0; j < serviceObj.process.contents[i].contents.length; j++) {
      createNode({
        mother: tempDom,
        text: serviceObj.process.contents[i].contents[j],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(wordSize - methodsTextVisual) + ea,
          fontWeight: String(300),
          color: colorChip.black,
          marginRight: String(processBlockMarginLeft) + ea,
          marginBottom: String(processThirdBlockBottom) + ea,
          lineHeight: String(1.5),
        },
        bold: {
          color: colorChip.green,
        }
      });
      if (j !== serviceObj.process.contents[i].contents.length - 1) {
        createNode({
          mother: tempDom,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(processArrowWidth) + ea,
            height: String(processBlockHeight) + ea,
            marginRight: String(processBlockMarginLeft) + ea,
            verticalAlign: "top",
            marginBottom: String(processThirdBlockBottom) + ea,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnLongArrow(colorChip.green),
              style: {
                position: "absolute",
                width: String(processArrowWidth) + ea,
                top: String(processArrowTop) + ea,
                left: String(0),
              }
            }
          ]
        });
      }
    }
  }

}

StyleCurationJs.prototype.insertAdditionBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const words = new WordsDictionary();
  const addtionObj = words.getAdditionWording();
  const addtionArr = addtionObj.wordings[media.findIndex((i) => { return i === true; })];
  let whiteBlock;
  let style;
  let blockHeight, blockMarginBottom;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let headWidth, headVisual;
  let informationArea;
  let finalBottom;
  let margin, paddingTop;
  let textBox;
  let textTitleSize, textContentsSize;
  let titleArea, contentsArea;
  let contentsRatio;
  let num;
  let textBoxMarginTop, textBoxMarginBottom;
  let contentsRatioFirst, contentsRatioSecond;
  let titleBetween, titleVisual;
  let titleLeftFirst, titleLeftSecond;
  let textLineHeight;
  let plusWidth, plusBottom;
  let titleTopVisualFirst, titleTopVisualSecond;

  margin = <%% 50, 50, 50, 50, 6 %%>;
  paddingTop =  <%% 60, 54, 54, 54, 6.7 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 206, 206, 206, 206, 17 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.2 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (isMac() ? 0 : 1);
  }

  headWidth = <%% 10, 10, 10, 10, 2 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  finalBottom = <%% paddingTop + 6, 40, 30, 30, 9.7 %%>;

  textTitleSize = <%% 27, 23, 22, 20, 4.2 %%>;
  textContentsSize = <%% 15, 14.5, 14, 13, 3.3 %%>;

  textBoxMarginTop = <%% 54, 40, 36, 32, 5.5 %%>;
  textBoxMarginBottom = <%% 10, 10, 10, 10, 0 %%>;

  contentsRatioFirst = <%% 41, 24, 27, 29, 11 %%>;
  contentsRatioSecond = <%% 46.2, 31, 31.6, 33.8, 11 %%>;

  titleBetween = <%% 12, 24, 22, 20, 2.5 %%>;
  titleVisual = <%% 1, 1, 1, 1, 1 %%>;
  if (desktop) {
    if (!isMac()) {
      titleBetween = titleBetween + 2;
    }
  }

  titleLeftFirst = <%% 22, 0, 0, 0, 11 %%>;
  titleLeftSecond = <%% 62, 40, 39, 34, 11 %%>;

  textLineHeight = <%% 6, 6, 6, 6, 11 %%>;

  plusWidth = <%% 24, 24, 24, 21, 4 %%>;
  plusBottom = <%% 39, 48, 47, 41, 33 %%>;

  if (desktop) {
    if (!isMac()) {
      plusBottom = plusBottom + 5;
    }
  }

  titleTopVisualFirst = <%% -2, -3, -4, -4, 0 %%>;
  titleTopVisualSecond = <%% -1, -4, -5, -4, 0 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      paddingBottom: String(finalBottom) + ea
    }
  });

  //diagram
  createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        mode: "img",
        attribute: [
          { src: StyleCurationJs.binaryPath + "/" + addtionObj.image + String(media.findIndex((i) => { return i === true; })) + ".png" }
        ],
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          top: String(0),
          left: String(0),
        }
      },
      {
        mode: "img",
        attribute: [
          { src: StyleCurationJs.binaryPath + "/" + addtionObj.image + String(media.findIndex((i) => { return i === true; })) + ".svg" }
        ],
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          top: String(0),
          left: String(0),
        }
      }
    ]
  });

  //textBox
  textBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(textBoxMarginTop) + ea,
      marginBottom: String(textBoxMarginBottom) + ea,
    }
  });

  num = 0;
  for (let { title, contents } of addtionArr) {

    contentsRatio = num === 0 ? contentsRatioFirst : contentsRatioSecond;

    [ titleArea, contentsArea ] = createNodes([
      {
        mother: textBox,
        style: {
          width: desktop ? String(contentsRatio) + '%' : String(100) + '%',
          display: desktop ? "inline-block" : "block",
          position: "relative",
          marginBottom: String(titleBetween) + ea,
          top: desktop ? String((num === 0 ? titleTopVisualFirst : titleTopVisualSecond) * titleVisual) + ea : "",
          verticalAlign: "top",
        }
      },
      {
        mother: textBox,
        style: {
          width: desktop ? String(100 - contentsRatio) + '%' : String(100) + '%',
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
        }
      },
    ]);

    if (desktop) {
      for (let t of title) {
        createNode({
          mother: titleArea,
          text: t,
          style: {
            position: "relative",
            display: "block",
            fontSize: String(textTitleSize) + ea,
            fontWeight: String(200),
            color: colorChip.black,
            marginLeft: desktop ? String(num === 0 ? titleLeftFirst : titleLeftSecond) + ea : "",
            textAlign: desktop ? "left" : "center",
          },
          bold: {
            fontSize: String(textTitleSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        });
      }
      for (let c of contents) {
        createNode({
          mother: contentsArea,
          text: c,
          style: {
            position: "relative",
            display: "block",
            fontSize: String(textContentsSize) + ea,
            fontWeight: String(300),
            marginBottom: String(textLineHeight) + ea,
            color: colorChip.black,
          },
          bold: {
            fontSize: String(textContentsSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        });
      }
    } else {

      createNode({
        mother: titleArea,
        text: title.join(" "),
        style: {
          position: "relative",
          display: "block",
          fontSize: String(textTitleSize) + ea,
          fontWeight: String(200),
          color: colorChip.black,
          marginLeft: desktop ? String(num === 0 ? titleLeftFirst : titleLeftSecond) + ea : "",
          textAlign: desktop ? "left" : "center",
        },
        bold: {
          fontSize: String(textTitleSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      });

      createNode({
        mother: contentsArea,
        text: contents.join(" "),
        style: {
          position: "relative",
          display: "block",
          fontSize: String(textContentsSize) + ea,
          fontWeight: String(300),
          marginBottom: String(num === addtionArr.length - 1 ? 0 : textLineHeight) + ea,
          color: colorChip.black,
          lineHeight: String(1.6),
          textAlign: "center",
        },
        bold: {
          fontSize: String(textContentsSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      });
    }

    num++;
  }

  createNode({
    mother: textBox,
    mode: "svg",
    source: this.mother.returnPlus(colorChip.green),
    width: String(plusWidth) + ea,
    position: "absolute",
    left: String(desktop ? titleLeftFirst : 36) + ea,
    bottom: String(plusBottom) + ea,
  });

}

StyleCurationJs.prototype.serviceConverting = function () {
  const instance = this;
  const { ea, baseTong } = this;
  const { backgroundImageBox, backgroundImageBox2 } = this.mother;
  const { cleanChildren } = GeneralJs;
  const children = baseTong.children;
  backgroundImageBox2.style.opacity = String(1);
  backgroundImageBox.style.animation = "justfadeoutoriginal 1s ease forwards";
  baseTong.style.height = String(baseTong.getBoundingClientRect().height) + ea;
  baseTong.style.animation = "fadedownmiddle 0.4s ease forwards";
  GeneralJs.setTimeout(async () => {
    try {
      baseTong.style.opacity = String(0);
      cleanChildren(baseTong);
      instance.insertInitBox(false);
      instance.insertServiceBox();
      instance.insertAdditionBox();
      baseTong.style.height = "";
      baseTong.style.animation = "fadeupdelay 0.5s ease forwards";
    } catch (e) {
      console.log(e);
    }
  }, 500);
}

StyleCurationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid;
    let clients, client;
    let whereQuery;
    let contentsPhotoObj;

    if (getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: getObj.cliid } }, "/getClients");
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    contentsPhotoObj = await ajaxJson({}, "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
    this.client = client;
    this.wordings = new StyleCurationWordings();

    await this.mother.ghostClientLaunching({
      base: {
        instance: this,
        binaryPath: StyleCurationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 서비스 안내"),
        secondBackground: true
      },
      local: async () => {
        try {
          instance.insertInitBox(true);
          instance.insertCenterBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
