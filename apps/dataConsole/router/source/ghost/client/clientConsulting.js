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
      "return ('홈리에종 서비스 신청 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 신청 페이지 입니다! | 홈리에종');"
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
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue } = GeneralJs;
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
  let checkboxClickEvent0, checkboxClickEvent1, checkboxClickEvent2, checkboxClickEvent3;
  let budgetTriangleTop, budgetTriangleWidth;
  let spaceTriangleTop, spaceTriangleWidth;
  let addressPromptWidth, addressPromptHeight;
  let mainTop, mobileCheckBoxMainTop;
  let addressButtonEvent;
  let mobileRightBoxLeft;
  let mobileTongPaddingTop;
  let mobileFactorPaddingLeft
  let mobileFactorCheckWidth;
  let mobileFactorCheckTop;
  let mobileFactorBetween, mobileFactorBetween2, mobileFactorBetween3;
  let mobileFactorPaddingBotom;
  let mobileCheckBoxLeft1, mobileCheckBoxLeft2, mobileCheckBoxLeft3, mobileCheckBoxLeft4;
  let grayTextAreaWidth;
  let mobileCheckBoxMainSize;
  let phoneHypenEvent;
  let pyeongNumberEvent;
  let pyeongBlurEvent;
  let pyeongFocusEvent;
  let greenNoticeSize, greenNoticeWeight;
  let greenNoticePaddingTop, greenNoticePaddingBottom, greenNoticePaddingLeft;
  let greenNoticeBottom, greenNoticeBottom2;
  let greenNoticeLineHeight;
  let greenNoticeWidth0, greenNoticeWidth1, greenNoticeWidth2;
  let addressBlurEvent;
  let addressFocusEvent;
  let calendarViewEvent;
  let calendarWidth;
  let calendarTop;
  let livingAlertEvent;
  let livingDownEvent;

  blockHeight = <%% 918, 901, 817, 1026, 264 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.26, 0.26, 0.26, 0.32 %%>;

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

  mobileRightBoxHeight = <%% 78, 78, 78, 78, 78 %%>;

  rightBoxPaddingTop = <%% 136, 126, 116, 108, 25 %%>;
  mobileRightBoxLeft = 7;

  circleRadius = <%% 2.5, 2.5, 2, 2, 0.5 %%>;
  circleTop = <%% 12, 12, 11, 12, 2.9 %%>;
  circleBetween = <%% 6, 6, 5, 5, 1.3 %%>;

  mainSize = <%% 20, 18, 17, 16, 4 %%>;
  mainWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.5 %%>;
  inputSize = <%% 13, 13, 12, 12, 3 %%>;
  inputWeight = <%% 400, 400, 400, 400, 400 %%>;
  inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

  secondPointLeft = <%% 315, 270, 240, 240, 25 %%>;

  grayTop = <%% 0, 0, 0, 0, 0 %%>;
  grayInputTop = <%% (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), -0.2 %%>;
  grayHeight = <%% 32, 32, 31, 31, 7 %%>;
  grayBigHeight = <%% 114, 114, 114, 114, 28 %%>;
  grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
  grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

  leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
  leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
  leftGrayType2 = <%% 125, 112, 98, 98, 15 %%>;
  leftGrayType3 = <%% 481, 422, 370, 129, 30.5 %%>;

  widthGrayType0 = <%% 160, 140, 130, 150, 34 %%>;
  widthGrayType1 = <%% 455, 329, 283, 407, 56.5 %%>;
  widthGrayType2 = <%% 748, 578, 503, 388, 60 %%>;
  widthGrayType3 = <%% 392, 268, 231, 356, 44 %%>;

  addressWidth = <%% 54, 54, 46, 46, 11 %%>;
  addressSize = <%% 13, 13, 12, 12, 3 %%>;
  addressWeight = <%% 600, 600, 600, 600, 600 %%>;
  addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

  leftCheck0 = <%% 439, 380, 338, 96, 22.8 %%>;
  leftCheck1 = <%% 514, 448, 400, 150, 36.5 %%>;
  checkboxWidth = <%% 9, 9, 9, 8, 2 %%>;
  checkboxTop = <%% (isMac() ? 9 : 10), (isMac() ? 9 : 9), (isMac() ? 8 : 8), (isMac() ? 8 : 9), 2.4 %%>;
  checkboxBetween = <%% 8, 8, 8, 6, 1.5 %%>;
  checkboxWeight = <%% 300, 300, 300, 300, 300 %%>;

  marginRatio = <%% 1.6, 1.55, 1.45, 1.1, 1.1 %%>;

  grayLineWidth = <%% 772, 600, 523, 523, 523 %%>;
  grayLineTop = <%% 12, 12, 12, 12, 12 %%>;
  grayLineBlockTop = <%% 7, 7, 7, 7, 7 %%>;

  grayLineBlockHeight = <%% 12, 12, 12, 12, 12 %%>;
  grayLineBlockWidth0 = <%% 105, 85, 71, 105, 105 %%>;
  grayLineBlockWidth1 = <%% 92, 72, 63, 92, 92 %%>;
  grayLineBlockWidth2 = <%% 106, 86, 72, 106, 106 %%>;

  grayLineBlockFontSize = <%% 14, 12, 12, 15, 3.3 %%>;
  grayLineBlockFontWeight = <%% 400, 400, 400, 300, 400 %%>;
  grayLineBlockFontTop = <%% 15, 15, 15, 15, 15 %%>;

  grayLineBlockFontRight0 = <%% -37, -32, -32, -32, -33 %%>;
  grayLineBlockFontRight1 = <%% -31, -26, -26, -26, -31 %%>;
  grayLineBlockFontRight2 = <%% -32, -27, -27, -27, -32 %%>;
  grayLineBlockFontRight3 = <%% -45, -38, -38, -38, -41 %%>;

  spaceStatusLeft0 = <%% 406, 326, 295, 295, 295 %%>;
  spaceStatusLeft1 = <%% 696, 546, 464, 464, 464 %%>;
  spaceStatusWeight = <%% 300, 300, 300, 300, 300 %%>;
  spaceStatusBarWeight = <%% 200, 200, 200, 200, 200 %%>;

  spaceStatusBoxLeft0 = <%% 215, 184, 160, 184, 184 %%>;
  spaceStatusBoxLeft1 = <%% 531, 429, 353, 353, 353 %%>;
  spaceStatusBoxLeft2 = <%% 780, 613, 522, 522, 522 %%>;
  spaceStatusBoxTop = <%% (isMac() ? 4 : 6), (isMac() ? 5 : 7), (isMac() ? 6 : 7), 6, 6 %%>;

  spaceStatusBoxFactorSize = <%% 15, 13, 12, 12, 12 %%>;
  spaceStatusBoxFactorWeight = <%% 300, 300, 300, 300, 300 %%>;
  spaceStatusBoxFactorMargin = <%% 10, 8, 7, 7, 7 %%>;

  textareaTop = <%% 10, 10, 10, 10, 2 %%>;
  textareaLeft = <%% 15, 15, 15, 15, 2.5 %%>;

  budgetTriangleTop = <%% -11, -11, -11, -11, -11 %%>;
  budgetTriangleWidth = <%% 8, 8, 8, 8, 8 %%>;

  spaceTriangleTop = <%% (isMac() ? -5 : -6), (isMac() ? -5 : -6), (isMac() ? -5 : -6), -5, -5 %%>;
  spaceTriangleWidth = <%% 6, 6, 6, 6, 6 %%>;

  addressPromptWidth = <%% 900, 900, 900, 900, 900 %%>;
  addressPromptHeight = <%% 450, 450, 450, 450, 450 %%>;

  mobileTongPaddingTop = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;
  mobileFactorPaddingLeft = <%% 3, 3, 3, 15, 3 %%>;
  mobileFactorCheckWidth = <%% 1.8, 1.8, 1.8, 8, 1.8 %%>;
  mobileFactorCheckTop = <%% 1.35, 1.35, 1.35, 6, 1.6 %%>;
  mobileFactorBetween = <%% 4.2, 4.2, 4.2, 19, 4.2 %%>;
  mobileFactorBetween2 = <%% 3.2, 3.2, 3.2, 36.5, 3.2 %%>;
  mobileFactorBetween3 = <%% 4.6, 4.6, 4.6, 16.5, 4.6 %%>;
  mobileFactorPaddingBotom = <%% 1.9, 1.9, 1.9, 6, 1.9 %%>;

  mobileCheckBoxLeft1 = <%% 34, 34, 34, 145, 34 %%>;
  mobileCheckBoxLeft2 = <%% 46, 46, 46, 197, 46 %%>;
  mobileCheckBoxLeft3 = <%% 58, 58, 58, 250, 58 %%>;
  mobileCheckBoxLeft4 = <%% 45, 45, 45, 181, 45 %%>;

  mobileCheckBoxMainSize = <%% 3.8, 3.8, 3.8, 15, 3.8 %%>;
  mobileCheckBoxMainTop = <%% 0.7, 0.7, 0.7, 1.5, 0.6 %%>;

  greenNoticeSize = <%% 12, 12, 11, 11, 2.8 %%>;
  greenNoticeWeight = <%% 600, 600, 600, 600, 600 %%>;
  greenNoticePaddingTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 7 : 9), (isMac() ? 7 : 9), 1.9 %%>;
  greenNoticePaddingBottom = <%% (isMac() ? 9 : 8), (isMac() ? 9 : 8), (isMac() ? 8 : 7), (isMac() ? 8 : 7), 2.3 %%>;
  greenNoticePaddingLeft = <%% 11, 11, 10, 10, 2.4 %%>;
  greenNoticeBottom = <%% 40, 40, 40, 40, 8 %%>;
  greenNoticeBottom2 = <%% 36, 36, 36, 36, 7.2 %%>;
  greenNoticeLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  greenNoticeWidth0 = <%% 96, 96, 96, 96, 28 %%>;
  greenNoticeWidth1 = <%% 120, 120, 120, 120, 28 %%>;

  calendarWidth = <%% 260, 250, 230, 210, 56 %%>;
  calendarTop = <%% 41, 41, 41, 40, 8.2 %%>;

  livingDownEvent = function (id) {
    GeneralJs.stacks["currentLivingAlertId"] = null;
    if (document.getElementById(id) !== null) {
      document.getElementById(id).style.animation = "fadedownlite 0.3s ease forwards";
      setQueue(() => {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).parentElement.removeChild(document.getElementById(id));
        }
      }, 301);
    }
  }

  livingAlertEvent = function (mother) {

    const tempId = uniqueValue("hex");
    createNode({
      mode: "aside",
      mother,
      id: tempId,
      style: {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "거주중일 시, 보관 이사가 없다면 도배와 필름 제외 시공이 어렵습니다!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth1) + ea,
            left: "calc(50% - " + String((greenNoticeWidth1 / 2) + (greenNoticePaddingLeft / 2)) + ea + ")",
            background: colorChip.gradientGreen,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom2) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

    GeneralJs.stacks["currentLivingAlertId"] = tempId;
    setQueue(() => {
      livingDownEvent(tempId);
    }, 5 * 1000);

  }

  checkboxClickEvent0 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            if (/거주중/gi.test(dom.children[2].textContent)) {
              livingAlertEvent(dom);
            }
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

  checkboxClickEvent1 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            dom.setAttribute("toggle", "on");
            dom.style.color = colorChip.green;
            dom.parentElement.children[0].style.opacity = String(1);
          } else {
            dom.setAttribute("toggle", "off");
            dom.style.color = colorChip.deactive;
            dom.parentElement.children[0].style.opacity = String(0);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkboxClickEvent2 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            dom.setAttribute("toggle", "on");
            dom.style.color = colorChip.green;
            dom.children[0].style.opacity = String(1);
          } else {
            dom.setAttribute("toggle", "off");
            dom.style.color = colorChip.deactive;
            dom.children[0].style.opacity = String(0);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkboxClickEvent3 = async function (e) {
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
            dom.children[2].style.color = colorChip.deactive;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  addressButtonEvent = async function (e) {
    try {
      const totalContents = document.getElementById("totalcontents");
      const removeTargets = "removeTargets";
      const zIndex = 4;
      let cancelBack, whitePrompt;

      GeneralJs.stacks["addressEvent"] = async function (e) {
        try {
          findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address0").value = e.data.trim();
          findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").value = '';
          findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").focus();
          const targets = document.querySelectorAll('.' + removeTargets);
          for (let dom of targets) {
            dom.remove();
          }
          window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
          GeneralJs.stacks["addressEvent"] = null;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientConsultingJs.addressEvent : " + e.message }, "/errorLog");
        }
      }
      window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

      cancelBack = createNode({
        mother: totalContents,
        class: [ removeTargets ],
        event: {
          click: (e) => {
            const targets = document.querySelectorAll('.' + removeTargets);
            for (let dom of targets) {
              dom.remove();
            }
            if (GeneralJs.stacks["addressEvent"] !== null && GeneralJs.stacks["addressEvent"] !== undefined) {
              window.removeEventListener('message', GeneralJs.stacks["addressEvent"]);
              GeneralJs.stacks["addressEvent"] = null;
            }
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          zIndex: String(zIndex),
          width: String(100) + '%',
          height: String(100) + '%',
          background: "transparent",
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ removeTargets ],
        style: {
          position: "fixed",
          left: "calc(50% - " + String(addressPromptWidth / 2) + ea + ")",
          top: "calc(50% - " + String(addressPromptHeight / 2) + ea + ")",
          width: String(addressPromptWidth) + ea,
          height: String(addressPromptHeight) + ea,
          zIndex: String(zIndex),
          background: colorChip.white,
          borderRadius: String(3) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeuphard 0.3s ease forwards",
          overflow: "hidden",
        },
        children: [
          {
            mode: "iframe",
            attribute: [
              { src: window.location.protocol + "//" + window.location.host + "/tools/addressLite" },
              { width: String(100) + '%' },
              { height: String(100) + '%' },
            ],
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              border: String(0),
            }
          }
        ]
      });

    } catch (e) {
      console.log(e);
    }
  }

  phoneHypenEvent = function (e) {
    this.value = autoHypenPhone(this.value);
  }

  pyeongNumberEvent = function (e) {
    this.value = this.value.replace(/[^0-9\.]/gi, '');
  }

  pyeongBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    if (this.value.replace(/[^0-9\.]/gi, '').trim() === '') {
      this.value = "00평";
    } else {
      this.value = this.value.replace(/[^0-9\.]/gi, '') + "평";
    }
  }

  pyeongFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[^0-9\.]/gi, '');

    createNode({
      mode: "aside",
      mother,
      style: {
        position: "relative",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "평수는 반드시 분양 평수로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth0) + ea,
            left: "calc(50% - " + String((greenNoticeWidth0 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorChip.gradientGreen,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

  }

  addressBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
  }

  addressFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[^0-9\.]/gi, '');

    createNode({
      mode: "aside",
      mother,
      style: {
        position: "relative",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "주소는 인테리어를 받으실 곳으로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth1) + ea,
            left: "calc(50% - " + String((greenNoticeWidth1 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorChip.gradientGreen,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

  }

  calendarViewEvent = async function (e) {
    try {
      const mother = this.previousElementSibling;
      const removeTargets = "removeTargets";
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let calendar;

      cancelBack = createNode({
        mother,
        class: [ removeTargets ],
        event: {
          click: (e) => {
            const targets = document.querySelectorAll('.' + removeTargets);
            for (let dom of targets) {
              dom.remove();
            }
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          zIndex: String(zIndex),
          width: String(100) + '%',
          height: String(100) + '%',
          background: "transparent",
        }
      });

      whitePrompt = createNode({
        mother,
        class: [ removeTargets ],
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            style: {
              position: "absolute",
              left: "calc(50% - " + String(calendarWidth / 2) + ea + ")",
              top: String(calendarTop) + ea,
              width: String(calendarWidth) + ea,
              zIndex: String(zIndex),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuphard 0.3s ease forwards",
              transition: "all 0s ease",
            },
          }
        ]
      }).firstChild;

      calendar = instance.mother.makeCalendar(stringToDate(new Date()), function (e) {
        let targets;
        findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "movein").value = this.getAttribute("buttonValue");
        targets = document.querySelectorAll('.' + removeTargets);
        for (let dom of targets) {
          dom.remove();
        }
      }, { width: calendarWidth, mobile });
      whitePrompt.appendChild(calendar.calendarBase);

    } catch (e) {
      console.log(e);
    }
  }

  blank = <%% "&nbsp;&nbsp;&nbsp;", "&nbsp;&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;" %%>;

  if (media[0]) {
    initWording0 = "홈스타일링 진행을 위해 다음 기본 정보가 필요합니다. 간단히 작성 후, 디자이너와의 1:1 상담을 받아보세요!";
  } else if (media[1]) {
    initWording0 = "홈스타일링 진행을 위해 다음 기본 정보가 필요합니다. 간단히 작성 후, 디자이너와의 상담을 받아보세요!";
  } else {
    initWording0 = "홈스타일링 진행을 위해 간단히 작성 후, 디자이너와의 1:1 상담을 받아보세요!";
  }

  if (media[0]) {
    initWording1 = "<u%*%u>주소는 <b%홈스타일링을 받으실 곳%b>으로, 평은 <b%분양 평수%b>로 적어 주셔야 합니다.";
  } else if (media[1]) {
    initWording1 = "<u%*%u>주소는 <b%홈스타일링을 받으실 곳%b>으로, 평은 <b%분양 평수%b>로 적어 주셔야 합니다.";
  } else {
    if (mobile) {
      initWording1 = "주소는 <b%홈스타일링을 받으실 곳%b>으로, 평은 <b%분양\n평수%b>로 적어 주셔야 합니다.";
    } else {
      initWording1 = "<u%*%u>주소는 <b%홈스타일링을 받으실 곳%b>으로, 평은 <b%분양 평수%b>로 적어 주셔야 합니다.";
    }
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
    text: desktop ? ((media[0] || media[4]) ? "디자이너와의 상담을 위해" : "디자이너와의") : "디자이너와의 상담을 위해",
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
      text: "상담을 위해,",
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
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(mobileRightBoxLeft * 2, ea),
      height: desktop ? "calc(100% - " + String((margin * 2) + rightBoxPaddingTop) + ea + ")" : String(mobileRightBoxHeight) + ea,
      paddingTop: String(rightBoxPaddingTop) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      paddingLeft: mobile ? String(mobileRightBoxLeft) + ea : "",
      paddingRight: mobile ? String(mobileRightBoxLeft) + ea : "",
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
    text: desktop ? initWording0 : initWording1,
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
    },
    bold: {
      fontWeight: String(700),
      color: colorChip.black,
    },
    under: {
      fontWeight: String(400),
      color: colorChip.green,
    }
  });

  createNode({
    mother: rightBox,
    text: initWording1,
    style: {
      display: desktop ? "block" : "none",
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
    },
    bold: {
      fontWeight: String(700),
      color: colorChip.black,
    },
    under: {
      fontWeight: String(400),
      color: colorChip.green,
    }
  });

  // block desktop start
  if (media[0] || media[1] || media[2]) {

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
            top: String(mainTop) + ea,
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
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          event: {
            click: addressButtonEvent
          },
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
            top: String(mainTop) + ea,
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
          event: {
            keyup: phoneHypenEvent,
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
            placeholder: "인테리어 받을 곳의 상세 주소",
            property: "address1",
            value: "",
          },
          event: {
            focus: addressFocusEvent,
            blur: addressBlurEvent,
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
            top: String(mainTop) + ea,
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
            top: String(mainTop) + ea,
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
            top: String(mainTop) + ea,
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
          event: {
            keyup: pyeongNumberEvent,
            blur: pyeongBlurEvent,
            focus: pyeongFocusEvent,
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
            top: String(mainTop) + ea,
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
                top: String(mainTop) + ea,
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
                top: String(mainTop) + ea,
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
            top: String(mainTop) + ea,
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
          event: {
            click: calendarViewEvent,
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
            top: String(mainTop) + ea,
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
                top: String(mainTop) + ea,
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
                top: String(mainTop) + ea,
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
            top: String(mainTop) + ea,
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(1),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "on",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "500만원 이하",
              style: {
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.green,
                right: String(grayLineBlockFontRight0) + ea,
                top: String(grayLineBlockFontTop) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "1,000만원",
              style: {
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight1) + ea,
                top: String(grayLineBlockFontTop) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "1,500만원",
              style: {
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight1) + ea,
                top: String(grayLineBlockFontTop) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "2,000만원",
              style: {
                cursor: "pointer",
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight2) + ea,
                top: String(grayLineBlockFontTop) + ea,
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "2,500만원",
              style: {
                cursor: "pointer",
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight2) + ea,
                top: String(grayLineBlockFontTop) + ea,
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "3,000만원",
              style: {
                cursor: "pointer",
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight2) + ea,
                top: String(grayLineBlockFontTop) + ea,
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "4,000만원",
              style: {
                cursor: "pointer",
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight2) + ea,
                top: String(grayLineBlockFontTop) + ea,
                transition: "all 0.5s ease",
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
              mode: "svg",
              source: this.mother.returnTriangle(colorChip.green),
              style: {
                position: "absolute",
                top: String(budgetTriangleTop) + ea,
                right: String(-1 * ((budgetTriangleWidth / 2) + (1 / 2))) + ea,
                width: String(budgetTriangleWidth) + ea,
                opacity: String(0),
                transition: "all 0s ease",
              }
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent1,
              },
              text: "5,000만원 이상",
              style: {
                cursor: "pointer",
                position: "absolute",
                fontSize: String(grayLineBlockFontSize) + ea,
                fontWeight: String(grayLineBlockFontWeight),
                color: colorChip.deactive,
                right: String(grayLineBlockFontRight3) + ea,
                top: String(grayLineBlockFontTop) + ea,
                transition: "all 0.5s ease",
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
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          text: "방 개수" + blank + "<b%" + ((media[0]) ? "|" : ":") + "%b>",
          style: {
            position: "absolute",
            left: String(leftGrayType2) + ea,
            top: String(mainTop + (isMac() ? 0 : (media[0] ? -1 : 0))) + ea,
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
              class: [ inputClassName ],
              attribute: {
                toggle: "on",
                property: "room",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "1개",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.green,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(1),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "room",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "2개",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "room",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "3개",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "room",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "4개 이상",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          text: ((media[0] || media[1]) ? "화장실 개수" : "화장실") + blank + "<b%" + ((media[0]) ? "|" : ":") + "%b>",
          style: {
            position: "absolute",
            left: String(spaceStatusLeft0) + ea,
            top: String(mainTop + (isMac() ? 0 : (media[0] ? -1 : 0))) + ea,
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
              class: [ inputClassName ],
              attribute: {
                toggle: "on",
                property: "bathroom",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "1개",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.green,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(1),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "bathroom",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "2개",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "bathroom",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "3개 이상",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            }
          ]
        },
        {
          text: "발코니" + blank + "<b%" + ((media[0]) ? "|" : ":") + "%b>",
          style: {
            position: "absolute",
            left: String(spaceStatusLeft1) + ea,
            top: String(mainTop + (isMac() ? 0 : (media[0] ? -1 : 0))) + ea,
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
              class: [ inputClassName ],
              attribute: {
                toggle: "on",
                property: "balcony",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "확장 없음",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.green,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(1),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "balcony",
              },
              event: {
                click: checkboxClickEvent2,
              },
              text: "확장",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(spaceStatusBoxFactorSize) + ea,
                fontWeight: String(spaceStatusBoxFactorWeight),
                color: colorChip.deactive,
                marginRight: String(spaceStatusBoxFactorMargin) + ea,
                cursor: "pointer",
                transition: "all 0.5s ease",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(spaceTriangleTop) + ea,
                    left: String(0),
                    textAlign: "center",
                    opacity: String(0),
                    transition: "all 0s ease",
                  },
                  children: [
                    {
                      mode: "svg",
                      source: this.mother.returnTriangle(colorChip.green),
                      style: {
                        position: "relative",
                        display: "inline-block",
                        width: String(spaceTriangleWidth) + ea,
                        transition: "all 0s ease",
                      }
                    },
                  ]
                },
              ]
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
            top: String(mainTop) + ea,
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
            property: "etc",
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

  } else {

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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
          event: {
            keyup: phoneHypenEvent,
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "이메일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
            left: String(leftGrayType0) + ea,
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "주소",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          event: {
            click: addressButtonEvent
          },
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
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
            placeholder: "주소",
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
    // 5
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
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
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
            placeholder: "인테리어 받을 곳의 상세 주소",
            property: "address1",
            value: "",
          },
          event: {
            focus: addressFocusEvent,
            blur: addressBlurEvent,
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "구성원",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
            left: String(leftGrayType0) + ea,
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
    // 7 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    // 8
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
          event: {
            keyup: pyeongNumberEvent,
            blur: pyeongBlurEvent,
            focus: pyeongFocusEvent,
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType1) + ea,
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
      ]
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "계약 형태",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
    // 10
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
          event: {
            click: calendarViewEvent,
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType1) + ea,
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
      ]
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "거주 여부",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
    // 12 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    // 13
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(mobile ? 24 : 70) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType2) + ea,
            borderRadius: String(3) + "px",
            paddingTop: String(mobileTongPaddingTop) + ea,
          },
          children: [
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "on",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                  }
                },
                {
                  text: "500만원 이하",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.green,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginLeft: String(mobileFactorBetween) + ea,
                marginRight: String(mobile ? 17 : mobileFactorBetween) + ea,
                marginBottom: String(mobileFactorPaddingBotom) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "1,000만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "1,500만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginLeft: String(mobileFactorBetween) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "2,000만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginLeft: mobile ? String(mobileFactorBetween) + ea : "",
                marginBottom: String(mobileFactorPaddingBotom) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "2,500만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginBottom: String(mobileFactorPaddingBotom) + ea,
                marginLeft: mobile ? "" : String(mobileFactorBetween2) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "3,000만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginLeft: String(mobile ? mobileFactorBetween2 : mobileFactorBetween3) + ea,
                marginBottom: String(mobileFactorPaddingBotom) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "3,500만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
                marginLeft: String(mobileFactorBetween3) + ea,
                marginBottom: String(mobileFactorPaddingBotom) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "4,000만원",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
            {
              class: [ inputClassName ],
              attribute: {
                toggle: "off",
                property: "budget",
              },
              event: {
                click: checkboxClickEvent3,
              },
              style: {
                display: "inline-block",
                position: "relative",
                color: colorChip.black,
                verticalAlign: "top",
                paddingLeft: String(mobileFactorPaddingLeft) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.gray3),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(1),
                    left: String(0),
                  }
                },
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(mobileFactorCheckWidth) + ea,
                    top: String(mobileFactorCheckTop) + ea,
                    left: String(0),
                    verticalAlign: "top",
                    cursor: "pointer",
                    opacity: String(0),
                  }
                },
                {
                  text: "5,000만원 이상",
                  style: {
                    position: "relative",
                    fontSize: String(grayLineBlockFontSize) + ea,
                    fontWeight: String(grayLineBlockFontWeight),
                    color: colorChip.deactive,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    verticalAlign: "top",
                  }
                }
              ]
            },
          ]
        },






      ]
    });
    // 14 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });
    // 15
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "방 개수",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
            property: "room",
          },
          event: {
            click: checkboxClickEvent3
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
              text: "1개",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
            property: "room",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft1) + ea,
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
              text: "2개",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
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
            property: "room",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft2) + ea,
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
              text: "3개",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
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
            property: "room",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft3) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            cursor: "pointer",
            width: String(mobile ? 18 : 66) + ea,
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
              text: "4개 이상",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },
      ]
    });
    // 16
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "화장실",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
            property: "bathroom",
          },
          event: {
            click: checkboxClickEvent3
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
              text: "1개",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
            property: "bathroom",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft1) + ea,
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
              text: "2개",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
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
            property: "bathroom",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft2) + ea,
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
              text: "3개 이상",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        }
      ]
    });
    // 17
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
            marginRight: String(circleBetween) + ea,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "발코니",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
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
            property: "balcony",
          },
          event: {
            click: checkboxClickEvent3
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
              text: "확장 없음",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
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
            property: "balcony",
          },
          event: {
            click: checkboxClickEvent3
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(mobileCheckBoxLeft4) + ea,
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
              text: "확장",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mobileCheckBoxMainTop) + ea,
                fontSize: String(mobileCheckBoxMainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.deactive,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },
      ]
    });
    // 18
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
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            borderRadius: String(circleRadius * 2) + ea,
            background:  colorChip.green,
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
            top: String(mainTop) + ea,
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
            left: String(leftGrayType1) + ea,
            width: String(grayTextAreaWidth) + ea,
            height: String(grayBigHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "textarea",
          class: [ inputClassName ],
          attribute: {
            placeholder: "선호 스타일과 공간 사항을 적어주세요!\n(예) 모던 프렌치 홈스타일링을 원해요.\n(예) 팬트리가 있어요.\n(예) 복층 공간입니다.",
            property: "etc",
          },
          style: {
            position: "absolute",
            top: String(grayTextAreaTop + textareaTop) + ea,
            left: String(leftGrayType1 + textareaLeft) + ea,
            width: String(grayTextAreaWidth - (textareaLeft * 2)) + ea,
            height: String(grayBigHeight - (textareaTop * 1)) + ea,
            fontSize: String(inputSize) + ea,
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
