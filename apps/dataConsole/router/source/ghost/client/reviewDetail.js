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

  mainHeight = 800;
  mainBelowBarHeight = 250;

  contentsBoxTop = 70;
  contentsBoxWidth = 1200;

  bottomVisual = 6;

  pictureWidth = 820;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  photoRightMargin = 50;

  quoteHeight = 14;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = 140;
  quotePaddingLeft = 2;

  topReviewSize = 16;
  topReviewWeight = 400;

  mainTitleSize = 36;
  mainTitleWeight = 400;
  mainTitleLineHeight = 1.16;
  mainTitleMarginTop = 5;

  subTitleSize = 18;
  subTitleWeight = 600;
  subTitleMarginTop = 17;

  subLineWidth = 170;
  subLineHeight = 11;
  subLineLeft = 160;

  bottomWordingVisualBottom = -2;
  bottomWordingLineHeight = 1.5;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray0,
      paddingTop: String(naviHeight) + ea,
      height: String(mainHeight) + ea,
    },
    children: [
      {
        style: {
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
      width: String(contentsBoxWidth) + ea,
      left: "calc(50% - " + String(contentsBoxWidth / 2) + ea + ")",
      top: String(0),
      height: String(mainHeight - (contentsBoxTop * 2)) + ea,
    }
  });

  picture = createNode({
    mother: contentsBox,
    style: {
      display: "inline-block",
      width: String(pictureWidth) + ea,
      height: String(pictureHeight) + ea,
      borderRadius: String(5) + ea,
      backgroundImage: "url('" + "https://" + GHOSTHOST + "/corePortfolio/listImage/" + pid + "/" + photoChar + String(1) + pid + ".jpg" + "')",
      backgroundSize: "auto 100%",
      backgroundPosition: "50% 50%",
      boxShadow: "0px 8px 22px -15px " + colorChip.shadow,
      marginRight: String(photoRightMargin) + ea,
      verticalAlign: "top",
    }
  });

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
  let blankMargin;
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

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = 900;
  mainPaddingTop = 110;

  titleSize = 23;
  titleWeight = 700;
  titleLineHeight = 1.5;
  titleBarMarginTop = 15;
  titleBarWidth = 80;

  contentsSize = 16;
  contentsWeight = 400;
  contentsLineHeight = 1.7;

  customerPaddingLeft = 150;
  customerMarginTop = 36;

  customerSize = 17;
  customerWeight = 400;
  customerTop = 3;
  customerLineHeight = 1.3;

  photoMargin = 8;
  blankMarginFirst = 126;
  blankMargin = 100;
  blankMarginLast = 200;

  contentsPadding = 21;

  wordingTop = 3;
  questionMargin = 10;
  answerMargin = 36;

  questionWeight = 700;
  answerWeight = 400;

  belowBoxPadding = 50;
  belowBoxHeight = 300;

  belowWhiteWidth = 200;

  belowPictureWidth = 350;
  belowPictureMargin = 18;

  nameCardWording = contents.contents.portfolio.title.main.split(", ")[1];

  nameCardIndex = nameCardWording.split(' ').findIndex((str) => { return /py/gi.test(str); });
  nameCardWording = nameCardWording.split(' ').slice(0, nameCardIndex).join(' ') + "\n" + nameCardWording.split(' ').slice(nameCardIndex).join(' ');

  portfolioWordingSize = 15;
  portfolioWordingWeight = 400;

  belowTextAreaPaddingLeft = 12;
  belowTextTitleSize = 25;
  belowTextTitleWeight = 700;
  belowTextTitleLineHeight = 1.4;
  belowTextAreaPaddingTop = 158;
  belowTextAreaTitleBarTop = 12;

  belowTextAreaSubSize = 14;
  belowTextAreaSubWeight = 500;
  belowTextAreaSubLineHeight = 1.5;
  belowTextAreaSubMarginTop = 20;

  designerTongPaddingTop = 30;
  deignserPhotoWidth = 124;

  designerTitleSize = 19;
  designerTitleWeight = 700;
  designerTitleMarginTop = 10;

  designerMthSize = 13;
  designerMthWeight = 500;
  designerMthMarginTop = 3;

  careerBottom = 30;
  careerSize = 12;
  careerWeight = 400;

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
    },
    children: [
      {
        text: "Customer\nStory",
        style: {
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
        height: String(totalNum === 0 ? blankMarginFirst : blankMargin) + ea,
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
          borderRadius: String(3) + "px",
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
          paddingLeft: String(contentsPadding) + ea,
          marginBottom: String(questionMargin) + ea,
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
              left: String(0),
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
          paddingLeft: String(contentsPadding) + ea,
          marginBottom: String(answerMargin) + ea,
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
              left: String(0),
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
      width: withOut(belowBoxPadding * 2, ea),
      padding: String(belowBoxPadding) + ea,
      height: String(belowBoxHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray0,
    },
    children: [
      {
        style: {
          display: "inline-block",
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
          backgroundSize: "auto 100%",
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

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMarginLast) + ea,
    }
  });

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
