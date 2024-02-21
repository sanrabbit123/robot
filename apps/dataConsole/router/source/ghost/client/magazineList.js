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
  let mobileSearchWhiteBoxPaddingTop;
  let mobileSearchWhiteBoxPaddingBottom;
  let mobileSearchWhiteBoxMarginBottom;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 45, 32, 30, 28, 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 34, 32, 29, 5.3 %%>;
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

  searchBarPaddingTop = <%% 210, 190, 170, 156, 7 %%>;
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

  titleWording = "HL magazine<b%.%b>";
  subTitleContents = "홈리에종 서비스에 대한 상세한 안내";

  mobileBlockTop = 5.6;

  mobileSearchWhiteBoxPaddingTop = 5;
  mobileSearchWhiteBoxPaddingBottom = 5;
  mobileSearchWhiteBoxMarginBottom = 5;

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

  mobileBackgroundHeight = 58;
  mobileVisualPaddingLeft = 6;

  tagBoxRight = <%% 132, 128, 100, 100, 10 %%>;

  searchTags = [];
  if (media[0]) {
    searchTags.push("패브릭");
    searchTags.push("인테리어");
    searchTags.push("전환");
    searchTags.push("전체");
  } else if (media[1]) {
    searchTags.push("패브릭");
    searchTags.push("인테리어");
    searchTags.push("전환");
    searchTags.push("전체");
  } else if (media[2]) {
    searchTags.push("패브릭");
    searchTags.push("인테리어");
    searchTags.push("전환");
  } else if (media[3]) {
    searchTags.push("패브릭");
    searchTags.push("인테리어");
    searchTags.push("전환");
  } else if (media[4]) {
    searchTags.push("패브릭");
    searchTags.push("인테리어");
    searchTags.push("전환");
    searchTags.push("전체");
  }

  placeholder = "집";

  serviceButtonClassName = "serviceButton";

  // if (mobile) {
  //   instance.mother.backgroundImageBox.style.height = String(mobileBackgroundHeight) + ea;
  // }

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
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
          wordSpacing: String(2) + "px",
        },
        bold: {
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
          opacity: String(0.4),
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

                    instance.magazineList(instance.search);

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

          instance.magazineList(instance.search);

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
        background: desktop ? colorChip.gray2 : colorChip.gray1,
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
            fontWeight: String(desktop ? 400 : 500),
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
      display: "block",
      position: desktop ? "absolute" : "relative",
      textAlign: "center",
      right: String(0) + ea,
      bottom: desktop ? String(tagTongBottom) + ea : "",
      marginTop: mobile ? String(3) + ea : "",
    },
    children: serviceChildren
  });
  for (let dom of serviceBlock.children) {
    dom.firstChild.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width + 1)) + "px";
    dom.style.width = String(Math.ceil(dom.firstChild.getBoundingClientRect().width) + 1) + "px";
  }
  serviceBlock.lastChild.style.marginRight = "";

}

MagazineListJs.prototype.magazineList = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, designerMthParsing, selfHref } = GeneralJs;
  const { ea, media, magazines, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const small = (media[3] || media[4]);
  const big = !small;
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
  let tagTong;
  let editorSize;
  let tagBoxHeight, tagBoxPadding, tagBoxBetween;
  let tagSize, tagWeight, tagTextTop;
  let categorySize, categoryWeight;
  let colorBarBottom, colorBarHeight, colorBarLeft, colorBarOpacity;
  let categoryDom;
  let brightMode;
  let targetMagazines;
  let baseChildren;

  if (search === null || search === "" || search === undefined || search === "전체") {
    targetMagazines = magazines;
  } else if (typeof search === "string" && search.trim() !== '' && search.trim() !== "전체") {
    targetMagazines = magazines.filter((obj) => { return obj.contents.tag.map((str) => { return new RegExp(str, "gi") }).some((r) => { return r.test(search); }) });
  } else {
    targetMagazines = magazines;
  }

  baseChildren = [ ...instance.baseTong.children ];
  for (let i = 0; i < baseChildren.length; i++) {
    if (i !== 0) {
      baseChildren[i].remove();
    }
  }

  whiteBottomMargin = <%% 16, 16, 16, 16, 2 %%>;

  innerPadding = <%% 40, 36, 32, 28, 6 %%>;

  finalBottom = <%% 240, 240, 240, 240, 40 %%>;

  wordsLimit = <%% 163, 110, 100, 75, 65 %%>;

  imageHeight = <%% 260, 210, 180, 160, 42 %%>;
  imageWidth = <%% 483, 390, 330, 297, 48 %%>;

  imageBetween = <%% 40, 36, 32, 24, 5 %%>;

  barBetween = <%% 16, 12, 10, 8, 2.5 %%>;

  wordsBoxPaddingTop = <%% 40, 22, 16, 16, 5 %%>;

  titleSize = <%% 23, 22, 20, 17, 4.2 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsSize = <%% 14, 14, 13, 11, 3 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  editorSize = <%% 12, 12, 11, 10, 2.5 %%>;

  tagBoxHeight = <%% 28, 28, 24, 24, 5.6 %%>;
  tagBoxPadding = <%% 12, 12, 10, 10, 2 %%>;
  tagBoxBetween = <%% 5, 5, 4, 4, 0.5 %%>;

  tagSize = <%% 11, 11, 10, 10, 2.5 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;
  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;

  categorySize = <%% 14, 13, 12, 11, 2.6 %%>;
  categoryWeight = <%% 400, 400, 400, 400, 400 %%>;

  colorBarBottom = <%% -1, -1, -1, -1, -0.3 %%>;
  colorBarHeight = <%% 6, 6, 6, 6, 1.4 %%>;
  colorBarLeft = <%% 1.5, 1.5, 1.5, 1.5, 0 %%>;
  colorBarOpacity = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;

  staticPath = FRONTHOST + "/list_image/magaz";

  for (let magazine of targetMagazines) {

    brightMode = (Math.random() < 0.5);

    thisPath = staticPath + magazine.mid;

    whiteBlock = createNode({
      mother: baseTong,
      event: {
        click: function (e) {
          selfHref(FRONTHOST + "/magdetail.php?mid=" + magazine.mid);
        }
      },
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
        flexDirection: desktop ? "row" : "column",
        cursor: "pointer",
      }
    });

    imageBox = createNode({
      mother: whiteBlock,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        borderRadius: String(5) + "px",
        backgroundPosition: "50% 50%",
        backgroundSize: desktop ? "100% 100%" : "100% auto",
        backgroundImage: "url('" + thisPath + magazine.contents.init[desktop ? 0 : 1] + "')",
        height: String(imageHeight) + ea,
        width: desktop ? String(imageWidth) + ea : String(100) + '%',
        marginRight: String(imageBetween) + ea,
      }
    });

    wordsBox = createNode({
      mother: whiteBlock,
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        paddingTop: String(wordsBoxPaddingTop) + ea,
        height: desktop ? String(imageHeight - wordsBoxPaddingTop) + ea : "",
        width: desktop ? withOut(imageWidth + imageBetween, ea) : "",
        flexDirection: "column",
      }
    });

    if (mobile) {
      createNode({
        mother: wordsBox,
        text: "<b%" + magazine.contents.category + "%b>&nbsp;&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;&nbsp;" + magazine.contents.tag.join(", "),
        style: {
          position: "relative",
          fontSize: String(2.5) + ea,
          fontWeight: String(300),
          color: colorChip.shadow,
          lineHeight: String(contentsLineHeight),
          marginBottom: String(1) + ea,
        },
        under: {
          fontSize: String(2.5) + ea,
          fontWeight: String(300),
          color: colorChip.deactive,
        },
        bold: {
          fontSize: String(2.5) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      });
    }

    createNode({
      mother: wordsBox,
      text: desktop ? magazine.contents.detail[0].text.join("\n") : magazine.contents.detail[0].text.join(" "),
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
      text: big ? "<b%작성일%b> : " + dateToString(magazine.date) + blank + "<b%에디터%b> : " + magazine.editor : "<b%에디터%b> : " + magazine.editor,
      style: {
        display: desktop ? "inline-block" : "none",
        position: "absolute",
        bottom: String(0),
        left: String(0),
        fontSize: String(editorSize) + ea,
        fontWeight: String(contentsWeight),
        color: colorChip.black,
        lineHeight: String(contentsLineHeight),
      },
      under: {
        fontSize: String(editorSize) + ea,
        fontWeight: String(contentsWeight),
        color: colorChip.gray4,
      },
      bold: {
        fontSize: String(editorSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    });

    if (desktop) {

      // tag
      tagTong = createNode({
        mother: wordsBox,
        style: {
          display: desktop ? "inline-block" : "block",
          position: desktop ? "absolute" : "relative",
          bottom: desktop ? String(0) : "",
          right: desktop ? String(0) : "",
          marginTop: desktop ? "" : String(imageBetween) + ea,
          textAlign: desktop ? "left" : "right",
        }
      })

      if (media[3]) {
        magazine.contents.tag.pop();
      }

      for (let tag of magazine.contents.tag) {
        createNode({
          mother: tagTong,
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(tagBoxHeight) + ea,
            paddingLeft: String(tagBoxPadding) + ea,
            paddingRight: String(tagBoxPadding) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginLeft: desktop ? String(tagBoxBetween) + ea : "",
            marginRight: mobile ? String(tagBoxBetween) + ea : "",
          },
          children: [
            {
              text: "<b%#%b> " + tag,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tagSize) + ea,
                fontWeight: String(tagWeight),
                color: colorChip.black,
                top: String(tagTextTop) + ea,
              },
              bold: {
                fontSize: String(tagSize) + ea,
                fontWeight: String(400),
                color: colorChip.deactive,
              }
            }
          ]
        })
      }

      // category
      categoryDom = createNode({
        mother: wordsBox,
        style: {
          display: "inline-block",
          position: "absolute",
          left: desktop ? "" : String(0),
          right: desktop ? String(0) : "",
          top: desktop ? String(0) : "",
          bottom: desktop ? "" : String(0),
        },
        children: [
          {
            style: {
              display: desktop ? "block" : "flex",
              alignItems: desktop ? "" : "center",
              position: "relative",
              top: String(0),
              left: String(0),
              width: desktop ? withOut(0) : "",
              height: desktop ? withOut(0) : String(tagBoxHeight) + ea,
              paddingLeft: mobile ? String(tagBoxPadding) + ea : "",
              paddingRight: mobile ? String(tagBoxPadding) + ea : "",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "absolute",
                  bottom: desktop ? String(colorBarBottom) + ea : String(0),
                  height: desktop ? String(colorBarHeight) + ea : withOut(0),
                  width: desktop ? "calc(100% + " + String(colorBarLeft * 2) + ea + ")" : withOut(0),
                  left: desktop ? String(-1 * colorBarLeft) + ea : String(0),
                  background: (brightMode ? colorChip.yellow : colorChip.red),
                  opacity: String(colorBarOpacity),
                  borderRadius: String(3) + "px",
                }
              },
              {
                text: magazine.contents.category,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(categorySize) + ea,
                  fontWeight: String(categoryWeight),
                  top: desktop ? "" : String(colorBarBottom) + ea,
                  fontFamily: "graphik",
                  color: desktop ? colorChip.black : (brightMode ? colorChip.black : colorChip.white),
                }
              }
            ]
          }
        ]
      });
    }

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
      mode: "black",
      name: "magazineList",
      client: null,
      base: {
        instance: this,
        binaryPath: MagazineListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 10,
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
