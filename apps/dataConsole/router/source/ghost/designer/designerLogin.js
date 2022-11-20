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
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('디자이너 로그인 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('디자이너 로그인 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerLogin",
  "hangul": "디자이너 로그인",
  "route": [
    "designerLogin"
  ]
} %/%/g

const DesignerLoginJs = function () {
  this.mother = new GeneralJs();
}

DesignerLoginJs.binaryPath = FRONTHOST + "/middle/console";

DesignerLoginJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, createNode, withOut, colorChip, autoHypenPhone, selfHref } = GeneralJs;
  try {

    this.mother.setGeneralProperties(this);
    loading.parentNode.removeChild(loading);

    if (typeof window.localStorage.getItem("HL_desid") === "string") {
      const rows = await ajaxJson({ whereQuery: { desid: window.localStorage.getItem("HL_desid") } }, SECONDHOST + "/getDesigners", { equal: true });
      if (rows.length >= 1) {
        window.localStorage.setItem("HL_desid", rows[0].desid);
        selfHref(FRONTHOST + "/designer/dashboard.php?desid=" + window.localStorage.getItem("HL_desid"));
      } else {
        window.localStorage.clear();
      }
    }

    const { totalContents, ea } = this;
    const getObj = returnGet();
    let input;
    let titleSize;
    let titleTop;
    let inputHeight, inputWidth;
    let inputVisual;
    let inputSize;

    titleSize = <%% 28, 28, 28, 28, 5 %%>;
    titleTop = <%% 74, 74, 74, 74, 13.2 %%>;

    inputHeight = <%% 35, 35, 35, 35, 7 %%>;
    inputWidth = <%% 250, 250, 250, 250, 44 %%>;

    inputVisual = <%% 3, 3, 3, 3, 0.8 %%>;
    inputSize = <%% 14, 14, 14, 14, 3 %%>;

    createNode({
      mother: totalContents,
      style: {
        display: "block",
        position: "fixed",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        background: colorChip.darkBlack,
        animation: "justfadeinoriginal 0.3s ease",
      }
    });

    createNode({
      mother: totalContents,
      text: "HL project <b%console%b>",
      style: {
        fontSize: String(titleSize) + ea,
        fontWeight: String(400),
        fontFamily: "graphik",
        color: colorChip.white,
        position: "absolute",
        left: String(0),
        width: withOut(0),
        textAlign: "center",
        top: withOut(50, titleTop, ea),
      },
      bold: {
        fontStyle: "italic",
        fontFamily: "graphik",
        fontSize: String(titleSize) + ea,
        fontWeight: String(200),
        color: colorChip.white,
      }
    });

    input = createNode({
      mother: totalContents,
      style: {
        position: "relative",
        height: String(inputHeight) + ea,
        width: String(inputWidth) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        top: withOut(50, (inputHeight / 2), ea),
        left: withOut(50, (inputWidth / 2), ea),
      },
      children: [
        {
          mode: "input",
          attribute: {
            type: "text",
            placeholder: "010-0000-0000",
          },
          event: {
            keyup: function (e) {
              const self = this;
              let newInput;
              this.value = autoHypenPhone(this.value).trim();
              if (/^[0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]$/.test(this.value) || /^[0-9][0-9][0-9]\-[0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]$/.test(this.value)) {
                ajaxJson({ whereQuery: { "information.phone": this.value.trim() } }, SECONDHOST + "/getDesigners", { equal: true }).then((rows) => {
                  if (rows.length >= 1) {
                    const [ designer ] = rows;
                    let randomArr, randomKey, randomStr;
                    let randomValue;
                    let randomValueAjaxData;

                    randomArr = window.crypto.getRandomValues(new Uint32Array(10));
                    randomKey = randomArr[Math.floor(Math.random() * 10)];
                    randomStr = String(randomKey);
                    if (randomStr.length > 6) {
                      randomValue = randomStr.slice(0, 6);
                    } else {
                      randomValue = randomStr;
                      for (let i = randomStr.length; i < 6; i++) {
                        randomValue += String(Math.floor(Math.random() * 10));
                      }
                      randomValue = randomStr;
                    }

                    window.alert("안녕하세요, " + designer.designer + " 디자이너님! 인증번호를 보내드립니다. 인증번호를 입력해주세요!");
                    ajaxJson({
                      name: designer.designer,
                      phone: designer.information.phone,
                      certification: randomValue
                    }, BACKHOST + "/sendCertification").catch((err) => { console.log(err); });

                    newInput = createNode({
                      mother: self.parentElement,
                      mode: "input",
                      attribute: {
                        type: "text",
                        placeholder: "인증번호를 입력해주세요!",
                      },
                      event: {
                        keyup: function (e) {
                          this.value = this.value.replace(/[^0-9]/gi, '');
                          if (this.value === randomValue) {
                            window.localStorage.setItem("HL_desid", designer.desid);
                            selfHref(FRONTHOST + "/designer/dashboard.php?desid=" + designer.desid);
                          }
                        }
                      },
                      style: {
                        position: "absolute",
                        top: String(0),
                        left: String(0),
                        width: withOut(0),
                        height: withOut(inputVisual, ea),
                        textAlign: "center",
                        fontSize: String(inputSize) + ea,
                        fontWeight: String(500),
                        color: colorChip.black,
                        border: String(0),
                        outline: String(0),
                        borderRadius: String(5) + "px",
                        background: colorChip.white,
                      }
                    })

                    newInput.focus();

                  }
                }).catch((err) => { console.log(err); })
              }
            }
          },
          style: {
            position: "relative",
            top: String(0),
            left: String(0),
            width: withOut(0),
            height: withOut(inputVisual, ea),
            textAlign: "center",
            fontSize: String(inputSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            border: String(0),
            outline: String(0),
            borderRadius: String(5) + "px",
            background: colorChip.white,
          }
        }
      ]
    }).firstChild;

    input.focus();

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerLoginJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
