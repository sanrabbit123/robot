DesignerJs.prototype.possibleDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;
  let loading;

  this.dateDoms = [];
  this.selection = [];

  // if (middleMode) {
  //   if (typeof GeneralJs.stacks["designerConsoleSseEvent"] === "function") {
  //     GeneralJs.stacks["designerConsoleSseSource"].removeEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  //     GeneralJs.stacks["designerConsoleSseSource"] = null;
  //     GeneralJs.stacks["designerConsoleSseEvent"] = null;
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"] = new EventSource("https://" + SSEHOST + ":3000/specificsse/possibleDesigner");
  //   GeneralJs.stacks["designerConsoleSseEvent"] = function (e) {
  //     instance.possibleSseParsing(GeneralJs.equalJson(e.data));
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"].addEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  // }

  if (typeof this.possiblePannelStatus !== "object" || this.possiblePannelStatus === null) {
    this.possiblePannelStatus = {
      project: false,
      numbers: false,
      doms: [],
    };
  }
  if (typeof this.possiblePannelStatus.project !== "boolean") {
    this.possiblePannelStatus.project = false;
  }
  if (typeof this.possiblePannelStatus.numbers !== "boolean") {
    this.possiblePannelStatus.numbers = false;
  }
  if (!Array.isArray(this.possiblePannelStatus.doms)) {
    this.possiblePannelStatus.doms = [];
  }
  if (typeof this.possibleConst !== "object" || this.possibleConst === null) {
    this.possibleConst = {
      futureLength: 25,
      okClassName: "okSvg",
      cancelClassName: "cancelSvg",
      numberClassName: "numberWord",
      backClassName: "backColor",
      nullClassName: "dateNullTarget",
      generalDateClassName: "dateTarget",
      weekClassName: "week",
      weekGeneralClassName: "weekGeneral",
      titleClassName: "title",
      titleGeneralName: "titleGeneral",
      joinToken: "_",
      scrollEventName: "scrollYEvent",
      scrollEventTimeout: "scrollYTimeout",
      dummyDatesClassName: "dummyDummyDate",
      daydayWords: [ "일", "월", "화", "수", "목", "금", "토" ],
      daydayLength: 7,
      serviceMatrix: [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ],
    };
  }

  if (!middleMode) {
    this.pageHistory.unshift({ path: "possible", status: "list", desid });
  }
  window.history.pushState({ path: "possible", status: "list", desid }, '');

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
      page: "possible",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.possibleIconSet(desid);
  this.mother.loadingRun().then((dom) => {
    loading = dom;
    return ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getProjects", { equal: true });
  }).then((projects) => {
    if (projects.length === 0) {
      return [];
    } else {
      instance.designers.setProjects(projects);
      return ajaxJson({
        noFlat: true,
        whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
      }, "/getClients", { equal: true });
    }
  }).then((clients) => {
    if (clients.length > 0) {
      instance.designers.setClients(clients);
    }
    return ajaxJson({
      mode: "read",
      db: "console",
      collection: "realtimeDesigner",
      whereQuery: { desid },
    }, "/generalMongo", { equal: true });
  }).then((realtimeDesigner) => {
    loading.parentNode.removeChild(loading);
    instance.possibleContents(desid, realtimeDesigner);
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

DesignerJs.prototype.possibleContents = function (desid, realtimeDesigner) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let temp;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let thisChildWidth;
  let dateString;
  let outerMargin;
  let contentsBox;
  let baseTongPaddingBottom;
  let mobileOuterMargin;

  margin = 8;
  outerMargin = <%% (margin * 3), (margin * 3), (margin * 3), (margin * 3), 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 40 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;

  baseTongPaddingBottom = 15;
  mobileOuterMargin = 4;

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(outerMargin) + ea : (this.middleMode ? String(60) + "px" : String(outerMargin)),
      left: String(grayBarWidth + (desktop ? outerMargin : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? outerMargin * 2 : mobileOuterMargin * 2), ea),
      height: "auto",
      animation: "",
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
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
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingBottom: desktop ? "" : String(baseTongPaddingBottom) + ea,
    }
  });

  contentsBox = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      top: String(outerMargin) + ea,
      marginLeft: String(outerMargin) + ea,
      marginRight: String(outerMargin) + ea,
      marginBottom: String(outerMargin * 2) + ea,
      width: withOut(outerMargin * 2, ea),
      display: "block",
    }
  });

  this.possibleMatrix(contentsBox, desid, realtimeDesigner).catch((err) => {
    console.log(err);
  });

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.possibleUpdate = async function (desid) {
  const instance = this;
  const { ajaxJson, createNode, withOut, colorChip, setQueue, equalJson, dateToString, stringToDate, sleep } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, possibleConst } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  const projects = designer.projects === undefined ? [] : designer.projects;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  try {
    const dateDoms = instance.dateDoms;
    const onDoms = dateDoms.filter((d) => { return d.getAttribute("toggle") === "on"; });
    const rawDates = onDoms.map((d) => { return new Date(d.getAttribute("value")); });
    let removeDates, tempDate, tempDate2;
    let filteredDates;
    let possible;
    let tempObj;
    let num;
    let whereQuery, updateQuery;
    let date;
    let finalPossible;
    let noneIndex;
    let length;
    let onIndex;
    let boo, tempStr, tempIndex;
    let additionalPossible;
    let additionalPossibleMatrix, additionalPossibleMatrixTemp, additionalPossibleMatrixRaw, additionalPossibleMatrixPast;

    removeDates = [];
    for (let i = 1; i < rawDates.length - 1; i++) {
      tempDate = new Date(JSON.stringify(rawDates[i - 1]).slice(1, -1));
      tempDate2 = new Date(JSON.stringify(rawDates[i + 1]).slice(1, -1));
      tempDate.setDate(tempDate.getDate() + 1);
      tempDate2.setDate(tempDate2.getDate() - 1);
      if (dateToString(tempDate) === dateToString(rawDates[i]) && dateToString(tempDate2) === dateToString(rawDates[i])) {
        removeDates.push(dateToString(rawDates[i]));
      }
    }

    onDoms.sort((a, b) => { return (new Date(a.getAttribute("value"))).valueOf() - (new Date(b.getAttribute("value"))).valueOf(); });
    filteredDates = onDoms.filter((d, index) => { const boo = !removeDates.includes(dateToString(new Date(d.getAttribute("value")))); if (boo) { d.setAttribute("onindex", String(index)); } return boo; });

    possible = [];
    tempObj = {};
    for (let dom of filteredDates) {
      onIndex = Number(dom.getAttribute("onindex"));
      date = new Date(dom.getAttribute("value"));
      tempDate = new Date(JSON.stringify(date).slice(1, -1));
      tempDate.setDate(tempDate.getDate() + 1);
      if (removeDates.includes(dateToString(tempDate))) {
        tempObj.start = date;
        tempObj.startIndex = onIndex;
      } else {
        if (tempObj.start === undefined) {
          tempObj.start = date;
          tempObj.startIndex = onIndex;
        }
        tempObj.end = date;
        tempObj.endIndex = onIndex;
        tempObj.totalMatrix = [];
        for (let i = tempObj.startIndex; i < tempObj.endIndex + 1; i++) {
          tempObj.totalMatrix.push(equalJson(onDoms[i].getAttribute("matrix")));
        }
        tempObj.matrix = equalJson(dom.getAttribute("matrix"));
        possible.push(tempObj);
        tempObj = {};
      }
    }

    noneIndex = [];
    for (let i = 0; i < possible.length - 1; i++) {
      if (dateToString(possible[i].start) === dateToString(possible[i].end)) {
        if (dateToString(possible[i + 1].start) === dateToString(possible[i + 1].end)) {
          tempDate = new Date(JSON.stringify(possible[i].start).slice(1, -1));
          tempDate.setDate(tempDate.getDate() + 1);
          if (dateToString(tempDate) === dateToString(possible[i + 1].start)) {
            possible[i].end = new Date(JSON.stringify(possible[i + 1].end).slice(1, -1));
            noneIndex.push(i + 1);
          }
        }
      }
    }

    finalPossible = [];
    length = possible.length;
    for (let i = 0; i < length; i++) {
      if (!noneIndex.includes(i)) {
        finalPossible.push(possible[i]);
      }
    }

    finalPossible = finalPossible.filter((obj) => { return obj.matrix.length > 0; });
    finalPossible = finalPossible.filter((obj) => { return obj.matrix.reduce((acc, current) => { return acc + current }) !== 0; });

    additionalPossible = [];
    for (let obj of finalPossible) {
      tempStr = JSON.stringify(obj.matrix);
      boo = !obj.totalMatrix.every((arr) => { return JSON.stringify(arr) === tempStr });
      if (boo) {
        additionalPossibleMatrixRaw = obj.totalMatrix.map((arr) => { return JSON.stringify(arr); });
        additionalPossibleMatrix = [];
        additionalPossibleMatrixPast = null;
        additionalPossibleMatrixTemp = null;
        for (let i = 0; i < additionalPossibleMatrixRaw.length; i++) {
          if (additionalPossibleMatrixRaw[i] !== additionalPossibleMatrixPast) {
            if (Array.isArray(additionalPossibleMatrixTemp)) {
              additionalPossibleMatrixTemp.push(i - 1);
              additionalPossibleMatrix.push(additionalPossibleMatrixTemp);
            }
            additionalPossibleMatrixTemp = [];
            additionalPossibleMatrixTemp.push(i);
          }
          additionalPossibleMatrixPast = additionalPossibleMatrixRaw[i];
        }
        if (Array.isArray(additionalPossibleMatrixTemp)) {
          additionalPossibleMatrixTemp.push(additionalPossibleMatrixRaw.length - 1);
          additionalPossibleMatrix.push(additionalPossibleMatrixTemp);
        }
        for (let [ start, end ] of additionalPossibleMatrix) {
          if (equalJson(onDoms[obj.startIndex + start].getAttribute("matrix")).reduce((acc, current) => { return acc + current }) !== 0) {
            additionalPossible.push({
              start: new Date(onDoms[obj.startIndex + start].getAttribute("value")),
              end: new Date(onDoms[obj.startIndex + end].getAttribute("value")),
              matrix: equalJson(onDoms[obj.startIndex + start].getAttribute("matrix"))
            });
          }
        }
      }
      obj.removeTarget = boo;
    }

    finalPossible = finalPossible.filter((obj) => { return !obj.removeTarget; }).map((obj) => { return { start: obj.start, end: obj.end, matrix: obj.matrix }; }).concat(additionalPossible);
    finalPossible.sort((a, b) => { return a.start.valueOf() - b.start.valueOf(); });

    whereQuery = { desid };
    updateQuery = { possible: finalPossible };

    await ajaxJson({
      mode: "update",
      db: "console",
      collection: "realtimeDesigner",
      whereQuery,
      updateQuery,
    }, "/generalMongo", { equal: true });

    instance.realtimeDesigner.possible = finalPossible;

    ajaxJson({
      mode: "sse",
      db: "console",
      collection: "sse_possibleDesigner",
      log: true,
      who: (instance.middleMode ? instance.designer.information.phone : JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
      updateQuery: {
        desid,
        type: "possible",
        possible: finalPossible
      }
    }, "/generalMongo").then(() => {
      return ajaxJson({
        page: "possible",
        mode: "update",
        who: (instance.middleMode ? instance.designer.information.phone : JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
        update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
        desid,
      }, "/ghostDesigner_updateAnalytics");
    }).catch((err) => {
      console.log(err);
    });

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.possibleMatrix = async function (mother, desid, realtimeDesigner) {
  const instance = this;
  const { ajaxJson, createNode, withOut, colorChip, getDateMatrix, findByAttribute, setQueue, setDebounce, equalJson, dateToString, stringToDate, isMac, swipePatch, sleep } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, possibleConst } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  const projects = designer.projects === undefined ? [] : designer.projects;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const now = new Date();
  const nowValue = now.valueOf();
  const between = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const { futureLength, okClassName, cancelClassName, numberClassName, backClassName, nullClassName, generalDateClassName, weekClassName, weekGeneralClassName, titleClassName, titleGeneralName, joinToken, scrollEventName, scrollEventTimeout, dummyDatesClassName, daydayWords, daydayLength, serviceMatrix } = possibleConst;
  try {
    let magin, outerMargin;
    let dateMatrix;
    let map;
    let size;
    let tempObj;
    let block;
    let titleField, matrixField;
    let titleWidth;
    let titlePaddingLeft;
    let titlePaddingRight;
    let titleLineHeight;
    let weekBlock;
    let weekBlockHeight;
    let num;
    let blockMarginBottom;
    let dateBox;
    let dateNumberSize, dateNumberTop, dateNumberLeft;
    let dateIconTop, dateIconWidth, dateIconRight;
    let pastBoo;
    let weekBlocks;
    let removeTargets;
    let children, length;
    let weekTotalLength;
    let firstBlock;
    let tempArr;
    let titleTargets;
    let firstMother;
    let topMap;
    let daydayField;
    let daydayMargin;
    let daydaySize, daydayTextTop;
    let daydayBarTop, daydayBarBottom;
    let daydayIndent;
    let functionPannel;
    let functionPannelBottom;
    let functionPannelRight;
    let functionPannelWidth;
    let functionPannelBlockHeight;
    let functionPannelSize;
    let functionPannelLeft;
    let functionPannelTextTop0;
    let functionPannelTextTop1;
    let functionPannelPaddingTop;
    let functionPannelPaddingBottom;
    let functionPannelContents;
    let allSvgs, tempSvg;
    let dateBoxOpacity;
    let clientPopupWordPadding;
    let clientPopupWordPaddingTop, clientPopupWordPaddingBottom;
    let clientPopupWordPaddingHeightPadding;
    let clientPopupWordSize;
    let clientPopupTopMargin;
    let from, to, doingArr, doingBooArr;
    let updateQuery;
    let tempDate, keyName;
    let updateBoo;
    let targetDom;
    let pannelDom, pannelDoms;
    let projectPannel, calendarPannel;
    let daydayVisualLeft;
    let titleMobileIndent, titleMobileMarginBottom;
    let sizeVisual;
    let blockPaddingTop, blockBarBottom;
    let daydayFieldTop;
    let dateNumberWidth;
    let motherPaddingTop;
    let daydayBlockHeight;
    let monthSize;
    let mobileOuterMargin;

    this.desid = desid;
    this.designer = designer;

    if (realtimeDesigner.length === 0) {

      updateQuery = { desid };
      updateQuery.possible = [];
      updateQuery.projects = [];
      for (let project of projects) {
        updateQuery.projects.push({ proid: project.proid, meeting: [ project.process.contract.meeting.date ], project: [ { start: project.process.contract.form.date.from, end: project.process.contract.form.date.to } ] });
      }
      realtimeDesigner = updateQuery;

      ajaxJson({
        mode: "create",
        db: "console",
        collection: "realtimeDesigner",
        updateQuery,
      }, "/generalMongo", { equal: true }).catch((err) => { console.log(err); });

    } else {

      [ realtimeDesigner ] = realtimeDesigner;
      delete realtimeDesigner._id;
      realtimeDesigner.projects = [];
      for (let project of projects) {
        realtimeDesigner.projects.push({ proid: project.proid, meeting: [ project.process.contract.meeting.date ], project: [ { start: project.process.contract.form.date.from, end: project.process.contract.form.date.to } ] });
      }
      updateQuery = equalJson(JSON.stringify(realtimeDesigner));
      ajaxJson({
        mode: "update",
        db: "console",
        collection: "realtimeDesigner",
        whereQuery: { desid },
        updateQuery,
      }, "/generalMongo", { equal: true }).catch((err) => { console.log(err); });

    }

    this.realtimeDesigner = realtimeDesigner;

    firstBlock = {};
    allSvgs = [];

    margin = 8;
    outerMargin = <%% (margin * 3), (margin * 3), (margin * 3), (margin * 3), 2.5 %%>;

    dateBoxOpacity = 0.08;

    motherPaddingTop = <%% 80, 72, 64, 56, 14 %%>;

    monthSize = <%% 23, 23, 21, 20, 3.6 %%>;
    size = <%% 15, 15, 14, 13, 3.6 %%>;
    sizeVisual = <%% 7, 7, 6, 5, 0.6 %%>;
    titleWidth = <%% 130, 120, 120, 80, 0 %%>;
    titlePaddingLeft = <%% 5, 5, 3, 1, 0.1 %%>;
    titlePaddingRight = <%% 50, 50, 30, 18, 5 %%>;
    titleLineHeight = 1.55;
    titleMobileIndent = <%% 3, 3, 2, 2, 0.5 %%>;
    titleMobileMarginBottom = <%% 14, 13, 12, 11, 2 %%>;

    weekBlockHeight = <%% 80, 76, 64, 56, 8.6 %%>;
    daydayBlockHeight = <%% 60, 57, 50, 42, 8.6 %%>;

    blockPaddingTop = 5;
    blockMarginBottom = <%% 36, 36, 32, 24, 12 %%>;
    blockBarBottom = 2.7;

    dateNumberSize = <%% 17, 15, 14, 12, 2.9 %%>;
    dateNumberTop = <%% 23, 22, 18, 16, 1.5 %%>;
    dateNumberLeft = <%% 23, 18, 15, 12, 0 %%>;
    dateNumberWidth = <%% 60, 56, 50, 42, 0 %%>;

    dateIconTop = <%% 26, 25.5, 20, 19, 4 %%>;
    dateIconWidth = <%% 20, 17, 16, 13, 5 %%>;
    dateIconRight = <%% 24, 18, 15, 12, 4 %%>;

    daydayFieldTop = <%% (outerMargin * 2), (outerMargin * 2), (outerMargin * 2), (outerMargin * 2), 21 %%>;
    daydayMargin = <%% 20, 20, 20, 20, 4 %%>;
    daydaySize = <%% 16, 16, 14, 13, 3.2 %%>;
    daydayTextTop = <%% (isMac() ? 16 : 18), (isMac() ? 16 : 18), 12, 10, 1.5 %%>;
    daydayBarTop = <%% 16, 16, 16, 16, 2 %%>;
    daydayBarBottom = <%% 18, 18, 18, 18, 2 %%>;
    daydayIndent = <%% 7, 7, 7, 7, 0.8 %%>;
    daydayVisualLeft = <%% 1, 1, 1, 1, 0 %%>;

    functionPannelBottom = <%% 36, 36, 36, 36, 6 %%>;
    functionPannelRight = <%% 10, 10, 10, 10, 3 %%>;
    functionPannelWidth = <%% 150, 150, 150, 150, 14 %%>;

    functionPannelPaddingTop = <%% 12, 12, 9, 9, 6 %%>;
    functionPannelPaddingBottom = <%% 12, 12, 12, 12, 6 %%>;

    functionPannelBlockHeight = <%% 24, 24, 22, 20, 5 %%>;
    functionPannelSize = <%% 14, 14, 13, 12, 3 %%>;
    functionPannelLeft = <%% 18, 18, 18, 18, 4 %%>;
    functionPannelTextTop0 = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0 %%>;
    functionPannelTextTop1 = <%% 3, 3, 3, 3, 0 %%>;

    clientPopupWordPadding = <%% 18, 18, 18, 18, 1 %%>;
    clientPopupWordPaddingTop = <%% 8, 8, 8, 8, 1 %%>;
    clientPopupWordPaddingBottom = <%% 12, 12, 12, 12, 1 %%>;
    clientPopupWordPaddingHeightPadding = <%% 1.5, 1.5, 1.5, 1.5, 0 %%>;
    clientPopupWordSize = <%% 14, 14, 14, 14, 2.8 %%>;
    clientPopupTopMargin = <%% 7, 7, 7, 7, 1 %%>;

    mobileOuterMargin = 4;

    functionPannelContents = [
      {
        name: "프로젝트 보기",
        attribute: {
          toggle: "off",
        },
        event: async function (e) {
          const toggle = this.getAttribute("toggle");
          const dateDoms = instance.dateDoms;
          const projects = designer.projects.filter((p) => { return /^[대진]/.test(p.process.status); });
          try {
            let start, end;
            let target, targets, targets2;
            let tempStr, dom;
            let clientsArr;
            if (toggle === "off") {

              if (instance.possiblePannelStatus.numbers) {
                if (instance.possiblePannelStatus.doms.length === 2) {
                  instance.possiblePannelStatus.doms[1].click();
                  await sleep(1500);
                }
              }

              targets2 = [];
              for (let svg of allSvgs) {
                svg.style.opacity = String(0);
                svg.parentElement.children[0].style.background = colorChip.white;
                svg.parentElement.children[1].style.color = colorChip.black;
                svg.parentElement.children[1].querySelector('b').style.color = colorChip.black;
                svg.setAttribute("mode", "projects");
                if ([ 0, 6 ].includes(Number(svg.parentElement.getAttribute("index")))) {
                  targets2.push(svg.parentElement.children[1]);
                }
              }

              setQueue(() => {
                for (let { name, process: { status, contract: { form: { date: { from, to } } } } } of projects) {
                  if (from.valueOf() <= to.valueOf()) {

                    tempStr = String(JSON.stringify(from));

                    start = new Date(JSON.stringify(from).slice(1, -1));
                    end = new Date(JSON.stringify(to).slice(1, -1));
                    end.setDate(end.getDate() + 1);
                    targets = [];
                    while (start.valueOf() < end.valueOf()) {
                      target = findByAttribute(dateDoms, [ "year", "month", "date" ], [ start.getFullYear(), start.getMonth() + 1, start.getDate() ]);
                      if (target !== null) {
                        targets.push(target);
                      }
                      start.setDate(start.getDate() + 1);
                    }

                    for (let dom of targets) {
                      if (dom.getAttribute("past") !== "true") {
                        dom.firstChild.style.background = colorChip.green;
                        if (dom.firstChild.hasAttribute("projects")) {
                          dom.firstChild.setAttribute("projects", String(Number(dom.firstChild.getAttribute("projects")) + 1));
                        } else {
                          dom.firstChild.setAttribute("projects", String(1));
                        }
                        if (dom.firstChild.hasAttribute("clients")) {
                          clientsArr = GeneralJs.equalJson(dom.firstChild.getAttribute("clients"));
                          clientsArr.push(`${name} (${status})`);
                          dom.firstChild.setAttribute("clients", JSON.stringify(clientsArr));
                        } else {
                          dom.firstChild.setAttribute("clients", JSON.stringify([ `${name} (${status})` ]));
                        }
                        dom.firstChild.style.background = colorChip.green;
                        dom.querySelector("aside").style.opacity = String(1);
                        if (desktop) {
                          dom.querySelector("aside").textContent = dom.firstChild.getAttribute("projects");
                        } else {
                          dom.querySelector("aside").parentElement.children[1].style.opacity = String(0);
                          dom.querySelector("aside").textContent = dom.firstChild.getAttribute("projects") + " Prj";
                        }
                        dom.firstChild.style.opacity = String(dateBoxOpacity * Number(dom.firstChild.getAttribute("projects")));
                      }
                    }

                  }
                }
                setQueue(() => {
                  for (let dom of targets2) {
                    dom.style.color = colorChip.darkGreen;
                    dom.querySelector('b').style.color = colorChip.darkGreen;
                  }
                }, 900);
              }, 301);

              this.lastChild.textContent = "on";
              this.firstChild.style.color = colorChip.green;
              this.lastChild.style.color = colorChip.green;
              this.setAttribute("toggle", "on");
              instance.possiblePannelStatus.project = true;

            } else {

              setQueue(() => {
                let targets2, dom;
                targets2 = [];
                for (let svg of allSvgs) {
                  dom = svg.parentElement;
                  dom.querySelector("aside").textContent = String(0);
                  dom.firstChild.style.opacity = String(dateBoxOpacity);
                  dom.firstChild.setAttribute("projects", String(0));
                  dom.firstChild.setAttribute("clients", JSON.stringify([]));
                  dom.children[1].style.opacity = String(1);
                  if (dom.getAttribute("toggle") === "on") {
                    dom.firstChild.style.background = colorChip.green;
                    if (svg.getAttribute("kind") === "ok") {
                      svg.style.opacity = String(1);
                    } else {
                      svg.style.opacity = String(0);
                    }
                    dom.children[1].style.color = colorChip.green;
                    dom.children[1].querySelector('b').style.color = colorChip.green;
                  } else {
                    dom.firstChild.style.background = colorChip.white;
                    if (svg.getAttribute("kind") === "ok") {
                      svg.style.opacity = String(0);
                    } else {
                      svg.style.opacity = String(1);
                    }
                  }
                  if ([ 0, 6 ].includes(Number(dom.getAttribute("index")))) {
                    targets2.push(dom.children[1]);
                  }
                }
                setQueue(() => {
                  for (let dom of targets2) {
                    dom.style.color = colorChip.red;
                    dom.querySelector('b').style.color = colorChip.red;
                  }
                }, 900);
              }, 301);

              for (let svg of allSvgs) {
                svg.setAttribute("mode", "possible");
                dom = svg.parentElement;
                dom.querySelector("aside").style.opacity = String(0);
              }

              this.lastChild.textContent = "off";
              this.firstChild.style.color = colorChip.black;
              this.lastChild.style.color = colorChip.red;
              this.setAttribute("toggle", "off");
              instance.possiblePannelStatus.project = false;

            }
          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "가능수 보기",
        attribute: {
          toggle: this.possiblePannelStatus.numbers ? "on" : "off"
        },
        event: async function (e) {
          const toggle = this.getAttribute("toggle");
          const dateDoms = instance.dateDoms;
          try {
            let target, targets, targets2;
            let tempStr, dom;
            if (toggle === "off") {

              if (instance.possiblePannelStatus.project) {
                if (instance.possiblePannelStatus.doms.length === 2) {
                  instance.possiblePannelStatus.doms[0].click();
                  await sleep(1500);
                }
              }

              targets2 = [];
              for (let svg of allSvgs) {
                svg.style.opacity = String(0);
                svg.parentElement.children[0].style.background = colorChip.white;
                svg.parentElement.children[1].style.color = colorChip.black;
                svg.parentElement.children[1].querySelector('b').style.color = colorChip.black;
                svg.setAttribute("mode", "numbers");
                if ([ 0, 6 ].includes(Number(svg.parentElement.getAttribute("index")))) {
                  targets2.push(svg.parentElement.children[1]);
                }
              }

              setQueue(() => {
                targets = [];
                for (let dom of dateDoms) {
                  if (equalJson(dom.getAttribute("matrix")).length > 0) {
                    targets.push(dom);
                  }
                }

                for (let dom of targets) {
                  if (dom.getAttribute("past") !== "true") {
                    dom.firstChild.style.background = colorChip.green;
                    dom.querySelector("aside").style.opacity = String(1);
                    if (mobile) {
                      dom.querySelector("aside").parentElement.children[1].style.opacity = String(0);
                    }
                    dom.querySelector("aside").textContent = equalJson(dom.getAttribute("matrix")).reduce((acc, current) => { return (acc >= current ? acc : current); });
                  }
                }
                setQueue(() => {
                  for (let dom of targets2) {
                    dom.style.color = colorChip.darkGreen;
                    dom.querySelector('b').style.color = colorChip.darkGreen;
                  }
                }, 900);
              }, 301);

              this.lastChild.textContent = "on";
              this.firstChild.style.color = colorChip.green;
              this.lastChild.style.color = colorChip.green;
              this.setAttribute("toggle", "on");
              instance.possiblePannelStatus.numbers = true;

            } else {

              setQueue(() => {
                let targets2, dom;
                targets2 = [];
                for (let svg of allSvgs) {
                  dom = svg.parentElement;
                  dom.querySelector("aside").textContent = String(0);
                  dom.firstChild.style.opacity = String(dateBoxOpacity);
                  dom.children[1].style.opacity = String(1);
                  if (dom.getAttribute("toggle") === "on") {
                    dom.firstChild.style.background = colorChip.green;
                    if (svg.getAttribute("kind") === "ok") {
                      svg.style.opacity = String(1);
                    } else {
                      svg.style.opacity = String(0);
                    }
                    dom.children[1].style.color = colorChip.green;
                    dom.children[1].querySelector('b').style.color = colorChip.green;
                  } else {
                    dom.firstChild.style.background = colorChip.white;
                    if (svg.getAttribute("kind") === "ok") {
                      svg.style.opacity = String(0);
                    } else {
                      svg.style.opacity = String(1);
                    }
                  }
                  if ([ 0, 6 ].includes(Number(dom.getAttribute("index")))) {
                    targets2.push(dom.children[1]);
                  }
                }
                setQueue(() => {
                  for (let dom of targets2) {
                    dom.style.color = colorChip.red;
                    dom.querySelector('b').style.color = colorChip.red;
                  }
                }, 900);
              }, 301);

              for (let svg of allSvgs) {
                svg.setAttribute("mode", "possible");
                dom = svg.parentElement;
                dom.querySelector("aside").style.opacity = String(0);
              }

              this.lastChild.textContent = "off";
              this.firstChild.style.color = colorChip.black;
              this.lastChild.style.color = colorChip.red;
              this.setAttribute("toggle", "off");
              instance.possiblePannelStatus.numbers = false;

            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    ];

    dateMatrix = getDateMatrix(now.getFullYear(), now.getMonth());

    map = [];
    for (let i = 0; i < futureLength; i++) {
      tempObj = {};
      tempObj.year = dateMatrix.getYearString();
      tempObj.month = dateMatrix.getMonthString();
      tempObj.matrix = dateMatrix.returnSundayMatrix();
      tempObj.doing = 0;
      tempObj.standing = 0;
      for (let project of projects) {
        from = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        to = new Date(JSON.stringify(project.process.contract.form.date.to).slice(1, -1));
        doingBooArr = [];
        while (from.valueOf() <= to.valueOf()) {
          doingBooArr.push(from.getFullYear() === dateMatrix.year && from.getMonth() === dateMatrix.month);
          from.setDate(from.getDate() + 1);
        }
        if (doingBooArr.some((i) => { return i; })) {
          if (project.process.status === "대기") {
            tempObj.standing = tempObj.standing + 1;
          } else {
            tempObj.doing = tempObj.doing + 1;
          }
        }
      }
      map.push(tempObj);
      dateMatrix = dateMatrix.nextMatrix();
    }

    mother.style.paddingTop = String(motherPaddingTop) + ea;

    this.dateDoms = [];
    this.titleFields = [];
    weekBlocks = [];
    num = 0;
    for (let { year, month, matrix, doing, standing } of map) {
      block = createNode({
        mother,
        style: {
          position: "relative",
          display: "block",
          verticalAlign: "top",
          paddingBottom: String(blockMarginBottom) + ea,
          paddingTop: String(desktop ? daydayMargin : blockPaddingTop) + ea,
        }
      });
      if (num === 0) {
        firstMother = block;
        daydayField = createNode({
          mother: block,
          style: {
            position: "fixed",
            width: withOut(grayBarWidth + (outerMargin * 4) + (daydayIndent * 2) + (desktop ? 0 : mobileOuterMargin * 2), ea),
            height: String(daydayBlockHeight) + ea,
            background: colorChip.white,
            top: String(daydayFieldTop + (desktop ? 0 : mobileOuterMargin)) + ea,
            left: String(grayBarWidth + (outerMargin * 2) + daydayVisualLeft + daydayIndent + (desktop ? 0 : mobileOuterMargin)) + ea,
            boxSizing: "border-box",
            zIndex: String(1),
            borderRadius: String(50) + ea,
            boxShadow: desktop ? "0px 3px 14px -9px " + colorChip.shadow : "0px 2px 14px -9px " + colorChip.shadow,
            opacity: String(0.95),
          }
        });
        this.fixTargets.push(daydayField);
        for (let i = 0; i < daydayLength; i++) {
          createNode({
            mother: daydayField,
            style: {
              display: "inline-block",
              width: (i !== 0 && i !== 6 ? "calc(calc(100% + " + String(daydayIndent * 2) + ea + ") / 7)" : "calc(calc(calc(100% + " + String(daydayIndent * 2) + ea + ") / 7) - " + String(daydayIndent) + ea + ")"),
              height: String(100) + '%',
              position: "relative",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  width: String(100) + '%',
                  top: String(daydayBarTop) + ea,
                  height: withOut(daydayBarTop + daydayBarBottom, ea),
                  borderRight: (i !== 6 ? "1px solid " + colorChip.gray3 : ""),
                }
              },
              {
                text: daydayWords[i],
                style: {
                  position: "absolute",
                  top: String(daydayTextTop) + ea,
                  width: String(100) + '%',
                  textAlign: "center",
                  fontSize: String(daydaySize) + ea,
                  fontWeight: String(600),
                  color: colorChip[(i === 0 || i === 6 ? "red" : "black")],
                }
              }
            ]
          });
        }
        pannelDoms = [];
        if (desktop) {
          functionPannel = createNode({
            mother: block,
            style: {
              position: "fixed",
              bottom: String(belowHeight + functionPannelBottom) + ea,
              right: String((outerMargin * 2) + functionPannelRight) + ea,
              width: String(functionPannelWidth) + ea,
              height: "auto",
              background: colorChip.white,
              zIndex: String(1),
              borderRadius: String(5) + ea,
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              opacity: String(0.95),
              paddingTop: String(functionPannelPaddingTop) + ea,
              paddingBottom: String(functionPannelPaddingBottom) + ea,
            }
          });
          this.possiblePannelStatus.doms = [];
          for (let { name, attribute, event } of functionPannelContents) {
            pannelDom = createNode({
              mother: functionPannel,
              class: [ "hoverDefault_lite" ],
              attribute,
              events: [
                {
                  type: "click",
                  event,
                }
              ],
              style: {
                position: "relative",
                display: "block",
                width: String(100) + '%',
                height: String(functionPannelBlockHeight) + ea,
              },
              children: [
                {
                  text: name,
                  style: {
                    position: "absolute",
                    fontSize: String(functionPannelSize) + ea,
                    fontWeight: String(600),
                    color: attribute.toggle === "off" ? colorChip.black : colorChip.green,
                    left: String(functionPannelLeft) + ea,
                    top: String(functionPannelTextTop0) + ea,
                  }
                },
                {
                  text: attribute.toggle,
                  style: {
                    position: "absolute",
                    fontSize: String(functionPannelSize) + ea,
                    fontWeight: String(300),
                    fontFamily: "graphik",
                    color: attribute.toggle === "off" ? colorChip.red : colorChip.green,
                    right: String(functionPannelLeft) + ea,
                    top: String(functionPannelTextTop1) + ea,
                  }
                }
              ]
            });
            pannelDoms.push(pannelDom);
            this.possiblePannelStatus.doms.push(pannelDom);
          }
        }
      }

      titleField = createNode({
        mother: block,
        class: [
          titleGeneralName,
          [ titleClassName, year.replace(/[^0-9]/g, ''), month.replace(/[^0-9]/g, '') ].join(joinToken)
        ],
        attribute: [
          { year: year.replace(/[^0-9]/g, '') },
          { month: month.replace(/[^0-9]/g, '') },
        ],
        style: {
          position: "relative",
          display: "block",
          width: desktop ? String(100) + '%' : withOut(outerMargin * 4, ea),
          marginLeft: desktop ? "" : String(outerMargin * 2) + ea,
          marginBottom: String(titleMobileMarginBottom) + ea,
          height: String(100) + '%',
          verticalAlign: "top"
        },
        children: [
          {
            attribute: [
              { year: year.replace(/[^0-9]/g, '') },
              { month: month.replace(/[^0-9]/g, '') },
            ],
            text: `${year} ${month}<u%진행중 ${doing}${between}대기 ${standing}%u>`,
            events: [
              {
                type: "selectstart",
                event: (e) => { e.preventDefault(); }
              },
            ],
            style: {
              position: "relative",
              left: String(titleMobileIndent) + ea,
              fontSize: String(monthSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
              lineHeight: String(titleLineHeight),
              cursor: "pointer",
            },
            bold: {
              fontSize: String(monthSize - sizeVisual) + ea,
              fontWeight: String(200),
              color: colorChip.deactive,
              lineHeight: String(titleLineHeight),
            },
            under: {
              position: "absolute",
              top: String(sizeVisual + (desktop ? 3 : 0)) + ea,
              right: String(titleMobileIndent) + ea,
              fontSize: String(monthSize - sizeVisual) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(titleLineHeight),
            }
          }
        ]
      });
      matrixField = createNode({
        mother: block,
        style: {
          position: "relative",
          display: "block",
          verticalAlign: "top",
          width: desktop ? withOut(0, ea) : withOut(outerMargin * 4, ea),
          marginLeft: desktop ? "" : String(outerMargin * 2) + ea,
          height: String(100) + '%',
        }
      });
      if (num === 0) {
        firstBlock = matrixField;
      }

      for (let i = 0; i < matrix.length; i++) {
        weekBlock = createNode({
          mother: matrixField,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            height: "auto",
            boxSizing: "border-box",
            borderRadius: String(5) + "px",
            transition: "all 0.1s ease",
          }
        });
        for (let j = 0; j < daydayLength; j++) {
          if (matrix[i][j] !== null) {
            pastBoo = nowValue >= (new Date(Number(year.replace(/[^0-9]/gi, '')), Number(month.replace(/[^0-9]/gi, '')) - 1, matrix[i][j].date)).valueOf();
          }
          dateBox = createNode({
            mother: weekBlock,
            class: [ (matrix[i][j] !== null ? generalDateClassName : nullClassName) ],
            attribute: [
              { toggle: "off" },
              { year: year.replace(/[^0-9]/gi, '') },
              { month: month.replace(/[^0-9]/gi, '') },
              { date: (matrix[i][j] !== null ? String(matrix[i][j].date) : "0") },
              { value: (matrix[i][j] !== null ? JSON.stringify(new Date(Number(year.replace(/[^0-9]/gi, '')), Number(month.replace(/[^0-9]/gi, '')) - 1, matrix[i][j].date)).slice(1, -1) : "null") },
              { past: pastBoo ? "true" : "false" },
              { index: String(j) },
              { matrix: JSON.stringify([]) },
            ],
            events: [
              {
                type: "selectstart",
                event: (e) => { e.preventDefault(); }
              },
              {
                type: "click",
                event: async function (e) {
                  e.stopPropagation();
                  const self = this;
                  try {
                    const pastBoo = (this.getAttribute("past") === "true" || this.getAttribute("value") === "null");
                    if (!pastBoo) {
                      const toggle = this.getAttribute("toggle");
                      const thisDate = new Date(this.getAttribute("value"));
                      const thisOk = this.querySelector('.' + okClassName);
                      const thisCancel = this.querySelector('.' + cancelClassName);
                      const thisWords = this.querySelector('.' + numberClassName);
                      const thisMonth = this.querySelector('.' + numberClassName).querySelector('b');
                      const thisBack = this.querySelector('.' + backClassName);
                      const mode = thisOk.getAttribute("mode");
                      const defaultCount = 10;
                      let index, first, last;
                      let clients, clientTong, clientDom, widthArr;
                      let matrix, countMatrix;
                      if (mode === "possible" || mode === "numbers") {
                        if (toggle === "off") {
                          index = instance.dateDoms.findIndex((d) => { return d === self; });
                          thisBack.style.background = colorChip.green;
                          if (mode === "possible") {
                            thisWords.style.color = colorChip.green;
                            thisMonth.style.color = colorChip.green;
                            thisOk.style.opacity = String(1);
                            thisCancel.style.opacity = String(0);
                          } else {
                            this.querySelector("aside").style.opacity = String(1);
                            if (mobile) {
                              this.querySelector("aside").parentElement.children[1].style.opacity = String(0);
                            }
                            if (equalJson(this.getAttribute("matrix")).length === 0) {
                              this.querySelector("aside").textContent = String(0);
                            } else {
                              this.querySelector("aside").textContent = equalJson(this.getAttribute("matrix")).reduce((acc, current) => { return (acc >= current ? acc : current); });
                            }
                          }

                          if (instance.selection.length === 0) {
                            instance.selection.push(index);
                            this.setAttribute("toggle", "on");
                          } else {
                            matrix = designer.analytics.project.matrix.map((arr) => { return arr.some((i) => { return i === 1; }) ? 1 : 0 });
                            try {
                              countMatrix = (new Array(matrix.length)).fill(0, 0);
                              if (matrix[1] === 1) {
                                for (let i = 1; i < matrix.length - 1; i++) {
                                  if (matrix[i] === 0) {
                                    countMatrix[i] = 0;
                                  } else {
                                    countMatrix[i] = defaultCount;
                                  }
                                }
                                if (matrix[0] === 0) {
                                  countMatrix[0] = 0;
                                } else {
                                  countMatrix[0] = countMatrix[1];
                                }
                              } else {
                                for (let i = 0; i < matrix.length - 1; i++) {
                                  if (matrix[i] === 0) {
                                    countMatrix[i] = 0;
                                  } else {
                                    countMatrix[i] = defaultCount;
                                  }
                                }
                              }
                              if (countMatrix[2] >= 1 && matrix[3] === 1) {
                                countMatrix[3] = 1;
                              }

                              if (index < instance.selection[0]) {
                                first = index;
                                last = instance.selection[0];
                              } else {
                                last = index;
                                first = instance.selection[0];
                              }
                              for (let i = first; i < last + 1; i++) {
                                if (mode === "possible") {
                                  instance.dateDoms[i].querySelector('.' + okClassName).style.opacity = String(1);
                                  instance.dateDoms[i].querySelector('.' + cancelClassName).style.opacity = String(0);
                                  instance.dateDoms[i].querySelector('.' + numberClassName).style.color = colorChip.green;
                                  instance.dateDoms[i].querySelector('.' + numberClassName).querySelector('b').style.color = colorChip.green;
                                } else {
                                  instance.dateDoms[i].querySelector("aside").style.opacity = String(1);
                                  if (mobile) {
                                    instance.dateDoms[i].querySelector("aside").parentElement.children[1].style.opacity = String(0);
                                  }
                                  instance.dateDoms[i].querySelector("aside").textContent = countMatrix.reduce((acc, current) => { return (acc >= current ? acc : current); });
                                }
                                instance.dateDoms[i].querySelector('.' + backClassName).style.background = colorChip.green;
                                instance.dateDoms[i].setAttribute("toggle", "on");
                                instance.dateDoms[i].setAttribute("matrix", JSON.stringify(countMatrix));
                              }
                            } catch (e) {
                              for (let i of [ instance.selection[0], index ]) {
                                if (mode === "possible") {
                                  instance.dateDoms[i].querySelector('.' + okClassName).style.opacity = String(0);
                                  instance.dateDoms[i].querySelector('.' + cancelClassName).style.opacity = String(1);
                                  instance.dateDoms[i].querySelector('.' + numberClassName).style.color = colorChip.black;
                                  instance.dateDoms[i].querySelector('.' + numberClassName).querySelector('b').style.color = colorChip.black;
                                } else {
                                  instance.dateDoms[i].querySelector("aside").style.opacity = String(0);
                                  if (mobile) {
                                    instance.dateDoms[i].querySelector("aside").parentElement.children[1].style.opacity = String(1);
                                  }
                                  instance.dateDoms[i].querySelector("aside").textContent = String(0);
                                }
                                instance.dateDoms[i].querySelector('.' + backClassName).style.background = "transparent";
                                instance.dateDoms[i].setAttribute("toggle", "off");
                                instance.dateDoms[i].setAttribute("matrix", JSON.stringify([]));
                              }
                              instance.selection = [];
                            }
                            instance.selection = [];
                          }
                        } else {
                          if (mode === "possible") {
                            thisWords.style.color = colorChip.black;
                            thisMonth.style.color = colorChip.black;
                            thisBack.style.background = "transparent";
                            thisOk.style.opacity = String(0);
                            thisCancel.style.opacity = String(1);
                            this.querySelector("aside").style.opacity = String(0);
                            if (mobile) {
                              this.querySelector("aside").parentElement.children[1].style.opacity = String(1);
                            }
                            this.querySelector("aside").textContent = String(0);
                            this.setAttribute("toggle", "off");
                            this.setAttribute("matrix", JSON.stringify([]));
                          } else {

                            index = instance.dateDoms.findIndex((d) => { return d === self; });
                            first = index;
                            last = index;

                            while (instance.dateDoms[last].getAttribute("toggle") === "on" && instance.dateDoms[index].getAttribute("month") === instance.dateDoms[last].getAttribute("month")) {
                              last = last + 1;
                            }
                            last = last - 1;

                            while (instance.dateDoms[first].getAttribute("toggle") === "on" && instance.dateDoms[index].getAttribute("month") === instance.dateDoms[first].getAttribute("month")) {
                              first = first - 1;
                            }
                            first = first + 1;

                            instance.arrowDomTargets = [];
                            for (let i = first; i < last + 1; i++) {
                              instance.dateDoms[i].firstChild.style.background = colorChip.yellow;
                              instance.dateDoms[i].firstChild.style.opacity = String(0.16);
                              instance.arrowDomTargets.push(instance.dateDoms[i]);
                            }

                            instance.arrowDomMode = true;
                            createNode({
                              mother: document.getElementById("totalcontents"),
                              event: {
                                click: (e) => {
                                  document.getElementById("totalcontents").removeChild(document.getElementById("totalcontents").lastChild);
                                  for (let dom of instance.arrowDomTargets) {
                                    if (equalJson(dom.getAttribute("matrix")).reduce((acc, current) => { return acc + current }) === 0) {
                                      dom.firstChild.style.background = "transparent";
                                      dom.querySelector("aside").style.opacity = String(0);
                                      dom.setAttribute("toggle", "off");
                                      dom.setAttribute("matrix", "[]");
                                    } else {
                                      dom.firstChild.style.background = colorChip.green;
                                    }
                                    dom.firstChild.style.opacity = String(0.08);
                                  }
                                  instance.arrowDomMode = false;
                                  instance.arrowDomTargets = [];
                                }
                              },
                              style: {
                                position: "fixed",
                                top: String(0),
                                left: String(0),
                                width: String(100) + '%',
                                height: String(100) + '%',
                                background: "transparent",
                                zIndex: String(4),
                              }
                            });

                          }
                        }
                        await instance.possibleUpdate(desid);
                      } else if (mode === "projects") {
                        if (this.firstChild.getAttribute("clients") !== null) {
                          clients = GeneralJs.equalJson(this.firstChild.getAttribute("clients"));
                          if (clients.length > 0) {
                            createNode({
                              mother: this,
                              events: [
                                {
                                  type: [ "click", "contextmenu" ],
                                  event: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    self.removeChild(self.lastChild);
                                    self.removeChild(self.lastChild);
                                  }
                                }
                              ],
                              style: {
                                position: "fixed",
                                top: String(0),
                                left: String(0),
                                width: String(100) + '%',
                                height: String(100) + '%',
                                background: "transparent",
                                zIndex: String(2),
                              }
                            });

                            clientTong = createNode({
                              mother: this,
                              events: [
                                {
                                  type: [ "click", "contextmenu" ],
                                  event: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }
                                }
                              ],
                              style: {
                                position: "absolute",
                                bottom: String(weekBlockHeight + clientPopupTopMargin) + ea,
                                left: String(0) + ea,
                                width: String(600) + ea,
                                borderRadius: String(5) + "px",
                                background: colorChip.gradientGreen,
                                zIndex: String(2),
                                paddingTop: String(clientPopupWordPaddingTop) + ea,
                                paddingBottom: String(clientPopupWordPaddingBottom) + ea,
                                animation: "fadeuplite 0.2s ease forwards",
                                transition: "all 0s ease",
                              }
                            });

                            widthArr = [];
                            for (let client of clients) {
                              clientDom = createNode({
                                mother: clientTong,
                                text: client,
                                style: {
                                  display: "inline-block",
                                  position: "relative",
                                  fontSize: String(clientPopupWordSize) + ea,
                                  fontWeight: String(500),
                                  color: colorChip.whiteBlack,
                                  paddingLeft: String(clientPopupWordPadding) + ea,
                                  paddingRight: String(clientPopupWordPadding) + ea,
                                  paddingTop: String(clientPopupWordPaddingHeightPadding) + ea,
                                  paddingBottom: String(clientPopupWordPaddingHeightPadding) + ea,
                                }
                              });
                              widthArr.push(clientDom.getBoundingClientRect().width);
                            }

                            widthArr.sort((a, b) => { return b - a; });

                            clientTong.style.width = String(widthArr[0]) + ea;
                            clientTong.style.left = withOut(50, widthArr[0] / 2, ea);
                          }
                        }
                      }
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              {
                type: "contextmenu",
                event: async function (e) {
                  e.stopPropagation();
                  e.preventDefault();
                  const self = this;
                  try {
                    const pastBoo = (this.getAttribute("past") === "true" || this.getAttribute("value") === "null");
                    if (!pastBoo) {
                      if (window.confirm("전체 일정이 삭제됩니다. 확실한가요?")) {
                        const toggle = this.getAttribute("toggle");
                        const thisDate = new Date(this.getAttribute("value"));
                        const thisOk = this.querySelector('.' + okClassName);
                        const thisCancel = this.querySelector('.' + cancelClassName);
                        const thisWords = this.querySelector('.' + numberClassName);
                        const thisMonth = this.querySelector('.' + numberClassName).querySelector('b');
                        const thisBack = this.querySelector('.' + backClassName);
                        const mode = thisOk.getAttribute("mode");
                        let index, first, last;
                        let num;
                        let clients, clientTong, clientDom, widthArr;
                        if (mode === "possible" || mode === "numbers") {
                          index = instance.dateDoms.findIndex((d) => { return d === self; });
                          if (toggle === "on") {
                            num = 1;
                            last = index;
                            while (instance.dateDoms[index + num].getAttribute("toggle") === "on") {
                              last = index + num;
                              num++;
                            }
                            num = 1;
                            first = index;
                            while (instance.dateDoms[index - num].getAttribute("toggle") === "on") {
                              first = index - num;
                              num++;
                            }
                          } else {
                            first = index;
                            last = index;
                          }
                          for (let i = first; i < last + 1; i++) {
                            if (mode === "possible") {
                              instance.dateDoms[i].querySelector('.' + okClassName).style.opacity = String(0);
                              instance.dateDoms[i].querySelector('.' + cancelClassName).style.opacity = String(1);
                            } else {
                              instance.dateDoms[i].querySelector("aside").style.opacity = String(0);
                              if (mobile) {
                                instance.dateDoms[i].querySelector("aside").parentElement.children[1].style.opacity = String(1);
                              }
                              instance.dateDoms[i].querySelector("aside").textContent = String(0);
                            }
                            instance.dateDoms[i].querySelector('.' + numberClassName).style.color = colorChip.black;
                            instance.dateDoms[i].querySelector('.' + numberClassName).querySelector('b').style.color = colorChip.black;
                            instance.dateDoms[i].querySelector('.' + backClassName).style.background = "transparent";
                            instance.dateDoms[i].setAttribute("toggle", "off");
                            instance.dateDoms[i].setAttribute("matrix", JSON.stringify([]));
                          }
                          await instance.possibleUpdate(desid);
                        } else if (mode === "projects") {
                          if (this.firstChild.getAttribute("clients") !== null) {
                            clients = GeneralJs.equalJson(this.firstChild.getAttribute("clients"));
                            if (clients.length > 0) {
                              createNode({
                                mother: this,
                                events: [
                                  {
                                    type: [ "click", "contextmenu" ],
                                    event: function (e) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      self.removeChild(self.lastChild);
                                      self.removeChild(self.lastChild);
                                    }
                                  }
                                ],
                                style: {
                                  position: "fixed",
                                  top: String(0),
                                  left: String(0),
                                  width: String(100) + '%',
                                  height: String(100) + '%',
                                  background: "transparent",
                                  zIndex: String(2),
                                }
                              });

                              clientTong = createNode({
                                mother: this,
                                events: [
                                  {
                                    type: [ "click", "contextmenu" ],
                                    event: function (e) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }
                                  }
                                ],
                                style: {
                                  position: "absolute",
                                  bottom: String(weekBlockHeight + clientPopupTopMargin) + ea,
                                  left: String(0) + ea,
                                  width: String(600) + ea,
                                  borderRadius: String(5) + "px",
                                  background: colorChip.gradientGreen,
                                  zIndex: String(2),
                                  paddingTop: String(clientPopupWordPaddingTop) + ea,
                                  paddingBottom: String(clientPopupWordPaddingBottom) + ea,
                                  animation: "fadeuplite 0.2s ease forwards",
                                  transition: "all 0s ease",
                                }
                              });

                              widthArr = [];
                              for (let client of clients) {
                                clientDom = createNode({
                                  mother: clientTong,
                                  text: client,
                                  style: {
                                    display: "inline-block",
                                    position: "relative",
                                    fontSize: String(clientPopupWordSize) + ea,
                                    fontWeight: String(500),
                                    color: colorChip.whiteBlack,
                                    paddingLeft: String(clientPopupWordPadding) + ea,
                                    paddingRight: String(clientPopupWordPadding) + ea,
                                    paddingTop: String(clientPopupWordPaddingHeightPadding) + ea,
                                    paddingBottom: String(clientPopupWordPaddingHeightPadding) + ea,
                                  }
                                });
                                widthArr.push(clientDom.getBoundingClientRect().width);
                              }

                              widthArr.sort((a, b) => { return b - a; });

                              clientTong.style.width = String(widthArr[0]) + ea;
                              clientTong.style.left = withOut(50, widthArr[0] / 2, ea);
                            }
                          }
                        }
                      }
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
            ],
            style: {
              position: "relative",
              display: "inline-block",
              width: "calc(100% / 7)",
              height: String(weekBlockHeight) + ea,
              boxSizing: "border-box",
              borderTop: "1px solid " + colorChip.gray3,
              borderLeft: "1px solid " + colorChip.gray3,
              borderRight: (j !== daydayLength - 1 ? "" : "1px solid " + colorChip.gray3),
              borderBottom: (i !== matrix.length - 1 ? "" : "1px solid " + colorChip.gray3),
              borderRadius: String(5) + "px",
              background: (matrix[i][j] === null ? colorChip.gray0 : (pastBoo ? colorChip.gray0 : colorChip.white)),
              transition: "all 0.1s ease",
              cursor: "pointer",
            }
          });
          if (matrix[i][j] !== null) {
            createNode({
              mother: dateBox,
              class: [ backClassName ],
              attribute: [
                { projects: String(0) }
              ],
              style: {
                position: "absolute",
                top: String(0) + ea,
                left: String(0) + ea,
                width: String(100) + '%',
                height: String(100) + '%',
                background: "transparent",
                borderRadius: String(5) + "px",
                transition: "all 0s ease",
                opacity: String(dateBoxOpacity),
              }
            });
            createNode({
              mother: dateBox,
              class: [ numberClassName ],
              text: String("<b%" + month.replace(/[^0-9]/gi, '') + "%b><u% / %u>" + matrix[i][j].date),
              style: {
                position: "absolute",
                fontFamily: "graphik",
                fontSize: String(dateNumberSize) + ea,
                fontWeight: String(matrix[i][j].date === 1 ? 400 : 300),
                color: (pastBoo ? colorChip.deactive : ((j === 0 || j === 6) ? colorChip.red : colorChip.black)),
                top: String(dateNumberTop) + ea,
                left: String(dateNumberLeft) + ea,
                width: desktop ? String(dateNumberWidth) + ea : String(100) + '%',
                textAlign: desktop ? "" : "center",
              },
              bold: {
                fontSize: String(dateNumberSize) + ea,
                fontFamily: "graphik",
                fontWeight: String(matrix[i][j].date === 1 ? 400 : 300),
                color: (pastBoo ? colorChip.deactive : ((j === 0 || j === 6) ? colorChip.red : colorChip.black)),
              },
              under: {
                fontFamily: "graphik",
                fontSize: String(dateNumberSize) + ea,
                fontWeight: String(300),
                color: colorChip.gray4,
              }
            });
            tempSvg = createNode({
              mother: dateBox,
              attribute: [
                { kind: "ok" },
                { mode: "possible" }
              ],
              class: [ okClassName ],
              mode: "svg",
              source: instance.mother.returnCheckCircle(pastBoo ? colorChip.deactive : colorChip.green),
              style: {
                display: desktop ? "block" : "none",
                position: "absolute",
                top: String(dateIconTop) + ea,
                right: String(dateIconRight) + ea,
                width: String(dateIconWidth) + ea,
                opacity: String(pastBoo ? 1 : 0),
              }
            });
            if (!pastBoo) {
              allSvgs.push(tempSvg);
            }
            tempSvg = createNode({
              mother: dateBox,
              attribute: [
                { kind: "cancel" },
              ],
              class: [ cancelClassName ],
              mode: "svg",
              source: instance.mother.returnCancelCircle(pastBoo ? colorChip.deactive : colorChip.red),
              style: {
                display: desktop ? "block" : "none",
                position: "absolute",
                top: String(dateIconTop) + ea,
                right: String(dateIconRight) + ea,
                width: String(dateIconWidth) + ea,
                opacity: String(pastBoo ? 0 : 1),
              }
            });
            if (!pastBoo) {
              allSvgs.push(tempSvg);
              createNode({
                mode: "aside",
                mother: dateBox,
                text: String(0),
                style: {
                  position: "absolute",
                  fontSize: String(dateNumberSize) + ea,
                  fontWeight: String(300),
                  fontFamily: "graphik",
                  top: String(dateNumberTop) + ea,
                  right: desktop ? String(dateNumberLeft) + ea : "",
                  left: desktop ? "" : String(0) + ea,
                  width: desktop ? "" : String(100) + '%',
                  textAlign: desktop ? "right" : "center",
                  opacity: String(0),
                  color: colorChip.darkGreen
                }
              });
            }

            this.dateDoms.push(dateBox);
          }
        }
        weekBlocks.push(weekBlock);
      }

      if (num !== map.length - 1) {
        createNode({
          mother: block,
          style: {
            position: "absolute",
            bottom: String(desktop ? blockMarginBottom / 2 : blockBarBottom) + ea,
            left: String(titleWidth) + ea,
            width: withOut(titleWidth, ea),
            height: String(0),
            borderBottom: (mobile ? "1px dashed " + colorChip.gray3 : ""),
          }
        });
      }

      this.titleFields.push(titleField);
      num++;
    }

    projectPannel = createNode({
      mother,
      attribute: { toggle: "off" },
      style: { display: "none" },
      children: [ { style: { display: "none" } } ],
    });
    swipePatch({
      left: (e) => {
        functionPannelContents.find((obj) => { return /가능수 보기/gi.test(obj.name); }).event.call(projectPannel, {});
      },
      right: (e) => {
        functionPannelContents.find((obj) => { return /프로젝트 보기/gi.test(obj.name); }).event.call(projectPannel, {});
      },
    });
    this.possibleReload("possible");

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.possibleIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo } = GeneralJs;
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
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=calendar");
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
      instance.possibleDetailLaunching(previousDesid);
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
      instance.possibleDetailLaunching(nextDesid);
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
        const [ fixTarget ] = instance.fixTargets;

        if (grayBack.getAttribute("toggle") !== "off") {
          grayBack.style.width = String(0) + ea;
          listPannel.style.transform = "translateX(" + String((instance.grayBarWidth + instance.tabletWidth) * -1) + ea + ")";
          iconSetPannel.style.background = "transparent";
          mainBaseTong.style.left = String(outerMargin) + ea;
          mainBaseTong.style.width = withOut(outerMargin * 2, ea);
          grayBack.setAttribute("toggle", "off");
          instance.listIcon.style.left = String(left2) + ea;

          fixTarget.style.left = String(Number(fixTarget.style.left.replace(/[^0-9\.\-]/gi, '')) - instance.grayBarWidth) + ea;
          fixTarget.style.width = "calc(100% - " + String(Number(fixTarget.style.width.split('-')[1].replace(/[^0-9\.\-]/gi, '')) - instance.grayBarWidth) + ea + ")";
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          grayBack.setAttribute("toggle", "on");
          instance.listIcon.style.left = String(left) + ea;

          fixTarget.style.left = String(Number(fixTarget.style.left.replace(/[^0-9\.\-]/gi, '')) + instance.grayBarWidth) + ea;
          fixTarget.style.width = "calc(100% - " + String(Number(fixTarget.style.width.split('-')[1].replace(/[^0-9\.\-]/gi, '')) + instance.grayBarWidth) + ea + ")";
        }

      });

    } else {

      listIcon.addEventListener("click", function (e) {
        let num = designer.information.did.replace(/[^0-9]/g, '');
        let id;
        id = '';
        for (let i = 0; i < 3 - num.length; i++) {
          id += '0';
        }
        id += num;
        blankHref(FRONTHOST + "/desdetail.php?desid=" + designer.desid);
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
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=calendar");
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
    if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
      GeneralJs.ajaxJson({
        method: "designerConsole",
        name: designer.designer,
        phone: designer.information.phone,
        option: {
          desid: designer.desid,
          designer: designer.designer,
          host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
          path: "possible",
        }
      }, "/alimTalk").then(() => {
        return GeneralJs.ajaxJson({
          page: "possible",
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
  });

}

DesignerJs.prototype.possibleReload = function (type = "possible") {
  const instance = this;
  const { ea, possibleConst, possiblePannelStatus } = this;
  const { colorChip, dateToString, findByAttribute } = GeneralJs;
  const { futureLength, okClassName, cancelClassName, numberClassName, backClassName, nullClassName, generalDateClassName, weekClassName, weekGeneralClassName, titleClassName, titleGeneralName, joinToken, scrollEventName, scrollEventTimeout, dummyDatesClassName, daydayWords, daydayLength } = possibleConst;
  const redIndexTargets = [ 0, 6 ];
  const mobile = this.media[4];
  const desktop = !mobile;
  let targetDom;
  let dateLength;
  let tempDate;
  let onTargets;
  let year, month;
  let thisKey;
  let target;
  let mode;
  let pastBoo;

  if (!possiblePannelStatus.project && !possiblePannelStatus.numbers) {
    mode = "possible";
  } else if (possiblePannelStatus.numbers) {
    mode = "numbers";
  } else if (possiblePannelStatus.project) {
    mode = "project";
  }

  if (type === "possible") {
    onTargets = [];
    for (let { start, end, matrix } of this.realtimeDesigner.possible) {
      tempDate = new Date(JSON.stringify(start).slice(1, -1));
      dateLength = 1;
      while (dateToString(tempDate) !== dateToString(end)) {
        dateLength = dateLength + 1;
        tempDate.setDate(tempDate.getDate() + 1);
      }
      tempDate = new Date(JSON.stringify(start).slice(1, -1));
      for (let i = 0; i < dateLength; i++) {
        targetDom = findByAttribute(this.dateDoms, [ "year", "month", "date" ], [ tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate() ]);
        if (targetDom !== null) {
          pastBoo = (targetDom.getAttribute("past") === "true" || targetDom.getAttribute("value") === "null");
          if (!pastBoo) {
            if (mode === "numbers") {
              targetDom.querySelector('.' + okClassName).style.opacity = String(0);
              targetDom.querySelector('.' + cancelClassName).style.opacity = String(0);
              targetDom.querySelector("aside").style.opacity = String(1);
              if (mobile) {
                targetDom.querySelector("aside").parentElement.children[1].style.opacity = String(0);
              }
              targetDom.querySelector("aside").textContent = matrix.reduce((acc, current) => { return (acc >= current ? acc : current); });
            } else {
              targetDom.querySelector('.' + numberClassName).style.color = colorChip.green;
              targetDom.querySelector('.' + numberClassName).querySelector('b').style.color = colorChip.green;
              targetDom.querySelector('.' + okClassName).style.opacity = String(1);
              targetDom.querySelector('.' + cancelClassName).style.opacity = String(0);
              targetDom.querySelector("aside").style.opacity = String(0);
            }
            if (instance.arrowDomTargets.includes(targetDom)) {
              targetDom.querySelector('.' + backClassName).style.background = colorChip.yellow;
            } else {
              targetDom.querySelector('.' + backClassName).style.background = colorChip.green;
            }
            targetDom.setAttribute("toggle", "on");
            targetDom.setAttribute("matrix", JSON.stringify(matrix));
            onTargets.push(targetDom);
          }
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
    }
    for (let dom of this.dateDoms) {
      if (!onTargets.includes(dom)) {
        pastBoo = (dom.getAttribute("past") === "true" || dom.getAttribute("value") === "null");
        if (!pastBoo) {
          if (mode === "numbers") {

            dom.querySelector('.' + okClassName).style.opacity = String(0);
            dom.querySelector('.' + cancelClassName).style.opacity = String(0);
            dom.querySelector("aside").style.opacity = String(0);
            if (mobile) {
              dom.querySelector("aside").parentElement.children[1].style.opacity = String(1);
            }
            dom.querySelector("aside").textContent = String(0);

          } else {

            dom.querySelector('.' + numberClassName).style.color = redIndexTargets.includes(Number(dom.getAttribute("index"))) ? colorChip.red : colorChip.black;
            dom.querySelector('.' + numberClassName).querySelector('b').style.color = redIndexTargets.includes(Number(dom.getAttribute("index"))) ? colorChip.red : colorChip.black;
            dom.querySelector('.' + okClassName).style.opacity = String(0);
            dom.querySelector('.' + cancelClassName).style.opacity = String(1);
            dom.querySelector("aside").style.opacity = String(0);

          }
          dom.querySelector('.' + backClassName).style.background = "transparent";
          dom.setAttribute("toggle", "off");
          dom.setAttribute("matrix", JSON.stringify([]));
        }
      }
    }
    this.possiblePannelStatus.project = false;
  }

}

DesignerJs.prototype.possibleSseParsing = function (orders) {
  const instance = this;
  const { ea } = this;
  const { colorChip, setDebounce } = GeneralJs;
  const sseDebounceConstPossible = "sseDebounceConstPossible";
  const sseDebounceConstCount = "sseDebounceConstCount";
  if (!Array.isArray(orders)) {
    throw new Error("invaild input");
  }
  if (orders.length > 0) {
    for (let obj of orders) {
      const { desid, type } = obj;
      if (instance.desid === desid) {
        if (type === "possible") {
          const { possible } = obj;
          setDebounce(() => {
            if (JSON.stringify(possible) !== JSON.stringify(instance.realtimeDesigner.possible)) {
              instance.realtimeDesigner.possible = possible;
              instance.possibleReload("possible");
            }
          }, sseDebounceConstPossible);
        }
      }
    }
  }
}

DesignerJs.prototype.possibleDetailSearchBox = function () {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, searchCondition } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const className = "searchConditionBack";
  return function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (document.querySelector('.' + className) === null) {
      let cancelBox, whiteBox, scrollBox, scrollBase;
      let margin, innerMargin;
      let paddingTop, paddingBottom;

      innerMargin = 48;
      margin = 100;
      paddingTop = 63;
      paddingBottom = 160;

      cancelBox = createNode({
        mother: totalMother,
        class: [ className ],
        style: {
          position: "fixed",
          top: String(0),
          left: String(grayBarWidth) + ea,
          width: withOut(grayBarWidth, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          animation: "justfadein 0.3s ease forwards",
          zIndex: String(2),
          cursor: "pointer",
        },
        events: [
          {
            type: [ "click", "contextmenu" ],
            event: function (e) {
              e.preventDefault();
              e.stopPropagation();
              let loading;
              totalMother.removeChild(totalMother.lastChild);
              instance.mother.loadingRun().then((dom) => {
                loading = dom;
                return instance.possibleDetailSearchParsing();
              }).then(() => {
                loading.remove();
                totalMother.removeChild(totalMother.lastChild);
              }).catch((err) => {
                console.log(err);
              })
            }
          }
        ]
      });
      whiteBox = createNode({
        mother: totalMother,
        style: {
          position: "fixed",
          top: String(margin) + ea,
          left: String(grayBarWidth + margin) + ea,
          width: withOut(grayBarWidth + (margin * 2), ea),
          height: withOut(belowHeight + (margin * 2), ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeup 0.3s ease forwards",
          zIndex: String(2),
        }
      });
      scrollBox = createNode({
        mother: whiteBox,
        style: {
          position: "absolute",
          top: String(innerMargin) + ea,
          left: String(innerMargin) + ea,
          width: withOut(innerMargin * 2, ea),
          height: withOut(innerMargin, ea),
          overflow: "scroll",
        }
      });
      scrollBase = createNode({
        mother: scrollBox,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          paddingTop: String(paddingTop) + ea,
          paddingBottom: String(paddingBottom) + ea,
        }
      });
      instance.possibleDetailSearchContents(scrollBase);
    }
  }
}

DesignerJs.prototype.possibleDetailSearchContents = function (mother) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, searchCondition } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, getDateMatrix, equalJson } = GeneralJs;
  const innerMargin = Number(mother.parentNode.style.top.replace(/[^0-9\-\.]/gi, ''));
  const designer = this.designers[this.designers.length - 1];
  const { futureLength, joinToken: token } = this.possibleConst;
  const now = new Date();
  let domTong;
  let titleSize, size;
  let titleHeight;
  let block, title, contents;
  let radius;
  let obj;
  let modeTop, modeRight;
  let modeWidth, modeMargin;
  let modeCircleTop;
  let dateBlockMother;
  let map, tempObj;
  let dateMatrix;
  let blockMap;
  let tempArr;
  let motherWidth;
  let maxLength;
  let num;
  let blockMargin;
  let blockHeight, textTop;
  let titleBottomMargin;
  let conditionReload;

  this.searchSelection = [];
  this.searchDomTong = [];
  this.searchCheckTong = [];
  this.searchCondition.conditions = [];
  this.searchCondition.blocks = [];

  motherWidth = mother.getBoundingClientRect().width;
  titleSize = 25;
  titleHeight = 48;
  size = 15;
  radius = 3;
  modeTop = isMac() ? 15 : 17;
  modeRight = 62;
  modeWidth = 36.34;
  modeMargin = 5;
  modeCircleTop = isMac() ? 7 : 5;
  blockMargin = 6;
  blockHeight = 36;
  textTop = isMac() ? 7 : 8;
  titleBottomMargin = isMac() ? 16 : 13;

  dateMatrix = getDateMatrix(now.getFullYear(), now.getMonth());
  map = [];
  for (let i = 0; i < futureLength; i++) {
    tempObj = {};
    tempObj.year = dateMatrix.getYearString();
    tempObj.month = dateMatrix.getMonthString();
    tempObj.matrix = dateMatrix.returnSundayMatrix();
    map.push(tempObj);
    dateMatrix = dateMatrix.nextMatrix();
  }

  blockMap = [];
  maxLength = [];
  for (let { matrix } of map) {
    maxLength.push(matrix.length);
  }
  maxLength.sort((a, b) => { return b - a; });
  maxLength = maxLength[0];

  for (let { year, month, matrix } of map) {

    tempObj = {};
    tempObj.text = "initial";
    tempObj.year = Number(year.replace(/[^0-9]/gi, ''));
    tempObj.month = Number(month.replace(/[^0-9]/gi, ''));
    tempObj.date = {};
    tempObj.date.first = 0;
    tempObj.date.last = 0;
    blockMap.push(tempObj);

    for (let i = 0; i < maxLength; i++) {
      if (matrix[i] !== undefined) {
        tempArr = equalJson(JSON.stringify(matrix[i]));
        tempArr.reverse();
        tempObj = {};
        tempObj.text = `${year.slice(2)} ${month} ${String(i + 1)}주`;
        tempObj.year = Number(year.replace(/[^0-9]/gi, ''));
        tempObj.month = Number(month.replace(/[^0-9]/gi, ''));
        tempObj.date = {};
        tempObj.date.first = (matrix[i].find((obj) => { return obj !== null })).date;
        tempObj.date.last = (tempArr.find((obj) => { return obj !== null })).date;
      } else {
        tempObj.text = "";
        tempObj.year = 0;
        tempObj.month = 0;
        tempObj.date = {};
        tempObj.date.first = 0;
        tempObj.date.last = 0;
      }
      blockMap.push(tempObj);
    }
  }

  createNode({
    mother,
    style: {
      position: "fixed",
      width: withOut(100, innerMargin * 2, ea),
      height: String(titleHeight) + ea,
      background: colorChip.white,
      top: String(innerMargin * (5 / 6)) + ea,
      left: String(innerMargin) + ea,
      zIndex: String(1),
      borderBottom: "1px solid " + colorChip.gray2,
    },
    children: [
      {
        text: "디자이너 조건 검색",
        style: {
          position: "absolute",
          top: String(isMac() ? 0 : 3) + ea,
          left: String(-1) + ea,
          fontSize: String(titleSize) + ea,
          fontWeight: String(500),
          color: colorChip.black
        }
      },
      {
        style: {
          position: "absolute",
          top: String(modeTop + modeCircleTop) + ea,
          right: String(0 + modeWidth + modeMargin) + ea,
          background: colorChip.deactive,
          width: String((radius - 1) * 2) + ea,
          height: String((radius - 1) * 2) + ea,
          borderRadius: String((radius - 1) * 2) + ea,
        }
      },
      {
        text: "초기화",
        class: [ "hoverDefault_lite" ],
        style: {
          position: "absolute",
          top: String(modeTop) + ea,
          right: String(0) + ea,
          fontSize: String(size - 1) + ea,
          fontWeight: String(500),
          color: colorChip.black,
        },
        events: [
          {
            type: "click",
            event: function (e) {
              for (let b of searchCondition.blocks) {
                if (b.querySelector("svg") !== null) {
                  b.style.background = colorChip.deactive;
                  b.firstChild.firstChild.setAttribute("fill", colorChip.white);
                  b.setAttribute("toggle", "off");
                } else {
                  b.style.background = colorChip.gray5;
                  b.firstChild.style.color = colorChip.white;
                  b.setAttribute("toggle", "off");
                }
              }
              instance.searchSelection = [];
              searchCondition.conditions = [];
            }
          }
        ]
      },
    ]
  });

  createNode({
    mother,
    text: "검색하고자 하는 날짜 블록을 선택",
    style: {
      position: "relative",
      display: "block",
      width: String(100) + '%',
      height: "auto",
      fontSize: String(size) + ea,
      fontWeight: String(500),
      marginBottom: String(titleBottomMargin) + ea,
    },
  });

  dateBlockMother = createNode({
    mother,
    style: {
      position: "relative",
      display: "block",
      width: String(100) + '%',
      height: "auto",
    },
  });

  conditionReload = () => {
    instance.searchCondition.conditions = instance.searchDomTong.filter((dom) => {
      return dom.getAttribute("toggle") === "on";
    }).map((dom) => {
      return [ Number(dom.getAttribute("year")), Number(dom.getAttribute("month")), Number(dom.getAttribute("first")), Number(dom.getAttribute("last")) ];
    });
  }

  num = 0;
  for (let { text, year, month, date: { first, last } } of blockMap) {

    if (text !== "initial") {
      this.searchDomTong.push(createNode({
        mother: dateBlockMother,
        attribute: {
          toggle: "off",
          exception: text !== "" ? "false" : "true",
          year,
          month,
          first,
          last
        },
        event: {
          selectstart: (e) => { e.stopPropagation(); e.preventDefault(); },
          click: function (e) {
            const exception = (this.getAttribute("exception") === "true");
            if (!exception) {
              const toggle = this.getAttribute("toggle");
              const index = Number(this.getAttribute("index"));
              const token = "_";
              let onTong;
              let yearMonthTong;
              let targetDom;
              let filtering;
              if (toggle === "off") {
                onTong = [];
                if (instance.searchSelection.length > 0) {
                  if (instance.searchSelection[0] >= index) {
                    for (let i = index; i < instance.searchSelection[0] + 1; i++) {
                      instance.searchDomTong[i].style.background = colorChip.green;
                      instance.searchDomTong[i].firstChild.style.color = colorChip.whiteBlack;
                      instance.searchDomTong[i].setAttribute("toggle", "on");
                      onTong.push(instance.searchDomTong[i]);
                    }
                  } else {
                    for (let i = instance.searchSelection[0]; i < index + 1; i++) {
                      instance.searchDomTong[i].style.background = colorChip.green;
                      instance.searchDomTong[i].firstChild.style.color = colorChip.whiteBlack;
                      instance.searchDomTong[i].setAttribute("toggle", "on");
                      onTong.push(instance.searchDomTong[i]);
                    }
                  }
                  instance.searchSelection = [];
                } else {
                  this.style.background = colorChip.green;
                  this.firstChild.style.color = colorChip.whiteBlack;
                  this.setAttribute("toggle", "on");
                  instance.searchSelection.push(index);
                  onTong.push(this);
                }

                yearMonthTong = [];
                for (let dom of onTong) {
                  yearMonthTong.push(dom.getAttribute("year") + token + dom.getAttribute("month"));
                }
                yearMonthTong = [ ...(new Set(yearMonthTong)) ];
                yearMonthTong = yearMonthTong.map((str) => { return str.split(token).map((s) => { return Number(s); }); });

                for (let [ year, month ] of yearMonthTong) {
                  filtering = (dom) => { return dom.getAttribute("year") === String(year) && dom.getAttribute("month") === String(month); }
                  if (instance.searchDomTong.filter(filtering).length === onTong.filter(filtering).length) {
                    targetDom = instance.searchCheckTong.find(filtering);
                    targetDom.style.background = colorChip.green;
                    targetDom.firstChild.firstChild.setAttribute("fill", colorChip.whiteBlack);
                    targetDom.setAttribute("toggle", "on");
                  }
                }
              } else {
                this.style.background = colorChip.gray5;
                this.firstChild.style.color = colorChip.white;
                this.setAttribute("toggle", "off");
              }
              conditionReload();
            }
          }
        },
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(100% - " + String(maxLength * blockMargin) + ea + " - " + String(blockHeight) + ea + ") / " + String(maxLength) + ")",
          height: String(blockHeight) + ea,
          background: text !== "" ? colorChip.gray5 : colorChip.white,
          marginRight: String((num % (maxLength + 1)) === maxLength ? 0 : blockMargin) + ea,
          marginBottom: String(blockMargin) + ea,
          borderRadius: String(3) + "px",
          verticalAlign: "top",
          cursor: text !== "" ? "pointer" : "",
          transition: "all 0.2s ease",
        },
        children: [
          {
            text,
            style: {
              position: "absolute",
              left: String(0),
              top: String(textTop) + ea,
              width: String(100) + '%',
              fontSize: String(size) + ea,
              fontWeight: String(500),
              textAlign: "center",
              color: colorChip.white,
            }
          }
        ]
      }));
    } else {
      this.searchCheckTong.push(createNode({
        mother: dateBlockMother,
        attribute: {
          toggle: "off",
          year,
          month,
        },
        event: {
          click: function (e) {
            const toggle = this.getAttribute("toggle");
            const year = Number(this.getAttribute("year"));
            const month = Number(this.getAttribute("month"));
            let targets;
            targets = instance.searchDomTong.filter((dom) => {
              return (dom.getAttribute("year") === String(year) && dom.getAttribute("month") === String(month));
            });
            if (toggle === "off") {

              for (let dom of targets) {
                dom.style.background = colorChip.green;
                dom.firstChild.style.color = colorChip.whiteBlack;
                dom.setAttribute("toggle", "on");
              }

              this.style.background = colorChip.green;
              this.firstChild.firstChild.setAttribute("fill", colorChip.whiteBlack);

              this.setAttribute("toggle", "on");

            } else {

              for (let dom of targets) {
                dom.style.background = colorChip.gray5;
                dom.firstChild.style.color = colorChip.white;
                dom.setAttribute("toggle", "off");
              }

              this.style.background = colorChip.deactive;
              this.firstChild.firstChild.setAttribute("fill", colorChip.white);
              this.setAttribute("toggle", "off");

            }
            conditionReload();
            instance.searchSelection = [];
          }
        },
        style: {
          position: "relative",
          display: "inline-block",
          width: String(blockHeight) + ea,
          height: String(blockHeight) + ea,
          background: text !== "" ? colorChip.deactive : colorChip.white,
          marginRight: String((num % (maxLength + 1)) === maxLength ? 0 : blockMargin) + ea,
          marginBottom: String(blockMargin) + ea,
          borderRadius: String(3) + "px",
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckCircle(colorChip.white),
            style: {
              position: "absolute",
              left: String(blockHeight / 4) + ea,
              top: String(blockHeight / 4) + ea,
              width: String(blockHeight / 2) + ea,
            }
          }
        ]
      }));
    }
    num++;
  }
  this.searchDomTong = this.searchDomTong.filter((dom) => {
    return dom.getAttribute("exception") !== "true";
  }).map((dom, index) => {
    dom.setAttribute("index", String(index));
    return dom;
  });
  searchCondition.blocks = this.searchDomTong.concat(this.searchCheckTong);

  createNode({
    mother,
    style: {
      position: "fixed",
      width: withOut(100, innerMargin * 2, ea),
      height: String(titleHeight) + ea,
      background: colorChip.white,
      bottom: String(0) + ea,
      left: String(innerMargin) + ea,
      zIndex: String(1),
      borderTop: "1px solid " + colorChip.gray2,
    },
  });

}

DesignerJs.prototype.possibleDetailSearchParsing = async function () {
  const instance = this;
  const { searchCondition, standardDoms, designers } = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
  const token = "_";
  try {
    let tempArr, tempObj, tempDate;
    let desidArr, desidArr2;
    let blocks;
    let realtimes;
    let boo;
    let conditions;
    let num;

    if (searchCondition.conditions.length === 0) {
      desidArr = [];
      for (let { desid } of designers) {
        desidArr.push(desid);
      }
    } else {

      realtimes = await ajaxJson({
        mode: "read",
        db: "console",
        collection: "realtimeDesigner",
        whereQuery: {},
      }, "/generalMongo", { equal: true });

      realtimes = realtimes.filter((obj) => {
        return Array.from(instance.designers).map((designer) => { return designer.desid }).includes(obj.desid);
      });

      conditions = [];
      num = 0;
      tempObj = {};
      for (let [ year, month, first, last ] of searchCondition.conditions) {
        if (tempObj.start === undefined) {
          tempObj.start = new Date(year, month - 1, first);
        }
        if (searchCondition.conditions[num + 1] !== undefined) {
          tempDate = new Date(year, month - 1, last);
          tempDate.setDate(tempDate.getDate() + 1);
          if (tempDate.getFullYear() === searchCondition.conditions[num + 1][0] && tempDate.getMonth() + 1 === searchCondition.conditions[num + 1][1] && tempDate.getDate() === searchCondition.conditions[num + 1][2]) {
            tempObj.end = new Date(searchCondition.conditions[num + 1][0], searchCondition.conditions[num + 1][1] - 1, searchCondition.conditions[num + 1][3]);
          } else {
            tempObj.end = new Date(year, month - 1, last);
            conditions.push(tempObj);
            tempObj = {};
          }
        } else {
          tempObj.end = new Date(year, month - 1, last);
          conditions.push(tempObj);
        }
        num++;
      }

      desidArr = [];
      for (let { desid, possible } of realtimes) {
        boo = false;
        for (let { start, end } of conditions) {
          for (let { start: possibleStart, end: possibleEnd } of possible) {
            if (end.valueOf() >= possibleStart.valueOf() && possibleEnd.valueOf() >= start.valueOf()) {
              boo = true;
              break;
            }
          }
          if (boo) {
            break;
          }
        }
        if (boo) {
          desidArr.push(desid);
        }
      }
    }

    blocks = [];
    for (let i = 1; i < standardDoms.length; i++) {
      if (desidArr.includes(standardDoms[i].getAttribute("desid"))) {
        standardDoms[i].style.display = "block";
        blocks.push(standardDoms[i]);
      } else {
        standardDoms[i].style.display = "none";
      }
    }

    if (blocks.length > 0) {
      setTimeout(() => {
        blocks[0].click();
      }, 0);
    }
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.possibleEntireContents = function (mother, data) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, possibleConst } = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, setQueue, isMac } = GeneralJs;
  const { futureLength } = possibleConst;
  const today = new Date();
  const future = new Date();
  future.setMonth(future.getMonth() + futureLength);
  let baseTong;
  let outerMargin;
  let designerTong;
  let fontSize;
  let designerBoxWidth;
  let designerBlockMarginLeft;
  let designerBlockMarginBottom;
  let dateTong;
  let grayBoxWidth;
  let grayBoxHeight;
  let tong;
  let dateLength, dateArr;
  let tempDate;
  let totalWidth;
  let tongArr;
  let barTop;
  let designerNameTong;
  let dateTongHeight;
  let xScrollTong;
  let rowHeight;
  let dateBarTop, dateBarHeight;
  let tongPaddingBottom;
  let lineTop, lineVisual;
  let dateSize;
  let pastLeft;

  totalWidth = 5000;
  outerMargin = 24;
  fontSize = 15;
  designerBoxWidth = 54;
  designerBlockMarginBottom = 12;
  designerBlockMarginLeft = 28;
  grayBoxHeight = 19;
  grayBoxWidth = 5;
  barTop = isMac() ? 2 : 1;
  dateTongHeight = 80;
  rowHeight = 20;
  dateBarTop = 56;
  dateBarHeight = 3;
  tongPaddingBottom = 200;
  lineTop = 48;
  lineVisual = 36;
  dateSize = 13;

  dateLength = 0;
  dateArr = [];
  tempDate = new Date();
  while (tempDate.valueOf() <= future.valueOf()) {
    dateArr.push(new Date(JSON.stringify(tempDate).slice(1, -1)));
    tempDate.setDate(tempDate.getDate() + 1);
    dateLength++;
  }

  baseTong = createNode({
    mother,
    style: {
      position: "relative",
      top: String(outerMargin) + ea,
      marginLeft: String(outerMargin) + ea,
      width: withOut(outerMargin * 2, ea),
      height: withOut(outerMargin * 2, ea),
      borderRadius: String(5) + "px",
      border: "1px solid " + colorChip.gray3,
      overflow: "scroll",
      boxSizing: "border-box",
    }
  });

  xScrollTong = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      left: String(designerBlockMarginLeft + designerBoxWidth) + ea,
      width: withOut(designerBlockMarginLeft + designerBoxWidth, ea),
      overflow: "scroll",
    }
  })

  dateTong = createNode({
    mother: xScrollTong,
    class: [ "moveTarget" ],
    style: {
      position: "relative",
      height: String(dateTongHeight) + ea,
      width: String(totalWidth) + ea,
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(dateBarTop) + ea,
          height: String(dateBarHeight) + ea,
          overflow: "hidden",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              verticalAlign: "top",
            }
          }
        ]
      },
    ]
  });

  designerTong = createNode({
    mother: xScrollTong,
    class: [ "moveTarget" ],
    style: {
      position: "relative",
      width: String(totalWidth) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
    }
  });

  designerNameTong = createNode({
    mother: baseTong,
    style: {
      position: "absolute",
      background: colorChip.white,
      left: String(designerBlockMarginLeft) + ea,
      top: String(dateTongHeight) + ea,
      width: String(designerBoxWidth) + ea,
      zIndex: String(1),
    }
  })

  tongArr = [];
  for (let obj of data) {
    createNode({
      mother: designerNameTong,
      attribute: {
        desid: obj.desid,
      },
      class: [ "hoverDefault_lite" ],
      event: {
        click: function (e) {
          const desid = this.getAttribute("desid");
          window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=possible&desid=" + desid;
        }
      },
      style: {
        position: "relative",
        marginBottom: String(designerBlockMarginBottom) + ea,
        height: String(rowHeight) + ea,
      },
      children: [
        {
          text: obj.designer,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(500),
            width: String(designerBoxWidth) + ea,
            verticalAlign: "top",
          }
        }
      ]
    });
    tong = createNode({
      mother: designerTong,
      style: {
        position: "relative",
        marginBottom: String(designerBlockMarginBottom + (rowHeight - grayBoxHeight)) + ea
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(designerBoxWidth, ea),
            verticalAlign: "top",
            opacity: String(0.9),
            top: String(barTop) + ea,
          }
        }
      ]
    });
    tongArr.push({ tong, possible: obj.possible });
  }

  setQueue(() => {
    const lineHeight = designerNameTong.getBoundingClientRect().height + lineVisual;
    pastLeft = 0;
    for (let i = 0; i < dateLength - 1; i++) {
      if (dateArr[i].getMonth() !== dateArr[i + 1].getMonth()) {
        createNode({
          mother: dateTong,
          text: String(dateArr[i].getFullYear()).slice(2) + " / " + String(dateArr[i].getMonth() + 1),
          style: {
            fontSize: String(dateSize) + ea,
            fontWeight: String(300),
            fontFamily: "graphik",
            position: "absolute",
            top: String(lineTop - 16) + ea,
            left: String(pastLeft + 9) + ea,
          }
        });
        createNode({
          mother: dateTong,
          style: {
            position: "absolute",
            top: String(lineTop) + ea,
            left: String((i + 1) * grayBoxWidth) + ea,
            borderRight: "1px solid " + colorChip.darkGreen,
            height: String(lineHeight) + ea,
            width: String(0),
          }
        });
        pastLeft = (i + 1) * grayBoxWidth;
      }
    }
  });

  setQueue(() => {
    const tongLength = tongArr.length;
    let divClone, styleGray, styleGreen;
    styleGray = {
      display: "inline-block",
      position: "relative",
      width: String(grayBoxWidth) + ea,
      height: String(grayBoxHeight) + ea,
      background: colorChip.gray1,
    };
    styleGreen = JSON.parse(JSON.stringify(styleGray));
    styleGreen.background = colorChip.green;

    for (let z = 0; z < tongLength; z++) {
      for (let i = 0; i < dateLength; i++) {
        divClone = GeneralJs.nodes.div.cloneNode(true);
        if (tongArr[z].possible.some((obj) => { return (obj.start.valueOf() <= dateArr[i].valueOf() && dateArr[i].valueOf() <= obj.end.valueOf()); })) {
          for (let s in styleGreen) {
            divClone.style[s] = styleGreen[s];
          }
        } else {
          for (let s in styleGray) {
            divClone.style[s] = styleGray[s];
          }
        }
        tongArr[z].tong.children[0].appendChild(divClone);
      }
    }

    for (let i = 0; i < dateLength; i++) {
      divClone = GeneralJs.nodes.div.cloneNode(true);
      for (let s in styleGray) {
        divClone.style[s] = styleGray[s];
      }
      dateTong.children[0].children[0].appendChild(divClone);
    }

  });

}

DesignerJs.prototype.possibleEntire = function () {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
  this.possibleEntire = {};
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBox, whiteBox;
      let outerMargin;
      let data;

      outerMargin = 36;

      instance.possibleEntire.cancelBox = {};
      instance.possibleEntire.whiteBox = {};

      cancelBox = createNode({
        mother: totalMother,
        event: {
          click: function (e) {
            totalMother.removeChild(instance.possibleEntire.whiteBox);
            totalMother.removeChild(instance.possibleEntire.cancelBox);
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(grayBarWidth) + ea,
          width: withOut(grayBarWidth, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.cancelBlack,
          zIndex: String(zIndex),
          animation: "justfadein 0.3s ease forwards",
        }
      });

      whiteBox = createNode({
        mother: totalMother,
        style: {
          position: "fixed",
          top: String(outerMargin) + ea,
          left: String(grayBarWidth + outerMargin) + ea,
          width: withOut(grayBarWidth + (outerMargin * 2), ea),
          height: withOut(belowHeight + (outerMargin * 2), ea),
          background: colorChip.white,
          zIndex: String(zIndex),
          animation: "fadeuplite 0.3s ease forwards",
          borderRadius: String(3) + "px",
          boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
        }
      });

      data = await ajaxJson({
        mode: "read",
        db: "console",
        collection: "realtimeDesigner",
        whereQuery: {},
      }, "/generalMongo", { equal: true });

      for (let obj of data) {
        for (let designer of instance.designers) {
          if (obj.desid === designer.desid) {
            obj.designer = designer.designer;
          }
        }
      }

      data = data.filter((obj) => { return obj.designer !== undefined; });
      data.sort((a, b) => { return a.desid > b.desid ? -1 : 1 });
      instance.possibleEntireContents(whiteBox, data);

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.possibleView = async function () {
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
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;
    let reportIcon;

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[2];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };
    this.dateDoms = [];
    this.selection = [];

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
            instance.possibleDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.possibleDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
      searchInput.addEventListener("contextmenu", this.possibleDetailSearchBox());
    }

    //entire event
    reportIcon = this.mother.belowButtons.square.reportIcon;
    reportIcon.addEventListener("click", this.possibleEntire());

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
          instance.possibleDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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

    //sse
    // const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/possibleDesigner");
    // es.addEventListener("updateTong", (e) => {
    //   instance.possibleSseParsing(equalJson(e.data));
    // });

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          instance.reportDetailLaunching(instance.pageHistory[1].desid);
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        }
      }
    });

    instance.arrowDomMode = false;
    instance.arrowDomTargets = [];
    window.addEventListener("keydown", async (e) => {
      try {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          if (instance.arrowDomMode) {
            e.preventDefault();
            let tempMatrix;
            if (e.key === "ArrowUp") {
              for (let dom of instance.arrowDomTargets) {
                tempMatrix = equalJson(dom.getAttribute("matrix"));
                tempMatrix = tempMatrix.map((num) => { return num + 1 });
                dom.setAttribute("matrix", JSON.stringify(tempMatrix));
                dom.querySelector("aside").textContent = String(tempMatrix.reduce((acc, current) => { return acc >= current ? acc : current }));
              }
            } else {
              for (let dom of instance.arrowDomTargets) {
                tempMatrix = equalJson(dom.getAttribute("matrix"));
                tempMatrix = tempMatrix.map((num) => { return num - 1 });
                tempMatrix = tempMatrix.map((num) => { return (num < 0 ? 0 : num); });
                dom.setAttribute("matrix", JSON.stringify(tempMatrix));
                dom.querySelector("aside").textContent = String(tempMatrix.reduce((acc, current) => { return acc >= current ? acc : current }));
              }
            }
            await instance.possibleUpdate(instance.desid);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (instance.arrowDomMode) {
          e.preventDefault();
          document.getElementById("totalcontents").removeChild(document.getElementById("totalcontents").lastChild);
          for (let dom of instance.arrowDomTargets) {
            if (GeneralJs.equalJson(dom.getAttribute("matrix")).reduce((acc, current) => { return acc + current }) === 0) {
              dom.firstChild.style.background = "transparent";
              dom.querySelector("aside").style.opacity = String(0);
              dom.setAttribute("toggle", "off");
              dom.setAttribute("matrix", "[]");
            } else {
              dom.firstChild.style.background = colorChip.green;
            }
            dom.firstChild.style.opacity = String(0.08);
          }
          instance.arrowDomMode = false;
          instance.arrowDomTargets = [];
        }
      }
    });

    //launching
    this.possibleDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
