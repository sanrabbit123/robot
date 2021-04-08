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
  this.whiteBox = null;
  this.contentsBox = null;
  this.margin = 0;
  this.mode = "desktop";
  this.sero = false;
  this.totalContents = document.getElementById("totalcontents");
}

PageBlockJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

    const Generator = require("/index.js");
    const app = new Generator();
    await app.sayHello();





  } catch (e) {
    console.log(e);
  }
}
