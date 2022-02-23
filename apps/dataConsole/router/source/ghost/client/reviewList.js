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
  let tagChildren;
  let tags;
  let titleWording;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = 30;
  leftRatio = 0.2;

  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  quoteHeight = 11;
  titleFontSize = 31;
  titleFontWeight = 500;

  titleWording = "솔직한 고객 후기";
  tags = [
    "all",
    "아파트",
    "새아파트",
    "따뜻한",
    "감성적인",
    "빈티지",
    "빈티지모던",
    "모던",
    "아늑한",
    "우드",
    "나무",
    "여성적인",
    "여성",
    "감성",
    "우드",
    "나무",
    "여성적인",
    "여성",
    "화이트",
    "깔끔한",
    "깨끗한",
    "1인가구",
    "투룸",
    "오피스텔",
    "오피스",
    "홈오피스",
    "사무공간",
    "10평대인테리어",
    "내추럴",
    "라탄",
    "감성적인",
    "아늑한",
    "감성",
    "홈퍼니싱",
    "퍼니싱",
    "모듈형",
    "모듈",
    "남자",
    "미니멀",
    "미니멀리즘",
    "깔끔한",
    "화이트",
    "화이트우드",
    "우드",
    "우드톤",
    "미니",
  ];

  // titleWording = "자주 찾는 질문";
  // tags = [
  //   "홈리에종 진행 방식",
  //   "진행 방식",
  //   "디자이너 작업 방식",
  //   "작업",
  //   "예산 분배",
  //   "예산 활용",
  //   "홈스타일링",
  //   "홈스타일링이란",
  //   "서비스 종류",
  //   "리모델링과 차이",
  //   "디자이너 선택",
  //   "홈리에종 케어",
  //   "디자인 비용",
  //   "디자인비 선금 지불",
  //   "시공 비용",
  //   "부분 시공 진행 여부",
  //   "거주중",
  //   "거주중인데 가능할까요",
  //   "부분 공간"
  // ];

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(56) + ea,
      paddingBottom: String(60) + ea,
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
      height: String(16) + ea,
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
      paddingTop: String(20) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(500) + ea,
          height: String(40) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnSearch(colorChip.black),
            style: {
              position: "absolute",
              height: String(20) + ea,
              right: String(11) + ea,
              top: String(10) + ea,
            }
          }
        ]
      },
    ]
  });


  tagChildren = [];
  for (let tag of tags) {
    tagChildren.push({
      style: {
        display: "inline-block",
        position: "relative",
        height: String(33) + ea,
        paddingLeft: String(14) + ea,
        paddingRight: String(14) + ea,
        marginRight: String(6) + ea,
        marginBottom: String(6) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
            background: colorChip.gray1,
            borderRadius: String(5) + "px",
            opacity: String(0.4 + (0.6 * Math.random())),
          }
        },
        {
          text: "<b%#%b> " + tag,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(6) + ea,
            fontSize: String(14) + ea,
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
      paddingTop: String(45) + ea,
      paddingLeft: String(50) + ea,
      paddingRight: String(50) + ea,
    },
    children: tagChildren
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: String(20) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnDotdotdot(colorChip.green),
        style: {
          display: "inline-block",
          height: String(7) + ea,
        }
      }
    ]
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

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ReviewListJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
