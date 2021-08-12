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
              "스타일 분석이 완료되었습니다!"
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
      if (!liteMode) {
        this.wordings.center.push({
          name: "space",
          title: "공간",
          callback: "blockCheck",
          children: [
            {
              name: "address",
              type: "address",
              half: false,
              required: true,
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
            {
              name: "buildingType",
              type: "checkbox",
              half: true,
              required: true,
              rewind: "건물 유형을 체크해주세요! (상가일 시, 오피스텔로 체크해주세요!)",
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
              realItems: [
                100 / 75,
                100 / 50,
                100 / 70,
                100 / 65,
                100 / 70
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
              },
              value: function (request, history, self) {
                if (history.curation.building.type === "") {
                  return null;
                } else {
                  return history.curation.building.type;
                }
              },
              siblings: [ "pyeongStandard" ],
              update: function (value, siblings, client) {
                if (value === null) {
                  return { history: null, core: null };
                } else {
                  const { items, realItems, selected } = value;
                  if (selected === null) {
                    return { history: null, core: null };
                  } else {
                    const apartStandard = 75;
                    let historyQuery, coreQuery;
                    let pyeong, pyeongTarget;

                    historyQuery = {};
                    historyQuery["curation.building.type"] = items[selected];

                    pyeong = client.requests[0].request.space.pyeong;

                    pyeongTarget = siblings.space.find((obj) => { return obj.name === "pyeongStandard"; }).value;
                    if (pyeongTarget === null || pyeongTarget === undefined) {
                      pyeong = realItems[selected] * pyeong;
                    } else if (typeof pyeongTarget === "object" && pyeongTarget.realItems !== undefined && pyeongTarget.realItems) {
                      if (pyeongTarget.realItems[pyeongTarget.selected]) {
                        pyeong = realItems[selected] * pyeong;
                      } else {
                        pyeong = (((1 / realItems[selected]) * 100) / apartStandard) * pyeong;
                      }
                    } else {
                      pyeong = realItems[selected] * pyeong;
                    }

                    coreQuery = {};
                    coreQuery["requests.0.request.space.pyeong"] = pyeong;

                    return {
                      history: historyQuery,
                      core: coreQuery
                    };
                  }
                }
              }
            },
            {
              name: "pyeongStandard",
              type: "checkbox",
              half: true,
              required: true,
              rewind: "평형 기준을 체크해주세요!",
              question: [
                "적어주신 <b%평수가 분양 면적 기준%b>이 맞나요?"
              ],
              items: [
                "분양 면적 (공급 면적)",
                "전용 면적",
              ],
              value: function (request, history, self) {
                return self.items[0];
              },
              realItems: [
                false,
                true,
              ],
              multiple: false,
              siblings: [ "buildingType" ],
              update: function (value, siblings, client) {
                if (value === null) {
                  return { history: null, core: null };
                }
                const { items, realItems, selected } = value;
                if (selected === null) {
                  return { history: null, core: null };
                } else {
                  const apartStandard = 75;
                  let coreQuery;
                  let pyeong;
                  let calcValue;
                  let calcTarget;

                  pyeong = client.requests[0].request.space.pyeong;
                  calcTarget = siblings.space.find((obj) => { return obj.name === "buildingType"; }).value;
                  if (calcTarget === null || calcTarget === undefined) {
                    pyeong = pyeong;
                  } else if (typeof calcTarget === "object" && calcTarget.realItems !== undefined && calcTarget.realItems) {
                    calcValue = calcTarget.realItems[calcTarget.selected];
                    if (realItems[selected]) {
                      pyeong = calcValue * pyeong;
                    } else {
                      pyeong = (((1 / calcValue) * 100) / apartStandard) * pyeong;
                    }
                  } else {
                    pyeong = pyeong;
                  }

                  coreQuery = {};
                  coreQuery["requests.0.request.space.pyeong"] = pyeong;

                  return {
                    history: null,
                    core: coreQuery
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
                "가구와 소품의 <b%기존 제품 구매와 재사용의%b>",
                "<b%비율%b>을 알려주세요!"
              ],
              items: [
                "재사용",
                "새로 구입",
              ],
              total: 100,
              ea: '%',
              value: function (request, history, self) {
                return history.curation.furniture.ratio;
              },
              update: function (value, siblings, client) {
                if (value !== null) {
                  let updateQuery;
                  updateQuery = {};
                  updateQuery["curation.furniture.ratio"] = value.value;
                  return {
                    history: updateQuery,
                    core: null
                  };
                } else {
                  return { history: null, core: null };
                }
              }
            },
            {
              name: "makeFurnitrue",
              type: "checkbox",
              half: true,
              required: false,
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
              value: function (request, history, self) {
                return history.curation.furniture.makeNeeds.furniture ? self.items[0] : self.items[2];
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
                    updateQuery["curation.furniture.makeNeeds.furniture"] = (selected === 0);
                    return {
                      history: updateQuery,
                      core: null
                    };
                  }
                }
              }
            },
            {
              name: "makeFabric",
              type: "checkbox",
              half: true,
              required: false,
              question: [
                "<b%커튼, 베딩 패브릭 제작 니즈%b>가 있으신가요?"
              ],
              items: [
                "있다",
                "없다",
                "모르겠다",
              ],
              multiple: false,
              value: function (request, history, self) {
                return history.curation.furniture.makeNeeds.fabric ? self.items[0] : self.items[2];
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
                    updateQuery["curation.furniture.makeNeeds.fabric"] = (selected === 0);
                    return {
                      history: updateQuery,
                      core: null
                    };
                  }
                }
              }
            },
          ]
        });
      }
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
      }).catch((err) => {
        console.log(err);
      });

    }
  }

  resetEvent = function () {
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
    if (!Array.isArray(instance.randomPick)) {
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

          pickupDesigners();

        } catch (e) {
          console.log(e);
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
          console.log(e);
        }
      });
    }
  }

  arrowEvent = function () {
    instance.selectPhotos = [];
    GeneralJs.stacks[loadingName] = true;
    GeneralJs.setTimeout(() => {
      resetEvent();
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
                  resetEvent();
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
                      console.log(e);
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
                  console.log(e);
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
                    console.log(err);
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
          console.log(err);
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
                }, "/ghostClient_updateAnalytics").catch((err) => {
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
    console.log(e);
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
      throw new Error("promise error");
    } else if (obj.promisePass === true) {
      return new Promise((resolve, reject) => { resolve({ promisePass: true }); });
    } else {
      const { service, client, history } = obj;

      if (service.length === 0) {
        if (returnGet().mode === "lite") {
          window.alert("매칭되는 경우가 없어 진행할 수 없습니다. 홈리에종에 카카오 채널 또는 전화를 통해 문의해주세요!");
        } else {
          window.alert("매칭되는 경우가 없습니다, 생각하는 시공 정도를 조정해주세요!");
        }
        return new Promise((resolve, reject) => { resolve({ promisePass: true }); });
      }

      instance.client = client;
      instance.clientHistory = history;
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
        throw new Error("promise error");
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
    if (obj.message !== "done") {
      grayLoading.remove();
      GeneralJs.scrollTo(window, 0);
      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } else {
      return instance.serviceConverting(finalSerid);
    }
  }).then((message) => {
    if (message !== "done") {
      throw new Error("promise error");
    }
  }).catch((err) => {
    ajaxJson({
      message: instance.client.name + " 고객님이 큐레이션 페이지를 제출하는 도중 오류를 만나 비정상 종료되었습니다!",
      channel: "#404_curation",
      voice: true,
    }, "/sendSlack").then(() => { window.alert("오류가 발생하였습니다! 관리자에게 문의 부탁드립니다!"); window.location.reload(); }).catch((err) => { console.log(err); });
  });

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
                instance.mother.certificationBox(instance.client.name, instance.client.phone, async function (back, box) {
                  try {
                    await GeneralJs.sleep(500);
                    document.body.removeChild(box);
                    document.body.removeChild(back);
                    instance.parsingValues();
                  } catch (e) {
                    console.log(e);
                  }
                });
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
      instance.insertInitBox(false);
      instance.insertServiceBox(seridObj);
      instance.insertAdditionBox();
      baseTong.style.height = "";
      baseTong.style.animation = "fadeupdelay 0.5s ease forwards";
    }, 500);
    return "done";
  } catch (e) {
    console.log(e);
  }
}

StyleCurationJs.prototype.forceConverting = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  const { client, clientHistory } = this;
  try {
    if (Array.isArray(clientHistory.curation.analytics.send)) {
      if (clientHistory.curation.analytics.send.length > 0) {
        if (clientHistory.curation.analytics.send.every((o) => { return typeof o === "object"; })) {
          let boo, feeArr, thisProjects, thisProject, finalSerid;
          boo = false;
          for (let obj of clientHistory.curation.analytics.send) {
            if (obj.page === "designerProposal") {
              boo = true;
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
  } catch (e) {
    console.log(e);
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
    this.wordings = this.curationWordings(liteMode);

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
          instance.insertInitBox(true);
          instance.insertCenterBox();
          instance.insertPhotoBox();
          instance.insertPannelBox();
          await instance.forceConverting();
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
