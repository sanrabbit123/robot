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
      "return ('매거진 리스트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 매거진 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "magazineList",
  "hangul": "매거진 리스트",
  "route": [
    "magazineList",
    "DL"
  ]
} %/%/g

const MagazineListJs = function () {
  this.mother = new GeneralJs();
}

MagazineListJs.binaryPath = FRONTHOST + "/middle/magazine";

MagazineListJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 25, 25, 25, 25, 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
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

  searchBarPaddingTop = <%% 220, 220, 192, 164, 14 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 78 %%>;

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

  titleWording = "홈리에종 매거진";
  subTitleContents = "홈스타일링에 대한 심도 있는 이야기";

  mobileBlockTop = 4.5;

  mobileSearchWhiteBoxPaddingTop = 4.8;
  mobileSearchWhiteBoxPaddingBottom = 5;
  mobileSearchWhiteBoxMarginBottom = 4;

  buttonSize = <%% 14, 14, 13, 13, 3.2 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 2, 2, 2, 2, 2 %%>;

  buttonTongWidth = <%% 90, 90, 85, 85, 90 %%>;

  buttonWidth = <%% 26, 26, 26, 24, 5.6 %%>;
  buttonHeight = <%% 12, 12, 12, 12, 3 %%>;
  buttonTextTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 4 : 2), (isMac() ? 4 : 2), (isIphone() ? 1.2 : 1) %%>;
  buttonLeft = <%% -34, -34, -34, -31, -7 %%>;
  circleWidth = <%% 8, 8, 8, 8, 2 %%>;

  tabletVisualBottom = 4;
  mobileButtonTongMarginTop = 3;
  mobileButtonBetween = 11.5;
  contentsPaddingTop = <%% 16, 16, 16, 0, 1 %%>;

  sortBoxRight = <%% 0, 0, 0, 0, 20 %%>;

  mobileBackgroundHeight = isIphone() ? 75.5 : 73;
  mobileVisualPaddingLeft = 6;

  tagBoxRight = <%% 157, 153, 125, 125, 10 %%>;

  designerDetailToggleEvent = (toggleTargetClassName) => {
    return async function (e) {
      try {
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

          thisTarget.style.color = colorChip.green;
          thisCircleBase.style.background = colorChip.green;
          thisCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
          thisTarget.setAttribute("toggle", "on");

          oppositeTarget.style.color = colorChip.deactive;
          oppositeCircleBase.style.background = colorChip.gray5;
          oppositeCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
          oppositeTarget.setAttribute("toggle", "off");

          if (mode === "only") {
            instance.mode = "only";
            instance.designerList(instance.search);
          } else {
            instance.mode = "with";
            instance.designerListWithReview(instance.search);
          }

        } else {

          thisTarget.style.color = colorChip.deactive;
          thisCircleBase.style.background = colorChip.gray5;
          thisCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
          thisTarget.setAttribute("toggle", "off");

          oppositeTarget.style.color = colorChip.green;
          oppositeCircleBase.style.background = colorChip.green;
          oppositeCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
          oppositeTarget.setAttribute("toggle", "on");

          if (mode === "only") {
            instance.mode = "with";
            instance.designerListWithReview(instance.search);
          } else {
            instance.mode = "only";
            instance.designerList(instance.search);
          }

        }

        instance.photoLoad = true;

      } catch (e) {
        console.log(e);
      }
    }
  }

  searchTags = [];
  if (media[0]) {
    searchTags.push("패브릭");
    searchTags.push("제작가구");
    searchTags.push("온라인");
    searchTags.push("전체");
  } else if (media[1]) {
    searchTags.push("온라인");
    searchTags.push("제작가구");
    searchTags.push("전체");
  } else if (media[2]) {
    searchTags.push("패브릭");
    searchTags.push("제작가구");
    searchTags.push("온라인");
    searchTags.push("전체");
  } else if (media[3]) {
    searchTags.push("패브릭");
    searchTags.push("제작가구");
    searchTags.push("온라인");
  } else if (media[4]) {
    searchTags.push("패브릭");
    searchTags.push("홈퍼니싱");
    searchTags.push("토탈 스타일링");
    searchTags.push("제작가구");
    searchTags.push("온라인");
    searchTags.push("전체");
  }

  placeholder = "패브릭";

  serviceButtonClassName = "serviceButton";

  if (mobile) {
    instance.mother.backgroundImageBox.style.height = String(mobileBackgroundHeight) + ea;
  }

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

  middleBox = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: desktop ? "left" : "center",
      alignItems: "center",
      paddingTop: desktop ? String(searchBarPaddingTop) + ea : String(mobileSearchWhiteBoxPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(mobileSearchWhiteBoxPaddingBottom) + ea,
      background: mobile ? colorChip.white : "",
      borderRadius: mobile ? String(5) + "px" : "",
      boxShadow: mobile ? "0px 3px 15px -9px " + colorChip.shadow : "",
      flexDirection: mobile ? "column" : "row",
      marginTop: mobile ? String(searchBarPaddingTop) + ea : "",
      marginBottom: mobile ? String(mobileSearchWhiteBoxMarginBottom) + ea : "",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth) + ea,
          height: String(searchBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray2,
          opacity: String(1),
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnSearch(colorChip.black),
            style: {
              position: "absolute",
              height: String(searchIconHeight) + ea,
              right: String(searchIconRight) + ea,
              top: String(searchIconTop) + ea,
            }
          },
          {
            mode: "input",
            class: [ "searchInput" ],
            attribute: {
              type: "text",
              placeholder: placeholder,
            },
            event: {
              keyup: function (e) {
                setDebounce(async () => {
                  try {
                    this.value = this.value.trim();
                    this.value = this.value.replace(/[^가-힣a-z ]/gi, '');

                    homeliaisonAnalytics({
                      page: instance.pageName,
                      standard: instance.firstPageViewTime,
                      action: "searchKeyword",
                      data: {
                        value: this.value,
                        date: dateToString(new Date(), true),
                      },
                    }).catch((err) => {
                      console.log(err);
                    });

                    instance.search = this.value;
                    if (instance.mode === "only") {
                      instance.designerList(instance.search);
                    } else {
                      instance.designerListWithReview(instance.search);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }, "searchEventDebounce", 500);
              }
            },
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: withOut(inputWithoutHeight, ea),
              border: String(0),
              outline: String(0),
              background: "transparent",
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      },
    ]
  });

  if (media[0] || media[1]) {
    serviceChildren = [];
    for (let service of searchTags) {
      serviceChildren.push({
        class: [
          serviceButtonClassName
        ],
        attribute: {
          toggle: "off",
          value: service,
        },
        event: {
          click: function (e) {
            const targets = [ ...document.querySelectorAll('.' + serviceButtonClassName) ];
            let thisValue;
            for (let dom of targets) {
              if (dom === this) {
                dom.setAttribute("toggle", "on");
                dom.firstChild.style.color = colorChip.black;
                dom.firstChild.querySelector('b').style.color = colorChip.green;
                thisValue = dom.getAttribute("value");
              } else {
                dom.setAttribute("toggle", "off");
                dom.firstChild.style.color = colorChip.deactive;
                dom.firstChild.querySelector('b').style.color = colorChip.deactive;
              }
            }

            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "clickKeyword",
              data: {
                value: thisValue,
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });

            instance.search = /전체/gi.test(thisValue) ? "" : thisValue;
            if (instance.mode === "only") {
              instance.designerList(instance.search);
            } else {
              instance.designerListWithReview(instance.search);
            }
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          height: String(searchBarHeight - (tagTongBottom * 2)) + ea,
          marginRight: String(serviceMarginRight) + ea,
          paddingLeft: String(servicePaddingLeft) + ea,
          paddingRight: String(servicePaddingLeft) + ea,
          textAlign: "center",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text: "<b%#%b> " + service,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(tagTextTop) + ea,
              fontSize: String(serviceSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              cursor: "pointer",
              textAlign: "center",
            },
            bold: {
              color: colorChip.deactive,
            }
          }
        ]
      });
    }
    serviceBlock = createNode({
      mother: middleBox,
      style: {
        display: desktop ? "block" : "none",
        position: "absolute",
        textAlign: "center",
        right: String(0) + ea,
        bottom: String(tagTongBottom) + ea,
      },
      children: serviceChildren
    });
    for (let dom of serviceBlock.children) {
      dom.firstChild.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width + 1)) + "px";
      dom.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width) + 1) + "px";
    }
    serviceBlock.lastChild.style.marginRight = "";
  }

}

MagazineListJs.prototype.magazineList = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, designerMthParsing, selfHref } = GeneralJs;
  const { ea, media, magazines, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const blank = "<u%&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;%u>";
  let whiteBlock;
  let whiteBottomMargin;
  let staticPath;
  let thisPath;
  let imageHeight;
  let wordsBox;
  let imageBox;
  let imageWidth;
  let imageBetween;
  let barBetween;
  let wordsBoxPaddingTop;
  let innerPadding;
  let titleSize, titleWeight, titleLineHeight;
  let contentsSize, contentsWeight, contentsLineHeight;
  let wordsLimit;
  let finalBottom;

  whiteBottomMargin = <%% 16, 16, 16, 16, 3 %%>;

  innerPadding = <%% 40, 40, 40, 40, 4 %%>;

  finalBottom = <%% 240, 240, 240, 240, 40 %%>;

  wordsLimit = <%% 232, 232, 232, 232, 232 %%>;

  imageHeight = <%% 260, 260, 260, 260, 26 %%>;
  imageWidth = <%% 483, 483, 483, 483, 48 %%>;

  imageBetween = <%% 40, 40, 40, 40, 32 %%>;

  barBetween = <%% 16, 16, 16, 16, 16 %%>;

  wordsBoxPaddingTop = <%% 26, 26, 26, 26, 2 %%>;

  titleSize = <%% 23, 23, 23, 23, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsSize = <%% 14, 14, 14, 14, 14 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  staticPath = FRONTHOST + "/list_image/magaz";

  for (let magazine of magazines) {

    thisPath = staticPath + magazine.mid;

    whiteBlock = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginBottom: String(whiteBottomMargin) + ea,
        paddingTop: String(innerPadding) + ea,
        paddingLeft: String(innerPadding) + ea,
        paddingRight: String(innerPadding) + ea,
        paddingBottom: String(innerPadding) + ea,
        width: withOut(innerPadding * 2, ea),
      }
    });

    imageBox = createNode({
      mother: whiteBlock,
      mode: "img",
      attribute: { src: thisPath + magazine.contents.init[desktop ? 0 : 1] },
      style: {
        display: "inline-block",
        position: "relative",
        borderRadius: String(5) + "px",
        height: String(imageHeight) + ea,
        width: String(imageWidth) + ea,
        marginRight: String(imageBetween) + ea,
      }
    });

    wordsBox = createNode({
      mother: whiteBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        paddingTop: String(wordsBoxPaddingTop) + ea,
        height: String(imageHeight - wordsBoxPaddingTop) + ea,
        width: withOut(imageWidth + imageBetween, ea),
        flexDirection: "column",
      }
    });

    createNode({
      mother: wordsBox,
      text: magazine.contents.detail[0].text.join("\n"),
      style: {
        position: "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorChip.black,
        lineHeight: String(titleLineHeight),
      }
    });

    createNode({
      mother: wordsBox,
      style: {
        display: "block",
        position: "relative",
        height: String(barBetween) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      }
    });

    createNode({
      mother: wordsBox,
      text: magazine.contents.detail[1].text.join(" ").slice(0, wordsLimit) + " ... ",
      style: {
        display: "block",
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        color: colorChip.black,
        lineHeight: String(contentsLineHeight),
        marginTop: String(barBetween) + ea,
      }
    });

    createNode({
      mother: wordsBox,
      text: "<b%작성일%b> : " + dateToString(magazine.date) + blank + "<b%작성자%b> : " + magazine.editor,
      style: {
        position: "absolute",
        bottom: String(0),
        left: String(0),
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        color: colorChip.black,
        lineHeight: String(contentsLineHeight),
      },
      under: {
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        color: colorChip.gray4,
      },
      bold: {
        fontSize: String(contentsSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    });

    createNode({
      mother: wordsBox,
      text: "#" + String(Number(magazine.mid.replace(/[^0-9]/gi, '')) + 1),
      style: {
        position: "absolute",
        bottom: String(0),
        right: String(0),
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        fontFamily: "graphik",
        color: colorChip.green,
        lineHeight: String(contentsLineHeight),
      },
    });

  }

  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0),
      height: String(finalBottom) + ea,
    }
  })

}

MagazineListJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, serviceParsing } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);
    const getObj = returnGet();
    let response;

    response = await ajaxJson({ mode: "magazine" }, LOGHOST + "/getContents", { equal: true });
    this.magazines = response.contentsArr;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "magazineList",
      client: null,
      base: {
        instance: this,
        binaryPath: MagazineListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.magazineList();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MagazineListJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "MagazineListJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
