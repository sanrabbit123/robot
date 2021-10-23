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
      "return ('전체 일정 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('프로젝트의 전체 일정 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "wholeSchedule",
  "route": [
    "schedule",
    "WS"
  ]
} %/%/g

const WholeScheduleJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

WholeScheduleJs.binaryPath = "/middle/schedule";

WholeScheduleJs.prototype.tableStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
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
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  };
}

WholeScheduleJs.prototype.meetingWordings = function (liteMode = false) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const colon = "&nbsp;" + ":" + "&nbsp;&nbsp;&nbsp;";
  class StyleCurationWordings {
    constructor() {
      this.wordings = {};
      this.wordings.init = {
        title: [
          "현장 미팅 안내",
        ],
        subTitle: [
          "현장 미팅 시간",
          "현장 미팅 주소"
        ],
        contents: [
          "디자이너를 직접 만나 <b%함께 현장 상태를 체크%b>하고,",
          "고객님의 <b%취향과 니즈를 전달%b>하여, 앞으로 진행하게 될",
          "홈스타일링에 대한 <b%전체적인 방향%b>을 이야기하게 됩니다.",
        ],
        image: [
          "/designerMeeting.jpg",
          "/designerMeetingb.jpg",
          "/designerMeetingc.jpg",
        ]
      };

      this.wordings.table = {};
      this.wordings.table.title = [ "기본 안내" ];
      this.wordings.table.subTitle = [
        "현장 미팅",
        "진행 기간"
      ];
      this.wordings.table.contents = [
        "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
        "디자이너가 <b%고객님을 뵙기 전, 미팅 준비를 하기 위해%b> 공유드리는 것이며,",
        "틀린 정보가 있을 시 홈리에종에 문의해주시길 바랍니다.",
      ];
      this.wordings.table.table = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber);

      this.wordings.check = {};
      this.wordings.check.title = "체크리스트";
      this.wordings.check.matrix = [
        {
          title: "디자이너가 진행할 3가지",
          contents: [
            "<u%현장 조사%u>" + colon + "현장에 대한 <b%파악과 실측이 가장 중요%b>합니다. 디자이너가 현장에 대해서 구체적으로 파악하는지 확인해주세요!",
            "<u%니즈 조사%u>" + colon + "디자이너는 고객님께서 전송해주신 정보와 사진을 바탕으로 미팅 준비를 하게 됩니다. 그리고 고객님의 <b%이야기를 최대한 들어 니즈를 파악%b>합니다.",
            "<u%컨셉 잡기%u>" + colon + "디자이너는 고객님의 이야기를 듣고만 있는 것이 아니라 현장과 정보를 바탕으로 <b%디자이너가 해줄 수 있는 말과 컨셉%b>을 잡게 됩니다.",
          ],
        },
        {
          title: "현장 조사 관련",
          contents: [
            "<u%도면 확인%u>" + colon + "현장의 <b%정확한 도면이 최대한 많을 수록%b> 좋습니다. 적절한 도면이 없을 경우, 실측을 통해 디자이너는 직접 도면을 작성합니다.",
            "<u%실측%u>" + colon + "도면이 있다고 해도 실제 상황과 다를 수 있습니다. <b%도면보다 실측이 더 중요하므로 디자이너는 반드시 실측을 진행%b>하게 됩니다.",
          ],
        },
        {
          title: "니즈 조사 관련",
          contents: [
            "<u%예산 확인%u>" + colon + "니즈와 항상 함께 알아야 할 것은 사용할 수 있는 예산입니다. 디자이너는 <b%예산에 대한 전체적인 범위 조사와 어떻게 나누어 쓸 지를 파악%b>하게 됩니다.",
            "<u%시공 조정%u>" + colon + "디자이너는 니즈와 예산의 균형, 전체적인 예산의 분배, 기존 현장의 상태와 기존 가구들을 <b%종합적으로 판단하여 시공의 범위를 조정%b>하게 됩니다.",
          ],
        },
        {
          title: "컨셉 잡기 관련",
          contents: [
            "<u%이미지 기반%u>" + colon + "추상적인 단어와 문장들로만 컨셉을 잡는 것이 아닌, <b%사진이나 이미지 등을 활용하여 구체적인 디자인 컨셉%b>을 잡게 됩니다.",
            "<u%용도 확인%u>" + colon + "디자인 컨셉과 더불어 디자이너는 고객님의 <b%라이프 스타일을 기반으로 공간 용도의 구성과 동선 계획 등을 함께 진행%b>하게 됩니다.",
          ],
        },
        {
          title: "기타 주의 사항",
          contents: [
            "<u%디자이너 변경%u>" + colon + "현장 미팅 후, 디자이너가 적합하지 않다고 판단될 시에 <b%최대 1회까지 홈리에종에 디자이너 변경을 요청%b>하실 수 있습니다.",
            "<u%진행 취소시%u>" + colon + "현장 미팅 이후 진행 자체를 취소하실 시 <b%계약금은 돌려드리지 않으며, 디자이너에게 출장비 100,000원(VAT별도)을 지급%b>합니다.",
          ]
        }
      ];

      this.wordings.photo = {};
      this.wordings.photo.title = "전송된 사진";

    }

    get initWordings() {
      return this.wordings.init;
    }

    get tableWordings() {
      return this.wordings.table;
    }

    get checkWordings() {
      return this.wordings.check;
    }

    get photoWordings() {
      return this.wordings.photo;
    }

  }
  return new StyleCurationWordings();
}

WholeScheduleJs.prototype.insertInitBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const emptyReload = (originalArr, reloadArr) => {
    if (originalArr.map((a) => { return a.trim(); }).filter((a) => { return a !== ""; }).length > 0) {
      return originalArr.join(' ');
    } else {
      return reloadArr.join(' ');
    }
  }
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
  let mobilePhotoHeight;
  let titleTextTop;

  blockHeight = <%% 400, 380, 367, 260, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 29, 28.5, 27.5, 23, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titlePadding = <%% 6, 2, 1, 0, 1 %%>;
  titleHeight = <%% 38, 38, 38, 38, 10 %%>;
  titleMargin = <%% 32, 26, 24, 12, 2 %%>;

  lineTop = <%% 18, 18, 17, 14, 0.6 %%>;
  linetMargin = <%% 20, 20, 20, 20, 0.6 %%>;

  secondBlockWidth = <%% 300, 250, 220, 200, 33 %%>;
  secondBlockMargin = <%% 36, 35, 34, 34, 2.5 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;

  zeroWordingSize = <%% 21, 21, 21, 21, 21 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  initTitleMarginTop = <%% 14, 14, 14, 14, 2.5 %%>;
  initContentsMarginTop = <%% 4, 4, 4, 4, 1 %%>;
  initContentsBottom = <%% -3, -3, -3, -3, 0 %%>;
  initContentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;

  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  wordings = this.wordings.initWordings;
  initPhoto = <%% this.wordings.initWordings.image[0], this.wordings.initWordings.image[1], this.wordings.initWordings.image[1], this.wordings.initWordings.image[1], this.wordings.initWordings.image[2] %%>;

  titleTextTop = isMac() ? 0 : 4;

  mobilePhotoHeight = 26;

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
            display: desktop ? "block" : "none",
            width: String(100) + '%',
            position: "absolute",
            top: String(0),
            left: String(0),
            borderBottom: "1px dashed " + colorChip.gray3,
            height: String(lineTop) + ea,
          }
        },
        {
          text: wordings.title.join(" "),
          style: {
            display: desktop ? "inline-block" : "block",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: "relative",
            fontFamily: "sandoll",
            paddingLeft: desktop ? String(titlePadding) + ea : "",
            paddingRight: desktop ? String(linetMargin) + ea : "",
            height: String(titleHeight) + ea,
            background: colorChip.white,
            wordSpacing: String(-2) + "px",
            color: colorChip.black,
            top: desktop ? String(titleTextTop) + ea : "",
          },
          bold: {
            fontSize: String(titleFontSize) + ea,
            color: colorChip.black,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            height: desktop ? withOut(titleHeight + titleMargin, ea) : String(mobilePhotoHeight) + ea,
            marginTop: String(titleMargin) + ea,
            marginLeft: String(titlePadding) + ea,
            width: desktop ? String(100) + '%' : withOut(titlePadding * 2, ea),
            borderRadius: String(5) + "px",
            backgroundImage: "url('" + WholeScheduleJs.binaryPath + initPhoto + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        },
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : withOut(secondBlockMargin * 2, ea),
        paddingTop: desktop ? String(titleHeight + titleMargin) + ea : String(5.5) + ea,
        height: desktop ? withOut(titleHeight + titleMargin, ea) : "",
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
        marginLeft: String(secondBlockMargin) + ea,
        flexDirection: "column-reverse"
      },
      children: [
        {
          text: wordings.contents.join(" "),
          style: {
            display: (!media[3] ? "block" : "none"),
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            bottom: String(initContentsBottom) + ea,
            marginTop: desktop ? String(initTitleMarginTop) + ea : String(5) + ea,
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            marginTop: String(initContentsMarginTop) + ea,
            lineHeight: String(1.4),
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: wordings.subTitle[1],
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: desktop ? colorChip.black : colorChip.green,
            marginTop: String(initTitleMarginTop) + ea,
            paddingLeft: String(initContentsPaddingLeft) + ea,
            lineHeight: String(1.4),
            position: "relative",
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          },
          children: [
            {
              mode: "svg",
              source: mother.returnArrow("right", colorChip.green),
              style: {
                display: desktop ? "block" : "none",
                position: "absolute",
                width: String(arrowWidth) + ea,
                left: String(arrorLeft) + ea,
                top: String(arrowTop) + ea,
              }
            },
          ]
        },
        {
          text: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
          style: {
            display: "block",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            marginTop: String(initContentsMarginTop) + ea,
            lineHeight: String(1.4),
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: wordings.subTitle[0],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: desktop ? colorChip.black : colorChip.green,
            paddingLeft: String(initContentsPaddingLeft) + ea,
            lineHeight: String(1.4),
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          },
          children: [
            {
              mode: "svg",
              source: mother.returnArrow("right", colorChip.green),
              style: {
                display: desktop ? "block" : "none",
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
            display: desktop ? "block" : "none",
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

WholeScheduleJs.prototype.insertScheduleBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, project, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const wordings = this.wordings.tableWordings;
  const {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  } = wordings.table;
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
  let bigDesktop;
  let calendar;
  let mobileCalendarMargin, mobileCalendarMarginTop;
  let mobilePaddingTop, mobilePaddingBottom;
  let periodPaddingLeft;
  let periodLineWidth;

  bigDesktop = (media[0] || media[1]);

  wordsTitle = wordings.title.join(" ");

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), 0 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 250, 220, 200, 33 %%>;
  secondBlockMargin = <%% 36, 35, 34, 34, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), (isMac() ? 6 : 4), 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 34, 30, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 2 %%>;

  periodLineTop = <%% 27, 27, 27, 27, 3.8 %%>;
  periodPaddingLeft = <%% 16, 16, 16, 16, 7 %%>;
  periodLineWidth = <%% 4, 4, 4, 4, 4 %%>;

  mobileCalendarMargin = 6;
  mobileCalendarMarginTop = 6.5;
  mobilePaddingTop = 5;
  mobilePaddingBottom = 10.5;

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
              color: colorChip.black,
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
              color: desktop ? colorChip.black : colorChip.green,
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
  calendar = tong.firstChild;

  if (desktop) {
    calendar.style.width = bigDesktop ? withOut(secondBlockWidth + secondBlockMargin, ea) : String(100) + '%';
    calendar.style.display = bigDesktop ? "inline-block" : "block";
  } else {
    calendar.style.width = withOut(mobileCalendarMargin * 2, ea);
    calendar.style.marginLeft = String(mobileCalendarMargin) + ea;
    tong.style.paddingTop = String(mobileCalendarMarginTop) + ea;
    calendar.style.display = "block";
  }

  if (bigDesktop || mobile) {
    createNode({
      mother: tong,
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : withOut(mobileCalendarMargin * 2, ea),
        height: desktop ? String(tong.getBoundingClientRect().height) + ea : "",
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
        marginLeft: desktop ? String(secondBlockMargin) + ea : String(mobileCalendarMargin) + ea,
        flexDirection: "column-reverse",
        paddingTop: desktop ? "" : String(mobilePaddingTop) + ea,
        paddingBottom: desktop ? "" : String(mobilePaddingBottom) + ea,
      },
      children: [
        {
          text: wordings.contents.join(" "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            bottom: String(contentsBottom) + ea,
            marginTop: String(desktop ? contentsMarginTop : mobilePaddingTop) + ea,
          },
          bold: {
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          style: {
            display: desktop ? "block" : "none",
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
              text: dateToString(project.process.contract.form.date.to).replace(/-/g, ". "),
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
            textAlign: desktop ? "left" : "center",
            marginTop: String(bigNumberMargin) + ea,
          },
          children: [
            {
              text: dateToString(project.process.contract.form.date.from).replace(/-/g, ". "),
              style: {
                display: "inline-block",
                fontSize: String(bigNumberSize) + ea,
                fontWeight: String(200),
                fontFamily: "graphik",
                color: colorChip.green,
                lineHeight: String(1.4),
                position: "relative",
              }
            },
            {
              text: dateToString(project.process.contract.form.date.to).replace(/-/g, ". "),
              style: {
                display: mobile ? "inline-block" : "none",
                fontSize: String(bigNumberSize) + ea,
                fontWeight: String(200),
                fontFamily: "graphik",
                color: colorChip.green,
                lineHeight: String(1.4),
                background: colorChip.white,
                paddingLeft: String(periodPaddingLeft) + ea,
                position: "relative",
              }
            },
            {
              style: {
                display: mobile ? "block" : "none",
                position: "absolute",
                width: desktop ? String(100) + '%' : String(periodLineWidth) + ea,
                height: String(periodLineTop) + ea,
                top: String(0),
                left: desktop ? String(0) : withOut(50, periodLineWidth / 2, ea),
                borderBottom: "1px solid " + colorChip.whiteGreen,
              }
            },
          ]
        },
        {
          text: wordings.subTitle[1],
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
                display: desktop ? "block" : "none",
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
              text: dateToString(project.process.contract.meeting.date).replace(/-/g, ". "),
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
          text: wordings.subTitle[0],
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
                display: desktop ? "block" : "none",
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

}

WholeScheduleJs.prototype.insertChecklistBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
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
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;

  wordings = this.wordings.checkWordings;
  wordsTitle = wordings.title;
  matrix = wordings.matrix;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

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

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 25, 25, 25, 25, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 1.5 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7.5 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.9 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 1 %%>;
  contentsMarginBottom1 = <%% 18, 18, 18, 18, 1 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

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
              color: colorChip.black,
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
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(10.5) + ea,
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
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
            style: {
              display: desktop ? "inline-block" : "block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              textAlign: "left",
              color: colorChip.black,
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
            children: [
              {
                mode: "svg",
                source: this.mother.returnCheckBox(colorChip.green),
                style: {
                  position: "relative",
                  top: String(checkBoxTop) + ea,
                  width: String(checkBoxWidth) + ea,
                  verticalAlign: "top",
                }
              }
            ]
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

WholeScheduleJs.prototype.insertPhotoBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const cliid = this.client.cliid;
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
  let images;
  let obj;
  let curation;
  let columnsLength;
  let positionArr;
  let imageMargin;
  let tempArr, tempArr2;
  let tempImage;
  let wordings;

  wordings = this.wordings.photoWordings;
  wordsTitle = wordings.title;

  bottomMargin = <%% 160, 160, 160, 120, 30 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 68, 68, 68, 68, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% 26, 26, 26, 26, 6 %%>;
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

  columnsLength = <%% 4, 4, 3, 3, 2 %%>;
  imageMargin = <%% 8, 8, 8, 6, 1 %%>;

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
              color: colorChip.black,
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
              color: desktop ? colorChip.black : colorChip.green,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: desktop ? "" : String(1) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  images = [];

}

WholeScheduleJs.prototype.launching = async function (loading) {
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

    document.querySelector("title").textContent = client.name + " 고객님 전체 일정 안내 | 홈리에종";

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
      name: "wholeSchedule",
      client: this.client,
      base: {
        instance: this,
        binaryPath: WholeScheduleJs.binaryPath,
        subTitle: (this.client.name + " 고객님 전체 일정 안내"),
        secondBackground: false
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertScheduleBox(1);
          instance.insertPhotoBox(2);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "WholeScheduleJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });


    // instance.insertChecklistBox(2);

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "WholeScheduleJs.launching : " + e.message }, "/errorLog");
  }
}
