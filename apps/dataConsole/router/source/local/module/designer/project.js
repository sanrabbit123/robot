DesignerJs.prototype.projectDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;

  // if (middleMode) {
  //   if (typeof GeneralJs.stacks["designerConsoleSseEvent"] === "function") {
  //     GeneralJs.stacks["designerConsoleSseSource"].removeEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  //     GeneralJs.stacks["designerConsoleSseSource"] = null;
  //     GeneralJs.stacks["designerConsoleSseEvent"] = null;
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"] = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
  //   GeneralJs.stacks["designerConsoleSseEvent"] = function (e) {
  //     instance.checkListSseParsing(GeneralJs.equalJson(e.data));
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"].addEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  // }

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  if (!middleMode) {
    this.pageHistory.unshift({ path: "project", status: "list", desid });
  }
  window.history.pushState({ path: "project", status: "list", desid }, '');

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

  if (middleMode) {
    ajaxJson({
      page: "project",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.projectDetail(desid);
  this.projectIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }
}

DesignerJs.prototype.projectDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, findByAttribute, uniqueValue } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, projectMap } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const token = "__split__";
  let designer;
  let margin;
  let baseTong0, baseTong;
  let tempObj, nodeArr, subNodeArr;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let temp;
  let tong;
  let baseTongMarginBottom;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let divisionEntireMap;
  let baseArea;
  let num, num2;
  let areaBetween;
  let innerPaddingTop;
  let innerPaddingLeft;
  let titleHeight;
  let areaPaddingTop, areaPaddingLeft, areaPaddingBottom;
  let areaTitleTop, areaTitleLeft;
  let fontSize0, fontSize1, fontSize2, fontSize3;
  let mainTitleTextTop, mainTitleTextLeft;
  let countNumberBetween;
  let countNumberTextTop;
  let lastMargin;
  let cardHeight;
  let cardMargin;
  let areaMinHeight;
  let cards;
  let whiteCard, nameWord, idWord;
  let division;
  let divideArr, sizeArr;
  let totalStandard;
  let tempSize;
  let divideNumber;
  let cardWidthConstant;
  let fixedHeightSize;
  let outerMargin;
  let cardMagin;
  let divisionMap;
  let nameFontSize, nameWordTop;
  let idFontSize, idWordTop;
  let intend;
  let between;
  let requestNumber;

  designer = this.designers.pick(desid);
  divisionEntireMap = projectMap.action.itemMap;
  divisionMap = [];
  for (let arr of divisionEntireMap) {
    divisionMap = divisionMap.concat(arr[1]);
  }

  cardWidthConstant = 140;
  fixedHeightSize = 40;

  margin = 8;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  outerMargin = <%% 24, 24, 24, 24, 4 %%>;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = 50;

  areaBetween = <%% 13, 12, 12, 12, 12 %%>;
  innerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  innerPaddingLeft = <%% 36, 36, 36, 36, 36 %%>;
  titleHeight = <%% 62, 62, 62, 62, 62 %%>;

  areaPaddingTop = <%% 50, 50, 50, 50, 50 %%>;
  areaPaddingLeft = <%% 15, 15, 15, 15, 15 %%>;
  areaPaddingBottom = <%% 15, 15, 15, 15, 15 %%>;

  areaTitleTop = <%% 14, 14, 14, 14, 14 %%>;
  areaTitleLeft = <%% 20, 20, 20, 20, 20 %%>;

  fontSize0 = <%% 25, 25, 25, 25, 25 %%>;
  fontSize1 = <%% 17, 17, 17, 17, 17 %%>;
  fontSize2 = <%% 14, 14, 14, 14, 14 %%>;
  fontSize3 = <%% 12, 12, 12, 12, 12 %%>;

  mainTitleTextTop = <%% -3, -3, -3, -3, -3 %%>;
  mainTitleTextLeft = <%% 3, 3, 3, 3, 3 %%>;
  countNumberBetween = <%% 9, 9, 9, 9, 9 %%>;
  countNumberTextTop = <%% 1, 1, 1, 1, 1 %%>;

  lastMargin = <%% 30, 30, 30, 30, 30 %%>;

  cardHeight = <%% 40, 40, 40, 40, 40 %%>;
  cardMargin = <%% 10, 10, 10, 10, 10 %%>;
  areaMinHeight = cardHeight + (cardMargin * 2);

  cardMagin = <%% 10, 10, 10, 10, 1 %%>;

  nameFontSize = <%% 14, 14, 14, 14, 3.5 %%>;
  idFontSize = <%% 11, 11, 11, 11, 2.8 %%>;
  nameWordTop = <%% (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), 2 %%>;
  idWordTop = <%% (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), 3 %%>;
  intend = <%% 16, 16, 16, 16, 4 %%>;
  between = <%% 8, 8, 8, 8, 1 %%>;

  cards = designer.projects;

  divideArr = [];
  sizeArr = [];
  for (let i = 0; i < 5; i++) {
    totalStandard = (window.innerWidth - this.grayBarWidth - (outerMargin * 2) - (innerPaddingLeft * 2) - 2 - (areaPaddingLeft * 2) - (((areaPaddingLeft * 2) + areaBetween + 2) * i)) / (i + 1);
    divideNumber = Math.floor(totalStandard / (cardMagin + cardWidthConstant));
    tempSize = (totalStandard - (cardMagin * (divideNumber + 1))) / divideNumber;
    divideArr.push(divideNumber);
    sizeArr.push(tempSize);
  }

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : (this.middleMode ? String(60) + "px" : String(0)),
      left: String(grayBarWidth + outerMargin) + ea,
      width: withOut(grayBarWidth + (outerMargin * 2), ea),
      height: "auto",
      animation: "",
      paddingTop: desktop ? "" : String(outerMargin) + ea,
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
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: desktop ? String(innerPaddingTop) + ea : String(baseTongPaddingTop) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
    }
  });

  division = new Map();
  for (let [ title, subTitles ] of divisionEntireMap) {

    createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        height: String(titleHeight) + ea,
        paddingLeft: String(innerPaddingLeft) + ea,
      },
      children: [
        {
          text: title,
          style: {
            fontSize: String(fontSize0) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            position: "relative",
            top: String(mainTitleTextTop) + ea,
            left: String(mainTitleTextLeft) + ea,
          }
        }
      ]
    });

    num2 = 0;
    for (let subTitle of subTitles) {
      baseArea = createNode({
        mother: baseTong,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          paddingLeft: String(innerPaddingLeft) + ea,
          width: withOut(innerPaddingLeft * 2, ea),
          marginBottom: String(num2 !== subTitles.length - 1 ? areaBetween : lastMargin) + ea,
        },
      });
      num = 0;
      for (let sub of subTitle) {
        tong = createNode({
          mother: baseArea,
          style: {
            verticalAlign: "top",
            position: "relative",
            borderRadius: String(5) + "px",
            border: "1px dashed " + colorChip.gray4,
            boxSizing: "border-box",
            width: "calc(calc(100% - " + String(areaBetween * (subTitle.length - 1)) + ea + ") / " + String(subTitle.length) + ")",
            marginRight: String(num !== subTitle.length - 1 ? areaBetween : 0) + ea,
            paddingTop: String(areaPaddingTop) + ea,
            paddingLeft: String(areaPaddingLeft) + ea,
            paddingRight: String(areaPaddingLeft) + ea,
            paddingBottom: String(areaPaddingBottom) + ea,
          },
          children: [
            {
              style: {
                display: "block",
                position: "absolute",
                width: withOut(areaTitleLeft * 2, ea),
                top: String(areaTitleTop) + ea,
                left: String(areaTitleLeft) + ea,
              },
              children: [
                {
                  text: sub,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(fontSize1) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                  }
                },
                {
                  text: String(0) + "명",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(fontSize2) + ea,
                    fontWeight: String(400),
                    color: colorChip.deactive,
                    top: String(countNumberTextTop) + ea,
                    marginLeft: String(countNumberBetween) + ea,
                  }
                }
              ]
            },
            {
              attribute: {
                kinds: "area",
                name: sub,
                action: sub,
                family: JSON.stringify(subTitle),
                length: String(subTitle.length),
                size: String(sizeArr[subTitle.length - 1]),
                divide: String(divideArr[subTitle.length - 1]),
              },
              event: {
                dragenter: (e) => { e.preventDefault(); },
                dragleave: function (e) {
                  e.preventDefault();
                  this.style.background = colorChip.gray1;
                  this.parentElement.firstChild.style.color = colorChip.black;
                },
                dragover: function (e) {
                  e.preventDefault();
                  this.style.background = colorChip.whiteGreen;
                  this.parentElement.firstChild.style.color = colorChip.green;
                },
                drop: async function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  const name = this.getAttribute("name");
                  const length = Number(this.getAttribute("length"));
                  const size = Number(this.getAttribute("size"));
                  const divide = Number(this.getAttribute("divide"));
                  const proid = e.dataTransfer.getData("dragData").split(token)[0];
                  const fromAction = e.dataTransfer.getData("dragData").split(token)[1];
                  const requestNumber = Number(e.dataTransfer.getData("dragData").split(token)[2]);
                  const card = findByAttribute(instance.whiteCards, [ "proid", "request" ], [ proid, String(requestNumber) ]);
                  const from = division.get(fromAction);
                  const fromSize = Number(from.getAttribute("size"));
                  const fromName = from.getAttribute("name");
                  const fromDivide = Number(from.getAttribute("divide"));
                  instance.randomToken = uniqueValue();
                  try {
                    let thisChildren;
                    let thisChildrenLength;

                    this.style.background = colorChip.gray1;
                    this.parentElement.firstChild.style.color = colorChip.black;
                    this.appendChild(card);

                    thisChildren = this.children;
                    thisChildrenLength = thisChildren.length;
                    for (let c of thisChildren) {
                      c.style.width = String(size) + ea;
                    }

                  } catch (e) {
                    console.log(e);
                  }
                },
              },
              style: {
                display: "block",
                position: "relative",
                background: colorChip.gray1,
                minHeight: String(areaMinHeight - cardMagin) + ea,
                height: withOut(cardMagin, ea),
                borderRadius: String(5) + "px",
                paddingBottom: String(cardMagin) + ea,
              }
            }
          ]
        });
        division.set(sub, tong.children[1]);
        num++;
      }
      num2++;
    }
  }

  this.whiteCards = [];
  for (let obj of cards) {
    whiteCard = createNode({
      mother: division.get(obj.process.action),
      attribute: {
        kinds: "card",
        action: obj.process.action,
        proid: obj.proid,
        cliid: obj.cliid,
        draggable: "true",
        request: String(obj.requestNumber),
      },
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData("dragData", this.getAttribute("proid") + token + this.getAttribute("action") + token + this.getAttribute("request"));
        },
        dragend: function (e) {
          e.preventDefault();
        },
        dragenter: function (e) {
          e.preventDefault();
        },
        dragleave: function (e) {
          e.preventDefault();
        },
        click: function (e) {
          const proid = this.getAttribute("proid");
          const action = this.getAttribute("action");
          const requestNumber = Number(this.getAttribute("request"));
          const cliid = this.getAttribute("cliid");
          const totalMother = document.querySelector(".totalMother");
          const zIndex = 2;
          let cancelBack, whiteBox;
          let whiteMargin;

          whiteMargin = 40;
          cancelBack = createNode({
            mother: totalMother,
            event: {
              click: function (e) {
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(instance.grayBarWidth) + ea,
              width: withOut(instance.grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.shadow,
              zIndex: String(zIndex),
              animation: "justfadeinmiddle 0.3s ease forwards",
            }
          });
          whiteBox = createNode({
            mother: totalMother,
            style: {
              position: "fixed",
              top: String(whiteMargin) + ea,
              left: String(instance.grayBarWidth + whiteMargin) + ea,
              width: withOut(instance.grayBarWidth + (whiteMargin * 2), ea),
              height: withOut(belowHeight + (whiteMargin * 2), ea),
              background: colorChip.white,
              borderRadius: String(5) + "px",
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorChip.darkDarkShadow,
              animation: "fadeup 0.3s ease forwards",
            }
          });

          instance.projectWhiteDetail(whiteBox, proid, cliid, requestNumber, desid);
        }
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + ea,
        height: String(fixedHeightSize) + ea,
        marginLeft: String(cardMagin) + ea,
        marginTop: String(cardMagin) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        cursor: "pointer",
      }
    });

    nameWord = createNode({
      mother: whiteCard,
      text: obj.name,
      style: {
        position: "absolute",
        fontSize: String(nameFontSize) + ea,
        fontWeight: String(500),
        top: String(nameWordTop) + ea,
        left: String(intend) + ea,
        color: GeneralJs.colorChip.black,
        cursor: "pointer",
      }
    });

    idWord = createNode({
      mother: whiteCard,
      text: obj.proid,
      style: {
        position: "absolute",
        fontSize: String(idFontSize) + ea,
        fontWeight: String(400),
        top: String(idWordTop) + ea,
        left: String(intend + nameWord.getBoundingClientRect().width + between) + ea,
        color: colorChip.green,
        cursor: "pointer",
      }
    });

    this.whiteCards.push(whiteCard);
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.projectWhiteDetail = function (mother, proid, cliid, requestNumber, desid) {
  const instance = this;
  const { createNode, colorChip, withOut, ajaxJson } = GeneralJs;
  const { ea, projects, clients, designers } = this;
  let pIndex, cIndex;
  let project, client, designer;
  let base;
  let baseTop;
  let baseLeft;
  let titleSize;
  let titleTextBetween;
  let titlePaddingBottom;

  pIndex = projects.findIndex((obj) => { return obj.proid === proid; });
  cIndex = clients.findIndex((obj) => { return obj.cliid === cliid; });
  if (pIndex !== -1 && cIndex !== -1) {
    project = projects[pIndex];
    client = clients[cIndex];
    designer = designers.pick(desid);
    const { request, analytics } = client.requests[requestNumber];

    baseTop = 40;
    baseLeft = 45;
    titleSize = 21;
    titleTextBetween = 10;
    titlePaddingBottom = 12;

    base = createNode({
      mother,
      style: {
        display: "block",
        position: "relative",
        top: String(baseTop) + ea,
        left: String(baseLeft) + ea,
        width: withOut(baseLeft * 2, ea),
        height: withOut(baseTop * 2, ea),
        overflow: "scroll",
      }
    })

    createNode({
      mother: base,
      style: {
        display: "block",
        position: "relative",
        paddingBottom: String(titlePaddingBottom) + ea,
        borderBottom: "1px solid " + colorChip.gray3
      },
      children: [
        {
          text: "프로젝트 관리 :",
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
          }
        },
        {
          text: client.name,
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(300),
            color: colorChip.green,
            marginLeft: String(titleTextBetween) + ea,
          }
        }
      ]
    })









  }
}


DesignerJs.prototype.projectIconSet = function (desid) {
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
        instance.projectDetailLaunching(previousDesid);
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
        instance.projectDetailLaunching(nextDesid);
      } else {
        instance.reportDetailLaunching(nextDesid);
      }
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
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          instance.listIcon.style.left = String(left) + ea;
          grayBack.setAttribute("toggle", "on");
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
        blankHref(FRONTHOST + "/desdetail.php?qqq=de" + id);
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
    instance.reportDetailLaunching(desid);
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
          host: GHOSTHOST,
          path: "console",
        }
      }, "/alimTalk").then(() => {
        return GeneralJs.ajaxJson({
          page: "project",
          mode: "send",
          who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
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

DesignerJs.prototype.projectView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    const getObj = returnGet();
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

    if (!middleMode) {
      designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
      length = designers.length;
      this.designers = new Designers(designers);
    } else {
      designers = await ajaxJson({ noFlat: true, whereQuery: { desid: getObj.desid } }, "/getDesigners", { equal: true });
      if (designers.length === 0) {
        throw new Error("invaild desid");
      }
      length = designers.length;
      this.designers = new Designers(designers);
      this.designer = this.designers.pick(getObj.desid);
    }

    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible" ];
    this.mode = this.modes[0];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    if (!middleMode) {
      this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: { $regex: "^d" } } }, "/getProjects", { equal: true });
    } else {
      this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: this.desid } }, "/getProjects", { equal: true });
    }

    this.clients = await ajaxJson({ noFlat: true, whereQuery: { $or: [ ...new Set(this.projects.map((obj) => { return obj.cliid; })) ].map((cliid) => { return { cliid }; }) } }, "/getClients", { equal: true })
    this.designers.setProjects(this.projects);
    this.designers.setClients(this.clients);

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    if (!middleMode) {
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
              instance.projectDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
            } else {
              searchResult = instance.designers.search(value);
              if (searchResult.length > 0) {
                instance.projectDetailLaunching(searchResult[0].desid);
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
            instance.projectDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    this.projectMap = await ajaxJson({ method: "projectMap" }, "/getDataPatch");

    //sse
    // if (!this.middleMode) {
    //   const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
    //   es.addEventListener("updateTong", (e) => {
    //     instance.checkListSseParsing(equalJson(e.data));
    //   });
    // }

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
        if (!middleMode) {
          if (getObj.mode === instance.pageHistory[1].path) {
            instance.projectDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        } else {

          targets = document.querySelectorAll(".leftMenus");
          if (instance.pageHistory[1].status === "page") {
            if (targets[instance.pageHistory[1].index] !== undefined) {
              targets[instance.pageHistory[1].index].click();
            } else if (instance.menuMap[instance.pageHistory[1].index] !== undefined) {
              instance.menuMap[instance.pageHistory[1].index].event.call(({
                getAttribute: (index) => {
                  return instance.pageHistory[1].index;
                }
              }));
            }
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else if (instance.pageHistory[1].status === "card") {
            targetIndex = 5;
            if (targets[targetIndex] !== undefined) {
              targets[targetIndex].click();
            } else if (instance.menuMap[targetIndex] !== undefined) {
              instance.menuMap[targetIndex].event.call(({
                getAttribute: (index) => {
                  return targetIndex;
                }
              }));
            }
            instance.pageHistory.shift();
            for (let box of instance.requestBoxes) {
              if (box.getAttribute("cliid") === instance.pageHistory[1].cliid) {
                box.click();
              }
            }
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }

        }
      }
    });

    //launching
    this.projectDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
