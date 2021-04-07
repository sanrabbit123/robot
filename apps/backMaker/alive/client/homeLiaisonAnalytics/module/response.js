const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { Menu } = require(GENERAL_DIR + "/generator.js");

const ProjectService = function (json) {
  this.serid = json.serid;
  this.xValue = json.xValue;
  this.online = Boolean(json.online);
}

ProjectService.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.xValue = this.xValue;
  obj.online = this.online;
  return obj;
}

const Response = function (response) {
  const actionList = [
    "1차 응대 예정",
    "1차 응대 후 대기",
    "선호사진 대기",
    "제안 발송 예정",
    "제안 피드백 예정",
    "제안 피드백 대기",
    "제안 피드백 완료",
    "계약금 안내",
    "제안 후 대기",
    "연결 안 됨",
    "계약금 입금",
    "계약서 서명",
    "잔금 입금",
    "응대 종료",
    "해당 없음",
  ];
  this.status = new Menu(response.status, [ '드랍', '진행', '응대중', '장기' ], false);
  this.action = new Menu(response.action, actionList, false);
  this.outreason = new Menu(response.outreason, [
    '연결 안 됨',
    '가벼운 문의',
    '타사 계약',
    '비용 문제',
    '의견 조정 안 됨',
    '직접 진행',
    '고객 상황 변동',
    '기간 부적합',
    '디자인비 문제',
    '총 예산 문제',
    '서비스 불일치',
    '프로세스 문제',
    '시공 문제',
    '지역 이슈',
    '제안서 매력도',
    '디자이너 부족',
    '기타 문제'
  ], true);
  this.outspot = new Menu(response.outspot, actionList, false);
  this.kakao = response.kakao;
  this.service = new ProjectService(response.service);
}

Response.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.action = this.action.toNormal();
  obj.outreason = this.outreason.toNormal();
  obj.outspot = this.outspot.toNormal();
  obj.kakao = this.kakao;
  obj.service = this.service.toNormal();
  return obj;
}

module.exports = Response;
