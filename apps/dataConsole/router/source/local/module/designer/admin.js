DesignerJs.prototype.adminDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip, removeByClass } = GeneralJs;
  const memoBaseClassName = "memoBaseClassName";
  const possiblePopupClassName = "possiblePopupClassName";
  let target, pastScrollTop;

  removeByClass(possiblePopupClassName);

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  this.pageHistory.unshift({ path: "admin", status: "list", desid });
  window.history.pushState({ path: "admin", status: "list", desid }, '');

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

  this.adminDetail(desid);
  this.adminIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }

  if ([ ...document.querySelectorAll('.' + memoBaseClassName) ].length > 0 && typeof instance.adminMemoSystem === "function") {
    instance.adminMemoSystem(desid).catch((err) => { console.log(err); });
  }
}

DesignerJs.prototype.adminDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const { entireMode, normalMode } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const mobile = this.media[4];
  const desktop = normalMode ? true : !mobile;
  let designer;
  let information, analytics;
  let margin;
  let baseTong0, baseTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let alphabetWidth;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let mobileOuterMargin;
  let marginVisual;

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  margin = 7;
  marginVisual = 4;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.2 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = 20;
  mobileOuterMargin = 4;

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String((GeneralJs.returnGet().normal === "true" ? margin * 1.5 : margin * 3)) + ea : (String(0)),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin) - marginVisual) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2) - (marginVisual * 2), ea),
      height: withOut((GeneralJs.returnGet().normal === "true" ? margin * 1.5 : margin * 3), ea),
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
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: colorChip.white,
      height: withOut(0, ea),
      overflow: "scroll",
      paddingTop: desktop ? "" : String(baseTongPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(baseTongPaddingBottom) + ea,
    },
    child: {
      mode: "iframe",
      attribute: { src: BACKHOST + "/middle/designerAbout?desid=" + designer.desid + "&entire=true&normal=true" },
      style: {
        position: "relative",
        display: "block",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
      }
    }
  });

  instance.adminProjectsView(desid, baseTong0).catch((err) => { console.log(err); });
  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

DesignerJs.prototype.adminProjectsView = async function (desid, base) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, stringToDate, findByAttribute, setQueue, uniqueValue, sleep, blankHref, scrollTo, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const panClassName = "panClassName";
  try {
    let designer;
    let projects, clients;
    let client;
    let requestNumber;
    let baseTong;
    let thisMother;
    let motherMargin;
    let blockHeight;
    let project;
    let projectTong;
    let basicSize;
    let textTop;
    let state;
    let lineTop;
    let statusWidth;
    let blockMargin;
    let smallSize;
    let smallTextTop;
    let basicMarginLeft, smallMarginLeft;
    let circleWidth;
    let moreWidth;
    let projectDetailTong;
    let checklist;
    let type;
    let key;
    let title;
    let action;
    let typeObj;
    let panContents;
    let innerMargin;
    let panPaddingLeft;
    let panBetween;
    let panPaddingTop;
    let panTitleSize;
    let panTitleWeight;
    let panTitleBottom;
    let subButtonTop;
    let subButtonHeight;
    let subButtonSize;
    let subButtonWeight;
    let subButtonTextPadding;
    let panContentsPaddingTop;
    let panContentsMinHeight;
    let minTotalHeight;
    let divideNumber;
    let photoDivideNumber;
    let blockBetween;
    let blockHeight2;
    let blockSize;
    let blockWeight;
    let linkImageHeight;
    let targetProjectBlock;

    motherMargin = 24;
    blockHeight = 52;
    blockMargin = 4;

    basicSize = 16;
    textTop = (isMac() ? -1 : 1);
    smallSize = 12;
    smallTextTop = (isMac() ? 1 : 3);

    lineTop = 18;
    statusWidth = 100;

    basicMarginLeft = 36;
    smallMarginLeft = 6;

    circleWidth = 6;
    moreWidth = 90;

    innerMargin = 16;
    panBetween = 6;
    panPaddingTop = 15;
    panPaddingLeft = 18;

    panTitleSize = 13;
    panTitleWeight = 700;
    panTitleBottom = 5;

    subButtonTop = 2;
    subButtonHeight = 21;
    subButtonSize = 10;
    subButtonWeight = 800;
    subButtonTextPadding = 8;

    panContentsPaddingTop = 12;
    panContentsMinHeight = 80;

    minTotalHeight = 1400;

    divideNumber = 8;
    photoDivideNumber = 6;
    blockBetween = 5;

    blockHeight2 = 40;
    blockSize = 12;
    blockWeight = 400;

    linkImageHeight = 147;

    typeObj = {};

    designer = this.designers.pick(desid);
    baseTong = base.firstChild;

    projects = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getProjects", { equal: true });
    if (projects.length > 0) {
      clients = await ajaxJson({ whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, SECONDHOST + "/getClients", { equal: true });
    } else {
      clients = [];
    }
    for (let project of projects) {
      client = clients.find((obj) => { return obj.cliid === project.cliid });
      requestNumber = 0;
      for (let z = 0; z < client.requests.length; z++) {
        if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = z;
          break;
        }
      }
      project.name = client.name;
      project.timeline = client.requests[requestNumber].request.timeline;
    }
    projects.sort((a, b) => {
      const emptyValue = Math.abs((new Date(1200, 0, 1)).valueOf());
      let aConst, bConst;

      if (/드[랍롭]/gi.test(a.process.status) || /홀[드딩]/gi.test(a.process.status)) {
        aConst = 1;
      } else if (/완료/gi.test(a.process.status)) {
        aConst = 10000;
      } else {
        aConst = 100000000;
      }

      if (/드[랍롭]/gi.test(b.process.status) || /홀[드딩]/gi.test(b.process.status)) {
        bConst = 1;
      } else if (/완료/gi.test(b.process.status)) {
        bConst = 10000;
      } else {
        bConst = 100000000;
      }

      return ((b.process.contract.form.date.from.valueOf() + emptyValue) * bConst) - ((a.process.contract.form.date.from.valueOf() + emptyValue) * aConst);
    });

    checklist = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    thisMother = createNode({
      mother: baseTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        paddingTop: String(motherMargin) + ea,
        paddingBottom: String(motherMargin) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(motherMargin) + ea,
          marginRight: String(motherMargin) + ea,
          width: withOut(motherMargin * 2, ea),
        }
      }
    }).firstChild;

    this.projectAreas = [];
    this.projectBlocks = [];
    for (let i = 0; i < projects.length; i++) {

      project = projects[i];
      state = 0;
      if (/드[랍롭]/gi.test(project.process.status) || /홀[드딩]/gi.test(project.process.status)) {
        state = 3;
      } else if (/완료/gi.test(project.process.status)) {
        state = 2;
      }

      projectTong = createNode({
        mother: thisMother,
        attribute: {
          proid: project.proid,
          desid: designer.desid,
          cliid: project.cliid,
          name: project.name,
          timeline: dateToString(project.timeline),
          toggle: "off",
        },
        event: {
          click: async function (e) {
            const proid = this.getAttribute("proid");
            const desid = this.getAttribute("desid");
            const cliid = this.getAttribute("cliid");
            const name = this.getAttribute("name");
            const timeline = stringToDate(this.getAttribute("timeline"));
            const targetArea = findByAttribute(instance.projectAreas, "proid", proid);
            const toggle = this.getAttribute("toggle");
            const targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + "/photo/designer" + "/" + desid + "/" + proid;
            const linkTargetKey = [ "productLink" ];
            const preItemMotherKey = "firstPhoto";
            const preItemHex = "070a916ebdea87fae21233050e1b322eb4694980e1bced5012199be287e2e92d";
            const hashConst = "homeliaisonHash";
            const load = targetArea.getAttribute("load");
            const emptyDate = new Date(1800, 0, 1);
            let itemList, indexTong;
            let file, link, memo;
            let image;
            let id;
            let linkTargets;
            let linkContents;
            let preItemList;
            let tempArr;
            let preIndex;
            let preItemHexId;
            let fileItemList;
            let photoItemList;
            let targets;

            try {
              if (toggle === "off") {

                targetArea.style.minHeight = String(minTotalHeight) + ea;
                targetArea.style.height = String(1) + ea;
                setQueue(() => {
                  targetArea.style.height = "auto";
                }, 1001);
                this.setAttribute("toggle", "on");

                if (load === "false") {
                  itemList = await ajaxJson({ target: desid + "/" + proid }, BRIDGEHOST + "/middlePhotoRead", { equal: true });
                  preItemList = await ajaxJson({ cliid }, BRIDGEHOST + "/clientPhoto", { equal: true });

                  linkTargets = itemList.filter((str) => { return linkTargetKey.includes(str.split("_")[0]) });
                  linkContents = await ajaxJson({ links: linkTargets.map((file) => { return { desid, proid, file } }) }, BRIDGEHOST + "/middleLinkParsing", { equal: true });

                  tempArr = [];
                  preIndex = 1;
                  for (let original of preItemList.sitePhoto) {
                    preItemHexId = ((new RegExp("^" + hashConst + "_", "g")).test(original.split("/")[original.split("/").length - 1]) ? original.split("/")[original.split("/").length - 1].split("_")[1] : preItemHex);
                    tempArr.push({
                      fileName: [
                        preItemMotherKey,
                        String(timeline.valueOf()),
                        String(preIndex),
                        preItemHexId + "." + original.split(".")[original.split(".").length - 1],
                      ].join("_"),
                      original,
                    });
                    preIndex++;
                  }
                  itemList = tempArr.concat(itemList);

                  indexTong = {};
                  fileItemList = [];
                  photoItemList = [];
                  itemList.forEach((raw) => {
                    let originalRoot;
                    if (typeof raw !== "string") {
                      originalRoot = raw.original;
                      raw = raw.fileName;
                    } else {
                      originalRoot = targetHref + "/" + raw;
                    }
                    const [ key, timeString, orderString, hex ] = raw.split("_");
                    const [ hexString, exe ] = hex.split(".");
                    const mother = findByAttribute(targetArea.querySelectorAll('.' + panClassName), "key", key);
                    const date = dateToString(new Date(Number(timeString)));

                    id = key + "_" + timeString + "_" + String(orderString) + "_" + hexString;

                    if (indexTong[key] === undefined) {
                      indexTong[key] = 0;
                    } else {
                      indexTong[key] = indexTong[key] + 1;
                    }

                    if (typeObj[key] === "file") {

                      createNode({
                        mother,
                        attribute: {
                          src: originalRoot,
                          link: originalRoot
                        },
                        event: {
                          click: function (e) {
                            const link = this.getAttribute("link");
                            blankHref(link);
                          }
                        },
                        style: {
                          display: "inline-flex",
                          position: "relative",
                          width: "calc(calc(100% - " + String(blockBetween * (divideNumber - 1)) + ea + ") / " + String(divideNumber) + ")",
                          height: String(blockHeight2) + ea,
                          marginRight: String((indexTong[key] % divideNumber === (divideNumber - 1)) ? 0 : blockBetween) + ea,
                          marginBottom: String(blockBetween) + ea,
                          background: colorChip.white,
                          borderRadius: String(5) + "px",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          cursor: "pointer",
                        },
                        child: {
                          id,
                          attribute: {
                            exe,
                            date: date.split("-").slice(1).join("/"),
                          },
                          text: (date + "_" + orderString + "." + exe),
                          style: {
                            fontSize: String(blockSize) + ea,
                            fontWeight: String(blockWeight),
                            color: colorChip.black,
                            position: "relative",
                            top: String(isMac() ? -1 : 1) + ea,
                          }
                        }
                      });
                      fileItemList.push({
                        hash: hexString,
                        target: id
                      });

                    } else if (typeObj[key] === "photo") {

                      createNode({
                        mother: [ ...mother.children ][indexTong[key] % photoDivideNumber],
                        style: {
                          display: "block",
                          position: "relative",
                          width: withOut(0, ea),
                          marginBottom: String(blockBetween) + ea,
                          cursor: "pointer",
                        },
                        children: [
                          {
                            mode: "img",
                            attribute: {
                              src: originalRoot,
                              link: originalRoot
                            },
                            event: {
                              click: function (e) {
                                const link = this.getAttribute("link");
                                blankHref(link);
                              }
                            },
                            style: {
                              display: "block",
                              position: "relative",
                              width: withOut(0),
                              borderTopLeftRadius: String(5) + "px",
                              borderTopRightRadius: String(5) + "px",
                            }
                          },
                          {
                            id,
                            attribute: {
                              height: String(blockHeight2) + ea,
                              date: date.split("-").slice(1).join("/"),
                            },
                            style: {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: withOut(0, ea),
                              height: String(0),
                              borderBottomLeftRadius: String(5) + "px",
                              borderBottomRightRadius: String(5) + "px",
                              background: desktop ? colorChip.white : colorChip.gray0,
                              textAlign: "center",
                              overflow: "hidden",
                              boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
                              transition: "all 0.3s ease",
                            },
                            child: {
                              text: "",
                              style: {
                                display: "inline-block",
                                position: "relative",
                                top: String(isMac() ? -1 : 1) + ea,
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.black,
                              },
                              bold: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.deactive,
                              }
                            }
                          }
                        ]
                      });
                      photoItemList.push({
                        hash: hexString,
                        target: id
                      });

                    } else if (typeObj[key] === "link") {

                      ({ link, memo } = linkContents.find(({ file }) => { return file === raw }))
                      id = raw.replace(/[\_\-\.]/gi, '');

                      createNode({
                        mother,
                        attribute: {
                          link,
                        },
                        event: {
                          click: function (e) {
                            const link = this.getAttribute("link");
                            blankHref(link);
                          }
                        },
                        style: {
                          display: "inline-flex",
                          position: "relative",
                          width: "calc(calc(100% - " + String(blockBetween * (divideNumber - 1)) + ea + ") / " + String(divideNumber) + ")",
                          marginRight: String((indexTong[key] % divideNumber === (divideNumber - 1)) ? 0 : blockBetween) + ea,
                          marginBottom: String(blockBetween) + ea,
                          flexDirection: "column",
                          textAlign: "center",
                          cursor: "pointer",
                        },
                        children: [
                          {
                            id,
                            style: {
                              display: "block",
                              position: "relative",
                              width: withOut(0, ea),
                              height: String(linkImageHeight) + ea,
                              background: colorChip.white,
                              borderTopLeftRadius: String(5) + "px",
                              borderTopRightRadius: String(5) + "px",
                              backgroundPosition: "50% 50%",
                              backgroundSize: "100% auto",
                              backgroundRepeat: "no-repeat",
                            }
                          },
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              width: withOut(0, ea),
                              height: String(blockHeight2) + ea,
                              background: colorChip.white,
                              borderBottomLeftRadius: String(5) + "px",
                              borderBottomRightRadius: String(5) + "px",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                            },
                            child: {
                              text: memo + " <b%(" + date.split("-").slice(1).join("/") + ")%b>",
                              style: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.black,
                                position: "relative",
                                top: String(isMac() ? -1 : 1) + ea,
                              },
                              bold: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.deactive,
                              }
                            }
                          }
                        ]
                      });

                      ajaxJson({ mode: "image", url: window.encodeURIComponent(link), target: id }, "/getOpenGraph").then(({ image, target }) => {
                        target = targetArea.querySelector('#' + target);
                        target.style.backgroundImage = "url('" + image + "')";
                      }).catch((err) => {
                        console.log(err);
                      });

                    }
                  });

                  targetArea.setAttribute("load", "true");

                  targets = await ajaxJson({ mode: "decrypto", targets: fileItemList }, SECONDHOST + "/homeliaisonCrypto", { equal: true });
                  for (let { string, target } of targets) {
                    target = targetArea.querySelector('#' + target);
                    if (string.trim() !== "") {
                      target.textContent = "";
                      target.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    }
                  }

                  targets = await ajaxJson({ mode: "decrypto", targets: photoItemList }, SECONDHOST + "/homeliaisonCrypto", { equal: true });
                  for (let { string, target } of targets) {
                    target = targetArea.querySelector('#' + target);
                    target.style.height = target.getAttribute("height");
                    target.firstChild.textContent = "";
                    if (!instance.isEmptyString(string)) {
                      target.firstChild.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    } else {
                      target.firstChild.insertAdjacentHTML("beforeend", "- " + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    }
                  }

                }

              } else {

                targetArea.style.minHeight = String(0) + ea;
                targetArea.style.height = String(0) + ea;
                this.setAttribute("toggle", "off");

              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: String(blockHeight) + ea,
          width: withOut(0, ea),
          borderRadius: String(5) + "px",
          background: state >= 3 ? colorChip.gray4 : (state === 2 ? colorChip.gray2 : colorChip.gray0),
          alignItems: "center",
          cursor: "pointer",
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(statusWidth) + ea,
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        child: {
          text: project.process.status,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(600),
            color: state === 0 ? colorChip.black : colorChip.deactive,
          },
          next: {
            style: {
              position: "absolute",
              right: String(0),
              top: String(lineTop) + ea,
              height: withOut(lineTop * 2, ea),
              borderRight: "1px solid " + colorChip.gray4,
            }
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(basicMarginLeft) + ea,
        },
        child: {
          text: project.name,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(smallMarginLeft) + ea,
        },
        child: {
          text: project.proid,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(smallTextTop) + ea,
            fontSize: String(smallSize) + ea,
            fontWeight: String(300),
            color: colorChip.deactive,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(basicMarginLeft) + ea,
        },
        child: {
          text: "문의 : " + dateToString(project.timeline).slice(2) + "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;" + dateToString(project.process.contract.form.date.from).slice(2) + " ~ " + dateToString(project.process.contract.form.date.to).slice(2),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(300),
            color: colorChip.deactive,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "absolute",
          width: String(moreWidth) + ea,
          height: withOut(0, ea),
          right: String(0),
          background: "transparent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
              marginLeft: String(circleWidth / 2) + ea,
              marginRight: String(circleWidth / 2) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
            }
          },
        ]
      });
      this.projectBlocks.push(projectTong);

      // detail area
      projectDetailTong = createNode({
        mother: thisMother,
        attribute: {
          proid: project.proid,
          load: "false",
        },
        display: "flex",
        minHeight: String(0) + ea,
        height: String(0),
        width: withOut(0, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray4,
        marginBottom: String(blockMargin) + ea,
        transition: "all 1s ease",
        overflow: "hidden",
        flexDirection: "column",
      });
      this.projectAreas.push(projectDetailTong);

      typeObj = {};
      for (let x = 0; x < checklist.length; x++) {
        for (let y = 0; y < checklist[x].children.length; y++) {

          type = checklist[x].children[y].type;
          key = checklist[x].children[y].key;
          title = checklist[x].children[y].title;
          action = checklist[x].children[y].action;
          typeObj[key] = type;

          panContents = createNode({
            mother: projectDetailTong,
            style: {
              display: "block",
              position: "relative",
              marginLeft: String(innerMargin) + ea,
              width: withOut((innerMargin * 2) + (panPaddingLeft * 2), ea),
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              paddingTop: String(panPaddingTop) + ea,
              paddingLeft: String(panPaddingLeft) + ea,
              paddingRight: String(panPaddingLeft) + ea,
              paddingBottom: String(panPaddingTop) + ea,
              marginTop: (x === 0 && y === 0 ? String(innerMargin) + ea : ""),
              marginBottom: (x === checklist.length - 1 && y === checklist[x].children.length - 1 ? String(innerMargin) + ea : String(panBetween) + ea),
            },
            child: {
              set: "flex",
              style: {
                width: withOut(0, ea),
                flexDirection: "row",
              },
              child: {
                text: title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(panTitleSize) + ea,
                  fontWeight: String(panTitleWeight),
                  color: colorChip.black,
                  paddingBottom: String(panTitleBottom) + ea,
                  borderBottom: "1px solid " + colorChip.deactive,
                },
                next: {
                  attribute: {
                    key,
                    title,
                    desid: designer.desid,
                    designer: designer.designer,
                    proid: project.proid,
                    name: project.name,
                    phone: designer.information.phone,
                  },
                  event: {
                    click: async function (e) {
                      try {
                        const key = this.getAttribute("key");
                        const title = this.getAttribute("title");
                        const desid = this.getAttribute("desid");
                        const designer = this.getAttribute("designer");
                        const proid = this.getAttribute("proid");
                        const name = this.getAttribute("name");
                        const phone = this.getAttribute("phone");
                        const host = FRONTHOST.replace(/^https\:\/\//gi, '');
                        const path = "process";

                        if (window.confirm(designer + "실장님께 알림톡을 보낼까요?")) {
                          await ajaxJson({
                            method: "pushDesignerFile",
                            name: designer,
                            phone: phone,
                            option: {
                              designer: designer,
                              client: name,
                              file: title,
                              host: host,
                              path: path,
                              proid: proid,
                            }
                          }, BACKHOST + "/alimTalk");
                          window.alert(designer + " 실장님에게 알림톡을 전송하였습니다!");
                        }

                      } catch (e) {
                        console.log(e);
                      }
                    }
                  },
                  style: {
                    display: "inline-flex",
                    position: "absolute",
                    right: String(0),
                    top: String(subButtonTop) + ea,
                    height: String(subButtonHeight) + ea,
                    background: colorChip.black,
                    borderRadius: String(5) + "px",
                    cursor: "pointer",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "디자이너에게 " + title + " 업로드 알림톡",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(isMac() ? -1 : 1) + ea,
                      fontSize: String(subButtonSize) + ea,
                      fontWeight: String(subButtonWeight),
                      color: colorChip.white,
                      paddingLeft: String(subButtonTextPadding) + ea,
                      paddingRight: String(subButtonTextPadding) + ea,
                    }
                  }
                }
              },
              next: {
                attribute: {
                  key,
                },
                class: [ panClassName ],
                style: {
                  display: "block",
                  paddingTop: String(panContentsPaddingTop) + ea,
                  position: "relative",
                  width: withOut(0, ea),
                  minHeight: String(panContentsMinHeight) + ea,
                }
              }
            }
          });
          if (type === "photo") {
            for (let z = 0; z < photoDivideNumber; z++) {
              createNode({
                mother: panContents.querySelector('.' + panClassName),
                style: {
                  display: "inline-block",
                  position: "relative",
                  verticalAlign: "top",
                  width: "calc(calc(100% - " + String(blockBetween * (photoDivideNumber - 1)) + ea + ") / " + String(photoDivideNumber) + ")",
                  marginRight: String((z === (photoDivideNumber - 1)) ? 0 : blockBetween) + ea,
                }
              });
            }
          }

        }
      }

    }

    if (typeof returnGet().proid === "string") {
      targetProjectBlock = findByAttribute(this.projectBlocks, "proid", returnGet().proid);
      if (targetProjectBlock !== null) {
        scrollTo(totalMother, targetProjectBlock);
        targetProjectBlock.click();
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.adminDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.mainBaseTong;
  const designer = this.designers.pick(desid);
  const mobile = media[4];
  const desktop = !mobile;
  return async function (e) {
    try {
      if (document.getElementById("memoTong") === null) {

        let memoTong;
        let margin;
        let innerMargin;
        let titleHeight;
        let size;
        let resObj, history, career;
        let nodeArr;
        let mobileBottom, mobileHeight;

        margin = <%% 40, 40, 40, 40, 7 %%>;
        innerMargin = <%% 15, 15, 15, 15, 4 %%>;
        titleHeight = <%% 28, 28, 28, 28, 6.4 %%>;
        size = <%% 16, 16, 16, 16, 4 %%>;

        mobileBottom = 16;
        mobileHeight = 56;

        resObj = await ajaxJson({ method: "designer", property: "history", idArr: [ desid ] }, "/getHistoryTotal");
        if (resObj[desid] === undefined) {
          throw new Error("history error");
        }
        career = resObj[desid].career;

        memoTong = createNode({
          mother: totalMother,
          id: "memoTong",
          events: [
            {
              type: "dblclick",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            }
          ],
          style: {
            position: "fixed",
            width: desktop ? "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 3) - " + String(margin) + ea + ")" : "calc(100% - " + String(margin * 2) + ea + ")",
            height: desktop ? "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 1.5) - " + String(margin) + ea + ")" : String(mobileHeight) + ea,
            bottom: String(desktop ? belowHeight + margin : mobileBottom + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
            zIndex: String(3),
          }
        });

        nodeArr = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 상세 경력",
            style: {
              position: "absolute",
              top: String(innerMargin - (desktop ? 1 : 1.2)) + ea,
              left: String(innerMargin + (desktop ? 1 : 0.1)) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.white,
            }
          },
          {
            mother: memoTong,
            style: {
              position: "absolute",
              bottom: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: "calc(100% - " + String(innerMargin * 2) + ea + ")",
              height: withOut((innerMargin * 2) + titleHeight, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              opacity: String(0.95),
            }
          },
          {
            mother: -1,
            style: {
              position: "absolute",
              top: String(innerMargin - 2) + ea,
              left: String(innerMargin) + ea,
              width: withOut((innerMargin - 2) * 2, ea),
              height: withOut(innerMargin * 2, ea),
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  GeneralJs.ajaxPromise({
                    method: "designer",
                    id: desid,
                    column: "career",
                    value: this.value,
                    email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                  }, "/updateHistory").catch((err) => { console.log(err); });
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.key === "Enter") {
                    GeneralJs.ajaxPromise({
                      method: "designer",
                      id: desid,
                      column: "career",
                      value: this.value,
                      email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                    }, "/updateHistory").catch((err) => { console.log(err); });
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.stopPropagation();
                }
              }
            ],
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              fontSize: String(size - (desktop ? 1 : 0.2)) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              border: String(0),
              outline: String(0),
              overflow: "scroll",
              height: String(100) + '%',
              lineHeight: String(1.7),
            }
          },
        ]);
        nodeArr[3].value = career;

      } else {
        totalMother.removeChild(document.getElementById("memoTong"));
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.adminIconSet = function (desid) {
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
      display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
    if (instance.modes.indexOf(instance.mode) === 0) {
      instance.adminDetailLaunching(previousDesid);
    } else {
      instance.reportDetailLaunching(previousDesid);
    }
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
    if (instance.modes.indexOf(instance.mode) === 0) {
      instance.adminDetailLaunching(nextDesid);
    } else {
      instance.reportDetailLaunching(nextDesid);
    }
  });

  rInitialIcon.addEventListener("click", function (e) {
    instance.reportDetailLaunching(desid);
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      await instance.adminMemoSystem(desid);
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
        method: "designerCheckList",
        name: designer.designer,
        phone: designer.information.phone,
        option: {
          desid: designer.desid,
          designer: designer.designer,
          host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
          path: "about",
        }
      }, "/alimTalk").then(() => {
        return GeneralJs.ajaxJson({
          page: "checklist",
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

DesignerJs.prototype.adminMemoSystem = async function (desid) {
  const instance = this;
  const { createNode, withOut, colorChip, ajaxJson, dateToString, cleanChildren } = GeneralJs;
  const { ea, totalContents, belowHeight, grayBarWidth, designers } = this;
  const designer = designers.pick(desid);
  const memoBaseClassName = "memoBaseClassName";
  const memoWhitePopupClassName = "memoWhitePopupClassName";
  const textUpdateTargetClassName = "textUpdateTargetClassName";
  try {
    let memoBase, memoTong;
    let motherMargin;
    let innerMotherMargin;
    let tongBetween;
    let titleLineTop;
    let titleSize, titleWeight;
    let titleWhitePadding;
    let boxContents;
    let boxInnerPaddingLeft;
    let boxInnerPaddingTop;
    let contentsSize, contentsWeight, contentsLineHeight;
    let contentsPaddingBottom;
    let whiteOuterMargin;
    let whiteInnerMargin;
    let whiteTitleHeight;
    let whiteTitleSize;
    let whiteTitleWeight;
    let whiteTitleTextTop;
    let whiteTitleLeftVisual;
    let whiteInnerDescriptionPadding;
    let plusCircleWidth;
    let plusCircleRight;
    let plusCircleBottom;
    let plusSize;
    let plusWeight;
    let plusTextTop;
    let thisDesignerHistory;
    let renderMemo;

    motherMargin = 24;
    innerMotherMargin = 0;
    tongBetween = 16;
    titleLineTop = 10;

    titleSize = 16;
    titleWeight = 700;
    titleWhitePadding = 10;

    boxInnerPaddingLeft = 20;
    boxInnerPaddingTop = 20;

    contentsSize = 14;
    contentsWeight = 400;
    contentsLineHeight = 1.7;
    contentsPaddingBottom = 160;

    whiteOuterMargin = 72;
    whiteInnerMargin = 40;

    whiteTitleHeight = 44;

    whiteTitleSize = 22;
    whiteTitleWeight = 700;
    whiteTitleTextTop = -2;
    whiteTitleLeftVisual = 1;

    whiteInnerDescriptionPadding = 30;

    plusCircleWidth = 45;
    plusCircleRight = 24;
    plusCircleBottom = 21;

    plusSize = 38;
    plusWeight = 500;
    plusTextTop = -3;

    thisDesignerHistory = (await ajaxJson({ method: "designer", idArr: [ desid ] }, "/getHistoryTotal", { equal: true }))[desid];
    boxContents = [
      {
        title: "VOC",
        contents: thisDesignerHistory.history,
        property: "history",
      },
      {
        title: "VOD",
        contents: thisDesignerHistory.issue,
        property: "issue",
      },
      {
        title: "경력 상세",
        contents: thisDesignerHistory.career,
        property: "career",
      },
      {
        title: "자녀 및 반려 동물",
        contents: thisDesignerHistory.family,
        property: "family",
      },
      {
        title: "파트너 시공사 특징",
        contents: thisDesignerHistory.partner,
        property: "partner",
      },
      {
        title: "제작 가구 패브릭",
        contents: thisDesignerHistory.craft,
        property: "craft",
      },
      {
        title: "응대 방식",
        contents: thisDesignerHistory.reception,
        property: "reception",
      },
      {
        title: "디자인 경향",
        contents: thisDesignerHistory.styling,
        property: "styling",
      },
      {
        title: "기타 메모",
        contents: thisDesignerHistory.etc,
        property: "etc",
      }
    ];

    renderMemo = (desid, boxContents) => {
      cleanChildren(document.querySelector('.' + memoBaseClassName).firstChild);
      memoTong = createNode({
        mother: document.querySelector('.' + memoBaseClassName).firstChild,
        style: {
          display: "block",
          position: "relative",
          top: String(motherMargin) + ea,
          marginLeft: String(motherMargin) + ea,
          paddingTop: String(innerMotherMargin) + ea,
          paddingBottom: String(innerMotherMargin - tongBetween) + ea,
          paddingLeft: String(innerMotherMargin) + ea,
          paddingRight: String(innerMotherMargin - tongBetween) + ea,
          width: withOut((motherMargin * 2) + (innerMotherMargin * 2) - tongBetween, ea),
          height: withOut((motherMargin * 2) + (innerMotherMargin * 2) - tongBetween, ea),
        }
      });
      for (let i = 0; i < boxContents.length; i++) {
        createNode({
          mother: memoTong,
          event: {
            mouseenter: function (e) {
              this.children[0].children[0].children[0].style.color = colorChip.black;
              this.children[1].style.color = colorChip.green;
            },
            mouseleave: function (e) {
              this.children[0].children[0].children[0].style.color = colorChip.deactive;
              this.children[1].style.color = colorChip.black;
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            width: "calc(calc(100% - " + String(tongBetween * 3) + ea + ") / " + String(3) + ")",
            paddingTop: String(titleLineTop) + ea,
            height: "calc(calc(calc(100% - " + String(tongBetween * 3) + ea + ") / " + String(3) + ") - " + String(titleLineTop) + ea + ")",
            marginRight: String(tongBetween) + ea,
            marginBottom: String(tongBetween) + ea,
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0),
                height: withOut(0),
                border: "1px solid " + colorChip.gray4,
                boxSizing: "border-box",
                borderRadius: String(5) + "px",
                justifyContent: "center",
                alignItems: "end",
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    verticalAlign: "top",
                    position: "relative",
                    width: withOut(boxInnerPaddingLeft * 2, ea),
                    height: withOut(boxInnerPaddingTop, ea),
                    overflow: "scroll",
                  },
                  children: [
                    {
                      class: [ textUpdateTargetClassName ],
                      attribute: { index: String(i) },
                      text: boxContents[i].contents,
                      style: {
                        display: "block",
                        position: "relative",
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(contentsWeight),
                        color: colorChip.deactive,
                        lineHeight: String(contentsLineHeight),
                        paddingBottom: String(contentsPaddingBottom) + ea,
                      }
                    }
                  ]
                }
              ]
            },
            {
              text: boxContents[i].title,
              attribute: {
                index: String(i),
              },
              event: {
                click: function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisContents = boxContents[index];
                  let cancelBack, whiteBase;

                  cancelBack = createNode({
                    mother: totalContents,
                    class: [ memoWhitePopupClassName ],
                    event: {
                      click: function (e) {
                        const removeTargets = document.querySelectorAll('.' + memoWhitePopupClassName);
                        for (let dom of removeTargets) {
                          dom.remove();
                        }
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(grayBarWidth) + ea,
                      height: withOut(belowHeight, ea),
                      width: withOut(grayBarWidth, ea),
                      zIndex: String(5),
                      background: colorChip.black,
                      opacity: String(0.2),
                    }
                  });

                  whiteBase = createNode({
                    mother: totalContents,
                    attribute: { index: String(index) },
                    class: [ memoWhitePopupClassName ],
                    style: {
                      position: "fixed",
                      top: String(whiteOuterMargin) + ea,
                      left: String(grayBarWidth + whiteOuterMargin) + ea,
                      width: withOut(grayBarWidth + (whiteOuterMargin * 2), ea),
                      height: withOut(belowHeight + (whiteOuterMargin * 2), ea),
                      zIndex: String(5),
                      background: colorChip.white,
                      borderRadius: String(8) + "px",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      opacity: String(0),
                      animation: "fadeuplite 0.3s ease forwards",
                    }
                  });

                  createNode({
                    mother: whiteBase,
                    style: {
                      display: "block",
                      position: "relative",
                      paddingTop: String(whiteInnerMargin) + ea,
                      paddingBottom: String(whiteInnerMargin) + ea,
                      height: withOut(whiteInnerMargin * 2, ea),
                      width: withOut(0),
                    },
                    children: [
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginLeft: String(whiteInnerMargin) + ea,
                          width: withOut(whiteInnerMargin * 2, ea),
                          height: withOut(0),
                        },
                        children: [
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              justifyContent: "left",
                              alignItems: "start",
                              width: withOut(0),
                              height: String(whiteTitleHeight) + ea,
                            },
                            children: [
                              {
                                text: thisContents.title,
                                style: {
                                  display: "inline-block",
                                  position: "relative",
                                  fontSize: String(whiteTitleSize) + ea,
                                  fontWeight: String(whiteTitleWeight),
                                  color: colorChip.black,
                                  top: String(whiteTitleTextTop) + ea,
                                  left: String(whiteTitleLeftVisual) + ea,
                                }
                              }
                            ]
                          },
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              width: withOut(0),
                              height: withOut(whiteTitleHeight, ea),
                              border: "1px solid " + colorChip.gray3,
                              borderRadius: String(8) + "px",
                              justifyContent: "center",
                              alignItems: "end",
                            },
                            children: [
                              {
                                style: {
                                  display: "inline-block",
                                  position: "relative",
                                  overflow: "scroll",
                                  width: withOut(whiteInnerDescriptionPadding * 2, ea),
                                  height: withOut(whiteInnerDescriptionPadding, ea),
                                },
                                children: [
                                  {
                                    class: [ textUpdateTargetClassName ],
                                    attribute: { index: String(index) },
                                    text: thisContents.contents,
                                    style: {
                                      display: "block",
                                      position: "relative",
                                      fontSize: String(contentsSize) + ea,
                                      fontWeight: String(contentsWeight),
                                      lineHeight: String(contentsLineHeight),
                                      paddingBottom: String(contentsPaddingBottom) + ea,
                                      color: colorChip.black,
                                    }
                                  }
                                ]
                              },
                              {
                                event: {
                                  selectstart: (e) => { e.preventDefault(); },
                                  click: async function (e) {
                                    try {
                                      const index = Number(this.getAttribute("index"));
                                      const baseTarget = this.parentElement.children[0];
                                      let textArea, text;
                                      let areaTarget;
                                      let updateValue;
                                      let updateTargets;
                                      let profile;
                                      let thisMember;

                                      if (baseTarget.querySelector("textarea") === null) {

                                        profile = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                                        if (profile === null) {
                                          window.alert("허가된 멤버가 아닙니다!");
                                          window.localStorage.clear();
                                          window.location.reload();
                                        }
                                        thisMember = (await ajaxJson({ type: "boo", value: profile.homeliaisonConsoleLoginedEmail }, "/getMembers")).result;

                                        text = "-------- " + dateToString(new Date(), true) + " / " + thisMember.name + " --------";
                                        text += "\n\n";
                                        text += "\n\n";
                                        text += "----------------------------------------------";
                                        text += "\n\n";
                                        text += thisContents.contents;

                                        textArea = createNode({
                                          mother: baseTarget,
                                          mode: "textarea",
                                          attribute: { index: String(index) },
                                          event: {
                                            keydown: function (e) {
                                              if (e.key === "Tab") {
                                                e.preventDefault();
                                              }
                                            },
                                            keyup: async function (e) {
                                              try {
                                                if (e.key === "Tab") {
                                                  const index = Number(this.getAttribute("index"));

                                                  updateValue = this.value.trim();
                                                  await ajaxJson({ id: desid, column: boxContents[index].property, value: updateValue, email: null }, "/updateDesignerHistory");

                                                  boxContents[index].contents = updateValue;
                                                  thisContents.contents = updateValue;

                                                  updateTargets = document.querySelectorAll('.' + textUpdateTargetClassName);
                                                  for (let dom of updateTargets) {
                                                    if (Number(dom.getAttribute("index")) === index) {
                                                      cleanChildren(dom);
                                                      dom.insertAdjacentHTML("beforeend", updateValue.replace(/\n/gi, "<br>"));
                                                    }
                                                  }

                                                  this.remove();

                                                }
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            }
                                          },
                                          text,
                                          style: {
                                            display: "block",
                                            position: "absolute",
                                            top: String(0),
                                            left: String(0),
                                            paddingBottom: String(contentsPaddingBottom) + ea,
                                            width: withOut(0, ea),
                                            height: withOut(0, ea),
                                            background: colorChip.white,
                                            border: String(0),
                                            outline: String(0),
                                            fontSize: String(contentsSize) + ea,
                                            fontWeight: String(contentsWeight),
                                            lineHeight: String(contentsLineHeight),
                                            color: colorChip.green,
                                          }
                                        });

                                        textArea.focus();

                                      } else {

                                        areaTarget = baseTarget.querySelector("textarea");
                                        updateValue = areaTarget.value.trim();
                                        await ajaxJson({ id: desid, column: boxContents[index].property, value: updateValue, email: null }, "/updateDesignerHistory");

                                        boxContents[index].contents = updateValue;
                                        thisContents.contents = updateValue;

                                        updateTargets = document.querySelectorAll('.' + textUpdateTargetClassName);
                                        for (let dom of updateTargets) {
                                          if (Number(dom.getAttribute("index")) === index) {
                                            cleanChildren(dom);
                                            dom.insertAdjacentHTML("beforeend", updateValue.replace(/\n/gi, "<br>"));
                                          }
                                        }

                                        areaTarget.remove();

                                      }

                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                },
                                attribute: { index: String(index) },
                                style: {
                                  display: "inline-flex",
                                  position: "absolute",
                                  width: String(plusCircleWidth) + ea,
                                  height: String(plusCircleWidth) + ea,
                                  borderRadius: String(plusCircleWidth) + ea,
                                  background: colorChip.gradientGreen,
                                  bottom: String(plusCircleBottom) + ea,
                                  right: String(plusCircleRight) + ea,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                },
                                children: [
                                  {
                                    text: "+",
                                    attribute: { index: String(index) },
                                    event: {
                                      selectstart: (e) => { e.preventDefault(); },
                                    },
                                    style: {
                                      fontSize: String(plusSize) + ea,
                                      fontWeight: String(plusWeight),
                                      color: colorChip.white,
                                      fontFamily: "graphik",
                                      position: "relative",
                                      top: String(plusTextTop) + ea,
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  });

                }
              },
              style: {
                display: "inline-block",
                position: "absolute",
                paddingLeft: String(titleWhitePadding) + ea,
                paddingRight: String(titleWhitePadding) + ea,
                background: colorChip.white,
                zIndex: String(1),
                top: String(0),
                left: String(titleWhitePadding) + ea,
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
                cursor: "pointer",
              }
            }
          ]
        });
      }
    }

    if ([ ...document.querySelectorAll('.' + memoBaseClassName) ].length > 0) {
      if ([ ...document.querySelectorAll('.' + memoWhitePopupClassName) ].length > 0) {
        const removeTargets = document.querySelectorAll('.' + memoWhitePopupClassName);
        for (let dom of removeTargets) {
          dom.remove();
        }
      }
      if (document.querySelector('.' + memoBaseClassName).getAttribute("desid") === desid) {
        document.querySelector('.' + memoBaseClassName).remove();
      } else {
        document.querySelector('.' + memoBaseClassName).setAttribute("desid", desid);
        renderMemo(desid, boxContents);
      }

      return;
    }

    memoBase = createNode({
      mother: totalContents,
      attribute: { desid },
      class: [ memoBaseClassName ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(grayBarWidth) + ea,
        height: withOut(belowHeight, ea),
        width: withOut(grayBarWidth, ea),
        zIndex: String(4),
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            top: String(0),
            left: String(0),
            width: withOut(0),
            height: withOut(0),
            background: colorChip.white,
          }
        }
      ]
    }).children[0];

    renderMemo(desid, boxContents);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.adminView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    if (GeneralJs.returnGet().entire !== "true") {
      this.backGrayBar();
    }
    await this.spreadData(null, true, null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let designers, length;
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
    let projects, clients;

    if (typeof getObj.desid === "string" && getObj.normal === "true") {
      designers = await ajaxJson({ noFlat: true, whereQuery: { desid: getObj.desid } }, "/getDesigners", { equal: true });
    } else {
      designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    }
    length = designers.length;
    this.designers = new Designers(designers);

    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.modes = [ "admin", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[0];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };
    this.entireMode = entireMode;
    this.normalMode = normalMode;
    if (normalMode) {
      this.ea = "px";
    }

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
            instance.adminDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.adminDetailLaunching(searchResult[0].desid);
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
          instance.adminDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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
    if (desktop) {
      window.addEventListener("resize", (e) => {
        window.location.reload();
      });
    }
    window.addEventListener("popstate", (e) => {
      let targets, targetIndex;
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          instance.adminDetailLaunching(instance.pageHistory[1].desid);
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        }
      }
    });

    this.projectAreas = [];
    this.projectBlocks = [];

    //launching
    this.adminDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
