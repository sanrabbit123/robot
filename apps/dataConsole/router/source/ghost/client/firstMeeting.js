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
      "return ('현장 미팅 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('현장 미팅 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "firstMeeting",
  "route": [
    "meeting",
    "FM"
  ]
} %/%/g

const FirstMeetingJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

FirstMeetingJs.binaryPath = "/middle/meeting";

FirstMeetingJs.prototype.meetingWordings = function (liteMode = false) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  class StyleCurationWordings {
    constructor() {
      this.wordings = {};
      this.wordings.init = {
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
          "/designerMeeting.jpg",
          "/designerMeetingb.jpg",
          "/designerMeetingc.jpg",
        ]
      };
      this.wordings.center = [];
      this.wordings.center.push({
        name: "construct",
        title: "기본 정보",
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
            value: function (request, history, self) {
              return null;
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
            value: function (request, history, self) {
              return null;
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

FirstMeetingJs.prototype.cautionStatic = function () {
  const instance = this;
  let matrix;

  matrix = [
    {
      title: "커뮤니케이션 & 컨설팅",
      contents: [
        "디자이너와 카톡(문자) / 전화 / 메일 등의 채널을 통해 커뮤니케이션합니다. 적극적으로 참여해주실 때 더 좋은 결과물을 얻으실 수 있습니다.",
        "집 상태, 기간, 예산, 취향, 생활 방식 등을 고려하여 진행해드립니다.",
      ],
    },
    {
      title: "스타일링 범주",
      contents: [
        "기존에 사용하시는 가구들 중 가져갈 가구와 버릴 가구 선택 및 활용 방안을 제안드립니다.",
        "새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 디자인 옵션(컬러 등) 등에 대해서 의논할 수 있습니다.",
        "생활 용품과 식기의 경우는 제안하지 않습니다.",
        "거주 중인 경우 가구 이동, 수리, 폐기 등은 디자이너가 하지 않습니다.",
      ]
    },
    {
      title: "시공 범주",
      contents: [
        "시공의 경우 공정별 계약은 진행하지 않습니다. 시공에 대해서는 계약한 업체에게 책임이 있고, 의사 소통과 AS, 업무 지시는 해당 업체의 담당자가 책임지고 진행합니다.",
        "시공 진행시, 홈리에종 시공팀, 고객님이 알아보신 시공팀, 또는 디자이너 시공팀 중 하나를 선택하여 진행이 가능합니다.",
      ]
    },
    {
      title: "구매 안내",
      contents: [
        "제품 구매는 고객님이 직접 진행합니다.",
        "중고가 이상의 브랜드 제품 중 일부는 구매 할인 혜택을 받을 수 있습니다. (모든 제품이 해당되진 않으며 업체마다 차이가 있습니다.)",
        "최종 구매는 고객님이 직접 내용 확인 후 결정하셔야 합니다. 리뷰 확인이 정말 중요합니다!",
      ]
    },
    {
      title: "촬영 및 인터뷰 안내",
      contents: [
        "서비스가 완료되면 촬영과 인터뷰를 진행합니다.(필수)",
        "홈리에종과 디자이너는 공간의 사진과 인터뷰를 활용할 수 있습니다.",
      ]
    },
    {
      title: "구매 안내",
      contents: [
        "제품 구매는 고객님이 직접 진행합니다.",
        "중고가 이상의 브랜드 제품 중 일부는 구매 할인 혜택을 받을 수 있습니다. (모든 제품이 해당되진 않으며 업체마다 차이가 있습니다.)",
        "최종 구매는 고객님이 직접 내용 확인 후 결정하셔야 합니다. 리뷰 확인이 정말 중요합니다!",
      ]
    },
  ];

  return matrix;
}

FirstMeetingJs.prototype.tableStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;

  const title = "홈스타일링 의뢰서";
  const initialContents = "안녕하세요, <b%" + designer.designer + "%b> 실장님!\n홈리에종에 의뢰하신 " + client.name +  " 고객님 관련 정보를 보내드립니다. <b%" + GeneralJs.serviceParsing(project.service) + "%b>를 진행합니다.";
  const emptyReload = (originalArr, reloadArr) => {
    if (originalArr.map((a) => { return a.trim(); }).filter((a) => { return a !== ""; }).length > 0) {
      return originalArr;
    } else {
      return reloadArr;
    }
  }
  const mainContents = [
    {
      title: "현장 미팅",
      className: "mainContents_when",
      position: "request.about.when",
      contents: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
      spread: true,
    },
    {
      title: "현장 주소",
      className: "mainContents_where",
      position: "request.about.where",
      contents: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
      spread: true,
    },
    {
      title: "현장 관련",
      className: "mainContents_site",
      position: "request.about.site",
      contents: emptyReload(projectHistory.request.about.site, [ "현장 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "시공 관련",
      className: "mainContents_construct",
      position: "request.about.construct",
      contents: emptyReload(projectHistory.request.about.construct, [ "시공 관련 상세 사항 없음" ]),
      spread: false,
    },
    {
      title: "스타일링 관련",
      className: "mainContents_styling",
      position: "request.about.styling",
      contents: emptyReload(projectHistory.request.about.styling, [ "스타일링 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "예산 관련",
      className: "mainContents_budget",
      position: "request.about.budget",
      contents: emptyReload(projectHistory.request.about.budget, [ "예산 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "기타 사항",
      className: "mainContents_progress",
      position: "request.about.progress",
      contents: emptyReload(projectHistory.request.about.progress, [ "기타 관련 상세 사항 없음" ]),
      spread: false,
    }
  ];
  const pictureContents = "고객님이 선택한 사진";
  const pictureContentsSite = "고객님의 현장 사진";
  const pictureContentsPrefer = "고객님의 선호 사진";
  const pictures = clientHistory.curation.image;
  const noticeContents = [
    {
      title: "서비스비 안내",
      contents: [
        "이번 현장의 서비스비는 " + autoComma(project.process.contract.remain.calculation.amount.supply) + "원(VAT별도)으로 책정되어 있습니다.",
        "홈리에종의 계약금은 300,000원(VAT별도)으로 책정되어 있습니다.",
        "현재 고객은 홈리에종에 계약금 330,000원을 입금한 상태며, 현장 미팅 후 계약금을 제외한 서비스비를 전액 입금할 경우 서비스가 계속 진행됩니다.",
        "★ 현장 미팅 후 서비스비 지불 전에는 디자이너와 스타일링 논의를 할 수 없는 것이 원칙입니다.(고객에게도 필요시 안내해주세요)",
        "★ 서비스 진행중 타 공간에 대한 전체적인 스타일링이 추가되는 경우 꼭! 홈리에종을 통해 디자인비 조정이 될 수 있도록 해주세요.",
        "법인/개인사업자(일반과세), 개인사업자(간이과세), 프리랜서 정산 중에 정산 방식을 알려주시면 수수료를 제외한 정확한 정산액은 계산하여 말씀드리겠습니다.",
      ]
    },
    {
      title: "고객 안내 사항과 서비스 구성",
      contents: [
        "디자이너와 카톡(문자)/전화/메일 등의 채널을 통해 커뮤니케이션 하면서 전체 스타일링을 완성합니다. 커뮤니케이션에 적극적으로 참여해주시면 더 좋은 결과물을 얻으실 수 있습니다.",
        "디자이너와 현장 미팅을 진행하며 집컨디션/취향/생활특징/예산을 고려하여 컨설팅 해드립니다.",
        "시공팀은 추천하는 시공팀 외에 고객이 개별적으로 알아본 시공팀과 진행 가능합니다.",
        "시공 진행시 디자이너는 시공 방향 제시 및 전체 마감재를 셀렉해드립니다.",
        "기존에 사용하시는 가구들 중 가져갈 가구와 버릴가구 선택 및 배치/활용 제안 드립니다. 새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "생활용품, 식기, 가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 선택하신 후 제품 외관의 디자인 옵션(컬러 등)을 의논하실 경우 전체 디자인을 고려하여 골라드립니다. 생활용품과 식기의 경우, 고객님께서 찾으신 3~4품목중에서 셀렉은 가능합니다.",
        "디자이너 제안 후 고객 컨펌이 완료된 구매제품은 고객이 구매하실 수 있도록 안내드립니다. 연계 업체의 제품 구매시에는 할인혜택을 받으실 수 있습니다. 모든 제품이 해당되는 것은 아니며 업체마다 차이가 있습니다.",
        "제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다. 배송된 제품의 수령, 언박싱, 조립, 1차배치는 고객님께서 진행하시게 됩니다. 구매 및 물품배치가 완료되면 디자이너의 마무리터치 후 인터뷰와 촬영을 진행합니다.",
      ]
    },
    {
      title: "시공 연계수수료 안내",
      contents: [
        "고객이 시공 계약을 체결한 곳에 공사진행과 A/S에 대한 책임이 있습니다. (고객에게 동일하게 안내합니다.)",
        "고객이 데려온 시공팀과 진행할 경우 디자이너는 시공자재 셀렉과 필요시 시공관련 커뮤니케이션 업무가 있을 수 있습니다.",
        "고객이 실장님 또는 실장님과 협업하시는 시공사와 시공 계약을 체결할 경우 전체 계약 금액의 5%가 시공 연계 수수료 입니다.",
        "홈리에종은 적법한 방식의 시공계약을 권장하며, (세금 없는) 현금 거래로 시공을 진행했을 경우에도 시공 연계 수수료는 공급가에 VAT 10%를 더한 금액으로 전자세금계산서를 발행합니다. 입금하실 때에도 공급가에 VAT10% 더한 금액을 입금해주셔야합니다.",
      ]
    },
    {
      title: "정산 안내",
      contents: [
        "홈리에종에서 받은 서비스비는 수수료를 제하고 스타일링 시작 후 실장님께 선금 50%를 먼저 정산하고",
        "스타일링이 마무리되면 나머지 50%를 정산합니다.",
        "스타일링 마무리는",
        "1) 스타일링 제안이 마무리되어 제품들이 배송단계에 있고",
        "2) 촬영일이 (변동되더라도) 어느정도 정해지고",
        "3) 실장님께서 디자이너의 디자인 의도가 담긴 글(폼을 따로 드립니다) 저희쪽에 주시면",
        "4) 홈리에종에서 고객님께 정산 여부를 확인 후 정산을 진행합니다.",
      ]
    }
  ];
  const matrix = [
    [ "고객 정보", "", "공간 정보", "" ],
    [ (desktop ? "고객명" : "성함"), projectHistory.request.client.name, (desktop ? "계약 형태" : "계약"), projectHistory.request.space.contract ],
    [ "연락처", projectHistory.request.client.phone, (desktop ? "사전 점검일" : "사전점검"), projectHistory.request.space.precheck ],
    [ (desktop ? "가족 구성원" : "가족"), projectHistory.request.client.family, (desktop ? "집 비는 날" : "비는 날"), projectHistory.request.space.empty ],
    [ "주소", projectHistory.request.client.address, (desktop ? "입주 예정일" : "입주일"), projectHistory.request.space.movein ],
    [ "", "", (desktop ? "특이 사항" : "기타"), projectHistory.request.space.special ],
    [ "예산", projectHistory.request.client.budget, (desktop ? "공간구성" : "구성"), projectHistory.request.space.composition ],
    [ "서비스 정보", "", "고객 요청", "" ],
    [ "서비스", projectHistory.request.service.service, projectHistory.request.client.etc, "" ],
    [ (desktop ? "선호 컨셉" : "컨셉"), projectHistory.request.service.concept, "", "" ],
    [ "시공", projectHistory.request.service.construct, "", "" ],
    [ "스타일링", projectHistory.request.service.styling, "", "" ],
  ];
  const mergeMap = [
    [ null, [ 0, 0 ], null, [ 0, 2 ] ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ [ 4, 0 ], [ 4, 1 ], null, null ],
    [ null, null, null, null ],
    [ null, [ 7, 0 ], null, [ 7, 2 ] ],
    [ null, null, null, [ 8, 2 ] ],
    [ null, null, null, [ 9, 2 ] ],
    [ null, null, null, [ 10, 2 ] ],
    [ null, null, [ 8, 2 ], [ 11, 2 ] ],
  ];
  const callbackMap = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
  ];
  const boldMap = [
    [ 0, 0, 0, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 1, 0, 1, 0 ],
    [ 0, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
    [ 1, 0, 0, 0 ],
  ];
  const titleMap = [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ];
  const widthRatio = desktop ? [ 1, 3, 1, 3 ] : [ 1, 2, 1, 2 ];

  return {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    noticeContents,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  };
}

FirstMeetingJs.prototype.insertInitBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let titleFontSize, titleFontWeight;
  let firstBlock, secondBlock, thirdBlock;
  let firstBlockWidth;
  let initWordingSize;
  let lineHeight;
  let wordings, initPhoto;
  let zeroWordingSize, zeroWordingTop;
  let titlePadding;
  let titleHeight;
  let titleMargin;
  let lineTop, linetMargin;
  let secondBlockWidth, secondBlockMargin;
  let initTitleMarginTop;
  let initContentsMarginTop;
  let initContentsBottom;
  let initContentsPaddingLeft;
  let arrowTop, arrowWidth, arrorLeft;

  blockHeight = <%% 400, 400, 400, 400, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 29, 29, 29, 29, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titlePadding = <%% 6, 6, 6, 6, 0.6 %%>;
  titleHeight = <%% 38, 38, 38, 38, 10 %%>;
  titleMargin = <%% 32, 32, 32, 32, 0.6 %%>;

  lineTop = <%% 18, 18, 18, 18, 0.6 %%>;
  linetMargin = <%% 20, 20, 20, 20, 0.6 %%>;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;

  zeroWordingSize = <%% 21, 21, 21, 21, 21 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  initTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  initContentsMarginTop = <%% 4, 4, 4, 4, 1 %%>;
  initContentsBottom = <%% -3, -3, -3, -3, 0 %%>;
  initContentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;

  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  wordings = this.wordings.initWordings;
  initPhoto = <%% this.wordings.initWordings.image[0], this.wordings.initWordings.image[1], this.wordings.initWordings.image[1], this.wordings.initWordings.image[1], this.wordings.initWordings.image[2] %%>;

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

  [ firstBlock, secondBlock ] = createNodes([
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? withOut(secondBlockWidth + secondBlockMargin, ea) : String(100) + '%',
        height: desktop ? String(100) + '%' : '',
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
      },
      children: [
        {
          style: {
            display: "block",
            width: String(100) + '%',
            position: "absolute",
            top: String(0),
            left: String(0),
            borderBottom: "1px dashed " + colorChip.gray3,
            height: String(lineTop) + ea,
          }
        },
        {
          text: "현장 미팅 안내",
          style: {
            display: "inline-block",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: "relative",
            fontFamily: "sandoll",
            paddingLeft: String(titlePadding) + ea,
            paddingRight: String(linetMargin) + ea,
            height: String(titleHeight) + ea,
            background: colorChip.white,
            wordSpacing: String(-2) + "px",
            color: colorChip.black
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            height: withOut(titleHeight + titleMargin, ea),
            marginTop: String(titleMargin) + ea,
            marginLeft: String(titlePadding) + ea,
            borderRadius: String(5) + "px",
            backgroundImage: "url('" + FirstMeetingJs.binaryPath + initPhoto + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        },
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-flex" : "block",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
        paddingTop: String(titleHeight + titleMargin) + ea,
        height: withOut(titleHeight + titleMargin, ea),
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
        marginLeft: String(secondBlockMargin) + ea,
        flexDirection: "column-reverse"
      },
      children: [
        {
          text: "홈리에종은 체계화된 정보과 취향 분석 기능을 활용해서 <b%고객님의 스타일과 조건에 딱 맞는 서비스를 제안%b>하고, 디자이너를 추천해드립니다.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            bottom: String(initContentsBottom) + ea,
            marginTop: String(initTitleMarginTop) + ea,
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: "서울 동대문구 장한로 99 (장안동, 양우 내안애 애플) 319호",
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            marginTop: String(initContentsMarginTop) + ea,
            lineHeight: String(1.4),
          },
        },
        {
          text: "현장 미팅 주소",
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            marginTop: String(initTitleMarginTop) + ea,
            paddingLeft: String(initContentsPaddingLeft) + ea,
            lineHeight: String(1.4),
            position: "relative",
          },
          children: [
            {
              mode: "svg",
              source: mother.returnArrow("right", colorChip.green),
              style: {
                position: "absolute",
                width: String(arrowWidth) + ea,
                left: String(arrorLeft) + ea,
                top: String(arrowTop) + ea,
              }
            },
          ]
        },
        {
          text: "2018-01-01 09:00:00 월요일",
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            marginTop: String(initContentsMarginTop) + ea,
            lineHeight: String(1.4),
          },
        },
        {
          text: "현장 미팅 시간",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            paddingLeft: String(initContentsPaddingLeft) + ea,
            lineHeight: String(1.4),
          },
          children: [
            {
              mode: "svg",
              source: mother.returnArrow("right", colorChip.green),
              style: {
                position: "absolute",
                width: String(arrowWidth) + ea,
                left: String(arrorLeft) + ea,
                top: String(arrowTop) + ea,
              }
            },
          ]
        },
        {
          text: String(0),
          style: {
            position: "absolute",
            right: String(0),
            top: String(zeroWordingTop) + ea,
            fontSize: String(zeroWordingSize) + ea,
            fontWeight: String(200),
            color: colorChip.gray3
          }
        }
      ]
    }
  ]);

}

FirstMeetingJs.prototype.insertInformationBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    noticeContents,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  } = this.tableStatic(this.designer, this.project, this.client, this.clientHistory, this.projectHistory, this.requestNumber);
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let periodLineTop;

  wordsTitle = "기본 정보";

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% 21, 21, 21, 21, 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  periodLineTop = <%% 27, 27, 27, 27, 0 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
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
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
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
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;
  tong.appendChild(mother.makeTable(matrix, { whiteMode: true, style: { width: 100 }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
  tong.firstChild.style.width = withOut(secondBlockWidth + secondBlockMargin, ea);
  tong.firstChild.style.display = "inline-block";

  createNode({
    mother: tong,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: "relative",
      width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
      height: String(tong.getBoundingClientRect().height) + ea,
      verticalAlign: "top",
      textAlign: desktop ? "" : "center",
      marginLeft: String(secondBlockMargin) + ea,
      flexDirection: "column-reverse"
    },
    children: [
      {
        text: "홈리에종은 체계화된 정보과 취향 분석 기능을 활용해서 <b%고객님의 스타일과 조건에 딱 맞는 서비스를 제안%b>하고, 디자이너를 추천해드립니다. 체계화된 정보과 취향 분석 기능을 활용해서",
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          lineHeight: String(1.6),
          bottom: String(contentsBottom) + ea,
          marginTop: String(contentsMarginTop) + ea,
        },
        bold: {
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black
        }
      },
      {
        style: {
          display: "block",
          marginTop: String(bigNumberBetween) + ea,
          position: "relative",
          textAlign: "right",
        },
        children: [
          {
            style: {
              position: "absolute",
              width: String(100) + '%',
              height: String(periodLineTop) + ea,
              top: String(0),
              left: String(0),
              borderBottom: "1px solid " + colorChip.whiteGreen,
            }
          },
          {
            text: "2021. 09. 21",
            style: {
              display: "inline-block",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.4),
              background: colorChip.white,
              paddingLeft: String(16) + ea,
              position: "relative",
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          marginTop: String(bigNumberMargin) + ea,
        },
        children: [
          {
            text: "2021. 08. 21",
            style: {
              display: "inline-block",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.4),
              position: "relative",
            }
          }
        ]
      },
      {
        text: "진행 기간",
        style: {
          display: "block",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginTop: String(bigNumberBetweenMargin) + ea,
          paddingLeft: String(contentsPaddingLeft) + ea,
          lineHeight: String(1.4),
          position: "relative",
        },
        children: [
          {
            mode: "svg",
            source: mother.returnArrow("right", colorChip.green),
            style: {
              position: "absolute",
              width: String(arrowWidth) + ea,
              left: String(arrorLeft) + ea,
              top: String(arrowTop) + ea,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          marginTop: String(bigNumberBetween) + ea,
          position: "relative",
        },
        children: [
          {
            text: "2021. 09. 21",
            style: {
              display: "inline-block",
              fontSize: String(bigNumberSize) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.green,
              lineHeight: String(1.4),
              position: "relative",
            }
          }
        ]
      },
      {
        text: "현장 미팅",
        style: {
          display: "block",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginTop: String(contentsMarginTop) + ea,
          paddingLeft: String(contentsPaddingLeft) + ea,
          lineHeight: String(1.4),
          position: "relative",
        },
        children: [
          {
            mode: "svg",
            source: mother.returnArrow("right", colorChip.green),
            style: {
              position: "absolute",
              width: String(arrowWidth) + ea,
              left: String(arrorLeft) + ea,
              top: String(arrowTop) + ea,
            }
          },
        ]
      },
    ]
  });

}

FirstMeetingJs.prototype.insertChecklistBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;

  wordsTitle = "체크리스트";
  matrix = this.cautionStatic();

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% 21, 21, 21, 21, 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  firstWidth = <%% 195, 195, 195, 195, 10 %%>;
  secondWidth = <%% 25, 25, 25, 25, 10 %%>;
  secondMarginRight = <%% 18, 18, 18, 18, 10 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
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
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
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
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: "1px solid " + colorChip.shadow,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of matrix) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? 18 : 3) + ea,
        },
        children: [
          {
            text: (num2 === 0 ? title : ""),
            style: {
              display: "inline-block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(firstWidth) + ea,
              textAlign: "left",
              color: colorChip.black,
            }
          },
          {
            text: String(num + 1),
            style: {
              display: "inline-block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(300),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(firstWidth + secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            }
          },
        ]
      });

      num++;
      num2++;
    }
  }




}

FirstMeetingJs.prototype.insertPhotoBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
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
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;

  wordsTitle = "전송된 사진";

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% 21, 21, 21, 21, 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
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
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
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
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

}

FirstMeetingJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let designers, designer;
    let requestNumber;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }


    proid = getObj.proid;
    projects = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    this.project = project;
    this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory");


    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory");

    document.querySelector("title").textContent = client.name + " 고객님 현장 미팅 안내 | 홈리에종";

    requestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }
    this.requestNumber = requestNumber;


    designers = await ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;


    this.wordings = this.meetingWordings();


    await this.mother.ghostClientLaunching({
      name: "firstMeeting",
      client: this.client,
      base: {
        instance: this,
        binaryPath: FirstMeetingJs.binaryPath,
        subTitle: (this.client.name + " 고객님 현장 미팅 안내"),
        secondBackground: false
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertInformationBox(1);
          instance.insertChecklistBox(2);
          instance.insertPhotoBox(3);
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
