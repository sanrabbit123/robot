DesignerJs.prototype.calculationBaseMaker = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip, removeByClass } = GeneralJs;
  let target;

  this.desid = desid;
  this.fixTargets = [];

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
  }

  target = null;
  for (let i = 0; i < this.standardDoms.length; i++) {
    if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
      if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
        target = i;
      }
    }
  }
  for (let i = 1; i < this.standardDoms.length; i++) {
    if (i !== target) {
      this.standardDoms[i].style.color = this.standardDoms[i].getAttribute("color");
    } else {
      this.standardDoms[i].style.color = colorChip.green;
      if (i !== 1) {
        if (this.standardDoms[i].getBoundingClientRect().top > window.innerHeight - belowHeight - motherHeight - this.standardDoms[i].getBoundingClientRect().height + 10 || this.standardDoms[i].getBoundingClientRect().top < firstTop) {
          standardBar.parentElement.scrollTo({ top: ((i - 1) * (this.standardDoms[i].getBoundingClientRect().height)) });
        }
      } else {
        standardBar.parentElement.scrollTo({ top: 0 });
      }
    }
  }

  this.calculationCareerDetail(desid);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }

}

DesignerJs.prototype.calculationCareerDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  let margin;
  let baseTong0, baseTong;
  let topMargin, leftMargin, bottomMargin;
  let baseTongMarginBottom;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let mobileOuterMargin;
  let resultAreaWidth;
  let areaBetween;
  let bottomAreaHeight;
  let infoContents;
  let up, down;
  let upLeft, upRight, downLeft, downRight;
  let infoInnerMargin;
  let blockHeight;
  let blockBetween;
  let valueInfoWidth;
  let number;
  let fontSize;
  let nameTextTop;
  let textTop;
  let nameSize;
  let maxWidth;
  let blankMargin;

  margin = 8;
  topMargin = 30;
  leftMargin = 34;
  bottomMargin = 15;
  baseTongMarginBottom = 80;

  bottomAreaHeight = 420;

  resultAreaWidth = 300;
  areaBetween = 16;

  infoInnerMargin = 18;

  blockHeight = 40;
  blockBetween = 3;

  valueInfoWidth = 160;

  fontSize = 14;
  nameSize = 15;
  nameTextTop = -1;
  textTop = isMac() ? -1 : 1;

  maxWidth = 2000;
  blankMargin = 16;

  infoContents = [
    {
      name: "A",
      description: "디자이너로서 홈스타일링 서비스(가구, 패브릭, 소품 등 고객의 요구 사항에 맞게 프로세스가 있는 스타일링)를 제공 한 경우",
      value: 1,
      valueInfo: "100% 경력 인정",
    },
    {
      name: "B",
      description: "디자이너로서 홈스타일링 서비스를 제공하지 않고, 거주 공간 인테리어 시공 관련 서비스만 제공한 경우",
      value: 0.9,
      valueInfo: "90% 경력 인정",
    },
    {
      name: "C",
      description: "기업에 속해있는 디자이너로서 공간 / 인테리어 관련 프로젝트 진행 시, 클라이언트를 직접 응대한 서비스를 제공한 경우",
      value: 0.8,
      valueInfo: "80% 경력 인정",
    },
    {
      name: "D",
      description: "인테리어 연관 직종 1 - 공간을 토대로 하여 인체에 고려된 적합한 사이즈로 가구를 제작하고, 설치, 가구 디자인 제안",
      value: 0.6,
      valueInfo: "60% 경력 인정",
    },
    {
      name: "E",
      description: "인테리어 연관 직종 2 - 제품 디자인, 조명 디자인, 패브릭 디자인 등",
      value: 0.4,
      valueInfo: "40% 경력 인정",
    },
    {
      name: "F",
      description: "관련 전공이나 고객 응대 경력 없이 '수강'만을 통해 홈스타일링의 과정을 인지하고 있는 정도의 디자이너",
      value: 0,
      valueInfo: "경력 인정하지 않음",
    },
  ];

  bottomAreaHeight = ((blockHeight + blockBetween) * infoContents.length) + (infoInnerMargin + infoInnerMargin - blockBetween);

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : String(0),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      height: "auto",
      animation: "",
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      display: "block",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: colorChip.white,
      paddingTop: String(topMargin) + ea,
      paddingLeft: String(topMargin) + ea,
      width: withOut(topMargin * 2, ea),
      height: "calc(100vh - " + String(belowHeight) + "px - " + String(margin * 3 * 2) + "px - " + String(topMargin) + ea + ")",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });

  this.mainBaseTong = baseTong0;

  up = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(topMargin, ea),
      height: withOut(bottomAreaHeight + areaBetween + topMargin, ea),
      justifyContent: "start",
      alignItems: "start",
      marginBottom: String(areaBetween) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          border: "1px solid " + colorChip.gray3,
          flexDirection: "column",
          width: withOut(resultAreaWidth + areaBetween, ea),
          height: withOut(0, ea),
          borderRadius: String(5) + "px",
          boxSizing: "border-box",
        }
      },
      {
        style: {
          display: "inline-flex",
          border: "1px solid " + colorChip.gray3,
          flexDirection: "column",
          width: String(resultAreaWidth) + ea,
          marginLeft: String(areaBetween) + ea,
          height: withOut(0, ea),
          borderRadius: String(5) + "px",
          boxSizing: "border-box",
        }
      }
    ]
  });
  [ upLeft, upRight ] = [ ...up.children ];

  down = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(topMargin, ea),
      height: String(bottomAreaHeight) + ea,
      justifyContent: "start",
      alignItems: "start",
      marginBottom: String(areaBetween) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          padding: String(infoInnerMargin) + ea,
          paddingBottom: String(infoInnerMargin - blockBetween) + ea,
          width: withOut(resultAreaWidth + areaBetween, ea),
          height: withOut(0, ea),
          borderRadius: String(5) + "px",
          boxSizing: "border-box",
          background: colorChip.gray2,
        }
      },
      {
        style: {
          display: "inline-flex",
          border: "1px solid " + colorChip.gray3,
          flexDirection: "column",
          width: String(resultAreaWidth) + ea,
          marginLeft: String(areaBetween) + ea,
          height: withOut(0, ea),
          borderRadius: String(5) + "px",
          boxSizing: "border-box",
        }
      }
    ]
  });
  [ downLeft, downRight ] = [ ...down.children ];

  number = 0;
  for (let { name, description, value, valueInfo } of infoContents) {

    createNode({
      mother: downLeft,
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        height: String(blockHeight) + ea,
        marginBottom: String(blockBetween) + ea,
        width: withOut(0, ea),
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(blockHeight) + ea,
            height: String(blockHeight) + ea,
            borderRadius: String(1) + "px",
            borderTopLeftRadius: number === 0 ? String(5) + "px" : String(1) + "px",
            borderBottomLeftRadius: number === infoContents.length - 1 ? String(5) + "px" : String(1) + "px",
            background: colorChip.darkDarkShadow,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: name,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(nameSize) + ea,
              fontWeight: String(500),
              color: colorChip.white,
              fontFamily: "graphik",
              top: String(nameTextTop) + ea,
            }
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(blockHeight + valueInfoWidth + (blockBetween * 2), ea),
            height: String(blockHeight) + ea,
            background: colorChip.white,
            marginLeft: String(blockBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(blankMargin * 2, ea),
              height: withOut(0, ea),
              overflow: "scroll",
              textAlign: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: String(maxWidth) + "px",
                left: withOut(50, maxWidth / 2, "px"),
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: description,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  top: String(textTop) + ea,
                }
              }
            }
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(valueInfoWidth) + ea,
            height: String(blockHeight) + ea,
            borderRadius: String(1) + "px",
            borderTopRightRadius: number === 0 ? String(5) + "px" : String(1) + "px",
            borderBottomRightRadius: number === infoContents.length - 1 ? String(5) + "px" : String(1) + "px",
            background: colorChip.white,
            marginLeft: String(blockBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: valueInfo,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(fontSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
              top: String(textTop) + ea,
            }
          }
        },
      ]
    })

    number++;
  }


}

DesignerJs.prototype.calculationView = async function () {
  const instance = this;
  const { ea, belowHeight, grayBarWidth } = this;
  const { colorChip, ajaxJson, sleep, returnGet, withOut } = GeneralJs;
  try {
    const loading = await this.mother.loadingRun();
    const getObj = returnGet();
    const entireMode = getObj.dataonly === "true" && getObj.entire === "true";
    let designers, length;
    let standardBar_mother, style;
    let motherHeight;
    let children, childrenLength;
    let standardBar;
    let totalMother;

    if (!entireMode) {
      this.backGrayBar();
    }
    await this.spreadData(null, true, null);

    designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    length = designers.length;
    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");


    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //standard doms event
    totalMother = this.totalMother;
    standardBar = totalMother.firstChild;
    standardBar_mother = standardBar.cloneNode(false);
    style = {
      position: "fixed",
      height: withOut(100, belowHeight + motherHeight, ea),
      overflow: "scroll",
    };
    for (let i in style) {
      standardBar_mother.style[i] = style[i];
    }

    totalMother.insertBefore(standardBar_mother, standardBar);
    standardBar_mother.appendChild(standardBar);
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (this.designers.pick(this.standardDoms[i].getAttribute("desid")) !== null) {
        this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
        this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
        this.standardDoms[i].style.transition = "all 0s ease";
        this.standardDoms[i].addEventListener("click", (e) => {
          instance.calculationBaseMaker(instance.standardDoms[i].getAttribute("desid"));
        });
        children = this.standardDoms[i].children;
        childrenLength = children.length;
        for (let j = 0; j < childrenLength; j++) {
          children[j].style.color = "inherit";
          children[j].style.transition = "all 0s ease";
        }
      } else {
        this.standardDoms[i].style.display = "none";
      }
    }

    loading.parentNode.removeChild(loading);

    // launching
    this.calculationBaseMaker(this.desid);


  } catch (e) {
    console.log(e);
  }
}
