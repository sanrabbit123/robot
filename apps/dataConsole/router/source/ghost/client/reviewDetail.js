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
  "route": [
    "reviewDetail",
    "RD"
  ]
} %/%/g

const ReviewDetailJs = function () {
  this.mother = new GeneralJs();
}

ReviewDetailJs.binaryPath = "/middle/review";

ReviewDetailJs.prototype.reviewMainBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const photoChar = 'b';
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

  mainHeight = <%% 800, 750, 710, 620, (210 / 297) * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 250, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 760, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 510, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  photoRightMargin = <%% 50, 50, 45, 40, 50 %%>;

  quoteHeight = <%% 14, 14, 13, 11, 2 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% 140, 135, 125, 80, 5 %%>;
  quotePaddingLeft = <%% 2, 2, 2, 2, 5.4 %%>;

  topReviewSize = <%% 16, 16, 15, 14, 15 %%>;
  topReviewWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleSize = <%% 36, 35, 33, 29, 4.5 %%>;
  mainTitleWeight = <%% 400, 400, 400, 400, 400 %%>;
  mainTitleLineHeight = <%% 1.16, 1.16, 1.16, 1.16, 1.2 %%>;
  mainTitleMarginTop = <%% 5, 5, 5, 3, 7.5 %%>;

  subTitleSize = <%% 18, 17, 17, 15, 3.1 %%>;
  subTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  subTitleMarginTop = <%% 17, 17, 16, 13, 20 %%>;

  subLineWidth = <%% 170, 120, 95, 75, 95 %%>;
  subLineHeight = <%% 11, 11, 11, 10, 11 %%>;
  subLineLeft = <%% 160, 150, 150, 135, 150 %%>;

  bottomWordingVisualBottom = <%% -2, -2, -2, -2, -2 %%>;
  bottomWordingLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileWhiteBoxTop = 20;
  mobileWhiteBoxLeft = 8;
  mobileWhiteBoxWidth = 36.6;
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
      position: desktop ? "desktop" : "absolute",
      width: desktop ? String(pictureWidth) + ea : String(100) + '%',
      height: desktop ? String(pictureHeight) + ea : String(100) + '%',
      borderRadius: desktop ? String(5) + "px" : "",
      backgroundImage: "url('" + "https://" + GHOSTHOST + "/corePortfolio/listImage/" + pid + "/" + photoChar + String(1) + pid + ".jpg" + "')",
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
        animation: "fadeuplite 0.5s ease forwards",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
            background: colorChip.white,
            opacity: String(0.8),
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
  const { createNode, colorChip, withOut, svgMaker, equalJson, designerMthParsing, designerCareer } = GeneralJs;
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

  mainWidth = <%% 900, 900, 900, 760, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.5 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.5 %%>;
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

  wordingTop = <%% 3, 3, 3, 3, 0.6 %%>;
  questionMargin = <%% 10, 10, 10, 10, 1 %%>;
  answerMargin = <%% 36, 36, 36, 36, 6 %%>;

  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowBoxPadding = <%% 50, 50, 50, 36, 3.5 %%>;
  belowBoxHeight = <%% 300, 300, 300, 260, 30 %%>;

  belowWhiteWidth = <%% 200, 200, 200, 165, 0 %%>;

  belowPictureWidth = <%% 350, 350, 350, 305, 43 %%>;
  belowPictureMargin = <%% 18, 18, 18, 16, 0 %%>;

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
  belowTextAreaTitleBarTop = <%% 12, 12, 12, 12, 2 %%>;

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
      src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + pid + "/" + photoChar + String(index) + pid + ".jpg";
      garo = (photoDetail[index - 1].gs === 'g');
      createNode({
        mother: mainTong,
        mode: "img",
        attribute: { src },
        style: {
          width: garo ? String(100) + '%' : "calc(50% - " + String(photoMargin / 2) + ea + ")",
          display: "inline-block",
          marginBottom: String(photoMargin) + ea,
          marginRight: String(garo ? 0 : (num % 2 === 0 ? photoMargin : 0)) + ea,
          borderRadius: String(desktop ? 3 : 0) + "px",
        }
      });
      num++;
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
        },
        children: [
          {
            style: {
              backgroundImage: "url('" + "https://" + GHOSTHOST + "/corePortfolio/listImage/" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
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
        style: {
          display: "inline-block",
          position: "relative",
          borderRadius: String(5) + "px",
          width: String(belowPictureWidth) + ea,
          height: String(100) + '%',
          marginLeft: String(belowPictureMargin) + ea,
          backgroundImage: "url('" + "https://" + GHOSTHOST + "/corePortfolio/listImage/" + pid + "/" + photoChar + String(contents.contents.portfolio.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: desktop ? "auto 100%" : "100% auto",
          backgroundPosition: "50% 50%",
          verticalAlign: "top",
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(belowWhiteWidth + belowPictureWidth + (belowPictureMargin * 2) + belowTextAreaPaddingLeft, ea),
          paddingTop: String(belowTextAreaPaddingTop) + ea,
          marginLeft: String(belowPictureMargin) + ea,
          paddingLeft: String(belowTextAreaPaddingLeft) + ea,
          verticalAlign: "top",
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
          style: {
            display: "inline-block",
            position: "relative",
            borderRadius: String(5) + "px",
            width: String(belowPictureWidth) + ea,
            height: String(100) + '%',
            marginLeft: String(belowPictureMargin) + ea,
            backgroundImage: "url('" + "https://" + GHOSTHOST + "/corePortfolio/listImage/" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
            backgroundSize: desktop ? "auto 100%" : "100% auto",
            backgroundPosition: "50% 50%",
            verticalAlign: "top",
          }
        },
        {
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

ReviewDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce } = GeneralJs;
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
    this.clients = new SearchArray(response.clients);
    this.projects = new SearchArray(response.projects);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

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

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      ajaxJson({ mode: "review" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.clients = new SearchArray(response.clients);
        instance.projects = new SearchArray(response.projects);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;
      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "ReviewDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
