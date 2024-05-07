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
      "return ('디자이너 상세 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 협업 디자이너 상세 내용 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerDetail",
  "hangul": "디자이너 상세",
  "route": [
    "designerDetail",
    "DD"
  ]
} %/%/g

const DesignerDetailJs = function () {
  this.mother = new GeneralJs();
}

DesignerDetailJs.binaryPath = FRONTHOST + "/middle/designer";

DesignerDetailJs.prototype.generateGsArray = function (number) {
  if (typeof number !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const standard = [
    'g', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
    's', 's', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
  ];
  let additional;
  let add;
  let multi;
  let result;
  additional = number % standard.length;
  add = standard.slice(0, additional);
  multi = Math.floor(number / standard.length);
  result = [];
  for (let i = 0; i < multi; i++) {
    result = result.concat(JSON.parse(JSON.stringify(standard)));
  }
  result = result.concat(add);
  return result;
}

DesignerDetailJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const toggleTargetClassName = "toggleTargetClassName";
  const toggleTargetClassName2 = "toggleTargetClassName2";
  const circleClassName = "circleClassName";
  const circleBaseClassName = "circleBaseClassName";
  const touchStartConst = "toggleTouchStartConstName";
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
  let buttonSize;
  let buttonWeight;
  let buttonBetween;
  let buttonTongWidth;
  let buttonWidth;
  let buttonHeight;
  let buttonTextTop;
  let buttonLeft;
  let circleWidth;
  let tabletVisualBottom;
  let mobileButtonTongMarginTop;
  let mobileButtonBetween;
  let contentsPaddingTop;
  let sortBoxRight;
  let mobileBackgroundHeight;
  let mobileVisualPaddingLeft;
  let tagBoxRight;
  let designerDetailToggleEvent;
  let mobileSearchWhiteBoxPaddingTop;
  let mobileSearchWhiteBoxPaddingBottom;
  let mobileSearchWhiteBoxMarginBottom;
  let titleBoxRowTong;
  let blackTitleMarginLeft;
  let blackTitleTextTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 40, 38, 35, 30, 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 26, 23, 22, 19, 5 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 15, 15, 14, 13, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13.5, 13.5, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 50, 50, 50, 40, 20 %%>;
  searchBarHeight = <%% 36, 36, 36, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 595, 476, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 0, 0, 0, 0, 2 %%>;
  searchIconTop = <%% 8, 8, 8, 8, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 14, 14, 14, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.1 %%>;
  subTitleFontSize = <%% 21, 19, 18, 16, 3.4 %%>;
  subTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "DESIGNER DETAIL<b%.%b>";
  subTitleContents = "디자이너 디테일";

  mobileBlockTop = 7;

  mobileSearchWhiteBoxPaddingTop = 4;
  mobileSearchWhiteBoxPaddingBottom = 7;
  mobileSearchWhiteBoxMarginBottom = 5;

  placeholder = "새아파트";

  buttonSize = <%% 13, 13, 13, 13, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 1, 1, 1, 1, 2 %%>;

  buttonTongWidth = <%% 65, 65, 60, 60, 90 %%>;

  buttonWidth = <%% 26, 26, 26, 24, 5.6 %%>;
  buttonHeight = <%% 12, 12, 12, 12, 3 %%>;
  buttonTextTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isIphone() ? 1.3 : 1) %%>;
  buttonLeft = <%% -34, -34, -34, -31, -7 %%>;
  circleWidth = <%% 8, 8, 8, 8, 2 %%>;

  tabletVisualBottom = 4;
  mobileButtonTongMarginTop = 3;
  mobileButtonBetween = 10;
  contentsPaddingTop = <%% 16, 16, 16, 0, 1 %%>;

  sortBoxRight = <%% 0, 0, 0, 0, 20 %%>;

  mobileBackgroundHeight = 58;
  mobileVisualPaddingLeft = 6;

  tagBoxRight = <%% 132, 128, 100, 100, 10 %%>;

  serviceButtonClassName = "serviceButton";

  blackTitleMarginLeft = <%% 12, 11, 8, 7, 1 %%>;
  blackTitleTextTop = <%% (isMac() ? -2 : 0.5), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0.5), (isIphone() ? -0.7 : -0.1) %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
    }
  });

  titleBoxRowTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      flexDirection: desktop ? "row" : "column",
      justifyContent: "start",
      alignItems: "start",
    }
  })

  // title and sub title
  createNode({
    mother: titleBoxRowTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
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
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorExtended.mainBlue,
          wordSpacing: String(2) + "px",
        },
        bold: {
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorExtended.mainBlue,
          opacity: String(0.4),
        }
      }
    ]
  });
  createNode({
    mother: titleBoxRowTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: desktop ? "<u%|%u>&nbsp;&nbsp;&nbsp;" + subTitleContents : subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(subTitleFontSize) + ea,
          fontFamily: "pretendard",
          fontWeight: String(subTitleWeight),
          color: colorChip.black,
          marginLeft: desktop ? String(blackTitleMarginLeft) + ea : "",
          top: String(blackTitleTextTop) + ea,
        },
        under: {
          fontSize: String(subTitleFontSize) + ea,
          fontFamily: "pretendard",
          color: colorChip.deactive,
          fontWeight: String(400),
        },
      }
    ]
  });

  this.designerTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      width: withOut(0, ea),
    }
  });

  this.designerBlock(null);
}

DesignerDetailJs.prototype.designerBlock = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, selfHref } = GeneralJs;
  const { ea, media } = this;
  const { designers, designerTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const toggleTargetClassName = "toggleTargetClassName";
  const circleClassName = "circleClassName";
  const circleBaseClassName = "circleBaseClassName";
  const touchStartConst = "toggleTouchStartConstName";
  let targets;
  let tong;
  let block;
  let tongPaddingLeft;
  let blockMargin;
  let columns;
  let src;
  let blockHeight;
  let photoWidth;
  let photoMargin;
  let contentsPaddingTop;
  let contentsBlock;
  let titleSize, titleWeight;
  let careerSize, careerWeight;
  let careerTextTop;
  let careerBetween;
  let grayBarTop, grayBarBottom;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let buttonHeight, buttonSize, buttonWeight;
  let buttonTextTop;
  let buttonWidth, buttonWidth0;
  let buttonBetween;
  let buttonTongWidth;
  let buttonLeft;
  let circleWidth;
  let designerDetailToggleEvent;
  let tabletVisualBottom;
  let mobileButtonTongMarginTop;
  let mobileButtonBetween;
  let descriptionMinus;
  let searchBarPaddingTop;
  let detailNameBoxPaddingTop;
  let detailNameBoxPaddingBottom;

  tongPaddingLeft = <%% 75, 75, 65, 60, 6.5 %%>;
  blockMargin = <%% 0, 0, 0, 0, 0 %%>;
  columns = 1;
  contentsPaddingTop = <%% (isMac() ? 19 : 18), (isMac() ? 21 : 19), (isMac() ? 16 : 15), 0, 1 %%>;

  blockHeight = <%% (isMac() ? 206 : 203), (isMac() ? 206 : 203), (isMac() ? 192 : 190), (isMac() ? 192 : 190), 32 %%>;
  photoWidth = blockHeight - (contentsPaddingTop * 2);

  photoMargin = <%% 32, 32, 32, 32, 4 %%>;

  searchBarPaddingTop = <%% 50, 160, 115, 85, 20 %%>;
  detailNameBoxPaddingTop = <%% 36, 36, 36, 36, 8 %%>;
  detailNameBoxPaddingBottom = <%% 12, 12, 12, 12, 8 %%>;

  titleSize = <%% 30, 28, 28, 28, 4.5 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;

  careerSize = <%% 13, 13, 13, 13, 2.5 %%>;
  careerWeight = <%% 500, 500, 500, 500, 500 %%>;
  careerTextTop = <%% 0, 0, 0, 0, 0 %%>;

  careerBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  grayBarTop = <%% 8, 8, 8, 8, 2 %%>;
  grayBarBottom = <%% 18, 18, 18, 18, 2 %%>;

  descriptionSize = <%% 15, 15, 14, 14, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.55 %%>;

  buttonSize = <%% 15, 15, 14, 14, 3.2 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 3, 3, 3, 3, 3 %%>;

  buttonTongWidth = <%% 97, 97, 97, 97, 95 %%>;

  buttonWidth = <%% 28, 28, 28, 28, 5.6 %%>;
  buttonHeight = <%% 14, 14, 14, 14, 3 %%>;
  buttonTextTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isIphone() ? 1.3 : 1) %%>;
  buttonLeft = <%% -36, -36, -36, -36, -7 %%>;
  circleWidth = <%% 10, 10, 10, 10, 2 %%>;

  descriptionMinus = <%% 200, 180, 160, 160, 0 %%>;

  tabletVisualBottom = 4;
  mobileButtonTongMarginTop = 3;
  mobileButtonBetween = 10.5;

  designerDetailToggleEvent = function (e) {
    const toggle = this.getAttribute("toggle");
    const mode = this.getAttribute("mode");
    const targets = [ ...document.querySelectorAll('.' + toggleTargetClassName) ];
    const thisTarget = targets.find((dom) => { return dom.getAttribute("mode") === mode });
    const oppositeTarget = targets.find((dom) => { return dom.getAttribute("mode") !== mode });
    const thisCircleBase = thisTarget.querySelector('.' + circleBaseClassName);
    const thisCircle = thisTarget.querySelector('.' + circleClassName);
    const oppositeCircleBase = oppositeTarget.querySelector('.' + circleBaseClassName);
    const oppositeCircle = oppositeTarget.querySelector('.' + circleClassName);

    homeliaisonAnalytics({
      page: instance.pageName,
      standard: instance.firstPageViewTime,
      action: "viewToggle",
      data: {
        mode: mode,
        toggle: toggle,
        date: dateToString(new Date(), true),
      },
    }).catch((err) => {
      console.log(err);
    });

    if (toggle === "off") {

      thisTarget.style.color = colorExtended.mainBlue;
      thisCircleBase.style.background = colorExtended.mainBlue;
      thisCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
      thisTarget.setAttribute("toggle", "on");

      oppositeTarget.style.color = colorExtended.deactive;
      oppositeCircleBase.style.background = colorExtended.gray5;
      oppositeCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
      oppositeTarget.setAttribute("toggle", "off");

      if (mode === "portfolio") {
        instance.portfolioBlock();
      } else {
        instance.portfolioPhoto();
      }

    } else {

      thisTarget.style.color = colorExtended.deactive;
      thisCircleBase.style.background = colorExtended.gray5;
      thisCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
      thisTarget.setAttribute("toggle", "off");

      oppositeTarget.style.color = colorExtended.mainBlue;
      oppositeCircleBase.style.background = colorExtended.mainBlue;
      oppositeCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
      oppositeTarget.setAttribute("toggle", "on");

      if (mode === "portfolio") {
        instance.portfolioPhoto();
      } else {
        instance.portfolioBlock();
      }

    }
  }

  cleanChildren(designerTong);

  targets = designers;

  tong = createNode({
    mother: designerTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(detailNameBoxPaddingTop) + ea,
      paddingBottom: String(detailNameBoxPaddingBottom) + ea,
      borderBottom: mobile ? "1px solid " + colorExtended.black : "",
      marginBottom: mobile ? String(10) + ea : "",
    }
  });

  for (let designer of targets) {

    if (desktop) {
      src = FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    } else {
      src = FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/mobile/mo" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    }

    block = createNode({
      mother: tong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(columns * blockMargin) + ea + ") / " + String(columns) + ")",
        height: desktop ? (media[3] ? "" : String(blockHeight) + ea) : "",
        marginRight: desktop ? String(blockMargin) + ea : "",
      },
      children: [
        {
          style: {
            display: desktop ? (media[3] ? "none" : "inline-block") : "block",
            position: "relative",
            top: String(contentsPaddingTop) + ea,
            borderRadius: desktop ? String(12) + "px" : String(12) + "px",
            width: desktop ? String(photoWidth) + ea : String(100) + '%',
            height: String(photoWidth) + ea,
            backgroundSize: desktop ? "auto 100%" : "100% auto",
            backgroundPosition: "50% 50%",
            backgroundImage: "url('" + src + "')",
            verticalAlign: "top",
            marginBottom: desktop ? "" : String(4) + ea,
          }
        },
        {
          style: {
            display: desktop ? "inline-block" : "block",
            position: "relative",
            width: desktop ? (media[3] ? withOut(0) : withOut(photoWidth + photoMargin, ea)) : withOut(0),
            marginLeft: desktop ? String(media[3] ? 0 : photoMargin) + ea : "",
            paddingTop: String(contentsPaddingTop) + ea,
            paddingBottom: String(contentsPaddingTop) + ea,
            height: withOut(contentsPaddingTop * 2, ea),
            verticalAlign: "top",
          }
        }
      ]
    });

    contentsBlock = block.children[1];

    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        position: "relative",
      },
      children: [
        {
          text: designer.designer,
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            fontFamily: "pretendard",
            color: colorChip.black,
            marginRight: String(careerBetween) + ea,
          }
        },
        {
          text: designerCareer(designer, true),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(careerSize) + ea,
            fontWeight: String(careerWeight),
            color: colorExtended.mainBlue,
            fontFamily: "pretendard",
            top: String(careerTextTop) + ea,
          },
          bold: {
            fontSize: String(careerSize) + ea,
            fontWeight: String(careerWeight),
            color: colorChip.deactive,
          }
        },
      ]
    });

    createNode({
      mother: contentsBlock,
      style: {
        display: desktop ? "block" : "none",
        width: String(100) + '%',
        height: String(grayBarTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      }
    });

    createNode({
      mother: contentsBlock,
      text: desktop ? designer.setting.front.introduction.desktop.join("\n") : designer.setting.front.introduction.mobile.join(" "),
      style: {
        display: "block",
        position: "relative",
        width: withOut(descriptionMinus, ea),
        marginTop: String(grayBarBottom) + ea,
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        fontFamily: "pretendard",
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
      }
    });

    createNode({
      mother: contentsBlock,
      style: {
        display: desktop ? "inline-flex" : "none",
        flexDirection: desktop ? "column" : "row",
        position: desktop ? "absolute" : "relative",
        width: desktop ? String(buttonTongWidth) + ea : "",
        bottom: desktop ? String(media[3] ? tabletVisualBottom : contentsPaddingTop) + ea : "",
        marginTop: desktop ? "" : String(mobileButtonTongMarginTop) + ea,
        right: String(0),
        justifyContent: desktop ? "left" : "right",
        alignItems: "start",
        textAlign: "left",
      },
      children: [
        {
          class: [ toggleTargetClassName ],
          attribute: {
            toggle: "on",
            mode: "portfolio",
          },
          event: {
            click: designerDetailToggleEvent,
            touchstart: function (e) {
              const self = this;
              self.setAttribute(touchStartConst, "on");
              setQueue(() => {
                self.setAttribute(touchStartConst, "off");
              });
            },
            touchend: function (e) {
              if (this.getAttribute(touchStartConst) === "on") {
                designerDetailToggleEvent.call(this, e);
              }
            }
          },
          text: "포트폴리오 보기",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(buttonWeight),
            fontFamily: "pretendard",
            color: colorExtended.mainBlue,
            cursor: "pointer",
            transition: "all 0.5s ease",
          },
          children: [
            {
              class: [ circleBaseClassName ],
              style: {
                position: "absolute",
                width: String(buttonWidth) + ea,
                height: String(buttonHeight) + ea,
                background: colorExtended.mainBlue,
                top: String(buttonTextTop) + ea,
                left: String(buttonLeft) + ea,
                borderRadius: String(buttonHeight) + ea,
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0),
                    height: withOut(0),
                  },
                  children: [
                    {
                      class: [ circleClassName ],
                      style: {
                        display: "inline-block",
                        width: String(circleWidth) + ea,
                        height: String(circleWidth) + ea,
                        borderRadius: String(circleWidth) + ea,
                        top: String((buttonHeight - circleWidth) / 2) + ea,
                        left: String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea,
                        background: colorChip.white,
                        position: "absolute",
                        transition: "all 0.5s ease",
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          class: [ toggleTargetClassName ],
          attribute: {
            toggle: "off",
            mode: "photo",
          },
          event: {
            click: designerDetailToggleEvent,
            touchstart: function (e) {
              const self = this;
              self.setAttribute(touchStartConst, "on");
              setQueue(() => {
                self.setAttribute(touchStartConst, "off");
              });
            },
            touchend: function (e) {
              if (this.getAttribute(touchStartConst) === "on") {
                designerDetailToggleEvent.call(this, e);
              }
            }
          },
          text: "사진만 보기",
          style: {
            marginTop: desktop ? String(buttonBetween) + ea : '',
            marginLeft: desktop ? '' : String(mobileButtonBetween) + ea,
            display: "inline-block",
            position: "relative",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(buttonWeight),
            fontFamily: "pretendard",
            color: colorChip.deactive,
            cursor: "pointer",
            transition: "all 0.5s ease",
          },
          children: [
            {
              class: [ circleBaseClassName ],
              style: {
                position: "absolute",
                width: String(buttonWidth) + ea,
                height: String(buttonHeight) + ea,
                background: colorChip.gray5,
                top: String(buttonTextTop) + ea,
                left: String(buttonLeft) + ea,
                borderRadius: String(buttonHeight) + ea,
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0),
                    height: withOut(0),
                  },
                  children: [
                    {
                      class: [ circleClassName ],
                      style: {
                        display: "inline-block",
                        width: String(circleWidth) + ea,
                        height: String(circleWidth) + ea,
                        borderRadius: String(circleWidth) + ea,
                        top: String((buttonHeight - circleWidth) / 2) + ea,
                        left: String((buttonHeight - circleWidth) / 2) + ea,
                        background: colorChip.white,
                        position: "absolute",
                        transition: "all 0.5s ease",
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    });

  }

}

DesignerDetailJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseBlock;
  let photoMargin;
  let paddingBottom;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  paddingBottom = <%% 120, 120, 110, 90, 20 %%>;

  baseBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingBottom: String(paddingBottom) + ea,
    }
  });

  this.portfolioBlock();
}

DesignerDetailJs.prototype.portfolioBlock = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { contentsArr, designers } = this;
  let baseBlock;
  let gsArray;
  let baseWidth;
  let photoMargin;
  let columns;
  let seroWidth, garoWidth;
  let photoRatio;
  let photoHeight;
  let src;
  let contents;
  let title;
  let quoteWidth, quoteHeight;
  let quoteTop;
  let photoMarginBottom;
  let titleSize, titleWeight, titleMarginLeft;
  let tag;
  let block;
  let tagTong;
  let photoBlockMarginBottom;
  let garoSliceStart, garoSliceEnd, garoSliceLimit;
  let seroSliceStart, seroSliceEnd, seroSliceLimit;
  let tagTongMarginTop, tagTongWidthRatio;
  let tagSize, tagWeight;
  let tagPaddingLeft, tagPaddingTop, tagPaddingBottom;
  let tagMarginRight;
  let titleSubSize;
  let subTitle;
  let titleSubMarginTop;
  let service;
  let tagBlock;
  let subInfoSize;
  let subInfoWeight;
  let arrowWidth;
  let arrowHeight;
  let arrowBottom;
  let arrowReviewBottom;
  let subInfoTextTop;
  let limitLength;
  let radiusPixel;

  contentsArr = contentsArr;

  limitLength = contentsArr.length;

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 12, 11, 10, 9, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% 14, 14, 13, 12, 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 20, 17, 17, 15, 3.4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 3, 2, 2, 1, (isIphone() ? 0 : 0.3) %%>;

  photoBlockMarginBottom = <%% 64, 56, 48, 40, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongMarginTop = <%% (isMac() ? 11 : 10), (isMac() ? 11 : 10), (isMac() ? 10 : 9), (isMac() ? 8 : 7), 1.3 %%>;
  tagTongWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  subInfoSize = <%% 12, 11, 11, 10, 2.5 %%>;
  subInfoWeight = <%% 500, 500, 500, 500, 500 %%>;
  subInfoTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  arrowWidth = <%% 32, 28, 28, 26, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 3, 3, 3, 2, 1 %%>;
  arrowReviewBottom = <%% 5, 4, 4, 4, 1 %%>;

  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  baseBlock = baseTong.children[1];
  cleanChildren(baseBlock);

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {

      ({ contents, service } = contentsArr[i]);

      if (desktop) {
        src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
      }

      title = contents.portfolio.title.main.split(", ")[1];
      title = title.replace(/홈?스타일링/gi, '') + serviceParsing(0).name[Number(service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1];
      if (mobile) {
        title = title.split(" ").slice(0, title.split(" ").findIndex((s) => { return /py/gi.test(s) }) + 1).join(" ")
      }

      if (media[0] || media[2]) {
        subTitle = contents.portfolio.title.sub;
      } else {
        subTitle = contents.portfolio.title.sub;
        if (!mobile) {
          if (gsArray[i] !== 'g' && subTitle.length > 27) {
            subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        } else {
          if (gsArray[i] !== 'g' && subTitle.length > 25) {
            subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        }
      }

      tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

      if (gsArray[i] !== 'g') {
        tag = tag.slice(garoSliceStart, garoSliceEnd);
        if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > garoSliceLimit) {
          tag = tag.slice(0, -1);
        }
      } else {
        tag = tag.slice(seroSliceStart, seroSliceEnd);
        if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > seroSliceLimit) {
          tag = tag.slice(0, -1);
        }
      }

      block = createNode({
        mother: baseBlock,
        attribute: {
          pid: contents.portfolio.pid,
        },
        event: {
          click: function (e) {
            const pid = this.getAttribute("pid");
            selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
          },
          touchstart: function (e) {
            const self = this;
            self.setAttribute(touchStartConst, "on");
            setQueue(() => {
              self.setAttribute(touchStartConst, "off");
            });
          },
          touchend: function (e) {
            if (this.getAttribute(touchStartConst) === "on") {
              const pid = this.getAttribute("pid");
              selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
            }
          }
        },
        style: {
          display: "inline-block",
          width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "block",
              width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(radiusPixel) + "px",
              marginBottom: String(photoMarginBottom) + ea,
              backgroundSize: "100% auto",
              backgroundPosition: "50% 50%",
              backgroundImage: "url('" + src + "')",
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
            },
            children: [
              {
                text: title,
                style: {
                  display: "block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  fontFamily: "pretendard",
                }
              },
              {
                style: {
                  display: "block",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginTop: String(titleSubMarginTop) + ea,
                  overflow: "hidden",
                },
                children: [
                  {
                    text: subTitle,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: String(titleSubSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.deactive,
                      width: String(200) + '%',
                      fontFamily: "pretendard",
                    },
                  }
                ]
              }
            ]
          },
        ]
      });

    }
  } else {

    for (let i = 0; i < 4; i++) {

      block = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          width: String(seroWidth) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              width: String(seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(5) + "px",
              marginBottom: String(photoMarginBottom) + ea,
              background: colorChip.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.doubleQuote(colorExtended.mainBlue),
                style: {
                  display: "inline-block",
                  height: String(quoteHeight) + ea,
                  width: String(quoteWidth) + ea,
                  verticalAlign: "top",
                  position: "relative",
                  top: String(quoteTop) + ea,
                }
              },
              {
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  marginLeft: String(titleMarginLeft) + ea,
                  verticalAlign: "top",
                  fontFamily: "pretendard",
                }
              }
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              marginTop: String(tagTongMarginTop) + ea,
              width: String(tagTongWidthRatio * 100) + '%',
              left: String(0) + ea,
            }
          }
        ]
      });

    }

  }

}

DesignerDetailJs.prototype.portfolioPhoto = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref, swipePatch } = GeneralJs;
  const { ea, media, baseTong, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const photoDefaultRatio = (297 / 210);
  const whitePhotoBigClassName = "whitePhotoBigClassName";
  let { contentsArr } = this;
  let baseBlock;
  let baseWidth;
  let photoMargin;
  let imageTargets;
  let imageTong;
  let src, gs, pid;
  let imageNumber;
  let imageBetween;
  let imageHeight;
  let whitePhotoTongInnerPadding;
  let whitePhotoHeight;
  let whitePhotoNumbers;
  let whitePhotoTongMarginBottom;
  let whitePopupBigPadding;
  let whitePhotoBigArrowHeight;
  let whitePhotoBigArrowAreaHeight;
  let nextSrc, previousSrc;
  let radiusPixel;

  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;

  imageNumber = <%% 6, 6, 6, 6, 4 %%>;
  imageBetween = <%% 8, 8, 8, 8, 1 %%>;
  imageHeight = <%% 316, 236, 200, 158, 30 %%>;

  whitePhotoTongInnerPadding = <%% 36, 36, 32, 30, 3 %%>;
  whitePhotoHeight = <%% 210, 210, 170, 133, 24 %%>;
  whitePhotoNumbers = <%% 8, 6, 6, 6, 4 %%>;
  whitePhotoTongMarginBottom = <%% 10, 10, 10, 10, 1 %%>;
  whitePopupBigPadding = <%% 64, 64, 64, 64, 28 %%>;
  whitePhotoBigArrowHeight = <%% 15, 15, 15, 15, 2 %%>;
  whitePhotoBigArrowAreaHeight = <%% 200, 200, 200, 200, 20 %%>;


  baseBlock = baseTong.children[1];
  cleanChildren(baseBlock);

  imageTargets = [ ...contentsArr ].map((obj) => {
    return obj.photos.detail.map((o) => {
      let src;
      if (desktop) {
        src = FRONTHOST + "/list_image/portp" + obj.contents.portfolio.pid + "/" + photoChar + String(o.index) + obj.contents.portfolio.pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + obj.contents.portfolio.pid + "/mobile/" + photoCharMobile + String(o.index) + obj.contents.portfolio.pid + ".jpg";
      }
      return { src, gs: o.gs, pid: obj.contents.portfolio.pid };
    })
  }).flat();

  imageTong = createNode({
    mother: baseBlock,
    style: {
      display: "block",
      position: "relative",
      width: "calc(calc(100% - " + String(photoMargin) + ea + ") + " + String(imageBetween) + ea + ")",
    }
  });

  imageEvent = function (e) {
    const zIndex = 101;
    let order, index, gs;
    let cancelBack, imagePopup, leftArrow, rightArrow;
    let width, height;
    let src;
    let staticSetting;
    let imageRender;

    homeliaisonAnalytics({
      page: instance.pageName,
      standard: instance.firstPageViewTime,
      action: "photoBigView",
      data: {
        pid: pid,
        date: dateToString(new Date(), true),
      },
    }).catch((err) => {
      console.log(err);
    });

    index = Number(this.getAttribute("index"));

    staticSetting = (index) => {
      src = imageTargets[index].src;
      gs = imageTargets[index].gs;

      height = window.innerHeight - (whitePopupBigPadding * 2);
      if (gs === 'g') {
        width = height * photoDefaultRatio;
      } else {
        width = height / photoDefaultRatio;
      }

      if (width > window.innerWidth - (whitePopupBigPadding * 2)) {
        width = window.innerWidth - (whitePopupBigPadding * 2);
        if (gs === 'g') {
          height = width / photoDefaultRatio;
        } else {
          height = width * photoDefaultRatio;
        }
      }
    }
    imageRender = () => {}

    staticSetting(index);

    leftArrowEvent = (e) => {
      if (imageTargets[index - 1] === undefined) {
        index = imageTargets.length - 1;
      } else {
        index = index - 1;
      }
      staticSetting(index);
      imageRender(width, height, src);
    }

    rightArrowEvent = (e) => {
      if (imageTargets[index + 1] === undefined) {
        index = 0;
      } else {
        index = index + 1;
      }
      staticSetting(index);
      imageRender(width, height, src);
    }

    cancelBack = createNode({
      mother: totalContents,
      class: [ whitePhotoBigClassName ],
      event: {
        click: function (e) {
          e.stopPropagation();
          const removeTargets = document.querySelectorAll('.' + whitePhotoBigClassName);
          for (let dom of removeTargets) {
            dom.remove();
          }
        }
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        opacity: String(0.7),
        background: colorChip.realBlack,
        width: withOut(0),
        height: withOut(0),
        zIndex: String(zIndex),
      }
    });

    imagePopup = createNode({
      mother: totalContents,
      class: [ whitePhotoBigClassName ],
      event: {
        contextmenu: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
      },
      style: {
        position: "fixed",
        borderRadius: String(5) + "px",
        zIndex: String(zIndex),
        animation: "fadeuporiginal 0.3s ease forwards",
        backgroundSize: "100% 100%",
        backgroundPosition: "50% 50%",
        transition: "all 0s ease",
      }
    });

    swipePatch("right", rightArrowEvent, imagePopup, "imagePopupSwipeStack_");
    swipePatch("up", rightArrowEvent, imagePopup, "imagePopupSwipeStack_");
    swipePatch("left", leftArrowEvent, imagePopup, "imagePopupSwipeStack_");
    swipePatch("down", leftArrowEvent, imagePopup, "imagePopupSwipeStack_");

    imageRender = (width, height, src) => {
      imagePopup.style.width = String(width) + "px";
      imagePopup.style.height = String(height) + "px";
      imagePopup.style.top = withOut(50, height / 2, "px");
      imagePopup.style.left = withOut(50, width / 2, "px");
      imagePopup.style.backgroundImage = "url('" + src + "')";
    }

    imageRender(width, height, src);

    leftArrow = createNode({
      mother: totalContents,
      class: [ whitePhotoBigClassName ],
      event: {
        click: leftArrowEvent
      },
      style: {
        position: "fixed",
        top: withOut(50, whitePhotoBigArrowAreaHeight / 2, ea),
        height: String(whitePhotoBigArrowAreaHeight) + ea,
        left: String(0),
        width: String(whitePopupBigPadding) + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: String(zIndex),
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnArrow("left", colorChip.white),
          style: {
            position: "relative",
            height: String(whitePhotoBigArrowHeight) + ea,
            animation: "fadeuporiginal 0.3s ease forwards",
          }
        }
      ]
    });

    rightArrow = createNode({
      mother: totalContents,
      class: [ whitePhotoBigClassName ],
      event: {
        click: rightArrowEvent
      },
      style: {
        position: "fixed",
        top: withOut(50, whitePhotoBigArrowAreaHeight / 2, ea),
        height: String(whitePhotoBigArrowAreaHeight) + ea,
        right: String(0),
        width: String(whitePopupBigPadding) + "px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: String(zIndex),
      },
      children: [
        {
          mode: "svg",
          source: instance.mother.returnArrow("right", colorChip.white),
          style: {
            position: "relative",
            height: String(whitePhotoBigArrowHeight) + ea,
            animation: "fadeuporiginal 0.3s ease forwards",
          }
        }
      ]
    });

  }

  for (let i = 0; i < imageTargets.length; i++) {
    src = imageTargets[i].src;
    gs = imageTargets[i].gs;
    pid = imageTargets[i].pid;

    createNode({
      mother: imageTong,
      attribute: { src, gs, pid, order: String(i), index: String(i) },
      event: {
        click: imageEvent,
        contextmenu: (e) => { e.preventDefault() },
        touchstart: function (e) {
          const self = this;
          self.setAttribute(touchStartConst, "on");
          setQueue(() => {
            self.setAttribute(touchStartConst, "off");
          });
        },
        touchend: function (e) {
          if (this.getAttribute(touchStartConst) === "on") {
            imageEvent.call(this, e);
          }
        }
      },
      style: {
        display: "inline-block",
        width: gs === 's' ? ("calc(calc(100% - " + String(imageBetween * imageNumber) + ea + ") / " + String(imageNumber) + ")") : ("calc(calc(calc(calc(100% - " + String(imageBetween * imageNumber) + ea + ") / " + String(imageNumber) + ") * 2) + " + String(imageBetween) + ea + ")"),
        height: String(imageHeight) + ea,
        borderRadius: String(radiusPixel) + "px",
        background: "url('" + src + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        marginRight: String(imageBetween) + ea,
        marginBottom: String(imageBetween) + ea,
        cursor: "pointer",
      }
    });

  }

}

DesignerDetailJs.prototype.insertBelowButton = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let belowTong;
  let belowBaseTong;
  let belowBoxHeight;
  let belowButtonTop;
  let belowButtonHeight;
  let belowButtonBetween;
  let belowButtonWordPadding;
  let belowButtonTextTop;
  let belowButtonSize;
  let belowButtonWeight;
  let consultingTextTop;

  belowBoxHeight = <%% 150, 148, 148, 125, 24 %%>;
  belowButtonTop = <%% 45, 45, 45, 32, 7 %%>;

  belowButtonHeight = <%% 45, 45, 42, 42, 10 %%>;
  belowButtonBetween = <%% 16, 16, 14, 12, 2 %%>;
  belowButtonWordPadding = <%% 20, 20, 20, 20, 4 %%>;

  belowButtonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  belowButtonSize = <%% 17, 17, 16, 16, 3.5 %%>;
  belowButtonWeight = <%% 700, 700, 700, 700, 700 %%>;

  consultingTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), -0.1 %%>;

  belowTong = createNode({
    mother: totalContents,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "Center",
      position: "relative",
      width: String(100) + '%',
      background: colorExtended.gradientBlue,
      height: String(belowBoxHeight) + ea,
    }
  });

  belowBaseTong = createNode({
    mother: belowTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    }
  });

  createNode({
    mother: belowBaseTong,
    class: [ "consultingButtonBottom" ],
    event: {
      click: (e) => {
        selfHref(FRONTHOST + "/consulting.php");
      }
    },
    style: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      height: String(belowButtonHeight) + ea,
      background: colorChip.white,
      borderRadius: String(10) + "px",
      paddingLeft: String(belowButtonWordPadding) + ea,
      paddingRight: String(belowButtonWordPadding) + ea,
      cursor: "pointer",
    },
    children: [
      {
        text: "홈스타일링 신청하기",
        style: {
          position: "relative",
          textAlign: "center",
          fontSize: String(belowButtonSize) + ea,
          fontWeight: String(belowButtonWeight),
          color: colorChip.black,
          fontFamily: "pretendard",
          top: String(consultingTextTop) + ea,
        }
      }
    ]
  });

}

DesignerDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, colorExtended, serviceParsing, setMetaData, homeliaisonAnalytics, dateToString } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const getObj = returnGet();
    let response, services;

    services = serviceParsing().name;
    response = await ajaxJson({ mode: "designer", desid: getObj.desid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);

    for (let designer of this.designers) {
      designer.tag = [ ...new Set(response.contentsArr.filter((obj) => { return obj.desid === designer.desid }).map((obj) => {
        return obj.tag;
      }).flat()) ];
      designer.tag.push(designer.designer);
      for (let i = 0; i < designer.service.length; i++) {
        if (designer.service[i] === 1) {
          designer.tag.push(services[i]);
        }
      }
      for (let wording of designer.setting.front.introduction.desktop) {
        designer.tag.push(wording);
      }
    }

    // this.designers = this.designers.toNormal().filter((obj) => {
    //   return /완료/gi.test(obj.information.contract.status);
    // }).filter((obj) => {
    //   return obj.setting.front.introduction.desktop.length > 0;
    // }).filter((obj) => {
    //   return /^[ap]/i.test(obj.setting.front.photo.porlid);
    // })

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "designerDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: DesignerDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 20,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPortfolioBase();
          instance.insertBelowButton();

          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "contentsView",
            data: {
              cliid: "null",
              href: window.encodeURIComponent(window.location.href),
              date: dateToString(new Date(), true),
            },
            dimension: {
              contents_desid: getObj.desid,
            }
          }).catch((err) => {
            console.log(err);
          });

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "DesignerDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
