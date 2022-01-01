const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";

class Period extends Number {
  constructor(num) {
    super(num);
    this.value = num;
  }
  toNormal() {
    return Number(this.value);
  }
}

class CoordinatesX extends Array {
  constructor(json) {
    super();
    this.push('M');
    this.push('B');
    this.push('P');
    this.M = json.M;
    this.B = json.B;
    this.P = json.P;
  }
  toNormal() {
    return {
      M: this.M,
      B: this.B,
      P: this.P
    };
  }
}

class CoordinatesY extends Array {
  constructor(json) {
    super();
    this.push("homeFurnishing");
    this.push("homeStyling");
    this.push("totalStyling");
    this.push("extraStyling");
    this.homeFurnishing = json.homeFurnishing;
    this.homeStyling = json.homeStyling;
    this.totalStyling = json.totalStyling;
    this.extraStyling = json.extraStyling;
  }
  toNormal() {
    return {
      homeFurnishing: this.homeFurnishing,
      homeStyling: this.homeStyling,
      totalStyling: this.totalStyling,
      extraStyling: this.extraStyling
    };
  }
}

class CoordinatesZ extends Array {
  constructor(json) {
    super();
    this.push("online");
    this.push("offline");
    this.online = json.online;
    this.offline = json.offline;
  }
  toNormal() {
    return {
      online: this.online,
      offline: this.offline,
    };
  }
}

const Coordinates = function (json) {
  this.x = new CoordinatesX(json.x);
  this.y = new CoordinatesY(json.y);
  this.z = new CoordinatesZ(json.z);
}

Coordinates.prototype.toNormal = function () {
  let obj = {};
  obj.x = this.x.toNormal();
  obj.y = this.y.toNormal();
  obj.z = this.z.toNormal();
  return obj;
}

const ScheduleTask = function (json) {
  this.title = json.title;
  this.description = json.description;
  this.color = json.color;
  this.period = json.period;
}

ScheduleTask.prototype.toNormal = function () {
  let obj = {};
  obj.title = this.title;
  obj.description = this.description;
  obj.color = this.color;
  obj.period = this.period;
  return obj;
}

class Schedule extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new ScheduleTask(i));
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

const CoreSetting = function (json) {
  this.coordinates = new Coordinates(json.coordinates);
  this.period = new Period(json.period);
  this.schedule = new Schedule(json.schedule);
}

CoreSetting.prototype.toNormal = function () {
  let obj;
  obj = {};
  obj.coordinates = this.coordinates.toNormal();
  obj.period = this.period.toNormal();
  obj.schedule = this.schedule.toNormal();
  return obj;
}

module.exports = CoreSetting;
