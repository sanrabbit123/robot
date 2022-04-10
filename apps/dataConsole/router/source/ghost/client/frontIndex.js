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
      "return ('홈리에종 | 디자이너와 함께 하는 홈스타일링');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 | 디자이너와 함께 하는 홈스타일링');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontIndex",
  "route": [
    "frontIndex",
    "DD"
  ]
} %/%/g

const FrontIndexJs = function () {
  this.mother = new GeneralJs();
}

FrontIndexJs.binaryPath = "/middle/index";

FrontIndexJs.prototype.generateGsArray = function (number) {
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

FrontIndexJs.prototype.insertSlideBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const { indexArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 'b';
  let speed;
  let naviHeight;
  let mainHeight;
  let mainTong;
  let photoTong;
  let randomIndex;
  let randomNumber;
  let random;
  let src;
  let interval;
  let titlePadding;
  let titleSize;
  let titleWeight;
  let lineHeight;
  let titleContents;

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  interval = <%% 2700, 2700, 2700, 2700, 2700 %%>;

  naviHeight = <%% 72, 72, 66, 60, 60 %%>;
  mainHeight = <%% 800, 640, 560, 450, 70.5 %%>;

  randomNumber = <%% 5, 5, 5, 5, 5 %%>;
  titlePadding = <%% 100, 75, 72, 58, 8 %%>;
  titleSize = <%% 56, 45, 43, 36, 6 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  lineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;
  titleContents = "집을 디자인하는\n새로운 방법, 홈리에종";

  randomIndex = [];
  while (randomIndex.length < randomNumber) {
    random = Math.floor(Math.random() * indexArr.length);
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  randomIndex = randomIndex.map((index) => {
    return indexArr[index];
  });

  mainTong = createNode({
    mother: totalContents,
    attribute: {
      toggle: "off",
    },
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(naviHeight) + "px",
      height: String(mainHeight) + ea,
      background: colorChip.gray1,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
      overflow: "hidden",
    },
    children: [
      {
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          top: String(naviHeight) + ea,
          left: String(0),
          width: String(100) + '%',
          height: String(mainHeight) + ea,
          background: colorChip.gray3,
          transition: "all 0s ease",
          transition: "transform " + String(speed) + "s ease",
          transformOrigin: "100% 100%",
          transform: "scaleX(0)",
        }
      }
    ]
  });

  photoTong = createNode({
    mother: mainTong,
    style: {
      position: "relative",
      width: String(desktop ? standardWidth : 100) + ea,
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
      height: String(mainHeight) + ea,
    }
  });

  for (let i = 0; i < randomIndex.length; i++) {
    src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + randomIndex[i].contents.portfolio.pid + "/" + photoChar + String(randomIndex[i].contents.portfolio.detailInfo.photodae[1]) + randomIndex[i].contents.portfolio.pid + ".jpg";
    if (desktop) {
      createNode({
        mother: photoTong,
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          backgroundImage: "url('" + src + "')",
          backgroundPosition: "50% 68%",
          backgroundSize: "100% auto",
          transition: "opacity " + String(speed) + "s ease",
          opacity: String(i !== randomIndex.length - 1 ? 0 : 1),
        }
      });
    } else {
      createNode({
        mother: photoTong,
        attribute: {
          toggle: String(i !== randomIndex.length - 1 ? 0 : 1)
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          backgroundImage: "url('" + src + "')",
          backgroundPosition: "50% 68%",
          backgroundSize: "100% auto",
          transition: "all " + String(0) + "s ease",
          transform: (i !== randomIndex.length - 1 ? "translateX(100" + ea + ")" : "translateX(0" + ea + ")"),
        }
      });
    }
  }

  createNode({
    mother: mainTong,
    style: {
      position: "absolute",
      width: desktop ? String(standardWidth - (titlePadding * 2)) + ea : "",
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(7.2) + ea,
      paddingLeft: desktop ? String(titlePadding) + ea : "",
      paddingRight: desktop ? String(titlePadding) + ea : "",
      bottom: String(titlePadding) + ea,
      zIndex: String(1),
    },
    children: [
      {
        text: titleContents,
        style: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.white,
          lineHeight: String(lineHeight),
        }
      }
    ]
  });

  setInterval(() => {
    const toggle = mainTong.getAttribute("toggle");
    const children = [ ...photoTong.children ];
    let offIndex, onIndex;
    if (desktop) {

      if (toggle === "on") {
        mainTong.firstChild.style.transformOrigin = "0% 100%";
      } else {
        mainTong.firstChild.style.transformOrigin = "100% 100%";
      }
      offIndex = children.findIndex((dom) => { return dom.style.opacity === String(1) });
      onIndex = offIndex - 1;
      if (onIndex < 0) {
        onIndex = children.length - 1;
      }
      if (toggle === "on") {
        mainTong.firstChild.style.transform = "scaleX(0)";
        mainTong.setAttribute("toggle", "off");
      } else {
        mainTong.firstChild.style.transform = "scaleX(1)";
        mainTong.setAttribute("toggle", "on");
      }
      children[offIndex].style.opacity = String(0);
      children[onIndex].style.opacity = String(1);

    } else {

      offIndex = children.findIndex((dom) => { return dom.getAttribute("toggle") === String(1) });
      onIndex = offIndex - 1;
      if (onIndex < 0) {
        onIndex = children.length - 1;
      }
      children[offIndex].setAttribute("toggle", String(0));
      children[onIndex].setAttribute("toggle", String(1));

      children[onIndex].style.zIndex = String(1);
      children[onIndex].style.animation = "frontmobileslideon " + String(speed) + "s ease forwards";
      children[offIndex].style.zIndex = String(1);
      children[offIndex].style.animation = "frontmobileslideoff " + String(speed) + "s ease forwards";

      for (let i = 0; i < children.length; i++) {
        if (i !== onIndex && i !== offIndex) {
          children[i].style.zIndex = String(0);
          children[i].style.animation = "";
        }
      }

      // children[onIndex].style.transform = "translateX(0" + ea + ")";
      // children[offIndex].style.transform = "translateX(-100" + ea + ")";
      //
      // for (let i = 0; i < children.length; i++) {
      //   if (i !== onIndex && i !== offIndex) {
      //     children[i].style.transform = "translateX(100" + ea + ")";
      //   }
      // }

    }

  }, interval);

}

FrontIndexJs.prototype.insertStrongBox = function (force = false) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let speed;
  let mainHeight;
  let mainTong;
  let blockTong;
  let blockNumber;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;
  let strongContents;
  let whiteTongPaddingLeft, whiteTongPaddingTop, whiteTongPaddingRight, whiteTongPaddingBottom;
  let whiteTongTitleSize;
  let iconWidth;
  let whiteTongTitleWeight;
  let whiteTongDescriptionSize;
  let whiteTongDescriptionWeight;
  let whiteTongDescriptionMarginTop;
  let whiteTongDescriptionLineHeight;
  let iconBottom;
  let iconRight;
  let blockMarginBottom;

  if (mobile && !force) {
    return;
  }

  if (media[0]) {
    strongContents = [
      {
        title: "디자이너 추천",
        description: "선호하는 스타일과 역량이 맞는\n디자이너를 추천받을 수 있어요.",
        icon: "icons0.png",
      },
      {
        title: "홈리에종 케어",
        description: "예상하지 못한 상황에도 안심하고\n인테리어를 진행할 수 있어요.",
        icon: "icons1.png",
      },
      {
        title: "원스탑 서비스",
        description: "시공부터 스타일링까지 원스탑\n서비스를 경험할 수 있어요.",
        icon: "icons2.png",
      },
      {
        title: "선 기획 후 시공",
        description: "디자인 선 기획 후 꼭 필요한 시공\n부터 효율적으로 진행할 수 있어요.",
        icon: "icons3.png",
      },
    ]
  } else {
    strongContents = [
      {
        title: "디자이너 추천",
        description: "선호하는 스타일이 맞는\n디자이너를 추천받아요.",
        icon: "icons0.png",
      },
      {
        title: "홈리에종 케어",
        description: "문제 상황에도 안심하고\n진행할 수 있어요.",
        icon: "icons1.png",
      },
      {
        title: "원스탑 서비스",
        description: "시공부터 스타일링까지\n원스탑으로 진행해요.",
        icon: "icons2.png",
      },
      {
        title: "선 기획 후 시공",
        description: "디자인 후 꼭 필요한 시공\n부터 진행할 수 있어요.",
        icon: "icons3.png",
      },
    ]
  }

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  mainHeight = <%% 240, 240, 240, 240, 40 %%>;
  margin = <%% 18, 16, 16, 12, 2 %%>;
  blockNumber = desktop ? strongContents.length : 2;

  tongPaddingLeft = <%% 60, 50, 0, 0, 0 %%>;
  tongPaddingTop = <%% 70, 48, 36, 32, 6.5 %%>;
  tongPaddingBottom = <%% 73, 52, 40, 36, 4.5 %%>;

  whiteTongPaddingLeft = <%% 32, 26, 26, 21, 4 %%>;
  whiteTongPaddingTop = <%% 21, 18, 18, 15, 3.5 %%>;
  whiteTongPaddingRight = <%% 84, 50, 50, 42, 5 %%>;
  whiteTongPaddingBottom = <%% 28, 25, 24, 20, 4 %%>;

  whiteTongTitleSize = <%% 18, 16, 16, 14, 3.5 %%>;
  whiteTongTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  whiteTongDescriptionSize = <%% 14, 13, 13, 11, 2.5 %%>;
  whiteTongDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteTongDescriptionMarginTop = <%% 7, 7, 5, 5, 1.2 %%>;
  whiteTongDescriptionLineHeight = <%% 1.55, 1.55, 1.55, 1.55, 1.55 %%>;

  iconWidth = <%% 24, 24, 24, 18, 5 %%>;
  iconBottom = <%% 32, 28, 28, 24, 4.8 %%>;
  iconRight = <%% 28, 20, 20, 18, 2.8 %%>;

  blockMarginBottom = <%% 3, 3, 3, 3, 2 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray2,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
    },
  });

  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String((standardWidth - (tongPaddingLeft * 2)) + margin) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String((standardWidth - (tongPaddingLeft * 2)) / 2) + ea + ")",
    }
  });

  for (let i = 0; i < strongContents.length; i++) {
    createNode({
      mother: blockTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(margin * blockNumber) + ea + ") / " + String(blockNumber) + ") - " + String(whiteTongPaddingLeft + whiteTongPaddingRight) + ea + ")",
        paddingTop: String(whiteTongPaddingTop) + ea,
        paddingLeft: String(whiteTongPaddingLeft) + ea,
        paddingRight: String(whiteTongPaddingRight) + ea,
        paddingBottom: String(whiteTongPaddingBottom) + ea,
        marginRight: String(margin) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        marginBottom: desktop ? "" : String(blockMarginBottom) + ea,
      },
      children: [
        {
          text: strongContents[i].title,
          style: {
            display: "inline-block",
            position: "relative",
            top: (isMac() || mobile ? "" : String(2) + ea),
            fontSize: String(whiteTongTitleSize) + ea,
            fontWeight: String(whiteTongTitleWeight),
            color: colorChip.black,
          }
        },
        {
          text: strongContents[i].description,
          style: {
            display: "inline-block",
            position: "relative",
            top: (isMac() || mobile ? "" : String(2) + ea),
            marginTop: String(whiteTongDescriptionMarginTop) + ea,
            fontSize: String(whiteTongDescriptionSize) + ea,
            fontWeight: String(whiteTongDescriptionWeight),
            lineHeight: String(whiteTongDescriptionLineHeight),
            color: colorChip.black,
          }
        },
        {
          mode: "img",
          attribute: {
            src: FrontIndexJs.binaryPath + "/" + strongContents[i].icon,
          },
          style: {
            position: "absolute",
            bottom: String(iconBottom) + ea,
            right: String(iconRight) + ea,
            width: String(iconWidth) + ea,
            height: "auto",
          }
        }
      ]
    });
  }

}

FrontIndexJs.prototype.insertSearchBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const { contentsArr, reviewArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  let speed;
  let mainHeight;
  let mainTong;
  let searchTongWidth;
  let searchTongHeight;
  let searchIconHeight;
  let searchIconRight;
  let searchIconTop;
  let inputWithoutHeight;
  let inputSize;
  let inputWeight;
  let portfolioTong;
  let portfolioMargin;
  let src, title, subTitle;
  let block;
  let contents, tag;
  let garoSliceStart;
  let garoSliceEnd;
  let garoSliceLimit;
  let seroSliceStart;
  let seroSliceEnd;
  let seroSliceLimit;
  let tagTong;
  let tagSize, tagWeight;
  let tagPaddingLeft, tagPaddingTop, tagPaddingBottom;
  let tagMarginRight;
  let columns;
  let blockMarginBottom;
  let photoHeight, photoMarginBottom;
  let titleSize, titleWeight;
  let subTitleMarginTop, subTitleSize;
  let tagTongMarginTop;
  let subTitleOverWidthRatio, tagTongOverWidthRatio;
  let reviewTong;
  let titleMarginLeft;
  let quoteHeight;
  let quoteWidth;
  let quoteTop;
  let services;
  let serviceChildren;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let serviceBlock;
  let portfolioBlockPaddingTop;
  let reviewBlockPaddingTop;
  let blockTitleMarginBottom;
  let blockTitleSize, blockTitleWeight;
  let blockWhitePaddingRight;
  let mainPaddingTop;
  let mainPaddingBottom;
  let viewLength;
  let searchWordingSize, searchWordingWeight, searchWordingMarginBottom;
  let searchWordingCircleWidth;
  let searchWordingCircleTop, searchWordingCircleLeft;

  mainPaddingTop = <%% 140, 130, 110, 90, 8 %%>;
  mainPaddingBottom = <%% 150, 140, 120, 100, 5 %%>;

  searchWordingSize = <%% 22, 21, 20, 18, 22 %%>;
  searchWordingWeight = <%% 600, 600, 600, 600, 600 %%>;
  searchWordingMarginBottom = <%% (isMac() ? 20 : 17), (isMac() ? 17 : 15), (isMac() ? 16 : 14), (isMac() ? 15 : 13), 17 %%>;

  searchWordingCircleWidth = <%% 4, 4, 4, 3, 4 %%>;
  searchWordingCircleTop = <%% 6, 6, 6, 5, 6 %%>;
  searchWordingCircleLeft = <%% -6, -6, -6, -5, -6 %%>;

  services = serviceParsing().name;
  services.push("전체 보기");
  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 25 : 26), (isMac() ? 22 : 23), (isMac() ? 20 : 21), (isMac() ? 18 : 19), 27 %%>;

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;

  searchTongWidth = <%% 640, 640, 560, 450, standardWidth %%>;
  searchTongHeight = <%% 40, 40, 40, 40, 8 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;
  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  portfolioMargin = <%% 16, 16, 16, 16, 3 %%>;

  columns = <%% 5, 4, 3, 3, 2 %%>;
  viewLength = <%% 9, 7, 8, 8, 9 %%>;
  blockMarginBottom = <%% 60, 60, 60, 45, 8 %%>;

  photoHeight = <%% 374, 352, 408, 320, 60 %%>;
  photoMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  quoteHeight = <%% 9, 8, 8, 7, 1.6 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.2 : 1.1 %%>;

  titleSize = <%% 17, 17, 17, 15, 3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 5, 5, 5, 5, 1.1 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 0.5 %%>;
  subTitleSize = <%% 12, 12, 12, 12, 2.5 %%>;

  subTitleOverWidthRatio = <%% 2, 2, 2, 2, 2 %%>;
  tagTongOverWidthRatio = <%% 1.1, 1.1, 1.1, 1.1, 1.5 %%>;

  tagTongMarginTop = <%% 11, 11, 11, 11, 1.5 %%>;

  tagSize = <%% 10, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 3, 3, 3, 3, 1 %%>;

  portfolioBlockPaddingTop = <%% 70, 55, 45, 45, 7 %%>;
  reviewBlockPaddingTop = <%% 20, 0, 0, 0, 4 %%>;

  blockTitleMarginBottom = <%% (isMac() ? 24 : 21), (isMac() ? 24 : 20), (isMac() ? 23 : 19), (isMac() ? 17 : 14), 3.2 %%>;
  blockTitleSize = <%% 20, 20, 20, 18, 4 %%>;
  blockTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  blockWhitePaddingRight = <%% 15, 15, 15, 15, 3 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.white,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    },
  });

  createNode({
    mother: mainTong,
    style: {
      display: desktop ? "block" : "none",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      textAlign: "center",
      marginBottom: String(searchWordingMarginBottom) + ea,
    },
    children: [
      {
        text: "원하는 스타일을 찾아보세요!",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(searchWordingSize) + ea,
          fontWeight: String(searchWordingWeight),
          color: colorChip.black,
        },
        children: [
          {
            style: {
              position: "absolute",
              left: String(searchWordingCircleLeft) + ea,
              top: String(searchWordingCircleTop) + ea,
              width: String(searchWordingCircleWidth) + ea,
              height: String(searchWordingCircleWidth) + ea,
              borderRadius: String(searchWordingCircleWidth) + ea,
              background: colorChip.green,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchTongWidth) + ea,
          height: String(searchTongHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(5) + "px",
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
            attribute: {
              type: "text",
              placeholder: desktop ? "화이트 모던" : "원하는 스타일을 찾아보세요!",
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
      }
    ]
  });

  serviceChildren = [];
  for (let service of services) {
    if (desktop) {
      if (serviceChildren.length !== 0) {
        serviceChildren.push({
          style: {
            display: "inline-block",
            position: "relative",
            paddingLeft: String(servicePaddingLeft) + ea,
            paddingRight: String(servicePaddingLeft) + ea,
          },
          children: [
            {
              text: "|",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(serviceSize) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
              },
              bold: {
                color: colorChip.deactive,
              }
            }
          ]
        });
      }
    }
    serviceChildren.push({
      style: {
        display: "inline-block",
        position: "relative",
        paddingLeft: String(servicePaddingLeft) + ea,
        paddingRight: String(servicePaddingLeft) + ea,
        marginBottom: desktop ? "" : String(servicePaddingLeft) + ea,
      },
      children: [
        {
          text: "<b%#%b> " + service,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(serviceSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            cursor: "pointer",
          },
          bold: {
            color: colorChip.green,
          }
        }
      ]
    });
  }

  serviceBlock = createNode({
    mother: mainTong,
    style: {
      display: desktop ? "block" : "none",
      position: "relative",
      textAlign: "center",
      paddingTop: String(serviceBlockPaddingTop) + ea,
    },
    children: serviceChildren
  });

  portfolioTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth + portfolioMargin) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: String(portfolioBlockPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockTitleMarginBottom) + ea,
        },
        children: [
          {
            text: "디자이너 포트폴리오",
            style: {
              display: "inline-block",
              position: "relative",
              paddingRight: String(blockWhitePaddingRight) + ea,
              background: colorChip.white,
              fontSize: String(blockTitleSize) + ea,
              fontWeight: String(blockTitleWeight),
              color: colorChip.black,
              zIndex: String(1),
            },
            bold: {
              fontSize: String(blockTitleSize) + ea,
              color: colorChip.deactive,
            }
          }
        ]
      }
    ]
  });

  for (let i = 0; i < viewLength; i++) {

    ({ contents } = contentsArr[i]);

    src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
    title = contents.portfolio.title.main.split(", ")[1];
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
    tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

    if (i !== 0) {
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
      mother: portfolioTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: i !== 0 ? "calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ")" : "calc(calc(calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ") * 2) + " + String(portfolioMargin) + ea + ")",
        marginRight: String(portfolioMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        overflow: "hidden",
      },
      children: [
        {
          style: {
            display: "block",
            width: String(100) + '%',
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
                width: withOut(0, ea),
                verticalAlign: "top",
              }
            },
            {
              style: {
                display: "block",
                width: withOut(0, ea),
                verticalAlign: "top",
                marginTop: String(subTitleMarginTop) + ea,
                overflow: "hidden",
              },
              children: [
                {
                  text: subTitle,
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(subTitleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.deactive,
                    width: String(subTitleOverWidthRatio * 100) + '%',
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
            width: String(tagTongOverWidthRatio * 100) + '%',
            left: String(0) + ea,
          }
        }
      ]
    });

    tagTong = block.children[2];
    for (let t of tag) {
      createNode({
        mother: tagTong,
        text: "<b%#%b> " + t,
        style: {
          display: "inline-block",
          fontSize: String(tagSize) + ea,
          fontWeight: String(tagWeight),
          color: colorChip.black,
          paddingLeft: String(tagPaddingLeft) + ea,
          paddingTop: String(tagPaddingTop) + ea,
          paddingBottom: String(tagPaddingBottom) + ea,
          paddingRight: String(tagPaddingLeft) + ea,
          borderRadius: String(3) + "px",
          marginRight: String(tagMarginRight) + ea,
          background: colorChip.gray1
        },
        bold: {
          fontWeight: String(400),
          color: colorChip.deactive,
        }
      })
    }


  }

  reviewTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth + portfolioMargin) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: String(reviewBlockPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(blockTitleMarginBottom) + ea,
        },
        children: [
          {
            text: "솔직한 고객 후기",
            style: {
              display: "inline-block",
              position: "relative",
              paddingRight: String(blockWhitePaddingRight) + ea,
              background: colorChip.white,
              fontSize: String(blockTitleSize) + ea,
              fontWeight: String(blockTitleWeight),
              color: colorChip.black,
              zIndex: String(1),
            },
            bold: {
              fontSize: String(blockTitleSize) + ea,
              color: colorChip.deactive,
            }
          }
        ]
      }
    ]
  });

  for (let i = 0; i < viewLength; i++) {

    ({ contents } = reviewArr[i]);

    src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
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
    tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

    if (i !== 0) {
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
      mother: reviewTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: i !== 0 ? "calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ")" : "calc(calc(calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ") * 2) + " + String(portfolioMargin) + ea + ")",
        marginRight: String(portfolioMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        overflow: "hidden",
      },
      children: [
        {
          style: {
            display: "block",
            width: String(100) + '%',
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
            marginTop: String(tagTongMarginTop) + ea,
            width: String(tagTongOverWidthRatio * 100) + '%',
            left: String(0) + ea,
          }
        }
      ]
    });

    tagTong = block.children[2];
    for (let t of tag) {
      createNode({
        mother: tagTong,
        text: "<b%#%b> " + t,
        style: {
          display: "inline-block",
          fontSize: String(tagSize) + ea,
          fontWeight: String(tagWeight),
          color: colorChip.black,
          paddingLeft: String(tagPaddingLeft) + ea,
          paddingTop: String(tagPaddingTop) + ea,
          paddingBottom: String(tagPaddingBottom) + ea,
          paddingRight: String(tagPaddingLeft) + ea,
          borderRadius: String(3) + "px",
          marginRight: String(tagMarginRight) + ea,
          background: colorChip.gray1
        },
        bold: {
          fontWeight: String(400),
          color: colorChip.deactive,
        }
      })
    }


  }

  if (mobile) {
    this.insertStrongBox(true);
  }

}

FrontIndexJs.prototype.insertBlackBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainTong;
  let blockTong;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;
  let titleSize, titleWeight;
  let subTitleSize, subTitleWeight;
  let subTitleMarginLeft;
  let buttonTop, buttonWidth, buttonHeight;
  let buttonSize, buttonWeight;
  let buttonTextTop;

  tongPaddingTop = <%% 44, 44, 44, 40, 4.2 %%>;
  tongPaddingBottom = <%% 56, 56, 56, 52, 5.5 %%>;

  titleSize = <%% 37, 35, 32, 28, 4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;

  subTitleSize = <%% 16, 16, 15, 13, 0 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  subTitleMarginLeft = <%% 11, 10, 10, 10, 10 %%>;

  buttonTop = <%% 55, 55, 53, 48, 4.5 %%>;
  buttonWidth = <%% 140, 135, 133, 125, 20 %%>;
  buttonHeight = <%% 40, 38, 36, 33, 5.8 %%>;

  buttonSize = <%% 15, 14, 14, 13, 2.5 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.3) %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      backgroundImage: "url('" + FrontIndexJs.binaryPath + "/back.jpg" + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
    },
  });

  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    }
  });

  createNode({
    mother: blockTong,
    text: "홈리에종에서 1:1 상담을 받아보세요!",
    style: {
      top: (isMac() || mobile) ? String(0) : String(3) + ea,
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.white,
      display: "inline-block",
      position: "relative",
    }
  })

  createNode({
    mother: blockTong,
    text: "* 1차 응대 비용 무료",
    style: {
      top: (isMac() || mobile) ? String(0) : String(3) + ea,
      fontSize: String(subTitleSize) + ea,
      fontWeight: String(subTitleWeight),
      color: colorChip.white,
      display: "inline-block",
      position: "relative",
      marginLeft: String(subTitleMarginLeft) + ea,
    }
  })

  createNode({
    mother: blockTong,
    style: {
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      right: String(0),
      top: String(buttonTop) + ea,
      width: String(buttonWidth) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(buttonHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 2px 11px -9px " + colorChip.shadow,
      cursor: "pointer",
    },
    children: [
      {
        text: "서비스 신청",
        style: {
          position: "relative",
          display: "inline-block",
          top: String(buttonTextTop) + ea,
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          color: colorChip.black,
        }
      }
    ]
  })

}

FrontIndexJs.prototype.insertServiceBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let speed;
  let mainHeight;
  let mainTong;
  let blockTong;
  let blockNumber;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;
  let serviceContents;
  let whiteTongPaddingLeft, whiteTongPaddingTop, whiteTongPaddingRight, whiteTongPaddingBottom;
  let whiteTongTitleSize;
  let iconWidth;
  let whiteTongTitleWeight;
  let whiteTongDescriptionSize;
  let whiteTongDescriptionWeight;
  let whiteTongDescriptionMarginTop;
  let whiteTongDescriptionLineHeight;
  let iconBottom;
  let iconRight;
  let mainTong2;
  let blockPaddingBottom;
  let titleSize, titleWeight, titleMarginBottom;
  let mainPictureHeight;
  let mainPictureWidth;
  let indexNumberSize, indexNumberWeight;
  let indexNumberBigSize;
  let detailSize, detailWeight, detailLineHeight;
  let detailBoxWidth, detailBoxMarginLeft;
  let detailBoldWeight;
  let block0, block1;
  let targetBlocks0, targetBlocks1;
  let intervalFunction, intervalId;
  let intervalTime;
  let detailRight, detailBottom;
  let detailPaddingTop, detailPaddingBottom, detailPaddingLeft, detailPaddingRight;

  targetBlocks0 = [];
  targetBlocks1 = [];
  intervalId = null;
  intervalTime = 5000;

  serviceContents = [
    {
      title: "홈퍼니싱",
      description: "시공 없이 가구와 소품 등으로\n진행하는 효율적 인테리어",
      image: "a1.jpg",
      detail: "시공을 꼭 하지 않아도 인테리어를 진행할 수 있습니다. 실제로 사용하는 가구, 소품, 패브릭 등을 디자인 의도에 맞춰 톤 앤 매너를 정리하여 구입하고, 라이프 스타일을 반영한 공간 기획에 따라 배치하면 충분히 멋진 공간을 만들어낼 수 있어요. <b%디자이너와 함께 하는 홈퍼니싱을 통해 시공없이 주거 인테리어의 로망을 실현%b>해보세요!",
    },
    {
      title: "홈스타일링",
      description: "부분 시공과 홈퍼니싱으로 필요\n부분만 진행하는 스마트 인테리어",
      image: "a2.jpg",
      detail: "꼭 필요한 시공만 부분적으로 진행하며 홈퍼니싱을 통해 집 안 분위기를 확 바꿀 수 있어요. 홈스타일링은 홈퍼니싱에서 부분 시공이 더해져 더 효과적인 인테리어를 구현해내는 방법으로, <b%부담스럽게 전체 시공을 하지 않아도 마치 리모델링을 한 집과 같이 효과적인 결과물%b>을 보실 수 있는 인테리어입니다."
    },
    {
      title: "토탈 스타일링",
      description: "시공부터 스타일링까지 완벽하게\n진행하는 원스탑 인테리어",
      image: "a3.jpg",
      detail: "홈리에종 시공사 또는 디자이너 시공사를 통해 전체 리모델링을 진행할 수 있어요! 여기서 평범한 리모델링과 다른 점은, 디자이너의 스타일링까지 원스탑으로 진행된다는 점입니다. <b%전체 시공 후에 빈 집으로 끝나는 것이 아닌, 시공부터 가구와 소품까지 완벽한 마무리를 통해 완전한 인테리어%b>를 진행해드려요."
    },
    {
      title: "엑스트라 스타일링",
      description: "디자인 토탈 시공과 프리미엄\n스타일링으로 진행하는 인테리어",
      image: "a4.jpg",
      detail: "전체 시공을 넘어서 설계 변경까지 필요한 경우가 있습니다. 엑스트라 스타일링은 도면 변경 등의 레벨 상에서 집 안의 구조를 바꾸고, 디자이너의 의도에 따라 세밀하게 진행되는 디자인 시공까지 진행하는 경우의 서비스예요. <b%처음부터 끝까지, 디자인 의도를 담아 시공부터 가구, 소품 제안, 배치까지 도와드리는 프리미엄 서비스%b>입니다."
    },
  ];

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  mainHeight = <%% 240, 240, 240, 240, 48 %%>;
  margin = <%% 16, 16, 16, 10, 2 %%>;
  blockNumber = serviceContents.length;

  tongPaddingLeft = <%% 0, 0, 0, 0, 0 %%>;
  tongPaddingTop = <%% 170, 120, 100, 70, 10 %%>;
  tongPaddingBottom = <%% 200, 150, 120, 90, 15 %%>;
  blockPaddingBottom = <%% 18, 17, 17, 17, 0 %%>;

  whiteTongPaddingLeft = <%% 32, 28, 28, 18, 4 %%>;
  whiteTongPaddingTop = <%% (isMac() ? 21 : 23), (isMac() ? 21 : 21), (isMac() ? 21 : 21), (isMac() ? 16 : 17), 3.2 %%>;
  whiteTongPaddingRight = <%% 84, 28, 28, 12, 2 %%>;
  whiteTongPaddingBottom = <%% (isMac() ? 28 : 24), (isMac() ? 26 : 22), (isMac() ? 26 : 22), (isMac() ? 18 : 17), 4 %%>;

  whiteTongTitleSize = <%% 18, 15, 15, 13, 3.5 %%>;
  whiteTongTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  whiteTongDescriptionSize = <%% 14, 13, 12, 11, 2.5 %%>;
  whiteTongDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteTongDescriptionMarginTop = <%% 7, 5, 5, 5, 1.2 %%>;
  whiteTongDescriptionLineHeight = <%% 1.55, 1.55, 1.55, 1.55, 1.55 %%>;

  iconWidth = <%% 24, 24, 24, 24, 4 %%>;
  iconBottom = <%% (isMac() ? 30 : 24), (isMac() ? 30 : 24), (isMac() ? 30 : 24), (isMac() ? 30 : 24), 2 %%>;
  iconRight = <%% 28, 28, 28, 28, 2 %%>;

  titleSize = <%% 24, 23, 23, 21, 4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginBottom = <%% 40, 36, 32, 28, 4 %%>;

  mainPictureHeight = <%% 600, 440, 380, 300, 36 %%>;
  mainPictureWidth = standardWidth;

  indexNumberSize = <%% 22, 22, 22, 22, 2.5 %%>;
  indexNumberWeight = <%% 200, 200, 200, 200, 200 %%>;
  indexNumberBigSize = <%% 24, 24, 24, 24, 24 %%>;

  detailSize = <%% 14, 13, 12, 11, 3 %%>;
  detailWeight = <%% 400, 400, 400, 400, 400 %%>;
  detailLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  detailBoxWidth = <%% 300, 240, 240, 240, 88 %%>;
  detailBoxMarginLeft = <%% 52, 52, 52, 52, 52 %%>;
  detailBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  detailRight = <%% 30, 30, 30, 30, 30 %%>;
  detailBottom = <%% 30, 30, 30, 30, 30 %%>;
  detailPaddingTop = <%% 18, 18, 18, 18, 4 %%>;
  detailPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 0 %%>;
  detailPaddingLeft = <%% 24, 25, 25, 25, 0 %%>;
  detailPaddingRight = <%% 24, 25, 25, 25, 0 %%>;

  intervalFunction = function (next = null) {
    return async () => {
      try {
        let currentIndexNumber;
        let nextIndexNumber;
        let currentTarget0, currentTarget1;
        let currentTitle, currentDescription, currentIndex, currentIndexBold;
        let nextTarget0, nextTarget1;
        let nextTitle, nextDescription, nextIndex, nextIndexBold;

        currentIndexNumber = targetBlocks0.findIndex((dom) => { return dom.getAttribute("toggle") === "on" });

        if (next === null) {
          if (currentIndexNumber + 1 >= blockNumber) {
            nextIndexNumber = 0;
          } else {
            nextIndexNumber = currentIndexNumber + 1;
          }
        } else {
          nextIndexNumber = next;
        }

        currentTarget0 = targetBlocks0[currentIndexNumber];
        currentTarget1 = targetBlocks1[currentIndexNumber];
        [ currentTitle, currentDescription, currentIndex ] = [ ...currentTarget0.children ];
        currentIndexBold = currentIndex.querySelector('b');

        nextTarget0 = targetBlocks0[nextIndexNumber];
        nextTarget1 = targetBlocks1[nextIndexNumber];
        [ nextTitle, nextDescription, nextIndex ] = [ ...nextTarget0.children ];
        nextIndexBold = nextIndex.querySelector('b');

        currentTarget0.style.background = colorChip.gray1;
        currentTarget0.style.boxShadow = "";
        currentTitle.style.color = colorChip.deactive;
        currentDescription.style.color = colorChip.deactive;
        currentIndex.style.color = colorChip.deactive;
        currentIndexBold.style.color = colorChip.deactive;
        currentTarget1.style.opacity = String(0);

        await sleep(300);

        nextTarget0.style.background = colorChip.white;
        nextTarget0.style.boxShadow = "0px 3px 16px -9px " + colorChip.shadow;
        nextTitle.style.color = colorChip.green;
        nextDescription.style.color = colorChip.black;
        nextIndex.style.color = colorChip.green;
        nextIndexBold.style.color = colorChip.whiteGreen;
        nextTarget1.style.opacity = String(1);

        currentTarget0.setAttribute("toggle", "off");
        currentTarget1.setAttribute("toggle", "off");
        nextTarget0.setAttribute("toggle", "on");
        nextTarget1.setAttribute("toggle", "on");

      } catch (e) {
        console.log(e);
      }
    };
  }

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
    },
  });

  blockTong = createNode({
    mother: mainTong,
    // event: {
    //   mouseenter: (e) => {
    //     if (intervalId !== null) {
    //       clearInterval(intervalId);
    //       intervalId = null;
    //     }
    //   },
    //   mouseleave: (e) => {
    //     if (intervalId === null) {
    //       intervalId = setInterval(intervalFunction(), intervalTime);
    //     }
    //   }
    // },
    style: {
      display: "block",
      position: "relative",
      width: String((standardWidth - (tongPaddingLeft * 2)) + margin) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(blockPaddingBottom) + ea,
      left: "calc(50% - " + String((standardWidth - (tongPaddingLeft * 2)) / 2) + ea + ")",
    },
    children: [
      {
        text: "홈리에종 서비스 유형",
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          textAlign: "center",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          marginBottom: String(titleMarginBottom) + ea,
        }
      }
    ]
  });

  mainTong2 = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      height: String(mainPictureHeight) + ea,
      background: colorChip.white,
      paddingBottom: String(tongPaddingBottom) + ea,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
    },
  });

  for (let i = 0; i < blockNumber; i++) {
    block0 = createNode({
      mother: blockTong,
      attribute: {
        toggle: i === 0 ? "on" : "off",
        index: String(i),
      },
      event: {
        click: async function (e) {
          const func = intervalFunction(Number(this.getAttribute("index")));
          await func();
        }
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(margin * (desktop ? blockNumber : 2)) + ea + ") / " + String((desktop ? blockNumber : 2)) + ") - " + String(whiteTongPaddingLeft + whiteTongPaddingRight) + ea + ")",
        paddingTop: String(whiteTongPaddingTop) + ea,
        paddingLeft: String(whiteTongPaddingLeft) + ea,
        paddingRight: String(whiteTongPaddingRight) + ea,
        paddingBottom: String(whiteTongPaddingBottom) + ea,
        marginRight: String(margin) + ea,
        marginBottom: desktop ? "" : String(margin) + ea,
        borderRadius: String(5) + "px",
        background: i === 0 ? colorChip.white : colorChip.gray1,
        boxShadow: i === 0 ? "0px 3px 16px -9px " + colorChip.shadow : "",
        transition: "all 0.5s ease",
        cursor: "pointer",
      },
      children: [
        {
          text: serviceContents[i].title,
          style: {
            display: "block",
            fontSize: String(whiteTongTitleSize) + ea,
            fontWeight: String(whiteTongTitleWeight),
            color: i === 0 ? colorChip.green : colorChip.deactive,
            transition: "all 0.5s ease",
          }
        },
        {
          text: serviceContents[i].description,
          style: {
            display: "inline-block",
            marginTop: String(whiteTongDescriptionMarginTop) + ea,
            fontSize: String(whiteTongDescriptionSize) + ea,
            fontWeight: String(whiteTongDescriptionWeight),
            lineHeight: String(whiteTongDescriptionLineHeight),
            color: i === 0 ? colorChip.black : colorChip.deactive,
            transition: "all 0.5s ease",
          }
        },
        {
          text: "<b%# %b>" + String(i + 1),
          style: {
            display: media[0] ? "block" : "none",
            position: "absolute",
            bottom: String(iconBottom) + ea,
            right: String(iconRight) + ea,
            fontSize: String(indexNumberSize) + ea,
            fontWeight: String(indexNumberWeight),
            color: i === 0 ? colorChip.green : colorChip.deactive,
            transition: "all 0.5s ease",
            fontFamily: "graphik",
          },
          bold: {
            fontSize: String(indexNumberSize) + ea,
            color: i === 0 ? colorChip.whiteGreen : colorChip.deactive,
          }
        }
      ]
    });
    block1 = createNode({
     mother: mainTong2,
     attribute: {
       toggle: i === 0 ? "on" : "off",
       index: String(i),
     },
     style: {
       display: "block",
       position: "absolute",
       width: String(standardWidth) + ea,
       top: String(0),
       left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
       opacity: String(i === 0 ? 1 : 0),
       transition: "all 0.5s ease",
     },
     children: [
       {
         style: {
           display: "inline-block",
           position: "relative",
           width: String(mainPictureWidth) + ea,
           height: String(mainPictureHeight) + ea,
           backgroundImage: "url('" + FrontIndexJs.binaryPath + "/" + serviceContents[i].image + "')",
           backgroundSize: "100% auto",
           backgroundPosition: "50% 50%",
           borderRadius: String(5) + "px",
           verticalAlign: "top",
         }
       },
       // {
       //   text: serviceContents[i].detail,
       //   style: {
       //     display: desktop ? "inline-block" : "block",
       //     position: (media[0] || mobile) ? "relative" : "absolute",
       //     verticalAlign: "bottom",
       //     fontSize: String(detailSize) + ea,
       //     fontWeight: String(detailWeight),
       //     color: colorChip.black,
       //     lineHeight: String(detailLineHeight),
       //     width: String(detailBoxWidth) + ea,
       //     marginLeft: media[0] ? String(detailBoxMarginLeft) + ea : "",
       //     textAlign: desktop ? "right" : "center",
       //     right: (media[0] || mobile) ? "" : String(detailRight) + ea,
       //     bottom: (media[0] || mobile) ? "" : String(detailBottom) + ea,
       //     background: media[0] ? "" : colorChip.white,
       //     paddingTop: media[0] ? "" : String(detailPaddingTop) + ea,
       //     paddingLeft: media[0] ? "" : String(detailPaddingLeft) + ea,
       //     paddingBottom: media[0] ? "" : String(detailPaddingBottom) + ea,
       //     paddingRight: media[0] ? "" : String(detailPaddingRight) + ea,
       //     borderRadius: media[0] ? "" : String(5) + "px",
       //     opacity: media[0] ? "" : String(0.9),
       //   },
       //   bold: {
       //     fontSize: String(detailSize) + ea,
       //     fontWeight: String(detailBoldWeight),
       //     color: colorChip.black,
       //   }
       // },
       // {
       //   text: "<b%#%b> " + String(i + 1),
       //   style: {
       //     display: media[0] ? "block" : "none",
       //     position: "absolute",
       //     right: String(0),
       //     top: String(0) + ea,
       //     fontSize: String(indexNumberBigSize) + ea,
       //     fontWeight: String(indexNumberWeight),
       //     fontFamily: "graphik",
       //     color: colorChip.green,
       //   },
       //   bold: {
       //     fontSize: String(indexNumberBigSize) + ea,
       //     fontWeight: String(indexNumberWeight),
       //     color: colorChip.whiteGreen,
       //   }
       // }
     ]
   });
    targetBlocks0.push(block0);
    targetBlocks1.push(block1);
  }

  intervalId = setInterval(intervalFunction(), intervalTime);

}

FrontIndexJs.prototype.insertEndBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainTong;
  let blockTong;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;
  let fontSize, fontWeight;
  let menuBetween;
  let copyRightSize, copyRightWeight;

  tongPaddingTop = <%% 54, 54, 48, 32, 4.5 %%>;
  tongPaddingBottom = <%% 66, 66, 55, 39, 5.5 %%>;

  fontSize = <%% 18, 17, 16, 14, 17 %%>;
  fontWeight = <%% 600, 600, 600, 600, 600 %%>;
  menuBetween = <%% 55, 48, 44, 32, 48 %%>;

  copyRightSize = <%% 17, 16, 15, 13, 2.8 %%>;
  copyRightWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray1,
    },
  });

  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    }
  });


  createNode({
    mother: blockTong,
    text: "디자이너 파트너쉽",
    style: {
      display: desktop ? "inline-block" : "none",
      position: "relative",
      fontSize: String(fontSize) + ea,
      fontWeight: String(fontWeight),
      color: colorChip.black,
      cursor: "pointer",
      top: (isMac() || mobile) ? String(0) : String(3) + ea,
    }
  });

  createNode({
    mother: blockTong,
    text: "자주 찾는 질문",
    style: {
      display: desktop ? "inline-block" : "none",
      position: "relative",
      fontSize: String(fontSize) + ea,
      fontWeight: String(fontWeight),
      color: colorChip.black,
      marginLeft: String(menuBetween) + ea,
      cursor: "pointer",
      top: (isMac() || mobile) ? String(0) : String(3) + ea,
    }
  });

  createNode({
    mother: blockTong,
    text: "제휴 문의",
    style: {
      display: desktop ? "inline-block" : "none",
      position: "relative",
      fontSize: String(fontSize) + ea,
      fontWeight: String(fontWeight),
      color: colorChip.black,
      marginLeft: String(menuBetween) + ea,
      cursor: "pointer",
      top: (isMac() || mobile) ? String(0) : String(3) + ea,
    }
  });

  createNode({
    mother: blockTong,
    text: "Copyright " + String((new Date()).getFullYear()) + " HomeLiaison Inc. All rights reserved.",
    style: {
      display: "inline-block",
      position: desktop ? "absolute" : "relative",
      top: desktop ? String(tongPaddingTop) + ea : "",
      right: desktop ? String(0) : "",
      fontSize: String(copyRightSize) + ea,
      fontWeight: String(copyRightWeight),
      fontFamily: "graphik",
      color: colorChip.black,
      textAlign: desktop ? "" : "center",
      width: desktop ? "" : String(100) + '%',
    }
  });

}

FrontIndexJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, serviceParsing } = GeneralJs;
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
    response = await ajaxJson({ mode: "index" }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.reviewArr = new SearchArray(response.reviewArr);
    this.indexArr = new SearchArray(response.indexArr);
    this.totalContents = document.getElementById("totalcontents");

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontIndex",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontIndexJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.insertSlideBox();
          instance.insertStrongBox();
          instance.insertSearchBox();
          instance.insertBlackBox();
          instance.insertServiceBox();
          instance.insertEndBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontIndexJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "FrontIndexJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
