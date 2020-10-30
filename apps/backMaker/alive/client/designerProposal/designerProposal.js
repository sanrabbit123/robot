const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/designerProposal/module";

const DesignerProposal = function (proposal) {
  this.proid = proposal.proid;
}

DesignerProposal.prototype.toNormal = function () {
  let obj = {};
  obj.proid = this.proid;
  return obj;
}

module.exports = DesignerProposal;
