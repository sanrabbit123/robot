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
  }
} %/%/g

const PageBlockJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = document.getElementById("totalcontents");
  this.ea = "vw";
  this.pages = null;
  this.base = null;
  this.index = 0;
}

PageBlockJs.prototype.scrollMaker = function () {
  const instance = this;
  const fileCharacter = 'a';
  const fileExecCases = [ "png", "svg" ];
  const pngIndex = [ 5, 21, 27, 30, 31 ];
  const ratio = (297 / 210);
  const length = 45;
  const name = "thirdIR";
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
    margin = 30;
  }

  style = {
    position: "relative",
    background: colorChip.black,
    overflow: "scroll",
    transition: "all 0s ease",
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

    for (let i = 0; i < length; i++) {
      whiteBase = {
        mother: where,
        attribute: [
          { index: String(i) }
        ],
        style: {
          position: "relative",
          width: String(width) + ea,
          height: String(width / ratio) + ea,
          background: "white",
          borderRadius: String(3) + ea,
          marginBottom: String(marginBottom) + ea,
          overflow: "hidden",
          boxShadow: side ? "" : "0px 6px 16px -9px #000000",
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
      if (pngIndex.includes(i + 1)) {
        for (let f = 0; f < fileExecCases.length; f++) {
          nodeArr.push({
            mother: -1 + (-1 * f),
            mode: "img",
            attribute: [
              { src: S3HOST + "/pageBlock/" + name + "/" + fileExecCases[f] + "/" + fileCharacter + String(i + 1) + "." + fileExecCases[f] }
            ],
            style: {
              position: "absolute",
              width: "calc(100% + " + String(1 * 2) + ea + ")",
              height: "calc(100% + " + String(1 * 2) + ea + ")",
              top: String(-1) + ea,
              left: String(-1) + ea,
            }
          });
        }
      } else {
        nodeArr.push({
          mother: -1,
          mode: "img",
          attribute: [
            { src: S3HOST + "/pageBlock/" + name + "/" + fileExecCases[1] + "/" + fileCharacter + String(i + 1) + "." + fileExecCases[1] }
          ],
          style: {
            position: "absolute",
            width: "calc(100% + " + String(1 * 2) + ea + ")",
            height: "calc(100% + " + String(1 * 2) + ea + ")",
            top: String(-1) + ea,
            left: String(-1) + ea,
          }
        });
      }
    }
    return nodeArr;
  }

  sideBar = (createNodes([
    {
      mother: this.totalContents,
      id: "side",
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
  ]))[2];

  createNodes(intoContents(this.base, width, false));
  createNodes(intoContents(sideBar, sideWidth, true));
}

PageBlockJs.prototype.pageRender = function () {
  const instance = this;
  const { base, pages } = this;
  if (pages.length === 0) {
    window.alert("There is no page!");
    window.location.href = "https://home-liaison.com";
  } else {
    base.appendChild(pages[this.index]);
  }
}

PageBlockJs.prototype.injectionAnimation = function () {
  const instance = this;
  const style = document.querySelector("style");
  const animationString = `
  @keyframes pageAni_up_forwards{
    from {opacity:0;transform:translateY(10px);}
    to {opacity:1;transform:translateY(0px);}
  }
  @keyframes pageAni_up_noforwards{
    from {opacity:0;transform:translateY(10px);}
    16.6% {opacity:1;transform:translateY(0px);}
    83.4% {opacity:1;transform:translateY(0px);}
    to {opacity:0;transform:translateY(10px);}
  }

  @keyframes pageAni_down_forwards{
    from {opacity:0;transform:translateY(-10px);}
    to {opacity:1;transform:translateY(0px);}
  }
  @keyframes pageAni_down_noforwards{
    from {opacity:0;transform:translateY(-10px);}
    16.6% {opacity:1;transform:translateY(0px);}
    83.4% {opacity:1;transform:translateY(0px);}
    to {opacity:0;transform:translateY(-10px);}
  }

  @keyframes pageAni_right_forwards{
    from {opacity:0;transform:translateX(10px);}
    to {opacity:1;transform:translateX(0px);}
  }
  @keyframes pageAni_right_noforwards{
    from {opacity:0;transform:translateX(10px);}
    16.6% {opacity:1;transform:translateX(0px);}
    83.4% {opacity:1;transform:translateX(0px);}
    to {opacity:0;transform:translateX(10px);}
  }

  @keyframes pageAni_left_forwards{
    from {opacity:0;transform:translateX(-10px);}
    to {opacity:1;transform:translateX(0px);}
  }
  @keyframes pageAni_left_noforwards{
    from {opacity:0;transform:translateX(-10px);}
    16.6% {opacity:1;transform:translateX(0px);}
    83.4% {opacity:1;transform:translateX(0px);}
    to {opacity:0;transform:translateX(-10px);}
  }

  @keyframes pageAni_in_forwards{
    from {opacity:0;}
    to {opacity:1;}
  }
  @keyframes pageAni_in_noforwards{
    from {opacity:0;}
    16.6% {opacity:1;}
    83.4% {opacity:1;}
    to {opacity:0;}
  }`;
  // style.insertAdjacentHTML("beforeend", ("*{transition:all 0s ease;}" + "\n\n" + animationString));
}

PageBlockJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.injectionAnimation();
    const getObj = GeneralJs.returnGet();
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);
    if (getObj.type === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
      throw new Error("invaild query string");
    } else {
      this.scrollMaker();

      // window.addEventListener("resize", function (e) {
      //   window.location.reload();
      // });

      // const Generator = require("/generator.js");
      // const generator = new Generator();
      // const pages = await generator.generatePages(getObj.type);
      // if (pages === null) {
      //   alert("잘못된 접근입니다!");
      //   window.location.href = "https://home-liaison.com";
      //   throw new Error("invaild query string");
      // } else {
      //   this.ea = <%% "vw", "vw", "vw", "vw" %%>;
      //   this.pages = await pages.render(Number(getObj.index.replace(/[^0-9]/gi, '')));
      //   this.pageRender();
      // }


    }
  } catch (e) {
    console.log(e);
  }
}
