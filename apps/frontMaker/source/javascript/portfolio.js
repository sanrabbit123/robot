/<%contents%>/

const PortfolioJs = function () {
  this.mother = new GeneralJs();
  this.searchDoms = {
    keyInput: {
      desktop: {},
      mobile: {}
    },
    sort: {
      desktop: {},
      mobile: {},
      buttons: {
        desktop: [],
        mobile: []
      }
    },
    type: {
      desktop: {},
      mobile: {},
      buttons: {
        desktop: [],
        mobile: []
      }
    },
  };
  this.box = {
    desktop: {},
    mobile: {},
  };
  this.map = /<%map%>/;
}

PortfolioJs.sourceLink = "/list_image/portfolio";

PortfolioJs.prototype.sortBoxBase = function (flatform) {
  const instance = this;
  const boo = (flatform === "desktop") ? true : false;
  const { main: { navigator: { src: { icons: { search: searchIcon } } } } } = instance.mother.map;
  const { main: { search: { option: [ searchSort, searchType ] } } } = instance.map;

  let div_clone, div_clone2, div_clone3, input_clone, svg_clone;
  let style = {};
  let attribute = {};
  let width, height, top, left, right, borderRadius, textIndent, fontSize, paddingBottom;
  let ea;

  ea = boo ? "px" : "vw";

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    const cssString = function (media) {
      let ea = "px";
      return ".polisearchbox { display:block;margin-top:79px;margin-bottom:18px;position:relative;top:0;left:50%;height:55px;width:" + String(media) + ea + ";margin-left:-" + String(media/2) + ea + "; }";
    }
    h1 = cssString(1400);
    h2 = cssString(1050);
    h3 = ".mopolisearchbox {display:block;position:relative;width:87.9vw;height:13.5vw;margin-left:auto;margin-right:auto;margin-top:8.6vw;margin-bottom:7.8vw;}";
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  //mother
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add(boo ? "polisearchbox" : "mopolisearchbox");

  //search input box start
  top = boo ? 0 : 0;
  left = boo ? 0 : 0;
  width = boo ? 690 : 87.9;
  height = boo ? 42 : 13.5;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "relative",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  //gray box
  width = boo ? 642 : 79.5;
  height = boo ? 42 : 7.8;
  borderRadius = boo ? 3 : 0.3;
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(0) + ea,
    left: String(0) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    backgroundColor: "#f7f7f7",
    borderRadius: String(borderRadius) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);

  //search input
  textIndent = boo ? 12 : 1.2;
  fontSize = boo ? 18 : 3.5;
  paddingBottom = boo ? 5 : 1;
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  attribute = {
    type: "text",
    name: (boo ? "search1" : "mosearch1"),
    value: "",
  };
  for (let i in attribute) {
    input_clone.setAttribute(i, attribute[i]);
  }
  style = {
    position: "absolute",
    top: String(0) + ea,
    left: String(0) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    backgroundColor: "transparent",
    color: "#303030",
    border: String(0) + ea,
    textIndent: String(textIndent) + ea,
    fontSize: String(fontSize) + ea,
    paddingBottom: String(paddingBottom) + ea,
    fontFamily: "'Noto Sans KR', sans-serif",
  };
  for (let i in style) {
    input_clone.style[i] = style[i];
  }
  this.searchDoms.keyInput[flatform] = input_clone;
  div_clone2.appendChild(input_clone);

  //search icon
  top = boo ? 4 : 1;
  left = boo ? width + 15 : width + 2.7;
  height = boo ? 32 : 5.5;
  width = GeneralJs.parseRatio({ source: searchIcon, target: height, method: "height", result: "number" });
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = searchIcon;
  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone2.appendChild(SvgTong.parsing(svg_clone));

  //white hover
  borderRadius = boo ? 3 : 1;
  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.classList.add("mouseoverdefault");
  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height + (boo ? 5 : 1)) + ea,
    backgroundColor: "#ffffff",
    borderRadius: String(borderRadius) + ea,
  };
  for (let i in style) {
    div_clone3.style[i] = style[i];
  }
  div_clone2.appendChild(div_clone3);

  //search input end
  div_clone.appendChild(div_clone2);

  //sort
  this.sortBox(div_clone, flatform);

  //type
  this.typeBox(div_clone, flatform);

  return div_clone;

}

PortfolioJs.prototype.sortBox = function (mother, flatform) {
  const instance = this;
  const boo = (flatform === "desktop") ? true : false;
  const { src: title, children } = this.map.main.search.option[0];

  let div_clone, svg_clone;
  let style = {};
  let attribute = {};
  let width, height, top, left, right;
  let ea = boo ? "px" : "vw";
  let sortWording;
  let buttons = new Array(2);

  //sort wording
  top = boo ? 1.6 : 10.2;
  right = boo ? 110 : 69.4;
  height = boo ? 12 : 2.4;
  width = GeneralJs.parseRatio({ source: title[flatform], target: height, method: "height", result: "number" }) + (boo ? 0 : 0.5);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = title[flatform];
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  svg_clone.setAttribute("cus_value", "key9");
  sortWording = SvgTong.parsing(svg_clone);
  this.searchDoms.sort[flatform] = sortWording;
  mother.appendChild(sortWording);

  //sort child 1 - off
  top = boo ? 1.4 : 10;
  right = boo ? 61 : 58.5;
  height = boo ? 13 : 2.9;
  width = GeneralJs.parseRatio({ source: children[0].src.desktop.off, target: height, method: "height", result: "number" }) + (boo ? 0 : 1);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = children[0].src.desktop.off;
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  mother.appendChild(SvgTong.parsing(svg_clone));

  //sort child 1 - on
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = children[0].src.desktop.on;
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  if (boo) { style.transition = "all 0.5s ease"; }
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  buttons[0] = SvgTong.parsing(svg_clone);
  mother.appendChild(buttons[0]);

  //sort child 2 - off
  right = boo ? 0 : 47.5;
  width = GeneralJs.parseRatio({ source: children[1].src.desktop.off, target: height, method: "height", result: "number" }) + (boo ? 0 : 1);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = children[1].src.desktop.off;
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  mother.appendChild(SvgTong.parsing(svg_clone));

  //sort child 2 - on
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = children[1].src.desktop.on;
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    opacity: String(0),
  };
  if (boo) { style.transition = "all 0.5s ease"; }
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  buttons[1] = SvgTong.parsing(svg_clone);
  mother.appendChild(buttons[1]);

  //gray bar
  right = boo ? 48 : 57.4;
  height = boo ? 13.3 : 3;
  width = boo ? 1.5 : 0.2;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    background: "#dddddd",
    borderRadius: String(boo ? 3 : 1) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  mother.appendChild(div_clone);

  //white box 1
  top = boo ? 0 : 10;
  right = boo ? 54 : 58.5;
  height = boo ? 17 : 3;
  width = boo ? 48 : 9;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  if (boo) { div_clone.classList.add("mouseoverdefault"); }
  else { div_clone.style.opacity = '0'; }
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    background: "#ffffff",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  this.searchDoms.sort.buttons[flatform].push(div_clone);
  div_clone.addEventListener("click", function (e) {
    sortWording.setAttribute("cus_value", children[0].value);
    buttons[0].style.opacity = '';
    buttons[1].style.opacity = '0';
  });
  mother.appendChild(div_clone);

  //white box 2
  right = boo ? 0 : 47.5;
  width = boo ? 44 : 9;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  if (boo) { div_clone.classList.add("mouseoverdefault"); }
  else { div_clone.style.opacity = '0'; }
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    background: "#ffffff",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  this.searchDoms.sort.buttons[flatform].push(div_clone);
  div_clone.addEventListener("click", function (e) {
    sortWording.setAttribute("cus_value", children[1].value);
    buttons[0].style.opacity = '0';
    buttons[1].style.opacity = '';
  });
  mother.appendChild(div_clone);

}

PortfolioJs.prototype.typeBox = function (mother, flatform) {
  const instance = this;
  const { src: title, children } = this.map.main.search.option[1];
  const { src: greenArrow } = this.map.sub.etc.arrow[0];

  let div_clone, div_clone2, div_clone3, svg_clone;
  let style = {};
  let attribute = {};
  let width, height, top, left, right;
  let frameHeight, frameWidth;
  let boo = (flatform === "desktop") ? true : false;
  let ea = boo ? "px" : "vw";
  let typeWording;
  let detailBox;
  let buttonMain = new Array(children.length);
  let buttonSub = new Array(children.length);

  //type wording
  top = boo ? 24.9 : 10.2;
  right = boo ? 110 : 34;
  height = boo ? 12 : 2.4;
  width = GeneralJs.parseRatio({ source: title[flatform], target: height, method: "height", result: "number" }) + (boo ? 0 : 0.5);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = title[flatform];
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  svg_clone.setAttribute("cus_value", children[0].value);
  typeWording = SvgTong.parsing(svg_clone);
  this.searchDoms.type[flatform] = typeWording;
  mother.appendChild(typeWording);

  //children
  top = boo ? 24.3 : 10;
  height = boo ? 13 : 2.9;
  for (let i = 0; i < children.length; i++) {
    width = GeneralJs.parseRatio({ source: children[i].src.desktop.off, target: height, method: "height", result: "number" }) + (boo ? 0 : 1);
    right = boo ? (97 - width) : (32 - width);
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = children[i].src.desktop.off;
    style = {
      position: "absolute",
      top: String(top) + ea,
      right: String(right) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
    };
    for (let j in style) {
      svg_clone.style[j] = style[j];
    }
    if (i !== 0) { svg_clone.style.opacity = '0'; }
    buttonMain[i] = SvgTong.parsing(svg_clone);
    mother.appendChild(buttonMain[i]);
  }

  //greenArrow
  top = boo ? 26 : 10.5;
  height = boo ? 7 : 1.6;
  right = boo ? 0 : 11.5;
  width = GeneralJs.parseRatio({ source: greenArrow, target: height, method: "height", result: "number" }) + (boo ? 0 : 1);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = greenArrow;
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let j in style) {
    svg_clone.style[j] = style[j];
  }
  mother.appendChild(SvgTong.parsing(svg_clone));

  //detail frame
  height = boo ? 18 : 2.8;
  frameWidth = boo ? 100 : 21.5;
  frameHeight = height + (children.length * (boo ? 23.5 : 5.2));
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(top + height) + ea,
    right: String(right) + ea,
    width: String(frameWidth) + ea,
    height: String(frameHeight) + ea,
    overflow: "hidden",
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  //detail white back
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(0) + ea,
    width: String(frameWidth) + ea,
    height: String(frameHeight) + ea,
    transform: "translateY(-" + String(frameHeight) + ea + ")",
    transition: "all 0.5s ease",
    background: "#ffffff",
    cursor: "pointer",
    borderRadius: String(boo ? 3 : 1) + ea,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  detailBox = div_clone2;

  //details
  top = boo ? 23 : 5;
  height = boo ? 13 : 2.7;
  for (let i = 0; i < children.length; i++) {
    width = GeneralJs.parseRatio({ source: children[i].src.desktop.off, target: height, method: "height", result: "number" }) + (boo ? 0 : 0.5);
    right = boo ? ((frameWidth - width) / 2) : (frameWidth - width) - 2;

    //off
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = children[i].src.desktop.off;
    style = {
      position: "absolute",
      top: String((boo ? 15 : 3) + (top * i)) + ea,
      right: String(right) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
    };
    for (let j in style) {
      svg_clone.style[j] = style[j];
    }
    div_clone2.appendChild(SvgTong.parsing(svg_clone));

    //on
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = children[i].src.desktop.on;
    style = {
      position: "absolute",
      top: String((boo ? 15 : 3) + (top * i)) + ea,
      right: String(right) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
      transition: "all 0.5s ease",
    };
    for (let j in style) {
      svg_clone.style[j] = style[j];
    }
    if (i !== 0) { svg_clone.style.opacity = '0'; }
    buttonSub[i] = SvgTong.parsing(svg_clone);
    div_clone2.appendChild(buttonSub[i]);

    //white box
    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("mouseoverdefault");
    style = {
      position: "absolute",
      top: String((boo ? 15 : 3) + (top * i)) + ea,
      right: String(right) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
      background: "white",
    };
    for (let i in style) {
      div_clone3.style[i] = style[i];
    }
    this.searchDoms.type.buttons[flatform].push(div_clone3);
    div_clone3.setAttribute("cus_order", String(i));
    div_clone3.addEventListener("click", function (e) {
      let order = Number(this.getAttribute("cus_order"));
      for (let i = 0; i < buttonMain.length; i++) {
        if (i !== order) {
          buttonMain[i].style.opacity = '0';
          buttonSub[i].style.opacity = '0';
        } else {
          buttonMain[i].style.opacity = '';
          buttonSub[i].style.opacity = '';
        }
      }
      typeWording.setAttribute("cus_value", children[i].value);
      detailBox.style.transform = "translateY(-" + String(frameHeight) + ea + ")";
      let timeout = setTimeout(function () {
        detailBox.parentNode.style.zIndex = '';
        clearTimeout(timeout);
      }, 500);
    });
    div_clone2.appendChild(div_clone3);

  }

  div_clone.appendChild(div_clone2);
  mother.appendChild(div_clone);

  //white box
  top = boo ? 22 : 10;
  right = boo ? 0 : 11.5;
  height = boo ? 18 : 3;
  width = boo ? 100 : 20;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("mouseoverdefault");
  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    background: "#ffffff",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  div_clone.addEventListener("click", function (e) {
    detailBox.style.transform = "";
    detailBox.parentNode.style.zIndex = '1';
  });

  mother.appendChild(div_clone);

}

PortfolioJs.prototype.titleBar = function (flatform) {
  const instance = this;
  const boo = (flatform === "desktop") ? true : false;
  const { main: { listTitle } } = this.map;
  const { wording: { src: { desktop: portfolioList } } } = listTitle;
  let div_clone, div_clone2, svg_clone;
  let style = {};
  let width, height, top, left, right;
  let ea;

  ea = boo ? "px" : "vw";

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    const cssString = function (media) {
      let ea = "px";
      let h = '';
      h += ".polititlebox { display:block;position:relative;top:0;left:50%;width:" + String(media) + ea + ";margin-left:-" + String(media/2) + ea + "; }";
      h += ".polititleboxGrayBar { position:absolute;background:#f2f2f2;top:9px;height:1px;right:0;width:calc(" + String(media) + ea  + " - 138px); }";
      return h;
    }
    h1 = cssString(1400);
    h2 = cssString(1050);
    h3 += ".mopolititlebox { display:block;position:relative;top:0;width:87.9vw;margin-left:auto;margin-right:auto;margin-bottom: 7vw; }";
    h3 += ".mopolititleboxGrayBar { position:absolute;background:#f2f2f2;top:1.6vw;height:1px;right:0;width:calc(87.9vw - 24.1vw); }";
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  height = boo ? 21 : 3.8;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add(boo ? "polititlebox" : "mopolititlebox");
  style = {
    height: String(height) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  //title wording
  top = boo ? 0 : 0;
  left = boo ? 0.5 : 0.1;
  width = GeneralJs.parseRatio({ source: portfolioList, target: height, method: "height", result: "number" }) - (boo ? 0 : 0.5);
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = portfolioList;
  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  //gray bar
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.classList.add(boo ? "polititleboxGrayBar" : "mopolititleboxGrayBar");
  div_clone.appendChild(div_clone2);

  return div_clone;
}

PortfolioJs.prototype.contentsBox = function (rows, flatform) {
  const instance = this;
  const boo = (flatform === "desktop") ? true : false;
  let box;

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    const cssString = function (media) {
      let ea = "px";
      let h = '';
      h += '.portfolioBox{display:block;position:relative;margin-bottom:180px;top:-' + String(media === 1400 ? 21 : 5) + 'px;left:50%;margin-left:-' + String(media / 2) + 'px;width:' + String(media + 22.5) + 'px;height:auto;}';
      return h;
    }
    h1 = cssString(1400);
    h2 = cssString(1050);
    h3 = '.moportfolioBox{display:block;position:relative;margin-bottom:11vw;top:-5vw;left:6.1vw;width:90.7vw;height:auto;}';
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  box = GeneralJs.nodes.div.cloneNode(true);
  box.classList.add(boo ? "portfolioBox" : "moportfolioBox");
  box.appendChild(rows);

  this.box[flatform] = box;

  return box;
}

PortfolioJs.prototype.initialDom = function (rows) {
  const instance = this;
  const grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  };
  let list = {
    desktop: [
      {
        id: "back",
        source: [ instance.map.sub.title.desktop.back.src ],
        callback: function (id, source) {
          const [ back ] = source;
          let div_clone;
          let style = {};
          let ea = "px";

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "absolute",
            width: "100%",
            height: String(336) + ea,
            top: String(71) + ea,
            left: String(0) + ea,
            backgroundImage: 'url("' + PortfolioJs.sourceLink + back + '")',
            backgroundSize: "100% auto",
            backgroundPosition: "50% 40%",
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          return div_clone;
        }
      },
      {
        id: "backword",
        source: [ instance.map.sub.title.desktop.words.src ],
        callback: function (id, source) {
          const [ words ] = source;
          let height, top, width, ea;
          let h = document.createDocumentFragment();
          let svg_clone;

          height = 92;
          top = 172;
          width = GeneralJs.parseRatio({ source: words, target: height, method: "height", result: "number" });
          ea = "px";

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = words;
          svg_clone.style.position = "absolute";
          svg_clone.style.left = "50%";
          svg_clone.style.top = String(top) + ea;
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          svg_clone.style.marginLeft = '-' + String(width / 2) + ea;
          h.appendChild(SvgTong.parsing(svg_clone));

          return h;
        },
      },
      {
        id: "searchbar",
        source: [],
        callback: function (id, source) {
          return instance.sortBoxBase("desktop");
        },
      },
      {
        id: "titlebar",
        source: [],
        callback: function (id, source) {
          return instance.titleBar("desktop");
        },
      },
      {
        id: "contents",
        source: [],
        callback: function (id, source) {
          const { desktop: portfolioRows } = rows;
          return instance.contentsBox(portfolioRows, "desktop");
        },
      },
      {
        id: "belowbox",
        source: [],
        callback: function (id, source) {
          const { sub: { below: { desktop: { words: { src, href } } } } } = instance.map;
          let div_clone, div_clone2, div_clone3, a_clone, svg_clone;
          let height, top, width;
          let ea = "px";
          let style = {};

          //css
          /<%cssOut%>/ {
            let h0 = '', h1 = '', h2 = '', h3 = '';
            const cssString = function () {
              let ea = "px";
              let h = '';
              h += ".belowbox{display:block;position:relative;width:100%;height:280px;background-color:#f7f7f7}";
              h += "#belowboxposition{display:block;position:absolute;top:41px;width:1050px;height:176px;left:50%;margin-left:-525px;}";
              h += "#belowbutton1{position:absolute;top:50px;left:120px;width:165px;height:70px;}";
              h += "#belowbutton2{position:absolute;top:50px;left:450px;width:142px;height:70px;}";
              h += "#belowbutton3{position:absolute;top:50px;left:764px;width:140px;height:70px;}";
              h += ".belowbutton{background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}";
              h += ".belowbutton:hover{opacity:0.6;}";
              return h;
            }
            h0 = cssString();
            return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
          } %/%/e

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add(id);

          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.id = "belowboxposition";

          height = 48;
          top = 59;
          width = GeneralJs.parseRatio({ source: src, target: height, method: "height", result: "number" });

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = src;
          style = {
            position: "absolute",
            left: "50%",
            top: String(top) + ea,
            height: String(height) + ea,
            width: String(width) + ea,
            marginLeft: '-' + String(width / 2) + ea,
          };
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          div_clone2.appendChild(SvgTong.parsing(svg_clone));

          for (let i = 0; i < href.length; i++) {
            a_clone = GeneralJs.nodes.a.cloneNode(true);
            a_clone.href = href[i];
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.id = "belowbutton" + String(i + 1);
            div_clone3.classList.add("belowbutton");
            a_clone.appendChild(div_clone3);
            div_clone2.appendChild(a_clone);
          }

          div_clone.appendChild(div_clone2);
          return div_clone;
        },
      },
    ],
    mobile: [
      {
        id: "moback",
        source: [ instance.map.sub.title.mobile.back.src ],
        callback: function (id, source) {
          const [ back ] = source;
          let div_clone;
          let style = {};
          let ea = "px";

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: "100%",
            height: String(255) + ea,
            top: String(0) + ea,
            backgroundImage: 'url("' + PortfolioJs.sourceLink + back + '")',
            backgroundSize: "auto 101%",
            backgroundPosition: "44% 65%",
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          return div_clone;
        },
      },
      {
        id: "mobackword",
        source: [ instance.map.sub.title.mobile.words.src ],
        callback: function (id, source) {
          const [ words ] = source;
          let height, top, width, ea;
          let h = document.createDocumentFragment();
          let svg_clone;

          height = 76;
          top = 78;
          width = GeneralJs.parseRatio({ source: words, target: height, method: "height", result: "number" });
          ea = "px";

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = words;
          svg_clone.style.position = "absolute";
          svg_clone.style.left = "50%";
          svg_clone.style.top = String(top) + ea;
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          svg_clone.style.marginLeft = '-' + String(width / 2) + ea;
          h.appendChild(SvgTong.parsing(svg_clone));

          return h;
        },
      },
      {
        id: "mosearchbar",
        source: [],
        callback: function (id, source) {
          return instance.sortBoxBase("mobile");
        },
      },
      {
        id: "motitlebar",
        source: [],
        callback: function (id, source) {
          return instance.titleBar("mobile");
        },
      },
      {
        id: "mocontents",
        source: [],
        callback: function (id, source) {
          const { mobile: portfolioRows } = rows;
          return instance.contentsBox(portfolioRows, "mobile");
        },
      },
    ],
  };
  let boo = Object.keys(list);
  let temp, temp_callback, temp_id, temp_source;
  for (let i = 0; i < boo.length; i++) {
    for (let j = 0; j < list[boo[i]].length; j++) {
      temp_callback = list[boo[i]][j]["callback"];
      temp_id = list[boo[i]][j]["id"];
      temp_source = list[boo[i]][j]["source"];
      temp = temp_callback(temp_id, temp_source);
      grand[boo[i]].appendChild(temp);
    }
  }
}

PortfolioJs.prototype.infinityScroll = function (queryObj) {
  const instance = this;
  const boo = (window.innerWidth >= 900) ? true : false;
  const flatform = boo ? "desktop" : "mobile";
  const domTarget = flatform + "Dom_portfolio";

  //set global stacks
  GeneralJs.stacks.portfolioScroll = 0;
  GeneralJs.boos.portfolioScroll = true;

  //make event
  const scrollEvent = async function (e) {
    let ea = boo ? 3000 : 2000;
    let scroll = Math.abs(document.body.getBoundingClientRect().top + document.body.scrollTop);

    if ((scroll > (200 + ea + (ea * GeneralJs.stacks.portfolioScroll))) && GeneralJs.boos.portfolioScroll) {
      queryObj.limit = [ (20 * (GeneralJs.stacks.portfolioScroll + 1)), 20 ];
      const rowObj = await GeneralJs.getContents(queryObj);

      //infinity append
      if (rowObj[domTarget].firstChild !== null) {
        instance.box[flatform].appendChild(rowObj[domTarget]);
        GeneralJs.stacks.portfolioScroll++;

      //if done exit
      } else {
        GeneralJs.boos.portfolioScroll = false;

        //remove event and global reset
        window.removeEventListener("scroll", GeneralJs.events.portfolioScroll);
        GeneralJs.stacks.portfolioScroll = 0;
      }
    }
  }

  //set by throttle
  GeneralJs.events.portfolioScroll = GeneralJs.throTtle(scrollEvent, 300);
  window.addEventListener("scroll", GeneralJs.events.portfolioScroll);
}

PortfolioJs.prototype.searchEvent = function (flatform) {
  const instance = this;
  const boo = (flatform === "desktop") ? true : false;
  const rowDomName = "Dom_portfolio";
  const box = this.box[flatform];

  //get value
  const { keyInput, sort, type } = this.searchDoms;
  const inputDom = keyInput[flatform];
  const sortDom = sort[flatform];
  const typeDom = type[flatform];

  return GeneralJs.delayLaunching(async function (e) {
    let keyValue, queryObj;

    //set query
    keyValue = GeneralJs.escapeString(inputDom.value);
    queryObj = {
      collection: "porlist",
      sort: [ sortDom.getAttribute("cus_value"), "DESC" ],
      where: [
        [
          [ "designer", keyValue ],
          [ "region", keyValue ],
          [ "method", keyValue ],
          [ "tag", keyValue ],
          [ "title", keyValue ],
          [ "subtitle", keyValue ],
          [ "apart", keyValue ],
          [ "pyeong", keyValue ],
        ],
        [
          [ "method", typeDom.getAttribute("cus_value") ],
          [ "tag", typeDom.getAttribute("cus_value") ],
          [ "title", typeDom.getAttribute("cus_value") ],
        ]
      ],
      limit: [ 20 ],
      garo: true,
    };
    if (keyValue !== '') {
      queryObj.where = [
        [
          [ "designer", keyValue ],
          [ "region", keyValue ],
          [ "method", keyValue ],
          [ "tag", keyValue ],
          [ "title", keyValue ],
          [ "subtitle", keyValue ],
          [ "apart", keyValue ],
          [ "pyeong", keyValue ],
        ],
        [
          [ "method", typeDom.getAttribute("cus_value") ],
          [ "tag", typeDom.getAttribute("cus_value") ],
          [ "title", typeDom.getAttribute("cus_value") ],
        ]
      ];
    } else {
      queryObj.where = [
        [
          [ "method", typeDom.getAttribute("cus_value") ],
          [ "tag", typeDom.getAttribute("cus_value") ],
          [ "title", typeDom.getAttribute("cus_value") ],
        ]
      ];
    }

    //get doms
    const result = await GeneralJs.getContents(queryObj);

    //remove event and global reset
    window.removeEventListener("scroll", GeneralJs.events.portfolioScroll);
    GeneralJs.stacks.portfolioScroll = 0;

    //launch infinity scroll event
    instance.infinityScroll(queryObj);

    //set contents
    while (box.firstChild) { box.removeChild(box.lastChild); }
    box.appendChild(result[flatform + rowDomName]);
  }, 500);

}

PortfolioJs.prototype.searchOn = function () {
  const instance = this;

  //keyup
  this.searchDoms.keyInput.desktop.addEventListener("keyup", this.searchEvent("desktop"));
  this.searchDoms.keyInput.mobile.addEventListener("keyup", this.searchEvent("mobile"));

  //sort
  for (let i = 0; i < this.searchDoms.sort.buttons.desktop.length; i++) {
    this.searchDoms.sort.buttons.desktop[i].addEventListener("click", this.searchEvent("desktop"));
  }
  for (let i = 0; i < this.searchDoms.sort.buttons.mobile.length; i++) {
    this.searchDoms.sort.buttons.mobile[i].addEventListener("click", this.searchEvent("mobile"));
  }

  //type
  for (let i = 0; i < this.searchDoms.type.buttons.desktop.length; i++) {
    this.searchDoms.type.buttons.desktop[i].addEventListener("click", this.searchEvent("desktop"));
  }
  for (let i = 0; i < this.searchDoms.type.buttons.mobile.length; i++) {
    this.searchDoms.type.buttons.mobile[i].addEventListener("click", this.searchEvent("mobile"));
  }
}

PortfolioJs.prototype.launching = async function () {
  const instance = this;
  try {
    let queryObj, getObj, keyValue;

    //parsing get
    getObj = GeneralJs.returnGet();
    queryObj = {
      collection: "porlist",
      sort: [ "key9", "DESC" ],
      limit: [ 20 ],
      garo: true,
    };

    if (getObj.search !== undefined) {
      keyValue = GeneralJs.escapeString(getObj.search);
      queryObj.where = [
        [
          [ "designer", keyValue ],
          [ "region", keyValue ],
          [ "method", keyValue ],
          [ "tag", keyValue ],
          [ "title", keyValue ],
          [ "subtitle", keyValue ],
          [ "apart", keyValue ],
          [ "pyeong", keyValue ],
        ]
      ];
    }

    //get contents
    const { desktopDom_portfolio, mobileDom_portfolio } = await GeneralJs.getContents(queryObj);

    //init
    this.initialDom({ desktop: desktopDom_portfolio, mobile: mobileDom_portfolio });
    this.infinityScroll(queryObj);
    this.searchOn();

    //if exist get, add words in input
    if (getObj.search !== undefined) {
      this.searchDoms.keyInput.desktop.value = keyValue;
      this.searchDoms.keyInput.mobile.value = keyValue;
    }

  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
}
