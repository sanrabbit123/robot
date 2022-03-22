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

ReviewListJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, osException, testMode, inputClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = 30;
  leftRatio = 0.2;

  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  quoteHeight = 11;
  quotoTongHeight = 16;
  titleFontSize = 31;
  titleFontWeight = 500;

  servicePaddingLeft = 20;
  serviceSize = 17;
  serviceBlockPaddingTop = 39;

  whiteBlockPaddingTop = 56;
  whiteBlockPaddingBottom = 80;

  searchBarPaddingTop = 20;
  searchBarHeight = 40;
  searchBarWidth = 500;

  searchIconHeight = 20;
  searchIconRight = 11;
  searchIconTop = 10;

  titleWording = "솔직한 고객 후기";
  services = serviceParsing().name;
  services.push("전체 보기");

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(whiteBlockPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      background: colorChip.white,
      marginBottom: String(900) + ea,
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
          }
        ]
      },
    ]
  });

  serviceChildren = [];
  for (let service of services) {
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
    serviceChildren.push({
      style: {
        display: "inline-block",
        position: "relative",
        paddingLeft: String(servicePaddingLeft) + ea,
        paddingRight: String(servicePaddingLeft) + ea,
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
          },
          bold: {
            color: colorChip.deactive,
          }
        }
      ]
    });
  }

  createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: String(serviceBlockPaddingTop) + ea,
    },
    children: serviceChildren
  });

}

ReviewListJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

    this.inputClassName = "consultingInput";

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
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewListJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });


    console.log(LOGHOST);

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ReviewListJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
