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
      "return ('홈리에종 서비스 큐레이션 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 큐레이션 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleCuration",
  "hangul": "서비스 큐레이션",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

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
  this.firstClick = false;
}

StyleCurationJs.binaryPath = FRONTHOST + "/middle/curation";

StyleCurationJs.randomPick = function (photos, contentsArr, pictureNumber, roomsIntersection = false) {
  if (typeof photos !== "object" || typeof contentsArr !== "object" || typeof pictureNumber !== "number" || typeof roomsIntersection !== "boolean") {
    throw new Error("invaild input");
  }
  const photoLength = photos.length;
  const conidArr = Array.from(new Set(photos.map((obj) => { return obj.conid })));
  const standard = 50;
  const stackName = "styleCheckNum";
  const limit = 2;
  let randoms;
  let randomPick, randomPick_raw, contentsPick;
  let randomPickFiles, randomPickFiles_new;
  let temp, temp2, tempArr;
  let rooms, room;
  let accumulation;
  let num, num2;
  let length0, length1;

  if (typeof GeneralJs.stacks[stackName] !== "number") {
    throw new Error("stack first");
  }

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
    randomPick_raw = [];
    for (let i = 0; i < randoms.length; i++) {
      for (let obj of photos) {
        if (obj.conid === randoms[i] && obj.room === accumulation[i] && obj.gs === 'g') {
          randomPick_raw.push(obj);
          break;
        }
      }
    }

    randomPickFiles = randomPick_raw.map((obj) => { return obj.file; });
    randomPick = [];
    for (let obj of randomPick_raw) {
      randomPickFiles_new = [];
      length0 = randomPickFiles.length;
      for (let file of randomPickFiles) {
        if (obj.file !== file) {
          randomPickFiles_new.push(file);
        }
      }
      randomPickFiles = JSON.parse(JSON.stringify(randomPickFiles_new));
      length1 = randomPickFiles.length;
      if (length0 !== length1) {
        randomPick.push(obj);
      }
    }

    num2++;
  } while (randomPick.length !== pictureNumber);

  if (randomPick.length !== pictureNumber || GeneralJs.stacks[stackName] > limit) {
    return { complete: true, photos };
  } else {
    return randomPick;
  }
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

StyleCurationJs.prototype.curationWordings = function (liteMode = false) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  class StyleCurationWordings {
    constructor() {
      this.wordings = {};
      this.wordings.init = {
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
      };
      this.wordings.center = [];
      this.wordings.center.push({
        name: "space",
        title: "공간",
        callback: "blockCheck",
        children: [
          // {
          //   name: "address",
          //   type: "address",
          //   half: false,
          //   required: false,
          //   rewind: "스타일링 받으실 곳의 주소를 정확히 입력해주세요 :)",
          //   question: [
          //     "<b%스타일링 받으실 곳의 주소가 맞나요?%b>",
          //     "아니라면, 스타일링 받을 곳으로 고쳐주세요!"
          //   ],
          //   value: function (request, history, self) {
          //     return request.request.space.address;
          //   },
          //   update: function (value, siblings, client) {
          //     if (value === null) {
          //       return { history: null, core: null };
          //     } else {
          //       let updateQuery;
          //       updateQuery = {};
          //       updateQuery["requests.0.request.space.address"] = value;
          //       return {
          //         history: null,
          //         core: updateQuery
          //       };
          //     }
          //   }
          // },
          // {
          //   name: "pyeong",
          //   type: "pyeong",
          //   half: false,
          //   required: false,
          //   rewind: "평수를 정확히 입력해주세요 :)",
          //   question: [
          //     "<b%분양 평수로 적으신 평이 맞나요?%b>",
          //     "평을 정확히 적으셔야 금액이 올바로 안내됩니다!"
          //   ],
          //   value: function (request, history, self) {
          //     return String(Math.round(request.request.space.pyeong)) + '평';
          //   },
          //   update: function (value, siblings, client) {
          //     if (value === null) {
          //       return { history: null, core: null };
          //     } else {
          //       let updateQuery;
          //       updateQuery = {};
          //       if (typeof value === "number") {
          //         updateQuery["requests.0.request.space.pyeong"] = value;
          //       } else if (typeof value === "string") {
          //         value = Number(value.replace(/[^0-9\-\.]/gi, ''));
          //         if (Number.isNaN(value)) {
          //           return {
          //             history: null,
          //             core: null
          //           };
          //         } else {
          //           updateQuery["requests.0.request.space.pyeong"] = value;
          //         }
          //       } else {
          //         return {
          //           history: null,
          //           core: null
          //         };
          //       }
          //       return {
          //         history: null,
          //         core: updateQuery
          //       };
          //     }
          //   }
          // },
          {
            name: "precheck",
            type: "calendar",
            half: true,
            required: false,
            question: [
              "<b%사전 점검일%b>이 있다면, 날짜를 알려주세요!"
            ],
            item: "사전 점검일",
            value: function (request, history, self) {
              if (request.analytics.date.space.precheck.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
                return null;
              } else {
                return request.analytics.date.space.precheck;
              }
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                let updateQuery;
                updateQuery = {};
                updateQuery["requests.0.analytics.date.space.precheck"] = value;
                return {
                  history: null,
                  core: updateQuery
                };
              }
            }
          },
          {
            name: "empty",
            type: "calendar",
            half: true,
            required: false,
            question: [
              "공실이 아니라면, <b%집 비는 날짜%b>를 알려주세요!"
            ],
            item: "집 비는 날",
            value: function (request, history, self) {
              if (request.analytics.date.space.empty.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
                return null;
              } else {
                return request.analytics.date.space.empty;
              }
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                let updateQuery;
                updateQuery = {};
                updateQuery["requests.0.analytics.date.space.empty"] = value;
                return {
                  history: null,
                  core: updateQuery
                };
              }
            }
          },
        ]
      });

      this.wordings.center.push({
        name: "furniture",
        title: "가구",
        callback: "blockCheck",
        children: [
          {
            name: "purchaseRatio",
            type: "opposite",
            half: false,
            required: false,
            question: [
              "가구, 소품의 <b%새로운 구매와 기존 제품 재사용의%b>",
              "<b%비율%b>을 알려주세요!"
            ],
            items: [
              "재배치",
              "<b%재배치 + %b>일부 구매",
              "전체 구매",
            ],
            total: 100,
            ea: '%',
            value: function (request, history, self) {
              let thisValue;
              if (request.request.furniture === "재배치") {
                thisValue = 0;
              } else if (request.request.furniture === "일부 구매" || request.request.furniture === "알 수 없음") {
                thisValue = 50;
              } else {
                thisValue = 100;
              }
              return thisValue;
            },
            update: function (value, siblings, client) {
              if (value !== null) {
                let thisValue;
                let updateQuery;

                if (value.value < 25) {
                  thisValue = "재배치";
                } else if (value.value < 70) {
                  thisValue = "일부 구매";
                } else {
                  thisValue = "전체 구매";
                }

                updateQuery = {};
                updateQuery["requests.0.request.furniture"] = thisValue;

                return {
                  history: null,
                  core: updateQuery
                };
              } else {
                return { history: null, core: null };
              }
            }
          }
        ]
      });

      this.wordings.center.push({
        name: "budget",
        title: "예산",
        callback: "blockCheck",
        children: [
          {
            name: "budgetReady",
            type: "budget",
            half: false,
            required: false,
            question: [
              "인테리어에 사용하실 <b%전체 예산을 알려주세요!%b>",
              "(스타일링, 시공 포함 / 가전 예산은 제외)"
            ],
            items: [
              desktop ? "1,000만원 이하" : "1천만원",
              desktop ? "3,000만원" : "3천만원",
              desktop ? "5,000만원" : "5천만원",
              desktop ? "7,000만원" : "7천만원",
              desktop ? "1억원 이상" : "1억원",
            ],
            total: 100,
            ea: '%',
            value: function (request, history, self) {
              return (Number(request.request.budget.replace(/[^0-9]/gi, '')) === 1 ? 10000 : Number(request.request.budget.replace(/[^0-9]/gi, ''))) / 100;
            },
            update: function (value, siblings, client) {
              if (value !== null) {
                const menu = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ];
                const man = 10000;
                const standardValue = 10000 * man;
                let updateQuery;
                let thisValue;
                let finalValue;

                thisValue = standardValue * (value.value / 100);
                finalValue = menu[0];

                if (thisValue <= 1200 * man) {
                  finalValue = menu[1];
                } else if (thisValue > 1200 * man && thisValue <= 1700 * man) {
                  finalValue = menu[2];
                } else if (thisValue > 1700 * man && thisValue <= 2200 * man) {
                  finalValue = menu[3];
                } else if (thisValue > 2200 * man && thisValue <= 2700 * man) {
                  finalValue = menu[4];
                } else if (thisValue > 2700 * man && thisValue <= 3200 * man) {
                  finalValue = menu[5];
                } else if (thisValue > 3200 * man && thisValue <= 3700 * man) {
                  finalValue = menu[6];
                } else if (thisValue > 3700 * man && thisValue <= 4200 * man) {
                  finalValue = menu[7];
                } else if (thisValue > 4200 * man && thisValue <= 4700 * man) {
                  finalValue = menu[8];
                } else if (thisValue > 4700 * man && thisValue <= 5700 * man) {
                  finalValue = menu[9];
                } else if (thisValue > 5700 * man && thisValue <= 6700 * man) {
                  finalValue = menu[10];
                } else if (thisValue > 6700 * man && thisValue <= 7700 * man) {
                  finalValue = menu[11];
                } else if (thisValue > 7700 * man && thisValue <= 8700 * man) {
                  finalValue = menu[12];
                } else if (thisValue > 8700 * man && thisValue <= 9700 * man) {
                  finalValue = menu[13];
                } else {
                  finalValue = menu[14];
                }

                updateQuery = {};
                updateQuery["requests.0.request.budget"] = finalValue;

                return {
                  history: null,
                  core: updateQuery
                };
              } else {
                return { history: null, core: null };
              }
            }
          }
        ]
      });

      this.wordings.center.push({
        name: "construct",
        title: "시공",
        callback: "blockCheck",
        children: [
          {
            name: "service",
            type: "checkbox",
            half: false,
            required: true,
            rewind: "시공 정도를 체크해주세요!",
            question: [
              "<b%생각하는 시공 정도%b>를 알려주세요!",
            ],
            multiple: false,
            items: [
              "시공 없이 홈퍼니싱만",
              "부분 시공과 홈스타일링",
              "전체 시공의 토탈 스타일링",
              "구조 변경을 포함한 고급 시공"
            ],
            realItems: [
              "s2011_aa01s",
              "s2011_aa02s",
              "s2011_aa03s",
              "s2011_aa04s",
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
                for (let i of items) {
                  i.style.display = "block";
                }
              }
            },
            value: function (request, history, self) {
              if (history.curation.service.serid.length === 0) {
                return null;
              } else {
                if (self.realItems.findIndex((i) => { return i === history.curation.service.serid[0]; }) === -1) {
                  return null;
                } else {
                  return self.items[self.realItems.findIndex((i) => { return i === history.curation.service.serid[0]; })];
                }
              }
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              }
              const { items, realItems, selected } = value;
              if (selected === null) {
                return { history: null, core: null };
              } else {
                let historyQuery, coreQuery;
                let selectedSerid;
                selectedSerid = [ realItems[selected] ];
                historyQuery = {};
                historyQuery["curation.service.serid"] = selectedSerid;
                coreQuery = {};
                coreQuery["requests.0.analytics.response.service.serid"] = realItems[selected];
                return {
                  history: historyQuery,
                  core: coreQuery
                };
              }
            },
            chain: function (siblings) {
              const thisValue = siblings.construct.find((obj) => { return obj.name === "service"; }).value.map((obj) => { return obj.index; });
              const target = siblings.construct.find((obj) => { return obj.name === "constructList"; });
              if (target.dom !== null) {
                const items = target.dom.children;
                let children;
                if (thisValue.length === 0 || thisValue.includes(0) || thisValue.includes(1)) {
                  for (let s of items) {
                    children = s.firstChild.children;
                    for (let dom of children) {
                      dom.style.color = dom.getAttribute("deactive");
                    }
                    s.setAttribute("toggle", "off");
                  }
                }
              }
            },
            freeze: function () {
              window.alert("시공 정도 변경을 희망하신다면, 홈리에종 카카오 채널로 직접 문의부탁드립니다!");
            }
          },
          {
            name: "constructList",
            type: "list",
            half: false,
            required: false,
            question: [
              "생각하고 있는 <b%시공이 있으시다면 체크%b>해주세요!"
            ],
            items: [
              { name: "철거", count: false, half: false, extra: false, contents: "마감재, 가구 철거" },
              { name: "설비", count: false, half: false, extra: false, contents: "배관, 난방, 에어컨 설비 등" },
              { name: "창호 공사", count: true, half: false, extra: false, contents: "방문, 중문 교체" },
              { name: "조명 공사", count: true, half: false, extra: false, contents: "조명기기 교체" },
              { name: "도장 공사", count: true, half: false, extra: false, contents: "페인팅, 탄성코트 등" },
              { name: "타일 공사", count: true, half: false, extra: false, contents: "현관, 주방, 발코니 등" },
              { name: "가구 공사", count: true, half: false, extra: false, contents: "붙박이장 등 제작 가구" },
              { name: "필름 공사", count: true, half: false, extra: false, contents: "면적, 난이도에 따라 상이" },
              { name: "도배 공사", count: true, half: false, extra: false, contents: "밑작업 난이도 상이" },
              { name: "목공사", count: true, half: false, extra: false, contents: "간접등 박스, 웨인스 코팅, 가벽 등" },
              { name: "발코니 확장", count: true, half: false, extra: true, contents: "거실, 주방 등 확장 발코니", alert: "발코니 확장은 토탈 스타일링 이상부터 가능합니다." },
              { name: "기타 공사", count: true, half: false, extra: true, contents: "샤시 교체, 금속 공사 등", alert: "기타 공사는 토탈 스타일링 이상부터 가능합니다." },
              { name: "전기 공사", count: true, half: true, extra: false, contents: "배선, 이동 추가 등", alert: "배선 전체의 공사인 경우, 토탈 스타일링으로 선택해주세요!", from: "공사", to: "일부" },
              { name: "욕실 공사", count: true, half: true, extra: false, contents: "도기 교체 등", alert: "욕실 전체의 공사인 경우, 토탈 스타일링으로 선택해주세요!", from: "공사", to: "일부" },
              { name: "주방 공사", count: true, half: true, extra: false, contents: "싱크 등 주방 가구 교체", alert: "주방 전체의 공사인 경우, 토탈 스타일링으로 선택해주세요!", from: "공사", to: "일부" },
              { name: "바닥 공사", count: true, half: true, extra: false, contents: "마루, 타일, 장판 등", alert: "바닥 전체의 공사인 경우, 토탈 스타일링으로 선택해주세요!", from: "공사", to: "일부" },
            ],
            multiple: true,
            value: function (request, history, self) {
              if (history.curation.construct.items.length === 0) {
                return null;
              } else {
                return history.curation.construct.items;
              }
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                const { items, realItems, selected } = value;
                if (selected.length === 0) {
                  return { history: null, core: null };
                } else {
                  let updateQuery;
                  updateQuery = {};
                  updateQuery["curation.construct.items"] = selected.map((i) => { return items[i].name; });
                  return {
                    history: updateQuery,
                    core: null
                  };
                }
              }
            },
            limit: function (siblings) {
              const standard = siblings.construct.find((obj) => { return obj.name === "service"; });
              if (standard.value !== null) {
                const button = standard.value.map((obj) => { return obj.index; })[0];
                if (button === 0) {
                  return null;
                } else if (button === 1) {
                  return { limit: 5, extra: true };
                } else if (button === 2) {
                  return { limit: 90000, extra: false };
                } else if (button === 3) {
                  return { limit: 90000, extra: false };
                }
              } else {
                return null;
              }
            }
          },
          {
            name: "spotStatus",
            type: "checkbox",
            half: false,
            required: false,
            question: [
              "시공 당일에 예상되는 <b%주거 환경을 알려주세요!%b>"
            ],
            items: [
              "거주중, 가구가 있는 상태",
              "거주중이지만 보관 이사 예정",
              "거주중 아님, 공실 상태",
            ],
            multiple: false,
            notice: "거주중일 경우 시공에 한계가 있습니다.",
            exception: function (items, media) {
              const mother = items[0].parentNode;
              const grandMother = mother.parentNode;
              const mobile = media[4];
              const desktop = !mobile;
              if (mobile) {
                mother.style.textAlign = "left";
                mother.style.left = String(-0.4) + "vw";
                mother.style.paddingTop = String(0.5) + "vw";
                for (let i of items) {
                  i.style.display = "block";
                }
              }
            },
            value: function (request, history, self) {
              return history.curation.construct.living ? self.items[0] : self.items[2];
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                const { items, realItems, selected } = value;
                if (selected === null) {
                  return { history: null, core: null };
                } else {
                  let updateQuery;
                  updateQuery = {};
                  updateQuery["curation.construct.living"] = (selected === 0);
                  return {
                    history: updateQuery,
                    core: null
                  };
                }
              }
            },
            chain: function (siblings) {
              const self = siblings.construct.find((obj) => { return obj.name === "spotStatus"; });
              const thisValue = self.value.map((obj) => { return obj.index; });
              const target = siblings.construct.find((obj) => { return obj.name === "service"; });
              let valueCopied;
              if (target.dom !== null) {
                if (thisValue.includes(0)) {
                  if (Array.isArray(target.value)) {
                    valueCopied = JSON.parse(JSON.stringify(target.value)).map((obj) => { return obj.index; });
                    if (valueCopied.includes(1) || valueCopied.includes(2) || valueCopied.includes(3)) {
                      window.alert("거주중일 경우, 시공에 한계가 있습니다!");
                      if (valueCopied.includes(2)) {
                        target.dom.children[1].click();
                      } else if (valueCopied.includes(3)) {
                        target.dom.children[1].click();
                      }
                    }
                  }
                }
              }
            }
          },
        ]
      });
      this.wordings.center.push({
        name: "style",
        title: "스타일",
        callback: "styleCheck",
        children: [
          {
            name: "curation",
            type: "style",
            half: false,
            required: true,
            rewind: "사진을 더 선택해주셔야 고객님께 맞는 디자이너를 추천드릴 수 있습니다! 스타일 체크를 완료해주세요 :)",
            question: [
              "마음에 드는 사진을 <b%3장%b> 골라주세요!",
              "하단의 '신청 완료하기' 버튼을 눌러주세요!"
            ],
            value: function (request, history, self) {
              return null;
            },
            update: function (value, siblings, client) {
              let updateQuery;
              if (value !== null) {
                updateQuery = {};
                updateQuery["curation.style"] = value;
                return {
                  history: updateQuery,
                  core: null
                };
              } else {
                return { history: null, core: null };
              }
            }
          }
        ]
      });
      this.wordings.pannel = {
        button: "서비스 금액 알아보기"
      };
      this.wordings.photo = {
        desktop: {
          question: "<b%현장 사진%b> 또는 도면이 있다면 보내주세요!",
          notice: "<b%*%b> 이미 보냈거나 없다면, 보내지 않으셔도 괜찮습니다!",
          file: "클릭 또는 드래그하여 파일 업로드 ..."
        },
        mobile: {
          question: "<b%현장 사진%b> 또는 도면이 있다면 보내주세요!",
          notice: "<b%*%b> 이미 보냈거나 없다면, 보내지 않으셔도 괜찮습니다!",
          file: "클릭하여 파일 업로드 ..."
        },
        before: [
          "beforeal1.jpg",
          "beforeal2.jpg",
          "beforeal3.jpg",
          "beforeal4.jpg",
          "beforeal5.jpg",
          "beforeal6.jpg",
        ]
      }
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
    get photoWordings() {
      return this.wordings.photo;
    }
  }
  return new StyleCurationWordings();
}

StyleCurationJs.prototype.styleCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, cleanChildren, isMac, sleep, ajaxJson, equalJson } = GeneralJs;
  const { photos, contentsArr, designers } = this;
  const pictureBoxClassName = "pictureBoxClassName";
  const pictureWordingTargetClassName = "pictureWordingTargetClassName";
  const greenClassName = "greenRemoveTarget";
  const stackName = "styleCheckNum";
  const loadingName = "loading";
  let pictureNumber, columnNumber;
  let randomPick, targetPhotos;
  let pictureBox;
  let innerMargin;
  let pictureMargin;
  let questionWording, completeWording;
  let pannelHeight;
  let pannelWordsSize;
  let pannelWordsPadding;
  let pannelLineTop;
  let arrowTop, arrowWidth;
  let tempDom;
  let photoHeight, photoWidth, photoWidthCss, photoHeightCss;
  let resetEvent;
  let arrowEvent;
  let pickupDesigners;
  let image;
  let firstPhoto;
  let questionBlock;

  GeneralJs.stacks[stackName] = 0;
  GeneralJs.stacks[loadingName] = false;

  pictureNumber = <%% 15, 12, 12, 12, 8 %%>;
  columnNumber = <%% 5, 4, 4, 4, 2 %%>;

  innerMargin = <%% 42, 36, 36, 28, 4.5 %%>;
  pictureMargin = <%% 10, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 114, 114, 114, 90, 18 %%>;
  pannelPaddingTop = <%% 32, 32, 32, 22, 0 %%>;
  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;
  pannelWordsPadding = <%% 16, 16, 16, 12, 16 %%>;
  pannelLineTop = <%% 47, 47, 47, 36, 47 %%>;

  arrowTop = <%% 43, 43, 43, 33, 2 %%>;
  arrowWidth = <%% 10, 10, 10, 8, 2 %%>;

  questionWording = wordings[0].question[0];
  completeWording = wordings[0].question[1];

  image = [];

  firstPhoto = <&& [ "t22p18.jpg", "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p102.jpg", "t3p41.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t1a79.jpg", "t5p122.jpg", "t6p94.jpg", "t14p47.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] | [ "t11p58.jpg", "t13a82.jpg", "t3a81.jpg", "t1p103.jpg", "t3p146.jpg", "t7p35.jpg", "t4p123.jpg", "t6p18.jpg" ] &&>;

  if (Math.random() < 0.5) {
    randomPick = photos.filter((obj) => { return firstPhoto.includes(obj.file) }).reverse();
  } else {
    randomPick = photos.filter((obj) => { return firstPhoto.includes(obj.file) });
  }

  this.randomPick = randomPick;
  targetPhotos = randomPick.map((obj) => { return S3HOST + obj.path; });
  this.photoPosition = [];

  mother.style.paddingTop = desktop ? String(innerMargin) + ea : String(0) + ea;
  if (mobile) {
    mother.style.background = "";
    mother.style.boxShadow = "";
  }

  if (desktop) {
    photoWidth = (this.mother.standardWidth - (this.whiteMargin * 2) - (innerMargin * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  } else {
    photoWidth = (this.mother.standardWidth - (this.whiteMargin * 2) - (0 * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  }
  photoWidthCss = "calc(calc(100% - " + String(pictureMargin * (columnNumber - 1)) + ea + ") / " + String(columnNumber) + ")";
  photoHeight = (205 / 297) * (photoWidth);
  photoHeightCss = String(photoHeight) + ea;

  pickupDesigners = function () {
    const photos = instance.photos;
    if (photos.length !== 0) {
      let tendencyAverage, designers, average;
      designers = JSON.parse(JSON.stringify(instance.designers));
      tendencyAverage = (new Array(photos[0].tendency.length)).fill(0, 0);
      for (let { tendency } of photos) {
        for (let i = 0; i < tendency.length; i++) {
          tendencyAverage[i] += tendency[i];
        }
      }
      tendencyAverage = tendencyAverage.map((n) => { return Math.round((n / photos.length) * 100) / 100; });

      for (let designer of designers) {
        average = 0;
        for (let i = 0; i < tendencyAverage.length; i++) {
          average += Math.abs(tendencyAverage[i] - designer.tendency[i]);
        }
        designer.tendencyLength = average;
      }

      designers.sort((a, b) => { return a.tendencyLength - b.tendencyLength });
      designers = designers.filter((d) => { return /완료/gi.test(d.information.contract.status); });
      designers = designers.map((obj) => { return obj.desid; });
      instance.values.style[0].value = designers;

      ajaxJson({
        page: "styleCuration",
        mode: "update",
        cliid: instance.client.cliid,
        update: { x: "style", y: 0, value: instance.values.style[0].value }
      }, BACKHOST + "/ghostClient_updateAnalytics").then(() => {
        return ajaxJson({
          page: "styleCuration",
          mode: "image",
          cliid: instance.client.cliid,
          image: image
        }, BACKHOST + "/ghostClient_updateAnalytics");
      }).then(() => {
        return ajaxJson({
          cliid: instance.client.cliid,
          name: instance.client.name,
          image: image,
        }, BACKHOST + "/styleCuration_styleCheckComplete");
      }).then(() => {
        return GeneralJs.homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "styleCheck",
          data: {
            cliid: instance.client.cliid,
            name: instance.client.name,
            image: image,
          },
        });
      }).catch((err) => {
        GeneralJs.ajaxJson({ message: "StyleCurationJs.styleCheck.pickupDesigners : " + err.message }, BACKHOST + "/errorLog").catch((e) => {});
      });

    }
  }

  resetEvent = function (forceQuit = false) {
    let rowLength, thisTime;
    let greenTargets;
    let style;
    let loading;
    let loadingWidth, completePaddingTop;
    let animationTime, delayTime, animationTimes, animationTimesTemp;
    let targetPhotos;

    loadingWidth = <%% 40, 40, 36, 30, 10 %%>;
    completePaddingTop = <%% 10, 10, 9, 8, 0 %%>;
    animationTime = 0.2;
    delayTime = 0.1;
    animationTimes = [];

    greenTargets = mother.querySelectorAll('.' + greenClassName);
    for (let dom of greenTargets) {
      dom.style.animation = "justfadeoutnine " + String(animationTime * 2) + "s ease forwards";
    }

    rowLength = Math.round(pictureNumber / columnNumber);
    animationTimesTemp = [];
    for (let i = 0; i < instance.photoPosition.length; i++) {
      animationTimesTemp.push(animationTime + ((i % rowLength) * delayTime));
      if (animationTimesTemp.length === columnNumber) {
        animationTimes.push(animationTimesTemp);
        animationTimesTemp = [];
      }
    }
    if (Math.random() > 0.5) {
      animationTimes = animationTimes.map((arr) => { return arr.reverse(); });
    }
    animationTimes = animationTimes.flat();

    for (let i = 0; i < instance.photoPosition.length; i++) {
      thisTime = String(animationTimes[i]) + 's';
      instance.photoPosition[i].style.animation = "fadedownlite " + String(animationTime) + "s ease " + thisTime + " forwards";
    }

    animationTimes.sort((a, b) => { return b - a; });

    loading = instance.mother.returnLoadingIcon();
    style = {
      position: "absolute",
      width: String(loadingWidth) + ea,
      height: String(loadingWidth) + ea,
      top: withOut(50, loadingWidth * (desktop ? (3 / 4) : 0.55), ea),
      left: withOut(50, loadingWidth * (1 / 2), ea),
    };
    for (let i in style) {
      loading.style[i] = style[i];
    }
    mother.querySelector("." + pictureBoxClassName).appendChild(loading);

    instance.randomPick = StyleCurationJs.randomPick(instance.photos, contentsArr, pictureNumber);
    if (!Array.isArray(instance.randomPick) || forceQuit === true) {
      sleep((animationTimes[0] * 1000) + 100).then(async () => {
        try {
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.backgroundImage = "";
            instance.photoPosition[i].style.height = String(0);
            instance.photoPosition[i].setAttribute("complete", "true");
          }
          mother.style.paddingTop = String(completePaddingTop) + ea;
          mother.querySelector("." + pictureBoxClassName).removeChild(loading);
          mother.querySelector('.' + pictureWordingTargetClassName).textContent = completeWording;
          for (let dom of greenTargets) {
            dom.remove();
          }
          await sleep(100);
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.display = "none";
          }
          GeneralJs.stacks[loadingName] = false;

          if (forceQuit !== true) {
            pickupDesigners();
          }

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.resetEvent.sleep.true : " + e.message }, BACKHOST + "/errorLog");
        }
      });
    } else {
      targetPhotos = instance.randomPick.map((obj) => { return S3HOST + obj.path; });
      sleep((animationTimes[0] * 1000) + (animationTime * 1000)).then(async () => {
        try {
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.backgroundImage = "url('" + targetPhotos[i] + "')";
          }
          await sleep(animationTime * 1000);
          mother.querySelector("." + pictureBoxClassName).removeChild(loading);
          for (let dom of greenTargets) {
            dom.remove();
          }
          await sleep(100);
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.animation = "fadeupmiddle " + String(animationTime) + "s ease forwards";
          }
          GeneralJs.stacks[loadingName] = false;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.resetEvent.sleep.false : " + e.message }, BACKHOST + "/errorLog");
        }
      });
    }
  }

  arrowEvent = function () {
    instance.selectPhotos = [];
    GeneralJs.stacks[loadingName] = true;
    GeneralJs.setTimeout(() => {
      resetEvent(false);
    }, 201);
  }

  pictureBox = createNode({
    mother,
    class: [ pictureBoxClassName ],
    style: {
      display: "block",
      position: "relative",
      marginLeft: desktop ? String(innerMargin) + ea : "",
      width: desktop ? withOut(innerMargin * 2, ea) : "",
    }
  });

  instance.values[name][0].dom = pictureBox;

  for (let i = 0; i < pictureNumber; i++) {
    tempDom = createNode({
      mother: pictureBox,
      class: [ "hoverDefault_lite" ],
      attribute: [
        { index: String(i) },
        { complete: "false" },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (this.getAttribute("complete") === "false" && !GeneralJs.stacks[loadingName]) {
              const index = Number(this.getAttribute("index"));
              const mother = this.parentNode;
              let radius, circleVisual;
              let greenTop, greenLeft;

              radius = <%% 22, 18, 17, 14, 4 %%>;
              circleVisual = <%% 4, 3, 3, 2, 0.5 %%>;

              greenTop = Math.floor(index / columnNumber) * (photoHeight + pictureMargin);
              greenLeft = (index % columnNumber) * (photoWidth + pictureMargin);

              createNode({
                mother,
                class: [ greenClassName, greenClassName + "_" + String(index) ],
                attribute: [
                  { file: instance.randomPick[index].file },
                  { index: String(index) }
                ],
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      const file = this.getAttribute("file");
                      const thisIndex = this.getAttribute("index");
                      let index, removeTargets;
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
                      removeTargets = mother.querySelectorAll('.' + greenClassName + "_" + thisIndex);
                      for (let dom of removeTargets) {
                        mother.removeChild(dom);
                      }
                    },
                  }
                ],
                style: {
                  position: "absolute",
                  width: photoWidthCss,
                  height: photoHeightCss,
                  top: String(greenTop) + ea,
                  left: String(greenLeft) + ea,
                  borderRadius: String(3) + "px",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: colorChip.green,
                  "mix-blend-mode": "multiply",
                }
              });
              createNode({
                mother,
                class: [ greenClassName, greenClassName + "_" + String(index) ],
                attribute: [
                  { file: instance.randomPick[index].file },
                  { index: String(index) }
                ],
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      const file = this.getAttribute("file");
                      const thisIndex = this.getAttribute("index");
                      let index, removeTargets;
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
                      removeTargets = mother.querySelectorAll('.' + greenClassName + "_" + thisIndex);
                      for (let dom of removeTargets) {
                        mother.removeChild(dom);
                      }
                    },
                  }
                ],
                mode: "svg",
                source: instance.mother.returnCheckCircle(colorChip.white),
                style: {
                  position: "absolute",
                  width: String(radius * 2) + ea,
                  top: String(greenTop + (photoHeight / 2) - (radius + circleVisual)) + ea,
                  left: String(greenLeft + (photoWidth / 2) - radius) + ea,
                  cursor: "pointer",
                },
              });

              instance.selectPhotos.push(instance.randomPick[index]);
              image.push(instance.randomPick[index].file);

              ajaxJson({ cliid: client.cliid, name: client.name, phone: client.phone, photos: equalJson(JSON.stringify(instance.selectPhotos)) }, BACKHOST + "/styleCuration_styleChecking").catch((err) => {
                console.log(err);
              });

              if (instance.selectPhotos.length >= 3) {
                instance.photos = StyleCurationJs.photoFilter(instance.photos, instance.selectPhotos);
                instance.selectPhotos = [];
                GeneralJs.stacks[loadingName] = true;
                GeneralJs.stacks[stackName] = GeneralJs.stacks[stackName] + 1;
                resetEvent(false);
              }

            }
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: photoWidthCss,
        height: photoHeightCss,
        borderRadius: String(3) + "px",
        marginRight: String(i % columnNumber === (columnNumber - 1) ? 0 : pictureMargin) + ea,
        marginBottom: String(pictureMargin) + ea,
        overflow: "hidden",
        background: colorChip.gray2
      }
    });
    this.photoPosition.push(tempDom);
  }

  for (let i = 0; i < pictureNumber; i++) {
    this.photoPosition[i].style.backgroundImage = "url('" + targetPhotos[i] + "')";
    this.photoPosition[i].style.backgroundPosition = "50% 50%";
    this.photoPosition[i].style.backgroundSize = "100% auto";
  }

  questionBlock = createNode({
    mother,
    style: {
      display: desktop ? "block" : "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(pannelHeight - pannelPaddingTop) + ea,
      paddingTop: desktop ? String(pannelPaddingTop) + ea : "",
      textAlign: "center",
      boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
      background: mobile ? colorChip.white : "",
      borderRadius: mobile ? String(5) + "px" : "",
      justifyContent: mobile ? "center" : "",
      alignItems: mobile ? "center" : ""
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
        source: this.mother.returnArrow("left", colorChip.green),
        events: [
          {
            type: "click",
            event: arrowEvent
          }
        ],
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          left: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingRight: String(pannelWordsPadding) + ea,
          background: colorChip.white,
          cursor: "pointer"
        }
      },
      {
        mode: "svg",
        source: this.mother.returnArrow("right", colorChip.green),
        events: [
          {
            type: "click",
            event: arrowEvent
          }
        ],
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          right: String(innerMargin) + ea,
          top: String(arrowTop) + ea,
          width: String(arrowWidth) + ea,
          paddingLeft: String(pannelWordsPadding) + ea,
          background: colorChip.white,
          cursor: "pointer"
        }
      },
      {
        class: [ pictureWordingTargetClassName ],
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
          width: desktop ? "" : String(100) + '%',
          top: mobile ? String(-0.3) + ea : "",
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.green,
        },
        under: {
          fontWeight: String(600),
          color: colorChip.green,
        }
      }
    ]
  });

  if (mobile) {
    mother.insertBefore(questionBlock, pictureBox);
  }

  if (Array.isArray(instance.values.style[0].value) && instance.values.style[0].value.length > 0 && instance.alreadyStyleCheck === true) {
    GeneralJs.setTimeout(() => {
      resetEvent(true);
    }, 0);
  }

}

StyleCurationJs.prototype.blockCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, isMac, dateToString, stringToDate, ajaxJson, returnGet } = GeneralJs;
  const token = '_';
  const listToken = '__list__';
  const getObj = returnGet();
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
  let barEntireValue;
  let barEndEvent;
  let today;
  let calendarMarginLeft;
  let calendarTop;
  let calendarWidth;
  let addressBoxTop;
  let addressBoxLeft;
  let addressBoxWidth;
  let addressBoxHeight;
  let updateValue;
  let listDoms;

  lineHeight = 1.6;
  barEntireValue = 100;

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
  itemCircleTop = <%% 7, 7, 7, 7, 2.3 %%>;

  if (desktop) {
    if (!isMac()) {
      itemCircleTop = itemCircleTop - 1;
    }
  }

  barTop = <%% 28, 28, 28, 28, 1.5 %%>;
  barHeight = <%% 9, 9, 9, 9, 2 %%>;
  barTextTop = <%% 3, 3, 3, 3, 4.8 %%>;
  if (desktop) {
    if (!isMac()) {
      barTextTop = barTextTop + 1;
    }
  }
  barTextMargin = <%% 10, 10, 10, 10, 5 %%>;

  barMotherHeight = <%% 49, 49, 49, 49, 5 %%>;

  barButtonTop = <%% 26, 26, 26, 26, 1 %%>;
  barButtonRadius = <%% 5.5, 5.5, 5.5, 5.5, 1.3 %%>;

  listAreaPaddingTop = <%% 13, 13, 13, 13, 1 %%>;
  listRightMargin = <%% 10, 10, 10, 10, 3.6 %%>;
  listBottomMargin = <%% 8, 8, 8, 8, 1 %%>;
  listColumnsLength = <%% 4, 4, 4, 4, 2 %%>;
  listFullWidth = <%% 400, 400, 400, 400, 60 %%>;
  listHypenWidth = <%% 10, 10, 10, 10, 2 %%>;
  listColumWidth = <%% 10, 10, 10, 10, 2 %%>;
  listColumPaddingLeft = <%% 2, 2, 2, 2, 1 %%>;

  calendarMarginLeft = <%% 6, 6, 5, 4, 1.8 %%>;
  calendarTop = <%% 15, 15, 15, 13, 3 %%>;
  calendarWidth = <%% 260, 250, 230, 210, 60 %%>;

  addressBoxTop = <%% 48, 48, 48, 48, 8 %%>;
  addressBoxLeft = <%% 0, 0, 0, 0, -6 %%>;
  addressBoxWidth = <%% 580, 580, 480, 370, 81 %%>;
  addressBoxHeight = <%% 440, 440, 450, 470, 77.8 %%>;

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
        marginBottom: desktop ? "" : String(0.5) + ea,
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

    instance.values[name][y].dom = answerArea;
    updateValue = obj.value(instance.client.requests[0], instance.clientHistory, obj);

    if (obj.type === "address") {
      if (mobile) {
        answerArea.style.marginTop = String(2) + ea;
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
            { value: updateValue },
            { x: name },
            { y: String(y) },
          ],
          events: [
            {
              type: "focus",
              event: function (e) {
                const self = this;
                const targetMother = this.parentNode;
                const grandMother = targetMother.parentNode.parentNode.parentNode;
                const x = this.getAttribute("x");
                const y = Number(this.getAttribute("y"));
                let addressFrame, removeTargets;
                grandMother.style.overflow = "";
                if (targetMother.querySelector("aside") === null) {
                  this.style.zIndex = String(2);
                  createNode({
                    mother: targetMother,
                    mode: "aside",
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          const targets = targetMother.querySelectorAll("aside");
                          for (let t of targets) {
                            targetMother.removeChild(t);
                          }
                          if (GeneralJs.stacks["addressEvent"] !== null) {
                            window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
                            GeneralJs.stacks["addressEvent"] = null;
                          }
                        }
                      }
                    ],
                    style: {
                      position: "fixed",
                      top: String(0) + ea,
                      left: String(0) + ea,
                      width: String(100) + '%',
                      height: String(100) + '%',
                      zIndex: String(1),
                      background: "transparent",
                    }
                  });
                  addressFrame = createNode({
                    mother: targetMother,
                    mode: "aside",
                    events: [
                      {
                        type: "click",
                        event: (e) => { e.preventDefault(); e.stopPropagation(); }
                      }
                    ],
                    style: {
                      position: "absolute",
                      top: String(addressBoxTop) + ea,
                      left: String(addressBoxLeft) + ea,
                      width: String(addressBoxWidth) + ea,
                      height: String(addressBoxHeight) + ea,
                      borderRadius: String(3) + "px",
                      overflow: "hidden",
                      zIndex: String(2),
                      background: colorChip.white,
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      animation: "fadeuplite 0.3s ease forwards",
                    },
                    children: [
                      {
                        mode: "iframe",
                        attribute: [
                          { src: window.location.protocol + "//" + window.location.host + "/tools/address" },
                          { width: String(100) + '%' },
                          { height: String(100) + '%' },
                        ],
                        style: {
                          position: "absolute",
                          top: String(0) + ea,
                          left: String(0) + ea,
                          border: String(0),
                        }
                      }
                    ]
                  });
                  GeneralJs.stacks["addressEvent"] = async function (e) {
                    try {

                      const inspectionArr = await ajaxJson({
                        mode: "inspection",
                        addressArr: [ { id: instance.client.cliid, address: e.data.trim().replace(/[\<\>\[\]\&\=\{\}\:\$]/gi, '') } ],
                        liteMode: false,
                      }, BACKHOST + "/parsingAddress");

                      if (inspectionArr.length !== 0) {
                        window.alert("주소가 잘못되었습니다! 주소를 표준 주소 체계 형식으로 고쳐주세요!\n(팝업의 검색 기능을 활용해주세요!)");
                        self.value = "";
                        instance.values[x][y].value = null;
                      } else {
                        self.value = e.data.trim();
                        instance.values[x][y].value = self.value.trim();
                        await ajaxJson({
                          page: "styleCuration",
                          mode: "update",
                          cliid: instance.client.cliid,
                          update: { x, y, value: instance.values[x][y].value },
                          updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
                        }, BACKHOST + "/ghostClient_updateAnalytics");
                      }

                      removeTargets = targetMother.querySelectorAll("aside");
                      for (let t of removeTargets) {
                        targetMother.removeChild(t);
                      }
                      window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
                      GeneralJs.stacks["addressEvent"] = null;
                    } catch (e) {
                      await GeneralJs.ajaxJson({ message: "StyleCurationJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
                    }
                  }
                  window.addEventListener("message", GeneralJs.stacks["addressEvent"]);
                } else {
                  removeTargets = targetMother.querySelectorAll("aside");
                  for (let t of removeTargets) {
                    targetMother.removeChild(t);
                  }
                  if (GeneralJs.stacks["addressEvent"] !== null) {
                    window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
                    GeneralJs.stacks["addressEvent"] = null;
                  }
                }
              }
            },
            {
              type: "blur",
              event: async function (e) {
                const self = this;
                try {
                  if (e.type === "blur") {
                    e.preventDefault();
                    e.stopPropagation();
                    const x = this.getAttribute("x");
                    const y = Number(this.getAttribute("y"));

                    if (self.value.trim() === '') {
                      self.value = "";
                      instance.values[x][y].value = null;
                    } else {
                      const inspectionArr = await ajaxJson({
                        mode: "inspection",
                        addressArr: [ { id: instance.client.cliid, address: self.value.trim().replace(/[\<\>\[\]\&\=\{\}\:\$]/gi, '') } ],
                        liteMode: false,
                      }, BACKHOST + "/parsingAddress");
                      if (inspectionArr.length !== 0) {
                        window.alert("주소가 잘못되었습니다! 주소를 표준 주소 체계 형식으로 고쳐주세요!\n(팝업의 검색 기능을 활용해주세요!)");
                        self.value = "";
                        instance.values[x][y].value = null;
                      } else {
                        instance.values[x][y].value = self.value.trim();
                        await ajaxJson({
                          page: "styleCuration",
                          mode: "update",
                          cliid: instance.client.cliid,
                          update: { x, y, value: instance.values[x][y].value },
                          updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
                        }, BACKHOST + "/ghostClient_updateAnalytics");
                      }
                    }

                  }
                } catch (e) {
                  await GeneralJs.ajaxJson({ message: "StyleCurationJs.addressEvent.blur : " + e.message }, BACKHOST + "/errorLog");
                }
              }
            },
            {
              type: "keypress",
              event: function (e) {
                if (e.type === "keypress" && e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  this.blur();
                }
              }
            }
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
            { x: name },
            { y: String(y) },
            { z: String(z) },
            { multiple: obj.multiple ? "true" : "false" },
            { value: i },
            { real: (obj.realItems !== undefined ? String(obj.realItems[z]) : "__undefined__") }
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                if (getObj.mode === "lite" && !instance.firstClick && typeof obj.freeze === "function") {
                  obj.freeze();
                } else {
                  const toggle = this.getAttribute("toggle");
                  const name = this.getAttribute("name");
                  const x = name;
                  const y = Number(this.getAttribute("y"));
                  const z = Number(this.getAttribute("z"));
                  const multiple = (this.getAttribute("multiple") === "true");
                  const siblings = document.querySelectorAll('.' + name + token + String(y));
                  const value = this.getAttribute("value");
                  let items, realItems;
                  let selected;
                  let valuesCopied;

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
                  instance.values[x][y].value = [];
                  for (let s of siblings) {
                    if (s.getAttribute("toggle") === "on") {
                      instance.values[x][y].value.push({ index: Number(s.getAttribute("z")), value: s.getAttribute("value") });
                    }
                  }
                  if (obj.chain !== undefined) {
                    obj.chain(instance.values);
                  }

                  instance.valuesConvert(true).then((valuesCopied) => {
                    return ajaxJson({
                      page: "styleCuration",
                      mode: "update",
                      cliid: instance.client.cliid,
                      update: { x, y, value: instance.values[x][y].value },
                      updateQuery: obj.update(valuesCopied[x][y].value, valuesCopied, instance.client)
                    }, BACKHOST + "/ghostClient_updateAnalytics");
                  }).catch((err) => {
                    GeneralJs.ajaxJson({ message: "StyleCurationJs.valuesConvert : " + err.message }, BACKHOST + "/errorLog").catch((e) => {});
                  });

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

      instance.firstClick = true;
      if (updateValue !== null) {
        if (obj.multiple) {
          for (let i of itemDoms) {
            if (updateValue.includes(i.getAttribute("value")) || updateValue.includes(i.getAttribute("real"))) {
              i.click();
            }
          }
        } else {
          for (let i of itemDoms) {
            if (updateValue === i.getAttribute("value") || updateValue === i.getAttribute("real")) {
              i.click();
            }
          }
        }
      }
      instance.firstClick = false;

    } else if (obj.type === "budget") {

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
          background: colorChip.gray3,
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
          fontWeight: String(700),
          color: colorChip.black,
          top: String(barTextTop) + ea,
        }
      });
      if (!media[3]) {
        createNode({
          mother: answerArea,
          text: obj.items[1],
          style: {
            position: "absolute",
            fontSize: String(standardSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
            left: String(<&& 192 | 122 | 100 | 57 | 16.5 &&>) + ea,
            top: String(barTextTop) + ea,
          }
        });
      }
      createNode({
        mother: answerArea,
        text: obj.items[2],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          left: String(<&& 378 | 236 | 192 | 130 | 33 &&>) + ea,
          top: String(barTextTop) + ea,
        }
      });
      if (!media[3]) {
        createNode({
          mother: answerArea,
          text: obj.items[3],
          style: {
            position: "absolute",
            fontSize: String(standardSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
            left: String(<&& 570 | 360 | 282 | 172 | 50 &&>) + ea,
            top: String(barTextTop) + ea,
          }
        });
      }
      barText1 = createNode({
        mother: answerArea,
        text: obj.items[4],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          right: String(0) + ea,
          top: String(barTextTop) + ea,
        }
      });

      if (desktop) {
        bar.style.width = withOut(0, "px");
        barLeft = 0;
        bar.style.left = String(barLeft) + "px";
      } else {
        barLeft = 0;
      }

      barBox = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          left: String(barLeft) + ea,
          top: String(0) + ea,
          width: String(50) + '%',
          height: String(100) + '%',
          transition: "all 0s ease",
        }
      });
      if (desktop) {
        barBox.style.width = String(barBox.getBoundingClientRect().width) + "px";
      }

      barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
      barBox.setAttribute("entire", String(bar.getBoundingClientRect().width));
      barBox.setAttribute("value", String(barEntireValue / 2));
      barBox.setAttribute("x", name);
      barBox.setAttribute("y", String(y));

      barClone = bar.cloneNode(true);
      barClone.style.width = String(100) + '%';
      barClone.style.left = String(0) + ea;
      barClone.style.background = colorChip.black;
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
      barEndEvent = function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";

        const x = barBox.getAttribute('x');
        const y = Number(barBox.getAttribute('y'));
        let thisValue, oppositeValue;

        thisValue = Number(barBox.getAttribute("value"));
        oppositeValue = barEntireValue - thisValue;

        instance.values[x][y].value = {
          entire: barEntireValue,
          value: thisValue,
          opposite: oppositeValue,
          values: [ thisValue, oppositeValue ]
        };

        ajaxJson({
          page: "styleCuration",
          mode: "update",
          cliid: instance.client.cliid,
          update: { x, y, value: instance.values[x][y].value },
          updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
        }, BACKHOST + "/ghostClient_updateAnalytics").catch((err) => {
          console.log(err);
        });
      }

      createNode({
        mother: answerArea,
        events: [
          {
            type: "click",
            event: function (e) {
              const x = e.x;
              const { left, width } = bar.getBoundingClientRect();
              let percentage;
              percentage = ((x - left) / width) * 100;
              barBox.style.transition = "all 0.3s ease";
              barBox.style.width = String(percentage) + '%';
              barBox.setAttribute("value", String(percentage));
              barEndEvent.call(this, e);
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(0) + ea,
          height: String(barHeight * (desktop ? 7 : 4)) + ea,
          borderRadius: String(barHeight + 1) + ea,
          background: "transparent",
          width: String(100) + '%',
          left: String(0) + ea,
        }
      });

      if (updateValue !== null) {
        if (desktop) {
          barBox.style.width = "calc(100% * " + String(updateValue / 100) + ")";
        } else {
          barBox.style.width = String(updateValue) + '%';
        }
        barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
        barBox.setAttribute("value", String(updateValue));
        barEndEvent({});
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
          background: colorChip.gray3,
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
          fontWeight: String(700),
          color: colorChip.shadow,
          top: String(barTextTop) + ea,
        }
      });
      createNode({
        mother: answerArea,
        text: obj.items[1],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          left: String(<&& 363 | 222 | 166 | 115 | 27 &&>) + ea,
          top: String(barTextTop) + ea,
        },
        bold: {
          fontSize: String(standardSize) + ea,
          fontWeight: String(700),
          color: colorChip.shadow,
        }
      });
      barText1 = createNode({
        mother: answerArea,
        text: obj.items[2],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          right: String(0) + ea,
          top: String(barTextTop) + ea,
        }
      });

      if (desktop) {
        // bar.style.width = withOut(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2), "px");
        // barLeft = barText0.getBoundingClientRect().width + barTextMargin;
        bar.style.width = withOut(0, "px");
        barLeft = 0;
        bar.style.left = String(barLeft) + "px";
      } else {
        barLeft = 0;
      }

      barBox = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          left: String(barLeft) + ea,
          top: String(0) + ea,
          // width: desktop ? "calc(calc(100% - " + String(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2)) + "px" + ") / 2)" : String(50) + '%',
          width: String(50) + '%',
          height: String(100) + '%',
          // background: colorChip.white,
          transition: "all 0s ease",
        }
      });
      if (desktop) {
        barBox.style.width = String(barBox.getBoundingClientRect().width) + "px";
      }

      barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
      barBox.setAttribute("entire", String(bar.getBoundingClientRect().width));
      barBox.setAttribute("value", String(barEntireValue / 2));
      barBox.setAttribute("x", name);
      barBox.setAttribute("y", String(y));

      barClone = bar.cloneNode(true);
      barClone.style.width = String(100) + '%';
      barClone.style.left = String(0) + ea;
      barClone.style.background = colorChip.green;
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
      barEndEvent = function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";

        const x = barBox.getAttribute('x');
        const y = Number(barBox.getAttribute('y'));
        let thisValue, oppositeValue;

        thisValue = Number(barBox.getAttribute("value"));
        oppositeValue = barEntireValue - thisValue;

        instance.values[x][y].value = {
          entire: barEntireValue,
          value: thisValue,
          opposite: oppositeValue,
          values: [ thisValue, oppositeValue ]
        };

        ajaxJson({
          page: "styleCuration",
          mode: "update",
          cliid: instance.client.cliid,
          update: { x, y, value: instance.values[x][y].value },
          updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
        }, BACKHOST + "/ghostClient_updateAnalytics").catch((err) => {
          console.log(err);
        });
      }

      createNode({
        mother: answerArea,
        events: [
          {
            type: "click",
            event: function (e) {
              const x = e.x;
              const { left, width } = bar.getBoundingClientRect();
              let percentage;
              percentage = ((x - left) / width) * 100;
              barBox.style.transition = "all 0.3s ease";
              barBox.style.width = String(percentage) + '%';
              barBox.setAttribute("value", String(percentage));
              barEndEvent.call(this, e);
            }
          }
        ],
        style: {
          position: "absolute",
          top: String(0) + ea,
          height: String(barHeight * (desktop ? 7 : 4)) + ea,
          borderRadius: String(barHeight + 1) + ea,
          background: "transparent",
          width: String(100) + '%',
          left: String(0) + ea,
        }
      });

      if (updateValue !== null) {
        if (desktop) {
          barBox.style.width = "calc(100% * " + String(updateValue / 100) + ")";
        } else {
          barBox.style.width = String(updateValue) + '%';
        }
        barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
        barBox.setAttribute("value", String(updateValue));
        barEndEvent({});
      }


    } else if (obj.type === "list") {

      answerArea.style.display = "block";
      answerArea.style.width = String(100) + '%';
      answerArea.style.paddingTop = String(listAreaPaddingTop) + ea;

      listNum = 0;
      listDoms = [];
      for (let obj2 of obj.items) {
        listDoms.push(createNode({
          mother: answerArea,
          class: [ "hoverDefault_lite", name + listToken + String(y) + listToken + String(z), name + listToken + String(y) ],
          attribute: [
            { toggle: "off" },
            { name: name },
            { x: name },
            { y: String(y) },
            { z: String(listNum) },
            { value: obj2.name },
            { count: obj2.count ? "true" : "false" },
            { half: obj2.half ? "true" : "false" },
            { extra: obj2.extra ? "true" : "false" },
            { alert: obj2.alert !== undefined ? obj2.alert : "" },
            { from: obj2.from !== undefined ? obj2.from : "" },
            { to: obj2.to !== undefined ? obj2.to : "" },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                const toggle = this.getAttribute("toggle");
                const x = this.getAttribute("name");
                const y = Number(this.getAttribute('y'));
                const z = Number(this.getAttribute('z'));
                const siblings = document.querySelectorAll('.' + name + listToken + String(y));
                const children = this.firstChild.children;
                const count = this.getAttribute("count") === "true";
                const half = this.getAttribute("half") === "true";
                const extra = this.getAttribute("extra") === "true";
                const alert = this.getAttribute("alert");
                const from = this.getAttribute("from");
                const to = this.getAttribute("to");
                let limitStandard;
                let siblingsChildren, limitNum;

                instance.values[x][y].value = [];
                limitStandard = obj.limit(instance.values);

                if (limitStandard === null) {
                  for (let s of siblings) {
                    siblingsChildren = s.firstChild.children;
                    for (let dom of siblingsChildren) {
                      dom.style.color = dom.getAttribute("deactive");
                    }
                    s.setAttribute("toggle", "off");
                  }
                } else {
                  if (toggle === "off") {
                    limitNum = 1;
                    for (let s of siblings) {
                      if (s.getAttribute("toggle") === "on") {
                        if (s.getAttribute("count") === "true") {
                          limitNum = limitNum + 1;
                        }
                      }
                    }
                    if (limitStandard.extra && extra) {
                      if (!instance.firstClick) {
                        window.alert(alert);
                      }
                      for (let dom of children) {
                        dom.style.color = dom.getAttribute("deactive");
                      }
                      this.setAttribute("toggle", "off");
                    } else if (limitNum > limitStandard.limit) {
                      if (count) {
                        for (let dom of children) {
                          dom.style.color = dom.getAttribute("deactive");
                        }
                        this.setAttribute("toggle", "off");
                      }
                    } else {
                      if (!half || (half && !limitStandard.extra)) {
                        for (let dom of children) {
                          dom.style.color = dom.getAttribute("active");
                        }
                      } else {
                        for (let dom of children) {
                          dom.style.color = dom.getAttribute("half");
                        }
                        if (!instance.firstClick) {
                          window.alert(alert);
                        }
                        children[1].textContent = children[1].textContent.replace(new RegExp(from), to);
                      }
                      this.setAttribute("toggle", "on");
                    }
                  } else {
                    for (let dom of children) {
                      dom.style.color = dom.getAttribute("deactive");
                    }
                    if (from !== "" && to !== "") {
                      children[1].textContent = children[1].textContent.replace(new RegExp(to), from);
                    }
                    this.setAttribute("toggle", "off");
                  }
                }

                for (let s of siblings) {
                  if (s.getAttribute("toggle") === "on") {
                    instance.values[x][y].value.push({ index: Number(s.getAttribute("z")), value: s.getAttribute("value") });
                  }
                }

                instance.valuesConvert(true).then((valuesCopied) => {
                  return ajaxJson({
                    page: "styleCuration",
                    mode: "update",
                    cliid: instance.client.cliid,
                    update: { x, y, value: instance.values[x][y].value },
                    updateQuery: obj.update(valuesCopied[x][y].value, valuesCopied, instance.client)
                  }, BACKHOST + "/ghostClient_updateAnalytics");
                }).catch((err) => {
                  console.log(err);
                });
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
                    { active: colorChip.green },
                    { half: colorChip.purple }
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
                    { active: colorChip.green },
                    { half: colorChip.purple }
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
                    { active: colorChip.gray5 },
                    { active: colorChip.gray5 },
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
                    { active: colorChip.green },
                    { half: colorChip.purple }
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
        }));
        listNum++;
      }

      instance.firstClick = true;
      if (updateValue !== null) {
        for (let i of listDoms) {
          if (updateValue.includes(i.getAttribute("value"))) {
            i.click();
          }
        }
      }
      instance.firstClick = false;

    } else if (obj.type === "calendar") {

      if (updateValue !== null) {
        today = updateValue;
        instance.values[name][y].value = updateValue;
      } else {
        today = new Date();
      }

      createNode({
        mother: answerArea,
        attribute: [
          { toggle: updateValue !== null ? "on" : "off" },
          { name: name },
          { x: name },
          { y: String(y) },
          { value: dateToString(today) },
        ],
        events: [
          {
            type: "click",
            event: function (e) {
              const self = this;
              const targetMother = this.parentNode;
              const grandMother = targetMother.parentNode.parentNode.parentNode;
              const x = this.getAttribute('x');
              const y = Number(this.getAttribute('y'));
              const toggle = this.getAttribute("toggle");
              const value = this.getAttribute("value");
              const calendar = instance.mother.makeCalendar(stringToDate(value), function (e) {
                const value = this.getAttribute("buttonValue");
                const dateValue = stringToDate(value);
                const removeTargets = targetMother.querySelectorAll("aside");
                const children = self.children;
                let text;
                text = '';
                text += String(dateValue.getFullYear()) + "년 ";
                text += String(dateValue.getMonth() + 1) + "월 ";
                text += String(dateValue.getDate()) + "일";
                children[children.length - 1].textContent = text;
                self.setAttribute("toggle", "on");
                self.setAttribute("value", dateToString(dateValue));
                instance.values[x][y].value = dateValue;
                ajaxJson({
                  page: "styleCuration",
                  mode: "update",
                  cliid: instance.client.cliid,
                  update: { x, y, value: instance.values[x][y].value },
                  updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
                }, BACKHOST + "/ghostClient_updateAnalytics").catch((err) => {
                  console.log(err);
                });
                for (let c of children) {
                  c.style.color = colorChip.green;
                }
                for (let dom of removeTargets) {
                  targetMother.removeChild(dom);
                }
              }, { width: calendarWidth, mobile });
              let cancelBox, whiteBox;
              grandMother.style.overflow = "";
              if (mobile) {
                targetMother.parentNode.parentNode.style.overflow = "";
              }
              cancelBox = createNode({
                mother: targetMother,
                mode: "aside",
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      const targets = targetMother.querySelectorAll("aside");
                      for (let t of targets) {
                        targetMother.removeChild(t);
                      }
                    }
                  }
                ],
                style: {
                  position: "fixed",
                  top: String(0) + ea,
                  left: String(0) + ea,
                  width: String(100) + '%',
                  height: String(100) + '%',
                  zIndex: String(2),
                  background: "transparent",
                }
              });
              whiteBox = createNode({
                mother: targetMother,
                mode: "aside",
                events: {
                  type: "click",
                  event: (e) => { e.stopPropagation(); }
                },
                style: {
                  position: "absolute",
                  top: String(wordingSize + calendarTop) + ea,
                  right: String(0) + ea,
                  width: String(calendarWidth) + ea,
                  borderRadius: String(3) + "px",
                  background: colorChip.white,
                  cursor: "pointer",
                  boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                  animation: "fadeupmiddle 0.3s ease forwards",
                  zIndex: String(2),
                  transition: "all 0s",
                }
              });
              calendar.calendarBase.addEventListener("click", (e) => { e.stopPropagation(); });
              whiteBox.appendChild(calendar.calendarBase);
            }
          }
        ],
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          verticalAlign: "top",
          textAlign: "right",
          zIndex: String(1),
        },
        children: [
          {
            text: obj.item + " : ",
            style: {
              display: (media[0] || media[4]) ? "inline-block" : "none",
              position: "relative",
              fontSize: String(wordingSize) + ea,
              fontWeight: String(200),
              color: colorChip[updateValue === null ? "deactive" : "green"],
              verticalAlign: "top",
              lineHeight: String(lineHeight),
              marginRight: String(calendarMarginLeft) + ea,
              textAlign: "right",
              cursor: "pointer",
            }
          },
          {
            text: String(today.getFullYear()) + "년 " + String(today.getMonth() + 1) + "월 " + String(today.getDate()) + "일",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(wordingSize) + ea,
              fontWeight: String((media[0] || media[4]) ? 400 : 200),
              color: colorChip[updateValue === null ? "deactive" : "green"],
              verticalAlign: "top",
              lineHeight: String(lineHeight),
              textAlign: "right",
              cursor: "pointer",
            }
          }
        ]
      });

    } else if (obj.type === "pyeong") {
      if (mobile) {
        answerArea.style.marginTop = String(2) + ea;
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
            { value: updateValue },
            { x: name },
            { y: String(y) },
          ],
          event: {
            focus: function (e) {
              this.value = this.value.replace(/[^0-9\.]/gi, '');
            },
            blur: async function (e) {
              const self = this;
              try {
                e.preventDefault();
                e.stopPropagation();
                const x = this.getAttribute("x");
                const y = Number(this.getAttribute("y"));
                let thisValue;

                thisValue = Number(self.value.replace(/[^0-9\.]/gi, ''));
                if (Number.isNaN(thisValue) || thisValue === 0) {
                  self.value = updateValue;
                } else {
                  instance.values[x][y].value = thisValue;
                  self.value = String(thisValue) + '평';
                  await ajaxJson({
                    page: "styleCuration",
                    mode: "update",
                    cliid: instance.client.cliid,
                    update: { x, y, value: instance.values[x][y].value },
                    updateQuery: obj.update(instance.values[x][y].value, instance.values, instance.client)
                  }, BACKHOST + "/ghostClient_updateAnalytics");
                }
              } catch (e) {
                console.log(err);
              }
            },
            keypress: function (e) {
              if (e.type === "keypress" && e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                this.blur();
              }
            }
          },
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
    }

    y++;
  }

  if (desktop) {
    blockMother.style.marginBottom = String(0) + ea;
  }

}

StyleCurationJs.prototype.photoBefore = function (mother) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, cleanChildren, isMac, sleep, ajaxJson } = GeneralJs;
  const { photos, contentsArr, designers } = this;
  const greenClassName = "greenRemoveTarget";
  const stackName = "styleCheckNum";
  const loadingName = "loading";
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
  let tempDom;
  let photoHeight, photoWidth, photoWidthCss, photoHeightCss;
  let image;
  let beforePhotos;
  let beforePhotosSelected;
  let randomNum;
  let greenTop, greenLeft;
  let noticeWording, noticeWordsSize;
  let noticeTop;
  let wordingBox;

  GeneralJs.stacks[stackName] = 0;
  GeneralJs.stacks[loadingName] = false;

  pictureNumber = <%% 5, 4, 4, 4, 2 %%>;
  columnNumber = <%% 5, 4, 4, 4, 2 %%>;

  innerMargin = <%% 42, 36, 36, 28, 4.5 %%>;
  pictureMargin = <%% 10, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 106, 106, 106, 92, 20 %%>;
  pannelPaddingTop = <%% 16, 16, 16, 12, 5 %%>;
  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;
  noticeWordsSize = <%% 12, 12, 12, 12, 3 %%>;
  pannelWordsPadding = <%% 16, 16, 16, 12, 16 %%>;
  pannelLineTop = <%% 31, 31, 31, 26, 47 %%>;

  if (desktop) {
    if (isMac()) {
      pannelPaddingTop = pannelPaddingTop;
    } else {
      pannelPaddingTop = pannelPaddingTop + 1;
    }
  }

  arrowTop = <%% 43, 43, 43, 33, 2 %%>;
  arrowWidth = <%% 10, 10, 10, 8, 2 %%>;

  noticeTop = <%% 53, 53, 53, 45, 11.2 %%>;

  questionWording = this.wordings.photoWordings[desktop ? "desktop" : "mobile"].question;
  noticeWording = this.wordings.photoWordings[desktop ? "desktop" : "mobile"].notice;

  beforePhotosSelected = [];
  beforePhotos = this.wordings.photoWordings.before;
  for (let i = 0; i < pictureNumber; i++) {
    randomNum = Math.floor(beforePhotos.length * Math.random());
    beforePhotosSelected.push(beforePhotos[randomNum]);
    beforePhotos.splice(randomNum, 1);
  }
  beforePhotosSelected = beforePhotosSelected.map((jpg) => { return StyleCurationJs.binaryPath + "/" + jpg; });

  image = [];

  randomPick = StyleCurationJs.randomPick(photos, contentsArr, pictureNumber);
  targetPhotos = randomPick.map((obj) => { return S3HOST + obj.path; });

  mother.style.paddingTop = desktop ? String(innerMargin) + ea : String(0) + ea;
  if (mobile) {
    mother.style.background = "";
    mother.style.boxShadow = "";
  }

  if (desktop) {
    photoWidth = (this.mother.standardWidth - (this.whiteMargin * 2) - (innerMargin * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  } else {
    photoWidth = (this.mother.standardWidth - (this.whiteMargin * 2) - (0 * 2) - (pictureMargin * (columnNumber - 1))) / columnNumber;
  }
  photoWidthCss = "calc(calc(100% - " + String(pictureMargin * (columnNumber - 1)) + ea + ") / " + String(columnNumber) + ")";
  photoHeight = (205 / 297) * (photoWidth);
  photoHeightCss = String(photoHeight) + ea;

  greenTop = Math.floor(2 / columnNumber) * (photoHeight + pictureMargin);
  greenLeft = (2 % columnNumber) * (photoWidth + pictureMargin);

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
      class: [ "hoverDefault_lite" ],
      attribute: [
        { index: String(i) },
        { complete: "false" },
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: photoWidthCss,
        height: photoHeightCss,
        borderRadius: String(3) + "px",
        marginRight: String(i % columnNumber === (columnNumber - 1) ? 0 : pictureMargin) + ea,
        marginBottom: String(pictureMargin) + ea,
        overflow: "hidden",
        background: colorChip.gray2,
        backgroundImage: "url('" + beforePhotosSelected[i] + "')",
        backgroundSize: "100% 100%",
        backgroundPosition: "50% 50%",
      }
    });
  }

  wordingBox = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(pannelHeight - pannelPaddingTop) + ea,
      paddingTop: String(pannelPaddingTop) + ea,
      textAlign: "center",
      background: mobile ? colorChip.white : "",
      boxShadow: mobile ? "0px 6px 12px -10px " + colorChip.gray5 : "",
      borderRadius: mobile ? String(3) + "px" : "",
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
          width: desktop ? "" : String(100) + '%',
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.green,
        }
      },
      {
        text: noticeWording,
        style: {
          position: "absolute",
          textAlign: "center",
          fontSize: String(noticeWordsSize) + ea,
          fontWeight: String(500),
          color: colorChip.deactive,
          width: String(99.7) + '%',
          top: String(noticeTop) + ea,
        },
        bold: {
          fontWeight: String(500),
          color: colorChip.green,
        }
      },
    ]
  });

  if (mobile) {
    mother.insertBefore(wordingBox, pictureBox);
  }

}

StyleCurationJs.prototype.valuesConvert = async function (deepCopy = false) {
  const instance = this;
  const center = this.wordings.centerWordings;
  let items, realItems, selected;
  let valuesCopied;
  try {
    if (deepCopy) {
      valuesCopied = JSON.parse(JSON.stringify(this.values));
    }

    for (let obj of center) {
      for (let i = 0; i < obj.children.length; i++) {
        if (obj.children[i].type === "checkbox" || obj.children[i].type === "list") {
          items = JSON.parse(JSON.stringify(obj.children[i].items));
          if (obj.children[i].realItems !== undefined) {
            realItems = JSON.parse(JSON.stringify(obj.children[i].realItems));
          } else {
            realItems = JSON.parse(JSON.stringify(items)).fill(null, 0);
          }
          if (deepCopy) {
            selected = JSON.parse(JSON.stringify(valuesCopied[obj.name][i].value));
          } else {
            selected = JSON.parse(JSON.stringify(this.values[obj.name][i].value));
          }
          if (selected === null) {
            selected = [];
          } else {
            selected = selected.map((obj) => { return obj.index; });
            if (!obj.children[i].multiple) {
              if (selected.length === 1) {
                selected = selected[0];
              } else {
                selected = null;
              }
            }
          }
          if (deepCopy) {
            valuesCopied[obj.name][i].value = { items, realItems, selected };
          } else {
            this.values[obj.name][i].value = { items, realItems, selected };
          }
        }
      }
    }

    return deepCopy ? valuesCopied : this.values;

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.valuesConvert : " + e.message }, BACKHOST + "/errorLog");
  }
}

StyleCurationJs.prototype.parsingValues = function () {
  const instance = this;
  const { ajaxJson, ajaxForm, returnGet } = GeneralJs;
  const grayLoading = this.mother.whiteProgressLoading();
  let center, temp;
  let coreQuery, historyQuery;
  let finalSerid;
  let formData;
  let cancelPhoto;

  center = this.wordings.centerWordings;

  this.valuesConvert(true).then((valuesCopied) => {
    coreQuery = {};
    historyQuery = {};
    for (let obj of center) {
      for (let i = 0; i < obj.children.length; i++) {
        temp = obj.children[i].update(valuesCopied[obj.name][i].value, valuesCopied, this.client);
        if (temp.history !== null) {
          for (let j in temp.history) {
            historyQuery[j] = temp.history[j];
          }
        }
        if (temp.core !== null) {
          for (let j in temp.core) {
            coreQuery[j] = temp.core[j];
          }
        }
      }
    }
    if (instance.fileInput.files.length > 0) {
      formData = new FormData();
      formData.enctype = "multipart/form-data";
      formData.append("name", instance.client.name);
      formData.append("cliid", instance.client.cliid);
      cancelPhoto = JSON.parse(instance.fileInput.getAttribute("cancel"));
      for (let i = 0; i < instance.fileInput.files.length; i++) {
        if (!cancelPhoto.includes(i)) {
          formData.append("upload0", instance.fileInput.files[i]);
        }
      }
      return ajaxForm(formData, BRIDGEHOST + "/clientBinary", grayLoading.progress.firstChild);
    } else {
      return new Promise((resolve, reject) => { resolve("success"); });
    }
  }).then(() => {
    return ajaxJson({ cliid: instance.client.cliid, historyQuery, coreQuery, mode: "calculation", fromConsole: 0 }, BACKHOST + "/styleCuration_updateCalculation");
  }).then((obj) => {
    if (typeof obj !== "object" || Object.keys(obj).length === 0) {
      throw new Error("promise error 0");
    } else if (obj.promisePass === true) {
      return new Promise((resolve, reject) => { resolve({ promisePass: true }); });
    } else {
      const { service, client, history } = obj;

      instance.client = client;
      instance.clientHistory = history;

      if (service.length === 0) {

        console.log(client.requests[0]);
        finalSerid = [
          {
            serid: history.curation.service.serid.length > 0 ? history.curation.service.serid[0] : "s2011_aa02s",
            min: Math.floor((client.requests[0].request.space.pyeong * 60000) / 100000) / 10,
            max: Math.ceil((client.requests[0].request.space.pyeong * 100000) / 1000000)
          }
        ]
        grayLoading.remove();
        GeneralJs.scrollTo(window, 0);
        return new Promise((resolve, reject) => { resolve({ promisePass: true }); });
      }

      finalSerid = history.curation.service.serid;
      finalSerid = finalSerid.map((serid) => {
        let feeArr;
        let min, max;
        feeArr = [];
        for (let { fee } of service) {
          for (let { amount } of fee) {
            feeArr.push(amount);
          }
        }
        feeArr.sort((a, b) => { return a - b; });
        min = Math.floor(feeArr[0] / 100000) / 10;
        max = Math.ceil(feeArr[feeArr.length - 1] / 1000000);
        return { serid, min, max };
      });

      if (finalSerid.length === 0) {
        throw new Error("promise error 1");
      } else {
        grayLoading.remove();
        GeneralJs.scrollTo(window, 0);
        return ajaxJson({
          page: "styleCuration",
          mode: "submit",
          cliid: instance.client.cliid,
        }, BACKHOST + "/ghostClient_updateAnalytics");
      }
    }
  }).then((obj) => {
    return instance.serviceConverting(finalSerid);
  }).then((message) => {
    if (message !== "done") {
      throw new Error("promise error 2");
    }
  }).catch((err) => {
    ajaxJson({
      message: instance.client.name + " 고객님이 큐레이션 페이지를 제출하는 도중 오류를 만나 비정상 종료되었습니다! error 내용 : " + err.message,
      channel: "#404_curation",
      voice: false,
    }, BACKHOST + "/sendSlack").then(() => {
      window.alert("오류가 발생하였습니다! 다시 한번 제출을 시도해주시길 부탁드립니다!");
      window.location.reload();
    }).catch((err) => { console.log(err); });
  });

}

StyleCurationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "상세 큐레이션";
  subTitleContents = "정확한 디자이너 매칭을 위해 꼭 작성해주세요!";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.white))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
          width: String(quoteWidth) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

StyleCurationJs.prototype.insertPendingProposal = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let margin;
  let leftRatio;
  let textBoxHeight, textBoxSize;
  let wording, wording2;
  let quotePaddingTop, quoteMarginBottom;
  let quoteWidth;
  let titleSize;
  let subTitleSize;
  let subTitlePaddingTop, subTitlePaddingBottom;

  bottomMargin = <%% 16, 16, 16, 12, 2 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  textBoxHeight = <%% 90, 90, 90, 90, 9 %%>;
  textBoxSize = <%% 17, 17, 17, 17, 17 %%>;

  quotePaddingTop = <%% 60, 60, 60, 60, 9 %%>;
  quoteMarginBottom = <%% 5, 5, 5, 5, 1 %%>;
  quoteWidth = <%% 20, 16, 14, 12, 3 %%>;

  titleSize = <%% 30, 27, 25, 21, 4.5 %%>;
  subTitleSize = <%% 14, 14, 13, 12, 3 %%>;
  subTitlePaddingTop = <%% 8, 8, 8, 8, 1 %%>;
  subTitlePaddingBottom = <%% 80, 80, 80, 80, 12 %%>;

  wording = "디자이너 추천서가 완료되는 대로,\n<b%알림톡을 보내드리겠습니다.%b>";
  wording2 = "추천서 제작에는 영업일 기준 1~2일 정도 소요될 수 있습니다.";

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
      paddingTop: String(quotePaddingTop) + ea,
      marginLeft: desktop ? String(margin) + ea : "",
      marginBottom: String(quoteMarginBottom) + ea,
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.green),
        style: {
          position: "relative",
          width: String(quoteWidth) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
      marginLeft: desktop ? String(margin) + ea : "",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: wording,
        style: {
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(300),
          color: colorChip.black,
          textAlign: "center",
          lineHeight: String(1.4),
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
      marginLeft: desktop ? String(margin) + ea : "",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: String(subTitlePaddingTop) + ea,
      paddingBottom: String(subTitlePaddingBottom) + ea,
    },
    children: [
      {
        text: wording2,
        style: {
          position: "relative",
          fontSize: String(subTitleSize) + ea,
          fontWeight: String(300),
          color: colorChip.black,
          textAlign: "center",
          lineHeight: String(1.6),
        },
        bold: {
          fontWeight: String(600),
          color: colorChip.black,
        }
      }
    ]
  });

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
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  barTop = <%% 15, 15, 15, 15, 2.6 %%>;

  titleBottom = <%% 15, 15, 15, 15, 0 %%>;
  blockBottom = <%% 40, 40, 40, 40, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  this.whiteMargin = (desktop ? margin : 0);

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
        style: {
          display: "block",
          position: "relative",
          width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
          height: String(100) + '%',
          marginLeft: String(desktop ? margin : 0) + ea,
        }
      }
    ]
  });
  whiteTong = whiteBlock.children[0];

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
            display: mobile ? "none" : "block",
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
            overflow: desktop ? "hidden" : "",
            marginBottom: String(num !== wordings.length ? blockBottom : 0) + ea,
            marginTop: desktop ? "" : String(4) + ea,
          }
        },
      ]
    });
    contents(block.lastChild);
    num++;
  }

}

StyleCurationJs.prototype.insertPhotoBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let barTop;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let grayHeight, grayWording, grayTextTop;
  let pannelWordsSize;
  let grayMargin;
  let fileTongClassName;
  let cardWidthNumber, cardHeightNumber, cardMargin, cardHeight;
  let cardInnerMargin, cardInnerMarginTop;
  let xIconWidth, xIconTop, xVisual;
  let cardWordingSize;
  let fileChangeEvent;

  bottomMargin = <%% 16, 16, 16, 12, 4 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  barTop = <%% 15, 15, 15, 15, 2.6 %%>;

  titleBottom = <%% 15, 15, 15, 12, 0 %%>;
  grayHeight = <%% 120, 120, 120, 120, 36 %%>;

  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;

  grayTextTop = <%% 40, 40, 39, 39, 14 %%>;
  grayMargin = <%% 16, 16, 16, 16, 3 %%>;

  if (desktop) {
    grayTextTop = grayTextTop + (isMac() ? 0 : 2);
  }

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  cardWidthNumber = <%% 8, 6, 5, 4, 2 %%>;
  cardHeightNumber = <%% 2, 2, 2, 2, 3 %%>;
  cardMargin = <%% 6, 6, 6, 6, 1 %%>;
  cardHeight = (grayHeight - (desktop ? grayMargin * 2 : (grayMargin * 2) + 2) - (cardMargin * (cardHeightNumber - 1))) / cardHeightNumber;

  cardWordingSize = <%% 13, 13, 13, 13, 3 %%>;
  cardInnerMargin = <%% 16, 16, 16, 16, 3 %%>;
  cardInnerMarginTop = <%% 11, 11, 11, 11, 2.1 %%>;
  if (desktop) {
    cardInnerMarginTop = cardInnerMarginTop + (isMac() ? 0 : 1);
  }
  xIconWidth = <%% 10, 10, 10, 10, 2 %%>;
  xIconTop = <%% 14, 14, 14, 14, 3 %%>;
  xVisual = <%% 4, 4, 4, 4, 1 %%>;

  fileTongClassName = "fileTong";

  grayWording = this.wordings.photoWordings[desktop ? "desktop" : "mobile"].file;

  this.whiteMargin = (desktop ? margin : 0);

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
          position: "relative",
          width: String(100) + '%',
          border: desktop ? "1px solid " + colorChip.gray2 : "",
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: String(5) + "px",
          overflow: desktop ? "hidden" : "",
          marginBottom: String(titleBottom) + ea,
          marginTop: desktop ? "" : String(3) + ea,
        }
      },
    ]
  });
  this.photoBefore(block.lastChild);

  fileChangeEvent = function (e) {
    const self = this;
    const mother = document.querySelector('.' + fileTongClassName);
    const cardMaker = (fileObj, index) => {
      createNode({
        mother,
        events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(100% - " + String(cardMargin * (cardWidthNumber - 1)) + ea + ") / " + String(cardWidthNumber) + ")",
          height: String(cardHeight) + ea,
          marginRight: String(index % cardWidthNumber === cardWidthNumber - 1 ? 0 : cardMargin) + ea,
          marginBottom: String(cardMargin) + ea,
          background: colorChip.white,
          borderRadius: String(3) + "px",
        },
        children: [
          {
            style: {
              position: "relative",
              top: String(cardInnerMarginTop) + ea,
              left: String(cardInnerMargin) + ea,
              width: withOut(xIconWidth + (cardInnerMargin * 2.8), ea),
              height: withOut(cardInnerMarginTop, ea),
              overflow: "hidden",
            },
            children: [
              {
                text: fileObj.name,
                style: {
                  position: "absolute",
                  fontSize: String(cardWordingSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  width: String(900) + ea,
                }
              }
            ]
          },
          {
            attribute: [
              { index }
            ],
            events: [
              {
                type: "click",
                event: function (e) {
                  const index = Number(this.getAttribute("index"));
                  let cancel;
                  cancel = JSON.parse(instance.fileInput.getAttribute("cancel"));
                  cancel.push(index);
                  instance.fileInput.setAttribute("cancel", JSON.stringify(cancel));
                  this.parentElement.parentElement.removeChild(this.parentElement);
                }
              }
            ],
            style: {
              position: "absolute",
              background: colorChip.white,
              width: String(xIconWidth) + ea,
              height: String(xIconWidth) + ea,
              right: String(cardInnerMargin) + ea,
              top: String(xIconTop) + ea,
            },
            children: [
              {
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth + (xVisual * 2)) + ea,
                  height: String(xIconWidth + (xVisual * 2)) + ea,
                  right: String(-1 * xVisual) + ea,
                  top: String(-1 * xVisual) + ea,
                }
              },
              {
                mode: "svg",
                source: instance.mother.returnCancel(colorChip.green),
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth) + ea,
                  right: String(0) + ea,
                  top: String(0) + ea,
                }
              }
            ]
          }
        ]
      });
    }
    cleanChildren(mother);
    for (let i = 0; i < this.files.length; i++) {
      cardMaker(this.files[i], i);
    }
    if (this.files.length === 0) {
      this.previousElementSibling.style.display = "block";
    } else {
      this.previousElementSibling.style.display = "none";
    }
  }

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      cursor: "pointer",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: String(grayHeight) + ea,
          border: desktop ? "1px solid " + colorChip.gray1 : "",
          background: desktop ? colorChip.gray1 : colorChip.gray3,
          borderRadius: String(desktop ? 5 : 3) + "px",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(grayMargin + (desktop ? 0 : 2)) + ea,
              left: String(grayMargin) + ea,
              width: withOut(grayMargin * 2, ea),
              height: withOut(grayMargin + grayMargin + (desktop ? 0 : 2), ea),
              overflow: "scroll",
              zIndex: String(1),
            },
            children: [
              {
                class: [ fileTongClassName ],
                style: {
                  position: "relative",
                  width: String(100) + '%',
                  top: String(0),
                  left: String(0),
                }
              }
            ]
          }
        ]
      },
      {
        text: grayWording,
        style: {
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          fontSize: String(pannelWordsSize) + ea,
          fontWeight: String(200),
          color: desktop ? colorChip.gray4 : colorChip.shadow,
          top: String(grayTextTop) + ea,
        }
      },
      {
        mode: "input",
        events: [
          {
            type: "change",
            event: fileChangeEvent
          }
        ],
        attribute: [
          { type: "file" },
          { name: "upload" },
          { accept: "image/*,  application/pdf" },
          { multiple: "true" },
          { cancel: JSON.stringify([]) }
        ],
        style: {
          position: "absolute",
          display: "none",
        }
      }
    ],
    events: [
      {
        type: "click",
        event: function (e) {
          this.querySelector("input").click();
        }
      },
      {
        type: "drop",
        event: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.querySelector("input").files = e.dataTransfer.files;
          fileChangeEvent.call(this.querySelector("input"), e);
        }
      },
      {
        type: [ "dragenter", "dragover", "dragleave" ],
        event: (e) => { e.preventDefault(); e.stopPropagation(); }
      },
    ]
  });

  this.fileInput = block.querySelector("input");

}

StyleCurationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone } = GeneralJs;
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

  buttonTextTop = <%% 9, 9, 9, 9, (isIphone() ? 1.1 : 1.3) %%>;
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

  ajaxJson({}, BACKHOST + "/designerProposal_policy").then(function (res) {
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
              // if (instance.testMode === true && GeneralJs.returnGet().cliid === "c1801_aa01s") {
              if (false) {
                window.location.href = window.location.protocol + "//" + window.location.host + "/middle/proposal?proid=" + "p1801_aa01s";
              } else {
                let pass;

                pass = true;
                for (let i in instance.values) {
                  for (let j of instance.values[i]) {
                    if (j.required) {
                      if (j.value === null) {
                        window.alert(j.rewind);
                        GeneralJs.scrollTo(window, j.dom, (instance.naviHeight + 20));
                        pass = false;
                        break;
                      }
                    }
                  }
                  if (!pass) {
                    break;
                  }
                }
                if (pass) {

                  instance.parsingValues();

                }
              }
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
            text: "신청 완료하기",
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

StyleCurationJs.prototype.insertServiceBox = function (seridObj) {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac } = GeneralJs;
  let blockMarginBottom;
  let top;
  let bottom;
  let whiteBlock0, whiteBlock1, whiteBlock2, whiteBlock3, whiteBlock4;
  let leftBox0, leftBox1, leftBox2, leftBox3, leftBox4;
  let rightBox0, rightBox1, rightBox2, rightBox3, rightBox4;
  let contents0, contents1, contents2, contents3, contents4;
  let height0, height1, height2, height3, height4;
  let lastBlockMarginBottom;
  let margin;
  let titleFont;
  let titleLeft;
  let titleFontWeight;
  let wordSpacing;
  let lineHeight;
  let leftBoxWidth;
  let title;
  let description;
  let image;
  let boxMargin;
  let boxTong;
  let rightBoxPaddingTop;
  let titleVisualTop;
  let boxTongPaddingBottom;
  let contents0PhotoHeight;
  let contents0PaddingLeft, contents0PaddingTop, contents0PaddingBottom;
  let contents0TitleSize, contents0TitleWeight;
  let contents0TitleWhiteBoxMargin;
  let contents0DescriptionSize, contents0DescriptionWeight;
  let contents0DescriptionMarginTop;
  let contents0DescriptionWeightBold;
  let contents0DescriptionLineHeight;
  let contents0Columns;
  let contents0Box;
  let contents0WhitePaddingTop, contents0WhitePaddingBottom, contents0WhitePaddingLeft;
  let contents0IconWidth, contents0IconMarginRight, contents0IconTop;
  let contents0FactorMarginBottom;
  let contents0LineTop;
  let contents0TitlePaddingTop;
  let rightBoxPaddingTopFontVersion;
  let contents1TitleSize, contents1TitleWeight;
  let contents1UpBox, contents1DownBox;
  let contents1TitleBetween;
  let contents1Between;
  let contents1Columns;
  let contents1UpBoxWidth;
  let contents1UpBoxMargin;
  let contents1UpBoxPaddingLeft;
  let contents1UpBoxPaddingTop;
  let contents1UpBoxCheckTop;
  let contents1UpBoxCheckWidth;
  let contents1UpBoxCheckMarginRight;
  let contents1UpBoxTitleSize;
  let contents1UpBoxTitleWeight;
  let contents1UpBoxWhiteMarginTop;
  let contents1UpBoxWhitePaddingTop;
  let contents1UpBoxWhitePaddingBottom;
  let contents1UpBoxWhiteSize;
  let contents1UpBoxWhiteWeight;
  let contents1UpBoxWhiteWeightBold;
  let contents1UpBoxWhiteLineHeight;
  let contents1DownBoxPaddingTop;
  let contents1DownBoxPaddingBottom;
  let contents1DownBoxPaddingMargin;
  let contents1DownBoxPaddingLeft;
  let contents1DownBoxCircleHeight;
  let contents1DownBoxTitleMarginTop;
  let contents1DownBoxDescriptionMarginTop;
  let contents1DownBoxDescriptionSize;
  let contents2Box;
  let contents2LineBoxHeight;
  let contents2LineTop;
  let contents2LineRadius;
  let contents2LineTitlePaddingTop;
  let contents2LineTitlePaddingBottom;
  let contents2LineTitlePaddingLeft;
  let contents2LineTitleSize;
  let contents2LineTitleWeight;
  let contents2ImageTop;
  let contents2BoxMarginTop;
  let contents2BoxFactorWidth;
  let contents2BoxFactorHeight;
  let contents2BoxFactorMarginLeftArr;
  let contents2TitleSize;
  let contents2TitleWeight;
  let contents2DescriptionSize;
  let contents2DescriptionWeight;
  let contents2DescriptionMarginTop;
  let contents2DescriptionLineHeight;
  let contents3Box, contents3BoxFactor;
  let contents3BoxGray;
  let contents3BoxMarginTop;
  let contents3BoxBetween;
  let contents3GreenHeight;
  let contents3GreenTextTop;
  let contents3GreenSize;
  let contents3GreenWeight;
  let contents3GrayHeight;
  let contents3GrayInnerPadding;
  let contents3GrayWhiteSize;
  let contents3GrayWhiteWeight;
  let contents3GrayWhiteLineHeight;
  let contents3GrayWhitePaddingTop;
  let contents3GrayWhitePaddingBottom;
  let contents3GrayWhiteWeightBold;
  let contents3GrayChildrenMarginTop;
  let contents3GrayChildrenWeight;
  let contents3GrayChildrenPaddingTop;
  let contents3PictureHeight;
  let num;
  let titleMarginBottom;
  let data;
  let selectedBoo;

  data = seridObj.map((obj) => { return Number(obj.serid.split('_')[1].replace(/[^0-9]/gi, '').replace(/^0/gi, '').replace(/^0/gi, '').replace(/^0/gi, '')) - 1; });
  if (data.length === 0) {
    data = 1;
  } else {
    data = data[0];
  }

  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  margin = <%% 52, 52, 44, 32, 6 %%>;

  titleFont = <%% 29, 24, 21, 17, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 600, 600, 600 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;

  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  leftBoxWidth = <%% 300, 230, 300, 300, 300 %%>;

  boxMargin = <%% 36, 25, 24, 36, 36 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  rightBoxPaddingTopFontVersion = <%% 2, 2, 2, 2, 7 %%>;

  height0 = <%% 310, 268, 315, 255, 79 %%>;
  height1 = <%% 570, 480, 550, 447, 216 %%>;
  height2 = <%% 518, 373, 472, 375, 108 %%>;
  height3 = <%% 430, 360, 438, 370, 163 %%>;
  height4 = <%% 310, 270, 310, 276, 109 %%>;

  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 2 %%>;

  boxTongPaddingBottom = <%% 10, 10, 6, 10, 10 %%>;
  contents0PhotoHeight = <%% 180, 130, 150, 130, 130 %%>;

  contents0PaddingLeft = <%% 15, 15, 15, 12, 3 %%>;
  contents0PaddingTop = <%% 20, 20, 20, 12, 3 %%>;
  contents0PaddingBottom = <%% 9, 9, 9, 9, 3 %%>;
  contents0TitleSize = <%% 22, 19, 19, 17, 3.5 %%>;
  contents0TitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  contents0TitleWhiteBoxMargin = <%% 15, 15, 15, 15, 15 %%>;

  contents0DescriptionSize = <%% 17, 16, 16, 15, 3.2 %%>;
  contents0DescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents0DescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  contents0DescriptionWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents0DescriptionMarginTop = <%% 20, 15, 15, 20, 4 %%>;

  contents0Columns = <%% 3, 3, 3, 3, 3 %%>;

  contents0WhitePaddingTop = <%% 26, 22, 26, 19, 4.5 %%>;
  contents0WhitePaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 16 : 14), (isMac() ? 20 : 18), (isMac() ? 15 : 13), 3.5 %%>;
  contents0WhitePaddingLeft = <%% 30, 26, 30, 24, 5.5 %%>;

  contents0IconWidth = <%% 14, 12, 14, 12, 2.5 %%>;
  contents0IconMarginRight = <%% 7, 6, 7, 7, 1.5 %%>;
  contents0IconTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), 1.2 %%>;

  contents0LineTop = <%% (isMac () ? 15 : 13), (isMac () ? 13 : 11), (isMac () ? 13 : 11), (isMac () ? 12 : 10), 15 %%>;

  contents0FactorMarginBottom = <%% 13, 10, 10, 8, 2 %%>;
  contents0TitlePaddingTop = <%% 30, 24, 21, 18, 4.5 %%>;

  contents1TitleSize = <%% 19, 18, 17, 15, 4.2 %%>;
  contents1TitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents1TitleBetween = <%% 16, 14, 14, 12, 6 %%>;
  contents1Between = <%% 45, 40, 30, 22, 9 %%>;

  contents1Columns = <%% 5, 5, 5, 5, 2 %%>;

  contents1UpBoxWidth = <%% 232, 197, 225, 185, 88 %%>;
  contents1UpBoxMargin = <%% 10, 8, 8, 8, 1 %%>;
  contents1UpBoxPaddingLeft = <%% 22, 18, 20, 14, 3.5 %%>;
  contents1UpBoxPaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 14 : 15), (isMac() ? 15 : 16), (isMac() ? 11 : 12), 3.5 %%>;

  contents1UpBoxCheckTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), 15.5 %%>;
  contents1UpBoxCheckWidth = <%% 11, 11, 11, 10, 2.6 %%>;
  contents1UpBoxCheckMarginRight = <%% 6, 6, 6, 6, 6 %%>;

  contents1UpBoxTitleSize = <%% 16, 15, 16, 14, 3.5 %%>;
  contents1UpBoxTitleWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents1UpBoxWhiteMarginTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 8 : 6), 3 %%>;
  contents1UpBoxWhitePaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 13 : 14), 3 %%>;
  contents1UpBoxWhitePaddingBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 18 : 16), 3.5 %%>;

  contents1UpBoxWhiteSize = <%% 14, 13, 14, 11, 2.8 %%>;
  contents1UpBoxWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents1UpBoxWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents1UpBoxWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents1DownBoxPaddingTop = <%% 30, 22, 24, 18, 5.5 %%>;
  contents1DownBoxPaddingBottom = <%% (isMac() ? 36 : 34), (isMac() ? 24 : 22), (isMac() ? 26 : 24), (isMac() ? 21 : 19), 6 %%>;
  contents1DownBoxPaddingMargin = <%% 10, 8, 10, 8, 2 %%>;
  contents1DownBoxPaddingLeft = <%% 36, 22, 24, 18, 6 %%>;
  contents1DownBoxCircleHeight = <%% 119, 92, 106, 87, 25 %%>;

  contents1DownBoxTitleMarginTop = <%% (isMac() ? 17 : 18), (isMac() ? 12 : 13), (isMac() ? 14 : 15), (isMac() ? 12 : 13), 2.5 %%>;
  contents1DownBoxDescriptionMarginTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), 1 %%>;
  contents1DownBoxDescriptionSize = <%% 13, 12, 13, 11, 2.8 %%>;

  contents2LineBoxHeight = <%% 45, 45, 45, 45, 45 %%>;
  contents2LineTop = <%% 17, 16, 17, 17, 17 %%>;
  contents2LineRadius = <%% 12, 12, 12, 12, 12 %%>;
  contents2LineTitlePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  contents2LineTitlePaddingBottom = <%% 9, 9, 9, 9, 9 %%>;
  contents2LineTitlePaddingLeft = <%% 16, 16, 16, 16, 16 %%>;
  contents2LineTitleSize = <%% 14, 13, 14, 14, 14 %%>;
  contents2LineTitleWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents2ImageTop = <%% 40, 25, 20, 40, 40 %%>;
  contents2BoxMarginTop = <%% 25, 18, 20, 25, 25 %%>;
  contents2BoxFactorWidth = <%% 172, 144, 166, 172, 172 %%>;
  contents2BoxFactorHeight = <%% 100, 100, 100, 100, 100 %%>;
  contents2BoxFactorMarginLeftArr = <&& [ 0, 106, 106, 91 ] | [ 0, 48, 48, 41 ] | [ 0, 49, 52, 42 ] | [ 0, 106, 106, 91 ] | [ 0, 106, 106, 91 ] &&>;

  contents2TitleSize = <%% 18, 17, 17, 18, 3.5 %%>;
  contents2TitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents2DescriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  contents2DescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents2DescriptionMarginTop = <%% 10, 6, 6, 6, 10 %%>;
  contents2DescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents3BoxMarginTop = <%% 40, 20, 20, 40, 4 %%>;
  contents3BoxBetween = <%% 12, 8, 8, 8, 2 %%>;
  contents3GreenHeight = <%% 48, 48, 48, 40, 9 %%>;
  contents3GreenTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  contents3GreenSize = <%% 15, 14, 14, 13, 3 %%>;
  contents3GreenWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents3GrayHeight = <%% 640, 584, 625, 640, 640 %%>;
  contents3GrayInnerPadding = <%% 12, 10, 12, 10, 2 %%>;
  contents3GrayWhiteSize = <%% 13, 12, 13, 11, 2.7 %%>;
  contents3GrayWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents3GrayWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents3GrayWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents3GrayWhitePaddingTop = <%% (isMac() ? 17 : 18), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 12 : 13), 3 %%>;
  contents3GrayWhitePaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 17 : 15), (isMac() ? 17 : 15), (isMac() ? 16 : 14), 3.8 %%>;

  contents3GrayChildrenMarginTop = <%% 20, 15, 20, 20, 20 %%>;
  contents3GrayChildrenWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents3GrayChildrenPaddingTop = <%% 3, 3, 3, 3, 3 %%>;

  contents3PictureHeight = <%% 160, 120, 138, 110, 26 %%>;

  contents1 = [
    {
      title: "디자이너 역할",
      children: [
        {
          title: "디자인",
          description: "큰 <b%가구부터 패브릭%b>과 소품,\n그리고 <b%시공 디자인%b>을 제안해요.",
        },
        {
          title: "일정 운영",
          description: "시공과 제품 주문 시기의\n<b%일정을 일괄적으로 관리%b>해요.",
        },
        {
          title: "예산 운영",
          description: "<b%같은 예산도 다르게%b> 쓰일 수 있도록\n예산을 분배하고 최적화합니다.",
        },
      ]
    },
    {
      title: "디자이너 제공물",
      children: [
        {
          title: "일정표",
          description: "계약 기간 기준의\n전체 일정 캘린더",
          image: "contents10.png",
        },
        {
          title: "컨셉 제안",
          description: "프로젝트에 반영될\n컨셉 디자인",
          image: "contents11.png",
        },
        {
          title: "배치도",
          description: "공간별 구성 및\n가구/소품 배치 도면",
          image: "contents12.png",
        },
        {
          title: "제품 제안",
          description: "기존 제품 활용 제안 및\n새 제품 구매 리스트",
          image: "contents13.png",
        },
        {
          title: "시공 디자인",
          description: "시공 포함된\n서비스 진행 시 해당",
          image: "contents14.png",
        },
      ]
    }
  ];

  if (mobile) {
    contents1[1].children.pop();
  }

  contents2 = {
    image: "contents2" + String(media.findIndex(boo => boo)) + ".png"
  };

  contents3 = {
    title: "디자인 서비스 종류",
    children: [
      {
        title: "홈퍼니싱",
        description: [
          (<&& "시공 없이 가구와 소품 등으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" &&>),
          "시공 없음\n약 30일 소요"
        ],
        image: "s0.jpg",
      },
      {
        title: "홈스타일링",
        description: [
          (<&& "부분 시공과 홈퍼니싱으로 필요\n부분만 진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" &&>),
          "5개 공정 이하의 시공\n약 45일 소요"
        ],
        image: "s1.jpg",
      },
      {
        title: "토탈 스타일링",
        description: [
          (<&& "시공부터 스타일링까지 완벽하게\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" &&>),
          "5개 초과 공정 전체 시공\n약 60일 소요"
        ],
        image: "s2.jpg",
      },
      {
        title: "엑스트라 스타일링",
        description: [
          (<&& "디자인 토탈 시공과 <b%프리미엄%b>\n<b%스타일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" &&>),
          "5개 초과 공정 전체 시공\n약 75일 소요"
        ],
        image: "s3.jpg",
      },
    ],
  };

  contents4 = {
    image: "contents4" + String(media.findIndex(boo => boo)) + ".png"
  };

  contents0 = {
    check: [
      "시공<b%'만'%b> 진행하는 것은 불가해요.",
      "부분 공간은 <b%'두 공간'%b>부터 가능해요. (원룸은 진행 가능)",
      "<b%'거주 중'%b>에는 부분 도배와 필름 시공 외에는 시공이 불가해요.",
    ],
    notice: "체크해주신 정보를 바탕으로 영업일 2~3일내 디자이너 추천서를 보내드리고,\n<b%홈리에종의 유선 1:1 맞춤 상담이 이어집니다!%b>"
  };

  // box 3 ---------------------------------------------------------------------------------------------------

  whiteBlock3 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height3) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox3 = createNode({
    mother: whiteBlock3,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox3,
    text: big ? "고객님께 추천하는\n스타일링 유형" : "고객님께 추천하는 스타일링 유형",
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox3 = createNode({
    mother: whiteBlock3,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTop) + ea,
    }
  });

  contents3Box = createNode({
    mother: rightBox3,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
    }
  });

  for (let i = 0; i < contents3.children.length; i++) {

    selectedBoo = (data === i);

    contents3BoxFactor = createNode({
      mother: contents3Box,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents3BoxBetween * (desktop ? (contents3.children.length - 1) : 1)) + ea + ") / " + String(desktop ? contents3.children.length : 2) + ")",
        marginRight: desktop ? String(i === contents3.children.length - 1 ? 0 : contents3BoxBetween) + ea : String(i % 2 === 1 ? 0 : contents3BoxBetween) + ea,
        marginBottom: desktop ? "" : String(contents3BoxBetween) + ea,
        verticalAlign: "top",
      }
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: selectedBoo ? colorChip.green : colorChip.gray2,
        height: String(contents3GreenHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
      },
      children: [
        {
          text: contents3.children[i].title,
          style: {
            position: "relative",
            top: String(contents3GreenTextTop) + ea,
            fontSize: String(contents3GreenSize) + ea,
            fontWeight: String(contents3GreenWeight),
            color: selectedBoo ? colorChip.white : colorChip.deactive,
          }
        }
      ]
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        height: String(contents3PictureHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
        backgroundImage: "url('" + StyleCurationJs.binaryPath + "/" + contents3.children[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        filter: selectedBoo ? "" : "grayscale(1)",
        opacity: selectedBoo ? "" : String(0.7),
      }
    })

    contents3BoxGray = createNode({
      mother: contents3BoxFactor,
      style: {
        display: "block",
        position: "relative",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        paddingTop: String(contents3GrayInnerPadding) + ea,
        paddingBottom: String(contents3GrayInnerPadding) + ea,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[0],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: selectedBoo ? colorChip.black : colorChip.deactive,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: selectedBoo ? colorChip.white : colorChip.gray2,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
        marginBottom: String(contents3GrayInnerPadding) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: selectedBoo ? colorChip.black : colorChip.deactive,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[1],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: selectedBoo ? colorChip.green : colorChip.deactive,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: selectedBoo ? colorChip.white : colorChip.gray2,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: selectedBoo ? colorChip.green : colorChip.deactive,
      }
    });

  }

  // box 2 ---------------------------------------------------------------------------------------------------

  whiteBlock2 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height2) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox2 = createNode({
    mother: whiteBlock2,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox2,
    text: big ? "인테리어 예산의\n3가지 분류" : "인테리어 예산의 3가지 분류",
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox2 = createNode({
    mother: whiteBlock2,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTop) + ea,
    }
  });

  createNode({
    mother: rightBox2,
    mode: "img",
    attribute: { src: StyleCurationJs.binaryPath + "/" + contents2.image },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  // box 1 ---------------------------------------------------------------------------------------------------

  whiteBlock1 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height1) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox1 = createNode({
    mother: whiteBlock1,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox1,
    text: big ? "디자이너 역할과\n구체적 제공물" : (mobile ? "디자이너의 3가지 역할" : "디자이너 역할과 구체적 제공물"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox1 = createNode({
    mother: whiteBlock1,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTopFontVersion) + ea,
    }
  });

  createNode({
    mother: rightBox1,
    text: contents1[0].title,
    style: {
      display: desktop ? "block" : "none",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginBottom: String(contents1TitleBetween) + ea,
    }
  });

  num = 0;
  for (let { title, description } of contents1[0].children) {

    contents1UpBox = createNode({
      mother: rightBox1,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(contents1UpBoxWidth) + ea : withOut(contents1UpBoxPaddingLeft * 2, ea),
        marginRight: desktop ? String(num === contents1[0].children.length - 1 ? 0 : contents1UpBoxMargin) + ea : "",
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        paddingLeft: String(contents1UpBoxPaddingLeft) + ea,
        paddingTop: String(contents1UpBoxPaddingTop) + ea,
        paddingRight: String(contents1UpBoxPaddingLeft) + ea,
        paddingBottom: String(contents1UpBoxPaddingLeft) + ea,
        marginBottom: desktop ? "" : String(2) + ea,
      }
    });

    createNode({
      mother: contents1UpBox,
      mode: "svg",
      source: instance.mother.returnCheckIcon(colorChip.green),
      style: {
        display: "inline-block",
        position: desktop ? "relative" : "absolute",
        top: String(contents1UpBoxCheckTop) + ea,
        left: desktop ? "" : String(contents1UpBoxPaddingLeft) + ea,
        width: String(contents1UpBoxCheckWidth) + ea,
        marginRight: String(contents1UpBoxCheckMarginRight) + ea,
        verticalAlign: "top",
      }
    });

    createNode({
      mother: contents1UpBox,
      text: title,
      style: {
        display: "inline-block",
        width: desktop ? "" : String(26) + '%',
        fontSize: String(contents1UpBoxTitleSize) + ea,
        fontWeight: String(contents1UpBoxTitleWeight),
        verticalAlign: "top",
      }
    });

    createNode({
      mother: contents1UpBox,
      style: {
        display: desktop ? "block" : "inline-block",
        width: desktop ? String(contents1UpBoxWidth) + ea : String(74) + '%',
        background: colorChip.white,
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        borderRadius: String(5) + "px",
        marginTop: desktop ? String(contents1UpBoxWhiteMarginTop) + ea : "",
        paddingTop: String(contents1UpBoxWhitePaddingTop) + ea,
        paddingBottom: String(contents1UpBoxWhitePaddingBottom) + ea,
      },
      children: [
        {
          text: description,
          style: {
            display: "block",
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(contents1UpBoxWhiteSize) + ea,
            fontWeight: String(contents1UpBoxWhiteWeight),
            color: colorChip.black,
            lineHeight: String(contents1UpBoxWhiteLineHeight),
          },
          bold: {
            fontSize: String(contents1UpBoxWhiteSize) + ea,
            fontWeight: String(contents1UpBoxWhiteWeightBold),
            color: colorChip.black,
          }
        }
      ]
    });

    num++;
  }

  createNode({
    mother: rightBox1,
    text: contents1[1].title,
    style: {
      display: "block",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginTop: String(contents1Between) + ea,
      marginBottom: String(contents1TitleBetween) + ea,
      textAlign: desktop ? "left" : "center",
    }
  });

  for (let i = 0; i < contents1[1].children.length; i++) {
    contents1DownBox = createNode({
      mother: rightBox1,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents1DownBoxPaddingMargin * (contents1Columns - 1)) + ea + ") / " + String(contents1Columns) + ")",
        marginRight: desktop ? String(i === contents1Columns - 1 ? 0 : contents1DownBoxPaddingMargin) + ea : String(i % 2 === 1 ? 0 : contents1DownBoxPaddingMargin) + ea,
        paddingTop: String(contents1DownBoxPaddingTop) + ea,
        paddingBottom: String(contents1DownBoxPaddingBottom) + ea,
        marginBottom: desktop ? "" : String(contents1DownBoxPaddingMargin) + ea,
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      }
    })

    createNode({
      mother: contents1DownBox,
      style: {
        marginLeft: String(contents1DownBoxPaddingLeft) + ea,
        marginRight: String(contents1DownBoxPaddingLeft) + ea,
        width: withOut(contents1DownBoxPaddingLeft * 2, ea),
        height: String(contents1DownBoxCircleHeight) + ea,
        borderRadius: String(contents1DownBoxCircleHeight) + ea,
        background: colorChip.gray3,
        backgroundImage: "url('" + StyleCurationJs.binaryPath + "/" + contents1[1].children[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
      }
    })

    createNode({
      mother: contents1DownBox,
      text: contents1[1].children[i].title,
      style: {
        display: "block",
        textAlign: "center",
        width: String(100) + '%',
        fontSize: String(contents1UpBoxTitleSize) + ea,
        fontWeight: String(contents1UpBoxTitleWeight),
        color: colorChip.black,
        marginTop: String(contents1DownBoxTitleMarginTop) + ea,
      }
    })

    createNode({
      mother: contents1DownBox,
      text: contents1[1].children[i].description,
      style: {
        display: "block",
        textAlign: "center",
        width: String(100) + '%',
        fontSize: String(contents1DownBoxDescriptionSize) + ea,
        fontWeight: String(contents1UpBoxWhiteWeight),
        color: colorChip.black,
        marginTop: String(contents1DownBoxDescriptionMarginTop) + ea,
        lineHeight: String(contents1UpBoxWhiteLineHeight),
      }
    })

  }

  // box 4 ---------------------------------------------------------------------------------------------------

  whiteBlock4 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height4) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox4 = createNode({
    mother: whiteBlock4,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox4,
    text: "프로세스 안내",
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox4 = createNode({
    mother: whiteBlock4,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: big ? String(rightBoxPaddingTop) + ea : (mobile ? String(7) + ea : String(0) + ea),
    }
  });

  createNode({
    mother: rightBox4,
    mode: "img",
    attribute: { src: StyleCurationJs.binaryPath + "/" + contents4.image },
    style: {
      display: "block",
      width: String(100) + '%',
    }
  });

  // box 0 ---------------------------------------------------------------------------------------------------

  whiteBlock0 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(lastBlockMarginBottom) + ea,
      height: String(height0) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox0 = createNode({
    mother: whiteBlock0,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox0,
    text: "주의사항",
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox0 = createNode({
    mother: whiteBlock0,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: big ? String(rightBoxPaddingTop) + ea : (mobile ? String(5.5) + ea : String(0) + ea),
    }
  });

  contents0Box = createNode({
    mother: rightBox0,
    style: {
      paddingTop: String(contents0PaddingTop) + ea,
      paddingBottom: String(contents0PaddingTop) + ea,
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      display: "block",
      position: "relative",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(contents0PaddingTop) + ea,
          marginRight: String(contents0PaddingTop) + ea,
          width: withOut(contents0PaddingTop * 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
          paddingTop: String(contents0WhitePaddingTop) + ea,
          paddingBottom: String(contents0WhitePaddingBottom) + ea,
        }
      }
    ]
  }).firstChild;

  for (let wording of contents0.check) {

    createNode({
      mother: contents0Box,
      style: {
        display: "block",
        position: "relative",
        paddingLeft: String(contents0WhitePaddingLeft) + ea,
        marginBottom: String(contents0FactorMarginBottom) + ea,
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnCheckIcon(colorChip.black),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(contents0IconWidth) + ea,
            verticalAlign: "top",
            marginRight: String(contents0IconMarginRight) + ea,
            top: String(contents0IconTop) + ea,
          }
        },
        {
          text: wording,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contents0DescriptionSize) + ea,
            fontWeight: String(contents0DescriptionWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: desktop ? "" : String(85) + '%',
            lineHeight: desktop ? "" : String(1.3),
          },
          bold: {
            color: colorChip.green,
          }
        }
      ]
    });

  }

  createNode({
    mother: rightBox0,
    style: {
      paddingTop: String(contents0TitlePaddingTop) + ea,
      width: String(100) + '%',
      display: "block",
      position: "relative",
      textAlign: "right",
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          borderBottom: "1px dashed " + colorChip.gray3,
          width: String(100) + '%',
          height: String(contents0LineTop) + ea,
        }
      },
      {
        text: contents0.notice,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contents0TitleSize) + ea,
          fontWeight: String(contents0DescriptionWeight),
          color: colorChip.black,
          textAlign: desktop ? "right" : "Center",
          lineHeight: String(1.55),
          background: colorChip.white,
          paddingLeft: desktop ? String(contents0TitleWhiteBoxMargin) + ea : String(contents0TitleWhiteBoxMargin / 2) + ea,
          paddingRight: String(contents0TitleWhiteBoxMargin / 2) + ea,
          zIndex: String(1),
        },
        bold: {
          fontWeight: String(contents0TitleWeight),
          color: colorChip.black,
        }
      }
    ]
  });

}

StyleCurationJs.prototype.serviceConverting = async function (seridObj) {
  const instance = this;
  const { ea, baseTong } = this;
  const { backgroundImageBox, backgroundImageBox2 } = this.mother;
  const { cleanChildren, ajaxJson, returnGet, setQueue, homeliaisonAnalytics } = GeneralJs;
  const children = baseTong.children;
  try {
    await ajaxJson({
      page: "styleCuration",
      mode: "page",
      liteMode: (returnGet().mode === "lite"),
      cliid: instance.client.cliid,
    }, BACKHOST + "/ghostClient_updateAnalytics");
    backgroundImageBox2.style.opacity = String(1);
    backgroundImageBox.style.animation = "justfadeoutoriginal 1s ease forwards";
    baseTong.style.height = String(baseTong.getBoundingClientRect().height) + ea;
    baseTong.style.animation = "fadedownmiddle 0.4s ease forwards";
    setQueue(() => {
      baseTong.style.opacity = String(0);
      cleanChildren(baseTong);
      instance.insertPendingProposal();
      instance.insertServiceBox(seridObj);
      baseTong.style.height = "";
      baseTong.style.animation = "fadeupdelay 0.5s ease forwards";

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "submitForm",
        data: {
          cliid: instance.client.cliid,
        },
      }).catch((err) => {
        console.log(err);
      });

    }, 500);
    return "done";
  } catch (e) {
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.serviceConverting : " + e.message }, BACKHOST + "/errorLog");
  }
}

StyleCurationJs.prototype.forceConverting = async function () {
  const instance = this;
  const { ajaxJson, returnGet } = GeneralJs;
  const { client, clientHistory } = this;
  try {
    let firstBoo;

    firstBoo = true;
    if (Array.isArray(clientHistory.curation.analytics.send)) {
      if (clientHistory.curation.analytics.send.length > 0) {
        if (clientHistory.curation.analytics.send.every((o) => { return typeof o === "object"; })) {
          let boo, feeArr, thisProjects, thisProject, finalSerid;

          boo = false;
          for (let obj of clientHistory.curation.analytics.send) {
            if (obj.page === "designerProposal") {
              if (obj.date.valueOf() > client.requests[0].request.timeline.valueOf()) {
                boo = true;
                firstBoo = false;
                break;
              }
            }
          }

          if (returnGet().force === "true") {
            boo = true;
          }

          if (boo) {
            thisProjects = await ajaxJson({ whereQuery: { cliid: client.cliid } }, SECONDHOST + "/getProjects", { equal: true });
            if (thisProjects.length > 0) {
              thisProject = thisProjects[0];
              finalSerid = clientHistory.curation.service.serid;
              finalSerid = finalSerid.map((serid) => {
                let feeArr;
                let min, max;
                feeArr = [];
                for (let { fee } of thisProject.proposal.detail) {
                  for (let { amount } of fee) {
                    feeArr.push(amount);
                  }
                }
                feeArr.sort((a, b) => { return a - b; });
                min = Math.floor(feeArr[0] / 100000) / 10;
                max = Math.ceil(feeArr[feeArr.length - 1] / 1000000);
                return { serid, min, max };
              });
              await this.serviceConverting(finalSerid);
            }
          }
        }
      }
    }

    if (client.requests[0].analytics.response.action !== "1차 응대 예정" || client.requests[0].analytics.response.status !== "응대중") {
      firstBoo = false;
    }
    if (firstBoo) {
      await ajaxJson({ cliid: client.cliid, name: client.name, phone: client.phone }, BACKHOST + "/styleCuration_pageInitComplete");
    }
  } catch (e) {
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.forceConverting : " + e.message }, BACKHOST + "/errorLog");
  }
}

StyleCurationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();
    let cliid;
    let clients, client;
    let whereQuery;
    let contentsPhotoObj;
    let tempArr, valueObj;
    let liteMode;
    let liteForce;

    if (getObj.cliid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ whereQuery: { cliid: getObj.cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    if (getObj.mode === "lite") {
      liteMode = true;
    } else {
      liteMode = false;
    }

    contentsPhotoObj = await ajaxJson({}, BACKHOST + "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, BACKHOST + "/getClientHistory", { equal: true });

    if (!liteMode) {
      liteForce = false;

      if (Array.isArray(this.clientHistory.curation.analytics.send)) {
        if (this.clientHistory.curation.analytics.send.length > 0) {
          for (let obj of this.clientHistory.curation.analytics.send) {
            if (/Curation/gi.test(obj.page) && /lite/gi.test(obj.mode)) {
              liteForce = true;
              break;
            }
          }
        }
      }

      if (liteForce) {
        if (getObj.mode === undefined) {
          window.location.href = (window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mode=lite");
        } else {
          window.location.href = (window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(/mode\=[^\&]+/gi, "mode=lite"));
        }
      }
    }

    this.wordings = this.curationWordings(liteMode);
    this.alreadyStyleCheck = false;

    tempArr = this.wordings.wordings.center.map((obj) => {
      return {
        name: obj.name,
        children: obj.children.map((obj2) => {
          return {
            name: obj2.name,
            type: obj2.type,
            value: null,
            dom: null,
            required: obj2.required,
            rewind: obj2.required ? obj2.rewind : "",
          };
        })
      };
    });

    valueObj = {};
    for (let obj of tempArr) {
      valueObj[obj.name] = obj.children;
    }
    this.values = valueObj;

    if (this.clientHistory.curation.style.length > 0 && this.clientHistory.curation.image.length > 0) {
      this.values.style[0].value = this.clientHistory.curation.style;
      this.alreadyStyleCheck = true;
    } else {
      this.values.style[0].value = null;
      this.alreadyStyleCheck = false;
    }

    // TEST Center ==================================================================================================
    // if (getObj.cliid === "c1801_aa01s") {
    //   this.client.name = "배창규";
    //   this.testMode = true;
    // }
    // TEST Center ==================================================================================================

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "styleCuration",
      client: this.client,
      base: {
        instance: this,
        binaryPath: StyleCurationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 서비스 안내"),
        secondBackground: true,
        backgroundType: 0,
        talk: {
          text: "하단 스타일 체크를 꼭 완료해주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertCenterBox();
          instance.insertPhotoBox();
          instance.insertPannelBox();
          await instance.forceConverting();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
