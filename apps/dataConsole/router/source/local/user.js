const UserJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

UserJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, users } = this;
  const { createNode, withOut, colorChip, isMac, dateToString } = GeneralJs;
  let outerMargin;
  let innerPadding;
  let grayBack;
  let grayTong;
  let blockHeight;
  let blockMargin;
  let baseBlock;
  let targetTong;
  let textTop;
  let textSize;
  let minimumBetween;
  let barWidth, barMargin;
  let motherBlock;
  let alarmCircleRadius;
  let buttonSize, buttonWeight, buttonTextTop;
  let buttonHeight, buttongTop;

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;

  textTop = 12;
  textSize = 14;

  barWidth = 4;
  barMargin = 6;

  minimumBetween = 19;

  alarmCircleRadius = 8;

  buttonTextTop = isMac() ? -1 : 0;
  buttonSize = 12;
  buttonWeight = 700;

  buttonHeight = 28;
  buttongTop = 8;

  grayBack = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
      width: withOut(outerMargin * 2, ea),
      height: withOut((outerMargin * 2) + belowHeight, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          display: "block",
          width: withOut(0, ea),
          height: withOut(0, ea),
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(innerPadding) + ea,
              left: String(innerPadding) + ea,
              width: withOut(innerPadding * 2, ea),
              height: withOut(innerPadding * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            ]
          }
        ]
      }
    ]
  });

  grayTong = grayBack.firstChild.firstChild.firstChild;

  for (let user of users) {

    motherBlock = createNode({
      mother: grayTong,
      style: {
        display: "block",
        position: "relative",
        height: String(blockHeight) + ea,
        width: withOut(0, ea),
        overflow: "hidden",
        borderRadius: String(5) + "px",
        marginBottom: String(blockMargin) + ea,
      }
    });

    createNode({
      mother: motherBlock,
      style: {
        display: "inline-flex",
        width: String(blockHeight) + ea,
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        marginRight: String(blockMargin) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(alarmCircleRadius) + ea,
            height: String(alarmCircleRadius) + ea,
            borderRadius: String(alarmCircleRadius) + ea,
            background: colorChip.gradientGreen,
          }
        }
      ]
    });

    baseBlock = createNode({
      mother: motherBlock,
      style: {
        display: "inline-block",
        width: withOut(blockHeight + blockMargin, ea),
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: String(8000) + ea,
            height: withOut(0, ea),
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(80) + ea,
            height: String(buttonHeight) + ea,
            right: String(8) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: "컨펌 및 전송",
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(80) + ea,
            height: String(buttonHeight) + ea,
            right: String(94) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: "제안 보기",
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(80) + ea,
            height: String(buttonHeight) + ea,
            right: String(180) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: "디자이너 보기",
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(80) + ea,
            height: String(buttonHeight) + ea,
            right: String(266) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: "디자이너 지정",
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(80) + ea,
            height: String(buttonHeight) + ea,
            right: String(352) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGreen,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: "가이드 보기",
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        },
      ]
    });

    targetTong = baseBlock.firstChild;
    createNode({
      mother: targetTong,
      text: user.useid,
      style: {
        width: String(88) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: '|',
      style: {
        width: String(barWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.gray4,
        top: String(textTop) + ea,
        marginLeft: String(barMargin) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.name,
      style: {
        width: String(60) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.phone,
      style: {
        width: String(122) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.phone,
      style: {
        width: String(122) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.request.status,
      style: {
        width: String(80) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.request.status,
      style: {
        width: String(80) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: String(user.request.space.targets) + "개",
      style: {
        width: String(49) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "정다연",
      style: {
        width: String(70) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: user.email,
      style: {
        width: String(200) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        color: colorChip.black,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });




  }

}

UserJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    let users;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    users = await ajaxJson({ whereQuery: {} }, "/getUsers", { equal: true });

    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));
    users = users.concat(equalJson(JSON.stringify(users)));

    this.users = users;

    this.baseMaker();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
