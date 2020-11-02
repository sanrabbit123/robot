const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";

const Area = function (json) {
  this.value = json;
}

Area.prototype.toNormal = function () {
  return this.value;
}

const Style = function (json) {
  this.value = json;
}

Style.prototype.toNormal = function () {
  return this.value;
}

const Service = function (json) {
  this.value = json;
}

Service.prototype.toNormal = function () {
  return this.value;
}

const Tech = function (json) {
  this.value = json;
}

Tech.prototype.toNormal = function () {
  return this.value;
}

const Make = function (json) {
  this.furniture = json.furniture;
  this.fabric = json.fabric;
}

Make.prototype.toNormal = function () {
  let obj = {};
  obj.furniture = this.furniture;
  obj.fabric = this.fabric;
  return obj;
}

const Availables = function (json) {
  this.area = new Area(json.area);
  this.style = new Style(json.style);
  this.service = new Service(json.service);
  this.tech = new Tech(json.tech);
  this.make = new Make(json.make);
}

Availables.prototype.toNormal = function () {
  let obj = {};
  obj.area = this.area.toNormal();
  obj.style = this.style.toNormal();
  obj.service = this.service.toNormal();
  obj.tech = this.tech.toNormal();
  obj.make = this.make.toNormal();
  return obj;
}

const HomeLiaisonAnalytics = function (json) {
  this.personality = json.personality;
  this.grade = json.grade;
  this.reliability = json.reliability;
  this.availables = new Availables(json.availables);
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.personality = this.personality;
  obj.grade = this.grade;
  obj.reliability = this.reliability;
  obj.availables = this.availables.toNormal();
  return obj;
}

module.exports = HomeLiaisonAnalytics;
