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

FirstMeetingJs.prototype.meetingWordings = function (service) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const colon = "&nbsp;" + ":" + "&nbsp;&nbsp;&nbsp;";
  class StyleCurationWordings {
    constructor() {
      let tempObj;

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
          "디자이너를 직접 만나 함께 <b%현장 상태를 확인%b>하고,",
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
        "입주 예정",
        "예상 기간"
      ];
      this.wordings.table.contents = [
        "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
        "디자이너가 고객님을 뵙기 전에 미팅을 준비하면서 확인하는 사전 정보이며,",
        "<b%잘못된 정보가 있을 시%b> 홈리에종에 말씀해주시길 바랍니다.",
      ];
      this.wordings.table.table = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.requestNumber);

      this.wordings.check = {};
      this.wordings.check.title = [ "체크리스트" ];
      this.wordings.check.matrix = [];
      for (let { title, children } of service.setting.contents.checklist) {
        tempObj = {};
        tempObj.title = title;
        tempObj.contents = [];
        for (let obj of children) {
          tempObj.contents.push(`<u%${obj.title}%u>${colon}${obj.contents}`);
        }
        this.wordings.check.matrix.push(tempObj);
      }

      this.wordings.photo = {};
      this.wordings.photo.title = [ "전송된 사진" ];

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

FirstMeetingJs.prototype.insertInitBox = function () {
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

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;

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
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : withOut(secondBlockMargin * 2, ea),
        paddingTop: desktop ? String(titleHeight + titleMargin) + ea : String(6) + ea,
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

FirstMeetingJs.prototype.insertInformationBox = function (indexNumber) {
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
          borderRadius: mobile ? String(1) + ea : "",
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
      ]
    });
  }

}

FirstMeetingJs.prototype.insertChecklistBox = function (indexNumber) {
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
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;

  wordings = this.wordings.checkWordings;
  wordsTitle = wordings.title[0];
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
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

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
          borderRadius: mobile ? String(1) + ea : "",
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
            text: (num2 === 0 ? (num === 0 ? ">" : String(num)) : ""),
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
            text: (num2 === 0 ? (desktop ? title : "<b%" + (num === 0 ? ">" : String(num)) + "%b>" + blank + title) : ""),
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
                source: (num !== 0 ? this.mother.returnCheckBox(colorChip.green) : this.mother.returnArrow("right", colorChip.green)),
                style: {
                  position: "relative",
                  top: String(num !== 0 ? checkBoxTop : arrowBoxTop) + ea,
                  width: String(num !== 0 ? checkBoxWidth : arrowBoxWidth) + ea,
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
              color: num === 0 ? colorChip.black : colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

FirstMeetingJs.prototype.insertPhotoBox = function (indexNumber) {
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
  wordsTitle = wordings.title[0];

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
  ajaxJson({
    cliid
  }, "/ghostPass_clientPhoto").then((obj) => {
    images = images.concat(obj.sitePhoto);
    images = images.concat(obj.preferredPhoto);
    return ajaxJson({
      idArr: [ cliid ],
      method: "client",
      property: "curation",
    }, "/getHistoryProperty");
  }).then((raw) => {
    if (typeof raw !== "object" || Array.isArray(raw)) {
      throw new Error("결과 없음");
    }
    obj = raw;
    return ajaxJson({
      images: obj[cliid].image
    }, "/ghostPass_photoParsing");
  }).then((raw) => {
    curation = obj[cliid];
    images = curation.image.map((image) => {
      const imageLink = "/corePortfolio/listImage";
      const pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
      return "https://" + GHOSTHOST + imageLink + "/" + pid + "/" + image;
    }).concat(images);

    positionArr = [];
    for (let i = 0; i < columnsLength; i++) {
      positionArr.push(createNode({
        mother: tong,
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(100% - " + String(imageMargin * (columnsLength - 1)) + ea + ") / " + String(columnsLength) + ")",
          height: "auto",
          marginRight: String(i === columnsLength - 1 ? 0 : imageMargin) + ea,
          verticalAlign: "top",
        }
      }));
    }

    num = 0;
    num2 = 0;
    tempArr = [];
    for (let image of images) {
      tempImage = createNode({
        mother: tong,
        mode: "img",
        attribute: [
          { src: image },
          { index: String(num) },
          { method: /sitePhoto/g.test(image) ? "site" : (/preferredPhoto/g.test(image) ? "preferred" : "selected") },
          { length: String(images.length) }
        ],
        style: {
          position: "relative",
          display: "inline-block",
          width: String(100) + '%',
          height: "auto",
          marginBottom: String(imageMargin) + ea,
          borderRadius: String(3) + "px",
          verticalAlign: "top",
          cursor: "pointer",
        }
      });
      if (desktop) {
        tempImage.addEventListener("click", function (e) {
          e.stopPropagation();
          const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
          const totalImages = equalJson(JSON.stringify(images));
          const mother = document.getElementById("totalcontents");
          const className = "photoSelectedTarget";
          const length = Number(this.getAttribute("length"));
          const zIndex = 2;
          const wordDictionary = {
            selected: "고객님이 선택한 사진",
            site: "고객님이 보낸 현장",
            preferred: "고객님의 선호 사진"
          };
          let img, height, imgBox;
          let title, titleSize, bottom;
          let titleBox;
          let leftArrow, rightArrow;
          let leftArrowBox, rightArrowBox;
          let arrowHeight;
          let arrowMargin;
          let index, method, src;
          let convertEvent;

          index = Number(this.getAttribute("index"));
          method = this.getAttribute("method");
          src = this.getAttribute("src");

          convertEvent = () => {};

          height = 78;
          titleSize = 2;
          bottom = 6.6;
          arrowHeight = 1.7;
          arrowMargin = 78;

          createNode({
            mother,
            class: [ className ],
            events: [
              {
                type: "click",
                event: function (e) {
                  const removeTargets = document.querySelectorAll('.' + className);
                  for (let dom of removeTargets) {
                    mother.removeChild(dom);
                  }
                }
              }
            ],
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              background: colorChip.darkDarkShadow,
              zIndex: String(zIndex),
              animation: "justfadeineight 0.2s ease forwards",
            }
          });

          img = createNode({
            mother,
            class: [ className ],
            mode: "img",
            attribute: [
              { src },
              { direction: "right" }
            ],
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              height: String(height) + '%',
              width: "auto",
              zIndex: String(zIndex),
              transition: "all 0s ease",
              animation: "fadeuplite 0.2s ease forwards",
              borderRadius: String(3) + "px",
            }
          });
          imgBox = img.getBoundingClientRect();
          img.style.top = withOut(50, imgBox.height / 2, ea);
          img.style.left = withOut(50, imgBox.width / 2, ea);

          title = createNode({
            mother,
            events: [
              {
                type: [ "click", "dblclick", "selectstart" ],
                event: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }
            ],
            class: [ className ],
            text: wordDictionary[method],
            style: {
              position: "fixed",
              bottom: String(bottom) + '%',
              fontSize: String(titleSize) + "vh",
              fontWeight: String(600),
              color: colorChip.whiteBlack,
              left: String(50) + '%',
              zIndex: String(zIndex),
              transition: "all 0s ease",
              animation: "fadeuplite 0.2s ease forwards",
            }
          });
          titleBox = title.getBoundingClientRect();
          title.style.left = withOut(50, titleBox.width / 2, ea);

          leftArrow = createNode({
            mother,
            events: [
              {
                type: [ "dblclick", "selectstart" ],
                event: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }
            ],
            attribute: [
              { direction: "left" }
            ],
            class: [ className ],
            mode: "svg",
            source: instance.mother.returnArrow("left", colorChip.whiteBlack),
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              height: String(arrowHeight) + "vh",
              zIndex: String(zIndex),
              transition: "all 0s ease",
              animation: "fadeuplite 0.2s ease forwards",
              cursor: "pointer"
            }
          });
          leftArrowBox = leftArrow.getBoundingClientRect();
          leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
          leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

          rightArrow = createNode({
            mother,
            events: [
              {
                type: [ "dblclick", "selectstart" ],
                event: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }
            ],
            attribute: [
              { direction: "right" }
            ],
            class: [ className ],
            mode: "svg",
            source: instance.mother.returnArrow("right", colorChip.whiteBlack),
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              height: String(arrowHeight) + "vh",
              zIndex: String(zIndex),
              transition: "all 0s ease",
              animation: "fadeuplite 0.2s ease forwards",
              cursor: "pointer"
            }
          });
          rightArrowBox = rightArrow.getBoundingClientRect();
          rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
          rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

          convertEvent = function (e) {
            e.stopPropagation();
            e.preventDefault();
            const direction = this.getAttribute("direction");
            let targetIndex, targetImage;
            if (direction === "left") {
              targetIndex = index - 1;
              if (totalImages[targetIndex] === undefined) {
                targetIndex = length - 1;
              }
            } else {
              targetIndex = index + 1;
              if (totalImages[targetIndex] === undefined) {
                targetIndex = 0;
              }
            }
            targetImage = totalImages[targetIndex];
            img.setAttribute("src", targetImage);
            imgBox = img.getBoundingClientRect();
            img.style.left = withOut(50, imgBox.width / 2, ea);
            leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
            rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

            index = targetIndex;
            src = targetImage;
            method = /sitePhoto/g.test(targetImage) ? "site" : (/preferredPhoto/g.test(targetImage) ? "preferred" : "selected");

            title.textContent = wordDictionary[method];
            titleBox = title.getBoundingClientRect();
            title.style.left = withOut(50, titleBox.width / 2, ea);
          }
          leftArrow.addEventListener("click", convertEvent);
          rightArrow.addEventListener("click", convertEvent);
          img.addEventListener("click", convertEvent);
        });
      }
      tong.style.height = "auto";
      tempArr.push(tempImage);
      if (tempArr.length === columnsLength) {
        positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
        tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
        for (let i = 0; i < tempArr.length; i++) {
          positionArr[i].appendChild(tempArr[i]);
        }
        tempArr = [];
        num2 = -1;
      }
      num++;
      num2++;
    }

    positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
    tempArr.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
    for (let i = 0; i < tempArr.length; i++) {
      positionArr[i].appendChild(tempArr[i]);
    }

  }).catch((err) => {
    GeneralJs.ajaxJson({ message: "FirstMeetingJs.insertPhotoBox : " + err.message }, "/errorLog").catch((e) => {});
  });

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
    let service;

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

    service = await ajaxJson({ key: "firstMeeting" }, "/getServiceByKey", { equal: true });
    this.wordings = this.meetingWordings(service);

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
          await GeneralJs.ajaxJson({ message: "FirstMeetingJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "FirstMeetingJs.launching : " + e.message }, "/errorLog");
  }
}
