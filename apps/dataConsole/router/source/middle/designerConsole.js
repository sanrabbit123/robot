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
    "DC"
  ]
} %/%/g

const DesignerConsoleJs = function () {
  this.mother = new GeneralJs();
  this.ea = "px";
  this.totalContents = document.getElementById("totalcontents");
}

DesignerConsoleJs.prototype.leftPannel = function () {
  const instance = this;
  const { ea, designer, desid, modes } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, scrollTo } = GeneralJs;
  const totalMother = document.querySelector(".totalMother");
  const mother = totalMother.firstChild;
  const colorFunc = function () {
    const doms = document.querySelectorAll(".leftTitles");
    const menus = document.querySelectorAll(".leftMenus");
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
  const menuMap = [
    {
      title: "기본 정보",
      event: function (e) {
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
      title: "작업 정보",
      event: function (e) {
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[3]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[3]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "시공 정보",
      event: function (e) {
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
      event: function (e) {
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
      title: "기타 정보",
      event: function (e) {
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[6]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[6]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "일정 정보",
      event: function (e) {
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[8]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[8]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "세팅 정보",
      event: function (e) {
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[0]) {
          scrollTo(document.querySelector(".totalMother"), blocks[9]);
        } else {
          instance.checkListDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[9]);
          });
        }
        instance.mode = modes[0];
        colorFunc.call(this);
      },
    },
    {
      title: "정산 정보",
      event: function (e) {
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
      event: function (e) {
        const blocks = document.querySelector(".mainBaseTong").firstChild.children;
        if (instance.mode === modes[1]) {
          scrollTo(document.querySelector(".totalMother"), blocks[3]);
        } else {
          instance.reportDetailLaunching(desid, () => {
            const blocks = document.querySelector(".mainBaseTong").firstChild.children;
            scrollTo(document.querySelector(".totalMother"), blocks[3]);
          });
        }
        instance.mode = modes[1];
        colorFunc.call(this);
      },
    },
  ];
  let margin;
  let size;
  let barHeight;
  let marginBottom;
  let indent;
  let menu;
  let menuMargin;
  let firstBold, secondBold;

  cleanChildren(mother);

  margin = <%% 40, 35, 35, 35, 35 %%>;
  size = <%% 16, 15, 15, 15, 15 %%>;
  barHeight = 19;
  marginBottom = 23;
  indent = 16;
  menuMargin = <%% 15, 13, 13, 13, 13 %%>;
  firstBold = 600;
  secondBold = 400;

  menu = [];
  for (let i = 0; i < menuMap.length; i++) {
    menu.push({
      class: [ "hoverDefault", "leftMenus" ],
      attribute: [
        { toggle: (i === 0) ? "on" : "off" }
      ],
      events: [
        {
          type: "click",
          event: menuMap[i].event,
        }
      ],
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
            fontWeight: String(300),
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
      position: "relative",
      top: String(margin) + ea,
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      width: withOut(100, margin * 2, ea),
      height: withOut(100, margin * 2, ea),
      fontSize: String(size) + ea,
      fontWeight: String(secondBold),
      color: colorChip.black
    },
    children: [
      {
        text: "안녕하세요,<br>" + designer.designer + " 디자이너님!",
        style: {
          position: "relative",
          fontSize: "inherit",
          fontWeight: String(firstBold),
          color: "inherit",
          lineHeight: String(1.5),
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

}

DesignerConsoleJs.prototype.initialLogin = function () {
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, withOut, colorChip, cssInjection, autoHypenPhone } = GeneralJs;
  const totalContents = document.getElementById("totalcontents");
  let width, height, size;
  let left0, left1;
  let whiteWidth, whiteHeight, whiteTop;
  let loadingWidth, loadingMargin, loadingTopMargin;
  let total, input;
  let vaildFunction;
  let size2;

  cssInjection(`.greenInput::placeholder { color: ${colorChip.green};font-weight: 500; opacity: 0.9 }`);

  size = 34;

  width = 276;
  height = 170;

  left0 = 0;
  left1 = 156;

  whiteWidth = 236;
  whiteHeight = 40;
  whiteTop = 56;

  loadingWidth = 29;
  loadingTopMargin = 5;
  loadingMargin = 11;

  size2 = 16;

  total = {};

  vaildFunction = function (input, value) {
    let newInput, certification;

    certification = "0000";

    GeneralJs.ajaxJson({ noFlat: true, whereQuery: { "information.phone": value.trim() } }, "/getDesigners", { equal: true }).then((designers) => {
      if (designers.length === 0) {
        window.alert("전화번호를 정확히 입력해주세요!");
        input.value = "";
      } else {
        const [ designer ] = designers;
        window.alert(`${designer.designer} 디자이너님 안녕하세요! 인증번호를 입력해주세요!`);
        instance.designer = designer;
        instance.desid = designer.desid;
        newInput = input.cloneNode(true);
        input.parentNode.appendChild(newInput);
        newInput.value = "";
        newInput.setAttribute("placeholder", "인증번호를 입력해주세요!");
        input.style.display = "none";
        newInput.focus();

        //DEV ================================================================
        return (new Promise((resolve, reject) => { resolve("success") }));
        // return GeneralJs.ajaxPromise({
        //   name: "배창규", //designer.designer
        //   phone: "010-2747-3403", //designer.information.phone
        //   certification,
        // }, BRIDGEHOST + "/certification");
        //DEV ================================================================

      }
    }).then((message) => {
      newInput.addEventListener("keyup", function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 4) {
          if (certification === this.value) {
            instance.checkListView(true).then(() => {
              instance.checkListDetailLaunching(instance.desid);
              instance.leftPannel();
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
                  height: String(98) + '%',
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
    ];
    const [ designer ] = await ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true });
    await protoPatch(instance, moduleList.map((m) => { return `${modulePath}/${m}`; }), `DesignerJs`);

    loading.parentElement.removeChild(loading);

    this.constructor();
    this.grayBarWidth = <%% 210, 200, 200, 200, 210 %%>;
    this.belowHeight = 0;
    this.designer = designer;
    this.desid = desid;
    this.modes = [ "checklist", "report" ];
    this.mode = this.modes[0];

    if (window.localStorage.getItem("desid") === this.desid) {
      this.checkListView(true).then(() => {
        instance.checkListDetailLaunching(instance.desid);
        instance.leftPannel();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.initialLogin();
    }

  } catch (e) {
    console.log(e);
  }
}
