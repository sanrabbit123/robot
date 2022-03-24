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
      "return ('홈리에종 고객 리뷰 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewList",
  "route": [
    "reviewList",
    "RL"
  ]
} %/%/g

const ReviewListJs = function () {
  this.mother = new GeneralJs();
}

ReviewListJs.binaryPath = "/middle/review";

ReviewListJs.prototype.generateGsArray = function (number) {
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

ReviewListJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
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
  let services;
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

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 50, 50, 50, 50, 5 %%>;

  quoteHeight = <%% 11, 11, 11, 11, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 31, 31, 30, 28, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 20, 20, 20, 20, 5.2 %%>;
  searchBarHeight = <%% 40, 40, 40, 40, 8 %%>;
  searchBarWidth = <%% 500, 500, 490, 450, 74 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  titleWording = "솔직한 고객 후기";
  services = serviceParsing().name;
  services.push("전체 보기");
  placeholder = "새아파트";

  serviceButtonClassName = "serviceButton";

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(whiteBlockPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      background: colorChip.white,
      marginBottom: String(whiteBlockMarginBottom) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
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
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: String(searchBarPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth) + ea,
          height: String(searchBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
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
              placeholder: placeholder,
            },
            event: {
              keyup: function (e) {
                setDebounce(async () => {
                  try {
                    while (!instance.fullLoad) {
                      await sleep(500);
                    }
                    this.value = this.value.trim();
                    this.value = this.value.replace(/[^가-힣a-z ]/gi, '');
                    instance.portfolioBlock(null, this.value);
                    instance.photoLoad = true;
                  } catch (e) {
                    console.log(e);
                  }
                }, "searchEventDebounce", 1000);
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
          instance.portfolioBlock(null, /전체/gi.test(thisValue) ? "" : thisValue);
          instance.photoLoad = true;
        }
      },
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
            color: colorChip.deactive,
            cursor: "pointer",
          },
          bold: {
            color: colorChip.deactive,
          }
        }
      ]
    });
  }

  serviceBlock = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      paddingTop: String(serviceBlockPaddingTop) + ea,
    },
    children: serviceChildren
  });

  serviceBlock.lastChild.firstChild.style.color = colorChip.black;
  serviceBlock.lastChild.firstChild.querySelector('b').style.color = colorChip.green;

}

ReviewListJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseBlock;
  let limitLength;
  let photoMargin;
  let paddingBottom;

  limitLength = <%% 42, 42, 42, 42, 42 %%>;
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  paddingBottom = <%% 120, 120, 120, 120, 40 %%>;

  baseBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingBottom: String(paddingBottom) + ea,
    }
  });

  this.portfolioBlock(limitLength, null);
}

ReviewListJs.prototype.portfolioBlock = function (limitLength, search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  let { contentsArr, clients, projects, designers } = this;
  let baseBlock;
  let gsArray;
  let baseWidth;
  let photoMargin;
  let columns;
  let seroWidth, garoWidth;
  let photoRatio;
  let photoHeight;
  let src;
  let contents;
  let title;
  let quoteWidth, quoteHeight;
  let quoteTop;
  let photoMarginBottom;
  let titleSize, titleWeight, titleMarginLeft;
  let tag;
  let block;
  let tagTong;
  let photoBlockMarginBottom;
  let garoSliceStart, garoSliceEnd, garoSliceLimit;
  let seroSliceStart, seroSliceEnd, seroSliceLimit;
  let tagTongMarginTop, tagTongWidthRatio;
  let tagSize, tagWeight;
  let tagPaddingLeft, tagPaddingTop, tagPaddingBottom;
  let tagMarginRight;

  if (typeof search === "string") {

    if (search === '') {
      contentsArr = contentsArr;
    } else {
      contentsArr = contentsArr.toNormal().filter((obj) => {
        let boo;
        let target;
        let projectTarget;
        let designerTarget;

        target = equalJson(JSON.stringify(obj.contents.portfolio.detailInfo.tag));
        target.push(obj.contents.review.title.main);
        target.push(obj.contents.review.title.sub);
        projectTarget = projects.search("proid", obj.proid);
        if (projectTarget !== null) {
          target.push(serviceParsing(projectTarget.service));
        }
        designerTarget = designers.search("desid", obj.desid);
        target.push(designerTarget.designer);

        boo = false;
        for (let t of target) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }

        return boo;
      });
    }

  } else {
    contentsArr = contentsArr;
  }

  if (limitLength === null) {
    limitLength = contentsArr.length;
  }

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 18 : 20), (isMac() ? 16 : 18), (isMac() ? 16 : 18), (isMac() ? 16 : 18), 2.3 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 21, 17, 17, 15, 3.4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.3 %%>;

  photoBlockMarginBottom = <%% 72, 66, 66, 62, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongMarginTop = <%% 11, 11, 10, 8, 1.3 %%>;
  tagTongWidthRatio = <%% 1.1, 1.3, 1.3, 1.3, 1.3 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), isIphone() ? 1.2 : 1.4 %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  baseBlock = baseTong.children[1];

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents } = contentsArr[i]);

        if (contents.review.detailInfo.photodae.length > 1) {

          src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
          title = contents.review.title.sub.split(", ").join(" ");
          tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

          if (gsArray[i] !== 'g') {
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
            mother: baseBlock,
            style: {
              display: "inline-block",
              width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
              borderRadius: String(5) + "px",
              marginRight: String(photoMargin) + ea,
              marginBottom: String(photoBlockMarginBottom) + ea,
              verticalAlign: "top",
              overflow: "hidden",
            },
            children: [
              {
                style: {
                  display: "block",
                  width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
                  height: String(photoHeight) + ea,
                  borderRadius: String(5) + "px",
                  marginRight: String(photoMargin) + ea,
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
                  width: String(tagTongWidthRatio * 100) + '%',
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
                background: colorChip.gray2
              },
              bold: {
                fontWeight: String(400),
                color: colorChip.deactive,
              }
            })
          }

          if (search === null) {
            this.loadedContents.push(i);
          }
        }
      }
    }
  } else {

    for (let i = 0; i < 4; i++) {

      block = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          width: String(seroWidth) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              width: String(seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(5) + "px",
              marginRight: String(photoMargin) + ea,
              marginBottom: String(photoMarginBottom) + ea,
              background: colorChip.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
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
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  marginLeft: String(titleMarginLeft) + ea,
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
              width: String(tagTongWidthRatio * 100) + '%',
              left: String(0) + ea,
            }
          }
        ]
      });

    }

  }

}

ReviewListJs.prototype.launching = async function (loading) {
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
    let response;

    response = await ajaxJson({ mode: "review", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.clients = new SearchArray(response.clients);
    this.projects = new SearchArray(response.projects);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewList",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPortfolioBase();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewListJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    window.addEventListener("scroll", (e) => {
      setDebounce(() => {
        let scrollMin;
        scrollMin = <%% 1000, 1000, 900, 800, 300 %%>;
        if (window.scrollY > scrollMin && instance.fullLoad && !instance.photoLoad) {
          instance.portfolioBlock(null, null);
          instance.photoLoad = true;
        }
      }, "windowScrollDebounce");
    });

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
    await ajaxJson({ message: "ReviewListJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
