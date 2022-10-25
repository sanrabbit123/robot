DesignerJs.prototype.scheduleDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;
  let loading;
  let projects;

  this.classNames = {
    base: "taskBlock",
    start: "taskDateStart",
    end: "taskDateEnd",
    title: "taskContentsTitle",
    description: "taskContentsDescription",
    color: "taskContentsColor"
  };
  this.colors = [ '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#405966' ];
  this.taskBlocks = [];

  if (!middleMode) {
    this.pageHistory.unshift({ path: "schedule", status: "list", desid });
  }
  window.history.pushState({ path: "schedule", status: "list", desid }, '');

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.iconTong !== undefined && this.iconTong !== null) {
      this.iconTong.parentElement.removeChild(this.iconTong);
    }
    this.iconTong = null;
    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  if (!middleMode) {
    target = null;
    for (let i = 0; i < this.standardDoms.length; i++) {
      if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
        if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
          target = i;
        }
      }
    }
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (i !== target) {
        this.standardDoms[i].style.color = this.standardDoms[i].getAttribute("color");
      } else {
        this.standardDoms[i].style.color = colorChip.green;
        if (i !== 1) {
          if (this.standardDoms[i].getBoundingClientRect().top > window.innerHeight - belowHeight - motherHeight - this.standardDoms[i].getBoundingClientRect().height + 10 || this.standardDoms[i].getBoundingClientRect().top < firstTop) {
            standardBar.parentElement.scrollTo({ top: ((i - 1) * (this.standardDoms[i].getBoundingClientRect().height)) });
          }
        } else {
          standardBar.parentElement.scrollTo({ top: 0 });
        }
      }
    }
  }

  if (middleMode) {
    ajaxJson({
      page: "schedule",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.scheduleIconSet(desid);
  this.mother.loadingRun().then((dom) => {
    loading = dom;
    return ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getProjects", { equal: true });
  }).then((raw) => {
    projects = raw;
    return ajaxJson({ method: "project", idArr: projects.map((obj) => { return obj.proid }) }, "/getHistoryTotal", { equal: true });
  }).then((histories) => {
    if (projects.length === 0) {
      return [];
    } else {
      for (let project of projects) {
        project.history = histories[project.proid];
      }
      instance.designers.setProjects(projects);
      return ajaxJson({
        noFlat: true,
        whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
      }, "/getClients", { equal: true });
    }
  }).then((clients) => {
    loading.parentNode.removeChild(loading);
    instance.designers.setClients(clients);
    instance.scheduleList(desid);
    scrollTo(totalMother, pastScrollTop);
    if (callback !== null) {
      if (typeof callback === "function") {
        callback();
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}

DesignerJs.prototype.scheduleReturnStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;

  const title = desktop ? client.name + "님 상세 일정표" : "상세 일정표";
  const initialContents = "안녕하세요, <b%" + designer.designer + "%b> 실장님!\n" + client.name +  " 고객님 <b%상세 일정 사항 기입%b>을 부탁드립니다. 해당 사항을 클릭하여 수정하실 수 있으며,\n수정된 내용을 바탕으로 고객님께 안내될 페이지는 다음 페이지 링크에서 보실 수 있습니다!";

  return {
    title,
    initialContents,
  };
}

DesignerJs.prototype.scheduleList = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const statusColors = [
    {
      color: colorChip.gray3,
      name: "미작성"
    },
    {
      color: colorChip.red,
      name: "작성중"
    },
    {
      color: colorChip.purple,
      name: "작성 완료"
    },
    {
      color: colorChip.green,
      name: "전송 완료"
    },
  ]
  const mobile = this.media[4];
  const desktop = !mobile;
  let designer;
  let margin;
  let baseTong0, baseTong;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let boxNumber, boxNumberArr;
  let requestBox, boxMargin;
  let projects;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;
  let dateString;
  let baseTongPaddingBottom;
  let mobileOuterMargin;
  let borderRadius;
  let secondFont;
  let statusNumber;
  let colorInfo;
  let colorInfoIndent;
  let colorInfoPaddingLeft;
  let colorInfoPaddingTop;
  let colorInfoPaddingBottom;
  let colorBlockHeight;
  let colorMarkWidth;
  let colorMarkHeight;
  let colorMarkBetween;
  let colorBlockSize;
  let colorBlockWeight;
  let colorBlockTextTop;
  let colorBlockIndex;

  designer = this.designers.pick(desid);
  projects = designer.projects;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = projects.length;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  boxMargin = <%% 13, 13, 12, 10, 2 %%>;

  requestSize = <%% 18, 18, 17, 16, 4.4 %%>;
  secondFont = <%% 2, 2, 2, 2, 1 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0 %%>;
  requestWordPaddingTop = <%% (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), 4.8 %%>;
  requestWordPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 4.6 %%>;

  baseTongPaddingBottom = <%% 4, 4, 3, 3, 20 %%>;
  mobileOuterMargin = 4;

  borderRadius = <%% 10, 10, 10, 10, 8 %%>;

  colorInfoIndent = <%% 35, 35, 35, 35, 7.2 %%>;
  colorBlockHeight = <%% 24, 24, 24, 24, 3.8 %%>;

  colorInfoPaddingLeft = <%% 17, 17, 17, 17, 3 %%>;
  colorInfoPaddingTop = <%% 11, 11, 11, 11, 1.9 %%>;
  colorInfoPaddingBottom = <%% 12, 12, 12, 12, 2.2 %%>;

  colorMarkWidth = <%% 32, 32, 32, 32, 3.2 %%>;
  colorMarkHeight = <%% 10, 10, 10, 10, 1.0 %%>;
  colorMarkBetween = <%% 7, 7, 7, 7, 0.7 %%>;

  colorBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;
  colorBlockWeight = <%% 500, 500, 500, 500, 500 %%>;

  colorBlockTextTop = <%% -1, -1, -1, -1, 0 %%>;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : (this.middleMode ? String(60) + "px" : String(0)),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: "auto",
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    }
  });

  this.requestBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    statusNumber = 0;
    if (projects[i].history.schedule.progress.start.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 1;
    }
    if (projects[i].history.schedule.progress.complete.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 2;
    }
    if (projects[i].history.schedule.progress.send.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
      statusNumber = 3;
    }

    if (/없음/gi.test(dateToString(projects[i].process.contract.form.date.from)) || /예정/gi.test(dateToString(projects[i].process.contract.form.date.from))) {
      dateString = "00.00.00";
    } else {
      dateString = dateToString(projects[i].process.contract.form.date.from).slice(2).replace(/\-/g, '.');
    }

    requestBox = createNode({
      mother: baseTong,
      event: {
        click: this.scheduleDocument(baseTong, i, designer, projects[i]),
        mouseenter: function (e) {
          this.style.transition = "";
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          const statusNumber = Number(this.getAttribute("status"));
          if (desktop) {
            this.children[0].style.background = statusColors[statusNumber].color;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      attribute: [
        { cliid: projects[i].cliid },
        { proid: projects[i].proid },
        { status: String(statusNumber) },
      ],
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginTop: String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea,
        marginRight: String(boxMargin) + ea,
        marginLeft: String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea,
        marginBottom: String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea,
        background: colorChip.white,
        boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        cursor: "pointer",
        transition: "all 0s ease",
        transform: "translateY(0px)",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            width: String(100) + '%',
            left: String(0),
            height: String(desktop ? borderRadius : 2) + ea,
            background: statusColors[statusNumber].color,
            borderTopRightRadius: String(borderRadius / 2) + "px",
            borderTopLeftRadius: String(borderRadius / 2) + "px",
          }
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: projects[i].name + " <b%고객님%b>",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              },
              bold: {
                color: colorChip.black,
                fontWeight: String(300),
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
          },
          children: [
            {
              text: dateString,
              style: {
                fontSize: String(requestSize - secondFont) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let i = 1; i < Array.from(requestBox.children).length; i++) {
      if (thisChildWidth <= requestBox.children[i].firstChild.getBoundingClientRect().width) {
        thisChildWidth = requestBox.children[i].firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    if (desktop) {
      boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));
      boxNumberArr.push(boxNumber);
    }

    this.requestBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.requestBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
        this.requestBoxes[i].style.marginTop = String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea;
        this.requestBoxes[i].style.marginLeft = String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea;
        this.requestBoxes[i].style.marginBottom = String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea;
      }
    }
  }

  colorInfo = createNode({
    mother: baseTong,
    style: {
      position: "fixed",
      background: colorChip.white,
      bottom: String(belowHeight + colorInfoIndent) + ea,
      right: desktop ? String(colorInfoIndent) + ea : "",
      left: mobile ? String(colorInfoIndent) + ea : "",
      boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
      borderRadius: String(5) + "px",
      opacity: String(0),
      animation: "fadeuplite 0.5s ease 0.3s forwards",
      paddingTop: String(colorInfoPaddingTop) + ea,
      paddingBottom: String(colorInfoPaddingBottom) + ea,

    }
  });

  createNode({
    mother: colorInfo,
    attribute: {
      index: String(-1),
    },
    style: {
      display: "flex",
      flexDirection: "row",
      width: String(100) + '%',
      height: String(colorBlockHeight) + ea,
      alignItems: "center",
    },
    children: [
      {
        style: {
          marginLeft: String(colorInfoPaddingLeft) + ea,
          marginRight: String(colorMarkBetween) + ea,
          display: "inline-block",
          width: String(colorMarkWidth) + ea,
          height: String(colorMarkHeight) + ea,
          background: colorChip.black,
          borderRadius: String(1) + "px",
        }
      },
      {
        text: "전체",
        attribute: {
          index: String(-1),
        },
        event: {
          click: function (e) {
            let num;

            num = 0;
            for (let box of instance.requestBoxes) {
              if (num % boxNumber === 0) {
                box.style.marginLeft = String(boxMargin * 1.5) + ea;
              } else {
                box.style.marginLeft = String(0) + ea;
              }
              box.style.display = "inline-block";
              num++;
            }
          }
        },
        class: [ "hoverDefault_lite" ],
        style: {
          display: "inline-block",
          position: "relative",
          top: String(colorBlockTextTop) + ea,
          fontSize: String(colorBlockSize) + ea,
          fontWeight: String(colorBlockWeight),
          color: colorChip.black,
          marginRight: String(colorInfoPaddingLeft) + ea,
        }
      }
    ]
  });

  colorBlockIndex = 0;
  for (let { color, name } of statusColors) {
    createNode({
      mother: colorInfo,
      attribute: {
        index: String(colorBlockIndex),
      },
      style: {
        display: "flex",
        flexDirection: "row",
        width: String(100) + '%',
        height: String(colorBlockHeight) + ea,
        alignItems: "center",
      },
      children: [
        {
          style: {
            marginLeft: String(colorInfoPaddingLeft) + ea,
            marginRight: String(colorMarkBetween) + ea,
            display: "inline-block",
            width: String(colorMarkWidth) + ea,
            height: String(colorMarkHeight) + ea,
            background: color,
            borderRadius: String(1) + "px",
          }
        },
        {
          text: name,
          attribute: {
            index: String(colorBlockIndex),
          },
          event: {
            click: function (e) {
              const statusIndex = Number(this.getAttribute("index"));
              let num;

              num = 0;
              for (let box of instance.requestBoxes) {
                if (Number(box.getAttribute("status")) === statusIndex) {
                  if (num % boxNumber === 0) {
                    box.style.marginLeft = String(boxMargin * 1.5) + ea;
                  } else {
                    box.style.marginLeft = String(0) + ea;
                  }
                  box.style.display = "inline-block";
                  num++;
                } else {
                  box.style.display = "none";
                }
              }
            }
          },
          class: [ "hoverDefault_lite" ],
          style: {
            display: "inline-block",
            position: "relative",
            top: String(colorBlockTextTop) + ea,
            fontSize: String(colorBlockSize) + ea,
            fontWeight: String(colorBlockWeight),
            color: colorChip.black,
            marginRight: String(colorInfoPaddingLeft) + ea,
          }
        }
      ]
    });
    colorBlockIndex++;
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.scheduleDocument = function (mother, index, designer, project) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, serviceParsing, setQueue, swipePatch } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const blocks = mother.children;
  this.proid = null;
  this.project = null;
  this.client = null;
  return async function (e) {
    try {
      const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });
      let clientHistory, projectHistory;
      let thisBlock, motherTop;
      let visualSpecific;
      let requestNumber, thisRequest;
      let site;
      let construct;
      let styling;
      let budget;
      let progress;

      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (project.proposal.date.valueOf() >= client.requests[i].request.timeline.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      thisRequest = client.requests[requestNumber];

      clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory", { equal: true });
      projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory", { equal: true });

      if (desktop) {

        mother.style.height = String(mother.getBoundingClientRect().height) + ea;
        motherTop = mother.getBoundingClientRect().top;

        visualSpecific = <%% 1, 1, 1, 0, 0 %%>;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.transition = "all 0s ease";
          blocks[i].setAttribute("top", String(Math.floor(blocks[i].getBoundingClientRect().top - mother.getBoundingClientRect().top)) + ea);
          blocks[i].setAttribute("left", String(Math.floor(blocks[i].getBoundingClientRect().left - Math.ceil(mother.getBoundingClientRect().left))) + ea);
          if (i !== index) {
            blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
          } else {
            thisBlock = blocks[i];
            thisBlock.style.transform = "";
            for (let dom of blocks[i].children) {
              dom.style.opacity = String(0);
            }
          }
        }

        for (let block of blocks) {
          block.style.position = "absolute";
          block.style.margin = String(0);
          block.style.left = block.getAttribute("left");
          block.style.top = block.getAttribute("top");
        }

      } else {
        motherTop = 3.8;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
          if (i === index) {
            thisBlock = blocks[i];
          }
        }
      }

      setQueue(() => {
        if (desktop) {
          thisBlock.style.boxShadow = "";
          thisBlock.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
          thisBlock.style.transition = "all 0.4s ease";
          thisBlock.style.position = "absolute";
          thisBlock.style.left = String(0);
          thisBlock.style.top = String(0);
          thisBlock.style.width = String(100) + '%';
          thisBlock.style.height = String(100) + '%';
        } else {
          for (let block of blocks) {
            block.style.position = "absolute";
          }
        }

        mother.parentElement.style.height = withOut(motherTop, ea);
        if (mobile) {
          mother.parentElement.style.left = String(0);
          mother.parentElement.style.width = String(100) + '%';
          mother.parentElement.style.paddingTop = "";
        }
        mother.style.boxShadow = "";
        mother.style.paddingBottom = "";
        mother.style.paddingTop = String(motherTop) + ea;
        mother.style.height = withOut(motherTop, ea);
        mother.style.overflow = "scroll";

        setQueue(async () => {
          try {
            mother.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
            const board = createNode({
              mother,
              style: {
                position: "relative",
                left: String(motherTop) + ea,
                width: withOut(motherTop * 2, ea),
                height: String(8000) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.white,
                animation: "fadeupdelay 0.4s ease forwards",
                boxShadow: "0px 3px 15px -10px " + colorChip.shadow,
                zIndex: String(1),
                marginBottom: String(motherTop) + ea,
              }
            });
            await instance.scheduleContents(board, designer, project, client, clientHistory, projectHistory, requestNumber);
            if (mobile) {
              mother.style.marginBottom = "";
            }

            if (mobile) {
              swipePatch({
                right: (e) => {
                  instance.scheduleDetailLaunching(desid);
                },
              });
            }

            instance.pageHistory.unshift({ path: "schedule", status: "card", desid, cliid });
            window.history.pushState({ path: "schedule", status: "list", desid }, '');

          } catch (e) {
            console.log(e);
          }
        }, 500);

      }, 400);

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.scheduleChildrenParse = async function () {
  const instance = this;
  const { taskBlocks, ea, proid } = this;
  const {
    base,
    start,
    end,
    title,
    description,
    color
  } = this.classNames;
  const { stringToDate, colorCalendar } = GeneralJs;
  try {
    let children;

    children = [];
    for (let block of taskBlocks) {
      children.push({
        date: {
          start: stringToDate(block.querySelector('.' + start).getAttribute("value")),
          end: stringToDate(block.querySelector('.' + end).getAttribute("value"))
        },
        contents: {
          title: block.querySelector('.' + title).getAttribute("value"),
          description: block.querySelector('.' + description).getAttribute("value"),
          color: block.querySelector('.' + color).getAttribute("value")
        }
      });
    }

    colorCalendar(document.querySelector(".contentsArea").lastChild, children);
    await this.scheduleChildrenUpdate(proid, children);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.scheduleChildrenUpdate = async function (proid, children) {
  if (typeof proid !== "string" || !Array.isArray(children)) {
    console.log(proid, children);
    throw new Error("invaild input");
  }
  const instance = this;
  try {
    const { ajaxJson } = GeneralJs;
    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));

    await ajaxJson({
      method: "project",
      id: proid,
      column: "schedule.children",
      value: children,
      email: cookies.homeliaisonConsoleLoginedEmail
    }, "/updateHistory").catch((err) => { console.log(err); });

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.scheduleContents = async function (board, designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, stringToDate, autoComma, serviceParsing, getDateMatrix, cleanChildren, uniqueValue, setQueue, blankHref, colorCalendar } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  this.proid = proid;
  this.client = client;
  this.project = project;
  const today = new Date();
  const totalStatic = this.scheduleReturnStatic(designer, project, client, clientHistory, projectHistory, requestNumber);
  const {
    title,
    initialContents,
  } = totalStatic;
  const classNames = this.classNames;
  try {
    let titleArea;
    let contentsArea;
    let topMargin;
    let leftMargin;
    let titleHeight;
    let titleSize;
    let titleBottom;
    let titlePaddingBottom;
    let fontSize;
    let titleDateVisualBottom;
    let width;
    let tempDom;
    let lineHeight;
    let finalBottom;
    let num;
    let blockArea;
    let blockFactor;
    let blockOuterPadding;
    let blockFactorHeight;
    let blockFactorMarginBottom;
    let blockWhite0, blockWhite1, blockWhite2;
    let blockInnerMargin;
    let blockSecondRatio;
    let numberSize, numberTextTop, numberWeight;
    let dateStart, dateEnd;
    let dateSize, dateWeight;
    let dateTop, dateLeft, dateBottom, datePadding, dateTop2;
    let dateCalendarWidth, dateCalendarIndent;
    let dateLineBottom;
    let wordingTitle, wordingDescription;
    let barColor;
    let colorBarWidth, colorBarVisual;
    let wordingSize, wordingLeft, wordingWeight0, wordingWeight1, wordingTop;
    let descriptionPaddingLeft, descriptionPaddingRight, descriptionPaddingTop, descriptionPaddingBottom;
    let descriptionLineHeight;
    let plusSize, plusWeight, plusTextTop;
    let blockAreaMarginBottom;
    let dateMatrix;
    let tempArr;
    let block;
    let thisService;
    let scheduleTasks;
    let scheduleStart, scheduleEnd;
    let pastOrder;
    let periodArr;
    let calendarCancelBackPadding;
    let dateCalendarVisual;
    let blocksReload;
    let dragstartEvent, dragenterEvent, dragleaveEvent, dragoverEvent, dropEvent;
    let blockMake;
    let colorBoxIndent, colorBoxPadding;
    let greenButtonPaddingTop, greenButtonPaddingBottom;
    let greenButtonPaddingLeft;
    let greenButtonMargin;
    let greenButtonSize;
    let greenButtonBaseTop;
    let greenButtonBaseWidth;

    topMargin = <%% 42, 38, 32, 30, 5.8 %%>;
    leftMargin = <%% 50, 46, 38, 32, 5.8 %%>;

    titleSize = <%% 35, 33, 30, 26, 5 %%>;
    titlePaddingLeft = <%% 1, 1, 1, 1, 0 %%>;
    titleBottom = <%% 35, 29, 28, 20, 5 %%>;
    titlePaddingBottom = <%% (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), (isMac() ? 18 : 15), 3.2 %%>;
    titleDateVisualBottom = <%% (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), 0.5 %%>;

    fontSize = <%% 15, 14, 13, 12, 3 %%>;

    lineHeight = 1.7;
    finalBottom = <%% 60, 60, 60, 60, 8 %%>;

    blockOuterPadding = <%% 10, 10, 10, 10, 1.5 %%>;
    blockFactorHeight = <%% 90, 90, 90, 90, 13 %%>;
    blockInnerMargin = <%% 6, 6, 6, 6, 1 %%>;
    blockFactorMarginBottom = <%% 6, 6, 6, 6, 1.5 %%>;

    numberSize = <%% 36, 36, 36, 36, 4.8 %%>;
    numberTextTop = <%% -4, -4, -4, -4, -0.6 %%>;
    numberWeight = <%% 400, 400, 400, 400, 400 %%>;

    blockSecondRatio = <%% 2.4, 2.1, 1.8, 1.5, 2.4 %%>;
    dateSize = <%% 15, 15, 15, 14, 3.6 %%>;
    dateWeight = <%% 400, 400, 400, 400, 400 %%>;
    dateTop = <%% 11, 11, 11, 14, 2 %%>;
    dateTop2 = <%% 34, 34, 34, 34, 2 %%>;
    dateBottom = <%% dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 5 : 6), dateTop + (isMac() ? 3 : 4), dateTop %%>;
    dateLeft = <%% 18, 18, 18, 18, 4.2 %%>;
    datePadding = <%% 8, 8, 8, 8, 2 %%>;
    dateLineBottom = <%% 24.5, 24.5, 24.5, 25, 5.3 %%>;

    dateCalendarWidth = <%% 260, 260, 260, 260, 80 %%>;
    dateCalendarIndent = <%% 6, 6, 6, 6, 0 %%>;
    dateCalendarVisual = <%% 2, 2, 2, 2, 0 %%>;
    calendarCancelBackPadding = <%% 24, 24, 24, 24, 2.4 %%>;
    colorBoxIndent = <%% 12, 12, 12, 12, 12 %%>;
    colorBoxPadding = <%% 12, 12, 12, 12, 12 %%>;

    colorBarWidth = <%% 6, 6, 6, 5, 1 %%>;
    colorBarVisual = <%% 1, 1, 1, 0, 0 %%>;

    wordingSize = <%% 14, 14, 13, 12, 2.8 %%>;
    wordingLeft = <%% 34, 34, 34, 34, 8 %%>;
    wordingWeight0 = <%% 600, 600, 600, 600, 600 %%>;
    wordingWeight1 = <%% 400, 400, 400, 400, 400 %%>;
    wordingTop = <%% (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), 3.4 %%>;

    descriptionPaddingLeft = wordingLeft;
    descriptionPaddingRight = dateLeft;
    descriptionPaddingTop = <%% (isMac() ? 34 : 36), (isMac() ? 35 : 37), (isMac() ? 36 : 38), (isMac() ? 35 : 37), 8.2 %%>;
    descriptionPaddingBottom = <%% (isMac() ? 15 : 13), (isMac() ? 14 : 12), (isMac() ? 13 : 11), (isMac() ? 14 : 12), 3.8 %%>;
    descriptionLineHeight = 1.5;

    plusSize = <%% 48, 48, 48, 48, 4.8 %%>;
    plusWeight = <%% 500, 500, 500, 500, 500 %%>;
    plusTextTop = <%% -5, -5, -5, -5, -5 %%>;

    blockAreaMarginBottom = <%% 50, 50, 50, 50, 5 %%>;

    greenButtonPaddingTop = <%% (isMac() ? 6 : 7), (isMac() ? 6 : 7), (isMac() ? 6 : 7), (isMac() ? 6 : 7), 1.5 %%>;
    greenButtonPaddingBottom = <%% (isMac() ? 8 : 7), (isMac() ? 8 : 7), (isMac() ? 8 : 7), (isMac() ? 8 : 7), 2 %%>;
    greenButtonPaddingLeft = <%% 13, 13, 13, 13, 3 %%>;
    greenButtonMargin = <%% 4, 4, 4, 4, 1 %%>;
    greenButtonSize = <%% 13, 13, 12, 11, 3 %%>;
    greenButtonBaseTop = <%% 8, 8, 8, 8, 2 %%>;
    greenButtonBaseWidth = <%% 270, 270, 270, 270, 64 %%>;

    [ thisService ] = await ajaxJson({
      whereQuery: {
        serid: project.service.serid
      }
    }, "/getServices", { equal: true });
    thisService.setting.schedule.sort((a, b) => {
      return a.order - b.order;
    });
    scheduleStart = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
    scheduleTasks = [];
    pastOrder = -1;
    periodArr = [ 0 ];
    thisService.setting.schedule.forEach((obj) => {
      const { title, description, color, order, period } = obj;
      if (pastOrder !== order) {
        periodArr.sort((a, b) => { return b - a; });
        scheduleStart.setDate(scheduleStart.getDate() + periodArr[0]);
        periodArr = [];
      }
      scheduleEnd = new Date(JSON.stringify(scheduleStart).slice(1, -1));
      scheduleEnd.setDate(scheduleEnd.getDate() + period);
      scheduleTasks.push({
        contents: { title, description, color },
        date: {
          start: new Date(JSON.stringify(scheduleStart).slice(1, -1)),
          end: scheduleEnd
        }
      });
      pastOrder = order;
      periodArr.push(period);
    });
    this.samples = scheduleTasks.map((obj) => { return obj.contents; });

    if (projectHistory.schedule.children.length < scheduleTasks.length / 2) {
      projectHistory.schedule.children = scheduleTasks;
      await this.scheduleChildrenUpdate(proid, scheduleTasks);
    }

    board.style.paddingTop = String(topMargin) + ea;

    blockArea = {};
    blocksReload = (blocksMother) => {
      const children = [ ...blocksMother.children ];
      children.pop();
      instance.taskBlocks = [];
      for (let i = 0; i < children.length; i++) {
        children[i].style.background = colorChip.gray2;
        children[i].firstChild.firstChild.textContent = String(i + 1);
        instance.taskBlocks.push(children[i]);
      }
      instance.scheduleChildrenParse().catch((err) => { console.log(err); });
    }
    dragstartEvent = function (e) {
      e.dataTransfer.setData("dragData", this.id);
    }
    dragenterEvent = function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.style.background = colorChip.whiteGreen;
      if (this.previousElementSibling !== null) {
        this.previousElementSibling.style.background = colorChip.whiteGreen;
      }
    }
    dragleaveEvent = function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.style.background = colorChip.gray2;
      if (this.previousElementSibling !== null) {
        this.previousElementSibling.style.background = colorChip.gray2;
      }
    }
    dragoverEvent = function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.style.background = colorChip.whiteGreen;
      if (this.previousElementSibling !== null) {
        this.previousElementSibling.style.background = colorChip.whiteGreen;
      }
    }
    dropEvent = function (e) {
      e.stopPropagation();
      e.preventDefault();
      const from = document.getElementById(e.dataTransfer.getData("dragData"));
      from.style.background = colorChip.gray2;
      this.style.background = colorChip.gray2;
      if (this.previousElementSibling !== null) {
        this.previousElementSibling.style.background = colorChip.gray2;
      }
      this.parentNode.insertBefore(from, this);
      blocksReload(this.parentNode);
    }
    blockMake = (i, dateStart, dateEnd, wordingTitle, wordingDescription, barColor) => {
      blockFactor = createNode({
        mother: blockArea,
        id: uniqueValue("hex"),
        class: [ classNames.base ],
        attribute: {
          draggable: "true",
        },
        event: {
          dragstart: dragstartEvent,
          dragenter: dragenterEvent,
          dragleave: dragleaveEvent,
          dragover: dragoverEvent,
          drop: dropEvent
        },
        style: {
          display: "block",
          position: "relative",
          padding: String(blockOuterPadding) + ea,
          width: withOut(blockOuterPadding * 2, ea),
          borderRadius: String(5) + "px",
          background: colorChip.gray2,
          marginBottom: String(blockFactorMarginBottom) + ea,
        }
      });
      blockWhite0 = createNode({
        mother: blockFactor,
        class: [ "hoverDefault_lite" ],
        event: {
          contextmenu: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.confirm("해당 항목을 삭제하시겠습니까?")) {
              const baseMother = this.parentNode.parentNode;
              baseMother.removeChild(this.parentNode);
              blocksReload(baseMother);
            }
          }
        },
        style: {
          verticalAlign: "top",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
          height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          marginRight: String(blockInnerMargin) + ea,
        },
        children: [
          {
            text: String(i + 1),
            style: {
              position: "relative",
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              fontFamily: "graphik",
              top: String(numberTextTop) + ea,
              color: colorChip.black,
            }
          }
        ]
      });
      blockWhite1 = createNode({
        mother: blockFactor,
        style: {
          verticalAlign: "top",
          display: "inline-block",
          position: "relative",
          width: desktop ? String((blockFactorHeight - (blockOuterPadding * 2)) * blockSecondRatio) + ea : withOut(blockFactorHeight - (blockOuterPadding * 2) + blockInnerMargin, ea),
          height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          marginRight: desktop ? String(blockInnerMargin) + ea : "",
        },
        children: [
          {
            style: {
              position: "absolute",
              width: withOut(dateLeft * 2, ea),
              bottom: String(dateLineBottom) + ea,
              left: String(dateLeft) + ea,
              borderBottom: "1px solid " + colorChip.green,
            }
          },
          {
            text: dateStart,
            class: [ classNames.start ],
            attribute: {
              value: String(20) + dateStart.replace(/\. /gi, "-"),
            },
            event: {
              click: function (e) {
                if (desktop) {
                  const dateStart = stringToDate(this.getAttribute("value"));
                  const thisBox = this.getBoundingClientRect();
                  const self = this;
                  let calendarBase, calendarCancelBack;

                  this.style.color = colorChip.green;
                  calendarCancelBack = createNode({
                    mother: self.parentElement,
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.style.color = colorChip.black;
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(calendarCancelBackPadding * -1) + ea,
                      left: String(calendarCancelBackPadding * -1) + ea,
                      width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      background: "transparent",
                      zIndex: String(1),
                    }
                  });
                  calendarBase = createNode({
                    mother: self.parentElement,
                    event: {
                      click: (e) => { e.stopPropagation() },
                      contextmenu: (e) => { e.stopPropagation() },
                    },
                    style: {
                      position: "absolute",
                      width: String(dateCalendarWidth) + ea,
                      transition: "all 0s ease",
                      background: colorChip.white,
                      borderRadius: String(5) + "px",
                      zIndex: String(1),
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      animation: "fadeuphard 0.3s ease forwards",
                      top: String(dateTop + thisBox.height + dateCalendarIndent) + ea,
                      left: String(dateLeft + ((thisBox.width - datePadding) / 2) - (dateCalendarWidth / 2) - dateCalendarVisual) + ea,
                    }
                  });
                  const calendar = instance.mother.makeCalendar(dateStart, async function (e) {
                    try {
                      e.stopPropagation();
                      const thisDate = stringToDate(this.getAttribute("buttonValue"));
                      const updatedString = dateToString(thisDate).replace(/-/gi, ". ").slice(2);
                      self.setAttribute("value", dateToString(thisDate));
                      self.textContent = updatedString;
                      instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                      self.parentElement.removeChild(self.parentElement.lastChild);
                      self.parentElement.removeChild(self.parentElement.lastChild);
                      self.style.color = colorChip.black;
                    } catch (e) {
                      console.log(e);
                    }
                  });
                  calendarBase.appendChild(calendar.calendarBase);
                } else {
                  const thisBox = this.getBoundingClientRect();
                  const thisValue = this.getAttribute("value");
                  const self = this;
                  let calendarBase, calendarCancelBack;
                  let greenInput;

                  self.parentElement.parentElement.setAttribute("draggable", "false");

                  calendarCancelBack = createNode({
                    mother: self.parentElement,
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.parentElement.parentElement.setAttribute("draggable", "true");
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(calendarCancelBackPadding * -1) + ea,
                      left: String(calendarCancelBackPadding * -1) + ea,
                      width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      background: "transparent",
                      zIndex: String(1),
                    }
                  });

                  greenInput = createNode({
                    mother: self.parentElement,
                    mode: "input",
                    attribute: {
                      type: "text",
                    },
                    event: {
                      keypress: function (e) {
                        if (e.key === "Enter") {
                          this.value = this.value.trim().replace(/[\"\=\&\+]/gi, '');
                          if (/^[0-9][0-9](\. |\.|\-| )[0-9][0-9](\. |\.|\-| )[0-9][0-9]$/.test(this.value)) {
                            const numberArr = this.value.replace(/(\. |\.|\-| )/g, '-').split('-');
                            if (numberArr.length === 3) {
                              self.textContent = `${numberArr[0]}. ${numberArr[1]}. ${numberArr[2]}`;
                              self.setAttribute("value", `20${numberArr[0]}-${numberArr[1]}-${numberArr[2]}`);
                              instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                              self.parentElement.parentElement.setAttribute("draggable", "true");
                              self.parentElement.removeChild(self.parentElement.lastChild);
                              self.parentElement.removeChild(self.parentElement.lastChild);
                            } else {
                              window.alert("yy-mm-dd의 형식으로 적어주세요!");
                              this.value = self.textContent;
                              self.focus();
                            }
                          } else {
                            window.alert("yy-mm-dd의 형식으로 적어주세요!");
                            this.value = self.textContent;
                            self.focus();
                          }
                        }
                      }
                    },
                    style: {
                      position: "absolute",
                      fontSize: String(dateSize) + ea,
                      fontWeight: String(dateWeight),
                      fontFamily: "graphik",
                      color: colorChip.green,
                      top: String(dateTop) + ea,
                      left: String(dateLeft) + ea,
                      background: colorChip.white,
                      width: String(thisBox.width) + "px",
                      outline: String(0),
                      border: String(0),
                      zIndex: String(1),
                    }
                  });

                  greenInput.value = this.textContent;
                  greenInput.focus();
                }
              }
            },
            style: {
              position: "absolute",
              fontSize: String(dateSize) + ea,
              fontWeight: String(dateWeight),
              fontFamily: "graphik",
              color: colorChip.black,
              top: String(dateTop) + ea,
              left: String(dateLeft) + ea,
              background: colorChip.white,
              paddingRight: String(datePadding) + ea,
              cursor: "pointer",
            }
          },
          {
            text: dateEnd,
            class: [ classNames.end ],
            attribute: {
              value: String(20) + dateEnd.replace(/\. /gi, "-"),
            },
            event: {
              click: function (e) {
                if (desktop) {
                  const dateEnd = stringToDate(this.getAttribute("value"));
                  const thisBox = this.getBoundingClientRect();
                  const self = this;
                  let calendarBase, calendarCancelBack;

                  this.style.color = colorChip.green;
                  calendarCancelBack = createNode({
                    mother: self.parentElement,
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.style.color = colorChip.black;
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(calendarCancelBackPadding * -1) + ea,
                      left: String(calendarCancelBackPadding * -1) + ea,
                      width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      background: "transparent",
                      zIndex: String(1),
                    }
                  });
                  calendarBase = createNode({
                    mother: self.parentElement,
                    event: {
                      click: (e) => { e.stopPropagation() },
                      contextmenu: (e) => { e.stopPropagation() },
                    },
                    style: {
                      position: "absolute",
                      width: String(dateCalendarWidth) + ea,
                      transition: "all 0s ease",
                      background: colorChip.white,
                      borderRadius: String(5) + "px",
                      zIndex: String(1),
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      animation: "fadeuphard 0.3s ease forwards",
                      top: String(dateTop2 + thisBox.height + dateCalendarIndent) + ea,
                      right: String(dateLeft + ((thisBox.width - datePadding) / 2) - (dateCalendarWidth / 2) - dateCalendarVisual) + ea,
                    }
                  });
                  const calendar = instance.mother.makeCalendar(dateEnd, async function (e) {
                    try {
                      e.stopPropagation();
                      const thisDate = stringToDate(this.getAttribute("buttonValue"));
                      const updatedString = dateToString(thisDate).replace(/-/gi, ". ").slice(2);
                      self.setAttribute("value", dateToString(thisDate));
                      self.textContent = updatedString;
                      instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                      self.parentElement.removeChild(self.parentElement.lastChild);
                      self.parentElement.removeChild(self.parentElement.lastChild);
                      self.style.color = colorChip.black;
                    } catch (e) {
                      console.log(e);
                    }
                  });
                  calendarBase.appendChild(calendar.calendarBase);
                } else {
                  const thisBox = this.getBoundingClientRect();
                  const thisValue = this.getAttribute("value");
                  const self = this;
                  let calendarBase, calendarCancelBack;
                  let greenInput;

                  self.parentElement.parentElement.setAttribute("draggable", "false");

                  calendarCancelBack = createNode({
                    mother: self.parentElement,
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.parentElement.parentElement.setAttribute("draggable", "true");
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(calendarCancelBackPadding * -1) + ea,
                      left: String(calendarCancelBackPadding * -1) + ea,
                      width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      background: "transparent",
                      zIndex: String(1),
                    }
                  });

                  greenInput = createNode({
                    mother: self.parentElement,
                    mode: "input",
                    attribute: {
                      type: "text",
                    },
                    event: {
                      keypress: function (e) {
                        if (e.key === "Enter") {
                          this.value = this.value.trim().replace(/[\"\=\&\+]/gi, '');
                          if (/^[0-9][0-9](\. |\.|\-| )[0-9][0-9](\. |\.|\-| )[0-9][0-9]$/.test(this.value)) {
                            const numberArr = this.value.replace(/(\. |\.|\-| )/g, '-').split('-');
                            if (numberArr.length === 3) {
                              self.textContent = `${numberArr[0]}. ${numberArr[1]}. ${numberArr[2]}`;
                              self.setAttribute("value", `20${numberArr[0]}-${numberArr[1]}-${numberArr[2]}`);
                              instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                              self.parentElement.parentElement.setAttribute("draggable", "true");
                              self.parentElement.removeChild(self.parentElement.lastChild);
                              self.parentElement.removeChild(self.parentElement.lastChild);
                            } else {
                              window.alert("yy-mm-dd의 형식으로 적어주세요!");
                              this.value = self.textContent;
                              self.focus();
                            }
                          } else {
                            window.alert("yy-mm-dd의 형식으로 적어주세요!");
                            this.value = self.textContent;
                            self.focus();
                          }
                        }
                      }
                    },
                    style: {
                      position: "absolute",
                      fontSize: String(dateSize) + ea,
                      fontWeight: String(dateWeight),
                      fontFamily: "graphik",
                      color: colorChip.green,
                      top: String(dateTop2) + ea,
                      right: String(dateLeft) + ea,
                      background: colorChip.white,
                      width: String(thisBox.width) + "px",
                      paddingLeft: String(datePadding) + ea,
                      outline: String(0),
                      border: String(0),
                      zIndex: String(1),
                    }
                  });

                  greenInput.value = this.textContent;
                  greenInput.focus();
                }
              }
            },
            style: {
              position: "absolute",
              fontSize: String(dateSize) + ea,
              fontWeight: String(dateWeight),
              fontFamily: "graphik",
              color: colorChip.black,
              top: String(dateTop2) + ea,
              right: String(dateLeft) + ea,
              background: colorChip.white,
              paddingLeft: String(datePadding) + ea,
              cursor: "pointer",
            }
          },
        ]
      });
      blockWhite2 = createNode({
        mother: blockFactor,
        style: {
          verticalAlign: "top",
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? withOut(((blockFactorHeight - (blockOuterPadding * 2)) * (1 + blockSecondRatio) + (blockInnerMargin * 2) + descriptionPaddingLeft + descriptionPaddingRight), ea) : "",
          paddingTop: String(descriptionPaddingTop) + ea,
          paddingLeft: String(descriptionPaddingLeft) + ea,
          paddingRight: String(descriptionPaddingRight) + ea,
          paddingBottom: String(descriptionPaddingBottom) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          marginTop: mobile ? String(blockInnerMargin) + ea : "",
        },
        children: [
          {
            attribute: {
              value: barColor,
            },
            event: {
              click: function (e) {
                if (desktop) {
                  const thisBox = this.getBoundingClientRect();
                  const self = this;
                  let colorBoxBase, colorBoxCancelBack;

                  colorBoxCancelBack = createNode({
                    mother: self.parentElement,
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(calendarCancelBackPadding * -1) + ea,
                      left: String(calendarCancelBackPadding * -1) + ea,
                      width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                      background: "transparent",
                      zIndex: String(1),
                    }
                  });

                  colorBoxBase = createNode({
                    mother: self.parentElement,
                    event: {
                      click: (e) => { e.stopPropagation() },
                      contextmenu: (e) => { e.stopPropagation() },
                    },
                    style: {
                      position: "absolute",
                      width: String(dateCalendarWidth) + ea,
                      transition: "all 0s ease",
                      background: colorChip.white,
                      borderRadius: String(5) + "px",
                      zIndex: String(1),
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      animation: "fadeuphard 0.3s ease forwards",
                      top: String(dateTop + thisBox.height + colorBoxIndent) + ea,
                      left: String(dateLeft + ((thisBox.width) / 2) - ((dateCalendarWidth + (colorBoxPadding * 2)) / 2)) + ea,
                      padding: String(colorBoxPadding) + ea,
                    }
                  });

                  for (let i = 0; i < instance.colors.length; i++) {
                    createNode({
                      mother: colorBoxBase,
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: String(dateCalendarWidth / 10) + ea,
                        height: String(dateCalendarWidth / 10) + ea,
                      },
                      children: [
                        {
                          class: [ "hoverDefault_lite" ],
                          attribute: { value: instance.colors[i] },
                          event: {
                            click: function (e) {
                              const thisColor = this.getAttribute("value");
                              const blocksMother = this.parentElement.parentElement.parentElement.parentElement.parentElement;
                              e.preventDefault();
                              e.stopPropagation();
                              self.style.background = thisColor;
                              self.setAttribute("value", thisColor);
                              self.parentElement.removeChild(self.parentElement.lastChild);
                              self.parentElement.removeChild(self.parentElement.lastChild);
                              blocksReload(blocksMother);
                            }
                          },
                          style: {
                            position: "relative",
                            display: "inline-block",
                            width: String(80) + '%',
                            height: String(80) + '%',
                            background: instance.colors[i],
                            borderRadius: String(2) + "px",
                          }
                        }
                      ]
                    });
                  }
                }
              }
            },
            class: [ classNames.color, "hoverDefault_lite" ],
            style: {
              position: "absolute",
              left: String(dateLeft) + ea,
              top: String((desktop ? dateBottom : 4.2)) + ea,
              width: String(colorBarWidth) + ea,
              height: withOut(((desktop ? dateBottom : 4.4) * 2) + colorBarVisual, ea),
              borderRadius: String(colorBarWidth) + ea,
              background: barColor,
            }
          },
          {
            text: wordingTitle,
            attribute: {
              value: wordingTitle.replace(/[\"\=\&\+]/gi, ''),
            },
            event: {
              click: function (e) {
                const thisBox = this.getBoundingClientRect();
                const thisValue = this.getAttribute("value");
                const self = this;
                let calendarBase, calendarCancelBack;
                let greenBase;

                self.parentElement.parentElement.setAttribute("draggable", "false");

                calendarCancelBack = createNode({
                  mother: self.parentElement,
                  event: {
                    click: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      self.parentElement.parentElement.setAttribute("draggable", "true");
                      self.parentElement.removeChild(self.parentElement.lastChild);
                      self.parentElement.removeChild(self.parentElement.lastChild);
                    }
                  },
                  style: {
                    position: "fixed",
                    top: String(calendarCancelBackPadding * -1) + ea,
                    left: String(calendarCancelBackPadding * -1) + ea,
                    width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                    height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                    background: "transparent",
                    zIndex: String(1),
                  }
                });

                greenBase = createNode({
                  mother: self.parentElement,
                  style: {
                    position: "absolute",
                    left: String(wordingLeft) + ea,
                    top: String(wordingTop + wordingSize + greenButtonBaseTop) + ea,
                    width: String(greenButtonBaseWidth) + ea,
                    zIndex: String(1),
                  }
                });

                for (let { title, description } of instance.samples) {
                  createNode({
                    mother: greenBase,
                    text: title,
                    attribute: { title, description },
                    event: {
                      click: function (e) {
                        const title = this.getAttribute("title");
                        const description = this.getAttribute("description");
                        self.textContent = title;
                        self.nextElementSibling.firstChild.textContent = description;
                        self.setAttribute("value", title);
                        self.nextElementSibling.firstChild.setAttribute("value", description);
                        instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                        self.parentElement.parentElement.parentElement.setAttribute("draggable", "true");
                        self.parentElement.removeChild(self.parentElement.lastChild);
                        self.parentElement.removeChild(self.parentElement.lastChild);
                      }
                    },
                    style: {
                      display: "inline-block",
                      paddingTop: String(greenButtonPaddingTop) + ea,
                      paddingBottom: String(greenButtonPaddingBottom) + ea,
                      paddingLeft: String(greenButtonPaddingLeft) + ea,
                      paddingRight: String(greenButtonPaddingLeft) + ea,
                      marginRight: String(greenButtonMargin) + ea,
                      marginBottom: String(greenButtonMargin) + ea,
                      fontSize: String(greenButtonSize) + ea,
                      fontWeight: String(wordingWeight0),
                      color: colorChip.white,
                      background: colorChip.gradientGreen3,
                      borderRadius: String(5) + "px",
                      animation: "fadeuphard 0.3s ease forwards",
                      cursor: "pointer",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                    }
                  });
                }

              }
            },
            class: [ classNames.title ],
            style: {
              position: "absolute",
              left: String(wordingLeft) + ea,
              top: String(wordingTop) + ea,
              fontSize: String(wordingSize) + ea,
              fontWeight: String(wordingWeight0),
              color: colorChip.black,
              cursor: "pointer",
            }
          },
          {
            style: {
              position: "relative",
              width: String(100) + '%',
              height: String(100) + '%',
              background: "transparent",
            },
            children: [
              {
                text: wordingDescription,
                attribute: {
                  value: wordingDescription.replace(/[\"\=\&\+]/gi, ''),
                },
                event: {
                  click: function (e) {
                    const thisBox = this.getBoundingClientRect();
                    const thisValue = this.getAttribute("value");
                    const self = this;
                    let calendarBase, calendarCancelBack;
                    let greenInput;

                    self.parentElement.parentElement.parentElement.setAttribute("draggable", "false");

                    calendarCancelBack = createNode({
                      mother: self.parentElement,
                      event: {
                        click: function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          self.parentElement.parentElement.parentElement.setAttribute("draggable", "true");
                          self.parentElement.removeChild(self.parentElement.lastChild);
                          self.parentElement.removeChild(self.parentElement.lastChild);
                        }
                      },
                      style: {
                        position: "fixed",
                        top: String(calendarCancelBackPadding * -1) + ea,
                        left: String(calendarCancelBackPadding * -1) + ea,
                        width: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                        height: "calc(100% + " + String(calendarCancelBackPadding * 2) + ea + ")",
                        background: "transparent",
                        zIndex: String(1),
                      }
                    });

                    greenInput = createNode({
                      mother: self.parentElement,
                      mode: "textarea",
                      attribute: {
                        type: "text",
                      },
                      event: {
                        keypress: function (e) {
                          if (e.key === "Enter") {
                            this.value = this.value.trim().replace(/[\"\=\&\+]/gi, '');
                            self.textContent = this.value;
                            self.setAttribute("value", this.value);
                            instance.scheduleChildrenParse().catch((err) => { console.log(err); });
                            self.parentElement.parentElement.parentElement.setAttribute("draggable", "true");
                            self.parentElement.removeChild(self.parentElement.lastChild);
                            self.parentElement.removeChild(self.parentElement.lastChild);
                          }
                        }
                      },
                      style: {
                        position: "absolute",
                        left: String(0) + ea,
                        top: String(0) + ea,
                        fontSize: String(wordingSize) + ea,
                        fontWeight: String(wordingWeight1),
                        width: withOut(0, ea),
                        height: String(thisBox.height) + "px",
                        outline: String(0),
                        border: String(0),
                        zIndex: String(1),
                        color: colorChip.green,
                        background: colorChip.white,
                        lineHeight: String(descriptionLineHeight),
                      }
                    });

                    greenInput.value = thisValue;
                    greenInput.focus();
                  }
                },
                class: [ classNames.description ],
                style: {
                  fontSize: String(wordingSize) + ea,
                  fontWeight: String(wordingWeight1),
                  color: colorChip.black,
                  lineHeight: String(descriptionLineHeight),
                }
              }
            ]
          }
        ]
      });
      return blockFactor;
    }

    // title area
    titleArea = createNode({
      mother: board,
      style: {
        marginLeft: String(leftMargin) + ea,
        paddingLeft: String(titlePaddingLeft) + ea,
        width: withOut((leftMargin * 2) + titlePaddingLeft, ea),
        borderBottom: "1px solid " + colorChip.gray3,
        marginBottom: String(titleBottom) + ea,
        paddingBottom: String(titlePaddingBottom) + ea,
        position: "relative",
      },
      children: [
        {
          text: title,
          style: {
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          text: serviceParsing(project.service),
          class: [ "hoverDefault_lite" ],
          event: {
            click: (e) => { e.preventDefault(); }
          },
          style: {
            position: "absolute",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            right: String(titlePaddingLeft) + ea,
            textAlign: "right",
            bottom: String(titlePaddingBottom - titleDateVisualBottom) + ea,
          }
        }
      ]
    });

    // contents base
    contentsArea = createNode({
      mother: board,
      class: [ "contentsArea" ],
      style: {
        position: "relative",
        marginLeft: String(leftMargin) + ea,
        width: withOut(leftMargin * 2, ea),
      },
      children: [
        {
          text: initialContents,
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(lineHeight),
            marginBottom: String(titleBottom) + ea,
          },
          bold: {
            fontWeight: String(600),
            color: colorChip.black,
          },
          under: {
            fontWeight: String(600),
            color: colorChip.green,
            cursor: "pointer",
          },
        }
      ]
    });
    contentsArea.querySelectorAll("b")[contentsArea.querySelectorAll("b").length - 1].addEventListener("click", function (e) {
      blankHref(this.textContent);
    });

    // task blocks
    blockArea = createNode({
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockAreaMarginBottom) + ea,
      }
    });
    this.taskBlocks = [];
    for (let i = 0; i < projectHistory.schedule.children.length; i++) {
      ({ date: { start: dateStart, end: dateEnd }, contents: { title: wordingTitle, description: wordingDescription, color: barColor } } = projectHistory.schedule.children[i]);
      dateStart = dateToString(dateStart).replace(/-/gi, ". ").slice(2);
      dateEnd = dateToString(dateEnd).replace(/-/gi, ". ").slice(2);
      this.taskBlocks.push(blockMake(i, dateStart, dateEnd, wordingTitle, wordingDescription, barColor));
    }
    if (desktop) {
      blockFactor = createNode({
        mother: blockArea,
        style: {
          verticalAlign: "top",
          display: "block",
          position: "relative",
          padding: String(blockOuterPadding) + ea,
          width: withOut(blockOuterPadding * 2, ea),
          height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray2,
        },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            event: {
              click: function (e) {
                const children = [ ...this.parentElement.parentElement.children ];
                children.pop();

                const index = Number(children[children.length - 1].firstChild.firstChild.textContent) - 1;
                const lastDate = stringToDate(children[children.length - 1].querySelector('.' + classNames.end).getAttribute("value"));
                let startDate, endDate;

                startDate = dateToString(lastDate)
                lastDate.setDate(lastDate.getDate() + 7);
                endDate = dateToString(lastDate)

                startDate = startDate.replace(/-/gi, ". ").slice(2);
                endDate = endDate.replace(/-/gi, ". ").slice(2);

                blockMake(index + 1, startDate, endDate, "작업명 입력", "작업명에 대해서 상세한 설명을 적어주세요.", colorChip.green);
                this.parentElement.parentElement.appendChild(this.parentElement);

                blocksReload(this.parentElement.parentElement);
              }
            },
            style: {
              verticalAlign: "top",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
              height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
              background: colorChip.gray3,
              borderRadius: String(5) + "px",
              marginRight: String(blockInnerMargin) + ea,
            },
            children: [
              {
                text: '+',
                style: {
                  position: "relative",
                  fontSize: String(plusSize) + ea,
                  fontWeight: String(plusWeight),
                  fontFamily: "graphik",
                  top: String(plusTextTop) + ea,
                  color: colorChip.white,
                }
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String((blockFactorHeight - (blockOuterPadding * 2)) * blockSecondRatio) + ea,
              height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
              background: colorChip.gray3,
              borderRadius: String(5) + "px",
              marginRight: String(blockInnerMargin) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut(((blockFactorHeight - (blockOuterPadding * 2)) * (1 + blockSecondRatio) + (blockInnerMargin * 2)), ea),
              height: String(blockFactorHeight - (blockOuterPadding * 2)) + ea,
              background: colorChip.gray3,
              borderRadius: String(5) + "px",
            }
          }
        ]
      });
    }

    // calendar
    createNode({
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
      }
    });
    colorCalendar(contentsArea.lastChild, projectHistory.schedule.children);

    // end
    board.style.height = "auto";
    board.style.paddingBottom = String(finalBottom) + ea;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.scheduleIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  let mother;
  let radius;
  let left, bottom;
  let left2;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 18.5, 17, 15, 6 %%>;
  left = <%% 40, 30, 25, 19, 0 %%>;
  left2 = <%% 40, 36, 36, 19, 0 %%>;
  bottom = <%% 40, 36, 30, 22, 7.2 %%>;
  margin = <%% 6, 5, 4, 4, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12, 11, 10, 3.8 %%>;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    class: [ "iconTong" ],
    style: {
      display: "block",
      position: "fixed",
      height: String(desktop ? motherHeight : (bottom + (radius * 2))) + ea,
      width: String(desktop ? grayBarWidth : (bottom + (radius * 2))) + ea,
      left: desktop ? String(0) : "",
      right: desktop ? "" : String(0),
      bottom: String(belowHeight) + ea,
      background: desktop ? colorChip.gray0 : "transparent",
      zIndex: String(2),
    }
  });

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: "calc(50% - " + String(radius * 0.45) + ea + ")",
        top: String(iconTop) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnAinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(15) + ea,
        left: String(12.5) + ea,
        top: String(11) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDecrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(9.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnMinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(16.5) + ea,
        left: String(11.5) + ea,
        top: String(11.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnIncrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(11.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnRinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(14) + ea,
        left: String(13.5) + ea,
        top: String(10.5) + ea,
      }
    },
  ]);

  listIcon = nodeArr[0];
  aInitialIcon = nodeArr[2];
  previousIcon = nodeArr[4];
  mInitialIcon = nodeArr[6];
  nextIcon = nodeArr[8];
  rInitialIcon = nodeArr[10];

  this.iconTong = mother;
  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  if (!this.middleMode) {

    listIcon.addEventListener("click", function (e) {
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
    });

    previousIcon.addEventListener("click", function (e) {
      let previousDesid, boo, thisStandard;
      previousDesid = desid;
      do {
        previousDesid = instance.designers.previous(previousDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === previousDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      instance.scheduleDetailLaunching(previousDesid);
    });

    nextIcon.addEventListener("click", function (e) {
      let nextDesid, boo, thisStandard;
      nextDesid = desid;
      do {
        nextDesid = instance.designers.next(nextDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === nextDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      instance.scheduleDetailLaunching(nextDesid);
    });

  } else {

    if (desktop) {

      listIcon.addEventListener("click", function (e) {
        const totalContents = document.getElementById("totalcontents");
        const totalMother = document.querySelector(".totalMother");
        const grayBack = totalContents.children[0];
        const listPannel = totalMother.children[0].children[0];
        const iconSetPannel = instance.iconTong;
        const mainBaseTong = instance.mainBaseTong;
        const outerMargin = Number(mainBaseTong.style.top.replace(/[^0-9\.\-]/gi, ''));

        if (grayBack.getAttribute("toggle") !== "off") {
          grayBack.style.width = String(0) + ea;
          listPannel.style.transform = "translateX(" + String((instance.grayBarWidth + instance.tabletWidth) * -1) + ea + ")";
          iconSetPannel.style.background = "transparent";
          mainBaseTong.style.left = String(outerMargin) + ea;
          mainBaseTong.style.width = withOut(outerMargin * 2, ea);
          instance.listIcon.style.left = String(left2) + ea;
          grayBack.setAttribute("toggle", "off");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) + instance.grayBarWidth) + ea;
          }
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          instance.listIcon.style.left = String(left) + ea;
          grayBack.setAttribute("toggle", "on");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) - instance.grayBarWidth) + ea;
          }
        }

      });

    } else {

      listIcon.addEventListener("click", function (e) {
        instance.mode = "request";
        instance.scheduleDetailLaunching(designer.desid);
      });

    }

    previousIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index - 1] === undefined ? targets[targets.length - 1] : targets[index - 1];
        target.click();
      }
    });

    nextIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index + 1] === undefined ? targets[0] : targets[index + 1];
        target.click();
      }
    });

  }

  rInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      window.alert("의뢰서를 선택해주세요!");
    } else {
      window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + instance.proid;
    }
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 문서가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].docs);
      }
    } catch (e) {
      console.log(e);
    }
  });

  mInitialIcon.addEventListener("contextmenu", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 폴더가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].drive);
      }
    } catch (e) {
      console.log(e);
    }
  });

  aInitialIcon.addEventListener("click", function (e) {
    if (instance.proid === null) {
      if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsole",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
            path: "dashboard",
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "schedule",
            mode: "send",
            who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    } else {
      if (window.confirm(designer.designer + " 디자이너님에게 " + instance.client.name + " 고객님 상세 일정 안내 작성 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerSchedule",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            client: instance.client.name,
            cliid: instance.client.cliid,
            host: BACKHOST.slice(8, -5),
            path: "console",
            mode: "schedule",
            date: dateToString(instance.project.process.contract.form.date.from).replace(/\-/gi, ".").slice(2),
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "schedule",
            mode: "send",
            who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
            cliid: instance.client.cliid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    }
  });

}

DesignerJs.prototype.scheduleView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[5];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            document.getElementById("totalcontents").removeChild(document.querySelector(".totalFather"));
            instance.totalFather = null;
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
          }
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.scheduleDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.scheduleDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
    }

    //standard doms event
    standardBar_mother = standardBar.cloneNode(false);
    style = {
      position: "fixed",
      height: withOut(100, belowHeight + motherHeight, ea),
      overflow: "scroll",
    };
    for (let i in style) {
      standardBar_mother.style[i] = style[i];
    }
    totalMother.insertBefore(standardBar_mother, standardBar);
    standardBar_mother.appendChild(standardBar);
    for (let i = 1; i < this.standardDoms.length; i++) {
      if (this.designers.pick(this.standardDoms[i].getAttribute("desid")) !== null) {
        this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
        this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
        this.standardDoms[i].style.transition = "all 0s ease";
        this.standardDoms[i].addEventListener("click", (e) => {
          instance.scheduleDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
        });
        children = this.standardDoms[i].children;
        childrenLength = children.length;
        for (let j = 0; j < childrenLength; j++) {
          children[j].style.color = "inherit";
          children[j].style.transition = "all 0s ease";
        }
      } else {
        this.standardDoms[i].style.display = "none";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          if (instance.pageHistory[1].status === "list") {
            instance.scheduleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else {
            instance.scheduleDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        }
      }
    });

    //launching
    this.proid = null;
    this.project = null;
    this.client = null;
    this.requestBoxes = [];
    this.scheduleDetailLaunching(this.desid, async () => {
      if (getObj.cliid !== undefined) {
        if (getObj.desid === undefined) {
          projects = await ajaxJson({ noFlat: true, whereQuery: { $and: [ { cliid: getObj.cliid }, { desid: { $regex: "^d" } } ] } }, "/getProjects");
          if (projects.length > 0) {
            instance.scheduleDetailLaunching(projects[0].desid, () => {
              for (let box of instance.requestBoxes) {
                if (box.getAttribute("cliid") === getObj.cliid) {
                  box.click();
                }
              }
            });
          }
        } else {
          for (let box of instance.requestBoxes) {
            if (box.getAttribute("cliid") === getObj.cliid) {
              box.click();
            }
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}
