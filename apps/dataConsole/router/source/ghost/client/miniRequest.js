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
      "return ('홈리에종 미니 콘솔 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 미니 콘솔 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniRequest",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

const MiniRequestJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.firstClick = false;
}

MiniRequestJs.binaryPath = FRONTHOST + "/middle/miniRequest";

MiniRequestJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const { user } = this;
  const { request } = user;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let descriptionMarginLeft;
  let mobileTitleHeight;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let blockTitleAreaWidth;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let whiteInnerInnerPaddingTop;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% 2, 3, 2, 2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 7 : 5), -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% (isMac() ? 50 : 48), (isMac() ? 45 : 43), (isMac() ? 35 : 33), (isMac() ? 25 : 23), 9.5 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  blockTitleAreaWidth = <%% 140, 100, 100, 100, 100 %%>;

  whiteBlockMinHeight = <%% 36, 36, 36, 36, 36 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contents = {
    title: [
      user.name + " 고객님",
      "미니 스타일링 관리"
    ],
    description: [
      user.name + " 고객님 관련 <b%홈리에종 미니 서비스 의뢰와 안내%b> 드립니다. 고객님께서 작성해주신",
      "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다.",
    ],
    userInfo: [
      {
        name: "성함",
        value: user.name
      },
      {
        name: "연락처",
        value: user.phone
      },
      {
        name: "이메일",
        value: user.email
      },
      {
        name: "주소",
        value: request.space.address,
      },
      {
        name: "방 개수",
        value: String(request.space.targets) + "개",
      },
      {
        name: "요청 사항",
        value: request.comments.init
      }
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileTitleHeight) + ea,
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.title.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          wordSpacing: String(wordSpacing) + "px",
          lineHeight: String(1.4),
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "left" : "center",
          top: isMac() ? "" : String(titleTop) + ea,
          paddingTop: desktop ? "" : String(titlePaddingTop) + ea,
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(margin * 2, ea),
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? "" : String(margin) + ea,
      paddingTop: String(rightBoxPaddingTop) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(pointColor))) * quoteHeight;
  createNode({
    mother: rightBox,
    mode: "svg",
    source: svgMaker.doubleQuote(pointColor),
    style: {
      position: "absolute",
      top: String(quoteTop) + ea,
      left: desktop ? String(quoteLeft) + ea : "calc(50% - " + String(quoteWidth / 2) + ea + ")",
      width: String(quoteWidth) + ea,
      height: String(quoteHeight) + ea,
    }
  });

  createNode({
    mother: rightBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: desktop ? String(100) + '%' : withOut(descriptionMarginLeft * 2, ea),
      marginLeft: desktop ? "" : String(descriptionMarginLeft) + ea,
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.6),
      textAlign: desktop ? "left" : "center",
    },
    bold: {
      fontWeight: String(600),
      color: pointColor,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginTop: desktop ? String(grayBoxMarginTop) + ea : "",
      paddingTop: desktop ? "" : String(grayBoxMarginTop) + ea,
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });

  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPaddingTop) + ea,
          paddingBottom: String(whiteInnerInnerPaddingBottom) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;

  for (let { name, value } of contents.userInfo) {
    block = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        minHeight: String(whiteBlockMinHeight) + ea,
      }
    });

    createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(blockTitleAreaWidth) + ea,
        height: String(100) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: name,
          style: {
            fontSize: String(blockFactorSize) + ea,
            fontWeight: String(blockFactorTitleWeight),
            color: colorChip.black,
            lineHeight: String(blockFactorLineHeight),
            verticalAlign: "top",
          }
        }
      ]
    });

    createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: withOut(blockTitleAreaWidth, ea),
        height: String(100) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: value,
          style: {
            fontSize: String(blockFactorSize) + ea,
            fontWeight: String(blockFactorWeight),
            color: colorChip.black,
            lineHeight: String(blockFactorLineHeight),
            verticalAlign: "top",
          }
        }
      ]
    });
  }

}

MiniRequestJs.prototype.insertMemoBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, ajaxJson } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const { user } = this;
  const { request } = user;
  const { comments } = request;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let descriptionMarginLeft;
  let mobileTitleHeight;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let descriptionBetween;
  let descriptionLineHeight;
  let whiteQuestionBetween;
  let num;
  let whiteInnerInnerPaddingTop;
  let photoBox;
  let photo;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% 2, 3, 2, 2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 7 : 5), -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% (isMac() ? 50 : 48), (isMac() ? 45 : 43), (isMac() ? 35 : 33), (isMac() ? 25 : 23), 9.5 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 240, 240, 240, 240, 24 %%>;
  whiteQuestionBetween = <%% 13, 13, 13, 13, 13 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  descriptionBetween = <%% 20, 20, 20, 20, 20 %%>;
  descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  contents = {
    description: [
      "고객 상담은 <b%다음 3가지 내용%b>을 기반으로",
      "유선 전화를 통해 진행하시면 됩니다.",
      "3가지 항목은 <b%고객님이 직접 적어주신 것으로,",
      "부족한 점이 있다면 상담을 통해%b> 상담 메모란에",
      "추가하여 적어주시면 됩니다.",
    ],
    check: [
      "선호하는 컬러나 스타일",
      "패브릭, 액자, 소품에 쓸 예산",
      "공간 실측 정보",
    ],
    memo: "이곳을 클릭하여 상담 메모를 남겨주세요!",
    memoList: [
      { question: "고객이 받은 질문 : '선호하는 컬러나 스타일을 알려주세요!'", value: comments.style },
      { question: "고객이 받은 질문 : '패브릭, 액자, 소품에 쓸 예산을 알려주세요!'", value: comments.budget },
      { question: "고객이 받은 질문 : '공간의 사이즈를 가이드에 따라 실측한 뒤 알려주세요!'", value: comments.size },
      { question: "기타 상담 메모를 적어주세요!", value: comments.etc },
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      height: String(whiteBlockMinHeight + (whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2)) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
      verticalAlign: "top",
      flexDirection: "column",
    }
  });

  createNode({
    mother: leftBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      textAlign: desktop ? "left" : "center",
      marginBottom: String(descriptionBetween) + ea,
    },
    bold: {
      fontWeight: String(600),
      color: pointColor,
    }
  });

  createNode({
    mother: leftBox,
    text: contents.check.map((str, index) => { return String(index + 1) + ". " + str; }).join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(800),
      color: pointColor,
      lineHeight: String(descriptionLineHeight),
      textAlign: desktop ? "left" : "center",
    },
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(margin * 2, ea),
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? "" : String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });

  num = 0;
  for (let { question, value } of contents.memoList) {

    whiteBox = createNode({
      mother: grayBox,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        paddingTop: String(whiteInnerMargin) + ea,
        paddingBottom: String(whiteInnerMargin) + ea,
        marginBottom: String(whiteInnerMargin) + ea,
      },
      children: [
        {
          text: "> " + question,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(16) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            paddingLeft: String(whiteInnerMargin) + ea,
            paddingBottom: String(whiteQuestionBetween) + ea,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
            background: colorChip.white,
            width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
            marginLeft: String(whiteInnerMargin) + ea,
            paddingLeft: String(whiteInnerInnerPadding) + ea,
            paddingRight: String(whiteInnerInnerPadding) + ea,
            paddingTop: String(whiteInnerInnerPaddingTop) + ea,
            paddingBottom: String(whiteInnerInnerPadding) + ea,
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            borderRadius: String(5) + "px",
          }
        }
      ]
    }).children[1];

    if (num !== contents.memoList.length - 1) {
      block = createNode({
        mother: whiteBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(100) + '%',
              height: String(100) + '%',
              verticalAlign: "top",
            },
            children: [
              {
                text: value,
                style: {
                  fontSize: String(blockFactorSize) + ea,
                  fontWeight: String(blockFactorWeight),
                  color: colorChip.black,
                  lineHeight: String(blockFactorLineHeight),
                  verticalAlign: "top",
                }
              }
            ]
          }
        ]
      });
    } else {
      block = createNode({
        mother: whiteBox,
        style: {
          display: "block",
          position: "relative",
          minHeight: String(whiteBlockMinHeight) + ea,
        },
        children: [
          {
            mode: "textarea",
            text: value,
            attribute: {
              placeholder: contents.memo,
            },
            event: {
              blur: async function (e) {
                try {
                  let whereQuery, updateQuery;
                  whereQuery = { useid: instance.user.useid };
                  updateQuery = {};
                  updateQuery["request.comments.etc"] = this.value.trim();
                  await ajaxJson({ whereQuery, updateQuery }, "/updateUser");
                } catch (e) {
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                }
              }
            },
            style: {
              display: "inline-block",
              position: "relative",
              width: String(100) + '%',
              verticalAlign: "top",
              fontSize: String(blockFactorSize) + ea,
              fontWeight: String(blockFactorWeight),
              color: colorChip.black,
              lineHeight: String(blockFactorLineHeight),
              verticalAlign: "top",
              minHeight: String(whiteBlockMinHeight) + ea,
              border: String(0),
              outline: String(0),
            },
          }
        ]
      });
    }

    num++;
  }

  photoBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
      marginBottom: String(whiteInnerMargin) + ea,
    }
  });

  ajaxJson({ useid: instance.user.useid }, "/ghostPass_userPhoto", { equal: true }).then((list) => {
    
    console.log(list);

  }).catch((err) => { console.log(err); })

}

MiniRequestJs.prototype.insertConceptBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let wordSpacing;
  let titleFont, titleFontWeight;
  let grayBox;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let titleBoxHeight;
  let titleBoxMarginBottom;
  let titleLineTop;
  let titleWhitePadding;
  let photoBox;
  let photoDescriptionBox;
  let photoDescriptionBoxMarginBottom;
  let boxBetween;
  let imageHeight;
  let fileUploadSize, fileUploadWeight, fileUploadTextTop, fileUploadLineHeight;
  let photoDescriptionHeight;
  let photoDescriptionSize, photoDescriptionWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleFont = <%% 25, 25, 25, 25, 5.8 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% -2, -2, -2, -2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  titleBoxHeight = <%% 32, 32, 32, 32, 32 %%>;
  titleBoxMarginBottom = <%% 32, 32, 32, 32, 32 %%>;
  titleLineTop = <%% 12, 12, 12, 12, 12 %%>;
  titleWhitePadding = <%% 20, 20, 20, 20, 20 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 160, 160, 160, 160, 160 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  boxBetween = <%% 20, 20, 20, 20, 20 %%>;

  photoDescriptionBoxMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  imageHeight = <%% 348, 255, 348, 348, 348 %%>;

  photoDescriptionHeight = <%% 24, 24, 24, 24, 24 %%>;
  photoDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  photoDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  fileUploadSize = <%% 25, 21, 25, 25, 25 %%>;
  fileUploadWeight = <%% 200, 200, 200, 200, 200 %%>;
  fileUploadTextTop = <%% -2, -2, -2, -2, -2 %%>;
  fileUploadLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents = {
    title: "컨셉 시안 업로드",
    info: [
      "< 예시 >",
      "< 사이즈 1024x600 >"
    ],
    memo: "이곳을 클릭하여 컨셉 설명을 남겨주세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    image: MiniRequestJs.binaryPath + "/" + "concept.jpg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: withOut(margin * 2, ea),
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  // title box
  createNode({
    mother: rightBox,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(titleBoxHeight) + ea,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: String(titleBoxMarginBottom) + ea,
    },
    children: [
      {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: String(titleLineTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      {
        text: contents.title,
        style: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          background: colorChip.white,
          display: "inline-block",
          position: "relative",
          top: String(titleTop) + ea,
          paddingRight: String(titleWhitePadding) + ea,
        }
      }
    ]
  });

  // photo description box
  photoDescriptionBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(photoDescriptionBoxMarginBottom) + ea,
    }
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      marginRight: String(boxBetween) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[0],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[1],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  // photo box
  photoBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(boxBetween) + ea,
    }
  });

  createNode({
    mother: photoBox,
    mode: "img",
    attribute: { src: contents.image },
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      marginRight: String(boxBetween) + ea,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      background: colorChip.gray2,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    children: [
      {
        text: contents.file,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(fileUploadSize) + ea,
          fontWeight: String(fileUploadWeight),
          color: colorChip.deactive,
          top: String(fileUploadTextTop) + ea,
          lineHeight: String(fileUploadLineHeight),
        }
      }
    ]
  });

  // description box
  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });
  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPadding) + ea,
          paddingBottom: String(whiteInnerInnerPadding) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;
  block = createNode({
    mother: whiteBox,
    style: {
      display: "block",
      position: "relative",
      minHeight: String(whiteBlockMinHeight) + ea,
    }
  });
  createNode({
    mother: block,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.memo,
        style: {
          fontSize: String(blockFactorSize) + ea,
          fontWeight: String(blockFactorWeight),
          color: colorChip.black,
          lineHeight: String(blockFactorLineHeight),
          verticalAlign: "top",
        }
      }
    ]
  });

}

MiniRequestJs.prototype.insertCollageBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let wordSpacing;
  let titleFont, titleFontWeight;
  let grayBox;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let titleBoxHeight;
  let titleBoxMarginBottom;
  let titleLineTop;
  let titleWhitePadding;
  let photoBox;
  let photoDescriptionBox;
  let photoDescriptionBoxMarginBottom;
  let boxBetween;
  let imageHeight;
  let fileUploadSize, fileUploadWeight, fileUploadTextTop, fileUploadLineHeight;
  let photoDescriptionHeight;
  let photoDescriptionSize, photoDescriptionWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleFont = <%% 25, 25, 25, 25, 5.8 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% -2, -2, -2, -2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  titleBoxHeight = <%% 32, 32, 32, 32, 32 %%>;
  titleBoxMarginBottom = <%% 32, 32, 32, 32, 32 %%>;
  titleLineTop = <%% 12, 12, 12, 12, 12 %%>;
  titleWhitePadding = <%% 20, 20, 20, 20, 20 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 160, 160, 160, 160, 160 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  boxBetween = <%% 20, 20, 20, 20, 20 %%>;

  photoDescriptionBoxMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  imageHeight = <%% 348, 255, 348, 348, 348 %%>;

  photoDescriptionHeight = <%% 24, 24, 24, 24, 24 %%>;
  photoDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  photoDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  fileUploadSize = <%% 25, 21, 25, 25, 25 %%>;
  fileUploadWeight = <%% 200, 200, 200, 200, 200 %%>;
  fileUploadTextTop = <%% -2, -2, -2, -2, -2 %%>;
  fileUploadLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents = {
    title: "콜라주 시안 업로드",
    info: [
      "< 예시 >",
      "< 사이즈 1024x600 >"
    ],
    memo: "이곳을 클릭하여 시안 관련 설명을 남겨주세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    image: MiniRequestJs.binaryPath + "/" + "collage.jpg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: withOut(margin * 2, ea),
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  // title box
  createNode({
    mother: rightBox,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(titleBoxHeight) + ea,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: String(titleBoxMarginBottom) + ea,
    },
    children: [
      {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: String(titleLineTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      {
        text: contents.title,
        style: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          background: colorChip.white,
          display: "inline-block",
          position: "relative",
          top: String(titleTop) + ea,
          paddingRight: String(titleWhitePadding) + ea,
        }
      }
    ]
  });

  // photo description box
  photoDescriptionBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(photoDescriptionBoxMarginBottom) + ea,
    }
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      marginRight: String(boxBetween) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[0],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[1],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  // photo box
  photoBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(boxBetween) + ea,
    }
  });

  createNode({
    mother: photoBox,
    mode: "img",
    attribute: { src: contents.image },
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      marginRight: String(boxBetween) + ea,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      background: colorChip.gray2,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    children: [
      {
        text: contents.file,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(fileUploadSize) + ea,
          fontWeight: String(fileUploadWeight),
          color: colorChip.deactive,
          top: String(fileUploadTextTop) + ea,
          lineHeight: String(fileUploadLineHeight),
        }
      }
    ]
  });

  // description box
  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });
  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPadding) + ea,
          paddingBottom: String(whiteInnerInnerPadding) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;
  block = createNode({
    mother: whiteBox,
    style: {
      display: "block",
      position: "relative",
      minHeight: String(whiteBlockMinHeight) + ea,
    }
  });
  createNode({
    mother: block,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.memo,
        style: {
          fontSize: String(blockFactorSize) + ea,
          fontWeight: String(blockFactorWeight),
          color: colorChip.black,
          lineHeight: String(blockFactorLineHeight),
          verticalAlign: "top",
        }
      }
    ]
  });

}

MiniRequestJs.prototype.insertReferenceBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let wordSpacing;
  let titleFont, titleFontWeight;
  let grayBox;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let titleBoxHeight;
  let titleBoxMarginBottom;
  let titleLineTop;
  let titleWhitePadding;
  let photoBox;
  let photoDescriptionBox;
  let photoDescriptionBoxMarginBottom;
  let boxBetween;
  let imageHeight;
  let fileUploadSize, fileUploadWeight, fileUploadTextTop, fileUploadLineHeight;
  let photoDescriptionHeight;
  let photoDescriptionSize, photoDescriptionWeight;
  let boxInnerBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleFont = <%% 25, 25, 25, 25, 5.8 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% -2, -2, -2, -2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  titleBoxHeight = <%% 32, 32, 32, 32, 32 %%>;
  titleBoxMarginBottom = <%% 32, 32, 32, 32, 32 %%>;
  titleLineTop = <%% 12, 12, 12, 12, 12 %%>;
  titleWhitePadding = <%% 20, 20, 20, 20, 20 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 160, 160, 160, 160, 160 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  boxBetween = <%% 20, 20, 20, 20, 20 %%>;

  photoDescriptionBoxMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  imageHeight = <%% 348, 255, 348, 348, 348 %%>;

  photoDescriptionHeight = <%% 24, 24, 24, 24, 24 %%>;
  photoDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  photoDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  fileUploadSize = <%% 25, 21, 25, 25, 25 %%>;
  fileUploadWeight = <%% 200, 200, 200, 200, 200 %%>;
  fileUploadTextTop = <%% -2, -2, -2, -2, -2 %%>;
  fileUploadLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  boxInnerBetween = <%% 10, 10, 10, 10, 10 %%>;

  contents = {
    title: "참고 사진 업로드",
    info: [
      "< 예시 >",
      "< 사이즈 1024x600 >"
    ],
    memo: "이곳을 클릭하여 참고 사진 관련 설명을 남겨주세요!",
    file: "파일 업로드...",
    images: [
      MiniRequestJs.binaryPath + "/" + "reference0.jpg",
      MiniRequestJs.binaryPath + "/" + "reference1.jpg",
      MiniRequestJs.binaryPath + "/" + "reference2.jpg",
      MiniRequestJs.binaryPath + "/" + "reference3.jpg",
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: withOut(margin * 2, ea),
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  // title box
  createNode({
    mother: rightBox,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(titleBoxHeight) + ea,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: String(titleBoxMarginBottom) + ea,
    },
    children: [
      {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: String(titleLineTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      {
        text: contents.title,
        style: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          background: colorChip.white,
          display: "inline-block",
          position: "relative",
          top: String(titleTop) + ea,
          paddingRight: String(titleWhitePadding) + ea,
        }
      }
    ]
  });

  // photo description box
  photoDescriptionBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(photoDescriptionBoxMarginBottom) + ea,
    }
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      marginRight: String(boxBetween) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[0],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[1],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  // photo box
  photoBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(boxBetween) + ea,
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      verticalAlign: "top",
      marginRight: String(boxBetween) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginRight: String(boxInnerBetween) + ea,
          marginBottom: String(boxInnerBetween) + ea,
          backgroundImage: "url('" + contents.images[0] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginBottom: String(boxInnerBetween) + ea,
          backgroundImage: "url('" + contents.images[1] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginRight: String(boxInnerBetween) + ea,
          backgroundImage: "url('" + contents.images[2] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
        }
      },
      {
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          backgroundImage: "url('" + contents.images[3] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
        }
      },
    ]
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginRight: String(boxInnerBetween) + ea,
          marginBottom: String(boxInnerBetween) + ea,
          verticalAlign: "top",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        children: [
          {
            text: contents.file,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(fileUploadSize) + ea,
              fontWeight: String(fileUploadWeight),
              color: colorChip.deactive,
              top: String(fileUploadTextTop) + ea,
              lineHeight: String(fileUploadLineHeight),
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginBottom: String(boxInnerBetween) + ea,
          verticalAlign: "top",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        children: [
          {
            text: contents.file,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(fileUploadSize) + ea,
              fontWeight: String(fileUploadWeight),
              color: colorChip.deactive,
              top: String(fileUploadTextTop) + ea,
              lineHeight: String(fileUploadLineHeight),
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginRight: String(boxInnerBetween) + ea,
          verticalAlign: "top",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        children: [
          {
            text: contents.file,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(fileUploadSize) + ea,
              fontWeight: String(fileUploadWeight),
              color: colorChip.deactive,
              top: String(fileUploadTextTop) + ea,
              lineHeight: String(fileUploadLineHeight),
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          width: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          height: "calc(calc(100% - " + String(boxInnerBetween) + ea + ") / 2)",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          verticalAlign: "top",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        children: [
          {
            text: contents.file,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(fileUploadSize) + ea,
              fontWeight: String(fileUploadWeight),
              color: colorChip.deactive,
              top: String(fileUploadTextTop) + ea,
              lineHeight: String(fileUploadLineHeight),
            }
          }
        ]
      },
    ]
  });

  // description box
  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });
  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPadding) + ea,
          paddingBottom: String(whiteInnerInnerPadding) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;
  block = createNode({
    mother: whiteBox,
    style: {
      display: "block",
      position: "relative",
      minHeight: String(whiteBlockMinHeight) + ea,
    }
  });
  createNode({
    mother: block,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.memo,
        style: {
          fontSize: String(blockFactorSize) + ea,
          fontWeight: String(blockFactorWeight),
          color: colorChip.black,
          lineHeight: String(blockFactorLineHeight),
          verticalAlign: "top",
        }
      }
    ]
  });

}

MiniRequestJs.prototype.insertListBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let wordSpacing;
  let titleFont, titleFontWeight;
  let grayBox;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let titleBoxHeight;
  let titleBoxMarginBottom;
  let titleLineTop;
  let titleWhitePadding;
  let photoBox;
  let photoDescriptionBox;
  let photoDescriptionBoxMarginBottom;
  let boxBetween;
  let imageHeight;
  let fileUploadSize, fileUploadWeight, fileUploadTextTop, fileUploadLineHeight;
  let photoDescriptionHeight;
  let photoDescriptionSize, photoDescriptionWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleFont = <%% 25, 25, 25, 25, 5.8 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% -2, -2, -2, -2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  titleBoxHeight = <%% 32, 32, 32, 32, 32 %%>;
  titleBoxMarginBottom = <%% 32, 32, 32, 32, 32 %%>;
  titleLineTop = <%% 12, 12, 12, 12, 12 %%>;
  titleWhitePadding = <%% 20, 20, 20, 20, 20 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 160, 160, 160, 160, 160 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  boxBetween = <%% 20, 20, 20, 20, 20 %%>;

  photoDescriptionBoxMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  imageHeight = <%% 200, 160, 200, 200, 200 %%>;

  photoDescriptionHeight = <%% 24, 24, 24, 24, 24 %%>;
  photoDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  photoDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  fileUploadSize = <%% 25, 21, 25, 25, 25 %%>;
  fileUploadWeight = <%% 200, 200, 200, 200, 200 %%>;
  fileUploadTextTop = <%% -2, -2, -2, -2, -2 %%>;
  fileUploadLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents = {
    title: "제품 리스트 업로드",
    info: [
      "< 샘플 파일 다운로드 >",
      "< 파일 업로드 >"
    ],
    memo: "이곳을 클릭하여\n리스트 파일을 다운로드 하세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    image: MiniRequestJs.binaryPath + "/" + "collage.jpg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: withOut(margin * 2, ea),
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  // title box
  createNode({
    mother: rightBox,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(titleBoxHeight) + ea,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: String(titleBoxMarginBottom) + ea,
    },
    children: [
      {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: String(titleLineTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      {
        text: contents.title,
        style: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          background: colorChip.white,
          display: "inline-block",
          position: "relative",
          top: String(titleTop) + ea,
          paddingRight: String(titleWhitePadding) + ea,
        }
      }
    ]
  });

  // photo description box
  photoDescriptionBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      marginBottom: String(photoDescriptionBoxMarginBottom) + ea,
    }
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      marginRight: String(boxBetween) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[0],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: photoDescriptionBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(photoDescriptionHeight) + ea,
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.info[1],
        style: {
          fontSize: String(photoDescriptionSize) + ea,
          fontWeight: String(photoDescriptionWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  // photo box
  photoBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
    }
  });

  createNode({
    mother: photoBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      background: pointColor,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginRight: String(boxBetween) + ea,
    },
    children: [
      {
        text: contents.memo,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(fileUploadSize) + ea,
          fontWeight: String(fileUploadWeight),
          color: colorChip.white,
          top: String(fileUploadTextTop) + ea,
          lineHeight: String(fileUploadLineHeight),
        }
      }
    ]
  });


  createNode({
    mother: photoBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: "calc(calc(100% - " + String(boxBetween) + ea + ") / 2)",
      height: String(imageHeight) + ea,
      background: colorChip.gray2,
      borderRadius: String(5) + "px",
      verticalAlign: "top",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    children: [
      {
        text: contents.file,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(fileUploadSize) + ea,
          fontWeight: String(fileUploadWeight),
          color: colorChip.deactive,
          top: String(fileUploadTextTop) + ea,
          lineHeight: String(fileUploadLineHeight),
        }
      }
    ]
  });

}

MiniRequestJs.prototype.insertFinalBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let wordSpacing;
  let titleFont, titleFontWeight;
  let grayBox;
  let grayBoxHeight;
  let contents;
  let rightBoxPaddingTop;
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;
  let titleBoxHeight;
  let titleBoxMarginBottom;
  let titleLineTop;
  let titleWhitePadding;
  let photoBox;
  let photoDescriptionBox;
  let photoDescriptionBoxMarginBottom;
  let boxBetween;
  let imageHeight;
  let fileUploadSize, fileUploadWeight, fileUploadTextTop, fileUploadLineHeight;
  let photoDescriptionHeight;
  let photoDescriptionSize, photoDescriptionWeight;
  let buttonWidth, buttonHeight;

  bottomMargin = <%% 160, 160, 160, 120, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  titleFont = <%% 19, 19, 19, 19, 5.8 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% -2, -2, -2, -2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  titleBoxHeight = <%% 32, 32, 32, 32, 32 %%>;
  titleBoxMarginBottom = <%% 32, 32, 32, 32, 32 %%>;
  titleLineTop = <%% 12, 12, 12, 12, 12 %%>;
  titleWhitePadding = <%% 20, 20, 20, 20, 20 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 20, 20, 20, 20, 20 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  whiteBlockMinHeight = <%% 160, 160, 160, 160, 160 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  boxBetween = <%% 20, 20, 20, 20, 20 %%>;

  photoDescriptionBoxMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  imageHeight = <%% 200, 200, 200, 200, 200 %%>;

  photoDescriptionHeight = <%% 24, 24, 24, 24, 24 %%>;
  photoDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  photoDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  fileUploadSize = <%% 25, 21, 25, 25, 25 %%>;
  fileUploadWeight = <%% 200, 200, 200, 200, 200 %%>;
  fileUploadTextTop = <%% -2, -2, -2, -2, -2 %%>;
  fileUploadLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  buttonWidth = <%% 150, 150, 150, 150, 150 %%>;
  buttonHeight = <%% 50, 50, 50, 50, 150 %%>;

  contents = {
    title: "시안 보내기",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: withOut(margin * 2, ea),
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: String(margin) + ea,
    }
  });

  createNode({
    mother: rightBox,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonWidth) + ea,
          height: String(buttonHeight) + ea,
          background: pointColor,
          borderRadius: String(5) + "px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        children: [
          {
            text: contents.title,
            style: {
              fontSize: String(titleFont) + ea,
              fontWeight: String(titleFontWeight),
              color: colorChip.white,
              display: "inline-block",
              position: "relative",
              top: String(titleTop) + ea,
            }
          }
        ]
      }
    ]
  });

}

MiniRequestJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();
    let users, user;

    if (getObj.useid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    users = await ajaxJson({ whereQuery: { useid: getObj.useid } }, "/getUsers", { equal: true });
    if (users.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    user = users[0];
    this.user = user;
    this.pointColor = "darkslategray";

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "miniRequest",
      client: this.user,
      base: {
        instance: this,
        binaryPath: MiniRequestJs.binaryPath,
        subTitle: "디자인 요청",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertMemoBox();
          instance.insertConceptBox();
          instance.insertCollageBox();
          instance.insertReferenceBox();
          instance.insertListBox();
          instance.insertFinalBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    this.mother.backgroundGray.style.background = this.pointColor;
    this.mother.backgroundImageBox.style.backgroundImage = "";
    this.mother.backgroundImageBox.style.background = this.pointColor;
    document.getElementById("footergreenback0817").style.background = "transparent";

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
