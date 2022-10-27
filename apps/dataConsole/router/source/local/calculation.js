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
  let nameWidth, designerWidth, idWidth, requestWidth, responseWidth;
  let contentsLoad;
  let requestTable, responseTable;
  let requestBlock, responseBlock;
  let tableBlockHeight;
  let tableBlockFactorWidth;
  let tableBetween;
  let firstMargin;
  let tableSize, tableWeight, tableBoldWeight;
  let tableTextTop;
  let requestColumns, responseColumns;

  requestColumns = [
    "구분",
    "소비자가",
    "확정가",
    "입금일",
    "환불액",
    "환불일",
  ];
  responseColumns = [
    "구분",
    "총액",
    "미지급액",
    "지급액",
    "지급일",
    "환수액",
  ];

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;

  textTop = (isMac() ? 10 : 12);
  textSize = 14;

  barWidth = 4;
  barMargin = 6;

  firstMargin = 20;
  minimumBetween = 12;

  alarmCircleRadius = 8;

  tableBlockHeight = 34;
  tableBlockFactorWidth = 110;
  tableBetween = 20;

  nameWidth = 50;
  designerWidth = 60;
  idWidth = 82;
  requestWidth = tableBlockFactorWidth * requestColumns.length;
  responseWidth = tableBlockFactorWidth * responseColumns.length;

  tableSize = 13;
  tableWeight = 400;
  tableBoldWeight = 700;
  tableTextTop = (isMac() ? -2 : 0);

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
        marginLeft: String(firstMargin) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "고객",
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
      text: "디자이너",
      style: {
        width: String(designerWidth) + ea,
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
        marginLeft: String(tableBetween) + ea,
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
          color: colorChip.deactive,
          top: String(textTop) + ea,
          marginLeft: String(firstMargin) + ea,
        }
      });

      createNode({
        mother: targetTong,
        text: project.name.slice(0, 3) + "<b% C%b>",
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
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(300),
          color: colorChip.deactive,
        }
      });
      createNode({
        mother: targetTong,
        text: project.designer.designer.slice(0, 3) + "<b% D%b>",
        style: {
          width: String(designerWidth) + ea,
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          fontSize: String(textSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        },
        bold: {
          fontSize: String(textSize) + ea,
          fontWeight: String(300),
          color: colorChip.deactive,
        }
      });

      // request

      requestTable = createNode({
        mother: targetTong,
        style: {
          width: String(requestWidth) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
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
          height: String(tableBlockHeight) + ea,
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < requestColumns.length; i++) {
        createNode({
          mother: requestBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray1,
            height: withOut(0, ea),
            width: i === requestColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === requestColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: requestColumns[i],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableBoldWeight),
                color: colorChip.black,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }

      





      // response

      responseTable = createNode({
        mother: targetTong,
        style: {
          width: String(responseWidth) + ea,
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          marginTop: String(textTop) + ea,
          marginLeft: String(tableBetween) + ea,
          marginBottom: String(textTop) + ea,
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          overflow: "hidden",
        }
      });

      responseBlock = createNode({
        mother: responseTable,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: String(tableBlockHeight) + ea,
          overflow: "hidden",
          borderRadius: String(5) + "px",
        }
      });
      for (let i = 0; i < responseColumns.length; i++) {
        createNode({
          mother: responseBlock,
          style: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            background: colorChip.gray1,
            height: withOut(0, ea),
            width: i === responseColumns.length - 1 ? String(tableBlockFactorWidth) + ea : String(tableBlockFactorWidth - 1) + ea,
            borderRight: i === responseColumns.length - 1 ?  "" : "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: responseColumns[i],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(tableSize) + ea,
                fontWeight: String(tableBoldWeight),
                color: colorChip.black,
                top: String(tableTextTop) + ea,
              }
            }
          ]
        });
      }

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
