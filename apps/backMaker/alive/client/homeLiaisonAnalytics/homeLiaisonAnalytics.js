const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse, Menu } = require(GENERAL_DIR + "/generator.js");

class HomeLiaisonAnalytics {
  constructor(analytics) {
    this.response = {
      status: new Menu(analytics.response?.status, ["드랍", "진행", "응대중", "장기"], false),
      action: new Menu(analytics.response?.action, [
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
      ], false),
      outreason: new Menu(analytics.response?.outreason, [
        "연결 안 됨",
        "가벼운 문의",
        "고객 미션 미응답",
        "직접 진행",
        "고객 상황 변동",
        "가족 의견 불일치",
        "기간 임박",
        "장기 고객",
        "시공만 필요",
        "거주중 시공",
        "일단 견적 먼저",
        "시공 문제",
        "서비스 불일치",
        "타사 계약",
        "지역 이슈",
        "총 예산 문제",
        "디자인비 문제",
        "프로세스 문제",
        "디자이너 부족",
        "제안서 매력도",
      ], true),
      kakao: analytics.response?.kakao,
      service: {
        serid: analytics.response?.service?.serid,
        xValue: analytics.response?.service?.xValue,
        online: Boolean(analytics.response?.service?.online)
      },
      designers: analytics.response?.designers || [],
      priority: new Menu(analytics.response?.priority, ["상", "중", "하"], false),
      possible: new Menu(analytics.response?.possible, ["높음", "애매", "낮음"], false),
      target: new Menu(analytics.response?.target, ["타겟", "애매", "해당 없음"], false),
      memo: analytics.response?.memo
    };
    this.date = {
      call: {
        next: new DateParse(analytics.date?.call?.next),
        history: (analytics.date?.call?.history || []).map(item => ({
          date: new DateParse(item?.date),
          who: item?.who
        })),
        recommend: new DateParse(analytics.date?.call?.recommend)
      },
      space: {
        precheck: new DateParse(analytics.date?.space?.precheck),
        empty: new DateParse(analytics.date?.space?.empty),
        movein: new DateParse(analytics.date?.space?.movein)
      },
      calendar: {
        call: {
          mother: analytics.date?.calendar?.call?.mother,
          id: analytics.date?.calendar?.call?.id
        },
        precheck: {
          mother: analytics.date?.calendar?.precheck?.mother,
          id: analytics.date?.calendar?.precheck?.id
        },
        empty: {
          mother: analytics.date?.calendar?.empty?.mother,
          id: analytics.date?.calendar?.empty?.id
        },
        movein: {
          mother: analytics.date?.calendar?.movein?.mother,
          id: analytics.date?.calendar?.movein?.id
        }
      }
    };
    this.picture = {
      space: {
        boo: Boolean(analytics.picture?.space?.boo),
        file: (analytics.picture?.space?.file || []).map(item => ({
          date: new DateParse(item?.date),
          confirm: (item?.confirm || []).map(c => ({
            date: new DateParse(c?.date),
            who: c?.who
          })),
          folderId: item?.folderId
        }))
      },
      prefer: {
        boo: Boolean(analytics.picture?.prefer?.boo),
        file: (analytics.picture?.prefer?.file || []).map(item => ({
          date: new DateParse(item?.date),
          confirm: (item?.confirm || []).map(c => ({
            date: new DateParse(c?.date),
            who: c?.who
          })),
          folderId: item?.folderId
        }))
      }
    };
    this.proposal = (analytics.proposal || []).map(item => ({
        proid: item?.proid,
        date: new DateParse(item?.date),
        contract: item?.contract
    }));
    this.session = analytics.session || []; 
  }

  toNormal() {
    return {
      response: {
        status: this.response.status.toNormal(),
        action: this.response.action.toNormal(),
        outreason: this.response.outreason.toNormal(),
        kakao: this.response.kakao,
        service: {
          serid: this.response.service.serid,
          xValue: this.response.service.xValue,
          online: this.response.service.online
        },
        designers: this.response.designers.slice(),
        priority: this.response.priority.toNormal(),
        possible: this.response.possible.toNormal(),
        target: this.response.target.toNormal(),
        memo: this.response.memo
      },
      date: {
        call: {
          next: this.date.call.next.toNormal(),
          history: this.date.call.history.map(item => ({
            date: item.date.toNormal(),
            who: item.who
          })),
          recommend: this.date.call.recommend.toNormal()
        },
        space: {
          precheck: this.date.space.precheck.toNormal(),
          empty: this.date.space.empty.toNormal(),
          movein: this.date.space.movein.toNormal()
        },
        calendar: {
          call: {
            mother: this.date.calendar.call.mother,
            id: this.date.calendar.call.id
          },
          precheck: {
            mother: this.date.calendar.precheck.mother,
            id: this.date.calendar.precheck.id
          },
          empty: {
            mother: this.date.calendar.empty.mother,
            id: this.date.calendar.empty.id
          },
          movein: {
            mother: this.date.calendar.movein.mother,
            id: this.date.calendar.movein.id
          }
        }
      },
      picture: {
        space: {
          boo: this.picture.space.boo,
          file: this.picture.space.file.map(item => ({
            date: item.date.toNormal(),
            confirm: item.confirm.map(c => ({
              date: c.date.toNormal(),
              who: c.who
            })),
            folderId: item.folderId
          }))
        },
        prefer: {
          boo: this.picture.prefer.boo,
          file: this.picture.prefer.file.map(item => ({
            date: item.date.toNormal(),
            confirm: item.confirm.map(c => ({
              date: c.date.toNormal(),
              who: c.who
            })),
            folderId: item.folderId
          }))
        }
      },
      proposal: this.proposal.map(item => ({
          proid: item.proid,
          date: item.date.toNormal(),
          contract: item.contract
      })),
      session: this.session.slice() 
    };
  }
}

module.exports = HomeLiaisonAnalytics;