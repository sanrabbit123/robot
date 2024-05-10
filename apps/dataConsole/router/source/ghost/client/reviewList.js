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
      "return ('홈리에종 고객 리뷰 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 고객 리뷰 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewList",
  "hangul": "리뷰 리스트",
  "route": [
    "reviewList",
    "RL"
  ]
} %/%/g

const ReviewListJs = function () {
  this.mother = new GeneralJs();
}

ReviewListJs.binaryPath = FRONTHOST + "/middle/review";

ReviewListJs.prototype.generateGsArray = function (number) {
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

ReviewListJs.prototype.insertInitBox = function () {
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
  
  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 36, 36, 35, 30, 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 26, 23, 22, 19, 5 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 18, 18, 14, 13, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 14, 14, 13, 12, 3.3 %%>;
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

  tagTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? 0.51 : 0), (isMac() ? -0.5 : 0), -0.3 %%>;
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "SERVICE REVIEW<b%.%b>";
  subTitleContents = "홈리에종 리뷰";

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

  mobileTitlePaddingTop = 2;

  blackTitleMarginLeft = <%% 12, 11, 8, 7, 1 %%>;
  blackTitleTextTop = <%% (isMac() ? -2 : 0.5), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0.5), (isIphone() ? -0.7 : -0.1) %%>;

  sortButtonWidth = <%% 90, 90, 90, 90, 90 %%>;
  sortButtonBetween = <%% 16, 16, 16, 16, 16 %%>;
  sortButtonHeight = <%% searchBarHeight - 1, searchBarHeight - 1, searchBarHeight - 1, searchBarHeight - 1, searchBarHeight - 1 %%>;

  numbersTotalHeight = <%% 138, 138, 138, 138, 138 %%>;
  borderWidth = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  borderWidthLight = 1;
  numbersMaxWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;
  numbersRadius = <%% 12, 12, 12, 12, 12 %%>;
  numbersBoxMarginTop = <%% 15, 15, 15, 15, 15 %%>;
  numbersBoxMarginBottom = <%% 46, 46, 46, 46, 46 %%>;

  numbersBoxPaddingLeft = <%% 42, 42, 42, 42, 42 %%>;
  numbersBoxPaddingRight = <%% 36, 36, 36, 36, 36 %%>;
  numbersBoxBarMargin = <%% 36, 36, 36, 36, 36 %%>;
  numbersMiddleBarHeight = <%% 100, 100, 100, 100, 100 %%>;

  numbersMargin = <%% 20, 20, 20, 20, 20 %%>;

  numbersImageWidth0 = <%% 80, 80, 80, 80, 80 %%>;
  numbersImageWidth1 = <%% 95, 95, 95, 95, 95 %%>;
  numbersImageWidth2 = <%% 110, 110, 110, 110, 110 %%>;
  numbersImageWidth3 = <%% 80, 80, 80, 80, 80 %%>;

  numbersImageTop0 = <%% 8, 8, 8, 8, 8 %%>;
  numbersImageTop1 = <%% 2, 2, 2, 2, 2 %%>;
  numbersImageTop2 = <%% 7, 7, 7, 7, 7 %%>;
  numbersImageTop3 = <%% 7, 7, 7, 7, 7 %%>;

  numbersWidth0 = <%% 140, 140, 140, 140, 140 %%>;
  numbersWidth1 = <%% 140, 140, 140, 140, 140 %%>;
  numbersWidth2 = <%% 140, 140, 140, 140, 140 %%>;
  numbersWidth3 = <%% 110, 110, 110, 110, 110 %%>;

  numbersTextSize = <%% 38, 38, 38, 38, 38 %%>;
  numbersTextWeight = <%% 700, 700, 700, 700, 700 %%>;

  numbersDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  numbersDescriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
  numbersDescriptionTextTop = <%% -5, -5, -5, -5, -5 %%>;

  buttonArrowDownWidth = <%% 6, 6, 6, 6, 6 %%>;
  buttonArrowDownMarginLeft = <%% 10, 10, 10, 10, 10 %%>;

  menuPopupPaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  popupBetween = 6;
  middleBorderWidth = 1;

  numbersMiddleTitleContents0 = "282";
  numbersMiddleTitleContents1 = "4.7";
  numbersMiddleTitleContents2 = "3447";
  numbersMiddleTitleContents3 = "82";

  numbersDescriptionContents0 = "282개의 고객 평가";
  numbersDescriptionContents1 = "5점 만점 4.7 만족도";
  numbersDescriptionContents2 = "3447건의 프로젝트";
  numbersDescriptionContents3 = "82명의 디자이너";

  searchTags = [];
  searchTags.push("평수");
  searchTags.push("예산");
  searchTags.push("서비스 종류");
  searchTags.push("서비스 기간");
  searchTags.push("지역");
  searchTags.push("전체");

  searchWidthTags = [];
  searchWidthTags.push(<&& 96 | 96 | 96 | 96 | 96 &&>);
  searchWidthTags.push(<&& 120 | 120 | 120 | 120 | 120 &&>);
  searchWidthTags.push(<&& 132 | 132 | 132 | 132 | 132 &&>);
  searchWidthTags.push(<&& 0 | 0 | 0 | 0 | 0 &&>);
  searchWidthTags.push(<&& 100 | 100 | 100 | 100 | 100 &&>);
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

        menuPopupTop = box.top + window.scrollY + sortButtonHeight + popupBetween;

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

        menuPopupTop = box.top + window.scrollY + sortButtonHeight + popupBetween;
        thisWidth = searchWidthTags[index] === 0 ? box.width : searchWidthTags[index];
        thisLeft = box.left + ((Math.abs(thisWidth - box.width) / 2) * -1);

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
              left: String(thisLeft) + px,
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

                          ajaxJson({ subject, value, from: "review" }, LOGHOST + "/searchContents", { equal: true }).then((response) => {
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

  numbersBox = createNode({
    mother: whiteBlock,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersMaxWidth) + ea,
      marginTop: String(numbersBoxMarginTop) + ea,
      marginBottom: String(numbersBoxMarginBottom) + ea,
      height: String(numbersTotalHeight) + ea,
      borderRadius: String(numbersRadius) + "px",
      border: String(borderWidth) + "px solid " + colorExtended.black,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: String(numbersBoxPaddingLeft) + ea,
      paddingRight: String(numbersBoxPaddingRight) + ea,
      boxSizing: "border-box",
    }
  });

  createNode({
    mother: numbersBox,
    mode: "img",
    attribute: {
      src: ReviewListJs.binaryPath + "/source0.svg",
    },
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersImageWidth0) + ea,
      top: String(numbersImageTop0) + ea,
    }
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      height: String(numbersTotalHeight) + ea,
      width: String(numbersWidth0) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: String(numbersMargin) + ea,
    },
    children: [
      {
        text: numbersMiddleTitleContents0,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersTextSize) + ea,
          fontWeight: String(numbersTextWeight),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      },
      {
        text: numbersDescriptionContents0,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersDescriptionSize) + ea,
          fontWeight: String(numbersDescriptionWeight),
          top: String(numbersDescriptionTextTop) + ea,
          fontFamily: "pretendard",
          color: colorExtended.black,
        }
      }
    ],
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersBoxBarMargin) + ea,
      height: String(numbersMiddleBarHeight) + ea,
      borderRight: "1px solid " + colorExtended.gray3,
      marginRight: String(numbersBoxBarMargin) + ea,
      boxSizing: "border-box",
    }
  });

  createNode({
    mother: numbersBox,
    mode: "img",
    attribute: {
      src: ReviewListJs.binaryPath + "/source1.svg",
    },
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersImageWidth1) + ea,
      top: String(numbersImageTop1) + ea,
    }
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      height: String(numbersTotalHeight) + ea,
      width: String(numbersWidth1) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: String(numbersMargin) + ea,
    },
    children: [
      {
        text: numbersMiddleTitleContents1,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersTextSize) + ea,
          fontWeight: String(numbersTextWeight),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      },
      {
        text: numbersDescriptionContents1,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersDescriptionSize) + ea,
          fontWeight: String(numbersDescriptionWeight),
          top: String(numbersDescriptionTextTop) + ea,
          fontFamily: "pretendard",
          color: colorExtended.black,
        }
      }
    ],
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersBoxBarMargin) + ea,
      height: String(numbersMiddleBarHeight) + ea,
      borderRight: "1px solid " + colorExtended.gray3,
      marginRight: String(numbersBoxBarMargin) + ea,
      boxSizing: "border-box",
    }
  });

  createNode({
    mother: numbersBox,
    mode: "img",
    attribute: {
      src: ReviewListJs.binaryPath + "/source2.svg",
    },
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersImageWidth2) + ea,
      top: String(numbersImageTop2) + ea,
    }
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      height: String(numbersTotalHeight) + ea,
      width: String(numbersWidth2) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: String(numbersMargin) + ea,
    },
    children: [
      {
        text: numbersMiddleTitleContents2,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersTextSize) + ea,
          fontWeight: String(numbersTextWeight),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      },
      {
        text: numbersDescriptionContents2,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersDescriptionSize) + ea,
          fontWeight: String(numbersDescriptionWeight),
          top: String(numbersDescriptionTextTop) + ea,
          fontFamily: "pretendard",
          color: colorExtended.black,
        }
      }
    ],
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersBoxBarMargin) + ea,
      height: String(numbersMiddleBarHeight) + ea,
      borderRight: "1px solid " + colorExtended.gray3,
      marginRight: String(numbersBoxBarMargin) + ea,
      boxSizing: "border-box",
    }
  });
  
  createNode({
    mother: numbersBox,
    mode: "img",
    attribute: {
      src: ReviewListJs.binaryPath + "/source3.svg",
    },
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(numbersImageWidth3) + ea,
      top: String(numbersImageTop3) + ea,
    }
  });
  createNode({
    mother: numbersBox,
    style: {
      display: "inline-flex",
      position: "relative",
      height: String(numbersTotalHeight) + ea,
      width: String(numbersWidth3) + ea,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: String(numbersMargin) + ea,
    },
    children: [
      {
        text: numbersMiddleTitleContents3,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersTextSize) + ea,
          fontWeight: String(numbersTextWeight),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      },
      {
        text: numbersDescriptionContents3,
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          fontSize: String(numbersDescriptionSize) + ea,
          fontWeight: String(numbersDescriptionWeight),
          top: String(numbersDescriptionTextTop) + ea,
          fontFamily: "pretendard",
          color: colorExtended.black,
        }
      }
    ],
  });

  numbersBox.style.width = "auto";
  multiplyNumber = (standardWidth / ((numbersBoxPaddingLeft + numbersBoxPaddingRight) + (numbersBoxBarMargin * 6) + (numbersImageWidth0 + numbersImageWidth1 + numbersImageWidth2 + numbersImageWidth3) + (numbersMargin * 4) + (numbersWidth0 + numbersWidth1 + numbersWidth2 + numbersWidth3) + (borderWidth * 2)));
  numbersBox.style.transform = "scale(" + String(multiplyNumber) + ")";
  numbersBox.style.transformOrigin = "0% 0%";

  middleBox = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: desktop ? "left" : "center",
      alignItems: desktop ? "end" : "center",
      paddingTop: desktop ? String(searchBarPaddingTop) + ea : String(mobileSearchWhiteBoxPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(mobileSearchWhiteBoxPaddingBottom) + ea,
      flexDirection: mobile ? "column" : "row",
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
        height: String(sortButtonHeight - (borderWidth * 2)) + ea,
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
  serviceBlock.lastChild.style.marginRight = "";

}

ReviewListJs.prototype.insertPortfolioBase = function () {
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
  photoMargin = <%% 18, 18, 18, 16, 3 %%>;
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

ReviewListJs.prototype.portfolioBlock = function (limitLength, search = null, sort = "key9") {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref, autoComma } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { designers } = this;
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
  let contentsArrCopied;
  let attach;
  let tagBlock;
  let subTitleMarginTop;
  let subTitleSize;
  let reviewSubTitleVisual;
  let arrowWidth;
  let arrowHeight;
  let arrowBottom;
  let arrowReviewBottom;
  let subTitleTextTop;
  let contentsArr;
  let radiusPixel;
  let titleSubSize;
  let titleSubMarginTop;
  let alpha;
  let montTitleSize;
  let borderWidthLight;
  let thisPyeong, thisBudget;
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
        target.push(obj.contents.portfolio.spaceInfo.space);
        target.push(obj.contents.portfolio.spaceInfo.region);
        target.push(obj.contents.portfolio.spaceInfo.method);
        target.push(obj.contents.review.title.main);
        target.push(obj.contents.review.title.sub);
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

  contentsArr = equalJson(JSON.stringify(contentsArr)).filter((obj) => { return obj.contents.review.detailInfo.photodae.length > 1 && obj.contents.review.title.main !== "" });
  if (sort === "key9") {
    contentsArr.sort((a, b) => {
      return Number(b.contents.review.detailInfo.order) - Number(a.contents.review.detailInfo.order);
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
  photoMargin = <%% 18, 18, 17, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% 12, 12, 12, 12, 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 8 : 7), (isMac() ? 7 : 6.5), (isMac() ? 7 : 6.5), (isMac() ? 6 : 5), (isIphone() ? 1.4 : 1.2) %%>;

  titleSize = <%% 17, 17, 17, 15, 3.4 %%>;
  montTitleSize = <%% 20, 20, 20, 18, 3.4 %%>;
  titleWeight = <%% 400, 400, 400, 400, 400 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  titleSubSize = <%% 14, 12, 12, 11, 2.5 %%>;
  titleSubMarginTop = <%% 0, 0, 0, 0, -0.4 %%>;

  photoBlockMarginBottom = <%% 65, 60, 48, 40, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongMarginTop = <%% 11, 11, 10, 8, 1.4 %%>;
  tagTongWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  subTitleMarginTop = <%% 2, 2, 2, 2, 0.2 %%>;
  subTitleSize = <%% 13, 12, 12, 11, 2.5 %%>;
  subTitleTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 0), 0 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  arrowWidth = <%% 32, 28, 28, 26, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 5, 5, 4, 3, 1 %%>;
  arrowReviewBottom = <%% (isMac() ? 6 : 7), (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), 1.5 %%>;

  baseBlock = baseTong.children[1];

  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  borderWidthLight = 1;

  alpha = 3;

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents } = contentsArr[i]);

        if (desktop) {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        } else {
          src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.review.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
        }

        title = contents.portfolio.spaceInfo.space;
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

        thisPyeong = String(contents.portfolio.spaceInfo.pyeong) + "PY";
        thisBudget = "<u%" + autoComma(Number(contents.portfolio.spaceInfo.budget.replace(/[^0-9]/gi, '').trim())) + "%u> " + "<b%" + contents.portfolio.spaceInfo.budget.replace(/[^조억만원]/gi, '').trim() + "대" + "%b>";
      
        block = createNode({
          mother: baseBlock,
          attribute: {
            pid: contents.portfolio.pid,
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
            width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
            marginRight: String(photoMargin) + ea,
            marginBottom: String(photoBlockMarginBottom) + ea,
            verticalAlign: "top",
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
                overflow: "hidden",
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  left: String(0),
                  top: String(0),
                  overflow: "hidden",
                },
                children: [
                  {
                    style: {
                      display: "block",
                      position: "relative",
                      width: String(500) + '%',
                      left: String(0),
                      top: String(0),
                    },
                    child: {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(titleSize) + ea,
                        fontFamily: "pretendard",
                        fontWeight: String(titleWeight),
                        color: colorExtended.black,
                        verticalAlign: "top",
                        background: colorExtended.white,
                      },
                      special: {
                        fontSize: String(titleSize) + ea,
                        fontFamily: "pretendard",
                        fontWeight: String(400),
                        color: colorExtended.gray3,
                      },
                    }
                  },
                  {
                    text: thisPyeong + "&nbsp;&nbsp;&nbsp;" + thisBudget,
                    style: {
                      display: "inline-block",
                      position: "absolute",
                      fontSize: String(montTitleSize) + ea,
                      fontFamily: "mont",
                      fontWeight: String(700),
                      color: colorExtended.deactive,
                      background: colorExtended.white,
                      verticalAlign: "top",
                      top: String(0) + ea,
                      right: String(0) + ea,
                      paddingLeft: String(10) + ea,
                    },
                    bold: {
                      fontSize: String(titleSize) + ea,
                      fontFamily: "pretendard",
                      fontWeight: String(800),
                      color: colorExtended.black,
                      position: "relative",
                      top: String(-1) + ea,
                    },
                    under: {
                      fontSize: String(montTitleSize) + ea,
                      fontFamily: "mont",
                      fontWeight: String(700),
                      color: colorExtended.black,
                      position: "relative",
                      top: String(-0.5) + ea,
                    },
                  },
                ]
              }
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
              background: colorExtended.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
            },
            children: [
              {
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorExtended.black,
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

ReviewListJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, colorExtended, setDebounce } = GeneralJs;
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

    response = await ajaxJson({ mode: "review", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.sort = "key9";
    this.search = "";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewList",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 20,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPortfolioBase();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewListJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
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
      ajaxJson({ mode: "review" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;

        if (typeof getObj.search === "string") {
          if (document.querySelector("input") !== null) {
            instance.portfolioBlock(null, getObj.search, instance.sort);
            instance.photoLoad = true;
          }
        }

      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "ReviewListJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}