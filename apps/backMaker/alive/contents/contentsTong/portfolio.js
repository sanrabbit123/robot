const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const PorfolioDetailInfo = require(CONTENTS_MODULE_DIR + "/porfolioDetailInfo.js");
const PorfolioContents = require(CONTENTS_MODULE_DIR + "/porfolioContents.js");

const SpaceInfo = function (json) {
  this.space = json.space;
  this.pyeong = Number(json.pyeong);
  this.region = json.region;
  this.method = json.method;
  this.budget = json.budget;
}

SpaceInfo.prototype.toNormal = function () {
  let obj = {};
  obj.space = this.space;
  obj.pyeong = Number(this.pyeong);
  obj.region = this.region;
  obj.method = this.method;
  obj.budget = this.budget;
  return obj;
}

const Title = function (json) {
  this.main = json.main;
  this.sub = json.sub;
}

Title.prototype.toNormal = function () {
  let obj = {};
  obj.main = this.main;
  obj.sub = this.sub;

  return obj;
}

Title.prototype.getAllCases = function () {
  let obj = {};
  let tempArr, tempArr2, temp, tempResult;
  let pyIndex;

  obj.main = [];
  obj.main.push(this.main);
  obj.main.push(this.main.replace(/, /, "\n"));

  tempArr = this.main.split(", ");
  obj.main.push(tempArr[1]);

  tempArr2 = tempArr[1].split(" ");
  pyIndex = 0;
  for (let i = 0; i < tempArr2.length; i++) {
    if (/py/gi.test(tempArr2[i])) {
      pyIndex = i;
    }
  }

  tempResult = '';
  temp = '';
  for (let i = 0; i < pyIndex; i++) {
    temp += tempArr2[i] + ' ';
  }
  tempResult = temp.slice(0, -1);

  temp = '';
  for (let i = pyIndex; i < tempArr2.length; i++) {
    temp += tempArr2[i] + ' ';
  }
  tempResult = tempResult + "\n" + temp.slice(0, -1);
  obj.main.push(tempResult);

  obj.sub = [];
  obj.sub.push(this.sub);
  obj.sub.push(this.sub.replace(/, /, "\n"));

  return obj;
}

const Color = function (json) {
  this.main = json.main;
  this.sub = json.sub;
  this.title = json.title;
}

Color.prototype.toNormal = function () {
  let obj = {};
  obj.main = this.main;
  obj.sub = this.sub;
  obj.title = this.title;

  return obj;
}

const Porfolio = function (json) {
  this.pid = json.pid;
  this.date = new DateParse(json.date);
  this.spaceInfo = new SpaceInfo(json.spaceInfo);
  this.title = new Title(json.title);
  this.color = new Color(json.color);
  this.detailInfo = new PorfolioDetailInfo(json.detailInfo);
  this.contents = new PorfolioContents(json.contents);
}

Porfolio.prototype.toNormal = function () {
  let obj = {};
  obj.pid = this.pid;
  obj.date = this.date.toNormal();
  obj.spaceInfo = this.spaceInfo.toNormal();
  obj.title = this.title.toNormal();
  obj.color = this.color.toNormal();
  obj.detailInfo = this.detailInfo.toNormal();
  obj.contents = this.contents.toNormal();

  return obj;
}

Porfolio.prototype.keyMatrix = function () {
  return this.contents.keyMatrix();
}

module.exports = Porfolio;
