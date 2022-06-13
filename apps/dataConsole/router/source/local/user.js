const UserJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

UserJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, users } = this;
  const { createNode, withOut, colorChip } = GeneralJs;
  let outerMargin;
  let innerPadding;
  let grayBack;
  let grayTong;
  let blockHeight;
  let blockMargin;
  let baseBlock;
  let targetTong;

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;


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
    baseBlock = createNode({
      mother: grayTong,
      style: {
        display: "block",
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.white,
        marginBottom: String(blockMargin) + ea,
        borderRadius: String(5) + "px",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: String(8000) + ea,
            height: withOut(0, ea),
          }
        }
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
        fontSize: String(14) + ea,
        color: colorChip.black,
        top: String(12) + ea,
        marginLeft: String(16) + ea,
      }
    });

    createNode({
      mother: targetTong,
      text: '|',
      style: {
        width: String(3) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(14) + ea,
        color: colorChip.gray4,
        top: String(12) + ea,
        marginLeft: String(6) + ea,
      }
    });

    createNode({
      mother: targetTong,
      text: user.name,
      style: {
        width: String(60) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(14) + ea,
        color: colorChip.black,
        top: String(12) + ea,
        marginLeft: String(19) + ea,
      }
    });

    createNode({
      mother: targetTong,
      text: user.phone,
      style: {
        width: String(120) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(14) + ea,
        color: colorChip.black,
        top: String(12) + ea,
        marginLeft: String(19) + ea,
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
