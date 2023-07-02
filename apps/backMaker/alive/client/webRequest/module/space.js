const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const THIS_DIR = CLIENT_DIR + "/webRequest/module";
const { Menu, Address } = require(GENERAL_DIR + "/generator.js");
const Pyeong = require(THIS_DIR + "/pyeong.js");
const SpaceSpec = require(THIS_DIR + "/spaceSpec.js");
const Resident = require(THIS_DIR + "/resident.js");

const Partial = function (json) {
  this.boo = json.boo;
  this.pyeong = new Pyeong(json.pyeong);
  this.detail = json.detail;
}

Partial.prototype.toNormal = function () {
  let obj = {};
  obj.boo = this.boo;
  obj.pyeong = this.pyeong.toNormal();
  obj.detail = this.detail;
  return obj;
}

const Space = function (space) {
  this.address = new Address(space.address);
  this.contract = new Menu(space.contract, [ '전월세', '자가' ], false);
  this.pyeong = new Pyeong(space.pyeong);
  this.naver = space.naver;
  this.spec = new SpaceSpec(space.spec);
  this.resident = new Resident(space.resident);
  this.partial = new Partial(space.partial);
}

Space.prototype.toNormal = function () {
  let obj = {};
  obj.address = this.address.toNormal();
  obj.contract = this.contract.toNormal();
  obj.pyeong = this.pyeong.toNormal();
  obj.naver = this.naver;
  obj.spec = this.spec.toNormal();
  obj.resident = this.resident.toNormal();
  obj.partial = this.partial.toNormal();
  return obj;
}

module.exports = Space;
