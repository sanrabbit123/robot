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
  this.ea = "px";
  this.pages = null;
  this.base = null;
  this.index = 0;
}

PageBlockJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea } = this;
  const ratio = (16 / 9);
  let paddingLeft, paddingTop;
  let width, height;
  let style;
  let totalBase;

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

  totalBase = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    width: String(width) + ea,
    height: String(height) + ea,
    background: "red",
    opacity: String(0.6),
  };
  for (let i in style) {
    totalBase.style[i] = style[i];
  }

  this.base = totalBase;
  this.totalContents.appendChild(totalBase);
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
    const getObj = GeneralJs.returnGet();
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

    if (getObj.type === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = "https://home-liaison.com";
      throw new Error("invaild query string");
    } else {

      const Generator = require("/generator.js");
      const generator = new Generator();
      const pages = await generator.generatePages(getObj.type);

      if (pages === null) {
        alert("잘못된 접근입니다!");
        window.location.href = "https://home-liaison.com";
        throw new Error("invaild query string");
      } else {

        this.ea = <%% "px", "px", "px", "px" %%>;
        this.pages = await pages.render();
        this.baseMaker();
        this.pageRender();
      }
    }
  } catch (e) {
    console.log(e);
  }
}
