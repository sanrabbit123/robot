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
        });
        instance.mode = modes[2];
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
          { toggle: (i === 0) ? "on" : "off" },
          { index: String(i) },
          { mode: menuMap[i].mode }
        ],
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            // DEV
            if (index <= 3) {
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
              color: (i === 0 ? colorChip.green : "inherit"),
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
          style: {
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontFamily: "graphik",
            fontWeight: String(300),
            color: colorChip.black,
            lineHeight: String(1.3)
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
          height: String(100) + "vh",
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
        style: {
          position: "absolute",
          fontSize: String(size) + "px",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontStyle: "italic",
          color: colorChip.white,
          top: String(fontTop) + "px",
          left: String(fontLeft) + ea,
        }
      },
      {
        mother: -3,
        text: "console",
        style: {
          position: "absolute",
          fontSize: String(size) + "px",
          fontFamily: "graphik",
          fontWeight: String(200),
          color: colorChip.white,
          top: String(fontTop) + "px",
          left: "calc(" + String(fontLeft) + ea + " + " + String(naviDesignerWidth + naviBetweenMargin) + "px" + ")",
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

DesignerConsoleJs.prototype.consoleView = async function () {
  const instance = this;
  const { ea, desid, media, tabletWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, colorChip, withOut, scrollTo, returnGet, setQueue } = GeneralJs;
  try {
    const getObj = returnGet();
    let targetIndex;

    await this.checkListView();
    this.checkListDetailLaunching(desid);
    this.navigatorLaunching();

    if (this.menuMap !== undefined && getObj.mode !== undefined && getObj.cliid !== undefined) {
      targetIndex = null;
      for (let i = 0; i < this.menuMap.length; i++) {
        if (this.menuMap[i].mode === getObj.mode.trim()) {
          targetIndex = i;
        }
      }
      if (targetIndex !== null) {
        this.menuMap[targetIndex].event.call(document.querySelectorAll(".leftMenus")[targetIndex]);
        for (let box of this.requestBoxes) {
          if (box.getAttribute("cliid") === getObj.cliid.trim()) {
            box.click();
          }
        }
      }
    }

    if (tabletWidth !== 0) {
      setQueue(() => {
        instance.listIcon.click();
      }, 500);
    }

    //DEV --------------------------------------------------------
    this.menuMap[6].event.call(document.querySelectorAll(".leftMenus")[6]);
    //DEV --------------------------------------------------------

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
    ];

    await protoPatch(instance, moduleList.map((m) => { return `${modulePath}/${m}`; }), `DesignerJs`);

    loading.parentElement.removeChild(loading);

    this.constructor();
    this.grayBarWidth = <%% 210, 180, 0, 0, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.belowHeight = 0;
    this.modes = [ "checklist", "report", "request", "possible" ];
    this.mode = this.modes[0];
    this.desid = getObj.desid;

    if (this.desid === "d1701_aa01s") {
      window.localStorage.setItem("desid", "d1701_aa01s");
    }

    if (window.localStorage.getItem("desid") === this.desid) {
      await this.consoleView();
    } else {
      this.initialLogin();
    }

  } catch (e) {
    console.log(e);
  }
}
