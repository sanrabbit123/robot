const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";

const Area = function (json) {
  this.value = json;
}

const Style = function (json) {
  this.value = json;
}

const Service = function (json) {
  this.value = json;
}

const Tech = function (json) {
  this.value = json;
}

const Make = function (json) {
  this.furniture = json.furniture;
  this.fabric = json.fabric;
}

const Availables = function (json) {
  this.area = new Area(json.area);
  this.style = new Style(json.style);
  this.service = new Service(json.service);
  this.tech = new Tech(json.tech);
  this.make = new Make(json.make);
}

const HomeLiaisonAnalytics = function (json) {
  this.personality = json.personality;
  this.grade = json.grade;
  this.reliability = json.reliability;
  this.availables = new Availables(json.availables);
}

module.exports = HomeLiaisonAnalytics;
