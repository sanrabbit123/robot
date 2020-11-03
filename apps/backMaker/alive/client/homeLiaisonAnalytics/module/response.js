const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { Menu } = require(GENERAL_DIR + "/generator.js");

const Response = function (response) {
  this.status = new Menu(response.status, [ '드랍', '진행', '응대중', '완료' ], false);
  this.outreason = new Menu(response.outreason, [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ], true);
}

Response.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.outreason = this.outreason.toNormal();
  return obj;
}

module.exports = Response;
