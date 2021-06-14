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

    certification = "1000";

    GeneralJs.ajaxJson({ noFlat: true, whereQuery: { "information.phone": value.trim() } }, "/getDesigners", { equal: true }).then((designers) => {
      if (designers.length === 0) {
        window.alert("전화번호를 정확히 입력해주세요!");
        input.value = "";
      } else {
        const [ designer ] = designers;
        window.alert(`${designer.designer} 디자이너님 안녕하세요! 인증번호를 입력해주세요!`);
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
            instance.checkListView().then(() => {
              instance.checkListDetailLaunching(instance.desid);
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

    loading.parentElement.removeChild(loading);

    await protoPatch(instance, moduleList.map((m) => { return `${modulePath}/${m}`; }), `DesignerJs`);

    this.constructor();
    this.grayBarWidth = 210;
    this.belowHeight = 0;
    this.desid = desid;

    if (window.localStorage.getItem("desid") === this.desid) {
      this.checkListView(true).then(() => {
        instance.checkListDetailLaunching(instance.desid);
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
