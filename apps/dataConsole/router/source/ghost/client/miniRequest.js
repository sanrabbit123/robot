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
  "hangul": "미니 서비스 콘솔",
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
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, ajaxJson, sleep } = GeneralJs;
  const { client, ea, media, osException, pointColor, totalContents } = this;
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
  let photoBetween;
  let image;
  let width, height;
  let upDownPadding;
  let lefRightPadding;
  let imageArrowWidth, imageArrowLeft;

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

  photoBetween = <%% 8, 8, 8, 8, 1 %%>;

  upDownPadding = <%% 108, 108, 108, 120, 120 %%>;
  lefRightPadding = <%% 150, 150, 150, 150, 200 %%>;

  imageArrowWidth = <%% 16, 16, 16, 16, 16 %%>;
  imageArrowLeft = <%% -70, -70, -70, -70, -70 %%>;

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
      { question: "고객이 받은 질문 : '공간에 사용된 가구들은 어떤 것들이 있나요?'", value: comments.style },
      { question: "고객이 받은 질문 : '공간 사용 목적과 예산에 대해 작성해 주세요!'", value: comments.budget },
      { question: "고객이 받은 질문 : '가이드에 맞춰 공간의 사이즈를 실측하여 작성해주세요.'", value: comments.size },
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
              overflow: "scroll",
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
                  await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/updateUser");
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
      paddingBottom: String(whiteInnerMargin - photoBetween) + ea,
      marginBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          marginLeft: String(whiteInnerMargin) + ea,
          width: withOut((whiteInnerMargin * 2) - photoBetween, ea),
          display: "block",
          position: "relative",
        }
      }
    ]
  }).firstChild;


  (async () => {
    try {
      const data = await ajaxJson({ useid: instance.user.useid }, BRIDGEHOST + "/userPhoto", { equal: true });
      const { list } = data;
      const targets = list.map((raw) => { return BRIDGEHOST.replace(/\:3000/gi, '') + window.encodeURI(raw) });
      let images;
      let index;

      images = [];
      index = 0;
      for (let link of targets) {
        image = createNode({
          mother: photoBox,
          mode: "img",
          event: {
            click: function (e) {
              const zIndex = String(101);
              const index = Number(this.getAttribute("index"));
              const imagePopupClassName = "imagePopupClassName";
              const imagePopupIdName = "imagePopupIdName";
              let cancelBack, imagePopup;
              let gsMode;
              let imageWidth, imageHeight;
              let generateImagePopup;
              let ratio, width, height;

              cancelBack = createNode({
                mother: totalContents,
                class: [ imagePopupClassName ],
                event: {
                  click: function (e) {
                    const removeTargets = document.querySelectorAll('.' + imagePopupClassName);
                    for (let dom of removeTargets) {
                      dom.remove();
                    }
                  }
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(0),
                  width: String(100) + '%',
                  height: String(100) + '%',
                  opacity: String(0.3),
                  background: colorChip.black,
                }
              });

              generateImagePopup = (index) => {
                ratio = Number(images[index].getAttribute("ratio"));
                width = Number(images[index].getAttribute("width"));
                height = Number(images[index].getAttribute("height"));

                gsMode = (window.innerWidth - (lefRightPadding * 2) < (window.innerHeight - (upDownPadding * 2)) * ratio) ? 'g' : 's';

                if (gsMode === 'g') {
                  imageWidth = window.innerWidth - (lefRightPadding * 2);
                  imageHeight = imageWidth / ratio;
                } else {
                  imageHeight = window.innerHeight - (upDownPadding * 2);
                  imageWidth = imageHeight * ratio;
                }

                return createNode({
                  id: imagePopupIdName,
                  mother: totalContents,
                  class: [ imagePopupClassName ],
                  style: {
                    position: "fixed",
                    width: String(imageWidth) + ea,
                    height: String(imageHeight) + ea,
                    top: withOut(50, imageHeight / 2, ea),
                    left: withOut(50, imageWidth / 2, ea),
                    borderRadius: String(3) + "px",
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
                          mode: "svg",
                          source: instance.mother.returnArrow("left", colorChip.white),
                          attribute: {
                            index: String(index),
                          },
                          event: {
                            click: function (e) {
                              const index = Number(this.getAttribute("index"));
                              document.getElementById(imagePopupIdName).remove();
                              if (images[index - 1] === undefined) {
                                generateImagePopup(images.length - 1);
                              } else {
                                generateImagePopup(index - 1);
                              }
                            },
                            selectstart: (e) => { e.preventDefault(); },
                          },
                          style: {
                            position: "absolute",
                            width: String(imageArrowWidth) + ea,
                            top: withOut(50, imageArrowWidth / 2, ea),
                            left: String(imageArrowLeft) + ea,
                            cursor: "pointer",
                          }
                        },
                        {
                          mode: "svg",
                          source: instance.mother.returnArrow("right", colorChip.white),
                          attribute: {
                            index: String(index),
                          },
                          event: {
                            click: function (e) {
                              const index = Number(this.getAttribute("index"));
                              document.getElementById(imagePopupIdName).remove();
                              if (images[index + 1] === undefined) {
                                generateImagePopup(0);
                              } else {
                                generateImagePopup(index + 1);
                              }
                            },
                            selectstart: (e) => { e.preventDefault(); },
                          },
                          style: {
                            position: "absolute",
                            width: String(imageArrowWidth) + ea,
                            top: withOut(50, imageArrowWidth / 2, ea),
                            right: String(imageArrowLeft) + ea,
                            cursor: "pointer",
                          }
                        },
                        {
                          mode: "img",
                          attribute: { src: images[index].getAttribute("src") },
                          event: {
                            selectstart: (e) => { e.preventDefault(); },
                          },
                          style: {
                            display: "block",
                            position: "relative",
                            width: String(imageWidth) + ea,
                            height: String(imageHeight) + ea,
                            borderRadius: String(3) + "px",
                          }
                        }
                      ]
                    }
                  ]
                });
              }

              generateImagePopup(index);

            }
          },
          attribute: {
            src: link,
            index: String(index),
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(calc(100% - " + String(photoBetween * 4) + ea + ") / " + String(4) + ")",
            height: "auto",
            borderRadius: String(3) + "px",
            marginRight: String(photoBetween) + ea,
            marginBottom: String(photoBetween) + ea,
            verticalAlign: "top",
            cursor: "pointer",
          }
        });
        ({ width, height } = image.getBoundingClientRect());
        while (height === 0) {
          await sleep(500);
          ({ width, height } = image.getBoundingClientRect());
        }
        image.setAttribute("width", String(Math.floor(width)));
        image.setAttribute("height", String(Math.floor(height)));
        image.setAttribute("ratio", String(width / height));
        images.push(image);
        index++;
      }

    } catch (e) {
      window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
    }
  })().catch((err) => { console.log(err); });

}

MiniRequestJs.prototype.insertProposalBoxes = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor, user } = this;
  const { request: { space: { targets } } } = user;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let margin;
  let bottomMargin;
  let titleBoxHeight;
  let titleLineTop;
  let titlePadding, titleSize, titleWeight, titleTextTop;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  margin = margin / 2;

  titleBoxHeight = <%% 42, 42, 42, 42, 42 %%>;
  titleLineTop = <%% 21, 21, 21, 21, 21 %%>;

  titlePadding = <%% 22, 22, 22, 22, 22 %%>;
  titleSize = <%% 24, 24, 24, 24, 24 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleTextTop = <%% -2, -2, -2, -2, -2 %%>;

  this.matrix = (new Array(targets)).fill(0, 0);
  for (let i = 0; i < targets; i++) {
    whiteBlock = createNode({
      mother: this.baseTong,
      attribute: { index: String(i), },
      style: {
        position: "relative",
        borderRadius: String(8) + "px",
        width: withOut(margin * 2, ea),
        paddingLeft: String(margin) + ea,
        paddingRight: String(margin) + ea,
        paddingTop: String(margin) + ea,
        paddingBottom: String(margin) + ea,
        background: colorChip.gray2,
        marginBottom: String(bottomMargin) + ea,
        boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      }
    });
    createNode({
      mother: whiteBlock,
      style: {
        display: "flex",
        position: "relative",
        height: String(titleBoxHeight) + ea,
        marginBottom: String(margin) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: String(titleLineTop) + ea,
            borderBottom: "1px dashed " + colorChip.gray4,
          }
        },
        {
          text: "공간 " + String(i + 1),
          style: {
            display: "inline-block",
            position: "relative",
            paddingLeft: String(titlePadding) + ea,
            paddingRight: String(titlePadding) + ea,
            background: colorChip.gray2,
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            top: String(titleTextTop),
          }
        }
      ]
    });
    instance.insertProposalBox(whiteBlock, i);
  }

}

MiniRequestJs.prototype.insertProposalBox = function (mother, index) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor, user } = this;
  const mobile = media[4];
  const desktop = !mobile;

  instance.insertConceptBox(mother, index);
  instance.insertCollageBox(mother, index);
  instance.insertReferenceBox(mother, index);
  instance.insertListBox(mother, index);

}

MiniRequestJs.prototype.insertConceptBox = function (mother, index) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor, fileInputClassNames } = this;
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
  let fileChangeEvent;

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
      "< 사이즈 1820x1000 >"
    ],
    memo: "시안을 업로드한 뒤 설명을 적어주세요!",
    placeholder: "이곳을 클릭하여 시안에 대한 설명을 적어주세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    fileActive: "파일 업로드 됨",
    image: MiniRequestJs.binaryPath + "/" + "concept.jpg",
  };

  fileChangeEvent = function (e) {
    const self = this;
    const mother = this.parentElement;
    const grandMother = mother.parentElement;
    const [ text ] = [ ...mother.children ];
    const textAreaBack = grandMother.nextElementSibling.children[0].children[0];
    const textArea = textAreaBack.children[0].children[0];
    if (this.files.length !== 0) {
      mother.style.background = pointColor;
      text.style.color = colorChip.white;
      text.textContent = contents.fileActive;
      textAreaBack.style.background = colorChip.white;
      textArea.style.color = colorChip.black;
      textArea.setAttribute("placeholder", contents.placeholder);
      this.setAttribute("toggle", "on");
      textArea.focus();
    } else {
      mother.style.background = colorChip.gray2;
      text.style.color = colorChip.deactive;
      text.textContent = contents.file;
      textAreaBack.style.background = colorChip.gray2;
      textArea.style.color = colorChip.deactive;
      textArea.setAttribute("placeholder", contents.memo);
      this.setAttribute("toggle", "off");
    }
  }

  whiteBlock = createNode({
    mother,
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
    event: {
      click: function (e) {
        this.querySelector("input").click();
      },
      dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
      drop: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.querySelector("input").files = e.dataTransfer.files;
        fileChangeEvent.call(this.querySelector("input"), e);
      }
    },
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
      cursor: "pointer",
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
      },
      {
        mode: "input",
        class: [ fileInputClassNames.concept ],
        event: {
          change: fileChangeEvent,
        },
        attribute: [
          { index: String(index) },
          { type: "file" },
          { name: fileInputClassNames.concept },
          { accept: "image/*" },
          { multiple: "true" },
          { cancel: JSON.stringify([]) },
          { toggle: "off" },
        ],
        style: {
          position: "absolute",
          display: "none",
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
          background: colorChip.gray2,
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
    mode: "textarea",
    class: [ fileInputClassNames.concept ],
    attribute: {
      placeholder: contents.memo,
      index: String(index),
    },
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      verticalAlign: "top",
      fontSize: String(blockFactorSize) + ea,
      fontWeight: String(blockFactorWeight),
      color: colorChip.deactive,
      lineHeight: String(blockFactorLineHeight),
      border: String(0),
      outline: String(0),
      background: "transparent",
      minHeight: String(whiteBlockMinHeight) + ea,
    },
  });

}

MiniRequestJs.prototype.insertCollageBox = function (mother, index) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor, fileInputClassNames } = this;
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
  let fileChangeEvent;

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
      "< 사이즈 1820x1000 >"
    ],
    memo: "시안을 업로드한 뒤 설명을 적어주세요!",
    placeholder: "이곳을 클릭하여 시안에 대한 설명을 적어주세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    fileActive: "파일 업로드 됨",
    image: MiniRequestJs.binaryPath + "/" + "collage.jpg",
  };

  fileChangeEvent = function (e) {
    const self = this;
    const mother = this.parentElement;
    const grandMother = mother.parentElement;
    const [ text ] = [ ...mother.children ];
    const textAreaBack = grandMother.nextElementSibling.children[0].children[0];
    const textArea = textAreaBack.children[0].children[0];
    if (this.files.length !== 0) {
      mother.style.background = pointColor;
      text.style.color = colorChip.white;
      text.textContent = contents.fileActive;
      textAreaBack.style.background = colorChip.white;
      textArea.style.color = colorChip.black;
      textArea.setAttribute("placeholder", contents.placeholder);
      this.setAttribute("toggle", "on");
      textArea.focus();
    } else {
      mother.style.background = colorChip.gray2;
      text.style.color = colorChip.deactive;
      text.textContent = contents.file;
      textAreaBack.style.background = colorChip.gray2;
      textArea.style.color = colorChip.deactive;
      textArea.setAttribute("placeholder", contents.memo);
      this.setAttribute("toggle", "off");
    }
  }

  whiteBlock = createNode({
    mother,
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
    event: {
      click: function (e) {
        this.querySelector("input").click();
      },
      dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
      drop: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.querySelector("input").files = e.dataTransfer.files;
        fileChangeEvent.call(this.querySelector("input"), e);
      }
    },
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
      cursor: "pointer",
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
      },
      {
        mode: "input",
        class: [ fileInputClassNames.collage ],
        event: {
          change: fileChangeEvent,
        },
        attribute: [
          { index: String(index) },
          { type: "file" },
          { name: fileInputClassNames.collage },
          { accept: "image/*" },
          { multiple: "true" },
          { cancel: JSON.stringify([]) },
          { toggle: "off" },
        ],
        style: {
          position: "absolute",
          display: "none",
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
          background: colorChip.gray2,
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
    mode: "textarea",
    class: [ fileInputClassNames.collage ],
    attribute: {
      placeholder: contents.memo,
      index: String(index),
    },
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      verticalAlign: "top",
      fontSize: String(blockFactorSize) + ea,
      fontWeight: String(blockFactorWeight),
      color: colorChip.deactive,
      lineHeight: String(blockFactorLineHeight),
      border: String(0),
      outline: String(0),
      background: "transparent",
      minHeight: String(whiteBlockMinHeight) + ea,
    },
  });

}

MiniRequestJs.prototype.insertReferenceBox = function (mother, index) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, pointColor, fileInputClassNames } = this;
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
  let fileChangeEvent;

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
      "< 사이즈 1000x667 >"
    ],
    memo: "사진 4칸을 모두 업로드한 뒤 설명을 적어주세요!",
    placeholder: "이곳을 클릭하여 참고 사진 관련 설명을 남겨주세요!",
    file: "파일 업로드...",
    fileActive: "파일 업로드 됨",
    images: [
      MiniRequestJs.binaryPath + "/" + "reference0.jpg",
      MiniRequestJs.binaryPath + "/" + "reference1.jpg",
      MiniRequestJs.binaryPath + "/" + "reference2.jpg",
      MiniRequestJs.binaryPath + "/" + "reference3.jpg",
    ]
  };

  fileChangeEvent = function (e) {
    const self = this;
    const inputTargets = document.querySelectorAll('.' + fileInputClassNames.referenceInput);
    const mother = this.parentElement;
    const grandMother = mother.parentElement.parentElement;
    const [ text ] = [ ...mother.children ];
    const textAreaBack = grandMother.nextElementSibling.children[0].children[0];
    const textArea = textAreaBack.children[0].children[0];
    let boo;

    if (this.files.length !== 0) {
      mother.style.background = pointColor;
      text.style.color = colorChip.white;
      text.textContent = contents.fileActive;
      this.setAttribute("toggle", "on");
    } else {
      mother.style.background = colorChip.gray2;
      text.style.color = colorChip.deactive;
      text.textContent = contents.file;
      this.setAttribute("toggle", "off");
    }

    boo = true;
    for (let input of inputTargets) {
      if (input.files.length === 0) {
        boo = false;
      }
    }

    if (boo) {
      textAreaBack.style.background = colorChip.white;
      textArea.style.color = colorChip.black;
      textArea.setAttribute("placeholder", contents.placeholder);
      textArea.focus();
    } else {
      textAreaBack.style.background = colorChip.gray2;
      textArea.style.color = colorChip.deactive;
      textArea.setAttribute("placeholder", contents.memo);
    }

  }

  whiteBlock = createNode({
    mother,
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
        event: {
          click: function (e) {
            this.querySelector("input").click();
          },
          dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
          drop: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector("input").files = e.dataTransfer.files;
            fileChangeEvent.call(this.querySelector("input"), e);
          }
        },
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
          cursor: "pointer",
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
          },
          {
            mode: "input",
            class: [ fileInputClassNames.reference, fileInputClassNames.referenceInput, fileInputClassNames.referenceInputs[0] ],
            event: {
              change: fileChangeEvent,
            },
            attribute: [
              { index: String(index) },
              { type: "file" },
              { name: fileInputClassNames.referenceInputs[0] },
              { accept: "image/*" },
              { multiple: "true" },
              { cancel: JSON.stringify([]) },
              { toggle: "off" },
            ],
            style: {
              position: "absolute",
              display: "none",
            }
          }
        ]
      },
      {
        event: {
          click: function (e) {
            this.querySelector("input").click();
          },
          dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
          drop: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector("input").files = e.dataTransfer.files;
            fileChangeEvent.call(this.querySelector("input"), e);
          }
        },
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
          cursor: "pointer",
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
          },
          {
            mode: "input",
            class: [ fileInputClassNames.reference, fileInputClassNames.referenceInput, fileInputClassNames.referenceInputs[1] ],
            event: {
              change: fileChangeEvent,
            },
            attribute: [
              { index: String(index) },
              { type: "file" },
              { name: fileInputClassNames.referenceInputs[1] },
              { accept: "image/*" },
              { multiple: "true" },
              { cancel: JSON.stringify([]) },
              { toggle: "off" },
            ],
            style: {
              position: "absolute",
              display: "none",
            }
          }
        ]
      },
      {
        event: {
          click: function (e) {
            this.querySelector("input").click();
          },
          dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
          drop: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector("input").files = e.dataTransfer.files;
            fileChangeEvent.call(this.querySelector("input"), e);
          }
        },
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
          cursor: "pointer",
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
          },
          {
            mode: "input",
            class: [ fileInputClassNames.reference, fileInputClassNames.referenceInput, fileInputClassNames.referenceInputs[2] ],
            event: {
              change: fileChangeEvent,
            },
            attribute: [
              { index: String(index) },
              { type: "file" },
              { name: fileInputClassNames.referenceInputs[2] },
              { accept: "image/*" },
              { multiple: "true" },
              { cancel: JSON.stringify([]) },
              { toggle: "off" },
            ],
            style: {
              position: "absolute",
              display: "none",
            }
          }
        ]
      },
      {
        event: {
          click: function (e) {
            this.querySelector("input").click();
          },
          dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
          drop: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector("input").files = e.dataTransfer.files;
            fileChangeEvent.call(this.querySelector("input"), e);
          }
        },
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
          cursor: "pointer",
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
          },
          {
            mode: "input",
            class: [ fileInputClassNames.reference, fileInputClassNames.referenceInput, fileInputClassNames.referenceInputs[3] ],
            event: {
              change: fileChangeEvent,
            },
            attribute: [
              { index: String(index) },
              { type: "file" },
              { name: fileInputClassNames.referenceInputs[3] },
              { accept: "image/*" },
              { multiple: "true" },
              { cancel: JSON.stringify([]) },
              { toggle: "off" },
            ],
            style: {
              position: "absolute",
              display: "none",
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
          background: colorChip.gray2,
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
    mode: "textarea",
    class: [ fileInputClassNames.reference ],
    attribute: {
      placeholder: contents.memo,
      index: String(index),
    },
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      verticalAlign: "top",
      fontSize: String(blockFactorSize) + ea,
      fontWeight: String(blockFactorWeight),
      color: colorChip.deactive,
      lineHeight: String(blockFactorLineHeight),
      border: String(0),
      outline: String(0),
      background: "transparent",
      minHeight: String(whiteBlockMinHeight) + ea,

    },
  });

}

MiniRequestJs.prototype.insertListBox = function (mother, index) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, downloadFile, ajaxJson, ajaxForm, autoComma, cleanChildren, equalJson } = GeneralJs;
  const { client, ea, media, osException, pointColor, fileInputClassNames } = this;
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
  let fileChangeEvent;
  let matrixTarget;
  let num;
  let tableBlock;
  let matrixWidth;
  let matrixType;
  let image;
  let tableColumnHeight, tableValueHeight;
  let tableColumnWeight, tableValueWeight;
  let tableTextTop, tableSize;
  let matrix;
  let loadMatrix;

  loadMatrix = async () => {};

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

  tableColumnHeight = <%% 40, 40, 40, 40, 40 %%>;
  tableValueHeight = <%% 100, 100, 100, 100, 100 %%>;

  tableColumnWeight = <%% 700, 700, 700, 700, 700 %%>;
  tableValueWeight = <%% 400, 400, 400, 400, 400 %%>;

  tableTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  tableSize = <%% 14, 14, 14, 14, 3 %%>;

  matrixWidth = [
    100, 100, 100, 100, 100, 100, 150, 100, 180, 100
  ];
  matrixType = [
    "image", "string", "number", "money", "money", "money", "string", "string", "link", "string"
  ];

  contents = {
    title: "제품 리스트 업로드",
    info: [
      "< 샘플 파일 다운로드 >",
      "< 파일 업로드 >"
    ],
    memo: "이곳을 클릭하여\n리스트 파일을 다운로드 하세요!",
    file: "클릭 또는 드래그로\n파일 업로드...",
    fileActive: "파일 업로드 됨",
    sample: "https://" + FILEHOST + "/photo/sample/listSample.xlsx",
  };

  fileChangeEvent = async function (e) {
    try {
      const self = this;
      const mother = this.parentElement;
      const [ text ] = [ ...mother.children ];
      if (this.files.length !== 0) {
        if (!/xlsx$/gi.test(this.files[0].name)) {
          window.alert("샘플 엑셀 파일을 이용하여 올려주세요!");
          this.setAttribute("toggle", "off");
        } else {
          let formData, matrix, loading;
          let copied;
          let num;
          let image;

          loading = instance.mother.grayLoading();

          try {

            formData = new FormData();
            formData.enctype = "multipart/form-data";
            formData.append("sheetsName", "sample");
            formData.append("upload", this.files[0]);
            matrix = JSON.parse(await ajaxForm(formData, BRIDGEHOST + "/excelToMatrix"));

            if (Array.isArray(matrix)) {
              if (matrix.every((arr) => { return Array.isArray(arr); })) {
                if (matrix.every((arr) => { return arr.length === 9 })) {

                  matrix = matrix.filter((arr) => { return arr[0] !== null });
                  matrix = matrix.slice(1);

                  num = 0;
                  for (let arr of matrix) {
                    for (let i = 0; i < arr.length; i++) {
                      if (typeof arr[i] === "string") {
                        arr[i] = arr[i].trim();
                      } else if (arr[i] === null || arr[i] === undefined) {
                        arr[i] = "";
                      }
                    }

                    if (num === 0) {
                      arr.unshift("사진");
                    } else {
                      ({ image } = await ajaxJson({ url: window.encodeURIComponent(arr[7]) }, BACKHOST + "/getOpenGraph"));
                      arr.unshift(image);
                    }

                    num++;
                  }

                  copied = equalJson(JSON.stringify(matrix));
                  for (let arr of copied) {
                    arr[0] = window.encodeURIComponent(arr[0]);
                    arr[8] = window.encodeURIComponent(arr[8]);
                  }
                  instance.matrix[index] = copied;
                  loadMatrix(matrix).catch((err) => { window.alert("엑셀 파일 로드중 오류가 발생하였습니다!") })

                  mother.style.background = pointColor;
                  text.style.color = colorChip.white;
                  text.textContent = contents.fileActive;
                  this.setAttribute("toggle", "on");
                } else {
                  throw new Error("");
                }
              } else {
                throw new Error("");
              }
            } else {
              throw new Error("");
            }
          } catch (e) {
            window.alert("샘플 엑셀 파일을 이용하여 올려주세요!");
            mother.style.background = colorChip.gray2;
            text.style.color = colorChip.deactive;
            text.textContent = contents.file;
            this.setAttribute("toggle", "off");
          }

          loading.remove();
        }
      } else {
        mother.style.background = colorChip.gray2;
        text.style.color = colorChip.deactive;
        text.textContent = contents.file;
        this.setAttribute("toggle", "off");
      }
    } catch (e) {
      window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
    }
  }

  whiteBlock = createNode({
    mother,
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
    event: {
      click: function (e) {
        downloadFile(contents.sample).catch((err) => { window.alert("오류가 발생하였습니다! 다시 시도해주세요!"); });
      }
    },
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
      cursor: "pointer",
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
    event: {
      click: function (e) {
        this.querySelector("input").click();
      },
      dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
      dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
      drop: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.querySelector("input").files = e.dataTransfer.files;
        fileChangeEvent.call(this.querySelector("input"), e);
      }
    },
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
      cursor: "pointer",
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
      },
      {
        mode: "input",
        class: [ fileInputClassNames.list ],
        event: {
          change: fileChangeEvent,
        },
        attribute: [
          { index: String(index) },
          { type: "file" },
          { name: fileInputClassNames.list },
          { cancel: JSON.stringify([]) },
          { toggle: "off" },
        ],
        style: {
          position: "absolute",
          display: "none",
        }
      }
    ]
  });

  matrixTarget = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(0, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    },
    children: [
      {
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
      }
    ]
  }).firstChild.firstChild;

  loadMatrix = async function (matrix) {
    try {
      cleanChildren(matrixTarget);

      num = 0;
      for (let arr of matrix) {

        tableBlock = createNode({
          mother: matrixTarget,
          style: {
            display: "block",
            position: "relative",
            height: String(num === 0 ? tableColumnHeight : tableValueHeight) + ea,
            width: String(100) + '%',
            overflow: "hidden",
          }
        });

        for (let i = 0; i < arr.length; i++) {

          if (i === 0) {
            if (num === 0) {
              createNode({
                mother: tableBlock,
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(matrixWidth[i]) + ea,
                  height: String(100) + '%',
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  verticalAlign: "top",
                  overflow: "scroll",
                },
                children: [
                  {
                    text: num !== 0 ? (matrixType[i] === "money" ? autoComma(arr[i]) + "원" : String(arr[i])) : String(arr[i]),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(tableTextTop) + ea,
                      fontSize: String(tableSize) + ea,
                      fontWeight: String(num === 0 ? tableColumnWeight : tableValueWeight),
                      color: colorChip.black,
                      verticalAlign: "top",
                      cursor: matrixType[i] === "link" ? "pointer" : "",
                    }
                  }
                ]
              });
            } else {
              createNode({
                mother: tableBlock,
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(matrixWidth[i]) + ea,
                  height: String(100) + '%',
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  verticalAlign: "top",
                  overflow: "scroll",
                },
                children: [
                  {
                    mode: "img",
                    attribute: {
                      src: arr[i],
                      referrerpolicy: "no-referrer",
                    },
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(matrixWidth[i]) + ea,
                      verticalAlign: "top",
                    }
                  }
                ]
              });
            }
          } else {
            createNode({
              mother: tableBlock,
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(matrixWidth[i]) + ea,
                height: String(100) + '%',
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                verticalAlign: "top",
                overflow: "scroll",
              },
              children: [
                {
                  text: num !== 0 ? (matrixType[i] === "money" ? autoComma(arr[i]) + "원" : String(arr[i])) : String(arr[i]),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(tableTextTop) + ea,
                    fontSize: String(tableSize) + ea,
                    fontWeight: String(num === 0 ? tableColumnWeight : tableValueWeight),
                    color: colorChip.black,
                    verticalAlign: "top",
                    cursor: matrixType[i] === "link" ? "pointer" : "",
                  }
                }
              ]
            });
          }
        }
        num++;
      }
    } catch (e) {
      window.alert("오류가 발생하였습니다! 새로고침 해주세요!");
    }
  }
  loadMatrix([]).catch((err) => { console.log(err); })

}

MiniRequestJs.prototype.insertFinalBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, equalJson, ajaxForm } = GeneralJs;
  const { client, ea, media, osException, pointColor, fileInputClassNames, user } = this;
  const { request: { space: { targets } } } = user;
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
      background: colorChip.gray2,
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
        event: {
          click: async function (e) {
            try {
              const { concept, collage, reference } = fileInputClassNames;
              const conceptInputs = [ ...document.querySelectorAll('.' + concept) ];
              const collageInputs = [ ...document.querySelectorAll('.' + collage) ];
              const referenceInputs = [ ...document.querySelectorAll('.' + reference) ];
              let spaceMatrix;
              let tempObj;
              let index;
              let formData;
              let key;
              let tempArr;
              let loading;
              let response;

              if (instance.matrix.some((arr) => { return arr === 0 })) {
                throw new Error("공간별로 제품 리스트를 모두 올려주세요!");
              }
              if (instance.matrix.length !== targets) {
                throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
              }
              if (conceptInputs.length !== targets * 2) {
                throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
              }
              if (collageInputs.length !== targets * 2) {
                throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
              }
              if (referenceInputs.length !== targets * 5) {
                throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
              }

              spaceMatrix = [];
              for (let i = 0; i < targets; i++) {
                tempObj = {};
                tempObj.concept = [];
                for (let dom of conceptInputs) {
                  index = Number(dom.getAttribute("index"));
                  if (Number.isNaN(index)) {
                    throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
                  }
                  if (index === i) {
                    tempObj.concept.push(dom);
                  }
                }
                tempObj.collage = [];
                for (let dom of collageInputs) {
                  index = Number(dom.getAttribute("index"));
                  if (Number.isNaN(index)) {
                    throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
                  }
                  if (index === i) {
                    tempObj.collage.push(dom);
                  }
                }
                tempObj.reference = [];
                for (let dom of referenceInputs) {
                  index = Number(dom.getAttribute("index"));
                  if (Number.isNaN(index)) {
                    throw new Error("오류가 발생하였습니다! 새로고침 하여 주세요!");
                  }
                  if (index === i) {
                    tempObj.reference.push(dom);
                  }
                }
                tempObj.matrix = equalJson(JSON.stringify(instance.matrix[i]));
                tempObj.matrix.shift();
                spaceMatrix.push(tempObj);
              }

              for (let obj of spaceMatrix) {

                for (let dom of obj.concept) {
                  if (/INPUT/gi.test(dom.nodeName)) {
                    if (dom.files.length === 0) {
                      throw new Error("컨셉 시안을 올려주세요!");
                    }
                  } else {
                    if (dom.value === '') {
                      throw new Error("컨셉 시안의 설명을 적어주세요!");
                    }
                  }
                }

                for (let dom of obj.collage) {
                  if (/INPUT/gi.test(dom.nodeName)) {
                    if (dom.files.length === 0) {
                      throw new Error("콜라주 시안을 올려주세요!");
                    }
                  } else {
                    if (dom.value === '') {
                      throw new Error("콜라주 시안의 설명을 적어주세요!");
                    }
                  }
                }

                for (let dom of obj.reference) {
                  if (/INPUT/gi.test(dom.nodeName)) {
                    if (dom.files.length === 0) {
                      throw new Error("참고 사진 4장 사진을 모두 올려주세요!");
                    }
                  } else {
                    if (dom.value === '') {
                      throw new Error("참고 사진의 설명을 적어주세요!");
                    }
                  }
                }

              }

              loading = instance.mother.grayLoading();

              formData = new FormData();
              formData.enctype = "multipart/form-data";
              formData.append("useid", instance.user.useid);
              formData.append("indexLength", String(spaceMatrix.length));

              for (let i = 0; i < spaceMatrix.length; i++) {

                key = "concept_file_" + String(i);
                formData.append(key, spaceMatrix[i].concept.find((dom) => { return /INPUT/gi.test(dom.nodeName) }).files[0]);

                key = "concept_description_" + String(i);
                formData.append(key, spaceMatrix[i].concept.find((dom) => { return /TEXTAREA/gi.test(dom.nodeName) }).value);

                key = "collage_file_" + String(i);
                formData.append(key, spaceMatrix[i].collage.find((dom) => { return /INPUT/gi.test(dom.nodeName) }).files[0]);

                key = "collage_description_" + String(i);
                formData.append(key, spaceMatrix[i].collage.find((dom) => { return /TEXTAREA/gi.test(dom.nodeName) }).value);

                tempArr = spaceMatrix[i].reference.filter((dom) => { return /INPUT/gi.test(dom.nodeName) });
                key = "reference_file0_" + String(i);
                formData.append(key, tempArr[0].files[0]);
                key = "reference_file1_" + String(i);
                formData.append(key, tempArr[1].files[0]);
                key = "reference_file2_" + String(i);
                formData.append(key, tempArr[2].files[0]);
                key = "reference_file3_" + String(i);
                formData.append(key, tempArr[3].files[0]);
                key = "reference_description_" + String(i);
                formData.append(key, spaceMatrix[i].reference.find((dom) => { return /TEXTAREA/gi.test(dom.nodeName) }).value);

                key = "list_matrix_" + String(i);
                formData.append(key, JSON.stringify(spaceMatrix[i].matrix));

              }

              response = equalJson(await ajaxForm(formData, BRIDGEHOST + "/userConfirm"));

              if (response.message === "success") {
                loading.remove();
                window.alert("홈리에종에 컨펌 요청을 보냈습니다!");
              } else {
                throw new Error("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }

            } catch (e) {
              window.alert(e.message);
            }
          }
        },
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
          cursor: "pointer",
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

    users = await ajaxJson({ whereQuery: { useid: getObj.useid } }, BACKHOST + "/getUsers", { equal: true });
    if (users.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    user = users[0];
    this.user = user;
    this.pointColor = "darkslategray";
    this.fileInputClassNames = {
      concept: "fileInputClassNames_concept",
      collage: "fileInputClassNames_collage",
      reference: "fileInputClassNames_reference",
      referenceInput: "fileInputClassNames_referenceInput",
      referenceInputs: [
        "fileInputClassNames_reference0",
        "fileInputClassNames_reference1",
        "fileInputClassNames_reference2",
        "fileInputClassNames_reference3",
      ],
      list: "fileInputClassNames_list",
    }
    this.matrix = [];

    document.head.insertAdjacentHTML("beforeend", `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`);
    document.head.insertAdjacentHTML("beforeend", `<meta name="referrer" content="no-referrer" />`);

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
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertMemoBox();
          instance.insertProposalBoxes();
          instance.insertFinalBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    this.mother.backgroundGray.style.background = this.pointColor;
    this.mother.backgroundImageBox.style.backgroundImage = "";
    this.mother.backgroundImageBox.style.background = this.pointColor;

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
