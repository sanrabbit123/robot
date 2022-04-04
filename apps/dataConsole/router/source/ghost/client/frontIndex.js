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
      "return ('디자이너 상세 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 협업 디자이너 상세 내용 페이지 입니다! | 홈리에종');"
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

  speed = 0.8;
  interval = 2700;

  naviHeight = 72;
  mainHeight = 800;

  randomNumber = 5;
  titlePadding = 100;
  titleSize = 56;
  titleWeight = 700;
  lineHeight = 1.3;
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
      paddingTop: String(naviHeight) + ea,
      height: String(mainHeight) + ea,
      background: colorChip.gray1,
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
    },
    children: [
      {
        style: {
          display: "block",
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
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      height: String(mainHeight) + ea,
    }
  });

  for (let i = 0; i < randomIndex.length; i++) {
    src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + randomIndex[i].contents.portfolio.pid + "/" + photoChar + String(randomIndex[i].contents.portfolio.detailInfo.photodae[1]) + randomIndex[i].contents.portfolio.pid + ".jpg";
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
  }

  createNode({
    mother: mainTong,
    style: {
      position: "absolute",
      width: String(standardWidth - (titlePadding * 2)) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingLeft: String(titlePadding) + ea,
      paddingRight: String(titlePadding) + ea,
      bottom: String(titlePadding) + ea,
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
  }, interval);

}

FrontIndexJs.prototype.insertStrongBox = function () {
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

  speed = 0.8;
  mainHeight = 240;
  margin = 18;
  blockNumber = strongContents.length;

  tongPaddingLeft = 60;
  tongPaddingTop = 70;
  tongPaddingBottom = 73;

  whiteTongPaddingLeft = 32;
  whiteTongPaddingTop = 21;
  whiteTongPaddingRight = 84;
  whiteTongPaddingBottom = 30;

  whiteTongTitleSize = 18;
  whiteTongTitleWeight = 700;

  whiteTongDescriptionSize = 14;
  whiteTongDescriptionWeight = 400;
  whiteTongDescriptionMarginTop = 7;
  whiteTongDescriptionLineHeight = 1.55;

  iconWidth = 24;
  iconBottom = 32;
  iconRight = 28;

  mainTong = createNode({
    mother: totalContents,
    attribute: {
      toggle: "off",
    },
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

  for (let i = 0; i < blockNumber; i++) {
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
      },
      children: [
        {
          text: strongContents[i].title,
          style: {
            display: "inline-block",
            fontSize: String(whiteTongTitleSize) + ea,
            fontWeight: String(whiteTongTitleWeight),
            color: colorChip.black,
          }
        },
        {
          text: strongContents[i].description,
          style: {
            display: "inline-block",
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
  let blockLineTop;
  let blockTitleSize, blockTitleWeight;
  let blockWhitePaddingRight;
  let mainPaddingTop;
  let mainPaddingBottom;

  mainPaddingTop = 140;
  mainPaddingBottom = 120;

  services = serviceParsing().name;
  services.push("전체 보기");
  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = 33;

  speed = 0.8;

  searchTongWidth = 640;
  searchTongHeight = <%% 40, 40, 40, 40, 8 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;
  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  portfolioMargin = 16;

  columns = 5;
  blockMarginBottom = 60;

  photoHeight = 374;
  photoMarginBottom = 16;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  quoteHeight = <%% 9, 8, 8, 7, 1.6 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.2 : 1.1 %%>;

  titleSize = 17;
  titleWeight = 600;
  titleMarginLeft = 5;

  subTitleMarginTop = 3;
  subTitleSize = 12;

  subTitleOverWidthRatio = 2;
  tagTongOverWidthRatio = 1.1;

  tagTongMarginTop = 11;

  tagSize = <%% 10, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isIphone() ? 1.2 : 1.4) %%>;
  tagMarginRight = <%% 3, 3, 3, 3, 1 %%>;

  portfolioBlockPaddingTop = 80;
  reviewBlockPaddingTop = 40;

  blockTitleMarginBottom = 28;
  blockLineTop = 13;
  blockTitleSize = 20;
  blockTitleWeight = 600;
  blockWhitePaddingRight = 15;

  mainTong = createNode({
    mother: totalContents,
    attribute: {
      toggle: "off",
    },
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
              placeholder: "새아파트",
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
      display: "block",
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
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: withOut(portfolioMargin, ea),
              height: String(blockLineTop) + ea,
              borderBottom: "1px solid " + colorChip.gray2,
            }
          },
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
            }
          }
        ]
      }
    ]
  });

  for (let i = 0; i < contentsArr.length; i++) {

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
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: withOut(portfolioMargin, ea),
              height: String(blockLineTop) + ea,
              borderBottom: "1px solid " + colorChip.gray2,
            }
          },
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
            }
          }
        ]
      }
    ]
  });

  for (let i = 0; i < reviewArr.length; i++) {

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


}

FrontIndexJs.prototype.insertGreenBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainTong;
  let blockTong;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;

  tongPaddingTop = 44;
  tongPaddingBottom = 56;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gradientGreen,
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
      fontSize: String(37) + ea,
      fontWeight: String(600),
      color: colorChip.white,
      display: "inline-block",
      position: "relative",
    }
  })

  createNode({
    mother: blockTong,
    text: "* 1차 응대 비용 무료",
    style: {
      fontSize: String(16) + ea,
      fontWeight: String(500),
      color: colorChip.white,
      display: "inline-block",
      position: "relative",
      marginLeft: String(11) + ea,
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
      top: String(55) + ea,
      width: String(140) + ea,
      height: String(40) + ea,
      borderRadius: String(40) + ea,
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
          top: String(-2) + ea,
          fontSize: String(15) + ea,
          fontWeight: String(600),
          color: colorChip.green,
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

  speed = 0.8;
  mainHeight = 240;
  margin = 18;
  blockNumber = strongContents.length;

  tongPaddingLeft = 60;
  tongPaddingTop = 70;
  tongPaddingBottom = 73;

  whiteTongPaddingLeft = 32;
  whiteTongPaddingTop = 21;
  whiteTongPaddingRight = 84;
  whiteTongPaddingBottom = 30;

  whiteTongTitleSize = 18;
  whiteTongTitleWeight = 700;

  whiteTongDescriptionSize = 14;
  whiteTongDescriptionWeight = 400;
  whiteTongDescriptionMarginTop = 7;
  whiteTongDescriptionLineHeight = 1.55;

  iconWidth = 24;
  iconBottom = 32;
  iconRight = 28;

  mainTong = createNode({
    mother: totalContents,
    attribute: {
      toggle: "off",
    },
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

  for (let i = 0; i < blockNumber; i++) {
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
      },
      children: [
        {
          text: strongContents[i].title,
          style: {
            display: "inline-block",
            fontSize: String(whiteTongTitleSize) + ea,
            fontWeight: String(whiteTongTitleWeight),
            color: colorChip.black,
          }
        },
        {
          text: strongContents[i].description,
          style: {
            display: "inline-block",
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
          instance.insertGreenBox();
          instance.insertServiceBox();
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
