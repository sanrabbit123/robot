const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";

const ChecklistChildrenFactor = function (json) {
  this.title = json.title;
  this.contents = json.contents;
}

ChecklistChildrenFactor.prototype.toNormal = function () {
  let obj = {};
  obj.title = this.title;
  obj.contents = this.contents;
  return obj;
}

class ChecklistChildren extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new ChecklistChildrenFactor(obj));
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

const ChecklistFactor = function (json) {
  this.title = json.title;
  this.children = new ChecklistChildren(json.children);
}

ChecklistFactor.prototype.toNormal = function () {
  let obj = {};
  obj.title = this.title;
  obj.children = this.children.toNormal();
  return obj;
}

class Checklist extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new ChecklistFactor(obj));
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

const ChecklistContents = function (json) {
  this.title = json.title;
  this.checklist = new Checklist(json.checklist);
}

ChecklistContents.prototype.toNormal = function () {
  let obj = {};
  obj.title = this.title;
  obj.checklist = this.checklist.toNormal();
  return obj;
}

class Action extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
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

const ChecklistTarget = function (json) {
  this.collection = json.collection;
  this.action = new Action(json.action);
}

ChecklistTarget.prototype.toNormal = function () {
  let obj = {};
  obj.collection = this.collection;
  obj.action = this.action.toNormal();
  return obj;
}

const ChecklistSetting = function (json) {
  this.target = new ChecklistTarget(json.target);
  this.contents = new ChecklistContents(json.contents);
}

ChecklistSetting.prototype.toNormal = function () {
  let obj;
  obj = {};
  obj.target = this.target.toNormal();
  obj.contents = this.contents.toNormal();
  return obj;
}

module.exports = ChecklistSetting;
