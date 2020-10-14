const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/designerProposal/module";

class DesignerProposal {

  constructor(proposal) {
    this.raw = proposal;
  }

  toAlive() {
    this.proid = this.raw.proid;
    delete this.raw;
  }

  toNormal() {
    let obj = {};
    obj.proid = this.proid;
    return obj;
  }

}

module.exports = DesignerProposal;
