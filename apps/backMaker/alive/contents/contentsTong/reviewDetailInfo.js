const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

class Photodae extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const ReviewDetailInfo = function (json) {
  let arr0;
  arr0 = new Photodae();
  for (let i of json.photodae) {
    arr0.push(i);
  }

  this.photodae = arr0;
  this.order = json.order;
}

ReviewDetailInfo.prototype.toNormal = function () {
  let obj = {};
  obj.photodae = this.photodae.toNormal();
  obj.order = this.order;

  return obj;
}

module.exports = ReviewDetailInfo;
