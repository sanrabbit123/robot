/<%contents%>/

const IndexJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
  this.animationDoms = {};
  this.asyncTarget = {
    desktop: [],
    mobile: []
  };
}

IndexJs.sourceLink = "/list_image/index";

IndexJs.asyncExecOn = 0;

IndexJs.prototype.infoBoxMaker = function (obj = {}) {
  let example = "obj.source = { word: , button: , image: }; obj.direction = 'left' or 'right'; obj.mother = mother; obj.flatform = 'desktop' or 'mobile'; obj.href = link";
  if (obj.flatform === undefined) { obj.flatform = "desktop"; }
  if (obj.mother === undefined) { throw new Error("invaild source example : " + example); }
  if (obj.source === undefined) { throw new Error("invaild source example : " + example); }
  if (obj.source.word === undefined) { throw new Error("invaild source example : " + example); }
  if (obj.source.image === undefined) { throw new Error("invaild source example : " + example); }
  if (obj.flatform === "desktop") {
    if (obj.direction === undefined) { throw new Error("invaild source example : " + example); }
    if (obj.source.button === undefined) { throw new Error("invaild source example : " + example); }
    if (obj.href === undefined) { throw new Error("invaild source example : " + example); }
  }

  let height, width, top, paddingTop, marginLeft, left;
  let style = {};
  let div_clone, div_clone2, svg_clone, img_clone;
  let temp, ea;
  if (obj.flatform === "desktop") { ea = "px"; }
  else { ea = "vw"; }
  let pictureWidth, pictureMargin;

  if (obj.flatform === "desktop") {
    /<%media%>/ height = 730 %/%/% 630 %/%/i
    %/%/+ width = 1200 %/%/% 1050 %/%/i
    %/%/+ paddingTop = 142 %/%/% 121 %/%/g
    marginLeft = -1 * (width / 2);
  } else {
    width = 87.9;
    top = 13;
  }

  style = {
    display: "block",
    position: "relative",
    width: String(width) + ea,
  };

  if (obj.flatform === "desktop") {
    style.height = String(height) + ea;
    style.left = "50%";
    style.marginLeft = String(marginLeft) + ea;
  } else {
    style.top = String(top) + ea;
    style.marginLeft = "auto";
    style.marginRight = "auto";
  }

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  if (obj.visualSpecific !== undefined) {
    style.height = String(height + Number(obj.visualSpecific)) + ea;
  }
  for (let i in style) { div_clone.style[i] = style[i]; }

  //detail -----------------------------------------------------------------------------------------------------

  //wording
  if (obj.flatform === "desktop") {
    /<%media%>/ pictureWidth = 780 %/%/% 668.56 %/%/i
    %/%/+ pictureMargin = 78 %/%/% 65 %/%/i
    %/%/+ height = 167 %/%/% 158 %/%/i
    %/%/+ top = 240 %/%/% 198 %/%/g
  } else {
    left = 5;
    height = 26.3;
  }

  width = GeneralJs.parseRatio({ source: obj.source.word, target: height, method: "height", result: "number" });
  style = {
    height: String(height) + ea,
    width: String(width) + ea
  };

  if (obj.flatform === "desktop") {
    style.position = "absolute";
    style.top = String(top) + ea;
    style[obj.direction] = String(pictureWidth + pictureMargin) + ea;
  } else {
    style.position = "relative";
    style.left = String(left) + ea;
    style.marginTop = String(3) + ea;
  }

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = obj.source.word;
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  //picture
  if (obj.flatform === "desktop") {
    /<%media%>/ height = 440 %/%/% 377.14 %/%/i
    %/%/+ top = 142 %/%/% 120 %/%/i
    %/%/+ temp = '0px 12px 28px -18px #606060' %/%/% '0px 12px 30px -18px #606060' %/%/g
  } else {
    top = 0;
    height = 62;
    width = GeneralJs.parseRatio({ source: (Array.isArray(obj.source.image) ? obj.source.image[0] : obj.source.image), target: height, method: "height", result: "number" });
  }
  style = {
    height: String(height) + ea,
    top: String(top) + ea,
  };

  if (obj.flatform === "desktop") {
    style.position = "absolute";
    style.width = String(pictureWidth) + ea;
    style.backgroundSize = "100% auto";
    style.borderRadius = "10px";
    style.backgroundRepeat = "no-repeat";
    style.backgroundPosition = "50% 50%";
    style.boxShadow = temp;
    style[obj.direction] = '0';
  } else {
    style.position = "relative";
    style.width = String(width) + ea;
    style.left = String(-0.1) + ea;
  }

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  if (Array.isArray(obj.source.image)) {
    for (let j = 0; j < obj.source.image.length; j++) {
      if (/\.svg$/.test(obj.source.image[j])) {
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = obj.source.image[j];
        svg_clone.classList.add("absolutedefault");
        div_clone2.appendChild(SvgTong.parsing(svg_clone));
      } else {
        img_clone = GeneralJs.nodes.img.cloneNode(true);
        img_clone.src = IndexJs.sourceLink + "/" + obj.source.image[j];
        img_clone.classList.add("absolutedefault");
        div_clone2.appendChild(img_clone);
      }
    }
  } else {
    div_clone2.style.backgroundImage = "url('" + IndexJs.sourceLink + "/" + obj.source.image + "')";
  }
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  div_clone.insertBefore(div_clone2, div_clone.firstChild);

  //button
  if (obj.flatform === "desktop") {

    /<%media%>/ height = 32 %/%/% 30 %/%/i
    %/%/+ top = 439 %/%/% 382 %/%/i
    %/%/+ width = 118 %/%/% 108 %/%/g

    style = {
      position: "absolute",
      height: String(height) + ea,
      top: String(top) + ea,
      width: String(width) + ea,
      borderRadius: String(45) + ea,
      background: "linear-gradient(222deg,rgba(89,175,137,.85) 5%,rgba(0,156,106,.85) 100%)",
      cursor: "pointer"
    };

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    for (let i in style) {
      div_clone2.style[i] = style[i];
    };
    div_clone2.style[obj.direction] = String(pictureWidth + pictureMargin) + ea;
    GeneralJs.addHrefEvent(div_clone2, obj.href);

    //button wording
    /<%media%>/ height = 12 %/%/% 11.5 %/%/i
    %/%/+ top = 9 %/%/% 8 %/%/g

    style = {
      position: "absolute",
      height: String(height) + ea,
      top: String(top) + ea,
      width: GeneralJs.parseRatio({ source: obj.source.button, target: height, method: "height", result: "string" }) + ea,
    };

    svg_clone = SvgTong.tongMaker();
    svg_clone.src = obj.source.button;
    svg_clone.classList.add("hoverdefault");
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.style.left = String((width - Number(style.width.slice(0, (-1 * ea.length)))) / 2) + ea;
    div_clone2.appendChild(SvgTong.parsing(svg_clone));
    div_clone.appendChild(div_clone2);

  }

  obj.mother.appendChild(div_clone);
}

IndexJs.prototype.initialDom = function () {
  const instance = this;
  const grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  };
  let list = {
    desktop: [
      {
        id: "slide",
        source: [ instance.map.main.slide.src.images.desktop, instance.map.main.slide.src.words.desktop ],
        callback: function (id, source) {
          const [ images, words ] = source;
          let div_clone, div_clone2, svg_clone, svg_style = {};
          let top, height, width, marginLeft;
          let ea = 'px';
          const basicStyle = {
            display: "block",
            position: "relative",
            marginTop: "71px",
            width: "100%",
            overflow: "hidden",
          }
          const imageStyle = {
            position: "absolute",
            top: "0",
            left: "50%",
            height: "100%",
            transition: "all 0.5s ease",
            backgroundPosition: "50% 50%",
            backgroundSize: "100% auto",
          }
          const slideColor = [
            "#ececec",
            "#cecece",
            "#ececec",
            "#cecece",
            "#f7f7f7",
          ];
          let doms = {
            slide: [],
            image: [],
          }

          //color bar
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          for (let i in basicStyle) {
            div_clone.style[i] = basicStyle[i];
          }
          /<%media%>/ height = 746 %/%/% 746 * (6 / 7) %/%/i
          div_clone.style.height = String(height) + ea;

          for (let i = 0; i < 5; i++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("absolutedefault");
            div_clone2.style.background = slideColor[i];
            if (i !== 0) {
              div_clone2.style.transform = "scaleX(0)";
              div_clone2.style.transformOrigin = "100% 0 0";
            }
            div_clone.appendChild(div_clone2);
            doms.slide.push(div_clone2);
          }

          //slide image
          /<%media%>/ width = 1400 %/%/% 1200 %/%/i
          for (let i = 0; i < 5; i++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.style.marginLeft = '-' + String(width / 2) + ea;
            div_clone2.style.width = String(width) + ea;
            for (let i in imageStyle) {
              div_clone2.style[i] = imageStyle[i];
            }
            div_clone2.style.backgroundImage = "url('" + IndexJs.sourceLink + '/' + images[i] + "')";
            if (i !== 0) {
              div_clone2.style.opacity = "0";
            }
            div_clone.appendChild(div_clone2);
            doms.image.push(div_clone2);
          }

          //wording
          /<%media%>/ height = 126 %/%/% 126 * (6 / 7) %/%/i
          %/%/+ marginLeft = 601 %/%/% 601 - 75 %/%/i
          %/%/+ top = 512 %/%/% 512 * (6 / 7) %/%/g
          width = GeneralJs.parseRatio({ source: words.main, target: height, method: "height", result: "number" });
          svg_style = {
            position: "absolute",
            left: "50%",
            height: String(height) + ea,
            top: String(top) + ea,
            width: String(width) + ea,
            marginLeft: '-' + String(marginLeft) + ea,
          }
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = words.main;
          for (let i in svg_style) {
            svg_clone.style[i] = svg_style[i];
          }
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          //animation
          instance.animationDoms.desktopSlide = {}
          instance.animationDoms.desktopSlide.animation = {
            slide: [
              '',
              'slidecolor1 16s ease infinite',
              'slidecolor2 16s ease infinite',
              'slidecolor3 16s ease infinite',
              'slidecolor4 16s ease infinite',
            ],
            image: [
              '',
              'slideimage1 16s ease infinite',
              'slideimage2 16s ease infinite',
              'slideimage3 16s ease infinite',
              'slideimage4 16s ease infinite',
            ],
          }
          instance.animationDoms.desktopSlide.target = doms;

          return div_clone;
        },
      },
      {
        id: "grayBar",
        source: [ instance.map.main.slide.src.words.desktop ],
        callback: function (id, source) {
          const [ target ] = source;
          const { sub } = target;
          let div_clone, div_clone2, div_clone3, svg_clone, div_style = {}, svg_style = {};
          let top, height, width, marginLeft;
          let ea = 'px';
          let doms = { circles: [] };
          let animation = { circles: [] };

          //base
          /<%media%>/ height = 177 %/%/% 177 * (6 / 7) %/%/i

          div_style = {
            display: "block",
            position: "relative",
            backgroundColor: "#f7f7f7",
            height: String(height) + ea,
          };

          div_clone = GeneralJs.nodes.div.cloneNode(true);
          for (let i in div_style) {
            div_clone.style[i] = div_style[i];
          }

          //circles
          /<%media%>/ marginLeft = (1200 / 2) %/%/% (1050 / 2) %/%/i
          %/%/+ top = 56 %/%/% 44 %/%/g

          div_style = {
            position: "absolute",
            left: "50%",
            width: String(460) + ea,
            marginLeft: '-' + String(marginLeft) + ea,
            height: String(30) + ea,
            top: String(top) + ea,
          };
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("hoverdefault");
          for (let i in div_style) {
            div_clone2.style[i] = div_style[i];
          }
          for (let i = 0; i < 5; i++) {
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("circles");
            div_clone3.style.left = String(0.6 + (4 * i)) + "%";
            div_clone3.style.opacity = (i === 0) ? '1' : '0.4';
            div_clone2.appendChild(div_clone3);
            doms.circles.push(div_clone3);
            animation.circles.push('circlesani 16s ease ' + String((3.2 * i) - 0.5) + 's infinite');
          }
          GeneralJs.addHrefEvent(div_clone2, "/about.php");
          div_clone.appendChild(div_clone2);
          instance.animationDoms.circles = { animation: animation, target: doms };

          //word
          /<%media%>/ height = 46 %/%/% 44 %/%/i
          width = GeneralJs.parseRatio({ source: sub, target: height, method: "height", result: "number" });
          /<%media%>/ top = 53.5 %/%/% 43 %/%/i
          %/%/+ marginLeft = (1200 / 2) - width %/%/% (1050 / 2) - width %/%/g

          svg_style = {
            position: "absolute",
            left: "50%",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(top) + ea,
            marginLeft: String(marginLeft) + ea,
          }

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = sub;
          for (let i in svg_style) {
            svg_clone.style[i] = svg_style[i];
          }
          svg_clone.classList.add("hoverdefault");
          GeneralJs.addHrefEvent(svg_clone, "/about.php");
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          return div_clone;
        },
      },
      {
        id: "indexAbout",
        source: [ instance.map.main.about.src.desktop ],
        callback: function (id, source) {
          const [ target ] = source;
          const { left: about0, right: about1 } = target;
          let div_clone, div_clone2, svg_clone, style = {};
          let top, height, width, marginLeft, paddingTop, left;
          let ea = 'px';
          let h = GeneralJs.nodes.div.cloneNode(true);
          let visualSpecific;
          h.style.display = "block";
          h.style.position = "relative";

          //about background
          /<%media%>/ visualSpecific = 11 %/%/% 4 %/%/i
          %/%/+ height = 730 %/%/% 622.3 %/%/g
          height = height + visualSpecific;
          style = {
            position: "absolute",
            backgroundColor: "#f7f7f7",
            bottom: "0",
            width: "100%",
            height: String(height) + ea,
          };
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          for (let i in style) {
            div_clone.style[i] = style[i];
          };
          h.appendChild(div_clone);

          //about box
          let list = [ "right", "left" ];
          let href = [ "/about.php", "/consulting.php" ];
          let sourceArr = {
            words: [ about0.words, about1.words ],
            buttons: [ about0.button, about1.button ],
            images: [ about0.image, about1.image ]
          };
          let options;
          for (let z = 0; z < list.length; z++) {
            options = { mother: h, source: { word: sourceArr.words[z], button: sourceArr.buttons[z], image: sourceArr.images[z] }, direction: list[z], href: href[z] };
            if (z !== 0) { options.visualSpecific = visualSpecific; }
            instance.infoBoxMaker(options);
          }

          return h;
        },
      },
      {
        id: "banner",
        source: [ instance.map.main.banner.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.desktop.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
      {
        id: "portfolio",
        source: [ instance.map.main.portfolio.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.desktop.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
      {
        id: "belowAbout",
        source: [ instance.map.main.below.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.desktop.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
      {
        id: "below",
        source: [ instance.map.sub.belowButton.src, instance.map.sub.copyRight.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.desktop.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
    ],
    mobile: [
      {
        id: "mobileSlide",
        source: [ instance.map.main.slide.src.images.mobile, instance.map.main.slide.src.words.mobile ],
        callback: function (id, source) {
          const [ images, words ] = source;
          let div_clone, div_clone2, svg_clone, style = {}, doms = {};
          doms.slide = [];
          let ea = "vw";

          //base
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: "100%",
            height: "255px",
            overflow: "hidden",
            backgroundColor: "#f7f7f7"
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          //slide
          for (let i = 0; i < images.length; i++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("moslide");
            div_clone2.style.backgroundImage = "url('" + IndexJs.sourceLink + '/' + images[images.length - 1 - i] + "')";
            doms.slide.push(div_clone2);
            div_clone.appendChild(div_clone2);
          }

          //animation
          instance.animationDoms.mobileSlide = {}
          instance.animationDoms.mobileSlide.animation = {
            slide: [
              'momslibae5 20s ease infinite',
              'momslibae4 20s ease infinite',
              'momslibae3 20s ease infinite',
              'momslibae2 20s ease infinite',
              'momslibae1 20s ease infinite',
            ],
          }
          instance.animationDoms.mobileSlide.target = doms;

          //wording
          style = {
            position: "absolute",
            width: "191.5px",
            height: "57.25px",
            top: "163px",
            left: String((100 - 87.8) / 2) + ea,
          }
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = words.main;
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          return div_clone;
        },
      },
      {
        id: "mobilegrayBar",
        source: [ instance.map.main.slide.src.words.mobile ],
        callback: function (id, source) {
          const [ words ] = source;
          const { main, sub, circles } = words;
          let div_clone, div_clone2, svg_clone, style = {};
          let height, width, left;
          let ea = "vw";

          //base
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: "100%",
            height: "20" + ea,
            overflow: "hidden",
            backgroundColor: "#f7f7f7"
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }

          //circles
          height = 1.6;
          width = GeneralJs.parseRatio({ source: sub, target: height, method: "height", result: "number" });
          svg_clone = SvgTong.tongMaker();
          style = {
            position: "absolute",
            width: String(width) + ea,
            top: String(10.6) + ea,
            left: String((100 - 87.8) / 2) + ea,
            height: String(height) + ea
          }
          svg_clone.src = circles;
          svg_clone.classList.add("hoverdefault");
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          //wording
          height = 7.7;
          width = GeneralJs.parseRatio({ source: sub, target: height, method: "height", result: "number" });
          svg_clone = SvgTong.tongMaker();
          style = {
            position: "absolute",
            width: String(width) + ea,
            top: String(5.4) + ea,
            left: String(100 - ((100 - 87.8) / 2) - width) + ea,
            height: String(height) + ea
          }
          svg_clone.src = sub;
          svg_clone.classList.add("hoverdefault");
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          div_clone.appendChild(SvgTong.parsing(svg_clone));

          return div_clone;
        },
      },
      {
        id: "moindexAbout",
        source: [ instance.map.main.about.src.mobile ],
        callback: function (id, source) {
          const [ mobile ] = source;
          const { left: about0, right: about1 } = mobile;
          let div_clone, div_clone2, svg_clone, style = {}, options = {};
          let height, width, left;
          let ea = "vw";

          let h = document.createDocumentFragment();

          //about0
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: "100%",
            height: String(122) + ea,
            overflow: "hidden"
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          options = { mother: div_clone, source: { word: about0.words, image: about0.images }, flatform: "mobile" };
          instance.infoBoxMaker(options);
          h.appendChild(div_clone);

          //about1
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          style = {
            display: "block",
            position: "relative",
            width: "100%",
            height: String(122) + ea,
            overflow: "hidden",
            backgroundColor: "#f7f7f7"
          }
          for (let i in style) {
            div_clone.style[i] = style[i];
          }
          options = { mother: div_clone, source: { word: about1.words, image: about1.images }, flatform: "mobile" };
          instance.infoBoxMaker(options);
          h.appendChild(div_clone);

          return h;
        },
      },
      {
        id: "mobanner",
        source: [ instance.map.main.banner.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.mobile.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
      {
        id: "moportfolio",
        source: [ instance.map.main.portfolio.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.mobile.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
      },
      {
        id: "mobelowAbout",
        source: [ instance.map.main.below.src ],
        callback: function (id, source) {
          let div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.id = id;
          instance.asyncTarget.mobile.push({ id: id, dom: div_clone, source: source });
          return div_clone;
        }
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

IndexJs.prototype.asyncExec = function () {
  IndexJs.asyncExecOn = 1;
  const instance = this;
  let list = {
    desktop: {
      banner: function (id, source, mother) {
        const [ sourceObj ] = source;
        const { desktop, button, subbutton, shadow } = sourceObj;

        let height, width, top, marginLeft, left, right, buttonWidth;
        let style = {};
        let div_clone, svg_clone, img_clone;
        let temp, ratio, ea = "px";
        let visualSpecific;

        //base
        /<%media%>/ height = 177 %/%/% 151.714285714 %/%/i
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          background: "linear-gradient(90deg,rgba(89,175,137,.9) 10%,rgba(0,156,106,.95) 100%)",
          overflow: "hidden",
        }
        for (let i in style) {
          mother.style[i] = style[i];
        }

        //shadow graphic
        /<%media%>/ height = 254 %/%/% 220 %/%/i
        %/%/+ top = 41 %/%/% 36 %/%/i
        %/%/+ right = 200 %/%/% 187.14285714285714 %/%/g

        width = GeneralJs.parseRatio({ source: shadow[0], target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          top: '-' + String(top) + ea,
          height: String(height) + ea,
          right: '-' + String(right) + ea,
          width: String(width) + ea
        }

        for (let i = 0; i < shadow.length; i++) {
          if (/\.svg$/.test(shadow[i])) {
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = shadow[i];
            for (let j in style) {
              svg_clone.style[j] = style[j];
            }
            mother.appendChild(SvgTong.parsing(svg_clone));
          } else {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = IndexJs.sourceLink + '/' + shadow[i];
            for (let j in style) {
              img_clone.style[j] = style[j];
            }
            mother.appendChild(img_clone);
          }
        }

        //main wording
        /<%media%>/ top = 45 %/%/% 38.57142 %/%/i
        %/%/+ height = 74 %/%/% 63 %/%/i
        %/%/+ marginLeft = -1 * (1400 / 2) %/%/% -1 * (1050 / 2) %/%/g
        width = GeneralJs.parseRatio({ source: desktop, target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          left: "50%",
          top: String(top) + ea,
          height: String(height) + ea,
          marginLeft: String(marginLeft) + ea,
          width: String(width) + ea
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = desktop;
        svg_clone.classList.add("hoverdefault");
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        GeneralJs.addHrefEvent(svg_clone, instance.map.main.banner.links[0]);
        mother.appendChild(SvgTong.parsing(svg_clone));

        //subButton
        /<%media%>/ top = 46 %/%/% 41 %/%/i
        %/%/+ height = 15 %/%/% 13 %/%/g
        width = GeneralJs.parseRatio({ source: subbutton, target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          left: "50%",
          top: String(top) + ea,
          height: String(height) + ea,
          marginLeft: String((marginLeft + width) * -1) + ea,
          width: String(width) + ea
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = subbutton;
        svg_clone.classList.add("hoverdefault");
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        GeneralJs.addHrefEvent(svg_clone, instance.map.main.banner.links[1]);
        mother.appendChild(SvgTong.parsing(svg_clone));

        //button
        /<%media%>/ height = 30 %/%/% 26 %/%/i
        %/%/+ width = 119 %/%/% 107 %/%/i
        %/%/+ visualSpecific = 6 %/%/% 3 %/%/g
        style = {
          position: "absolute",
          left: "50%",
          bottom: String(top + visualSpecific) + ea,
          height: String(height) + ea,
          marginLeft: String((marginLeft + width) * -1) + ea,
          width: String(width) + ea,
          backgroundColor: "white",
          borderRadius: String(30) + ea,
        }
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = button;
        svg_clone.classList.add("hoverdefault");

        /<%media%>/ visualSpecific = -1 %/%/% 0 %/%/i
        %/%/+ ratio = 12 / 30 %/%/% 13 / 30 %/%/g

        buttonWidth = GeneralJs.parseRatio({ source: button, target: height * ratio, method: "height", result: "number" });
        style = {
          position: "absolute",
          height: String(height * ratio) + ea,
          top: String(((height * (1 - ratio)) / 2) + visualSpecific) + ea,
          width: String(buttonWidth) + ea,
          left: String((width - buttonWidth) / 2) + ea,
        }
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }

        div_clone.appendChild(SvgTong.parsing(svg_clone));
        GeneralJs.addHrefEvent(div_clone, instance.map.main.banner.links[2]);
        mother.appendChild(div_clone);
      },
      portfolio: async function (id, source, mother) {
        const [ sourceObj ] = source;
        const { portfolio, review, tags, icons: { search, circles } } = sourceObj;

        let portfolio_limit, review_limit;
        /<%media%>/ portfolio_limit = 9 %/%/% 7 %/%/i
        %/%/+ review_limit = 9 %/%/% 7 %/%/g

        const { desktopDom_portfolio: portfolioRow } = await GeneralJs.getContents({
          collection: "porlist",
          sort: [ "key9", "DESC" ],
          limit: [ portfolio_limit ],
          garo: true,
        });
        const { desktopDom_review: reviewRow } = await GeneralJs.getContents({
          collection: "revlist",
          sort: [ "order_function", "DESC" ],
          limit: [ review_limit ],
          garo: true,
        });

        let style = {};
        let div_clone, div_clone2, svg_clone, input_clone;
        let height, width, boxWidth, top, left, paddingTop, marginLeft, marginTop, paddingBottom, paddingBottomAdd;
        let ea = "px";
        let searchEvent;
        let rightMargin;

        //search box start ---------------------------------------------------------
        /<%media%>/ width = 1400 %/%/% 1050 %/%/i
        %/%/+ paddingTop = 130 %/%/% 120 %/%/i
        %/%/+ height = 42 %/%/% 40 %/%/g
        marginLeft = -1 * (width / 2);
        style = {
          display: "block",
          position: "relative",
          width: String(width) + ea,
          left: "50%",
          marginLeft: String(marginLeft) + ea,
          paddingTop: String(paddingTop) + ea,
          height: String(height) + ea,
        }
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }

        //search box - gray box
        /<%media%>/ boxWidth = 643 %/%/% 600 %/%/i
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(boxWidth) + ea,
          bottom: String(0) + ea,
          left: String(0) + ea,
          backgroundColor: "#f5f5f5",
          borderRadius: String(4) + ea,
        }
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone.appendChild(div_clone2);

        //search box - input box
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(boxWidth) + ea,
          bottom: String(0) + ea,
          left: String(0) + ea,
          backgroundColor: "transparent",
          color: "#303030",
          border: String(0),
          textIndent: String(12) + ea,
          fontSize: String(13) + "pt",
          paddingBottom: String(4) + ea,
          fontFamily: '"Noto Sans KR",sans-serif',
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.setAttribute("type", "text");
        for (let j in style) {
          input_clone.style[j] = style[j];
        }
        searchEvent = function (e) {
          let value = input_clone.value.replace(/[&=<>\{\}\[\]\(\)\'\"]/g, '');
          window.location.href = "/portfolio.php?search=" + value;
        }
        input_clone.addEventListener("keyup", function (e) {
          if (e.keyCode === 13) {
            searchEvent(e);
          }
        });
        div_clone.appendChild(input_clone);

        //search box - icon
        style = {
          position: "absolute",
          height: String(height - 10) + ea,
          width: GeneralJs.parseRatio({ source: search, target: height, method: "height", result: "string" }) + ea,
          bottom: String(10 / 2) + ea,
          left: String(boxWidth + 10) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = search;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.addEventListener("click", searchEvent);
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //search box - tag
        style = {
          position: "absolute",
          height: String(height + 2) + ea,
          width: GeneralJs.parseRatio({ source: tags, target: height, method: "height", result: "string" }) + ea,
          bottom: String(-1) + ea,
          right: String(0) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = tags;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        mother.appendChild(div_clone);
        //search box end -------------------------------------------------------------

        //portfolio start ------------------------------------------------------------
        /<%media%>/ rightMargin = 20 %/%/% 20 %/%/i
        %/%/+ width = 1400 + rightMargin %/%/% 1050 + rightMargin %/%/i
        %/%/+ paddingTop = 44 %/%/% 42 %/%/g

        marginLeft = -1 * ((width - rightMargin) / 2);
        style = {
          display: "block",
          position: "relative",
          width: String(width) + ea,
          left: "50%",
          marginLeft: String(marginLeft) + ea,
          paddingTop: String(paddingTop) + ea,
        }
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }

        //portfolio title
        /<%media%>/ height = 21.7 %/%/% 19 %/%/i
        width = GeneralJs.parseRatio({ source: portfolio, target: height, method: "height", result: "number" });
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          left: String(1) + ea,
          paddingBottom: String(20) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = portfolio;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/portfolio.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //portfolio more icon
        /<%media%>/ height = 8 %/%/% 7 %/%/i
        %/%/+ top = 56 %/%/% 53 %/%/g
        width = GeneralJs.parseRatio({ source: circles, target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(width) + ea,
          right: String(rightMargin) + ea,
          top: String(top) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = circles;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/portfolio.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //portfolio contents
        /<%media%>/ marginTop = -32.5 %/%/% -35 %/%/i
        %/%/+ paddingBottom = 95 %/%/% 75 %/%/i
        %/%/+ paddingBottomAdd = 95 %/%/% 80 %/%/g

        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.style.position = "relative";
        div_clone2.style.marginTop = String(marginTop) + ea;
        div_clone2.style.paddingBottom = String(paddingBottom) + ea;
        div_clone2.appendChild(portfolioRow);
        div_clone.appendChild(div_clone2);

        //review title
        /<%media%>/ height = 21.7 %/%/% 19 %/%/i
        width = GeneralJs.parseRatio({ source: review, target: height, method: "height", result: "number" });
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          left: String(1) + ea,
          paddingBottom: String(20) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = review;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/review.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //review more icon
        /<%media%>/ height = 8 %/%/% 7 %/%/i
        %/%/+ top = 56 + 1103 %/%/% 53 + 1031 %/%/g
        width = GeneralJs.parseRatio({ source: circles, target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(width) + ea,
          right: String(rightMargin) + ea,
          top: String(top) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = circles;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/review.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //review contents
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.style.position = "relative";
        div_clone2.style.marginTop = String(marginTop) + ea;
        div_clone2.style.paddingBottom = String(paddingBottom + paddingBottomAdd) + ea;
        div_clone2.appendChild(reviewRow);
        div_clone.appendChild(div_clone2);


        mother.appendChild(div_clone);
        //portfolio end --------------------------------------------------------------

      },
      belowAbout: function (id, source, mother) {
        const [ sourceObj ] = source;
        const { words, button, images } = sourceObj;

        let height, width, top, paddingTop, marginLeft, left;
        let style = {};
        let div_clone, div_clone2, svg_clone, img_clone;
        let temp, ea = "px";
        let options = {};
        let pictureWidth, pictureMargin;

        mother.style.backgroundColor = "#f7f7f7";

        //base
        /<%media%>/ height = 628 %/%/% 535 %/%/i
        %/%/+ width = 1400 %/%/% 1050 %/%/i
        %/%/+ paddingTop = 142 %/%/% 121 %/%/g
        marginLeft = -1 * (width / 2);

        style = {
          display: "block",
          position: "relative",
          width: String(width) + ea,
          height: String(height) + ea,
          left: "50%",
          marginLeft: String(marginLeft) + ea,
        };

        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let i in style) { div_clone.style[i] = style[i]; }

        //detail

        //picture
        /<%media%>/ height = 450 %/%/% 377 %/%/i
        %/%/+ top = 95 %/%/% 84 %/%/g
        width = GeneralJs.parseRatio({ source: images.desktop[0], target: height, method: "height", result: "number" });
        style = {
          height: String(height) + ea,
          top: String(top) + ea,
          position: "absolute",
          width: String(width) + ea,
          backgroundSize: "100% auto",
          borderRadius: "10px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          right: '0',
        };
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j = 0; j < images.desktop.length; j++) {
          if (/\.svg$/.test(images.desktop[j])) {
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = images.desktop[j];
            svg_clone.classList.add("absolutedefault");
            div_clone2.appendChild(SvgTong.parsing(svg_clone));
          } else {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = IndexJs.sourceLink + "/" + images.desktop[j];
            img_clone.classList.add("absolutedefault");
            div_clone2.appendChild(img_clone);
          }
        }
        for (let i in style) {
          div_clone2.style[i] = style[i];
        }
        div_clone.appendChild(div_clone2);

        //wording
        pictureWidth = width;
        /<%media%>/ pictureMargin = 52 %/%/% 46 %/%/i
        %/%/+ height = 167 %/%/% 162 %/%/i
        %/%/+ top = 193 %/%/% 274 %/%/g

        options = { target: height, method: "height", result: "number" };
        /<%media%>/ options.source = words.desktop %/%/% words.tablet %/%/i

        width = GeneralJs.parseRatio(options);
        style = {
          position: "absolute",
          top: String(top) + ea,
          height: String(height) + ea,
          width: String(width) + ea,
          right: String(pictureWidth + pictureMargin) + ea
        };

        if (window.matchMedia("(max-width:1610px)").matches) {
          delete style.right;
          style.left = "0";
        }

        svg_clone = SvgTong.tongMaker();
        svg_clone.src = options.source;
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //button
        if (window.matchMedia("(min-width:1611px)").matches) {

          height = 32;
          top = 392;
          width = 118;

          style = {
            position: "absolute",
            height: String(height) + ea,
            top: String(top) + ea,
            width: String(width) + ea,
            borderRadius: String(45) + ea,
            background: "linear-gradient(222deg,rgba(89,175,137,.85) 5%,rgba(0,156,106,.85) 100%)",
            cursor: "pointer",
            right: String(pictureWidth + pictureMargin) + ea,
          };

          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          for (let i in style) { div_clone2.style[i] = style[i]; }
          GeneralJs.addHrefEvent(div_clone2, "/about.php");

          //button wording
          height = 12;
          top = 9;

          style = {
            position: "absolute",
            height: String(height) + ea,
            top: String(top) + ea,
            width: GeneralJs.parseRatio({ source: button, target: height, method: "height", result: "string" }) + ea,
          };

          svg_clone = SvgTong.tongMaker();
          svg_clone.src = button;
          svg_clone.classList.add("hoverdefault");
          for (let i in style) { svg_clone.style[i] = style[i]; }
          svg_clone.style.left = String((width - Number(style.width.slice(0, (-1 * ea.length)))) / 2) + ea;
          div_clone2.appendChild(SvgTong.parsing(svg_clone));
          div_clone.appendChild(div_clone2);
        }

        //end
        mother.appendChild(div_clone);

      },
      below: function (id, source, mother) {
        const [ belowButton, copyRight ] = source;
        let div_clone, svg_clone;
        let style = {}
        let ea = "px";
        let height, width, widthAdd, top, left, margin, marginLeft;

        //base
        /<%media%>/ height = 125 %/%/% 107.142857 %/%/i
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          backgroundColor: "#ececec",
        }
        for (let i in style) {
          mother.style[i] = style[i];
        }

        //buttons
        /<%media%>/ margin = 60 %/%/% 50 %/%/i
        widthAdd = 0;

        for (let i = 0; i < belowButton.length; i++) {

          //button
          /<%media%>/ height = 15.4 %/%/% 14 %/%/i
          %/%/+ marginLeft = -700 + widthAdd %/%/% -525 + widthAdd %/%/i
          %/%/+ top = 47 %/%/% 41 %/%/g

          width = GeneralJs.parseRatio({ source: belowButton[i].src, target: height, method: "height", result: "number" });
          widthAdd += width + margin;

          style = {
            display: "block",
            position: "absolute",
            height: String(height) + ea,
            width: String(width) + ea,
            top: String(top) + ea,
            left: "50%",
            marginLeft: String(marginLeft) + ea,
          }
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = belowButton[i].src;
          svg_clone.classList.add("hoverdefault");
          for (let i in style) {
            svg_clone.style[i] = style[i];
          }
          GeneralJs.addHrefEvent(svg_clone, belowButton[i].link);
          mother.appendChild(SvgTong.parsing(svg_clone));

        }

        //button
        /<%media%>/ height = 16 %/%/% 14 %/%/i
        %/%/+ marginLeft = 700 %/%/% 525 %/%/i
        %/%/+ top = 47 %/%/% 41 %/%/g

        width = GeneralJs.parseRatio({ source: copyRight, target: height, method: "height", result: "number" });

        style = {
          display: "block",
          position: "absolute",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(top) + ea,
          left: "50%",
          marginLeft: String(marginLeft - width) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = copyRight;
        svg_clone.classList.add("hoverdefault");
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        mother.appendChild(SvgTong.parsing(svg_clone));

      },
    },
    mobile: {
      mobanner: function (id, source, mother) {
        const [ sourceObj ] = source;
        const { mobile: words, arrow } = sourceObj;
        let style = {};
        let ea = "vw";
        let height, width, top, left;
        let svg_clone;

        //base
        height = 22.1;
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          background: "linear-gradient(110deg,rgba(89,175,137,.95) 0,#009c6a 100%)",
        }
        for (let i in style) {
          mother.style[i] = style[i];
        }

        //wording
        height = 9.3;
        top = 5.5;
        left = 5;
        width = GeneralJs.parseRatio({ source: words, target: height, method: "height", result: "number" });
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(top) + ea,
          left: String(left) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = words;
        svg_clone.classList.add("hoverdefault");
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        GeneralJs.addHrefEvent(svg_clone, "/consulting.php");
        mother.appendChild(SvgTong.parsing(svg_clone));

        //arrow
        height = 2;
        top = 9;
        width = GeneralJs.parseRatio({ source: arrow, target: height, method: "height", result: "number" });
        left = 100 - 5 - width;
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(width) + ea,
          top: String(top) + ea,
          left: String(left) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = arrow;
        svg_clone.classList.add("hoverdefault");
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        GeneralJs.addHrefEvent(svg_clone, "/consulting.php");
        mother.appendChild(SvgTong.parsing(svg_clone));

      },
      moportfolio: async function (id, source, mother) {
        const [ sourceObj ] = source;
        const { portfolio, review, icons: { search } } = sourceObj;

        const { mobileDom_portfolio: portfolioRow } = await GeneralJs.getContents({
          collection: "porlist",
          sort: [ "key9", "DESC" ],
          limit: [ 8 ],
          garo: false,
        });
        const { mobileDom_review: reviewRow } = await GeneralJs.getContents({
          collection: "revlist",
          sort: [ "order_function", "DESC" ],
          limit: [ 8 ],
          garo: false,
        });

        let style = {};
        let div_clone, div_clone2, svg_clone, input_clone;
        let height, width, boxWidth, top, left, paddingTop, marginTop, paddingBottom, paddingBottomAdd;
        let ea = "vw";
        let searchEvent;
        let rightMargin;

        mother.style.paddingTop = String(14) + ea;

        //search box start ---------------------------------------------------------
        width = 87.9;
        height = 13.5;
        style = {
          display: "block",
          position: "relative",
          width: String(width) + ea,
          marginLeft: "auto",
          marginRight: "auto",
          height: String(height) + ea,
        }
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }

        //search box - gray box
        height = height - 6;
        boxWidth = 79.4;
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(boxWidth) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          backgroundColor: "#f5f5f5",
          borderRadius: String(4) + "px",
        }
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone.appendChild(div_clone2);

        //search box - input box
        style = {
          position: "absolute",
          height: String(height) + ea,
          width: String(boxWidth) + ea,
          top: String(0) + ea,
          left: String(0) + ea,
          backgroundColor: "transparent",
          color: "#303030",
          border: String(0),
          textIndent: String(1) + ea,
          fontSize: String(3.2) + "vw",
          paddingBottom: String(1) + "%",
          fontFamily: '"Noto Sans KR",sans-serif',
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.setAttribute("type", "text");
        for (let j in style) {
          input_clone.style[j] = style[j];
        }
        searchEvent = function (e) {
          let value = input_clone.value.replace(/[&=<>\{\}\[\]\(\)\'\"]/g, '');
          window.location.href = "/portfolio.php?search=" + value;
        }
        input_clone.addEventListener("keyup", function (e) {
          if (e.keyCode === 13) {
            searchEvent(e);
          }
        });
        div_clone.appendChild(input_clone);

        //search box - icon
        style = {
          position: "absolute",
          height: String(height - 2) + ea,
          top: String(0.7) + ea,
          width: GeneralJs.parseRatio({ source: search, target: height, method: "height", result: "string" }) + ea,
          left: String(81) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = search;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.addEventListener("click", searchEvent);
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        mother.appendChild(div_clone);
        //search box end -------------------------------------------------------------

        //portfolio start ------------------------------------------------------------
        rightMargin = 2.8;
        width = 87.9;
        style = {
          display: "block",
          position: "relative",
          width: String(width + rightMargin) + ea,
          left: String((100 - width) / 2) + ea,
        }
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone.style[j] = style[j];
        }

        //portfolio title
        height = 4;
        width = GeneralJs.parseRatio({ source: portfolio, target: height, method: "height", result: "number" });
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          left: String(0) + ea,
          marginBottom: String(4.1) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = portfolio;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/portfolio.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //portfolio gray bar
        height = 0.2;
        width = 87.9 - width - 2.5;
        top = 1.4;
        style = {
          position: "absolute",
          top: String(top) + ea,
          height: String(height) + ea,
          width: String(width) + ea,
          right: String(rightMargin) + ea,
          backgroundColor: "#ececec",
        }
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone.appendChild(div_clone2);

        //portfolio contents
        marginTop = -3.5;
        paddingBottom = 13;
        paddingBottomAdd = 5;

        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.style.position = "relative";
        div_clone2.style.marginTop = String(marginTop) + ea;
        div_clone2.style.paddingBottom = String(paddingBottom) + ea;
        div_clone2.appendChild(portfolioRow);
        div_clone.appendChild(div_clone2);

        //review title
        height = 4;
        width = GeneralJs.parseRatio({ source: review, target: height, method: "height", result: "number" });
        style = {
          display: "block",
          position: "relative",
          height: String(height) + ea,
          width: String(width) + ea,
          left: String(0) + ea,
          marginBottom: String(4.1) + ea,
        }
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = review;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        svg_clone.classList.add("zlevel1");
        GeneralJs.addHrefEvent(svg_clone, "/review.php");
        div_clone.appendChild(SvgTong.parsing(svg_clone));

        //review gray bar
        height = 0.2;
        width = 87.9 - width - 2.5;
        top = 219.3;
        style = {
          position: "absolute",
          top: String(top) + ea,
          height: String(height) + ea,
          width: String(width) + ea,
          right: String(rightMargin) + ea,
          backgroundColor: "#ececec",
        }
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        for (let j in style) {
          div_clone2.style[j] = style[j];
        }
        div_clone.appendChild(div_clone2);

        //review contents
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.style.position = "relative";
        div_clone2.style.marginTop = String(marginTop) + ea;
        div_clone2.style.paddingBottom = String(paddingBottom + paddingBottomAdd) + ea;
        div_clone2.appendChild(reviewRow);
        div_clone.appendChild(div_clone2);

        mother.appendChild(div_clone);
        //portfolio end --------------------------------------------------------------

      },
      mobelowAbout: function (id, source, mother) {
        const [ sourceObj ] = source;
        const { words: { mobile: words }, images: { mobile: images } } = sourceObj;
        let style = {};
        let ea = "vw";
        let svg_clone, img_clone;
        let height, width, top, left, marginLeft, totalWidth, totalHeight;
        totalWidth = 87.9;
        totalHeight = 211;

        mother.style.height = String(totalHeight) + ea;
        mother.style.backgroundColor = "#f7f7f7";
        mother.style.position = "relative";

        //wording
        top = 18;
        height = 24.5;
        width = GeneralJs.parseRatio({ source: words, target: height, method: "height", result: "number" });
        marginLeft = -1 * (width / 2);
        style = {
          position: "absolute",
          top: String(top) + ea,
          height: String(height) + ea,
          width: String(width) + ea,
          left: "50%",
          marginLeft: String(marginLeft) + ea,
        };
        svg_clone = SvgTong.tongMaker();
        svg_clone.src = words;
        for (let j in style) {
          svg_clone.style[j] = style[j];
        }
        svg_clone.classList.add("hoverdefault");
        GeneralJs.addHrefEvent(svg_clone, "/about.php");
        mother.appendChild(SvgTong.parsing(svg_clone));

        //images
        top = top + height + 9;
        height = GeneralJs.parseRatio({ source: images[0], target: totalWidth, method: "width", result: "number" });
        marginLeft = -1 * (totalWidth / 2);
        style = {
          position: "absolute",
          top: String(top) + ea,
          height: String(height) + ea,
          width: String(totalWidth) + ea,
          left: "50%",
          marginLeft: String(marginLeft) + ea,
        };

        for (let i = 0; i < images.length; i++) {
          if (/\.svg$/.test(images[i])) {
            svg_clone = SvgTong.tongMaker();
            svg_clone.src = images[i];
            for (let j in style) {
              svg_clone.style[j] = style[j];
            }
            mother.appendChild(SvgTong.parsing(svg_clone));
          } else {
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.src = IndexJs.sourceLink + '/' + images[i];
            for (let j in style) {
              img_clone.style[j] = style[j];
            }
            mother.appendChild(img_clone);
          }
        }
      },
    },
  }

  const { desktop, mobile } = this.asyncTarget;
  let tempFunc;

  if (window.matchMedia("(max-width:900px)").matches) {
    //mobile
    for (let i = 0; i < mobile.length; i++) {
      tempFunc = list.mobile[mobile[i].id];
      tempFunc(mobile[i].id, mobile[i].source, mobile[i].dom);
    }
  } else {
    //desktop
    for (let i = 0; i < desktop.length; i++) {
      tempFunc = list.desktop[desktop[i].id];
      tempFunc(desktop[i].id, desktop[i].source, desktop[i].dom);
    }
  }

}

IndexJs.prototype.asyncLoader = function () {
  const instance = this;
  return function (e) {
    instance.asyncExec();
  };
}

IndexJs.prototype.asyncAnimation = function () {
  const instance = this;
  return function (e) {
    for (let z in instance.animationDoms) {
      for (let i in instance.animationDoms[z].animation) {
        for (let j = 0; j < instance.animationDoms[z].animation[i].length; j++) { instance.animationDoms[z].target[i][j].style.animation = instance.animationDoms[z].animation[i][j]; }
      }
    }
  }
}

IndexJs.prototype.toHidden = function () {
  let hiddenSpot = document.getElementById("hiddentextmain0817");
  let div_clone;
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

IndexJs.prototype.reloadState = function () {
  const instance = this;
  return function () {
    let h = document.createDocumentFragment();
    let m = document.createDocumentFragment();
    let div_clone;
    let mother = {
      desktop: document.getElementById("totalcontents"),
      mobile: document.getElementById("mototalcontents")
    }

    instance.initialDom();

    if (window.scorllY > 0) {
      instance.asyncExec();
    } else if (window.scrollY === 0 && IndexJs.asyncExecOn !== 0) {
      instance.asyncExec();
    }

    div_clone = document.getElementById("footergreenback0817_clone").cloneNode(true);
    div_clone.id = "footergreenback0817";
    div_clone.style.display = "";
    mother.desktop.appendChild(div_clone);
    div_clone = document.getElementById("mofooterbelow_clone").cloneNode(true);
    div_clone.id = "";
    div_clone.style.display = "";
    mother.mobile.appendChild(div_clone);

    let animationFunc = instance.asyncAnimation();
    animationFunc({});
  }
}

IndexJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.toHidden();
    this.initialDom();
    this.mother.scrollAsyncLaunching(this.asyncLoader());
    this.mother.loadLaunching(this.asyncAnimation());
    this.mother.resizeLaunching(this.reloadState());
  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
}
