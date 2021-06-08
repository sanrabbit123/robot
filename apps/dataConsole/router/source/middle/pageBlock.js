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
      "return ('pageBlock');"
    ],
    "description": [
      "thisPerson",
      "return ('pageBlock');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": true
  },
  "name": "pageBlock",
  "route": [
    "pageBlocks",
    "blocks",
    "PB"
  ]
} %/%/g

const PageBlockJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = document.getElementById("totalcontents");
  this.ea = "px";
  this.base = null;
  this.index = 0;
  this.sideBar = null;
  this.cards = [];
  this.cardsIndex = 0;
}

PageBlockJs.prototype.scrollMaker = function () {
  const instance = this;
  const fileCharacter = 'a';
  const fileCompressCharacter = 'moa';
  const { binaryIndex, ratio, length, name, html } = this.thisPage;
  const { colorChip, createNode, createNodes } = GeneralJs;
  let paddingLeft, paddingTop;
  let width, height;
  let style;
  let ea;
  let intoContents;
  let margin;
  let sideBar;
  let sideWidth, sideMargin;
  let marginBottom;
  let tempResult;
  let htmlKeys;

  htmlKeys = Object.keys(html);
  htmlKeys = htmlKeys.map((key) => { return Number(key.replace(/[^0-9\.\-]/gi, '')); });

  ea = "px";
  margin = 40;
  marginBottom = 20;
  height = window.innerHeight - (margin * 2);
  width = height * ratio;
  sideWidth = 200;
  sideMargin = 40;

  if (window.innerWidth >= width) {
    paddingLeft = (window.innerWidth - width) / 2;
    paddingTop = null;
  } else {
    width = window.innerWidth;
    height = width / ratio;
    paddingLeft = null;
    paddingTop = 0;
    margin = 15;
    marginBottom = 15;
  }

  style = {
    position: "relative",
    background: colorChip.black,
    transition: "all 0s ease",
    overflowX: "hidden",
    overflowY: "scroll",
  };
  if (paddingTop === null) {
    style.paddingLeft = String(paddingLeft) + ea;
    style.width = String(window.innerWidth - paddingLeft) + ea;
  } else {
    style.paddingLeft = String(margin) + ea;
    style.paddingTop = String(paddingTop) + ea;
    style.width = String(window.innerWidth - margin) + ea;
    width = width - (margin * 2);
  }
  for (let i in style) {
    this.totalContents.style[i] = style[i];
  }

  this.base = createNode({
    mother: this.totalContents,
    id: "base",
    style: {
      position: "relative",
      width: String(width) + ea,
      animation: "fadeup 0.5s ease forwards",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
    }
  });

  intoContents = function (where, width, side = false) {
    let nodeArr = [];
    let whiteBase;
    let finalMotherIndex;
    let height;
    let asideArr;

    height = width / ratio;

    for (let i = 0; i < length; i++) {
      whiteBase = {
        mother: where,
        attribute: [
          { index: String(i) }
        ],
        style: {
          position: "relative",
          width: String(width) + ea,
          height: String(height) + ea,
          background: "white",
          borderRadius: String(3) + ea,
          marginBottom: String(marginBottom) + ea,
          overflow: "hidden",
          boxShadow: side ? "" : "0px 6px 16px -9px #000000",
          transition: "all 0s ease",
        }
      };

      if (side) {
        whiteBase.class = [ "hoverDefault" ];
        whiteBase.events = [
          {
            type: "click",
            event: function (e) {
              const index = Number(this.getAttribute("index"));
              const pages = document.querySelectorAll(".scrollPages");
              document.getElementById("totalcontents").scrollTo({
                top: (pages[index].offsetTop - margin),
              });
              console.log(index);
            }
          }
        ]
      } else {
        whiteBase.class = [ "scrollPages" ];
      }

      nodeArr.push(whiteBase);
      if (binaryIndex.includes(i + 1)) {
        nodeArr.push({
          mother: -1,
          mode: "img",
          attribute: [
            { src: S3HOST + "/pageBlock/" + name + "/" + "jpg" + "/" + (side ? fileCompressCharacter : fileCharacter) + String(i + 1) + "." + "jpg" }
          ],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        nodeArr.push({
          mother: -2,
          mode: "svg",
          source: SvgTong[fileCharacter + String(i + 1)],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        finalMotherIndex = -3;
      } else {
        nodeArr.push({
          mother: -1,
          mode: "svg",
          source: SvgTong[fileCharacter + String(i + 1)],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        finalMotherIndex = -2;
      }

      if (!side && htmlKeys.includes(i + 1)) {
        asideArr = html[fileCharacter + String(i + 1)](finalMotherIndex, width, height);
        for (let obj of asideArr) {
          nodeArr.push(obj);
        }
      }

    }
    return nodeArr;
  }

  tempResult = createNodes([
    {
      mother: this.totalContents,
      id: "side",
      attribute: [
        { toggle: "off" }
      ],
      style: {
        position: "fixed",
        width: String(sideWidth + sideMargin) + ea,
        paddingTop: String(sideMargin) + ea,
        paddingLeft: String(sideMargin) + ea,
        height: String(100) + 'vh',
        left: String(0) + ea,
        top: String(0) + ea,
        boxShadow: "2px 0px 4px -5px " + colorChip.realBlack,
        overflow: "scroll",
        transform: "translateX(" + String(-1 * (sideWidth + (sideMargin * 2))) + ea + ")",
      }
    },
    {
      mother: 0,
      style: {
        position: "absolute",
        width: String(100) + '%',
        height: String(sideMargin + (((sideWidth / ratio) + marginBottom) * length) + sideMargin) + ea,
        left: String(0) + ea,
        top: String(0) + ea,
        background: colorChip.realBlack,
        opacity: String(0.7),
        backdropFilter: "blur(8px)",
      }
    },
    {
      mother: 0,
      style: {
        position: "relative",
        width: String(100) + '%',
        height: String(sideMargin + (((sideWidth / ratio) + marginBottom) * length) + sideMargin) + ea,
        left: String(0) + ea,
        top: String(0) + ea,
      }
    }
  ]);

  this.sideBar = tempResult[0];
  sideBar = tempResult[2];

  this.cards = createNodes(intoContents(this.base, width, false));
  this.cards = this.cards.filter((dom) => { return /div/gi.test(dom.nodeName); });
  createNodes(intoContents(sideBar, sideWidth, true));
}

PageBlockJs.prototype.cardMaker = function () {
  const instance = this;
  const fileCharacter = 'a';
  const fileCompressCharacter = 'moa';
  const { binaryIndex, ratio, length, name, html } = this.thisPage;
  const { colorChip, createNode, createNodes } = GeneralJs;
  let paddingLeft, paddingTop;
  let width, height;
  let style;
  let ea;
  let intoContents;
  let margin;
  let sideBar;
  let sideWidth, sideMargin;
  let marginBottom;
  let tempResult;
  let htmlKeys;
  let pageView;

  htmlKeys = Object.keys(html);
  htmlKeys = htmlKeys.map((key) => { return Number(key.replace(/[^0-9\.\-]/gi, '')); });

  ea = "px";
  margin = 40;
  marginBottom = 20;
  height = window.innerHeight;
  width = height * ratio;
  sideWidth = 200;
  sideMargin = 40;

  if (window.innerWidth >= width) {
    paddingLeft = (window.innerWidth - width) / 2;
    paddingTop = null;
    pageView = "garo";
  } else {
    width = window.innerWidth;
    height = width / ratio;
    paddingLeft = null;
    paddingTop = 0;
    margin = 0;
    marginBottom = 15;
    pageView = "sero";
  }

  style = {
    position: "relative",
    background: colorChip.black,
    transition: "all 0s ease",
    overflowX: "hidden",
    overflowY: "scroll",
  };
  if (paddingTop === null) {
    style.paddingLeft = String(paddingLeft) + ea;
    style.width = String(window.innerWidth - paddingLeft) + ea;
  } else {
    style.paddingLeft = String(margin) + ea;
    style.paddingTop = String(paddingTop) + ea;
    style.width = String(window.innerWidth - margin) + ea;
    width = width - (margin * 2);
  }
  for (let i in style) {
    this.totalContents.style[i] = style[i];
  }

  this.base = createNode({
    mother: this.totalContents,
    id: "base",
    style: {
      position: "relative",
      width: String(width) + ea,
      animation: "fadeup 0.5s ease forwards",
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
    }
  });

  intoContents = function (where, width, side = false) {
    let nodeArr = [];
    let whiteBase;
    let finalMotherIndex;
    let height;
    let asideArr;

    height = width / ratio;

    for (let i = 0; i < length; i++) {
      whiteBase = {
        mother: where,
        attribute: [
          { index: String(i) }
        ],
        style: {
          position: "absolute",
          width: String(width) + ea,
          height: String(height) + ea,
          background: "white",
          top: String(pageView === "garo" ? 0 : ((window.innerHeight - height) / 2)) + ea,
          overflow: "hidden",
          transition: "all 0s ease",
          display: i === 0 ? "block" : "none"
        }
      };
      if (side) {
        delete whiteBase.style.top;
        whiteBase.style.position = "relative";
        whiteBase.style.marginBottom = String(marginBottom) + ea;
        whiteBase.style.borderRadius = String(3) + ea;
        whiteBase.style.display = "block";
        whiteBase.class = [ "hoverDefault" ];
        whiteBase.events = [
          {
            type: "click",
            event: function (e) {
              const index = Number(this.getAttribute("index"));
              for (let i = 0; i < instance.cards.length; i++) {
                instance.cards[i].style.display = "none";
              }
              instance.cards[index].style.display = "block";
              instance.cardsIndex = index;
            }
          }
        ]
      } else {
        whiteBase.class = [ "scrollPages" ];
      }

      nodeArr.push(whiteBase);
      if (binaryIndex.includes(i + 1)) {
        nodeArr.push({
          mother: -1,
          mode: "img",
          attribute: [
            { src: S3HOST + "/pageBlock/" + name + "/" + "jpg" + "/" + (side ? fileCompressCharacter : fileCharacter) + String(i + 1) + "." + "jpg" }
          ],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        nodeArr.push({
          mother: -2,
          mode: "svg",
          source: SvgTong[fileCharacter + String(i + 1)],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        finalMotherIndex = -3;
      } else {
        nodeArr.push({
          mother: -1,
          mode: "svg",
          source: SvgTong[fileCharacter + String(i + 1)],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
        finalMotherIndex = -2;
      }

      if (!side && htmlKeys.includes(i + 1)) {
        asideArr = html[fileCharacter + String(i + 1)](finalMotherIndex, width, height);
        for (let obj of asideArr) {
          nodeArr.push(obj);
        }
      }

    }
    return nodeArr;
  }

  tempResult = createNodes([
    {
      mother: this.totalContents,
      id: "side",
      attribute: [
        { toggle: "off" }
      ],
      style: {
        position: "fixed",
        width: String(sideWidth + sideMargin) + ea,
        paddingTop: String(sideMargin) + ea,
        paddingLeft: String(sideMargin) + ea,
        height: String(100) + 'vh',
        left: String(0) + ea,
        top: String(0) + ea,
        boxShadow: "2px 0px 4px -5px " + colorChip.realBlack,
        overflow: "scroll",
        transform: "translateX(" + String(-1 * (sideWidth + (sideMargin * 2))) + ea + ")",
      }
    },
    {
      mother: 0,
      style: {
        position: "absolute",
        width: String(100) + '%',
        height: String(sideMargin + (((sideWidth / ratio) + marginBottom) * length) + sideMargin) + ea,
        left: String(0) + ea,
        top: String(0) + ea,
        background: colorChip.realBlack,
        opacity: String(0.7),
        backdropFilter: "blur(8px)",
      }
    },
    {
      mother: 0,
      style: {
        position: "relative",
        width: String(100) + '%',
        height: String(sideMargin + (((sideWidth / ratio) + marginBottom) * length) + sideMargin) + ea,
        left: String(0) + ea,
        top: String(0) + ea,
      }
    }
  ]);

  this.sideBar = tempResult[0];
  sideBar = tempResult[2];

  this.cards = createNodes(intoContents(this.base, width, false));
  this.cards = this.cards.filter((dom) => { return /div/gi.test(dom.nodeName); });
  createNodes(intoContents(sideBar, sideWidth, true));
}

PageBlockJs.prototype.iconMaker = function (cardMode = false) {
  const instance = this;
  const ea = this.ea;
  const { colorChip, createNode, createNodes } = GeneralJs;
  let radius;
  let ratio;
  let visualTop, visualLeft;
  let margin;

  radius = 23;
  ratio = 0.9;
  visualTop = 1;
  visualLeft = 0;
  margin = 5;

  createNodes([
    //card view convert
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30 + (radius * 2) + margin) + ea,
        right: String(30) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            const getObj = GeneralJs.returnGet();
            let query;
            query = '?';
            for (let i in getObj) {
              if (i !== "mode") {
                query += i;
                query += "=";
                query += getObj[i];
                query += "&";
              }
            }
            if (cardMode) {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + query + "mode=row";
            } else {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + query + "mode=card";
            }
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: cardMode ? this.mother.returnRinitialItalic(colorChip.gray4) : this.mother.returnCinitial(colorChip.gray4),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - visualTop) + ea,
        left: String((radius * ((2 - ratio) / 2)) - (cardMode ? -1 : 0)) + ea,
        width: String(cardMode ? ((radius - 3) * ratio) : (radius * ratio)) + ea,
      }
    },
    //view list
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30 + (radius * 2) + margin) + ea,
        right: String(30 + (radius * 2) + margin) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (instance.sideBar !== null) {
              const sideBar = instance.sideBar;
              let move;
              move = Number(sideBar.style.width.replace(/[^0-9\.\-]/gi, '')) + Number(sideBar.style.paddingLeft.replace(/[^0-9\.\-]/gi, ''));
              if (sideBar.getAttribute("toggle") === "on") {
                sideBar.style.transform = "translateX(-" + String(move) + ea + ")";
                sideBar.setAttribute("toggle", "off");
              } else {
                sideBar.style.transform = "translateX(" + String(0) + ea + ")";
                sideBar.setAttribute("toggle", "on");
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.gray3),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - (-1.7)) + ea,
        left: String((radius * ((2 - ratio) / 2)) - visualLeft) + ea,
        width: String(radius * ratio) + ea,
      }
    },
    //plus button
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30) + ea,
        right: String(30 + (radius * 2) + margin) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (!cardMode) {
              const pages = document.querySelectorAll(".scrollPages");
              let ratio;
              let amount;
              let width, height;
              amount = 100;
              if (Number(instance.totalContents.style.paddingLeft.replace(/[^0-9\.\-]/gi, '')) - (amount / 2) > 0) {
                instance.totalContents.style.paddingLeft = String(Number(instance.totalContents.style.paddingLeft.replace(/[^0-9\.\-]/gi, '')) - (amount / 2)) + ea;
                instance.totalContents.style.width = String(Number(instance.totalContents.style.width.replace(/[^0-9\.\-]/gi, '')) + (amount / 2)) + ea;
                for (let p of pages) {
                  width = Number(p.style.width.replace(/[^0-9\.\-]/gi, ''));
                  height = Number(p.style.height.replace(/[^0-9\.\-]/gi, ''));
                  ratio = width / height;
                  p.style.width = String(width + amount) + ea;
                  p.style.height = String((width + amount) / ratio) + ea;
                }
              }
            } else {
              if (instance.cards[instance.cardsIndex - 1] !== undefined) {
                for (let dom of instance.cards) {
                  dom.style.display = "none";
                }
                instance.cards[instance.cardsIndex - 1].style.display = "block";
                instance.cardsIndex = instance.cardsIndex - 1;
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: cardMode ? this.mother.returnDecrease(colorChip.gray3) : this.mother.returnAddition(colorChip.gray3),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - (cardMode ? 0.5 : 0)) + ea,
        left: String((radius * ((2 - ratio) / 2)) - (cardMode ? 1.2 : 0)) + ea,
        width: String(radius * ratio) + ea,
      }
    },
    //minus button
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30) + ea,
        right: String(30) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (!cardMode) {
              const pages = document.querySelectorAll(".scrollPages");
              let ratio;
              let amount;
              let width, height;
              amount = 100;
              if (Number(pages[0].style.width.replace(/[^0-9\.\-]/gi, '')) - amount > 0) {
                instance.totalContents.style.paddingLeft = String(Number(instance.totalContents.style.paddingLeft.replace(/[^0-9\.\-]/gi, '')) + (amount / 2)) + ea;
                instance.totalContents.style.width = String(Number(instance.totalContents.style.width.replace(/[^0-9\.\-]/gi, '')) - (amount / 2)) + ea;
                for (let p of pages) {
                  width = Number(p.style.width.replace(/[^0-9\.\-]/gi, ''));
                  height = Number(p.style.height.replace(/[^0-9\.\-]/gi, ''));
                  ratio = width / height;
                  p.style.width = String(width - amount) + ea;
                  p.style.height = String((width - amount) / ratio) + ea;
                }
              }
            } else {
              if (instance.cards[instance.cardsIndex + 1] !== undefined) {
                for (let dom of instance.cards) {
                  dom.style.display = "none";
                }
                instance.cards[instance.cardsIndex + 1].style.display = "block";
                instance.cardsIndex = instance.cardsIndex + 1;
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: cardMode ? this.mother.returnIncrease(colorChip.gray3) : this.mother.returnSubtract(colorChip.gray3),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - (cardMode ? 0.5 : 0)) + ea,
        left: String((radius * ((2 - ratio) / 2)) - (cardMode ? -1 : 0)) + ea,
        width: String(radius * ratio) + ea,
      }
    },
    //hl button
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30 + (radius * 4) + (margin * 2)) + ea,
        right: String(30) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            let a = document.createElement("A");
            a.style.display = "none";
            a.href = "https://home-liaison.com";
            a.setAttribute("target", "_blank");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHinitial(colorChip.gray3),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - (-0.5)) + ea,
        left: String((radius * ((2 - ratio) / 2)) - (-2)) + ea,
        width: String((radius - 4.5) * ratio) + ea,
      }
    },
    //download button
    {
      mother: this.totalContents,
      style: {
        position: "fixed",
        bottom: String(30 + (radius * 4) + (margin * 2)) + ea,
        right: String(30 + (radius * 2) + margin) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius + 1) + ea,
        background: colorChip.realBlack,
      }
    },
    {
      mother: -1,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            GeneralJs.downloadFile(S3HOST + '/pageBlock/' + instance.thisPage.name + '/pdf/tong.pdf', instance.thisPage.pdfName).catch(function (e) { console.log(e); });
          }
        }
      ],
      style: {
        position: "relative",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDownload(colorChip.gray3),
      style: {
        position: "absolute",
        top: String((radius * ((2 - ratio) / 2)) - (1)) + ea,
        left: String((radius * ((2 - ratio) / 2)) - (2)) + ea,
        width: String((radius + 4) * ratio) + ea,
      }
    },
  ]);
}

PageBlockJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    document.querySelector("style").insertAdjacentHTML("beforeend", "body {transition: all 0s ease}");
    const getObj = GeneralJs.returnGet();

    if (getObj.type === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
      throw new Error("invaild query string");
      return;
    } else {

      let answer;
      if (window.localStorage.getItem("passwords") !== null) {
        answer = Number(window.localStorage.getItem("passwords"));
        if (answer === 2039 || Number.isNaN(answer)) {
          window.localStorage.clear();
          answer = Number(window.prompt("비밀번호를 입력해주세요!"));
        }
      } else {
        answer = Number(window.prompt("비밀번호를 입력해주세요!"));
      }

      if ((String(Math.round(((Number(String((((((5 * ((answer - 30) / 5) * 2)) - 18) / 4) - 998) / 2) + String(13)) % 3) * 500) / 3)) + String(3)) === "-423") {

        window.localStorage.setItem("passwords", String(answer));
        window.addEventListener("resize", (e) => { window.location.reload(); });

        const Generator = require("/" + getObj.type + "/index.js");
        const generator = new Generator();
        const thisPage = await generator.render();
        this.thisPage = thisPage;

        const svgConst = "tong.js";
        const svgData = await GeneralJs.requestPromise(S3HOST + "/pageBlock/" + thisPage.name + "/svg/" + svgConst);
        const svgFunction = new Function(svgData);
        svgFunction();
        loading.parentNode.removeChild(loading);

        if (getObj.mode === "card") {
          this.cardMaker();
          this.iconMaker(true);
        } else {
          this.scrollMaker();
          this.iconMaker(false);
        }

      } else {
        alert("잘못된 접근입니다!");
        window.localStorage.clear();
        window.location.href = "https://home-liaison.com";
        throw new Error("invaild query string");
        return;
      }
    }
  } catch (e) {
    console.log(e);
  }
}
