const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const THIS_DIR = CLIENT_DIR + "/webRequest/module";
const { Menu, Address } = require(GENERAL_DIR + "/generator.js");
const Pyeong = require(THIS_DIR + "/pyeong.js");
const SpaceSpec = require(THIS_DIR + "/spaceSpec.js");
const Resident = require(THIS_DIR + "/resident.js");

class Space {
  constructor(_space) {
    this.rawSpace = _space;
  }

  toAlive() {
    this.address = new Address(this.rawSpace.address);
    this.contract = new Menu(this.rawSpace.contract, [ '전월세', '자가' ], false);
    this.pyeong = new Pyeong(this.rawSpace.pyeong);
    this.spec = new SpaceSpec(this.rawSpace.spec);
    this.resident = new Resident(this.rawSpace.resident);

    delete this.rawSpace;
  }

  toNormal() {
    let obj = {};
    obj.address = this.address.toNormal();
    obj.contract = this.contract.toNormal();
    obj.pyeong = this.pyeong.toNormal();
    obj.spec = this.spec.toNormal();
    obj.resident = this.resident.toNormal();
    return obj;
  }

}

module.exports = Space;
