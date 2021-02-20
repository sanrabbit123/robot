const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { Menu } = require(GENERAL_DIR + "/generator.js");

const Response = function (response) {
  const actionList = [
    "1차 응대 예정",
    "1차 응대후 대기",
    "제안 발송 예정",
    "제안 피드백 대기",
    "제안 피드백 완료",
    "연결 안 됨",
    "계약금 입금",
    "계약서 서명",
    "잔금 입금",
    "응대 종료"
  ];
  this.status = new Menu(response.status, [ '드랍', '진행', '응대중', '완료', '장기' ], false);
  this.action = new Menu(response.action, actionList, false);
  this.outreason = new Menu(response.outreason, [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ], true);
  this.outspot = new Menu(response.outspot, actionList, false);
  this.kakao = response.kakao;
}

Response.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.action = this.action.toNormal();
  obj.outreason = this.outreason.toNormal();
  obj.outspot = this.outspot.toNormal();
  obj.kakao = this.kakao;
  return obj;
}

module.exports = Response;
