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
      "return ('디자이너 리스트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 협업 디자이너 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerList",
  "hangul": "디자이너 리스트",
  "route": [
    "designerList",
    "DL"
  ]
} %/%/g

const DesignerListJs = function () {
  this.mother = new GeneralJs();
}

DesignerListJs.binaryPath = FRONTHOST + "/middle/designer";

DesignerListJs.prototype.insertInitBox = function () {
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
  let titleBoxRowTong;
  let blackTitleTextTop, blackTitleMarginLeft;

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

  titleWording = "DESIGNER LIST<b%.%b>";
  subTitleContents = "디자이너 리스트";

  mobileBlockTop = 7;

  mobileSearchWhiteBoxPaddingTop = 4;
  mobileSearchWhiteBoxPaddingBottom = 7;
  mobileSearchWhiteBoxMarginBottom = 5;

  placeholder = "패브릭";

  buttonSize = <%% 13, 13, 13, 13, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 1, 1, 1, 1, 2 %%>;

  buttonTongWidth = <%% 83, 83, 83, 83, 90 %%>;

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

  tagBoxRight = <%% 157, 153, 125, 125, 10 %%>;

  blackTitleMarginLeft = <%% 12, 11, 8, 7, 1 %%>;
  blackTitleTextTop = <%% (isMac() ? -2 : 0.5), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0.5), (isIphone() ? -0.7 : -0.1) %%>;

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

          thisTarget.style.color = colorExtended.mainBlue;
          thisCircleBase.style.background = colorExtended.mainBlue;
          thisCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
          thisTarget.setAttribute("toggle", "on");

          oppositeTarget.style.color = colorExtended.deactive;
          oppositeCircleBase.style.background = colorExtended.gray5;
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

          thisTarget.style.color = colorExtended.deactive;
          thisCircleBase.style.background = colorExtended.gray5;
          thisCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
          thisTarget.setAttribute("toggle", "off");

          oppositeTarget.style.color = colorExtended.mainBlue;
          oppositeCircleBase.style.background = colorExtended.mainBlue;
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

  serviceButtonClassName = "serviceButton";

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
      flexDirection: mobile ? "column" : "row",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth) + ea,
          height: String(searchBarHeight) + ea,
          background: colorChip.white,
          borderBottom: "1.5px solid " + colorExtended.black,
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
                      dimension: {
                        search_value: this.value,
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
              fontFamily: "pretendard",
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      },
    ]
  });

  createNode({
    mother: middleBox,
    style: {
      display: desktop ? "inline-flex" : "flex",
      flexDirection: desktop ? "column" : "row",
      position: desktop ? "absolute" : "relative",
      width: desktop ? String(buttonTongWidth) + ea : String(searchBarWidth) + ea,
      bottom: String(0),
      marginTop: desktop ? "" : String(mobileButtonTongMarginTop) + ea,
      right: desktop ? String(sortBoxRight) + ea : "",
      justifyContent: desktop ? "start" : "end",
      alignItems: "start",
      textAlign: "left",
    },
    children: [
      {
        class: [ toggleTargetClassName2 ],
        attribute: {
          toggle: "on",
          mode: "only",
        },
        event: {
          click: designerDetailToggleEvent(toggleTargetClassName2),
        },
        text: "디자이너만 보기",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
          fontFamily: "pretendard",
          fontWeight: String(buttonWeight),
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
                      background: colorExtended.white,
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
        class: [ toggleTargetClassName2 ],
        attribute: {
          toggle: "off",
          mode: "with",
        },
        event: {
          click: designerDetailToggleEvent(toggleTargetClassName2),
        },
        text: "리뷰 함께 보기",
        style: {
          marginTop: desktop ? String(buttonBetween) + ea : '',
          marginLeft: desktop ? '' : String(mobileButtonBetween) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
          fontFamily: "pretendard",
          fontWeight: String(buttonWeight),
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
                dom.firstChild.style.color = colorExtended.black;
                dom.firstChild.querySelector('b').style.color = colorExtended.mainBlue;
                thisValue = dom.getAttribute("value");
              } else {
                dom.setAttribute("toggle", "off");
                dom.firstChild.style.color = colorExtended.deactive;
                dom.firstChild.querySelector('b').style.color = colorExtended.deactive;
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
          background: colorChip.white,
          borderRadius: String(8) + "px",
          border: "1px solid " + colorExtended.gray3,
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
              fontFamily: "pretendard",
              fontWeight: String(600),
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
        right: String(tagBoxRight) + ea,
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

DesignerListJs.prototype.designerList = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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
  let services;
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
  let designerTongPaddingTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 200, 200, 200, 200, 9 %%>;

  quoteHeight = <%% 11, 11, 11, 11, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 31, 31, 30, 28, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 6 %%>;

  searchBarPaddingTop = <%% 20, 20, 20, 20, 5.2 %%>;
  searchBarHeight = <%% 40, 40, 40, 40, 8 %%>;
  searchBarWidth = <%% 500, 500, 490, 450, 74 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  designerTongPaddingTop = <%% 30, 40, 40, 40, 0 %%>;

  placeholder = "";

  serviceButtonClassName = "serviceButton";

  if ([ ...this.baseTong.children ].length >= 2) {
    this.baseTong.removeChild(this.baseTong.children[1]);
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(designerTongPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      background: colorChip.white,
      marginBottom: String(whiteBlockMarginBottom) + ea,
    }
  });

  this.designerTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      width: withOut(0, ea),
    }
  });

  this.designerBlock(search);
}

DesignerListJs.prototype.designerBlock = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, designerMthParsing, selfHref } = GeneralJs;
  const { ea, media } = this;
  const { designers, designerTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const touchStartConst = "touchStartConstName";
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
  let blockMarginBottom;
  let titleSize, titleWeight;
  let careerSize, careerWeight;
  let careerTextTop;
  let careerBetween;
  let grayBarTop, grayBarBottom;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let tagTong;
  let mthTargets;
  let contentsBlockHeight;
  let tagTongMarginTop;
  let tagTongPaddingTop, tagTongPaddingBottom, tagTongPaddingLeft;
  let tagTongMarginRight;
  let tagSize, tagWeight;
  let arrowWidth, arrowHeight, arrowBottom;
  let num, booArr;
  let tagBlock;
  let markWidth, markTop;
  let whiteCircleWidth;
  let realPhotoCircleWidth;
  let maxHeight;
  let z;

  tongPaddingLeft = <%% 0, 0, 0, 0, 0 %%>;
  blockMargin = <%% 40, 30, 20, 20, 0 %%>;
  blockMarginBottom = <%% 20, 20, 15, 10, 5 %%>;
  columns = <%% 2, 2, 1, 1, 1 %%>;
  contentsPaddingTop = <%% 16, 16, 16, 16, 1 %%>;

  blockHeight = <%% 198, 160, (isMac() ? 178 : 176), 170, 25 %%>;
  photoWidth = blockHeight - (contentsPaddingTop * 2);

  whiteCircleWidth = photoWidth * 0.95;
  realPhotoCircleWidth = photoWidth * 0.93;

  photoMargin = <%% 22, 22, 22, 21, 4 %%>;

  titleSize = <%% 25, 23, 23, 23, 4 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;

  careerSize = <%% 12, 12, 12, 12, 2.5 %%>;
  careerWeight = <%% 500, 500, 500, 500, 500 %%>;
  careerTextTop = <%% 0, 0, 0, 0, 0 %%>;

  careerBetween = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), 1.5 %%>;

  grayBarTop = <%% 8, 8, 8, 8, 1.5 %%>;
  grayBarBottom = <%% 14, 10, 14, 14, 1.5 %%>;

  descriptionSize = <%% 13, 11, 13, 12, 2.7 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.55 %%>;

  contentsBlockHeight = 4;

  tagTongMarginTop = <%% 15, 15, 19, 15, (isIphone() ? 3.6 : 3.8) %%>;
  tagTongPaddingTop = <%% (isMac() ? 3 : 4), (isMac() ? 3 : 4), (isMac() ? 3 : 4), (isMac() ? 3 : 4), 0.6 %%>;
  tagTongPaddingBottom = <%% (isMac() ? 4 : 3.5), (isMac() ? 4 : 3.5), (isMac() ? 4 : 3.5), (isMac() ? 4 : 3.5), (isIphone() ? 0.8 : 0.9) %%>;
  tagTongPaddingLeft = <%% 8, 8, 8, 8, 1.8 %%>;
  tagTongMarginRight = <%% 5, 5, 5, 5, 1 %%>;

  tagSize = <%% 11, 11, 11, 11, 2.4 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;

  arrowWidth = <%% 40, 32, 32, 32, 3 %%>;
  arrowHeight = <%% 10, 8, 8, 8, 2 %%>;
  arrowBottom = <%% 12, 12, 12, 12, 1 %%>;

  markWidth = <%% 34, 34, 34, 34, 6.4 %%>;
  markTop = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isIphone() ? 2.3 : 2) %%>;

  maxHeight = <%% 63, 35.5, 42, 39, 6 %%>;

  cleanChildren(designerTong);

  if (typeof search === "string") {
    if (search.trim() === '') {
      targets = designers;
    } else {
      targets = designers.filter((designer) => {
        let boo;
        boo = false;
        for (let t of designer.tag) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }
        return boo;
      });
    }
  } else {
    targets = designers;
  }

  tong = createNode({
    mother: designerTong,
    style: {
      display: "block",
      position: "relative",
      paddingLeft: String(tongPaddingLeft) + ea,
      paddingRight: String(tongPaddingLeft - blockMargin) + ea,
    }
  });

  targets.sort((a, b) => { return a.designer >= b.designer ? 1 : -1 });
  z = 0;
  for (let designer of targets) {

    if (desktop) {
      src = "https://" + FILEHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    } else {
      src = "https://" + FILEHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/mobile/mo" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    }

    block = createNode({
      mother: tong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String((columns - 1) * blockMargin) + ea + ") / " + String(columns) + ")",
        height: String(blockHeight) + ea,
        marginRight: (z % columns === columns - 1) ? "" : String(blockMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            top: String(contentsPaddingTop) + ea,
            borderRadius: String(photoWidth) + ea,
            width: String(photoWidth) + ea,
            height: String(photoWidth) + ea,
            background: colorExtended.gradientBlue2,
            verticalAlign: "top",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                borderRadius: String(whiteCircleWidth) + ea,
                width: String(whiteCircleWidth) + ea,
                height: String(whiteCircleWidth) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: colorExtended.white,
              },
              children: [
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    borderRadius: String(realPhotoCircleWidth) + ea,
                    width: String(realPhotoCircleWidth) + ea,
                    height: String(realPhotoCircleWidth) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundSize: "auto 100%",
                    backgroundPosition: "50% 50%",
                    backgroundImage: "url('" + src + "')",
                  }
                }
              ]
            }
          ]
        },
        {
          class: [ "designerBlock" ],
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(photoWidth + photoMargin, ea),
            marginLeft: String(photoMargin) + ea,
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
        cursor: "pointer",
      },
      children: [
        {
          text: designer.designer,
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            fontFamily: "pretendard",
            color: colorExtended.black,
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
            color: colorExtended.deactive,
          }
        },
        {
          mode: "svg",
          source: instance.mother.returnMainMark(colorExtended.mainBlue),
          style: {
            display: "none",
            display: designer.analytics.grade === 1 ? "inline-block" : "none",
            position: "absolute",
            width: String(markWidth) + ea,
            right: String(0),
            top: String(markTop) + ea,
          }
        }
      ]
    });

    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        width: String(100) + '%',
        height: String(grayBarTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      }
    });

    createNode({
      mother: contentsBlock,
      text: desktop ? (designer.setting.front.introduction.desktop.slice(0, 3).join("\n") + " ...") : (designer.setting.front.introduction.desktop.slice(0, 1).join("\n") + " ..."),
      style: {
        display: "block",
        marginTop: String(grayBarBottom) + ea,
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        fontFamily: "pretendard",
        color: colorChip.darkDarkShadow,
        lineHeight: String(descriptionLineHeight),
        height: desktop ? "" : String(contentsBlockHeight) + ea,
        "max-height": desktop ? String(maxHeight) + ea : "",
        overflow: desktop ? "scroll" : "scroll",
        cursor: "pointer",
      }
    });

    tagTong = createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        marginTop: String(tagTongMarginTop) + ea,
      }
    });
    mthTargets = serviceParsing(0).name;
    booArr = designer.analytics.project.matrix.map((arr) => { return arr.some((num) => { return num === 1 }) });
    mthTargets = mthTargets.filter((str, index) => { return booArr[index]; });
    mthTargets = mthTargets.filter((str) => { return !/엑스트라/gi.test(str) });
    if (mthTargets.length > 2) {
      mthTargets = mthTargets.slice(-2);
    }

    num = 0;
    for (let mth of mthTargets) {
      tagBlock = createNode({
        mother: tagTong,
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: String(tagTongPaddingTop) + ea,
          paddingBottom: String(tagTongPaddingBottom) + ea,
          paddingLeft: String(tagTongPaddingLeft) + ea,
          paddingRight: String(tagTongPaddingLeft) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(tagTongMarginRight) + ea,
          border: "1px solid " + colorExtended.mainBlue,
        },
        children: [
          {
            text: mth,
            style: {
              position: "relative",
              fontSize: String(tagSize) + ea,
              fontWeight: String(tagWeight),
              fontFamily: "pretendard",
              color: colorExtended.mainBlue,
              textAlign: "center",
            }
          }
        ]
      });

      tagBlock.firstChild.style.width = String(Math.ceil(tagBlock.firstChild.getBoundingClientRect().width) + 1) + "px";

      num++;
    }

    if (desktop) {
      createNode({
        mode: "svg",
        mother: tagTong,
        class: [ "hoverDefault_lite" ],
        source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorExtended.mainBlue),
        style: {
          position: "absolute",
          right: String(0) + ea,
          bottom: String(arrowBottom) + ea,
          width: String(arrowWidth) + ea,
          height: String(arrowHeight) + ea,
        }
      });
    }

    z++;
  }

}

DesignerListJs.prototype.designerListWithReview = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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
  let services;
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
  let designerTongPaddingTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 200, 200, 200, 200, 9 %%>;

  quoteHeight = <%% 11, 11, 11, 11, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 31, 31, 30, 28, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 6 %%>;

  searchBarPaddingTop = <%% 20, 20, 20, 20, 5.2 %%>;
  searchBarHeight = <%% 40, 40, 40, 40, 8 %%>;
  searchBarWidth = <%% 500, 500, 490, 450, 74 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  designerTongPaddingTop = <%% 30, 40, 40, 40, 0 %%>;

  placeholder = "";

  serviceButtonClassName = "serviceButton";

  if ([ ...this.baseTong.children ].length >= 2) {
    this.baseTong.removeChild(this.baseTong.children[1]);
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(designerTongPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      marginBottom: String(whiteBlockMarginBottom) + ea,
    }
  });

  this.designerTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      width: withOut(0, ea),
    }
  });

  this.designerBlockWithReview(search);
}

DesignerListJs.prototype.designerBlockWithReview = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, designerMthParsing, selfHref } = GeneralJs;
  const { ea, media } = this;
  const { designers, designerTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const touchStartConst = "touchStartConstName";
  const photoChar = 't';
  const photoCharMobile = "mot";
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
  let blockMarginBottom;
  let titleSize, titleWeight;
  let careerSize, careerWeight;
  let careerTextTop;
  let careerBetween;
  let grayBarTop, grayBarBottom;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let tagTong;
  let mthTargets;
  let contentsBlockHeight;
  let tagTongMarginTop;
  let tagTongPaddingTop, tagTongPaddingBottom, tagTongPaddingLeft;
  let tagTongMarginRight;
  let tagSize, tagWeight;
  let arrowWidth, arrowHeight, arrowBottom;
  let num, booArr;
  let tagBlock;
  let markWidth, markTop;
  let blockPaddingTop;
  let reviewBlock;
  let reviewTong;
  let contentsTarget;
  let contents;
  let reviewSrc;
  let title;
  let subTitle;
  let portfolioMargin;
  let reviewColumns;
  let photoHeight;
  let photoMarginBottom;
  let quoteHeight;
  let quoteWidth;
  let quoteTop;
  let reviewTitleSize;
  let reviewTitleWeight;
  let reviewTitleMarginLeft;
  let subTitleMarginTop;
  let subTitleMarginTopReview;
  let subTitleSize;
  let subTitleOverWidthRatio;
  let tagTongOverWidthRatio;
  let reviewArrowWidth;
  let reviewArrowHeight;
  let reviewArrowBottom;
  let reviewArrowReviewBottom;
  let reviewSubTitleVisual;
  let reviewTitleBox, reviewTitleMarginBottom;
  let reviewTitleLineTop;
  let reviewTitleBoxTextTop;
  let reviewTitleBoxSize;
  let reviewTitleBoxWeight;
  let reviewTitleBoxPaddingRight;
  let reviewTitleBoxBoldWeight;
  let reviewBlockMarginBottom;

  tongPaddingLeft = <%% 100, 70, 80, 50, 6.5 %%>;
  blockMargin = <%% 40, 36, 36, 32, 4 %%>;
  blockMarginBottom = <%% 20, 20, 15, 10, 4 %%>;
  columns = <%% 2, 2, 1, 1, 1 %%>;
  contentsPaddingTop = <%% 16, 16, 16, 16, 1 %%>;

  blockPaddingTop = <%% 24, 20, 20, 16, 3.5 %%>;

  blockHeight = <%% (isMac() ? 178 : 176), 160, (isMac() ? 178 : 176), 170, 25 %%>;
  photoWidth = blockHeight - (contentsPaddingTop * 2);

  photoMargin = <%% 30, 25, 30, 30, 4 %%>;

  titleSize = <%% 24, 23, 23, 23, 4 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;

  careerSize = <%% 12, 12, 12, 12, 2.5 %%>;
  careerWeight = <%% 500, 500, 500, 500, 500 %%>;
  careerTextTop = <%% 0, 0, 0, 0, 0 %%>;

  careerBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  grayBarTop = <%% 8, 8, 8, 8, 1.5 %%>;
  grayBarBottom = <%% 14, 10, 14, 14, 1.5 %%>;

  descriptionSize = <%% 14, 11, 13, 12, 2.7 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.55 %%>;

  contentsBlockHeight = 4;

  tagTongMarginTop = <%% 15, 15, 19, 15, (isIphone() ? 4.4 : 4.8) %%>;

  tagTongPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isIphone() ? 0.7 : 0.6) %%>;
  tagTongPaddingBottom = <%% (isMac() ? 8 : 5), (isMac() ? 8 : 5), (isMac() ? 8 : 5), (isMac() ? 8 : 5), (isIphone() ? 0.6 : 0.9) %%>;
  tagTongPaddingLeft = <%% 10, 10, 10, 10, 1.8 %%>;
  tagTongMarginRight = <%% 5, 5, 5, 5, 1 %%>;

  tagSize = <%% 12, 11, 12, 12, 2.4 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;

  arrowWidth = <%% 40, 32, 32, 24, 3 %%>;
  arrowHeight = <%% 10, 8, 8, 8, 2 %%>;
  arrowBottom = <%% 12, 12, 12, 12, 1 %%>;

  markWidth = <%% 14, 14, 14, 13, 3 %%>;
  markTop = <%% (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isIphone() ? 2.2 : 1.8) %%>;

  portfolioMargin = <%% 16, 16, 16, 16, 3 %%>;

  reviewColumns = <%% 5, 4, 3, 3, 2 %%>;
  photoHeight = <%% 264, 250.5, 289.33, 229.33, 42.5 %%>;
  photoMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  quoteHeight = <%% 9, 8, 8, 7, 1.6 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.2 : 1.1 %%>;

  reviewTitleSize = <%% 17, 17, 17, 15, 3 %%>;
  reviewtitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  reviewTitleMarginLeft = <%% 5, 5, 5, 5, 1.1 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 0.5 %%>;
  subTitleMarginTopReview = <%% 3, 3, 3, 2, 0.2 %%>;
  subTitleSize = <%% 12, 12, 12, 12, 2.5 %%>;

  subTitleOverWidthRatio = <%% 2, 2, 2, 2, 2 %%>;
  tagTongOverWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  reviewArrowWidth = <%% 28, 26, 24, 18, 4 %%>;
  reviewArrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;
  reviewArrowBottom = <%% 2, 2, 2, 2, 1 %%>;
  reviewArrowReviewBottom = <%% 4, 4, 4, 3, 1.5 %%>;
  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  reviewTitleBox = <%% 60, 60, 60, 60, 11 %%>;
  reviewTitleMarginBottom = <%% 6, 6, 4, 2, 0 %%>;
  reviewTitleLineTop = <%% 27, 27, 27, 27, 3.2 %%>;

  reviewTitleBoxTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -2 %%>;
  reviewTitleBoxSize = <%% 18, 18, 18, 18, 3.6 %%>;
  reviewTitleBoxWeight = <%% 400, 400, 400, 400, 400 %%>;
  reviewTitleBoxPaddingRight = <%% 16, 16, 16, 16, 3 %%>;
  reviewTitleBoxBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  reviewBlockMarginBottom = <%% 45, 42, 36, 30, 6 %%>;

  cleanChildren(designerTong);

  if (typeof search === "string") {
    if (search.trim() === '') {
      targets = designers;
    } else {
      targets = designers.filter((designer) => {
        let boo;
        boo = false;
        for (let t of designer.tag) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }
        return boo;
      });
    }
  } else {
    targets = designers;
  }

  tong = createNode({
    mother: designerTong,
    style: {
      display: "block",
      position: "relative",
    }
  });

  for (let designer of targets) {
    contentsTarget = instance.contentsArr.toNormal().filter((obj) => { return obj.desid === designer.desid }).filter((obj) => {
      return (obj.contents.review.detailInfo.photodae.length > 0 && obj.contents.review.title.main !== "");
    });
    designer.contentsTarget = contentsTarget;
  }
  targets.sort((a, b) => { return b.contentsTarget.length - a.contentsTarget.length });

  for (let designer of targets) {

    // designer area

    if (desktop) {
      src = "https://" + FILEHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    } else {
      src = "https://" + FILEHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/mobile/mo" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    }

    block = createNode({
      mother: tong,
      style: {
        display: "block",
        height: String(blockHeight) + ea,
        marginBottom: String(blockMarginBottom) + ea,
        background: colorChip.white,
        paddingLeft: String(blockMargin) + ea,
        paddingRight: String(blockMargin) + ea,
        paddingTop: String(blockPaddingTop) + ea,
        paddingBottom: String(blockPaddingTop) + ea,
        width: withOut(blockMargin * 2, ea),
        borderRadius: String(12) + "px",
        border: "1.5px solid " + colorExtended.black,
      },
      children: [
        {
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            top: String(contentsPaddingTop) + ea,
            borderRadius: String(8) + "px",
            width: String(photoWidth) + ea,
            height: String(photoWidth) + ea,
            backgroundSize: "auto 100%",
            backgroundPosition: "50% 50%",
            backgroundImage: "url('" + src + "')",
            verticalAlign: "top",
            cursor: "pointer",
          }
        },
        {
          class: [ "designerBlock" ],
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(photoWidth + photoMargin, ea),
            marginLeft: String(photoMargin) + ea,
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
        cursor: "pointer",
      },
      children: [
        {
          text: designer.designer,
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.black,
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
            top: String(careerTextTop) + ea,
          },
          bold: {
            fontSize: String(careerSize) + ea,
            fontWeight: String(careerWeight),
            color: colorExtended.deactive,
          }
        },
      ]
    });
    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        width: String(100) + '%',
        height: String(grayBarTop) + ea,
        borderBottom: "1px solid " + colorExtended.black,
      }
    });
    createNode({
      mother: contentsBlock,
      text: desktop ? (designer.setting.front.introduction.desktop.slice(0, 2).join("\n") + " ...") : (designer.setting.front.introduction.desktop.slice(0, 1).join("\n") + " ..."),
      style: {
        display: "block",
        marginTop: String(grayBarBottom) + ea,
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorExtended.black,
        lineHeight: String(descriptionLineHeight),
        height: desktop ? "" : String(contentsBlockHeight) + ea,
        overflow: desktop ? "" : "scroll",
        cursor: "pointer",
      }
    });

    tagTong = createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        marginTop: String(tagTongMarginTop) + ea,
      }
    });
    mthTargets = serviceParsing(0).name;
    booArr = designer.analytics.project.matrix.map((arr) => { return arr.some((num) => { return num === 1 }) });
    mthTargets = mthTargets.filter((str, index) => { return booArr[index]; });
    mthTargets = mthTargets.filter((str) => { return !/엑스트라/gi.test(str) });
    if (mthTargets.length > 2) {
      mthTargets = mthTargets.slice(-2);
    }

    num = 0;
    for (let mth of mthTargets) {
      tagBlock = createNode({
        mother: tagTong,
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: String(tagTongPaddingTop) + ea,
          paddingBottom: String(tagTongPaddingBottom) + ea,
          paddingLeft: String(tagTongPaddingLeft) + ea,
          paddingRight: String(tagTongPaddingLeft) + ea,
          borderRadius: String(8) + "px",
          marginRight: String(tagTongMarginRight) + ea,
          border: "1px solid " + colorExtended.black,
        },
        children: [
          {
            text: mth,
            style: {
              position: "relative",
              fontSize: String(tagSize) + ea,
              fontWeight: String(tagWeight),
              color: colorExtended.black,
              textAlign: "center",
            }
          }
        ]
      });

      tagBlock.firstChild.style.width = String(Math.ceil(tagBlock.firstChild.getBoundingClientRect().width) + 1) + "px";

      num++;
    }
    if (desktop) {
      createNode({
        mode: "svg",
        mother: tagTong,
        class: [ "hoverDefault_lite" ],
        source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorExtended.black),
        style: {
          position: "absolute",
          right: String(0) + ea,
          bottom: String(arrowBottom) + ea,
          width: String(arrowWidth) + ea,
          height: String(arrowHeight) + ea,
        }
      });
    }

    // review area

    contentsTarget = designer.contentsTarget;
    if (contentsTarget.length > 0) {
      reviewBlock = createNode({
        mother: tong,
        style: {
          display: "block",
          width: withOut(0),
          marginBottom: String(desktop ? blockMarginBottom * 3 : blockMarginBottom * 2) + ea,
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              alignItems: "center",
              width: withOut(0),
              height: String(reviewTitleBox) + ea,
              marginBottom: String(reviewTitleMarginBottom) + ea,
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: String(reviewTitleLineTop) + ea,
                  borderBottom: "1px solid " + colorChip.black,
                }
              },
              {
                text: designer.designer + " 디자이너 <b%고객 후기%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(reviewTitleBoxTextTop) + ea,
                  fontSize: String(reviewTitleBoxSize) + ea,
                  fontWeight: String(reviewTitleBoxWeight),
                  paddingRight: String(reviewTitleBoxPaddingRight) + ea,
                  color: colorChip.black,
                  background: colorExtended.white,
                },
                bold: {
                  fontWeight: String(reviewTitleBoxBoldWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              width: "calc(100% + " + String(portfolioMargin) + ea + ")",
            }
          }
        ]
      });
      reviewTong = reviewBlock.children[1];
      for (let i = 0; i < contentsTarget.length; i++) {
        ({ contents } = contentsTarget[i]);

        if (desktop) {
          reviewSrc = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[1]) + contents.portfolio.pid + ".jpg";
        } else {
          reviewSrc = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.review.detailInfo.photodae[1]) + contents.portfolio.pid + ".jpg";
        }

        title = contents.review.title.sub.split(", ").join(" ");
        if (media[0] || media[2]) {
          subTitle = contents.portfolio.title.sub;
        } else {
          subTitle = contents.portfolio.title.sub;
          if (!mobile) {
            if (i !== 0 && subTitle.length > 27) {
              subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
            }
          } else {
            if (i !== 0 && subTitle.length > 25) {
              subTitle = contents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
            }
          }
        }

        createNode({
          mother: reviewTong,
          attribute: {
            pid: contents.portfolio.pid,
            rid: contents.review.rid,
          },
          event: {
            click: function (e) {
              const pid = this.getAttribute("pid");
              selfHref(FRONTHOST + "/revdetail.php?pid=" + pid);
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
                selfHref(FRONTHOST + "/revdetail.php?pid=" + pid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(calc(100% - " + String(portfolioMargin * reviewColumns) + ea + ") / " + String(reviewColumns) + ")",
            marginRight: String(portfolioMargin) + ea,
            marginBottom: String(reviewBlockMarginBottom) + ea,
            borderRadius: String(5) + "px",
            verticalAlign: "top",
            overflow: "hidden",
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "block",
                width: String(100) + '%',
                height: String(photoHeight) + ea,
                borderRadius: String(5) + "px",
                marginBottom: String(photoMarginBottom) + ea,
                backgroundSize: "auto 100%",
                backgroundPosition: "50% 50%",
                backgroundImage: "url('" + reviewSrc + "')",
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
                  text: title,
                  style: {
                    display: "inline-block",
                    fontSize: String(reviewTitleSize) + ea,
                    fontWeight: String(reviewTitleWeight),
                    color: colorExtended.black,
                    marginLeft: String(reviewTitleMarginLeft) + ea,
                    width: withOut(quoteWidth + reviewTitleMarginLeft, ea),
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginTop: String(subTitleMarginTopReview) + ea,
                paddingLeft: String(quoteWidth + reviewTitleMarginLeft + reviewSubTitleVisual) + ea,
                width: withOut(quoteWidth + reviewTitleMarginLeft + reviewSubTitleVisual, ea),
                left: String(0) + ea,
              },
              children: [
                {
                  text: contents.portfolio.spaceInfo.space + " " + String(contents.portfolio.spaceInfo.pyeong) + "py " + (desktop ? "홈스타일링 후기" : "후기"),
                  style: {
                    display: "inline-block",
                    fontSize: String(subTitleSize) + ea,
                    fontWeight: String(reviewTitleWeight),
                    color: colorChip.gray5,
                  }
                },
                {
                  mode: "svg",
                  source: svgMaker.horizontalArrow(reviewArrowWidth, reviewArrowHeight),
                  style: {
                    position: "absolute",
                    width: String(reviewArrowWidth) + ea,
                    right: String(0),
                    bottom: String(reviewArrowReviewBottom) + ea,
                  }
                }
              ]
            }
          ]
        });

      }
    }

  }
}

DesignerListJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, colorExtended, setDebounce, serviceParsing } = GeneralJs;
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
    response = await ajaxJson({ mode: "designer" }, LOGHOST + "/getContents", { equal: true });
    this.designers = new SearchArray(response.designers);
    this.contentsArr = new SearchArray(response.contentsArr);
    for (let designer of this.designers) {
      for (let i = 0; i < designer.service.length; i++) {
        if (designer.service[i] === 1) {
          designer.tag.push(services[i]);
        }
      }
      for (let wording of designer.setting.front.introduction.desktop) {
        designer.tag.push(wording);
      }
    }

    this.designers = this.designers.toNormal().filter((obj) => {
      return !/해지/gi.test(obj.information.contract.status);
    }).filter((obj) => {
      return obj.setting.front.introduction.desktop.length > 0;
    }).filter((obj) => {
      return /^[ap]/i.test(obj.setting.front.photo.porlid);
    })

    this.search = "";
    this.mode = "only";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "designerList",
      client: null,
      base: {
        instance: this,
        binaryPath: DesignerListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 20,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.designerList();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerListJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "DesignerListJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
