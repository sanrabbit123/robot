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
      "return ('홈리에종 디자이너 포트폴리오 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "portfolioDetail",
  "hangul": "포트폴리오 상세",
  "route": [
    "portfolioDetail",
    "PD"
  ]
} %/%/g

const PortfolioDetailJs = function () {
  this.mother = new GeneralJs();
}

PortfolioDetailJs.binaryPath = FRONTHOST + "/middle/portfolio";

PortfolioDetailJs.prototype.portfolioMainBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone, setQueue, designerMthParsing, designerCareer, selfHref } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, slideContentsClassTong } = this;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const designer = designers.search("desid", contents.desid);
  const photoChar = 't';
  const photoCharMobile = "mot";
  let mainHeight;
  let mainTong;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoBox, designerBox, titleBox;
  let boxMargin;
  let designerBoxWidth;
  let slideBarHeight;
  let designerBoxHeight, titleBoxHeight;
  let gsArray;
  let slide;
  let photoBigBox, photoSlideBox;
  let moveX;
  let photoSlideFactor;
  let photoSlideFactors;
  let photoNextPrevious, photoNextSlide;
  let photoBigFactor, photoBigFactors;
  let photoSlideInterval;
  let designerMthTargets;
  let designerTongPaddingTop;
  let deignserPhotoWidth;
  let designerTitleSize;
  let designerTitleWeight;
  let designerTitleMarginTop;
  let designerMthSize;
  let designerMthWeight;
  let designerMthMarginTop;
  let careerBottom;
  let careerSize;
  let careerWeight;
  let contentsTitleSize, contentsTitleWeight, contentsTitleLineHeight;
  let contentsSubTitleSize, contentsSubTitleWeight, contentsSubTitleLineHeight;
  let contentsTitleBetween;
  let contentsTitleButtonWidth, contentsTitleButtonHeight, contentsTitleButtonTextTop, contentsTitleButtonSize, contentsTitleButtonWeight;

  mainHeight = <%% 800, 750, 710, 590, 91 %%>;

  contentsBoxTop = <%% 38, 38, 38, 38, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 89 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  boxMargin = <%% 40, 40, 32, 24, 3 %%>;
  designerBoxWidth = <%% 210, 210, 200, 175, 210 %%>;
  slideBarHeight = <%% 124, 124, 124, 124, 17 %%>;

  designerBoxHeight = <%% 303, 303, 303, 260, 303 %%>;
  titleBoxHeight = <%% 210, 210, 200, 175, 210 %%>;

  moveX = <%% 138, 138, 138, 138, 18 %%>;

  designerTongPaddingTop = <%% 30, 30, 30, 27, 30 %%>;
  deignserPhotoWidth = <%% 124, 124, 124, 110, 124 %%>;

  designerTitleSize = <%% 19, 19, 19, 16, 19 %%>;
  designerTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  designerTitleMarginTop = <%% (isMac() ? 10 : 11), (isMac() ? 10 : 11), (isMac() ? 10 : 11), (isMac() ? 7 : 8), 10 %%>;

  designerMthSize = <%% 13, 13, 13, 11, 13 %%>;
  designerMthWeight = <%% 500, 500, 500, 500, 500 %%>;
  designerMthMarginTop = <%% 3, 3, 3, 2, 3 %%>;

  careerBottom = <%% 30, 30, 30, 27, 30 %%>;
  careerSize = <%% 12, 12, 12, 11, 12 %%>;
  careerWeight = <%% 400, 400, 400, 400, 400 %%>;

  contentsTitleSize = <%% 26, 26, 25, 21, 26 %%>;
  contentsTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  contentsSubTitleSize = <%% 15, 15, 14, 12, 15 %%>;
  contentsSubTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  contentsSubTitleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  contentsTitleBetween = <%% 14, 14, 14, 10, 14 %%>;

  contentsTitleButtonWidth = <%% 96, 96, 96, 88, 96 %%>;
  contentsTitleButtonHeight = <%% 38, 38, 38, 34, 36 %%>;
  contentsTitleButtonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -2 %%>;
  contentsTitleButtonSize = <%% 14, 14, 14, 12, 13 %%>;
  contentsTitleButtonWeight = <%% 600, 600, 600, 600, 600 %%>;

  slide = contents.contents.portfolio.detailInfo.slide;
  gsArray = slide.map((index) => {
    let target;
    target = null;
    for (let { index: photoIndex, gs } of contents.photos.detail) {
      if (index === photoIndex) {
        target = gs;
        break;
      }
    }
    return target;
  });

  mainTong = createNode({
    mother: totalContents,
    class: [ slideContentsClassTong ],
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(naviHeight) + "px",
      height: String(mainHeight) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
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

  photoSlideInterval = null;
  photoNextSlide = () => {}

  photoBox = createNode({
    mother: contentsBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: desktop ? withOut(designerBoxWidth + boxMargin, ea) : String(100) + '%',
      height: String(100) + '%',
      marginRight: desktop ? String(boxMargin) + ea : "",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: withOut(slideBarHeight + boxMargin, ea),
          borderRadius: desktop ? String(5) + "px" : "",
          overflow: "hidden",
          background: colorChip.gray2,
        }
      },
      {
        event: {
          mouseenter: (e) => {
            if (desktop) {
              if (photoSlideInterval !== null) {
                clearInterval(photoSlideInterval);
                photoSlideInterval = null;
              }
            }
          },
          mouseleave: (e) => {
            if (desktop) {
              if (photoSlideInterval !== null) {
                clearInterval(photoSlideInterval);
                photoSlideInterval = null;
              }
              photoSlideInterval = setInterval(photoNextSlide, 3000);
            }
          }
        },
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          height: String(slideBarHeight) + ea,
          marginTop: String(boxMargin) + ea,
        }
      }
    ]
  });

  [ photoBigBox, photoSlideBox ] = [ ...photoBox.children ];

  photoBigFactors = [];
  for (let i = slide.length - 1; i > -1; i--) {
    photoBigFactor = createNode({
      mother: photoBigBox,
      attribute: {
        index: String(i),
        photo: String(slide[i]),
      },
      style: {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        backgroundColor: colorChip.gray1,
        backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + contents.contents.portfolio.pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(slide[i]) + contents.contents.portfolio.pid + ".jpg" + "')",
        backgroundSize: media[0] || media[1] || media[3] ? (gsArray[i] === 'g' ? "100% auto" : "auto 100%") : "auto 100%",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        opacity: String(i === 0 ? 1 : 0),
        transition: "all 0.3s ease",
      }
    });
    photoBigFactors.push(photoBigFactor);
  }

  photoSlideFactors = [];
  for (let i = 0; i < slide.length; i++) {
    photoSlideFactor = createNode({
      mother: photoSlideBox,
      attribute: {
        index: String(i),
        photo: String(slide[i]),
      },
      style: {
        position: "absolute",
        top: String(0),
        height: String(slideBarHeight) + ea,
        width: String(slideBarHeight) + ea,
        left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
        backgroundColor: colorChip.gray1,
        borderRadius: String(5) + "px",
        backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + contents.contents.portfolio.pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(slide[i]) + contents.contents.portfolio.pid + ".jpg" + "')",
        backgroundSize: gsArray[i] === 'g' ? "100% auto" : "auto 100%",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        transform: "translateX(" + String(i < slide.length / 2 ? moveX * i : (moveX * i) - (moveX * slide.length)) + ea + ")",
        opacity: Math.floor(slide.length / 2) <= i && i <= Math.ceil(slide.length / 2) ? String(0) : String(1),
        transition: "all 0.3s ease",
      }
    });
    photoSlideFactors.push(photoSlideFactor);
  }

  photoNextSlide = function () {
    let index;
    let indexNext;
    let viewTargetNumber;
    let childrenTarget;
    let target0, target1;
    for (let i = 0; i < photoSlideFactors.length; i++) {
      index = Number(photoSlideFactors[i].getAttribute("index"));
      indexNext = index - 1 !== -1 ? index - 1 : slide.length - 1;
      photoSlideFactors[i].style.transform = "translateX(" + String(indexNext < slide.length / 2 ? moveX * indexNext : (moveX * indexNext) - (moveX * slide.length)) + ea + ")";
      photoSlideFactors[i].style.opacity = Math.floor(slide.length / 2) <= indexNext && indexNext <= Math.ceil(slide.length / 2) ? String(0) : String(1);
      photoSlideFactors[i].setAttribute("index", String(indexNext));
      if (indexNext === 0) {
        viewTargetNumber = Number(photoSlideFactors[i].getAttribute("photo"));
      }
    }
    childrenTarget = [ ...photoBigBox.children ];
    for (let i = 0; i < childrenTarget.length; i++) {
      if (Number(childrenTarget[i].getAttribute("photo")) === viewTargetNumber) {
        target0 = i - 1;
        target1 = i;
      }
    }
    for (let i = 0; i < childrenTarget.length; i++) {
      if ([ target0, target1 ].includes(i)) {
        childrenTarget[i].style.opacity = String(1);
      } else {
        childrenTarget[i].style.opacity = String(0);
      }
    }
  }

  photoNextPrevious = function () {
    let index;
    let indexPrevious;
    let viewTargetNumber;
    let childrenTarget;
    let target0, target1;
    for (let i = 0; i < photoSlideFactors.length; i++) {
      index = Number(photoSlideFactors[i].getAttribute("index"));
      indexPrevious = index + 1 !== slide.length ? index + 1 : 0;
      photoSlideFactors[i].style.transform = "translateX(" + String(indexPrevious < slide.length / 2 ? moveX * indexPrevious : (moveX * indexPrevious) - (moveX * slide.length)) + ea + ")";
      photoSlideFactors[i].style.opacity = Math.floor(slide.length / 2) <= indexPrevious && indexPrevious <= Math.ceil(slide.length / 2) ? String(0) : String(1);
      photoSlideFactors[i].setAttribute("index", String(indexPrevious));
      if (indexPrevious === 0) {
        viewTargetNumber = Number(photoSlideFactors[i].getAttribute("photo"));
      }
    }
    childrenTarget = [ ...photoBigBox.children ];
    for (let i = 0; i < childrenTarget.length; i++) {
      if (Number(childrenTarget[i].getAttribute("photo")) === viewTargetNumber) {
        target0 = i - 1;
        target1 = i;
      }
    }
    for (let i = 0; i < childrenTarget.length; i++) {
      if ([ target0, target1 ].includes(i)) {
        childrenTarget[i].style.opacity = String(1);
      } else {
        childrenTarget[i].style.opacity = String(0);
      }
    }
  }

  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextSlide();
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * 1) + ea + ")",
      cursor: "pointer",
    }
  });
  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextSlide();
        setQueue(() => {
          photoNextSlide();
        }, 501);
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * 2) + ea + ")",
      cursor: "pointer",
    }
  });
  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextSlide();
        setQueue(() => {
          photoNextSlide();
        }, 501);
        setQueue(() => {
          photoNextSlide();
        }, 1001);
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * 3) + ea + ")",
      cursor: "pointer",
    }
  });
  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextPrevious();
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * -1) + ea + ")",
      cursor: "pointer",
    }
  });
  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextPrevious();
        setQueue(() => {
          photoNextPrevious();
        }, 501);
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * -2) + ea + ")",
      cursor: "pointer",
    }
  });
  createNode({
    mother: photoSlideBox,
    event: {
      click: (e) => {
        photoNextPrevious();
        setQueue(() => {
          photoNextPrevious();
        }, 501);
        setQueue(() => {
          photoNextPrevious();
        }, 1001);
      }
    },
    style: {
      position: "absolute",
      top: String(0),
      height: String(slideBarHeight) + ea,
      width: String(slideBarHeight) + ea,
      left: "calc(50% - " + String(slideBarHeight / 2) + ea + ")",
      background: "transparent",
      borderRadius: String(5) + "px",
      transform: "translateX(" + String(moveX * -3) + ea + ")",
      cursor: "pointer",
    }
  });

  photoSlideInterval = setInterval(photoNextSlide, 3000);

  // designer

  designerBox = createNode({
    mother: contentsBox,
    attribute: {
      desid: designer.desid,
    },
    event: {
      click: function (e) {
        const desid = this.getAttribute("desid");
        selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
      }
    },
    style: {
      display: desktop ? "inline-block" : "none",
      position: "relative",
      verticalAlign: "top",
      background: colorChip.gray0,
      width: String(designerBoxWidth) + ea,
      height: String(designerBoxHeight - designerTongPaddingTop) + ea,
      paddingTop: String(designerTongPaddingTop) + ea,
      textAlign: "center",
      borderRadius: String(5) + "px",
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
  });

  designerMthTargets = designerMthParsing(designer.setting.front.methods);
  for (let mth of designerMthTargets) {
    createNode({
      mother: designerBox,
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
    mother: designerBox,
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

  // title

  titleBox = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "block" : "none",
      position: "absolute",
      bottom: String(0),
      right: String(0),
      width: String(designerBoxWidth) + ea,
      height: String(titleBoxHeight) + ea,
    },
    children: [
      {
        text: contents.contents.portfolio.title.main.split(", ")[1].split(" ").slice(0, contents.contents.portfolio.title.main.split(", ")[1].split(" ").findIndex((str) => { return /py/gi.test(str) })).join(" ") + "\n" + contents.contents.portfolio.title.main.split(", ")[1].split(" ").slice(contents.contents.portfolio.title.main.split(", ")[1].split(" ").findIndex((str) => { return /py/gi.test(str) })).join(" "),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsTitleSize) + ea,
          fontWeight: String(contentsTitleWeight),
          color: colorChip.black,
          textAlign: "right",
          lineHeight: String(contentsTitleLineHeight),
        }
      },
      {
        text: contents.contents.portfolio.title.sub.split(", ").join("\n"),
        style: {
          display: "block",
          position: "relative",
          marginTop: String(contentsTitleBetween) + ea,
          fontSize: String(contentsSubTitleSize) + ea,
          fontWeight: String(contentsSubTitleWeight),
          color: colorChip.gray5,
          textAlign: "right",
          lineHeight: String(contentsSubTitleLineHeight),
        }
      },
      {
        class: [ "consultingButtonTop" ],
        event: {
          click: (e) => { selfHref(FRONTHOST + "/consulting.php") },
        },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: String(0),
          right: String(0),
          width: String(contentsTitleButtonWidth) + ea,
          height: String(contentsTitleButtonHeight) + ea,
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          boxSizing: "border-box",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: "상담 받기",
            style: {
              position: "relative",
              top: String(contentsTitleButtonTextTop) + ea,
              fontSize: String(contentsTitleButtonSize) + ea,
              fontWeight: String(contentsTitleButtonWeight),
              color: colorExtended.mainBlue,
            }
          }
        ]
      }
    ]
  });

}

PortfolioDetailJs.prototype.portfolioContentsBox = function (updatedContents = null) {
  const instance = this;
  const { createNode, colorChip, objectDeepCopy, colorExtended, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue, removeByClass } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, mainContentsClassTong0, mainContentsClassTong1, slideContentsClassTong } = this;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const { contents: { review, portfolio }, photos } = (updatedContents !== null ? updatedContents : contents);
  const { detail: photoDetail } = photos;
  const { contents: { detail } } = portfolio;
  const designer = designers.search("desid", contents.desid);
  const editmodeClassName = "editmodeClassName";
  const story = equalJson(JSON.stringify(detail));
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const imgDomClassName = "imgDomClassName";
  const contentsDomClassName = "contentsDomClassName";
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
  let contentsTitleSize;
  let pastPhotoKey;
  let contentsBlock;

  story.shift();
  customerStory = detail[0].contents;

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsTitleSize = <%% 23, 23, 23, 22, 4.5 %%>;
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
  blankMargin = <%% 84, 84, 84, 68, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 80, 13 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  contentsPadding = <%% 21, 21, 21, 21, 6 %%>;

  wordingTop = <%% (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), 0.6 %%>;
  questionMargin = <%% 25, 25, 25, 25, 3.2 %%>;
  answerMargin = <%% 42, 42, 42, 42, 6 %%>;

  questionWeight = <%% 400, 400, 400, 400, 400 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowBoxPadding = <%% 50, 50, 50, 36, 3.5 %%>;
  belowBoxHeight = <%% 300, 300, 300, 260, 30 %%>;

  belowWhiteWidth = <%% 200, 200, 200, 156, 0 %%>;

  belowPictureWidth = <%% 350, 350, 350, 290, 43 %%>;
  belowPictureMargin = <%% 18, 18, 18, 12, 0 %%>;

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

  removeByClass(mainContentsClassTong0);
  removeByClass(mainContentsClassTong1);

  mainTong = createNode({
    mother: totalContents,
    class: [ mainContentsClassTong0 ],
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

  if (updatedContents !== null) {
    totalContents.insertBefore(mainTong, document.querySelector('.' + slideContentsClassTong).nextElementSibling);
  }

  createNode({
    mother: mainTong,
    text: portfolio.title.main.replace(/, /, "\n"),
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
    attribute: { value: customerStory },
    event: {
      click: async function (e) {
        const self = this;
        createNode({
          mother: this,
          class: [ editmodeClassName ],
          event: {
            click: (e) => { e.stopPropagation(); removeByClass(editmodeClassName) },
          },
          style: {
            position: "fixed",
            top: 0,
            left: window.innerWidth * -3,
            background: "transparent",
            width: window.innerWidth * 6,
            height: totalContents.getBoundingClientRect().height,
            zIndex: 10,
          }
        })
        createNode({
          mother: this,
          class: [ editmodeClassName ],
          event: {
            click: (e) => { e.stopPropagation(); },
            keydown: async function (e) {
              if (e.key === "Tab") {
                e.preventDefault();
              }
            },
            keyup: async function (e) {
              if (e.key === "Tab") {
                const finalValue = this.firstChild.value.trim().replace(/\n/gi, "<br>");
                self.firstChild.textContent = "";
                self.firstChild.insertAdjacentHTML("beforeend", finalValue);
                self.setAttribute("value", finalValue);
                removeByClass(editmodeClassName);
              }
            },
          },
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: withOut(0),
            height: withOut(0),
            background: colorChip.white,
            zIndex: 10,
          },
          child: {
            mode: "textarea",
            text: this.getAttribute("value"),
            style: {
              width: withOut(0),
              height: withOut(0),
              border: String(0),
              outline: String(0),
              fontSize: String(contentsSize) + ea,
              fontWeight: String(contentsWeight),
              lineHeight: String(contentsLineHeight),
              color: colorExtended.blueDark,
            }
          }
        })
      }
    },
    style: {
      width: desktop ? String(100) + '%' : withOut(contentsPadding * 2, ea),
      marginTop: String(customerMarginTop) + ea,
      paddingRight: desktop ? "" : String(contentsPadding) + ea,
      paddingLeft: desktop ? "" : String(contentsPadding) + ea,
    },
    child: {
      text: customerStory,
      style: {
        width: withOut(0),
        textAlign: "left",
        border: String(0),
        outline: String(0),
        background: "transparent",
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        lineHeight: String(contentsLineHeight),
        color: colorChip.black,
      }
    }
  })

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin2) + ea,
    }
  });

  totalNum = 0;
  pastPhotoKey = 1;
  for (let { contents, title, photoKey } of story) {

    num = 0;
    for (let i = pastPhotoKey; i < photoKey + 1; i++) {
      if (desktop) {
        src = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(i) + pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + pid + "/mobile/" + photoCharMobile + String(i) + pid + ".jpg";
      }
      garo = (photoDetail[i - 1].gs === 'g');
      createNode({
        mother: mainTong,
        mode: "img",
        class: [ imgDomClassName, imgDomClassName + String(i) + pid ],
        attribute: { src, draggable: "true", gs: photoDetail[i - 1].gs, pid, index: String(i) },
        event: {
          selectstart: (e) => { e.preventDefault(); },
          dragstart: function (e) {
            e.dataTransfer.setData("dragData", JSON.stringify({
              type: "image",
              gs: this.getAttribute("gs"),
              source: this.getAttribute("src"),
              index: this.getAttribute("index"),
            }));
          },
          drop: async function (e) {
            e.preventDefault();
            e.stopPropagation();
            const pid = this.getAttribute("pid");
            const toGs = this.getAttribute("gs");
            const toSrc = this.getAttribute("src");
            const toDom = this;
            const { type } = JSON.parse(e.dataTransfer.getData("dragData"));
            if (type === "image") {
              const { gs: fromGs, index: fromIndex, source: fromSrc } = JSON.parse(e.dataTransfer.getData("dragData"));
              const fromDom = document.querySelector("." + imgDomClassName + String(fromIndex) + pid);
              if (toGs === fromGs) {
                toDom.setAttribute("src", fromSrc);
                fromDom.setAttribute("src", toSrc);
              } else {
                if (toGs === 's') {
                  if ((totalContents.getBoundingClientRect().width / 2) <= toDom.getBoundingClientRect().x) {
                    toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling);
                  } else {
                    toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling.nextElementSibling);
                  }
                } else {
                  if ((totalContents.getBoundingClientRect().width / 2) <= fromDom.getBoundingClientRect().x) {
                    toDom.parentElement.insertBefore(fromDom.previousElementSibling, toDom.nextElementSibling);
                    toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling.nextElementSibling);
                  } else {
                    toDom.parentElement.insertBefore(fromDom.nextElementSibling, toDom.nextElementSibling);
                    toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling);
                  }
                }
              }
            } else if (type === "text") {
              const { index } = JSON.parse(e.dataTransfer.getData("dragData"));
              const fromDom = document.querySelector("." + contentsDomClassName + String(index) + pid);
              if (toGs === "s") {
                if ((totalContents.getBoundingClientRect().width / 2) > toDom.getBoundingClientRect().x) {
                  toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling.nextElementSibling);
                } else {
                  toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling);
                }
              } else {
                toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling);
              }
            }
          },
          dragenter: function (e) {
            e.preventDefault();
            e.stopPropagation();
          },
          dragover: function (e) {
            e.preventDefault();
            e.stopPropagation();
          },
          dragleave: function (e) {
            e.preventDefault();
            e.stopPropagation();
          },
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

    contentsBlock = createNode({
      mother: mainTong,
      attribute: { draggable: "true", index: String(totalNum), pid, value: contents, title: (title.slice(0, 1).toUpperCase() + title.slice(1).replace(/room$/i, '') + (/room/i.test(title) ? " room" : "")), },
      class: [ contentsDomClassName, contentsDomClassName + String(totalNum) + pid ],
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData("dragData", JSON.stringify({
            type: "text",
            pid: this.getAttribute("pid"),
            index: this.getAttribute("index"),
          }));
        },
        click: async function (e) {
          const self = this;
          const [ , title, contents ] = [ ...this.children ];
          if (e.srcElement === contents || e.srcElement.parentElement === contents) {
            createNode({
              mother: contents,
              class: [ editmodeClassName ],
              event: {
                click: (e) => { e.stopPropagation(); removeByClass(editmodeClassName) },
              },
              style: {
                position: "fixed",
                top: 0,
                left: window.innerWidth * -3,
                background: "transparent",
                width: window.innerWidth * 6,
                height: totalContents.getBoundingClientRect().height,
                zIndex: 10,
              }
            })
            createNode({
              mother: contents,
              class: [ editmodeClassName ],
              event: {
                click: (e) => { e.stopPropagation(); },
                keydown: async function (e) {
                  if (e.key === "Tab") {
                    e.preventDefault();
                  }
                },
                keyup: async function (e) {
                  if (e.key === "Tab") {
                    const finalValue = this.firstChild.value.trim().replace(/\n/gi, "<br>");
                    contents.firstChild.textContent = "";
                    contents.firstChild.insertAdjacentHTML("beforeend", finalValue);
                    self.setAttribute("value", finalValue);
                    removeByClass(editmodeClassName);
                  }
                },
              },
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: withOut(0),
                height: withOut(0),
                background: colorChip.white,
                zIndex: 10,
              },
              child: {
                mode: "textarea",
                text: this.getAttribute("value"),
                style: {
                  width: withOut(0),
                  height: withOut(0),
                  border: String(0),
                  outline: String(0),
                  fontSize: String(contentsSize) + ea,
                  fontWeight: String(contentsWeight),
                  lineHeight: String(contentsLineHeight),
                  color: colorExtended.blueDark,
                }
              }
            })

          } else {
            console.log("title");
          }
        },
        drop: async function (e) {
          e.preventDefault();
          e.stopPropagation();
          const pid = this.getAttribute("pid");
          const index = this.getAttribute("index");
          const toDom = this;
          const { type } = JSON.parse(e.dataTransfer.getData("dragData"));
          if (type === "image") {
            const { gs: fromGs, index: fromIndex, source: fromSrc } = JSON.parse(e.dataTransfer.getData("dragData"));
            const fromDom = document.querySelector("." + imgDomClassName + String(fromIndex) + pid);
            if (fromGs === 's') {
              if ((totalContents.getBoundingClientRect().width / 2) <= fromDom.getBoundingClientRect().x) {
                toDom.parentElement.insertBefore(fromDom.previousElementSibling, toDom);
                toDom.parentElement.insertBefore(fromDom, toDom);
              } else {
                toDom.parentElement.insertBefore(fromDom.nextElementSibling, toDom);
                toDom.parentElement.insertBefore(fromDom, toDom.previousElementSibling);
              }
            } else {
              toDom.parentElement.insertBefore(fromDom, toDom);
            }
          } else if (type === "text") {
            const { index } = JSON.parse(e.dataTransfer.getData("dragData"));
            const fromDom = document.querySelector("." + contentsDomClassName + String(index) + pid);
            toDom.parentElement.insertBefore(fromDom, toDom.nextElementSibling);
          }
        },
        dragenter: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        dragover: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        dragleave: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        contextmenu: async function (e) {
          e.preventDefault();
          const index = Number(this.getAttribute("index"));
          const contents = instance.originalContentsArr[0];
          const thisCopied = objectDeepCopy(contents.contents.portfolio.contents.detail[index + 1]);
          if (!e.altKey) {
            contents.contents.portfolio.contents.detail.splice(index + 1, 0, thisCopied);
          } else {
            contents.contents.portfolio.contents.detail.splice(index + 1, 1);
          }
          instance.originalContentsArr = [ contents ];
          instance.portfolioContentsBox(contents);
        }
      },
      style: {
        width: desktop ? String(100) + '%' : withOut(contentsPadding * 2, ea),
      }
    })
    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        height: String(blankMargin) + ea,
      }
    });
    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        position: "relative",
        textAlign: "center",
        width: String(100) + '%',
        marginBottom: String(questionMargin) + ea,
        paddingLeft: desktop ? "" : String(contentsPadding) + ea,
        paddingRight: desktop ? "" : String(contentsPadding) + ea,
      },
      children: [
        {
          text: title.slice(0, 1).toUpperCase() + title.slice(1).replace(/room$/i, '') + (/room/i.test(title) ? " room" : ""),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsTitleSize) + ea,
            fontWeight: String(questionWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.black,
            fontFamily: "graphik",
            borderBottom: "1px solid " + colorChip.gray3,
          }
        }
      ]
    });
    createNode({
      mother: contentsBlock,
      style: {
        width: String(100) + '%',
        marginTop: String(customerMarginTop) + ea,
        paddingRight: desktop ? "" : String(contentsPadding) + ea,
        paddingLeft: desktop ? "" : String(contentsPadding) + ea,
      },
      child: {
        text: contents,
        style: {
          width: withOut(0),
          textAlign: "left",
          border: String(0),
          outline: String(0),
          background: "transparent",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          lineHeight: String(contentsLineHeight),
          color: colorChip.black,
        }
      }
    });
    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        height: String(blankMargin2) + ea,
      }
    });

    pastPhotoKey = photoKey + 1;
    totalNum++;
  }

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  if (review.contents.detail.length > 0) {
    instance.portfolioDesignerBox(updatedContents);
  }
}

PortfolioDetailJs.prototype.relativeContents = function (contents, length) {
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

PortfolioDetailJs.prototype.portfolioRelativeBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, sleep, setQueue, equalJson, isMac, isIphone, selfHref, serviceParsing, swipePatch, homeliaisonAnalytics, dateToString } = GeneralJs;
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
  let titleSubSize;
  let titleSubMarginTop;
  let subTitle;
  let service;
  let tagBlock;
  let subInfoSize;
  let subInfoWeight;
  let subInfoTextTop;
  let subArrowWidth;
  let subArrowHeight;
  let subArrowBottom;
  let subArrowReviewBottom;
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
  mainPaddingTop = <%% 100, 96, 86, 72, 10 %%>;
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
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 4 : 2), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 17, 16, 17, 14, 3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.1 %%>;

  titleSubSize = <%% 12, 12, 12, 11, 2.3 %%>;
  titleSubMarginTop = <%% 2, 2, 2, 2, 0.5 %%>;

  tagTongMarginTop = <%% 10, 10, 10, 8, 1.6 %%>;
  tagTongWidthRatio = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  tagSize = <%% 10, 8, 10, 7, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 7, 7, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), isIphone() ? 1.2 : 1.4 %%>;
  tagMarginRight = <%% 3, 2, 3, 2, 1 %%>;

  subInfoSize = <%% 12, 11, 11, 10, 2.5 %%>;
  subInfoWeight = <%% 500, 500, 500, 500, 500 %%>;
  subInfoTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  subArrowWidth = <%% 30, 30, 30, 30, 4 %%>;
  subArrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;
  subArrowBottom = <%% 3, 3, 3, 2, 1 %%>;
  subArrowReviewBottom = <%% 4, 4, 4, 3, 1.5 %%>;

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
                method: "share",
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
        text: "유사한 포트폴리오",
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
  })

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
            source: this.mother.returnBigArrow(colorExtended.mainBlue),
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
            source: this.mother.returnBigArrow(colorExtended.mainBlue),
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

        ({ contents: filteredContents, service } = filtered[i]);

        if (desktop) {
          src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/" + photoChar + String(filteredContents.portfolio.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
        } else {
          src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/mobile/" + photoCharMobile + String(filteredContents.portfolio.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
        }

        title = desktop ? filteredContents.portfolio.title.main.split(", ")[1] : filteredContents.portfolio.title.sub.split(", ")[1];
        title = title.replace(/홈?스타일링/gi, '') + serviceParsing(0).name[Number(service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1];
        subTitle = filteredContents.portfolio.title.sub;
        if (!mobile) {
          if (subTitle.length > 27) {
            subTitle = filteredContents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        } else {
          if (subTitle.length > 25) {
            subTitle = filteredContents.portfolio.title.sub.replace(/홈?스타일링$/i, '');
          }
        }
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
                        color: colorChip.deactive,
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
                borderTop: "1px solid " + colorChip.gray2,
                left: String(0) + ea,
                paddingTop: String(tagTongMarginTop) + ea,
              },
              children: [
                {
                  text: filteredContents.portfolio.spaceInfo.region + "&nbsp;&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;&nbsp;" + filteredContents.portfolio.spaceInfo.method.split(" ")[0] + " 스타일링",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(subInfoTextTop) + ea,
                    fontSize: String(subInfoSize) + ea,
                    fontWeight: String(subInfoWeight),
                    color: colorChip.black,
                  },
                  bold: {
                    fontWeight: String(subInfoWeight),
                    color: colorExtended.mainBlue,
                  }
                },
                {
                  mode: "svg",
                  source: svgMaker.horizontalArrow(subArrowWidth, subArrowHeight),
                  style: {
                    position: "absolute",
                    width: String(subArrowWidth) + ea,
                    right: String(0),
                    bottom: String(subArrowBottom) + ea,
                  }
                }
              ]
            }
          ]
        });

        instance.relativePhotoNumber++;

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

PortfolioDetailJs.prototype.portfolioDesignerBox = function (updatedContents = null) {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue, serviceParsing } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, mainContentsClassTong1, slideContentsClassTong } = this;
  const version = 0;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const { contents: { review }, photos } = updatedContents !== null ? updatedContents : contents;
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
  let boxHeight, boxPhotoWidth, boxBorderRadius;
  let boxBetween;
  let boxDetailBoxPaddingTop;
  let boxDetailBoxPaddingLeft;
  let boxDetailBoxLineMargin;
  let boxDetailAbsolutePadding;
  let boxDetailAbsoluteBoxHeight;
  let boxDetailAbsoluteArrowPadding;
  let boxDetailAbsoluteTextSize, boxDetailAbsoluteTextWeight;
  let boxDetailAbsoluteArrowWidth, boxDetailAbsoluteArrowBetween, boxDetailAbsoluteArrowVisualTop;
  let boxDetailBoxTitleSize, boxDetailBoxTitleWeight;
  let boxDetailBoxDetailSize, boxDetailBoxDetailWeight;
  let boxDetailBoxTitleEngSize, boxDetailBoxTitleEngWeight, boxDetailBoxTitleEngVisualTop;
  let baseTop;
  let baseBottom0, baseBottom1;
  let designerHomeTextTop;
  let careerString;

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = <%% (version === 1 ? 980 : 900), 900, 900, 720, 88 %%>;
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

  boxHeight = <%% 404, 404, 394, 330, 80 %%>;
  boxPhotoWidth = <%% (version === 1 ? 652 : 572), (version === 1 ? 572 : 572), (version === 1 ? 572 : 572), (version === 1 ? 450 : 450), 88 %%>;
  boxBorderRadius = <%% 10, 10, 10, 10, 10 %%>;
  boxBetween = <%% 12, 12, 12, 12, 1.5 %%>;

  boxDetailBoxPaddingTop = <%% 24, 24, 24, 18, 4 %%>;
  boxDetailBoxPaddingLeft = <%% 24, 24, 24, 20, 5 %%>;

  boxDetailBoxLineMargin = <%% 8, 8, 8, 8, 1.6 %%>;

  boxDetailAbsolutePadding = <%% 10, 10, 10, 10, 2 %%>;
  boxDetailAbsoluteBoxHeight = <%% 52, 52, 50, 45, 9.6 %%>;

  boxDetailAbsoluteArrowPadding = <%% 16, 15, 14, 13, 4 %%>;
  boxDetailAbsoluteTextSize = <%% 15, 15, 15, 13, 3 %%>;
  boxDetailAbsoluteTextWeight = <%% 300, 300, 300, 300, 300 %%>;
  boxDetailAbsoluteArrowWidth = <%% 18, 18, 18, 14, 4 %%>;
  boxDetailAbsoluteArrowBetween = <%% 6, 6, 6, 6, 1.5 %%>;
  boxDetailAbsoluteArrowVisualTop = <%% (isMac() ? -0 : 0), (isMac() ? -0 : 0), (isMac() ? -0 : 0), (isMac() ? -0 : 0), -0.1 %%>;

  boxDetailBoxTitleSize = <%% 20, 19, 17, 16, 3.8 %%>;
  boxDetailBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  boxDetailBoxDetailSize = <%% 13, 13, 13, 10, 3 %%>;
  boxDetailBoxDetailWeight = <%% 400, 400, 400, 400, 400 %%>;

  boxDetailBoxTitleEngSize = <%% 22, 21, 19, 18, 4.1 %%>;
  boxDetailBoxTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
  boxDetailBoxTitleEngVisualTop = <%% 0.5, 0.5, 0.5, 0.5, 0.1 %%>;

  baseTop = <%% 140, 110, 110, 80, 2.5 %%>;
  baseBottom0 = <%% 150, 115, 115, 85, 25 %%>;
  baseBottom1 = <%% 200, 200, 200, 160, 24 %%>;

  careerString = designerCareer(designer, true);

  designerHomeTextTop = <%% (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), 0 %%>;

  mainTong = createNode({
    mother: totalContents,
    class: [ mainContentsClassTong1 ],
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  if (updatedContents !== null) {
    totalContents.insertBefore(mainTong, document.querySelector('.' + slideContentsClassTong).nextElementSibling.nextElementSibling);
  }

  createNode({
    mother: mainTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: desktop ? String(boxHeight) + ea : "",
      flexDirection: desktop ? "row" : "column",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: desktop ? "inline-flex" : "none",
          position: "relative",
          height: desktop ? withOut(0, ea) : String(45) + ea,
          width: desktop ? String(boxPhotoWidth) + ea : withOut(0, ea),
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.portfolio.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
          borderRadius: String(boxBorderRadius) + "px",
        }
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          height: desktop ? withOut(0, ea) : "",
          width: desktop ? withOut(boxPhotoWidth + boxBetween, ea) : withOut(0, ea),
          marginLeft: desktop ? String(boxBetween) + ea : "",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(boxDetailBoxPaddingLeft * 2, ea),
              height: desktop ? "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")" : String(30) + ea,
              borderRadius: String(boxBorderRadius) + "px",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginBottom: String(boxBetween) + ea,
              paddingTop: String(boxDetailBoxPaddingTop) + ea,
              paddingBottom: String(boxDetailBoxPaddingTop) + ea,
              paddingLeft: String(boxDetailBoxPaddingLeft) + ea,
              paddingRight: String(boxDetailBoxPaddingLeft) + ea,
              background: colorExtended.blue,
            },
            children: [
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: function (e) { selfHref(FRONTHOST + "/desdetail.php?desid=" + this.getAttribute("desid")) },
                },
                attribute: { desid: designer.desid },
                style: {
                  display: "flex",
                  position: "absolute",
                  width: withOut((boxDetailAbsolutePadding * 2) + boxDetailAbsoluteArrowPadding, ea),
                  left: String(boxDetailAbsolutePadding) + ea,
                  bottom: String(boxDetailAbsolutePadding) + ea,
                  height: String(boxDetailAbsoluteBoxHeight) + ea,
                  borderRadius: String(boxBorderRadius) + "px",
                  background: colorExtended.blueLight,
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  paddingRight: String(boxDetailAbsoluteArrowPadding) + ea,
                  cursor: "pointer",
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "DESIGNER HOME",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
                    top: String(designerHomeTextTop) + ea,
                    fontFamily: "gmarket",
                    color: colorExtended.white,
                  },
                  next: {
                    mode: "svg",
                    source: svgMaker.squareArrow(colorExtended.white),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(boxDetailAbsoluteArrowWidth) + ea,
                      marginLeft: String(boxDetailAbsoluteArrowBetween) + ea,
                      top: String(boxDetailAbsoluteArrowVisualTop) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: designer.designer + " 디자이너",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxTitleSize) + ea,
                    fontWeight: String(boxDetailBoxTitleWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(boxDetailBoxLineMargin) + ea,
                  borderBottom: "1px solid " + colorExtended.white,
                  marginBottom: String(desktop ? boxDetailBoxLineMargin : 2) + ea,
                  opacity: String(0.6),
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: designerMthParsing(designer.setting.front.methods).join(", "),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: careerString,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  },
                  bold: {
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                    opacity: String(0.4),
                  }
                }
              },
            ],
          },
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(boxDetailBoxPaddingLeft * 2, ea),
              height: desktop ? "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")" : String(30) + ea,
              borderRadius: String(boxBorderRadius) + "px",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              paddingTop: String(boxDetailBoxPaddingTop) + ea,
              paddingBottom: String(boxDetailBoxPaddingTop) + ea,
              paddingLeft: String(boxDetailBoxPaddingLeft) + ea,
              paddingRight: String(boxDetailBoxPaddingLeft) + ea,
              background: colorExtended.black,
            },
            children: [
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: function (e) { selfHref(FRONTHOST + "/revdetail.php?pid=" + this.getAttribute("pid")) },
                },
                attribute: { pid: instance.pid },
                style: {
                  display: "flex",
                  position: "absolute",
                  width: withOut((boxDetailAbsolutePadding * 2) + boxDetailAbsoluteArrowPadding, ea),
                  left: String(boxDetailAbsolutePadding) + ea,
                  bottom: String(boxDetailAbsolutePadding) + ea,
                  height: String(boxDetailAbsoluteBoxHeight) + ea,
                  borderRadius: String(boxBorderRadius) + "px",
                  background: colorExtended.darkDarkShadow,
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  paddingRight: String(boxDetailAbsoluteArrowPadding) + ea,
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "REVIEW",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
                    top: String(designerHomeTextTop) + ea,
                    fontFamily: "gmarket",
                    color: colorExtended.white,
                  },
                  next: {
                    mode: "svg",
                    source: svgMaker.squareArrow(colorExtended.blue),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(boxDetailAbsoluteArrowWidth) + ea,
                      marginLeft: String(boxDetailAbsoluteArrowBetween) + ea,
                      top: String(boxDetailAbsoluteArrowVisualTop) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: contents.contents.portfolio.spaceInfo.space + " <b%" + String(contents.contents.portfolio.spaceInfo.pyeong) + "PY%b>",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxTitleSize) + ea,
                    fontWeight: String(boxDetailBoxTitleWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  },
                  bold: {
                    fontSize: String(boxDetailBoxTitleEngSize) + ea,
                    fontWeight: String(boxDetailBoxTitleEngWeight),
                    color: colorExtended.white,
                    fontFamily: "mont",
                    position: "relative",
                    top: String(boxDetailBoxTitleEngVisualTop) + ea,
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(boxDetailBoxLineMargin) + ea,
                  borderBottom: "1px solid " + colorExtended.white,
                  marginBottom: String(desktop ? boxDetailBoxLineMargin : 2) + ea,
                  opacity: String(0.6),
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: serviceParsing(contents.service).replace(/[ ]*(basic|mini|premium)/gi, '').trim(),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: contents.contents.portfolio.title.sub.split(", ")[0] + " " + contents.contents.portfolio.spaceInfo.space,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
            ]
          },
        ]
      }
    ]
  })

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(version === 1 ? baseBottom0 : baseBottom1) + ea,
    }
  });

}

PortfolioDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, objectDeepCopy, setQueue, setDebounce, colorExtended, facebookSdkPatch, kakaoSdkPatch, homeliaisonAnalytics, dateToString } = GeneralJs;
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

    response = await ajaxJson({ mode: "portfolio", pid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.mainContentsClassTong0 = "mainContentsClassTong0";
    this.mainContentsClassTong1 = "mainContentsClassTong1";
    this.slideContentsClassTong = "slideContentsClassTong";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "portfolioDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: PortfolioDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.portfolioMainBox();
          instance.portfolioContentsBox();
          instance.portfolioRelativeBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "PortfolioDetailJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
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
      ajaxJson({ mode: "portfolio" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.originalContentsArr = objectDeepCopy(instance.contentsArr.toNormal());
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
    await ajaxJson({ message: "PortfolioDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
