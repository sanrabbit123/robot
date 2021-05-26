DesignerJs.prototype.calculationBase = function () {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  let entireTong;
  let scrollTong;
  let margin;

  margin = 30;

  entireTong = createNode({
    mother: document.getElementById("totalcontents"),
    style: {
      position: "relative",
      width: withOut(100, margin * 2, ea),
      height: withOut(100, belowHeight, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      overflow: "hidden",
    }
  });
  this.totalMother = entireTong;

  scrollTong = createNode({
    mother: entireTong,
    style: {
      position: "relative",
      width: withOut(100, 0, ea),
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin * 5) + ea,
      height: withOut(100, margin * (1 + 5), ea),
      overflow: "scroll",
      animation: "fadeup 0.2s ease forwards",
    }
  });
  this.scrollTong = scrollTong;

  this.calculationBlocks(null);
}

DesignerJs.prototype.calculationBlock = function (mother, designer) {
  if (mother === undefined || designer === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, isMac, autoComma } = GeneralJs;
  const { designer: name, desid } = designer;
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
  const dateToString = (date) => { return date.valueOf() > emptyDateValue ? `${date.getMonth() + 1}/${date.getDate()}` : `0/0`; }
  let motherWidth;
  let titleArea, listArea, sumArea;
  let titleWidth, titleHeight;
  let outerMargin, innerMargin;
  let titleSize, size;
  let sumHeight;
  let nodeArr;
  let projectHeight;
  let whiteBlock;
  let textTop, textLeft;
  let firstWidth;
  let boxTop;
  let lineTop, lineMargin;
  let textBox;
  let condition;
  let amount;

  motherWidth = Number(mother.style.width.replace(/[^0-9\.\-]/g, ''));
  titleWidth = 69;
  titleHeight = 100;
  outerMargin = 20;
  innerMargin = 10;
  titleSize = 21;
  size = 15;
  sumHeight = 54;
  projectHeight = 40;
  firstWidth = 40;
  boxTop = 9;
  textTop = isMac() ? 0 : 2;
  textLeft = 12;
  lineTop = 9;
  lineMargin = 6;

  [ titleArea, listArea, sumArea ] = createNodes([
    {
      mother,
      style: {
        position: "absolute",
        width: String(titleWidth) + ea,
        height: String(titleHeight) + ea,
        top: String(outerMargin) + ea,
        left: String(outerMargin) + ea,
      }
    },
    {
      mother,
      style: {
        position: "relative",
        width: withOut(100, (outerMargin * 2) + titleWidth + innerMargin + innerMargin, ea),
        height: withOut(100, (outerMargin * 2) + sumHeight + innerMargin + innerMargin, ea),
        marginLeft: String(outerMargin + titleWidth + innerMargin) + ea,
        marginTop: String(outerMargin) + ea,
        paddingTop: String(innerMargin) + ea,
        paddingLeft: String(innerMargin) + ea,
        background: colorChip.gray3,
        borderRadius: String(5) + "px",
      }
    },
    {
      mother,
      style: {
        position: "relative",
        width: withOut(100, (outerMargin * 2) + titleWidth + innerMargin, ea),
        height: String(sumHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        marginLeft: String(outerMargin + titleWidth + innerMargin) + ea,
        marginTop: String(innerMargin) + ea,
      }
    },
  ]);

  nodeArr = createNodes([
    {
      mother: titleArea,
      text: name,
      style: {
        position: "absolute",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        top: String(0) + ea,
        left: String(3) + ea,
      }
    },
    {
      mother: listArea,
      style: {
        position: "relative",
        width: withOut(100, innerMargin, ea),
        height: withOut(100, innerMargin, ea),
        background: colorChip.gray4,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        width: withOut(100, 0, ea),
        height: withOut(100, innerMargin * (1 + 3), ea),
        paddingTop: String(innerMargin) + ea,
        paddingBottom: String(innerMargin * 3) + ea,
        borderRadius: String(5) + "px",
        overflow: "scroll",
      }
    }
  ]);

  for (let i = 0; i < designer.projects.length; i++) {
    whiteBlock = createNode({
      mother: nodeArr[2],
      style: {
        position: "relative",
        width: withOut(100, innerMargin * 2, ea),
        height: String(projectHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        marginBottom: String(innerMargin / 2) + ea,
        marginLeft: String(innerMargin) + ea,
      }
    });

    createNode({
      mother: whiteBlock,
      text: "선금 : ",
      style: {
        position: "absolute",
        top: String(boxTop + textTop) + ea,
        left: String(textLeft) + ea,
        width: String(firstWidth) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(200),
        color: colorChip.shadow,
      }
    });
    textBox = createNode({
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(boxTop) + ea,
        left: String(textLeft + firstWidth) + ea,
        width: withOut(50, textLeft + firstWidth + (textLeft * 1), ea),
        height: withOut(100, boxTop, ea),
        overflow: "hidden",
      }
    });

    amount = designer.projects[i].process.calculation.payments.first.amount;
    condition = (designer.projects[i].process.calculation.payments.first.date.valueOf() > emptyDateValue);
    createNodes([
      {
        mother: textBox,
        text: autoComma(amount) + "원",
        style: {
          position: "absolute",
          top: String(textTop) + ea,
          left: String(0),
          fontSize: String(size) + ea,
          fontWeight: String(500),
          paddingRight: String(lineMargin) + ea,
          background: colorChip.white,
          zIndex: String(1),
          color: (condition ? colorChip.black : colorChip.red),
        }
      },
      {
        mother: textBox,
        style: {
          position: "absolute",
          top: String(lineTop) + ea,
          left: String(0),
          width: String(100) + '%',
          borderBottom: "1px solid " + (condition ? colorChip.gray3 : colorChip.red),
        }
      },
      {
        mother: textBox,
        text: dateToString(designer.projects[i].process.calculation.payments.first.date),
        style: {
          position: "absolute",
          top: String(textTop) + ea,
          right: String(0),
          fontSize: String(size) + ea,
          fontWeight: String(500),
          paddingLeft: String(lineMargin) + ea,
          background: colorChip.white,
          color: (condition ? colorChip.green : colorChip.red),
        }
      }
    ]);

    createNode({
      mother: whiteBlock,
      text: "잔금 : ",
      style: {
        position: "absolute",
        top: String(boxTop + textTop) + ea,
        left: withOut(50, 0, ea),
        width: String(firstWidth) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(200),
        color: colorChip.shadow,
      }
    });
    textBox = createNode({
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(boxTop) + ea,
        right: String(textLeft) + ea,
        width: withOut(50, textLeft + firstWidth, ea),
        height: withOut(100, boxTop, ea),
        overflow: "hidden",
      }
    });

    amount = designer.projects[i].process.calculation.payments.remain.amount;
    if (designer.projects[i].contents.photo.boo) {
      if (designer.projects[i].process.calculation.payments.remain.date.valueOf() <= emptyDateValue) {
        if (([ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '해당 없음' ]).includes(designer.projects[i].contents.raw.portfolio.status)) {
          condition = true;
        } else {
          condition = false;
        }
      } else {
        condition = true;
      }
    } else {
      if (designer.projects[i].process.calculation.payments.remain.date.valueOf() <= emptyDateValue) {
        condition = false;
      } else {
        condition = true;
      }
    }

    createNodes([
      {
        mother: textBox,
        text: autoComma(amount) + "원",
        style: {
          position: "absolute",
          top: String(textTop) + ea,
          left: String(0),
          fontSize: String(size) + ea,
          fontWeight: String(500),
          paddingRight: String(lineMargin) + ea,
          background: colorChip.white,
          zIndex: String(1),
          color: (condition ? colorChip.black : colorChip.red),
        }
      },
      {
        mother: textBox,
        style: {
          position: "absolute",
          top: String(lineTop) + ea,
          left: String(0),
          width: String(100) + '%',
          borderBottom: "1px solid " + (condition ? colorChip.gray3 : colorChip.red),
        }
      },
      {
        mother: textBox,
        text: dateToString(designer.projects[i].process.calculation.payments.remain.date),
        style: {
          position: "absolute",
          top: String(textTop) + ea,
          right: String(0),
          fontSize: String(size) + ea,
          fontWeight: String(500),
          paddingLeft: String(lineMargin) + ea,
          background: colorChip.white,
          color: (condition ? colorChip.green : colorChip.red),
        }
      }
    ]);

  }

}

DesignerJs.prototype.calculationBlocks = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const scrollTong = this.scrollTong;
  let length;
  let width, height;
  let boxMargin;
  let minWidth;
  let min;
  let target;
  let tempDom;
  let designers;
  let margin;

  margin = 30;
  length = this.designers.length;
  target = window.innerWidth - (margin * 2);
  minWidth = 520;
  boxMargin = 10;
  min = Math.floor(target / minWidth);
  width = (target - (boxMargin * (min - 1))) / min;
  height = 300;

  cleanChildren(scrollTong);

  if (search === null) {
    designers = this.designers;
    length = designers.length;
  }

  this.designerDoms = [];
  for (let i = 0; i < length; i++) {
    tempDom = createNode({
      mother: scrollTong,
      id: designers[i].desid,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(width) + ea,
        height: String(height) + ea,
        background: colorChip.gray2,
        borderRadius: String(5) + "px",
        marginRight: String(((i + 1) % min) === 0 ? 0 : boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
      }
    });
    this.designerDoms.push(tempDom);
    this.calculationBlock(tempDom, designers[i]);
  }

}

DesignerJs.prototype.calculationView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson } = GeneralJs;
    let loading;
    let projects;
    let desidArr_raw, desidArr;
    let cliidArr;
    let designers;
    let clients;

    loading = await this.mother.loadingRun();

    projects = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "process.status": { $regex: "^[대진홀]" } },
          { "process.contract.remain.date": { $gt: new Date(2000, 0, 1) } }
        ]
      }
    }, "/getProjects", { equal: true });

    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    designers = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: [
          { $or: desidArr },
          { "information.contract.status": { $regex: "완료" } }
        ]
      }
    }, "/getDesigners", { equal: true });

    clients = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: cliidArr
      }
    }, "/getClients", { equal: true });

    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);
    this.designers = this.designers.returnDoingDesigners();

    this.calculationBase();
    window.addEventListener("resize", (e) => { window.location.reload(); });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
