const DashboardJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.vh = "vh";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

DashboardJs.prototype.returnTreeContents = function () {
  const instance = this;
  let baseContents;

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
    },
    {
      title: "시스템",
      number: 200,
      children: [
        {
          title: "서비스 시스템의 구조",
          children: [
            {
              title: "시스템의 전체 구성",
            },
            {
              title: "프론트 웹의 구성",
            },
            {
              title: "고객 콘솔 구성",
            },
            {
              title: "홈리에종 콘솔 구성",
            },
            {
              title: "디자이너 콘솔 구성",
            },
            {
              title: "디자이너 콘솔 매뉴얼"
            },
          ]
        },
        {
          title: "운영 시스템 정보",
          children: [
            {
              title: "서버 현황"
            },
            {
              title: "내부 컴퓨터 현황"
            },
            {
              title: "이용중인 서비스 현황"
            },
            {
              title: "알림톡 현황",
            }
          ]
        },
      ]
    },
  ];
  
  return baseContents;
}

DashboardJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut, equalJson } = GeneralJs;
  let totalMother;
  let outerMargin;
  let innerPadding;
  let contentsBase;
  let baseContents;
  let maxLength;
  let getLength;
  let xLength, yLength;
  let titleArea, contentsArea;
  let titleAreaHeight;
  let targetChildren;
  let indent;
  let makeChildren;
  let contentsSize;
  let titleSize;
  let indentMargin;
  let lineTop;
  let visualMarginLeft;
  let visualFirstTopHeight;
  let maxWidthLength;
  let numberMargin;
  let numberTitleMargin;
  let numberTitleTop;
  let numberTitleSize;
  let grayBase;

  outerMargin = 30;
  innerPadding = 40;

  titleAreaHeight = 6.5;
  indent = 40;
  indentMargin = 12;

  titleSize = 2.6;
  contentsSize = 1.5;
  lineTop = 1;

  visualMarginLeft = 4;
  visualFirstTopHeight = 1.2;

  maxWidthLength = 1000;

  numberMargin = 0.6;
  numberTitleMargin = 0.7;
  numberTitleTop = 1.3;
  numberTitleSize = 1.6;

  baseContents = this.returnTreeContents();

  getLength = (children) => {
    let length;
    length = 0;
    for (let obj of children) {
      length = length + 1;
      if (Array.isArray(obj.children)) {
        length += getLength(obj.children);
      }
    }
    return length;
  }
  maxLength = baseContents.reduce((acc, curr) => {
    return acc > getLength(curr.children) ? acc : getLength(curr.children);
  }, 0);

  xLength = baseContents.length;
  yLength = maxLength;
  contentsArea = {};

  makeChildren = (x, targetChildren, level = 0, still = false, originalNumber = 300) => {
    let num;
    let last;
    let middleFirst;
    let thisNumber;

    last = (level !== 0 && !still);
    num = 0;
    for (let { title, children } of targetChildren) {
      thisNumber = level === 0 ? baseContents[x].number + (10 * (num + 1)) : originalNumber + (10 * (x + 1)) + (num + 1);
      middleFirst = (level !== 0 && num == 0);
      createNode({
        mother: contentsArea,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0, ea),
          height: "calc(100% / " + String(yLength) + ")",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              marginLeft: String(visualMarginLeft) + ea,
              width: String((indent * (level + 1)) - visualMarginLeft) + ea,
              height: withOut(0, ea),
              marginRight: String(indentMargin) + ea,
              flexDirection: "column",
              borderLeft: (num !== targetChildren.length - 1 || still) ? (last ? "" : "1px solid " + colorChip.gray3) : "",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: String(indent) + ea,
                borderLeft: (level !== 0) ? ((num === targetChildren.length - 1) ? "" : "1px solid " + colorChip.gray3) : "",
                marginLeft: String((indent + indentMargin) * level) + ea,
                height: withOut(0, ea),
                boxSizing: "border-box",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "absolute",
                    width: withOut(indentMargin * level, ea),
                    height: String(visualFirstTopHeight) + vh,
                    top: String(-1 * visualFirstTopHeight) + vh,
                    left: String(-1 * 1) + ea,
                    boxSizing: "border-box",
                    borderLeft: middleFirst ? "1px solid " + colorChip.gray3 : "",
                  }
                },
                {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(indentMargin * level, ea),
                    height: String(lineTop) + vh,
                    boxSizing: "border-box",
                    borderBottom: "1px solid " + colorChip.gray3,
                    borderLeft: (num !== targetChildren.length - 1) ? "" : "1px solid " + colorChip.gray3,
                    borderBottomLeftRadius: (num !== targetChildren.length - 1) ? "" : String(3) + ea,
                  }
                }
              ],
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut((indent * (level + 1)) + indentMargin, ea),
              overflow: "hidden",
            },
            child: {
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                width: String(maxWidthLength) + ea,
              },
              children: [
                {
                  text: String(thisNumber),
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(contentsSize) + vh,
                    fontWeight: String(200),
                    color: colorChip.gray3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    marginRight: String(numberMargin) + vh,
                  }
                },
                {
                  text: title,
                  event: {
                    mouseenter: function (e) {
                      this.style.color = colorChip.green;
                    },
                    mouseleave: function (e) {
                      this.style.color = colorChip.black;
                    },
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(contentsSize) + vh,
                    fontWeight: String(700 - (300 * level)),
                    color: colorChip.black,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }
                },
              ],
            },
          },
        ]
      });
      if (Array.isArray(children)) {
        makeChildren(num, children, level + 1, num !== targetChildren.length - 1, baseContents[x].number);
      }
      num++;
    }
  }

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

  grayBase = createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      width: String(grayBarWidth) + ea,
      height: withOut(0, ea),
      background: colorChip.gray0,
    }
  });
  this.grayBase = grayBase;

  contentsBase = createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      position: "relative",
      padding: String(outerMargin) + ea,
      width: withOut(grayBarWidth + (outerMargin * 2), ea),
      height: withOut(outerMargin * 2, ea),
      background: colorChip.white,
      flexDirection: "row",
    }
  });
  this.contentsBase = contentsBase;

  for (let i = 0; i < xLength; i++) {
    [ titleArea, contentsArea ] = createNode({
      mother: contentsBase,
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        width: "calc(100% / " + String(xLength) + ")",
        height: withOut(0, ea),
        boxSizing: "border-box",
        padding: String(innerPadding) + ea,
      },
      children: [
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(titleAreaHeight) + vh,
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "row",
          },
          children: [
            {
              text: baseContents[i].title,
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(titleSize) + vh,
                fontWeight: String(900),
                color: colorChip.black,
              }
            },
            {
              text: String(baseContents[i].number),
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(numberTitleSize) + vh,
                fontWeight: String(200),
                color: colorChip.green,
                marginLeft: String(numberTitleMargin) + vh,
                top: String(numberTitleTop) + vh,
              }
            },
          ],
        },
        {
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(titleAreaHeight, vh),
          }
        }
      ]
    }).children;
    makeChildren(i, equalJson(baseContents[i].children), 0);
  }

}

DashboardJs.prototype.grayMaker = function () {
  const instance = this;
  const { grayBase, ea, vh } = this;
  const { createNode, withOut, colorChip, equalJson } = GeneralJs;
  const numberClassName = "numberClassName";
  const titleClassName = "titleClassName";
  let baseContents;
  let targetContents;
  let x, y, z;
  let innerPadding;
  let fontSize;
  let contentsTong;
  let numberBoxWidth;
  let blockBetween;

  innerPadding = 38;
  fontSize = 14;
  numberBoxWidth = 34;
  blockBetween = 12;

  baseContents = this.returnTreeContents();

  targetContents = [];

  for (let obj of baseContents) {
    x = obj.number;
    y = 0;
    for (let obj2 of obj.children) {
      if (Array.isArray(obj2.children)) {
        z = 0;
        for (let obj3 of obj2.children) {
          targetContents.push({
            title: obj3.title,
            number: x + ((y + 1) * 10) + (z + 1),
          });
          z++;
        }
      } else {
        targetContents.push({
          title: obj2.title,
          number: x + ((y + 1) * 10),
        });
      }
      y++;
    }
  }

  contentsTong = createNode({
    mother: grayBase,
    style: {
      display: "flex",
      position: "relative",
      top: String(innerPadding) + ea,
      left: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      height: withOut(innerPadding * 2, ea),
      overflow: "scroll",
    },
    child: {
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
      }
    }
  }).firstChild;

  targetContents.unshift({
    title: "전체 보기",
    number: 0,
  })

  for (let { number, title } of targetContents) {
    createNode({
      mother: contentsTong,
      event: {
        selectstart: (e) => { e.preventDefault() },
        mouseenter: function (e) {
          this.querySelector('.' + numberClassName).style.color = colorChip.green;
          this.querySelector('.' + titleClassName).style.color = colorChip.green;
        },
        mouseleave: function (e) {
          this.querySelector('.' + numberClassName).style.color = colorChip.deactive;
          this.querySelector('.' + titleClassName).style.color = colorChip.black;
        }
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
        marginBottom: String(blockBetween) + ea,
        cursor: "pointer",
      },
      children: [
        {
          class: [ numberClassName ],
          text: number === 0 ? "000" : String(number),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(numberBoxWidth) + ea,
            fontSize: String(fontSize) + ea,
            fontWeight: String(200),
            color: colorChip.deactive,
            transition: "all 0.3s ease",
          }
        },
        {
          style: {
            display: "inline-block",
            overflow: "hidden",
            position: "relative",
            width: withOut(numberBoxWidth, ea),
            height: withOut(0, ea),
          },
          child: {
            style: {
              display: "flex",
              width: String(1000) + ea,
              position: "relative",
            },
            child: {
              class: [ titleClassName ],
              text: title.replace(/ /gi, '').length > 7 ? title.slice(0, 8) + " ..." : title,
              style: {
                position: "relative",
                display: "inline-block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(500),
                color: colorChip.black,
                transition: "all 0.3s ease",
              }
            }
          }
        }
      ]
    })

  }

}

DashboardJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.members = (await ajaxJson({ type: "get" }, "/getMembers", { equal: true })).filter((obj) => { return obj.alive });

    this.totalMother = null;
    this.grayBase = null;
    this.contentsBase = null;

    document.getElementById("grayLeftOpenButton").remove();
    document.getElementById("moveRightArea").style.display = "none";
    document.getElementById("moveLeftArea").style.display = "none";

    this.baseMaker();
    this.grayMaker();

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
