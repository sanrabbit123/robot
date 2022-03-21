const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

const TendencyDensity = function (json) {
  this.maximun = json.maximun;
  this.minimum = json.minimum;
}

TendencyDensity.prototype.toNormal = function () {
  let obj = {};
  obj.maximun = this.maximun;
  obj.minimum = this.minimum;
  return obj;
}

const TendencyColor = function (json) {
  this.darkWood = json.darkWood;
  this.whiteWood = json.whiteWood;
  this.highContrast = json.highContrast;
  this.vivid = json.vivid;
  this.white = json.white;
  this.mono = json.mono;
  this.bright = json.bright;
  this.dark = json.dark;
}

TendencyColor.prototype.toNormal = function () {
  let obj = {};
  obj.darkWood = this.darkWood;
  obj.whiteWood = this.whiteWood;
  obj.highContrast = this.highContrast;
  obj.vivid = this.vivid;
  obj.white = this.white;
  obj.mono = this.mono;
  obj.bright = this.bright;
  obj.dark = this.dark;
  return obj;
}

const TendencyTexture = function (json) {
  this.darkWood = json.darkWood;
  this.whiteWood = json.whiteWood;
  this.coating = json.coating;
  this.metal = json.metal;
}

TendencyTexture.prototype.toNormal = function () {
  let obj = {};
  obj.darkWood = this.darkWood;
  obj.whiteWood = this.whiteWood;
  obj.coating = this.coating;
  obj.metal = this.metal;
  return obj;
}

const TendencyStyle = function (json) {
  this.modern = json.modern;
  this.classic = json.classic;
  this.natural = json.natural;
  this.mixmatch = json.mixmatch;
  this.scandinavian = json.scandinavian;
  this.vintage = json.vintage;
  this.oriental = json.oriental;
  this.exotic = json.exotic;
}

TendencyStyle.prototype.toNormal = function () {
  let obj = {};
  obj.modern = this.modern;
  obj.classic = this.classic;
  obj.natural = this.natural;
  obj.mixmatch = this.mixmatch;
  obj.scandinavian = this.scandinavian;
  obj.vintage = this.vintage;
  obj.oriental = this.oriental;
  obj.exotic = this.exotic;
  return obj;
}

const StylingTendency = function (json) {
  this.style = new TendencyStyle(json.style);
  this.texture = new TendencyTexture(json.texture);
  this.color = new TendencyColor(json.color);
  this.density = new TendencyDensity(json.density);
}

StylingTendency.prototype.toNormal = function () {
  let obj = {};
  obj.style = this.style.toNormal();
  obj.texture = this.texture.toNormal();
  obj.color = this.color.toNormal();
  obj.density = this.density.toNormal();
  return obj;
}

StylingTendency.prototype.toMatrix = function () {
  const keys = [ "style", "texture", "color", "density" ];
  const keyArr = [
    [
      'modern',
      'classic',
      'natural',
      'mixmatch',
      'scandinavian',
      'vintage',
      'oriental',
      'exotic'
    ],
    [ 'darkWood', 'whiteWood', 'coating', 'metal' ],
    [
      'darkWood',
      'whiteWood',
      'highContrast',
      'vivid',
      'white',
      'mono',
      'bright',
      'dark'
    ],
    [ 'maximun', 'minimum' ]
  ];
  let result;
  result = [];
  for (let i = 0; i < keys.length; i++) {
    for (let key of keyArr[i]) {
      result.push(this[keys[i]][key]);
    }
  }
  return result;
}

class Photodae extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const Photosg = function (json) {
  this.first = Number(json.first);
  this.last = Number(json.last);
}

Photosg.prototype.toNormal = function () {
  let obj = {};
  obj.first = Number(this.first);
  obj.last = Number(this.last);

  return obj;
}

class Slide extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class Tag extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const Sort = function (json) {
  this.key8 = json.key8;
  this.key9 = json.key9;
}

Sort.prototype.toNormal = function () {
  let obj = {};
  obj.key8 = this.key8;
  obj.key9 = this.key9;

  return obj;
}

const PorfolioDetailInfo = function (json) {
  let arr0, arr1, arr2;

  arr0 = new Photodae();
  arr1 = new Slide();
  arr2 = new Tag();

  for (let i of json.photodae) {
    arr0.push(i);
  }
  for (let i of json.slide) {
    arr1.push(i);
  }
  for (let i of json.tag) {
    arr2.push(i);
  }

  this.photodae = arr0;
  this.photosg = new Photosg(json.photosg);
  this.slide = arr1;
  this.tag = arr2;
  this.service = json.service;
  this.sort = new Sort(json.sort);
  this.tendency = new StylingTendency(json.tendency);
}

PorfolioDetailInfo.prototype.toNormal = function () {
  let obj = {};
  obj.photodae = this.photodae.toNormal();
  obj.photosg = this.photosg.toNormal();
  obj.slide = this.slide.toNormal();
  obj.tag = this.tag.toNormal();
  obj.service = this.service;
  obj.sort = this.sort.toNormal();
  obj.tendency = this.tendency.toNormal();
  return obj;
}

module.exports = PorfolioDetailInfo;
