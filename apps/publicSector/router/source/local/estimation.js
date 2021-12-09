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

EstimationJs.prototype.navigatorLaunching = function () {
  const instance = this;
  const { ea, media, grayBarWidth, tabletWidth, totalContents, totalMother, motherHeight, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, scrollTo, setQueue } = GeneralJs;
  const mother = totalMother.nextElementSibling;
  const mobile = media[4];
  const desktop = !mobile;
  const menuClassName = "leftMenus";
  const menuMap = [
    {
      title: "견적서 리스트",
      position: 0,
      mobile: true,
      event: function (e) {

      },
    },
    {
      title: "견적서 샘플",
      position: 0,
      mobile: true,
      event: function (e) {

      },
    },
    {
      title: "콘솔 메뉴얼",
      position: 0,
      mobile: true,
      event: function (e) {

      },
    },
  ];
  this.menuMap = menuMap;
  let margin;
  let size;
  let barHeight;
  let marginBottom;
  let indent;
  let menu;
  let menuMargin;
  let secondBold;
  let boxPadding;
  let boxWidth;
  let factorHeight;
  let factorSize;
  let factorTextTop;
  let naviHeight;
  let mobileNavigator;
  let style;
  let fontTop;
  let fontLeft;
  let naviBuilderWidth;
  let naviBetweenMargin;
  let iconTop;
  let iconWidth;
  let iconIndent;
  let popupTop;
  let menuOnEvent;
  let titleSize;
  let radius;
  let left;
  let left2;
  let bottom;
  let color;
  let listIcon;

  if (desktop) {

    margin = <%% 40, 31, 27, 24, 35 %%>;
    size = <%% 16, 15, 14, 13, 15 %%>;
    barHeight = 19;
    marginBottom = 23;
    indent = 16;
    menuMargin = <%% 15, 11, 9, 8, 15 %%>;
    secondBold = 500;
    titleSize = <%% 21, 19, 17, 15, 3 %%>;

    menu = [];
    for (let i = 0; i < menuMap.length; i++) {
      menu.push({
        class: [ "hoverDefault", menuClassName ],
        attribute: [
          { toggle: "off" },
          { index: String(i) },
          { mode: menuMap[i].mode }
        ],
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            // DEV
            if (index === 1) {
              window.alert("아직 서비스 오픈 전입니다!");
            } else {
              menuMap[index].event.call(this, e);
              if (tabletWidth !== 0) {
                setQueue(() => {
                  instance.listIcon.click();
                }, 500);
              }
            }
            // DEV
          }
        },
        style: {
          position: "relative",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
          marginBottom: String(menuMargin) + ea,
        },
        children: [
          {
            text: String(i + 1),
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              fontSize: "inherit",
              fontWeight: String(500),
              color: colorChip.green,
            }
          },
          {
            text: menuMap[i].title,
            class: [ "leftTitles" ],
            style: {
              position: "absolute",
              top: String(0),
              left: String(indent) + ea,
              fontSize: "inherit",
              fontWeight: "inherit",
              color: "inherit",
            }
          },
        ]
      });
    }

    createNode({
      mother,
      style: {
        position: "fixed",
        top: String(margin) + ea,
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        width: String(grayBarWidth + tabletWidth - (margin * 2)) + ea,
        height: withOut(100, margin * 2, ea),
        fontSize: String(size) + ea,
        fontWeight: String(secondBold),
        color: colorChip.black
      },
      children: [
        {
          style: {
            display: tabletWidth === 0 ? "none" : "block",
            position: "absolute",
            top: String(-1 * margin) + ea,
            left: String(-1 * margin) + ea,
            width: withOut(-1 * 2 * margin, ea),
            height: withOut(-1 * 2 * margin, ea),
            boxShadow: "1px 0px 13px -9px " + colorChip.shadow,
            background: colorChip.gray0,
            opacity: String(0.9),
          }
        },
        {
          text: "<b%Builder%b> Console",
          event: {
            click: function (e) {
              window.location.reload();
            }
          },
          style: {
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontFamily: "graphik",
            fontWeight: String(300),
            color: colorChip.black,
            lineHeight: String(1.3),
            cursor: "pointer",
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontFamily: "graphik",
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          style: {
            position: "relative",
            height: String(barHeight) + ea,
            width: String(100) + '%',
            borderBottom: "1px solid " + colorChip.gray4,
            marginBottom: String(marginBottom) + ea,
          }
        },
        ...menu
      ]
    });

  } else {

    mother.style.display = "none";

    boxPadding = 4;
    boxWidth = 45;
    factorHeight = 8.5;
    factorSize = 4;
    factorTextTop = 1.4;
    naviHeight = 60;
    size = 20;
    fontTop = 12;
    fontLeft = 7.2;
    naviBuilderWidth = 68;
    naviBetweenMargin = 7;
    iconTop = 17;
    iconWidth = size + 1;
    iconIndent = 3;
    popupTop = 29;

    menu = [];
    for (let { title, mode, position, mobile } of menuMap) {
      if (mobile) {
        menu.push({
          attribute: [
            { mode },
            { position: String(position) },
            { naviHeight: String(naviHeight) },
          ],
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            height: String(factorHeight) + ea,
          },
          children: [
            {
              text: title,
              attribute: [
                { mode },
                { position: String(position) },
                { naviHeight: String(naviHeight) },
              ],
              style: {
                position: "absolute",
                width: String(100) + '%',
                textAlign: "center",
                fontSize: String(factorSize) + ea,
                fontWeight: String(500),
                top: String(factorTextTop) + ea,
              }
            }
          ]
        });
      }
    }

    this.mobileNavigator = createNode({
      mother,
      style: {
        position: "absolute",
        paddingTop: String(boxPadding) + ea,
        paddingBottom: String(boxPadding) + ea,
        width: String(boxWidth) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        background: colorChip.gray0,
        animation: "fadeuplite 0.2s ease forwards",
      },
      children: menu
    });

    mobileNavigator = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(100) + '%',
      height: String(naviHeight) + "px",
      zIndex: String(2),
      background: "transparent"
    };
    for (let i in style) {
      mobileNavigator.style[i] = style[i];
    }
    totalContents.insertBefore(mobileNavigator, totalMother);

    menuOnEvent = function (direction = "down") {
      return function (e) {
        const self = this;
        const id0 = "mobileMenu_cancelBox";
        const id1 = "mobileMenu_menuBox"
        let mobileNavigator, menus, cancelBox, style;

        cancelBox = GeneralJs.nodes.div.cloneNode(true);
        cancelBox.id = id0;
        style = {
          position: "fixed",
          top: String(0),
          right: String(0),
          width: String(98) + "vw",
          height: String(100) + "%",
          zIndex: String(3),
        };
        for (let i in style) {
          cancelBox.style[i] = style[i];
        }
        cancelBox.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.removeChild(document.getElementById(id1));
          self.removeChild(document.getElementById(id0));
        });
        this.appendChild(cancelBox);

        mobileNavigator = instance.mobileNavigator.cloneNode(true);
        mobileNavigator.id = id1;
        if (direction === "down") {
          mobileNavigator.style.top = String(popupTop) + "px";
        } else {
          mobileNavigator.style.bottom = String(14) + ea;
        }
        mobileNavigator.style.right = String(0);
        mobileNavigator.style.zIndex = String(3);
        mobileNavigator.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
        this.appendChild(mobileNavigator);

        menus = mobileNavigator.children;

        for (let z = 0; z < menus.length; z++) {
          menus[z].setAttribute("mode", menuMap[z].mode);
          menus[z].setAttribute("index", String(z));
          menus[z].classList.add(menuClassName);
          menus[z].addEventListener("click", function (e) {
            const index = Number(this.getAttribute("index"));
            const position = Number(this.getAttribute("position"));
            const naviHeight = Number(this.getAttribute("naviHeight"));
            let blocks;

            // DEV
            if (index === 1) {
              window.alert("아직 서비스 오픈 전입니다!");
            } else {
              blocks = document.querySelector(".mainBaseTong").firstChild.children;
              menuMap[index].event.call(this, e);
              if (position !== 0 && blocks[position] !== undefined) {
                scrollTo(document.querySelector(".totalMother"), blocks[position], naviHeight);
              }

              self.removeChild(document.getElementById(id1));
              self.removeChild(document.getElementById(id0));
            }
            // DEV

          });
        }

      }
    }

    createNodes([
      {
        mother: mobileNavigator,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
        }
      },
      {
        mother: -1,
        style: {
          position: "absolute",
          width: String(100) + '%',
          height: String(100) + '%',
          background: colorChip.black,
          opacity: String(0.88),
          backdropFilter: "blur(" + String(10) + "px" + ")",
          top: String(0),
          left: String(0)
        }
      },
      {
        mother: -2,
        text: "Builder",
        event: {
          click: function (e) {
            window.location.reload();
          }
        },
        style: {
          position: "absolute",
          fontSize: String(size) + "px",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: colorChip.white,
          top: String(fontTop) + "px",
          left: String(fontLeft) + ea,
          cursor: "pointer",
        }
      },
      {
        mother: -3,
        text: "console",
        event: {
          click: function (e) {
            window.location.reload();
          }
        },
        style: {
          position: "absolute",
          fontSize: String(size) + "px",
          fontFamily: "graphik",
          fontWeight: String(200),
          color: colorChip.white,
          top: String(fontTop) + "px",
          left: "calc(" + String(fontLeft) + ea + " + " + String(naviBuilderWidth + naviBetweenMargin) + "px" + ")",
          cursor: "pointer",
        }
      },
      {
        mother: -4,
        events: [
          {
            type: "click",
            event: menuOnEvent(),
          }
        ],
        style: {
          position: "absolute",
          top: String(iconTop) + "px",
          right: String(fontLeft) + ea,
          width: String(iconWidth) + "px",
          height: String(iconWidth) + "px",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: this.mother.returnHamburger(colorChip.white),
            style: {
              position: "absolute",
              top: String(iconIndent) + "px",
              right: String(0),
              height: withOut(100, iconIndent * 2, "px"),
            }
          }
        ]
      },
    ]);

  }

  radius = <%% 20, 18.5, 17, 15, 6 %%>;
  left = <%% 40, 30, 25, 19, 0 %%>;
  left2 = <%% 40, 36, 36, 19, 0 %%>;
  bottom = <%% 40, 36, 30, 22, 7.2 %%>;
  margin = <%% 6, 5, 4, 4, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12, 11, 10, 3.8 %%>;

  listIcon = createNode({
    mother,
    class: [ "iconTong" ],
    style: {
      display: "block",
      position: "fixed",
      height: String(desktop ? motherHeight : (bottom + (radius * 2))) + ea,
      width: String(desktop ? grayBarWidth : (bottom + (radius * 2))) + ea,
      left: desktop ? String(0) : "",
      right: desktop ? "" : String(0),
      bottom: String(0) + ea,
      background: "transparent",
      zIndex: String(2),
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(radius * 2) + ea,
          height: String(radius * 2) + ea,
          bottom: String(bottom) + ea,
          left: String(left) + ea,
          background: color,
          borderRadius: String(radius * 2) + ea,
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: this.mother.returnHamburger(colorChip.whiteIcon),
            style: {
              position: "absolute",
              width: String(radius * 0.9) + ea,
              left: "calc(50% - " + String(radius * 0.45) + ea + ")",
              top: String(iconTop) + ea,
            }
          }
        ]
      }
    ]
  });
  this.iconTong = listIcon;
  this.listIcon = listIcon.children[0];
  listIcon.addEventListener("click", function (e) {
    const totalContents = document.getElementById("totalcontents");
    const totalMother = document.querySelector(".totalMother");
    const grayBack = totalContents.children[1];
    const listPannel = totalMother.nextElementSibling.children[0];
    const mainBaseTong = instance.mainBaseTong;
    const outerMargin = Number(mainBaseTong.style.top.replace(/[^0-9\.\-]/gi, ''));

    if (grayBack.getAttribute("toggle") !== "off") {
      grayBack.style.width = String(0) + ea;
      listPannel.style.transform = "translateX(" + String((instance.grayBarWidth + instance.tabletWidth) * -1) + ea + ")";
      mainBaseTong.style.left = String(outerMargin) + ea;
      mainBaseTong.style.width = withOut(outerMargin * 2, ea);
      instance.listIcon.style.left = String(left2) + ea;
      grayBack.setAttribute("toggle", "off");
    } else {
      grayBack.style.width = String(instance.grayBarWidth) + ea;
      listPannel.style.transform = "translateX(" + String(0) + ea + ")";
      mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
      mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
      instance.listIcon.style.left = String(left) + ea;
      grayBack.setAttribute("toggle", "on");
    }

  });

}

EstimationJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let totalMother, leftPannel, bottomPannel;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      height: "calc(100% - " + String(belowHeight) + ea + ")"
    }
  });

  this.totalMother = totalMother;

  leftPannel = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      left: String(0),
      top: String(0),
      width: String(grayBarWidth) + ea,
      height: String(100) + '%',
    }
  });

  bottomPannel = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      left: String(grayBarWidth) + ea,
      bottom: String(0),
      height: String(belowHeight) + ea,
      width: withOut(grayBarWidth, ea),
    }
  });

  this.mother.searchInput(bottomPannel);
  this.searchInput = this.mother.searchInput;

  this.navigatorLaunching();

  this.searchInput.focus();
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
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const mobile = this.media[4];
  const desktop = !mobile;
  const wording = `+ 버튼을 눌러 견적서를 추가하거나, <b%샘플 파일%b>로 작업한 엑셀 파일을 + 버튼으로 드래그 앤 드롭해 견적서를 추가하세요.`;

  const testName0 = [ "김", "배", "박", "강", "임", "서", "이", "최", "허", "유", "우", "원", "백", "전" ];
  const testName1 = [ "창", "규", "공", "지", "해", "민", "혜", "연", "재", "신", "찬", "은", "미", "화", "진", "금", "자", "가", "연", "오", "간", "수", "형" ];
  const testName2 = [ "우", "창", "리", "규", "공", "헌", "지", "애", "경", "병", "해", "잠", "부", "수", "빈", "민", "혜", "형", "연", "별", "령", "재", "은", "미", "화", "연", "진", "금", "자", "가", "연", "오", "록", "만", "마", "기", "간", "나" ];

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
      width: withOut(0, ea),
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: withOut((plusBarHeight + margin) * 2, ea),
      overflow: "scroll",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      paddingLeft: String(boxMargin * 1.5) + ea,
      paddingRight: String(boxMargin * 0.5) + ea,
      paddingTop: String(boxMargin * 1.5) + ea,
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
        width: "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
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
        this.estimationBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
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
  this.addSearchEvent();
}

EstimationJs.prototype.addSearchEvent = function () {
  const instance = this;
  const { totalMother, ea, searchInput, estimationBoxes } = this;

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      for (let dom of estimationBoxes) {
        if ((new RegExp(this.value.trim(), "gi")).test(dom.textContent)) {
          dom.style.display = "inline-block";
        } else {
          dom.style.display = "none";
        }
      }
    }
  });

}

EstimationJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { ajaxJson } = GeneralJs;

    const invoiceList = await ajaxJson({ buiid: "u2111_aa01s" }, "/publicSector/estimation/base", { equal: true });
    console.log(invoiceList);

    this.belowHeight = <%% 123, 123, 123, 123, 0 %%>;
    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    this.backGrayBar();
    this.baseMaker();
    this.listDetailLaunching();

  } catch (e) {
    console.log(e);
  }
}
