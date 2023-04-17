const DeseventJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
  this.below = {};
  this.values = {};
  this.box = {
    desktop: null,
    mobile: null
  };
  this.fileBox = {
    desktop: null,
    mobile: null
  };
}

DeseventJs.sourceLink = "/list_image/desevent";

DeseventJs.inputMaker = function (boo, id) {
  let div_clone, input_clone;
  let inputStyle, blockStyle;
  let ea;

  ea = boo ? "px" : "vw";

  blockStyle = {
    background: "#f2f2f2",
    borderRadius: String(3) + "px",
    position: "absolute",
    transition: (boo ? "opacity 0.5s ease" : "opacity 0s ease"),
    height: (boo ? String(31.5) + ea : String(6.9) + ea),
  };

  inputStyle = {
    position: "relative",
    top: String(0),
    left: String(0),
    width: String(100) + '%',
    height: String(100) + '%',
    border: String(0),
    outline: String(0),
    backgroundColor: "transparent",
    fontFamily: "'Noto Sans KR', sans-serif",
    textDecoration: "none",
    textTransform: "none",
    color: "#303030",
    letterSpacing: String(-0.50) + "px",
    textShadow: "none",
    padding: String(0),
    fontSize: (boo ? String(14) + ea : String(3.4) + ea),
    height: (boo ? String(28.5) + ea : String(6.4) + ea),
    lineHeight: (boo ? String(17) + ea : String(1.7)),
  };

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = id;
  for (let i in blockStyle) {
    div_clone.style[i] = blockStyle[i];
  }

  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  for (let i in inputStyle) {
    input_clone.style[i] = inputStyle[i];
  }

  div_clone.appendChild(input_clone);
  return div_clone;
}

DeseventJs.postEvent = function (boo) {
  let list;
  if (boo === "desktop") {
    list = { id: "postEvent_div", target0: "#blocks_address0 > input", target1: "#blocks_address1 > input", }
  } else {
    list = { id: "mopostEvent_div", target0: "#moblocks_address0 > input", target1: "#moblocks_address1 > input", }
  }
  return function (e) {
    if (e.target.id !== "cancel_back" && e.target.id !== list.id) {
      let div_clone;
      let ratio, scaleRatio;

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.id = "cancel_back";
      this.appendChild(div_clone);

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.id = list.id;
      new daum.Postcode({
          oncomplete: function (data) {
            let addr = '';
            if (data.userSelectedType === 'R') { addr = data.roadAddress; }
            else { addr = data.jibunAddress; }
            document.querySelector(list.target0).value = addr;
            document.querySelector(list.target1).focus();
            document.getElementById("cancel_back").parentNode.removeChild(document.getElementById("cancel_back"));
            document.getElementById(list.id).parentNode.removeChild(document.getElementById(list.id));
          },
          width: '100%',
          height: '100%',
          maxSuggestItems: 6,
      }).embed(div_clone);
      this.appendChild(div_clone);

      if (boo === "mobile") {
        ratio = window.innerWidth * (75 / 100);
        if (ratio < 300) {
          scaleRatio = ratio / 300;
          div_clone.firstChild.style.transformOrigin = "0 0";
          div_clone.firstChild.style.transform = "scale(" + String(scaleRatio) + ")";
          div_clone.firstChild.style.height = String((1 / scaleRatio) * 100) + '%';
        }
      }

    } else if (e.target.id === "cancel_back") {
      document.getElementById("cancel_back").parentNode.removeChild(document.getElementById("cancel_back"));
      document.getElementById(list.id).parentNode.removeChild(document.getElementById(list.id));
    }
  }
}

DeseventJs.setLocalInfo = function (input, position) {
  let temp, length;
  if (Array.isArray(input)) {
    if (input.length > 0) {
      if (/input/gi.test(input[0].nodeName)) {
        length = input.length;
        if (window.localStorage.getItem(position) === null) {
          window.localStorage.setItem(position, JSON.stringify(new Array(length)));
        }
        for (let i = 0; i < length; i++) {
          input[i].setAttribute("thisIndex", String(i));
        }
      } else if (/svg/gi.test(input[0].nodeName)) {
        for (let svg of input) {
          svg.addEventListener("click", function (e) {
            if (this.getAttribute("selected") === "true") {
              window.localStorage.setItem(position, this.getAttribute("value"));
            }
          });
        }
      }
    }
  } else {
    if (input.nodeName === "INPUT") {
      input.addEventListener("blur", function (e) {
        window.localStorage.setItem(position, this.value);
      });
    }
  }
}

DeseventJs.prototype.certificationBox = function (name, phone, mother, boo, callback) {
  const instance = this;
  const { sub: { etc: { pending, certification } } } = this.map;
  const { sub: { loader } } = this.mother.map;

  let randomArr;
  if (GeneralJs.isIE()) {
    randomArr = window.msCrypto.getRandomValues(new Uint32Array(10));
  } else {
    randomArr = window.crypto.getRandomValues(new Uint32Array(10));
  }

  const randomKey = randomArr[Math.floor(Math.random() * 10)];
  const randomStr = String(randomKey);
  let randomValue;
  let randomValueAjaxData;

  if (randomStr.length > 6) {
    randomValue = randomStr.slice(0, 6);
  } else {
    randomValue = randomStr;
    for (let i = randomStr.length; i < 6; i++) {
      randomValue += String(Math.floor(Math.random() * 10));
    }
    randomValue = randomStr;
  }

  randomValueAjaxData = "name=" + name + "&phone=" + phone + "&certification=" + randomValue;
  // GeneralJs.ajax(randomValueAjaxData, "/engine/Smssend.php", function (data) {});
  GeneralJs.ajax(randomValueAjaxData, "https://home-liaison.co.kr:3000/certification", function (data) {});

  let div_back, div_clone, div_clone2, svg_clone;
  let input_back, input_clone;
  let height, width, ea = (boo === "desktop") ? "px" : "vw";
  let wordWidth, whiteWidth, whiteHeight;
  let style = {};
  let endEvent;

  whiteWidth = (boo === "desktop") ? 334 : 77;
  whiteHeight = (boo === "desktop") ? 132 : 31;

  div_back = GeneralJs.nodes.div.cloneNode(true);
  div_back.id = ((boo === "desktop") ? "" : "mo") + "submit_pendingbox_back";
  mother.appendChild(div_back);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = ((boo === "desktop") ? "" : "mo") + "submit_pendingbox";
  style = {
    width: String(whiteWidth) + ea,
    height: String(whiteHeight) + ea,
    left: "calc(50% - " + String(whiteWidth / 2) + ea + ")",
    transition: "all 0s ease",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  height = (boo === "desktop") ? 19 : 4.5;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = certification.src;
  wordWidth = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + ((boo === "desktop") ? 0 : -1);
  style = {
    position: "absolute",
    top: String((boo === "desktop") ? 31 : 7) + ea,
    left: "calc(50% - " + String(wordWidth / 2) + ea + ")",
    width: String(wordWidth) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone2 = SvgTong.parsing(svg_clone);
  div_clone.appendChild(div_clone2);

  height = (boo === "desktop") ? 30 : 7.6;
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = loader;
  svg_clone.classList.add("loading");
  svg_clone.classList.add("loaderc");

  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    top: String((boo === "desktop") ? 67 : 15.5) + ea,
    left: "calc(50% - " + String((wordWidth / 2) + ((boo === "desktop") ? 1 : 0.5)) + ea + ")",
    marginLeft: String(0) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  input_back = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String((boo === "desktop") ? 32 : 7.5) + ea,
    left: String((boo === "desktop") ? (GeneralJs.isMac() ? 80 : 79) : 18) + ea,
    borderRadius: String((boo === "desktop") ? 4 : 1) + ea,
    width: String((boo === "desktop") ? 218 : 51.4) + ea,
    height: String((boo === "desktop") ? 34 : 8) + ea,
    background: "#f2f2f2",
  };
  for (let i in style) {
    input_back.style[i] = style[i];
  }

  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  style = {
    width: "100%",
    border: String(0) + ea,
    fontSize: String((boo === "desktop") ? 15 : 3.8) + ea,
    outline: String(0) + ea,
    fontFamily: "Noto Sans KR",
    background: "transparent",
    height: String((boo === "desktop") ? 29 : 6.8) + ea,
    textAlign: "center",
  };
  for (let i in style) {
    input_clone.style[i] = style[i];
  }
  input_back.appendChild(input_clone);
  div_clone.appendChild(input_back);

  mother.appendChild(div_clone);

  input_clone.focus();
  setTimeout(function () {
    window.location.reload();
  }, (10 * 60 * 1000));

  endEvent = function (e) {
    let svg_clone, div_clone2;
    let svg_dom;
    let style;
    let width, height;
    let whiteWidth, whiteHeight;
    let ea;

    ea = (boo === "desktop") ? "px" : "vw";

    if (this.value.length > 5) {
      if (this.value === randomValue) {
        while (div_clone.firstChild) {
          div_clone.removeChild(div_clone.lastChild);
        }

        whiteWidth = (boo === "desktop") ? 200 : 46;
        whiteHeight = (boo === "desktop") ? 132 : 31;

        height = (boo === "desktop") ? 19 : 4.5;
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = pending.src;
        width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + ((boo === "desktop") ? 0 : -1);
        style = {
          position: "absolute",
          top: String((boo === "desktop") ? 31 : 7) + ea,
          left: "calc(50% - " + String(width / 2) + ea + ")",
          width: String(width) + ea,
          height: String(height) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        div_clone2 = SvgTong.parsing(svg_clone);
        div_clone.appendChild(div_clone2);

        height = (boo === "desktop") ? 39 : 9.6;
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = loader;
        svg_clone.classList.add("loading");
        svg_clone.classList.add("loaderc");

        width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
        style = {
          top: String((boo === "desktop") ? 63 : 14.5) + ea,
          left: "50%",
          marginLeft: '-' + String(width / 2) + ea,
          width: String(width) + ea,
          height: String(height) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        svg_dom = SvgTong.parsing(svg_clone);
        div_clone.appendChild(svg_dom);

        div_clone.style.width = String(whiteWidth) + ea;
        div_clone.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";
        div_clone.style.height = String(whiteHeight) + ea;

        callback(div_clone, div_clone2, svg_dom);

      } else {
        alert("인증번호를 정확히 입력해주세요!");
        this.value = '';
      }
    }
  }

  if (boo === "desktop") {
    input_clone.addEventListener("keyup", endEvent);
  } else {
    input_clone.addEventListener("keyup", function (e) {
      if (this.value.length > 5) {
        this.blur();
      }
    });
    input_clone.addEventListener("blur", endEvent);
  }
}

DeseventJs.prototype.submitEvent = function (flatform = "desktop") {
  const instance = this;
  return async function (e) {
    try {
      const { mode, data } = instance.values;
      const targetValues = data[flatform];
      let columns, allColumns;
      let temp, tempValue, tempString, boo;
      let finalObj;
      let formData;

      columns = {};
      finalObj = { mode };

      if (mode === "partnership") {
        columns.green = [
          { name: "designer", alert: "성함을 입력해주세요!", valid: function (value) {
            if (/[ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\[\]\{\}\\\|\/\?\"\'\:\;\<\>\,\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "phone", alert: "연락처를 입력해주세요!", valid: function (value) {
            if (/[^0-9\-]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "address", alert: "주소를 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "detailAddress", alert: "주소를 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "email", alert: "이메일을 입력해주세요!", valid: function (value) {
            if (!/[\@]/gi.test(value) || !/[\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "classification", alert: "사업자 분류를 선택해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "company", alert: "회사명을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "bankName", alert: "은행명을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "bankAccount", alert: "계좌 번호를 입력해주세요!", valid: function (value) {
            if (/[^0-9\-]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "bankTo", alert: "수신자를 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "interiorCareer", alert: "경력을 입력해주세요!", valid: function (value) {
            if (!/년/g.test(value) || !/월/g.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "channel", alert: "홍보 채널을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "comeFrom", alert: "유입 경로를 선택해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", }
        ];
        columns.gray = [
          { name: "businessNumber", alert: "사업자 등록번호를 입력해주세요!", valid: function (value) {
            if (/[^0-9\-]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "startDate", alert: "개업일을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "representative", alert: "대표자 성함을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "bankEtc", alert: "은행 기타 사항을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "stylingCareer", alert: "스타일링 경력을 입력해주세요!", valid: function (value) {
            if (value === '') {
              return true;
            } else {
              if (!/년/g.test(value) || !/월/g.test(value)) {
                return false;
              } else {
                return true;
              }
            }
          }, value: "", },
          { name: "careerDetail", alert: "경력 상세 사항을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", }
        ];
      } else if (mode === "presentation") {
        columns.green = [
          { name: "designer", alert: "성함을 입력해주세요!", valid: function (value) {
            if (/[ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\[\]\{\}\\\|\/\?\"\'\:\;\<\>\,\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "phone", alert: "연락처를 입력해주세요!", valid: function (value) {
            if (/[^0-9\-]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "address", alert: "주소를 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "detailAddress", alert: "주소를 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "email", alert: "이메일을 입력해주세요!", valid: function (value) {
            if (!/[\@]/gi.test(value) || !/[\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "presentationTimes", alert: "시간을 선택해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "comeFrom", alert: "유입 경로를 선택해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "channel", alert: "홍보 채널을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", }
        ];
        columns.gray = [];
      } else if (mode === "portfolio") {
        columns.green = [
          { name: "designer", alert: "성함을 입력해주세요!", valid: function (value) {
            if (/[ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\[\]\{\}\\\|\/\?\"\'\:\;\<\>\,\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "phone", alert: "연락처를 입력해주세요!", valid: function (value) {
            if (/[^0-9\-]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "email", alert: "이메일을 입력해주세요!", valid: function (value) {
            if (!/[\@]/gi.test(value) || !/[\.]/gi.test(value)) {
              return false;
            } else {
              return true;
            }
          }, value: "", },
          { name: "channel", alert: "홍보 채널을 입력해주세요!", valid: function (value) {
            if (false) {
              return false;
            } else {
              return true;
            }
          }, value: "", }
        ];
        columns.gray = [];
      }

      allColumns = columns.green.concat(columns.gray);

      //green validation
      for (let c of columns.green) {
        if (targetValues[c.name].type === "text") {
          if (targetValues[c.name].input.value === '') {
            GeneralJs.inputBackward(targetValues[c.name].input, c.alert);
            return false;
          }
        } else if (targetValues[c.name].type === "radio") {
          temp = false;
          for (let svg of targetValues[c.name].input) {
            if (svg.getAttribute("selected") === "true") {
              temp = true;
            }
          }
          if (!temp) {
            alert(c.alert);
            window.scrollTo(0, targetValues[c.name].input[0].getBoundingClientRect().y);
            return false;
          }
        } else if (targetValues[c.name].type === "array") {
          temp = false;
          for (let inputDom of targetValues[c.name].input) {
            if (inputDom.value !== "") {
              temp = true;
            }
          }
          if (instance.fileBox[flatform].files.length > 0) {
            temp = true;
          }
          if (!temp) {
            alert(c.alert);
            window.scrollTo(0, targetValues[c.name].input[0].getBoundingClientRect().y);
            return false;
          }
        }
      }

      boo = false;
      for (let c of allColumns) {
        if (targetValues[c.name].type === "text") {
          boo = c.valid(targetValues[c.name].input.value);
          if (!boo) {
            GeneralJs.inputBackward(targetValues[c.name].input, c.alert);
            return false;
          } else {
            targetValues[c.name].value = targetValues[c.name].input.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ\#\$\%\^\&\*\+\`\=\[\]\{\}\\\|\/\"\'\:\;\<\>]/gi, '').replace(/\t/g, ' ').replace(/  /g, ' ').replace(/\n/g, '__space__').trim().replace(/\=/g, '').replace(/\&/g, '');
          }

        } else if (targetValues[c.name].type === "array") {
          tempString = '';
          for (let singleInput of targetValues[c.name].input) {
            tempString += singleInput.value;
            tempString += "__input__";
          }
          if (tempString.length > 0) {
            tempString = tempString.slice(0, -9);
          }
          targetValues[c.name].value = tempString;
        } else {
          temp = false;
          for (let svg of targetValues[c.name].input) {
            if (svg.getAttribute("selected") === "true") {
              temp = true;
              tempValue = svg.getAttribute("value");
            }
          }
          if (!temp) {
            alert(c.alert);
            boo = false;
            window.scrollTo(0, targetValues[c.name].input[0].getBoundingClientRect().y);
            return false;
          } else {
            targetValues[c.name].value = tempValue;
          }
        }
      }

      for (let i in targetValues) {
        finalObj[i] = targetValues[i].value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ\#\$\%\^\&\*\+\`\=\[\]\{\}\\\|\"\'\;\<\>]/gi, '');
      }

      instance.certificationBox(finalObj.designer, finalObj.phone, instance.box[flatform][instance.box[flatform].length - 1], flatform, async function (whiteBox, wording, loader) {
        try {
          GeneralJs.ajax(GeneralJs.objectToRawquery(finalObj), "https://home-liaison.co.kr:3000/designerSubmit", function (data) {
            let style;
            let ea;
            let svg_clone, svg_dom;
            let width, height, top;
            let whiteWidth, whiteHeight;
            let promptBox;
            let promptGreenWidth0, promptGreenWidth1, promptGreenHeight, promptGreenBottom, promptGreenLeft0, promptGreenLeft1;
            let promptWordingTop, promptWordingLeft;
            let formData;

            if (instance.fileBox[flatform].files.length > 0) {
              formData = new FormData();
              formData.enctype = "multipart/form-data";

              formData.append("designer", finalObj.designer);
              formData.append("phone", finalObj.phone);

              for (let j = 0; j < instance.fileBox[flatform].files.length; j++) {
                formData.append("upload" + String(j), instance.fileBox[flatform].files[j]);
              }

              GeneralJs.ajaxForm(formData, "https://home-liaison.co.kr:3000/designerBinary").catch(function (err) {
                alert("사진 전송에 문제가 생겼습니다! 200MB 이하의 파일로 다시 시도해주세요!");
                window.location.reload();
              });
            }

            if (finalObj.phone !== "010-2747-3403") {
              window.gtag("event", "designerSubmit", {
                event_category: "engagement"
              });
            }

            wording.style.display = "none";
            loader.style.display = "none";

            ea = (flatform === "desktop") ? "px" : "vw";

            svg_clone = SvgTong.tongMaker();
            if (finalObj.mode === "partnership") {
              svg_clone.src = instance.map.sub.etc.partnershipComplete.src;
              height = (flatform === "desktop") ? 19 : 4.5;
              top = (flatform === "desktop") ? 31 : 7;
              whiteWidth = (flatform === "desktop") ? 330 : 74;
              whiteHeight = (flatform === "desktop") ? 86 : 19.4;
            } else if (finalObj.mode === "presentation") {
              svg_clone.src = instance.map.sub.etc.presentationComplete.src;
              height = (flatform === "desktop") ? 41 : 9;
              top = (flatform === "desktop") ? 31 : 7;
              whiteWidth = (flatform === "desktop") ? 356 : 76;
              whiteHeight = (flatform === "desktop") ? 149 : 34;
            } else if (finalObj.mode === "portfolio") {
              svg_clone.src = instance.map.sub.etc.photoComplete.src;
              height = (flatform === "desktop") ? 19 : 4.5;
              top = (flatform === "desktop") ? 31 : 7;
              whiteWidth = (flatform === "desktop") ? 330 : 74;
              whiteHeight = (flatform === "desktop") ? 86 : 19.4;
            }
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + ((flatform === "desktop") ? 0 : -1);
            style = {
              position: "absolute",
              top: String(top) + ea,
              left: "calc(50% - " + String(width / 2) + ea + ")",
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            whiteBox.appendChild(svg_dom);

            if (finalObj.mode !== "partnership" && finalObj.mode !== "portfolio") {

              promptGreenWidth0 = (flatform === "desktop") ? 40 : 8.6;
              promptGreenWidth1 = (flatform === "desktop") ? 62 : 14.4;
              promptGreenHeight = (flatform === "desktop") ? 31 : 8;
              promptGreenBottom = (flatform === "desktop") ? 30 : 7;
              promptGreenLeft0 = (flatform === "desktop") ? 124 : 26;
              promptGreenLeft1 = (flatform === "desktop") ? 168 : 35.5;
              height = (flatform === "desktop") ? 13 : 3.4;
              promptWordingTop = (flatform === "desktop") ? 8 : 2;
              promptWordingLeft = (flatform === "desktop") ? 14 : 2.5;

              promptBox = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                width: String(promptGreenWidth0) + ea,
                height: String(promptGreenHeight) + ea,
                bottom: String(promptGreenBottom) + ea,
                left: String(promptGreenLeft0) + ea,
                background: "#2fa678",
                borderRadius: String(3) + "px",
                cursor: "pointer",
              };
              for (let i in style) {
                promptBox.style[i] = style[i];
              }

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = instance.map.sub.submit[3].src[flatform];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                top: String(promptWordingTop) + ea,
                left: String(promptWordingLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              promptBox.appendChild(svg_dom);
              promptBox.addEventListener("click", function (e) {
                window.location.href = "/desevent.php?mode=partnership";
              });
              whiteBox.appendChild(promptBox);

              promptBox = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                width: String(promptGreenWidth1) + ea,
                height: String(promptGreenHeight) + ea,
                bottom: String(promptGreenBottom) + ea,
                left: String(promptGreenLeft1) + ea,
                background: "#2fa678",
                borderRadius: String(3) + "px",
                cursor: "pointer",
              };
              for (let i in style) {
                promptBox.style[i] = style[i];
              }

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = instance.map.sub.submit[4].src[flatform];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                top: String(promptWordingTop) + ea,
                left: String(promptWordingLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              promptBox.appendChild(svg_dom);
              promptBox.addEventListener("click", function (e) {
                window.location.href = "/index.php";
              });
              whiteBox.appendChild(promptBox);
            }

            whiteBox.style.width = String(whiteWidth) + ea;
            whiteBox.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";
            whiteBox.style.height = String(whiteHeight) + ea;
            whiteBox.style.top = "calc(50% - " + String(whiteHeight / 2) + ea + ")";

            if (finalObj.mode === "partnership" || finalObj.mode === "portfolio") {
              setTimeout(function () {
                window.location.href = "/index.php";
              }, 3000);
            }

          });
        } catch (e) {
          window.location.href = "/index.php";
        }
      });

    } catch (e) {
      window.location.href = "/index.php";
    }
  }
}

DeseventJs.prototype.imageBoxMaker = function (mother, fileMotherinput, order, toggle) {
  const instance = this;
  const { sub: { greenClose } } = this.mother.map;

  let fileMother = fileMotherinput.files;
  let text = fileMother[order].name;

  let div_clone, div_clone2, div_clone3, svg_clone;
  let ea = toggle ? "px" : "vw";
  let size = toggle ? 14 : 2.5;
  let margin = toggle ? 12 : 2;
  let width = toggle ? (219.6 - 24) : ((78 / 3) - 4);
  let height = toggle ? (((128 - 34 - 12) / 2) - 24) : ((13 / 2) - 4);
  let top, right, left;
  let style = {};
  let attribute = {};
  let wordHeight;

  wordHeight = height + margin;

  //white box
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    width: String(width) + ea,
    height: String(height) + ea,
    paddingTop: String(margin) + ea,
    paddingBottom: String(margin) + ea,
    paddingLeft: String(margin) + ea,
    paddingRight: String(margin) + ea,
    marginBottom: String(margin) + ea,
    marginRight: String(margin) + ea,
    borderRadius: String(toggle ? 3 : 1) + ea,
    background: "#ffffff",
    position: "relative",
    display: "inline-block",
  }
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  //wording area
  top = margin + (toggle ? -3 : -1.2);
  left = top + (toggle ? 3 : 0.9);
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    width: String(toggle ? width - (margin * 2) : 17.5) + ea,
    height: String(wordHeight) + ea,
    top: String(top) + ea,
    left: String(left) + ea,
    position: "absolute",
    overflow: "hidden"
  }
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone.appendChild(div_clone2);

  //close button
  top = toggle ? 14 : 2;
  right = toggle ? 12 : 2;
  height = toggle ? 10 : 2;
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = greenClose;
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    position: "absolute",
    right: String(right) + ea,
    top: String(top) + ea,
    height: String(height) + ea,
    width: String(width) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  svg_clone.addEventListener("click", function (e) {
    e.stopPropagation();
    fileMotherinput.setAttribute("cus_close" + String(order), "true");
    mother.removeChild(div_clone);
  });
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  //wording
  width = toggle ? 400 : 41;
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.textContent = text;
  style = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: String(size) + ea,
    width: String(width) + ea,
    height: String(wordHeight) + ea,
    position: "relative",
    textAlign: "left",
    overflow: "hidden",
  }
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);

  mother.appendChild(div_clone);
}

DeseventJs.prototype.returnBlocks = function (pageBoo) {
  const instance = this;
  let targetBlocks;

  targetBlocks = [
    {
      name: "designer",
      height: { desktop: ((pageBoo !== "portfolio") ? 170 : 138), mobile: ((pageBoo !== "portfolio") ? 56.2 : 36.8), },
      desktop: [
        //성함
        {
          titleStyle: {
            top: 56.5,
            left: 0,
          },
          callback: function (needs) {
            let dom, top, left, width;
            let ea;
            let input;

            ea = "px";

            top = 56.5 - 6.5;
            left = 99.5;
            width = 149;

            dom = DeseventJs.inputMaker(true, "blocks_name");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(width) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.desktop.designer = { type: "text", input: input };
            return dom;
          }
        },
        //연락처
        {
          titleStyle: {
            top: 101.5,
            left: 0,
          },
          callback: function (needs) {
            let dom, top, left, width;
            let ea;
            let input;

            ea = "px";

            top = 101.5 - 6.5;
            left = 99.5;
            width = 149;

            dom = DeseventJs.inputMaker(true, "blocks_phone");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(width) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "010-0000-0000");
            input.setAttribute("hypenboo", "yes");
            input.addEventListener("keyup", function (e) {
              this.value = GeneralJs.autoHypenPhone(this.value);
            });

            instance.values.data.desktop.phone = { type: "text", input: input };
            return dom;
          }
        },
        //주소
        {
          titleStyle: {
            top: 56.5,
            right: 534,
            display: (pageBoo !== "portfolio" ? "block" : "none"),
          },
          callback: function (needs) {
            const { buttons } = needs;

            let h = document.createDocumentFragment();
            let dom, input, img;
            let svg_clone;
            let height, width, ea = "px";
            let style = {};

            //button
            height = 31;
            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              background: "#2fa678",
              height: String(31) + ea,
              borderRadius: String(3) + ea,
              cursor: "pointer",
              top: String(50) + ea,
              right: String(417) + ea,
              width: String(60) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            height = 11;
            svg_clone = SvgTong.tongMaker();
            svg_clone.classList.add("hoverdefault");
            svg_clone.src = buttons[0].src.desktop;
            width = GeneralJs.parseRatio({ source: buttons[0].src.desktop, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.5s ease",
              top: String(9) + ea,
              left: "50%",
              width: String(width) + ea,
              height: String(height) + ea,
              marginLeft: String((-1 * (width / 2)) - 0.9) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            dom.addEventListener("click", DeseventJs.postEvent("desktop"));
            dom.appendChild(SvgTong.parsing(svg_clone));
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            }

            //address
            dom = DeseventJs.inputMaker(true, "blocks_address0");
            dom.style.top = "50px";
            dom.style.right = "0px";
            dom.style.width = "407px";
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "주소");
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            } else {
              instance.values.data.desktop.address = { type: "text", input: input };
            }

            //detail address
            dom = DeseventJs.inputMaker(true, "blocks_address1");
            dom.style.top = "95px";
            dom.style.right = "0px";
            dom.style.width = "477px";
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "상세 주소");
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            } else {
              instance.values.data.desktop.detailAddress = { type: "text", input: input };
            }

            return h;
          }
        },
        //이메일
        {
          titleStyle: {
            top: (pageBoo !== "portfolio" ? 145 : 101.5),
            right: 518,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(true, "blocks_email");
            if (pageBoo !== "portfolio") {
              dom.style.bottom = "0px";
            } else {
              dom.style.top = "95px";
            }
            dom.style.right = "0px";
            dom.style.width = "477px";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "example@home-liaison.com");
            instance.values.data.desktop.email = { type: "text", input: input };
            return dom;
          }
        },
      ],
      mobile: [
        //성함
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(false, "moblocks_name");
            dom.style.top = "10vw";
            dom.style.left = "21.2vw";
            dom.style.width = "36vw";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.mobile.designer = { type: "text", input: input };
            return dom;
          }
        },
        //연락처
        {
          titleStyle: {
            top: 21.3,
            left: 0,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(false, "moblocks_phone");
            dom.style.top = "20vw";
            dom.style.left = "21.2vw";
            dom.style.width = "36vw";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "010-0000-0000");
            input.setAttribute("hypenboo", "yes");
            input.addEventListener("keyup", function (e) {
              this.value = GeneralJs.autoHypenPhone(this.value);
            });
            instance.values.data.mobile.phone = { type: "text", input: input };
            return dom;
          }
        },
        //주소
        {
          titleStyle: {
            top: 31.1,
            left: 0,
            display: (pageBoo !== "portfolio" ? "block" : "none"),
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h = document.createDocumentFragment();
            let dom, input, img;
            let svg_clone;
            let height, width, ea = "vw";
            let style = {};
            let addressTop = "29.6vw";

            //button
            height = 7.1;
            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              background: "#2fa678",
              height: String(7.1) + ea,
              borderRadius: String(3) + "px",
              cursor: "pointer",
              top: addressTop,
              left: String(21.2) + ea,
              width: String(14) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }
            height = 2.6;
            svg_clone = SvgTong.tongMaker();
            svg_clone.classList.add("hoverdefault");
            svg_clone.src = buttons[0].src.mobile;
            width = GeneralJs.parseRatio({ source: buttons[0].src.mobile, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.5s ease",
              top: String(2) + ea,
              left: "50%",
              width: String(width - 0.1) + ea,
              height: String(height) + ea,
              marginLeft: String((-1 * (width / 2)) - 0.1) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            dom.addEventListener("click", DeseventJs.postEvent("mobile"));
            dom.appendChild(SvgTong.parsing(svg_clone));
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            }

            //address
            dom = DeseventJs.inputMaker(false, "moblocks_address0");
            dom.style.top = addressTop;
            dom.style.left = "37.2vw";
            dom.style.width = "50.4vw";
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "주소");
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            } else {
              instance.values.data.mobile.address = { type: "text", input: input };
            }

            //detail address
            dom = DeseventJs.inputMaker(false, "moblocks_address1");
            dom.style.top = "39.4vw";
            dom.style.left = "21.2vw";
            dom.style.width = "66.5vw";
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "상세 주소");
            h.appendChild(dom);
            if (pageBoo === "portfolio") {
              dom.style.display = "none";
            } else {
              instance.values.data.mobile.detailAddress = { type: "text", input: input };
            }

            return h;
          }
        },
        //이메일
        {
          titleStyle: {
            top: ((pageBoo !== "portfolio") ? 50.5 : 31.1),
            left: 0,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(false, "moblocks_email");
            dom.style.bottom = "0vw";
            dom.style.left = "21.2vw";
            dom.style.width = "66.5vw";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "example@home-liaison.com");
            instance.values.data.mobile.email = { type: "text", input: input };
            return dom;
          }
        },
      ],
    },
    {
      name: "presentation",
      height: { desktop: 343, mobile: 84.7, },
      desktop: [
        //시간
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let margin;
            let onoffEvent;

            ea = "px";
            top = 57;
            height = 15;
            left = 162;
            margin = 168;

            h = document.createDocumentFragment();
            GeneralJs.stacks["radioDoms0_desktop"] = [];

            instance.values.data.desktop.presentationTimes = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(left + (margin * j)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);

              instance.values.data.desktop.presentationTimes.input.push(svg_dom);
              GeneralJs.stacks["radioDoms0_desktop"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms0_desktop"].length; j++) {
                if (GeneralJs.stacks["radioDoms0_desktop"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms0_desktop"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms0_desktop"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms0_desktop"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms0_desktop"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms0_desktop"].length; j++) {
              if (!buttons[j].limit) {
                GeneralJs.stacks["radioDoms0_desktop"][j].addEventListener("click", onoffEvent);
              } else {
                GeneralJs.stacks["radioDoms0_desktop"][j].addEventListener("click", function (e) {
                  alert("해당 항목은 마감되었습니다!");
                });
              }
            }

            return h;
          }
        },
        //유입 경로
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let margin;
            let onoffEvent;
            let totalWidth;

            ea = "px";
            top = 101;
            height = 15;
            left = 162;
            margin = 30;
            totalWidth = left;

            h = document.createDocumentFragment();
            GeneralJs.stacks["radioDoms1_desktop"] = [];
            instance.values.data.desktop.comeFrom = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(totalWidth) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }

              totalWidth += width;
              totalWidth += margin;

              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.desktop.comeFrom.input.push(svg_dom);
              GeneralJs.stacks["radioDoms1_desktop"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms1_desktop"].length; j++) {
                if (GeneralJs.stacks["radioDoms1_desktop"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms1_desktop"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms1_desktop"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms1_desktop"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms1_desktop"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms1_desktop"].length; j++) {
              GeneralJs.stacks["radioDoms1_desktop"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //홍보 채널
        {
          titleStyle: {
            top: 145,
            left: 0,
          },
          callback: function (needs) {
            const { buttons, notice } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let middleLeft, secondLeft;
            let margin;
            let popupEvent;
            let totalWidth;
            let valueTong;

            ea = "px";
            top = 145;
            height = 15;
            left = 162;
            margin = 30;
            totalWidth = left;

            h = document.createDocumentFragment();
            valueTong = new Array(buttons.length);
            GeneralJs.stacks["specialDoms0_desktop"] = [];
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.desktop.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(totalWidth) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }

              if (j !== buttons.length - 1) {
                middleLeft = totalWidth;
              }
              secondLeft = totalWidth;

              totalWidth += width;
              totalWidth += margin;

              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_desktop"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "px";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;
              let okEvent;

              height = 15;
              marginLeft = 25;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.desktop;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = width + (marginLeft * 2);
              inputHeight = 30;
              iconWidth = 14;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 28) + ea,
                left: String(thisIndex === 0 ? left : (thisIndex === 1 ? middleLeft : secondLeft)) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + ea,
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 12) + ea,
                marginBottom: String(marginLeft - 4 + height + 12 - 5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft - 4) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              okEvent = function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("desktop.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("desktop.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("desktop.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + ea,
                    opacity: String(0.9),
                    marginBottom: String(5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight - 3) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + ea,
                    wordSpacing: String(-0.5) + ea,
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(13) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  input_clone.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                      okEvent.call(this, e);
                    }
                  });
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }

              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% - " + String(10 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "px";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% + " + String(10 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", okEvent);
              div_clone.appendChild(svg_clone);
              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_desktop"].length; j++) {
              GeneralJs.stacks["specialDoms0_desktop"][j].addEventListener("click", popupEvent);
            }

            //notice
            height = 13;
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop[1];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.3s ease",
              top: String(top + 2) + ea,
              left: String(totalWidth - 3) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            h.appendChild(svg_dom);

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 189,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left;
            let width, height;
            let grayHeight, grayWidth;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            ea = "px";
            top = 189 - 0;
            left = 162;
            grayWidth = 717;
            grayHeight = 128;
            grayPadding = 17;

            h = document.createDocumentFragment();

            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(grayWidth - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              background: "#f2f2f2",
              borderRadius: String(3) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }
            dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            dom.addEventListener("dragenter", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragover", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragleave", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            h.appendChild(dom);

            height = 22;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(top + (grayHeight / 2) - (height / 2) - 4) + ea,
              left: String(left + (grayWidth / 2) - (width / 2) - 2) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            height = 14;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop[0];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.3s ease",
              top: String(top + grayHeight + 12) + ea,
              left: String(left + grayWidth - width) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.desktop = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(dom, this, i, true);
                }
              }
            });

            dom.addEventListener("drop", function (e) {
              e.preventDefault();
              e.stopPropagation();
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.files = e.dataTransfer.files;
              const files = instance.fileBox.desktop.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(this, instance.fileBox.desktop, i, true);
                }
              }
            });

            return h;
          }
        },
      ],
      mobile: [
        //시간
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let onoffEvent;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 11.5;
            left = 26;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["radioDoms0_mobile"] = [];
            instance.values.data.mobile.presentationTimes = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.2;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String((j < 2) ? top : ((j < 4) ? top + 5.3 : top + 10.6)) + ea,
                left: String((j % 2) ? 58 : left) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.mobile.presentationTimes.input.push(svg_dom);
              GeneralJs.stacks["radioDoms0_mobile"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms0_mobile"].length; j++) {
                if (GeneralJs.stacks["radioDoms0_mobile"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms0_mobile"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms0_mobile"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms0_mobile"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms0_mobile"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms0_mobile"].length; j++) {
              if (!buttons[j].limit) {
                GeneralJs.stacks["radioDoms0_mobile"][j].addEventListener("click", onoffEvent);
              } else {
                GeneralJs.stacks["radioDoms0_mobile"][j].addEventListener("click", function (e) {
                  alert("해당 항목은 마감되었습니다!");
                });
              }
            }

            return h;
          }
        },
        //유입 경로
        {
          titleStyle: {
            top: 29.2,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let onoffEvent;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 29.2;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["radioDoms1_mobile"] = [];
            instance.values.data.mobile.comeFrom = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.1;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + ((j < 3) ? 0 : 5.1)) + ea,
                left: String((j % 3 === 0) ? 26 : ((j % 3 === 1) ? 49.5 : 73)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.mobile.comeFrom.input.push(svg_dom);
              GeneralJs.stacks["radioDoms1_mobile"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms1_mobile"].length; j++) {
                if (GeneralJs.stacks["radioDoms1_mobile"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms1_mobile"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms1_mobile"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms1_mobile"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms1_mobile"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms1_mobile"].length; j++) {
              GeneralJs.stacks["radioDoms1_mobile"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //홍보 채널
        {
          titleStyle: {
            top: 41.6,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let popupEvent;
            let line;
            let valueTong;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 41.6;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["specialDoms0_mobile"] = [];
            valueTong = new Array(buttons.length);
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.mobile.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.1;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + ((j < 3) ? 0 : 5.1)) + ea,
                left: String((j % 3 === 0) ? 26 : ((j % 3 === 1) ? 49.5 : 73)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_mobile"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "vw";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;

              height = 10;
              marginLeft = 4.5;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.mobile;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = 87.9;
              inputHeight = 8;
              iconWidth = 4;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 6) + ea,
                left: String(0) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + "px",
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 7.5) + ea,
                marginBottom: String(marginLeft - 4 + height + 1.5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + "px",
                    opacity: String(0.9),
                    marginBottom: String(1.5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(7.2) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + "px",
                    wordSpacing: String(-0.5) + "px",
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(3.2) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }


              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% - " + String(3 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "vw";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% + " + String(3 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("mobile.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("mobile.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("mobile.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              });
              div_clone.appendChild(svg_clone);

              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_mobile"].length; j++) {
              GeneralJs.stacks["specialDoms0_mobile"][j].addEventListener("click", popupEvent);
            }

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 52.3,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let box;
            let grayWidth, grayHeight;
            let grayTop;
            let svg_clone, svg_dom;
            let line;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 52.3 - 1.5;
            left = 36;
            grayWidth = 87;
            grayHeight = 20;
            grayTop = top + 8.7;
            grayPadding = 2.5;

            box = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderRadius: String(3) + "px",
              width: String(grayWidth - grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              left: String(0) + ea,
              top: String(grayTop) + ea,
              background: "#f2f2f2",
              cursor: "pointer",
              textAlign: "left",
            };
            for (let i in style) {
              box.style[i] = style[i];
            }
            h.appendChild(box);
            box.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            height = 5.3;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(grayTop + (grayHeight / 2) - (height / 2) - 0.2) + ea,
              left: String((grayWidth / 2) - (width / 2)) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            height = 2.8;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.mobile[0];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(grayTop + grayHeight + 2) + ea,
              left: String(0 + grayWidth - width) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);

            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.mobile = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(box, this, i, false);
                }
              }
            });

            return h;
          }
        },
      ],
    },
    {
      name: "partnership",
      height: { desktop: 908, mobile: 264, },
      desktop: [
        //사업자 구분
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let margin;
            let onoffEvent;

            ea = "px";
            top = 57;
            height = 15;
            left = 162;
            margin = 191;

            h = document.createDocumentFragment();
            GeneralJs.stacks["radioDoms0_desktop"] = [];
            instance.values.data.desktop.classification = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(left + (margin * j)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.desktop.classification.input.push(svg_dom);
              GeneralJs.stacks["radioDoms0_desktop"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms0_desktop"].length; j++) {
                if (GeneralJs.stacks["radioDoms0_desktop"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms0_desktop"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms0_desktop"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms0_desktop"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms0_desktop"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms0_desktop"].length; j++) {
              GeneralJs.stacks["radioDoms0_desktop"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //회사명
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;

            ea = "px";

            top = 101 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership0");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "회사명");
            instance.values.data.desktop.company = { type: "text", input: input };

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            input.addEventListener("focus", function (e) {
              svg_dom.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              svg_dom.style.opacity = String(1);
            });

            return h;
          }
        },
        //사업자 등록번호
        {
          titleStyle: {
            top: 145,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;

            ea = "px";

            top = 145 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership1");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "000-00-00000");
            instance.values.data.desktop.businessNumber = { type: "text", input: input };

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            input.addEventListener("focus", function (e) {
              svg_dom.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              this.value = this.value.replace(/[^0-9\-\.]/g, '');
              svg_dom.style.opacity = String(1);
            });

            return h;
          }
        },
        //개업일
        {
          titleStyle: {
            top: 189,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;

            ea = "px";

            top = 189 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership2");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2000-00-00");
            instance.values.data.desktop.startDate = { type: "text", input: input };

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            input.addEventListener("focus", function (e) {
              svg_dom.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              svg_dom.style.opacity = String(1);

              this.value = this.value.trim().replace(/[^0-9\-]/gi, '');

              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(this.value)) {
                if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9] [0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (this.value !== "") {
                  GeneralJs.inputBackward(this, "개업일을 정확히 입력해주세요! 형식) yyyy-mm-dd");
                } else {
                  this.value = "";
                }
              }

            });
            return h;
          }
        },
        //대표자 성함
        {
          titleStyle: {
            top: 233,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;

            ea = "px";

            top = 233 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership3");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.desktop.representative = { type: "text", input: input };

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            input.addEventListener("focus", function (e) {
              svg_dom.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              svg_dom.style.opacity = String(1);
            });

            return h;
          }
        },
        //은행명
        {
          titleStyle: {
            top: 310,
            left: 0,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(true, "partnership4");
            dom.style.top = "303px";
            dom.style.left = "162px";
            dom.style.width = "160px";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "은행명");
            instance.values.data.desktop.bankName = { type: "text", input: input };
            return dom;
          }
        },
        //계좌 번호
        {
          titleStyle: {
            top: 310,
            right: 425,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style;
            let ea;
            let top, right, inputWidth;
            let popup_dom;
            let popupHeight;
            let width, height, margin;
            let svg_clone, svg_dom;

            ea = "px";
            top = 310 - 7;
            right = 0;
            inputWidth = 400;
            popupHeight = 32;
            height = 13;
            margin = 9;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership5");
            dom.style.top = String(top) + ea;
            dom.style.right = String(right) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "계좌 번호");
            instance.values.data.desktop.bankAccount = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(margin) + ea,
              left: String(margin + 6) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 1) + ea,
              width: String(width + ((margin + 6) * 2)) + ea,
              height: String(popupHeight) + ea,
              right: String(right + (inputWidth / 2) - ((width + ((margin + 6) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              this.value = this.value.replace(/[^0-9\-\.]/g, '');
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["popupTimeouts0"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["popupTimeouts0"]);
                GeneralJs.timeouts["popupTimeouts0"] = null;
              }, 301);
            });

            return h;
          }
        },
        //예금주명
        {
          titleStyle: {
            top: 354,
            left: 0,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(true, "partnership6");
            dom.style.top = "347px";
            dom.style.left = "162px";
            dom.style.width = "160px";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.desktop.bankTo = { type: "text", input: input };
            return dom;
          }
        },
        //기타 사항
        {
          titleStyle: {
            top: 354,
            right: 425,
          },
          callback: function (needs) {
            let dom = DeseventJs.inputMaker(true, "partnership7");
            dom.style.top = "347px";
            dom.style.right = "0px";
            dom.style.width = "400px";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "기타");
            instance.values.data.desktop.bankEtc = { type: "text", input: input };
            return dom;
          }
        },
        //인테리어 경력
        {
          titleStyle: {
            top: 431,
            left: 0,
          },
          callback: function (needs) {
            const { notice, popup } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let targetNotice;

            ea = "px";

            top = 431 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            popupSvgHeight = 50;
            popupHeight = 80;
            popupMargin = 14;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership8");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2년 6개월");
            instance.values.data.desktop.interiorCareer = { type: "text", input: input };
            GeneralJs.stacks["interiorCareerInput_desktop"] = input;

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            targetNotice = svg_dom;

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" }) + 1;
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 4) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 1) + ea,
              width: String(width + ((popupMargin + 4) * 2)) + ea,
              height: String(popupHeight) + ea,
              left: String(left + (inputWidth / 2) - ((width + ((popupMargin + 4) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
              targetNotice.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              targetNotice.style.opacity = String(1);
              GeneralJs.timeouts["popupTimeouts1"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["popupTimeouts1"]);
                GeneralJs.timeouts["popupTimeouts1"] = null;
              }, 301);

              this.value = this.value.trim();

              if (this.value === '') {
                this.value = '';
              } else {
                if (!/년/.test(this.value)) {
                  this.value = "";
                  GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                } else {
                  tempArr = this.value.split("년");
                  if (Number.isNaN(Number(tempArr[0].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number.isNaN(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number(tempArr[1].replace(/[^0-9]/g, '')) > 12) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else {
                    this.value = String(Number(tempArr[0].replace(/[^0-9]/g, ''))) + '년 ' + String(Number(tempArr[1].replace(/[^0-9]/g, ''))) + "개월";
                  }
                }
              }

            });

            return h;
          }
        },
        //스타일링 경력
        {
          titleStyle: {
            top: 475,
            left: 0,
          },
          callback: function (needs) {
            const { notice, popup } = needs;
            let h;
            let dom, input;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left, inputWidth, margin;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let targetNotice;

            ea = "px";

            top = 475 - 7;
            left = 162;
            inputWidth = 239;
            height = 13;
            margin = 12;

            popupSvgHeight = 31;
            popupHeight = 58;
            popupMargin = 13;

            h = document.createDocumentFragment();

            dom = DeseventJs.inputMaker(true, "partnership9");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2년 6개월 or 위와 같음");
            instance.values.data.desktop.stylingCareer = { type: "text", input: input };

            h.appendChild(dom);

            for (let j = 0; j < 2; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = notice.src.desktop[j];
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + Number(dom.style.height.replace(/[^0-9\.\-]/g, '')) - height - 1) + ea,
                left: String(left + inputWidth + margin) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
            }

            targetNotice = svg_dom;

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" }) + 2;
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 5) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 1) + ea,
              width: String(width + ((popupMargin + 5) * 2)) + ea,
              height: String(popupHeight) + ea,
              left: String(left + (inputWidth / 2) - ((width + ((popupMargin + 5) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
              targetNotice.style.opacity = String(0);
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              targetNotice.style.opacity = String(1);
              GeneralJs.timeouts["popupTimeouts2"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["popupTimeouts2"]);
                GeneralJs.timeouts["popupTimeouts2"] = null;
              }, 301);

              if (/같/gi.test(this.value)) {
                this.value = GeneralJs.stacks["interiorCareerInput_desktop"].value;
              }

              this.value = this.value.trim();

              if (this.value === '') {
                this.value = '';
              } else {
                if (!/년/.test(this.value)) {
                  this.value = "";
                  GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                } else {
                  tempArr = this.value.split("년");
                  if (Number.isNaN(Number(tempArr[0].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number.isNaN(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number(tempArr[1].replace(/[^0-9]/g, '')) > 12) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else {
                    this.value = String(Number(tempArr[0].replace(/[^0-9]/g, ''))) + '년 ' + String(Number(tempArr[1].replace(/[^0-9]/g, ''))) + "개월";
                  }
                }
              }

            });

            return h;
          }
        },
        //경력 상세
        {
          titleStyle: {
            top: 519,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom;
            let textArea;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left;
            let width, height;
            let margin;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let inputWidth

            ea = "px";
            top = 519 - 7;
            left = 162;
            width = 717;
            height = 128;
            margin = 14;
            inputWidth = width;

            popupSvgHeight = 68;
            popupHeight = 99;
            popupMargin = 15;

            h = document.createDocumentFragment();

            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              background: "#f2f2f2",
              borderRadius: String(3) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            textArea = GeneralJs.nodes.textarea.cloneNode(true);
            style = {
              backgroundColor: "transparent",
              top: String(0),
              left: String(0),
              border: String(0),
              outline: String(0),
              fontFamily: "'Noto Sans KR',sans-serif",
              fontSize: String(14) + ea,
              color: "#404040",
              lineHeight: String(1.7),
              letterSpacing: String(-0.5) + ea,
              textShadow: "none",
              textDecoration: "none",
              textTransform: "none",
              padding: "10.5px 15px 9px",
              position: "absolute",
              width: String(100) + '%',
              height: String(100) + '%',
              textAlign: "left",
            };
            for (let i in style) {
              textArea.style[i] = style[i];
            }

            textArea.setAttribute("placeholder", popup.description.desktop.join("\n"));

            dom.appendChild(textArea);
            instance.values.data.desktop.careerDetail = { type: "text", input: textArea };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" }) + 6;
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 1) + ea,
              width: String(width + ((popupMargin + 3) * 2)) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            textArea.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            textArea.addEventListener("blur", function (e) {
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["popupTimeouts1"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["popupTimeouts1"]);
                GeneralJs.timeouts["popupTimeouts1"] = null;
              }, 301);
            });

            return h;
          }
        },
        //홍보 채널
        {
          titleStyle: {
            top: 692,
            left: 0,
          },
          callback: function (needs) {
            const { buttons, notice } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let middleLeft, secondLeft;
            let margin;
            let popupEvent;
            let totalWidth;
            let valueTong;

            ea = "px";
            top = 692;
            height = 15;
            left = 162;
            margin = 30;
            totalWidth = left;

            h = document.createDocumentFragment();
            valueTong = new Array(buttons.length);
            GeneralJs.stacks["specialDoms0_desktop"] = [];
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.desktop.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(totalWidth) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }

              if (j !== buttons.length - 1) {
                middleLeft = totalWidth;
              }
              secondLeft = totalWidth;

              totalWidth += width;
              totalWidth += margin;

              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_desktop"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "px";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;
              let okEvent;

              height = 15;
              marginLeft = 25;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.desktop;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = width + (marginLeft * 2);
              inputHeight = 30;
              iconWidth = 14;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 28) + ea,
                left: String(thisIndex === 0 ? left : (thisIndex === 1 ? middleLeft : secondLeft)) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + ea,
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 12) + ea,
                marginBottom: String(marginLeft - 4 + height + 12 - 5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft - 4) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              okEvent = function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("desktop.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("desktop.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("desktop.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + ea,
                    opacity: String(0.9),
                    marginBottom: String(5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight - 3) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + ea,
                    wordSpacing: String(-0.5) + ea,
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(13) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  input_clone.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                      okEvent.call(this, e);
                    }
                  });
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }

              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% - " + String(10 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "px";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% + " + String(10 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", okEvent);
              div_clone.appendChild(svg_clone);
              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_desktop"].length; j++) {
              GeneralJs.stacks["specialDoms0_desktop"][j].addEventListener("click", popupEvent);
            }

            //notice
            height = 13;
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop[1];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.3s ease",
              top: String(top + 2) + ea,
              left: String(totalWidth - 3) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            h.appendChild(svg_dom);

            return h;
          }
        },
        //유입 경로
        {
          titleStyle: {
            top: 736,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let margin;
            let onoffEvent;
            let totalWidth;

            ea = "px";
            top = 736;
            height = 15;
            left = 162;
            margin = 30;
            totalWidth = left;

            h = document.createDocumentFragment();
            GeneralJs.stacks["radioDoms1_desktop"] = [];
            instance.values.data.desktop.comeFrom = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(totalWidth) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }

              totalWidth += width;
              totalWidth += margin;

              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.desktop.comeFrom.input.push(svg_dom);
              GeneralJs.stacks["radioDoms1_desktop"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms1_desktop"].length; j++) {
                if (GeneralJs.stacks["radioDoms1_desktop"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms1_desktop"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms1_desktop"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms1_desktop"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms1_desktop"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms1_desktop"].length; j++) {
              GeneralJs.stacks["radioDoms1_desktop"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 780,
            left: 0,
          },
          callback: function (needs) {
            let h;
            let dom;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left;
            let width, height;
            let grayHeight, grayWidth;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            ea = "px";
            top = 780 - 0;
            left = 162;
            grayWidth = 717;
            grayHeight = 128;
            grayPadding = 17;

            h = document.createDocumentFragment();

            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(grayWidth - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              background: "#f2f2f2",
              borderRadius: String(3) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }
            dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            dom.addEventListener("dragenter", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragover", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragleave", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            h.appendChild(dom);

            height = 22;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(top + (grayHeight / 2) - (height / 2) - 4) + ea,
              left: String(left + (grayWidth / 2) - (width / 2) - 2) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.desktop = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(dom, this, i, true);
                }
              }
            });

            dom.addEventListener("drop", function (e) {
              e.preventDefault();
              e.stopPropagation();
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.files = e.dataTransfer.files;
              const files = instance.fileBox.desktop.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(this, instance.fileBox.desktop, i, true);
                }
              }
            });

            return h;
          }
        },
      ],
      mobile: [
        //사업자 구분
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let onoffEvent;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 11.5;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["radioDoms0_mobile"] = [];
            instance.values.data.mobile.classification = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.2;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String((j < 2) ? top : top + 5.3) + ea,
                left: String((j % 2) ? 62.4 : left) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.mobile.classification.input.push(svg_dom);
              GeneralJs.stacks["radioDoms0_mobile"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms0_mobile"].length; j++) {
                if (GeneralJs.stacks["radioDoms0_mobile"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms0_mobile"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms0_mobile"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms0_mobile"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms0_mobile"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms0_mobile"].length; j++) {
              GeneralJs.stacks["radioDoms0_mobile"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //회사명
        {
          titleStyle: {
            top: 25.08,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 25.08 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership0");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "회사명");
            instance.values.data.mobile.company = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts1"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts1"]);
                GeneralJs.timeouts["mopopupTimeouts1"] = null;
              }, 301);
            });

            return h;
          }
        },
        //사업자 등록번호
        {
          titleStyle: {
            top: 34.88,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 34.88 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership1");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "000-00-00000");
            instance.values.data.mobile.businessNumber = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              this.value = this.value.replace(/[^0-9\-\.]/g, '');
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts2"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts2"]);
                GeneralJs.timeouts["mopopupTimeouts2"] = null;
              }, 301);
            });

            return h;
          }
        },
        //개업일
        {
          titleStyle: {
            top: 44.68,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 44.68 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership2");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2000-00-00");
            instance.values.data.mobile.startDate = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts3"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts3"]);
                GeneralJs.timeouts["mopopupTimeouts3"] = null;
              }, 301);

              this.value = this.value.trim().replace(/[^0-9\-]/gi, '');

              if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(this.value)) {
                if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
                } else if (/^[0-9][0-9] [0-9] [0-9][0-9]$/.test(this.value)) {
                  tempArr = this.value.split("-");
                  this.value = '20' + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
                } else if (this.value !== "") {
                  GeneralJs.inputBackward(this, "개업일을 정확히 입력해주세요! 형식) yyyy-mm-dd");
                } else {
                  this.value = "";
                }
              }

            });

            return h;
          }
        },
        //대표자 성함
        {
          titleStyle: {
            top: 54.48,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 54.48 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership3");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.mobile.representative = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts4"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts4"]);
                GeneralJs.timeouts["mopopupTimeouts4"] = null;
              }, 301);
            });

            return h;
          }
        },
        //은행명
        {
          titleStyle: {
            top: 80.84,
            left: 0,
          },
          callback: function (needs) {
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let line;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 80.84 - 1.5;
            left = 26;
            width = 62;

            line = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderTop: "1px dashed #dddddd",
              width: String(87) + ea,
              left: String(0) + ea,
              top: String(top - 10.18) + ea,
            };
            for (let i in style) {
              line.style[i] = style[i];
            }
            h.appendChild(line);

            dom = DeseventJs.inputMaker(false, "mopartnership4");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "은행명");
            instance.values.data.mobile.bankName = { type: "text", input: input };

            h.appendChild(dom);

            return h;
          }
        },
        //계좌 번호
        {
          titleStyle: {
            top: 90.64,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 90.64 - 1.5;
            left = 26;
            width = 62;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership5");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "계좌 번호");
            instance.values.data.mobile.bankAccount = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              this.value = this.value.replace(/[^0-9\-\.]/g, '');
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts5"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts5"]);
                GeneralJs.timeouts["mopopupTimeouts5"] = null;
              }, 301);
            });


            return h;
          }
        },
        //예금주명
        {
          titleStyle: {
            top: 100.44,
            left: 0,
          },
          callback: function (needs) {
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 100.44 - 1.5;
            left = 26;
            width = 62;

            dom = DeseventJs.inputMaker(false, "mopartnership6");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");
            instance.values.data.mobile.bankTo = { type: "text", input: input };

            h.appendChild(dom);

            return h;
          }
        },
        //기타사항
        {
          titleStyle: {
            top: 110.24,
            left: 0,
          },
          callback: function (needs) {
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 110.24 - 1.5;
            left = 26;
            width = 62;

            dom = DeseventJs.inputMaker(false, "mopartnership7");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "기타");
            instance.values.data.mobile.bankEtc = { type: "text", input: input };

            h.appendChild(dom);

            return h;
          }
        },
        //인테리어 경력
        {
          titleStyle: {
            top: 136.6,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let line;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 136.6 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 13.5;
            popupHeight = 20.5
            popupMargin = 3.5;

            line = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderTop: "1px dashed #dddddd",
              width: String(88) + ea,
              left: String(0) + ea,
              top: String(top - 10.18) + ea,
            };
            for (let i in style) {
              line.style[i] = style[i];
            }
            h.appendChild(line);

            dom = DeseventJs.inputMaker(false, "mopartnership8");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2년 6개월");
            instance.values.data.mobile.interiorCareer = { type: "text", input: input };
            GeneralJs.stacks["interiorCareerInput_mobile"] = input;

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts8"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts8"]);
                GeneralJs.timeouts["mopopupTimeouts8"] = null;
              }, 301);

              this.value = this.value.trim();

              if (this.value === '') {
                this.value = '';
              } else {
                if (!/년/.test(this.value)) {
                  this.value = "";
                  GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                } else {
                  tempArr = this.value.split("년");
                  if (Number.isNaN(Number(tempArr[0].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number.isNaN(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number(tempArr[1].replace(/[^0-9]/g, '')) > 12) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else {
                    this.value = String(Number(tempArr[0].replace(/[^0-9]/g, ''))) + '년 ' + String(Number(tempArr[1].replace(/[^0-9]/g, ''))) + "개월";
                  }
                }
              }

            });

            return h;
          }
        },
        //스타일링 경력
        {
          titleStyle: {
            top: 146.4,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let popup_dom;
            let popupHeight;
            let popupMargin;
            let popupSvgHeight;
            let svg_dom, svg_clone;
            let margin;
            let inputWidth;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 146.4 - 1.5;
            left = 36;
            width = 52;
            inputWidth = width;

            height = 13;
            margin = 12;

            popupSvgHeight = 8.5;
            popupHeight = 15.7;
            popupMargin = 3.5;

            dom = DeseventJs.inputMaker(false, "mopartnership9");
            style = {
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }

            input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "2년 6개월 or 위와 같음");
            instance.values.data.mobile.stylingCareer = { type: "text", input: input };

            h.appendChild(dom);

            popup_dom = GeneralJs.nodes.div.cloneNode(true);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = popup.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: popupSvgHeight, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(popupMargin) + ea,
              left: String(popupMargin + 0.3) + ea,
              width: String(width) + ea,
              height: String(popupSvgHeight) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - margin + 10) + ea,
              width: String(inputWidth) + ea,
              height: String(popupHeight) + ea,
              left: String(left) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.4s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              let temp, tempArr;

              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.timeouts["mopopupTimeouts9"] = setTimeout(function () {
                popup_dom.style.display = "none";
                clearTimeout(GeneralJs.timeouts["mopopupTimeouts9"]);
                GeneralJs.timeouts["mopopupTimeouts9"] = null;
              }, 301);

              if (/같/gi.test(this.value)) {
                this.value = GeneralJs.stacks["interiorCareerInput_mobile"].value;
              }

              this.value = this.value.trim();

              if (this.value === '') {
                this.value = '';
              } else {
                if (!/년/.test(this.value)) {
                  this.value = "";
                  GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                } else {
                  tempArr = this.value.split("년");
                  if (Number.isNaN(Number(tempArr[0].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number.isNaN(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else if (Number(tempArr[1].replace(/[^0-9]/g, '')) > 12) {
                    this.value = "";
                    GeneralJs.inputBackward(this, "경력을 정확히 입력해주세요! 형식) 0년 0개월");
                  } else {
                    this.value = String(Number(tempArr[0].replace(/[^0-9]/g, ''))) + '년 ' + String(Number(tempArr[1].replace(/[^0-9]/g, ''))) + "개월";
                  }
                }
              }

            });

            return h;
          }
        },
        //경력 상세
        {
          titleStyle: {
            top: 156.2,
            left: 0,
          },
          callback: function (needs) {
            const { popup } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let box;
            let textArea;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 156.2 - 1.5;
            left = 36;
            width = 52;

            box = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderRadius: String(3) + "px",
              width: String(88) + ea,
              height: String(20) + ea,
              left: String(0) + ea,
              top: String(top + 8.7) + ea,
              background: "#f2f2f2",
            };
            for (let i in style) {
              box.style[i] = style[i];
            }

            textArea = GeneralJs.nodes.textarea.cloneNode(true);
            style = {
              backgroundColor: "transparent",
              top: String(0),
              left: String(0),
              border: String(0),
              outline: String(0),
              fontFamily: "'Noto Sans KR',sans-serif",
              fontSize: String(3.4) + ea,
              color: "#404040",
              lineHeight: String(1.5),
              letterSpacing: String(-0.5) + "px",
              textShadow: "none",
              textDecoration: "none",
              textTransform: "none",
              padding: String(2.2) + ea,
              paddingLeft: String(3) + ea,
              paddingRight: String(3) + ea,
              position: "absolute",
              width: String(100) + '%',
              height: String(100) + '%',
              textAlign: "left",
            };
            for (let i in style) {
              textArea.style[i] = style[i];
            }

            textArea.setAttribute("placeholder", popup.description.mobile.slice(0, 3).join("\n"));
            box.appendChild(textArea);
            h.appendChild(box);
            instance.values.data.mobile.careerDetail = { type: "text", input: textArea };

            return h;
          }
        },
        //홍보 채널
        {
          titleStyle: {
            top: 203.2,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let popupEvent;
            let line;
            let valueTong;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 203.2;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            line = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderTop: "1px dashed #dddddd",
              width: String(88) + ea,
              left: String(0) + ea,
              top: String(top - 10.18 + 1.2) + ea,
            };
            for (let i in style) {
              line.style[i] = style[i];
            }
            h.appendChild(line);

            GeneralJs.stacks["specialDoms0_mobile"] = [];
            valueTong = new Array(buttons.length);
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.mobile.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.1;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + ((j < 3) ? 0 : 5.1)) + ea,
                left: String((j % 3 === 0) ? 29 : ((j % 3 === 1) ? 51 : 73)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_mobile"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "vw";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;

              height = 10;
              marginLeft = 4.5;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.mobile;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = 87.9;
              inputHeight = 8;
              iconWidth = 4;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 6) + ea,
                left: String(0) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + "px",
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 7.5) + ea,
                marginBottom: String(marginLeft - 4 + height + 1.5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + "px",
                    opacity: String(0.9),
                    marginBottom: String(1.5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(7.2) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + "px",
                    wordSpacing: String(-0.5) + "px",
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(3.2) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }


              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% - " + String(3 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "vw";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% + " + String(3 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("mobile.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("mobile.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("mobile.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              });
              div_clone.appendChild(svg_clone);

              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_mobile"].length; j++) {
              GeneralJs.stacks["specialDoms0_mobile"][j].addEventListener("click", popupEvent);
            }

            return h;
          }
        },
        //유입 경로
        {
          titleStyle: {
            top: 213.2,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let onoffEvent;
            let line;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 213.2;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["radioDoms1_mobile"] = [];
            instance.values.data.mobile.comeFrom = { type: "radio", input: [] };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.1;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + ((j < 3) ? 0 : 5.1)) + ea,
                left: String((j % 3 === 0) ? 29 : ((j % 3 === 1) ? 51 : 73)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              instance.values.data.mobile.comeFrom.input.push(svg_dom);
              GeneralJs.stacks["radioDoms1_mobile"].push(svg_dom);
            }

            onoffEvent = function (e) {
              const thisIndex = this.getAttribute("index");
              for (let j = 0; j < GeneralJs.stacks["radioDoms1_mobile"].length; j++) {
                if (GeneralJs.stacks["radioDoms1_mobile"][j].getAttribute("index") !== thisIndex) {
                  GeneralJs.stacks["radioDoms1_mobile"][j].style.opacity = String(0);
                  GeneralJs.stacks["radioDoms1_mobile"][j].setAttribute("selected", "false");
                } else {
                  GeneralJs.stacks["radioDoms1_mobile"][j].style.opacity = String(1);
                  GeneralJs.stacks["radioDoms1_mobile"][j].setAttribute("selected", "true");
                }
              }
            }

            for (let j = 0; j < GeneralJs.stacks["radioDoms1_mobile"].length; j++) {
              GeneralJs.stacks["radioDoms1_mobile"][j].addEventListener("click", onoffEvent);
            }

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 223.5,
            left: 0,
          },
          callback: function (needs) {
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let box;
            let grayWidth, grayHeight;
            let grayTop;
            let svg_clone, svg_dom;
            let line;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 223.5 - 1.5;
            left = 36;
            grayWidth = 88;
            grayHeight = 20;
            grayTop = top + 8.7;
            grayPadding = 2.5;

            line = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderTop: "1px dashed #dddddd",
              width: String(88) + ea,
              left: String(0) + ea,
              top: String(grayTop + grayHeight + 10.18) + ea,
            };
            for (let i in style) {
              line.style[i] = style[i];
            }
            h.appendChild(line);

            box = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderRadius: String(3) + "px",
              width: String(grayWidth - grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              left: String(0) + ea,
              top: String(grayTop) + ea,
              background: "#f2f2f2",
              cursor: "pointer",
              textAlign: "left",
            };
            for (let i in style) {
              box.style[i] = style[i];
            }
            h.appendChild(box);
            box.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            height = 5.3;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(grayTop + (grayHeight / 2) - (height / 2) - 0.2) + ea,
              left: String((grayWidth / 2) - (width / 2)) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.mobile = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(box, this, i, false);
                }
              }
            });

            return h;
          }
        },
      ],
    },
    {
      name: "portfolio",
      height: { desktop: 255, mobile: 69, },
      desktop: [
        //홍보 채널
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            const { buttons, notice } = needs;
            let h;
            let style;
            let ea;
            let svg_clone, svg_dom;
            let top, left, height, width;
            let middleLeft, secondLeft;
            let margin;
            let popupEvent;
            let totalWidth;
            let valueTong;

            ea = "px";
            top = 57;
            height = 15;
            left = 162;
            margin = 30;
            totalWidth = left;

            h = document.createDocumentFragment();
            valueTong = new Array(buttons.length);
            GeneralJs.stacks["specialDoms0_desktop"] = [];
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.desktop.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top) + ea,
                left: String(totalWidth) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }

              if (j !== buttons.length - 1) {
                middleLeft = totalWidth;
              }
              secondLeft = totalWidth;

              totalWidth += width;
              totalWidth += margin;

              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.desktop.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_desktop"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "px";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;
              let okEvent;

              height = 15;
              marginLeft = 25;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.desktop;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = width + (marginLeft * 2);
              inputHeight = 30;
              iconWidth = 14;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 28) + ea,
                left: String(thisIndex === 0 ? left : (thisIndex === 1 ? middleLeft : secondLeft)) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + ea,
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 12) + ea,
                marginBottom: String(marginLeft - 4 + height + 12 - 5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft - 4) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              okEvent = function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("desktop.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("desktop.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("desktop.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_desktop"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + ea,
                    opacity: String(0.9),
                    marginBottom: String(5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight - 3) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + ea,
                    wordSpacing: String(-0.5) + ea,
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(13) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  input_clone.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                      okEvent.call(this, e);
                    }
                  });
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }

              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% - " + String(10 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "px";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + ea,
                  opacity: String(0.9),
                  marginBottom: String(5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight - 3) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + ea,
                  wordSpacing: String(-0.5) + ea,
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(13) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                input_clone.addEventListener("keypress", function (e) {
                  if (e.key === "Enter") {
                    okEvent.call(this, e);
                  }
                });
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft - 8) + ea,
                left: "calc(50% + " + String(10 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", okEvent);
              div_clone.appendChild(svg_clone);
              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_desktop"].length; j++) {
              GeneralJs.stacks["specialDoms0_desktop"][j].addEventListener("click", popupEvent);
            }

            //notice
            height = 13;
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop[1];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.3s ease",
              top: String(top + 2) + ea,
              left: String(totalWidth - 3) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            h.appendChild(svg_dom);

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom;
            let svg_clone, svg_dom;
            let style;
            let ea;
            let top, left;
            let width, height;
            let grayHeight, grayWidth;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            ea = "px";
            top = 101 - 0;
            left = 162;
            grayWidth = 717;
            grayHeight = 128;
            grayPadding = 17;

            h = document.createDocumentFragment();

            dom = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              top: String(top) + ea,
              left: String(left) + ea,
              width: String(grayWidth - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              background: "#f2f2f2",
              borderRadius: String(3) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }
            dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            dom.addEventListener("dragenter", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragover", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            dom.addEventListener("dragleave", function (e) {
              e.preventDefault();
              e.stopPropagation();
            }, false);
            h.appendChild(dom);

            height = 22;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(top + (grayHeight / 2) - (height / 2) - 4) + ea,
              left: String(left + (grayWidth / 2) - (width / 2) - 2) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            height = 14;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop[0];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              transition: "opacity 0.3s ease",
              top: String(top + grayHeight + 12) + ea,
              left: String(left + grayWidth - width) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.desktop = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(dom, this, i, true);
                }
              }
            });

            dom.addEventListener("drop", function (e) {
              e.preventDefault();
              e.stopPropagation();
              while (dom.firstChild) {
                dom.removeChild(dom.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.desktop.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.desktop.files = e.dataTransfer.files;
              const files = instance.fileBox.desktop.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(this, instance.fileBox.desktop, i, true);
                }
              }
            });

            return h;
          }
        },
      ],
      mobile: [
        //홍보 채널
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let svg_clone, svg_dom;
            let margin;
            let popupEvent;
            let line;
            let valueTong;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 11.5;
            left = 36;
            width = 38;

            margin = 10;
            height = 2.8;

            GeneralJs.stacks["specialDoms0_mobile"] = [];
            valueTong = new Array(buttons.length);
            for (let j = 0; j < buttons.length; j++) {
              GeneralJs.stacks["buttonPopup_inputs" + String(j)] = [];
              valueTong[j] = GeneralJs.nodes.input.cloneNode(true);
              valueTong[j].setAttribute("type", "text");
              style = {
                display: "none",
              };
              for (let i in style) {
                valueTong[j].style[i] = style[i];
              }
              h.appendChild(valueTong[j]);
            }

            instance.values.data.mobile.channel = { type: "array", input: valueTong };

            for (let j = 0; j < buttons.length; j++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.1;
              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(top + ((j < 3) ? 0 : 5.1)) + ea,
                left: String((j % 3 === 0) ? 26 : ((j % 3 === 1) ? 46.3 : 73)) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[j].src.mobile.on;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.style.opacity = String(0);
              svg_dom = SvgTong.parsing(svg_clone);
              h.appendChild(svg_dom);
              svg_dom.setAttribute("value", buttons[j].title);
              svg_dom.setAttribute("selected", "false");
              svg_dom.setAttribute("index", j);
              GeneralJs.stacks["specialDoms0_mobile"].push(svg_dom);
            }

            popupEvent = function (e) {
              const thisIndex = Number(this.getAttribute("index"));

              let cancel_back;
              let div_clone, svg_clone, svg_dom, div_clone2, input_clone;
              let input_box;
              let style;
              let ea = "vw";
              let height, width;
              let greenBoxWidth;
              let inputHeight;
              let marginLeft;
              let iconWidth;
              let tempArr;

              height = 10;
              marginLeft = 4.5;

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[thisIndex].popup.src.mobile;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

              greenBoxWidth = 87.9;
              inputHeight = 8;
              iconWidth = 4;

              //cancel_back
              cancel_back = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: String(99) + "vw",
                height: String(99) + "vh",
                background: "transparent",
                zIndex: String(1),
              };
              for (let i in style) {
                cancel_back.style[i] = style[i];
              }

              this.parentNode.insertBefore(cancel_back, this);

              //green box
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "absolute",
                top: String(top + 6) + ea,
                left: String(0) + ea,
                width: String(greenBoxWidth) + ea,
                background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
                zIndex: String(1),
                boxShadow: "0px 5px 16px -9px #606060",
                animation: "fadeup 0.3s ease forwards",
                borderRadius: String(3) + "px",
              };
              for (let i in style) {
                div_clone.style[i] = style[i];
              }

              input_box = GeneralJs.nodes.div.cloneNode(true);
              style = {
                position: "relative",
                marginTop: String(marginLeft - 4 + height + 7.5) + ea,
                marginBottom: String(marginLeft - 4 + height + 1.5) + ea,
                left: String(marginLeft) + ea,
                width: String(greenBoxWidth - (marginLeft * 2)) + ea,
              };
              for (let i in style) {
                input_box.style[i] = style[i];
              }

              div_clone.appendChild(input_box);

              style = {
                position: "absolute",
                transition: "opacity 0.3s ease",
                top: String(marginLeft) + ea,
                left: String(marginLeft) + ea,
                width: String(width) + ea,
                height: String(height) + ea,
                cursor: "pointer",
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_dom = SvgTong.parsing(svg_clone);
              div_clone.appendChild(svg_dom);

              tempArr = null;
              if (valueTong[thisIndex].value !== "") {
                tempArr = valueTong[thisIndex].value.split("__split__");
              }

              if (tempArr === null) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);

              } else if (Array.isArray(tempArr)) {

                for (let z = 0; z < tempArr.length; z++) {
                  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(inputHeight) + ea,
                    background: "white",
                    borderRadius: String(3) + "px",
                    opacity: String(0.9),
                    marginBottom: String(1.5) + ea,
                  }
                  for (let i in style) {
                    div_clone2.style[i] = style[i];
                  }
                  input_clone = GeneralJs.nodes.input.cloneNode(true);
                  input_clone.setAttribute("type", "text");
                  style = {
                    position: "relative",
                    width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                    height: String(7.2) + ea,
                    background: "transparent",
                    fontFamily: "'Noto Sans KR',sans-serif",
                    letterSpacing: String(-0.3) + "px",
                    wordSpacing: String(-0.5) + "px",
                    color: "#404040",
                    textAlign: "center",
                    overflow: "scroll",
                    fontSize: String(3.2) + ea,
                    outline: String(0),
                    border: String(0),
                    padding: String(0),
                  }
                  for (let i in style) {
                    input_clone.style[i] = style[i];
                  }
                  input_clone.value = tempArr[z];
                  GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                  div_clone2.appendChild(input_clone);
                  input_box.appendChild(div_clone2);
                }

              }

              if (tempArr === null && thisIndex === 1) {
                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", "https://www.instagram.com/homeliaison");
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);
                input_box.appendChild(div_clone2);
              }


              div_clone.appendChild(input_box);

              //plus
              svg_clone = SvgTong.stringParsing(instance.mother.returnPlus("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% - " + String(3 + (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let div_clone2;
                let input_clone;
                let style;
                let ea;

                ea = "vw";

                div_clone2 = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(inputHeight) + ea,
                  background: "white",
                  borderRadius: String(3) + "px",
                  opacity: String(0.9),
                  marginBottom: String(1.5) + ea,
                }
                for (let i in style) {
                  div_clone2.style[i] = style[i];
                }

                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.setAttribute("type", "text");
                style = {
                  position: "relative",
                  width: String(greenBoxWidth - (marginLeft * 2)) + ea,
                  height: String(7.2) + ea,
                  background: "transparent",
                  fontFamily: "'Noto Sans KR',sans-serif",
                  letterSpacing: String(-0.3) + "px",
                  wordSpacing: String(-0.5) + "px",
                  color: "#404040",
                  textAlign: "center",
                  overflow: "scroll",
                  fontSize: String(3.2) + ea,
                  outline: String(0),
                  border: String(0),
                  padding: String(0),
                }
                for (let i in style) {
                  input_clone.style[i] = style[i];
                }
                input_clone.setAttribute("placeholder", (thisIndex === 0 ? "https://home-liaison.com" : (thisIndex === 1 ? "https://blog.naver.com/homeliaison" : "https://drive.google.com/drive/folders/----")));
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)].push(input_clone);
                div_clone2.appendChild(input_clone);

                input_box.appendChild(div_clone2);
              });
              div_clone.appendChild(svg_clone);

              //ok
              svg_clone = SvgTong.stringParsing(instance.mother.returnOk("#ffffff"));
              style = {
                position: "absolute",
                bottom: String(marginLeft) + ea,
                left: "calc(50% + " + String(3 - (iconWidth / 2)) + ea + ")",
                width: String(iconWidth) + ea,
                height: String(iconWidth) + ea,
                opacity: String(0.9),
                cursor: "pointer",
              }
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              svg_clone.addEventListener("click", function (e) {
                let totalValue;
                let temp;

                totalValue = '';

                for (let i of GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)]) {
                  if (i.value !== "") {
                    if (!/^http/.test(i.value)) {
                      totalValue += "https://";
                    }
                    totalValue += i.value.replace(/=/g, encodeURIComponent('=')).replace(/&/g, encodeURIComponent('&'));
                    totalValue += "__split__";
                  }
                }

                if (totalValue !== '') {
                  totalValue = totalValue.slice(0, -9);
                }

                valueTong[thisIndex].value = totalValue;
                if (window.localStorage.getItem("mobile.channel") !== null) {
                  temp = JSON.parse(window.localStorage.getItem("mobile.channel"));
                  temp[thisIndex] = totalValue;
                  window.localStorage.setItem("mobile.channel", JSON.stringify(temp));
                }

                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                if (totalValue !== '') {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(1);
                } else {
                  GeneralJs.stacks["specialDoms0_mobile"][thisIndex].style.opacity = String(0);
                }

                div_clone.parentNode.removeChild(cancel_back);
                div_clone.parentNode.removeChild(div_clone);
              });
              div_clone.appendChild(svg_clone);

              this.parentNode.insertBefore(div_clone, this);

              cancel_back.addEventListener("click", function (e) {
                GeneralJs.stacks["buttonPopup_inputs" + String(thisIndex)] = [];
                this.parentNode.removeChild(div_clone);
                this.parentNode.removeChild(this);
              });

            }

            for (let j = 0; j < GeneralJs.stacks["specialDoms0_mobile"].length; j++) {
              GeneralJs.stacks["specialDoms0_mobile"][j].addEventListener("click", popupEvent);
            }

            return h;
          }
        },
        //포트폴리오
        {
          titleStyle: {
            top: 21.4,
            left: 0,
          },
          callback: function (needs) {
            const { notice } = needs;
            let h;
            let dom, input;
            let style, ea;
            let top, left;
            let width, height;
            let box;
            let grayWidth, grayHeight;
            let grayTop;
            let svg_clone, svg_dom;
            let line;
            let grayPadding;
            let file_input, attribute;
            let fileWordingSvg;

            h = document.createDocumentFragment();
            ea = "vw";
            top = 21.4 - 1.5;
            left = 36;
            grayWidth = 87;
            grayHeight = 20;
            grayTop = top + 8.7;
            grayPadding = 2.5;

            line = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderTop: "1px dashed #dddddd",
              width: String(87) + ea,
              left: String(0) + ea,
              top: String(grayTop + grayHeight + 14.18) + ea,
            };
            for (let i in style) {
              line.style[i] = style[i];
            }
            h.appendChild(line);

            box = GeneralJs.nodes.div.cloneNode(true);
            style = {
              position: "absolute",
              borderRadius: String(3) + "px",
              width: String(grayWidth - grayPadding) + ea,
              height: String(grayHeight - grayPadding) + ea,
              paddingTop: String(grayPadding) + ea,
              paddingLeft: String(grayPadding) + ea,
              left: String(0) + ea,
              top: String(grayTop) + ea,
              background: "#f2f2f2",
              cursor: "pointer",
              textAlign: "left",
            };
            for (let i in style) {
              box.style[i] = style[i];
            }
            h.appendChild(box);
            box.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            height = 5.3;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = instance.map.sub.etc.clickWording.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(grayTop + (grayHeight / 2) - (height / 2) - 0.2) + ea,
              left: String((grayWidth / 2) - (width / 2)) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
              cursor: "pointer",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);
            svg_dom.addEventListener("click", function (e) {
              while (box.firstChild) {
                box.removeChild(box.lastChild);
              }
              for (let j = 0; j < 20; j++) {
                instance.fileBox.mobile.setAttribute("cus_close" + String(j), "false");
              }
              instance.fileBox.mobile.click();
            });
            fileWordingSvg = svg_dom;
            h.appendChild(svg_dom);

            height = 2.8;

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.mobile[0];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(grayTop + grayHeight + 2) + ea,
              left: String(0 + grayWidth - width) + ea,
              width: String(width) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }

            svg_dom = SvgTong.parsing(svg_clone);

            h.appendChild(svg_dom);

            file_input = GeneralJs.nodes.input.cloneNode(true);
            file_input.classList.add("targetInputs");
            attribute = {
              type: "file",
              name: "upload",
              accept: "image/*,.pdf,.ai,.zip,.psd",
              cus_name: "fileInput"
            };
            style = {
              display: "none",
            };
            for (let j in attribute) {
              file_input.setAttribute(j, attribute[j]);
            }
            for (let j in style) {
              file_input.style[j] = style[j];
            }
            for (let j = 0; j < 20; j++) {
              file_input.setAttribute("cus_close" + String(j), "false");
            }
            file_input.multiple = true;
            h.appendChild(file_input);
            instance.fileBox.mobile = file_input;

            file_input.addEventListener("change", function (e) {
              const files = this.files;
              if (files.length === 0) {
                fileWordingSvg.style.opacity = String(1);
              } else {
                fileWordingSvg.style.opacity = String(0);
                for (let i = 0; i < files.length; i++) {
                  instance.imageBoxMaker(box, this, i, false);
                }
              }
            });

            return h;
          }
        },
      ],
    },
  ];

  if (pageBoo === "partnership") {
    targetBlocks.splice(3, 1);
    targetBlocks.splice(1, 1);
  } else if (pageBoo === "presentation") {
    targetBlocks.splice(3, 1);
    targetBlocks.splice(2, 1);
  } else {
    targetBlocks.splice(1, 2);
  }

  return targetBlocks;
}

DeseventJs.prototype.belowSubmit = function (pageBoo) {
  const instance = this;
  const { sub: { terms, submit } } = this.map;
  let div_clone, temp, dom, mo;
  let style, ea;
  let list = {
    desktop: [
      {
        name: "description",
        style: "height:122px;padding-top:16px;background:#f2f2f2;border-radius:3px;",
        callback: function () {
          let div_clone, style, ea;

          ea = "px";

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "relative",
            textAlign: "left",
            overflow: "scroll",
            height: String(105) + ea,
            width: String(95) + '%',
            paddingLeft: String(2.5) + '%',
            color: "#404040",
            lineHeight: String(165) + '%',
            letterSpacing: String(-0.3) + ea,
            wordSpacing: String(-0.5) + ea,
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: String(11) + ea,
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          div_clone.insertAdjacentHTML("beforeend", DeseventJs.policy());
          return div_clone;
        }
      },
      {
        name: "check",
        style: "position:relative;height:72px;",
        callback: function () {
          let h, div_clone, img_clone;
          let svg_clone, height, width, ea = "px", style = {};
          let svg_dom;
          let list = [ "off", "on", ];

          h = document.createDocumentFragment();
          height = 15;

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            top: String(20) + ea,
            height: String(height) + ea,
            right: String(0),
            cursor: "pointer",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          for (let i = 0; i < list.length; i++) {
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = terms.src.desktop[list[i]];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              top: String(0) + ea,
              right: String(0) + ea,
              height: String(height) + ea,
              width: String(width) + ea,
              opacity: "opacity 0.4s ease",
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            div_clone.appendChild(svg_dom);
          }

          svg_dom.setAttribute("value", "true");

          div_clone.style.width = String(width) + ea;
          div_clone.addEventListener("click", function (e) {
            if (svg_dom.getAttribute("value") === "true") {
              svg_dom.style.opacity = String(0);
              svg_dom.setAttribute("value", "false");
            } else {
              svg_dom.style.opacity = String(1);
              svg_dom.setAttribute("value", "true");
            }
          });

          h.appendChild(div_clone);

          return h;
        }
      },
      {
        name: "submit",
        style: "position:relative;height:54px;",
        callback: function () {
          let div_clone, svg_clone;
          let height, width, ea = "px", style = {};
          let margin;

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            top: String(0),
            left: String(50) + '%',
            width: String(136) + ea,
            height: String(100) + '%',
            marginLeft: String(-68) + ea,
            borderRadius: String(3) + ea,
            background: "#2fa678",
            cursor: "pointer",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          height = 20;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = submit[(pageBoo === "partnership" ? 1 : (pageBoo === "presentation" ? 0 : 2))].src.desktop;
          svg_clone.classList.add("hoverdefault");
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(22) + ea,
            left: String(50) + '%',
            marginLeft: String(-40.5) + ea,
            top: String(15) + ea,
            transition: "opacity 0.5s ease",
            height: String(height) + ea,
            width: String(width) + ea,
            left: "50%",
            marginLeft: String((-1 * (width / 2)) - 1.5) + ea,
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          margin = 22;

          div_clone.style.width = String(width + (margin * 2)) + ea;
          div_clone.style.marginLeft = String(-1 * ((width + (margin * 2)) / 2)) + ea;
          div_clone.addEventListener("click", instance.submitEvent("desktop"));

          return div_clone;
        }
      },
    ],
    mobile: [
      {
        name: "description",
        style: "height:30.9vw;padding-top:3.8vw;background:#f2f2f2;",
        callback: function () {
          let div_clone, style, ea;

          ea = "vw";

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            textAlign: "left",
            position: "relative",
            overflow: "scroll",
            height: String(27) + ea,
            width: String(90) + '%',
            paddingLeft: String(5) + '%',
            color: "#404040",
            lineHeight: String(165) + '%',
            letterSpacing: String(-0.3) + "px",
            wordSpacing: String(-0.5) + "px",
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: String(3) + ea,
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          div_clone.insertAdjacentHTML("beforeend", DeseventJs.policy());
          return div_clone;
        }
      },
      {
        name: "check",
        style: "position:relative;height:32px;",
        callback: function () {
          let h, div_clone, img_clone;
          let svg_clone, height, width, ea = "vw", style = {};
          let list = [ "off", "on", ];
          let svg_dom;

          h = document.createDocumentFragment();

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            right: String(0) + ea,
            top: String(3) + ea,
            cursor: "pointer",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          height = 3.2;
          for (let i = 0; i < list.length; i++) {
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = terms.src.mobile[list[i]];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 0.1;
            style = {
              position: "absolute",
              right: String(0) + ea,
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_dom = SvgTong.parsing(svg_clone);
            div_clone.appendChild(svg_dom);
          }

          svg_dom.setAttribute("value", "true");

          div_clone.style.width = String(width) + ea;
          div_clone.style.height = String(height) + ea;
          div_clone.addEventListener("click", function (e) {
            if (svg_dom.getAttribute("value") === "true") {
              svg_dom.style.opacity = String(0);
              svg_dom.setAttribute("value", "false");
            } else {
              svg_dom.style.opacity = String(1);
              svg_dom.setAttribute("value", "true");
            }
          });

          h.appendChild(div_clone);
          return h;
        }
      },
      {
        name: "submit",
        style: "position:relative;height:12vw;margin-top:6vw",
        callback: function () {
          let div_clone, svg_clone;
          let height, width, ea = "vw", style = {};

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            top: String(0),
            left: String(50) + '%',
            width: String(26) + ea,
            height: String(100) + '%',
            marginLeft: String(-13) + '%',
            borderRadius: String(3) + "px",
            background: "#2fa678",
            cursor: "pointer",
            marginTop: String(2) + ea,
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          height = 4.3;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = submit[(pageBoo === "partnership" ? 1 : (pageBoo === "presentation" ? 0 : 2))].src.desktop;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(4.3) + ea,
            top: String(3.5) + ea,
            transition: "opacity 0s ease",
            height: String(height) + ea,
            width: String(width) + ea,
            left: "50%",
            marginLeft: String((-1 * (width / 2)) - 0.4) + ea,
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }

          div_clone.style.width = String(width + (5 * 2)) + ea;
          div_clone.style.marginLeft = String(-1 * ((width / 2) + 5)) + ea;

          div_clone.appendChild(SvgTong.parsing(svg_clone));

          div_clone.addEventListener("click", instance.submitEvent("mobile"));

          return div_clone;
        }
      },
    ],
  }
  let boo = Object.keys(list);
  let styles = {
    desktop: { height: "280px" },
    mobile: { height: "66vw" },
  }

  for (let i = 0; i < boo.length; i++) {
    mo = (boo[i] === "desktop") ? "" : "mo";
    ea = (boo[i] === "desktop") ? "px" : "vw";
    dom = GeneralJs.nodes.div.cloneNode(true);
    if (boo[i] === "desktop") {
      style = {
        display: "block",
        position: "relative",
        background: "white",
        marginBottom: String(86) + ea,
        width: String(83.8) + '%',
        marginLeft: String(8.1) + '%',
      };
    } else {
      style = {
        display: "block",
        position: "relative",
        background: "white",
        marginBottom: String(13.6) + ea,
        width: String(87.8) + '%',
        marginLeft: "auto",
        marginRight: "auto",
      };
    }
    for (let j in style) {
      dom.style[j] = style[j];
    }
    dom.style.height = styles[boo[i]].height;

    for (let j = 0; j < list[boo[i]].length; j++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      if (boo[i] === "desktop") {
        style = {
          position: "relative",
          display: "block",
          borderRadius: String(3) + ea,
          marginBottom: String(20) + ea,
          background: "white",
        };
      } else {
        style = {
          position: "relative",
          display: "block",
          borderRadius: String(3) + "px",
          marginottom: String(3.2) + ea,
          background: "white",
        };
      }
      for (let k in style) {
        div_clone.style[k] = style[k];
      }
      div_clone.style.cssText = list[boo[i]][j].style;
      temp = list[boo[i]][j].callback();
      if (j === list[boo[i]].length - 1) {
      }
      div_clone.appendChild(temp);
      dom.appendChild(div_clone);
    }
    this.box[boo[i]][1].appendChild(dom);
  }
}

DeseventJs.prototype.baseMaker = function (pageBoo) {
  let div_clone, div_clone2, div_clone4, img_clone, svg_clone;
  let temp;
  let positions = [ "left", "right" ];
  let flatform = [ "desktop", "mobile" ];
  let style = {};
  let blockStyle, grayStyle;
  let options = {};
  let height, width, ea;
  let mobileBoo;

  blockStyle = {
    desktop: {
      display: "block",
      position: "relative",
      background: "white",
      marginBottom: String(82) + "px",
      width: String(83.8) + '%',
      marginLeft: String(8.1) + '%',
    },
    mobile: {
      display: "block",
      position: "relative",
      background: "white",
      marginBottom: String(7.6) + "vw",
      width: String(87.8) + '%',
      marginLeft: "auto",
      marginRight: "auto",
    }
  };

  grayStyle = {
    desktop: {
      position: "absolute",
      borderBottom: "1px solid #dddddd",
      width: String(100) + '%',
      top: String(6) + "px",
      left: String(0) + "px",
    },
    mobile: {
      position: "absolute",
      borderBottom: "1px solid #dddddd",
      width: String(100) + '%',
      top: String(1.4) + "vw",
      left: String(0) + "vw",
    }
  };

  const blocks = this.returnBlocks(pageBoo);

  for (let z = 0; z < flatform.length; z++) {

    ea = (flatform[z] === "desktop") ? "px" : "vw";

    for (let i = 0; i < blocks.length; i++) {

      //total box
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      for (let s in blockStyle[flatform[z]]) {
        div_clone.style[s] = blockStyle[flatform[z]][s];
      }
      div_clone.style.height = String(blocks[i].height[flatform[z]]) + ea;

      //title
      svg_clone = SvgTong.tongMaker();
      svg_clone.src = this.map.main[i].src.desktop;
      svg_clone.classList.add("absolutedefault");
      height = (flatform[z] === "desktop") ? 18 : 4.1;
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + ((flatform[z] === "desktop") ? 1 : -0.5);
      svg_clone.style.height = String(height) + ea;
      svg_clone.style.width = String(width) + ea;

      //gray bar
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      for (let s in grayStyle[flatform[z]]) {
        div_clone2.style[s] = grayStyle[flatform[z]][s];
      }
      div_clone2.style.left = String(width + (flatform[z] === "desktop" ? 12 : 3)) + ea;
      div_clone2.style.width = "calc(100% - " + String(width + (flatform[z] === "desktop" ? 12 : 3)) + ea + ")";

      div_clone.appendChild(div_clone2);
      div_clone.appendChild(SvgTong.parsing(svg_clone));

      //desktop
      if (flatform[z] === "desktop") {

        temp = document.createDocumentFragment();
        for (let j = 0; j < blocks[i].desktop.length; j++) {
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = this.map.main[i].children[j].src.desktop;

          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          svg_clone.style.position = "absolute";
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          for (let k in blocks[i].desktop[j].titleStyle) {
            svg_clone.style[k] = String(blocks[i].desktop[j].titleStyle[k]) + ((k !== "display") ? ea : '');
          }
          temp.appendChild(SvgTong.parsing(svg_clone));

          options = {};
          if (this.map.main[i].children[j].buttons !== undefined) {
            options.buttons = this.map.main[i].children[j].buttons;
          }
          if (this.map.main[i].children[j].notice !== undefined) {
            options.notice = this.map.main[i].children[j].notice;
          }
          if (this.map.main[i].children[j].popup !== undefined) {
            options.popup = this.map.main[i].children[j].popup;
          }
          if (this.map.main[i].children[j].radio !== undefined) {
            options.radio = this.map.main[i].children[j].radio;
          }
          temp.appendChild(blocks[i].desktop[j].callback(options));
        }
        div_clone.appendChild(temp);

        this.box.desktop[i].appendChild(div_clone);

      //mobile
      } else {

        temp = document.createDocumentFragment();
        for (let j = 0; j < blocks[i].mobile.length; j++) {
          mobileBoo = false;

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = this.map.main[i].children[j].src.mobile;

          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 0.5;
          svg_clone.style.position = "absolute";
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          for (let k in blocks[i].mobile[j].titleStyle) {
            svg_clone.style[k] = String(blocks[i].mobile[j].titleStyle[k]) + ((k !== "display") ? ea : '');
          }
          temp.appendChild(SvgTong.parsing(svg_clone));

          options = {};
          if (this.map.main[i].children[j].buttons !== undefined) {
            options.buttons = this.map.main[i].children[j].buttons;
          }
          if (this.map.main[i].children[j].notice !== undefined) {
            options.notice = this.map.main[i].children[j].notice;
          }
          if (this.map.main[i].children[j].popup !== undefined) {
            options.popup = this.map.main[i].children[j].popup;
          }
          if (this.map.main[i].children[j].radio !== undefined) {
            options.radio = this.map.main[i].children[j].radio;
          }

          temp.appendChild(blocks[i].mobile[j].callback(options));

        }
        div_clone.appendChild(temp);

        this.box.mobile[i].appendChild(div_clone);

      }
    }
  }
}

DeseventJs.prototype.initialDom = function (pageBoo) {
  const instance = this;
  const { main, sub } = this.map;
  let div_clone, div_clone2;
  let grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  }
  let list = {
    desktop: [
      {
        id: "back",
        source: [ sub.title.desktop.back.src ],
        callback: function (id, source) {
          let div_clone, style, ea;
          ea = "px";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "absolute",
            top: String(72) + ea,
            width: String(100) + "%",
            height: String(560) + ea,
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
            transition: "all 1.2s ease",
            backgroundImage: "url('" + DeseventJs.sourceLink + source[0] +  "')",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          return div_clone;
        },
      },
      {
        id: "grayback",
        source: [],
        callback: function (id, source) {
          let div_clone, style, ea;
          ea = "px";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "absolute",
            top: String(632) + ea,
            width: String(100) + '%',
            height: String(pageBoo === "partnership" ? 1800 : 1200) + ea,
            backgroundColor: "#f7f7f7",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          return div_clone;
        },
      },
      {
        id: "title",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 92;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = sub.title.desktop.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(170) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%",
            transition: "all 0.5s ease",
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));
          return h;
        },
      },
      {
        id: "base1",
        source: [],
        callback: function (id, source) {
          let div_clone, div_clone2, style, ea;
          ea = "px";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            paddingBottom: String(10) + ea,
            marginBottom: String(20) + ea,
            left: String(50) + '%',
            width: String(1050) + ea,
            marginLeft: String(-526) + ea,
            borderRadius: String(7) + ea,
            background: "white",
            boxShadow: "0px 4px 16px -14px #808080",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "relative",
            width: String(100) + '%',
            paddingTop: String(80) + ea,
            transition: "all 0.5s ease",
          };
          for (let i in style) {
            div_clone2.style[i] = style[i];
          }
          div_clone.appendChild(div_clone2);
          instance.box.desktop[0] = div_clone;
          return div_clone;
        },
      },
      {
        id: "base2",
        source: [],
        callback: function (id, source) {
          let div_clone, div_clone2, style, ea;
          ea = "px";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            paddingBottom: String(10) + ea,
            marginBottom: String(120) + ea,
            left: String(50) + '%',
            width: String(1050) + ea,
            marginLeft: String(-526) + ea,
            borderRadius: String(7) + ea,
            background: "white",
            boxShadow: "0px 4px 16px -14px #808080",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "relative",
            width: String(100) + '%',
            paddingTop: String(80) + ea,
            transition: "all 0.5s ease",
          };
          for (let i in style) {
            div_clone2.style[i] = style[i];
          }
          div_clone.appendChild(div_clone2);
          instance.box.desktop[1] = div_clone;
          return div_clone;
        },
      },
    ],
    mobile: [
      {
        id: "moback",
        source: [ sub.title.mobile.back.src ],
        callback: function (id, source) {
          let div_clone, style, ea;
          ea = "vw";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: String(100) + "%",
            height: String(255) + "px",
            backgroundSize: "auto 100%",
            backgroundPosition: "44% 65%",
            transition: "all 1.2s ease",
            backgroundImage: "url('" + DeseventJs.sourceLink + source[0] +  "')",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          return div_clone;
        },
      },
      {
        id: "motitle",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 76;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = sub.title.mobile.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(78) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%",
            transition: "all 0s ease",
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));
          return h;
        },
      },
      {
        id: "mobox0",
        source: [],
        callback: function (id, source) {
          let div_clone, style, ea;
          ea = "vw";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            marginTop: String(2.5) + ea,
            marginBottom: String(6) + ea,
            left: String(0),
            width: String(100) + '%',
            background: "white",
            paddingBottom: String(0.1) + ea,
            opacity: String(1),
            paddingTop: String(9.6) + ea,
            textAlign: "center",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          instance.box.mobile[0] = div_clone;
          return div_clone;
        },
      },
      {
        id: "mobox1",
        source: [],
        callback: function (id, source) {
          let div_clone, style, ea;
          ea = "vw";
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            marginTop: String(2.5) + ea,
            marginBottom: String(6) + ea,
            left: String(0),
            width: String(100) + '%',
            background: "white",
            paddingBottom: String(0.1) + ea,
            opacity: String(1),
            textAlign: "center",
          };
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          instance.box.mobile[1] = div_clone;
          return div_clone;
        },
      },
    ],
  }
  let boo = Object.keys(list);
  let temp;
  for (let i = 0; i < boo.length; i++) {
    for (let j = 0; j < list[boo[i]].length; j++) {
      temp = (list[boo[i]][j]["callback"])(list[boo[i]][j]["id"], list[boo[i]][j]["source"]);
      grand[boo[i]].appendChild(temp);
    }
  }
}

DeseventJs.prototype.launching = async function () {
  const instance = this;
  try {

    //parsing get
    const getObj = GeneralJs.returnGet();
    const flatform = [ "desktop", "mobile" ];
    let pageBoo;
    let temp, tempFlatform, tempKey, tempArr, tempValue;

    if (getObj.mode === undefined) {
      pageBoo = "partnership";
    } else {
      if (getObj.mode === "presentation" || getObj.mode === "partnership") {
        if (getObj.mode === "presentation") {
          window.location.href = window.location.protocol + "//" + window.location.host + "/desevent.php?mode=partnership";
        }
        pageBoo = "partnership";
      } else {
        pageBoo = "portfolio";
      }
    }

    if (pageBoo === "partnership") {
      this.map.main.splice(3, 1);
      this.map.main.splice(1, 1);
      this.map.sub.title = this.map.sub.titleSecond;
    } else if (pageBoo === "presentation") {
      this.map.main.splice(3, 1);
      this.map.main.splice(2, 1);
      this.map.sub.title = this.map.sub.titleFirst;
    } else {
      this.map.main.splice(1, 2);
      this.map.sub.title = this.map.sub.titleThird;
    }

    this.values.mode = pageBoo;
    this.values.data = {};
    this.values.data.desktop = {};
    this.values.data.mobile = {};
    this.box.desktop = new Array(this.map.main.length);
    this.box.mobile = new Array(this.map.main.length);

    this.initialDom(pageBoo);
    this.baseMaker(pageBoo);
    this.belowSubmit(pageBoo);

    for (let f = 0; f < flatform.length; f++) {
      for (let i in this.values.data[flatform[f]]) {
        DeseventJs.setLocalInfo(this.values.data[flatform[f]][i].input, flatform[f] + "." + i);
      }
    }

    for (let i = 0; i < window.localStorage.length; i++){
      tempArr = window.localStorage.key(i).split(".");
      tempFlatform = tempArr[0];
      tempKey = tempArr[1];
      tempValue = window.localStorage.getItem(window.localStorage.key(i));
      if (this.values.data[tempFlatform][tempKey] !== undefined) {
        if (this.values.data[tempFlatform][tempKey].type === "text") {
          this.values.data[tempFlatform][tempKey].input.value = tempValue;
        } else if (this.values.data[tempFlatform][tempKey].type === "radio") {
          for (let svg of this.values.data[tempFlatform][tempKey].input) {
            if (svg.getAttribute("value") === tempValue) {
              svg.style.opacity = String(1);
              svg.setAttribute("selected", "true");
            } else {
              svg.style.opacity = String(0);
              svg.setAttribute("selected", "false");
            }
          }
        } else if (this.values.data[tempFlatform][tempKey].type === "array") {
          temp = JSON.parse(tempValue);
          for (let z = 0; z < this.values.data[tempFlatform][tempKey].input.length; z++) {
            if (temp[z] !== undefined && temp[z] !== null && temp[z] !== "") {
              this.values.data[tempFlatform][tempKey].input[z].value = temp[z];
              GeneralJs.stacks["specialDoms0_" + tempFlatform][z].style.opacity = String(1);
            } else {
              this.values.data[tempFlatform][tempKey].input[z].value = "";
              GeneralJs.stacks["specialDoms0_" + tempFlatform][z].style.opacity = String(0);
            }
          }
        }
      }
    }

  } catch (e) {
    window.localStorage.clear();
    window.location.href = "https://home-liaison.com";
  }
}

DeseventJs.policy = function () {
  let text = '';
  text += "<b>개인정보 처리 방침</b><br><br><b>제1조 총칙</b><br><br>① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, ";
  text += "주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>";
  text += "② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>③ 홈리에종은 ‘정보통신망 ";
  text += "이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.";
  text += "<br>⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br><br><b>제2조 개인정보의 수집항목 및 목적</b><br><br>";
  text += "① 모든 회원은 홈리에종이 제공하는 다양한 서비스를 이용할 수 있습니다. 홈리에종이 처리하고 있는 개인정보는 다음의 수집/이용 목적 이외의 용도로는 활용되지 않으며, 수집/이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.";
  text += "<br>② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>③ 홈리에종은 다음과 같이 회원의 ";
  text += "개인정보를 수집합니다.<br>④ 회원 가입시, 문의사항 작성시 : User name, E-mail, 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)";
  text += "<br>⑤ 구매자 결제진행시 : 전화번호, 주소, 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌 번호 등";
  text += "디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>⑧ 개인정보의 이용목적<br>⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 ";
  text += "회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 ";
  text += "이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>⑪ 신규 서비스 개발 및 마케팅 광고에의 활용 : 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 ";
  text += "특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 ";
  text += "구축 등<br><br><b>제3조 개인정보 제3자 제공</b><br><br>① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>② 홈리에종은 개인정보를  ‘개인정보 수집항목 ";
  text += "및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 ";
  text += "받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 ";
  text += "개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.";
  text += "<br>⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br><b>제4조 개인정보 처리위탁</b><br><br>① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 ";
  text += "처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>③ 개인정보 처리위탁을 하는 업무의 내용";
  text += "<br>④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>⑥ E-mail 및 문자 발송 : mailchimp, 알리고(서비스 운영관련 알림 및 정보 제공)<br>⑦ ";
  text += "배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br><br><b>제5조 개인정보의 보유 및 이용기간</b><br><br>① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 ";
  text += "개인정보를 파기합니다.<br>② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>③ ";
  text += "홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 ";
  text += "사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 ";
  text += "및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>⑧ 소비자의 ";
  text += "불만 또는 분쟁처리에 관한 기록 : 3년<br>⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>⑫ 개인정보 ";
  text += "파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br><br><b>제6조 개인정보의 수집 및 이용을 ";
  text += "거부할 권리</b><br><br>개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br><br><b>제7조 링크 사이트에 대한 책임</b><br><br>홈리에종은 ";
  text += "회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 \“개인정보처리방침\”이 적용되지 않습니다.<br><br><b>제8조 회원 및 법정대리인의 권리</b><br><br>① 회원 및 법정 대리인은 ";
  text += "언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 ";
  text += "이에 대해 지체없이 조치하겠습니다.<br>③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 ";
  text += "통지하여 정정이 이루어지도록 하겠습니다.<br>④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 ";
  text += "개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 \“개인정보의 보유 ";
  text += "및 이용기간\”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br><b>제9조 개인정보의 기술적, 관리적 보호대책</b><br><br>① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 ";
  text += "등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.";
  text += "<br>③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>⑤ ";
  text += "민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 ";
  text += "내부방침 등의 준수를 강조하고 있습니다.<br>⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 ";
  text += "최선을 다하고 있습니다.<br><br><b>제10조 개인정보보호 책임자</b><br><br>① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 ";
  text += "지정하고 있습니다.<br>② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다.";
  text += "홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br><br><b>제11조 기타 개인정보침해에 대한 신고 및 상담</b><br><br>① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관";
  text += "소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>";
  text += "③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do ";
  text += "(국번없이) 182<br><br><b>제12조 고지의 의무</b><br><br>현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 ";
  text += "내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.";
  return text;
}
