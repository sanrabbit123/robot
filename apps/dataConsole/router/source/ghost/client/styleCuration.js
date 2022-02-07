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

StyleCurationJs.binaryPath = "/middle/curation";

StyleCurationJs.randomPick = function (photos, contentsArr, pictureNumber, roomsIntersection = false) {
  if (typeof photos !== "object" || typeof contentsArr !== "object" || typeof pictureNumber !== "number" || typeof roomsIntersection !== "boolean") {
    throw new Error("invaild input");
  }
  const photoLength = photos.length;
  const conidArr = Array.from(new Set(photos.map((obj) => { return obj.conid })));
  const standard = 50;
  const stackName = "styleCheckNum";
  const limit = 3;
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
          {
            name: "address",
            type: "address",
            half: false,
            required: false,
            rewind: "스타일링 받으실 곳의 주소를 정확히 입력해주세요 :)",
            question: [
              "<b%스타일링 받으실 곳의 주소가 맞나요?%b>",
              "아니라면, 스타일링 받을 곳으로 고쳐주세요!"
            ],
            value: function (request, history, self) {
              return request.request.space.address;
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                let updateQuery;
                updateQuery = {};
                updateQuery["requests.0.request.space.address"] = value;
                return {
                  history: null,
                  core: updateQuery
                };
              }
            }
          },
          {
            name: "pyeong",
            type: "pyeong",
            half: false,
            required: false,
            rewind: "평수를 정확히 입력해주세요 :)",
            question: [
              "<b%분양 평수로 적으신 평이 맞나요?%b>",
              "평을 정확히 적으셔야 금액이 올바로 안내됩니다!"
            ],
            value: function (request, history, self) {
              return String(Math.round(request.request.space.pyeong)) + '평';
            },
            update: function (value, siblings, client) {
              if (value === null) {
                return { history: null, core: null };
              } else {
                let updateQuery;
                updateQuery = {};
                if (typeof value === "number") {
                  updateQuery["requests.0.request.space.pyeong"] = value;
                } else if (typeof value === "string") {
                  value = Number(value.replace(/[^0-9\-\.]/gi, ''));
                  if (Number.isNaN(value)) {
                    return {
                      history: null,
                      core: null
                    };
                  } else {
                    updateQuery["requests.0.request.space.pyeong"] = value;
                  }
                } else {
                  return {
                    history: null,
                    core: null
                  };
                }
                return {
                  history: null,
                  core: updateQuery
                };
              }
            }
          },
          // {
          //   name: "precheck",
          //   type: "calendar",
          //   half: true,
          //   required: false,
          //   question: [
          //     "<b%사전 점검일%b>이 있다면, 날짜를 알려주세요!"
          //   ],
          //   item: "사전 점검일",
          //   value: function (request, history, self) {
          //     if (request.analytics.date.space.precheck.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
          //       return null;
          //     } else {
          //       return request.analytics.date.space.precheck;
          //     }
          //   },
          //   update: function (value, siblings, client) {
          //     if (value === null) {
          //       return { history: null, core: null };
          //     } else {
          //       let updateQuery;
          //       updateQuery = {};
          //       updateQuery["requests.0.analytics.date.space.precheck"] = value;
          //       return {
          //         history: null,
          //         core: updateQuery
          //       };
          //     }
          //   }
          // },
          // {
          //   name: "empty",
          //   type: "calendar",
          //   half: true,
          //   required: false,
          //   question: [
          //     "공실이 아니라면, <b%집 비는 날짜%b>를 알려주세요!"
          //   ],
          //   item: "집 비는 날",
          //   value: function (request, history, self) {
          //     if (request.analytics.date.space.empty.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
          //       return null;
          //     } else {
          //       return request.analytics.date.space.empty;
          //     }
          //   },
          //   update: function (value, siblings, client) {
          //     if (value === null) {
          //       return { history: null, core: null };
          //     } else {
          //       let updateQuery;
          //       updateQuery = {};
          //       updateQuery["requests.0.analytics.date.space.empty"] = value;
          //       return {
          //         history: null,
          //         core: updateQuery
          //       };
          //     }
          //   }
          // },
        ]
      });

      // this.wordings.center.push({
      //   name: "furniture",
      //   title: "가구",
      //   callback: "blockCheck",
      //   children: [
      //     {
      //       name: "purchaseRatio",
      //       type: "opposite",
      //       half: false,
      //       required: false,
      //       question: [
      //         "가구와 소품의 <b%기존 제품 구매와 재사용의%b>",
      //         "<b%비율%b>을 알려주세요!"
      //       ],
      //       items: [
      //         "재사용",
      //         "새로 구입",
      //       ],
      //       total: 100,
      //       ea: '%',
      //       value: function (request, history, self) {
      //         return history.curation.furniture.ratio;
      //       },
      //       update: function (value, siblings, client) {
      //         if (value !== null) {
      //           let updateQuery;
      //           updateQuery = {};
      //           updateQuery["curation.furniture.ratio"] = value.value;
      //           return {
      //             history: updateQuery,
      //             core: null
      //           };
      //         } else {
      //           return { history: null, core: null };
      //         }
      //       }
      //     }
      //   ]
      // });

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
              "5개 이내의 부분 시공과 홈스타일링",
              "전체 리모델링의 토탈 스타일링",
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

  GeneralJs.stacks[stackName] = 0;
  GeneralJs.stacks[loadingName] = false;

  pictureNumber = <%% 15, 12, 12, 12, 8 %%>;
  columnNumber = <%% 5, 4, 4, 4, 2 %%>;

  innerMargin = <%% 42, 36, 36, 28, 4.5 %%>;
  pictureMargin = <%% 10, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 114, 114, 114, 90, 15.4 %%>;
  pannelPaddingTop = <%% 32, 32, 32, 22, 4 %%>;
  pannelWordsSize = <%% 23, 23, 23, 21, 4 %%>;
  pannelWordsPadding = <%% 16, 16, 16, 12, 16 %%>;
  pannelLineTop = <%% 47, 47, 47, 36, 47 %%>;

  arrowTop = <%% 43, 43, 43, 33, 2 %%>;
  arrowWidth = <%% 10, 10, 10, 8, 2 %%>;

  questionWording = wordings[0].question[0];
  completeWording = wordings[0].question[1];

  image = [];

  randomPick = StyleCurationJs.randomPick(photos, contentsArr, pictureNumber);
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
      }, "/ghostClient_updateAnalytics").then(() => {
        return ajaxJson({
          page: "styleCuration",
          mode: "image",
          cliid: instance.client.cliid,
          image: image
        }, "/ghostClient_updateAnalytics");
      }).then(() => {
        return ajaxJson({
          cliid: instance.client.cliid,
          name: instance.client.name,
          image: image,
        }, "/styleCuration_styleCheckComplete");
      }).catch((err) => {
        GeneralJs.ajaxJson({ message: "StyleCurationJs.styleCheck.pickupDesigners : " + err.message }, "/errorLog").catch((e) => {});
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
    mother.firstChild.appendChild(loading);

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
          mother.firstChild.removeChild(loading);
          mother.lastChild.lastChild.textContent = completeWording;
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
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.resetEvent.sleep.true : " + e.message }, "/errorLog");
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
          mother.firstChild.removeChild(loading);
          for (let dom of greenTargets) {
            dom.remove();
          }
          await sleep(100);
          for (let i = 0; i < instance.photoPosition.length; i++) {
            instance.photoPosition[i].style.animation = "fadeupmiddle " + String(animationTime) + "s ease forwards";
          }
          GeneralJs.stacks[loadingName] = false;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.resetEvent.sleep.false : " + e.message }, "/errorLog");
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
                      e.preventDefault();
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
                  animation: "justfadeinnine 0.2s ease forwards",
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
                      e.preventDefault();
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
                  animation: "justfadeinnine 0.2s ease forwards",
                  cursor: "pointer",
                },
              });
              instance.selectPhotos.push(instance.randomPick[index]);
              image.push(instance.randomPick[index].file);
              if (instance.selectPhotos.length >= 3) {
                instance.photos = StyleCurationJs.photoFilter(instance.photos, instance.selectPhotos);
                instance.selectPhotos = [];
                GeneralJs.stacks[loadingName] = true;
                GeneralJs.setTimeout(() => {
                  GeneralJs.stacks[stackName] = GeneralJs.stacks[stackName] + 1;
                  resetEvent(false);
                }, 201);
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
      }
    ]
  });

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
                      }, "/parsingAddress");

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
                        }, "/ghostClient_updateAnalytics");
                      }

                      removeTargets = targetMother.querySelectorAll("aside");
                      for (let t of removeTargets) {
                        targetMother.removeChild(t);
                      }
                      window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
                      GeneralJs.stacks["addressEvent"] = null;
                    } catch (e) {
                      await GeneralJs.ajaxJson({ message: "StyleCurationJs.addressEvent : " + e.message }, "/errorLog");
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
                      }, "/parsingAddress");
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
                        }, "/ghostClient_updateAnalytics");
                      }
                    }

                  }
                } catch (e) {
                  await GeneralJs.ajaxJson({ message: "StyleCurationJs.addressEvent.blur : " + e.message }, "/errorLog");
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
                    }, "/ghostClient_updateAnalytics");
                  }).catch((err) => {
                    GeneralJs.ajaxJson({ message: "StyleCurationJs.valuesConvert : " + err.message }, "/errorLog").catch((e) => {});
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
      } else {
        barLeft = 0;
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
      barBox.setAttribute("value", String(barEntireValue / 2));
      barBox.setAttribute("x", name);
      barBox.setAttribute("y", String(y));

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
        }, "/ghostClient_updateAnalytics").catch((err) => {
          GeneralJs.ajaxJson({ message: "StyleCurationJs.ghostClient_updateAnalytics : " + err.message }, "/errorLog").catch((e) => {});
        });
      }

      if (desktop) {
        barButton.addEventListener("mousedown", function (e) {
          GeneralJs.stacks[thisName + "_isDown"] = true;
          GeneralJs.stacks[thisName + "_startX"] = e.pageX - this.offsetLeft;
          GeneralJs.stacks[thisName + "_scrollLeft"] = this.scrollLeft;
          answerArea.style.cursor = "grabbing";
          barBox.style.cursor = "grabbing";
          barButton.style.cursor = "grabbing";
        });
        answerArea.addEventListener("mouseleave", barEndEvent);
        answerArea.addEventListener("mouseup", barEndEvent);
        answerArea.addEventListener("mousemove", function (e) {
          let x, walk, newWidth;
          if (!GeneralJs.stacks[thisName + "_isDown"]) {
            return;
          }
          e.preventDefault();
          x = e.pageX - barButton.offsetLeft;
          walk = x - GeneralJs.stacks[thisName + "_startX"];

          newWidth = Number(barBox.getAttribute("width")) + walk;
          barBox.style.width = String(newWidth) + "px";
          barBox.setAttribute("width", String(newWidth));
          barBox.setAttribute("value", String(Math.round(Math.round((newWidth / Number(barBox.getAttribute("entire"))) * 10000) / 100)));

          answerArea.style.cursor = "grabbing";
          barBox.style.cursor = "grabbing";
          barButton.style.cursor = "grabbing";
        });
      }
      if (mobile) {
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
            top: String(barTop) + ea,
            height: String(barHeight) + ea,
            borderRadius: String(barHeight + 1) + ea,
            background: "transparent",
            width: String(100) + '%',
            left: String(0) + ea,
          }
        });
      }

      if (updateValue !== null) {
        if (desktop) {
          barBox.style.width = "calc(calc(100% - " + String(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2)) + "px" + ") * " + String(updateValue / 100) + ")";
        } else {
          barBox.style.width = String(updateValue) + '%';
        }
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
                  }, "/ghostClient_updateAnalytics");
                }).catch((err) => {
                  GeneralJs.ajaxJson({ message: "StyleCurationJs.ghostClient_updateAnalytics.update : " + err.message }, "/errorLog").catch((e) => {});
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
                }, "/ghostClient_updateAnalytics").catch((err) => {
                  GeneralJs.ajaxJson({ message: "StyleCurationJs.ghostClient_updateAnalytics.update.matrix : " + err.message }, "/errorLog").catch((e) => {});
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
                  }, "/ghostClient_updateAnalytics");
                }
              } catch (e) {
                await GeneralJs.ajaxJson({ message: "StyleCurationJs.numberEvent.blur : " + e.message }, "/errorLog");
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

  GeneralJs.stacks[stackName] = 0;
  GeneralJs.stacks[loadingName] = false;

  pictureNumber = <%% 5, 4, 4, 4, 2 %%>;
  columnNumber = <%% 5, 4, 4, 4, 2 %%>;

  innerMargin = <%% 42, 36, 36, 28, 4.5 %%>;
  pictureMargin = <%% 10, 6, 6, 4, 1 %%>;

  pannelHeight = <%% 106, 106, 106, 92, 20 %%>;
  pannelPaddingTop = <%% 16, 16, 16, 12, 4 %%>;
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

  noticeTop = <%% 53, 53, 53, 45, 10.2 %%>;

  questionWording = this.wordings.photoWordings[desktop ? "desktop" : "mobile"].question;
  noticeWording = this.wordings.photoWordings[desktop ? "desktop" : "mobile"].notice;

  beforePhotosSelected = [];
  beforePhotos = this.wordings.photoWordings.before;
  for (let i = 0; i < pictureNumber; i++) {
    randomNum = Math.floor(beforePhotos.length * Math.random());
    beforePhotosSelected.push(beforePhotos[randomNum]);
    beforePhotos.splice(randomNum, 1);
  }
  beforePhotosSelected = beforePhotosSelected.map((jpg) => { return S3HOST + StyleCurationJs.binaryPath + "/" + jpg; });

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
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.valuesConvert : " + e.message }, "/errorLog");
  }
}

StyleCurationJs.prototype.parsingValues = function () {
  const instance = this;
  const { ajaxJson, ajaxForm, returnGet } = GeneralJs;
  const grayLoading = this.mother.grayLoading();
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
      formData.append("phone", instance.client.phone);
      cancelPhoto = JSON.parse(instance.fileInput.getAttribute("cancel"));
      for (let i = 0; i < instance.fileInput.files.length; i++) {
        if (!cancelPhoto.includes(i)) {
          formData.append("upload0", instance.fileInput.files[i]);
        }
      }
      return ajaxForm(formData, BRIDGEHOST + "/binary");
    } else {
      return new Promise((resolve, reject) => { resolve("success"); });
    }
  }).then((data) => {
    if (data === "success") {
      return ajaxJson({ cliid: instance.client.cliid, historyQuery, coreQuery, mode: "calculation" }, "/styleCuration_updateCalculation");
    } else {
      window.alert("사진 전송에 문제가 생겼습니다! 200MB 이하의 파일로 다시 시도해주세요!");
      return new Promise((resolve, reject) => { resolve({ promisePass: true }); });
    }
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
        }, "/ghostClient_updateAnalytics");
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
    }, "/sendSlack").then(() => {
      window.alert("오류가 발생하였습니다! 다시 한번 제출을 시도해주시길 부탁드립니다!");
      window.location.reload();
    }).catch((err) => { console.log(err); });
  });

}

StyleCurationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let barWidth, barLeft;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize, initWordingHeight, initWordingWordSpacing, initWordingLineHeight;
  let indexNumberBottom;
  let initWording0, initWording1;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxTitleSize, grayBoxTitleWeight, grayBoxTitleTop, grayBoxTitleLeft;
  let grayBoxUp, grayBoxDown;
  let grayBoxHeight, grayBoxTop;
  let grayBoxUpWidth0, grayBoxUpWidth1, grayBoxUpWidth2, grayBoxUpWidth3;
  let grayBoxUpRight1, grayBoxUpRight2, grayBoxUpRight3;
  let grayBoxDownWidth0, grayBoxDownWidth1, grayBoxDownWidth2;
  let grayBoxDownRight1, grayBoxDownRight2;
  let grayBoxArrowTop, grayBoxArrowHeight;
  let overlappingWidth;
  let grayInnerWordingSize;
  let grayInnerWordingWeight;
  let grayInnerWordingTextTop;
  let grayUpWordings, grayDownWordings;
  let mobileGrayUpHeight;
  let mobileRightBoxHeight;

  blockHeight = <%% this.backHeight - 460, this.backHeight - 470, this.backHeight - 490, this.backHeight - 540, this.backHeight - 460 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;

  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 120, 80, 80, 80, 80 %%>;
  barLeft = <%% 190, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 8, 8, 8, 8, -0.6 %%>;
  quoteHeight = <%% 12, 11, 10, 9, 2.5 %%>;
  quoteMarginBottom = <%% (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 6 : 7), 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  grayBoxMarginTop = <%% 102, 96, 92, 79, 33 %%>;

  grayBoxTitleSize = <%% 14, 14, 13, 11, 3.2 %%>;
  grayBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  grayBoxTitleTop = <%% (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 20 : 21), 0 %%>;
  grayBoxTitleLeft = <%% 40, 32, 30, 16, 6 %%>;
  grayBoxHeight = <%% 36, 36, 34, 28, 7 %%>;
  grayBoxTop = <%% 30, 30, 30, 15, 6.6 %%>;

  grayBoxUpWidth0 = <%% 280, 180, 140, 120, 24 %%>;
  grayBoxUpWidth1 = <%% 230, 160, 130, 110, 24 %%>;
  grayBoxUpWidth2 = <%% 72, 72, 72, 72, 9 %%>;
  grayBoxUpWidth3 = <%% 130, 112, 108, 90, 20 %%>;

  grayBoxUpRight1 = <%% 310, 200, 160, 125, 28.5 %%>;
  grayBoxUpRight2 = <%% 550, 370, 300, 244, 54 %%>;
  grayBoxUpRight3 = <%% 622, 422, 341, 285, 62 %%>;

  grayBoxDownWidth0 = <%% 280, 242, 195, 175, 30 %%>;
  grayBoxDownWidth1 = <%% 277, 170, 142, 120, 29 %%>;
  grayBoxDownWidth2 = <%% 175, 112, 108, 90, 20 %%>;

  grayBoxDownRight1 = <%% 310, 264, 210, 179, 34 %%>;
  grayBoxDownRight2 = <%% 577, 422, 341, 285, 62 %%>;

  grayBoxArrowTop = <%% 42, 42, 42, 24, 8.8 %%>;
  grayBoxArrowHeight = <%% 11, 11, 11, 9, 2 %%>;

  overlappingWidth = <%% 10, 10, 10, 10, 0 %%>;
  grayInnerWordingSize = <%% 13, 13, 13, 11, 2.8 %%>;
  grayInnerWordingTextTop = desktop ? (isMac() ? -1 : 0) : -0.1;
  grayInnerWordingWeight = 600;

  mobileGrayUpHeight = 18;
  mobileRightBoxHeight = 78;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  if (media[0]) {
    initWording0 = "홈리에종의 인테리어 프로세스는 일반적인 리모델링 회사 또는 스튜디오와 다릅니다. 시공 견적부터 제시하는 방법과 달리,";
  } else if (media[1]) {
    initWording0 = "홈리에종 프로세스는 리모델링 회사와 다릅니다. 시공부터 제시하는 방법과 달리,";
  } else {
    initWording0 = "홈리에종 프로세스는 리모델링 회사와 다릅니다. 시공부터 제시하는 방법과 달리,";
  }

  if (media[0]) {
    initWording1 = "<b%디자이너를 먼저 만난 이후 인테리어를 순차적으로 진행%b>하며, 디자이너 매칭 및 디자인비 지불 과정이 선행됩니다.";
  } else if (media[1]) {
    initWording1 = "<b%디자이너를 만나 인테리어를 진행%b>하며, 디자이너 매칭과 디자인비 지불이 선행됩니다.";
  } else {
    initWording1 = "<b%디자이너를 만나 인테리어를 진행%b>하며, 디자이너 매칭과 디자인비 지불이 선행됩니다.";
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(29) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    }
  });

  //main title
  createNode({
    mother: leftBox,
    text: desktop ? ((media[0] || media[4]) ? "홈리에종 진행 프로세스와" : "홈리에종의") : "홈리에종 프로세스와",
    style: {
      position: "absolute",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (isMac() || mobile ? 0 : 4)) + ea) : String(9) + ea,
      left: String(titleLeft) + ea,
      color: colorChip.black,
      width: desktop ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
    }
  });

  if (media[1] || media[2] || media[3]) {
    createNode({
      mother: leftBox,
      text: "진행 프로세스와",
      style: {
        position: "absolute",
        fontSize: String(titleFont) + ea,
        fontWeight: String(titleFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        top: String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.45)) + (isMac() || mobile ? 0 : 4)) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.black,
      }
    });
  }

  createNode({
    mother: leftBox,
    text: "예산 사용 안내",
    style: {
      position: "absolute",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.45) * (media[0] ? 1 : 2)) + (isMac() || mobile ? 0 : 4)) + ea) : String(17) + ea,
      left: String(titleLeft) + ea,
      width: desktop ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      color: colorChip.black,
    }
  });

  if (desktop) {

    if (media[0]) {
      createNode({
        mother: leftBox,
        style: {
          position: "absolute",
          borderBottom: "1px solid " + colorChip.gray3,
          top: String(titleFont * (63 / 30)) + ea,
          left: String(barLeft) + ea,
          width: String(barWidth) + ea,
        }
      });
    }

    createNode({
      mother: leftBox,
      text: String(0),
      style: {
        position: "absolute",
        fontSize: String(indexFont) + ea,
        fontWeight: String(indexFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        bottom: String(indexNumberBottom) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.gray4,
      }
    });

  }

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileRightBoxHeight) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: rightBox,
    mode: "svg",
    source: svgMaker.doubleQuote(colorChip.green),
    style: {
      position: "absolute",
      top: String(quoteTop) + ea,
      left: desktop ? String(quoteLeft) + ea : "calc(50% - " + String(quoteWidth / 2) + ea + ")",
      width: String(quoteWidth) + ea,
      height: String(quoteHeight) + ea,
    }
  });

  createNode({
    mother: rightBox,
    text: initWording0,
    style: {
      position: "absolute",
      top: String(desktop ? quoteTop + quoteHeight + quoteMarginBottom : 3.7) + ea,
      left: String(desktop ? 0 : 13) + ea,
      width: String(desktop ? 100 : 74) + '%',
      height: desktop ? String(initWordingHeight) + ea : "",
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      wordSpacing: String(initWordingWordSpacing) + "px",
      lineHeight: desktop ? "" : String(1.6),
      textAlign: desktop ? "" : "center",
    }
  });

  createNode({
    mother: rightBox,
    text: initWording1,
    style: {
      position: "absolute",
      top: String(desktop ? quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight : 15.5) + ea,
      left: String(desktop ? 0 : 11) + ea,
      width: String(desktop ? 100 : 78) + '%',
      height: desktop ? String(initWordingHeight) + ea : "",
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      wordSpacing: String(initWordingWordSpacing) + "px",
      lineHeight: desktop ? "" : String(1.6),
      textAlign: desktop ? "" : "center",
    },
    bold: {
      fontWeight: String(600),
      color: colorChip.green,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginTop: desktop ? String(grayBoxMarginTop) + ea : "",
      paddingTop: desktop ? "" : String(grayBoxMarginTop) + ea,
      height: withOut(grayBoxMarginTop, ea),
      width: withOut(0, ea),
      borderRadius: String(5) + "px",
      overflow: "hidden",
    }
  });

  grayBoxUp = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      height: desktop ? String(50) + '%' : String(mobileGrayUpHeight) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.gray0 : "",
    },
    children: [
      {
        text: grayUpWordings[0],
        style: {
          position: "absolute",
          fontSize: String(grayBoxTitleSize) + ea,
          fontWeight: String(grayBoxTitleWeight),
          color: desktop ? colorChip.black : colorChip.green,
          top: String(grayBoxTitleTop) + ea,
          left: String(grayBoxTitleLeft) + ea,
          width: desktop ? "" : withOut(grayBoxTitleLeft * 2, ea),
          textAlign: desktop ? "" : "center",
        }
      }
    ]
  });

  createNode({
    mother: grayBoxUp,
    style: {
      position: "absolute",
      right: String(grayBoxTitleLeft) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxUpWidth0) + ea,
      background: colorChip.gray2,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(overlappingWidth, ea),
          height: String(100) + '%',
          marginLeft: String(overlappingWidth) + ea,
        },
        children: [
          {
            text: grayUpWordings[1],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.liteBlack,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: grayBoxUp,
    style: {
      position: "absolute",
      right: String(grayBoxUpRight1) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxUpWidth1) + ea,
      background: colorChip.gradientGreen4,
      borderRadius: String(5) + "px",
      boxShadow: "4px 3px 20px -9px " + colorChip.shadow,
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(0, ea),
          height: String(100) + '%',
          marginLeft: String(0) + ea,
        },
        children: [
          {
            text: grayUpWordings[2],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.white,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: grayBoxUp,
    mode: "svg",
    source: svgMaker.horizontalArrow(grayBoxUpWidth2, grayBoxArrowHeight),
    style: {
      position: "absolute",
      right: String(grayBoxUpRight2) + ea,
      top: String(grayBoxArrowTop) + ea,
      height: String(grayBoxArrowHeight) + ea,
      width: String(grayBoxUpWidth2) + ea,
    }
  });

  createNode({
    mother: grayBoxUp,
    style: {
      position: "absolute",
      right: String(grayBoxUpRight3) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxUpWidth3) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: String(desktop ? 3 : 0) + "px 2px " + String(desktop ? 13 : 18) + "px -9px " + colorChip.shadow,
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(0, ea),
          height: String(100) + '%',
          marginLeft: String(0) + ea,
        },
        children: [
          {
            text: grayUpWordings[3],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.green,
            }
          }
        ]
      }
    ]
  });

  grayBoxDown = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      height: desktop ? String(50) + '%' : String(mobileGrayUpHeight) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.gray3 : "",
    },
    children: [
      {
        text: grayDownWordings[0],
        style: {
          position: "absolute",
          fontSize: String(grayBoxTitleSize) + ea,
          fontWeight: String(grayBoxTitleWeight),
          color: desktop ? colorChip.black : colorChip.green,
          top: String(grayBoxTitleTop) + ea,
          left: String(grayBoxTitleLeft) + ea,
          width: desktop ? "" : withOut(grayBoxTitleLeft * 2, ea),
          textAlign: desktop ? "" : "center",
        }
      }
    ]
  });

  createNode({
    mother: grayBoxDown,
    style: {
      position: "absolute",
      right: String(grayBoxTitleLeft) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxDownWidth0) + ea,
      background: colorChip.gray0,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(overlappingWidth, ea),
          height: String(100) + '%',
          marginLeft: String(overlappingWidth) + ea,
        },
        children: [
          {
            text: grayDownWordings[1],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.liteBlack,
            }
          }
        ]
      }
    ]
  })

  createNode({
    mother: grayBoxDown,
    style: {
      position: "absolute",
      right: String(grayBoxDownRight1) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxDownWidth1) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "3px 2px 13px -9px " + colorChip.shadow,
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(overlappingWidth, ea),
          height: String(100) + '%',
          marginLeft: String(overlappingWidth) + ea,
        },
        children: [
          {
            text: grayDownWordings[2],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.shadow,
            }
          }
        ]
      }
    ]
  })

  createNode({
    mother: grayBoxDown,
    style: {
      position: "absolute",
      right: String(grayBoxDownRight2) + ea,
      top: String(grayBoxTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: String(grayBoxDownWidth2) + ea,
      background: colorChip.gradientGreen4,
      borderRadius: String(5) + "px",
      boxShadow: "4px 3px 20px -9px " + colorChip.shadow,
    },
    children: [
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: withOut(0, ea),
          height: String(100) + '%',
          marginLeft: String(0) + ea,
        },
        children: [
          {
            text: grayDownWordings[3],
            style: {
              position: "relative",
              fontSize: String(grayInnerWordingSize) + ea,
              top: String(grayInnerWordingTextTop) + ea,
              fontWeight: String(grayInnerWordingWeight),
              color: colorChip.white,
            }
          }
        ]
      }
    ]
  })

}

StyleCurationJs.prototype.insertFirstService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight, titleSecondLeft, titleSecondWeight;
  let titleSecondTop;
  let barWidth, barTop;
  let indexFont, indexFontWeight;
  let indexNumberBottom;
  let initWording0, initWording1;
  let circleWidth0, circleWidth1, circleWidth2, circleWidth3;
  let circleLeft0, circleLeft1, circleLeft2, circleLeft3;
  let circleTop0, circleTop1, circleTop2, circleTop3;
  let circleTextTop0, circleTextTop1, circleTextTop3;
  let circleTextLeft0, circleTextLeft1, circleTextLeft3;
  let circleTextSize0, circleTextSize1, circleTextSize3;
  let circleTextWidth, circleTextWeight, circleTextFocus;
  let circleArrowWidth, circlrArrowHeight;
  let circleArrowTop, circlrArrowLeft;
  let contentsBox;
  let contentsBoxLeft;
  let contentsBoxPadding;
  let contentsWhiteHeight;
  let contentsBlockHeight, contentsBlockMarginTop, contentsBlockMarginTopArrow, contentsBlockHeightArrow;
  let contentsBlockArrowWidth;
  let descriptionHeight, descriptionMarginTop;
  let descriptionTitleWidth, descriptionTitleMargin;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let descriptionTitleWeight;
  let contentsBlockSize, contentsBlockBottom;
  let wordings;
  let mobileTitleLeft;
  let mobileTitleTop;
  let mobileTitleMarginBottom;
  let barLeft;
  let circleLeft4, circleLeft5;
  let mobileRightBoxPaddingTop;
  let whiteBlockPaddingBottom;

  blockHeight = <%% 645, 645, 620, 533, 160 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 28, 25, 22, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 6 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleSecondTop = <%% 55, 50, 44, 39, 2 %%>;
  titleSecondLeft = <%% 125, 6, 6, 6, 6 %%>;
  titleSecondWeight = <%% 200, 200, 200, 200, 200 %%>;

  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 106, 106, 106, 106, 19.5 %%>;
  barTop = <%% (isMac() ? 73 : 71), (isMac() ? 73 : 71), (isMac() ? 73 : 71), (isMac() ? 73 : 71), 10.5 %%>;
  barLeft = 12;

  indexFont = <%% 19, 19, 19, 19, 5.7 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  indexNumberBottom = <%% 7, 4, 2, 2, 0 %%>;

  circleWidth0 = <%% 72, 72, 72, 60, 12 %%>;
  circleWidth1 = <%% 90, 90, 90, 80, 18 %%>;
  circleWidth2 = <%% 120, 120, 120, 108, 0 %%>;
  circleWidth3 = <%% 108, 108, 108, 100, 24 %%>;

  circleLeft0 = <%% 162, 162, 162, 138, 6 %%>;
  circleLeft1 = <%% 63, 63, 63, 56, 14 %%>;
  circleLeft2 = <%% 0, 0, 0, 0, 0 %%>;
  circleLeft3 = <%% 7, 7, 7, 5, 32 %%>;

  circleLeft4 = 56.5;
  circleLeft5 = 70.5;

  circleTop0 = <%% 0, 0, 0, 0, 31 %%>;
  circleTop1 = <%% 58, 58, 58, 48, 14 %%>;
  circleTop2 = <%% 158, 158, 158, 138, 0 %%>;
  circleTop3 = <%% 165, 165, 165, 143, 0 %%>;

  circleTextTop0 = <%% 24, 24, 24, 24, 25 %%>;
  circleTextTop1 = <%% 34, 34, 34, 34, 25 %%>;
  circleTextTop3 = <%% 38, 38, 38, 36, 25 %%>;

  circleTextLeft0 = <%% 85, 85, 85, 85, 0 %%>;
  circleTextLeft1 = <%% 103, 103, 103, 103, 0 %%>;
  circleTextLeft3 = <%% 128, 128, 128, 115, 0 %%>;

  circleTextSize0 = <%% 10, 10, 10, 10, 2.7 %%>;
  circleTextSize1 = <%% 13, 13, 13, 13, 2.7 %%>;
  circleTextSize3 = <%% 15, 15, 15, 14, 2.7 %%>;

  circleTextWidth = <%% 100, 100, 100, 100, 24 %%>;
  circleTextWeight = <%% 300, 300, 300, 300, 300 %%>;
  circleTextFocus = <%% 500, 500, 500, 500, 500 %%>;

  circleArrowWidth = <%% 110, 82, 26, 15, 2 %%>;
  circlrArrowHeight = <%% 14, 14, 12, 9, 12 %%>;
  circleArrowTop = <%% 207, 207, 208, 184, 30 %%>;
  circlrArrowLeft = <%% 225, 225, 225, 200, 43 %%>;

  contentsBoxLeft = <%% 350, 322, 266, 226, 6 %%>;
  contentsBoxPadding = <%% 20, 20, 20, 10, 3 %%>;

  contentsWhiteHeight = <%% 212, 212, 212, 182, 38 %%>;
  contentsBlockHeight = <%% 40, 40, 40, 40, 9 %%>;
  contentsBlockMarginTop = <%% 8, 8, 8, 8, 1 %%>;
  contentsBlockMarginTopArrow = <%% 11, 11, 11, 11, 2 %%>;
  contentsBlockArrowWidth = <%% 12, 12, 12, 10, 2 %%>;
  contentsBlockHeightArrow = contentsBlockHeight + contentsBlockMarginTop - (contentsBlockMarginTopArrow * 2);

  contentsBlockSize = <%% 12, 12, 12, 12, 2.8 %%>;
  contentsBlockBottom = <%% (isMac() ? 12.5 : 11), (isMac() ? 12.5 : 11), (isMac() ? 12.5 : 11), (isMac() ? 12.5 : 11), 2.5 %%>;

  descriptionHeight = <%% 60, 60, 60, 60, 6 %%>;
  descriptionMarginTop = <%% 45, 45, 45, 35, 4 %%>;
  descriptionTitleWidth = <%% 90, 90, 90, 72, 6 %%>;
  descriptionTitleMargin = <%% 40, 40, 30, 3, 6 %%>;
  descriptionSize = <%% 15, 15, 14, 13, 3 %%>;
  descriptionWeight = desktop ? 300 : 400;
  descriptionLineHeight = 1.6;
  descriptionTitleWeight = 700;

  mobileTitleLeft = 7;
  mobileTitleTop = 7;
  mobileTitleMarginBottom = 7;
  mobileRightBoxPaddingTop = 48.5;
  whiteBlockPaddingBottom = 9;

  wordings = {
    title: {
      main: desktop ? "디자이너를 먼저 선택," : "디자이너를 먼저 선택",
      sub: [
        "디자이너와 함께",
        "<b%선%b> 기획 <b%후%b> 시공"
      ]
    },
    pick: [
      "A designer",
      "B designer",
      "C designer",
      "D designer",
      "E designer"
    ],
    box: {
      design: "<b%선 디자인 / 기획%b>",
      etc: [
        "디자인에 따른 <b%시공 범위 조정 및 진행%b>",
        "구매 리스트 작성 및 구매",
        "부가 서비스 이용",
      ]
    },
    contents: {
      title: [
        "홈리에종의",
        "인테리어"
      ],
    }
  }

  if (media[0]) {
    wordings.contents.description = [ "홈리에종은 먼저 고객님의 상황을 분석하여 그에 맞는 적합한 디자이너 3명 ~ 6명을 추천드립니다. 디자이너를 선택하게 되면 해당 디자이너가 인테리어 전 과정을 케어하며, 선 디자인 후 시공/구매 방식으로 진행하게 됩니다." ]
  } else if (media[1]) {
    wordings.contents.description = [ "홈리에종은 고객님의 상황을 분석하여 적합한 디자이너를 추천드립니다. 해당 디자이너는 인테리어 전 과정을 케어하며, 선 디자인 후 시공 방식으로 진행하게 됩니다." ]
  } else if (media[2]) {
    wordings.contents.description = [ "홈리에종은 고객님의 상황을 분석하여 적합한 디자이너를 추천드립니다. 해당 디자이너는 전 과정을 케어하며, 선 디자인 후 시공 방식으로 진행하게 됩니다." ]
  } else if (media[3]) {
    wordings.contents.description = [ "홈리에종은 고객님의 상황을 분석하여 디자이너를 추천드립니다. 해당 디자이너는 전 과정을 케어하며, 선 디자인 후 시공 방식으로 진행하게 됩니다." ]
  } else {
    wordings.contents.description = [ "홈리에종은 고객님의 상황을 분석하여 적합한 디자이너를 추천드립니다. 해당 디자이너는 인테리어 전 과정을 케어하며, 선 디자인 후 시공 방식으로 진행하게 됩니다." ]
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight) + ea : "",
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      paddingBottom: desktop ? "" : String(whiteBlockPaddingBottom) + ea,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : "",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : String(mobileTitleMarginBottom) + ea,
      marginLeft: desktop ? String(margin) + ea : "",
    }
  });

  //main title
  createNode({
    mother: leftBox,
    text: wordings.title.main,
    style: {
      position: desktop ? "absolute" : "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 0 : 0) + (isMac() || mobile ? 0 : 4)) + ea) : "",
      paddingTop: desktop ? "" : String(mobileTitleTop) + ea,
      left: desktop ? String(titleLeft) + ea : "",
      marginLeft: desktop ? "" : String(mobileTitleLeft) + ea,
      color: colorChip.black,
      width: desktop ? "" : withOut(mobileTitleLeft * 2, ea),
      textAlign: desktop ? "" : "right",
    }
  });

  createNode({
    mother: leftBox,
    text: wordings.title.sub.join("\n"),
    style: {
      position: desktop ? "absolute" : "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleSecondWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? String(titleSecondTop) + ea : "",
      marginTop: desktop ? "" : String(titleSecondTop) + ea,
      left: desktop ? String(titleSecondLeft) + ea : "",
      marginLeft: desktop ? "" : String(mobileTitleLeft) + ea,
      width: desktop ? "" : withOut(mobileTitleLeft * 2, ea),
      textAlign: desktop ? (media[0] ? "right" : "left") : "right",
      color: colorChip.black,
      lineHeight: String(desktop ? 1.35 : 1.3),
    },
    bold: {
      fontWeight: String(titleFontWeight),
      color: colorChip.black,
    }
  });

  if (media[0] || media[4]) {
    createNode({
      mother: leftBox,
      style: {
        position: "absolute",
        borderBottom: "1px " + (desktop ? "solid" : "dashed") + " " + (desktop ? colorChip.green : colorChip.whiteGreen),
        top: String(barTop) + ea,
        left: String(desktop ? titleLeft : barLeft) + ea,
        width: String(barWidth) + ea,
      }
    });
  }

  createNode({
    mother: leftBox,
    text: String(1),
    style: {
      position: "absolute",
      fontSize: String(indexFont) + ea,
      fontWeight: String(indexFontWeight),
      wordSpacing: String(wordSpacing) + ea,
      bottom: desktop ? String(indexNumberBottom) + ea : "",
      top: desktop ? "" : String(mobileTitleTop) + ea,
      left: desktop ? String(titleLeft) + ea : String(mobileTitleLeft) + ea,
      color: desktop ? colorChip.gray4 : colorChip.black,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : "",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      paddingTop: desktop ? "" : String(mobileRightBoxPaddingTop) + ea,
    }
  });

  createNode({
    mother: rightBox,
    style: {
      position: "absolute",
      top: String(circleTop0) + ea,
      left: String(circleLeft0) + ea,
      width: String(circleWidth0) + ea,
      height: String(circleWidth0) + ea,
      borderRadius: String(circleWidth0) + ea,
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/profile0.jpg" + "')",
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            text: wordings.pick[0],
            style: {
              display: (media[2] || media[3] || media[4]) ? "none" : "block",
              position: "absolute",
              top: String(circleTextTop0) + ea,
              left: String(circleTextLeft0) + ea,
              width: String(circleTextWidth) + ea,
              fontSize: String(circleTextSize0) + ea,
              fontWeight: String(circleTextWeight),
              color: colorChip.deactive,
              fontFamily: "graphik",
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: rightBox,
    style: {
      position: "absolute",
      top: String(circleTop1) + ea,
      left: String(circleLeft1) + ea,
      width: String(circleWidth1) + ea,
      height: String(circleWidth1) + ea,
      borderRadius: String(circleWidth1) + ea,
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/profile1.jpg" + "')",
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            text: wordings.pick[1],
            style: {
              display: (media[2] || media[3] || media[4]) ? "none" : "block",
              position: "absolute",
              top: String(circleTextTop1) + ea,
              left: String(circleTextLeft1) + ea,
              width: String(circleTextWidth) + ea,
              fontSize: String(circleTextSize1) + ea,
              fontWeight: String(circleTextWeight),
              color: colorChip.deactive,
              fontFamily: "graphik",
            }
          }
        ]
      }
    ]
  });

  if (desktop) {
    createNode({
      mother: rightBox,
      style: {
        position: "absolute",
        top: String(circleTop2) + ea,
        left: String(circleLeft2) + ea,
        width: String(circleWidth2) + ea,
        height: String(circleWidth2) + ea,
        borderRadius: String(circleWidth2) + ea,
        border: "1px dashed " + colorChip.green
      }
    });
  }

  createNode({
    mother: rightBox,
    style: {
      position: "absolute",
      top: String(circleTop3) + ea,
      left: String(circleLeft3) + ea,
      width: String(circleWidth3) + ea,
      height: String(circleWidth3) + ea,
      borderRadius: String(circleWidth3) + ea,
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/profile2.jpg" + "')",
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
      border: desktop ? "" : "1px dashed " + colorChip.green
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            text: wordings.pick[2],
            style: {
              position: "absolute",
              top: String(circleTextTop3) + ea,
              left: String(circleTextLeft3) + ea,
              width: String(circleTextWidth) + ea,
              fontSize: String(circleTextSize3) + ea,
              fontWeight: String(circleTextFocus),
              color: colorChip.green,
              fontFamily: "graphik",
              textAlign: desktop ? "left" : "center",
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: rightBox,
    style: {
      position: "absolute",
      top: desktop ? String(((circleTop3 + (circleWidth3 / 2)) * 2) - (circleTop1 + circleWidth1)) + ea : String(circleTop1) + ea,
      left: String(desktop ? circleLeft1 : circleLeft4) + ea,
      width: String(circleWidth1) + ea,
      height: String(circleWidth1) + ea,
      borderRadius: String(circleWidth1) + ea,
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/profile3.jpg" + "')",
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            text: wordings.pick[3],
            style: {
              display: (media[2] || media[3] || media[4]) ? "none" : "block",
              position: "absolute",
              top: String(circleTextTop1) + ea,
              left: String(circleTextLeft1) + ea,
              width: String(circleTextWidth) + ea,
              fontSize: String(circleTextSize1) + ea,
              fontWeight: String(circleTextWeight),
              color: colorChip.deactive,
              fontFamily: "graphik",
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: rightBox,
    style: {
      position: "absolute",
      top: desktop ? String(((circleTop3 + (circleWidth3 / 2)) * 2) - (circleTop0 + circleWidth0)) + ea : String(circleTop0) + ea,
      left: String(desktop ? circleLeft0 : circleLeft5) + ea,
      width: String(circleWidth0) + ea,
      height: String(circleWidth0) + ea,
      borderRadius: String(circleWidth0) + ea,
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/profile4.jpg" + "')",
      backgroundSize: "100% 100%",
      backgroundPosition: "50% 50%",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            text: wordings.pick[4],
            style: {
              display: (media[2] || media[3] || media[4]) ? "none" : "block",
              position: "absolute",
              top: String(circleTextTop0) + ea,
              left: String(circleTextLeft0) + ea,
              width: String(circleTextWidth) + ea,
              fontSize: String(circleTextSize0) + ea,
              fontWeight: String(circleTextWeight),
              color: colorChip.deactive,
              fontFamily: "graphik",
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: rightBox,
    mode: "svg",
    source: desktop ? svgMaker.horizontalArrow(circleArrowWidth, circlrArrowHeight) : svgMaker.verticalArrow(circleArrowWidth, circlrArrowHeight),
    style: {
      position: "absolute",
      top: String(circleArrowTop) + ea,
      left: String(circlrArrowLeft) + ea,
      width: String(circleArrowWidth) + ea,
      height: String(circlrArrowHeight) + ea,
    }
  });

  contentsBox = createNode({
    mother: rightBox,
    style: {
      position: "relative",
      display: "inline-block",
      width: desktop ? withOut(contentsBoxLeft + (contentsBoxPadding * 2), ea) : withOut((contentsBoxLeft * 2) + (contentsBoxPadding * 2), ea),
      height: desktop ? String(((circleTop3 + (circleWidth3 / 2)) * 2) - (contentsBoxPadding * 2)) + ea : "",
      marginLeft: String(contentsBoxLeft) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray1,
      padding: String(contentsBoxPadding) + ea,
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(contentsWhiteHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(0),
              width: String(100) + '%',
              height: withOut(contentsBlockHeight, ea),
              left: String(0),
              backgroundImage: "url('" + StyleCurationJs.binaryPath + "/secondConsulting.jpg" + "')",
              backgroundSize: "auto 100%",
              backgroundPosition: "50% 50%",
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          },
          {
            text: wordings.box.design,
            style: {
              position: "absolute",
              width: String(100) + '%',
              textAlign: "center",
              left: String(0),
              bottom: String(contentsBlockBottom) + ea,
              fontSize: String(contentsBlockSize) + ea,
              fontWeight: String(500),
              color: colorChip.green
            },
            bold: {
              fontWeight: String(800),
              color: colorChip.green
            }
          }
        ]
      },
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(contentsBlockHeightArrow) + ea,
          marginTop: String(contentsBlockMarginTopArrow) + ea,
          textAlign: "center",
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.verticalArrow(contentsBlockArrowWidth, contentsBlockHeightArrow, colorChip.deactive),
            style: {
              display: "inline-block",
              width: String(contentsBlockArrowWidth) + ea,
              height: String(contentsBlockHeightArrow) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "block" : "flex",
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          position: "relative",
          width: String(100) + '%',
          height: String(contentsBlockHeight) + ea,
          background: colorChip.gray3,
          borderRadius: String(5) + "px",
          marginTop: String(contentsBlockMarginTopArrow) + ea,
        },
        children: [
          {
            text: wordings.box.etc[0],
            style: {
              position: desktop ? "absolute" : "relative",
              width: String(100) + '%',
              textAlign: "center",
              left: String(0),
              bottom: desktop ? String(contentsBlockBottom) + ea : "",
              fontSize: String(contentsBlockSize) + ea,
              fontWeight: String(500),
              color: colorChip.shadow
            },
            bold: {
              fontWeight: String(800),
              color: colorChip.shadow
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "block" : "flex",
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          position: "relative",
          width: String(100) + '%',
          height: String(contentsBlockHeight) + ea,
          background: colorChip.gray3,
          borderRadius: String(5) + "px",
          marginTop: String(contentsBlockMarginTop) + ea,
        },
        children: [
          {
            text: wordings.box.etc[1],
            style: {
              position: desktop ? "absolute" : "relative",
              width: String(100) + '%',
              textAlign: "center",
              left: String(0),
              bottom: desktop ? String(contentsBlockBottom) + ea : "",
              top: desktop ? "" : String(-0.2) + ea,
              fontSize: String(contentsBlockSize) + ea,
              fontWeight: String(500),
              color: colorChip.shadow
            },
            bold: {
              fontWeight: String(800),
              color: colorChip.shadow
            }
          }
        ]
      },
      {
        style: {
          display: desktop ? "block" : "flex",
          justifyContent: desktop ? "" : "center",
          alignItems: desktop ? "" : "center",
          position: "relative",
          width: String(100) + '%',
          height: String(contentsBlockHeight) + ea,
          background: colorChip.gray3,
          borderRadius: String(5) + "px",
          marginTop: String(contentsBlockMarginTop) + ea,
        },
        children: [
          {
            text: wordings.box.etc[2],
            style: {
              position: desktop ? "absolute" : "relative",
              width: String(100) + '%',
              textAlign: "center",
              left: String(0),
              bottom: desktop ? String(contentsBlockBottom) + ea : "",
              top: desktop ? "" : String(-0.5) + ea,
              fontSize: String(contentsBlockSize) + ea,
              fontWeight: String(500),
              color: colorChip.shadow
            },
            bold: {
              fontWeight: String(800),
              color: colorChip.shadow
            }
          }
        ]
      },
    ]
  });

  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      height: desktop ? String(descriptionHeight) + ea : "",
      marginTop: String(descriptionMarginTop) + ea,
    },
    children: [
      {
        text: wordings.contents.title.join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          width: String(descriptionTitleWidth) + ea,
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionTitleWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      },
      {
        text: wordings.contents.description.join("\n"),
        style: {
          display: desktop ? "inline-block" : "block",
          marginLeft: String(descriptionTitleMargin) + ea,
          width: withOut(descriptionTitleWidth + descriptionTitleMargin, ea),
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          textAlign: desktop ? "" : "center",
        }
      },
    ]
  });

}

StyleCurationJs.prototype.insertSecondService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight, titleSecondLeft, titleSecondWeight;
  let titleSecondTop;
  let barWidth, barTop;
  let indexFont, indexFontWeight;
  let indexNumberBottom;
  let initWording0, initWording1;
  let descriptionHeight, descriptionMarginTop;
  let descriptionTitleWidth, descriptionTitleMargin;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let descriptionTitleWeight;
  let contentsBlockSize, contentsBlockBottom;
  let wordings;
  let grayBox;
  let grayBoxHeight;
  let grayBoxWidth;
  let grayArrowWidth;
  let grayArrowMargin;
  let grayArrowHeight;
  let grayBoxInnerMargin;
  let grayTextBottom;
  let grayTextSize;
  let grayDeactiveTextSize;
  let barLeft;
  let mobileTitleLeft;
  let mobileTitleTop;
  let mobileTitleMarginBottom;
  let mobileRightBoxPaddingTop;
  let whiteBlockPaddingBottom;
  let mobileGrayMarginTop, mobileGrayMarginLeft;
  let mobilePictureBetween;

  blockHeight = <%% 406, 406, 384, 295, 160 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 28, 25, 22, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleSecondTop = <%% 55, 50, 44, 39, 2 %%>;
  titleSecondLeft = <%% 125, 6, 6, 6, 6 %%>;
  titleSecondWeight = <%% 200, 200, 200, 200, 200 %%>;

  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 106, 106, 106, 106, 24 %%>;
  barTop = <%% (isMac() ? 73 : 71), (isMac() ? 73 : 71), (isMac() ? 73 : 71), (isMac() ? 73 : 71), 10.5 %%>;
  barLeft = 12.5;

  indexFont = <%% 19, 19, 19, 19, 5.7 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  indexNumberBottom = <%% 7, 4, 2, 5, 0 %%>;

  grayBoxHeight = <%% 210, 210, 210, 155, 24 %%>;
  grayBoxWidth = <%% 320, 290, 260, 210, 32 %%>;
  grayTextBottom = <%% 20, 20, 20, 20, 2 %%>;
  grayTextSize = <%% 14, 12, 11, 11, 3 %%>;
  grayDeactiveTextSize = <%% 16, 14, 13, 11, 3 %%>;
  grayArrowWidth = <%% 100, 45, 39, 39, 2 %%>;
  grayArrowMargin = <%% 20, 16, 12, 10, 2 %%>;
  grayArrowHeight = <%% 12, 12, 12, 12, 3.5 %%>;
  grayBoxInnerMargin = <%% 24, 20, 12, 10, 2 %%>;

  descriptionHeight = <%% 60, 60, 60, 60, 6 %%>;
  descriptionMarginTop = <%% 36, 36, 36, 25, 4 %%>;
  descriptionTitleWidth = <%% 90, 90, 90, 72, 6 %%>;
  descriptionTitleMargin = <%% 40, 40, 30, 3, 6 %%>;
  descriptionSize = <%% 15, 15, 14, 13, 3 %%>;
  descriptionWeight = desktop ? 300 : 400;
  descriptionLineHeight = 1.6;
  descriptionTitleWeight = 700;

  mobileTitleLeft = 7;
  mobileTitleTop = 7;
  mobileTitleMarginBottom = 7;
  mobileRightBoxPaddingTop = 49;
  whiteBlockPaddingBottom = 9;

  mobileGrayMarginTop = 43;
  mobileGrayMarginLeft = 6;
  mobilePictureBetween = 12;

  wordings = {
    title: {
      main: desktop ? "우리집 상세 견적은," : "우리집 상세 견적은",
      sub: [
        "디자이너와 함께",
        "조정해보세요!"
      ]
    },
    gray: {
      main: [
        "디자인비",
      ],
      sub: [
        "시공비",
        "제품\n구매비",
        "부가\n서비스비"
      ]
    },
    contents: {
      title: [
        "홈리에종의",
        "비용 구성"
      ],
    }
  }

  if (media[0]) {
    wordings.contents.description = [ "홈리에종은 선 디자인이 필수이기 때문에, 시공 견적을 드리는 것이 아니라 디자이너의 인건비 개념인 디자인비를 먼저 받는 구조로 되어 있습니다. 우리집을 담당해 줄 전문가를 먼저 만나 함께 인테리어를 진행해보세요!" ];
  } else if (media[1]) {
    wordings.contents.description = [ "홈리에종은 일단 시공 견적을 드리는 것이 아니라 디자이너의 인건비 개념인 디자인비를 먼저 받는 구조로 되어 있습니다. 우리집을 담당해 줄 전문가를 만나 함께 진행해보세요!" ];
  } else if (media[2]) {
    wordings.contents.description = [ "홈리에종은 시공 견적부터 드리는 것이 아니라 인건비 개념인 디자인비를 먼저 받는 구조입니다. 우리집을 담당해 줄 전문가를 만나 함께 진행해보세요!" ];
  } else if (media[3]) {
    wordings.contents.description = [ "홈리에종은 시공 견적부터 드리는 것이 아니라 인건비 개념인 디자인비를 먼저 받는 구조입니다. 우리집을 담당해 줄 전문가를 만나 함께 진행해보세요!" ];
  } else {
    wordings.contents.description = [ "홈리에종은 일단 시공 견적을 드리는 것이 아니라 디자이너의 인건비 개념인 디자인비를 먼저 받는 구조로 되어 있습니다. 우리집을 담당해 줄 전문가를 만나 함께 진행해보세요!" ];
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight) + ea : "",
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      paddingBottom: desktop ? "" : String(whiteBlockPaddingBottom) + ea,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : "",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    }
  });

  //main title
  createNode({
    mother: leftBox,
    text: wordings.title.main,
    style: {
      position: desktop ? "absolute" : "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 0 : 0) + (isMac() || mobile ? 0 : 4)) + ea) : "",
      paddingTop: desktop ? "" : String(mobileTitleTop) + ea,
      left: desktop ? String(titleLeft) + ea : "",
      marginLeft: desktop ? "" : String(mobileTitleLeft) + ea,
      color: colorChip.black,
      width: desktop ? "" : withOut(mobileTitleLeft * 2, ea),
      textAlign: desktop ? "" : "right",
    }
  });

  createNode({
    mother: leftBox,
    text: wordings.title.sub.join("\n"),
    style: {
      position: desktop ? "absolute" : "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleSecondWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? String(titleSecondTop) + ea : "",
      marginTop: desktop ? "" : String(titleSecondTop) + ea,
      left: desktop ? String(titleSecondLeft) + ea : "",
      marginLeft: desktop ? "" : String(mobileTitleLeft) + ea,
      width: desktop ? "" : withOut(mobileTitleLeft * 2, ea),
      textAlign: desktop ? (media[0] ? "right" : "left") : "right",
      color: colorChip.black,
      lineHeight: String(desktop ? 1.35 : 1.3),
    },
    bold: {
      fontWeight: String(titleFontWeight),
      color: colorChip.black,
    }
  });

  if (media[0] || media[4]) {
    createNode({
      mother: leftBox,
      style: {
        position: "absolute",
        borderBottom: "1px " + (desktop ? "solid" : "dashed") + " " + (desktop ? colorChip.green : colorChip.whiteGreen),
        top: String(barTop) + ea,
        left: String(desktop ? titleLeft : barLeft) + ea,
        width: String(barWidth) + ea,
      }
    });
  }

  createNode({
    mother: leftBox,
    text: String(2),
    style: {
      position: "absolute",
      fontSize: String(indexFont) + ea,
      fontWeight: String(indexFontWeight),
      wordSpacing: String(wordSpacing) + ea,
      bottom: desktop ? String(indexNumberBottom) + ea : "",
      top: desktop ? "" : String(mobileTitleTop) + ea,
      left: desktop ? String(titleLeft) + ea : String(mobileTitleLeft) + ea,
      color: desktop ? colorChip.gray4 : colorChip.black,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : "",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      height: String(grayBoxHeight) + ea,
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      left: desktop ? "" : String(mobileGrayMarginLeft) + ea,
      width: desktop ? "" : withOut(mobileGrayMarginLeft * 2, ea),
      marginTop: desktop ? "" : String(mobileGrayMarginTop) + ea,
    }
  });

  createNode({
    mother: grayBox,
    style: {
      display: desktop ? "inline-block" : "block",
      position: desktop ? "relative" : "absolute",
      height: String(grayBoxHeight) + ea,
      width: desktop ? String(grayBoxWidth) + ea : String(100) + '%',
      backgroundImage: "url('" + StyleCurationJs.binaryPath + "/3dsample.jpg" + "')",
      backgroundSize: (media[2] || media[3]) ? "auto 100%" : "100% auto",
      backgroundPosition: "50% 50%",
      borderRadius: String(5) + "px",
      boxShadow: "5px 2px 21px -9px " + colorChip.shadow,
      top: desktop ? "" : String(-1 * (grayBoxHeight + mobilePictureBetween)) + ea,
    }
  });

  createNode({
    mother: grayBox,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: desktop ? "relative" : "absolute",
      verticalAlign: "top",
      height: String(desktop ? grayBoxHeight : mobilePictureBetween) + ea,
      width: desktop ? String(grayArrowWidth) + ea : String(100) + '%',
      marginLeft: desktop ? String(grayArrowMargin) + ea : "",
      justifyContent: "center",
      alignItems: "center",
      top: desktop ? "" : String(-1 * mobilePictureBetween) + ea,
    },
    children: [
      {
        mode: "svg",
        source: desktop ? svgMaker.horizontalArrow(grayArrowWidth, grayArrowHeight) : svgMaker.verticalArrow(grayArrowWidth, grayArrowHeight),
        style: {
          position: desktop ? "relative" : "absolute",
          width: String(grayArrowWidth) + ea,
          height: String(grayArrowHeight) + ea,
          bottom: desktop ? "" : String(2) + ea,
        }
      },
      {
        text: wordings.gray.main.join("\n"),
        style: {
          position: "absolute",
          fontSize: String(grayTextSize) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          bottom: desktop ? String(grayTextBottom) + ea : "",
          top: desktop ? "" : String(1.5) + ea,
          textAlign: desktop ? "left" : "center",
          left: String(0) + ea,
          lineHeight: String(1.5),
          width: desktop ? "" : String(100) + '%',
        }
      }
    ]
  });

  createNode({
    mother: grayBox,
    style: {
      display: "inline-flex",
      position: "relative",
      verticalAlign: "top",
      height: String(grayBoxHeight) + ea,
      width: desktop ? withOut(grayBoxWidth + grayArrowWidth + (grayArrowMargin * 2), ea) : withOut(grayArrowMargin, ea),
      marginLeft: String(grayArrowMargin) + ea,
      alignItems: "center",
    },
    children: [
      {
        style: {
          position: "relative",
          width: withOut(grayBoxInnerMargin, ea),
          left: String(0),
          height: withOut(grayBoxInnerMargin * 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
        }
      },
      {
        style: {
          position: "absolute",
          width: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(2 / 3)",
          left: String(0),
          height: withOut(grayBoxInnerMargin * 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "6px 1px 13px -9px " + colorChip.shadow,
        }
      },
      {
        style: {
          position: "absolute",
          width: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(1 / 3)",
          left: String(0),
          height: withOut(grayBoxInnerMargin * 2, ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "6px 1px 13px -9px " + colorChip.shadow,
        }
      },
      {
        text: wordings.gray.sub[0],
        style: {
          position: "absolute",
          width: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(1 / 3)",
          left: String(0),
          fontSize: String(grayDeactiveTextSize) + ea,
          fontWeight: String(600),
          color: colorChip.liteBlack,
          lineHeight: String(1.4),
          textAlign: "center",
        }
      },
      {
        text: wordings.gray.sub[1],
        style: {
          position: "absolute",
          width: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(1 / 3)",
          left: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(1 / 3)",
          fontSize: String(grayDeactiveTextSize) + ea,
          fontWeight: String(600),
          color: colorChip.liteBlack,
          lineHeight: String(1.4),
          textAlign: "center",
        }
      },
      {
        text: wordings.gray.sub[2],
        style: {
          position: "absolute",
          width: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(1 / 3)",
          left: "calc(" + withOut(grayBoxInnerMargin, ea) + " * calc(2 / 3)",
          fontSize: String(grayDeactiveTextSize) + ea,
          fontWeight: String(600),
          color: colorChip.liteBlack,
          lineHeight: String(1.4),
          textAlign: "center",
        }
      },
    ]
  });

  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      height: desktop ? String(descriptionHeight) + ea : "",
      marginTop: String(descriptionMarginTop) + ea,
    },
    children: [
      {
        text: wordings.contents.title.join("\n"),
        style: {
          display: desktop ? "inline-block" : "none",
          width: String(descriptionTitleWidth) + ea,
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionTitleWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      },
      {
        text: wordings.contents.description.join("\n"),
        style: {
          display: desktop ? "inline-block" : "block",
          marginLeft: String(descriptionTitleMargin) + ea,
          width: withOut(descriptionTitleWidth + descriptionTitleMargin, ea),
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          textAlign: desktop ? "" : "center",
        }
      },
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

  bottomMargin = <%% 16, 16, 16, 12, 1 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  textBoxHeight = <%% 90, 90, 90, 90, 9 %%>;
  textBoxSize = <%% 17, 17, 17, 17, 17 %%>;

  quotePaddingTop = <%% 60, 60, 60, 60, 9 %%>;
  quoteMarginBottom = <%% 5, 5, 5, 5, 1 %%>;
  quoteWidth = <%% 20, 20, 20, 16, 3 %%>;

  titleSize = <%% 30, 30, 29, 27, 5 %%>;
  subTitleSize = <%% 14, 14, 14, 14, 3 %%>;
  subTitlePaddingTop = <%% 8, 8, 8, 8, 1 %%>;
  subTitlePaddingBottom = <%% 80, 80, 80, 80, 12 %%>;

  wording = "제안서가 완료되는 대로,\n<b%알림톡을 통해 보내드리겠습니다.%b>";
  wording2 = "제안서 제작에는 영업일 기준 1~2일 정도 소요될 수 있습니다.";

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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
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
          marginTop: desktop ? "" : String(4) + ea,
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
          background: desktop ? colorChip.gray1 : colorChip.gray6,
          borderRadius: String(desktop ? 5 : 3) + "px",
          overflow: "hidden",
          marginTop: desktop ? "" : String(-2) + ea,
          zIndex: desktop ? "" : String(-1),
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
          color: desktop ? colorChip.gray4 : colorChip.deactive,
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
          { accept: "image/*" },
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

                  // instance.mother.certificationBox(instance.client.name, instance.client.phone, async function (back, box) {
                  //   try {
                  //     await GeneralJs.sleep(500);
                  //     document.body.removeChild(box);
                  //     document.body.removeChild(back);
                  //     instance.parsingValues();
                  //   } catch (e) {
                  //     await GeneralJs.ajaxJson({ message: "StyleCurationJs.certificationBox : " + e.message }, "/errorLog");
                  //   }
                  // });

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
    selected: seridObj.map((obj) => { return Number(obj.serid.split('_')[1].replace(/[^0-9]/gi, '').replace(/^0/gi, '').replace(/^0/gi, '').replace(/^0/gi, '')) - 1; }),
    range: seridObj.map((obj) => { return [ obj.min * 1000000, obj.max * 1000000 ] })
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

  methodsTongTop = <%% 18, (isMac() ? 18 : 17), (isMac() ? 18 : 17), (isMac() ? 14 : 16), 3.2 %%>;
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
          text: "최저 " + String(Math.round(data.range[i][0] / 10000) === 0 ? 70 : Math.round(data.range[i][0] / 10000)) + "만원",
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

  titleBetween = <%% 12, 24, 22, 20, 2 %%>;
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
  plusBottom = <%% (isMac() ? 39 : 44), (isMac() ? 48 : 50), (isMac() ? 47 : 49), (isMac() ? 41 : 43), 33 %%>;

  titleTopVisualFirst = <%% -2, (isMac() ? -3 : -1), (isMac() ? -4 : -2), (isMac() ? -4 : -2), 0 %%>;
  titleTopVisualSecond = <%% -1, (isMac() ? -4 : -2), (isMac() ? -5 : -3), (isMac() ? -4 : -2), 0 %%>;

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

StyleCurationJs.prototype.serviceConverting = async function (seridObj) {
  const instance = this;
  const { ea, baseTong } = this;
  const { backgroundImageBox, backgroundImageBox2 } = this.mother;
  const { cleanChildren, ajaxJson, returnGet } = GeneralJs;
  const children = baseTong.children;
  try {
    await ajaxJson({
      page: "styleCuration",
      mode: "page",
      liteMode: (returnGet().mode === "lite"),
      cliid: instance.client.cliid,
    }, "/ghostClient_updateAnalytics");
    backgroundImageBox2.style.opacity = String(1);
    backgroundImageBox.style.animation = "justfadeoutoriginal 1s ease forwards";
    baseTong.style.height = String(baseTong.getBoundingClientRect().height) + ea;
    baseTong.style.animation = "fadedownmiddle 0.4s ease forwards";
    GeneralJs.setTimeout(() => {
      baseTong.style.opacity = String(0);
      cleanChildren(baseTong);
      instance.insertPendingProposal();
      instance.insertServiceBox(seridObj);
      instance.insertAdditionBox();
      baseTong.style.height = "";
      baseTong.style.animation = "fadeupdelay 0.5s ease forwards";
    }, 500);
    return "done";
  } catch (e) {
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.serviceConverting : " + e.message }, "/errorLog");
  }
}

StyleCurationJs.prototype.forceConverting = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
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
              boo = true;
              firstBoo = false;
              break;
            }
          }

          if (boo) {
            thisProjects = await ajaxJson({ noFlat: true, whereQuery: { cliid: client.cliid } }, "/getProjects", { equal: true });
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

    if (firstBoo) {
      await ajaxJson({ cliid: client.cliid, name: client.name, phone: client.phone }, "/styleCuration_pageInitComplete");
    }
  } catch (e) {
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.forceConverting : " + e.message }, "/errorLog");
  }
}

StyleCurationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise } = GeneralJs;
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

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: getObj.cliid } }, "/getClients", { equal: true });
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

    contentsPhotoObj = await ajaxJson({}, "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory");

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
    if (getObj.cliid === "c1801_aa01s") {
      this.client.name = "배창규";
      this.testMode = true;
    }
    // TEST Center ==================================================================================================

    await this.mother.ghostClientLaunching({
      name: "styleCuration",
      client: this.client,
      base: {
        instance: this,
        binaryPath: StyleCurationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 서비스 안내"),
        secondBackground: true
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertFirstService();
          instance.insertSecondService();
          instance.insertCenterBox();
          instance.insertPhotoBox();
          instance.insertPannelBox();
          await instance.forceConverting();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StyleCurationJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "StyleCurationJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
