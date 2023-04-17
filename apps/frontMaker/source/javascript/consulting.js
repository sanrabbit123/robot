const ConsultingJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
  this.below = {};
}

ConsultingJs.sourceLink = "/list_image/consulting";

ConsultingJs.inputMaker = function (boo, id) {
  let temp_string, dom, input_clone;
  temp_string = '';
  dom = GeneralJs.nodes.div.cloneNode(true);
  dom.id = id;
  temp_string = (boo ? "" : "mo") + "consulting_inputblock";
  dom.classList.add(temp_string);
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  temp_string = (boo ? "" : "mo") + "consulting_input";
  input_clone.classList.add(temp_string);
  dom.appendChild(input_clone);
  return dom;
}

ConsultingJs.postEvent = function (boo) {
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

ConsultingJs.prototype.pendingBox = function (mother, boo, clear = false, partial = false) {
  const instance = this;
  const { sub: { etc: { pending } } } = this.map;
  const { sub: { loader } } = this.mother.map;

  let div_back, div_clone, div_clone2, svg_clone;
  let height, width, ea = (boo === "desktop") ? "px" : "vw";
  let style = {};

  //make pending box
  if (!clear) {
    div_back = GeneralJs.nodes.div.cloneNode(true);
    div_back.id = ((boo === "desktop") ? "" : "mo") + "submit_pendingbox_back";
    mother.appendChild(div_back);

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = ((boo === "desktop") ? "" : "mo") + "submit_pendingbox";
    height = (boo === "desktop") ? 20 : 5;

    svg_clone = SvgTong.tongMaker();
    svg_clone.src = pending.src;
    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + ((boo === "desktop") ? 0 : -1);
    style = {
      position: "absolute",
      top: String((boo === "desktop") ? 29 : 7.8) + ea,
      left: "calc(50% - " + String(width / 2) + ea + ")",
      width: String(width) + ea,
      height: String(height) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    div_clone2 = SvgTong.parsing(svg_clone);
    div_clone.appendChild(div_clone2);

    height = (boo === "desktop") ? 38 : 10;
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = loader;
    svg_clone.classList.add("loading");
    svg_clone.classList.add("loaderc");

    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
    style = {
      top: String((boo === "desktop") ? 62 : 16) + ea,
      left: "50%",
      marginLeft: '-' + String(width / 2) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    div_clone.appendChild(SvgTong.parsing(svg_clone));
    mother.appendChild(div_clone);

  //clear pending box
  } else {

    if (document.getElementById(((boo === "desktop") ? "" : "mo") + "submit_pendingbox_back") !== null) {
      if (!partial) {
        mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "submit_pendingbox_back"));
      }
      mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "submit_pendingbox"));
    }

  }
}

ConsultingJs.prototype.certificationBox = function (name, phone, mother, boo, callback) {
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
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        div_clone.style.width = String(whiteWidth) + ea;
        div_clone.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";
        div_clone.style.height = String(whiteHeight) + ea;

        callback();

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

ConsultingJs.prototype.completeBox = function (mother, boo) {
  const instance = this;
  const { sub: { thankyou: { sub: { etc: { complete } } } } } = this.map;

  let div_clone, div_clone2, svg_clone;
  let height, width, ea = (boo === "desktop") ? "px" : "vw";
  let style = {};

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = ((boo === "desktop") ? "" : "mo") + "submit_pendingbox";
  width = (boo === "desktop") ? 300 : 52;
  height = (boo === "desktop") ? 84 : 28.8;
  style = {
    left: "calc(50% - " + String(width / 2) + ea + ")",
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  height = (boo === "desktop") ? 20 : 11.5;
  svg_clone = SvgTongAsync.tongMaker();
  svg_clone.src = complete.src[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    position: "absolute",
    top: String((boo === "desktop") ? 29 : 7.8) + ea,
    left: "calc(50% - " + String(width / 2) + ea + ")",
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone2 = SvgTongAsync.parsing(svg_clone);
  div_clone.appendChild(div_clone2);

  mother.appendChild(div_clone);
}

ConsultingJs.prototype.submitEvent = function (boo) {
  const instance = this;
  let flatform = boo === "desktop" ? "consultingbox" : "moconsultingbox";
  let queryId = boo === "desktop" ? "#" : "#mo";
  let queryClass = boo === "desktop" ? "." : ".mo";
  const yearFilter = function (str) {
    if (typeof str !== "string") {
      str = String(str);
    }
    const today = new Date();
    let finalWord;
    if (str.trim().length !== 4) {
      if (str.trim().length === 2) {
        finalWord = String(today.getFullYear()).slice(0, 2) + str.trim();
      } else {
        finalWord = String(today.getFullYear());
      }
    } else {
      finalWord = str.trim();
    }
    return finalWord;
  }
  const filter = function (str) {
    let newStr;
    if (str === '') {
      str = "1";
    }
    if (/^0/.test(str)) {
      str = str.replace(/^0/, '');
    }
    if (Number(str.replace(/[^0-9]/g, '')) < 10) {
      newStr = '0' + str.replace(/[^0-9]/g, '');
    } else {
      newStr = str.replace(/[^0-9]/g, '');
    }
    return newStr;
  }
  const mother = document.getElementById(flatform);

  return function (e) {
    let ajaxList = [ "pretext", "cellphone", "dwelling", "folk", "email", "money", "area", "movingdate", "myhomeboo", "spotspec", "description", "wayto" ];
    let ajaxdata = '';
    let submitNamePhone = [];
    let obj = {};
    for (let i = 0; i < ajaxList.length; i++) {
      obj[ajaxList[i]] = '';
    }

    obj.pretext = GeneralJs.escapeString(mother.querySelector(queryId + "blocks_name > input").value, { hangul: true, noSpace: true });
    obj.cellphone = GeneralJs.escapeString(mother.querySelector(queryId + "blocks_phone > input").value, { isPhone: true });
    obj.dwelling = mother.querySelector(queryId + "blocks_address0 > input").value + ' ' + mother.querySelector(queryId + "blocks_address1 > input").value;
    obj.folk = mother.querySelector(queryId + "blocks_family > input").value;
    obj.email = mother.querySelector(queryId + "blocks_email > input").value;

    let budgets = mother.querySelectorAll(queryClass + "blocks_budgetbox_money_input");
    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].checked) { obj.money = budgets[i].value; }
    }
    obj.area = mother.querySelector(queryId + "blocks_pyeong > input").value;

    if (mother.querySelector(queryClass + "blocks_date_resident_checkbox").checked) {
      obj.movingdate = "거주중";
    } else {
      obj.movingdate = yearFilter(mother.querySelector(queryId + "blocks_date_year > input").value) + '-' + filter(mother.querySelector(queryId + "blocks_date_month > input").value) + '-' + filter(mother.querySelector(queryId + "blocks_date_day > input").value);
    }
    if (mother.querySelector(queryClass + "blocks_date_contract_radio").checked) {
      obj.myhomeboo = "자가";
    } else {
      obj.myhomeboo = "전월세";
    }

    let rooms = mother.querySelectorAll(queryClass + "blocks_space_rooms_input");
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].checked) { obj.room = rooms[i].value; }
    }
    let bathes = mother.querySelectorAll(queryClass + "blocks_space_bathes_input");
    for (let i = 0; i < bathes.length; i++) {
      if (bathes[i].checked) { obj.bath = bathes[i].value; }
    }
    let balconies = mother.querySelectorAll(queryClass + "blocks_space_baconies_input");
    for (let i = 0; i < balconies.length; i++) {
      if (balconies[i].checked) { obj.balcony = balconies[i].value; }
    }
    obj.spotspec = obj.room + " / " + obj.bath + " / " + obj.balcony;

    obj.description = mother.querySelector(queryClass + "blocks_etc > textarea").value;

    let surveies = mother.querySelectorAll(queryClass + "below_servey_detail_input");
    for (let i = 0; i < surveies.length; i++) {
      if (surveies[i].checked) { obj.wayto = surveies[i].value; }
    }

    //submit
    if (obj.pretext === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_name > input"), "성함을 입력해주세요!");
    } else if (/[a-zA-Z]/g.test(obj.pretext)) {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_name > input"), "한글로 성함을 입력해주세요!");
    } else if (obj.cellphone === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_phone > input"), "연락처를 남겨주세요!");
    } else if (mother.querySelector(queryId + "blocks_address0 > input").value === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_address0 > input"), "주소를 입력해주세요!");
    } else if (mother.querySelector(queryId + "blocks_address1 > input").value === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_address1 > input"), "상세 주소 입력해주세요!");
    } else if (obj.folk === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_family > input"), "가족 구성원을 알려주세요!");
    } else if (obj.area === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_pyeong > input"), "평수를 알려주세요!");
    } else if (obj.email === '') {
      GeneralJs.inputBackward(mother.querySelector(queryId + "blocks_email > input"), "이메일 주소를 입력해주세요!");
    } else {

      //make ajax data
      if (!mother.querySelector(queryClass + "below_box_checkbox_input").checked) {
        alert("이용 약관에 동의하여 주세요!");
        return;
      }
      ajaxdata = '';
      submitNamePhone = new Array(2);
      for (let i = 0; i < ajaxList.length; i++) {

        ajaxdata += '&';

        if (ajaxList[i] === "pretext") {
          submitNamePhone[0] = GeneralJs.escapeString(obj[ajaxList[i]], { hangul: true, noSpace: true });
          ajaxdata += ajaxList[i] + '=' + submitNamePhone[0];
        } else if (ajaxList[i] === "cellphone") {
          submitNamePhone[1] = GeneralJs.escapeString(obj[ajaxList[i]], { isPhone: true });
          ajaxdata += ajaxList[i] + '=' + submitNamePhone[1];
        } else {
          ajaxdata += ajaxList[i] + '=' + obj[ajaxList[i]].replace(/\&/g, '').replace(/\=/g, '').replace(/[\*\^\:\&\<\>\;\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
        }

      }
      ajaxdata = ajaxdata.slice(1);

      let icon;
      if (document.getElementById("talkIcon") !== null) {
        icon = document.getElementById("talkIcon");
        icon.removeEventListener("click", GeneralJs.events["iconClickEvent"][0]);
        GeneralJs.addHrefEvent(icon, "http://pf.kakao.com/_vxixkjxl/chat");
        icon.parentNode.lastChild.style.display = "none";
      }
      if (document.getElementById("motalkIcon") !== null) {
        icon = document.getElementById("motalkIcon");
        icon.removeEventListener("click", GeneralJs.events["iconClickEvent"][1]);
        GeneralJs.addHrefEvent(icon, "http://pf.kakao.com/_vxixkjxl/chat");
        icon.parentNode.lastChild.style.display = "none";
      }

      instance.certificationBox(submitNamePhone[0], submitNamePhone[1], mother, boo, () => {
        if (obj.cellphone !== "010-2747-3403") {
          window.gtag('event', 'login');
        }
        if (window.ga !== undefined) {
          if (typeof window.ga.getAll === "function") {
            if (typeof window.ga.getAll()[0].get('clientId') === "string") {
              ajaxdata += "&googleId=" + window.ga.getAll()[0].get('clientId');
            }
          }
        }
        GeneralJs.ajaxPromise(ajaxdata, "https://home-liaison.co.kr:3000/submit").then(instance.thankyouPage(boo, submitNamePhone)).catch((err) => {
          window.alert("오류가 발생하였습니다! 다시 시도해주세요 :)");
          window.location.reload();
        });
      });

    }
  }
}

ConsultingJs.prototype.imageBoxMaker = function (mother, fileMotherinput, order, toggle) {
  const instance = this;
  const { sub: { greenClose } } = this.mother.map;

  let fileMother = fileMotherinput.files;
  let text = fileMother[order].name;

  let div_clone, div_clone2, div_clone3, svg_clone;
  let ea = toggle ? "px" : "vw";
  let size = toggle ? 15 : 3.5;
  let margin = toggle ? 12 : 2;
  let width = toggle ? 182.75 : 20.6;
  let height = toggle ? 24.5 : 5;
  let top, right, left;
  let style = {};
  let attribute = {};

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
  top = margin + (toggle ? -1 : -0.5);
  left = top + (toggle ? 3 : 0.9);
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    width: String(toggle ? width - (margin * 2) : 14.5) + ea,
    height: String(height) + ea,
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
  top = toggle ? 16.5 : 3;
  right = toggle ? 12 : 2.5;
  height = toggle ? 10 : 2.6;
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
  svg_clone.addEventListener("click", function () {
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
    position: "relative",
    textAlign: "left",
  }
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);

  mother.appendChild(div_clone);
}

ConsultingJs.prototype.thankyouLoad = function (boo, valuesTong) {
  if (valuesTong.length < 2) {
    throw new Error("invaild values");
  }
  const instance = this;
  const { sub: { submit, thankyou: { main, sub } } } = this.map;
  const { whiteTitle, etc: { clickWording, fileSend, complete } } = sub;
  const { factorTitle, white: fileSendWhite } = fileSend;
  let list, mo, toggle, ea;
  const thankyouFixedWidth = {
    desktop: 903,
    mobile: 85,
  };
  if (boo === "desktop") {
    mo = "";
    toggle = true;
    ea = "px";
    list = [
      function (source) {
        const { images: { desktop: image }, src: { desktop: vector } } = source;
        let h = document.createDocumentFragment();
        let div_clone, div_clone2;

        let svg_clone, height, width, ea = "px";
        let style = {};

        width = thankyouFixedWidth.desktop;
        svg_clone = SvgTongAsync.tongMaker();
        svg_clone.src = vector;
        height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" });
        style = {
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          marginBottom: String(25) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        h.appendChild(SvgTongAsync.parsing(svg_clone));

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("thankyou_block_imagebox");
        div_clone.style.height = "150px";

        for (let i = 0; i < image.length; i++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("thankyou_block_imagebox_detail");
          div_clone2.style.backgroundImage = "url('" + ConsultingJs.sourceLink + image[i] + "')";
          div_clone2.style.backgroundSize = "102% 102%";
          div_clone2.style.backgroundPosition = "50% 50%";
          if (i === image.length - 1) {
            div_clone2.style.marginRight = "0";
          }
          div_clone.appendChild(div_clone2);
        }
        h.appendChild(div_clone);
        return h;
      },
      function (source) {
        const { images: { desktop: image }, src: { desktop: vector } } = source;
        let h = document.createDocumentFragment();
        let div_clone, div_clone2;
        let svg_clone, height, width, ea = "px";
        let style = {};

        width = thankyouFixedWidth.desktop;
        svg_clone = SvgTongAsync.tongMaker();
        svg_clone.src = vector;
        height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" });
        style = {
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          marginBottom: String(25) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        h.appendChild(SvgTongAsync.parsing(svg_clone));

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("thankyou_block_imagebox");
        div_clone.style.height = "300px";

        for (let i = 0; i < image.length; i++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("thankyou_block_imagebox_detail");
          div_clone2.style.backgroundImage = "url('" + ConsultingJs.sourceLink + image[i] + "')";
          if (i === image.length - 1) {
            div_clone2.style.marginRight = "0";
            div_clone2.style.backgroundSize = "100% auto";
          }
          div_clone.appendChild(div_clone2);
        }
        h.appendChild(div_clone);
        return h;
      },
    ];
  } else {
    mo = "mo";
    toggle = false;
    ea = "vw";
    list = [
      function (source) {
        const { images: { mobile: image }, src: { mobile: vector } } = source;
        let h = document.createDocumentFragment();
        let div_clone, div_clone2;
        let svg_clone, height, width;
        let ea = "vw";
        let style = {};

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("mothankyou_block_imagebox");
        div_clone.style.marginBottom = String(8.2) + ea;
        div_clone.style.width = String(85) + ea;
        div_clone.style.paddingTop = String(16.3) + ea;
        div_clone.style.borderTop = "1px solid #ececec";
        div_clone.style.left = String(7.5) + ea;

        for (let i = 0; i < image.length; i++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("mothankyou_block_imagebox_detail");
          div_clone2.style.backgroundImage = "url('" + ConsultingJs.sourceLink + image[i] + "')";
          div_clone2.style.backgroundSize = "102% 102%";
          div_clone2.style.backgroundPosition = "50% 50%";
          div_clone2.style.width = String(thankyouFixedWidth.mobile) + ea,
          div_clone2.style.height = "42vw";
          if (i === image.length - 1) {
            div_clone2.style.marginRight = "0";
          }
          div_clone.appendChild(div_clone2);
        }
        h.appendChild(div_clone);

        width = thankyouFixedWidth.mobile;
        svg_clone = SvgTongAsync.tongMaker();
        svg_clone.src = vector;
        height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" }) + 0.5;
        style = {
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          marginBottom: String(2) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        h.appendChild(SvgTongAsync.parsing(svg_clone));

        return h;
      },
      function (source) {
        const { images: { mobile: image }, src: { mobile: vector } } = source;
        let h = document.createDocumentFragment();
        let div_clone, div_clone2;
        let list = [ source[1], source[2], ];

        let svg_clone, height, width, ea = "vw";
        let style = {};

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("mothankyou_block_imagebox");
        div_clone.style.marginBottom = String(8.2) + ea;

        for (let i = 0; i < image.length; i++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("mothankyou_block_imagebox_detail");
          div_clone2.style.backgroundImage = "url('" + ConsultingJs.sourceLink + image[i] + "')";
          if (i === image.length - 1) {
            div_clone2.style.marginRight = "0";
          }
          div_clone.appendChild(div_clone2);
        }
        h.appendChild(div_clone);

        width = thankyouFixedWidth.mobile;
        svg_clone = SvgTongAsync.tongMaker();
        svg_clone.src = vector;
        height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" }) + 0.5;
        style = {
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          marginBottom: String(2) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        h.appendChild(SvgTongAsync.parsing(svg_clone));

        return h;
      },
    ];
  }
  return function () {
    let h = document.createDocumentFragment();
    let div_clone, div_clone2, svg_clone, input_clone, file_input;
    let height, width, marginRight, marginBottom, visualSpecific, paddingLeft, margin, borderRadius, top, right;
    let style = {};
    let attribute = {};
    let targetDoms = [];
    let fileBoxes = [];
    let fileWording = [];
    let fileSelectionButtons = [];
    let fileAddButtons = [];
    let hiddenFileInputs = [];

    //white title
    marginBottom = toggle ? 100 : 14;
    paddingLeft = toggle ? 7 : ((100 - thankyouFixedWidth.mobile) / 2);
    width = thankyouFixedWidth[(toggle ? "desktop" : "mobile")];
    svg_clone = SvgTongAsync.tongMaker();
    svg_clone.src = whiteTitle.src[(toggle ? "desktop" : "mobile")];
    svg_clone.classList.add(mo + "thankyou_block");
    height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" });
    style = {
      position: "relative",
      height: String(height) + ea,
      width: String(width) + ea,
      top: String(0) + ea,
      paddingLeft: String(paddingLeft) + "%",
      marginBottom: String(marginBottom) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    h.appendChild(SvgTongAsync.parsing(svg_clone));

    //CONTENTS LOOP -------------------------------------------------------------------------------------------------

    //main contents
    for (let i = 0; i < list.length; i++) {

      //block base
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add(mo + "thankyou_block");
      div_clone.appendChild((list[i])(main[i]));
      h.appendChild(div_clone);

      //file factor title
      height = toggle ? 18 : 4.2;
      marginBottom = toggle ? 17 : 3;
      svg_clone = SvgTongAsync.tongMaker();
      svg_clone.src = factorTitle.src[(toggle ? "desktop" : "mobile")];
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "relative",
        display: "block",
        height: String(height) + ea,
        width: String(width + (toggle ? 1 : 0.3)) + ea,
        top: String(0) + ea,
        paddingLeft: String(paddingLeft) + "%",
        marginBottom: String(marginBottom) + ea,
        animation: "fadeup 0.6s ease forwards",
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      h.appendChild(SvgTongAsync.parsing(svg_clone));

      //gray box
      height = toggle ? 150 : 27.3;
      marginBottom = toggle ? 97 : 17;
      borderRadius = toggle ? 5 : 2;
      width = thankyouFixedWidth[(toggle ? "desktop" : "mobile")];
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
        height: String(height) + ea,
        width: String(width) + ea,
        borderRadius: String(borderRadius) + ea,
        left: String(paddingLeft) + "%",
        marginBottom: String(marginBottom) + ea,
        background: "#f7f7f7",
        cursor: "pointer",
        animation: "fadeup 0.6s ease forwards",
      };
      for (let j in style) {
        div_clone.style[j] = style[j];
      }
      div_clone.id = "grayFileBox" + String(i);
      div_clone.setAttribute("cus_order", String(i));

      //gray box in wording
      height = toggle ? 26 : 5;
      visualSpecific = toggle ? 7 : 1;
      svg_clone = SvgTongAsync.tongMaker();
      svg_clone.src = clickWording.src[(toggle ? "desktop" : "mobile")];
      svg_clone.classList.add("hoverdefault");
      svg_clone.classList.add("grayboxwording");
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "absolute",
        left: "50%",
        top: "50%",
        height: String(height) + ea,
        width: String(width) + ea,
        marginLeft: '-' + String((width / 2)) + ea,
        marginTop: '-' + String((height / 2) + visualSpecific) + ea,
        opacity: "0.8",
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      fileWording.push(SvgTongAsync.parsing(svg_clone));
      div_clone.appendChild(fileWording[i]);

      //file text box
      height = toggle ? 150 : 27.3;
      marginBottom = toggle ? 97 : 18.5;
      margin = toggle ? 20 : 3.5;
      width = thankyouFixedWidth[(toggle ? "desktop" : "mobile")];
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        height: String(height - (margin * 2)) + ea,
        width: String(width - margin) + ea,
        paddingLeft: String(margin) + ea,
        top: String(margin) + ea,
        left: "0",
        textAlign: "left",
        overflowY: "scroll",
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      div_clone.appendChild(div_clone2);
      fileBoxes.push(div_clone2);

      //file input
      file_input = GeneralJs.nodes.input.cloneNode(true);
      file_input.classList.add("targetInputs");
      attribute = {
        type: "file",
        name: "upload" + String(i),
        accept: "image/*",
        cus_name: "fileInput" + String(i)
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
      file_input.multiple = true;
      div_clone.appendChild(file_input);
      targetDoms.push(file_input);

      //file selection button
      height = toggle ? 12.2 : 3.2;
      top = toggle ? -28 : -6.2;
      right = toggle ? 66 : 15.8;
      svg_clone = SvgTongAsync.tongMaker();
      svg_clone.src = fileSendWhite[0].src[boo];
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "absolute",
        height: String(height) + ea,
        width: String(width + (toggle ? 1 : 0.3)) + ea,
        right: String(right) + ea,
        top: String(top) + ea,
        pointer: "cursor"
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      fileSelectionButtons.push(SvgTongAsync.parsing(svg_clone));
      div_clone.appendChild(fileSelectionButtons[i]);

      //file add button
      right = toggle ? 2 : 0.3;
      svg_clone = SvgTongAsync.tongMaker();
      svg_clone.src = fileSendWhite[1].src[boo];
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "absolute",
        height: String(height) + ea,
        width: String(width + (toggle ? 1 : 0.3)) + ea,
        right: String(right) + ea,
        top: String(top) + ea,
        pointer: "cursor"
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      fileAddButtons.push(SvgTongAsync.parsing(svg_clone));
      div_clone.appendChild(fileAddButtons[i]);

      //end
      h.appendChild(div_clone);
    }

    //SUB INPUTS (NAME, PHONE) ----------------------------------------------------------------------

    //name input
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("targetInputs");
    attribute = {
      type: "text",
      value: valuesTong[0],
      name: "name",
    };
    style = {
      display: "none",
    };
    for (let i in attribute) {
      input_clone.setAttribute(i, attribute[i]);
    }
    for (let i in style) {
      input_clone.style[i] = style[i];
    }
    div_clone.parentNode.appendChild(input_clone);
    targetDoms.push(input_clone);

    //phone input
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("targetInputs");
    attribute = {
      type: "text",
      value: valuesTong[1],
      name: "phone",
    };
    style = {
      display: "none",
    };
    for (let i in attribute) {
      input_clone.setAttribute(i, attribute[i]);
    }
    for (let i in style) {
      input_clone.style[i] = style[i];
    }
    div_clone.parentNode.appendChild(input_clone);
    targetDoms.push(input_clone);

    //EVENTS -----------------------------------------------------------------------------------

    //drag and drop events
    const allDropEvents = [ 'dragenter', 'dragover', 'dragleave', 'drop' ];
    let additionFileInputs = new Array(fileBoxes.length);

    for (let j = 0; j < fileBoxes.length; j++) {

      //prevent default
      for (let i = 0; i < allDropEvents.length; i++) {
        fileBoxes[j].addEventListener(allDropEvents[i], function (e) {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      }

      //click event
      GeneralJs.events["fileClickOpen" + String(j)] = function (e) {
        //initial --------------- start
        //initial remove add inputs
        let hiddenInputs = document.getElementById("grayFileBox" + String(j)).querySelectorAll(".grayFileInputAdd" + String(j));
        for (let i = 0; i < hiddenInputs.length; i++) {
          document.getElementById("grayFileBox" + String(j)).removeChild(hiddenInputs[i]);
        }
        //initial remove white boxes
        while (fileBoxes[j].firstChild) {
          fileBoxes[j].removeChild(fileBoxes[j].lastChild);
        }
        //initial attributes
        for (let i = 0; i < 20; i++) {
          if (targetDoms[j].hasAttribute("cus_close" + String(i))) {
            targetDoms[j].removeAttribute("cus_close" + String(i));
          }
        }
        //initial --------------- end

        targetDoms[j].click();
      }

      //click event add
      fileBoxes[j].addEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
      fileSelectionButtons[j].addEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);

      //addition click event
      fileAddButtons[j].addEventListener("click", function (e) {
        let file_input;
        let attribute = {}, style = {};

        file_input = GeneralJs.nodes.input.cloneNode(true);
        attribute = {
          type: "file",
          name: "upload" + String(j),
          accept: "image/*",
        };
        style = {
          display: "none",
        };
        for (let k in attribute) {
          file_input.setAttribute(k, attribute[k]);
        }
        for (let k in style) {
          file_input.style[k] = style[k];
        }
        file_input.multiple = true;
        file_input.classList.add("grayFileInputAdd" + String(j));
        additionFileInputs[j] = file_input;

        document.getElementById("grayFileBox" + String(j)).appendChild(additionFileInputs[j]);

        //append white box
        additionFileInputs[j].addEventListener("change", function (e) {
          let inputs = document.getElementById("grayFileBox" + String(j)).querySelectorAll("input");
          let filesArr = [];
          let inputArrs = [];
          let tempArr;
          for (let i = 0; i < inputs.length; i++) {
            tempArr = [ ...inputs[i].files ];
            inputArrs.push(tempArr);
            for (let k = 0; k < tempArr.length; k++) {
              filesArr.push(tempArr[k]);
            }
          }
          if (filesArr.length > 0) {
            fileWording[j].style.opacity = '0';
            fileBoxes[j].removeEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
          } else {
            fileWording[j].style.opacity = '';
            fileBoxes[j].addEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
          }
          while (fileBoxes[j].firstChild) {
            fileBoxes[j].removeChild(fileBoxes[j].lastChild);
          }
          for (let i = 0; i < inputArrs.length; i++) {
            for (let k = 0; k < inputArrs[i].length; k++) {
              if (!inputs[i].hasAttribute("cus_close" + String(k))) {
                instance.imageBoxMaker(fileBoxes[j], inputs[i], k, toggle);
              }
            }
          }
        });
        additionFileInputs[j].click();

      });

      //change event
      GeneralJs.events["fileStatusChange" + String(j)] = function (e) {

        //initial --------------- start
        //initial remove add inputs
        let hiddenInputs = document.getElementById("grayFileBox" + String(j)).querySelectorAll(".grayFileInputAdd" + String(j));
        for (let i = 0; i < hiddenInputs.length; i++) {
          document.getElementById("grayFileBox" + String(j)).removeChild(hiddenInputs[i]);
        }
        //initial remove white boxes
        while (fileBoxes[j].firstChild) {
          fileBoxes[j].removeChild(fileBoxes[j].lastChild);
        }
        //initial attributes
        for (let i = 0; i < 20; i++) {
          if (targetDoms[j].hasAttribute("cus_close" + String(i))) {
            targetDoms[j].removeAttribute("cus_close" + String(i));
          }
        }
        //initial --------------- end

        let filesArr = targetDoms[j].files;
        if (filesArr.length > 0) {
          fileWording[j].style.opacity = '0';
          fileBoxes[j].removeEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
        } else {
          fileWording[j].style.opacity = '';
          fileBoxes[j].addEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
        }
        for (let i = 0; i < filesArr.length; i++) {
          instance.imageBoxMaker(fileBoxes[j], targetDoms[j], i, toggle);
        }
      }

      //change event add
      targetDoms[j].addEventListener("change", GeneralJs.events["fileStatusChange" + String(j)]);

      //drop event
      fileBoxes[j].addEventListener("drop", function (e) {
        //prevent change event
        targetDoms[j].removeEventListener("change", GeneralJs.events["fileStatusChange" + String(j)]);

        //initial --------------- start
        //initial remove add inputs
        let hiddenInputs = document.getElementById("grayFileBox" + String(j)).querySelectorAll(".grayFileInputAdd" + String(j));
        for (let i = 0; i < hiddenInputs.length; i++) {
          document.getElementById("grayFileBox" + String(j)).removeChild(hiddenInputs[i]);
        }
        //initial remove white boxes
        while (fileBoxes[j].firstChild) {
          fileBoxes[j].removeChild(fileBoxes[j].lastChild);
        }
        //initial attributes
        for (let i = 0; i < 20; i++) {
          if (targetDoms[j].hasAttribute("cus_close" + String(i))) {
            targetDoms[j].removeAttribute("cus_close" + String(i));
          }
        }
        //initial --------------- end

        targetDoms[j].files = e.dataTransfer.files;
        let filesArr = targetDoms[j].files;
        if (filesArr.length > 0) {
          fileWording[j].style.opacity = '0';
          fileBoxes[j].removeEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
        } else {
          fileWording[j].style.opacity = '';
          fileBoxes[j].addEventListener("click", GeneralJs.events["fileClickOpen" + String(j)]);
        }

        for (let i = 0; i < filesArr.length; i++) {
          instance.imageBoxMaker(fileBoxes[j], targetDoms[j], i, toggle);
        }

        //change event add
        targetDoms[j].addEventListener("change", GeneralJs.events["fileStatusChange" + String(j)]);

      }, false);

    }

    //button
    let totalButtonWidth = 0;

    //button base
    height = toggle ? 60 : 11.5;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      display: "block",
      height: String(height) + ea,
      marginTop: String(toggle ? -10 : 0) + ea,
      marginBottom: String(toggle ? 100 : 13) + ea,
      left: "50%",
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    //1
    marginRight = toggle ? 16 : 2;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add(mo + "below_box_submit_box");
    style = {
      position: "relative",
      display: "inline-block",
      height: String(height) + ea,
      left: String(0) + ea,
      marginLeft: String(0) + ea,
      marginRight: String(marginRight) + ea,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }

    height = toggle ? 22 : 4;
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = submit[2].src[(toggle ? "desktop" : "mobile")];
    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
    style = {
      height: String(height) + ea,
      width: String(width) + ea,
      left: "50%",
      marginLeft: String((-1 * (width / 2)) - (toggle ? 1.5 : 0)) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.classList.add(mo + "below_box_submit");
    div_clone2.appendChild(SvgTong.parsing(svg_clone));

    //submit event
    div_clone2.addEventListener("click", function (e) {
      let listNum = list.length;
      let files = new Array(listNum);
      let formData = new FormData();
      formData.enctype = "multipart/form-data";

      //set files
      let temp, additionInputs, targetAddInput, targetAddInputFiles;
      for (let i = 0; i < listNum; i++) {
        files[i] = [];
        temp = [ ...targetDoms[i].files ];
        additionInputs = document.querySelectorAll(".grayFileInputAdd" + String(i));
        for (let z = 0; z < temp.length; z++) {
          if (!targetDoms[i].hasAttribute("cus_close" + String(z))) {
            files[i].push(temp[z]);
          }
        }
        for (let z = 0; z < additionInputs.length; z++) {
          targetAddInput = additionInputs[z];
          targetAddInputFiles = [ ...targetAddInput.files ];
          for (let x = 0; x < targetAddInputFiles.length; x++) {
            if (!targetAddInput.hasAttribute("cus_close" + String(x))) {
              files[i].push(targetAddInputFiles[x]);
            }
          }
        }
      }

      //set name, phone
      for (let i = 0; i < targetDoms.length - listNum; i++) {
        formData.append(targetDoms[listNum + i].getAttribute("name"), targetDoms[listNum + i].value);
      }

      if (files[0].length !== 0 || files[1].length !== 0) {

        for (let i = 0; i < files.length; i++) {
          for (let j = 0; j < files[i].length; j++) {
            formData.append("upload" + String(i), files[i][j]);
          }
        }

        GeneralJs.ajaxForm(formData, "https://home-liaison.co.kr:3000/binary").then(function (data) {
          if (data === "success") {
            instance.pendingBox(document.getElementById(toggle ? "consultingbox" : "moconsultingbox"), (toggle ? "desktop" : "mobile"), true, true);
            instance.completeBox(document.getElementById(toggle ? "consultingbox" : "moconsultingbox"), (toggle ? "desktop" : "mobile"));
            setTimeout(function () {
              window.location.href = "https://home-liaison.com";
            }, 3000);
          } else {
            alert("사진 전송에 문제가 생겼습니다! 200MB 이하의 파일로 다시 시도해주세요!");
            window.location.reload();
          }
        }).catch(function (err) {
          alert("사진 전송에 문제가 생겼습니다! 200MB 이하의 파일로 다시 시도해주세요!");
          window.location.reload();
        });

        instance.pendingBox(document.getElementById(toggle ? "consultingbox" : "moconsultingbox"), (toggle ? "desktop" : "mobile"));

      } else {
        alert("현장 사진 또는 선호 사진을 보내주세요!");
        window.scrollTo(0, 0);
      }
    });

    width = width + ((toggle ? 25.5 : 5.5) * 2);
    div_clone2.style.width = String(width) + ea;
    if (!toggle) { div_clone2.style.marginTop = String(-1) + ea; }
    totalButtonWidth += width + marginRight;

    div_clone.appendChild(div_clone2);

    //2
    height = toggle ? 60 : 11.5;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add(mo + "below_box_submit_box");
    style = {
      position: "relative",
      display: "inline-block",
      height: String(height) + ea,
      left: String(0) + ea,
      marginLeft: String(0) + ea,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }

    height = toggle ? 22 : 4;
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = submit[1].src[(toggle ? "desktop" : "mobile")];
    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
    style = {
      height: String(height) + ea,
      width: String(width) + ea,
      left: "50%",
      marginLeft: String((-1 * (width / 2)) - (toggle ? 1.5 : 0)) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.classList.add(mo + "below_box_submit");
    div_clone2.appendChild(SvgTong.parsing(svg_clone));
    GeneralJs.addHrefEvent(div_clone2, "http://pf.kakao.com/_vxixkjxl/chat");

    width = width + ((toggle ? 25.5 : 5.5) * 2);
    div_clone2.style.width = String(width) + ea;
    if (!toggle) { div_clone2.style.marginTop = String(-1) + ea; }
    totalButtonWidth += width;

    div_clone.appendChild(div_clone2);

    div_clone.style.width = String(totalButtonWidth) + ea;
    div_clone.style.marginLeft = '-' + String(totalButtonWidth / 2) + ea;

    h.appendChild(div_clone);

    return h;
  }
}

ConsultingJs.prototype.thankyouPage = function (boo, valuesTong) {
  const instance = this;
  let mo = (boo === "desktop") ? "" : "mo";
  return function (data) {
    if (data === "error" || data === "null") {

      window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
      window.location.href = "https://home-liaison.com/consulting.php";
      return false;

    } else if (data === "photo") {
    // } else {

      history.pushState({}, "", "?submit=true");
      instance.pendingBox(document.getElementById((boo === "desktop") ? "consultingbox" : "moconsultingbox"), boo, true);

      window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById("consultinggrayback").style.cssText = "height:1600px";
      document.getElementById(mo + "consultingbox").style.animation = "fadedown 1s ease forwards";
      document.getElementById(mo + "consultingtitle").style.animation = "fadedown 1s ease forwards";
      let fadeout = setTimeout(function () {
        let back = document.getElementById(mo + "consultingback");
        back.style.opacity = "0";
        let mother = document.getElementById(mo + "consultingbox");
        mother.style.cssText = "";
        while (mother.firstChild) {
          mother.removeChild(mother.lastChild);
        }
        let thankyouFunc = instance.thankyouLoad(boo, valuesTong);
        mother.appendChild(thankyouFunc());
        clearTimeout(fadeout);
      }, 1100);

    } else {

      history.pushState({}, "", "?submit=true");
      instance.pendingBox(document.getElementById((boo === "desktop") ? "consultingbox" : "moconsultingbox"), boo, true);
      GeneralJs.selfHref("https://home-liaison.servehttp.com/middle/curation/?cliid=" + data);

    }
  }
}

ConsultingJs.prototype.returnBlocks = function () {
  const instance = this;
  return [
    {
      name: "client",
      height: { desktop: 214, mobile: 65.5, },
      desktop: [
        //성함
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(true, "blocks_name");
            dom.style.top = "50px";
            dom.style.left = "99.5px";
            dom.style.width = "149px";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");

            return dom;
          }
        },
        //연락처
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(true, "blocks_phone");
            dom.style.top = "95.5px";
            dom.style.left = "99.5px";
            dom.style.width = "149px";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "010-0000-0000");
            input.setAttribute("hypenboo", "yes");
            input.addEventListener("keyup", function (e) {
              this.value = GeneralJs.autoHypenPhone(this.value);
            });

            return dom;
          }
        },
        //주소
        {
          titleStyle: {
            top: 57,
            right: 534,
          },
          callback: function (needs) {
            const { buttons, popup } = needs;

            let h = document.createDocumentFragment();
            let dom, input, img;
            let svg_clone;
            let height, width, ea = "px";
            let style = {};
            let margin;
            let popupHeight;
            let popup_dom;
            let top, right, inputWidth;
            let svg_dom;
            let popup_dom2, input2, svg_dom2;
            let popup_indent;

            //button
            height = 31;
            dom = GeneralJs.nodes.div.cloneNode(true);
            dom.className = "blocks_address_button";
            style = {
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
            svg_clone.classList.add("blocks_address_button_img");
            svg_clone.src = buttons[0].src.desktop;
            width = GeneralJs.parseRatio({ source: buttons[0].src.desktop, target: height, method: "height", result: "number" });
            style = {
              top: String(9) + ea,
              left: "50%",
              width: String(width) + ea,
              height: String(height) + ea,
              marginLeft: String((-1 * (width / 2)) - 0.9) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            dom.addEventListener("click", ConsultingJs.postEvent("desktop"));
            dom.appendChild(SvgTong.parsing(svg_clone));
            h.appendChild(dom);

            //address
            top = 50;
            right = 0;
            inputWidth = 407;
            height = 33;
            margin = 11;
            popupHeight = 56;
            popup_indent = 8;

            dom = ConsultingJs.inputMaker(true, "blocks_address0");
            dom.style.top = String(top) + ea;
            dom.style.right = String(right) + ea;
            dom.style.width = String(inputWidth) + ea;
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "주소");
            h.appendChild(dom);

            //address notice
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
              top: String(top - popupHeight - popup_indent) + ea,
              width: String(width + ((margin + 6) * 2)) + ea,
              height: String(popupHeight) + ea,
              right: String(right + (inputWidth / 2) - ((width + ((margin + 6) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
              zIndex: String(1),
            };
            for (let i in style) {
              popup_dom.style[i] = style[i];
            }

            popup_dom.appendChild(svg_dom);
            h.appendChild(popup_dom);

            input.addEventListener("focus", function (e) {
              popup_dom.style.display = "block";
              popup_dom.style.animation = "fadeup 0.3s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.setTimeout(function () {
                popup_dom.style.display = "none";
              }, 401);
            });

            //detail address
            top = 95;
            right = 0;
            inputWidth = 477;

            dom = ConsultingJs.inputMaker(true, "blocks_address1");
            dom.style.top = String(top) + ea;
            dom.style.right = String(right) + ea;
            dom.style.width = String(inputWidth) + ea;
            input2 = dom.children[0];
            input2.style.textAlign = "left";
            input2.style.textIndent = "10px";
            input2.setAttribute("placeholder", "상세 주소");
            h.appendChild(dom);

            //detail address notice
            popup_dom2 = GeneralJs.nodes.div.cloneNode(true);

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
            svg_dom2 = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top + 31.5 + popup_indent) + ea,
              width: String(width + ((margin + 6) * 2)) + ea,
              height: String(popupHeight) + ea,
              right: String(right + (inputWidth / 2) - ((width + ((margin + 6) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + ea,
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
              zIndex: String(1),
            };
            for (let i in style) {
              popup_dom2.style[i] = style[i];
            }

            popup_dom2.appendChild(svg_dom2);
            h.appendChild(popup_dom2);

            input2.addEventListener("focus", function (e) {
              popup_dom2.style.display = "block";
              popup_dom2.style.animation = "fadeup 0.3s ease forwards";
            });

            input2.addEventListener("blur", function (e) {
              popup_dom2.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.setTimeout(function () {
                popup_dom2.style.display = "none";
              }, 401);
            });

            return h;
          }
        },
        //구성원
        {
          titleStyle: {
            top: 144,
            right: 518,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(true, "blocks_family");
            dom.style.top = "139px";
            dom.style.right = "0px";
            dom.style.width = "477px";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "가족 구성원 (예) 부부, 딸 0명, 아들 0명, 딸 0세");

            return dom;
          }
        },
        //이메일
        {
          titleStyle: {
            top: 189,
            right: 518,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(true, "blocks_email");
            dom.style.bottom = "0px";
            dom.style.right = "0px";
            dom.style.width = "477px";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "10px";
            input.setAttribute("placeholder", "example@home-liaison.com");

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
            let dom = ConsultingJs.inputMaker(false, "moblocks_name");
            dom.style.top = "10vw";
            dom.style.left = "21.2vw";
            dom.style.width = "36vw";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.setAttribute("placeholder", "성함");

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
            let dom = ConsultingJs.inputMaker(false, "moblocks_phone");
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

            return dom;
          }
        },
        //주소
        {
          titleStyle: {
            top: 31.1,
            left: 0,
          },
          callback: function (needs) {
            const { buttons, popup } = needs;
            let h = document.createDocumentFragment();
            let dom, input, img;
            let svg_clone;
            let height, width, ea = "vw";
            let style = {};
            let popup_dom;
            let popupMargin;
            let popupHeight;
            let top, left, inputWidth;
            let svg_dom;
            let popup_dom2, input2, svg_dom2;
            let popupIndent;
            let popupSvgHeight;

            top = 29.6;
            left = 37.2;
            inputWidth = 50.4;
            popupSvgHeight = 8.2;
            popupHeight = 15.1;
            popupMargin = 3.5;
            popupIndent = 2;

            //button
            height = 7.1;
            dom = GeneralJs.nodes.div.cloneNode(true);
            dom.className = "moblocks_address_button";
            style = {
              top: String(top) + ea,
              left: String(21.2) + ea,
              width: String(14) + ea,
              height: String(height) + ea,
            };
            for (let i in style) {
              dom.style[i] = style[i];
            }
            height = 2.6;
            svg_clone = SvgTong.tongMaker();
            svg_clone.classList.add("blocks_address_button_img");
            svg_clone.src = buttons[0].src.mobile;
            width = GeneralJs.parseRatio({ source: buttons[0].src.mobile, target: height, method: "height", result: "number" });
            style = {
              top: String(2) + ea,
              left: "50%",
              width: String(width - 0.1) + ea,
              height: String(height) + ea,
              marginLeft: String((-1 * (width / 2)) - 0.1) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            dom.addEventListener("click", ConsultingJs.postEvent("mobile"));
            dom.appendChild(SvgTong.parsing(svg_clone));
            h.appendChild(dom);

            //address
            dom = ConsultingJs.inputMaker(false, "moblocks_address0");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;
            input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "주소");
            h.appendChild(dom);

            //address notice
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
              top: String(top - popupHeight - popupIndent) + ea,
              width: String(width + ((popupMargin + 0.3) * 2) + 0.1) + ea,
              height: String(popupHeight) + ea,
              left: String(left + (inputWidth / 2) - ((width + ((popupMargin + 0.3) * 2)) / 2)) + ea,
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
              popup_dom.style.animation = "fadeup 0.3s ease forwards";
            });

            input.addEventListener("blur", function (e) {
              popup_dom.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.setTimeout(function () {
                popup_dom.style.display = "none";
              }, 401);
            });

            //detail address
            top = 39.4;
            left = 21.2;
            inputWidth = 66.2;

            dom = ConsultingJs.inputMaker(false, "moblocks_address1");
            dom.style.top = String(top) + ea;
            dom.style.left = String(left) + ea;
            dom.style.width = String(inputWidth) + ea;
            input2 = dom.children[0];
            input2.style.textAlign = "left";
            input2.style.textIndent = "2.1vw";
            input2.setAttribute("placeholder", "상세 주소");
            h.appendChild(dom);

            //detail address notice
            popup_dom2 = GeneralJs.nodes.div.cloneNode(true);

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
            svg_dom2 = SvgTong.parsing(svg_clone);

            style = {
              position: "absolute",
              top: String(top - popupHeight - popupIndent) + ea,
              width: String(width + ((popupMargin + 0.3) * 2) + 0.1) + ea,
              height: String(popupHeight) + ea,
              left: String(left + (inputWidth / 2) - ((width + ((popupMargin + 0.3) * 2)) / 2)) + ea,
              background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
              borderRadius: String(3) + "px",
              transition: "opacity 0.3s ease",
              boxShadow: "0px 3px 13px -9px #404040",
              opacity: String(0),
              display: "none",
            };
            for (let i in style) {
              popup_dom2.style[i] = style[i];
            }

            popup_dom2.appendChild(svg_dom2);
            h.appendChild(popup_dom2);

            input2.addEventListener("focus", function (e) {
              popup_dom2.style.display = "block";
              popup_dom2.style.animation = "fadeup 0.3s ease forwards";
            });

            input2.addEventListener("blur", function (e) {
              popup_dom2.style.animation = "fadedown 0.4s ease forwards";
              GeneralJs.setTimeout(function () {
                popup_dom2.style.display = "none";
              }, 401);
            });

            return h;
          }
        },
        //구성원
        {
          titleStyle: {
            top: 50.5,
            left: 0,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(false, "moblocks_family");
            dom.style.top = "49.1vw";
            dom.style.left = "21.2vw";
            dom.style.width = "66.2vw";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "가족 구성원 (예) 부부, 딸 0명, 아들 0명, 딸 0세");
            return dom;
          }
        },
        //이메일
        {
          titleStyle: {
            top: 60,
            left: 0,
          },
          callback: function (needs) {
            let dom = ConsultingJs.inputMaker(false, "moblocks_email");
            dom.style.bottom = "0vw";
            dom.style.left = "21.2vw";
            dom.style.width = "66.2vw";
            let input = dom.children[0];
            input.style.textAlign = "left";
            input.style.textIndent = "2.1vw";
            input.setAttribute("placeholder", "example@home-liaison.com");
            return dom;
          }
        },
      ],
    },
    {
      name: "budget",
      height: { desktop: 144, mobile: 35.9, },
      desktop: [
        //예산
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            let div_clone, div_clone2, input_clone, svg_clone;
            let dom = GeneralJs.nodes.div.cloneNode(true);
            dom.classList.add("blocks_budgetbox");

            //event
            function clickEvent(num) {
              return function (e) {
                if (this.classList.contains("blocks_budgetbox_money")) {
                  this.querySelector("input").checked = true;
                } else {
                  this.parentElement.querySelector("input").checked = true;
                }
                document.getElementById("blocks_budgetbox_arrow").style.transform = "translateX(" + String(num) + "px)";
              }
            }

            const { buttons, notice } = needs;
            let height, width, marginRight, ea = "px", totalWidth = 0;
            let arrowHeight, arrowWidth;

            height = 13.7;
            marginRight = 36;
            width = GeneralJs.parseRatio({ source: buttons[0].src.desktop.off, target: height, method: "height", result: "number" });

            //arrow
            arrowWidth = 9;
            arrowHeight = GeneralJs.parseRatio({ source: instance.map.sub.etc.arrow[0].src, target: arrowWidth, method: "width", result: "number" });
            svg_clone = SvgTong.tongMaker();
            svg_clone.id = "blocks_budgetbox_arrow";
            svg_clone.src = instance.map.sub.etc.arrow[0].src;
            svg_clone.style.width = String(arrowWidth) + ea;
            svg_clone.style.height = String(arrowHeight) + ea;
            svg_clone.style.transform = "translateX(" + String((width / 2) - 4.2) + ea + ")";
            dom.appendChild(SvgTong.parsing(svg_clone));

            //buttons
            for (let i = 0; i < buttons.length; i++) {
              width = GeneralJs.parseRatio({ source: buttons[i].src.desktop.off, target: height, method: "height", result: "number" });
              totalWidth += width;
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("blocks_budgetbox_money");
              div_clone.style.width = String(width) + ea;
              if (i === buttons.length - 1) {
                div_clone.style.marginRight = String(0) + ea;
              } else {
                div_clone.style.marginRight = String(marginRight) + ea;
              }
              div_clone.addEventListener("click", clickEvent(totalWidth + (i * marginRight) - (width / 2) - 4.2));

              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("blocks_budgetbox_money_gray");
              div_clone2.style.left = String(totalWidth + (i * marginRight) - (width / 2)) + ea;
              dom.appendChild(div_clone2);

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "money");
              input_clone.setAttribute("value", buttons[i].title);
              input_clone.style.display = "none";
              input_clone.classList.add("blocks_budgetbox_money_input");
              if (i === 0) { input_clone.checked = true; }
              div_clone.appendChild(input_clone);

              svg_clone = SvgTong.tongMaker();
              svg_clone.classList.add("blocks_budgetbox_money_off");
              svg_clone.src = buttons[i].src.desktop.off;
              svg_clone.style.height = String(height) + ea;
              svg_clone.style.width = String(width) + ea;
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              svg_clone = SvgTong.tongMaker();
              svg_clone.classList.add("blocks_budgetbox_money_on");
              svg_clone.src = buttons[i].src.desktop.on;
              svg_clone.style.height = String(height) + ea;
              svg_clone.style.width = String(width) + ea;
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              dom.appendChild(div_clone);
            }

            //bar
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("blocks_budgetbox_gray");
            dom.appendChild(div_clone);

            //notice
            height = 15;
            svg_clone = SvgTong.tongMaker();
            svg_clone.classList.add("blocks_budgetbox_etc");
            svg_clone.src = notice.src.desktop;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            svg_clone.style.height = String(height) + ea;
            svg_clone.style.width = String(width) + ea;
            dom.appendChild(SvgTong.parsing(svg_clone));

            return dom;
          }
        },
      ],
      mobile: [
        //예산
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            let div_clone, div_clone2, input_clone, svg_clone;
            let dom = GeneralJs.nodes.div.cloneNode(true);
            dom.classList.add("moblocks_budgetbox");

            const { buttons, notice } = needs;
            let height, width, marginRight, ea = "vw";

            //event
            function clickEvent(e) {
              if (this.classList.contains("moblocks_budgetbox_money")) {
                this.querySelector("input").checked = true;
              } else {
                this.parentElement.querySelector("input").checked = true;
              }
            }

            //buttons
            height = 3;
            for (let i = 0; i < buttons.length; i++) {
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("moblocks_budgetbox_money");
              div_clone.addEventListener("click", clickEvent);

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "momoney");
              input_clone.setAttribute("value", buttons[i].title);
              input_clone.style.display = "none";
              input_clone.classList.add("moblocks_budgetbox_money_input");
              if (i === 0) { input_clone.checked = true; }
              div_clone.appendChild(input_clone);

              svg_clone = SvgTong.tongMaker();
              svg_clone.classList.add("moblocks_budgetbox_money_off");
              svg_clone.src = buttons[i].src.mobile.off;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.5;
              svg_clone.style.height = String(height) + ea;
              svg_clone.style.width = String(width) + ea;
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              svg_clone = SvgTong.tongMaker();
              svg_clone.classList.add("moblocks_budgetbox_money_on");
              svg_clone.src = buttons[i].src.mobile.on;
              svg_clone.style.height = String(height) + ea;
              svg_clone.style.width = String(width) + ea;
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              dom.appendChild(div_clone);
            }

            //notice
            height = 2.9;
            svg_clone = SvgTong.tongMaker();
            svg_clone.classList.add("moblocks_budgetbox_etc");
            svg_clone.src = notice.src.mobile;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 1;
            svg_clone.style.height = String(height) + ea;
            svg_clone.style.width = String(width) + ea;
            dom.appendChild(SvgTong.parsing(svg_clone));

            return dom;
          }
        },
      ],
    },
    {
      name: "contract",
      height: { desktop: 175, mobile: 43, },
      desktop: [
        //평수
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            const { subtitles, notice } = needs;
            let h = document.createDocumentFragment();
            let svg_clone, ea = "px", style = {};
            let height, width;
            function keyupEvent(e) {
              this.value = this.value.replace(/[^0-9\.]/g, '');
            }
            let dom = ConsultingJs.inputMaker(true, "blocks_pyeong");
            dom.style.top = "50.5px";
            dom.style.left = "98px";
            dom.style.width = "81px";

            let input = dom.children[0];
            input.style.textAlign = "center";
            input.addEventListener("keyup", keyupEvent);
            h.appendChild(dom);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = subtitles[0].src.desktop;
            height = 18;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              height: String(height) + ea,
              top: String(56) + ea,
              left: String(190) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            h.appendChild(SvgTong.parsing(svg_clone));

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.desktop;
            height = 14;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              height: String(height) + ea,
              top: String(61) + ea,
              left: String(214) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            h.appendChild(SvgTong.parsing(svg_clone));

            return h;
          }
        },
        //입주일
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          callback: function (needs) {
            const { subtitles, buttons } = needs;
            let today = new Date();
            let today2 = new Date();
            today2.setMonth(today2.getMonth() + 2);
            let h = document.createDocumentFragment();
            let list = [
              { name: "year", style: { left: 98, width: 81, }, img: { left: 192 }, },
              { name: "month", style: { left: 225, width: 46, }, img: { left: 282 }, },
              { name: "day", style: { left: 313, width: 46, }, img: { left: 371 }, }
            ];
            let dom, input_clone, div_clone, svg_clone;
            let height, width, ea = "px", style = {};
            function keyupEvent(e) {
              this.value = this.value.replace(/[^0-9\.]/g, '');
            }
            function clickEvent(e) {
              let today = new Date();
              let today2 = new Date();
              today2.setMonth(today2.getMonth() + 2);
              let target;
              let dayList = [
                document.querySelector("#blocks_date_year > input"),
                document.querySelector("#blocks_date_month > input"),
                document.querySelector("#blocks_date_day > input"),
              ]
              if (this.classList.contains("blocks_date_resident")) {
                target = this.querySelector("input");
              } else {
                target = this.parentElement.querySelector("input");
              }
              if (target.checked) {
                target.checked = false;
                target.value = "이사";
                dayList[0].value = String(today2.getFullYear());
                dayList[1].value = "";
                dayList[2].value = "";
                dayList[1].focus();
                dayList[0].parentElement.style.opacity = "";
                dayList[1].parentElement.style.opacity = "";
                dayList[2].parentElement.style.opacity = "";
              } else {
                target.checked = true;
                target.value = "거주중";
                dayList[0].value = String(today.getFullYear());
                dayList[1].value = String(today.getMonth() + 1);
                dayList[2].value = String(today.getDate());
                dayList[0].parentElement.style.opacity = "0.4";
                dayList[1].parentElement.style.opacity = "0.4";
                dayList[2].parentElement.style.opacity = "0.4";
              }
            }

            for (let i = 0; i < list.length; i++) {
              dom = ConsultingJs.inputMaker(true, "blocks_date_" + list[i].name);
              dom.style.top = String(96) + ea;
              dom.style.left = String(list[i].style.left) + ea;
              dom.style.width = String(list[i].style.width) + ea;
              input_clone = dom.children[0];
              input_clone.style.textAlign = "center";
              input_clone.addEventListener("keyup", keyupEvent);
              if (i === 0) {
                input_clone.value = String(today2.getFullYear());
              }
              h.appendChild(dom);

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = subtitles[i].src.desktop;
              svg_clone.classList.add("blocks_date_word");
              height = 18;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                height: String(height) + ea,
                left: String(list[i].img.left) + ea,
                width: String(width) + ea,
                top: String(100) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              h.appendChild(SvgTong.parsing(svg_clone));
            }

            //resident
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("blocks_date_resident");
            div_clone.style.top = "100px";
            div_clone.style.left = "442px";

            input_clone = GeneralJs.nodes.input.cloneNode(true);
            input_clone.classList.add("blocks_date_resident_checkbox");
            input_clone.style.display = "none";
            input_clone.setAttribute("type", "checkbox");
            input_clone.setAttribute("name", "movingdate");
            input_clone.setAttribute("value", "");
            div_clone.appendChild(input_clone);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = buttons[0].src.desktop.off;
            svg_clone.classList.add("blocks_date_resident_off");
            height = 18;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            div_clone.appendChild(SvgTong.parsing(svg_clone));

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = buttons[0].src.desktop.on;
            svg_clone.classList.add("blocks_date_resident_on");
            height = 18;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            div_clone.appendChild(SvgTong.parsing(svg_clone));

            div_clone.addEventListener("click", clickEvent)
            h.appendChild(div_clone);
            return h;
          }
        },
        //계약 형태
        {
          titleStyle: {
            top: 101,
            right: 170,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h = document.createDocumentFragment();
            let div_clone, input_clone, svg_clone;
            let height, width, ea = "px", style = {};
            function clickEvent(e) {
              let target;
              if (this.classList.contains("blocks_contract")) {
                target = this.querySelector("input");
              } else {
                target = this.parentElement.querySelector("input");
              }
              target.checked = true;
            }
            let list = [
              { right: 80, },
              { right: 0, },
            ];

            for (let i = 0; i < buttons.length; i++) {
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("blocks_contract");
              div_clone.style.top = String(100) + ea;
              div_clone.style.right = String(list[i].right) + ea;

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("blocks_date_contract_radio");
              input_clone.style.display = "none";
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "myhomeboo");
              input_clone.setAttribute("value", buttons[i].title);
              if (i === 0) { input_clone.checked = true; }
              div_clone.appendChild(input_clone);

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[i].src.desktop.off;
              svg_clone.classList.add("blocks_contract_off");
              height = 18;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                height: String(height) + ea,
                width: String(width) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[i].src.desktop.on;
              svg_clone.classList.add("blocks_contract_on");
              height = 18;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = {
                height: String(height) + ea,
                width: String(width) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              div_clone.addEventListener("click", clickEvent);
              h.appendChild(div_clone);
            }

            return h;
          }
        },
      ],
      mobile: [
        //평수
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            const { subtitles, notice } = needs;
            let h = document.createDocumentFragment();
            let svg_clone, ea = "vw", style = {};
            let height, width;
            function keyupEvent(e) {
              this.value = this.value.replace(/[^0-9\.]/g, '');
            }
            let dom = ConsultingJs.inputMaker(false, "moblocks_pyeong");
            dom.style.top = "10vw";
            dom.style.left = "28.5vw";
            dom.style.width = "17.4vw";
            let input = dom.children[0];
            input.style.textAlign = "center";
            input.addEventListener("keyup", keyupEvent);
            h.appendChild(dom);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = notice.src.mobile;
            svg_clone.classList.add("moblocks_pyeong_word");
            height = 3.2;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              position: "absolute",
              height: String(height) + ea,
              top: String(11.5) + ea,
              left: String(47.9) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            h.appendChild(SvgTong.parsing(svg_clone));

            return h;
          }
        },
        //입주일
        {
          titleStyle: {
            top: 21.1,
            left: 0,
          },
          callback: function (needs) {
            const { subtitles, buttons } = needs;
            let today = new Date();
            let today2 = new Date();
            today2.setMonth(today2.getMonth() + 2);
            let h = document.createDocumentFragment();
            let list = [
              { name: "year", style: { left: 28.5, width: 17.4, }, img: { left: 48, }, },
              { name: "month", style: { left: 54.2, width: 10, }, img: { left: 66.3, }, },
              { name: "day", style: { left: 72.2, width: 10, }, img: { left: 84.2, }, }
            ];
            let dom, input_clone, div_clone, svg_clone;
            let height, width, ea = "vw", style = {};
            function keyupEvent(e) {
              this.value = this.value.replace(/[^0-9\.]/g, '');
            }
            function clickEvent(e) {
              let today = new Date();
              let today2 = new Date();
              today2.setMonth(today2.getMonth() + 2);
              let target;
              let dayList = [
                document.querySelector("#moblocks_date_year > input"),
                document.querySelector("#moblocks_date_month > input"),
                document.querySelector("#moblocks_date_day > input"),
              ]
              if (this.classList.contains("moblocks_date_resident")) {
                target = this.querySelector("input");
              } else {
                target = this.parentElement.querySelector("input");
              }
              if (target.checked) {
                target.checked = false;
                target.value = "이사";
                dayList[0].value = String(today2.getFullYear());
                dayList[1].value = "";
                dayList[2].value = "";
                dayList[1].focus();
                dayList[0].parentElement.style.opacity = "";
                dayList[1].parentElement.style.opacity = "";
                dayList[2].parentElement.style.opacity = "";
              } else {
                target.checked = true;
                target.value = "거주중";
                dayList[0].value = String(today.getFullYear());
                dayList[1].value = String(today.getMonth() + 1);
                dayList[2].value = String(today.getDate());
                dayList[0].parentElement.style.opacity = "0.4";
                dayList[1].parentElement.style.opacity = "0.4";
                dayList[2].parentElement.style.opacity = "0.4";
              }
            }

            for (let i = 0; i < list.length; i++) {
              dom = ConsultingJs.inputMaker(false, "moblocks_date_" + list[i].name);
              dom.style.top = String(19.6) + ea;
              dom.style.left = String(list[i].style.left) + ea;
              dom.style.width = String(list[i].style.width) + ea;
              input_clone = dom.children[0];
              input_clone.style.textAlign = "center";
              input_clone.addEventListener("keyup", keyupEvent);
              if (i === 0) {
                input_clone.value = String(today2.getFullYear());
              }
              h.appendChild(dom);

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = subtitles[i].src.mobile;
              svg_clone.classList.add("moblocks_date_word");
              height = 3.8;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 0.1;
              style = {
                height: String(height) + ea,
                left: String(list[i].img.left) + ea,
                width: String(width) + ea,
                top: String(20.7) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              h.appendChild(SvgTong.parsing(svg_clone));
            }

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("moblocks_date_resident");
            div_clone.style.top = "30.9vw";
            div_clone.style.left = "28.4vw";

            input_clone = GeneralJs.nodes.input.cloneNode(true);
            input_clone.classList.add("moblocks_date_resident_checkbox");
            input_clone.style.display = "none";
            input_clone.setAttribute("type", "checkbox");
            input_clone.setAttribute("name", "momovingdate");
            input_clone.setAttribute("value", "");
            div_clone.appendChild(input_clone);

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = buttons[0].src.mobile.off;
            svg_clone.classList.add("moblocks_date_resident_off");
            height = 3.9;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 1;
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            div_clone.appendChild(SvgTong.parsing(svg_clone));

            svg_clone = SvgTong.tongMaker();
            svg_clone.src = buttons[0].src.mobile.on;
            svg_clone.classList.add("moblocks_date_resident_on");
            height = 3.9;
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 1;
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            div_clone.appendChild(SvgTong.parsing(svg_clone));

            div_clone.addEventListener("click", clickEvent)
            h.appendChild(div_clone);
            return h;
          }
        },
        //계약 형태
        {
          titleStyle: {
            top: 38.8,
            left: 0,
          },
          callback: function (needs) {
            const { buttons } = needs;
            let h = document.createDocumentFragment();
            let div_clone, input_clone, svg_clone;
            let height, width, ea = "vw", style = {};
            function clickEvent(e) {
              let target;
              if (this.classList.contains("moblocks_contract")) {
                target = this.querySelector("input");
              } else {
                target = this.parentElement.querySelector("input");
              }
              target.checked = true;
            }

            let left = [ 28.4, 43 ];
            for (let i = 0; i < buttons.length; i++) {
              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("moblocks_contract");
              div_clone.style.top = String(38.7) + ea;
              div_clone.style.left = String(left[i]) + ea;

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("moblocks_date_contract_radio");
              input_clone.style.display = "none";
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "momyhomeboo");
              input_clone.setAttribute("value", buttons[i].value);
              if (i === 0) { input_clone.checked = true; }
              div_clone.appendChild(input_clone);

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[i].src.mobile.off;
              svg_clone.classList.add("moblocks_contract_off");
              height = 3.9;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 1;
              style = {
                height: String(height) + ea,
                width: String(width) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              svg_clone = SvgTong.tongMaker();
              svg_clone.src = buttons[i].src.mobile.on;
              svg_clone.classList.add("moblocks_contract_on");
              height = 3.9;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 1;
              style = {
                height: String(height) + ea,
                width: String(width) + ea,
              };
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              div_clone.appendChild(SvgTong.parsing(svg_clone));

              div_clone.addEventListener("click", clickEvent);
              h.appendChild(div_clone);
            }
            return h;
          }
        },
      ],
    },
    {
      name: "space",
      height: { desktop: 197, mobile: 60, },
      desktop: [
        //공간 상태
        {
          titleStyle: {
            top: 57,
            left: 0,
          },
          callback: function (needs) {
            const { subtitles, buttons } = needs;
            let subCallbacks = [
              //방 개수
              {
                style: {
                  top: "57px",
                  left: "124px",
                },
                boxStyle: {
                  top: "48px",
                  marginLeft: "213px",
                  width: "150px"
                },
                callback: function (style, clickEvent) {
                  let div_clone, svg_clone, input_clone;
                  let height, width, ea = "px";
                  let dom = GeneralJs.nodes.div.cloneNode(true);
                  let arrowWidth, arrowHeight;

                  dom.className = "blocks_space_box";
                  for (let i in style) {
                    dom.style[i] = style[i];
                  }
                  let list = [
                    { off: buttons[0].src.desktop.off, on: buttons[0].src.desktop.on, left: 0, value: "방 1개", },
                    { off: buttons[1].src.desktop.off, on: buttons[1].src.desktop.on, left: 33, value: "방 2개", },
                    { off: buttons[2].src.desktop.off, on: buttons[2].src.desktop.on, left: 67, value: "방 3개", },
                    { off: buttons[4].src.desktop.off, on: buttons[4].src.desktop.on, left: 100, value: "방 4개 이상", },
                  ];
                  let onoff = [ "off", "on" ];

                  //arrow
                  arrowWidth = 7;
                  arrowHeight = GeneralJs.parseRatio({ source: instance.map.sub.etc.arrow[0].src, target: arrowWidth, method: "width", result: "number" });

                  svg_clone = SvgTong.tongMaker();
                  svg_clone.classList.add("blocks_space_box_arrow");
                  svg_clone.src = instance.map.sub.etc.arrow[0].src;
                  svg_clone.style.transform = "translateX(5.2px)";
                  svg_clone.style.width = String(arrowWidth) + ea;
                  svg_clone.style.height = String(arrowHeight) + ea;
                  dom.appendChild(SvgTong.parsing(svg_clone));

                  for (let i = 0; i < list.length; i++) {
                    div_clone = GeneralJs.nodes.div.cloneNode(true);
                    div_clone.classList.add("blocks_space_box_div");
                    input_clone = GeneralJs.nodes.input.cloneNode(true);
                    input_clone.classList.add("blocks_space_box_input");
                    input_clone.classList.add("blocks_space_rooms_input");
                    input_clone.style.display = "none";
                    input_clone.setAttribute("type", "radio");
                    input_clone.setAttribute("name", "room");
                    input_clone.setAttribute("value", list[i].value);
                    if (i === 0) { input_clone.checked = true; }
                    div_clone.appendChild(input_clone);
                    for (let j = 0; j < onoff.length; j++) {
                      height = 14;
                      svg_clone = SvgTong.tongMaker();
                      svg_clone.classList.add("blocks_space_box_img");
                      svg_clone.classList.add("blocks_space_box_img_" + onoff[j]);
                      svg_clone.src = list[i][onoff[j]];
                      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                      svg_clone.style.left = String(list[i]["left"]) + ea;
                      svg_clone.style.height = String(height) + ea;
                      svg_clone.style.width = String(width) + ea;
                      div_clone.appendChild(SvgTong.parsing(svg_clone));
                    }
                    div_clone.addEventListener("click", clickEvent([ "5","39","73","120" ], 0, i));
                    dom.appendChild(div_clone);
                  }
                  return dom;
                },
              },
              //화장실 개수
              {
                style: {
                  top: "57px",
                  right: "379px",
                },
                boxStyle: {
                  top: "48px",
                  marginLeft: "175px",
                  width: "160px"
                },
                callback: function (style, clickEvent) {
                  let div_clone, svg_clone, input_clone;
                  let height, width, ea = "px";
                  let arrowWidth, arrowHeight;

                  let dom = GeneralJs.nodes.div.cloneNode(true);
                  dom.className = "blocks_space_box";
                  for (let i in style) {
                    dom.style[i] = style[i];
                  }
                  let list = [
                    { off: buttons[0].src.desktop.off, on: buttons[0].src.desktop.on, left: 0, value: "화장실 1개", },
                    { off: buttons[1].src.desktop.off, on: buttons[1].src.desktop.on, left: 33, value: "화장실 2개", },
                    { off: buttons[3].src.desktop.off, on: buttons[3].src.desktop.on, left: 67, value: "화장실 3개 이상", },
                  ];
                  let onoff = [ "off", "on" ];

                  //arrow
                  arrowWidth = 7;
                  arrowHeight = GeneralJs.parseRatio({ source: instance.map.sub.etc.arrow[0].src, target: arrowWidth, method: "width", result: "number" });

                  svg_clone = SvgTong.tongMaker();
                  svg_clone.classList.add("blocks_space_box_arrow");
                  svg_clone.src = instance.map.sub.etc.arrow[0].src;

                  svg_clone.style.width = String(arrowWidth) + ea;
                  svg_clone.style.height = String(arrowHeight) + ea;

                  svg_clone.style.transform = "translateX(5.2px)";
                  dom.appendChild(SvgTong.parsing(svg_clone));

                  for (let i = 0; i < list.length; i++) {
                    div_clone = GeneralJs.nodes.div.cloneNode(true);
                    div_clone.classList.add("blocks_space_box_div");
                    input_clone = GeneralJs.nodes.input.cloneNode(true);
                    input_clone.classList.add("blocks_space_box_input");
                    input_clone.classList.add("blocks_space_bathes_input");
                    input_clone.style.display = "none";
                    input_clone.setAttribute("type", "radio");
                    input_clone.setAttribute("name", "bath");
                    input_clone.setAttribute("value", list[i].value);
                    if (i === 0) { input_clone.checked = true; }
                    div_clone.appendChild(input_clone);
                    for (let j = 0; j < onoff.length; j++) {
                      height = 14;
                      svg_clone = SvgTong.tongMaker();
                      svg_clone.classList.add("blocks_space_box_img");
                      svg_clone.classList.add("blocks_space_box_img_" + onoff[j]);
                      svg_clone.src = list[i][onoff[j]];
                      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                      svg_clone.style.left = String(list[i]["left"]) + ea;
                      svg_clone.style.height = String(height) + ea;
                      svg_clone.style.width = String(width) + ea;
                      div_clone.appendChild(SvgTong.parsing(svg_clone));
                    }
                    div_clone.addEventListener("click", clickEvent([ "5","39","87" ], 1, i));
                    dom.appendChild(div_clone);
                  }
                  return dom;
                },
              },
              //발코니 확장
              {
                style: {
                  top: "57px",
                  right: "128px",
                },
                boxStyle: {
                  top: "48px",
                  marginLeft: "86px",
                  width: "94px"
                },
                callback: function (style, clickEvent) {
                  let div_clone, svg_clone, input_clone;
                  let height, width, ea = "px";
                  let arrowWidth, arrowHeight;

                  let dom = GeneralJs.nodes.div.cloneNode(true);
                  dom.className = "blocks_space_box";
                  for (let i in style) {
                    dom.style[i] = style[i];
                  }
                  let list = [
                    { off: buttons[6].src.desktop.off, on: buttons[6].src.desktop.on, left: 0, value: "발코니 확장 없음", },
                    { off: buttons[5].src.desktop.off, on: buttons[5].src.desktop.on, left: 68, value: "발코니 확장", },
                  ];
                  let onoff = [ "off", "on" ];

                  //arrow
                  arrowWidth = 7;
                  arrowHeight = GeneralJs.parseRatio({ source: instance.map.sub.etc.arrow[0].src, target: arrowWidth, method: "width", result: "number" });

                  svg_clone = SvgTong.tongMaker();
                  svg_clone.classList.add("blocks_space_box_arrow");
                  svg_clone.src = instance.map.sub.etc.arrow[0].src;
                  svg_clone.style.width = String(arrowWidth) + ea;
                  svg_clone.style.height = String(arrowHeight) + ea;

                  svg_clone.style.transform = "translateX(23px)";
                  dom.appendChild(SvgTong.parsing(svg_clone));

                  for (let i = 0; i < list.length; i++) {
                    div_clone = GeneralJs.nodes.div.cloneNode(true);
                    div_clone.classList.add("blocks_space_box_div");
                    input_clone = GeneralJs.nodes.input.cloneNode(true);
                    input_clone.classList.add("blocks_space_box_input");
                    input_clone.classList.add("blocks_space_baconies_input");
                    input_clone.style.display = "none";
                    input_clone.setAttribute("type", "radio");
                    input_clone.setAttribute("name", "balcony");
                    input_clone.setAttribute("value", list[i].value);
                    if (i === 0) { input_clone.checked = true; }
                    div_clone.appendChild(input_clone);
                    for (let j = 0; j < onoff.length; j++) {
                      height = 14;
                      svg_clone = SvgTong.tongMaker();
                      svg_clone.classList.add("blocks_space_box_img");
                      svg_clone.classList.add("blocks_space_box_img_" + onoff[j]);
                      svg_clone.src = list[i][onoff[j]];
                      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                      svg_clone.style.left = String(list[i]["left"]) + ea;
                      svg_clone.style.height = String(height) + ea;
                      svg_clone.style.width = String(width) + ea;
                      div_clone.appendChild(SvgTong.parsing(svg_clone));
                    }
                    div_clone.addEventListener("click", clickEvent([ "23","77" ], 2, i));
                    dom.appendChild(div_clone);
                  }
                  return dom;
                },
              },
            ];

            let h = document.createDocumentFragment();
            let div_clone, temp, svg_clone;
            let height, width, ea = "px", style = {};
            let bar = [ "left:191px;", "right:361px;", "right:110px;" ];
            function clickEvent(list, s, m) {
              return function (e) {
                if (this.classList.contains("blocks_space_box_div")) {
                  this.querySelector("input").checked = true;
                } else {
                  this.parentElement.querySelector("input").checked = true;
                }
                document.querySelectorAll(".blocks_space_box_arrow")[s].style.transform = "translateX(" + list[m] + "px)";
              }
            }

            for (let i = 0; i < subtitles.length; i++) {
              height = 17;
              svg_clone = SvgTong.tongMaker();
              svg_clone.classList.add("blocks_space");
              svg_clone.src = subtitles[i].src.desktop;
              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              style = subCallbacks[i].style;
              style.height = String(height) + ea;
              style.width = String(width) + ea;
              for (let i in style) {
                svg_clone.style[i] = style[i];
              }
              h.appendChild(SvgTong.parsing(svg_clone));

              div_clone = GeneralJs.nodes.div.cloneNode(true);
              div_clone.classList.add("blocks_space_bar");
              div_clone.style.cssText = "top:58px;" + bar[i];
              h.appendChild(div_clone);

              temp = subCallbacks[i].callback(subCallbacks[i].boxStyle, clickEvent);
              h.appendChild(temp);
            }
            return h;
          }
        },
        //요청 사항
        {
          titleStyle: {
            top: 101,
            left: 0,
          },
          needs: {},
          //요청 사항 input
          callback: function (needs) {
            let dom = GeneralJs.nodes.div.cloneNode(true);
            dom.classList.add("blocks_etc");
            let placeholderText = "선호 스타일 + 공간의 특이 사항을 적어주세요!\n(예) 모던 프렌치 + 코지한 홈스타일링을 원해요.\n(예) 펜트리가 있어요. / 복층 공간입니다.";
            let textarea_clone = GeneralJs.nodes.textarea.cloneNode(true);
            textarea_clone.classList.add("blocks_etc_textarea");
            textarea_clone.setAttribute("placeholder", placeholderText);
            dom.appendChild(textarea_clone);
            return dom;
          }
        },
      ],
      mobile: [
        //방 개수
        {
          titleStyle: {
            top: 11.5,
            left: 0,
          },
          callback: function (needs) {
            const { buttons, subtitles, mother } = needs;

            needs.mother.style.display = "none";

            let h = document.createDocumentFragment();
            let i, j;
            let div_clone, div_clone2, div_clone3, input_clone;
            let svg_clone, height, width, ea = "vw";
            let list;
            const onoff = [ "off", "on" ];
            const clickEvent = function (e) {
              if (this.classList.contains("moblocks_space_box")) {
                this.querySelector("input").checked = true;
              } else {
                this.parentElement.querySelector("input").checked = true;
              }
            }

            height = 4.1;
            let subtitleStyle = [
              { top: 11.5, left: 0 },
              { top: 21.4, left: 0 },
              { top: 31.3, left: 0 },
            ]
            for (let i = 0; i < subtitles.length; i++) {
              svg_clone = SvgTong.tongMaker();
              svg_clone.src = subtitles[i].src.mobile;

              width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
              svg_clone.style.position = "absolute";
              svg_clone.style.height = String(height) + ea;
              svg_clone.style.width = String(width) + ea;
              for (let k in subtitleStyle[i]) {
                svg_clone.style[k] = String(subtitleStyle[i][k]) + ea;
              }
              needs.grandMother.insertBefore(SvgTong.parsing(svg_clone), needs.mother.nextSibling);
            }

            list = [
              { off: buttons[0].src.mobile.off, on: buttons[0].src.mobile.on, width: 12.4, left: 0, value: "방 1개", },
              { off: buttons[1].src.mobile.off, on: buttons[1].src.mobile.on, width: 12.4, left: 12.4, value: "방 2개", },
              { off: buttons[2].src.mobile.off, on: buttons[2].src.mobile.on, width: 12.4, left: 24.8, value: "방 3개", },
              { off: buttons[4].src.mobile.off, on: buttons[4].src.mobile.on, width: 22.1, left: 37.2, value: "방 4개 이상", }
            ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("moblocks_space_total");
            div_clone.style.top = "10vw";
            div_clone.style.width = "59.3vw";
            for (i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("moblocks_space_box");
              div_clone2.style.width = String(list[i].width) + ea;
              div_clone2.style.left = String(list[i].left) + ea;
              if (i !== list.length - 1) {
                div_clone2.style.borderRight = "1px solid #ececec";
              }
              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("moblocks_space_box_input");
              input_clone.classList.add("moblocks_space_rooms_input");
              input_clone.style.display = "none";
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "moroom");
              input_clone.setAttribute("value", list[i].value);
              if (i === 0) { input_clone.checked = true; }
              div_clone2.appendChild(input_clone);

              for (j = 0; j < onoff.length; j++) {
                div_clone3 = GeneralJs.nodes.div.cloneNode(true);
                div_clone3.classList.add("moblocks_space");
                div_clone3.classList.add("moblocks_space_" + onoff[j]);
                height = 3;
                svg_clone = SvgTong.tongMaker();
                svg_clone.src = list[i][onoff[j]];
                width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 1;
                svg_clone.style.height = String(height) + ea;
                svg_clone.style.width = String(width) + ea;
                svg_clone.style.position = "absolute";
                svg_clone.style.top = "calc(49% - " + String(height / 2) + ea + ")";
                svg_clone.style.left = "calc(49% - " + String(width / 2) + ea + ")";
                div_clone3.appendChild(SvgTong.parsing(svg_clone));
                div_clone2.appendChild(div_clone3);
              }

              div_clone2.addEventListener("click", clickEvent);
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);

            // --------------------------------------------------------------------------------------------------------------

            list = [
              { off: buttons[0].src.mobile.off, on: buttons[0].src.mobile.on, width: 12.4, left: 0, value: "화장실 1개", },
              { off: buttons[1].src.mobile.off, on: buttons[1].src.mobile.on, width: 12.4, left: 12.4, value: "화장실 2개", },
              { off: buttons[3].src.mobile.off, on: buttons[3].src.mobile.on, width: 22.1, left: 24.8, value: "화장실 3개 이상", },
            ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("moblocks_space_total");
            div_clone.style.top = "19.8vw";
            div_clone.style.width = "46.9vw";
            for (i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("moblocks_space_box");
              div_clone2.style.width = String(list[i].width) + ea;
              div_clone2.style.left = String(list[i].left) + ea;
              if (i !== list.length - 1) {
                div_clone2.style.borderRight = "1px solid #ececec";
              }
              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("moblocks_space_box_input");
              input_clone.classList.add("moblocks_space_bathes_input");
              input_clone.style.display = "none";
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "mobath");
              input_clone.setAttribute("value", list[i].value);
              if (i === 0) { input_clone.checked = true; }
              div_clone2.appendChild(input_clone);

              for (j = 0; j < onoff.length; j++) {
                div_clone3 = GeneralJs.nodes.div.cloneNode(true);
                div_clone3.classList.add("moblocks_space");
                div_clone3.classList.add("moblocks_space_" + onoff[j]);
                height = 3;
                svg_clone = SvgTong.tongMaker();
                svg_clone.src = list[i][onoff[j]];
                width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 1;
                svg_clone.style.height = String(height) + ea;
                svg_clone.style.width = String(width) + ea;
                svg_clone.style.position = "absolute";
                svg_clone.style.top = "calc(49% - " + String(height / 2) + ea + ")";
                svg_clone.style.left = "calc(49% - " + String(width / 2) + ea + ")";
                div_clone3.appendChild(SvgTong.parsing(svg_clone));
                div_clone2.appendChild(div_clone3);
              }
              div_clone2.addEventListener("click", clickEvent);
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);

            // --------------------------------------------------------------------------------------------------------------

            list = [
              { off: buttons[6].src.mobile.off, on: buttons[6].src.mobile.on, width: 24.8, left: 0, value: "발코니 확장 없음", },
              { off: buttons[5].src.mobile.off, on: buttons[5].src.mobile.on, width: 22.1, left: 24.8, value: "발코니 확장", },
            ];

            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add("moblocks_space_total");
            div_clone.style.top = "29.5vw";
            div_clone.style.width = "46.9vw";
            for (i = 0; i < list.length; i++) {
              div_clone2 = GeneralJs.nodes.div.cloneNode(true);
              div_clone2.classList.add("moblocks_space_box");
              div_clone2.style.width = String(list[i].width) + ea;
              div_clone2.style.left = String(list[i].left) + ea;
              if (i !== list.length - 1) {
                div_clone2.style.borderRight = "1px solid #ececec";
              }
              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("moblocks_space_box_input");
              input_clone.classList.add("moblocks_space_baconies_input");
              input_clone.style.display = "none";
              input_clone.setAttribute("type", "radio");
              input_clone.setAttribute("name", "mobalcony");
              input_clone.setAttribute("value", list[i].value);
              if (i === 0) { input_clone.checked = true; }
              div_clone2.appendChild(input_clone);

              for (j = 0; j < onoff.length; j++) {
                div_clone3 = GeneralJs.nodes.div.cloneNode(true);
                div_clone3.classList.add("moblocks_space");
                div_clone3.classList.add("moblocks_space_" + onoff[j]);
                height = 3;
                svg_clone = SvgTong.tongMaker();
                svg_clone.src = list[i][onoff[j]];
                width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                svg_clone.style.height = String(height) + ea;
                svg_clone.style.width = String(width) + ea;
                svg_clone.style.position = "absolute";
                svg_clone.style.top = "calc(49% - " + String(height / 2) + ea + ")";
                svg_clone.style.left = "calc(49% - " + String(width / 2) + ea + ")";
                div_clone3.appendChild(SvgTong.parsing(svg_clone));
                div_clone2.appendChild(div_clone3);
              }
              div_clone2.addEventListener("click", clickEvent);
              div_clone.appendChild(div_clone2);
            }
            h.appendChild(div_clone);

            return h;
          }
        },
        //요청 사항
        {
          titleStyle: {
            top: 40.5,
            left: 0,
          },
          callback: function (needs) {
            let dom = GeneralJs.nodes.div.cloneNode(true);
            dom.classList.add("moblocks_etc");
            let placeholderText = "선호 스타일 + 공간의 특이 사항을 적어주세요!\n(예) 모던 프렌치 + 코지한 홈스타일링을 원해요.\n(예) 펜트리가 있어요. / 복층 공간입니다.";
            let textarea_clone = GeneralJs.nodes.textarea.cloneNode(true);
            textarea_clone.classList.add("moblocks_etc_textarea");
            textarea_clone.setAttribute("placeholder", placeholderText);
            dom.appendChild(textarea_clone);
            return dom;
          }
        },
      ],
    },
  ];
}

ConsultingJs.prototype.serveyBox = function (boo) {
  const { sub: { survey } } = this.map;
  let dom, div_clone, div_clone2, div_img, input_clone;
  let svg_clone, height, width, ea, style = {};
  ea = (boo === "desktop") ? "px" : "vw";

  let list = [
    { style: { mobile: { top: "0.85vw", left: "11.2vw" } } },
    { style: { mobile: { top: "0.85vw", left: "35.8vw" } } },
    { style: { mobile: { top: "0.85vw", left: "57.8vw" } } },
    { style: { mobile: { top: "6.15vw", left: "11.2vw" } } },
    { style: { mobile: { top: "6.15vw", left: "35.8vw" } } },
    { style: { mobile: { top: "6.15vw", left: "57.8vw" } } },
  ];
  for (let i = 0; i < list.length; i++) {
    list[i].value = survey.children[0].buttons[i].title;
  }

  let onoff = [ "off", "on" ];
  let mo = (boo === "desktop") ? "" : "mo";
  const clickEvent = function (e) {
    if (this.classList.contains(mo + "below_servey_detail_box")) {
      this.querySelector("input").checked = true;
    } else {
      this.parentElement.querySelector("input").checked = true;
    }
  }

  dom = GeneralJs.nodes.div.cloneNode(true);
  dom.classList.add(mo + "below_box");
  dom.classList.add(mo + "below_servey");
  dom.style.height = (boo === "desktop") ? "138px" : "33.3vw";

  height = (boo === "desktop") ? 18 : 4.15;
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = survey.src[boo];
  svg_clone.classList.add(mo + "below_servey_title");
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    height: String(height) + ea,
    width: String(width) + ea,
    background: "#ffffff",
    paddingRight: String((boo === "desktop") ? 7 : 2) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  dom.appendChild(SvgTong.parsing(svg_clone));

  //details
  if (boo === "desktop") {

    //question
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("below_servey_question");
    height = 17.2;
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = survey.children[0].src[boo];
    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
    style = {
      position: "absolute",
      height: String(height) + ea,
      width: String(width) + ea,
      left: "50%",
      marginLeft: '-' + String(width / 2) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    div_clone.appendChild(SvgTong.parsing(svg_clone));
    dom.appendChild(div_clone);

    //detail
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("below_servey_details");
    for (let i = 0; i < list.length; i++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("below_servey_detail_box");
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("below_servey_detail_input");
      input_clone.style.display = "none";
      input_clone.setAttribute("type", "radio");
      input_clone.setAttribute("name", "wayto");
      input_clone.setAttribute("value", list[i].value);
      if (i === 0) { input_clone.checked = true; }
      div_clone2.appendChild(input_clone);
      for (let j = 0; j < onoff.length; j++) {
        height = 14;
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = survey.children[0].buttons[i].src[boo][onoff[j]];
        width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
        style = {
          height: String(height) + ea,
          width: String(width) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        svg_clone.classList.add("below_servey_detail");
        svg_clone.classList.add("below_servey_detail_" + onoff[j]);
        if (i === list.length - 1) { svg_clone.style.marginRight = "0" + ea; }
        div_clone2.appendChild(SvgTong.parsing(svg_clone));
      }
      div_clone2.addEventListener("click", clickEvent);
      div_clone.appendChild(div_clone2);
    }
  } else {

    //question
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("mobelow_servey_question");
    height = 3.6;
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = survey.children[0].src[boo];
    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 0.5;
    style = {
      position: "absolute",
      height: String(height) + ea,
      width: String(width) + ea,
      left: "50%",
      marginLeft: '-' + String(width / 2) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    div_clone.appendChild(SvgTong.parsing(svg_clone));
    dom.appendChild(div_clone);

    //detail
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("mobelow_servey_details");
    for (let i = 0; i < list.length; i++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("mobelow_servey_detail_box");
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("mobelow_servey_detail_input");
      input_clone.style.display = "none";
      input_clone.setAttribute("type", "radio");
      input_clone.setAttribute("name", "mowayto");
      input_clone.setAttribute("value", list[i].value);
      if (i === 0) { input_clone.checked = true; }
      div_clone2.appendChild(input_clone);
      for (let j = 0; j < onoff.length; j++) {
        height = 3.3;
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = survey.children[0].buttons[i].src[boo][onoff[j]];
        width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) + 0.5;
        style = {
          height: String(height) + ea,
          width: String(width) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        svg_clone.classList.add("mobelow_servey_detail_factors");
        svg_clone.classList.add("mobelow_servey_detail_" + onoff[j]);
        if (i === list.length - 1) { svg_clone.style.marginRight = "0" + ea; }
        div_clone2.appendChild(SvgTong.parsing(svg_clone));
      }
      div_clone2.style.top = list[i].style.mobile.top;
      div_clone2.style.left = list[i].style.mobile.left;

      div_clone2.addEventListener("click", clickEvent);
      div_clone.appendChild(div_clone2);
    }
  }
  dom.appendChild(div_clone);
  dom.style.textAlign = "center";
  return dom;
}

ConsultingJs.prototype.belowSubmit = function () {
  const instance = this;
  const { sub: { terms, submit } } = this.map;
  let i, j, div_clone, temp, dom, mo;
  let list = {
    desktop: [
      {
        name: "description",
        style: "height:122px;padding-top:16px;background:#f2f2f2;",
        callback: function () {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("below_box_policy");
          div_clone.insertAdjacentHTML("beforeend", ConsultingJs.policy());
          return div_clone;
        }
      },
      {
        name: "check",
        style: "height:32px;",
        callback: function () {
          let h, div_clone, img_clone, input_clone;
          let svg_clone, height, width, ea = "px", style = {};

          h = document.createDocumentFragment();
          let list = [ "off", "on", ];
          let clickEvent = function (e) {
            let target;
            if (this.classList.contains("below_box_checkbox_div")) {
              target = this.querySelector("input");
            } else {
              target = this.parentElement.querySelector("input");
            }
            if (target.checked) {
              target.checked = false;
            } else {
              target.checked = true;
            }
          }
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("below_box_checkbox_div");
          input_clone = GeneralJs.nodes.input.cloneNode(true);
          input_clone.classList.add("below_box_checkbox_input");
          input_clone.style.display = "none";
          input_clone.setAttribute("type", "checkbox");
          input_clone.setAttribute("name", "description");
          input_clone.checked = true;
          div_clone.appendChild(input_clone);

          for (let i = 0; i < list.length; i++) {
            height = 15;
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = terms.src.desktop[list[i]];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_clone.classList.add("below_box_checkbox");
            svg_clone.classList.add("below_box_checkbox_" + list[i]);
            div_clone.appendChild(SvgTong.parsing(svg_clone));
          }

          div_clone.addEventListener("click", clickEvent);
          h.appendChild(div_clone);
          return h;
        }
      },
      {
        name: "submit",
        style: "height:60px;",
        callback: function () {
          let div_clone, svg_clone;
          let height, width, ea = "px", style = {};

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("below_box_submit_box");
          height = 22;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = submit[0].src.desktop;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            height: String(height) + ea,
            width: String(width) + ea,
            left: "50%",
            marginLeft: String((-1 * (width / 2)) - 1.5) + ea,
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          svg_clone.classList.add("below_box_submit");
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          return div_clone;
        }
      },
    ],
    mobile: [
      {
        name: "description",
        style: "height:30.9vw;padding-top:3.8vw;background:#f2f2f2;",
        callback: function () {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("mobelow_box_policy");
          div_clone.insertAdjacentHTML("beforeend", ConsultingJs.policy());
          return div_clone;
        }
      },
      {
        name: "check",
        style: "height:32px;",
        callback: function () {
          let h, div_clone, img_clone, input_clone;
          let svg_clone, height, width, ea = "vw", style = {};
          let list = [ "off", "on", ];
          h = document.createDocumentFragment();
          function clickEvent(e) {
            let target;
            if (this.classList.contains("mobelow_box_checkbox_div")) {
              target = this.querySelector("input");
            } else {
              target = this.parentElement.querySelector("input");
            }
            if (target.checked) {
              target.checked = false;
            } else {
              target.checked = true;
            }
          }

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("mobelow_box_checkbox_div");
          input_clone = GeneralJs.nodes.input.cloneNode(true);
          input_clone.classList.add("mobelow_box_checkbox_input");
          input_clone.style.display = "none";
          input_clone.setAttribute("type", "checkbox");
          input_clone.setAttribute("name", "modescription");
          input_clone.checked = true;
          div_clone.appendChild(input_clone);
          for (let i = 0; i < list.length; i++) {
            height = 3.2;
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = terms.src.desktop[list[i]];
            width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
            style = {
              height: String(height) + ea,
              width: String(width) + ea,
            };
            for (let i in style) {
              svg_clone.style[i] = style[i];
            }
            svg_clone.classList.add("mobelow_box_checkbox");
            svg_clone.classList.add("mobelow_box_checkbox_" + list[i]);
            div_clone.appendChild(SvgTong.parsing(svg_clone));
          }
          div_clone.addEventListener("click", clickEvent);
          h.appendChild(div_clone);
          return h;
        }
      },
      {
        name: "submit",
        style: "height:12vw;",
        callback: function () {
          let div_clone, svg_clone;
          let height, width, ea = "vw", style = {};

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("mobelow_box_submit_box");
          height = 4.3;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = submit[0].src.desktop;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            height: String(height) + ea,
            width: String(width) + ea,
            left: "50%",
            marginLeft: String((-1 * (width / 2)) - 0.4) + ea,
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          svg_clone.classList.add("mobelow_box_submit");
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          return div_clone;
        }
      },
    ],
  }
  let boo = Object.keys(list);
  let styles = {
    desktop: { height: "430px", paddingTop: "8px", },
    mobile: { height: "99vw", paddingTop: "1.5vw", },
  }

  for (i = 0; i < boo.length; i++) {
    mo = (boo[i] === "desktop") ? "" : "mo";
    dom = GeneralJs.nodes.div.cloneNode(true);
    dom.id = mo + "consulting_submit";
    dom.classList.add(mo + "consultingblock");
    dom.style.height = styles[boo[i]].height;
    dom.style.paddingTop = styles[boo[i]].paddingTop;
    dom.appendChild(this.serveyBox(boo[i]));
    for (j = 0; j < list[boo[i]].length; j++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add(mo + "below_box");
      div_clone.id = mo + "below_" + list[boo[i]][j].name;
      div_clone.style.cssText = list[boo[i]][j].style;
      temp = list[boo[i]][j].callback();
      if (j === list[boo[i]].length - 1) {
        temp.addEventListener("click", this.submitEvent(boo[i]));
      }
      div_clone.appendChild(temp);
      dom.appendChild(div_clone);
    }
    this.below[boo[i]] = dom;
  }
}

ConsultingJs.prototype.baseMaker = function () {
  let i, j, k, z, temp, div_clone, div_clone2, div_clone4, img_clone;
  let temp_string = '';
  let positions = [ "left", "right" ];
  let flatform = [ "desktop", "mobile" ];
  let mother = document.getElementById("consultingbox");
  let father = document.getElementById("moconsultingbox");

  let svg_clone;
  let style = {}, options = {};
  let height, width, ea;
  let mobileBoo;

  const blocks = this.returnBlocks();

  for (z = 0; z < flatform.length; z++) {
    ea = (flatform[z] === "desktop") ? "px" : "vw";
    for (i = 0; i < blocks.length; i++) {

      //total box
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      temp_string = (flatform[z] === "desktop" ? "" : "mo") + "consultingblock";
      div_clone.classList.add(temp_string);
      div_clone.id = (flatform[z] === "desktop" ? "" : "mo") + "consulting_" + blocks[i].name;
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
      temp_string = (flatform[z] === "desktop" ? "" : "mo") + "consultingblock_titlegray";
      div_clone2.classList.add(temp_string);
      div_clone2.style.left = String(width + (flatform[z] === "desktop" ? 12 : 3)) + ea;
      div_clone2.style.width = "calc(100% - " + String(width + (flatform[z] === "desktop" ? 12 : 3)) + ea + ")";

      div_clone.appendChild(div_clone2);
      div_clone.appendChild(SvgTong.parsing(svg_clone));

      //desktop
      if (flatform[z] === "desktop") {

        temp = document.createDocumentFragment();
        for (j = 0; j < blocks[i].desktop.length; j++) {
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = this.map.main[i].children[j].src.desktop;

          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          svg_clone.style.position = "absolute";
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          for (k in blocks[i].desktop[j].titleStyle) {
            svg_clone.style[k] = String(blocks[i].desktop[j].titleStyle[k]) + ea;
          }
          temp.appendChild(SvgTong.parsing(svg_clone));

          options = {};
          if (this.map.main[i].children[j].buttons !== undefined) {
            options.buttons = this.map.main[i].children[j].buttons;
          }
          if (this.map.main[i].children[j].subtitles !== undefined) {
            options.subtitles = this.map.main[i].children[j].subtitles;
          }
          if (this.map.main[i].children[j].notice !== undefined) {
            options.notice = this.map.main[i].children[j].notice;
          }
          if (this.map.main[i].children[j].popup !== undefined) {
            options.popup = this.map.main[i].children[j].popup;
          }

          temp.appendChild(blocks[i].desktop[j].callback(options));
        }
        div_clone.appendChild(temp);

        mother.appendChild(div_clone);

      //mobile
      } else {

        temp = document.createDocumentFragment();
        for (j = 0; j < blocks[i].mobile.length; j++) {
          mobileBoo = false;

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = this.map.main[i].children[j].src.mobile;

          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" }) - 0.5;
          svg_clone.style.position = "absolute";
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          for (k in blocks[i].mobile[j].titleStyle) {
            svg_clone.style[k] = String(blocks[i].mobile[j].titleStyle[k]) + ea;
          }
          temp.appendChild(SvgTong.parsing(svg_clone));

          options = {};
          if (this.map.main[i].children[j].buttons !== undefined) {
            options.buttons = this.map.main[i].children[j].buttons;
          }
          if (this.map.main[i].children[j].subtitles !== undefined) {
            options.subtitles = this.map.main[i].children[j].subtitles;
            mobileBoo = false;
            for (let z = 0; z < this.map.main[i].children[j].subtitles.length; z++) {
              if (this.map.main[i].children[j].subtitles[z].mobileLevelUp) { mobileBoo = true; }
            }
            if (mobileBoo) {
              options.grandMother = div_clone;
              options.mother = temp.firstChild;
            }
          }
          if (this.map.main[i].children[j].notice !== undefined) {
            options.notice = this.map.main[i].children[j].notice;
          }
          if (this.map.main[i].children[j].popup !== undefined) {
            options.popup = this.map.main[i].children[j].popup;
          }

          temp.appendChild(blocks[i].mobile[j].callback(options));

        }
        div_clone.appendChild(temp);
        father.appendChild(div_clone);

      }
    }
  }

  //below
  mother.appendChild(this.below.desktop);
  father.appendChild(this.below.mobile);
}

ConsultingJs.prototype.initialDom = function () {
  const instance = this;
  const { main, sub } = this.map;
  const { thankyou: { main: thankyouMain, sub: thankyouSub } } = sub;
  let div_clone, div_clone2;
  let grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  }
  let list = {
    desktop: [
      {
        id: "thankyouback",
        source: [ thankyouSub.title.desktop.back.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          div_clone.style.backgroundImage = "url('" + ConsultingJs.sourceLink + source[0] +  "')";
          return div_clone;
        },
      },
      {
        id: "thankyoutitle",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 92;
          svg_clone = SvgTong.tongMaker();
          svg_clone.id = id;
          svg_clone.src = thankyouSub.title.desktop.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(170) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%"
          }
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));
          return h;
        },
      },
      {
        id: "consultingback",
        source: [ sub.title.desktop.back.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          div_clone.style.backgroundImage = "url('" + ConsultingJs.sourceLink + source[0] +  "')";
          return div_clone;
        },
      },
      {
        id: "consultinggrayback",
        source: [],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          return div_clone;
        },
      },
      {
        id: "consultingtitle",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 92;
          svg_clone = SvgTong.tongMaker();
          svg_clone.id = id;
          svg_clone.src = sub.title.desktop.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(170) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%"
          }
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));

          return h;
        },
      },
      {
        id: "consultingbase",
        source: [],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          let div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.id = "consultingbox";
          div_clone.appendChild(div_clone2);
          return div_clone;
        },
      },
    ],
    mobile: [
      {
        id: "mothankyouback",
        source: [ thankyouSub.title.mobile.back.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          div_clone.style.backgroundImage = "url('" + ConsultingJs.sourceLink + source[0] +  "')";
          return div_clone;
        },
      },
      {
        id: "mothankyoutitle",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 76;
          svg_clone = SvgTong.tongMaker();
          svg_clone.id = id;
          svg_clone.src = thankyouSub.title.mobile.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(78) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%"
          }
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));

          return h;
        },
      },
      {
        id: "moconsultingback",
        source: [ sub.title.mobile.back.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          div_clone.style.backgroundImage = "url('" + ConsultingJs.sourceLink + source[0] +  "')";
          return div_clone;
        },
      },
      {
        id: "moconsultingtitle",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          let svg_clone, height, width, ea = "px";
          let style = {};
          height = 76;
          svg_clone = SvgTong.tongMaker();
          svg_clone.id = id;
          svg_clone.src = sub.title.mobile.words.src;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(78) + ea,
            marginLeft: String(-1 * (width / 2)) + ea,
            left: "50%"
          }
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          h.appendChild(SvgTong.parsing(svg_clone));

          return h;
        },
      },
      {
        id: "moconsultingbox",
        source: [],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
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

ConsultingJs.prototype.launching = async function () {
  const instance = this;
  try {

    this.initialDom();
    this.belowSubmit();
    this.baseMaker();

    //parsing get
    const getObj = GeneralJs.returnGet();
    let name, phone, tempFunc, timeout;

    if (getObj.login === "true") {

      this.mother.whiteLogin(window.innerWidth >= 900 ? "desktop" : "mobile");

    } else if (getObj.name !== undefined && getObj.phone !== undefined) {

      timeout = setTimeout(function () {
        const flatform = window.innerWidth >= 900 ? "desktop" : "mobile";
        const toggle = flatform === "desktop" ? 0 : 1;
        const icon = document.getElementById((!Boolean(toggle) ? "" : "mo") + "talkIcon");
        const interaction = icon.parentNode;

        name = GeneralJs.escapeString(getObj.name, { hangul: true, noSpace: true });
        phone = GeneralJs.escapeString(getObj.phone, { noSpace: true });
        tempFunc = instance.thankyouPage(flatform, [ name, phone ]);
        tempFunc("photo");

        interaction.lastChild.style.animation = "justfadeout 0.5s ease forwards";
        icon.removeEventListener("click", GeneralJs.events["iconClickEvent"][toggle]);
        GeneralJs.addHrefEvent(icon, "http://pf.kakao.com/_vxixkjxl/chat");

        clearTimeout(timeout);
      }, 0);

    }

  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
}

ConsultingJs.policy = function () {
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
