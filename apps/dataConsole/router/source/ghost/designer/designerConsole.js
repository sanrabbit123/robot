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
    "designer": true,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.designer + ' 디자이너님 콘솔');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.designer + ' 디자이너님 콘솔');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerConsole",
  "route": [
    "designerConsole",
    "console",
    "DC",
    "survey"
  ]
} %/%/g

const DesignerConsoleJs = function () {
  this.mother = new GeneralJs();
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.totalContents = document.getElementById("totalcontents");
}

DesignerConsoleJs.prototype.consoleStatics = function (mode = "random") {
  const instance = this;
  let color, emoji, title, contents, index;

  color = [
    "darkseagreen",
    "indianred",
    "lightseagreen",
    "darkkhaki",
    "rosybrown",
  ];

  emoji = [
    "U+1F604",
    "U+1F609",
    "U+1F60A",
    "U+1F60E",
    "U+1F929",
    "U+1F61A",
    "U+1F917",
    "U+1F60C",
  ];

  title = [
    "기본 정보 관리",
    "디자이너 리포트",
    "일정 관리",
    "의뢰서 보기",
    "프로젝트 관리",
  ];

  contents = [
    [
      "기본적인 인적 사항과 업무 특성, 스타일 경향성 등을 체크하실 수 있습니다. 이 정보는 <b%제안시 중요한 근거가 되고, 일부 정보는 고객님께 직접 제공되니 정확하게 기입%b>해주세요! &#x1F913;",
      "기본적인 정보을 체크하실 수 있습니다. <b%제안시 중요한 근거가 되고, 일부는 고객님께 제공되니 정확하게 기입%b>해주세요! &#x1F913;",
    ],
    [
      "홈리에종이 디자이너님을 누구에게 어떤 방식으로 <b%제안했고, 어떤 고객님과 연결이 되어 진행을 했는지, 얼마가 정산 되었는지%b> 등의 정보를 표 형식으로 볼 수 있는 페이지입니다. &#x1F609;",
      "홈리에종이 디자이너님을 누구에게 <b%제안했고, 정산 되었는지%b> 등의 정보를 표 형식으로 볼 수 있는 페이지입니다. &#x1F609;",
    ],
    [
      "디자이너님이 프로젝트가 가능한 일자를 표시하고, 월별로 가능한 프로젝트 개수를 기입할 수 있는 페이지입니다. <b%이 일정을 기반으로 고객님께 제안되니 정확하게 기입%b>해주세요! &#x1F9D0;",
      "디자이너님이 프로젝트가 가능한 일자를 표시하는 페이지입니다. <b%이 일정을 기반으로 제안되니 정확하게 기입%b>해주세요! &#x1F9D0;",
    ],
    [
      "계약금을 지불하신 고객님과 현장 미팅을 위한 <b%홈스타일링 의뢰서의 목록과 상세 사항을 보실 수 있는 페이지%b>입니다! PDF 추출 기능을 통해 문서 형태로 출력하실 수도 있습니다! &#x1F973;",
      "계약금을 지불하신 고객님과 현장 미팅을 위한 <b%홈스타일링 의뢰서의 목록과 상세 사항을 보실 수 있는 페이지%b>입니다! &#x1F973;",
    ],
  ];

  index = [
    0,
    4,
    1,
    6
  ];

  if (mode === "random") {

    color = color[Math.floor(Math.random() * color.length)];
    emoji = emoji[Math.floor(Math.random() * emoji.length)];

    return { color, emoji };

  } else if (mode === "dashboard") {

    return { title, contents, index };

  } else if (mode === "all") {

    color = color[Math.floor(Math.random() * color.length)];
    emoji = emoji[Math.floor(Math.random() * emoji.length)];

    return { color, emoji, title, contents, index };

  } else {
    throw new Error("invaild mode");
  }
}

DesignerConsoleJs.prototype.navigatorLaunching = function () {
  const instance = this;
  const { ea, designer, desid, modes, media, grayBarWidth, tabletWidth } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, scrollTo, setQueue } = GeneralJs;
  const totalContents = document.getElementById("totalcontents");
  const totalMother = document.querySelector(".totalMother");
  const mother = totalMother.firstChild;
  const mobile = media[4];
  const desktop = !mobile;
  const menuClassName = "leftMenus";
  const colorFunc = function () {
    if (this.children !== undefined) {
      const doms = document.querySelectorAll(".leftTitles");
      const menus = document.querySelectorAll("." + menuClassName);
      for (let dom of doms) {
        dom.style.color = (dom === this.children[1]) ? colorChip.green : colorChip.black;
      }
      for (let dom of menus) {
        if (dom === this) {
          dom.setAttribute("toggle", "on");
        } else {
          dom.setAttribute("toggle", "off");
        }
      }
    }
  }
  const popupDelete = function () {
    const targets = [ ...document.querySelector(".totalMother").children ].filter((dom) => { return /ASIDE/gi.test(dom.nodeName) });
    for (let dom of targets) {
      dom.remove();
    }
  }
  const menuMap = [
    {
      title: "기본 정보",
      mode: modes[0],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), 0);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            scrollTo(document.querySelector(".totalMother"), 0);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "일정 관리",
      mode: modes[3],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        instance.possibleDetailLaunching(desid, () => {
          scrollTo(document.querySelector(".totalMother"), 0);
        });
        instance.mode = modes[3];
        colorFunc.call(this);
      },
    },
    {
      title: "시공 정보",
      mode: modes[0],
      position: 4,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[4]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[4]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "스타일링 정보",
      mode: modes[0],
      position: 5,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[5]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[5]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "정산 정보",
      mode: modes[1],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        if (instance.mode === modes[1]) {
          scrollTo(document.querySelector(".totalMother"), 0);
        } else {
          instance.reportDetailLaunching(desid, () => {
            scrollTo(document.querySelector(".totalMother"), 0);
          });
        }
        instance.mode = modes[1];
        colorFunc.call(this);
      },
    },
    {
      title: "컨텐츠 정보",
      mode: modes[1],
      position: 3,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[1]) {
          scrollTo(document.querySelector(".totalMother"), blocks[blocks.length - 1]);
        } else {
          instance.reportDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[blocks.length - 1]);
          });
        }
        instance.mode = modes[1];
        colorFunc.call(this);
      },
    },
    {
      title: "의뢰서 관리",
      mode: modes[2],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        instance.requestDetailLaunching(desid, () => {
          scrollTo(document.querySelector(".totalMother"), 0);
          if (typeof e.__asyncCallBack__ === "function") {
            e.__asyncCallBack__();
          }
        });
        instance.mode = modes[2];
        colorFunc.call(this);
      },
    },
    {
      title: "상세 일정 기입",
      mode: modes[5],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        instance.scheduleDetailLaunching(desid, () => {
          scrollTo(document.querySelector(".totalMother"), 0);
          if (typeof e.__asyncCallBack__ === "function") {
            e.__asyncCallBack__();
          }
        });
        instance.mode = modes[2];
        colorFunc.call(this);
      },
    },
    {
      title: "프로젝트 관리",
      mode: modes[4],
      position: 0,
      mobile: true,
      event: function (e) {
        popupDelete();
        totalMother.style.background = desktop ? "transparent" : colorChip.gray2;
        instance.pageHistory.unshift({ index: Number(this.getAttribute("index")), status: "page" });
        instance.projectDetailLaunching(desid, () => {
          scrollTo(document.querySelector(".totalMother"), 0);
          if (typeof e.__asyncCallBack__ === "function") {
            e.__asyncCallBack__();
          }
        });
        instance.mode = modes[4];
        colorFunc.call(this);
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
  let naviDesignerWidth;
  let naviBetweenMargin;
  let iconTop;
  let iconWidth;
  let iconIndent;
  let popupTop;
  let menuOnEvent;
  let titleSize;

  cleanChildren(mother);

  this.pageHistory.unshift({ index: 0, status: "page" });

  if (desktop) {

    margin = <%% 40, 31, 27, 24, 35 %%>;
    size = <%% 16, 15, 14, 13, 15 %%>;
    barHeight = 19;
    marginBottom = 23;
    indent = 16;
    menuMargin = <%% 15, 11, 9, 8, 15 %%>;
    secondBold = 500;
    titleSize = <%% 21, 19, 17, 15, 3 %%>;

    mother.style.height = String(100) + '%';
    mother.style.position = "absolute";

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
            menuMap[index].event.call(this, e);
            if (tabletWidth !== 0) {
              setQueue(() => {
                instance.listIcon.click();
              }, 500);
            }
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
        color: colorChip.black,
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
          text: "<b%Designer%b> Console",
          event: {
            click: function (e) {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + GeneralJs.returnGet().desid + "&mode=dashboard";
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
    naviDesignerWidth = 85;
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

            blocks = document.querySelector(".mainBaseTong").firstChild.children;
            menuMap[index].event.call(this, e);
            if (position !== 0 && blocks[position] !== undefined) {
              scrollTo(document.querySelector(".totalMother"), blocks[position], naviHeight);
            }

            self.removeChild(document.getElementById(id1));
            self.removeChild(document.getElementById(id0));

          });
        }

      }
    }

    if (this.listIcon !== undefined && this.listIcon !== null) {
      this.listIcon.addEventListener("click", menuOnEvent("up"));
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
        text: "Designer",
        event: {
          click: function (e) {
            window.location.href = window.location.protocol + "//" + window.location.host + "/middle/console?desid=" + GeneralJs.returnGet().desid + "&mode=dashboard";
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
            window.location.href = window.location.protocol + "//" + window.location.host + "/middle/console?desid=" + GeneralJs.returnGet().desid + "&mode=dashboard";
          }
        },
        style: {
          position: "absolute",
          fontSize: String(size) + "px",
          fontFamily: "graphik",
          fontWeight: String(200),
          color: colorChip.white,
          top: String(fontTop) + "px",
          left: "calc(" + String(fontLeft) + ea + " + " + String(naviDesignerWidth + naviBetweenMargin) + "px" + ")",
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

}

DesignerConsoleJs.prototype.initialLogin = function () {
  const instance = this;
  const { ea, media } = this;
  const { createNode, createNodes, withOut, colorChip, cssInjection, autoHypenPhone } = GeneralJs;
  const totalContents = document.getElementById("totalcontents");
  const mobile = media[4];
  const desktop = !mobile;
  let width, height, size;
  let left0, left1;
  let whiteWidth, whiteHeight, whiteTop;
  let loadingWidth, loadingMargin, loadingTopMargin;
  let total, input;
  let vaildFunction;
  let size2;

  cssInjection(`.greenInput::placeholder { color: ${colorChip.green};font-weight: 500; opacity: 0.9 }`);

  size = <%% 34, 34, 34, 34, 7 %%>;

  width = <%% 276, 276, 276, 276, 57 %%>;
  height = <%% 170, 170, 170, 170, 38 %%>;

  left0 = 0;
  left1 = <%% 156, 156, 156, 156, 32 %%>;

  whiteWidth = <%% 236, 236, 236, 236, 47 %%>;
  whiteHeight = <%% 40, 40, 40, 40, 9 %%>;
  whiteTop = <%% 56, 56, 56, 56, 12 %%>;

  loadingWidth = <%% 29, 29, 29, 29, 7 %%>;
  loadingTopMargin = <%% 5, 5, 5, 5, 1 %%>;
  loadingMargin = <%% 11, 11, 11, 11, 3 %%>;

  size2 = <%% 16, 16, 16, 16, 3.6 %%>;

  total = {};

  vaildFunction = function (input, value) {
    let newInput, certification, pass;
    let randomArr, randomKey, randomStr, randomValue;

    randomArr = window.crypto.getRandomValues(new Uint32Array(10));
    randomKey = randomArr[Math.floor(Math.random() * 10)];
    randomStr = String(randomKey);

    if (randomStr.length > 4) {
      randomValue = randomStr.slice(0, 4);
    } else {
      randomValue = randomStr;
      for (let i = randomStr.length; i < 4; i++) {
        randomValue += String(Math.floor(Math.random() * 10));
      }
      randomValue = randomStr;
    }

    certification = randomValue;

    if (value.trim() === "010-2747-3403") {
      value = "010-6310-0284";
    }

    GeneralJs.ajaxJson({ noFlat: true, whereQuery: { "information.phone": value.trim() } }, "/getDesigners", { equal: true }).then((designers) => {
      if (designers.length === 0) {
        window.alert("전화번호를 정확히 입력해주세요!");
        input.value = "";
        pass = false;
      } else {
        const [ designer ] = designers;
        instance.designer = designer;
        instance.desid = designer.desid;
        newInput = input.cloneNode(true);
        input.parentNode.appendChild(newInput);
        newInput.value = "";
        newInput.setAttribute("placeholder", "인증번호를 입력해주세요!");
        input.style.display = "none";
        newInput.focus();
        pass = true;

        return GeneralJs.ajaxPromise({
          name: designer.designer,
          phone: designer.information.phone,
          certification,
        }, BACKHOST + "/certification");

      }
    }).then((message) => {
      if (pass) {
        newInput.addEventListener("keyup", function (e) {
          this.value = this.value.replace(/[^0-9]/g, '');
          if (this.value.length === 4) {
            if (certification === this.value) {
              instance.consoleView().then(() => {
                total.style.animation = "justfadeoutoriginal 0.2s ease forwards";
                return GeneralJs.sleep(200);
              }).then(() => {
                total.parentNode.removeChild(total);
                localStorage.setItem('desid', instance.desid);
              }).catch((err) => {
                console.log(err);
              });
            } else {
              window.alert("인증번호를 정확히 입력해주세요!");
              this.value = "";
            }
          }
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  total = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      width: String(100) + '%',
      height: String(100) + '%',
      top: String(0),
      left: String(0),
      background: colorChip.gradientGreen4,
      animation: "justfadeinoriginal 0.2s ease forwards",
      zIndex: String(500),
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(width) + ea,
          height: String(height) + ea,
          top: withOut(50, height / 2, ea),
          left: withOut(50, width / 2, ea),
          background: "transparent",
          opacity: String(0),
          animation: "fadeupdelay 0.3s 0.4s ease forwards",
        },
        children: [
          {
            text: "Designer",
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(left0) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(500),
              fontFamily: "graphik",
              fontStyle: "italic",
              color: colorChip.white
            }
          },
          {
            text: "console",
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(left1) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(200),
              fontFamily: "graphik",
              color: colorChip.white
            }
          },
          {
            mode: "svg",
            source: this.mother.returnLoading(colorChip.white, colorChip.whiteGreen),
            class: [ "loading" ],
            style: {
              position: "absolute",
              top: String(whiteTop + loadingTopMargin) + ea,
              left: String(0),
              width: String(loadingWidth) + ea,
            }
          },
          {
            style: {
              position: "absolute",
              width: String(whiteWidth) + ea,
              left: String(loadingWidth + loadingMargin) + ea,
              height: String(whiteHeight) + ea,
              borderRadius: String(3) + "px",
              top: String(whiteTop) + ea,
              background: colorChip.white,
              overflow: "hidden",
            },
            children: [
              {
                mode: "input",
                attribute: [
                  { type: "text" },
                  { placeholder: "핸드폰 번호를 알려주세요!" },
                ],
                class: [ "greenInput" ],
                events: [
                  {
                    type: "keyup",
                    event: function (e) {
                      this.value = autoHypenPhone(this.value);
                      if (e.key !== "Enter" && /^01[0-9]\-[0-9][0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]$/.test(this.value.trim())) {
                        vaildFunction(this, this.value);
                      }
                    }
                  },
                  {
                    type: "keypress",
                    event: function (e) {
                      if (e.key === "Enter") {
                        vaildFunction(this, this.value);
                      }
                    }
                  }
                ],
                style: {
                  position: "absolute",
                  border: String(0),
                  outline: String(0),
                  width: String(100) + '%',
                  height: String(desktop ? 98 : 94) + '%',
                  top: String(0),
                  left: String(0),
                  fontSize: String(size2) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  textAlign: "center",
                  background: "transparent",
                  boxSizing: "border-box",
                }
              }
            ]
          }
        ]
      }
    ]
  });

  total.querySelector("input").focus();

}

DesignerConsoleJs.prototype.dashboardWordings = function () {
  const instance = this;
  const { returnGet, blankHref } = GeneralJs;
  return {
    wordings: {
      title: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=dashboard";
        },
        text: [ "Designer", "console" ],
      },
      calendar: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=possible";
        },
        text: [ "가능 일정 관리", "Calendar" ],
      },
      request: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=request";
        },
        text: [ "의뢰서 관리", "Request" ],
      },
      report: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=report";
        },
        text: [ "정산 관리", "Report" ],
      },
      contents: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=report";
        },
        text: [ "컨텐츠 관리", "Contents" ],
      },
      care: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=project";
        },
        text: [ "프로젝트 케어", "Project" ],
      },
      web: {
        event: function (e) {
          blankHref(FRONTHOST);
        },
        text: [ "HomeLiaison", "web" ],
      },
      setting: {
        event: function (e) {
          blankHref(FRONTHOST + "/desdetail.php");
        },
        text: [ "Web", "setting" ],
      },
      checklist: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=checklist";
        },
        text: [ "체크리스트", "Checklist" ],
      },
      info: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=checklist";
        },
        text: [ "기본 정보", "Info" ],
      },
      work: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=checklist";
        },
        text: [ "작업 정보", "Work" ],
      },
      style: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=checklist";
        },
        text: [ "스타일 정보", "Style" ],
      },
      construct: {
        event: function (e) {
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=checklist";
        },
        text: [ "시공 정보", "Construct" ],
      },
      notice: {
        event: function (e) {

        },
        text: [ "공지 사항", "Notice" ],
      },
      ongoing: {
        event: function (e) {

        },
        text: [ "진행 현황", "Ongoing" ],
      },
      proposal: {
        event: function (e) {

        },
        text: [ "제안 현황", "Proposal" ],
      },
    },
    methods: {
      justMerge(obj) {
        const arr = obj.text;
        return arr.join(' ');
      },
      greenMerge(obj) {
        const arr = obj.text;
        return `${arr[0]}\n<b%${arr[1]}%b>`;
      },
      smallMerge(obj) {
        const arr = obj.text;
        let first, second, target;
        target = arr[0].split(' ');
        second = target.pop();
        first = target.join(' ');
        return `${first}\n${second}`;
      },
      englishMerge(obj) {
        const arr = obj.text;
        return arr[1];
      }
    }
  }
}

DesignerConsoleJs.prototype.consoleDashboard = function (desid) {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth, totalMother } = this;
  const { members, slackNotices, media, designer } = this;
  const { createNode, colorChip, withOut, blankHref, isMac, cleanChildren, setQueue, ajaxJson, dateToString } = GeneralJs;
  const { wordings, methods: { justMerge, greenMerge, smallMerge, englishMerge } } = this.dashboardWordings();
  const vh = "vh";
  const vw = "vw";
  const ongoingTongClassName = "memberTong";
  const noticeTongClassName = "noticeTong";
  const thisHost = window.location.protocol + "//" + window.location.host;
  let outerMargin;
  let motherBox;
  let childrenBox;
  let middleBox;
  let innerMargin;
  let boxWidth0, boxWidth1;
  let boxHeight0, boxHeight1;
  let whiteRadius;
  let ongoingBlock, mainTitleBlock, calendarBlock, requestBlock, reportBlock, contentsBlock, projectsBlock, webBlock, webSettingBlock, checklistBlock, basicBlock, workBlock, styleBlock, constructBlock, noticeBlock;
  let firstMother, secondMother, thirdMother, fourthMother;
  let tempMother;
  let titleSize, subSize, lineHeight;
  let title2Size, title3Size;
  let visualTop, visualTop2;
  let onlineBoxTop, onlineBoxTitleTop, onlineBoxLeft;
  let onlineWordingSize;
  let onlineBoxHeight0, onlineBoxBetween;
  let onlineBoxInnerMargin;
  let onlineBoxInnerMarginTop;
  let memberTong;
  let memberBlockPaddingLeft;
  let memberBlockMarginBottom;
  let memberBlockWidth;
  let memberBlockTop, memberBlockTop2, memberBlockLeft;
  let memberBlockSize;
  let memberBlockPaddingRight;
  let homeliaisonWifiKey, hubSeongSuWifiKey;
  let alive;
  let noticeTong;
  let noticeSize, noticeDateSize;
  let noticePaddingLeft, noticePaddingTop, noticePaddingBottom;
  let noticeMarginBottom;
  let onlineTextTop;
  let desktopMode, tabletMode, mobileMode;
  let desktop, mobile;
  let mobileBoxHeight;
  let mobileBoxWidth0, mobileBoxWidth1, mobileBoxWidth2, mobileBoxWidth3;
  let mobileTitleSize;
  let mobileTitleZoneHeight, mobileTitleMarginBottom;
  let mobileBackgroundHeight;
  let mobileFinalMarginBottom;
  let backgroundWidth;
  let mobileLineHeight, mobileLineHeight2;
  let mobileMainSize, mobileMainSize2, mobileSubSize;
  let squareMode;
  let mobileOngoingPaddingLeft, mobileOngoingPaddingTop, mobileOngoingPaddingBottom;
  let mobileOngoingWordingPaddingLeft, mobileOngoingWordingMarginBottom;
  let mobileOngoingWhite;
  let mobileOngoingLineTop;
  let mobileOngoingTitleSize;
  let mobileOngoingTitleMarginBottom;
  let mobileNoticeSize;
  let mobileNoticeLineheight;
  let mobileNoticePaddingLeft;
  let mobileNoticePaddingTop;
  let mobileNoticePaddingBottom;
  let mobileNoticeMarginBottom;
  let mobileOngoingTextTop;

  if (window.innerWidth <= 780) {
    desktopMode = false;
    tabletMode = false;
    mobileMode = true;
    squareMode = false;
    desktop = false;
    mobile = true;
  } else {
    desktop = true;
    mobile = false;
    if (window.innerWidth / window.innerHeight > 1.71) {
      desktopMode = true;
      tabletMode = false;
      mobileMode = false;
      squareMode = false;
    } else {
      desktopMode = false;
      tabletMode = true;
      mobileMode = false;
      if (window.innerWidth / window.innerHeight < 1.32) {
        squareMode = true;
      } else {
        squareMode = false;
      }
    }
  }

  outerMargin = <%% 30, 30, 28, 24, 6 %%>;
  innerMargin = <%% 5, 5, 4, 3, 1.5 %%>;
  whiteRadius = <%% 8, 8, 7, 6, 3 %%>;

  if (mobile) {
    outerMargin = 6;
    innerMargin = 1.8;
    whiteRadius = 3;
  }

  titleSize = 2.6;
  title2Size = 2.3;
  title3Size = 2.3;
  subSize = 2;
  lineHeight = 1.02;
  lineHeight2 = 1.25;
  visualTop = -5;
  visualTop2 = isMac() ? -3 : 0;

  onlineWordingSize = 1.7;
  onlineBoxTitleTop = 2.2;
  onlineBoxLeft = 2.7;
  onlineBoxTop = 5.4;
  onlineTextTop = 0;

  onlineBoxHeight0 = 3;
  onlineBoxBetween = 1;
  memberBlockPaddingLeft = 1.1;
  memberBlockMarginBottom = <%% 10, 9, 8, 7, 1 %%>;
  onlineBoxInnerMarginTop = 2;
  memberBlockWidth = <%% 5, 5, 4, 3, 1 %%>;
  memberBlockTop = <%% 6, 6, 5, 4, 1.5 %%>;
  memberBlockTop2 = <%% 8, 8, 7, 6, 1.5 %%>;
  memberBlockLeft = 0;
  memberBlockSize = <%% 14, 13, 12, 11, 3.1 %%>;
  memberBlockPaddingRight = 1;

  noticeSize = 1.2;
  noticeDateSize = 0.8;
  noticePaddingLeft = 1.5;
  noticePaddingTop = isMac() ? 1 : 1.2;
  noticePaddingBottom = 1.4;
  noticeMarginBottom = 0.5;

  mobileTitleSize = 4.8;
  mobileTitleZoneHeight = 10;
  mobileTitleMarginBottom = 6;
  mobileBackgroundHeight = 34;
  mobileFinalMarginBottom = 42;

  backgroundWidth = <%% 210, 180, 180, 180, 0 %%>;

  boxWidth0 = boxHeight0 = "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2) + (innerMargin * 2)) + ea + ") / " + String(2.5) + ")";
  boxWidth1 = boxHeight1 = "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2) + (innerMargin * 2)) + ea + ") / " + String(5) + ")";

  mobileLineHeight = 1;
  mobileMainSize = 4.7;
  mobileLineHeight2 = 1.3;
  mobileMainSize2 = 4.1;
  mobileSubSize = 3.2;

  mobileOngoingPaddingLeft = 5;
  mobileOngoingPaddingTop = 3.6;
  mobileOngoingPaddingBottom = 4;

  mobileOngoingWordingPaddingLeft = 1.8;
  mobileOngoingWordingMarginBottom = 1.5;

  mobileOngoingWhite = 2;
  mobileOngoingLineTop = 1.8;

  mobileOngoingTitleSize = 3.5;
  mobileOngoingTitleMarginBottom = 2.7;

  mobileOngoingTextTop = -0.4;

  mobileNoticeSize = 2.8;
  mobileNoticeLineheight = 1.5;

  mobileNoticePaddingLeft = 3.8;
  mobileNoticePaddingTop = 3.1;
  mobileNoticePaddingBottom = 3.4;
  mobileNoticeMarginBottom = 1;

  if (desktop) {
    totalMother.style["min-width"] = "calc(" + boxWidth0 + " * 4.5)";
  } else {
    totalMother.style.paddingTop = String(outerMargin) + ea;
    totalMother.style.height = withOut(outerMargin, ea);
  }
  totalMother.style.background = colorChip.gray3;
  totalMother.firstChild.style.display = "none";

  motherBox = createNode({
    mother: totalMother,
    style: {
      position: "relative",
      display: "block",
      width: desktop ? withOut(outerMargin * 2, ea) : String(100 - (outerMargin * 2)) + vw,
      height: desktop ? withOut(outerMargin * 2, ea) : "",
      top: desktop ? String(outerMargin) + ea : "",
      left: desktop ? String(outerMargin) + ea : "",
      marginLeft: desktop ? "" : String(outerMargin) + vw,
    }
  });

  if (!mobileMode) {

    createNode({
      mother: motherBox,
      style: {
        position: "absolute",
        top: String(outerMargin * -1) + ea,
        left: String(outerMargin * -1) + ea,
        width: String(backgroundWidth) + ea,
        height: "calc(100% + " + String(outerMargin * 2) + ea + ")",
        backgroundImage: "url('/middle/meeting/back.jpg')",
        backgroundSize: "auto 100%",
        backgroundPosition: "12% 0%",
      }
    });

    if (desktopMode) {
      firstMother = createNode({
        mother: motherBox,
        style: {
          position: "relative",
          display: "inline-block",
          width: boxWidth0,
          height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
          marginRight: String(innerMargin) + ea,
          verticalAlign: "top",
          opacity: String(0),
          animation: "fadeuporiginal 0.5s ease 0.1s forwards",
        },
        children: [
          {
            style: {
              position: "relative",
              paddingTop: String(onlineBoxTop) + vh,
              display: "block",
              width: boxWidth0,
              height: "calc(calc(calc(100% - " + boxHeight1 + ") - " + String(innerMargin) + ea + ") - " + String(onlineBoxTop) + vh + ")",
              borderRadius: String(whiteRadius) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              marginBottom: String(innerMargin) + ea,
            },
            children: [
              {
                text: englishMerge(wordings.ongoing),
                style: {
                  position: "absolute",
                  fontSize: String(onlineWordingSize) + vh,
                  fontFamily: "graphik",
                  fontWeight: String(400),
                  top: String(onlineBoxTitleTop) + vh,
                  left: String(onlineBoxLeft) + vh,
                  color: colorChip.green,
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  left: String(onlineBoxLeft) + vh,
                  width: withOut(onlineBoxLeft * 2, vh),
                  height: withOut(onlineBoxHeight0, vh),
                  boxSizing: "border-box",
                  border: "1px solid " + colorChip.gray4,
                  borderRadius: String(5) + "px",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(onlineBoxInnerMarginTop) + vh,
                      left: String(onlineBoxInnerMarginTop) + vh,
                      width: withOut(onlineBoxInnerMarginTop * 2, vh),
                      height: withOut(onlineBoxInnerMarginTop * 1, vh),
                      overflow: "scroll",
                    },
                    children: [
                      {
                        class: [ ongoingTongClassName ],
                        style: {
                          display: "block",
                          position: "relative",
                          top: String(0),
                          left: String(0),
                          width: String(100) + '%',
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            style: {
              position: "relative",
              display: "flex",
              width: boxWidth0,
              height: boxHeight1,
              borderRadius: String(whiteRadius) + ea,
              background: colorChip.white,
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            event: { click: wordings.title.event },
            children: [
              {
                class: [ "hoverDefault_lite" ],
                text: justMerge(wordings.title),
                style: {
                  color: colorChip.green,
                  fontSize: String(title3Size) + vh,
                  textAlign: "center",
                  fontWeight: String(500),
                  lineHeight: String(lineHeight),
                  fontFamily: "graphik",
                  position: "relative",
                  top: String(visualTop) + ea,
                  fontStyle: "italic",
                },
              }
            ]
          },
        ]
      });
      ongoingBlock = firstMother.firstChild;
      mainTitleBlock = firstMother.lastChild;

      memberTong = firstMother.querySelector('.' + ongoingTongClassName);
    }

    for (let project of designer.projects) {
      createNode({
        mother: memberTong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(memberBlockPaddingLeft * 1, vh),
          paddingLeft: String(memberBlockPaddingLeft) + vh,
          marginBottom: String(memberBlockMarginBottom) + ea,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnRound(String(memberBlockWidth / 2) + ea, /^[완드]/gi.test(project.process.status) ? colorChip.deactive : colorChip.green),
            style: {
              position: "absolute",
              width: String(memberBlockWidth) + ea,
              height: "",
              top: String(memberBlockTop) + ea,
              left: String(memberBlockLeft) + vh,
            }
          },
          {
            text: project.name + " 고객님",
            style: {
              display: "inline-block",
              position: "relative",
              background: colorChip.white,
              fontSize: String(memberBlockSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              paddingRight: String(memberBlockPaddingRight) + vh,
              top: String(onlineTextTop) + vh,
            }
          },
          {
            text: project.process.status + ", " + project.process.action,
            style: {
              position: "absolute",
              right: String(0),
              top: String(0),
              background: colorChip.white,
              fontSize: String(memberBlockSize) + ea,
              fontWeight: String(300),
              color: /^[완드]/gi.test(project.process.status) ? colorChip.deactive : colorChip.green,
            }
          }
        ]
      });
    }

    secondMother = createNode({
      mother: motherBox,
      style: {
        position: "relative",
        display: "inline-block",
        width: boxWidth0,
        height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
        marginRight: String(innerMargin) + ea,
        verticalAlign: "top",
        opacity: String(0),
        animation: "fadeuporiginal 0.5s ease 0.2s forwards",
      },
      children: [
        {
          style: {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: boxWidth0,
            height: boxHeight0,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginBottom: String(innerMargin) + ea,
            cursor: "pointer",
          },
          event: { click: wordings.calendar.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: greenMerge(wordings.calendar),
              style: {
                color: colorChip.black,
                fontSize: String(titleSize) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight),
              },
              bold: {
                color: colorChip.green,
                fontSize: String(subSize) + vh,
                fontFamily: "graphik",
                fontWeight: String(400),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            width: boxWidth0,
            height: boxHeight0,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginBottom: String(innerMargin) + ea,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          event: { click: wordings.request.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: greenMerge(wordings.request),
              style: {
                color: colorChip.black,
                fontSize: String(titleSize) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight),
              },
              bold: {
                color: colorChip.green,
                fontSize: String(subSize) + vh,
                fontFamily: "graphik",
                fontWeight: String(400),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginRight: String(innerMargin) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.report.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.report),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.contents.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.contents),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
      ]
    });
    calendarBlock = secondMother.children[0];
    requestBlock = secondMother.children[1];
    reportBlock = secondMother.children[2];
    contentsBlock = secondMother.children[3];

    thirdMother = createNode({
      mother: motherBox,
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(" + boxWidth0 + " * 2) + " + String(innerMargin) + ea + ")",
        height: "calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ")",
        marginRight: String(innerMargin) + ea,
        verticalAlign: "top",
        opacity: String(0),
        animation: "fadeuporiginal 0.5s ease 0.3s forwards",
      },
      children: [
        {
          style: {
            position: "relative",
            width: boxWidth0,
            height: boxHeight0,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gradientGreen,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginBottom: String(innerMargin) + ea,
            marginRight: String(innerMargin) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.care.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: greenMerge(wordings.care),
              style: {
                color: colorChip.whiteBlack,
                fontSize: String(titleSize) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight),
              },
              bold: {
                color: colorChip.whiteBlack,
                fontSize: String(subSize) + vh,
                fontFamily: "graphik",
                fontWeight: String(400),
                opacity: String(0.7),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: boxWidth0,
            height: boxHeight0,
            marginBottom: String(innerMargin) + ea,
          },
          children: [
            {
              style: {
                position: "relative",
                display: "flex",
                width: boxWidth0,
                height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
                borderRadius: String(5) + ea,
                backgroundImage: "url('/middle/proposal/back.jpg')",
                backgroundSize: "100% auto",
                backgroundPosition: "50% 50%",
                boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
                marginBottom: String(innerMargin) + ea,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              event: { click: wordings.web.event },
              children: [
                {
                  class: [ "hoverDefault_lite" ],
                  text: justMerge(wordings.web),
                  style: {
                    color: colorChip.whiteBlack,
                    fontSize: String(title3Size) + vh,
                    textAlign: "center",
                    fontWeight: String(500),
                    lineHeight: String(lineHeight),
                    fontFamily: "graphik",
                    position: "relative",
                    top: String(visualTop) + ea,
                    fontStyle: "italic",
                  },
                }
              ]
            },
            {
              style: {
                position: "relative",
                display: "flex",
                width: boxWidth0,
                height: "calc(calc(" + boxHeight0 + " - " + String(innerMargin) + ea + ") / 2)",
                borderRadius: String(5) + ea,
                backgroundImage: "url('/middle/curation/back.jpg')",
                backgroundSize: "100% auto",
                backgroundPosition: "50% 50%",
                boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              },
              event: { click: wordings.setting.event },
              children: [
                {
                  class: [ "hoverDefault_lite" ],
                  text: justMerge(wordings.setting),
                  style: {
                    color: colorChip.whiteBlack,
                    fontSize: String(title3Size) + vh,
                    textAlign: "center",
                    fontWeight: String(500),
                    lineHeight: String(lineHeight),
                    fontFamily: "graphik",
                    position: "relative",
                    top: String(visualTop) + ea,
                    fontStyle: "italic",
                  },
                }
              ]
            },
          ]
        },
        {
          style: {
            position: "relative",
            height: boxHeight0,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.white,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginBottom: String(innerMargin) + ea,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          event: { click: wordings.checklist.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: greenMerge(wordings.checklist),
              style: {
                color: colorChip.black,
                fontSize: String(titleSize) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight),
              },
              bold: {
                color: colorChip.green,
                fontSize: String(subSize) + vh,
                fontFamily: "graphik",
                fontWeight: String(400),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginRight: String(innerMargin) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.info.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.info),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginRight: String(innerMargin) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.work.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.work),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            marginRight: String(innerMargin) + ea,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.style.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.style),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(" + boxWidth0 + " - " + String(innerMargin) + ea + ") / 2)",
            height: boxHeight1,
            borderRadius: String(whiteRadius) + ea,
            background: colorChip.gray1,
            boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            verticalAlign: "top",
          },
          event: { click: wordings.construct.event },
          children: [
            {
              class: [ "hoverDefault_lite" ],
              text: smallMerge(wordings.construct),
              style: {
                color: colorChip.black,
                fontSize: String(title2Size) + vh,
                textAlign: "center",
                fontWeight: String(500),
                lineHeight: String(lineHeight2),
                position: "relative",
                top: String(visualTop2) + ea,
              }
            }
          ]
        },
      ]
    });
    [ projectsBlock, tempMother, checklistBlock, basicBlock, workBlock, styleBlock, constructBlock ] = [ ...thirdMother.children ];
    [ webBlock, webSettingBlock ] = [ ...tempMother.children ];

    fourthMother = createNode({
      mother: motherBox,
      style: {
        position: "relative",
        paddingTop: String(onlineBoxTop) + vh,
        display: "inline-block",
        width: "calc(calc(100vw - " + String((outerMargin * 2) + (innerMargin * 4)) + ea + ") - calc(" + boxWidth0 + " * " + String(desktopMode ? 4 : 3) + "))",
        height: "calc(calc(100vh - " + String(belowHeight + (outerMargin * 2)) + ea + ") - " + String(onlineBoxTop) + vh + ")",
        borderRadius: String(whiteRadius) + ea,
        background: colorChip.gray1,
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        verticalAlign: "top",
        transition: "all 0s ease",
        opacity: String(0),
        animation: "fadeuporiginal 0.5s ease 0.4s forwards",
      },
      children: [
        {
          text: englishMerge(wordings.notice),
          style: {
            opacity: String(squareMode ? 0 : 1),
            position: "absolute",
            fontSize: String(onlineWordingSize) + vh,
            fontFamily: "graphik",
            fontWeight: String(400),
            top: String(onlineBoxTitleTop) + vh,
            left: String(onlineBoxLeft) + vh,
            color: colorChip.black,
          }
        },
        {
          class: [ noticeTongClassName ],
          style: {
            opacity: String(squareMode ? 0 : 1),
            display: "block",
            position: "relative",
            left: String(onlineBoxLeft) + vh,
            width: withOut(onlineBoxLeft * 2, vh),
            height: String(100) + '%',
            overflow: "scroll",
          },
        }
      ]
    });
    noticeBlock = fourthMother;
    noticeTong = fourthMother.querySelector("." + noticeTongClassName);

    for (let { text, user, date } of slackNotices) {
      createNode({
        mother: noticeTong,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
          marginBottom: String(noticeMarginBottom) + vh,
        },
        children: [
          {
            text: "<u%" + String(date.getFullYear()).slice(2) + "." + String(date.getMonth() + 1) + "." + String(date.getDate()) + " " + String(date.getHours()) + ":" + String(date.getDate()) + "%u>\n" + text.replace(/\<[^\>]+\>/g, '').trim(),
            style: {
              paddingTop: String(noticePaddingTop) + vh,
              paddingLeft: String(noticePaddingLeft) + vh,
              paddingRight: String(noticePaddingLeft) + vh,
              paddingBottom: String(noticePaddingBottom) + vh,
              fontSize: String(noticeSize) + vh,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(1.6),
            },
            bold: {
              fontSize: String(noticeSize) + vh,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(noticeDateSize) + vh,
              fontWeight: String(600),
              color: colorChip.deactive,
            }
          }
        ]
      })

    }

  } else {

    mobileBoxHeight = String((100 - (outerMargin * 2) - (innerMargin * 2)) / 3) + vw;
    mobileBoxWidth0 = String(100 - (outerMargin * 2)) + vw;
    mobileBoxWidth1 = String((100 - (outerMargin * 2) - (innerMargin * 1)) / 2) + vw;
    mobileBoxWidth2 = String((100 - (outerMargin * 2) - (innerMargin * 2)) / 3) + vw;
    mobileBoxWidth3 = String((((100 - (outerMargin * 2) - (innerMargin * 2)) / 3) * 2) + innerMargin) + vw;

    createNode({
      mother: motherBox,
      style: {
        position: "absolute",
        top: String(-1 * outerMargin) + vw,
        left: String(-1 * outerMargin) + vw,
        width: "calc(100% + " + String(outerMargin * 2) + vw + ")",
        height: String(mobileBackgroundHeight) + vw,
        backgroundImage: "url('/middle/cestimation/moback.jpg')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 22%",
        zIndex: String(-1),
      }
    });

    createNode({
      mother: motherBox,
      style: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        height: String(mobileTitleZoneHeight) + vw,
        marginBottom: String(mobileTitleMarginBottom) + vw,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      children: [
        {
          text: wordings.title.text[0],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(mobileTitleSize) + vw,
            fontWeight: String(400),
            fontFamily: "graphik",
            color: colorChip.white,
            marginRight: String(1) + vw
          }
        },
        {
          text: wordings.title.text[1],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(mobileTitleSize) + vw,
            fontWeight: String(400),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.white,
          }
        },
      ]
    });

    checklistBlock = createNode({
      mother: motherBox,
      event: { click: wordings.checklist.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth1,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        marginRight: String(innerMargin) + vw,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw,
      },
      children: [
        {
          text: greenMerge(wordings.checklist),
          style: {
            color: colorChip.black,
            fontSize: String(mobileMainSize) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight),
          },
          bold: {
            color: colorChip.green,
            fontSize: String(mobileSubSize) + vw,
            fontFamily: "graphik",
            fontWeight: String(400),
          }
        }
      ]
    });

    projectsBlock = createNode({
      mother: motherBox,
      event: { click: wordings.care.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth1,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        background: colorChip.green,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          text: greenMerge(wordings.care),
          style: {
            color: colorChip.white,
            fontSize: String(mobileMainSize) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight),
          },
          bold: {
            color: colorChip.white,
            fontSize: String(mobileSubSize) + vw,
            fontFamily: "graphik",
            fontWeight: String(400),
            opacity: String(0.6),
          }
        }
      ]
    });

    calendarBlock = createNode({
      mother: motherBox,
      event: { click: wordings.calendar.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth2,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        marginRight: String(innerMargin) + vw,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          class: [ "hoverDefault_lite" ],
          text: smallMerge(wordings.calendar),
          style: {
            color: colorChip.black,
            fontSize: String(mobileMainSize2) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight2),
            position: "relative",
          }
        }
      ]
    });

    requestBlock = createNode({
      mother: motherBox,
      event: { click: wordings.request.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth2,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        marginRight: String(innerMargin) + vw,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          class: [ "hoverDefault_lite" ],
          text: smallMerge(wordings.request),
          style: {
            color: colorChip.black,
            fontSize: String(mobileMainSize2) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight2),
            position: "relative",
          }
        }
      ]
    });

    reportBlock = createNode({
      mother: motherBox,
      event: { click: wordings.report.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth2,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          class: [ "hoverDefault_lite" ],
          text: smallMerge(wordings.report),
          style: {
            color: colorChip.black,
            fontSize: String(mobileMainSize2) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight2),
            position: "relative",
          }
        }
      ]
    });

    webBlock = createNode({
      mother: motherBox,
      event: { click: wordings.web.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth0,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        backgroundImage: "url('/middle/curation/back2.jpg')",
        backgroundSize: mobileBoxWidth0 + " auto",
        backgroundPosition: "0% 0%",
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          text: justMerge(wordings.web),
          style: {
            color: colorChip.whiteBlack,
            fontSize: String(mobileMainSize) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight),
            top: String(-1) + vw,
            fontFamily: "graphik",
            position: "relative",
            fontStyle: "italic",
          },
        }
      ]
    });

    contentsBlock = createNode({
      mother: motherBox,
      event: { click: wordings.contents.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth2,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        marginRight: String(innerMargin) + vw,
        background: colorChip.gray0,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          class: [ "hoverDefault_lite" ],
          text: smallMerge(wordings.contents),
          style: {
            color: colorChip.black,
            fontSize: String(mobileMainSize2) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight2),
            position: "relative",
          }
        }
      ]
    });

    webSettingBlock = createNode({
      mother: motherBox,
      event: { click: wordings.setting.event },
      style: {
        display: "inline-flex",
        verticalAlign: "top",
        justifyContent: "center",
        alignItems: "center",
        width: mobileBoxWidth3,
        height: mobileBoxHeight,
        borderRadius: String(5) + "px",
        backgroundImage: "url('/middle/curation/back2.jpg')",
        backgroundSize: mobileBoxWidth0 + " auto",
        backgroundPosition: "100% 100%",
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          text: justMerge(wordings.setting),
          style: {
            color: colorChip.whiteBlack,
            fontSize: String(mobileMainSize) + vw,
            textAlign: "center",
            fontWeight: String(500),
            lineHeight: String(mobileLineHeight),
            top: String(-1) + vw,
            fontFamily: "graphik",
            position: "relative",
            fontStyle: "italic",
          },
        }
      ]
    });

    ongoingBlock = createNode({
      mother: motherBox,
      style: {
        display: "inline-block",
        width: String(100 - (outerMargin * 2) - (mobileOngoingPaddingLeft * 2)) + vw,
        paddingTop: String(mobileOngoingPaddingTop) + vw,
        paddingBottom: String(mobileOngoingPaddingBottom) + vw,
        paddingLeft: String(mobileOngoingPaddingLeft) + vw,
        paddingRight: String(mobileOngoingPaddingLeft) + vw,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(innerMargin) + vw
      },
      children: [
        {
          text: wordings.ongoing.text[1],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(mobileOngoingTitleSize) + vw,
            fontWeight: String(400),
            color: colorChip.green,
            fontFamily: "graphik",
            marginBottom: String(mobileOngoingTitleMarginBottom) + vw,
          }
        }
      ]
    });

    for (let project of designer.projects) {
      createNode({
        mother: ongoingBlock,
        style: {
          display: "block",
          position: "relative",
          width: withOut(mobileOngoingWordingPaddingLeft * 1, vw),
          paddingLeft: String(mobileOngoingWordingPaddingLeft) + vw,
          marginBottom: String(mobileOngoingWordingMarginBottom) + ea,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnRound(String(memberBlockWidth / 2) + ea, /^[완드]/gi.test(project.process.status) ? colorChip.deactive : colorChip.green),
            style: {
              position: "absolute",
              width: String(memberBlockWidth) + ea,
              height: "",
              top: String(memberBlockTop) + ea,
              left: String(memberBlockLeft) + vw,
            }
          },
          {
            style: {
              position: "absolute",
              top: String(0),
              left: String(mobileOngoingWordingPaddingLeft) + ea,
              width: withOut(mobileOngoingWordingPaddingLeft, ea),
              height: String(mobileOngoingLineTop) + vw,
              borderBottom: "1px solid " + colorChip.gray3,
            }
          },
          {
            text: project.name + " 고객님",
            style: {
              display: "inline-block",
              position: "relative",
              background: colorChip.white,
              fontSize: String(memberBlockSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              paddingRight: String(mobileOngoingWhite) + vw,
              top: String(mobileOngoingTextTop) + vw,
            }
          },
          {
            text: project.process.status + ", " + project.process.action,
            style: {
              position: "absolute",
              right: String(0),
              top: String(mobileOngoingTextTop) + vw,
              background: colorChip.white,
              fontSize: String(memberBlockSize) + ea,
              fontWeight: String(300),
              color: /^[완드]/gi.test(project.process.status) ? colorChip.deactive : colorChip.green,
              paddingLeft: String(mobileOngoingWhite) + vw,
            }
          }
        ]
      });
    }

    noticeBlock = createNode({
      mother: motherBox,
      style: {
        display: "inline-block",
        width: String(100 - (outerMargin * 2) - (mobileOngoingPaddingLeft * 2)) + vw,
        paddingTop: String(mobileOngoingPaddingTop) + vw,
        paddingBottom: String(mobileOngoingPaddingBottom) + vw,
        paddingLeft: String(mobileOngoingPaddingLeft) + vw,
        paddingRight: String(mobileOngoingPaddingLeft) + vw,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.darkShadow,
        marginBottom: String(mobileFinalMarginBottom) + vw
      },
      children: [
        {
          text: wordings.notice.text[1],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(mobileOngoingTitleSize) + vw,
            fontWeight: String(400),
            color: colorChip.green,
            fontFamily: "graphik",
            marginBottom: String(mobileOngoingTitleMarginBottom) + vw,
          }
        }
      ]
    });

    for (let { text, date } of slackNotices) {
      createNode({
        mother: noticeBlock,
        style: {
          display: "block",
          position: "relative",
          border: "1px solid " + colorChip.gray3,
          borderRadius: String(5) + "px",
          marginBottom: String(mobileNoticeMarginBottom) + vw,
          paddingLeft: String(mobileNoticePaddingLeft) + vw,
          paddingRight: String(mobileNoticePaddingLeft) + vw,
          paddingTop: String(mobileNoticePaddingTop) + vw,
          paddingBottom: String(mobileNoticePaddingBottom) + vw,
          lineHeight: String(mobileNoticeLineheight),
          boxSizing: "border-box",
        },
        children: [
          {
            text: "<b%" + dateToString(date) + "%b>\n" + text.trim(),
            style: {
              fontSize: String(mobileNoticeSize) + vw,
              color: colorChip.black,
              fontWeight: String(400),
            },
            bold: {
              color: colorChip.green,
              fontWeight: String(600),
            }
          }
        ]
      });
    }

  }

  this.mainBaseTong = motherBox;

}

DesignerConsoleJs.prototype.consoleView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = true;
    const getObj = GeneralJs.returnGet();
    const dashBoardMode = (getObj.mode === "dashboard" || getObj.mode === undefined);

    if (!dashBoardMode) {
      this.backGrayBar();
    }
    await this.spreadData(null, true, "middle");
    if (dashBoardMode) {
      this.totalMother.children[0].style.transition = "all 0s ease";
      this.totalMother.children[0].style.background = "transparent";
    }

    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson, scrollTo, setQueue } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media, desid, tabletWidth } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    let designers, length;
    let boxTong;
    let nodeArr;
    let tempObj;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;
    let projects, clients;
    let targetIndex;
    let eventObject;

    designers = await ajaxJson({ noFlat: true, whereQuery: { desid: getObj.desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      throw new Error("invaild desid");
    }
    length = designers.length;
    this.designers = new Designers(designers);
    this.designer = this.designers.pick(getObj.desid);

    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = "console";
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    this.pageHistory = [];
    window.addEventListener("popstate", (e) => {
      let targets, targetIndex;
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        targets = document.querySelectorAll(".leftMenus");
        if (instance.pageHistory[1].status === "page") {
          if (targets[instance.pageHistory[1].index] !== undefined) {
            targets[instance.pageHistory[1].index].click();
          } else if (instance.menuMap[instance.pageHistory[1].index] !== undefined) {
            instance.menuMap[instance.pageHistory[1].index].event.call(({
              getAttribute: (index) => {
                return instance.pageHistory[1].index;
              }
            }));
          }
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        } else if (instance.pageHistory[1].status === "card") {
          if (targets[instance.pageHistory[1].index] !== undefined) {
            targets[instance.pageHistory[1].index].click();
          } else if (instance.menuMap[instance.pageHistory[1].index] !== undefined) {
            instance.menuMap[instance.pageHistory[1].index].event.call(({
              getAttribute: (index) => {
                return instance.pageHistory[1].index;
              }
            }));
          }
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        }
      }
    });

    this.arrowDomTargets = [];
    if (mobile) {
      this.totalMother.style.background = colorChip.gray2;
    }

    if (dashBoardMode) {

      ajaxJson({ method: "projectMap" }, "/getDataPatch").then((projectMap) => {
        instance.projectMap = projectMap;
        return ajaxJson({ kind: "checklist" }, "/getServicesByKind");
      }).then((checklist) => {
        instance.checklist = checklist;
      }).catch((err) => {
        console.log(err);
      });

      ajaxJson({ noFlat: true, whereQuery: { desid: this.desid } }, "/getProjects", { equal: true }).then((projects) => {
        instance.projects = projects;
        if (projects.length === 0) {
          return [];
        } else {
          return ajaxJson({ noFlat: true, whereQuery: { $or: [ ...new Set(projects.map((obj) => { return obj.cliid; })) ].map((cliid) => { return { cliid }; }) } }, "/getClients", { equal: true });
        }
      }).then((clients) => {
        instance.clients = clients;
        instance.designers.setProjects(instance.projects);
        instance.designers.setClients(instance.clients);
        loading.parentNode.removeChild(loading);
        this.consoleDashboard(this.desid);
      }).catch((err) => {
        console.log(err);
      });

    } else {


      this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: this.desid } }, "/getProjects", { equal: true });
      if (this.projects.length === 0) {
        this.clients = [];
      } else {
        this.clients = await ajaxJson({ noFlat: true, whereQuery: { $or: [ ...new Set(this.projects.map((obj) => { return obj.cliid; })) ].map((cliid) => { return { cliid }; }) } }, "/getClients", { equal: true })
      }
      this.designers.setProjects(this.projects);
      this.designers.setClients(this.clients);

      loading.parentNode.removeChild(loading);

      this.navigatorLaunching();
      if (getObj.mode === undefined) {
        await this.checkListDetailLaunching(desid);
        this.mode = this.modes[0];
      }
    }

    ajaxJson({ method: "projectMap" }, "/getDataPatch").then((projectMap) => {
      instance.projectMap = projectMap;
      return ajaxJson({ kind: "checklist" }, "/getServicesByKind");
    }).then((checklist) => {
      instance.checklist = checklist;
    }).then(() => {
      if (instance.menuMap !== undefined && getObj.mode !== undefined) {
        targetIndex = null;
        for (let i = 0; i < instance.menuMap.length; i++) {
          if (instance.menuMap[i].mode === getObj.mode.trim()) {
            targetIndex = i;
            break;
          }
        }
        if (targetIndex !== null) {
          if (getObj.cliid !== undefined) {
            eventObject = {
              __asyncCallBack__: () => {
                for (let box of instance.requestBoxes) {
                  if (box.getAttribute("cliid") === getObj.cliid.trim()) {
                    box.click();
                  }
                }
              }
            };
          } else {
            eventObject = {};
          }
          if (document.querySelectorAll(".leftMenus").length > 0) {
            instance.menuMap[targetIndex].event.call(document.querySelectorAll(".leftMenus")[targetIndex], eventObject);
          } else {
            instance.menuMap[targetIndex].event.call({
              getAttribute: (index) => {
                return targetIndex;
              }
            }, eventObject);
          }
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    if (!dashBoardMode) {
      if (tabletWidth !== 0) {
        setQueue(() => {
          instance.listIcon.click();
        }, 500);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerConsoleJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const { returnGet, ajaxJson, protoPatch, selfHref } = GeneralJs;
    const getObj = returnGet();
    const desid = getObj.desid;
    const modulePath = "/module/designer";
    const moduleList = [
      "designer.js",
      "checklist.js",
      "report.js",
      "request.js",
      "possible.js",
      "project.js",
      "schedule.js",
    ];
    let motherHost;
    let targetHref;


    motherHost = FRONTHOST + "/designer";
    if (getObj.mode === "checklist") {
      targetHref = motherHost + "/about.php?desid=" + desid;
    } else if (getObj.mode === "report") {
      targetHref = motherHost + "/report.php?desid=" + desid;
    } else if (getObj.mode === "request") {
      targetHref = motherHost + "/requests.php?desid=" + desid;
    } else if (getObj.mode === "possible") {
      targetHref = motherHost + "/possible.php?desid=" + desid;
    } else if (getObj.mode === "project") {
      targetHref = motherHost + "/dashboard.php?desid=" + desid;
    } else {
      targetHref = motherHost + "/dashboard.php?desid=" + desid;
    }

    selfHref(targetHref);

    await protoPatch(instance, moduleList.map((m) => { return `${modulePath}/${m}`; }), `DesignerJs`);

    // GeneralJs.stacks["designerConsoleSseSource"] = new EventSource("https://" + SSEHOST + ":3000/specificsse/projectCard");
    // GeneralJs.stacks["designerConsoleSseEvent"] = function (e) {
    //   instance.projectSseParsing(GeneralJs.equalJson(e.data));
    // }
    // GeneralJs.stacks["designerConsoleSseSource"].addEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);

    loading.parentElement.removeChild(loading);

    this.constructor();
    this.grayBarWidth = <%% 210, 180, 0, 0, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.belowHeight = 0;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = "console";
    this.desid = getObj.desid;

    if (this.desid === "d1701_aa01s") {
      window.localStorage.setItem("desid", "d1701_aa01s");
    }

    // if (typeof getObj.mode !== "string") {
    //   window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + returnGet().desid + "&mode=dashboard";
    // }

    // if (window.localStorage.getItem("desid") === this.desid) {
    //   await this.consoleView();
    // } else {
    //   this.initialLogin();
    // }
    await this.consoleView();

  } catch (e) {
    console.log(e);
  }
}
