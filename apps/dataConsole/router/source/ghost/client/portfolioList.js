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
      "return ('홈리에종 포트폴리오 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 포트폴리오 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "portfolioList",
  "hangul": "포트폴리오 리스트",
  "route": [
    "portfolioList",
    "RL"
  ]
} %/%/g

const PortfolioListJs = function () {
  this.mother = new GeneralJs();
}

PortfolioListJs.binaryPath = FRONTHOST + "/middle/portfolio";

PortfolioListJs.prototype.generateGsArray = function (number) {
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

PortfolioListJs.prototype.insertInitBox = function () {
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
  let mobileSearchWhiteBoxPaddingTop;
  let mobileSearchWhiteBoxPaddingBottom;
  let mobileSearchWhiteBoxMarginBottom;
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
  let designerDetailToggleEvent;
  let sortBoxRight;
  let mobileBackgroundHeight;
  let mobileVisualPaddingLeft;
  let tagBoxRight;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 45, 45, 45, 40, 4 %%>;

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
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "디자이너 포트폴리오";
  subTitleContents = "포트폴리오로 찾는 나의 스타일";

  mobileBlockTop = 4.5;

  mobileSearchWhiteBoxPaddingTop = 4.8;
  mobileSearchWhiteBoxPaddingBottom = 5;
  mobileSearchWhiteBoxMarginBottom = 5;

  placeholder = "새아파트";

  buttonSize = <%% 14, 14, 13, 13, 3.2 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 2, 2, 2, 2, 2 %%>;

  buttonTongWidth = <%% 65, 65, 60, 60, 90 %%>;

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

  tagBoxRight = <%% 132, 128, 100, 100, 10 %%>;

  searchTags = [];
  if (media[0]) {
    searchTags.push("아이방");
    searchTags.push("모던");
    searchTags.push("제작가구");
    searchTags.push("화이트");
    searchTags.push("전체");
  } else if (media[1]) {
    searchTags.push("아이방");
    searchTags.push("모던");
    searchTags.push("제작가구");
    searchTags.push("전체");
  }

  serviceButtonClassName = "serviceButton";

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

          while (!instance.fullLoad) {
            await sleep(500);
          }

          if (mode === "key9") {
            instance.sort = "key9";
          } else {
            instance.sort = "key8";
          }
          instance.portfolioBlock(null, instance.search, instance.sort);

        } else {

          thisTarget.style.color = colorExtended.deactive;
          thisCircleBase.style.background = colorExtended.gray5;
          thisCircle.style.left = String((buttonHeight - circleWidth) / 2) + ea;
          thisTarget.setAttribute("toggle", "off");

          oppositeTarget.style.color = colorExtended.mainBlue;
          oppositeCircleBase.style.background = colorExtended.mainBlue;
          oppositeCircle.style.left = String(buttonWidth - circleWidth - ((buttonHeight - circleWidth) / 2)) + ea;
          oppositeTarget.setAttribute("toggle", "on");

          while (!instance.fullLoad) {
            await sleep(500);
          }

          if (mode === "key9") {
            instance.sort = "key8";
          } else {
            instance.sort = "key9";
          }
          instance.portfolioBlock(null, instance.search, instance.sort);

        }

        instance.photoLoad = true;

      } catch (e) {
        console.log(e);
      }
    }
  }

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
                    while (!instance.fullLoad) {
                      await sleep(500);
                    }
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
                    instance.portfolioBlock(null, instance.search, instance.sort);
                    instance.photoLoad = true;
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
      justifyContent: desktop ? "left" : "center",
      alignItems: "start",
      textAlign: "left",
      paddingLeft: desktop ? "" : String(mobileVisualPaddingLeft) + ea,
    },
    children: [
      {
        class: [ toggleTargetClassName2 ],
        attribute: {
          toggle: "on",
          mode: "key9",
        },
        event: {
          click: designerDetailToggleEvent(toggleTargetClassName2),
          touchstart: function (e) {
            const self = this;
            self.setAttribute(touchStartConst, "on");
            setQueue(() => {
              self.setAttribute(touchStartConst, "off");
            });
          },
          touchend: function (e) {
            if (this.getAttribute(touchStartConst) === "on") {
              designerDetailToggleEvent(toggleTargetClassName2).call(this, e);
            }
          }
        },
        text: "최신순 정렬",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
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
        class: [ toggleTargetClassName2 ],
        attribute: {
          toggle: "off",
          mode: "key8",
        },
        event: {
          click: designerDetailToggleEvent(toggleTargetClassName2),
          touchstart: function (e) {
            const self = this;
            self.setAttribute(touchStartConst, "on");
            setQueue(() => {
              self.setAttribute(touchStartConst, "off");
            });
          },
          touchend: function (e) {
            if (this.getAttribute(touchStartConst) === "on") {
              designerDetailToggleEvent(toggleTargetClassName2).call(this, e);
            }
          }
        },
        text: "인기순 정렬",
        style: {
          marginTop: desktop ? String(buttonBetween) + ea : '',
          marginLeft: desktop ? '' : String(mobileButtonBetween) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
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
            instance.portfolioBlock(null, instance.search, instance.sort);
            instance.photoLoad = true;
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

PortfolioListJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseBlock;
  let limitLength;
  let photoMargin;
  let paddingBottom;

  limitLength = <%% 42, 42, 42, 42, 42 %%>;
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  paddingBottom = <%% 120, 120, 120, 120, 40 %%>;

  baseBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingBottom: String(paddingBottom) + ea,
    }
  });

  this.portfolioBlock(limitLength, null, instance.sort);
}

PortfolioListJs.prototype.portfolioBlock = function (limitLength, search = null, sort = "key9") {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { designers } = this;
  let baseBlock;
  let contentsArr;
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

  if (typeof search === "string") {

    if (search === '') {
      contentsArr = this.contentsArr;
    } else {

      if (/엑스트라/gi.test(search)) {
        search = "엑스트라";
      }
      contentsArr = this.contentsArr.toNormal().filter((obj) => {
        let boo;
        let target;
        let projectTarget;
        let designerTarget;

        target = equalJson(JSON.stringify(obj.contents.portfolio.detailInfo.tag));
        target.push(obj.contents.portfolio.title.main.replace(/홈?스타일링/gi, ''));
        target.push(obj.contents.portfolio.title.sub.replace(/홈?스타일링/gi, ''));
        target.push(serviceParsing(obj.service));
        designerTarget = designers.search("desid", obj.desid);
        target.push(designerTarget.designer);

        boo = false;
        for (let t of target) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }

        return boo;
      });

    }

  } else {
    contentsArr = this.contentsArr;
  }

  contentsArr = equalJson(JSON.stringify(contentsArr));
  if (sort === "key9") {
    contentsArr.sort((a, b) => {
      return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
    });
  } else {
    contentsArr.sort((a, b) => {
      return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
    });
  }

  if (limitLength === null) {
    limitLength = contentsArr.length;
  }

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 20 : 22), (isMac() ? 18 : 20), (isMac() ? 18 : 20), (isMac() ? 18 : 20), 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 21, 17, 17, 15, 3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 3, 3, 3, 2, 0.5 %%>;

  photoBlockMarginBottom = <%% 72, 66, 66, 62, 8 %%>;

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

  baseBlock = baseTong.children[1];

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents, service } = contentsArr[i]);

        if (desktop) {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        } else {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        }

        title = contents.portfolio.title.main.split(", ")[1];
        title = title.replace(/홈?스타일링/gi, '') + serviceParsing(0).name[Number(service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1];

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
            borderRadius: String(5) + "px",
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
                borderRadius: String(5) + "px",
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
                    width: String(200) + '%',
                    verticalAlign: "top",
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
                        color: colorChip.gray5,
                        width: String(200) + '%',
                      },
                    }
                  ]
                }
              ]
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginTop: String(tagTongMarginTop) + ea,
                width: String(100) + '%',
                borderTop: "1px solid " + colorExtended.gray3,
                left: String(0) + ea,
                paddingTop: String(tagTongMarginTop) + ea,
              },
              children: [
                {
                  text: contents.portfolio.spaceInfo.region + "&nbsp;&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;&nbsp;" + contents.portfolio.spaceInfo.method.split(" ")[0] + " 스타일링",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(subInfoTextTop) + ea,
                    fontSize: String(subInfoSize) + ea,
                    fontWeight: String(subInfoWeight),
                    color: colorExtended.black,
                  },
                  bold: {
                    fontWeight: String(subInfoWeight),
                    color: colorExtended.mainBlue,
                  }
                },
                {
                  mode: "svg",
                  source: svgMaker.horizontalArrow(arrowWidth, arrowHeight),
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    right: String(0),
                    bottom: String(arrowBottom) + ea,
                  }
                }
              ]
            }
          ]
        });

        if (search === null) {
          this.loadedContents.push(i);
        }

      }
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

PortfolioListJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, colorExtended, homeliaisonAnalytics, dateToString } = GeneralJs;
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
    let response;

    response = await ajaxJson({ mode: "portfolio", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.sort = "key9";
    this.search = "";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "portfolioList",
      client: null,
      base: {
        instance: this,
        binaryPath: PortfolioListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPortfolioBase();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "PortfolioListJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    window.addEventListener("scroll", (e) => {
      setDebounce(() => {
        let scrollMin;
        scrollMin = <%% 1000, 1000, 900, 800, 300 %%>;
        if (window.scrollY > scrollMin && instance.fullLoad && !instance.photoLoad) {
          instance.portfolioBlock(null, null, instance.sort);
          instance.photoLoad = true;
        }
      }, "windowScrollDebounce");
    });

    setQueue(() => {
      ajaxJson({ mode: "portfolio" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;

        if (typeof getObj.search === "string") {
          if (document.querySelector("input") !== null) {
            instance.portfolioBlock(null, getObj.search, instance.sort);
            instance.photoLoad = true;
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "searchKeyword",
              data: {
                value: getObj.search,
                date: dateToString(new Date(), true),
              },
              dimension: {
                search_value: getObj.search,
              },
            }).catch((err) => {
              console.log(err);
            });
          }
        }

      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "PortfolioListJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
