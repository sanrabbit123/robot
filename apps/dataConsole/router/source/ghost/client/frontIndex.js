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
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const { contentsArr, reviewArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

  speed = 0.8;
  mainHeight = 1200;

  searchTongWidth = 640;
  searchTongHeight = <%% 40, 40, 40, 40, 8 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;
  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  portfolioMargin = 16;

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
      height: String(mainHeight) + ea,
      paddingTop: String(120) + ea,
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

  portfolioTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth + portfolioMargin) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: String(72) + ea,
    }
  });

  for (let i = 0; i < contentsArr.length; i++) {
    createNode({
      mother: portfolioTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: i !== 0 ? "calc(calc(100% - " + String(portfolioMargin * 5) + ea + ") / " + String(5) + ")" : "calc(calc(calc(calc(100% - " + String(portfolioMargin * 5) + ea + ") / " + String(5) + ") * 2) + " + String(portfolioMargin) + ea + ")",
        height: String(300) + ea,
        background: "blue",
        marginRight: String(portfolioMargin) + ea,
        marginBottom: String(portfolioMargin) + ea,
      }
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
