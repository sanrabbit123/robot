/<%contents%>/

const PortfolioJs = function () {
  this.mother = new GeneralJs();
  this.searchDoms = {
    keyInput: {},
    sort: {},
    type: {},
    details: [],
  };
  this.box = {
    desktop: {},
    mobile: {},
  };
  this.map = /<%map%>/;
}

PortfolioJs.sourceLink = "/list_image/portfolio";

PortfolioJs.prototype.loopAjaxGet = function (from, to) {
  var me = this;
  return function () {
    GeneralJs.ajax(GeneralJs.formtoAjax(from), "/engine/Dbdbpost.php", function (data) {
      var toDom = document.getElementById(to);
      while (toDom.firstChild) { toDom.removeChild(toDom.lastChild); }
      toDom.insertAdjacentHTML("beforeend", data);
    });
  };
}

PortfolioJs.prototype.searchdelay = function (callback, ms) {
  var timer = 0;
  return function (e) {
    if (timer !== 0) { clearTimeout(timer); }
    timer = setTimeout(callback, ms);
  };
}

PortfolioJs.prototype.searchcallback = function (id) {
  var me = this;
  var arrayid = [];
  if (id === 'de') { arrayid = ['polisearch','polisearch2','polisearch3','qqueryid','porporform','porporid']; }
  else { arrayid = ['mopolisearch','mopolisearch2','mopolisearch3','moqqueryid','moporporform','moporporid']; }
  return function () {
    me.truefalse = false;
    var currentVal = document.getElementById(arrayid[0]).value;
    var vararray = {
      search1 : currentVal.replace(/[\*\!\?\~\^\:\/\@\%\&\+\<\>\;\#\$\[\]\\\|\-\(\)\`\'\"\{\}]/g, ''),
      search2 : document.getElementById(arrayid[1]).value,
      search3 : document.getElementById(arrayid[2]).value
    };
    if (vararray.search1 === '') { vararray.search1 = '.'; }
    document.getElementById(arrayid[3]).value = "SELECT porlid,photodae_s,photodae_d FROM porlist WHERE (designer regexp '"+vararray.search1+"' OR region regexp '"+vararray.search1+"' OR tag regexp '"+vararray.search1+"' OR title regexp '"+vararray.search1+"' OR subtitle regexp '"+vararray.search1+"' OR apart regexp '"+vararray.search1+"' OR pyeong regexp '"+vararray.search1+"') AND (method regexp '"+vararray.search3+"' OR tag regexp '"+vararray.search3+"') ORDER BY "+vararray.search2+" DESC;";
    (me.loopAjaxGet(arrayid[4], arrayid[5]))();
  };
}

PortfolioJs.prototype.searchbaron = function (id) {
  var me = this;
  var arraym = [];
  if (id === 'de') {
    arraym = ['porlidelidediv','porlidelideimg','-190px'];
  } else {
    arraym = ['moporlidelidediv','moporlidelideimg','-35vw'];
  }
  return function () {
    if (document.getElementById(arraym[0]).style.opacity === "0") {
      document.getElementById(arraym[0]).style.opacity = "1";
      document.getElementById(arraym[1]).style.top = "0";
    } else {
      document.getElementById(arraym[0]).style.opacity = "0";
      document.getElementById(arraym[1]).style.top = arraym[2];
    }
  };
}

PortfolioJs.prototype.ordertoggle = function (id, dm) {
  var me = this;
  var arraym = [];
  switch (id) {
    case 1:
      arraym = [ '0', 'key9' ];
      break;
    case 2:
      arraym = [ '1', 'key8' ];
      break;
  }
  return function () {
    me.truefalse = false;
    document.getElementById((dm ? '' : 'mo') + 'poliorderedsvg2').style.opacity = arraym[0];
    document.getElementById((dm ? '' : 'mo') + 'polisearch2').value = arraym[1];
    setTimeout(me.searchcallback(dm ? 'de' : 'mo'), 300);
  };
}

PortfolioJs.prototype.methodselect = function (id, dm) {
  var me = this;
  var arraym = [];
  switch (id) {
    case 1:
      arraym = ['0','0','0','0','0','all'];
      break;
    case 2:
      arraym = ['1','0','0','0','0','토탈스타일링'];
      break;
    case 3:
      arraym = ['0','1','0','0','0','홈퍼니싱'];
      break;
    case 4:
      arraym = ['0','0','1','0','0','제작가구'];
      break;
    case 5:
      arraym = ['0','0','0','1','0','아이방'];
      break;
    case 6:
      arraym = ['0','0','0','0','1','원룸'];
      break;
  }
  return function () {
    me.truefalse = false;
    document.getElementById((dm ? '' : 'mo') + 'politypesvg2').style.opacity = arraym[0];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg3').style.opacity = arraym[1];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg4').style.opacity = arraym[2];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg5').style.opacity = arraym[3];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg6').style.opacity = arraym[4];
    document.getElementById((dm ? '' : 'mo') + 'polisearch3').value = arraym[5];
    setTimeout(me.searchcallback(dm ? 'de' : 'mo'), 300);
  };
}

//------------------------------------------------------------------------------------------new

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
  div_clone2.appendChild(input_clone);

  //hidden input 1
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.style.display = "none";
  attribute = {
    type: "hidden",
    name: (boo ? "search2" : "mosearch2"),
    value: "key9",
  };
  for (let i in attribute) {
    input_clone.setAttribute(i, attribute[i]);
  }
  div_clone2.appendChild(input_clone);

  //hidden input 2
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.style.display = "none";
  attribute = {
    type: "hidden",
    name: (boo ? "search3" : "mosearch3"),
    value: "all",
  };
  for (let i in attribute) {
    input_clone.setAttribute(i, attribute[i]);
  }
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
  this.searchDoms.sort = sortWording;
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
  div_clone.addEventListener("click", function (e) {
    sortWording.setAttribute("cus_value", "key9");
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
  div_clone.addEventListener("click", function (e) {
    sortWording.setAttribute("cus_value", "key8");
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
  svg_clone.setAttribute("cus_value", children[0].wording);
  typeWording = SvgTong.parsing(svg_clone);
  this.searchDoms.type = typeWording;
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
      typeWording.setAttribute("cus_value", children[i].wording);
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

PortfolioJs.prototype.infinityScroll = function () {
  const instance = this;
  const flatform = (window.innerWidth >= 900) ? "desktop" : "mobile";
  const domTarget = (window.innerWidth >= 900) ? "desktopDom_portfolio" : "mobileDom_portfolio";
  const boo = (window.innerWidth >= 900) ? true : false;

  //set global stacks
  GeneralJs.stacks.portfolioScroll = {};
  GeneralJs.stacks.portfolioScroll = 0;
  GeneralJs.boos.portfolioScroll = true;

  //make event
  const scrollEvent = async function (e) {
    let ea = boo ? 3000 : 2000;
    let scroll = Math.abs(document.body.getBoundingClientRect().top + document.body.scrollTop);

    if ((scroll > (200 + ea + (ea * GeneralJs.stacks.portfolioScroll))) && GeneralJs.boos.portfolioScroll) {
      const rowObj = await GeneralJs.getContents({
        collection: "porlist",
        sort: [ "key9", "DESC" ],
        limit: [ (20 * (GeneralJs.stacks.portfolioScroll + 1)), 20 ],
        garo: true,
      });

      //infinity append
      if (rowObj[domTarget].children.length > 0) {
        instance.box[flatform].appendChild(rowObj[domTarget]);
        GeneralJs.stacks.portfolioScroll++;

      //if done exit
      } else {
        GeneralJs.boos.portfolioScroll = false;
        window.removeEventListener("scroll", GeneralJs.events.portfolioScroll);
      }
    }
  }

  //set by throttle
  GeneralJs.events.portfolioScroll = GeneralJs.throTtle(scrollEvent, 400);
  window.addEventListener("scroll", GeneralJs.events.portfolioScroll);
}

PortfolioJs.prototype.launching = async function () {
  const instance = this;
  try {

    const { desktopDom_portfolio, mobileDom_portfolio } = await GeneralJs.getContents({
      collection: "porlist",
      sort: [ "key9", "DESC" ],
      limit: [ 20 ],
      garo: true,
    });
    const rows = {
      desktop: desktopDom_portfolio,
      mobile: mobileDom_portfolio,
    };

    this.initialDom(rows);
    this.infinityScroll();

  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }

  /*
  var me = this;
  var i = 0, j = 0;


  document.getElementById("polisearch").addEventListener("keyup", me.searchdelay(me.searchcallback('de'), 500));
  document.getElementById("polisubmit").addEventListener("click", me.searchdelay(me.searchcallback('de'), 500));
  document.getElementById("mopolisearch").addEventListener("keyup", me.searchdelay(me.searchcallback('mo'), 500));
  document.getElementById("mopolisubmit").addEventListener("click", me.searchdelay(me.searchcallback('mo'), 500));
  var politypebu = document.querySelectorAll(".politypebu");
  for (i = 0; i < politypebu.length; i++) {
    politypebu[i].addEventListener("click", me.searchbaron('de'));
  }
  var mopolitypebu = document.querySelectorAll(".mopolitypebu");
  for (j = 0; j < mopolitypebu.length; j++) {
    mopolitypebu[j].addEventListener("click", me.searchbaron('mo'));
  }
  document.getElementById("poliordered1div").addEventListener("click", me.ordertoggle(1, true));
  document.getElementById("poliordered2div").addEventListener("click", me.ordertoggle(2, true));
  document.getElementById("mopoliordered1div").addEventListener("click", me.ordertoggle(1, false));
  document.getElementById("mopoliordered2div").addEventListener("click", me.ordertoggle(2, false));
  for (i = 1; i < 7; i++) {
    document.querySelector(".plt" + String(i)).addEventListener("click", me.methodselect(i, true));
    document.querySelector(".moplt" + String(i)).addEventListener("click", me.methodselect(i, false));
  }
  */

}
