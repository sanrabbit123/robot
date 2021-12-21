DesignerJs.prototype.calculationBase = function () {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  let entireTong;
  let scrollTong;
  let margin;
  let boxMargin;

  margin = 30;
  boxMargin = 10;

  entireTong = createNode({
    mother: document.getElementById("totalcontents"),
    style: {
      position: "relative",
      width: withOut(100, margin + boxMargin, ea),
      height: withOut(100, belowHeight, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(boxMargin) + ea,
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
  const { ea, belowHeight, taxBill, cashReceipt } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren, isMac, autoComma } = GeneralJs;
  const { designer: name, desid } = designer;
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
  const dateToString = (date) => { return date.valueOf() > emptyDateValue ? `${date.getMonth() + 1}/${date.getDate()}` : `0/0`; }
  let motherWidth;
  let titleArea, listArea, sumArea;
  let titleWidth, titleHeight;
  let outerMargin, innerMargin;
  let titleSize, size, sumSize;
  let sumHeight;
  let nodeArr;
  let projectHeight;
  let whiteBlock_mother, whiteBlock;
  let textTop, textLeft;
  let firstWidth;
  let boxTop;
  let lineTop, lineMargin;
  let textBox;
  let condition;
  let amount;
  let firstAmount, leftAmount;
  let redPointBoo, circleWidth;
  let titleTextTop;
  let listHeight;
  let classificationWidth;
  let sumMargin;
  let sumCaseTop;
  let tempDate;
  let ago, agoValue;
  let greateStandard;
  let projectArr;
  let projectObj;

  projectArr = [];

  ago = new Date();
  ago.setDate(ago.getDate() - 28);
  agoValue = ago.valueOf();

  motherWidth = Number(mother.style.width.replace(/[^0-9\.\-]/g, ''));
  titleWidth = 69;
  titleHeight = 100;
  outerMargin = 20;
  innerMargin = 10;
  titleSize = 21;
  size = 15;
  sumSize = 16;
  listHeight = 178;
  sumHeight = 44;
  projectHeight = 40;
  firstWidth = 34;
  boxTop = 9;
  titleTextTop = isMac() ? -1 : 1;
  textTop = isMac() ? 0 : 2;
  textLeft = 12;
  lineTop = 10;
  lineMargin = 6;
  circleWidth = 8;
  classificationWidth = 68;
  sumMargin = 10;
  sumCaseTop = 6;

  [ titleArea, listArea, sumArea ] = createNodes([
    {
      mother,
      events: [
        {
          type: "click",
          event: async function (e) {
            const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
            let matrix, tempArr, loading;
            try {
              if (window.confirm(designer.designer + " 디자이너의 정산 상황을 시트로 추출할까요?")) {
                matrix = [ [ "디자이너", "고객", "총 정산액", "선금", "정산일", "잔금", "정산일", "미정산 선금", "미정산 잔금", "프로젝트 아이디", "프로젝트 시작일", "프로젝트 종료일" ] ];

                for (let { proid, start, end, name, first, remain } of projectArr) {
                  tempArr = [];
                  tempArr.push(designer.designer);
                  tempArr.push(name);
                  tempArr.push(first.amount + remain.amount);
                  tempArr.push(first.amount);
                  tempArr.push(first.date);
                  tempArr.push(remain.amount);
                  tempArr.push(remain.date);
                  tempArr.push(first.date.trim() === '-' ? first.amount : 0);
                  tempArr.push(remain.date.trim() === '-' ? remain.amount : 0);
                  tempArr.push(proid);
                  tempArr.push(start);
                  tempArr.push(end);
                  matrix.push(tempArr);
                }

                loading = await instance.mother.grayLoading();

                const { link } = await GeneralJs.ajaxJson({
                  values: matrix,
                  newMake: true,
                  parentId: parentId,
                  sheetName: "fromDB_designerCalculation_" + GeneralJs.uniqueValue("string"),
                }, "/sendSheets");

                loading.remove();
                GeneralJs.blankHref(link);
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      ],
      style: {
        position: "absolute",
        width: String(titleWidth) + ea,
        height: String(titleHeight) + ea,
        top: String(outerMargin) + ea,
        left: String(outerMargin) + ea,
        cursor: "pointer",
      }
    },
    {
      mother,
      class: [ "list" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(100, (outerMargin * 2) + titleWidth + innerMargin, ea),
        height: String(listHeight) + ea,
        marginLeft: String(outerMargin + titleWidth + innerMargin) + ea,
        marginTop: String(outerMargin) + ea,
        paddingTop: String(innerMargin) + ea,
        background: colorChip.gray3,
        borderRadius: String(5) + "px",
      }
    },
    {
      mother,
      attribute: [
        { outer: String(outerMargin) + ea },
        { inner: String(innerMargin) + ea },
      ],
      class: [ "sum" ],
      style: {
        position: "relative",
        width: withOut(100, (outerMargin * 2) + titleWidth + innerMargin, ea),
        height: String(sumHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        marginLeft: String(outerMargin + titleWidth + innerMargin) + ea,
        marginTop: String(innerMargin) + ea,
        marginBottom: String(outerMargin) + ea,
      }
    },
  ]);

  nodeArr = createNodes([
    {
      mother: titleArea,
      text: name,
      class: [ "title" ],
      attribute: [
        { big: String(titleTextTop) + ea },
        { small: String(titleTextTop + sumCaseTop) + ea },
      ],
      style: {
        position: "absolute",
        fontSize: String(titleSize) + ea,
        fontWeight: String(600),
        top: String(titleTextTop) + ea,
        left: String(3) + ea,
      }
    },
    {
      mother: listArea,
      style: {
        position: "relative",
        width: withOut(100, 0, ea),
        height: withOut(100, innerMargin, ea),
        background: colorChip.gray3,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    },
    {
      mother: -1,
      style: {
        position: "relative",
        width: withOut(100, 0, ea),
        height: withOut(100, innerMargin * (0 + 3), ea),
        paddingBottom: String(innerMargin * 3) + ea,
        borderRadius: String(5) + "px",
        overflow: "scroll",
      }
    }
  ]);

  firstAmount = 0;
  leftAmount = 0;
  for (let i = 0; i < designer.projects.length; i++) {
    projectObj = {
      proid: designer.projects[i].proid,
      start: GeneralJs.dateToString(designer.projects[i].process.contract.form.date.from),
      end: GeneralJs.dateToString(designer.projects[i].process.contract.form.date.to),
    };

    whiteBlock_mother = createNode({
      mother: nodeArr[2],
      id: designer.projects[i].proid,
      class: [ "projectWhite" ],
      attribute: [
        { proid: designer.projects[i].proid },
        { condition: "true" },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const proid = this.getAttribute("proid");
            GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project?proid=" + proid);
          }
        }
      ],
      style: {
        position: "relative",
        width: withOut(100, innerMargin * 2, ea),
        height: String(projectHeight) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        marginBottom: String(innerMargin / 2) + ea,
        marginLeft: String(innerMargin) + ea,
        cursor: "pointer",
      }
    });

    createNode({
      mother: whiteBlock_mother,
      class: [ "clientName" ],
      text: designer.projects[i].name,
      style: {
        position: "absolute",
        top: String(boxTop + textTop) + ea,
        left: String(textLeft) + ea,
        width: String(50) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(500),
        color: colorChip.black,
      }
    });
    projectObj.name = designer.projects[i].name;

    whiteBlock = createNode({
      mother: whiteBlock_mother,
      style: {
        position: "relative",
        width: withOut(100, 50, ea),
        height: String(projectHeight) + ea,
        marginLeft: String(50) + ea,
      }
    });

    createNode({
      mother: whiteBlock,
      text: "선금",
      style: {
        position: "absolute",
        top: String(boxTop + textTop) + ea,
        left: String(textLeft) + ea,
        width: String(firstWidth) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(200),
        color: colorChip.shadowWhite,
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
    if (!condition) {
      tempDate = designer.projects[i].proposal.date;
      tempDate.setDate(tempDate.getDate() + 1);
      tempDate = (tempDate.valueOf() >= agoValue ? tempDate : ago);
      if (!/[프간]/gi.test(designer.information.business.businessInfo.classification)) {
        condition = taxBill.search(designer.projects[i].process.calculation.payments.first.amount, designer.information.business.businessInfo.businessNumber, tempDate);
      } else if (/간이/gi.test(designer.information.business.businessInfo.classification)) {
        condition = cashReceipt.search(designer.projects[i].process.calculation.payments.first.amount, designer.information.business.businessInfo.businessNumber, tempDate);
      }
    }
    if (!condition) {
      firstAmount += amount;
      whiteBlock_mother.setAttribute("condition", "false");
    }
    createNodes([
      {
        mother: textBox,
        class: [ "firstAmount" ],
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
        class: [ "firstDate" ],
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
    projectObj.first = {
      amount,
      date: dateToString(designer.projects[i].process.calculation.payments.first.date) === "0/0" ? '-' : GeneralJs.dateToString(designer.projects[i].process.calculation.payments.first.date),
      condition: condition ? 1 : 0,
    };

    createNode({
      mother: whiteBlock,
      text: "잔금",
      style: {
        position: "absolute",
        top: String(boxTop + textTop) + ea,
        left: withOut(50, 0, ea),
        width: String(firstWidth) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(200),
        color: colorChip.shadowWhite,
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
    if (designer.projects[i].process.calculation.payments.remain.date.valueOf() <= emptyDateValue) {
      if (([ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '해당 없음' ]).includes(designer.projects[i].contents.raw.portfolio.status)) {
        condition = true;
      } else {
        if (designer.projects[i].contents.photo.boo) {
          if (/완료/gi.test(designer.projects[i].contents.photo.status) && (/디자이너/gi.test(designer.projects[i].contents.photo.info.photographer) || /고객/gi.test(designer.projects[i].contents.photo.info.photographer))) {
            condition = false;
          } else {
            if (designer.projects[i].contents.photo.date.valueOf() < (new Date(3000, 0, 1)).valueOf() && designer.projects[i].contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
              condition = false;
            } else {
              condition = true;
            }
          }
        } else {
          condition = false;
        }
      }
    } else {
      condition = true;
    }
    if (!condition) {
      tempDate = designer.projects[i].process.calculation.payments.first.date;
      tempDate.setDate(tempDate.getDate() + 1);
      tempDate = (tempDate.valueOf() >= agoValue ? tempDate : ago);
      if (!/[프간]/gi.test(designer.information.business.businessInfo.classification)) {
        condition = taxBill.search(designer.projects[i].process.calculation.payments.first.amount, designer.information.business.businessInfo.businessNumber, tempDate);
      } else if (/간이/gi.test(designer.information.business.businessInfo.classification)) {
        condition = cashReceipt.search(designer.projects[i].process.calculation.payments.first.amount, designer.information.business.businessInfo.businessNumber, tempDate);
      }
    }
    if (!condition) {
      whiteBlock_mother.setAttribute("condition", "false");
      leftAmount += amount;
    } else {
      if (whiteBlock_mother.getAttribute("condition") === "false") {
        whiteBlock_mother.setAttribute("condition", "false");
      }
    }
    createNodes([
      {
        mother: textBox,
        class: [ "remainAmount" ],
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
        class: [ "remainDate" ],
        text: dateToString(designer.projects[i].process.calculation.payments.remain.date),
        style: {
          position: "absolute",
          top: String(textTop) + ea,
          right: String(0),
          fontSize: String(size) + ea,
          fontWeight: String(500),
          paddingLeft: String(lineMargin) + ea,
          background: colorChip.white,
          color: (condition ? ((designer.projects[i].process.calculation.payments.remain.date.valueOf() > emptyDateValue) ? colorChip.green : colorChip.green) : colorChip.red),
        }
      }
    ]);

    projectObj.remain = {
      amount,
      date: dateToString(designer.projects[i].process.calculation.payments.remain.date) === "0/0" ? '-' : GeneralJs.dateToString(designer.projects[i].process.calculation.payments.remain.date),
      condition: condition ? 1 : 0,
    };

    projectArr.push(projectObj);
  }

  textLeft = textLeft + 3;
  createNode({
    mother: sumArea,
    text: designer.information.business.businessInfo.classification.replace(/사업자/g, ''),
    style: {
      position: "absolute",
      top: String(boxTop + 1 + textTop) + ea,
      left: String(textLeft) + ea,
      width: String(classificationWidth) + ea,
      fontSize: String(sumSize) + ea,
      fontWeight: String(500),
      color: colorChip.black,
    }
  });
  createNode({
    mother: sumArea,
    text: "선금",
    style: {
      position: "absolute",
      top: String(boxTop + 1 + textTop) + ea,
      left: String(textLeft + classificationWidth + sumMargin) + ea,
      width: String(firstWidth) + ea,
      fontSize: String(sumSize) + ea,
      fontWeight: String(200),
      color: colorChip.shadowWhite,
    }
  });
  textBox = createNode({
    mother: sumArea,
    style: {
      position: "absolute",
      top: String(boxTop + 1) + ea,
      left: String(textLeft + classificationWidth + sumMargin + firstWidth) + ea,
      width: "calc(calc(calc(100% - " + String(classificationWidth + sumMargin) + ea + ") / 2) - " + String(textLeft + firstWidth + (textLeft * 1)) + ea + ")",
      height: withOut(100, boxTop, ea),
      overflow: "hidden",
    }
  });
  createNodes([
    {
      mother: textBox,
      text: autoComma(firstAmount) + "원",
      style: {
        position: "absolute",
        top: String(textTop) + ea,
        right: String(0),
        fontSize: String(sumSize) + ea,
        fontWeight: String(500),
        paddingLeft: String(lineMargin + 3) + ea,
        background: colorChip.white,
        zIndex: String(1),
        color: (firstAmount === 0 ? colorChip.black : colorChip.red),
      }
    },
    {
      mother: textBox,
      style: {
        position: "absolute",
        top: String(lineTop) + ea,
        left: String(3) + ea,
        width: String(100) + '%',
        borderBottom: "1px solid " + colorChip.gray3,
      }
    }
  ]);
  createNode({
    mother: sumArea,
    text: "잔금",
    style: {
      position: "absolute",
      top: String(boxTop + 1 + textTop) + ea,
      left: "calc(calc(calc(100% - " + String(classificationWidth + sumMargin) + ea + ") / 2) + " + String(classificationWidth + sumMargin) + ea + ")",
      width: String(firstWidth) + ea,
      fontSize: String(sumSize) + ea,
      fontWeight: String(200),
      color: colorChip.shadowWhite,
    }
  });
  textBox = createNode({
    mother: sumArea,
    style: {
      position: "absolute",
      top: String(boxTop + 1) + ea,
      right: String(textLeft + 1) + ea,
      width: "calc(calc(calc(100% - " + String(classificationWidth + sumMargin) + ea + ") / 2) - " + String(textLeft + firstWidth) + ea + ")",
      height: withOut(100, boxTop, ea),
      overflow: "hidden",
    }
  });
  createNodes([
    {
      mother: textBox,
      text: autoComma(leftAmount) + "원",
      style: {
        position: "absolute",
        top: String(textTop) + ea,
        right: String(0),
        fontSize: String(sumSize) + ea,
        fontWeight: String(500),
        paddingLeft: String(lineMargin + 3) + ea,
        background: colorChip.white,
        zIndex: String(1),
        color: (leftAmount === 0 ? colorChip.black : colorChip.red),
      }
    },
    {
      mother: textBox,
      style: {
        position: "absolute",
        top: String(lineTop) + ea,
        left: String(4) + ea,
        width: String(100) + '%',
        borderBottom: "1px solid " + colorChip.gray3,
      }
    },
  ]);

  if (firstAmount === 0 && leftAmount === 0) {
    redPointBoo = false;
  } else {
    redPointBoo = true;
    mother.setAttribute("color", "red");
  }
  createNode({
    mother,
    class: [ "circle" ],
    style: {
      display: "block",
      position: "absolute",
      top: String(outerMargin + listHeight + innerMargin + sumHeight) + ea,
      left: String(outerMargin + 3) + ea,
      width: String(circleWidth) + ea,
      height: String(circleWidth) + ea,
      borderRadius: String(circleWidth) + "px",
      background: (redPointBoo ? colorChip.red : colorChip.green),
    }
  });

}

DesignerJs.prototype.calculationBlocks = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const scrollTong = this.scrollTong;
  let length;
  let width;
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
  minWidth = 540;
  boxMargin = 10;
  min = Math.floor(target / minWidth);
  width = (target - (boxMargin * (min - 1))) / min;

  cleanChildren(scrollTong);

  if (search === null || search === undefined) {
    designers = this.designers;
    length = designers.length;
  } else if (typeof search === "string") {
    designers = this.designers.search(search);
    length = designers.length;
  } else {
    throw new Error("invaild search");
  }

  this.designerDoms = [];
  for (let i = 0; i < length; i++) {
    tempDom = createNode({
      mother: scrollTong,
      id: designers[i].desid,
      attribute: [
        { color: "green" }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: String(width) + ea,
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        marginRight: String(boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
      }
    });
    this.designerDoms.push(tempDom);
    this.calculationBlock(tempDom, designers[i]);
  }

}

DesignerJs.prototype.calculationSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width;

  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      instance.calculationBlocks(this.value.trim());
    }
  });
}

DesignerJs.prototype.calculationExtractEvent = function () {
  const instance = this;
  const { ea } = this;
  const { sub: { extractIcon } } = this.mother.belowButtons;
  const sendEvent = async function (e) {
    try {
      const { autoComma, colorChip, ajaxJson } = GeneralJs;
      const today = new Date();
      const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
      const designerDoms = instance.designerDoms;
      let title, contents, sum;
      let projectWhites, projectWhite, clientName, firstAmount, firstDate, remainAmount, remainDate;
      let designer;
      let matrix;
      let matrix2;
      let tempArr;
      let div_clone, svg_clone;
      let style;
      let width;
      let num0, num1;
      let total;
      let proid;

      matrix = [];
      for (let i of designerDoms) {
        title = i.querySelector(".title");
        contents = i.querySelector(".list");
        sum = i.querySelector(".sum");
        designer = title.textContent.trim();
        projectWhites = i.querySelectorAll(".projectWhite");
        for (let j = 0; j < projectWhites.length; j++) {
          proid = projectWhites[j].id;
          clientName = projectWhites[j].querySelector(".clientName").textContent.trim();
          firstAmount = projectWhites[j].querySelector(".firstAmount").textContent.trim();
          firstDate = projectWhites[j].querySelector(".firstDate").textContent.trim();
          remainAmount = projectWhites[j].querySelector(".remainAmount").textContent.trim();
          remainDate = projectWhites[j].querySelector(".remainDate").textContent.trim();
          matrix.push([ designer, clientName, firstAmount, firstDate, remainAmount, remainDate, proid ]);
        }
      }

      matrix2 = [ [ "디자이너", "고객", "정산대기액", "종류", "아이디", "링크" ] ];
      total = 0;
      for (let arr of matrix) {
        if (arr[3].split('/').map((i) => { return Number(i.trim()); }).every((i) => { return i === 0; })) {
          matrix2.push([ arr[0], arr[1], Number(arr[2].replace(/[^0-9]/g, '')), "선금", arr[6], (window.location.protocol + "//" + window.location.host + "/project?proid=" + arr[6]) ]);
          total += Number(arr[2].replace(/[^0-9]/g, ''));
        }
        if (arr[5].split('/').map((i) => { return Number(i.trim()); }).every((i) => { return i === 0; })) {
          matrix2.push([ arr[0], arr[1], Number(arr[4].replace(/[^0-9]/g, '')), "잔금", arr[6], (window.location.protocol + "//" + window.location.host + "/project?proid=" + arr[6]) ]);
          total += Number(arr[4].replace(/[^0-9]/g, ''));
        }
      }

      matrix2.push([ "", "", "", "", "", "" ]);
      matrix2.push([ "합계", "", total, "", "", "" ]);
      matrix = matrix2;

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("justfadein");
      style = {
        position: "fixed",
        zIndex: String(2),
        background: colorChip.shadow,
        opacity: String(0.2),
        width: "100%",
        height: "100%",
        top: String(0),
        left: String(0),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      instance.totalMother.appendChild(div_clone);

      width = 50;
      svg_clone = instance.mother.returnLoadingIcon();
      style = {
        position: "fixed",
        zIndex: String(2),
        width: String(width) + ea,
        height: String(width) + ea,
        top: "calc(50% - " + String((width / 2) + 60) + ea + ")",
        left: "calc(50% - " + String((width / 2)) + ea + ")",
      };
      for (let i in style) {
        svg_clone.style[i] = style[i];
      }
      instance.totalMother.appendChild(svg_clone);

      const res = await ajaxJson({
        values: JSON.stringify(matrix),
        newMake: "true",
        parentId: parentId,
        sheetName: "fromDB_designerCalculation_" + String(today.getFullYear()) + instance.mother.todayMaker(),
      }, "/sendSheets");

      const link = res.link;
      div_clone.classList.remove("justfadein");
      div_clone.classList.add("justfadeout");
      svg_clone.style.opacity = "0";
      GeneralJs.timeouts["extractPendingBack"] = setTimeout(function () {
        let viewFunction;
        instance.totalMother.removeChild(instance.totalMother.lastChild);
        instance.totalMother.removeChild(instance.totalMother.lastChild);
        viewFunction = instance.extractViewMaker(link);
        viewFunction();
        clearTimeout(GeneralJs.timeouts["extractPendingBack"]);
        GeneralJs.timeouts["extractPendingBack"] = null;
      }, 401);

    } catch (e) {
      console.log(e);
    }
  }

  extractIcon.addEventListener("click", sendEvent);
}

DesignerJs.prototype.calculationControlPannel = function () {
  const instance = this;
  const { ea, totalMother, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  let width, height;
  let right, bottom;
  let base;
  let size;
  let textTop, textLeft, buttonTop, buttonLeft;
  let buttonWidth, buttonHeight;
  let lineHeight;
  let circleMargin;
  let tempArr;
  let nodeArr;

  width = 125;
  height = 83;
  right = 22;
  bottom = 35;

  size = 15;
  textTop = isMac() ? 15 : 17;
  textLeft = 20;
  buttonTop = 16;
  buttonLeft = 66;
  buttonWidth = 39;
  buttonHeight = 20;

  lineHeight = 28;
  circleMargin = 3;

  base = createNode({
    mother: totalMother,
    style: {
      position: "fixed",
      width: String(width) + ea,
      height: String(height) + ea,
      background: colorChip.gradientGreen,
      right: String(right) + ea,
      bottom: String(belowHeight + bottom) + ea,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      animation: "fadeup 0.3s ease forwards",
    }
  });

  nodeArr = createNodes([
    {
      mother: base,
      text: "미정산",
      style: {
        position: "absolute",
        top: String(textTop) + ea,
        left: String(textLeft) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(500),
        color: colorChip.whiteBlack,
      }
    },
    {
      mother: base,
      attribute: [
        { toggle: "off" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const toggle = this.getAttribute("toggle");
            const circle = this.firstChild;
            const doms = instance.designerDoms;
            if (toggle === "off") {
              this.setAttribute("toggle", "on");
              circle.style.transform = "translateX(19px)";
              for (let dom of doms) {
                if (dom.getAttribute("color") === "red") {
                  dom.style.display = "inline-block";
                } else {
                  dom.style.display = "none";
                }
                tempArr = dom.querySelectorAll(".projectWhite");
                for (let white of tempArr) {
                  if (white.getAttribute("condition") === "true") {
                    white.style.display = "none";
                  } else {
                    white.style.display = "block";
                  }
                }
              }
            } else {
              this.setAttribute("toggle", "off");
              circle.style.transform = "translateX(0px)";
              for (let dom of doms) {
                dom.style.display = "inline-block";
                tempArr = dom.querySelectorAll(".projectWhite");
                for (let white of tempArr) {
                  white.style.display = "block";
                }
              }
            }
          }
        }
      ],
      style: {
        position: "absolute",
        top: String(buttonTop) + ea,
        left: String(buttonLeft) + ea,
        width: String(buttonWidth) + ea,
        height: String(buttonHeight) + ea,
        borderRadius: String(buttonHeight) + ea,
        background: colorChip.white,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(circleMargin) + ea,
        left: String(circleMargin) + ea,
        width: String(buttonHeight - (circleMargin * 2)) + ea,
        height: String(buttonHeight - (circleMargin * 2)) + ea,
        borderRadius: String(buttonHeight - (circleMargin * 2)) + ea,
        background: colorChip.gradientGreenWhite,
        transform: "translateX(0px)"
      }
    },
    {
      mother: base,
      text: "합계만",
      style: {
        position: "absolute",
        top: String(textTop + lineHeight) + ea,
        left: String(textLeft) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(500),
        color: colorChip.whiteBlack,
      }
    },
    {
      mother: base,
      attribute: [
        { toggle: "off" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const toggle = this.getAttribute("toggle");
            const circle = this.firstChild;
            const doms = instance.designerDoms;
            if (toggle === "off") {
              this.setAttribute("toggle", "on");
              circle.style.transform = "translateX(19px)";
              for (let dom of doms) {
                dom.querySelector(".list").style.display = "none";
                dom.querySelector(".circle").style.display = "none";
                dom.querySelector(".sum").style.marginTop = dom.querySelector(".sum").getAttribute("outer");
                dom.querySelector(".title").style.top = dom.querySelector(".title").getAttribute("small");
              }
            } else {
              this.setAttribute("toggle", "off");
              circle.style.transform = "translateX(0px)";
              for (let dom of doms) {
                dom.querySelector(".list").style.display = "block";
                dom.querySelector(".circle").style.display = "block";
                dom.querySelector(".sum").style.marginTop = dom.querySelector(".sum").getAttribute("inner");
                dom.querySelector(".title").style.top = dom.querySelector(".title").getAttribute("big");
              }
            }
          }
        }
      ],
      style: {
        position: "absolute",
        top: String(buttonTop + lineHeight) + ea,
        left: String(buttonLeft) + ea,
        width: String(buttonWidth) + ea,
        height: String(buttonHeight) + ea,
        borderRadius: String(buttonHeight) + ea,
        background: colorChip.white,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(circleMargin) + ea,
        left: String(circleMargin) + ea,
        width: String(buttonHeight - (circleMargin * 2)) + ea,
        height: String(buttonHeight - (circleMargin * 2)) + ea,
        borderRadius: String(buttonHeight - (circleMargin * 2)) + ea,
        background: colorChip.gradientGreenWhite,
        transform: "translateX(0px)"
      }
    },
  ]);

  this.onoffButton = {};
  this.onoffButton.will = nodeArr[1];
  this.onoffButton.sum = nodeArr[4];
}

DesignerJs.prototype.calculationView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, sleep } = GeneralJs;
    let loading;
    let projects;
    let desidArr_raw, desidArr;
    let cliidArr;
    let designers;
    let clients;
    let proposalDate;
    let taxBill;
    let cashReceipt;
    let limitAgo;

    loading = await this.mother.loadingRun();

    class TaxSearch extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(amount, business, date) {
        if (typeof amount !== "number" || typeof business !== "string") {
          throw new Error("invaild input");
        }
        let boo;
        business = business.replace(/-/g, '');
        boo = true;
        for (let i of this) {
          if (i.date.valueOf() > date.valueOf()) {
            if (i.who.from.business.replace(/-/g, '') === business) {
              for (let { supply, vat } of i.items) {
                if (supply + vat === amount) {
                  boo = false;
                  break;
                }
              }
            }
          }
        }
        return boo;
      }
    }

    class CashReceipt extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(amount, business, date) {
        if (typeof amount !== "number" || typeof business !== "string") {
          throw new Error("invaild input");
        }
        let boo;
        business = business.replace(/-/g, '');
        boo = true;
        for (let i of this) {
          if (i.date.valueOf() > date.valueOf()) {
            if (i.who.business.replace(/-/g, '') === business) {
              if (i.amount.total === amount || i.amount.supply === amount) {
                boo = false;
                break;
              }
            }
          }
        }
        return boo;
      }
    }

    limitAgo = new Date();
    limitAgo.setFullYear(limitAgo.getFullYear() - 2);

    projects = await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "proposal.date": { $gt: limitAgo } },
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

    proposalDate = [];
    for (let project of projects) {
      proposalDate.push({ date: project.proposal.date, proid: project.proid });
    }
    proposalDate.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

    taxBill = await ajaxJson({
      mode: "read",
      db: "python",
      collection: "taxBill",
      whereQuery: { date: { $gte: proposalDate[0].date } },
    }, PYTHONHOST + "/generalMongo", { equal: true });
    taxBill.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

    cashReceipt = await ajaxJson({
      mode: "read",
      db: "python",
      collection: "cashReceipt",
      whereQuery: { $and: [ { date: { $gte: proposalDate[0].date } }, { method: 1 } ] },
    }, PYTHONHOST + "/generalMongo", { equal: true });
    cashReceipt.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

    this.taxBill = new TaxSearch(taxBill);
    this.cashReceipt = new CashReceipt(cashReceipt);
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);
    this.designers = this.designers.returnDoingDesigners();

    this.calculationBase();
    this.calculationSearchEvent();
    this.calculationExtractEvent();
    await sleep(300);
    this.calculationControlPannel();
    window.addEventListener("resize", (e) => { window.location.reload(); });

    loading.parentNode.removeChild(loading);

    // setTimeout(function () {
    //   instance.onoffButton.will.click();
    // }, 500);

  } catch (e) {
    console.log(e);
  }
}
