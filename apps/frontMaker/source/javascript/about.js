/<%contents%>/

const AboutJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
  this.rows;
}

AboutJs.sourceLink = "/list_image/about";

AboutJs.prototype.initialDom = function () {
  const instance = this;
  const grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  }
  let list = {
    desktop: [
      {
        id: "aboutback",
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
            backgroundImage: 'url("' + AboutJs.sourceLink + back + '")',
            backgroundSize: "101% auto",
            backgroundPosition: "50% 25%",
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          return div_clone;
        },
      },
      {
        id: "aboutbackword",
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
        id: "blockbox",
        source: [],
        callback: function (id, source) {
          let h, div_clone;
          h = document.createDocumentFragment();
          for (let i = 0; i < instance.map.main.length; i++) {
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add(id);
            div_clone.style.backgroundColor = instance.map.main[i].setting.background;
            /<%media%>/ div_clone.style.paddingTop = String(130) + "px" %/%/% String(110) + "px" %/%/i
            %/%/+ div_clone.style.paddingBottom = String(130) + "px" %/%/% String(80) + "px" %/%/g
            h.appendChild(div_clone);
          }
          return h;
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
        id: "moaboutback",
        source: [ instance.map.sub.title.mobile.back.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          div_clone.style.backgroundImage = "url('" + AboutJs.sourceLink + source[0] +  "')";
          div_clone.style.backgroundSize = "auto 101%";
          div_clone.style.backgroundPosition = "44% 65%";
          return div_clone;
        },
      },
      {
        id: "moaboutbackword",
        source: [ instance.map.sub.title.mobile.words.src ],
        callback: function (id, source) {
          let ea = "px";
          let height = 76;
          let width = GeneralJs.parseRatio({ source: source[0], target: height, method: "height", result: "number" }) + 1;

          let svg_clone = SvgTong.tongMaker();
          svg_clone.id = id;
          svg_clone.src = source[0];
          svg_clone.style.height = String(height) + ea;
          svg_clone.style.width = String(width) + ea;
          svg_clone.style.marginLeft = '-' + String(width / 2) + ea;
          svg_clone.style.top = String(78) + ea;
          return SvgTong.parsing(svg_clone);
        },
      },
      {
        id: "moblockbox",
        source: [],
        callback: function (id, source) {
          let h, div_clone;
          h = document.createDocumentFragment();
          for (let i = 0; i < instance.map.main.length; i++) {
            div_clone = GeneralJs.nodes.div.cloneNode(true);
            div_clone.classList.add(id);
            h.appendChild(div_clone);
          }
          return h;
        },
      },
    ],
  }
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

AboutJs.prototype.getBlocks = function () {
  let obj = {}
  obj.desktop = document.querySelectorAll(".blockbox");
  obj.mobile = document.querySelectorAll(".moblockbox");
  return obj;
}

AboutJs.prototype.basicLoader = function (rowDoms) {
  let { desktop, mobile } = this.getBlocks();
  let div_clone, div_clone2, img_clone;
  let height, top, width, ea, temp;
  this.generalBottom = 45;
  this.generalWordHeight = 174;
  this.generalButton = {
    height: 30,
    number: 10,
    button: 12,
    arrow: 5,
    margin: 11,
  }

  for (let i = 0; i < desktop.length; i++) {
    this.map.main[i].dom = {}
    this.map.main[i].dom.desktop = desktop[i];
    this.map.main[i].dom.mobile = mobile[i];
  }

  for (let i = 0; i < this.map.main.length; i++) {

    //desktop
    /<%media%>/ height = 22 %/%/% 21 %/%/i
    top = 0;
    width = GeneralJs.parseRatio({ source: this.map.main[i].src.title, target: height, method: "height", result: "number" }) + 2;
    ea = "px";

    //title box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("block_titlebox");
    div_clone.style.height = String(height) + ea;
    /<%media%>/ temp = 1400 %/%/% 1050 %/%/i
    div_clone.style.width = String(temp) + ea;
    div_clone.style.marginLeft = '-' + String(temp/2) + ea;

    //bar
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style.left = "0";
    div_clone2.style.top = String((height/2) - 3) + ea;
    div_clone2.style.height = "2px";
    div_clone2.style.width = "100%";
    if (this.map.main[i].setting.background === "#ffffff") {
      div_clone2.style.backgroundColor = "#f2f2f2";
    } else {
      div_clone2.style.backgroundColor = "#ececec";
    }
    div_clone.appendChild(div_clone2);

    //title
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style[((this.map.main[i].setting.direction === "left") ? "left" : "right")] = "0";
    div_clone2.style.top = "0";
    div_clone2.style.height = String(height) + ea;
    div_clone2.style.width = String(width + 14) + ea;
    div_clone2.style.backgroundColor = this.map.main[i].setting.background;

    img_clone = SvgTong.tongMaker();
    img_clone.src = AboutJs.sourceLink + this.map.main[i].src.title;
    img_clone.style.position = "absolute";
    img_clone.style[((this.map.main[i].setting.direction === "left") ? "left" : "right")] = "0";
    img_clone.style.top = String(top) + ea;
    img_clone.style.height = String(height) + ea;
    img_clone.style.width = String(width) + ea;
    img_clone.setAttribute("alt", this.map.main[i].title);
    div_clone2.appendChild(SvgTong.parsing(img_clone));
    div_clone.appendChild(div_clone2);

    //number
    height = height - 2;
    top = 1;
    width = GeneralJs.parseRatio({ source: this.map.main[i].src.number, target: height, method: "height", result: "number" }) + 2;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style[((this.map.main[i].setting.direction === "left") ? "right" : "left")] = "0";
    div_clone2.style.top = "0";
    div_clone2.style.height = String(height) + ea;
    div_clone2.style.width = String(width + 13) + ea;
    div_clone2.style.backgroundColor = this.map.main[i].setting.background;

    img_clone = SvgTong.tongMaker();
    img_clone.src = AboutJs.sourceLink + this.map.main[i].src.number;
    img_clone.style.position = "absolute";
    img_clone.style[((this.map.main[i].setting.direction === "left") ? "right" : "left")] = "0";
    img_clone.style.top = String(top) + ea;
    img_clone.style.height = String(height) + ea;
    img_clone.style.width = String(width) + ea;
    div_clone2.appendChild(SvgTong.parsing(img_clone));
    div_clone.appendChild(div_clone2);

    this.map.main[i].dom.desktop.appendChild(div_clone);

    //contents box
    if (this.map.main[i].setting.structure === "basic") {
      this.map.main[i].dom.desktop.appendChild(this.basicStructure(this.map.main[i], "desktop", i));
    } else if (this.map.main[i].setting.structure === "process") {
      this.map.main[i].dom.desktop.appendChild(this.processStructure(this.map.main[i], "desktop", i));
    } else if (this.map.main[i].setting.structure === "review") {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("block_contentsbox_review");
      div_clone.style.width = String(temp + 22.4) + ea;
      div_clone.style.marginLeft = '-' + String(temp/2) + ea;
      /<%media%>/ div_clone.style.marginTop = String(0) + ea %/%/% String(25) + ea %/%/i
      div_clone.appendChild(rowDoms.desktop);
      this.map.main[i].dom.desktop.appendChild(div_clone);
    }

    //mobile
    height = 4.3;
    top = 0;
    width = GeneralJs.parseRatio({ source: this.map.main[i].src.title, target: height, method: "height", result: "number" });
    ea = "vw";
    this.map.main[i].dom.mobile.style.backgroundColor = this.map.main[i].setting.background;

    //title box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("moblock_titlebox");
    div_clone.style.height = String(height) + ea;

    //bar
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style.left = "0";
    div_clone2.style.top = String(1.6) + ea;
    div_clone2.style.height = "2px";
    div_clone2.style.width = "100%";
    if (this.map.main[i].setting.background === "#ffffff") {
      div_clone2.style.backgroundColor = "#f2f2f2";
    } else {
      div_clone2.style.backgroundColor = "#ececec";
    }
    div_clone.appendChild(div_clone2);

    //title
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style.right = "0";
    div_clone2.style.top = "0";
    div_clone2.style.height = String(height) + ea;
    div_clone2.style.width = String(width + 3) + ea;
    div_clone2.style.backgroundColor = this.map.main[i].setting.background;

    img_clone = SvgTong.tongMaker();
    img_clone.src = AboutJs.sourceLink + this.map.main[i].src.title;
    img_clone.style.position = "absolute";
    img_clone.style.right = "0";
    img_clone.style.top = String(top) + ea;
    img_clone.style.height = String(height) + ea;
    img_clone.style.width = String(width) + ea;
    img_clone.setAttribute("alt", this.map.main[i].title);
    div_clone2.appendChild(SvgTong.parsing(img_clone));
    div_clone.appendChild(div_clone2);

    //number
    height = height - 0.6;
    top = 0.5;
    width = GeneralJs.parseRatio({ source: this.map.main[i].src.number, target: height, method: "height", result: "number" });
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.style.position = "absolute";
    div_clone2.style.left = "0";
    div_clone2.style.top = "0";
    div_clone2.style.height = String(height) + ea;
    div_clone2.style.width = String(width + 2.8) + ea;
    div_clone2.style.backgroundColor = this.map.main[i].setting.background;

    img_clone = SvgTong.tongMaker();
    img_clone.src = AboutJs.sourceLink + this.map.main[i].src.number;
    img_clone.style.position = "absolute";
    img_clone.style.left = "0";
    img_clone.style.top = String(top) + ea;
    img_clone.style.height = String(height) + ea;
    img_clone.style.width = String(width) + ea;
    div_clone2.appendChild(SvgTong.parsing(img_clone));
    div_clone.appendChild(div_clone2);

    this.map.main[i].dom.mobile.appendChild(div_clone);

    //contents box
    if (this.map.main[i].setting.structure === "basic") {
      this.map.main[i].dom.mobile.appendChild(this.basicStructure(this.map.main[i], "mobile", i));
      temp = this.map.main[i].dom.mobile.querySelectorAll(".moblock_contentsbox");
      this.map.main[i].dom.mobile.style.height = temp[temp.length - 1].getAttribute("cus_height");
    } else if (this.map.main[i].setting.structure === "process") {
      this.map.main[i].dom.mobile.appendChild(this.processStructure(this.map.main[i], "mobile", i));
    } else if (this.map.main[i].setting.structure === "review") {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("moblock_contentsbox_review");
      div_clone.style.width = String(91) + ea;
      div_clone.style.marginLeft = String(6.4) + ea;
      div_clone.style.marginBottom = String(15) + ea;
      div_clone.appendChild(rowDoms.mobile);
      this.map.main[i].dom.mobile.appendChild(div_clone);
    }

  }
}

AboutJs.prototype.processStructure = function (obj, flatform, motherNumber) {
  let { images, words } = obj;
  let div_clone, div_clone2, img_clone, temp, width, top, ea, height, specialWordHeight, specialArrowHeight;
  let h = document.createDocumentFragment();
  let resterImages = [];
  for (let i = 0; i < images.length; i++) {
    if (!images[i].vector) {
      resterImages.push(images[i]);
    }
  }

  if (flatform === "desktop") {

    //desktop

    height = this.generalWordHeight;
    top = 142;
    ea = "px";

    let buttonLeft, buttonBottom;
    let reverseButtons = [];
    let buttonHeight = this.generalButton.height;
    let buttonWidthes = {}
    let buttonHeights = {
      number: this.generalButton.number,
      button: this.generalButton.button,
      arrow: this.generalButton.arrow
    }
    let buttonMargin = this.generalButton.margin;
    let buttonStack = 0;

    /<%media%>/ specialWordHeight = 16 %/%/% 15 %/%/i
    %/%/+ specialArrowHeight = 22 %/%/% 16 %/%/g

    for (let i = 0; i < words.length; i++) {
      //init
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("block_contentsbox");
      /<%media%>/ temp = 1400 %/%/% 1050 %/%/i
      %/%/+ div_clone.style.height = String(561) + ea %/%/% String(470) + ea %/%/i
      %/%/+ div_clone.style.marginTop = String(57) + ea %/%/% String(42) + ea %/%/i
      %/%/+ div_clone.style.paddingBottom = String(45) + ea %/%/% String(45) + ea %/%/g
      div_clone.style.width = String(temp) + ea;
      div_clone.style.marginLeft = '-' + String(temp/2) + ea;

      //wording
      width = GeneralJs.parseRatio({ source: words[i].src.desktop, target: height, method: "height", result: "number" }) + 2;

      img_clone = SvgTong.tongMaker();
      img_clone.src = AboutJs.sourceLink + words[i].src.desktop;
      img_clone.style.position = "absolute";
      img_clone.style[words[i].direction] = "0";
      img_clone.style.bottom = String(this.generalBottom) + ea;
      img_clone.style.height = String(height) + ea;
      img_clone.style.width = String(width) + ea;
      div_clone.appendChild(SvgTong.parsing(img_clone));

      //process pictures
      for (let i = 0; i < resterImages.length; i++) {
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("block_contentsbox_process");
        /<%media%>/ div_clone2.style.marginTop = String(35) + ea %/%/% String(41) + ea %/%/i
        %/%/+ div_clone2.style.width = String(245) + ea %/%/% String(186) + ea %/%/i
        %/%/+ div_clone2.style.height = String(240) + ea %/%/% String(181) + ea %/%/i
        %/%/+ div_clone2.style.marginLeft = String(43) + ea %/%/% String(30) + ea %/%/i
        %/%/+ div_clone2.style.marginBottom = String(12) + ea %/%/% String(-8) + ea %/%/g

        if (i === 0 || i === 5) {
          div_clone2.style.marginLeft = String(0) + ea;
        }
        div_clone2.style.backgroundImage = "url('" + AboutJs.sourceLink + resterImages[i].src + "')";


        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + images[2*i + 1].src;
        img_clone.style.position = "absolute";
        img_clone.style.height = String(specialWordHeight) + ea;
        img_clone.style.width = String(GeneralJs.parseRatio({ source: images[2*i + 1].src, target: specialWordHeight, method: "height", result: "number" }) + 2) + ea;
        img_clone.style.left = "50%";
        img_clone.style.marginLeft = String((Number(img_clone.style.width.slice(0, (-1 * ea.length))) / 2) * -1) + ea;
        if (i === resterImages.length - 1 || i === resterImages.length - 2) {
          /<%media%>/ img_clone.style.bottom = String(-33) + ea %/%/% String(-32) + ea %/%/i
        } else {
          /<%media%>/ img_clone.style.top = String(-31) + ea %/%/% String(-30) + ea %/%/i
        }
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + this.map.sub.etc.arrow[1].src;
        img_clone.classList.add("block_contentsbox_button_proccess_arrow");
        img_clone.style.height = String(specialArrowHeight) + ea;
        img_clone.style.width = String(GeneralJs.parseRatio({ source: this.map.sub.etc.arrow[1].src, target: specialArrowHeight, method: "height", result: "number" }) + 1) + ea;
        img_clone.style.marginTop = '-' + String((specialArrowHeight/2) + 2) + ea;
        img_clone.style.right = '-' + String(specialArrowHeight + 6) + ea;
        if (i === 0 || i === 4) {
          img_clone.style.display = "none";
        }
        if (i === 5 || i === 6) {
          if (i === 5) {
            div_clone2.appendChild(SvgTong.parsing(img_clone));
            img_clone = SvgTong.tongMaker();
            img_clone.src = AboutJs.sourceLink + this.map.sub.etc.arrow[1].src;
            img_clone.classList.add("block_contentsbox_button_proccess_arrow");
            img_clone.style.height = String(specialArrowHeight) + ea;
            img_clone.style.width = String(GeneralJs.parseRatio({ source: this.map.sub.etc.arrow[1].src, target: specialArrowHeight, method: "height", result: "number" }) + 1) + ea;
          }
          img_clone.style.transform = "rotate(" + ((i === 5) ? "90" : "270") + "deg)";
          img_clone.style.left = "50%";
          img_clone.style.marginLeft = "-6px";
          img_clone.style.top = '-' + String(specialArrowHeight * 1.6) + ea;
          img_clone.style.marginTop = "0";
          img_clone.style.right = "0";
        }
        div_clone2.appendChild(SvgTong.parsing(img_clone));
        div_clone.appendChild(div_clone2);
      }

      //buttons
      buttonLeft = 0;
      buttonBottom = this.generalBottom;
      reverseButtons = [];
      buttonStack = 0;
      for (let j = 0; j < words[i].src.buttons.length; j++) {
        reverseButtons.unshift(words[i].src.buttons[j]);
      }
      buttonWidthes = {}
      for (let j = 0; j < reverseButtons.length; j++) {
        buttonWidthes.number = GeneralJs.parseRatio({ source: reverseButtons[j].number, target: buttonHeights.number, method: "height", result: "number" }) + 1;
        buttonWidthes.button = GeneralJs.parseRatio({ source: reverseButtons[j].button, target: buttonHeights.button, method: "height", result: "number" }) + 1;
        buttonWidthes.arrow = GeneralJs.parseRatio({ source: this.map.sub.etc.arrow[0].src, target: buttonHeights.arrow, method: "height", result: "number" }) + 1;
        width = buttonWidthes.number + buttonWidthes.button + buttonWidthes.arrow + (buttonMargin * 3.7);

        //main button
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("block_contentsbox_button");
        /<%media%>/ div_clone2.style.left = String(578) + ea %/%/% String(433) + ea %/%/i
        div_clone2.style.backgroundColor = "#59af89";
        div_clone2.style.height = String(buttonHeight) + ea;
        div_clone2.style.width = String(width) + ea;
        div_clone2.style.bottom = String(buttonBottom) + ea;
        div_clone2.addEventListener("click", this.whitePopup("desktop", [ motherNumber, i, reverseButtons.length - j - 1 ]));
        buttonLeft += width + buttonMargin - 3;

        //number
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + reverseButtons[j].number;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.number) / 2) - 1) + ea;
        img_clone.style.width = String(buttonWidthes.number) + ea;
        img_clone.style.height = String(buttonHeights.number) + ea;
        img_clone.style.left = String(buttonMargin + 1) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        //content
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + reverseButtons[j].button;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.button) / 2) - 1) + ea;
        img_clone.style.width = String(buttonWidthes.button) + ea;
        img_clone.style.height = String(buttonHeights.button) + ea;
        img_clone.style.left = String((buttonMargin * 1.7) + buttonWidthes.number) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        //arrow
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + this.map.sub.etc.arrow[0].src;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.arrow) / 2) - 2) + ea;
        img_clone.style.width = String(buttonWidthes.arrow) + ea;
        img_clone.style.height = String(buttonHeights.arrow) + ea;
        img_clone.style.right = String(buttonMargin + 1) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        div_clone.appendChild(div_clone2);
        buttonBottom = buttonBottom + buttonHeight + 9;
      }
      //end
      h.appendChild(div_clone);
    }

    return h;

  } else {

    //mobile

    let moimages, moresterImages;

    moimages = [];
    moimages.push(images[0]);
    moimages.push(images[1]);
    moimages.push(images[12]);
    moimages.push(images[13]);
    moimages.push(images[2]);
    moimages.push(images[3]);
    moimages.push(images[4]);
    moimages.push(images[5]);
    moimages.push(images[6]);
    moimages.push(images[7]);
    moimages.push(images[8]);
    moimages.push(images[9]);

    moresterImages = [];
    for (let i = 0; i < moimages.length; i++) {
      if (!moimages[i].vector) {
        moresterImages.push(moimages[i]);
      }
    }

    width = 87.2;
    top = 169.5;
    specialWordHeight = 3.3;
    specialArrowHeight = 22;
    ea = "vw";

    for (let i = 0; i < words.length; i++) {
      //init
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("moblock_contentsbox");
      div_clone.style.paddingTop = String(7) + ea;
      div_clone.style.height = String(230.5) + ea;

      //wording
      height = GeneralJs.parseRatio({ source: words[i].src.mobile, target: width, method: "width", result: "number" }) + 2;

      img_clone = SvgTong.tongMaker();
      img_clone.src = AboutJs.sourceLink + words[i].src.mobile;
      img_clone.style.position = "absolute";
      img_clone.style[words[i].direction] = "0";
      img_clone.style.top = String(top) + ea;
      img_clone.style.height = String(height) + ea;
      img_clone.style.width = String(width) + ea;
      div_clone.appendChild(SvgTong.parsing(img_clone));

      //button
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.style.position = "absolute";
      div_clone2.style.opacity = "0";
      div_clone2.style.cursor = "pointer";
      div_clone2.style.width = String(width) + ea;
      div_clone2.style.height = String(9) + ea;
      div_clone2.style.top = String(top - 1) + ea;
      div_clone2.style.left = String(0) + ea;
      div_clone2.addEventListener("click", this.whitePopup("mobile", [ motherNumber, i, 0 ]));
      div_clone.appendChild(div_clone2);

      //process pictures
      for (let i = 0; i < moresterImages.length; i++) {
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("moblock_contentsbox_process");

        div_clone2.style.marginTop = String(7.5) + ea;
        div_clone2.style.width = String(42) + ea;
        div_clone2.style.height = String(42) + ea;
        div_clone2.style.marginLeft = String(3) + ea;
        div_clone2.style.marginBottom = String(3) + ea;

        if (Number.isInteger(i / 2)) {
          div_clone2.style.marginLeft = String(0) + ea;
        }

        div_clone2.style.backgroundImage = "url('" + AboutJs.sourceLink + "/mo" + moresterImages[i].src.slice(1) + "')";

        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + moimages[2*i + 1].src;
        img_clone.style.position = "absolute";
        img_clone.style.height = String(specialWordHeight) + ea;
        img_clone.style.width = String(GeneralJs.parseRatio({ source: moimages[2*i + 1].src, target: specialWordHeight, method: "height", result: "number" })) + ea;
        img_clone.style.left = "50%";
        img_clone.style.marginLeft = String(((GeneralJs.parseRatio({ source: moimages[2*i + 1].src, target: specialWordHeight, method: "height", result: "number" })) / 2) * -1) + ea;
        img_clone.style.top = String(-5.8) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        div_clone.appendChild(div_clone2);
      }

      //end
      h.appendChild(div_clone);
    }

    return h;

  }
}

AboutJs.prototype.basicStructure = function (obj, flatform, motherNumber) {
  let { images, words } = obj;
  if (words.length !== images.length) { throw new Error("structure error"); }
  for (let i = 0; i < words.length; i++) { words[i].image = images[i]; }
  let div_clone, div_clone2, img_clone, temp;
  let h = document.createDocumentFragment();
  let height, unbalance, top, ea, width, totalheight;

  if (flatform === "desktop") {

    //desktop

    /<%media%>/ height = this.generalWordHeight %/%/% this.generalWordHeight - 9 %/%/i
    %/%/+ unbalance = 36 %/%/% 64 %/%/i
    %/%/+ top = 142 %/%/% 132 %/%/g
    ea = "px";

    let buttonLeft, buttonBottom;
    let reverseButtons = [];
    let buttonHeight = this.generalButton.height;
    let buttonWidthes = {}
    let buttonHeights = {
      number: this.generalButton.number,
      button: this.generalButton.button,
      arrow: this.generalButton.arrow
    }
    let buttonMargin = this.generalButton.margin;
    let buttonStack = 0;

    for (let i = 0; i < words.length; i++) {
      //init
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("block_contentsbox");
      /<%media%>/ temp = 1400 %/%/% 1050 %/%/i
      %/%/+ div_clone.style.height = String(height + (top * 2)) + ea %/%/% String(height + (top * 2) - 60) + ea %/%/i
      %/%/+ div_clone.style.marginTop = String(57) + ea %/%/% String(42) + ea %/%/i
      %/%/+ div_clone.style.paddingBottom = String(45) + ea %/%/% String(45) + ea %/%/g
      div_clone.style.width = String(temp) + ea;
      div_clone.style.marginLeft = '-' + String(temp/2) + ea;

      //wording
      width = GeneralJs.parseRatio({ source: words[i].src.desktop, target: height, method: "height", result: "number" }) + 2;
      img_clone = SvgTong.tongMaker();
      img_clone.src = AboutJs.sourceLink + words[i].src.desktop;
      img_clone.style.position = "absolute";
      img_clone.style[words[i].direction] = "0";
      img_clone.style.top = String(top - unbalance) + ea;
      img_clone.style.height = String(height) + ea;
      img_clone.style.width = String(width) + ea;
      div_clone.appendChild(SvgTong.parsing(img_clone));

      //image
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("block_contentsbox_picture");
      div_clone2.style.backgroundImage = "url('" + AboutJs.sourceLink + words[i].image.src + "')";
      div_clone2.style[(words[i].direction === "left" ? "right" : "left")] = "0";
      /<%media%>/ div_clone2.style.height = String(height + (top * 2)) + ea %/%/% String(height + (top * 2) - 60) + ea %/%/i
      %/%/+ div_clone2.style.width = String(890) + ea %/%/% String(620) + ea %/%/g
      div_clone.appendChild(div_clone2);

      //buttons
      buttonLeft = 0;
      buttonBottom = this.generalBottom;
      reverseButtons = [];
      buttonStack = 0;
      for (let j = 0; j < words[i].src.buttons.length; j++) {
        reverseButtons.unshift(words[i].src.buttons[j]);
      }
      buttonWidthes = {}
      for (let j = 0; j < reverseButtons.length; j++) {
        buttonWidthes.number = GeneralJs.parseRatio({ source: reverseButtons[j].number, target: buttonHeights.number, method: "height", result: "number" }) + 1;
        buttonWidthes.button = GeneralJs.parseRatio({ source: reverseButtons[j].button, target: buttonHeights.button, method: "height", result: "number" }) + 1;
        buttonWidthes.arrow = GeneralJs.parseRatio({ source: this.map.sub.etc.arrow[0].src, target: buttonHeights.arrow, method: "height", result: "number" }) + 1;
        width = buttonWidthes.number + buttonWidthes.button + buttonWidthes.arrow + (buttonMargin * 3.7);

        if (buttonLeft > 200 || buttonStack !== 0) {
          buttonBottom = buttonBottom + buttonHeight + 9;
          buttonStack = 0;
          buttonLeft = 0;
        } else if (buttonLeft !== 0 && words[i].direction === "left") {
          div_clone2.style.left = String(width + buttonMargin - 3) + ea;
          buttonStack = buttonStack + 1;
          buttonLeft = 0;
        }

        //main button
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.classList.add("block_contentsbox_button");
        div_clone2.style.backgroundColor = "#59af89";
        div_clone2.style.height = String(buttonHeight) + ea;
        div_clone2.style.width = String(width) + ea;
        div_clone2.style.bottom = String(buttonBottom) + ea;
        div_clone2.style[words[i].direction] = String(buttonLeft) + ea;
        div_clone2.addEventListener("click", this.whitePopup("desktop", [ motherNumber, i, reverseButtons.length - j - 1 ]));
        buttonLeft += width + buttonMargin - 3;

        //number
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + reverseButtons[j].number;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.number) / 2) - 1) + ea;
        img_clone.style.width = String(buttonWidthes.number) + ea;
        img_clone.style.height = String(buttonHeights.number) + ea;
        img_clone.style.left = String(buttonMargin + 1) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        //content
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + reverseButtons[j].button;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.button) / 2) - 1) + ea;
        img_clone.style.width = String(buttonWidthes.button) + ea;
        img_clone.style.height = String(buttonHeights.button) + ea;
        img_clone.style.left = String((buttonMargin * 1.7) + buttonWidthes.number) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        //arrow
        img_clone = SvgTong.tongMaker();
        img_clone.src = AboutJs.sourceLink + this.map.sub.etc.arrow[0].src;
        img_clone.style.position = "absolute";
        img_clone.style.top = String(((buttonHeight - buttonHeights.arrow) / 2) - 2) + ea;
        img_clone.style.width = String(buttonWidthes.arrow) + ea;
        img_clone.style.height = String(buttonHeights.arrow) + ea;
        img_clone.style.right = String(buttonMargin + 1) + ea;
        div_clone2.appendChild(SvgTong.parsing(img_clone));

        div_clone.appendChild(div_clone2);
      }
      //end
      h.appendChild(div_clone);
    }

    return h;

  } else {

    //mobile

    width = 87.2;
    top = 66.5;
    ea = "vw";
    totalheight = 0;

    for (let i = 0; i < words.length; i++) {
      //init
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("moblock_contentsbox");

      //wording
      height = GeneralJs.parseRatio({ source: words[i].src.mobile, target: width, method: "width", result: "number" }) + 2;
      img_clone = SvgTong.tongMaker();
      img_clone.src = AboutJs.sourceLink + words[i].src.mobile;
      img_clone.style.position = "absolute";
      img_clone.style[words[i].direction] = "0";
      img_clone.style.top = String(top) + ea;
      img_clone.style.height = String(height) + ea;
      img_clone.style.width = String(width) + ea;
      div_clone.appendChild(SvgTong.parsing(img_clone));

      //button
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.style.position = "absolute";
      div_clone2.style.opacity = "0";
      div_clone2.style.cursor = "pointer";
      div_clone2.style.width = String(width) + ea;
      div_clone2.style.height = String(9) + ea;
      div_clone2.style.top = String(top - 1) + ea;
      div_clone2.style.left = String(0) + ea;
      div_clone2.addEventListener("click", this.whitePopup("mobile", [ motherNumber, i, 0 ]));
      div_clone.appendChild(div_clone2);

      //image
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("moblock_contentsbox_picture");
      div_clone2.style.backgroundImage = "url('" + AboutJs.sourceLink + "/mo" + words[i].image.src.slice(1) + "')";
      div_clone2.style[(words[i].direction === "left" ? "right" : "left")] = "0";
      div_clone2.style.width = String(width) + ea;
      temp = width * 0.58;
      div_clone2.style.height = String(temp) + ea;
      div_clone2.style.top = String(8) + ea;
      if (words[i + 1] === undefined) {
        div_clone.style.height = String(top + temp) + ea;
      } else {
        div_clone.style.height = String(top + temp - 4) + ea;
      }
      div_clone.appendChild(div_clone2);
      totalheight += top + temp + 12.5 - (12.5 * i);
      div_clone.setAttribute("cus_height", String(totalheight + 2) + ea);

      //end
      h.appendChild(div_clone);
    }
    return h;
  }
}

AboutJs.prototype.toHidden = function (rows) {
  let hiddenSpot = document.getElementById("hiddentextmain0817");
  let div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = "hidden_desktopDom_review";
  div_clone.style.display = "none";
  div_clone.appendChild(rows.desktop.cloneNode(true));
  hiddenSpot.appendChild(div_clone);
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = "hidden_mobileDom_review";
  div_clone.style.display = "none";
  div_clone.appendChild(rows.mobile.cloneNode(true));
  hiddenSpot.appendChild(div_clone);
  let timeout = setTimeout(function () {
    let div_clone;
    div_clone = document.getElementById("footergreenback0817").cloneNode(true);
    div_clone.id = "footergreenback0817_clone";
    div_clone.style.display = "none";
    hiddenSpot.appendChild(div_clone);
    div_clone = document.querySelector(".mofooterbelow").cloneNode(true);
    div_clone.id = "mofooterbelow_clone";
    div_clone.style.display = "none";
    hiddenSpot.appendChild(div_clone);
    clearTimeout(timeout);
  }, 0);
}

AboutJs.prototype.whiteDomMaker = function (arr, flatform) {
  const instance = this;
  let [ x, y, z ] = arr;
  x = Number(x), y = Number(y), z = Number(z);
  let div_clone, img_clone;
  let ea;
  let popupMargin = {}
  if (flatform === "desktop") {
    ea = "px";
    popupMargin.top = window.innerHeight * (65 / 985);
    if (window.innerHeight > 930) {
      popupMargin.top = window.innerHeight * (65 / 985);
      /<%media%>/ popupMargin.left = window.innerHeight * (60 / 985) %/%/% window.innerHeight * (55 / 985) %/%/i
    } else {
      /<%media%>/ popupMargin.top = window.innerHeight * (65 / 985) %/%/% popupMargin.top = window.innerHeight * (72 / 985) %/%/i
      %/%/+ popupMargin.left = window.innerHeight * (60 / 985) %/%/% window.innerHeight * (58 / 985) %/%/g
    }

  } else {
    ea = "vw";
  }
  let mobileHeight = 0;

  let dom = GeneralJs.nodes.div.cloneNode(true);
  dom.classList.add("whitePopupContents");

  let wording_src, wording_width, wording_spec = {};
  if (flatform === "desktop") {

    //popup - wording
    wording_src = instance.map.main[x].words[y].popup.words[z].src.desktop.word;

    if (window.innerHeight > 1200) {
      /<%media%>/ wording_width = window.innerHeight * (350 / 985) %/%/% window.innerHeight * (340 / 985) %/%/i
    } else if (window.innerHeight > 1000) {
      /<%media%>/ wording_width = window.innerHeight * (380 / 985) %/%/% window.innerHeight * (350 / 985) %/%/i
    } else if (window.innerHeight > 930) {
      /<%media%>/ wording_width = window.innerHeight * (400 / 985) %/%/% window.innerHeight * (370 / 985) %/%/i
    } else {
      /<%media%>/ wording_width = window.innerHeight * (400 / 985) %/%/% window.innerHeight * (430 / 985) %/%/i
    }

    wording_spec = {
      height: String(GeneralJs.parseRatio({ source: wording_src, target: wording_width, method: "width", result: "number" }) + 1) + ea,
      width: String(wording_width) + ea,
      position: "absolute",
      bottom: String(popupMargin.top + 30) + ea,
    }
    img_clone = SvgTongAsync.tongMaker();
    img_clone.src = AboutJs.sourceLink + wording_src;
    for (let i in wording_spec) {
      img_clone.style[i] = wording_spec[i];
    }
    img_clone.style[instance.map.main[x].words[y].popup.words[z].direction] = String(popupMargin.left) + ea;
    dom.appendChild(SvgTongAsync.parsing(img_clone));

    //popup - number
    let number_src, number_height, number_spec = {};
    number_src = instance.map.main[x].words[y].popup.words[z].src.desktop.number;

    if (window.innerHeight > 1200) {
      /<%media%>/ number_height = window.innerHeight * (13 / 985) %/%/% window.innerHeight * (10 / 985) %/%/i
    } else if (window.innerHeight > 1000) {
      /<%media%>/ number_height = window.innerHeight * (16 / 985) %/%/% window.innerHeight * (13 / 985) %/%/i
    } else if (window.innerHeight > 930) {
      /<%media%>/ number_height = window.innerHeight * (18 / 985) %/%/% window.innerHeight * (15 / 985) %/%/i
    } else {
      number_height = window.innerHeight * (18 / 985);
    }

    number_spec = {
      height: String(number_height) + ea,
      width: String(GeneralJs.parseRatio({ source: number_src, target: number_height, method: "height", result: "number" }) + 1) + ea,
      position: "absolute",
      top: String(popupMargin.top) + ea,
    }
    img_clone = SvgTongAsync.tongMaker();
    img_clone.src = AboutJs.sourceLink + number_src;
    for (let i in number_spec) {
      img_clone.style[i] = number_spec[i];
    }
    img_clone.style[instance.map.main[x].words[y].popup.words[z].direction] = String(popupMargin.left) + ea;
    dom.appendChild(SvgTongAsync.parsing(img_clone));

    //popup - green box
    let greenbox_spec = {
      height: String(4) + ea,
      position: "absolute",
      bottom: String(popupMargin.top) + ea,
      backgroundColor: "#2fa678",
      opacity: "0.9",
      borderRadius: String(3) + ea,
    };

    /<%media%>/ greenbox_spec.width = String(window.innerHeight * (40 / 985)) + ea %/%/% String(window.innerHeight * (36 / 985)) + ea %/%/i
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    for (let i in greenbox_spec) {
      div_clone.style[i] = greenbox_spec[i];
    }
    div_clone.style[instance.map.main[x].words[y].popup.words[z].direction] = String(popupMargin.left) + ea;
    dom.appendChild(div_clone);

  } else if (flatform === "mobile") {

    //popup - mobile title
    wording_src = instance.map.main[x].words[y].popup.words[z].src.mobile.title;
    wording_width = 75.6;
    wording_spec = {
      height: String(GeneralJs.parseRatio({ source: wording_src, target: wording_width, method: "width", result: "number" }) + 1) + ea,
      width: String(wording_width) + ea,
      position: "relative",
      left: "5.6vw",
    }
    img_clone = SvgTongAsync.tongMaker();
    img_clone.src = AboutJs.sourceLink + wording_src;
    for (let i in wording_spec) {
      img_clone.style[i] = wording_spec[i];
    }
    dom.appendChild(SvgTongAsync.parsing(img_clone));
    mobileHeight += Number(wording_spec.height.replace(new RegExp(ea + '$'), ''));

  }

  //popup - levels
  let levelBoo;
  let levels = [ "level0", "level1", "level2" ];
  let level_width, level_src, level_src_png, level_height, level_spec = {};

  //desktop
  if (flatform === "desktop") {

    for (let i = 0; i < levels.length; i++) {

      if (window.innerHeight > 930) {
        /<%media%>/ level_width = window.innerHeight * (1040 / 985) %/%/% window.innerHeight * (756 / 985) %/%/i
      } else {
        /<%media%>/ level_width = window.innerHeight * (1040 / 985) %/%/% window.innerHeight * (1030 / 985) %/%/i
      }

      if (i === 1) {
        level_src_png = instance.map.main[x].words[y].popup.images[z][levels[i]].src.desktop;
      } else {
        level_src = instance.map.main[x].words[y].popup.images[z][levels[i]].src.media1400;
        if (window.innerHeight > 930) {
          /<%media%>/ level_src = instance.map.main[x].words[y].popup.images[z][levels[i]].src.media1400 %/%/% instance.map.main[x].words[y].popup.images[z][levels[i]].src.media1050 %/%/i
        }
      }
      level_spec = {
        height: String(GeneralJs.parseRatio({ source: level_src, target: level_width, method: "width", result: "number" })) + ea,
        width: String(level_width) + ea,
        position: "absolute",
        top: "50%",
        marginTop: "-" + String(((GeneralJs.parseRatio({ source: level_src, target: level_width, method: "width", result: "number" })) / 2) + 1) + ea,
      }

      if (i !== 1) {
        img_clone = SvgTongAsync.tongMaker();
        img_clone.src = AboutJs.sourceLink + level_src;
      } else {
        img_clone = GeneralJs.nodes.div.cloneNode(true);
        img_clone.style.backgroundImage = "url('" + AboutJs.sourceLink + level_src_png + "')";

        img_clone.style.backgroundPosition = instance.map.main[x].words[y].popup.images[z][levels[i]].map.media1400;
        img_clone.style.backgroundSize = String(100 * Number(level_src_png.split('_')[1].split('a')[0].replace(/rspot/, '.'))) + "%";

        if (window.innerHeight > 930) {
          /<%media%>/ img_clone.style.backgroundPosition = instance.map.main[x].words[y].popup.images[z][levels[i]].map.media1400 %/%/% img_clone.style.backgroundPosition = instance.map.main[x].words[y].popup.images[z][levels[i]].map.media1050 %/%/i
          %/%/+ img_clone.style.backgroundSize = String(100 * Number(level_src_png.split('_')[1].split('a')[0].replace(/rspot/, '.'))) + "%" %/%/% String(100 * Number(level_src_png.split('_')[1].split('a')[1].replace(/rspot/, '.'))) + "%" %/%/g
        } else {
          img_clone.style.backgroundPosition = instance.map.main[x].words[y].popup.images[z][levels[i]].map.media1400;
          img_clone.style.backgroundSize = String(100 * Number(level_src_png.split('_')[1].split('a')[0].replace(/rspot/, '.'))) + "%";
        }

      }

      for (let i in level_spec) {
        img_clone.style[i] = level_spec[i];
      }
      levelBoo = instance.map.main[x].words[y].popup.words[z].direction === "left" ? "right" : "left";
      img_clone.style[levelBoo] = String(-1 * window.innerHeight * (24 / 985)) + ea;

      if (i !== 1) {
        dom.appendChild(SvgTongAsync.parsing(img_clone));
      } else {
        dom.appendChild(img_clone);
      }
    }

  } else if (flatform === "mobile") {

    level_width = 89.2;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("mobileLevelsTong");
    div_clone.style.position = "relative";
    div_clone.style.backgroundColor = "#f2f2f2";
    div_clone.style.width = String(87) + ea;
    div_clone.style.overflow = "hidden";
    div_clone.style.marginTop = String(4) + ea;
    div_clone.style.marginBottom = String(6) + ea;

    for (let i = 0; i < levels.length; i++) {

      if (i === 1) {
        level_src_png = instance.map.main[x].words[y].popup.images[z][levels[i]].src.mobile;
      } else {
        level_src = instance.map.main[x].words[y].popup.images[z][levels[i]].src.media900;
      }
      level_spec = {
        height: String(GeneralJs.parseRatio({ source: level_src, target: level_width, method: "width", result: "number" }) + 1) + ea,
        width: String(level_width) + ea,
        position: "absolute",
        top: String(0) + ea,
        left: String(-1.1) + ea,
      }

      if (i !== 1) {
        img_clone = SvgTongAsync.tongMaker();
        img_clone.src = AboutJs.sourceLink + level_src;
      } else {
        img_clone = GeneralJs.nodes.div.cloneNode(true);
        img_clone.style.backgroundImage = "url('" + AboutJs.sourceLink + level_src_png + "')";
        img_clone.style.backgroundPosition = instance.map.main[x].words[y].popup.images[z][levels[i]].map.media900;
        img_clone.style.backgroundSize = String(100 * Number(level_src_png.split('_')[1].split('a')[0].replace(/rspot/, '.'))) + "%";
      }

      for (let i in level_spec) {
        img_clone.style[i] = level_spec[i];
      }

      if (i !== 1) {
        div_clone.appendChild(SvgTongAsync.parsing(img_clone));
      } else {
        div_clone.appendChild(img_clone);
      }

    }

    div_clone.style.height = String(GeneralJs.parseRatio({ source: level_src, target: level_width, method: "width", result: "number" }) + 1) + ea;
    dom.appendChild(div_clone);
    mobileHeight += Number(div_clone.style.height.replace(new RegExp(ea + '$'), ''));

    //popup - mobile wording contents
    wording_src = instance.map.main[x].words[y].popup.words[z].src.mobile.contents;
    wording_width = 75.6;
    wording_spec = {
      height: String(GeneralJs.parseRatio({ source: wording_src, target: wording_width, method: "width", result: "number" }) + 1) + ea,
      width: String(wording_width) + ea,
      position: "relative",
      left: "5.6vw",
    }
    img_clone = SvgTongAsync.tongMaker();
    img_clone.src = AboutJs.sourceLink + wording_src;
    for (let i in wording_spec) {
      img_clone.style[i] = wording_spec[i];
    }
    dom.appendChild(SvgTongAsync.parsing(img_clone));
    mobileHeight += Number(wording_spec.height.replace(new RegExp(ea + '$'), ''));

    //title margin
    mobileHeight += 4;
    //contents margin
    mobileHeight += 6;
    //padding bottom
    mobileHeight += 12;

    mobileHeight = Math.round(mobileHeight * 1000) / 1000;
    dom.setAttribute("cus_totalHeight", String(mobileHeight));

  }

  return dom;
}

AboutJs.prototype.whiteLoadContents = function (motherDom) {
  const instance = this;
  const flatform = motherDom.getAttribute("cus_flatform");
  const xyzArr = motherDom.getAttribute("cus_numberInfo").split("_");
  let div_clone, div_clone2, doms, groupDoms, countArr;
  let mobileHeight = 0;

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("whitePopupFrame");

  if (flatform === "desktop") {

    let { left, center, right } = this.whiteXyzConvert(xyzArr);
    doms = new Array(3);

    doms[0] = this.whiteDomMaker(left, flatform);
    doms[1] = this.whiteDomMaker(center, flatform);
    doms[2] = this.whiteDomMaker(right, flatform);

    doms[0].style.position = "absolute";
    doms[0].style.transform = "translate(-" + motherDom.style.width + ", 0)";
    doms[2].style.position = "absolute";
    doms[2].style.transform = "translate(" + motherDom.style.width + ", 0)";

    div_clone.appendChild(doms[0]);
    div_clone.appendChild(doms[1]);
    div_clone.appendChild(doms[2]);
    this.scrollX(div_clone, flatform);

  } else if (flatform === "mobile") {

    let { left, center, right } = this.whiteXyzConvert(xyzArr, { group: true, multiple: true });
    doms = new Array(3);
    countArr = [ left, center, right ];

    for (let j = 0; j < countArr.length; j++) {
      mobileHeight = 0;
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("whitePopupGroup");
      if (j !== 1) {
        if (j === 0) {
          div_clone2.style.position = "absolute";
          div_clone2.style.transform = "translate(-" + motherDom.style.width + ", 0vw)";
        } else {
          div_clone2.style.position = "absolute";
          div_clone2.style.transform = "translate(" + motherDom.style.width + ", 0vw)";
        }
      }
      groupDoms = [];
      for (let i = 0; i < countArr[j].length; i++) {
        groupDoms.push(this.whiteDomMaker(countArr[j][i], flatform));
        mobileHeight += Number(groupDoms[i].getAttribute("cus_totalHeight"));
        if (i === 0) {
          groupDoms[i].style.paddingTop = String(8) + "vw";
          mobileHeight += 8;
        }
        div_clone2.appendChild(groupDoms[i]);
      }
      div_clone2.setAttribute("cus_totalHeight", String(mobileHeight));
      div_clone.appendChild(div_clone2);
    }
    this.scrollX(div_clone, flatform);

  }

  motherDom.appendChild(div_clone);

}

AboutJs.prototype.scrollX = function (node, flatform) {
  const instance = this;
  const translateNumber = function (transStr) { return Number(transStr.replace(/[^0-9\.-]/g, '')); }
  const translateParseXY = function (transStr) {
    let newStr, newArrRaw, newArr = [];
    newStr = transStr.replace(/translate/g, '').replace(/[\(\)]/g, '').trim();
    newArrRaw = newStr.split(',');
    for (let i = 0; i < newArrRaw.length; i++) {
      newArr.push(newArrRaw[i].trim());
    }
    return newArr;
  }
  const translatePixel = function (vw) {
    vw = String(vw);
    let vwNum = Number(vw.replace(/vw$/, '').replace(/[^0-9\.-]/g, ''));
    return window.innerWidth * (vwNum / 100)
  }
  const translateVw = function (px) {
    px = String(px);
    let pxNum = Number(px.replace(/px$/, '').replace(/[^0-9\.-]/g, ''));
    return (pxNum / window.innerWidth) * 100
  }

  let isDown = false;
  let startX, startY, walk, walkX, walkY;
  let scrollLeft = {};
  let eventStart, eventPending, eventStop, eventEnd;
  let [ left, center, right ] = node.children;
  let ea;
  if (flatform === "desktop") {
    ea = "vh";
  } else if (flatform === "mobile") {
    ea = "vw";
  }
  let pastY = 0;
  let endTimout;
  let endStack = 0;
  center.style.transform = "translate(0" + ea + ", 0" + ea + ")";

  if (flatform === "desktop") {

    eventStart = function (e) {
      isDown = true;
      walk = 0;
      startX = e.pageX;
      scrollLeft.left = translateParseXY(left.style.transform);
      scrollLeft.center = translateParseXY(center.style.transform);
      scrollLeft.right = translateParseXY(right.style.transform);
      node.style.cursor = "grabbing";
    }

    eventPending = function (e) {
      if (!isDown) { return }
      e.preventDefault();
      walk = e.pageX - startX;
    }

    eventStop = function (e) {
      isDown = false;
      node.style.cursor = "pointer";
    }

    eventEnd = function (e) {
      isDown = false;
      node.style.cursor = "pointer";
      scrollLeft.left = translateParseXY(left.style.transform);
      scrollLeft.center = translateParseXY(center.style.transform);
      scrollLeft.right = translateParseXY(right.style.transform);

      let newDom;
      let { left: pastleft, right: pastright } = instance.whiteXyzConvert(node.parentElement.getAttribute("cus_numberinfo").split('_'));

      if (walk < 0) {

        let { left: newleft, center: newcenter, right: newright } = instance.whiteXyzConvert(pastright);
        node.removeChild(node.firstChild);
        node.children[0].style.position = "absolute";
        node.children[0].style.transform = "translate(-" + node.parentElement.style.width + ", 0" + ea + ")";
        node.children[1].style.position = "";
        node.children[1].style.transform = "";
        newDom = instance.whiteDomMaker(newright, flatform);
        newDom.style.position = "absolute";
        newDom.style.transform = "translate(" + node.parentElement.style.width + ", 0" + ea + ")";
        node.appendChild(newDom);
        node.parentElement.setAttribute("cus_numberinfo", newcenter.join("_"));

      } else if (walk > 0) {

        let { left: newleft, center: newcenter, right: newright } = instance.whiteXyzConvert(pastleft);
        node.removeChild(node.lastChild);
        node.children[0].style.position = "";
        node.children[0].style.transform = "";
        node.children[1].style.position = "absolute";
        node.children[1].style.transform = "translate(" + node.parentElement.style.width + ", 0" + ea + ")";
        newDom = instance.whiteDomMaker(newleft, flatform);
        newDom.style.position = "absolute";
        newDom.style.transform = "translate(-" + node.parentElement.style.width + ", 0" + ea + ")";
        node.insertBefore(newDom, node.firstChild);
        node.parentElement.setAttribute("cus_numberinfo", newcenter.join("_"));

      }
      if (walk !== 0) {
        node.removeEventListener("mousedown", eventStart);
        node.removeEventListener("mouseup", eventEnd);
        node.removeEventListener("mousemove", eventPending);
        node.removeEventListener("mouseleave", eventStop);
        instance.scrollX(node, flatform);
      }
    }
  } else if (flatform === "mobile") {

    eventStart = function (e) {
      if (e.cancelable) { e.preventDefault(); }
      isDown = true;
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
      walkX = 0;
      walkY = 0;
      scrollLeft.left = translateParseXY(left.style.transform);
      scrollLeft.center = translateParseXY(center.style.transform);
      scrollLeft.right = translateParseXY(right.style.transform);
      node.style.cursor = "grabbing";
      center.style.transition = "";
    }

    eventPending = function (e) {
      if (!isDown) { return }
      if (e.cancelable) { e.preventDefault(); }
      walkX = e.changedTouches[e.changedTouches.length - 1].pageX - startX;
      walkY = e.changedTouches[e.changedTouches.length - 1].pageY - startY;

      if (Math.abs(walkX) < Math.abs(walkY)) {
        center.style.transition = "all 0s ease";
        center.style.transform = "translate(0" + ea + ", " + String(pastY + (walkY / 3)) + ea + ")";
      }
    }

    eventStop = function (e) {
      if (e.cancelable) { e.preventDefault(); }
      isDown = false;
      node.style.cursor = "pointer";
      center.style.transition = "";
    }

    eventEnd = function (e) {
      if (e.cancelable) { e.preventDefault(); }
      isDown = false;
      center.style.transition = "";
      node.style.cursor = "pointer";
      scrollLeft.left = translateParseXY(left.style.transform);
      scrollLeft.center = translateParseXY(center.style.transform);
      scrollLeft.right = translateParseXY(right.style.transform);

      let newDom, newDomChild, mobileHeight = 0, groupDoms = [];
      let { left: pastleft, right: pastright } = instance.whiteXyzConvert(node.parentElement.getAttribute("cus_numberinfo").split('_'), { group: true, multiple: true });

      if (Math.abs(walkX) > Math.abs(walkY)) {
        if (walkX < 0) {

          let { left: newleft, center: newcenter, right: newright } = instance.whiteXyzConvert(pastright[0], { group: true, multiple: true });
          node.removeChild(node.firstChild);
          node.children[0].style.position = "absolute";
          node.children[0].style.transform = "translate(-" + node.parentElement.style.width + ", " + scrollLeft.center[1] + ")";
          node.children[1].style.position = "";
          node.children[1].style.transform = "";

          newDom = GeneralJs.nodes.div.cloneNode(true);
          newDom.classList.add("whitePopupGroup");
          newDom.style.position = "absolute";
          newDom.style.transform = "translate(" + node.parentElement.style.width + ", 0" + ea + ")";
          for (let i = 0; i < newright.length; i++) {
            groupDoms.push(instance.whiteDomMaker(newright[i], flatform));
            mobileHeight += Number(groupDoms[i].getAttribute("cus_totalHeight"));
            if (i === 0) {
              groupDoms[i].style.paddingTop = String(8) + ea;
              mobileHeight += 8;
            }
            newDom.appendChild(groupDoms[i]);
          }
          newDom.setAttribute("cus_totalHeight", String(mobileHeight));
          node.appendChild(newDom);

          node.parentElement.setAttribute("cus_numberinfo", newcenter[0].join("_"));

        } else if (walkX > 0) {

          let { left: newleft, center: newcenter, right: newright } = instance.whiteXyzConvert(pastleft[0], { group: true, multiple: true });
          node.removeChild(node.lastChild);
          node.children[0].style.position = "";
          node.children[0].style.transform = "";
          node.children[1].style.position = "absolute";
          node.children[1].style.transform = "translate(" + node.parentElement.style.width + ", " + scrollLeft.center[1] + ")";

          newDom = GeneralJs.nodes.div.cloneNode(true);
          newDom.classList.add("whitePopupGroup");
          newDom.style.position = "absolute";
          newDom.style.transform = "translate(-" + node.parentElement.style.width + ", 0" + ea + ")";
          for (let i = 0; i < newleft.length; i++) {
            groupDoms.push(instance.whiteDomMaker(newleft[i], flatform));
            mobileHeight += Number(groupDoms[i].getAttribute("cus_totalHeight"));
            if (i === 0) {
              groupDoms[i].style.paddingTop = String(8) + "vw";
              mobileHeight += 8;
            }
            newDom.appendChild(groupDoms[i]);
          }
          newDom.setAttribute("cus_totalHeight", String(mobileHeight));
          node.insertBefore(newDom, node.firstChild);

          node.parentElement.setAttribute("cus_numberinfo", newcenter[0].join("_"));

        }

        if (walkX !== 0) {
          node.removeEventListener("touchstart", eventStart, false);
          node.removeEventListener("touchend", eventEnd, false);
          node.removeEventListener("touchcancel", eventStop, false);
          node.removeEventListener("touchmove", eventPending, false);
          instance.scrollX(node, flatform);
        }

      } else {

        let [ transfromX, translateY ] = translateParseXY(node.children[1].style.transform);
        let maximum = Math.abs(translatePixel(node.children[1].getAttribute("cus_totalHeight"))) - window.innerHeight + 115;

        if (Math.abs(translatePixel(translateY)) > maximum) {
          center.style.transform = "translate(0" + ea + ", -" + String(translateVw(maximum)) + ea + ")";
          walkY = 0;

          if (endStack > 0) {
            endTimout = setTimeout(function () {
              for (let i = 0; i < 2; i++) {
                document.getElementById("mototalcontents").removeChild(document.getElementById("mototalcontents").lastChild);
                document.getElementById("hiddentextmain0817").removeChild(document.getElementById("hiddentextmain0817").lastChild);
              }
              instance.mother.resizePopup = 0;
              endStack = 0;
              clearTimeout(endTimout);
            }, 500);
          } else {
            endStack = endStack + 1;
          }

        } else if (pastY + (walkY / 2) > 0) {
          center.style.transform = "translate(0" + ea + ", " + String(0) + ea + ")";
          walkY = 0;
        } else {
          if (Math.abs(translatePixel(pastY + (walkY / 2))) > maximum) {
            center.style.transform = "translate(0" + ea + ", " + String(-1 * ((maximum / window.innerWidth) * 100)) + ea + ")";
            walkY = 0;
          } else {
            center.style.transform = "translate(0" + ea + ", " + String(pastY + (walkY / 2)) + ea + ")";
          }
        }
        pastY = translateNumber(translateParseXY(node.children[1].style.transform)[1]);

      }
    }
  }

  if (flatform === "desktop") {
    node.addEventListener("mousedown", eventStart);
    node.addEventListener("mouseup", eventEnd);
    node.addEventListener("mousemove", eventPending);
    node.addEventListener("mouseleave", eventStop);
  } else if (flatform === "mobile") {
    node.addEventListener("touchstart", eventStart, false);
    node.addEventListener("touchend", eventEnd, false);
    node.addEventListener("touchcancel", eventStop, false);
    node.addEventListener("touchmove", eventPending, false);
  }

}

AboutJs.prototype.whiteXyzConvert = function (arr, options = { group: false, multiple: false }) {
  // x : instance.map.main.length
  // y : instance.map.main[x].words.length
  // z : instance.map.main[x].words[y].buttons.length

  const instance = this;
  let [ x, y, z ] = arr;
  x = Number(x), y = Number(y), z = Number(z);
  let tempArr, tempArr2, resultObj;
  let new_x = 0, new_y = 0, new_z = 0;

  if (options.group !== true) {

    resultObj = {};
    resultObj.center = arr;

    if (instance.map.main[x].words[y].buttons[z + 1] !== undefined) {
      x = x, y = y, z = z + 1;
    } else if (instance.map.main[x].words[y + 1] !== undefined) {
      x = x, y = y + 1, z = 0;
    } else if (instance.map.main[x + 2] !== undefined) {
      x = x + 1, y = 0, z = 0;
    } else {
      x = 0, y = 0, z = 0;
    }

    resultObj.right = [ String(x), String(y), String(z) ];

    [ x, y, z ] = arr;
    x = Number(x), y = Number(y), z = Number(z);

    if (instance.map.main[x].words[y].buttons[z - 1] !== undefined) {
      x = x, y = y, z = z - 1;
    } else if (instance.map.main[x].words[y - 1] !== undefined) {
      x = x, y = y - 1, z = instance.map.main[x].words[y].buttons.length - 1;
    } else if (instance.map.main[x - 1] !== undefined) {
      x = x - 1, y = instance.map.main[x].words.length - 1, z = instance.map.main[x].words[y].buttons.length - 1;
    } else {
      x = instance.map.main.length - 2, y = instance.map.main[x].words.length - 1, z = instance.map.main[x].words[y].buttons.length - 1;
    }

    resultObj.left = [ String(x), String(y), String(z) ];

    return resultObj;

  } else if (options.group === true) {
    if (options.multiple === false) {

      tempArr = [];
      for (let i = 0; i < instance.map.main[x].words[y].buttons.length; i++) {
        tempArr2 = [];
        tempArr2.push(x);
        tempArr2.push(y);
        tempArr2.push(i);
        tempArr.push(tempArr2);
      }
      return tempArr;

    } else if (options.multiple === true) {

      resultObj = {};

      //left
      if (instance.map.main[x].words[y - 1] !== undefined) {
        new_x = x;
        new_y = y - 1;
      } else if (instance.map.main[x - 1] !== undefined) {
        new_x = x - 1;
        new_y = instance.map.main[new_x].words.length - 1;
      } else {
        new_x = instance.map.main.length - 2;
        new_y = instance.map.main[new_x].words.length - 1;
      }
      tempArr = [];
      for (let i = 0; i < instance.map.main[new_x].words[new_y].buttons.length; i++) {
        tempArr2 = [];
        tempArr2.push(new_x);
        tempArr2.push(new_y);
        tempArr2.push(i);
        tempArr.push(tempArr2);
      }
      resultObj.left = tempArr;

      //center
      tempArr = [];
      for (let i = 0; i < instance.map.main[x].words[y].buttons.length; i++) {
        tempArr2 = [];
        tempArr2.push(x);
        tempArr2.push(y);
        tempArr2.push(i);
        tempArr.push(tempArr2);
      }
      resultObj.center = tempArr;

      //right
      if (instance.map.main[x].words[y + 1] !== undefined) {
        new_x = x;
        new_y = y + 1;
      } else if (instance.map.main[x + 2] !== undefined) {
        new_x = x + 1;
        new_y = 0;
      } else {
        new_x = 0;
        new_y = 0;
      }
      tempArr = [];
      for (let i = 0; i < instance.map.main[new_x].words[new_y].buttons.length; i++) {
        tempArr2 = [];
        tempArr2.push(new_x);
        tempArr2.push(new_y);
        tempArr2.push(i);
        tempArr.push(tempArr2);
      }
      resultObj.right = tempArr;

      return resultObj;
    }
  }
}

AboutJs.prototype.whitePopup = function (boo, arr = [ 0, 0, 0 ], forward = false) {
  const instance = this;
  let [ x, y, z ] = arr;
  x = Number(x), y = Number(y), z = Number(z);
  let mother, flatform;
  if (boo === "desktop") {
    mother = document.getElementById("totalcontents");
    flatform = "desktop";
  } else {
    mother = document.getElementById("mototalcontents");
    flatform = "mobile";
  }
  let cancelEvent = function (e) {
    let hiddenSpot = document.getElementById("hiddentextmain0817");
    for (let i = 0; i < 2; i++) {
      // mother.removeChild(mother.lastChild);
      hiddenSpot.removeChild(hiddenSpot.lastChild);
    }
    instance.mother.resizePopup = 0;
    window.history.go(-1);
  }
  return function (e) {
    instance.mother.resizePopup = 1;
    let hidden_clone;
    let hiddenSpot = document.getElementById("hiddentextmain0817");
    let div_clone, div_clone2, img_clone, svg_clone, tempFunction;

    let arrow_src, arrow_height, arrow_spec = {};
    let multipleTargets = [];

    let width, top, ea, ratio;
    let popupMargin = {};
    if (flatform === "desktop") {
      ea = "px";

      if (window.innerHeight > 930) {
        /<%media%>/ width = window.innerHeight * 1.45 %/%/% window.innerHeight * 1.1 %/%/i
        %/%/+ top = 135 %/%/% 120 %/%/i
        %/%/+ ratio = (80 / 145) %/%/% (80 / 110) %/%/g
      } else {
        /<%media%>/ width = window.innerHeight * 1.45 %/%/% window.innerHeight * 1.45 %/%/i
        %/%/+ top = 135 %/%/% 120 %/%/i
        %/%/+ ratio = (80 / 145) %/%/% (80 / 145) %/%/g
      }

      popupMargin.top = 88;
      popupMargin.left = 72;
    } else {
      width = 87;
      top = 90;
      ea = "vw";
    }

    //cancel back
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = "cancelBack";
    div_clone.addEventListener("click", cancelEvent);
    mother.appendChild(div_clone);

    hidden_clone = div_clone.cloneNode(true);
    hidden_clone.id = "cancelBack_clone";
    hidden_clone.style.display = "none";
    hidden_clone.setAttribute("cus_flatform", flatform);
    hiddenSpot.appendChild(hidden_clone);

    //popup
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = "whitePopup";
    div_clone.setAttribute("cus_numberInfo", String(x) + "_" + String(y) + "_" + String(z));
    div_clone.setAttribute("cus_flatform", flatform);

    //popup - basic style
    div_clone.style.width = String(width) + ea;
    div_clone.style.marginLeft = '-' + String(width / 2) + ea;
    if (flatform === "desktop") {
      div_clone.style.top = "calc(50% - " + ((width * ratio) / 2) + ea + " + 37.5" + ea + ")";
      div_clone.style.height = String(width * ratio) + ea;
    } else {
      div_clone.style.top = String(top) + "px";
      div_clone.style.height = "calc(100% - " + String(115) + "px" + ")";
    }

    //popup - arrow
    if (flatform === "desktop") {
      multipleTargets = [
        { value: 0, targets: [ "opacity" ] },
        { value: 1.5, targets: [ "right" ] },
        { value: 2, targets: [ "height", "marginTop" ] },
        { value: 2.5, targets: [ "width" ] },
      ];
      arrow_src = AboutJs.sourceLink + instance.map.sub.etc.arrow[2].src;
      arrow_height = 34;
      arrow_spec = {
        height: String(arrow_height) + ea,
        width: String(GeneralJs.parseRatio({ source: arrow_src, target: arrow_height, method: "height", result: "number" }) + 1) + ea,
        position: "absolute",
        top: "50%",
        marginTop: '-' + String((arrow_height / 2) + 1) + ea,
        opacity: "0.6",
        rightLeft: "-42" + ea,
        transform: "rotate(180deg)",
        cursor: "pointer",
      }
      tempFunction = function (e) {
        const flatform = this.parentElement.getAttribute("cus_flatform");
        let frame = this.parentElement.querySelector(".whitePopupFrame");
        let { left: pastleft, right: pastright } = instance.whiteXyzConvert(this.parentElement.getAttribute("cus_numberinfo").split('_'));
        let newDom;

        if (this.getAttribute("cus_leftright") === "right") {

          let { left, center, right } = instance.whiteXyzConvert(pastright);
          frame.removeChild(frame.firstChild);
          frame.children[0].style.position = "absolute";
          frame.children[0].style.transform = "translate(-" + this.parentElement.style.width + ", 0px)";
          frame.children[1].style.position = "";
          frame.children[1].style.transform = "";
          newDom = instance.whiteDomMaker(right, flatform);
          newDom.style.position = "absolute";
          newDom.style.transform = "translate(" + this.parentElement.style.width + ", 0px)";
          frame.appendChild(newDom);
          this.parentElement.setAttribute("cus_numberinfo", center.join("_"));
          window.history.replaceState({ level: 1, flatform: "desktop", xyz: center }, '');

        } else {

          let { left, center, right } = instance.whiteXyzConvert(pastleft);
          frame.removeChild(frame.lastChild);
          frame.children[0].style.position = "";
          frame.children[0].style.transform = "";
          frame.children[1].style.position = "absolute";
          frame.children[1].style.transform = "translate(" + this.parentElement.style.width + ", 0px)";
          newDom = instance.whiteDomMaker(left, flatform);
          newDom.style.position = "absolute";
          newDom.style.transform = "translate(-" + this.parentElement.style.width + ", 0px)";
          frame.insertBefore(newDom, frame.firstChild);
          this.parentElement.setAttribute("cus_numberinfo", center.join("_"));
          window.history.replaceState({ level: 1, flatform: "desktop", xyz: center }, '');

        }
      }

      //arrow right
      img_clone = SvgTong.tongMaker();
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);

      img_clone.src = arrow_src;
      for (let i in arrow_spec) {
        if (i !== "rightLeft" && i !== "transform") {
          img_clone.style[i] = arrow_spec[i];
          div_clone2.style[i] = arrow_spec[i];
        }
      }
      img_clone.style.right = arrow_spec.rightLeft;
      div_clone2.style.right = arrow_spec.rightLeft;
      for (let z = 0; z < multipleTargets.length; z++) {
        for (let y = 0; y < multipleTargets[z].targets.length; y++) {
          div_clone2.style[multipleTargets[z].targets[y]] = String(Number(div_clone2.style[multipleTargets[z].targets[y]].replace(/[^0-9\.-]/g, '')) * multipleTargets[z].value) + div_clone2.style[multipleTargets[z].targets[y]].replace(/[0-9\.-]/g, '')
        }
      }

      div_clone2.setAttribute("cus_leftright", "right");
      div_clone2.addEventListener("click", tempFunction);

      div_clone.appendChild(SvgTong.parsing(img_clone));
      div_clone.appendChild(div_clone2);

      //arrow left
      img_clone = SvgTong.tongMaker();
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);

      img_clone.src = arrow_src;
      for (let i in arrow_spec) {
        if (i !== "rightLeft" && i !== "transform") {
          img_clone.style[i] = arrow_spec[i];
          div_clone2.style[i] = arrow_spec[i];
        }
      }
      img_clone.style.left = arrow_spec.rightLeft;
      img_clone.style.transform = arrow_spec.transform;
      div_clone2.style.left = arrow_spec.rightLeft;
      for (let z = 0; z < multipleTargets.length; z++) {
        for (let y = 0; y < multipleTargets[z].targets.length; y++) {
          div_clone2.style[multipleTargets[z].targets[y]] = String(Number(div_clone2.style[multipleTargets[z].targets[y]].replace(/[^0-9\.-]/g, '')) * multipleTargets[z].value) + div_clone2.style[multipleTargets[z].targets[y]].replace(/[0-9\.-]/g, '')
        }
      }

      div_clone2.setAttribute("cus_leftright", "left");
      div_clone2.addEventListener("click", tempFunction);

      div_clone.appendChild(SvgTong.parsing(img_clone));
      div_clone.appendChild(div_clone2);
    }

    //contents
    instance.whiteLoadContents(div_clone);

    //div end
    mother.appendChild(div_clone);
    hidden_clone = div_clone.cloneNode(true);
    hidden_clone.id = "whitePopup_clone";
    hidden_clone.style.display = "none";
    hidden_clone.setAttribute("cus_flatform", flatform);
    hiddenSpot.appendChild(hidden_clone);

    if (forward) {
      window.history.replaceState({ level: 1, flatform: flatform , xyz: [ x, y, z ] }, '');
    } else {
      window.history.pushState({ level: 1, flatform: flatform , xyz: [ x, y, z ] }, '');
    }

  }
}

AboutJs.prototype.reloadState = function (reloadPopup = true) {
  const instance = this;
  return function () {
    let h = document.createDocumentFragment();
    let m = document.createDocumentFragment();
    let div_clone;
    let target0 = document.getElementById("hidden_desktopDom_review").children;
    let target1 = document.getElementById("hidden_mobileDom_review").children;
    let mother = {
      desktop: document.getElementById("totalcontents"),
      mobile: document.getElementById("mototalcontents")
    }
    let hiddenSpot = document.getElementById("hiddentextmain0817");
    let hiddenPopup, flatform, popupFunction, xyz, xyzArr;

    for (let i = 0; i < target0.length; i++) {
      h.appendChild(target0[i].cloneNode(true));
    }
    for (let i = 0; i < target1.length; i++) {
      m.appendChild(target1[i].cloneNode(true));
    }
    instance.initialDom();
    instance.basicLoader({
      desktop: h,
      mobile: m,
    });
    div_clone = document.getElementById("footergreenback0817_clone").cloneNode(true);
    div_clone.id = "footergreenback0817";
    div_clone.style.display = "";
    mother.desktop.appendChild(div_clone);
    div_clone = document.getElementById("mofooterbelow_clone").cloneNode(true);
    div_clone.id = "";
    div_clone.style.display = "";
    mother.mobile.appendChild(div_clone);

    if (!reloadPopup) {
      instance.mother.resizePopup = 0;
      if (document.getElementById("whitePopup_clone") !== null) {
        hiddenSpot.removeChild(hiddenSpot.lastChild);
        hiddenSpot.removeChild(hiddenSpot.lastChild);
      }
    } else if (Boolean(instance.mother.resizePopup) && document.getElementById("whitePopup_clone") !== null) {
      hiddenPopup = document.getElementById("whitePopup_clone");
      flatform = hiddenPopup.getAttribute("cus_flatform");
      xyz = hiddenPopup.getAttribute("cus_numberinfo");
      xyzArr = xyz.split('_');
      hiddenSpot.removeChild(hiddenSpot.lastChild);
      hiddenSpot.removeChild(hiddenSpot.lastChild);
      popupFunction = instance.whitePopup(flatform, xyzArr, true);
      popupFunction();
    }

  }
}

AboutJs.prototype.launching = async function () {
  const instance = this;
  try {

    //get review
    const { desktopDom_review, mobileDom_review } = await GeneralJs.getContents({
      collection: "revlist",
      sort: [ "order_function", "DESC" ],
      limit: [ 10 ],
      garo: true,
    });
    const rows = {
      desktop: desktopDom_review,
      mobile: mobileDom_review,
    };

    const flatform = window.innerWidth > 900 ? "desktop" : "mobile";

    window.history.replaceState({ level: 0, flatform: flatform, xyz: [] }, '');

    mobileDom_review.removeChild(mobileDom_review.lastChild);

    this.toHidden(rows);
    this.initialDom();
    this.basicLoader(rows);

    this.mother.resizeLaunching(this.reloadState(true));
    this.mother.stateLaunching(function (state) {
      if (state === null) {
        window.location.href = "https://home-liaison.com";
      } else {
        const { level, flatform, xyz } = state;
        let reloadFunction, popupFunction, hiddenSpot, mother;
        if (level === 0) {

          GeneralJs.totalDelete();
          reloadFunction = instance.reloadState(false);
          reloadFunction();
          instance.mother.specialBan();
          instance.mother.homeliaisonTalk();

        } else if (level === 1) {

          if (document.getElementById("whitePopup") !== null) {
            if (flatform === "desktop") {
              mother = document.getElementById("totalcontents");
            } else {
              mother = document.getElementById("mototalcontents");
            }
            hiddenSpot = document.getElementById("hiddentextmain0817");
            for (let i = 0; i < 2; i++) {
              mother.removeChild(mother.lastChild);
              hiddenSpot.removeChild(hiddenSpot.lastChild);
            }
            instance.mother.resizePopup = 0;
          }
          popupFunction = instance.whitePopup(flatform, xyz, true);
          popupFunction();

        }
      }
    });

    //popup open
    const getObj = GeneralJs.returnGet();
    if (getObj.popup !== undefined) {
      if (getObj.popup === "true") {
        let getTimeout = setTimeout(function () {
          let popupFunction = instance.whitePopup(flatform, [ 0, 0, 0 ], true);
          popupFunction();
          clearTimeout(getTimeout);
        }, 1000);
      }
    }
  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
}
