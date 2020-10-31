const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const Designer_DIR = process.cwd() + "/apps/backMaker/alive/designer";

const DesignerInformation = function (json) {
  this.contract = new Contract(json.contract);
  this.phone = json.phone;
  this.email = json.email;
  this.address
  this.personalSystem = new PersonalSystem(json.personalSystem);
  this.business = new Business(json.personalSystem);
}

module.exports = DesignerInformation;
