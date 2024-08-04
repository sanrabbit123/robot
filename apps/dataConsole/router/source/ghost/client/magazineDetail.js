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
      "return ('홈리에종 매거진 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 매거진 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "magazineDetail",
  "hangul": "매거진 상세",
  "route": [
    "magazineDetail"
  ]
} %/%/g

const MagazineDetailJs = function () {
  this.mother = new GeneralJs();
}

MagazineDetailJs.binaryPath = "https://" + FILEHOST + "/list_image/magaz";

MagazineDetailJs.prototype.magazineInitBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : (num < 100 ? String(num) : String(num).slice(-2)) };
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let logoBottom, logoLeft, logoWidth;
  let wordingSize, wordingWeight;
  let wordingBottom, wordingLeft;
  let contents;
  let mainTitleSize;
  let mainTitleWeight;
  let mainTitleTextTop;
  let whiteBoxPadding;
  let whiteBoxLeft;
  let whiteBoxHeight;
  let editorSize;
  let editorWeight;
  let editorMarginLeft;
  let editorTextTop;

  ({ contents, editor } = this.magazine);

  mainHeight = <%% 800, 750, 710, 590, 64 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  logoBottom = <%% 48, 48, 48, 48, 48 %%>;
  logoLeft = <%% 50, 50, 50, 50, 50 %%>;
  logoWidth = <%% 33, 33, 33, 33, 33 %%>;

  wordingBottom = <%% 44, 44, 40, 32, 44 %%>;
  wordingLeft = <%% 44, 44, 40, 32, 44 %%>;
  wordingSize = <%% 18, 18, 16, 14, 18 %%>;
  wordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleSize = <%% 24, 24, 22, 20, 5 %%>;
  mainTitleWeight = <%% 900, 900, 900, 900, 900 %%>;
  mainTitleTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.2 %%>;

  whiteBoxPadding = <%% 36, 36, 32, 30, 6 %%>;
  whiteBoxLeft = <%% 60, 60, 48, 40, 0 %%>;
  whiteBoxHeight = <%% 128, 128, 116, 108, 27 %%>;

  editorSize = <%% 13, 13, 13, 12, 2.5 %%>;
  editorWeight = <%% 400, 400, 400, 400, 400 %%>;
  editorMarginLeft = <%% 50, 50, 50, 40, 5.2 %%>;
  editorTextTop = <%% (isMac() ? 19 : 20), (isMac() ? 19 : 20), (isMac() ? 18 : 19), (isMac() ? 17 : 17), 4.4 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray0,
      paddingTop: String(naviHeight) + "px",
      height: String(mainHeight) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
      zIndex: desktop ? "" : String(1),
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          background: colorChip.gray1,
          bottom: String(0),
          left: String(0),
          height: String(mainBelowBarHeight) + ea,
          width: String(100) + '%',
        }
      }
    ]
  });

  contentsBox = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(contentsBoxTop) + ea,
      width: desktop ? String(contentsBoxWidth) + ea : String(100) + '%',
      left: desktop ? "calc(50% - " + String(contentsBoxWidth / 2) + ea + ")" : String(0),
      top: String(0),
      height: String(mainHeight - (contentsBoxTop * 2)) + ea,
    }
  });

  picture = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-block" : "block",
      position: desktop ? "relative" : "absolute",
      width: withOut(0),
      height: desktop ? String(pictureHeight) + ea : String(100) + '%',
      borderRadius: desktop ? String(5) + "px" : "",
      backgroundImage: "url('" + MagazineDetailJs.binaryPath + this.mid + contents.init[desktop ? 0 : 1] + "')",
      backgroundSize: desktop ? "auto 100%" : "100% auto",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: picture,
    style: {
      display: "inline-flex",
      position: "relative",
      top: desktop ? withOut((whiteBoxHeight + whiteBoxLeft), ea) : String(51) + ea,
      left: String(whiteBoxLeft) + ea,
      height: String(whiteBoxHeight) + ea,
      paddingLeft: String(whiteBoxPadding) + ea,
      paddingRight: String(whiteBoxPadding) + ea,
      overflow: desktop ? "hidden" : "",
      justifyContent: "left",
      alignItems: "center",
      textAlign: "left",
    },
    children: [
      {
        class: [ "backblurwhite" ],
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          borderRadius: desktop ? String(8) + "px" : "",
          borderTopRightRadius: String(8) + "px",
          borderBottomRightRadius: String(8) + "px",
          background: desktop ? "" : colorChip.white,
          boxShadow: desktop ? "" : "0px 0px 15px -9px " + colorChip.shadow,
        }
      },
      {
        text: contents.detail[0].text.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          textAlign: "left",
          fontSize: String(mainTitleSize) + ea,
          fontWeight: String(mainTitleWeight),
          color: colorChip.black,
          top: String(mainTitleTextTop) + ea,
          lineHeight: String(1.5),
          verticalAlign: "top",
        }
      },
      {
        text: "<b%editor%b>&nbsp;&nbsp;" + editor,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(editorSize) + ea,
          fontWeight: String(editorWeight),
          color: colorChip.black,
          verticalAlign: "top",
          marginLeft: String(editorMarginLeft) + ea,
          top: String(editorTextTop) + ea,
        },
        bold: {
          fontSize: String(editorSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      }
    ]
  });

}

MagazineDetailJs.prototype.magazineContentsBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue } = GeneralJs;
  const { totalContents, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainWidth;
  let mainPaddingTop;
  let titleSize;
  let titleWeight;
  let titleLineHeight;
  let titleBarMarginTop;
  let titleBarWidth;
  let contentsSize;
  let contentsWeight;
  let contentsLineHeight;
  let mainTong;
  let titleBarMarginBottom;
  let photoMargin;
  let blankMarginFirst;
  let blankMargin;
  let blankMargin2;
  let blankMarginLast;
  let contentsMarginBottom;
  let binaryPath;
  let contents;
  let type;
  let mobileDescriptionPadding;
  let editorTextTop;
  let editorBetween;
  let num;
  let grayTong;
  let subMargin;
  let middleSize;
  let halfBlankMargin;

  binaryPath = MagazineDetailJs.binaryPath + this.mid;
  ({ contents, editor } = this.magazine);

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;
  titleBarMarginBottom = <%% 36, 36, 36, 36, 5.5 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsMarginBottom = <%% 36, 36, 36, 36, 6 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  halfBlankMargin = <%% 50, 50, 50, 40, 8 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  subMargin = <%% 25, 25, 25, 20, 3 %%>;
  middleSize = <%% 20, 20, 20, 18, 4 %%>;

  editorBetween = <%% 8, 8, 8, 7, 1.5 %%>;
  editorTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  mobileDescriptionPadding = 6;

  grayTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0),
      paddingTop: String(mainPaddingTop + (desktop ? 0 : 13.5)) + ea,
      paddingBottom: desktop ? "" : String(mainPaddingTop) + ea,
      background: desktop ? "" : colorChip.gray1,
      animation: "fadeupdelay 0.5s ease forwards",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: String(mainWidth) + ea,
          left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
        }
      }
    ]
  });

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      paddingBottom: String(desktop ? 200 : 30) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  num = 0;
  for (let obj of contents.detail) {
    if (num !== 0) {
      type = obj.type;

      if (/^blank/i.test(type)) {
        if (mobile && num === 2 && type === "blankImage") {
          // pass
        } else {
          createNode({
            mother: mainTong,
            style: {
              display: "block",
              height: String(blankMargin) + ea,
            }
          });
        }
      } else if (/^double/i.test(type)) {
        if (mobile && num === 2 && type === "doubleImage") {
          // pass
        } else {
          createNode({
            mother: mainTong,
            style: {
              display: "block",
              height: String(blankMargin * 2) + ea,
            }
          });
        }
      } else if (/^half/i.test(type)) {
        if (mobile && num === 2 && type === "halfImage") {
          // pass
        } else {
          createNode({
            mother: mainTong,
            style: {
              display: "block",
              height: String(halfBlankMargin) + ea,
            }
          });
        }
      }

      if (type.replace(/^general/i, '').replace(/^blank/i, '').replace(/^double/i, '').replace(/^half/i, '') === "Title") {
        createNode({
          mother: mainTong,
          text: obj.text.join("\n"),
          style: {
            display: "block",
            position: "relative",
            textAlign: "center",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            lineHeight: String(titleLineHeight),
            color: colorChip.black,
          }
        });
        createNode({
          mother: mainTong,
          style: {
            display: "block",
            position: "relative",
            textAlign: "center",
            marginTop: String(titleBarMarginTop) + ea,
            marginBottom: String(titleBarMarginBottom) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                width: String(titleBarWidth) + ea,
                borderBottom: "1px solid " + colorChip.gray3,
              }
            }
          ]
        });
      } else if (type.replace(/^general/i, '').replace(/^blank/i, '').replace(/^double/i, '').replace(/^half/i, '') === "Description") {
        createNode({
          mother: (num === 1 ? grayTong.firstChild : mainTong),
          text: obj.text.join("\n\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            color: colorChip.black,
            lineHeight: String(contentsLineHeight),
            width: withOut(desktop ? 0 : (mobileDescriptionPadding * 2), ea),
            paddingLeft: mobile ? String(mobileDescriptionPadding) + ea : 0,
            paddingRight: mobile ? String(mobileDescriptionPadding) + ea : 0,
          }
        });
      } else if (type.replace(/^general/i, '').replace(/^blank/i, '').replace(/^double/i, '').replace(/^half/i, '') === "Image") {
        if (obj.gs === 'g') {
          createNode({
            mother: mainTong,
            mode: "img",
            attribute: { src: binaryPath + obj.source[desktop ? 0 : 1] },
            event: {
              contextmenu: (e) => { e.preventDefault(); },
              selectstart: (e) => { e.preventDefault(); }
            },
            style: {
              width: withOut(0),
              display: "inline-block",
              marginBottom: String(photoMargin) + ea,
              marginRight: String(0) + ea,
              borderRadius: String(desktop ? 3 : 0) + "px",
            }
          });
        } else {
          createNode({
            mother: mainTong,
            mode: "img",
            attribute: { src: binaryPath + obj.source[desktop ? 0 : 1][0] },
            event: {
              contextmenu: (e) => { e.preventDefault(); },
              selectstart: (e) => { e.preventDefault(); }
            },
            style: {
              width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
              display: "inline-block",
              marginRight: String(photoMargin) + ea,
              marginBottom: String(photoMargin) + ea,
              borderRadius: String(desktop ? 3 : 0) + "px",
            }
          });
          createNode({
            mother: mainTong,
            mode: "img",
            attribute: { src: binaryPath + obj.source[desktop ? 0 : 1][1] },
            event: {
              contextmenu: (e) => { e.preventDefault(); },
              selectstart: (e) => { e.preventDefault(); }
            },
            style: {
              width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
              display: "inline-block",
              marginBottom: String(photoMargin) + ea,
              marginRight: String(0) + ea,
              borderRadius: String(desktop ? 3 : 0) + "px",
            }
          });
        }
      } else if (type.replace(/^general/i, '').replace(/^blank/i, '').replace(/^double/i, '').replace(/^half/i, '') === "Sub") {
        createNode({
          mother: mainTong,
          text: obj.text.join("\n"),
          style: {
            display: "block",
            position: "relative",
            textAlign: "left",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(titleWeight),
            lineHeight: String(titleLineHeight),
            color: colorChip.black,
            width: withOut(desktop ? 0 : (mobileDescriptionPadding * 2), ea),
            paddingLeft: mobile ? String(mobileDescriptionPadding) + ea : 0,
            paddingRight: mobile ? String(mobileDescriptionPadding) + ea : 0,
            marginBottom: String(photoMargin) + ea,
            paddingTop: /general/gi.test(type) ? String(subMargin) + ea : "",
          }
        });

      } else if (type.replace(/^general/i, '').replace(/^blank/i, '').replace(/^double/i, '').replace(/^half/i, '') === "Middle") {
        createNode({
          mother: mainTong,
          text: obj.text.join("\n"),
          style: {
            display: "block",
            position: "relative",
            textAlign: "left",
            fontSize: String(middleSize) + ea,
            fontWeight: String(titleWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.black,
            width: withOut(desktop ? 0 : (mobileDescriptionPadding * 2), ea),
            paddingLeft: mobile ? String(mobileDescriptionPadding) + ea : 0,
            paddingRight: mobile ? String(mobileDescriptionPadding) + ea : 0,
          }
        });
        createNode({
          mother: mainTong,
          style: {
            display: "block",
            position: "relative",
            textAlign: "left",
            marginTop: String(titleBarMarginTop) + ea,
            marginBottom: String(titleBarMarginBottom) + ea,
            width: withOut(desktop ? 0 : (mobileDescriptionPadding * 2), ea),
            paddingLeft: mobile ? String(mobileDescriptionPadding) + ea : 0,
            paddingRight: mobile ? String(mobileDescriptionPadding) + ea : 0,
          },
          children: [
            {
              style: {
                display: "inline-block",
                width: String(titleBarWidth) + ea,
                borderBottom: "1px solid " + colorChip.gray3,
              }
            }
          ]
        });
      }

    }
    num++;
  }

  createNode({
    mother: mainTong,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "row",
      marginTop: String(mobile ? blankMargin * 1.2 : blankMargin) + ea,
      marginLeft: mobile ? String(mobileDescriptionPadding) + ea : "",
      marginRight: mobile ? String(mobileDescriptionPadding) + ea : "",
      width: mobile ? withOut(mobileDescriptionPadding * 2, ea) : withOut(0),
    },
    children: [
      {
        text: "editor",
        style: {
          display: "inline-block",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(500),
          fontFamily: "graphik",
          color: colorChip.black,
          position: "relative",
          marginRight: String(editorBetween) + ea,
        }
      },
      {
        text: editor,
        style: {
          display: "inline-block",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          position: "relative",
          top: String(editorTextTop) + ea,
        }
      }
    ]
  });

}

MagazineDetailJs.prototype.magazineRelativeBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, sleep, setQueue, equalJson, isMac, isIphone, selfHref, swipePatch, homeliaisonAnalytics, dateToString } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const touchStartConst = "touchStartConstName";
  const photoTouchStartConst = "photoTouchStartConst";
  const photoChar = 't';
  const photoCharMobile = "mot";
  const photoDefaultRatio = (297 / 210);
  const whitePhotoBigClassName = "whitePhotoBigClassName";
  let mainTong;
  let photoTong;
  let baseWidth;
  let baseTong;
  let arrowHeight;
  let arrowTop;
  let leftArrow, rightArrow;
  let mainPaddingTop;
  let baseBetween;
  let titleHeight, titleMarginBottom;
  let titleLineHeight;
  let mainTitleSize, mainTitleWeight;
  let mainTitleWidth;
  let belowTong;
  let belowBaseTong;
  let mainHeight;
  let belowBoxHeight;
  let belowButtonTop;
  let belowButtonHeight;
  let belowButtonBetween;
  let belowButtonWordPadding;
  let belowButtonTextTop, belowButtonSize, belowButtonWeight;
  let photoTongClassName;
  let move;
  let block;
  let src, title, tag;
  let photoMargin;
  let columns;
  let photoRatio;
  let seroWidth;
  let photoHeight;
  let photoMarginBottom;
  let quoteHeight, quoteWidth, quoteTop;
  let titleSize;
  let titleWeight;
  let titleMarginLeft;
  let tagTongMarginTop;
  let tagTongWidthRatio;
  let tagTong;
  let filteredContents;
  let tagSize;
  let tagWeight;
  let tagPaddingLeft;
  let tagPaddingTop;
  let tagPaddingBottom;
  let tagMarginRight;
  let relativeLength;
  let mainTitleTop;
  let tagBlock;
  let subTitleMarginTop;
  let subTitleMarginTopReview;
  let subTitleSize;
  let subArrowWidth;
  let subArrowHeight;
  let subArrowBottom;
  let subArrowReviewBottom;
  let reviewSubTitleVisual;
  let shareTong, shareBaseTong;
  let shareTongHeight;
  let shareIconHeight;
  let shareIconBetween0, shareIconBetween1;
  let previousNextSize, previousNextWeight, previousNextTextTop, previousNextLeftRight;
  let whitePhotoTong;
  let photoSrc;
  let photoBetween;
  let whitePhotoTongInnerPadding;
  let whitePhotoHeight;
  let whitePhotoNumbers;
  let whitePhotoTongMarginBottom;
  let whitePopupBigPadding;
  let whitePhotoBigArrowHeight;
  let whitePhotoBigArrowAreaHeight;
  let whitePhotoEvent;
  let rightArrowEvent, leftArrowEvent;
  let mainPaddingBottom;

  this.relativePhotoNumber = 0;

  baseWidth = <%% 1300, 980, 800, 640, 76 %%>;
  baseBetween = standardWidth - baseWidth;

  arrowHeight = <%% 28, 25, 25, 24, 4 %%>;
  arrowTop = <%% 230, 218, 230, 190, 34 %%>;

  mainHeight = <%% 590, 570, 590, 496, 94 %%>;
  mainPaddingTop = <%% 110, 96, 86, 72, 10 %%>;
  mainPaddingBottom = <%% 110, 106, 94, 80, 10.5 %%>;

  titleHeight = <%% 30, 30, 30, 28, 6 %%>;
  titleMarginBottom = <%% 32, 32, 32, 28, 5 %%>;
  titleLineHeight = <%% 14, 14, 14, 14, 3 %%>;

  mainTitleSize = <%% 22, 22, 22, 20, 4.5 %%>;
  mainTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  mainTitleWidth = <%% 170, 170, 170, 150, 34 %%>;
  mainTitleTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  belowBoxHeight = <%% 150, 148, 148, 125, 24 %%>;
  belowButtonTop = <%% 45, 45, 45, 32, 7 %%>;

  belowButtonHeight = <%% 50, 48, 48, 45, 10 %%>;
  belowButtonBetween = <%% 10, 10, 10, 10, 2 %%>;
  belowButtonWordPadding = <%% 20, 20, 20, 20, 4 %%>;

  belowButtonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  belowButtonSize = <%% 18, 17, 17, 16, 3.5 %%>;
  belowButtonWeight = <%% 600, 600, 600, 600, 600 %%>;

  move = <%% 264, 249, 272, 218, 39.45 %%>;

  photoTongClassName = "photoTongClassName";

  relativeLength = <%% 20, 20, 20, 20, 20 %%>;

  photoMargin = <%% 20, 16, 16, 14, 3 %%>;
  columns = <%% 5, 4, 3, 3, 2 %%>;
  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 13 : 15), 2.4 %%>;

  quoteHeight = <%% 8, 8, 8, 7, 1.4 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 4 : 2), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 17, 16, 17, 14, 2.7 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.1 %%>;

  tagTongMarginTop = <%% 10, 10, 10, 8, 1.6 %%>;
  tagTongWidthRatio = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  tagSize = <%% 10, 8, 10, 7, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 7, 7, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), isIphone() ? 1.2 : 1.4 %%>;
  tagMarginRight = <%% 3, 2, 3, 2, 1 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 0.5 %%>;
  subTitleMarginTopReview = <%% 3, 3, 3, 2, 0.2 %%>;
  subTitleSize = <%% 12, 12, 12, 12, 2.3 %%>;

  subArrowWidth = <%% 24, 20, 24, 24, 4 %%>;
  subArrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;
  subArrowBottom = <%% 2, 2, 2, 2, 1 %%>;
  subArrowReviewBottom = <%% (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), 1.5 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  shareTongHeight = <%% 100, 100, 96, 90, 13 %%>;
  shareIconHeight = <%% 19, 19, 18, 18, 3.6 %%>;

  shareIconBetween0 = <%% 34, 34, 34, 34, 5.4 %%>;
  shareIconBetween1 = <%% 30, 30, 30, 30, 5 %%>;

  previousNextSize = <%% 16, 16, 15, 14, 3 %%>;
  previousNextWeight = <%% 500, 500, 500, 500, 500 %%>;
  previousNextTextTop = <%% 36, 36, 34, 33, 3.9 %%>;
  previousNextLeftRight = baseBetween / 2;

  photoBetween = <%% 8, 8, 7, 6, 1 %%>;
  whitePhotoTongInnerPadding = <%% 36, 36, 32, 30, 3 %%>;
  whitePhotoHeight = <%% 210, 210, 170, 133, 24 %%>;
  whitePhotoNumbers = <%% 8, 6, 6, 6, 4 %%>;
  whitePhotoTongMarginBottom = <%% 10, 10, 10, 10, 1 %%>;
  whitePopupBigPadding = <%% 64, 64, 64, 64, 28 %%>;
  whitePhotoBigArrowHeight = <%% 15, 15, 15, 15, 2 %%>;
  whitePhotoBigArrowAreaHeight = <%% 200, 200, 200, 200, 20 %%>;

  // share

  shareTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0),
      background: colorChip.gray2,
      height: String(shareTongHeight) + ea,
    }
  });

  shareBaseTong = createNode({
    mother: shareTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: String(standardWidth) + ea,
      height: withOut(0, ea),
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.facebookIcon(colorChip.black),
        event: {
          click: function (e) {
            if (window.FB !== undefined) {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareFacebook",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              window.FB.ui({
                method: 'share',
                href: window.location.href,
              }, (response) => {});
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          cursor: "pointer",
        }
      },
      {
        mode: "svg",
        source: svgMaker.talkIcon(colorChip.black),
        event: {
          click: function () {
            if (window.Kakao !== undefined) {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareKaKao",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              window.Kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                  title: document.querySelector("title").textContent,
                  description: [ ...document.querySelectorAll("meta") ].find((dom) => { return dom.getAttribute("property") === "og:description" }).getAttribute("content"),
                  imageUrl: FRONTHOST + [ ...document.querySelectorAll("meta") ].find((dom) => { return dom.getAttribute("property") === "og:image" }).getAttribute("content"),
                  link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                  },
                },
                buttons: [
                  {
                    title: "웹으로 보기",
                    link: {
                      mobileWebUrl: window.location.href,
                      webUrl: window.location.href,
                    },
                  }
                ],
              });
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          marginLeft: String(shareIconBetween0) + ea,
          marginRight: String(shareIconBetween1) + ea,
          cursor: "pointer",
        }
      },
      {
        mode: "svg",
        source: svgMaker.linkIcon(colorChip.black),
        event: {
          click: async function (e) {
            try {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareLink",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              await window.navigator.clipboard.writeText(window.location.href);
              window.alert("링크가 복사되었습니다!");
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          cursor: "pointer",
        }
      },
      {
        text: "previous",
        event: {
          click: function (e) {
            const midNumber = Number(instance.mid.replace(/[^0-9]/gi, ''));
            const next = midNumber - 1;
            let newLink;
            if (next >= 0) {
              newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("mid=" + instance.mid, "gi"), "mid=" + 'm' + String(next));
              selfHref(newLink);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "absolute",
          fontSize: String(previousNextSize) + ea,
          fontWeight: String(previousNextWeight),
          color: colorChip.darkDarkShadow,
          fontFamily: "graphik",
          top: String(previousNextTextTop) + ea,
          left: String(previousNextLeftRight) + ea,
          cursor: "pointer",
        }
      },
      {
        text: "next",
        event: {
          click: function (e) {
            const midNumber = Number(instance.mid.replace(/[^0-9]/gi, ''));
            const next = midNumber + 1;
            let newLink;
            if (next >= 0) {
              newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("mid=" + instance.mid, "gi"), "mid=" + 'm' + String(next));
              selfHref(newLink);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "absolute",
          fontSize: String(previousNextSize) + ea,
          fontWeight: String(previousNextWeight),
          color: colorChip.darkDarkShadow,
          fontFamily: "graphik",
          top: String(previousNextTextTop) + ea,
          right: String(previousNextLeftRight) + ea,
          cursor: "pointer",
        }
      },
    ]
  });

}

MagazineDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, protoPatch } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();
    let mid;
    let response;
    let magazine;

    if (typeof getObj.mid !== "string") {
      throw new Error("invalid mid");
    }

    mid = getObj.mid;
    this.mid = mid;
    response = await ajaxJson({ mode: "magazine", mid }, LOGHOST + "/getContents", { equal: true });
    while (response.contentsArr.length === 0) {
      this.mid = 'm' + String(Number(this.mid.replace(/[^0-9]/gi, '')) - 1);
      response = await ajaxJson({ mode: "magazine", mid: this.mid }, LOGHOST + "/getContents", { equal: true });
    }
    [ magazine ] = response.contentsArr;
    this.magazine = magazine;

    await this.mother.ghostClientLaunching({
      mode: "black",
      name: "magazineDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: MagazineDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.magazineInitBox();
          instance.magazineContentsBox();
          instance.magazineRelativeBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MagazineDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      facebookSdkPatch().then(() => {
        return kakaoSdkPatch();
      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "MagazineDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
