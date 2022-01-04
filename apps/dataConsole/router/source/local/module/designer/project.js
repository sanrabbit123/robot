DesignerJs.prototype.projectDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;

  if (middleMode) {
    if (typeof GeneralJs.stacks["designerConsoleSseEvent"] === "function") {
      GeneralJs.stacks["designerConsoleSseSource"].removeEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
      GeneralJs.stacks["designerConsoleSseSource"] = null;
      GeneralJs.stacks["designerConsoleSseEvent"] = null;
    }
    GeneralJs.stacks["designerConsoleSseSource"] = new EventSource("https://" + SSEHOST + ":3000/specificsse/projectCard");
    GeneralJs.stacks["designerConsoleSseEvent"] = function (e) {
      instance.projectSseParsing(GeneralJs.equalJson(e.data));
    }
    GeneralJs.stacks["designerConsoleSseSource"].addEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  }

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
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, findByAttribute, uniqueValue, swipePatch, scrollTo } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, projectMap, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const token = "__split__";
  const detailWhitePopupConst = "detailWhitePopupConst";
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
  let divisionMap;
  let nameFontSize, nameWordTop;
  let idFontSize, idWordTop;
  let intend;
  let between;
  let requestNumber;
  let grayBarWidthMinus;
  let numbers;
  let greenPannel;
  let greenPannelBottom, greenPannelRight, greenPannelVisual;
  let greenPannelHeight, greenPannelZIndex;
  let greenPannelPaddingLeft, greenPannelPaddingTop;
  let greenPannelCard;
  let greenPannelCardPaddingLeft;
  let greenPannelCardHeight;
  let greenPannelCardInnerMargin;
  let greenPannelCardSize, greenPannelCardWeight;
  let greenPannelCardVisual;

  designer = this.designers.pick(desid);
  divisionEntireMap = projectMap.action.itemMap;
  divisionMap = [];
  for (let arr of divisionEntireMap) {
    divisionMap = divisionMap.concat(arr[1]);
  }

  cardWidthConstant = <%% 140, 140, 140, 140, 14 %%>;
  fixedHeightSize = <%% 40, 40, 40, 40, 7 %%>;

  margin = <%% 8, 8, 8, 8, 1 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  outerMargin = <%% 24, 24, 24, 24, 4 %%>;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = <%% 50, 50, 50, 50, 5 %%>;

  areaBetween = <%% 13, 12, 12, 12, 1.5 %%>;
  innerPaddingTop = <%% 24, 22, 20, 16, 5.2 %%>;
  innerPaddingLeft = <%% 36, 32, 30, 24, 6 %%>;
  titleHeight = <%% 62, 58, 56, 52, 10.5 %%>;

  areaPaddingTop = <%% (isMac() ? 48 : 47), (isMac() ? 48 : 47), (isMac() ? 46 : 45), (isMac() ? 44 : 43), 7.5 %%>;
  areaPaddingLeft = 0;
  areaPaddingBottom = 0;

  areaTitleTop = <%% (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), (isMac() ? 13 : 15), 1.7 %%>;
  areaTitleLeft = <%% 20, 20, 20, 20, 3 %%>;

  fontSize0 = <%% 25, 23, 22, 21, 4 %%>;
  fontSize1 = <%% 16, 16, 15, 14, 2.8 %%>;
  fontSize2 = <%% 14, 14, 13, 12, 3 %%>;
  fontSize3 = <%% 12, 12, 11, 11, 2.5 %%>;

  mainTitleTextTop = <%% -3, -3, -3, -3, 0 %%>;
  mainTitleTextLeft = <%% 3, 3, 3, 3, 1 %%>;
  countNumberBetween = <%% 9, 9, 9, 9, 1 %%>;
  countNumberTextTop = <%% 1, 1, 1, 1, 0 %%>;

  lastMargin = <%% 30, 30, 30, 30, 3 %%>;

  cardHeight = <%% 40, 40, 40, 40, 6 %%>;
  cardMargin = <%% 10, 10, 10, 10, 1.5 %%>;
  areaMinHeight = cardHeight + (cardMargin * 2);

  nameFontSize = <%% 14, 14, 14, 14, 2.8 %%>;
  idFontSize = <%% 11, 11, 11, 11, 2.8 %%>;
  nameWordTop = <%% (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), (isMac() ? 9 : 11), -0.3 %%>;
  idWordTop = <%% (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 13 : 14), 3 %%>;
  intend = <%% 16, 16, 16, 16, 4 %%>;
  between = <%% 8, 8, 8, 8, 1 %%>;

  greenPannelBottom = <%% 40, 40, 40, 40, 4 %%>;
  greenPannelRight = <%% 40, 40, 40, 40, 4 %%>;
  greenPannelVisual = <%% 2, 2, 2, 2, 0 %%>;
  greenPannelHeight = <%% 95, 95, 95, 95, 9 %%>;
  greenPannelZIndex = <%% 3, 3, 3, 3, 0 %%>;

  greenPannelPaddingLeft = <%% 12, 12, 12, 12, 1 %%>;
  greenPannelPaddingTop = <%% 12, 12, 12, 12, 1 %%>;

  greenPannelCardPaddingLeft = <%% 16, 16, 16, 16, 2 %%>;
  greenPannelCardHeight = <%% 33, 33, 33, 33, 3 %%>;
  greenPannelCardInnerMargin = <%% 5, 5, 5, 5, 1 %%>;

  greenPannelCardSize = <%% 13, 13, 13, 13, 1 %%>;
  greenPannelCardWeight = 500;
  greenPannelCardVisual = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 0 %%>;

  grayBarWidthMinus = this.grayBarWidth;
  cards = designer.projects;

  divideArr = [];
  sizeArr = [];
  for (let i = 0; i < 5; i++) {
    if (desktop) {
      totalStandard = (window.innerWidth - grayBarWidthMinus - (outerMargin * 2) - (innerPaddingLeft * 2) - 2 - (areaPaddingLeft * 2) - (((areaPaddingLeft * 2) + areaBetween + 2) * i)) / (i + 1);
    } else {
      totalStandard = (100 - (outerMargin * 2) - (innerPaddingLeft * 2) - (areaPaddingLeft * 2) - (((areaPaddingLeft * 2) + areaBetween + 2) * i)) / (i + 1);
    }
    divideNumber = Math.floor(totalStandard / (cardMargin + cardWidthConstant));
    if (divideNumber === 0) {
      divideNumber = 1;
    }
    tempSize = (totalStandard - (cardMargin * (divideNumber + 1))) / divideNumber;
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
      paddingTop: String(innerPaddingTop) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
    }
  });

  greenPannel = createNode({
    mother: baseTong0,
    style: {
      display: desktop ? "block" : "none",
      position: "fixed",
      bottom: String(belowHeight + greenPannelBottom) + ea,
      right: String(greenPannelRight) + ea,
      width: withOut(grayBarWidth + (greenPannelRight * 2) + (greenPannelVisual) + (greenPannelPaddingLeft * 2), ea),
      height: String(greenPannelHeight - (greenPannelPaddingTop * 2)) + ea,
      background: colorChip.gradientGreen3,
      zIndex: String(greenPannelZIndex),
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      opacity: String(0),
      animation: "fadeup 0.5s ease 0.7s forwards",
      paddingTop: String(greenPannelPaddingTop) + ea,
      paddingBottom: String(greenPannelPaddingTop) + ea,
      paddingLeft: String(greenPannelPaddingLeft) + ea,
      paddingRight: String(greenPannelPaddingLeft) + ea,
      overflow: "scroll",
    }
  });
  this.greenPannel = greenPannel;
  GeneralJs.stacks.greenPannel = greenPannel;

  numbers = new Map();
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
                    display: desktop ? "inline-block" : "none",
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
                minHeight: String(areaMinHeight - cardMargin) + ea,
                height: withOut(cardMargin, ea),
                borderRadius: String(5) + "px",
                paddingBottom: String(cardMargin) + ea,
                borderTopRightRadius: desktop ? "" : String(0),
                borderTopLeftRadius: desktop ? "" : String(0),
              }
            }
          ]
        });
        numbers.set(sub, tong.children[0].children[1]);
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
          let whiteResult;
          let mobileNavigatorHeight;

          if (instance.greenPannel !== undefined && instance.greenPannel !== null) {
            instance.greenPannel.style.bottom = String(-1 * greenPannelHeight) + "px";
          }

          whiteMargin = <%% 40, 40, 40, 40, 4 %%>;
          mobileNavigatorHeight = 60;
          cancelBack = createNode({
            mother: totalMother,
            mode: "aside",
            event: {
              click: function (e) {
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                if (instance.greenPannel !== undefined && instance.greenPannel !== null) {
                  instance.greenPannel.style.bottom = String(belowHeight + greenPannelBottom) + "px";
                }
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(instance.grayBarWidth) + ea,
              width: withOut(instance.grayBarWidth, ea),
              height: desktop ? withOut(belowHeight, ea) : String(100) + "%",
              background: colorChip.shadow,
              zIndex: String(zIndex),
              animation: "justfadeinmiddle 0.3s ease forwards",
            }
          });
          whiteBox = createNode({
            mother: totalMother,
            mode: "aside",
            class: [ detailWhitePopupConst ],
            style: {
              position: "fixed",
              top: desktop ? String(whiteMargin) + ea : "calc(" + String(whiteMargin) + ea + " + " + String(mobileNavigatorHeight) + "px" + ")",
              left: String(instance.grayBarWidth + whiteMargin) + ea,
              width: withOut(instance.grayBarWidth + (whiteMargin * 2), ea),
              height: desktop ? withOut(belowHeight + (whiteMargin * 2), ea) : "calc(calc(100% - " + String(whiteMargin * 2) + ea + ") - " + String(belowHeight + mobileNavigatorHeight) + "px)",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              zIndex: String(zIndex),
              boxShadow: "0px 3px 15px -9px " + colorChip.darkDarkShadow,
              animation: "fadeup 0.3s ease forwards",
            }
          });

          whiteResult = instance.projectWhiteDetail(whiteBox, action, proid, cliid, requestNumber, desid, divisionEntireMap);

          if (!whiteResult) {
            cancelBack.click();
          } else {

            if (mobile) {
              swipePatch({
                left: (e) => {
                  if (document.querySelector('.' + detailWhitePopupConst) !== null) {
                    document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                    document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                  }
                },
                right: (e) => {
                  if (document.querySelector('.' + detailWhitePopupConst) !== null) {
                    document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                    document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
                  }
                },
              });
            }

          }
        }
      },
      style: {
        display: desktop ? "inline-block" : "inline-flex",
        position: "relative",
        width: desktop ? String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + ea : "calc(" + String(sizeArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + ea + " - " + String(2 / divideArr[divisionMap[divisionMap.findIndex((arr) => { return arr.includes(obj.process.action); })].length - 1]) + "px" + ")",
        height: String(fixedHeightSize) + ea,
        marginLeft: String(cardMargin) + ea,
        marginTop: String(cardMargin) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        cursor: "pointer",
        justifyContent: desktop ? "" : "center",
        alignItems: desktop ? "" : "center",
      }
    });

    nameWord = createNode({
      mother: whiteCard,
      text: obj.name,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(nameFontSize) + ea,
        fontWeight: String(500),
        top: String(nameWordTop) + ea,
        marginLeft: desktop ? String(intend) + ea : "",
        color: desktop ? colorChip.black : colorChip.green,
        cursor: "pointer",
      }
    });
    idWord = createNode({
      mother: whiteCard,
      text: obj.proid,
      style: {
        display: desktop ? "inline-block" : "none",
        position: "relative",
        fontSize: String(idFontSize) + ea,
        fontWeight: String(400),
        top: String(nameWordTop) + ea,
        marginLeft: String(between) + ea,
        color: colorChip.green,
        cursor: "pointer",
      }
    });

    greenPannelCard = createNode({
      mother: greenPannel,
      attribute: {
        proid: obj.proid
      },
      event: {
        click: function (e) {
          const proid = this.getAttribute("proid");
          const target = findByAttribute(instance.whiteCards, "proid", proid);
          scrollTo(document.querySelector(".mainBaseTong").parentElement, target, 50);
        }
      },
      style: {
        display: desktop ? "inline-flex" : "none",
        position: "relative",
        background: colorChip.white,
        paddingLeft: String(greenPannelCardPaddingLeft) + ea,
        paddingRight: String(greenPannelCardPaddingLeft) + ea,
        height: String(greenPannelCardHeight) + ea,
        marginRight: String(greenPannelCardInnerMargin) + ea,
        marginBottom: String(greenPannelCardInnerMargin) + ea,
        borderRadius: String(5) + "px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      children: [
        {
          text: obj.name,
          style: {
            fontSize: String(greenPannelCardSize) + ea,
            fontWeight: String(greenPannelCardWeight),
            color: colorChip.green,
            position: "relative",
            top: String(greenPannelCardVisual) + ea,
          }
        }
      ]
    });

    this.whiteCards.push(whiteCard);
  }

  numbers.forEach((value, key) => {
    numbers.get(key).textContent = String(division.get(key).children.length) + "명";
    numbers.get(key).setAttribute("number", String(division.get(key).children.length));
  });

  this.divisionMap = division;
  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.projectWhiteDetail = function (mother, action, proid, cliid, requestNumber, desid, divisionEntireMap) {
  const instance = this;
  const { createNode, colorChip, withOut, ajaxJson, setQueue, cleanChildren, isMac } = GeneralJs;
  const { ea, projects, clients, designers, projectMap, checklist } = this;
  const { action: { itemDescription } } = projectMap;
  const mobile = this.media[4];
  const desktop = !mobile;
  let pIndex, cIndex;
  let project, client, designer;
  let base;
  let baseTop;
  let baseLeft;
  let titleSize;
  let titleTextBetween;
  let titlePaddingBottom;
  let areaMother, area;
  let areaTitleSize;
  let maxLength;
  let lengthArr;
  let areaTitleBottom;
  let rowMarginTop;
  let barHeight;
  let factorSize;
  let rowFirstMarginTop;
  let num;
  let titleHeight;
  let subTitleHeight;
  let accumulate;
  let detailBoxMarginTop;
  let whiteBoxTop, whiteBoxLeft;
  let noticeTextSize;
  let noticeTextTop, noticeTextLeft;
  let arrowTop, arrowWidth;
  let barChildren;
  let descriptionMap;
  let textArea;
  let textAreaPaddingTop;
  let textAreaPaddingLeft;
  let checklistFactor;
  let lineHeightMargin;
  let contentsPaddingLeft;
  let arrowTop2, arrowWidth2;
  let checkCircleTop;
  let checkCircleWidth;
  let checkCircleVisual;
  let textAreaMother;
  let descriptionMaker;
  let pannelBoxPaddingBottom, pannelBoxPaddingRight;
  let pannelMother;
  let pannelBlockPadding;
  let pannelBlockMargin;
  let pannelBlockHeight;
  let pannelBlockVisual;

  pIndex = projects.findIndex((obj) => { return obj.proid === proid; });
  cIndex = clients.findIndex((obj) => { return obj.cliid === cliid; });

  if (pIndex !== -1 && cIndex !== -1 && action !== "해당 없음") {
    project = projects[pIndex];
    client = clients[cIndex];
    designer = designers.pick(desid);
    const { request, analytics } = client.requests[requestNumber];

    baseTop = <%% 40, 33, 30, 22, 6 %%>;
    baseLeft = <%% 45, 38, 35, 25, 6.1 %%>;
    baseBottom = <%% 48, 41, 38, 28, 6.1 %%>;
    titleSize = <%% 21, 20, 19, 18, 4 %%>;
    titleHeight = <%% 30, 30, 30, 30, 5 %%>;
    subTitleHeight = <%% 20, 20, 20, 20, 2 %%>;
    titleTextBetween = <%% 10, 10, 10, 10, 1 %%>;
    titlePaddingBottom = <%% 13, 13, 13, 13, 2.5 %%>;
    areaTitleSize = <%% 15, 14, 14, 13, 3.4 %%>;
    rowMarginTop = <%% 22, 16, 11, 10, 3 %%>;
    rowFirstMarginTop = <%% 32, 27, 22, 17, 5 %%>;
    areaTitleBottom = <%% 13, 13, 13, 13, 1 %%>;
    barHeight = <%% 34, 34, 34, 34, 9 %%>;
    factorSize = <%% 13, 12, 12, 10, 2 %%>;
    detailBoxMarginTop = <%% 50, 40, 35, 30, 6 %%>;

    arrowTop = <%% (isMac() ? 8 : 9), (isMac() ? 8 : 9), (isMac() ? 8 : 9), (isMac() ? 8 : 9), 1 %%>;
    arrowWidth = <%% 9, 8, 8, 8, 1.5 %%>;

    whiteBoxTop = <%% 48, 46, 44, 42, 4 %%>;
    whiteBoxLeft = <%% 20, 18, 16, 14, 2 %%>;
    noticeTextSize = <%% 14, 13, 13, 12, 3 %%>;
    noticeTextTop = <%% (isMac() ? 18 : 20), (isMac() ? 18 : 20), (isMac() ? 18 : 20), (isMac() ? 18 : 20), 1 %%>;
    noticeTextLeft = <%% 24, 24, 24, 24, 3 %%>;

    accumulate = titleHeight + titlePaddingBottom + ((rowMarginTop + subTitleHeight + areaTitleBottom + barHeight) * (divisionEntireMap.length - 1)) + rowFirstMarginTop - rowMarginTop + detailBoxMarginTop;

    textAreaPaddingTop = <%% 22, 22, 22, 22, 3.8 %%>;
    textAreaPaddingLeft = <%% 26, 26, 26, 26, 4.5 %%>;
    lineHeightMargin = <%% 8, 8, 8, 8, 1 %%>;
    contentsPaddingLeft = <%% 14, 14, 13, 12, 2 %%>;
    arrowTop2 = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), 1.5 %%>;
    arrowWidth2 = <%% 8, 8, 7, 7, 1.4 %%>;
    checkCircleTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 6 : 5), (isMac() ? 5 : 5), 1.4 %%>;
    checkCircleWidth = <%% 10, 10, 9, 8, 2 %%>;
    checkCircleVisual = <%% 1, 1, 1, 1, 1 %%>;
    pannelBoxPaddingBottom = <%% 13, 13, 13, 13, 3 %%>;
    pannelBoxPaddingRight = <%% 15, 15, 15, 15, 3 %%>;
    pannelBlockPadding = <%% 15, 15, 15, 15, 3 %%>;
    pannelBlockMargin = <%% 6, 6, 6, 6, 1 %%>;
    pannelBlockHeight = <%% 33, 33, 33, 33, 7.2 %%>;
    pannelBlockVisual = <%% (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), 0.3 %%>;

    lengthArr = divisionEntireMap.map((arr) => { return arr[1].flat().length; });
    lengthArr.sort((a, b) => { return b - a; });
    maxLength = desktop ? lengthArr[0] : 3;

    textAreaMother = {};

    descriptionMap = new Map();
    for (let { name, description, pannel } of itemDescription) {
      checklistFactor = null;
      for (let check of checklist) {
        if (check.setting.target.action.includes(name)) {
          checklistFactor = check.setting.contents;
          break;
        }
      }
      descriptionMap.set(name, { description, checklist: checklistFactor, pannel });
    }
    // action, proid, cliid, requestNumber, desid
    descriptionMaker = (action, proid, cliid, requestNumber, desid) => {
      cleanChildren(textAreaMother);
      createNode({
        mother: textAreaMother,
        text: "<b%" + action + "%b>&nbsp;&nbsp;check list",
        style: {
          position: desktop ? "absolute" : "relative",
          top: String(desktop ? noticeTextTop : 0) + ea,
          left: String(noticeTextLeft) + ea,
          fontSize: String(noticeTextSize) + ea,
          fontWeight: String(400),
          color: colorChip.green,
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        bold: {
          fontSize: String(noticeTextSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
        }
      });
      textArea = createNode({
        mother: textAreaMother,
        style: {
          position: desktop ? "absolute" : "relative",
          top: String(desktop ? whiteBoxTop : 0) + ea,
          left: String(whiteBoxLeft) + ea,
          width: withOut(whiteBoxLeft * 2, ea),
          height: desktop ? withOut(whiteBoxTop + whiteBoxLeft, ea) : "",
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 2px 11px -9px " + colorChip.shadow
        },
        children: [
          {
            style: {
              position: "relative",
              paddingTop: String(textAreaPaddingTop) + ea,
              paddingLeft: String(textAreaPaddingLeft) + ea,
              paddingBottom: String(textAreaPaddingTop) + ea,
              paddingRight: String(textAreaPaddingLeft) + ea,
              width: withOut(textAreaPaddingLeft * 2, ea),
              height: withOut(textAreaPaddingTop * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  position: "relative",
                  width: String(100) + '%',
                },
                children: [
                  {
                    text: descriptionMap.get(action).description,
                    style: {
                      fontSize: String(noticeTextSize) + ea,
                      lineHeight: String(1.6),
                      fontWeight: String(400),
                      marginBottom: String(lineHeightMargin) + ea,
                      color: colorChip.black,
                      position: "relative",
                      paddingLeft: String(contentsPaddingLeft) + ea,
                    },
                    children: [
                      {
                        mode: "svg",
                        source: instance.mother.returnArrow("right", colorChip.green),
                        style: {
                          position: "absolute",
                          width: String(arrowWidth2) + ea,
                          top: String(arrowTop2) + ea,
                          left: String(0),
                        }
                      }
                    ]
                  },
                  {
                    text: "체크리스트 여부 : <b%" + (descriptionMap.get(action).checklist === null ? "없음" : "있음") + "%b>",
                    style: {
                      fontSize: String(noticeTextSize) + ea,
                      lineHeight: String(1.6),
                      fontWeight: String(400),
                      marginBottom: String(lineHeightMargin) + ea,
                      color: colorChip.black,
                      position: "relative",
                      paddingLeft: String(contentsPaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(noticeTextSize) + ea,
                      fontWeight: String(400),
                      color: colorChip.green
                    },
                    children: [
                      {
                        mode: "svg",
                        source: instance.mother.returnArrow("right", colorChip.green),
                        style: {
                          position: "absolute",
                          width: String(arrowWidth2) + ea,
                          top: String(arrowTop2) + ea,
                          left: String(0),
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }).children[0].children[0];
      if (descriptionMap.get(action).checklist !== null) {
        createNode({
          mother: textArea,
          text: descriptionMap.get(action).checklist.title,
          style: {
            fontSize: String(noticeTextSize) + ea,
            lineHeight: String(1.6),
            fontWeight: String(400),
            marginBottom: String(lineHeightMargin) + ea,
            color: colorChip.black,
            paddingLeft: String(contentsPaddingLeft) + ea,
            position: "relative",
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnArrow("right", colorChip.green),
              style: {
                position: "absolute",
                width: String(arrowWidth2) + ea,
                top: String(arrowTop2) + ea,
                left: String(0),
              }
            }
          ]
        });
        num = 1;
        for (let { title, children } of descriptionMap.get(action).checklist.checklist) {
          createNode({
            mother: textArea,
            text: "<b%" + String(num) + ".&nbsp;&nbsp;%b>" + title,
            style: {
              fontSize: String(noticeTextSize) + ea,
              lineHeight: String(1.6),
              fontWeight: String(600),
              marginBottom: String(lineHeightMargin) + ea,
              color: colorChip.black,
              paddingLeft: String(contentsPaddingLeft) + ea,
              position: "relative",
            },
            bold: {
              lineHeight: String(1.6),
              fontWeight: String(600),
              color: colorChip.green
            }
          });
          for (let { title, contents } of children) {
            createNode({
              mother: textArea,
              text: "<u%" + title + " :&nbsp;&nbsp;%u>" + contents,
              style: {
                fontSize: String(noticeTextSize) + ea,
                lineHeight: String(1.6),
                fontWeight: String(400),
                marginBottom: String(lineHeightMargin) + ea,
                color: colorChip.black,
                paddingLeft: String(contentsPaddingLeft * 3) + ea,
                position: "relative",
              },
              bold: {
                fontSize: String(noticeTextSize) + ea,
                fontWeight: String(400),
                color: colorChip.green
              },
              under: {
                fontSize: String(noticeTextSize) + ea,
                fontWeight: String(600),
                color: colorChip.black
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckCircle(colorChip.green),
                  style: {
                    position: "absolute",
                    top: String(checkCircleTop) + ea,
                    left: String((contentsPaddingLeft * 2) - checkCircleVisual) + ea,
                    width: String(checkCircleWidth) + ea,
                  }
                }
              ]
            });
          }
          num++;
        }
      }

      if (descriptionMap.get(action).pannel.length === 0 || descriptionMap.get(action).pannel[descriptionMap.get(action).pannel.length - 1].name !== "목록으로") {
        descriptionMap.get(action).pannel.push({
          name: "목록으로",
          event: (function (e) {
            document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
            document.querySelector(".totalMother").removeChild(document.querySelector(".totalMother").lastChild);
            if (GeneralJs.stacks.greenPannel !== undefined && GeneralJs.stacks.greenPannel !== null) {
              GeneralJs.stacks.greenPannel.style.bottom = String(40) + "px";
            }
          }).toString().trim().replace(/^function[^\(]*\([^\)]*\)[^\{]*\{\n?/i, '').replace(/\n?[ ]*\}$/i, '').trim()
        });
      }

      if (descriptionMap.get(action).pannel.length > 0) {

        pannelMother = createNode({
          mother: textAreaMother,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            bottom: String(desktop ? baseBottom + textAreaPaddingLeft + pannelBoxPaddingBottom - pannelBlockMargin : baseBottom - pannelBlockMargin) + ea,
            right: String(desktop ? baseLeft + textAreaPaddingLeft + pannelBoxPaddingRight : baseLeft) + ea,
          }
        });

        for (let { name, event: eventFunction } of descriptionMap.get(action).pannel) {
          createNode({
            mother: pannelMother,
            class: [ "hoverDefault_lite" ],
            attribute: {
              requestNumber: String(requestNumber),
              action, proid, cliid, desid
            },
            event: {
              click: function (e) {
                const proid = this.getAttribute("proid");
                const cliid = this.getAttribute("cliid");
                const desid = this.getAttribute("desid");
                const action = this.getAttribute("action");
                const requestNumber = Number(this.getAttribute("requestNumber"));
                const func = new Function('e', eventFunction);

                e.__data__ = {
                  proid,
                  cliid,
                  desid,
                  action,
                  requestNumber,
                  thisUrl: window.location.protocol + "//" + window.location.host + window.location.pathname + "?desid=" + desid,
                };

                func.call(this, e);
              }
            },
            style: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colorChip.gradientGreen3,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 12px -9px " + colorChip.shadow,
              height: String(pannelBlockHeight) + ea,
              textAlign: "center",
              paddingLeft: String(pannelBlockPadding) + ea,
              paddingRight: String(pannelBlockPadding) + ea,
              marginBottom: String(pannelBlockMargin) + ea,
            },
            children: [
              {
                text: name,
                style: {
                  position: "relative",
                  top: String(pannelBlockVisual * -1) + ea,
                  fontSize: String(noticeTextSize) + ea,
                  fontWeight: String(500),
                  color: colorChip.whiteBlack,
                }
              }
            ]
          });
        }

      }
    }

    base = createNode({
      mother,
      style: {
        display: "block",
        position: "relative",
        top: String(baseTop) + ea,
        left: String(baseLeft) + ea,
        width: withOut(baseLeft * 2, ea),
        height: withOut(baseTop + (desktop ? baseBottom : 0), ea),
        overflowY: "scroll",
        overflowX: "hidden",
      }
    });

    createNode({
      mother: base,
      style: {
        display: "block",
        position: "relative",
        height: String(titleHeight) + ea,
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
    });

    barChildren = [];
    num = 0;
    for (let [ title, arr ] of divisionEntireMap) {
      if (num !== divisionEntireMap.length - 1) {
        arr = arr.flat();
        areaMother = createNode({
          mother: base,
          attribute: {
            toggle: arr.includes(action) ? "on" : "off",
            focus: "off",
            index: String(num),
          },
          style: {
            display: "block",
            position: "relative",
            marginTop: String(num !== 0 ? rowMarginTop : rowFirstMarginTop) + ea,
            width: withOut(0, ea),
            opacity: arr.includes(action) ? String(1) : String(0.4),
          },
          children: [
            {
              text: title,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(areaTitleSize) + ea,
                fontWeight: String(600),
                height: desktop ? String(subTitleHeight) + ea : "",
                color: colorChip.black,
                marginBottom: desktop ? "" : String(3) + ea,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginTop: String(areaTitleBottom) + ea,
                width: String(100) + '%',
                height: desktop ? String(barHeight) + ea : "",
              }
            }
          ]
        });
        area = areaMother.children[1];
        barChildren.push(areaMother);

        for (let i = 0; i < arr.length; i++) {
          createNode({
            mother: area,
            attribute: {
              action: arr[i],
              requestNumber: String(requestNumber),
              proid, cliid, desid
            },
            event: {
              click: function (e) {
                const grandMother = this.parentElement.parentElement;
                const arrow = this.querySelector("svg").parentElement;
                const arrows = [ ...this.parentElement.querySelectorAll("svg") ].map((dom) => { return dom.parentElement; });
                const toggle = grandMother.getAttribute("toggle");
                const focus = grandMother.getAttribute("focus");
                const thisIndex = Number(grandMother.getAttribute("index"));
                const action = this.getAttribute("action");
                const proid = this.getAttribute("proid");
                const cliid = this.getAttribute("cliid");
                const requestNumber = Number(this.getAttribute("requestNumber"));
                const desid = this.getAttribute("desid");
                let focusArr, otherArrows;

                if (focus === "on") {

                  if (arrow.getAttribute("focus") === "on") {
                    grandMother.setAttribute("focus", "off");
                    for (let a of arrows) {
                      if (a.getAttribute("toggle") === "off") {
                        a.style.opacity = String(desktop ? 0 : 0.4);
                        a.setAttribute("focus", "off");
                      }
                    }
                  } else {
                    grandMother.setAttribute("focus", "off");
                    for (let a of arrows) {
                      if (a.getAttribute("toggle") === "off") {
                        a.style.opacity = String(desktop ? 0 : 0.4);
                        a.setAttribute("focus", "off");
                      }
                    }
                    grandMother.style.opacity = String(1);
                    grandMother.setAttribute("focus", "on");
                    arrow.style.opacity = String(1);
                    arrow.setAttribute("focus", "on");
                    descriptionMaker(action, proid, cliid, requestNumber, desid);
                  }
                } else {

                  for (let barChild of barChildren) {
                    if (grandMother !== barChild) {
                      barChild.style.opacity = String(0.4);
                      barChild.setAttribute("focus", "off");
                      otherArrows = [ ...barChild.querySelectorAll("svg") ].map((dom) => { return dom.parentElement; });
                      for (let a of otherArrows) {
                        if (a.getAttribute("toggle") === "off") {
                          a.style.opacity = String(desktop ? 0 : 0.4);
                          a.setAttribute("focus", "off");
                        }
                      }
                    }
                  }

                  grandMother.style.opacity = String(1);
                  grandMother.setAttribute("focus", "on");
                  arrow.style.opacity = String(1);
                  arrow.setAttribute("focus", "on");
                  descriptionMaker(action, proid, cliid, requestNumber, desid);
                }

              }
            },
            style: {
              display: "inline-block",
              position: "relative",
              height: desktop ? String(100) + '%' : String(barHeight) + ea,
              width: "calc(100% / " + String(maxLength) + ")",
              cursor: "pointer",
              marginBottom: desktop ? "" : String(1) + ea
            },
            children: [
              {
                style: {
                  position: "relative",
                  left: String(0),
                  width: String(100) + '%',
                  height: String(desktop ? 75 : 50) + '%',
                  borderBottom: "1px solid " + colorChip.gray4,
                  boxSizing: "border-box",
                }
              },
              {
                style: {
                  top: String(desktop ? 50 : 40) + '%',
                  left: String(0),
                  width: String(100) + '%',
                  position: "absolute",
                  height: String(desktop ? 50 : 20) + '%',
                  borderLeft: "1px solid " + colorChip.gray4,
                  borderRight: (i === arr.length - 1 ? "1px solid " + colorChip.gray4 : ""),
                  boxSizing: "border-box",
                }
              },
              {
                text: arr[i],
                style: {
                  position: "absolute",
                  top: desktop ? String(0) : String(-0.2) + ea,
                  left: String(0),
                  width: String(100) + '%',
                  fontSize: String(factorSize) + ea,
                  fontWeight: String(arr[i] === action ? 600 : 400),
                  color: (arr[i] === action ? colorChip.green : colorChip.black),
                  textAlign: "center",
                }
              },
              {
                attribute: {
                  toggle: arr[i] === action ? "on" : "off",
                  focus: "off",
                },
                style: {
                  display: "flex",
                  top: String(desktop ? 75 : 50) + '%',
                  left: String(0),
                  width: String(100) + '%',
                  position: "absolute",
                  height: String(50) + '%',
                  justifyContent: "center",
                  textAlign: "center",
                  paddingTop: String(arrowTop) + ea,
                  opacity: String(arr[i] === action ? 1 : (desktop ? 0 : 0.4)),
                },
                children: [
                  {
                    mode: "svg",
                    source: instance.mother.returnArrow("right", arr[i] === action ? colorChip.green : colorChip.deactive),
                    style: {
                      display: "inline-block",
                      width: String(arrowWidth) + ea,
                      transform: "rotate(270deg)",
                    }
                  }
                ]
              },
            ]
          });

        }
      }
      num++;
    }

    textAreaMother = createNode({
      mother: base,
      style: {
        display: "block",
        position: "relative",
        marginTop: String(detailBoxMarginTop) + ea,
        width: String(100) + '%',
        height: desktop ? withOut(accumulate, ea) : "",
        background: colorChip.gray0,
        borderRadius: String(5) + "px",
        paddingTop: desktop ? "" : String(2.5) + ea,
        paddingBottom: desktop ? "" : String(2.5) + ea,
        marginBottom: desktop ? "" : String(baseBottom * 5) + ea,
      }
    });

    descriptionMaker(action, proid, cliid, requestNumber, desid);

  } else {
    window.alert("해당 고객의 상태를 변경하셔야 팝업을 열 수 있습니다!");
  }

  return (pIndex !== -1 && cIndex !== -1 && action !== "해당 없음");
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

DesignerJs.prototype.projectSseParsing = function (raw) {
  const instance = this;
  const { ea } = this;
  const { equalJson, setDebounce, findByAttribute } = GeneralJs;
  const order = equalJson(raw);
  const debounceNameConst = "sseCardAction_";
  let division, num;
  let fromArea, toArea;
  let divide, oppositeDivide;
  let self, opposite;
  let thisHeightNumber, oppositeHeightNumber;
  let thisHeight, oppositeHeight;
  let finalHeight;
  let size;
  let name, oppositeName;
  let loop;
  let index, indexTong;
  let rowDom;
  let thisStandardDom, thisCaseDom;
  let length;
  let fromAction;

  if (this.divisionMap !== null) {
    division = this.divisionMap;
    num = 0;
    if (Array.isArray(order) && order.length > 0 && order[0].randomToken !== instance.randomToken) {
      for (let { proid, requestNumber, from, to, randomToken } of order) {

        setDebounce(() => {
          card = findByAttribute(instance.whiteCards, [ "proid", "request" ], [ proid, String(requestNumber) ]);
          fromArea = division.get(from);
          toArea = division.get(to);
          loop = [ fromArea, toArea ];

          if (card.parentElement !== toArea) {
            toArea.appendChild(card);
            for (let self of loop) {
              name = self.getAttribute("name");
              divide = Number(self.getAttribute("divide"));
              size = Number(self.getAttribute("size"));
              for (let c of self.children) {
                c.style.width = String(size) + ea;
              }
              self.parentElement.children[0].children[1].setAttribute("number", String(self.children.length));
              self.parentElement.children[0].children[1].textContent = String(self.children.length) + "명";
            }

            name = toArea.getAttribute("name");
            card.setAttribute("action", name);

            instance.designer.projects.find((obj) => { return obj.proid === proid }).process.action = name;
          }

        }, debounceNameConst + String(num));

        num++;
      }
    }
  }
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
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[0];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: { $regex: "^d" } } }, "/getProjects", { equal: true });
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
            if (this.value.trim() !== '') {
              let value;

              value = this.value.trim();

              if (/\:/gi.test(value)) {
                value = value.split(':')[1];
                const targets = instance.standardDoms.map((dom) => { return dom.textContent });
                const index = targets.findIndex((str) => { return (new RegExp(value, "gi")).test(str); });
                if (index !== -1) {
                  GeneralJs.setQueue(() => {
                    instance.standardDoms[index].click();
                  });
                }
              } else {
                if (document.querySelector(".detailWhitePopupConst") === null) {
                  const targets = instance.whiteCards.map((dom) => { return dom.textContent });
                  const index = targets.findIndex((str) => { return (new RegExp(value, "gi")).test(str); });
                  if (index !== -1) {
                    GeneralJs.setQueue(() => {
                      instance.whiteCards[index].click();
                    });
                  }
                } else {
                  document.querySelector(".totalMother").querySelector("aside").click();
                  GeneralJs.setQueue(() => {
                    const targets = instance.whiteCards.map((dom) => { return dom.textContent });
                    const index = targets.findIndex((str) => { return (new RegExp(value, "gi")).test(str); });
                    if (index !== -1) {
                      GeneralJs.setQueue(() => {
                        instance.whiteCards[index].click();
                      });
                    }
                  }, 501);
                }
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
    this.checklist = await ajaxJson({ kind: "checklist" }, "/getServicesByKind");

    //sse
    if (!this.middleMode) {
      const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
      es.addEventListener("updateTong", (e) => {
        instance.projectSseParsing(equalJson(e.data));
      });
    }

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
