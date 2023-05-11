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
      "return ('홈리에종 고객 리뷰 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewDetail",
  "hangul": "리뷰 상세",
  "route": [
    "reviewDetail",
    "RD"
  ]
} %/%/g

const ReviewDetailJs = function () {
  this.mother = new GeneralJs();
}

ReviewDetailJs.binaryPath = FRONTHOST + "/middle/review";

ReviewDetailJs.prototype.reviewMainBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const photoChar = 't';
  const photoCharMobile = "mot";
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoRightMargin;
  let textTong;
  let quoteHeight, quoteWidth;
  let quoteTop;
  let quotePaddingLeft;
  let topReviewSize, topReviewWeight;
  let mainTitleSize, mainTitleWeight;
  let mainTitleLineHeight;
  let mainTitleMarginTop;
  let subTitleSize, subTitleWeight;
  let subTitleMarginTop;
  let subLineWidth, subLineHeight, subLineLeft;
  let bottomWordingVisualBottom;
  let bottomWordingLineHeight;
  let mobileWhiteBoxTop, mobileWhiteBoxLeft;
  let mobileWhiteBoxWidth, mobileWhiteBoxHeight;
  let mobileWordingLeft;

  mainHeight = <%% 800, 750, 710, 590, (210 / 297) * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  photoRightMargin = <%% 50, 50, 45, 40, 50 %%>;

  quoteHeight = <%% 14, 14, 13, 11, 2 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% 140, 135, 125, 80, 5 %%>;
  quotePaddingLeft = <%% 2, 2, 2, 2, 5.4 %%>;

  topReviewSize = <%% 16, 16, 15, 14, 15 %%>;
  topReviewWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleSize = <%% 36, 35, 33, 29, 4.5 %%>;
  mainTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTitleLineHeight = <%% 1.16, 1.16, 1.16, 1.16, 1.2 %%>;
  mainTitleMarginTop = <%% 5, 5, 5, 3, 7.5 %%>;

  subTitleSize = <%% 18, 17, 17, 15, 3.1 %%>;
  subTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  subTitleMarginTop = <%% 17, 17, 16, 13, 20 %%>;

  subLineWidth = <%% 170, 120, 95, 65, 95 %%>;
  subLineHeight = <%% (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 10 : 8), 11 %%>;
  subLineLeft = <%% 160, 150, 150, 135, 150 %%>;

  bottomWordingVisualBottom = <%% (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), -2 %%>;
  bottomWordingLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileWhiteBoxTop = 20;
  mobileWhiteBoxLeft = 8;
  mobileWhiteBoxWidth = 37;
  mobileWhiteBoxHeight = 31;

  mobileWordingLeft = 5.3;

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
    event: {
      contextmenu: (e) => {
        e.preventDefault();
      }
    },
    style: {
      display: desktop ? "inline-block" : "block",
      position: desktop ? "relative" : "absolute",
      width: desktop ? String(pictureWidth) + ea : String(100) + '%',
      height: desktop ? String(pictureHeight) + ea : String(100) + '%',
      borderRadius: desktop ? String(5) + "px" : "",
      backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
      backgroundSize: "auto 100%",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      marginRight: desktop ? String(photoRightMargin) + ea : "",
      verticalAlign: "top",
    }
  });

  if (mobile) {

    createNode({
      mother: contentsBox,
      style: {
        display: "block",
        position: "relative",
        top: String(mobileWhiteBoxTop) + ea,
        left: String(mobileWhiteBoxLeft) + ea,
        width: String(mobileWhiteBoxWidth) + ea,
        height: String(mobileWhiteBoxHeight) + ea,
        borderRadius: String(1) + ea,
        overflow: "hidden",
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
            borderRadius: String(1) + ea,
          }
        },
        {
          mode: "svg",
          source: svgMaker.doubleQuote(colorChip.green),
          style: {
            position: "absolute",
            top: String(quoteTop) + ea,
            left: String(quotePaddingLeft) + ea,
            height: String(quoteHeight) + ea,
            width: String(quoteWidth) + ea,
          }
        },
        {
          text: "Welcome to\nmy home",
          style: {
            position: "absolute",
            textAlign: "left",
            fontSize: String(mainTitleSize) + ea,
            fontWeight: String(mainTitleWeight),
            fontFamily: "graphik",
            color: colorChip.black,
            top: String(mainTitleMarginTop) + ea,
            left: String(mobileWordingLeft) + ea,
            lineHeight: String(mainTitleLineHeight),
          }
        },
        {
          text: "우리집을 소개합니다",
          style: {
            position: "absolute",
            textAlign: "left",
            fontSize: String(subTitleSize) + ea,
            fontWeight: String(subTitleWeight),
            color: colorChip.black,
            top: String(subTitleMarginTop) + ea,
            left: String(mobileWordingLeft) + ea,
          }
        },
      ]
    });

  }

  if (desktop) {

    textTong = createNode({
      mother: contentsBox,
      style: {
        display: "inline-block",
        position: "relative",
        width: withOut(pictureWidth + photoRightMargin, ea),
        height: String(pictureHeight) + ea,
        verticalAlign: "top",
      }
    });

    createNode({
      mother: textTong,
      text: "review " + pid.replace(/[^0-9]/gi, ''),
      style: {
        display: "block",
        textAlign: "right",
        fontSize: String(topReviewSize) + ea,
        fontWeight: String(topReviewWeight),
        fontFamily: "graphik",
        color: colorChip.green
      }
    });

    createNode({
      mother: textTong,
      style: {
        display: "block",
        textAlign: "left",
        paddingTop: String(quoteTop) + ea,
        paddingLeft: String(quotePaddingLeft) + ea,
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.doubleQuote(colorChip.green),
          style: {
            display: "inline-block",
            height: String(quoteHeight) + ea,
            width: String(quoteWidth) + ea,
          }
        }
      ]
    });
    createNode({
      mother: textTong,
      text: "Welcome to\nmy home",
      style: {
        display: "block",
        textAlign: "left",
        fontSize: String(mainTitleSize) + ea,
        fontWeight: String(mainTitleWeight),
        fontFamily: "graphik",
        color: colorChip.black,
        lineHeight: String(mainTitleLineHeight),
        marginTop: String(mainTitleMarginTop) + ea,
      }
    });

    createNode({
      mother: textTong,
      text: "우리집을 소개합니다",
      style: {
        display: "block",
        position: "relative",
        textAlign: "left",
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(subTitleWeight),
        color: colorChip.black,
        marginTop: String(subTitleMarginTop) + ea,
        paddingLeft: String(quotePaddingLeft) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            width: String(subLineWidth) + ea,
            height: String(subLineHeight) + ea,
            borderBottom: "1px solid " + colorChip.gray3,
            top: String(0),
            left: String(subLineLeft) + ea,
          }
        }
      ]
    });
    createNode({
      mother: textTong,
      text: contents.contents.portfolio.spaceInfo.space + "\n홈스타일링 후기",
      style: {
        display: "block",
        position: "absolute",
        bottom: String(bottomWordingVisualBottom) + ea,
        width: String(100) + '%',
        textAlign: "right",
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(subTitleWeight),
        color: colorChip.black,
        lineHeight: String(bottomWordingLineHeight),
      }
    });

  }

}

ReviewDetailJs.prototype.reviewContentsBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid } = this;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const { contents: { review }, photos } = contents;
  const { detail: photoDetail } = photos;
  const { contents: { detail } } = review;
  const [ { contents: customerStoryMother } ] = detail;
  const designer = designers.search("desid", contents.desid);
  const story = equalJson(JSON.stringify(detail));
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const today = new Date();
  let mainTong;
  let mainWidth;
  let mainPaddingTop;
  let titleSize, titleWeight;
  let titleLineHeight;
  let titleBarMarginTop, titleBarWidth;
  let contentsSize, contentsWeight;
  let contentsLineHeight;
  let customerPaddingLeft, customerMarginTop;
  let customerSize, customerWeight;
  let customerTop, customerLineHeight;
  let customerStory;
  let src;
  let garo;
  let num;
  let photoMargin;
  let blankMargin, blankMargin2;
  let totalNum;
  let blankMarginFirst;
  let contentsPadding;
  let wordingTop;
  let questionMargin, answerMargin;
  let questionWeight, answerWeight;
  let belowBox;
  let belowBoxPadding;
  let belowBoxHeight;
  let blankMarginLast;
  let belowPictureWidth;
  let belowPictureMargin;
  let belowWhiteWidth;
  let nameCardWording;
  let nameCardIndex;
  let belowTextTitleSize, belowTextTitleWeight, belowTextTitleLineHeight;
  let belowTextAreaPaddingLeft;
  let portfolioWordingSize, portfolioWordingWeight;
  let belowTextAreaPaddingTop;
  let belowTextAreaTitleBarTop;
  let belowTextAreaSubSize, belowTextAreaSubWeight, belowTextAreaSubLineHeight, belowTextAreaSubMarginTop;
  let designerTongPaddingTop;
  let deignserPhotoWidth;
  let designerTitleSize, designerTitleWeight, designerTitleMarginTop;
  let designerTong;
  let designerMthTargets;
  let designerMthSize, designerMthWeight, designerMthMarginTop;
  let careerBottom;
  let careerSize, careerWeight;
  let mobileDesignerWordingTop;
  let mobileDesignerBoxBetween;

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  customerPaddingLeft = <%% 150, 150, 150, 130, 6 %%>;
  customerMarginTop = <%% 36, 36, 36, 36, 5.5 %%>;

  customerSize = <%% 17, 17, 17, 16, 0 %%>;
  customerWeight = <%% 400, 400, 400, 400, 400 %%>;
  customerTop = <%% 3, 3, 3, 3, 3 %%>;
  customerLineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  contentsPadding = <%% 21, 21, 21, 21, 6 %%>;

  wordingTop = <%% (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), 0.6 %%>;
  questionMargin = <%% 10, 10, 10, 10, 1 %%>;
  answerMargin = <%% 36, 36, 36, 36, 6 %%>;

  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowBoxPadding = <%% 50, 50, 50, 36, 3.5 %%>;
  belowBoxHeight = <%% 300, 300, 300, 260, 30 %%>;

  belowWhiteWidth = <%% 200, 200, 200, 156, 0 %%>;

  belowPictureWidth = <%% 350, 350, 350, 290, 43 %%>;
  belowPictureMargin = <%% 18, 18, 18, 12, 0 %%>;

  nameCardWording = contents.contents.portfolio.title.main.split(", ")[1];

  nameCardIndex = nameCardWording.split(' ').findIndex((str) => { return /py/gi.test(str); });
  nameCardWording = nameCardWording.split(' ').slice(0, nameCardIndex).join(' ') + "\n" + nameCardWording.split(' ').slice(nameCardIndex).join(' ');

  portfolioWordingSize = <%% 15, 15, 15, 15, 2 %%>;
  portfolioWordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowTextAreaPaddingLeft = <%% 12, 12, 12, 12, 4 %%>;
  belowTextTitleSize = <%% 25, 25, 25, 20, 3.5 %%>;
  belowTextTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  belowTextTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  belowTextAreaPaddingTop = <%% 158, 158, 158, 137, 8.5 %%>;
  belowTextAreaTitleBarTop = <%% (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), 2 %%>;

  belowTextAreaSubSize = <%% 14, 14, 14, 12, 2 %%>;
  belowTextAreaSubWeight = <%% 500, 500, 500, 500, 500 %%>;
  belowTextAreaSubLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  belowTextAreaSubMarginTop = <%% 20, 20, 20, 20, 2 %%>;

  designerTongPaddingTop = <%% 30, 30, 30, 27, 30 %%>;
  deignserPhotoWidth = <%% 124, 124, 124, 110, 124 %%>;

  designerTitleSize = <%% 19, 19, 19, 16, 19 %%>;
  designerTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  designerTitleMarginTop = <%% 10, 10, 10, 7, 10 %%>;

  designerMthSize = <%% 13, 13, 13, 11, 13 %%>;
  designerMthWeight = <%% 500, 500, 500, 500, 500 %%>;
  designerMthMarginTop = <%% 3, 3, 3, 2, 3 %%>;

  careerBottom = <%% 30, 30, 30, 27, 30 %%>;
  careerSize = <%% 12, 12, 12, 11, 12 %%>;
  careerWeight = <%% 400, 400, 400, 400, 400 %%>;

  mobileDesignerWordingTop = 13;
  mobileDesignerBoxBetween = 2;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      paddingTop: String(mainPaddingTop) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  createNode({
    mother: mainTong,
    text: review.title.main.replace(/, /, "\n"),
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

  createNode({
    mother: mainTong,
    text: customerStory,
    event: {
      contextmenu: (e) => { e.preventDefault(); },
      selectstart: (e) => { e.preventDefault(); }
    },
    style: {
      display: "block",
      position: "relative",
      textAlign: "left",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      paddingLeft: String(customerPaddingLeft) + ea,
      marginTop: String(customerMarginTop) + ea,
      paddingRight: desktop ? "" : String(customerPaddingLeft) + ea,
    },
    children: [
      {
        text: "Customer\nStory",
        style: {
          display: desktop ? "block" : "none",
          fontSize: String(customerSize) + ea,
          fontWeight: String(customerWeight),
          fontFamily: "graphik",
          color: colorChip.black,
          position: "absolute",
          top: String(customerTop) + ea,
          left: String(0),
          lineHeight: String(customerLineHeight),
        }
      }
    ]
  });

  totalNum = 0;
  for (let { contents, photos } of story) {

    createNode({
      mother: mainTong,
      style: {
        display: "block",
        height: String(totalNum === 0 ? blankMarginFirst : blankMargin2) + ea,
      }
    });
    num = 0;
    for (let index of photos) {
      if (desktop) {
        src = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + pid + "/mobile/" + photoCharMobile + String(index) + pid + ".jpg";
      }
      garo = (photoDetail[index - 1].gs === 'g');
      createNode({
        mother: mainTong,
        mode: "img",
        attribute: { src },
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          width: garo ? String(100) + '%' : "calc(50% - " + String(photoMargin / 2) + ea + ")",
          display: "inline-block",
          marginBottom: String(photoMargin) + ea,
          marginRight: String(garo ? 0 : (num % 2 === 0 ? photoMargin : 0)) + ea,
          borderRadius: String(desktop ? 3 : 0) + "px",
        }
      });
      if (!garo) {
        num++;
      }
    }
    createNode({
      mother: mainTong,
      style: {
        display: "block",
        height: String(blankMargin) + ea,
      }
    });

    for (let { answer, question } of contents) {

      createNode({
        mother: mainTong,
        text: question,
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(questionWeight),
          lineHeight: String(contentsLineHeight),
          color: colorChip.black,
          paddingLeft: String(desktop ? contentsPadding : (contentsPadding * 2)) + ea,
          marginBottom: String(questionMargin) + ea,
          paddingRight: desktop ? "" : String(contentsPadding) + ea,
        },
        children: [
          {
            text: "Q.",
            style: {
              fontSize: String(contentsSize) + ea,
              fontWeight: String(customerWeight),
              fontFamily: "graphik",
              color: colorChip.black,
              position: "absolute",
              top: String(wordingTop) + ea,
              left: desktop ? String(0) : String(contentsPadding) + ea,
              lineHeight: String(customerLineHeight),
            }
          }
        ]
      });

      createNode({
        mother: mainTong,
        text: answer,
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(answerWeight),
          lineHeight: String(contentsLineHeight),
          color: colorChip.black,
          paddingLeft: String(desktop ? contentsPadding : (contentsPadding * 2)) + ea,
          marginBottom: String(answerMargin) + ea,
          paddingRight: desktop ? "" : String(contentsPadding) + ea,
        },
        children: [
          {
            text: "A.",
            style: {
              fontSize: String(contentsSize) + ea,
              fontWeight: String(300),
              fontFamily: "graphik",
              color: colorChip.black,
              position: "absolute",
              top: String(wordingTop) + ea,
              left: desktop ? String(0) : String(contentsPadding) + ea,
              lineHeight: String(customerLineHeight),
            }
          }
        ]
      });

    }

    totalNum++;
  }

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  belowBox = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(belowBoxPadding * 2, ea) : withOut((belowBoxPadding + contentsPadding) * 2, ea),
      padding: String(belowBoxPadding) + ea,
      height: String(belowBoxHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray0,
      marginLeft: desktop ? "" : String(contentsPadding) + ea,
      marginRight: desktop ? "" : String(contentsPadding) + ea,
      marginBottom: desktop ? "" : String(mobileDesignerBoxBetween) + ea
    },
    children: [
      {
        attribute: {
          desid: designer.desid,
        },
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
          display: desktop ? "inline-block" : "none",
          position: "relative",
          borderRadius: String(5) + "px",
          width: String(belowWhiteWidth) + ea,
          paddingTop: String(designerTongPaddingTop) + ea,
          height: withOut(designerTongPaddingTop, ea),
          background: colorChip.white,
          textAlign: "center",
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
              backgroundSize: "auto 100%",
              backgroundPosition: "50% 50%",
              display: "inline-block",
              width: String(deignserPhotoWidth) + ea,
              height: String(deignserPhotoWidth) + ea,
              borderRadius: String(deignserPhotoWidth / 2) + ea,
            }
          },
          {
            text: designer.designer,
            style: {
              marginTop: String(designerTitleMarginTop) + ea,
              marginBottom: String(designerTitleMarginTop) + ea,
              textAlign: "center",
              fontSize: String(designerTitleSize) + ea,
              fontWeight: String(designerTitleWeight),
              color: colorChip.black,
            }
          }
        ]
      },
      {
        attribute: { pid },
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
          position: "relative",
          borderRadius: String(5) + "px",
          width: String(belowPictureWidth) + ea,
          height: String(100) + '%',
          marginLeft: String(belowPictureMargin) + ea,
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.portfolio.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: desktop ? "auto 100%" : "100% auto",
          backgroundPosition: "50% 50%",
          verticalAlign: "top",
          cursor: "pointer",
        }
      },
      {
        attribute: { pid },
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
          position: "relative",
          width: withOut(belowWhiteWidth + belowPictureWidth + (belowPictureMargin * 2) + belowTextAreaPaddingLeft, ea),
          paddingTop: String(belowTextAreaPaddingTop) + ea,
          marginLeft: String(belowPictureMargin) + ea,
          paddingLeft: String(belowTextAreaPaddingLeft) + ea,
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            text: nameCardWording,
            style: {
              fontSize: String(belowTextTitleSize) + ea,
              fontWeight: String(belowTextTitleWeight),
              color: colorChip.black,
              lineHeight: String(belowTextTitleLineHeight),
            }
          },
          {
            style: {
              display: "block",
              height: String(belowTextAreaTitleBarTop) + ea,
              width: String(100) + '%',
              borderBottom: "1px solid " + colorChip.gray3,
            }
          },
          {
            text: contents.contents.portfolio.title.sub.split(", ").join("\n"),
            style: {
              fontSize: String(belowTextAreaSubSize) + ea,
              fontWeight: String(belowTextAreaSubWeight),
              color: colorChip.shadow,
              lineHeight: String(belowTextAreaSubLineHeight),
              marginTop: String(belowTextAreaSubMarginTop) + ea,
            }
          },
        ]
      },
      {
        text: "Portfolio",
        style: {
          position: "absolute",
          fontSize: String(portfolioWordingSize) + ea,
          fontWeight: String(portfolioWordingWeight),
          fontFamily: "graphik",
          color: colorChip.black,
          top: String(belowBoxPadding) + ea,
          right: String(belowBoxPadding) + ea,
          textAlign: "right",
        }
      }
    ]
  });

  if (mobile) {
    createNode({
      mother: mainTong,
      style: {
        display: "block",
        position: "relative",
        width: desktop ? withOut(belowBoxPadding * 2, ea) : withOut((belowBoxPadding + contentsPadding) * 2, ea),
        padding: String(belowBoxPadding) + ea,
        height: String(belowBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray0,
        marginLeft: desktop ? "" : String(contentsPadding) + ea,
        marginRight: desktop ? "" : String(contentsPadding) + ea,
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
            borderRadius: String(5) + "px",
            width: String(belowPictureWidth) + ea,
            height: String(100) + '%',
            marginLeft: String(belowPictureMargin) + ea,
            backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
            backgroundSize: desktop ? "auto 100%" : "100% auto",
            backgroundPosition: "50% 50%",
            verticalAlign: "top",
          }
        },
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
            width: withOut(belowWhiteWidth + belowPictureWidth + (belowPictureMargin * 2) + belowTextAreaPaddingLeft, ea),
            paddingTop: String(mobileDesignerWordingTop) + ea,
            marginLeft: String(belowPictureMargin) + ea,
            paddingLeft: String(belowTextAreaPaddingLeft) + ea,
            verticalAlign: "top",
          },
          children: [
            {
              text: designer.designer,
              style: {
                fontSize: String(belowTextTitleSize) + ea,
                fontWeight: String(belowTextTitleWeight),
                color: colorChip.black,
                lineHeight: String(belowTextTitleLineHeight),
              }
            },
            {
              style: {
                display: "block",
                height: String(belowTextAreaTitleBarTop) + ea,
                width: String(100) + '%',
                borderBottom: "1px solid " + colorChip.gray3,
              }
            },
            {
              text: designerMthParsing(designer.setting.front.methods).join(", ") + "\n" + designerCareer(designer, true),
              style: {
                fontSize: String(belowTextAreaSubSize) + ea,
                fontWeight: String(belowTextAreaSubWeight),
                color: colorChip.shadow,
                lineHeight: String(belowTextAreaSubLineHeight),
                marginTop: String(belowTextAreaSubMarginTop) + ea,
              },
              bold: {
                fontSize: String(belowTextAreaSubSize) + ea,
                fontWeight: String(belowTextAreaSubWeight),
                color: colorChip.shadow,
              }
            },
          ]
        },
        {
          text: "Designer",
          style: {
            position: "absolute",
            fontSize: String(portfolioWordingSize) + ea,
            fontWeight: String(portfolioWordingWeight),
            fontFamily: "graphik",
            color: colorChip.black,
            top: String(belowBoxPadding) + ea,
            right: String(belowBoxPadding) + ea,
            textAlign: "right",
          }
        }
      ]
    });
  }

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMarginLast) + ea,
    }
  });

  if (desktop) {
    designerTong = belowBox.firstChild;
    designerMthTargets = designerMthParsing(designer.setting.front.methods);
    for (let mth of designerMthTargets) {
      createNode({
        mother: designerTong,
        text: mth,
        style: {
          marginTop: String(designerMthMarginTop) + ea,
          textAlign: "center",
          fontSize: String(designerMthSize) + ea,
          fontWeight: String(designerMthWeight),
          color: colorChip.black,
        }
      });
    }

    createNode({
      mother: designerTong,
      text: designerCareer(designer, true),
      style: {
        position: "absolute",
        width: String(100) + '%',
        textAlign: "center",
        bottom: String(careerBottom) + ea,
        fontSize: String(careerSize) + ea,
        fontWeight: String(careerWeight),
        color: colorChip.black,
      },
      bold: {
        fontWeight: String(200),
        color: colorChip.deactive,
      }
    });
  }

}

ReviewDetailJs.prototype.relativeContents = function (contents, length) {
  const instance = this;
  const tendencyKey = [
    {
      target: "style",
      name: "스타일 경향성",
      order: [
        "modern",
        "classic",
        "natural",
        "mixmatch",
        "scandinavian",
        "vintage",
        "oriental",
        "exotic",
      ],
      map: {
        modern: "모던",
        classic: "클래식",
        natural: "내추럴",
        mixmatch: "믹스매치",
        scandinavian: "북유럽",
        vintage: "빈티지",
        oriental: "오리엔탈",
        exotic: "이그저틱",
      }
    },
    {
      target: "texture",
      name: "텍스처 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "coating",
        "metal",
      ],
      map: {
        darkWood: "진한 우드",
        whiteWood: "연한 우드",
        coating: "도장",
        metal: "금속",
      }
    },
    {
      target: "color",
      name: "컬러톤 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "highContrast",
        "vivid",
        "white",
        "mono",
        "bright",
        "dark",
      ],
      map: {
        darkWood: "다크 우드",
        whiteWood: "밝은 우드",
        highContrast: "고대비",
        vivid: "비비드",
        white: "화이트",
        mono: "모노톤",
        bright: "밝은톤",
        dark: "어두운톤",
      }
    },
    {
      target: "density",
      name: "밀도 경향성",
      order: [
        "maximun",
        "minimum",
      ],
      map: {
        maximun: "맥시멈",
        minimum: "미니멈",
      }
    },
  ];
  const tagAmplification = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tag } } } } = contents;
    const filtered = [ ...new Set(tag.concat(tag.map((str) => {
      return str.replace(/한$/gi, '').replace(/적인$/gi, '').replace(/스러운$/gi, '').replace(/가구$/gi, '').replace(/인테리어$/gi, '').replace(/있는$/gi, '');
    }))) ];
    filtered.conid = conid;
    return filtered;
  }
  const tendencySpread = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tendency } } } } = contents;
    let values;
    values = [];
    for (let { target, order } of tendencyKey) {
      for (let key of order) {
        values.push(tendency[target][key]);
      }
    }
    values.conid = conid;
    return values;
  }
  const tendencyConst = length * 2;
  const relativeConst = length * 2;
  const tagMultiplyConst = 2;
  let standardTag;
  let totalTag;
  let firstFiltered;
  let standardTendency;
  let totalTendency;
  let secondFiltered;

  standardTag = tagAmplification(contents);

  totalTag = instance.contentsArr.toNormal().map((obj) => {
    return tagAmplification(obj);
  }).map((arr) => {
    let num;
    num = 0;
    for (let i of arr) {
      if (standardTag.includes(i)) {
        num++;
      }
    }
    arr.number = num;
    return arr;
  });

  totalTag.sort((a, b) => { return b.number - a.number });
  firstFiltered = totalTag.slice(1).slice(0, relativeConst * tagMultiplyConst).map((arr) => { return arr.conid }).map((conid) => {
    return instance.contentsArr.search("conid", conid);
  });

  standardTendency = tendencySpread(contents);
  totalTendency = firstFiltered.map((obj) => {
    return tendencySpread(obj);
  }).map((arr) => {
    let num;
    num = 0;
    for (let i = 0; i < arr.length; i++) {
      num = num + (standardTendency[i] - arr[i]);
    }
    num = num / arr.length;
    arr.number = Math.abs(num);
    return arr;
  });
  totalTendency.sort((a, b) => { return a.number - b.number });

  secondFiltered = totalTendency.slice(0, relativeConst).map((arr) => { return arr.conid }).map((conid) => {
    return instance.contentsArr.search("conid", conid);
  });

  return secondFiltered;
}

ReviewDetailJs.prototype.reviewRelativeBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, sleep, setQueue, equalJson, isMac, isIphone, selfHref, swipePatch, homeliaisonAnalytics, dateToString } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
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
            const entireContents = instance.contentsArr.toNormal();
            const entireContentsLength = entireContents.length;
            let thisContentsIndex;
            let previousIndex;
            let newLink;
            thisContentsIndex = entireContents.findIndex((obj) => { return obj.contents.portfolio.pid === pid });
            if (thisContentsIndex === entireContentsLength - 1) {
              previousIndex = thisContentsIndex;
            } else {
              previousIndex = thisContentsIndex + 1;
            }
            newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("pid=" + pid, "gi"), "pid=" + entireContents[previousIndex].contents.portfolio.pid);
            selfHref(newLink);
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
            const entireContents = instance.contentsArr.toNormal();
            const entireContentsLength = entireContents.length;
            let thisContentsIndex;
            let nextIndex;
            let newLink;
            thisContentsIndex = entireContents.findIndex((obj) => { return obj.contents.portfolio.pid === pid });
            if (thisContentsIndex === 0) {
              nextIndex = 0;
            } else {
              nextIndex = thisContentsIndex - 1;
            }
            newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("pid=" + pid, "gi"), "pid=" + entireContents[nextIndex].contents.portfolio.pid);
            selfHref(newLink);
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

  // relative

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray0,
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  baseTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    }
  });

  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(titleHeight) + ea,
      marginBottom: String(titleMarginBottom) + ea,
      textAlign: "center",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: withOut(baseBetween, ea),
          height: String(titleLineHeight) + ea,
          top: String(0),
          left: String(baseBetween / 2) + ea,
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      },
      {
        text: "유사한 고객 후기",
        style: {
          fontSize: String(mainTitleSize) + ea,
          fontWeight: String(mainTitleWeight),
          color: colorChip.black,
          display: "inline-block",
          background: colorChip.gray0,
          position: "absolute",
          top: String(mainTitleTop) + ea,
          textAlign: "center",
          width: String(mainTitleWidth) + ea,
          left: "calc(50% - " + String(mainTitleWidth / 2) + ea + ")"
        }
      }
    ]
  });

  leftArrow = createNode({
    mother: baseTong,
    class: [ "leftArrow" ],
    event: {
      click: function (e) {
        const photoTong = document.querySelector('.' + photoTongClassName);
        let current, newMove;
        current = Number(photoTong.style.transform.replace(/[^0-9\-\.]/gi, ''));
        newMove = current + move;
        if (newMove <= 0) {
          photoTong.style.transform = "translateX(" + String(newMove) + ea + ")";
        }
      }
    },
    style: {
      position: "absolute",
      top: String(arrowTop) + ea,
      left: String(0),
      width: String(arrowHeight) + ea,
      height: String(arrowHeight) + ea,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            mode: "svg",
            source: this.mother.returnBigArrow(colorChip.green),
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              height: String(arrowHeight) + ea,
              transform: "rotate(180deg)",
            }
          }
        ]
      }
    ]
  });

  rightArrow = createNode({
    mother: baseTong,
    class: [ "rightArrow" ],
    event: {
      click: function (e) {
        const photoTong = document.querySelector('.' + photoTongClassName);
        let current, newMove;
        current = Number(photoTong.style.transform.replace(/[^0-9\-\.]/gi, ''));
        newMove = current - move;
        if (Math.abs((instance.relativePhotoNumber - columns) * move) >= Math.abs(newMove)) {
          photoTong.style.transform = "translateX(" + String(newMove) + ea + ")";
        }
      }
    },
    style: {
      position: "absolute",
      top: String(arrowTop) + ea,
      right: String(0),
      width: String(arrowHeight) + ea,
      height: String(arrowHeight) + ea,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            mode: "svg",
            source: this.mother.returnBigArrow(colorChip.green),
            style: {
              position: "absolute",
              top: String(0),
              right: String(0),
              height: String(arrowHeight) + ea,
              transform: "rotate(0deg)",
            }
          }
        ]
      }
    ]
  });

  photoTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(baseWidth) + ea,
      left: "calc(50% - " + String(baseWidth / 2) + ea + ")",
      overflow: "hidden",
    },
    children: [
      {
        class: [ photoTongClassName ],
        style: {
          display: "block",
          position: "relative",
          transform: "translateX(" + String(0) + ea + ")",
          transition: "all 0.5s ease",
          width: String(8000) + ea,
        }
      }
    ]
  }).firstChild;

  belowTong = createNode({
    mother: totalContents,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "Center",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray2,
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
      borderRadius: String(5) + "px",
      marginRight: String(belowButtonBetween) + ea,
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
          top: String(belowButtonTextTop) + ea,
        }
      }
    ]
  });

  setQueue(async () => {
    try {
      const photoChar = 't';
      const photoCharMobile = "mot";
      let contentsArr;
      let filtered;

      while (!instance.fullLoad) {
        await sleep(500);
      }

      contentsArr = instance.contentsArr;
      filtered = instance.relativeContents(contents, relativeLength);

      for (let i = 0; i < relativeLength; i++) {

        ({ contents: filteredContents } = filtered[i]);

        if (filteredContents.review.detailInfo.photodae.length > 1) {

          if (desktop) {
            src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/" + photoChar + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          } else {
            src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/mobile/" + photoCharMobile + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          }
          title = filteredContents.review.title.sub.split(", ").join(" ");
          tag = equalJson(JSON.stringify(filteredContents.portfolio.detailInfo.tag));

          if (desktop) {
            tag = tag.slice(5, 10);
          } else {
            tag = tag.slice(5, 8);
          }
          if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > 17) {
            tag = tag.slice(0, -1);
          }

          block = createNode({
            mother: photoTong,
            attribute: { pid: filteredContents.portfolio.pid },
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
              width: String(seroWidth) + ea,
              borderRadius: String(5) + "px",
              marginRight: String(photoMargin) + ea,
              verticalAlign: "top",
              overflow: "hidden",
              cursor: "pointer",
            },
            children: [
              {
                style: {
                  display: "block",
                  width: String(seroWidth) + ea,
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
                    mode: "svg",
                    source: svgMaker.doubleQuote(colorChip.green),
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
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      marginLeft: String(titleMarginLeft) + ea,
                      width: withOut(quoteWidth + titleMarginLeft, ea),
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
                  paddingLeft: String(quoteWidth + titleMarginLeft + reviewSubTitleVisual) + ea,
                  width: withOut(quoteWidth + titleMarginLeft + reviewSubTitleVisual, ea),
                  left: String(0) + ea,
                },
                children: [
                  {
                    text: filteredContents.portfolio.spaceInfo.space + " " + String(filteredContents.portfolio.spaceInfo.pyeong) + "py " + ((media[0] || media[1] || media[2]) ? "홈스타일링 후기" : "후기"),
                    style: {
                      display: "inline-block",
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.gray5,
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(subArrowWidth, subArrowHeight),
                    style: {
                      position: "absolute",
                      width: String(subArrowWidth) + ea,
                      right: String(0),
                      bottom: String(subArrowReviewBottom) + ea,
                    }
                  }
                ]
              }
            ]
          });

          instance.relativePhotoNumber++;
        }
      }

    } catch (e) {
      console.log(e);
    }
  }, 1000);

  // photo


  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0),
      height: String(titleHeight) + ea,
      marginBottom: String(titleMarginBottom) + ea,
      marginTop: String(mainPaddingTop) + ea,
      textAlign: "center",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: withOut(whitePhotoTongInnerPadding * 2, ea),
          height: String(titleLineHeight) + ea,
          top: String(0),
          left: String(whitePhotoTongInnerPadding) + ea,
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      },
      {
        text: "사진 모아 보기",
        style: {
          fontSize: String(mainTitleSize) + ea,
          fontWeight: String(mainTitleWeight),
          color: colorChip.black,
          display: "inline-block",
          background: colorChip.gray0,
          position: "absolute",
          top: String(mainTitleTop) + ea,
          textAlign: "center",
          width: String(mainTitleWidth) + ea,
          left: "calc(50% - " + String(mainTitleWidth / 2) + ea + ")",
        }
      }
    ]
  });

  whitePhotoTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut((whitePhotoTongInnerPadding * 2) - photoBetween, ea),
      marginLeft: String(0) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      marginBottom: String(whitePhotoTongMarginBottom) + ea,
      paddingTop: String(whitePhotoTongInnerPadding) + ea,
      paddingLeft: String(whitePhotoTongInnerPadding) + ea,
      paddingRight: String(whitePhotoTongInnerPadding - photoBetween) + ea,
      paddingBottom: String(whitePhotoTongInnerPadding - photoBetween) + ea,
    }
  });

  whitePhotoEvent = function (e) {
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

    order = Number(this.getAttribute("order"));
    index = Number(this.getAttribute("index"));
    gs = this.getAttribute("gs");

    staticSetting = (order, index, gs) => {
      src = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";

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

    staticSetting(order, index, gs);

    leftArrowEvent = (e) => {
      let previousObj;
      if (contents.photos.detail[order - 1] === undefined) {
        previousObj = contents.photos.detail[contents.photos.detail.length - 1];
      } else {
        previousObj = contents.photos.detail[order - 1];
      }
      order = previousObj.index - 1;
      index = previousObj.index;
      gs = previousObj.gs;
      staticSetting(order, index, gs);
      imageRender(width, height, src);
    }

    rightArrowEvent = (e) => {
      let nextObj;
      if (contents.photos.detail[order + 1] === undefined) {
        nextObj = contents.photos.detail[0];
      } else {
        nextObj = contents.photos.detail[order + 1];
      }
      order = nextObj.index - 1;
      index = nextObj.index;
      gs = nextObj.gs;
      staticSetting(order, index, gs);
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

  for (let { index, gs } of contents.photos.detail) {
    if (desktop) {
      photoSrc = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";
    } else {
      photoSrc = FRONTHOST + "/list_image/portp" + pid + "/mobile/" + photoCharMobile + String(index) + pid + ".jpg";
    }

    createNode({
      mother: whitePhotoTong,
      attribute: {
        order: String(index - 1),
        index: String(index),
        gs,
        pid,
      },
      event: {
        click: whitePhotoEvent,
        contextmenu: (e) => { e.preventDefault() },
        touchstart: function (e) {
          const self = this;
          self.setAttribute(photoTouchStartConst, "on");
          setQueue(() => {
            self.setAttribute(photoTouchStartConst, "off");
          });
        },
        touchend: function (e) {
          if (this.getAttribute(photoTouchStartConst) === "on") {
            whitePhotoEvent.call(this, e);
          }
        }
      },
      style: {
        display: "inline-block",
        width: gs === "s" ? "calc(calc(100% - " + String(photoBetween * whitePhotoNumbers) + ea + ") / " + String(whitePhotoNumbers) + ")" : "calc(calc(calc(calc(100% - " + String(photoBetween * whitePhotoNumbers) + ea + ") / " + String(whitePhotoNumbers) + ") * 2) + " + String(photoBetween) + ea + ")",
        height: String(whitePhotoHeight) + ea,
        marginRight: String(photoBetween) + ea,
        marginBottom: String(photoBetween) + ea,
        backgroundImage: "url('" + photoSrc + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        borderRadius: String(3) + "px",
        cursor: "pointer",
      }
    });

  }


}

ReviewDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, setMetaData, homeliaisonAnalytics, dateToString } = GeneralJs;
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
    const { pid } = getObj;
    let response;

    if (typeof pid !== "string") {
      throw new Error("invaild pid");
    }
    this.pid = pid;

    response = await ajaxJson({ mode: "review", pid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

    if (/^re/.test(pid)) {
      this.pid = this.contentsArr[0].contents.portfolio.pid;
    }

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.reviewMainBox();
          instance.reviewContentsBox();
          instance.reviewRelativeBox();

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
              contents_desid: instance.designers.length > 0 ? instance.designers[0].desid : "null",
              contents_pid: instance.pid,
            }
          }).catch((err) => {
            console.log(err);
          });

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewDetailJs.launching.ghostClientLaunching : " + e.message + "\n\n" + JSON.stringify(instance.contentsArr)}, BACKHOST + "/errorLog");
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
      ajaxJson({ mode: "review" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;
      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "ReviewDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
