// DATA -----------------------------------------------------------------------------------------------------------------
DesignerJs.prototype.aspirantDataRender = function (aspirant, titleMode) {
  const instance = this;
  const { ea, resetWidthEvent } = this;
  const { createNode, createNodes, colorChip, withOut, isMac, dateToString, blankHref, equalJson, ajaxJson, downloadFile } = GeneralJs;
  const { aspid, designer, phone, email, address, portfolio, meeting: { date, status }, information, submit } = aspirant;
  const { firstRequest: { date: request }, comeFrom } = submit;
  const { career, company, channel: { web, sns, cloud } } = information;
  const { businessNumber, classification, name, representative } = company;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color, column) => {
    return `<b id="${!titleMode ? aspirant.aspid : "title"}_${column}" title="${title}" class="value" style="color:${colorChip[titleMode ? "whiteBlack" : color]};">${titleMode ? title : value}</b>`;
  }
  const dateToColor = (dateObj, reverse = true) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "red";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "gray5";
    } else {
      if (dateObj.valueOf() <= (new Date()).valueOf()) {
        return !reverse ? "green" : "black";
      } else {
        return !reverse ? "black" : "green";
      }
    }
  }
  const emptyDate = new Date(1800, 0, 1);
  const emptyValue = "해당 없음";
  const token = ", ";
  let height, margin;
  let whiteBlock;
  let top, left, size;
  let startLeft;
  let previousWidth;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let stringArr, tempDom;
  let tempString, tempString0, tempString1, tempString2, tempString3;
  let updateArr;
  let map;
  let displayBoo;
  let num;
  let calendarEvent;
  let grayBoo;

  height = 43;
  margin = 1;

  top = (titleMode ? (isMac() ? 12 : 13) : (isMac() ? 11 : 12));
  left = 16;
  size = 14;
  startLeft = 0;

  grayBoo = !(/드랍/gi.test(status) || /없/gi.test(status));
  displayBoo = true;

  stringArr = [];
  updateArr = [];

  if (this.type === "basic") {

    map = {
      classification: {
        title: "분류",
        position: "information.company.classification",
        values: [],
        chain: null
      },
      phone: {
        title: "연락처",
        position: "phone",
        values: [],
        chain: null
      },
      email: {
        title: "이메일",
        position: "email",
        values: [],
        chain: null
      },
      status: {
        title: "미팅 상태",
        position: "meeting.status",
        values: [],
        chain: null
      },
      date: {
        title: "미팅 날짜",
        position: "meeting.date",
        values: [],
        chain: null
      },
      dateHour: {
        title: "미팅 시간",
        position: "meeting.date",
        values: [],
        chain: null
      },
      address: {
        title: "주소",
        position: "address",
        values: [],
        chain: null
      },
      request: {
        title: "문의일",
        position: "submit.firstRequest.date",
        values: [],
        chain: null
      },
      comeFrom: {
        title: "유입 경로",
        position: "submit.comeFrom",
        values: [],
        chain: null
      }
    };

    stringArr.push(textMaker(map["classification"].title, classification, "black", "classification"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["phone"].title, phone, "black", "phone"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["email"].title, email, "black", "email"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["status"].title, status, "black", "status"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "status";
    });

    stringArr.push(textMaker(map["date"].title, dateToString(date), dateToColor(date, true), "date"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "date";
    });

    stringArr.push(textMaker(map["dateHour"].title, `${zeroAddition(date.getHours())}시 ${zeroAddition(date.getMinutes())}분`, dateToColor(date, true), "dateHour"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { ea, top, createNodes, colorChip, withOut, boxShadow, animation, borderRadius, zIndex, thisCase, valueDom, height, size, textTop } = option;
      const column = "dateHour";
    });

    stringArr.push(textMaker(map["request"].title, dateToString(request, true), dateToColor(request, true), "request"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["comeFrom"].title, comeFrom, "black", "comeFrom"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["address"].title, address, "black", "address"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  } else if (this.type === "portfolio") {

    map = {
      email: {
        title: "이메일",
        position: "email",
        values: [],
        chain: null
      },
      portfolio: {
        title: "포트폴리오",
        position: "portfolio",
        values: [],
        chain: null
      },
      web: {
        title: "웹",
        position: "information.channel.web",
        values: [],
        chain: null
      },
      sns: {
        title: "SNS",
        position: "information.channel.sns",
        values: [],
        chain: null
      },
      cloud: {
        title: "클라우드",
        position: "information.channel.cloud",
        values: [],
        chain: null
      },
    };

    stringArr.push(textMaker(map["email"].title, email, "black", "email"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["portfolio"].title, (portfolio.length > 0 ? "제출" : "미제출"), "black", "portfolio"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      if (window.confirm("다운로드를 진행할까요?")) {
        ajaxJson({ aspid: parent.id }, "/ghostPass_designerPhoto").then((data) => {
          const { list } = data;
          return Promise.all(list.map((i) => { return downloadFile(i) }));
        }).catch((err) => {
          console.log(err);
        });
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["web"].title, web.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "web"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["sns"].title, sns.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "sns"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

    stringArr.push(textMaker(map["cloud"].title, cloud.map((str) => { return str.replace(/https?\:?\/\//gi, '').trim().replace(/\/$/, ''); }).join(token), "black", "cloud"));
    updateArr.push(function (e, option, cancelBox, parent) {
      const mother = this;
      const { valueDom } = option;
      const targetLinks = valueDom.textContent.split(token).map((str) => { return str.trim(); });
      for (let link of targetLinks) {
        blankHref("https://" + link);
      }
      cancelBox.parentNode.removeChild(cancelBox);
      resetWidthEvent();
    });

  }

  return { map, stringArr, updateArr, grayBoo, displayBoo };
}

DesignerJs.prototype.aspirantUpdate = async function (whereQuery, updateQuery, chainQuery = null, rawValue = '') {
  const instance = this;
  const { colorChip, ajaxJson } = GeneralJs;
  try {
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild input");
    }
    if (chainQuery !== null) {
      if (chainQuery.condition === undefined || chainQuery.updateQuery === undefined) {
        throw new Error("invaild input");
      }
    }
    const { proid } = whereQuery;
    const project = this.projects.search("proid", proid);
    let tempArr, target;
    let boo;
    let tempQsa0, tempQsa1, tempQsa2;

    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateProject");

    for (let query in updateQuery) {
      tempArr = query.split('.');
      target = project;
      for (let i = 0; i < tempArr.length - 1; i++) {
        target = target[tempArr[i]];
      }
      target[tempArr[tempArr.length - 1]] = updateQuery[query];
    }

    if (chainQuery !== null) {
      const { condition, updateQuery: chainUpdateQuery } = chainQuery;
      boo = false;
      if ((new RegExp(condition, "gi")).test(rawValue)) {
        boo = true;
      }
      if (boo) {
        await ajaxJson({ whereQuery, updateQuery: chainUpdateQuery }, "/rawUpdateProject");
        for (let query in chainUpdateQuery) {
          tempArr = query.split('.');
          target = project;
          for (let i = 0; i < tempArr.length - 1; i++) {
            target = target[tempArr[i]];
          }
          target[tempArr[tempArr.length - 1]] = chainUpdateQuery[query];
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantDeactivate = function (proid, offMode = true) {
  const instance = this;
  const { colorChip, stacks } = GeneralJs;
  let emptyDate, emptyValue;
  let tempQsa;
  let whiteBlock;
  let num;
  let name;
  let tong;
  let children;
  let length;

  whiteBlock = document.getElementById(proid);
  children = whiteBlock.children;
  length = children.length;
  emptyDate = new Date(1800, 0, 1);
  emptyValue = "해당 없음";
  name = "deactive_" + proid;

  if (offMode) {
    stacks[name] = [];
    tong = stacks[name];
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      tong.push(dom.style.color);
      dom.style.color = colorChip.gray4;
    }
    tong.push(whiteBlock.style.background);
    whiteBlock.style.background = colorChip.gray0;
    tong.push(children[length - 2].style.background);
    children[length - 2].style.background = colorChip.gray0;
    tong.push(children[length - 1].style.background);
    children[length - 1].style.background = colorChip.gray4;
  } else {
    if (Array.isArray(stacks[name])) {
      num = 0;
      tong = stacks[name];
      tempQsa = whiteBlock.querySelectorAll("div");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      tempQsa = whiteBlock.querySelectorAll("b");
      for (let dom of tempQsa) {
        dom.style.color = tong[num];
        num = num + 1;
      }
      whiteBlock.style.background = tong[num];
      num = num + 1;
      children[length - 2].style.background = tong[num];
      num = num + 1;
      children[length - 1].style.background = tong[num];
    } else {
      window.location.reload();
    }
  }

}

// LOGIC -----------------------------------------------------------------------------------------------------------------

DesignerJs.prototype.aspirantBase = function (search = null) {
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
  topMargin = 11;
  leftMargin = 10;

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

  [ borderBack, dashBoard, contentsArea, contentsTong ] = createNodes([
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
        textAlign: "center",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    },
    {
      mother: -1,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    }
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.aspirantBlockInjection();
  this.aspirantDashBoard();
}

DesignerJs.prototype.aspirantBlockInjection = function () {
  const instance = this;
  const { ea, aspirants } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  let scrollTong;
  let width, dom;
  let maxWidth;
  let startLeft, betweenText, widthArr, domArr;
  let temp;
  let firstBoo;
  let leftMargin;
  let firstPaddingTop;
  let tongPaddingBottom;

  leftMargin = 10;
  firstPaddingTop = 44;
  tongPaddingBottom = 500;

  cleanChildren(contentsTong);

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: withOut(leftMargin, ea),
      overflowX: "hidden",
      paddingTop: String(firstPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
    }
  });

  maxWidth = [];

  aspirants.sort((a, b) => { return b.submit.firstRequest.valueOf() - a.submit.firstRequest.valueOf(); });

  this.scrollTong = scrollTong;
  this.contentsBlocks = [];
  this.ignoreNumbers = [ 3, 1 ];
  this.resetWidthEvent = async function () {
    try {
      const { xyConverting } = GeneralJs;
      const { ignoreNumbers } = instance;
      let children;
      let widthArrMother, widthArrMotherConverted;
      let widthArr;
      let tempArr;

      widthArrMother = [];
      for (let block of instance.contentsBlocks) {
        children = block.children;
        widthArr = [];
        for (let i = 0; i < children.length; i++) {
          if (i >= ignoreNumbers[0] && i < children.length - ignoreNumbers[1]) {
            children[i].style.width = "auto";
          }
          widthArr.push(children[i].getBoundingClientRect().width);
        }
        widthArrMother.push(widthArr);
      }

      widthArrMotherConverted = xyConverting(widthArrMother).map((arr) => {
        arr.sort((a, b) => { return b - a; });
        return arr[0];
      });

      for (let block of instance.contentsBlocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          children[i].style.width = String(widthArrMotherConverted[i]) + ea;
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  firstBoo = true;
  for (let i = 0; i < aspirants.length; i++) {
    if (firstBoo) {
      this.aspirantWhiteBlock(scrollTong, aspirants[i], (i === aspirants.length - 1), i, true);
      firstBoo = false;
    }
    this.aspirantWhiteBlock(scrollTong, aspirants[i], (i === aspirants.length - 1), i, false);
  }

  this.resetWidthEvent();
}

DesignerJs.prototype.aspirantWhiteBlock = function (mother, aspirant, last, index, titleMode = false) {
  if (mother === undefined || aspirant === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const { map, stringArr, updateArr, grayBoo, displayBoo } = this.aspirantDataRender(aspirant, titleMode);
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let tempQsa;
  let whiteBack;
  let whiteWidth;
  let tempDom;
  let factorHeight;
  let leftMargin;
  let motherMargin;
  let titleBlockTop;
  let menuMargin;
  let menuHeight;
  let menuTextTop;

  leftMargin = 10;
  motherMargin = 30;

  height = 43;
  margin = 1;

  width0 = 115;
  width1 = 3;
  titleBlockTop = 105;

  top = (titleMode ? (isMac() ? 11 : 12) : (isMac() ? 11 : 12));
  left = 16;
  size = 14;
  textMargin = 6;
  betweenText = 50;

  whiteWidth = 16;
  factorHeight = 20;

  menuMargin = 25;
  menuHeight = 31;
  menuTextTop = isMac() ? 5 : 7;

  whiteBlock = createNode({
    mother,
    id: titleMode ? "title" : aspirant.aspid,
    attribute: [
      { index: String(index) },
      { sortstandard: "" },
      { sort: "1" },
      { title: titleMode ? 1 : 0 }
    ],
    style: {
      display: instance.contentsSearchIndex.includes(index) ? "none" : (displayBoo ? "block" : "none"),
      position: titleMode ? "fixed" : "relative",
      width: String(8000) + ea,
      height: String(height) + ea,
      marginBottom: String(margin) + ea,
      transition: "all 0s ease",
      zIndex: titleMode ? String(4) : "",
      top: titleMode ? String(titleBlockTop) + ea : "",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: "calc(100vw - " + String((motherMargin * 2) + (leftMargin * 2)) + ea + ")",
          height: String(100) + '%',
          borderRadius: String(3) + "px",
          background: titleMode ? colorChip.gradientGreen2 : colorChip[grayBoo ? "white" : "gray0"],
          top: String(0),
          left: String(0),
          transition: "all 0s ease",
          boxShadow: titleMode ? "0px 2px 13px -9px " + colorChip.shadow : "",
          opacity: titleMode ? String(0.92) : "",
        }
      },
      {
        text: !titleMode ? aspirant.title : "",
        class: [ "hoverDefault" ],
        events: [
          {
            type: "click",
            event: function (e) {

            }
          }
        ],
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width0) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(left) + ea,
          fontSize: String(size) + ea,
          zIndex: String(2),
          color: colorChip.black,
          transition: "all 0s ease",
        }
      },
      {
        text: !titleMode ? '|' : "",
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: String(width1) + ea,
          top: String(top + (isMac() ? 1 : 0)) + ea,
          marginLeft: String(textMargin) + ea,
          fontSize: String(size) + ea,
          color: colorChip.gray4,
          zIndex: String(2),
          transition: "all 0s ease",
        }
      },
    ]
  });

  widthArr = [];
  domArr = [];
  for (let i = 0; i < stringArr.length; i++) {
    tempDom = createNode({
      mother: whiteBlock,
      attribute: [
        { index: String(index) },
        { arrindex: String(i) },
        { title: titleMode ? 1 : 0 },
        { sort: String(1), }
      ],
      text: stringArr[i],
      class: [ "white_child_" + String(i) ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.stopPropagation();
            e.preventDefault();
            const { ea, ignoreNumbers, contentsBlocks, scrollTong } = instance;
            const { createNode, createNodes, colorChip, withOut, xyConverting } = GeneralJs;
            const titleMode = Number(this.getAttribute("title")) === 1;
            const thisIndex = Number(this.getAttribute("arrindex"));
            const thisSort = Number(this.getAttribute("sort"));
            if (titleMode) {
              const targets = contentsBlocks.map((dom, index) => { return { dom, index: index - 1 }; }).slice(1);
              const children = xyConverting(targets.map((obj) => { return [ ...obj.dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]); }));
              const sortTargets = children[thisIndex];
              let indexArr, tempIndex, numberSortBoo;

              numberSortBoo = sortTargets.map((dom) => { return dom.querySelector(".value").textContent; }).some((str) => { return (str.replace(/[0-9\-\.\: ]/gi, '').trim() === '' && /[0-9]/gi.test(str)) });

              if (!numberSortBoo) {
                if (thisSort === 1) {
                  sortTargets.sort((a, b) => {
                    return b.querySelector(".value").textContent > a.querySelector(".value").textContent ? 1 : -1;
                  });
                  this.setAttribute("sort", String(0));
                } else {
                  sortTargets.sort((a, b) => {
                    return a.querySelector(".value").textContent > b.querySelector(".value").textContent ? 1 : -1;
                  });
                  this.setAttribute("sort", String(1));
                }
              } else {
                if (thisSort === 1) {
                  sortTargets.sort((a, b) => {
                    return (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 0 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                  });
                  this.setAttribute("sort", String(0));
                } else {
                  sortTargets.sort((a, b) => {
                    return (a.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(a.querySelector(".value").textContent.replace(/[^0-9]/gi, ''))) - (b.querySelector(".value").textContent.replace(/[^0-9]/gi, '') === '' ? 90000 * 90000 : Number(b.querySelector(".value").textContent.replace(/[^0-9]/gi, '')));
                  });
                  this.setAttribute("sort", String(1));
                }
              }

              indexArr = sortTargets.map((dom) => { return Number(dom.getAttribute("index")) });
              for (let index of indexArr) {
                tempIndex = targets.findIndex((obj) => { return obj.index === index });
                if (tempIndex !== -1) {
                  scrollTong.appendChild(targets[tempIndex].dom);
                }
              }

            } else {
              if (this.querySelectorAll("aside").length === 0) {
                const self = this;
                const index = Number(this.getAttribute("arrindex"));
                const valueDom = this.querySelector(".value");
                let thisCase;
                thisCase = {};
                for (let column in map) {
                  if (document.getElementById(aspirant.aspid + "_" + column) === null) {
                    throw new Error("invaild doms");
                  }
                  thisCase[column] = document.getElementById(aspirant.aspid + "_" + column);
                }
                const option = {
                  ea,
                  top: menuMargin,
                  createNode,
                  createNodes,
                  colorChip,
                  withOut,
                  thisCase,
                  boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                  animation: "fadeuplite 0.2s ease forwards",
                  borderRadius: String(5) + "px",
                  zIndex: String(3),
                  valueDom,
                  height: menuHeight,
                  size,
                  textTop: menuTextTop
                };
                let cancelBox, parent;

                parent = this.parentElement;
                cancelBox = createNode({
                  mother: this,
                  mode: "aside",
                  events: [
                    {
                      type: "click",
                      event: async function (e) {
                        try {
                          e.stopPropagation();
                          e.preventDefault();
                          const directParent = this.parentElement;
                          const removeTargets = directParent.querySelectorAll("aside");
                          for (let dom of removeTargets) {
                            directParent.removeChild(dom);
                          }
                          instance.resetWidthEvent();
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  ],
                  style: {
                    position: "fixed",
                    top: String(0) + ea,
                    left: String(0) + ea,
                    width: String(100) + '%',
                    height: String(100) + '%',
                    background: "transparent",
                    zIndex: option.zIndex,
                  }
                });

                updateArr[index].call(this, e, option, cancelBox, parent, instance.resetWidthEvent);
              }
            }
          }
        },
      ],
      style: {
        display: "inline-block",
        verticalAlign: "top",
        position: "relative",
        top: String(top) + ea,
        marginLeft: String(betweenText) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(titleMode ? 700 : 500),
        height: ((i === stringArr.length - 1) ? String(factorHeight) + ea : ""),
        overflow: ((i === stringArr.length - 1) ? "hidden" : "visible"),
        transition: "all 0s ease",
        cursor: "pointer",
      }
    });
    domArr.push(tempDom);
    previousWidth = tempDom.getBoundingClientRect().width;
    widthArr.push(previousWidth);
  }

  whiteBack = createNode({
    mother: whiteBlock,
    style: {
      position: "absolute",
      top: String(0) + ea,
      right: String(0) + ea,
      width: String(whiteWidth) + ea,
      height: String(100) + '%',
      background: colorChip.white
    }
  });

  if (!grayBoo) {
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    whiteBlock.children[2].style.background = colorChip.gray0;
    whiteBack.style.background = colorChip.gray0;
  }

  this.contentsBlocks.push(whiteBlock);

}

DesignerJs.prototype.aspirantDashBoard = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { dashBoard } = this.contentsSpec;
  let size, top, left;
  let nodeArr;
  let textArr;
  let typeNum;
  let dashBoardBox;

  size = 16;
  top = 11;
  left = 19;

  textArr = [];
  typeNum = 0;
  for (let i = 0; i < this.typeArr.length; i++) {
    if (this.typeArr[i] === this.type) {
      typeNum = i;
    }
    textArr.push(this.typeArr[i].slice(0, 1).toUpperCase() + this.typeArr[i].slice(1));
  }

  dashBoardBox = createNode({
    mother: dashBoard,
    style: {
      position: "relative",
      width: withOut(left * 2, ea),
      height: String(100) + '%',
      left: String(left) + ea,
      textAlign: "left",
    }
  });

  nodeArr = [];
  for (let i = 0; i < textArr.length; i++) {
    nodeArr.push({
      mother: dashBoardBox,
      text: textArr[i],
      class: [ "hoverDefault" ],
      attribute: [
        { value: instance.typeArr[i] }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.type = this.getAttribute("value");
            for (let i = 0; i < instance.typeArr.length; i++) {
              if (instance.typeArr[i] === instance.type) {
                instance.typeDoms[i].style.color = colorChip.green;
              } else {
                instance.typeDoms[i].style.color = colorChip.shadowWhite;
              }
            }
            instance.aspirantBlockInjection();
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(400),
        top: String(top) + ea,
        color: colorChip[i === typeNum ? "green" : "shadowWhite"],
      }
    });
    if (i !== textArr.length - 1) {
      nodeArr.push({
        mother: dashBoardBox,
        text: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
        style: {
          display: "inline-block",
          position: "relative",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          top: String(top) + ea,
          color: colorChip.gray5
        }
      });
    }
  }
  nodeArr.push({
    mother: dashBoardBox,
    text: 'D',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?mode=general");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(0) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });
  nodeArr.push({
    mother: dashBoardBox,
    text: 'C',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(18) + ea,
      fontStyle: "italic",
      color: colorChip.black,
    }
  });

  nodeArr.push({
    mother: dashBoardBox,
    mode: "svg",
    source: this.mother.returnHamburger(colorChip.black),
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          instance.contentsSearchIndex = [];
          instance.aspirantBlockInjection();
        }
      }
    ],
    style: {
      position: "absolute",
      height: String(11) + ea,
      top: String(18) + ea,
      right: String(38) + ea,
    }
  });

  nodeArr = createNodes(nodeArr);
  instance.typeDoms = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i % 2 === 0) {
      instance.typeDoms.push(nodeArr[i]);
    }
  }
}

DesignerJs.prototype.aspirantSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    let tempArr, orArr;
    if (e.key === "Enter") {
      instance.contentsSearchIndex = [];
      orArr = [];
      tempArr = this.value.trim().split(',');
      for (let value of tempArr) {
        if (value.trim() !== '' && value.trim() !== '.') {
          for (let dom of instance.contentsBlocks) {
            if ((new RegExp(value.trim(), "gi")).test(dom.textContent)) {
              orArr.push(Number(dom.getAttribute("index")));
            }
          }
        }
      }
      if (this.value.trim() !== '' && this.value.trim() !== '.') {
        for (let i = 0; i < length; i++) {
          if (!orArr.includes(i)) {
            instance.contentsSearchIndex.push(i);
          }
        }
      }
      instance.aspirantBlockInjection();
    }
  });
}

DesignerJs.prototype.aspirantExtractEvent = function () {
  const instance = this;
  const { ignoreNumbers, parentId, sheetName } = this;
  const { ajaxJson, blankHref } = GeneralJs;
  const { belowButtons: { sub: { extractIcon } } } = this.mother;

  extractIcon.addEventListener("click", async function (e) {
    try {
      const domTargets = instance.contentsBlocks.filter((dom) => {
        return (dom.id !== "title") && (dom.style.display !== "none");
      });
      const childrenTargets = domTargets.map((dom) => {
        let target = [ ...dom.children ].slice(ignoreNumbers[0], -1 * ignoreNumbers[1]);
        target.unshift(dom.children[1]);
        return target;
      });
      const newMake = true;
      let values, titleMatrix;
      let loading;

      values = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").textContent;
          } else {
            return dom.textContent;
          }
        });
      })

      titleMatrix = childrenTargets.map((arr) => {
        return arr.map((dom) => {
          if (dom.querySelector(".value") !== null) {
            return dom.querySelector(".value").getAttribute("title");
          } else {
            return "이름";
          }
        });
      })

      if (titleMatrix.length > 0) {
        values.unshift(titleMatrix[0]);
        loading = instance.mother.grayLoading();
        const { link } = await ajaxJson({ values, newMake, parentId, sheetName }, "/sendSheets");
        loading.remove();
        blankHref(link);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

DesignerJs.prototype.aspirantBlockMove = function () {
  const instance = this;
  const { ea } = this;
  const { belowButtons: { arrow: { left, right } } } = this.mother;
  const moveEvent = function (type = "left") {
    return function (e) {
      const blocks = instance.contentsBlocks;
      const movementAmount = 50;
      const ignoreNumbers = [ 1, 1 ];
      let children;
      let left;
      for (let block of blocks) {
        children = block.children;
        for (let i = ignoreNumbers[0]; i < children.length - ignoreNumbers[1]; i++) {
          left = Number(children[i].style.left.replace(/[^0-9\-\.]/gi, ''));
          left = left + (movementAmount * (type === "left" ? -1 : 1));
          children[i].style.left = String(left) + ea;
        }
      }
    }
  }
  left.addEventListener("click", moveEvent("left"));
  right.addEventListener("click", moveEvent("right"));
}

DesignerJs.prototype.aspirantView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, returnGet, equalJson, sleep, uniqueValue } = GeneralJs;
    let loading;
    let type, typeArr;
    let aspirants, aspirant;

    loading = await this.mother.loadingRun();

    typeArr = [ "basic", "portfolio" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.parentId = "1fc961yeNnaZX4-_NpJfs2xG5-vw7vP0u";
    this.sheetName = "fromDB_aspirant_" + uniqueValue("string");
    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;

    aspirants = await ajaxJson({ whereQuery: {} }, "/getAspirants", { equal: true });
    this.aspirants = aspirants;
    for (let aspirant of this.aspirants) {
      aspirant.title = `${aspirant.designer}&nbsp;&nbsp;<b style="color:${colorChip.deactive}">디자이너</b>`;
    }

    loading.parentNode.removeChild(loading);

    this.aspirantBase();
    this.aspirantSearchEvent();
    this.aspirantBlockMove();
    this.aspirantExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
