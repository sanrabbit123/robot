const PortfolioJs = function () {
  this.mother = new GeneralJs();
  this.searchDoms = {
    keyInput: {},
    sort: {},
    type: {},
    details: [],
  };
  this.map = /<%map%>/;
}

PortfolioJs.sourceLink = "/list_image/portfolio";

PortfolioJs.prototype.truefalse = true;

PortfolioJs.prototype.loopAjaxGet = function (from, to) {
  var me = this;
  return function () {
    GeneralJs.ajax(GeneralJs.formtoAjax(from), "./engine/Dbdbpost.php", function (data) {
      var toDom = document.getElementById(to);
      while (toDom.firstChild) { toDom.removeChild(toDom.lastChild); }
      toDom.insertAdjacentHTML("beforeend", data);
    });
  };
}

PortfolioJs.prototype.appendporlist = function () {
  var me = this;
  function appendEvent(id) {
    var arraym = [];
    if (id === 'de') { arraym = [3200,'qqueryid','porporform','porporid']; }
    else { arraym = [2000,'moqqueryid','moporporform','moporporid']; }
    return function (e) {
      var scroll = Math.abs(document.querySelector("body").getBoundingClientRect().top + document.body.scrollTop);
      if (scroll >= arraym[0] && me.truefalse) {
        document.getElementById(arraym[1]).value = "SELECT porlid,photodae_s,photodae_d FROM porlist ORDER BY key9 DESC LIMIT 20,300;";
        GeneralJs.ajax(GeneralJs.formtoAjax(arraym[2]), "./engine/Dbdbpost.php", function (data) {
          document.getElementById(arraym[3]).insertAdjacentHTML("beforeend", data);
        });
        me.truefalse = false;
      }
    };
  }
  if(window.innerWidth >= 900){ window.addEventListener("scroll", appendEvent("de")); }
  else if (window.innerWidth < 900) { window.addEventListener("scroll", appendEvent("mo")); }
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

PortfolioJs.prototype.sortBox = function (mother, flatform) {
  const instance = this;
  const { src: title, children } = this.map.main.search.option[0];

  let div_clone, svg_clone;
  let style = {};
  let attribute = {};
  let width, height, top, left, right;
  let boo = (flatform === "desktop") ? true : false;
  let ea = boo ? "px" : "vw";
  let sortWording;
  let buttons = new Array(2);

  //sort wording
  top = boo ? 1.6 : 10;
  right = boo ? 110 : 10;
  height = boo ? 12 : 10;
  width = GeneralJs.parseRatio({ source: title[flatform], target: height, method: "height", result: "number" });
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
  right = boo ? 61 : 10;
  height = boo ? 13 : 10;
  width = GeneralJs.parseRatio({ source: children[0].src.desktop.off, target: height, method: "height", result: "number" });
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
    transition: "all 0.5s ease",
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  buttons[0] = SvgTong.parsing(svg_clone);
  mother.appendChild(buttons[0]);

  //sort child 2 - off
  right = boo ? 0 : 0;
  width = GeneralJs.parseRatio({ source: children[1].src.desktop.off, target: height, method: "height", result: "number" });
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
    transition: "all 0.5s ease",
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  buttons[1] = SvgTong.parsing(svg_clone);
  mother.appendChild(buttons[1]);

  //gray bar
  right = boo ? 48 : 10;
  height = boo ? 13.3 : 10;
  width = boo ? 1.5 : 10;
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
  top = boo ? 0 : 0;
  right = boo ? 54 : 10;
  height = boo ? 17 : 10;
  width = boo ? 48 : 10;
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
    sortWording.setAttribute("cus_value", "key9");
    buttons[0].style.opacity = '';
    buttons[1].style.opacity = '0';
  });
  mother.appendChild(div_clone);

  //white box 2
  right = boo ? 0 : 0;
  width = boo ? 44 : 10;
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
  top = boo ? 24.9 : 10;
  right = boo ? 110 : 10;
  height = boo ? 12 : 10;
  width = GeneralJs.parseRatio({ source: title[flatform], target: height, method: "height", result: "number" });
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
  height = boo ? 13 : 10;
  for (let i = 0; i < children.length; i++) {
    width = GeneralJs.parseRatio({ source: children[i].src.desktop.off, target: height, method: "height", result: "number" });
    right = boo ? (97 - width) : 10;
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
  top = boo ? 26 : 10;
  height = boo ? 7 : 10;
  right = boo ? 0 : 0;
  width = GeneralJs.parseRatio({ source: greenArrow, target: height, method: "height", result: "number" });
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
  height = boo ? 18 : 10;
  frameWidth = boo ? 100 : 10;
  frameHeight = height + (children.length * (boo ? 23.5 : 10));
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
  top = boo ? 23 : 10;
  height = boo ? 13 : 10;
  for (let i = 0; i < children.length; i++) {
    width = GeneralJs.parseRatio({ source: children[i].src.desktop.off, target: height, method: "height", result: "number" });
    right = boo ? ((frameWidth - width) / 2) : 10;

    //off
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = children[i].src.desktop.off;
    style = {
      position: "absolute",
      top: String((boo ? 15 : 10) + (top * i)) + ea,
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
      top: String((boo ? 15 : 10) + (top * i)) + ea,
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
      top: String((boo ? 15 : 10) + (top * i)) + ea,
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
    });
    div_clone2.appendChild(div_clone3);

  }

  div_clone.appendChild(div_clone2);
  mother.appendChild(div_clone);

  //white box
  top = boo ? 22 : 10;
  right = boo ? 0 : 0;
  height = boo ? 18 : 10;
  width = boo ? 100 : 10;
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
  });

  mother.appendChild(div_clone);

}

PortfolioJs.prototype.initialDom = function () {
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
          const { main: { navigator: { src: { icons: { search: searchIcon } } } } } = instance.mother.map;
          const { main: { search: { option: [ searchSort, searchType ] } } } = instance.map;
          let div_clone, div_clone2, div_clone3, input_clone, svg_clone;
          let style = {};
          let attribute = {};
          let width, height, top, left, right;
          let ea = "px";

          //css
          /<%cssOut%>/ {
            let h0 = '', h1 = '', h2 = '', h3 = '';
            const cssString = function (media) {
              let ea = "px";
              return ".polisearchbox { display:block;margin-top:20px;margin-bottom:150px;position:relative;top:0;left:50%;height:55px;width:" + String(media) + ea + ";margin-left:-" + String(media/2) + ea + "; }";
            }
            h1 = cssString(1400);
            h2 = cssString(1050);
            return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
          } %/%/e

          //mother
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("polisearchbox");

          //search input box start
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(690) + ea,
            height: String(42) + ea,
          };
          for (let i in style) {
            div_clone2.style[i] = style[i];
          }

          //gray box
          width = 642;
          height = 42;
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(width) + ea,
            height: String(height) + ea,
            backgroundColor: "#f7f7f7",
            borderRadius: String(3) + ea,
          };
          for (let i in style) {
            div_clone3.style[i] = style[i];
          }
          div_clone2.appendChild(div_clone3);

          //search input
          input_clone = GeneralJs.nodes.input.cloneNode(true);
          attribute = {
            type: "text",
            name: "search1",
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
            textIndent: String(12) + ea,
            fontSize: String(13) + "pt",
            paddingBottom: String(4) + ea,
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
            name: "search2",
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
            name: "search3",
            value: "all",
          };
          for (let i in attribute) {
            input_clone.setAttribute(i, attribute[i]);
          }
          div_clone2.appendChild(input_clone);

          //svg icon
          top = 4;
          left = width + 15;
          height = 32;
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
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          div_clone3.classList.add("mouseoverdefault");
          style = {
            position: "absolute",
            top: String(top) + ea,
            left: String(left) + ea,
            width: String(width) + ea,
            height: String(height + 5) + ea,
            backgroundColor: "#ffffff",
            borderRadius: String(3) + ea,
          };
          for (let i in style) {
            div_clone3.style[i] = style[i];
          }
          div_clone2.appendChild(div_clone3);

          //search input end
          div_clone.appendChild(div_clone2);

          //sort
          instance.sortBox(div_clone, "desktop");

          //type
          instance.typeBox(div_clone, "desktop");

          return div_clone;
        },
      },
      {
        id: "titlebar",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();
          


          return h;
        },
      },
      {
        id: "contents",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();



          return h;
        },
      },
      {
        id: "below",
        source: [],
        callback: function (id, source) {
          let h = document.createDocumentFragment();



          return h;
        },
      },
    ],
    mobile: [
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



PortfolioJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.initialDom();


  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
  /*
  var me = this;
  var i = 0, j = 0;
  (this.loopAjaxGet("porporform", "porporid"))();
  (this.loopAjaxGet("moporporform", "moporporid"))();
  this.appendporlist();
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
