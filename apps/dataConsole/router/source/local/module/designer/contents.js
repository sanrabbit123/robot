DesignerJs.prototype.contentsBase = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTong;
  let size;
  let borderBack;
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;
  let topMargin, leftMargin;

  margin = 30;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;
  topMargin = 21;
  leftMargin = 20;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  [ borderBack, dashBoard, contentsArea ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray2,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    }
  ]);

  [ contentsTong ] = createNodes([
    {
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        paddingRight: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    },
  ]);


  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.contentsBlockInjection();
}

DesignerJs.prototype.contentsWhiteBlock = function (mother, project) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  let height, margin;
  let whiteBlock;
  let innerMargin;

  innerMargin = 4;
  height = 46;
  margin = 4;

  whiteBlock = createNode({
    mother,
    style: {
      display: "block",
      background: colorChip.white,
      width: String(100) + '%',
      height: String(height) + ea,
      borderRadius: String(5) + "px",
      marginBottom: String(margin) + ea,
    }
  });

  createNodes([
    {
      mother: whiteBlock,
      style: {
        display: "inline-block",
        width: String(100) + ea,
        height: String(height * 0.8) + ea,
        background: "red",
      }
    }
  ]);

}

DesignerJs.prototype.contentsBlockInjection = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  let scrollTong;

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: String(100) + '%',
    }
  });

  for (var i = 0; i < projects.length; i++) {
    this.contentsWhiteBlock(scrollTong, projects[i]);
  }


}

DesignerJs.prototype.contentsView = async function () {
  const instance = this;
  try {
    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
    }
    const { createNodes, colorChip, ajaxJson, sleep, returnGet, equalJson } = GeneralJs;
    let loading;
    let projects;
    let designers, desidArr_raw, desidArr;
    let clients, cliidArr_raw, cliidArr;

    loading = await this.mother.loadingRun();

    /*

    // -----------------------------------------------------------------

    [ 촬영 관리 ]

    촬영 진행 여부

    촬영 진행 상태

    촬영일

    촬영 작가

    인터뷰어

    촬영 메모

    // -----------------------------------------------------------------

    [ 소스 수집 ]

    사진 원본

    인터뷰 상태

    인터뷰 원고

    디자이너 글

    // -----------------------------------------------------------------

    [ 발행 관리 ]

    블로그 포트폴리오 컨텐츠 발행

    블로그 인터뷰 컨텐츠 발행

    인스타 포트폴리오 컨텐츠 발행

    인스타 인터뷰 컨텐츠 발행

    웹 컨텐츠 발행

    // -----------------------------------------------------------------

    [ 발행 관리 ]

    블로그 포트폴리오 컨텐츠 발행

    블로그 인터뷰 컨텐츠 발행

    인스타 포트폴리오 컨텐츠 발행

    인스타 인터뷰 컨텐츠 발행

    웹 컨텐츠 발행

    // -----------------------------------------------------------------


    */

    this.contentsSpec = {};

    projects = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "process.status": { $regex: "^[진]" } },
          { "process.calculation.payments.first.date": { $gte: new Date(2000, 0, 1) } }
        ]
      }
    }, "/getProjects", { equal: true }));

    desidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
    }
    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }

    cliidArr_raw = [];
    for (let project of projects) {
      cliidArr_raw.push(project.cliid);
    }
    cliidArr_raw = Array.from(new Set(cliidArr_raw));
    cliidArr = [];
    for (let project of projects) {
      cliidArr.push({ cliid: project.cliid });
    }

    designers = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: desidArr
      }
    }, "/getDesigners", { equal: true }));

    clients = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: cliidArr
      }
    }, "/getClients"));

    for (let p of projects) {
      p.designer = designers.search("desid", p.desid).designer;
      p.name = clients.search("cliid", p.cliid).name;
      p.title = `${p.designer} <b style="color:${colorChip.green}">D</b> ${p.name} <b style="color:${colorChip.green}">C</b>`;
    }

    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    await sleep(500);
    loading.parentNode.removeChild(loading);

    this.contentsBase();

  } catch (e) {
    console.log(e);
  }
}
