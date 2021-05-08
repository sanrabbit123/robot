const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/photoTong";

const PhotoDetail = function (json) {
  this.index = json.index;
  this.gs = json.gs;
}

PhotoDetail.prototype.toNormal = function () {
  let obj = {};
  obj.index = Number(this.index);
  obj.gs = this.gs;

  return obj;
}

class PhotoDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PhotoTong = function (json) {
  this.first = json.first;
  this.last = json.last;

  let arr, temp;
  arr = new PhotoDetails();
  for (let i of json.detail) {
    temp = new PhotoDetail(i);
    arr.push(temp);
  }
  this.detail = arr;
}

PhotoTong.prototype.toNormal = function () {
  let obj = {};
  obj.first = Number(this.first);
  obj.last = Number(this.last);
  obj.detail = this.detail.toNormal();

  return obj;
}

module.exports = PhotoTong;
