const DashboardJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.vh = "vh";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

DashboardJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let totalMother;
  let outerMargin;
  let innerPadding;
  let contentsBase;
  let baseContents;

  outerMargin = 30;
  innerPadding = 10;

  baseContents = [
    {
      title: "고객",
      number: 300,
      children: [
        {
          title: "고객 현황과 정보",
        },
        {
          title: "오늘의 고객 응대",
        },
        {
          title: "고객 리포트",
        },
        {
          title: "고객 응대 매뉴얼",
          children: [
            {
              title: "1차 응대 매뉴얼",
            },
            {
              title: "추천서 작성 매뉴얼",
            },
            {
              title: "추천서 피드백 매뉴얼",
            }
          ]
        },
        {
          title: "서비스 설명",
          children: [
            {
              title: "서비스 용어 정의",
            },
            {
              title: "기본적인 인테리어 시장 상황"
            },
            {
              title: "홈스타일링의 장점",
            },
            {
              title: "디자이너와 함께 해야 하는 이유",
            },
            {
              title: "홈리에종에서 해야 하는 이유",
            },
            {
              title: "상황별 홈리에종 서비스의 장점"
            },
            {
              title: "홈리에종의 프로세스 설명"
            },
            {
              title: "예산과 기간에 대한 설명"
            },
            {
              title: "디자이너와 홈리에종의 제공물"
            }
          ]
        }
      ]
    },
    {
      title: "디자이너",
      number: 400,
      children: [
        {
          title: "디자이너 현황과 정보"
        },
        {
          title: "디자이너 신청자 관리"
        },
        {
          title: "디자이너 관련 파일",
        },
        {
          title: "디자이너 평가 시스템"
        },
        {
          title: "디자이너 리포트"
        },
        {
          title: "디자이너 가격과 정산",
          children: [
            {
              title: "가격 정책"
            },
            {
              title: "정산 조건"
            }
          ]
        },
        {
          title: "디자이너 관리 매뉴얼",
          children: [
            {
              title: "기본적인 관리 매뉴얼"
            },
            {
              title: "신규 디자이너 매뉴얼"
            },
            {
              title: "디자이너별 특징 정리"
            }
          ]
        }
      ]
    },
    {
      title: "프로젝트",
      number: 800,
      children: [
        {
          title: "프로젝트 현황과 정보"
        },
        {
          title: "시공 프로젝트 현황과 정보"
        },
        {
          title: "프로젝트 리포트",
          children: [
            {
              title: "디자인 프로젝트 리포트"
            },
            {
              title: "시공 프로젝트 리포트"
            },
          ]
        },
        {
          title: "프로젝트 매뉴얼",
          children: [
            {
              title: "현장 미팅 매뉴얼",
            },
            {
              title: "프로젝트 계약 매뉴얼"
            },
            {
              title: "프로젝트 케어 매뉴얼"
            },
            {
              title: "시공 관리 매뉴얼",
            },
            {
              title: "촬영 컨택 매뉴얼",
            },
            {
              title: "인터뷰 작성 매뉴얼",
            }
          ]
        }
      ]
    }
  ];

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      display: "flex",
      width: withOut(0, ea),
      height: "calc(100% - " + String(belowHeight) + ea + ")",
      background: colorChip.white,
      flexDirection: "row",
    }
  });

  this.totalMother = totalMother;

  createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      width: String(grayBarWidth) + ea,
      height: withOut(0, ea),
      background: colorChip.gray0,
    }
  });

  contentsBase = createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      width: withOut(grayBarWidth, ea),
      height: withOut(0, ea),
      background: colorChip.white,
    }
  })

  console.log(baseContents);


}

DashboardJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.members = (await ajaxJson({ type: "get" }, "/getMembers", { equal: true })).filter((obj) => { return obj.alive });

    document.getElementById("grayLeftOpenButton").remove();
    document.getElementById("moveRightArea").style.display = "none";
    document.getElementById("moveLeftArea").style.display = "none";

    this.baseMaker();






  } catch (e) {
    ajaxJson({
      message: "DashboardJs.prototype.launching error : " + e.message,
      channel: "#error_log"
    }, "/sendSlack").catch((err) => {
      console.log(err);
    });
    console.log(e);
  }
}
