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

PageBlockJs.prototype.baseMaker = function () {
  const instance = this;
  const ratio = (16 / 9);
  let paddingLeft, paddingTop;
  let width, height;
  let style;
  let ea;

  ea = "px";
  height = window.innerHeight;
  width = height * ratio;

  if (window.innerWidth >= width) {
    paddingLeft = (window.innerWidth - width) / 2;
    paddingTop = null;
  } else {
    width = window.innerWidth;
    height = width / ratio;
    paddingLeft = null;
    paddingTop = (window.innerHeight - height) / 2;
  }

  style = {
    position: "relative",
    background: GeneralJs.colorChip.black,
  };
  if (paddingTop === null) {
    style.paddingLeft = String(paddingLeft) + ea;
    style.width = String(window.innerWidth - paddingLeft) + ea;
    style.height = String(window.innerHeight) + ea;
  } else {
    style.paddingTop = String(paddingTop) + ea;
    style.width = String(window.innerWidth) + ea;
    style.height = String(window.innerHeight - paddingTop) + ea;
  }
  for (let i in style) {
    this.totalContents.style[i] = style[i];
  }

  this.base = GeneralJs.createNode({
    mother: this.totalContents,
    id: "base",
    style: {
      position: "relative",
      width: String(width) + ea,
      height: String(height) + ea,
      overflow: "hidden",
      background: "white",
    }
  });

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


PageBlockJs.prototype.launching = async function (loading) {
  const instance = this;
  try {

    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease;}");

    const getObj = GeneralJs.returnGet();
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);
    if (getObj.type === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
      throw new Error("invaild query string");
    } else {
      this.baseMaker();
      const Generator = require("/generator.js");
      const generator = new Generator();
      const pages = await generator.generatePages(getObj.type);
      if (pages === null) {
        alert("잘못된 접근입니다!");
        window.location.href = "https://home-liaison.com";
        throw new Error("invaild query string");
      } else {
        if (getObj.index === undefined || Number.isNaN(Number(getObj.index.replace(/[^0-9]/gi, '')))) {
          alert("잘못된 접근입니다!");
          window.location.href = "https://home-liaison.com";
          throw new Error("invaild query string");
        }
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
        document.querySelector("style").insertAdjacentHTML("beforeend", animationString);
        this.ea = <%% "vw", "vw", "vw", "vw" %%>;
        this.pages = await pages.render(Number(getObj.index.replace(/[^0-9]/gi, '')));
        this.pageRender();
      }
    }
  } catch (e) {
    console.log(e);
  }
}
