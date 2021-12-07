const EstimationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = document.getElementById("totalcontents");
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

EstimationJs.prototype.backGrayBar = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip } = GeneralJs;
  createNode({
    mother: totalContents,
    style: {
      position: "absolute",
      background: colorChip.gradientGreen,
      height: String(belowHeight) + ea,
      width: String(100) + '%',
      bottom: String(0) + ea,
      left: String(0) + ea,
      zIndex: String(0),
    }
  });
  createNode({
    mother: totalContents,
    style: {
      position: "absolute",
      background: colorChip.gray0,
      width: String(grayBarWidth) + ea,
      height: String(100) + "vh",
      top: String(0) + ea,
      left: String(0) + ea,
      zIndex: String(0),
    }
  });
}

EstimationJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  totalMother = GeneralJs.nodes.div.cloneNode(true);
  totalMother.classList.add("totalMother");
  totalMother.style.height = "calc(100% - " + String(belowHeight) + ea + ")";

  totalContents.appendChild(totalMother);
  this.totalMother = totalMother;
}

EstimationJs.prototype.listDetailLaunching = function (buiid = '') {
  const instance = this;
  const { ea, totalMother } = this;
  const { scrollTo, sleep } = GeneralJs;
  let loading, pastScrollTop;

  pastScrollTop = totalMother.scrollTop;
  this.buiid = buiid;

  this.mother.loadingRun().then((dom) => {
    loading = dom;
    return sleep(500);
  }).then(() => {
    loading.parentNode.removeChild(loading);
    instance.estimationList(buiid);
    scrollTo(totalMother, pastScrollTop);
  }).catch((err) => {
    console.log(err);
  });

}

EstimationJs.prototype.estimationList = function (buiid = '') {
  const instance = this;
  const { totalMother, ea, grayBarWidth } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll, dateToString } = GeneralJs;
  const cookies = getCookiesAll();
  const mobile = this.media[4];
  const desktop = !mobile;
  const wording = `'+' 버튼을 눌러 견적서를 추가하거나, <b%샘플 파일%b>로 작업한 엑셀 파일을 '+' 버튼으로 드래그 앤 드롭해 견적서를 추가하세요.`;

  const testName0 = [ "김", "배", "박", "강", "임", "서", "이", "최", "허", "피", "유", "우", "원", "백" ];
  const testName1 = [ "창", "규", "공", "지", "해", "민", "혜", "연", "별", "령", "재", "신", "찬", "은", "미", "화", "진", "금", "자", "가", "연", "듀", "오", "록" ];
  const testName2 = [ "우", "창", "리", "규", "공", "헌", "지", "애", "경", "병", "해", "잠", "부", "수", "빈", "민", "혜", "연", "별", "령", "재", "은", "미", "화", "진", "금", "자", "가", "연", "듀", "오", "록", "롱", "마", "간", "나" ];

  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let boxNumber, boxNumberArr;
  let requestBox, boxMargin;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;
  let dateString;
  let baseTongPaddingBottom;
  let mobileOuterMargin;
  let borderRadius;
  let secondFont;
  let plusBarHeight, plusHeight;
  let noticeSize, noticeTextTop;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = 100;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;
  noticeSize = <%% 15, 15, 15, 14, 4 %%>;
  noticeTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  boxMargin = <%% 13, 13, 12, 10, 2 %%>;

  requestSize = <%% 18, 18, 17, 16, 4.4 %%>;
  secondFont = <%% 2, 2, 2, 2, 1 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0 %%>;
  requestWordPaddingTop = <%% (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), 4.8 %%>;
  requestWordPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 4.6 %%>;

  baseTongPaddingBottom = <%% 4, 4, 3, 3, 20 %%>;
  mobileOuterMargin = 4;

  borderRadius = <%% 10, 10, 10, 10, 8 %%>;

  plusBarHeight = <%% 76, 76, 75, 75, 10 %%>;
  plusHeight = <%% 20, 20, 20, 16, 4 %%>;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : String(0),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: withOut((desktop ? margin * 3 : 0) * 2, ea),
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: withOut((plusBarHeight + margin) * 2, ea),
      overflow: "scroll",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    }
  });

  this.estimationBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    dateString = "00.00.00";

    requestBox = createNode({
      mother: baseTong,
      event: {
        click: (e) => {},
        mouseenter: function (e) {
          this.style.transition = "";
        },
        mouseover: function (e) {
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          if (desktop) {
            this.children[0].style.background = colorChip.gray3;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginTop: String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea,
        marginRight: String(boxMargin) + ea,
        marginLeft: String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea,
        marginBottom: String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        cursor: "pointer",
        transition: "all 0s ease",
        transform: "translateY(0px)",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            width: String(100) + '%',
            left: String(0),
            height: String(desktop ? borderRadius : 2) + ea,
            background: colorChip.gray3,
            borderTopRightRadius: String(borderRadius / 2) + "px",
            borderTopLeftRadius: String(borderRadius / 2) + "px",
          }
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: testName0[Math.floor(testName0.length * Math.random())] + testName1[Math.floor(testName1.length * Math.random())] + testName2[Math.floor(testName2.length * Math.random())] + " <b%고객님%b>",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              },
              bold: {
                color: colorChip.black,
                fontWeight: String(300),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
          },
          children: [
            {
              text: dateString,
              style: {
                fontSize: String(requestSize - secondFont) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let i = 1; i < Array.from(requestBox.children).length; i++) {
      if (thisChildWidth <= requestBox.children[i].firstChild.getBoundingClientRect().width) {
        thisChildWidth = requestBox.children[i].firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    if (desktop) {
      boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));
      boxNumberArr.push(boxNumber);
    }

    this.estimationBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.estimationBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
        this.estimationBoxes[i].style.marginTop = String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea;
        this.estimationBoxes[i].style.marginLeft = String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea;
        this.estimationBoxes[i].style.marginBottom = String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea;
      }
    }
  }

  createNode({
    mother: baseTong0,
    event: {
      click: (e) => {},
      mouseenter: function (e) {
        this.style.transition = "";
      },
      mouseover: function (e) {
        this.style.background = colorChip.green;
        this.querySelector("path").setAttribute("fill", colorChip.white);
      },
      mouseleave: function (e) {
        this.style.background = desktop ? colorChip.gray0 : colorChip.gray1;
        this.querySelector("path").setAttribute("fill", colorChip.gray5);
      }
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      cursor: "pointer",
    },
    children: [
      {
        mode: "svg",
        source: this.mother.returnAddition(colorChip.gray5),
        style: {
          width: String(plusHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: baseTong0,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(0) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    },
    children: [
      {
        text: wording,
        style: {
          position: "relative",
          fontSize: String(noticeSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(noticeTextTop) + ea,
        },
        bold: {
          fontSize: String(noticeSize) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          cursor: "pointer",
        }
      }
    ]
  });

  this.mainBaseTong = baseTong0;
}

EstimationJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { ajaxJson } = GeneralJs;

    this.belowHeight = <%% 123, 123, 123, 123, 0 %%>;
    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    this.backGrayBar();
    this.baseMaker();
    this.listDetailLaunching();



  } catch (e) {
    console.log(e);
  }
}
