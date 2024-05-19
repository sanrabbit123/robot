const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const DesignerInformation = require(DESIGNER_DIR + "/designerInformation/designerInformation.js");
const HomeLiaisonAnalytics = require(DESIGNER_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");
const DesignerRealTime = require(DESIGNER_DIR + "/designerRealTime/designerRealTime.js");
const DesignerSetting = require(DESIGNER_DIR + "/designerSetting/designerSetting.js");

const Designer = function (json) {
  this.designer = json.designer;
  this.desid = json.desid;
  this.information = new DesignerInformation(json.information);
  this.analytics = new HomeLiaisonAnalytics(json.analytics);
  this.realTime = new DesignerRealTime(json.realTime);
  this.setting = new DesignerSetting(json.setting);
}

Designer.prototype.toNormal = function () {
  let obj = {};
  obj.designer = this.designer;
  obj.desid = this.desid;
  obj.information = this.information.toNormal();
  obj.analytics = this.analytics.toNormal();
  obj.realTime = this.realTime.toNormal();
  obj.setting = this.setting.toNormal();
  return obj;
}

Designer.prototype.frontMode = function () {
  let obj = {};
  obj.designer = this.designer;
  obj.desid = this.desid;
  obj.information = {};
  obj.information.contract = this.information.contract.toNormal();
  obj.information.business = this.information.business.toNormal();
  obj.analytics = {};
  obj.analytics.grade = this.analytics.grade;
  obj.analytics.project = {};
  obj.analytics.project.matrix = this.analytics.project.matrix.toNormal();
  obj.setting = {};
  obj.setting.front = this.setting.front.toNormal();
  obj.setting.description = this.setting.description;
  obj.service = this.analytics.project.matrix.toNormal().map((arr) => { return (arr.some((i) => { return i === 1 }) ? 1 : 0) });
  obj.tag = [];
  obj.tag.push(this.designer);
  obj.tag.push(this.desid);

  const tendencyStandards = [
    { column: "classic", name: "클래식" },
    { column: "exotic", name: "엑조틱" },
    { column: "mixmatch", name: "믹스매치" },
    { column: "modern", name: "모던" },
    { column: "natural", name: "내추럴" },
    { column: "oriental", name: "동양" },
    { column: "scandinavian", name: "북유럽" },
    { column: "vintage", name: "빈티지" }
  ];

  for (let o of tendencyStandards) {
    o.value = this.analytics.styling.tendency.style[o["column"]];
  }
  tendencyStandards.sort((a, b) => { return b.value - a.value });
  obj.styleTendency = tendencyStandards;

  if (this.analytics.project.online) {
    obj.tag.push("온라인");
  }
  if (this.analytics.project.living) {
    obj.tag.push("거주중");
  }
  obj.tag = obj.tag.concat(this.analytics.project.paperWork.toNormal());
  if (this.analytics.styling.furniture.builtin) {
    obj.tag.push("붙박이장");
    obj.tag.push("빌트인");
    obj.tag.push("장");
  }
  if (this.analytics.styling.furniture.design) {
    obj.tag.push("제작가구");
    obj.tag.push("가구");
    obj.tag.push("제작");
    obj.tag.push("제작 가구");
    obj.tag.push("디자인가구");
    obj.tag.push("디자인 가구");
  }
  if (this.analytics.styling.fabric.curtain.toNormal().includes("직접 제작") || this.analytics.styling.fabric.bedding.toNormal().includes("직접 제작")) {
    obj.tag.push("패브릭");
    obj.tag.push("패브릭 제작");
    obj.tag.push("패브릭제작");
    obj.tag.push("제작 패브릭");
    obj.tag.push("제작패브릭");
  }



  return obj;
}

module.exports = Designer;
