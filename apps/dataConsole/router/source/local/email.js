const EmailJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {};
  this.module.paddingTop = 38;
  this.module.height = <%% 18, 16, 16, 16, 18 %%>;
  this.module.marginBottom = 18;
  this.module.initialLine = 14;
  this.module.initialMargin = 14;
  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.standardDoms = [];
  this.caseDoms = [];
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

EmailJs.prototype.sendMailPopup = function () {
  const instance = this;
  const { ea, totalContents, whitePopupClassName, belowHeight, emailAddress } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, blankHref, cleanChildren, ajaxJson, equalJson, autoComma } = GeneralJs;
  return async function (e) {
    try {
      let margin;
      let cancelBack, whitePrompt;
      let zIndex;
      let popupWidth;
      let innerPadding;
      let titleArea;
      let idNameAreaPaddingTop;
      let titleAreaHeight;
      let titleAreaMarginBottom;
      let titleSize;
      let contentsArea;
      let contentsAreaPaddingTop;
      let scrollBox;

      zIndex = 98;
      margin = 40;
      innerPadding = 30;

      popupWidth = 900;

      idNameAreaPaddingTop = 17;

      titleAreaHeight = 24;
      titleAreaMarginBottom = 6;
      titleSize = 16;

      contentsAreaPaddingTop = 16;

      removeByClass(whitePopupClassName);

      cancelBack = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        event: {
          click: (e) => {
            removeByClass(whitePopupClassName);
          },
        },
        style: {
          display: "block",
          position: "fixed",
          top: String(0),
          left: String(0) + ea,
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.white,
          opacity: String(0.6),
          zIndex: String(zIndex),
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ whitePopupClassName ],
        style: {
          display: "block",
          position: "fixed",
          top: String(margin) + ea,
          width: String(popupWidth - (innerPadding * 2)) + ea,
          left: "calc(50% - " + String(popupWidth / 2) + ea + ")",
          height: withOut(belowHeight + (margin * 2) + (innerPadding * 2), ea),
          padding: String(innerPadding) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 3px 18px -9px " + colorChip.darkShadow,
          animation: "fadeuplite 0.3s ease forwards",
          overflow: "hidden",
          zIndex: String(zIndex),
        },
      });

      titleArea = createNode({
        mother: whitePrompt,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(titleAreaHeight) + ea,
          marginBottom: String(titleAreaMarginBottom) + ea,
          flexDirection: "row",
        },
        children: [
          {
            text: "<u%< %u>" + "Send mail" + "<u% >%u>",
            style: {
              display: "inline-block",
              position: "relative",
              fontFamily: "graphik",
              fontSize: String(titleSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            },
            under: {
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(500),
              color: colorChip.gray4,
              top: String(2) + ea,
            }
          }
        ]
      });
  
      contentsArea = createNode({
        mother: whitePrompt,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: withOut(titleAreaHeight + titleAreaMarginBottom + contentsAreaPaddingTop, ea),
          borderTop: "1px solid " + colorChip.gray3,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          overflow: "scroll",
        }
      })

      scrollBox = createNode({
        mother: contentsArea,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
        }
      });

      await instance.sendMailInputSetting(scrollBox);

    } catch (e) {
      console.log(e);
    }
  }
}

EmailJs.prototype.sendMailInputSetting = async function (scrollBox) {
  const instance = this;
  const { ea, totalContents, whitePopupClassName, belowHeight, emailAddress, baseBlockClassName, inputClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, blankHref, cleanChildren, ajaxJson, equalJson, autoComma } = GeneralJs;
  try {
    let grayTop;
    let grayInputTop;
    let grayHeight;
    let grayBigHeight;
    let grayTextAreaTop;
    let grayTextAreaWidth;
    let moduleHeight;
    let blockMarginBottom;
    let leftGrayType0;
    let leftGrayType1;
    let leftGrayType2;
    let leftGrayType3;
    let widthGrayType0;
    let widthGrayType1;
    let widthGrayType2;
    let widthGrayType3;
    let circleRadius;
    let circleTop;
    let circleBetween;
    let mainSize;
    let mainWeight;
    let mainTop;
    let inputSize;
    let inputWeight;
    let inputIndent;
    let propertyAreaWidth;
    let teamInnerPadding;
    let textareaTop, textareaLeft;
    let grayLineBlockFontSize;
    let grayLineBlockFontWeight;
    let grayLineBlockFontTop;

    circleRadius = <%% 2.5, 2.5, 2, 2, 0.5 %%>;
    circleTop = 10;
    circleBetween = <%% 6, 6, 5, 5, 1.3 %%>;

    grayTop = <%% 0, 0, 0, 0, 0 %%>;
    grayInputTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
    grayHeight = 30;
    grayBigHeight = <%% 156, 137, 136, 135, 38 %%>;
    grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
    grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;
  
    moduleHeight = grayTop + grayHeight;
    blockMarginBottom = 6;
  
    leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
    leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
    leftGrayType2 = <%% 125, 112, 98, 98, 22.8 %%>;
    leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;
  
    widthGrayType0 = <%% 160, 140, 140, 150, 34 %%>;
    widthGrayType1 = <%% 455, 329, 283, 403, 58.1 %%>;
    widthGrayType2 = <%% 757, 588, 503, 383, 53.4 %%>;
    widthGrayType3 = <%% 392, 268, 231, 352, 45.6 %%>;

    mainSize = 16;
    mainWeight = 800;
    mainTop = isMac() ? -1 : 1;
    inputSize = <%% 13, 13, 12, 12, 3 %%>;
    inputWeight = <%% 400, 400, 400, 400, 400 %%>;
    inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

    propertyAreaWidth = 120;
    teamInnerPadding = 8;

    marginRatio = <%% 1.2, 1.2, 1.1, 1.1, 0.8 %%>;
    
    textareaTop = <%% 10, 10, 10, 10, 2 %%>;
    textareaLeft = <%% 15, 15, 15, 15, 2.5 %%>;

    grayLineBlockFontSize = <%% 14, 12, 12, 12, 3 %%>;
    grayLineBlockFontWeight = <%% 400, 400, 400, 300, 400 %%>;
    grayLineBlockFontTop = <%% 15, 15, 15, 15, 15 %%>;

    // 1
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.deactive,
            verticalAlign: "top",
          }
        },
        {
          text: "받는 사람 1",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyAreaWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(300) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child:{
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              property: "name",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(grayInputTop) + ea,
              width: withOut(0, ea),
              height: withOut(0, ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
      ]
    });
    
    // 2
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.deactive,
            verticalAlign: "top",
          }
        },
        {
          text: "받는 사람 2",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyAreaWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(300) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child:{
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              property: "name",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(grayInputTop) + ea,
              width: withOut(0, ea),
              height: withOut(0, ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
      ]
    });

    // 3
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.deactive,
            verticalAlign: "top",
          }
        },
        {
          text: "받는 사람 3",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyAreaWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(300) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child:{
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              property: "name",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(grayInputTop) + ea,
              width: withOut(0, ea),
              height: withOut(0, ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
      ]
    });

    // 4
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String((circleRadius * 2) + circleBetween + propertyAreaWidth) + ea,
            height: String(moduleHeight) + ea,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start"
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleRadius * 2) + ea,
                height: String(circleRadius * 2) + ea,
                marginRight: String(circleBetween) + ea,
                borderRadius: String(circleRadius) + ea,
                background: colorChip.deactive,
                verticalAlign: "top",
              }
            },
            {
              text: "받는 팀원",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(mainWeight),
                color: colorChip.black,
                verticalAlign: "top",
                width: String(propertyAreaWidth) + ea,
              }
            },
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut((circleRadius * 2) + circleBetween + propertyAreaWidth + (teamInnerPadding * 2), ea),
            "min-height": String(grayHeight) + ea,
            padding: String(teamInnerPadding) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            paddingBottom: String(teamInnerPadding - 4) + ea,
          },
          children: instance.members.filter((m) => {
            return m.alive && (m.email.findIndex((e) => { return (new RegExp(instance.emailHost, "gi")).test(e) }) !== -1)
          }).map((m) => {
            return {
              attribute: {
                toggle: "off",
                email: m.email.find((e) => { return (new RegExp(instance.emailHost, "gi")).test(e) }),
                name: m.name,
                memid: m.id,
              },
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(64) + ea,
                height: String(28) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.white,
                marginRight: String(4) + ea,
                marginBottom: String(4) + ea,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              child: {
                text: m.name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(isMac() ? -1 : 1) + ea,
                  fontSize: String(13) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                }
              }
            }
          })
        },
      ]
    });

    // 5 : margin
    createNode({
      mother: scrollBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 6
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.deactive,
            verticalAlign: "top",
          }
        },
        {
          text: "제목",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyAreaWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut((circleRadius * 2) + circleBetween + propertyAreaWidth, ea),
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child:{
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              property: "name",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(grayInputTop) + ea,
              width: withOut(0, ea),
              height: withOut(0, ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "left",
              background: "transparent",
              textIndent: String(inputIndent) + ea,
            }
          }
        },
      ]
    });

    // 7
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String((circleRadius * 2) + circleBetween + propertyAreaWidth) + ea,
            height: String(moduleHeight) + ea,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start"
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleRadius * 2) + ea,
                height: String(circleRadius * 2) + ea,
                marginRight: String(circleBetween) + ea,
                borderRadius: String(circleRadius) + ea,
                background: colorChip.deactive,
                verticalAlign: "top",
              }
            },
            {
              text: "첨부 파일",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(mainWeight),
                color: colorChip.black,
                verticalAlign: "top",
                width: String(propertyAreaWidth) + ea,
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut((circleRadius * 2) + circleBetween + propertyAreaWidth + (teamInnerPadding * 2), ea),
            "min-height": String(64) + ea,
            padding: String(teamInnerPadding) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            paddingBottom: String(teamInnerPadding - 4) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "여기에 파일을 드래그하여 업로드...",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(isMac() ? -2 : 0) + ea,
              fontSize: String(20) + ea,
              fontWeight: String(200),
              color: colorChip.deactive,
            }
          }
        },
      ]
    });

    // 8
    createNode({
      mother: scrollBox,
      class: [ baseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "flex",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "start"
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String((circleRadius * 2) + circleBetween + propertyAreaWidth) + ea,
            height: String(moduleHeight) + ea,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start"
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleRadius * 2) + ea,
                height: String(circleRadius * 2) + ea,
                marginRight: String(circleBetween) + ea,
                borderRadius: String(circleRadius) + ea,
                background: colorChip.deactive,
                verticalAlign: "top",
              }
            },
            {
              text: "본문",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(mainWeight),
                color: colorChip.black,
                verticalAlign: "top",
                width: String(propertyAreaWidth) + ea,
              }
            },
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut((circleRadius * 2) + circleBetween + propertyAreaWidth + (teamInnerPadding * 2), ea),
            "min-height": String(64) + ea,
            padding: String(teamInnerPadding) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            paddingBottom: String(teamInnerPadding - 4) + ea,
            height: String(8000) + ea,
          },
          child: {
            mode: "textarea",
            attribute: {
              property: "etc",
            },
            style: {
              position: "absolute",
              top: String(grayTextAreaTop + textareaTop) + ea,
              left: String(0 + textareaLeft) + ea,
              width: withOut(textareaLeft * 2, ea),
              height: withOut(textareaTop, ea),
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
        },
      ]
    });

    // pannel
    createNode({
      mother: scrollBox.parentNode,
      style: {
        display: "inline-flex",
        position: "fixed",
        bottom: String(30 + 16) + ea,
        right: String(30 + 16) + ea,
        width: String(84) + ea,
        padding: String(6) + ea,
        background: colorChip.white,
        boxShadow: "0px 3px 18px -9px " + colorChip.darkShadow,
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        flexDirection: "column",
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: String(84) + ea,
            height: String(28) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(5) + "px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "즉시 발송",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(13) + ea,
              fontWeight: String(800),
              color: colorChip.white,
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: String(84) + ea,
            height: String(28) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(5) + "px",
            marginTop: String(4) + ea,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "예약 발송",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(13) + ea,
              fontWeight: String(800),
              color: colorChip.white,
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: String(84) + ea,
            height: String(28) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(5) + "px",
            marginTop: String(4) + ea,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "연쇄 발송",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(13) + ea,
              fontWeight: String(800),
              color: colorChip.white,
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
      ]
    })

  } catch (e) {
    console.log(e);
  }
}

EmailJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, valueAreaClassName, emailAddress, listTongClassName, bodyTongClassName, attachTongClassName, eventTargetClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, blankHref, cleanChildren, ajaxJson, equalJson, autoComma, downloadFile } = GeneralJs;
  try {
    let totalMother;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let valueMaxWidth;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let circleRight, circleTop;
    let receiveEmails;
    let tongBase;
    let basicBlockWidth;
    let nameBlockWidth, emailBlockWidth;
    let innerMargin;
    let blockBetween;
    let blockBetweenSmall;
    let bodyBase;
    let tongHeight;
    let attachBase;
    let tongBetween;
    let bodyOpenHeight;
    let fontUpFunc;
    let titleAreaHeight, titleAreaMarginBottom;
    let titleArea;
    let sendEmailIcon;

    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    basicBlockWidth = 136;
    nameBlockWidth = 80;
    emailBlockWidth = 172;

    innerMargin = 8;
    blockBetween = 12;
    blockBetweenSmall = 4;

    tongHeight = 42;
    tongBetween = 6;

    bodyOpenHeight = 640;

    titleAreaHeight = 24;
    titleAreaMarginBottom = 6;

    receiveEmails = this.receiveEmails.data;

    fontUpFunc = (dom) => {
      const targetChildren = [ ...dom.children ];
      let targetChildrenChildren;
      for (let d of targetChildren) {
        if (!/style/gi.test(d.nodeName)) {
          if (typeof d.style.fontSize !== "string" || d.style.fontSize === "") {
            d.style.fontSize = String(14) + ea;
          }
          d.style.lineHeight = String(1.6);
          if (typeof d.style.display !== "string" || d.style.display === "") {
            d.style.display = "block";
          }
          if (typeof d.style.color !== "string" || d.style.color === "") {
            d.style.color = colorChip.black;
          }
        }
        if (d.nodeName === "b" || d.nodeName === "B") {
          if (typeof d.style.color !== "string" || d.style.color === "") {
            d.style.color = colorChip.black;
          }
          d.style.fontWeight = String(800);
        }
        targetChildrenChildren = [ ...d.children ];
        if (targetChildrenChildren.length > 0) {
          fontUpFunc(d);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    titleArea = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(idNameAreaPaddingTop * 2, ea),
        height: String(titleAreaHeight) + ea,
        marginBottom: String(titleAreaMarginBottom) + ea,
        marginLeft: String(idNameAreaPaddingTop) + ea,
        paddingTop: String(16) + ea,
        flexDirection: "row",
      },
      children: [
        {
          text: "<u%< %u>" + emailAddress + "<u% >%u>",
          style: {
            display: "inline-block",
            position: "relative",
            fontFamily: "graphik",
            fontSize: String(18) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          },
          under: {
            position: "relative",
            fontSize: String(18) + ea,
            fontWeight: String(500),
            color: colorChip.gray4,
            top: String(2) + ea,
          }
        }
      ]
    });

    sendEmailIcon = createNode({
      mother: titleArea,
      event: {
        click: instance.sendMailPopup(),
      },
      style: {
        display: "inline-flex",
        position: "absolute",
        width: String(30) + ea,
        height: String(30) + ea,
        right: String(0),
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      child: {
        source: GeneralJs.svgMaker.mailIcon(GeneralJs.colorChip.green),
        mode: "svg",
        style: {
          display: "inline-block",
          position: "relative",
          width: String(24) + ea,
          height: String(24) + ea,
        }
      }
    });

    valueArea = createNode({
      mother: totalMother,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(idNameAreaPaddingTop) + ea,
        height: withOut(16 + titleAreaHeight + titleAreaMarginBottom + idNameAreaPaddingTop, ea),
        width: withOut(0, ea),
        overflow: "scroll",
      },
      child: {
        class: [ valueAreaClassName ],
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(0, ea),
          overflow: "hidden",
        },
      }
    }).firstChild;

    receiveEmails.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
    for (let obj of receiveEmails) {

      tongBase = createNode({
        mother: valueArea,
        class: [ obj.id, listTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(tongHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          marginBottom: String(tongBetween) + ea,
          alignItems: "center",
          justifyContent: "start",
          cursor: "pointer",
        }
      });

      createNode({
        mother: tongBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(basicBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.darkDarkShadow,
          alignItems: "center",
          justifyContent: "center",
          marginRight: String(blockBetween) + ea,
        },
        child: {
          text: dateToString(obj.date, true),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(12) + ea,
            fontWeight: String(700),
            color: colorChip.white,
            top: String(-1) + ea,
          }
        }
      });
      createNode({
        mother: tongBase,
        class: [ eventTargetClassName ],
        attribute: {
          id: obj.id,
          toggle: "off",
        },
        event: {
          click: async function (e) {
            try {
              const toggle = this.getAttribute("toggle") === "on";
              const id = this.getAttribute("id");
              const allMailTargets = [ ...document.querySelectorAll('.' + listTongClassName) ];
              const allBodyTargets = [ ...document.querySelectorAll('.' + bodyTongClassName) ];
              const allAttachTargets = [ ...document.querySelectorAll('.' + attachTongClassName) ];
              let targetBody, loading;
              let targetChildren;
              let targetAttachDom;
              let thisFileName;

              if (toggle) {

                for (let block of allMailTargets) {
                  block.style.opacity = String(1);
                  block.querySelector("." + eventTargetClassName).setAttribute("toggle", "off");
                }
                for (let bodyDom of allBodyTargets) {
                  cleanChildren(bodyDom)
                  bodyDom.style.height = String(0) + ea;
                  bodyDom.style.paddingTop = String(0) + ea;
                }
                for (let attachDom of allAttachTargets) {
                  cleanChildren(attachDom)
                  attachDom.style.height = String(0) + ea;
                  attachDom.style.paddingTop = String(0) + ea;
                  attachDom.style.paddingBottom = String(0) + ea;
                }
                this.setAttribute("toggle", "off");

              } else {

                for (let block of allMailTargets) {
                  if (block !== this.parentNode) {
                    block.style.opacity = String(0.4);
                    block.querySelector("." + eventTargetClassName).setAttribute("toggle", "off");
                  } else {
                    block.style.opacity = String(1);
                    block.querySelector("." + eventTargetClassName).setAttribute("toggle", "on");
                  }
                }
  
                targetBody = null;
                for (let bodyDom of allBodyTargets) {
                  cleanChildren(bodyDom)
                  if (bodyDom.className.split(" ").includes(id)) {
                    bodyDom.style.height = String(bodyOpenHeight) + ea;
                    bodyDom.style.paddingTop = String(12) + ea;
                    targetBody = bodyDom;
                  } else {
                    bodyDom.style.height = String(0) + ea;
                    bodyDom.style.paddingTop = String(0) + ea;
                  }
                }

                for (let attachDom of allAttachTargets) {
                  cleanChildren(attachDom)
                  attachDom.style.height = String(0) + ea;
                  attachDom.style.paddingTop = String(0) + ea;
                  attachDom.style.paddingBottom = String(0) + ea;
                }
  
                if (targetBody !== null) {
                  loading = instance.mother.whiteProgressLoading(null, true, false, false);
                  ajaxJson({ id }, PARSERHOST + "/getEmailBody", { equal: true }).then((response) => {
                    loading.remove();
                    cleanChildren(targetBody);
                    targetBody.insertAdjacentHTML("beforeend", response["body"]);
                    fontUpFunc(targetBody);
                    if (response.attachment.length > 0) {
                      targetAttachDom = allAttachTargets.find((d) => {
                        return d.className.split(" ").includes(id);
                      });
                      if (targetAttachDom !== undefined) {
                        targetAttachDom.style.height = "auto";
                        targetAttachDom.style.paddingTop = String(12) + ea;
                        targetAttachDom.style.paddingBottom = String(16) + ea;

                        for (let obj of response.attachment) {
                          thisFileName = obj.key.split("/")[obj.key.split("/").length - 1];
                          createNode({
                            mother: targetAttachDom,
                            text: thisFileName,
                            attribute: {
                              file: thisFileName,
                              hash: obj.hash
                            },
                            event: {
                              click: async function (e) {
                                try {
                                  const hash = this.getAttribute("hash");
                                  const loading = instance.mother.whiteProgressLoading(null, true, false, false);
                                  const { link } = await ajaxJson({ hash }, PARSERHOST + "/getFileLink", { equal: true });
                                  await downloadFile(link);
                                  loading.remove();
                                } catch (e) {
                                  console.log(e);
                                }
                              }
                            },
                            style: {
                              height: String(28) + ea,
                              borderRadius: String(5) + "px",
                              background: colorChip.gradientGreen,
                              fontSize: String(13) + ea,
                              fontWeight: String(800),
                              color: colorChip.white,
                              paddingLeft: String(16) + ea,
                              paddingRight: String(16) + ea,
                              marginRight: String(4) + ea,
                              display: "inline-flex",
                              position: "relative",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingBottom: String(2) + ea,
                              cursor: "pointer",
                            }
                          })
                        }

                      }
                    }
                  }).catch((err) => {
                    console.log(err);
                  });
                }

                this.setAttribute("toggle", "on");

              }

            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          overflow: "scroll",
          height: withOut(0, ea),
          textAlign: "center",
          width: withOut(basicBlockWidth + blockBetween + nameBlockWidth + blockBetween + blockBetweenSmall + emailBlockWidth, ea),
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(5000) + ea,
            alignItems: "center",
            justifyContent: "start",
            height: withOut(0, ea),
          },
          child: {
            text: obj.title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(15) + ea,
              fontWeight: String(500),
              color: colorChip.black,
              top: String(-1) + ea,
            }
          }
        }
      });
      createNode({
        mother: tongBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(nameBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGreen,
          textAlign: "center",
          marginLeft: String(blockBetween) + ea,
        },
        child: {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(0, ea),
            textAlign: "center",
            overflow: "scroll",
          },
          child: {
            style: {
              display: "inline-flex",
              position: "relative",
              height: withOut(0, ea),
              alignItems: "center",
              justifyContent: "center",
              width: String(5000) + ea,
              marginLeft: String(-1 * ((5000 / 2) - (nameBlockWidth / 2))) + ea,
            },
            child: {
              text: obj.from.name,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(12) + ea,
                fontWeight: String(700),
                color: colorChip.white,
                top: String(-1) + ea,
              }
            }
          }
        },
      });
      createNode({
        mother: tongBase,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(emailBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGreen,
          marginLeft: String(blockBetweenSmall) + ea,
          textAlign: "center",
          overflow: "scroll",
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            color: colorChip.white,
            height: withOut(0, ea),
            width: String(5000) + ea,
            marginLeft: String(-1 * ((5000 / 2) - (emailBlockWidth / 2))) + ea,
            alignItems: "center",
            justifyContent: "center",
          },
          child: {
            text: obj.from.email,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(12) + ea,
              fontWeight: String(700),
              color: colorChip.white,
              top: String(-1) + ea,
            }
          }
        }
      });

      bodyBase = createNode({
        mother: valueArea,
        class: [ obj.id, bodyTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(0) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          marginBottom: String(0) + ea,
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
        }
      });

      attachBase = createNode({
        mother: valueArea,
        class: [ obj.id, attachTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(0) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          marginBottom: String(0) + ea,
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "row",
        }
      });

    }

  } catch (e) {
    console.log(e);
  }
}

EmailJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson, cleanChildren, setQueue } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    const defaultMonth = 3;
    let loading;
    let memid;
    let receiveEmails;
    let targetSearch;
    let members;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.dataonly === "true") {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;
    }

    document.getElementById("grayLeftOpenButton").remove();

    loading = await this.mother.loadingRun();

    memid = instance.mother.member.id;
    receiveEmails = await ajaxJson({ memid }, PARSERHOST + "/listEmail", { equal: true });
    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });

    this.receiveEmails = receiveEmails;
    this.valueAreaClassName = "valueAreaClassName";
    this.listTongClassName = "listTongClassName";
    this.bodyTongClassName = "bodyTongClassName";
    this.attachTongClassName = "attachTongClassName";
    this.eventTargetClassName = "eventTargetClassName";
    this.whitePopupClassName = "whitePopupClassName";
    this.baseBlockClassName = "baseBlockClassName";
    this.inputClassName = "inputClassName";
    this.emailHost = NUMBERSHOST.split(":")[1].split("/")[2];
    this.emailAddress = instance.mother.member.email.find((s) => { return (new RegExp(instance.emailHost, "gi")).test(s) })
    this.members = members;
    GeneralJs.stacks.members = this.members;

    if (this.emailAddress === undefined) {
      throw new Error("invalid member");
    }

    await this.baseMaker();

    loading.parentNode.removeChild(loading);

    if (typeof getObj.target === "string") {
      targetSearch = [ ...document.body.querySelectorAll('.' + getObj.target) ];
      if (targetSearch.length > 0) {
        targetSearch = targetSearch.filter((d) => { return d.querySelector('.' + instance.eventTargetClassName) !== null });
        if (targetSearch.length > 0) {
          setQueue(() => {
            targetSearch[0].querySelector('.' + instance.eventTargetClassName)?.click();
          }, 0);
        }
      }
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
