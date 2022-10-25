BuilderJs.prototype.navigatorLaunching = function () {
  const instance = this;
  const { ea, media, grayBarWidth, tabletWidth, totalContents, totalMother, motherHeight, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, scrollTo, setQueue, downloadFile } = GeneralJs;
  const mother = totalMother.nextElementSibling;
  const mobile = media[4];
  const desktop = !mobile;
  const menuClassName = "leftMenus";
  let margin;
  let size;
  let barHeight;
  let marginBottom;
  let indent;
  let menu;
  let menuMargin;
  let secondBold;
  let boxPadding;
  let boxWidth;
  let factorHeight;
  let factorSize;
  let factorTextTop;
  let naviHeight;
  let mobileNavigator;
  let style;
  let fontTop;
  let fontLeft;
  let naviBuilderWidth;
  let naviBetweenMargin;
  let iconTop;
  let iconWidth;
  let iconIndent;
  let popupTop;
  let menuOnEvent;
  let titleSize;
  let radius;
  let left;
  let left2;
  let bottom;
  let color;
  let idNameHeight;
  let idNameBottom, idNameLeft0, idNameLeft1;
  let listFontSize;
  let scrollTongPaddingTop;
  let scrollTong;
  let valueLeft0, valueLeft1;
  let valueMarginBottom;
  let blocks, tempDom;

  if (desktop) {

    listFontSize = 14;
    idNameHeight = 71;
    idNameBottom = 13;
    idNameLeft0 = 57;
    idNameLeft1 = 141;
    scrollTongPaddingTop = 17;

    valueLeft0 = 38;
    valueLeft1 = 135;
    valueMarginBottom = 17;

    createNode({
      mother,
      style: {
        display: "block",
        position: "relative",
        top: String(0),
        left: String(0),
        background: colorChip.gray0,
        width: String(100) + '%',
        height: String(idNameHeight) + ea,
        borderBottom: "1px dashed " + colorChip.gray3,
        boxSizing: "border-box",
      },
      children: [
        {
          text: "아이디",
          style: {
            position: "absolute",
            fontSize: String(listFontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            bottom: String(idNameBottom) + ea,
            left: String(idNameLeft0) + ea,
          }
        },
        {
          text: "성함",
          style: {
            position: "absolute",
            fontSize: String(listFontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            bottom: String(idNameBottom) + ea,
            left: String(idNameLeft1) + ea,
          }
        },
      ]
    });

    scrollTong = createNode({
      mother,
      style: {
        display: "block",
        width: String(100) + '%',
        paddingTop: String(scrollTongPaddingTop) + ea,
        height: withOut(idNameHeight + scrollTongPaddingTop, ea),
        overflow: "scroll",
      }
    });

    blocks = [];
    for (let { buiid, builder } of this.builders) {
      tempDom = createNode({
        mother: scrollTong,
        attribute: { buiid },
        event: {
          click: function (e) {
            const buiid = this.getAttribute("buiid");
            for (let dom of blocks) {
              if (dom.getAttribute("buiid") === buiid) {
                dom.children[0].style.color = colorChip.green;
                dom.children[1].style.color = colorChip.green;
              } else {
                dom.children[0].style.color = colorChip.black;
                dom.children[1].style.color = colorChip.black;
              }
            }
            instance.listDetailLaunching(buiid);
          }
        },
        style: {
          display: "block",
          position: "relative",
          width: withOut(valueLeft0, ea),
          paddingLeft: String(valueLeft0) + ea,
          marginBottom: String(valueMarginBottom) + ea,
          cursor: "pointer",
        },
        children: [
          {
            text: buiid,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(listFontSize) + ea,
              fontWeight: String(600),
              color: this.buiid === buiid ? colorChip.green : colorChip.black,
              bottom: String(0) + ea,
            }
          },
          {
            text: builder,
            style: {
              position: "absolute",
              fontSize: String(listFontSize) + ea,
              fontWeight: String(600),
              color: this.buiid === buiid ? colorChip.green : colorChip.black,
              top: String(0) + ea,
              left: String(valueLeft1) + ea,
            }
          },
        ]
      });
      blocks.push(tempDom);
    }

  } else {
    mother.style.display = "none";
  }

}

BuilderJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let totalMother, leftPannel;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      height: "calc(100% - " + String(belowHeight) + ea + ")"
    }
  });

  this.totalMother = totalMother;

  leftPannel = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      left: String(0),
      top: String(0),
      width: String(grayBarWidth) + ea,
      height: withOut(belowHeight, ea),
      background: colorChip.gray0,
    }
  });

  this.navigatorLaunching();

  this.searchInput.focus();
}

BuilderJs.prototype.listDetailLaunching = function (buiid) {
  const instance = this;
  const { ea, totalMother } = this;
  const { scrollTo, sleep, cleanChildren, ajaxJson } = GeneralJs;
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
  let loading, pastScrollTop;
  let proidArr;
  let desidArr;
  let cliidArr;

  cleanChildren(totalMother);

  pastScrollTop = totalMother.scrollTop;
  this.buiid = buiid;
  this.builder = this.builders.search("buiid", buiid);
  this.invid = null;

  this.mother.loadingRun().then((dom) => {
    loading = dom;

    return ajaxJson({
      mode: "read",
      collection: "constructInvoice",
      db: "python",
      whereQuery: { "links.buiid": buiid }
    }, "/pythonPass_generalMongo", { equal: true });

  }).then((invoiceList) => {

    instance.invoiceList = new SearchArray(invoiceList);

    proidArr = [];
    desidArr = [];
    cliidArr = [];
    for (let invoice of invoiceList) {
      proidArr.push({ proid: invoice.links.proid });
      desidArr.push({ desid: invoice.links.desid });
      cliidArr.push({ cliid: invoice.links.cliid });
    }

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: proidArr } }, "/getProjects", { equal: true });
    } else {
      return [];
    }

  }).then((projects) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.project = (new SearchArray(projects)).search("proid", invoice.links.proid);
    }

  }).then(() => {

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: desidArr } }, "/getDesigners", { equal: true });
    } else {
      return [];
    }

  }).then((designers) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.designer = (new SearchArray(designers)).search("desid", invoice.links.desid);
    }

  }).then(() => {

    if (proidArr.length > 0) {
      return ajaxJson({ noFlat: true, whereQuery: { $or: cliidArr } }, "/getClients", { equal: true });
    } else {
      return [];
    }

  }).then((clients) => {

    for (let invoice of instance.invoiceList) {
      invoice.links.client = (new SearchArray(clients)).search("cliid", invoice.links.cliid);
    }

  }).then(() => {
    loading.parentNode.removeChild(loading);
    instance.estimationList(buiid);
    scrollTo(totalMother, pastScrollTop);
  }).catch((err) => {
    console.log(err);
  });
}

BuilderJs.prototype.estimationList = function (buiid = '') {
  const instance = this;
  const { totalMother, ea, grayBarWidth, invoiceList } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, downloadFile, setQueue, cleanChildren, ajaxForm, uniqueValue, equalJson } = GeneralJs;
  const mobile = this.media[4];
  const desktop = !mobile;
  const wording = `+ 버튼을 눌러 견적서를 추가하거나, <b%샘플 파일%b>로 작업한 엑셀 파일을 + 버튼으로 드래그 앤 드롭해 견적서를 추가하세요.`;
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
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
  let plusBarHeight, plusHeight;
  let noticeSize, noticeTextTop;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = invoiceList.length;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;
  noticeSize = <%% 15, 15, 15, 14, 4 %%>;
  noticeTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;

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

  plusBarHeight = <%% 76, 76, 75, 75, 10 %%>;
  plusHeight = <%% 20, 20, 20, 16, 4 %%>;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : String(0),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: withOut((desktop ? margin * 3 : 0) * 2, ea),
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: withOut(0, ea),
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: withOut((plusBarHeight + margin) * 2, ea),
      overflow: "scroll",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      paddingLeft: String(boxMargin * 1.5) + ea,
      paddingRight: String(boxMargin * 0.5) + ea,
      paddingTop: String(boxMargin * 1.5) + ea,
    }
  });

  this.estimationBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    dateString = zeroAddition(invoiceList[i].date.getFullYear()) + '.' + zeroAddition(invoiceList[i].date.getMonth() + 1) + '.' + zeroAddition(invoiceList[i].date.getDate());

    requestBox = createNode({
      mother: baseTong,
      attribute: {
        invid: invoiceList[i].invid,
        proid: invoiceList[i].links.proid,
        desid: invoiceList[i].links.desid,
        cliid: invoiceList[i].links.cliid,
      },
      event: {
        click: function (e) {
          instance.estimationDetailLaunching(this.getAttribute("invid"), false);
        },
        mouseenter: function (e) {
          this.style.transition = "";
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          if (desktop) {
            this.children[0].style.background = colorChip.gray3;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(borderRadius) + "px",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
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
            background: colorChip.gray3,
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
              text: invoiceList[i].links.client.name + " <b%고객님%b>",
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

    this.estimationBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.estimationBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
      }
    }
  }

  createNode({
    mother: baseTong0,
    event: {
      click: async function (e) {
        e.stopPropagation();
        try {
          const self = this;
          let fileInput;
          fileInput = createNode({
            mother: this,
            mode: "input",
            event: {
              click: (e) => { e.stopPropagation(); },
              change: async function (e) {
                try {
                  const [ file ] = [ ...this.files ];
                  await instance.fileAddition(file, self, e);
                } catch (e) {
                  window.location.reload();
                }
              },
            },
            attribute: {
              type: "file",
            },
            style: {
              display: "none",
            }
          });
          fileInput.click();
        } catch (e) {
          window.location.reload();
        }
      },
      mouseenter: function (e) {
        this.style.transition = "";
        this.style.background = colorChip.green;
        this.querySelector("path").setAttribute("fill", colorChip.white);
      },
      mouseleave: function (e) {
        this.style.background = desktop ? colorChip.gray0 : colorChip.gray1;
        this.querySelector("path").setAttribute("fill", colorChip.gray5);
      },
      dragover: (e) => { e.preventDefault(); },
      dragenter: (e) => { e.preventDefault(); },
      dragleave: (e) => { e.preventDefault(); },
      drop: async function (e) {
        e.preventDefault();
        try {
          const [ file ] = [ ...e.dataTransfer.files ];
          await instance.fileAddition(file, this, e);
        } catch (e) {
          window.location.reload();
        }
      }
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(margin) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
      cursor: "pointer",
    },
    children: [
      {
        mode: "svg",
        source: this.mother.returnAddition(colorChip.gray5),
        style: {
          width: String(plusHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: baseTong0,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: String(plusBarHeight) + ea,
      overflow: "hidden",
      marginBottom: String(0) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    },
    children: [
      {
        text: wording,
        event: {
          click: function (e) {
            if (e.target.nodeName === 'B' || e.target.nodeName === 'b') {
              downloadFile(instance.sampleFile).catch((err) => {
                console.log(err);
              });
            }
          }
        },
        style: {
          position: "relative",
          fontSize: String(noticeSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(noticeTextTop) + ea,
        },
        bold: {
          fontSize: String(noticeSize) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          cursor: "pointer",
        }
      }
    ]
  });

  this.mainBaseTong = baseTong0;
  this.addSearchEvent();
}

BuilderJs.prototype.estimationDetailLaunching = function (invid, fastMode = false, requestNumber = null) {
  const instance = this;
  const { ea, belowHeight, totalMother, mainBaseTong, invoiceList } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, setQueue } = GeneralJs;
  const invoice = invoiceList.search("invid", invid);

  if (fastMode) {

    const newMainBase = mainBaseTong.cloneNode(false);
    let top;

    mainBaseTong.style.opacity = String(0);
    top = Number(newMainBase.style.top.replace(/[^0-9]/gi, ''));

    newMainBase.style.animation = "";
    newMainBase.style.opacity = String(1);
    newMainBase.style.background = colorChip.white;
    newMainBase.style.height = "calc(100% - " + String(top * 2) + ea + ")";
    newMainBase.style.borderRadius = String(5) + "px";
    newMainBase.style.boxShadow = "0px 3px 14px -9px " + colorChip.shadow;

    totalMother.style.overflow = "visible";

    this.newMainBase = newMainBase;
    totalMother.appendChild(newMainBase);
    this.estimationDocument(newMainBase, invoice, requestNumber);

  } else {
    mainBaseTong.style.animation = "fadedownlite 0.3s ease forwards";

    setQueue(() => {
      const newMainBase = mainBaseTong.cloneNode(false);
      let top;

      mainBaseTong.style.opacity = String(0);
      top = Number(newMainBase.style.top.replace(/[^0-9]/gi, ''));

      newMainBase.style.animation = "fadeuplite 0.3s ease forwards";
      newMainBase.style.background = colorChip.white;
      newMainBase.style.height = "calc(100% - " + String(top * 2) + ea + ")";
      newMainBase.style.borderRadius = String(5) + "px";
      newMainBase.style.boxShadow = "0px 3px 14px -9px " + colorChip.shadow;

      totalMother.style.overflow = "visible";

      instance.newMainBase = newMainBase;
      instance.mainCancleBase = createNode({
        mother: totalMother,
        event: {
          click: function (e) {
            instance.estimationBackward();
          }
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: "calc(100% + " + String(instance.belowHeight) + ea + ")",
          background: colorChip.gray3,
          animation: "justfadeinoriginal 0.3s ease forwards",
        }
      });
      totalMother.appendChild(newMainBase);
      instance.estimationDocument(newMainBase, invoice, requestNumber);

    }, 350);
  }
}

BuilderJs.prototype.estimationBackward = function (fastMode = false) {
  const instance = this;
  const { ea } = this;
  const { setQueue } = GeneralJs;

  if (fastMode) {

    this.newMainBase.remove();
    // this.mainCancleBase.remove();
    this.invid = null;
    this.totalMother.style.overflow = "scroll";

  } else {

    this.newMainBase.style.animation = "fadedownlite 0.3s ease forwards";
    this.mainCancleBase.style.animation = "fadedownlite 0.3s ease forwards";
    this.mainBaseTong.style.animation = "fadeuplite 0.3s ease forwards";
    setQueue(() => {
      instance.newMainBase.remove();
      instance.mainCancleBase.remove();
      instance.invid = null;
      instance.totalMother.style.overflow = "scroll";
    }, 301);

  }
}

BuilderJs.prototype.estimationDocument = function (mother, invoice, pastNumber = null) {
  const instance = this;
  const { totalMother, ea } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, setQueue, autoComma, findByAttribute, uniqueValue, equalJson } = GeneralJs;
  const titleWording = "홈리에종\n시공 견적서";
  const ultimateTotalClassName = "ultimateTotal";
  const won = '원';
  const whiteDetailBlockIdConst = "whiteDetailBlock_";
  const dragConst = "dragData";
  let titleArea, contentsArea, greenArea;
  let titleWidth;
  let topMargin;
  let leftMargin;
  let middleMargin;
  let titleSize, subTitleSize;
  let barWidth, barTop, barHeight;
  let realTopMargin;
  let innerPaddingTop;
  let sumHeight;
  let contentsField;
  let detailField, sumField;
  let subTitleMarginTop, subTitleVisual;
  let request, items;
  let innerPadding;
  let whiteBlock;
  let whiteBlockMarginBottom;
  let whitePaddingTop, whitePaddingLeft;
  let num;
  let whiteBlockTitleSize;
  let titleMarginTop;
  let whiteTableArea;
  let tableHeight;
  let price;
  let namePercentage, numberPercentage, unitEaPercentage, consumerPercentage, pricePercentage, descriptionPercentage;
  let percentages;
  let detailWordings;
  let whiteDetailBlock;
  let tempArr;
  let checkBoxPercentage;
  let detailTextSize, detailTextTop;
  let priceSum;
  let tempDom;
  let checkBoxWidth, checkBoxTop;
  let detailDeactive;
  let itemDeactive;
  let whiteTitleArea;
  let itemCheckWidth, itemCheckTop;
  let totalSum;
  let sumSize, sumTop;
  let sumMarginRight;
  let sumPaddingLeft;
  let sumBarTop;
  let greenButtonWordingSize, greenButtonWordingBottom;
  let greenButtonWidth;
  let greenButtonHeight;
  let greenButtonTextTop;
  let greenButtonBetween;
  let greenButtons;
  let greenButtonBase;
  let greenButtonEvents;
  let greenButtonPaddingTop, greenButtonPaddingLeft, greenButtonMarginRight;
  let columnArr;
  let plusCircleWidth, plusCircleTop;
  let makeDetailBlock;
  let valueArr;
  let amountSync;
  let contextmenuBetween, contextmenuBetweenTop;
  let contextmenuWidth;
  let contextmenuHeight;
  let contextmenuTextTop;
  let contextmenuSize;
  let makeWhiteBlock;
  let blockSum, tempBlock;
  let currentBoo;

  this.invid = invoice.invid;

  titleWidth = 200;
  topMargin = 52;
  leftMargin = 52;
  middleMargin = 20;
  titleSize = 30;
  titleMarginTop = 1;
  subTitleSize = 16;
  subTitleMarginTop = 10;
  subTitleVisual = 2;

  barWidth = 18;
  barTop = 60;
  realTopMargin = barTop;
  barHeight = 99;

  sumHeight = 80;

  innerPadding = 20;

  whiteBlockMarginBottom = 10;
  whiteBlockMarginBottomLast = 300;
  whitePaddingTop = 20;
  whitePaddingLeft = 25;
  whiteBlockTitleSize = 20;
  whiteTitleMarginBottom = 16;

  tableHeight = 36;

  checkBoxPercentage = 4;
  namePercentage = 36;
  numberPercentage = 6;
  unitEaPercentage = 6;
  consumerPercentage = 14;
  pricePercentage = 14;
  descriptionPercentage = 20;
  detailWordings = [ "", "품명", "수량", "단위", "단가", "가격", "규격" ];
  percentages = [ checkBoxPercentage, namePercentage, numberPercentage, unitEaPercentage, consumerPercentage, pricePercentage, descriptionPercentage ];
  columnArr = [ "checkBox", "name", "number", "ea", "consumer", "price", "description" ];

  detailTextSize = 13;
  detailTextTop = -1;

  checkBoxWidth = 11;
  checkBoxTop = 0;

  plusCircleWidth = 12;
  plusCircleTop = 0;

  itemCheckWidth = 13;
  itemCheckTop = 8;

  sumSize = 26;
  sumTop = -4;
  sumMarginRight = 30;
  sumPaddingLeft = 18;
  sumBarTop = 37;

  greenButtonWidth = 300;
  greenButtonHeight = 30;
  greenButtonTextTop = -1;
  greenButtonBetween = 5;
  greenButtonWordingSize = 13;
  greenButtonWordingBottom = 8;

  greenButtonPaddingTop = 12;
  greenButtonPaddingLeft = 6;
  greenButtonMarginRight = 5;

  contextmenuWidth = 90;
  contextmenuHeight = 30;
  contextmenuTextTop = 0;
  contextmenuSize = 14;
  contextmenuBetween = 4;
  contextmenuBetweenTop = 6;

  amountSync = {};
  greenArea = {};
  titleArea = {};
  contentsArea = {};
  contentsField = {};
  detailField = {};
  sumField = {};

  innerPaddingTop = realTopMargin - topMargin;

  currentBoo = (pastNumber === null || pastNumber === 0);
  if (currentBoo) {
    [ request ] = invoice.requests;
    this.invoiceNumber = 0;
  } else {
    request = invoice.requests[pastNumber];
    this.invoiceNumber = pastNumber;
  }

  ({ items } = request);

  greenButtons = [
    [ "견적서 발송" ],
    [ "이전", "다음" ]
  ];

  greenButtonEvents = [
    [
      async function (e) {
        try {
          if (window.confirm("견적서를 전송하시겠습니까?")) {
            await instance.saveState(true);
            const [ thisClient ] = await ajaxJson({ noFlat: true, whereQuery: { cliid: invoice.links.cliid } }, "/getClients", { equal: true });
            await ajaxJson({
              method: "constructEstimation",
              name: thisClient.name,
              phone: thisClient.phone,
              option: {
                client: thisClient.name,
                host: BACKHOST.slice(8, -5),
                path: "cestimation",
                proid: invoice.links.proid,
                buiid: invoice.links.buiid
              }
            }, "/alimTalk");
            window.alert("견적서를 전송하였습니다!");
          }
        } catch (e) {
          window.location.reload();
        }
      },
    ],
    [
      async function () {
        try {
          if (invoice.requests[instance.invoiceNumber + 1] !== undefined) {
            instance.estimationBackward(true);
            instance.estimationDetailLaunching(invoice.invid, true, instance.invoiceNumber + 1);
          } else {
            window.alert("가장 오래된 버전입니다!");
          }

        } catch (e) {
          window.location.reload();
        }
      },
      async function () {
        try {

          if (invoice.requests[instance.invoiceNumber - 1] !== undefined) {
            instance.estimationBackward(true);
            instance.estimationDetailLaunching(invoice.invid, true, instance.invoiceNumber - 1);
          } else {
            window.alert("가장 최신 버전입니다!");
          }

        } catch (e) {
          window.location.reload();
        }
      },
    ]
  ];

  makeDetailBlock = (whiteTableArea, price, name, number, unitEa, consumer, description, detailDeactive) => {
    valueArr = [];
    valueArr.push('');
    valueArr.push(name);
    valueArr.push(String(number));
    valueArr.push(unitEa);
    valueArr.push(autoComma(consumer) + '원');
    valueArr.push(autoComma(price) + '원');
    valueArr.push(description);

    whiteDetailBlock = createNode({
      id: whiteDetailBlockIdConst + uniqueValue("hex"),
      mother: whiteTableArea,
      attribute: {
        consumer: String(consumer),
        number: String(number),
        draggable: "true",
      },
      event: {
        dragstart: function (e) {
          e.dataTransfer.setData(dragConst, this.id);
        },
        dragenter: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.style.background = colorChip.liteGreen;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        dragleave: function (e) {
          e.preventDefault();
          this.style.marginBottom = "";
          this.style.background = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
        },
        dragover: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.style.background = colorChip.liteGreen;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        drop: function (e) {
          e.preventDefault();
          const from = document.getElementById(e.dataTransfer.getData(dragConst));
          const fromArea = from.parentElement;
          const thisArea = this.parentElement;
          this.style.marginBottom = "";
          this.style.background = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
          this.parentNode.insertBefore(from, this.nextElementSibling);
          if (thisArea !== fromArea) {
            setQueue(() => {
              amountSync(thisArea);
              setQueue(() => {
                amountSync(fromArea);
              });
            });
          }
        }
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
        borderRight: "1px solid " + colorChip.gray3,
        borderLeft: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    });
    for (let i = 0; i < percentages.length; i++) {
      tempDom = createNode({
        mother: whiteDetailBlock,
        attribute: {
          index: String(i),
          column: columnArr[i],
          value: valueArr[i],
        },
        event: {
          click: async function (e) {
            const self = this;
            const index = Number(this.getAttribute("index"));
            const column = this.getAttribute("column");
            try {
              const checkBoxDom = findByAttribute(this.parentElement.children, "column", "checkBox");
              const numberDom = findByAttribute(this.parentElement.children, "column", "number");
              const numberValue = Number(numberDom.getAttribute("value"));
              const consumerDom = findByAttribute(this.parentElement.children, "column", "consumer");
              const consumerValue = Number(consumerDom.getAttribute("value").replace(/[^0-9\-\.]/gi, ''));
              const priceDom = findByAttribute(this.parentElement.children, "column", "price");
              let totalTargets, totalFinal;
              let totalDom, titleDom;
              let areaMother;
              let originalMother, originalMothers;
              let ultimateTotal;
              let cancelBack, cloneInput;
              let rect;
              let updateEvent;
              let checkOn, checkOff;

              checkOn = () => {
                let pastValue;

                if (numberDom.hasAttribute("pastvalue")) {
                  pastValue = Number(numberDom.getAttribute("pastvalue"));
                } else {
                  pastValue = 1;
                }

                checkBoxDom.querySelector("svg").style.background = colorChip.white;
                checkBoxDom.querySelector("path").setAttribute("fill", colorChip.green);

                numberDom.setAttribute("value", String(pastValue));
                numberDom.firstChild.textContent = String(pastValue);

                priceDom.setAttribute("value", autoComma(consumerValue * pastValue) + won);
                priceDom.firstChild.textContent = autoComma(consumerValue * pastValue) + won;

                checkBoxDom.parentElement.setAttribute("number", String(pastValue));

                [ ...checkBoxDom.parentNode.children ].forEach((dom) => {
                  dom.firstChild.style.color = colorChip.black;
                });
              }

              checkOff = () => {
                checkBoxDom.querySelector("svg").style.background = colorChip.gray3;
                checkBoxDom.querySelector("path").setAttribute("fill", colorChip.gray3);

                numberDom.setAttribute("pastvalue", numberDom.getAttribute("value"));
                numberDom.setAttribute("value", String(0));
                numberDom.firstChild.textContent = String(0);

                priceDom.setAttribute("value", autoComma(consumerValue * 0) + won);
                priceDom.firstChild.textContent = autoComma(consumerValue * 0) + won;

                checkBoxDom.parentElement.setAttribute("number", String(0));

                [ ...checkBoxDom.parentNode.children ].forEach((dom) => {
                  dom.firstChild.style.color = colorChip.deactive;
                });
              }

              if (column === "checkBox") {

                if (numberValue === 0) {
                  checkOn();
                } else {
                  checkOff();
                }
                amountSync(self.parentElement.parentElement);
                await instance.saveState();

              } else if (column !== "price") {

                cancelBack = {};
                cloneInput = {};

                if (column === "name") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "number") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");

                      cloneInput.value = cloneInput.value.replace(/[^0-9\.\-]/gi, '');
                      if (cloneInput.value === '0') {
                        checkOff();
                      } else {
                        checkOn();
                      }

                      self.parentNode.setAttribute("number", cloneInput.value);
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);

                      priceDom.firstChild.textContent = autoComma(Math.floor(Number(cloneInput.value) * consumerValue)) + won;
                      priceDom.setAttribute("value", autoComma(Math.floor(Number(cloneInput.value) * consumerValue)) + won);

                      amountSync(self.parentElement.parentElement);

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "ea") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "consumer") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");

                      cloneInput.value = cloneInput.value.replace(/[^0-9\.\-]/gi, '');
                      if (cloneInput.value === '0') {
                        checkOff();
                      }

                      self.parentNode.setAttribute("consumer", cloneInput.value);
                      self.firstChild.textContent = autoComma(Number(cloneInput.value)) + won;
                      self.setAttribute("value", autoComma(Number(cloneInput.value)) + won);

                      priceDom.firstChild.textContent = autoComma(Math.floor(Number(cloneInput.value) * numberValue)) + won;
                      priceDom.setAttribute("value", autoComma(Math.floor(Number(cloneInput.value) * numberValue)) + won);

                      amountSync(self.parentElement.parentElement);

                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else if (column === "description") {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.textContent = cloneInput.value;
                      self.setAttribute("value", cloneInput.value);
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                } else {
                  updateEvent = async function (e) {
                    try {
                      self.firstChild.style.color = self.firstChild.getAttribute("past");
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }

                self.parentElement.setAttribute("draggable", "false");

                cancelBack = createNode({
                  mother: this,
                  attribute: {
                    draggable: "false",
                  },
                  event: {
                    click: async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        self.parentElement.setAttribute("draggable", "true");
                        await updateEvent(e);
                        await instance.saveState();
                      } catch (e) {
                        console.log(e);
                      }
                    },
                    dragstart: function (e) {
                      e.stopPropagation();
                    },
                  },
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                    transition: "all 0s ease",
                  }
                });

                rect = cancelBack.getBoundingClientRect();
                cancelBack.style.top = String(-1 * rect.top) + ea;
                cancelBack.style.left = String(-1 * rect.left) + ea;
                cancelBack.style.width = String(window.innerWidth) + ea;
                cancelBack.style.height = String(window.innerHeight) + ea;

                cloneInput = createNode({
                  mother: this,
                  mode: "input",
                  attribute: {
                    type: "text",
                    draggable: "false",
                  },
                  event: {
                    click: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                    keypress: async function (e) {
                      try {
                        if (e.key === "Enter") {
                          self.parentElement.setAttribute("draggable", "true");
                          await updateEvent(e);
                          await instance.saveState();
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    },
                    selectstart: function (e) {
                      e.stopPropagation();
                    },
                    dragstart: function (e) {
                      e.stopPropagation();
                    },
                  },
                  style: {
                    fontSize: String(detailTextSize) + ea,
                    fontWeight: String(400),
                    color: colorChip.green,
                    position: "absolute",
                    top: String(detailTextTop) + ea,
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    outline: String(0),
                    border: String(0),
                    zIndex: String(1),
                    textAlign: "center",
                  }
                });

                this.firstChild.setAttribute("past", this.firstChild.style.color);
                this.firstChild.style.color = "transparent";

                if (column !== "number" && column !== "consumer") {
                  cloneInput.value = this.firstChild.textContent;
                } else {
                  cloneInput.value = this.firstChild.textContent.replace(/[^0-9\.\-]/gi, '');
                }

                cloneInput.focus();

              }
            } catch (e) {
              window.location.reload();
            }
          },
          contextmenu: async function (e) {
            const self = this;
            const column = this.getAttribute("column");
            if (column === "checkBox") {
              e.preventDefault();
              e.stopPropagation();
              try {
                const contextMenu = [
                  {
                    name: "항목 삭제",
                    event: async function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        const areaMother = self.parentElement.parentElement;
                        let newBlocks, num;
                        self.parentElement.remove();
                        setQueue(() => {
                          amountSync(areaMother);
                          if (areaMother.children.length === 2) {
                            newBlocks = [];
                            num = 0;
                            for (let block of instance.whiteBlocks) {
                              if (block !== areaMother.parentElement) {
                                block.firstChild.querySelector('b').textContent = String(num + 1);
                                block.style.marginBottom = String(whiteBlockMarginBottom) + ea;
                                newBlocks.push(block);
                                num++;
                              }
                            }
                            newBlocks[newBlocks.length - 1].style.marginBottom = String(whiteBlockMarginBottomLast) + ea;
                            instance.whiteBlocks = newBlocks;
                            areaMother.parentElement.remove();
                            amountSync(newBlocks[newBlocks.length - 1].children[1]);
                          }
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  },
                ];
                let cancelBack;
                let menuTong;
                let rect;
                let tongTopMargin;

                cancelBack = createNode({
                  mother: this,
                  event: {
                    click: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    },
                    contextmenu: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      self.removeChild(self.lastChild);
                      self.removeChild(self.lastChild);
                    },
                  },
                  style: {
                    position: "fixed",
                    top: String(0),
                    left: String(0),
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: String(1),
                    transition: "all 0s ease",
                  }
                });

                rect = cancelBack.getBoundingClientRect();
                cancelBack.style.top = String(-1 * rect.top) + ea;
                cancelBack.style.left = String(-1 * rect.left) + ea;
                cancelBack.style.width = String(window.innerWidth) + ea;
                cancelBack.style.height = String(window.innerHeight) + ea;

                menuTong = createNode({
                  mother: this,
                  event: {
                    contextmenu: function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                  },
                  style: {
                    position: "absolute",
                    top: String(self.querySelector("svg").getBoundingClientRect().top - self.getBoundingClientRect().top + self.querySelector("svg").getBoundingClientRect().height + contextmenuBetweenTop) + ea,
                    left: String(self.querySelector("svg").getBoundingClientRect().left - self.getBoundingClientRect().left) + ea,
                    width: String(contextmenuWidth) + ea,
                    zIndex: String(1),
                    animation: "fadeuplite 0.2s ease forwards",
                  }
                });

                for (let obj of contextMenu) {
                  createNode({
                    mother: menuTong,
                    event: {
                      contextmenu: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                      },
                      click: obj.event
                    },
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      background: colorChip.gradientGreen,
                      borderRadius: String(3) + "px",
                      boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
                      width: String(100) + '%',
                      height: String(contextmenuHeight) + ea,
                      marginBottom: String(contextmenuBetween) + ea,
                    },
                    children: [
                      {
                        text: obj.name,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          fontSize: String(contextmenuSize) + ea,
                          fontWeight: String(400),
                          color: colorChip.white,
                          textAlign: "center",
                          top: String(contextmenuTextTop) + ea,
                        }
                      }
                    ]
                  });
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "top",
          width: String(percentages[i]) + '%',
          boxSizing: "border-box",
          height: String(100) + '%',
          borderRight: i !== percentages.length - 1 ? "1px solid " + colorChip.gray3 : "",
          cursor: i === 0 ? "pointer" : "",
        }
      });
      if (i !== 0) {
        createNode({
          mother: tempDom,
          text: valueArr[i],
          event: {
            selectstart: (e) => { e.preventDefault(); }
          },
          style: {
            fontSize: String(detailTextSize) + ea,
            fontWeight: String(400),
            color: !detailDeactive ? colorChip.black : colorChip.deactive,
            position: "relative",
            top: String(detailTextTop) + ea,
            transition: "all 0s ease",
          }
        })
      } else {
        createNode({
          mother: tempDom,
          mode: "svg",
          source: instance.mother.returnCheckBox(!detailDeactive ? colorChip.green : colorChip.gray3, false, true),
          style: {
            position: "relative",
            width: String(checkBoxWidth) + ea,
            top: String(checkBoxTop) + ea,
            background: !detailDeactive ? colorChip.white : colorChip.gray3,
          }
        });
      }
    }
  }

  amountSync = (areaMother) => {
    let originalMother, originalMothers;
    let totalDom, titleDom;
    let totalTargets;
    let totalFinal;
    let ultimateTotal;

    originalMother = areaMother.parentElement;
    originalMothers = [ ...originalMother.parentElement.children ];
    totalDom = areaMother.children[areaMother.children.length - 1];
    titleDom = originalMother.firstChild;

    totalTargets = [ ...areaMother.children ].filter((dom) => { return dom.hasAttribute("consumer") });
    totalFinal = totalTargets.reduce((sum, dom) => { return sum + (Number(dom.getAttribute("consumer")) * Number(dom.getAttribute("number"))) }, 0);

    totalDom.setAttribute("total", String(totalFinal));
    totalDom.lastChild.firstChild.textContent = autoComma(totalFinal) + won;

    if (totalFinal === 0) {
      titleDom.style.color = colorChip.deactive;
      titleDom.querySelector('b').style.color = colorChip.deactive;
      titleDom.querySelector("svg").style.background = colorChip.gray3;
      titleDom.querySelector("path").setAttribute("fill", colorChip.gray3);
    } else {
      titleDom.style.color = colorChip.black;
      titleDom.querySelector('b').style.color = colorChip.green;
      titleDom.querySelector("svg").style.background = colorChip.white;
      titleDom.querySelector("path").setAttribute("fill", colorChip.green);
    }

    ultimateTotal = originalMothers.reduce((sum, original) => {
      return sum + Number(original.lastChild.lastChild.getAttribute("total"))
    }, 0);
    document.querySelector('.' + ultimateTotalClassName).querySelectorAll('b')[1].textContent = autoComma(ultimateTotal);
    document.querySelector('.' + ultimateTotalClassName).setAttribute("ultimate", String(ultimateTotal));
  }

  makeWhiteBlock = (detailField, item, num) => {
    // total
    whiteBlock = createNode({
      mother: detailField,
      event: {
        contextmenu: function (e) {
          e.stopPropagation();
        }
      },
      style: {
        display: "block",
        width: withOut(whitePaddingLeft * 2, ea),
        borderRadius: String(8) + "px",
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        marginBottom: String(whiteBlockMarginBottom) + ea,
        background: colorChip.white,
        paddingTop: String(whitePaddingTop) + ea,
        paddingBottom: String(whitePaddingTop) + ea,
        paddingLeft: String(whitePaddingLeft) + ea,
        paddingRight: String(whitePaddingLeft) + ea,
      }
    });

    // title area
    whiteTitleArea = createNode({
      mother: whiteBlock,
      text: `<b%${String(num + 1)}%b>&nbsp;&nbsp;${item.name}`,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(whiteTitleMarginBottom) + ea,
        fontSize: String(whiteBlockTitleSize) + ea,
        fontWeight: String(500),
        color: colorChip.black,
      },
      bold: {
        fontSize: String(whiteBlockTitleSize) + ea,
        fontWeight: String(300),
        color: colorChip.green,
      }
    });

    // table area
    whiteTableArea = createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        height: "auto",
      },
    });

    // column row
    whiteDetailBlock = createNode({
      mother: whiteTableArea,
      event: {
        dragenter: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        dragleave: function (e) {
          e.preventDefault();
          this.style.marginBottom = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
        },
        dragover: function (e) {
          e.preventDefault();
          this.style.marginBottom = String(tableHeight) + ea;
          this.nextElementSibling.style.borderTop = "1px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = colorChip.liteGreen;
        },
        drop: function (e) {
          e.preventDefault();
          const from = document.getElementById(e.dataTransfer.getData(dragConst));
          const fromArea = from.parentElement;
          const thisArea = this.parentElement;
          this.style.marginBottom = "";
          this.nextElementSibling.style.borderTop = "0px solid " + colorChip.gray3;
          this.nextElementSibling.style.background = "";
          this.parentNode.insertBefore(from, this.nextElementSibling);
          if (thisArea !== fromArea) {
            setQueue(() => {
              amountSync(thisArea);
              setQueue(() => {
                amountSync(fromArea);
              });
            });
          }
        }
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        border: "1px solid " + colorChip.gray3,
        borderTopRightRadius: String(5) + "px",
        borderTopLeftRadius: String(5) + "px",
        boxSizing: "border-box",
        background: colorChip.gray0
      }
    });
    for (let i = 0; i < percentages.length; i++) {
      createNode({
        mother: whiteDetailBlock,
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "top",
          width: String(percentages[i]) + '%',
          boxSizing: "border-box",
          height: String(100) + '%',
          borderRight: i !== percentages.length - 1 ? "1px solid " + colorChip.gray3 : "",
        },
        children: [
          {
            text: detailWordings[i],
            style: {
              fontSize: String(detailTextSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              position: "relative",
              top: String(detailTextTop) + ea,
            }
          }
        ]
      });
    }

    priceSum = 0;

    for (let { name, unit: { number, ea: unitEa, amount: { consumer } }, description } of item.detail) {
      price = Math.floor(consumer * number);
      priceSum += price;
      makeDetailBlock(whiteTableArea, price, name, number, unitEa, consumer, description, (price === 0));
    }

    itemDeactive = priceSum === 0;

    // title check
    createNode({
      mother: whiteTitleArea,
      mode: "svg",
      source: instance.mother.returnCheckBox(!itemDeactive ? colorChip.green : colorChip.gray3, false, true),
      style: {
        position: "absolute",
        top: String(itemCheckTop) + ea,
        right: String(0),
        width: String(itemCheckWidth) + ea,
        background: !itemDeactive ? colorChip.white : colorChip.gray3,
      }
    });
    if (itemDeactive) {
      whiteTitleArea.style.color = colorChip.deactive;
      whiteTitleArea.querySelector('b').style.color = colorChip.deactive;
    }

    // sum row
    whiteDetailBlock = createNode({
      mother: whiteTableArea,
      attribute: {
        total: String(priceSum)
      },
      style: {
        display: "block",
        position: "relative",
        height: String(tableHeight) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
        borderRight: "1px solid " + colorChip.gray3,
        borderLeft: "1px solid " + colorChip.gray3,
        borderBottomRightRadius: String(5) + "px",
        borderBottomLeftRadius: String(5) + "px",
        marginBottom: String(6) + ea,
        boxSizing: "border-box",
      },
      children: [
        {
          event: {
            click: function (e) {
              makeDetailBlock(this.parentNode.parentNode, 10000, "품명 입력", 1, "개", 10000, "비고", false);
              this.parentNode.parentNode.insertBefore(this.parentNode.parentNode.lastChild, this.parentNode);
              amountSync(this.parentNode.parentNode);
            }
          },
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: String(checkBoxPercentage) + '%',
            boxSizing: "border-box",
            height: String(100) + '%',
            borderRight: "1px solid " + colorChip.gray3,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnPlusCircle(colorChip.green),
              style: {
                position: "relative",
                width: String(plusCircleWidth) + ea,
                top: String(plusCircleTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: String(namePercentage) + '%',
            boxSizing: "border-box",
            height: String(100) + '%',
            borderRight: "1px solid " + colorChip.gray3,
          },
          children: [
            {
              text: "합계",
              style: {
                fontSize: String(detailTextSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(detailTextTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "top",
            width: withOut(checkBoxPercentage + namePercentage, '%'),
            boxSizing: "border-box",
            height: String(100) + '%',
          },
          children: [
            {
              text: autoComma(priceSum) + '원',
              style: {
                fontSize: String(detailTextSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                position: "relative",
                top: String(detailTextTop) + ea,
              }
            }
          ]
        },
      ]
    });

    return [ whiteBlock, priceSum ];
  }

  greenArea = createNode({
    mother,
    style: {
      position: "absolute",
      left: String(0),
      top: String(barTop) + ea,
      width: String(barWidth) + ea,
      height: String(barHeight) + ea,
      borderTopRightRadius: String(6) + ea,
      borderBottomRightRadius: String(6) + ea,
      background: colorChip.gradientGreen
    }
  });

  titleArea = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      width: String(titleWidth) + ea,
      height: withOut((topMargin * 2), ea),
      top: String(topMargin) + ea,
      marginLeft: String(leftMargin) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: titleArea,
    text: titleWording,
    style: {
      display: "block",
      position: "relative",
      color: colorChip.black,
      fontSize: String(titleSize) + ea,
      fontWeight: String(500),
      marginTop: String(titleMarginTop) + ea,
    }
  });

  createNode({
    mother: titleArea,
    text: invoice.title.replace(/시공 견적서/gi, '').replace(/시공 견적/gi, '').replace(/견적서/gi, '').replace(/견적/gi, ''),
    style: {
      display: "block",
      position: "relative",
      color: colorChip.deactive,
      fontSize: String(subTitleSize) + ea,
      marginTop: String(subTitleMarginTop) + ea,
      marginLeft: String(subTitleVisual) + ea,
      fontWeight: String(600),
    }
  });

  contentsArea = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      width: withOut(titleWidth + middleMargin + (leftMargin * 2), ea),
      paddingTop: String(innerPaddingTop) + ea,
      paddingBottom: String(innerPaddingTop) + ea,
      height: withOut((topMargin * 2) + (innerPaddingTop * 2), ea),
      top: String(topMargin) + ea,
      marginLeft: String(middleMargin) + ea,
      verticalAlign: "top",
    }
  });

  contentsField = createNode({
    mother: contentsArea,
    style: {
      position: "relative",
      display: "block",
      height: String(100) + '%',
      width: String(100) + '%',
      border: "1px solid " + colorChip.gray4,
      boxSizing: "border-box",
      borderRadius: String(8) + ea,
      overflow: "hidden",
    }
  });

  detailField = createNode({
    mother: contentsField,
    event: {
      contextmenu: function (e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        const contextMenu = [
          {
            name: "중분류 추가",
            event: async function (e) {
              e.preventDefault();
              e.stopPropagation();
              try {
                let response;
                let itemDummy, detailDummy;
                let block, sum;

                do {
                  response = await GeneralJs.prompt("중분류의 명칭을 알려주세요!");
                } while (typeof response !== "string" || response === '');

                itemDummy = equalJson(JSON.stringify(instance.dummy.item));
                itemDummy.name = response;

                detailDummy = equalJson(JSON.stringify(instance.dummy.detail));
                detailDummy.description = "비고";
                detailDummy.name = "품명 입력";
                detailDummy.unit.ea = "개";
                detailDummy.unit.number = 1;
                detailDummy.unit.amount.supply = 10000;
                detailDummy.unit.amount.vat = 1000;
                detailDummy.unit.amount.consumer = 11000;
                itemDummy.detail.unshift(detailDummy);

                for (let block of instance.whiteBlocks) {
                  block.style.marginBottom = String(whiteBlockMarginBottom) + ea;
                }

                [ block, sum ] = makeWhiteBlock(self, itemDummy, instance.whiteBlocks.length);
                block.style.marginBottom = String(whiteBlockMarginBottomLast) + ea;
                instance.whiteBlocks.push(block);
                amountSync(block.children[1]);

                self.parentNode.removeChild(self.parentNode.lastChild);
                self.parentNode.removeChild(self.parentNode.lastChild);

                await instance.saveState();
              } catch (e) {
                window.location.reload();
              }
            }
          },
        ];
        let cancelBack;
        let menuTong;

        cancelBack = createNode({
          mother: this.parentNode,
          events: [
            {
              type: [ "click", "contextmenu" ],
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.parentNode.removeChild(self.parentNode.lastChild);
                self.parentNode.removeChild(self.parentNode.lastChild);
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
            zIndex: String(1),
          }
        });

        menuTong = createNode({
          mother: this.parentNode,
          event: {
            contextmenu: function (e) {
              e.preventDefault();
              e.stopPropagation();
            },
          },
          style: {
            position: "absolute",
            top: String(e.offsetY) + ea,
            left: String(e.offsetX) + ea,
            width: String(contextmenuWidth) + ea,
            zIndex: String(1),
            animation: "fadeuplite 0.2s ease forwards",
          }
        });

        for (let obj of contextMenu) {
          createNode({
            mother: menuTong,
            event: {
              contextmenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
              },
              click: obj.event
            },
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.gradientGreen,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 14px -9px " + colorChip.shadow,
              width: String(100) + '%',
              height: String(contextmenuHeight) + ea,
              marginBottom: String(contextmenuBetween) + ea,
              cursor: "pointer",
            },
            children: [
              {
                text: obj.name,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contextmenuSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.white,
                  textAlign: "center",
                  top: String(contextmenuTextTop) + ea,
                }
              }
            ]
          });
        }

      }
    },
    style: {
      position: "relative",
      display: "block",
      width: String(100) + '%',
      height: withOut(sumHeight, ea),
      boxSizing: "border-box",
      borderBottom: "1px solid " + colorChip.gray4,
      background: colorChip.gray1,
      paddingTop: String(innerPadding) + ea,
      paddingLeft: String(innerPadding) + ea,
      paddingRight: String(innerPadding) + ea,
      overflow: "scroll",
    }
  });

  sumField = createNode({
    mother: contentsField,
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      width: String(100) + '%',
      height: String(sumHeight) + ea,
    }
  });

  this.whiteBlocks = [];
  totalSum = 0;
  num = 0;
  for (let item of items) {
    [ tempBlock, blockSum ] = makeWhiteBlock(detailField, item, num);
    totalSum += blockSum;
    this.whiteBlocks.push(tempBlock);
    num++;
  }
  tempBlock.style.marginBottom = String(whiteBlockMarginBottomLast) + ea;

  // total sum contents
  createNodes([
    {
      mother: sumField,
      style: {
        position: "absolute",
        left: String(sumMarginRight) + ea,
        top: String(0),
        height: String(sumBarTop) + ea,
        borderBottom: "1px dashed " + colorChip.green,
        width: withOut(((sumMarginRight * 2) + 1), ea),
        opacity: String(0.6),
      }
    },
    {
      mother: sumField,
      class: [ ultimateTotalClassName ],
      attribute: {
        ultimate: String(totalSum),
      },
      text: "합계 <b%: %b>" + "&nbsp;<u%" + autoComma(totalSum) + '%u>원',
      style: {
        position: "relative",
        top: String(sumTop) + ea,
        fontSize: String(sumSize) + ea,
        fontWeight: String(500),
        marginRight: String(sumMarginRight) + ea,
        color: colorChip.black,
        paddingLeft: String(sumPaddingLeft) + ea,
        background: colorChip.white,
      },
      bold: {
        color: colorChip.deactive,
        fontWeight: String(300),
      },
      under: {
        color: colorChip.black,
        fontWeight: String(500),
      }
    }
  ])

  // save button
  for (let i = 0; i < greenButtons.length; i++) {

    greenButtonBase = createNode({
      mother: titleArea,
      style: {
        display: "block",
        position: "absolute",
        width: String(greenButtonWidth) + ea,
        height: String(greenButtonHeight) + ea,
        bottom: String(greenButtonWordingBottom + ((greenButtonHeight + greenButtonBetween) * i)) + ea,
        left: String(0),
      },
    });

    for (let j = 0; j < greenButtons[i].length; j++) {
      createNode({
        mother: greenButtonBase,
        event: {
          contextmenu: (e) => {
            e.preventDefault();
            e.stopPropagation();
          },
          click: greenButtonEvents[i][j]
        },
        style: {
          display: "inline-flex",
          alignItems: "center",
          paddingLeft: String(greenButtonPaddingTop) + ea,
          paddingRight: String(greenButtonPaddingTop) + ea,
          paddingTop: String(greenButtonPaddingLeft) + ea,
          paddingBottom: String(greenButtonPaddingLeft) + ea,
          marginRight: String(greenButtonMarginRight) + ea,
          justifyContent: "center",
          borderRadius: String(3) + "px",
          bottom: String(greenButtonWordingBottom + ((greenButtonHeight + greenButtonBetween) * i)) + ea,
          left: String(0),
          background: colorChip.gradientGreen,
          cursor: "pointer",
        },
        children: [
          {
            class: [ "hoverDefault_lite" ],
            text: greenButtons[i][j],
            style: {
              position: "relative",
              fontSize: String(greenButtonWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.whiteBlack,
              top: String(greenButtonTextTop) + ea,
            }
          }
        ]
      });
    }

  }

  // auto save launching
  this.autoSave();

}

BuilderJs.prototype.autoSave = function () {
  const instance = this;
  const { autoSaveConst } = this;
  const intervalConst = 10 * 60 * 1000;
  if (GeneralJs.stacks[autoSaveConst] !== null) {
    clearInterval(GeneralJs.stacks[autoSaveConst]);
  }
  GeneralJs.stacks[autoSaveConst] = setInterval(async () => {
    try {
      await instance.saveState();
    } catch (e) {
      console.log(e);
    }
  }, intervalConst);
}

BuilderJs.prototype.saveState = async function (unshiftMode = false) {
  const instance = this;
  const { ajaxJson, uniqueValue, equalJson } = GeneralJs;
  const { invid, dummy: { item, detail } } = this;
  const rConst = "R";
  const iConst = "I";
  const dConst = "D";
  try {
    if (this.invoiceNumber === 0) {
      const blockToJson = function (whiteDom) {
        const optionalValue = (value, d) => { return (value === null ? d : value) }
        let json;
        let tempArr;
        let detailDummy;
        let requestDummy;
        let consumer, vat, supply;
        let thisInvoice;

        json = equalJson(JSON.stringify(item));
        json.id = iConst + uniqueValue("hex");
        json.name = whiteDom.children[0].textContent.replace(/^[0-9]+[^0-9]/, '').trim();

        detailDoms = [ ...whiteDom.children[1].children ].slice(1, -1);
        for (let dom of detailDoms) {
          tempArr = [ ...dom.children ].slice(1);
          detailDummy = equalJson(JSON.stringify(detail));

          detailDummy.id = dConst + uniqueValue("hex");
          detailDummy.name = optionalValue(tempArr[0].getAttribute("value"), '').trim();
          detailDummy.unit.number = Math.floor(Number(optionalValue(tempArr[1].getAttribute("value"), '0').replace(/[^0-9]/gi, '')));
          detailDummy.unit.ea = optionalValue(tempArr[2].getAttribute("value"), '').trim();

          consumer = Math.floor(Number(optionalValue(tempArr[3].getAttribute("value"), '0').replace(/[^0-9]/gi, '')));
          vat = Math.floor((consumer / 11) / 10) * 10;
          supply = Math.floor(consumer - vat);

          detailDummy.unit.amount.consumer = consumer;
          detailDummy.unit.amount.vat = vat;
          detailDummy.unit.amount.supply = supply;

          detailDummy.description = optionalValue(tempArr[5].getAttribute("value"), '').trim();

          json.detail.push(detailDummy);
        }

        return json;
      }
      let whereQuery, updateQuery;
      let tong;

      whereQuery = { invid };
      updateQuery = {};
      tong = [];
      for (let block of this.whiteBlocks) {
        tong.push(blockToJson(block));
      }

      if (!unshiftMode) {
        this.invoiceList.search("invid", this.invid).requests[0].items = tong;
        updateQuery["requests.0.items"] = tong;
      } else {
        thisInvoice = this.invoiceList.search("invid", this.invid);
        requestDummy = equalJson(JSON.stringify(thisInvoice.requests[0]));
        thisInvoice.requests[0].status = "작성 완료";
        thisInvoice.requests.unshift(requestDummy);
        thisInvoice.requests[0].id = rConst + uniqueValue("hex");
        thisInvoice.requests[0].date = new Date();
        thisInvoice.requests[0].items = tong;
        updateQuery["requests"] = thisInvoice.requests;
      }

      await ajaxJson({
        mode: "update",
        collection: "constructInvoice",
        db: "python",
        whereQuery, updateQuery
      }, "/pythonPass_generalMongo");
    }
  } catch (e) {
    window.location.reload();
  }
}

BuilderJs.prototype.addSearchEvent = function () {
  const instance = this;
  const { totalMother, ea, searchInput, estimationBoxes } = this;

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      for (let dom of estimationBoxes) {
        if ((new RegExp(this.value.trim(), "gi")).test(dom.textContent)) {
          dom.style.display = "inline-block";
        } else {
          dom.style.display = "none";
        }
      }
    }
  });

}

BuilderJs.prototype.fileAddition = async function (file, eventDom, event) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, invoiceList } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, setQueue, cleanChildren, ajaxForm, uniqueValue, equalJson } = GeneralJs;
  try {
    const staticConst = "/publicSector/temp/" + uniqueValue("hex");
    const titleWording = "Q. 누구의 견적서 파일인가요?";
    let formData;
    let res, res2;
    let blackBack, questionBase;
    let questionBlock;
    let whiteLineBoxWidth, whiteLineBoxHeight;
    let whiteLineTitleSize, whiteLineTitleTop, whiteLineTitleWeight;
    let blackOpacity;
    let questionTong;
    let questionArr;
    let whiteLineBoxPaddingTop;
    let whiteLineBoxPaddingLeft;
    let whiteLineFactorSize;
    let whiteLineFactorMarginBottom;
    let whiteLineFactorMarginBottomLast;
    let queryBlockWording0, queryBlockWording1;
    let queryLineBetween;
    let queryLineTop;
    let newRequest;
    let loading;

    whiteLineBoxWidth = 303;
    whiteLineBoxHeight = 293;
    whiteLineTitleSize = 22;
    whiteLineTitleTop = -42;
    whiteLineTitleWeight = 700;
    whiteLineBoxPaddingTop = 21;
    whiteLineBoxPaddingLeft = 26;
    whiteLineFactorSize = 18;
    whiteLineFactorMarginBottom = 7;
    whiteLineFactorMarginBottomLast = 60;
    queryLineBetween = 10;
    queryLineTop = 12;

    blackOpacity = 0.7;

    loading = instance.mother.grayLoading();

    formData = new FormData();
    formData.append(staticConst, file);

    await ajaxForm(formData, "https://" + FILEHOST + "/publicSector/file");

    res = await ajaxJson({
      file: staticConst + "/" + file.name,
      sheetsName: "내역서",
    }, "https://" + FILEHOST + "/publicSector/excel", { equal: true });

    res2 = await ajaxJson({ matrix: res }, "/pythonPass_invoiceRequest", { equal: true });

    loading.remove();

    newRequest = JSON.stringify(res2);

    blackBack = createNode({
      mother: document.body,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.realBlack,
        zIndex: String(5),
        transition: "all 0.5s ease",
        opacity: String(0),
      }
    });

    setQueue(() => {
      blackBack.style.opacity = String(blackOpacity);
      setQueue(() => {

        questionBase = createNode({
          mother: document.body,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            height: String(100) + '%',
            zIndex: String(5),
          }
        });

        questionTong = createNode({
          mother: questionBase,
          style: {
            display: "block",
            position: "relative",
            width: String(whiteLineBoxWidth) + ea,
            height: String(whiteLineBoxHeight) + ea,
            borderRadius: String(8) + "px",
            border: "1px solid " + colorChip.white,
            animation: "fadeuplite 0.5s ease",
            paddingTop: String(whiteLineBoxPaddingTop) + ea,
            paddingBottom: String(whiteLineBoxPaddingTop) + ea,
            paddingLeft: String(whiteLineBoxPaddingLeft) + ea,
            paddingRight: String(whiteLineBoxPaddingLeft) + ea,
            overflow: "visible",
          },
          children: [
            {
              text: titleWording,
              style: {
                position: "absolute",
                fontSize: String(whiteLineTitleSize) + ea,
                fontWeight: String(whiteLineTitleWeight),
                color: colorChip.white,
                top: String(whiteLineTitleTop) + ea,
                left: String(0),
              }
            },
            {
              attribute: {
                request: newRequest,
              },
              style: {
                position: "relative",
                top: String(0),
                left: String(0),
                width: String(100) + '%',
                height: String(100) + '%',
                overflow: "scroll",
              }
            }
          ]
        }).children[1];

        for (let box of instance.estimationBoxes) {
          questionArr = box.textContent.split("고객님").map((str) => { return str.trim() });
          questionBlock = createNode({
            mother: questionTong,
            class: [ "hoverDefault_lite" ],
            attribute: {
              invid: box.getAttribute("invid"),
              cliid: box.getAttribute("cliid"),
              desid: box.getAttribute("desid"),
              proid: box.getAttribute("proid"),
            },
            event: {
              click: async function (e) {
                try {
                  const newRequest = equalJson(this.parentElement.getAttribute("request"));
                  const invid = this.getAttribute("invid");
                  const cliid = this.getAttribute("cliid");
                  const desid = this.getAttribute("desid");
                  const proid = this.getAttribute("proid");
                  let targetInvoice;
                  let whereQuery, updateQuery;

                  instance.invoiceList.search("invid", invid).requests[0] = newRequest;
                  targetInvoice = instance.invoiceList.search("invid", invid);

                  document.body.children[([ ...document.body.children ].length - 1)].style.animation = "fadedownlite 0.3s ease forwards";
                  document.body.children[([ ...document.body.children ].length - 2)].style.opacity = String(0);

                  setQueue(() => {
                    document.body.removeChild(document.body.lastChild);
                    document.body.removeChild(document.body.lastChild);

                    const removeTargets = eventDom.querySelectorAll("input");
                    for (let dom of removeTargets) {
                      eventDom.removeChild(dom);
                    }

                    ajaxJson({
                      target: "publicSector",
                    }, "https://" + FILEHOST + "/publicSector/delete").then(() => {
                      instance.estimationBoxes.find((dom) => { return dom.getAttribute("invid") === invid }).click();
                      setQueue(async () => {
                        try {
                          await instance.saveState();
                        } catch (e) {
                          window.location.reload();
                        }
                      }, 1000);
                    }).catch((err) => {
                      window.location.reload();
                    });

                  }, 501);

                } catch (e) {
                  window.location.reload();
                }
              }
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              marginBottom: String(whiteLineFactorMarginBottom) + ea,
            }
          });

          queryBlockWording0 = createNode({
            mother: questionBlock,
            text: questionArr[0],
            style: {
              display: "inline-block",
              fontSize: String(whiteLineFactorSize) + ea,
              fontWeight: String(500),
              color: colorChip.white,
            }
          });

          queryBlockWording1 = createNode({
            mother: questionBlock,
            text: questionArr[1],
            style: {
              position: "absolute",
              right: String(0),
              top: String(0),
              fontSize: String(whiteLineFactorSize) + ea,
              fontWeight: String(500),
              color: colorChip.white,
            }
          });

          createNode({
            mother: questionBlock,
            style: {
              position: "absolute",
              borderBottom: "1px dashed " + colorChip.white,
              height: String(queryLineTop) + ea,
              width: withOut(queryBlockWording0.getBoundingClientRect().width + queryBlockWording1.getBoundingClientRect().width + (queryLineBetween * 2), ea),
              top: String(0),
              left: String(queryBlockWording0.getBoundingClientRect().width + queryLineBetween) + ea,
            }
          });
        }

        createNode({
          mother: questionTong,
          style: {
            display: "block",
            width: String(100) + '%',
            height: String(whiteLineFactorMarginBottomLast) + ea,
          }
        });

      }, 300);
    });

  } catch (e) {
    window.location.reload();
  }
}

BuilderJs.prototype.estimationView = async function () {
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
    const { ajaxJson, returnGet } = GeneralJs;
    const getObj = returnGet();
    const buiid = getObj.buiid || "u2111_aa01s";
    const host = FILEHOST;
    let builder;
    let itemDummy, detailDummy;
    let invoiceList;

    this.belowHeight = <%% 123, 123, 123, 123, 0 %%>;
    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;
    this.tabletWidth = <%% 0, 0, 148, 140, 0 %%>;
    this.motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    this.host = host;
    this.downloadUrl = "https://" + host + "/publicSector";
    this.sampleFile = this.downloadUrl + "/estimationSample.xlsx";
    this.autoSaveConst = "autoSaveInterval";
    GeneralJs.stacks[this.autoSaveConst] = null;

    this.buiid = buiid;
    this.builders = new SearchArray(await ajaxJson({
      mode: "read",
      collection: "builder",
      db: "core",
      whereQuery: {}
    }, "/generalMongo", { equal: true }));

    this.baseMaker();
    this.listDetailLaunching(buiid);

    itemDummy = await ajaxJson({ collection: "constructInvoice", subject: "items" }, "/pythonPass_returnDummy", { equal: true });
    detailDummy = await ajaxJson({ collection: "constructInvoice", subject: "detail" }, "/pythonPass_returnDummy", { equal: true });
    this.dummy = {
      item: itemDummy,
      detail: detailDummy
    };

  } catch (e) {
    console.log(e);
    window.alert("잘못된 접근입니다!");
    window.location.href = "https://home-liaison.com";
  }
}
