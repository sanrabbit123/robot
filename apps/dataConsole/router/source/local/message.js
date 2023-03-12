const MessageJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

MessageJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects, media } = this;
  const { createNode, withOut, colorChip, isMac, blankHref, ajaxJson, cleanChildren, autoComma, dateToString, stringToDate, serviceParsing, equalJson, svgMaker } = GeneralJs;
  let outerMargin;
  let innerPadding;
  let grayBack;
  let grayTong;
  let questionHeight;
  let questionMarginBottom;
  let questionInput;

  outerMargin = 30;
  innerPadding = 20;
  questionHeight = 56;
  questionMarginBottom = 6;

  grayBack = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
      width: withOut(outerMargin * 2, ea),
      height: withOut((outerMargin * 2) + belowHeight, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          display: "block",
          width: withOut(0, ea),
          height: withOut(0, ea),
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(innerPadding) + ea,
              left: String(innerPadding) + ea,
              width: withOut(innerPadding * 2, ea),
              height: withOut(innerPadding * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            ]
          }
        ]
      }
    ]
  });
  grayTong = grayBack.firstChild.firstChild.firstChild;

  questionInput = createNode({
    mother: grayTong,
    style: {
      display: "flex",
      width: withOut(0, ea),
      height: String(questionHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.white,
      marginBottom: String(questionMarginBottom) + ea,
      justifyContent: "start",
      alignItems: "center",
      paddingLeft: String(innerPadding) + ea,
    },
    child: {
      mode: "input",
      attribute: {
        type: "text",
        placeholder: "질문을 입력하세요...",
      },
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(16) + ea,
        fontWeight: String(400),
        top: String(-1) + ea,
        colorChip: colorChip.black,
        border: String(0),
        background: "transparent",
        width: withOut(innerPadding * 2, ea),
        outline: String(0),
      }
    }
  }).firstChild;

  questionInput.focus();

  createNode({
    mother: grayTong,
    style: {
      display: "flex",
      width: withOut(innerPadding * 2, ea),
      height: String(window.innerHeight - belowHeight - questionHeight - questionMarginBottom - (outerMargin * 2) - (innerPadding * (2 + 2))) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.white,
      padding: String(innerPadding) + ea,
    }
  });

}

MessageJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, setQueue } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();
    
    this.baseMaker();

  } catch (e) {
    GeneralJs.ajax("message=" + e.message + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
