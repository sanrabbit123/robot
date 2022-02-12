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
      "return ('홈리에종 서비스 큐레이션 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 큐레이션 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "clientConsulting",
  "route": [
    "consulting",
    "CC"
  ]
} %/%/g

const ClientConsultingJs = function () {
  this.mother = new GeneralJs();
}

ClientConsultingJs.binaryPath = "/middle/consulting";

ClientConsultingJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, dateToString, stringToDate } = GeneralJs;
  const { ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const inputClassName = "consultingInput";
  let whiteBlock;
  let style;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let barWidth, barLeft;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize, initWordingHeight, initWordingWordSpacing;
  let indexNumberBottom;
  let initWording0, initWording1;
  let mobileRightBoxHeight;
  let rightBoxPaddingTop;
  let blockMarginBottom;
  let circleRadius;
  let thisBlock;
  let mainSize;
  let mainWeight;
  let circleTop;
  let circleBetween;
  let grayHeight;
  let grayTop;
  let grayInputTop;
  let moduleHeight;
  let leftGrayType0, leftGrayType1, leftGrayType2, leftGrayType3;
  let widthGrayType0, widthGrayType1, widthGrayType2, widthGrayType3;
  let inputSize, inputWeight;
  let grayBigHeight;
  let secondPointLeft;
  let addressWidth;
  let addressSize, addressWeight;
  let addressTop;
  let inputIndent;
  let grayTextAreaTop;
  let blank;
  let marginRatio;
  let initWordingLineHeight;
  let leftCheck0, leftCheck1;
  let checkboxWidth;
  let checkboxTop;
  let checkboxBetween;
  let checkboxWeight;
  let grayLineWidth;
  let grayLineTop;
  let grayLineBlockTop;
  let grayLineBlockHeight;
  let grayLineBlockWidth0, grayLineBlockWidth1, grayLineBlockWidth2;
  let grayLineBlockFontSize, grayLineBlockFontWeight;
  let grayLineBlockFontTop;
  let grayLineBlockFontRight0, grayLineBlockFontRight1, grayLineBlockFontRight2, grayLineBlockFontRight3;
  let spaceStatusLeft0, spaceStatusLeft1;
  let spaceStatusWeight, spaceStatusBarWeight;
  let spaceStatusBoxLeft0, spaceStatusBoxLeft1, spaceStatusBoxLeft2;
  let spaceStatusBoxTop;
  let spaceStatusBoxFactorSize, spaceStatusBoxFactorWeight, spaceStatusBoxFactorMargin;
  let textareaTop, textareaLeft;
  let checkboxClickEvent0;

  blockHeight = <%% 906, 906, 906, 906, 90 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;

  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 120, 80, 80, 80, 80 %%>;
  barLeft = <%% 190, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 8, 8, 8, 8, -0.6 %%>;
  quoteHeight = <%% 12, 11, 10, 9, 2.5 %%>;
  quoteMarginBottom = <%% (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 6 : 7), 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  mobileRightBoxHeight = 78;

  rightBoxPaddingTop = 136;

  circleRadius = 2.5;
  circleTop = 12;
  circleBetween = 6;

  mainSize = 20;
  mainWeight = 500;
  inputSize = 13;
  inputWeight = 400;
  inputIndent = 10;

  secondPointLeft = 315;

  grayTop = 0;
  grayInputTop = -2;
  grayHeight = 32;
  grayBigHeight = 114;
  grayTextAreaTop = 3;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = 12;

  leftGrayType0 = 101;
  leftGrayType1 = 418;
  leftGrayType2 = 125;
  leftGrayType3 = 481;

  widthGrayType0 = 160;
  widthGrayType1 = 455;
  widthGrayType2 = 748;
  widthGrayType3 = 392;

  addressWidth = 54;
  addressSize = 13;
  addressWeight = 600;
  addressTop = 5;

  leftCheck0 = 439;
  leftCheck1 = 514;
  checkboxWidth = 9;
  checkboxTop = 9;
  checkboxBetween = 8;
  checkboxWeight = 300;

  marginRatio = 1.5;

  grayLineWidth = 772;
  grayLineTop = 12;
  grayLineBlockTop = 7;

  grayLineBlockHeight = 12;
  grayLineBlockWidth0 = 105;
  grayLineBlockWidth1 = 92;
  grayLineBlockWidth2 = 106;

  grayLineBlockFontSize = 14;
  grayLineBlockFontWeight = 400;
  grayLineBlockFontTop = 15;

  grayLineBlockFontRight0 = -37;
  grayLineBlockFontRight1 = -31;
  grayLineBlockFontRight2 = -32;
  grayLineBlockFontRight3 = -45;

  spaceStatusLeft0 = 406;
  spaceStatusLeft1 = 696;
  spaceStatusWeight = 300;
  spaceStatusBarWeight = 200;

  spaceStatusBoxLeft0 = 215;
  spaceStatusBoxLeft1 = 531;
  spaceStatusBoxLeft2 = 780;
  spaceStatusBoxTop = 4;

  spaceStatusBoxFactorSize = 15;
  spaceStatusBoxFactorWeight = 300;
  spaceStatusBoxFactorMargin = 10;

  textareaTop = 10;
  textareaLeft = 15;

  checkboxClickEvent0 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            dom.setAttribute("toggle", "on");
            dom.children[0].style.opacity = String(0);
            dom.children[1].style.opacity = String(1);
            dom.children[2].style.color = colorChip.green;
          } else {
            dom.setAttribute("toggle", "off");
            dom.children[0].style.opacity = String(1);
            dom.children[1].style.opacity = String(0);
            dom.children[2].style.color = colorChip.black;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  blank = "&nbsp;&nbsp;&nbsp;";

  if (media[0]) {
    initWording0 = "홈리에종의 인테리어 프로세스는 일반적인 리모델링 회사 또는 스튜디오와 다릅니다. 시공 견적부터 제시하는 방법과 달리,";
  } else if (media[1]) {
    initWording0 = "홈리에종 프로세스는 리모델링 회사와 다릅니다. 시공부터 제시하는 방법과 달리,";
  } else {
    initWording0 = "홈리에종 프로세스는 리모델링 회사와 다릅니다. 시공부터 제시하는 방법과 달리,";
  }

  if (media[0]) {
    initWording1 = "담당 디자이너가 고객님의 전체 가용 예산을 시공 / 제작가구 / 구매가구 / 패브릭 소품 등을 위해 적절히 분배하여 제안합니다.";
  } else if (media[1]) {
    initWording1 = "담당 디자이너가 고객님의 전체 가용 예산을 현장 조건에 맞게 적절히 분배하여 스타일링을 진행합니다.";
  } else {
    initWording1 = "담당 디자이너가 고객님의 예산을 현장에 맞게 분배하여 스타일링을 진행합니다.";
  }



  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
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
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(29) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    }
  });

  //main title
  createNode({
    mother: leftBox,
    text: desktop ? ((media[0] || media[4]) ? "디자이너와의 상담을 위해" : "홈리에종의") : "홈리에종 프로세스와",
    style: {
      position: "absolute",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (isMac() || mobile ? 0 : 4)) + ea) : String(9) + ea,
      left: String(titleLeft) + ea,
      color: colorChip.black,
      width: desktop ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
    }
  });

  if (media[1] || media[2] || media[3]) {
    createNode({
      mother: leftBox,
      text: "진행 프로세스와",
      style: {
        position: "absolute",
        fontSize: String(titleFont) + ea,
        fontWeight: String(titleFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        top: String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.45)) + (isMac() || mobile ? 0 : 4)) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.black,
      }
    });
  }

  createNode({
    mother: leftBox,
    text: "기입해주세요!",
    style: {
      position: "absolute",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (titleFont * (media[0] ? 1.45 : 1.45) * (media[0] ? 1 : 2)) + (isMac() || mobile ? 0 : 4)) + ea) : String(17) + ea,
      left: String(titleLeft) + ea,
      width: desktop ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      color: colorChip.black,
    }
  });

  if (desktop) {

    if (media[0]) {
      createNode({
        mother: leftBox,
        style: {
          position: "absolute",
          borderBottom: "1px solid " + colorChip.gray3,
          top: String(titleFont * (63 / 30)) + ea,
          left: String(barLeft) + ea,
          width: String(barWidth) + ea,
        }
      });
    }

    createNode({
      mother: leftBox,
      text: String(0),
      style: {
        position: "absolute",
        fontSize: String(indexFont) + ea,
        fontWeight: String(indexFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        bottom: String(indexNumberBottom) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.gray4,
      }
    });

  }

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String((margin * 2) + rightBoxPaddingTop) + ea + ")" : String(mobileRightBoxHeight) + ea,
      paddingTop: desktop ? String(rightBoxPaddingTop) + ea : "",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: rightBox,
    mode: "svg",
    source: svgMaker.doubleQuote(colorChip.green),
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
    text: initWording0,
    style: {
      position: "absolute",
      top: String(desktop ? quoteTop + quoteHeight + quoteMarginBottom : 3.7) + ea,
      left: String(desktop ? 0 : 13) + ea,
      width: String(desktop ? 100 : 74) + '%',
      height: desktop ? String(initWordingHeight) + ea : "",
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      wordSpacing: String(initWordingWordSpacing) + "px",
      lineHeight: desktop ? "" : String(1.6),
      textAlign: desktop ? "" : "center",
    }
  });

  createNode({
    mother: rightBox,
    text: initWording1,
    style: {
      position: "absolute",
      top: String(desktop ? quoteTop + quoteHeight + quoteMarginBottom + initWordingSize + initWordingLineHeight : 15.5) + ea,
      left: String(desktop ? 0 : 11) + ea,
      width: String(desktop ? 100 : 78) + '%',
      height: String(initWordingHeight) + ea,
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      wordSpacing: String(initWordingWordSpacing) + "px",
      lineHeight: desktop ? "" : String(1.6),
      textAlign: desktop ? "" : "center",
      color: colorChip.black,
    }
  });

  // block start

  // 1
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "성함",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "성함",
          property: "name",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          position: "absolute",
          left: String(secondPointLeft) + ea,
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "주소",
        style: {
          position: "absolute",
          left: String(secondPointLeft + (circleRadius * 2) + circleBetween) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(addressWidth) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(3) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "검색",
            style: {
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(addressSize) + ea,
              fontWeight: String(addressWeight),
              color: colorChip.white,
              position: "relative",
              top: String(addressTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType3) + ea,
          width: String(widthGrayType3) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "인테리어 받을 곳의 주소",
          property: "address0",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType3) + ea,
          width: String(widthGrayType3) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });

  // 2
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "연락처",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "010-0000-0000",
          property: "phone",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "상세 주소",
          property: "address1",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });

  // 3
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          position: "absolute",
          left: String(secondPointLeft) + ea,
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "구성원",
        style: {
          position: "absolute",
          left: String(secondPointLeft + (circleRadius * 2) + circleBetween) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "가족 구성원 (예) 부부, 딸 0명, 아들 0명",
          property: "family",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });

  // 4
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          position: "absolute",
          left: String(secondPointLeft) + ea,
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "이메일",
        style: {
          position: "absolute",
          left: String(secondPointLeft + (circleRadius * 2) + circleBetween) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "example@home-liaison.com",
          property: "email",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType1) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });

  // 5 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  // 6
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "평수",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "00평 (분양 평수)",
          property: "pyeong",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          position: "absolute",
          left: String(secondPointLeft) + ea,
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "계약 형태",
        style: {
          position: "absolute",
          left: String(secondPointLeft + (circleRadius * 2) + circleBetween) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "on",
          property: "contract",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck0) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            text: "자가",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(0) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.green,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "off",
          property: "contract",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck1) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            text: "전월세",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(0) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.black,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
    ]
  });

  // 7
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "입주일",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: dateToString(new Date()),
          property: "movein",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          position: "absolute",
          left: String(secondPointLeft) + ea,
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "거주 여부",
        style: {
          position: "absolute",
          left: String(secondPointLeft + (circleRadius * 2) + circleBetween) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "on",
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck0) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            text: "이사",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(0) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.green,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "off",
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck1) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            text: "거주중",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(0) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.black,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
    ]
  });

  // 8 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  // 9
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "예산",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(grayLineWidth) + ea,
          height: String(grayLineTop) + ea,
          borderBottom: "1px solid " + colorChip.gray4
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth0) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "500만원 이하",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight0) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "1,000만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight1) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "1,500만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight1) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "2,000만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight2) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "2,500만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight2) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "3,000만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight2) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth1) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "4,000만원",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight2) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          top: String(grayLineBlockTop) + ea,
          color: colorChip.black,
          verticalAlign: "top",
          width: String(grayLineBlockWidth2) + ea,
          borderRight: "1px solid " + colorChip.gray4,
          height: String(grayLineBlockHeight) + ea,
        },
        children: [
          {
            text: "5,000만원 이상",
            style: {
              position: "absolute",
              fontSize: String(grayLineBlockFontSize) + ea,
              fontWeight: String(grayLineBlockFontWeight),
              color: colorChip.deactive,
              right: String(grayLineBlockFontRight3) + ea,
              top: String(grayLineBlockFontTop) + ea,
            }
          }
        ]
      },
    ]
  });

  // 10 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  // 11
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "공간 상태",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        text: "방 개수" + blank + "<b%|%b>",
        style: {
          position: "absolute",
          left: String(leftGrayType2) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(spaceStatusWeight),
          color: colorChip.black,
          verticalAlign: "top",
        },
        bold: {
          fontWeight: String(spaceStatusBarWeight),
          color: colorChip.green,
        }
      },
      {
        style: {
          position: "absolute",
          left: String(spaceStatusBoxLeft0) + ea,
          top: String(spaceStatusBoxTop) + ea,
        },
        children: [
          {
            text: "1개",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "2개",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "3개",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "4개 이상",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
            }
          },
        ]
      },
      {
        text: "화장실 개수" + blank + "<b%|%b>",
        style: {
          position: "absolute",
          left: String(spaceStatusLeft0) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(spaceStatusWeight),
          color: colorChip.black,
          verticalAlign: "top",
        },
        bold: {
          fontWeight: String(spaceStatusBarWeight),
          color: colorChip.green,
        }
      },
      {
        style: {
          position: "absolute",
          left: String(spaceStatusBoxLeft1) + ea,
          top: String(spaceStatusBoxTop) + ea,
        },
        children: [
          {
            text: "1개",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "2개",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "3개 이상",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          }
        ]
      },
      {
        text: "발코니" + blank + "<b%|%b>",
        style: {
          position: "absolute",
          left: String(spaceStatusLeft1) + ea,
          top: String(0) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(spaceStatusWeight),
          color: colorChip.black,
          verticalAlign: "top",
        },
        bold: {
          fontWeight: String(spaceStatusBarWeight),
          color: colorChip.green,
        }
      },
      {
        style: {
          position: "absolute",
          left: String(spaceStatusBoxLeft2) + ea,
          top: String(spaceStatusBoxTop) + ea,
        },
        children: [
          {
            text: "확장 없음",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          },
          {
            text: "확장",
            style: {
              display: "inline-block",
              fontSize: String(spaceStatusBoxFactorSize) + ea,
              fontWeight: String(spaceStatusBoxFactorWeight),
              color: colorChip.deactive,
              marginRight: String(spaceStatusBoxFactorMargin) + ea,
            }
          }
        ]
      },
    ]
  });

  // 12
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: instance.mother.returnRound(circleRadius, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "요청 사항",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(0),
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTextAreaTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType2) + ea,
          height: String(grayBigHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "textarea",
        class: [ inputClassName ],
        attribute: {
          placeholder: "선호하는 스타일 + 공간의 특이 사항을 적어주세요!\n(예) 모던 프렌치 + 코지한 홈스타일링을 원해요.\n(예) 팬트리가 있어요.\n(예) 복층 공간입니다.",
        },
        style: {
          position: "absolute",
          top: String(grayTextAreaTop + textareaTop) + ea,
          left: String(leftGrayType2 + textareaLeft) + ea,
          width: String(widthGrayType2 - (textareaLeft * 2)) + ea,
          height: String(grayBigHeight - (textareaTop * 1)) + ea,
          fontSize: String(grayLineBlockFontSize) + ea,
          fontWeight: String(grayLineBlockFontWeight),
          border: String(0),
          background: "transparent",
          outline: String(0),
          overflow: "scroll",
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

}

ClientConsultingJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let whiteBlock;
  let style;
  let blockHeight, blockMarginBottom;
  let designerButtonTong;
  let designerButtonBar;
  let designerButtonBarHead;
  let designerButton;
  let designerButtonText;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let headWidth, headVisual;
  let informationArea;
  let wordSpacing;
  let finalBottom;
  let grayTong, grayTextScroll, grayTextTong;
  let grayHeight, grayTop, grayTextTop, grayTextLeft, grayTextSize;
  let buttonOff, buttonOn;
  let buttonTongHeight, grayButtonHeight;
  let margin, paddingTop;

  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 156, 156, 156, 126, 28 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.3 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (isMac() ? 0 : 1);
  }

  headWidth = <%% 10, 10, 10, 10, 2 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  finalBottom = <%% paddingTop + 6, paddingTop + 6, paddingTop + 6, paddingTop + 6, 8 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 5, 5, 5, 5, 0 %%>;
  grayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  grayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  grayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  grayButtonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  buttonOn = {};

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: String(blockHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
    }
  });

  [ grayTong, grayTextScroll, grayTextTong ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 15 : 2.5) + ea,
        height: String(grayHeight) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(grayTextTop) + ea,
        left: String(grayTextLeft) + ea,
        width: withOut(grayTextLeft * 2, ea),
        height: withOut(grayTextTop * 2, ea),
        overflow: "scroll",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: "auto",
        fontSize: String(grayTextSize) + ea,
        fontWeight: String(300),
        lineHeight: String(1.6),
      }
    },
  ]);

  [ buttonTong ] = createNodes([
    {
      mother: whiteBlock,
      attribute: [
        { toggle: "on" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (buttonOn.style !== undefined) {
              if (this.getAttribute("toggle") === "on") {
                buttonOn.style.opacity = String(0);
                this.setAttribute("toggle", "off");
              } else {
                buttonOn.style.opacity = String(1);
                this.setAttribute("toggle", "on");
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        height: String(buttonTongHeight) + ea,
        cursor: "pointer",
      }
    },
  ]);

  ajaxJson("/designerProposal_policy").then(function (res) {
    const { policy, button } = res;
    let bTags;

    grayTextTong.insertAdjacentHTML("beforeend", policy);
    bTags = grayTextTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }

    [ buttonOff, buttonOn ] = createNodes([
      {
        mother: buttonTong,
        mode: "svg",
        source: button.off,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
        }
      },
      {
        mother: buttonTong,
        mode: "svg",
        source: button.on,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
          background: colorChip.white,
        }
      },
    ]);

  }).catch(function (err) {
    throw new Error(err);
  });

  createNode({
    mother: whiteBlock,
    style: {
      position: "relative",
      height: String(buttonHeight) + ea,
      textAlign: "center",
      marginTop: desktop ? "" : String(3) + ea,
    },
    children: [
      {
        events: [
          {
            type: "click",
            event: function (e) {
              if (false) {
                window.location.href = window.location.protocol + "//" + window.location.host + "/middle/proposal?proid=" + "p1801_aa01s";
              } else {
                let pass;

                pass = true;
                for (let i in instance.values) {
                  for (let j of instance.values[i]) {
                    if (j.required) {
                      if (j.value === null) {
                        window.alert(j.rewind);
                        GeneralJs.scrollTo(window, j.dom, (instance.naviHeight + 20));
                        pass = false;
                        break;
                      }
                    }
                  }
                  if (!pass) {
                    break;
                  }
                }
                if (pass) {
                  instance.parsingValues();
                }
              }
            }
          }
        ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(buttonWidth) + ea,
          height: String(100) + '%',
          background: colorChip.green,
          borderRadius: String(3) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "신청 계속하기",
            style: {
              position: "absolute",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonTextSize) + ea,
              fontWeight: String(400),
              color: colorChip.white,
              width: String(100) + '%',
              textAlign: "center",
            }
          }
        ]
      }
    ]
  });

  whiteBlock.style.paddingBottom = String(finalBottom) + ea;
  whiteBlock.style.height = "";

}

ClientConsultingJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "clientConsulting",
      client: null,
      base: {
        instance: this,
        binaryPath: ClientConsultingJs.binaryPath,
        subTitle: "",
        secondBackground: false
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPannelBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientConsultingJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ClientConsultingJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
