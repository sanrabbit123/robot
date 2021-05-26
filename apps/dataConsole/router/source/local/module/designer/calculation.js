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
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { designer: name, desid } = designer;
  let motherWidth;
  let titleArea, contentsArea;
  let titleWidth, titleHeight;
  let outerMargin, innerMargin;
  let titleSize, size;

  motherWidth = Number(mother.style.width.replace(/[^0-9\.\-]/g, ''));
  titleWidth = 69;
  titleHeight = 100;
  outerMargin = 20;
  innerMargin = 10;
  titleSize = 21;
  size = 15;

  [ titleArea, contentsArea ] = createNodes([
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
        width: withOut(100, (outerMargin * 2) + titleWidth + innerMargin, ea),
        height: withOut(100, outerMargin * 2, ea),
        marginLeft: String(outerMargin + titleWidth + innerMargin) + ea,
        marginTop: String(outerMargin) + ea,
        background: colorChip.gray3,
        borderRadius: String(5) + "px",
      }
    }
  ]);

  createNodes([
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
    }
  ]);


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
  height = 400;

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
          { "process.status": { $regex: "^[대진홀]" } }
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

    this.calculationBase();
    window.addEventListener("resize", (e) => { window.location.reload(); });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
