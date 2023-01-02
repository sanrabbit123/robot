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
  "hangul": "메인 홈",
  "route": [
    "frontIndex",
    "DD"
  ]
} %/%/g

const FrontIndexJs = function () {
  this.mother = new GeneralJs();
}

FrontIndexJs.binaryPath = FRONTHOST + "/middle/index";

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
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, totalContents } = this;
  const { indexArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 'b';
  const photoCharMobile = "mot";
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
  let photoLength;
  let grayTong, grayBlockTong;
  let grayHeight;
  let circleBox;
  let circleBoxTop, circleBoxLeft;
  let circleRadius;
  let circleMarginRight;
  let subTextBox;
  let subTextBoxTop;
  let subTextAboutSize, subTextAboutWeight;
  let subTextAboutMarginBottom;
  let subTextSize, subTextWeight;
  let subTextBoldWeight;
  let subTextContents;
  let standardWidth;
  let titleBottom;

  standardWidth = <%% this.standardWidth, 1200, 1050, 900, this.standardWidth %%>;

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  interval = <%% 2700, 2700, 2700, 2700, 2700 %%>;

  naviHeight = <%% 72, 72, 66, 60, 60 %%>;
  mainHeight = <%% 746, 639, 560, 480, 70 %%>;

  randomNumber = <%% 5, 5, 5, 5, 5 %%>;
  titlePadding = <%% 100, 75, 75, 90, 8 %%>;
  titleBottom = <%% 100, 75, 75, 60, 8 %%>;
  titleSize = <%% 56, 45, 42, 36, 6 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  lineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;
  titleContents = "집을 디자인하는\n새로운 방법, 홈리에종";
  photoLength = 5;
  subTextContents = desktop ? "디자이너의 <b%전문적인 홈스타일링, 홈리에종%b>과 함께 해보세요!" : "<b%전문적인 홈스타일링, 홈리에종%b>과 함께 해보세요!";

  grayHeight = <%% 177, 152, 140, 120, 18 %%>;

  circleBoxTop = <%% 78, 68, 62, 54, 9.8 %%>;
  circleBoxLeft = <%% 3, 3, 3, 3, 8 %%>;

  circleRadius = <%% 10, 10, 10, 8, 1.6 %%>;
  circleMarginRight = <%% 8, 8, 8, 6, 1.2 %%>;

  subTextBoxTop = <%% 54, 44, 41, 36, 4.5 %%>;

  subTextAboutSize = <%% 15, 15, 14, 13, 2.5 %%>;
  subTextAboutWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTextAboutMarginBottom = <%% (isMac() ? 3 : 5), (isMac() ? 3 : 5), (isMac() ? 3 : 5), (isMac() ? 2 : 4), 0.3 %%>;
  subTextSize = <%% 19, 19, 18, 16, 3 %%>;
  subTextWeight = <%% 400, 400, 400, 400, 400 %%>;
  subTextBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  randomIndex = new Array(photoLength);

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
      background: colorChip.gray2,
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
    if (desktop) {

      src = FrontIndexJs.binaryPath + "/slide" + String(randomIndex.length - 1 - i) + ".jpg";

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

      src = FrontIndexJs.binaryPath + "/moslide" + String(randomIndex.length - 1 - i) + ".jpg";

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
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 100%",
          transition: "opacity " + String(0) + "s ease",
          transition: "transform " + String(speed) + "s ease",
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
      bottom: String(titleBottom) + ea,
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

  grayTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray0,
      height: String(grayHeight) + ea,
      overflow: "hidden",
    },
  });

  grayBlockTong = createNode({
    mother: grayTong,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? String(standardWidth - (titlePadding * 2)) + ea : "",
      paddingLeft: desktop ? String(titlePadding) + ea : "",
      paddingRight: desktop ? String(titlePadding) + ea : "",
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : "",
      height: String(100) + '%',
    }
  });

  circleBox = createNode({
    mother: grayBlockTong,
    event: {
      click: (e) => { selfHref(FRONTHOST + "/about.php"); }
    },
    style: {
      display: "inline-block",
      position: "relative",
      top: String(circleBoxTop) + ea,
      left: String(circleBoxLeft) + ea
    }
  })

  for (let i = 0; i < photoLength; i++) {
    createNode({
      mother: circleBox,
      style: {
        display: "inline-block",
        width: String(circleRadius) + ea,
        height: String(circleRadius) + ea,
        borderRadius: String(circleRadius) + ea,
        background: desktop ? (i === 0 ? colorChip.gray5 : colorChip.gray3) : colorChip.gray4,
        marginRight: String(circleMarginRight) + ea,
        transition: "all 0.5s ease",
      }
    });
    if (mobile) {
      if (i === 2) {
        break;
      }
    }
  }

  subTextBox = createNode({
    mother: grayBlockTong,
    class: [ "hoverDefault_lite" ],
    event: {
      click: (e) => { selfHref("/about.php"); }
    },
    style: {
      position: "absolute",
      top: String(subTextBoxTop) + ea,
      right: String(titlePadding) + ea,
      textAlign: "right",
    }
  });

  createNode({
    mother: subTextBox,
    text: "About",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(subTextAboutSize) + ea,
      fontWeight: String(subTextAboutWeight),
      fontFamily: "graphik",
      color: colorChip.darkShadow,
      marginBottom: String(subTextAboutMarginBottom) + ea,
    }
  });

  createNode({
    mother: subTextBox,
    text: subTextContents,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(subTextSize) + ea,
      fontWeight: String(subTextWeight),
      color: colorChip.darkShadow,
    },
    bold: {
      fontWeight: String(subTextBoldWeight),
      color: colorChip.darkShadow,
    }
  });

  setInterval(() => {
    const toggle = mainTong.getAttribute("toggle");
    const children = [ ...photoTong.children ];
    const circles = [ ...circleBox.children ];
    let offIndex, onIndex;
    let circleIndex;
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

      circleIndex = offIndex === 0 ? offIndex : photoLength - offIndex;
      for (let i = 0; i < circles.length; i++) {
        circles[i].style.background = i === circleIndex ? colorChip.gray5 : colorChip.gray3;
      }

    } else {

      offIndex = children.findIndex((dom) => { return dom.getAttribute("toggle") === String(1) });
      onIndex = offIndex - 1;
      if (onIndex < 0) {
        onIndex = children.length - 1;
      }
      children[offIndex].setAttribute("toggle", String(0));
      children[onIndex].setAttribute("toggle", String(1));

      children[onIndex].style.opacity = String(1);
      children[offIndex].style.opacity = String(1);

      children[onIndex].style.transform = "translateX(0" + ea + ")";
      children[offIndex].style.transform = "translateX(-100" + ea + ")";

      for (let i = 0; i < children.length; i++) {
        if (i !== onIndex && i !== offIndex) {
          children[i].style.opacity = String(0);
        }
      }

      for (let i = 0; i < children.length; i++) {
        if (i !== onIndex && i !== offIndex) {
          children[i].style.transform = "translateX(100" + ea + ")";
        }
      }

    }

  }, interval);

}

FrontIndexJs.prototype.insertAboutBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainTong;
  let blockTong;
  let mainTongHeight;
  let secondMainTong, secondBlockTong;
  let secondMainTongHeight;
  let descriptionPadding;
  let photoPadding;
  let photoTop;
  let photoWidth, photoHeight;
  let titleSize, titleWeight, titleLineHeight, titleTop;
  let contentsSize, contentsWeight, contentsLineHeight, contentsTop;
  let buttonSize, buttonWeight, buttonLineHeight, buttonTop, buttonPaddingTop, buttonPaddingBottom, buttonPaddingLeft;
  let blockTongs;
  let wordings;
  let mobileBlockPadding;
  let mobilePhotoMarginBottom, mobileTitleMarginBottom, mobileContentsMarginBottom;

  mainTongHeight = <%% 730, 630, 550, 433, 730 %%>;
  secondMainTongHeight = <%% 741, 634, 554, 436, 741 %%>;

  descriptionPadding = <%% 958, 730, 616, 476, 730 %%>;
  photoPadding = <%% 100, 0, 0, 0, 0 %%>;
  photoTop = <%% 142, 120, 102, 70, 12 %%>;

  photoWidth = <%% 780, 669, 568, 436, 88 %%>;
  photoHeight = <%% 440, 377, 350, 290, 43 %%>;

  titleSize = <%% 31, 30, 29, 24, 5.2 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titleTop = <%% 230, 198, 177, 128, 198 %%>;

  contentsSize = <%% 15, 15, 14, 12, 3 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  contentsTop = <%% 335, 300, 270, 207, 300 %%>;

  buttonSize = <%% 13, 13, 12, 12, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  buttonTop = <%% 436, 397, 358, 282, 397 %%>;
  buttonPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), 1.2 %%>;
  buttonPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 7 : 6), (isMac() ? 7 : 6), (isMac() ? 7 : 6), 1.6 %%>;
  buttonPaddingLeft = <%% 20, 20, 20, 20, 4 %%>;

  mobileBlockPadding = 14.5;
  mobilePhotoMarginBottom = 6;
  mobileTitleMarginBottom = 2.5;
  mobileContentsMarginBottom = 4;

  wordings = [
    {
      title: [
        "마지막까지 함께 하는",
        "우리집 인테리어"
      ],
      contents: [
        "시공부터 시작해 가구, 패브릭, 소품까지",
        "홈리에종은 스타일링을 중심으로 디자인을 진행하여",
        "디테일까지 완성된 집을 만들어 드립니다."
      ],
      button: "서비스 소개",
      link: "/about.php",
      image: "about0.jpg",
    },
    {
      title: [
        "나에게 딱 맞는",
        "디자이너를 만나보세요."
      ],
      contents: [
        "홈리에종은 고객님의 상황을 다각도로 분석해",
        "가장 필요한 서비스와 디자이너를 연결시켜 드립니다.",
        "나에게 꼭 맞는 디자이너를 추천받아 보세요!"
      ],
      button: "서비스 신청",
      link: "/consulting.php",
      image: "about1.jpg",
    },
  ];

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.white,
      height: desktop ? String(mainTongHeight) + ea : "",
    },
  });

  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      height: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBlockPadding) + ea,
      paddingBottom: desktop ? "" : String(mobileBlockPadding) + ea,
      textAlign: desktop ? "" : "center",
    }
  });

  secondMainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray0,
      height: desktop ? String(secondMainTongHeight) + ea : "",
    },
  });

  secondBlockTong = createNode({
    mother: secondMainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      height: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBlockPadding) + ea,
      paddingBottom: desktop ? "" : String(mobileBlockPadding) + ea,
      textAlign: desktop ? "" : "center",
    }
  });

  blockTongs = [ blockTong, secondBlockTong ];

  for (let i = 0; i < blockTongs.length; i++) {
    createNode({
      mother: blockTongs[i],
      style: {
        display: desktop ? "inline-block" : "block",
        position: desktop ? "absolute" : "relative",
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        top: desktop ? String(photoTop) + ea : "",
        right: desktop ? (i === 0 ? String(photoPadding) + ea : "") : "",
        left: desktop ? (i === 0 ? "" : String(photoPadding) + ea) : "",
        borderRadius: String(8) + "px",
        background: colorChip.gray1,
        boxShadow: "0px 5px 15px -9px " + colorChip.shadow,
        backgroundImage: "url('" + FrontIndexJs.binaryPath + "/" + wordings[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
      }
    });

    createNode({
      mother: blockTongs[i],
      text: wordings[i].title.join("\n"),
      style: {
        display: desktop ? "inline-block" : "block",
        position: desktop ? "absolute" : "relative",
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        lineHeight: String(titleLineHeight),
        color: colorChip.black,
        textAlign: desktop ? (i === 0 ? "right" : "left") : "center",
        top: desktop ? String(titleTop) + ea : "",
        right: desktop ? (i === 0 ? String(descriptionPadding) + ea : "") : "",
        left: desktop ? (i === 0 ? "" : String(descriptionPadding) + ea) : "",
        marginTop: desktop ? "" : String(mobilePhotoMarginBottom) + ea,
        marginBottom: desktop ? "" : String(mobileTitleMarginBottom) + ea,
      }
    });

    createNode({
      mother: blockTongs[i],
      text: wordings[i].contents.join("\n"),
      style: {
        display: desktop ? "inline-block" : "block",
        position: desktop ? "absolute" : "relative",
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight),
        lineHeight: String(contentsLineHeight),
        color: colorChip.darkShadow,
        textAlign: desktop ? (i === 0 ? "right" : "left") : "center",
        top: desktop ? String(contentsTop) + ea : "",
        right: desktop ? (i === 0 ? String(descriptionPadding) + ea : "") : "",
        left: desktop ? (i === 0 ? "" : String(descriptionPadding) + ea) : "",
        marginBottom: desktop ? "" : String(mobileContentsMarginBottom) + ea,
      }
    });

    createNode({
      mother: blockTongs[i],
      class: [ "hoverDefault_lite" ],
      attribute: {
        index: String(i),
      },
      event: {
        click: function (e) {
          const index = Number(this.getAttribute("index"));
          selfHref(wordings[index].link);
        }
      },
      text: wordings[i].button,
      style: {
        display: "inline-block",
        position: desktop ? "absolute" : "relative",
        fontSize: String(buttonSize) + ea,
        fontWeight: String(buttonWeight),
        lineHeight: String(buttonLineHeight),
        color: colorChip.white,
        textAlign: "center",
        top: desktop ? String(buttonTop) + ea : "",
        right: desktop ? (i === 0 ? String(descriptionPadding) + ea : "") : "",
        left: desktop ? (i === 0 ? "" : String(descriptionPadding) + ea) : "",
        paddingTop: String(buttonPaddingTop) + ea,
        paddingBottom: String(buttonPaddingBottom) + ea,
        paddingLeft: String(buttonPaddingLeft) + ea,
        paddingRight: String(buttonPaddingLeft) + ea,
        borderRadius: String(buttonPaddingLeft) + ea,
        background: colorChip.gradientGreen,
      }
    });
  }

}

FrontIndexJs.prototype.insertBlackBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const bannerClassName = "bannerClassName";
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

  tongPaddingTop = <%% 44, 44, 44, 40, 5.2 %%>;
  tongPaddingBottom = <%% 56, 56, 56, 52, 6.5 %%>;

  titleSize = <%% 37, 35, 32, 28, 4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;

  subTitleSize = <%% 16, 16, 15, 13, 0 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  subTitleMarginLeft = <%% 11, 10, 10, 10, 10 %%>;

  buttonTop = <%% 55, 55, 53, 48, 5.5 %%>;
  buttonWidth = <%% 140, 135, 133, 125, 20 %%>;
  buttonHeight = <%% 40, 38, 36, 33, 5.8 %%>;

  buttonSize = <%% 15, 14, 14, 13, 2.5 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.3) %%>;

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
    class: [ bannerClassName ],
    event: {
      click: (e) => {
        selfHref(FRONTHOST + "/styleparts.php?mode=inner");
      }
    },
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      cursor: "pointer",
    }
  });

  createNode({
    mother: blockTong,
    text: (desktop ? "홈리에종 X 아파트멘터리, 스타일파츠 프로젝트" : "홈리에종 X 아파트멘터리, 스타일파츠"),
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
    text: "style parts",
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
    class: [ "consultingButton" ],
    // event: {
    //   click: (e) => {
    //     selfHref(FRONTHOST + "/miniAbout.php");
    //   }
    // },
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
        text: "스타일 파츠",
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

FrontIndexJs.prototype.insertSearchBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const { contentsArr, reviewArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
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
  let tagBlock;
  let subInfoSize, subInfoWeight;
  let arrowWidth, arrowHeight, arrowBottom, arrowReviewBottom;
  let reviewSubTitleVisual;
  let subInfoTextTop;
  let subTitleMarginTopReview;

  mainPaddingTop = <%% 140, 120, 90, 65, 8 %%>;
  mainPaddingBottom = <%% 120, 100, 60, 45, 8 %%>;

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
  subTitleMarginTopReview = <%% 3, 3, 3, 2, 0.2 %%>;
  subTitleSize = <%% 12, 12, 12, 12, 2.5 %%>;

  subTitleOverWidthRatio = <%% 2, 2, 2, 2, 2 %%>;
  tagTongOverWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagTongMarginTop = <%% 8, 8, 8, 8, 1.5 %%>;

  tagSize = <%% 10, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 3, 3, 3, 3, 1 %%>;

  portfolioBlockPaddingTop = <%% 50, 45, 35, 35, 7 %%>;
  reviewBlockPaddingTop = <%% 20, 0, 0, 0, 4 %%>;

  blockTitleMarginBottom = <%% (isMac() ? 24 : 21), (isMac() ? 24 : 20), (isMac() ? 23 : 19), (isMac() ? 17 : 14), 3.2 %%>;
  blockTitleSize = <%% 20, 20, 20, 18, 4 %%>;
  blockTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  blockWhitePaddingRight = <%% 15, 15, 15, 15, 3 %%>;

  subInfoSize = <%% 8, 8, 7, 6, 2.5 %%>;
  subInfoWeight = <%% 500, 500, 500, 500, 500 %%>;
  subInfoTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  arrowWidth = <%% 28, 28, 26, 26, 4 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 2, 2, 2, 2, 1 %%>;
  arrowReviewBottom = <%% 4, 4, 4, 3, 1.5 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

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
              placeholder: desktop ? "화이트" : "원하는 스타일을 찾아보세요!",
            },
            event: {
              keyup: function (e) {
                if (e.key === "Enter") {
                  const value = this.value.trim().replace(/[^가-힣a-z0-9 ]/gi, '');
                  selfHref(FRONTHOST + "/portfolio.php?search=" + value);
                }
              }
            },
            class: [ "searchInput" ],
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

    if (desktop) {
      src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.portfolio.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
    } else {
      src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.portfolio.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
    }

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
      attribute: {
        pid: contents.portfolio.pid,
        rid: contents.review.rid,
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
        position: "relative",
        width: i !== 0 ? "calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ")" : "calc(calc(calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ") * 2) + " + String(portfolioMargin) + ea + ")",
        marginRight: String(portfolioMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        overflow: "hidden",
        cursor: "pointer",
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
                    color: colorChip.gray5,
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
            width: String(100) + '%',
            borderTop: "1px solid " + colorChip.gray2,
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
                color: colorChip.black,
              },
              bold: {
                fontWeight: String(subInfoWeight),
                color: colorChip.green,
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

    if (desktop) {
      src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
    } else {
      src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.review.detailInfo.photodae[i === 0 ? 1 : 0]) + contents.portfolio.pid + ".jpg";
    }

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
      attribute: {
        pid: contents.portfolio.pid,
        rid: contents.review.rid,
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
        position: "relative",
        width: i !== 0 ? "calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ")" : "calc(calc(calc(calc(100% - " + String(portfolioMargin * columns) + ea + ") / " + String(columns) + ") * 2) + " + String(portfolioMargin) + ea + ")",
        marginRight: String(portfolioMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        overflow: "hidden",
        cursor: "pointer",
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
            marginTop: String(subTitleMarginTopReview) + ea,
            paddingLeft: String(quoteWidth + titleMarginLeft + reviewSubTitleVisual) + ea,
            width: withOut(quoteWidth + titleMarginLeft + reviewSubTitleVisual, ea),
            left: String(0) + ea,
          },
          children: [
            {
              text: contents.portfolio.spaceInfo.space + " " + String(contents.portfolio.spaceInfo.pyeong) + "py " + (desktop ? "홈스타일링 후기" : "후기"),
              style: {
                display: "inline-block",
                fontSize: String(subTitleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.gray5,
              }
            },
            {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight),
              style: {
                position: "absolute",
                width: String(arrowWidth) + ea,
                right: String(0),
                bottom: String(arrowReviewBottom) + ea,
              }
            }
          ]
        }
      ]
    });

  }

  if (mobile) {
    this.insertStrongBox(true);
  }

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
  tongPaddingBottom = <%% 76, 54, 42, 38, 4.5 %%>;

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

FrontIndexJs.prototype.insertNewsBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, blankHref, selfHref } = GeneralJs;
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
  let contents;
  let slideTong;
  let images;
  let indent;
  let number, newNumber;
  let pushLeft, pushRight;
  let grayHeight;
  let arrowTop, arrowLeft, arrowWidth;
  let circleBox;
  let circleOpacity;
  let circles;
  let circleRadius;
  let circleBetween;
  let opacityNumber;
  let circleBoxMarginTop;
  let titleBoxHeight, titleTextTop, titleSize, titleWeight;
  let titleBarBottom, titleBarLeft, titleBarWidth, titleBarHeight;

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  mainHeight = <%% 240, 240, 240, 240, 40 %%>;
  margin = <%% 18, 16, 16, 12, 2 %%>;

  tongPaddingLeft = <%% 60, 0, 0, 0, 0 %%>;
  tongPaddingTop = <%% 160, 130, 100, 70, 13 %%>;
  tongPaddingBottom = <%% 160, 130, 100, 70, 15 %%>;

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

  grayHeight = <%% 560, 460, 585, 468, 89 %%>;

  arrowTop = <%% 500, 416, 440, 350, 50 %%>;
  arrowLeft = <%% -50, -48, -45, -35, -5 %%>;
  arrowWidth = <%% 14, 14, 12, 10, 14 %%>;

  circleBoxMarginTop = <%% 24, 24, 23, 20, 5 %%>;
  circleRadius = <%% 10, 10, 8, 8, 1.6 %%>;
  circleBetween = <%% 8, 8, 6, 6, 1.6 %%>;

  titleBoxHeight = <%% 40, 36, 26, 25, 4 %%>;
  titleTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  titleSize = <%% 25, 25, 24, 22, 4.2 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;

  titleBarBottom = <%% (isMac() ? 0 : 3), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;
  titleBarLeft = <%% -4, -4, -4, -3, -0.6 %%>;
  titleBarWidth = <%% 144, 144, 139, 125, 24 %%>;
  titleBarHeight = <%% 9, 9, 9, 8, 1.5 %%>;

  indent = 100;
  circleOpacity = 0.4;
  images = [];
  circles = [];

  pushLeft = () => {
    for (let image of images) {
      number = Number(image.style.transform.replace(/[^0-9\-]/gi, ''));
      newNumber = number + indent;
      if (newNumber === (indent * 2)) {
        newNumber = indent * ((images.length - 2) * -1);
      }
      if (newNumber === indent * ((images.length - 2) * -1)) {
        image.style.zIndex = String(0);
      } else {
        image.style.zIndex = String(1);
      }
    }
    for (let image of images) {
      number = Number(image.style.transform.replace(/[^0-9\-]/gi, ''));
      newNumber = number + indent;
      if (newNumber === (indent * 2)) {
        newNumber = indent * ((images.length - 2) * -1);
      }
      image.style.transform = "translateX(" + String(newNumber) + "%)";
    }

    opacityNumber = circles.findIndex((dom) => {
      return Number(dom.style.opacity) === circleOpacity;
    });
    opacityNumber = opacityNumber - 1;
    if (opacityNumber < 0) {
      opacityNumber = circles.length - 1;
    }
    for (let i = 0; i < circles.length; i++) {
      if (i === opacityNumber) {
        circles[i].style.opacity = String(circleOpacity);
      } else {
        circles[i].style.opacity = String(1);
      }
    }

  }

  pushRight = () => {
    for (let image of images) {
      number = Number(image.style.transform.replace(/[^0-9\-]/gi, ''));
      newNumber = number - indent;
      if (newNumber === (indent * -2)) {
        newNumber = indent * (images.length - 2);
      }
      if (newNumber === indent * (images.length - 2)) {
        image.style.zIndex = String(0);
      } else {
        image.style.zIndex = String(1);
      }
    }
    for (let image of images) {
      number = Number(image.style.transform.replace(/[^0-9\-]/gi, ''));
      newNumber = number - indent;
      if (newNumber === (indent * -2)) {
        newNumber = indent * (images.length - 2);
      }
      image.style.transform = "translateX(" + String(newNumber) + "%)";
    }

    opacityNumber = circles.findIndex((dom) => {
      return Number(dom.style.opacity) === circleOpacity;
    });
    opacityNumber = opacityNumber + 1;
    if (opacityNumber === circles.length) {
      opacityNumber = 0;
    }
    for (let i = 0; i < circles.length; i++) {
      if (i === opacityNumber) {
        circles[i].style.opacity = String(circleOpacity);
      } else {
        circles[i].style.opacity = String(1);
      }
    }

  }

  contents = {
    slide: [
      FrontIndexJs.binaryPath + "/news2" + String(media.findIndex(boo => boo)) + ".jpg",
      FrontIndexJs.binaryPath + "/news0" + String(media.findIndex(boo => boo)) + ".jpg",
      FrontIndexJs.binaryPath + "/news1" + String(media.findIndex(boo => boo)) + ".jpg",
    ]
  }

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.white,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
    },
  });

  // contents base
  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth - (tongPaddingLeft * 2)) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String((standardWidth - (tongPaddingLeft * 2)) / 2) + ea + ")",
      textAlign: "center",
    }
  });

  // news title
  createNode({
    mother: blockTong,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      width: String(100) + '%',
      height: String(titleBoxHeight) + ea,
      marginBottom: String(circleBoxMarginTop) + ea,
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: "홈리에종 뉴스",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(titleTextTop) + ea,
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
        },
        children: [
          {
            style: {
              position: "absolute",
              bottom: String(titleBarBottom) + ea,
              left: String(titleBarLeft) + ea,
              width: String(titleBarWidth) + ea,
              height: String(titleBarHeight) + ea,
              borderRadius: String(titleBarHeight) + ea,
              background: colorChip.gradientGreen,
              zIndex: String(-1),
              opacity: String(0.65),
            }
          }
        ]
      }
    ]
  });

  // left arrow
  createNode({
    mother: blockTong,
    mode: "svg",
    event: {
      click: (e) => { pushLeft(); },
    },
    source: instance.mother.returnArrow("left", colorChip.darkShadow),
    style: {
      display: desktop ? "block" : "none",
      position: "absolute",
      top: String(arrowTop) + ea,
      left: String(arrowLeft) + ea,
      width: String(arrowWidth) + ea,
      cursor: "pointer",
    }
  });

  // right arrow
  createNode({
    mother: blockTong,
    mode: "svg",
    event: {
      click: (e) => { pushRight(); },
    },
    source: instance.mother.returnArrow("right", colorChip.darkShadow),
    style: {
      display: desktop ? "block" : "none",
      position: "absolute",
      top: String(arrowTop) + ea,
      right: String(arrowLeft) + ea,
      width: String(arrowWidth) + ea,
      cursor: "pointer",
    }
  });

  // slide tong
  slideTong = createNode({
    mother: blockTong,
    event: {
      click: (e) => {
        selfHref(FRONTHOST + "/miniAbout.php");
      }
    },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(grayHeight) + ea,
      background: colorChip.gray1,
      borderRadius: String(8) + "px",
      overflow: "hidden",
      transition: "all 0s ease",
      cursor: "pointer",
    }
  });
  for (let i = 0; i < contents.slide.length; i++) {
    images.push(createNode({
      mother: slideTong,
      style: {
        display: "block",
        position: "absolute",
        width: String(100) + '%',
        height: String(100) + '%',
        top: String(0),
        left: String(0),
        backgroundImage: "url('" + contents.slide[i] + "')",
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        transform: "translateX(" + String((i - 1) * indent) + "%)",
        transition: "transform 0.9s ease",
        zIndex: String(i === 1 ? 1 : 0),
      }
    }));
  }

  // circle tong
  circleBox = createNode({
    mother: blockTong,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginTop: String(circleBoxMarginTop) + ea,
    }
  });
  for (let i = 0; i < contents.slide.length; i++) {
    circles.push(createNode({
      mother: circleBox,
      style: {
        display: "inline-block",
        width: String(circleRadius) + ea,
        height: String(circleRadius) + ea,
        borderRadius: String(circleRadius) + ea,
        background: colorChip.shadow,
        marginLeft: String(i === 0 ? 0 : circleBetween) + ea,
        opacity: String(i === 0 ? circleOpacity : 1),
      }
    }));
  }

  setQueue(() => {
    newNumber = null;
    setInterval(pushRight, 5000);
  }, 3000);

}

FrontIndexJs.prototype.insertEndBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
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

  copyRightSize = <%% 16, 15, 14, 12, 2.8 %%>;
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
    class: [ "hoverDefault_lite" ],
    event: {
      click: function (e) {
        selfHref(FRONTHOST + "/aspirant.php");
      }
    },
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
    class: [ "hoverDefault_lite" ],
    event: {
      click: function (e) {
        selfHref(FRONTHOST + "/about.php");
      }
    },
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
    class: [ "hoverDefault_lite" ],
    event: {
      click: function (e) {
        window.alert("제휴 문의는 help@home-liaison.com로 이메일을 보내주세요!");
      }
    },
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

FrontIndexJs.prototype.popupLaunching = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref, blankHref } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const popupFactorClassName = "popupFactorClassName";
  const popupInboundClassName = "popupInboundClassName";
  const popupCloseClassName = "popupCloseClassName";
  const popupNeverClassName = "popupNeverClassName";
  const keyName = "homeliaisonPopupBan";
  let cancelBack, whitePopup;
  let image;
  let zIndex;
  let speed;
  let delay;
  let popupWidth, popupHeight;
  let buttonSize, buttonWeight, buttonBottom;
  let exitEvent;

  zIndex = 101;
  speed = 0.3;
  delay = 0.8;
  image = FrontIndexJs.binaryPath + "/popup" + String(media.findIndex(boo => boo)) + ".jpg";

  popupWidth = <%% 500, 450, 420, 360, 80 %%>;
  popupHeight = <%% 574, 516, 480, 414, 92 %%>;

  buttonSize = <%% 16, 16, 15, 14, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBottom = <%% -27, -27, -27, -25, -6 %%>;

  exitEvent = () => {
    const removeTargets = document.querySelectorAll('.' + popupFactorClassName);
    for (let dom of removeTargets) {
      totalContents.removeChild(dom);
    }
  }

  if (window.localStorage.getItem(keyName) !== String(1)) {
    cancelBack = createNode({
      mother: totalContents,
      class: [ popupFactorClassName ],
      event: {
        click: (e) => { exitEvent(); }
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.realBlack,
        opacity: String(0),
        animation: "justfadein " + String(speed) + "s " + String(delay) + "s ease forwards",
        zIndex: String(zIndex),
      }
    });

    whitePopup = createNode({
      mother: totalContents,
      class: [ popupFactorClassName, popupInboundClassName ],
      event: {
        click: (e) => {
          blankHref(FRONTHOST + "/miniAbout.php");
          exitEvent();
        },
      },
      style: {
        display: "block",
        position: "fixed",
        top: withOut(50, popupHeight / 2, ea),
        left: withOut(50, popupWidth / 2, ea),
        width: String(popupWidth) + ea,
        height: String(popupHeight) + ea,
        background: colorChip.white,
        backgroundImage: "url('" + image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        borderRadius: String(8) + "px",
        animation: "fadeuporiginal " + String(speed) + "s " + String(delay) + "s ease forwards",
        opacity: String(0),
        transform: "translateY(20px)",
        zIndex: String(zIndex),
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(0, ea),
          },
          children: [
            {
              text: "닫기",
              class: [ popupCloseClassName ],
              event: {
                click: (e) => {
                  e.stopPropagation();
                  exitEvent();
                }
              },
              style: {
                position: "absolute",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                bottom: String(buttonBottom) + ea,
                right: String(0) + ea,
                cursor: "pointer",
              }
            },
            {
              text: "다시 보지 않기",
              class: [ popupNeverClassName ],
              event: {
                click: (e) => {
                  e.stopPropagation();
                  window.localStorage.setItem(keyName, String(1));
                  exitEvent();
                }
              },
              style: {
                position: "absolute",
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
                bottom: String(buttonBottom) + ea,
                left: String(0) + ea,
                cursor: "pointer",
              }
            },
          ]
        }
      ]
    });

  }

}

FrontIndexJs.prototype.insertThreeBox = function () {
  const instance = this;
  const { ea, media, standardWidth, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let contents;
  let middleTongPaddinngTop;
  let middleTongPaddingBottom;
  let middleTong;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let middleTitleMarginBottom;
  let threeBetween;
  let threeHeight;
  let threeBlock;
  let threeBlockMarginTop;
  let threeVisualPaddingBottom;
  let threeWidth0, threeWidth1;
  let threeSize, threeWeight, threeSmallSize;
  let blackCircleWidth;
  let arrowWidth, arrowHeight;
  let numberTop, numberLeft, numberSize, numberWeight;
  let mainBetween, subBetween, subTop;
  let mainTong, blockTong;
  let threeBlockWidth, threeBlockHeight;
  let threeTitleSize, threeTitleWeight;
  let threePhotoHeight;
  let threeTitlePaddingLeft;
  let threeTitleAreaHeight;

  middleTongPaddinngTop = <%% 140, 120, 90, 65, 8 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 10, 10, 10, 10, 1 %%>;

  middleTitleLineTop = <%% 68, 65, 56, 49, 12 %%>;

  middleTitleSize = <%% 22, 21, 20, 18, 4 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 13, 12, 11, 3 %%>;

  threeBetween = <%% 10, 10, 6, 4, 1 %%>;
  threeHeight = <%% 170, 120, 110, 84, 21 %%>;
  threeVisualPaddingBottom = <%% 2, 2, 2, 2, 0.5 %%>;
  threeBlockMarginTop = <%% 48, 48, 48, 40, 7 %%>;

  threeWidth0 = <%% 525, 525, 525, 525, 525 %%>;
  threeWidth1 = <%% 330, 330, 330, 330, 330 %%>;

  threeTitleSize = <%% 17, 17, 17, 17, 4 %%>;
  threeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;

  threeSize = <%% 14, 14, 13, 12, 3.5 %%>;
  threeWeight = <%% 400, 400, 400, 400, 400 %%>;
  threeSmallSize = <%% 13, 12, 10, 10, 2.5 %%>;

  blackCircleWidth = <%% 40, 36, 32, 28, 3 %%>;

  arrowWidth = <%% 22, 20, 18, 16, 4 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 8 %%>;

  numberTop = <%% 14, 14, 12, 10, 2.5 %%>;
  numberLeft = <%% 22, 22, 20, 16, 3.5 %%>;
  numberSize = <%% 13, 13, 12, 10, 2.5 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  mainBetween = <%% 4, 4, 2, 2, 0.5 %%>;
  subBetween = <%% 6, 6, 6, 6, 0.5 %%>;
  subTop = <%% 3, 3, 3, 3, 0.5 %%>;

  threeBlockWidth = <%% 400, 400, 400, 400, 400 %%>;
  threeBlockHeight = <%% 400, 400, 400, 400, 400 %%>;

  threePhotoHeight = <%% 240, 240, 240, 240, 240 %%>;
  threeTitlePaddingLeft = <%% 25, 25, 25, 25, 25 %%>;
  threeTitleAreaHeight = <%% 58, 58, 58, 58, 58 %%>;

  contents = {
    title: "디자이너가 이끄는 무드 체인지 효과",
    description: [
      "디자이너의 기획이 담긴 디자인 컨셉에 맞게,",
      "제안된 스타일링으로 조화로운 완성을 이끌어 냅니다.",
    ],
  }

  // base box
  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.white,
    },
  });
  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      height: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBlockPadding) + ea,
      paddingBottom: desktop ? "" : String(mobileBlockPadding) + ea,
      textAlign: desktop ? "" : "center",
    }
  });
  middleTong = createNode({
    mother: blockTong,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  // title
  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.white,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.white,
        }
      }
    ]
  });

  // three base
  threeBlock = createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: desktop ? "row" : "column",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(threeBlockMarginTop) + ea,
      paddingBottom: String(middleTongPaddinngTop) + ea,
    },
  });


  // three detail

  createNode({
    mother: threeBlock,
    style: {
      display: "inline-block",
      width: String(threeBlockWidth) + ea,
      height: String(threeBlockHeight) + ea,
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: "0px 5px 20px -12px " + colorChip.shadow,
    },
    children: [
      {
        style: {
          display: "flex",
          height: String(threeTitleAreaHeight) + ea,
          width: withOut(threeTitlePaddingLeft, ea),
          position: "relative",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: String(threeTitlePaddingLeft) + ea,
        },
        child: {
          text: "홈퍼니싱",
          style: {
            position: "relative",
            fontSize: String(threeTitleSize) + ea,
            fontWeight: String(threeTitleWeight),
            color: colorChip.black,
          }
        }
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(threePhotoHeight) + ea,
          background: colorChip.green,
        }
      },
      {
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: withOut(threeTitlePaddingLeft * 2, ea),
          paddingLeft: String(threeTitlePaddingLeft) + ea,
          paddingRight: String(threeTitlePaddingLeft) + ea,
          paddingTop: String(24) + ea,
          paddingBottom: String(24) + ea,
        },
        children: [
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
            },
            children: [
              {
                text: "인테리어 시공 없이 가구나 패브릭, 소품만",
                style: {
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
            },
            children: [
              {
                text: "우리 집 무드를 변화시켜주는 스타일링",
                style: {
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              }
            ]
          },
        ]
      }
    ]
  });

  createNode({
    mother: threeBlock,
    style: {
      display: "inline-block",
      width: "calc(calc(100% - " + String(threeBlockWidth * 3) + ea + ") / 2)",
      height: String(threeBlockHeight) + ea,
    }
  });

  createNode({
    mother: threeBlock,
    style: {
      display: "inline-block",
      width: String(threeBlockWidth) + ea,
      height: String(threeBlockHeight) + ea,
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: "0px 5px 20px -12px " + colorChip.shadow,
    }
  });

  createNode({
    mother: threeBlock,
    style: {
      display: "inline-block",
      width: "calc(calc(100% - " + String(threeBlockWidth * 3) + ea + ") / 2)",
      height: String(threeBlockHeight) + ea,
    }
  });

  createNode({
    mother: threeBlock,
    style: {
      display: "inline-block",
      width: String(threeBlockWidth) + ea,
      height: String(threeBlockHeight) + ea,
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: "0px 5px 20px -12px " + colorChip.shadow,
    }
  });



}

FrontIndexJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, serviceParsing, facebookSdkPatch } = GeneralJs;
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
          instance.insertAboutBox();
          // instance.insertThreeBox();
          instance.insertBlackBox();
          instance.insertSearchBox();
          instance.insertStrongBox();
          instance.insertNewsBox();
          instance.insertEndBox();
          // instance.popupLaunching();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontIndexJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      facebookSdkPatch().catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "FrontIndexJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
