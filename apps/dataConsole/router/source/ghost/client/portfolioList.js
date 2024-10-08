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
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, ajaxJson, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, objectDeepCopy } = GeneralJs;
  const { ea, media, standardWidth, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const toggleTargetClassName = "toggleTargetClassName";
  const toggleTargetClassName2 = "toggleTargetClassName2";
  const circleClassName = "circleClassName";
  const circleBaseClassName = "circleBaseClassName";
  const touchStartConst = "toggleTouchStartConstName";
  const sortMenuPopupClassName = "sortMenuPopupClassName";
  const filterMenuPopupClassName = "filterMenuPopupClassName";
  const targetTextDomClassName = "targetTextDomClassName";
  const searchTagsButtonClassName = "searchTagsButtonClassName";
  const px = "px";
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
  let sortBoxRight;
  let mobileBackgroundHeight;
  let mobileVisualPaddingLeft;
  let tagBoxRight;
  let illust0Top, illust0Left, illust0Width;
  let illust1Top, illust1Right, illust1Width;
  let illust2Top, illust2Right, illust2Width;
  let mobileTitlePaddingTop;
  let titleBoxRowTong;
  let blackTitleTextTop, blackTitleMarginLeft;
  let numbersBox;
  let numbersBoxBarMargin;
  let numbersBoxPaddingLeft;
  let numbersMargin;
  let multiplyNumber;
  let numbersImageWidth;
  let numbersWidth0, numbersWidth1, numbersWidth2, numbersWidth3;
  let numbersTotalHeight;
  let borderWidth;
  let numbersMaxWidth, numbersRadius;
  let numbersBoxMarginTop;
  let numbersTextSize, numbersTextWeight;
  let numbersImageWidth0, numbersImageWidth1, numbersImageWidth2, numbersImageWidth3;
  let numbersImageTop0, numbersImageTop1, numbersImageTop2, numbersImageTop3;
  let numbersMiddleTitleContents0, numbersMiddleTitleContents1, numbersMiddleTitleContents2, numbersMiddleTitleContents3;
  let numbersDescriptionContents0, numbersDescriptionContents1, numbersDescriptionContents2, numbersDescriptionContents3;
  let numbersDescriptionSize, numbersDescriptionWeight, numbersDescriptionTextTop;
  let numbersMiddleBarHeight;
  let numbersBoxPaddingRight;
  let numbersBoxMarginBottom;
  let sortButtonWidth, sortButtonBetween;
  let sortButtonHeight;
  let buttonArrowDownWidth, buttonArrowDownMarginLeft;
  let serviceNum;
  let borderWidthLight;
  let sortButtonClickEvent;
  let popupBetween;
  let middleBorderWidth;
  let filterButtonClickEvent;
  let searchDescriptionTags;
  let searchWidthTags;
  let menuPopupPaddingTop;
  let numbersBox0, numbersBox1;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 36, 32, 30, 23, 9.5 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 26, 23, 22, 19, 5 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 18, 14, 12, 12, 3 %%>;
  serviceMarginRight = <%% 6, 5, 4, 3, 0.8 %%>;
  serviceSize = <%% 14, 13, 13, 11, 2.8 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 50, 50, 50, 36, 20 %%>;
  searchBarHeight = <%% 36, 34, 32, 28, 7 %%>;
  searchBarWidth = <%% 690, 516, 412, 284, 88 %%>;

  searchIconHeight = <%% 20, 20, 18, 16, 4.3 %%>;
  searchIconRight = <%% 0, 0, 0, 0, 0.2 %%>;
  searchIconTop = <%% 8, 8, 7, 6, 1 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 14, 14, 14, 14, 3 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.1 %%>;
  subTitleFontSize = <%% 21, 19, 18, 16, 3.4 %%>;
  subTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  tagTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), 0 %%>;
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "PROJECT PORTFOLIO<b%.%b>";
  subTitleContents = "프로젝트 포트폴리오";

  mobileBlockTop = 7;

  mobileSearchWhiteBoxPaddingTop = 4;
  mobileSearchWhiteBoxPaddingBottom = 3.6;
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

  mobileTitlePaddingTop = 2;

  blackTitleMarginLeft = <%% 12, 11, 8, 7, 1 %%>;
  blackTitleTextTop = <%% (isMac() ? -2 : 0.5), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0.5), (isIphone() ? -0.7 : -0.1) %%>;

  sortButtonWidth = <%% 90, 82, 78, 68, 16.5 %%>;
  sortButtonBetween = <%% 16, 14, 12, 10, 2.6 %%>;
  sortButtonHeight = <%% searchBarHeight - 1, searchBarHeight - 2, searchBarHeight - 1, searchBarHeight - 1, searchBarHeight - 0.1 %%>;

  numbersTotalHeight = <%% 138, 138, 138, 138, 22 %%>;
  borderWidth = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  borderWidthLight = 1;
  numbersMaxWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;
  numbersRadius = <%% 12, 12, 12, 12, 12 %%>;
  numbersBoxMarginTop = <%% 15, 15, 15, 15, 7 %%>;
  numbersBoxMarginBottom = <%% 46, -22, -8, -24, 2.5 %%>;

  numbersBoxPaddingLeft = <%% 42, 40, 38, 32, 5 %%>;
  numbersBoxPaddingRight = <%% 36, 34, 32, 26, 4 %%>;
  numbersBoxBarMargin = <%% 36, 32, 32, 28, 6 %%>;
  numbersMiddleBarHeight = <%% 100, 100, 100, 100, 100 %%>;

  numbersMargin = <%% 20, 12, 12, 6, 2 %%>;

  numbersImageWidth0 = <%% 80, 80, 80, 80, 13 %%>;
  numbersImageWidth1 = <%% 95, 95, 95, 95, 13 %%>;
  numbersImageWidth2 = <%% 110, 110, 110, 110, 14.5 %%>;
  numbersImageWidth3 = <%% 80, 80, 80, 80, 12 %%>;

  numbersImageTop0 = <%% 8, 8, 8, 8, 1.2 %%>;
  numbersImageTop1 = <%% 2, 2, 2, 2, 1 %%>;
  numbersImageTop2 = <%% 7, 7, 7, 7, 1 %%>;
  numbersImageTop3 = <%% 7, 7, 7, 7, 1 %%>;

  numbersWidth0 = <%% 140, 140, 140, 140, 35 %%>;
  numbersWidth1 = <%% 140, 140, 140, 140, 33 %%>;
  numbersWidth2 = <%% 140, 140, 140, 140, 33 %%>;
  numbersWidth3 = <%% 110, 110, 110, 110, 33 %%>;

  numbersTextSize = <%% 38, 38, 38, 38, 6 %%>;
  numbersTextWeight = <%% 700, 700, 700, 700, 700 %%>;

  numbersDescriptionSize = <%% 14, 14, 14, 14, 2.8 %%>;
  numbersDescriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
  numbersDescriptionTextTop = <%% (isMac() ? -5 : -3), (isMac() ? -5 : -3), (isMac() ? -5 : -3), (isMac() ? -5 : -3), -1 %%>;

  buttonArrowDownWidth = <%% 6, 5, 5, 4, 1 %%>;
  buttonArrowDownMarginLeft = <%% 10, 8, 8, 6, 1.9 %%>;

  menuPopupPaddingTop = <%% 4, 4, 4, 4, (isIphone() ? 1.5 : 1.1) %%>;

  popupBetween = 6;
  middleBorderWidth = 1;

  searchTags = [];
  searchTags.push("평수");
  searchTags.push("예산");
  searchTags.push(desktop ? "서비스 종류" : "종류");
  searchTags.push(desktop ? "서비스 기간" : "기간");
  searchTags.push("지역");
  searchTags.push("전체");

  searchWidthTags = [];
  searchWidthTags.push(<&& 96 | 88 | 80 | 72 | 18 &&>);
  searchWidthTags.push(<&& 120 | 110 | 108 | 90 | 24 &&>);
  searchWidthTags.push(<&& 132 | 124 | 120 | 108 | 26 &&>);
  searchWidthTags.push(<&& 0 | 0 | 0 | 0 | 20 &&>);
  searchWidthTags.push(<&& 100 | 90 | 82 | 70 | 20 &&>);
  searchWidthTags.push(<&& 0 | 0 | 0 | 0 | 0 &&>);

  searchDescriptionTags = [];
  searchDescriptionTags.push([
    "10평 미만",
    "10평대",
    "20평대",
    "30평대",
    "40평대",
    "50평대",
    "60평 이상",
  ]);
  searchDescriptionTags.push([
    "500만원 이하",
    "1,000만원대",
    "2,000만원대",
    "3,000만원대",
    "4,000만원대",
    "5,000만원대",
    "6,000만원 이상",
  ]);
  searchDescriptionTags.push(serviceParsing().name);
  searchDescriptionTags.push([
    "3주 이내",
    "3주 ~ 6주",
    "6주 이상",
  ]);
  searchDescriptionTags.push([
    "서울 / 경기",
    "충청 / 강원",
    "전라 / 경상",
    "제주",
    "기타",
  ]);
  searchDescriptionTags.push([]);

  serviceButtonClassName = "serviceButton";

  sortButtonClickEvent = () => {
    return async function (e) {
      try {
        const self = this;
        const box = self.getBoundingClientRect();
        const zIndex = 3;
        const thisSort = Number(this.getAttribute("sort"));
        let cancelBack;
        let menuPopup;
        let menuPopupTop;

        if (desktop) {
          menuPopupTop = box.top + window.scrollY + sortButtonHeight + popupBetween;
        } else {
          menuPopupTop = box.top + window.scrollY + box.height + popupBetween;
        }

        cancelBack = createNode({
          mother: totalContents,
          class: [ sortMenuPopupClassName ],
          event: {
            click: function (e) {
              removeByClass(sortMenuPopupClassName);
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: String(100) + "vh",
            background: colorExtended.transparent,
            zIndex: String(zIndex),
          }
        });

        menuPopup = createNode({
          mother: totalContents,
          class: [ sortMenuPopupClassName ],
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(menuPopupTop) + px,
            left: String(box.left) + px,
            width: String(sortButtonWidth) + ea,
            height: "calc(" + String(sortButtonHeight * 2) + ea + " + " + String(middleBorderWidth) + px + ")",
            background: colorExtended.gradientBlue2,
            zIndex: String(zIndex),
            border: String(borderWidth) + "px solid " + colorExtended.black,
            boxSizing: "border-box",
            borderRadius: String(12) + px,
            animation: "fadeuplitereverse 0.3s ease forwards",
            opacity: String(0),
            overflow: "hidden",
            paddingTop: String(menuPopupPaddingTop / 2) + ea,
          },
          child: {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              flexDirection: "column",
              cursor: "pointer",
            },
            children: [
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: async function (e) {
                    try {

                      homeliaisonAnalytics({
                        page: instance.pageName,
                        standard: instance.firstPageViewTime,
                        action: "viewToggle",
                        data: {
                          mode: "key9",
                          toggle: "on",
                          date: dateToString(new Date(), true),
                        },
                      }).then(() => {
                        return homeliaisonAnalytics({
                          page: instance.pageName,
                          standard: instance.firstPageViewTime,
                          action: "viewToggle",
                          data: {
                            mode: "key8",
                            toggle: "off",
                            date: dateToString(new Date(), true),
                          },
                        })
                      }).catch((err) => {
                        console.log(err);
                      });

                      instance.sort = "key9";
                      instance.portfolioBlock(null, instance.search, instance.sort);

                      while (!instance.fullLoad) {
                        await sleep(500);
                      }

                      document.querySelector('.' + targetTextDomClassName).textContent = "최신순";
                      removeByClass(sortMenuPopupClassName);

                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  display: "flex",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: withOut(0, ea),
                  height: String(sortButtonHeight) + ea,
                  boxSizing: "border-box",
                  borderBottom: String(middleBorderWidth) + "px solid " + colorExtended.blueDim,
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "최신순",
                  style: {
                    fontSize: String(serviceSize) + ea,
                    fontWeight: String(700),
                    fontFamily: "pretendard",
                    position: "relative",
                    display: "inline-block",
                    top: String(tagTextTop) + ea,
                  }
                }
              },
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: async function (e) {
                    try {

                      homeliaisonAnalytics({
                        page: instance.pageName,
                        standard: instance.firstPageViewTime,
                        action: "viewToggle",
                        data: {
                          mode: "key8",
                          toggle: "on",
                          date: dateToString(new Date(), true),
                        },
                      }).then(() => {
                        return homeliaisonAnalytics({
                          page: instance.pageName,
                          standard: instance.firstPageViewTime,
                          action: "viewToggle",
                          data: {
                            mode: "key9",
                            toggle: "off",
                            date: dateToString(new Date(), true),
                          },
                        })
                      }).catch((err) => {
                        console.log(err);
                      });

                      instance.sort = "key8";
                      instance.portfolioBlock(null, instance.search, instance.sort);

                      while (!instance.fullLoad) {
                        await sleep(500);
                      }

                      document.querySelector('.' + targetTextDomClassName).textContent = "인기순";
                      removeByClass(sortMenuPopupClassName);

                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                style: {
                  display: "flex",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: withOut(0, ea),
                  height: String(sortButtonHeight) + ea,
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "인기순",
                  style: {
                    fontSize: String(serviceSize) + ea,
                    fontWeight: String(700),
                    fontFamily: "pretendard",
                    position: "relative",
                    display: "inline-block",
                    top: String(tagTextTop) + ea,
                  }
                }
              },
            ]
          }
        });

      } catch (e) {
        console.log(e);
      }
    }
  }

  filterButtonClickEvent = (index) => {
    return async function (e) {
      try {
        const friends = [ ...document.querySelectorAll('.' + searchTagsButtonClassName) ];
        const self = this;
        const box = self.getBoundingClientRect();
        const zIndex = 3;
        const thisSubject = searchTags[index];
        const thisMenu = objectDeepCopy(searchDescriptionTags[index]);
        let cancelBack;
        let menuPopup;
        let menuPopupTop;
        let thisWidth;
        let thisLeft;
        let endEvent;
        let vwTopx;

        if (desktop) {
          menuPopupTop = box.top + window.scrollY + sortButtonHeight + popupBetween;
          thisWidth = searchWidthTags[index] === 0 ? box.width : searchWidthTags[index];
          thisLeft = String(box.left + ((Math.abs(thisWidth - box.width) / 2) * -1)) + px;
        } else {
          menuPopupTop = box.top + window.scrollY + box.height + popupBetween;
          thisWidth = searchWidthTags[index] === 0 ? box.width : searchWidthTags[index];
          vwTopx = (window.innerWidth * (thisWidth / 100));
          thisLeft = String(box.left + ((Math.abs(vwTopx - box.width) / 2) * -1)) + px;
        }

        endEvent = function (e) {
          for (let dom of friends) {
            dom.style.opacity = String(1);
          }
          self.style.background = colorExtended.white;
          self.children[0].style.color = colorExtended.darkDarkShadow;
          self.children[1].querySelector("path").setAttribute("fill", colorExtended.black);
          self.style.border = String(borderWidth) + "px solid " + colorExtended.gray3;
          removeByClass(filterMenuPopupClassName);
        }

        if (thisMenu.length !== 0) {

          for (let dom of friends) {
            if (dom === self) {
              self.style.background = colorExtended.black;
              self.children[0].style.color = colorExtended.white;
              self.children[1].querySelector("path").setAttribute("fill", colorExtended.white);
              self.style.border = String(borderWidth) + "px solid " + colorExtended.black;
            } else {
              dom.style.opacity = String(0.5);
            }
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ filterMenuPopupClassName ],
            event: {
              click: function (e) {
                endEvent.call(this, e);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: String(100) + "vh",
              background: colorExtended.transparent,
              zIndex: String(zIndex),
            }
          });

          menuPopup = createNode({
            mother: totalContents,
            class: [ filterMenuPopupClassName ],
            style: {
              display: "inline-flex",
              position: "absolute",
              top: String(menuPopupTop) + px,
              left: thisLeft,
              width: String(thisWidth) + ea,
              height: "calc(" + String(sortButtonHeight * thisMenu.length) + ea + " + " + String(middleBorderWidth * (thisMenu.length - 1)) + px + ")",
              background: colorExtended.gradientBlack,
              zIndex: String(zIndex),
              borderRadius: String(12) + px,
              animation: "fadeuplitereverse 0.3s ease forwards",
              opacity: String(0),
              overflow: "hidden",
              paddingTop: String(menuPopupPaddingTop) + ea,
            },
            child: {
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                flexDirection: "column",
                cursor: "pointer",
              },
              children: thisMenu.map((item, index, arr) => {
                return {
                  style: {
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: withOut(0, ea),
                    height: String(sortButtonHeight) + ea,
                    boxSizing: "border-box",
                    borderBottom: index === arr.length - 1 ? "" : (String(middleBorderWidth) + "px solid " + colorExtended.ultimateBlack),
                  },
                  child: {
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: async function (e) {
                        try {
                          const value = this.getAttribute("item");
                          const subject = this.getAttribute("subject");

                          endEvent.call(this, e);

                          const loading = instance.mother.whiteProgressLoading(null, true, false, false);

                          ajaxJson({ subject, value, from: "portfolio" }, LOGHOST + "/searchContents", { equal: true }).then((response) => {
                            instance.portfolioBlock(null, "<<<" + response.conids.join(",") + ">>>", instance.sort);
                            instance.photoLoad = true;
                            loading.remove();
                          }).catch((err) => {
                            endEvent.call(this, e);
                          });

                          endEvent.call(this, e);
                        } catch (err) {
                          console.log(err);
                          endEvent.call(this, e);
                        }
                      }
                    },
                    attribute: {
                      item,
                      subject: thisSubject,
                    },
                    text: item,
                    style: {
                      fontSize: String(serviceSize) + ea,
                      fontWeight: String(600),
                      color: colorExtended.white,
                      fontFamily: "pretendard",
                      position: "relative",
                      display: "inline-block",
                      top: String(tagTextTop) + ea,
                    }
                  }
                }
              })
            }
          });
        } else {
          endEvent.call(this, e);
          instance.portfolioBlock(null, "", instance.sort);
          instance.photoLoad = true;
        }

      } catch (e) {
        console.log(e);
      }
    }
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      overflow: "hidden"
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
      alignItems: "center",
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
      alignItems: "end",
      paddingTop: desktop ? String(searchBarPaddingTop) + ea : String(mobileSearchWhiteBoxPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(mobileSearchWhiteBoxPaddingBottom) + ea,
      flexDirection: "row",
    },
    children: [
      {
        event: {
          selectstart: (e) => { e.preventDefault() },
          click: sortButtonClickEvent(),
        },
        attribute: {
          sort: String(0),
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(sortButtonWidth) + ea,
          height: String(sortButtonHeight) + ea,
          background: colorExtended.gradientBlue2,
          borderRadius: String(sortButtonHeight) + ea,
          border: String(borderWidth) + "px solid " + colorExtended.black,
          boxSizing: "border-box",
          marginRight: String(sortButtonBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          flexDirection: "row",
        },
        children: [
          {
            event: {
              selectstart: (e) => { e.preventDefault() },
            },
            class: [ targetTextDomClassName ],
            text: "최신순",
            style: {
              fontSize: String(serviceSize) + ea,
              fontWeight: String(700),
              fontFamily: "pretendard",
              position: "relative",
              display: "inline-block",
              top: String(tagTextTop) + ea,
            }
          },
          {
            mode: "svg",
            source: svgMaker.buttonLineArrow(colorExtended.black),
            style: {
              position: "relative",
              display: "inline-block",
              width: String(buttonArrowDownWidth) + ea,
              marginLeft: String(buttonArrowDownMarginLeft) + ea,
              transformOrigin: "50% 50%",
              transform: "rotate(90deg)",
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth - sortButtonWidth - sortButtonBetween) + ea,
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
                      dimension: {
                        search_value: this.value,
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
              fontFamily: "pretendard",
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      },
    ]
  });

  serviceChildren = [];
  serviceNum = 0;
  for (let service of searchTags) {
    serviceChildren.push({
      class: [
        serviceButtonClassName,
        searchTagsButtonClassName
      ],
      attribute: {
        toggle: "off",
        value: service,
      },
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: filterButtonClickEvent(serviceNum),
      },
      style: {
        display: "inline-flex",
        position: "relative",
        height: String(sortButtonHeight - (desktop ? (borderWidth * 2) : 0.2)) + ea,
        boxSizing: desktop ? "" : "border-box",
        marginRight: String(serviceMarginRight) + ea,
        paddingLeft: String(servicePaddingLeft) + ea,
        paddingRight: String(servicePaddingLeft) + ea,
        textAlign: "center",
        background: colorExtended.white,
        borderRadius: String(sortButtonHeight - (borderWidth * 2)) + ea,
        border: String(borderWidth) + "px solid " + colorExtended.gray3,
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transition: "all 0.3s ease",
        overflow: "visible",
        flexDirection: "row",
      },
      children: [
        {
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          text: service,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(tagTextTop) + ea,
            fontSize: String(serviceSize) + ea,
            fontFamily: "pretendard",
            fontWeight: String(600),
            color: colorExtended.darkDarkShadow,
            cursor: "pointer",
            textAlign: "center",
          },
        },
        {
          mode: "svg",
          source: svgMaker.buttonLineArrow(colorExtended.darkDarkShadow),
          style: {
            position: "relative",
            display: serviceNum === searchTags.length - 1 ? "none" : "inline-block",
            width: String(buttonArrowDownWidth) + ea,
            marginLeft: String(buttonArrowDownMarginLeft) + ea,
            transformOrigin: "50% 50%",
            transform: "rotate(90deg)",
          }
        }
      ]
    });
    serviceNum++;
  }

  if (desktop) {
    serviceBlock = createNode({
      mother: middleBox,
      style: {
        display: "block",
        position: "absolute",
        textAlign: "center",
        right: String(0) + ea,
        bottom: String(tagTongBottom) + ea,
      },
      children: serviceChildren
    });
    serviceBlock.lastChild.style.marginRight = "";
  } else {
    serviceBlock = createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        textAlign: "center",
        width: withOut(0, ea),
        overflow: "visible",
        paddingBottom: String(borderWidth * 2) + "px",
      },
      child: {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(200) + "%",
          left: String(-50) + "%",
          textAlign: "center",
          overflow: "visible",
        },
        children: serviceChildren
      }
    });
    serviceBlock.lastChild.lastChild.style.marginRight = "";
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
  photoMargin = <%% 18, 16, 16, 16, 2.5 %%>;
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
  let tagTongWidthRatio;
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
  let subInfoTextTop;
  let radiusPixel;
  let conidArr;

  if (typeof search === "string") {

    if (search === '') {
      contentsArr = this.contentsArr;

    } else if (/^\<\<\</.test(search)) {

      search = search.trim().replace(/^\<\<\</gi, '').replace(/\>\>\>$/gi, '');
      if (search === "") {
        contentsArr = [];
      } else {
        conidArr = search.split(",");
        contentsArr = this.contentsArr.toNormal().filter((o) => {
          return conidArr.includes(o.conid);
        });
      }

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
  photoMargin = <%% 18, 16, 16, 16, 2.5 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% 14, 14, 13, 12, 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 18, 15, 16, 14, 3.3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 3, 2, 2, 1, (isIphone() ? 0 : 0.3) %%>;

  photoBlockMarginBottom = <%% 65, 56, 52, 46, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

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

  baseBlock = baseTong.children[1];

  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents, service } = contentsArr[i]);

        if (desktop) {
          src = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        } else {
          src = "https://" + FILEHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
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
                backgroundSize: gsArray[i] === 'g' ? "100% 100%" : "100% 100%",
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
                        fontWeight: String(400),
                        color: colorChip.gray5,
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
                  fontFamily: "pretendard",
                }
              }
            ]
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
        backgroundType: 20,
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
