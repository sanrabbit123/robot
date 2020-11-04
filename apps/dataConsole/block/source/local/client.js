const ClientJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
}

ClientJs.prototype.standardBar = function (standard) {
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition;

  temp = {
    cliid: standard.standard.cliid.name,
    name: standard.standard.name.name
  };
  target = standard.data;
  target.unshift(temp);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "relative",
    background: "#f7f7f7",
    top: String(0),
    left: String(0),
    width: String(200) + ea,
    zIndex: String(2),
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  style2 = {
    display: "block",
    position: "fixed",
    height: String(38) + ea,
    paddingTop: String(35) + ea,
    top: String(0) + ea,
    zIndex: String(1),
    background: "#f7f7f7",
    width: style.width,
  };

  style3 = {
    position: "absolute",
    height: String(38) + ea,
    fontSize: String(14) + ea,
    fontWeight: String(600),
    color: "#2fa678",
  };

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.style.height = String(38 + 35) + ea;
  div_clone.appendChild(div_clone2);

  leftPosition = [
    40,
    135,
  ];

  num = 0;
  for (let { cliid, name } of target) {
    if (num === 1) {
      style2.position = "relative";
      style3.color = "#404040";
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      leftPosition = [
        35,
        128,
      ];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = cliid;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[0]) + ea;
    div_clone2.appendChild(div_clone3);

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.textContent = name;
    for (let i in style3) {
      div_clone3.style[i] = style3[i];
    }
    div_clone3.style.left = String(leftPosition[1]) + ea;
    div_clone2.appendChild(div_clone3);

    if (num !== 0) {
      this.cases.push({ cliid, name });
    } else {
      this.cases.push(null);
    }
    div_clone.appendChild(div_clone2);
    num++;
  }

  this.totalMother.appendChild(div_clone);
}

ClientJs.prototype.infoArea = function (info) {
  let div_clone, div_clone2, div_clone3;
  let style, style2, style3;
  let ea = "px";
  let temp, target;
  let num, leftPosition, widthArr;
  let columns;
  const grayBarWidth = 200;
  let upsideWhiteBar;
  let eventFunction;

  temp = {};
  columns = [];
  leftPosition = [];
  widthArr = [];
  for (let i in info.standard) {
    temp[i] = info.standard[i].name;
    columns.push(i);
    widthArr.push(info.standard[i].width);
    leftPosition.push(info.standard[i].left);
  }

  target = info.data;
  target.unshift(temp);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "absolute",
    top: String(0),
    left: String(grayBarWidth) + ea,
    width: `5000px`,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  style2 = {
    display: "block",
    position: "fixed",
    height: String(38) + ea,
    paddingTop: String(35) + ea,
    top: String(0) + ea,
    zIndex: String(1),
    background: "#ffffff",
    width: style.width,
    left: style.left,
  };
  style3 = {
    position: "absolute",
    marginBottom: String(18) + ea,
    height: String(20) + ea,
    fontSize: String(14) + ea,
    fontWeight: String(600),
    color: "#2fa678",
    textAlign: "center",
    overflow: "hidden",
    cursor: "pointer",
  };

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.style.height = String(38 + 35) + ea;
  div_clone.appendChild(div_clone2);

  num = 0;
  eventFunction = function (left) {
    return function (e) {
      const targets = document.querySelectorAll(".moveTarget");
      const ea = "px";
      for (let target of targets) {
        target.style.transform = "translateX(" + String(left * -1) + ea + ")";
        if (Number(target.style.transform.replace(/[^0-9\-]/g, '')) > 0) {
          target.style.transform = "translateX(0px)";
        } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-]/g, ''))) {
          target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
        }
      }
    }
  }
  for (let obj of target) {
    if (num === 1) {
      style3.fontWeight = "500";
      style3.color = "#404040";
      style2.position = "relative";
      delete style2.paddingTop;
      delete style2.zIndex;
      delete style2.background;
      delete style2.width;
      delete style2.left;
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style2) {
      div_clone2.style[i] = style2[i];
    }

    for (let z = 0; z < columns.length; z++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.textContent = obj[columns[z]];
      for (let i in style3) {
        div_clone3.style[i] = style3[i];
      }
      div_clone3.style.width = String(widthArr[z]) + ea;
      div_clone3.style.left = String(leftPosition[z]) + ea;
      div_clone3.addEventListener("click", eventFunction(leftPosition[z] - (window.innerWidth / 2) + grayBarWidth));
      div_clone2.appendChild(div_clone3);
    }

    if (num === 0) {
      upsideWhiteBar = div_clone2;
      upsideWhiteBar.classList.add("moveTarget");
      this.totalMother.appendChild(upsideWhiteBar);
    } else {
      this.cases[num] = ({ ...this.cases[num], ...obj });
      div_clone.appendChild(div_clone2);
    }
    num++;
  }

  div_clone.classList.add("moveTarget");
  upsideWhiteBar.style.width = div_clone.style.width = String(grayBarWidth + leftPosition[leftPosition.length - 1] + widthArr[widthArr.length - 1]) + ea;

  this.totalMother.appendChild(div_clone);
}

ClientJs.prototype.spreadData = async function () {
  const instance = this;
  try {
    const clients = JSON.parse(await GeneralJs.ajaxPromise("limit=100", "/getClients"));
    const { standard, data } = clients;
    let totalMother;

    let standardDataTong = [], infoDataTong = [];
    for (let i of data) {
      standardDataTong.push(i.standard);
      infoDataTong.push(i.info);
    }

    totalMother = GeneralJs.nodes.div.cloneNode(true);
    totalMother.classList.add("totalMother");
    this.totalContents.appendChild(totalMother);
    this.totalMother = totalMother;

    this.standardBar({ standard: standard.standard, data: standardDataTong });
    this.infoArea({ standard: standard.info, data: infoDataTong });

  } catch (e) {
    console.log(e);
  }
}

ClientJs.prototype.cardViewMaker = function () {
  const instance = this;
  const { cases, totalContents, totalMother } = this;
  return function (e) {
    if (instance.totalFather !== null) {
      instance.totalFather.style.zIndex = String(1);
      instance.totalMother.classList.remove("fadein");
      instance.totalMother.classList.add("fadeout");
      instance.totalFather.classList.remove("fadeout");
      instance.totalFather.classList.add("fadein");
    } else {
      totalMother.classList.add("fadeout");

      let totalFather;
      let style;
      let nameStyle, cliidStyle, barStyle, phoneStyle, addressStyle, timeLineStyle, budgetStyle;
      let div_clone, div_clone2;
      let size, margin;
      let ea = "px";
      let num;
      let intend, totalWidth;
      let lineHeight, startTop;

      totalFather = GeneralJs.nodes.div.cloneNode(true);
      totalFather.classList.add("totalFather");

      margin = 20;
      lineHeight = 22;
      size = ((window.innerWidth - (margin * 8.5)) / 6);
      intend = 25;
      startTop = 51;
      totalWidth = size - (intend * 2) - 1;
      style = {
        display: "inline-block",
        position: "relative",
        width: String(size) + ea,
        height: String(size) + ea,
        marginLeft: String(margin) + ea,
        marginTop: String(margin) + ea,
        background: "#f7f7f7",
        borderRadius: String(5) + ea,
      };

      nameStyle = {
        position: "absolute",
        fontSize: String(23) + ea,
        fontWeight: String(200),
        top: String(18) + ea,
        left: String(intend) + ea,
        color: "#404040",
      };

      cliidStyle = {
        position: "absolute",
        fontSize: String(14) + ea,
        fontWeight: String(600),
        top: String(30) + ea,
        left: String(94) + ea,
        color: "#2fa678",
      };

      barStyle = {
        position: "absolute",
        background: "#ececec",
        top: String(startTop + 3) + ea,
        left: String(intend) + ea,
        width: String(totalWidth) + ea,
        height: String(1) + ea,
      };

      timeLineStyle = {
        position: "absolute",
        fontSize: String(14) + ea,
        fontWeight: String(500),
        top: String(startTop + lineHeight) + ea,
        left: String(intend) + ea,
        color: "#404040",
      };

      phoneStyle = {
        position: "absolute",
        fontSize: String(14) + ea,
        fontWeight: String(500),
        top: String(startTop + (lineHeight * 2)) + ea,
        left: String(intend) + ea,
        color: "#404040",
      };

      budgetStyle = {
        position: "absolute",
        fontSize: String(14) + ea,
        fontWeight: String(500),
        top: String(startTop + (lineHeight * 3)) + ea,
        left: String(intend) + ea,
        color: "#404040",
      }

      addressStyle = {
        position: "absolute",
        fontSize: String(14) + ea,
        fontWeight: String(500),
        top: String(151) + ea,
        left: String(intend) + ea,
        color: "#404040",
        width: String(totalWidth) + ea,
        lineHeight: String(1.5),
      };

      num = 0;
      for (let obj of cases) {
        if (num !== 0) {
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          //name
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.name;
          for (let i in nameStyle) {
            div_clone2.style[i] = nameStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //cliid
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.cliid;
          for (let i in cliidStyle) {
            div_clone2.style[i] = cliidStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //bar
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          for (let i in barStyle) {
            div_clone2.style[i] = barStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //timeline
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.timeline;
          for (let i in timeLineStyle) {
            div_clone2.style[i] = timeLineStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //phone
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.phone;
          for (let i in phoneStyle) {
            div_clone2.style[i] = phoneStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //budget
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.budget;
          for (let i in budgetStyle) {
            div_clone2.style[i] = budgetStyle[i];
          }
          div_clone.appendChild(div_clone2);

          //address
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.textContent = obj.address;
          for (let i in addressStyle) {
            div_clone2.style[i] = addressStyle[i];
          }
          div_clone.appendChild(div_clone2);

          totalFather.appendChild(div_clone);
        }
        num++;
      }

      totalFather.style.paddingTop = String(margin * 0.75) + ea;
      totalFather.style.paddingLeft = String(margin * 0.75) + ea;
      totalFather.style.paddingRight = String(margin * 0.75) + ea;
      totalFather.style.height = "calc(100vh - 123px - " + String(margin * 0.75) + ea + ")";
      totalFather.style.width = "calc(100vw - " + String(margin * 0.75) + ea + " - " + String(margin * 0.75) + ea + ")";
      totalFather.style.zIndex = String(1);

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.style.height = String(margin * 2) + ea;
      totalFather.appendChild(div_clone);

      totalFather.classList.add("fadein");

      totalContents.appendChild(totalFather);
      instance.totalFather = totalFather;
    }
  }
}

ClientJs.prototype.addTransFormEvent = function () {
  const instance = this;
  const { up, down } = this.mother.belowButtons.square;
  up.addEventListener("click", this.cardViewMaker());
  down.addEventListener("click", function (e) {
    if (instance.totalFather !== null) {
      instance.totalFather.style.zIndex = String(-1);
      instance.totalFather.classList.remove("fadein");
      instance.totalFather.classList.add("fadeout");
      instance.totalMother.classList.remove("fadeout");
      instance.totalMother.classList.add("fadein");
    }
  });
}

ClientJs.prototype.launching = async function () {
  const instance = this;
  try {
    await this.spreadData();
    this.addTransFormEvent();
  } catch (e) {
    console.log(e);
  }
}
