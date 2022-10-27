const CalculationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

CalculationJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, projects } = this;
  const { createNode, withOut, colorChip, isMac, dateToString, blankHref, ajaxJson, cleanChildren } = GeneralJs;
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
  let buttonList;
  let buttonWidth;
  let num;
  let buttonBetween;
  let idWidth, nameWidth, phoneWidth, requestWidth, responseWidth;
  let contentsLoad;
  let requestTable, responseTable;
  let requestBlock, responseBlock;

  console.log(projects);

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;

  textTop = (isMac() ? 10 : 12);
  textSize = 14;

  barWidth = 4;
  barMargin = 6;

  minimumBetween = 19;

  alarmCircleRadius = 8;

  idWidth = 88;
  nameWidth = 60;
  phoneWidth = 122;
  requestWidth = 600;
  responseWidth = 600;

  buttonTextTop = isMac() ? -1 : 0;
  buttonSize = 12;
  buttonWeight = 700;
  buttonHeight = 28;
  buttongTop = 8;
  buttonWidth = 90;
  buttonBetween = 6;

  contentsLoad = () => {};

  buttonList = [];

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

  // column

  contentsLoad = () => {

    cleanChildren(grayTong);

    motherBlock = createNode({
      mother: grayTong,
      style: {
        display: "block",
        position: "sticky",
        top: String(0),
        zIndex: String(1),
        height: String(blockHeight) + ea,
        width: withOut(0, ea),
        overflow: "hidden",
        borderRadius: String(5) + "px",
        marginBottom: String(blockMargin) + ea,
      }
    });

    baseBlock = createNode({
      mother: motherBlock,
      style: {
        display: "inline-block",
        width: withOut(0, ea),
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.gradientGray,
        backdropFilter: "blur(4px)",
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
      ]
    });
    targetTong = baseBlock.firstChild;
    createNode({
      mother: targetTong,
      text: "아이디",
      style: {
        width: String(idWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
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
        fontWeight: String(700),
        color: colorChip.gray4,
        top: String(textTop) + ea,
        marginLeft: String(barMargin) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "이름",
      style: {
        width: String(nameWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "연락처",
      style: {
        width: String(phoneWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "매출",
      style: {
        width: String(requestWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "매입",
      style: {
        width: String(responseWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });


    for (let project of projects) {

      motherBlock = createNode({
        mother: grayTong,
        attribute: {
          proid: project.proid,
        },
        style: {
          display: "block",
          position: "relative",
          "min-height": String(blockHeight) + ea,
          width: withOut(0, ea),
          overflow: "hidden",
          borderRadius: String(5) + "px",
          marginBottom: String(blockMargin) + ea,
        }
      });

      baseBlock = createNode({
        mother: motherBlock,
        attribute: {
          proid: project.proid,
        },
        style: {
          display: "inline-block",
          width: withOut(0, ea),
          position: "relative",
          "min-height": String(blockHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
        },
        children: [
          {
            attribute: {
              proid: project.proid,
            },
            style: {
              display: "block",
              position: "relative",
              width: String(8000) + ea,
              height: withOut(0, ea),
            }
          },
        ]
      });

      targetTong = baseBlock.firstChild;
      createNode({
        mother: targetTong,
        text: project.proid,
        style: {
          width: String(idWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
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
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.gray4,
          top: String(textTop) + ea,
          marginLeft: String(barMargin) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: project.name.slice(0, 3),
        style: {
          width: String(nameWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: project.phone,
        style: {
          width: String(phoneWidth) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });

      requestTable = createNode({
        mother: targetTong,
        style: {
          width: String(600) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          marginTop: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
          marginBottom: String(textTop) + ea,
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          overflow: "hidden",
        }
      });

      requestBlock = createNode({
        mother: requestTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(36) + ea,
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });

      createNode({
        mother: requestBlock,
        style: {
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: colorChip.gray1,
          height: withOut(0, ea),
          width: String(80) + ea,
          borderRight: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            text: "구분",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(13) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              top: String(-2) + ea,
            }
          }
        ]
      });

      createNode({
        mother: requestBlock,
        style: {
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: colorChip.gray1,
          height: withOut(0, ea),
          width: String(80) + ea,
        },
        children: [
          {
            text: "구분",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(13) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              top: String(-2) + ea,
            }
          }
        ]
      });





    }

  }

  contentsLoad();

}

CalculationJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let projects, projectsRaw;
    let loading;
    let bills;
    let proid, cliid, desid, service;
    let thisClient, thisDesigner;
    let thisBill;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = this.mother.grayLoading();

    projectsRaw = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getProjects", { equal: true });
    projects = projectsRaw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= emptyDateValue });

    clients = await ajaxJson({ noFlat: true, whereQuery: { $or: Array.from(new Set(projects.map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) } }, "/getClients", { equal: true });
    designers = await ajaxJson({ noFlat: true, whereQuery: { $or: Array.from(new Set(projects.map((p) => { return p.desid }))).map((desid) => { return { desid } }) } }, "/getDesigners", { equal: true });

    bills = await ajaxJson({ mode: "read", db: "python", collection: "generalBill", whereQuery: {} }, PYTHONHOST + "/generalMongo", { equal: true });

    for (let project of projects) {
      ({ proid, cliid, desid, service } = project);

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      thisDesigner = designers.find((obj) => { return obj.desid === desid });
      thisBill = bills.find((obj) => {
        return ((obj.links.proid === proid) && (obj.links.method === (service.online ? "online" : "offline")))
      });

      project.client = thisClient;
      project.designer = thisDesigner;
      project.bill = thisBill;
      project.name = thisClient.name;
      project.phone = thisClient.phone;
    }

    this.projects = projects;
    this.baseMaker();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    loading.remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
