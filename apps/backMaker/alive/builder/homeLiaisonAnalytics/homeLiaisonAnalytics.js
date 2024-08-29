const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const BUILDER_DIR = process.cwd() + "/apps/backMaker/alive/builder";
const { Menu } = require(GENERAL_DIR + "/generator.js");

//construct

const AvailableFactor = function (json) {
  this.name = json.name;
}

AvailableFactor.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  return obj;
}

class Available extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new AvailableFactor(i));
    }
  }
  toNormal() {
    let obj;
    obj = [];
    for (let i of this) {
      obj.push(i.toNormal());
    }
    return obj;
  }
}

const ConstructAnalytics = function (json) {
  this.level = json.level;
  this.cost = json.cost;
  this.available = new Available(json.available);
}

ConstructAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.level = this.level;
  obj.cost = this.cost;
  obj.available = this.available.toNormal();
  return obj;
}


//region

const RegionAnalytics = function (json) {
  this.transportation = new Menu(json.transportation, [ "자동차", "대중교통" ], false);
  this.range = json.range;
  this.expenses = json.expenses;
}

RegionAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.transportation = this.transportation.toNormal();
  obj.range = this.range;
  obj.expenses = this.expenses;
  return obj;
}


//total

const HomeLiaisonAnalytics = function (json) {
  this.region = new RegionAnalytics(json.region);
  this.construct = new ConstructAnalytics(json.construct);
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.region = this.region.toNormal();
  obj.construct = this.construct.toNormal();
  return obj;
}

module.exports = HomeLiaisonAnalytics;
