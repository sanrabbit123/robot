const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const THIS_DIR = CLIENT_DIR + "/webRequest/module";
const { Menu, Address } = require(GENERAL_DIR + "/generator.js");
const Pyeong = require(THIS_DIR + "/pyeong.js");
const SpaceSpec = require(THIS_DIR + "/spaceSpec.js");
const Resident = require(THIS_DIR + "/resident.js");

const Space = function (space) {
  this.address = new Address(space.address);
  this.contract = new Menu(space.contract, [ '전월세', '자가' ], false);
  this.pyeong = new Pyeong(space.pyeong);
  this.spec = new SpaceSpec(space.spec);
  this.resident = new Resident(space.resident);
}

Space.prototype.toNormal = function () {
  let obj = {};
  obj.address = this.address.toNormal();
  obj.contract = this.contract.toNormal();
  obj.pyeong = this.pyeong.toNormal();
  obj.spec = this.spec.toNormal();
  obj.resident = this.resident.toNormal();
  return obj;
}

module.exports = Space;
