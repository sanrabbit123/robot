const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { Menu, Flow } = require(GENERAL_DIR + "/generator.js");

class PredictDesigners extends Array {
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
  this.status = new Menu(response.status, [
    "드랍",
    "진행",
    "응대중",
    "장기",
  ], false);
  this.action = new Menu(response.action, [
    "1차 응대 예정",
    "1차 응대 후 대기",
    "스타일 체크 대기",
    "제안 발송 예정",
    "제안 피드백 예정",
    "피드백 부재중",
    "제안 피드백 완료",
    "부재중 알림 발송",
    "상세 설문 대기",
    "부재중 제안 발송",
    "피드백과 응대 예정",
    "자동 피드백 부재중",
    "피드백과 응대 완료",
    "디자이너 선택",
    "해당 없음",
  ], false);
  this.outreason = new Menu(response.outreason, [
    "연결 안 됨",
    "가벼운 문의",
    "타사 계약",
    "가족 의견 불일치",
    "직접 진행",
    "고객 상황 변동",
    "기간 임박",
    "디자인비 문제",
    "총 예산 문제",
    "서비스 불일치",
    "프로세스 문제",
    "시공 문제",
    "지역 이슈",
    "제안서 매력도",
    "디자이너 부족",
    "고객 미션 미응답",
  ], true);
  this.kakao = response.kakao;
  this.service = new ProjectService(response.service);
  this.designers = new PredictDesigners(response.designers);
}

Response.prototype.actionInfo = function () {
  const actionItems = [
    [ "1차 응대 예정" ],
    [ "1차 응대 후 대기", "부재중 알림 발송" ],
    [ "스타일 체크 대기", "상세 설문 대기" ],
    [ "제안 발송 예정", "부재중 제안 발송" ],
    [ "제안 피드백 예정", "피드백과 응대 예정" ],
    [ "피드백 부재중", "자동 피드백 부재중" ],
    [ "제안 피드백 완료", "피드백과 응대 완료" ],
    [ "디자이너 선택" ],
    [ "해당 없음" ],
  ];

  const position = [
    {
      value: actionItems[1][0],
      used: [
        {
          file: "/apps/backMaker/backWorker.js",
          method: "clientActionSync"
        }
      ]
    },
    {
      value: actionItems[1][1],
      used: [
        {
          file: "/apps/dataConsole/router/source/local/client.js",
          method: "communicationRender"
        }
      ]
    },
    {
      value: actionItems[2][0],
      used: [
        {
          file: "/apps/dataConsole/router/source/local/client.js",
          method: "communicationRender"
        }
      ]
    },
    {
      value: actionItems[3][0],
      used: [
        {
          file: "/apps/dataConsole/router/fragments/router7_ghost_styleCuration.js",
          method: "rou_post_styleCuration_updateCalculation"
        }
      ]
    },
    {
      value: actionItems[3][1],
      used: [
        {
          file: "/apps/dataConsole/router/fragments/router7_ghost_styleCuration.js",
          method: "rou_post_styleCuration_updateCalculation"
        }
      ]
    },
    {
      value: actionItems[4][0],
      used: [
        {
          file: "/robot.js",
          method: "proposalMaker",
        }
      ]
    },
    {
      value: actionItems[4][1],
      used: [
        {
          file: "/robot.js",
          method: "proposalMaker",
        }
      ]
    },
    {
      value: actionItems[7][0],
      used: [
        {
          file: "/apps/dataConsole/router/fragments/router6_ghost_designerProposal.js",
          method: "rou_post_designerProposal_submit"
        }
      ]
    },
    {
      value: actionItems[7][0],
      used: [
        {
          file: "/apps/dataConsole/router/source/local/proposal.js",
          method: "list_menuEvents",
        }
      ]
    },
  ];

  return new Flow(actionItems, position);
}

Response.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.action = this.action.toNormal();
  obj.outreason = this.outreason.toNormal();
  obj.kakao = this.kakao;
  obj.service = this.service.toNormal();
  obj.designers = this.designers.toNormal();
  return obj;
}

module.exports = Response;
