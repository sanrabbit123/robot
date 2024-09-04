const DataPatch = function () {}

DataPatch.toolsDateFilter = function (value) {
  let filteredValue, temp, tempArr, today;

  if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
    filteredValue = "20" + value;
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
    today = new Date();
    filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
  } else {
    filteredValue = value;
  }

  return filteredValue;
}

DataPatch.prototype.clientMap = function () {
  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;
    if (vaildMode) {
      return { boo: !boo, value: null };
    }
    targetArr = [ '드랍', '진행', '응대중', '장기' ];
    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback, instance) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;
    originalValue = input.value;
    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;
      let blocks;
      let thisRequestNumber;
      let thisCliid;

      items = [ '드랍', '진행', '응대중', '장기' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "진행") {
        if (/^c[0-9][0-9][0-9][0-9]/.test(input.parentElement.parentElement.className)) {
          window.location.href = window.location.protocol + "//" + window.location.host + "/" + "proposal" + "?cliid=" + input.parentElement.parentElement.className;
        } else {
          window.location.href = window.location.protocol + "//" + window.location.host + "/" + "proposal" + "?cliid=" + input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
        }
      } else {

        if (typeof mother.parentElement.getAttribute("class") === "string") {
          thisCliid = mother.parentElement.getAttribute("class");
          blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
          blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
          thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
        } else {
          thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
        }

        if (typeof globalThis.XMLHttpRequest === "function") {
          globalThis.window.parent.postMessage(JSON.stringify({
            cliid: thisCliid,
            requestNumber: thisRequestNumber,
            column: "status",
            value: finalValue,
          }), "*");
        }

        if (finalValue === "드랍") {
          grandMother.setAttribute("drop", "true");
        } else {
          grandMother.setAttribute("drop", "false");
        }

        input.style.transition = "0s all ease";
        input.style.color = "transparent";
        input.value = finalValue;
        input.parentElement.style.transition = "";
        input.parentElement.style.color = "inherit";
        mother.removeChild(document.querySelector(".divTong"));
        callback();
      }
    };

    inputArr = [ '드랍', '진행', '응대중', '장기' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
      height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const managerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (typeof globalThis.XMLHttpRequest === "function") {
      targetArr = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name });
    } else {
      targetArr = [];
    }

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const managerInputFunction = function (mother, input, callback, instance) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;
      let blocks;
      let thisRequestNumber;
      let thisCliid;

      if (typeof globalThis.XMLHttpRequest === "function") {
        items = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name });
      } else {
        items = [];
      }

      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (typeof mother.parentElement.getAttribute("class") === "string") {
        thisCliid = mother.parentElement.getAttribute("class");
        blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
        blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
        thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
      } else {
        thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
        thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
      }

      try {
        GeneralJs.ajaxJson({
          id: thisCliid,
          column: "manager",
          value: finalValue,
          email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
        }, "/updateClientHistory").catch((err) => {
          console.log(err);
        });
      } catch {}

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    if (typeof globalThis.XMLHttpRequest === "function") {
      inputArr = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name });
    } else {
      inputArr = [];
    }
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
      height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const actionToObject = function (value, pastValue, vaildMode) {
    if (vaildMode) {
      return { boo: true, value: null };
    }
    return String(value).trim();
  };
  const actionInputFunction = function (mother, input, callback, instance) {
    const grandMother = mother.parentElement;
    const items = [
      "1차 응대 예정",
      "1차 응대 후 대기",
      "스타일 체크 대기",
      "제안 발송 예정",
      "제안 피드백 예정",
      "피드백 부재중",
      "제안 피드백 완료",
      "부재중 알림 발송",
      "상세 설문 대기",
      "부재중 제안 발송",
      "피드백과 응대 예정",
      "자동 피드백 부재중",
      "피드백과 응대 완료",
      "디자이너 선택",
      "해당 없음"
    ];
    const doubleLength = 6;
    const doubleStartIndex = 1;
    const ea = "px";
    let inputArr;
    let height, fontSize, top, width;
    let div_clone;
    let iconWidth;
    let length;
    let endEvent;
    let originalValue;
    let widthVisual;
    let motherWidth;
    let margin;
    let blockMother;
    let paddingTop;
    let greenGrayIndex;
    let tempIndex;

    originalValue = input.value;

    inputArr = items.map((i) => { return [ i ] });
    for (let i = doubleStartIndex; i < doubleStartIndex + doubleLength; i++) {
      inputArr[i] = [ inputArr[i][0], inputArr[i + doubleLength][0] ];
    }
    for (let i = 0; i < doubleLength; i++) {
      inputArr[doubleStartIndex + doubleLength + i] = null;
    }
    inputArr = inputArr.filter((i) => { return Array.isArray(i); });
    length = inputArr.length;
    greenGrayIndex = 2;
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i].length > 1) {
        tempIndex = inputArr[i].findIndex((s) => { return s === originalValue.trim(); });
        if (tempIndex !== -1) {
          greenGrayIndex = tempIndex;
        }
      }
    }

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = 190;
    }
    top = height * 0.3;
    paddingTop = height * (GeneralJs.isMac() ? 0.35 : 0.45);
    height = height * 1.8;
    iconWidth = 18;
    widthVisual = 0.1;
    margin = 4;
    motherWidth = (width * 2) + margin;

    div_clone = GeneralJs.createNode({
      mother,
      class: [ "removeTarget", "divTong" ],
      style: {
        position: "absolute",
        top: String((height) - top) + ea,
        left: GeneralJs.withOut(50, ((motherWidth / 2) + 0.1), ea),
        width: String(motherWidth) + ea,
        textAlign: "center",
        fontSize: "inherit",
        zIndex: String(3),
        paddingBottom: String(iconWidth + 3) + ea,
      }
    });

    for (let i = 0; i < length; i++) {
      blockMother = GeneralJs.createNode({
        mother: div_clone,
        class: [ "removeTarget" ],
        style: {
          display: "block",
          position: "relative",
          left: GeneralJs.withOut(50, ((motherWidth / 2) + 0.1), ea),
          width: String(motherWidth) + ea,
          height: String(height) + ea,
          fontSize: "inherit",
          zIndex: String(3),
          animation: "fadeuplite 0.3s ease forwards",
          marginBottom: String(margin) + ea,
          textAlign: "center",
        }
      });
      for (let j = 0; j < inputArr[i].length; j++) {
        GeneralJs.createNode({
          mother: blockMother,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(width) + ea,
            paddingTop: String(paddingTop) + ea,
            height: String(height - paddingTop) + ea,
            background: GeneralJs.colorChip[greenGrayIndex === 2 ? "green" : (greenGrayIndex === 0 ? (j === 0 ? "green" : "deactive") : (j === 0 ? (inputArr[i].length === 1 ? "green" : "deactive") : "green"))],
            fontSize: "inherit",
            borderRadius: String(3) + ea,
            boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.shadow,
            marginRight: String(j === inputArr[i].length - 1 ? 0 : margin) + ea,
            textAlign: "center",
            verticalAlign: "top",
          },
          children: [
            {
              class: [ "inputTarget", "hoverDefault" ],
              text: inputArr[i][j],
              attribute: {
                target: inputArr[i][j]
              },
              event: {
                click: endEvent
              },
              style: {
                position: "relative",
                fontSize: "inherit",
                fontWeight: String(400),
                color: GeneralJs.colorChip.whiteBlack,
                textAlign: "center",
                width: String(100) + '%',
                left: String(0) + ea,
              }
            }
          ]
        });
      }
    }
  };
  const callHistoryToObject = function (value, pastValue, vaildMode) {
    const filter = function (value) {
      let filteredValue, temp, tempArr, today;

      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
        filteredValue = "20" + value;
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
        today = new Date();
        filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
      } else {
        filteredValue = value;
      }

      return filteredValue;
    };

    let arr = [];
    let filteredValue;
    let filteredArr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    temp = value.split(", ");
    for (let i of temp) {
      filteredValue = filter(i);
      filteredArr.push(filteredValue);
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(filteredValue)) {
        boo = true;
      }
    }

    if (!boo) {
      temp = filteredArr;
    } else {
      temp = pastValue.split(", ");
    }

    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };
    }

    if (temp[0] === '') {
      return [];
    }

    temp.reverse();

    for (let i of temp) {
      temp2 = i.split("-");
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));
      arr.push({ date: obj, who: "" });
    }

    return arr;
  };
  const callHistoryInputFunction = function (mother, input, callback, instance) {
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;

    endEvent = function (e) {
      let inputs = this.parentElement.parentElement.querySelectorAll(".inputTarget");
      let totalString = '';
      for (let i = inputs.length - 1; i > -1; i--) {
        if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(inputs[i].value))) {
          totalString += DataPatch.toolsDateFilter(inputs[i].value);
          totalString += ", ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -2);
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: GeneralJs.colorChip.green,
      width: String(width) + ea,
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(0) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = length - 1; i > -1; i--) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    });
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };
  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    obj = {};

    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";
    } else if (/설계/g.test(value)) {
      obj.serid = "s2011_aa04s";
    }

    if (/mini/gi.test(value)) {
      obj.xValue = 'M';
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';
    }

    if (/온라인/gi.test(value)) {
      obj.online = true;
    } else {
      obj.online = false;
    }

    return obj;
  };
  const serviceInputFunction = function (mother, input, callback, instance) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;

    originalValue = input.value;
    if (/온라인/gi.test(originalValue)) {
      online = "온라인";
    } else {
      online = "오프라인";
    }
    valuesTong = [
      [ online, "홈퍼니싱", "mini" ],
      [ online, "홈스타일링", "basic" ],
      [ online, "토탈 스타일링", "premium" ],
      [ online, "설계 변경", "premium" ],
    ];

    endEvent = function (e) {
      let onoffLine;
      let inputs0 = document.querySelectorAll(".inputTargetOne");
      let inputs1 = document.querySelectorAll(".inputTargetTwo");
      let totalString = '';

      if (document.querySelector(".inputTargetZero").textContent === "온라인") {
        onoffLine = "온라인";
      } else {
        onoffLine = "오프라인";
      }

      for (let i = 0; i < inputs0.length; i++) {
        if (inputs0[i].getAttribute("switch") === "on") {
          totalString += inputs0[i].getAttribute("target");
          totalString += ' ';
        }
      }
      for (let i = 0; i < inputs1.length; i++) {
        if (inputs1[i].getAttribute("switch") === "on") {
          totalString += inputs1[i].getAttribute("target");
        }
      }

      totalString = onoffLine + " " + totalString;

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        left: "calc(28% + " + String(4 * 1) + ea + ")",
        top: String(0) + ea,
        width: "40%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(32% - " + String(4 * 2) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("target", valuesTong[i][z]);
        input_clone.textContent = valuesTong[i][z];

        if (z !== 0) {
          if ((new RegExp(valuesTong[i][z], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = GeneralJs.colorChip.green;
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const zeroClass = "inputTargetZero";
            const zIndex = z;
            const thisClass = this.className;
            const divTargets = document.querySelectorAll("." + thisClass.replace(/^input/, "div"));
            const inputTargets = document.querySelectorAll("." + thisClass);
            const zeroDivTargets = document.querySelectorAll("." + zeroClass.replace(/^input/, "div"));
            const zeroInputTargets = document.querySelectorAll("." + zeroClass);

            for (let dom of divTargets) {
              dom.style.background = GeneralJs.colorChip.green;
            }

            for (let dom of inputTargets) {
              dom.style.color = GeneralJs.colorChip.whiteBlack;
              dom.setAttribute("switch", "off");
            }

            if (zIndex === 1) {
              for (let dom of zeroDivTargets) {
                dom.style.background = GeneralJs.colorChip.green;
              }

              for (let dom of zeroInputTargets) {
                dom.style.color = GeneralJs.colorChip.whiteBlack;
                dom.setAttribute("switch", "off");
              }
            }

            this.parentElement.style.background = "#ececec";
            this.style.color = GeneralJs.colorChip.green;

            if (zIndex === 1) {
              this.parentElement.previousElementSibling.style.background = "#ececec";
              this.parentElement.previousElementSibling.children[0].style.color = GeneralJs.colorChip.green;
            }

            this.setAttribute("switch", "on");
          });
        } else {
          if ((new RegExp(valuesTong[i][1], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = GeneralJs.colorChip.green;
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const thisClass = this.className;
            const inputTargets = document.querySelectorAll("." + thisClass);
            for (let dom of inputTargets) {
              if (dom.textContent === "오프라인") {
                dom.textContent = "온라인";
              } else {
                dom.textContent = "오프라인";
              }
            }
          });
        }

        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };
  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValueObj, finalValue;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    console.log(value);

    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";
    } else {
      finalValue = finalValueObj[0];
    }

    return [];
  };
  const designerInputFunction = function (mother, input, callback, instance) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let clickEvent;
    let tempArr;
    let count;
    let valuesTong;
    let toHtml;
    let originalValue;
    let contextEvent;

    valuesTong = [];
    count = 4;
    tempArr = null;
    toHtml = function (designer, desid) {
      return designer + ' <b style="font-weight:200;font-size:10px;color:white">' + desid + '</b>';
    };
    for (let { designer, desid } of GeneralJs.stacks.allDesignerTong) {
      if (count < 4) {
        tempArr.push(toHtml(designer, desid));
        count++;
      } else {
        if (tempArr !== null) {
          valuesTong.push(tempArr);
        }
        tempArr = [];
        tempArr.push(toHtml(designer, desid));
        count = 0;
      }
    }
    if (Array.isArray(tempArr)) {
      if (tempArr.length > 0) {
        valuesTong.push(tempArr);
      }
    }

    originalValue = input.value;

    clickEvent = async function (e) {
      try {
        let thisRequestNumber;
        let thisCliid;
        let selectedDesigner, selectedDesid;
        let blocks;
        let thisClient, thisRequest;
        let thisDesigners;
        let whereQuery, updateQuery;
        let thisCase;

        selectedDesigner = this.getAttribute("target").split(' ')[0].trim();
        selectedDesid = this.getAttribute("target").split(' ')[1].trim();

        if (typeof mother.parentElement.getAttribute("class") === "string") {
          thisCliid = mother.parentElement.getAttribute("class");
          blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
          blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
          thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
          thisCase = "row";
        } else {
          thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
          thisCase = "card";
        }

        whereQuery = { cliid: thisCliid };
        updateQuery = {};

        [ thisClient ] = await GeneralJs.ajaxJson({ noFlat: true, whereQuery }, "/getClients", { equal: true });
        thisRequest = thisClient.requests[thisRequestNumber];

        thisDesigners = GeneralJs.equalJson(JSON.stringify(thisRequest.analytics.response.designers));
        thisDesigners.push(selectedDesid);
        thisDesigners = [ ...new Set(thisDesigners) ].filter((str) => { return /^d[0-9][0-9][0-9][0-9]/.test(str); });
        updateQuery["requests." + String(thisRequestNumber) + ".analytics.response.designers"] = thisDesigners;

        await GeneralJs.ajaxJson({ whereQuery, updateQuery }, "/rawUpdateClient");

        if (typeof globalThis.XMLHttpRequest === "function") {
          globalThis.window.parent.postMessage(JSON.stringify({
            cliid: thisCliid,
            requestNumber: thisRequestNumber,
            column: "designers",
            value: thisDesigners,
          }), "*");
        }

        if (thisCase === "card") {
          input.value = thisDesigners.map((desid) => { return GeneralJs.stacks.entireDesignerTong.find((d) => { return d.desid === desid }).designer }).join(", ");
          if (/DIV/gi.test(mother.firstChild.nodeName)) {
            mother.insertAdjacentHTML("afterbegin", " ");
          }
          mother.firstChild.textContent = input.value;
          blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
          blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
          GeneralJs.findByAttribute([ ...blocks[thisRequestNumber].children ], "column", "designers").textContent = thisDesigners.join(", ");
          instance.cases.filter((o) => { return o !== null; }).find((obj) => { return obj.cliid === thisCliid; }).designers = thisDesigners.join(", ");
        } else {
          input.value = thisDesigners.join(", ");
          if (/DIV/gi.test(mother.firstChild.nodeName)) {
            mother.insertAdjacentHTML("afterbegin", " ");
          }
          mother.firstChild.textContent = input.value;
          instance.cases.filter((o) => { return o !== null; }).find((obj) => { return obj.cliid === thisCliid; }).designers = thisDesigners.join(", ");
        }

      } catch (e) {
        console.log(e);
      }
    };

    contextEvent = async function (e) {
      try {
        e.preventDefault();
        let thisRequestNumber;
        let thisCliid;
        let selectedDesigner, selectedDesid;
        let blocks;
        let thisClient, thisRequest;
        let thisDesigners, thisDesigners_new;
        let whereQuery, updateQuery;
        let thisCase;

        selectedDesigner = this.getAttribute("target").split(' ')[0].trim();
        selectedDesid = this.getAttribute("target").split(' ')[1].trim();

        if (typeof mother.parentElement.getAttribute("class") === "string") {
          thisCliid = mother.parentElement.getAttribute("class");
          blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
          blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
          thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
          thisCase = "row";
        } else {
          thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
          thisCase = "card";
        }

        whereQuery = { cliid: thisCliid };
        updateQuery = {};

        [ thisClient ] = await GeneralJs.ajaxJson({ noFlat: true, whereQuery }, "/getClients", { equal: true });
        thisRequest = thisClient.requests[thisRequestNumber];

        thisDesigners = GeneralJs.equalJson(JSON.stringify(thisRequest.analytics.response.designers));
        thisDesigners_new = [];
        for (let desid of thisDesigners) {
          if (desid !== selectedDesid) {
            thisDesigners_new.push(desid);
          }
        }
        thisDesigners = [ ...new Set(thisDesigners_new) ].filter((str) => { return /^d[0-9][0-9][0-9][0-9]/.test(str); });
        updateQuery["requests." + String(thisRequestNumber) + ".analytics.response.designers"] = thisDesigners;

        await GeneralJs.ajaxJson({ whereQuery, updateQuery }, "/rawUpdateClient");

        if (typeof globalThis.XMLHttpRequest === "function") {
          globalThis.window.parent.postMessage(JSON.stringify({
            cliid: thisCliid,
            requestNumber: thisRequestNumber,
            column: "designers",
            value: thisDesigners,
          }), "*");
        }

        if (thisCase === "card") {
          input.value = thisDesigners.map((desid) => { return GeneralJs.stacks.entireDesignerTong.find((d) => { return d.desid === desid }).designer }).join(", ");
          if (/DIV/gi.test(mother.firstChild.nodeName)) {
            mother.insertAdjacentHTML("afterbegin", " ");
          }
          mother.firstChild.textContent = input.value;
          blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
          blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
          GeneralJs.findByAttribute([ ...blocks[thisRequestNumber].children ], "column", "designers").textContent = thisDesigners.join(", ");
          instance.cases.filter((o) => { return o !== null; }).find((obj) => { return obj.cliid === thisCliid; }).designers = thisDesigners.join(", ");
        } else {
          input.value = thisDesigners.join(", ");
          if (/DIV/gi.test(mother.firstChild.nodeName)) {
            mother.insertAdjacentHTML("afterbegin", " ");
          }
          mother.firstChild.textContent = input.value;
          instance.cases.filter((o) => { return o !== null; }).find((obj) => { return obj.cliid === thisCliid; }).designers = thisDesigners.join(", ");
        }

      } catch (e) {
        console.log(e);
      }
    };

    input.value = mother.textContent;
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = String(550);
    top = height * 0.5;
    iconWidth = 18;
    height = String(17);

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: String(0) + ea,
      width: String(width) + ea,
      textAlign: "center",
      fontSize: String(12) + ea,
      fontWeight: String(700),
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: String(0) + ea,
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: String(12) + ea,
      fontWeight: String(700),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [];
    for (let z = 0; z < 5; z++) {
      buttonDetailStyles.push({
        position: "absolute",
        left: String(20 * z) + '%',
        top: String(0) + ea,
        width: "calc(" + String(20) + '%' + " - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.black,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: String(12) + ea,
        fontWeight: String(700),
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.shadow,
      });
    }

    inputStyle = {
      position: "absolute",
      fontSize: String(12) + ea,
      fontWeight: String(600),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < valuesTong[i].length; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget");
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("switch", "off");
        input_clone.setAttribute("target", valuesTong[i][z].replace(/\<[^\<\>]+\>/g, ''));
        input_clone.insertAdjacentHTML("beforeend", valuesTong[i][z]);
        input_clone.addEventListener("click", clickEvent);
        input_clone.addEventListener("contextmenu", contextEvent);
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const designerToString = async function (value) {
    try {
      const designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: value.trim() } }, "/getDesigners"))[0];
      return designer.designer + " " + designer.desid;
    } catch (e) {
      console.log(e);
    }
  };
  const hahaToObject = function (value, pastValue, vaildMode) {
    if (vaildMode) {
      return { boo: true, value: null };
    }
    return '-';
  };
  const hahaInputFunction = function (mother, input, callback, instance) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;
      let blocks;
      let thisRequestNumber;
      let thisCliid;

      finalValue = GeneralJs.dateToString(new Date());

      if (typeof mother.parentElement.getAttribute("class") === "string") {
        thisCliid = mother.parentElement.getAttribute("class");
        blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
        blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
        thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
      } else {
        thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
        thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
      }

      GeneralJs.ajaxJson({ mode: "lowLow", cliid: thisCliid }, "/salesClient", { equal: true }).catch((err) => {
        console.log(err);
      });

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ "하하 알림톡 발송" ];
    length = inputArr.length;
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
      height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };
    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };
    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const naverToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    if (vaildMode) {
      return { boo: !boo, value };
    }
    return value;
  };
  const naverInputFunction = function (mother, input, callback, instance) {
    if (input.value.trim() === "") {
      GeneralJs.prompt("부동산 아이디를 입력해주세요!").then((value) => {
        if (typeof value === "string") {
          value = value.trim();
          if (value !== "") {
            if (/[0-9]/gi.test(value)) {
              if (value.replace(/[0-9]/gi, '') === "") {
                let whereQuery, updateQuery;
                let thisCliid;
                let blocks;
                let thisRequestNumber;

                if (typeof mother.parentElement.getAttribute("class") === "string") {
                  thisCliid = mother.parentElement.getAttribute("class");
                  blocks = [ ...document.querySelectorAll('.' + thisCliid) ];
                  blocks.sort((a, b) => { return Number(a.getAttribute("index")) - Number(b.getAttribute("index")) });
                  thisRequestNumber = blocks.findIndex((dom) => { return dom ===  mother.parentElement; });
                } else {
                  thisCliid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
                  thisRequestNumber = Number(mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("request"));
                }
                whereQuery = {};
                whereQuery["cliid"] = thisCliid;
                updateQuery = {};
                updateQuery["requests." + String(thisRequestNumber) + ".request.space.naver"] = String(value);
                return GeneralJs.ajaxJson({ whereQuery, updateQuery }, "/rawUpdateClient");
              }
            }
          }
        }
        return (new Promise((resolve, reject) => { resolve(null); }));
      }).then(() => {
        window.location.reload();
      }).catch((err) => { console.log(err); });
    } else {
      GeneralJs.blankHref("https://new.land.naver.com/complexes/" + input.value);
      callback();
    }
  };

  const map = {
    name: { name: "성함", position: "name", type: "string", searchBoo: true, },
    cliid: { name: "아이디", position: "cliid", type: "string", searchBoo: true, },
    phone: { name: "연락처", position: "phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "email", type: "string", searchBoo: true, },
    timeline: { name: "문의일", position: "requests.0.request.timeline", type: "date", searchBoo: true, },
    budget: { name: "예산", position: "requests.0.request.budget", type: "string", items: [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ], searchBoo: true, },
    family: { name: "가족 구성원", position: "requests.0.request.family", type: "string", searchBoo: true, },
    furniture: { name: "가구 구매", position: "requests.0.request.furniture", type: "string", items: [ "재배치", "일부 구매", "전체 구매" ], searchBoo: true, },
    address: { name: "주소", position: "requests.0.request.space.address", type: "string", address: true, searchBoo: true, },
    contract: { name: "계약 상태", position: "requests.0.request.space.contract", type: "string", items: [ "자가", "전월세" ], searchBoo: true, },
    pyeong: { name: "평수", position: "requests.0.request.space.pyeong", type: "number", searchBoo: true, },
    naver: { name: "네이버 부동산", position: "requests.0.request.space.naver", type: "object", inputFunction: naverInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: naverToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    room: { name: "방", position: "requests.0.request.space.spec.room", type: "number", searchBoo: false, },
    bathroom: { name: "화장실", position: "requests.0.request.space.spec.bathroom", type: "number", searchBoo: false, },
    valcony: { name: "발코니", position: "requests.0.request.space.spec.valcony", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    living: { name: "거주중", position: "requests.0.request.space.resident.living", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    comment: { name: "요청 사항", position: "requests.0.request.etc.comment", type: "string", searchBoo: false, },
    channel: { name: "유입 채널", position: "requests.0.request.etc.channel", type: "string", searchBoo: true, },
    status: { name: "상태", position: "requests.0.analytics.response.status", type: "object", items: [ "드랍", "진행", "응대중", "장기" ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "requests.0.analytics.response.action", type: "object", items: [
      "1차 응대 예정",
      "1차 응대 후 대기",
      "스타일 체크 대기",
      "제안 발송 예정",
      "제안 피드백 예정",
      "피드백 부재중",
      "제안 피드백 완료",
      "부재중 알림 발송",
      "상세 설문 대기",
      "부재중 제안 발송",
      "피드백과 응대 예정",
      "자동 피드백 부재중",
      "피드백과 응대 완료",
      "디자이너 선택",
      "해당 없음"
    ], itemMap: [
      [
        "1차 응대",
        [
          [ "1차 응대 예정" ],
          [ "1차 응대 후 대기", "부재중 알림 발송" ],
          [ "스타일 체크 대기", "상세 설문 대기" ],
          [ "제안 발송 예정", "부재중 제안 발송" ],
          [ "제안 피드백 예정", "피드백과 응대 예정" ],
          [ "피드백 부재중", "자동 피드백 부재중" ],
          [ "제안 피드백 완료", "피드백과 응대 완료" ],
          [ "디자이너 선택" ],
          [ "해당 없음" ],
        ]
      ]
    ], divisionStart: 1, divisionLength: 6, inputFunction: actionInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: actionToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    outreason: { name: "유출 이유", position: "requests.0.analytics.response.outreason", type: "array", items: [
      "연결 안 됨",
      "가벼운 문의",
      "고객 미션 미응답",
      "직접 진행",
      "고객 상황 변동",
      "가족 의견 불일치",
      "기간 임박",
      "장기 고객",
      "시공만 필요",
      "거주중 시공",
      "일단 견적 먼저",
      "시공 문제",
      "서비스 불일치",
      "타사 계약",
      "지역 이슈",
      "총 예산 문제",
      "디자인비 문제",
      "프로세스 문제",
      "디자이너 부족",
      "제안서 매력도",
    ], multiple: true, searchBoo: true, },
    kakao: { name: "채널 등록", position: "requests.0.analytics.response.kakao", type: "boolean", items: [ "등록", "미등록" ], searchBoo: false, },
    service: { name: "예상 서비스", position: "requests.0.analytics.response.service", type: "object", inputFunction: serviceInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    next: { name: "1차 응대", position: "requests.0.analytics.date.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    recommend: { name: "피드백 통화", position: "requests.0.analytics.date.call.recommend", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "requests.0.analytics.date.call.history", type: "object", inputFunction: callHistoryInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    precheck: { name: "사전 점검일", position: "requests.0.analytics.date.space.precheck", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    empty: { name: "집 비는 날", position: "requests.0.analytics.date.space.empty", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    movein: { name: "예상 종료일", position: "requests.0.analytics.date.space.movein", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    expected: { name: "입주 예정일", position: "requests.0.request.space.resident.expected", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    spacePicture: { name: "사진", position: "requests.0.analytics.picture.space.boo", type: "boolean", items: [ "제출", "미제출" ], searchBoo: false },
    partialBoo: { name: "부분 여부", position: "requests.0.request.space.partial.boo", type: "boolean", items: [ "부분", "전체" ], searchBoo: false, },
    partialPyeong: { name: "부분 평수", position: "requests.0.request.space.partial.pyeong", type: "number", searchBoo: true, },
    partialDetail: { name: "부분 공간", position: "requests.0.request.space.partial.detail", type: "string", searchBoo: true, },
    designers: { name: "예상 디자이너", position: "requests.0.analytics.response.designers", type: "object", inputFunction: designerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: designerToString.toString().replace(/\}$/, '').replace(/async function \(value\) \{/gi, ''), stringFunctionAsync: true, searchBoo: true, },
    manager: { name: "담당자", position: "null", type: "object", items: (typeof globalThis.XMLHttpRequest === "function") ? (GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name })) : [], inputFunction: managerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: managerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false },
    proposalSend: { name: "추천서 발송", position: "null", type: "constant", searchBoo: false },
    aboutSend: { name: "서비스 소개 발송", position: "null", type: "constant", searchBoo: false },
    pureSend: { name: "부재중 발송", position: "null", type: "constant", searchBoo: false },
    hahaSend: { name: "하하 발송", position: "null", type: "object", items: [ "하하 발송" ], inputFunction: hahaInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: hahaToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false },
    proposalDesigners: { name: "추천한 디자이너", position: "null", type: "constant", searchBoo: false },
    possible: { name: "계약 가능성", position: "requests.0.analytics.response.possible", type: "string", items: [ "낮음", "애매", "높음" ], searchBoo: false },
    priority: { name: "우선 순위", position: "requests.0.analytics.response.priority", type: "string", items: [ "하", "중", "상" ], searchBoo: false },
    target: { name: "타겟 고객", position: "requests.0.analytics.response.target", type: "string", items: [ "타겟", "애매", "해당 없음" ], searchBoo: false },
    memo: { name: "응대 후 피드백", position: "requests.0.analytics.response.memo", type: "string", searchBoo: false },
    standardDate: { name: "기준일", position: "null", type: "constant", searchBoo: false },
    wantsService: { name: "희망 서비스", position: "null", type: "constant", searchBoo: false },
    selectConstruct: { name: "선택한 시공", position: "null", type: "constant", searchBoo: false },
    curationSelection: { name: "선택 상태", position: "null", type: "constant", searchBoo: false },
    curationReceive: { name: "추천서 상태", position: "null", type: "constant", searchBoo: false },
    curationImage: { name: "이미지 선택 상태", position: "null", type: "constant", searchBoo: false },
    curationBudget: { name: "예산", position: "null", type: "constant", searchBoo: false },
    curationFamily: { name: "가족 구성원", position: "null", type: "constant", searchBoo: false },
    curationAge: { name: "나이대", position: "null", type: "constant", searchBoo: false },
    curationConstruct: { name: "전체 철거 여부", position: "null", type: "constant", searchBoo: false },
    curationConstructEnvironment: { name: "시공 당일 환경", position: "null", type: "constant", searchBoo: false },
    curationConstructItems: { name: "선택한 시공 항목", position: "null", type: "constant", searchBoo: false },
    curationExpect: { name: "선택한 입주 예정", position: "null", type: "constant", searchBoo: false },
    curationFabric: { name: "생각하는 패브릭", position: "null", type: "constant", searchBoo: false },
    curationFurniture: { name: "생각하는 가구", position: "null", type: "constant", searchBoo: false },
    curationPurchase: { name: "가구 구매", position: "null", type: "constant", searchBoo: false },
    curationTime: { name: "희망 상담 시간", position: "null", type: "constant", searchBoo: false },
    curationService: { name: "선택한 서비스", position: "null", type: "constant", searchBoo: false },
  };
  return map;
}

DataPatch.prototype.designerMap = function () {
  const snsToObject = function (value, pastValue, vaildMode) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 2) {
          boo = true;
        }
      }
    } else {
      temp2 = value.split(" ");
      if (temp2.length !== 2) {
        boo = true;
      }
    }

    if (value === '') {
      boo = false;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value === '' || temp[0] === '') {
      return [];
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.kind = temp2[0];
      obj.href = temp2[1];
      arr.push(obj);
    }

    return arr;
  };
  const snsInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        if (/^http/.test(inputs1[i].value)) {
          if (/유튜/g.test(inputs0[i].value) || /유트/g.test(inputs0[i].value) || /유투/g.test(inputs0[i].value) || /you/gi.test(inputs0[i].value) || /tube/gi.test(inputs0[i].value)) {
            totalString += "Youtube";
            totalString += " ";
          } else if (/인스타/g.test(inputs0[i].value) || /스타/g.test(inputs0[i].value) || /ins/g.test(inputs0[i].value) || /insta/gi.test(inputs0[i].value) || /gram/gi.test(inputs0[i].value)) {
            totalString += "Instagram";
            totalString += " ";
          } else if (/네이버/g.test(inputs0[i].value) || /블로그/g.test(inputs0[i].value) || /blog/g.test(inputs0[i].value) || /naver/gi.test(inputs0[i].value)) {
            totalString += "Naver";
            totalString += " ";
          } else {
            totalString += "etc";
            totalString += " ";
          }
          totalString += inputs1[i].value.trim().replace(/\/$/, '').replace(/[ \n\t]/g, '');
          totalString += " / ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "16%",
      height: "100%",
      background: GeneralJs.colorChip.green,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(84% - " + String(Math.floor(height / 4)) + ea + ")",
      height: "100%",
      background: GeneralJs.colorChip.green,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      if (tempArr[0] !== undefined) {
        input_clone.value = tempArr[0];
      } else {
        input_clone.value = '';
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      if (tempArr[1] !== undefined) {
        input_clone.value = tempArr[1];
      } else {
        input_clone.value = '';
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, button_clone2;
      let input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    });

    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const careerToObject = function (value, pastValue, vaildMode) {
    let obj = {};
    let boo = false;
    let temp;

    if (value.split(' ').length === 2) {
      boo = false;
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    if (Number.isNaN(obj.startY) || Number.isNaN(obj.startM)) {
      boo = true;
    }

    obj = {};

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    return obj;
  };
  const careerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';
      totalString = inputs0[0].value.replace(/[^0-9]/g, '') + "년 " + inputs0[1].value.replace(/[^0-9]/g, '') + "월";
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "100";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "100" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "100" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "60%",
      height: "100%",
      background: GeneralJs.colorChip.green,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(40% - " + String(Math.floor(height / 4)) + ea + ")",
      height: "100%",
      background: GeneralJs.colorChip.green,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i].replace(/[^0-9]/g, '');
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = ([ "년", "월" ])[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const accountToObject = function (value, pastValue, vaildMode) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 3) {
          boo = true;
        }
      }
    } else {
      temp2 = value.split(" ");
      if (temp2.length !== 3) {
        boo = true;
      }
    }

    if (value === '') {
      boo = false;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value === '' || temp[0] === '') {
      return [];
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.bankName = temp2[0];
      obj.accountNumber = temp2[1];
      obj.to = temp2[2];
      arr.push(obj);
    }

    return arr;
  };
  const accountInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetBank");
      let inputs1 = document.querySelectorAll(".inputTargetAccount");
      let inputs2 = document.querySelectorAll(".inputTargetTo");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += inputs0[i].value.replace(/은행/g, '');
        totalString += ' ';
        totalString += inputs1[i].value;
        totalString += ' ';
        totalString += inputs2[i].value;
        totalString += ' / ';
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "22%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        left: "calc(22% + " + String(Math.round(height / 4)) + ea + ")",
        top: String(0) + ea,
        width: "calc(54% - " + String(Math.round((height * 2) / 4) + 1) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "24%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Bank", "Account", "To" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (tempArr[z] !== undefined) {
          input_clone.value = tempArr[z];
        } else {
          input_clone.value = '';
        }
        input_clone.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
        });
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, button_clone2;
      let input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Bank", "Account", "To" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
        });
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    });

    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const filesToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;
    let target = [
      "businessRegistration",
      "bankBook",
      "registrationCard",
    ];

    temp = value.split(" / ");
    if (temp.length !== 3) {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    for (let i = 0; i < target.length; i++) {
      obj[target[i]] = /유/gi.test(temp[i]) ? true : false;
    }

    return obj;
  };
  const filesInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetBoolean");
      let totalString = '';

      for (let i = 0; i < 3; i++) {
        totalString += ([ "사업자등록증", "통장사본", "신분증사본" ])[i];
        totalString += ' ';
        if (/유/g.test(inputs0[i].value)) {
          totalString += "유";
        } else {
          totalString += "무";
        }
        totalString += ' / ';
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "200";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "200" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "200" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "80%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(20% - " + String(Math.round(height / 4)) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Name", "Boolean" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "협약 해지") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const map = {
    designer: { name: "성함", position: "designer", type: "string", searchBoo: true, },
    desid: { name: "아이디", position: "desid", type: "string", searchBoo: true, },
    did: { name: "별칭", position: "information.did", type: "string", searchBoo: true, },
    status: { name: "계약 상태", position: "information.contract.status", type: "object", items: [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    date: { name: "계약일", position: "information.contract.date", type: "date", searchBoo: true, },
    phone: { name: "연락처", position: "information.phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "information.email", type: "string", searchBoo: true, },
    address: { name: "주소", position: "information.address", type: "array", address: true, searchBoo: true, },
    showRoom: { name: "쇼룸", position: "information.personalSystem.showRoom", type: "boolean", items: [ "true", "false" ], searchBoo: true, },
    webPage: { name: "웹페이지", position: "information.personalSystem.webPage", type: "array", searchBoo: true, },
    sns: { name: "SNS", position: "information.personalSystem.sns", type: "object", inputFunction: snsInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: snsToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    career: { name: "경력", position: "information.business.career", type: "object", inputFunction: careerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: careerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    account: { name: "계좌번호", position: "information.business.account", type: "object", inputFunction: accountInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    classification: { name: "사업자 분류", position: "information.business.businessInfo.classification", items: [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], type: "string", searchBoo: true, },
    businessNumber: { name: "사업자 등록번호", position: "information.business.businessInfo.businessNumber", type: "string", searchBoo: true, },
    files: { name: "파일 유무", position: "information.business.businessInfo.files", type: "object", inputFunction: filesInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: filesToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    percentage: { name: "수수료", position: "information.business.service.cost.percentage", type: "number", searchBoo: true, },
    partner: { name: "시공사", position: "information.business.service.construct.partner", type: "string", searchBoo: true, },
    method: { name: "시공 방식", position: "information.business.service.construct.method", type: "string", searchBoo: true, },
  };
  return map;
}

DataPatch.prototype.projectMap = function () {
  const accountToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    obj.account = temp[0].replace(/^계좌번호/, '').trim();
    obj.to = temp[1].replace(/^수신자/, '').trim();
    obj.proof = temp[2].replace(/^증빙/, '').trim();

    return obj;
  };
  const accountInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += ([ "계좌번호", "수신자", "증빙" ])[i];
        totalString += ' ';
        totalString += inputs1[i].value.replace(/[ \n\t]/g, '');
        totalString += " / ";
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Property", "Value" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };
  const accountToString = function (value) {
    return ("계좌번호 " + value.account + " / 수신자 " + value.to + " / 증명 " + value.proof);
  };

  const methodToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    obj.method = temp[0].replace(/^결제방법/, '').trim();
    obj.to = temp[1].replace(/^수신자/, '').trim();
    obj.proof = temp[2].replace(/^증빙/, '').trim();

    return obj;
  };
  const methodInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += ([ "결제방법", "수신자", "증빙" ])[i];
        totalString += ' ';
        totalString += inputs1[i].value.replace(/[ \n\t]/g, '');
        totalString += " / ";
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Property", "Value" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    obj = {};

    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";
    } else if (/설계/g.test(value)) {
      obj.serid = "s2011_aa04s";
    }

    if (/mini/gi.test(value)) {
      obj.xValue = 'M';
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';
    }

    if (/온라인/gi.test(value)) {
      obj.online = true;
    } else {
      obj.online = false;
    }

    return obj;
  };
  const serviceInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;

    originalValue = input.value;
    if (/온라인/gi.test(originalValue)) {
      online = "온라인";
    } else {
      online = "오프라인";
    }
    valuesTong = [
      [ online, "홈퍼니싱", "mini" ],
      [ online, "홈스타일링", "basic" ],
      [ online, "토탈 스타일링", "premium" ],
      [ online, "설계 변경", "premium" ],
    ];

    endEvent = async function (e) {
      try {
        let onoffLine;
        let inputs0 = document.querySelectorAll(".inputTargetOne");
        let inputs1 = document.querySelectorAll(".inputTargetTwo");
        let totalString = '';
        let designer;
        let onlineAble, designerAble;
        let proid, project;
        let x, y;
        let currentMode;
        let newPrice;
        let ajaxData, ajaxData2;
        let client, cliid;
        let inspectionArr;
        let report;
        let message;

        proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
        currentMode = "row";
        if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
          proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          currentMode = "card";
        }
        project = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
        designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true }))[0];
        client = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true }))[0];
        cliid = client.cliid;

        onlineAble = true;
        if (document.querySelector(".inputTargetZero").textContent === "온라인") {
          onoffLine = "온라인";
          if (!designer.analytics.project.online) {
            onlineAble = false;
          }
        } else {
          onoffLine = "오프라인";
        }

        for (let i = 0; i < inputs0.length; i++) {
          if (inputs0[i].getAttribute("switch") === "on") {
            totalString += inputs0[i].getAttribute("target");
            totalString += ' ';
            x = i;
          }
        }
        for (let i = 0; i < inputs1.length; i++) {
          if (inputs1[i].getAttribute("switch") === "on") {
            totalString += inputs1[i].getAttribute("target");
            y = i;
          }
        }

        if (y === 3) {
          y = 2;
        }

        totalString = onoffLine + " " + totalString;
        designerAble = (designer.analytics.construct.level >= x);

        if (onlineAble && designerAble) {
          if (window.confirm("서비스를 바꾸시겠습니까?")) {
            inspectionArr = await GeneralJs.ajaxJson({
              mode: "inspection",
              addressArr: [ { id: cliid, address: client.requests[0].request.space.address } ],
              liteMode: false,
            }, "/parsingAddress");
            if (inspectionArr.length !== 0) {
              window.alert("고객님의 주소가 잘못되어 제안서를 만들 수 없습니다!\n" + inspectionArr[0].message + "\n고객님의 주소를 올바른 형식으로 고쳐주세요!\n(도로명과 건물 번호가 반드시 있어야 함)");
              window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + inspectionArr[0].id;
            } else {

              ajaxData = { proid, method: (/오프/gi.test(onoffLine) ? "offline" : "online"), serid: `s2011_aa0${String(x + 1)}s`, mode: "confirm" };
              ajaxData2 = { proid, method: (/오프/gi.test(onoffLine) ? "offline" : "online"), serid: `s2011_aa0${String(x + 1)}s` };
              newPrice = await GeneralJs.prompt("새로운 공급가를 오직 숫자로만 적어주세요! (만원 표기 안 됨) 자동 계산을 원할 시, '자동'이라고 써주세요!");
              if (!Number.isNaN(Number(newPrice.replace(/[^0-9]/gi, '')))) {
                if (Number(newPrice.replace(/[^0-9]/gi, '')) !== 0) {
                  ajaxData.newPrice = Number(newPrice.replace(/[^0-9]/gi, ''));
                  ajaxData2.newPrice = Number(newPrice.replace(/[^0-9]/gi, ''));
                }
              }

              report = await GeneralJs.ajaxJson(ajaxData, PYTHONHOST + "/serviceConverting");
              if (typeof report.error === "string") {
                window.alert(report.error);
                window.alert("이 디자이너는 해당 서비스를 진행할 수 없습니다!");
              } else {
                message = "다음 상세 사항을 확인해주세요! 추가 견적이 발생할 경우 자동으로 알림톡이 발송될 예정입니다, 확실합니까?\n";
                message += "기존 공급가 : " + GeneralJs.autoComma(report.price.supply.from) + '원' + '\n';
                message += "기존 잔금 : " + GeneralJs.autoComma(report.price.remain.from) + '원' + '\n';
                message += "새로운 공급가 : " + GeneralJs.autoComma(report.price.supply.to) + '원' + '\n';
                message += "새로운 잔금 : " + GeneralJs.autoComma(report.price.remain.to) + '원' + '\n';
                message += "안내될 차액 : " + GeneralJs.autoComma(report.price.between.consumer) + '원' + '\n';
                message += "기존 정산 총 금액 : " + GeneralJs.autoComma(report.calculate.total.from) + '원' + '\n';
                message += "기존 정산 선금 : " + GeneralJs.autoComma(report.calculate.first.from) + '원' + '\n';
                message += "기존 정산 잔금 : " + GeneralJs.autoComma(report.calculate.remain.from) + '원' + '\n';
                message += "새로운 정산 총 금액 : " + GeneralJs.autoComma(report.calculate.total.to) + '원' + '\n';
                message += "새로운 정산 선금 : " + GeneralJs.autoComma(report.calculate.first.to) + '원' + '\n';
                message += "새로운 정산 잔금 : " + GeneralJs.autoComma(report.calculate.remain.to) + '원' + '\n';
                if (window.confirm(message)) {
                  await GeneralJs.ajaxJson(ajaxData2, PYTHONHOST + "/serviceConverting");
                }
              }

              window.location.reload();
            }
          }
        } else {
          window.alert("이 디자이너는 해당 서비스를 운용할 수 없습니다!");
        }

      } catch (e) {
        console.log(e);
      }
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        left: "calc(28% + " + String(4 * 1) + ea + ")",
        top: String(0) + ea,
        width: "40%",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(32% - " + String(4 * 2) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("target", valuesTong[i][z]);
        input_clone.textContent = valuesTong[i][z];

        if (z !== 0) {
          if ((new RegExp(valuesTong[i][z], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = GeneralJs.colorChip.green;
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const zeroClass = "inputTargetZero";
            const zIndex = z;
            const thisClass = this.className;
            const divTargets = document.querySelectorAll("." + thisClass.replace(/^input/, "div"));
            const inputTargets = document.querySelectorAll("." + thisClass);
            const zeroDivTargets = document.querySelectorAll("." + zeroClass.replace(/^input/, "div"));
            const zeroInputTargets = document.querySelectorAll("." + zeroClass);

            for (let dom of divTargets) {
              dom.style.background = GeneralJs.colorChip.green;
            }

            for (let dom of inputTargets) {
              dom.style.color = GeneralJs.colorChip.whiteBlack;
              dom.setAttribute("switch", "off");
            }

            if (zIndex === 1) {
              for (let dom of zeroDivTargets) {
                dom.style.background = GeneralJs.colorChip.green;
              }

              for (let dom of zeroInputTargets) {
                dom.style.color = GeneralJs.colorChip.whiteBlack;
                dom.setAttribute("switch", "off");
              }
            }

            this.parentElement.style.background = "#ececec";
            this.style.color = GeneralJs.colorChip.green;

            if (zIndex === 1) {
              this.parentElement.previousElementSibling.style.background = "#ececec";
              this.parentElement.previousElementSibling.children[0].style.color = GeneralJs.colorChip.green;
            }

            this.setAttribute("switch", "on");
          });
        } else {
          if ((new RegExp(valuesTong[i][1], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = GeneralJs.colorChip.green;
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const thisClass = this.className;
            const inputTargets = document.querySelectorAll("." + thisClass);
            for (let dom of inputTargets) {
              if (dom.textContent === "오프라인") {
                dom.textContent = "온라인";
              } else {
                dom.textContent = "오프라인";
              }
            }
          });
        }

        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
      cursor: "pointer",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };
  const serviceToString = function (value) {
    let str;

    if (value.online) {
      str = "온라인 ";
    } else {
      str = "오프라인 ";
    }

    if (value.serid === "s2011_aa01s") {
      str += "홈퍼니싱 ";
    } else if (value.serid === "s2011_aa02s") {
      str += "홈스타일링 ";
    } else if (value.serid === "s2011_aa03s") {
      str += "토탈 스타일링 ";
    } else if (value.serid === "s2011_aa04s") {
      str += "설계 변경 ";
    }

    if (value.xValue === 'M') {
      str += "mini";
    } else if (value.xValue === 'B') {
      str += "basic";
    } else if (value.xValue === 'P') {
      str += "premium";
    }

    return str;
  };

  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValueObj, finalValue;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";
    } else {
      finalValue = finalValueObj[0];
    }

    return finalValue;
  };
  const designerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let count;
    let valuesTong;
    let toHtml;
    let originalValue;

    valuesTong = [];
    count = 4;
    tempArr = null;
    toHtml = function (designer, desid) {
      return designer + ' <b style="font-weight:200;font-size:11px;color:white">' + desid + '</b>';
    };
    for (let { designer, desid } of GeneralJs.stacks.allDesignerTong) {
      if (count < 4) {
        tempArr.push(toHtml(designer, desid));
        count++;
      } else {
        if (tempArr !== null) {
          valuesTong.push(tempArr);
        }
        tempArr = [];
        tempArr.push(toHtml(designer, desid));
        count = 0;
      }
    }
    if (Array.isArray(tempArr)) {
      if (tempArr.length > 0) {
        valuesTong.push(tempArr);
      }
    }

    originalValue = input.value;

    endEvent = async function (e) {
      try {
        let thisDesigner;
        let proid, project;
        let currentMode;
        let selectedDesid, selectedDesigner;
        let designerAble;
        let x, y;

        proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
        currentMode = "row";
        if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
          proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          currentMode = "card";
        }
        project = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
        thisDesigner = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true }))[0];

        selectedDesid = this.getAttribute("target").split(' ')[1].trim();
        selectedDesigner = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: selectedDesid } }, "/getDesigners", { equal: true }))[0];

        x = Number(project.service.serid.split('_')[1].replace(/[^0-9]/g, '').replace(/^0/, '')) - 1;
        y = project.service.xValue === 'M' ? 0 : (project.service.xValue === 'B' ? 1 : 2);

        if (project.service.online) {
          designerAble = (selectedDesigner.analytics.construct.level >= x) && selectedDesigner.analytics.project.online;
        } else {
          designerAble = (selectedDesigner.analytics.construct.level >= x);
        }

        if (designerAble) {
          if (window.confirm("디자이너를 바꾸시겠습니까? 추가 견적이 발생할 경우, 고객님께 추가 견적에 대한 안내 알림톡이 자동으로 발송됩니다!")) {
            GeneralJs.ajaxJson({ proid, method: (!project.service.online ? "offline" : "online"), desid: selectedDesigner.desid }, PYTHONHOST + "/designerConverting").then(() => {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + (currentMode === "card" ? "?proid=" + proid : "");
            }).catch((err) => {
              throw new Error(err.message);
            });
            input.style.transition = "0s all ease";
            input.style.color = "transparent";
            input.value = selectedDesigner.designer + " " + selectedDesigner.desid;
            input.parentElement.style.transition = "";
            input.parentElement.style.color = "inherit";
            mother.removeChild(document.querySelector(".divTong"));
          }
        } else {
          window.alert("이 디자이너는 해당 서비스를 운용할 수 없습니다!");
        }

      } catch (e) {
        console.log(e);
      }
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 590;
    if (width === '' || Number.isNaN(width)) {
      width = "600";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: String(0) + ea,
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: String(0) + ea,
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [];
    for (let z = 0; z < 5; z++) {
      buttonDetailStyles.push({
        position: "absolute",
        left: String(20 * z) + '%',
        top: String(0) + ea,
        width: "calc(" + String(20) + '%' + " - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: GeneralJs.colorChip.green,
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      });
    }

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < valuesTong[i].length; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget");
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("switch", "off");
        input_clone.setAttribute("target", valuesTong[i][z].replace(/\<[^\<\>]+\>/g, ''));
        input_clone.insertAdjacentHTML("beforeend", valuesTong[i][z]);
        input_clone.addEventListener("click", endEvent);
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const designerToString = async function (value) {
    try {
      const designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: value.trim() } }, "/getDesigners"))[0];
      return designer.designer + " " + designer.desid;
    } catch (e) {
      console.log(e);
    }
  };

  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;
    let dropCase;
    let processCase;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ "대기", "홀딩", "완료", "진행중", "드랍" ];
      processCase = [];
      dropCase = [];

      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "홀딩" || finalValue === "드랍") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const remainPureToObject = function (value, pastValue, vaildMode) {
    let result;
    let boo = false;
    let num;

    if (typeof value === "string") {
      num = Number(value.replace(/[^0-9\.\-]/g, ''));
    } else {
      num = value;
    }

    if (Number.isNaN(num)) {
      boo = true;
      if (typeof pastValue === "string") {
        result = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
      } else {
        result = pastValue;
      }
    } else {
      boo = false;
      if (typeof value === "string") {
        result = Number(value.replace(/[^0-9\.\-]/g, ''));
      } else {
        result = value;
      }
    }

    if (vaildMode) {
      return { boo: !boo, value: result };
    }

    return Number(result + 165000);
  };

  const callHistoryToObject = function (value, pastValue, vaildMode) {
    const filter = function (value) {
      let filteredValue, temp, tempArr, today;

      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
        filteredValue = "20" + value;
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
        today = new Date();
        filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
      } else {
        filteredValue = value;
      }

      return filteredValue;
    };

    let arr = [];
    let filteredValue;
    let filteredArr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    temp = value.split(", ");
    for (let i of temp) {
      filteredValue = filter(i);
      filteredArr.push(filteredValue);
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(filteredValue)) {
        boo = true;
      }
    }

    if (!boo) {
      temp = filteredArr;
    } else {
      temp = pastValue.split(", ");
    }

    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };
    }

    if (temp[0] === '') {
      return [];
    }

    temp.reverse();

    for (let i of temp) {
      temp2 = i.split("-");
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));
      arr.push({ date: obj, who: "" });
    }

    return arr;
  };
  const callHistoryInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;

    endEvent = function (e) {
      let inputs = this.parentElement.parentElement.querySelectorAll(".inputTarget");
      let totalString = '';
      for (let i = inputs.length - 1; i > -1; i--) {
        if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(inputs[i].value))) {
          totalString += DataPatch.toolsDateFilter(inputs[i].value);
          totalString += ", ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -2);
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: GeneralJs.colorChip.green,
      fontSize: "inherit",
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: GeneralJs.colorChip.whiteBlack,
      zIndex: String(3),
      textAlign: "center",
      background: GeneralJs.colorChip.green,
      width: String(width) + ea,
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(5) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = length - 1; i > -1; i--) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus(GeneralJs.colorChip.green));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    });
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const discountToObject = function (value, pastValue, vaildMode) {
    let number;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    return (Number((value.split('%')[0]).replace(/[^0-9]/gi, '')) / 100);
  };
  const discountInputFunction = function (mother, input, callback) {
    const ea = "px";
    const percentageValueInputClassName = "percentageValueInputClassName";
    const supplyValueInputClassName = "supplyValueInputClassName";
    const consumerValueInputClassName = "consumerValueInputClassName";
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;
    let supplyConsumer;
    let percentage, supply, consumer;
    let supplyOriginal, consumerOriginal;
    let proid;

    proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
    if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
      proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
    }

    GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }).then((projects) => {
      const [ project ] = projects;

      originalValue = input.value;

      [ percentage, supplyConsumer ] = originalValue.replace(/ /gi, '').split('%');
      [ supply, consumer ] = supplyConsumer.split('/');

      percentage = Number(percentage.replace(/[^0-9\.\-]/gi, ''));
      supply = Number(supply.replace(/[^0-9]/gi, ''));
      consumer = Number(consumer.replace(/[^0-9]/gi, ''));

      supplyOriginal = project.process.contract.remain.calculation.amount.supply + supply;
      consumerOriginal = project.process.contract.remain.calculation.amount.consumer + consumer;

      endEvent = async function (e) {
        try {
          const percentageInput = document.querySelector('.' + percentageValueInputClassName);
          const supplyInput = document.querySelector('.' + supplyValueInputClassName);
          const consumerInput = document.querySelector('.' + consumerValueInputClassName);
          const percentage = Number(percentageInput.value.replace(/[^0-9]/gi, ''));
          const supply = Number(supplyInput.value.replace(/[^0-9]/gi, ''));
          const consumer = Number(consumerInput.value.replace(/[^0-9]/gi, ''));
          const supplyOriginal = Number(supplyInput.getAttribute("original").replace(/[^0-9]/gi, ''));
          const consumerOriginal = Number(consumerInput.getAttribute("original").replace(/[^0-9]/gi, ''));
          let proid, project;
          let whereQuery, updateQuery;
          let discount;
          let desid, designer;
          let newSupply;
          let newVat;
          let newConsumer;
          let res;
          let calculate;

          proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
          if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
            proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          }
          project = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
          desid = project.desid;
          designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true }))[0];

          discount = percentage / 100;
          newSupply = Math.floor((supplyOriginal - supply) / 10) * 10;
          newVat = newSupply * (0.1);
          newConsumer = newSupply + newVat;

          ({ calculate } = await GeneralJs.ajaxJson({
            supply: supplyOriginal,
            classification: designer.information.business.businessInfo.classification,
            percentage: designer.information.business.service.cost.percentage,
            cliid: proid
          }, PYTHONHOST + "/designerCalculation"));

          whereQuery = { proid };
          updateQuery = {};
          updateQuery["process.contract.remain.calculation.amount.supply"] = newSupply;
          updateQuery["process.contract.remain.calculation.amount.vat"] = newVat;
          updateQuery["process.contract.remain.calculation.amount.consumer"] = newConsumer;
          updateQuery["process.contract.remain.calculation.discount"] = discount;
          updateQuery["process.calculation.payments.totalAmount"] = calculate;
          updateQuery["process.calculation.payments.first.amount"] = Math.floor(calculate / 2);
          updateQuery["process.calculation.payments.remain.amount"] = calculate - updateQuery["process.calculation.payments.first.amount"];

          await GeneralJs.ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");
          await GeneralJs.ajaxJson({ proid }, PYTHONHOST + "/stylingAmountSync");

          window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + proid;

        } catch (e) {
          console.log(e);
        }
      };

      input.value = "입력중";
      if (input.parentElement.childNodes[0].nodeType === 3) {
        input.parentElement.style.transition = "0s all ease";
        input.parentElement.style.color = "transparent";
      }

      mother.style.overflow = "";
      height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
      fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
      width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
      if (width === '' || Number.isNaN(width)) {
        width = String(300);
      }
      top = height * 0.5;
      iconWidth = 18;

      buttonStyle = {
        display: "block",
        position: "relative",
        left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
        width: String(width) + ea,
        paddingTop: String(height * 0.3) + ea,
        height: String(height * 1.5) + ea,
        fontSize: "inherit",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        animation: "fadeuplite 0.3s ease forwards",
        marginBottom: String(height / 4) + ea,
      };

      buttonDetailStyles = [
        {
          position: "absolute",
          left: String(0) + ea,
          top: String(0) + ea,
          width: "28%",
          height: "100%",
          background: GeneralJs.colorChip.green,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          fontSize: "inherit",
          boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
        },
        {
          position: "absolute",
          right: String(0) + ea,
          top: String(0) + ea,
          width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
          height: "100%",
          background: GeneralJs.colorChip.green,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          fontSize: "inherit",
          boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
        },
      ];

      inputStyle = {
        position: "absolute",
        fontSize: "inherit",
        fontWeight: String(400),
        color: GeneralJs.colorChip.whiteBlack,
        zIndex: String(3),
        textAlign: "center",
        background: "transparent",
        width: "100%",
        height: (GeneralJs.isMac() ? "95%" : "98%"),
        left: String(0) + ea,
        top: String(GeneralJs.isMac() ? 0 : 2) + ea,
        borderRadius: String(3) + ea,
        outline: String(0),
        border: String(0),
      };

      GeneralJs.createNode({
        mother,
        class: [ "removeTarget", "divTong" ],
        style: {
          display: "block",
          position: "absolute",
          top: String((height * 2) - top) + ea,
          left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
          width: String(width) + ea,
          textAlign: "center",
          fontSize: "inherit",
          zIndex: String(3),
          paddingBottom: String(iconWidth + 3) + ea,
        },
        children: [
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "%"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ percentageValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newPercentage = Number(this.value);
                          const supplyTarget = document.querySelector('.' + supplyValueInputClassName);
                          const consumerTarget = document.querySelector('.' + consumerValueInputClassName);
                          const supplyOriginal = Number(supplyTarget.getAttribute("original"));
                          const consumerOriginal = Number(consumerTarget.getAttribute("original"));
                          supplyTarget.value = GeneralJs.autoComma(Math.floor((supplyOriginal / 100) * newPercentage)) + "원";
                          consumerTarget.value = GeneralJs.autoComma(Math.floor((consumerOriginal / 100) * newPercentage)) + "원";
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: String(Math.floor(percentage))
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "공급가"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ supplyValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newSupply = Number(this.value);
                          const percentageTarget = document.querySelector('.' + percentageValueInputClassName);
                          const consumerTarget = document.querySelector('.' + consumerValueInputClassName);
                          const supplyOriginal = Number(this.getAttribute("original"));
                          const consumerOriginal = Number(consumerTarget.getAttribute("original"));
                          const newPercentage = (newSupply / supplyOriginal) * 100;
                          this.value = GeneralJs.autoComma(Math.floor(newSupply)) + "원";
                          consumerTarget.value = GeneralJs.autoComma(Math.floor((consumerOriginal / 100) * newPercentage)) + "원";
                          percentageTarget.value = String(Math.round(newPercentage * 100) / 100);
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(Math.floor(supply)) + "원",
                      original: String(supplyOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "소비자가"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ consumerValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newConsumer = Number(this.value);
                          const percentageTarget = document.querySelector('.' + percentageValueInputClassName);
                          const supplyTarget = document.querySelector('.' + supplyValueInputClassName);
                          const supplyOriginal = Number(supplyTarget.getAttribute("original"));
                          const consumerOriginal = Number(this.getAttribute("original"));
                          const newPercentage = (newConsumer / consumerOriginal) * 100;
                          this.value = GeneralJs.autoComma(Math.floor(newConsumer)) + "원";
                          supplyTarget.value = GeneralJs.autoComma(Math.floor((supplyOriginal / 100) * newPercentage)) + "원";
                          percentageTarget.value = String(Math.round(newPercentage * 100) / 100);
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(Math.floor(consumer)) + "원",
                      original: String(consumerOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "정가(공)"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(supplyOriginal) + '원',
                      original: String(supplyOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "정가(소)"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(consumerOriginal) + '원',
                      original: String(consumerOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            mode: "svg",
            source: GeneralJs.prototype.returnOk(GeneralJs.colorChip.green),
            event: {
              click: endEvent
            },
            style: {
              position: "absolute",
              bottom: String(0),
              width: String(iconWidth) + ea,
              left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
              cursor: "pointer"
            }
          }
        ]
      });

    }).catch((err) => {
      console.log(err);
    });
  };

  const discountDesignerToObject = function (value, pastValue, vaildMode) {
    let number;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    return (Number((value.split('%')[0]).replace(/[^0-9]/gi, '')) / 100);
  };
  const discountDesignerInputFunction = function (mother, input, callback) {
    const ea = "px";
    const percentageValueInputClassName = "percentageValueInputClassName";
    const supplyValueInputClassName = "supplyValueInputClassName";
    const consumerValueInputClassName = "consumerValueInputClassName";
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;
    let supplyConsumer;
    let percentage, supply, consumer;
    let supplyOriginal, consumerOriginal;
    let proid;

    proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
    if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
      proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
    }

    GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }).then((projects) => {
      const [ project ] = projects;

      originalValue = input.value;

      [ percentage, supplyConsumer ] = originalValue.replace(/ /gi, '').split('%');
      [ supply, consumer ] = supplyConsumer.split('/');

      percentage = Number(percentage.replace(/[^0-9\.\-]/gi, ''));
      supply = Number(supply.replace(/[^0-9]/gi, ''));
      consumer = Number(consumer.replace(/[^0-9]/gi, ''));

      supplyOriginal = project.process.contract.remain.calculation.amount.supply + supply;
      consumerOriginal = project.process.contract.remain.calculation.amount.consumer + consumer;

      endEvent = async function (e) {
        try {
          const percentageInput = document.querySelector('.' + percentageValueInputClassName);
          const supplyInput = document.querySelector('.' + supplyValueInputClassName);
          const consumerInput = document.querySelector('.' + consumerValueInputClassName);
          const percentage = Number(percentageInput.value.replace(/[^0-9]/gi, ''));
          const supply = Number(supplyInput.value.replace(/[^0-9]/gi, ''));
          const consumer = Number(consumerInput.value.replace(/[^0-9]/gi, ''));
          const supplyOriginal = Number(supplyInput.getAttribute("original").replace(/[^0-9]/gi, ''));
          const consumerOriginal = Number(consumerInput.getAttribute("original").replace(/[^0-9]/gi, ''));
          let proid, project;
          let whereQuery, updateQuery;
          let discount;
          let desid, designer;
          let newSupply;
          let newVat;
          let newConsumer;
          let res;
          let calculate;

          proid = mother.parentElement.className.replace(/(p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z])/g, (match, proid) => { return proid.trim(); });
          if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g.test(proid)) {
            proid = mother.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
          }
          project = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true }))[0];
          desid = project.desid;
          designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true }))[0];

          discount = percentage / 100;
          newSupply = Math.floor((supplyOriginal - supply) / 10) * 10;
          newVat = newSupply * (0.1);
          newConsumer = newSupply + newVat;

          ({ calculate } = await GeneralJs.ajaxJson({
            supply: newSupply,
            classification: designer.information.business.businessInfo.classification,
            percentage: designer.information.business.service.cost.percentage,
            cliid: proid
          }, PYTHONHOST + "/designerCalculation"));

          whereQuery = { proid };
          updateQuery = {};
          updateQuery["process.contract.remain.calculation.amount.supply"] = newSupply;
          updateQuery["process.contract.remain.calculation.amount.vat"] = newVat;
          updateQuery["process.contract.remain.calculation.amount.consumer"] = newConsumer;
          updateQuery["process.contract.remain.calculation.discount"] = discount;
          updateQuery["process.calculation.payments.totalAmount"] = calculate;
          updateQuery["process.calculation.payments.first.amount"] = Math.floor(calculate / 2);
          updateQuery["process.calculation.payments.remain.amount"] = calculate - updateQuery["process.calculation.payments.first.amount"];

          await GeneralJs.ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");
          await GeneralJs.ajaxJson({ proid }, PYTHONHOST + "/stylingAmountSync");

          window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + proid;

        } catch (e) {
          console.log(e);
        }
      };

      input.value = "입력중";
      if (input.parentElement.childNodes[0].nodeType === 3) {
        input.parentElement.style.transition = "0s all ease";
        input.parentElement.style.color = "transparent";
      }

      mother.style.overflow = "";
      height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
      fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
      width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
      if (width === '' || Number.isNaN(width)) {
        width = String(300);
      }
      top = height * 0.5;
      iconWidth = 18;

      buttonStyle = {
        display: "block",
        position: "relative",
        left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
        width: String(width) + ea,
        paddingTop: String(height * 0.3) + ea,
        height: String(height * 1.5) + ea,
        fontSize: "inherit",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        animation: "fadeuplite 0.3s ease forwards",
        marginBottom: String(height / 4) + ea,
      };

      buttonDetailStyles = [
        {
          position: "absolute",
          left: String(0) + ea,
          top: String(0) + ea,
          width: "28%",
          height: "100%",
          background: GeneralJs.colorChip.green,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          fontSize: "inherit",
          boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
        },
        {
          position: "absolute",
          right: String(0) + ea,
          top: String(0) + ea,
          width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
          height: "100%",
          background: GeneralJs.colorChip.green,
          zIndex: String(3),
          borderRadius: String(3) + ea,
          fontSize: "inherit",
          boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
        },
      ];

      inputStyle = {
        position: "absolute",
        fontSize: "inherit",
        fontWeight: String(400),
        color: GeneralJs.colorChip.whiteBlack,
        zIndex: String(3),
        textAlign: "center",
        background: "transparent",
        width: "100%",
        height: (GeneralJs.isMac() ? "95%" : "98%"),
        left: String(0) + ea,
        top: String(GeneralJs.isMac() ? 0 : 2) + ea,
        borderRadius: String(3) + ea,
        outline: String(0),
        border: String(0),
      };

      GeneralJs.createNode({
        mother,
        class: [ "removeTarget", "divTong" ],
        style: {
          display: "block",
          position: "absolute",
          top: String((height * 2) - top) + ea,
          left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
          width: String(width) + ea,
          textAlign: "center",
          fontSize: "inherit",
          zIndex: String(3),
          paddingBottom: String(iconWidth + 3) + ea,
        },
        children: [
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "%"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ percentageValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newPercentage = Number(this.value);
                          const supplyTarget = document.querySelector('.' + supplyValueInputClassName);
                          const consumerTarget = document.querySelector('.' + consumerValueInputClassName);
                          const supplyOriginal = Number(supplyTarget.getAttribute("original"));
                          const consumerOriginal = Number(consumerTarget.getAttribute("original"));
                          supplyTarget.value = GeneralJs.autoComma(Math.floor((supplyOriginal / 100) * newPercentage)) + "원";
                          consumerTarget.value = GeneralJs.autoComma(Math.floor((consumerOriginal / 100) * newPercentage)) + "원";
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: String(Math.floor(percentage))
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "공급가"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ supplyValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newSupply = Number(this.value);
                          const percentageTarget = document.querySelector('.' + percentageValueInputClassName);
                          const consumerTarget = document.querySelector('.' + consumerValueInputClassName);
                          const supplyOriginal = Number(this.getAttribute("original"));
                          const consumerOriginal = Number(consumerTarget.getAttribute("original"));
                          const newPercentage = (newSupply / supplyOriginal) * 100;
                          this.value = GeneralJs.autoComma(Math.floor(newSupply)) + "원";
                          consumerTarget.value = GeneralJs.autoComma(Math.floor((consumerOriginal / 100) * newPercentage)) + "원";
                          percentageTarget.value = String(Math.round(newPercentage * 100) / 100);
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(Math.floor(supply)) + "원",
                      original: String(supplyOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "소비자가"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    class: [ consumerValueInputClassName ],
                    event: {
                      keyup: function (e) {
                        if (e.key === "Enter") {
                          this.blur();
                        }
                      },
                      blur: function (e) {
                        this.value = this.value.replace(/[^0-9\.\-]/gi, '');
                        if (Number.isNaN(Number(this.value))) {
                          window.alert("숫자만 입력해주세요!");
                        } else {
                          const newConsumer = Number(this.value);
                          const percentageTarget = document.querySelector('.' + percentageValueInputClassName);
                          const supplyTarget = document.querySelector('.' + supplyValueInputClassName);
                          const supplyOriginal = Number(supplyTarget.getAttribute("original"));
                          const consumerOriginal = Number(this.getAttribute("original"));
                          const newPercentage = (newConsumer / consumerOriginal) * 100;
                          this.value = GeneralJs.autoComma(Math.floor(newConsumer)) + "원";
                          supplyTarget.value = GeneralJs.autoComma(Math.floor((supplyOriginal / 100) * newPercentage)) + "원";
                          percentageTarget.value = String(Math.round(newPercentage * 100) / 100);
                        }
                      }
                    },
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(Math.floor(consumer)) + "원",
                      original: String(consumerOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "정가(공)"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(supplyOriginal) + '원',
                      original: String(supplyOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              ...buttonStyle
            },
            children: [
              {
                style: {
                  ...buttonDetailStyles[0]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: "정가(소)"
                    },
                    style: {
                      ...inputStyle,
                      cursor: "pointer"
                    }
                  }
                ]
              },
              {
                style: {
                  ...buttonDetailStyles[1]
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: GeneralJs.autoComma(consumerOriginal) + '원',
                      original: String(consumerOriginal)
                    },
                    style: {
                      ...inputStyle
                    }
                  }
                ]
              }
            ]
          },
          {
            mode: "svg",
            source: GeneralJs.prototype.returnOk(GeneralJs.colorChip.green),
            event: {
              click: endEvent
            },
            style: {
              position: "absolute",
              bottom: String(0),
              width: String(iconWidth) + ea,
              left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
              cursor: "pointer"
            }
          }
        ]
      });

    }).catch((err) => {
      console.log(err);
    });
  };

  const map = {
    proid: { name: "아이디", position: "proid", type: "string", searchBoo: true, },
    cliid: { name: "고객", position: "cliid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },
    designer: { name: "디자이너", position: "desid", type: "object", inputFunction: designerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: designerToString.toString().replace(/\}$/, '').replace(/async function \(value\) \{/gi, ''), stringFunctionAsync: true, searchBoo: true, },
    service: { name: "서비스", position: "service", type: "object", inputFunction: serviceInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: serviceToString.toString().replace(/\}$/, '').replace(/function \(value\) \{/gi, ''), searchBoo: true, },
    status: { name: "진행 상태", position: "process.status", type: "object", items: [ '대기', '진행중', '완료', '홀딩', '드랍' ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "process.action", type: "string", items: [
      "계약금 안내",
      "현장미팅 조율",
      "현장미팅 확정",
      "의뢰서 공유",
      "현장미팅 피드백",
      "잔금 안내",
      "시작 대기",
      "1차 제안",
      "수정 제안",
      "시공 진행",
      "제품 구매",
      "추가 제안",
      "배송중",
      "세팅 마무리",
      "촬영 컨택",
      "사진 업로드",
      "디자이너글 업로드",
      "증빙 처리",
      "정산 대기",
      "프로젝트 완료",
      "해당 없음"
    ], itemMap: [
      [
        "계약 대기",
        [
          [ "계약금 안내" ],
          [ "현장미팅 조율", "현장미팅 확정" ],
          [ "의뢰서 공유" ],
          [ "현장미팅 피드백", "잔금 안내" ],
        ]
      ],
      [
        "프로젝트 진행중",
        [
          [ "시작 대기" ],
          [ "1차 제안", "수정 제안" ],
          [ "시공 진행" ],
          [ "제품 구매", "추가 제안", "배송중" ],
          [ "세팅 마무리", "촬영 컨택" ],
          [ "사진 업로드", "디자이너글 업로드" ],
          [ "증빙 처리", "정산 대기" ],
          [ "프로젝트 완료" ],
        ]
      ],
      [
        "해당 없음",
        [
          [ "해당 없음" ]
        ]
      ]
    ], itemDescription: [
      {
        name: "계약금 안내",
        description: "아직 계약금을 내지 않는 고객님께 계약금 결제 안내를 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "현장미팅 조율",
        description: "고객님이 계약금을 지불하시면, 현장 미팅을 위해 디자이너와 시간과 장소를 맞추는 단계입니다.",
        pannel: []
      },
      {
        name: "현장미팅 확정",
        description: "현장 미팅의 시간과 공간이 조율되고 확정되어 현장 미팅을 대기하고 있는 단계입니다.",
        pannel: []
      },
      {
        name: "의뢰서 공유",
        description: "홈리에종에서 홈스타일링 의뢰서를 작성하여 해당 디자이너님께 의뢰서를 전송해드리는 단계입니다.",
        pannel: [
          {
            name: "의뢰서 확인",
            event: (function (e) {
              const { proid, cliid, desid, action, requestNumber, thisUrl } = e.__data__;
              const { blankHref } = GeneralJs;
              blankHref(thisUrl + "&mode=request&cliid=" + cliid);
            }).toString().trim().replace(/^function[^\(]*\([^\)]*\)[^\{]*\{\n?/i, '').replace(/\n?[ ]*\}$/i, '').trim()
          }
        ]
      },
      {
        name: "현장미팅 피드백",
        description: "현장 미팅이 끝나고 고객님과 디자이너님의 피드백과 진행 여부를 홈리에종이 받는 단계입니다.",
        pannel: []
      },
      {
        name: "잔금 안내",
        description: "현장 미팅 후 진행을 결정하신 고객님께 디자인비 잔금을 요청드리는 단계입니다.",
        pannel: []
      },
      {
        name: "시작 대기",
        description: "고객님의 잔금 결제가 모두 완료되고 프로젝트 시작 전까지 대기하고 있는 단계입니다.",
        pannel: [
          {
            name: "상세 일정 기입",
            event: (function (e) {
              const { proid, cliid, desid, action, requestNumber, thisUrl } = e.__data__;
              const { blankHref } = GeneralJs;
              blankHref(thisUrl + "&mode=schedule&cliid=" + cliid);
            }).toString().trim().replace(/^function[^\(]*\([^\)]*\)[^\{]*\{\n?/i, '').replace(/\n?[ ]*\}$/i, '').trim()
          }
        ]
      },
      {
        name: "1차 제안",
        description: "프로젝트가 시작되고 디자이너가 본격적인 디자인 작업을 하는 기간과 제안을 드리는 단계입니다.",
        pannel: []
      },
      {
        name: "수정 제안",
        description: "디자인 제안에 대해서 고객님과 디자이너가 소통을 통해 수정 작업을 거치는 단계입니다.",
        pannel: []
      },
      {
        name: "시공 진행",
        description: "디자인에 의해 정해진 시공 리스트에 맞춰 고객님이 시공사를 선택하고 계약을 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "제품 구매",
        description: "디자이너가 제품 리스트를 고객님께 드리고, 그 리스트에 맞춰 제품 구매를 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "배송중",
        description: "제품의 배송을 기다리고, 제작 제품의 완성을 기다리고 세팅을 대기하고 있는 단계입니다.",
        pannel: []
      },
      {
        name: "세팅 마무리",
        description: "제품 배송과 제작이 모두 끝나고 디자인안대로 모든 제품의 세팅을 완료하는 단계입니다.",
        pannel: []
      },
      {
        name: "촬영 컨택",
        description: "세팅의 완료 후 촬영을 위해 디자이너와 작가, 고객님의 일정을 조율하는 단계입니다.",
        pannel: []
      },
      {
        name: "해당 없음",
        description: "해당 없음"
      },
    ], searchBoo: true, },
    next: { name: "전화 예정일", position: "process.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "process.call.history", type: "object", inputFunction: callHistoryInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    firstDate: { name: "계약금 입금", position: "process.contract.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstCancel: { name: "계약금 취소", position: "process.contract.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstAmount: { name: "계약금", position: "process.contract.first.calculation.amount", type: "number", searchBoo: true, moneyBoo: true, constant: true },
    firstInfo: { name: "계약금 정보", position: "process.contract.first.calculation.info", type: "object", inputFunction: methodInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    firstRefund: { name: "계약금 환불액", position: "process.contract.first.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    meetingDate: { name: "1차 미팅", position: "process.contract.meeting.date", type: "date", detailDate: true, searchBoo: true, yesNo: [ "Y", "N" ], calendar: function (thisCase) {
      const id = thisCase.proid;
      const to = "designerMeeting";
      const designer = ((thisCase.designer.split(" "))[0]).trim();
      const title = "현장 미팅 W " + thisCase.name + "C " + designer + "D " + thisCase.proid;
      return { id: id, to: to, title: title };
    }, },
    remainDate: { name: "잔금 입금", position: "process.contract.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    remainCancel: { name: "잔금 취소", position: "process.contract.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    remainSupply: { name: "공급가", position: "process.contract.remain.calculation.amount.supply", type: "number", searchBoo: true, moneyBoo: true },
    remainVat: { name: "VAT", position: "process.contract.remain.calculation.amount.vat", type: "number", searchBoo: true, moneyBoo: true },
    remainConsumer: { name: "소비자가", position: "process.contract.remain.calculation.amount.consumer", type: "number", searchBoo: true, moneyBoo: true },
    address: { name: "고객 주소", position: "null", type: "constant", searchBoo: false },
    spaceContract: { name: "계약 상태", position: "null", type: "constant", searchBoo: false },
    pyeong: { name: "평형", position: "null", type: "constant", searchBoo: false },
    evaluationSend: { name: "평가 전송", position: "null", type: "constant", searchBoo: false },
    evaluationResult: { name: "평가 완료", position: "null", type: "constant", searchBoo: false },
    remainPure: { name: "잔금", position: "process.contract.remain.calculation.amount.consumer", type: "object", objectFunction: remainPureToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, moneyBoo: true },
    remainInfo: { name: "잔금 정보", position: "process.contract.remain.calculation.info", type: "object", inputFunction: methodInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    remainRefund: { name: "계약금 환불액", position: "process.contract.remain.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    discount: { name: "할인율(홈)", position: "process.contract.remain.calculation.discount", type: "object", inputFunction: discountInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: discountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true },
    discountDesigner: { name: "할인율(디)", position: "process.contract.remain.calculation.discount", type: "object", inputFunction: discountDesignerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: discountDesignerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true },
    formDateFrom: { name: "프로젝트 시작일", position: "process.contract.form.date.from", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateTo: { name: "프로젝트 종료일", position: "process.contract.form.date.to", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateCancel: { name: "계약 취소", position: "process.contract.form.date.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    method: { name: "정산 방식", position: "process.calculation.method", type: "string", items: [ "사업자(일반)", "사업자(간이)", "프리랜서" ], searchBoo: true, },
    percentage: { name: "수수료", position: "process.calculation.percentage", type: "number", searchBoo: true, },
    calculationInfo: { name: "정산 정보", position: "process.calculation.info", type: "object", inputFunction: accountInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: accountToString.toString().replace(/\}$/, '').replace(/function \(value\) \{/gi, ''), searchBoo: true, },
    paymentsTotalAmount: { name: "정산 총금액", position: "process.calculation.payments.totalAmount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstAmount: { name: "디자이너 선금", position: "process.calculation.payments.first.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstDate: { name: "선금 지급일", position: "process.calculation.payments.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    paymentsFirstCancel: { name: "선금 환수일", position: "process.calculation.payments.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsFirstRefund: { name: "선금 환수액", position: "process.calculation.payments.first.refund", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainAmount: { name: "디자이너 잔금", position: "process.calculation.payments.remain.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainDate: { name: "잔금 지급일", position: "process.calculation.payments.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    paymentsRemainCancel: { name: "잔금 환수일", position: "process.calculation.payments.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsRemainRefund: { name: "잔금 환수액", position: "process.calculation.payments.remain.refund", type: "number", searchBoo: true, moneyBoo: true },
    photoStatus: { name: "촬영 상태", position: "contents.photo.status", type: "string", items: [ '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ], searchBoo: true, },
    contentsPhotoDate: { name: "촬영일", position: "contents.photo.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
  };
  return map;
}

module.exports = DataPatch;
