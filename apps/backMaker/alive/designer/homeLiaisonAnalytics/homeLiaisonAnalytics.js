const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const { Menu } = require(GENERAL_DIR + "/generator.js");


//etc

class AreaMatrixFactorY extends Array {

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

class AreaMatrixFactorX extends Array {

  constructor(json) {
    super();
    for (let arr of json) {
      this.push(new AreaMatrixFactorY(arr));
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

class AreaMatrix extends Array {

  constructor(json) {
    super();
    for (let arr of json) {
      this.push(new AreaMatrixFactorX(arr));
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
        "B",
        "N"
      ],
      zValues: [
        "premium",
        "normal"
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

const Personality = function (json) {
  this.fast = json.fast;
  this.careful = json.careful;
  this.lead = json.lead;
}

Personality.prototype.toNormal = function () {
  let obj = {};
  obj.fast = this.fast;
  obj.careful = this.careful;
  obj.lead = this.lead;
  return obj;
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
  this.matrix = new AreaMatrix(json.matrix);
  this.operationBudget = new OperationBudget(json.operationBudget);
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
  obj.matrix = this.matrix.toNormal();
  obj.operationBudget = this.operationBudget.toNormal();
  obj.personality = this.personality.toNormal();
  obj.relation = this.relation.toNormal();
  return obj;
}


//purchase

const PurchaseSetting = function (json) {
  this.takeIn = json.takeIn;
  this.install = json.install;
  this.storage = json.storage;
  this.detail = new Menu(json.detail, [
    "세팅맨 연계",
    "무료 지원",
    "해당 없음"
  ], false);
}

PurchaseSetting.prototype.toNormal = function () {
  let obj = {};
  obj.takeIn = this.takeIn;
  obj.install = this.install;
  obj.storage = this.storage;
  obj.detail = this.detail.toNormal();
  return obj;
}

const PurchaseAgencies = function (json) {
  this.boo = json.boo;
  this.fee = json.fee;
}

PurchaseAgencies.prototype.toNormal = function () {
  let obj = {};
  obj.boo = this.boo;
  obj.fee = this.fee;
  return obj;
}

const PurchaseAnalytics = function (json) {
  this.agencies = new PurchaseAgencies(json.agencies);
  this.setting = new PurchaseSetting(json.setting);
  this.detail = json.detail;
}

PurchaseAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.agencies = this.agencies.toNormal();
  obj.setting = this.setting.toNormal();
  obj.detail = this.detail;
  return obj;
}


//styling

const StylingFabric = function (json) {
  this.manufacture = json.manufacture;
  this.method = new Menu(json.method, [
    "업체 연결",
    "기성 제품 추천",
    "직접 제작"
  ], false);
}

StylingFabric.prototype.toNormal = function () {
  let obj = {};
  obj.manufacture = this.manufacture;
  obj.method = this.method.toNormal();
  return obj;
}

const StylingFurniture = function (json) {
  this.builtin = json.builtin;
  this.design = json.design;
}

StylingFurniture.prototype.toNormal = function () {
  let obj = {};
  obj.builtin = this.builtin;
  obj.design = this.design;
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
}

TendencyColor.prototype.toNormal = function () {
  let obj = {};
  obj.darkWood = this.darkWood;
  obj.whiteWood = this.whiteWood;
  obj.highContrast = this.highContrast;
  obj.vivid = this.vivid;
  obj.white = this.white;
  obj.mono = this.mono;
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

const ConstructContract = function (json) {
  this.method = new Menu(json.method, [
    "직접 계약, 직접 감리",
    "직접 계약, 외주 감리",
    "협업사 계약",
    "공정별 연결"
  ], false);
  this.othersFinishing = new Menu(json.othersFinishing, [
    "톤만 제안",
    "시공사 마감재풀 내 선택",
    "별도로 마감재 선택",
    "해당 없음"
  ], false);
  this.communication = json.communication;
}

ConstructContract.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method.toNormal();
  obj.othersFinishing = this.othersFinishing.toNormal();
  obj.communication = this.communication;
  return obj;
}

const ConstructPossible = function (json) {
  this.supervision = json.supervision;
  this.partialSupervision = json.partialSupervision;
  this.others = json.others;
}

ConstructPossible.prototype.toNormal = function () {
  let obj = {};
  obj.supervision = this.supervision;
  obj.partialSupervision = this.partialSupervision;
  obj.others = this.others;
  return obj;
}

const ConstructAnalytics = function (json) {
  this.level = json.level;
  this.possible = new ConstructPossible(json.possible);
  this.contract = new ConstructContract(json.contract);
}

ConstructAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.level = this.level;
  obj.possible = this.possible.toNormal();
  obj.contract = this.contract.toNormal();
  return obj;
}


//project

const ProjectRetouch = function (json) {
  this.partial = json.partial;
  this.entire = json.entire;
}

ProjectRetouch.prototype.toNormal = function () {
  let obj = {};
  obj.partial = this.partial;
  obj.entire = this.entire;
  return obj;
}

const ProjectCommunication = function (json) {
  this.method = new Menu(json.method, [ "대면", "비대면" ], false);
  this.count = json.count;
}

ProjectCommunication.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method.toNormal();
  obj.count = this.count;
  return obj;
}

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

const ProjectBudget = function (json) {
  this.resultOffer = json.resultOffer;
  this.method = new Menu(json.method, [ "문서", "구두", "제안 없음" ], false);
}

ProjectBudget.prototype.toNormal = function () {
  let obj = {};
  obj.resultOffer = this.resultOffer;
  obj.method = this.method.toNormal();
  return obj;
}

const ProjectAnalytics = function (json) {
  this.index = json.index;
  this.budget = new ProjectBudget(json.budget);
  this.time = new ProjectTime(json.time);
  this.paperWork = new Menu(json.paperWork, [
    "도면",
    "3D",
    "컨셉 보드",
    "제품 리스트",
    "참고 이미지",
    "비정형 손메모",
    "구두 설명",
  ], true);
  this.communication = new ProjectCommunication(json.communication);
  this.retouch = new ProjectRetouch(json.retouch);
}

ProjectAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.index = this.index;
  obj.budget = this.budget.toNormal();
  obj.time = this.time.toNormal();
  obj.paperWork = this.paperWork.toNormal();
  obj.communication = this.communication.toNormal();
  obj.retouch = this.retouch.toNormal();
  return obj;
}


//meeting

const MeetingMeasure = function (json) {
  this.direct = json.direct;
  this.furniture = json.furniture;
}

MeetingMeasure.prototype.toNormal = function () {
  let obj = {};
  obj.direct = this.direct;
  obj.furniture = this.furniture;
  return obj;
}

const MeetingAnalytics = function (json) {
  this.measure = new MeetingMeasure(json.measure);
  this.team = json.team;
  this.style = new Menu(json.style, [ "철저한 준비", "일단 가서 체크" ], false);
}

MeetingAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.measure = this.measure.toNormal();
  obj.team = this.team;
  obj.style = this.style.toNormal();
  return obj;
}


//region

const TransportationExpensesUnit = function (json) {
  this.boo = json.boo;
  this.amount = json.amount;
}

TransportationExpensesUnit.prototype.toNormal = function () {
  let obj = {};
  obj.boo = this.boo;
  obj.amount = this.amount;
  return obj;
}

const TransportationExpensesActual = function (json) {
  this.boo = json.boo;
}

TransportationExpensesActual.prototype.toNormal = function () {
  let obj = {};
  obj.boo = this.boo;
  return obj;
}

const TransportationExpenses = function (json) {
  this.actual = new TransportationExpensesActual(json.actual);
  this.unit = new TransportationExpensesUnit(json.unit);
}

TransportationExpenses.prototype.toNormal = function () {
  let obj = {};
  obj.actual = this.actual.toNormal();
  obj.unit = this.unit.toNormal();
  return obj;
}

const Transportation = function (json) {
  this.method = new Menu(json.method, [ "자동차", "대중교통" ], false);
  this.expenses = new TransportationExpenses(json.expenses);
}

Transportation.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method.toNormal();
  obj.expenses = this.expenses.toNormal();
  return obj;
}

const RegionAnalytics = function (json) {
  this.available = new Menu(json.available, [
    "서울",
    "인천",
    "경기",
    "강원",
    "충청",
    "대전",
    "세종",
    "전라",
    "경상",
    "제주",
    "부산",
    "대구",
    "울산",
    "광주"
  ], true);
  this.transportation = new Transportation(json.transportation);
}

RegionAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.available = this.available.toNormal();
  obj.transportation = this.transportation.toNormal();
  return obj;
}


//total

const HomeLiaisonAnalytics = function (json) {
  this.region = new RegionAnalytics(json.region);
  this.meeting = new MeetingAnalytics(json.meeting);
  this.project = new ProjectAnalytics(json.project);
  this.construct = new ConstructAnalytics(json.construct);
  this.styling = new StylingAnalytics(json.styling);
  this.purchase = new PurchaseAnalytics(json.purchase);
  this.etc = new EtcAnalytics(json.etc);
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.region = this.region.toNormal();
  obj.meeting = this.meeting.toNormal();
  obj.project = this.project.toNormal();
  obj.construct = this.construct.toNormal();
  obj.styling = this.styling.toNormal();
  obj.purchase = this.purchase.toNormal();
  obj.etc = this.etc.toNormal();
  return obj;
}

module.exports = HomeLiaisonAnalytics;
