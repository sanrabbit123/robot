const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const { Menu } = require(GENERAL_DIR + "/generator.js");


//etc

class AreaMatrixFactor extends Array {

  constructor(json) {
    super();
    for (let i of json) {
      this.push(i);
    }
  }

  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }

}

class AreaMatrix extends Array {

  constructor(json) {
    super();
    for (let arr of json) {
      this.push(new AreaMatrixFactor(arr));
    }
  }

  getStandards() {
    return {
      xValues: [
        "F",
        "S",
        "T",
        "XT"
      ],
      yValues: [
        "partial",
        "normal",
        "premium",
      ]
    };
  }

  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }

}

const PersonalityFactor = function (json) {
  this.name = json.name;
  this.value = json.value;
}

PersonalityFactor.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.value = this.value;
  return obj;
}

class Personality extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new PersonalityFactor(i));
    }
  }

  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const OperationBudget = function (json) {
  this.min = json.min;
  this.max = json.max;
}

OperationBudget.prototype.toNormal = function () {
  let obj = {};
  obj.min = this.min;
  obj.max = this.max;
  return obj;
}

const EtcAnalytics = function (json) {
  this.personality = new Personality(json.personality);
  this.relation = new Menu(json.relation, [
    "지속가능성 높음",
    "그냥 평범",
    "확인중",
    "좋지 않음"
  ], false);
}

EtcAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.personality = this.personality.toNormal();
  obj.relation = this.relation.toNormal();
  return obj;
}


//purchase

const PurchaseSetting = function (json) {
  this.install = json.install;
  this.storage = json.storage;
}

PurchaseSetting.prototype.toNormal = function () {
  let obj = {};
  obj.install = this.install;
  obj.storage = this.storage;
  return obj;
}

const PurchaseAnalytics = function (json) {
  this.agencies = json.agencies;
  this.setting = new PurchaseSetting(json.setting);
}

PurchaseAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.agencies = this.agencies;
  obj.setting = this.setting.toNormal();
  return obj;
}


//styling

const StylingFabric = function (json) {
  this.level = json.level;
  this.curtain = new Menu(json.curtain, [
    "업체 연결",
    "기성 제품 추천",
    "직접 제작"
  ], true);
  this.bedding = new Menu(json.bedding, [
    "업체 연결",
    "기성 제품 추천",
    "직접 제작"
  ], true);
}

StylingFabric.prototype.toNormal = function () {
  let obj = {};
  obj.level = this.level;
  obj.curtain = this.curtain.toNormal();
  obj.bedding = this.bedding.toNormal();
  return obj;
}

const StylingFurniture = function (json) {
  this.builtin = json.builtin;
  this.design = json.design;
  this.builtinDetail = new Menu(json.builtinDetail, [
    "도면",
    "3D",
    "AS 가능"
  ], true);
  this.designDetail = new Menu(json.designDetail, [
    "도면",
    "3D",
    "AS 가능"
  ], true);
}

StylingFurniture.prototype.toNormal = function () {
  let obj = {};
  obj.builtin = this.builtin;
  obj.design = this.design;
  obj.builtinDetail = this.builtinDetail.toNormal();
  obj.designDetail = this.designDetail.toNormal();
  return obj;
}

const TendencyDensity = function (json) {
  this.maximun = json.maximun;
  this.minimum = json.minimum;
}

TendencyDensity.prototype.toNormal = function () {
  let obj = {};
  obj.maximun = this.maximun;
  obj.minimum = this.minimum;
  return obj;
}

const TendencyColor = function (json) {
  this.darkWood = json.darkWood;
  this.whiteWood = json.whiteWood;
  this.highContrast = json.highContrast;
  this.vivid = json.vivid;
  this.white = json.white;
  this.mono = json.mono;
  this.bright = json.bright;
  this.dark = json.dark;
}

TendencyColor.prototype.toNormal = function () {
  let obj = {};
  obj.darkWood = this.darkWood;
  obj.whiteWood = this.whiteWood;
  obj.highContrast = this.highContrast;
  obj.vivid = this.vivid;
  obj.white = this.white;
  obj.mono = this.mono;
  obj.bright = this.bright;
  obj.dark = this.dark;
  return obj;
}

const TendencyTexture = function (json) {
  this.darkWood = json.darkWood;
  this.whiteWood = json.whiteWood;
  this.coating = json.coating;
  this.metal = json.metal;
}

TendencyTexture.prototype.toNormal = function () {
  let obj = {};
  obj.darkWood = this.darkWood;
  obj.whiteWood = this.whiteWood;
  obj.coating = this.coating;
  obj.metal = this.metal;
  return obj;
}

const TendencyStyle = function (json) {
  this.modern = json.modern;
  this.classic = json.classic;
  this.natural = json.natural;
  this.mixmatch = json.mixmatch;
  this.scandinavian = json.scandinavian;
  this.vintage = json.vintage;
  this.oriental = json.oriental;
  this.exotic = json.exotic;
}

TendencyStyle.prototype.toNormal = function () {
  let obj = {};
  obj.modern = this.modern;
  obj.classic = this.classic;
  obj.natural = this.natural;
  obj.mixmatch = this.mixmatch;
  obj.scandinavian = this.scandinavian;
  obj.vintage = this.vintage;
  obj.oriental = this.oriental;
  obj.exotic = this.exotic;
  return obj;
}

const StylingTendency = function (json) {
  this.style = new TendencyStyle(json.style);
  this.texture = new TendencyTexture(json.texture);
  this.color = new TendencyColor(json.color);
  this.density = new TendencyDensity(json.density);
}

StylingTendency.prototype.toNormal = function () {
  let obj = {};
  obj.style = this.style.toNormal();
  obj.texture = this.texture.toNormal();
  obj.color = this.color.toNormal();
  obj.density = this.density.toNormal();
  return obj;
}

StylingTendency.prototype.toMatrix = function (keymode = false) {
  const keys = [ "style", "texture", "color", "density" ];
  const keyArr = [
    [
      "modern",
      "classic",
      "natural",
      "mixmatch",
      "scandinavian",
      "vintage",
      "oriental",
      "exotic",
    ],
    [
      "darkWood",
      "whiteWood",
      "coating",
      "metal",
    ],
    [
      "darkWood",
      "whiteWood",
      "highContrast",
      "vivid",
      "white",
      "mono",
      "bright",
      "dark",
    ],
    [
      "maximun",
      "minimum",
    ]
  ];
  let result;
  result = [];
  for (let i = 0; i < keys.length; i++) {
    for (let key of keyArr[i]) {
      result.push(this[keys[i]][key]);
    }
  }
  if (keymode) {
    return keyArr.flat();
  } else {
    return result;
  }
}

const StylingAnalytics = function (json) {
  this.level = json.level;
  this.method = new Menu(json.method, [
    "순차 제안",
    "한번에 제안"
  ], false);
  this.tendency = new StylingTendency(json.tendency);
  this.furniture = new StylingFurniture(json.furniture);
  this.fabric = new StylingFabric(json.fabric);
}

StylingAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.level = this.level;
  obj.method = this.method.toNormal();
  obj.tendency = this.tendency.toNormal();
  obj.furniture = this.furniture.toNormal();
  obj.fabric = this.fabric.toNormal();
  return obj;
}


//construct

const ConstructCase = function (json) {
  this.name = json.name;
  this.contract = new Menu(json.contract, [
    "직접 계약, 직접 감리",
    "직접 계약, 외주 감리",
    "협업사 계약",
    "공정별 연결"
  ], true);
  this.possible = new Menu(json.possible, [
    "고객 시공사",
    "홈리에종 시공사",
    "디자이너 시공사",
  ], true);
}

ConstructCase.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.contract = this.contract.toNormal();
  obj.possible = this.possible.toNormal();
  return obj;
}

class ConstructCases extends Array {
  constructor(arr) {
    super();
    if (arr.length !== 3) {
      throw new Error("construct case must be 3 length array");
    }
    for (let i of arr) {
      this.push(new ConstructCase(i));
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const ConstructPossible = function (json) {
  this.supervision = json.supervision;
}

ConstructPossible.prototype.toNormal = function () {
  let obj = {};
  obj.supervision = this.supervision;
  return obj;
}

const ConstructAnalytics = function (json) {
  this.ability = json.ability;
  this.level = json.level;
  this.possible = new ConstructPossible(json.possible);
  this.case = new ConstructCases(json.case);
  this.partner = json.partner;
  this.partnerName = json.partnerName;
  this.own = json.own;
  this.ownName = json.ownName;
  this.range = json.range;
  this.major = json.major;
}

ConstructAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.ability = this.ability;
  obj.level = this.level;
  obj.possible = this.possible.toNormal();
  obj.case = this.case.toNormal();
  obj.partner = this.partner;
  obj.partnerName = this.partnerName;
  obj.own = this.own;
  obj.ownName = this.ownName;
  obj.range = this.range;
  obj.major = this.major;
  return obj;
}


//project

const ProjectTime = function (json) {
  this.first = json.first;
  this.entire = json.entire;
}

ProjectTime.prototype.toNormal = function () {
  let obj = {};
  obj.first = this.first;
  obj.entire = this.entire;
  return obj;
}

const ProjectAnalytics = function (json) {
  this.time = new ProjectTime(json.time);
  this.paperWork = new Menu(json.paperWork, [
    "도면",
    "3D",
    "컨셉 제안",
    "마감재 제안",
    "제품 리스트",
    "제품 이미지",
    "콜라주",
  ], true);
  this.cad = json.cad;
  this.collage = json.collage;
  this.modeling = json.modeling;
  this.online = json.online;
  this.living = json.living;
  this.partial = json.partial;
  this.matrix = new AreaMatrix(json.matrix);
  this.operationBudget = new OperationBudget(json.operationBudget);
}

ProjectAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.time = this.time.toNormal();
  obj.paperWork = this.paperWork.toNormal();
  obj.cad = this.cad;
  obj.collage = this.collage;
  obj.modeling = this.modeling;
  obj.online = this.online;
  obj.living = this.living;
  obj.partial = this.partial;
  obj.matrix = this.matrix.toNormal();
  obj.operationBudget = this.operationBudget.toNormal();
  return obj;
}


//region

const RegionAnalytics = function (json) {
  this.transportation = new Menu(json.transportation, [ "자동차", "대중교통" ], false);
  this.range = json.range;
  this.expenses = json.expenses;
  this.construct = json.construct;
}

RegionAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.transportation = this.transportation.toNormal();
  obj.range = this.range;
  obj.expenses = this.expenses;
  obj.construct = this.construct;
  return obj;
}

const PersonalityAnalytics = function (json) {
  this.operation = json.operation;
  this.design = json.design;
  this.efficient = json.efficient;
  this.communication = json.communication;
  this.homeliaison = json.homeliaison;
}

PersonalityAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.operation = this.operation;
  obj.design = this.design;
  obj.efficient = this.efficient;
  obj.communication = this.communication;
  obj.homeliaison = this.homeliaison;
  return obj;
}


//total

const HomeLiaisonAnalytics = function (json) {
  this.region = new RegionAnalytics(json.region);
  this.project = new ProjectAnalytics(json.project);
  this.construct = new ConstructAnalytics(json.construct);
  this.styling = new StylingAnalytics(json.styling);
  this.purchase = new PurchaseAnalytics(json.purchase);
  this.etc = new EtcAnalytics(json.etc);
  this.personality = new PersonalityAnalytics(json.personality);
  this.grade = json.grade;
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.region = this.region.toNormal();
  obj.project = this.project.toNormal();
  obj.construct = this.construct.toNormal();
  obj.styling = this.styling.toNormal();
  obj.purchase = this.purchase.toNormal();
  obj.etc = this.etc.toNormal();
  obj.personality = this.personality.toNormal();
  obj.grade = this.grade;
  return obj;
}

module.exports = HomeLiaisonAnalytics;
