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
  this.ea = "px";
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
  const menuMap = [
    {
      title: "기본 정보",
      mode: modes[0],
      position: 0,
      mobile: true,
      event: function (e) {
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
      mode: modes[0],
      position: 3,
      mobile: true,
      event: function (e) {
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
      title: "의뢰서 정보",
      mode: modes[2],
      position: 0,
      mobile: true,
      event: function (e) {
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
      title: "프로젝트 관리",
      mode: modes[4],
      position: 0,
      mobile: true,
      event: function (e) {
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
          text: "<b%Designer%b> Console",
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

    this.listIcon.addEventListener("click", menuOnEvent("up"));

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

        if (designer.desid === "d1701_aa01s") {
          return GeneralJs.ajaxPromise({
            name: "배창규",
            phone: "010-2747-3403",
            certification,
          }, BRIDGEHOST + "/certification");
        } else {
          return GeneralJs.ajaxPromise({
            name: designer.designer,
            phone: designer.information.phone,
            certification,
          }, BRIDGEHOST + "/certification");
        }

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

DesignerConsoleJs.prototype.consoleDetailLaunching = function (desid) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  window.history.pushState({ path: "console", status: "list", desid }, '');

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.iconTong !== undefined && this.iconTong !== null) {
      this.iconTong.parentElement.removeChild(this.iconTong);
    }
    this.iconTong = null;
    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  ajaxJson({
    page: "console",
    mode: "page",
    who: instance.designer.information.phone,
    desid,
  }, "/ghostDesigner_updateAnalytics").then((message) => {
    console.log(message);
  }).catch((err) => {
    console.log(err);
  });

  this.consoleDetail(desid);
  this.checkListIconSet(desid);
}

DesignerConsoleJs.prototype.consoleDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, findByAttribute, uniqueValue, swipePatch } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, projectMap } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const token = "__split__";
  const detailWhitePopupConst = "detailWhitePopupConst";
  const { color, emoji, title, contents, index } = this.consoleStatics("all");
  let designer;
  let margin;
  let baseTong0, baseTong1, baseTong2, baseTong;
  let tempObj, nodeArr, subNodeArr;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let temp;
  let tong;
  let baseTongMarginBottom;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let divisionEntireMap;
  let baseArea;
  let num, num2;
  let areaBetween;
  let innerPaddingTop;
  let innerPaddingLeft;
  let titleHeight;
  let areaPaddingTop, areaPaddingLeft, areaPaddingBottom;
  let areaTitleTop, areaTitleLeft;
  let fontSize0, fontSize1, fontSize2, fontSize3;
  let mainTitleTextTop, mainTitleTextLeft;
  let countNumberBetween;
  let countNumberTextTop;
  let lastMargin;
  let cardHeight;
  let cardMargin;
  let areaMinHeight;
  let cards;
  let whiteCard, nameWord, idWord;
  let division;
  let divideArr, sizeArr;
  let totalStandard;
  let tempSize;
  let divideNumber;
  let cardWidthConstant;
  let fixedHeightSize;
  let outerMargin;
  let divisionMap;
  let nameFontSize, nameWordTop;
  let idFontSize, idWordTop;
  let intend;
  let between;
  let requestNumber;
  let whiteTong;
  let whiteTongHeight;
  let initialBoxNumber;
  let initialDivide;
  let colorAreaHeight0, colorAreaHeight1;
  let colorAreaHeight;
  let motherMargin;
  let blockMargin;
  let initialWordingSize;
  let twinkleAdditional;
  let twinkleTop;
  let initialWordingTop;
  let innerPaddingMiddle;
  let innerPaddingHigh;
  let mainTitleLineTop0, mainTitleLineTop1;
  let initDescriptionIndent, initDescriptionPaddingTop;
  let fifthTitleMarginTop, fifthTitleMarginBottom, fifthTitle;
  let whiteFlexNum;

  designer = this.designers.pick(desid);
  divisionEntireMap = projectMap.action.itemMap;
  divisionMap = [];
  for (let arr of divisionEntireMap) {
    divisionMap = divisionMap.concat(arr[1]);
  }

  initialBoxNumber = title.length - 1;
  initialDivide = <%% 4, 2, 2, 2, 2 %%>;
  whiteFlexNum = Math.ceil(initialBoxNumber / initialDivide);

  initialWordingSize = <%% 43, 40, 36, 32, 5 %%>;
  twinkleAdditional = <%% 33, 30, 22, 2, 3 %%>;
  initialWordingTop = <%% 80, 80, 80, 80, 8 %%>;
  twinkleTop = <%% -3, -3, -3, -3, -0.2 %%>;
  colorAreaHeight0 = <%% 265, 255, 235, 180, 26 %%>;
  colorAreaHeight1 = <%% 160, 140, 130, 85, 16 %%>;
  colorAreaHeight = colorAreaHeight0 + colorAreaHeight1;

  motherMargin = <%% 40, 40, 40, 40, 4 %%>;
  blockMargin = <%% 15, 12, 10, 8, 1 %%>;

  whiteTongHeight = <%% 360, 360, 360, 360, 36 %%>;

  mainTitleLineTop0 = <%% 10, 10, 10, 10, 1 %%>;
  mainTitleLineTop1 = <%% 2, 2, 2, 2, 0 %%>;

  initDescriptionPaddingTop = <%% 28, 28, 28, 28, 4 %%>;
  initDescriptionIndent = <%% 40, 40, 40, 40, 5 %%>;

  fifthTitleMarginTop = <%% 12, 12, 12, 12, 1 %%>;
  fifthTitleMarginBottom = <%% 16, 16, 16, 16, 0 %%>;
  fifthTitle = title[title.length - 1];

  cardWidthConstant = <%% 140, 140, 140, 140, 14 %%>;
  fixedHeightSize = <%% 40, 40, 40, 40, 7 %%>;

  margin = <%% 8, 8, 8, 8, 1 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  outerMargin = <%% 24, 24, 24, 24, 4 %%>;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = <%% 50, 50, 50, 50, 5 %%>;

  areaBetween = <%% 13, 12, 12, 12, 1.5 %%>;
  innerPaddingTop = <%% 24, 22, 20, 16, 5.2 %%>;
  innerPaddingMiddle = <%% 30, 26, 24, 18, 5 %%>;
  innerPaddingLeft = <%% 36, 32, 30, 24, 6 %%>;
  innerPaddingHigh = <%% 42, 38, 36, 30, 6 %%>;
  titleHeight = <%% 62, 58, 56, 52, 10.5 %%>;

  areaPaddingTop = <%% (isMac() ? 48 : 47), (isMac() ? 48 : 47), (isMac() ? 46 : 45), (isMac() ? 44 : 43), 7.5 %%>;
  areaPaddingLeft = <%% 15, 15, 15, 15, 0 %%>;
  areaPaddingBottom = <%% 15, 15, 15, 15, 0 %%>;

  areaTitleTop = <%% (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), 1.7 %%>;
  areaTitleLeft = <%% 20, 20, 20, 20, 3 %%>;

  fontSize0 = <%% 25, 23, 22, 21, 4 %%>;
  fontSize1 = <%% 16, 16, 15, 14, 2.8 %%>;
  fontSize2 = <%% 14, 14, 13, 12, 3 %%>;
  fontSize3 = <%% 12, 12, 11, 11, 2.5 %%>;

  mainTitleTextTop = <%% -3, -3, -3, -3, 0 %%>;
  mainTitleTextLeft = <%% 3, 3, 3, 3, 1 %%>;
  countNumberBetween = <%% 9, 9, 9, 9, 1 %%>;
  countNumberTextTop = <%% 1, 1, 1, 1, 0 %%>;

  lastMargin = <%% 30, 30, 30, 30, 3 %%>;

  cardHeight = <%% 40, 40, 40, 40, 6 %%>;
  cardMargin = <%% 10, 10, 10, 10, 1.5 %%>;
  areaMinHeight = cardHeight + (cardMargin * 2);

  nameFontSize = <%% 14, 14, 14, 14, 2.8 %%>;
  idFontSize = <%% 11, 11, 11, 11, 2.8 %%>;
  nameWordTop = <%% (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), -0.3 %%>;
  idWordTop = <%% (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), 3 %%>;
  intend = <%% 16, 16, 16, 16, 4 %%>;
  between = <%% 8, 8, 8, 8, 1 %%>;

  cards = designer.projects;

  divideArr = [];
  sizeArr = [];
  for (let i = 0; i < 5; i++) {
    if (desktop) {
      totalStandard = (window.innerWidth - this.grayBarWidth - (outerMargin * 2) - (innerPaddingLeft * 2) - 2 - (areaPaddingLeft * 2) - (((areaPaddingLeft * 2) + areaBetween + 2) * i)) / (i + 1);
    } else {
      totalStandard = (100 - (outerMargin * 2) - (innerPaddingLeft * 2) - (areaPaddingLeft * 2) - (((areaPaddingLeft * 2) + areaBetween + 2) * i)) / (i + 1);
    }
    divideNumber = Math.floor(totalStandard / (cardMargin + cardWidthConstant));
    if (divideNumber === 0) {
      divideNumber = 1;
    }
    tempSize = (totalStandard - (cardMargin * (divideNumber + 1))) / divideNumber;
    divideArr.push(divideNumber);
    sizeArr.push(tempSize);
  }

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(0) + ea : String(60) + "px",
      left: String(grayBarWidth) + ea,
      width: withOut(grayBarWidth, ea),
      height: "auto",
      animation: "",
      paddingTop: String(colorAreaHeight0) + ea,
    }
  });

  baseTong1 = createNode({
    mother: baseTong0,
    style: {
      display: "block",
      position: "relative",
      background: colorChip.gray2,
      paddingTop: String(motherMargin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      paddingLeft: String(motherMargin) + ea,
      paddingRight: String(motherMargin) + ea,
      width: withOut(motherMargin * 2, ea),
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(-1 * colorAreaHeight0) + ea,
          left: String(0),
          width: String(100) + '%',
          height: String(colorAreaHeight) + ea,
          background: color,
        }
      },
      {
        style: {
          position: "absolute",
          top: String(initialWordingTop - colorAreaHeight0) + ea,
          left: String(motherMargin) + ea,
          width: withOut(motherMargin * 2, ea),
          textAlign: "center",
        },
        children: [
          {
            text: "안녕하세요" + emoji.replace(/^U\+/, "&#x") + ";&nbsp;" + designer.designer + " 디자이너님! <u%_%u>",
            style: {
              display: "block",
              position: "relative",
              fontSize: String(initialWordingSize) + ea,
              fontWeight: String(700),
              top: String(0),
              color: colorChip.white,
              textAlign: "center",
            },
            under: {
              position: "relative",
              top: String(twinkleTop) + ea,
              fontSize: String(initialWordingSize + twinkleAdditional) + ea,
              fontWeight: String(300),
              color: colorChip.white,
              animation: "twinkle 1.1s ease infinite"
            }
          },
        ]
      }
    ]
  });

  for (let z = 0; z < whiteFlexNum; z++) {

    baseTong2 = createNode({
      mother: baseTong1,
      style: {
        display: "flex",
        width: String(100) + '%',
        marginBottom: String(blockMargin) + ea,
        flexDirection: "row",
      }
    });

    for (let i = 0; i < initialDivide; i++) {

      if (index[i + (z * initialDivide)] === undefined) {
        break;
      }

      whiteTong = createNode({
        mother: baseTong2,
        style: {
          display: "inline-block",
          position: "relative",
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          background: colorChip.white,
          width: "calc(calc(100% - " + String(blockMargin * (initialDivide - 1)) + ea + ") / " + String(initialDivide) + ")",
          marginRight: String(i === initialDivide - 1 ? 0 : blockMargin) + ea,
          paddingTop: String(innerPaddingMiddle) + ea,
          paddingBottom: String(innerPaddingHigh) + ea,
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              paddingLeft: String(innerPaddingLeft) + ea,
              paddingRight: String(innerPaddingLeft) + ea,
              width: withOut(innerPaddingLeft * 2, ea),
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  textAlign: "left",
                },
                children: [
                  {
                    text: title[i + (z * initialDivide)],
                    attribute: {
                      index: String(index[i + (z * initialDivide)])
                    },
                    event: {
                      click: function (e) {
                        const targetIndex = Number(this.getAttribute("index"));
                        // DEV
                        if (targetIndex === 1) {
                          window.alert("아직 서비스 오픈 전입니다!");
                        } else {
                          if (document.querySelectorAll(".leftMenus").length > 0) {
                            instance.menuMap[targetIndex].event.call(document.querySelectorAll(".leftMenus")[targetIndex], {});
                          } else {
                            instance.menuMap[targetIndex].event.call({
                              getAttribute: (index) => {
                                return targetIndex;
                              }
                            }, {});
                          }
                        }
                        // DEV
                      }
                    },
                    style: {
                      display: "block",
                      fontSize: String(fontSize0) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  },
                  {
                    style: {
                      display: "block",
                      height: String(mainTitleLineTop0) + ea,
                      borderBottom: "1px solid " + color,
                    }
                  },
                  {
                    style: {
                      display: desktop ? "block" : "none",
                      height: String(mainTitleLineTop1) + ea,
                      borderBottom: "1px solid " + color,
                    }
                  },
                  {
                    style: {
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: String(initDescriptionPaddingTop) + ea,
                    },
                    children: [
                      {
                        text: String(i + 1),
                        style: {
                          position: "relative",
                          top: String(desktop ? -1 : 0) + ea,
                          fontSize: String(fontSize2) + ea,
                          lineHeight: String(1.6),
                          fontWeight: String(700),
                          color: color,
                          textAlign: "left",
                          marginRight: String(initDescriptionIndent) + ea,
                        }
                      },
                      {
                        text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + contents[i + (z * initialDivide)][desktop ? 0 : 1],
                        style: {
                          display: "block",
                          fontSize: String(fontSize2) + ea,
                          lineHeight: String(1.6),
                          fontWeight: String(400),
                          color: colorChip.black,
                          textAlign: "right",
                        },
                        bold: {
                          fontSize: String(fontSize2) + ea,
                          fontWeight: String(600),
                          color: colorChip.black,
                        }
                      },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    }

  }

  baseTong = createNode({
    mother: baseTong1,
    style: {
      display: "block",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      background: colorChip.white,
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: String(innerPaddingTop) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
    }
  });

  division = new Map();

  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      height: String(titleHeight) + ea,
      paddingLeft: String(innerPaddingLeft) + ea,
      marginTop: String(fifthTitleMarginTop) + ea,
      marginBottom: String(fifthTitleMarginBottom) + ea,
    },
    children: [
      {
        text: fifthTitle,
        style: {
          fontSize: String(fontSize0) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          position: "relative",
        }
      },
      {
        style: {
          display: "block",
          width: withOut(innerPaddingLeft * 1, ea),
          height: String(mainTitleLineTop0) + ea,
          borderBottom: "1px solid " + color,
        }
      },
      {
        style: {
          display: desktop ? "block" : "none",
          width: withOut(innerPaddingLeft * 1, ea),
          height: String(mainTitleLineTop1) + ea,
          borderBottom: "1px solid " + color,
        }
      },
    ]
  });

  for (let [ title, subTitles ] of divisionEntireMap) {

    createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        height: String(titleHeight) + ea,
        paddingLeft: String(innerPaddingLeft) + ea,
      },
      children: [
        {
          text: title,
          style: {
            fontSize: String(fontSize0) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            position: "relative",
            top: String(mainTitleTextTop) + ea,
          }
        }
      ]
    });

    num2 = 0;
    for (let subTitle of subTitles) {
      baseArea = createNode({
        mother: baseTong,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          paddingLeft: String(innerPaddingLeft) + ea,
          width: withOut(innerPaddingLeft * 2, ea),
          marginBottom: String(num2 !== subTitles.length - 1 ? areaBetween : lastMargin) + ea,
        },
      });
      num = 0;
      for (let sub of subTitle) {
        tong = createNode({
          mother: baseArea,
          style: {
            verticalAlign: "top",
            position: "relative",
            borderRadius: String(5) + "px",
            border: "1px dashed " + colorChip.gray4,
            boxSizing: "border-box",
            width: "calc(calc(100% - " + String(areaBetween * (subTitle.length - 1)) + ea + ") / " + String(subTitle.length) + ")",
            marginRight: String(num !== subTitle.length - 1 ? areaBetween : 0) + ea,
            paddingTop: String(areaPaddingTop) + ea,
            paddingLeft: String(areaPaddingLeft) + ea,
            paddingRight: String(areaPaddingLeft) + ea,
            paddingBottom: String(areaPaddingBottom) + ea,
          },
          children: [
            {
              style: {
                display: "block",
                position: "absolute",
                width: withOut(areaTitleLeft * 2, ea),
                top: String(areaTitleTop) + ea,
                left: String(areaTitleLeft) + ea,
              },
              children: [
                {
                  text: sub,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(fontSize1) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                  }
                },
                {
                  text: String(0) + "명",
                  style: {
                    display: desktop ? "inline-block" : "none",
                    position: "relative",
                    fontSize: String(fontSize2) + ea,
                    fontWeight: String(400),
                    color: colorChip.deactive,
                    top: String(countNumberTextTop) + ea,
                    marginLeft: String(countNumberBetween) + ea,
                  }
                }
              ]
            },
            {
              attribute: {
                kinds: "area",
                name: sub,
                action: sub,
                family: JSON.stringify(subTitle),
                length: String(subTitle.length),
                size: String(sizeArr[subTitle.length - 1]),
                divide: String(divideArr[subTitle.length - 1]),
              },
              event: {
                dragenter: (e) => { e.preventDefault(); },
                dragleave: function (e) {
                  e.preventDefault();
                  this.style.background = colorChip.gray1;
                  this.parentElement.firstChild.style.color = colorChip.black;
                },
                dragover: function (e) {
                  e.preventDefault();
                  this.style.background = colorChip.whiteGreen;
                  this.parentElement.firstChild.style.color = colorChip.green;
                },
                drop: async function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  const name = this.getAttribute("name");
                  const length = Number(this.getAttribute("length"));
                  const size = Number(this.getAttribute("size"));
                  const divide = Number(this.getAttribute("divide"));
                  const proid = e.dataTransfer.getData("dragData").split(token)[0];
                  const fromAction = e.dataTransfer.getData("dragData").split(token)[1];
                  const requestNumber = Number(e.dataTransfer.getData("dragData").split(token)[2]);
                  const card = findByAttribute(instance.whiteCards, [ "proid", "request" ], [ proid, String(requestNumber) ]);
                  const from = division.get(fromAction);
                  const fromSize = Number(from.getAttribute("size"));
                  const fromName = from.getAttribute("name");
                  const fromDivide = Number(from.getAttribute("divide"));
                  instance.randomToken = uniqueValue();
                  try {
                    let thisChildren;
                    let thisChildrenLength;

                    this.style.background = colorChip.gray1;
                    this.parentElement.firstChild.style.color = colorChip.black;
                    this.appendChild(card);

                    thisChildren = this.children;
                    thisChildrenLength = thisChildren.length;
                    for (let c of thisChildren) {
                      c.style.width = String(size) + ea;
                    }

                  } catch (e) {
                    console.log(e);
                  }
                },
              },
              style: {
                display: "block",
                position: "relative",
                background: colorChip.gray1,
                minHeight: String(areaMinHeight - cardMargin) + ea,
                height: withOut(cardMargin, ea),
                borderRadius: String(5) + "px",
                paddingBottom: String(cardMargin) + ea,
                borderTopRightRadius: desktop ? "" : String(0),
                borderTopLeftRadius: desktop ? "" : String(0),
              }
            }
          ]
        });
        division.set(sub, tong.children[1]);
        num++;
      }
      num2++;
    }
  }

  this.whiteCards = [];
  for (let obj of cards) {
    whiteCard = createNode({
      mother: division.get(obj.process.action),
      attribute: {
        kinds: "card",
        action: obj.process.action,
        proid: obj.proid,
        cliid: obj.cliid,
        draggable: "true",
        request: String(obj.requestNumber),
      },
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData("dragData", this.getAttribute("proid") + token + this.getAttribute("action") + token + this.getAttribute("request"));
        },
        dragend: function (e) {
          e.preventDefault();
        },
        dragenter: function (e) {
          e.preventDefault();
        },
        dragleave: function (e) {
          e.preventDefault();
        },
        click: function (e) {
          const proid = this.getAttribute("proid");
          const action = this.getAttribute("action");
          const requestNumber = Number(this.getAttribute("request"));
          const cliid = this.getAttribute("cliid");
          const totalMother = document.querySelector(".totalMother");
          const zIndex = 2;
          let cancelBack, whiteBox;
          let whiteMargin;
          let whiteResult;
          let mobileNavigatorHeight;

          whiteMargin = <%% 40, 40, 40, 40, 4 %%>;
          mobileNavigatorHeight = 60;
          cancelBack = createNode({
            mother: totalMother,
            event: {
              click: function (e) {
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(instance.grayBarWidth) + ea,
              width: withOut(instance.grayBarWidth, ea),
              height: desktop ? withOut(belowHeight, ea) : String(100) + "%",
              background: colorChip.shadow,
              zIndex: String(zIndex),
              animation: "justfadeinmiddle 0.3s ease forwards",
            }
          });
          whiteBox = createNode({
            mother: totalMother,
            class: [ detailWhitePopupConst ],
            style: {
              position: "fixed",
              top: desktop ? String(whiteMargin) + ea : "calc(" + String(whiteMargin) + ea + " + " + String(mobileNavigatorHeight) + "px" + ")",
              left: String(instance.grayBarWidth + whiteMargin) + ea,
              width: withOut(instance.grayBarWidth + (whiteMargin * 2), ea),
              height: desktop ? withOut(belowHeight + (whiteMargin * 2), ea) : "calc(calc(100% - " + String(whiteMargin * 2) + ea + ") - " + String(belowHeight + mobileNavigatorHeight) + "px)",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorChip.darkDarkShadow,
              animation: "fadeup 0.3s ease forwards",
            }
          });

          whiteResult = instance.projectWhiteDetail(whiteBox, action, proid, cliid, requestNumber, desid, divisionEntireMap);

          if (!whiteResult) {
            cancelBack.click();
          } else {

            if (mobile) {
              if (mobile) {
                swipePatch({
                  left: (e) => {
                    if (document.querySelector('.' + detailWhitePopupConst) !== null) {
                      document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                      document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                    }
                  },
                  right: (e) => {
                    if (document.querySelector('.' + detailWhitePopupConst) !== null) {
                      document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                      document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                    }
                  },
                });
              }
            }

          }
        }
      },
      style: {
        display: desktop ? "inline-block" : "inline-flex",
        position: "relative",
        width: desktop ? String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + ea : "calc(" + String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + ea + " - " + String(2 / divideArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + "px" + ")",
        height: String(fixedHeightSize) + ea,
        marginLeft: String(cardMargin) + ea,
        marginTop: String(cardMargin) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        cursor: "pointer",
        justifyContent: desktop ? "" : "center",
        alignItems: desktop ? "" : "center",
      }
    });

    nameWord = createNode({
      mother: whiteCard,
      text: obj.name,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(nameFontSize) + ea,
        fontWeight: String(500),
        top: String(nameWordTop) + ea,
        marginLeft: desktop ? String(intend) + ea : "",
        color: desktop ? colorChip.black : colorChip.green,
        cursor: "pointer",
      }
    });

    idWord = createNode({
      mother: whiteCard,
      text: obj.proid,
      style: {
        display: desktop ? "inline-block" : "none",
        position: "relative",
        fontSize: String(idFontSize) + ea,
        fontWeight: String(400),
        top: String(nameWordTop) + ea,
        marginLeft: String(between) + ea,
        color: colorChip.green,
        cursor: "pointer",
      }
    });

    this.whiteCards.push(whiteCard);
  }

  this.mainBaseTong = baseTong0;
}

DesignerConsoleJs.prototype.consoleView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = true;
    this.backGrayBar();
    await this.spreadData(null, true, "middle");
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson, scrollTo, setQueue } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media, desid, tabletWidth } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    const getObj = returnGet();
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
    this.modes = [ "checklist", "report", "request", "possible", "project" ];
    this.mode = "console";
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: this.desid } }, "/getProjects", { equal: true });
    this.clients = await ajaxJson({ noFlat: true, whereQuery: { $or: [ ...new Set(this.projects.map((obj) => { return obj.cliid; })) ].map((cliid) => { return { cliid }; }) } }, "/getClients", { equal: true })
    this.designers.setProjects(this.projects);
    this.designers.setClients(this.clients);

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    this.projectMap = await ajaxJson({ method: "projectMap" }, "/getDataPatch");
    this.checklist = await ajaxJson({ kind: "checklist" }, "/getServicesByKind");

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    if (desktop) {
      window.addEventListener("resize", (e) => {
        window.location.reload();
      });
    }
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

    //launching
    this.consoleDetailLaunching(this.desid);
    this.navigatorLaunching();

    if (this.menuMap !== undefined && getObj.mode !== undefined && getObj.cliid !== undefined) {
      targetIndex = null;
      for (let i = 0; i < this.menuMap.length; i++) {
        if (this.menuMap[i].mode === getObj.mode.trim()) {
          targetIndex = i;
        }
      }
      if (targetIndex !== null) {

        eventObject = {
          __asyncCallBack__: () => {
            for (let box of instance.requestBoxes) {
              if (box.getAttribute("cliid") === getObj.cliid.trim()) {
                box.click();
              }
            }
          }
        };

        if (document.querySelectorAll(".leftMenus").length > 0) {
          this.menuMap[targetIndex].event.call(document.querySelectorAll(".leftMenus")[targetIndex], eventObject);
        } else {
          this.menuMap[targetIndex].event.call({
            getAttribute: (index) => {
              return targetIndex;
            }
          }, eventObject);
        }

      }
    }

    if (tabletWidth !== 0) {
      setQueue(() => {
        instance.listIcon.click();
      }, 500);
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerConsoleJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const { returnGet, ajaxJson, protoPatch } = GeneralJs;
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
    ];

    await protoPatch(instance, moduleList.map((m) => { return `${modulePath}/${m}`; }), `DesignerJs`);

    loading.parentElement.removeChild(loading);

    this.constructor();
    this.grayBarWidth = <%% 210, 180, 0, 0, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.belowHeight = 0;
    this.modes = [ "checklist", "report", "request", "possible", "project" ];
    this.mode = "console";
    this.desid = getObj.desid;

    if (this.desid === "d1701_aa01s") {
      window.localStorage.setItem("desid", "d1701_aa01s");
    }

    // if (window.localStorage.getItem("desid") === this.desid) {
    //   await this.consoleView();
    // } else {
    //   this.initialLogin();
    // }
    this.consoleView();

  } catch (e) {
    console.log(e);
  }
}
