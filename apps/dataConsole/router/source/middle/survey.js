/<%patch%>/ {
  "entire": false,
  "client": false,
  "designer": true,
  "project": false,
  "contents": false,
  "service": false,
  "photo": false
} %/%/g

const /<%name%>/Js = function () {
  this.mother = new GeneralJs();
};

/<%name%>/Js.prototype.grayBase = function () {
  const instance = this;
  let div_clone;
  let whiteBox;
  let style;
  let ea;
  let margin;

  div_clone = GeneralJs.nodes.div.cloneNode();
  style = {
    position: "absolute",
    width: String(100) + '%',
    height: String(100) + '%',
    background: GeneralJs.colorChip.gray1,
  }
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  this.totalContents.appendChild(div_clone);


  whiteBox = GeneralJs.nodes.div.cloneNode();
  style = {
    position: "absolute",
    width: String(100) + '%',
    height: String(100) + '%',
    background: GeneralJs.colorChip.gray1,
  }
  for (let i in style) {
    whiteBox.style[i] = style[i];
  }

  this.totalContents.appendChild(whiteBox);
};

/<%name%>/Js.prototype.launching = async function (loading) {
  const instance = this;
  try {
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);
    this.totalContents = document.getElementById("totalcontents");

    this.grayBase();

  } catch (e) {
    console.log(e);
  }
};
